---
generated_record: true
connector_name: MongoDB
connector_type: destination
connector_slug: mongodb
connector_directory: destination-mongodb-strict-encrypt
definition_id: 8b746512-8c2e-6ac1-4adc-b59faafd473c
version: 0.2.0
support_level: null
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/mongodb
logo: /images/connectors/destinations/mongodb--destination-mongodb-strict-encrypt.svg
logo_source_path: airbyte-integrations/connectors/destination-mongodb-strict-encrypt/icon.svg
logo_sha256: d1aff8568bcbc0f4a4358796fd84bbe16a4ef35a42d77b4f382cf04b790d9cc2
original_metadata_path: airbyte-integrations/connectors/destination-mongodb-strict-encrypt/metadata.yaml
original_metadata_sha256: 1f65edbfc66f6f5c5e9a142f7a6c022109314d476f96ddba9539f32035d8db87
original_document_path: docs/integrations/destinations/mongodb.md
original_document_sha256: 29d4f67bf303d05c7e52ecbe39f0d3613095cd17bf2ea525c432de3495799c44
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8f946ee3efefae817def7fd56c7a46348964ed3fa5d608824d02f04f70fb7cff
rewritten_at: 2026-11-12T13:25:15.331849+00:00
---

# MongoDB

## Prerequisites

- If you use Airbyte Open Source with the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to version `v0.40.0-alpha` or newer. Upgrade your MongoDB connector to version `0.1.6` or newer.

## Output schema for `destination-mongodb`

Each stream is output to its own MongoDB collection. Each collection contains three fields:

- `_id`: an identifier assigned to each processed document. Its MongoDB field type is `String`.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source. Its MongoDB field type is `Timestamp`.
- `_airbyte_data`: a json blob containing the event data. Its MongoDB field type is `Object`.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started with Airbyte Cloud

Airbyte Cloud only supports TLS-encrypted connections to your MongoDB instance. Otherwise, you can follow the open-source instructions below.

## Get started with Airbyte Open Source

#### Requirements

To use the MongoDB destination, you need:

- A MongoDB server

#### **Permissions**

You need a MongoDB user who can create collections and write documents. Creating a dedicated Airbyte user is strongly recommended.

#### Target database

Choose an existing database or create one to store data synced from Airbyte.

### Set up the MongoDB destination

You can now configure MongoDB as a destination in the UI. You need the following information:

- **Standalone MongoDb instance**
  - Host: URL of the database
  - Port: Port used to connect to the database
  - TLS: indicates whether to create an encrypted connection
- **Replica Set**
  - Server addresses: the members of a replica set
  - Replica Set: A replica set name
- **MongoDb Atlas Cluster**
  - Cluster URL: URL of a cluster to connect to
- **Database**
- **Username**
- **Password**

For more information about the configuration parameters, see [MongoDb Documentation](https://docs.mongodb.com/drivers/java/sync/v4.3/fundamentals/connection/).

### Connect through an SSH tunnel

Airbyte can connect to a MongoDB instance through an SSH Tunnel.
You might need this connection when direct access is unavailable or conflicts with security policy. For example, the instance may lack a public IP address.

With an SSH tunnel, you configure Airbyte to connect through an intermediate server, also called a bastion server. This server has direct access to MongoDB.
Airbyte connects to the bastion, which then connects directly to the server.

This feature requires additional configuration when you create the source. The following steps explain each configuration setting.

1. Configure every source field as usual, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel`, which means a direct connection. To use an SSH Tunnel, choose `SSH Key Authentication` or `Password Authentication`.
   1. Choose `Key Authentication` when using an RSA private key to establish the SSH Tunnel. See below for more information about generating this key.
   2. Choose `Password Authentication` when using a password to establish the SSH Tunnel.
3. `SSH Tunnel Jump Server Host` identifies the intermediate bastion server that Airbyte connects to. Enter a hostname or an IP Address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Use this default unless you've explicitly changed it.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. This is NOT the TiDB username.
6. If you use `Password Authentication`, set `SSH Login Username` to the previous User's password. If you use `SSH Key Authentication`, use the OS-user's password, not the TiDB password. Airbyte uses this OS-user to run commands on the bastion.
7. If you use `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the full key file contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## Naming conventions

The following information comes from the [MongoDB Limits and Thresholds](https://docs.mongodb.com/manual/reference/limits/) documentation.

#### Database name case sensitivity

MongoDB database names are case-insensitive, so they can't differ only by character case.

#### Database name restrictions on Windows

For MongoDB deployments on Windows, database names can't contain these characters: /. "$_&lt;&gt;:\|?_

Database names also can't contain the null character.

#### Database name restrictions on Unix and Linux

For MongoDB deployments on Unix and Linux systems, database names can't contain these characters: /. "$

Database names also can't contain the null character.

#### Database name length

Database names can't be empty and must contain fewer than 64 characters.

#### Collection name restrictions

Collection names should start with an underscore or letter. They can't:

- contain the $.
- be an empty string \(e.g. ""\).
- contain the null character.
- begin with the system. prefix. \(Reserved for internal use.\)

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The namespace maps to a MongoDB database.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                    |
| :------ | :--------- | :------------------------------------------------------- | :--------------------------------------------------------- |
| 0.2.0   | 2023-06-27 | [27781](https://github.com/airbytehq/airbyte/pull/27781) | License Update: Elv2                                       |
| 0.1.9   | 2022-11-08 | [18892](https://github.com/airbytehq/airbyte/pull/18892) | Adds check for TLS flag                                    |
| 0.1.8   | 2022-10-26 | [18280](https://github.com/airbytehq/airbyte/pull/18280) | Adds SSH tunneling                                         |
| 0.1.7   | 2022-09-02 | [16025](https://github.com/airbytehq/airbyte/pull/16025) | Remove additionalProperties:false from spec                |
| 0.1.6   | 2022-08-02 | [15211](https://github.com/airbytehq/airbyte/pull/15211) | Fix standard mode                                          |
| 0.1.5   | 2022-07-27 | [14561](https://github.com/airbytehq/airbyte/pull/14561) | Change Airbyte Id from MD5 to SHA256                       |
| 0.1.4   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | (unpublished) Add `-XX:+ExitOnOutOfMemoryError` JVM option |
| 0.1.3   | 2021-12-30 | [8809](https://github.com/airbytehq/airbyte/pull/8809)   | Update connector fields title/description                  |
| 0.1.2   | 2021-10-18 | [6945](https://github.com/airbytehq/airbyte/pull/6945)   | Create a secure-only MongoDb destination                   |
| 0.1.1   | 2021-09-29 | [6536](https://github.com/airbytehq/airbyte/pull/6536)   | Destination MongoDb: added support via TLS/SSL             |

</details>
