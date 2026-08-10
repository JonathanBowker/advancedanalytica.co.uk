import { useEffect, useRef, useState } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import { isLocalHostname } from '../../lib/hosts';
import { isSupabaseConfigured, supabase } from '../../lib/supabaseClient';
import { getPortalAccess } from '../../lib/portalAccess';
import './login.css';

const authServiceLabel = 'Advanced Analytica sign-in service';
const authConfigMessage =
  'Sign-in is not configured correctly for this environment. Please contact Advanced Analytica.';
const resendCooldownMs = 60_000;
const emailOtpRequestTimeoutMs = 10_000;
const captchaTimeoutMs = 8_000;
const defaultPortalPath = '/portal';
const turnstileScriptId = 'cloudflare-turnstile-script';
const turnstileScriptSrc = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const fallbackTurnstileSiteKey = '0x4AAAAAADKxAX20w3kRuz5A';
const turnstileMountClass = 'fixed bottom-0 right-0 h-px w-px overflow-hidden pointer-events-none';
const allowSelfSignup = true;
const authCaptchaEnabled = false;
const portalServiceCardCatalog = {
  'brand-readiness-assessment': {
    eyebrow: 'Assessment',
    accent: 'from-[#14B8A6]/22 to-transparent',
    cta: 'Open assessment',
  },
  'policy-intake': {
    eyebrow: 'Policy',
    accent: 'from-[#0F766E]/22 to-transparent',
    cta: 'Open policy intake',
  },
};

function createPortalPersonalization({ access, services, tenantName, portalContent = [] }) {
  const workflowCards = services.map((service) => {
    const visual = portalServiceCardCatalog[service.slug] || {
      eyebrow: 'Protected workflow',
      accent: 'from-[#59b3e4]/24 to-transparent',
      cta: 'Open service',
    };

    return {
      eyebrow: visual.eyebrow,
      title: service.name,
      href: `/portal/services/${service.slug}`,
      description: service.summary,
      accent: visual.accent,
      cta: visual.cta,
    };
  });

  const featuredContent = portalContent[0] || null;
  const normalizedFeaturedContent = featuredContent
    ? {
        eyebrow: 'Protected content',
        title: featuredContent.title,
        href: featuredContent.href,
        description: featuredContent.summary,
        cta: featuredContent.ctaLabel,
      }
    : null;

  const defaultFocus = workflowCards[0] || normalizedFeaturedContent || {
    eyebrow: 'Start here',
    title: 'Products',
    href: '/portal/products/',
    description: 'Explore the products, frameworks, services, and protected tools available to your account.',
    cta: 'Open products',
  };

  const tailoredGuides = [];
  let hero = {
    eyebrow: 'Recommended next step',
    title: 'Start with the most relevant protected content.',
    description: `This ${tenantName} workspace can now route you to the right workflow, product, or internal material based on your access.`,
    primaryHref: defaultFocus.href,
    primaryLabel: defaultFocus.cta,
    secondaryHref: '/portal/products/',
    secondaryLabel: 'Browse all products',
    featureLabel: defaultFocus.eyebrow,
    featureTitle: defaultFocus.title,
    featureBody: defaultFocus.description,
  };

  if (access.isAdmin) {
    hero = {
      eyebrow: 'Admin priority',
      title: 'Govern access, then direct people into the right service flow.',
      description: 'Provisioning, permissions, and internal tool visibility should be set first so each signed-in user lands on the right material automatically.',
      primaryHref: '/portal/admin/users/',
      primaryLabel: 'Manage users and roles',
      secondaryHref: '/portal/sheets/',
      secondaryLabel: 'Open offer builder',
      featureLabel: 'Superadmin',
      featureTitle: 'Users and roles',
      featureBody: 'Control who sees internal tools, which workflows are available, and what the signed-in homepage should prioritise next.',
    };
    tailoredGuides.push(
      {
        eyebrow: 'Provisioning',
        title: 'Route each account by role',
        description: 'Assign access cleanly so clients, operators, partners, and admins each land on content that matches what they actually need.',
        href: '/portal/admin/users/',
        cta: 'Review access',
      },
      {
        eyebrow: 'Internal tool',
        title: 'Prepare client-ready material',
        description: 'Use the offer builder to create controlled pricing tables, delivery notes, and assumptions once access is in place.',
        href: '/portal/sheets/',
        cta: 'Open offer builder',
      },
    );
  } else if (access.isInternal) {
    hero = {
      eyebrow: 'Internal priority',
      title: 'Move the work forward from one signed-in workspace.',
      description: 'You now have access to protected workflows, public-facing offers, and internal delivery material. The home page should push you into the next useful asset, not make you hunt for it.',
      primaryHref: '/portal/sheets/',
      primaryLabel: 'Open offer builder',
      secondaryHref: defaultFocus.href,
      secondaryLabel: defaultFocus.cta,
      featureLabel: 'Internal workflow',
      featureTitle: 'Offer Builder',
      featureBody: 'Create partner-ready and consultant-ready material without leaving the portal, then route into the right service or product page.',
    };
    tailoredGuides.push(
      {
        eyebrow: 'Protected workflow',
        title: defaultFocus.title,
        description: defaultFocus.description,
        href: defaultFocus.href,
        cta: defaultFocus.cta,
      },
      {
        eyebrow: 'Service content',
        title: featuredContent?.title || 'AI Knowledge Packs briefing',
        description:
          featuredContent?.summary ||
          'Use the signed-in workspace to move from offer material into the content that explains where structured AI-ready assets fit first.',
        href: featuredContent?.href || '/portal/content/ai-knowledge-packs-briefing/',
        cta: featuredContent?.ctaLabel || 'Open briefing',
      },
    );
  } else {
    hero = {
      eyebrow: 'Recommended next step',
      title: 'Start with the content built for your account.',
      description: 'After sign-in, the portal should move you straight into the material most relevant to your role, then give you a clear path into the next protected workflow.',
      primaryHref: defaultFocus.href,
      primaryLabel: defaultFocus.cta,
      secondaryHref: '/portal/account/',
      secondaryLabel: 'Review your access',
      featureLabel: defaultFocus.eyebrow,
      featureTitle: defaultFocus.title,
      featureBody: defaultFocus.description,
    };
    tailoredGuides.push(
      {
        eyebrow: 'Protected workflow',
        title: defaultFocus.title,
        description: defaultFocus.description,
        href: defaultFocus.href,
        cta: defaultFocus.cta,
      },
      {
        eyebrow: 'Background',
        title: featuredContent?.title || 'Understand Brando',
        description:
          featuredContent?.summary ||
          'See how the product and the IBOM framework fit together before you move into a live service request.',
        href: featuredContent?.href || '/brando/',
        cta: featuredContent?.ctaLabel || 'Open Brando',
      },
    );
  }

  return { workflowCards, hero, tailoredGuides };
}

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

function getCallbackUrlFor(nextPath) {
  const configuredOrigin = String(import.meta.env.PUBLIC_SITE_URL || '').trim().replace(/\/+$/, '');
  const hostname = window.location.hostname;
  const isLocalHost = isLocalHostname(hostname);
  const baseOrigin = !isLocalHost && configuredOrigin ? configuredOrigin : window.location.origin;
  const url = new URL('/auth/callback', baseOrigin);
  url.searchParams.set('next', nextPath || defaultPortalPath);
  return url.toString();
}

function getTurnstileSiteKey() {
  if (!authCaptchaEnabled) return '';

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

  const isLocalHost = isLocalHostname(window.location.hostname);

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
    return `Could not reach the ${authServiceLabel}. Please try again in a few minutes.`;
  }

  return rawMessage;
}

function getEmailFlowErrorMessage(err, fallback) {
  const rawMessage = err?.message || fallback;
  const lower = rawMessage.toLowerCase();
  const normalizedCode = String(err?.code || '').toLowerCase();
  const isRateLimit =
    err?.status === 429 || lower.includes('rate limit') || lower.includes('too many');

  if (isRateLimit) {
    return {
      message: 'Email rate limit exceeded. Wait a few minutes and try again.',
      isRateLimit: true,
    };
  }

  if (
    normalizedCode === 'otp_expired' ||
    lower.includes('token has expired') ||
    lower.includes('expired or is invalid') ||
    lower.includes('otp_expired')
  ) {
    return {
      message: 'That security code has expired or is invalid. Use the newest verification-code email, or resend a fresh code.',
      isRateLimit: false,
    };
  }

  if (lower.includes('user not found')) {
    return {
      message:
        'We could not find a provisioned account for that address. Ask Advanced Analytica to create access first.',
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
        'We could not find a provisioned account for that address. Ask Advanced Analytica to create access first.',
      isRateLimit: false,
    };
  }

  if (lower.includes('user already registered') || lower.includes('already been registered')) {
    return {
      message: 'An account already exists for that email. Use Password or Secure code to sign in.',
      isRateLimit: false,
    };
  }

  if (
    lower.includes('supabase is not configured') ||
    lower.includes('not configured') ||
    lower.includes('public_supabase')
  ) {
    return {
      message: authConfigMessage,
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
        'The sign-in email could not be sent. Please contact Advanced Analytica so we can check the mail service.',
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
        'The verification check did not complete. Refresh the page and try again.',
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
        authConfigMessage,
      isRateLimit: false,
    };
  }

  if (lower.includes('failed to fetch') || lower.includes('network')) {
    return {
      message: `Could not reach the ${authServiceLabel}. Please try again in a few minutes.`,
      isRateLimit: false,
    };
  }

  return { message: rawMessage, isRateLimit: false };
}

function getLoginErrorMessage(errorCode, errorDescription) {
  const normalizedCode = (errorCode || '').toLowerCase();
  const normalizedDescription = (errorDescription || '').toLowerCase();

  if (normalizedCode === 'otp_expired') {
    return 'That security code has expired or was already used. Request a fresh code and use the newest email only once.';
  }

  if (normalizedCode === 'access_denied' && normalizedDescription.includes('expired')) {
    return 'That security code has expired. Request a fresh code and try again.';
  }

  if (normalizedCode === 'callback') {
    if (normalizedDescription.includes('requested resource does not exist')) {
      return authConfigMessage;
    }

    if (errorDescription) {
      return `The sign-in callback failed: ${errorDescription}`;
    }

    return 'The sign-in could not be completed. Request a new security code and try again.';
  }

  if (normalizedCode === 'config') {
    return 'Authentication is not configured correctly for this environment.';
  }

  if (
    normalizedCode === 'unexpected_failure' &&
    normalizedDescription.includes('multiple accounts with the same email address')
  ) {
    return 'More than one account is using this email address. Please contact Advanced Analytica so we can tidy up your access.';
  }

  if (errorDescription) {
    return `Authentication failed: ${errorDescription}`;
  }

  return '';
}

async function requestEmailOtp({ email, captchaToken, nextUrl, shouldCreateUser }) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), emailOtpRequestTimeoutMs);

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
    const error = new Error(payload?.error || 'Failed to send security code.');
    error.status = response.status;
    error.code = payload?.code || payload?.error_code || '';
    throw error;
  }

  return payload;
}

async function verifyEmailOtp({ email, token, nextUrl }) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), emailOtpRequestTimeoutMs);

  let response;
  try {
    response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        token,
        nextUrl,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Security code verification took too long. Try again.');
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  const responseText = await response.text().catch(() => '');
  let payload = null;
  try {
    payload = responseText ? JSON.parse(responseText) : null;
  } catch {}

  if (!response.ok) {
    const error = new Error(
      payload?.error ||
      payload?.message ||
      payload?.msg ||
      responseText ||
      'Failed to verify security code.',
    );
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
        'error-callback': () => {
          onLoadError?.('The verification check failed. Reload the page and try again.');
          finish('');
        },
        'timeout-callback': () => {
          onLoadError?.('The verification check timed out. Reload the page and try again.');
          finish('');
        },
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

function LoginInner({ tenantName = 'Advanced Analytica', tenantSlug = 'advanced-analytica', tenantHost = '' }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState('');
  const [method, setMethod] = useState('secure_code');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const codeInputRefs = useRef([]);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetRef = useRef(null);
  const heroVideoRef = useRef(null);

  const nextUrl = getNextUrl();
  const cooldownSeconds = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const inCooldown = cooldownSeconds > 0;
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedOtpCode = otpCode.replace(/\D/g, '').slice(0, 6);
  const canVerifyOtp = otpSent && otpEmail === normalizedEmail;

  function resetTurnstile() {
    if (typeof window === 'undefined' || turnstileWidgetRef.current == null) return;
    if (!window.turnstile?.reset) return;

    window.turnstile.reset(turnstileWidgetRef.current);
  }

  function clearOtpState() {
    setOtpCode('');
    setOtpEmail('');
    setOtpSent(false);
  }

  function handleOtpChange(index, value) {
    const digits = value.replace(/\D/g, '');
    if (!digits) {
      const nextCode = normalizedOtpCode.padEnd(6, ' ').split('');
      nextCode[index] = ' ';
      setOtpCode(nextCode.join('').replace(/\s/g, ''));
      return;
    }

    const nextDigits = normalizedOtpCode.padEnd(6, ' ').split('');
    digits
      .slice(0, 6 - index)
      .split('')
      .forEach((digit, digitIndex) => {
        nextDigits[index + digitIndex] = digit;
      });

    const nextCode = nextDigits.join('').replace(/\s/g, '').slice(0, 6);
    setOtpCode(nextCode);

    const nextIndex = Math.min(5, index + digits.length);
    window.setTimeout(() => codeInputRefs.current[nextIndex]?.focus(), 0);
  }

  function handleOtpKeyDown(index, event) {
    if (event.key !== 'Backspace') return;
    if (normalizedOtpCode[index]) return;

    event.preventDefault();
    const previousIndex = Math.max(0, index - 1);
    const nextCode = normalizedOtpCode.padEnd(6, ' ').split('');
    nextCode[previousIndex] = ' ';
    setOtpCode(nextCode.join('').replace(/\s/g, ''));
    window.setTimeout(() => codeInputRefs.current[previousIndex]?.focus(), 0);
  }

  async function getCaptchaToken() {
    if (!authCaptchaEnabled) {
      return '';
    }

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

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return undefined;

    const applyPlaybackSettings = () => {
      video.playbackRate = 0.78;
      video.defaultPlaybackRate = 0.78;
    };

    const holdFinalFrame = () => {
      if (!Number.isNaN(video.duration) && Number.isFinite(video.duration)) {
        video.currentTime = Math.max(0, video.duration - 0.05);
      }
      video.pause();
    };

    applyPlaybackSettings();
    video.addEventListener('loadedmetadata', applyPlaybackSettings);
    video.addEventListener('ended', holdFinalFrame);

    return () => {
      video.removeEventListener('loadedmetadata', applyPlaybackSettings);
      video.removeEventListener('ended', holdFinalFrame);
    };
  }, []);

  async function signIn(event, requestedMethod = method) {
    event.preventDefault();
    setStatus({ state: 'idle', message: '' });
    const isSecureCodeRequest = requestedMethod === 'secure_code' || requestedMethod === 'secure_code_resend';

    if (!isSecureCodeRequest && (!isSupabaseConfigured || !supabase)) {
      setStatus({
        state: 'error',
        message: authConfigMessage,
      });
      return;
    }

    if (!email.trim()) {
      setStatus({ state: 'error', message: 'Enter an email address.' });
      return;
    }

    if (
      (isSecureCodeRequest || (allowSelfSignup && requestedMethod === 'request_access')) &&
      inCooldown &&
      !(requestedMethod === 'secure_code' && canVerifyOtp)
    ) {
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
      const shouldRunCaptcha = !(requestedMethod === 'secure_code' && canVerifyOtp);
      const captchaToken = shouldRunCaptcha ? await getCaptchaToken() : '';
      if (shouldRunCaptcha && authCaptchaEnabled && !captchaToken && !canBypassTurnstileForLocalDev()) {
        setStatus((current) =>
          current.state === 'error' && current.message
            ? current
            : { state: 'error', message: 'The verification check did not complete. Try again.' },
        );
        return;
      }

      if (isSecureCodeRequest) {
        if (requestedMethod === 'secure_code' && canVerifyOtp) {
          if (normalizedOtpCode.length !== 6) {
            setStatus({ state: 'error', message: 'Enter the 6-digit security code.' });
            return;
          }

          const payload = await verifyEmailOtp({
            email: normalizedEmail,
            token: normalizedOtpCode,
            nextUrl,
          });

          setStatus({ state: 'sent', message: 'Security code verified. Loading the portal…' });
          window.location.replace(payload?.redirectTo || nextUrl);
          return;
        }

        await requestEmailOtp({
          email: normalizedEmail,
          captchaToken,
          nextUrl,
          shouldCreateUser: false,
        });

        setCooldownUntil(Date.now() + resendCooldownMs);
        setOtpEmail(normalizedEmail);
        setOtpCode('');
        setOtpSent(true);
        setStatus({ state: 'sent', message: 'Check your email for “Your verification code”, then enter the 6 digits below.' });
        window.setTimeout(() => codeInputRefs.current[0]?.focus(), 0);
        return;
      }

      if (allowSelfSignup && requestedMethod === 'request_access') {
        await requestEmailOtp({
          email: normalizedEmail,
          captchaToken,
          nextUrl: '/auth/confirmed',
          shouldCreateUser: true,
        });

        setCooldownUntil(Date.now() + resendCooldownMs);
        setMethod('secure_code');
        setOtpEmail(normalizedEmail);
        setOtpCode('');
        setOtpSent(true);
        setStatus({
          state: 'sent',
          message: 'Check your email for “Your verification code”, then enter the 6 digits below.',
        });
        window.setTimeout(() => codeInputRefs.current[0]?.focus(), 0);
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
        isSecureCodeRequest || (allowSelfSignup && requestedMethod === 'request_access')
          ? getEmailFlowErrorMessage(err, 'Failed to send security code.')
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
        message: authConfigMessage,
      });
      return;
    }

    if (!email.trim()) {
      setStatus({ state: 'error', message: 'Enter your email first.' });
      return;
    }

    const captchaToken = await getCaptchaToken();
    if (authCaptchaEnabled && !captchaToken && !canBypassTurnstileForLocalDev()) {
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
        message: authConfigMessage,
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
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
                  Move Fast. Stay Safe.
                </div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  Sign in to our services suite
                </h1>
              </div>
            </div>

            <div className="space-y-4 auth-card pt-0">
              <div className="space-y-2">
                <div className="tabs">
                  <button
                    type="button"
                    onClick={() => setMethod('secure_code')}
                    disabled={busy}
                    className={`flex-1 rounded-[10px] border px-4 py-2 text-sm font-medium transition ${method === 'secure_code' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'}`}
                  >
                    Secure code
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('password')}
                    disabled={busy}
                    className={`flex-1 rounded-[10px] border px-4 py-2 text-sm font-medium transition ${method === 'password' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'}`}
                  >
                    Password
                  </button>
                </div>
                <p className="text-sm text-slate-500">
                  {method === 'secure_code'
                    ? canVerifyOtp
                      ? `Enter the newest 6-digit code sent to ${otpEmail}.`
                      : 'Enter your work email and we’ll send a secure one-time code.'
                    : allowSelfSignup && method === 'request_access'
                      ? 'We’ll email you a security code and create your portal account if one does not exist yet.'
                      : 'Use password sign-in if your account has one set.'}
                </p>
              </div>

              <form onSubmit={(event) => signIn(event, method)} className="form">
                <label className="label text-sm font-medium text-slate-700">
                  <span>
                    Email <span className="text-[#14B8A6]">*</span>
                  </span>
                  <input
                    className="input text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6]"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => {
                      const nextEmail = event.target.value;
                      setEmail(nextEmail);
                      if (otpEmail && nextEmail.trim().toLowerCase() !== otpEmail) {
                        clearOtpState();
                      }
                    }}
                    disabled={busy}
                    placeholder="you@company.com"
                    required
                  />
                </label>

                {method === 'secure_code' && canVerifyOtp ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <label className="text-sm font-medium text-slate-700">
                        Security code <span className="text-[#14B8A6]">*</span>
                      </label>
                      <button
                        className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-700 disabled:no-underline disabled:opacity-60"
                        type="button"
                        onClick={(event) => signIn(event, 'secure_code_resend')}
                        disabled={busy || inCooldown}
                      >
                        {inCooldown ? `Resend in ${cooldownSeconds}s` : 'Resend'}
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2" aria-label="6-digit security code">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <input
                          key={`otp-${index}`}
                          ref={(node) => {
                            codeInputRefs.current[index] = node;
                          }}
                          className="aspect-square w-full min-w-0 rounded-[10px] border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-[#14B8A6]"
                          type="text"
                          inputMode="numeric"
                          autoComplete={index === 0 ? 'one-time-code' : 'off'}
                          pattern="[0-9]*"
                          maxLength={6}
                          value={normalizedOtpCode[index] || ''}
                          onChange={(event) => handleOtpChange(index, event.target.value)}
                          onKeyDown={(event) => handleOtpKeyDown(index, event)}
                          onFocus={(event) => event.target.select()}
                          disabled={busy}
                          aria-label={`Security code digit ${index + 1}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">
                      Use the newest security code only once.
                    </p>
                  </div>
                ) : null}

                {method === 'password' ? (
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <label className="text-sm font-medium text-slate-700">
                        Password <span className="text-[#14B8A6]">*</span>
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
                <div ref={turnstileContainerRef} className={turnstileMountClass} aria-hidden="true" />

                <div className="pt-2">
                  <button
                    className="w-full rounded-[10px] bg-[#14B8A6] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F766E] disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                    disabled={busy || (method === 'secure_code' && !canVerifyOtp && inCooldown)}
                  >
                    {busy
                      ? 'Working…'
                      : method === 'secure_code' || (allowSelfSignup && method === 'request_access')
                        ? method === 'secure_code' && canVerifyOtp
                          ? 'Continue'
                          : inCooldown
                          ? `Try again in ${cooldownSeconds}s`
                          : allowSelfSignup && method === 'request_access'
                            ? 'Request access code'
                            : 'Send security code'
                        : 'Sign in'}
                  </button>
                </div>

                {allowSelfSignup ? (
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
                        ? 'Working...'
                        : inCooldown && method === 'request_access'
                          ? `Try again in ${cooldownSeconds}s`
                          : 'Sign up'}
                    </button>
                  </div>
                ) : null}
              </form>

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
                Access is provisioned by Advanced Analytica. Use the email address we created for you.
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden lg:col-span-7 lg:block">
          <video
            ref={heroVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/brando.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-black/72 via-[#0b0e14]/66 to-[#171b24]/74" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/55" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#14B8A6]/10 blur-3xl" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[#14B8A6]/10 blur-3xl" />

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
                <div className="text-sm font-semibold uppercase tracking-[0.28em] text-[#14B8A6]">
                  Move Fast. Stay Safe.
                </div>
                <div className="mt-6 text-6xl font-bold leading-[1.05] tracking-tight">
                  Log in to our
                  <br />
                  <span className="text-[#14B8A6]">suite of services</span>
                </div>
                <p className="mx-auto mt-8 max-w-xl text-lg text-white/70">
                  Access protected service workflows, partner materials, offer material, and the operating tools that help teams move quickly without losing control.
                </p>
                <p className="mx-auto mt-6 max-w-xl text-sm uppercase tracking-[0.22em] text-white/45">
                  Brando - AI Brand Operator
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

function PortalInner({ tenantName = 'Advanced Analytica', tenantSlug = 'advanced-analytica', services = [], portalContent = [] }) {
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
  const serviceOfferings = [
    {
      eyebrow: 'First step',
      title: 'AI Knowledge Packs',
      description:
        'Prepare documents, policy, screenshots, expert knowledge, and operating context for reliable AI use before committing to a governed agent build.',
      href: '/services/ai-ready-knowledge-packs/',
      cta: 'View offer',
      stage: 'Readiness',
    },
    {
      eyebrow: 'Core product',
      title: 'Brando',
      description:
        'Turn brand intent into an AI Brand Operator: structured knowledge, controls, approval logic, and evidence that can operate inside live workflows.',
      href: '/brando/',
      cta: 'Open Brando',
      stage: 'Operate',
    },
    {
      eyebrow: 'Delivery model',
      title: 'IBOM Framework',
      description:
        'Scope, define, design, checkpoint, build, and evolve AI-ready operating assets with expert-supervised specification and validation.',
      href: '/ibom-way/',
      cta: 'See IBOM',
      stage: 'Deliver',
    },
  ];
  const { workflowCards, hero, tailoredGuides } = createPortalPersonalization({
    access,
    services,
    tenantName,
    portalContent,
  });

  return (
    <section className="min-h-screen bg-white text-[#202123]">
      <div className="mx-auto w-[min(1352px,calc(100vw-3rem))] py-10 lg:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[#202123]">Home</h1>
          <div className="inline-flex rounded-full bg-[#ececec] p-1 text-sm font-medium text-[#666]">
            {['24h', '7d', '30d', '90d'].map((range, index) => (
              <button
                key={range}
                type="button"
                className={`rounded-full px-3 py-1.5 transition ${index === 0 ? 'bg-white text-[#202123] shadow-sm' : 'hover:text-[#202123]'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-20 overflow-hidden rounded-[1.5rem] border border-[#e2e2e2] bg-white">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-[#e7eaef] p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#0f9288]">{hero.eyebrow}</div>
              <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#111]">
                {hero.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6368]">
                {hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={hero.primaryHref} className="inline-flex rounded-md bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2a2a2a]">
                  {hero.primaryLabel}
                </a>
                <a href={hero.secondaryHref} className="inline-flex rounded-md border border-[#d3d7df] px-4 py-2.5 text-sm font-medium text-[#202123] transition hover:bg-[#f6f7f9]">
                  {hero.secondaryLabel}
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.18),transparent_30%),linear-gradient(140deg,#fbfbfc_0%,#f2f6fb_52%,#eef8f5_100%)] p-8 lg:p-10">
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#0f9288]">{hero.featureLabel}</div>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[#111]">{hero.featureTitle}</h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#5f6368]">{hero.featureBody}</p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-medium text-[#202123] shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#14B8A6]" />
                Signed-in content can now adapt by role
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-xl border border-[#e2e2e2] bg-white">
          <div className="grid md:grid-cols-3">
            <div className="border-b border-[#e2e2e2] p-5 md:border-b-0 md:border-r">
              <div className="text-sm text-[#555]">Protected workflows ›</div>
              <div className="mt-2 text-2xl font-medium text-[#202123]">{workflowCards.length}</div>
              <div className="mt-10 h-px bg-[#14B8A6]" />
            </div>
            <div className="border-b border-[#e2e2e2] p-5 md:border-b-0 md:border-r">
              <div className="text-sm text-[#555]">Access level ›</div>
              <div className="mt-2 truncate text-2xl font-medium text-[#202123]">{access.audienceLabel}</div>
              <div className="mt-10 h-px border-t border-dashed border-[#b8bec8]" />
            </div>
            <div className="p-5">
              <div className="text-sm text-[#555]">Session status ›</div>
              <div className="mt-2 text-2xl font-medium text-[#202123]">
                {session.access_token ? 'Verified' : 'Pending'}
              </div>
              <div className="mt-10 h-px bg-[#14B8A6]" />
            </div>
            <div className="border-t border-[#e2e2e2] p-5 md:border-r">
              <div className="text-sm text-[#555]">Signed in</div>
              <div className="mt-6 truncate text-sm font-medium text-[#202123]">{user.email}</div>
            </div>
            <div className="border-t border-[#e2e2e2] p-5 md:border-r">
              <div className="text-sm text-[#555]">Roles</div>
              <div className="mt-6 truncate text-sm font-medium text-[#202123]">
                {access.roles.length ? access.roles.join(', ') : 'client'}
              </div>
            </div>
            <div className="border-t border-[#e2e2e2] p-5">
              <div className="text-sm text-[#555]">Tenant</div>
              <div className="mt-6 truncate text-sm font-medium text-[#202123]">{tenantName}</div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-10 xl:grid-cols-[1.35fr_0.65fr]">
          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#202123]">Protected workflows</h2>
              <span className="text-sm text-[#666]">{workflowCards.length} available</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#e2e2e2] bg-white">
              <div className="divide-y divide-[#e8e8e8]">
                {workflowCards.map((card, index) => (
                  <a
                    key={`${card.href}-${index}`}
                    href={card.href}
                    className="group grid gap-3 px-5 py-4 transition hover:bg-[#f7f7f7] md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0f9288]">{card.eyebrow}</div>
                      <h3 className="mt-1 text-base font-medium text-[#202123]">{card.title}</h3>
                      <p className="mt-1 max-w-3xl text-sm leading-6 text-[#5f6368]">{card.description}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-[#202123]">
                      {card.cta}
                      <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <aside className="grid content-start gap-3">
            <div className="rounded-xl border border-[#e2e2e2] bg-white p-5">
              <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0f9288]">Tailored next</div>
              <div className="mt-3 space-y-3">
                {tailoredGuides.map((guide) => (
                  <a
                    key={guide.href}
                    href={guide.href}
                    className="group block rounded-lg border border-[#edf0f3] px-4 py-4 transition hover:bg-[#f7f7f7]"
                  >
                    <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#0f9288]">{guide.eyebrow}</div>
                    <h3 className="mt-1 text-sm font-medium text-[#202123]">{guide.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5f6368]">{guide.description}</p>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#202123]">
                      {guide.cta}
                      <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/portal/products/"
              className="group rounded-xl border border-[#e2e2e2] bg-white p-5 transition hover:bg-[#f7f7f7]"
            >
              <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0f9288]">Catalogue</div>
              <h2 className="mt-2 text-lg font-medium tracking-[-0.02em] text-[#202123]">Products</h2>
              <p className="mt-3 text-sm leading-6 text-[#5f6368]">
                Explore the products, frameworks, services, and protected tools available to your account.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#202123]">
                Open products
                <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
              </div>
            </a>

            {portalContent.length ? (
              <a
                href={portalContent[0].href}
                className="group rounded-xl border border-[#e2e2e2] bg-white p-5 transition hover:bg-[#f7f7f7]"
              >
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0f9288]">Protected content</div>
                <h2 className="mt-2 text-lg font-medium tracking-[-0.02em] text-[#202123]">{portalContent[0].title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#5f6368]">
                  {portalContent[0].summary}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#202123]">
                  {portalContent[0].ctaLabel}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                </div>
              </a>
            ) : null}

            {access.isInternal ? (
              <a
                href="/portal/sheets/"
                className="group rounded-xl border border-[#e2e2e2] bg-white p-5 transition hover:bg-[#f7f7f7]"
              >
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0f9288]">Internal tool</div>
                <h2 className="mt-2 text-lg font-medium tracking-[-0.02em] text-[#202123]">Offer Builder</h2>
                <p className="mt-3 text-sm leading-6 text-[#5f6368]">
                  Pricing tables, delivery notes, assumptions, and partner-ready material.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#202123]">
                  Open offer builder
                  <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                </div>
              </a>
            ) : null}

            {access.isAdmin ? (
              <a
                href="/portal/admin/users/"
                className="group rounded-xl border border-[#e2e2e2] bg-white p-5 transition hover:bg-[#f7f7f7]"
              >
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0f9288]">Superadmin</div>
                <h2 className="mt-2 text-lg font-medium tracking-[-0.02em] text-[#202123]">Users and roles</h2>
                <p className="mt-3 text-sm leading-6 text-[#5f6368]">
                  Invite provisioned users, assign roles, disable access, and remove accounts.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#202123]">
                  Manage users
                  <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                </div>
              </a>
            ) : null}

            <a
              href="/portal/account/"
              className="group rounded-xl border border-[#e2e2e2] bg-white p-5 transition hover:bg-[#f7f7f7]"
            >
              <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0f9288]">Account</div>
              <h2 className="mt-2 text-lg font-medium tracking-[-0.02em] text-[#202123]">Profile and access</h2>
              <p className="mt-3 text-sm leading-6 text-[#5f6368]">
                Review your tenant, roles, and enabled portal areas.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#202123]">
                View profile
                <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
              </div>
            </a>
          </aside>
        </div>

        <section className="mt-12">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#202123]">Service offerings</h2>
              <p className="mt-1 text-sm text-[#666]">Public offers to discuss with clients.</p>
            </div>
            <a href="/services/" className="text-sm font-medium text-[#202123] transition hover:text-[#0f9288]">
              Public services
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#e2e2e2] bg-white">
          <div className="divide-y divide-[#e8e8e8]">
            {serviceOfferings.map((offering) => (
              <a
                key={offering.title}
                href={offering.href}
                className="group grid gap-3 px-5 py-4 transition hover:bg-[#f7f7f7] lg:grid-cols-[0.7fr_1fr_auto] lg:items-center"
              >
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#0f9288]">{offering.eyebrow}</div>
                  <h3 className="mt-1 text-base font-medium text-[#202123]">{offering.title}</h3>
                </div>
                <p className="text-sm leading-6 text-[#5f6368]">{offering.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#202123]">
                  {offering.cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                </div>
              </a>
            ))}
          </div>
          </div>
        </section>
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
        message: authConfigMessage,
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
      intro="This page completes the secure account recovery flow on the main production domain."
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
  const [otpCode, setOtpCode] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetRef = useRef(null);
  const nextUrl = `/portal?intake_role=${encodeURIComponent(role.slug)}`;
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedOtpCode = otpCode.replace(/\D/g, '').slice(0, 6);
  const canVerifyOtp = otpSent && otpEmail === normalizedEmail;

  function resetTurnstile() {
    if (typeof window === 'undefined' || turnstileWidgetRef.current == null) return;
    if (!window.turnstile?.reset) return;
    window.turnstile.reset(turnstileWidgetRef.current);
  }

  async function getCaptchaToken() {
    if (!authCaptchaEnabled) {
      return '';
    }

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

  async function submitSecurityCode(event) {
    event.preventDefault();
    setStatus({ state: 'idle', message: '' });

    if (!normalizedEmail) {
      setStatus({ state: 'error', message: 'Enter an email address.' });
      return;
    }

    setBusy(true);
    try {
      if (canVerifyOtp) {
        if (normalizedOtpCode.length !== 6) {
          setStatus({ state: 'error', message: 'Enter the 6-digit security code.' });
          return;
        }

        const payload = await verifyEmailOtp({
          email: normalizedEmail,
          token: normalizedOtpCode,
          nextUrl,
        });

        setStatus({ state: 'sent', message: 'Security code verified. Loading the portal…' });
        window.location.replace(payload?.redirectTo || nextUrl);
        return;
      }

      const captchaToken = await getCaptchaToken();
      if (authCaptchaEnabled && !captchaToken) {
        setStatus((current) => current.state === 'error' && current.message ? current : { state: 'error', message: 'The verification check did not complete. Try again.' });
        return;
      }

      await requestEmailOtp({
        email: normalizedEmail,
        captchaToken,
        nextUrl,
        shouldCreateUser: false,
      });
      setOtpEmail(normalizedEmail);
      setOtpCode('');
      setOtpSent(true);
      setStatus({ state: 'sent', message: 'Check your email for your secure sign-in code.' });
    } catch (err) {
      const { message } = getEmailFlowErrorMessage(err, 'Failed to send security code.');
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
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Secure code</h1>
            </div>

            <div className="space-y-4 auth-card pt-0">
              <p className="text-sm text-slate-500">
                {canVerifyOtp ? `Enter the newest 6-digit code sent to ${otpEmail}.` : "We'll email you a one-time specialist-call code for this role."}
              </p>
              <form onSubmit={submitSecurityCode} className="form">
                <label className="label text-sm font-medium text-slate-700">
                  <span>Work email <span className="text-[#14B8A6]">*</span></span>
                  <input className="input text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6]" type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => {
                    const nextEmail = event.target.value;
                    setEmail(nextEmail);
                    if (otpEmail && nextEmail.trim().toLowerCase() !== otpEmail) {
                      setOtpCode('');
                      setOtpEmail('');
                      setOtpSent(false);
                    }
                  }} disabled={busy} placeholder="you@company.com" required />
                </label>
                {canVerifyOtp ? (
                  <label className="label text-sm font-medium text-slate-700">
                    <span>Security code <span className="text-[#14B8A6]">*</span></span>
                    <input
                      className="input text-center text-lg font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6]"
                      type="text"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={normalizedOtpCode}
                      onChange={(event) => setOtpCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                      disabled={busy}
                      placeholder="123456"
                      required
                    />
                    <span className="text-xs font-normal leading-relaxed text-slate-500">Use the newest security code only once.</span>
                  </label>
                ) : null}
                <StatusBanner status={status} />
                <div className="rounded-[10px] border border-dashed border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-500">We validate business email domains and run a verification check before sending the code.</div>
                <div ref={turnstileContainerRef} className={turnstileMountClass} aria-hidden="true" />
                <button className="w-full rounded-[10px] bg-[#14B8A6] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F766E] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={busy}>{busy ? 'Working…' : canVerifyOtp ? 'Continue' : 'Send security code'}</button>
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
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[#14B8A6]/10 blur-3xl" />
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

export function LoginApp(props) {
  return <LoginInner {...props} />;
}

export function RoleMagicLinkApp({ role }) {
  return <RoleMagicLinkInner role={role} />;
}

export function PortalApp(props) {
  return (
    <AuthProvider>
      <PortalInner {...props} />
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
