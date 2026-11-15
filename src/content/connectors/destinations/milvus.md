---
generated_record: true
connector_name: Milvus
connector_type: destination
connector_slug: milvus
connector_directory: destination-milvus
definition_id: 65de8962-48c9-11ee-be56-0242ac120002
version: 0.0.63
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/milvus
logo: /images/connectors/destinations/milvus.svg
logo_source_path: airbyte-integrations/connectors/destination-milvus/icon.svg
logo_sha256: 0b7c3cfa1db9a7246075c45ab4833df1f7722ae52f9fc1661d5d03291fa71234
original_metadata_path: airbyte-integrations/connectors/destination-milvus/metadata.yaml
original_metadata_sha256: ac58a18624a6350c9568a71cdf638a80da41b8929cf984209abe3ffe91c70d67
original_document_path: docs/integrations/destinations/milvus.md
original_document_sha256: eb33425edaec6e85a519f9ff9cc76c44f6b917800804ae3485ddb19685c98235
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: efa018975d76910981ed4ef4dae12c4e13e205c4a001cf1dac5adecd1798ebe9
rewritten_at: 2026-11-12T13:25:08.057308+00:00
---

# Milvus

## Overview

Set up the [Milvus](https://milvus.io/) destination connector by following this guide.

The process has three parts:

- Processing - split individual records into chunks that fit the context window. Choose which fields provide context and which provide supplementary metadata.
- Embedding - convert the text into vectors using a pre-trained model. OpenAI's `text-embedding-ada-002` and Cohere's `embed-english-light-v2.0` are currently supported.
- Indexing - store the vectors in a vector database for similarity search.

## Prerequisites

To use the Milvus destination, you'll need:

- An account with API access for OpenAI or Cohere, depending on your chosen embedding method
- Either a running self-managed Milvus instance or a [Zilliz](https://zilliz.com/) account

You'll need this information to configure the destination:

- **Embedding service API Key** - The API key for your OpenAI or Cohere account
- **Milvus Endpoint URL** - The URL of your Milvus instance
- Either **Milvus API token** or **Milvus Instance Username and Password**
- **Milvus Collection name** - The name of the collection that will receive the data

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Configuration

### Processing

Configure each record's text and metadata fields in the "Processing" section. The connector combines all text fields into one string. It then divides the string into chunks of your configured length. If specified, metadata fields remain unchanged and are stored with the embedded text chunks. Configure the chunking process using the [Langchain Python library](https://python.langchain.com/docs/get_started/introduction).

Use dot notation to access nested fields when specifying text fields. For example, `user.name` accesses the `name` field in the `user` object. You can also use wildcards to access every field in an object. For example, `users.*.name` accesses all `names` fields in every entry of the `users` array.

Chunk length is measured in tokens produced by the `tiktoken` library. The maximum is 8191 tokens, matching the maximum length supported by the `text-embedding-ada-002` model.

Each document includes the stream name in the `_ab_stream` metadata field. When available, the record's primary key identifies the document and prevents duplicates when updated records are indexed. The primary key is added as the `_ab_record_id` metadata field.

### Embedding

Choose one of these embedding methods:

1. OpenAI - using [OpenAI API](https://beta.openai.com/docs/api-reference/text-embedding), the connector creates embeddings with the `text-embedding-ada-002` model and **1536 dimensions**. This integration is constrained by the [speed of the OpenAI embedding API](https://platform.openai.com/docs/guides/rate-limits/overview).

2. Cohere - using the [Cohere API](https://docs.cohere.com/reference/embed), the connector creates embeddings with the `embed-english-light-v2.0` model and **1024 dimensions**.

For testing, you can also use the [Fake embeddings](https://python.langchain.com/docs/modules/data_connection/text_embedding/integrations/fake) integration. It generates random embeddings, letting you test a data pipeline without incurring embedding costs.

### Indexing

If the specified collection doesn't exist, the connector creates it for you. It includes a `pk` primary key field and the configured vector field matching the embedding configuration. Dynamic fields are enabled. The vector field uses an L2 IVF_FLAT index with an `nlist` parameter of 1024.

To change these settings, create a new collection in your Milvus instance. Make sure:

- The primary key field is set to [auto_id](https://milvus.io/docs/create_collection.md)
- A vector field has the correct dimensionality, 1536 for OpenAI or 1024 for Cohere, and [a configured index](https://milvus.io/docs/build_index.md)

If a record contains a field matching the primary key's name, the connector prefixes it with an underscore. This lets Milvus control the primary key internally.

### Set up a collection

You can set up the collection through the UI when using the Zilliz cloud. Configure only the collection name and vector dimensionality. The vector field and index are created automatically under the name `vector`. When using the REST API, this command creates the index:

```
POST /v1/vector/collections/create
{
  "collectionName": "my-collection",
  "dimension": 1536,
  "metricType": "L2",
  "vectorField": "vector",
  “primaryField”: “pk”
}
```

For a self-hosted Milvus cluster, create the collection using the Milvus CLI or Python client. These commands create a collection configured to load data through Airbyte:

```python
from pymilvus import CollectionSchema, FieldSchema, DataType, connections, Collection

connections.connect() # connect to locally running Milvus instance without authentication

pk = FieldSchema(name="pk",dtype=DataType.INT64, is_primary=True, auto_id=True)
vector = FieldSchema(name="vector",dtype=DataType.FLOAT_VECTOR,dim=1536)
schema = CollectionSchema(fields=[pk, vector], enable_dynamic_field=True)
collection = Collection(name="test_collection", schema=schema)
collection.create_index(field_name="vector", index_params={ "metric_type":"L2", "index_type":"IVF_FLAT", "params":{"nlist":1024} })
```

### Langchain integration

Use this code to initialise a langchain vector store from the indexed data:

```python
embeddings = OpenAIEmbeddings(openai_api_key="my-key")
vector_store = Milvus(embeddings=embeddings, collection_name="my-collection", connection_args={"uri": "my-zilliz-endpoint", "token": "my-api-key"})
vector_store.fields.append("text")
# call  vs.fields.append() for all fields you need from the metadata

vector_store.similarity_search("test")
```

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                                                                                             |
|:--------| :--------- | :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.0.63 | 2026-10-14 | [88972](https://github.com/airbytehq/airbyte/pull/88972) | Preserve the platform-provided state message `id` so syncs no longer fail with "State message does not contain id" |
| 0.0.62 | 2026-09-28 | [87038](https://github.com/airbytehq/airbyte/pull/87038) | Pin setuptools below 82, since pymilvus 2.3.0 imports `pkg_resources` at module load |
| 0.0.61 | 2026-08-13 | [84362](https://github.com/airbytehq/airbyte/pull/84362) | Update the CDK to remediate CVE-2025-68664 in the langchain dependency |
| 0.0.60 | 2026-07-02 | [81383](https://github.com/airbytehq/airbyte/pull/81383) | Upgrade pillow from 11.x to 12.3.0 to resolve security vulnerabilities GHSA-cfh3-3jmp-rvhc, GHSA-pwv6-vv43-88gr, GHSA-whj4-6x5x-4v2j, GHSA-xg8h-j46f-w952 |
| 0.0.59 | 2026-07-02 | [81394](https://github.com/airbytehq/airbyte/pull/81394) | Bump aiohttp to >= 3.13.3 to resolve GHSA-6mq8-rvhq-8wgg |
| 0.0.58 | 2026-03-31 | [75645](https://github.com/airbytehq/airbyte/pull/75645) | Bump version to force registry update for supportLevel change to community |
| 0.0.57 | 2025-10-21 | [68333](https://github.com/airbytehq/airbyte/pull/68333) | Update dependencies |
| 0.0.56 | 2025-10-14 | [61075](https://github.com/airbytehq/airbyte/pull/61075) | Update dependencies |
| 0.0.55 | 2025-05-17 | [57175](https://github.com/airbytehq/airbyte/pull/57175) | Update dependencies |
| 0.0.54 | 2025-03-29 | [56587](https://github.com/airbytehq/airbyte/pull/56587) | Update dependencies |
| 0.0.53 | 2025-03-22 | [56136](https://github.com/airbytehq/airbyte/pull/56136) | Update dependencies |
| 0.0.52 | 2025-03-08 | [55376](https://github.com/airbytehq/airbyte/pull/55376) | Update dependencies |
| 0.0.51 | 2025-03-01 | [54849](https://github.com/airbytehq/airbyte/pull/54849) | Update dependencies |
| 0.0.50 | 2025-02-22 | [54273](https://github.com/airbytehq/airbyte/pull/54273) | Update dependencies |
| 0.0.49 | 2025-02-15 | [53911](https://github.com/airbytehq/airbyte/pull/53911) | Update dependencies |
| 0.0.48 | 2025-02-08 | [53415](https://github.com/airbytehq/airbyte/pull/53415) | Update dependencies |
| 0.0.47 | 2025-02-01 | [52900](https://github.com/airbytehq/airbyte/pull/52900) | Update dependencies |
| 0.0.46 | 2025-01-25 | [52178](https://github.com/airbytehq/airbyte/pull/52178) | Update dependencies |
| 0.0.45 | 2025-01-18 | [51727](https://github.com/airbytehq/airbyte/pull/51727) | Update dependencies |
| 0.0.44 | 2025-01-11 | [51267](https://github.com/airbytehq/airbyte/pull/51267) | Update dependencies |
| 0.0.43 | 2025-01-04 | [50916](https://github.com/airbytehq/airbyte/pull/50916) | Update dependencies |
| 0.0.42 | 2024-12-28 | [50508](https://github.com/airbytehq/airbyte/pull/50508) | Update dependencies |
| 0.0.41 | 2024-12-21 | [50169](https://github.com/airbytehq/airbyte/pull/50169) | Update dependencies |
| 0.0.40 | 2024-12-14 | [49307](https://github.com/airbytehq/airbyte/pull/49307) | Update dependencies |
| 0.0.39 | 2024-11-25 | [48655](https://github.com/airbytehq/airbyte/pull/48655) | Update dependencies |
| 0.0.38 | 2024-11-04 | [47789](https://github.com/airbytehq/airbyte/pull/47789) | Update dependencies |
| 0.0.37 | 2024-10-28 | [47505](https://github.com/airbytehq/airbyte/pull/47505) | Update dependencies |
| 0.0.36 | 2024-10-23 | [47080](https://github.com/airbytehq/airbyte/pull/47080) | Update dependencies |
| 0.0.35 | 2024-10-05 | [46483](https://github.com/airbytehq/airbyte/pull/46483) | Update dependencies |
| 0.0.34 | 2024-09-28 | [46165](https://github.com/airbytehq/airbyte/pull/46165) | Update dependencies |
| 0.0.33 | 2024-09-21 | [45802](https://github.com/airbytehq/airbyte/pull/45802) | Update dependencies |
| 0.0.32 | 2024-09-14 | [45573](https://github.com/airbytehq/airbyte/pull/45573) | Update dependencies |
| 0.0.31 | 2024-09-07 | [45281](https://github.com/airbytehq/airbyte/pull/45281) | Update dependencies |
| 0.0.30 | 2024-08-31 | [44960](https://github.com/airbytehq/airbyte/pull/44960) | Update dependencies |
| 0.0.29 | 2024-08-24 | [44754](https://github.com/airbytehq/airbyte/pull/44754) | Update dependencies |
| 0.0.28 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.0.27 | 2024-08-17 | [44242](https://github.com/airbytehq/airbyte/pull/44242) | Update dependencies |
| 0.0.26 | 2024-08-12 | [43776](https://github.com/airbytehq/airbyte/pull/43776) | Update dependencies |
| 0.0.25 | 2024-08-10 | [43619](https://github.com/airbytehq/airbyte/pull/43619) | Update dependencies |
| 0.0.24 | 2024-08-03 | [43111](https://github.com/airbytehq/airbyte/pull/43111) | Update dependencies |
| 0.0.23 | 2024-07-27 | [42823](https://github.com/airbytehq/airbyte/pull/42823) | Update dependencies |
| 0.0.22 | 2024-07-20 | [42213](https://github.com/airbytehq/airbyte/pull/42213) | Update dependencies |
| 0.0.21 | 2024-07-13 | [41793](https://github.com/airbytehq/airbyte/pull/41793) | Update dependencies |
| 0.0.20 | 2024-07-10 | [41495](https://github.com/airbytehq/airbyte/pull/41495) | Update dependencies |
| 0.0.19 | 2024-07-06 | [40632](https://github.com/airbytehq/airbyte/pull/40632) | Update dependencies |
| 0.0.18 | 2024-06-26 | [40537](https://github.com/airbytehq/airbyte/pull/40537) | Update dependencies |
| 0.0.17 | 2024-06-25 | [40446](https://github.com/airbytehq/airbyte/pull/40446) | Update dependencies |
| 0.0.16 | 2024-06-22 | [40161](https://github.com/airbytehq/airbyte/pull/40161) | Update dependencies |
| 0.0.15 | 2024-05-20 | [38276](https://github.com/airbytehq/airbyte/pull/38276) | Replace AirbyteLogger with logging.Logger |
| 0.0.14  | 2024-3-22  | [#37333](https://github.com/airbytehq/airbyte/pull/37333) | Update CDK & pytest version to fix security vulnerabilities                                                                                         |
| 0.0.13  | 2024-3-22  | [#35911](https://github.com/airbytehq/airbyte/pull/35911) | Move to poetry; Fix tests                                                                                                                           |
| 0.0.12  | 2023-12-11 | [#33303](https://github.com/airbytehq/airbyte/pull/33303) | Fix bug with embedding special tokens                                                                                                               |
| 0.0.11  | 2023-12-01 | [#32697](https://github.com/airbytehq/airbyte/pull/32697) | Allow omitting raw text                                                                                                                             |
| 0.0.10  | 2023-11-16 | [#32608](https://github.com/airbytehq/airbyte/pull/32608) | Support deleting records for CDC sources                                                                                                            |
| 0.0.9   | 2023-11-13 | [#32357](https://github.com/airbytehq/airbyte/pull/32357) | Improve spec schema                                                                                                                                 |
| 0.0.8   | 2023-11-08 | [#31563](https://github.com/airbytehq/airbyte/pull/32262) | Auto-create collection if it doesn't exist                                                                                                          |
| 0.0.7   | 2023-10-23 | [#31563](https://github.com/airbytehq/airbyte/pull/31563) | Add field mapping option                                                                                                                            |
| 0.0.6   | 2023-10-19 | [#31599](https://github.com/airbytehq/airbyte/pull/31599) | Base image migration: remove Dockerfile and use the python-connector-base image                                                                     |
| 0.0.5   | 2023-10-15 | [#31329](https://github.com/airbytehq/airbyte/pull/31329) | Add OpenAI-compatible embedder option                                                                                                               |
| 0.0.4   | 2023-10-04 | [#31075](https://github.com/airbytehq/airbyte/pull/31075) | Fix OpenAI embedder batch size                                                                                                                      |
| 0.0.3   | 2023-09-29 | [#30820](https://github.com/airbytehq/airbyte/pull/30820) | Update CDK                                                                                                                                          |
| 0.0.2   | 2023-08-25 | [#30689](https://github.com/airbytehq/airbyte/pull/30689) | Update CDK to support azure OpenAI embeddings and text splitting options, make sure primary key field is not accidentally set, promote to certified |
| 0.0.1   | 2023-08-12 | [#29442](https://github.com/airbytehq/airbyte/pull/29442) | Milvus connector with some embedders                                                                                                                |

</details>
