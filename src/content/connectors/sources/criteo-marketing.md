---
generated_record: true
connector_name: Criteo Marketing
connector_type: source
connector_slug: criteo-marketing
connector_directory: source-criteo-marketing
definition_id: 9a5346ac-42ee-485d-a791-d079f92ccdfc
version: 0.0.25
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/criteo-marketing
logo: /images/connectors/sources/criteo-marketing.svg
logo_source_path: airbyte-integrations/connectors/source-criteo-marketing/icon.svg
logo_sha256: 849235d75b724a546fc4a3df08b430ae21e8678021812c9538b14a3a34674986
original_metadata_path: airbyte-integrations/connectors/source-criteo-marketing/metadata.yaml
original_metadata_sha256: 3a40d10f708742c690c2807cbdc2c8f55414ebe478cdf3db11c46c90dfb4955e
original_document_path: docs/integrations/sources/criteo-marketing.md
original_document_sha256: 0235e3dc86237a3484f84e33539d5ffbffe8e37cbdc0f1e53884e769761546c7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: bbd814dd01b015106f06f667a3a921083c3378e5cb4f390dcfc1cb35a8ce1e5d
rewritten_at: 2026-11-12T14:05:22.111177+00:00
---

# Criteo Marketing
API documentation:

https://developers.criteo.com/marketing-solutions/reference/getadsetreport

## Configure Criteo Marketing

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `currency` | `string` | Currency. Currency to be used on the report |  |
| `end_date` | `string` | EndDate. End date of the report |  |
| `client_id` | `string` | OAuth Client ID.  |  |
| `start_date` | `string` | StartDate. Start date of the report |  |
| `client_secret` | `string` | OAuth Client Secret.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| ad_spend_daily | AdvertiserId.CampaignId.Day | No pagination | ✅ |  ✅  |
| adsets | Id | No pagination | ✅ |  ❌  |

## IP allow list

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and your organisation restricts access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.25 | 2026-11-10 | [91466](https://github.com/airbytehq/airbyte/pull/91466) | Update dependencies |
| 0.0.24 | 2026-11-03 | [90508](https://github.com/airbytehq/airbyte/pull/90508) | Update dependencies |
| 0.0.23 | 2026-10-27 | [89824](https://github.com/airbytehq/airbyte/pull/89824) | Update dependencies |
| 0.0.22 | 2026-10-20 | [89171](https://github.com/airbytehq/airbyte/pull/89171) | Update dependencies |
| 0.0.21 | 2026-10-13 | [88554](https://github.com/airbytehq/airbyte/pull/88554) | Update dependencies |
| 0.0.20 | 2026-10-06 | [87815](https://github.com/airbytehq/airbyte/pull/87815) | Update dependencies |
| 0.0.19 | 2026-09-29 | [87134](https://github.com/airbytehq/airbyte/pull/87134) | Update dependencies |
| 0.0.18 | 2026-09-22 | [86581](https://github.com/airbytehq/airbyte/pull/86581) | Update dependencies |
| 0.0.17 | 2026-09-15 | [86010](https://github.com/airbytehq/airbyte/pull/86010) | Update dependencies |
| 0.0.16 | 2026-09-08 | [85415](https://github.com/airbytehq/airbyte/pull/85415) | Update dependencies |
| 0.0.15 | 2026-08-18 | [84528](https://github.com/airbytehq/airbyte/pull/84528) | Update dependencies |
| 0.0.14 | 2026-08-11 | [83902](https://github.com/airbytehq/airbyte/pull/83902) | Update dependencies |
| 0.0.13 | 2026-08-04 | [83401](https://github.com/airbytehq/airbyte/pull/83401) | Update dependencies |
| 0.0.12 | 2026-07-28 | [82848](https://github.com/airbytehq/airbyte/pull/82848) | Update dependencies |
| 0.0.11 | 2026-07-21 | [82379](https://github.com/airbytehq/airbyte/pull/82379) | Update dependencies |
| 0.0.10 | 2026-07-14 | [81756](https://github.com/airbytehq/airbyte/pull/81756) | Update dependencies |
| 0.0.9 | 2026-06-30 | [81008](https://github.com/airbytehq/airbyte/pull/81008) | Update dependencies |
| 0.0.8 | 2026-06-23 | [80422](https://github.com/airbytehq/airbyte/pull/80422) | Update dependencies |
| 0.0.7 | 2026-06-16 | [79780](https://github.com/airbytehq/airbyte/pull/79780) | Update dependencies |
| 0.0.6 | 2026-06-09 | [79277](https://github.com/airbytehq/airbyte/pull/79277) | Update dependencies |
| 0.0.5 | 2026-06-02 | [78651](https://github.com/airbytehq/airbyte/pull/78651) | Update dependencies |
| 0.0.4 | 2026-04-28 | [77215](https://github.com/airbytehq/airbyte/pull/77215) | Update dependencies |
| 0.0.3 | 2026-04-21 | [75099](https://github.com/airbytehq/airbyte/pull/75099) | Update dependencies |
| 0.0.2 | 2026-03-03 | [74165](https://github.com/airbytehq/airbyte/pull/74165) | Update dependencies |
| 0.0.1 | 2026-02-04 | | Initial release by [@mvfc](https://github.com/mvfc) via Connector Builder |

</details>
