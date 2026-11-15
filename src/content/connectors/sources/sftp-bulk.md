---
generated_record: true
connector_name: SFTP Bulk
connector_type: source
connector_slug: sftp-bulk
connector_directory: source-sftp-bulk
definition_id: 31e3242f-dee7-4cdc-a4b8-8e06c5458517
version: 1.9.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/sftp-bulk
logo: /images/connectors/sources/sftp-bulk.svg
logo_source_path: airbyte-integrations/connectors/source-sftp-bulk/icon.svg
logo_sha256: e19265de4d77efb8b3d9523fe7473a4d559ff445f45b57ea3ddcaefd82f3eff5
original_metadata_path: airbyte-integrations/connectors/source-sftp-bulk/metadata.yaml
original_metadata_sha256: ff4cb8048b1b5bed1edfe03cbaaad307b0d2579549e7728543ac74a83995f7b3
original_document_path: docs/integrations/sources/sftp-bulk.md
original_document_sha256: 72c4044c7a7d08cf06a8dba61fc2762076bdcb3a6fd85902b192d3e903ed0f21
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 59fef75cc4abe4a0f610b101855ba3c7c846bedd05d9bd5bedbd1ac901bf372d
rewritten_at: 2026-11-12T13:55:38.615322+00:00
---

# SFTP Bulk

<HideInUI>

Use this page to set up the [SFTP Bulk](https://docs.airbyte.com/integrations/sources/sftp-bulk#file-specific-configuration) source connector and find reference information.

</HideInUI>

The SFTP Bulk connector provides features unavailable in the standard SFTP source connector:

- **Bulk ingestion of files**: Consolidate and process multiple files as one data stream in your destination system.
- **Incremental loading**: Sync files incrementally from the SFTP server based on their creation or last modification time.
- **Load most recent file**: Load only the most recent file from the designated folder path. This option is useful for regularly added snapshot files containing the latest data.

## Prerequisites

- Access to a remote server that supports SFTP
- Host address
- Valid username and authentication credentials, using either a password or SSH private key

## Setup guide

### Set up SFTP Bulk

#### Step 1: Set up authentication

Choose one of these authentication methods for the SFTP connector:

- Your server username and password.
- A private/public key pair.

To set up key pair authentication, follow these steps:

1. Open your terminal or command prompt. Use the `ssh-keygen` command to generate a new key pair.
   :::note
   If your operating system doesn't support `ssh-keygen`, use a third-party tool such as [PuTTYgen](https://www.puttygen.com/) to generate the key pair.
   :::

2. When prompted, choose where to save the keys and whether to secure the private key with a passphrase. Press enter to accept the default location. You can also continue without a passphrase. The command creates two separate files in your chosen location. The private key is usually saved as `id_rsa`. The public key uses the `.pub` extension (`id_rsa.pub`).

3. In your terminal, use the `ssh-copy-id` command to copy the public key to the server.

   ```bash
   ssh-copy-id <username>@<server_ip_address>
   ```

   Replace the username and server IP address with your specific values.

   :::note
   Your operating system or the remote server's SSH implementation might not support the `ssh-copy-id` command. If it doesn't, ask your server administrator how to copy the public key to the server.
   :::

4. You can now connect to the server using the private key. Test the connection with the `ssh` command:

```bash
ssh <username>@<server_ip_address>
```

For more information about SSH key pair authentication, see the
[official documentation](https://www.ssh.com/academy/ssh/keygen).

### Set up the connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select SFTP Bulk from the Source type dropdown.
4. Enter a name for the SFTP Bulk connector.
5. Choose a [delivery method](../../platform/using-airbyte/delivery-methods) for your data.
6. Enter the **Host Address**.
7. Enter your **Username**.
8. Enter your SFTP server authentication credentials: **Password** or **Private Key**. For Private Key authentication, see [SSH Key Authentication Setup](#ssh-key-authentication-setup) below for detailed instructions.
9. In the `The list of streams to sync` section, enter a **Stream Name**. This becomes the stream name in your destination. To add more streams, click **Add**.
10. For each stream, select the **File Type** you want to sync. The available options depend on your chosen format. Read the file-specific sections below for more details.
11. (Optional) Provide a **Start Date** using the datepicker or enter the date in `YYYY-MM-DDTHH:mm:ss.SSSSSSZ` format. Incremental syncs only include files modified or added after this date.
12. (Optional) Specify the **Port**. The default SFTP port is 22. Enter a different port if your remote server uses one.
13. (Optional) Set the **Folder Path**. This setting defines the directory searched for files and defaults to "/". To sync a specific folder, enter its directory on the remote server. For example, consider this file structure:

    ```text
    Root
    | - logs
    |   | - 2021
    |   | - 2022
    |
    | - files
    |   | - 2021
    |   | - 2022
    ```

    Entering `/logs/2022` replicates only data from that folder. It ignores the `/files` and `/logs/2021` folders. Leave this field blank to replicate all applicable files from the remote server's designated entry point.

14. Click **Set up source** to complete the setup. A test then verifies the configuration.

### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select SFTP Bulk from the Source type dropdown.
4. Enter a name for the SFTP Bulk connector.

#### Set up SSH key authentication

If your SFTP server uses SSH key-based authentication, provide your private key file during setup. Use `.pem` or a similar format. Follow these steps to create and upload the file correctly:

1. **Locate your private key text.** This text block begins with `-----BEGIN OPENSSH PRIVATE KEY-----` or `-----BEGIN RSA PRIVATE KEY-----`. It ends with `-----END OPENSSH PRIVATE KEY-----` or `-----END RSA PRIVATE KEY-----`.

2. **Create a PEM file:**
   1. Open any text editor or IDE, such as PyCharm, VS Code, or a terminal text editor.
   2. Create a new file named `ssh.pem`.
   3. Paste the complete private key into the file, including the BEGIN and END lines.
   4. Remove any quotes or extra spaces before or after the key.
   5. Save the file.

3. **(Optional but recommended)** On macOS or Linux, restrict the permissions so only you can read the file:

   ```bash
   chmod 600 ssh.pem
   ```

4. **Upload the file in Airbyte Cloud:**
   1. Find the **Private key** field in the SFTP Bulk source setup form.
   2. Click **Upload file** and select your saved `ssh.pem` file.

After upload, Airbyte uses this file to authenticate securely with your SFTP server.

:::note
The file must use PEM format. It must be plain text containing your private key between the BEGIN and END lines. Don't paste the key directly into the field. Airbyte requires you to upload the file.
:::

## Delivery method

<FieldAnchor field="delivery_method.delivery_type">

Choose a [delivery method](../../platform/using-airbyte/delivery-methods) for your data.

</FieldAnchor>

### Preserve subdirectories in file paths

Enable this option to send the subdirectory structure with source file names to the destination. Otherwise, files sync by name only. This option is ignored when file-based replication isn't enabled.

## File-specific configuration

Your **File Type** selection determines which file-specific configuration options you see.

### Glob patterns

Use a **Glob** pattern to select files for syncing from the file system. Glob patterns support CSV, Avro, JSONL, Parquet, Excel, and Document formats.

If your files are in a subfolder, include that folder in the glob pattern, such as `my_folder/my_prefix_*.csv`. To match files recursively across subdirectories, use `**`, such as `**/*.csv`.

## Supported sync modes

The SFTP Bulk source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

| Feature                        | Support | Notes |
|:-------------------------------|:-------:|:------|
| Full Refresh - Overwrite       |    ✅    |       |
| Full Refresh - Append Sync     |    ✅    |       |
| Incremental - Append           |    ✅    |       |
| Incremental - Append + Deduped |    ❌    |       |

## Supported streams

This source provides one stream per file with a dynamic schema. Supported file types are Avro, CSV, JSONL, Parquet, and Document File Type Format.

## File size limits

With the **Copy Raw Files** delivery method, each file has a maximum size of 1.5 GB (1,500,000,000 bytes). This limit applies when raw files are copied without parsing their contents.

To sync files larger than 1.5 GB, use this approach:

- Split large files into smaller chunks before uploading them to your SFTP server

The **Replicate Records** delivery method doesn't bypass file size limits. Replicate Records only supports structured formats the connector can parse into individual records, including CSV, JSONL, Parquet, and Avro. It doesn't support unstructured files or binary formats. Files processed through Replicate Records remain subject to the same size limits.

For more information about delivery methods and their limits, see the [Delivery Methods documentation](/platform/using-airbyte/delivery-methods#supported-versions-and-limitations).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                     |
|:--------|:-----------|:---------------------------------------------------------|:------------------------------------------------------------|
| 1.9.4 | 2026-11-03 | [90893](https://github.com/airbytehq/airbyte/pull/90893) | Require Python 3.11 or later |
| 1.9.3 | 2026-10-20 | [89517](https://github.com/airbytehq/airbyte/pull/89517) | Allow Python 3.13 and upgrade base image to python-connector-base 4.1.1 |
| 1.9.2 | 2026-04-06 | [76108](https://github.com/airbytehq/airbyte/pull/76108) | Catch `struct.error` during private key parsing and re-raise `AirbyteTracedException` instead of swallowing config errors as warnings |
| 1.9.1 | 2026-04-01 | [75967](https://github.com/airbytehq/airbyte/pull/75967) | Support non-RSA private key types (Ed25519, ECDSA, DSS) for SSH authentication |
| 1.9.0 | 2026-01-08 | [71225](https://github.com/airbytehq/airbyte/pull/71225) | Promoting release candidate 1.9.0-rc.2 to a main version. |
| 1.9.0-rc.2 | 2026-01-05 | [71038](https://github.com/airbytehq/airbyte/pull/71038) | Fix directory could match globs logic |
| 1.9.0-rc.1 | 2025-12-09 | [69167](https://github.com/airbytehq/airbyte/pull/69167) | Fix OOM on check, update airbyte-cdk version |
| 1.8.9 | 2025-11-24 | | Increase `maxSecondsBetweenMessages` to 3 hours |
| 1.8.8 | 2025-11-10 | [69257](https://github.com/airbytehq/airbyte/pull/69257) | Update error message when file exceeds size limit |
| 1.8.7 | 2025-10-21 | [68276](https://github.com/airbytehq/airbyte/pull/68276) | Update dependencies |
| 1.8.6 | 2025-10-14 | [67923](https://github.com/airbytehq/airbyte/pull/67923) | Update dependencies |
| 1.8.5 | 2025-10-07 | [67234](https://github.com/airbytehq/airbyte/pull/67234) | Update dependencies |
| 1.8.4 | 2025-09-30 | [66868](https://github.com/airbytehq/airbyte/pull/66868) | Update dependencies |
| 1.8.3 | 2025-09-15 | [66197](https://github.com/airbytehq/airbyte/pull/66197) | Update to CDK v7 |
| 1.8.2 | 2025-08-24 | [60498](https://github.com/airbytehq/airbyte/pull/60498) | Update dependencies |
| 1.8.1 | 2025-05-10 | [58962](https://github.com/airbytehq/airbyte/pull/58962) | Update dependencies |
| 1.8.0 | 2025-05-07 | [57514](https://github.com/airbytehq/airbyte/pull/57514) | Adapt file-transfer records to latest protocol, requires platform >= 1.7.0, destination-s3 >= 1.8.0 |
| 1.7.8 | 2025-04-19 | [58448](https://github.com/airbytehq/airbyte/pull/58448) | Update dependencies |
| 1.7.7 | 2025-04-05 | [57475](https://github.com/airbytehq/airbyte/pull/57475) | Update dependencies |
| 1.7.6 | 2025-03-29 | [56898](https://github.com/airbytehq/airbyte/pull/56898) | Update dependencies |
| 1.7.5 | 2025-03-22 | [54083](https://github.com/airbytehq/airbyte/pull/54083) | Update dependencies |
| 1.7.4 | 2025-02-08 | [53570](https://github.com/airbytehq/airbyte/pull/53570) | Update dependencies |
| 1.7.3 | 2025-02-01 | [52971](https://github.com/airbytehq/airbyte/pull/52971) | Update dependencies |
| 1.7.2 | 2025-01-25 | [52470](https://github.com/airbytehq/airbyte/pull/52470) | Update dependencies |
| 1.7.1 | 2025-01-18 | [43821](https://github.com/airbytehq/airbyte/pull/43821) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 1.7.0 | 2025-01-17 | [51611](https://github.com/airbytehq/airbyte/pull/51611) | Promoting release candidate 1.7.0-rc.1 to a main version. |
| 1.7.0-rc.1   | 2025-01-16 | [50972](https://github.com/airbytehq/airbyte/pull/50972) | Include option to not mirroring subdirectory structure.     |
| 1.6.0   | 2024-12-17 | [49826](https://github.com/airbytehq/airbyte/pull/49826) | Increase individual file size limit.                        |
| 1.5.0   | 2024-12-02 | [48434](https://github.com/airbytehq/airbyte/pull/48434) | Add get_file method for file-transfer feature.              |
| 1.4.0   | 2024-10-31 | [46739](https://github.com/airbytehq/airbyte/pull/46739) | make private key an airbyte secret.                         |
| 1.3.0   | 2024-10-31 | [47703](https://github.com/airbytehq/airbyte/pull/47703) | Update dependency to CDK v6 with ability to transfer files. |
| 1.2.0   | 2024-09-03 | [46323](https://github.com/airbytehq/airbyte/pull/46323) | Update dependency to CDK v5                                 |
| 1.1.0   | 2024-08-14 | [44028](https://github.com/airbytehq/airbyte/pull/44028) | Update dependency to CDK v4                                 |
| 1.0.1   | 2024-05-29 | [38703](https://github.com/airbytehq/airbyte/pull/38703) | Avoid error on empty stream when running discover           |
| 1.0.0   | 2024-03-22 | [36256](https://github.com/airbytehq/airbyte/pull/36256) | Migrate to File-Based CDK. Manage dependencies with Poetry. |
| 0.1.2   | 2023-04-19 | [19224](https://github.com/airbytehq/airbyte/pull/19224) | Support custom CSV separators                               |
| 0.1.1   | 2023-03-17 | [24180](https://github.com/airbytehq/airbyte/pull/24180) | Fix field order                                             |
| 0.1.0   | 2021-24-05 | [17691](https://github.com/airbytehq/airbyte/pull/17691) | Initial version                                             |

</details>
