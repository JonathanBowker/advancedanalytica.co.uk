---
generated_record: true
connector_name: PGVector
connector_type: destination
connector_slug: pgvector
connector_directory: destination-pgvector
definition_id: e0e06cd9-57a9-4d39-b032-bedd874ae875
version: 0.1.13
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/destinations/pgvector
logo: /images/connectors/destinations/pgvector.svg
logo_source_path: airbyte-integrations/connectors/destination-pgvector/icon.svg
logo_sha256: d05b5e7444dc3c3ce5c1b53f622bb3d6d885e6fdbf033b8e59db1d72e9da7f86
original_metadata_path: airbyte-integrations/connectors/destination-pgvector/metadata.yaml
original_metadata_sha256: e0b03fecbd71aa315aa005279e180f397182b21f47db6f9a59593b64fd63ade9
original_document_path: docs/integrations/destinations/pgvector.md
original_document_sha256: 9d2817cfb4ab734c60e522ed7380aeb64732311abc6ab39693118e471676d6ec
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 417f796ba988dfb21b3ed9ea9854564c00ae5f1804c0ad0866c45f6025072a98
rewritten_at: 2026-11-12T13:26:19.927808+00:00
---

# PGVector destination

## Overview

This page shows you how to set up the PGVector destination connector.

The setup has three parts:
* Processing: Split individual records into chunks that fit the context window. Choose which fields provide context and which provide supplementary metadata.
* Embedding: Convert the text into a vector representation with a pre-trained model. Currently supported:
  * OpenAI's `text-embedding-ada-002`
  * Cohere's `embed-english-light-v2.0`
  * Azure OpenAI
  * Fake `random vectors with 1536 embedding dimensions`
  * OpenAI-compatible
  * Coming soon: Hugging Face's `e5-base-v2`.
* Postgres Connection: Choose where to store the vectors. This configures a vector store using Postgres tables with the `VECTOR` data type, enabled by installing pgvector.

## Prerequisites

To use the PGVector destination, you'll need:

- An account with API access for your chosen embedding method.
- A Postgres DB with support for [pgvector](https://github.com/pgvector/pgvector).

You'll need this information to configure the destination:

- **Embedding service API Key**: The API key for your embedding account, plus any other parameters required by your model.
- **Port**: The port number where the server listens. The default is the PostgreSQL™ standard port number (5432).
- **Username**
- **Password**
- **Default Schema Name**: Specify the schema, or several comma-separated schemas, for the search-path. These schemas resolve unqualified object names in statements executed over this connection.
- **Database**: The database name. By default, the connector uses a database matching the user name.

#### Configure network access

Make sure Airbyte can access your Postgres database. If your database is in a VPC, allow access from the IP exposing Airbyte.

## Step 1: Set up Postgres

#### **Permissions**

You need a Postgres user with these permissions:

- Can create tables and write rows.
- Can create schemas, for example:

Run the following command to create this user:

```
CREATE USER airbyte_user WITH PASSWORD '<password>';
GRANT CREATE, TEMPORARY ON DATABASE <database> TO airbyte_user;
```

You can use an existing user. However, creating a dedicated Airbyte user is highly recommended.

Enable the extension. You can find the [official documentation](https://github.com/pgvector/pgvector) here.
```
CREATE EXTENSION vector;
```
## Step 2: Set up the PGVector connector in Airbyte

#### Target Database

Choose an existing database or create one to store data synced from Airbyte.

## Naming conventions

From
[Postgres SQL Identifiers syntax](https://www.postgresql.org/docs/9.0/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS):

- SQL identifiers and key words must start with a letter or an underscore \(\_\). Letters include a-z, letters with diacritical marks and non-Latin letters.
- Later characters can be letters, underscores, digits \(0-9\) or dollar signs \($\).

  The SQL standard doesn't allow dollar signs in identifiers, so using them may make applications less portable. The standard won't define key words containing digits or starting or ending with an underscore. These identifiers are therefore safe from potential conflicts with future extensions to the standard.

- The system uses no more than NAMEDATALEN-1 bytes of an identifier. You can write longer names in commands, but the system truncates them. NAMEDATALEN is 64 by default, so identifiers can contain up to 63 bytes.
- Quoted identifiers can contain any character except the character with code zero. \(To include a double quote, write two double quotes.\) This supports table or column names that otherwise aren't possible, including names with spaces or ampersands. The length limit still applies.
- Quoted identifiers are case-sensitive. Unquoted names are always folded to lower case.
- Use consistent quoting for each name to make your applications more portable and less error-prone. Either always quote a name or never quote it.

:::info

The Airbyte Postgres destination creates raw tables and schemas using Unquoted identifiers. It replaces any special characters with underscores. It creates all final tables and corresponding columns using Quoted identifiers, preserving case sensitivity. It replaces special characters in final tables with underscores.

:::

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Destinations**. In the top-right corner, click **new destination**.
3. On the Set up the destination page, name the PGVector connector. Then select **Postgres** from the Destination type dropdown.
4. Enter a name for your source.
5. Enter the processing information.
6. Enter the embedding information.
7. For **Host**, **Port** and **DB Name**, enter your Postgres database's hostname, port number and name.
8. Enter the **Default Schemas**.

:::note

Schema names are case-sensitive. The 'public' schema is set by default.

:::

7. For **User** and **Password**, enter the username and password you created in [Step 1](#step-1-optional-create-a-dedicated-read-only-user).

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Data type mapping

Metadata fields are stored in the document's metadata object and can support filtering. Metadata fields can use these data types:
* String
* Number (integer or floating point, converted to a 64-bit floating point)
* Booleans (true, false)
* List of String

The connector ignores all other fields.

## Configuration

### Processing

The connector splits each record into text and meta fields, as configured in the "Processing" section. It combines all text fields into one string, then splits that string into chunks of the configured length. When specified, metadata fields are stored unchanged alongside the embedded text chunks. Metadata fields only support filtering, not retrieval. They must be strings, numbers or booleans. The connector ignores all other values. The _total_ metadata saved for each entry has a 40kb limit. Chunking configuration uses the [Langchain Python library](https://python.langchain.com/docs/get_started/introduction).

Use dot notation to access nested record fields when specifying text fields. For example, `user.name` accesses the `name` field in the `user` object. You can also use wildcards to access every field in an object. For example, `users.*.name` accesses all `names` fields in every entry of the `users` array.

The `tiktoken` library measures chunk length in tokens. The maximum is 8191 tokens, matching the maximum length supported by the `text-embedding-ada-002` model.

Each document includes the stream name in the `_ab_stream` metadata field. When available, the record's primary key identifies the document and prevents duplication when updated records are indexed. The primary key is added as the `_ab_record_id` metadata field.

### Embedding

The connector supports these embedding methods:

1. OpenAI: Using [OpenAI API](https://beta.openai.com/docs/api-reference/text-embedding), the connector creates embeddings with the `text-embedding-ada-002` model and **1536 dimensions**. The [speed of the OpenAI embedding API](https://platform.openai.com/docs/guides/rate-limits/overview) constrains this integration.

2. Cohere: Using the [Cohere API](https://docs.cohere.com/reference/embed), the connector creates embeddings with the `embed-english-light-v2.0` model and **1024 dimensions**.

For testing, you can also use the [Fake embeddings](https://python.langchain.com/docs/modules/data_connection/text_embedding/integrations/fake) integration. It generates random embeddings for testing a data pipeline without incurring embedding costs.

### Indexing and data storage

- For **Host**, **Port** and **DB Name**, enter your Postgres database's hostname, port number and name.
- List the **Default Schemas**.

Each stream is indexed and stored in a table with the same name. The connector creates the table if it doesn't exist. The table contains these columns:
- document_id (string): The document's unique identifier, created by appending the primary keys in the stream schema.
- chunk_id (string): The chunk's unique identifier, created by appending the chunk number to the document_id.
- metadata (variant): The document's metadata, stored as key-value pairs.
- document_content (string): The chunk's text content.
- embedding (vector): The chunk's embedding, stored as a list of floats.

## Limitations and troubleshooting

### psycopg2.OperationalError could not translate host name something@hostname to address

If your password contains `@`, the connection string may not be created correctly because this character is reserved. If so, replace `@` with `%40`, the equivalent UTF-8 character, so authentication works correctly.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                  | Subject                                                                                                                                              |
|:--------| :--------- |:--------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 0.1.13 | 2026-10-07 | [88165](https://github.com/airbytehq/airbyte/pull/88165) | Remove the ruff dev dependency so connector CI formats with the repository ruff version |
| 0.1.12 | 2026-08-13 | [84364](https://github.com/airbytehq/airbyte/pull/84364) | Update the CDK to remediate CVE-2025-68664 in the langchain dependency |
| 0.1.11 | 2026-07-02 | [81384](https://github.com/airbytehq/airbyte/pull/81384) | Upgrade pillow from 11.x to 12.3.0 to resolve security vulnerabilities GHSA-cfh3-3jmp-rvhc, GHSA-pwv6-vv43-88gr, GHSA-whj4-6x5x-4v2j, GHSA-xg8h-j46f-w952 |
| 0.1.10 | 2026-07-02 | [81395](https://github.com/airbytehq/airbyte/pull/81395) | Bump aiohttp to >= 3.13.3 to resolve GHSA-6mq8-rvhq-8wgg |
| 0.1.9 | 2026-03-31 | [75645](https://github.com/airbytehq/airbyte/pull/75645) | Bump version to force registry update for supportLevel change to community |
| 0.1.8 | 2025-10-21 | [68347](https://github.com/airbytehq/airbyte/pull/68347) | Update dependencies |
| 0.1.7 | 2025-10-14 | [67996](https://github.com/airbytehq/airbyte/pull/67996) | Update dependencies |
| 0.1.6 | 2025-10-07 | [67175](https://github.com/airbytehq/airbyte/pull/67175) | Update dependencies |
| 0.1.5 | 2025-09-30 | [65045](https://github.com/airbytehq/airbyte/pull/65045) | Update dependencies |
| 0.1.4 | 2025-07-05 | [61623](https://github.com/airbytehq/airbyte/pull/61623) | Update dependencies |
| 0.1.3 | 2025-05-17 | [51728](https://github.com/airbytehq/airbyte/pull/51728) | Update dependencies |
| 0.1.2 | 2025-01-11 | [45767](https://github.com/airbytehq/airbyte/pull/45767) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.1   | 2024-09-23 | [#45636](https://github.com/airbytehq/airbyte/pull/45636)     | Add default values for default_schema and port.
| 0.1.0   | 2024-09-16 | [#45428](https://github.com/airbytehq/airbyte/pull/45428)     | Add support for PGVector as a Vector destination.

</details>
