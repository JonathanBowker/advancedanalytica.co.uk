---
generated_record: true
connector_name: Everhour
connector_type: source
connector_slug: everhour
connector_directory: source-everhour
definition_id: 6babfc42-c734-4ef6-a817-6eca15f0f9b7
version: 0.2.20
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/everhour
logo: /images/connectors/sources/everhour.svg
logo_source_path: airbyte-integrations/connectors/source-everhour/icon.svg
logo_sha256: 6fe9a08e5b65f1ffaea3e9e12895a8e3d9f5ea09fa8f93b4c2b4ebf51665290e
original_metadata_path: airbyte-integrations/connectors/source-everhour/metadata.yaml
original_metadata_sha256: 1a149476f8cde882f74c3a22c756d25a6cf251c5c13802d8331462d5c4503a03
original_document_path: docs/integrations/sources/everhour.md
original_document_sha256: f19d85ec062d3f77be47041f71a1662dc4719527a42ec6ff36dca4b5fc5c7c81
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3bd8e207f78b07b5bbd342e129f0a80fde24fd399a203725f4085e40af3681cf
rewritten_at: 2026-11-12T13:36:23.924006+00:00
---

# Everhour

Use this page to set up and reference the [Everhour](https://everhour.com/) source connector.

## Prerequisites

- Get an API Key from Everhour by following [here](https://everhour.docs.apiary.io/#).

## Supported sync modes

This project currently supports full sync mode only.

## Supported streams

You can sync the following streams:

- Projects Stream
- Tasks Stream
- Time Records Stream
- Clients Stream
- Time Stream
- Users Stream

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject         |
|:--------|:-----------| :------------------------------------------------------- | :-------------- |
| 0.2.20 | 2025-05-24 | [60422](https://github.com/airbytehq/airbyte/pull/60422) | Update dependencies |
| 0.2.19 | 2025-05-10 | [59449](https://github.com/airbytehq/airbyte/pull/59449) | Update dependencies |
| 0.2.18 | 2025-04-26 | [58909](https://github.com/airbytehq/airbyte/pull/58909) | Update dependencies |
| 0.2.17 | 2025-04-19 | [58336](https://github.com/airbytehq/airbyte/pull/58336) | Update dependencies |
| 0.2.16 | 2025-04-12 | [57241](https://github.com/airbytehq/airbyte/pull/57241) | Update dependencies |
| 0.2.15 | 2025-03-29 | [56522](https://github.com/airbytehq/airbyte/pull/56522) | Update dependencies |
| 0.2.14 | 2025-03-22 | [55948](https://github.com/airbytehq/airbyte/pull/55948) | Update dependencies |
| 0.2.13 | 2025-03-08 | [55332](https://github.com/airbytehq/airbyte/pull/55332) | Update dependencies |
| 0.2.12 | 2025-03-01 | [54410](https://github.com/airbytehq/airbyte/pull/54410) | Update dependencies |
| 0.2.11 | 2025-02-15 | [53704](https://github.com/airbytehq/airbyte/pull/53704) | Update dependencies |
| 0.2.10 | 2025-02-08 | [53337](https://github.com/airbytehq/airbyte/pull/53337) | Update dependencies |
| 0.2.9 | 2025-02-01 | [52371](https://github.com/airbytehq/airbyte/pull/52371) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51680](https://github.com/airbytehq/airbyte/pull/51680) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51058](https://github.com/airbytehq/airbyte/pull/51058) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50518](https://github.com/airbytehq/airbyte/pull/50518) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50012](https://github.com/airbytehq/airbyte/pull/50012) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49539](https://github.com/airbytehq/airbyte/pull/49539) | Update dependencies |
| 0.2.3 | 2024-12-12 | [48147](https://github.com/airbytehq/airbyte/pull/48147) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47508](https://github.com/airbytehq/airbyte/pull/47508) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-15 | [44151](https://github.com/airbytehq/airbyte/pull/44151) | Refactor connector to manifest-only format |
| 0.1.13 | 2024-08-10 | [43561](https://github.com/airbytehq/airbyte/pull/43561) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43205](https://github.com/airbytehq/airbyte/pull/43205) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42696](https://github.com/airbytehq/airbyte/pull/42696) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42195](https://github.com/airbytehq/airbyte/pull/42195) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41834](https://github.com/airbytehq/airbyte/pull/41834) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41534](https://github.com/airbytehq/airbyte/pull/41534) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41187](https://github.com/airbytehq/airbyte/pull/41187) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40871](https://github.com/airbytehq/airbyte/pull/40871) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40262](https://github.com/airbytehq/airbyte/pull/40262) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40168](https://github.com/airbytehq/airbyte/pull/40168) | Update dependencies |
| 0.1.3 | 2024-06-19 | [38633](https://github.com/airbytehq/airbyte/pull/38633) | Make connector compatible with Builder |
| 0.1.2 | 2024-06-04 | [39079](https://github.com/airbytehq/airbyte/pull/39079) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-20 | [38410](https://github.com/airbytehq/airbyte/pull/38410) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2023-02-28 | [23593](https://github.com/airbytehq/airbyte/pull/23593) | Initial Release |

</details>
