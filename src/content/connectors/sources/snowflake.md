---
generated_record: true
connector_name: Snowflake
connector_type: source
connector_slug: snowflake
connector_directory: source-snowflake
definition_id: e2d65910-8c8b-40a1-ae7d-ee2416b2bfa2
version: 2.0.8
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/snowflake
logo: /images/connectors/sources/snowflake.svg
logo_source_path: airbyte-integrations/connectors/source-snowflake/icon.svg
logo_sha256: 08eb48481059083e81844567b33e7c3266659d1bc06fa8df76c649b155a7dff3
original_metadata_path: airbyte-integrations/connectors/source-snowflake/metadata.yaml
original_metadata_sha256: 0a2495648d92b3c9c555a1f3da4097265e077dd8b1182c56fdf48b292c5f85a1
original_document_path: docs/integrations/sources/snowflake.md
original_document_sha256: 9fc32e7edb33e6ab02ec48a3abdbf07192247a9b63de2c8ec6420146464dce21
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: e48e3066650d81dd541c0b680af2eed95e50676fc276526d3f124cd572ddd7a2
rewritten_at: 2026-11-12T13:58:01.978452+00:00
---

import KeypairExample from '@site/static/_snowflake_keypair_generation.md';

# Snowflake

:::danger Username and password authentication deprecated
From version **2.0.0**, username and password authentication is **deprecated**. It will be removed in a future release. Use **Key pair authentication** or a **programmatic access token** to connect to Snowflake.

This change aligns with [Snowflake's deprecation of single-factor password sign-ins](https://docs.snowflake.com/en/user-guide/security-mfa-rollout). Snowflake is introducing strong authentication for all users between **August and October 2026**, one account at a time. Once enabled for your account, password-only Airbyte logins will fail.

If you currently use username and password authentication, follow the [Snowflake Migration Guide](./snowflake-migrations.md). It explains how to migrate to key pair authentication or a programmatic access token.
:::

## Overview

The Snowflake source syncs your data from Snowflake. It supports Full Refresh and Incremental syncs. You can copy only new or updated data. Alternatively, copy every configured row and column whenever a sync runs.

The Snowflake source connector uses the source-jdbc code base. It uses JDBC 3.23.1 [Snowflake driver](https://github.com/snowflakedb/snowflake-jdbc), as described in the Snowflake [documentation](https://docs.snowflake.com/en/user-guide/jdbc.html).

#### Resulting schema

The Snowflake source doesn't change your warehouse schema. However, the connected destination might change the resulting schema. See the destination's documentation for details.

#### Features

| Feature                   | Supported?\(Yes/No\) | Notes |
| :------------------------ | :------------------- | :---- |
| Full Refresh Sync         | Yes                  |       |
| Incremental - Append Sync | Yes                  |       |
| Namespaces                | Yes                  |       |

## Incremental sync

Incremental sync lets you replicate only data added or updated since the previous sync. A cursor field tracks the sync state.

### How incremental sync works

During an incremental sync, the connector:

1. **Identifies new records**: Uses a `WHERE cursor_field > last_cursor_value` clause to fetch only records newer than the last synced value
2. **Maintains order**: Applies `ORDER BY cursor_field ASC` to process records in the correct sequence
3. **Tracks state**: Stores each sync's maximum cursor value as the next sync's starting point

### Supported cursor data types

You can use the following JDBC data types as cursor fields:

**Date and Time Types:**
- `TIMESTAMP_WITH_TIMEZONE`
- `TIMESTAMP` 
- `TIME_WITH_TIMEZONE`
- `TIME`
- `DATE`

**Numeric Types:**
- `TINYINT`
- `SMALLINT` 
- `INTEGER`
- `BIGINT`
- `FLOAT`
- `DOUBLE`
- `REAL`
- `NUMERIC`
- `DECIMAL`

**String Types:**
- `NVARCHAR`
- `VARCHAR`
- `LONGVARCHAR`

### Choose a cursor field

For effective incremental syncs, choose cursor fields that:

- **Are monotonically increasing**: Use values that always increase, such as auto-incrementing IDs or creation timestamps
- **Are never updated**: Avoid fields that might change after record creation
- **Have unique values**: Duplicate values are supported, but can cause records to be skipped or synced again
- **Are indexed**: Improve query performance on large tables

**Good cursor field examples:**
- `CREATED_AT` or `UPDATED_AT` timestamp columns
- Auto-incrementing `ID` columns
- Sequence-generated numeric fields

**Avoid using:**
- Fields that can be updated after creation
- Fields with many duplicate values
- Fields that can contain NULL values

### Snowflake considerations

**Timezone Handling**: The connector handles Snowflake's `TIMESTAMPLTZ` data type, which is a timestamp with a local timezone. It automatically converts the value to `TIMESTAMP_WITH_TIMEZONE` for consistent processing.

**Data Type Precision**: Snowflake's numeric types retain their precision during sync. Make sure your destination supports your cursor fields' precision.

### Configure incremental sync

To configure incremental sync in Airbyte:

1. **Create or edit your connection** in the Airbyte UI
2. **Select your source tables** that you want to sync incrementally
3. **Choose "Incremental | Append" sync mode** for each table
4. **Select a cursor field** from the list of available fields
5. **Verify the cursor field** meets the criteria above, including increasing consistently and never being updated

The Airbyte UI checks whether your chosen cursor field supports incremental sync. It also shows the supported data types for your table schema.

### Troubleshoot incremental sync

**Cursor field validation errors**: If you receive an invalid cursor field error, check that the field exists in your table. It must also use a supported data type listed above.

**Duplicate cursor values**: The connector processes every record sharing the same cursor value. As a result, some records might be synced more than once across separate sync runs.

**NULL cursor values**: Incremental sync excludes records with NULL cursor field values. Make sure your cursor field has a NOT NULL constraint or default value.

**State reset**: To sync all data again, reset the connection's state in the Airbyte UI. The next sync will then work like a full refresh.

## Get started

### Requirements

You'll need this information to configure the Snowflake source:

1. **Host**
2. **Role**
3. **Warehouse**
4. **Database**
5. **Schema**
6. **Username** (not required for programmatic access token authentication)
7. **Private key or programmatic access token** (password authentication is deprecated but still supported)
8. **JDBC URL Params** (Optional)

Also create a dedicated, read-only Airbyte service user and role. Give them access to every schema you need to replicate.

### Setup guide

#### Connection parameters

For more information about Snowflake connection parameters, see the [Snowflake documentation](https://docs.snowflake.com/en/user-guide/jdbc-configure.html#connection-parameters).

#### Create a dedicated read-only user (Recommended but optional)

This optional step is strongly recommended for better permission control and auditing. Alternatively, you can use Airbyte with an existing database user.

First, generate a key pair as described in [Key pair authentication](#key-pair-authentication). Then run the following commands against your database to create a dedicated user. Replace `<public_key_value>` with your `rsa_key.pub` file's contents, excluding the `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----` header and footer lines.

```sql
-- set variables (these need to be uppercase)
SET AIRBYTE_ROLE = 'AIRBYTE_ROLE';
SET AIRBYTE_USERNAME = 'AIRBYTE_USER';
SET AIRBYTE_WAREHOUSE = 'AIRBYTE_WAREHOUSE';
SET AIRBYTE_SCHEMA = 'AIRBYTE_DATABASE.AIRBYTE_SCHEMA';

BEGIN;

-- create Airbyte role
CREATE ROLE IF NOT EXISTS $AIRBYTE_ROLE;

-- create Airbyte service user with key pair authentication
CREATE USER IF NOT EXISTS $AIRBYTE_USERNAME
TYPE = SERVICE
DEFAULT_ROLE = $AIRBYTE_ROLE
DEFAULT_WAREHOUSE= $AIRBYTE_WAREHOUSE;

-- assign the RSA public key to the service user
ALTER USER IDENTIFIER($AIRBYTE_USERNAME) SET RSA_PUBLIC_KEY='<public_key_value>';

-- grant Airbyte schema access
GRANT OWNERSHIP ON SCHEMA $AIRBYTE_SCHEMA TO ROLE $AIRBYTE_ROLE;

COMMIT;
```

You can limit this grant to specific schemas instead of the whole database. To replicate multiple Snowflake databases, rerun the command above and grant access to every relevant schema. You'll need separate sources for the same database's different schemas.

Your database user is now ready to use with Airbyte.

### Authentication

The Snowflake source supports these authentication methods:

- Key pair authentication (recommended)
- Programmatic access token
- Username and password (deprecated, see the [migration guide](./snowflake-migrations.md))

#### Connection fields

These fields apply to every authentication method:

| Field                                                                                                 | Description                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Host](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html)                        | The host domain of the snowflake instance (must include the account, region, cloud environment, and end with snowflakecomputing.com). Example: `accountname.us-east-2.aws.snowflakecomputing.com`. A pasted `https://` prefix, trailing `/` or `:443` is accepted and removed; on Airbyte Cloud a console URL with a path (for example `https://app.snowflake.com/<org>/<account>`) or credentials fails the connection test with `Enter only the host domain in Host (for example account.snowflakecomputing.com), without a path or credentials.` |
| [Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#roles)          | The role you created for Airbyte to access Snowflake. Example: `AIRBYTE_ROLE`                                                                                                           |
| [Warehouse](https://docs.snowflake.com/en/user-guide/warehouses-overview.html#overview-of-warehouses) | The warehouse you created for Airbyte to sync data into. Example: `AIRBYTE_WAREHOUSE`                                                                                                   |
| [Database](https://docs.snowflake.com/en/sql-reference/ddl-database.html#database-schema-share-ddl)   | The database you created for Airbyte to sync data into. Example: `AIRBYTE_DATABASE`                                                                                                     |
| [Schema](https://docs.snowflake.com/en/sql-reference/ddl-database.html#database-schema-share-ddl)     | The schema whose tables this replication is targeting. If no schema is specified, all tables with permission will be presented regardless of their schema.                                        |
| Username                                                                                              | The username you created to allow Airbyte to access the database. Example: `AIRBYTE_USER`. Not required for programmatic access token authentication.                                     |
| [JDBC URL Params](https://docs.snowflake.com/en/user-guide/jdbc-parameters.html) (Optional)           | Additional properties to pass to the JDBC URL string when connecting to the database formatted as `key=value` pairs separated by the symbol `&`. Example: `key1=value1&key2=value2&key3=value3`   |

#### Key pair authentication

 <KeypairExample/>

In the Airbyte UI, select **Key Pair Authentication** as the authorization method and enter the username. Paste your complete `rsa_key.p8` private key file, including the `-----BEGIN ... PRIVATE KEY-----` header and footer. If the key is encrypted, enter the passphrase.

#### Programmatic access token authentication

To authenticate with a Snowflake [programmatic access token](https://docs.snowflake.com/en/user-guide/programmatic-access-tokens), select **Programmatic Access Token** as the authorization method. Then provide the token. You don't need a username because the token identifies its Snowflake user.

Create a programmatic access token in Snowflake with:

```sql
ALTER USER <user_name> ADD PROGRAMMATIC ACCESS TOKEN <token_name>
  ROLE_RESTRICTION = '<airbyte_role>'
  DAYS_TO_EXPIRY = <days>;
```

The token secret appears only when you create the token. Store it securely before closing the result.

By default, Snowflake requires `ROLE_RESTRICTION` for service users. It also requires a network policy before service users can generate or use programmatic access tokens. Your authentication policy can change this behaviour. If it restricts permitted methods, include `PROGRAMMATIC_ACCESS_TOKEN` in `AUTHENTICATION_METHODS`.

:::note Network policy required for Programmatic Access Token authentication
For Programmatic Access Token authentication, the Snowflake user's network policy must permit connections from Airbyte's IP addresses. Add the [Airbyte Cloud IP addresses](/platform/operating-airbyte/ip-allowlist) to the PAT user's network policy or the account-level network policy.
:::

#### Username and password (deprecated)

Username and password authentication is deprecated from version 2.0.0. It will be removed in a future release. Existing sources continue working until Snowflake enforces strong authentication on your account. Follow the [migration guide](./snowflake-migrations.md) to switch to key pair authentication or a programmatic access token.

### Network policies

By default, Snowflake permits users to connect from any computer or device IP address. A security administrator, such as a user with the SECURITYADMIN role, can create a network policy. Users with higher roles can also create one. The policy can permit or deny one IP address or a list of addresses.

If you can't connect with Airbyte Cloud, make sure its IP addresses are on your allowed list.

Run the _SHOW PARAMETERS_ command to check for an account-level or user-specific network policy.

**Account**

```
SHOW PARAMETERS LIKE 'network_policy' IN ACCOUNT;
```

**User**

```
SHOW PARAMETERS LIKE 'network_policy' IN USER <username>;
```

For more information, see the official [Snowflake documentation](https://docs.snowflake.com/en/user-guide/network-policies.html#).

### Troubleshooting

- **`check` or discovery is very slow, or lists tables from other schemas (before 2.0.4).** The Snowflake JDBC driver treated `_` and `%` in the **Schema** option as `LIKE` wildcards. It then scanned the whole database because `SCHEMA_A` also matched `SCHEMAXA`. From version 2.0.4, the option uses an exact name. On older versions, add `ENABLE_WILDCARDS_IN_SHOW_METADATA_COMMANDS=false` to **JDBC URL Params**. If you used `%` or `_` to select several schemas, add `ENABLE_WILDCARDS_IN_SHOW_METADATA_COMMANDS=true` to **JDBC URL Params** to retain that behaviour.
- **Key pair authentication fails with `JWT token is invalid`.** Snowflake rejected the login, and retrying won't resolve the problem. The private key might not match the RSA public key registered for the user. Alternatively, the **Username** or **Server URL** might be wrong. The clock on the machine running Airbyte might also be incorrect. Compare the fingerprint from `DESCRIBE USER <user>` (`RSA_PUBLIC_KEY_FP`) with your key. Alternatively, register the public key again with `ALTER USER <user> SET RSA_PUBLIC_KEY='...'`. To find the exact cause, note the ID in brackets after the error (`JWT token is invalid. [<id>]`). Ask a Snowflake administrator to run `SELECT SYSTEM$GET_LOGIN_FAILURE_DETAILS('<id>');`. See Snowflake's [key pair troubleshooting guide](https://docs.snowflake.com/en/user-guide/key-pair-auth-troubleshooting). Older versions reported this error as an expired session token that would reconnect automatically. It isn't an expired token. The connection will fail until you correct the key pair configuration.
- **Incremental sync on a `TIMESTAMP_NTZ` cursor misses rows (before 2.0.4).** Snowflake sessions default to the `America/Los_Angeles` time zone, which changed the cursor bound. This was fixed in version 2.0.4. On older versions, add `TIMEZONE=UTC` to **JDBC URL Params** as a workaround.

## IP allow list

If Airbyte Cloud access is restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                                                                        | Subject                                                                                                                                                                       |
|:--------|:-----------|:--------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2.0.8   | 2026-10-30 | [90171](https://github.com/airbytehq/airbyte/pull/90171) | Test-only: share one seeded schema across live tests, trim the cursor timezone matrix and run live tests concurrently. No connector runtime change. |
| 2.0.7   | 2026-10-29 | [89647](https://github.com/airbytehq/airbyte/pull/89647)                                                             | Upgrade to Bulk CDK 1.2.3: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86.                                                      |
| 2.0.6   | 2026-10-29 | [90173](https://github.com/airbytehq/airbyte/pull/90173)                                                    | Discover now skips a view that references a column dropped from its base table instead of failing; syncs of such a view fail with a configuration error that explains how to fix it. |
| 2.0.5   | 2026-10-14 | [88501](https://github.com/airbytehq/airbyte/pull/88501)                                                             | Upgrade to Bulk CDK 1.1.16; a pasted `https://` prefix, trailing `/` or `:443` in Host is now accepted, and on Airbyte Cloud a URL with a path or credentials is rejected with an explicit message before the connection is attempted. |
| 2.0.4   | 2026-10-14 | [87471](https://github.com/airbytehq/airbyte/pull/87471)                                                                                                | TIME columns are no longer emitted as NULL; `TIMESTAMP_NTZ` cursor bounds are bound as NTZ, so a non-UTC session `TIMEZONE` no longer shifts the incremental window (h/t @ZenonRad, [83800](https://github.com/airbytehq/airbyte/pull/83800)); `9999-12-31 23:59:59.999999999` no longer rounds into year 10000; check fails fast on a wrong warehouse, database or schema; the Schema option is an exact name instead of a `LIKE` pattern (`_` or `%` made `check` list the whole database, took minutes on large accounts and leaked other schemas' tables, columns and primary keys; [87000](https://github.com/airbytehq/airbyte/pull/87000), [86998](https://github.com/airbytehq/airbyte/pull/86998)); ~2 s less connection latency per query (driver platform detection off); private key written to a temp file; the `JWT token is invalid` error now also points to the Server URL, the host clock and `SYSTEM$GET_LOGIN_FAILURE_DETAILS` for the exact cause; snowflake-jdbc 4.3.4.                          |
| 2.0.3   | 2026-10-13 | [87510](https://github.com/airbytehq/airbyte/pull/87510)                                                            | Report invalid key pair (JWT) authentication as a configuration error with actionable guidance instead of a misleading temporary session-expiry error.                        |
| 2.0.2 | 2026-10-09 | [88432](https://github.com/airbytehq/airbyte/pull/88432) | Upgrade to Bulk CDK 1.1.14. |
| 2.0.1   | 2026-09-23 | [85081](https://github.com/airbytehq/airbyte/pull/85081) & [86936](https://github.com/airbytehq/airbyte/pull/86936) | Discover no longer fails entirely when a single view or object is invalid or inaccessible; the offending stream is skipped (h/t @jrbarkin).                                   |
| 2.0.0   | 2026-09-03 | [85331](https://github.com/airbytehq/airbyte/pull/85331)                                                            | Deprecate username/password authentication; key pair authentication or a programmatic access token is now recommended. Username/password will be removed in a future release. |
| 1.1.2   | 2026-08-21 | [84927](https://github.com/airbytehq/airbyte/pull/84927)                                                            | Bump Bulk CDK extract version from 1.0.1 to 1.1.10                                                                                                                            |
| 1.1.1   | 2026-07-21 | [82705](https://github.com/airbytehq/airbyte/pull/82705)                                                            | Fix incremental sync silently dropping rows at the cursor's upper bound by rounding timestamp precision up instead of down                                                    |
| 1.1.0   | 2026-05-28 | [78481](https://github.com/airbytehq/airbyte/pull/78481)                                                            | Support Snowflake Programmatic Access Token authentication.                                                                                                                   |
| 1.0.11  | 2026-05-05 | [77787](https://github.com/airbytehq/airbyte/pull/77787)                                                            | Make the hidden additional properties fields in spec optional. No functional change.                                                                                          |
| 1.0.10  | 2026-03-13 | [74834](https://github.com/airbytehq/airbyte/pull/74834)                                                            | Truncate timestamp precision to 6 digits (microseconds) to prevent precision errors in destinations                                                                           |
| 1.0.9   | 2025-09-16 | [74081](https://github.com/airbytehq/airbyte/pull/74081)                                                            | Security update                                                                                                                                                               |
| 1.0.8   | 2025-09-16 | [66311](https://github.com/airbytehq/airbyte/pull/66311)                                                            | Change CDK version to 0.1.31                                                                                                                                                  |
| 1.0.7   | 2025-09-16 | [66200](https://github.com/airbytehq/airbyte/pull/66200)                                                            | Fix sampling bug for DefaultJdbcCursorIncrementalPartition                                                                                                                    |
| 1.0.6   | 2025-09-12 | [66226](https://github.com/airbytehq/airbyte/pull/66226)                                                            | Fix schema filtering functionality in versions 1.0.0+ - resolves "discovered zero tables" error and enables proper schema-level filtering                                     |
| 1.0.5   | 2025-07-28 | [63780](https://github.com/airbytehq/airbyte/pull/63780)                                                            | Fix ts data type for snowflake                                                                                                                                                |
| 1.0.3   | 2025-07-22 | [63713](https://github.com/airbytehq/airbyte/pull/63713)                                                            | Revert base image from 2.0.3 to 2.0.2 to fix SSL certificate errors                                                                                                           |
| 1.0.2   | 2025-07-14 | [62939](https://github.com/airbytehq/airbyte/pull/62939)                                                            | Update base image to 2.0.3                                                                                                                                                    |
| 1.0.1   | 2025-07-11 | [62929](https://github.com/airbytehq/airbyte/pull/62929)                                                            | Update test dependencies                                                                                                                                                      |
| 1.0.0   | 2025-06-24 | [61535](https://github.com/airbytehq/airbyte/pull/61535)                                                            | Replace community support connector with Airbyte certified connector                                                                                                          |
| 0.3.6   | 2025-01-10 | [51504](https://github.com/airbytehq/airbyte/pull/51504)                                                            | Use a non root base image                                                                                                                                                     |
| 0.3.5   | 2024-12-18 | [49911](https://github.com/airbytehq/airbyte/pull/49911)                                                            | Use a base image: airbyte/java-connector-base:1.0.0                                                                                                                           |
| 0.3.4   | 2024-10-31 | [48073](https://github.com/airbytehq/airbyte/pull/48073)                                                            | Upgrade jdbc driver                                                                                                                                                           |
| 0.3.3   | 2024-06-28 | [40424](https://github.com/airbytehq/airbyte/pull/40424)                                                            | Support Snowflake key pair authentication                                                                                                                                     |
| 0.3.2   | 2024-02-13 | [38317](https://github.com/airbytehq/airbyte/pull/38317)                                                            | Hide oAuth option from connector                                                                                                                                              |
| 0.3.1   | 2024-02-13 | [35220](https://github.com/airbytehq/airbyte/pull/35220)                                                            | Adopt CDK 0.20.4                                                                                                                                                              |
| 0.3.1   | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453)                                                            | bump CDK version                                                                                                                                                              |
| 0.3.0   | 2023-12-18 | [33484](https://github.com/airbytehq/airbyte/pull/33484)                                                            | Remove LEGACY state                                                                                                                                                           |
| 0.2.2   | 2023-10-20 | [31613](https://github.com/airbytehq/airbyte/pull/31613)                                                            | Fixed handling of TIMESTAMP_TZ columns. upgrade                                                                                                                               |
| 0.2.1   | 2023-10-11 | [31252](https://github.com/airbytehq/airbyte/pull/31252)                                                            | Snowflake JDBC version upgrade                                                                                                                                                |
| 0.2.0   | 2023-06-26 | [27737](https://github.com/airbytehq/airbyte/pull/27737)                                                            | License Update: Elv2                                                                                                                                                          |
| 0.1.36  | 2023-06-20 | [27212](https://github.com/airbytehq/airbyte/pull/27212)                                                            | Fix silent exception swallowing in StreamingJdbcDatabase                                                                                                                      |
| 0.1.35  | 2023-06-14 | [27335](https://github.com/airbytehq/airbyte/pull/27335)                                                            | Remove noisy debug logs                                                                                                                                                       |
| 0.1.34  | 2023-03-30 | [24693](https://github.com/airbytehq/airbyte/pull/24693)                                                            | Fix failure with TIMESTAMP_WITH_TIMEZONE column being used as cursor                                                                                                          |
| 0.1.33  | 2023-03-29 | [24667](https://github.com/airbytehq/airbyte/pull/24667)                                                            | Fix bug which wont allow TIMESTAMP_WITH_TIMEZONE column to be used as a cursor                                                                                                |
| 0.1.32  | 2023-03-22 | [20760](https://github.com/airbytehq/airbyte/pull/20760)                                                            | Removed redundant date-time datatypes formatting                                                                                                                              |
| 0.1.31  | 2023-03-06 | [23455](https://github.com/airbytehq/airbyte/pull/23455)                                                            | For network isolation, source connector accepts a list of hosts it is allowed to connect to                                                                                   |
| 0.1.30  | 2023-02-21 | [22358](https://github.com/airbytehq/airbyte/pull/22358)                                                            | Improved handling of big integer cursor type values.                                                                                                                          |
| 0.1.29  | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346)                                                            | Consolidate date/time values mapping for JDBC sources.                                                                                                                        |
| 0.1.28  | 2023-01-06 | [20465](https://github.com/airbytehq/airbyte/pull/20465)                                                            | Improve the schema config field to only discover tables from the specified scehma and make the field optional                                                                 |
| 0.1.27  | 2022-12-14 | [20407](https://github.com/airbytehq/airbyte/pull/20407)                                                            | Fix an issue with integer values converted to floats during replication                                                                                                       |
| 0.1.26  | 2022-11-10 | [19314](https://github.com/airbytehq/airbyte/pull/19314)                                                            | Set application id in JDBC URL params based on OSS/Cloud environment                                                                                                          |
| 0.1.25  | 2022-11-10 | [15535](https://github.com/airbytehq/airbyte/pull/15535)                                                            | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode                                     |
| 0.1.24  | 2022-09-26 | [17144](https://github.com/airbytehq/airbyte/pull/17144)                                                            | Fixed bug with incorrect date-time datatypes handling                                                                                                                         |
| 0.1.23  | 2022-09-26 | [17116](https://github.com/airbytehq/airbyte/pull/17116)                                                            | added connection string identifier                                                                                                                                            |
| 0.1.22  | 2022-09-21 | [16766](https://github.com/airbytehq/airbyte/pull/16766)                                                            | Update JDBC Driver version to 3.13.22                                                                                                                                         |
| 0.1.21  | 2022-09-14 | [15668](https://github.com/airbytehq/airbyte/pull/15668)                                                            | Wrap logs in AirbyteLogMessage                                                                                                                                                |
| 0.1.20  | 2022-09-01 | [16258](https://github.com/airbytehq/airbyte/pull/16258)                                                            | Emit state messages more frequently                                                                                                                                           |
| 0.1.19  | 2022-08-19 | [15797](https://github.com/airbytehq/airbyte/pull/15797)                                                            | Allow using role during oauth                                                                                                                                                 |
| 0.1.18  | 2022-08-18 | [14356](https://github.com/airbytehq/airbyte/pull/14356)                                                            | DB Sources: only show a table can sync incrementally if at least one column can be used as a cursor field                                                                     |
| 0.1.17  | 2022-08-09 | [15314](https://github.com/airbytehq/airbyte/pull/15314)                                                            | Discover integer columns as integers rather than floats                                                                                                                       |
| 0.1.16  | 2022-08-04 | [15314](https://github.com/airbytehq/airbyte/pull/15314)                                                            | (broken, do not use) Discover integer columns as integers rather than floats                                                                                                  |
| 0.1.15  | 2022-07-22 | [14828](https://github.com/airbytehq/airbyte/pull/14828)                                                            | Source Snowflake: Source/Destination doesn't respect DATE data type                                                                                                           |
| 0.1.14  | 2022-07-22 | [14714](https://github.com/airbytehq/airbyte/pull/14714)                                                            | Clarified error message when invalid cursor column selected                                                                                                                   |
| 0.1.13  | 2022-07-14 | [14574](https://github.com/airbytehq/airbyte/pull/14574)                                                            | Removed additionalProperties:false from JDBC source connectors                                                                                                                |
| 0.1.12  | 2022-04-29 | [12480](https://github.com/airbytehq/airbyte/pull/12480)                                                            | Query tables with adaptive fetch size to optimize JDBC memory consumption                                                                                                     |
| 0.1.11  | 2022-04-27 | [10953](https://github.com/airbytehq/airbyte/pull/10953)                                                            | Implement OAuth flow                                                                                                                                                          |
| 0.1.9   | 2022-02-21 | [10242](https://github.com/airbytehq/airbyte/pull/10242)                                                            | Fixed cursor for old connectors that use non-microsecond format. Now connectors work with both formats                                                                        |
| 0.1.8   | 2022-02-18 | [10242](https://github.com/airbytehq/airbyte/pull/10242)                                                            | Updated timestamp transformation with microseconds                                                                                                                            |
| 0.1.7   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256)                                                            | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                                                                                                  |
| 0.1.6   | 2022-01-25 | [9623](https://github.com/airbytehq/airbyte/pull/9623)                                                              | Add jdbc_url_params support for optional JDBC parameters                                                                                                                      |
| 0.1.5   | 2022-01-19 | [9567](https://github.com/airbytehq/airbyte/pull/9567)                                                              | Added parameter for keeping JDBC session alive                                                                                                                                |
| 0.1.4   | 2021-12-30 | [9203](https://github.com/airbytehq/airbyte/pull/9203)                                                              | Update connector fields title/description                                                                                                                                     |
| 0.1.3   | 2021-01-11 | [9304](https://github.com/airbytehq/airbyte/pull/9304)                                                              | Upgrade version of JDBC driver                                                                                                                                                |
| 0.1.2   | 2021-10-21 | [7257](https://github.com/airbytehq/airbyte/pull/7257)                                                              | Fixed parsing of extreme values for FLOAT and NUMBER data types                                                                                                               |
| 0.1.1   | 2021-08-13 | [4699](https://github.com/airbytehq/airbyte/pull/4699)                                                              | Added json config validator                                                                                                                                                   |

</details>
