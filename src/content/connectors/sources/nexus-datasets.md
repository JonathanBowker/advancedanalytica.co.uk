---
generated_record: true
connector_name: Infor Nexus
connector_type: source
connector_slug: nexus-datasets
connector_directory: source-nexus-datasets
definition_id: 9e1fe63c-80ad-44fe-8927-10e66c9e209b
version: 0.1.16
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/nexus-datasets
logo: /images/connectors/sources/nexus-datasets.svg
logo_source_path: airbyte-integrations/connectors/source-nexus-datasets/icon.svg
logo_sha256: 0e14a9f7735ea7a0ea01aea09b6e4f5ad344efb5c6bdd08d98ac85957a8cc53e
original_metadata_path: airbyte-integrations/connectors/source-nexus-datasets/metadata.yaml
original_metadata_sha256: 82aba6103cc4b5e4f6c0cc4c162ebaee153cc92bf84914010bc9f8ae1b7aecb1
original_document_path: docs/integrations/sources/nexus-datasets.md
original_document_sha256: f6bc1a3e74c73bf8c05f94634568c1d830729c568d9a8f25367a4da080732095
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5013168b20b903f35595878034c25b54f0e6ad3175c7dfe8949c135ef5bd2da2
rewritten_at: 2026-11-12T14:11:18.104515+00:00
---

# Infor Nexus Datasets

<HideInUI>

Use this page to set up the [Infor Nexus](https://developer.infornexus.com/) source connector and find reference information.

</HideInUI>

The Infor Nexus Datasets source connector syncs data from [Infor Nexus](https://developer.infornexus.com/) Data Mesh export datasets. It uses the Infor Nexus Data API (v3.1) with HMAC authentication.

## What you'll need

- An Infor Nexus customer organisation with Data Mesh rights
- An export dataset created in the customer organisation
- A Data API (DAPI) agent user configured in the customer organisation
- These credentials for the DAPI agent user:
  - User ID
  - Client access key ID
  - Secret key
- A Data Key (API Key) for the customer organisation

## Set up the connector

### Step 1: Configure Infor Nexus

#### Create a customer organisation

Create a customer organisation in the Infor Nexus platform.

#### Configure Data Mesh

1. Sign in to your Infor Nexus application's admin console.
2. Set up the Data Mesh rule for your organisation.
3. Create a user with Data Mesh privileges.
4. Confirm that this user can sign in to the Infor Nexus platform.

#### Create an export dataset

1. Sign in to the Infor Nexus platform as the user you created.
2. Go to **Analytics** > **Data Mesh Console**.
3. Click the **Export** tab to view exportable datasets.
4. Click **Create** to create an export pipeline from the existing models.
5. Schedule the dataset to run.

#### Gather your credentials

Before you configure Airbyte, collect this information:

- Base URL for your Infor Nexus platform
- Dataset name
- DAPI agent user ID
- DAPI agent access key ID
- DAPI agent secret key
- Data key (API key) for your organisation

For more information about HMAC authentication, see [Infor Nexus HMAC documentation](https://developer.infornexus.com/api/authentication-choices/hmac).

### Step 2: Set up the source connector in Airbyte

<!-- env:cloud -->

**For Airbyte Cloud:**

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click **Sources**, then click **+ New source**.
3. Select **Nexus Datasets** from the Source type dropdown, then enter a name for this connector.

<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

1. Go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. Select **Nexus Datasets** from the Source type dropdown, then enter a name for this connector.

<!-- /env:oss -->

<FieldAnchor field="base_url">

1. Enter the **Base URL** for your Infor Nexus platform.

</FieldAnchor>

<FieldAnchor field="dataset_name">

1. Enter the **Dataset Name** you want to sync.

</FieldAnchor>

<FieldAnchor field="mode">

1. Select the **Infor Streaming Mode**. Choose `Full` to export the complete dataset, or `Incremental` to export changes only. The default is `Full`.

</FieldAnchor>

<FieldAnchor field="user_id">

1. Enter the **User ID** for your DAPI agent user.

</FieldAnchor>

<FieldAnchor field="access_key_id">

1. Enter the **Access Key ID** for your DAPI agent user.

</FieldAnchor>

<FieldAnchor field="secret_key">

1. Enter the **Secret Key** for your DAPI agent user.

</FieldAnchor>

<FieldAnchor field="api_key">

1. Enter your organisation's **API Key** (Data Key).

</FieldAnchor>

1. Click **Set up source**.

### Configuration reference

| Field | Type | Required | Description | Default |
|-------|------|----------|-------------|---------|
| `base_url` | `string` | Yes | The base URL of your Infor Nexus platform. | |
| `dataset_name` | `string` | Yes | The name of the dataset to export. | |
| `mode` | `string` | No | The streaming mode: `Full` exports the complete dataset; `Incremental` exports only changes since the last export. | `Full` |
| `user_id` | `string` | Yes | The DAPI agent user ID configured in Infor Nexus. | |
| `access_key_id` | `string` | Yes | The access key ID for the DAPI agent user. | |
| `secret_key` | `string` | Yes | The secret key for HMAC authentication. | |
| `api_key` | `string` | Yes | The Data API key for your organization. | |

<HideInUI>

## Supported sync modes

The Infor Nexus Datasets source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh
- Incremental

## Supported streams

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| datasets | None | Yes | Yes | Yes |

The `datasets` stream returns records from your configured Infor Nexus export dataset. Each record contains these fields:

- `raw_data`: The record payload as a JSON object.
- `raw_data_string`: The record payload as a JSON string.

## Limitations and troubleshooting

### API response codes

The Infor Nexus Data API returns these status codes during dataset export:

| Status Code | Meaning | Recommended action |
|-------------|---------|-------------------|
| 200 | Dataset is ready to stream. | No action needed. |
| 202 | Dataset is not yet ready. | Wait and retry the sync later. |
| 304 | Dataset is not ready. | Contact Infor member services to investigate. |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|---------|------|--------------|---------|
| 0.1.16 | 2026-10-09 | [88404](https://github.com/airbytehq/airbyte/pull/88404) | Mark `api_key` and `secret_key` as `airbyte_secret` |
| 0.1.15 | 2026-10-07 | [88193](https://github.com/airbytehq/airbyte/pull/88193) | Fix sync failing on every ready export: accept the `binary/octet-stream` Content-Type the Infor Nexus export returns; treat HTTP 202 (dataset not ready) as a transient error |
| 0.1.14 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 0.1.13 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 0.1.11 — 0.1.12 is built on SDM 7.23.7, which breaks bundled custom components |
| 0.1.12 | 2026-07-28 | [83015](https://github.com/airbytehq/airbyte/pull/83015) | Update dependencies |
| 0.1.11 | 2026-07-21 | [82494](https://github.com/airbytehq/airbyte/pull/82494) | Update dependencies |
| 0.1.10 | 2026-07-14 | [81139](https://github.com/airbytehq/airbyte/pull/81139) | Update dependencies |
| 0.1.9 | 2026-06-23 | [80544](https://github.com/airbytehq/airbyte/pull/80544) | Update dependencies |
| 0.1.8 | 2026-06-16 | [79933](https://github.com/airbytehq/airbyte/pull/79933) | Update dependencies |
| 0.1.7 | 2026-06-09 | [78847](https://github.com/airbytehq/airbyte/pull/78847) | Update dependencies |
| 0.1.6 | 2026-04-28 | [77333](https://github.com/airbytehq/airbyte/pull/77333) | Update dependencies |
| 0.1.5 | 2026-04-21 | [73832](https://github.com/airbytehq/airbyte/pull/73832) | Update dependencies |
| 0.1.4 | 2026-04-09 | [76138](https://github.com/airbytehq/airbyte/pull/76138) | Add missing imports for AirbyteTracedException and FailureType in components.py |
| 0.1.3 | 2026-02-17 | [73548](https://github.com/airbytehq/airbyte/pull/73548) | Update dependencies |
| 0.1.2 | 2026-02-10 | [73030](https://github.com/airbytehq/airbyte/pull/73030) | Update dependencies |
| 0.1.1 | 2026-02-03 | [72789](https://github.com/airbytehq/airbyte/pull/72789) | Add missing registryOverrides to metadata.yaml |
| 0.1.0 | 2025-09-30 | [69349](https://github.com/airbytehq/airbyte/pull/69349) | Initial release of the Infor Nexus Datasets connector |

</details>

</HideInUI>
