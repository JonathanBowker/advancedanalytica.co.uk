import type { APIRoute } from 'astro';
import { createSupabaseServerClient, isSupabaseConfigured } from '../../../lib/supabaseServer';
import { getTenantHomePath } from '../../../lib/tenants';

export const prerender = false;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeOtpToken(token: string) {
  return token.replace(/\D/g, '').slice(0, 6);
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function getErrorDetails(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return {
    name: 'UnknownError',
    message: String(error || 'Unknown verify error'),
  };
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isSupabaseConfigured) {
    return jsonResponse({ error: 'Supabase is not configured.', code: 'auth_not_configured' }, 500);
  }

  let body: any;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Send a valid security-code request.', code: 'bad_json' }, 400);
  }

  try {
    const email = String(body?.email || '').trim().toLowerCase();
    const token = normalizeOtpToken(String(body?.token || ''));
    const nextUrl = String(body?.nextUrl || getTenantHomePath()).trim();

    if (!isValidEmail(email)) {
      return jsonResponse({ error: 'Enter a valid email address.', code: 'bad_email' }, 400);
    }

    if (token.length !== 6) {
      return jsonResponse({ error: 'Enter the 6-digit security code.', code: 'bad_token' }, 400);
    }

    const supabase = createSupabaseServerClient({ request, cookies });
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      return jsonResponse({
        error: error.message || 'Failed to verify security code.',
        code: error.code || '',
      }, error.status || 400);
    }

    return jsonResponse({
      ok: true,
      redirectTo: nextUrl.startsWith('/') ? nextUrl : getTenantHomePath(),
    }, 200);
  } catch (error) {
    const details = getErrorDetails(error);
    console.error('[auth.verify-otp] unexpected failure', details);

    return jsonResponse({
      error: 'The security code could not be verified. Request a fresh code and try again.',
      code: 'verify_failed',
    }, 500);
  }
};
