import { getCollection } from 'astro:content';
import { SITE_URL } from '../../lib/seo/site';
import { buildDataFeed } from '../../lib/seo/feeds';

export const prerender = true;

export async function GET() {
  const posts = (await getCollection('caseStudies', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );

  const feedUrl = `${SITE_URL}/feeds/case-studies.jsonld`;
  const payload = buildDataFeed({
    feedUrl,
    name: 'Advanced Analytica Use Cases',
    description: 'Real-world examples of IBOM® in action: policy, execution, and assurance.',
    items: posts.map((post) => ({
      url: `${SITE_URL}/use-cases/${encodeURIComponent(post.slug)}/`,
      title: post.data.title,
      description: post.data.description,
      publishedAt: post.data.publishedAt,
      author: post.data.author,
      tags: post.data.tags,
      coverImage: post.data.coverImage ? `${SITE_URL}${post.data.coverImage}` : undefined,
      itemType: 'TechArticle'
    }))
  });

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8'
    }
  });
}
