---
generated_record: true
connector_name: Toggl
connector_type: source
connector_slug: toggl
connector_directory: source-toggl
definition_id: 7e7c844f-2300-4342-b7d3-6dd7992593cd
version: 0.2.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/toggl
logo: /images/connectors/sources/toggl.svg
logo_source_path: airbyte-integrations/connectors/source-toggl/icon.svg
logo_sha256: 380d67761a3f6d6883a6acbc2a9e5887cb0e56c536ffe07eed2986aad3b466db
original_metadata_path: airbyte-integrations/connectors/source-toggl/metadata.yaml
original_metadata_sha256: cae0c25b7df9648f6e677a7c78195976b65cef53bdc19f4af26e5aeecbdc85ed
original_document_path: docs/integrations/sources/toggl.md
original_document_sha256: d066524a8889d88d1efb31df22407f6be82c39dff9892e6afd684ac08a775b94
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: c19cecc05ab0e8797ecb025e7ab51043b06e8cbf11bc0c3f0ba05184f29ec3ec
rewritten_at: 2026-11-12T13:58:44.576555+00:00
---

# Toggl API

## Sync overview

This source syncs data from the [Toggl API](https://developers.track.toggl.com/docs/). It currently supports full refresh syncs only. Each sync retrieves all available records from scratch. Use it carefully if you expect your API to contain many records.

## Supported streams

- time_entries
- organizations
- organizations_users
- organizations_groups
- workspace
- workspace_clients
- workspace_tasks

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

### Performance considerations

Toggl APIs limit the number of API calls allowed per API key each second. If you reach the limit, the API returns HTTP error code 429. See [here](https://developers.track.toggl.com/docs/#the-api-format)

## Getting started

### Requirements

- API token

## IP allow list

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and your organisation restricts access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                 |
|:--------|:-----------| :-------------------------------------------------------- | :-------------------------------------- |
| 0.2.23 | 2025-05-10 | [60120](https://github.com/airbytehq/airbyte/pull/60120) | Update dependencies |
| 0.2.22 | 2025-05-04 | [59617](https://github.com/airbytehq/airbyte/pull/59617) | Update dependencies |
| 0.2.21 | 2025-04-27 | [59013](https://github.com/airbytehq/airbyte/pull/59013) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58422](https://github.com/airbytehq/airbyte/pull/58422) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57941](https://github.com/airbytehq/airbyte/pull/57941) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57410](https://github.com/airbytehq/airbyte/pull/57410) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56895](https://github.com/airbytehq/airbyte/pull/56895) | Update dependencies |
| 0.2.16 | 2025-03-22 | [56256](https://github.com/airbytehq/airbyte/pull/56256) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55629](https://github.com/airbytehq/airbyte/pull/55629) | Update dependencies |
| 0.2.14 | 2025-03-01 | [55088](https://github.com/airbytehq/airbyte/pull/55088) | Update dependencies |
| 0.2.13 | 2025-02-22 | [54510](https://github.com/airbytehq/airbyte/pull/54510) | Update dependencies |
| 0.2.12 | 2025-02-15 | [54059](https://github.com/airbytehq/airbyte/pull/54059) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53557](https://github.com/airbytehq/airbyte/pull/53557) | Update dependencies |
| 0.2.10 | 2025-02-01 | [53090](https://github.com/airbytehq/airbyte/pull/53090) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52429](https://github.com/airbytehq/airbyte/pull/52429) | Update dependencies |
| 0.2.8 | 2025-01-18 | [52026](https://github.com/airbytehq/airbyte/pull/52026) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51383](https://github.com/airbytehq/airbyte/pull/51383) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50775](https://github.com/airbytehq/airbyte/pull/50775) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50305](https://github.com/airbytehq/airbyte/pull/50305) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49738](https://github.com/airbytehq/airbyte/pull/49738) | Update dependencies |
| 0.2.3 | 2024-12-12 | [49434](https://github.com/airbytehq/airbyte/pull/49434) | Update dependencies |
| 0.2.2 | 2024-10-29 | [47883](https://github.com/airbytehq/airbyte/pull/47883) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44056](https://github.com/airbytehq/airbyte/pull/44056) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-12 | [43860](https://github.com/airbytehq/airbyte/pull/43860) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43485](https://github.com/airbytehq/airbyte/pull/43485) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43064](https://github.com/airbytehq/airbyte/pull/43064) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42755](https://github.com/airbytehq/airbyte/pull/42755) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42244](https://github.com/airbytehq/airbyte/pull/42244) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41736](https://github.com/airbytehq/airbyte/pull/41736) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41510](https://github.com/airbytehq/airbyte/pull/41510) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41227](https://github.com/airbytehq/airbyte/pull/41227) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40968](https://github.com/airbytehq/airbyte/pull/40968) | Update dependencies |
| 0.1.5   | 2024-06-28 | [#38740](https://github.com/airbytehq/airbyte/pull/38740) | Make connector compatible with Builder  |
| 0.1.4   | 2024-06-25 | [40493](https://github.com/airbytehq/airbyte/pull/40493) | Update dependencies |
| 0.1.3   | 2024-06-22 | [40096](https://github.com/airbytehq/airbyte/pull/40096) | Update dependencies |
| 0.1.2   | 2024-06-04 | [38985](https://github.com/airbytehq/airbyte/pull/38985) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1   | 2024-05-20 | [38376](https://github.com/airbytehq/airbyte/pull/38376) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2022-10-28 | [#18507](https://github.com/airbytehq/airbyte/pull/18507) | 🎉 New Source: Toggl API [low-code CDK] |

</details>
