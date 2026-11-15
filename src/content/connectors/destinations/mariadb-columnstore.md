---
generated_record: true
connector_name: MariaDB ColumnStore
connector_type: destination
connector_slug: mariadb-columnstore
connector_directory: destination-mariadb-columnstore
definition_id: 294a4790-429b-40ae-9516-49826b9702e1
version: 0.1.7
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/mariadb-columnstore
logo: /images/connectors/destinations/mariadb-columnstore.svg
logo_source_path: airbyte-integrations/connectors/destination-mariadb-columnstore/icon.svg
logo_sha256: 0d3d0d28ded4c4bb256c9766db74f239b4841728f6e629584745f71945564d06
original_metadata_path: airbyte-integrations/connectors/destination-mariadb-columnstore/metadata.yaml
original_metadata_sha256: b3da528fbfd0fc0bdbcc3acadd1d3c4b05bde8653150f9d365ebc3518774648f
original_document_path: docs/integrations/destinations/mariadb-columnstore.md
original_document_sha256: 3625ea95fdfce155f25d4babe7503ddb2e292336d2070a4aac5a3caa41bdab5a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 58947559b555998014d23eefb69c196331c51853e81c462cd15d40dabb7f2d9d
rewritten_at: 2026-11-12T13:25:09.166230+00:00
---

# Mariadb Columnstore

## Sync overview

### Output schema

Each stream is written to its own MariaDB ColumnStore table. Each table contains three columns:

- `_airbyte_ab_id`: a UUID that Airbyte assigns to each processed event. Its MariaDB ColumnStore column type is VARCHAR(256).
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source. Its MariaDB ColumnStore column type is TIMESTAMP.
- `_airbyte_data`: a JSON blob containing the event data. Its MariaDB ColumnStore column type is LONGTEXT.

### Features

| Feature                       | Supported?(Yes/No) | Notes |
| :---------------------------- | :----------------- | :---- |
| Full Refresh Sync             | Yes                |       |
| Incremental Sync              | Yes                |       |
| Replicate Incremental Deletes | Yes                |       |
| SSL connection                | No                 |       |
| SSH Tunnel Support            | Yes                |       |

### Performance considerations

Could this connector strain your database, API or another system under certain conditions? Consider high table or row counts. Identify the breaking point, such as 100mm&gt; records. Explain how you can prevent this, perhaps with a read-only replica or frequent syncs.

## Getting started

### Requirements

To use the MariaDB ColumnStore destination, you must sync data to MariaDB ColumnStore 5.5.3 or above.

#### Network access

Make sure Airbyte can access your MariaDB ColumnStore database. For databases within a VPC, allow access from the IP exposing Airbyte.

#### **Permissions**

You need a MariaDB user with `CREATE, INSERT, SELECT, DROP` permissions. Creating a dedicated Airbyte user is highly recommended.

#### Target database

MariaDB ColumnStore doesn't distinguish between a database and a schema. A database is essentially a schema containing all its tables. Choose an existing database or create one. This becomes the default database or schema for tables when the source provides no namespace.

### Set up the MariaDB ColumnStore destination

Before setting up the MariaDB ColumnStore destination in Airbyte, set the [local_infile](https://mariadb.com/kb/en/server-system-variables/#local_infile) system variable to true. Run the query `SET GLOBAL local_infile = true` . This is required because Airbyte uses `LOAD DATA LOCAL INFILE` to load data into the table.

You can now configure MariaDB ColumnStore as a destination in the UI. You'll need this information:

- **Host**
- **Port**
- **Username**
- **Password**
- **Database**

## Connect through an SSH Tunnel

Airbyte can connect to a MariaDB instance through an SSH Tunnel. Use this when direct database access isn't possible or breaches security policy. For example, the database might not have a public IP address.

With an SSH tunnel, Airbyte connects through an intermediate server, also called a bastion server. The bastion has direct database access. Airbyte connects to the bastion, which then connects directly to the database server.

This feature requires extra configuration when you create the destination. The following steps explain each configuration field.

1. Configure every destination field as normal, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel` \(a direct connection\). To use an SSH Tunnel, choose `SSH Key Authentication` or `Password Authentication`.
   1. Choose `Key Authentication` when using an RSA private key to establish the SSH Tunnel. See below for key-generation guidance.
   2. Choose `Password Authentication` when using a password to establish the SSH Tunnel.
3. `SSH Tunnel Jump Server Host` identifies the intermediate \(bastion\) server that Airbyte connects to. Enter a hostname or IP Address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Keep this default unless you've explicitly changed the port.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. This isn't the MySQl username.
6. If you're using `Password Authentication`, set `SSH Login Username` to the previous step's User password. If you're using `SSH Key Authentication`, leave this blank. This isn't the MariaDB password. It's the OS-user password Airbyte uses to run commands on the bastion.
7. If you're using `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the full key file contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------------- |
| 0.1.7   | 2022-09-07 | [16391](https://github.com/airbytehq/airbyte/pull/16391) | Add custom JDBC parameters field                       |
| 0.1.6   | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors |
| 0.1.5   | 2022-05-17 | [12820](https://github.com/airbytehq/airbyte/pull/12820) | Improved 'check' operation performance                 |
| 0.1.4   | 2022-02-25 | [10421](https://github.com/airbytehq/airbyte/pull/10421) | Refactor JDBC parameters handling                      |
| 0.1.3   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option           |
| 0.1.2   | 2021-12-30 | [\#8809](https://github.com/airbytehq/airbyte/pull/8809) | Update connector fields title/description              |
| 0.1.1   | 2021-12-01 | [\#8371](https://github.com/airbytehq/airbyte/pull/8371) | Fixed incorrect handling "\n" in ssh key.              |
| 0.1.0   | 2021-11-15 | [\#7961](https://github.com/airbytehq/airbyte/pull/7961) | Added MariaDB ColumnStore destination.                 |

</details>
