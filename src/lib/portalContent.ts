export type PortalAccessShape = {
  isAdmin?: boolean;
  isInternal?: boolean;
};

export type PortalContentAccess = 'all' | 'internal' | 'admin';

export function canAccessPortalContent(
  accessLevel: PortalContentAccess,
  access: PortalAccessShape | null | undefined
) {
  if (accessLevel === 'all') return true;
  if (accessLevel === 'admin') return Boolean(access?.isAdmin);
  return Boolean(access?.isInternal || access?.isAdmin);
}

export function getPortalContentAccessLabel(accessLevel: PortalContentAccess) {
  if (accessLevel === 'admin') return 'Admin only';
  if (accessLevel === 'internal') return 'Internal roles';
  return 'All signed-in users';
}
