import { getCollection } from 'astro:content';
import { SITE_URL } from '../../lib/seo/site';
import { buildRssFeed } from '../../lib/rss';

export const prerender = true;

export async function GET() {
  const posts = (await getCollection('case-studies', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );

  const xml = buildRssFeed({
    title: 'Advanced Analytica Case Studies',
    description: 'Case studies showing governed AI delivery, policy, and assurance in practice.',
    siteUrl: `${SITE_URL}/case-studies/`,
    feedUrl: `${SITE_URL}/rss/case-studies.xml`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      url: `${SITE_URL}/case-studies/${encodeURIComponent(post.slug)}/`,
      publishedAt: post.data.publishedAt
    }))
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
