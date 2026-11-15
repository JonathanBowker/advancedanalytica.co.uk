---
generated_record: true
connector_name: MySQL
connector_type: destination
connector_slug: mysql
connector_directory: destination-mysql-strict-encrypt
definition_id: ca81ee7c-3163-4246-af40-094cc31e5e42
version: 1.1.2
support_level: null
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/mysql
logo: /images/connectors/destinations/mysql--destination-mysql-strict-encrypt.svg
logo_source_path: airbyte-integrations/connectors/destination-mysql-strict-encrypt/icon.svg
logo_sha256: d276c89e6d628800eac16092f3054438d6e4c24816c2df516e070cef7f17af27
original_metadata_path: airbyte-integrations/connectors/destination-mysql-strict-encrypt/metadata.yaml
original_metadata_sha256: be26ecce8408217b58847029943e05871650c7548995167bfb870867cfd89cb1
original_document_path: docs/integrations/destinations/mysql.md
original_document_sha256: 403120e7f080c261df6d4409a789737c7845213b04b0b20804de0f4b46a59ff6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 60e606a403ebf5361c371287d4220fe2c6276e3c52e9108fe00e6e9c87d14c7b
rewritten_at: 2026-11-12T13:25:52.705170+00:00
---

# MySQL

This destination has two connector flavours:

1. destination-mysql connector. Supports SSL and non-SSL connections.
2. destination-mysql-strict-encrypt connector. Offers the same support but only allows SSL connections.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Get started \(Airbyte Cloud\)

Airbyte Cloud only supports TLS-encrypted connections to your MySQL instance. Otherwise, follow the open-source instructions below.

## Get started \(Airbyte Open Source\)

### Requirements

You'll need the following to use the MySQL destination:

- To sync data to MySQL **with** typing and deduping: MySQL database 8.0.0 or later
- To sync data to MySQL **without** typing and deduping: MySQL 5.7 or later. The bundled MySQL Connector/J 9.x driver officially supports MySQL 8.0 and later. MySQL 5.7 is no longer supported upstream but still works with this connector.
- When SSL is enabled, the server must accept TLS 1.2 or TLS 1.3. SSL is enabled by default and is the only option on Airbyte Cloud. The driver no longer negotiates TLS 1.0 or TLS 1.1.

#### Troubleshooting

If the connection fails with `Cannot create a PoolableConnectionFactory` or an SSL handshake error, check that the server offers TLS 1.2 or later. This includes older Amazon RDS MySQL instances. Enable a supported TLS version on the server. You can't configure the driver to fall back to TLS 1.0 or 1.1.

#### Network access

Make sure Airbyte can access your MySQL database. For a database within a VPC, you may need to allow access from the IP exposing Airbyte.

#### **Permissions**

You need a MySQL user with `CREATE, INSERT, SELECT, DROP` permissions. Creating a dedicated Airbyte user is strongly recommended.

#### Target database

MySQL doesn't distinguish between a database and a schema. A database is effectively a schema containing all your tables. Choose an existing database or create one. It becomes the default database/schema for creating tables when the source doesn't provide a namespace.

### Set up the MySQL destination in Airbyte

Before setting up the MySQL destination in Airbyte, set the [local_infile](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_local_infile) system variable to true. Run `SET GLOBAL local_infile = true` as a user with [SYSTEM_VARIABLES_ADMIN](https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_system-variables-admin) permission. This is required because Airbyte uses `LOAD DATA LOCAL INFILE` to load data into the table.

You can now configure MySQL as a destination in the UI. You'll need the following information:

- **Host**
- **Port**
- **Username**
- **Password**
- **Database**
- **jdbc_url_params** (Optional)

### Default JDBC URL parameters

Airbyte sets the following JDBC URL parameters. You can't override them through the `jdbc_url_params` field:

- `useSSL=true` (unless `ssl` is set to false)
- `requireSSL=true` (unless `ssl` is set to false)
- `verifyServerCertificate=false` (unless `ssl` is set to false)
- `zeroDateTimeBehavior=convertToNull`
- `allowLoadLocalInfile=true`
- `connectionTimeZone=LOCAL` (the connector writes and reads `_airbyte_extracted_at` in its own time zone; don't set `connectionTimeZone` or its alias `serverTimezone` in `jdbc_url_params`)

## Known limitations

The MySQL documentation explains identifier case sensitivity using the `lower_case_table_names` system variable. One recommendation is:

```text
"It is best to adopt a consistent convention, such as always creating and referring to databases and tables using lowercase names.
 This convention is recommended for maximum portability and ease of use."
```

[Source: MySQL docs](https://dev.mysql.com/doc/refman/8.0/en/identifier-case-sensitivity.html)

As a result, the Airbyte MySQL destination converts all identifier names to lowercase, including tables, schemas and columns.

## Connect through an SSH tunnel

Airbyte can connect to a MySQL instance through an SSH tunnel. You may need this when direct database access isn't possible or conflicts with security policy. For example, the database may not have a public IP address.

With an SSH tunnel, you configure Airbyte to connect through an intermediate server, also called a bastion server. The bastion has direct database access. Airbyte connects to the bastion, which then connects directly to the database server.

This feature needs additional configuration when you create the destination. Each setting is explained below.

1. Configure every destination field as usual, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel` \(a direct connection\). To use an SSH tunnel, choose `SSH Key Authentication` or `Password Authentication`.

   1. Choose `Key Authentication` when using an RSA private key to establish the SSH tunnel. See below for more information about generating this key.
   2. Choose `Password Authentication` when using a password to establish the SSH tunnel.

   :::warning
   Airbyte Cloud requires encrypted communication. If you selected **preferred** as the **SSL Mode**, select **SSH Key Authentication** or **Password Authentication**. Otherwise, the connection will fail.
   :::

3. `SSH Tunnel Jump Server Host` identifies the intermediate \(bastion\) server that Airbyte connects to. Enter its hostname or IP address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Use the default unless you've explicitly changed it.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. This isn't the MySQL username.
6. If you're using `Password Authentication`, set `SSH Login Username` to the previous step's User password. If you're using `SSH Key Authentication`, leave this blank. This isn't the MySQL password. It's the OS-user password Airbyte uses to run commands on the bastion.
7. If you're using `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the complete key file contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). MySQL doesn't distinguish between a database and a schema. The configured database acts as the default namespace.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--------- | :------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| 1.1.2 | 2026-10-26 | [89768](https://github.com/airbytehq/airbyte/pull/89768) | Upgrade MySQL Connector/J 8.0.22 to 9.6.0 and pin `connectionTimeZone=LOCAL` so typing no longer skips records on servers west of UTC (MySQL and MySQL Strict Encrypt destinations). |
| 1.1.1 | 2025-08-04 | [63736](https://github.com/airbytehq/airbyte/pull/63736) | Use MySQL/MariaDB compatible timestamp format |
| 1.1.0 | 2025-03-25 | [50861](https://github.com/airbytehq/airbyte/pull/50861) | add support for mariadb |
| 1.0.4 | 2025-03-24 | [56355](https://github.com/airbytehq/airbyte/pull/56355) | Upgrade to airbyte/java-connector-base:2.0.1 to be M4 compatible. |
| 1.0.3 | 2024-12-18 | [49865](https://github.com/airbytehq/airbyte/pull/49865) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 1.0.3 | 2024-06-26 | [40566](https://github.com/airbytehq/airbyte/pull/40566) | Remove strict-encrypt variant |
| 1.0.2 | 2024-06-26 | [40553](https://github.com/airbytehq/airbyte/pull/40553) | Convert prod code to kotlin |
| 1.0.1 | 2024-06-25 | [40513](https://github.com/airbytehq/airbyte/pull/40513) | Improve error reporting for "access denied" error |
| 1.0.0 | 2024-04-26 | [37322](https://github.com/airbytehq/airbyte/pull/37322) | Remove normalization and upgrade to DV2 output format |
| 0.3.1 | 2024-04-12 | [36926](https://github.com/airbytehq/airbyte/pull/36926) | Upgrade to Kotlin CDK |
| 0.3.0 | 2023-12-18 | [33468](https://github.com/airbytehq/airbyte/pull/33468) | Upgrade to latest Java CDK |
| 0.2.0 | 2023-06-27 | [27781](https://github.com/airbytehq/airbyte/pull/27781) | License Update: Elv2 |
| 0.1.21 | 2022-09-14 | [15668](https://github.com/airbytehq/airbyte/pull/15668) | Wrap logs in AirbyteLogMessage |
| 0.1.20 | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors |
| 0.1.19 | 2022-05-17 | [12820](https://github.com/airbytehq/airbyte/pull/12820) | Improved 'check' operation performance |
| 0.1.18 | 2022-02-25 | [10421](https://github.com/airbytehq/airbyte/pull/10421) | Refactor JDBC parameters handling |
| 0.1.17 | 2022-02-16 | [10362](https://github.com/airbytehq/airbyte/pull/10362) | Add jdbc_url_params support for optional JDBC parameters |
| 0.1.16 | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option |
| 0.1.15 | 2021-12-01 | [8371](https://github.com/airbytehq/airbyte/pull/8371) | Fixed incorrect handling "\n" in ssh key |
| 0.1.14  | 2021-11-08 | [#7719](https://github.com/airbytehq/airbyte/pull/7719)  | Improve handling of wide rows by buffering records based on their byte size rather than their count |
| 0.1.13  | 2021-09-28 | [\#6506](https://github.com/airbytehq/airbyte/pull/6506) | Added support for MySQL destination via TLS/SSL                                                     |
| 0.1.12  | 2021-09-24 | [\#6317](https://github.com/airbytehq/airbyte/pull/6317) | Added option to connect to DB via SSH                                                               |
| 0.1.11  | 2021-07-30 | [\#5125](https://github.com/airbytehq/airbyte/pull/5125) | Enable `additionalPropertities` in spec.json                                                        |
| 0.1.10  | 2021-07-28 | [\#5026](https://github.com/airbytehq/airbyte/pull/5026) | Add sanitized json fields in raw tables to handle quotes in column names                            |
| 0.1.7   | 2021-07-09 | [\#4651](https://github.com/airbytehq/airbyte/pull/4651) | Switch normalization flag on so users can use normalization.                                        |
| 0.1.6   | 2021-07-03 | [\#4531](https://github.com/airbytehq/airbyte/pull/4531) | Added normalization for MySQL.                                                                      |
| 0.1.5   | 2021-07-03 | [\#3973](https://github.com/airbytehq/airbyte/pull/3973) | Added `AIRBYTE_ENTRYPOINT` for kubernetes support.                                                  |
| 0.1.4   | 2021-07-03 | [\#3290](https://github.com/airbytehq/airbyte/pull/3290) | Switched to get states from destination instead of source.                                          |
| 0.1.3   | 2021-07-03 | [\#3387](https://github.com/airbytehq/airbyte/pull/3387) | Fixed a bug for message length checking.                                                            |
| 0.1.2   | 2021-07-03 | [\#3327](https://github.com/airbytehq/airbyte/pull/3327) | Fixed LSEP unicode characters.                                                                      |
| 0.1.1   | 2021-07-03 | [\#3289](https://github.com/airbytehq/airbyte/pull/3289) | Added support for outputting messages.                                                              |
| 0.1.0   | 2021-05-06 | [\#3242](https://github.com/airbytehq/airbyte/pull/3242) | Added MySQL destination.                                                                            |

</details>
