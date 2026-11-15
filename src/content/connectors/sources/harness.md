---
generated_record: true
connector_name: Harness
connector_type: source
connector_slug: harness
connector_directory: source-harness
definition_id: b0e46f61-e143-47cc-a595-4bb73bfa8a15
version: 0.2.10
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/harness
logo: /images/connectors/sources/harness.svg
logo_source_path: airbyte-integrations/connectors/source-harness/icon.svg
logo_sha256: 863051fe583c00993a25e75fc323bb8d87ace503fb8ef7d49b92cfb4fe997e8d
original_metadata_path: airbyte-integrations/connectors/source-harness/metadata.yaml
original_metadata_sha256: 6c5eb5df235440dd850f5d5537df042331bc81f4e20015cfe0328ffd0abd7fed
original_document_path: docs/integrations/sources/harness.md
original_document_sha256: 267309213b854e61a789c9e0defcc7c634a5a484c30b7a521460e31bd509d267
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 377de5bec522ca2c6ebcb64b86e4b45268508c543ac39ed697c0eacecd9fa518
rewritten_at: 2026-11-12T13:42:08.335999+00:00
---

# Harness

## Overview

The Harness source was migrated from [Faros
AI](https://github.com/faros-ai/airbyte-connectors/tree/main/sources/harness-source).
For faster maintainer responses, file support requests in that repository.
The source supports Full Refresh and Incremental syncs.
You can copy only new or updated data, or every row in the tables and columns configured for replication.
This choice applies each time a sync runs.

### Output schema

This source currently provides one stream:

- [Organization](https://apidocs.harness.io/tag/Organization#operation/getOrganizationList)

To request support for more endpoints from Faros AI, please [create an
issue.](https://github.com/faros-ai/airbyte-connectors/issues/new)

### Features

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| SSL connection    | No         |
| Namespaces        | No         |

### Performance

Under normal usage, the Harness source shouldn't encounter Harness API limits.
Please [create an
issue](https://github.com/faros-ai/airbyte-connectors/issues/new) if rate limit issues aren't retried successfully and resolved automatically.

## Get started

### Requirements

- Harness Account Id
- Harness API Key
- Harness API URL, if using a self-hosted Harness instance

Follow the [their documentation for generating a Harness API
Key](https://ngdocs.harness.io/article/tdoad7xrh9-add-and-manage-api-keys#harness_api_key).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                   | Subject                                              |
| :------ | :--------- | :------------------------------------------------------------- | :--------------------------------------------------- |
| 0.2.10 | 2025-05-24 | [60735](https://github.com/airbytehq/airbyte/pull/60735) | Update dependencies |
| 0.2.9 | 2025-05-10 | [59259](https://github.com/airbytehq/airbyte/pull/59259) | Update dependencies |
| 0.2.8 | 2025-04-26 | [58803](https://github.com/airbytehq/airbyte/pull/58803) | Update dependencies |
| 0.2.7 | 2025-04-19 | [58194](https://github.com/airbytehq/airbyte/pull/58194) | Update dependencies |
| 0.2.6 | 2025-04-12 | [57723](https://github.com/airbytehq/airbyte/pull/57723) | Update dependencies |
| 0.2.5 | 2025-04-05 | [57084](https://github.com/airbytehq/airbyte/pull/57084) | Update dependencies |
| 0.2.4 | 2025-03-29 | [56676](https://github.com/airbytehq/airbyte/pull/56676) | Update dependencies |
| 0.2.3 | 2025-03-22 | [56037](https://github.com/airbytehq/airbyte/pull/56037) | Update dependencies |
| 0.2.2 | 2025-03-08 | [55506](https://github.com/airbytehq/airbyte/pull/55506) | Update dependencies |
| 0.2.1 | 2025-03-01 | [43874](https://github.com/airbytehq/airbyte/pull/43874) | Update dependencies |
| 0.2.0 | 2024-10-05 | [46485](https://github.com/airbytehq/airbyte/pull/46485) | Migrate to Manifest-only |
| 0.1.10 | 2024-08-03 | [43172](https://github.com/airbytehq/airbyte/pull/43172) | Update dependencies |
| 0.1.9 | 2024-07-27 | [42735](https://github.com/airbytehq/airbyte/pull/42735) | Update dependencies |
| 0.1.8 | 2024-07-20 | [42221](https://github.com/airbytehq/airbyte/pull/42221) | Update dependencies |
| 0.1.7 | 2024-07-13 | [41851](https://github.com/airbytehq/airbyte/pull/41851) | Update dependencies |
| 0.1.6 | 2024-07-10 | [41426](https://github.com/airbytehq/airbyte/pull/41426) | Update dependencies |
| 0.1.5 | 2024-07-09 | [41101](https://github.com/airbytehq/airbyte/pull/41101) | Update dependencies |
| 0.1.4 | 2024-07-06 | [40788](https://github.com/airbytehq/airbyte/pull/40788) | Update dependencies |
| 0.1.3 | 2024-06-25 | [40464](https://github.com/airbytehq/airbyte/pull/40464) | Update dependencies |
| 0.1.2 | 2024-06-22 | [40051](https://github.com/airbytehq/airbyte/pull/40051) | Update dependencies |
| 0.1.1 | 2024-05-20 | [38392](https://github.com/airbytehq/airbyte/pull/38392) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2023-10-10 | [31103](https://github.com/airbytehq/airbyte/pull/31103) | Migrate to low code |
| 0.1.23  | 2021-11-16 | [153](https://github.com/faros-ai/airbyte-connectors/pull/153) | Add Harness source and Faros destination's converter |

</details>
