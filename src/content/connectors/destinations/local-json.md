---
generated_record: true
connector_name: Local JSON
connector_type: destination
connector_slug: local-json
connector_directory: destination-local-json
definition_id: a625d593-bba5-4a1c-a53d-2d246268a816
version: 0.2.13
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/local-json
logo: /images/connectors/destinations/local-json.svg
logo_source_path: airbyte-integrations/connectors/destination-local-json/icon.svg
logo_sha256: 1fe61e3b9d9492e04167272eed1aec716053ac11741a085fddc6642a7d46f61a
original_metadata_path: airbyte-integrations/connectors/destination-local-json/metadata.yaml
original_metadata_sha256: 1c74d755eae46df419d7a8fff5ec1b191243868b20f3ec60b89aa63beaaef329
original_document_path: docs/integrations/destinations/local-json.md
original_document_sha256: 4901ca246cd95d8b5dde015dac2406b4b2c66484e2112dab98cdfb152abfc6e2
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7c97aa9057ec36e423b6cd577894e9c129a5e3c349d06ee9505782a16d7068ac
rewritten_at: 2026-11-12T14:03:56.001812+00:00
---

# Local JSON

:::danger

Use this destination on a local workstation. It won't work on Kubernetes.

:::

## Overview

This destination writes data to the _local_ filesystem of the host running Airbyte. Data is written to `/tmp/airbyte_local` by default. To change this location, modify Airbyte's `LOCAL_ROOT` environment variable.

### Sync overview

#### Output schema

Each stream is written to its own file. Each file contains a collection of `json` objects with three fields:

- `_airbyte_ab_id`: a uuid that Airbyte assigns to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a json blob containing the extracted data.

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

Docker mounts the local mount at `LOCAL_ROOT`. Therefore, `/local` is substituted with `/tmp/airbyte_local` by default.

:::caution

Make sure Docker Desktop can access `/tmp` and `/private` on MacOS. The /tmp symlink points to /private, so access won't work otherwise. Allow access through "File sharing" in `Settings -> Resources -> File sharing -> add the one or two above folder`, then select the "Apply & restart" button.

:::

### Example

- Set `destination_path` to `/local/cars/models`.
- Use the `/tmp/airbyte_local` default for the local mount.
- All data is then written to the `/tmp/airbyte_local/cars/models` directory.

## Access replicated files

If Airbyte runs on your computer, open [file:///tmp/airbyte_local](file:///tmp/airbyte_local) in your browser to view the replicated data locally. If that fails, or Airbyte runs remotely, follow these steps to access the replicated files:

1. Access the scheduler container using `docker exec -it airbyte-server bash`.
2. Go to the default local mount using `cd /tmp/airbyte_local`.
3. Go to the replicated file directory specified when you created the destination, using `cd /{destination_path}`.
4. List files containing the replicated data using `ls`.
5. Run `cat {filename}` to display the data in a specific file.

You can also copy the output file to your host machine. This command copies it to your current working directory:

```text
docker cp airbyte-server:/tmp/airbyte_local/{destination_path}/{filename}.jsonl .
```

Note: If you run Airbyte on Windows using Docker backed by WSL2, follow similar steps or see [link](/integrations/locating-files-local-destination) for another approach.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                      |
| :------ | :--------- | :------------------------------------------------------- | :--------------------------- |
| 0.2.13 | 2025-03-24 | [56355](https://github.com/airbytehq/airbyte/pull/56355) | Upgrade to airbyte/java-connector-base:2.0.1 to be M4 compatible. |
| 0.2.12 | 2024-12-18 | [49908](https://github.com/airbytehq/airbyte/pull/49908) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.2.11 | 2022-02-14 | [14641](https://github.com/airbytehq/airbyte/pull/14641) | Include lifecycle management |

</details>
