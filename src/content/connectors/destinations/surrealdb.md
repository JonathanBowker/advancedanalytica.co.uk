---
generated_record: true
connector_name: SurrealDB
connector_type: destination
connector_slug: surrealdb
connector_directory: destination-surrealdb
definition_id: de8c3498-80d9-468b-88a1-d4ebb729c3f6
version: 0.1.2
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/surrealdb
logo: /images/connectors/destinations/surrealdb.svg
logo_source_path: airbyte-integrations/connectors/destination-surrealdb/icon.svg
logo_sha256: ff624208d0bf3d591e3cda4243ba0c79311d610f67e9dc7ffce80ecc7236d00a
original_metadata_path: airbyte-integrations/connectors/destination-surrealdb/metadata.yaml
original_metadata_sha256: 58f0f620d7d8a9061149b0cba062725f3e499b03bc839ae0c75e565e421eb5d0
original_document_path: docs/integrations/destinations/surrealdb.md
original_document_sha256: f0bc802fd897b00b70c5d61791496ee040cd55ab1d00edb1e5267f36db1b94db
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 97d7d43f08c3b50398a27a7281048e31fb1411dce4bb6dcc51d058307beba7dc
rewritten_at: 2026-11-12T13:28:12.132874+00:00
---

# SurrealDB

[SurrealDB](https://github.com/surrealdb/surrealdb) is an end-to-end, cloud-native database designed for modern applications. These include web, mobile, serverless, Jamstack, backend and traditional applications. SurrealDB can simplify your database and API infrastructure. It can also reduce development time and help you build secure, performant apps quickly and cost-effectively.

Use this guide to set up the SurrealDB destination connector.

#### Output schema

SurrealDB writes each stream to its own table. Each table contains the following Airbyte columns:

- `_airbyte_raw_id`: a uuid that Airbyte assigns to each processed event. The SurrealDB column type is `string`. The connector uses this value as each record's ID in the destination SurrealDB table.
- `_airbyte_extracted_at`: a timestamp showing when Airbyte pulled the event from the data source. The SurrealDB column type is `datetime`.
- `_airbyte_meta`: additional information about the record. The SurrealDB column type is `object`.

Each top-level field in the stream's JSON schema becomes its own field. Each field is defined as an optional SurrealDB type.

The types are `string`, `int`, `number`, `bool`, `object`, `array` or `datetime` for `date-time` strings, and `any` for untyped fields.

SurrealDB reserves `id` for the record ID. Therefore, a source field named `id` is written as `_airbyte_source_id`.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Getting started

### Requirements

You need SurrealDB v2.2.0 or above to use the SurrealDB destination.

#### Network access

Airbyte must be able to access your SurrealDB database. If it’s within a VPC, allow access from the IP you use to expose Airbyte.

#### **Permissions**

You need a user with `DEFINE TABLE, DEFINE INDEX, UPSERT, SELECT, REMOVE` permissions. Creating a dedicated Airbyte user for this purpose is highly recommended.

Run the following commands against your database to create a dedicated database user:

```sql
DEFINE USER airbyte ON ROOT PASSWORD "your_password_here" ROLES OWNER;
```

#### Target database

SurrealDB doesn't differentiate between a database and a schema. A database effectively acts as the schema containing all tables. Choose an existing database or create a new one. This becomes the default database or schema when the source doesn't provide a namespace.

### Set up the SurrealDB destination in Airbyte

Configure the following details for the SurrealDB destination:

- **Host**
- **Port**
- **Username** (`Token` or a pair of `Username`/`Password` is required)
- **Password** (`Token` or a pair of `Username`/`Password` is required)
- **Namespace**
- **Database**
- **Token** (`Token` or a pair of `Username`/`Password` is required)

## Known limitations

The SurrealDB destination converts all table, schema and column identifiers to lowercase.

## Connect through an SSH tunnel

Airbyte can connect to a SurrealDB instance through an SSH tunnel. You might need this when direct database access is unavailable or conflicts with your security policy. For example, the database might not have a public IP address.

With an SSH tunnel, Airbyte connects to an intermediate server, also called a bastion server. This server has direct database access. Airbyte connects to the bastion, which then connects directly to the database server.

This feature needs additional configuration when you create the destination. The steps below explain each setting.

1. Configure all destination fields as usual, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel`, which means a direct connection. To use an SSH tunnel, choose `SSH Key Authentication` or `Password Authentication`.
   1. Choose `Key Authentication` when using an RSA private key to establish the SSH tunnel. See below for more information about generating this key.
   2. Choose `Password Authentication` when using a password to establish the SSH tunnel.
3. `SSH Tunnel Jump Server Host` identifies the intermediate bastion server that Airbyte connects to. Enter a hostname or IP address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Use this default unless you've explicitly changed the port.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. This isn't the SurrealDB username.
6. If you're using `Password Authentication`, set `SSH Login Username` to the previous step's user password. If you're using `SSH Key Authentication`, leave this blank. This isn't the SurrealDB password. It's the OS-user password Airbyte uses to run commands on the bastion.
7. If you're using `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the key file's full contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). SurrealDB doesn't differentiate between a database and a schema. The configured database acts as the default namespace.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                                                                       |
| :------ | :--------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| 0.1.2   | 2026-10-09 | [88404](https://github.com/airbytehq/airbyte/pull/88404) | Mark `surrealdb_password` as `airbyte_secret` |
| 0.1.1   | 2026-10-07 | [88340](https://github.com/airbytehq/airbyte/pull/88340) | Fix `DEFINE FIELD` type mapping (`boolean`, nullable/union types), `id` field conflict, sparse records, and `check` over HTTP. |
| 0.1.0   | 2025-05-09 | [\#59742](https://github.com/airbytehq/airbyte/pull/59742) | Added SurrealDB destination.                                                                       |

</details>
