import { execFileSync, spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const svgPath = join(root, "public/images/partners/disney-logo-white.svg");
const tempDir = join(root, ".tmp-disney-logo-video");
const sanitizedSvgPath = join(tempDir, "disney-logo-no-arch.svg");
const pngPath = join(tempDir, "disney-logo.png");
const outputDir = join(root, "public/videos");
const outputPath = join(outputDir, "disney-logo-dots.mp4");

const width = 1920;
const height = 1080;
const sourceWidth = 955;
const sourceHeight = 564;
const fps = 30;
const duration = 4.8;
const frameCount = Math.round(fps * duration);
const startHold = 0.35;

let seed = 91827;
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smootherStep = (value) => value * value * value * (value * (value * 6 - 15) + 10);

rmSync(tempDir, { force: true, recursive: true });
mkdirSync(tempDir, { recursive: true });
mkdirSync(outputDir, { recursive: true });

const svgWithoutArch = readFileSync(svgPath, "utf8")
  .replace(/\s*<path id="Path-3" class="cls-2" d="[^"]*"\/>/, "");
writeFileSync(sanitizedSvgPath, svgWithoutArch);

execFileSync("sips", ["-s", "format", "png", sanitizedSvgPath, "--out", pngPath], {
  stdio: "ignore",
});

const mask = spawnSync("ffmpeg", [
  "-v",
  "error",
  "-i",
  pngPath,
  "-f",
  "rawvideo",
  "-pix_fmt",
  "rgba",
  "pipe:1",
], {
  maxBuffer: sourceWidth * sourceHeight * 4 + 1024,
});

if (mask.status !== 0 || !mask.stdout?.length) {
  throw new Error("Could not rasterize Disney SVG mask.");
}

const pixels = mask.stdout;
let minX = sourceWidth;
let minY = sourceHeight;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < sourceHeight; y += 1) {
  for (let x = 0; x < sourceWidth; x += 1) {
    const offset = (y * sourceWidth + x) * 4;
    const alpha = pixels[offset + 3];
    const brightness = Math.max(pixels[offset], pixels[offset + 1], pixels[offset + 2]);

    if (alpha > 24 && brightness > 24) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

const logoWidth = maxX - minX + 1;
const logoHeight = maxY - minY + 1;
const padding = Math.min(width, height) * 0.16;
const scale = Math.min(
  (width - padding * 2) / logoWidth,
  (height - padding * 2) / logoHeight
);
const offsetX = (width - logoWidth * scale) / 2;
const offsetY = (height - logoHeight * scale) / 2;
const dotSizeMultipliers = [0.07, 0.11, 0.15, 0.2, 0.25, 0.31, 0.36, 0.42, 0.46];

const localCoverage = (centerX, centerY, sampleRadius) => {
  let active = 0;
  let total = 0;

  for (let y = centerY - sampleRadius; y <= centerY + sampleRadius; y += 2) {
    if (y < 0 || y >= sourceHeight) continue;

    for (let x = centerX - sampleRadius; x <= centerX + sampleRadius; x += 2) {
      if (x < 0 || x >= sourceWidth) continue;

      const offset = (y * sourceWidth + x) * 4;
      const alpha = pixels[offset + 3];
      const brightness = Math.max(pixels[offset], pixels[offset + 1], pixels[offset + 2]);

      total += 1;
      if (alpha > 52 && brightness > 52) {
        active += 1;
      }
    }
  }

  return total > 0 ? active / total : 0;
};

const targetRadius = (step, scaleValue, coverage) => {
  const sizeIndex = clamp(
    Math.round(coverage * (dotSizeMultipliers.length - 1)),
    0,
    dotSizeMultipliers.length - 1
  );
  return Math.max(1.5, step * scaleValue * dotSizeMultipliers[sizeIndex]);
};

const sampleTargets = () => {
  const step = 9;
  const sampleRadius = Math.max(2, Math.round(step * 0.55));
  const targets = [];

  for (let y = minY; y <= maxY; y += step) {
    for (let x = minX; x <= maxX; x += step) {
      const coverage = localCoverage(x, y, sampleRadius);

      if (coverage > 0.16) {
        targets.push({
          x: offsetX + (x - minX) * scale,
          y: offsetY + (y - minY) * scale,
          r: targetRadius(step, scale, coverage),
        });
      }
    }
  }

  return targets;
};

const makeStartPoint = () => {
  const bleed = Math.max(width, height) * 0.14;
  return {
    x: random() * (width + bleed * 2) - bleed,
    y: random() * (height + bleed * 2) - bleed,
  };
};

const makeStartRadius = () => {
  const sizeBase = Math.min(width, height);
  const roll = random();

  if (roll > 0.9) {
    return sizeBase * (0.04 + random() * 0.045);
  }

  if (roll > 0.62) {
    return sizeBase * (0.014 + random() * 0.022);
  }

  return sizeBase * (0.0025 + random() * 0.008);
};

const particles = sampleTargets().map((target) => {
  const start = makeStartPoint();

  return {
    startX: start.x,
    startY: start.y,
    endX: target.x,
    endY: target.y,
    startR: makeStartRadius(),
    endR: target.r,
    delay: startHold + random() * 0.62,
    drift: (random() - 0.5) * 78,
    introX: (random() - 0.5) * 180,
    introY: (random() - 0.5) * 130,
    introPhase: random() * Math.PI * 2,
  };
});

if (!particles.length) {
  throw new Error("No Disney logo particles were sampled.");
}

const drawCircle = (buffer, cx, cy, radius, opacity) => {
  const minDrawX = Math.max(0, Math.floor(cx - radius - 1));
  const maxDrawX = Math.min(width - 1, Math.ceil(cx + radius + 1));
  const minDrawY = Math.max(0, Math.floor(cy - radius - 1));
  const maxDrawY = Math.min(height - 1, Math.ceil(cy + radius + 1));
  const edge = Math.max(1, radius * 0.08);

  for (let y = minDrawY; y <= maxDrawY; y += 1) {
    const dy = y + 0.5 - cy;
    for (let x = minDrawX; x <= maxDrawX; x += 1) {
      const dx = x + 0.5 - cx;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > radius + edge) continue;

      const coverage = clamp((radius + edge - distance) / edge, 0, 1);
      const value = Math.round(255 * opacity * coverage);
      const offset = (y * width + x) * 3;

      if (value > buffer[offset]) {
        buffer[offset] = value;
        buffer[offset + 1] = value;
        buffer[offset + 2] = value;
      }
    }
  }
};

const ffmpeg = spawn("ffmpeg", [
  "-y",
  "-f",
  "rawvideo",
  "-pixel_format",
  "rgb24",
  "-video_size",
  `${width}x${height}`,
  "-framerate",
  String(fps),
  "-i",
  "pipe:0",
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  outputPath,
], { stdio: ["pipe", "inherit", "inherit"] });

for (let frame = 0; frame < frameCount; frame += 1) {
  const seconds = frame / fps;
  const buffer = Buffer.alloc(width * height * 3);

  for (const particle of particles) {
    const local = clamp((seconds - particle.delay) / 3.4, 0, 1);
    const eased = smootherStep(local);
    const wave = Math.sin(eased * Math.PI) * particle.drift;
    const fadeProgress = clamp(local / 0.18, 0, 1);
    const introMotion = (1 - eased) * (1 - fadeProgress * 0.35);
    const introWave = seconds * 2.8 + particle.introPhase;
    const x = particle.startX + (particle.endX - particle.startX) * eased + wave * 0.34 + Math.sin(introWave) * particle.introX * introMotion;
    const y = particle.startY + (particle.endY - particle.startY) * eased - wave * 0.2 + Math.cos(introWave * 0.92) * particle.introY * introMotion;
    const r = Math.max(0.4, particle.startR + (particle.endR - particle.startR) * eased);
    const fadeIn = smootherStep(fadeProgress);
    const opacity = fadeIn * (0.92 - Math.sin(local * Math.PI) * 0.08);

    drawCircle(buffer, x, y, r, opacity);
  }

  ffmpeg.stdin.write(buffer);
}

ffmpeg.stdin.end();

ffmpeg.on("close", (code) => {
  rmSync(tempDir, { force: true, recursive: true });

  if (code !== 0) {
    process.exitCode = code ?? 1;
    return;
  }

  console.log(`${particles.length} dots`);
  console.log(outputPath);
});
