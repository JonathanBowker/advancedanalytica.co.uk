---
generated_record: true
connector_name: SFTP
connector_type: source
connector_slug: sftp
connector_directory: source-sftp
definition_id: a827c52e-791c-4135-a245-e233c5255199
version: 0.2.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/sftp
logo: /images/connectors/sources/sftp.svg
logo_source_path: airbyte-integrations/connectors/source-sftp/icon.svg
logo_sha256: e19265de4d77efb8b3d9523fe7473a4d559ff445f45b57ea3ddcaefd82f3eff5
original_metadata_path: airbyte-integrations/connectors/source-sftp/metadata.yaml
original_metadata_sha256: 761a957e872117f2d22eed47a5c76e84cd1ce2b6472caccda9e11ef7e6b421f4
original_document_path: docs/integrations/sources/sftp.md
original_document_sha256: e7362556bfebfb77950b9097e79286c2ec25f23e72f8371c0c9eed728aadbc02
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d6c64d4b0fcc8e418abe273f2e8d36297d023ec3d8e1fbce41a34fb9f1a8b07c
rewritten_at: 2026-11-12T13:55:49.621587+00:00
---

# SFTP

Set up the SFTP source connector and find its reference information here.

## Prerequisites

- Access to a remote server that supports SFTP
- Host address
- Valid username and authentication credentials, using a password or SSH private key

## Setup

### Step 1: Set up SFTP authentication

Choose one of these authentication methods to set up the SFTP connector:

- The username and password credentials linked to your server.
- A private and public key pair.

Follow these steps to set up key pair authentication:

1. Open your terminal or command prompt. Run the `ssh-keygen` command to generate a new key pair.
   :::note
   If your operating system doesn't support `ssh-keygen`, use a third-party tool such as [PuTTYgen](https://www.puttygen.com/) to generate the key pair.
   :::

2. You'll be prompted to choose a location for the keys and a passphrase for the private key. Press enter to accept the default location. You can choose not to use a passphrase. The two keys are generated as separate files in your chosen location. The private key is usually saved as `id_rsa`. The public key uses the `.pub` extension (`id_rsa.pub`).

3. Run the `ssh-copy-id` command in your terminal to copy the public key to the server.

   ```bash
   ssh-copy-id <username>@<server_ip_address>
   ```

   Replace the username and server IP address with your own values.

   :::note
   Your operating system or the server's SSH implementation may not support the `ssh-copy-id` command. If it doesn't, ask your server administrator how to copy the public key to the server.
   :::

4. You can now connect to the server using the private key. Test the connection with the `ssh` command:

```bash
ssh <username>@<server_ip_address>
```

For more information about SSH key pair authentication, see
[official documentation](https://www.ssh.com/academy/ssh/keygen).

### Step 2: Set up SFTP in Airbyte

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account, or go to your Airbyte Open Source dashboard.
2. In the left navigation bar, click **Sources**. Then click **+ New source** in the top-right corner.
3. Find and select **SFTP** from the available sources.
   <!-- env:cloud -->
   **For Airbyte Cloud users**: If **SFTP** isn't listed, check that the **Alpha** checkbox at the top of the page is selected.
   <!-- /env:cloud -->
4. Enter your preferred **Source name**.
5. Enter your **Username**, **Host Address** and **Port**. The default SFTP port is 22. Enter a different port if your remote server uses one.
6. In **Authentication**, select **Password Authentication** or **SSH Key Authentication** from the dropdown menu. Then enter the required credentials. For SSH Key Authentication, follow the detailed setup instructions below.
7. To configure optional settings, see the next section. Otherwise, click **Set up source** and wait for the tests to finish.

#### Set up SSH Key Authentication

If your SFTP server uses SSH key-based authentication, provide your private key file during setup. This file uses `.pem` or a similar format. Follow these steps to create and upload it correctly:

1. **Locate your private key text.** This text begins with `-----BEGIN OPENSSH PRIVATE KEY-----` or `-----BEGIN RSA PRIVATE KEY-----`. It ends with `-----END OPENSSH PRIVATE KEY-----` or `-----END RSA PRIVATE KEY-----`.

2. **Create a PEM file:**
   1. Open any text editor or IDE, such as PyCharm, VS Code or a terminal text editor.
   2. Create a new file named `ssh.pem`.
   3. Paste the complete private key into the file, including the BEGIN and END lines.
   4. Remove any quotes or extra spaces before or after the key.
   5. Save the file.

3. **(Optional but recommended)** On macOS or Linux, restrict the permissions so only you can read the file:

   ```bash
   chmod 600 ssh.pem
   ```

4. **Upload the file in Airbyte:**
   1. Find the **SSH Private Key** field under **SSH Key Authentication** in the SFTP source setup form.
   2. Click **Upload file** and select your saved `ssh.pem` file.

After upload, Airbyte uses this file to authenticate securely with your SFTP server.

:::note
The file must use PEM format. This plain text file contains your private key between the BEGIN and END lines. Don't paste the key directly into the field. Airbyte requires you to upload a file.
:::

## Optional fields

Use **Optional fields** to configure the SFTP source connector further. To keep the default configuration, leave these fields unchanged.

1. **File Types**: Enter the file types to replicate as comma-separated values. Only CSV and JSON are currently supported. The default value is `csv,json`.
2. **Folder Path**: Enter a folder path for the remote server directory you want to sync. For example, consider this file structure:

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

   Entering `/logs/2022` replicates only data in the specified folder. It ignores the `/files` and `/logs/2021` folders. Leave this field blank to replicate all applicable files from the remote server's designated entry point.

3. **File Pattern**: Enter a [regular expression](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) to define the naming pattern for files you want to replicate. Consider this example:

   ```regex
   log-([0-9]{4})([0-9]{2})([0-9]{2})
   ```

   This pattern selects files matching `log-YYYYMMDD`. Here, `YYYY`, `MM` and `DD` represent four-digit, two-digit and two-digit numbers respectively. For example, `log-20230713`. Leave this field blank to replicate every file not filtered by the previous two fields.

## Supported sync modes

The SFTP source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                        | Support | Notes                                                                                |
| :----------------------------- | :-----: | :----------------------------------------------------------------------------------- |
| Full Refresh - Overwrite       |   ✅    | Warning: this mode deletes all previously synced data in the configured bucket path. |
| Full Refresh - Append Sync     |   ❌    |                                                                                      |
| Incremental - Append           |   ❌    |                                                                                      |
| Incremental - Append + Deduped |   ❌    |                                                                                      |
| Namespaces                     |   ❌    |                                                                                      |

## Supported streams

This source provides one stream per file, with a dynamic schema. It currently supports CSV and JSON files.
More formats \(e.g. Apache Avro\) will be supported in the future.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------------- |
| 0.2.4 | 2025-07-10 | [62924](https://github.com/airbytehq/airbyte/pull/62924) | Convert to new gradle build flow |
| 0.2.3 | 2025-05-29 | [60849](https://github.com/airbytehq/airbyte/pull/60849) | Upgrade sftp client package to use mwiede/jsch |
| 0.2.2 | 2024-02-13 | [35221](https://github.com/airbytehq/airbyte/pull/35221) | Adopt CDK 0.20.4 |
| 0.2.1 | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version |
| 0.2.0 | 2024-01-15 | [34265](https://github.com/airbytehq/airbyte/pull/34265) | Remove LEGACY state flag |
| 0.1.2 | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors |
| 0.1.0   | 2021-24-05 |                                                          | Initial version                                        |

</details>
