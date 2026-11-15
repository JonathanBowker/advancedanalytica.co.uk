---
generated_record: true
connector_name: Teradata
connector_type: source
connector_slug: teradata
connector_directory: source-teradata
definition_id: aa8ba6fd-4875-d94e-fc8d-4e1e09aa2503
version: 0.2.7
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/teradata
logo: /images/connectors/sources/teradata.svg
logo_source_path: airbyte-integrations/connectors/source-teradata/icon.svg
logo_sha256: 776fa860b7cf53eed5bf563ea6a2589d1c6fa1b24aac80280c14947ff38ab416
original_metadata_path: airbyte-integrations/connectors/source-teradata/metadata.yaml
original_metadata_sha256: 188250d84afab164c634c0182bdf7a0be8eb6062ac73e62bb8d0dda9bf75ce98
original_document_path: docs/integrations/sources/teradata.md
original_document_sha256: 073f17b6b974fd3ad1af9628217e7b567ee4660394bedee9a5fcc22804903c48
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: c27d6afb22432ecfbcaa01227c17392183e117ec93533ea0f680bc075b002fd4
rewritten_at: 2026-11-12T13:58:17.674441+00:00
---

# Teradata

Set up the Teradata source connector using this guide.

## Prerequisites

To use the Teradata source connector, you'll need:

- Access to a Teradata Vantage instance

  **Note:** If you need a new Vantage instance, install the free Vantage Express version in the cloud. It's available on [Google Cloud](https://quickstarts.teradata.com/vantage.express.gcp.html), [Azure](https://quickstarts.teradata.com/run-vantage-express-on-microsoft-azure.html) and [AWS](https://quickstarts.teradata.com/run-vantage-express-on-aws.html). You can also run Vantage Express locally using [VMware](https://quickstarts.teradata.com/getting.started.vmware.html), [VirtualBox](https://quickstarts.teradata.com/getting.started.vbox.html) or [UTM](https://quickstarts.teradata.com/getting.started.utm.html).

You'll need this information to configure the Teradata source:

- **Host** - The host name of the Teradata Vantage instance.
- **Username**
- **Password**
- **Database** - Specify the database. This is equivalent to the schema in some databases, such as **database_name.table_name**, when running queries.
- **JDBC URL Params** (optional)
- **SSL Connection** (optional)
- **SSL Modes** (optional)

[Refer to this guide for more details](https://downloads.teradata.com/doc/connectivity/jdbc/reference/current/jdbcug_chapter_2.html#BGBHDDGB)

## Supported sync modes

The Teradata source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                                        | Supported?                                                 |
| :--------------------------------------------- | :--------------------------------------------------------- |
| Full Refresh Sync                              | Yes                                                        |
| Incremental Sync                               | Yes                                                        |
| Replicate Incremental Deletes                  | No                                                         |
| Replicate Multiple Streams \(distinct tables\) | Yes                                                        |
| Namespaces                                     | No (separate connection is needed for different databases) |

### Performance considerations

## Get started

### Requirements

You need a Teradata user with read permissions for the database.

### Setup guide

#### Set up the Teradata source connector

1. Log in to your Airbyte Open Source account.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Teradata** from the **Source type** dropdown.
4. Enter the **Name** for the Teradata connector.
5. For **Host**, enter the Teradata instance's host domain.
6. For **Database**, enter the database name. This is equivalent to the schema in some other databases.
7. For **User** and **Password**, enter the database username and password.
8. To customise the JDBC connection beyond common options, enter additional supported [JDBC URL parameters](https://downloads.teradata.com/doc/connectivity/jdbc/reference/current/jdbcug_chapter_2.html#BGBHDDGB) in the **JDBC URL Params** field. Add them as key-value pairs separated by the symbol &.

   Example: key1=value1&key2=value2&key3=value3

   AirByte adds these parameters to the end of the JDBC URL used to connect to your Teradata database.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--------- | :------------------------------------------------------- | :-------------------------- |
| 0.2.7 | 2026-10-07 | [88282](https://github.com/airbytehq/airbyte/pull/88282) | Fix JDBC URL built when a port is configured (`host/DBS_PORT=<port>`); previously every connection with a port failed with `UnknownHostException` |
| 0.2.6 | 2025-07-10 | [62926](https://github.com/airbytehq/airbyte/pull/62926) | Convert to new gradle build flow |
| 0.2.5 | 2025-01-10 | [51485](https://github.com/airbytehq/airbyte/pull/51485) | Use a non root base image |
| 0.2.4 | 2024-09-05 | [45158](https://github.com/airbytehq/airbyte/pull/45158) | Fix bug in source teradata |
| 0.2.3 | 2024-12-18 | [49894](https://github.com/airbytehq/airbyte/pull/49894) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.2.2 | 2024-02-13 | [35219](https://github.com/airbytehq/airbyte/pull/35219) | Adopt CDK 0.20.4 |
| 0.2.1 | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version |
| 0.2.0   | 2023-12-18 | https://github.com/airbytehq/airbyte/pull/33485          | Remove LEGACY state         |
| 0.1.0   | 2022-03-27 | https://github.com/airbytehq/airbyte/pull/24221          | New Source Teradata Vantage |

</details>
