---
generated_record: true
connector_name: float
connector_type: source
connector_slug: float
connector_directory: source-float
definition_id: 4f755eb9-6e1a-4b0e-bc1e-26b9f5d3ca4c
version: 0.1.10
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/float
logo: /images/connectors/sources/float.svg
logo_source_path: airbyte-integrations/connectors/source-float/icon.svg
logo_sha256: 45cc7586eeb4ed73438c0fa433d2c7af9d9caac7325af0e8b3a5427438d69797
original_metadata_path: airbyte-integrations/connectors/source-float/metadata.yaml
original_metadata_sha256: 0a8d840bad83a021005b2286d6cb83a71e84446fa52770398e510941793a6c20
original_document_path: docs/integrations/sources/float.md
original_document_sha256: b8b46c44b95f86c053a8ae3245a7ccb85dd46138a4cd53751b0547db5676f065
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 961430ad5b30d2063e294bcf1535fc06d9ad5191623b327f1a73c9e11dc9df58
rewritten_at: 2026-11-12T13:37:52.141401+00:00
---

# Float

Keep resource schedules and project plans up to date across your tools. Float.com helps teams plan and allocate resources, manage availability and track project timelines. This connector automates data flow between Float and other platforms.

## Prerequisites

- A Float API token. Generate it from your Float **Account Settings** page. It grants API access for the account owner, so treat it like a password.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `access_token` | `string` | Float Access Token. API token obtained from your Float Account Settings page |  |
| `start_date` | `datetime` | Start Date. | |
| `end_date` | `string` | End Date (YYYY-MM-DD). Used by the reports streams. Defaults to today if not set. | |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| accounts | account_id | DefaultPaginator | ✅ |  ❌  |
| departments | department_id | DefaultPaginator | ✅ |  ❌  |
| people | people_id | DefaultPaginator | ✅ |  ❌  |
| roles | id | DefaultPaginator | ✅ |  ❌  |
| public_holidays | id | DefaultPaginator | ✅ |  ❌  |
| holidays | holiday_id | DefaultPaginator | ✅ |  ❌  |
| projects | project_id | DefaultPaginator | ✅ |  ❌  |
| status | status_id | DefaultPaginator | ✅ |  ❌  |
| time_off | timeoff_id | DefaultPaginator | ✅ |  ❌  |
| timeoff-types | timeoff_type_id | DefaultPaginator | ✅ |  ❌  |
| clients | client_id | DefaultPaginator | ✅ |  ❌  |
| phases | phase_id | DefaultPaginator | ✅ |  ❌  |
| project-tasks | task_meta_id | DefaultPaginator | ✅ |  ❌  |
| milestones | milestone_id | DefaultPaginator | ✅ |  ❌  |
| tasks | task_id | DefaultPaginator | ✅ |  ❌  |
| logged-time | logged_time_id | DefaultPaginator | ✅ |  ✅  |
| reports-people | people_id | No pagination | ✅ |  ❌  |
| reports-projects | project_id | No pagination | ✅ |  ❌  |

### Report streams

`reports-people` and `reports-projects` return one aggregated row for each person or project. Each row covers the configured `start_date`..`end_date` window and is calculated at sync time. These rows are snapshots, not history. The underlying schedule changes, so the same row can contain different numbers after the next sync. Each record includes the `start_date` and `end_date` used to calculate it, making each snapshot clear.

Use **full refresh | overwrite** for these streams. With **append**, you collect one snapshot per sync. This is only useful if you keep `end_date` to distinguish each snapshot.

Set `end_date` on or after `start_date`. Float doesn't document how it handles an inverted range. Results are therefore unspecified, rather than empty.

## Rate limits

Float allows each company up to 200 GET requests per minute for primary data endpoints. Reports endpoints allow 30 requests per minute. The `reports-people` and `reports-projects` streams use the reports endpoints. Requests above these limits return a `429` error. For details, see [Float's rate limiting documentation](https://developer.float.com/overview_authentication.html#rate-limiting).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.1.10 | 2026-11-10 | [91504](https://github.com/airbytehq/airbyte/pull/91504) | Update dependencies |
| 0.1.9 | 2026-11-03 | [90562](https://github.com/airbytehq/airbyte/pull/90562) | Update dependencies |
| 0.1.8 | 2026-10-27 | [89887](https://github.com/airbytehq/airbyte/pull/89887) | Update dependencies |
| 0.1.7 | 2026-10-20 | [89227](https://github.com/airbytehq/airbyte/pull/89227) | Update dependencies |
| 0.1.6 | 2026-10-13 | [88600](https://github.com/airbytehq/airbyte/pull/88600) | Update dependencies |
| 0.1.5 | 2026-10-06 | [87853](https://github.com/airbytehq/airbyte/pull/87853) | Update dependencies |
| 0.1.4 | 2026-09-29 | [87152](https://github.com/airbytehq/airbyte/pull/87152) | Update dependencies |
| 0.1.3 | 2026-09-22 | [86610](https://github.com/airbytehq/airbyte/pull/86610) | Update dependencies |
| 0.1.2 | 2026-09-15 | [86039](https://github.com/airbytehq/airbyte/pull/86039) | Update dependencies |
| 0.1.1 | 2026-09-08 | [85474](https://github.com/airbytehq/airbyte/pull/85474) | Update dependencies |
| 0.1.0 | 2026-08-24 | [79087](https://github.com/airbytehq/airbyte/pull/79087) | Add reports-people and reports-projects streams |
| 0.0.57 | 2026-08-18 | [84594](https://github.com/airbytehq/airbyte/pull/84594) | Update dependencies |
| 0.0.56 | 2026-08-11 | [83947](https://github.com/airbytehq/airbyte/pull/83947) | Update dependencies |
| 0.0.55 | 2026-08-04 | [83470](https://github.com/airbytehq/airbyte/pull/83470) | Update dependencies |
| 0.0.54 | 2026-07-28 | [82915](https://github.com/airbytehq/airbyte/pull/82915) | Update dependencies |
| 0.0.53 | 2026-07-21 | [82404](https://github.com/airbytehq/airbyte/pull/82404) | Update dependencies |
| 0.0.52 | 2026-07-14 | [81838](https://github.com/airbytehq/airbyte/pull/81838) | Update dependencies |
| 0.0.51 | 2026-06-30 | [81050](https://github.com/airbytehq/airbyte/pull/81050) | Update dependencies |
| 0.0.50 | 2026-06-23 | [80434](https://github.com/airbytehq/airbyte/pull/80434) | Update dependencies |
| 0.0.49 | 2026-06-16 | [79836](https://github.com/airbytehq/airbyte/pull/79836) | Update dependencies |
| 0.0.48 | 2026-06-09 | [79307](https://github.com/airbytehq/airbyte/pull/79307) | Update dependencies |
| 0.0.47 | 2026-06-02 | [78694](https://github.com/airbytehq/airbyte/pull/78694) | Update dependencies |
| 0.0.46 | 2026-04-28 | [77259](https://github.com/airbytehq/airbyte/pull/77259) | Update dependencies |
| 0.0.45 | 2026-04-21 | [75761](https://github.com/airbytehq/airbyte/pull/75761) | Update dependencies |
| 0.0.44 | 2026-03-17 | [74646](https://github.com/airbytehq/airbyte/pull/74646) | Update dependencies |
| 0.0.43 | 2026-02-24 | [73775](https://github.com/airbytehq/airbyte/pull/73775) | Update dependencies |
| 0.0.42 | 2026-02-17 | [72559](https://github.com/airbytehq/airbyte/pull/72559) | Update dependencies |
| 0.0.41 | 2026-01-20 | [71664](https://github.com/airbytehq/airbyte/pull/71664) | Update dependencies |
| 0.0.40 | 2025-12-18 | [70590](https://github.com/airbytehq/airbyte/pull/70590) | Update dependencies |
| 0.0.39 | 2025-11-25 | [69997](https://github.com/airbytehq/airbyte/pull/69997) | Update dependencies |
| 0.0.38 | 2025-11-18 | [69447](https://github.com/airbytehq/airbyte/pull/69447) | Update dependencies |
| 0.0.37 | 2025-10-29 | [68837](https://github.com/airbytehq/airbyte/pull/68837) | Update dependencies |
| 0.0.36 | 2025-10-21 | [68453](https://github.com/airbytehq/airbyte/pull/68453) | Update dependencies |
| 0.0.35 | 2025-10-14 | [68042](https://github.com/airbytehq/airbyte/pull/68042) | Update dependencies |
| 0.0.34 | 2025-10-07 | [67294](https://github.com/airbytehq/airbyte/pull/67294) | Update dependencies |
| 0.0.33 | 2025-09-30 | [66770](https://github.com/airbytehq/airbyte/pull/66770) | Update dependencies |
| 0.0.32 | 2025-09-24 | [65798](https://github.com/airbytehq/airbyte/pull/65798) | Update dependencies |
| 0.0.31 | 2025-08-23 | [65301](https://github.com/airbytehq/airbyte/pull/65301) | Update dependencies |
| 0.0.30 | 2025-08-09 | [64776](https://github.com/airbytehq/airbyte/pull/64776) | Update dependencies |
| 0.0.29 | 2025-08-02 | [64370](https://github.com/airbytehq/airbyte/pull/64370) | Update dependencies |
| 0.0.28 | 2025-07-26 | [63937](https://github.com/airbytehq/airbyte/pull/63937) | Update dependencies |
| 0.0.27 | 2025-07-19 | [63595](https://github.com/airbytehq/airbyte/pull/63595) | Update dependencies |
| 0.0.26 | 2025-07-17 | [63315](https://github.com/airbytehq/airbyte/pull/63315) | source-float contribution from cvd |
| 0.0.25 | 2025-07-12 | [63025](https://github.com/airbytehq/airbyte/pull/63025) | Update dependencies |
| 0.0.24 | 2025-07-05 | [62759](https://github.com/airbytehq/airbyte/pull/62759) | Update dependencies |
| 0.0.23 | 2025-06-28 | [62314](https://github.com/airbytehq/airbyte/pull/62314) | Update dependencies |
| 0.0.22 | 2025-06-21 | [61955](https://github.com/airbytehq/airbyte/pull/61955) | Update dependencies |
| 0.0.21 | 2025-06-14 | [60401](https://github.com/airbytehq/airbyte/pull/60401) | Update dependencies |
| 0.0.20 | 2025-05-10 | [59937](https://github.com/airbytehq/airbyte/pull/59937) | Update dependencies |
| 0.0.19 | 2025-05-03 | [58908](https://github.com/airbytehq/airbyte/pull/58908) | Update dependencies |
| 0.0.18 | 2025-04-19 | [57837](https://github.com/airbytehq/airbyte/pull/57837) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57258](https://github.com/airbytehq/airbyte/pull/57258) | Update dependencies |
| 0.0.16 | 2025-03-29 | [56533](https://github.com/airbytehq/airbyte/pull/56533) | Update dependencies |
| 0.0.15 | 2025-03-22 | [55942](https://github.com/airbytehq/airbyte/pull/55942) | Update dependencies |
| 0.0.14 | 2025-03-08 | [55330](https://github.com/airbytehq/airbyte/pull/55330) | Update dependencies |
| 0.0.13 | 2025-03-01 | [54994](https://github.com/airbytehq/airbyte/pull/54994) | Update dependencies |
| 0.0.12 | 2025-02-22 | [54402](https://github.com/airbytehq/airbyte/pull/54402) | Update dependencies |
| 0.0.11 | 2025-02-15 | [53710](https://github.com/airbytehq/airbyte/pull/53710) | Update dependencies |
| 0.0.10 | 2025-02-08 | [53364](https://github.com/airbytehq/airbyte/pull/53364) | Update dependencies |
| 0.0.9 | 2025-02-01 | [52797](https://github.com/airbytehq/airbyte/pull/52797) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52377](https://github.com/airbytehq/airbyte/pull/52377) | Update dependencies |
| 0.0.7 | 2025-01-18 | [51647](https://github.com/airbytehq/airbyte/pull/51647) | Update dependencies |
| 0.0.6 | 2025-01-11 | [51067](https://github.com/airbytehq/airbyte/pull/51067) | Update dependencies |
| 0.0.5 | 2024-12-28 | [50552](https://github.com/airbytehq/airbyte/pull/50552) | Update dependencies |
| 0.0.4 | 2024-12-21 | [50033](https://github.com/airbytehq/airbyte/pull/50033) | Update dependencies |
| 0.0.3 | 2024-12-14 | [49476](https://github.com/airbytehq/airbyte/pull/49476) | Update dependencies |
| 0.0.2 | 2024-12-12 | [48211](https://github.com/airbytehq/airbyte/pull/48211) | Update dependencies |
| 0.0.1 | 2024-10-23 | | Initial release by [@bala-ceg](https://github.com/bala-ceg) via Connector Builder |

</details>
