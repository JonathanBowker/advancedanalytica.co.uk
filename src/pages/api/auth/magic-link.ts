import type { APIRoute } from 'astro';
import { promises as dns } from 'node:dns';
import { createSupabaseServerClient, isSupabaseConfigured } from '../../../lib/supabaseServer';

export const prerender = false;

const mxLookupTimeoutMs = 5_000;
const turnstileSecret = String(import.meta.env.TURNSTILE_SECRET_KEY || '').trim();

const freeEmailDomains = new Set([
  'aol.com',
  'fastmail.com',
  'gmail.com',
  'googlemail.com',
  'gmx.co.uk',
  'gmx.com',
  'hey.com',
  'hotmail.co.uk',
  'hotmail.com',
  'icloud.com',
  'live.co.uk',
  'live.com',
  'mac.com',
  'mail.com',
  'me.com',
  'msn.com',
  'outlook.com',
  'pm.me',
  'proton.me',
  'protonmail.com',
  'qq.com',
  'tutanota.com',
  'yahoo.co.uk',
  'yahoo.com',
  'yandex.com',
  'yandex.ru',
  'zoho.com',
  '163.com',
  '126.com',
]);

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getEmailDomain(email: string) {
  return email.split('@').pop()?.toLowerCase() || '';
}

async function hasMxRecords(email: string) {
  const domain = getEmailDomain(email);
  if (!domain) return false;

  try {
    const records = await Promise.race([
      dns.resolveMx(domain),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('mx_timeout')), mxLookupTimeoutMs);
      }),
    ]);
    return records.length > 0;
  } catch {
    return false;
  }
}

async function verifyTurnstile(token: string, remoteIp: string) {
  if (!turnstileSecret) return true;
  if (!token) return false;

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: token,
        remoteip: remoteIp || undefined,
      }),
    });
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
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
    const captchaToken = String(body?.captchaToken || '').trim();
    const nextUrl = String(body?.nextUrl || '/portal').trim();
    const shouldCreateUser = Boolean(body?.shouldCreateUser);

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Enter a valid email address.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }

    if (freeEmailDomains.has(getEmailDomain(email))) {
      return new Response(JSON.stringify({ error: 'Use your work email address.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }

    if (!(await hasMxRecords(email))) {
      return new Response(JSON.stringify({ error: 'That email domain cannot receive mail.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }

    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const remoteIp = forwardedFor.split(',')[0]?.trim() || '';
    if (!(await verifyTurnstile(captchaToken, remoteIp))) {
      return new Response(JSON.stringify({ error: 'The verification check did not complete. Try again.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }

    const redirectTo = new URL('/auth/callback', request.url);
    redirectTo.searchParams.set('next', nextUrl.startsWith('/') ? nextUrl : '/portal');

    const supabase = createSupabaseServerClient({ request, cookies });
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        captchaToken,
        emailRedirectTo: redirectTo.toString(),
        shouldCreateUser,
      },
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message || 'Failed to send magic link.' }), {
        status: error.status || 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: getErrorMessage(error, 'Failed to send magic link.') }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
};
