type RssItem = {
  title: string;
  description: string;
  url: string;
  publishedAt?: Date;
};

type RssFeedOptions = {
  title: string;
  description: string;
  siteUrl: string;
  feedUrl: string;
  items: RssItem[];
};

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const buildRssFeed = ({ title, description, siteUrl, feedUrl, items }: RssFeedOptions) => {
  const lastBuildDate =
    items
      .map((item) => item.publishedAt?.valueOf() ?? 0)
      .sort((a, b) => b - a)[0] ?? Date.now();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${escapeXml(siteUrl)}</link>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <language>en-gb</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      ${item.publishedAt ? `<pubDate>${item.publishedAt.toUTCString()}</pubDate>` : ''}
    </item>`
      )
      .join('\n    ')}
  </channel>
</rss>`;
};
