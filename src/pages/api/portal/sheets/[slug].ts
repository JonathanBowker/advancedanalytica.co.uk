import type { APIRoute } from 'astro';
import type { AstroCookies } from 'astro';
import { createSupabaseServerClient, isSupabaseConfigured } from '../../../../lib/supabaseServer';
import { toClientSheet, toDatabaseSheet } from '../../../../lib/internalSheets';
import { getPortalAccess } from '../../../../lib/portalAccess';
import { resolveTenantFromRequest } from '../../../../lib/tenants';

export const prerender = false;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

async function getAuthorizedContext(request: Request, cookies: AstroCookies) {
  if (!isSupabaseConfigured) {
    return { error: json({ error: 'Supabase is not configured.' }, 500) };
  }

  const supabase = createSupabaseServerClient({ request, cookies });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { error: json({ error: 'Sign in required.' }, 401) };
  }

  const access = getPortalAccess(user);
  if (!access.isInternal) {
    return { error: json({ error: 'Internal access required.' }, 403) };
  }

  return {
    supabase,
    user,
    tenant: resolveTenantFromRequest(request),
  };
}

export const GET: APIRoute = async ({ request, cookies, params }) => {
  const context = await getAuthorizedContext(request, cookies);
  if ('error' in context) return context.error;

  const { data, error } = await context.supabase
    .from('internal_sheets')
    .select('*')
    .eq('tenant_slug', context.tenant.slug)
    .eq('slug', params.slug || '')
    .single();

  if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 400);

  return json({ sheet: toClientSheet(data) });
};

export const PUT: APIRoute = async ({ request, cookies, params }) => {
  const context = await getAuthorizedContext(request, cookies);
  if ('error' in context) return context.error;

  const body = await request.json().catch(() => ({}));
  const sheet = toDatabaseSheet({ ...body, slug: params.slug || body.slug });

  const { data, error } = await context.supabase
    .from('internal_sheets')
    .update({
      ...sheet,
      updated_by: context.user.id,
    })
    .eq('tenant_slug', context.tenant.slug)
    .eq('slug', params.slug || '')
    .select('*')
    .single();

  if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 400);

  return json({ sheet: toClientSheet(data) });
};

export const DELETE: APIRoute = async ({ request, cookies, params }) => {
  const context = await getAuthorizedContext(request, cookies);
  if ('error' in context) return context.error;

  const { error } = await context.supabase
    .from('internal_sheets')
    .delete()
    .eq('tenant_slug', context.tenant.slug)
    .eq('slug', params.slug || '');

  if (error) return json({ error: error.message }, 400);

  return json({ ok: true });
};
