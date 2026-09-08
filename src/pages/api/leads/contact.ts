import type { APIRoute } from "astro";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { createHmac, timingSafeEqual } from "node:crypto";
import { promises as dns } from "node:dns";

export const prerender = false;

const MIN_SUBMIT_MS = 2_000;
const MAX_URL_COUNT = 1;
const MIN_MSG_LENGTH = 15;
const MAX_FIELD_LENGTH = 4_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 6;
const RATE_LIMIT_MIN_INTERVAL_MS = 30 * 1000;
const FORM_TOKEN_TTL_MS = 10 * 60 * 1000;

const MAX_LENGTHS = {
  name: 120,
  email: 180,
  company: 160,
  role: 120,
  topic: 160,
  message: 4000,
  page: 500,
  language: 20,
  leadType: 120,
  leadName: 160,
  formId: 120,
  formLocation: 120,
  materials: 500,
  aiTouchpoints: 500,
  biggestConcern: 120,
  preferredNextStep: 120,
  startedAt: 32,
  fingerprint: 128,
  formToken: 2048,
  turnstileToken: 2048,
};

const FREE_EMAIL_DOMAINS = new Set([
  "aol.com",
  "fastmail.com",
  "gmail.com",
  "googlemail.com",
  "gmx.com",
  "gmx.co.uk",
  "hey.com",
  "hotmail.co.uk",
  "hotmail.com",
  "icloud.com",
  "live.co.uk",
  "live.com",
  "mac.com",
  "mail.com",
  "me.com",
  "msn.com",
  "outlook.com",
  "pm.me",
  "proton.me",
  "protonmail.com",
  "qq.com",
  "tutanota.com",
  "yahoo.co.uk",
  "yahoo.com",
  "yandex.com",
  "yandex.ru",
  "zoho.com",
  "163.com",
  "126.com",
]);

const NON_ENGLISH_SCRIPT_PATTERN =
  /[\p{Script=Arabic}\p{Script=Armenian}\p{Script=Bengali}\p{Script=Bopomofo}\p{Script=Cyrillic}\p{Script=Devanagari}\p{Script=Ethiopic}\p{Script=Georgian}\p{Script=Greek}\p{Script=Gujarati}\p{Script=Gurmukhi}\p{Script=Han}\p{Script=Hangul}\p{Script=Hebrew}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Kannada}\p{Script=Khmer}\p{Script=Lao}\p{Script=Malayalam}\p{Script=Myanmar}\p{Script=Oriya}\p{Script=Sinhala}\p{Script=Tamil}\p{Script=Telugu}\p{Script=Thai}\p{Script=Tibetan}]/u;
const NON_ENGLISH_LATIN_DIACRITICS =
  /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿāăąćĉčďđēĕėęěĝğġģĥħĩīĭįıĵķĺļľłńņňŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżžƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏ]/gi;
const URL_PATTERN = /(?:https?:\/\/|ftp:\/\/|www\.)\S+/gi;
const REPETITION_PATTERN = /\b(\w{3,})\b(?:[\s,;.!?]+\1\b){4,}/i;
const SPAM_PHRASE_PATTERN =
  /\b(?:seo\b|search engine optim|rank(?:ing)? on google|backlink|link.?build|digital marketing agency|guaranteed (?:results?|traffic|rankings?|leads?)|buy (?:traffic|followers|backlinks?|reviews?)|(?:casino|poker|slot machine|sports? betting|online gambling)|(?:crypto(?:currency)?|bitcoin|forex|binary options?) invest|(?:viagra|cialis|levitra|sildenafil|online pharmacy)|(?:loan|mortgage|credit(?: card)?) (?:offer|approv)|urgent (?:business|investment) (?:proposal|opportunity)|work from home|make money online)\b/i;

type Payload = ReturnType<typeof normalisePayload>;

const submissionAttempts = new Map<string, number[]>();

const env = (name: string) =>
  String(import.meta.env[name] ?? process.env[name] ?? "").trim();

const json = (body: unknown, status = 200) =>
  new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

const clean = (value: unknown, maxLength = 500) =>
  String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const cleanMultiline = (value: unknown, maxLength = 500) =>
  String(value || "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);

const cleanList = (value: unknown, maxLength = 500) => {
  const entries = Array.isArray(value) ? value : String(value || "").split(",");
  return entries
    .map((entry) => clean(entry, maxLength))
    .filter(Boolean)
    .join(", ")
    .slice(0, maxLength);
};

const escapeHtml = (value: unknown) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const splitDomains = (value: unknown) =>
  String(value || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

const parseBody = async (request: Request) => {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await request.json().catch(() => ({}))) as Record<string, unknown>;
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData().catch(() => new FormData());
    return Object.fromEntries(form.entries());
  }

  const raw = await request.text().catch(() => "");
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return Object.fromEntries(new URLSearchParams(raw));
  }
};

const normalisePayload = (body: Record<string, unknown>) => ({
  name: clean(body.name, MAX_LENGTHS.name),
  email: clean(body.email, MAX_LENGTHS.email).toLowerCase(),
  company: clean(body.company, MAX_LENGTHS.company),
  role: clean(body.role, MAX_LENGTHS.role),
  topic: clean(body.topic, MAX_LENGTHS.topic),
  message: cleanMultiline(body.message, MAX_LENGTHS.message),
  page: clean(body.page, MAX_LENGTHS.page),
  language: clean(body.language, MAX_LENGTHS.language).toLowerCase() || "en",
  leadType: clean(body.lead_type || body.form_type, MAX_LENGTHS.leadType),
  leadName: clean(body.lead_name || body.form_name, MAX_LENGTHS.leadName),
  formId: clean(body.form_id, MAX_LENGTHS.formId),
  formLocation: clean(body.form_location, MAX_LENGTHS.formLocation),
  materials: cleanList(body.materials, MAX_LENGTHS.materials),
  aiTouchpoints: cleanList(body.ai_touchpoints, MAX_LENGTHS.aiTouchpoints),
  biggestConcern: clean(body.biggest_concern, MAX_LENGTHS.biggestConcern),
  preferredNextStep: clean(
    body.preferred_next_step,
    MAX_LENGTHS.preferredNextStep,
  ),
  startedAt: clean(body._started_at, MAX_LENGTHS.startedAt),
  fingerprint: clean(body._fingerprint, MAX_LENGTHS.fingerprint),
  formToken: clean(body._form_token, MAX_LENGTHS.formToken),
  turnstileToken: clean(body._turnstile_token, MAX_LENGTHS.turnstileToken),
  website: clean(body.website, 200),
});

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const getEmailDomain = (email: string) => email.split("@").pop()?.toLowerCase() || "";

const hasSignificantNonEnglishLatin = (text: string) => {
  const diacriticCount = (text.match(NON_ENGLISH_LATIN_DIACRITICS) || []).length;
  const letterCount = (text.match(/[a-zA-Z\u00C0-\u024F]/g) || []).length;
  if (letterCount < 8) return false;
  return diacriticCount / letterCount > 0.06;
};

const isAllowedEmailDomain = async (email: string) => {
  const domain = getEmailDomain(email);
  if (!domain) return { ok: false, reason: "missing_domain" };

  const deniedDomains = new Set([
    ...FREE_EMAIL_DOMAINS,
    ...splitDomains(env("LEAD_EMAIL_DENIED_DOMAINS")),
  ]);
  if (deniedDomains.has(domain)) return { ok: false, reason: "denied_domain" };

  const allowedDomains = splitDomains(env("LEAD_EMAIL_ALLOWED_DOMAINS"));
  if (allowedDomains.length > 0) {
    const allowed = allowedDomains.some(
      (allowedDomain) =>
        domain === allowedDomain || domain.endsWith(`.${allowedDomain}`),
    );
    return allowed ? { ok: true } : { ok: false, reason: "not_in_allowlist" };
  }

  try {
    const records = await dns.resolveMx(domain);
    return records.length ? { ok: true } : { ok: false, reason: "no_mx_records" };
  } catch {
    return { ok: false, reason: "mx_lookup_failed" };
  }
};

const isEnglishLanguageSubmission = ({
  name,
  company,
  topic,
  message,
  language,
}: Payload) => {
  if (language && !["en", "en-gb", "en-us"].includes(language)) return false;
  const text = [name, company, topic, message].filter(Boolean).join(" ");
  if (NON_ENGLISH_SCRIPT_PATTERN.test(text)) return false;
  if (hasSignificantNonEnglishLatin(text)) return false;
  return /[a-z]{2,}/i.test(text);
};

const hasTooManyUrls = (payload: Payload) => {
  const text = [
    payload.name,
    payload.company,
    payload.role,
    payload.topic,
    payload.message,
    payload.materials,
    payload.aiTouchpoints,
    payload.biggestConcern,
    payload.preferredNextStep,
  ]
    .filter(Boolean)
    .join(" ");
  return (text.match(URL_PATTERN)?.length ?? 0) > MAX_URL_COUNT;
};

const getInvalidContentReason = (payload: Payload) => {
  if (payload.message && payload.message.length < MIN_MSG_LENGTH) {
    return "too_short";
  }

  for (const value of [
    payload.name,
    payload.email,
    payload.company,
    payload.role,
    payload.topic,
    payload.message,
    payload.page,
    payload.materials,
    payload.aiTouchpoints,
    payload.biggestConcern,
    payload.preferredNextStep,
  ]) {
    if (String(value || "").length > MAX_FIELD_LENGTH) return "too_long";
  }

  const combined = [
    payload.name,
    payload.company,
    payload.role,
    payload.topic,
    payload.message,
    payload.materials,
    payload.aiTouchpoints,
    payload.biggestConcern,
    payload.preferredNextStep,
  ]
    .filter(Boolean)
    .join(" ");

  return REPETITION_PATTERN.test(combined) ? "repetitive" : null;
};

const hasSpamPhrases = (payload: Payload) =>
  SPAM_PHRASE_PATTERN.test(
    [
      payload.name,
      payload.company,
      payload.role,
      payload.topic,
      payload.message,
      payload.materials,
      payload.aiTouchpoints,
      payload.biggestConcern,
      payload.preferredNextStep,
    ]
      .filter(Boolean)
      .join(" "),
  );

const normaliseOrigin = (value: string) => {
  const origin = value.trim().toLowerCase();
  if (!origin) return "";

  try {
    return new URL(origin).origin.toLowerCase();
  } catch {
    return origin.replace(/\/+$/g, "");
  }
};

const getRequestOrigin = (request: Request, payload?: Partial<Payload>) =>
  normaliseOrigin(
    String(
      request.headers.get("origin") ||
        request.headers.get("referer") ||
        payload?.page ||
        "",
    ),
  );

const getClientIp = (request: Request) =>
  request.headers.get("cf-connecting-ip") ||
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "";

const isAllowedOrigin = (request: Request, payload?: Partial<Payload>) => {
  const allowedOrigins = splitDomains(env("LEAD_ALLOWED_ORIGINS"));
  if (!allowedOrigins.length) return true;
  const origin = getRequestOrigin(request, payload);
  return allowedOrigins.some((allowedOrigin) => origin.startsWith(allowedOrigin));
};

const toBase64Url = (value: string | Uint8Array) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromBase64Url = (value: string) => {
  const normalised = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalised.length % 4;
  const suffix = padding ? "=".repeat(4 - padding) : "";
  return Uint8Array.from(Buffer.from(`${normalised}${suffix}`, "base64"));
};

const getFormTokenSecret = () =>
  env("LEAD_FORM_TOKEN_SECRET") || env("TURNSTILE_SECRET_KEY");

const signTokenPayload = (payload: string) =>
  Uint8Array.from(createHmac("sha256", getFormTokenSecret()).update(payload).digest());

const buildFormToken = ({
  formId,
  origin,
  fingerprint,
}: {
  formId: string;
  origin: string;
  fingerprint: string;
}) => {
  if (!getFormTokenSecret()) return "";

  const payload = JSON.stringify({
    exp: Date.now() + FORM_TOKEN_TTL_MS,
    formId: clean(formId, MAX_LENGTHS.formId) || "lead_form",
    origin: clean(origin, MAX_LENGTHS.page).toLowerCase(),
    fingerprint: clean(fingerprint, MAX_LENGTHS.fingerprint),
  });

  const encodedPayload = toBase64Url(payload);
  const signature = toBase64Url(signTokenPayload(encodedPayload));
  return `${encodedPayload}.${signature}`;
};

const verifyFormToken = ({
  token,
  formId,
  origin,
  fingerprint,
}: {
  token: string;
  formId: string;
  origin: string;
  fingerprint: string;
}) => {
  if (!getFormTokenSecret()) return true;
  if (!token) return false;

  const [encodedPayload, encodedSignature] = token.split(".");
  if (!encodedPayload || !encodedSignature) return false;

  const expectedSignature = signTokenPayload(encodedPayload);
  const actualSignature = fromBase64Url(encodedSignature);

  if (expectedSignature.length !== actualSignature.length) return false;
  if (!timingSafeEqual(expectedSignature, actualSignature)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(fromBase64Url(encodedPayload)).toString("utf8"));
    if (!decoded?.exp || Date.now() > Number(decoded.exp)) return false;
    if ((decoded.formId || "lead_form") !== (formId || "lead_form")) return false;
    if ((decoded.origin || "") !== String(origin || "").toLowerCase()) return false;
    if ((decoded.fingerprint || "") !== String(fingerprint || "")) return false;
    return true;
  } catch {
    return false;
  }
};

const verifyTurnstile = async (token: string, remoteIp: string) => {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) return true;
  if (!token) return false;

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: remoteIp || undefined,
        }),
      },
    );
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
};

const getRecentAttempts = (key: string) => {
  const now = Date.now();
  return (submissionAttempts.get(key) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
};

const canRegisterSubmissionAttempt = (key: string) => {
  const now = Date.now();
  const recentAttempts = getRecentAttempts(key);
  const lastAttempt = recentAttempts[recentAttempts.length - 1];

  if (lastAttempt && now - lastAttempt < RATE_LIMIT_MIN_INTERVAL_MS) return false;
  return recentAttempts.length < RATE_LIMIT_MAX_ATTEMPTS;
};

const registerSubmissionAttempts = (keys: string[]) => {
  const uniqueKeys = [...new Set(keys.filter(Boolean))];
  if (!uniqueKeys.every(canRegisterSubmissionAttempt)) return false;

  const now = Date.now();
  uniqueKeys.forEach((key) => {
    const recentAttempts = getRecentAttempts(key);
    recentAttempts.push(now);
    submissionAttempts.set(key, recentAttempts);
  });
  return true;
};

const getRateLimitKeys = (payload: Payload, clientIp: string) => [
  clientIp ? `ip:${clientIp}` : "",
  payload.fingerprint ? `fp:${payload.fingerprint}` : "",
  payload.email ? `email:${payload.email}` : "",
];

const isAssessmentSubmission = (payload: Payload) =>
  payload.formId === "assessment-form-main" ||
  payload.leadType === "brand_ai_drift_audit" ||
  payload.leadType === "brand_ai_readiness_assessment" ||
  payload.topic === "AI Drift Audit" ||
  payload.topic === "Brand AI Readiness Assessment";

const getLeadLabel = ({ leadName, leadType, formId }: Payload) =>
  leadName || leadType || formId || "Website Lead Form";

const formatMessageHtml = (message: string) =>
  message
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '<div style="height:12px;"></div>';
      return `<div style="margin:0 0 8px;">${escapeHtml(trimmed)}</div>`;
    })
    .join("");

const buildLeadNotificationEmail = (payload: Payload) => {
  const rows = [
    ["Lead source", getLeadLabel(payload)],
    ["Lead type", payload.leadType || "Not provided"],
    ["Form location", payload.formLocation || "Not provided"],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company || "Not provided"],
    ["Role", payload.role || "Not provided"],
    ["Topic", payload.topic],
    ["Materials", payload.materials || "Not provided"],
    ["AI touchpoints", payload.aiTouchpoints || "Not provided"],
    ["Biggest concern", payload.biggestConcern || "Not provided"],
    ["Preferred next step", payload.preferredNextStep || "Not provided"],
    ["Page", payload.page || "Not provided"],
  ];

  const text = [
    `New Advanced Analytica lead: ${getLeadLabel(payload)}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5;">
      <h1 style="font-size:20px;margin:0 0 16px;">New Advanced Analytica lead: ${escapeHtml(getLeadLabel(payload))}</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">${htmlRows}</table>
      <h2 style="font-size:16px;margin:0 0 8px;">Message</h2>
      <div>${formatMessageHtml(payload.message)}</div>
    </div>
  `;

  return { text, html };
};

const isMissingSecret = (value: string) => !value || value === "not-configured";
const getSenderEmailAddress = (value: string) => {
  const displayNameMatch = value.match(/<([^<>]+)>$/);
  return (displayNameMatch ? displayNameMatch[1] : value).trim().toLowerCase();
};
const isValidSenderIdentity = (value: string) =>
  Boolean(value) && isValidEmail(getSenderEmailAddress(value));

const getSesFailureReason = (error: unknown) => {
  const err = error as {
    name?: string;
    Code?: string;
    code?: string;
    message?: string;
  };
  const detail = `${err?.name || err?.Code || err?.code || ""} ${
    err?.message || ""
  }`.toLowerCase();

  if (detail.includes("messagerejected")) return "ses_message_rejected";
  if (detail.includes("accessdenied") || detail.includes("not authorized")) {
    return "ses_access_denied";
  }
  if (
    detail.includes("signature") ||
    detail.includes("security token") ||
    detail.includes("invalidclienttoken") ||
    detail.includes("unrecognizedclient")
  ) {
    return "ses_credentials_invalid";
  }
  return "ses_delivery_failed";
};

const sendWithSes = async ({
  email,
  to,
  from,
  replyTo,
  subject,
}: {
  email: { text: string; html: string };
  to: string;
  from: string;
  replyTo: string;
  subject: string;
}) => {
  const region = env("AWS_SES_REGION") || env("AWS_REGION") || "eu-west-2";
  const accessKeyId = env("AWS_ACCESS_KEY_ID");
  const secretAccessKey = env("AWS_SECRET_ACCESS_KEY");
  const sessionToken = env("AWS_SESSION_TOKEN");

  if (
    isMissingSecret(accessKeyId) ||
    isMissingSecret(secretAccessKey) ||
    !to ||
    !from
  ) {
    console.error("Missing AWS SES credentials, LEAD_EMAIL_TO, or LEAD_EMAIL_FROM");
    return { ok: false, error: "email_not_configured" };
  }

  if (!isValidSenderIdentity(from)) {
    console.error("LEAD_EMAIL_FROM is not a valid sender identity");
    return {
      ok: false,
      error: "email_not_configured",
      reason: "invalid_from_identity",
    };
  }

  const client = new SESv2Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
      ...(sessionToken && !isMissingSecret(sessionToken) ? { sessionToken } : {}),
    },
  });

  try {
    await client.send(
      new SendEmailCommand({
        FromEmailAddress: from,
        Destination: { ToAddresses: [to] },
        ReplyToAddresses: replyTo ? [replyTo] : undefined,
        Content: {
          Simple: {
            Subject: { Data: subject, Charset: "UTF-8" },
            Body: {
              Text: { Data: email.text, Charset: "UTF-8" },
              Html: { Data: email.html, Charset: "UTF-8" },
            },
          },
        },
      }),
    );

    return { ok: true };
  } catch (error) {
    const err = error as {
      $metadata?: { httpStatusCode?: number };
      $response?: { statusCode?: number };
      name?: string;
      message?: string;
    };
    const status = err?.$metadata?.httpStatusCode || err?.$response?.statusCode || 500;
    console.error(
      `AWS SES error ${status}: ${err?.name || "UnknownError"} ${
        err?.message || ""
      }`,
    );

    return {
      ok: false,
      error: "email_delivery_failed",
      reason: getSesFailureReason(error),
      providerStatus: status,
    };
  }
};

export const GET: APIRoute = async ({ request, url }) => {
  const payload = {
    formId: clean(url.searchParams.get("form_id"), MAX_LENGTHS.formId),
    page: clean(url.searchParams.get("page"), MAX_LENGTHS.page),
    fingerprint: clean(url.searchParams.get("fingerprint"), MAX_LENGTHS.fingerprint),
  };

  if (!isAllowedOrigin(request, payload)) {
    return json({ ok: false, error: "origin_not_allowed" }, 403);
  }

  const formToken = buildFormToken({
    formId: payload.formId,
    origin: getRequestOrigin(request, payload),
    fingerprint: payload.fingerprint,
  });

  return json({
    ok: true,
    form_token: formToken,
    token: formToken,
    expires_in_ms: FORM_TOKEN_TTL_MS,
  });
};

export const OPTIONS: APIRoute = async () => json("", 204);

export const POST: APIRoute = async ({ request }) => {
  const payload = normalisePayload(await parseBody(request));
  const clientIp = getClientIp(request);

  if (payload.website) return json({ ok: true });

  if (!isAllowedOrigin(request, payload)) {
    return json({ ok: false, error: "origin_not_allowed" }, 403);
  }

  if (!registerSubmissionAttempts(getRateLimitKeys(payload, clientIp))) {
    return json(
      { ok: false, error: "rate_limited", reason: "too_many_attempts" },
      429,
    );
  }

  const missing = ["name", "email", "topic", "message"].filter(
    (field) => !payload[field as keyof Payload],
  );

  if (isAssessmentSubmission(payload)) {
    missing.push(
      ...[
        "company",
        "role",
        "materials",
        "aiTouchpoints",
        "biggestConcern",
        "preferredNextStep",
      ].filter((field) => !payload[field as keyof Payload]),
    );
  }

  if (missing.length) {
    return json(
      { ok: false, error: "missing_fields", fields: [...new Set(missing)] },
      400,
    );
  }

  if (!isValidEmail(payload.email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  const startedAt = Number.parseInt(payload.startedAt, 10);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_SUBMIT_MS) {
    return json({ ok: false, error: "submitted_too_fast" }, 400);
  }

  const emailPolicy = await isAllowedEmailDomain(payload.email);
  if (!emailPolicy.ok) {
    if (
      emailPolicy.reason === "no_mx_records" ||
      emailPolicy.reason === "mx_lookup_failed"
    ) {
      return json(
        {
          ok: false,
          error: "email_mx_lookup_failed",
          reason: emailPolicy.reason,
        },
        400,
      );
    }

    return json(
      {
        ok: false,
        error: "business_email_required",
        reason: emailPolicy.reason,
      },
      400,
    );
  }

  if (!isEnglishLanguageSubmission(payload)) {
    return json({ ok: false, error: "english_language_required" }, 400);
  }

  if (hasTooManyUrls(payload)) return json({ ok: false, error: "url_spam" }, 400);

  const invalidContentReason = getInvalidContentReason(payload);
  if (invalidContentReason) {
    return json(
      { ok: false, error: "invalid_content", reason: invalidContentReason },
      400,
    );
  }

  if (hasSpamPhrases(payload)) {
    return json({ ok: false, error: "spam_detected" }, 400);
  }

  if (!(await verifyTurnstile(payload.turnstileToken, clientIp))) {
    return json({ ok: false, error: "turnstile_failed" }, 400);
  }

  if (
    !verifyFormToken({
      token: payload.formToken,
      formId: payload.formId,
      origin: getRequestOrigin(request, payload),
      fingerprint: payload.fingerprint,
    })
  ) {
    return json({ ok: false, error: "form_token_invalid" }, 400);
  }

  const result = await sendWithSes({
    email: buildLeadNotificationEmail(payload),
    to: env("LEAD_EMAIL_TO"),
    from: env("LEAD_EMAIL_FROM"),
    replyTo: payload.email,
    subject: `Advanced Analytica lead: ${getLeadLabel(payload)} - ${payload.topic}`,
  });

  if (!result.ok) return json(result);
  return json({ ok: true });
};
