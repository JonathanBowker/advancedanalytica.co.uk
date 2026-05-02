import { getCollection } from 'astro:content';
import { SITE_URL } from '../../lib/seo/site';
import { buildDataFeed } from '../../lib/seo/feeds';
import { getGeneratedCoverPath } from '../../lib/contentCover';

export const prerender = true;

export async function GET() {
  const [opinions, useCases, resources] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('caseStudies', ({ data }) => !data.draft),
    getCollection('resources', ({ data }) => !data.draft)
  ]);

  const feedUrl = `${SITE_URL}/feeds/site.jsonld`;

  const staticPages = [
    {
      url: `${SITE_URL}/`,
      title: 'Advanced Analytica',
      description:
        'Advanced Analytica helps organisations turn business logic into governed, executable infrastructure for AI systems, starting with brand governance.',
      itemType: 'WebPage',
      tags: ['Homepage', 'iBOM', 'AICE']
    },
    {
      url: `${SITE_URL}/company/about/`,
      title: 'About Advanced Analytica',
      description:
        'How Advanced Analytica helps businesses of all sizes turn knowledge, policy, and process into governed AI systems.',
      itemType: 'AboutPage',
      tags: ['About', 'Company']
    },
    {
      url: `${SITE_URL}/company/contact/`,
      title: 'Contact Advanced Analytica',
      description:
        'Contact Advanced Analytica to discuss governed AI systems, iBOM, AICE, and practical next steps.',
      itemType: 'ContactPage',
      tags: ['Contact']
    },
    {
      url: `${SITE_URL}/company/security/`,
      title: 'Security',
      description:
        'Advanced Analytica security posture for governed AI systems, operational controls, and organisation-wide Cyber Essentials Plus certification.',
      itemType: 'WebPage',
      tags: ['Security', 'Governance']
    },
    {
      url: `${SITE_URL}/services/iBOM/`,
      title: 'iBOM®',
      description:
        'The Intelligent Business Operating Model for turning brand meaning, policy, and operational logic into executable systems.',
      itemType: 'Service',
      tags: ['iBOM', 'Service']
    },
    {
      url: `${SITE_URL}/opinions/`,
      title: 'Opinions',
      description:
        'Advanced Analytica opinions on governed AI systems, operating models, policy, assurance, and MCP infrastructure.',
      itemType: 'CollectionPage',
      tags: ['Opinions']
    },
    {
      url: `${SITE_URL}/use-cases/`,
      title: 'Use Cases',
      description:
        'Use cases showing how organisations deploy iBOM® to govern brand meaning, policy, and execution across AI systems.',
      itemType: 'CollectionPage',
      tags: ['Use Cases']
    },
    {
      url: `${SITE_URL}/resources/`,
      title: 'Resources',
      description:
        'Guides, checklists, and reference materials for governed AI systems, policy-aware delivery, and iBOM®.',
      itemType: 'CollectionPage',
      tags: ['Resources']
    }
  ];

  const payload = buildDataFeed({
    feedUrl,
    name: 'Advanced Analytica Site Feed',
    description:
      'A master Schema.org DataFeed for Advanced Analytica covering key pages, opinions, use cases, and resources.',
    items: [
      ...staticPages,
      ...opinions
        .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
        .map((post) => ({
          url: `${SITE_URL}/opinions/${encodeURIComponent(post.slug)}/`,
          title: post.data.title,
          description: post.data.description,
          publishedAt: post.data.publishedAt,
          author: post.data.author,
          tags: post.data.tags,
          coverImage: `${SITE_URL}${getGeneratedCoverPath('opinion', post.slug)}`,
          itemType: 'TechArticle'
        })),
      ...useCases
        .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
        .map((post) => ({
          url: `${SITE_URL}/use-cases/${encodeURIComponent(post.slug)}/`,
          title: post.data.title,
          description: post.data.description,
          publishedAt: post.data.publishedAt,
          author: post.data.author,
          tags: post.data.tags,
          coverImage: `${SITE_URL}${getGeneratedCoverPath('use-case', post.slug)}`,
          itemType: 'TechArticle'
        })),
      ...resources
        .sort((a, b) => a.data.title.localeCompare(b.data.title))
        .map((item) => ({
          url: `${SITE_URL}/resources/${encodeURIComponent(item.slug)}/`,
          title: item.data.title,
          description: item.data.description,
          tags: item.data.tags,
          coverImage: `${SITE_URL}${getGeneratedCoverPath('resource', item.slug)}`,
          itemType: 'CreativeWork'
        }))
    ]
  });

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8'
    }
  });
}
