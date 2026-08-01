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

export const GET: APIRoute = async ({ request, cookies }) => {
  const auth = await requirePortalAdmin(request, cookies);
  if ('error' in auth) return auth.error;

  if (!isSupabaseAdminConfigured) {
    return portalJson({ error: 'Supabase service-role admin client is not configured.' }, 500);
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  if (error) return portalJson({ error: error.message }, 400);

  return portalJson({ users: (data.users || []).map(toClientUser) });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth = await requirePortalAdmin(request, cookies);
  if ('error' in auth) return auth.error;

  if (!isSupabaseAdminConfigured) {
    return portalJson({ error: 'Supabase service-role admin client is not configured.' }, 500);
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const roles = normalizeRoles(body.roles);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return portalJson({ error: 'Enter a valid email address.' }, 400);
  }

  if (!roles.length) {
    return portalJson({ error: 'Choose at least one role.' }, 400);
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      roles,
    },
  });

  if (error) return portalJson({ error: error.message }, error.status || 400);

  if (data.user?.id) {
    await admin.auth.admin.updateUserById(data.user.id, {
      app_metadata: {
        ...(data.user.app_metadata || {}),
        roles,
      },
    });
  }

  return portalJson({ user: data.user ? toClientUser({ ...data.user, app_metadata: { ...(data.user.app_metadata || {}), roles } }) : null }, 201);
};
