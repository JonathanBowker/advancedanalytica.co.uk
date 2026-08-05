import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';

type SendTransactionalEmailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

function envValue(name: string) {
  return String((import.meta.env as Record<string, string | undefined>)[name] || process.env[name] || '').trim();
}

function isMissingSecret(value: string) {
  return !value || value === 'not-configured' || value === 'placeholder';
}

function emailAddressFromIdentity(value: string) {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] || value).trim();
}

function isValidEmailAddress(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isTransactionalEmailConfigured() {
  const accessKeyId = envValue('AWS_ACCESS_KEY_ID');
  const secretAccessKey = envValue('AWS_SECRET_ACCESS_KEY');
  const from = envValue('TRANSACTIONAL_EMAIL_FROM') || envValue('MAGIKIT_EMAIL_FROM') || envValue('LEAD_EMAIL_FROM');

  return (
    !isMissingSecret(accessKeyId) &&
    !isMissingSecret(secretAccessKey) &&
    Boolean(from) &&
    isValidEmailAddress(emailAddressFromIdentity(from))
  );
}

export async function sendTransactionalEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: SendTransactionalEmailOptions) {
  const accessKeyId = envValue('AWS_ACCESS_KEY_ID');
  const secretAccessKey = envValue('AWS_SECRET_ACCESS_KEY');
  const sessionToken = envValue('AWS_SESSION_TOKEN');
  const region = envValue('AWS_SES_REGION') || envValue('AWS_REGION') || 'eu-west-2';
  const from = envValue('TRANSACTIONAL_EMAIL_FROM') || envValue('MAGIKIT_EMAIL_FROM') || envValue('LEAD_EMAIL_FROM');

  if (!isTransactionalEmailConfigured()) {
    return { ok: false, error: 'email_not_configured' as const };
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
        Destination: {
          ToAddresses: [to],
        },
        ReplyToAddresses: replyTo ? [replyTo] : undefined,
        Content: {
          Simple: {
            Subject: {
              Data: subject,
              Charset: 'UTF-8',
            },
            Body: {
              Text: {
                Data: text,
                Charset: 'UTF-8',
              },
              Html: {
                Data: html,
                Charset: 'UTF-8',
              },
            },
          },
        },
      }),
    );

    return { ok: true };
  } catch (error) {
    console.error('Failed to send transactional email', error);
    return { ok: false, error: 'email_delivery_failed' as const };
  }
}
