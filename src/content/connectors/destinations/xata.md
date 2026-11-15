---
generated_record: true
connector_name: Xata
connector_type: destination
connector_slug: xata
connector_directory: destination-xata
definition_id: 2a51c92d-0fb4-4e54-94d2-cce631f24d1f
version: 0.1.46
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/xata
logo: /images/connectors/destinations/xata.svg
logo_source_path: airbyte-integrations/connectors/destination-xata/icon.svg
logo_sha256: c9b2f252824b07e10ee8d0ba373260b43868a80c65f48a4cadbd57fb17fe95f5
original_metadata_path: airbyte-integrations/connectors/destination-xata/metadata.yaml
original_metadata_sha256: db71ab2e0aa2cbc7d69d25870894043ac4a3ba5c1e471681abaa9d3a1c911cbd
original_document_path: docs/integrations/destinations/xata.md
original_document_sha256: 40d4f020191dbadc4d5e4389390c65c3498baf1271f91623671261338df5e689
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 2f95533b61a7f95e4240ba7b0b548f0bae4b55828a08b6f76de8c44b43ce99fe
rewritten_at: 2026-11-12T13:28:12.593275+00:00
---

# Xata

Send data to Xata with the Airbyte destination connector.

## Introduction

Currently, only `append` is supported.

Conventions:

- The `stream` name defines the table name in Xata.
- The `message` data maps to the table schema one by one.

For example, a stream named `nyc_taxi_fares_2022` writes to a table with the same name. The message must have the following shape:

```
{
    "name": "Yellow Cab, co",
    "date": "2022-05-15",
    "driver": "Joe Doe"
}
```

The table must have the same columns, with names and [data types](https://xata.io/docs/concepts/data-model) mapped one by one.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | No |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Getting started

To connect, you need:

- API Key: go to your [account settings](https://app.xata.io/settings) and generate a key.
- Database URL: go to the configuration tab in your workspace. Copy the `Workspace API base URL`.

## CHANGELOG

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                        |
|:--------| :--------- | :-------------------------------------------------------- | :----------------------------- |
| 0.1.46 | 2025-05-10 | [59351](https://github.com/airbytehq/airbyte/pull/59351) | Update dependencies |
| 0.1.45 | 2025-04-26 | [58703](https://github.com/airbytehq/airbyte/pull/58703) | Update dependencies |
| 0.1.44 | 2025-04-19 | [58292](https://github.com/airbytehq/airbyte/pull/58292) | Update dependencies |
| 0.1.43 | 2025-04-12 | [57616](https://github.com/airbytehq/airbyte/pull/57616) | Update dependencies |
| 0.1.42 | 2025-04-05 | [57129](https://github.com/airbytehq/airbyte/pull/57129) | Update dependencies |
| 0.1.41 | 2025-03-29 | [56553](https://github.com/airbytehq/airbyte/pull/56553) | Update dependencies |
| 0.1.40 | 2025-03-22 | [56148](https://github.com/airbytehq/airbyte/pull/56148) | Update dependencies |
| 0.1.39 | 2025-03-08 | [55351](https://github.com/airbytehq/airbyte/pull/55351) | Update dependencies |
| 0.1.38 | 2025-03-01 | [54894](https://github.com/airbytehq/airbyte/pull/54894) | Update dependencies |
| 0.1.37 | 2025-02-22 | [54226](https://github.com/airbytehq/airbyte/pull/54226) | Update dependencies |
| 0.1.36 | 2025-02-15 | [53937](https://github.com/airbytehq/airbyte/pull/53937) | Update dependencies |
| 0.1.35 | 2025-02-01 | [52929](https://github.com/airbytehq/airbyte/pull/52929) | Update dependencies |
| 0.1.34 | 2025-01-25 | [52204](https://github.com/airbytehq/airbyte/pull/52204) | Update dependencies |
| 0.1.33 | 2025-01-18 | [51761](https://github.com/airbytehq/airbyte/pull/51761) | Update dependencies |
| 0.1.32 | 2025-01-11 | [51279](https://github.com/airbytehq/airbyte/pull/51279) | Update dependencies |
| 0.1.31 | 2025-01-04 | [50900](https://github.com/airbytehq/airbyte/pull/50900) | Update dependencies |
| 0.1.30 | 2024-12-28 | [50471](https://github.com/airbytehq/airbyte/pull/50471) | Update dependencies |
| 0.1.29 | 2024-12-21 | [50166](https://github.com/airbytehq/airbyte/pull/50166) | Update dependencies |
| 0.1.28 | 2024-12-14 | [49301](https://github.com/airbytehq/airbyte/pull/49301) | Update dependencies |
| 0.1.27 | 2024-11-25 | [48633](https://github.com/airbytehq/airbyte/pull/48633) | Update dependencies |
| 0.1.26 | 2024-11-04 | [48162](https://github.com/airbytehq/airbyte/pull/48162) | Update dependencies |
| 0.1.25 | 2024-10-29 | [47076](https://github.com/airbytehq/airbyte/pull/47076) | Update dependencies |
| 0.1.24 | 2024-10-12 | [46765](https://github.com/airbytehq/airbyte/pull/46765) | Update dependencies |
| 0.1.23 | 2024-10-05 | [46467](https://github.com/airbytehq/airbyte/pull/46467) | Update dependencies |
| 0.1.22 | 2024-09-28 | [46107](https://github.com/airbytehq/airbyte/pull/46107) | Update dependencies |
| 0.1.21 | 2024-09-21 | [45837](https://github.com/airbytehq/airbyte/pull/45837) | Update dependencies |
| 0.1.20 | 2024-09-14 | [45516](https://github.com/airbytehq/airbyte/pull/45516) | Update dependencies |
| 0.1.19 | 2024-09-07 | [45213](https://github.com/airbytehq/airbyte/pull/45213) | Update dependencies |
| 0.1.18 | 2024-08-31 | [45027](https://github.com/airbytehq/airbyte/pull/45027) | Update dependencies |
| 0.1.17 | 2024-08-24 | [44632](https://github.com/airbytehq/airbyte/pull/44632) | Update dependencies |
| 0.1.16 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.15 | 2024-08-17 | [44269](https://github.com/airbytehq/airbyte/pull/44269) | Update dependencies |
| 0.1.14 | 2024-08-10 | [43462](https://github.com/airbytehq/airbyte/pull/43462) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43200](https://github.com/airbytehq/airbyte/pull/43200) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42657](https://github.com/airbytehq/airbyte/pull/42657) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42355](https://github.com/airbytehq/airbyte/pull/42355) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41795](https://github.com/airbytehq/airbyte/pull/41795) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41481](https://github.com/airbytehq/airbyte/pull/41481) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41238](https://github.com/airbytehq/airbyte/pull/41238) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40949](https://github.com/airbytehq/airbyte/pull/40949) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40497](https://github.com/airbytehq/airbyte/pull/40497) | Update dependencies |
| 0.1.5 | 2024-06-22 | [39991](https://github.com/airbytehq/airbyte/pull/39991) | Update dependencies |
| 0.1.4 | 2024-06-04 | [39088](https://github.com/airbytehq/airbyte/pull/39088) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.3 | 2024-05-21 | [38499](https://github.com/airbytehq/airbyte/pull/38499) | [autopull] base image + poetry + up_to_date |
| 0.1.2   | 2024-03-05 | [#35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector           |
| 0.1.1   | 2023-06-21 | [#27542](https://github.com/airbytehq/airbyte/pull/27542) | Mark api_key as Airbyte Secret |
| 0.1.0   | 2023-06-14 | [#24192](https://github.com/airbytehq/airbyte/pull/24192) | New Destination Connector Xata |

</details>

## Namespace support

This destination does not support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).
