---
generated_record: true
connector_name: ClickHouse
connector_type: source
connector_slug: clickhouse
connector_directory: source-clickhouse
definition_id: bad83517-5e54-4a3d-9b53-63e85fbd4d7c
version: 0.4.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/clickhouse
logo: /images/connectors/sources/clickhouse.svg
logo_source_path: airbyte-integrations/connectors/source-clickhouse/icon.svg
logo_sha256: 1c31d9294d9b5d1c8a70194ac50937e67b9412bf2a49983bfb86b9f64e0bf39b
original_metadata_path: airbyte-integrations/connectors/source-clickhouse/metadata.yaml
original_metadata_sha256: d94822a01e8c9d93a62323cb2209218db60dfc24ea64bf1308252a95c52e84f5
original_document_path: docs/integrations/sources/clickhouse.md
original_document_sha256: ce24b45e3e0c20e1f52d37ed8fe797ca4be4b48da26c5dacd99aed3476bf51b8
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8e675b4d73dca204a18442f260efb9cd818232d00ff89bcfe4731534fbf6bb78
rewritten_at: 2026-11-12T13:33:52.083362+00:00
---

# ClickHouse

## Overview

The ClickHouse source supports Full Refresh and Incremental syncs. Choose whether the connector copies new or updated data, or all configured rows. This applies to your selected tables and columns whenever a sync runs.

The ClickHouse source connector builds on the source-jdbc code base and uses the [ClickHouse JDBC driver](https://github.com/ClickHouse/clickhouse-jdbc). See the [ClickHouse JDBC documentation](https://clickhouse.com/docs/integrations/language-clients/java/jdbc) for more information.

#### Resulting schema

The ClickHouse source preserves the schema in your warehouse. However, the connected destination may alter it. See the destination's documentation for details.

### Features

| Feature                       | Supported   | Notes              |
| :---------------------------- | :---------- | :----------------- |
| Full Refresh Sync             | Yes         |                    |
| Incremental Sync              | Yes         |                    |
| Replicate Incremental Deletes | Coming soon |                    |
| Logical Replication \(WAL\)   | Coming soon |                    |
| SSL Support                   | Yes         |                    |
| SSH Tunnel Connection         | Yes         |                    |
| Namespaces                    | Yes         | Enabled by default |

## Get started

### Requirements

1. ClickHouse Server `21.3.10.1` or later.
2. A dedicated, read-only Airbyte user with access to every table needed for replication.

### Setup guide

#### 1. Confirm Airbyte can access your database

Access depends on your network setup. Use the check connection tool in the UI to confirm Airbyte can connect to your ClickHouse instance.

#### 2. Create a dedicated read-only user \(recommended but optional\)

This optional step gives you better permission control and auditing. You can also connect Airbyte using an existing database user.

Run these commands against your database to create a dedicated user:

```sql
CREATE USER 'airbyte'@'%' IDENTIFIED BY 'your_password_here';
```

Then grant the user access to the relevant schema:

```sql
GRANT SELECT ON <database name>.* TO 'airbyte'@'%';
```

You can restrict this grant to specific tables instead of the entire database. To replicate multiple ClickHouse databases, run the command again for every relevant schema. You'll need multiple sources connecting to the same db, with one source for each schema.

Your database user is now ready to use with Airbyte.

## Connect through an SSH Tunnel

Airbyte can connect to a Clickhouse instance through an SSH Tunnel. Use this option when a direct database connection isn't possible or breaches security policy. For example, the database may not have a public IP address.

With an SSH tunnel, Airbyte connects to an intermediate server \(also called a bastion sever\). This server has direct database access. Airbyte connects to the bastion, which then connects directly to the database server.

This feature needs additional configuration when you create the source. The following steps explain each configuration field.

1. Configure the source fields as usual, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel` \(a direct connection\). For an SSH Tunnel, choose `SSH Key Authentication` or `Password Authentication`.
   1. Choose `Key Authentication` when using an RSA private key to establish the SSH Tunnel. See below for information about generating this key.
   2. Choose `Password Authentication` when using a password to establish the SSH Tunnel.
3. `SSH Tunnel Jump Server Host` identifies the intermediate \(bastion\) server that Airbyte connects to. Enter its hostname or IP Address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Keep this default unless you've explicitly changed the port.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. It isn't the Clickhouse username.
6. When using `Password Authentication`, set `SSH Login Username` to the previous step's User password. When using `SSH Key Authentication`, leave this field blank. This isn't the Clickhouse password. It's the OS-user password Airbyte uses to run commands on the bastion.
7. When using `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the key file's full contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                                                                                   |
|:--------|:-----------|:-----------------------------------------------------------|:----------------------------------------------------------------------------------------------------------|
| 0.4.0   | 2026-07-10 | [81633](https://github.com/airbytehq/airbyte/pull/81633)   | **Breaking**: Declare temporal column typing as breaking. Connections with schema evolution errors must follow the [migration guide](/integrations/sources/clickhouse-migrations)    |
| 0.3.1   | 2026-06-29 | [72484](https://github.com/airbytehq/airbyte/pull/72484)   | Add JSON Schema format hints for temporal types (DateTime, Date) and fix documentation URL                |
| 0.3.0   | 2026-01-27 | [75298](https://github.com/airbytehq/airbyte/pull/75298)   | Fold source-clickhouse-strict-encrypt into source-clickhouse                                              |
| 0.2.6   | 2025-11-03 | [66714](https://github.com/airbytehq/airbyte/pull/66714)   | Revert JDBC driver upgrade                                                                                |
| 0.2.5   | 2025-09-25 | [66482](https://github.com/airbytehq/airbyte/pull/66482)   | Upgrade ClickHouse JDBC driver from 0.3.2-patch10 to 0.9.0                                                |
| 0.2.4   | 2025-07-10 | [62912](https://github.com/airbytehq/airbyte/pull/62912)   | Convert to new gradle build flow                                                                          |
| 0.2.3   | 2024-12-18 | [49901](https://github.com/airbytehq/airbyte/pull/49901)   | Use a base image: airbyte/java-connector-base:1.0.0                                                       |
| 0.2.2   | 2024-02-13 | [35235](https://github.com/airbytehq/airbyte/pull/35235)   | Adopt CDK 0.20.4                                                                                          |
| 0.2.1   | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453)   | bump CDK version                                                                                          |
| 0.1.17  | 2023-03-22 | [20760](https://github.com/airbytehq/airbyte/pull/20760)   | Removed redundant date-time datatypes formatting                                                          |
| 0.1.16  | 2023-03-06 | [23455](https://github.com/airbytehq/airbyte/pull/23455)   | For network isolation, source connector accepts a list of hosts it is allowed to connect to               |
| 0.1.15  | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346)   | Consolidate date/time values mapping for JDBC sources                                                     |
| 0.1.14  | 2022-09-27 | [17031](https://github.com/airbytehq/airbyte/pull/17031)   | Added custom jdbc url parameters field                                                                    |
| 0.1.13  | 2022-09-01 | [16238](https://github.com/airbytehq/airbyte/pull/16238)   | Emit state messages more frequently                                                                       |
| 0.1.12  | 2022-08-18 | [14356](https://github.com/airbytehq/airbyte/pull/14356)   | DB Sources: only show a table can sync incrementally if at least one column can be used as a cursor field |
| 0.1.10  | 2022-04-12 | [11514](https://github.com/airbytehq/airbyte/pull/11514)   | Bump mina-sshd from 2.7.0 to 2.8.0                                                                        |
| 0.1.9   | 2022-02-09 | [\#10214](https://github.com/airbytehq/airbyte/pull/10214) | Fix exception in case `password` field is not provided                                                    |
| 0.1.8   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256)   | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                              |
| 0.1.7   | 2021-12-24 | [\#8958](https://github.com/airbytehq/airbyte/pull/8958)   | Add support for JdbcType.ARRAY                                                                            |
| 0.1.6   | 2021-12-15 | [\#8429](https://github.com/airbytehq/airbyte/pull/8429)   | Update titles and descriptions                                                                            |
| 0.1.5   | 2021-12-01 | [\#8371](https://github.com/airbytehq/airbyte/pull/8371)   | Fixed incorrect handling "\n" in ssh key                                                                  |
| 0.1.4   | 20.10.2021 | [\#7327](https://github.com/airbytehq/airbyte/pull/7327)   | Added support for connection via SSH tunnel(aka Bastion server).                                          |
| 0.1.3   | 20.10.2021 | [\#7127](https://github.com/airbytehq/airbyte/pull/7127)   | Added SSL connections support.                                                                            |
| 0.1.2   | 13.08.2021 | [\#4699](https://github.com/airbytehq/airbyte/pull/4699)   | Added json config validator.                                                                              |

</details>

## Changelog: source-clickhouse-strict-encrypt
<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                                                                      | Subject                                                                                                                                   |
| :------ | :--------- | :---------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| 0.2.6   | 2025-11-03 | [66714](https://github.com/airbytehq/airbyte/pull/66714)    | Revert JDBC driver upgrade                                                                                |
| 0.2.5 | 2025-09-25 | [66482](https://github.com/airbytehq/airbyte/pull/66482) | Upgrade ClickHouse JDBC driver from 0.3.2-patch10 to 0.9.0 |
| 0.2.4 | 2025-07-10 | [62913](https://github.com/airbytehq/airbyte/pull/62913) | Convert to new gradle build flow |
| 0.2.0   | 2023-12-18 | [33485](https://github.com/airbytehq/airbyte/pull/33485)                                                          | Remove LEGACY state                                                                                                                       |
| 0.1.17  | 2022-03-22 | [20760](https://github.com/airbytehq/airbyte/pull/20760)                                                          | Removed redundant date-time datatypes formatting                                                                                          |
| 0.1.16  | 2023-03-06 | [23455](https://github.com/airbytehq/airbyte/pull/23455)                                                          | For network isolation, source connector accepts a list of hosts it is allowed to connect to                                               |
| 0.1.15  | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346)                                                          | Consolidate date/time values mapping for JDBC sources                                                                                     |
|         | 2022-10-13 | [15535](https://github.com/airbytehq/airbyte/pull/16238)                                                          | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode |
| 0.1.14  | 2022-09-27 | [17031](https://github.com/airbytehq/airbyte/pull/17031)                                                          | Added custom jdbc url parameters field                                                                                                    |
| 0.1.13  | 2022-09-01 | [16238](https://github.com/airbytehq/airbyte/pull/16238)                                                          | Emit state messages more frequently                                                                                                       |
| 0.1.9   | 2022-08-18 | [14356](https://github.com/airbytehq/airbyte/pull/14356)                                                          | DB Sources: only show a table can sync incrementally if at least one column can be used as a cursor field                                 |
| 0.1.6   | 2022-02-09 | [\#10214](https://github.com/airbytehq/airbyte/pull/10214)                                                        | Fix exception in case `password` field is not provided                                                                                    |
| 0.1.5   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256)                                                          | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                                                              |
| 0.1.3   | 2021-12-29 | [\#9182](https://github.com/airbytehq/airbyte/pull/9182) [\#8958](https://github.com/airbytehq/airbyte/pull/8958) | Add support for JdbcType.ARRAY. Fixed tests                                                                                               |
| 0.1.2   | 2021-12-01 | [\#8371](https://github.com/airbytehq/airbyte/pull/8371)                                                          | Fixed incorrect handling "\n" in ssh key                                                                                                  |
| 0.1.1   | 20.10.2021 | [\#7327](https://github.com/airbytehq/airbyte/pull/7327)                                                          | Added support for connection via SSH tunnel(aka Bastion server).                                                                          |
| 0.1.0   | 20.10.2021 | [\#7127](https://github.com/airbytehq/airbyte/pull/7127)                                                          | Added source-clickhouse-strict-encrypt that supports SSL connections only.                                                                |

</details>
