import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient, isSupabaseConfigured } from './lib/supabaseServer';
import { getDefaultTenant, getTenantHomePath, getTenantLoginPath, resolveTenantFromRequest } from './lib/tenants';

const protectedPaths = ['/portal'];
const authPages = ['/login'];
const legacyRedirects: Record<string, string> = {
  '/activate': '/brando/',
  '/activate/': '/brando/',
  '/agronomy': '/use-cases/agriculture-regulatory-knowledge/',
  '/agronomy/': '/use-cases/agriculture-regulatory-knowledge/',
  '/brand-sematics-analysis': '/brand-ai-drift-audit/',
  '/brand-sematics-analysis/': '/brand-ai-drift-audit/',
  '/dots-brand-operator-animation': '/brando/',
  '/dots-brand-operator-animation/': '/brando/',
  '/dots-brand-operator-wordmark-animation': '/brando/',
  '/dots-brand-operator-wordmark-animation/': '/brando/',
  '/products/ibom': '/ibom/',
  '/products/ibom/': '/ibom/',
  '/services/IBOM': '/ibom/',
  '/services/IBOM/': '/ibom/',
  '/services/ibom': '/ibom/',
  '/services/ibom/': '/ibom/',
};

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) {
    context.locals.tenant = getDefaultTenant();
    context.locals.user = null;
    return next();
  }

  const requestUrl = new URL(context.request.url);
  const { pathname, search } = requestUrl;
  const authError = requestUrl.searchParams.get('error');
  const authErrorCode = requestUrl.searchParams.get('error_code');
  const authErrorDescription = requestUrl.searchParams.get('error_description');
  const authCode = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const tenant = resolveTenantFromRequest(context.request);

  context.locals.tenant = tenant;

  if (pathname === '/index.html') {
    const rewriteTarget = search ? `/${search}` : '/';
    return context.rewrite(rewriteTarget);
  }

  const legacyTarget = legacyRedirects[pathname];
  if (legacyTarget) {
    return context.redirect(legacyTarget, 301);
  }

  if (
    pathname === '/' &&
    (authCode || tokenHash) &&
    !requestUrl.pathname.startsWith('/auth/callback')
  ) {
    const callbackUrl = new URL('/auth/callback', requestUrl.origin);
    requestUrl.searchParams.forEach((value, key) => {
      callbackUrl.searchParams.set(key, value);
    });
    if (!callbackUrl.searchParams.get('next')) {
      callbackUrl.searchParams.set('next', '/portal');
    }
    return context.redirect(callbackUrl.toString());
  }

  if (pathname !== '/login' && authError) {
    const redirectParams = new URLSearchParams();
    redirectParams.set('error', authErrorCode || authError);
    if (authErrorDescription) redirectParams.set('error_description', authErrorDescription);
    return context.redirect(`/login?${redirectParams.toString()}`);
  }

  if (!isSupabaseConfigured) {
    context.locals.user = null;
    if (protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
      return context.redirect('/login?error=config');
    }
    return next();
  }

  const supabase = createSupabaseServerClient({
    request: context.request,
    cookies: context.cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  context.locals.user = user ?? null;

  if (protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    if (!user) {
      const nextPath = pathname === '/portal' && !search ? pathname : `${pathname}${search}`;
      return context.redirect(getTenantLoginPath(nextPath));
    }
  }

  if (authPages.includes(pathname) && user) {
    return context.redirect(getTenantHomePath());
  }

  return next();
});
