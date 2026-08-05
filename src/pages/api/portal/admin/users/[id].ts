import type { APIRoute } from 'astro';
import { createSupabaseAdminClient, isSupabaseAdminConfigured } from '../../../../../lib/supabaseAdmin';
import { requirePortalAdmin, portalJson } from '../../../../../lib/portalAdmin';
import { portalAssignableRoles } from '../../../../../lib/portalAccess';

export const prerender = false;

const allowedRoles = new Set(portalAssignableRoles);

function normalizeRoles(value: unknown) {
  const roles = Array.isArray(value)
    ? value
    : String(value || '')
        .split(/[,\s]+/)
        .filter(Boolean);

  return Array.from(
    new Set(
      roles
        .map((role) =>
          String(role || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_'),
        )
        .filter((role) => allowedRoles.has(role)),
    ),
  );
}

function cleanText(value: unknown) {
  return String(value || '').trim();
}

function getProfileValue(metadata: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = metadata[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  return '';
}

function toClientUser(user: any) {
  const appMetadata = user?.app_metadata || {};
  const userMetadata = user?.user_metadata || {};
  const roles = normalizeRoles(appMetadata.roles || appMetadata.role || userMetadata.roles || userMetadata.role);

  return {
    id: user.id,
    email: user.email || '',
    name: getProfileValue(userMetadata, 'full_name', 'name', 'display_name'),
    company: getProfileValue(userMetadata, 'company', 'company_name', 'organisation', 'organization'),
    roles,
    disabled: Boolean(user.banned_until),
    emailConfirmedAt: user.email_confirmed_at || '',
    invitedAt: user.invited_at || '',
    lastSignInAt: user.last_sign_in_at || '',
    createdAt: user.created_at || '',
  };
}

export const GET: APIRoute = async ({ request, cookies, params }) => {
  const auth = await requirePortalAdmin(request, cookies);
  if ('error' in auth) return auth.error;

  if (!isSupabaseAdminConfigured) {
    return portalJson({ error: 'Supabase service-role admin client is not configured.' }, 500);
  }

  const id = String(params.id || '').trim();
  if (!id) return portalJson({ error: 'Missing user id.' }, 400);

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.getUserById(id);

  if (error) return portalJson({ error: error.message }, error.status || 400);
  if (!data.user) return portalJson({ error: 'User not found.' }, 404);

  return portalJson({ user: toClientUser(data.user) });
};

export const PATCH: APIRoute = async ({ request, cookies, params }) => {
  const auth = await requirePortalAdmin(request, cookies);
  if ('error' in auth) return auth.error;

  if (!isSupabaseAdminConfigured) {
    return portalJson({ error: 'Supabase service-role admin client is not configured.' }, 500);
  }

  const id = String(params.id || '').trim();
  const body = await request.json().catch(() => ({}));
  const name = cleanText(body.name);
  const company = cleanText(body.company);
  const roles = normalizeRoles(body.roles);

  if (!id) return portalJson({ error: 'Missing user id.' }, 400);
  if (!roles.length) return portalJson({ error: 'Choose at least one role.' }, 400);

  const admin = createSupabaseAdminClient();
  const { data: existingData, error: existingError } = await admin.auth.admin.getUserById(id);

  if (existingError) return portalJson({ error: existingError.message }, existingError.status || 400);

  const existingUser = existingData.user;
  const { data, error } = await admin.auth.admin.updateUserById(id, {
    app_metadata: {
      ...(existingUser?.app_metadata || {}),
      roles,
    },
    user_metadata: {
      ...(existingUser?.user_metadata || {}),
      full_name: name,
      name,
      display_name: name,
      company,
    },
    ban_duration: body.disabled ? '876000h' : 'none',
  });

  if (error) return portalJson({ error: error.message }, error.status || 400);

  return portalJson({ user: toClientUser(data.user) });
};

export const DELETE: APIRoute = async ({ request, cookies, params }) => {
  const auth = await requirePortalAdmin(request, cookies);
  if ('error' in auth) return auth.error;

  if (!isSupabaseAdminConfigured) {
    return portalJson({ error: 'Supabase service-role admin client is not configured.' }, 500);
  }

  const id = String(params.id || '').trim();
  if (!id) return portalJson({ error: 'Missing user id.' }, 400);
  if (id === auth.user.id) return portalJson({ error: 'You cannot delete your own account here.' }, 400);

  const admin = createSupabaseAdminClient();
  const { error } = await admin.auth.admin.deleteUser(id);

  if (error) return portalJson({ error: error.message }, error.status || 400);

  return portalJson({ ok: true });
};
