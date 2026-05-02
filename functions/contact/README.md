# Contact Lead Function

DigitalOcean Functions endpoint for website lead submissions.

Public route in App Platform:

```text
/api/leads/contact
```

Required runtime environment variables:

```text
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_SES_REGION=eu-west-2
LEAD_EMAIL_TO=...
LEAD_EMAIL_FROM=Advanced Analytica <verified-sender@advancedanalytica.co.uk>
```

Optional email-policy overrides:

```text
LEAD_EMAIL_ALLOWED_DOMAINS=yourcompany.com,clientdomain.co.uk
LEAD_EMAIL_DENIED_DOMAINS=tempmail.com
```

If `LEAD_EMAIL_ALLOWED_DOMAINS` is set, the function only accepts those
domains and their subdomains. If it is not set, the function still blocks the
known consumer-mail domains in the built-in deny list and requires the email
domain to have MX records.

`LEAD_EMAIL_FROM` must contain a sender email address verified in Amazon SES in
the same region as `AWS_SES_REGION`. It may be a raw address or a display-name
formatted string. If using a display name, the email address inside angle
brackets must be the verified SES sender identity. The repo intentionally does
not contain AWS credentials.

Use `AWS_ACCESS_KEY_ID=not-configured` and
`AWS_SECRET_ACCESS_KEY=not-configured` only as deployment placeholders. The
endpoint will return `email_not_configured` until real AWS SES credentials are
set. If the SES account is still in sandbox mode, both sender and recipient
addresses must be verified in SES.

On successful submissions, the function sends one SES email:

- An internal lead notification to `LEAD_EMAIL_TO`, with reply-to set to the lead.

The function does not send a confirmation email to the sender.
