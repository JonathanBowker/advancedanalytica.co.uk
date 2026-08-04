import { defaultTenantHost, portalServices, tenants, type PortalService, type TenantDefinition } from '../config/tenants';
import { isLocalHostname, normalizeHostname } from './hosts';

const themeFiles = import.meta.glob('../themes/*.css', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function getRequestHostname(request: Request) {
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0];
  const host = forwardedHost || request.headers.get('host');

  if (host) return normalizeHostname(host);

  return normalizeHostname(new URL(request.url).hostname);
}

function getRequestProtocol(request: Request) {
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  if (forwardedProto) return forwardedProto;
  return new URL(request.url).protocol.replace(':', '');
}

function getRequestAuthority(request: Request) {
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = request.headers.get('host')?.trim();

  if (forwardedHost) return forwardedHost.toLowerCase();
  if (host) return host.toLowerCase();

  return new URL(request.url).host.toLowerCase();
}

function toThemeKey(themePath: TenantDefinition['theme']) {
  return themePath.replace('./themes/', '../themes/');
}

export type ResolvedTenant = TenantDefinition & {
  host: string;
};

export function resolveTenantFromRequest(request: Request): ResolvedTenant {
  const host = getRequestHostname(request);
  const tenant = tenants[host] ?? tenants[defaultTenantHost];

  return {
    ...tenant,
    host,
  };
}

export function getDefaultTenant(): ResolvedTenant {
  const tenant = tenants[defaultTenantHost];

  return {
    ...tenant,
    host: defaultTenantHost,
  };
}

export function getRequestOrigin(request: Request) {
  const authority = getRequestAuthority(request);
  const protocol = getRequestProtocol(request);
  return `${protocol}://${authority}`;
}

function getTrustedBrowserOrigin(request: Request, configuredOrigin: string) {
  const rawOrigin = request.headers.get('origin')?.trim();
  if (!rawOrigin) return '';

  try {
    const originUrl = new URL(rawOrigin);
    const requestHostname = getRequestHostname(request);
    const configuredHostname = configuredOrigin ? new URL(configuredOrigin).hostname : '';
    const originHostname = normalizeHostname(originUrl.hostname);
    const isKnownOrigin =
      Boolean(tenants[originHostname]) ||
      isLocalHostname(originHostname) ||
      originHostname === requestHostname ||
      originHostname === configuredHostname;

    if ((originUrl.protocol === 'https:' || originUrl.protocol === 'http:') && isKnownOrigin) {
      return `${originUrl.protocol}//${originUrl.host.toLowerCase()}`;
    }
  } catch {
    return '';
  }

  return '';
}

export function getPublicSiteOrigin(request?: Request) {
  const configured = String(import.meta.env.PUBLIC_SITE_URL || '').trim().replace(/\/+$/, '');

  if (!request) {
    return configured;
  }

  return getTrustedBrowserOrigin(request, configured) || getRequestOrigin(request) || configured;
}

export function getTenantThemeCss(tenant: TenantDefinition) {
  const baseCss = themeFiles['../themes/base.css'] ?? '';
  const tenantCss = themeFiles[toThemeKey(tenant.theme)] ?? '';

  if (tenant.theme === './themes/base.css') {
    return baseCss;
  }

  return `${baseCss}\n${tenantCss}`;
}

export function getTenantPortalServices(tenant: TenantDefinition): PortalService[] {
  return tenant.services
    .map((serviceSlug) => portalServices[serviceSlug])
    .filter(Boolean);
}

export function getTenantPortalService(tenant: TenantDefinition, slug: string) {
  if (!tenant.services.includes(slug)) return null;
  return portalServices[slug] ?? null;
}

export function getTenantHomePath() {
  return '/portal';
}

export function getTenantLoginPath(next?: string) {
  if (!next || next === '/portal') return '/login';
  return `/login?next=${encodeURIComponent(next)}`;
}
