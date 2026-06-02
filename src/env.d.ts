declare namespace App {
  interface Locals {
    user: import('@supabase/supabase-js').User | null;
    tenant: import('./lib/tenants').ResolvedTenant;
  }
}
