---
generated_record: true
connector_name: Intruder
connector_type: source
connector_slug: intruder
connector_directory: source-intruder
definition_id: 3d15163b-11d8-412f-b808-795c9b2c3a3a
version: 0.2.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/intruder
logo: /images/connectors/sources/intruder.svg
logo_source_path: airbyte-integrations/connectors/source-intruder/icon.svg
logo_sha256: f7ad517a38e146adf0454a911fefa05a87165ed0f2e9b8de2ed698406cb9dfb0
original_metadata_path: airbyte-integrations/connectors/source-intruder/metadata.yaml
original_metadata_sha256: 6ac1596d84ecda25ff3f03ac3167af53746b1b98bafb67ea3cf49a744aa0f34f
original_document_path: docs/integrations/sources/intruder.md
original_document_sha256: 0c53d2dd936cfd57e7c17cbe11c5db1e3aa75625c467221f2268d97b27f9a05c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f44f0689c81e85cc5a17b7b4108488259283034a10e1c355b878448d1890b291
rewritten_at: 2026-11-12T13:43:17.582541+00:00
---

# Intruder.io API

## Sync overview

This source syncs data from the [Intruder.io API](https://dev.Intruder.io.com/email). It currently supports full refresh syncs only. Each sync retrieves all available records from scratch. Use it cautiously if you expect your API to contain many records.

## Supported streams

- Issues
- Occurrences issue
- Targets
- Scans

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

### Performance considerations

Intruder.io APIs limit the number of calls allowed per API key each second. If you reach this limit, the API returns HTTP error code 429. For details, see [here](https://developers.intruder.io/docs/rate-limiting).

## Get started

### Requirements

- Intruder.io Access token

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                       |
| :------ | :--------- | :-------------------------------------------------------- | :-------------------------------------------- |
| 0.2.23 | 2025-05-24 | [60700](https://github.com/airbytehq/airbyte/pull/60700) | Update dependencies |
| 0.2.22 | 2025-05-10 | [59277](https://github.com/airbytehq/airbyte/pull/59277) | Update dependencies |
| 0.2.21 | 2025-04-26 | [58190](https://github.com/airbytehq/airbyte/pull/58190) | Update dependencies |
| 0.2.20 | 2025-04-12 | [57744](https://github.com/airbytehq/airbyte/pull/57744) | Update dependencies |
| 0.2.19 | 2025-04-05 | [57051](https://github.com/airbytehq/airbyte/pull/57051) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56640](https://github.com/airbytehq/airbyte/pull/56640) | Update dependencies |
| 0.2.17 | 2025-03-22 | [56048](https://github.com/airbytehq/airbyte/pull/56048) | Update dependencies |
| 0.2.16 | 2025-03-08 | [55466](https://github.com/airbytehq/airbyte/pull/55466) | Update dependencies |
| 0.2.15 | 2025-03-01 | [54816](https://github.com/airbytehq/airbyte/pull/54816) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54340](https://github.com/airbytehq/airbyte/pull/54340) | Update dependencies |
| 0.2.13 | 2025-02-15 | [53280](https://github.com/airbytehq/airbyte/pull/53280) | Update dependencies |
| 0.2.12 | 2025-02-01 | [52719](https://github.com/airbytehq/airbyte/pull/52719) | Update dependencies |
| 0.2.11 | 2025-01-25 | [52232](https://github.com/airbytehq/airbyte/pull/52232) | Update dependencies |
| 0.2.10 | 2025-01-18 | [51829](https://github.com/airbytehq/airbyte/pull/51829) | Update dependencies |
| 0.2.9 | 2025-01-11 | [51185](https://github.com/airbytehq/airbyte/pull/51185) | Update dependencies |
| 0.2.8 | 2024-12-28 | [50666](https://github.com/airbytehq/airbyte/pull/50666) | Update dependencies |
| 0.2.7 | 2024-12-21 | [50113](https://github.com/airbytehq/airbyte/pull/50113) | Update dependencies |
| 0.2.6 | 2024-12-14 | [49619](https://github.com/airbytehq/airbyte/pull/49619) | Update dependencies |
| 0.2.5 | 2024-12-12 | [49255](https://github.com/airbytehq/airbyte/pull/49255) | Update dependencies |
| 0.2.4 | 2024-12-11 | [49001](https://github.com/airbytehq/airbyte/pull/49001) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.3 | 2024-10-29 | [47784](https://github.com/airbytehq/airbyte/pull/47784) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47655](https://github.com/airbytehq/airbyte/pull/47655) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-15 | [44139](https://github.com/airbytehq/airbyte/pull/44139) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-12 | [43792](https://github.com/airbytehq/airbyte/pull/43792) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43665](https://github.com/airbytehq/airbyte/pull/43665) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43241](https://github.com/airbytehq/airbyte/pull/43241) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42711](https://github.com/airbytehq/airbyte/pull/42711) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42141](https://github.com/airbytehq/airbyte/pull/42141) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41822](https://github.com/airbytehq/airbyte/pull/41822) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41363](https://github.com/airbytehq/airbyte/pull/41363) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41248](https://github.com/airbytehq/airbyte/pull/41248) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40895](https://github.com/airbytehq/airbyte/pull/40895) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40358](https://github.com/airbytehq/airbyte/pull/40358) | Update dependencies |
| 0.1.4 | 2024-06-22 | [39962](https://github.com/airbytehq/airbyte/pull/39962) | Update dependencies |
| 0.1.3 | 2024-06-15 | [39112](https://github.com/airbytehq/airbyte/pull/39112) | Make compatible with builder |
| 0.1.2 | 2024-06-06 | [39222](https://github.com/airbytehq/airbyte/pull/39222) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-21 | [38495](https://github.com/airbytehq/airbyte/pull/38495) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2022-10-30 | [#18668](https://github.com/airbytehq/airbyte/pull/18668) | 🎉 New Source: Intruder.io API [low-code CDK] |

</details>
