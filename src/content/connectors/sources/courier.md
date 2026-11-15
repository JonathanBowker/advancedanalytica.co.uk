---
generated_record: true
connector_name: Courier
connector_type: source
connector_slug: courier
connector_directory: source-courier
definition_id: 0541b2cd-2367-4986-b5f1-b79ff55439e4
version: 0.1.0
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/courier
logo: /images/connectors/sources/courier.svg
logo_source_path: airbyte-integrations/connectors/source-courier/icon.svg
logo_sha256: 17e521b9dd257aa67aeb6cda52a75fe9727781d0bc83e309ac140b53b068c5ab
original_metadata_path: airbyte-integrations/connectors/source-courier/metadata.yaml
original_metadata_sha256: fca376bbfa3f93dfcc71086333c76cdbe80f266c05e6feb1c9b4df8162ca944b
original_document_path: docs/integrations/sources/courier.md
original_document_sha256: 710af8f0fa8ff9d4467584d1efe0a5dd5c267842f5cbe703b7fa399660451ae3
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5cf74db1337831bbb652f4876ee40acee4610ae87f14824d2feade47f32811c2
rewritten_at: 2026-11-12T13:34:37.673763+00:00
---

# Courier

:::warning

## Deprecation notice

The Courier source connector is scheduled for deprecation on March 5th, 2024. It’s incompatible with upcoming platform updates for the Airbyte 1.0 launch. After deprecation, the connector won’t be supported or available in Airbyte.

This connector doesn’t support new per-stream features that protect data integrity during Airbyte synchronisations. Without these features, Airbyte can’t enforce its reliability and correctness standards for data syncing.

### Recommended action

To continue syncing data, consider creating a custom connector. For guidance, visit [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

Use this page to set up the [Courier](https://www.courier.com/) source connector and find reference information.

## Prerequisites

Generate an API key by following the [Courier documentation](https://www.courier.com/docs/guides/getting-started/go/#getting-your-api-keys).

## Setup guide

### Step 1: Set up Courier

- Courier Account
- Courier API Key

## Step 2: Set up the Courier connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. Then click **+new source** in the top-right corner.
3. On the Set up the source page, name the Courier connector. Select **Courier** from the Source type dropdown.
4. Enter your `api_key`.
5. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Enter a name for your source.
3. Enter your `api_key`.
4. Click **Set up source**.

## Supported sync modes

The Courier source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- Messages

## Performance considerations

Courier’s [API reference](https://www.courier.com/docs/reference/) doesn’t cover rate limiting. However, the connector applies exponential backoff after receiving a 429 response status code.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                           | Subject        |
| :------ | :--------- | :----------------------------------------------------- | :------------- |
| 0.1.0   | 2022-09-10 | [TODO](https://github.com/airbytehq/airbyte/pull/TODO) | Initial commit |

</details>
