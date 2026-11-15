---
generated_record: true
connector_name: PostHog
connector_type: source
connector_slug: posthog
connector_directory: source-posthog
definition_id: af6d50ee-dddf-4126-a8ee-7faee990774f
version: 1.1.31
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/sources/posthog
logo: /images/connectors/sources/posthog.svg
logo_source_path: airbyte-integrations/connectors/source-posthog/icon.svg
logo_sha256: cd31bd67f2917554d53f0e0a0c5178a846647212c3c8174968c8904f44a8a558
original_metadata_path: airbyte-integrations/connectors/source-posthog/metadata.yaml
original_metadata_sha256: 5ede9fbe90a668f3924a06b52c6ff1ceeed54459fa32365ebcadcc26e98c05a9
original_document_path: docs/integrations/sources/posthog.md
original_document_sha256: b3c538716711a2a48160ab38a34c6ca07a266035db9156c0d965271e2a52ad39
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 01f408c8362cab408101dd9231ca29373f412c02206e5e3825799ced8000f6db
rewritten_at: 2026-11-12T13:51:58.256513+00:00
---

# PostHog

Use this page to set up the PostHog source connector and find reference information.

## Prerequisites

- api_key - get your account's Private API Key by following [steps](https://posthog.com/docs/api/overview#how-to-obtain-a-personal-api-key)
- base_url - defaults to https://app.posthog.com', but may differ for self-hosted PostHog instances

## Setup guide

### Step 1: Set up PostHog

- PostHog Account

## Step 2: Set up the PostHog connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Select **Sources** from the left navigation bar. Then, select **+new source** in the top-right corner.
3. On the Set up the source page, enter a name for the PostHog connector. Select **PostHog** from the Source type dropdown.
4. Enter your `apikey`.
5. Enter your `start_date`.
6. Change the default `base_url` if you use a self-hosted PostHog instance.
7. Select **Set up source**.

### Airbyte OSS

1. Open the Airbyte Open Source dashboard.
2. Enter a name for your source.
3. Enter your `api_key`.
4. Enter your `start_date`.
5. Change the default `base_url` if you use a self-hosted PostHog instance.
6. Select **Set up source**.

## Supported streams and sync modes

- [Projects](https://posthog.com/docs/api/projects)
- [Annotations](https://posthog.com/docs/api/annotations)
- [Cohorts](https://posthog.com/docs/api/cohorts)
- [Events](https://posthog.com/docs/api/events) \(Incremental\)
- [FeatureFlags](https://posthog.com/docs/api/feature-flags)
- [Insights](https://posthog.com/docs/api/insights)
- [Persons](https://posthog.com/docs/api/people)

### Rate limits

Private `GET`, `POST`, `PATCH` and `DELETE` endpoints have rate limits. Public POST-only endpoints are **not** rate limited. Rate limits generally apply when you authenticate with a personal API key.

Different resource types have separate limits.

- Analytics endpoints have limits of `240/minute` and `1200/hour`. These include calculating insights, retrieving persons and retrieving session recordings.

- The [HogQL query](https://posthog.com/docs/hogql#api-access) endpoint (`/api/project/:id/query`) has a rate limit of `120/hour`.

- All other create, read, update and delete endpoints have limits of `480/minute` and `4800/hour`.

- Public POST-only endpoints have no rate limits. These include event capture (`/capture`) and feature flag evaluation (`/decide`).

These limits apply to **the entire team**, meaning all users within your PostHog organisation. For example, a script requesting feature flag metadata might reach the rate limit. A different user's single persons API request is then also rate limited, even with another personal API key.

Use [batch exports](https://posthog.com/docs/cdp) for large or regular event exports.

To use the PostHog API beyond these limits, email PostHog at `customers@posthog.com`.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                 |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| 1.1.31 | 2026-11-10 | [91639](https://github.com/airbytehq/airbyte/pull/91639) | Update dependencies |
| 1.1.30 | 2026-11-03 | [90903](https://github.com/airbytehq/airbyte/pull/90903) | Require Python 3.11 or newer, retaining support through Python 3.13. |
| 1.1.29 | 2026-11-03 | [90691](https://github.com/airbytehq/airbyte/pull/90691) | Update dependencies |
| 1.1.28 | 2026-10-27 | [90013](https://github.com/airbytehq/airbyte/pull/90013) | Update dependencies |
| 1.1.27 | 2026-10-20 | [78912](https://github.com/airbytehq/airbyte/pull/78912) | Update dependencies |
| 1.1.26 | 2026-10-14 | [88960](https://github.com/airbytehq/airbyte/pull/88960) | Update to CDK v7 and base image 4.1.1 |
| 1.1.25 | 2025-02-01 | [53032](https://github.com/airbytehq/airbyte/pull/53032) | Update dependencies |
| 1.1.24 | 2025-01-25 | [52536](https://github.com/airbytehq/airbyte/pull/52536) | Update dependencies |
| 1.1.23 | 2025-01-18 | [51856](https://github.com/airbytehq/airbyte/pull/51856) | Update dependencies |
| 1.1.22 | 2025-01-11 | [51313](https://github.com/airbytehq/airbyte/pull/51313) | Update dependencies |
| 1.1.21 | 2024-12-28 | [50685](https://github.com/airbytehq/airbyte/pull/50685) | Update dependencies |
| 1.1.20 | 2024-12-21 | [50280](https://github.com/airbytehq/airbyte/pull/50280) | Update dependencies |
| 1.1.19 | 2024-12-14 | [49716](https://github.com/airbytehq/airbyte/pull/49716) | Update dependencies |
| 1.1.18 | 2024-12-12 | [49066](https://github.com/airbytehq/airbyte/pull/49066) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 1.1.17 | 2024-10-29 | [47724](https://github.com/airbytehq/airbyte/pull/47724) | Update dependencies |
| 1.1.16 | 2024-10-28 | [47033](https://github.com/airbytehq/airbyte/pull/47033) | Update dependencies |
| 1.1.15 | 2024-10-12 | [46769](https://github.com/airbytehq/airbyte/pull/46769) | Update dependencies |
| 1.1.14 | 2024-10-05 | [46421](https://github.com/airbytehq/airbyte/pull/46421) | Update dependencies |
| 1.1.13 | 2024-09-28 | [46108](https://github.com/airbytehq/airbyte/pull/46108) | Update dependencies |
| 1.1.12 | 2024-09-21 | [45796](https://github.com/airbytehq/airbyte/pull/45796) | Update dependencies |
| 1.1.11 | 2024-09-14 | [45570](https://github.com/airbytehq/airbyte/pull/45570) | Update dependencies |
| 1.1.10 | 2024-09-07 | [45241](https://github.com/airbytehq/airbyte/pull/45241) | Update dependencies |
| 1.1.9 | 2024-08-31 | [44996](https://github.com/airbytehq/airbyte/pull/44996) | Update dependencies |
| 1.1.8 | 2024-08-24 | [44658](https://github.com/airbytehq/airbyte/pull/44658) | Update dependencies |
| 1.1.7 | 2024-08-17 | [44350](https://github.com/airbytehq/airbyte/pull/44350) | Update dependencies |
| 1.1.6 | 2024-08-13 | [44016](https://github.com/airbytehq/airbyte/pull/44016) | Fix `events` stream pagniator to workaround PostHog API issue [#13508](https://github.com/PostHog/posthog/issues/13508) |
| 1.1.5 | 2024-08-10 | [43488](https://github.com/airbytehq/airbyte/pull/43488) | Update dependencies |
| 1.1.4 | 2024-08-03 | [43232](https://github.com/airbytehq/airbyte/pull/43232) | Update dependencies |
| 1.1.3 | 2024-07-27 | [42769](https://github.com/airbytehq/airbyte/pull/42769) | Update dependencies |
| 1.1.2 | 2024-07-20 | [42151](https://github.com/airbytehq/airbyte/pull/42151) | Update dependencies |
| 1.1.1 | 2024-07-13 | [41823](https://github.com/airbytehq/airbyte/pull/41823) | Update dependencies |
| 1.1.0 | 2024-06-20 | [39763](https://github.com/airbytehq/airbyte/pull/39763) | Add `properties` and `uuid` attributes to persons stream |
| 1.0.0 | 2023-12-04 | [28593](https://github.com/airbytehq/airbyte/pull/28593) | Fix events.event type |
| 0.1.15 | 2023-10-28 | [31265](https://github.com/airbytehq/airbyte/pull/31265) | Fix Events stream datetime format |
| 0.1.14 | 2023-08-29 | [29947](https://github.com/airbytehq/airbyte/pull/29947) | Add optional field to spec: `events_time_step` |
| 0.1.13 | 2023-07-19 | [28461](https://github.com/airbytehq/airbyte/pull/28461) | Fixed EventsSimpleRetriever declaration |
| 0.1.12 | 2023-06-28 | [27764](https://github.com/airbytehq/airbyte/pull/27764) | Update following state breaking changes |
| 0.1.11 | 2023-06-09 | [27135](https://github.com/airbytehq/airbyte/pull/27135) | Fix custom EventsSimpleRetriever |
| 0.1.10 | 2023-04-15 | [24084](https://github.com/airbytehq/airbyte/pull/24084) | Increase `events` streams batch size |
| 0.1.9 | 2023-02-13 | [22906](https://github.com/airbytehq/airbyte/pull/22906) | Specified date formatting in specification |
| 0.1.8 | 2022-11-11 | [18993](https://github.com/airbytehq/airbyte/pull/18993) | connector migrated to low-code, added projects,insights streams, added project based slicing for all other streams |
| 0.1.7 | 2022-07-26 | [14585](https://github.com/airbytehq/airbyte/pull/14585) | Add missing 'properties' field to event attributes |
| 0.1.6 | 2022-01-20 | [8617](https://github.com/airbytehq/airbyte/pull/8617) | Update connector fields title/description |
| 0.1.5 | 2021-12-24 | [9082](https://github.com/airbytehq/airbyte/pull/9082) | Remove obsolete session_events and insights streams |
| 0.1.4 | 2021-09-14 | [6058](https://github.com/airbytehq/airbyte/pull/6058) | Support self-hosted posthog instances |
| 0.1.3 | 2021-07-20 | [4001](https://github.com/airbytehq/airbyte/pull/4001) | Incremental streams read only relevant pages |
| 0.1.2 | 2021-07-15 | [4692](https://github.com/airbytehq/airbyte/pull/4692) | Use account information for checking the connection |
| 0.1.1 | 2021-07-05 | [4539](https://github.com/airbytehq/airbyte/pull/4539) | Add `AIRBYTE_ENTRYPOINT` env variable for kubernetes support |
| 0.1.0 | 2021-06-08 | [3768](https://github.com/airbytehq/airbyte/pull/3768) | Initial Release |

</details>
