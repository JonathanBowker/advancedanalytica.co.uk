import { getCollection } from 'astro:content';
import { SITE_URL } from '../../lib/seo/site';
import { buildRssFeed } from '../../lib/rss';

export const prerender = true;

export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );

  const xml = buildRssFeed({
    title: 'Advanced Analytica Opinions',
    description: 'Opinions on governed AI systems, policy, assurance, and operating models.',
    siteUrl: `${SITE_URL}/opinions/`,
    feedUrl: `${SITE_URL}/rss/opinions.xml`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      url: `${SITE_URL}/opinions/${encodeURIComponent(post.slug)}/`,
      publishedAt: post.data.publishedAt
    }))
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
