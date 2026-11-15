---
generated_record: true
connector_name: Apify Dataset
connector_type: source
connector_slug: apify-dataset
connector_directory: source-apify-dataset
definition_id: 47f17145-fe20-4ef5-a548-e29b048adf84
version: 2.2.67
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/apify-dataset
logo: /images/connectors/sources/apify-dataset.svg
logo_source_path: airbyte-integrations/connectors/source-apify-dataset/icon.svg
logo_sha256: c86805caaf159aef57a4433d9926f0fe96cceab5ca9236fee88b8fb8c9dc9b6e
original_metadata_path: airbyte-integrations/connectors/source-apify-dataset/metadata.yaml
original_metadata_sha256: 881acbf426cab07fe111614c2957762d59c42bb7c6a2e64a4a233ab14afb24a1
original_document_path: docs/integrations/sources/apify-dataset.md
original_document_sha256: 1474cc292a21cb1788f14246af043a04a8e64dce71739390c4f7e146bb443701
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1c3a8889d371ffd89b8db4401990fd4d1ec15632e07421bfd04f75838b7e8e58
rewritten_at: 2026-11-12T14:04:57.294684+00:00
---

---
description: Web scraping and automation platform.
---

# Apify Dataset

## Overview

[Apify](https://apify.com/) is a web scraping and automation platform for running automation jobs at scale. It provides ready-made and custom services, an open-source [JavaScript SDK](https://docs.apify.com/sdk/js/), [Python SDK](https://docs.apify.com/sdk/python/), proxies and other web scraping tools.

<FieldAnchor field="dataset_id">
Scraping results are usually stored in the [Apify Dataset](https://docs.apify.com/storage/dataset). This Airbyte connector provides streams for working with datasets. You can sync their content to your chosen destination using Airbyte.
</FieldAnchor>

To sync data from a dataset, you only need your API token and dataset ID.

<FieldAnchor field="token">
Find your personal API token in [Settings -> Integrations](https://console.apify.com/account/integrations) within the Apify Console. You’ll find the dataset ID in [Storage -> Datasets](https://console.apify.com/storage/datasets).
</FieldAnchor>

### Trigger an Airbyte sync from an Apify webhook

When your Apify job, also called [Actor run](https://docs.apify.com/platform/actors/running), finishes, it can trigger an Airbyte sync. It calls the Airbyte [API](https://airbyte-public-api-docs.s3.us-east-2.amazonaws.com/rapidoc-api-docs.html#post-/v1/connections/sync) manual connection trigger (`POST /v1/connections/sync`). You can call the API from Apify [webhook](https://docs.apify.com/platform/integrations/webhooks), which runs when your Apify run finishes.

![](/.gitbook/assets/apify_trigger_airbyte_connection.png)

### Features

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |

### Performance

The Apify dataset connector uses [Apify Python Client](https://docs.apify.com/apify-client-python) internally. It should handle API limitations during normal use.

## Streams

### `dataset_collection`

- Calls `api.apify.com/v2/datasets` ([docs](https://docs.apify.com/api/v2#/reference/datasets/dataset-collection/get-list-of-datasets))
- Properties:
  - Apify Personal API token (find it [here](https://console.apify.com/account/integrations))

### `dataset`

- Calls `https://api.apify.com/v2/datasets/{datasetId}` ([docs](https://docs.apify.com/api/v2#/reference/datasets/dataset/get-dataset))
- Properties:
  - Apify Personal API token (find it [here](https://console.apify.com/account/integrations))
  - Dataset ID (check [docs](https://docs.apify.com/platform/storage/dataset))

### `item_collection`

- Calls `api.apify.com/v2/datasets/{datasetId}/items` ([docs](https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items))
- Properties:
  - Apify Personal API token (find it [here](https://console.apify.com/account/integrations))
  - Dataset ID (check [docs](https://docs.apify.com/platform/storage/dataset))
- Limitations:
  - The stream uses a dynamic schema, with all data stored under the `"data"` key. It should support every Apify Dataset, regardless of which Actor produced it.
  - Each item must be a JSON object. Since version 2.2.62:
    - Some items are emitted with `"data"` set to a string representation instead of an object. This applies when an item exceeds 200 nested levels or contains `NaN`/`Infinity`. It also applies to numbers that don’t fit in a 64-bit float, such as `1e400`.
    - A dataset containing non-object items, such as numbers or strings, fails the stream with a `TypeError`.
    - For items with a top-level `__airbyte_apify_wrapped_item` key, its contents are merged into the record’s top level.

### `item_collection_website_content_crawler`

- Calls the same endpoint and uses the same properties as the `item_collection` stream.
- Limitations:
  - The stream uses a static schema matching datasets produced by the [Website Content Crawler](https://apify.com/apify/website-content-crawler) Actor. It only supports datasets produced by this Actor.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                 | Subject                                                                         |
| :------ | :--------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 2.2.67 | 2026-11-10 | [91349](https://github.com/airbytehq/airbyte/pull/91349) | Update dependencies |
| 2.2.66 | 2026-11-03 | [90475](https://github.com/airbytehq/airbyte/pull/90475) | Update dependencies |
| 2.2.65 | 2026-10-27 | [89790](https://github.com/airbytehq/airbyte/pull/89790) | Update dependencies |
| 2.2.64 | 2026-10-20 | [89135](https://github.com/airbytehq/airbyte/pull/89135) | Update dependencies |
| 2.2.63 | 2026-10-13 | [88544](https://github.com/airbytehq/airbyte/pull/88544) | Update dependencies |
| 2.2.62 | 2026-10-06 | [88134](https://github.com/airbytehq/airbyte/pull/88134) | Replace the custom `item_collection` record extractor with built-in declarative transformations; record output is unchanged |
| 2.2.61 | 2026-10-06 | [87770](https://github.com/airbytehq/airbyte/pull/87770) | Update dependencies |
| 2.2.60 | 2026-09-29 | [87064](https://github.com/airbytehq/airbyte/pull/87064) | Update dependencies |
| 2.2.59 | 2026-09-22 | [86526](https://github.com/airbytehq/airbyte/pull/86526) | Update dependencies |
| 2.2.58 | 2026-09-15 | [85955](https://github.com/airbytehq/airbyte/pull/85955) | Update dependencies |
| 2.2.57 | 2026-09-08 | [84487](https://github.com/airbytehq/airbyte/pull/84487) | Update dependencies |
| 2.2.56 | 2026-08-11 | [83850](https://github.com/airbytehq/airbyte/pull/83850) | Update dependencies |
| 2.2.55 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 2.2.54 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 2.2.52 — 2.2.53 is built on SDM 7.23.7, which breaks bundled custom components |
| 2.2.53 | 2026-07-28 | [82834](https://github.com/airbytehq/airbyte/pull/82834) | Update dependencies |
| 2.2.52 | 2026-07-21 | [82336](https://github.com/airbytehq/airbyte/pull/82336) | Update dependencies |
| 2.2.51 | 2026-07-14 | [81739](https://github.com/airbytehq/airbyte/pull/81739) | Update dependencies |
| 2.2.50 | 2026-06-30 | [80961](https://github.com/airbytehq/airbyte/pull/80961) | Update dependencies |
| 2.2.49 | 2026-06-23 | [80380](https://github.com/airbytehq/airbyte/pull/80380) | Update dependencies |
| 2.2.48 | 2026-06-16 | [79760](https://github.com/airbytehq/airbyte/pull/79760) | Update dependencies |
| 2.2.47 | 2026-06-09 | [79203](https://github.com/airbytehq/airbyte/pull/79203) | Update dependencies |
| 2.2.46 | 2026-06-02 | [78578](https://github.com/airbytehq/airbyte/pull/78578) | Update dependencies |
| 2.2.45 | 2026-04-28 | [77189](https://github.com/airbytehq/airbyte/pull/77189) | Update dependencies |
| 2.2.44 | 2026-04-21 | [76502](https://github.com/airbytehq/airbyte/pull/76502) | Update dependencies |
| 2.2.43 | 2026-03-31 | [75895](https://github.com/airbytehq/airbyte/pull/75895) | Update dependencies |
| 2.2.42 | 2026-03-17 | [75003](https://github.com/airbytehq/airbyte/pull/75003) | Update dependencies |
| 2.2.41 | 2026-03-10 | [74482](https://github.com/airbytehq/airbyte/pull/74482) | Update dependencies |
| 2.2.40 | 2026-02-24 | [73807](https://github.com/airbytehq/airbyte/pull/73807) | Update dependencies |
| 2.2.39 | 2026-02-03 | [72687](https://github.com/airbytehq/airbyte/pull/72687) | Update dependencies |
| 2.2.38 | 2026-01-20 | [71876](https://github.com/airbytehq/airbyte/pull/71876) | Update dependencies |
| 2.2.37 | 2026-01-14 | [71443](https://github.com/airbytehq/airbyte/pull/71443) | Update dependencies |
| 2.2.36 | 2026-01-08 | [71099](https://github.com/airbytehq/airbyte/pull/71099) | Update logo |
| 2.2.35 | 2025-12-18 | [70793](https://github.com/airbytehq/airbyte/pull/70793) | Update dependencies |
| 2.2.34 | 2025-11-25 | [69867](https://github.com/airbytehq/airbyte/pull/69867) | Update dependencies |
| 2.2.33 | 2025-11-18 | [69519](https://github.com/airbytehq/airbyte/pull/69519) | Update dependencies |
| 2.2.32 | 2025-11-04 | [68843](https://github.com/airbytehq/airbyte/pull/68843) | Update dependencies |
| 2.2.31 | 2025-10-21 | [68364](https://github.com/airbytehq/airbyte/pull/68364) | Update dependencies |
| 2.2.30 | 2025-10-14 | [67997](https://github.com/airbytehq/airbyte/pull/67997) | Update dependencies |
| 2.2.29 | 2025-10-07 | [67163](https://github.com/airbytehq/airbyte/pull/67163) | Update dependencies |
| 2.2.28 | 2025-09-30 | [66273](https://github.com/airbytehq/airbyte/pull/66273) | Update dependencies |
| 2.2.27 | 2025-08-09 | [64655](https://github.com/airbytehq/airbyte/pull/64655) | Update dependencies |
| 2.2.26 | 2025-08-02 | [64432](https://github.com/airbytehq/airbyte/pull/64432) | Update dependencies |
| 2.2.25 | 2025-07-26 | [63802](https://github.com/airbytehq/airbyte/pull/63802) | Update dependencies |
| 2.2.24 | 2025-07-05 | [62540](https://github.com/airbytehq/airbyte/pull/62540) | Update dependencies |
| 2.2.23 | 2025-06-28 | [62139](https://github.com/airbytehq/airbyte/pull/62139) | Update dependencies |
| 2.2.22 | 2025-06-15 | [61108](https://github.com/airbytehq/airbyte/pull/61108) | Update dependencies |
| 2.2.21 | 2025-05-17 | [60677](https://github.com/airbytehq/airbyte/pull/60677) | Update dependencies |
| 2.2.20 | 2025-05-10 | [59857](https://github.com/airbytehq/airbyte/pull/59857) | Update dependencies |
| 2.2.19 | 2025-05-03 | [59312](https://github.com/airbytehq/airbyte/pull/59312) | Update dependencies |
| 2.2.18 | 2025-04-26 | [58251](https://github.com/airbytehq/airbyte/pull/58251) | Update dependencies |
| 2.2.17 | 2025-04-12 | [57599](https://github.com/airbytehq/airbyte/pull/57599) | Update dependencies |
| 2.2.16 | 2025-04-05 | [57134](https://github.com/airbytehq/airbyte/pull/57134) | Update dependencies |
| 2.2.15 | 2025-03-29 | [56579](https://github.com/airbytehq/airbyte/pull/56579) | Update dependencies |
| 2.2.14 | 2025-03-22 | [56107](https://github.com/airbytehq/airbyte/pull/56107) | Update dependencies |
| 2.2.13 | 2025-03-08 | [55423](https://github.com/airbytehq/airbyte/pull/55423) | Update dependencies |
| 2.2.12 | 2025-03-01 | [54885](https://github.com/airbytehq/airbyte/pull/54885) | Update dependencies |
| 2.2.11 | 2025-02-22 | [54235](https://github.com/airbytehq/airbyte/pull/54235) | Update dependencies |
| 2.2.10 | 2025-02-15 | [53872](https://github.com/airbytehq/airbyte/pull/53872) | Update dependencies |
| 2.2.9 | 2025-02-08 | [53440](https://github.com/airbytehq/airbyte/pull/53440) | Update dependencies |
| 2.2.8 | 2025-02-01 | [52904](https://github.com/airbytehq/airbyte/pull/52904) | Update dependencies |
| 2.2.7 | 2025-01-25 | [52208](https://github.com/airbytehq/airbyte/pull/52208) | Update dependencies |
| 2.2.6 | 2025-01-18 | [51740](https://github.com/airbytehq/airbyte/pull/51740) | Update dependencies |
| 2.2.5 | 2025-01-11 | [51257](https://github.com/airbytehq/airbyte/pull/51257) | Update dependencies |
| 2.2.4 | 2024-12-28 | [50468](https://github.com/airbytehq/airbyte/pull/50468) | Update dependencies |
| 2.2.3 | 2024-12-21 | [50217](https://github.com/airbytehq/airbyte/pull/50217) | Update dependencies |
| 2.2.2 | 2024-12-14 | [49553](https://github.com/airbytehq/airbyte/pull/49553) | Update dependencies |
| 2.2.1 | 2024-12-12 | [48216](https://github.com/airbytehq/airbyte/pull/48216) | Update dependencies |
| 2.2.0 | 2024-10-29 | [47286](https://github.com/airbytehq/airbyte/pull/47286) | Migrate to manifest only format |
| 2.1.27 | 2024-10-29 | [47068](https://github.com/airbytehq/airbyte/pull/47068) | Update dependencies |
| 2.1.26 | 2024-10-12 | [46837](https://github.com/airbytehq/airbyte/pull/46837) | Update dependencies |
| 2.1.25 | 2024-10-01 | [46373](https://github.com/airbytehq/airbyte/pull/46373) | add user-agent header to be able to track Airbyte integration on Apify |
| 2.1.24 | 2024-10-05 | [46430](https://github.com/airbytehq/airbyte/pull/46430) | Update dependencies |
| 2.1.23 | 2024-09-28 | [46146](https://github.com/airbytehq/airbyte/pull/46146) | Update dependencies |
| 2.1.22 | 2024-09-21 | [45820](https://github.com/airbytehq/airbyte/pull/45820) | Update dependencies |
| 2.1.21 | 2024-09-14 | [45479](https://github.com/airbytehq/airbyte/pull/45479) | Update dependencies |
| 2.1.20 | 2024-09-07 | [45252](https://github.com/airbytehq/airbyte/pull/45252) | Update dependencies |
| 2.1.19 | 2024-08-31 | [44962](https://github.com/airbytehq/airbyte/pull/44962) | Update dependencies |
| 2.1.18 | 2024-08-24 | [44734](https://github.com/airbytehq/airbyte/pull/44734) | Update dependencies |
| 2.1.17 | 2024-08-17 | [44204](https://github.com/airbytehq/airbyte/pull/44204) | Update dependencies |
| 2.1.16 | 2024-08-10 | [43607](https://github.com/airbytehq/airbyte/pull/43607) | Update dependencies |
| 2.1.15 | 2024-08-03 | [43071](https://github.com/airbytehq/airbyte/pull/43071) | Update dependencies |
| 2.1.14 | 2024-07-27 | [42627](https://github.com/airbytehq/airbyte/pull/42627) | Update dependencies |
| 2.1.13 | 2024-07-20 | [42364](https://github.com/airbytehq/airbyte/pull/42364) | Update dependencies |
| 2.1.12 | 2024-07-13 | [41893](https://github.com/airbytehq/airbyte/pull/41893) | Update dependencies |
| 2.1.11 | 2024-07-10 | [41344](https://github.com/airbytehq/airbyte/pull/41344) | Update dependencies |
| 2.1.10 | 2024-07-09 | [41189](https://github.com/airbytehq/airbyte/pull/41189) | Update dependencies |
| 2.1.9 | 2024-07-06 | [40813](https://github.com/airbytehq/airbyte/pull/40813) | Update dependencies |
| 2.1.8 | 2024-06-25 | [40411](https://github.com/airbytehq/airbyte/pull/40411) | Update dependencies |
| 2.1.7 | 2024-06-22 | [40187](https://github.com/airbytehq/airbyte/pull/40187) | Update dependencies |
| 2.1.6 | 2024-06-04 | [39010](https://github.com/airbytehq/airbyte/pull/39010) | [autopull] Upgrade base image to v1.2.1 |
| 2.1.5 | 2024-04-19 | [37115](https://github.com/airbytehq/airbyte/pull/37115) | Updating to 0.80.0 CDK |
| 2.1.4 | 2024-04-18 | [37115](https://github.com/airbytehq/airbyte/pull/37115) | Manage dependencies with Poetry. |
| 2.1.3 | 2024-04-15 | [37115](https://github.com/airbytehq/airbyte/pull/37115) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 2.1.2 | 2024-04-12 | [37115](https://github.com/airbytehq/airbyte/pull/37115) | schema descriptions |
| 2.1.1 | 2023-12-14 | [33414](https://github.com/airbytehq/airbyte/pull/33414) | Prepare for airbyte-lib |
| 2.1.0 | 2023-10-13 | [31333](https://github.com/airbytehq/airbyte/pull/31333) | Add stream for arbitrary datasets |
| 2.0.0 | 2023-09-18 | [30428](https://github.com/airbytehq/airbyte/pull/30428) | Fix broken stream, manifest refactor |
| 1.0.0 | 2023-08-25 | [29859](https://github.com/airbytehq/airbyte/pull/29859) | Migrate to lowcode |
| 0.2.0 | 2022-06-20 | [28290](https://github.com/airbytehq/airbyte/pull/28290) | Make connector work with platform changes not syncing empty stream schemas. |
| 0.1.11 | 2022-04-27 | [12397](https://github.com/airbytehq/airbyte/pull/12397) | No changes. Used connector to test publish workflow changes. |
| 0.1.9   | 2022-04-05 | [PR\#11712](https://github.com/airbytehq/airbyte/pull/11712) | No changes from 0.1.4. Used connector to test publish workflow changes.         |
| 0.1.4   | 2021-12-23 | [PR\#8434](https://github.com/airbytehq/airbyte/pull/8434)   | Update fields in source-connectors specifications                               |
| 0.1.2   | 2021-11-08 | [PR\#7499](https://github.com/airbytehq/airbyte/pull/7499)   | Remove base-python dependencies                                                 |
| 0.1.0   | 2021-07-29 | [PR\#5069](https://github.com/airbytehq/airbyte/pull/5069)   | Initial version of the connector                                                |

</details>
