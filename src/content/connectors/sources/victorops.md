---
generated_record: true
connector_name: VictorOps
connector_type: source
connector_slug: victorops
connector_directory: airbyte-victorops-source
definition_id: 7e20ce3e-d820-4327-ad7a-88f3927fd97a
version: 0.1.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/victorops
logo: /images/connectors/sources/victorops.svg
logo_source_path: airbyte-integrations/connectors/third-party/farosai/airbyte-victorops-source/icon.svg
logo_sha256: 1b6caca0d76811f43b0a4c792be37aac50e22facb8002970142868dcd7b42443
original_metadata_path: airbyte-integrations/connectors/third-party/farosai/airbyte-victorops-source/metadata.yaml
original_metadata_sha256: 8e7a0837c6f5d16271f03ce43cb10a3489d01e71799ce579ad0b17a21a07e6f6
original_document_path: docs/integrations/sources/victorops.md
original_document_sha256: 03d00e522022ca74ed3166a8c68f00fbbaca856a79ad3e9e63960ccc26dd9bec
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 86540613c8190d30309606f608564c26f4fc15286540d01831d3e86d08d362fd
rewritten_at: 2026-11-12T13:59:57.429425+00:00
---

# VictorOps

## Overview

The VictorOps source, now named Splunk On-Call, is maintained by [Faros
AI](https://github.com/faros-ai/airbyte-connectors/tree/main/sources/victorops-source).
File support requests in that repository to help the maintainers respond faster.
The source supports Full Refresh and Incremental syncs.
For each sync, you can copy only new or updated data, or every configured table row and column.

### Output schema

This source provides several output streams:

- [Incidents](https://portal.victorops.com/public/api-docs.html#!/Reporting/get_api_reporting_v2_incidents) \(Incremental\)
- [Teams](https://portal.victorops.com/public/api-docs.html#!/Teams/get_api_public_v1_team)
- [Users](https://portal.victorops.com/public/api-docs.html#!/Users/get_api_public_v1_user)

If you'd like Faros AI to support more endpoints, please [create an
issue.](https://github.com/faros-ai/airbyte-connectors/issues/new)

### Features

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |
| SSL connection    | Yes        |
| Namespaces        | No         |

### Performance

Under normal use, the VictorOps source shouldn't encounter VictorOps API limits.
However, your VictorOps account may limit the total number of monthly API calls.
Please [create an
issue](https://github.com/faros-ai/airbyte-connectors/issues/new) if you encounter rate limit issues that automatic retries don't resolve.

## Get started

### Requirements

- VictorOps API ID
- VictorOps API Key

Follow the [their documentation for generating a VictorOps API
Key](https://help.victorops.com/knowledge-base/api/).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                   | Subject                                                |
| :------ | :--------- | :------------------------------------------------------------- | :----------------------------------------------------- |
| 0.1.23  | 2021-11-17 | [150](https://github.com/faros-ai/airbyte-connectors/pull/150) | Add VictorOps source and Faros destination's conterter |

</details>
