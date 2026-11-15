---
generated_record: true
connector_name: GCS Data Lake
connector_type: destination
connector_slug: gcs-data-lake
connector_directory: destination-gcs-data-lake
definition_id: 8c8a2d3e-1b4f-4a9c-9e7d-6f5a4b3c2d1e
version: 1.0.14
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/destinations/gcs-data-lake
logo: /images/connectors/destinations/gcs-data-lake.svg
logo_source_path: airbyte-integrations/connectors/destination-gcs-data-lake/icon.svg
logo_sha256: eba0bd6ac7414a356b28c075d3ff4fa79efeb2084ee7d876f05ab7c9165673af
original_metadata_path: airbyte-integrations/connectors/destination-gcs-data-lake/metadata.yaml
original_metadata_sha256: 91c66576dd30144862a02d7f80f5f88a4349eda4a52d8be93b0b44a318fc4059
original_document_path: docs/integrations/destinations/gcs-data-lake.md
original_document_sha256: 623714bc168d13ea96c22fd6be8f5f23a8a2b19bfc793c4f244b4ac579058399
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 896b5b35db8b5fed27099dcc834f95e42e2c92caa954ac9298bfd89b389cb7d9
rewritten_at: 2026-11-12T13:24:40.774170+00:00
---

# GCS Data Lake

Set up the GCS Data Lake destination connector using this guide.

This connector provides Airbyte's official support for the Iceberg protocol on Google Cloud Storage. It writes Iceberg tables to GCS through a supported Iceberg catalog.

## Prerequisites

You need two things to use the GCS Data Lake connector:

1. A Google Cloud Storage bucket
2. A supported Iceberg catalog. The connector currently supports:
   - BigLake
   - Polaris

If you're using Airbyte Cloud with IP-based access controls, add Airbyte's [IP addresses](/platform/operating-airbyte/ip-allowlist) to your allowlist.

## Set up the connector

Set up your GCS storage and Iceberg catalog permissions using these steps.

### Set up GCS permissions

#### Create a GCS bucket

1. Open the [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Cloud Storage** > **Buckets**
3. Click **CREATE BUCKET**
4. Choose a bucket name and location
5. Select a storage class and access control settings
6. Click **CREATE**

#### Create a service account

1. In the Google Cloud Console, go to **IAM & Admin** > **Service Accounts**
2. Click **CREATE SERVICE ACCOUNT**
3. Give it a name, such as `airbyte-gcs-data-lake`
4. Grant these roles:
   - **Storage Admin** - Provides full GCS bucket access
   - **BigQuery Data Editor** - Supports BigLake catalog operations
   - **BigQuery User** - Supports BigQuery operations
   - **Service Usage Consumer** - Allows access to GCP services

5. Click **CREATE KEY** and choose the **JSON** format
6. Download the JSON key file
7. In Airbyte, paste the JSON file's entire contents into the **Service Account JSON** field

### Set up Iceberg permissions

Your remaining setup steps depend on the catalog you're using.

#### BigLake

BigLake is Google Cloud's managed Iceberg catalog service. To use BigLake, you need a BigLake catalog in your GCP project. The service account you created earlier should have permission to access this catalog.

#### Polaris

Authenticate with Apache Polaris using these steps:

1. Set up your Polaris catalog and create a principal with the required permissions. See the [Apache Polaris documentation](https://polaris.apache.org/) for detailed setup instructions.

2. When you create a principal in Polaris, you'll receive OAuth credentials (Client ID and Client Secret). Keep these credentials secure.

3. Grant the required privileges to your principal's catalog role. Choose either:

   **Option A: grant the broad `CATALOG_MANAGE_CONTENT` privilege** (recommended for simplicity):
    - This single privilege lets the connector manage tables and namespaces in the catalog

   **Option B: grant specific granular privileges**:
    - `TABLE_LIST` - Lists tables in a namespace
    - `TABLE_CREATE` - Creates new tables
    - `TABLE_DROP` - Deletes tables
    - `TABLE_READ_PROPERTIES` - Reads table metadata
    - `TABLE_WRITE_PROPERTIES` - Updates table metadata
    - `TABLE_WRITE_DATA` - Writes data to tables
    - `NAMESPACE_LIST` - Lists namespaces
    - `NAMESPACE_CREATE` - Creates new namespaces
    - `NAMESPACE_READ_PROPERTIES` - Reads namespace metadata

4. Confirm that your Polaris catalog has the correct storage credentials for accessing your GCS bucket.

## Configure the connector

Configure these fields in Airbyte:

### Fields for all catalogs

| Field                    | Required   | Description                                                                  |
|--------------------------|------------|------------------------------------------------------------------------------|
| **GCS Bucket Name**      | Yes        | The name of your GCS bucket (for example: `my-data-lake`)                    |
| **Service Account JSON** | Yes        | The complete JSON content from your service account key file                 |
| **GCP Project ID**       | No         | The GCP project ID. If not specified, extracted from service account         |
| **GCP Location**         | Yes        | The GCP location/region (for example: `us`, `us-central1`, `eu`)             |
| **Warehouse Location**   | Yes        | Root path for Iceberg data in GCS (for example: `gs://my-bucket/warehouse`)  |
| **Catalog Type**         | Yes        | Select the type of Iceberg catalog to use: `BigLake` or `Polaris`            |
| **Main Branch Name**     | No         | Iceberg branch name (default: `main`)                                        |
| **Default Namespace**    | No         | Default namespace for tables (default: `default`). Only used when **Destination Namespace** is `Destination-defined` or `Source-defined` |
| **GCS Endpoint**         | No         | Custom GCS endpoint URL. Only needed when running against a local GCS emulator |

### BigLake fields

When **Catalog Type** is set to `BigLake`, configure these additional fields:

| Field                    | Required   | Description                                                          |
|--------------------------|------------|----------------------------------------------------------------------|
| **BigLake Catalog Name** | Yes        | Name of your BigLake catalog (from the setup step)                   |

### Polaris fields

When **Catalog Type** is set to `Polaris`, configure these additional fields:

| Field                  | Required   | Description                                                                            |
|------------------------|------------|----------------------------------------------------------------------------------------|
| **Polaris Server URI** | Yes        | The base URL of your Polaris server (for example: `http://localhost:8181/api/catalog`) |
| **Catalog Name**       | Yes        | The name of the catalog in Polaris (for example: `quickstart_catalog`)                 |
| **Client ID**          | Yes        | The OAuth Client ID for authenticating with the Polaris server                         |
| **Client Secret**      | Yes        | The OAuth Client Secret for authenticating with the Polaris server                     |

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Output schema

### Iceberg schema generation

For each stream, Airbyte maps top-level fields to Iceberg fields. It maps nested fields, including objects, arrays and unions, to string columns. Airbyte writes these fields as serialised JSON.

The following mapping covers every Airbyte type and its corresponding Iceberg type.

| Airbyte type               | Iceberg type                   |
|----------------------------|--------------------------------|
| Boolean                    | Boolean                        |
| Date                       | Date                           |
| Integer                    | Long                           |
| Number                     | Double                         |
| String                     | String                         |
| Time with timezone*        | Time                           |
| Time without timezone      | Time                           |
| Timestamp with timezone*   | Timestamp with timezone        |
| Timestamp without timezone | Timestamp without timezone     |
| Object                     | String (JSON-serialized value) |
| Array                      | String (JSON-serialized value) |
| Union                      | String (JSON-serialized value) |

*Before writing to the Iceberg file, Airbyte converts `time with timezone` and `timestamp with timezone` types to Coordinated Universal Time (UTC).

### Manage schema evolution

This connector never rewrites existing Iceberg data files. Airbyte can therefore handle only these source schema changes:

- Adding or removing a column
- Widening a column
- Changing the primary key

You can manage schema evolution in these ways:

- To handle unsupported schema changes automatically, use [Full Refresh - Overwrite](../../platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) as your [sync mode](../../platform/using-airbyte/core-concepts/sync-modes).
- To handle unsupported changes when they occur, wait for a sync to fail. Then restore it by either:
    - Manually editing your table schema directly in Iceberg.
    - [Refresh](../../platform/operator-guides/refreshes) your connection in Airbyte.
    - [Clear](../../platform/operator-guides/clear) your connection in Airbyte.

## Deduplication

This connector supports deduplication through a merge-on-read strategy.

- Airbyte translates the stream's primary keys to Iceberg's [identifier columns](https://iceberg.apache.org/spec/#identifier-field-ids).
- An "upsert" performs an [equality-based delete](https://iceberg.apache.org/spec/#equality-delete-files) on the row's primary key, then inserts the new data.

### Primary key assumptions

The GCS Data Lake connector assumes one of these conditions is true:

- The source never emits the same primary key twice during one sync attempt.
- If the source emits the same primary key more than once, it orders those records by cursor from oldest to newest.

If neither condition is met, older records may take precedence over newer records in Iceberg. If this happens, use append or overwrite as your [sync modes](../../platform/using-airbyte/core-concepts/sync-modes/).

An unknown number of API source streams don't meet these conditions. Airbyte knows [Stripe](../sources/stripe) and [Monday](../sources/monday) don't, and others probably don't either.

## Branches and data availability

Iceberg supports [Git-like semantics](https://iceberg.apache.org/docs/latest/branching/) across your data. This connector uses those semantics to make syncs resilient.

- Each microbatch creates a new snapshot during every sync.
- During truncate syncs, the connector writes refreshed data to the `airbyte_staging` branch. At the sync's end, it replaces the `main` branch with the `airbyte_staging`. Most query engines target the `main` branch, so you can query your data throughout the truncate sync. At the end, the connector atomically swaps in the new version.

### Replace branches

At the end of a stream sync, the current `main` branch is replaced with the `airbyte_staging` branch. The connector deliberately avoids fast-forwarding to handle potential compaction issues more effectively.

**Important Warning**: This process discards any external changes made to the `main` branch after a sync begins.

## Compaction

:::caution
**Do not run compaction during a truncate refresh sync to prevent data loss.**
During a truncate refresh sync, the system deletes every file outside the latest generation. This includes:

- Files without generation IDs (compacted files)
- Files from previous generations

If compaction runs during the sync, it deletes files from the current generation and causes data loss.
:::

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                 | Subject                                                                               |
|:--------|:-----------|:-------------------------------------------------------------|:--------------------------------------------------------------------------------------|
| 1.0.14 | 2026-10-22 | [89651](https://github.com/airbytehq/airbyte/pull/89651) | Upgrade to Bulk CDK 1.1.9: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86; netty 4.1.139, Hadoop 3.4.3, Parquet 1.18.1; drop Jetty from the Hadoop client. |
| 1.0.13 | 2026-10-01 | [87616](https://github.com/airbytehq/airbyte/pull/87616) | Upgrade to Bulk CDK 1.1.1. |
| 1.0.12 | 2026-09-11 | [85852](https://github.com/airbytehq/airbyte/pull/85852) | Replace deprecated `Types.NestedField.of` usage. |
| 1.0.11 | 2026-09-01 | [84992](https://github.com/airbytehq/airbyte/pull/84992) | Upgrade to Bulk CDK 1.0.25. |
| 1.0.10  | 2026-05-19 | [78235](https://github.com/airbytehq/airbyte/pull/78235)     | Upgrade CDK to 1.0.13                                                                  |
| 1.0.9   | 2026-04-17 | [76406](https://github.com/airbytehq/airbyte/pull/76406)     | Upgrade CDK to 1.0.9                                                                  |
| 1.0.8   | 2026-03-30 | [75630](https://github.com/airbytehq/airbyte/pull/75630)     | Upgrade CDK to 1.0.7: fix sort order handling during schema evolution                 |
| 1.0.7   | 2026-02-09 | [72855](https://github.com/airbytehq/airbyte/pull/72855)     | Upgrade CDK to 0.2.8                                                                  |
| 1.0.6   | 2026-01-23 | [72300](https://github.com/airbytehq/airbyte/pull/72300)     | Upgrade CDK to 0.2.0                                                                  |
| 1.0.5   | 2026-01-14 | [71760](https://github.com/airbytehq/airbyte/pull/71760)     | Restore integration tests in CI. Workaround DI error.                                 |
| 1.0.4   | 2026-01-12 | [71227](https://github.com/airbytehq/airbyte/pull/71227)     | Add speed mode support with PROTOBUF serialization                                    |
| 1.0.3   | 2026-01-12 | [71258](https://github.com/airbytehq/airbyte/pull/71258)     | Migrate to TableSchemaMapper from deprecated ColumnNameMapper pattern                 |
| 1.0.2   | 2025-11-13 | [69317](https://github.com/airbytehq/airbyte/pull/69317)     | Connector generally available                                                         |
| 1.0.1   | 2025-11-13 | [69212](https://github.com/airbytehq/airbyte/pull/69212)     | Initial release of GCS Data Lake destination with BigLake and Polaris catalog support |

</details>
