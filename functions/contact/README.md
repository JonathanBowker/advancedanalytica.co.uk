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

`LEAD_EMAIL_FROM` must be a sender address or domain verified in Amazon SES in
the same region as `AWS_SES_REGION`. The repo intentionally does not contain AWS
credentials.

Use `AWS_ACCESS_KEY_ID=not-configured` and
`AWS_SECRET_ACCESS_KEY=not-configured` only as deployment placeholders. The
endpoint will return `email_not_configured` until real AWS SES credentials are
set. If the SES account is still in sandbox mode, both sender and recipient
addresses must be verified in SES.
