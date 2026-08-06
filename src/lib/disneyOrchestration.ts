import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';

type StageStatus = 'completed' | 'skipped' | 'failed';

type OrchestrationStage = {
  status: StageStatus;
  message: string;
  endpoint?: string;
  evidence?: unknown;
};

type ExtractionEvent = {
  stage: string;
  status: 'completed' | 'skipped' | 'failed';
  message: string;
  tool?: string;
};

type MatcherVisualInput = {
  input_id: string;
  source_kind: string;
  file_path: string;
  media_type: string;
  source_sha256: string;
  width?: number;
  height?: number;
};

type OrchestrationResult = {
  submission_id: string;
  completed_at: string;
  stages: {
    image_matcher: OrchestrationStage;
    compliance_pipeline: OrchestrationStage;
    legacy_ingest: OrchestrationStage;
  };
  final_message: string;
};

type OrchestrationParams = {
  submissionId: string;
  submissionDir: string;
  storedFilePath: string;
  storedFilename: string;
  originalFilename: string;
  mediaType: string;
  manifest: Record<string, unknown>;
  submission: Record<string, unknown>;
  creativeFile: File;
  getEnvValue: (name: string) => string;
};

const defaultTimeoutMs = 25_000;
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const jpegSofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);

function cleanBaseUrl(value: string) {
  return value.trim().replace(/\/+$/, '');
}

function endpointFromEnv(primary: string, fallbackBase: string, fallbackPath: string, getEnvValue: (name: string) => string) {
  const configured = getEnvValue(primary);
  if (configured) return configured;
  const base = cleanBaseUrl(getEnvValue(fallbackBase));
  return base ? `${base}${fallbackPath}` : '';
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = defaultTimeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function readJsonResponse(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function isStandaloneImage(mediaType: string, filename: string) {
  const lower = filename.toLowerCase();
  return mediaType.startsWith('image/') || lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg');
}

function isPdf(mediaType: string, filename: string) {
  return mediaType === 'application/pdf' || filename.toLowerCase().endsWith('.pdf');
}

function isDocx(mediaType: string, filename: string) {
  return (
    mediaType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    filename.toLowerCase().endsWith('.docx')
  );
}

function sha256(buffer: Buffer) {
  return createHash('sha256').update(new Uint8Array(buffer)).digest('hex');
}

function startsWithPngSignature(buffer: Buffer) {
  if (buffer.length < pngSignature.length) return false;
  for (let index = 0; index < pngSignature.length; index += 1) {
    if (buffer[index] !== pngSignature[index]) return false;
  }
  return true;
}

function detectImageMetadata(buffer: Buffer, fallbackMediaType = 'application/octet-stream') {
  if (startsWithPngSignature(buffer) && buffer.length >= 24) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    if (width > 0 && height > 0) return { media_type: 'image/png', width, height };
  }

  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
      if (offset >= buffer.length) break;
      const marker = buffer[offset];
      offset += 1;
      if (marker === 0xd8 || marker === 0xd9) continue;
      if (offset + 2 > buffer.length) break;
      const segmentLength = buffer.readUInt16BE(offset);
      if (segmentLength < 2 || offset + segmentLength > buffer.length) break;
      if (jpegSofMarkers.has(marker) && segmentLength >= 7) {
        const height = buffer.readUInt16BE(offset + 3);
        const width = buffer.readUInt16BE(offset + 5);
        if (width > 0 && height > 0) return { media_type: 'image/jpeg', width, height };
      }
      offset += segmentLength;
    }
  }

  return { media_type: fallbackMediaType };
}

async function commandExists(command: string) {
  const pathDirs = String(process.env.PATH || '').split(':').filter(Boolean);
  for (const dir of pathDirs) {
    try {
      await access(join(dir, command));
      return true;
    } catch {
      // Keep looking across PATH entries.
    }
  }
  return false;
}

async function execFileWithTimeout(command: string, args: string[], timeoutMs = defaultTimeoutMs) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    execFile(command, args, { timeout: timeoutMs, maxBuffer: 5 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve({ stdout, stderr });
    });
  });
}

async function execFileBufferWithTimeout(command: string, args: string[], timeoutMs = defaultTimeoutMs) {
  return new Promise<{ stdout: Buffer; stderr: Buffer }>((resolve, reject) => {
    execFile(
      command,
      args,
      { timeout: timeoutMs, maxBuffer: 30 * 1024 * 1024, encoding: 'buffer' },
      (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve({ stdout, stderr });
      },
    );
  });
}

async function writeMatcherVisualInput({
  buffer,
  filePath,
  inputId,
  sourceKind,
  fallbackMediaType,
}: {
  buffer: Buffer;
  filePath: string;
  inputId: string;
  sourceKind: string;
  fallbackMediaType: string;
}): Promise<MatcherVisualInput> {
  await writeFile(filePath, new Uint8Array(buffer));
  const metadata = detectImageMetadata(buffer, fallbackMediaType);
  return {
    input_id: inputId,
    source_kind: sourceKind,
    file_path: filePath,
    media_type: metadata.media_type,
    source_sha256: sha256(buffer),
    width: metadata.width,
    height: metadata.height,
  };
}

async function renderPdfFirstPage(params: OrchestrationParams, visualDir: string) {
  const events: ExtractionEvent[] = [];
  if (!(await commandExists('pdftoppm'))) {
    return {
      visuals: [],
      events: [
        {
          stage: 'pdf_first_page_render',
          status: 'skipped' as const,
          message: 'Skipped because pdftoppm is not available on this host.',
        },
      ],
    };
  }

  const outputPrefix = join(visualDir, `${params.submissionId}-pdf-page-001`);
  const outputPath = `${outputPrefix}.png`;
  try {
    await execFileWithTimeout(
      'pdftoppm',
      ['-png', '-f', '1', '-l', '1', '-singlefile', '-r', '144', params.storedFilePath, outputPrefix],
      defaultTimeoutMs,
    );
    const buffer = await readFile(outputPath);
    const visual = await writeMatcherVisualInput({
      buffer,
      filePath: outputPath,
      inputId: 'visual-pdf-page-001-render',
      sourceKind: 'pdf_rendered_page',
      fallbackMediaType: 'image/png',
    });
    events.push({
      stage: 'pdf_first_page_render',
      status: 'completed',
      tool: 'pdftoppm',
      message: 'Rendered the first PDF page for approved-image matching.',
    });
    return { visuals: [visual], events };
  } catch (error) {
    return {
      visuals: [],
      events: [
        {
          stage: 'pdf_first_page_render',
          status: 'failed' as const,
          tool: 'pdftoppm',
          message: error instanceof Error ? error.message : 'PDF first-page rendering failed.',
        },
      ],
    };
  }
}

async function extractDocxEmbeddedImages(params: OrchestrationParams, visualDir: string) {
  if (!(await commandExists('unzip'))) {
    return {
      visuals: [],
      events: [
        {
          stage: 'docx_embedded_image_extract',
          status: 'skipped' as const,
          message: 'Skipped because unzip is not available on this host.',
        },
      ],
    };
  }

  const events: ExtractionEvent[] = [];
  const visuals: MatcherVisualInput[] = [];
  try {
    const { stdout } = await execFileWithTimeout('unzip', ['-Z1', params.storedFilePath], 10_000);
    const imageNames = stdout
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => /^word\/media\/.+\.(png|jpe?g)$/i.test(name))
      .slice(0, 8);

    if (imageNames.length === 0) {
      return {
        visuals,
        events: [
          {
            stage: 'docx_embedded_image_extract',
            status: 'skipped' as const,
            tool: 'unzip',
            message: 'No embedded PNG/JPEG images were found in the DOCX.',
          },
        ],
      };
    }

    for (const [index, imageName] of imageNames.entries()) {
      const { stdout: buffer } = await execFileBufferWithTimeout(
        'unzip',
        ['-p', params.storedFilePath, imageName],
        10_000,
      );
      const extension = imageName.toLowerCase().endsWith('.png') ? 'png' : 'jpg';
      visuals.push(
        await writeMatcherVisualInput({
          buffer,
          filePath: join(visualDir, `${params.submissionId}-docx-image-${String(index + 1).padStart(3, '0')}.${extension}`),
          inputId: `visual-docx-image-${String(index + 1).padStart(3, '0')}`,
          sourceKind: 'docx_embedded_image',
          fallbackMediaType: extension === 'png' ? 'image/png' : 'image/jpeg',
        }),
      );
    }

    events.push({
      stage: 'docx_embedded_image_extract',
      status: 'completed',
      tool: 'unzip',
      message: `Extracted ${visuals.length} embedded DOCX image${visuals.length === 1 ? '' : 's'} for approved-image matching.`,
    });
  } catch (error) {
    events.push({
      stage: 'docx_embedded_image_extract',
      status: 'failed',
      tool: 'unzip',
      message: error instanceof Error ? error.message : 'DOCX embedded-image extraction failed.',
    });
  }

  return { visuals, events };
}

async function collectMatcherVisualInputs(params: OrchestrationParams) {
  const visualDir = join(params.submissionDir, 'matcher-visuals');
  await mkdir(visualDir, { recursive: true });

  if (isStandaloneImage(params.mediaType, params.originalFilename)) {
    const buffer = await readFile(params.storedFilePath);
    const metadata = detectImageMetadata(buffer, params.mediaType);
    return {
      visuals: [
        {
          input_id: 'visual-standalone-001',
          source_kind: 'standalone_image',
          file_path: params.storedFilePath,
          media_type: metadata.media_type,
          source_sha256: sha256(buffer),
          width: metadata.width,
          height: metadata.height,
        },
      ],
      events: [
        {
          stage: 'standalone_image_collect',
          status: 'completed' as const,
          message: 'Collected standalone upload for approved-image matching.',
        },
      ],
    };
  }

  if (isPdf(params.mediaType, params.originalFilename)) {
    return renderPdfFirstPage(params, visualDir);
  }

  if (isDocx(params.mediaType, params.originalFilename)) {
    return extractDocxEmbeddedImages(params, visualDir);
  }

  return {
    visuals: [],
    events: [
      {
        stage: 'visual_input_collect',
        status: 'skipped' as const,
        message: 'No supported visual extraction path for this file type.',
      },
    ],
  };
}

function isoDateTimeFromDate(value: unknown) {
  const raw = String(value || '').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return `${raw}T12:00:00.000Z`;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.valueOf()) ? new Date().toISOString() : parsed.toISOString();
}

function countRuleStates(complianceEvidence: any) {
  const rules = complianceEvidence?.results?.rule_results || complianceEvidence?.rule_results;
  const counts = {
    pass: 0,
    fail: 0,
    insufficient: 0,
    notApplicable: 0,
  };

  if (!Array.isArray(rules)) return counts;

  for (const rule of rules) {
    const state = String(rule?.state || rule?.status || '').toUpperCase();
    if (state === 'PASS') counts.pass += 1;
    if (state === 'FAIL') counts.fail += 1;
    if (state === 'INSUFFICIENT_EVIDENCE') counts.insufficient += 1;
    if (state === 'NOT_APPLICABLE') counts.notApplicable += 1;
  }

  return counts;
}

function summariseMatcherEvidence(matcherEvidence: any) {
  const scans = Array.isArray(matcherEvidence?.scans) ? matcherEvidence.scans : [matcherEvidence];
  const results = scans.flatMap((scan: any) =>
    Array.isArray(scan?.evidence?.verification_results)
      ? scan.evidence.verification_results
      : Array.isArray(scan?.verification_results)
        ? scan.verification_results
        : [],
  );
  const confirmed = results.filter((result: any) => result?.verification_state === 'confirmed');
  const expired = confirmed.filter((result: any) => result?.validity?.state === 'expired');
  const valid = confirmed.filter((result: any) => result?.validity?.state === 'valid');
  const unknown = confirmed.filter((result: any) => !result?.validity || result.validity.state === 'unknown');

  return {
    confirmed: confirmed.length,
    valid: valid.length,
    expired: expired.length,
    unknown: unknown.length,
  };
}

function buildFinalMessage(result: Omit<OrchestrationResult, 'final_message'>) {
  const matcher = result.stages.image_matcher;
  const compliance = result.stages.compliance_pipeline;
  const matcherSummary = matcher.status === 'completed' ? summariseMatcherEvidence(matcher.evidence) : null;
  const complianceEvidence = compliance.evidence as any;
  const complianceStatus = complianceEvidence?.overall_status || complianceEvidence?.results?.overall_status;
  const ruleCounts = compliance.status === 'completed' ? countRuleStates(compliance.evidence) : null;
  const lines = [
    `Trailblazer test output for ${result.submission_id}`,
    '',
    `Image matching: ${matcher.message}`,
  ];

  if (matcherSummary) {
    lines.push(
      `Matched approved assets: ${matcherSummary.confirmed} confirmed, ${matcherSummary.valid} valid, ${matcherSummary.expired} expired, ${matcherSummary.unknown} unknown validity.`,
    );
  }

  lines.push('', `Compliance analysis: ${compliance.message}`);

  if (complianceStatus && ruleCounts) {
    lines.push(
      `Pipeline status: ${complianceStatus}. Rules: ${ruleCounts.pass} pass, ${ruleCounts.fail} fail, ${ruleCounts.insufficient} insufficient evidence, ${ruleCounts.notApplicable} not applicable.`,
    );
  }

  lines.push('', 'This is a Trailblazer pre-screening test message, not final Disney approval.');
  return `${lines.join('\n')}\n`;
}

async function runImageMatcher(params: OrchestrationParams): Promise<OrchestrationStage> {
  const scanEndpoint = endpointFromEnv(
    'DISNEY_IMAGE_MATCHER_SCAN_URL',
    'DISNEY_IMAGE_MATCHER_URL',
    '/scans',
    params.getEnvValue,
  );
  const uploadEndpoint = endpointFromEnv(
    'DISNEY_IMAGE_MATCHER_UPLOAD_URL',
    'DISNEY_IMAGE_MATCHER_URL',
    '/scan-uploads',
    params.getEnvValue,
  );
  const endpoint = uploadEndpoint || scanEndpoint;

  if (!endpoint) {
    return {
      status: 'skipped',
      message:
        'Skipped because DISNEY_IMAGE_MATCHER_URL, DISNEY_IMAGE_MATCHER_SCAN_URL, or DISNEY_IMAGE_MATCHER_UPLOAD_URL is not configured.',
    };
  }

  const collected = await collectMatcherVisualInputs(params);
  if (collected.visuals.length === 0) {
    return {
      status: 'skipped',
      endpoint,
      message: collected.events.map((event) => event.message).join(' '),
      evidence: {
        visual_inputs: [],
        extraction_events: collected.events,
        scans: [],
      },
    };
  }
  const apiKey = params.getEnvValue('DISNEY_IMAGE_MATCHER_API_KEY');
  const headers: Record<string, string> = {};
  if (apiKey) headers['X-API-Key'] = apiKey;

  try {
    const scans = await Promise.all(
      collected.visuals.map(async (visual) => {
        const asOf = isoDateTimeFromDate((params.submission.activity as Record<string, unknown>)?.end_date);
        const response = uploadEndpoint
          ? await postMatcherUpload(uploadEndpoint, headers, visual, asOf)
          : await postMatcherJson(scanEndpoint, headers, visual, asOf);
        const evidence = await readJsonResponse(response);
        return {
          input_id: visual.input_id,
          status: response.ok ? 'completed' : 'failed',
          http_status: response.status,
          evidence,
        };
      }),
    );
    const completed = scans.filter((scan) => scan.status === 'completed').length;
    const failed = scans.length - completed;
    const evidence = {
      visual_inputs: collected.visuals.map(({ file_path, ...visual }) => ({
        ...visual,
        source_uri: pathToFileURL(file_path).href,
      })),
      extraction_events: collected.events,
      scans,
    };

    if (completed === 0) {
      return {
        status: 'failed',
        endpoint,
        message: `Image matcher failed for all ${scans.length} visual input${scans.length === 1 ? '' : 's'}.`,
        evidence,
      };
    }

    return {
      status: 'completed',
      endpoint,
      message: `Completed approved-image matching for ${completed} visual input${completed === 1 ? '' : 's'}${failed ? `; ${failed} failed` : ''}.`,
      evidence,
    };
  } catch (error) {
    return {
      status: 'failed',
      endpoint,
      message: error instanceof Error ? error.message : 'Image matcher request failed.',
    };
  }
}

async function postMatcherUpload(
  endpoint: string,
  headers: Record<string, string>,
  visual: MatcherVisualInput,
  asOf: string,
) {
  const payload = new FormData();
  const buffer = await readFile(visual.file_path);
  payload.set(
    'creative',
    new File([new Uint8Array(buffer)], basename(visual.file_path), {
      type: visual.media_type,
    }),
  );
  payload.set('brand_id', 'disney');
  payload.set('tenant_id', 'parks');
  payload.set('source_sha256', visual.source_sha256);
  payload.set('as_of', asOf);
  if (visual.width) payload.set('width', String(visual.width));
  if (visual.height) payload.set('height', String(visual.height));

  return fetchWithTimeout(endpoint, {
    method: 'POST',
    headers,
    body: payload,
  });
}

async function postMatcherJson(
  endpoint: string,
  headers: Record<string, string>,
  visual: MatcherVisualInput,
  asOf: string,
) {
  const payload = {
    brand_id: 'disney',
    tenant_id: 'parks',
    source_uri: pathToFileURL(visual.file_path).href,
    source_sha256: visual.source_sha256,
    width: visual.width,
    height: visual.height,
    as_of: asOf,
  };

  return fetchWithTimeout(endpoint, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

async function runCompliancePipeline(params: OrchestrationParams): Promise<OrchestrationStage> {
  const endpoint = endpointFromEnv(
    'DISNEY_COMPLIANCE_AUDIT_URL',
    'DISNEY_COMPLIANCE_API_URL',
    '/v1/audits',
    params.getEnvValue,
  );

  if (!endpoint) {
    return {
      status: 'skipped',
      message: 'Skipped because DISNEY_COMPLIANCE_API_URL or DISNEY_COMPLIANCE_AUDIT_URL is not configured.',
    };
  }

  const payload = new FormData();
  payload.set('document', params.creativeFile, params.originalFilename);
  payload.set(
    'manifest',
    new File([JSON.stringify(params.manifest, null, 2)], 'manifest.json', {
      type: 'application/json',
    }),
  );

  const apiKey = params.getEnvValue('DISNEY_COMPLIANCE_API_KEY');
  const headers: Record<string, string> = {};
  if (apiKey) headers['X-API-Key'] = apiKey;

  try {
    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers,
      body: payload,
    });
    const evidence = await readJsonResponse(response);

    if (!response.ok) {
      return {
        status: 'failed',
        endpoint,
        message: `Compliance pipeline returned HTTP ${response.status}.`,
        evidence,
      };
    }

    return {
      status: 'completed',
      endpoint,
      message: 'Completed rule analysis and report generation.',
      evidence,
    };
  } catch (error) {
    return {
      status: 'failed',
      endpoint,
      message: error instanceof Error ? error.message : 'Compliance pipeline request failed.',
    };
  }
}

async function runLegacyIngest(params: OrchestrationParams): Promise<OrchestrationStage> {
  const endpoint = params.getEnvValue('DISNEY_PIPELINE_INGEST_URL');
  if (!endpoint) {
    return {
      status: 'skipped',
      message: 'Skipped because DISNEY_PIPELINE_INGEST_URL is not configured.',
    };
  }

  const payload = new FormData();
  payload.set('manifest', JSON.stringify(params.manifest));
  payload.set('submission', JSON.stringify(params.submission));
  payload.set('creative', params.creativeFile, params.originalFilename);

  try {
    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      body: payload,
    });
    const evidence = await readJsonResponse(response);

    if (!response.ok) {
      return {
        status: 'failed',
        endpoint,
        message: `Legacy ingest returned HTTP ${response.status}.`,
        evidence,
      };
    }

    return {
      status: 'completed',
      endpoint,
      message: 'Forwarded submission to legacy ingest endpoint.',
      evidence,
    };
  } catch (error) {
    return {
      status: 'failed',
      endpoint,
      message: error instanceof Error ? error.message : 'Legacy ingest request failed.',
    };
  }
}

export async function orchestrateDisneySubmission(params: OrchestrationParams) {
  const [imageMatcher, compliancePipeline, legacyIngest] = await Promise.all([
    runImageMatcher(params),
    runCompliancePipeline(params),
    runLegacyIngest(params),
  ]);

  const resultWithoutMessage = {
    submission_id: params.submissionId,
    completed_at: new Date().toISOString(),
    stages: {
      image_matcher: imageMatcher,
      compliance_pipeline: compliancePipeline,
      legacy_ingest: legacyIngest,
    },
  };
  const result: OrchestrationResult = {
    ...resultWithoutMessage,
    final_message: buildFinalMessage(resultWithoutMessage),
  };

  await Promise.all([
    writeFile(join(params.submissionDir, 'orchestration.json'), JSON.stringify(result, null, 2) + '\n', 'utf8'),
    writeFile(join(params.submissionDir, 'final-message.md'), result.final_message, 'utf8'),
  ]);

  return result;
}
