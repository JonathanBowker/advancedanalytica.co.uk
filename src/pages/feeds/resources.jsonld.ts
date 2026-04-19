import { getCollection } from 'astro:content';
import { SITE_URL } from '../../lib/seo/site';
import { buildDataFeed } from '../../lib/seo/feeds';
import { getGeneratedCoverPath } from '../../lib/contentCover';

export const prerender = true;

export async function GET() {
  const resources = (await getCollection('resources', ({ data }) => !data.draft)).sort((a, b) =>
    a.data.title.localeCompare(b.data.title)
  );

  const feedUrl = `${SITE_URL}/feeds/resources.jsonld`;
  const payload = buildDataFeed({
    feedUrl,
    name: 'Advanced Analytica Resources',
    description: 'Guides, checklists, and templates for policy-aware brand systems.',
    items: resources.map((item) => ({
      url: `${SITE_URL}/resources/${encodeURIComponent(item.slug)}/`,
      title: item.data.title,
      description: item.data.description,
      tags: item.data.tags,
      coverImage: `${SITE_URL}${getGeneratedCoverPath('resource', item.slug)}`,
      itemType: 'CreativeWork'
    }))
  });

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8'
    }
  });
}
