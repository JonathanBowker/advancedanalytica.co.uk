import { defineMiddleware } from 'astro:middleware';
import { getPortalAccess } from './lib/portalAccess';
import { createSupabaseServerClient, isSupabaseConfigured } from './lib/supabaseServer';
import { getDefaultTenant, getTenantHomePath, getTenantLoginPath, resolveTenantFromRequest } from './lib/tenants';

const protectedPaths = ['/portal'];
const authPages = ['/login'];
const legacyRedirects: Record<string, string> = {
  '/activate': '/brando/',
  '/activate/': '/brando/',
  '/agronomy': '/case-studies/agriculture-regulatory-knowledge/',
  '/agronomy/': '/case-studies/agriculture-regulatory-knowledge/',
  '/about': '/company/about/',
  '/about/': '/company/about/',
  '/brand-sematics-analysis': '/brand-ai-drift-audit/',
  '/brand-sematics-analysis/': '/brand-ai-drift-audit/',
  '/brand-ai-readiness-assessment': '/brand-ai-drift-audit/',
  '/brand-ai-readiness-assessment/': '/brand-ai-drift-audit/',
  '/contact': '/company/contact/',
  '/contact/': '/company/contact/',
  '/creative-ai-labs/ai-workshops': '/company/contact/',
  '/creative-ai-labs/ai-workshops/': '/company/contact/',
  '/creative-ai-labs/gen-ai-framework': '/developers/',
  '/creative-ai-labs/gen-ai-framework/': '/developers/',
  '/digividuals': '/brand-operator/',
  '/digividuals/': '/brand-operator/',
  '/dots-brand-operator-animation': '/brando/',
  '/dots-brand-operator-animation/': '/brando/',
  '/dots-brand-operator-wordmark-animation': '/brando/',
  '/dots-brand-operator-wordmark-animation/': '/brando/',
  '/home': '/',
  '/home/': '/',
  '/home/responsible-capability-scaling': '/opinions/ai-agents-are-scaling-faster-than-their-guardrails/',
  '/home/responsible-capability-scaling/': '/opinions/ai-agents-are-scaling-faster-than-their-guardrails/',
  '/products/ibom': '/ibom/',
  '/products/ibom/': '/ibom/',
  '/ranulph': '/case-studies/',
  '/ranulph/': '/case-studies/',
  '/services/IBOM': '/ibom/',
  '/services/IBOM/': '/ibom/',
  '/services/iBOM': '/ibom/',
  '/services/iBOM/': '/ibom/',
  '/services/ibom': '/ibom/',
  '/services/ibom/': '/ibom/',
};

const apexOrigin = 'https://advancedanalytica.co.uk';

const toApexUrl = (target: string) => new URL(target, apexOrigin).toString();

const getLegacyCanonicalTarget = (pathname: string, search: string) => {
  const withSearch = (target: string) => `${target}${search}`;

  const exactTarget = legacyRedirects[pathname];
  if (exactTarget) return withSearch(exactTarget);

  const lowerPathname = pathname.toLowerCase();
  if (
    lowerPathname === '/opinions/tag/ibom' ||
    lowerPathname === '/opinions/tag/ibom/' ||
    lowerPathname === '/blog/tag/ibom' ||
    lowerPathname === '/blog/tag/ibom/' ||
    lowerPathname === '/case-studies/tag/ibom' ||
    lowerPathname === '/case-studies/tag/ibom/' ||
    lowerPathname === '/use-cases/tag/ibom' ||
    lowerPathname === '/use-cases/tag/ibom/'
  ) {
    return withSearch('/opinions/tag/IBOM/');
  }

  if (
    pathname === '/blog/what-v-storm-calls-agentic-ai-your-estate-manager-calls-tuesday' ||
    pathname === '/blog/what-v-storm-calls-agentic-ai-your-estate-manager-calls-tuesday/' ||
    pathname === '/opinions/what-v-storm-calls-agentic-ai-your-estate-manager-calls-tuesday' ||
    pathname === '/opinions/what-v-storm-calls-agentic-ai-your-estate-manager-calls-tuesday/'
  ) {
    return withSearch('/opinions/what-agentic-ai-calls-automation-estate-managers-call-tuesday/');
  }

  if (pathname === '/blog' || pathname === '/blog/') return withSearch('/opinions/');
  if (pathname.startsWith('/blog/tag/')) {
    return withSearch(`/opinions/tag/${pathname.slice('/blog/tag/'.length)}`);
  }
  if (pathname.startsWith('/blog/series/')) {
    return withSearch(`/opinions/series/${pathname.slice('/blog/series/'.length)}`);
  }
  if (pathname.startsWith('/blog/')) {
    return withSearch(`/opinions/${pathname.slice('/blog/'.length)}`);
  }

  if (pathname === '/use-cases' || pathname === '/use-cases/') return withSearch('/case-studies/');
  if (pathname.startsWith('/use-cases/tag/')) {
    return withSearch(`/case-studies/tag/${pathname.slice('/use-cases/tag/'.length)}`);
  }
  if (pathname.startsWith('/use-cases/')) {
    return withSearch(`/case-studies/${pathname.slice('/use-cases/'.length)}`);
  }

  return undefined;
};

const getLegacySubdomainTarget = (hostname: string, pathname: string, search: string) => {
  const withSearch = (target: string) => `${target}${search}`;

  if (hostname === 'aiops.advancedanalytica.co.uk') {
    return withSearch('/enterprise/');
  }

  if (hostname !== 'aeo.advancedanalytica.co.uk') return undefined;

  if (pathname === '/about' || pathname === '/about/') return withSearch('/company/about/');
  if (pathname === '/terms-of-service' || pathname === '/terms-of-service/') return withSearch('/legal/terms/');
  if (pathname.startsWith('/appendix/resources')) return withSearch('/resources/');
  if (pathname.startsWith('/appendix/checklist')) return withSearch('/resources/agentic-ai-brand-risk-checklist/');
  if (pathname.startsWith('/appendix/conversation-template')) {
    return withSearch('/resources/machine-readable-policy-template/');
  }
  if (pathname.startsWith('/appendix/glossary')) return withSearch('/resources/');
  if (pathname === '/best-practice' || pathname === '/best-practice/') return withSearch('/how-it-works/');
  if (pathname === '/how-to-use' || pathname === '/how-to-use/') return withSearch('/how-it-works/');
  if (pathname === '/old-vs-new' || pathname === '/old-vs-new/') {
    return withSearch('/opinions/ai-agents-need-operable-knowledge-not-more-data/');
  }
  if (pathname === '/why-now' || pathname === '/why-now/') {
    return withSearch('/opinions/ai-agents-are-scaling-faster-than-their-guardrails/');
  }
  if (pathname.startsWith('/part')) return withSearch('/opinions/');

  return withSearch('/opinions/');
};

export const onRequest = defineMiddleware(async (context, next) => {
  const requestUrl = new URL(context.request.url);
  const { pathname, search } = requestUrl;
  const hostname = requestUrl.hostname.toLowerCase();
  const legacyTarget = getLegacyCanonicalTarget(pathname, search);
  if (legacyTarget) {
    return context.redirect(
      hostname === 'www.advancedanalytica.co.uk' ? toApexUrl(legacyTarget) : legacyTarget,
      301,
    );
  }

  const subdomainTarget = getLegacySubdomainTarget(hostname, pathname, search);
  if (subdomainTarget) {
    return context.redirect(toApexUrl(subdomainTarget), 301);
  }

  if (hostname === 'www.advancedanalytica.co.uk') {
    return context.redirect(toApexUrl(`${pathname}${search}`), 301);
  }

  if (context.isPrerendered) {
    context.locals.tenant = getDefaultTenant();
    context.locals.user = null;
    return next();
  }

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
  const access = getPortalAccess(user);

  if (protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    if (!user) {
      const nextPath = pathname === '/portal' && !search ? pathname : `${pathname}${search}`;
      return context.redirect(getTenantLoginPath(nextPath));
    }

    if (!access.canAccessPortal) {
      return context.redirect('/auth/confirmed?portal=restricted');
    }
  }

  if (authPages.includes(pathname) && user) {
    return context.redirect(access.canAccessPortal ? getTenantHomePath() : '/auth/confirmed');
  }

  return next();
});
