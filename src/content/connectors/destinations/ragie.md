---
generated_record: true
connector_name: Ragie
connector_type: destination
connector_slug: ragie
connector_directory: destination-ragie
definition_id: 08361b9d-8d84-40fc-bdbb-ee497691b3e8
version: 0.1.1
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/ragie
logo: /images/connectors/destinations/ragie.svg
logo_source_path: airbyte-integrations/connectors/destination-ragie/icon.svg
logo_sha256: a07b5be03635c5d5e65c2b86677f828aaf2d41e077b8fb9f4cf6cfcea73009ea
original_metadata_path: airbyte-integrations/connectors/destination-ragie/metadata.yaml
original_metadata_sha256: f36beaf991680dab9dbfe6e88a4ca0c63971b5724e0718bcb9264a9832ab1d60
original_document_path: docs/integrations/destinations/ragie.md
original_document_sha256: 2ef4847c9dfa50b6536542019b9ee03dab337eb248bb59791bad5e2157c8a9da
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1b7e0488a7547a53c53d4cecc95247ce78c760f9449fedf001a29ab5b94877a9
rewritten_at: 2026-11-12T13:26:34.556139+00:00
---

# Ragie

## Overview

The **Ragie destination connector** sends data from any Airbyte source to [Ragie.ai](https://www.ragie.ai), a platform for semantic search, vector storage and AI-powered document retrieval.

The connector turns your records into documents. It ingests them into Ragie’s vector index through its API. You can map metadata, name documents and remove duplicates using external IDs.

---

## Features

- Extracts vector content from your specified fields.
- Attaches custom or static metadata to each document.
- Assigns document names and external IDs.
- Supports partitioning across multiple datasets (indexes).

---

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Prerequisites

- A [Ragie.ai](https://www.ragie.ai) account.
- A valid **API Key** (from the [Ragie Dashboard](https://app.ragie.ai)).
- Your desired data schema and field mappings.

---

## Set up the connector

### 1. Configure Airbyte

Go to **Destinations → + New Destination → Ragie**.

### 2. Complete the fields

| Field | Description | Required |
|-------|-------------|----------|
| **API Key** | Your secret Ragie API token. | ✅ Yes |
| **Content Fields** | List of field(s) from the record to use as the **main document content** (text). If empty, the whole record is used. Supports dot notation. | ⛔ Optional |
| **Metadata Fields** | Field(s) to include as metadata. Use dot notation for nested fields. | ⛔ Optional |
| **Partition Name** | Name of the partition/index in Ragie to write into. When empty, the connector omits the partition so Ragie writes to its `default` partition. | ⛔ Optional |
| **Mode** | Ingestion mode: `'fast'` (default) or `'hi_res'`. | ✅ Yes |
| **Document Name Field** | Field to use as the document’s display name. Auto-generated if empty. | ⛔ Optional |
| **Static Metadata (JSON)** | JSON string of key-value pairs added to every document’s metadata. | ⛔ Optional |
| **External ID Field** | Field to use as unique document ID (`external_id`) for deduplication. Required for append+dedup mode. | ⛔ Optional |
| **API URL** | URL of Ragie API. Only change if using a private Ragie deployment. Defaults to `https://api.ragie.ai`. | ⛔ Optional |

---

## Sync modes

| Mode | Behavior |
|------|----------|
| **Append** | Adds documents to Ragie. |
| **Overwrite** | Deletes existing documents in the partition before writing. |
| **Append + Dedup** | Uses `external_id_field` to upsert (insert or update) documents. |

---

## Example

### Incoming record
```json
{
  "ticket_id": "1234",
  "description": "The app crashes when I click save.",
  "user": {
    "id": "u_567",
    "email": "alice@example.com"
  }
}
````

### Configuration

```json
{
  "content_fields": ["description"],
  "metadata_fields": ["user.id", "user.email"],
  "document_name_field": "ticket_id",
  "external_id_field": "ticket_id"
}
```

### Resulting document in Ragie

```json
{
  "external_id": "1234",
  "name": "1234",
  "content": "The app crashes when I click save.",
  "metadata": {
    "user.id": "u_567",
    "user.email": "alice@example.com"
  }
}
```

---

## Static metadata

You can add metadata to every document by entering a valid JSON string:

**Example:**

```json
{"source": "airbyte", "env": "prod"}
```

The connector merges this with each document’s metadata.

---

## Error handling

* Validates all fields when connecting.
* Logs errors when you reference invalid content or metadata fields.
* Checks your API credentials and whether the endpoint is reachable.

---

## Limitations

* You must provide an `external_id_field` for deduplication to work.
* Content fields currently support only top-level arrays or objects.
* Ragie currently supports a limited set of ingestion modes (`fast`, `hi_res`).

---

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

| Version | Date | Pull Request | Changes |
| ------- | ---- | ------------ | ------- |
| 0.1.1 | 2026-10-07 | [88292](https://github.com/airbytehq/airbyte/pull/88292) | Fix floating-point metadata writes, omit empty partitions, and stop logging authorization headers. |
| 0.1.0 | | | Initial release with overwrite/append support and field mapping. |

---
