---
generated_record: true
connector_name: Vectara
connector_type: destination
connector_slug: vectara
connector_directory: destination-vectara
definition_id: 102900e7-a236-4c94-83e4-a4189b99adc2
version: 0.3.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/vectara
logo: /images/connectors/destinations/vectara.svg
logo_source_path: airbyte-integrations/connectors/destination-vectara/icon.svg
logo_sha256: 6f16c4ecbe4b386a98983eab720878b53378e00c88cd5f01ef4b79d433d257eb
original_metadata_path: airbyte-integrations/connectors/destination-vectara/metadata.yaml
original_metadata_sha256: fe89aa6ab12389bbc1652b74229c6a13618a7027e2acfa9fbf838ead442419cd
original_document_path: docs/integrations/destinations/vectara.md
original_document_sha256: 2043977f40c65f33dc05dd1baf800d141c1b6e3d3df22a2edfb9b4acf4deaf91
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1e4b6cc5a04afdccaedb4074b10e67a034d60c644550ca77a7865e5316fb3c0b
rewritten_at: 2026-11-12T13:28:20.546448+00:00
---

# Vectara

Use this guide to set up the Vectara destination connector and find reference information.

[Vectara](https://vectara.com/) is a trusted GenAI platform providing Retrieval Augmented Generation, or [RAG](https://vectara.com/grounded-generation/), as a service.

Connect any Airbyte source to Vectara and ingest data into your Vectara RAG pipeline.

:::info
If you need support, use these public channels:

- For Airbyte-related issues, such as data sources or processing: [Open a Github issue](https://github.com/airbytehq/airbyte/issues/new?assignees=&labels=type%2Fbug%2Carea%2Fconnectors%2Cneeds-triage&projects=&template=1-issue-connector.yaml)
- For Vectara-related issues, such as data indexing or RAG: Create a post in the [Vectara forum](https://discuss.vectara.com/) or contact [Vectara's Discord server](https://discord.gg/GFb8gMz6UH)

:::

## Overview

The Vectara destination connector supports Full Refresh Overwrite, Full Refresh Append and Incremental Append.

### Output schema

All streams are output to a Vectara corpus. You must specify the corpus name in the config.

Vectara corpus names have no restrictions. If the specified corpus isn't found, the connector creates a new corpus with that name. If multiple corpora share that name, Airbyte returns an error because it can't determine the preferred corpus.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started

You need a Vectara account to use Vectara with Airbyte. Follow these steps:

1. [Sign up](https://vectara.com/integrations/airbyte) for a Vectara account if you don't already have one. After signing up, you'll receive a Vectara customer ID. Find it by selecting your name in the top-right of the Vectara console window.
2. Create a corpus within your account. A corpus is an area that stores text data you want to ingest into Vectara.
   - Select the **"Create Corpus"** button in the console to create a corpus. Then provide a corpus name and description. Select your created corpus to see its name and corpus key at the top. See [guide](https://docs.vectara.com/docs/console-ui/creating-a-corpus) for more details.
   - You can optionally define filtering attributes and apply advanced options.
   - For the Vectara connector to work correctly, you **must** define a special string-typed meta-data field called `_ab_stream`. The connector uses this field to identify source streams.
3. The Vectara destination connector uses [OAuth2.0 Credentials](https://docs.vectara.com/docs/api-reference/auth-apis/oauth-2), an app client created in the Vectara console under **API access > App clients**. Keep your `Client ID` and `Client Secret` ready for connector setup.

### Set up Vectara in Airbyte

You now have everything required to configure Vectara as a destination in the UI.

You'll need this information to configure the Vectara destination:

- (Required) OAuth2.0 Credentials
  - (Required) **Client ID**
  - (Required) **Client Secret**
- (Optional) **Customer ID**. This is retained for backwards compatibility and is no longer needed to authenticate against the Vectara API v2.
- (Required) **Corpus Name**. Specify a corpus name you've set up manually using the instructions above. Alternatively, specify a corpus name that doesn't exist. The connector creates a new corpus with that name and sets up the required meta-data filtering fields within it.

In the connector UI, you also define two sets of fields:

- Use `text_fields` to define source fields that become text in Vectara for queries or summarisation.
- Use `title_field` to define the source field used as the document title in Vectara.
- Use `metadata_fields` to define source fields added to each document as meta-data.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                      |
|:--------| :--------- | :-------------------------------------------------------- | :----------------------------------------------------------- |
| 0.3.0 | 2026-11-03 | [PR](https://github.com/airbytehq/airbyte/pull/90862) | Upgrade to Python 3.13 (python-connector-base 4.1.1) and airbyte-cdk 7 |
| 0.2.32 | 2026-10-07 | [PR](https://github.com/airbytehq/airbyte/pull/88339) | Migrate from the retired Vectara API v1 (and per-customer Cognito OAuth endpoint) to API v2 / `auth.vectara.com` |
| 0.2.31 | 2024-11-25 | [48659](https://github.com/airbytehq/airbyte/pull/48659) | Update dependencies |
| 0.2.30 | 2024-11-04 | [48222](https://github.com/airbytehq/airbyte/pull/48222) | Update dependencies |
| 0.2.29 | 2024-10-29 | [47744](https://github.com/airbytehq/airbyte/pull/47744) | Update dependencies |
| 0.2.28 | 2024-10-23 | [47084](https://github.com/airbytehq/airbyte/pull/47084) | Update dependencies |
| 0.2.27 | 2024-10-12 | [46812](https://github.com/airbytehq/airbyte/pull/46812) | Update dependencies |
| 0.2.26 | 2024-10-05 | [46438](https://github.com/airbytehq/airbyte/pull/46438) | Update dependencies |
| 0.2.25 | 2024-09-28 | [46114](https://github.com/airbytehq/airbyte/pull/46114) | Update dependencies |
| 0.2.24 | 2024-09-21 | [45806](https://github.com/airbytehq/airbyte/pull/45806) | Update dependencies |
| 0.2.23 | 2024-09-14 | [45481](https://github.com/airbytehq/airbyte/pull/45481) | Update dependencies |
| 0.2.22 | 2024-09-07 | [45324](https://github.com/airbytehq/airbyte/pull/45324) | Update dependencies |
| 0.2.21 | 2024-08-31 | [45021](https://github.com/airbytehq/airbyte/pull/45021) | Update dependencies |
| 0.2.20 | 2024-08-24 | [44657](https://github.com/airbytehq/airbyte/pull/44657) | Update dependencies |
| 0.2.19 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.2.18 | 2024-08-17 | [44310](https://github.com/airbytehq/airbyte/pull/44310) | Update dependencies |
| 0.2.17 | 2024-08-12 | [43858](https://github.com/airbytehq/airbyte/pull/43858) | Update dependencies |
| 0.2.16 | 2024-08-10 | [43494](https://github.com/airbytehq/airbyte/pull/43494) | Update dependencies |
| 0.2.15 | 2024-08-03 | [43153](https://github.com/airbytehq/airbyte/pull/43153) | Update dependencies |
| 0.2.14 | 2024-07-27 | [42705](https://github.com/airbytehq/airbyte/pull/42705) | Update dependencies |
| 0.2.13 | 2024-07-20 | [42168](https://github.com/airbytehq/airbyte/pull/42168) | Update dependencies |
| 0.2.12 | 2024-07-13 | [41829](https://github.com/airbytehq/airbyte/pull/41829) | Update dependencies |
| 0.2.11 | 2024-07-10 | [41362](https://github.com/airbytehq/airbyte/pull/41362) | Update dependencies |
| 0.2.10 | 2024-07-09 | [41140](https://github.com/airbytehq/airbyte/pull/41140) | Update dependencies |
| 0.2.9 | 2024-07-06 | [40953](https://github.com/airbytehq/airbyte/pull/40953) | Update dependencies |
| 0.2.8 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.2.7 | 2024-06-25 | [40321](https://github.com/airbytehq/airbyte/pull/40321) | Update dependencies |
| 0.2.6 | 2024-06-22 | [39973](https://github.com/airbytehq/airbyte/pull/39973) | Update dependencies |
| 0.2.5 | 2024-06-06 | [39193](https://github.com/airbytehq/airbyte/pull/39193) | [autopull] Upgrade base image to v1.2.2 |
| 0.2.4 | 2024-05-20 | [38432](https://github.com/airbytehq/airbyte/pull/38432) | [autopull] base image + poetry + up_to_date |
| 0.2.3   | 2024-03-22 | [#37333](https://github.com/airbytehq/airbyte/pull/37333) | Updated CDK & pytest version to fix security vulnerabilities |
| 0.2.2   | 2024-03-22 | [#36261](https://github.com/airbytehq/airbyte/pull/36261) | Move project to Poetry                                       |
| 0.2.1   | 2024-03-05 | [#35206](https://github.com/airbytehq/airbyte/pull/35206) | Fix: improved title parsing                                  |
| 0.2.0   | 2024-01-29 | [#34579](https://github.com/airbytehq/airbyte/pull/34579) | Add document title file configuration                        |
| 0.1.0   | 2023-11-10 | [#31958](https://github.com/airbytehq/airbyte/pull/31958) | 🎉 New Destination: Vectara (Vector Database)                |

</details>
