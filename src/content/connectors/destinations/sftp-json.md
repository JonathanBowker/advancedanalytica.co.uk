---
generated_record: true
connector_name: SFTP-JSON
connector_type: destination
connector_slug: sftp-json
connector_directory: destination-sftp-json
definition_id: e9810f61-4bab-46d2-bb22-edfc902e0644
version: 0.2.16
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/sftp-json
logo: /images/connectors/destinations/sftp-json.svg
logo_source_path: airbyte-integrations/connectors/destination-sftp-json/icon.svg
logo_sha256: e19265de4d77efb8b3d9523fe7473a4d559ff445f45b57ea3ddcaefd82f3eff5
original_metadata_path: airbyte-integrations/connectors/destination-sftp-json/metadata.yaml
original_metadata_sha256: 595c9563dd749a5cbcd8bf68fde735adb577a7e6ad034b64d047fa3d5e8defb4
original_document_path: docs/integrations/destinations/sftp-json.md
original_document_sha256: 3408d430d9e95650480010292cf3f5e5590196cfb57ae44e1fb6def44c5a3d29
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 762fdd266fe555fa535db469c7025c0091502e26194ef90357f392effef835d7
rewritten_at: 2026-11-12T13:27:02.296798+00:00
---

# SFTP JSON

## Overview

This destination writes your data to a directory on an SFTP server.

### Sync overview

#### Output schema

Each stream is written to a separate file.
Each file contains `json` objects that correspond directly to the data supplied by the source.

#### Performance considerations

Performance depends on your SFTP connection speed and how quickly the server accepts writes.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Getting started

The `destination_path` can refer to any path where the associated account has write permission.

In the configuration, the `filename` **should not** have an extension because the connector adds `.jsonl`.

### Example

Set `destination_path` to `/myfolder/files` and `filename` to `mydata`. The resulting file will be `/myfolder/files/mydata.jsonl`.

You can access these files by connecting to the server through SFTP and navigating to the `destination_path`.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                           | Subject                       |
| :------ | :--------- | :----------------------------------------------------- | :---------------------------- |
| 0.2.16 | 2026-05-15 | [78111](https://github.com/airbytehq/airbyte/pull/78111) | Fixed SFTP connection checks for passwords with URI-reserved characters. |
| 0.2.15 | 2025-05-27 | [60870](https://github.com/airbytehq/airbyte/pull/60870) | Update dependencies |
| 0.2.14 | 2025-05-10 | [59809](https://github.com/airbytehq/airbyte/pull/59809) | Update dependencies |
| 0.2.13 | 2025-05-03 | [59353](https://github.com/airbytehq/airbyte/pull/59353) | Update dependencies |
| 0.2.12 | 2025-04-26 | [58727](https://github.com/airbytehq/airbyte/pull/58727) | Update dependencies |
| 0.2.11 | 2025-04-19 | [58238](https://github.com/airbytehq/airbyte/pull/58238) | Update dependencies |
| 0.2.10 | 2025-04-12 | [57592](https://github.com/airbytehq/airbyte/pull/57592) | Update dependencies |
| 0.2.9 | 2025-04-05 | [57114](https://github.com/airbytehq/airbyte/pull/57114) | Update dependencies |
| 0.2.8 | 2025-03-29 | [56615](https://github.com/airbytehq/airbyte/pull/56615) | Update dependencies |
| 0.2.7 | 2025-03-22 | [56090](https://github.com/airbytehq/airbyte/pull/56090) | Update dependencies |
| 0.2.6 | 2025-03-08 | [55369](https://github.com/airbytehq/airbyte/pull/55369) | Update dependencies |
| 0.2.5 | 2025-03-01 | [54868](https://github.com/airbytehq/airbyte/pull/54868) | Update dependencies |
| 0.2.4 | 2025-02-22 | [54265](https://github.com/airbytehq/airbyte/pull/54265) | Update dependencies |
| 0.2.3 | 2025-02-15 | [53941](https://github.com/airbytehq/airbyte/pull/53941) | Update dependencies |
| 0.2.2 | 2025-02-08 | [53405](https://github.com/airbytehq/airbyte/pull/53405) | Update dependencies |
| 0.2.1 | 2025-02-01 | [52883](https://github.com/airbytehq/airbyte/pull/52883) | Update dependencies |
| 0.2.0 | 2024-10-14 | [46873](https://github.com/airbytehq/airbyte/pull/46873) | Migrated to Poetry and Airbyte Base Image |
| 0.1.0 | 2022-11-24 | [4924](https://github.com/airbytehq/airbyte/pull/4924) | 🎉 New Destination: SFTP JSON |

</details>
