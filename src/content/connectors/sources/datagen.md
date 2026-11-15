---
generated_record: true
connector_name: End-to-End Testing (datagen)
connector_type: source
connector_slug: datagen
connector_directory: source-datagen
definition_id: f14d5125-dc0d-4f6c-abe5-acde821a2203
version: 0.2.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/datagen
logo: /images/connectors/sources/datagen.svg
logo_source_path: airbyte-integrations/connectors/source-datagen/icon.svg
logo_sha256: b64d86e8662132417590680efb29e3f205490962b5a2dd7243a9e48eb25c6550
original_metadata_path: airbyte-integrations/connectors/source-datagen/metadata.yaml
original_metadata_sha256: 84badc61be57d2bf700ea351d256eb3cc926e451ff6775c9bf2c2f50a44b0351
original_document_path: docs/integrations/sources/datagen.md
original_document_sha256: 4332c947e50ba4892b7624920393a849e24959f60fe8077ffedeca1e20fb4917
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 12ea2660a03fdb1daad9931d9b5fda1b20508162c8ede78a0831a584970f0d53
rewritten_at: 2026-11-12T13:34:56.381996+00:00
---

# DataGen

The DataGen source connector generates synthetic data for testing and development. You can test data destinations end to end. You can also test Airbyte configurations in speed mode without accessing an external data source.

## Prerequisites

You don't need any prerequisites. DataGen generates data locally and doesn't connect to external systems.

## Set up DataGen

1. Log in to your Airbyte Cloud or Airbyte Open Source account.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **DataGen** from the Source type dropdown.
4. Enter a name for your DataGen source.
5. Configure the data generation settings:
   - **Data Generation Type**: Choose **Incremental**, **All Types**, or **Wide**.
   - **Max Record**: Enter the total records to generate, from 1 to 100 billion. The default is 100.
   - **Column Count** (Wide mode only): Set the number of columns, from 1 to 1000. The default is 50.
   - **Max Concurrency** (optional): Set the maximum number of concurrent data generators. Leave this empty so Airbyte can manage performance automatically.
6. Click **Set up source**.

## Supported sync modes

The DataGen source connector supports the following sync mode:

| Feature           | Supported? |
|:------------------|:-----------|
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |

## Data generation types

The connector supports three data generation patterns:

### Incremental

Generates a stream named `increment` with one column named `id`. The column contains monotonically increasing integers. Use this mode to test incremental data loading and confirm that data arrives in the expected order.

### All types

Generates a stream named `all types` with columns for these Airbyte data types:

- id
- string
- boolean
- number
- big integer
- big decimal
- date
- time, with and without time zones
- timestamp, with and without time zones
- JSON

Use this mode to test type handling and schema compatibility across different destinations.

### Wide

Generates a stream named `wide` with 1–1000 configurable columns. The default is 50. Column 0 is always `id`, the integer primary key.

The remaining columns cycle through all 12 Airbyte data types:

- integer
- string
- boolean
- number
- big integer
- big decimal
- date
- time with timezone
- time without timezone
- timestamp with timezone
- timestamp without timezone
- JSON

Column names follow the pattern `col_1_integer`, `col_2_string`, and so on. Use this mode to test wide schema handling and destination performance with many columns.

## Configuration

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Data Generation Type** | enum | Incremental | The data generation pattern to use. Choose **Incremental**, **All Types**, or **Wide**. |
| **Max Record** | integer | 100 | The total number of records to generate. Minimum 1, maximum 100 billion. |
| **Max Concurrency** | integer | _(auto)_ | Maximum number of concurrent data generators. Leave empty to let Airbyte optimize performance automatically. |
| **Column Count** | integer | 50 | Wide mode only. The number of columns to generate, including the `id` column. Minimum 1, maximum 1000. |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
    <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                            |
|:--------|:-----------|:---------------------------------------------------------|:-----------------------------------|
| 0.2.5 | 2026-10-22 | [89643](https://github.com/airbytehq/airbyte/pull/89643) | Upgrade to Bulk CDK 1.2.3: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86. |
| 0.2.4 | 2026-10-16 | [89066](https://github.com/airbytehq/airbyte/pull/89066) | Bump Bulk CDK to base 1.0.6 / extract 1.1.21 (Kotlin 2.4 / K2 toolchain, Micronaut 4.10.31, Jackson 2.21.7). |
| 0.2.3 | 2026-10-09 | [88425](https://github.com/airbytehq/airbyte/pull/88425) | Upgrade to Bulk CDK 1.1.14. |
| 0.2.2 | 2026-07-10 | [81656](https://github.com/airbytehq/airbyte/pull/81656) | chore(source-datagen): dummy version bump for progressive rollout (autopilot) testing |
| 0.2.1 | 2026-06-09 | [79330](https://github.com/airbytehq/airbyte/pull/79330) | Progressive rollout e2e test |
| 0.2.0 | 2026-04-28 | [75542](https://github.com/airbytehq/airbyte/pull/75542) | Add wide schema flavor with configurable column count; fix null safety in partition reader; cache codec references; bump CDK to 1.1.6 |
| 0.1.6 | 2025-10-23 | [68611](https://github.com/airbytehq/airbyte/pull/68611) | Update cdk version |
| 0.1.5 | 2025-10-21 | [68581](https://github.com/airbytehq/airbyte/pull/68581) | Update dataChannel version |
| 0.1.4 | 2025-10-16 | [68131](https://github.com/airbytehq/airbyte/pull/68131) | Increment naming fix |
| 0.1.3 | 2025-10-16 | [68129](https://github.com/airbytehq/airbyte/pull/68129) | Increment encoding fix |
| 0.1.2 | 2025-10-14 | [67720](https://github.com/airbytehq/airbyte/pull/67720) | Removal of Array type |
| 0.1.1 | 2025-10-13 | [67110](https://github.com/airbytehq/airbyte/pull/67110) | Addition of proto types |
| 0.1.0 | 2025-09-29 | [66331](https://github.com/airbytehq/airbyte/pull/66331) | Creation of initial DataGen Source |
</details>
