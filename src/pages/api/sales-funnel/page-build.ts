import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';
import { SITE_URL } from '../../../lib/seo/site';

export const prerender = false;

const defaultPackUrl = 'https://aa-sales-funnel-packs.lon1.digitaloceanspaces.com/ai-sales-funnel.zip';
const defaultTriggerApiUrl = 'http://188.166.152.62:8080';
const defaultPageBaseUrl = 'https://aa-sales-funnel-packs.lon1.digitaloceanspaces.com/pages';
const defaultSpacesBucket = 'aa-sales-funnel-packs';
const defaultSpacesRegion = 'lon1';
const defaultSpacesPagePrefix = 'pages';
const defaultWrapperClient = 'advanced-analytica';
const defaultWrapperWorkflow = 'sales-funnel-page-build';
const defaultPrefectFlowName = 'sales-funnel-page-build';
const defaultPrefectDeploymentName = 'sales-funnel-page-build';
const triggerTimeoutMs = 8000;
const pageReadyTimeoutMs = 22000;
const pageReadyPollMs = 1000;
const failedDependencyStatus = 424;

function getEnv(name: string) {
  return String(
    (import.meta.env as Record<string, string | undefined>)[name] || process.env[name] || '',
  ).trim();
}

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function generateTrackingId() {
  return `aa_${randomUUID().replaceAll('-', '_')}`;
}

function getRequestBodyValue(body: unknown, key: string) {
  if (!body || typeof body !== 'object') return '';
  const value = (body as Record<string, unknown>)[key];
  return typeof value === 'string' ? value.trim() : '';
}

async function readJson(response: Response) {
  return response.json().catch(() => ({}));
}

function triggerSignal() {
  return AbortSignal.timeout(triggerTimeoutMs);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPrefectApiUrl(value: string) {
  const url = new URL(value || defaultTriggerApiUrl);
  const pathname = url.pathname.replace(/\/+$/, '');

  if (!pathname || pathname === '/v2/runs/flow-run') {
    url.pathname = '/api';
  } else if (!pathname.endsWith('/api')) {
    url.pathname = `${pathname}/api`;
  }

  url.search = '';
  url.hash = '';
  return url.toString().replace(/\/+$/, '');
}

function shouldUsePrefect(triggerApiUrl: string) {
  const mode = getEnv('SALES_FUNNEL_TRIGGER_MODE').toLowerCase();
  if (mode === 'prefect') return true;
  if (mode === 'wrapper') return false;

  const value = triggerApiUrl.toLowerCase();
  return (
    value.includes('prefect.') ||
    value.includes(':4200') ||
    value.includes('/api') ||
    value.includes('/v2/runs/flow-run')
  );
}

function getTriggerApiUrl() {
  const configuredUrl = getEnv('SALES_FUNNEL_TRIGGER_API_URL');
  const mode = getEnv('SALES_FUNNEL_TRIGGER_MODE').toLowerCase();

  if (
    configuredUrl &&
    mode !== 'wrapper' &&
    /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(configuredUrl)
  ) {
    return defaultTriggerApiUrl;
  }

  return configuredUrl || defaultTriggerApiUrl;
}

function getSalesFunnelPageBaseUrl() {
  return (getEnv('SALES_FUNNEL_PAGE_BASE_URL') || defaultPageBaseUrl).replace(/\/+$/, '');
}

function buildAssistantUrl(assistant: string, pageUrl: string) {
  const prompt = `Read from ${pageUrl} so I can ask questions about its contents`;
  const encodedPrompt = encodeURIComponent(prompt);
  if (assistant === 'claude') return `https://claude.ai/new?q=${encodedPrompt}`;
  return `https://chatgpt.com/?hint=search&q=${encodedPrompt}`;
}

async function waitForPageReady(pageUrl: string) {
  const deadline = Date.now() + pageReadyTimeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(pageUrl, {
        headers: { Accept: 'text/html,text/markdown;q=0.9,*/*;q=0.1' },
        signal: AbortSignal.timeout(3000),
      });
      if (response.ok) return true;
    } catch {
      // The worker may still be creating the page.
    }
    await sleep(pageReadyPollMs);
  }
  return false;
}

function getPrefectHeaders(triggerApiKey: string) {
  return {
    'Content-Type': 'application/json',
    ...(triggerApiKey ? { Authorization: `Bearer ${triggerApiKey}` } : {}),
  };
}

async function getPrefectDeploymentId({
  prefectApiUrl,
  triggerApiKey,
  flowName,
  deploymentName,
}: {
  prefectApiUrl: string;
  triggerApiKey: string;
  flowName: string;
  deploymentName: string;
}) {
  const configuredDeploymentId =
    getEnv('SALES_FUNNEL_PREFECT_DEPLOYMENT_ID') || getEnv('PREFECT_DEPLOYMENT_ID');

  if (configuredDeploymentId) return configuredDeploymentId;

  const response = await fetch(
    `${prefectApiUrl}/deployments/name/${encodeURIComponent(flowName)}/${encodeURIComponent(deploymentName)}`,
    {
      headers: getPrefectHeaders(triggerApiKey),
      signal: triggerSignal(),
    },
  );
  const payload = await readJson(response);

  if (!response.ok || typeof payload.id !== 'string') {
    return {
      error: true as const,
      status: response.status,
      payload,
    };
  }

  return payload.id;
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const triggerApiUrl = getTriggerApiUrl();
  const triggerApiKey =
    getEnv('SALES_FUNNEL_TRIGGER_API_KEY') || getEnv('PREFECT_API_KEY');
  const wrapperClient = getEnv('SALES_FUNNEL_TRIGGER_CLIENT') || defaultWrapperClient;
  const wrapperWorkflow = getEnv('SALES_FUNNEL_TRIGGER_WORKFLOW') || defaultWrapperWorkflow;
  const prefectFlowName = getEnv('SALES_FUNNEL_PREFECT_FLOW_NAME') || defaultPrefectFlowName;
  const prefectDeploymentName =
    getEnv('SALES_FUNNEL_PREFECT_DEPLOYMENT_NAME') || defaultPrefectDeploymentName;
  const sourceUrl = getRequestBodyValue(body, 'sourceUrl') || `${SITE_URL}/`;
  const assistant = getRequestBodyValue(body, 'assistant') || 'unknown';
  const trackingId = generateTrackingId();
  const pageBaseUrl = getSalesFunnelPageBaseUrl();
  const pageUrl = `${pageBaseUrl}/${encodeURIComponent(trackingId)}.md`;
  const markdownUrl = pageUrl;
  const htmlPageUrl = `${triggerApiUrl.replace(/\/+$/, '')}/sales-funnel/pages/${encodeURIComponent(
    trackingId,
  )}`;
  const assistantUrl = buildAssistantUrl(assistant, pageUrl);

  const parameters = {
    campaign_source: `advanced-analytica-homepage-${assistant}`,
    tracking_id: trackingId,
    company_identifier: 'advanced-analytica-homepage',
    pitch_title: 'Brand-first AI governance',
    pitch_body:
      'Advanced Analytica turns brand standards, business rules, approvals, policies, and expert judgement into governed AI operating assets that agents can follow consistently.',
    deeper_pack_url: getEnv('SALES_FUNNEL_DEEPER_PACK_URL') || defaultPackUrl,
    booking_url: `${SITE_URL}/company/contact/`,
    ask_source_url: pageUrl || sourceUrl,
    template_path: 'templates/sales-pitch-page-template.md',
    output_dir: 'data/tmp/pages',
    store_path: 'data/tmp/funnel-events.json',
    spaces_bucket: getEnv('SALES_FUNNEL_SPACES_BUCKET') || defaultSpacesBucket,
    spaces_region: getEnv('SALES_FUNNEL_SPACES_REGION') || defaultSpacesRegion,
    spaces_key_prefix: getEnv('SALES_FUNNEL_SPACES_PAGE_PREFIX') || defaultSpacesPagePrefix,
    spaces_public_base_url: pageBaseUrl,
  };

  try {
    if (shouldUsePrefect(triggerApiUrl)) {
      const prefectApiUrl = getPrefectApiUrl(triggerApiUrl);
      const deploymentId = await getPrefectDeploymentId({
        prefectApiUrl,
        triggerApiKey,
        flowName: prefectFlowName,
        deploymentName: prefectDeploymentName,
      });

      if (typeof deploymentId !== 'string') {
        return jsonResponse(
          {
            ok: false,
            error: 'Prefect deployment lookup failed.',
            status: deploymentId.status,
            details: deploymentId.payload,
          },
          failedDependencyStatus,
        );
      }

      const response = await fetch(
        `${prefectApiUrl}/deployments/${encodeURIComponent(deploymentId)}/create_flow_run`,
        {
          method: 'POST',
          headers: getPrefectHeaders(triggerApiKey),
          signal: triggerSignal(),
          body: JSON.stringify({
            parameters,
            idempotency_key: trackingId,
            name: `advanced-analytica-${assistant}-${trackingId}`,
            tags: ['advanced-analytica', 'sales-funnel', assistant],
          }),
        },
      );

      const payload = await readJson(response);
      if (!response.ok) {
        return jsonResponse(
          {
            ok: false,
            error: 'Prefect flow run creation was rejected.',
            status: response.status,
            details: payload,
          },
          failedDependencyStatus,
        );
      }

      const pageReady = await waitForPageReady(pageUrl);
      return jsonResponse({
        ok: true,
        tracking_id: trackingId,
        flow_run_id: payload.id,
        deployment_id: deploymentId,
        state: payload.state,
        page_url: pageUrl,
        markdown_url: markdownUrl,
        html_page_url: htmlPageUrl,
        assistant_url: assistantUrl,
        page_ready: pageReady,
      });
    }

    const response = await fetch(
      `${triggerApiUrl.replace(/\/+$/, '')}/flows/${wrapperClient}/${wrapperWorkflow}/run`,
      {
        method: 'POST',
        signal: triggerSignal(),
        headers: {
          'Content-Type': 'application/json',
          ...(triggerApiKey ? { 'X-API-Key': triggerApiKey } : {}),
        },
        body: JSON.stringify({ parameters }),
      },
    );

    const payload = await readJson(response);
    if (!response.ok) {
      return jsonResponse(
        {
          ok: false,
          error: 'Sales funnel trigger was rejected.',
          status: response.status,
          details: payload,
        },
        failedDependencyStatus,
      );
    }

    const pageReady = await waitForPageReady(pageUrl);
    return jsonResponse({
      ok: true,
      tracking_id: trackingId,
      flow_run_id: payload.flow_run_id,
      deployment_name: payload.deployment_name,
      state: payload.state,
      page_url: pageUrl,
      markdown_url: markdownUrl,
      html_page_url: htmlPageUrl,
      assistant_url: assistantUrl,
      page_ready: pageReady,
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Sales funnel trigger failed.',
      },
      failedDependencyStatus,
    );
  }
};
