---
generated_record: true
connector_name: Cockroachdb
connector_type: source
connector_slug: cockroachdb
connector_directory: source-cockroachdb
definition_id: 9fa5862c-da7c-11eb-8d19-0242ac130003
version: 0.2.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/cockroachdb
logo: /images/connectors/sources/cockroachdb.svg
logo_source_path: airbyte-integrations/connectors/source-cockroachdb/icon.svg
logo_sha256: 15cd2bd8742c214147cd697377fdd35d8b2f6489a8ec80aecb4117af2decb318
original_metadata_path: airbyte-integrations/connectors/source-cockroachdb/metadata.yaml
original_metadata_sha256: 01fcf73c9e9d9c4f0cee822d908046c3cd76f2a61fd0fb342d96efba1575515a
original_document_path: docs/integrations/sources/cockroachdb.md
original_document_sha256: fa75682e20a66684bebfea46eda5d990d1330bf0d36a9b0147414d83a56800f1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 2d2d40b9bfa71de85c300107465c68ff305df458c0457247840c721460a4b656
rewritten_at: 2026-11-12T13:33:59.885266+00:00
---

# CockroachDB

## Overview

The CockroachDB source supports Full Refresh and Incremental syncs. For each sync, you can copy new or updated data, or every configured row and column.

### Resulting schema

The CockroachDb source preserves your database schema. However, the connected destination may alter it. See the destination's documentation for details.

### Data type mapping

CockroachDb data types map to the following data types during synchronisation:

| CockroachDb Type             | Resulting Type | Notes                                                             |
| :--------------------------- | :------------- | :---------------------------------------------------------------- |
| `bigint`                     | integer        |                                                                   |
| `bit`                        | boolean        |                                                                   |
| `boolean`                    | boolean        |                                                                   |
| `character`                  | string         |                                                                   |
| `character varying`          | string         |                                                                   |
| `date`                       | string         |                                                                   |
| `double precision`           | string         |                                                                   |
| `enum`                       | number         |                                                                   |
| `inet`                       | string         |                                                                   |
| `int`                        | integer        |                                                                   |
| `json`                       | string         |                                                                   |
| `jsonb`                      | string         |                                                                   |
| `numeric`                    | number         |                                                                   |
| `smallint`                   | integer        |                                                                   |
| `text`                       | string         |                                                                   |
| `time with timezone`         | string         | may be written as a native date type depending on the destination |
| `time without timezone`      | string         | may be written as a native date type depending on the destination |
| `timestamp with timezone`    | string         | may be written as a native date type depending on the destination |
| `timestamp without timezone` | string         | may be written as a native date type depending on the destination |
| `uuid`                       | string         |                                                                   |

**Note:** arrays support every type above and custom types. Your destination may de-nest them.

### Features

| Feature             | Supported | Notes |
| :------------------ | :-------- | :---- |
| Full Refresh Sync   | Yes       |       |
| Incremental Sync    | Yes       |       |
| Change Data Capture | No        |       |
| SSL Support         | Yes       |       |

## Get started

### Requirements

1. CockroachDb `v1.15.x` or above
2. Allow connections from Airbyte to your CockroachDb database \(if they're in separate VPCs\)
3. Create a dedicated read-only Airbyte user with access to every table needed for replication

### Setup guide

#### 1. Confirm database access from the machine running Airbyte

Access depends on your network setup. Use the check connection tool in the UI to confirm Airbyte can connect to your CockroachDb instance.

#### 2. Create a dedicated read-only user for the relevant tables \(Recommended but optional\)

For clearer permission control and auditing, create a dedicated read-only user. This step is optional. You can instead use an existing database user with Airbyte.

Run the following commands against your database to create a dedicated user:

```sql
CREATE USER airbyte PASSWORD 'your_password_here';
```

Then grant the user access to the relevant schema:

```sql
GRANT USAGE ON SCHEMA <schema_name> TO airbyte
```

To replicate data from several CockroachDb schemas, rerun the command for every relevant schema. You'll also need multiple sources connecting to the same db across those schemas.

Next, grant the user read-only access to the relevant tables. The simplest approach grants read access to every table in the schema:

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA <schema_name> TO airbyte;

# Allow airbyte user to see tables created in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA <schema_name> GRANT SELECT ON TABLES TO airbyte;
```

#### 3. Complete the setup

Your database user is now ready to use with Airbyte.

## IP allow list

If you use Airbyte Cloud and your network restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                   |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| 0.2.5 | 2025-07-10 | [62914](https://github.com/airbytehq/airbyte/pull/62914) | Convert to new gradle build flow |
| 0.2.4 | 2025-01-10 | [51484](https://github.com/airbytehq/airbyte/pull/51484) | Use a non root base image |
| 0.2.3 | 2024-12-18 | [49915](https://github.com/airbytehq/airbyte/pull/49915) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.2.2 | 2024-02-13 | [35234](https://github.com/airbytehq/airbyte/pull/35234) | Adopt CDK 0.20.4 |
| 0.2.1 | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version |
| 0.2.0 | 2023-12-18 | [33485](https://github.com/airbytehq/airbyte/pull/33485) | Removed LEGACY state |
| 0.1.22 | 2023-03-22 | [20760](https://github.com/airbytehq/airbyte/pull/20760) | Removed redundant date-time datatypes formatting |
| 0.1.21 | 2023-03-14 | [24000](https://github.com/airbytehq/airbyte/pull/24000) | Removed check method call on read. |
| 0.1.20 | 2023-03-06 | [23455](https://github.com/airbytehq/airbyte/pull/23455) | For network isolation, source connector accepts a list of hosts it is allowed to connect |
| 0.1.19  | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346) | Consolidate date/time values mapping for JDBC sources                                                                                     |
|         | 2022-10-13 | [15535](https://github.com/airbytehq/airbyte/pull/16238) | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode |
| 0.1.18  | 2022-09-01 | [16394](https://github.com/airbytehq/airbyte/pull/16394) | Added custom jdbc properties field                                                                                                        |
| 0.1.17  | 2022-09-01 | [16238](https://github.com/airbytehq/airbyte/pull/16238) | Emit state messages more frequently                                                                                                       |
| 0.1.16  | 2022-08-18 | [14356](https://github.com/airbytehq/airbyte/pull/14356) | DB Sources: only show a table can sync incrementally if at least one column can be used as a cursor field                                 |
| 0.1.13  | 2022-07-14 | [14574](https://github.com/airbytehq/airbyte/pull/14574) | Removed additionalProperties:false from JDBC source connectors                                                                            |
| 0.1.12  | 2022-04-29 | [12480](https://github.com/airbytehq/airbyte/pull/12480) | Query tables with adaptive fetch size to optimize JDBC memory consumption                                                                 |
| 0.1.11  | 2022-04-06 | [11729](https://github.com/airbytehq/airbyte/pull/11729) | Bump mina-sshd from 2.7.0 to 2.8.0                                                                                                        |
| 0.1.10  | 2022-02-24 | [10235](https://github.com/airbytehq/airbyte/pull/10235) | Fix Replication Failure due Multiple portal opens                                                                                         |
| 0.1.9   | 2022-02-21 | [10242](https://github.com/airbytehq/airbyte/pull/10242) | Fixed cursor for old connectors that use non-microsecond format. Now connectors work with both formats                                    |
| 0.1.8   | 2022-02-18 | [10242](https://github.com/airbytehq/airbyte/pull/10242) | Updated timestamp transformation with microseconds                                                                                        |
| 0.1.7   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                                                              |
| 0.1.6   | 2022-02-08 | [10173](https://github.com/airbytehq/airbyte/pull/10173) | Improved discovering tables in case if user does not have permissions to any table                                                        |
| 0.1.5   | 2021-12-24 | [9004](https://github.com/airbytehq/airbyte/pull/9004)   | User can see only permmited tables during discovery                                                                                       |
| 0.1.4   | 2021-12-24 | [8958](https://github.com/airbytehq/airbyte/pull/8958)   | Add support for JdbcType.ARRAY                                                                                                            |
| 0.1.3   | 2021-10-10 | [7819](https://github.com/airbytehq/airbyte/pull/7819)   | Fixed Datatype errors during Cockroach DB parsing                                                                                         |
| 0.1.2   | 2021-08-13 | [4699](https://github.com/airbytehq/airbyte/pull/4699)   | Added json config validator                                                                                                               |

</details>
