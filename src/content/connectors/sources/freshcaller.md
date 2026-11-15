---
generated_record: true
connector_name: Freshcaller
connector_type: source
connector_slug: freshcaller
connector_directory: source-freshcaller
definition_id: 8a5d48f6-03bb-4038-a942-a8d3f175cca3
version: 0.5.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/freshcaller
logo: /images/connectors/sources/freshcaller.svg
logo_source_path: airbyte-integrations/connectors/source-freshcaller/icon.svg
logo_sha256: d1cd6d93a570359fefcc1e54e152cd8a0bff68032be3792307e024efc69caf51
original_metadata_path: airbyte-integrations/connectors/source-freshcaller/metadata.yaml
original_metadata_sha256: 3afe48b306e111486e1fa4f116a0299b7887faafb4c48ddcec2103c9174e2186
original_document_path: docs/integrations/sources/freshcaller.md
original_document_sha256: 87aeeec5cae6a9fdb23347699d6494919ccca4b18e1f98f923cc7b71738e2feb
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: bee195e3cf5bacf06b5db4e56d3df500941e81fcca372835f86d1c4b2564d4aa
rewritten_at: 2026-11-12T14:06:16.147934+00:00
---

# Freshcaller

## Overview

The Freshcaller source supports full refresh and incremental sync. Choose the sync mode that meets your needs. `full refresh` replicates every record during each sync. `incremental` replicates only net-new records since the last successful sync.

### Output schema

This source supports the following endpoints:

- [Users](https://developers.freshcaller.com/api/#users)
- [Teams](https://developers.freshcaller.com/api/#teams)
- [Calls](https://developers.freshcaller.com/api/#calls)
- [Call Metrics](https://developers.freshcaller.com/api/#call-metrics)

If you'd like Airbyte to support more endpoints, please [create an issue.](https://github.com/airbytehq/airbyte/issues/new/choose)

### Features

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |
| SSL connection    | Yes        |
| Namespaces        | No         |

### Performance considerations

Under normal use, the Freshcaller connector shouldn't encounter Freshcaller API limits. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if rate limit issues aren't retried successfully.

## Get started

### Requirements

- Freshcaller Account
- Freshcaller API Key

### Setup guide

Read [How to find your API key](https://support.freshdesk.com/en/support/solutions/articles/225435-where-can-i-find-my-api-key-).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                           |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------ |
| 0.5.4 | 2025-10-21 | [68444](https://github.com/airbytehq/airbyte/pull/68444) | Update dependencies |
| 0.5.3 | 2025-10-14 | [68067](https://github.com/airbytehq/airbyte/pull/68067) | Update dependencies |
| 0.5.2 | 2025-10-07 | [67300](https://github.com/airbytehq/airbyte/pull/67300) | Update dependencies |
| 0.5.1 | 2025-09-30 | [65016](https://github.com/airbytehq/airbyte/pull/65016) | Update dependencies |
| 0.5.0 | 2025-09-17 | [66216](https://github.com/airbytehq/airbyte/pull/66216) | Migrate cdk to version 7 for source-freshcaller |
| 0.4.25 | 2025-02-01 | [52843](https://github.com/airbytehq/airbyte/pull/52843) | Update dependencies |
| 0.4.24 | 2025-01-25 | [52310](https://github.com/airbytehq/airbyte/pull/52310) | Update dependencies |
| 0.4.23 | 2025-01-18 | [51638](https://github.com/airbytehq/airbyte/pull/51638) | Update dependencies |
| 0.4.22 | 2025-01-11 | [51137](https://github.com/airbytehq/airbyte/pull/51137) | Update dependencies |
| 0.4.21 | 2025-01-04 | [50542](https://github.com/airbytehq/airbyte/pull/50542) | Update dependencies |
| 0.4.20 | 2024-12-21 | [50056](https://github.com/airbytehq/airbyte/pull/50056) | Update dependencies |
| 0.4.19 | 2024-12-11 | [48897](https://github.com/airbytehq/airbyte/pull/48897) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.4.18 | 2024-10-29 | [47808](https://github.com/airbytehq/airbyte/pull/47808) | Update dependencies |
| 0.4.17 | 2024-10-23 | [47065](https://github.com/airbytehq/airbyte/pull/47065) | Update dependencies |
| 0.4.16 | 2024-10-12 | [46796](https://github.com/airbytehq/airbyte/pull/46796) | Update dependencies |
| 0.4.15 | 2024-10-05 | [46435](https://github.com/airbytehq/airbyte/pull/46435) | Update dependencies |
| 0.4.14 | 2024-09-28 | [46173](https://github.com/airbytehq/airbyte/pull/46173) | Update dependencies |
| 0.4.13 | 2024-09-21 | [45760](https://github.com/airbytehq/airbyte/pull/45760) | Update dependencies |
| 0.4.12 | 2024-09-14 | [45522](https://github.com/airbytehq/airbyte/pull/45522) | Update dependencies |
| 0.4.11 | 2024-09-07 | [45323](https://github.com/airbytehq/airbyte/pull/45323) | Update dependencies |
| 0.4.10 | 2024-08-31 | [44973](https://github.com/airbytehq/airbyte/pull/44973) | Update dependencies |
| 0.4.9 | 2024-08-24 | [44718](https://github.com/airbytehq/airbyte/pull/44718) | Update dependencies |
| 0.4.8 | 2024-08-17 | [44256](https://github.com/airbytehq/airbyte/pull/44256) | Update dependencies |
| 0.4.7 | 2024-08-10 | [43691](https://github.com/airbytehq/airbyte/pull/43691) | Update dependencies |
| 0.4.6 | 2024-08-03 | [43238](https://github.com/airbytehq/airbyte/pull/43238) | Update dependencies |
| 0.4.5 | 2024-07-27 | [42676](https://github.com/airbytehq/airbyte/pull/42676) | Update dependencies |
| 0.4.4 | 2024-07-20 | [42196](https://github.com/airbytehq/airbyte/pull/42196) | Update dependencies |
| 0.4.3 | 2024-07-13 | [41821](https://github.com/airbytehq/airbyte/pull/41821) | Update dependencies |
| 0.4.2 | 2024-07-10 | [41552](https://github.com/airbytehq/airbyte/pull/41552) | Update dependencies |
| 0.4.1 | 2024-07-09 | [41195](https://github.com/airbytehq/airbyte/pull/41195) | Update dependencies |
| 0.4.0 | 2024-03-07 | [35892](https://github.com/airbytehq/airbyte/pull/35892) | ✨ Source: add `life_cycle` to `call_metrics` stream |
| 0.3.3 | 2024-07-06 | [40843](https://github.com/airbytehq/airbyte/pull/40843) | Update dependencies |
| 0.3.2 | 2024-07-01 | [40618](https://github.com/airbytehq/airbyte/pull/40618) | Migrate to base image and poetry, update CDK |
| 0.3.1 | 2023-11-28 | [32874](https://github.com/airbytehq/airbyte/pull/32874) | 🐛 Source: fix page_size_option parameter in spec |
| 0.3.0   | 2023-10-24 | [14759](https://github.com/airbytehq/airbyte/pull/14759) | ✨ Source: Migrate to Low Code CDK                |
| 0.2.0   | 2023-05-15 | [26065](https://github.com/airbytehq/airbyte/pull/26065) | Fix spec type check for `start_date`              |
| 0.1.0   | 2022-08-11 | [14759](https://github.com/airbytehq/airbyte/pull/14759) | 🎉 New Source: Freshcaller                        |

</details>
