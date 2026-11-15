---
generated_record: true
connector_name: Postgres
connector_type: destination
connector_slug: postgres
connector_directory: destination-postgres
definition_id: 25c5221d-dce2-4163-ade9-739ef790f503
version: 3.0.24
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/destinations/postgres
logo: /images/connectors/destinations/postgres.svg
logo_source_path: airbyte-integrations/connectors/destination-postgres/icon.svg
logo_sha256: d05b5e7444dc3c3ce5c1b53f622bb3d6d885e6fdbf033b8e59db1d72e9da7f86
original_metadata_path: airbyte-integrations/connectors/destination-postgres/metadata.yaml
original_metadata_sha256: b7c0dad5bb09c1875cd9a111f8fdf5ea5e5e85e7de7463c8107b373d260e0d10
original_document_path: docs/integrations/destinations/postgres.md
original_document_sha256: 55070b27434c9e765ac7ec4e6e3d0523055ab8ee1a24de977b9cc96eab3898fd
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5ab53a6a36da66a0880c5b9110156cc10bacf8aa319fd367f916edd230a25bb6
rewritten_at: 2026-11-12T13:26:48.678657+00:00
---

# Postgres

Set up the Postgres destination connector using this guide.

:::info Direct Load

From version 3.0.0, the Postgres destination uses **Direct Load** architecture. Data goes directly into final tables without intermediate raw tables. This improves performance and reduces storage costs.

For migration details and backward compatibility options, see [Postgres Migration Guide](postgres-migrations.md#upgrading-to-300).

:::

## Important limitation

:::warning

Postgres is an excellent relational database, but it isn't a data warehouse. Use Postgres as a destination for small data volumes, such as less than 10GB, or for testing. For larger volumes, use a data warehouse such as BigQuery, Snowflake, or Redshift. Learn more [here](/integrations/destinations/postgres/postgres-troubleshooting#postgres-is-not-a-data-warehouse).

:::

## Prerequisites

To use the Postgres destination, you'll need:

- A Postgres server running version 9.5 or later

Airbyte Cloud only supports connections to your Postgres instances using SSL or TLS encryption. TLS is used by default. Otherwise, follow the open-source instructions below.

You'll also need this information to configure the Postgres destination:

- **Host** - The server's host name.
- **Port** - The server's listening port. It defaults to the PostgreSQL™ standard port number (5432).
- **Username**
- **Password**
- **Default Schema Name** - Specify one schema, or several separated by commas, for the search-path. These schemas resolve unqualified object names in statements executed over this connection.
- **Database** - The database name. By default, the connector uses a database matching the user name.
- **JDBC URL Params** (optional)

[Refer to this guide for more details](https://jdbc.postgresql.org/documentation/use/#connecting-to-the-database)

#### Configure network access

Make sure Airbyte can access your Postgres database. For a database inside a VPC, allow access from the IP exposing Airbyte. If you're using Airbyte Cloud, add Airbyte's [IP addresses](/platform/operating-airbyte/ip-allowlist) to your allowlist.

## Step 1: Set up Postgres

#### **Permissions**

Create or choose a Postgres user with these permissions:

- Can create tables and write rows.
- Can create schemas, for example:

Run the following command to create this user:

```
CREATE USER airbyte_user WITH PASSWORD '<password>';
GRANT CREATE, TEMPORARY ON DATABASE <database> TO airbyte_user;
```

You can use an existing user, but a dedicated Airbyte user is strongly recommended.

## Step 2: Set up the Postgres connector in Airbyte

#### Choose the target database

Choose an existing database or create one to store data synced from Airbyte.

## Naming conventions

According to [Postgres SQL Identifiers syntax](https://www.postgresql.org/docs/9.0/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS):

- SQL identifiers and key words must start with a letter or an underscore \(\_\). Letters can include diacritical marks and non-Latin characters.
- Later characters can be letters, underscores, digits \(0-9\), or dollar signs \($\).

  The SQL standard doesn't allow dollar signs in identifiers, so they can make applications less portable. The standard won't define key words containing digits or starting or ending with an underscore. These identifiers are therefore safe from conflicts with future standard extensions.

- The system uses no more than NAMEDATALEN-1 bytes of an identifier. You can write longer names in commands, but Postgres truncates them. By default, NAMEDATALEN is 64, making the maximum identifier length 63 bytes.
- Quoted identifiers can contain any character except code zero. \(To include a double quote, write two double quotes.\) This supports otherwise invalid table or column names, including names with spaces or ampersands. The length limit still applies.
- Quoting an identifier makes it case-sensitive. Unquoted names are always converted to lower case.
- Keep quoting consistent for each name to make applications more portable and less error-prone. Either always quote a name or never quote it.

:::info

The Airbyte Postgres destination uses Quoted identifiers for final tables and columns, preserving case sensitivity. It replaces special characters in table and column names with underscores.

In the legacy "Raw tables only" mode, raw tables and schemas use Unquoted identifiers. Any special characters are replaced with an underscore.

:::

**For Airbyte Cloud:**

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Destinations**. In the top-right corner, click **new destination**.
3. On the Set up the destination page, name the Postgres connector. Select **Postgres** from the Destination type dropdown.
4. Enter a name for your destination.
5. For **Host**, **Port**, and **DB Name**, enter your Postgres database's host name, port number, and name.
6. List the **Default Schemas**.

   :::note

   Schema names are case-sensitive. The 'public' schema is selected by default. You can use multiple schemas at once. If you don't specify any schemas, all existing schemas will sync.

   :::

7. For **User** and **Password**, enter the username and password you created in [Step 1](#step-1-set-up-postgres).
8. For Airbyte Open Source, turn on the switch to connect using SSL. Airbyte Cloud uses SSL by default.
9. For SSL Modes, select:
   - **disable** to disable encrypted communication between Airbyte and the destination
   - **allow** to enable encrypted communication only when the destination requires it
   - **prefer** to allow unencrypted communication only when the destination doesn't support encryption
   - **require** to always require encryption. The connection fails if the destination doesn't support encryption.
   - **verify-ca** to always require encryption and verify that the destination has a valid SSL certificate
   - **verify-full** to always require encryption and verify the destination's identity
10. To customise the JDBC connection beyond common options, specify additional supported [JDBC URL parameters](https://jdbc.postgresql.org/documentation/head/connect.html) in the **JDBC URL Parameters (Advanced)** field. Enter key-value pairs separated by the & symbol.

    Example: key1=value1&key2=value2&key3=value3

    Airbyte adds these parameters to the end of the JDBC URL used to connect to your Postgres database.

    The connector supports `connectTimeout` and defaults to 60 seconds. Set connectTimeout to 0 seconds to use the longest available timeout.

    **Note:** Don't use these keys in the JDBC URL Params field because Airbyte overwrites them: `currentSchema`, `user`, `password`, `ssl`, and `sslmode`.

:::warning

This is an advanced configuration option. Use it carefully.

:::

11. For SSH Tunnel Method, select:

    - **No Tunnel** to connect directly to the database
    - **SSH Key Authentication** to use an RSA Private as your secret for establishing the SSH tunnel
    - **Password Authentication** to use a password as your secret for establishing the SSH tunnel

:::warning

Airbyte Cloud requires encrypted communication. Select **SSH Key Authentication** or **Password Authentication** if your **SSL Mode** is **disable**, **allow**, or **prefer**. Otherwise, the connection will fail.

:::

12. Click **Set up destination**.

## Supported sync modes

The Postgres destination connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Schema map

### Direct Load output schema

The Postgres destination uses Direct Load architecture. Each stream goes directly into a final table in your configured schema. The table contains your data columns and these Airbyte metadata columns:

- `_airbyte_raw_id`: A uuid that Airbyte assigns to each processed event. Its Postgres column type is `VARCHAR`.
- `_airbyte_extracted_at`: A timestamp showing when the event was pulled from the data source. Its Postgres column type is `TIMESTAMP WITH TIME ZONE`.
- `_airbyte_meta`: A jsonb column containing record metadata, including sync information and schema changes. Its Postgres column type is `JSONB`.
- `_airbyte_generation_id`: An identifier for the sync generation. Its Postgres column type is `BIGINT`.

### Raw tables output schema: deprecated

:::warning Deprecated

Raw tables are deprecated from version 3.0.0. The connector now uses Direct Load to write directly to final tables. For backward compatibility options and migration guidance, see [Postgres Migration Guide](postgres-migrations.md#upgrading-to-300).

:::

<details>
<summary>Legacy Raw Tables Documentation</summary>

Each stream maps to a separate raw table in Postgres. By default, raw tables are created in the `airbyte_internal` schema. You can override this in the configuration. Each table contains four columns:

- `_airbyte_raw_id`: A uuid that Airbyte assigns to each processed event. Its Postgres column type is `VARCHAR`.
- `_airbyte_extracted_at`: A timestamp showing when the event was pulled from the data source. Its Postgres column type is `TIMESTAMP WITH TIME ZONE`.
- `_airbyte_loaded_at`: A timestamp showing when the row was processed into the final table. Its Postgres column type is `TIMESTAMP WITH TIME ZONE`.
- `_airbyte_data`: A json blob containing the event data. Its Postgres column type is `JSONB`.

</details>

### Final table data type mapping

| Airbyte Type               | Postgres Type            |
| :------------------------- | :----------------------- |
| string                     | VARCHAR                  |
| number                     | DECIMAL                  |
| integer                    | BIGINT                   |
| boolean                    | BOOLEAN                  |
| object                     | JSONB                    |
| array                      | JSONB                    |
| timestamp_with_timezone    | TIMESTAMP WITH TIME ZONE |
| timestamp_without_timezone | TIMESTAMP                |
| time_with_timezone         | TIME WITH TIME ZONE      |
| time_without_timezone      | TIME                     |
| date                       | DATE                     |

### Naming limits

Postgres limits all identifiers to 63 characters. It truncates longer column names in your stream to this length. If two columns then share a name, Airbyte may change them to prevent a collision.

## Create dependent objects

:::caution

This section involves running `DROP ... CASCADE` on tables that Airbyte produces. Understand the consequences before enabling this option. This option can cause **Permanent** data loss.

:::

You may want to create objects that depend on Airbyte-generated tables, such as views. If you do, follow these recommendations:

- Use a tool such as `dbt` to automate creation.
- Use an orchestrator to trigger `dbt`.

You must enable the "Drop tables with CASCADE" option. The connector sometimes needs to recreate tables. If dependent objects exist, Postgres requires the connector to run drop statements with CASCADE enabled. However, this causes the connector to **also drop the dependent objects**. You MUST be able to recreate those dependent objects from scratch.

## Tutorials

After setting up the Postgres destination connector, explore these tutorials:

- [Migrate from mysql to postgres](https://airbyte.com/tutorials/migrate-from-mysql-to-postgresql)
- [Postgres replication](https://airbyte.com/tutorials/postgres-replication)

## Vendor-specific connector limits

For vendor-specific limitations and known issues, see [Postgres Troubleshooting Guide](postgres/postgres-troubleshooting.md#vendor-specific-connector-limitations).

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a Postgres schema.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                                                                                                                                                                                                                                                                               |
|:--------|:-----------|:-----------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 3.0.24 | 2026-10-22 | [89654](https://github.com/airbytehq/airbyte/pull/89654) | Upgrade to Bulk CDK 1.1.9: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86; netty 4.1.139; PostgreSQL JDBC driver 42.7.14. |
| 3.0.23 | 2026-10-01 | [87617](https://github.com/airbytehq/airbyte/pull/87617) | Upgrade to Bulk CDK 1.1.1. |
| 3.0.22  | 2026-09-23 | [86926](https://github.com/airbytehq/airbyte/pull/86926) | Strip the leading `+` from extended-year date/timestamp values so PostgreSQL `COPY` accepts them |
| 3.0.21 | 2026-09-15 | [86331](https://github.com/airbytehq/airbyte/pull/86331) | Version bump to republish the Cloud-specific connector spec. |
| 3.0.20  | 2026-09-11 | [85835](https://github.com/airbytehq/airbyte/pull/85835)   | Upgrade to Bulk CDK 1.1.0 and replace the startup `COUNT(*)` with an existence check, so syncs no longer scan large tables before replicating.                                                                                                                                                        |
| 3.0.19  | 2026-09-09 | [84953](https://github.com/airbytehq/airbyte/pull/84953)   | Add missing Airbyte meta columns (`_airbyte_meta`, `_airbyte_generation_id`) to tables created by pre-direct-load connector versions, and read a missing `_airbyte_generation_id` column as generation 0, when the `AIRBYTE_DESTINATION_POSTGRES_META_COLUMN_REPAIR` env var is set to `true` (off by default). |
| 3.0.18 | 2026-09-01 | [84989](https://github.com/airbytehq/airbyte/pull/84989) | Upgrade to Bulk CDK 1.0.25. |
| 3.0.17  | 2026-08-18 | [84853](https://github.com/airbytehq/airbyte/pull/84853)   | Strip null bytes nested inside objects and arrays, which PostgreSQL rejects in `jsonb` columns                                                                                                                                                                                                        |
| 3.0.16  | 2026-03-31 | [75902](https://github.com/airbytehq/airbyte/pull/75902)   | Fix silent error swallowing in COPY flush and sanitize null bytes in raw JSON data                                                                                                                                                                                                                    |
| 3.0.15  | 2026-08-07 | [83235](https://github.com/airbytehq/airbyte/pull/83235)   | Fail sync on transient DB errors.                                                                                                                                                                                                                                                                     |
| 3.0.14  | 2026-07-30 | [82273](https://github.com/airbytehq/airbyte/pull/82273)   | Remove column DROP logic during schema evolution; upgrade CDK to 1.0.20                                                                                                                                                                                                                               |
| 3.0.13  | 2026-04-17 | [76409](https://github.com/airbytehq/airbyte/pull/76409)   | Upgrade CDK to 1.0.9.                                                                                                                                                                                                                                                                                 |
| 3.0.12  | 2026-03-26 | [75481](https://github.com/airbytehq/airbyte/pull/75481)   | Upgrade CDK to 1.0.6; fix duplicate records in dedup+truncate mode by dropping temp tables after successful upsert.                                                                                                                                                                                   |
| 3.0.11  | 2026-02-25 | [74040](https://github.com/airbytehq/airbyte/pull/74040)   | Upgrade CDK to 1.0.2 and base image to 2.0.4 for CVE patches.                                                                                                                                                                                                                                         |
| 3.0.10  | 2026-02-09 | [72858](https://github.com/airbytehq/airbyte/pull/72858)   | Update to latest CDK with `DestStream` changes; remove unused Java CDK dependencies.                                                                                                                                                                                                                  |
| 3.0.9   | 2026-01-28 | [72292](https://github.com/airbytehq/airbyte/pull/72292)   | Upgrade CDK to 0.2.0                                                                                                                                                                                                                                                                                  |
| 3.0.8   | 2026-01-28 | [72412](https://github.com/airbytehq/airbyte/pull/72412)   | Promoting release candidate 3.0.8-rc1 to a main version.                                                                                                                                                                                                                                              |
| 3.0.7   | 2026-01-20 | [71745](https://github.com/airbytehq/airbyte/pull/71745)   | Improve error message for dependent views/rules with CASCADE option guidance.                                                                                                                                                                                                                         |
| 3.0.6   | 2026-01-06 | [71146](https://github.com/airbytehq/airbyte/pull/71146)   | Fix: Only apply CASCADE to DROP COLUMN, not ALTER COLUMN TYPE during schema changes.                                                                                                                                                                                                                  |
| 3.0.5   | 2025-12-12 | [70895](https://github.com/airbytehq/airbyte/pull/70895)   | Update CDK to 0.1.86.                                                                                                                                                                                                                                                                                 |
| 3.0.4   | 2025-12-05 | [70364](https://github.com/airbytehq/airbyte/pull/70364)   | Fix: Force Append mode when "Raw tables only" mode is enabled, bypassing Dedupe mode to avoid errors.                                                                                                                                                                                                 |
| 3.0.3   | 2025-12-04 | [70347](https://github.com/airbytehq/airbyte/pull/70347)   | Fix index recreation on non-existent columns in raw tables mode.                                                                                                                                                                                                                                      |
| 3.0.2   | 2025-12-04 | [70337](https://github.com/airbytehq/airbyte/pull/70337)   | Refactor: Move raw tables mode check to index creation for better code clarity.                                                                                                                                                                                                                       |
| 3.0.1   | 2025-12-04 | [70326](https://github.com/airbytehq/airbyte/pull/70326)   | Fix `PSQLException` when running in legacy "Raw tables only" mode.                                                                                                                                                                                                                                    |
| 3.0.0   | 2025-12-03 | [69846](https://github.com/airbytehq/airbyte/pull/69846)   | **Breaking Change**: Introduces Direct Load architecture. Data is now written directly to final tables without using intermediate raw tables, providing improved performance and reduced storage costs. Raw tables are deprecated; use "Raw tables only" option if needed for backward compatibility. |
| 2.4.7   | 2025-08-29 | [65620](https://github.com/airbytehq/airbyte/pull/65620)   | Noop release.                                                                                                                                                                                                                                                                                         |
| 2.4.6   | 2025-08-26 | [63769](https://github.com/airbytehq/airbyte/pull/63769)   | Fix numeric columns synced as NULL value in incremential sync.                                                                                                                                                                                                                                        |
| 2.4.5   | 2025-04-24 | [58652](https://github.com/airbytehq/airbyte/pull/58652)   | Upgrade libraries for security patches                                                                                                                                                                                                                                                                |
| 2.4.4   | 2025-03-24 | [56355](https://github.com/airbytehq/airbyte/pull/56355)   | Upgrade to airbyte/java-connector-base:2.0.1 to be M4 compatible.                                                                                                                                                                                                                                     |
| 2.4.3   | 2025-02-14 | [53686](https://github.com/airbytehq/airbyte/pull/53686)   | Add option to use unconstrained `DECIMAL` type for numeric columns.                                                                                                                                                                                                                                   |
| 2.4.2   | 2025-01-10 | [51483](https://github.com/airbytehq/airbyte/pull/51483)   | Use a non root base image                                                                                                                                                                                                                                                                             |
| 2.4.1   | 2024-12-18 | [49885](https://github.com/airbytehq/airbyte/pull/49885)   | Use a base image: airbyte/java-connector-base:1.0.0                                                                                                                                                                                                                                                   |
| 2.4.0   | 2024-08-18 | [\#45434](https://github.com/airbytehq/airbyte/pull/45434) | upgrade all dependencies.                                                                                                                                                                                                                                                                             |
| 2.3.2   | 2024-08-07 | [\#43331](https://github.com/airbytehq/airbyte/pull/43331) | bump java CDK.                                                                                                                                                                                                                                                                                        |
| 2.3.1   | 2024-08-07 | [\#43363](https://github.com/airbytehq/airbyte/pull/43363) | Adopt latest CDK.                                                                                                                                                                                                                                                                                     |
| 2.3.0   | 2024-07-22 | [\#41954](https://github.com/airbytehq/airbyte/pull/41954) | Support for [refreshes](../../platform/operator-guides/refreshes) and resumable full refresh. WARNING: You must upgrade to platform 0.63.7 before upgrading to this connector version.                                                                                                                |
| 2.2.1   | 2024-07-22 | [\#42423](https://github.com/airbytehq/airbyte/pull/42423) | no-op. Bumping to a clean image                                                                                                                                                                                                                                                                       |
| 2.2.0   | 2024-07-22 | [\#42423](https://github.com/airbytehq/airbyte/pull/42423) | Revert refreshes support                                                                                                                                                                                                                                                                              |
| 2.1.1   | 2024-07-22 | [\#42415](https://github.com/airbytehq/airbyte/pull/42415) | fixing PostgresSqlOperations.isOtherGenerationIdInTable to close the streams coming from JdbcDatabase.unsafeQuery                                                                                                                                                                                     |
| 2.1.0   | 2024-07-22 | [\#41954](https://github.com/airbytehq/airbyte/pull/41954) | Support for [refreshes](../../platform/operator-guides/refreshes) and resumable full refresh. WARNING: You must upgrade to platform 0.63.7 before upgrading to this connector version.                                                                                                                |
| 2.0.15  | 2024-06-26 | [\#40554](https://github.com/airbytehq/airbyte/pull/40554) | Convert all strict-encrypt prod code to kotlin.                                                                                                                                                                                                                                                       |
| 2.0.14  | 2024-06-26 | [\#40563](https://github.com/airbytehq/airbyte/pull/40563) | Convert all test code to kotlin.                                                                                                                                                                                                                                                                      |
| 2.0.13  | 2024-06-13 | [\#40159](https://github.com/airbytehq/airbyte/pull/40159) | Config error on drop failure when cascade is disabled                                                                                                                                                                                                                                                 |
| 2.0.12  | 2024-06-12 | [\#39388](https://github.com/airbytehq/airbyte/pull/39388) | Sources auto-conversion to Kotlin                                                                                                                                                                                                                                                                     |
| 2.0.11  | 2024-06-10 | [\#39372](https://github.com/airbytehq/airbyte/pull/39372) | Fixed function already exists error                                                                                                                                                                                                                                                                   |
| 2.0.10  | 2024-05-07 | [\#37660](https://github.com/airbytehq/airbyte/pull/37660) | Adopt CDK 0.33.2                                                                                                                                                                                                                                                                                      |
| 2.0.9   | 2024-04-11 | [\#36974](https://github.com/airbytehq/airbyte/pull/36974) | Add option to drop with `CASCADE`                                                                                                                                                                                                                                                                     |
| 2.0.8   | 2024-04-10 | [\#36805](https://github.com/airbytehq/airbyte/pull/36805) | Adopt CDK 0.29.10 to improve long column name handling                                                                                                                                                                                                                                                |
| 2.0.7   | 2024-04-08 | [\#36768](https://github.com/airbytehq/airbyte/pull/36768) | Adopt CDK 0.29.7 to improve destination state handling                                                                                                                                                                                                                                                |
| 2.0.6   | 2024-04-05 | [\#36620](https://github.com/airbytehq/airbyte/pull/36620) | Adopt CDK 0.29.3 to use Kotlin CDK                                                                                                                                                                                                                                                                    |
| 2.0.5   | 2024-03-07 | [\#35899](https://github.com/airbytehq/airbyte/pull/35899) | Adopt CDK 0.27.3; Bugfix for case-senstive table names in v1-v2 migration, `_airbyte_meta` in raw tables                                                                                                                                                                                              |
| 2.0.4   | 2024-03-07 | [\#35899](https://github.com/airbytehq/airbyte/pull/35899) | Adopt CDK 0.23.18; Null safety check in state parsing                                                                                                                                                                                                                                                 |
| 2.0.3   | 2024-03-01 | [\#35528](https://github.com/airbytehq/airbyte/pull/35528) | Adopt CDK 0.23.11; Use Migration framework                                                                                                                                                                                                                                                            |
| 2.0.2   | 2024-03-01 | [\#35760](https://github.com/airbytehq/airbyte/pull/35760) | Mark as certified, add PSQL exception to deinterpolator                                                                                                                                                                                                                                               |
| 2.0.1   | 2024-02-22 | [\#35385](https://github.com/airbytehq/airbyte/pull/35385) | Upgrade CDK to 0.23.0; Gathering required initial state upfront                                                                                                                                                                                                                                       |
| 2.0.0   | 2024-02-09 | [\#35042](https://github.com/airbytehq/airbyte/pull/35042) | GA release V2 destinations format.                                                                                                                                                                                                                                                                    |
| 0.6.3   | 2024-02-06 | [\#34891](https://github.com/airbytehq/airbyte/pull/34891) | Remove varchar limit, use system defaults                                                                                                                                                                                                                                                             |
| 0.6.2   | 2024-01-30 | [\#34683](https://github.com/airbytehq/airbyte/pull/34683) | CDK Upgrade 0.16.3; Fix dependency mismatches in slf4j lib                                                                                                                                                                                                                                            |
| 0.6.1   | 2024-01-29 | [\#34630](https://github.com/airbytehq/airbyte/pull/34630) | CDK Upgrade; Use lowercase raw table in T+D queries.                                                                                                                                                                                                                                                  |
| 0.6.0   | 2024-01-19 | [\#34372](https://github.com/airbytehq/airbyte/pull/34372) | Add dv2 flag in spec                                                                                                                                                                                                                                                                                  |
| 0.5.5   | 2024-01-18 | [\#34236](https://github.com/airbytehq/airbyte/pull/34236) | Upgrade CDK to 0.13.1; Add indexes in raw table for query optimization                                                                                                                                                                                                                                |
| 0.5.4   | 2024-01-11 | [\#34177](https://github.com/airbytehq/airbyte/pull/34177) | Add code for DV2 beta (no user-visible changes)                                                                                                                                                                                                                                                       |
| 0.5.3   | 2024-01-10 | [\#34135](https://github.com/airbytehq/airbyte/pull/34135) | Use published CDK missed in previous release                                                                                                                                                                                                                                                          |
| 0.5.2   | 2024-01-08 | [\#33875](https://github.com/airbytehq/airbyte/pull/33875) | Update CDK to get Tunnel heartbeats feature                                                                                                                                                                                                                                                           |
| 0.5.1   | 2024-01-04 | [\#33873](https://github.com/airbytehq/airbyte/pull/33873) | Install normalization to enable DV2 beta                                                                                                                                                                                                                                                              |
| 0.5.0   | 2023-12-18 | [\#33507](https://github.com/airbytehq/airbyte/pull/33507) | Upgrade to latest CDK; Fix DATs and tests                                                                                                                                                                                                                                                             |
| 0.4.0   | 2023-06-27 | [\#27781](https://github.com/airbytehq/airbyte/pull/27781) | License Update: Elv2                                                                                                                                                                                                                                                                                  |
| 0.3.27  | 2023-04-04 | [\#24604](https://github.com/airbytehq/airbyte/pull/24604) | Support for destination checkpointing                                                                                                                                                                                                                                                                 |
| 0.3.26  | 2022-09-27 | [\#17299](https://github.com/airbytehq/airbyte/pull/17299) | Improve error handling for strict-encrypt postgres destination                                                                                                                                                                                                                                        |
| 0.3.24  | 2022-09-08 | [\#16046](https://github.com/airbytehq/airbyte/pull/16046) | Fix missing database name URL Encoding                                                                                                                                                                                                                                                                |
| 0.3.23  | 2022-07-18 | [\#16260](https://github.com/airbytehq/airbyte/pull/16260) | Prevent traffic going on an unsecured channel in strict-encryption version of destination postgres                                                                                                                                                                                                    |
| 0.3.22  | 2022-07-18 | [\#13840](https://github.com/airbytehq/airbyte/pull/13840) | Added the ability to connect using different SSL modes and SSL certificates                                                                                                                                                                                                                           |
| 0.3.21  | 2022-07-06 | [\#14479](https://github.com/airbytehq/airbyte/pull/14479) | Publish amd64 and arm64 versions of the connector                                                                                                                                                                                                                                                     |
| 0.3.20  | 2022-05-17 | [\#12820](https://github.com/airbytehq/airbyte/pull/12820) | Improved 'check' operation performance                                                                                                                                                                                                                                                                |
| 0.3.19  | 2022-04-25 | [\#12195](https://github.com/airbytehq/airbyte/pull/12195) | Add support for additional JDBC URL Params input                                                                                                                                                                                                                                                      |
| 0.3.18  | 2022-04-12 | [\#11729](https://github.com/airbytehq/airbyte/pull/11514) | Bump mina-sshd from 2.7.0 to 2.8.0                                                                                                                                                                                                                                                                    |
| 0.3.17  | 2022-04-05 | [\#11729](https://github.com/airbytehq/airbyte/pull/11729) | Fixed bug with dashes in schema name                                                                                                                                                                                                                                                                  |
| 0.3.15  | 2022-02-25 | [\#10421](https://github.com/airbytehq/airbyte/pull/10421) | Refactor JDBC parameters handling                                                                                                                                                                                                                                                                     |
| 0.3.14  | 2022-02-14 | [\#10256](https://github.com/airbytehq/airbyte/pull/10256) | (unpublished) Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                                                                                                                                                                                                            |
| 0.3.13  | 2021-12-01 | [\#8371](https://github.com/airbytehq/airbyte/pull/8371)   | Fixed incorrect handling "\n" in ssh key                                                                                                                                                                                                                                                              |
| 0.3.12  | 2021-11-08 | [\#7719](https://github.com/airbytehq/airbyte/pull/7719)   | Improve handling of wide rows by buffering records based on their byte size rather than their count                                                                                                                                                                                                   |
| 0.3.11  | 2021-09-07 | [\#5743](https://github.com/airbytehq/airbyte/pull/5743)   | Add SSH Tunnel support                                                                                                                                                                                                                                                                                |
| 0.3.10  | 2021-08-11 | [\#5336](https://github.com/airbytehq/airbyte/pull/5336)   | Destination Postgres: fix \u0000\(NULL\) value processing                                                                                                                                                                                                                                             |

</details>
