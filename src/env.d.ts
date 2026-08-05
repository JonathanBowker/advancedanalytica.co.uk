/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly SUPABASE_URL?: string;
  readonly SUPABASE_ANON_KEY?: string;
  readonly SUPABASE_SERVICE_ROLE_KEY?: string;
  readonly PORTAL_SUPERADMIN_EMAILS?: string;
  readonly DISNEY_PIPELINE_INBOX_DIR?: string;
  readonly DISNEY_PIPELINE_INGEST_URL?: string;
  readonly AWS_ACCESS_KEY_ID?: string;
  readonly AWS_SECRET_ACCESS_KEY?: string;
  readonly AWS_SESSION_TOKEN?: string;
  readonly AWS_REGION?: string;
  readonly AWS_SES_REGION?: string;
  readonly TRANSACTIONAL_EMAIL_FROM?: string;
  readonly MAGIKIT_EMAIL_FROM?: string;
  readonly LEAD_EMAIL_FROM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user: import('@supabase/supabase-js').User | null;
    tenant: import('./lib/tenants').ResolvedTenant;
  }
}
