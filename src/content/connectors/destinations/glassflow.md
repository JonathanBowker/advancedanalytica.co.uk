---
generated_record: true
connector_name: GlassFlow
connector_type: destination
connector_slug: glassflow
connector_directory: destination-glassflow
definition_id: 6af33483-3956-4fea-a38c-04d136e90fa8
version: 0.1.7
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/glassflow
logo: /images/connectors/destinations/glassflow.svg
logo_source_path: airbyte-integrations/connectors/destination-glassflow/icon.svg
logo_sha256: dc99678c874f0c06b927f0d61e15eab884262681668ced631bf09306d6118969
original_metadata_path: airbyte-integrations/connectors/destination-glassflow/metadata.yaml
original_metadata_sha256: 5f1c4386674e2796d14308094f8c238918cd80df5f2b39fade75d917ff51aa1c
original_document_path: docs/integrations/destinations/glassflow.md
original_document_sha256: b2d7f3e99b2cba677afd13c80b107357b36d9af6254c83c0db5972c7a0da18d8
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a03118c103387098da242b3d81ff227b6f4256c5b1c857e099169920aa2f9896
rewritten_at: 2026-11-12T14:03:56.347083+00:00
---

# GlassFlow

:::warning

## Deprecation

The GlassFlow destination connector is archived and no longer available in the Airbyte connector catalogue. GlassFlow's legacy serverless pipeline product is [is no longer available](https://www.glassflow.dev/blog/glassflow-vs-other-serverless-solutions). The `api.glassflow.dev` host used by this connector no longer resolves.

GlassFlow's current products don't provide a compatible replacement for this connector's pipeline publishing API. Existing pipeline IDs and access tokens can't restore connectivity. Choose another supported destination or assess a new integration using [GlassFlow's current documentation](https://docs.glassflow.ai/).

:::

## Overview

The GlassFlow destination lets you send or stream data to a GlassFlow pipeline. GlassFlow is a serverless, Python-centric data streaming platform. It transforms data in real time for end-to-end data pipelines.

### Sync overview

#### Output schema

Each stream outputs a GlassFlow message with these properties:

- `stream`: the name of the stream that the data comes from.
- `namespace`: the namespace, if available from the stream.
- `emitted_at`: the timestamp when the `AirbyteRecord` was emitted.
- `data`: `AirbyteRecord` data.

The message is serialised as JSON.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | No |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started

### Requirements

To use the GlassFlow destination, you'll need:

- A GlassFlow pipeline_id and pipeline_access_token for publishing messages.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date              | Pull Request                                              | Subject                                         |
|:--------|:------------------| :-------------------------------------------------------- | :---------------------------------------------- |
| 0.1.7 | 2026-10-07 | [88287](https://github.com/airbytehq/airbyte/pull/88287) | Archive connector for the discontinued GlassFlow serverless pipeline API |
| 0.1.6 | 2025-05-03 | [59349](https://github.com/airbytehq/airbyte/pull/59349) | Update dependencies |
| 0.1.5 | 2025-04-26 | [58697](https://github.com/airbytehq/airbyte/pull/58697) | Update dependencies |
| 0.1.4 | 2025-04-19 | [58260](https://github.com/airbytehq/airbyte/pull/58260) | Update dependencies |
| 0.1.3 | 2025-04-12 | [57645](https://github.com/airbytehq/airbyte/pull/57645) | Update dependencies |
| 0.1.2 | 2025-04-05 | [57127](https://github.com/airbytehq/airbyte/pull/57127) | Update dependencies |
| 0.1.1 | 2025-03-29 | [56578](https://github.com/airbytehq/airbyte/pull/56578) | Update dependencies |
| 0.1.0   | September 01, 2024 | [\#7560](https://github.com/airbytehq/airbyte/pull/7560)  | Initial release                                 |

</details>
