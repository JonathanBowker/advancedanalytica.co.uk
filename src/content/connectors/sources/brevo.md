---
generated_record: true
connector_name: Brevo
connector_type: source
connector_slug: brevo
connector_directory: source-brevo
definition_id: e2276f19-1c19-4d4e-ae6c-7df3c9c4ad49
version: 0.2.54
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/brevo
logo: /images/connectors/sources/brevo.svg
logo_source_path: airbyte-integrations/connectors/source-brevo/icon.svg
logo_sha256: 8dfc0aa77a10c9020d3aab6e5c5c9e04796a71cf5621faa0f695178e65ddec0e
original_metadata_path: airbyte-integrations/connectors/source-brevo/metadata.yaml
original_metadata_sha256: 294ab769a213709570e7d40fc4030e2a1f03e01cbe74136dad63654ec9a78a00
original_document_path: docs/integrations/sources/brevo.md
original_document_sha256: 65b5d7cc5a242f1d502fc95b6fb7afb34d430ba95b8ce96db2d46d739b392fa6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: da1452a164681f0be55f200afe0f4b5cda79329ba4348749776f78cf9aafa3d7
rewritten_at: 2026-11-12T13:32:29.568773+00:00
---

# Brevo

Use this page to set up the [Brevo](https://www.brevo.com/) source connector and find reference information.

Brevo, formerly Sendinblue, is a marketing platform for email, SMS, CRM and automation. This connector syncs contacts, companies, deals, campaigns and related metadata from the [Brevo API](https://developers.brevo.com/reference/getting-started-1).

## Prerequisites

- A Brevo account. Visit [Sign up](https://onboarding.brevo.com/account/register) if you don't have one.
- A user with the **API keys** permission. Only users with this permission can view or create API keys. See [User permissions and permission levels in Brevo](https://help.brevo.com/hc/en-us/articles/360001096239) for details.
- A Brevo API key, which you'll generate in the next step.

## Generate an API key

1. Sign in to Brevo and open the [API Keys & MCP](https://app.brevo.com/settings/keys/api) page.
2. Under the **API keys** tab, select **Generate a new API key**.
3. Enter a descriptive name, such as `Airbyte`, and select **Generate**.
4. Copy the key and store it securely. Brevo displays it only once. If you lose it, generate a new one.

For more information, see Brevo's [Create and manage your API keys](https://help.brevo.com/hc/en-us/articles/209467485-Create-and-manage-your-API-keys) article.

The key inherits its creator's permissions. Make sure that user can access the data you want to sync, including contacts, CRM and campaigns.

## Set up Brevo in Airbyte

1. In the Airbyte UI, add a new source and select **Brevo**.
2. Enter your **API Key**.
3. Enter a **Start date** as a UTC timestamp using the `YYYY-MM-DDTHH:MM:SSZ` format, for example, `2024-01-01T00:00:00Z`. Incremental streams return only records modified on or after this date.
4. Select **Set up source**. Airbyte verifies your credentials by calling the `contacts` endpoint.

## Configuration reference

| Input | Type | Description |
|-------|------|-------------|
| `api_key` | string | Brevo API key. Sent in the `api-key` request header. |
| `start_date` | string | UTC timestamp (`YYYY-MM-DDTHH:MM:SSZ`) used as the lower bound for incremental streams. |

## Supported sync modes

The connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/):

- Full Refresh | Overwrite
- Full Refresh | Append
- Incremental | Append (for streams marked below as supporting incremental)
- Incremental | Append + Deduped (for streams with a primary key that support incremental)

## Supported streams

| Stream | Primary key | Supports full refresh | Supports incremental |
|--------|-------------|-----------------------|----------------------|
| `account` | `organization_id` | Yes | No |
| `companies` | `id` | Yes | Yes |
| `companies_attributes` | | Yes | No |
| `contacts` | `id` | Yes | Yes |
| `contacts_attributes` | | No | No |
| `contacts_folders` | `id` | Yes | No |
| `contacts_folders_lists` | `id` | Yes | No |
| `contacts_lists` | `id` | Yes | No |
| `contacts_lists_contacts` | | Yes | Yes |
| `contacts_segments` | `id` | Yes | No |
| `crm_attributes_deals` | | Yes | No |
| `crm_deals` | `id` | Yes | Yes |
| `crm_notes` | `id` | Yes | Yes |
| `crm_pipeline_details_all` | `pipeline` | Yes | No |
| `crm_pipeline_stages` | `id` | Yes | No |
| `crm_tasks` | `id` | Yes | Yes |
| `crm_tasktypes` | `id` | Yes | No |
| `domains` | `id` | Yes | No |
| `emailCampaigns` | `id` | Yes | Yes |
| `organization_invited_users` | `email` | Yes | No |
| `senders` | `id` | Yes | No |
| `smsCampaigns` | `id` | Yes | Yes |
| `webhooks` | `id` | Yes | No |

Incremental streams send the cursor value to Brevo as a `modifiedSince` query parameter. Brevo then returns only records modified on or after that timestamp.

## Performance

Brevo applies per-endpoint rate limits based on your account tier. The general tier is available to all accounts. On this tier, endpoints under `/v3/contacts/…` allow 10 requests per second. Most other endpoints share a limit of 100 requests per hour. These endpoints cover CRM, campaigns, senders, domains, webhooks, account and organization. See Brevo's [rate limits documentation](https://developers.brevo.com/docs/api-limits) for the full breakdown by tier.

When Brevo returns `429 Too Many Requests`, the connector retries using exponential backoff. If other integrations share the API key, consider creating a dedicated Airbyte key to avoid contention.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| ------------------ | ------------ | --- | ---------------- |
| 0.2.54 | 2026-11-10 | [91355](https://github.com/airbytehq/airbyte/pull/91355) | Update dependencies |
| 0.2.53 | 2026-11-04 | [90940](https://github.com/airbytehq/airbyte/pull/90940) | Simplify error handling while preserving retry and rate-limit behavior. |
| 0.2.52 | 2026-11-03 | [90462](https://github.com/airbytehq/airbyte/pull/90462) | Update dependencies |
| 0.2.51 | 2026-10-27 | [89794](https://github.com/airbytehq/airbyte/pull/89794) | Update dependencies |
| 0.2.50 | 2026-10-20 | [89132](https://github.com/airbytehq/airbyte/pull/89132) | Update dependencies |
| 0.2.49 | 2026-10-13 | [88539](https://github.com/airbytehq/airbyte/pull/88539) | Update dependencies |
| 0.2.48 | 2026-10-06 | [87746](https://github.com/airbytehq/airbyte/pull/87746) | Update dependencies |
| 0.2.47 | 2026-09-29 | [87087](https://github.com/airbytehq/airbyte/pull/87087) | Update dependencies |
| 0.2.46 | 2026-09-22 | [86545](https://github.com/airbytehq/airbyte/pull/86545) | Update dependencies |
| 0.2.45 | 2026-09-15 | [85967](https://github.com/airbytehq/airbyte/pull/85967) | Update dependencies |
| 0.2.44 | 2026-09-08 | [85406](https://github.com/airbytehq/airbyte/pull/85406) | Update dependencies |
| 0.2.43 | 2026-08-18 | [84488](https://github.com/airbytehq/airbyte/pull/84488) | Update dependencies |
| 0.2.42 | 2026-08-11 | [83853](https://github.com/airbytehq/airbyte/pull/83853) | Update dependencies |
| 0.2.41 | 2026-08-04 | [83382](https://github.com/airbytehq/airbyte/pull/83382) | Update dependencies |
| 0.2.40 | 2026-07-28 | [82828](https://github.com/airbytehq/airbyte/pull/82828) | Update dependencies |
| 0.2.39 | 2026-07-21 | [82324](https://github.com/airbytehq/airbyte/pull/82324) | Update dependencies |
| 0.2.38 | 2026-07-14 | [81750](https://github.com/airbytehq/airbyte/pull/81750) | Update dependencies |
| 0.2.37 | 2026-06-30 | [80981](https://github.com/airbytehq/airbyte/pull/80981) | Update dependencies |
| 0.2.36 | 2026-06-23 | [80381](https://github.com/airbytehq/airbyte/pull/80381) | Update dependencies |
| 0.2.35 | 2026-06-16 | [79769](https://github.com/airbytehq/airbyte/pull/79769) | Update dependencies |
| 0.2.34 | 2026-06-09 | [79221](https://github.com/airbytehq/airbyte/pull/79221) | Update dependencies |
| 0.2.33 | 2026-06-02 | [78599](https://github.com/airbytehq/airbyte/pull/78599) | Update dependencies |
| 0.2.32 | 2026-04-28 | [77161](https://github.com/airbytehq/airbyte/pull/77161) | Update dependencies |
| 0.2.31 | 2026-04-21 | [76844](https://github.com/airbytehq/airbyte/pull/76844) | Bump SDM base image to stable 7.17.2 |
| 0.2.30 | 2026-04-01 | [75946](https://github.com/airbytehq/airbyte/pull/75946) | Bump SDM base image for memory monitor (CDK PR #962) |
| 0.2.29 | 2026-03-31 | [75672](https://github.com/airbytehq/airbyte/pull/75672) | Update dependencies |
| 0.2.28 | 2026-03-24 | [75312](https://github.com/airbytehq/airbyte/pull/75312) | Update dependencies |
| 0.2.27 | 2026-02-17 | [73432](https://github.com/airbytehq/airbyte/pull/73432) | Update dependencies |
| 0.2.26 | 2026-02-03 | [72612](https://github.com/airbytehq/airbyte/pull/72612) | Update dependencies |
| 0.2.25 | 2026-01-20 | [72057](https://github.com/airbytehq/airbyte/pull/72057) | Update dependencies |
| 0.2.24 | 2026-01-14 | [71464](https://github.com/airbytehq/airbyte/pull/71464) | Update dependencies |
| 0.2.23 | 2025-12-18 | [70627](https://github.com/airbytehq/airbyte/pull/70627) | Update dependencies |
| 0.2.22 | 2025-11-25 | [69949](https://github.com/airbytehq/airbyte/pull/69949) | Update dependencies |
| 0.2.21 | 2025-11-18 | [69462](https://github.com/airbytehq/airbyte/pull/69462) | Update dependencies |
| 0.2.20 | 2025-10-29 | [68749](https://github.com/airbytehq/airbyte/pull/68749) | Update dependencies |
| 0.2.19 | 2025-10-21 | [68272](https://github.com/airbytehq/airbyte/pull/68272) | Update dependencies |
| 0.2.18 | 2025-10-14 | [67845](https://github.com/airbytehq/airbyte/pull/67845) | Update dependencies |
| 0.2.17 | 2025-10-07 | [67207](https://github.com/airbytehq/airbyte/pull/67207) | Update dependencies |
| 0.2.16 | 2025-09-30 | [65648](https://github.com/airbytehq/airbyte/pull/65648) | Update dependencies |
| 0.2.15 | 2025-08-09 | [64647](https://github.com/airbytehq/airbyte/pull/64647) | Update dependencies |
| 0.2.14 | 2025-07-12 | [63047](https://github.com/airbytehq/airbyte/pull/63047) | Update dependencies |
| 0.2.13 | 2025-07-05 | [62527](https://github.com/airbytehq/airbyte/pull/62527) | Update dependencies |
| 0.2.12 | 2025-06-28 | [62149](https://github.com/airbytehq/airbyte/pull/62149) | Update dependencies |
| 0.2.11 | 2025-06-21 | [61898](https://github.com/airbytehq/airbyte/pull/61898) | Update dependencies |
| 0.2.10 | 2025-06-15 | [61447](https://github.com/airbytehq/airbyte/pull/61447) | Update dependencies |
| 0.2.9 | 2025-05-24 | [60610](https://github.com/airbytehq/airbyte/pull/60610) | Update dependencies |
| 0.2.8 | 2025-05-10 | [59885](https://github.com/airbytehq/airbyte/pull/59885) | Update dependencies |
| 0.2.7 | 2025-05-05 | [59652](https://github.com/airbytehq/airbyte/pull/59652) | Fix contact pagination |
| 0.2.6 | 2025-05-03 | [58704](https://github.com/airbytehq/airbyte/pull/58704) | Update dependencies |
| 0.2.5 | 2025-04-24 | [57576](https://github.com/airbytehq/airbyte/pull/57576) | Set ordering in ascending on incremental streams |
| 0.2.4 | 2025-04-19 | [57595](https://github.com/airbytehq/airbyte/pull/57595) | Update dependencies |
| 0.2.3 | 2025-04-05 | [57126](https://github.com/airbytehq/airbyte/pull/57126) | Update dependencies |
| 0.2.2 | 2025-03-29 | [56622](https://github.com/airbytehq/airbyte/pull/56622) | Update dependencies |
| 0.2.1 | 2025-03-27 | [56437](https://github.com/airbytehq/airbyte/pull/56437) | Update contacts pagination page size to 1000 |
| 0.2.0 | 2025-03-24 | [56369](https://github.com/airbytehq/airbyte/pull/56369) | Fix/Add incremental on Contacts/Crm deals |
| 0.1.8 | 2025-03-22 | [55367](https://github.com/airbytehq/airbyte/pull/55367) | Update dependencies |
| 0.1.7 | 2025-03-01 | [54874](https://github.com/airbytehq/airbyte/pull/54874) | Update dependencies |
| 0.1.6 | 2025-02-25 | [54674](https://github.com/airbytehq/airbyte/pull/54674) | Fix bug authenticator |
| 0.1.5 | 2025-02-22 | [54223](https://github.com/airbytehq/airbyte/pull/54223) | Update dependencies |
| 0.1.4 | 2025-02-15 | [48282](https://github.com/airbytehq/airbyte/pull/48282) | Update dependencies |
| 0.1.3 | 2024-11-28 | [48737](https://github.com/airbytehq/airbyte/pull/48737) | Update pagination |
| 0.1.2 | 2024-10-29 | [47922](https://github.com/airbytehq/airbyte/pull/47922) | Update dependencies |
| 0.1.1 | 2024-10-28 | [47622](https://github.com/airbytehq/airbyte/pull/47622) | Update dependencies |
| 0.1.0 | 2024-10-08 | [46587](https://github.com/airbytehq/airbyte/pull/46587) | Fix Companies stream paginator+ remove incremental |
| 0.0.1 | 2024-09-11 | [45382](https://github.com/airbytehq/airbyte/pull/45382) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
