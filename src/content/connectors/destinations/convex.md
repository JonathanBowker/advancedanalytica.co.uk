---
generated_record: true
connector_name: Convex
connector_type: destination
connector_slug: convex
connector_directory: destination-convex
definition_id: 3eb4d99c-11fa-4561-a259-fc88e0c2f8f4
version: 0.2.20
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/convex
logo: /images/connectors/destinations/convex.svg
logo_source_path: airbyte-integrations/connectors/destination-convex/icon.svg
logo_sha256: 51987cfaf982a9477ca84e95d06311038d53e7f93d9a80c3bf0a4c8fc96ef713
original_metadata_path: airbyte-integrations/connectors/destination-convex/metadata.yaml
original_metadata_sha256: 74515eabe5a60237b91198532e53f3048d9f2c6c3687650797dfdbdb4786dbeb
original_document_path: docs/integrations/destinations/convex.md
original_document_sha256: 37518b7337c07c62afbf0e5371c4e469f5d443463fe8bd1d5ef2e77538266578
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3c5c9f0ab22f50981e79acb1aaefd61bc36f9226e86a636417967288cf3ee8b3
rewritten_at: 2026-11-12T13:20:43.725778+00:00
---

# Convex

Use this guide to set up the Convex destination connector and find reference information.

Get started with Convex at the [Convex website](https://convex.dev).
View your data on the [Convex dashboard](https://dashboard.convex.dev/).

## Overview

The Convex destination connector supports Full Refresh Overwrite, Full Refresh Append, Incremental Append, and Incremental Dedup. For Incremental Dedup, Convex stores a deduped snapshot but not a history table. Some other destinations that use DBT store a history table. Convex also supports Change Data Capture (CDC) and the replication of incremental deletes.

### Output schema

Each stream outputs to a table in Convex. Convex's table naming rules apply. Table names can only contain letters, digits, and underscores. They can't start with an underscore.

Each record is a [document](https://docs.convex.dev/using/types) in Convex. During sync, Convex assigns the `_id` and `_creationTime` fields.

For Incremental Dedup, primary key field names must start with a letter. They can only contain letters, digits, and underscores. Convex's streaming import API doesn't support source primary keys such as `_id`. Select a compatible primary key or use Append mode.

### Performance

Choose the sync method and frequency that match the amount of data streaming from the source. Large, frequent Full Refresh syncs may reduce performance. Prefer Incremental modes when supported, especially for large tables.
If you experience performance issues, contact [Convex support](mailto:support@convex.dev) by email or use [Discord](https://convex.dev/community).

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Get started

### Requirements

- Convex Account
- Convex Project
- Deploy key

### Set up the connector

Airbyte integration is available to all Convex developers.

On the [Convex dashboard](https://dashboard.convex.dev/), open the project and deployment you want to sync.

1. Open the Settings tab.
2. Copy the "Deployment URL" from the settings page to the `deployment_url` field in Airbyte.
3. Click "Generate a deploy key". Ensure the key has the `deployment:backups:import` permission described in the [Convex streaming import documentation](https://docs.convex.dev/production/integrations/streaming-import-export).
4. Copy the generated deploy key into the `access_key` field in Airbyte.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                           |
|:--------| :--------- | :------------------------------------------------------- | :---------------------------------------------------------------- |
| 0.2.20 | 2026-10-09 | [88404](https://github.com/airbytehq/airbyte/pull/88404) | Mark `access_key` as `airbyte_secret` (boolean instead of the string "true") |
| 0.2.19 | 2026-10-07 | [88204](https://github.com/airbytehq/airbyte/pull/88204) | Preserve checkpoint IDs and fix namespaced overwrite and dedup setup |
| 0.2.18 | 2025-05-10 | [59863](https://github.com/airbytehq/airbyte/pull/59863) | Update dependencies |
| 0.2.17 | 2025-05-03 | [59357](https://github.com/airbytehq/airbyte/pull/59357) | Update dependencies |
| 0.2.16 | 2025-04-26 | [58683](https://github.com/airbytehq/airbyte/pull/58683) | Update dependencies |
| 0.2.15 | 2025-04-19 | [58288](https://github.com/airbytehq/airbyte/pull/58288) | Update dependencies |
| 0.2.14 | 2025-04-12 | [57666](https://github.com/airbytehq/airbyte/pull/57666) | Update dependencies |
| 0.2.13 | 2025-04-05 | [57164](https://github.com/airbytehq/airbyte/pull/57164) | Update dependencies |
| 0.2.12 | 2025-03-29 | [56563](https://github.com/airbytehq/airbyte/pull/56563) | Update dependencies |
| 0.2.11 | 2025-03-22 | [56128](https://github.com/airbytehq/airbyte/pull/56128) | Update dependencies |
| 0.2.10 | 2025-03-08 | [43824](https://github.com/airbytehq/airbyte/pull/43824) | Update dependencies |
| 0.2.9 | 2025-03-03 | [55175](https://github.com/airbytehq/airbyte/pull/55175) | Update to CDK 6.0+ and baseImage 4.0.0 |
| 0.2.8 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.2.7 | 2024-07-31 | [42585](https://github.com/airbytehq/airbyte/pull/42585) | Improve error handling |
| 0.2.6 | 2024-07-09 | [41275](https://github.com/airbytehq/airbyte/pull/41275) | Update dependencies |
| 0.2.5 | 2024-07-06 | [40987](https://github.com/airbytehq/airbyte/pull/40987) | Update dependencies |
| 0.2.4 | 2024-06-25 | [40496](https://github.com/airbytehq/airbyte/pull/40496) | Update dependencies |
| 0.2.3 | 2024-06-22 | [40122](https://github.com/airbytehq/airbyte/pull/40122) | Update dependencies |
| 0.2.2 | 2024-06-04 | [39083](https://github.com/airbytehq/airbyte/pull/39083) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.1 | 2024-05-21 | [38527](https://github.com/airbytehq/airbyte/pull/38527) | [autopull] base image + poetry + up_to_date |
| 0.2.0 | 2023-05-15 | [26103](https://github.com/airbytehq/airbyte/pull/26103) | 🐛 Update Convex destination connector to fix overwrite sync mode |
| 0.1.0 | 2023-01-05 | [21287](https://github.com/airbytehq/airbyte/pull/21287) | 🎉 New Destination: Convex |

</details>
