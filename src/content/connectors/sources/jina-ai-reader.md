---
generated_record: true
connector_name: Jina AI Reader
connector_type: source
connector_slug: jina-ai-reader
connector_directory: source-jina-ai-reader
definition_id: 47077a7f-7ab0-47ee-b428-650396a708c7
version: 0.1.41
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/jina-ai-reader
logo: /images/connectors/sources/jina-ai-reader.svg
logo_source_path: airbyte-integrations/connectors/source-jina-ai-reader/icon.svg
logo_sha256: 98babce5e01d02337bd0951a8eca5486e07f201bd604a37a175bae4802685247
original_metadata_path: airbyte-integrations/connectors/source-jina-ai-reader/metadata.yaml
original_metadata_sha256: 2d57d449db69aef18c87924981960d88d8aaa3803354ec262f3484f04b9679b3
original_document_path: docs/integrations/sources/jina-ai-reader.md
original_document_sha256: 5a46353ddff0659e725db03c7e1955a485adefb77891cc5d144536f9bf88cd1e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7a4e87ae6f735fbd398a828d259107f7659eab66ec011f99381366d0d5a4297c
rewritten_at: 2026-11-12T13:43:48.525220+00:00
---

# Jina AI Reader

## Overview

This connector gives you access to the [Jina Reader API](https://jina.ai/reader/) in two modes:
- **"Reader" Mode** (`https://r.jina.api`) - Provide one or more URLs to receive each page's content as Markdown text. The Reader endpoint extracts a URL's core content and converts it into clean, LLM-friendly text. This provides high-quality input for your agent and RAG systems.
- **"Search" Mode** (`https://s.jina.api`) - This works like the Reader endpoint but accepts a search prompt. It returns text from the top 5 search results.
Both API endpoints produce human-readable Markdown. Downstream LLM and GenAI applications can also process it efficiently.
You can use both modes in the same sync by following the configuration instructions below.

### Available streams

The read output depends on the input content, but the response uses the same JSON format.
Example:

- [Reader](https://r.jina.ai/https://example.com)
- [Search](https://s.jina.ai/When%20was%20Jina%20AI%20founded%3F)

In these links, replace the substring after the base URL `https://r.jina.ai/` or `https://s.jina.ai/` with the URL or search prompt.

If you'd like support for more endpoints, please [Create an 
issue.](https://github.com/airbytehq/airbyte/issues/new/choose)

### Features

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| SSL connection    | Yes        |
| Namespaces        | No         |

## Get started

### Requirements

- Jina AI Bearer Token (For higher rate limits)
- Reader URL
- Search prompt

### Setup guide

For the complete guide to pricing and tokens, go to `https://jina.ai/reader/#apiform`.
The website also provides a free bearer token for testing through its interface.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                              |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------- |
| 0.1.41 | 2026-10-20 | [89549](https://github.com/airbytehq/airbyte/pull/89549) | Upgrade to airbyte-cdk 7 and Python 3.13 base image 4.1.1 |
| 0.1.40 | 2025-05-24 | [59867](https://github.com/airbytehq/airbyte/pull/59867) | Update dependencies |
| 0.1.39 | 2025-05-03 | [59263](https://github.com/airbytehq/airbyte/pull/59263) | Update dependencies |
| 0.1.38 | 2025-04-26 | [58816](https://github.com/airbytehq/airbyte/pull/58816) | Update dependencies |
| 0.1.37 | 2025-04-12 | [57710](https://github.com/airbytehq/airbyte/pull/57710) | Update dependencies |
| 0.1.36 | 2025-04-05 | [57056](https://github.com/airbytehq/airbyte/pull/57056) | Update dependencies |
| 0.1.35 | 2025-03-29 | [56693](https://github.com/airbytehq/airbyte/pull/56693) | Update dependencies |
| 0.1.34 | 2025-03-22 | [56076](https://github.com/airbytehq/airbyte/pull/56076) | Update dependencies |
| 0.1.33 | 2025-03-08 | [55456](https://github.com/airbytehq/airbyte/pull/55456) | Update dependencies |
| 0.1.32 | 2025-03-01 | [54822](https://github.com/airbytehq/airbyte/pull/54822) | Update dependencies |
| 0.1.31 | 2025-02-22 | [54367](https://github.com/airbytehq/airbyte/pull/54367) | Update dependencies |
| 0.1.30 | 2025-02-15 | [53789](https://github.com/airbytehq/airbyte/pull/53789) | Update dependencies |
| 0.1.29 | 2025-02-01 | [52766](https://github.com/airbytehq/airbyte/pull/52766) | Update dependencies |
| 0.1.28 | 2025-01-25 | [52218](https://github.com/airbytehq/airbyte/pull/52218) | Update dependencies |
| 0.1.27 | 2025-01-11 | [51164](https://github.com/airbytehq/airbyte/pull/51164) | Update dependencies |
| 0.1.26 | 2025-01-04 | [50892](https://github.com/airbytehq/airbyte/pull/50892) | Update dependencies |
| 0.1.25 | 2024-12-28 | [50618](https://github.com/airbytehq/airbyte/pull/50618) | Update dependencies |
| 0.1.24 | 2024-12-21 | [50115](https://github.com/airbytehq/airbyte/pull/50115) | Update dependencies |
| 0.1.23 | 2024-12-14 | [49274](https://github.com/airbytehq/airbyte/pull/49274) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.22 | 2024-12-12 | [48929](https://github.com/airbytehq/airbyte/pull/48929) | Update dependencies |
| 0.1.21 | 2024-11-04 | [48170](https://github.com/airbytehq/airbyte/pull/48170) | Update dependencies |
| 0.1.20 | 2024-10-28 | [47085](https://github.com/airbytehq/airbyte/pull/47085) | Update dependencies |
| 0.1.19 | 2024-10-12 | [46768](https://github.com/airbytehq/airbyte/pull/46768) | Update dependencies |
| 0.1.18 | 2024-10-05 | [46446](https://github.com/airbytehq/airbyte/pull/46446) | Update dependencies |
| 0.1.17 | 2024-09-28 | [46205](https://github.com/airbytehq/airbyte/pull/46205) | Update dependencies |
| 0.1.16 | 2024-09-21 | [45827](https://github.com/airbytehq/airbyte/pull/45827) | Update dependencies |
| 0.1.15 | 2024-09-14 | [45565](https://github.com/airbytehq/airbyte/pull/45565) | Update dependencies |
| 0.1.14 | 2024-09-07 | [45286](https://github.com/airbytehq/airbyte/pull/45286) | Update dependencies |
| 0.1.13 | 2024-08-31 | [45015](https://github.com/airbytehq/airbyte/pull/45015) | Update dependencies |
| 0.1.12 | 2024-08-24 | [44641](https://github.com/airbytehq/airbyte/pull/44641) | Update dependencies |
| 0.1.11 | 2024-08-17 | [44235](https://github.com/airbytehq/airbyte/pull/44235) | Update dependencies |
| 0.1.10 | 2024-08-12 | [43916](https://github.com/airbytehq/airbyte/pull/43916) | Update dependencies |
| 0.1.9 | 2024-08-10 | [43469](https://github.com/airbytehq/airbyte/pull/43469) | Update dependencies |
| 0.1.8 | 2024-08-03 | [43126](https://github.com/airbytehq/airbyte/pull/43126) | Update dependencies |
| 0.1.7 | 2024-07-27 | [42675](https://github.com/airbytehq/airbyte/pull/42675) | Update dependencies |
| 0.1.6 | 2024-07-20 | [42361](https://github.com/airbytehq/airbyte/pull/42361) | Update dependencies |
| 0.1.5 | 2024-07-13 | [41692](https://github.com/airbytehq/airbyte/pull/41692) | Update dependencies |
| 0.1.4 | 2024-07-10 | [41594](https://github.com/airbytehq/airbyte/pull/41594) | Update dependencies |
| 0.1.3 | 2024-07-09 | [41245](https://github.com/airbytehq/airbyte/pull/41245) | Update dependencies |
| 0.1.2 | 2024-07-06 | [40880](https://github.com/airbytehq/airbyte/pull/40880) | Update dependencies |
| 0.1.1 | 2024-06-25 | [40359](https://github.com/airbytehq/airbyte/pull/40359) | Update dependencies |
| 0.1.0 | 2024-06-25 | [39515](https://github.com/airbytehq/airbyte/pull/39515) | Add Jina AI source |

</details>
