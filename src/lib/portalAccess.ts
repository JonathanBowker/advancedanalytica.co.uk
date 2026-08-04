function slugifyRole(value: unknown) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function normalizeRoleValues(value: unknown) {
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

export const portalAssignableRoles = [
  'admin',
  'operator',
  'developer',
  'consultant',
  'partner',
  'client',
  'page_viewer',
] as const;

const portalEntryRoles = new Set(['admin', 'operator', 'developer', 'consultant', 'partner', 'client']);

export type PortalAccessUser = {
  email?: string | null;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
};

export function getPortalAccess(user: PortalAccessUser | null | undefined) {
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
  const isAdmin = uniqueRoles.includes('admin');
  const isDeveloper = uniqueRoles.includes('developer');
  const isConsultant = uniqueRoles.includes('consultant');
  const isPartner = uniqueRoles.includes('partner');
  const isClient = uniqueRoles.includes('client') || uniqueRoles.length === 0;
  const isInternal = isAdmin || isOperator || isDeveloper || isConsultant || isPartner;
  const isPageViewer = uniqueRoles.includes('page_viewer');
  const hasPortalEntryRole = uniqueRoles.length === 0 || uniqueRoles.some((role) => portalEntryRoles.has(role));
  const isPageViewerOnly = isPageViewer && !hasPortalEntryRole;
  const canAccessPortal = !isPageViewerOnly;

  let audienceLabel = 'Client access';
  if (isPartner) audienceLabel = 'Partner access';
  if (isConsultant) audienceLabel = 'Consultant access';
  if (isDeveloper) audienceLabel = 'Developer access';
  if (isOperator) audienceLabel = 'Operator access';
  if (isAdmin) audienceLabel = 'Admin access';
  if (isPageViewerOnly) audienceLabel = 'Page-only access';

  return {
    roles: uniqueRoles,
    isAdmin,
    isOperator,
    isDeveloper,
    isConsultant,
    isPartner,
    isClient,
    isInternal,
    isPageViewer,
    isPageViewerOnly,
    canAccessPortal,
    audienceLabel,
  };
}
