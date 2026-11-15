---
generated_record: true
connector_name: Salesflare
connector_type: source
connector_slug: salesflare
connector_directory: source-salesflare
definition_id: a312f5ec-ba92-4c5b-a03c-197fbd961b91
version: 0.0.67
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/salesflare
logo: /images/connectors/sources/salesflare.svg
logo_source_path: airbyte-integrations/connectors/source-salesflare/icon.svg
logo_sha256: b148a0cbf5589c337ce337354215992ffa3379948a82f1a125d97f49dadbafd5
original_metadata_path: airbyte-integrations/connectors/source-salesflare/metadata.yaml
original_metadata_sha256: f4dd8afdb7a512c8d9aa4c19630b41a5e93064b2cfd58f60a627e950e88156ab
original_document_path: docs/integrations/sources/salesflare.md
original_document_sha256: 1ea28e1430192c01cef2339ff920cf46839bb8210c88459fa770bb9023e9e725
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 570a9461e88dbed914e572dd86bd7e069d6cf21bf7b066aedeebebdd1d124154
rewritten_at: 2026-11-12T13:54:16.013251+00:00
---

# Salesflare
Salesflare is a CRM tool for small and medium businesses.
This connector lets you extract data from streams such as opportunities, workflows and pipelines.
Docs: https://api.salesflare.com/docs

## Configure Salesflare

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Enter you api key like this : Bearer YOUR_API_KEY |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| tasks | id | DefaultPaginator | ✅ |  ❌  |
| accounts | id | DefaultPaginator | ✅ |  ❌  |
| contacts | id | DefaultPaginator | ✅ |  ❌  |
| opportunities | id | DefaultPaginator | ✅ |  ❌  |
| workflows | id | DefaultPaginator | ✅ |  ❌  |
| tags | id | DefaultPaginator | ✅ |  ❌  |
| persons | id | No pagination | ✅ |  ❌  |
| email data sources | id | No pagination | ✅ |  ❌  |
| custom field types | id | No pagination | ✅ |  ❌  |
| pipelines | id | No pagination | ✅ |  ❌  |
| users | id | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.67 | 2026-11-10 | [91698](https://github.com/airbytehq/airbyte/pull/91698) | Update dependencies |
| 0.0.66 | 2026-11-03 | [90743](https://github.com/airbytehq/airbyte/pull/90743) | Update dependencies |
| 0.0.65 | 2026-10-20 | [89371](https://github.com/airbytehq/airbyte/pull/89371) | Update dependencies |
| 0.0.64 | 2026-10-13 | [88783](https://github.com/airbytehq/airbyte/pull/88783) | Update dependencies |
| 0.0.63 | 2026-10-06 | [88014](https://github.com/airbytehq/airbyte/pull/88014) | Update dependencies |
| 0.0.62 | 2026-09-29 | [87319](https://github.com/airbytehq/airbyte/pull/87319) | Update dependencies |
| 0.0.61 | 2026-09-22 | [86792](https://github.com/airbytehq/airbyte/pull/86792) | Update dependencies |
| 0.0.60 | 2026-09-15 | [86222](https://github.com/airbytehq/airbyte/pull/86222) | Update dependencies |
| 0.0.59 | 2026-09-08 | [85638](https://github.com/airbytehq/airbyte/pull/85638) | Update dependencies |
| 0.0.58 | 2026-08-18 | [84731](https://github.com/airbytehq/airbyte/pull/84731) | Update dependencies |
| 0.0.57 | 2026-08-11 | [84101](https://github.com/airbytehq/airbyte/pull/84101) | Update dependencies |
| 0.0.56 | 2026-08-04 | [83610](https://github.com/airbytehq/airbyte/pull/83610) | Update dependencies |
| 0.0.55 | 2026-07-28 | [83072](https://github.com/airbytehq/airbyte/pull/83072) | Update dependencies |
| 0.0.54 | 2026-07-21 | [82572](https://github.com/airbytehq/airbyte/pull/82572) | Update dependencies |
| 0.0.53 | 2026-07-14 | [81989](https://github.com/airbytehq/airbyte/pull/81989) | Update dependencies |
| 0.0.52 | 2026-06-30 | [81228](https://github.com/airbytehq/airbyte/pull/81228) | Update dependencies |
| 0.0.51 | 2026-06-23 | [80632](https://github.com/airbytehq/airbyte/pull/80632) | Update dependencies |
| 0.0.50 | 2026-06-16 | [80051](https://github.com/airbytehq/airbyte/pull/80051) | Update dependencies |
| 0.0.49 | 2026-06-09 | [79479](https://github.com/airbytehq/airbyte/pull/79479) | Update dependencies |
| 0.0.48 | 2026-06-02 | [78983](https://github.com/airbytehq/airbyte/pull/78983) | Update dependencies |
| 0.0.47 | 2026-04-28 | [77428](https://github.com/airbytehq/airbyte/pull/77428) | Update dependencies |
| 0.0.46 | 2026-04-21 | [76734](https://github.com/airbytehq/airbyte/pull/76734) | Update dependencies |
| 0.0.45 | 2026-03-31 | [75840](https://github.com/airbytehq/airbyte/pull/75840) | Update dependencies |
| 0.0.44 | 2026-03-24 | [75335](https://github.com/airbytehq/airbyte/pull/75335) | Update dependencies |
| 0.0.43 | 2026-03-10 | [74675](https://github.com/airbytehq/airbyte/pull/74675) | Update dependencies |
| 0.0.42 | 2026-02-24 | [73179](https://github.com/airbytehq/airbyte/pull/73179) | Update dependencies |
| 0.0.41 | 2026-02-03 | [72555](https://github.com/airbytehq/airbyte/pull/72555) | Update dependencies |
| 0.0.40 | 2026-01-20 | [72130](https://github.com/airbytehq/airbyte/pull/72130) | Update dependencies |
| 0.0.39 | 2026-01-14 | [71539](https://github.com/airbytehq/airbyte/pull/71539) | Update dependencies |
| 0.0.38 | 2025-12-18 | [70759](https://github.com/airbytehq/airbyte/pull/70759) | Update dependencies |
| 0.0.37 | 2025-11-25 | [69991](https://github.com/airbytehq/airbyte/pull/69991) | Update dependencies |
| 0.0.36 | 2025-11-18 | [69699](https://github.com/airbytehq/airbyte/pull/69699) | Update dependencies |
| 0.0.35 | 2025-10-29 | [68861](https://github.com/airbytehq/airbyte/pull/68861) | Update dependencies |
| 0.0.34 | 2025-10-21 | [68403](https://github.com/airbytehq/airbyte/pull/68403) | Update dependencies |
| 0.0.33 | 2025-10-14 | [67928](https://github.com/airbytehq/airbyte/pull/67928) | Update dependencies |
| 0.0.32 | 2025-10-07 | [67215](https://github.com/airbytehq/airbyte/pull/67215) | Update dependencies |
| 0.0.31 | 2025-09-30 | [66873](https://github.com/airbytehq/airbyte/pull/66873) | Update dependencies |
| 0.0.30 | 2025-09-24 | [66632](https://github.com/airbytehq/airbyte/pull/66632) | Update dependencies |
| 0.0.29 | 2025-09-09 | [66125](https://github.com/airbytehq/airbyte/pull/66125) | Update dependencies |
| 0.0.28 | 2025-08-24 | [65425](https://github.com/airbytehq/airbyte/pull/65425) | Update dependencies |
| 0.0.27 | 2025-08-16 | [65001](https://github.com/airbytehq/airbyte/pull/65001) | Update dependencies |
| 0.0.26 | 2025-08-02 | [64445](https://github.com/airbytehq/airbyte/pull/64445) | Update dependencies |
| 0.0.25 | 2025-07-19 | [63644](https://github.com/airbytehq/airbyte/pull/63644) | Update dependencies |
| 0.0.24 | 2025-07-05 | [62670](https://github.com/airbytehq/airbyte/pull/62670) | Update dependencies |
| 0.0.23 | 2025-06-28 | [62281](https://github.com/airbytehq/airbyte/pull/62281) | Update dependencies |
| 0.0.22 | 2025-06-21 | [61788](https://github.com/airbytehq/airbyte/pull/61788) | Update dependencies |
| 0.0.21 | 2025-05-24 | [60440](https://github.com/airbytehq/airbyte/pull/60440) | Update dependencies |
| 0.0.20 | 2025-05-10 | [60096](https://github.com/airbytehq/airbyte/pull/60096) | Update dependencies |
| 0.0.19 | 2025-05-04 | [58983](https://github.com/airbytehq/airbyte/pull/58983) | Update dependencies |
| 0.0.18 | 2025-04-19 | [57980](https://github.com/airbytehq/airbyte/pull/57980) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57458](https://github.com/airbytehq/airbyte/pull/57458) | Update dependencies |
| 0.0.16 | 2025-03-29 | [56751](https://github.com/airbytehq/airbyte/pull/56751) | Update dependencies |
| 0.0.15 | 2025-03-22 | [56212](https://github.com/airbytehq/airbyte/pull/56212) | Update dependencies |
| 0.0.14 | 2025-03-08 | [55051](https://github.com/airbytehq/airbyte/pull/55051) | Update dependencies |
| 0.0.13 | 2025-02-23 | [54568](https://github.com/airbytehq/airbyte/pull/54568) | Update dependencies |
| 0.0.12 | 2025-02-15 | [53948](https://github.com/airbytehq/airbyte/pull/53948) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53489](https://github.com/airbytehq/airbyte/pull/53489) | Update dependencies |
| 0.0.10 | 2025-02-01 | [52960](https://github.com/airbytehq/airbyte/pull/52960) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52486](https://github.com/airbytehq/airbyte/pull/52486) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51918](https://github.com/airbytehq/airbyte/pull/51918) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51311](https://github.com/airbytehq/airbyte/pull/51311) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50695](https://github.com/airbytehq/airbyte/pull/50695) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50234](https://github.com/airbytehq/airbyte/pull/50234) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49660](https://github.com/airbytehq/airbyte/pull/49660) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49325](https://github.com/airbytehq/airbyte/pull/49325) | Update dependencies |
| 0.0.2 | 2024-12-11 | [49078](https://github.com/airbytehq/airbyte/pull/49078) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1 | 2024-11-07 | | Initial release by [@ombhardwajj](https://github.com/ombhardwajj) via Connector Builder |

</details>
