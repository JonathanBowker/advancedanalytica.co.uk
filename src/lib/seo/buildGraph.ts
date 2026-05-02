import { BRANDO_SCHEMA_URL, DEFAULT_OG_IMAGE, iBOM, ORGANIZATION, SITE_NAME, SITE_URL, toAbsoluteUrl } from './site';

type Breadcrumb = {
  name: string;
  url: string;
};

type ArticleMeta = {
  title: string;
  description: string;
  publishedAt: Date;
  modifiedAt?: Date;
  author?: string;
  tags?: string[];
  section?: string;
  url: string;
  image?: string;
  imageAlt?: string;
};

type PageSchemaType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage'
  | 'SearchResultsPage';

type PageMeta = {
  title: string;
  description: string;
  url: string;
  breadcrumbs: Breadcrumb[];
  schemaType?: PageSchemaType;
  image?: string;
  imageAlt?: string;
  isArticle?: boolean;
  article?: ArticleMeta;
};

const ensure = (condition: boolean, message: string) => {
  if (!condition) {
    throw new Error(`SEO graph error: ${message}`);
  }
};

const ensureUrl = (value: string, label: string) => {
  try {
    new URL(value);
  } catch {
    throw new Error(`SEO graph error: ${label} must be a valid absolute URL`);
  }
};

export const buildGraph = (page: PageMeta) => {
  ensure(Boolean(page.title), 'title is required');
  ensure(Boolean(page.description), 'description is required');
  ensure(Boolean(page.url), 'url is required');
  ensure(page.breadcrumbs?.length > 0, 'breadcrumbs are required');
  ensure(Boolean(BRANDO_SCHEMA_URL), 'Brando Schema URL must be set');

  ensureUrl(page.url, 'page.url');
  page.breadcrumbs.forEach((crumb, index) => {
    ensure(Boolean(crumb.name), `breadcrumb[${index}].name is required`);
    ensure(Boolean(crumb.url), `breadcrumb[${index}].url is required`);
    ensureUrl(crumb.url, `breadcrumb[${index}].url`);
  });

  const organisationId = `${SITE_URL}#organisation`;
  const websiteId = `${SITE_URL}#website`;
  const serviceId = `${iBOM.url}#service`;
  const brandoId = `${BRANDO_SCHEMA_URL}#project`;
  const pageId = `${page.url}#webpage`;
  const pageSchemaType = page.schemaType ?? 'WebPage';
  const pageImage = toAbsoluteUrl(page.image) ?? toAbsoluteUrl(page.article?.image) ?? DEFAULT_OG_IMAGE;
  const pageImageAlt = page.imageAlt ?? page.article?.imageAlt ?? page.description;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organisationId,
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      description: ORGANIZATION.description,
      logo: ORGANIZATION.logo,
      knowsAbout: [serviceId, brandoId]
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': organisationId },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': pageSchemaType,
      '@id': pageId,
      name: page.title,
      description: page.description,
      url: page.url,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: pageImage,
        description: pageImageAlt
      },
      isPartOf: { '@id': websiteId },
      about: [{ '@id': serviceId }],
      breadcrumb: { '@id': `${page.url}#breadcrumb` }
    },
    {
      '@type': 'Service',
      '@id': serviceId,
      name: iBOM.name,
      description: iBOM.description,
      url: iBOM.url,
      provider: { '@id': organisationId },
      subjectOf: { '@id': brandoId }
    },
    {
      '@type': 'CreativeWork',
      '@id': brandoId,
      name: 'Brando Schema',
      url: BRANDO_SCHEMA_URL,
      creator: { '@id': organisationId }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    }
  ];

  if (page.isArticle && page.article) {
    ensureUrl(page.article.url, 'article.url');
    graph.push({
      '@type': 'TechArticle',
      '@id': `${page.article.url}#article`,
      headline: page.article.title,
      description: page.article.description,
      datePublished: page.article.publishedAt.toISOString(),
      dateModified: (page.article.modifiedAt ?? page.article.publishedAt).toISOString(),
      author: {
        '@type': 'Organization',
        name: page.article.author ?? ORGANIZATION.name,
        url: ORGANIZATION.url
      },
      publisher: { '@id': organisationId },
      image: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(page.article.image) ?? pageImage,
        description: page.article.imageAlt ?? pageImageAlt
      },
      mainEntityOfPage: { '@id': pageId },
      keywords: page.article.tags?.join(', '),
      articleSection: page.article.section,
      about: [{ '@id': serviceId }]
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
};

export type { PageMeta, ArticleMeta, Breadcrumb };
