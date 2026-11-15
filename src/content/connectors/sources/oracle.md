---
generated_record: true
connector_name: Oracle DB
connector_type: source
connector_slug: oracle
connector_directory: source-oracle
definition_id: b39a7370-74c3-45a6-ac3a-380d48520a83
version: 0.5.8
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/oracle
logo: /images/connectors/sources/oracle.svg
logo_source_path: airbyte-integrations/connectors/source-oracle/icon.svg
logo_sha256: 12c2c6b735563bc7552b6618a47f92945803a61cd95fa2ba6ed7f0a1751a76a7
original_metadata_path: airbyte-integrations/connectors/source-oracle/metadata.yaml
original_metadata_sha256: a0d68d48943b7434e0688e1c499361dc1ed8c509db0cdc8338743b0836769fe2
original_document_path: docs/integrations/sources/oracle.md
original_document_sha256: 3a7261d7607098ced8dd0b34114c652cc835aa9343bb31f5bc7a7418fa2a1fac
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7711c0061e3a92ab4db5a909dd2c748666e8fba97f671c8e89f75967c27bf990
rewritten_at: 2026-11-12T13:50:12.492707+00:00
---

# Oracle DB

## Features

| Feature                       | Supported   | Notes              |
| :---------------------------- | :---------- | :----------------- |
| Full Refresh Sync             | Yes         |                    |
| Incremental - Append Sync     | Yes         |                    |
| Replicate Incremental Deletes | No          |                    |
| Logical Replication (WAL)     | No          |                    |
| TLS Support                   | Yes         |                    |
| SSH Tunnel Connection         | Yes         |                    |
| LogMiner                      | No          |                    |
| Flashback                     | No          |                    |
| Namespaces                    | Yes         | Enabled by default |

The Oracle source keeps your database schema unchanged. However, the connected destination may alter it. See the destination's documentation for details.

## Prerequisites

1. Oracle Database `11g` or above (tested with Oracle 11g, 12c, 18c, 19c, and 21c)
2. Allow Airbyte to connect to your Oracle database if they're in separate VPCs
3. Create a dedicated read-only Airbyte user with access to every table required for replication

## Setup guide

### Step 1: Confirm database access from the machine running Airbyte

Access depends on your network setup. Use the check connection tool in the UI to verify Airbyte can connect to your Oracle instance.

### Step 2: Create a dedicated read-only user for the relevant tables (recommended but optional)

This optional step gives you better permission control and auditing. Alternatively, you can use an existing database user with Airbyte.

Run these commands against your database to create a dedicated user:

```sql
CREATE USER airbyte IDENTIFIED BY <your_password_here>;
GRANT CREATE SESSION TO airbyte;
```

Next, grant the user read-only access to the relevant tables. The simplest approach grants read access to every table in the schema:

```sql
GRANT SELECT ANY TABLE TO airbyte;
```

Alternatively, grant access more precisely:

```sql
GRANT SELECT ON "<schema_a>"."<table_1>" TO airbyte;
GRANT SELECT ON "<schema_b>"."<table_2>" TO airbyte;
```

Your database user is now ready to use with Airbyte.

### Step 3: Configure the connection type and schemas

**Connection Type**: Choose Service Name or System ID (SID):

- **Service Name**: Recommended for modern Oracle installations (Oracle 8i and later). A service name logically represents a database and supports connection load balancing and failover.
- **System ID (SID)**: Used for legacy Oracle instances. A SID uniquely identifies a specific Oracle database instance on a server.

**Schemas**: Specify the schemas Airbyte should sync from. Schema names are case sensitive. If empty, this defaults to the uppercase username. Airbyte won't discover tables if the user can't access the configured schemas.

### Step 4: Add JDBC configuration (optional)

Add JDBC URL parameters in the `JDBC URL Params` field to customise connection behaviour. Format parameters as `key=value` pairs, separated by `&`. For example:

```text
defaultRowPrefetch=20&oracle.net.CONNECT_TIMEOUT=10000&oracle.net.READ_TIMEOUT=30000
```

Common parameters:

- `defaultRowPrefetch`: Number of rows to prefetch (default: 10)
- `oracle.net.CONNECT_TIMEOUT`: Connection timeout in milliseconds
- `oracle.net.READ_TIMEOUT`: Socket read timeout in milliseconds

## Connect through an SSH tunnel

Airbyte can connect to an Oracle instance through an SSH tunnel. This helps when the database isn't directly accessible from the public internet. For example, it may lack a public IP address, or your security policy may restrict direct connections.

With an SSH tunnel, Airbyte connects to an intermediate server, known as a bastion server. The bastion has direct database access. Airbyte connects to the bastion, which then connects directly to the database.

Configure an SSH tunnel as follows:

1. Configure every source field as usual, except **SSH Tunnel Method**.
2. **SSH Tunnel Method** defaults to **No Tunnel**, which means a direct connection. For an SSH tunnel, choose **SSH Key Authentication** or **Password Authentication**.
   1. Choose **Key Authentication** to use an RSA private key for the SSH tunnel. See below for key generation guidance.
   2. Choose **Password Authentication** to use a password for the SSH tunnel.
3. **SSH Tunnel Jump Server Host** is the bastion server's hostname or IP address.
4. **SSH Connection Port** is the bastion server port for the SSH connection. The default SSH port is `22`.
5. **SSH Login Username** is the username Airbyte uses to connect to the bastion server. This isn't the Oracle database username.
6. If you're using **Password Authentication**, set **Password** to the bastion server OS user's password. If you're using **SSH Key Authentication**, leave this blank.
7. If you're using **SSH Key Authentication**, set **SSH Private Key** to the RSA private key for the SSH connection. Provide the key file's full contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

### Generate an SSH key pair

The connector requires an RSA key in PEM format. Generate this key as follows:

```text
ssh-keygen -t rsa -m PEM -f myuser_rsa
```

This creates a PEM-formatted private key and a standard-format public key. The public key uses the format required by the `authorized_keys` file on your bastion host. Add it to the bastion host for the user Airbyte will connect as. Copy the private key into the Airbyte connector configuration.

## Data type mapping

When synchronising data, Oracle data types map to the following data types.

**Note**: The connector automatically handles LONG and LONG RAW columns by setting the Oracle JDBC property `oracle.jdbc.useFetchSizeWithLongColumn=true`. For new applications, Oracle recommends LOB types (CLOB, BLOB) instead of LONG and LONG RAW columns.

| Oracle Type                      | Resulting Type | Notes |
| :------------------------------- | :------------- | :---- |
| `binary_double`                  | number         |       |
| `binary_float`                   | number         |       |
| `blob`                           | string         |       |
| `char`                           | string         |       |
| `char(3 char)`                   | string         |       |
| `clob`                           | string         |       |
| `date`                           | string         |       |
| `decimal`                        | number         |       |
| `float`                          | number         |       |
| `float(5)`                       | number         |       |
| `integer`                        | number         |       |
| `interval year to month`         | string         |       |
| `long raw`                       | string         |       |
| `number`                         | number         |       |
| `number(6, 2)`                   | number         |       |
| `nvarchar(3)`                    | string         |       |
| `raw`                            | string         |       |
| `timestamp`                      | string         |       |
| `timestamp with local time zone` | string         |       |
| `timestamp with time zone`       | string         |       |
| `varchar2`                       | string         |       |
| `varchar2(256)`                  | string         |       |
| `xmltype`                        | string         |       |

Any type not listed is coerced into a string. You can provide feedback on your preferred mappings.

## Encryption options

The connector supports three encryption methods. Airbyte Cloud requires encryption, using either Native Network Encryption or TLS. Self-Managed Airbyte supports all three options.

1. **Unencrypted** (Self-Managed only): The connection uses the TCP protocol without encryption. All data travels as plain text. Only choose this option in secure, trusted network environments.

2. **Native Network Encryption (NNE)**: Encrypts the database connection without TLS configuration or separate ports. The connector sets `SQLNET.ENCRYPTION_CLIENT=REQUIRED`, so it accepts only encrypted traffic. Choose from these encryption algorithms:
   - **AES256**: Advanced Encryption Standard with 256-bit keys (recommended)
   - **RC4_56**: RC4 stream cipher with 56-bit keys (legacy, less secure)
   - **3DES168**: Triple DES with 168-bit keys (legacy, less secure)

3. **TLS Encrypted (verify certificate)**: Uses the TLS protocol with certificate verification for maximum security. Provide the server's SSL certificate in PEM format in the **SSL PEM file** field. The certificate must be valid and trusted.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                   |
|:--------|:-----------|:---------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------|
| 0.5.8   | 2026-03-25 | [75410](https://github.com/airbytehq/airbyte/pull/75410) | Fold strict-encrypt variant into main connector; encryption is now required on Airbyte Cloud                                              |
| 0.5.7   | 2025-07-15 | [63326](https://github.com/airbytehq/airbyte/pull/63326) | Fix publishing flow.                                                                                                                      |
| 0.5.6   | 2025-07-10 | [62920](https://github.com/airbytehq/airbyte/pull/62920) | Convert to new gradle build flow                                                                                                          |
| 0.5.5   | 2025-07-10 | [62921](https://github.com/airbytehq/airbyte/pull/62921) | Convert to new gradle build flow                                                                                                          |
| 0.5.3   | 2024-12-18 | [49883](https://github.com/airbytehq/airbyte/pull/49883) | Use a base image: airbyte/java-connector-base:1.0.0                                                                                       |
| 0.5.2   | 2024-02-13 | [35225](https://github.com/airbytehq/airbyte/pull/35225) | Adopt CDK 0.20.4                                                                                                                          |
| 0.5.1   | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version                                                                                                                          |
| 0.5.0   | 2023-12-18 | [33485](https://github.com/airbytehq/airbyte/pull/33485) | Remove LEGACY state                                                                                                                       |
| 0.4.0   | 2023-06-26 | [27737](https://github.com/airbytehq/airbyte/pull/27737) | License Update: Elv2                                                                                                                      |
| 0.3.25  | 2023-06-20 | [27212](https://github.com/airbytehq/airbyte/pull/27212) | Fix silent exception swallowing in StreamingJdbcDatabase                                                                                  |
| 0.3.24  | 2023-03-22 | [20760](https://github.com/airbytehq/airbyte/pull/20760) | Removed redundant date-time datatypes formatting                                                                                          |
| 0.3.23  | 2023-03-06 | [23455](https://github.com/airbytehq/airbyte/pull/23455) | For network isolation, source connector accepts a list of hosts it is allowed to connect to                                               |
| 0.3.22  | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346) | Consolidate date/time values mapping for JDBC sources                                                                                     |
|         | 2022-10-13 | [15535](https://github.com/airbytehq/airbyte/pull/16238) | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode |
| 0.3.21  | 2022-09-01 | [16238](https://github.com/airbytehq/airbyte/pull/16238) | Emit state messages more frequently                                                                                                       |
| 0.3.20  | 2022-08-18 | [14356](https://github.com/airbytehq/airbyte/pull/14356) | DB Sources: only show a table can sync incrementally if at least one column can be used as a cursor field                                 |
| 0.3.19  | 2022-08-03 | [14953](https://github.com/airbytehq/airbyte/pull/14953) | Use Service Name to connect to database                                                                                                   |
| 0.3.18  | 2022-07-14 | [14574](https://github.com/airbytehq/airbyte/pull/14574) | Removed additionalProperties:false from JDBC source connectors                                                                            |
| 0.3.17  | 2022-06-24 | [14092](https://github.com/airbytehq/airbyte/pull/14092) | Introduced a custom jdbc param field                                                                                                      |
| 0.3.16  | 2022-06-22 | [13997](https://github.com/airbytehq/airbyte/pull/13997) | Fixed tests                                                                                                                               |
| 0.3.15  | 2022-04-29 | [12480](https://github.com/airbytehq/airbyte/pull/12480) | Query tables with adaptive fetch size to optimize JDBC memory consumption                                                                 |
| 0.3.14  | 2022-02-21 | [10242](https://github.com/airbytehq/airbyte/pull/10242) | Fixed cursor for old connectors that use non-microsecond format. Now connectors work with both formats                                    |
| 0.3.13  | 2022-02-18 | [10242](https://github.com/airbytehq/airbyte/pull/10242) | Updated timestamp transformation with microseconds                                                                                        |
| 0.3.12  | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                                                                              |
| 0.3.11  | 2021-12-24 | [8958](https://github.com/airbytehq/airbyte/pull/8958)   | Add support for JdbcType.ARRAY                                                                                                            |
| 0.3.10  | 2021-12-07 | [8582](https://github.com/airbytehq/airbyte/pull/8582)   | Update connector fields title/description                                                                                                 |
| 0.3.9   | 2021-12-01 | [8371](https://github.com/airbytehq/airbyte/pull/8371)   | Fixed incorrect handling "\n" in ssh key                                                                                                  |
| 0.3.8   | 2021-10-13 | [7125](https://github.com/airbytehq/airbyte/pull/7125)   | Fix incorrect handling of LONG RAW data type                                                                                              |
| 0.3.7   | 2021-10-01 | [6616](https://github.com/airbytehq/airbyte/pull/6616)   | Added network encryption options                                                                                                          |
| 0.3.6   | 2021-09-30 | [6585](https://github.com/airbytehq/airbyte/pull/6585)   | Improved SSH Tunnel key generation steps                                                                                                  |
| 0.3.5   | 2021-09-22 | [6356](https://github.com/airbytehq/airbyte/pull/6356)   | Added option to connect to DB via SSH.                                                                                                    |
| 0.3.4   | 2021-09-01 | [6038](https://github.com/airbytehq/airbyte/pull/6038)   | Remove automatic filtering of system schemas.                                                                                             |
| 0.3.3   | 2021-09-01 | [5779](https://github.com/airbytehq/airbyte/pull/5779)   | Ability to only discover certain schemas.                                                                                                 |
| 0.3.2   | 2021-08-13 | [4699](https://github.com/airbytehq/airbyte/pull/4699)   | Added json config validator.                                                                                                              |

</details>
