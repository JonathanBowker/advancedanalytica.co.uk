import { getCollection } from 'astro:content';
import { SITE_URL } from '../../lib/seo/site';
import { buildRssFeed } from '../../lib/rss';

export const prerender = true;

export async function GET() {
  const [opinions, useCases, resources] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('caseStudies', ({ data }) => !data.draft),
    getCollection('resources', ({ data }) => !data.draft)
  ]);

  const items = [
    {
      title: 'Advanced Analytica',
      description:
        'Advanced Analytica helps organisations turn business logic into governed, executable infrastructure for AI systems, starting with brand governance.',
      url: `${SITE_URL}/`
    },
    ...opinions.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      url: `${SITE_URL}/opinions/${encodeURIComponent(post.slug)}/`,
      publishedAt: post.data.publishedAt
    })),
    ...useCases.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      url: `${SITE_URL}/use-cases/${encodeURIComponent(post.slug)}/`,
      publishedAt: post.data.publishedAt
    })),
    ...resources.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      url: `${SITE_URL}/resources/${encodeURIComponent(item.slug)}/`
    }))
  ].sort((a, b) => (b.publishedAt?.valueOf() ?? 0) - (a.publishedAt?.valueOf() ?? 0));

  const xml = buildRssFeed({
    title: 'Advanced Analytica Site Feed',
    description: 'Site-wide RSS feed for Advanced Analytica content.',
    siteUrl: SITE_URL,
    feedUrl: `${SITE_URL}/rss/site.xml`,
    items
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
