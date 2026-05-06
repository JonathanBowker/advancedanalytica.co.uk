import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import { isSupabaseConfigured, supabase } from '../../lib/supabaseClient';

const resendCooldownMs = 60_000;

const shellClass =
  'min-h-[calc(100svh-5rem)] bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,140,105,0.14),_transparent_26%),linear-gradient(180deg,#081018_0%,#0d1520_45%,#101927_100%)]';
const cardClass =
  'w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#111927]/92 p-8 text-paper shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur md:p-10';
const inputClass =
  'w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-base text-paper outline-none transition placeholder:text-paper/35 focus:border-[#14B8A6]';
const buttonClass =
  'inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-[#122033] disabled:cursor-not-allowed disabled:opacity-60';
const subtleButtonClass =
  'inline-flex items-center justify-center rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-paper transition hover:border-white/28';
const lightCardClass =
  'border border-white/12 bg-white/94 text-ink shadow-[0_30px_90px_rgba(0,0,0,0.26)]';
const lightInputClass =
  'w-full rounded-2xl border border-[#d8dbde] bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6]';
const lightSubtleButtonClass =
  'inline-flex items-center justify-center rounded-full border border-ink/12 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30';

function getCallbackUrlFor(nextPath) {
  const url = new URL('/auth/callback', window.location.origin);
  url.searchParams.set('next', nextPath);
  return url.toString();
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
      message: 'No account exists for that email. Ask an admin to invite you first.',
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

  if (lower.includes('failed to fetch') || lower.includes('network')) {
    return {
      message: 'Could not reach Supabase. Check the project URL, network connection, and service status.',
      isRateLimit: false,
    };
  }

  return { message: rawMessage, isRateLimit: false };
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
        ? 'border-[#99f6e4] bg-[#f0fdfa] text-[#115e59]'
        : 'border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]';

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${tone}`}>{status.message}</div>;
}

function LoginInner() {
  const { session, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [method, setMethod] = useState('password');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  const nextUrl =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('next') || '/portal'
      : '/portal';
  const cooldownSeconds = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const inCooldown = cooldownSeconds > 0;

  useEffect(() => {
    if (session) window.location.replace(nextUrl);
  }, [session, nextUrl]);

  useEffect(() => {
    if (!inCooldown) return undefined;
    const intervalId = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(intervalId);
  }, [inCooldown]);

  async function signIn(event) {
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

    setBusy(true);

    try {
      if (method === 'magic_link') {
        if (inCooldown) {
          setStatus({
            state: 'error',
            message: `Please wait ${cooldownSeconds}s before trying again.`,
          });
          return;
        }

        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            emailRedirectTo: getCallbackUrlFor(nextUrl),
            shouldCreateUser: false,
          },
        });

        if (error) throw error;

        setCooldownUntil(Date.now() + resendCooldownMs);
        setStatus({ state: 'sent', message: 'Check your email for a sign-in link.' });
        return;
      }

      if (!password) {
        setStatus({ state: 'error', message: 'Enter a password.' });
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      window.location.replace(nextUrl);
    } catch (err) {
      const { message, isRateLimit } =
        method === 'magic_link'
          ? getEmailFlowErrorMessage(err, 'Failed to send magic link.')
          : { message: getPasswordErrorMessage(err), isRateLimit: false };

      if (isRateLimit) setCooldownUntil(Date.now() + resendCooldownMs);
      setStatus({ state: 'error', message });
    } finally {
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

    setBusy(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: getCallbackUrlFor('/auth/reset'),
      });
      if (error) throw error;
      setStatus({ state: 'sent', message: 'If an account exists, a password reset email has been sent.' });
    } catch (err) {
      const { message } = getEmailFlowErrorMessage(err, 'Failed to start password reset.');
      setStatus({ state: 'error', message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthFrame
      title="Bring governed access into the same site."
      intro="This portal now runs inside advancedanalytica.co.uk. Use password sign-in or an email link, then continue into the protected workspace."
      cardToneClass={lightCardClass}
      aside={
        <>
          <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
            Keep the redirect URLs in Supabase aligned with this domain, including the callback and reset paths.
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
            Existing-user-only access remains enabled. Users must already exist in Supabase Auth before a magic link will be sent.
          </div>
        </>
      }
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">Sign in</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Portal access</h2>
        </div>
        <a href="/" className="text-sm font-semibold text-ink/60 transition hover:text-ink">
          Back to site
        </a>
      </div>

      <div className="mt-6 flex gap-2 rounded-full border border-ink/8 bg-[#f4f4ef] p-1">
        <button
          type="button"
          onClick={() => setMethod('password')}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${method === 'password' ? 'bg-white text-ink shadow-sm' : 'text-ink/60'}`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setMethod('magic_link')}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${method === 'magic_link' ? 'bg-white text-ink shadow-sm' : 'text-ink/60'}`}
        >
          Magic link
        </button>
      </div>

      <form onSubmit={signIn} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-ink/72">
          Email
          <input
            className={lightInputClass}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={busy || loading}
            placeholder="you@company.com"
          />
        </label>

        {method === 'password' ? (
          <label className="grid gap-2 text-sm font-semibold text-ink/72">
            Password
            <input
              className={lightInputClass}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={busy || loading}
              placeholder="Your password"
            />
          </label>
        ) : null}

        <StatusBanner status={status} />

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button className={buttonClass} type="submit" disabled={busy || loading}>
            {busy ? 'Working…' : method === 'magic_link' ? 'Send sign-in link' : 'Sign in'}
          </button>
          <button className={lightSubtleButtonClass} type="button" onClick={forgotPassword} disabled={busy || loading}>
            Reset password
          </button>
          {method === 'magic_link' && inCooldown ? (
            <span className="text-sm text-ink/55">Retry in {cooldownSeconds}s</span>
          ) : null}
        </div>
      </form>
    </AuthFrame>
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

  return (
    <AuthFrame
      title="Governed access, same domain."
      intro="The protected portal now lives inside advancedanalytica.co.uk, with the browser session managed directly by Supabase."
      aside={
        <>
          <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
            Access is now blocked on the server. Unauthenticated requests are redirected before the portal page is rendered.
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
            Current user: <span className="font-semibold text-paper">{user.email}</span>
          </div>
        </>
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">Protected portal</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-paper">Signed in</h2>
          <p className="mt-3 max-w-[34rem] text-sm leading-relaxed text-paper/68">
            The session is active on the main site domain. This page is the right place to start moving protected tools and account-specific features.
          </p>
        </div>
        <button className={buttonClass} type="button" onClick={signOut} disabled={signingOut}>
          {signingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <section className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#14B8A6]">Account</div>
          <div className="mt-4 grid gap-2 text-sm text-paper/70">
            <div><span className="font-semibold text-paper">Email:</span> {user.email}</div>
            <div><span className="font-semibold text-paper">User ID:</span> {user.id}</div>
          </div>
        </section>
        <section className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#14B8A6]">Auth status</div>
          <div className="mt-4 grid gap-2 text-sm text-paper/70">
            <div><span className="font-semibold text-paper">Session:</span> active</div>
            <div><span className="font-semibold text-paper">Access token:</span> {session.access_token ? 'present' : 'missing'}</div>
          </div>
        </section>
        <section className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#14B8A6]">Next move</div>
          <div className="mt-4 text-sm leading-relaxed text-paper/70">
            Start replacing this placeholder with the actual customer or operator tools that need protected access.
          </div>
        </section>
      </div>
    </AuthFrame>
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

export function LoginApp() {
  return (
    <AuthProvider>
      <LoginInner />
    </AuthProvider>
  );
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
