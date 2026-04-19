type GeneratedCoverKind = 'opinion' | 'use-case';

export const getGeneratedCoverPath = (kind: GeneratedCoverKind, slug: string) =>
  `/images/generated/${kind}/${slug}.svg`;

export const getCoverPathForBasePath = (
  basePath: string | undefined,
  slug: string,
  fallback?: string
) => {
  if (basePath === '/use-cases') return getGeneratedCoverPath('use-case', slug);
  if (basePath === '/opinions' || basePath === '/blog' || !basePath) {
    return getGeneratedCoverPath('opinion', slug);
  }
  return fallback;
};
