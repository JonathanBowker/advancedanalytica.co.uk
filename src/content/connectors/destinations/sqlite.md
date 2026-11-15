---
generated_record: true
connector_name: Local SQLite
connector_type: destination
connector_slug: sqlite
connector_directory: destination-sqlite
definition_id: b76be0a6-27dc-4560-95f6-2623da0bd7b6
version: 0.2.9
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/sqlite
logo: /images/connectors/destinations/sqlite.svg
logo_source_path: airbyte-integrations/connectors/destination-sqlite/icon.svg
logo_sha256: cacaca30924e075079df7fae5342df84bfc5ea3f8c1ba27ac7fbc8b6c0619dc5
original_metadata_path: airbyte-integrations/connectors/destination-sqlite/metadata.yaml
original_metadata_sha256: 3516767d5d0c0db3cd7c2069e3c2d5479604ee3fe8a15659a8b5942fa3a9073d
original_document_path: docs/integrations/destinations/sqlite.md
original_document_sha256: 4649a138cfa30674467d0e9b0a5982c422a488c0b4e63795bcc2e8056e0698c6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 720ea3c7072a3b530dcb9fc544216a0e98cef03a432319221d326de37c74330a
rewritten_at: 2026-11-12T13:27:25.398668+00:00
---

# Sqlite

:::danger

Use this destination on a local workstation. It won't work on Kubernetes.

:::

## Overview

This destination writes data to a file on the host's _local_ filesystem. By default, it writes data to `/tmp/airbyte_local`. To change this location, modify Airbyte's `LOCAL_ROOT` environment variable.

:::caution

Make sure Docker Desktop can access `/tmp`. On MacOS, it also needs access to `/private` because /tmp links to /private. Otherwise, it won't work. Allow access through "File sharing" in `Settings -> Resources -> File sharing -> add the one or two above folder`, then select "Apply & restart".

:::

### Sync overview

#### Output schema

Each stream is written to its own `_airbyte_raw_{stream_name}` table. Each table contains three columns:

- `_airbyte_ab_id`: a uuid that Airbyte assigns to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a json blob containing the event data.

#### Performance

Your filesystem's write speed limits this integration's performance.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started

The `destination_path` always starts with `/local`, whether you specify it or not. Any directory nesting within local maps to the local mount.

By default, the `LOCAL_ROOT` env variable in the `.env` file is set to `/tmp/airbyte_local`.

Docker mounts the local mount onto `LOCAL_ROOT`. This means `/local` is replaced by `/tmp/airbyte_local` by default.

### Example

- Set `destination_path` to `/local/sqlite.db`.
- Use the `/tmp/airbyte_local` default for the local mount.
- All data is then written to `/tmp/airbyte_local/sqlite.db`.

## Access replicated data files

If Airbyte runs on your computer, open [file:///tmp/airbyte_local](file:///tmp/airbyte_local) in your browser to view the replicated data locally. If this fails, or Airbyte runs remotely, follow these steps to access the replicated files:

1. Access the scheduler container using `docker exec -it airbyte-server bash`.
2. Go to the default local mount using `cd /tmp/airbyte_local`.
3. Go to the replicated file directory specified when you created the destination, using `cd /{destination_path}`.
4. Run `sqlite3 {filename}` to access the data in a specific database file.

You can also copy the output file to your host machine. This command copies it to your current working directory:

```text
docker cp airbyte-server:/tmp/airbyte_local/{destination_path} .
```

Note: If Airbyte runs on Windows with Docker backed by WSL2, follow similar steps or see [link](/integrations/locating-files-local-destination) for an alternative approach.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                |
|:--------| :--------- | :------------------------------------------------------- | :--------------------- |
| 0.2.9 | 2025-05-10 | [59805](https://github.com/airbytehq/airbyte/pull/59805) | Update dependencies |
| 0.2.8 | 2025-05-03 | [59348](https://github.com/airbytehq/airbyte/pull/59348) | Update dependencies |
| 0.2.7 | 2025-04-26 | [58682](https://github.com/airbytehq/airbyte/pull/58682) | Update dependencies |
| 0.2.6 | 2025-04-19 | [58261](https://github.com/airbytehq/airbyte/pull/58261) | Update dependencies |
| 0.2.5 | 2025-04-12 | [57615](https://github.com/airbytehq/airbyte/pull/57615) | Update dependencies |
| 0.2.4 | 2025-04-05 | [57113](https://github.com/airbytehq/airbyte/pull/57113) | Update dependencies |
| 0.2.3 | 2025-03-29 | [56577](https://github.com/airbytehq/airbyte/pull/56577) | Update dependencies |
| 0.2.2 | 2025-03-22 | [56104](https://github.com/airbytehq/airbyte/pull/56104) | Update dependencies |
| 0.2.1 | 2025-03-08 | [43815](https://github.com/airbytehq/airbyte/pull/43815) | Update dependencies |
| 0.2.0 | 2025-03-01 | [54897](https://github.com/airbytehq/airbyte/pull/54897) | Update to Airbyte CDK 6 and Python 3.11 |
| 0.1.9 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.8 | 2024-07-09 | [41098](https://github.com/airbytehq/airbyte/pull/41098) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40944](https://github.com/airbytehq/airbyte/pull/40944) | Update dependencies |
| 0.1.6 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.1.5 | 2024-06-25 | [40323](https://github.com/airbytehq/airbyte/pull/40323) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40070](https://github.com/airbytehq/airbyte/pull/40070) | Update dependencies |
| 0.1.3 | 2024-06-04 | [38975](https://github.com/airbytehq/airbyte/pull/38975) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.2 | 2024-05-22 | [38539](https://github.com/airbytehq/airbyte/pull/38539) | [autopull] base image + poetry + up_to_date |
| 0.1.1 | 2024-05-21 | [38539](https://github.com/airbytehq/airbyte/pull/38539) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-07-25 | [15018](https://github.com/airbytehq/airbyte/pull/15018) | New SQLite destination |

</details>
