---
generated_record: true
connector_name: Qdrant
connector_type: destination
connector_slug: qdrant
connector_directory: destination-qdrant
definition_id: 6eb1198a-6d38-43e5-aaaa-dccd8f71db2b
version: 0.1.42
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/qdrant
logo: /images/connectors/destinations/qdrant.svg
logo_source_path: airbyte-integrations/connectors/destination-qdrant/icon.svg
logo_sha256: c185514a58848a617c93dcfa1d4c656d1096360937bf9eb45f953e896baaa8b7
original_metadata_path: airbyte-integrations/connectors/destination-qdrant/metadata.yaml
original_metadata_sha256: b7b22f6abbe85c9c682fc0eca52a50c86bbd4adf3cc31be84fb888f6c069fa7a
original_document_path: docs/integrations/destinations/qdrant.md
original_document_sha256: 1421c5eea55f0843a78b1a02ef46aeaf2192b69d14d81d6f741575f4605f4913
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fe019078e1935d97bcb5ffb61c1984ceba8f0a44fd481dcef045806fa735cdc4
rewritten_at: 2026-11-12T13:26:34.524151+00:00
---

# Qdrant

Set up the [Qdrant](https://qdrant.tech/documentation/) destination connector with this guide.

#### Output schema

A single stream collects payloads and optional vectors from every source stream. It uses a [collection](https://qdrant.tech/documentation/concepts/collections/) in [Qdrant](https://qdrant.tech/documentation/), with a name you define. If that collection doesn't exist in the Qdrant instance, the connector creates it with the same name.

Each [point](https://qdrant.tech/documentation/concepts/points/) in the collection receives a generated UUID string, which is used as the [point id](https://qdrant.tech/documentation/concepts/points/#point-ids). Embeddings generated as defined, or extracted from the source stream, are stored as point vectors. The point payload primarily contains the record metadata. The text field is stored in the configured field within the point payload.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Getting started

You can connect to a Qdrant instance in local or cloud mode.

- For local mode, set up Qdrant using Docker. See the official Qdrant guide in [here](https://qdrant.tech/documentation/guides/installation/#docker). After setup, you'll need your host, port and, where applicable, your gRPC port.
- For Qdrant cloud, follow [this official guide](https://qdrant.tech/documentation/cloud/) to get started. After setup, you'll need the instance URL and an API key.

This connector doesn't support local persistent mode. Use the Docker option for testing.

#### Requirements

To use the Qdrant destination, you'll need:

- An account with API access for OpenAI or Cohere, depending on your embedding method. You don't need one when extracting vectors from the source stream.
- A Qdrant db instance in local or cloud mode
- Qdrant API Credentials for cloud mode
- Host and Port for local mode
- gRPC port, if applicable in local mode

#### Configure network access

Make sure Airbyte can access your Qdrant database. For a database within a VPC, you may need to allow the IP exposing Airbyte.

### Set up the Qdrant destination in Airbyte

You can now configure Qdrant as a destination in the UI. You'll need the following information:

- (Required) **Text fields to embed**
- (Optional) **Text splitter** Options for configuring the chunking process provided by the [Langchain Python library](https://python.langchain.com/docs/get_started/introduction).
- (Required) **Fields to store as metadata**
- (Required) **Collection** The Qdrant db collection name for storing your data
- (Required) **The field in the payload that contains the embedded text**
- (Required) **Prefer gRPC** Whether to prefer gRPC over HTTP
- (Required) **Distance Metric** The distance metric used to measure vector similarities. Select from:
  - [Dot product](https://en.wikipedia.org/wiki/Dot_product)
  - [Cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity)
  - [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
- (Required) Authentication method
  - For local mode
    - **Host** for example localhost
    - **Port** for example 8000
    - **gRPC Port** (Optional)
  - For cloud mode
    - **Url** The URL of the cloud Qdrant instance
    - **API Key** The API Key for the cloud Qdrant instance
- (Optional) Embedding
  - **OpenAI API key** when using OpenAI for embedding
  - **Cohere API key** when using Cohere for embedding
  - Embedding **Field name** and **Embedding dimensions** when embeddings come from stream records

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                  |
| :------ | :--------- | :-------------------------------------------------------- | :----------------------------------------------------------------------- |
| 0.1.42 | 2026-08-13 | [84360](https://github.com/airbytehq/airbyte/pull/84360) | Update the CDK to remediate CVE-2025-68664 in the langchain dependency |
| 0.1.41 | 2025-05-10 | [59814](https://github.com/airbytehq/airbyte/pull/59814) | Update dependencies |
| 0.1.40 | 2025-05-03 | [58718](https://github.com/airbytehq/airbyte/pull/58718) | Update dependencies |
| 0.1.39 | 2025-04-19 | [58282](https://github.com/airbytehq/airbyte/pull/58282) | Update dependencies |
| 0.1.38 | 2025-04-12 | [57610](https://github.com/airbytehq/airbyte/pull/57610) | Update dependencies |
| 0.1.37 | 2025-04-05 | [57162](https://github.com/airbytehq/airbyte/pull/57162) | Update dependencies |
| 0.1.36 | 2025-03-29 | [56564](https://github.com/airbytehq/airbyte/pull/56564) | Update dependencies |
| 0.1.35 | 2025-03-22 | [56159](https://github.com/airbytehq/airbyte/pull/56159) | Update dependencies |
| 0.1.34 | 2025-03-08 | [55363](https://github.com/airbytehq/airbyte/pull/55363) | Update dependencies |
| 0.1.33 | 2025-03-01 | [54889](https://github.com/airbytehq/airbyte/pull/54889) | Update dependencies |
| 0.1.32 | 2025-02-22 | [54246](https://github.com/airbytehq/airbyte/pull/54246) | Update dependencies |
| 0.1.31 | 2025-02-15 | [53939](https://github.com/airbytehq/airbyte/pull/53939) | Update dependencies |
| 0.1.30 | 2025-02-08 | [53389](https://github.com/airbytehq/airbyte/pull/53389) | Update dependencies |
| 0.1.29 | 2025-02-01 | [52917](https://github.com/airbytehq/airbyte/pull/52917) | Update dependencies |
| 0.1.28 | 2025-01-25 | [52171](https://github.com/airbytehq/airbyte/pull/52171) | Update dependencies |
| 0.1.27 | 2025-01-18 | [51716](https://github.com/airbytehq/airbyte/pull/51716) | Update dependencies |
| 0.1.26 | 2025-01-11 | [51232](https://github.com/airbytehq/airbyte/pull/51232) | Update dependencies |
| 0.1.25 | 2025-01-04 | [50917](https://github.com/airbytehq/airbyte/pull/50917) | Update dependencies |
| 0.1.24 | 2024-12-28 | [50459](https://github.com/airbytehq/airbyte/pull/50459) | Update dependencies |
| 0.1.23 | 2024-12-21 | [50222](https://github.com/airbytehq/airbyte/pull/50222) | Update dependencies |
| 0.1.22 | 2024-12-14 | [49290](https://github.com/airbytehq/airbyte/pull/49290) | Update dependencies |
| 0.1.21 | 2024-11-25 | [48641](https://github.com/airbytehq/airbyte/pull/48641) | Update dependencies |
| 0.1.20 | 2024-11-04 | [48191](https://github.com/airbytehq/airbyte/pull/48191) | Update dependencies |
| 0.1.19 | 2024-10-29 | [47757](https://github.com/airbytehq/airbyte/pull/47757) | Update dependencies |
| 0.1.18 | 2024-10-28 | [47621](https://github.com/airbytehq/airbyte/pull/47621) | Update dependencies |
| 0.1.17 | 2024-10-28 | [47054](https://github.com/airbytehq/airbyte/pull/47054) | Update dependencies |
| 0.1.16 | 2024-10-12 | [46774](https://github.com/airbytehq/airbyte/pull/46774) | Update dependencies |
| 0.1.15 | 2024-10-05 | [46417](https://github.com/airbytehq/airbyte/pull/46417) | Update dependencies |
| 0.1.14 | 2024-09-28 | [46137](https://github.com/airbytehq/airbyte/pull/46137) | Update dependencies |
| 0.1.13 | 2024-09-21 | [45830](https://github.com/airbytehq/airbyte/pull/45830) | Update dependencies |
| 0.1.12 | 2024-09-14 | [45526](https://github.com/airbytehq/airbyte/pull/45526) | Update dependencies |
| 0.1.11 | 2024-09-07 | [45217](https://github.com/airbytehq/airbyte/pull/45217) | Update dependencies |
| 0.1.10 | 2024-08-31 | [44678](https://github.com/airbytehq/airbyte/pull/44678) | Update dependencies |
| 0.1.9 | 2024-08-17 | [44293](https://github.com/airbytehq/airbyte/pull/44293) | Update dependencies |
| 0.1.8 | 2024-08-12 | [43744](https://github.com/airbytehq/airbyte/pull/43744) | Update dependencies |
| 0.1.7 | 2024-08-10 | [43529](https://github.com/airbytehq/airbyte/pull/43529) | Update dependencies |
| 0.1.6 | 2024-08-03 | [43219](https://github.com/airbytehq/airbyte/pull/43219) | Update dependencies |
| 0.1.5 | 2024-07-27 | [42620](https://github.com/airbytehq/airbyte/pull/42620) | Update dependencies |
| 0.1.4 | 2024-07-20 | [42384](https://github.com/airbytehq/airbyte/pull/42384) | Update dependencies |
| 0.1.3 | 2024-07-13 | [41919](https://github.com/airbytehq/airbyte/pull/41919) | Update dependencies |
| 0.1.2 | 2024-07-10 | [41530](https://github.com/airbytehq/airbyte/pull/41530) | Update dependencies |
| 0.1.1 | 2024-07-09 | [41096](https://github.com/airbytehq/airbyte/pull/41096) | Update dependencies |
| 0.1.0 | 2024-06-27 | [41020](https://github.com/airbytehq/airbyte/pull/41020) | Update to Airbyte CDK 2.3 and qdrant-client 1.10 |
| 0.0.13 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.0.12 | 2024-06-06 | [39172](https://github.com/airbytehq/airbyte/pull/39172) | [autopull] Upgrade base image to v1.2.2 |
| 0.0.11  | 2024-04-15 | [#37333](https://github.com/airbytehq/airbyte/pull/37333) | Updated CDK and pytest versions to fix security vulnerabilities          |
| 0.0.10  | 2023-12-11 | [#33303](https://github.com/airbytehq/airbyte/pull/33303) | Fix bug with embedding special tokens                                    |
| 0.0.9   | 2023-12-01 | [#32697](https://github.com/airbytehq/airbyte/pull/32697) | Allow omitting raw text                                                  |
| 0.0.8   | 2023-11-29 | [#32608](https://github.com/airbytehq/airbyte/pull/32608) | Support deleting records for CDC sources and fix spec schema             |
| 0.0.7   | 2023-11-13 | [#32357](https://github.com/airbytehq/airbyte/pull/32357) | Improve spec schema                                                      |
| 0.0.6   | 2023-10-23 | [#31563](https://github.com/airbytehq/airbyte/pull/31563) | Add field mapping option                                                 |
| 0.0.5   | 2023-10-15 | [#31329](https://github.com/airbytehq/airbyte/pull/31329) | Add OpenAI-compatible embedder option                                    |
| 0.0.4   | 2023-10-04 | [#31075](https://github.com/airbytehq/airbyte/pull/31075) | Fix OpenAI embedder batch size                                           |
| 0.0.3   | 2023-09-29 | [#30820](https://github.com/airbytehq/airbyte/pull/30820) | Update CDK                                                               |
| 0.0.2   | 2023-09-25 | [#30689](https://github.com/airbytehq/airbyte/pull/30689) | Update CDK to support Azure OpenAI embeddings and text splitting options |
| 0.0.1   | 2023-09-22 | [#30332](https://github.com/airbytehq/airbyte/pull/30332) | 🎉 New Destination: Qdrant (Vector Database)                             |

</details>
