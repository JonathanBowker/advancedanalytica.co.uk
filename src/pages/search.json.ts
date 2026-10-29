import { getCollection } from 'astro:content';

export const prerender = true;

const stripMarkdown = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+\]\([^)]+\)/g, ' ')
    .replace(/[`*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractSnippet = (value: string, max = 220) => {
  const clean = stripMarkdown(value);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trimEnd()}...`;
};

const buildSearchText = (...parts: Array<string | string[] | undefined>) =>
  parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .filter(Boolean)
    .map((part) => stripMarkdown(String(part)))
    .join(' ')
    .trim();

export async function GET() {
  const staticPages = [
    {
      title: 'Home',
      description: 'Advanced Analytica overview and IBOM introduction.',
      url: '/',
      type: 'Page',
      snippet:
        'Advanced Analytica helps organisations turn knowledge, policy, and operational logic into governed systems that AI can use safely and consistently.'
      ,
      searchText:
        'Advanced Analytica governed systems knowledge policy operational logic AI safely consistently IBOM'
    },
    {
      title: 'Services',
      description: 'Data Due Diligence and Agent Skill Building.',
      url: '/services',
      type: 'Page',
      snippet:
        'Prepare governed business data, then configure, test, package, and deploy the skills and agents required for live operations.'
      ,
      searchText:
        'services Data Due Diligence Agent Skill Building governed business data skills agents controls workflows'
    },
    {
      title: 'IBOM',
      description: 'Intelligent Business Operations Manager overview.',
      url: '/ibom',
      type: 'Page',
      snippet:
        'Overview of the Intelligent Business Operations Manager, technology for governing business data, knowledge, policies, agents, and workflows.'
      ,
      searchText:
        'IBOM Intelligent Business Operations Manager technology business data knowledge policy agents workflows govern'
    },
    {
      title: 'Enterprise',
      description: 'Enterprise governance and deployment for IBOM.',
      url: '/enterprise',
      type: 'Page',
      snippet:
        'Enterprise governance, deployment, and control patterns for organisations that need auditable, scalable AI operations.'
      ,
      searchText:
        'enterprise governance deployment IBOM auditable scalable AI operations control patterns'
    },
    {
      title: 'Developers',
      description: 'Developer resources for MCP servers and integration.',
      url: '/developers',
      type: 'Page',
      snippet:
        'Developer guides for MCP servers, integrations, and the connection layer that makes governed knowledge usable by AI systems.'
      ,
      searchText:
        'developers developer resources MCP servers integrations connection layer governed knowledge AI systems'
    },
    {
      title: 'MCP Servers',
      description: 'Model Context Protocol servers overview.',
      url: '/developers/mcp-servers',
      type: 'Page',
      snippet:
        'A practical overview of MCP servers and how they expose governed knowledge, tools, and policy to AI runtimes.'
      ,
      searchText:
        'MCP servers Model Context Protocol governed knowledge tools policy AI runtimes overview'
    },
    {
      title: 'Quickstart',
      description: 'Get started with IBOM integration.',
      url: '/developers/quickstart',
      type: 'Page',
      snippet:
        'Quickstart guidance for implementing IBOM-oriented integration patterns in development and delivery workflows.'
      ,
      searchText:
        'quickstart IBOM integration development delivery workflows implementation guidance'
    },
    {
      title: 'Case Studies',
      description: 'Real-world examples of IBOM in action.',
      url: '/case-studies',
      type: 'Page',
      snippet:
        'Examples of how governed knowledge systems support brand, risk, compliance, operations, and AI-assisted delivery in practice.'
      ,
      searchText:
        'case studies examples governed knowledge systems brand risk compliance operations AI assisted delivery'
    },
    {
      title: 'Opinions',
      description: 'Opinionated perspectives on operating brand as policy-aware systems.',
      url: '/opinions',
      type: 'Page',
      snippet:
        'Essays and perspectives on policy-aware systems, governance, MCP, IBOM, runtime controls, and AI operations.'
      ,
      searchText:
        'opinions essays policy aware systems governance MCP IBOM runtime controls AI operations'
    },
    {
      title: 'Resources',
      description: 'Guides, checklists, and templates.',
      url: '/resources',
      type: 'Page',
      snippet:
        'Practical resources for teams building governed systems: checklists, reference materials, and working patterns.'
      ,
      searchText:
        'resources guides checklists templates governed systems reference materials working patterns'
    },
    {
      title: 'Company',
      description: 'About Advanced Analytica.',
      url: '/company/about',
      type: 'Page',
      snippet:
        'About Advanced Analytica, our approach to governed AI systems, and how we work with organisations across sectors.'
      ,
      searchText:
        'about Advanced Analytica governed AI systems approach organisations sectors'
    },
    {
      title: 'Jonny Bowker',
      description: 'Founder of Advanced Analytica.',
      url: '/company/jonny-bowker',
      type: 'Page',
      snippet:
        'Jonny Bowker is the founder of Advanced Analytica, an asset-backed consultancy specialising in Intelligent Business Operations Managers, spec-driven AI development, and governed agentic AI systems.',
      searchText:
        'Jonny Bowker Jonathan Bowker founder Advanced Analytica asset-backed consultancy Accredited Legal Technologist Law Society Scotland Fortune 500 data security privacy AI NLP agentic AI systems IBOM'
    },
    {
      title: 'Fractional Chief AI Officer Services & Interim AI Directorship',
      description: 'Accountable AI direction from Jonny Bowker.',
      url: '/company/interim-ai-directorship',
      type: 'Service',
      snippet:
        'Fractional Chief AI Officer services and interim AI directorship for organisations that need accountable AI due diligence, direction, governance, and delivery leadership without a permanent hire.',
      searchText:
        'Fractional Chief AI Officer Services Interim AI Directorship fractional CAIO interim AI director Jonny Bowker AI due diligence AI governance operational responsibility Fortune 500 Law Society Scotland Accredited Legal Technologist advisory embedded defined programme'
    },
    {
      title: 'Contact',
      description: 'Get in touch with Advanced Analytica.',
      url: '/company/contact',
      type: 'Page',
      snippet:
        'Contact Advanced Analytica to discuss governed AI systems, operating models, MCP infrastructure, and implementation needs.'
      ,
      searchText:
        'contact Advanced Analytica governed AI systems operating models MCP infrastructure implementation'
    },
    {
      title: 'Get in Touch',
      description: 'Contact form for general enquiries and project discussions.',
      url: '/company/contact',
      type: 'Form',
      snippet:
        'Use the contact form to start a conversation about governed AI systems, operating models, MCP infrastructure, and implementation support.',
      searchText:
        'get in touch contact form general enquiries project discussions governed AI systems operating models MCP infrastructure implementation support'
    },
    {
      title: 'AI Drift Audit',
      description: 'Audit form for diagnosing AI drift.',
      url: '/brand-ai-drift-audit',
      type: 'Form',
      snippet:
        'Request the AI Drift Audit to review your brand guidance, current materials, and where AI is already touching your business.',
      searchText:
        'ai drift audit assessment form diagnose drift brand guidance current materials ai touching business'
    },
    {
      title: 'Security',
      description: 'Security and governance standards.',
      url: '/company/security',
      type: 'Page',
      snippet:
        'Security posture, governance standards, and organisational controls that support reliable enterprise delivery.'
      ,
      searchText:
        'security governance standards organisational controls reliable enterprise delivery'
    }
  ];

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const blog = posts.map((post) => {
    const rawBody = typeof post.body === 'string' ? post.body : '';
    return {
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      url: `/opinions/${post.slug}`,
      type: 'Opinion',
      snippet: extractSnippet(rawBody),
      author: post.data.author,
      searchText: buildSearchText(post.data.title, post.data.description, post.data.tags, post.data.author, rawBody)
    };
  });

  const caseStudies = await getCollection('case-studies', ({ data }) => !data.draft);
  const studies = caseStudies.map((post) => {
    const rawBody = typeof post.body === 'string' ? post.body : '';
    return {
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      url: `/case-studies/${post.slug}`,
      type: 'Case Study',
      snippet: extractSnippet(rawBody),
      author: post.data.author,
      searchText: buildSearchText(post.data.title, post.data.description, post.data.tags, post.data.author, rawBody)
    };
  });

  const resources = await getCollection('resources', ({ data }) => !data.draft);
  const resourceItems = resources.map((res) => {
    const rawBody = typeof res.body === 'string' ? res.body : '';
    return {
      title: res.data.title,
      description: res.data.description,
      tags: res.data.tags,
      url: `/resources/${res.slug}`,
      type: 'Resource',
      snippet: extractSnippet(rawBody),
      searchText: buildSearchText(res.data.title, res.data.description, res.data.tags, rawBody)
    };
  });

  return new Response(JSON.stringify([...staticPages, ...blog, ...studies, ...resourceItems]), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
