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
    company: getProfileValue(userMetadata, 'company', 'company_name', 'organisation', 'organization'),
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
  const company = cleanText(body.company);
  const roles = normalizeRoles(body.roles);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return portalJson({ error: 'Enter a valid email address.' }, 400);
  }

  if (!company) {
    return portalJson({ error: 'Enter the user company.' }, 400);
  }

  if (!roles.length) {
    return portalJson({ error: 'Choose at least one role.' }, 400);
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      company,
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
      user_metadata: {
        ...(data.user.user_metadata || {}),
        company,
      },
    });
  }

  return portalJson(
    {
      user: data.user
        ? toClientUser({
            ...data.user,
            app_metadata: { ...(data.user.app_metadata || {}), roles },
            user_metadata: { ...(data.user.user_metadata || {}), company },
          })
        : null,
    },
    201,
  );
};
