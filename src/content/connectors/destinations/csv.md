---
generated_record: true
connector_name: Local CSV
connector_type: destination
connector_slug: csv
connector_directory: destination-csv
definition_id: 8be1cf83-fde1-477f-a4ad-318d23c9f3c6
version: 1.0.2
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/csv
logo: /images/connectors/destinations/csv.svg
logo_source_path: airbyte-integrations/connectors/destination-csv/icon.svg
logo_sha256: f99fc62acad2b808b3a138c4b946e5415edc6cfe26000e37e46e373cd76244d0
original_metadata_path: airbyte-integrations/connectors/destination-csv/metadata.yaml
original_metadata_sha256: 6e278d0fa7af95a7f35c0fe29dfafd64baff1afa6e3f2b38a8eedb6a4db61b92
original_document_path: docs/integrations/destinations/csv.md
original_document_sha256: 5416a7aa6f5b5f8c436f9be7c61fc6fab28b76ff12f0c14a7a905c5eeee32dcc
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 285e4681dab8f23edbd73e64d541352bee88421b148093e1fcfb97e7cc563477
rewritten_at: 2026-11-12T14:04:16.041214+00:00
---

# Local CSV

:::danger

Use this destination on a local workstation. It won't work on Kubernetes.

:::

## Overview

Data is written to a directory on the _local_ filesystem of the host running Airbyte. By default, it is written to `/tmp/airbyte_local`. To change this location, modify the `LOCAL_ROOT` environment variable for Airbyte.

:::caution

Ensure Docker Desktop can access `/tmp`. On MacOS, it must also access `/private` because /tmp links to /private. Otherwise, it won't work. Allow access through "File sharing" in `Settings -> Resources -> File sharing -> add the one or two above folder`, then select the "Apply & restart" button.

:::

### Sync overview

#### Output schema

Each stream is written to its own file. Each file contains 3 columns:

- `_airbyte_ab_id`: a UUID assigned by Airbyte to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a JSON blob containing the event data.

#### Performance considerations

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

Docker mounts the local mount at `LOCAL_ROOT`. This means `/local` is replaced with `/tmp/airbyte_local` by default.

### Example

- If `destination_path` is set to `/local/cars/models`,
- and the local mount uses the `/tmp/airbyte_local` default,
- then all data is written to the `/tmp/airbyte_local/cars/models` directory.

## Access replicated data files

If your Airbyte instance runs on this computer, open [file:///tmp/airbyte_local](file:///tmp/airbyte_local) in your browser to view replicated data locally. If that fails, or Airbyte runs on a remote server, follow these steps to access the replicated files:

1. Access the scheduler container using `docker exec -it airbyte-server bash`
2. Go to the default local mount using `cd /tmp/airbyte_local`
3. Go to the replicated file directory you specified when creating the destination, using `cd /{destination_path}`
4. List files containing the replicated data using `ls`
5. Run `cat {filename}` to display data from a specific file

To copy the output file to your host machine's current working directory, use this command:

```text
docker cp airbyte-server:/tmp/airbyte_local/{destination_path}/{filename}.csv .
```

Note: If Airbyte runs on Windows with Docker backed by WSL2, follow similar steps or see [link](/integrations/locating-files-local-destination) for an alternative approach.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
|:--------|:-----------|:---------------------------------------------------------|:--------------------------------------------------------------------------------|
| 1.0.2   | 2025-03-21 | [55906](https://github.com/airbytehq/airbyte/pull/55906) | Upgrade to airbyte/java-connector-base:2.0.1 for M4 compatibility.              |
| 1.0.1   | 2024-12-18 | [49864](https://github.com/airbytehq/airbyte/pull/49864) | Use a base image: airbyte/java-connector-base:1.0.0                             |
| 1.0.0   | 2022-12-20 | [17998](https://github.com/airbytehq/airbyte/pull/17998) | Breaking changes: non backwards compatible. Adds delimiter dropdown.            |
| 0.2.10  | 2022-06-20 | [13932](https://github.com/airbytehq/airbyte/pull/13932) | Merging published connector changes                                             |
| 0.2.9   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add ExitOnOutOfMemoryError to java connectors and bump versions                 |
| 0.2.8   | 2021-07-21 | [3555](https://github.com/airbytehq/airbyte/pull/3555)   | Checkpointing: Partial Success in BufferedStreamConsumer (Destination)          |
| 0.2.7   | 2021-06-09 | [3973](https://github.com/airbytehq/airbyte/pull/3973)   | add AIRBYTE_ENTRYPOINT for kubernetes support                                   |
| 0.2.6   | 2021-05-25 | [3290](https://github.com/airbytehq/airbyte/pull/3290)   | Checkpointing: Worker use destination (instead of source) for state             |
| 0.2.5   | 2021-05-10 | [3327](https://github.com/airbytehq/airbyte/pull/3327)   | don't split lines on LSEP unicode characters when reading lines in destinations |
| 0.2.4   | 2021-05-10 | [3289](https://github.com/airbytehq/airbyte/pull/3289)   | bump all destination versions to support outputting messages                    |
| 0.2.3   | 2021-03-31 | [2668](https://github.com/airbytehq/airbyte/pull/2668)   | Add SupportedDestinationSyncModes to destination specs objects                  |
| 0.2.2   | 2021-03-19 | [2460](https://github.com/airbytehq/airbyte/pull/2460)   | Destinations supports destination sync mode                                     |
| 0.2.0   | 2021-03-09 | [2238](https://github.com/airbytehq/airbyte/pull/2238)   | Upgrade all connectors (0.2.0) so protocol allows future / unknown properties   |
| 0.1.8   | 2021-01-29 | [1882](https://github.com/airbytehq/airbyte/pull/1882)   | Local File Destinations UX change with destination paths                        |
| 0.1.7   | 2021-01-20 | [1737](https://github.com/airbytehq/airbyte/pull/1737)   | Rename destination tables                                                       |
| 0.1.6   | 2021-01-19 | [1708](https://github.com/airbytehq/airbyte/pull/1708)   | Add metadata prefix to destination internal columns                             |
| 0.1.5   | 2020-12-12 | [1294](https://github.com/airbytehq/airbyte/pull/1294)   | Incremental CSV destination                                                     |
| 0.1.4   | 2020-11-30 | [1038](https://github.com/airbytehq/airbyte/pull/1038)   | Change jdbc sources to discover more than standard schemas                      |
| 0.1.3   | 2020-11-20 | [1021](https://github.com/airbytehq/airbyte/pull/1021)   | Incremental Docs and Data Model Update                                          |
| 0.1.2   | 2020-11-18 | [998](https://github.com/airbytehq/airbyte/pull/998)     | Adding incremental to the data model                                            |
| 0.1.1   | 2020-11-10 | [895](https://github.com/airbytehq/airbyte/pull/895)     | bump versions: all destinations and source exchange rate                        |
| 0.1.0   | 2020-10-21 | [676](https://github.com/airbytehq/airbyte/pull/676)     | Integrations Reorganization: Connectors                                         |

</details>
