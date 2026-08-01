import { readFileSync } from 'node:fs';

const requiredRedirects = [
  'http://127.0.0.1:4321/**',
  'http://localhost:4321/**',
  'https://advancedanalytica.co.uk/**',
  'https://www.advancedanalytica.co.uk/**',
  'https://advancedanalytica-co-uk-omj3v.ondigitalocean.app/**',
];

const templateChecks = [
  'mailer_templates_magic_link_content',
  'mailer_templates_confirmation_content',
  'mailer_templates_invite_content',
  'mailer_templates_recovery_content',
];

function loadDotEnv() {
  try {
    return Object.fromEntries(
      readFileSync('.env', 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => {
          const separator = line.indexOf('=');
          if (separator === -1) return [line, ''];
          return [
            line.slice(0, separator),
            line.slice(separator + 1).replace(/^['"]|['"]$/g, ''),
          ];
        }),
    );
  } catch {
    return {};
  }
}

function getProjectRef(env) {
  if (env.SUPABASE_PROJECT_REF) return env.SUPABASE_PROJECT_REF;
  return env.SUPABASE_URL?.match(/^https:\/\/([^.]+)\.supabase\.co/)?.[1] || '';
}

function readConfigValue(config, key) {
  return String(config[key] || '');
}

const env = { ...loadDotEnv(), ...process.env };
const accessToken = env.SUPABASE_ACCESS_TOKEN;
const projectRef = getProjectRef(env);

if (!accessToken || !projectRef) {
  console.error('Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF/SUPABASE_URL.');
  process.exit(1);
}

const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const config = await response.json();

if (!response.ok) {
  console.error('Could not read Supabase auth config.');
  process.exit(1);
}

const allowList = readConfigValue(config, 'uri_allow_list')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const missingRedirects = requiredRedirects.filter((redirect) => !allowList.includes(redirect));
const brokenTemplates = templateChecks.filter((key) => {
  const content = readConfigValue(config, key);
  return content && (!content.includes('TokenHash') || content.includes('ConfirmationURL'));
});

const checks = {
  captchaDisabled: config.security_captcha_enabled === false,
  requiredRedirectsPresent: missingRedirects.length === 0,
  tokenHashTemplatesReady: brokenTemplates.length === 0,
};

console.log(JSON.stringify({
  ok: Object.values(checks).every(Boolean),
  checks,
  missingRedirects,
  brokenTemplates,
  siteUrl: config.site_url,
}, null, 2));

if (!Object.values(checks).every(Boolean)) {
  process.exit(1);
}
