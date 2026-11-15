---
generated_record: true
connector_name: SurveySparrow
connector_type: source
connector_slug: survey-sparrow
connector_directory: source-survey-sparrow
definition_id: 4a4d887b-0f2d-4b33-ab7f-9b01b9072804
version: 0.3.25
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/survey-sparrow
logo: /images/connectors/sources/survey-sparrow.svg
logo_source_path: airbyte-integrations/connectors/source-survey-sparrow/icon.svg
logo_sha256: 14b7334455cabd5df1c004ed285b17912b91b1031146bb7b4abf3561b8f8bb70
original_metadata_path: airbyte-integrations/connectors/source-survey-sparrow/metadata.yaml
original_metadata_sha256: 32da6e1f97441cee596f6a001a7ded9be0fafc03acb0f45277ba6dcabfa22bf3
original_document_path: docs/integrations/sources/survey-sparrow.md
original_document_sha256: 217eedcbda40a95d1cc910ae718d1a71dcde57d0958eae7fe475ecdd561fee8b
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5bf41647b5409003cecd2c152dd8517fe54be2d0e63ce3c6c8030da1534d65f6
rewritten_at: 2026-11-12T13:57:44.375158+00:00
---

# SurveySparrow

Set up the SurveySparrow source connector by following this guide.

## Prerequisites

### Airbyte Open Source

- Access Token

## Setup guide

### Step 1: Set up SurveySparrow

Read this [docs](https://developers.surveysparrow.com/rest-apis).

Follow these steps to get your access token:

1. Log in to your SurveySparrow account and go to Settings → Apps & Integrations
2. Create a Private App
3. Enter a Name and Description, select the scope and generate the access token
4. Copy the access token and store it safely. It appears only once. If you misplace it, you'll need to generate another
5. Save your app. You can now start developing your private app

## Step 2: Set up the source connector in Airbyte

**For Airbyte Open Source:**

1. Go to your local Airbyte page
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ new source**
3. On the source setup page, select **SurveySparrow** from the Source type dropdown. Then enter a name for this connector
4. Add **Access Token**
5. Select whether your SurveySparrow account is EU-based
6. Add Survey ID, if needed
7. Click `Set up source`

## Supported streams and sync modes

- [Contacts](https://developers.surveysparrow.com/rest-apis/contacts#getV3Contacts)
- [ContactLists](https://developers.surveysparrow.com/rest-apis/contact_lists#getV3Contact_lists)
- [Questions](https://developers.surveysparrow.com/rest-apis/questions#getV3Questions)
- [Responses](https://developers.surveysparrow.com/rest-apis/response#getV3Responses)
- [Roles](https://developers.surveysparrow.com/rest-apis/roles#getV3Roles)
- [Surveys](https://developers.surveysparrow.com/rest-apis/survey#getV3Surveys)
- [SurveyFolders](https://developers.surveysparrow.com/rest-apis/survey_folder#getV3Survey_folders)
- [Users](https://developers.surveysparrow.com/rest-apis/users#getV3Users)

## IP allow list

If you use Airbyte Cloud and your organisation restricts specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.3.25 | 2026-11-09 | [91420](https://github.com/airbytehq/airbyte/pull/91420) | Update base image to source-declarative-manifest 7.47.0 |
| 0.3.24 | 2026-11-03 | [79017](https://github.com/airbytehq/airbyte/pull/79017) | Update dependencies |
| 0.3.23 | 2025-05-24 | [60522](https://github.com/airbytehq/airbyte/pull/60522) | Update dependencies |
| 0.3.22 | 2025-05-10 | [60133](https://github.com/airbytehq/airbyte/pull/60133) | Update dependencies |
| 0.3.21 | 2025-05-04 | [59579](https://github.com/airbytehq/airbyte/pull/59579) | Update dependencies |
| 0.3.20 | 2025-04-27 | [58968](https://github.com/airbytehq/airbyte/pull/58968) | Update dependencies |
| 0.3.19 | 2025-04-19 | [57985](https://github.com/airbytehq/airbyte/pull/57985) | Update dependencies |
| 0.3.18 | 2025-04-05 | [57455](https://github.com/airbytehq/airbyte/pull/57455) | Update dependencies |
| 0.3.17 | 2025-03-29 | [56905](https://github.com/airbytehq/airbyte/pull/56905) | Update dependencies |
| 0.3.16 | 2025-03-22 | [56265](https://github.com/airbytehq/airbyte/pull/56265) | Update dependencies |
| 0.3.15 | 2025-03-08 | [55574](https://github.com/airbytehq/airbyte/pull/55574) | Update dependencies |
| 0.3.14 | 2025-03-01 | [55094](https://github.com/airbytehq/airbyte/pull/55094) | Update dependencies |
| 0.3.13 | 2025-02-22 | [54469](https://github.com/airbytehq/airbyte/pull/54469) | Update dependencies |
| 0.3.12 | 2025-02-15 | [54029](https://github.com/airbytehq/airbyte/pull/54029) | Update dependencies |
| 0.3.11 | 2025-02-08 | [53554](https://github.com/airbytehq/airbyte/pull/53554) | Update dependencies |
| 0.3.10 | 2025-02-01 | [53056](https://github.com/airbytehq/airbyte/pull/53056) | Update dependencies |
| 0.3.9 | 2025-01-25 | [52442](https://github.com/airbytehq/airbyte/pull/52442) | Update dependencies |
| 0.3.8 | 2025-01-18 | [51972](https://github.com/airbytehq/airbyte/pull/51972) | Update dependencies |
| 0.3.7 | 2025-01-11 | [51404](https://github.com/airbytehq/airbyte/pull/51404) | Update dependencies |
| 0.3.6 | 2024-12-28 | [50824](https://github.com/airbytehq/airbyte/pull/50824) | Update dependencies |
| 0.3.5 | 2024-12-21 | [50355](https://github.com/airbytehq/airbyte/pull/50355) | Update dependencies |
| 0.3.4 | 2024-12-14 | [49766](https://github.com/airbytehq/airbyte/pull/49766) | Update dependencies |
| 0.3.3 | 2024-12-12 | [48163](https://github.com/airbytehq/airbyte/pull/48163) | Update dependencies |
| 0.3.2 | 2024-10-28 | [47506](https://github.com/airbytehq/airbyte/pull/47506) | Update dependencies |
| 0.3.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.3.0 | 2024-08-14 | [44059](https://github.com/airbytehq/airbyte/pull/44059) | Refactor connector to manifest-only format |
| 0.2.14 | 2024-08-10 | [43652](https://github.com/airbytehq/airbyte/pull/43652) | Update dependencies |
| 0.2.13 | 2024-08-03 | [43147](https://github.com/airbytehq/airbyte/pull/43147) | Update dependencies |
| 0.2.12 | 2024-07-27 | [42303](https://github.com/airbytehq/airbyte/pull/42303) | Update dependencies |
| 0.2.11 | 2024-07-13 | [41924](https://github.com/airbytehq/airbyte/pull/41924) | Update dependencies |
| 0.2.10 | 2024-07-10 | [41556](https://github.com/airbytehq/airbyte/pull/41556) | Update dependencies |
| 0.2.9 | 2024-07-09 | [41172](https://github.com/airbytehq/airbyte/pull/41172) | Update dependencies |
| 0.2.8 | 2024-07-06 | [40975](https://github.com/airbytehq/airbyte/pull/40975) | Update dependencies |
| 0.2.7 | 2024-06-25 | [40481](https://github.com/airbytehq/airbyte/pull/40481) | Update dependencies |
| 0.2.6 | 2024-06-22 | [40064](https://github.com/airbytehq/airbyte/pull/40064) | Update dependencies |
| 0.2.5 | 2024-06-04 | [39093](https://github.com/airbytehq/airbyte/pull/39093) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.4 | 2024-05-28 | [38695](https://github.com/airbytehq/airbyte/pull/38695) | Make compatibility with builder |
| 0.2.3 | 2024-04-19 | [37267](https://github.com/airbytehq/airbyte/pull/37267) | Upgrade to CDK 0.80.0 and manage dependencies with Poetry. |
| 0.2.2 | 2024-04-15 | [37267](https://github.com/airbytehq/airbyte/pull/37267) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.2.1 | 2024-04-12 | [37267](https://github.com/airbytehq/airbyte/pull/37267) | schema descriptions |
| 0.2.0 | 2022-11-18 | [19143](https://github.com/airbytehq/airbyte/pull/19143) | Allow users to change base_url based on account's location |
| 0.1.0 | 2022-11-03 | [18395](https://github.com/airbytehq/airbyte/pull/18395) | Initial Release |
