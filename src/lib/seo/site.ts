export const SITE_URL = 'https://advancedanalytica.co.uk';
export const SITE_NAME = 'Advanced Analytica';
export const SITE_TAGLINE = 'Make Brand Operable';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/partners/logo.png`;

export const toAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;
  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return undefined;
  }
};

// TODO: Replace with the verified public URL for the Brando Schema project.
export const BRANDO_SCHEMA_URL = 'https://brandoschema.org';

export const IBOM = {
  name: 'IBOM®',
  description: 'Intelligent Brand Operating Model for executable brand systems.',
  url: `${SITE_URL}/services/ibom`
};

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Brand meaning to executable systems.',
  logo: DEFAULT_OG_IMAGE
};
