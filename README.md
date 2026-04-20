# Advanced Analytica

**Advanced Analytica is a Centre of Excellence for brand data management, helping businesses implement and optimise AI management through structured brand data, governance, and standards.**

This repository powers [advancedanalytica.co.uk](https://advancedanalytica.co.uk), providing tools, frameworks, and resources to help organisations make their brand meaning and identity machine-readable, discoverable, and actionable in AI systems.

## 🚀 What’s Inside?

- **Brando Schema**: An extension of Schema.org for representing brand meaning, associations, and governance as linked data.
- **Guides & Resources**: Documentation and best practices for structuring, managing, and governing brand data in the AI era.
- **Reference Implementations**: Sample data sets, templates, and code for building brand knowledge graphs and deploying brand-linked data.
- **Tools & Utilities**: Scripts for mapping, validating, and operationalising brand semantics.

## 🌐 Why Advanced Analytica?

As AI becomes central to business, structured brand data is essential for:
- Consistent brand governance and compliance (ISO 42001-ready)
- Discoverability and accurate brand representation in AI and digital platforms
- Seamless adaptation across markets and channels
- Enabling new, AI-driven brand experiences

## Commands

```sh
pnpm install
pnpm dev
pnpm build
```

## Deployment (DigitalOcean)

- Build command: `pnpm build`
- Output directory: `dist/`

## Analytics

Google Analytics is consent-gated and only loads when `PUBLIC_GA_MEASUREMENT_ID`
is set to a GA4 measurement ID such as `G-XXXXXXXXXX`.

### GA4 Reporting

The repo includes a local GA4 Data API report command:

```sh
pnpm ga:report
```

Set these values in `.env.local` first:

```sh
GA4_PROPERTY_ID=123456789
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/google-service-account.json
```

The Google service account email must have at least Viewer access to the GA4
property, and the Google Analytics Data API must be enabled in the linked Google
Cloud project.

The report writes local, ignored output to:

```text
.reports/ga4/latest.json
.reports/ga4/latest.md
```

Useful options:

```sh
pnpm ga:report -- --start=7daysAgo --end=today
pnpm ga:report -- --property=123456789 --start=2026-04-01 --end=2026-04-20
```

**Learn more or join the community at [advancedanalytica.co.uk](https://advancedanalytica.co.uk).**
