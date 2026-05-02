import { getCollection } from 'astro:content';
import { SITE_URL } from '../../lib/seo/site';
import { buildDataFeed } from '../../lib/seo/feeds';
import { getGeneratedCoverPath } from '../../lib/contentCover';

export const prerender = true;

export async function GET() {
  const posts = (await getCollection('caseStudies', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );

  const feedUrl = `${SITE_URL}/feeds/use-cases.jsonld`;
  const payload = buildDataFeed({
    feedUrl,
    name: 'Advanced Analytica Use Cases',
    description: 'Real-world examples of iBOM® in action: policy, execution, and assurance.',
    items: posts.map((post) => ({
      url: `${SITE_URL}/use-cases/${encodeURIComponent(post.slug)}/`,
      title: post.data.title,
      description: post.data.description,
      publishedAt: post.data.publishedAt,
      author: post.data.author,
      tags: post.data.tags,
      coverImage: `${SITE_URL}${getGeneratedCoverPath('use-case', post.slug)}`,
      itemType: 'TechArticle'
    }))
  });

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8'
    }
  });
}
