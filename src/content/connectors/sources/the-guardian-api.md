---
generated_record: true
connector_name: The Guardian API
connector_type: source
connector_slug: the-guardian-api
connector_directory: source-the-guardian-api
definition_id: d42bd69f-6bf0-4d0b-9209-16231af07a92
version: 0.2.27
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/the-guardian-api
logo: /images/connectors/sources/the-guardian-api.svg
logo_source_path: airbyte-integrations/connectors/source-the-guardian-api/icon.svg
logo_sha256: 5fab30d5995a5d14a853d7cdead9faae1e31c21b48782f2554b872cf76dadaf1
original_metadata_path: airbyte-integrations/connectors/source-the-guardian-api/metadata.yaml
original_metadata_sha256: e25cf57421da757eef39c57c3fb39b4618ebaacf696ce39082b791225ca49e38
original_document_path: docs/integrations/sources/the-guardian-api.md
original_document_sha256: 09f3e789f63ec4394dc50eb324639b5d8ed1275a549ca7f0e6574412e1352bd7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d8a220c3b6772a73d13cffb5810e015fd6179f3dc5a1ea4de73201d286edc141
rewritten_at: 2026-11-12T13:58:31.950427+00:00
---

# The Guardian API

## Overview

Sync data from the [The Guardian](https://open-platform.theguardian.com/) with The Guardian API source.

## Requirements

You’ll need an API key to access the API. Send this key with every request. Visit [this](https://open-platform.theguardian.com/access) link to register for an API key.

You can provide the following optional parameters to the connector:

---

##### `q` (query)

Use the `q` (query) parameter to show only results containing that search term. The `q` parameter supports `AND`, `OR` and `NOT` operators. For example, search the Guardian for content about political debates: `https://content.guardianapis.com/search?q=debates`

The q parameter shows only results containing that search term. This search returns many results, so you can narrow the response to more meaningful content. For example, you can find political content published in 2014: `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&api-key=test`

---

##### `tag`

A tag is data used to categorise content. All Guardian content is manually categorised using more than 50,000 tags. Use this parameter to show only results matching the entered tag. See <a href="https://content.guardianapis.com/tags?api-key=test">here</a> for all tags and <a href="https://open-platform.theguardian.com/documentation/tag">here</a> for the tags endpoint documentation.

---

##### `section`

Use this parameter to show results from a specific section. See <a href="https://content.guardianapis.com/sections?api-key=test">here</a> for all sections and <a href="https://open-platform.theguardian.com/documentation/section">here</a> for the sections endpoint documentation.

---

##### `order-by`

Use this parameter to sort results by newest, oldest or relevance. To enable incremental syncs, set order-by to oldest.

---

##### `start_date`

Use this parameter to set the results’ minimum date in YYYY-MM-DD format. Results older than the start_date won’t appear.

---

##### `end_date`

Use this parameter to set the results’ maximum date in YYYY-MM-DD format. Results newer than the end_date won’t appear.
For incremental syncs, the default is the current date (today).

---

## Output schema

#### Content item structure

```yaml
{
    "id": "string",
    "type": "string"
    "sectionId": "string"
    "sectionName": "string"
    "webPublicationDate": "string"
    "webTitle": "string"
    "webUrl": "string"
    "apiUrl": "string"
    "isHosted": "boolean"
    "pillarId": "string"
    "pillarName": "string"
}
```

The source can sync the content stream.

## Setup guide

## Step 1: Set up The Guardian API connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Select **Sources** from the left navigation bar. Then, select **+new source** in the top-right corner.
3. On the Set up the source page, select **The Guardian API** from the Source type dropdown.
4. Enter your mandatory api_key and any optional parameters you need.
5. Select **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Set your source name to The Guardian API.
3. Enter your mandatory api_key and any optional parameters you need.
4. Select **Set up source**.

## Supported sync modes

The Guardian API source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |
| Namespaces        | No         |

## Performance considerations

Your assigned key is rate-limited. Applications making many polling requests may exceed their daily quota. Further requests will then be blocked until the next period begins. A free [developer key](https://open-platform.theguardian.com/access/) allows up to 1 call per second and 500 calls per day. The connector requests 50 results per page, which is the API maximum. It splits the date range into 7-day windows. A large initial sync covering several years may therefore need to run across multiple days.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                                                |
|:--------|:-----------| :------------------------------------------------------- |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0.2.27 | 2026-10-07 | [88327](https://github.com/airbytehq/airbyte/pull/88327) | Fix pagination requesting page 1 twice (duplicate records) and send `page-size=50` as a query parameter instead of an ignored request body; document incremental sync support |
| 0.2.26 | 2025-05-25 | [60501](https://github.com/airbytehq/airbyte/pull/60501) | Update dependencies |
| 0.2.25 | 2025-05-10 | [60109](https://github.com/airbytehq/airbyte/pull/60109) | Update dependencies |
| 0.2.24 | 2025-05-04 | [59627](https://github.com/airbytehq/airbyte/pull/59627) | Update dependencies |
| 0.2.23 | 2025-04-27 | [58436](https://github.com/airbytehq/airbyte/pull/58436) | Update dependencies |
| 0.2.22 | 2025-04-22 | [58596](https://github.com/airbytehq/airbyte/pull/58596) | Manifest cleanup |
| 0.2.21 | 2025-04-12 | [57938](https://github.com/airbytehq/airbyte/pull/57938) | Update dependencies |
| 0.2.20 | 2025-04-05 | [57416](https://github.com/airbytehq/airbyte/pull/57416) | Update dependencies |
| 0.2.19 | 2025-03-29 | [56904](https://github.com/airbytehq/airbyte/pull/56904) | Update dependencies |
| 0.2.18 | 2025-03-22 | [56262](https://github.com/airbytehq/airbyte/pull/56262) | Update dependencies |
| 0.2.17 | 2025-03-08 | [55644](https://github.com/airbytehq/airbyte/pull/55644) | Update dependencies |
| 0.2.16 | 2025-03-01 | [55113](https://github.com/airbytehq/airbyte/pull/55113) | Update dependencies |
| 0.2.15 | 2025-02-22 | [54515](https://github.com/airbytehq/airbyte/pull/54515) | Update dependencies |
| 0.2.14 | 2025-02-15 | [54044](https://github.com/airbytehq/airbyte/pull/54044) | Update dependencies |
| 0.2.13 | 2025-02-08 | [53584](https://github.com/airbytehq/airbyte/pull/53584) | Update dependencies |
| 0.2.12 | 2025-02-01 | [53036](https://github.com/airbytehq/airbyte/pull/53036) | Update dependencies |
| 0.2.11 | 2025-01-25 | [52381](https://github.com/airbytehq/airbyte/pull/52381) | Update dependencies |
| 0.2.10 | 2025-01-18 | [51417](https://github.com/airbytehq/airbyte/pull/51417) | Update dependencies |
| 0.2.9 | 2025-01-13 | [50855](https://github.com/airbytehq/airbyte/pull/50855) | Update to latest CDK and fix custom pagination strategy |
| 0.2.8 | 2024-12-28 | [50818](https://github.com/airbytehq/airbyte/pull/50818) | Update dependencies |
| 0.2.7 | 2024-12-21 | [50341](https://github.com/airbytehq/airbyte/pull/50341) | Update dependencies |
| 0.2.6 | 2024-12-14 | [49797](https://github.com/airbytehq/airbyte/pull/49797) | Update dependencies |
| 0.2.5 | 2024-12-12 | [49378](https://github.com/airbytehq/airbyte/pull/49378) | Update dependencies |
| 0.2.4 | 2024-12-11 | [48790](https://github.com/airbytehq/airbyte/pull/48790) | Add unit tests for custom components |
| 0.2.3 | 2024-12-11 | [48201](https://github.com/airbytehq/airbyte/pull/48201) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.2 | 2024-10-29 | [47779](https://github.com/airbytehq/airbyte/pull/47779) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47456](https://github.com/airbytehq/airbyte/pull/47456) | Update dependencies |
| 0.2.0 | 2024-09-06 | [45195](https://github.com/airbytehq/airbyte/pull/45195) | Refactor connector to manifest-only format |
| 0.1.9 | 2024-08-31 | [44997](https://github.com/airbytehq/airbyte/pull/44997) | Update dependencies |
| 0.1.8 | 2024-08-24 | [44746](https://github.com/airbytehq/airbyte/pull/44746) | Update dependencies |
| 0.1.7 | 2024-08-17 | [44208](https://github.com/airbytehq/airbyte/pull/44208) | Update dependencies |
| 0.1.6 | 2024-08-10 | [43540](https://github.com/airbytehq/airbyte/pull/43540) | Update dependencies |
| 0.1.5 | 2024-08-03 | [42781](https://github.com/airbytehq/airbyte/pull/42781) | Update dependencies |
| 0.1.4 | 2024-07-20 | [42316](https://github.com/airbytehq/airbyte/pull/42316) | Update dependencies |
| 0.1.3 | 2024-07-13 | [41878](https://github.com/airbytehq/airbyte/pull/41878) | Update dependencies |
| 0.1.2 | 2024-07-10 | [41505](https://github.com/airbytehq/airbyte/pull/41505) | Update dependencies |
| 0.1.1 | 2024-07-10 | [41049](https://github.com/airbytehq/airbyte/pull/41049) | Migrate to poetry |
| 0.1.0 | 2022-10-30 | [18654](https://github.com/airbytehq/airbyte/pull/18654) | 🎉 New Source: The Guardian API [low-code CDK] |

</details>
