import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';
import { SITE_URL } from '../../../lib/seo/site';

export const prerender = false;

const defaultPackUrl = 'https://advancedanalytica.co.uk/packs/ai-sales-funnel.zip';
const defaultTriggerApiUrl = 'http://127.0.0.1:8080';

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

export const POST: APIRoute = async ({ request }) => {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const triggerApiUrl = getEnv('SALES_FUNNEL_TRIGGER_API_URL') || defaultTriggerApiUrl;
  const triggerApiKey = getEnv('SALES_FUNNEL_TRIGGER_API_KEY');
  const triggerClient = getEnv('SALES_FUNNEL_TRIGGER_CLIENT') || 'sales-funnel';
  const sourceUrl = getRequestBodyValue(body, 'sourceUrl') || `${SITE_URL}/`;
  const assistant = getRequestBodyValue(body, 'assistant') || 'unknown';
  const trackingId = generateTrackingId();

  const parameters = {
    campaign_source: `advanced-analytica-homepage-${assistant}`,
    tracking_id: trackingId,
    company_identifier: 'advanced-analytica-homepage',
    pitch_title: 'Brand-first AI governance',
    pitch_body:
      'Advanced Analytica turns brand standards, business rules, approvals, policies, and expert judgement into governed AI operating assets that agents can follow consistently.',
    deeper_pack_url: getEnv('SALES_FUNNEL_DEEPER_PACK_URL') || defaultPackUrl,
    booking_url: `${SITE_URL}/company/contact/`,
    ask_source_url: sourceUrl,
    template_path: 'templates/sales-pitch-page-template.md',
    output_dir: 'data/tmp/pages',
    store_path: 'data/tmp/funnel-events.json',
  };

  try {
    const response = await fetch(
      `${triggerApiUrl.replace(/\/+$/, '')}/flows/${triggerClient}/page-build/run`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(triggerApiKey ? { 'X-API-Key': triggerApiKey } : {}),
        },
        body: JSON.stringify({ parameters }),
      },
    );

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      return jsonResponse(
        {
          ok: false,
          error: 'Sales funnel trigger was rejected.',
          status: response.status,
          details: payload,
        },
        502,
      );
    }

    return jsonResponse({
      ok: true,
      tracking_id: trackingId,
      flow_run_id: payload.flow_run_id,
      deployment_name: payload.deployment_name,
      state: payload.state,
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Sales funnel trigger failed.',
      },
      502,
    );
  }
};
