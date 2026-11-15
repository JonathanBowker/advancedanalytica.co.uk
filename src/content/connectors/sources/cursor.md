---
generated_record: true
connector_name: Cursor
connector_type: source
connector_slug: cursor
connector_directory: source-cursor
definition_id: bf8b99df-bdcf-4e90-b19e-c6f3616b5867
version: 0.0.6
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/cursor
logo: /images/connectors/sources/cursor.svg
logo_source_path: airbyte-integrations/connectors/source-cursor/icon.svg
logo_sha256: 58d7237ab77e9ed8d5f8b297577bf673b21c1fe6a1610d6f1bc8598e886d18c6
original_metadata_path: airbyte-integrations/connectors/source-cursor/metadata.yaml
original_metadata_sha256: d8273c3e98600652dc2c26e6c72fb4a5a7b7495ec438c6cc79e09079e7b20bd7
original_document_path: docs/integrations/sources/cursor.md
original_document_sha256: 0e3f93cbdfe52ec5582307fd5bce212649d56e499a63edd44c0d1c2e81ce5f4a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7adec117ddef5361d1e521c37ecad0b97f3ecd985b73df9382b96f55b9183ca4
rewritten_at: 2026-11-12T13:34:27.449202+00:00
---

# Cursor
Sync Cursor Teams usage, per-seat spend and per-event cost data from the Cursor Admin API to your warehouse. Store Cursor&#39;s rolling usage and spend window permanently, so your history grows from the day you install.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Cursor Admin API key (starts with crsr_). Create one in the Cursor dashboard under Settings &gt; Admin &gt; API Keys. |  |
| `start_date` | `string` | Start Date. UTC date to start syncing daily_usage and usage_events from, in YYYY-MM-DD format. Cursor only retains a rolling window of usage data, so dates older than that window return nothing. History accrues forward from the day you install this connector. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| members | email | No pagination | ✅ |  ❌  |
| daily_usage | date.email | No pagination | ✅ |  ✅  |
| spend | email | DefaultPaginator | ✅ |  ❌  |
| usage_events | timestamp.userEmail.model | DefaultPaginator | ✅ |  ✅  |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.6 | 2026-11-10 | [91480](https://github.com/airbytehq/airbyte/pull/91480) | Update dependencies |
| 0.0.5 | 2026-11-03 | [90504](https://github.com/airbytehq/airbyte/pull/90504) | Update dependencies |
| 0.0.4 | 2026-10-27 | [89852](https://github.com/airbytehq/airbyte/pull/89852) | Update dependencies |
| 0.0.3 | 2026-10-20 | [89181](https://github.com/airbytehq/airbyte/pull/89181) | Update dependencies |
| 0.0.2 | 2026-10-13 | [88573](https://github.com/airbytehq/airbyte/pull/88573) | Update dependencies |
| 0.0.1 | 2026-07-23 | | Initial release by [@dhlotter](https://github.com/dhlotter) via Connector Builder |

</details>
