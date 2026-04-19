type GeneratedCoverKind = 'opinion' | 'use-case' | 'resource';

export const getGeneratedCoverPath = (kind: GeneratedCoverKind, slug: string) =>
  `/images/generated/${kind}/${slug}.svg`;

export const getCoverPathForBasePath = (
  basePath: string | undefined,
  slug: string,
  fallback?: string
) => {
  if (basePath === '/use-cases') return getGeneratedCoverPath('use-case', slug);
  if (basePath === '/resources') return getGeneratedCoverPath('resource', slug);
  if (basePath === '/opinions' || basePath === '/blog' || !basePath) {
    return getGeneratedCoverPath('opinion', slug);
  }
  return fallback;
};
