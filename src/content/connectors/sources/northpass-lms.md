---
generated_record: true
connector_name: Northpass LMS
connector_type: source
connector_slug: northpass-lms
connector_directory: source-northpass-lms
definition_id: dd4d317e-7537-456c-b6ba-264b17ce6daa
version: 0.2.26
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/northpass-lms
logo: /images/connectors/sources/northpass-lms.svg
logo_source_path: airbyte-integrations/connectors/source-northpass-lms/icon.svg
logo_sha256: 233448849f7e1fdd2459e3576b4b10b82dc3742967a2a09fefe526ae3eba3955
original_metadata_path: airbyte-integrations/connectors/source-northpass-lms/metadata.yaml
original_metadata_sha256: d4f4d536bd31ee7a1aabc523f61b1c3b3768d63f0015c24b303693ad81364f1d
original_document_path: docs/integrations/sources/northpass-lms.md
original_document_sha256: 980ad6a641cf9be7c7dc3671a07aab06a310b3b31152c2fb3ff4f9a0e2d43891
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9d34348fb8b9a9e0eb10aa2c34bd8060318fcf6f7679b808a8eee32fb9402bed
rewritten_at: 2026-11-12T13:48:52.303530+00:00
---

# Northpass LMS

Use this page to set up the Northpass LMS source connector and find reference information.

## Prerequisites

- At least one [Northpass LMS Account](https://www.northpass.com)
<!-- env:oss -->
- A Northpass API Token generated [here](https://developers.northpass.com/docs/api-authentication)
  <!-- /env:oss -->

## Setup guide

<!-- env:oss -->

### Step 1: Set up a Northpass LMS account for Airbyte Open Source

Set up an account in [Northpass](https://www.northpass.com/).


### Step 2: Get an API key for Airbyte Open Source

You only need a simple API key to access the Northpass LMS API. Generate this token [here](https://developers.northpass.com/docs/api-authentication).


#### Airbyte Cloud

Set up Northpass LMS as a source in Airbyte Cloud:

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **Northpass LMS** from the available sources.
4. Enter a **Source name** of your choice.
5. Enter the **api key** you obtained from Northpass LMS.
6. Click **Set up source** and wait for the tests to finish.

<!-- /env:cloud -->

<!-- env:oss -->

#### Airbyte Open Source

Set up Northpass LMS as a source in Airbyte Open Source:

1. Log in to your Airbyte Open Source account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **Northpass LMS** from the available sources.
4. Enter a **Source name** of your choice.
5. Enter the **api key** you obtained from Northpass LMS.
6. Click **Set up source** and wait for the tests to finish.

<!-- /env:oss -->

## Supported sync modes

The Northpass LMS source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)

Incremental modes aren't supported because the Northpass LMS API doesn't support them at the time of writing.

## Supported streams

The Northpass LMS source connector can sync these streams.

### Main tables

Find the Northpass LMS API documentation [here](https://developers.northpass.com/docs/).

- [People](https://developers.northpass.com/reference/get_v2-people)

- [Courses](https://developers.northpass.com/reference/get_v2-courses)

- [Course Enrollments](https://developers.northpass.com/reference/get_v2-courses-course-uuid-enrollments)

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version  | Date       | Pull Request                                             | Subject                                                                                                                              |
|:---------|:-----------|:---------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| 0.2.26 | 2026-10-07 | [88253](https://github.com/airbytehq/airbyte/pull/88253) | Fix pagination: follow the API's JSON:API `links.next` URL instead of sending the record offset as the `page` number |
| 0.2.25 | 2026-06-02 | [78807](https://github.com/airbytehq/airbyte/pull/78807) | Update dependencies |
| 0.2.24 | 2025-05-10 | [60156](https://github.com/airbytehq/airbyte/pull/60156) | Update dependencies |
| 0.2.23 | 2025-05-03 | [59487](https://github.com/airbytehq/airbyte/pull/59487) | Update dependencies |
| 0.2.22 | 2025-04-27 | [58530](https://github.com/airbytehq/airbyte/pull/58530) | Update dependencies |
| 0.2.21 | 2025-04-12 | [57915](https://github.com/airbytehq/airbyte/pull/57915) | Update dependencies |
| 0.2.20 | 2025-04-05 | [57305](https://github.com/airbytehq/airbyte/pull/57305) | Update dependencies |
| 0.2.19 | 2025-03-29 | [56727](https://github.com/airbytehq/airbyte/pull/56727) | Update dependencies |
| 0.2.18 | 2025-03-22 | [56204](https://github.com/airbytehq/airbyte/pull/56204) | Update dependencies |
| 0.2.17 | 2025-03-08 | [55515](https://github.com/airbytehq/airbyte/pull/55515) | Update dependencies |
| 0.2.16 | 2025-03-01 | [54763](https://github.com/airbytehq/airbyte/pull/54763) | Update dependencies |
| 0.2.15 | 2025-02-22 | [54294](https://github.com/airbytehq/airbyte/pull/54294) | Update dependencies |
| 0.2.14 | 2025-02-15 | [53799](https://github.com/airbytehq/airbyte/pull/53799) | Update dependencies |
| 0.2.13 | 2025-02-08 | [53287](https://github.com/airbytehq/airbyte/pull/53287) | Update dependencies |
| 0.2.12 | 2025-02-01 | [52768](https://github.com/airbytehq/airbyte/pull/52768) | Update dependencies |
| 0.2.11 | 2025-01-25 | [52223](https://github.com/airbytehq/airbyte/pull/52223) | Update dependencies |
| 0.2.10 | 2025-01-18 | [51832](https://github.com/airbytehq/airbyte/pull/51832) | Update dependencies |
| 0.2.9 | 2025-01-11 | [51219](https://github.com/airbytehq/airbyte/pull/51219) | Update dependencies |
| 0.2.8 | 2024-12-28 | [50606](https://github.com/airbytehq/airbyte/pull/50606) | Update dependencies |
| 0.2.7 | 2024-12-21 | [50125](https://github.com/airbytehq/airbyte/pull/50125) | Update dependencies |
| 0.2.6 | 2024-12-14 | [49625](https://github.com/airbytehq/airbyte/pull/49625) | Update dependencies |
| 0.2.5 | 2024-12-12 | [49221](https://github.com/airbytehq/airbyte/pull/49221) | Update dependencies |
| 0.2.4 | 2024-12-11 | [48907](https://github.com/airbytehq/airbyte/pull/48907) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.3 | 2024-11-04 | [48257](https://github.com/airbytehq/airbyte/pull/48257) | Update dependencies |
| 0.2.2 | 2024-10-29 | [47863](https://github.com/airbytehq/airbyte/pull/47863) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47520](https://github.com/airbytehq/airbyte/pull/47520) | Update dependencies |
| 0.2.0 | 2024-08-26 | [44771](https://github.com/airbytehq/airbyte/pull/44771) | Refactor connector to manifest-only format |
| 0.1.4 | 2024-08-24 | [44684](https://github.com/airbytehq/airbyte/pull/44684) | Update dependencies |
| 0.1.3 | 2024-08-17 | [44231](https://github.com/airbytehq/airbyte/pull/44231) | Update dependencies |
| 0.1.2 | 2024-08-12 | [43867](https://github.com/airbytehq/airbyte/pull/43867) | Update dependencies |
| 0.1.1 | 2024-08-10 | [43484](https://github.com/airbytehq/airbyte/pull/43484) | Update dependencies |
| 0.1.0 | 2024-08-06 | [43319](https://github.com/airbytehq/airbyte/pull/43319) | New Source: Northpass LMS |
</details>
