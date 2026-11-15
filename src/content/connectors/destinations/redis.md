---
generated_record: true
connector_name: Redis
connector_type: destination
connector_slug: redis
connector_directory: destination-redis
definition_id: d4d3fef9-e319-45c2-881a-bd02ce44cc9f
version: 0.1.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/redis
logo: /images/connectors/destinations/redis.svg
logo_source_path: airbyte-integrations/connectors/destination-redis/icon.svg
logo_sha256: 227abee7e41a35858b097cc14a80085653150edeb13f13fb3d513e2c4313d4a6
original_metadata_path: airbyte-integrations/connectors/destination-redis/metadata.yaml
original_metadata_sha256: 1f375f732b708e078f0f7af035cd75883f67070b7fec6d54ec9472e83a85fc85
original_document_path: docs/integrations/destinations/redis.md
original_document_sha256: 607533d53506f24cb284aed5ba652886d2f9fa61bc768b633f07e47bf49be182
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f39922a7576e375c9de117570446415ba142267f37e870c08dfff99fc7141335
rewritten_at: 2026-11-12T13:26:41.080237+00:00
---

# Redis

## Sync overview

### Output schema

Airbyte structures incoming data based on the target Redis cache or data type.
The connector maps incoming data from a namespace and stream to a unique Redis key.

For the **_hash_** implementation as a Redis data type, keys and hashes use this structure:

**_key_**:

    namespace:stream:id

**_hash_**:

- `_airbyte_ab_id`: Sequential id for a given key, generated using the INCR Redis command.
- `_airbyte_emitted_at`: A timestamp showing when the event was received from the data source.
- `_airbyte_data`: A json text/object containing the data received from the data source.

### Performance

With enough cache memory, Redis should handle millions of records without issues.
It stores data in memory and can periodically save snapshots to disk.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Getting started

### Requirements

- The connector is fully compatible with redis 2.8.x, 3.x.x and above.
- Configuration
  - **_host_**: Hostname or address of the Redis server you want to connect to.
  - **_port_**: Port of the Redis server you want to connect to.
  - **_username_**: Username for authenticating with the Redis server.
  - **_password_**: Password for authenticating with the Redis server.
  - **_cache_type_**: Redis cache/data type for storing incoming messages, i.e hash,set,list,stream,etc.
- Turn on SSL to connect using SSL.
- For SSL Modes, select:
  - **disable** to disable encrypted communication between Airbyte and the source.
  - **verify-full** to always require encryption and verify the source's identity.

### Setup guide

This section hasn't been written.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject         |
| :------ | :--------- | :--------------------------------------------------------- | :-------------- |
| 0.1.4   | 2022-10-25 | [\#18358](https://github.com/airbytehq/airbyte/pull/18358) | TLS support     |
| 0.1.3   | 2022-10-18 | [\#17951](https://github.com/airbytehq/airbyte/pull/17951) | Add SSH support |

</details>
