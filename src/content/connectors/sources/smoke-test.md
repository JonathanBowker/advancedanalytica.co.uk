---
generated_record: true
connector_name: Smoke Test
connector_type: source
connector_slug: smoke-test
connector_directory: source-smoke-test
definition_id: 4eb59af1-e69b-4849-84f0-5d81cc5ce490
version: 0.1.3
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/smoke-test
logo: /images/connectors/sources/smoke-test.svg
logo_source_path: airbyte-integrations/connectors/source-smoke-test/icon.svg
logo_sha256: 908298d7791325c737a9f88e0c1b9e9d0217692109f81c36710a718fbf29e6f0
original_metadata_path: airbyte-integrations/connectors/source-smoke-test/metadata.yaml
original_metadata_sha256: d6391871ddf38a048c674bdab5f38e0e6bc86b57656d7cca92649dfdff6f15ce
original_document_path: docs/integrations/sources/smoke-test.md
original_document_sha256: cd19180584ea26a7886db80290436e1237518e11fe53cc45140148c22e20c67c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d24ad72b98a6a797bbcc41035d3e1be66ec9197cb1fc63eb9d4c0d7f4e6af9d1
rewritten_at: 2026-11-12T13:56:34.377665+00:00
---

# Smoke test

The Smoke Test source generates synthetic data for destination regression testing. Its predefined scenarios cover common destination failures: type variations, null handling, naming edge cases, schema variations and batch sizes.

This connector is a thin wrapper around [PyAirbyte's smoke test module](https://github.com/airbytehq/PyAirbyte). The `airbyte.cli.smoke_test_source` module contains all business logic.

:::note
Use this connector for internal testing and development. It doesn't connect to any external API.
:::

## Prerequisites

There are no prerequisites. This connector generates data locally, without external services or credentials.

## Setup

You don't need authentication or external setup. Add the connector, then adjust the configuration options below if needed.

## Configuration

Every configuration field is optional. By default, the connector emits all 14 fast scenarios and excludes the slow `large_batch_stream` scenario.

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **All Fast Streams** | boolean | `true` | Include all fast, non-high-volume predefined streams. |
| **All Slow Streams** | boolean | `false` | Include high-volume streams such as `large_batch_stream`. Excluded by default to keep syncs fast. |
| **Scenario Filter** | array of strings | `[]` | Specific scenario names to include. Combined with the streams enabled by the boolean flags. If empty, only the boolean flags control selection. |
| **Large Batch Record Count** | integer | `1000` | Number of records to generate for the `large_batch_stream` scenario. Set to `0` to emit no records for this stream. |
| **Custom Test Scenarios** | array of objects | `[]` | Additional test scenarios to inject at runtime. Each scenario requires a `name` and `json_schema`. You can optionally include `records`, `primary_key`, and `description`. |

## Supported streams

All streams support full refresh sync only. They don't support incremental sync.

### Fast scenarios included by default

| Stream | Description | Records |
| :--- | :--- | :--- |
| `basic_types` | String, integer, number, boolean columns | 3 |
| `timestamp_types` | Date, datetime, and epoch values | 3 |
| `large_decimals_and_numbers` | High-precision decimals, large integers, boundary values | 3 |
| `nested_json_objects` | Nested objects, arrays, and deep nesting | 2 |
| `null_handling` | Null values across all types, including always-null columns | 3 |
| `column_naming_edge_cases` | CamelCase, dashes, dots, spaces, and SQL reserved words in column names | 1 |
| `table_naming_edge_cases` | Special characters in the stream name | 1 |
| `CamelCaseStreamName` | CamelCase stream name handling | 1 |
| `wide_table_50_columns` | 50-column table with nullable strings | 2 |
| `empty_stream` | Zero records, testing empty dataset handling | 0 |
| `single_record_stream` | Exactly one record | 1 |
| `unicode_and_special_strings` | Emoji, CJK, Cyrillic, and escape sequences | 4 |
| `schema_with_no_primary_key` | No primary key, testing append-only behavior | 3 |
| `long_column_names` | Column names exceeding typical database limits | 1 |

### Slow scenarios excluded by default

| Stream | Description | Records |
| :--- | :--- | :--- |
| `large_batch_stream` | Configurable record count for batch and flush testing | 1,000 |

To enable slow streams, set **All Slow Streams** to `true` or include `large_batch_stream` in the **Scenario Filter** list.

## Features

| Feature | Supported |
| :--- | :--- |
| Full Refresh Sync | Yes |
| Incremental Sync | No |
| Namespaces | No |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :--- | :--- | :--- | :--- |
| 0.1.3 | 2026-11-03 | [90929](https://github.com/airbytehq/airbyte/pull/90929) | Drop support for Python 3.10; the connector now requires Python 3.11 or later |
| 0.1.2 | 2026-07-02 | [81368](https://github.com/airbytehq/airbyte/pull/81368) | Bump starlette to 1.3.1 to resolve GHSA-7f5h-v6xp-fcq8, GHSA-82w8-qh3p-5jfq, GHSA-wqp7-x3pw-xc5r |
| 0.1.1 | 2026-06-02 | [75374](https://github.com/airbytehq/airbyte/pull/75374) | Update dependencies |
| 0.1.0 | 2026-03-19 | [75181](https://github.com/airbytehq/airbyte/pull/75181) | Initial release: smoke test source for destination regression testing |

</details>
