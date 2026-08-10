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

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isSupabaseConfigured) {
    return new Response(JSON.stringify({ error: 'Supabase is not configured.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }

  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const token = normalizeOtpToken(String(body?.token || ''));
    const nextUrl = String(body?.nextUrl || getTenantHomePath()).trim();

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Enter a valid email address.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }

    if (token.length !== 6) {
      return new Response(JSON.stringify({ error: 'Enter the 6-digit security code.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }

    const supabase = createSupabaseServerClient({ request, cookies });
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      return new Response(JSON.stringify({
        error: error.message || 'Failed to verify security code.',
        code: error.code || '',
      }), {
        status: error.status || 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      redirectTo: nextUrl.startsWith('/') ? nextUrl : getTenantHomePath(),
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to verify security code.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
};
