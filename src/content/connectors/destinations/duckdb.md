---
generated_record: true
connector_name: DuckDB
connector_type: destination
connector_slug: duckdb
connector_directory: destination-duckdb
definition_id: 94bd199c-2ff0-4aa2-b98e-17f0acb72610
version: 0.6.0
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/destinations/duckdb
logo: /images/connectors/destinations/duckdb.svg
logo_source_path: airbyte-integrations/connectors/destination-duckdb/icon.svg
logo_sha256: 7ad06baebed403f3b7a9225283b21aee54b84ead85508b39b80854d74a167d9a
original_metadata_path: airbyte-integrations/connectors/destination-duckdb/metadata.yaml
original_metadata_sha256: 1aa37781dceb98e2bb31087f601643864d9dcc5c47f168bb005dffcd33351937
original_document_path: docs/integrations/destinations/duckdb.md
original_document_sha256: b2474eb73ad74156d218e97e219f0e5af285a0a03fc35c2d31495337e8b9f969
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1315b9373219363d6d9685bbf3c5b3c8e2aa3368ff745f670a97430172e1eec4
rewritten_at: 2026-11-12T13:24:11.391386+00:00
---

# DuckDB

<!-- env:cloud -->

:::caution

Local file-based DBs don't work in Airbyte Cloud or Kubernetes. Use MotherDuck when running in Airbyte Cloud.

:::

<!-- /env:cloud -->

## Overview

[DuckDB](https://duckdb.org/) is an in-process SQL OLAP database management system. Use this destination locally to run analytics workloads across multiple smaller sources. These sources can include GitHub repos, social media, local CSVs or other local files. This destination writes data to the [MotherDuck](https://motherduck.com) service or a file on the host's _local_ filesystem running Airbyte.

For file-based DBs, data is written to `/tmp/airbyte_local` by default. To change the location, update Airbyte's `LOCAL_ROOT` environment variable.

## Use with MotherDuck

This DuckDB destination works with [MotherDuck](https://motherduck.com).

### Specify a MotherDuck database

To use a MotherDuck-hosted database as your destination, provide its database URI in the `destination_path` configuration option. Include the standard `md:` database prefix.

:::caution

Don't include your API token in the `md:` connection string. Your token may then appear in execution logs. Use the `MotherDuck API Key` setting instead.

:::

### Authenticate with MotherDuck

To authenticate, provide your [MotherDuck Service Credential](https://motherduck.com/docs/authenticating-to-motherduck/#syntax) as the `motherduck_api_key` configuration option.

### Sync overview

#### Output schema

Each table contains three columns:

- `_airbyte_ab_id`: a uuid that Airbyte assigns to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a json blob containing the event data.

#### Performance

Your filesystem's write speed will constrain this integration's performance.

<!-- env:oss -->

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Use local database files

The `destination_path` always starts with `/local`, whether you specify it or not. Any directory nesting within local maps to the local mount.

By default, the `LOCAL_ROOT` env variable in the `.env` file is set to `/tmp/airbyte_local`.

Docker mounts the local mount onto `LOCAL_ROOT`. By default, this substitutes `/local` with `/tmp/airbyte_local`.

:::caution

Make sure Docker Desktop can access `/tmp`. On MacOS, it must also access `/private` because /tmp links to /private. Otherwise, it won't work. Allow access through "File sharing" in `Settings -> Resources -> File sharing -> add the one or two above folder`, then select the "Apply & restart" button.

:::

### Example

- Set `destination_path` to `/local/destination.duckdb`.
- Use the `/tmp/airbyte_local` default for the local mount.
- All data will then be written to `/tmp/airbyte_local/destination.duckdb`.

## Access replicated data files

If your Airbyte instance runs on your current computer, open your browser and enter [file:///tmp/airbyte_local](file:///tmp/airbyte_local). You can then view the replicated data locally. Follow these steps if that approach fails or your Airbyte instance runs on a remote server:

1. Access the scheduler container using `docker exec -it airbyte-server bash`.
2. Go to the default local mount using `cd /tmp/airbyte_local`.
3. Go to your specified replicated file directory using `cd /{destination_path}`.
4. Run `duckdb {filename}` to access data in a specific database file.

You can also copy the output file to your host machine. The following command copies it to your current working directory:

```text
docker cp airbyte-server:/tmp/airbyte_local/{destination_path} .
```

Note: If Airbyte runs on Windows with Docker backed by WSL2, follow similar steps. Alternatively, see this [link](/integrations/locating-files-local-destination).

<!-- /env:oss -->

## Troubleshooting

### Error message `Request failed:  (UNAVAILABLE, RPC 'GET_WELCOME_PACK')`

This error may mean your DuckDB client version is incompatible with your database version. DuckDB Destination connector version 0.6.0 or later uses DuckDB 1.4.x. Your database must therefore be compatible with DuckDB 1.4.x. To fix this, manually upgrade your database or revert to an earlier DuckDB Destination connector version.

For guidance on migrating between DuckDB versions, see the [DuckDB Migration Guide](./duckdb-migrations).

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a DuckDB schema.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                                                                                                                                                                                                                                                                                                                                                |
|:--------| :--------- | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.6.0 | 2026-01-06 | [70221](https://github.com/airbytehq/airbyte/pull/70221) | Upgrade DuckDB engine to v1.4.2 (LTS release). Requires Python 3.10+. Backwards compatible with databases created using DuckDB 0.10.x or higher. |
| 0.5.1 | 2025-03-07 | [55256](https://github.com/airbytehq/airbyte/pull/55256) | Version bump to align Docker and Poetry versions |
| 0.5.0 | 2025-03-07 | [47861](https://github.com/airbytehq/airbyte/pull/47861) | Upgrade DuckDB engine version to [`v1.2.1`](https://github.com/duckdb/duckdb/releases/tag/v1.2.1) |
| 0.4.26 | 2024-10-29 | [47861](https://github.com/airbytehq/airbyte/pull/47861) | Update dependencies |
| 0.4.25 | 2024-10-28 | [47070](https://github.com/airbytehq/airbyte/pull/47070) | Update dependencies |
| 0.4.24 | 2024-10-12 | [46845](https://github.com/airbytehq/airbyte/pull/46845) | Update dependencies |
| 0.4.23 | 2024-10-05 | [46463](https://github.com/airbytehq/airbyte/pull/46463) | Update dependencies |
| 0.4.22 | 2024-09-28 | [46145](https://github.com/airbytehq/airbyte/pull/46145) | Update dependencies |
| 0.4.21 | 2024-09-21 | [45800](https://github.com/airbytehq/airbyte/pull/45800) | Update dependencies |
| 0.4.20 | 2024-09-14 | [45480](https://github.com/airbytehq/airbyte/pull/45480) | Update dependencies |
| 0.4.19 | 2024-09-07 | [45288](https://github.com/airbytehq/airbyte/pull/45288) | Update dependencies |
| 0.4.18 | 2024-08-31 | [44952](https://github.com/airbytehq/airbyte/pull/44952) | Update dependencies |
| 0.4.17 | 2024-08-24 | [44739](https://github.com/airbytehq/airbyte/pull/44739) | Update dependencies |
| 0.4.16 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.4.15 | 2024-08-17 | [44215](https://github.com/airbytehq/airbyte/pull/44215) | Update dependencies |
| 0.4.14 | 2024-08-12 | [43755](https://github.com/airbytehq/airbyte/pull/43755) | Update dependencies |
| 0.4.13 | 2024-08-10 | [43536](https://github.com/airbytehq/airbyte/pull/43536) | Update dependencies |
| 0.4.12 | 2024-08-03 | [43151](https://github.com/airbytehq/airbyte/pull/43151) | Update dependencies |
| 0.4.11 | 2024-07-27 | [42753](https://github.com/airbytehq/airbyte/pull/42753) | Update dependencies |
| 0.4.10 | 2024-07-20 | [42233](https://github.com/airbytehq/airbyte/pull/42233) | Update dependencies |
| 0.4.9 | 2024-07-13 | [41882](https://github.com/airbytehq/airbyte/pull/41882) | Update dependencies |
| 0.4.8 | 2024-07-10 | [41521](https://github.com/airbytehq/airbyte/pull/41521) | Update dependencies |
| 0.4.7 | 2024-07-09 | [41253](https://github.com/airbytehq/airbyte/pull/41253) | Update dependencies |
| 0.4.6 | 2024-07-06 | [41014](https://github.com/airbytehq/airbyte/pull/41014) | Update dependencies |
| 0.4.5 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.4.4 | 2024-06-25 | [40354](https://github.com/airbytehq/airbyte/pull/40354) | Update dependencies |
| 0.4.3 | 2024-06-23 | [40224](https://github.com/airbytehq/airbyte/pull/40224) | Update dependencies |
| 0.4.2 | 2024-06-21 | [39947](https://github.com/airbytehq/airbyte/pull/39947) | Update dependencies |
| 0.4.1 | 2024-06-04 | [38959](https://github.com/airbytehq/airbyte/pull/38959) | [autopull] Upgrade base image to v1.2.1 |
| 0.4.0   | 2024-05-30 | [#37515](https://github.com/airbytehq/airbyte/pull/37515) | Upgrade DuckDB engine version to [`v0.10.3`](https://github.com/duckdb/duckdb/releases/tag/v0.10.2).                                                                                                                                                                                                                                                                                                                                              |
| 0.3.6   | 2024-05-21 | [#38486](https://github.com/airbytehq/airbyte/pull/38486)  | [autopull] base image + poetry + up_to_date                                                                                                                                                                                                                                                                                                                                                            |
| 0.3.5   | 2024-04-23 | [#37515](https://github.com/airbytehq/airbyte/pull/37515) | Add resource requirements declaration to `metatadat.yml`.                                                                                                                                                                                                                                                                                                                                              |
| 0.3.4   | 2024-04-16 | [#36715](https://github.com/airbytehq/airbyte/pull/36715) | Improve ingestion performance using pyarrow inmem view for writing to DuckDB.                                                                                                                                                                                                                                                                                                                          |
| 0.3.3   | 2024-04-07 | [#36884](https://github.com/airbytehq/airbyte/pull/36884) | Fix stale dependency versions in lock file, add CLI for internal testing.                                                                                                                                                                                                                                                                                                                              |
| 0.3.2   | 2024-03-20 | [#32635](https://github.com/airbytehq/airbyte/pull/32635) | Instrument custom_user_agent to identify Airbyte-Motherduck connector usage.                                                                                                                                                                                                                                                                                                                           |
| 0.3.1   | 2023-11-18 | [#32635](https://github.com/airbytehq/airbyte/pull/32635) | Upgrade DuckDB version to [`v0.9.2`](https://github.com/duckdb/duckdb/releases/tag/v0.9.2).                                                                                                                                                                                                                                                                                                            |
| 0.3.0   | 2022-10-23 | [#31744](https://github.com/airbytehq/airbyte/pull/31744) | Upgrade DuckDB version to [`v0.9.1`](https://github.com/duckdb/duckdb/releases/tag/v0.9.1). **Required update for all MotherDuck users.** Note, this is a **BREAKING CHANGE** for users who may have other connections using versions of DuckDB prior to 0.9.x. See the [0.9.0 release notes](https://github.com/duckdb/duckdb/releases/tag/v0.9.0) for more information and for upgrade instructions. |
| 0.2.1   | 2022-10-20 | [#30600](https://github.com/airbytehq/airbyte/pull/30600) | Fix: schema name mapping                                                                                                                                                                                                                                                                                                                                                                               |
| 0.2.0   | 2022-10-19 | [#29428](https://github.com/airbytehq/airbyte/pull/29428) | Add support for MotherDuck. Upgrade DuckDB version to `v0.8``.                                                                                                                                                                                                                                                                                                                                         |
| 0.1.0   | 2022-10-14 | [17494](https://github.com/airbytehq/airbyte/pull/17494)  | New DuckDB destination                                                                                                                                                                                                                                                                                                                                                                                 |

</details>
