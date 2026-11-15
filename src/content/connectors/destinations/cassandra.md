---
generated_record: true
connector_name: Cassandra
connector_type: destination
connector_slug: cassandra
connector_directory: destination-cassandra
definition_id: 707456df-6f4f-4ced-b5c6-03f73bcad1c5
version: 0.1.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/cassandra
logo: /images/connectors/destinations/cassandra.svg
logo_source_path: airbyte-integrations/connectors/destination-cassandra/icon.svg
logo_sha256: 58e95b8334dd3543de90ff93e84bd6c9e4891f4d1c38810b18cbbe7cf08e1f87
original_metadata_path: airbyte-integrations/connectors/destination-cassandra/metadata.yaml
original_metadata_sha256: defae80101f3fd0bca6307e2b543f21654c48b25efe79f97c66dfd63b870c98f
original_document_path: docs/integrations/destinations/cassandra.md
original_document_sha256: eae14e41074b72304aaaf72ef57f79df6c69921e76436d202986d694e334161b
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: cce77997cb1baf3350cd8696d77dd6cb87739243cb167fa779f9bc5f006a9b00
rewritten_at: 2026-11-12T13:22:59.565624+00:00
---

# Cassandra

## Prerequisites

- If you use Airbyte Open Source with the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to version `v0.40.0-alpha` or newer. Upgrade your Cassandra connector to version `0.1.3` or newer.

## Sync overview

### Output schema

Incoming airbyte data is structured into keyspaces and tables. It's partitioned and replicated across different cluster nodes.

The connector maps each incoming `stream` to a Cassandra `table`. It maps each `namespace` to a Cassandra `keyspace`.

Fields in the airbyte message become columns in the Cassandra tables. Each table contains the following columns.

- `_airbyte_ab_id`: A random UUID generator used as a partition key.
- `_airbyte_emitted_at`: A timestamp showing when the event was received from the data source.
- `_airbyte_data`: JSON text containing the extracted data.

### Features

| Feature                        | Support | Notes                                                                                   |
| :----------------------------- | :-----: | :-------------------------------------------------------------------------------------- |
| Full Refresh Sync              |   ✅    | Warning: this mode deletes all previously synced data in the configured DynamoDB table. |
| Incremental - Append Sync      |   ✅    |                                                                                         |
| Incremental - Append + Deduped |   ❌    |                                                                                         |

### Performance considerations

Cassandra handles large data volumes by distributing write operations across different cluster nodes. With enough cluster nodes, the database can scale infinitely and handle any amount of connector data.

## Get started

### Requirements

- The driver is compatible with _Cassandra >= 2.1_
- Configuration
  - Keyspace [default keyspace for writing data]
  - Username [authentication username]
  - Password [authentication password]
  - Address [cluster address]
  - Port [default: 9042]
  - Datacenter [optional] [default: datacenter1]
  - Replication [optional] [default: 1]

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a Cassandra keyspace and forms part of the table name.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------- |
| 0.1.4   | 2022-08-23 | [15894](https://github.com/airbytehq/airbyte/pull/15894) | Replace batch insert with async method |

</details>
