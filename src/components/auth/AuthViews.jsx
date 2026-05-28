import { useEffect, useRef, useState } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import { isSupabaseConfigured, supabase } from '../../lib/supabaseClient';
import './login.css';

const resendCooldownMs = 60_000;
const magicLinkRequestTimeoutMs = 10_000;
const captchaTimeoutMs = 8_000;
const defaultPortalPath = '/portal';
const turnstileScriptId = 'cloudflare-turnstile-script';
const turnstileScriptSrc = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const fallbackTurnstileSiteKey = '0x4AAAAAADKxAX20w3kRuz5A';

const shellClass =
  'min-h-screen w-screen bg-slate-100';
const cardClass =
  'w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#111927]/92 p-8 text-paper shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur md:p-10';
const inputClass =
  'w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-base text-paper outline-none transition placeholder:text-paper/35 focus:border-[#14B8A6]';
const buttonClass =
  'inline-flex items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-[#122033] disabled:cursor-not-allowed disabled:opacity-60';
const subtleButtonClass =
  'inline-flex items-center justify-center rounded-md border border-white/14 px-4 py-2 text-sm font-semibold text-paper transition hover:border-white/28';
const lightCardClass =
  'border border-white/12 bg-white/94 text-ink shadow-[0_30px_90px_rgba(0,0,0,0.26)]';
const lightInputClass =
  'w-full rounded-2xl border border-[#d8dbde] bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6]';
const lightSubtleButtonClass =
  'inline-flex items-center justify-center rounded-md border border-ink/12 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30';

function slugifyRole(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function normalizeRoleValues(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map(slugifyRole).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/[,\s]+/)
      .map(slugifyRole)
      .filter(Boolean);
  }

  return [];
}

function getPortalAccess(user) {
  const email = (user?.email || '').toLowerCase();
  const appMetadata = user?.app_metadata || {};
  const userMetadata = user?.user_metadata || {};

  const roles = Array.from(
    new Set([
      ...normalizeRoleValues(appMetadata.roles),
      ...normalizeRoleValues(appMetadata.role),
      ...normalizeRoleValues(userMetadata.roles),
      ...normalizeRoleValues(userMetadata.role),
    ]),
  );

  if (email.endsWith('@advancedanalytica.co.uk')) {
    roles.push('operator');
  }

  if (roles.includes('admin')) {
    roles.push('operator', 'developer', 'client');
  }

  const uniqueRoles = Array.from(new Set(roles));
  const isOperator = uniqueRoles.includes('operator');
  const isDeveloper = uniqueRoles.includes('developer');
  const isClient = uniqueRoles.includes('client') || uniqueRoles.length === 0;

  const audienceLabel = isOperator
    ? 'Operator access'
    : isDeveloper
      ? 'Developer access'
      : 'Client access';

  return {
    roles: uniqueRoles,
    isOperator,
    isDeveloper,
    isClient,
    audienceLabel,
  };
}

function getCallbackUrlFor(nextPath) {
  const url = new URL('/auth/callback', window.location.origin);
  url.searchParams.set('next', nextPath || defaultPortalPath);
  return url.toString();
}

function getTurnstileSiteKey() {
  const envKey = String(import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '').trim();
  if (envKey) return envKey;

  if (typeof document !== 'undefined') {
    const pageKey = String(document.documentElement.dataset.turnstileSiteKey || '').trim();
    if (pageKey) return pageKey;
  }

  return fallbackTurnstileSiteKey;
}

function canBypassTurnstileForLocalDev() {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname;
  const isLocalHost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1';

  return isLocalHost && !getTurnstileSiteKey();
}

function getNextUrl() {
  if (typeof window === 'undefined') return defaultPortalPath;

  const requestedNext = new URLSearchParams(window.location.search).get('next');
  return requestedNext?.startsWith('/') ? requestedNext : defaultPortalPath;
}

function getPasswordErrorMessage(err) {
  const rawMessage = err?.message || 'Failed to sign in.';
  const lower = rawMessage.toLowerCase();

  if (lower.includes('invalid login credentials')) return 'Invalid email or password.';
  if (lower.includes('email not confirmed')) return 'This email address is not confirmed yet.';
  if (lower.includes('failed to fetch') || lower.includes('network')) {
    return 'Could not reach Supabase. Check the project URL, network connection, and service status.';
  }

  return rawMessage;
}

function getEmailFlowErrorMessage(err, fallback) {
  const rawMessage = err?.message || fallback;
  const lower = rawMessage.toLowerCase();
  const isRateLimit =
    err?.status === 429 || lower.includes('rate limit') || lower.includes('too many');

  if (isRateLimit) {
    return {
      message: 'Email rate limit exceeded. Wait a few minutes and try again.',
      isRateLimit: true,
    };
  }

  if (lower.includes('user not found')) {
    return {
      message:
        'Supabase did not find an email magic-link account for that address in this project. If the user exists, check the local Supabase project or use the provider the account was created with.',
      isRateLimit: false,
    };
  }

  if (
    lower.includes('signups not allowed for otp') ||
    lower.includes('signups not allowed') ||
    lower.includes('otp signups are disabled')
  ) {
    return {
      message:
        'Supabase did not find an email magic-link account for that address in this project. If the user exists, check the local Supabase project or use the provider the account was created with.',
      isRateLimit: false,
    };
  }

  if (lower.includes('user already registered') || lower.includes('already been registered')) {
    return {
      message: 'An account already exists for that email. Use Password or Magic link to sign in.',
      isRateLimit: false,
    };
  }

  if (
    lower.includes('error sending') ||
    lower.includes('smtp') ||
    lower.includes('sender') ||
    lower.includes('not verified') ||
    lower.includes('email address is not verified') ||
    lower.includes('identity') ||
    lower.includes('sandbox')
  ) {
    return {
      message:
        'Auth email could not be sent. Check the Supabase SMTP settings and sender verification status.',
      isRateLimit: false,
    };
  }

  if (
    lower.includes('captcha protection') ||
    lower.includes('captcha_token') ||
    lower.includes('captcha token')
  ) {
    return {
      message:
        'Supabase rejected this request because captcha protection is enabled and no valid captcha token was sent.',
      isRateLimit: false,
    };
  }

  if (
    lower.includes('requested resource does not exist') ||
    lower.includes('resource does not exist') ||
    lower.includes('not found')
  ) {
    return {
      message:
        'Supabase could not find the requested auth resource. Check the Supabase project URL and auth configuration for this environment.',
      isRateLimit: false,
    };
  }

  if (lower.includes('failed to fetch') || lower.includes('network')) {
    return {
      message: 'Could not reach Supabase. Check the project URL, network connection, and service status.',
      isRateLimit: false,
    };
  }

  return { message: rawMessage, isRateLimit: false };
}

function getLoginErrorMessage(errorCode, errorDescription) {
  const normalizedCode = (errorCode || '').toLowerCase();
  const normalizedDescription = (errorDescription || '').toLowerCase();

  if (normalizedCode === 'otp_expired') {
    return 'That magic link has expired or was already used. Request a fresh sign-in link and open the newest email only once.';
  }

  if (normalizedCode === 'access_denied' && normalizedDescription.includes('expired')) {
    return 'That sign-in link has expired. Request a fresh magic link and try again.';
  }

  if (normalizedCode === 'callback') {
    if (normalizedDescription.includes('requested resource does not exist')) {
      return 'Supabase could not find the requested auth resource. Check the GitHub provider and redirect URL configuration for this Supabase project.';
    }

    if (errorDescription) {
      return `The sign-in callback failed: ${errorDescription}`;
    }

    return 'The sign-in link could not be completed. Request a new magic link and try again.';
  }

  if (normalizedCode === 'config') {
    return 'Authentication is not configured correctly for this environment.';
  }

  if (
    normalizedCode === 'unexpected_failure' &&
    normalizedDescription.includes('multiple accounts with the same email address')
  ) {
    return 'Supabase found more than one account using this email address. Merge or remove the duplicate user/identity in Supabase, then try GitHub sign-in again.';
  }

  if (errorDescription) {
    return `Authentication failed: ${errorDescription}`;
  }

  return '';
}

async function requestMagicLink({ email, captchaToken, nextUrl, shouldCreateUser }) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), magicLinkRequestTimeoutMs);

  let response;
  try {
    response = await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        captchaToken,
        nextUrl,
        shouldCreateUser,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Email validation took too long. Try again with a valid work email.');
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.error || 'Failed to send magic link.');
    error.status = response.status;
    error.code = payload?.code || payload?.error_code || '';
    throw error;
  }

  return payload;
}

function AuthFrame({ title, intro, children, aside, cardToneClass = '' }) {
  return (
    <section className={shellClass}>
      <div className="container-wide grid min-h-[calc(100svh-5rem)] gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="order-2 text-paper lg:order-1">
          <div className="inline-flex rounded-full border border-white/15 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
            Advanced Analytica Portal
          </div>
          <h1 className="mt-6 max-w-[12ch] text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] tracking-tight">
            {title}
          </h1>
          <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-paper/78">{intro}</p>
          <div className="mt-8 grid gap-4 text-sm leading-relaxed text-paper/72">
            {aside}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${cardClass} ${cardToneClass}`.trim()}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function StatusBanner({ status }) {
  if (!status?.message) return null;

  const tone =
    status.state === 'error'
      ? 'border-[#fca5a5] bg-[#fff1f2] text-[#9f1239]'
      : status.state === 'sent'
        ? 'border-[#86efac] bg-[#f0fdf4] text-[#166534]'
        : 'border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]';

  return <div className={`rounded-[10px] border px-4 py-3 text-sm ${tone}`}>{status.message}</div>;
}

async function loadTurnstileScript() {
  if (typeof window === 'undefined' || !getTurnstileSiteKey()) return false;
  if (window.turnstile?.render) return true;

  const existingScript = document.getElementById(turnstileScriptId);
  if (existingScript) {
    await new Promise((resolve) => {
      existingScript.addEventListener('load', resolve, { once: true });
      existingScript.addEventListener('error', resolve, { once: true });
    });
    return Boolean(window.turnstile?.render);
  }

  await new Promise((resolve) => {
    const script = document.createElement('script');
    script.id = turnstileScriptId;
    script.src = turnstileScriptSrc;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', resolve, { once: true });
    script.addEventListener('error', resolve, { once: true });
    document.head.appendChild(script);
  });

  return Boolean(window.turnstile?.render);
}

async function executeInvisibleTurnstile({
  container,
  widgetRef,
  onLoadError,
}) {
  const turnstileSiteKey = getTurnstileSiteKey();
  if (!turnstileSiteKey) {
    if (canBypassTurnstileForLocalDev()) {
      return '';
    }
    onLoadError?.('Verification is not configured on this page. Contact support.');
    return '';
  }

  const loaded = await loadTurnstileScript();
  if (!loaded || !container?.current || !window.turnstile?.render) {
    onLoadError?.('The verification check did not load correctly. Reload the page and try again.');
    return '';
  }

  return new Promise((resolve) => {
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      resolve('');
    }, captchaTimeoutMs);

    const finish = (token = '') => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      resolve(token || '');
    };

    let widgetId = widgetRef.current;
    if (widgetId == null) {
      widgetId = window.turnstile.render(container.current, {
        sitekey: turnstileSiteKey,
        size: 'invisible',
        callback: (token) => finish(token),
        'expired-callback': () => finish(''),
        'error-callback': () => finish(''),
        'timeout-callback': () => finish(''),
      });
      widgetRef.current = widgetId;
    } else {
      try {
        window.turnstile.reset(widgetId);
      } catch {}
    }

    try {
      window.turnstile.execute(widgetId);
    } catch {
      finish('');
    }
  });
}

function LoginInner() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [method, setMethod] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetRef = useRef(null);

  const nextUrl = getNextUrl();
  const cooldownSeconds = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const inCooldown = cooldownSeconds > 0;

  function resetTurnstile() {
    if (typeof window === 'undefined' || turnstileWidgetRef.current == null) return;
    if (!window.turnstile?.reset) return;

    window.turnstile.reset(turnstileWidgetRef.current);
  }

  async function getCaptchaToken() {
    if (canBypassTurnstileForLocalDev()) {
      return '';
    }

    return executeInvisibleTurnstile({
      container: turnstileContainerRef,
      widgetRef: turnstileWidgetRef,
      onLoadError: (message) =>
        setStatus({
          state: 'error',
          message: message || 'The verification check did not load correctly. Reload the page and try again.',
        }),
    });
  }

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => {
      mounted = false;
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) window.location.replace(nextUrl);
  }, [session, nextUrl]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get('error');
    const errorDescription = params.get('error_description');
    const message = getLoginErrorMessage(errorCode, errorDescription);

    if (message) {
      setStatus({ state: 'error', message });
    }
  }, []);

  useEffect(() => {
    if (!inCooldown) return undefined;
    const intervalId = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(intervalId);
  }, [inCooldown]);

  async function signIn(event, requestedMethod = method) {
    event.preventDefault();
    setStatus({ state: 'idle', message: '' });

    if (!isSupabaseConfigured || !supabase) {
      setStatus({
        state: 'error',
        message: 'Supabase is not configured. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.',
      });
      return;
    }

    if (!email.trim()) {
      setStatus({ state: 'error', message: 'Enter an email address.' });
      return;
    }

    if ((requestedMethod === 'magic_link' || requestedMethod === 'request_access') && inCooldown) {
      setStatus({
        state: 'error',
        message: `Please wait ${cooldownSeconds}s before trying again.`,
      });
      return;
    }

    if (requestedMethod === 'password' && !password) {
      setStatus({ state: 'error', message: 'Enter a password.' });
      return;
    }

    setBusy(true);

    try {
      const captchaToken = await getCaptchaToken();
      if (!captchaToken && !canBypassTurnstileForLocalDev()) {
        setStatus((current) =>
          current.state === 'error' && current.message
            ? current
            : { state: 'error', message: 'The verification check did not complete. Try again.' },
        );
        return;
      }

      if (requestedMethod === 'magic_link') {
        await requestMagicLink({
          email: email.trim(),
          captchaToken,
          nextUrl,
          shouldCreateUser: false,
        });

        setCooldownUntil(Date.now() + resendCooldownMs);
        setStatus({ state: 'sent', message: 'Check your email for a sign-in link.' });
        return;
      }

      if (requestedMethod === 'request_access') {
        await requestMagicLink({
          email: email.trim(),
          captchaToken,
          nextUrl,
          shouldCreateUser: true,
        });

        setCooldownUntil(Date.now() + resendCooldownMs);
        setStatus({
          state: 'sent',
          message: 'Check your email to complete registration and sign in.',
        });
        return;
      }

      const passwordSignInOptions = captchaToken ? { captchaToken } : undefined;
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
        options: passwordSignInOptions,
      });

      if (error) throw error;
      window.location.replace(nextUrl);
    } catch (err) {
      const { message, isRateLimit } =
        requestedMethod === 'magic_link' || requestedMethod === 'request_access'
          ? getEmailFlowErrorMessage(err, 'Failed to send magic link.')
          : { message: getPasswordErrorMessage(err), isRateLimit: false };

      if (isRateLimit) setCooldownUntil(Date.now() + resendCooldownMs);
      setStatus({ state: 'error', message });
    } finally {
      resetTurnstile();
      setBusy(false);
    }
  }

  async function forgotPassword() {
    setStatus({ state: 'idle', message: '' });

    if (!isSupabaseConfigured || !supabase) {
      setStatus({
        state: 'error',
        message: 'Supabase is not configured. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.',
      });
      return;
    }

    if (!email.trim()) {
      setStatus({ state: 'error', message: 'Enter your email first.' });
      return;
    }

    const captchaToken = await getCaptchaToken();
    if (!captchaToken && !canBypassTurnstileForLocalDev()) {
      setStatus((current) =>
        current.state === 'error' && current.message
          ? current
          : { state: 'error', message: 'The verification check did not complete. Try again.' },
      );
      return;
    }

    setBusy(true);

    try {
      const resetPasswordOptions = {
        redirectTo: getCallbackUrlFor('/auth/reset'),
        ...(captchaToken ? { captchaToken } : {}),
      };
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), resetPasswordOptions);
      if (error) throw error;
      setStatus({ state: 'sent', message: 'If an account exists, a password reset email has been sent.' });
    } catch (err) {
      const { message } = getEmailFlowErrorMessage(err, 'Failed to start password reset.');
      setStatus({ state: 'error', message });
    } finally {
      resetTurnstile();
      setBusy(false);
    }
  }

  async function signInWithGitHub() {
    setStatus({ state: 'idle', message: '' });

    if (!isSupabaseConfigured || !supabase) {
      setStatus({
        state: 'error',
        message: 'Supabase is not configured. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.',
      });
      return;
    }

    setBusy(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: getCallbackUrlFor(nextUrl),
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error('GitHub sign-in did not return a redirect URL.');

      window.location.assign(data.url);
    } catch (err) {
      const { message } = getEmailFlowErrorMessage(err, 'Failed to start GitHub sign-in.');
      setStatus({ state: 'error', message });
      setBusy(false);
    }
  }

  return (
    <section className={shellClass}>
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-12">
        <div className="flex justify-center bg-slate-100 px-6 py-10 text-slate-900 lg:col-span-5">
          <div className="w-full max-w-md lg:w-3/5 lg:max-w-none lg:translate-x-20">
            <div className="relative mb-2">
              <a
                href="/"
                className="inline-flex h-10 w-10 items-center justify-center text-slate-400 hover:text-slate-600 lg:absolute lg:-left-16 lg:top-1/2 lg:-translate-y-1/2"
                aria-label="Back"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-9 w-9"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </a>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Sign in</h1>
            </div>

            <div className="space-y-4 auth-card pt-0">
              <div className="space-y-2">
                <div className="tabs">
                  <button
                    type="button"
                    onClick={() => setMethod('password')}
                    disabled={busy}
                    className={`flex-1 rounded-[10px] border px-4 py-2 text-sm font-medium transition ${method === 'password' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'}`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('magic_link')}
                    disabled={busy}
                    className={`flex-1 rounded-[10px] border px-4 py-2 text-sm font-medium transition ${method === 'magic_link' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'}`}
                  >
                    Magic link
                  </button>
                </div>
                <p className="text-sm text-slate-500">
                  {method === 'password'
                    ? 'Sign in with your email and password.'
                    : method === 'request_access'
                      ? 'We’ll email you a sign-in link and create your portal account if one does not exist yet.'
                      : method === 'magic_link'
                      ? 'We’ll email you a one-time sign-in link for an existing account.'
                      : 'Sign in with your email and password.'}
                </p>
              </div>

              <form onSubmit={(event) => signIn(event, method)} className="form">
                <label className="label text-sm font-medium text-slate-700">
                  <span>
                    Email <span className="text-pink-600">*</span>
                  </span>
                  <input
                    className="input text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6]"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={busy}
                    placeholder="you@company.com"
                    required
                  />
                </label>

                {method === 'password' ? (
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <label className="text-sm font-medium text-slate-700">
                        Password <span className="text-pink-600">*</span>
                      </label>
                      <button
                        className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-700"
                        type="button"
                        onClick={forgotPassword}
                        disabled={busy}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        className="input pr-10 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6]"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={busy}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        disabled={busy}
                        className="absolute inset-y-0 right-0 inline-flex items-center px-3 text-slate-400 hover:text-slate-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          {showPassword ? (
                            <>
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </>
                          ) : (
                            <>
                              <path d="M10.3 5.2A9.8 9.8 0 0 1 12 5c6.5 0 10 7 10 7a17.2 17.2 0 0 1-3.2 4.3" />
                              <path d="M6.6 6.6A16 16 0 0 0 2 12s3.5 7 10 7c1.1 0 2.1-.2 3.1-.5" />
                              <path d="M14.1 14.1A3 3 0 0 1 9.9 9.9" />
                              <path d="M3 3l18 18" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : null}

                <StatusBanner status={status} />
                <div ref={turnstileContainerRef} className="absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true" />

                <div className="pt-2">
                  <button
                    className="w-full rounded-[10px] bg-[#14B8A6] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F766E] disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                    disabled={busy || (method === 'magic_link' && inCooldown)}
                  >
                    {busy
                      ? 'Working…'
                      : method === 'magic_link' || method === 'request_access'
                        ? inCooldown
                          ? `Try again in ${cooldownSeconds}s`
                          : method === 'request_access'
                            ? 'Request access link'
                            : 'Send magic link'
                        : 'Sign in'}
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={(event) => {
                      setMethod('request_access');
                      signIn(event, 'request_access');
                    }}
                    className="w-full rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={busy || inCooldown}
                  >
                    {busy && method === 'request_access'
                      ? 'Working…'
                      : inCooldown && method === 'request_access'
                        ? `Try again in ${cooldownSeconds}s`
                        : 'Sign up'}
                  </button>
                </div>
              </form>

              {!isSupabaseConfigured ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                  Supabase not configured. Set <code>PUBLIC_SUPABASE_URL</code> and <code>PUBLIC_SUPABASE_ANON_KEY</code>.
                </div>
              ) : null}

              <div className="flex items-center gap-3 py-2">
                <div className="h-px flex-1 bg-slate-200" />
                <div className="text-xs uppercase tracking-wider text-slate-400">or</div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={signInWithGitHub}
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  title="Continue with GitHub"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center text-slate-900">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.14 1.19a10.9 10.9 0 0 1 5.72 0c2.18-1.5 3.14-1.19 3.14-1.19.62 1.6.23 2.78.11 3.07.74.81 1.18 1.85 1.18 3.11 0 4.42-2.69 5.39-5.25 5.67.41.35.77 1.03.77 2.08v3.08c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                  </span>
                  {busy ? 'Working…' : 'Continue with GitHub'}
                </button>

              </div>

              <div className="pt-2 text-center text-sm text-slate-500">
                Don&apos;t have an account? <span className="text-slate-400">Use the Sign up button above.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden lg:col-span-7 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b0e14] to-[#171b24]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#14B8A6]/10 blur-3xl" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[#ff8c69]/10 blur-3xl" />

          <div className="relative flex h-full min-h-[100svh] flex-col p-12 text-white">
            <div className="flex items-center justify-end">
              <img
                src="/images/infrastructure/logo.svg"
                alt="Advanced Analytica"
                className="h-10 w-auto opacity-85"
                decoding="async"
              />
            </div>

            <div className="flex flex-1 items-start justify-center pt-24">
              <div className="max-w-2xl text-center">
                <div className="text-6xl font-bold leading-[1.05] tracking-tight">
                  Connect to our suite of intelligent services
                  <br />
                  <span className="text-[#14B8A6]">#withBRANDO</span>
                </div>
                <p className="mx-auto mt-8 max-w-xl text-lg text-white/70">
                  Use Brando to turn brand knowledge into controlled AI communications, governed workflows, and
                  machine-operable controls.
                </p>
                <p className="mx-auto mt-10 max-w-xl text-base text-white/60">
                  Trusted by some of the world&apos;s largest brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalInner() {
  const { session, loading } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      const next = encodeURIComponent(window.location.pathname);
      window.location.replace(`/login?next=${next}`);
    }
  }, [loading, session]);

  async function signOut() {
    setSigningOut(true);
    try {
      await supabase?.auth.signOut();
      window.location.replace('/login');
    } finally {
      setSigningOut(false);
    }
  }

  if (loading || !session) {
    return (
      <AuthFrame
        title="Checking your session."
        intro="We are verifying access before loading the portal."
        aside={<div className="rounded-3xl border border-white/10 bg-white/6 p-5">Authenticated users are redirected here from the site login page.</div>}
      >
        <div className="text-sm text-paper/68">Loading session…</div>
      </AuthFrame>
    );
  }

  const user = session.user;
  const access = getPortalAccess(user);
  const serviceCards = [
    {
      type: 'service',
      audiences: ['client', 'operator'],
      eyebrow: 'Strategy',
      title: 'AI readiness assessment',
      href: '/brand-ai-readiness-assessment',
      description:
        'Review organisational readiness, identify the right next moves, and frame the commercial case for governed AI adoption.',
      accent: 'from-[#14B8A6]/22 to-transparent',
      cta: 'Open assessment',
    },
    {
      type: 'service',
      audiences: ['client', 'operator'],
      eyebrow: 'Platform',
      title: 'iBOM services',
      href: '/services/ibom',
      description:
        'Explore the intelligent brand object model service layer that connects brand governance to operational systems and agents.',
      accent: 'from-[#ff8c69]/22 to-transparent',
      cta: 'View iBOM service',
    },
    {
      type: 'service',
      audiences: ['developer', 'operator'],
      eyebrow: 'Developers',
      title: 'MCP server access',
      href: '/developers/mcp-servers',
      description:
        'Go straight to the governed MCP tooling and implementation guidance for connected applications and agent workflows.',
      accent: 'from-[#59b3e4]/24 to-transparent',
      cta: 'Open developer access',
    },
    {
      type: 'service',
      audiences: ['operator'],
      eyebrow: 'Implementation',
      title: 'Enterprise rollout',
      href: '/enterprise',
      description:
        'Move into implementation planning, governance rollout, and enterprise operating model design for larger programmes.',
      accent: 'from-[#ceced0]/24 to-transparent',
      cta: 'Open rollout path',
    },
    {
      type: 'service',
      audiences: ['operator'],
      eyebrow: 'Products',
      title: 'iBOM product pages',
      href: '/products/ibom',
      description:
        'Review the current product positioning, narrative, and service packaging that supports protected operator workflows.',
      accent: 'from-[#fa26a0]/22 to-transparent',
      cta: 'Open product view',
    },
    {
      type: 'service',
      audiences: ['client', 'operator'],
      eyebrow: 'Engagement',
      title: 'Advisory and contact',
      href: '/company/contact',
      description:
        'Start a scoped conversation about implementation, governance design, enterprise rollout, or managed support.',
      accent: 'from-[#f8d210]/24 to-transparent',
      cta: 'Contact Advanced Analytica',
    },
  ];
  const visibleServiceCards = serviceCards.filter((card) =>
    card.audiences.some((audience) => access.roles.includes(audience) || (audience === 'client' && access.isClient)),
  );
  const utilityCards = [
    {
      type: 'meta',
      eyebrow: 'Account',
      title: 'Signed-in account',
      description: user.email,
      body: `Audience: ${access.audienceLabel}`,
    },
    {
      type: 'meta',
      eyebrow: 'Roles',
      title: access.roles.length ? access.roles.join(', ') : 'client',
      description: 'Resolved from Supabase metadata and internal account fallback.',
      body: `User ID: ${user.id}`,
    },
    {
      type: 'action',
      eyebrow: 'Session',
      title: 'Manage access',
      description: 'Protected access is enforced on the server before this page renders.',
      body: session.access_token ? 'Access token present.' : 'Access token missing.',
    },
  ];
  const portalCards = [...visibleServiceCards, ...utilityCards].slice(0, 6);

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="container-wide py-12 lg:py-16">
        <div className="rounded-[2rem] border border-[#d7dde5] bg-[#111927] p-8 text-paper shadow-[0_30px_90px_rgba(0,0,0,0.24)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-[48rem]">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">Protected portal</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-paper md:text-4xl">Services dashboard</h1>
              <p className="mt-3 text-sm leading-relaxed text-paper/68 md:text-base">
                Start from one of the service cards below. The set shown here changes by audience, so clients, developers, and operators do not all see the same entry points.
              </p>
            </div>
            <button className={buttonClass} type="button" onClick={signOut} disabled={signingOut}>
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-paper/78">
              Signed in as <span className="font-semibold text-paper">{user.email}</span>
            </div>
            <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-paper/78">
              <span className="font-semibold text-paper">{access.audienceLabel}</span>
              {access.roles.length ? ` • ${access.roles.join(', ')}` : ' • default client view'}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portalCards.map((card, index) =>
              card.type === 'service' ? (
                <a
                  key={`${card.type}-${card.href}-${index}`}
                  href={card.href}
                  className="group relative min-h-[18rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/6 p-6 transition duration-200 hover:-translate-y-1 hover:border-white/18 hover:bg-white/8"
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent}`} />
                  <div className="relative flex h-full flex-col">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
                      {card.eyebrow}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-paper">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-paper/68">{card.description}</p>
                    <div className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-paper">
                      {card.cta}
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </a>
              ) : (
                <section
                  key={`${card.type}-${card.title}-${index}`}
                  className="min-h-[18rem] rounded-[1.75rem] border border-white/10 bg-white/6 p-6"
                >
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
                    {card.eyebrow}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-paper">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/68">{card.description}</p>
                  <div className="mt-6 text-sm leading-relaxed text-paper/60">{card.body}</div>

                  {card.type === 'action' ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href="/" className={subtleButtonClass}>Back to site</a>
                      <button className={buttonClass} type="button" onClick={signOut} disabled={signingOut}>
                        {signingOut ? 'Signing out…' : 'Sign out'}
                      </button>
                    </div>
                  ) : null}
                </section>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResetInner() {
  const [busy, setBusy] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function setNewPassword(event) {
    event.preventDefault();
    setStatus({ state: 'idle', message: '' });

    if (!isSupabaseConfigured || !supabase) {
      setStatus({
        state: 'error',
        message: 'Supabase is not configured. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.',
      });
      return;
    }

    if (!password || password.length < 8) {
      setStatus({ state: 'error', message: 'Password must be at least 8 characters.' });
      return;
    }

    if (password !== confirm) {
      setStatus({ state: 'error', message: 'Passwords do not match.' });
      return;
    }

    setBusy(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setStatus({ state: 'ok', message: 'Password updated. You are now signed in.' });
      window.setTimeout(() => window.location.replace('/portal'), 500);
    } catch (err) {
      setStatus({ state: 'error', message: err?.message || 'Failed to update password.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthFrame
      title="Reset the account password."
      intro="This page completes the Supabase recovery flow on the main production domain."
      aside={<div className="rounded-3xl border border-white/10 bg-white/6 p-5">The callback route exchanges the recovery code on the server before this page is rendered.</div>}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">Password reset</div>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-paper">Choose a new password</h2>

      <form onSubmit={setNewPassword} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-paper/72">
          New password
          <input
            className={inputClass}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={busy}
            placeholder="At least 8 characters"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-paper/72">
          Confirm password
          <input
            className={inputClass}
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            disabled={busy}
            placeholder="Repeat password"
          />
        </label>

        <StatusBanner status={status} />

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button className={buttonClass} type="submit" disabled={busy}>
            {busy ? 'Saving…' : 'Set new password'}
          </button>
          <a href="/login" className={subtleButtonClass}>Back to login</a>
        </div>
      </form>
    </AuthFrame>
  );
}

function RoleMagicLinkInner({ role }) {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetRef = useRef(null);
  const nextUrl = `/portal?intake_role=${encodeURIComponent(role.slug)}`;

  function resetTurnstile() {
    if (typeof window === 'undefined' || turnstileWidgetRef.current == null) return;
    if (!window.turnstile?.reset) return;
    window.turnstile.reset(turnstileWidgetRef.current);
  }

  async function getCaptchaToken() {
    return executeInvisibleTurnstile({
      container: turnstileContainerRef,
      widgetRef: turnstileWidgetRef,
      onLoadError: () =>
        setStatus({
          state: 'error',
          message: 'The verification check did not load correctly. Reload the page and try again.',
        }),
    });
  }

  async function submitMagicLink(event) {
    event.preventDefault();
    setStatus({ state: 'idle', message: '' });

    if (!email.trim()) {
      setStatus({ state: 'error', message: 'Enter an email address.' });
      return;
    }

    setBusy(true);
    try {
      const captchaToken = await getCaptchaToken();
      if (!captchaToken) {
        setStatus((current) => current.state === 'error' && current.message ? current : { state: 'error', message: 'The verification check did not complete. Try again.' });
        return;
      }

      await requestMagicLink({
        email: email.trim(),
        captchaToken,
        nextUrl,
        shouldCreateUser: true,
      });
      setEmail('');
      setStatus({ state: 'sent', message: 'Check your email to complete registration and sign in.' });
    } catch (err) {
      const { message } = getEmailFlowErrorMessage(err, 'Failed to send magic link.');
      setStatus({ state: 'error', message });
    } finally {
      resetTurnstile();
      setBusy(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#eef3fb]">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-12">
        <div className="flex justify-center bg-slate-100 px-6 py-10 text-slate-900 lg:col-span-5">
          <div className="w-full max-w-md lg:w-3/5 lg:max-w-none lg:translate-x-20">
            <div className="relative mb-2">
              <a href="/talk-to-us/" className="inline-flex h-10 w-10 items-center justify-center text-slate-400 hover:text-slate-600 lg:absolute lg:-left-16 lg:top-1/2 lg:-translate-y-1/2" aria-label="Back">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"><path d="M15 18l-6-6 6-6" /></svg>
              </a>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Magic link</h1>
            </div>

            <div className="space-y-4 auth-card pt-0">
              <p className="text-sm text-slate-500">We&apos;ll email you a one-time specialist-call link for this role.</p>
              <form onSubmit={submitMagicLink} className="form">
                <label className="label text-sm font-medium text-slate-700">
                  <span>Work email <span className="text-pink-600">*</span></span>
                  <input className="input text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6]" type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={busy} placeholder="you@company.com" required />
                </label>
                <StatusBanner status={status} />
                <div className="rounded-[10px] border border-dashed border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-500">We validate business email domains and run a verification check before sending the link.</div>
                <div ref={turnstileContainerRef} className="absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true" />
                <button className="w-full rounded-[10px] bg-[#14B8A6] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F766E] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={busy}>{busy ? 'Working…' : 'Send magic link'}</button>
                <a href="/login" className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">Portal login</a>
              </form>
              <div className="pt-2 text-center text-sm text-slate-500">Start with your business email. We&apos;ll use it to route a specialist call for this role.</div>
            </div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden lg:col-span-7 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b0e14] to-[#171b24]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#14B8A6]/10 blur-3xl" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[#ff8c69]/10 blur-3xl" />
          <div className="relative flex h-full min-h-[100svh] flex-col p-12 text-white">
            <div className="flex items-center justify-end"><img src="/images/infrastructure/logo.svg" alt="Advanced Analytica" className="h-10 w-auto opacity-85" decoding="async" /></div>
            <div className="flex flex-1 items-start justify-center pt-24">
              <div className="max-w-2xl text-center">
                <div className="text-6xl font-bold leading-[1.05] tracking-tight">{role.title}</div>
                <p className="mx-auto mt-8 max-w-xl text-lg text-white/70">{role.description}</p>
                <div className="mx-auto mt-10 max-w-[44rem] space-y-4 text-left text-base text-white/72">
                  {role.points.map((point) => <div key={point} className="flex gap-3"><span className="mt-1 h-2 w-2 flex-none rounded-full bg-[#14B8A6]" /><span>{point}</span></div>)}
                </div>
                <p className="mx-auto mt-10 max-w-xl text-base text-white/60">{role.coverage}</p>
                <p className="mx-auto mt-12 max-w-xl text-base text-white/60">15 minutes. At your pace. Confidential.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LoginApp() {
  return <LoginInner />;
}

export function RoleMagicLinkApp({ role }) {
  return <RoleMagicLinkInner role={role} />;
}

export function PortalApp() {
  return (
    <AuthProvider>
      <PortalInner />
    </AuthProvider>
  );
}

export function ResetPasswordApp() {
  return (
    <AuthProvider>
      <ResetInner />
    </AuthProvider>
  );
}
