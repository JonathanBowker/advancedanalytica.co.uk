---
generated_record: true
connector_name: Snowflake Cortex
connector_type: destination
connector_slug: snowflake-cortex
connector_directory: destination-snowflake-cortex
definition_id: d9e5418d-f0f4-4d19-a8b1-5630543638e2
version: 0.2.31
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/destinations/snowflake-cortex
logo: /images/connectors/destinations/snowflake-cortex.svg
logo_source_path: airbyte-integrations/connectors/destination-snowflake-cortex/icon.svg
logo_sha256: 2587ec2e0e01235e9642eb64f2d015ffa6d8c38cb56e2743a26dca8587e15e77
original_metadata_path: airbyte-integrations/connectors/destination-snowflake-cortex/metadata.yaml
original_metadata_sha256: ba11c1a96e52eb1f24f5a4ad03ed7863a12dcf86856b07aeafc04b14179811b7
original_document_path: docs/integrations/destinations/snowflake-cortex.md
original_document_sha256: 0e57bc9736ee7c6f58dfbf1fb2e495a7bb549d7557f34b9772e98321fb9e5afe
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: de49799375fe89b28ede68856f2d15536da69e7483cce9409a3ac04370d9b502
rewritten_at: 2026-11-12T13:27:27.657798+00:00
---

# Snowflake Cortex destination

## Overview

This page shows you how to set up the [Snowflake](https://www.snowflake.com/en/) as a vector destination.

The setup has three parts:
* Processing - split individual records into chunks that fit the context window. Choose which fields provide context and which provide supplementary metadata.
* Embedding - convert text into a vector representation with a pre-trained model. OpenAI's `text-embedding-ada-002` and Cohere's `embed-english-light-v2.0` are currently supported. Hugging Face's `e5-base-v2` is coming soon.
* Snowflake Connection - choose where to store the vectors. This configures a vector store using Snowflake tables with the `VECTOR` data type.

## Prerequisites

To use the Snowflake Cortex destination, you'll need:

- An account with API access for OpenAI or Cohere, depending on your chosen embedding method
- A Snowflake account that supports vector type columns

You'll need this information to configure the destination:

- **Embedding service API Key** - The API key for your OpenAI or Cohere account
- **Snowflake Account** - Your Snowflake account name
- **Snowflake User** - Your Snowflake user name
- **Snowflake Password** - Your Snowflake account password
- **Snowflake Database** - The Snowflake database name where you want to load data
- **Snowflake Warehouse** - The Snowflake warehouse name to use
- **Snowflake Role** - The Snowflake role name to use.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Data type mapping

Fields specified as metadata are stored in the document's metadata object and can support filtering. Metadata fields can use these data types:
* String
* Number, either integer or floating point, converted to a 64-bit floating point
* Booleans (true, false)
* List of String

The destination ignores all other fields.

## Configuration

### Processing

The destination splits each record into text and metadata fields, as configured in the "Processing" section. It combines all text fields into one string, then splits that string into chunks of your configured length. If specified, metadata fields are stored unchanged with the embedded text chunks. You can use metadata fields for filtering, but not retrieval. They must contain strings, numbers or booleans. The destination ignores all other values. The _total_ metadata saved for each entry can't exceed 40kb. Chunking configuration options use the [Langchain Python library](https://python.langchain.com/docs/get_started/introduction).

You can access nested record fields with dot notation when specifying text fields. For example, `user.name` accesses the `name` field in the `user` object. You can also use wildcards to access every field in an object. For example, `users.*.name` accesses all `names` fields across every entry in the `users` array.

Chunk length is measured in tokens produced by the `tiktoken` library. The maximum is 8191 tokens, matching the maximum length supported by the `text-embedding-ada-002` model.

Each document includes the stream name in the `_ab_stream` metadata field. When available, the record's primary key identifies the document and prevents duplication when updated records are indexed. It's added as the `_ab_record_id` metadata field.

### Embedding

You can choose one of these embedding methods:

1. OpenAI - using [OpenAI API](https://beta.openai.com/docs/api-reference/text-embedding), the connector creates embeddings with the `text-embedding-ada-002` model and **1536 dimensions**. The [speed of the OpenAI embedding API](https://platform.openai.com/docs/guides/rate-limits/overview) constrains this integration.

2. Cohere - using the [Cohere API](https://docs.cohere.com/reference/embed), the connector creates embeddings with the `embed-english-light-v2.0` model and **1024 dimensions**.

For testing, you can also use the [Fake embeddings](https://python.langchain.com/docs/modules/data_connection/text_embedding/integrations/fake) integration. It generates random embeddings, letting you test a data pipeline without incurring embedding costs.

### Indexing and data storage

To begin, sign up for [Snowflake](https://www.snowflake.com/en/). Set a database and data warehouse before running the Snowflake Cortex destination. Each stream is indexed and stored in a table with the same name. The destination creates the table if it doesn't exist. The table contains these columns:
- document_id (string) - the document's unique identifier, created by appending the primary keys in the stream schema
- chunk_id (string) - the chunk's unique identifier, created by appending the chunk number to the document_id
- metadata (variant) - the document's metadata, stored as key-value pairs
- page_content (string) - the chunk's text content
- embedding (vector) - the chunk's embedding, stored as a list of floats

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                  | Subject                                                                                                                                              |
|:--------| :--------- |:--------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 0.2.31 | 2026-10-07 | [88166](https://github.com/airbytehq/airbyte/pull/88166) | Remove the ruff dev dependency so connector CI formats with the repository ruff version |
| 0.2.30 | 2026-08-13 | [84363](https://github.com/airbytehq/airbyte/pull/84363) | Update the CDK to remediate CVE-2025-68664 in the langchain dependency |
| 0.2.29 | 2026-07-02 | [81385](https://github.com/airbytehq/airbyte/pull/81385) | Upgrade pillow from 11.x to 12.3.0 to resolve security vulnerabilities GHSA-cfh3-3jmp-rvhc, GHSA-pwv6-vv43-88gr, GHSA-whj4-6x5x-4v2j, GHSA-xg8h-j46f-w952 |
| 0.2.28 | 2026-03-31 | [75645](https://github.com/airbytehq/airbyte/pull/75645) | Bump version to force registry update for supportLevel change to community |
| 0.2.27 | 2025-10-21 | [68344](https://github.com/airbytehq/airbyte/pull/68344) | Update dependencies |
| 0.2.26 | 2025-10-14 | [63066](https://github.com/airbytehq/airbyte/pull/63066) | Update dependencies |
| 0.2.25 | 2025-05-17 | [51743](https://github.com/airbytehq/airbyte/pull/51743) | Update dependencies |
| 0.2.24 | 2025-03-01 | [54735](https://github.com/airbytehq/airbyte/pull/54735) | Bump snowflake-connector-python from 3.12.2 to 3.13.1 in /airbyte-integrations/connectors/destination-snowflake-cortex |
| 0.2.23 | 2025-01-11 | [45786](https://github.com/airbytehq/airbyte/pull/45786) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.22 | 2024-09-14 | [45489](https://github.com/airbytehq/airbyte/pull/45489) | Update dependencies |
| 0.2.21 | 2024-09-07 | [45313](https://github.com/airbytehq/airbyte/pull/45313) | Update dependencies |
| 0.2.20 | 2024-08-31 | [44982](https://github.com/airbytehq/airbyte/pull/44982) | Update dependencies |
| 0.2.19 | 2024-08-24 | [44694](https://github.com/airbytehq/airbyte/pull/44694) | Update dependencies |
| 0.2.18 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.2.17 | 2024-08-17 | [43898](https://github.com/airbytehq/airbyte/pull/43898) | Update dependencies |
| 0.2.16 | 2024-08-10 | [43584](https://github.com/airbytehq/airbyte/pull/43584) | Update dependencies |
| 0.2.15 | 2024-08-03 | [43093](https://github.com/airbytehq/airbyte/pull/43093) | Update dependencies |
| 0.2.14 | 2024-07-27 | [42684](https://github.com/airbytehq/airbyte/pull/42684) | Update dependencies |
| 0.2.13 | 2024-07-20 | [42263](https://github.com/airbytehq/airbyte/pull/42263) | Update dependencies |
| 0.2.12 | 2024-07-13 | [41758](https://github.com/airbytehq/airbyte/pull/41758) | Update dependencies |
| 0.2.11 | 2024-07-10 | [41368](https://github.com/airbytehq/airbyte/pull/41368) | Update dependencies |
| 0.2.10 | 2024-07-09 | [41173](https://github.com/airbytehq/airbyte/pull/41173) | Update dependencies |
| 0.2.9 | 2024-07-06 | [40836](https://github.com/airbytehq/airbyte/pull/40836) | Update dependencies |
| 0.2.8 | 2024-06-29 | [40630](https://github.com/airbytehq/airbyte/pull/40630) | Update dependencies |
| 0.2.7 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.2.6 | 2024-06-25 | [40468](https://github.com/airbytehq/airbyte/pull/40468) | Update dependencies |
| 0.2.5 | 2024-06-23 | [40225](https://github.com/airbytehq/airbyte/pull/40225) | Update dependencies |
| 0.2.4 | 2024-06-22 | [40047](https://github.com/airbytehq/airbyte/pull/40047) | Update dependencies |
| 0.2.3 | 2024-06-04 | [38955](https://github.com/airbytehq/airbyte/pull/38955) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.2   | 2024-06-04 | [#39092](https://github.com/airbytehq/airbyte/pull/39092) | Fix writing when multiple chunks exist for a document.
| 0.2.1   | 2024-06-03 | [#38830](https://github.com/airbytehq/airbyte/pull/38830) | Add handling for unexpected/undefined state codes.
| 0.2.0   | 2024-05-30 | [#38337](https://github.com/airbytehq/airbyte/pull/38337) | Fix `merge` behavior when multiple chunks exist for a document. Includes additional refactoring and improvements.
| 0.1.2   | 2024-05-17 | [#38327](https://github.com/airbytehq/airbyte/pull/38327) | Fix chunking related issue.
| 0.1.1   | 2024-05-15 | [#38206](https://github.com/airbytehq/airbyte/pull/38206) | Bug fixes.
| 0.1.0   | 2024-05-13 | [#37333](https://github.com/airbytehq/airbyte/pull/36807) | Add support for Snowflake as a Vector destination.

</details>
