---
generated_record: true
connector_name: Svix
connector_type: source
connector_slug: svix
connector_directory: source-svix
definition_id: 5c11d431-dc5f-4b6d-9a61-d03799e1dc09
version: 0.0.52
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/svix
logo: /images/connectors/sources/svix.svg
logo_source_path: airbyte-integrations/connectors/source-svix/icon.svg
logo_sha256: f56fc89bfa44e420d24f250f1dc00319696900e438370ac67ab0d92a2cf927b4
original_metadata_path: airbyte-integrations/connectors/source-svix/metadata.yaml
original_metadata_sha256: ef007d9fe756fd2fb3d0282b74a870bbb2d37aab15bac28c4c874d1798a1110a
original_document_path: docs/integrations/sources/svix.md
original_document_sha256: 5cdccf5fd908e628a5d3eab0e153690d417a4e7c3e002e055812f107ed6a2246
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 833df366e84d87daa2f5a3be71f2d0a58223158a633676ae4b8c79d96f58fed7
rewritten_at: 2026-11-12T13:57:51.791619+00:00
---

# Svix
Website: https://dashboard.svix.com/
API reference: https://api.svix.com/docs#section/Introduction

## Configure Svix

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Svix API key. The region suffix of the key (for example `.us` or `.eu`) is used to pick the regional API server (`api.<region>.svix.com`), as the official Svix SDKs do. |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| applications | id | DefaultPaginator | ✅ |  ✅  |
| event_types | uuid | DefaultPaginator | ✅ |  ✅  |
| tokens | id | DefaultPaginator | ✅ |  ✅  |
| endpoints | id | DefaultPaginator | ✅ |  ✅  |
| integrations | id | DefaultPaginator | ✅ |  ✅  |
| ingest_source | id | DefaultPaginator | ✅ |  ✅  |
| ingest_source_endpoint | id | DefaultPaginator | ✅ |  ✅  |
| webhook_endpoint | id | DefaultPaginator | ✅ |  ✅  |

## Allow IP addresses

Add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and your organisation restricts access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.52 | 2026-11-10 | [91725](https://github.com/airbytehq/airbyte/pull/91725) | Update dependencies |
| 0.0.51 | 2026-11-03 | [90782](https://github.com/airbytehq/airbyte/pull/90782) | Update dependencies |
| 0.0.50 | 2026-10-27 | [90059](https://github.com/airbytehq/airbyte/pull/90059) | Update dependencies |
| 0.0.49 | 2026-10-20 | [89411](https://github.com/airbytehq/airbyte/pull/89411) | Update dependencies |
| 0.0.48 | 2026-10-13 | [88826](https://github.com/airbytehq/airbyte/pull/88826) | Update dependencies |
| 0.0.47 | 2026-10-07 | [88278](https://github.com/airbytehq/airbyte/pull/88278) | Select the Svix regional API server from the API key region suffix instead of always using the EU server; accept `updatedAt`/`createdAt` values without fractional seconds |
| 0.0.46 | 2026-10-06 | [88060](https://github.com/airbytehq/airbyte/pull/88060) | Update dependencies |
| 0.0.45 | 2026-09-29 | [87387](https://github.com/airbytehq/airbyte/pull/87387) | Update dependencies |
| 0.0.44 | 2026-09-22 | [86825](https://github.com/airbytehq/airbyte/pull/86825) | Update dependencies |
| 0.0.43 | 2026-09-15 | [86274](https://github.com/airbytehq/airbyte/pull/86274) | Update dependencies |
| 0.0.42 | 2026-09-08 | [85673](https://github.com/airbytehq/airbyte/pull/85673) | Update dependencies |
| 0.0.41 | 2026-08-18 | [84794](https://github.com/airbytehq/airbyte/pull/84794) | Update dependencies |
| 0.0.40 | 2026-08-11 | [84140](https://github.com/airbytehq/airbyte/pull/84140) | Update dependencies |
| 0.0.39 | 2026-08-04 | [83644](https://github.com/airbytehq/airbyte/pull/83644) | Update dependencies |
| 0.0.38 | 2026-07-28 | [83138](https://github.com/airbytehq/airbyte/pull/83138) | Update dependencies |
| 0.0.37 | 2026-07-21 | [82613](https://github.com/airbytehq/airbyte/pull/82613) | Update dependencies |
| 0.0.36 | 2026-07-14 | [82035](https://github.com/airbytehq/airbyte/pull/82035) | Update dependencies |
| 0.0.35 | 2026-06-30 | [81302](https://github.com/airbytehq/airbyte/pull/81302) | Update dependencies |
| 0.0.34 | 2026-06-23 | [80668](https://github.com/airbytehq/airbyte/pull/80668) | Update dependencies |
| 0.0.33 | 2026-06-16 | [80058](https://github.com/airbytehq/airbyte/pull/80058) | Update dependencies |
| 0.0.32 | 2026-06-09 | [79546](https://github.com/airbytehq/airbyte/pull/79546) | Update dependencies |
| 0.0.31 | 2026-06-02 | [78998](https://github.com/airbytehq/airbyte/pull/78998) | Update dependencies |
| 0.0.30 | 2026-04-28 | [77447](https://github.com/airbytehq/airbyte/pull/77447) | Update dependencies |
| 0.0.29 | 2026-04-21 | [76779](https://github.com/airbytehq/airbyte/pull/76779) | Update dependencies |
| 0.0.28 | 2026-03-17 | [75090](https://github.com/airbytehq/airbyte/pull/75090) | Update dependencies |
| 0.0.27 | 2026-03-03 | [73957](https://github.com/airbytehq/airbyte/pull/73957) | Update dependencies |
| 0.0.26 | 2026-02-17 | [73122](https://github.com/airbytehq/airbyte/pull/73122) | Update dependencies |
| 0.0.25 | 2026-02-03 | [72741](https://github.com/airbytehq/airbyte/pull/72741) | Update dependencies |
| 0.0.24 | 2026-01-20 | [72134](https://github.com/airbytehq/airbyte/pull/72134) | Update dependencies |
| 0.0.23 | 2026-01-14 | [71582](https://github.com/airbytehq/airbyte/pull/71582) | Update dependencies |
| 0.0.22 | 2025-12-18 | [70637](https://github.com/airbytehq/airbyte/pull/70637) | Update dependencies |
| 0.0.21 | 2025-11-25 | [70063](https://github.com/airbytehq/airbyte/pull/70063) | Update dependencies |
| 0.0.20 | 2025-11-18 | [69527](https://github.com/airbytehq/airbyte/pull/69527) | Update dependencies |
| 0.0.19 | 2025-10-29 | [68993](https://github.com/airbytehq/airbyte/pull/68993) | Update dependencies |
| 0.0.18 | 2025-10-21 | [68525](https://github.com/airbytehq/airbyte/pull/68525) | Update dependencies |
| 0.0.17 | 2025-10-14 | [67884](https://github.com/airbytehq/airbyte/pull/67884) | Update dependencies |
| 0.0.16 | 2025-10-07 | [67455](https://github.com/airbytehq/airbyte/pull/67455) | Update dependencies |
| 0.0.15 | 2025-09-30 | [66881](https://github.com/airbytehq/airbyte/pull/66881) | Update dependencies |
| 0.0.14 | 2025-09-24 | [66362](https://github.com/airbytehq/airbyte/pull/66362) | Update dependencies |
| 0.0.13 | 2025-09-09 | [66122](https://github.com/airbytehq/airbyte/pull/66122) | Update dependencies |
| 0.0.12 | 2025-08-24 | [64999](https://github.com/airbytehq/airbyte/pull/64999) | Update dependencies |
| 0.0.11 | 2025-08-02 | [64458](https://github.com/airbytehq/airbyte/pull/64458) | Update dependencies |
| 0.0.10 | 2025-07-19 | [63609](https://github.com/airbytehq/airbyte/pull/63609) | Update dependencies |
| 0.0.9 | 2025-07-05 | [62680](https://github.com/airbytehq/airbyte/pull/62680) | Update dependencies |
| 0.0.8 | 2025-06-28 | [61305](https://github.com/airbytehq/airbyte/pull/61305) | Update dependencies |
| 0.0.7 | 2025-05-24 | [60462](https://github.com/airbytehq/airbyte/pull/60462) | Update dependencies |
| 0.0.6 | 2025-05-10 | [60193](https://github.com/airbytehq/airbyte/pull/60193) | Update dependencies |
| 0.0.5 | 2025-05-04 | [59592](https://github.com/airbytehq/airbyte/pull/59592) | Update dependencies |
| 0.0.4 | 2025-04-27 | [59026](https://github.com/airbytehq/airbyte/pull/59026) | Update dependencies |
| 0.0.3 | 2025-04-19 | [58429](https://github.com/airbytehq/airbyte/pull/58429) | Update dependencies |
| 0.0.2 | 2025-04-12 | [57997](https://github.com/airbytehq/airbyte/pull/57997) | Update dependencies |
| 0.0.1 | 2025-04-06 | [57495](https://github.com/airbytehq/airbyte/pull/57495) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
