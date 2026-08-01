import type { AstroCookies } from 'astro';
import { createSupabaseServerClient, isSupabaseConfigured } from './supabaseServer';
import { getPortalAccess } from './portalAccess';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function configuredSuperadminEmails() {
  return String(import.meta.env.PORTAL_SUPERADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requirePortalAdmin(request: Request, cookies: AstroCookies) {
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
  const email = String(user.email || '').toLowerCase();
  const isConfiguredSuperadmin = configuredSuperadminEmails().includes(email);

  if (!access.isAdmin && !isConfiguredSuperadmin) {
    return { error: json({ error: 'Superadmin access required.' }, 403) };
  }

  return { user, access };
}

export function portalJson(data: unknown, status = 200) {
  return json(data, status);
}
