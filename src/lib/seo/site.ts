export const SITE_URL = 'https://advancedanalytica.co.uk';
export const SITE_NAME = 'Advanced Analytica';
export const SITE_TAGLINE = 'Stop Trusting AI. Start Governing It.';
export const ORGANIZATION_LOGO = `${SITE_URL}/images/infrastructure/logo.png`;
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

export const iBOM = {
  name: 'iBOM®',
  description: 'Intelligent Brand Operating Model for executable brand systems.',
  url: `${SITE_URL}/services/iBOM`
};

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Brand meaning to executable systems.',
  logo: ORGANIZATION_LOGO
};
