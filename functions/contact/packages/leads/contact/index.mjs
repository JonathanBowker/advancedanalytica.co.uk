import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { promises as dns } from "node:dns";

const MAX_LENGTHS = {
  name: 120,
  email: 180,
  company: 160,
  topic: 160,
  message: 4000,
  page: 500,
  language: 20,
  leadType: 120,
  leadName: 160,
  formId: 120,
  formLocation: 120,
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

const splitDomains = (value) =>
  String(value || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

const NON_ENGLISH_SCRIPT_PATTERN =
  /[\p{Script=Arabic}\p{Script=Armenian}\p{Script=Bengali}\p{Script=Bopomofo}\p{Script=Cyrillic}\p{Script=Devanagari}\p{Script=Ethiopic}\p{Script=Georgian}\p{Script=Greek}\p{Script=Gujarati}\p{Script=Gurmukhi}\p{Script=Han}\p{Script=Hangul}\p{Script=Hebrew}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Kannada}\p{Script=Khmer}\p{Script=Lao}\p{Script=Malayalam}\p{Script=Myanmar}\p{Script=Oriya}\p{Script=Sinhala}\p{Script=Tamil}\p{Script=Telugu}\p{Script=Thai}\p{Script=Tibetan}]/u;

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  },
  body: typeof body === "string" ? body : JSON.stringify(body),
});

const clean = (value, maxLength = 500) =>
  String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const cleanMultiline = (value, maxLength = 500) =>
  String(value || "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const parseBody = (event = {}) => {
  if (event.__ow_body) {
    const raw = event.__ow_isBase64Encoded
      ? Buffer.from(event.__ow_body, "base64").toString("utf8")
      : event.__ow_body;

    try {
      return JSON.parse(raw);
    } catch {
      return Object.fromEntries(new URLSearchParams(raw));
    }
  }

  return event;
};

const normalisePayload = (event) => {
  const body = parseBody(event);

  return {
    name: clean(body.name, MAX_LENGTHS.name),
    email: clean(body.email, MAX_LENGTHS.email).toLowerCase(),
    company: clean(body.company, MAX_LENGTHS.company),
    topic: clean(body.topic, MAX_LENGTHS.topic),
    message: cleanMultiline(body.message, MAX_LENGTHS.message),
    page: clean(body.page, MAX_LENGTHS.page),
    language: clean(body.language, MAX_LENGTHS.language).toLowerCase() || "en",
    leadType: clean(body.lead_type || body.form_type, MAX_LENGTHS.leadType),
    leadName: clean(body.lead_name || body.form_name, MAX_LENGTHS.leadName),
    formId: clean(body.form_id, MAX_LENGTHS.formId),
    formLocation: clean(body.form_location, MAX_LENGTHS.formLocation),
    website: clean(body.website, 200),
  };
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getEmailDomain = (email) => email.split("@").pop()?.toLowerCase() || "";

const isAllowedEmailDomain = async (email) => {
  const domain = getEmailDomain(email);
  if (!domain) {
    return { ok: false, reason: "missing_domain" };
  }

  const deniedDomains = new Set([
    ...FREE_EMAIL_DOMAINS,
    ...splitDomains(process.env.LEAD_EMAIL_DENIED_DOMAINS),
  ]);
  if (deniedDomains.has(domain)) {
    return { ok: false, reason: "denied_domain" };
  }

  const allowedDomains = splitDomains(process.env.LEAD_EMAIL_ALLOWED_DOMAINS);
  if (allowedDomains.length > 0) {
    const allowed = allowedDomains.some(
      (allowedDomain) =>
        domain === allowedDomain || domain.endsWith(`.${allowedDomain}`)
    );
    if (!allowed) {
      return { ok: false, reason: "not_in_allowlist" };
    }

    return { ok: true };
  }

  try {
    const records = await dns.resolveMx(domain);
    if (!records.length) {
      return { ok: false, reason: "no_mx_records" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "mx_lookup_failed" };
  }
};

const isEnglishLanguageSubmission = ({ name, company, topic, message, language }) => {
  if (language && !["en", "en-gb", "en-us"].includes(language)) return false;

  const text = [name, company, topic, message].filter(Boolean).join(" ");
  if (NON_ENGLISH_SCRIPT_PATTERN.test(text)) return false;

  return /[a-z]{2,}/i.test(text);
};

const isMissingSecret = (value) =>
  !value || value === "not-configured";

const getSenderEmailAddress = (value) => {
  const sender = String(value || "").trim();
  const displayNameMatch = sender.match(/<([^<>]+)>$/);
  return (displayNameMatch ? displayNameMatch[1] : sender).trim().toLowerCase();
};

const isValidSenderIdentity = (value) =>
  Boolean(value) && isValidEmail(getSenderEmailAddress(value));

const getLeadLabel = ({ leadName, leadType, formId }) =>
  leadName || leadType || formId || "Website Lead Form";

const buildLeadNotificationEmail = ({
  name,
  email,
  company,
  topic,
  message,
  page,
  leadName,
  leadType,
  formId,
  formLocation,
}) => {
  const rows = [
    ["Lead source", getLeadLabel({ leadName, leadType, formId })],
    ["Lead type", leadType || "Not provided"],
    ["Form location", formLocation || "Not provided"],
    ["Name", name],
    ["Email", email],
    ["Company", company || "Not provided"],
    ["Topic", topic],
    ["Page", page || "Not provided"],
  ];

  const text = [
    `New Advanced Analytica lead: ${getLeadLabel({ leadName, leadType, formId })}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5;">
      <h1 style="font-size:20px;margin:0 0 16px;">New Advanced Analytica lead: ${escapeHtml(getLeadLabel({ leadName, leadType, formId }))}</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">${htmlRows}</table>
      <h2 style="font-size:16px;margin:0 0 8px;">Message</h2>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
    </div>
  `;

  return { text, html };
};

const getSesFailureReason = (error) => {
  const code = String(error?.name || error?.Code || error?.code || "");
  const message = String(error?.message || "");
  const detail = `${code} ${message}`.toLowerCase();

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

const sendWithSes = async ({ email, to, from, replyTo, subject }) => {
  const region =
    process.env.AWS_SES_REGION || process.env.AWS_REGION || "eu-west-2";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const sessionToken = process.env.AWS_SESSION_TOKEN;

  if (
    isMissingSecret(accessKeyId) ||
    isMissingSecret(secretAccessKey) ||
    !to ||
    !from
  ) {
    console.error(
      "Missing AWS SES credentials, LEAD_EMAIL_TO, or LEAD_EMAIL_FROM"
    );
    return { ok: false, error: "email_not_configured" };
  }

  if (!isValidSenderIdentity(from)) {
    console.error("LEAD_EMAIL_FROM is not a valid sender identity");
    return { ok: false, error: "email_not_configured", reason: "invalid_from_identity" };
  }

  const client = new SESv2Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
      ...(sessionToken && !isMissingSecret(sessionToken)
        ? { sessionToken }
        : {}),
    },
  });

  try {
    await client.send(
      new SendEmailCommand({
        FromEmailAddress: from,
        Destination: {
          ToAddresses: [to],
        },
        ReplyToAddresses: replyTo ? [replyTo] : undefined,
        Content: {
          Simple: {
            Subject: {
              Data: subject,
              Charset: "UTF-8",
            },
            Body: {
              Text: {
                Data: email.text,
                Charset: "UTF-8",
              },
              Html: {
                Data: email.html,
                Charset: "UTF-8",
              },
            },
          },
        },
      })
    );

    return { ok: true };
  } catch (error) {
    const status =
      error?.$metadata?.httpStatusCode ||
      error?.$response?.statusCode ||
      500;
    console.error(
      `AWS SES error ${status}: ${error?.name || "UnknownError"} ${
        error?.message || ""
      }`
    );

    return {
      ok: false,
      error: "email_delivery_failed",
      reason: getSesFailureReason(error),
      providerStatus: status,
    };
  }
};

export async function main(event = {}) {
  const method = event.__ow_method ? String(event.__ow_method).toLowerCase() : "";

  if (method === "options") {
    return json(204, "");
  }

  if (method && method !== "post") {
    return json(405, { ok: false, error: "method_not_allowed" });
  }

  const payload = normalisePayload(event);

  // Honeypot: behave like success so bots do not learn the rule.
  if (payload.website) {
    return json(200, { ok: true });
  }

  const missing = ["name", "email", "topic", "message"].filter(
    (field) => !payload[field]
  );

  if (missing.length) {
    return json(400, { ok: false, error: "missing_fields", fields: missing });
  }

  if (!isValidEmail(payload.email)) {
    return json(400, { ok: false, error: "invalid_email" });
  }

  const emailPolicy = await isAllowedEmailDomain(payload.email);
  if (!emailPolicy.ok) {
    return json(400, {
      ok: false,
      error: "business_email_required",
      reason: emailPolicy.reason,
    });
  }

  if (!isEnglishLanguageSubmission(payload)) {
    return json(400, { ok: false, error: "english_language_required" });
  }

  const to = process.env.LEAD_EMAIL_TO;
  const from =
    process.env.LEAD_EMAIL_FROM || "";

  const email = buildLeadNotificationEmail(payload);
  const result = await sendWithSes({
    email,
    to,
    from,
    replyTo: payload.email,
    subject: `Advanced Analytica lead: ${getLeadLabel(payload)} - ${payload.topic}`,
  });

  if (!result.ok) {
    return json(200, result);
  }

  return json(200, { ok: true });
}
