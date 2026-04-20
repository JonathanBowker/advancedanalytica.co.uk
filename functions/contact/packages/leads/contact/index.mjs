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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from =
    process.env.LEAD_EMAIL_FROM ||
    "Advanced Analytica <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or LEAD_EMAIL_TO");
    return json(503, { ok: false, error: "email_not_configured" });
  }

  const email = buildEmail(payload);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Advanced Analytica enquiry: ${payload.topic}`,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error(`Resend error ${response.status}: ${detail}`);
    return json(502, { ok: false, error: "email_delivery_failed" });
  }

  return json(200, { ok: true });
}
