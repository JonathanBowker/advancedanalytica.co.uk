---
generated_record: true
connector_name: Redshift
connector_type: source
connector_slug: redshift
connector_directory: source-redshift
definition_id: e87ffa8e-a3b5-f69c-9076-6011339de1f6
version: 0.5.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/redshift
logo: /images/connectors/sources/redshift.svg
logo_source_path: airbyte-integrations/connectors/source-redshift/icon.svg
logo_sha256: 48979e57a61d4739402847846c22e0219796016a0bfa140f61371c03f27251fd
original_metadata_path: airbyte-integrations/connectors/source-redshift/metadata.yaml
original_metadata_sha256: 712ff76fc5bf6987dd63dfcdb545d62a17c757e777ab6424695fe4dea1a7d818
original_document_path: docs/integrations/sources/redshift.md
original_document_sha256: 1255468d99b31a28e9c858a8699dee099f88424be1f939a66c3474a7ac831343
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7c07b030954e234c4674861295aa9f1f8440af08120c1eae673dafc52207e784
rewritten_at: 2026-11-12T13:53:38.984965+00:00
---

# Redshift

<HideInUI>

You can replicate data from Amazon Redshift to your destination using JDBC. The connector supports full refresh and cursor-based incremental syncs.

</HideInUI>

## Features

| Feature                       | Supported | Notes                                                                                  |
| :---------------------------- | :-------- | :------------------------------------------------------------------------------------- |
| Full Refresh Sync             | Yes       |                                                                                        |
| Incremental Sync              | Yes       | Cursor-based, using `ORDER BY` on a user-defined cursor column                         |
| Replicate Incremental Deletes | No        |                                                                                        |
| Logical Replication (WAL)     | No        |                                                                                        |
| SSL Support                   | Yes       | Enabled by default on all connections                                                  |
| SSH Tunnel Connection         | No        |                                                                                        |
| Namespaces                    | Yes       | Enabled by default                                                                     |
| Schema Selection              | Yes       | Multiple schemas may be used at one time; leave empty to replicate all schemas          |

The Redshift source doesn't alter your warehouse schema. However, the connected destination may alter it. See the destination's documentation for details.

### Incremental sync

You can run incremental syncs using a [user-defined cursor field](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append/#user-defined-cursor), such as an `updated_at` column. The connector uses this column to track rows changed since the previous sync.

You must also configure a primary key for the stream to run [incremental + dedupe](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped) syncs.

## Prerequisites

1. An active Amazon Redshift cluster.
2. A database user with `SELECT` permission for the tables you want to replicate. A dedicated read-only user is recommended.
3. Network access from Airbyte to your Redshift cluster, if they're in separate VPCs. See [Authorizing access to your cluster](https://docs.aws.amazon.com/redshift/latest/gsg/rs-gsg-authorize-cluster-access.html) in the AWS docs.

## Setup guide

### 1. Verify cluster access

Use the **Test Connection** button in the Airbyte UI to confirm Airbyte can reach your Redshift cluster. If the connection fails, review your VPC security groups and subnet routing.

### 2. Configure the source

Enter these connection details in the Airbyte UI:

| Field              | Description                                                                                                                                                                                                                                                   |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Host**           | The endpoint of your Redshift cluster, without the port or database name. This typically includes the cluster ID, region, and ends with `.redshift.amazonaws.com`. Find it on the cluster details page under [Connection string](https://docs.aws.amazon.com/redshift/latest/gsg/rs-gsg-connect-to-cluster.html#rs-gsg-how-to-get-connection-string). |
| **Port**           | The port your cluster listens on. The default is `5439`.                                                                                                                                                                                                      |
| **Database**       | The name of the database to connect to.                                                                                                                                                                                                                       |
| **Username**       | The database user to authenticate as.                                                                                                                                                                                                                         |
| **Password**       | The password for the database user.                                                                                                                                                                                                                           |
| **Schemas**        | (Optional) A list of schemas to replicate. Schema names are case-sensitive. Leave empty to replicate all schemas the user has access to.                                                                                                                      |
| **JDBC URL Params** | (Optional) Additional JDBC connection properties, formatted as `key=value` pairs separated by `&` (for example, `loginTimeout=30&tcpKeepAlive=true`).                                                                                                        |

### Encryption

All connections use SSL by default. You don't need any additional configuration.

## Data type handling

The connector automatically maps Redshift data types to Airbyte types. Be aware of these behaviours:

- The connector reads **`timestamp`** and **`timestamptz`** columns as raw server-rendered strings, then parses them. This bypasses the JDBC driver's timezone conversion. It avoids a known JDBC driver behaviour that can shift timestamps by an hour during daylight saving time transitions.
- Redshift stores **`timestamptz`** values as UTC. The connector preserves the UTC instant when serialising these values.
- When using a `timestamptz` column as an incremental sync cursor, the connector handles timezone-aware and timezone-naive cursor formats.

## Limitations

- Change Data Capture (CDC) isn't supported. Only cursor-based incremental replication is available.
- SSH tunnel connections aren't supported.
- IAM-based authentication isn't supported. You must authenticate with a database username and password.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                   |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| 0.5.5 | 2026-06-04 | [74769](https://github.com/airbytehq/airbyte/pull/74769) | Handle timezone-aware timestamps in cursor parsing and fix DST offset in `timestamptz` reads |
| 0.5.4 | 2025-07-16 | [62922](https://github.com/airbytehq/airbyte/pull/62922) | Convert to new gradle build flow |
| 0.5.3 | 2024-12-18 | [49893](https://github.com/airbytehq/airbyte/pull/49893) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.5.2 | 2024-02-13 | [35223](https://github.com/airbytehq/airbyte/pull/35223) | Adopt CDK 0.20.4 |
| 0.5.1 | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version |
| 0.5.0 | 2023-12-18 | [33484](https://github.com/airbytehq/airbyte/pull/33484) | Remove LEGACY state |
| (none)  | 2023-11-17 | [32616](https://github.com/airbytehq/airbyte/pull/32616) | Improve timestamptz handling                                                                                                              |
| 0.4.0   | 2023-06-26 | [27737](https://github.com/airbytehq/airbyte/pull/27737) | License Update: Elv2                                                                                                                      |
| 0.3.17  | 2023-06-20 | [27212](https://github.com/airbytehq/airbyte/pull/27212) | Fix silent exception swallowing in StreamingJdbcDatabase                                                                                  |
| 0.3.16  | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346) | Consolidate date/time values mapping for JDBC sources                                                                                     |
| 0.3.15  | 2022-10-13 | [16238](https://github.com/airbytehq/airbyte/pull/16238) | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode |
| 0.3.14  | 2022-09-01 | [16258](https://github.com/airbytehq/airbyte/pull/16258) | Emit state messages more frequently                                                                                                       |
| 0.3.13  | 2022-05-25 |                                                          | Added JDBC URL params                                                                                                                     |
| 0.3.12  | 2022-08-18 | [14356](https://github.com/airbytehq/airbyte/pull/14356) | DB Sources: only show a table can sync incrementally if at least one column can be used as a cursor field                                 |
| 0.3.11  | 2022-07-14 | [14574](https://github.com/airbytehq/airbyte/pull/14574) | Removed additionalProperties:false from JDBC source connectors                                                                            |
| 0.3.10  | 2022-04-29 | [12480](https://github.com/airbytehq/airbyte/pull/12480) | Query tables with adaptive fetch size to optimize JDBC memory consumption                                                                 |
| 0.3.9   | 2022-02-21 | [9744](https://github.com/airbytehq/airbyte/pull/9744)   | List only the tables on which the user has SELECT permissions.                                                                            |
| 0.3.8   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                                                              |
| 0.3.7   | 2022-01-26 | [9721](https://github.com/airbytehq/airbyte/pull/9721)   | Added schema selection                                                                                                                    |
| 0.3.6   | 2022-01-20 | [8617](https://github.com/airbytehq/airbyte/pull/8617)   | Update connector fields title/description                                                                                                 |
| 0.3.5   | 2021-12-24 | [8958](https://github.com/airbytehq/airbyte/pull/8958)   | Add support for JdbcType.ARRAY                                                                                                            |
| 0.3.4   | 2021-10-21 | [7234](https://github.com/airbytehq/airbyte/pull/7234)   | Allow SSL traffic only                                                                                                                    |
| 0.3.3   | 2021-10-12 | [6965](https://github.com/airbytehq/airbyte/pull/6965)   | Added SSL Support                                                                                                                         |
| 0.3.2   | 2021-08-13 | [4699](https://github.com/airbytehq/airbyte/pull/4699)   | Added json config validator                                                                                                               |

</details>
