import { createBrowserClient } from '@supabase/ssr';

function resolveEnvValue(publicValue: string | undefined, fallbackValue: string | undefined) {
  const value = String(publicValue || '').trim();
  if (value && !value.startsWith('${')) return value;

  return String(fallbackValue || '').trim();
}

const supabaseUrl = resolveEnvValue(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.SUPABASE_URL);
const supabaseAnonKey = resolveEnvValue(import.meta.env.PUBLIC_SUPABASE_ANON_KEY, import.meta.env.SUPABASE_ANON_KEY);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
