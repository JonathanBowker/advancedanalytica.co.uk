import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const svgPath = join(root, "public/images/infrastructure/dots-brand-oracle.svg");
const frameDir = join(root, ".tmp-brand-oracle-mark-frames");
const outputDir = join(root, "public/videos");
const outputPath = join(outputDir, "brand-oracle-mark-dots.mp4");

const width = 1920;
const height = 1080;
const fps = 30;
const duration = 4.8;
const frameCount = Math.round(fps * duration);
const startHold = 0.35;

let seed = 45791;
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smootherStep = (value) => value * value * value * (value * (value * 6 - 15) + 10);

const svg = readFileSync(svgPath, "utf8");
const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1]?.split(/\s+/).map(Number) ?? [0, 0, 426.98, 533.51];
const [, , viewWidth, viewHeight] = viewBox;
const circles = Array.from(svg.matchAll(/<circle\b[^>]*>/g))
  .map((match) => match[0])
  .map((circle) => ({
    cx: Number(circle.match(/cx="([^"]+)"/)?.[1] ?? 0),
    cy: Number(circle.match(/cy="([^"]+)"/)?.[1] ?? 0),
    r: Number(circle.match(/r="([^"]+)"/)?.[1] ?? 1),
  }))
  .filter((circle) => Number.isFinite(circle.cx) && Number.isFinite(circle.cy) && Number.isFinite(circle.r));

const padding = Math.min(width, height) * 0.16;
const scale = Math.min(
  (width - padding * 2) / viewWidth,
  (height - padding * 2) / viewHeight
);
const offsetX = (width - viewWidth * scale) / 2;
const offsetY = (height - viewHeight * scale) / 2;

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

  if (roll > 0.88) {
    return sizeBase * (0.045 + random() * 0.055);
  }

  if (roll > 0.58) {
    return sizeBase * (0.018 + random() * 0.024);
  }

  return sizeBase * (0.003 + random() * 0.01);
};

const particles = circles.map((circle) => {
  const start = makeStartPoint();
  const end = {
    x: offsetX + circle.cx * scale,
    y: offsetY + circle.cy * scale,
    r: Math.max(1.25, circle.r * scale),
  };

  return {
    ...circle,
    startX: start.x,
    startY: start.y,
    endX: end.x,
    endY: end.y,
    startR: makeStartRadius(),
    endR: end.r,
    delay: startHold + random() * 0.62,
    drift: (random() - 0.5) * 78,
    introX: (random() - 0.5) * 180,
    introY: (random() - 0.5) * 130,
    introPhase: random() * Math.PI * 2,
  };
});

rmSync(frameDir, { force: true, recursive: true });
mkdirSync(outputDir, { recursive: true });

const drawCircle = (buffer, cx, cy, radius, opacity) => {
  const minX = Math.max(0, Math.floor(cx - radius - 1));
  const maxX = Math.min(width - 1, Math.ceil(cx + radius + 1));
  const minY = Math.max(0, Math.floor(cy - radius - 1));
  const maxY = Math.min(height - 1, Math.ceil(cy + radius + 1));
  const edge = Math.max(1, radius * 0.08);

  for (let y = minY; y <= maxY; y += 1) {
    const dy = y + 0.5 - cy;
    for (let x = minX; x <= maxX; x += 1) {
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
  if (code !== 0) {
    process.exitCode = code ?? 1;
    return;
  }

  console.log(outputPath);
});
