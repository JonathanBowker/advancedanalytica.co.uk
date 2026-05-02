import { iBOM, ORGANIZATION, SITE_NAME, SITE_URL } from './site';

type FeedItem = {
  url: string;
  title: string;
  description: string;
  publishedAt?: Date;
  tags?: string[];
  author?: string;
  coverImage?: string;
  itemType?: string;
};

type DataFeedOptions = {
  feedUrl: string;
  name: string;
  description: string;
  items: FeedItem[];
};

const ensureUrl = (value: string, label: string) => {
  try {
    new URL(value);
  } catch {
    throw new Error(`Feed error: ${label} must be a valid absolute URL`);
  }
};

export const buildDataFeed = ({ feedUrl, name, description, items }: DataFeedOptions) => {
  ensureUrl(feedUrl, 'feedUrl');
  items.forEach((item, index) => {
    ensureUrl(item.url, `items[${index}].url`);
  });

  const organisationId = `${SITE_URL}#organisation`;
  const websiteId = `${SITE_URL}#website`;
  const serviceId = `${iBOM.url}#service`;
  const feedId = `${feedUrl}#datafeed`;

  const sortedByDate = items
    .filter((item) => item.publishedAt instanceof Date && Number.isFinite(item.publishedAt.valueOf()))
    .sort((a, b) => (b.publishedAt?.valueOf() ?? 0) - (a.publishedAt?.valueOf() ?? 0));
  const dateModified = sortedByDate[0]?.publishedAt?.toISOString();

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organisationId,
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      description: ORGANIZATION.description,
      knowsAbout: [serviceId]
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': organisationId }
    },
    {
      '@type': 'DataFeed',
      '@id': feedId,
      url: feedUrl,
      name,
      description,
      isPartOf: { '@id': websiteId },
      publisher: { '@id': organisationId },
      dateModified,
      dataFeedElement: items.map((item) => ({
        '@type': 'DataFeedItem',
        dateCreated: item.publishedAt ? item.publishedAt.toISOString() : undefined,
        item: {
          '@type': item.itemType ?? 'WebPage',
          '@id': item.url,
          url: item.url,
          name: item.title,
          description: item.description,
          author: item.author
            ? {
                '@type': 'Organization',
                name: item.author,
                url: ORGANIZATION.url
              }
            : undefined,
          keywords: item.tags?.join(', '),
          image: item.coverImage ? { '@type': 'ImageObject', url: item.coverImage } : undefined,
          about: [{ '@id': serviceId }]
        }
      }))
    }
  ];

  // Strip `undefined` values so the JSON-LD stays clean.
  const stripUndefined = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(stripUndefined).filter((v) => v !== undefined);
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      const next: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        const cleaned = stripUndefined(v);
        if (cleaned !== undefined) next[k] = cleaned;
      }
      return next;
    }
    return value === undefined ? undefined : value;
  };

  return stripUndefined({
    '@context': 'https://schema.org',
    '@graph': graph
  });
};
