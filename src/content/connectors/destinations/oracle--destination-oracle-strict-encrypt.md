---
generated_record: true
connector_name: Oracle
connector_type: destination
connector_slug: oracle
connector_directory: destination-oracle-strict-encrypt
definition_id: 3986776d-2319-4de9-8af8-db14c0996e72
version: 1.0.0
support_level: null
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/oracle
logo: /images/connectors/destinations/oracle--destination-oracle-strict-encrypt.svg
logo_source_path: airbyte-integrations/connectors/destination-oracle-strict-encrypt/icon.svg
logo_sha256: 12c2c6b735563bc7552b6618a47f92945803a61cd95fa2ba6ed7f0a1751a76a7
original_metadata_path: airbyte-integrations/connectors/destination-oracle-strict-encrypt/metadata.yaml
original_metadata_sha256: a915765df9069b9310356b970842a3283ca5334e4960f8a2f355483dc02be968
original_document_path: docs/integrations/destinations/oracle.md
original_document_sha256: 7fa98d3941a762f022119d15dfbc5b0ca85fdc394b0db711add295b84d5cdb9d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5418730cc7bce8186963870a35d06371a3dfd56d0d3f82c455eb495c24205f19
rewritten_at: 2026-11-12T13:26:12.125054+00:00
---

# Oracle DB

## Output schema

By default, each stream goes to its own Oracle table. Each table contains three columns:

- `_AIRBYTE_AB_ID`: a UUID Airbyte assigns to each processed event. The Oracle column type is `VARCHAR(64)`.
- `_AIRBYTE_EMITTED_AT`: a timestamp showing when Airbyte pulled the event from the data source. The Oracle column type is `TIMESTAMP WITH TIME ZONE`.
- `_AIRBYTE_DATA`: a JSON blob containing the event data. The Oracle column type is `NCLOB`.

Enabling normalisation also creates strongly typed, normalised tables.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started \(Airbyte Cloud\)

The Oracle connector is currently in Alpha on Airbyte Cloud. Airbyte Cloud only supports TLS-encrypted connections to your database. Otherwise, follow the open-source instructions below.

## Get started \(Airbyte Open Source\)

#### Requirements

You'll need the following to use the Oracle destination:

- An Oracle server running version 21 or above

#### Network access

Make sure Airbyte can access your Oracle database. If your database is inside a VPC, you may need to allow access from the IP exposing Airbyte.

#### **Permissions**

Airbyte namespaces let you store data in different schemas. Required permissions vary by scenario:

| Login user   | Destination user   | Required permissions                                          | Comment                                                                    |
| :----------- | :----------------- | :------------------------------------------------------------ | :------------------------------------------------------------------------- |
| DBA User     | Any user           | -                                                             |                                                                            |
| Regular user | Same user as login | Create, drop and write table, create session                  |                                                                            |
| Regular user | Any existing user  | Create, drop and write ANY table, create session              | Grants can be provided on a system level by DBA or by target user directly |
| Regular user | Not existing user  | Create, drop and write ANY table, create user, create session | Grants should be provided on a system level by DBA                         |

Creating an Airbyte-specific user for this purpose is highly recommended.

### Set up the Oracle destination in Airbyte

You now have everything required to configure Oracle as a destination in the UI. You'll need these details:

- **Host**
- **Port**
- **Username**
- **Password**
- **Database**
- **Connection via SSH Tunnel**

Airbyte can connect to an Oracle instance through an SSH Tunnel. Use this approach when direct database access is impossible or breaches security policy, such as when it has no public IP address.

With an SSH tunnel, Airbyte connects through an intermediate server, also called a bastion server. This server must have direct database access. Airbyte connects to the bastion, which then connects directly to the database server.

This feature needs extra configuration when you create the source. The following guidance explains each setting.

1. Configure every source field as usual, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel`, which means a direct connection. For an SSH Tunnel, choose `SSH Key Authentication` or `Password Authentication`.
   1. Choose `Key Authentication` when using an RSA private key to establish the SSH Tunnel. See below for guidance on generating this key.
   2. Choose `Password Authentication` when using a password to establish the SSH Tunnel.
3. `SSH Tunnel Jump Server Host` is the intermediate \(bastion\) server that Airbyte connects to. Enter its hostname or IP Address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Keep this default unless you've explicitly changed the port.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. This isn't the Oracle username.
6. If you're using `Password Authentication`, set `SSH Login Username` to the previous step's user password. If you're using `SSH Key Authentication`, leave this field blank. This isn't the Oracle password. It's the OS-user password Airbyte uses to run commands on the bastion.
7. If you're using `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the key file's full contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## Encryption options

Airbyte can connect to the Oracle source using three network connectivity options:

1. `Unencrypted`: The connection uses the TCP protocol. All data travels across the network without encryption.
2. `Native network encryption`: This option encrypts database connections without TCP / IP and SSL / TLS configuration overhead. You also don't need to open and listen on different ports. The _SQLNET.ENCRYPTION_CLIENT_ option always defaults to _REQUIRED_. The client or server only accepts encrypted traffic. You can choose an `Encryption algorithm` that meets your security policies.
3. `TLS Encrypted` (verify certificate): This option transfers data using TLS, including the handshake procedure and certificate verification. To use it, insert the server-issued certificate's content into the `SSL PEM file` field.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to an Oracle schema.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version     | Date       | Pull Request                                               | Subject                                                                                             |
| :---------- | :--------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| 1.0.0       | 2024-04-11 | [\#36048](https://github.com/airbytehq/airbyte/pull/36048) | Removes Normalization, updates to V2 Raw Table Format                                               |
| 0.2.0       | 2023-06-27 | [\#27781](https://github.com/airbytehq/airbyte/pull/27781) | License Update: Elv2                                                                                |
| 0.1.19      | 2022-07-26 | [\#10719](https://github.com/airbytehq/airbyte/pull/)      | Destination Oracle: added custom JDBC parameters support.                                           |
| 0.1.18      | 2022-07-14 | [\#14618](https://github.com/airbytehq/airbyte/pull/14618) | Removed additionalProperties: false from JDBC destination connectors                                |
| unpublished | 2022-05-17 | [12820](https://github.com/airbytehq/airbyte/pull/12820)   | Improved 'check' operation performance                                                              |
| 0.1.16      | 2022-04-06 | [11514](https://github.com/airbytehq/airbyte/pull/11514)   | Bump mina-sshd from 2.7.0 to 2.8.0                                                                  |
| 0.1.15      | 2022-02-25 | [10421](https://github.com/airbytehq/airbyte/pull/10421)   | Refactor JDBC parameters handling and remove DBT support                                            |
| 0.1.14      | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256)   | (unpublished) Add `-XX:+ExitOnOutOfMemoryError` JVM option                                          |
| 0.1.13      | 2021-12-29 | [\#9177](https://github.com/airbytehq/airbyte/pull/9177)   | Update connector fields title/description                                                           |
| 0.1.12      | 2021-11-08 | [\#7719](https://github.com/airbytehq/airbyte/pull/7719)   | Improve handling of wide rows by buffering records based on their byte size rather than their count |
| 0.1.10      | 2021-10-08 | [\#6893](https://github.com/airbytehq/airbyte/pull/6893)   | 🎉 Destination Oracle: implemented connection encryption                                            |
| 0.1.9       | 2021-10-06 | [\#6611](https://github.com/airbytehq/airbyte/pull/6611)   | 🐛 Destination Oracle: maxStringLength should be 128                                                |
| 0.1.8       | 2021-09-28 | [\#6370](https://github.com/airbytehq/airbyte/pull/6370)   | Add SSH Support for Oracle Destination                                                              |
| 0.1.7       | 2021-08-30 | [\#5746](https://github.com/airbytehq/airbyte/pull/5746)   | Use default column name for raw tables                                                              |
| 0.1.6       | 2021-08-23 | [\#5542](https://github.com/airbytehq/airbyte/pull/5542)   | Remove support for Oracle 11g to allow normalization                                                |
| 0.1.5       | 2021-08-10 | [\#5307](https://github.com/airbytehq/airbyte/pull/5307)   | 🐛 Destination Oracle: Fix destination check for users without dba role                             |
| 0.1.4       | 2021-07-30 | [\#5125](https://github.com/airbytehq/airbyte/pull/5125)   | Enable `additionalPropertities` in spec.json                                                        |
| 0.1.3       | 2021-07-21 | [\#3555](https://github.com/airbytehq/airbyte/pull/3555)   | Partial Success in BufferedStreamConsumer                                                           |
| 0.1.2       | 2021-07-20 | [\#4874](https://github.com/airbytehq/airbyte/pull/4874)   | Require `sid` instead of `database` in connector specification                                      |

</details>
