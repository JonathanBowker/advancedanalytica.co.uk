---
generated_record: true
connector_name: RabbitMQ
connector_type: destination
connector_slug: rabbitmq
connector_directory: destination-rabbitmq
definition_id: e06ad785-ad6f-4647-b2e8-3027a5c59454
version: 0.1.43
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/rabbitmq
logo: /images/connectors/destinations/rabbitmq.svg
logo_source_path: airbyte-integrations/connectors/destination-rabbitmq/icon.svg
logo_sha256: e6d282078131fe5e201d6f69f3ca5fb54cd6be974b0c930272f0121ba598fbae
original_metadata_path: airbyte-integrations/connectors/destination-rabbitmq/metadata.yaml
original_metadata_sha256: 3ad26e46ba15fb623ddd5c097eff71afe73719e86d5f5858c183b3d343f01d8d
original_document_path: docs/integrations/destinations/rabbitmq.md
original_document_sha256: 47c6e40fc90a18a6d7972fba85ab02bd84760ed0b8ac89039856f9eb68f99065
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 427c1d6c712512f5689e94222ca189e8fe6b4f64721cc7fc0c2f080e561aaefa
rewritten_at: 2026-11-12T13:26:25.568459+00:00
---

# RabbitMQ

## Overview

The RabbitMQ destination sends or streams data to a RabbitMQ routing key. RabbitMQ is a popular open source message broker.

### Sync overview

#### Output schema

Each stream outputs a RabbitMQ message with these properties:

- `content_type`: set as `application/json`
- `headers`: message headers containing:
  - `stream`: the name of the stream providing the data
  - `namespace`: the namespace, when available from the stream
  - `emitted_at`: the timestamp when the `AirbyteRecord` was emitted

The `AirbyteRecord` data is serialised as JSON and set as the RabbitMQ message body.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | No |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Getting started

### Requirements

To use the RabbitMQ destination, you'll need:

- A RabbitMQ host and credentials (username/password) for publishing messages, if required.
- A RabbitMQ routing key.
- A RabbitMQ exchange is optional. If specified, you need a binding between the exchange and routing key.
- A RabbitMQ port is optional (it defaults to 5672).
- A RabbitMQ virtual host is also optional.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date             | Pull Request                                              | Subject                                         |
|:--------| :--------------- | :-------------------------------------------------------- | :---------------------------------------------- |
| 0.1.43 | 2025-05-24 | [60586](https://github.com/airbytehq/airbyte/pull/60586) | Update dependencies |
| 0.1.42 | 2025-05-10 | [59812](https://github.com/airbytehq/airbyte/pull/59812) | Update dependencies |
| 0.1.41 | 2025-05-03 | [58696](https://github.com/airbytehq/airbyte/pull/58696) | Update dependencies |
| 0.1.40 | 2025-04-19 | [58287](https://github.com/airbytehq/airbyte/pull/58287) | Update dependencies |
| 0.1.39 | 2025-04-12 | [57602](https://github.com/airbytehq/airbyte/pull/57602) | Update dependencies |
| 0.1.38 | 2025-04-05 | [56629](https://github.com/airbytehq/airbyte/pull/56629) | Update dependencies |
| 0.1.37 | 2025-03-22 | [56125](https://github.com/airbytehq/airbyte/pull/56125) | Update dependencies |
| 0.1.36 | 2025-03-08 | [55350](https://github.com/airbytehq/airbyte/pull/55350) | Update dependencies |
| 0.1.35 | 2025-03-01 | [54857](https://github.com/airbytehq/airbyte/pull/54857) | Update dependencies |
| 0.1.34 | 2025-02-22 | [54261](https://github.com/airbytehq/airbyte/pull/54261) | Update dependencies |
| 0.1.33 | 2025-02-15 | [53921](https://github.com/airbytehq/airbyte/pull/53921) | Update dependencies |
| 0.1.32 | 2025-02-01 | [52952](https://github.com/airbytehq/airbyte/pull/52952) | Update dependencies |
| 0.1.31 | 2025-01-25 | [52176](https://github.com/airbytehq/airbyte/pull/52176) | Update dependencies |
| 0.1.30 | 2025-01-18 | [51287](https://github.com/airbytehq/airbyte/pull/51287) | Update dependencies |
| 0.1.29 | 2024-12-28 | [50506](https://github.com/airbytehq/airbyte/pull/50506) | Update dependencies |
| 0.1.28 | 2024-12-21 | [50180](https://github.com/airbytehq/airbyte/pull/50180) | Update dependencies |
| 0.1.27 | 2024-12-14 | [49305](https://github.com/airbytehq/airbyte/pull/49305) | Update dependencies |
| 0.1.26 | 2024-11-25 | [48642](https://github.com/airbytehq/airbyte/pull/48642) | Update dependencies |
| 0.1.25 | 2024-10-29 | [47101](https://github.com/airbytehq/airbyte/pull/47101) | Update dependencies |
| 0.1.24 | 2024-10-12 | [46859](https://github.com/airbytehq/airbyte/pull/46859) | Update dependencies |
| 0.1.23 | 2024-10-05 | [46437](https://github.com/airbytehq/airbyte/pull/46437) | Update dependencies |
| 0.1.22 | 2024-09-28 | [46139](https://github.com/airbytehq/airbyte/pull/46139) | Update dependencies |
| 0.1.21 | 2024-09-21 | [45814](https://github.com/airbytehq/airbyte/pull/45814) | Update dependencies |
| 0.1.20 | 2024-09-14 | [45293](https://github.com/airbytehq/airbyte/pull/45293) | Update dependencies |
| 0.1.19 | 2024-08-31 | [44988](https://github.com/airbytehq/airbyte/pull/44988) | Update dependencies |
| 0.1.18 | 2024-08-24 | [44726](https://github.com/airbytehq/airbyte/pull/44726) | Update dependencies |
| 0.1.17 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.16 | 2024-08-17 | [44336](https://github.com/airbytehq/airbyte/pull/44336) | Update dependencies |
| 0.1.15 | 2024-08-10 | [43622](https://github.com/airbytehq/airbyte/pull/43622) | Update dependencies |
| 0.1.14 | 2024-08-03 | [43078](https://github.com/airbytehq/airbyte/pull/43078) | Update dependencies |
| 0.1.13 | 2024-07-27 | [42759](https://github.com/airbytehq/airbyte/pull/42759) | Update dependencies |
| 0.1.12 | 2024-07-20 | [42222](https://github.com/airbytehq/airbyte/pull/42222) | Update dependencies |
| 0.1.11 | 2024-07-13 | [41689](https://github.com/airbytehq/airbyte/pull/41689) | Update dependencies |
| 0.1.10 | 2024-07-10 | [41279](https://github.com/airbytehq/airbyte/pull/41279) | Update dependencies |
| 0.1.9 | 2024-07-06 | [40991](https://github.com/airbytehq/airbyte/pull/40991) | Update dependencies |
| 0.1.8 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.1.7 | 2024-06-25 | [40348](https://github.com/airbytehq/airbyte/pull/40348) | Update dependencies |
| 0.1.6 | 2024-06-22 | [40101](https://github.com/airbytehq/airbyte/pull/40101) | Update dependencies |
| 0.1.5 | 2024-06-06 | [39300](https://github.com/airbytehq/airbyte/pull/39300) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.4 | 2024-05-21 | [38532](https://github.com/airbytehq/airbyte/pull/38532) | [autopull] base image + poetry + up_to_date |
| 0.1.3   | 2024-04-02       | [#36749](https://github.com/airbytehq/airbyte/pull/36749) | Un-archive connector (again)                    |
| 0.1.2   | 2024-03-05       | [#35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector                            |
| 0.1.1   | 2022-09-09       | [16528](https://github.com/airbytehq/airbyte/pull/16528)  | Marked password field in spec as airbyte_secret |
| 0.1.0   | October 29, 2021 | [\#7560](https://github.com/airbytehq/airbyte/pull/7560)  | Initial release                                 |

</details>
