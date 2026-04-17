import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const payload = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    url: `/opinions/${post.slug}`
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
