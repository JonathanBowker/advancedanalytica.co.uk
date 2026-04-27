import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";

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
  body: typeof body === "string" ? body : JSON.stringify(body),
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

const buildLeadNotificationEmail = ({ name, email, company, topic, message, page }) => {
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

const buildLeadConfirmationEmail = ({ name, topic }) => {
  const firstName = name.split(" ")[0] || "there";
  const text = [
    `Hello ${firstName},`,
    "",
    "Thank you. Your enquiry has been sent.",
    "",
    `We have received your message about: ${topic}`,
    "",
    "We will review it and get back to you as soon as we can.",
    "",
    "If you need to add anything, reply to this email.",
    "",
    "Advanced Analytica",
    "https://advancedanalytica.co.uk/",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
      <h1 style="font-size:22px;margin:0 0 16px;">Thank you. Your enquiry has been sent.</h1>
      <p style="margin:0 0 12px;">Hello ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 12px;">We have received your message about: <strong>${escapeHtml(topic)}</strong></p>
      <p style="margin:0 0 12px;">We will review it and get back to you as soon as we can.</p>
      <p style="margin:0 0 20px;">If you need to add anything, reply to this email.</p>
      <p style="margin:0;font-weight:700;">Advanced Analytica</p>
      <p style="margin:0;"><a href="https://advancedanalytica.co.uk/" style="color:#111827;">advancedanalytica.co.uk</a></p>
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

  const to = process.env.LEAD_EMAIL_TO;
  const from =
    process.env.LEAD_EMAIL_FROM ||
    "Advanced Analytica <jonny.bowker@advancedanalytica.co.uk>";

  const email = buildLeadNotificationEmail(payload);
  const result = await sendWithSes({
    email,
    to,
    from,
    replyTo: payload.email,
    subject: `Advanced Analytica enquiry: ${payload.topic}`,
  });

  if (!result.ok) {
    return json(200, result);
  }

  const confirmationEmail = buildLeadConfirmationEmail(payload);
  const confirmation = await sendWithSes({
    email: confirmationEmail,
    to: payload.email,
    from,
    replyTo: to,
    subject: "Thank you for contacting Advanced Analytica",
  });

  if (!confirmation.ok) {
    console.error("Lead confirmation email failed after enquiry was received");
  }

  return json(200, { ok: true, confirmationSent: confirmation.ok });
}
