---
generated_record: true
connector_name: BigQuery
connector_type: source
connector_slug: bigquery
connector_directory: source-bigquery
definition_id: bfd1ddf8-ae8a-4620-b1d7-55597d2ba08c
version: 1.0.2
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/bigquery
logo: /images/connectors/sources/bigquery.svg
logo_source_path: airbyte-integrations/connectors/source-bigquery/icon.svg
logo_sha256: 323fd364656cf22d9f1aae63611f8b109b6c28c46a4c9b59e33bdbb05b7cbecb
original_metadata_path: airbyte-integrations/connectors/source-bigquery/metadata.yaml
original_metadata_sha256: b1b87756a2bc3656274a2ef3cef77cc26d110f378ee8e1af72968be2da68cfaa
original_document_path: docs/integrations/sources/bigquery.md
original_document_sha256: d8b8b30f9cc900285077fb382d0e741c74b641bc79e30c5b2d175d8ee5e58a10
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 496b394401667a24833784893cf218e6bab3ecb92faa452c7830848bd5e1f0c9
rewritten_at: 2026-11-12T13:32:03.399284+00:00
---

---
description: >-
  BigQuery is Google Cloud's fully managed, highly scalable and cost-effective data warehouse.
---

# BigQuery

The BigQuery source connector reads tables, views, materialized views, external tables and table snapshots from Google BigQuery datasets. It supports full refresh and incremental syncs. It discovers nested `STRUCT` and `ARRAY` schemas and primary key constraints. Checkpoints let large tables resume after an interruption. On Airbyte Cloud, it reads tables through parallel streams using the BigQuery Storage Read API.

Version 1.0.0 rebuilt the connector on Airbyte's Bulk CDK. It accepts the same configuration properties as earlier versions. See the [migration guide](bigquery-migrations.md) for details of the changes.

## Features

| Feature                   | Supported | Notes                                                            |
| :------------------------ | :-------- | :--------------------------------------------------------------- |
| Full refresh sync         | Yes       |                                                                  |
| Incremental sync - append | Yes       | Cursor based, see [Incremental sync](#incremental-sync)          |
| Change data capture (CDC) | No        | BigQuery has no change log for the connector to read             |
| Namespaces                | Yes       | Each dataset is a namespace                                      |
| Primary keys              | Yes       | Read from the table's `PRIMARY KEY` constraint                   |
| Nested schemas            | Yes       | `STRUCT` and `ARRAY` columns keep their structure in the catalog |
| Storage Read API          | Yes       | Airbyte Cloud only, see [Read throughput](#read-throughput)      |
| SSL                       | Yes       | All traffic to the BigQuery API uses HTTPS                       |

The connector is read-only and never writes to your project. On Airbyte Cloud, it reads table data through the Storage Read API. Elsewhere, it uses `SELECT` queries. It runs `SELECT` queries for views and incremental syncs.

## Get started

### Requirements

- A Google Cloud project with the BigQuery API enabled.
- A service account with read access to the datasets you want to sync and permission to run query jobs.
- For high-speed Airbyte Cloud reads, the service account also needs permission to create Storage Read API sessions.
- A JSON key for that service account.

### Service account

Follow Google's [Create service accounts](https://cloud.google.com/iam/docs/service-accounts-create) guide to create a dedicated service account for Airbyte. Then grant it the following roles. A dedicated account keeps permissions and auditing simple.

| Role                                                          | Where to grant it                                                                               | Why                                                                                                                                                           |
| :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| BigQuery Data Viewer (`roles/bigquery.dataViewer`)            | The project, or each dataset to sync                                                            | Lists datasets and tables, reads table schemas and table data                                                                                                 |
| BigQuery Job User (`roles/bigquery.jobUser`)                  | The project that runs the query jobs (**Project ID**, or **Job Execution Project ID** when set) | Runs the `SELECT` queries for views, incremental syncs and the fallback read path                                                                             |
| BigQuery Read Session User (`roles/bigquery.readSessionUser`) | The project that runs the query jobs                                                            | Airbyte Cloud only. Reads tables through the Storage Read API, the high-speed path. See [Permissions for high-speed reads](#permissions-for-high-speed-reads) |

### High-speed read permissions

On Airbyte Cloud, the connector reads tables through the [BigQuery Storage Read API](https://cloud.google.com/bigquery/docs/reference/storage) by default. Self-managed Airbyte uses the query API for every table and doesn't need the permissions below. The Storage Read API makes large table reads faster. It needs permissions that the query path doesn't:

| Permission                      | Included in role           | Where it is needed                                                                                 |
| :------------------------------ | :------------------------- | :------------------------------------------------------------------------------------------------- |
| `bigquery.readsessions.create`  | BigQuery Read Session User | The project that runs the jobs, which is **Project ID** or, when set, **Job Execution Project ID** |
| `bigquery.readsessions.getData` | BigQuery Read Session User | The same project                                                                                   |
| `bigquery.tables.getData`       | BigQuery Data Viewer       | The datasets to sync                                                                               |

Google bills Storage Read API usage by bytes read, separately from the bytes processed by a query. See [BigQuery pricing](https://cloud.google.com/bigquery/pricing).

While **Use the BigQuery Storage Read API** is on, the connection test opens a read session to verify these permissions. If it fails, the message identifies the service account, missing role and project, or the API you must enable. Grant the role, or turn off the setting to use the query path. A sync repeats this check once when it starts. If a permission was revoked after setup, the sync doesn't fail. Instead, the connector logs a warning naming the missing permission and uses the query path. This path is much slower and scans the table for every query. Grant the role before syncing tables larger than a few gigabytes.

The connector also uses the `bigquery.datasets.get`, `bigquery.tables.list`, `bigquery.tables.get` and `bigquery.jobs.create` permissions.

### Service account key

Follow Google's [Create and delete service account keys](https://cloud.google.com/iam/docs/keys-create-delete) guide and select the JSON key type. Download the key file, then paste its contents into the **Service Account Key JSON** field. Google shows the key only once. Keep the file until you've set up the source, then delete it from your computer.

### Set up the BigQuery source

1. In the Airbyte UI, click **Sources**, then **+ New source**.
2. Select **BigQuery** from the source type list.
3. Complete the connection fields:

| Field                                  | Required | Description                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project ID**                         | Yes      | The Google Cloud project that owns the datasets to read.                                                                                                                                                                                                                                                                                                                      |
| **Dataset ID**                         | No       | Restricts the source to one dataset. Leave it empty to discover every dataset of the project. Set it on projects with a large number of datasets, because discovery lists every table of every dataset it can see.                                                                                                                                                            |
| **Service Account Key JSON**           | Yes      | The contents of the JSON key file.                                                                                                                                                                                                                                                                                                                                            |
| **Job Execution Project ID**           | No       | Advanced. The project that runs, and is billed for, the query jobs. Use it to keep Airbyte's query quota and cost apart from the data project, or to read from a project where the service account only has data access. Defaults to **Project ID**.                                                                                                                          |
| **Max Concurrent Queries to Database** | No       | Advanced, Airbyte Cloud only. How many queries and Storage Read API read streams the connector runs at the same time, across all tables. Leave it empty, which is recommended, to let Airbyte optimize concurrency for best performance: it runs one per data channel in speed mode, and one at a time otherwise. On self-managed Airbyte the field can't be edited and is fixed at 1. |
| **Use the BigQuery Storage Read API**  | No       | Advanced, Airbyte Cloud only, on by default. Reads tables through the Storage Read API and streams query results through it. Turn it off to read everything through the query API, which is much slower on large tables. On self-managed Airbyte the field can't be edited and stays off: every table is read through the query API. See [Read throughput](#read-throughput). |

4. Click **Set up source**. The connection test lists the datasets and tables, then runs a trivial query. It fails with `Discovered zero tables` if the dataset or entire project contains no tables.

## Replication

### Discovered streams

Each dataset becomes a namespace. Each table, view, materialized view, external table and table snapshot becomes a stream. The connector skips BigQuery ML models and tables without columns. Column names and types come from table metadata. This metadata includes nested fields in `STRUCT` columns and the element type of `ARRAY` columns. A table with a `PRIMARY KEY` constraint reports it as the source-defined primary key. BigQuery declares this constraint but doesn't enforce it.

### Full refresh

On Airbyte Cloud, a full table refresh opens a Storage Read API session. This session splits the table into read streams. A read stream is BigQuery's unit for parallel reading. It isn't related to an Airbyte stream. The connector reads these streams in order, processing up to **Max Concurrent Queries to Database** at once. It requests many small streams of about 8 GiB each, providing frequent checkpoints. Each completed read stream becomes a checkpoint.

The Storage Read API can't read views, materialized views, external tables or table snapshots. The connector reads each one using a single `SELECT` query. It also uses this approach for every self-managed table or when the Storage Read API is unavailable. On this fallback path, a table with a single-column primary key is divided into roughly equal key ranges. The connector calculates these ranges using `APPROX_QUANTILES` over the key column. Each range becomes one query and one checkpoint. Tables without this type of key are read in one query.

### Incremental sync

Incremental sync uses a cursor column that you choose for each stream. The first sync reads the entire table in the same way as a full refresh. On Airbyte Cloud, it uses parallel Storage Read API streams. This means a terabyte table's first sync takes minutes rather than days. For consistency, the connector pins the read to one table version. It selects a snapshot time a couple of seconds in the past. It opens the read session using the table at that time. BigQuery time travel provides the cursor's maximum from the same time. That maximum becomes the cursor checkpoint after every read stream completes. Later syncs query rows with cursors above the checkpoint and no higher than the table's current maximum. The highest value read becomes the next checkpoint. Rows with a `NULL` cursor are never read.

Choose a cursor column whose values only increase and are never updated. An insertion timestamp or sequence number works well. If the table is partitioned or clustered on this column, BigQuery prunes the scanned data. This reduces the bytes billed for each incremental sync.

You can use the following column types as cursors:

| Cursor column type                          | Notes                                  |
| :------------------------------------------ | :------------------------------------- |
| `INT64`, `NUMERIC`, `BIGNUMERIC`, `FLOAT64` |                                        |
| `STRING`                                    | Ordered as BigQuery orders strings     |
| `DATE`, `DATETIME`, `TIME`, `TIMESTAMP`     | Compared at full microsecond precision |

You can't use `BOOL`, `BYTES`, `JSON`, `STRUCT` or `ARRAY` columns as cursors. `GEOGRAPHY`, `INTERVAL` and `RANGE` columns appear in the cursor list because they're read as strings. However, they haven't been validated as cursors. Prefer one of the types in the table.

### State and resuming

The connector emits state while reading, not only when a sync ends. For Storage Read API tables, the state identifies the read session and last stream completed in order. It also records the row offset for every read stream still in progress. A failed or cancelled sync resumes from that exact point. An incremental stream's first sync also records its snapshot time and cursor maximum at that time. A resumed sync therefore keeps the same table version and checkpoint. A read session remains valid for six hours after opening. A full refresh resumed later starts reading the table again. An incremental first sync reopens a session at its recorded snapshot time. BigQuery provides this within the table's time travel window of two to seven days. The connector takes a new snapshot only after that window. On the query path, state stores the last completed full-refresh key range or last incremental cursor value. Resetting the connection's state makes the next sync start from the beginning.

The connector also reads state saved by versions before 1.0.0. A stream with earlier state resumes after its saved cursor value, instead of reading the table again. Its next state uses the new format. The stream is read again in full if the configured cursor column differs from the saved state. The same applies if the saved value can't be interpreted as the column's type.

### Read throughput

The Storage Read API path and concurrent reads are available only on Airbyte Cloud. Self-managed Airbyte reads each table through the query path, one at a time.

The Storage Read API delivers table data as compressed Arrow batches across many read streams at once. BigQuery serves these streams without running a query. The query path handles views, incremental syncs and fallback reads. It pages results through the BigQuery REST API, a few thousand rows at a time. It also scans the table for every query. The following results were measured using a 515 GiB table with 275 million rows:

| Read path                           | Throughput                      | Time to read the table                                  |
| :---------------------------------- | :------------------------------ | :------------------------------------------------------ |
| Storage Read API, four read streams | at least 480 MB/s of table data | well under an hour, depending on the worker's resources |
| Query API, four queries at a time   | about 3.7 MB/s per query        | about ten hours                                         |

On Airbyte Cloud, query results also stream through the Storage Read API when the connector has the required permissions. Views and incremental syncs benefit too. On a 5.2 million-row, 1.3 GB test table, one query took about 15 minutes through the REST API. The same query took under a minute through the Storage Read API. Rows and values are identical on every path. See [Permissions for high-speed reads](#permissions-for-high-speed-reads) for the required permissions.

### Billed bytes

A full table refresh through the Storage Read API reads the table once. Billing covers Storage Read API bytes, not query bytes. Views, incremental syncs and fallback reads run queries. Their processed bytes follow [BigQuery's on-demand pricing](https://cloud.google.com/bigquery/pricing), or your reservation. An incremental query reads the cursor range. Each fallback key range scans the entire table unless it's clustered or partitioned on the key. Set **Job Execution Project ID** to move query costs and quota to another project.

## Data type mapping

BigQuery column types map to the following Airbyte types. The connector's [field type tests](https://github.com/airbytehq/airbyte/blob/master/airbyte-integrations/connectors/source-bigquery/src/test/kotlin/io/airbyte/integrations/source/bigquery/BigQueryFieldTypesTest.kt) cover the values produced by every type.

| BigQuery type                                                          | Airbyte type                 | Notes                                                    |
| :--------------------------------------------------------------------- | :--------------------------- | :------------------------------------------------------- |
| `BOOL`                                                                 | `boolean`                    |                                                          |
| `INT64` (`INT`, `SMALLINT`, `INTEGER`, `BIGINT`, `TINYINT`, `BYTEINT`) | `integer`                    |                                                          |
| `FLOAT64`                                                              | `number`                     |                                                          |
| `NUMERIC` (`DECIMAL`)                                                  | `number`                     | Exact, written in plain decimal notation                 |
| `BIGNUMERIC` (`BIGDECIMAL`)                                            | `number`                     | Exact, written in plain decimal notation                 |
| `STRING`                                                               | `string`                     |                                                          |
| `BYTES`                                                                | `string`                     | Base64 encoded                                           |
| `DATE`                                                                 | `date`                       | Exact for every date, including dates before 1582-10-15  |
| `DATETIME`                                                             | `timestamp without timezone` | Microsecond precision                                    |
| `TIME`                                                                 | `time without timezone`      | Microsecond precision                                    |
| `TIMESTAMP`                                                            | `timestamp with timezone`    | UTC, microsecond precision                               |
| `JSON`                                                                 | `json`                       | Any JSON value: object, array, string, number or Boolean |
| `GEOGRAPHY`                                                            | `string`                     | Well-known text (WKT)                                    |
| `INTERVAL`                                                             | `string`                     | BigQuery's canonical interval text                       |
| `RANGE<T>`                                                             | `string`                     | BigQuery's range text                                    |
| `STRUCT`                                                               | `object`                     | Nested fields keep their own types in the schema         |
| `ARRAY<T>`                                                             | `array`                      | Items keep the type of `T`                               |

## Upgrade from versions before 1.0.0

Version 1.0.0 keeps the existing configuration properties and understands incremental state from earlier versions. However, it types date, time, JSON and bytes columns. It carries nested schemas for `STRUCT` and `ARRAY` columns and reports primary keys. It also limits incremental cursors to supported column types and requires a service account key. These changes affect schemas for existing connections. You must refresh every connection's source schema after upgrading. The [migration guide](bigquery-migrations.md) lists every change, the required post-upgrade steps and the downstream impact.

## Limits and troubleshooting

- **No change data capture.** Deleted rows aren't detected. Updated rows are detected only when the cursor column changes.
- **`Discovered zero tables`** during connection testing means the service account can't see any tables. This applies to the dataset, or the project when **Dataset ID** is empty.
- **Discovery of a whole project is slow** when the project has thousands of datasets because tables are listed one dataset at a time. Set **Dataset ID**.
- **`Access Denied`, `PERMISSION_DENIED` or `Not found` errors** indicate a missing role on the data or job project. Check the roles under [Service account](#service-account). Remember that **Job Execution Project ID** also needs the BigQuery Job User role.
- **The connection test fails with a message about the BigQuery Storage Read API** when **Use the BigQuery Storage Read API** is on and the service account lacks a permission under [Permissions for high-speed reads](#permissions-for-high-speed-reads). It can also mean the API isn't enabled in the project running the jobs. The message identifies the required fix. Apply it, or turn off the setting.
- **A warning about the Storage Read API at the start of a sync** means the permission was lost after the connection test passed. The sync completes through the query path, but large tables take much longer.
- **Read sessions expire after six hours.** A full refresh resumed after more than six hours reads the table again from the start. See [State and resuming](#state-and-resuming) for incremental first syncs.
- **`invalid_grant` or `No valid credentials provided` errors** mean Google rejected the service account key. The key was deleted or disabled, or the JSON wasn't pasted completely. Create a new key and paste the entire file.
- **`GEOGRAPHY`, `INTERVAL` and `RANGE` cursors** haven't been validated. Use one of the [supported cursor types](#incremental-sync).

## IP allow list

If you use Airbyte Cloud and your organisation restricts access by IP address, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                   |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.2 | 2026-10-22 | [89641](https://github.com/airbytehq/airbyte/pull/89641) | Upgrade to Bulk CDK 1.2.3: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86; pin httpcore5 5.4.4. |
| 1.0.1 | 2026-10-02 | [87654](https://github.com/airbytehq/airbyte/pull/87654) | Fail the connection test with an actionable error when **Use the BigQuery Storage Read API** is on but the service account lacks the Read Session User role or the API is not enabled; fall back to the query API during a sync even when the catalog holds only views |
| 1.0.0 | 2026-10-02 | [86950](https://github.com/airbytehq/airbyte/pull/86950) | Rebuild on the Bulk CDK: Storage Read API reads with resumable read streams (Airbyte Cloud only), typed date, time and JSON columns, nested schemas, primary keys, cursor incremental reads and speed mode. See the migration guide |
| 0.4.5 | 2026-01-21 | [72203](https://github.com/airbytehq/airbyte/pull/72203) | Increase integration test timeouts from 1 to 10 minutes |
| 0.4.4 | 2025-07-10 | [62911](https://github.com/airbytehq/airbyte/pull/62911) | Convert to new gradle build flow |
| 0.4.3 | 2024-12-19 | [49875](https://github.com/airbytehq/airbyte/pull/49875) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.4.2 | 2024-02-23 | [35503](https://github.com/airbytehq/airbyte/pull/35503) | Source BigQuery: replicating RECORD REPEATED fields |
| 0.4.1 | 2024-02-01 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version |
| 0.4.0 | 2023-12-18 | [33484](https://github.com/airbytehq/airbyte/pull/33484) | Remove LEGACY state |
| 0.3.0 | 2023-06-29 | [27737](https://github.com/airbytehq/airbyte/pull/27737) | License Update: Elv2 |
| 0.2.3 | 2022-10-14 | [15535](https://github.com/airbytehq/airbyte/pull/15535) | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode |
| 0.2.2 | 2022-09-22 | [16902](https://github.com/airbytehq/airbyte/pull/16902) | Source BigQuery: added user agent header |
| 0.2.1 | 2022-09-14 | [15668](https://github.com/airbytehq/airbyte/pull/15668) | Wrap logs in AirbyteLogMessage |
| 0.2.0 | 2022-07-26 | [14362](https://github.com/airbytehq/airbyte/pull/14362) | Integral columns are now discovered as int64 fields. |
| 0.1.9 | 2022-07-21 | [14574](https://github.com/airbytehq/airbyte/pull/14574) | Removed additionalProperties:false from JDBC source connectors |
| 0.1.8 | 2022-06-21 | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors |
| 0.1.7 | 2022-04-13 | [11484](https://github.com/airbytehq/airbyte/pull/11484) | BigQuery connector escape column names |
| 0.1.6 | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option |
| 0.1.5 | 2021-12-23 | [8434](https://github.com/airbytehq/airbyte/pull/8434) | Update fields in source-connectors specifications |
| 0.1.4   | 2021-09-30 | [\#6524](https://github.com/airbytehq/airbyte/pull/6524) | Allow `dataset_id` null in spec                                                                                                           |
| 0.1.3   | 2021-09-23 | [\#6051](https://github.com/airbytehq/airbyte/pull/6051) | Handle NPE `dataset_id` is not provided                                                                                                   |
| 0.1.2   | 2021-09-17 | [\#6135](https://github.com/airbytehq/airbyte/pull/6135) | 🐛 BigQuery source: Fix nested structs                                                                                                    |
| 0.1.1   | 2021-07-27 | [\#4981](https://github.com/airbytehq/airbyte/pull/4981) | 🐛 BigQuery source: Fix nested arrays                                                                                                     |
| 0.1.0   | 2021-07-22 | [\#4457](https://github.com/airbytehq/airbyte/pull/4457) | 🎉 New Source: Big Query.                                                                                                                 |

</details>
