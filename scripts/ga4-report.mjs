import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DEFAULT_OUTPUT_DIR = path.join(ROOT, '.reports', 'ga4');

function readArg(name, fallback) {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

async function loadDotEnvFile(filePath) {
  try {
    const raw = await readFile(filePath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
      const [key, ...valueParts] = trimmed.split('=');
      if (!process.env[key]) {
        process.env[key] = valueParts.join('=').replace(/^['"]|['"]$/g, '');
      }
    }
  } catch {
    // Local env files are optional.
  }
}

async function loadLocalEnv() {
  await loadDotEnvFile(path.join(ROOT, '.env.local'));
  await loadDotEnvFile(path.join(ROOT, '.env'));
}

function buildClient() {
  const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const inlineJson = process.env.GA_SERVICE_ACCOUNT_JSON;

  if (inlineJson) {
    return new BetaAnalyticsDataClient({
      credentials: JSON.parse(inlineJson),
    });
  }

  if (keyFilename) {
    return new BetaAnalyticsDataClient({ keyFilename });
  }

  return new BetaAnalyticsDataClient();
}

function getMetricValue(row, index) {
  return Number(row.metricValues?.[index]?.value ?? 0);
}

function getDimensionValue(row, index) {
  return row.dimensionValues?.[index]?.value ?? '';
}

function rowsToObjects(response, dimensions, metrics) {
  return (response.rows ?? []).map((row) => {
    const item = {};
    dimensions.forEach((dimension, index) => {
      item[dimension] = getDimensionValue(row, index);
    });
    metrics.forEach((metric, index) => {
      item[metric] = getMetricValue(row, index);
    });
    return item;
  });
}

async function runReport(client, propertyId, { dimensions, metrics, dateRanges, limit = 20, orderByMetric }) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges,
    dimensions: dimensions.map((name) => ({ name })),
    metrics: metrics.map((name) => ({ name })),
    limit,
    orderBys: orderByMetric
      ? [
          {
            metric: { metricName: orderByMetric },
            desc: true,
          },
        ]
      : undefined,
  });

  return rowsToObjects(response, dimensions, metrics);
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-GB').format(Math.round(value));
}

function formatDecimal(value) {
  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 2,
  }).format(value);
}

function markdownTable(rows, columns) {
  if (!rows.length) return '_No data returned._';
  const headers = columns.map((column) => column.label);
  const divider = columns.map(() => '---');
  const body = rows.map((row) =>
    columns.map((column) => {
      const value = row[column.key];
      if (typeof value === 'number') {
        return Number.isInteger(value) ? formatNumber(value) : formatDecimal(value);
      }
      return String(value || '').replace(/\|/g, '\\|');
    }),
  );

  return [headers, divider, ...body].map((cells) => `| ${cells.join(' | ')} |`).join('\n');
}

function buildMarkdown({ propertyId, startDate, endDate, generatedAt, reports }) {
  return `# GA4 Report

Property: \`${propertyId}\`

Date range: \`${startDate}\` to \`${endDate}\`

Generated: \`${generatedAt}\`

## Top Pages

${markdownTable(reports.topPages, [
  { key: 'pagePath', label: 'Path' },
  { key: 'pageTitle', label: 'Title' },
  { key: 'screenPageViews', label: 'Views' },
  { key: 'activeUsers', label: 'Users' },
  { key: 'averageSessionDuration', label: 'Avg Session Seconds' },
])}

## Traffic Sources

${markdownTable(reports.trafficSources, [
  { key: 'sessionDefaultChannelGroup', label: 'Channel' },
  { key: 'sessionSourceMedium', label: 'Source / Medium' },
  { key: 'sessions', label: 'Sessions' },
  { key: 'activeUsers', label: 'Users' },
  { key: 'engagementRate', label: 'Engagement Rate' },
])}

## Landing Pages

${markdownTable(reports.landingPages, [
  { key: 'landingPagePlusQueryString', label: 'Landing Page' },
  { key: 'sessions', label: 'Sessions' },
  { key: 'activeUsers', label: 'Users' },
  { key: 'engagedSessions', label: 'Engaged Sessions' },
])}

## Search Terms

${markdownTable(reports.searchTerms, [
  { key: 'searchTerm', label: 'Search Term' },
  { key: 'eventCount', label: 'Events' },
  { key: 'activeUsers', label: 'Users' },
])}

## Devices

${markdownTable(reports.devices, [
  { key: 'deviceCategory', label: 'Device' },
  { key: 'activeUsers', label: 'Users' },
  { key: 'sessions', label: 'Sessions' },
])}
`;
}

async function main() {
  await loadLocalEnv();

  const propertyId = readArg('property', process.env.GA4_PROPERTY_ID);
  const startDate = readArg('start', process.env.GA4_START_DATE || '30daysAgo');
  const endDate = readArg('end', process.env.GA4_END_DATE || 'today');
  const outputDir = readArg('output', process.env.GA4_OUTPUT_DIR || DEFAULT_OUTPUT_DIR);

  if (!propertyId) {
    throw new Error('Missing GA4_PROPERTY_ID. Set it in .env.local or pass --property=123456789.');
  }

  const dateRanges = [{ startDate, endDate }];
  const client = buildClient();

  const reports = {
    topPages: await runReport(client, propertyId, {
      dateRanges,
      dimensions: ['pagePath', 'pageTitle'],
      metrics: ['screenPageViews', 'activeUsers', 'averageSessionDuration'],
      limit: 25,
      orderByMetric: 'screenPageViews',
    }),
    trafficSources: await runReport(client, propertyId, {
      dateRanges,
      dimensions: ['sessionDefaultChannelGroup', 'sessionSourceMedium'],
      metrics: ['sessions', 'activeUsers', 'engagementRate'],
      limit: 25,
      orderByMetric: 'sessions',
    }),
    landingPages: await runReport(client, propertyId, {
      dateRanges,
      dimensions: ['landingPagePlusQueryString'],
      metrics: ['sessions', 'activeUsers', 'engagedSessions'],
      limit: 25,
      orderByMetric: 'sessions',
    }),
    searchTerms: await runReport(client, propertyId, {
      dateRanges,
      dimensions: ['searchTerm'],
      metrics: ['eventCount', 'activeUsers'],
      limit: 25,
      orderByMetric: 'eventCount',
    }),
    devices: await runReport(client, propertyId, {
      dateRanges,
      dimensions: ['deviceCategory'],
      metrics: ['activeUsers', 'sessions'],
      limit: 10,
      orderByMetric: 'activeUsers',
    }),
  };

  const generatedAt = new Date().toISOString();
  const payload = {
    propertyId,
    startDate,
    endDate,
    generatedAt,
    reports,
  };

  await mkdir(outputDir, { recursive: true });
  const jsonPath = path.join(outputDir, 'latest.json');
  const markdownPath = path.join(outputDir, 'latest.md');
  await writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`);
  await writeFile(markdownPath, buildMarkdown(payload));

  console.log(`GA4 report written to ${jsonPath}`);
  console.log(`GA4 report written to ${markdownPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
