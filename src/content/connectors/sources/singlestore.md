---
generated_record: true
connector_name: SingleStore
connector_type: source
connector_slug: singlestore
connector_directory: source-singlestore
definition_id: 2e8ae725-0069-4452-afa0-d1848cf69676
version: 0.1.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/singlestore
logo: /images/connectors/sources/singlestore.svg
logo_source_path: airbyte-integrations/connectors/source-singlestore/icon.svg
logo_sha256: deae7c2eab37f1e8abf4ad0558f340d9c4c22d05edf498a76022282a1931c352
original_metadata_path: airbyte-integrations/connectors/source-singlestore/metadata.yaml
original_metadata_sha256: 861d467aee6a8c635b5f2b6fc7a23e7ae0973271ba2387ff0194592acc1d4bba
original_document_path: docs/integrations/sources/singlestore.md
original_document_sha256: aa14a3cf8c645cdd5bb165ef0ac49d4f56a981819d5daa4bb2c58bb9f4e174e2
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3bc95fdbaed6db3a382deb2324024a490d6480e1aaaf7548679524eac2715b33
rewritten_at: 2026-11-12T13:56:28.446367+00:00
---

# SingleStore

## Overview

[SingleStore](https://www.singlestore.com/) is a distributed SQL database for high-throughput transactions, including inserts and upserts. It provides low-latency analytics and context from real-time vector data.

## Features

| Feature                   | Supported | Notes |
|:--------------------------|:----------|:------|
| Full Refresh Sync         | Yes       |       |
| Incremental - Append Sync | Yes       |       |
| Change Data Capture       | No        |       |
| SSL Support               | Yes       |       |
| SSH Tunnel Connection     | Yes       |       |

Below, you'll find a 'Quick Start' guide, advanced setup steps and reference information, including data type mapping and changelogs.

## Get started

#### Requirements

1. A SingleStore instance
2. Allow connections from Airbyte to your SingleStore database \(if they're in separate VPCs\)
3. Create a dedicated, read-only Airbyte user with access to every table needed for replication

#### 1. Make your database accessible from the machine running Airbyte

The required steps depend on your network setup. Use the check connection tool in the UI to confirm Airbyte can connect to your SingleStore instance.

#### 2. Create a dedicated, read-only user for the relevant tables \(Recommended but optional\)

This optional step gives you better permission control and auditing. Alternatively, you can connect Airbyte using an existing database user.

Create a dedicated database user by running these commands against your database:

```sql
CREATE
USER airbyte IDENTIFIED BY <your_password_here>;
```

Next, give the user read-only access to the relevant tables. The simplest approach grants read access to every table in the database:

```sql
GRANT
SELECT
ON <your_database_name_here>.* TO airbyte;
```

For more granular access, use:

```sql
GRANT SELECT ON "<database_a>"."<table_1>" TO airbyte;
GRANT SELECT ON "<database_b>"."<table_2>" TO airbyte;
```

Your database user is now ready to use with Airbyte.

## Connect with SSL or SSH Tunneling

<FieldAnchor field="ssl">

### SSL modes

Choose from these SSL connection modes:

- `disable` disables encrypted communication between Airbyte and the source
- `required` always requires encryption. The connection fails if the source doesn't support encryption.
- `verify-ca` always requires encryption and verifies that the source has a valid SSL certificate
- `verify-full` always requires encryption and verifies the source's identity

</FieldAnchor>

### Connect through an SSH Tunnel

Airbyte can connect to a SingleStore instance through an SSH Tunnel. Use this method when direct database access is unavailable or conflicts with your security policy. For example, the database might not have a public IP address.

With an SSH tunnel, Airbyte connects to an intermediate server, also called a bastion server. This server has direct database access. Airbyte connects to the bastion, which then connects directly to the database server.

This feature needs extra configuration when you create the source. The following steps explain each configuration setting.

1. Configure every source field as usual, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel`, which creates a direct connection. For an SSH Tunnel, choose `SSH Key Authentication` or `Password Authentication`.
    1. Choose `Key Authentication` when using an RSA private key to establish the SSH Tunnel. See below for key-generation details.
    2. Choose `Password Authentication` when using a password to establish the SSH Tunnel.
3. `SSH Tunnel Jump Server Host` identifies the intermediate, or bastion, server that Airbyte connects to. Enter its hostname or IP Address.
4. `SSH Connection Port` is the bastion server port used for the SSH connection. The default SSH port is `22`. Keep this default unless you've explicitly changed the port.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. This is NOT the SingleStore username.
6. With `Password Authentication`, set `SSH Login Username` to the previous step's User password. With `SSH Key Authentication`, leave this blank. This isn't the SingleStore password. It's the OS-user password Airbyte uses to run commands on the bastion.
7. With `SSH Key Authentication`, set `SSH Private Key` to the RSA Private Key used for the SSH connection. Include the key file's full contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

#### Generate a private key for SSH Tunneling

The connector requires an RSA key in PEM format. Generate the key as follows:

```text
ssh-keygen -t rsa -m PEM -f myuser_rsa
```

This creates the private key in PEM format. The public key remains in the standard format used by your bastion host's `authorized_keys` file. Add the public key to the bastion host for the user you'll connect with through Airbyte. Copy and paste the private key into the Airbyte connector configuration screen. Airbyte can then use it to log in to the bastion.

## Data type mapping

When you synchronise data, SingleStore data types map to the following data types.

| SingleStore<br/> Type | Resulting Type         | Notes |
|:----------------------|:-----------------------|:------|
| `BIT`                 | base64 binary string   |       |
| `TINYINT`             | number                 |       |
| `SMALLINT`            | number                 |       |
| `MEDIUMINT`           | number                 |       |
| `INT`                 | number                 |       |
| `BIGINT`              | number                 |       |
| `FLOAT`               | number                 |       |
| `DOUBLE`              | number                 |       |
| `DECIMAL`             | number                 |       |
| `DATE`                | string                 |       |
| `TIME`                | string                 |       |
| `DATETIME`            | string                 |       |
| `TIMESTAMP`           | string                 |       |
| `YEAR`                | year string            |       |
| `CHAR`                | string                 |       |
| `VARCHAR`             | string                 |       |
| `LONGTEXT`            | string                 |       |
| `MEDIUMTEXT`          | string                 |       |
| `TEXT`                | string                 |       |
| `TINYTEXT`            | string                 |       |
| `BINARY`              | base64 binary string   |       |
| `VARBINARY`           | base64 binary string   |       |
| `LONGBLOB`            | base64 binary string   |       |
| `MEDIUMBLOB`          | base64 binary string   |       |
| `BLOB`                | base64 binary string   |       |
| `TINYBLOB`            | base64 binary string   |       |
| `JSON`                | serialized json string |       |
| `ENUM`                | string                 |       |
| `SET`                 | string                 |       |
| `GEOGRAPHYPOINT`      | string                 |       |
| `GEOGRAPHY`           | string                 |       |
| `VECTOR`              | string                 |       |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

| Version | Date       | Pull Request                                             | Subject                                             |
|:--------|:-----------|:---------------------------------------------------------|:----------------------------------------------------|
| 0.1.4   | 2025-07-10 | [62925](https://github.com/airbytehq/airbyte/pull/62925) | Convert to new gradle build flow                   |
| 0.1.3   | 2025-05-08 | [59722](https://github.com/airbytehq/airbyte/pull/59722) | Consolidate gradle setup.                           |
| 0.1.2   | 2025-01-10 | [51501](https://github.com/airbytehq/airbyte/pull/51501) | Use a non root base image                           |
| 0.1.1   | 2024-12-18 | [49862](https://github.com/airbytehq/airbyte/pull/49862) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.1.0   | 2024-04-16 | [37337](https://github.com/airbytehq/airbyte/pull/37337) | Add SingleStore source connector                    |
