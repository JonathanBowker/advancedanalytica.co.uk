---
generated_record: true
connector_name: Claude
connector_type: source
connector_slug: claude
connector_directory: source-claude
definition_id: c4654197-3155-4a8a-95e2-a1dd1f8cff5b
version: 0.0.15
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/claude
logo: /images/connectors/sources/claude.svg
logo_source_path: airbyte-integrations/connectors/source-claude/icon.svg
logo_sha256: ecb2f23cd911bf58018d1119846d2c4981b6bbaf32c0b90a072e6ea768baa65b
original_metadata_path: airbyte-integrations/connectors/source-claude/metadata.yaml
original_metadata_sha256: d4ff67033093b6e1f23070ec8c7ee8fd57994dda696920e14f931356f0cf12fc
original_document_path: docs/integrations/sources/claude.md
original_document_sha256: f2346c4b4104583e9e4964a1ce9c35121623559e2de91c7754771cbf9dbfd098
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: cf30aa197816d3d5374887524166dc9ecd88c5913e0a4bceecbfea844f8e6dfb
rewritten_at: 2026-11-12T13:33:31.461733+00:00
---

# Claude
Designed for Claude Platform users, this API gives you programmatic access to daily aggregated usage metrics.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Claude organization-level Analytics API key (read:analytics scope) |  |
| `end_date` | `string` | End Date. Optional end date override in YYYY-MM-DD format (capped at 3 days ago UTC for engagement streams; cost/usage default to today UTC) |  |
| `start_date` | `string` | Start Date. Start date for data extraction in YYYY-MM-DD format | 2026-01-01 |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| users | user_id.date | DefaultPaginator | ✅ |  ✅  |
| chat_projects | project_id.date | DefaultPaginator | ✅ |  ✅  |
| skills | skill_name.date | DefaultPaginator | ✅ |  ✅  |
| connectors | connector_name.date | DefaultPaginator | ✅ |  ✅  |
| summaries | starting_date | No pagination | ✅ |  ✅  |
| user_usage_report | date.actor_user_id.product.model | DefaultPaginator | ✅ |  ✅  |
| user_cost_report | date.actor_user_id.product.model.cost_type | DefaultPaginator | ✅ |  ✅  |
| usage_report | starting_at | DefaultPaginator | ✅ |  ✅  |
| cost_report | starting_at | DefaultPaginator | ✅ |  ✅  |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.15 | 2026-11-10 | [91402](https://github.com/airbytehq/airbyte/pull/91402) | Update dependencies |
| 0.0.14 | 2026-11-03 | [90524](https://github.com/airbytehq/airbyte/pull/90524) | Update dependencies |
| 0.0.13 | 2026-10-27 | [89837](https://github.com/airbytehq/airbyte/pull/89837) | Update dependencies |
| 0.0.12 | 2026-10-20 | [89143](https://github.com/airbytehq/airbyte/pull/89143) | Update dependencies |
| 0.0.11 | 2026-10-13 | [88580](https://github.com/airbytehq/airbyte/pull/88580) | Update dependencies |
| 0.0.10 | 2026-10-06 | [87786](https://github.com/airbytehq/airbyte/pull/87786) | Update dependencies |
| 0.0.9 | 2026-09-29 | [87131](https://github.com/airbytehq/airbyte/pull/87131) | Update dependencies |
| 0.0.8 | 2026-09-22 | [86556](https://github.com/airbytehq/airbyte/pull/86556) | Update dependencies |
| 0.0.7 | 2026-09-15 | [85998](https://github.com/airbytehq/airbyte/pull/85998) | Update dependencies |
| 0.0.6 | 2026-09-08 | [85432](https://github.com/airbytehq/airbyte/pull/85432) | Update dependencies |
| 0.0.5 | 2026-08-18 | [84546](https://github.com/airbytehq/airbyte/pull/84546) | Update dependencies |
| 0.0.4 | 2026-08-11 | [83868](https://github.com/airbytehq/airbyte/pull/83868) | Update dependencies |
| 0.0.3 | 2026-08-04 | [83403](https://github.com/airbytehq/airbyte/pull/83403) | Update dependencies |
| 0.0.2 | 2026-07-28 | [82867](https://github.com/airbytehq/airbyte/pull/82867) | Update dependencies |
| 0.0.1 | 2026-07-02 | [81401](https://github.com/airbytehq/airbyte/pull/81401) | Initial release by [@Ella6882](https://github.com/Ella6882) via Connector Builder |

</details>
