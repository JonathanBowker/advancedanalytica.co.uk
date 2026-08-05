import type { APIRoute } from 'astro';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createSupabaseServerClient, isSupabaseConfigured } from '../../../lib/supabaseServer';
import { sendTransactionalEmail } from '../../../lib/transactionalEmail';

export const prerender = false;

const maxUploadBytes = 25 * 1024 * 1024;
const defaultInboxDir = '/tmp/advanced-analytica/disney-submissions';
const allowedExtensions = new Set(['pdf', 'docx', 'png', 'jpg', 'jpeg']);
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildSubmissionReferenceEmail({
  name,
  submissionId,
  disneyProperty,
  creativeType,
  activityStartDate,
  activityEndDate,
  filename,
}: {
  name: string;
  submissionId: string;
  disneyProperty: string;
  creativeType: string;
  activityStartDate: string;
  activityEndDate: string;
  filename: string;
}) {
  const greeting = name ? `Hi ${name},` : 'Hi,';
  const text = [
    greeting,
    '',
    'MagiKit has received your Disney Brand Compliance pre-screening submission.',
    '',
    `Submission reference: ${submissionId}`,
    `Disney property: ${disneyProperty}`,
    `Content type: ${creativeType}`,
    `Activity dates: ${activityStartDate} to ${activityEndDate}`,
    `File: ${filename}`,
    '',
    'This is a pre-screening workflow for review support and does not replace final Disney approval.',
    '',
    'Advanced Analytica',
  ].join('\n');

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f3f6fb;padding:28px;font-family:Arial,sans-serif;color:#0f172a;">
    <div style="max-width:640px;margin:0 auto;">
      <div style="padding:0 0 18px;">
        <img src="https://advancedanalytica.co.uk/images/infrastructure/logo-black.svg" alt="Advanced Analytica" style="display:block;width:188px;height:auto;" />
      </div>
      <div style="border-radius:24px;background:#090d14;color:#ffffff;padding:34px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#14b8a6;">MagiKit submission</div>
        <h1 style="margin:18px 0 0;font-size:34px;line-height:1.05;">Your creative is in the queue</h1>
        <p style="margin:18px 0 0;color:#cbd5e1;font-size:16px;line-height:1.65;">${escapeHtml(greeting)} MagiKit has received your Disney Brand Compliance pre-screening submission.</p>
        <div style="margin:26px 0 0;border-radius:18px;background:#ffffff;color:#0f172a;padding:20px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;">Submission reference</div>
          <div style="margin-top:8px;font-size:18px;font-weight:800;line-height:1.35;word-break:break-word;">${escapeHtml(submissionId)}</div>
        </div>
        <table role="presentation" style="width:100%;margin-top:22px;border-collapse:collapse;color:#cbd5e1;font-size:14px;line-height:1.5;">
          <tr><td style="padding:6px 0;color:#94a3b8;">Disney property</td><td style="padding:6px 0;text-align:right;color:#ffffff;">${escapeHtml(disneyProperty)}</td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;">Content type</td><td style="padding:6px 0;text-align:right;color:#ffffff;">${escapeHtml(creativeType)}</td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;">Activity dates</td><td style="padding:6px 0;text-align:right;color:#ffffff;">${escapeHtml(activityStartDate)} to ${escapeHtml(activityEndDate)}</td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;">File</td><td style="padding:6px 0;text-align:right;color:#ffffff;">${escapeHtml(filename)}</td></tr>
        </table>
        <p style="margin:24px 0 0;color:#94a3b8;font-size:13px;line-height:1.65;">This is a pre-screening workflow for review support and does not replace final Disney approval.</p>
      </div>
    </div>
  </body>
</html>`;

  return { text, html };
}

async function forwardToPipeline({
  endpoint,
  file,
  manifest,
  submission,
}: {
  endpoint: string;
  file: File;
  manifest: Record<string, unknown>;
  submission: Record<string, unknown>;
}) {
  const payload = new FormData();
  payload.set('manifest', JSON.stringify(manifest));
  payload.set('submission', JSON.stringify(submission));
  payload.set('creative', file, file.name);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: payload,
  });

  if (!response.ok) {
    throw new Error(`Pipeline ingest returned ${response.status}`);
  }
}

export const POST: APIRoute = async ({ request, cookies, params }) => {
  const slug = String(params.slug || '').trim();

  if (slug !== 'brand-readiness-assessment') {
    return new Response('Not found', { status: 404 });
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

  const disneyProperty = cleanText(formData.get('disneyProperty')) || 'disneyland_hotel';
  if (disneyProperty !== 'disneyland_hotel') {
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
  const sha256 = createHash('sha256').update(uploadBuffer).digest('hex');

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
      label: 'Disneyland Hotel',
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
  try {
    await mkdir(submissionDir, { recursive: true });
    await Promise.all([
      writeFile(join(submissionDir, storedFilename), uploadBuffer),
      writeFile(join(submissionDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8'),
      writeFile(join(submissionDir, 'submission.json'), JSON.stringify(submission, null, 2) + '\n', 'utf8'),
    ]);

    const pipelineIngestUrl = getEnvValue('DISNEY_PIPELINE_INGEST_URL');
    if (pipelineIngestUrl) {
      await forwardToPipeline({
        endpoint: pipelineIngestUrl,
        file: creative,
        manifest,
        submission,
      });
    }
  } catch (error) {
    console.error('Failed to queue Disney creative submission', error);
    return redirectToForm(slug, { error: 'pipeline' });
  }

  const confirmationEmail = buildSubmissionReferenceEmail({
    name,
    submissionId,
    disneyProperty: 'Disneyland Hotel',
    creativeType: creativeTypeLabels[creativeType],
    activityStartDate,
    activityEndDate,
    filename: creative.name,
  });
  const emailResult = await sendTransactionalEmail({
    to: email,
    subject: `MagiKit submission received: ${submissionId}`,
    text: confirmationEmail.text,
    html: confirmationEmail.html,
  });
  if (!emailResult.ok) {
    console.error('Failed to send MagiKit submission confirmation', emailResult.error);
  }

  return redirectToForm(slug, {
    submitted: '1',
    submission: submissionId,
  });
};
