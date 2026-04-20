# Contact Lead Function

DigitalOcean Functions endpoint for website lead submissions.

Public route in App Platform:

```text
/api/leads/contact
```

Required runtime environment variables:

```text
RESEND_API_KEY=...
LEAD_EMAIL_TO=...
LEAD_EMAIL_FROM=Advanced Analytica <verified-sender@advancedanalytica.co.uk>
```

`LEAD_EMAIL_FROM` must be a sender address or domain verified in Resend. The
repo intentionally does not contain the Resend API key.

Use `RESEND_API_KEY=not-configured` only as a deployment placeholder. The
endpoint will return `email_not_configured` until a real Resend key is set.
