---
generated_record: true
connector_name: Rockset
connector_type: destination
connector_slug: rockset
connector_directory: destination-rockset
definition_id: 2c9d93a7-9a17-4789-9de9-f46f0097eb70
version: 0.1.4
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/rockset
logo: null
logo_source_path: null
logo_sha256: null
original_metadata_path: airbyte-integrations/connectors/destination-rockset/metadata.yaml
original_metadata_sha256: ac297ba7dc96e94225852964cc7a4fac2e821d4fd71d6d826aca8895cc77c757
original_document_path: docs/integrations/destinations/rockset.md
original_document_sha256: 1f2abd1e009ec3f4ff6ff146336a28647f7a9acf64e22e0de6ed1402e5ee727d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 92cf9cbff9f28e80448fe4c42c943368f30ab37c2976dc5d1330589e9f2f8811
rewritten_at: 2026-11-12T13:26:45.267706+00:00
---

# Rockset

## Prerequisites

- To use the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector with Airbyte Open Source, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to `v0.40.0-alpha` or newer. Upgrade your Rockset connector to `0.1.4` or newer.

## Features

| Feature                        | Support |
| :----------------------------- | :-----: |
| Full Refresh Sync              |   ✅    |
| Incremental - Append Sync      |   ✅    |
| Incremental - Append + Deduped |   ❌    |
| Namespaces                     |   ❌    |

## Troubleshooting

## Configuration

| Parameter  |  Type  | Notes                                                            |
| :--------- | :----: | :--------------------------------------------------------------- |
| api_key    | string | rockset api key                                                  |
| api_server | string | api URL to rockset, specifying http protocol                     |
| workspace  | string | workspace under which rockset collections will be added/modified |

## Get started \(Airbyte Open Source / Airbyte Cloud\)

#### Requirements

1. Rockset api key with appropriate read and write credentials

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------------- |
| 0.1.4   | 2022-06-17 | [15395](https://github.com/airbytehq/airbyte/pull/15395) | Updated Destination Rockset to handle per-stream state |
| 0.1.3   | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors |
| 0.1.2   | 2022-05-17 | [12820](https://github.com/airbytehq/airbyte/pull/12820) | Improved 'check' operation performance                 |
| 0.1.1   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option           |
| 0.1.0   | 2021-11-15 | [8006](https://github.com/airbytehq/airbyte/pull/8006)   | Initial release                                        |

</details>
