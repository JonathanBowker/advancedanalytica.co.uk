---
generated_record: true
connector_name: Whisky Hunter
connector_type: source
connector_slug: whisky-hunter
connector_directory: source-whisky-hunter
definition_id: e65f84c0-7598-458a-bfac-f770c381ff5d
version: 0.2.27
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/whisky-hunter
logo: /images/connectors/sources/whisky-hunter.svg
logo_source_path: airbyte-integrations/connectors/source-whisky-hunter/icon.svg
logo_sha256: c20e2ece73903bfdfaa93f5c17e50934abff91c92f3c5db7fb99861ff1ca97e8
original_metadata_path: airbyte-integrations/connectors/source-whisky-hunter/metadata.yaml
original_metadata_sha256: a7e2c8e95a905fe144ff7e5576e30bb3b533512cb9a88fa589bc4bbbc6324ae9
original_document_path: docs/integrations/sources/whisky-hunter.md
original_document_sha256: cec3b67a8400be6ee3e0de007763a8caf9b709fbb6b86cb918414e1b2a9fc56f
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d9dcc18d44f91ea851790ca374a2114df5f7216fb79ad987f2925565ef7633c0
rewritten_at: 2026-11-12T14:00:19.814845+00:00
---

# Whisky Hunter

## Overview

The Whisky Hunter source syncs data from the [Whisky Hunter API](https://whiskyhunter.net/api/)

#### Output schema

You can sync the following streams:

- `auctions_data`
  - Provides statistics for specific auctions.
- `auctions_info`
  - Provides information and metadata for recurring and one-off auctions.
- `distilleries_info`
  - Provides information about distilleries.

#### Features

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | No         |
| Namespaces                | No         |

### Requirements and setup

You don't need to configure this source.

## Performance

No rate limit is published. This data updates infrequently, so we recommend an update cadence of 24hr or higher.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                          |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------- |
| 0.2.27 | 2025-05-24 | [60765](https://github.com/airbytehq/airbyte/pull/60765) | Update dependencies |
| 0.2.26 | 2025-05-10 | [59944](https://github.com/airbytehq/airbyte/pull/59944) | Update dependencies |
| 0.2.25 | 2025-05-04 | [59569](https://github.com/airbytehq/airbyte/pull/59569) | Update dependencies |
| 0.2.24 | 2025-04-26 | [58940](https://github.com/airbytehq/airbyte/pull/58940) | Update dependencies |
| 0.2.23 | 2025-04-19 | [58532](https://github.com/airbytehq/airbyte/pull/58532) | Update dependencies |
| 0.2.22 | 2025-04-12 | [58015](https://github.com/airbytehq/airbyte/pull/58015) | Update dependencies |
| 0.2.21 | 2025-04-05 | [57398](https://github.com/airbytehq/airbyte/pull/57398) | Update dependencies |
| 0.2.20 | 2025-03-29 | [56908](https://github.com/airbytehq/airbyte/pull/56908) | Update dependencies |
| 0.2.19 | 2025-03-22 | [56295](https://github.com/airbytehq/airbyte/pull/56295) | Update dependencies |
| 0.2.18 | 2025-03-08 | [55634](https://github.com/airbytehq/airbyte/pull/55634) | Update dependencies |
| 0.2.17 | 2025-03-01 | [55119](https://github.com/airbytehq/airbyte/pull/55119) | Update dependencies |
| 0.2.16 | 2025-02-22 | [54534](https://github.com/airbytehq/airbyte/pull/54534) | Update dependencies |
| 0.2.15 | 2025-02-15 | [54065](https://github.com/airbytehq/airbyte/pull/54065) | Update dependencies |
| 0.2.14 | 2025-02-08 | [53571](https://github.com/airbytehq/airbyte/pull/53571) | Update dependencies |
| 0.2.13 | 2025-02-01 | [53057](https://github.com/airbytehq/airbyte/pull/53057) | Update dependencies |
| 0.2.12 | 2025-01-25 | [52444](https://github.com/airbytehq/airbyte/pull/52444) | Update dependencies |
| 0.2.11 | 2025-01-18 | [51987](https://github.com/airbytehq/airbyte/pull/51987) | Update dependencies |
| 0.2.10 | 2025-01-11 | [51411](https://github.com/airbytehq/airbyte/pull/51411) | Update dependencies |
| 0.2.9 | 2024-12-28 | [50786](https://github.com/airbytehq/airbyte/pull/50786) | Update dependencies |
| 0.2.8 | 2024-12-21 | [50315](https://github.com/airbytehq/airbyte/pull/50315) | Update dependencies |
| 0.2.7 | 2024-12-14 | [49780](https://github.com/airbytehq/airbyte/pull/49780) | Update dependencies |
| 0.2.6 | 2024-12-12 | [49380](https://github.com/airbytehq/airbyte/pull/49380) | Update dependencies |
| 0.2.5 | 2024-12-11 | [49126](https://github.com/airbytehq/airbyte/pull/49126) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.4 | 2024-11-04 | [48275](https://github.com/airbytehq/airbyte/pull/48275) | Update dependencies |
| 0.2.3 | 2024-10-29 | [47795](https://github.com/airbytehq/airbyte/pull/47795) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47555](https://github.com/airbytehq/airbyte/pull/47555) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44045](https://github.com/airbytehq/airbyte/pull/44045) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-12 | [43793](https://github.com/airbytehq/airbyte/pull/43793) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43553](https://github.com/airbytehq/airbyte/pull/43553) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43090](https://github.com/airbytehq/airbyte/pull/43090) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42807](https://github.com/airbytehq/airbyte/pull/42807) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42344](https://github.com/airbytehq/airbyte/pull/42344) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41790](https://github.com/airbytehq/airbyte/pull/41790) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41474](https://github.com/airbytehq/airbyte/pull/41474) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41217](https://github.com/airbytehq/airbyte/pull/41217) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40841](https://github.com/airbytehq/airbyte/pull/40841) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40489](https://github.com/airbytehq/airbyte/pull/40489) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40017](https://github.com/airbytehq/airbyte/pull/40017) | Update dependencies |
| 0.1.3 | 2024-06-06 | [39219](https://github.com/airbytehq/airbyte/pull/39219) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.2 | 2024-06-05 | [38841](https://github.com/airbytehq/airbyte/pull/38841) | Make compatible with builder |
| 0.1.1 | 2024-05-21 | [38508](https://github.com/airbytehq/airbyte/pull/38508) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-10-12 | [17918](https://github.com/airbytehq/airbyte/pull/17918) | Initial release supporting the Whisky Hunter API |

</details>
