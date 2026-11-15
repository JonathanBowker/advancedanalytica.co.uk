---
generated_record: true
connector_name: Teradata Vantage
connector_type: destination
connector_slug: teradata
connector_directory: destination-teradata
definition_id: 58e6f9da-904e-11ed-a1eb-0242ac120002
version: 1.0.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/teradata
logo: /images/connectors/destinations/teradata.svg
logo_source_path: airbyte-integrations/connectors/destination-teradata/icon.svg
logo_sha256: 776fa860b7cf53eed5bf563ea6a2589d1c6fa1b24aac80280c14947ff38ab416
original_metadata_path: airbyte-integrations/connectors/destination-teradata/metadata.yaml
original_metadata_sha256: d22c3fa98f6e2c25e8b73c2d4e0f81b7165e8c8d13811bd866c7b23752b1e7bc
original_document_path: docs/integrations/destinations/teradata.md
original_document_sha256: 9271e5c80ad9b14ac9bcd5057f912b6181b5fe4e46a0d359a6fc08b291f85bdc
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7a95f845dd0d9c426ef1de3d20a39936b618364ad1a9901fdfee94f0c4618dab
rewritten_at: 2026-11-12T13:27:59.771896+00:00
---

# Teradata

Set up the Teradata destination connector using this guide.

## Prerequisites

To use the Teradata destination connector, you'll need:

- Access to a Teradata Vantage instance

  **Note:** If you need a new Vantage instance, install the free Vantage Express version in the cloud. It's available on [Google Cloud](https://quickstarts.teradata.com/vantage.express.gcp.html), [Azure](https://quickstarts.teradata.com/run-vantage-express-on-microsoft-azure.html) and [AWS](https://quickstarts.teradata.com/run-vantage-express-on-aws.html). You can also run Vantage Express locally using [VMware](https://quickstarts.teradata.com/getting.started.vmware.html), [VirtualBox](https://quickstarts.teradata.com/getting.started.vbox.html) or [UTM](https://quickstarts.teradata.com/getting.started.utm.html).

You'll need this information to configure the Teradata destination:

- **Host** - The host name of your Teradata Vantage instance.
- **Authorization Mechanism** - The Logon Mechanism, which determines the connection's authentication and encryption capabilities. The default value is `TD2`. The connector supports TD2, LDAP and BROWSER authentication mechanisms.
- **User** - The username for connecting to the Teradata Vantage instance. The user needs permission to create tables and write data.
- **Password** - The password for connecting to the Teradata Vantage instance.
- **SSL modes** - The connection mode for the database. See [Teradata JDBC documentation](https://teradata-docs.s3.amazonaws.com/doc/connectivity/jdbc/reference/current/jdbcug_chapter_2.html#URL_SSLMODE) for more information. Select Enable SSL Connection to use SSL mode.
- **Default Schema Name** - The schema, or multiple comma-separated schemas, to set in the search-path. These schemas resolve unqualified object names in statements executed over this connection.
- **JDBC URL Params** (optional)
- **Query Band** (optional) - The [query band ](https://teradata-docs.s3.amazonaws.com/doc/connectivity/jdbc/reference/current/jdbcug_chapter_2.html#BGEGBBAA)is a set of name-value pairs assigned to a Teradata database session. It identifies the source of SQL requests from Airbyte. You can customise the query band with relevant details, including application name, organisation and user identifiers.
  Format each entry as key=value and separate entries with semicolons (;).
  Example: `appname=myApp;org=myOrganization;`

[Refer to this guide for more details](https://downloads.teradata.com/doc/connectivity/jdbc/reference/current/jdbcug_chapter_2.html#BGBHDDGB)

## Sync overview

### Raw table output schema

Each stream maps to a separate raw table in Teradata. By default, raw tables are created in the `airbyte_internal` schema. You can override this schema in the configuration. Each table contains these columns:

- `_airbyte_raw_id`: A unique uuid that Airbyte assigns to each processed event. This is the primary index column. Its Teradata column type is `VARCHAR(256)`.
- `_airbyte_extracted_at`: A timestamp showing when the event was pulled from the data source. Its Teradata column type is `TIMESTAMP WITH TIME ZONE`.
- `_airbyte_loaded_at`: A timestamp showing when the row was processed into the final table. Its Teradata column type is `TIMESTAMP WITH TIME ZONE`.
- `_airbyte_data`: A json blob containing the event data. Its Teradata column type is `JSON`.
- `_airbyte_meta`: A json blob containing per-row error and change handling data. Its Teradata column type is `JSON`.
- `_airbyte_generation_id`: A metadata field that increments each time you execute a [refresh](https://docs.airbyte.com/operator-guides/refreshes). Its Teradata column type is `BIGINT`.

[Refer to this guide for more details](https://docs.airbyte.com/understanding-airbyte/airbyte-metadata-fields)

### Final table data type mapping

| Airbyte Type               | Teradata Type            |
| :------------------------- |:-------------------------|
| string                     | VARCHAR                  |
| number                     | FLOAT                    |
| integer                    | BIGINT                   |
| boolean                    | SMALLINT                  |
| object                     | JSON                     |
| array                      | JSON                     |
| timestamp_with_timezone    | TIMESTAMP WITH TIME ZONE |
| timestamp_without_timezone | TIMESTAMP                |
| time_with_timezone         | TIME WITH TIME ZONE      |
| time_without_timezone      | TIME                     |
| date                       | DATE                     |

## Schema map

### Performance considerations

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Get started

### Requirements

You need a Teradata user with these permissions:

- Permission to create tables and write data.
- Permission to create schemas, for example:

Create this user by running:

```
CREATE USER airbyte_user  as perm=10e6, PASSWORD=<password>;
GRANT ALL on dbc to airbyte_user;

```

You can use an existing user. However, creating a dedicated user for Airbyte is strongly recommended.

### Setup guide

#### Set up the Teradata destination connector

1. Log in to your Airbyte Open Source account.
2. Click **Destinations**, then click **+ New destination**.
3. On the Set up the destination page, select **Teradata** from the **Destination type** dropdown.
4. Enter the **Name** for the Teradata connector.
5. For **Host**, enter the Teradata instance's host domain.
6. For **Default Schema**, enter the Default Schema name. The default value is public.
7. For **User** and **Password**, enter the database username and password.
8. To customise the JDBC connection, enter additional supported [JDBC URL parameters](https://downloads.teradata.com/doc/connectivity/jdbc/reference/current/jdbcug_chapter_2.html#BGBHDDGB) in the **JDBC URL Params** field. Enter them as key-value pairs separated by &.
   Example: key1=value1&key2=value2&key3=value3

   These parameters are added to the end of the JDBC URL. The AirByte uses this URL to connect to your Teradata database.
9. To customise the [query band](https://teradata-docs.s3.amazonaws.com/doc/connectivity/jdbc/reference/current/jdbcug_chapter_2.html#BGEGBBAA), enter a set of name-value pairs in the **Query Band** field. These pairs can be set for the current database session.

   

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a Teradata database.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                     | Subject                                                  |
|:--------|:-----------|:-------------------------------------------------|:---------------------------------------------------------|
| 1.0.0   | 2025-04-03 | https://github.com/airbytehq/airbyte/pull/56985  | Upgrade to DV2 output format                             |
| 0.2.1   | 2025-03-26 | https://github.com/airbytehq/airbyte/pull/56414  | Migrated unit and integration tests to Kotlin            |
| 0.2.0   | 2025-03-24 | https://github.com/airbytehq/airbyte/pull/56362  | Added LDAP and SSO authentication mechanism              |
| 0.1.9   | 2025-03-17 | https://github.com/airbytehq/airbyte/pull/55800  | Added Query Band Support                                 |
| 0.1.8   | 2025-03-14 | https://github.com/airbytehq/airbyte/pull/55771  | Migration to Kotlin                                      |
| 0.1.7   | 2025-03-07 | https://github.com/airbytehq/airbyte/pull/55183  | Upgrade teradata jdbc driver to 20.00.00.43              |
| 0.1.6   | 2024-06-24 | https://github.com/airbytehq/airbyte/pull/39455  | Fix for Parameter 2 length size                          |
| 0.1.5   | 2024-01-12 | https://github.com/airbytehq/airbyte/pull/33872  | Added Primary Index on \_airbyte_ab_id to fix NoPI issue |
| 0.1.4   | 2023-12-04 | https://github.com/airbytehq/airbyte/pull/28667  | Make connector available on Airbyte Cloud                |
| 0.1.3   | 2023-08-17 | https://github.com/airbytehq/airbyte/pull/30740  | Enable custom DBT transformation                         |
| 0.1.2   | 2023-08-09 | https://github.com/airbytehq/airbyte/pull/29174  | Small internal refactor                                  |
| 0.1.1   | 2023-03-03 | https://github.com/airbytehq/airbyte/pull/21760  | Added SSL support                                        |
| 0.1.0   | 2022-12-13 | https://github.com/airbytehq/airbyte/pull/20428  | New Destination Teradata Vantage                         |

</details>
