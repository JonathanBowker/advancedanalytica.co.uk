---
generated_record: true
connector_name: SingleStore
connector_type: destination
connector_slug: singlestore
connector_directory: destination-singlestore
definition_id: 216d815c-8ddc-4617-8cb3-3a23e5811292
version: 0.1.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/singlestore
logo: /images/connectors/destinations/singlestore.svg
logo_source_path: airbyte-integrations/connectors/destination-singlestore/icon.svg
logo_sha256: 2786d2e187c38247e5f10d8f12d8983efef60b1997fed9fea5d2255bf9864171
original_metadata_path: airbyte-integrations/connectors/destination-singlestore/metadata.yaml
original_metadata_sha256: fcaa344847ad8765319c9c4c9f61f17c537da5e0730e92ea8d18d359ab618081
original_document_path: docs/integrations/destinations/singlestore.md
original_document_sha256: 8dcc484fc26635b37b00a422752ea4db940a120e5157d7940319659201179548
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5ba384553f1e82e90bcb6763236d91700b01009a082102a9b64c7bbc094ab633
rewritten_at: 2026-11-12T13:27:11.532006+00:00
---

# SingleStore

## Overview

[SingleStore](https://www.singlestore.com/) is a distributed SQL database for high-throughput transactions, including inserts and upserts. It provides low-latency analytics and context from real-time vector data.

:::info
The Airbyte SingleStore destination uses Destination V2 with [Typing and Deduping](https://docs.airbyte.com/using-airbyte/core-concepts/typing-deduping) support. Legacy V1 isn't supported.
:::

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Get started

#### Requirements

1. A SingleStore instance
2. Allow connections from Airbyte to your SingleStore database, if they exist in separate VPCs.
3. Create a dedicated Airbyte user with minimum permissions to CRUD tables and CREATE/EXECUTE functions.

This SQL query shows how to grant an Airbyte user the minimum required permissions:

```sql
CREATE USER airbyte IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, EXECUTE, CREATE ROUTINE, ALTER ROUTINE, CREATE DATABASE ON db.* TO 'airbyte'@'%';
```

4. Before configuring the SingleStore destination in Airbyte, set the 'local_infile' system variable to true.
   Run the `SET GLOBAL local_infile = true` query to set it. This is required because Airbyte uses `LOAD DATA LOCAL INFILE` to load data into the raw table.

To configure the SingleStore destination, you'll need the following information:

- **Host** - The server's host name.
- **Port** - The port number where the server listens. It defaults to the standard port number (3306).
- **Username**
- **Password**
- **Database** - The database name.
- **JDBC URL Params** (optional)

## Schema map

### Raw table

Each data stream has its own raw table in SingleStore. By default, these tables use the namespace specified by the `database` parameter. You can override this behaviour by configuring the `raw_data_schema` parameter.

:::warning

Use the same database for the raw and final tables in the SingleStore connector. SingleStore doesn't support cross-database transactions. Using one database keeps data operations and transaction management consistent.

:::

Raw table schema:

- `_airbyte_raw_id`: a uuid that Airbyte assigns to each processed event. The SingleStore column type is `VARCHAR(256)`.
- `_airbyte_extracted_at`: a timestamp showing when the event was pulled from the data source. The SingleStore column type is `TIMESTAMP(6)`.
- `_airbyte_loaded_at`: a timestamp showing when the row was processed into the final table. The SingleStore column type is `TIMESTAMP(6)`.
- `_airbyte_data`: a json containing the event data. The SingleStore column type is `JSON`.

### Final table

After storing the data stream in the raw table, the connector parses and normalises it into the final destination table. The connector handles data casting errors during normalisation. It tracks and records any casting errors in the `_airbyte_meta` column. This provides visibility into issues encountered during normalisation.

Final table schema:
* `data columns`: normalised data columns from the raw table's _airbyte_data JSON column.
* `_airbyte_extracted_at`: a timestamp showing when the event was pulled from the data source. The SingleStore column type is TIMESTAMP(6).
* `_airbyte_meta`: a column containing warnings that occurred during data normalisation.

### Final table data type mapping

| Airbyte Type               | SingleStore Type |
|:---------------------------|:-----------------|
| string                     | VARCHAR(21844)   |
| number                     | DECIMAL(38, 9)   |
| integer                    | BIGINT           |
| boolean                    | TINYINT(1)       |
| object                     | JSON             |
| array                      | JSON             |
| timestamp_without_timezone | TIMESTAMP(6)     |
| timestamp_with_timezone    | TIMESTAMP(6)     |
| time_without_timezone      | TIME(6)          |
| time_with_timezone         | TIME(6)          |
| date                       | DATE             |

### Naming limits

SingleStore restricts all identifiers to 63 characters or fewer. Column names longer than 63 characters are truncated to this length.

## CHANGELOG

| Version | Date       | Pull Request                                             | Subject                              |
|:--------|:-----------|:---------------------------------------------------------|:-------------------------------------|
| 0.1.0   | 2024-05-23 | [38600](https://github.com/airbytehq/airbyte/pull/38600) | Implement SingleStore destination V2 |

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a SingleStore database.
