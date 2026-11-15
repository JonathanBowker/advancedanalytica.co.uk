---
generated_record: true
connector_name: MeiliSearch
connector_type: destination
connector_slug: meilisearch
connector_directory: destination-meilisearch
definition_id: af7c921e-5892-4ff2-b6c1-4a5ab258fb7e
version: 1.0.25
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/meilisearch
logo: null
logo_source_path: null
logo_sha256: null
original_metadata_path: airbyte-integrations/connectors/destination-meilisearch/metadata.yaml
original_metadata_sha256: 764d4f0073b81ef2e220c028a96b0e3c379bfe40feaf6c0441c799dbdd6dab99
original_document_path: docs/integrations/destinations/meilisearch.md
original_document_sha256: 039d679b0fa305a9a46c1b1eaf1b4604e9fc087698e48a14e786d382d1f39599
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: da2a1c2e2826cde6e2692fee8da7b7d39bc4013224dc15a7c5ff2d42064fc313
rewritten_at: 2026-11-12T13:24:55.529025+00:00
---

# MeiliSearch

## Overview

The Airbyte MeilSearch destination syncs your data to MeiliSearch. MeiliSearch helps non-developers search data without SQL.

### Sync overview

#### Output schema

Each stream is output to its own MeiliSearch index. Each table uses the stream name, with all non-alphanumeric characters removed. It contains one column for each top-level field in the stream. It also contains a table called `_ab_pk`. Airbyte uses this column internally to prevent records from being overwritten. You can ignore it.

#### Features

| Feature                        | Supported?\(Yes/No\) | Notes |
| :----------------------------- | :------------------- | :---- |
| Full Refresh Sync              | Yes                  |       |
| Incremental - Append Sync      | Yes                  |       |
| Incremental - Append + Deduped | No                   |       |
| Namespaces                     | No                   |       |

## Getting started

### Requirements

You'll need an existing MeiliSearch instance to use the MeiliSearch destination. You can learn how to create one in the [MeiliSearch docs](https://www.meilisearch.com/docs/learn/getting_started/installation).

### Setup guide

Setup requires two fields. First, enter the `host` where MeiliSearch can be reached. When running on localhost, the default address is `http://localhost:7700`. You must include the protocol. Second, enter the API key. Leave this field blank if your MeiliSearch instance has no API key. If it has one, follow [instructions](https://docs.meilisearch.com/reference/features/authentication.html#master-key) in the MeiliSearch docs to find your API value.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                |
| :------ | :--------- | :-------------------------------------------------------- | :----------------------------------------------------- |
| 1.0.25 | 2025-05-10 | [59837](https://github.com/airbytehq/airbyte/pull/59837) | Update dependencies |
| 1.0.24 | 2025-05-03 | [59302](https://github.com/airbytehq/airbyte/pull/59302) | Update dependencies |
| 1.0.23 | 2025-04-26 | [58742](https://github.com/airbytehq/airbyte/pull/58742) | Update dependencies |
| 1.0.22 | 2025-04-12 | [57603](https://github.com/airbytehq/airbyte/pull/57603) | Update dependencies |
| 1.0.21 | 2025-04-05 | [57137](https://github.com/airbytehq/airbyte/pull/57137) | Update dependencies |
| 1.0.20 | 2025-03-29 | [56616](https://github.com/airbytehq/airbyte/pull/56616) | Update dependencies |
| 1.0.19 | 2025-03-22 | [56153](https://github.com/airbytehq/airbyte/pull/56153) | Update dependencies |
| 1.0.18 | 2025-03-08 | [55372](https://github.com/airbytehq/airbyte/pull/55372) | Update dependencies |
| 1.0.17 | 2025-03-01 | [54896](https://github.com/airbytehq/airbyte/pull/54896) | Update dependencies |
| 1.0.16 | 2025-02-22 | [54221](https://github.com/airbytehq/airbyte/pull/54221) | Update dependencies |
| 1.0.15 | 2025-02-15 | [53896](https://github.com/airbytehq/airbyte/pull/53896) | Update dependencies |
| 1.0.14 | 2025-02-01 | [52876](https://github.com/airbytehq/airbyte/pull/52876) | Update dependencies |
| 1.0.13 | 2025-01-25 | [52206](https://github.com/airbytehq/airbyte/pull/52206) | Update dependencies |
| 1.0.12 | 2025-01-11 | [51270](https://github.com/airbytehq/airbyte/pull/51270) | Update dependencies |
| 1.0.11 | 2025-01-04 | [50909](https://github.com/airbytehq/airbyte/pull/50909) | Update dependencies |
| 1.0.10 | 2024-12-28 | [50460](https://github.com/airbytehq/airbyte/pull/50460) | Update dependencies |
| 1.0.9 | 2024-12-21 | [50196](https://github.com/airbytehq/airbyte/pull/50196) | Update dependencies |
| 1.0.8 | 2024-12-14 | [49550](https://github.com/airbytehq/airbyte/pull/49550) | Update dependencies |
| 1.0.7 | 2024-12-11 | [49021](https://github.com/airbytehq/airbyte/pull/49021) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 1.0.6 | 2024-11-04 | [48207](https://github.com/airbytehq/airbyte/pull/48207) | Update dependencies |
| 1.0.5 | 2024-10-29 | [47889](https://github.com/airbytehq/airbyte/pull/47889) | Update dependencies |
| 1.0.4 | 2024-10-28 | [47646](https://github.com/airbytehq/airbyte/pull/47646) | Update dependencies |
| 1.0.3   | 2024-07-08 | [#TODO](https://github.com/airbytehq/airbyte/pull/TODO) | Switching to Poetry and base image                                   |
| 1.0.2   | 2024-03-05 | [#35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector                                   |
| 1.0.1   | 2023-12-19 | [27692](https://github.com/airbytehq/airbyte/pull/27692)  | Fix incomplete data indexing                           |
| 1.0.0   | 2022-10-26 | [18036](https://github.com/airbytehq/airbyte/pull/18036)  | Migrate MeiliSearch to Python CDK                      |
| 0.2.13  | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864)  | Updated stacktrace format for any trace message errors |
| 0.2.12  | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256)  | Add `-XX:+ExitOnOutOfMemoryError` JVM option           |
| 0.2.11  | 2021-12-28 | [9156](https://github.com/airbytehq/airbyte/pull/9156)    | Update connector fields title/description              |

</details>
