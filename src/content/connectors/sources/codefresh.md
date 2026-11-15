---
generated_record: true
connector_name: Codefresh
connector_type: source
connector_slug: codefresh
connector_directory: source-codefresh
definition_id: cd8313fe-05cb-4439-aed5-26a2adc4856c
version: 0.0.71
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/codefresh
logo: /images/connectors/sources/codefresh.svg
logo_source_path: airbyte-integrations/connectors/source-codefresh/icon.svg
logo_sha256: bb939e095b68a5aa8ebabbde44509f1849e1a675d74f0b70cbafc6baa22bf55d
original_metadata_path: airbyte-integrations/connectors/source-codefresh/metadata.yaml
original_metadata_sha256: 62bfd3fbbf4a290929069997ff7a6bb15c04735df5994dc8f738c4844e08c22d
original_document_path: docs/integrations/sources/codefresh.md
original_document_sha256: 97a51f139efcec83bb9a7f4d0435305cb3bee4e2a22d6cab724649c7916adb41
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4e60a03aac0672e75bb91bc6bacafd09fd787e5a32fec1076a308d160f5c5a01
rewritten_at: 2026-11-12T13:33:52.338374+00:00
---

# Codefresh
Synchronise data for analytics and pipeline monitoring by connecting [Codefresh](https://codefresh.io) with Airbyte.
Available streams include agents, builds, audit and analytics.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `account_id` | `string` | Account Id.  |  |
| `report_granularity` | `string` | Report Granularity.  |  |
| `report_date_range` | `array` | Report Date Range.  |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| accounts | _id | No pagination | ✅ |  ❌  |
| account_settings | _id | No pagination | ✅ |  ❌  |
| agents | id | No pagination | ✅ |  ❌  |
| builds | id | DefaultPaginator | ✅ |  ✅  |
| audit | id | DefaultPaginator | ✅ |  ✅  |
| analytics_metadata | reportName | No pagination | ✅ |  ❌  |
| analytics_reports |  | No pagination | ✅ |  ❌  |
| execution_contexts | _id | No pagination | ✅ |  ❌  |
| contexts | metadata | No pagination | ✅ |  ❌  |
| projects | id | DefaultPaginator | ✅ |  ❌  |
| pipelines | metadata | DefaultPaginator | ✅ |  ❌  |
| step_types | metadata | DefaultPaginator | ✅ |  ❌  |
| helm_repos |  | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and your company restricts specific IP addresses, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.71 | 2026-11-10 | [91487](https://github.com/airbytehq/airbyte/pull/91487) | Update dependencies |
| 0.0.70 | 2026-11-03 | [90458](https://github.com/airbytehq/airbyte/pull/90458) | Update dependencies |
| 0.0.69 | 2026-10-27 | [89845](https://github.com/airbytehq/airbyte/pull/89845) | Update dependencies |
| 0.0.68 | 2026-10-20 | [89145](https://github.com/airbytehq/airbyte/pull/89145) | Update dependencies |
| 0.0.67 | 2026-10-13 | [88558](https://github.com/airbytehq/airbyte/pull/88558) | Update dependencies |
| 0.0.66 | 2026-10-07 | [88302](https://github.com/airbytehq/airbyte/pull/88302) | Send `audit` stream `from`/`to` filters as epoch milliseconds as required by the Codefresh API |
| 0.0.65 | 2026-10-06 | [87793](https://github.com/airbytehq/airbyte/pull/87793) | Update dependencies |
| 0.0.64 | 2026-09-29 | [87135](https://github.com/airbytehq/airbyte/pull/87135) | Update dependencies |
| 0.0.63 | 2026-09-22 | [86588](https://github.com/airbytehq/airbyte/pull/86588) | Update dependencies |
| 0.0.62 | 2026-09-15 | [85981](https://github.com/airbytehq/airbyte/pull/85981) | Update dependencies |
| 0.0.61 | 2026-09-08 | [85440](https://github.com/airbytehq/airbyte/pull/85440) | Update dependencies |
| 0.0.60 | 2026-08-18 | [84532](https://github.com/airbytehq/airbyte/pull/84532) | Update dependencies |
| 0.0.59 | 2026-08-11 | [83895](https://github.com/airbytehq/airbyte/pull/83895) | Update dependencies |
| 0.0.58 | 2026-08-04 | [83398](https://github.com/airbytehq/airbyte/pull/83398) | Update dependencies |
| 0.0.57 | 2026-07-28 | [82871](https://github.com/airbytehq/airbyte/pull/82871) | Update dependencies |
| 0.0.56 | 2026-07-21 | [82344](https://github.com/airbytehq/airbyte/pull/82344) | Update dependencies |
| 0.0.55 | 2026-07-14 | [81774](https://github.com/airbytehq/airbyte/pull/81774) | Update dependencies |
| 0.0.54 | 2026-06-30 | [81014](https://github.com/airbytehq/airbyte/pull/81014) | Update dependencies |
| 0.0.53 | 2026-06-23 | [80427](https://github.com/airbytehq/airbyte/pull/80427) | Update dependencies |
| 0.0.52 | 2026-06-16 | [79822](https://github.com/airbytehq/airbyte/pull/79822) | Update dependencies |
| 0.0.51 | 2026-06-09 | [79247](https://github.com/airbytehq/airbyte/pull/79247) | Update dependencies |
| 0.0.50 | 2026-06-02 | [78643](https://github.com/airbytehq/airbyte/pull/78643) | Update dependencies |
| 0.0.49 | 2026-04-28 | [77181](https://github.com/airbytehq/airbyte/pull/77181) | Update dependencies |
| 0.0.48 | 2026-04-21 | [76569](https://github.com/airbytehq/airbyte/pull/76569) | Update dependencies |
| 0.0.47 | 2026-03-17 | [75074](https://github.com/airbytehq/airbyte/pull/75074) | Update dependencies |
| 0.0.46 | 2026-03-10 | [74428](https://github.com/airbytehq/airbyte/pull/74428) | Update dependencies |
| 0.0.45 | 2026-02-24 | [73799](https://github.com/airbytehq/airbyte/pull/73799) | Update dependencies |
| 0.0.44 | 2026-02-10 | [72737](https://github.com/airbytehq/airbyte/pull/72737) | Update dependencies |
| 0.0.43 | 2026-01-20 | [72139](https://github.com/airbytehq/airbyte/pull/72139) | Update dependencies |
| 0.0.42 | 2026-01-14 | [71730](https://github.com/airbytehq/airbyte/pull/71730) | Update dependencies |
| 0.0.41 | 2025-12-18 | [70650](https://github.com/airbytehq/airbyte/pull/70650) | Update dependencies |
| 0.0.40 | 2025-11-25 | [69925](https://github.com/airbytehq/airbyte/pull/69925) | Update dependencies |
| 0.0.39 | 2025-11-18 | [69619](https://github.com/airbytehq/airbyte/pull/69619) | Update dependencies |
| 0.0.38 | 2025-10-29 | [68921](https://github.com/airbytehq/airbyte/pull/68921) | Update dependencies |
| 0.0.37 | 2025-10-21 | [68488](https://github.com/airbytehq/airbyte/pull/68488) | Update dependencies |
| 0.0.36 | 2025-10-14 | [68074](https://github.com/airbytehq/airbyte/pull/68074) | Update dependencies |
| 0.0.35 | 2025-10-07 | [67189](https://github.com/airbytehq/airbyte/pull/67189) | Update dependencies |
| 0.0.34 | 2025-09-30 | [65772](https://github.com/airbytehq/airbyte/pull/65772) | Update dependencies |
| 0.0.33 | 2025-08-23 | [65284](https://github.com/airbytehq/airbyte/pull/65284) | Update dependencies |
| 0.0.32 | 2025-08-09 | [64739](https://github.com/airbytehq/airbyte/pull/64739) | Update dependencies |
| 0.0.31 | 2025-07-26 | [64032](https://github.com/airbytehq/airbyte/pull/64032) | Update dependencies |
| 0.0.30 | 2025-07-19 | [63539](https://github.com/airbytehq/airbyte/pull/63539) | Update dependencies |
| 0.0.29 | 2025-07-12 | [62978](https://github.com/airbytehq/airbyte/pull/62978) | Update dependencies |
| 0.0.28 | 2025-07-05 | [62815](https://github.com/airbytehq/airbyte/pull/62815) | Update dependencies |
| 0.0.27 | 2025-06-28 | [62307](https://github.com/airbytehq/airbyte/pull/62307) | Update dependencies |
| 0.0.26 | 2025-06-21 | [61964](https://github.com/airbytehq/airbyte/pull/61964) | Update dependencies |
| 0.0.25 | 2025-06-14 | [61240](https://github.com/airbytehq/airbyte/pull/61240) | Update dependencies |
| 0.0.24 | 2025-05-24 | [60360](https://github.com/airbytehq/airbyte/pull/60360) | Update dependencies |
| 0.0.23 | 2025-05-10 | [59939](https://github.com/airbytehq/airbyte/pull/59939) | Update dependencies |
| 0.0.22 | 2025-05-03 | [59417](https://github.com/airbytehq/airbyte/pull/59417) | Update dependencies |
| 0.0.21 | 2025-04-26 | [58868](https://github.com/airbytehq/airbyte/pull/58868) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58346](https://github.com/airbytehq/airbyte/pull/58346) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57778](https://github.com/airbytehq/airbyte/pull/57778) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57275](https://github.com/airbytehq/airbyte/pull/57275) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56492](https://github.com/airbytehq/airbyte/pull/56492) | Update dependencies |
| 0.0.16 | 2025-03-22 | [55338](https://github.com/airbytehq/airbyte/pull/55338) | Update dependencies |
| 0.0.15 | 2025-03-01 | [54977](https://github.com/airbytehq/airbyte/pull/54977) | Update dependencies |
| 0.0.14 | 2025-02-22 | [54433](https://github.com/airbytehq/airbyte/pull/54433) | Update dependencies |
| 0.0.13 | 2025-02-15 | [53764](https://github.com/airbytehq/airbyte/pull/53764) | Update dependencies |
| 0.0.12 | 2025-02-08 | [53361](https://github.com/airbytehq/airbyte/pull/53361) | Update dependencies |
| 0.0.11 | 2025-02-01 | [52802](https://github.com/airbytehq/airbyte/pull/52802) | Update dependencies |
| 0.0.10 | 2025-01-25 | [52378](https://github.com/airbytehq/airbyte/pull/52378) | Update dependencies |
| 0.0.9 | 2025-01-18 | [51668](https://github.com/airbytehq/airbyte/pull/51668) | Update dependencies |
| 0.0.8 | 2025-01-11 | [51088](https://github.com/airbytehq/airbyte/pull/51088) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50559](https://github.com/airbytehq/airbyte/pull/50559) | Update dependencies |
| 0.0.6 | 2024-12-21 | [50051](https://github.com/airbytehq/airbyte/pull/50051) | Update dependencies |
| 0.0.5 | 2024-12-14 | [49486](https://github.com/airbytehq/airbyte/pull/49486) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49182](https://github.com/airbytehq/airbyte/pull/49182) | Update dependencies |
| 0.0.3 | 2024-11-04 | [48183](https://github.com/airbytehq/airbyte/pull/48183) | Update dependencies |
| 0.0.2 | 2024-10-28 | [47574](https://github.com/airbytehq/airbyte/pull/47574) | Update dependencies |
| 0.0.1 | 2024-10-21 | | Initial release by [@bishalbera](https://github.com/bishalbera) via Connector Builder |

</details>
