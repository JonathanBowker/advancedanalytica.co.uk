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
