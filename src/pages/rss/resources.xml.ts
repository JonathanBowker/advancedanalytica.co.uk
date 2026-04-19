import { getCollection } from 'astro:content';
import { SITE_URL } from '../../lib/seo/site';
import { buildRssFeed } from '../../lib/rss';

export const prerender = true;

export async function GET() {
  const resources = (await getCollection('resources', ({ data }) => !data.draft)).sort((a, b) =>
    a.data.title.localeCompare(b.data.title)
  );

  const xml = buildRssFeed({
    title: 'Advanced Analytica Resources',
    description: 'Guides, checklists, and reference materials for governed AI systems.',
    siteUrl: `${SITE_URL}/resources/`,
    feedUrl: `${SITE_URL}/rss/resources.xml`,
    items: resources.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      url: `${SITE_URL}/resources/${encodeURIComponent(item.slug)}/`
    }))
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
