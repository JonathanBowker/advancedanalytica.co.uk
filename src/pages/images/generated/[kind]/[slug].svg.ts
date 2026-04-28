import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

type CoverKind = 'opinion' | 'use-case' | 'resource';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const wrapTitle = (title: string, maxChars = 18) => {
  const words = title.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars || current.length === 0) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 4);
};

const renderSvg = ({
  kind,
  title,
  tags
}: {
  kind: CoverKind;
  title: string;
  tags: string[];
}) => {
  const plainTitle = stripHtml(title);
  const label = kind === 'opinion' ? 'OPINION' : kind === 'use-case' ? 'USE CASE' : 'RESOURCE';
  const accent =
    kind === 'opinion' ? '#14B8A6' : kind === 'use-case' ? '#ff8c69' : '#94a3b8';
  const labelFill =
    kind === 'resource' ? '#202733' : accent;
  const accentSoft =
    kind === 'opinion'
      ? 'rgba(20,184,166,0.22)'
      : kind === 'use-case'
        ? 'rgba(255,140,105,0.22)'
        : 'rgba(148,163,184,0.24)';
  const titleLines = wrapTitle(plainTitle);
  const titleY = 600 - ((titleLines.length - 1) * 58) / 2;
  const tagLine = tags.slice(0, 3).join(' · ').toUpperCase();
  const imageDescription = `Generated ${label.toLowerCase()} cover for ${plainTitle} by Advanced Analytica${tagLine ? `. Topics: ${tagLine}.` : '.'}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="${escapeXml(plainTitle)}">
  <title>${escapeXml(plainTitle)}</title>
  <desc>${escapeXml(imageDescription)}</desc>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05070b" />
      <stop offset="58%" stop-color="#0c1018" />
      <stop offset="100%" stop-color="#131924" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="${accentSoft}" />
      <stop offset="55%" stop-color="rgba(0,0,0,0)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0)" />
    </radialGradient>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="16" />
    </filter>
  </defs>

  <rect width="1200" height="1200" fill="url(#bg)" />
  <rect width="1200" height="1200" fill="url(#glow)" />

  <g opacity="0.9">
    <rect x="96" y="96" width="1008" height="1008" rx="34" fill="rgba(0,0,0,0.24)" stroke="rgba(255,255,255,0.14)" stroke-width="2" />
    <rect x="220" y="286" width="760" height="24" rx="12" fill="${accent}" filter="url(#softGlow)" />
  </g>

  <g transform="translate(126 144)">
    <rect width="192" height="56" rx="10" fill="${labelFill}" />
    <text x="96" y="35" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="0.12em" fill="#ffffff">${label}</text>
  </g>

  <g transform="translate(600 ${titleY})">
    ${titleLines
      .map(
        (line, index) =>
          `<text x="0" y="${index * 72}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="62" font-weight="700" letter-spacing="-0.03em" fill="#ffffff">${escapeXml(line)}</text>`
      )
      .join('')}
  </g>

  <text x="600" y="900" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="600" letter-spacing="0.22em" fill="rgba(255,255,255,0.72)">ADVANCED ANALYTICA</text>
  <text x="600" y="946" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="500" letter-spacing="0.18em" fill="rgba(255,255,255,0.56)">${escapeXml(tagLine || (kind === 'opinion' ? 'IBOM · GOVERNANCE · SYSTEMS' : kind === 'use-case' ? 'IBOM · POLICY · DELIVERY' : 'IBOM · GUIDES · RESOURCES'))}</text>
</svg>`;
};

export async function getStaticPaths() {
  const opinions = await getCollection('blog', ({ data }) => !data.draft);
  const useCases = await getCollection('caseStudies', ({ data }) => !data.draft);
  const resources = await getCollection('resources', ({ data }) => !data.draft);

  return [
    ...opinions.map((entry) => ({
      params: { kind: 'opinion', slug: entry.slug },
      props: { kind: 'opinion' as CoverKind, title: entry.data.title, tags: entry.data.tags ?? [] }
    })),
    ...useCases.map((entry) => ({
      params: { kind: 'use-case', slug: entry.slug },
      props: { kind: 'use-case' as CoverKind, title: entry.data.title, tags: entry.data.tags ?? [] }
    })),
    ...resources.map((entry) => ({
      params: { kind: 'resource', slug: entry.slug },
      props: { kind: 'resource' as CoverKind, title: entry.data.title, tags: entry.data.tags ?? [] }
    }))
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const { kind, title, tags } = props as { kind: CoverKind; title: string; tags: string[] };
  const svg = renderSvg({ kind, title, tags });

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
