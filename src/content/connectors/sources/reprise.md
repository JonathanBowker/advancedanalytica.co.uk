---
generated_record: true
connector_name: Reprise
connector_type: source
connector_slug: reprise
connector_directory: source-reprise
definition_id: 77562b16-e56b-4135-bde6-1e87ef6a1449
version: 0.0.10
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/reprise
logo: /images/connectors/sources/reprise.svg
logo_source_path: airbyte-integrations/connectors/source-reprise/icon.svg
logo_sha256: c6198e93af33d4ea4518b1d8cacfde40ca1983128b1d8b11a6e892608e63926a
original_metadata_path: airbyte-integrations/connectors/source-reprise/metadata.yaml
original_metadata_sha256: 427f95553d6c73955dd65bd5d2aa30c21ff408399e176e645e497866516897d4
original_document_path: docs/integrations/sources/reprise.md
original_document_sha256: 4ca1ee914b16983404bbca5aa6a3cd996b6de52a632197596f5e3f9fc8b9f074
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1a315ec4889a5a4279aa2b24099b54f3e9f98facaab6be4e8fae40e29f15f987
rewritten_at: 2026-11-12T13:53:44.139069+00:00
---

# Reprise
Reprise is an enterprise-grade software platform. It lets sales, marketing and pre-sales teams build custom, interactive product tours and fully functional cloned software environments.

## Prerequisites

Your subscription must include access to the Reprise Data API. The connector reads five Tinybird pipes provisioned by Reprise for your workspace. Before setting up a connection, confirm with Reprise support that all five exist:

- `replay_session_activity` (the only pipe covered by the public [HTML Environment Data API docs](https://reprise.zendesk.com/hc/en-us/articles/18940321925659))
- `replay_session_summary`
- `replay_metrics`
- `replay_change_feed`
- `replicate_session_activity`

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_token` | `string` | API Token. Reprise portal API key (Settings &gt; API Management). Exchanged for a scoped warehouse JWT via POST https://app.getreprise.com/api/warehouse/token before each sync. |  |
| `start_time` | `string` | Start Time. Optional UTC lower bound for full refresh / first backfill of activity, summary, replicate, change_feed, and metrics (YYYY-MM-DD HH:MM:SS). Clamped to 18 months ago. Incremental activity/summary/replicate runs only re-fetch the last 3 days (lookback_window); this sets the historical floor. |  |
| `include_viewer_pii` | `boolean` | Include Viewer PII. When enabled, replicate_session_activity emits the raw viewer column (visitor email, or IP when no welcome screen is used). Disabled by default; viewer_is_internal is always emitted. | false |
| `internal_email_domains` | `string` | Internal email domains. Comma-separated email domains treated as internal for replicate_session_activity viewer_is_internal (e.g. yourcompany.com). Requires viewer_pii from the API; raw viewer is redacted by default unless include_viewer_pii is enabled. If unset, viewer_is_internal is false for all rows. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| replay_session_activity | activity_id | DefaultPaginator | ✅ |  ✅  |
| replay_session_summary | session_id | DefaultPaginator | ✅ |  ✅  |
| replay_metrics | entity_type.entity_id.window_start | DefaultPaginator | ✅ |  ✅  |
| replay_change_feed | entity_id.changed_at.change_type | DefaultPaginator | ✅ |  ✅  |
| replicate_session_activity | session_id | DefaultPaginator | ✅ |  ✅  |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.10 | 2026-11-10 | [91700](https://github.com/airbytehq/airbyte/pull/91700) | Update dependencies |
| 0.0.9 | 2026-11-03 | [90709](https://github.com/airbytehq/airbyte/pull/90709) | Update dependencies |
| 0.0.8 | 2026-10-20 | [89406](https://github.com/airbytehq/airbyte/pull/89406) | Update dependencies |
| 0.0.7 | 2026-10-13 | [88775](https://github.com/airbytehq/airbyte/pull/88775) | Update dependencies |
| 0.0.6 | 2026-10-06 | [88008](https://github.com/airbytehq/airbyte/pull/88008) | Update dependencies |
| 0.0.5 | 2026-09-29 | [87341](https://github.com/airbytehq/airbyte/pull/87341) | Update dependencies |
| 0.0.4 | 2026-09-22 | [86776](https://github.com/airbytehq/airbyte/pull/86776) | Update dependencies |
| 0.0.3 | 2026-09-15 | [86196](https://github.com/airbytehq/airbyte/pull/86196) | Update dependencies |
| 0.0.2 | 2026-09-08 | [85636](https://github.com/airbytehq/airbyte/pull/85636) | Update dependencies |
| 0.0.1 | 2026-08-18 | [84883](https://github.com/airbytehq/airbyte/pull/84883) | Initial release by [@Ella6882](https://github.com/Ella6882) via Connector Builder |

</details>
