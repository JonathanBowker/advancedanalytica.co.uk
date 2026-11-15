---
generated_record: true
connector_name: IBM Db2
connector_type: source
connector_slug: db2
connector_directory: source-db2
definition_id: 447e0381-3780-4b46-bb62-00a4e3c8b8e2
version: 0.3.1
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/db2
logo: /images/connectors/sources/db2.svg
logo_source_path: airbyte-integrations/connectors/source-db2/icon.svg
logo_sha256: 7f3b57f477f961e4a7b5de60a14fe52c8133818539755ef890127733ee84349d
original_metadata_path: airbyte-integrations/connectors/source-db2/metadata.yaml
original_metadata_sha256: 557e3971e84d469546a5f00a3b6d282600075261e669551bd8c670b260533aed
original_document_path: docs/integrations/sources/db2.md
original_document_sha256: 61b2d60e62b99fac7441b235724991a63e9a15450895adcf5320d3240371b8a7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d20dfd815c86baccf3e0f87bec23516618763e52ac0dc55ad5a8d06172b9099f
rewritten_at: 2026-11-12T13:34:58.446269+00:00
---

# Db2

## Overview

The IBM Db2 source syncs data from Db2. It supports Full Refresh and Incremental syncs. For each sync, you can copy only new or updated data. Alternatively, copy every row from the tables and columns you've set up for replication.

The IBM Db2 source connector is built on the [IBM Data Server Driver](https://mvnrepository.com/artifact/com.ibm.db2/jcc/11.5.5.0) for JDBC and SQLJ. This pure-Java driver \(Type 4\) supports the JDBC 4 specification described in IBM Db2 [documentation](https://www.ibm.com/docs/en/db2/11.5?topic=apis-supported-drivers-jdbc-sqlj).

#### Resulting schema

The IBM Db2 source doesn't alter the schema in your warehouse. However, the connected destination may alter the resulting schema. See the destination's documentation for details.

#### Features

| Feature                   | Supported?\(Yes/No\) | Notes |
| :------------------------ | :------------------- | :---- |
| Full Refresh Sync         | Yes                  |       |
| Incremental - Append Sync | Yes                  |       |
| Namespaces                | Yes                  |       |

## Get started

### Requirements

You'll need this information to configure the IBM Db2 source:

1. **Host**
2. **Port**
3. **Database**
4. **Username**
5. **Password**
6. A dedicated read-only Airbyte user and role with access to every schema needed for replication.

### Setup guide

#### 1. Enter the database port, host and name

#### 2. Create a dedicated read-only user for the relevant schemas \(Recommended but optional\)

This optional step is highly recommended for better permission control and auditing. Alternatively, you can use Airbyte with an existing database user.

Create a dedicated database user, then run these commands against your database:

```sql
-- create Airbyte role
CREATE ROLE 'AIRBYTE_ROLE';

-- grant Airbyte database access
GRANT CONNECT ON 'DATABASE' TO ROLE 'AIRBYTE_ROLE'
GRANT ROLE 'AIRBYTE_ROLE' TO USER 'AIRBYTE_USER'
```

Your database user is now ready to use with Airbyte.

#### 3. Set up an SSL connection

You need a client certificate to set up an SSL connection. Add it to the "SSL PEM file" field. The connector will automatically add the certificate to the secret keystore.

You can also enter your own keystore password. If you don't, the password will be generated automatically.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                                                                  | Subject                                                                                                                                   |
| :------ | :--------- | :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 0.3.1 | 2025-07-10 | [62915](https://github.com/airbytehq/airbyte/pull/62915) | Add gradle docker plugins |
| 0.3.0 | 2025-03-06 | [48969](https://github.com/airbytehq/airbyte/pull/48969) | fix datatype and connection string |
| 0.2.4 | 2025-01-10 | [51502](https://github.com/airbytehq/airbyte/pull/51502) | Use a non root base image |
| 0.2.3 | 2024-12-18 | [49909](https://github.com/airbytehq/airbyte/pull/49909) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.2.2 | 2024-02-13 | [35233](https://github.com/airbytehq/airbyte/pull/35233) | Adopt CDK 0.20.4 |
| 0.2.1 | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version |
| 0.2.0 | 2023-12-18 | [33485](https://github.com/airbytehq/airbyte/pull/33485) | Remove LEGACY state |
| 0.1.20 | 2023-06-20 | [27212](https://github.com/airbytehq/airbyte/pull/27212) | Fix silent exception swallowing in StreamingJdbcDatabase |
| 0.1.19 | 2023-03-22 | [20760](https://github.com/airbytehq/airbyte/pull/20760) | Removed redundant date-time datatypes formatting |
| 0.1.18 | 2023-03-06 | [23455](https://github.com/airbytehq/airbyte/pull/23455) | For network isolation, source connector accepts a list of hosts it is allowed to connect to |
| 0.1.17  | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346)                                                      | Consolidate date/time values mapping for JDBC sources                                                                                     |
|         | 2022-10-13 | [15535](https://github.com/airbytehq/airbyte/pull/16238)                                                      | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode |
| 0.1.16  | 2022-09-06 | [16354](https://github.com/airbytehq/airbyte/pull/16354)                                                      | Add custom JDBC params                                                                                                                    |
| 0.1.15  | 2022-09-01 | [16238](https://github.com/airbytehq/airbyte/pull/16238)                                                      | Emit state messages more frequently                                                                                                       |
| 0.1.14  | 2022-08-18 | [14356](https://github.com/airbytehq/airbyte/pull/14356)                                                      | DB Sources: only show a table can sync incrementally if at least one column can be used as a cursor field                                 |
| 0.1.13  | 2022-07-22 | [14714](https://github.com/airbytehq/airbyte/pull/14714)                                                      | Clarified error message when invalid cursor column selected                                                                               |
| 0.1.12  | 2022-07-14 | [14574](https://github.com/airbytehq/airbyte/pull/14574)                                                      | Removed additionalProperties:false from JDBC source connectors                                                                            |
| 0.1.11  | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864)                                                      | Updated stacktrace format for any trace message errors                                                                                    |
| 0.1.10  | 2022-04-29 | [12480](https://github.com/airbytehq/airbyte/pull/12480)                                                      | Query tables with adaptive fetch size to optimize JDBC memory consumption                                                                 |
| 0.1.9   | 2022-02-21 | [10242](https://github.com/airbytehq/airbyte/pull/10242)                                                      | Fixed cursor for old connectors that use non-microsecond format. Now connectors work with both formats                                    |
| 0.1.8   | 2022-02-18 | [10242](https://github.com/airbytehq/airbyte/pull/10242)                                                      | Updated timestamp transformation with microseconds                                                                                        |
| 0.1.7   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256)                                                      | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                                                              | \*\*\*\* |
| 0.1.6   | 2022-02-08 | [10173](https://github.com/airbytehq/airbyte/pull/10173)                                                      | Improved discovering tables in case if user does not have permissions to any table                                                        |
| 0.1.5   | 2022-02-01 | [9875](https://github.com/airbytehq/airbyte/pull/9875)                                                        | Discover only permitted for user tables                                                                                                   |
| 0.1.4   | 2021-12-30 | [9187](https://github.com/airbytehq/airbyte/pull/9187) [8749](https://github.com/airbytehq/airbyte/pull/8749) | Add support of JdbcType.ARRAY to JdbcSourceOperations.                                                                                    |
| 0.1.3   | 2021-11-05 | [7670](https://github.com/airbytehq/airbyte/pull/7670)                                                        | Updated unique DB2 types transformation                                                                                                   |
| 0.1.2   | 2021-10-25 | [7355](https://github.com/airbytehq/airbyte/pull/7355)                                                        | Added ssl support                                                                                                                         |
| 0.1.1   | 2021-08-13 | [4699](https://github.com/airbytehq/airbyte/pull/4699)                                                        | Added json config validator                                                                                                               |
| 0.1.0   | 2021-06-22 | [4197](https://github.com/airbytehq/airbyte/pull/4197)                                                        | New Source: IBM DB2                                                                                                                       |

</details>
