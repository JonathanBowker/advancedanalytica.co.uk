---
generated_record: true
connector_name: TiDB
connector_type: destination
connector_slug: tidb
connector_directory: destination-tidb
definition_id: 06ec60c7-7468-45c0-91ac-174f6e1a788b
version: 0.1.4
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/tidb
logo: /images/connectors/destinations/tidb.svg
logo_source_path: airbyte-integrations/connectors/destination-tidb/icon.svg
logo_sha256: 1c26900f5c45bfcc0389f185b70f2059922f1643631b758527039f670c13a686
original_metadata_path: airbyte-integrations/connectors/destination-tidb/metadata.yaml
original_metadata_sha256: 30d961eddc98476625a7e11971423eefb81acb4098c75635c45f9220de67cb4a
original_document_path: docs/integrations/destinations/tidb.md
original_document_sha256: 10acfa37efda9d8efebeffcd685558f28d48dae16f5261875689019f6e59c1fa
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4cf31b6ba9a0eebfadcf3b09d3a2e565acb2ad8fe85265ad48f4db1c44107d87
rewritten_at: 2026-11-12T13:27:56.368088+00:00
---

# TiDB

[TiDB](https://github.com/pingcap/tidb) (/’taɪdiːbi:/, "Ti" means Titanium) is an open-source, distributed NewSQL database for Hybrid Transactional and Analytical Processing (HTAP) workloads. It is MySQL compatible, with horizontal scalability, strong consistency and high availability. You can now start a free developer trial on [TiDB Cloud](https://en.pingcap.com/tidb-cloud/).

This page shows you how to set up the TiDB destination connector.

## Features

| Feature                        | Supported?\(Yes/No\) | Notes |
| :----------------------------- | :------------------- | :---- |
| Full Refresh Sync              | Yes                  |       |
| Incremental - Append Sync      | Yes                  |       |
| Incremental - Append + Deduped | Yes                  |       |
| Namespaces                     | Yes                  |       |
| SSH Tunnel Connection          | Yes                  |       |

#### Output schema

Each stream is written to its own TiDB table. Each table contains three columns:

- `_airbyte_ab_id`: a UUID that Airbyte assigns to each processed event. Its TiDB column type is `VARCHAR(256)`.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source. Its TiDB column type is `TIMESTAMP(6)`.
- `_airbyte_data`: a JSON blob containing the event data. Its TiDB column type is `JSON`.

## Get started

### Requirements

To use the TiDB destination, you'll need:

- A TiDB database running v5.4.0 or later to sync data to TiDB **with normalization**.

#### Network access

Make sure Airbyte can access your TiDB database. For a database within a VPC, you may need to allow access from the IP exposing Airbyte.

#### **Permissions**

You need a user with `CREATE, INSERT, SELECT, DROP, CREATE VIEW, ALTER` permissions. Creating a dedicated Airbyte user is strongly recommended.

Run the following commands against your database to create a dedicated database user:

```sql
CREATE USER 'airbyte'@'%' IDENTIFIED BY 'your_password_here';
```

Then grant the user access to the relevant database:

```sql
GRANT CREATE, INSERT, SELECT, DROP, CREATE VIEW, ALTER ON <database name>.* TO 'airbyte'@'%';
```

#### Target database

TiDB doesn't distinguish between a database and a schema. A database is effectively a schema containing all its tables. Choose an existing database or create one. It becomes the default database or schema for tables when the source doesn't provide a namespace.

### Set up the TiDB destination

Configure the following details in the TiDB destination:

- **Host**
- **Port**
- **Username**
- **Password**
- **Database**
- **jdbc_url_params** (Optional)

**Note:** When connecting to TiDB Cloud with TLS enabled, specify a TLS protocol in the JDBC parameters. For example, use `enabledTLSProtocols=TLSv1.2` or `enabledTLSProtocols=TLSv1.3`.

### Default JDBC URL parameters

- `useSSL=false` (unless `ssl` is set to true)
- `requireSSL=false` (unless `ssl` is set to true)
- `verifyServerCertificate=false` (unless `ssl` is set to true)

## Known limitations

The TiDB destination converts all identifier names \(tables, schemas and columns\) to lowercase.

## Connect through an SSH tunnel

Airbyte can connect to a TiDB instance through an SSH tunnel. Use this when direct database access is unavailable or conflicts with your security policy. For example, the database may not have a public IP address.

An SSH tunnel connects Airbyte through an intermediate server, also called a bastion server. This server must have direct database access. Airbyte connects to the bastion, which then connects directly to the database server.

This feature needs extra configuration when you create the destination. The following steps explain each setting.

1. Configure the destination fields as usual, except for `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel` \(a direct connection\). To use an SSH tunnel, choose `SSH Key Authentication` or `Password Authentication`.
   1. Choose `Key Authentication` when using an RSA private key to establish the SSH tunnel. See below for details about generating this key.
   2. Choose `Password Authentication` when using a password to establish the SSH tunnel.
3. `SSH Tunnel Jump Server Host` identifies the intermediate \(bastion\) server that Airbyte connects to. Enter a hostname or IP address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Keep this default unless you've explicitly changed the port.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. This isn't the TiDB username.
6. If you're using `Password Authentication`, set `SSH Login Username` to the previous step's user password. If you're using `SSH Key Authentication`, leave this blank. This isn't the TiDB password. It's the operating system user's password that Airbyte uses to run commands on the bastion.
7. If you're using `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the full key file contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                                                                       |
| :------ | :--------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| 0.1.4   | 2023-06-21 | [\#27555](https://github.com/airbytehq/airbyte/pull/27555) | Reduce image size                                                                             |
| 0.1.3   | 2023-06-05 | [\#27025](https://github.com/airbytehq/airbyte/pull/27025) | Internal code change for future development (install normalization packages inside connector) |
| 0.1.2   | 2023-05-23 | [\#19109](https://github.com/airbytehq/airbyte/pull/19109) | Enabled Append Dedub mode                                                                     |
| 0.1.1   | 2023-04-04 | [\#24604](https://github.com/airbytehq/airbyte/pull/24604) | Support for destination checkpointing                                                         |
| 0.1.0   | 2022-08-12 | [\#15592](https://github.com/airbytehq/airbyte/pull/15592) | Added TiDB destination.                                                                       |

</details>
