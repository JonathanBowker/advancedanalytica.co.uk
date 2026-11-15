---
generated_record: true
connector_name: Vector Database (powered by LangChain)
connector_type: destination
connector_slug: langchain
connector_directory: destination-langchain
definition_id: cf98d52c-ba5a-4dfd-8ada-c1baebfa6e73
version: 0.1.2
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/langchain
logo: /images/connectors/destinations/langchain.svg
logo_source_path: docusaurus/static/img/ai-agents/langchain.svg
logo_sha256: a5945bff639a233bef414614ed7422981d5e7e145d86911058e332f003e532dc
original_metadata_path: airbyte-integrations/connectors/destination-langchain/metadata.yaml
original_metadata_sha256: 6a52d5e8d79b4368867a9b4fd9f7afa48a0b547f101a49dd43fa8692cc05d938
original_document_path: docs/integrations/destinations/langchain.md
original_document_sha256: a0d41524d2cd6c8acd1bf7ad02f9732d76e9b13bd3480f249095aa7f65392530
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 71f1df65a3643175008f42005a567afeaeee569d3c57ba4a67f131c841404fa4
rewritten_at: 2026-11-12T13:25:27.408247+00:00
---

# Vector Database, powered by LangChain

:::warning
The vector db destination has been split into separate destinations for each vector database. This destination won't receive further updates and isn't covered by SLAs. The separate destinations support every feature available here and are actively maintained. Migrate to the relevant destination as soon as possible.

Use the destination for your chosen vector database to continue receiving updates and support.

The following databases are supported:

- [Pinecone](https://docs.airbyte.com/integrations/destinations/pinecone)
- [Weaviate](https://docs.airbyte.com/integrations/destinations/weaviate)
- [Milvus](https://docs.airbyte.com/integrations/destinations/milvus)
- [Chroma](https://docs.airbyte.com/integrations/destinations/chroma)
- [Qdrant](https://docs.airbyte.com/integrations/destinations/qdrant)
:::

## Overview

This destination prepares data for [Langchain](https://langchain.com/) to retrieve relevant context for question answering use cases.

The process has three parts:

- Processing: split records into chunks that fit the context window. Choose which fields provide context and which supply metadata.
- Embedding: convert text into vectors using a pre-trained model. Currently, only OpenAI `text-embedding-ada-002` is supported.
- Indexing: store the vectors in a vector database for similarity searches.

### Process records

The destination splits each record into text and meta fields using your settings in the "Processing" section. It combines all text fields into one string, then splits it into chunks of the configured length. It stores meta fields unchanged alongside the embedded text chunks. You can only use metadata fields for filtering, not retrieval. They must have the type string, number or boolean. All other values are ignored. Your chosen vector store may apply further limits.

You can access nested text fields with dot notation. For example, `user.name` accesses the `name` field in the `user` object. You can also use wildcards to access every field in an object. For example, `users.*.name` accesses all `names` fields in every entry of the `users` array.

The `tiktoken` library measures chunk length in tokens. The maximum is 8191 tokens, matching the maximum length supported by the `text-embedding-ada-002` model.

Each document includes the stream name in the `_airbyte_stream` metadata field. When available, the record's primary key identifies the document and prevents duplicates when updated records are indexed. The destination adds it as the `_record_id` metadata field.

### Create embeddings

The OpenAI embedding API calculates embeddings. See [OpenAI API](https://beta.openai.com/docs/api-reference/text-embedding) for details. You'll need an OpenAI API key.

The [speed of the OpenAI embedding API](https://platform.openai.com/docs/guides/rate-limits/overview) constrains this integration.

For testing, you can also use the [Fake embeddings](https://python.langchain.com/docs/modules/data_connection/text_embedding/integrations/fake) integration. It generates random embeddings, letting you test a data pipeline without incurring embedding costs.

### Index vectors

#### Pinecone vector store

For production use, choose the Pinecone vector store. Before running the destination, create a project and index through the Pinecone web UI or API. All streams use the same index. The `_airbyte_stream` metadata field distinguishes between streams. Metadata fields are limited to 30KB per document overall. Both OpenAI and Fake embeddings have 1536 vector dimensions. Configure the index accordingly.

Use the following code to initialise a langchain QA chain from the indexed data. Set the open API key, Pinecone key and environment as `OPENAI_API_KEY`, `PINECONE_KEY` and `PINECONE_ENV` environment variables:

```python
from langchain import OpenAI
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
import pinecone
import os

embeddings = OpenAIEmbeddings()
pinecone.init(api_key=os.environ["PINECONE_KEY"], environment=os.environ["PINECONE_ENV"])
index = pinecone.Index("<your pinecone index name>")
vector_store = Pinecone(index, embeddings.embed_query, "text")

qa = RetrievalQA.from_chain_type(llm=OpenAI(temperature=0), chain_type="stuff", retriever=vector_store.as_retriever())
```

:::caution

Pinecone pods of type starter can index up to 10,000 chunks. For production use, choose a higher tier.

:::

<!-- env:oss -->

#### Chroma vector store

The [Chroma vector store](https://trychroma.com) runs the Chroma embedding database as a persistent client and stores vectors in a local file.

The `destination_path` must start with `/local`. Any directory nesting within local maps to the local mount.

By default, the `LOCAL_ROOT` environment variable in the `.env` file is set to `/tmp/airbyte_local`.

Docker mounts the local mount at `LOCAL_ROOT`. By default, this means `/local` is replaced by `/tmp/airbyte_local`.

Use the following code to initialise a langchain QA chain from the indexed data. Set the openai API key as the `OPENAI_API_KEY` environment variable:

```python
from langchain import OpenAI
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
vector_store = Chroma(embedding_function=embeddings, persist_directory="/tmp/airbyte_local/<your configured directory>")

qa = RetrievalQA.from_chain_type(llm=OpenAI(temperature=0), chain_type="stuff", retriever=vector_store.as_retriever())
```

:::caution

Chroma is designed for local workstations and won't work on Kubernetes.

Make sure Docker Desktop can access `/tmp`. On MacOS, it also needs access to `/private` because /tmp links to /private. Otherwise, it won't work. Allow access through "File sharing" in `Settings -> Resources -> File sharing -> add the one or two above folder`, then select the "Apply & restart" button.

:::

#### DocArrayHnswSearch vector store

For local testing, use the [DocArrayHnswSearch](https://python.langchain.com/docs/modules/data_connection/vectorstores/integrations/docarray_hnsw). It stores vectors in a local file and metadata in a sqlite database. It isn't suitable for production use. However, it's the easiest option to set up for testing and development.

The `destination_path` must start with `/local`. Any directory nesting within local maps to the local mount.

By default, the `LOCAL_ROOT` environment variable in the `.env` file is set to `/tmp/airbyte_local`.

Docker mounts the local mount at `LOCAL_ROOT`. By default, this means `/local` is replaced by `/tmp/airbyte_local`.

DocArrayHnswSearch doesn't support incremental sync. The destination therefore always performs a full refresh sync.

Use the following code to initialise a langchain QA chain from the indexed data. Set the openai API key as the `OPENAI_API_KEY` environment variable:

```python
from langchain import OpenAI
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.vectorstores import DocArrayHnswSearch
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
vector_store = DocArrayHnswSearch.from_params(embeddings, "/tmp/airbyte_local/<your configured directory>", 1536)

qa = RetrievalQA.from_chain_type(llm=OpenAI(temperature=0), chain_type="stuff", retriever=vector_store.as_retriever())
```

:::danger

This destination deletes every existing file in the configured directory each time. Don't use a directory containing other files.

:::

:::caution

DocArrayHnswSearch is designed for local workstations and won't work on Kubernetes.

Make sure Docker Desktop can access `/tmp`. On MacOS, it also needs access to `/private` because /tmp links to /private. Otherwise, it won't work. Allow access through "File sharing" in `Settings -> Resources -> File sharing -> add the one or two above folder`, then select the "Apply & restart" button.

:::

<!-- /env:oss -->

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                                                                      |
| :------ | :--------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| 0.1.2   | 2023-11-13 | [#32455](https://github.com/airbytehq/airbyte/pull/32455) | Fix build                                                                                                                    |
| 0.1.1   | 2023-09-01 | [#30282](https://github.com/airbytehq/airbyte/pull/30282) | Use embedders from CDK                                                                                                       |
| 0.1.0   | 2023-09-01 | [#30080](https://github.com/airbytehq/airbyte/pull/30080) | Fix bug with potential data loss on append+dedup syncing. 🚨 Streams using append+dedup mode need to be reset after upgrade. |
| 0.0.8   | 2023-08-21 | [#29515](https://github.com/airbytehq/airbyte/pull/29515) | Clean up generated schema spec                                                                                               |
| 0.0.7   | 2023-08-18 | [#29513](https://github.com/airbytehq/airbyte/pull/29513) | Fix for starter pods                                                                                                         |
| 0.0.6   | 2023-08-02 | [#28977](https://github.com/airbytehq/airbyte/pull/28977) | Validate pinecone index dimensions during check                                                                              |
| 0.0.5   | 2023-07-25 | [#28605](https://github.com/airbytehq/airbyte/pull/28605) | Add Chroma support                                                                                                           |
| 0.0.4   | 2023-07-21 | [#28556](https://github.com/airbytehq/airbyte/pull/28556) | Correctly dedupe records with composite and nested primary keys                                                              |
| 0.0.3   | 2023-07-20 | [#28509](https://github.com/airbytehq/airbyte/pull/28509) | Change the base image to python:3.9-slim to fix build                                                                        |
| 0.0.2   | 2023-07-18 | [#26184](https://github.com/airbytehq/airbyte/pull/28398) | Adjust python dependencies and release on cloud                                                                              |
| 0.0.1   | 2023-07-12 | [#26184](https://github.com/airbytehq/airbyte/pull/26184) | Initial release                                                                                                              |

</details>
