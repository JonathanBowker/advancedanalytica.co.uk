import { createHash, createHmac } from "node:crypto";

const MAX_LENGTHS = {
  name: 120,
  email: 180,
  company: 160,
  topic: 160,
  message: 4000,
  page: 500,
};

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  },
  body,
});

const clean = (value, maxLength = 500) =>
  String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
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
    message: clean(body.message, MAX_LENGTHS.message),
    page: clean(body.page, MAX_LENGTHS.page),
    website: clean(body.website, 200),
  };
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isMissingSecret = (value) =>
  !value || value === "not-configured" || value.startsWith("EV[");

const buildEmail = ({ name, email, company, topic, message, page }) => {
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "Not provided"],
    ["Topic", topic],
    ["Page", page || "Not provided"],
  ];

  const text = [
    "New Advanced Analytica enquiry",
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
      <h1 style="font-size:20px;margin:0 0 16px;">New Advanced Analytica enquiry</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">${htmlRows}</table>
      <h2 style="font-size:16px;margin:0 0 8px;">Message</h2>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
    </div>
  `;

  return { text, html };
};

const hashHex = (value) =>
  createHash("sha256").update(value, "utf8").digest("hex");

const hmac = (key, value, encoding) =>
  createHmac("sha256", key).update(value, "utf8").digest(encoding);

const toAmzDate = (date) =>
  date.toISOString().replace(/[:-]|\.\d{3}/g, "");

const getSignatureKey = (secretAccessKey, dateStamp, region, service) => {
  const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, "aws4_request");
};

const signSesRequest = ({
  body,
  region,
  accessKeyId,
  secretAccessKey,
  sessionToken,
}) => {
  const service = "ses";
  const now = new Date();
  const amzDate = toAmzDate(now);
  const dateStamp = amzDate.slice(0, 8);
  const host = `email.${region}.amazonaws.com`;
  const canonicalUri = "/v2/email/outbound-emails";
  const payloadHash = hashHex(body);
  const headers = {
    "content-type": "application/json",
    host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": amzDate,
  };

  if (sessionToken && !isMissingSecret(sessionToken)) {
    headers["x-amz-security-token"] = sessionToken;
  }

  const signedHeaders = Object.keys(headers).sort().join(";");
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((key) => `${key}:${headers[key]}\n`)
    .join("");
  const canonicalRequest = [
    "POST",
    canonicalUri,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    hashHex(canonicalRequest),
  ].join("\n");
  const signingKey = getSignatureKey(
    secretAccessKey,
    dateStamp,
    region,
    service
  );
  const signature = hmac(signingKey, stringToSign, "hex");

  return {
    endpoint: `https://${host}${canonicalUri}`,
    headers: {
      ...headers,
      Authorization: [
        `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}`,
        `SignedHeaders=${signedHeaders}`,
        `Signature=${signature}`,
      ].join(", "),
    },
  };
};

const sendWithSes = async ({ payload, email, to, from }) => {
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

  const body = JSON.stringify({
    FromEmailAddress: from,
    Destination: {
      ToAddresses: [to],
    },
    ReplyToAddresses: [payload.email],
    Content: {
      Simple: {
        Subject: {
          Data: `Advanced Analytica enquiry: ${payload.topic}`,
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
  });

  const { endpoint, headers } = signSesRequest({
    body,
    region,
    accessKeyId,
    secretAccessKey,
    sessionToken,
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const response = await fetch(endpoint, {
    method: "POST",
    signal: controller.signal,
    headers,
    body,
  }).finally(() => clearTimeout(timeout));

  if (!response.ok) {
    const detail = await response.text();
    console.error(`AWS SES error ${response.status}: ${detail}`);
    return { ok: false, error: "email_delivery_failed" };
  }

  return { ok: true };
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

  const to = process.env.LEAD_EMAIL_TO;
  const from =
    process.env.LEAD_EMAIL_FROM ||
    "Advanced Analytica <jonny.bowker@advancedanalytica.co.uk>";

  const email = buildEmail(payload);
  const result = await sendWithSes({ payload, email, to, from });

  if (!result.ok) {
    return json(200, result);
  }

  return json(200, { ok: true });
}
