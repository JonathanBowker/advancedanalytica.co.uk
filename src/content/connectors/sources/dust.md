---
generated_record: true
connector_name: Dust
connector_type: source
connector_slug: dust
connector_directory: source-dust
definition_id: 897ba953-4c86-4e5e-a7a6-e7a006087233
version: 0.0.13
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/dust
logo: /images/connectors/sources/dust.svg
logo_source_path: airbyte-integrations/connectors/source-dust/icon.svg
logo_sha256: 4e8108b7e6484cc3dc8c5d76e93524ee502326af57a0b19b02ffa3b2565efe0e
original_metadata_path: airbyte-integrations/connectors/source-dust/metadata.yaml
original_metadata_sha256: d08ac2f93d027255c1449d0b6e879a57913d6bf7c5f50cd9e8bafce312e3c532
original_document_path: docs/integrations/sources/dust.md
original_document_sha256: b30db33a7fd57672fa65a80fbbb591800132e55d48270787740ba4170dac349a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f93d49d8625ca62a74a91833a4d9058bd1884ce6c1899e9cb8f97127ff78fdbb
rewritten_at: 2026-11-12T13:35:30.481480+00:00
---

# Dust
Build custom, context-aware AI assistants without writing code. Dust AI is an enterprise AI platform and &quot;operating system&quot; for teams.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `end_date` | `string` | End Date. The end date for the extracted data in YYYY-MM-DD format |  |
| `start_date` | `string` | Start Date. The start date for data extraction in YYYY-MM-DD format |  |
| `bearer_token` | `string` | Bearer Token. Token needed for authentication to dust |  |
| `workspace_id` | `string` | Workspace ID. Unique string identifier for the workspace |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| usage_metrics | date | No pagination | ✅ |  ✅  |
| active_users | date | No pagination | ✅ |  ✅  |
| source | date.source | No pagination | ✅ |  ✅  |
| tool_usage | date.toolName | No pagination | ✅ |  ✅  |
| skill_usage | date.skillName | No pagination | ✅ |  ✅  |
| agents | agentId | No pagination | ✅ |  ❌  |
| users | userId.snapshot_date | No pagination | ✅ |  ✅  |
| messages | messageId | No pagination | ✅ |  ✅  |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.13 | 2026-11-10 | [91500](https://github.com/airbytehq/airbyte/pull/91500) | Update dependencies |
| 0.0.12 | 2026-11-03 | [90530](https://github.com/airbytehq/airbyte/pull/90530) | Update dependencies |
| 0.0.11 | 2026-10-27 | [87835](https://github.com/airbytehq/airbyte/pull/87835) | Update dependencies |
| 0.0.10 | 2026-09-29 | [87154](https://github.com/airbytehq/airbyte/pull/87154) | Update dependencies |
| 0.0.9 | 2026-09-22 | [86619](https://github.com/airbytehq/airbyte/pull/86619) | Update dependencies |
| 0.0.8 | 2026-09-15 | [86040](https://github.com/airbytehq/airbyte/pull/86040) | Update dependencies |
| 0.0.7 | 2026-09-08 | [85486](https://github.com/airbytehq/airbyte/pull/85486) | Update dependencies |
| 0.0.6 | 2026-08-26 | [85031](https://github.com/airbytehq/airbyte/pull/85031) | Enable acceptance tests |
| 0.0.5 | 2026-08-18 | [84577](https://github.com/airbytehq/airbyte/pull/84577) | Update dependencies |
| 0.0.4 | 2026-08-11 | [83911](https://github.com/airbytehq/airbyte/pull/83911) | Update dependencies |
| 0.0.3 | 2026-08-04 | [83458](https://github.com/airbytehq/airbyte/pull/83458) | Update dependencies |
| 0.0.2 | 2026-07-28 | [82897](https://github.com/airbytehq/airbyte/pull/82897) | Update dependencies |
| 0.0.1 | 2026-07-02 | [81402](https://github.com/airbytehq/airbyte/pull/81402) | Initial release by [@Ella6882](https://github.com/Ella6882) via Connector Builder |

</details>
