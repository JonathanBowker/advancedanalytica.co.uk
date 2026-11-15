---
generated_record: true
connector_name: Wufoo
connector_type: source
connector_slug: wufoo
connector_directory: source-wufoo
definition_id: 2e5fb207-5215-43ee-8b4f-88f6490e204e
version: 0.0.74
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/wufoo
logo: /images/connectors/sources/wufoo.svg
logo_source_path: airbyte-integrations/connectors/source-wufoo/icon.svg
logo_sha256: 47b2a22e5bd27bf91774ea804f9003e9435322a7e0b5524bf384aa99293b978d
original_metadata_path: airbyte-integrations/connectors/source-wufoo/metadata.yaml
original_metadata_sha256: 1e5e73883b17fef78cad11277791e0a63545b671e694a29b8da70a7ccc486fd5
original_document_path: docs/integrations/sources/wufoo.md
original_document_sha256: 5d184a24f4df715680c83b824f463a5b5909f1cc56ec99ed2eae13fa20eff8f1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 6d85166dffdab885de1b2fd3771fb1d7940553f00ba6852729dcc14b353692dd
rewritten_at: 2026-11-12T14:00:44.453106+00:00
---

# Wufoo
The Airbyte connector for [Wufoo](https://www.wufoo.com/) connects Wufoo with various destinations. It extracts form entries, form metadata and user information through the Wufoo API. You can automate survey and form data synchronisation with your chosen data warehouse or analytical tools. This simplifies reporting and helps you gain data-driven insights.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Your Wufoo API Key. You can find it by logging into your Wufoo account, selecting &#39;API Information&#39; from the &#39;More&#39; dropdown on any form, and locating the 16-digit code. |  |
| `subdomain` | `string` | Subdomain. Your account subdomain/username for Wufoo. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| forms | Hash | No pagination | ✅ |  ❌  |
| form_comments | CommentId | DefaultPaginator | ✅ |  ❌  |
| form_fields |  | No pagination | ✅ |  ❌  |
| form_entries | EntryId | DefaultPaginator | ✅ |  ❌  |
| reports | Hash | No pagination | ✅ |  ❌  |
| report_entries | EntryId | No pagination | ✅ |  ❌  |
| report_fields |  | No pagination | ✅ |  ❌  |
| report_widgets | Hash | No pagination | ✅ |  ❌  |
| users | Hash | No pagination | ✅ |  ❌  |

## Allow IP addresses

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.74 | 2026-11-10 | [91800](https://github.com/airbytehq/airbyte/pull/91800) | Update dependencies |
| 0.0.73 | 2026-11-03 | [90818](https://github.com/airbytehq/airbyte/pull/90818) | Update dependencies |
| 0.0.72 | 2026-10-27 | [90106](https://github.com/airbytehq/airbyte/pull/90106) | Update dependencies |
| 0.0.71 | 2026-10-20 | [89470](https://github.com/airbytehq/airbyte/pull/89470) | Update dependencies |
| 0.0.70 | 2026-10-13 | [88878](https://github.com/airbytehq/airbyte/pull/88878) | Update dependencies |
| 0.0.69 | 2026-10-07 | [88187](https://github.com/airbytehq/airbyte/pull/88187) | Fix `ParentHash` on `report_widgets` stream (was always empty due to wrong partition field) |
| 0.0.68 | 2026-10-06 | [88088](https://github.com/airbytehq/airbyte/pull/88088) | Update dependencies |
| 0.0.67 | 2026-09-29 | [87419](https://github.com/airbytehq/airbyte/pull/87419) | Update dependencies |
| 0.0.66 | 2026-09-22 | [86887](https://github.com/airbytehq/airbyte/pull/86887) | Update dependencies |
| 0.0.65 | 2026-09-15 | [86296](https://github.com/airbytehq/airbyte/pull/86296) | Update dependencies |
| 0.0.64 | 2026-09-08 | [85738](https://github.com/airbytehq/airbyte/pull/85738) | Update dependencies |
| 0.0.63 | 2026-08-18 | [84823](https://github.com/airbytehq/airbyte/pull/84823) | Update dependencies |
| 0.0.62 | 2026-08-11 | [84197](https://github.com/airbytehq/airbyte/pull/84197) | Update dependencies |
| 0.0.61 | 2026-08-04 | [83688](https://github.com/airbytehq/airbyte/pull/83688) | Update dependencies |
| 0.0.60 | 2026-07-28 | [83169](https://github.com/airbytehq/airbyte/pull/83169) | Update dependencies |
| 0.0.59 | 2026-07-21 | [82674](https://github.com/airbytehq/airbyte/pull/82674) | Update dependencies |
| 0.0.58 | 2026-07-14 | [82067](https://github.com/airbytehq/airbyte/pull/82067) | Update dependencies |
| 0.0.57 | 2026-06-30 | [81315](https://github.com/airbytehq/airbyte/pull/81315) | Update dependencies |
| 0.0.56 | 2026-06-23 | [80723](https://github.com/airbytehq/airbyte/pull/80723) | Update dependencies |
| 0.0.55 | 2026-06-16 | [80098](https://github.com/airbytehq/airbyte/pull/80098) | Update dependencies |
| 0.0.54 | 2026-06-09 | [79589](https://github.com/airbytehq/airbyte/pull/79589) | Update dependencies |
| 0.0.53 | 2026-06-02 | [79065](https://github.com/airbytehq/airbyte/pull/79065) | Update dependencies |
| 0.0.52 | 2026-04-28 | [77510](https://github.com/airbytehq/airbyte/pull/77510) | Update dependencies |
| 0.0.51 | 2026-04-21 | [76793](https://github.com/airbytehq/airbyte/pull/76793) | Update dependencies |
| 0.0.50 | 2026-03-31 | [75859](https://github.com/airbytehq/airbyte/pull/75859) | Update dependencies |
| 0.0.49 | 2026-03-24 | [75373](https://github.com/airbytehq/airbyte/pull/75373) | Update dependencies |
| 0.0.48 | 2026-03-10 | [74669](https://github.com/airbytehq/airbyte/pull/74669) | Update dependencies |
| 0.0.47 | 2026-03-03 | [74158](https://github.com/airbytehq/airbyte/pull/74158) | Update dependencies |
| 0.0.46 | 2026-02-17 | [73505](https://github.com/airbytehq/airbyte/pull/73505) | Update dependencies |
| 0.0.45 | 2026-02-03 | [72607](https://github.com/airbytehq/airbyte/pull/72607) | Update dependencies |
| 0.0.44 | 2026-01-20 | [72067](https://github.com/airbytehq/airbyte/pull/72067) | Update dependencies |
| 0.0.43 | 2026-01-14 | [71441](https://github.com/airbytehq/airbyte/pull/71441) | Update dependencies |
| 0.0.42 | 2025-12-18 | [70730](https://github.com/airbytehq/airbyte/pull/70730) | Update dependencies |
| 0.0.41 | 2025-11-25 | [70101](https://github.com/airbytehq/airbyte/pull/70101) | Update dependencies |
| 0.0.40 | 2025-11-18 | [69644](https://github.com/airbytehq/airbyte/pull/69644) | Update dependencies |
| 0.0.39 | 2025-10-29 | [68927](https://github.com/airbytehq/airbyte/pull/68927) | Update dependencies |
| 0.0.38 | 2025-10-21 | [68343](https://github.com/airbytehq/airbyte/pull/68343) | Update dependencies |
| 0.0.37 | 2025-10-14 | [67934](https://github.com/airbytehq/airbyte/pull/67934) | Update dependencies |
| 0.0.36 | 2025-10-07 | [67320](https://github.com/airbytehq/airbyte/pull/67320) | Update dependencies |
| 0.0.35 | 2025-09-30 | [66445](https://github.com/airbytehq/airbyte/pull/66445) | Update dependencies |
| 0.0.34 | 2025-09-09 | [65717](https://github.com/airbytehq/airbyte/pull/65717) | Update dependencies |
| 0.0.33 | 2025-08-24 | [65416](https://github.com/airbytehq/airbyte/pull/65416) | Update dependencies |
| 0.0.32 | 2025-08-10 | [64811](https://github.com/airbytehq/airbyte/pull/64811) | Update dependencies |
| 0.0.31 | 2025-08-02 | [64378](https://github.com/airbytehq/airbyte/pull/64378) | Update dependencies |
| 0.0.30 | 2025-07-26 | [64077](https://github.com/airbytehq/airbyte/pull/64077) | Update dependencies |
| 0.0.29 | 2025-07-20 | [63664](https://github.com/airbytehq/airbyte/pull/63664) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63227](https://github.com/airbytehq/airbyte/pull/63227) | Update dependencies |
| 0.0.27 | 2025-07-05 | [62692](https://github.com/airbytehq/airbyte/pull/62692) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62243](https://github.com/airbytehq/airbyte/pull/62243) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61760](https://github.com/airbytehq/airbyte/pull/61760) | Update dependencies |
| 0.0.24 | 2025-06-15 | [61203](https://github.com/airbytehq/airbyte/pull/61203) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60779](https://github.com/airbytehq/airbyte/pull/60779) | Update dependencies |
| 0.0.22 | 2025-05-10 | [59919](https://github.com/airbytehq/airbyte/pull/59919) | Update dependencies |
| 0.0.21 | 2025-05-04 | [59563](https://github.com/airbytehq/airbyte/pull/59563) | Update dependencies |
| 0.0.20 | 2025-04-26 | [58921](https://github.com/airbytehq/airbyte/pull/58921) | Update dependencies |
| 0.0.19 | 2025-04-19 | [58565](https://github.com/airbytehq/airbyte/pull/58565) | Update dependencies |
| 0.0.18 | 2025-04-12 | [57382](https://github.com/airbytehq/airbyte/pull/57382) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56859](https://github.com/airbytehq/airbyte/pull/56859) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56309](https://github.com/airbytehq/airbyte/pull/56309) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55641](https://github.com/airbytehq/airbyte/pull/55641) | Update dependencies |
| 0.0.14 | 2025-03-01 | [55098](https://github.com/airbytehq/airbyte/pull/55098) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54461](https://github.com/airbytehq/airbyte/pull/54461) | Update dependencies |
| 0.0.12 | 2025-02-15 | [54026](https://github.com/airbytehq/airbyte/pull/54026) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53534](https://github.com/airbytehq/airbyte/pull/53534) | Update dependencies |
| 0.0.10 | 2025-02-01 | [53039](https://github.com/airbytehq/airbyte/pull/53039) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52456](https://github.com/airbytehq/airbyte/pull/52456) | Update dependencies |
| 0.0.8 | 2025-01-18 | [52011](https://github.com/airbytehq/airbyte/pull/52011) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51384](https://github.com/airbytehq/airbyte/pull/51384) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50767](https://github.com/airbytehq/airbyte/pull/50767) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50347](https://github.com/airbytehq/airbyte/pull/50347) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49768](https://github.com/airbytehq/airbyte/pull/49768) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49379](https://github.com/airbytehq/airbyte/pull/49379) | Update dependencies |
| 0.0.2 | 2024-12-11 | [49121](https://github.com/airbytehq/airbyte/pull/49121) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1 | 2024-11-08 | | Initial release by [@parthiv11](https://github.com/parthiv11) via Connector Builder |

</details>
