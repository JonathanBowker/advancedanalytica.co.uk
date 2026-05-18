# Supabase Auth Email Deliverability

This site uses Supabase Auth for magic-link sign-in and password recovery. The
application code expects the auth callback flow to land on:

- `https://advancedanalytica.co.uk/auth/callback?next=/portal`
- `https://advancedanalytica.co.uk/auth/callback?next=/auth/reset`

To keep those emails out of junk, use a dedicated auth sender over custom SMTP
instead of Supabase's default shared sender.

## Target Setup

- Sending provider: Amazon SES
- Sending region: `eu-west-2`
- Auth sending subdomain: `auth.advancedanalytica.co.uk`
- From address: `no-reply@auth.advancedanalytica.co.uk`
- Display name: `Advanced Analytica`
- Supabase `Site URL`: `https://advancedanalytica.co.uk`

Keep auth mail separate from contact/marketing mail. That gives better
reputation isolation and makes DMARC alignment easier to reason about.

## Supabase Auth Configuration

In Supabase `Authentication -> URL Configuration`:

- `Site URL`
  - `https://advancedanalytica.co.uk`
- `Redirect URLs`
  - `https://advancedanalytica.co.uk/auth/callback`
  - `https://advancedanalytica.co.uk/auth/callback?next=/portal`
  - `https://advancedanalytica.co.uk/auth/callback?next=/auth/reset`
  - `http://localhost:4321/auth/callback`
  - `http://localhost:4321/auth/callback?next=/portal`
  - `http://localhost:4321/auth/callback?next=/auth/reset`

In Supabase `Authentication -> SMTP Settings`:

- Enable custom SMTP
- Host: SES SMTP endpoint for `eu-west-2`
- Port: `587`
- Username: SES SMTP username
- Password: SES SMTP password
- Sender name: `Advanced Analytica`
- Sender email: `no-reply@auth.advancedanalytica.co.uk`

Do not reuse the old Vite app URL or any `/index.html` path in Supabase.

## SES DNS Records

SES will give you the exact record values. Publish all of them before switching
Supabase SMTP to production use.

### 1. Verify the Sending Identity

Create an SES identity for:

- `auth.advancedanalytica.co.uk`

Publish the verification record SES gives you.

### 2. Easy DKIM

Enable Easy DKIM on the SES identity and publish the three CNAME records SES
returns.

They will look like:

```text
<token1>._domainkey.auth.advancedanalytica.co.uk CNAME <value1>
<token2>._domainkey.auth.advancedanalytica.co.uk CNAME <value2>
<token3>._domainkey.auth.advancedanalytica.co.uk CNAME <value3>
```

### 3. Custom MAIL FROM

Set the SES custom MAIL FROM domain to:

- `bounce.auth.advancedanalytica.co.uk`

Publish the SES-generated records for that MAIL FROM domain. They will include:

```text
bounce.auth.advancedanalytica.co.uk MX 10 feedback-smtp.eu-west-2.amazonses.com
bounce.auth.advancedanalytica.co.uk TXT "v=spf1 include:amazonses.com -all"
```

### 4. DMARC

Publish a DMARC policy for the auth subdomain:

```text
_dmarc.auth.advancedanalytica.co.uk TXT "v=DMARC1; p=quarantine; adkim=s; aspf=s; pct=100; rua=mailto:dmarc@advancedanalytica.co.uk"
```

If you already manage DMARC centrally at the apex domain, keep the policy
consistent with that governance.

### 5. Apex SPF

The auth mail should align through the SES MAIL FROM domain. Do not stack
multiple SPF TXT records on the same hostname.

## Recommended Supabase Email Templates

Use the checked-in templates in this repo:

- [Magic link template](./templates/applications/supabase-magic-link-email.html)
- [Reset password template](./templates/applications/supabase-reset-password-email.html)

Those templates use the callback-based SSR flow the site expects:

- magic link
  - `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&next=/portal`
- password reset
  - `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=recovery&next=/auth/reset`

## Operational Checks

Before going live:

1. Verify the SES identity is out of `Pending`.
2. Verify DKIM is `Success`.
3. Verify MAIL FROM is `Success`.
4. Send test mail to Gmail and Outlook.
5. Inspect headers and confirm:
   - `spf=pass`
   - `dkim=pass`
   - `dmarc=pass`
6. Confirm the clicked link lands on `/portal` for magic links.
7. Confirm the reset link lands on `/auth/reset`.

## Anti-Junk Guidelines

- Keep auth emails transactional and short.
- Use one primary CTA only.
- Avoid link shorteners.
- Prefer a hosted PNG logo in email if any client strips the SVG.
- If one-time links are being burned by mail scanners, switch from magic links
  to email OTP codes.
