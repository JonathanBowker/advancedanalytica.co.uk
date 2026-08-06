import type { APIRoute } from 'astro';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { orchestrateDisneySubmission } from '../../../lib/disneyOrchestration';
import { createSupabaseServerClient, isSupabaseConfigured } from '../../../lib/supabaseServer';

export const prerender = false;

const maxUploadBytes = 25 * 1024 * 1024;
const defaultInboxDir = '/tmp/advanced-analytica/disney-submissions';
const allowedExtensions = new Set(['pdf', 'docx', 'png', 'jpg', 'jpeg']);
const allowedSubmitOrigins = new Set([
  'https://advancedanalytica.co.uk',
  'https://www.advancedanalytica.co.uk',
  'https://advancedanalytica-co-uk-omj3v.ondigitalocean.app',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
]);
const allowedMimeTypes = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
]);

const creativeTypeLabels: Record<string, string> = {
  social_media_post: 'Social media post',
  email_campaign: 'Email campaign',
  newsletter: 'Newsletter',
  brochure_print: 'Brochure / print',
  banner_display_ad: 'Banner / display ad',
  blog_vlog: 'Blog / Vlog',
  other: 'Other',
};

const creativeTypeChannels: Record<string, string> = {
  social_media_post: 'social',
  email_campaign: 'email',
  newsletter: 'email',
  brochure_print: 'brochure',
  banner_display_ad: 'web',
  blog_vlog: 'web',
  other: 'other',
};

function cleanText(value: FormDataEntryValue | null) {
  return String(value || '').trim();
}

function redirectToForm(slug: string, params: Record<string, string>) {
  const search = new URLSearchParams(params);
  return new Response(null, {
    status: 303,
    headers: {
      Location: `/forms/${encodeURIComponent(slug)}?${search.toString()}`,
    },
  });
}

function safeFilename(value: string) {
  const cleaned = value
    .trim()
    .replace(/[/\\?%*:|"<>]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return cleaned || 'creative-upload';
}

function extensionFor(filename: string) {
  return filename.split('.').pop()?.toLowerCase() || '';
}

function getEnvValue(name: string) {
  return String((import.meta.env as Record<string, string | undefined>)[name] || process.env[name] || '').trim();
}

function getProfileValue(metadata: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = metadata[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  return '';
}

function requestOriginIsAllowed(request: Request) {
  const origin = request.headers.get('origin');
  if (origin) return allowedSubmitOrigins.has(origin);

  const referer = request.headers.get('referer');
  if (!referer) return true;

  try {
    return allowedSubmitOrigins.has(new URL(referer).origin);
  } catch {
    return false;
  }
}

function companyFromEmail(email: string) {
  const domain = email.split('@')[1] || '';
  const company = domain.split('.')[0]?.replace(/[-_]+/g, ' ').trim();
  return company || 'Unknown company';
}

function isValidDateField(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

export const POST: APIRoute = async ({ request, cookies, params }) => {
  const slug = String(params.slug || '').trim();

  if (slug !== 'brand-readiness-assessment') {
    return new Response('Not found', { status: 404 });
  }

  if (!requestOriginIsAllowed(request)) {
    return redirectToForm(slug, { error: 'origin' });
  }

  if (!isSupabaseConfigured) {
    return redirectToForm(slug, { error: 'config' });
  }

  const supabase = createSupabaseServerClient({ request, cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectToForm(slug, { error: 'auth' });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return redirectToForm(slug, { error: 'invalid' });
  }

  const creative = formData.get('creative');
  if (!(creative instanceof File) || creative.size === 0) {
    return redirectToForm(slug, { error: 'missing_file' });
  }

  if (creative.size > maxUploadBytes) {
    return redirectToForm(slug, { error: 'file_size' });
  }

  const extension = extensionFor(creative.name);
  if (!allowedExtensions.has(extension) || (creative.type && !allowedMimeTypes.has(creative.type))) {
    return redirectToForm(slug, { error: 'file_type' });
  }

  const creativeType = cleanText(formData.get('creativeType'));
  if (!creativeTypeLabels[creativeType]) {
    return redirectToForm(slug, { error: 'invalid' });
  }

  const disneyProperty = cleanText(formData.get('disneyProperty')) || 'disneyland_paris';
  if (disneyProperty !== 'disneyland_paris') {
    return redirectToForm(slug, { error: 'invalid' });
  }

  const activityStartDate = cleanText(formData.get('activityStartDate'));
  const activityEndDate = cleanText(formData.get('activityEndDate'));
  if (
    !isValidDateField(activityStartDate) ||
    !isValidDateField(activityEndDate) ||
    activityEndDate < activityStartDate
  ) {
    return redirectToForm(slug, { error: 'date' });
  }

  const notes = cleanText(formData.get('notes'));
  if (notes.length > 300) {
    return redirectToForm(slug, { error: 'invalid' });
  }

  const email = String(user.email || '').trim().toLowerCase();
  const userMetadata = user.user_metadata || {};
  const name =
    cleanText(formData.get('name')) ||
    getProfileValue(userMetadata, 'full_name', 'name', 'display_name') ||
    email.split('@')[0] ||
    'Signed-in user';
  const company =
    cleanText(formData.get('company')) ||
    getProfileValue(userMetadata, 'company', 'company_name', 'organisation', 'organization') ||
    companyFromEmail(email);

  if (!name || !company || !email) {
    return redirectToForm(slug, { error: 'invalid' });
  }

  const now = new Date();
  const submissionId = `magikit-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID()}`;
  const safeOriginalName = safeFilename(creative.name);
  const storedFilename = `${submissionId}-${safeOriginalName}`;
  const uploadBuffer = Buffer.from(await creative.arrayBuffer());
  const uploadBytes = new Uint8Array(uploadBuffer);
  const sha256 = createHash('sha256').update(uploadBytes).digest('hex');

  const manifest = {
    manifest_id: submissionId,
    partner: {
      name: company,
      contact: `${name} <${email}>`,
    },
    channel: creativeTypeChannels[creativeType],
    market: 'UK & Ireland',
    intended_destinations: ['disneyland_paris'],
    publication_date: activityStartDate,
    campaign_end_date: activityEndDate,
    disney_template_used: false,
    magiKit_asset_ids: [],
    approval_records: [],
  };

  const submission = {
    submission_id: submissionId,
    submitted_at: now.toISOString(),
    service_slug: slug,
    user: {
      id: user.id,
      name,
      email,
      company,
    },
    disney_property: {
      value: disneyProperty,
      label: 'Disneyland Paris',
      manifest_destination: 'disneyland_paris',
    },
    creative_type: {
      value: creativeType,
      label: creativeTypeLabels[creativeType],
      manifest_channel: creativeTypeChannels[creativeType],
    },
    activity: {
      start_date: activityStartDate,
      end_date: activityEndDate,
      manifest_publication_date: activityStartDate,
      manifest_campaign_end_date: activityEndDate,
    },
    notes,
    file: {
      original_name: creative.name,
      stored_name: storedFilename,
      media_type: creative.type || 'application/octet-stream',
      size: creative.size,
      sha256,
    },
    pipeline: {
      status: 'queued',
      manifest_file: 'manifest.json',
      creative_file: storedFilename,
    },
  };

  const inboxDir = getEnvValue('DISNEY_PIPELINE_INBOX_DIR') || defaultInboxDir;
  const submissionDir = join(inboxDir, submissionId);
  const storedFilePath = join(submissionDir, storedFilename);
  try {
    await mkdir(submissionDir, { recursive: true });
    await Promise.all([
      writeFile(storedFilePath, uploadBytes),
      writeFile(join(submissionDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8'),
      writeFile(join(submissionDir, 'submission.json'), JSON.stringify(submission, null, 2) + '\n', 'utf8'),
    ]);
  } catch (error) {
    console.error('Failed to queue Disney creative submission', error);
    return redirectToForm(slug, { error: 'pipeline' });
  }

  try {
    await orchestrateDisneySubmission({
      submissionId,
      submissionDir,
      storedFilePath,
      storedFilename,
      originalFilename: creative.name,
      mediaType: creative.type || 'application/octet-stream',
      manifest,
      submission,
      creativeFile: creative,
      getEnvValue,
    });
  } catch (error) {
    console.error('Failed to orchestrate Disney creative submission', error);
  }

  return redirectToForm(slug, {
    submitted: '1',
    submission: submissionId,
  });
};
