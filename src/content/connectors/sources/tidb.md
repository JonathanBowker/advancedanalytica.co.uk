---
generated_record: true
connector_name: TiDB
connector_type: source
connector_slug: tidb
connector_directory: source-tidb
definition_id: 0dad1a35-ccf8-4d03-b73e-6788c00b13ae
version: 0.3.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/tidb
logo: /images/connectors/sources/tidb.svg
logo_source_path: airbyte-integrations/connectors/source-tidb/icon.svg
logo_sha256: 1c26900f5c45bfcc0389f185b70f2059922f1643631b758527039f670c13a686
original_metadata_path: airbyte-integrations/connectors/source-tidb/metadata.yaml
original_metadata_sha256: 1f546de77a425e2741ea231c22b3ab0878f8ad6df5103f18097c00d5e986b6d5
original_document_path: docs/integrations/sources/tidb.md
original_document_sha256: 9693deba6b5c11cf4c65d39cf9ab51ead0d12f40316e3bd1265f6e0631746abb
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d13b25954d6341f1ebe5c64cca8678b57b230d25fc2ece6478f2f86ad837b468
rewritten_at: 2026-11-12T13:59:01.453817+00:00
---

# TiDB

## Overview

[TiDB](https://github.com/pingcap/tidb) (/’taɪdiːbi:/, where "Ti" stands for Titanium) is an open-source, distributed NewSQL database for Hybrid Transactional and Analytical Processing (HTAP) workloads. It is MySQL compatible, with horizontal scalability, strong consistency and high availability. You can deploy TiDB on-premise or in-cloud.

The TiDB source supports Full Refresh and Incremental syncs. You can copy only new or updated data. Alternatively, copy every row from the tables and columns you’ve set up whenever a sync runs.

### Resulting schema

The TiDB source preserves your database schema. However, the connected destination may alter it. See the destination’s documentation for details.

### Features

| Feature                       | Supported | Notes |
| :---------------------------- | :-------- | :---- |
| Full Refresh Sync             | Yes       |       |
| Incremental - Append Sync     | Yes       |       |
| Replicate Incremental Deletes | Yes       |       |
| Change Data Capture           | No        |       |
| SSL Support                   | Yes       |       |
| SSH Tunnel Connection         | Yes       |       |

## Get started

### Requirements

1. TiDB `v4.0` or above
2. Allow Airbyte to connect to your TiDB database if they’re in separate VPCs
3. (Optional) Create a dedicated, read-only Airbyte user with access to every table required for replication

**Note:** When you connect to [TiDB Cloud](https://en.pingcap.com/tidb-cloud/) with TLS enabled, specify a TLS protocol in the JDBC parameters. For example, use `enabledTLSProtocols=TLSv1.2` or `enabledTLSProtocols=TLSv1.3`.

### Setup guide

#### 1. Make your database accessible to Airbyte

Access depends on your network setup. To confirm Airbyte can connect to your TiDB instance, use the check connection tool in the UI.

#### 2. Create a dedicated read-only user (recommended but optional)

This optional step gives you better permission control and auditing. Alternatively, you can connect Airbyte using an existing database user.

Run the following commands against your database to create a dedicated user:

```sql
CREATE USER 'airbyte'@'%' IDENTIFIED BY 'your_password_here';
```

Then grant the user access to the relevant database:

```sql
GRANT SELECT ON <database name>.* TO 'airbyte'@'%';
```

#### 3. Complete the setup

Your database user is now ready to use with Airbyte.

### Connect through an SSH tunnel

Airbyte can connect to a TiDB instance through an SSH tunnel. Use this option when direct database access is impossible or conflicts with your security policy. For example, the database may not have a public IP address.

An SSH tunnel connects Airbyte through an intermediate server, also called a bastion server. This server must have direct database access. Airbyte connects to the bastion server, which then connects directly to the database server.

This feature requires extra configuration when you create the source. The following steps explain each configuration field.

1. Configure every source field as usual, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel`, which means a direct connection. For an SSH tunnel, choose `SSH Key Authentication` or `Password Authentication`.
   1. Choose `Key Authentication` to establish the SSH tunnel using an RSA private key. See below for more information about generating this key.
   2. Choose `Password Authentication` to establish the SSH tunnel using a password.
3. `SSH Tunnel Jump Server Host` identifies the intermediate bastion server that Airbyte connects to. Enter its hostname or IP Address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Keep this default unless you’ve explicitly changed the port.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. It isn’t the TiDB username.
6. If you use `Password Authentication`, set `SSH Login Username` to the previous step’s User password. If you use `SSH Key Authentication`, enter the OS user’s password, not the TiDB password. Airbyte uses this OS user to run commands on the bastion.
7. If you use `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the key file’s full contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## Data type mapping

When synchronising data, [TiDB data types](https://docs.pingcap.com/tidb/stable/data-type-overview) map to the following data types:

| TiDB Type                                 | Resulting Type         | Notes                                                                                                          |
| :---------------------------------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------- |
| `bit(1)`                                  | boolean                |                                                                                                                |
| `bit(>1)`                                 | base64 binary string   |                                                                                                                |
| `boolean`                                 | boolean                |                                                                                                                |
| `tinyint(1)`                              | boolean                |                                                                                                                |
| `tinyint`                                 | number                 |                                                                                                                |
| `smallint`                                | number                 |                                                                                                                |
| `mediumint`                               | number                 |                                                                                                                |
| `int`                                     | number                 |                                                                                                                |
| `bigint`                                  | number                 |                                                                                                                |
| `float`                                   | number                 |                                                                                                                |
| `double`                                  | number                 |                                                                                                                |
| `decimal`                                 | number                 |                                                                                                                |
| `binary`                                  | base64 binary string   |                                                                                                                |
| `blob`                                    | base64 binary string   |                                                                                                                |
| `date`                                    | string                 | ISO 8601 date string. ZERO-DATE value will be converted to NULL. If column is mandatory, convert to EPOCH.     |
| `datetime`, `timestamp`                   | string                 | ISO 8601 datetime string. ZERO-DATE value will be converted to NULL. If column is mandatory, convert to EPOCH. |
| `time`                                    | string                 | ISO 8601 time string. Values are in range between 00:00:00 and 23:59:59.                                       |
| `year`                                    | year string            | [Doc](https://docs.pingcap.com/tidb/stable/data-type-date-and-time#year-type)                                  |
| `char`, `varchar` with non-binary charset | string                 |                                                                                                                |
| `char`, `varchar` with binary charset     | base64 binary string   |                                                                                                                |
| `tinyblob`                                | base64 binary string   |                                                                                                                |
| `blob`                                    | base64 binary string   |                                                                                                                |
| `mediumblob`                              | base64 binary string   |                                                                                                                |
| `longblob`                                | base64 binary string   |                                                                                                                |
| `binary`                                  | base64 binary string   |                                                                                                                |
| `varbinary`                               | base64 binary string   |                                                                                                                |
| `tinytext`                                | string                 |                                                                                                                |
| `text`                                    | string                 |                                                                                                                |
| `mediumtext`                              | string                 |                                                                                                                |
| `longtext`                                | string                 |                                                                                                                |
| `json`                                    | serialized json string | E.g. `{"a": 10, "b": 15}`                                                                                      |
| `enum`                                    | string                 |                                                                                                                |
| `set`                                     | string                 | E.g. `blue,green,yellow`                                                                                       |

**Note:** arrays support every type listed above, including custom types. However, the destination may de-nest them.

## External resources

After setting up the TiDB source connector, you can read the following TiDB tutorial:

- [Using Airbyte to Migrate Data from TiDB Cloud to Snowflake](https://en.pingcap.com/blog/using-airbyte-to-migrate-data-from-tidb-cloud-to-snowflake/)

## IP allow list

If you use Airbyte Cloud and your organisation restricts access by IP, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                   |
| :------ | :--------- | :------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 0.3.5 | 2025-07-10 | [62927](https://github.com/airbytehq/airbyte/pull/62927) | Convert to new gradle build flow |
| 0.3.4 | 2025-01-10 | [51499](https://github.com/airbytehq/airbyte/pull/51499) | Use a non root base image |
| 0.3.3 | 2024-12-18 | [49896](https://github.com/airbytehq/airbyte/pull/49896) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.3.2 | 2024-02-13 | [35218](https://github.com/airbytehq/airbyte/pull/35218) | Adopt CDK 0.20.4 |
| 0.3.1 | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version |
| 0.3.0 | 2023-12-18 | [33485](https://github.com/airbytehq/airbyte/pull/33485) | Remove LEGACY state |
| 0.2.5 | 2023-06-20 | [27212](https://github.com/airbytehq/airbyte/pull/27212) | Fix silent exception swallowing in StreamingJdbcDatabase |
| 0.2.4 | 2023-03-22 | [20760](https://github.com/airbytehq/airbyte/pull/20760) | Removed redundant date-time datatypes formatting |
| 0.2.3 | 2023-03-06 | [23455](https://github.com/airbytehq/airbyte/pull/23455) | For network isolation, source connector accepts a list of hosts it is allowed to connect to |
| 0.2.2   | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346) | Consolidate date/time values mapping for JDBC sources                                                                                     |
|         | 2022-10-13 | [15535](https://github.com/airbytehq/airbyte/pull/16238) | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode |
| 0.2.1   | 2022-09-01 | [16238](https://github.com/airbytehq/airbyte/pull/16238) | Emit state messages more frequently                                                                                                       |
| 0.2.0   | 2022-07-26 | [14362](https://github.com/airbytehq/airbyte/pull/14362) | Integral columns are now discovered as int64 fields.                                                                                      |
| 0.1.5   | 2022-07-25 | [14996](https://github.com/airbytehq/airbyte/pull/14996) | Removed additionalProperties:false from spec                                                                                              |
| 0.1.4   | 2022-07-22 | [14714](https://github.com/airbytehq/airbyte/pull/14714) | Clarified error message when invalid cursor column selected                                                                               |
| 0.1.3   | 2022-07-04 | [14243](https://github.com/airbytehq/airbyte/pull/14243) | Update JDBC string builder                                                                                                                |
| 0.1.2   | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors                                                                                    |
| 0.1.1   | 2022-04-29 | [12480](https://github.com/airbytehq/airbyte/pull/12480) | Query tables with adaptive fetch size to optimize JDBC memory consumption                                                                 |
| 0.1.0   | 2022-04-19 | [11283](https://github.com/airbytehq/airbyte/pull/11283) | Initial Release                                                                                                                           |

</details>
