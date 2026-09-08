export const SITE_URL = String(import.meta.env.PUBLIC_SITE_URL || 'https://advancedanalytica.co.uk').replace(/\/+$/, '');
export const SITE_NAME = 'Advanced Analytica';
export const SITE_TAGLINE = 'Stop Trusting AI. Start Governing It.';
export const ORGANIZATION_LOGO = `${SITE_URL}/images/infrastructure/logo.png`;
export const JONNY_BOWKER_URL = `${SITE_URL}/company/jonny-bowker`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/social/share-card.png`;

export const toAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;
  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return undefined;
  }
};

// TODO: Replace with the verified public URL for the Brando Schema project.
export const BRANDO_SCHEMA_URL = 'https://brandoschema.com';

export const ENTITY_TOPICS = [
  'Agentic AI',
  'AI governance',
  'AI operating models',
  'Intelligent Business Operating Models',
  'Spec-driven AI development',
  'Controlled AI workflows',
  'Machine-readable policy',
  'Brand governance',
  'Risk and compliance',
  'MCP architecture',
  'Enterprise AI implementation',
  'Regulated AI systems'
] as const;

export const iBOM = {
  name: 'IBOM®',
  alternateName: 'Intelligent Business Operating Model',
  description:
    'Intelligent Business Operating Model for turning business knowledge, policy, workflow logic, skills, and controls into governed agentic AI systems.',
  url: `${SITE_URL}/ibom/`
};

export const JONNY_BOWKER = {
  name: 'Jonny Bowker',
  alternateName: ['Jonathan Bowker'],
  url: JONNY_BOWKER_URL,
  sameAs: [
    'https://uk.linkedin.com/in/jonnybowker',
    'https://jonnybowker.com/',
    'https://www.squirepattonboggs.com/our-people/jonathan-bowker/'
  ],
  jobTitle: 'Founder, Advanced Analytica',
  description:
    'Jonny Bowker is the founder of Advanced Analytica, an AI strategy and architecture consultancy specialising in Intelligent Business Operating Models, spec-driven AI development, and governed agentic AI systems.',
  knowsAbout: ENTITY_TOPICS
};

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: 'Advanced Analytica Ltd',
  url: SITE_URL,
  description:
    'Advanced Analytica is an AI strategy and architecture consultancy that advises, designs, engineers, and operates governed agentic AI solutions for enterprise clients and regulated industries.',
  logo: ORGANIZATION_LOGO,
  sameAs: [
    'https://www.linkedin.com/company/advancedanalytica/'
  ],
  founder: JONNY_BOWKER,
  knowsAbout: ENTITY_TOPICS
};
