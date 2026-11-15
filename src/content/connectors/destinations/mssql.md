---
generated_record: true
connector_name: MS SQL Server
connector_type: destination
connector_slug: mssql
connector_directory: destination-mssql
definition_id: d4353156-9217-4cad-8dd7-c108fd4f74cf
version: 2.2.24
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/destinations/mssql
logo: /images/connectors/destinations/mssql.svg
logo_source_path: airbyte-integrations/connectors/destination-mssql/icon.svg
logo_sha256: 418f1563d2e4f0789ca6358cbcc6d99f16b6a2de5f688093ff9ec8086bc0b365
original_metadata_path: airbyte-integrations/connectors/destination-mssql/metadata.yaml
original_metadata_sha256: aac1b86df26e2ae0bbbb90958a2f5b62bed7d9fd07b1460c41b9d9798dc7fd3c
original_document_path: docs/integrations/destinations/mssql.md
original_document_sha256: de4c05750d9a327cf4a4b6ca7c66f59c0c2d14412ab6807d51598c00742ba579
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4a3af9b9e0fca0bede20402f0ff3d00ffc522e2fd610293097367b4a313b1669
rewritten_at: 2026-11-12T13:25:54.463238+00:00
---

# MS SQL Server

Set up the MS SQL Server destination connector to write data to a Microsoft SQL Server or Azure SQL Database instance.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Output schema

Each stream is written to its own SQL Server table. Each table contains these metadata columns:

- `_airbyte_raw_id`: A random UUID assigned to each incoming record. Its SQL Server column type is `VARCHAR(MAX)`.
- `_airbyte_extracted_at`: A timestamp showing when the event was pulled from the data source. Its SQL Server column type is `BIGINT`.
- `_airbyte_meta`: Additional information about the record. Its SQL Server column type is `TEXT`.
- `_airbyte_generation_id`: Incremented each time a [refresh](https://docs.airbyte.com/operator-guides/refreshes) runs. Its SQL Server column type is `TEXT`.

See [here](../../platform/understanding-airbyte/airbyte-metadata-fields) for more information about these fields.

## Get started

### Setup guide

- MS SQL Server: `Azure SQL Database`, `SQL Server 2016` or greater

#### Network access

Make sure Airbyte can access your SQL Server database. For a database within a VPC, allow access from the IP exposing Airbyte.
If you're using Airbyte Cloud, add Airbyte's [IP addresses](/platform/operating-airbyte/ip-allowlist) to your allowlist.

#### **Permissions**

Configure a SQL Server user that can create tables and write rows. Creating a dedicated Airbyte user is highly recommended.
Grant the user `ALTER` permissions on the target schema. These permissions let Airbyte create and modify tables as needed.

#### Target database

Choose an existing database or create one to store data synced from Airbyte.

### Configuration

You'll need this information to configure the MSSQL destination:

- **Host**
  - The MSSQL database host name.
- **Port**
  - The MSSQL database port.
- **Database Name**
  - The MSSQL database name.
- **Default Schema**
  - The default schema for tables when the source doesn't specify a namespace. The usual value is "dbo".
- **Username**
  - The username used to access the database.
- **Password**
  - The password associated with this username.
- **JDBC URL Parameters**
  - Additional properties passed to the database's JDBC URL string. Format them as 'key=value' pairs separated by '&'.
  - Example: key1=value1&key2=value2&key3=value3.
- **SSL Method**
  - The SSL configuration supports three modes: Unencrypted, Encrypted \(trust server certificate\), and Encrypted \(verify certificate\).
    - **Unencrypted**: Don't use SSL encryption for the database connection.
    - **Encrypted \(trust server certificate\)**: Use SSL encryption without verifying the server's certificate. This supports self-signed certificates in testing but shouldn't be used in production.
    - **Encrypted \(verify certificate\)**: Use the server's SSL certificate after standard certificate verification.
      - **Host Name In Certificate** \(optional\): Set an expected name during certificate verification for added security. Verification fails if the certificate's host name doesn't match.
- **Load Type**
  - The data load type supports two modes: Insert or Bulk.
    - **Insert**: Uses SQL `INSERT` statements to load data into the destination table.
    - **Bulk**: Uses Azure Blob Storage and the `BULK INSERT` command to load data into the destination table. This option requires additional configuration:
      - **Azure Blob Storage Account Name** - The name of the [Azure Blob Storage account]( https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction#storage-accounts).
      - **Azure Blob Storage Container Name** - The name of the [Azure Blob Storage container](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction#containers).
      - **Shared Access Signature** - A [shared access signature (SAS)](https://learn.microsoft.com/azure/storage/common/storage-sas-overview) provides secure delegated access to resources.\
      - **BULK Load Data Source** - Specifies the [external data source name configured in MSSQL](https://learn.microsoft.com/sql/t-sql/statements/bulk-insert-transact-sql), which references the Azure Blob container.
      - **Pre-Load Value Validation** - When enabled, Airbyte validates all values before loading them into the destination table. This strengthens data integrity but may significantly affect performance.

#### Set up MSSQL with Azure Blob Storage (Bulk Upload)

Set up and use the **Microsoft SQL Server (MSSQL) connector** with the **Azure Blob Storage Bulk Upload** feature. Stage data in Azure Blob Storage and use `BULK INSERT`.
This approach can significantly improve ingestion speed and reduce network overhead for large or frequent data loads.

##### Why use Azure Blob Storage Bulk Upload?

Row-by-row MSSQL inserts can become slow and resource-intensive with high data volumes or frequent syncs. Staging files in Azure Blob Storage lets you:
1. **Aggregate Data into Bulk Files**: Write data to Blob Storage in batches, reducing overhead.
2. **Perform Bulk Ingestion**: Let MSSQL use `BULK INSERT` to load these files directly. This is typically faster than conventional row-by-row inserts.

##### Prerequisites

1. **A Microsoft SQL Server Instance**
    - Compatible with on-premises SQL Server or Azure SQL Database.
2. **Azure Blob Storage Account**
    - A storage account and container (e.g., `bulk-staging`) for your data files.
3. **Permissions**
    - **Blob Storage**: Permission to create, read and delete objects within the designated container.
    - **MSSQL**: Permission to create or modify tables and execute `BULK INSERT`.

##### Setup guide

Follow these steps to configure MSSQL with Azure Blob Storage for bulk uploads.

###### 1. Set up Azure Blob Storage

1. **Create a Storage Account & Container**
    - In the Azure Portal, create or reuse a Storage Account.
    - Within that account, create a container (e.g., `bulk-staging`) to stage your data files.
2. **Establish Access Credentials**
    - Use a **Shared Access Signature (SAS)** scoped to your container.
    - Make sure the SAS token or role assignments include permissions such as **Read**, **Write**, **Delete**, and **List**.

###### 2. Configure MSSQL

See the official [Microsoft documentation](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-external-data-source-transact-sql?view=sql-server-2017&tabs=dedicated#e-create-an-external-data-source-for-bulk-operations-retrieving-data-from-azure-storage) for more details. Here's a simplified overview:

1. **(Optional) Create a Master Encryption Key**
   If your environment requires a master key to store credentials securely, create one:
   ```sql
   CREATE MASTER KEY ENCRYPTION BY PASSWORD = '<your_password>';
   ```

2. **Create a Database Scoped Credential**
   Configure a credential that gives MSSQL access to your Blob Storage through the SAS token:
   ```sql
   CREATE DATABASE SCOPED CREDENTIAL <credential_name>
   WITH IDENTITY = 'SHARED ACCESS SIGNATURE',
        SECRET = '<your_sas_token>';
   ```

3. **Create an External Data Source**
   Point MSSQL to your Blob container using the credential:
   ```sql
   CREATE EXTERNAL DATA SOURCE <data_source_name>
   WITH (
       TYPE = BLOB_STORAGE,
       LOCATION = 'https://<storage_account>.blob.core.windows.net/<container_name>',
       CREDENTIAL = <credential_name>
   );
   ```
   You'll reference `<data_source_name>` when configuring the connector.

###### 3. Configure the connector

You'll need to provide:

1. **MSSQL Connection Details**
    - The server hostname/IP, port, database name and authentication details (username/password).
2. **Bulk Load Data Source**
    - The external data source name you created (e.g., `<data_source_name>`).
3. **Azure Storage Account & Container**
    - The storage account and container names.
4. **SAS Token**
    - The token that grants access to Blob Storage.

See the [Getting Started: Configuration section](#configuration) of this guide for more details about configuring the `BULK INSERT` connector.

## Data type limitations

SQL Server limits certain data types. If a value falls outside a supported range, the connector nullifies it.
It also records a `DESTINATION_FIELD_SIZE_LIMITATION` change in `_airbyte_meta`.

| Airbyte type | SQL Server type | Supported range | Notes |
| :--- | :--- | :--- | :--- |
| `timestamp_without_timezone` | `DATETIME` | 1753-01-01 00:00:00 through 9999-12-31 23:59:59.997 | Dates before 1753-01-01 are nullified. This is a [SQL Server restriction](https://learn.microsoft.com/en-us/sql/t-sql/data-types/datetime-transact-sql). |
| `timestamp_with_timezone` | `DATETIMEOFFSET` | 0001-01-01 through 9999-12-31 | No additional connector-level validation. |
| `integer` | `BIGINT` | −9,223,372,036,854,775,808 through 9,223,372,036,854,775,807 | Values outside this range are nullified. |
| `number` | `NUMERIC(38,8)` | Approximately ±10^30 | Values outside the representable range are nullified. |

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a SQL Server schema.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version    | Date       | Pull Request                                               | Subject                                                                                                                   |
|:-----------|:-----------|:-----------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------|
| 2.2.24 | 2026-10-22 | [89656](https://github.com/airbytehq/airbyte/pull/89656) | Upgrade to Bulk CDK 1.1.9: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86; netty 4.1.139; mssql-jdbc 12.10.2. |
| 2.2.23 | 2026-10-01 | [87618](https://github.com/airbytehq/airbyte/pull/87618) | Upgrade to Bulk CDK 1.1.1. |
| 2.2.22 | 2026-09-09 | [85768](https://github.com/airbytehq/airbyte/pull/85768) | Report SQL Server permission-denied and string-truncation errors as configuration errors instead of system errors. |
| 2.2.21 | 2026-09-01 | [84990](https://github.com/airbytehq/airbyte/pull/84990) | Upgrade to Bulk CDK 1.0.25. |
| 2.2.20     | 2026-07-10 | [81536](https://github.com/airbytehq/airbyte/pull/81536)   | Add connectorIPCOptions to enable speed mode                                                                              |
| 2.2.19     | 2026-06-30 | [80269](https://github.com/airbytehq/airbyte/pull/80269)   | Extract shared value coercion into MSSQLValueCoercer; enable acceptance tests                                             |
| 2.2.18     | 2026-06-09 | [79602](https://github.com/airbytehq/airbyte/pull/79602)   | Fix bulk load — schema-qualified staging tables, always serialize booleans as 0/1                                         |
| 2.2.17     | 2026-06-08 | [79154](https://github.com/airbytehq/airbyte/pull/79154)   | Nullify timestamp-without-timezone values before 1753-01-01 instead of failing the sync                                   |
| 2.2.16     | 2026-04-23 | [76946](https://github.com/airbytehq/airbyte/pull/76946)   | Upgrade Bulk CDK to 1.0.11 and fix `_ab_cdc_deleted_at` column type so the secondary index on CDC streams can be created. |
| 2.2.15     | 2026-01-26 | [72297](https://github.com/airbytehq/airbyte/pull/72297)   | Upgrade CDK to 0.2.0                                                                                                      |
| 2.2.14     | 2025-11-05 | [69130](https://github.com/airbytehq/airbyte/pull/69130)   | Upgrade to Bulk CDK 0.1.61.                                                                                               |
| 2.2.13     | 2025-09-24 | [66684](https://github.com/airbytehq/airbyte/pull/66684)   | Pin to CDK artifact                                                                                                       |
| 2.2.12     | 2025-06-26 | [62078](https://github.com/airbytehq/airbyte/pull/62078)   | Add SSH tunnel support                                                                                                    |
| 2.2.11     | 2025-05-30 | [61017](https://github.com/airbytehq/airbyte/pull/61017)   | Integration test fixes                                                                                                    |
| 2.2.10     | 2025-05-29 | [60897](https://github.com/airbytehq/airbyte/pull/60897)   | Internal fixes                                                                                                            |
| 2.2.9      | 2025-05-19 | [60791](https://github.com/airbytehq/airbyte/pull/60791)   | Fix bug in detecting schema change when stream has no columns                                                             |
| 2.2.8      | 2025-05-08 | [59735](https://github.com/airbytehq/airbyte/pull/59735)   | Cleanup: Remove unused code                                                                                               |
| 2.2.7      | 2025-05-07 | [56444](https://github.com/airbytehq/airbyte/pull/56444)   | CDK: Internal refactor; perf improvements                                                                                 |
| 2.2.6      | 2025-04-21 | [58146](https://github.com/airbytehq/airbyte/pull/58146)   | Fix numeric bounds-handling                                                                                               |
| 2.2.5      | 2025-04-18 | [58140](https://github.com/airbytehq/airbyte/pull/58140)   | Upgrade to latest CDK                                                                                                     |
| 2.2.4      | 2025-04-11 | [57563](https://github.com/airbytehq/airbyte/pull/57563)   | Improve BULK INSERT documentation.                                                                                        |
| 2.2.3      | 2025-04-16 | [58085](https://github.com/airbytehq/airbyte/pull/58085)   | Internal refactoring                                                                                                      |
| 2.2.2      | 2025-04-07 | [56391](https://github.com/airbytehq/airbyte/pull/56391)   | Add support for Azure blob storage auth via storage account key.                                                          |
| 2.2.1      | 2025-03-27 | [56402](https://github.com/airbytehq/airbyte/pull/56402)   | Improve Azure blob storage load logic.                                                                                    |
| 2.2.0      | 2025-03-23 | [56353](https://github.com/airbytehq/airbyte/pull/56353)   | Bulk Load performance improvements                                                                                        |
| 2.1.2      | 2025-03-25 | [56346](https://github.com/airbytehq/airbyte/pull/56346)   | Internal refactor                                                                                                         |
| 2.1.1      | 2025-03-24 | [56355](https://github.com/airbytehq/airbyte/pull/56355)   | Upgrade to airbyte/java-connector-base:2.0.1 to be M4 compatible.                                                         |
| 2.1.0      | 2025-03-24 | [55849](https://github.com/airbytehq/airbyte/pull/55849)   | Misc. bugfixes in type-handling (esp. in complex types)                                                                   |
| 2.0.5      | 2025-03-24 | [55904](https://github.com/airbytehq/airbyte/pull/55904)   | Fix handling of invalid schemas (correctly JSON-serialize values)                                                         |
| 2.0.4      | 2025-03-20 | [55886](https://github.com/airbytehq/airbyte/pull/55886)   | Internal refactor                                                                                                         |
| 2.0.3      | 2025-03-18 | [55811](https://github.com/airbytehq/airbyte/pull/55811)   | CDK: Pass DestinationStream around vs Descriptor                                                                          |
| 2.0.2      | 2025-03-12 | [55720](https://github.com/airbytehq/airbyte/pull/55720)   | Restore definition ID                                                                                                     |
| 2.0.1      | 2025-03-12 | [55718](https://github.com/airbytehq/airbyte/pull/55718)   | Fix breaking change information in metadata.yaml                                                                          |
| 2.0.0      | 2025-03-11 | [55684](https://github.com/airbytehq/airbyte/pull/55684)   | Release 2.0.0                                                                                                             |
| 2.0.0.rc13 | 2025-03-07 | [55252](https://github.com/airbytehq/airbyte/pull/55252)   | RC13: Bugfix for OOM on Bulk Load                                                                                         |
| 2.0.0.rc12 | 2025-03-05 | [54159](https://github.com/airbytehq/airbyte/pull/54159)   | RC12: Support For Bulk Insert Using Azure Blob Storage                                                                    |
| 2.0.0.rc11 | 2025-03-04 | [55193](https://github.com/airbytehq/airbyte/pull/55193)   | RC11: Increase decimal precision                                                                                          |
| 2.0.0.rc10 | 2025-02-24 | [54648](https://github.com/airbytehq/airbyte/pull/54648)   | RC10: Fix index column names with hyphens                                                                                 |
| 2.0.0.rc9  | 2025-02-21 | [54197](https://github.com/airbytehq/airbyte/pull/54197)   | RC9: Fix index column names with invalid characters                                                                       |
| 2.0.0.rc8  | 2025-02-20 | [54186](https://github.com/airbytehq/airbyte/pull/54186)   | RC8: Fix String support                                                                                                   |
| 2.0.0.rc7  | 2025-02-11 | [53364](https://github.com/airbytehq/airbyte/pull/53364)   | RC7: Revert deletion change                                                                                               |
| 2.0.0.rc6  | 2025-02-11 | [53364](https://github.com/airbytehq/airbyte/pull/53364)   | RC6: Break up deletes into loop to reduce locking                                                                         |
| 2.0.0.rc5  | 2025-02-07 | [53236](https://github.com/airbytehq/airbyte/pull/53236)   | RC5: Use rowlock hint                                                                                                     |
| 2.0.0.rc4  | 2025-02-06 | [53192](https://github.com/airbytehq/airbyte/pull/53192)   | RC4: Fix config, timehandling, performance tweak                                                                          |
| 2.0.0.rc3  | 2025-02-04 | [53174](https://github.com/airbytehq/airbyte/pull/53174)   | RC3: Fix metadata.yaml for publish                                                                                        |
| 2.0.0.rc2  | 2025-02-04 | [52704](https://github.com/airbytehq/airbyte/pull/52704)   | RC2: Performance improvement                                                                                              |
| 2.0.0.rc1  | 2025-01-24 | [52096](https://github.com/airbytehq/airbyte/pull/52096)   | Release candidate                                                                                                         |
| 1.0.3      | 2025-01-10 | [51497](https://github.com/airbytehq/airbyte/pull/51497)   | Use a non root base image                                                                                                 |
| 1.0.2      | 2024-12-18 | [49891](https://github.com/airbytehq/airbyte/pull/49891)   | Use a base image: airbyte/java-connector-base:1.0.0                                                                       |
| 1.0.1      | 2024-11-04 | [\#48134](https://github.com/airbytehq/airbyte/pull/48134) | Fix supported sync modes (destination-mssql 1.x.y does not support dedup)                                                 |
| 1.0.0      | 2024-04-11 | [\#36050](https://github.com/airbytehq/airbyte/pull/36050) | Update to Dv2 Table Format and Remove normalization                                                                       |
| 0.2.0      | 2023-06-27 | [\#27781](https://github.com/airbytehq/airbyte/pull/27781) | License Update: Elv2                                                                                                      |
| 0.1.25     | 2023-06-21 | [\#27555](https://github.com/airbytehq/airbyte/pull/27555) | Reduce image size                                                                                                         |
| 0.1.24     | 2023-06-05 | [\#27034](https://github.com/airbytehq/airbyte/pull/27034) | Internal code change for future development (install normalization packages inside connector)                             |
| 0.1.23     | 2023-04-04 | [\#24604](https://github.com/airbytehq/airbyte/pull/24604) | Support for destination checkpointing                                                                                     |
| 0.1.22     | 2022-10-21 | [\#18275](https://github.com/airbytehq/airbyte/pull/18275) | Upgrade commons-text for CVE 2022-42889                                                                                   |
| 0.1.20     | 2022-07-14 | [\#14618](https://github.com/airbytehq/airbyte/pull/14618) | Removed additionalProperties: false from JDBC destination connectors                                                      |
| 0.1.19     | 2022-05-25 | [\#13054](https://github.com/airbytehq/airbyte/pull/13054) | Destination MSSQL: added custom JDBC parameters support.                                                                  |
| 0.1.18     | 2022-05-17 | [\#12820](https://github.com/airbytehq/airbyte/pull/12820) | Improved 'check' operation performance                                                                                    |
| 0.1.17     | 2022-04-05 | [\#11729](https://github.com/airbytehq/airbyte/pull/11729) | Bump mina-sshd from 2.7.0 to 2.8.0                                                                                        |
| 0.1.15     | 2022-02-25 | [\#10421](https://github.com/airbytehq/airbyte/pull/10421) | Refactor JDBC parameters handling                                                                                         |
| 0.1.14     | 2022-02-14 | [\#10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                                              |
| 0.1.13     | 2021-12-28 | [\#9158](https://github.com/airbytehq/airbyte/pull/9158)   | Update connector fields title/description                                                                                 |
| 0.1.12     | 2021-12-01 | [\#8371](https://github.com/airbytehq/airbyte/pull/8371)   | Fixed incorrect handling "\n" in ssh key                                                                                  |
| 0.1.11     | 2021-11-08 | [\#7719](https://github.com/airbytehq/airbyte/pull/7719)   | Improve handling of wide rows by buffering records based on their byte size rather than their count                       |
| 0.1.10     | 2021-10-11 | [\#6877](https://github.com/airbytehq/airbyte/pull/6877)   | Add `normalization` capability, add `append+deduplication` sync mode                                                      |
| 0.1.9      | 2021-09-29 | [\#5970](https://github.com/airbytehq/airbyte/pull/5970)   | Add support & test cases for MSSQL Destination via SSH tunnels                                                            |
| 0.1.8      | 2021-08-07 | [\#5272](https://github.com/airbytehq/airbyte/pull/5272)   | Add batch method to insert records                                                                                        |
| 0.1.7      | 2021-07-30 | [\#5125](https://github.com/airbytehq/airbyte/pull/5125)   | Enable `additionalPropertities` in spec.json                                                                              |
| 0.1.6      | 2021-06-21 | [\#3555](https://github.com/airbytehq/airbyte/pull/3555)   | Partial Success in BufferedStreamConsumer                                                                                 |
| 0.1.5      | 2021-07-20 | [\#4874](https://github.com/airbytehq/airbyte/pull/4874)   | declare object types correctly in spec                                                                                    |
| 0.1.4      | 2021-06-17 | [\#3744](https://github.com/airbytehq/airbyte/pull/3744)   | Fix doc/params in specification file                                                                                      |
| 0.1.3      | 2021-05-28 | [\#3973](https://github.com/airbytehq/airbyte/pull/3973)   | Change dockerfile entrypoint                                                                                              |
| 0.1.2      | 2021-05-13 | [\#3671](https://github.com/airbytehq/airbyte/pull/3671)   | Fix handle symbols unicode                                                                                                |
| 0.1.1      | 2021-05-11 | [\#3195](https://github.com/airbytehq/airbyte/pull/3195)   | MS SQL Server Destination Release!                                                                                        |

</details>
