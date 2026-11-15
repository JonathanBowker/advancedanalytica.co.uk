---
generated_record: true
connector_name: Yellowbrick
connector_type: destination
connector_slug: yellowbrick
connector_directory: destination-yellowbrick
definition_id: 1f7bac7e-53ff-4e0b-b6df-b74aa85cf703
version: 0.0.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/yellowbrick
logo: /images/connectors/destinations/yellowbrick.svg
logo_source_path: airbyte-integrations/connectors/destination-yellowbrick/icon.svg
logo_sha256: d910b1065ed959fd0ba69ef7b7c20bfeeb967eceb68498873c42d7c8c8b8b967
original_metadata_path: airbyte-integrations/connectors/destination-yellowbrick/metadata.yaml
original_metadata_sha256: 36b4828997aed9d618ac00aca9411ae0ad367158e44f14192273e461156cd150
original_document_path: docs/integrations/destinations/yellowbrick.md
original_document_sha256: 6bd69a77add206934e3da8970eaaaa3db1606482214e2def9f5ccd18bd77ea83
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ffd663118f12f78856c8753f88d94d6e5953d6c321b8a1d8e59756ff85f8e5f1
rewritten_at: 2026-11-12T13:28:57.248246+00:00
---

# Yellowbrick

Set up the Yellowbrick destination connector using this guide.

## Prerequisites

Airbyte Cloud only connects to Yellowbrick instances using SSL or TLS encryption. TLS is used by default. Otherwise, follow the open-source instructions below.

You'll need this information to configure the Yellowbrick destination:

- **Host** - The server's host name.
- **Port** - The server's listening port. The default is the PostgreSQL™ standard port number (5432).
- **Username**
- **Password**
- **Default Schema Name** - Specify the schema or several comma-separated schemas for the search-path. These schemas resolve unqualified object names in statements executed over this connection.
- **Database** - The database name. By default, you'll connect to a database matching the user name.
- **JDBC URL Params** (optional)

[Refer to this guide for more details](https://docs.yellowbrick.com/7.0.1/client_tools/setup_database_connection.html)

#### Configure network access

Make sure Airbyte can access your Yellowbrick database. If it's within a VPC, allow access from the IP exposing Airbyte.

## Step 1: Set up Yellowbrick

#### **Permissions**

Check whether Yellowbrick has JSON support enabled:

```
SHOW show enable_full_json;
```

If `enable_full_json` is `off`, enable it with:

```
ALTER SYSTEM SET enable_full_json TO TRUE;
```

or

```
ALTER USER "<user>" SET enable_full_json TO TRUE;
```

After either command, run:

```
SELECT pg_reload_conf();
```

Your Yellowbrick user needs these permissions:

- Create tables and write rows.
- Create schemas, for example:

Create this user by running:

```
CREATE USER airbyte_user WITH ENCRYPTED PASSWORD '<password>';
GRANT CREATE, TEMPORARY ON DATABASE <database> TO airbyte_user;
```

You can use an existing user, but a dedicated user for Airbyte is strongly recommended.

## Step 2: Set up the Yellowbrick connector in Airbyte

#### Choose a target database

Choose an existing database or create one to store data synced from Airbyte.

## Naming conventions

From [Yellowbrick SQL Identifiers syntax](https://docs.yellowbrick.com/6.9.0/ybd_sqlref/sql_identifiers.html#sql-identifiers-1)

Unquoted SQL identifiers have these restrictions:

- Unquoted SQL identifiers must begin with a letter (a-z) or underscore (_). The pg_ prefix is reserved for system objects and isn't allowed.
- Later characters can be letters, digits (0-9) or underscores. Unquoted SQL identifiers aren't case-sensitive.
- Special characters, including # and $, aren't allowed anywhere in an unquoted identifier.
- Unquoted SQL identifiers aren't case-sensitive.
- Quoted or delimited identifiers are enclosed in double quotes ("). They're case-sensitive and can contain uppercase letters, lowercase letters and special characters. However, object names can't contain double quotes.
- Database names can't contain spaces.

:::info

The Airbyte Yellowbrick destination creates raw tables and schemas with unquoted identifiers, replacing special characters with underscores. It creates final tables and their columns with quoted identifiers, preserving case sensitivity.

:::

**For Airbyte Cloud:**

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Destinations**. Then click **new destination** in the top-right corner.
3. On the Set up the destination page, name the Yellowbrick connector. Select **Yellowbrick** from the Destination type dropdown.
4. Enter a name for your source.
5. For **Host**, **Port** and **DB Name**, enter your Yellowbrick database's hostname, port number and name.
6. List the **Default Schemas**.
   :::note
   Schema names are case-sensitive. The 'public' schema is set by default. You can use multiple schemas simultaneously. If you don't set schemas explicitly, all existing schemas will sync.
   :::
7. For **User** and **Password**, enter the username and password you created in [Step 1](#step-1-optional-create-a-dedicated-read-only-user).
8. For Airbyte Open Source, enable the switch to connect using SSL. Airbyte Cloud uses SSL by default.
9. For SSL Modes, select:
   - **disable** to disable encrypted communication between Airbyte and the source
   - **allow** to enable encrypted communication only when the source requires it
   - **prefer** to allow unencrypted communication only when the source doesn't support encryption
   - **require** to always require encryption. The connection will fail if the source doesn't support encryption.
   - **verify-ca** to always require encryption and verify that the source has a valid SSL certificate
   - **verify-full** to always require encryption and verify the source's identity
10. To customise the JDBC connection beyond common options, enter additional supported [JDBC URL parameters](https://jdbc.postgresql.org/documentation/head/connect.html) in the **JDBC URL Parameters (Advanced)** field. Separate each key-value pair with &.

    Example: key1=value1&key2=value2&key3=value3

    AirByte adds these parameters to the end of the JDBC URL used to connect to your Yellowbrick database.

    The connector now supports `connectTimeout` and defaults to 60 seconds. Setting connectTimeout to 0 seconds sets the longest available timeout.

    **Note:** Don't use these keys in the JDBC URL Params field because Airbyte will overwrite them:
    `currentSchema`, `user`, `password`, `ssl`, and `sslmode`.

    :::warning
    This is an advanced configuration option. Use it carefully.
    :::

11. For SSH Tunnel Method, select:

    - **No Tunnel** to connect directly to the database
    - **SSH Key Authentication** to use an RSA Private as your secret for the SSH tunnel
    - **Password Authentication** to use a password as your secret for the SSH tunnel

    :::warning
    Airbyte Cloud requires encrypted communication. Select **SSH Key Authentication** or **Password Authentication** if your **SSL Mode** is **disable**, **allow** or **prefer**. Otherwise, the connection will fail.
    :::

12. Click **Set up destination**.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Schema map

### Raw table output schema

Each stream maps to a separate raw table in Yellowbrick. By default, raw tables are created in the `airbyte_internal` schema. You can override this in the configuration.
Each table contains 3 columns:

- `_airbyte_raw_id`: a uuid Airbyte assigns to each processed event. Its Yellowbrick column type is `VARCHAR`.
- `_airbyte_extracted_at`: a timestamp showing when the event was pulled from the data source. Its Yellowbrick column type is `TIMESTAMP WITH TIME ZONE`.
- `_airbyte_loaded_at`: a timestamp showing when the row was processed into the final table. Its Yellowbrick column type is `TIMESTAMP WITH TIME ZONE`.
- `_airbyte_data`: a json blob containing the event data. Its Yellowbrick column type is `JSONB`.

### Final table data type mapping

| Airbyte Type               | Yellowbrick Type         |
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

## Tutorials

- Coming soon.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a Yellowbrick schema.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject         |
| :------ | :--------- | :--------------------------------------------------------- | :-------------- |
| 0.0.4   | 2024-03-17 | [\#48475](https://github.com/airbytehq/airbyte/pull/48475) | Use JSONB functionality behind the scenes. |
| 0.0.3   | 2024-08-06 | [\#43342](https://github.com/airbytehq/airbyte/pull/43342) | Remove explicit Kotlin dependency. |
| 0.0.2   | 2024-05-17 | [\#38329](https://github.com/airbytehq/airbyte/pull/38329) | Update CDK      |
| 0.0.1   | 2024-03-02 | [\#35775](https://github.com/airbytehq/airbyte/pull/35775) | Initial release |

</details>
