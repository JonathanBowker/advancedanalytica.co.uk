---
generated_record: true
connector_name: SelectDB
connector_type: destination
connector_slug: selectdb
connector_directory: destination-selectdb
definition_id: 50a559a7-6323-4e33-8aa0-51dfd9dfadac
version: 0.1.0
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/selectdb
logo: /images/connectors/destinations/selectdb.svg
logo_source_path: airbyte-integrations/connectors/destination-selectdb/icon.svg
logo_sha256: a89e632fcbba4748b40130db369f164286e6934338a38cca7de3da66de415a48
original_metadata_path: airbyte-integrations/connectors/destination-selectdb/metadata.yaml
original_metadata_sha256: 503a5e16bf8b41f40c7dbb261914142e543ee77dc41d7a2bba08c14d7df67d1b
original_document_path: docs/integrations/destinations/selectdb.md
original_document_sha256: f10ede3951c0ea441f8ffa0c5582136d5c3e08480516caa1d14610e21ac27164
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5f5abea8bc20790e92c47bd3668ee4c2aa49193ea52e3699f3646c5ecb793fd8
rewritten_at: 2026-11-12T14:04:15.869289+00:00
---

# SelectDB

The destination-selectdb destination is based on [SelectDB copy into ](https://cn.selectdb.com/docs/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/%E6%95%B0%E6%8D%AE%E5%AF%BC%E5%85%A5#copy-into). It supports batch rollback and uses http/https put request.

## Sync overview

### Output schema

Each stream is written to its own SelectDB table. Each table contains three columns:

- `_airbyte_ab_id`: a uuid that Airbyte assigns to each processed event. The column type in Doris is `VARCHAR(40)`.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source. The column type in Doris is `BIGINT`.
- `_airbyte_data`: a json blob containing the event data. The column type in SelectDB is `String`.

### Features

This section should contain a table in the following format:

| Feature                                | Supported?(Yes/No) | Notes |
| :------------------------------------- | :----------------- | :---- |
| Full Refresh Sync                      | Yes                |       |
| Incremental - Append Sync              | Yes                |       |
| Incremental - Append + Deduped         | No                 |       |
| For databases, WAL/Logical replication | Yes                |       |

### Performance considerations

Writes are processed in batches. mini records may affect performance.

Importing multiple tables generates multiple transactions. Split these transactions as much as possible.

## Getting started

### Requirements

To use the SelectDB destination, you'll need:

- A SelectDB server and your
- Ensure Airbyte can access your SelectDB http port and mysql query port.
- Ensure Airbyte can access your SelectDB host.
- If you use a public network, add your airbyte public network IP to your SelectDB ip whitelist.
- Ensure your SelectDB user has read/write permissions for the relevant tables.

### Target database and tables

Choose a database to store data synced from Airbyte.

Prepare this database before syncing. Match the table's column names and their order as closely as possible.

### Set up access parameters

- **loadURL**
- **jdbcURL**
- **clustername**
- **username**
- **password**
- **database**

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                              |
| :------ | :--------- | :--------------------------------------------------------- | :----------------------------------- |
| 0.1.0   | 2023-04-03 | [\#20881](https://github.com/airbytehq/airbyte/pull/20881) | Initial release SelectDB Destination |

</details>
