---
generated_record: true
connector_name: KVdb
connector_type: destination
connector_slug: kvdb
connector_directory: destination-kvdb
definition_id: f2e549cd-8e2a-48f8-822d-cc13630eb42d
version: 0.1.12
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/kvdb
logo: /images/connectors/destinations/kvdb.svg
logo_source_path: airbyte-integrations/connectors/destination-kvdb/icon.svg
logo_sha256: 5f8586bfae5c9765de2ce9a67ab9d34e03b54c3105e97898c120a486e5fb6ce5
original_metadata_path: airbyte-integrations/connectors/destination-kvdb/metadata.yaml
original_metadata_sha256: be55e9ca8744d6593ef7468d7325825936b939a07e4123c5c987daa86e738116
original_document_path: docs/integrations/destinations/kvdb.md
original_document_sha256: 08d07eeda025ce2a75b4129ec2df4242338339955998fc6877fb2f9c7fb3c446
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 349d112dcc07dc860b14add1c561bd6a8a954d520bb84a82da2311e402686bc6
rewritten_at: 2026-11-12T13:24:19.354190+00:00
---

# KVDB

Use the KVDB destination with Airbyte.

## Prerequisites

None.

## Setup guide

TODO

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Supported streams

TODO

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                    |
|:--------| :--------- | :-------------------------------------------------------- | :------------------------------------------------------------------------- |
| 0.1.12  | 2026-10-09 | [88413](https://github.com/airbytehq/airbyte/pull/88413) | Mark `secret_key` as `airbyte_secret`; fix the image entrypoint and move to Python 3.11 (base image 4.0.0) |
| 0.1.11  | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies                                     |
| 0.1.10  | 2024-07-09 | [41285](https://github.com/airbytehq/airbyte/pull/41285) | Update dependencies |
| 0.1.9   | 2024-07-06 | [40796](https://github.com/airbytehq/airbyte/pull/40796) | Update dependencies |
| 0.1.8   | 2024-06-25 | [40409](https://github.com/airbytehq/airbyte/pull/40409) | Update dependencies |
| 0.1.7   | 2024-06-22 | [40016](https://github.com/airbytehq/airbyte/pull/40016) | Update dependencies |
| 0.1.6   | 2024-06-06 | [39236](https://github.com/airbytehq/airbyte/pull/39236) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.5   | 2024-06-03 | [38894](https://github.com/airbytehq/airbyte/pull/38894) | Replace AirbyteLogger with logging.Logger |
| 0.1.4   | 2024-03-05 | [#35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector                                                       |
| 0.1.3   | 2024-02-19 | [xxx](https://github.com/airbytehq/airbyte/pull/xxx)      | bump connector version to publish, convert to base docker image and poetry |
| 0.1.2   | 2024-02-19 | [35422](https://github.com/airbytehq/airbyte/pull/35422)  | bump connector version to publish                                          |
| 0.1.1   | 2024-02-16 | [35370](https://github.com/airbytehq/airbyte/pull/35370)  | bump connector version to publish                                          |
| 0.1.0   | 2021-07-19 | [4786](https://github.com/airbytehq/airbyte/pull/4786)    | Python Demo Destination: KVDB                                              |

</details>
