---
generated_record: true
connector_name: Scylla
connector_type: destination
connector_slug: scylla
connector_directory: destination-scylla
definition_id: 3dc6f384-cd6b-4be3-ad16-a41450899bf0
version: 0.1.3
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/scylla
logo: /images/connectors/destinations/scylla.svg
logo_source_path: airbyte-integrations/connectors/destination-scylla/icon.svg
logo_sha256: 9de5a7af9ebdedb3d1c15afc2f312e7e3b5bd34ad78b85828b4bb3c2ec353e31
original_metadata_path: airbyte-integrations/connectors/destination-scylla/metadata.yaml
original_metadata_sha256: 5bd37ae3ceab65beea9cb490cc17619cfb5795cfd86af449d20beba91667baf1
original_document_path: docs/integrations/destinations/scylla.md
original_document_sha256: a1f643c58c063616616ac31980b113b95eb337d097896e39b636b987bca3689e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 98d201cd5bb3654aa6088d3bb0f24d1774d84edaf84b301df1205ac6f9612865
rewritten_at: 2026-11-12T13:27:00.694641+00:00
---

# Scylla

## Prerequisites

- If you use the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector with Airbyte Open Source, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to `v0.40.0-alpha` or newer. Then upgrade your Scylla connector to `0.1.3` or newer.

## Sync overview

### Output schema

Incoming Airbyte data is structured in keyspaces and tables. It's partitioned and replicated across different cluster nodes.

This connector maps an incoming `stream` to a Scylla `table`. It maps a `namespace` to a Scylla `keyspace`.

Fields in the Airbyte message become columns in the Scylla tables. Each table contains the following columns.

- `_airbyte_ab_id`: A random UUID used as a partition key.
- `_airbyte_emitted_at`: A timestamp showing when the event was received from the data source.
- `_airbyte_data`: JSON text representing the extracted data.

### Features

| Feature                        | Support | Notes                                                                                   |
| :----------------------------- | :-----: | :-------------------------------------------------------------------------------------- |
| Full Refresh Sync              |   ✅    | Warning: this mode deletes all previously synced data in the configured DynamoDB table. |
| Incremental - Append Sync      |   ✅    |                                                                                         |
| Incremental - Append + Deduped |   ❌    |                                                                                         |
| Namespaces                     |   ✅    | Namespace will be used as part of the table name.                                       |

### Performance

Scylla delivers high performance when handling large amounts of data. It distributes write operations across different cluster nodes.

With enough nodes, your database can scale infinitely and handle any amount of connector data.

## Get started

### Requirements

- Driver compatibility: NA
- Configuration
  - Keyspace [default keyspace to use when writing data]
  - Username [authentication username]
  - Password [authentication password]
  - Address [cluster address]
  - Port [default: 9042]
  - Replication [optional] [default: 1]

### Setup guide

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                   |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------ |
| 0.1.3   | 2022-08-10 | [15399](https://github.com/airbytehq/airbyte/pull/15399) | handling per-stream state |

</details>
