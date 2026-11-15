---
generated_record: true
connector_name: Databend
connector_type: destination
connector_slug: databend
connector_directory: destination-databend
definition_id: 302e4d8e-08d3-4098-acd4-ac67ca365b88
version: 0.1.47
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/databend
logo: /images/connectors/destinations/databend.svg
logo_source_path: airbyte-integrations/connectors/destination-databend/icon.svg
logo_sha256: 39acdb98dda37f0d7fb4a888100789a70586d7757790fea027747bf29479d152
original_metadata_path: airbyte-integrations/connectors/destination-databend/metadata.yaml
original_metadata_sha256: 8934e6cafd99b1c14aa376035b464a3f9ca40e79fbb6fa036648dd681f70061b
original_document_path: docs/integrations/destinations/databend.md
original_document_sha256: d225b156122ab933008f1f69a4934e3ea53fc907ad39a0d1ada16c1eff290292
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9ce77ad5d54dd48db1669f04030632b25dd4f48e6f15b419f519ba1f6daba3a4
rewritten_at: 2026-11-12T13:23:21.850472+00:00
---

# Databend

Set up the [Databend](https://databend.rs/) destination connector by following this guide.

#### Output schema

Each stream outputs to its own Databend table. Each table contains three columns:

- `_airbyte_ab_id`: a UUID that Airbyte assigns to each processed event. The Databend column type is `VARCHAR`.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source. The Databend column type is `TIMESTAMP`.
- `_airbyte_data`: a JSON blob containing the event data. The Databend column type is `VARVHAR`.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started with Airbyte Cloud

Coming soon...

## Get started with Airbyte Open Source

Follow the [Connecting to a Warehouse docs](https://docs.databend.com/using-databend-cloud/warehouses/connecting-a-warehouse) to get the user, password, host and other details.

Alternatively, create this user by running:

```
GRANT CREATE ON * TO airbyte_user;
```

Make sure the Databend user has these permissions:

- Can create tables and write rows.
- Can create databases, for example:

You can use an existing user, but creating a dedicated Airbyte user is strongly recommended.

#### Target database

Choose an existing database or create one to store data synced from Airbyte.

### Set up the Databend destination

You now have everything required to configure Databend as a destination in the UI. You'll need these details:

- **Host**
- **Port**
- **Username**
- **Password**
- **Database**

## Compatibility

For Databend version >= v0.9.0, you need databend-sqlalchemy version >= v0.1.0.
The [Databend Cloud](https://app.databend.com/) only supports Databend version > 0.9.0.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version                                                  | Date                                     | Pull Request                                              | Subject                                                  |
| :------------------------------------------------------- | :--------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------- | ----------- |
| 0.1.47 | 2025-04-19 | [58228](https://github.com/airbytehq/airbyte/pull/58228) | Update dependencies |
| 0.1.46 | 2025-04-12 | [57624](https://github.com/airbytehq/airbyte/pull/57624) | Update dependencies |
| 0.1.45 | 2025-04-05 | [57144](https://github.com/airbytehq/airbyte/pull/57144) | Update dependencies |
| 0.1.44 | 2025-03-29 | [56576](https://github.com/airbytehq/airbyte/pull/56576) | Update dependencies |
| 0.1.43 | 2025-03-22 | [56126](https://github.com/airbytehq/airbyte/pull/56126) | Update dependencies |
| 0.1.42 | 2025-03-08 | [55409](https://github.com/airbytehq/airbyte/pull/55409) | Update dependencies |
| 0.1.41 | 2025-03-01 | [54881](https://github.com/airbytehq/airbyte/pull/54881) | Update dependencies |
| 0.1.40 | 2025-02-22 | [54276](https://github.com/airbytehq/airbyte/pull/54276) | Update dependencies |
| 0.1.39 | 2025-02-15 | [53909](https://github.com/airbytehq/airbyte/pull/53909) | Update dependencies |
| 0.1.38 | 2025-02-08 | [53433](https://github.com/airbytehq/airbyte/pull/53433) | Update dependencies |
| 0.1.37 | 2025-02-01 | [52895](https://github.com/airbytehq/airbyte/pull/52895) | Update dependencies |
| 0.1.36 | 2025-01-25 | [52215](https://github.com/airbytehq/airbyte/pull/52215) | Update dependencies |
| 0.1.35 | 2025-01-18 | [51721](https://github.com/airbytehq/airbyte/pull/51721) | Update dependencies |
| 0.1.34 | 2025-01-11 | [51280](https://github.com/airbytehq/airbyte/pull/51280) | Update dependencies |
| 0.1.33 | 2024-12-28 | [50472](https://github.com/airbytehq/airbyte/pull/50472) | Update dependencies |
| 0.1.32 | 2024-12-21 | [50201](https://github.com/airbytehq/airbyte/pull/50201) | Update dependencies |
| 0.1.31 | 2024-12-14 | [48916](https://github.com/airbytehq/airbyte/pull/48916) | Update dependencies |
| 0.1.30 | 2024-11-25 | [48664](https://github.com/airbytehq/airbyte/pull/48664) | Update dependencies |
| 0.1.29 | 2024-10-19 | [46992](https://github.com/airbytehq/airbyte/pull/46992) | add ssl param for databend destination |
| 0.1.28 | 2024-11-04 | [48272](https://github.com/airbytehq/airbyte/pull/48272) | Update dependencies |
| 0.1.27 | 2024-10-28 | [47069](https://github.com/airbytehq/airbyte/pull/47069) | Update dependencies |
| 0.1.26 | 2024-10-12 | [46811](https://github.com/airbytehq/airbyte/pull/46811) | Update dependencies |
| 0.1.25 | 2024-10-05 | [46418](https://github.com/airbytehq/airbyte/pull/46418) | Update dependencies |
| 0.1.24 | 2024-09-28 | [46197](https://github.com/airbytehq/airbyte/pull/46197) | Update dependencies |
| 0.1.23 | 2024-09-21 | [45824](https://github.com/airbytehq/airbyte/pull/45824) | Update dependencies |
| 0.1.22 | 2024-09-14 | [45531](https://github.com/airbytehq/airbyte/pull/45531) | Update dependencies |
| 0.1.21 | 2024-09-07 | [45237](https://github.com/airbytehq/airbyte/pull/45237) | Update dependencies |
| 0.1.20 | 2024-08-31 | [45001](https://github.com/airbytehq/airbyte/pull/45001) | Update dependencies |
| 0.1.19 | 2024-08-24 | [44756](https://github.com/airbytehq/airbyte/pull/44756) | Update dependencies |
| 0.1.18 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.17 | 2024-08-17 | [44300](https://github.com/airbytehq/airbyte/pull/44300) | Update dependencies |
| 0.1.16 | 2024-08-10 | [43611](https://github.com/airbytehq/airbyte/pull/43611) | Update dependencies |
| 0.1.15 | 2024-08-03 | [43234](https://github.com/airbytehq/airbyte/pull/43234) | Update dependencies |
| 0.1.14 | 2024-07-27 | [42588](https://github.com/airbytehq/airbyte/pull/42588) | Update dependencies |
| 0.1.13 | 2024-07-20 | [42164](https://github.com/airbytehq/airbyte/pull/42164) | Update dependencies |
| 0.1.12 | 2024-07-13 | [41800](https://github.com/airbytehq/airbyte/pull/41800) | Update dependencies |
| 0.1.11 | 2024-07-10 | [41429](https://github.com/airbytehq/airbyte/pull/41429) | Update dependencies |
| 0.1.10 | 2024-07-09 | [41243](https://github.com/airbytehq/airbyte/pull/41243) | Update dependencies |
| 0.1.9 | 2024-07-06 | [40916](https://github.com/airbytehq/airbyte/pull/40916) | Update dependencies |
| 0.1.8 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.1.7 | 2024-06-25 | [40301](https://github.com/airbytehq/airbyte/pull/40301) | Update dependencies |
| 0.1.6 | 2024-06-21 | [39936](https://github.com/airbytehq/airbyte/pull/39936) | Update dependencies |
| 0.1.5 | 2024-06-04 | [39090](https://github.com/airbytehq/airbyte/pull/39090) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.4 | 2024-05-21 | [38510](https://github.com/airbytehq/airbyte/pull/38510) | [autopull] base image + poetry + up_to_date |
| 0.1.3                                                    | 2024-03-05                               | [#35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector                                     |
| 0.1.2                                                    | 2023-02-11                               | [22855](https://github.com/airbytehq/airbyte/pull/22855)  | Fix compatibility                                        |
| issue with databend-query 0.9                            |                                          | 0.1.1                                                     | 2022-01-09                                               |
| [21182](https://github.com/airbytehq/airbyte/pull/21182) | Remove protocol option and enforce HTTPS |
|                                                          | 0.1.0                                    | 2022-01-09                                                | [20909](https://github.com/airbytehq/airbyte/pull/20909) | Destination |
| Databend                                                 |

</details>
