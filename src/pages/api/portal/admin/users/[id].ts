import type { APIRoute } from 'astro';
import { createSupabaseAdminClient, isSupabaseAdminConfigured } from '../../../../../lib/supabaseAdmin';
import { requirePortalAdmin, portalJson } from '../../../../../lib/portalAdmin';

export const prerender = false;

const allowedRoles = new Set(['admin', 'operator', 'developer', 'consultant', 'partner', 'client']);

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

function toClientUser(user: any) {
  const appMetadata = user?.app_metadata || {};
  const userMetadata = user?.user_metadata || {};
  const roles = normalizeRoles(appMetadata.roles || appMetadata.role || userMetadata.roles || userMetadata.role);

  return {
    id: user.id,
    email: user.email || '',
    roles,
    disabled: Boolean(user.banned_until),
    emailConfirmedAt: user.email_confirmed_at || '',
    invitedAt: user.invited_at || '',
    lastSignInAt: user.last_sign_in_at || '',
    createdAt: user.created_at || '',
  };
}

export const PATCH: APIRoute = async ({ request, cookies, params }) => {
  const auth = await requirePortalAdmin(request, cookies);
  if ('error' in auth) return auth.error;

  if (!isSupabaseAdminConfigured) {
    return portalJson({ error: 'Supabase service-role admin client is not configured.' }, 500);
  }

  const id = String(params.id || '').trim();
  const body = await request.json().catch(() => ({}));
  const roles = normalizeRoles(body.roles);

  if (!id) return portalJson({ error: 'Missing user id.' }, 400);
  if (!roles.length) return portalJson({ error: 'Choose at least one role.' }, 400);

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.updateUserById(id, {
    app_metadata: {
      roles,
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
