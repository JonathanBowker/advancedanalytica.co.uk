---
generated_record: true
connector_name: Box Data Extract
connector_type: source
connector_slug: box-data-extract
connector_directory: source-box-data-extract
definition_id: 852b8bda-6a51-4fc6-854e-6beace1614a8
version: 0.1.20
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/box-data-extract
logo: /images/connectors/sources/box-data-extract.svg
logo_source_path: airbyte-integrations/connectors/source-box-data-extract/icon.svg
logo_sha256: 21b07a7f83fb463da22708e07295197fec0c94853ea5925ca23fa0473d56a3e9
original_metadata_path: airbyte-integrations/connectors/source-box-data-extract/metadata.yaml
original_metadata_sha256: 7a1a7f75958e046f94931eba649c851d4b25fdd08074554599380ddc7598e2f9
original_document_path: docs/integrations/sources/box-data-extract.md
original_document_sha256: 0b4569ec19771b99e217c3085148adbe15bd448b706a587d0862fd817fb79ddd
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: c029bb46d6c303d2969404cc44521baacc2fbc25d2f23ae7a02431eb7b58b1b4
rewritten_at: 2026-11-12T13:31:49.177780+00:00
---

# Box Data Extract
The Box Data Extract Connector gives you access to file content stored in Box cloud storage.

You can automate workflows by using Box AI to extract data directly from documents stored in Box.

For example, a company can capture key details from lease contracts and populate its system of record. A financial institution can extract critical data from loan applications, including bank statements and W-2s. It can then integrate this data into approval workflows.

By focusing on content intelligence, this connector opens new opportunities for automation and AI-driven insights.

<HideInUI>

This page provides setup guidance and reference information for the [Box Data Extract](https://developer.box.com/) source connector.

</HideInUI>

## Prerequisites

You need a [Box application](https://app.box.com/developers/console) configured to use Client Credential Grants (CCG).
Follow the [this](https://developer.box.com/guides/authentication/client-credentials/) guide to complete authentication.

From your Box app configuration, note:
- `Client ID`: Your Box App client ID. Find it in the [Box App configurations](https://app.box.com/developers/console).
- `Client Secret`: Your Box App client secret.

Choose the account that will log in to Box:
- `Box Subject Type`: The user type for login ("user" or "enterprise"). Enterprise logs in with the application service account. User logs in as the user if the app can impersonate users.
- `Box Subject ID`: For subject type "enterprise", enter your enterprise ID. For subject type "user", enter the user ID for login.

Choose the Box folder containing the files you want to process:
- `Folder ID`: The folder to retrieve data from.
- `Recursive`: Whether to read the folders recursively.

If you're using Box AI, you need:
- `Ask AI Prompt`: For Ask AI, the prompt to send about the document.
- `Extract AI Prompt`: For Extract AI, the prompt to send about the document.
- `Extract Structured AI Fields`: For Extract Structured AI, the prompt to send about the document. For details about the required prompt format, see [developer documentation](https://developer.box.com/guides/box-ai/ai-tutorials/extract-metadata-structured/).

## Setup guide

## Set up Box Data Extract


### Airbyte Cloud

1. Have a [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Box Data Extract from the Source type dropdown.
4. Enter a name for the Box Data Extract connector.
5. Enter the following information:
    1. `Client ID`
    2. `Client Secret`
    3. `Box Subject Type`
    4. `Box Subject ID`
    5. `Folder ID`
    6. `Recursive`
6. Click **Setup source**.



### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Box Data Extract from the Source type dropdown.
4. Enter a name for the Box Data Extract connector.
5. Enter the following information:
    1. `Client ID`
    2. `Client Secret`
    3. `Box Subject Type`
    4. `Box Subject ID`
    5. `Folder ID`
    6. `Recursive`
6. Click **Setup source**.


## Supported sync modes

The Box Data Extract source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| SSL connection    | Yes        |
| Namespaces        | No         |

## Supported streams

- [File text extraction](https://developer.box.com/guides/representations/text/): Extract a text representation from your Box documents.
- [AI Ask](https://developer.box.com/guides/box-ai/ai-tutorials/ask-questions/): Ask AI a question about your Box documents.
- [AI Extract](https://developer.box.com/guides/box-ai/ai-tutorials/extract-metadata/): Extract structured data from your Box documents.
- [AI Extract Structured](https://developer.box.com/guides/box-ai/ai-tutorials/extract-metadata/): Extract structured data in a structured format from your Box documents.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.1.20 | 2026-11-10 | [91384](https://github.com/airbytehq/airbyte/pull/91384) | Update dependencies |
| 0.1.19 | 2026-11-03 | [90455](https://github.com/airbytehq/airbyte/pull/90455) | Update dependencies |
| 0.1.18 | 2026-10-27 | [89818](https://github.com/airbytehq/airbyte/pull/89818) | Update dependencies |
| 0.1.17 | 2026-10-20 | [89127](https://github.com/airbytehq/airbyte/pull/89127) | Update dependencies |
| 0.1.16 | 2026-10-13 | [79220](https://github.com/airbytehq/airbyte/pull/79220) | Update dependencies |
| 0.1.15 | 2026-10-07 | [PR](https://github.com/airbytehq/airbyte/pull/88335) | Fix connector image build (0.1.14 was never published): migrate to airbyte-cdk 7 / Python 3.13 base image, drop `main.py` from packaged files; fix `TypeError` when triggering `extracted_text` generation |
| 0.1.14 | 2026-06-02 | [78591](https://github.com/airbytehq/airbyte/pull/78591) | Update dependencies |
| 0.1.13 | 2025-05-10 | [59315](https://github.com/airbytehq/airbyte/pull/59315) | Update dependencies |
| 0.1.12 | 2025-04-26 | [58737](https://github.com/airbytehq/airbyte/pull/58737) | Update dependencies |
| 0.1.11 | 2025-04-19 | [58294](https://github.com/airbytehq/airbyte/pull/58294) | Update dependencies |
| 0.1.10 | 2025-04-12 | [57611](https://github.com/airbytehq/airbyte/pull/57611) | Update dependencies |
| 0.1.9 | 2025-04-05 | [57154](https://github.com/airbytehq/airbyte/pull/57154) | Update dependencies |
| 0.1.8 | 2025-03-29 | [56593](https://github.com/airbytehq/airbyte/pull/56593) | Update dependencies |
| 0.1.7 | 2025-02-13 | | Adding Box Extract Structured AI stream |
| 0.1.6 | 2025-02-13 | | Adding Box Extract AI stream |
| 0.1.5 | 2025-02-13 | | Adding Box Ask AI stream |
| 0.1.4 | 2025-02-12 | | Initial release by [@BoxDevRel](https://github.com/box-community/airbyte) |

</details>
