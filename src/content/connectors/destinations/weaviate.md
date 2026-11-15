---
generated_record: true
connector_name: Weaviate
connector_type: destination
connector_slug: weaviate
connector_directory: destination-weaviate
definition_id: 7b7d7a0d-954c-45a0-bcfc-39a634b97736
version: 0.2.64
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/weaviate
logo: /images/connectors/destinations/weaviate.svg
logo_source_path: airbyte-integrations/connectors/destination-weaviate/icon.svg
logo_sha256: c58669fb75953c8ba5f427a4956505a4e57b9fd4db396f915ca7e4799837b49e
original_metadata_path: airbyte-integrations/connectors/destination-weaviate/metadata.yaml
original_metadata_sha256: 23113e58fec2915f9ef335028e6994b4bce1a1ab1a81ba4eea06bd64aba3221d
original_document_path: docs/integrations/destinations/weaviate.md
original_document_sha256: f9caa60b6f405c70afb09cf438fa4f426feda9e394d87849c4cb1ab37380acf7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4a4b9ca6e7e09010d1e266e452bb31b6baa96ad0a06936d747919722f447ebef
rewritten_at: 2026-11-12T14:04:44.431776+00:00
---

# Weaviate

## Overview

Use this page to set up the [Weaviate](https://weaviate.io/) destination connector.

The setup has three parts:

- Processing: Split individual records into chunks that fit the context window. Choose fields for context and supplementary metadata.
- Embedding: Convert text into vectors. Call an embedding service, read pre-calculated vectors from records, or use Weaviate's vectorizer.
- Indexing: Store the vectors in a vector database for similarity search.

The connector uses version 3 of the Weaviate Python client. It works with Weaviate's class-based schema API. Newer Weaviate documentation calls these objects collections. However, the connector and its configuration call them classes.

## Prerequisites

To use the Weaviate destination, you'll need:

- Access to a running Weaviate instance, either self-hosted or Weaviate Cloud. The minimum version is 1.21.2.
- One of these options, depending on how you want to produce vectors:
  - An account with API access for OpenAI, Azure OpenAI, Cohere, or another OpenAI-compatible embedding service.
  - Pre-calculated embeddings stored in a field within your source records.
  - A [vectorizer module](https://docs.weaviate.io/weaviate/model-providers) configured in Weaviate, allowing Weaviate to embed the text.

You'll need this information to configure the destination:

- **Public Endpoint**: The URL of the Weaviate cluster receiving the data, for example `https://my-cluster.weaviate.network`.
- **Authentication**: The cluster authentication method. Use an API token for Weaviate Cloud or a username and password for self-managed clusters. Use no authentication for local test clusters only.
- **Embedding service API key**: Required only if Airbyte calculates the embeddings for you.

On Airbyte Cloud, the endpoint must start with `https://`, and you must enable authentication. The connection check fails if either condition isn't met. Therefore, **No Authentication** and plain HTTP endpoints only work in self-managed Airbyte deployments.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Data type mapping

Metadata fields are stored as object properties and can be used for filtering. Metadata fields support these data types:

- String
- Number, either integer or floating point. Numbers are converted to 64-bit floating point.
- Booleans, either true or false.
- List of String

All other fields are serialised into their JSON representation. Metadata fields containing an empty list aren't written. Weaviate rejects them when they aren't part of a predefined schema.

## Configuration

### Processing

Configure the "Processing" section to split each record into text and metadata fields. All text fields are concatenated into one string. The connector then splits this string into chunks of the configured length. If specified, metadata fields are stored unchanged alongside the embedded text chunks. You can split text by separator, Markdown header, or syntax boundaries for a specific programming language.

Use dot notation to access nested record fields. For example, `user.name` accesses the `name` field in the `user` object. You can also use wildcards to access every field in an object. For example, `users.*.name` accesses all `names` fields in every entry of the `users` array.

Chunk length is measured in tokens produced by the `tiktoken` library. The maximum is 8191 tokens, matching the maximum length supported by the `text-embedding-ada-002` model.

Each document includes the stream name in the `_ab_stream` metadata field. When available, the record's primary key identifies the document. This prevents duplicates when updated record versions are indexed. The primary key is added as the `_ab_record_id` metadata field.

### Embedding

Choose one of these embedding methods:

1. OpenAI: Using the [OpenAI embeddings API](https://platform.openai.com/docs/api-reference/embeddings), the connector produces embeddings with the `text-embedding-ada-002` model and **1536 dimensions**. Throughput is limited by [OpenAI's rate limits](https://platform.openai.com/docs/guides/rate-limits).

2. Azure OpenAI: Use the same model and dimensions as OpenAI, served from your Azure OpenAI resource. You'll need the resource base URL, deployment name, and an API key. Azure's API accepts up to 16 documents per request. This makes it slower than OpenAI for large syncs.

3. Cohere: Using the [Cohere API](https://docs.cohere.com/reference/embed), the connector produces embeddings with the `embed-english-light-v2.0` model and **1024 dimensions**.

4. OpenAI-compatible: Use self-hosted or third-party services that implement the OpenAI embeddings API. Provide the base URL, model name, and number of dimensions returned by the model. The dimensions must match the model's actual output because the connector doesn't verify them.

5. From field: Use the `From field` integration to load pre-calculated embeddings from a source record field into Weaviate. The field must be a JSON array of numbers, such as `[0.1, 0.2, 0.3]`. Its length must match the configured number of dimensions.

6. No external embedding: Airbyte sends no vector. Use this when the target class has a configured [vectorizer](https://docs.weaviate.io/weaviate/model-providers), allowing Weaviate to embed the text. You can also use it when the class supports keyword search only. Set **Default Vectorizer**. If the vectorizer needs an API key, pass it with **Additional headers**.

For testing, you can also use the `Fake` embedding integration. It generates random 1536-dimension vectors. This lets you test a data pipeline without incurring embedding costs.

### Indexing

Configure indexing with these options:

| Option | Default | Description |
| :--- | :--- | :--- |
| **Batch Size** | 128 | Number of objects sent to Weaviate per batch. Lower it if the cluster rejects large batches or runs out of memory. |
| **Text Field** | `text` | Property that receives the embedded text chunk. It must match the `text_key` your query code and any vectorizer expect. |
| **Tenant ID** | empty | Enables multi-tenancy for this connection. Leave empty to disable multi-tenancy. |
| **Default Vectorizer** | `none` | Vectorizer set on classes the connector creates. Only relevant when Weaviate should embed the text itself. |
| **Additional headers** | empty | Extra HTTP headers sent with every request, for example `X-OpenAI-Api-Key` for a `text2vec-openai` vectorizer. |

Each stream is indexed into a separate class derived from its name. The connector removes everything except letters, digits, and underscores, then capitalises the first character. Therefore, the `users_v2` stream becomes the `Users_v2` class, and `my orders!` becomes `Myorders`.

If a class isn't in the cluster schema, the connector creates it with the configured default vectorizer. It also adds one `_ab_record_id` property. Weaviate infers the remaining properties from the first objects received. Therefore, you must enable auto-schema on the server.

Create the class in Weaviate beforehand if you need more control over the schema. In this case, create the `_ab_stream` and `_ab_record_id` text properties for bookkeeping. Deduplication and CDC deletes depend on `_ab_record_id`. Without that property, the connector skips deletion. Older record versions then remain beside new versions in the class.

During a sync in `Overwrite` mode, the class is deleted and recreated with its previous schema. This preserves any properties Weaviate inferred earlier.

Weaviate properties must start with a lowercase letter. They can't contain spaces or special characters, so field names might change during loading. The field names `id`, `_id`, and `_additional` are reserved keywords in Weaviate. They are renamed to `raw_id`, `raw__id`, and `raw__additional`, respectively.

When using [multi-tenancy](https://docs.weaviate.io/weaviate/manage-collections/multi-tenancy), you can configure the tenant id in the connector configuration. If you don't specify it, multi-tenancy is disabled. To index into an existing class, ensure it has multi-tenancy enabled. If the class doesn't exist, the connector creates it with multi-tenancy configured. If the class exists without the tenant id, the connector automatically adds the tenant id. This lets you configure multiple connections for different tenants on the same schema.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                                                                                                                      |
|:--------| :--------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.2.64 | 2026-08-13 | [84358](https://github.com/airbytehq/airbyte/pull/84358) | Update the CDK to remediate CVE-2025-68664 in the langchain dependency |
| 0.2.63 | 2026-07-02 | [81386](https://github.com/airbytehq/airbyte/pull/81386) | Upgrade pillow from 11.x to 12.3.0 to resolve security vulnerabilities GHSA-cfh3-3jmp-rvhc, GHSA-pwv6-vv43-88gr, GHSA-whj4-6x5x-4v2j, GHSA-xg8h-j46f-w952 |
| 0.2.62 | 2026-07-01 | [81364](https://github.com/airbytehq/airbyte/pull/81364) | Bump authlib 1.6.3 to 1.6.12 to resolve security vulnerabilities |
| 0.2.61 | 2026-03-31 | [75645](https://github.com/airbytehq/airbyte/pull/75645) | Bump version to force registry update for supportLevel change to community |
| 0.2.60 | 2025-10-16 | [61103](https://github.com/airbytehq/airbyte/pull/61103) | Update dependencies |
| 0.2.59 | 2025-05-17 | [57180](https://github.com/airbytehq/airbyte/pull/57180) | Update dependencies |
| 0.2.58 | 2025-03-29 | [56089](https://github.com/airbytehq/airbyte/pull/56089) | Update dependencies |
| 0.2.57 | 2025-03-08 | [55424](https://github.com/airbytehq/airbyte/pull/55424) | Update dependencies |
| 0.2.56 | 2025-03-01 | [54880](https://github.com/airbytehq/airbyte/pull/54880) | Update dependencies |
| 0.2.55 | 2025-02-22 | [54278](https://github.com/airbytehq/airbyte/pull/54278) | Update dependencies |
| 0.2.54 | 2025-02-15 | [53894](https://github.com/airbytehq/airbyte/pull/53894) | Update dependencies |
| 0.2.53 | 2025-02-08 | [53424](https://github.com/airbytehq/airbyte/pull/53424) | Update dependencies |
| 0.2.52 | 2025-02-01 | [52944](https://github.com/airbytehq/airbyte/pull/52944) | Update dependencies |
| 0.2.51 | 2025-01-25 | [52211](https://github.com/airbytehq/airbyte/pull/52211) | Update dependencies |
| 0.2.50 | 2025-01-18 | [51759](https://github.com/airbytehq/airbyte/pull/51759) | Update dependencies |
| 0.2.49 | 2025-01-11 | [51259](https://github.com/airbytehq/airbyte/pull/51259) | Update dependencies |
| 0.2.48 | 2025-01-04 | [50908](https://github.com/airbytehq/airbyte/pull/50908) | Update dependencies |
| 0.2.47 | 2024-12-28 | [50444](https://github.com/airbytehq/airbyte/pull/50444) | Update dependencies |
| 0.2.46 | 2024-12-21 | [50182](https://github.com/airbytehq/airbyte/pull/50182) | Update dependencies |
| 0.2.45 | 2024-12-14 | [49317](https://github.com/airbytehq/airbyte/pull/49317) | Update dependencies |
| 0.2.44 | 2024-11-25 | [48640](https://github.com/airbytehq/airbyte/pull/48640) | Update dependencies |
| 0.2.43 | 2024-11-04 | [48244](https://github.com/airbytehq/airbyte/pull/48244) | Update dependencies |
| 0.2.42 | 2024-10-29 | [47063](https://github.com/airbytehq/airbyte/pull/47063) | Update dependencies |
| 0.2.41 | 2024-10-12 | [46848](https://github.com/airbytehq/airbyte/pull/46848) | Update dependencies |
| 0.2.40 | 2024-10-05 | [46465](https://github.com/airbytehq/airbyte/pull/46465) | Update dependencies |
| 0.2.39 | 2024-09-28 | [46189](https://github.com/airbytehq/airbyte/pull/46189) | Update dependencies |
| 0.2.38 | 2024-09-21 | [45822](https://github.com/airbytehq/airbyte/pull/45822) | Update dependencies |
| 0.2.37 | 2024-09-14 | [45560](https://github.com/airbytehq/airbyte/pull/45560) | Update dependencies |
| 0.2.36 | 2024-09-07 | [45216](https://github.com/airbytehq/airbyte/pull/45216) | Update dependencies |
| 0.2.35 | 2024-08-31 | [44964](https://github.com/airbytehq/airbyte/pull/44964) | Update dependencies |
| 0.2.34 | 2024-08-24 | [44668](https://github.com/airbytehq/airbyte/pull/44668) | Update dependencies |
| 0.2.33 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.2.32 | 2024-08-17 | [44216](https://github.com/airbytehq/airbyte/pull/44216) | Update dependencies |
| 0.2.31 | 2024-08-12 | [43906](https://github.com/airbytehq/airbyte/pull/43906) | Update dependencies |
| 0.2.30 | 2024-08-10 | [43599](https://github.com/airbytehq/airbyte/pull/43599) | Update dependencies |
| 0.2.29 | 2024-08-03 | [43084](https://github.com/airbytehq/airbyte/pull/43084) | Update dependencies |
| 0.2.28 | 2024-07-27 | [42629](https://github.com/airbytehq/airbyte/pull/42629) | Update dependencies |
| 0.2.27 | 2024-07-20 | [42283](https://github.com/airbytehq/airbyte/pull/42283) | Update dependencies |
| 0.2.26 | 2024-07-13 | [41935](https://github.com/airbytehq/airbyte/pull/41935) | Update dependencies |
| 0.2.25 | 2024-07-10 | [41504](https://github.com/airbytehq/airbyte/pull/41504) | Update dependencies |
| 0.2.24 | 2024-07-09 | [41222](https://github.com/airbytehq/airbyte/pull/41222) | Update dependencies |
| 0.2.23 | 2024-07-06 | [40943](https://github.com/airbytehq/airbyte/pull/40943) | Update dependencies |
| 0.2.22 | 2024-06-29 | [40633](https://github.com/airbytehq/airbyte/pull/40633) | Update dependencies |
| 0.2.21 | 2024-06-25 | [40274](https://github.com/airbytehq/airbyte/pull/40274) | Update dependencies |
| 0.2.20 | 2024-06-22 | [40109](https://github.com/airbytehq/airbyte/pull/40109) | Update dependencies |
| 0.2.19 | 2024-06-06 | [39212](https://github.com/airbytehq/airbyte/pull/39212) | [autopull] Upgrade base image to v1.2.2 |
| 0.2.18 | 2024-05-15 | [38272](https://github.com/airbytehq/airbyte/pull/38272) | Replace AirbyteLogger with logging.Logger |
| 0.2.17  | 2024-04-15 | [#37333](https://github.com/airbytehq/airbyte/pull/37333)  | Update CDK & pytest version to fix security vulnerabilities.                                                                                 |
| 0.2.16  | 2024-03-22 | [#35911](https://github.com/airbytehq/airbyte/pull/35911)  | Fix tests and move to Poetry                                                                                                                 |
| 0.2.15  | 2023-01-25 | [#34529](https://github.com/airbytehq/airbyte/pull/34529)  | Fix tests                                                                                                                                    |
| 0.2.14  | 2023-01-15 | [#34229](https://github.com/airbytehq/airbyte/pull/34229)  | Allow configuring tenant id                                                                                                                  |
| 0.2.13  | 2023-12-11 | [#33303](https://github.com/airbytehq/airbyte/pull/33303)  | Fix bug with embedding special tokens                                                                                                        |
| 0.2.12  | 2023-12-07 | [#33218](https://github.com/airbytehq/airbyte/pull/33218)  | Normalize metadata field names                                                                                                               |
| 0.2.11  | 2023-12-01 | [#32697](https://github.com/airbytehq/airbyte/pull/32697)  | Allow omitting raw text                                                                                                                      |
| 0.2.10  | 2023-11-16 | [#32608](https://github.com/airbytehq/airbyte/pull/32608)  | Support deleting records for CDC sources                                                                                                     |
| 0.2.9   | 2023-11-13 | [#32357](https://github.com/airbytehq/airbyte/pull/32357)  | Improve spec schema                                                                                                                          |
| 0.2.8   | 2023-11-03 | [#32134](https://github.com/airbytehq/airbyte/pull/32134)  | Improve test coverage                                                                                                                        |
| 0.2.7   | 2023-11-03 | [#32134](https://github.com/airbytehq/airbyte/pull/32134)  | Upgrade weaviate client library                                                                                                              |
| 0.2.6   | 2023-11-01 | [#32038](https://github.com/airbytehq/airbyte/pull/32038)  | Retry failed object loads                                                                                                                    |
| 0.2.5   | 2023-10-24 | [#31953](https://github.com/airbytehq/airbyte/pull/31953)  | Fix memory leak                                                                                                                              |
| 0.2.4   | 2023-10-23 | [#31563](https://github.com/airbytehq/airbyte/pull/31563)  | Add field mapping option, improve append+dedupe sync performance and remove unnecessary retry logic                                          |
| 0.2.3   | 2023-10-19 | [#31599](https://github.com/airbytehq/airbyte/pull/31599)  | Base image migration: remove Dockerfile and use the python-connector-base image                                                              |
| 0.2.2   | 2023-10-15 | [#31329](https://github.com/airbytehq/airbyte/pull/31329)  | Add OpenAI-compatible embedder option                                                                                                        |
| 0.2.1   | 2023-10-04 | [#31075](https://github.com/airbytehq/airbyte/pull/31075)  | Fix OpenAI embedder batch size and conflict field name handling                                                                              |
| 0.2.0   | 2023-09-22 | [#30151](https://github.com/airbytehq/airbyte/pull/30151)  | Add embedding capabilities, overwrite and dedup support and API key auth mode, make certified. 🚨 Breaking changes - check migrations guide. |
| 0.1.1   | 2022-02-08 | [\#22527](https://github.com/airbytehq/airbyte/pull/22527) | Multiple bug fixes: Support String based IDs, arrays of uknown type and additionalProperties of type object and array of objects             |
| 0.1.0   | 2022-12-06 | [\#20094](https://github.com/airbytehq/airbyte/pull/20094) | Add Weaviate destination                                                                                                                     |

</details>
