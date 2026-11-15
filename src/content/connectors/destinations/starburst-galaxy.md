---
generated_record: true
connector_name: Starburst Galaxy
connector_type: destination
connector_slug: starburst-galaxy
connector_directory: destination-starburst-galaxy
definition_id: 4528e960-6f7b-4412-8555-7e0097e1da17
version: 0.0.1
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/starburst-galaxy
logo: /images/connectors/destinations/starburst-galaxy.svg
logo_source_path: airbyte-integrations/connectors/destination-starburst-galaxy/icon.svg
logo_sha256: 5d0582d00dafe827579929fef54fc02de60f405967846ed0aa25919cce9e9eb3
original_metadata_path: airbyte-integrations/connectors/destination-starburst-galaxy/metadata.yaml
original_metadata_sha256: 0b0e1a9bc74aa9ea749a0f686a84427542881cf4d4f1567eae68efd42c70b632
original_document_path: docs/integrations/destinations/starburst-galaxy.md
original_document_sha256: 1e9b6f1a5dc03180f64fd1a17d54d89653555a93fe2ef54466ec71749baf672a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 26b76fb4f1cbf6a735e5a8064d978aae929cd5c007ca250cc3a1fb7d64e4d20b
rewritten_at: 2026-11-12T13:27:27.589596+00:00
---

# Starburst Galaxy destination guide

## Overview

The Starburst Galaxy destination syncs your data to Starburst Galaxy [great lake catalogs](https://docs.starburst.io/starburst-galaxy/sql/great-lakes.html) in [Apache Iceberg](https://iceberg.apache.org/) table format. Each stream is written to a separate Iceberg table.

## Data storage

Starburst Galaxy supports various [object storages](https://docs.starburst.io/starburst-galaxy/catalogs/index.html#object-storage). However, this connector only supports Amazon S3.

## Configuration

| Category                         | Parameter                     |  Type   | Notes                                                                                                                                                                                                                |
| :------------------------------- | :---------------------------- | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Starburst Galaxy                 | `Hostname`                    | string  | Required. Located in the **Connection info** section of the [view clusters](https://docs.starburst.io/starburst-galaxy/clusters/index.html#manage-clusters) pane in Starburst Galaxy.                                |
|                                  | `Port`                        | string  | Optional. Located in the **Connection info** section of the [view clusters](https://docs.starburst.io/starburst-galaxy/clusters/index.html#manage-clusters) pane in Starburst Galaxy. Defaults to `443`.             |
|                                  | `User`                        | string  | Required. Galaxy user found in the **Connection info** section of the [view clusters](https://docs.starburst.io/starburst-galaxy/clusters/index.html#manage-clusters) pane in Starburst Galaxy.                      |
|                                  | `Password`                    | string  | Required. Password for the specified Galaxy user.                                                                                                                                                                    |
|                                  | `Amazon S3 catalog`           | string  | Required. Name of the [Amazon S3 catalog](https://docs.starburst.io/starburst-galaxy/catalogs/s3.html) created in the Galaxy domain.                                                                                 |
|                                  | `Amazon S3 catalog schema`    | string  | Optional. The default Starburst Galaxy Amazon S3 catalog schema where tables are written to if the source does not specify a namespace. Each data stream is written to a table in this schema. Defaults to `public`. |
| Staging Object Store - Amazon S3 | `Bucket name`                 | string  | Required. Name of the bucket where the staging data is stored.                                                                                                                                                       |
|                                  | `Bucket path`                 | string  | Required. Sets the subdirectory of the specified S3 bucket used for storing staging data.                                                                                                                            |
|                                  | `Bucket region`               | string  | Required. Sets the region of the specified S3 bucket.                                                                                                                                                                |
|                                  | `Access key`                  | string  | Required. AWS/Minio credential.                                                                                                                                                                                      |
|                                  | `Secret key`                  | string  | Required. AWS/Minio credential.                                                                                                                                                                                      |
| General                          | `Purge staging Iceberg table` | boolean | Optional. Indicates that staging Iceberg table is purged after a data sync is complete. Enabled by default. Disable it for debugging purposes only.                                                                  |

## Staging files

### S3

Your data streams are written to a temporary Iceberg table. They're then loaded into the Amazon S3 Starburst Galaxy catalog in Iceberg table format.
The staging table is deleted after each completed sync if `Purge staging Iceberg table` is enabled.
Here's an example of a full staging file path:

```text
s3://<bucket-name>/<bucket-path>/<namespace/schema>/<temp Iceberg table name {_airbyte_tmp_random-three-chars_stream-name}>
```

For example:

```text
s3://galaxy_bucket/data_output_path/test_schema/_airbyte_tmp_qey_user
     ↑              ↑                     ↑                ↑
     |              |                     |                temporary Iceberg table holding data
     |              |                     source namespace or provided schema name
     |              |
     |              bucket path
     bucket name
```

## Target Iceberg table

Your streams are synced to the Starburst Galaxy Amazon S3 catalog in Iceberg table format.

## Output schema

Each table in the output schema contains these columns:

| Column                             |         Type          | Description                                                                                          |
| :--------------------------------- | :-------------------: | :--------------------------------------------------------------------------------------------------- |
| `_airbyte_ab_id`                   |        varchar        | UUID.                                                                                                |
| `_airbyte_emitted_at`              |     timestamp(6)      | Data emission timestamp.                                                                             |
| Data fields from the source stream |        various        | All the fields from the source stream will be populated as an individual column in the target table. |
| `_airbyte_additional_properties`   | map(varchar, varchar) | Additional properties.                                                                               |

The Airbyte data stream's JSON schema is converted to an Avro schema. The JSON object is then converted to an Avro record.
The Avro record is written to a staging Iceberg table. Data streams can come from any data source.
Therefore, the JSON-to-Avro conversion process has arbitrary rules and limitations.
Learn more about [how source data is converted to Avro](https://docs.airbyte.io/understanding-airbyte/json-avro-conversion).

### Data type support

Learn more about [Starburst Galaxy Iceberg type mapping](https://docs.starburst.io/latest/connector/iceberg.html#iceberg-to-trino-type-mapping).

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Getting started

### Requirements

- [Starburst Galaxy cluster](https://docs.starburst.io/starburst-galaxy/clusters/index.html). You'll find the required credentials in the **Connection info** section of the [view clusters](https://docs.starburst.io/starburst-galaxy/clusters/index.html#manage-clusters) page.
- A [Starburst Galaxy S3 catalog](https://docs.starburst.io/starburst-galaxy/catalogs/s3.html) created within the Galaxy domain, and [attached to a running cluster](https://docs.starburst.io/starburst-galaxy/catalogs/index.html#add-a-catalog-to-a-cluster).
- [Credentials for S3 bucket](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).
- Grant S3 bucket [location privileges](https://docs.starburst.io/starburst-galaxy/security/privileges.html#location-privileges-) to the role assigned to the user.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a Starburst Galaxy schema.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                 |
| :------ | :--------- | :--------------------------------------------------------- | :---------------------- |
| 0.0.1   | 2023-03-28 | [\#24620](https://github.com/airbytehq/airbyte/pull/24620) | Initial public release. |

</details>
