---
generated_record: true
connector_name: Zenloop
connector_type: source
connector_slug: zenloop
connector_directory: source-zenloop
definition_id: f1e4c7f6-db5c-4035-981f-d35ab4998794
version: 0.1.49
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/sources/zenloop
logo: /images/connectors/sources/zenloop.svg
logo_source_path: airbyte-integrations/connectors/source-zenloop/icon.svg
logo_sha256: e685137aea40838858fd42e879af2ad12fd5265ecedb3f6c1ade3d1d8b79d3eb
original_metadata_path: airbyte-integrations/connectors/source-zenloop/metadata.yaml
original_metadata_sha256: e245fff867257924056000bf527f0c96d55395611f409b65bb87bc23052d675d
original_document_path: docs/integrations/sources/zenloop.md
original_document_sha256: 9f18240f0dfa2a7f7e9809b111d7979236d47209be7ca609acafee10f48d300d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: dc565b8e4ae2c9140e75ebb39cdafd1774983e10700100996bc1cd61b544d51f
rewritten_at: 2026-11-12T14:11:01.748572+00:00
---

# Zenloop

Set up the Zenloop source connector and find its reference information on this page.

## Prerequisites

<!-- env:cloud -->

**For Airbyte Cloud:**

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces).
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Zenloop** from the Source type dropdown.
4. Enter a name for the Zenloop connector.
5. Enter your **API token**
6. For **Date from**, enter the date in YYYY-MM-DDTHH:mm:ssZ format. Data added on or after this date will be replicated.
7. Enter your **Survey ID**. This is your Zenloop Survey ID. Find it <a href="https://app.zenloop.com/settings/api">here</a>. Leave this empty to pull answers from all surveys. (Optional)
8. Enter your **Survey Group ID**. This is your Zenloop Survey Group ID. Find it by pulling All Survey Groups through the SurveyGroups stream. Leave this empty to pull answers from all survey groups. (Optional)
9. Click **Set up source**.
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

1. Go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Zenloop** from the Source type dropdown.
4. Enter a name for the Zenloop connector.
5. Enter your **API token**
6. For **Date from**, enter the date in YYYY-MM-DDTHH:mm:ssZ format. Data added on or after this date will be replicated.
7. Enter your **Survey ID**. This is your Zenloop Survey ID. Find it <a href="https://app.zenloop.com/settings/api">here</a>. Leave this empty to pull answers from all surveys. (Optional)
8. Enter your **Survey Group ID**. This is your Zenloop Survey Group ID. Find it by pulling All Survey Groups through the SurveyGroups stream. Leave this empty to pull answers from all survey groups. (Optional)
9. Click **Set up source**.
<!-- /env:oss -->

## Supported sync modes

You can use the following [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes) with the Zenloop source connector:

| Feature           | Supported?\(Yes/No\) |
| :---------------- | :------------------- |
| Full Refresh Sync | Yes                  |
| Incremental Sync  | Yes                  |
| Namespaces        | No                   |

## Supported streams

You can sync the following core streams:

- [Answers](https://docs.zenloop.com/reference#get-answers) \(Incremental\)
- [Surveys](https://docs.zenloop.com/reference#get-list-of-surveys)
- [AnswersSurveyGroup](https://docs.zenloop.com/reference#get-answers-for-survey-group) \(Incremental\)
- [SurveyGroups](https://docs.zenloop.com/reference#get-list-of-survey-groups)
- [Properties](https://docs.zenloop.com/reference#get-list-of-properties)

The `Answers`, `AnswersSurveyGroup` and `Properties` streams each support an optional survey_id parameter. Set it by completing the `public_hash_id` field in the connector configuration. If you leave it empty, the connector pulls answers from all surveys or survey groups.

## Performance considerations

During normal use, the Zenloop connector shouldn't reach Zenloop API limits. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if automatic retries don't resolve any rate limit issues.

## Data type map

| Integration Type | Airbyte Type |
| :--------------- | :----------- |
| `string`         | `string`     |
| `integer`        | `integer`    |
| `number`         | `number`     |
| `array`          | `array`      |
| `object`         | `object`     |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.1.49 | 2026-11-10 | [91597](https://github.com/airbytehq/airbyte/pull/91597) | Promoted release candidate to GA |
| 0.1.49-rc.1 | 2026-11-03 | [90879](https://github.com/airbytehq/airbyte/pull/90879) | Enable Python 3.11 support with base image 4.0.2 and CDK 1.3.0 while preserving incremental state compatibility. |
| 0.1.48 | 2026-11-03 | [90795](https://github.com/airbytehq/airbyte/pull/90795) | Update dependencies |
| 0.1.47 | 2026-10-27 | [90101](https://github.com/airbytehq/airbyte/pull/90101) | Update dependencies |
| 0.1.46 | 2026-10-20 | [89457](https://github.com/airbytehq/airbyte/pull/89457) | Update dependencies |
| 0.1.45 | 2026-10-13 | [79068](https://github.com/airbytehq/airbyte/pull/79068) | Update dependencies |
| 0.1.44 | 2026-10-07 | [88264](https://github.com/airbytehq/airbyte/pull/88264) | Fix `answers`/`answers_survey_group` crash when `date_from` is empty or in `YYYY-MM-DDTHH:mm:ssZ` format |
| 0.1.43 | 2025-02-01 | [53113](https://github.com/airbytehq/airbyte/pull/53113) | Update dependencies |
| 0.1.42 | 2025-01-25 | [52551](https://github.com/airbytehq/airbyte/pull/52551) | Update dependencies |
| 0.1.41 | 2025-01-18 | [51929](https://github.com/airbytehq/airbyte/pull/51929) | Update dependencies |
| 0.1.40 | 2025-01-11 | [51465](https://github.com/airbytehq/airbyte/pull/51465) | Update dependencies |
| 0.1.39 | 2024-12-28 | [50827](https://github.com/airbytehq/airbyte/pull/50827) | Update dependencies |
| 0.1.38 | 2024-12-21 | [50383](https://github.com/airbytehq/airbyte/pull/50383) | Update dependencies |
| 0.1.37 | 2024-12-14 | [49801](https://github.com/airbytehq/airbyte/pull/49801) | Update dependencies |
| 0.1.36 | 2024-12-12 | [49443](https://github.com/airbytehq/airbyte/pull/49443) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.35 | 2024-11-04 | [47107](https://github.com/airbytehq/airbyte/pull/47107) | Update dependencies |
| 0.1.34 | 2024-10-12 | [46780](https://github.com/airbytehq/airbyte/pull/46780) | Update dependencies |
| 0.1.33 | 2024-10-05 | [46431](https://github.com/airbytehq/airbyte/pull/46431) | Update dependencies |
| 0.1.32 | 2024-09-28 | [46141](https://github.com/airbytehq/airbyte/pull/46141) | Update dependencies |
| 0.1.31 | 2024-09-21 | [45823](https://github.com/airbytehq/airbyte/pull/45823) | Update dependencies |
| 0.1.30 | 2024-09-14 | [45485](https://github.com/airbytehq/airbyte/pull/45485) | Update dependencies |
| 0.1.29 | 2024-09-07 | [45249](https://github.com/airbytehq/airbyte/pull/45249) | Update dependencies |
| 0.1.28 | 2024-08-31 | [45044](https://github.com/airbytehq/airbyte/pull/45044) | Update dependencies |
| 0.1.27 | 2024-08-24 | [44680](https://github.com/airbytehq/airbyte/pull/44680) | Update dependencies |
| 0.1.26 | 2024-08-17 | [44334](https://github.com/airbytehq/airbyte/pull/44334) | Update dependencies |
| 0.1.25 | 2024-08-10 | [43647](https://github.com/airbytehq/airbyte/pull/43647) | Update dependencies |
| 0.1.24 | 2024-08-03 | [43243](https://github.com/airbytehq/airbyte/pull/43243) | Update dependencies |
| 0.1.23 | 2024-07-27 | [42667](https://github.com/airbytehq/airbyte/pull/42667) | Update dependencies |
| 0.1.22 | 2024-07-20 | [42215](https://github.com/airbytehq/airbyte/pull/42215) | Update dependencies |
| 0.1.21 | 2024-07-13 | [41922](https://github.com/airbytehq/airbyte/pull/41922) | Update dependencies |
| 0.1.20 | 2024-07-10 | [41514](https://github.com/airbytehq/airbyte/pull/41514) | Update dependencies |
| 0.1.19 | 2024-07-09 | [41144](https://github.com/airbytehq/airbyte/pull/41144) | Update dependencies |
| 0.1.18 | 2024-07-06 | [40919](https://github.com/airbytehq/airbyte/pull/40919) | Update dependencies |
| 0.1.17 | 2024-06-25 | [40421](https://github.com/airbytehq/airbyte/pull/40421) | Update dependencies |
| 0.1.16 | 2024-06-22 | [40180](https://github.com/airbytehq/airbyte/pull/40180) | Update dependencies |
| 0.1.15 | 2024-06-04 | [38961](https://github.com/airbytehq/airbyte/pull/38961) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.14 | 2024-04-19 | [37304](https://github.com/airbytehq/airbyte/pull/37304) | Updating to 0.80.0 CDK |
| 0.1.13 | 2024-04-18 | [37304](https://github.com/airbytehq/airbyte/pull/37304) | Manage dependencies with Poetry. |
| 0.1.12 | 2024-04-15 | [37304](https://github.com/airbytehq/airbyte/pull/37304) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.11 | 2024-04-12 | [37304](https://github.com/airbytehq/airbyte/pull/37304) | schema descriptions |
| 0.1.10 | 2023-06-29 | [27838](https://github.com/airbytehq/airbyte/pull/27838) | Update CDK version to avoid bug introduced during data feed release |
| 0.1.9 | 2023-06-28 | [27761](https://github.com/airbytehq/airbyte/pull/27761) | Update following state breaking changes |
| 0.1.8 | 2023-06-22 | [27243](https://github.com/airbytehq/airbyte/pull/27243) | Improving error message on state discrepancy |
| 0.1.7 | 2023-06-22 | [27243](https://github.com/airbytehq/airbyte/pull/27243) | State per partition (breaking change - require reset) |
| 0.1.6 | 2023-03-06 | [23231](https://github.com/airbytehq/airbyte/pull/23231) | Publish using low-code CDK Beta version |
| 0.1.5 | 2023-02-08 | [0](https://github.com/airbytehq/airbyte/pull/0) | Fix unhashable type in ZenloopSubstreamSlicer component |
| 0.1.4 | 2022-11-18 | [19624](https://github.com/airbytehq/airbyte/pull/19624) | Migrate to low code |
| 0.1.3 | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/pull/17304) | Migrate to per-stream states |
| 0.1.2 | 2022-08-22 | [15843](https://github.com/airbytehq/airbyte/pull/15843) | Adds Properties stream |
| 0.1.1 | 2021-10-26 | [8299](https://github.com/airbytehq/airbyte/pull/8299) | Fix missing seed files |
| 0.1.0 | 2021-10-26 | [7380](https://github.com/airbytehq/airbyte/pull/7380) | Initial Release |

</details>
