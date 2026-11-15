---
generated_record: true
connector_name: Ruddr
connector_type: source
connector_slug: ruddr
connector_directory: source-ruddr
definition_id: 6e87d8e2-47bc-4a0a-a175-62e2b926bb07
version: 0.0.66
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/ruddr
logo: /images/connectors/sources/ruddr.svg
logo_source_path: airbyte-integrations/connectors/source-ruddr/icon.svg
logo_sha256: 8205796922de92550ef16810fdc234553507bfd2533e30b25d1518539bd3e828
original_metadata_path: airbyte-integrations/connectors/source-ruddr/metadata.yaml
original_metadata_sha256: 6b33e726a50f0c7755d66c18adec7a818878cbf829ac34c629370a4643a9c359
original_document_path: docs/integrations/sources/ruddr.md
original_document_sha256: f4638c294a4db2b35b89e6efe6e46b300dac91c7310be32e1d6ad53c735d9411
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 91f00861c568d640acc5289168500b07601810477f1a4b529a5b0db45f861ab8
rewritten_at: 2026-11-12T13:54:24.355955+00:00
---

# Ruddr
The Ruddr connector synchronises data seamlessly from Ruddr to data warehouses, lakes and other destinations. It extracts projects and analytics data to simplify your data pipelines. This supports reliable, efficient data integration for real-time insights.

## Configure Ruddr

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_token` | `string` | API Token. API token to use. Generate it in the API Keys section of your Ruddr workspace settings. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| clients | id | DefaultPaginator | ✅ |  ❌  |
| projects | id | DefaultPaginator | ✅ |  ❌  |
| project_members | id | DefaultPaginator | ✅ |  ❌  |
| project_tasks | id | DefaultPaginator | ✅ |  ❌  |
| expense_reports | id | DefaultPaginator | ✅ |  ❌  |
| expense_items | id | DefaultPaginator | ✅ |  ❌  |
| expense_categories | id | DefaultPaginator | ✅ |  ❌  |
| project_expense | id | DefaultPaginator | ✅ |  ❌  |
| project_budget_expenses | id | DefaultPaginator | ✅ |  ❌  |
| workspace members |  | DefaultPaginator | ✅ |  ❌  |
| opportunity_stages | id | DefaultPaginator | ✅ |  ❌  |
| invoices | id | DefaultPaginator | ✅ |  ❌  |
| holidays | id | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.66 | 2026-11-10 | [91691](https://github.com/airbytehq/airbyte/pull/91691) | Update dependencies |
| 0.0.65 | 2026-11-03 | [90710](https://github.com/airbytehq/airbyte/pull/90710) | Update dependencies |
| 0.0.64 | 2026-10-20 | [89380](https://github.com/airbytehq/airbyte/pull/89380) | Update dependencies |
| 0.0.63 | 2026-10-13 | [88770](https://github.com/airbytehq/airbyte/pull/88770) | Update dependencies |
| 0.0.62 | 2026-10-06 | [88023](https://github.com/airbytehq/airbyte/pull/88023) | Update dependencies |
| 0.0.61 | 2026-09-29 | [87336](https://github.com/airbytehq/airbyte/pull/87336) | Update dependencies |
| 0.0.60 | 2026-09-22 | [86813](https://github.com/airbytehq/airbyte/pull/86813) | Update dependencies |
| 0.0.59 | 2026-09-15 | [86226](https://github.com/airbytehq/airbyte/pull/86226) | Update dependencies |
| 0.0.58 | 2026-09-08 | [85658](https://github.com/airbytehq/airbyte/pull/85658) | Update dependencies |
| 0.0.57 | 2026-08-18 | [84746](https://github.com/airbytehq/airbyte/pull/84746) | Update dependencies |
| 0.0.56 | 2026-08-11 | [84109](https://github.com/airbytehq/airbyte/pull/84109) | Update dependencies |
| 0.0.55 | 2026-08-04 | [83601](https://github.com/airbytehq/airbyte/pull/83601) | Update dependencies |
| 0.0.54 | 2026-07-28 | [83097](https://github.com/airbytehq/airbyte/pull/83097) | Update dependencies |
| 0.0.53 | 2026-07-21 | [82575](https://github.com/airbytehq/airbyte/pull/82575) | Update dependencies |
| 0.0.52 | 2026-07-14 | [81981](https://github.com/airbytehq/airbyte/pull/81981) | Update dependencies |
| 0.0.51 | 2026-06-30 | [81220](https://github.com/airbytehq/airbyte/pull/81220) | Update dependencies |
| 0.0.50 | 2026-06-23 | [80652](https://github.com/airbytehq/airbyte/pull/80652) | Update dependencies |
| 0.0.49 | 2026-06-16 | [80009](https://github.com/airbytehq/airbyte/pull/80009) | Update dependencies |
| 0.0.48 | 2026-06-09 | [79511](https://github.com/airbytehq/airbyte/pull/79511) | Update dependencies |
| 0.0.47 | 2026-06-02 | [78928](https://github.com/airbytehq/airbyte/pull/78928) | Update dependencies |
| 0.0.46 | 2026-04-28 | [77411](https://github.com/airbytehq/airbyte/pull/77411) | Update dependencies |
| 0.0.45 | 2026-04-21 | [76741](https://github.com/airbytehq/airbyte/pull/76741) | Update dependencies |
| 0.0.44 | 2026-03-31 | [75847](https://github.com/airbytehq/airbyte/pull/75847) | Update dependencies |
| 0.0.43 | 2026-03-24 | [75341](https://github.com/airbytehq/airbyte/pull/75341) | Update dependencies |
| 0.0.42 | 2026-03-10 | [74700](https://github.com/airbytehq/airbyte/pull/74700) | Update dependencies |
| 0.0.41 | 2026-02-24 | [73772](https://github.com/airbytehq/airbyte/pull/73772) | Update dependencies |
| 0.0.40 | 2026-02-10 | [73185](https://github.com/airbytehq/airbyte/pull/73185) | Update dependencies |
| 0.0.39 | 2026-02-03 | [72549](https://github.com/airbytehq/airbyte/pull/72549) | Update dependencies |
| 0.0.38 | 2026-01-20 | [72100](https://github.com/airbytehq/airbyte/pull/72100) | Update dependencies |
| 0.0.37 | 2026-01-14 | [71552](https://github.com/airbytehq/airbyte/pull/71552) | Update dependencies |
| 0.0.36 | 2025-12-18 | [70734](https://github.com/airbytehq/airbyte/pull/70734) | Update dependencies |
| 0.0.35 | 2025-11-25 | [69961](https://github.com/airbytehq/airbyte/pull/69961) | Update dependencies |
| 0.0.34 | 2025-11-18 | [69650](https://github.com/airbytehq/airbyte/pull/69650) | Update dependencies |
| 0.0.33 | 2025-10-29 | [68886](https://github.com/airbytehq/airbyte/pull/68886) | Update dependencies |
| 0.0.32 | 2025-10-21 | [68431](https://github.com/airbytehq/airbyte/pull/68431) | Update dependencies |
| 0.0.31 | 2025-10-14 | [67943](https://github.com/airbytehq/airbyte/pull/67943) | Update dependencies |
| 0.0.30 | 2025-10-07 | [67226](https://github.com/airbytehq/airbyte/pull/67226) | Update dependencies |
| 0.0.29 | 2025-09-30 | [66861](https://github.com/airbytehq/airbyte/pull/66861) | Update dependencies |
| 0.0.28 | 2025-09-24 | [66637](https://github.com/airbytehq/airbyte/pull/66637) | Update dependencies |
| 0.0.27 | 2025-09-09 | [65696](https://github.com/airbytehq/airbyte/pull/65696) | Update dependencies |
| 0.0.26 | 2025-08-24 | [65472](https://github.com/airbytehq/airbyte/pull/65472) | Update dependencies |
| 0.0.25 | 2025-08-16 | [65024](https://github.com/airbytehq/airbyte/pull/65024) | Update dependencies |
| 0.0.24 | 2025-08-03 | [64473](https://github.com/airbytehq/airbyte/pull/64473) | Update dependencies |
| 0.0.23 | 2025-07-26 | [63947](https://github.com/airbytehq/airbyte/pull/63947) | Update dependencies |
| 0.0.22 | 2025-07-05 | [62688](https://github.com/airbytehq/airbyte/pull/62688) | Update dependencies |
| 0.0.21 | 2025-06-28 | [60454](https://github.com/airbytehq/airbyte/pull/60454) | Update dependencies |
| 0.0.20 | 2025-05-10 | [60089](https://github.com/airbytehq/airbyte/pull/60089) | Update dependencies |
| 0.0.19 | 2025-05-04 | [59575](https://github.com/airbytehq/airbyte/pull/59575) | Update dependencies |
| 0.0.18 | 2025-04-27 | [58996](https://github.com/airbytehq/airbyte/pull/58996) | Update dependencies |
| 0.0.17 | 2025-04-19 | [58403](https://github.com/airbytehq/airbyte/pull/58403) | Update dependencies |
| 0.0.16 | 2025-04-12 | [57948](https://github.com/airbytehq/airbyte/pull/57948) | Update dependencies |
| 0.0.15 | 2025-04-05 | [57488](https://github.com/airbytehq/airbyte/pull/57488) | Update dependencies |
| 0.0.14 | 2025-03-29 | [56749](https://github.com/airbytehq/airbyte/pull/56749) | Update dependencies |
| 0.0.13 | 2025-03-22 | [56206](https://github.com/airbytehq/airbyte/pull/56206) | Update dependencies |
| 0.0.12 | 2025-03-08 | [54612](https://github.com/airbytehq/airbyte/pull/54612) | Update dependencies |
| 0.0.11 | 2025-02-15 | [53989](https://github.com/airbytehq/airbyte/pull/53989) | Update dependencies |
| 0.0.10 | 2025-02-08 | [53478](https://github.com/airbytehq/airbyte/pull/53478) | Update dependencies |
| 0.0.9 | 2025-02-01 | [52963](https://github.com/airbytehq/airbyte/pull/52963) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52511](https://github.com/airbytehq/airbyte/pull/52511) | Update dependencies |
| 0.0.7 | 2025-01-18 | [51925](https://github.com/airbytehq/airbyte/pull/51925) | Update dependencies |
| 0.0.6 | 2025-01-11 | [51325](https://github.com/airbytehq/airbyte/pull/51325) | Update dependencies |
| 0.0.5 | 2024-12-28 | [50241](https://github.com/airbytehq/airbyte/pull/50241) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49655](https://github.com/airbytehq/airbyte/pull/49655) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49346](https://github.com/airbytehq/airbyte/pull/49346) | Update dependencies |
| 0.0.2 | 2024-12-11 | [49080](https://github.com/airbytehq/airbyte/pull/49080) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1 | 2024-11-08 | | Initial release by [@bishalbera](https://github.com/bishalbera) via Connector Builder |

</details>
