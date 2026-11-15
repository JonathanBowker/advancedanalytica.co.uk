---
generated_record: true
connector_name: Fullstory
connector_type: source
connector_slug: fullstory
connector_directory: source-fullstory
definition_id: 263fd456-02d1-4a26-a35e-52ccaedad778
version: 0.2.24
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/fullstory
logo: /images/connectors/sources/fullstory.svg
logo_source_path: airbyte-integrations/connectors/source-fullstory/icon.svg
logo_sha256: 9f70a6c84e3e9f73c7792bbf3a23365da61e0ed88740fedea2d3defaf8c52e7d
original_metadata_path: airbyte-integrations/connectors/source-fullstory/metadata.yaml
original_metadata_sha256: c7ebe7456673034324fda162400a0569dd0f11367cb9340983d0363daa9657f6
original_document_path: docs/integrations/sources/fullstory.md
original_document_sha256: 81bf42de175e0615d51ea76a7f6d481f64525e19028eed1b501818fd285ba78d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1e09991bc15b5dc216862e9d28b1a536a1d15d3b2994ec1fe8422c1c0d169949
rewritten_at: 2026-11-12T13:38:37.461073+00:00
---

# FullStory

This page explains how to set up the [FullStory](https://developer.fullstory.com/) source and provides reference information.

## Prerequisites

You need an API Key, which acts as a bearer token. Find it in settings (ref - https://app.fullstory.com/ui/o-1K942V-na1/settings/apikeys).

## Setup guide

### Step 1: Set up your FullStory connection

- Get a FullStory api key from settings (ref - https://app.fullstory.com/ui/o-1K942V-na1/settings/apikeys)
- Set up all required params
- Available params
  - api_key: The generated api key
  - uid: The unique identifier configured in the fullstory script under FS.identify (used by the `sessions` stream)

## Step 2: Set up the FullStory connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.io/workspaces) account.
2. In the left navigation bar, click **Sources**. Then click **+new source** in the top-right corner.
3. On the Set up the source page, enter a name for the FullStory connector. Select **FullStory** from the Source type dropdown.
4. Enter your `api_key` and `uid`.
5. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Enter a name for your source.
3. Enter your `api_key` and `uid`.
4. Click **Set up source**.

## Supported sync modes

The FullStory source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- [sessions](https://developer.fullstory.com/server/v1/sessions/list-sessions/)
- [segments](https://developer.fullstory.com/server/v1/segments/list-segments/)
- [operations](https://developer.fullstory.com/server/v1/operations/list-operations/)
- [blockrules](https://developer.fullstory.com/server/v1/settings/get-recording-block-rules/)
- [domainsettings](https://developer.fullstory.com/server/v1/settings/get-domain-settings/)
- [geosettings](https://developer.fullstory.com/server/v1/settings/get-geo-settings/)
- [recordingfeatures](https://developer.fullstory.com/server/v1/settings/get-recording-features/)
- [sessionTargetingRules](https://developer.fullstory.com/server/v1/settings/get-targeting-settings/)
- [webhooks](https://developer.fullstory.com/anywhere/v1/webhooks/list-endpoints/)
- [eventDefs](https://developer.fullstory.com/anywhere/v1/webhooks/list-event-types/)

## API method example

GET https://api.fullstory.com/segments/v1

## Performance considerations

FullStory [API reference](https://api.fullstory.com) currently has v1. The connector uses v1 by default.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                       | Subject        |
| :------ | :--------- | :------------------------------------------------- | :------------- |
| 0.2.24 | 2026-10-07 | [88221](https://github.com/airbytehq/airbyte/pull/88221) | Fix settings streams returning no records, fix `webhooks` extraction, apply pagination to `segments`, `operations` and `webhooks` |
| 0.2.23 | 2025-05-24 | [60356](https://github.com/airbytehq/airbyte/pull/60356) | Update dependencies |
| 0.2.22 | 2025-05-10 | [59932](https://github.com/airbytehq/airbyte/pull/59932) | Update dependencies |
| 0.2.21 | 2025-05-03 | [59376](https://github.com/airbytehq/airbyte/pull/59376) | Update dependencies |
| 0.2.20 | 2025-04-26 | [58853](https://github.com/airbytehq/airbyte/pull/58853) | Update dependencies |
| 0.2.19 | 2025-04-19 | [58356](https://github.com/airbytehq/airbyte/pull/58356) | Update dependencies |
| 0.2.18 | 2025-04-12 | [57767](https://github.com/airbytehq/airbyte/pull/57767) | Update dependencies |
| 0.2.17 | 2025-04-05 | [57282](https://github.com/airbytehq/airbyte/pull/57282) | Update dependencies |
| 0.2.16 | 2025-03-29 | [56531](https://github.com/airbytehq/airbyte/pull/56531) | Update dependencies |
| 0.2.15 | 2025-03-22 | [55993](https://github.com/airbytehq/airbyte/pull/55993) | Update dependencies |
| 0.2.14 | 2025-03-08 | [55299](https://github.com/airbytehq/airbyte/pull/55299) | Update dependencies |
| 0.2.13 | 2025-03-01 | [54968](https://github.com/airbytehq/airbyte/pull/54968) | Update dependencies |
| 0.2.12 | 2025-02-22 | [54398](https://github.com/airbytehq/airbyte/pull/54398) | Update dependencies |
| 0.2.11 | 2025-02-15 | [53768](https://github.com/airbytehq/airbyte/pull/53768) | Update dependencies |
| 0.2.10 | 2025-02-08 | [53359](https://github.com/airbytehq/airbyte/pull/53359) | Update dependencies |
| 0.2.9 | 2025-02-01 | [52870](https://github.com/airbytehq/airbyte/pull/52870) | Update dependencies |
| 0.2.8 | 2025-01-25 | [52304](https://github.com/airbytehq/airbyte/pull/52304) | Update dependencies |
| 0.2.7 | 2025-01-18 | [51657](https://github.com/airbytehq/airbyte/pull/51657) | Update dependencies |
| 0.2.6 | 2025-01-11 | [51078](https://github.com/airbytehq/airbyte/pull/51078) | Update dependencies |
| 0.2.5 | 2025-01-04 | [50587](https://github.com/airbytehq/airbyte/pull/50587) | Update dependencies |
| 0.2.4 | 2024-12-21 | [50050](https://github.com/airbytehq/airbyte/pull/50050) | Update dependencies |
| 0.2.3 | 2024-12-14 | [49524](https://github.com/airbytehq/airbyte/pull/49524) | Update dependencies |
| 0.2.2 | 2024-12-12 | [49156](https://github.com/airbytehq/airbyte/pull/49156) | Update dependencies |
| 0.2.1 | 2024-10-29 | [47794](https://github.com/airbytehq/airbyte/pull/47794) | Update dependencies |
| 0.2.0 | 2024-08-23 | [44612](https://github.com/airbytehq/airbyte/pull/44612) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-17 | [44222](https://github.com/airbytehq/airbyte/pull/44222) | Update dependencies |
| 0.1.13 | 2024-08-12 | [43781](https://github.com/airbytehq/airbyte/pull/43781) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43688](https://github.com/airbytehq/airbyte/pull/43688) | Update dependencies |
| 0.1.11 | 2024-08-03 | [43197](https://github.com/airbytehq/airbyte/pull/43197) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42694](https://github.com/airbytehq/airbyte/pull/42694) | Update dependencies |
| 0.1.9 | 2024-07-20 | [42299](https://github.com/airbytehq/airbyte/pull/42299) | Update dependencies |
| 0.1.8 | 2024-07-13 | [41798](https://github.com/airbytehq/airbyte/pull/41798) | Update dependencies |
| 0.1.7 | 2024-07-10 | [41387](https://github.com/airbytehq/airbyte/pull/41387) | Update dependencies |
| 0.1.6 | 2024-07-09 | [41190](https://github.com/airbytehq/airbyte/pull/41190) | Update dependencies |
| 0.1.5 | 2024-07-06 | [40867](https://github.com/airbytehq/airbyte/pull/40867) | Update dependencies |
| 0.1.4 | 2024-06-25 | [40333](https://github.com/airbytehq/airbyte/pull/40333) | Update dependencies |
| 0.1.3 | 2024-06-22 | [40192](https://github.com/airbytehq/airbyte/pull/40192) | Update dependencies |
| 0.1.2 | 2024-06-06 | [39195](https://github.com/airbytehq/airbyte/pull/39195) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-20 | [38420](https://github.com/airbytehq/airbyte/pull/38420) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2023-04-25 | [Init](https://github.com/airbytehq/airbyte/pull/) | Initial commit |

</details>
