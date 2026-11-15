---
generated_record: true
connector_name: Gainsight Px
connector_type: source
connector_slug: gainsight-px
connector_directory: source-gainsight-px
definition_id: 0da3b186-8879-4e94-8738-55b48762f1e8
version: 0.2.35
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/gainsight-px
logo: /images/connectors/sources/gainsight-px.svg
logo_source_path: airbyte-integrations/connectors/source-gainsight-px/icon.svg
logo_sha256: e485b43ff3ddf28c6062425b2c355af0f7057113fdaab6a72df17920adf9e86a
original_metadata_path: airbyte-integrations/connectors/source-gainsight-px/metadata.yaml
original_metadata_sha256: c5da2d26aec053cd7a38e1481e44cba17fae0de4ab595dda6ef062529adb3a93
original_document_path: docs/integrations/sources/gainsight-px.md
original_document_sha256: aad034f364d03308e4e1b1872b12a700c6f9c4641ebc0231aebbb5174ab8f5b8
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 71aef2564b7995e5979d2a08a9b07b874164f599861fe6b7e302096f66720eb6
rewritten_at: 2026-11-12T13:38:35.961262+00:00
---

# Gainsight-API

Set up the [Gainsight-PX-API](https://gainsightpx.docs.apiary.io/) source connector from [Gainsight-PX](https://support.gainsight.com/PX/API_for_Developers) using this guide and reference information.

## Prerequisites

You need an API key for this connector. Generate it in the dashboard settings (ref - https://app.aptrinsic.com/settings/api-keys).

## Setup guide

### Step 1: Set up your Gainsight-API connection

- Generate an API key (Example: 12345)
- Add params if you need specific information
- Available params
  - api_key: The aptrinsic api_key

## Step 2: Set up the Gainsight-APIs connector in Airbyte

### Airbyte Cloud

1. Have a [Log into your Airbyte Cloud](https://cloud.airbyte.io/workspaces) account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+new source**.
3. On the Set up the source page, name the Gainsight-API connector. Select **Gainsight-API** from the Source type dropdown.
4. Enter your `api_key`.
5. Enter the params configuration if needed. Supported params are: query, orientation, size, color, locale, collection_id, \
   video_id, photo_id
6. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Name your source.
3. Enter your `api_key`.
4. Enter the params configuration if needed. Supported params are: query, orientation, size, color, locale, collection_id, \
   video_id, photo_id
5. Click **Set up source**.

## Supported sync modes

The Gainsight-API source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- accounts
- admin_attributes
- articles
- feature
- kcbot
- segments
- user_attributes
- users

## API method example

GET https://api.aptrinsic.com/v1/accounts

## Performance considerations

Gainsight-PX-API's [API reference](https://gainsightpx.docs.apiary.io/) currently has v1. The connector uses v1 by default.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                 |
| :------ | :--------- | :------------------------------------------------------- |:----------------------------------------|
| 0.2.35 | 2026-09-15 | [78701](https://github.com/airbytehq/airbyte/pull/78701) | Update dependencies |
| 0.2.34 | 2025-08-23 | [65292](https://github.com/airbytehq/airbyte/pull/65292) | Update dependencies |
| 0.2.33 | 2025-08-09 | [64786](https://github.com/airbytehq/airbyte/pull/64786) | Update dependencies |
| 0.2.32 | 2025-08-02 | [64345](https://github.com/airbytehq/airbyte/pull/64345) | Update dependencies |
| 0.2.31 | 2025-07-26 | [64048](https://github.com/airbytehq/airbyte/pull/64048) | Update dependencies |
| 0.2.30 | 2025-07-19 | [63599](https://github.com/airbytehq/airbyte/pull/63599) | Update dependencies |
| 0.2.29 | 2025-07-12 | [62993](https://github.com/airbytehq/airbyte/pull/62993) | Update dependencies |
| 0.2.28 | 2025-07-05 | [62800](https://github.com/airbytehq/airbyte/pull/62800) | Update dependencies |
| 0.2.27 | 2025-06-28 | [62365](https://github.com/airbytehq/airbyte/pull/62365) | Update dependencies |
| 0.2.26 | 2025-06-21 | [61951](https://github.com/airbytehq/airbyte/pull/61951) | Update dependencies |
| 0.2.25 | 2025-06-14 | [61165](https://github.com/airbytehq/airbyte/pull/61165) | Update dependencies |
| 0.2.24 | 2025-05-24 | [60390](https://github.com/airbytehq/airbyte/pull/60390) | Update dependencies |
| 0.2.23 | 2025-05-10 | [60045](https://github.com/airbytehq/airbyte/pull/60045) | Update dependencies |
| 0.2.22 | 2025-05-03 | [59391](https://github.com/airbytehq/airbyte/pull/59391) | Update dependencies |
| 0.2.21 | 2025-04-26 | [58859](https://github.com/airbytehq/airbyte/pull/58859) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58372](https://github.com/airbytehq/airbyte/pull/58372) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57759](https://github.com/airbytehq/airbyte/pull/57759) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57217](https://github.com/airbytehq/airbyte/pull/57217) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56481](https://github.com/airbytehq/airbyte/pull/56481) | Update dependencies |
| 0.2.16 | 2025-03-22 | [55985](https://github.com/airbytehq/airbyte/pull/55985) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55337](https://github.com/airbytehq/airbyte/pull/55337) | Update dependencies |
| 0.2.14 | 2025-03-01 | [54970](https://github.com/airbytehq/airbyte/pull/54970) | Update dependencies |
| 0.2.13 | 2025-02-22 | [54408](https://github.com/airbytehq/airbyte/pull/54408) | Update dependencies |
| 0.2.12 | 2025-02-15 | [53719](https://github.com/airbytehq/airbyte/pull/53719) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53311](https://github.com/airbytehq/airbyte/pull/53311) | Update dependencies |
| 0.2.10 | 2025-02-01 | [52847](https://github.com/airbytehq/airbyte/pull/52847) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52362](https://github.com/airbytehq/airbyte/pull/52362) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51703](https://github.com/airbytehq/airbyte/pull/51703) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51090](https://github.com/airbytehq/airbyte/pull/51090) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50511](https://github.com/airbytehq/airbyte/pull/50511) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50041](https://github.com/airbytehq/airbyte/pull/50041) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49533](https://github.com/airbytehq/airbyte/pull/49533) | Update dependencies |
| 0.2.3 | 2024-12-12 | [48195](https://github.com/airbytehq/airbyte/pull/48195) | Update dependencies |
| 0.2.2 | 2024-10-29 | [47864](https://github.com/airbytehq/airbyte/pull/47864) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47626](https://github.com/airbytehq/airbyte/pull/47626) | Update dependencies |
| 0.2.0 | 2024-08-19 | [44414](https://github.com/airbytehq/airbyte/pull/44414) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-17 | [44248](https://github.com/airbytehq/airbyte/pull/44248) | Update dependencies |
| 0.1.13 | 2024-08-12 | [43902](https://github.com/airbytehq/airbyte/pull/43902) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43117](https://github.com/airbytehq/airbyte/pull/43117) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42732](https://github.com/airbytehq/airbyte/pull/42732) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42182](https://github.com/airbytehq/airbyte/pull/42182) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41928](https://github.com/airbytehq/airbyte/pull/41928) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41365](https://github.com/airbytehq/airbyte/pull/41365) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41075](https://github.com/airbytehq/airbyte/pull/41075) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40893](https://github.com/airbytehq/airbyte/pull/40893) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40352](https://github.com/airbytehq/airbyte/pull/40352) | Update dependencies |
| 0.1.4 | 2024-06-22 | [39988](https://github.com/airbytehq/airbyte/pull/39988) | Update dependencies |
| 0.1.3 | 2024-06-04 | [38979](https://github.com/airbytehq/airbyte/pull/38979) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.2 | 2024-05-28 | [38669](https://github.com/airbytehq/airbyte/pull/38669) | Make connector compatible with Builder |
| 0.1.1 | 2024-05-03 | [37593](https://github.com/airbytehq/airbyte/pull/37593) | Changed `last_records` to `last_record` |
| 0.1.0 | 2023-05-10 | [26998](https://github.com/airbytehq/airbyte/pull/26998) | Initial PR |

</details>
