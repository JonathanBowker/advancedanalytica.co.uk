---
generated_record: true
connector_name: MySQL
connector_type: source
connector_slug: mysql
connector_directory: source-mysql
definition_id: 435bb9a5-7887-4809-aa58-28c27df0d7ad
version: 3.53.10
support_level: certified
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/mysql
logo: /images/connectors/sources/mysql.svg
logo_source_path: airbyte-integrations/connectors/source-mysql/icon.svg
logo_sha256: d276c89e6d628800eac16092f3054438d6e4c24816c2df516e070cef7f17af27
original_metadata_path: airbyte-integrations/connectors/source-mysql/metadata.yaml
original_metadata_sha256: 49383d0683e92f491a3359e80ff19125b592258f2bc4aad19777c57089a80116
original_document_path: docs/integrations/sources/mysql.md
original_document_sha256: 179a7f24b45fd699ffb4eb15fcc38c774062f1878864513c7953aa89c7d3fe5e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: aef609854c00abe32964c139c04f38c15b1687998185800034fbfff1bb347445
rewritten_at: 2026-11-12T13:48:34.711658+00:00
---

# MySQL

Airbyte's certified MySQL connector gives you these features:

- Keep your data fresh through several methods, including [Change Data Capture (CDC)](https://docs.airbyte.com/understanding-airbyte/cdc) using the [binlog](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html).
- Choose from all available [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes), giving you flexibility in how data reaches your destination.
- Replicate tables of any size reliably with [checkpointing](https://docs.airbyte.com/understanding-airbyte/airbyte-protocol/#state--checkpointing) and chunked database reads.

Below, you'll find a quick start guide, advanced setup steps and reference information, including data type mappings and changelogs.
<!-- env:oss -->
**Please note the minimum required platform version is v0.58.0 to run source-mysql 3.4.0.**
<!-- /env:oss -->

## Quick start

Complete these minimum steps to configure a MySQL connector:

1. Create a dedicated, read-only MySQL user with permission to replicate data
2. Enable binary logging on your MySQL server
3. Create a MySQL source in the Airbyte UI using CDC logical replication
4. (Airbyte Cloud Only) Allow inbound traffic from Airbyte IPs

After completing these steps, you can select MySQL as a source for data replication.

<FieldAnchor field="username,password">

#### Step 1: Create a read-only MySQL user

These steps create a dedicated, read-only user for data replication. You can use an existing MySQL database user instead.

Create the new user with these commands:

```roomsql
CREATE USER <user_name> IDENTIFIED BY 'your_password_here';
```

Now give this user read-only access to the relevant schemas and tables:

```roomsql
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO <user_name>;
```

If you choose the `STANDARD` replication method, which isn't recommended, you only need the `SELECT` permission.

</FieldAnchor>

<FieldAnchor field="replication_method[CDC]">

#### Step 2: Enable binary logging

You must enable binary logging to replicate MySQL data using CDC. Most cloud providers, including AWS and GCP, offer one-click binlog activation.

If you manage your MySQL server, add these properties to its configuration file:

<details>
  <summary>Configuring MySQL server config files to enable binlog</summary>

```text
server-id                  = 223344
log_bin                    = mysql-bin
binlog_format              = ROW
binlog_row_image           = FULL
binlog_expire_logs_seconds  = 864000
```

:::note Amazon RDS MySQL configuration
RDS doesn't use `binlog_expire_logs_seconds`. Instead, it uses `binlog retention hours`, which defaults to 0 and removes binary logs immediately. Increase this value using the RDS-specific procedure in [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/mysql-stored-proc-configuring.html).
:::

- server-id: This value must be unique for each server and replication client in the MySQL cluster. The `server-id` must be non-zero. If `server-id` is already non-zero, you don't need to change it. Set `server-id` to any value from 1 to 4294967295. For more information, refer to [mysql doc](https://dev.mysql.com/doc/refman/8.0/en/replication-options.html#sysvar_server_id).
- log_bin: This value is the base name for the sequence of binlog files. If `log_bin` is already set, you don't need to change it. For more information, refer to [mysql doc](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#option_mysqld_log-bin).
- binlog_format: Set `binlog_format` to `ROW`. For more information, refer to [mysql doc](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_binlog_format).
- binlog_row_image: Set `binlog_row_image` to `FULL`. This setting determines how row images are written to the binary log. For more information, refer to [mysql doc](https://dev.mysql.com/doc/refman/5.7/en/replication-options-binary-log.html#sysvar_binlog_row_image).
- binlog_expire_logs_seconds: This value sets the number of seconds before binlog files are removed automatically. We recommend 864000 seconds, or 10 days. This period provides time to resume an incremental sync from its last point after a failure or pause. We also recommend frequent CDC syncs.

</details>

</FieldAnchor>

<FieldAnchor field="host, port, database">

#### Step 3: Create a MySQL source

In your [Airbyte Cloud](https://cloud.airbyte.com/workspaces) or Airbyte Open Source account, select `Sources` from the left navigation bar. Search for `MySQL`, then create a MySQL source.

Enter the required information:

1. Enter your MySQL database's hostname, port number and name. On Airbyte Cloud, the host must be reachable from the internet. A database on `localhost`, `127.0.0.1` or a private network requires an [SSH tunnel](#connection-via-ssh-tunnel). This also provides the encryption that Airbyte Cloud requires. In **Host**, enter only the hostname or IP address, not a URL or `host:port`.
2. Enter the username and password you created in [Step 1](#step-1-create-a-dedicated-read-only-mysql-user).
3. Select an SSL mode. You'll usually choose `required` or `verify_ca`. Both always require encryption. `verify_ca` also requires certificates from your MySQL database. See [here](#ssl-modes) for other SSL modes and SSH tunnelling. Airbyte Cloud connections must be encrypted. Use one of these SSL modes or an [SSH tunnel](#connection-via-ssh-tunnel).
4. Select `Read Changes using Binary Log (CDC)` from the available replication methods.

<!-- env:cloud -->

#### Step 4: (Airbyte Cloud Only) Allow Airbyte IPs

On Airbyte Cloud, you must configure your database to allow inbound traffic from Airbyte IPs. Find every IP you need to allow in
[Airbyte Security docs](../../platform/operating-airbyte/ip-allowlist).

Airbyte Cloud never connects to a database without encryption. The connection must use TLS/SSL with `required`, `verify_ca` or `verify_identity`, or use an [SSH tunnel](#connection-via-ssh-tunnel). The tunnel encrypts the connection between Airbyte Cloud and your network. The `preferred` SSL mode falls back to plaintext when the server doesn't offer TLS. Airbyte Cloud therefore accepts this mode only with an SSH tunnel. A database on `localhost` or a private network is only reachable through an SSH tunnel. The tunnel must connect to a bastion host that can reach the database. Airbyte Cloud checks the **Host** field before connecting. `localhost`, `127.0.0.1` or `0.0.0.0` with `No Tunnel` fails the connection test with `Airbyte Cloud cannot reach a database on your own machine. Use a hostname reachable from the internet, or configure an SSH tunnel.`. A URL, credentials or `host:port` entered in the field fails with `Enter only the hostname in Host; put the port in the Port field.`.

Select `Set up source` in the Airbyte UI. Airbyte then tests the database connection. After a successful test, your Airbyte MySQL source is configured.

If the test fails with `Airbyte could not reach the database at the configured host and port`, check the host and port. Confirm that MySQL accepts remote connections through `bind-address` and the user's host grants. Also confirm that your firewall or security group allows the Airbyte IP addresses above. If the test fails with `Your MySQL server does not offer TLS`, enable server TLS using `require_secure_transport` and server certificates. Alternatively, connect through an SSH tunnel.

<!-- /env:cloud -->

</FieldAnchor>

## MySQL replication modes

### Change Data Capture \(CDC\)

Airbyte logically replicates the [MySQL binlog](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html) to capture deletes, new records and updates incrementally. To learn how Airbyte implements CDC, refer to [Change Data Capture (CDC)](https://docs.airbyte.com/understanding-airbyte/cdc/). Where possible, configure your MySQL source with CDC for these benefits:

- Record deletions when needed.
- Replicate large tables of 1 TB or more.
- Use a reliable cursor that doesn't depend on your data's structure. For example, your table might have a primary key but no suitable incremental sync cursor, such as `updated_at`. CDC still lets you sync the table incrementally.

<FieldAnchor field="replication_method[STANDARD]">

### Standard

Airbyte supports incremental replication through a custom cursor in your source tables, such as `updated_at`. This method isn't generally recommended, but it suits these cases:

- Your MySQL server doesn't expose the binlog.
- Your data set is small, and you only need a table snapshot in the destination.

</FieldAnchor>

## Connect with SSL or SSH

<FieldAnchor field="ssl">

### SSL modes

Airbyte Cloud never connects to a database without encryption. The connection must use TLS/SSL or an [SSH tunnel](#connection-via-ssh-tunnel), which encrypts the connection. If your MySQL server doesn't offer TLS, enable it using `require_secure_transport` and server certificates. Alternatively, connect through an SSH tunnel. Otherwise, the connection test fails with `Your MySQL server does not offer TLS`. Self-managed Airbyte deployments can use `preferred` mode without a tunnel.

Choose from these SSL connection modes:

- `preferred` allows unencrypted communication only when the source doesn't support encryption. On Airbyte Cloud, this mode requires an SSH tunnel.
- `required` always requires encryption. The connection fails if the source doesn't support encryption. This is the default.
- `verify_ca` always requires encryption and verifies that the source has a valid SSL certificate.
- `verify_identity` always requires encryption and verifies the source's identity.

</FieldAnchor>

### Connect through an SSH tunnel

You can connect to a MySQL server through an SSH tunnel.

An SSH tunnel connects Airbyte through an intermediate server with direct database access. This server is also called a bastion or jump server. Airbyte connects to the bastion, which then connects directly to the database server.

The SSH tunnel encrypts the connection between Airbyte and the bastion. Airbyte Cloud never connects without encryption. Therefore, a tunnel is the only way to use `preferred` SSL mode with a server without TLS. It's also the only way to reach a database on `localhost` or an unexposed private network.

To connect to a MySQL server through an SSH tunnel:

1. When setting up the MySQL source connector, choose an option from the SSH tunnel dropdown:
   - SSH Key Authentication uses a private key as your secret for establishing the SSH tunnel
   - Password Authentication uses a password as your secret for establishing the SSH Tunnel
2. For **SSH Tunnel Jump Server Host**, enter the hostname or IP address of the intermediate bastion server that Airbyte connects to.
3. For **SSH Connection Port**, enter the bastion server's port. The default port for SSH connections is 22.
4. For **SSH Login Username**, enter the username used to connect to the bastion server. **Note:** Enter the operating system username, not the MySQL username.
5. For authentication:
   - If you selected **SSH Key Authentication**, set **SSH Private Key** to the [private Key](#generating-a-private-key-for-ssh-tunneling) used to create the SSH connection.
   - If you selected **Password Authentication**, enter the operating system user's password for connecting to the bastion server. **Note:** Enter the operating system password, not the MySQL password.

#### Generate a private key for SSH tunnelling

The connector requires an RSA key in PEM format. Generate the key as follows:

```text
ssh-keygen -t rsa -m PEM -f myuser_rsa
```

This creates the private key in PEM format. The public key remains in the standard format used by the `authorized_keys` file on your bastion host. Add the public key to the bastion host for the user you want Airbyte to use. Copy and paste the private key into the Airbyte connector configuration screen. This allows the connector to sign in to the bastion.

## Limitations and troubleshooting

For connector limitations and MySQL troubleshooting guidance, see [in our MySQL troubleshooting guide](/integrations/sources/mysql/mysql-troubleshooting).

## Data type mapping

MySQL data types map to the following types during synchronisation. You can check test example values in [here](https://github.com/airbytehq/airbyte/blob/master/airbyte-integrations/connectors/source-mysql/src/test/kotlin/io/airbyte/integrations/source/mysql/MySqlSourceDatatypeIntegrationTest.kt). If your required data type isn't listed, you can add a new test.
Types not listed here are converted into strings. Feedback on preferred mappings is welcome.

Every database or table encoding combination of character set and collation is supported. However, character set settings aren't transferred to the destination. Data uses the destination's configured encoding. Byte arrays aren't yet supported.

<details>
    <summary>MySQL Data Type Mapping</summary>

| MySQL Type                                | Resulting Type         | Notes                                                                                                                                                                                                                                                                                                                     |
|:------------------------------------------| :--------------------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bit(1)`                                  | boolean                |                                                                                                                                                                                                                                                                                                                           |
| `bit(>1)`                                 | base64 binary string   |                                                                                                                                                                                                                                                                                                                           |
| `boolean`                                 | boolean                |                                                                                                                                                                                                                                                                                                                           |
| `tinyint(1)`                              | boolean                | Default behavior. Enable **Treat TINYINT(1) Columns as Integers** in the source configuration to emit these columns as integers instead.                                                                                                                                                                                   |
| `tinyint(>1)`                             | integer                |                                                                                                                                                                                                                                                                                                                           |
| `tinyint(>=1) unsigned`                   | integer                |                                                                                                                                                                                                                                                                                                                           |
| `smallint`                                | integer                |                                                                                                                                                                                                                                                                                                                           |
| `mediumint`                               | integer                |                                                                                                                                                                                                                                                                                                                           |
| `int`                                     | integer                |                                                                                                                                                                                                                                                                                                                           |
| `bigint`                                  | integer                |                                                                                                                                                                                                                                                                                                                           |
| `float`                                   | number                 |                                                                                                                                                                                                                                                                                                                           |
| `double`                                  | number                 |                                                                                                                                                                                                                                                                                                                           |
| `decimal`                                 | number                 |                                                                                                                                                                                                                                                                                                                           |
| `date`                                    | string                 | ISO 8601 date string. ZERO-DATE value will be converted to NULL. In incremental syncs, convert to Unix Epoch (1970-01-01) if the column is mandatory. In CDC syncs, zero dates will be converted to null (regardless of the column nullability), or to the column's default value if one is defined.                      |
| `datetime`,                               | string                 | ISO 8601 datetime string. ZERO-DATE value will be converted to NULL. In incremental syncs, convert to Unix Epoch (1970-01-01) if the column is mandatory. In CDC syncs, zero dates will be converted to null (regardless of the column nullability), or to the column's default value if one is defined.                  |
| `timestamp`                               | string                 | ISO 8601 timestamp string. ZERO-DATE value will be converted to NULL. In incremental syncs, convert to Unix Epoch (1970-01-01) if the column is mandatory. In CDC syncs, zero timestamps are read as null during the initial snapshot and as the Unix Epoch (1970-01-01) on subsequent (binlog) syncs. |
| `time`                                    | string                 | ISO 8601 time string. Values are in range between 00:00:00 and 23:59:59.                                                                                                                                                                                                                                                  |
| `year`                                    | integer                | [Doc](https://dev.mysql.com/doc/refman/8.0/en/year.html)                                                                                                                                                                                                                                                                  |
| `char`, `varchar` with non-binary charset | string                 |                                                                                                                                                                                                                                                                                                                           |
| `tinyblob`                                | base64 binary string   |                                                                                                                                                                                                                                                                                                                           |
| `blob`                                    | base64 binary string   |                                                                                                                                                                                                                                                                                                                           |
| `mediumblob`                              | base64 binary string   |                                                                                                                                                                                                                                                                                                                           |
| `longblob`                                | base64 binary string   |                                                                                                                                                                                                                                                                                                                           |
| `binary`                                  | base64 binary string   |                                                                                                                                                                                                                                                                                                                           |
| `varbinary`                               | base64 binary string   |                                                                                                                                                                                                                                                                                                                           |
| `tinytext`                                | string                 |                                                                                                                                                                                                                                                                                                                           |
| `text`                                    | string                 |                                                                                                                                                                                                                                                                                                                           |
| `mediumtext`                              | string                 |                                                                                                                                                                                                                                                                                                                           |
| `longtext`                                | string                 |                                                                                                                                                                                                                                                                                                                           |
| `json`                                    | serialized json string | E.g. `{"a": 10, "b": 15}`                                                                                                                                                                                                                                                                                                 |
| `enum`                                    | string                 |                                                                                                                                                                                                                                                                                                                           |
| `set`                                     | string                 | E.g. `blue,green,yellow`                                                                                                                                                                                                                                                                                                  |
| `geometry`                                | base64 binary string   |                                                                                                                                                                                                                                                                                                                           |

</details>

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list. A connection test or sync failing with `Airbyte could not reach the database at the configured host and port` usually means a firewall or security group blocks these addresses.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version     | Date       | Pull Request                                               | Subject                                                                                                                                          |
|:------------|:-----------|:-----------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| 3.53.10     | 2026-10-21 | [89636](https://github.com/airbytehq/airbyte/pull/89636)   | Upgrade to Bulk CDK 1.2.3: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86; Kafka 4.1.2, Jetty 12.0.40, plexus-utils 3.6.2. |
| 3.53.9      | 2026-10-20 | [89014](https://github.com/airbytehq/airbyte/pull/89014)   | Bump Debezium to 3.4.3 (Bulk CDK 1.2.1): CDC no longer fails with `Incumbent CDC state is invalid` when the GTID set gains a new server UUID.    |
| 3.53.8      | 2026-10-12 | [88499](https://github.com/airbytehq/airbyte/pull/88499)       | Explain unreachable hosts and servers without TLS in connection errors, and document that Airbyte Cloud requires TLS or an SSH tunnel. Explain a connection test that finds no tables (missing SELECT grants, wrong database name, or a table filter that excludes every table), and retry a sync whose established MySQL connection is lost ("Communications link failure" after packets were received) instead of failing it as a configuration error. On Airbyte Cloud, reject `localhost` without an SSH tunnel and a URL or `host:port` pasted into Host with an explicit message before the connection is attempted. |
| 3.53.7      | 2026-10-09 | [88430](https://github.com/airbytehq/airbyte/pull/88430)   | Upgrade to Bulk CDK 1.1.14.                                                                                                                      |
| 3.53.6      | 2026-10-02 | [87650](https://github.com/airbytehq/airbyte/pull/87650)   | Classify MySQL EOF errors whose byte counts contain thousands separators, and the "Expected X bytes, received only Y bytes" format, as transient so syncs retry. |
| 3.53.5      | 2026-09-09 | [77840](https://github.com/airbytehq/airbyte/pull/77840)   | Fix CDC binlog client authentication when SSL `verify_ca`/`verify_identity` is configured with client certificates.                              |
| 3.53.4      | 2026-08-27 | [81413](https://github.com/airbytehq/airbyte/pull/81413)   | Retry CDC syncs that fail with an EOF error while reading the MySQL binlog instead of failing as a config error.                                 |
| 3.53.3      | 2026-08-11 | [84207](https://github.com/airbytehq/airbyte/pull/84207)   | Promote to Bulk CDK 1.1.10: fix CDC meta-field decoration of full refresh streams with no source-defined primary key in speed mode.              |
| 3.53.2      | 2026-08-06 | [83239](https://github.com/airbytehq/airbyte/pull/83239)   | Fix error 1267 (illegal mix of collations) when partitioning text primary keys with utf8mb3 or other legacy charset columns.                     |
| 3.53.1      | 2026-07-13 | [80858](https://github.com/airbytehq/airbyte/pull/80858)   | Fix CDC sync failure on non-nullable DATE/DATETIME columns when zero-dates (0000-00-00) convert to null.                                         |
| 3.53.0      | 2026-06-30 | [80950](https://github.com/airbytehq/airbyte/pull/80950)   | Promote mysql to the latest CDK                                                                                                                  |
| 3.52.3      | 2026-05-21 | [78318](https://github.com/airbytehq/airbyte/pull/78318)   | Fix the CDC docs link on the MySQL config page.                                                                                                  |
| 3.52.2      | 2026-05-12 | [77973](https://github.com/airbytehq/airbyte/pull/77973)   | Improve concurrent initial snapshot partitioning for large MySQL tables with `BIGINT UNSIGNED` primary keys.                                     |
| 3.52.1      | 2026-05-06 | [77787](https://github.com/airbytehq/airbyte/pull/77787)   | Make the hidden additional properties fields in spec optional. No functional change.                                                             |
| 3.52.0      | 2026-05-05 | [77772](https://github.com/airbytehq/airbyte/pull/77772)   | Add a `treat_tinyint1_as_integer` connector setting that maps TINYINT(1) columns to integers in both snapshot and CDC reads (default unchanged). |
| 3.51.6      | 2026-04-29 | [76050](https://github.com/airbytehq/airbyte/pull/76050)   | Handle sentinel values in GUID primary key columns during partition splitting.                                                                   |
| 3.51.5      | 2025-11-14 | [69228](https://github.com/airbytehq/airbyte/pull/69228)   | Add table filtering                                                                                                                              |
| 3.51.4      | 2025-11-12 | [69284](https://github.com/airbytehq/airbyte/pull/69284)   | Improve CDC shutdown to prevent loss of records in high velocity tables                                                                          |
| 3.51.3      | 2025-11-05 | [69177](https://github.com/airbytehq/airbyte/pull/69177)   | Fix a bug in CDC snapshot queries leading to omission of the first record in some cases.                                                         |
| 3.51.2      | 2025-11-04 | [69104](https://github.com/airbytehq/airbyte/pull/69104)   | Better partitioning for tables with GUID string primary key.                                                                                     |
| 3.51.1      | 2025-10-28 | [68652](https://github.com/airbytehq/airbyte/pull/68652)   | Bump CDK version to the latest to resolve issue with database Views in CDC mode.                                                                 |
| 3.51.0      | 2025-09-24 | [66515](https://github.com/airbytehq/airbyte/pull/66515)   | Bump to the latest CDK for improved Protobuf encoding in socket mode.                                                                            |
| 3.50.9      | 2025-09-24 | [66515](https://github.com/airbytehq/airbyte/pull/66515)   | Fix CDC decorating fields encoding to Protobuf                                                                                                   |
| 3.50.8      | 2025-09-24 | [66515](https://github.com/airbytehq/airbyte/pull/66515)   | Fix division by zero in partition creation when sampling produces no split boundaries.                                                           |
| 3.50.7      | 2025-09-11 | [66179](https://github.com/airbytehq/airbyte/pull/66179)   | Bump to the latest CDK fixing protobuf encoding of certain column types                                                                          |
| 3.50.6      | 2025-08-13 | [64569](https://github.com/airbytehq/airbyte/pull/64569)   | Moved db version logging from connector to new CDK version                                                                                       |
| 3.50.5      | 2025-07-30 | [63377](https://github.com/airbytehq/airbyte/pull/63377)   | Global state compatibility in speed mode                                                                                                         |
| 3.50.4      | 2025-07-31 | [64134](https://github.com/airbytehq/airbyte/pull/64134)   | Log db version for mysql                                                                                                                         |
| 3.50.3      | 2025-07-18 | [63349](https://github.com/airbytehq/airbyte/pull/63349)   | Make concurrency level match number of sockets in speed mode                                                                                     |
| 3.50.2      | 2025-07-17 | [62932](https://github.com/airbytehq/airbyte/pull/62932)   | CDC fixes                                                                                                                                        |
| 3.50.1-rc.1 | 2025-07-08 | [62862](https://github.com/airbytehq/airbyte/pull/62862)   | Prepare to enable speed improvements                                                                                                             |
| 3.50.0      | 2025-07-08 | [62863](https://github.com/airbytehq/airbyte/pull/62863)   | Promoting release candidate 3.50.0-rc.1 to a main version.                                                                                       |
| 3.50.0-rc.1 | 2025-07-08 | [60993](https://github.com/airbytehq/airbyte/pull/60993)   | Prepare to enable speed improvements                                                                                                             |
| 3.12.0      | 2025-06-26 | [60993](https://github.com/airbytehq/airbyte/pull/60993)   | Boosted Mode                                                                                                                                     |
| 3.11.21     | 2025-05-30 | [61014](https://github.com/airbytehq/airbyte/pull/61014)   | Fix merge error. Point to a published CDK                                                                                                        |
| 3.11.20     | 2025-05-29 | [60218](https://github.com/airbytehq/airbyte/pull/60218)   | Testing concurrent read.                                                                                                                         |
| 3.11.19     | 2025-05-11 | [60214](https://github.com/airbytehq/airbyte/pull/60214)   | Migrate to new Gradle flow.                                                                                                                      |
| 3.11.18     | 2025-05-02 | [59732](https://github.com/airbytehq/airbyte/pull/59732)   | Fix a bug that caused the sync to go into a loop in some cases.                                                                                  |
| 3.11.17     | 2025-05-02 | [59683](https://github.com/airbytehq/airbyte/pull/59683)   | CDK version bump.                                                                                                                                |
| 3.11.16     | 2025-05-02 | [59223](https://github.com/airbytehq/airbyte/pull/59223)   | Improve handling of big int and decimal values preventing it from represented with scientific notation                                           |
| 3.11.15     | 2025-04-29 | [59150](https://github.com/airbytehq/airbyte/pull/59150)   | Mitigate issue where cursor state was serialized with scientific notation                                                                        |
| 3.11.14     | 2025-04-29 | [59144](https://github.com/airbytehq/airbyte/pull/59144)   | Update default SSL mode.                                                                                                                         |
| 3.11.13     | 2025-04-24 | [58646](https://github.com/airbytehq/airbyte/pull/58646)   | Fix vulnerabilities in dependencies.                                                                                                             |
| 3.11.12     | 2025-04-18 | [58132](https://github.com/airbytehq/airbyte/pull/58132)   | Fix vulnerabilities in dependencies.                                                                                                             |
| 3.11.11     | 2025-04-23 | [58623](https://github.com/airbytehq/airbyte/pull/58623)   | Bump CDK version to the latets published                                                                                                         |
| 3.11.10     | 2025-04-22 | [58599](https://github.com/airbytehq/airbyte/pull/58599)   | Extend debezium shutdown timeout to allow the engine to gracefully close                                                                         |
| 3.11.9      | 2025-03-14 | [55731](https://github.com/airbytehq/airbyte/pull/55731)   | More meaningful errors for variables used in extra checks for CDC                                                                                |
| 3.11.8      | 2025-03-14 | [55761](https://github.com/airbytehq/airbyte/pull/55761)   | Do not perform complex sampling for source-mysql                                                                                                 |
| 3.11.7      | 2025-03-12 | [55734](https://github.com/airbytehq/airbyte/pull/55734)   | Expose additional stream context for debezium properties at startup                                                                              |
| 3.11.6      | 2025-03-06 | [55237](https://github.com/airbytehq/airbyte/pull/55237)   | [Fix fetching binlog status for version >=8.4](https://github.com/airbytehq/airbyte/pull/55237#top)                                              |
| 3.11.5      | 2025-03-06 | [55234](https://github.com/airbytehq/airbyte/pull/55234)   | Update base image version for certified DB source connectors                                                                                     |
| 3.11.4      | 2025-03-06 | [55214](https://github.com/airbytehq/airbyte/pull/55214)   | Update default encryption method to 'required'.                                                                                                  |
| 3.11.3      | 2025-02-24 | [54156](https://github.com/airbytehq/airbyte/pull/54156)   | Improve error handling.                                                                                                                          |
| 3.11.2      | 2025-02-06 | [53195](https://github.com/airbytehq/airbyte/pull/53195)   | Fix typo in CDC configuration.                                                                                                                   |
| 3.11.1      | 2025-01-30 | [52039](https://github.com/airbytehq/airbyte/pull/52039)   | Adopt latest API changes from Bulk CDK.                                                                                                          |
| 3.11.0      | 2025-01-14 | [51545](https://github.com/airbytehq/airbyte/pull/51545)   | Promoting release candidate 3.11.0-rc.1 to a main version.                                                                                       |
| 3.11.0-rc.1 | 2025-01-09 | [51029](https://github.com/airbytehq/airbyte/pull/51029)   | Fix unnecessary schema change when upgrading from legacy mysql source.                                                                           |
| 3.10.1      | 2025-01-10 | [51510](https://github.com/airbytehq/airbyte/pull/51510)   | Use a non root base image                                                                                                                        |
| 3.10.0      | 2025-01-09 | [51008](https://github.com/airbytehq/airbyte/pull/51008)   | Promoting release candidate 3.10.0-rc.9 to a main version.                                                                                       |
| 3.10.0-rc.9 | 2025-01-08 | [50987](https://github.com/airbytehq/airbyte/pull/50987)   | Increase Debezium shutdown timeout.                                                                                                              |
| 3.10.0-rc.8 | 2025-01-07 | [50965](https://github.com/airbytehq/airbyte/pull/50965)   | Fix bug introduced in 3.10.0-rc.3.                                                                                                               |
| 3.10.0-rc.7 | 2024-12-27 | [50437](https://github.com/airbytehq/airbyte/pull/50437)   | Compatibility with MySQL Views.                                                                                                                  |
| 3.10.0-rc.6 | 2024-12-18 | [49892](https://github.com/airbytehq/airbyte/pull/49892)   | Use a base image: airbyte/java-connector-base:1.0.0                                                                                              |
| 3.10.0-rc.5 | 2025-01-03 | [50868](https://github.com/airbytehq/airbyte/pull/50868)   | Fix exception handling rules declaration.                                                                                                        |
| 3.10.0-rc.4 | 2024-12-23 | [48587](https://github.com/airbytehq/airbyte/pull/48587)   | Fix minor state counting mechanism.                                                                                                              |
| 3.10.0-rc.3 | 2024-12-20 | [49918](https://github.com/airbytehq/airbyte/pull/49918)   | Fix minor datatype handling and conversion bugs, maintain big number precision.                                                                  |
| 3.10.0-rc.2 | 2024-12-20 | [49950](https://github.com/airbytehq/airbyte/pull/49950)   | Remove unused configuration field, streamline SSL certificate key store logic.                                                                   |
| 3.10.0-rc.1 | 2024-12-20 | [49948](https://github.com/airbytehq/airbyte/pull/49948)   | Pin Bulk CDK version to 231, adopt required changes.                                                                                             |
| 3.9.4       | 2024-12-18 | [49939](https://github.com/airbytehq/airbyte/pull/49939)   | Pin Bulk CDK version to 226, rename classes.                                                                                                     |
| 3.9.3       | 2024-12-18 | [49932](https://github.com/airbytehq/airbyte/pull/49932)   | Backward compatibility for saved states with timestamp that include timezone offset.                                                             |
| 3.9.2       | 2024-12-16 | [49830](https://github.com/airbytehq/airbyte/pull/49830)   | Fixes an issue with auto generated tinyint columns                                                                                               |
| 3.9.1       | 2024-12-12 | [49456](https://github.com/airbytehq/airbyte/pull/49456)   | Bump version to re-relase                                                                                                                        |
| 3.9.0       | 2024-12-12 | [49423](https://github.com/airbytehq/airbyte/pull/49423)   | Promoting release candidate 3.9.0-rc.27 to a main version.                                                                                       |
| 3.9.0-rc    | 2024-11-05 | [48369](https://github.com/airbytehq/airbyte/pull/48369)   | Progressive rollout test.                                                                                                                        |
| 3.7.3       | 2024-09-17 | [45639](https://github.com/airbytehq/airbyte/pull/45639)   | Adopt latest CDK to use the latest apache sshd mina to handle tcpkeepalive requests.                                                             |
| 3.7.2       | 2024-09-05 | [45181](https://github.com/airbytehq/airbyte/pull/45181)   | Fix incorrect categorizing resumable/nonresumable full refresh streams.                                                                          |
| 3.7.1       | 2024-08-27 | [44841](https://github.com/airbytehq/airbyte/pull/44841)   | Adopt latest CDK.                                                                                                                                |
| 3.7.0       | 2024-08-13 | [44013](https://github.com/airbytehq/airbyte/pull/44013)   | Upgrading to Debezium 2.7.1.Final                                                                                                                |
| 3.6.9       | 2024-08-08 | [43410](https://github.com/airbytehq/airbyte/pull/43410)   | Adopt latest CDK.                                                                                                                                |
| 3.6.8       | 2024-07-30 | [42869](https://github.com/airbytehq/airbyte/pull/42869)   | Adopt latest CDK.                                                                                                                                |
| 3.6.7       | 2024-07-30 | [42550](https://github.com/airbytehq/airbyte/pull/42550)   | Correctly report stream states.                                                                                                                  |
| 3.6.6       | 2024-07-29 | [42852](https://github.com/airbytehq/airbyte/pull/42852)   | Bump CDK version to latest to use new bug fixes on error translation.                                                                            |
| 3.6.5       | 2024-07-24 | [42417](https://github.com/airbytehq/airbyte/pull/42417)   | Handle null error message in ConnectorExceptionHandler.                                                                                          |
| 3.6.4       | 2024-07-23 | [42421](https://github.com/airbytehq/airbyte/pull/42421)   | Remove final transient error emitter iterators.                                                                                                  |
| 3.6.3       | 2024-07-22 | [42024](https://github.com/airbytehq/airbyte/pull/42024)   | Fix a NPE bug on resuming from a failed attempt.                                                                                                 |
| 3.6.2       | 2024-07-17 | [42087](https://github.com/airbytehq/airbyte/pull/42087)   | Adding more error translations for MySql source.                                                                                                 |
| 3.6.1       | 2024-07-19 | [42122](https://github.com/airbytehq/airbyte/pull/42122)   | Improve wass error message + logging.                                                                                                            |
| 3.6.0       | 2024-07-17 | [40208](https://github.com/airbytehq/airbyte/pull/40208)   | Start using the new error MySql source error handler that comes with a new error translation layer.                                              |
| 3.5.1       | 2024-07-17 | [42043](https://github.com/airbytehq/airbyte/pull/42043)   | Adopt latest CDK + fixes.                                                                                                                        |
| 3.5.0       | 2024-07-11 | [38240](https://github.com/airbytehq/airbyte/pull/38240)   | Implement WASS.                                                                                                                                  |
| 3.4.12      | 2024-07-01 | [40516](https://github.com/airbytehq/airbyte/pull/40516)   | Remove dbz heartbeat.                                                                                                                            |
| 3.4.11      | 2024-06-26 | [40561](https://github.com/airbytehq/airbyte/pull/40561)   | Support PlanetScale MySQL's per-query row limit.                                                                                                 |
| 3.4.10      | 2024-06-14 | [39349](https://github.com/airbytehq/airbyte/pull/39349)   | Full refresh stream sending internal count metadata.                                                                                             |
| 3.4.9       | 2024-06-11 | [39405](https://github.com/airbytehq/airbyte/pull/39405)   | Adopt latest CDK.                                                                                                                                |
| 3.4.8       | 2024-06-05 | [39144](https://github.com/airbytehq/airbyte/pull/39144)   | Upgrade Debezium to 2.5.4                                                                                                                        |
| 3.4.7       | 2024-05-29 | [38584](https://github.com/airbytehq/airbyte/pull/38584)   | Set is_resumable flag in discover.                                                                                                               |
| 3.4.6       | 2024-05-29 | [38538](https://github.com/airbytehq/airbyte/pull/38538)   | Exit connector when encountering a config error.                                                                                                 |
| 3.4.5       | 2024-05-23 | [38198](https://github.com/airbytehq/airbyte/pull/38198)   | Sync sending trace status messages indicating progress.                                                                                          |
| 3.4.4       | 2024-05-15 | [38208](https://github.com/airbytehq/airbyte/pull/38208)   | disable counts in full refresh stream in state message.                                                                                          |
| 3.4.3       | 2024-05-13 | [38104](https://github.com/airbytehq/airbyte/pull/38104)   | Handle transient error messages.                                                                                                                 |
| 3.4.2       | 2024-05-07 | [38046](https://github.com/airbytehq/airbyte/pull/38046)   | Resumeable refresh should run only if there is source defined pk.                                                                                |
| 3.4.1       | 2024-05-03 | [37824](https://github.com/airbytehq/airbyte/pull/37824)   | Fixed a bug on Resumeable full refresh where cursor based source throw NPE.                                                                      |
| 3.4.0       | 2024-05-02 | [36932](https://github.com/airbytehq/airbyte/pull/36932)   | Resumeable full refresh. Note please upgrade your platform - minimum platform version is 0.58.0.                                                 |
| 3.3.25      | 2024-05-02 | [37781](https://github.com/airbytehq/airbyte/pull/37781)   | Adopt latest CDK.                                                                                                                                |
| 3.3.24      | 2024-05-01 | [37742](https://github.com/airbytehq/airbyte/pull/37742)   | Adopt latest CDK. Remove Debezium retries.                                                                                                       |
| 3.3.23      | 2024-04-23 | [37507](https://github.com/airbytehq/airbyte/pull/37507)   | Better errors when user switches from CDC to non-CDC mode.                                                                                       |
| 3.3.22      | 2024-04-22 | [37541](https://github.com/airbytehq/airbyte/pull/37541)   | Adopt latest CDK. reduce excessive logs.                                                                                                         |
| 3.3.21      | 2024-04-22 | [37476](https://github.com/airbytehq/airbyte/pull/37476)   | Adopt latest CDK.                                                                                                                                |
| 3.3.20      | 2024-04-16 | [37111](https://github.com/airbytehq/airbyte/pull/37111)   | Populate null values in record message.                                                                                                          |
| 3.3.19      | 2024-04-15 | [37328](https://github.com/airbytehq/airbyte/pull/37328)   | Populate airbyte_meta.changes                                                                                                                    |
| 3.3.18      | 2024-04-15 | [37324](https://github.com/airbytehq/airbyte/pull/37324)   | Refactor source operations.                                                                                                                      |
| 3.3.17      | 2024-04-10 | [36919](https://github.com/airbytehq/airbyte/pull/36919)   | Fix a bug in conversion of null values.                                                                                                          |
| 3.3.16      | 2024-04-05 | [36872](https://github.com/airbytehq/airbyte/pull/36872)   | Update to connector's metadat definition.                                                                                                        |
| 3.3.15      | 2024-04-05 | [36577](https://github.com/airbytehq/airbyte/pull/36577)   | Config error will not send out system trace message                                                                                              |
| 3.3.14      | 2024-04-04 | [36742](https://github.com/airbytehq/airbyte/pull/36742)   | To use new kotlin CDK                                                                                                                            |
| 3.3.13      | 2024-02-29 | [35529](https://github.com/airbytehq/airbyte/pull/35529)   | Refactor state iterator messages.                                                                                                                |
| 3.3.12      | 2024-02-27 | [35675](https://github.com/airbytehq/airbyte/pull/35675)   | Fix invalid cdc error message.                                                                                                                   |
| 3.3.11      | 2024-02-23 | [35527](https://github.com/airbytehq/airbyte/pull/35527)   | Adopt 0.23.1 and shutdown timeouts.                                                                                                              |
| 3.3.10      | 2024-02-22 | [35569](https://github.com/airbytehq/airbyte/pull/35569)   | Fix logging bug.                                                                                                                                 |
| 3.3.9       | 2024-02-21 | [35338](https://github.com/airbytehq/airbyte/pull/35338)   | Adopt 0.21.4 and reduce cdc state compression threshold to 1MB.                                                                                  |
| 3.3.8       | 2024-02-20 | [35338](https://github.com/airbytehq/airbyte/pull/35338)   | Add config to throw an error on invalid CDC position.                                                                                            |
| 3.3.7       | 2024-02-13 | [34751](https://github.com/airbytehq/airbyte/pull/34751)   | Emit analytics message for invalid CDC cursor.                                                                                                   |
| 3.3.6       | 2024-02-13 | [34573](https://github.com/airbytehq/airbyte/pull/34573)   | Don't emit state in SourceStateIterator when there is an underlying stream failure.                                                              |
| 3.3.5       | 2024-02-12 | [34580](https://github.com/airbytehq/airbyte/pull/34580)   | Support special chars in db name                                                                                                                 |
| 3.3.4       | 2024-02-08 | [34750](https://github.com/airbytehq/airbyte/pull/34750)   | Adopt CDK 0.19.0                                                                                                                                 |
| 3.3.3       | 2024-01-26 | [34573](https://github.com/airbytehq/airbyte/pull/34573)   | Adopt CDK v0.16.0.                                                                                                                               |
| 3.3.2       | 2024-01-08 | [33005](https://github.com/airbytehq/airbyte/pull/33005)   | Adding count stats for incremental sync in AirbyteStateMessage                                                                                   |
| 3.3.1       | 2024-01-03 | [33312](https://github.com/airbytehq/airbyte/pull/33312)   | Adding count stats in AirbyteStateMessage                                                                                                        |
| 3.3.0       | 2023-12-19 | [33436](https://github.com/airbytehq/airbyte/pull/33436)   | Remove LEGACY state flag                                                                                                                         |
| 3.2.4       | 2023-12-12 | [33210](https://github.com/airbytehq/airbyte/pull/33210)   | Support for better debugging tools..                                                                                                             |
| 3.2.3       | 2023-12-08 | [33210](https://github.com/airbytehq/airbyte/pull/33210)   | Update MySql driver property value for zero date handling.                                                                                       |
| 3.2.2       | 2023-12-06 | [33082](https://github.com/airbytehq/airbyte/pull/33082)   | Improvements to MySQL schema snapshot error handling.                                                                                            |
| 3.2.1       | 2023-11-28 | [32610](https://github.com/airbytehq/airbyte/pull/32610)   | Support initial syncs using binary as primary key.                                                                                               |
| 3.2.0       | 2023-11-29 | [31062](https://github.com/airbytehq/airbyte/pull/31062)   | enforce SSL on Airbyte Cloud                                                                                                                     |
| 3.1.9       | 2023-11-27 | [32662](https://github.com/airbytehq/airbyte/pull/32662)   | Apply initial setup time to debezium engine warmup time.                                                                                         |
| 3.1.8       | 2023-11-22 | [32656](https://github.com/airbytehq/airbyte/pull/32656)   | Adopt java CDK version 0.5.0.                                                                                                                    |
| 3.1.7       | 2023-11-08 | [32125](https://github.com/airbytehq/airbyte/pull/32125)   | fix compilation warnings                                                                                                                         |
| 3.1.6       | 2023-11-06 | [32193](https://github.com/airbytehq/airbyte/pull/32193)   | Adopt java CDK version 0.4.1.                                                                                                                    |
| 3.1.5       | 2023-10-31 | [32024](https://github.com/airbytehq/airbyte/pull/32024)   | Upgrade to Debezium version 2.4.0.                                                                                                               |
| 3.1.4       | 2023-10-30 | [31960](https://github.com/airbytehq/airbyte/pull/31960)   | Adopt java CDK version 0.2.0.                                                                                                                    |
| 3.1.3       | 2023-10-11 | [31322](https://github.com/airbytehq/airbyte/pull/31322)   | Correct pevious release                                                                                                                          |
| 3.1.2       | 2023-09-29 | [30806](https://github.com/airbytehq/airbyte/pull/30806)   | Cap log line length to 32KB to prevent loss of records                                                                                           |
| 3.1.1       | 2023-09-26 | [30744](https://github.com/airbytehq/airbyte/pull/30744)   | Update MySQL JDBC connection configs to keep default auto-commit behavior                                                                        |
| 3.1.0       | 2023-09-21 | [30270](https://github.com/airbytehq/airbyte/pull/30270)   | Enhanced Standard Sync with initial load via Primary Key with a switch to cursor for incremental syncs                                           |
| 3.0.9       | 2023-09-20 | [30620](https://github.com/airbytehq/airbyte/pull/30620)   | Airbyte Certified MySQL Source connector                                                                                                         |
| 3.0.8       | 2023-09-14 | [30333](https://github.com/airbytehq/airbyte/pull/30333)   | CDC : Update the correct timezone parameter passed to Debezium to `database.connectionTimezone`                                                  |
| 3.0.7       | 2023-09-13 | [30375](https://github.com/airbytehq/airbyte/pull/30375)   | Fix a bug causing a failure when DB views are included in sync                                                                                   |
| 3.0.6       | 2023-09-12 | [30308](https://github.com/airbytehq/airbyte/pull/30308)   | CDC : Enable compression of schema history blob in state                                                                                         |
| 3.0.5       | 2023-09-12 | [30289](https://github.com/airbytehq/airbyte/pull/30289)   | CDC : Introduce logic for compression of schema history blob in state                                                                            |
| 3.0.4       | 2023-09-06 | [30213](https://github.com/airbytehq/airbyte/pull/30213)   | CDC : Checkpointable initial snapshot                                                                                                            |
| 3.0.3       | 2023-08-31 | [29821](https://github.com/airbytehq/airbyte/pull/29821)   | Set replication_method display_type to radio                                                                                                     |
| 3.0.2       | 2023-08-30 | [30015](https://github.com/airbytehq/airbyte/pull/30015)   | Logging : Log storage engines associated with tables in the sync                                                                                 |
| 3.0.1       | 2023-08-21 | [29308](https://github.com/airbytehq/airbyte/pull/29308)   | CDC: Enable frequent state emissions during incremental runs                                                                                     |
| 3.0.0       | 2023-08-08 | [28756](https://github.com/airbytehq/airbyte/pull/28756)   | CDC: Set a default cursor                                                                                                                        |
| 2.1.2       | 2023-08-08 | [29220](https://github.com/airbytehq/airbyte/pull/29220)   | Add indicator that CDC is the recommended update method                                                                                          |
| 2.1.1       | 2023-07-31 | [28882](https://github.com/airbytehq/airbyte/pull/28882)   | Improve replication method labels and descriptions                                                                                               |
| 2.1.0       | 2023-06-26 | [27737](https://github.com/airbytehq/airbyte/pull/27737)   | License Update: Elv2                                                                                                                             |
| 2.0.25      | 2023-06-20 | [27212](https://github.com/airbytehq/airbyte/pull/27212)   | Fix silent exception swallowing in StreamingJdbcDatabase                                                                                         |
| 2.0.24      | 2023-05-25 | [26473](https://github.com/airbytehq/airbyte/pull/26473)   | CDC : Limit queue size                                                                                                                           |
| 2.0.23      | 2023-05-24 | [25586](https://github.com/airbytehq/airbyte/pull/25586)   | No need to base64 encode strings on databases sorted with binary collation                                                                       |
| 2.0.22      | 2023-05-22 | [25859](https://github.com/airbytehq/airbyte/pull/25859)   | Allow adding sessionVariables JDBC parameters                                                                                                    |
| 2.0.21      | 2023-05-10 | [25460](https://github.com/airbytehq/airbyte/pull/25460)   | Handle a decimal number with 0 decimal points as an integer                                                                                      |
| 2.0.20      | 2023-05-01 | [25740](https://github.com/airbytehq/airbyte/pull/25740)   | Disable index logging                                                                                                                            |
| 2.0.19      | 2023-04-26 | [25401](https://github.com/airbytehq/airbyte/pull/25401)   | CDC : Upgrade Debezium to version 2.2.0                                                                                                          |
| 2.0.18      | 2023-04-19 | [25345](https://github.com/airbytehq/airbyte/pull/25345)   | Logging : Log database indexes per stream                                                                                                        |
| 2.0.17      | 2023-04-19 | [24582](https://github.com/airbytehq/airbyte/pull/24582)   | CDC : refactor for performance improvement                                                                                                       |
| 2.0.16      | 2023-04-17 | [25220](https://github.com/airbytehq/airbyte/pull/25220)   | Logging changes : Log additional metadata & clean up noisy logs                                                                                  |
| 2.0.15      | 2023-04-12 | [25131](https://github.com/airbytehq/airbyte/pull/25131)   | Make Client Certificate and Client Key always show                                                                                               |
| 2.0.14      | 2023-04-11 | [24656](https://github.com/airbytehq/airbyte/pull/24656)   | CDC minor refactor                                                                                                                               |
| 2.0.13      | 2023-04-06 | [24820](https://github.com/airbytehq/airbyte/pull/24820)   | Fix data loss bug during an initial failed non-CDC incremental sync                                                                              |
| 2.0.12      | 2023-04-04 | [24833](https://github.com/airbytehq/airbyte/pull/24833)   | Fix Debezium retry policy configuration                                                                                                          |
| 2.0.11      | 2023-03-28 | [24166](https://github.com/airbytehq/airbyte/pull/24166)   | Fix InterruptedException bug during Debezium shutdown                                                                                            |
| 2.0.10      | 2023-03-27 | [24373](https://github.com/airbytehq/airbyte/pull/24373)   | Preparing the connector for CDC checkpointing                                                                                                    |
| 2.0.9       | 2023-03-24 | [24529](https://github.com/airbytehq/airbyte/pull/24529)   | Set SSL Mode to required on strict-encrypt variant                                                                                               |
| 2.0.8       | 2023-03-22 | [20760](https://github.com/airbytehq/airbyte/pull/20760)   | Removed redundant date-time datatypes formatting                                                                                                 |
| 2.0.7       | 2023-03-21 | [24207](https://github.com/airbytehq/airbyte/pull/24207)   | Fix incorrect schema change warning in CDC mode                                                                                                  |
| 2.0.6       | 2023-03-21 | [23984](https://github.com/airbytehq/airbyte/pull/23984)   | Support CDC heartbeats                                                                                                                           |
| 2.0.5       | 2023-03-21 | [24275](https://github.com/airbytehq/airbyte/pull/24275)   | Fix error with CDC checkpointing                                                                                                                 |
| 2.0.4       | 2023-03-20 | [24147](https://github.com/airbytehq/airbyte/pull/24147)   | Support different table structure during "DESCRIBE" query                                                                                        |
| 2.0.3       | 2023-03-15 | [24082](https://github.com/airbytehq/airbyte/pull/24082)   | Fixed NPE during cursor values validation                                                                                                        |
| 2.0.2       | 2023-03-14 | [23908](https://github.com/airbytehq/airbyte/pull/23908)   | Log warning on null cursor values                                                                                                                |
| 2.0.1       | 2023-03-10 | [23939](https://github.com/airbytehq/airbyte/pull/23939)   | For network isolation, source connector accepts a list of hosts it is allowed to connect                                                         |
| 2.0.0       | 2023-03-06 | [23112](https://github.com/airbytehq/airbyte/pull/23112)   | Upgrade Debezium version to 2.1.2                                                                                                                |
| 1.0.21      | 2023-01-25 | [20939](https://github.com/airbytehq/airbyte/pull/20939)   | Adjust batch selection memory limits databases.                                                                                                  |
| 1.0.20      | 2023-01-24 | [20593](https://github.com/airbytehq/airbyte/pull/20593)   | Handle ssh time out exception                                                                                                                    |
| 1.0.19      | 2022-12-14 | [20346](https://github.com/airbytehq/airbyte/pull/20346)   | Consolidate date/time values mapping for JDBC sources                                                                                            |
| 1.0.18      | 2022-12-14 | [20378](https://github.com/airbytehq/airbyte/pull/20378)   | Improve descriptions                                                                                                                             |
| 1.0.17      | 2022-12-13 | [20289](https://github.com/airbytehq/airbyte/pull/20289)   | Mark unknown column exception as config error                                                                                                    |
| 1.0.16      | 2022-12-12 | [18959](https://github.com/airbytehq/airbyte/pull/18959)   | CDC : Don't timeout if snapshot is not complete.                                                                                                 |
| 1.0.15      | 2022-12-06 | [20000](https://github.com/airbytehq/airbyte/pull/20000)   | Add check and better messaging when user does not have permission to access binary log in CDC mode                                               |
| 1.0.14      | 2022-11-22 | [19514](https://github.com/airbytehq/airbyte/pull/19514)   | Adjust batch selection memory limits databases.                                                                                                  |
| 1.0.13      | 2022-11-14 | [18956](https://github.com/airbytehq/airbyte/pull/18956)   | Clean up Tinyint Unsigned data type identification                                                                                               |
| 1.0.12      | 2022-11-07 | [19025](https://github.com/airbytehq/airbyte/pull/19025)   | Stop enforce SSL if ssl mode is disabled                                                                                                         |
| 1.0.11      | 2022-11-03 | [18851](https://github.com/airbytehq/airbyte/pull/18851)   | Fix bug with unencrypted CDC connections                                                                                                         |
| 1.0.10      | 2022-11-02 | [18619](https://github.com/airbytehq/airbyte/pull/18619)   | Fix bug with handling Tinyint(1) Unsigned values as boolean                                                                                      |
| 1.0.9       | 2022-10-31 | [18538](https://github.com/airbytehq/airbyte/pull/18538)   | Encode database name                                                                                                                             |
| 1.0.8       | 2022-10-25 | [18383](https://github.com/airbytehq/airbyte/pull/18383)   | Better SSH error handling + messages                                                                                                             |
| 1.0.7       | 2022-10-21 | [18263](https://github.com/airbytehq/airbyte/pull/18263)   | Fixes bug introduced in [15833](https://github.com/airbytehq/airbyte/pull/15833) and adds better error messaging for SSH tunnel in Destinations  |
| 1.0.6       | 2022-10-19 | [18087](https://github.com/airbytehq/airbyte/pull/18087)   | Better error messaging for configuration errors (SSH configs, choosing an invalid cursor)                                                        |
| 1.0.5       | 2022-10-17 | [18041](https://github.com/airbytehq/airbyte/pull/18041)   | Fixes bug introduced 2022-09-12 with SshTunnel, handles iterator exception properly                                                              |
|             | 2022-10-13 | [15535](https://github.com/airbytehq/airbyte/pull/16238)   | Update incremental query to avoid data missing when new data is inserted at the same time as a sync starts under non-CDC incremental mode        |
| 1.0.4       | 2022-10-11 | [17815](https://github.com/airbytehq/airbyte/pull/17815)   | Expose setting server timezone for CDC syncs                                                                                                     |
| 1.0.3       | 2022-10-07 | [17236](https://github.com/airbytehq/airbyte/pull/17236)   | Fix large table issue by fetch size                                                                                                              |
| 1.0.2       | 2022-10-03 | [17170](https://github.com/airbytehq/airbyte/pull/17170)   | Make initial CDC waiting time configurable                                                                                                       |
| 1.0.1       | 2022-10-01 | [17459](https://github.com/airbytehq/airbyte/pull/17459)   | Upgrade debezium version to 1.9.6 from 1.9.2                                                                                                     |
| 1.0.0       | 2022-09-27 | [17164](https://github.com/airbytehq/airbyte/pull/17164)   | Certify MySQL Source as Beta                                                                                                                     |
| 0.6.15      | 2022-09-27 | [17299](https://github.com/airbytehq/airbyte/pull/17299)   | Improve error handling for strict-encrypt mysql source                                                                                           |
| 0.6.14      | 2022-09-26 | [16954](https://github.com/airbytehq/airbyte/pull/16954)   | Implement support for snapshot of new tables in CDC mode                                                                                         |
| 0.6.13      | 2022-09-14 | [15668](https://github.com/airbytehq/airbyte/pull/15668)   | Wrap logs in AirbyteLogMessage                                                                                                                   |
| 0.6.12      | 2022-09-13 | [16657](https://github.com/airbytehq/airbyte/pull/16657)   | Improve CDC record queueing performance                                                                                                          |
| 0.6.11      | 2022-09-08 | [16202](https://github.com/airbytehq/airbyte/pull/16202)   | Adds error messaging factory to UI                                                                                                               |
| 0.6.10      | 2022-09-08 | [16007](https://github.com/airbytehq/airbyte/pull/16007)   | Implement per stream state support.                                                                                                              |
| 0.6.9       | 2022-09-03 | [16216](https://github.com/airbytehq/airbyte/pull/16216)   | Standardize spec for CDC replication. See upgrade instructions [above](#upgrading-from-0.6.8-and-older-versions-to-0.6.9-and-later-versions).    |
| 0.6.8       | 2022-09-01 | [16259](https://github.com/airbytehq/airbyte/pull/16259)   | Emit state messages more frequently                                                                                                              |
| 0.6.7       | 2022-08-30 | [16114](https://github.com/airbytehq/airbyte/pull/16114)   | Prevent traffic going on an unsecured channel in strict-encryption version of source mysql                                                       |
| 0.6.6       | 2022-08-25 | [15993](https://github.com/airbytehq/airbyte/pull/15993)   | Improved support for connecting over SSL                                                                                                         |
| 0.6.5       | 2022-08-25 | [15917](https://github.com/airbytehq/airbyte/pull/15917)   | Fix temporal data type default value bug                                                                                                         |
| 0.6.4       | 2022-08-18 | [14356](https://github.com/airbytehq/airbyte/pull/14356)   | DB Sources: only show a table can sync incrementally if at least one column can be used as a cursor field                                        |
| 0.6.3       | 2022-08-12 | [15044](https://github.com/airbytehq/airbyte/pull/15044)   | Added the ability to connect using different SSL modes and SSL certificates                                                                      |
| 0.6.2       | 2022-08-11 | [15538](https://github.com/airbytehq/airbyte/pull/15538)   | Allow additional properties in db stream state                                                                                                   |
| 0.6.1       | 2022-08-02 | [14801](https://github.com/airbytehq/airbyte/pull/14801)   | Fix multiple log bindings                                                                                                                        |
| 0.6.0       | 2022-07-26 | [14362](https://github.com/airbytehq/airbyte/pull/14362)   | Integral columns are now discovered as int64 fields.                                                                                             |
| 0.5.17      | 2022-07-22 | [14714](https://github.com/airbytehq/airbyte/pull/14714)   | Clarified error message when invalid cursor column selected                                                                                      |
| 0.5.16      | 2022-07-14 | [14574](https://github.com/airbytehq/airbyte/pull/14574)   | Removed additionalProperties:false from JDBC source connectors                                                                                   |
| 0.5.15      | 2022-06-23 | [14077](https://github.com/airbytehq/airbyte/pull/14077)   | Use the new state management                                                                                                                     |
| 0.5.13      | 2022-06-21 | [13945](https://github.com/airbytehq/airbyte/pull/13945)   | Aligned datatype test                                                                                                                            |
| 0.5.12      | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864)   | Updated stacktrace format for any trace message errors                                                                                           |
| 0.5.11      | 2022-05-03 | [12544](https://github.com/airbytehq/airbyte/pull/12544)   | Prevent source from hanging under certain circumstances by adding a watcher for orphaned threads.                                                |
| 0.5.10      | 2022-04-29 | [12480](https://github.com/airbytehq/airbyte/pull/12480)   | Query tables with adaptive fetch size to optimize JDBC memory consumption                                                                        |
| 0.5.9       | 2022-04-06 | [11729](https://github.com/airbytehq/airbyte/pull/11729)   | Bump mina-sshd from 2.7.0 to 2.8.0                                                                                                               |
| 0.5.6       | 2022-02-21 | [10242](https://github.com/airbytehq/airbyte/pull/10242)   | Fixed cursor for old connectors that use non-microsecond format. Now connectors work with both formats                                           |
| 0.5.5       | 2022-02-18 | [10242](https://github.com/airbytehq/airbyte/pull/10242)   | Updated timestamp transformation with microseconds                                                                                               |
| 0.5.4       | 2022-02-11 | [10251](https://github.com/airbytehq/airbyte/issues/10251) | bug Source MySQL CDC: sync failed when has Zero-date value in mandatory column                                                                   |
| 0.5.2       | 2021-12-14 | [6425](https://github.com/airbytehq/airbyte/issues/6425)   | MySQL CDC sync fails because starting binlog position not found in DB                                                                            |
| 0.5.1       | 2021-12-13 | [8582](https://github.com/airbytehq/airbyte/pull/8582)     | Update connector fields title/description                                                                                                        |
| 0.5.0       | 2021-12-11 | [7970](https://github.com/airbytehq/airbyte/pull/7970)     | Support all MySQL types                                                                                                                          |
| 0.4.13      | 2021-12-03 | [8335](https://github.com/airbytehq/airbyte/pull/8335)     | Source-MySql: do not check cdc required param binlog_row_image for standard replication                                                          |
| 0.4.12      | 2021-12-01 | [8371](https://github.com/airbytehq/airbyte/pull/8371)     | Fixed incorrect handling "\n" in ssh key                                                                                                         |
| 0.4.11      | 2021-11-19 | [8047](https://github.com/airbytehq/airbyte/pull/8047)     | Source MySQL: transform binary data base64 format                                                                                                |
| 0.4.10      | 2021-11-15 | [7820](https://github.com/airbytehq/airbyte/pull/7820)     | Added basic performance test                                                                                                                     |
| 0.4.9       | 2021-11-02 | [7559](https://github.com/airbytehq/airbyte/pull/7559)     | Correctly process large unsigned short integer values which may fall outside java's `Short` data type capability                                 |
| 0.4.8       | 2021-09-16 | [6093](https://github.com/airbytehq/airbyte/pull/6093)     | Improve reliability of processing various data types like decimals, dates, datetime, binary, and text                                            |
| 0.4.7       | 2021-09-30 | [6585](https://github.com/airbytehq/airbyte/pull/6585)     | Improved SSH Tunnel key generation steps                                                                                                         |
| 0.4.6       | 2021-09-29 | [6510](https://github.com/airbytehq/airbyte/pull/6510)     | Support SSL connection                                                                                                                           |
| 0.4.5       | 2021-09-17 | [6146](https://github.com/airbytehq/airbyte/pull/6146)     | Added option to connect to DB via SSH                                                                                                            |
| 0.4.1       | 2021-07-23 | [4956](https://github.com/airbytehq/airbyte/pull/4956)     | Fix log link                                                                                                                                     |
| 0.3.7       | 2021-06-09 | [3973](https://github.com/airbytehq/airbyte/pull/3973)     | Add AIRBYTE_ENTRYPOINT for Kubernetes support                                                                                                    |
| 0.3.6       | 2021-06-09 | [3966](https://github.com/airbytehq/airbyte/pull/3966)     | Fix excessive logging for CDC method                                                                                                             |
| 0.3.5       | 2021-06-07 | [3890](https://github.com/airbytehq/airbyte/pull/3890)     | Fix CDC handle tinyint\(1\) and boolean types                                                                                                    |
| 0.3.4       | 2021-06-04 | [3846](https://github.com/airbytehq/airbyte/pull/3846)     | Fix max integer value failure                                                                                                                    |
| 0.3.3       | 2021-06-02 | [3789](https://github.com/airbytehq/airbyte/pull/3789)     | MySQL CDC poll wait 5 minutes when not received a single record                                                                                  |
| 0.3.2       | 2021-06-01 | [3757](https://github.com/airbytehq/airbyte/pull/3757)     | MySQL CDC poll 5s to 5 min                                                                                                                       |
| 0.3.1       | 2021-06-01 | [3505](https://github.com/airbytehq/airbyte/pull/3505)     | Implemented MySQL CDC                                                                                                                            |
| 0.3.0       | 2021-04-21 | [2990](https://github.com/airbytehq/airbyte/pull/2990)     | Support namespaces                                                                                                                               |
| 0.2.5       | 2021-04-15 | [2899](https://github.com/airbytehq/airbyte/pull/2899)     | Fix bug in tests                                                                                                                                 |
| 0.2.4       | 2021-03-28 | [2600](https://github.com/airbytehq/airbyte/pull/2600)     | Add NCHAR and NVCHAR support to DB and cursor type casting                                                                                       |
| 0.2.3       | 2021-03-26 | [2611](https://github.com/airbytehq/airbyte/pull/2611)     | Add an optional `jdbc_url_params` in parameters                                                                                                  |
| 0.2.2       | 2021-03-26 | [2460](https://github.com/airbytehq/airbyte/pull/2460)     | Destination supports destination sync mode                                                                                                       |
| 0.2.1       | 2021-03-18 | [2488](https://github.com/airbytehq/airbyte/pull/2488)     | Sources support primary keys                                                                                                                     |
| 0.2.0       | 2021-03-09 | [2238](https://github.com/airbytehq/airbyte/pull/2238)     | Protocol allows future/unknown properties                                                                                                        |
| 0.1.10      | 2021-02-02 | [1887](https://github.com/airbytehq/airbyte/pull/1887)     | Migrate AbstractJdbcSource to use iterators                                                                                                      |
| 0.1.9       | 2021-01-25 | [1746](https://github.com/airbytehq/airbyte/pull/1746)     | Fix NPE in State Decorator                                                                                                                       |
| 0.1.8       | 2021-01-19 | [1724](https://github.com/airbytehq/airbyte/pull/1724)     | Fix JdbcSource handling of tables with same names in different schemas                                                                           |
| 0.1.7       | 2021-01-14 | [1655](https://github.com/airbytehq/airbyte/pull/1655)     | Fix JdbcSource OOM                                                                                                                               |
| 0.1.6       | 2021-01-08 | [1307](https://github.com/airbytehq/airbyte/pull/1307)     | Migrate Postgres and MySQL to use new JdbcSource                                                                                                 |
| 0.1.5       | 2020-12-11 | [1267](https://github.com/airbytehq/airbyte/pull/1267)     | Support incremental sync                                                                                                                         |
| 0.1.4       | 2020-11-30 | [1046](https://github.com/airbytehq/airbyte/pull/1046)     | Add connectors using an index YAML file                                                                                                          |

</details>
