---
generated_record: true
connector_name: Pivotal Tracker
connector_type: source
connector_slug: pivotal-tracker
connector_directory: source-pivotal-tracker
definition_id: d60f5393-f99e-4310-8d05-b1876820f40e
version: 0.3.23
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pivotal-tracker
logo: /images/connectors/sources/pivotal-tracker.svg
logo_source_path: airbyte-integrations/connectors/source-pivotal-tracker/icon.svg
logo_sha256: eb9795b62c0198c7969590ac051d2606513b368144e264199e22acbbe1b0d0f5
original_metadata_path: airbyte-integrations/connectors/source-pivotal-tracker/metadata.yaml
original_metadata_sha256: 33f93cac38fe1dcdefae94a28dc8d4149e24d0eb356f9d53e225afc82dbafed8
original_document_path: docs/integrations/sources/pivotal-tracker.md
original_document_sha256: e6ee6ab9b8f2ab8a90ec8da57627cf52d0570318664832999e62b7b013762290
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 98ed4db8d6dd019131021b9451c4bdbbe272cec3e16cca462a2828d0700b5c3a
rewritten_at: 2026-11-12T13:51:07.913791+00:00
---

# Pivotal Tracker

:::warning

## Deprecation notice

You can no longer use the Pivotal Tracker source connector in Airbyte. It is archived and unsupported.

Broadcom shut down the Pivotal Tracker service on 30 April 2025. The `www.pivotaltracker.com` domain no longer resolves. The connector relies on REST API v5, which is also unavailable. As a result, the connector cannot sync any data.

### Recommended actions

Pivotal Tracker has no successor API. If you exported your data as CSV or JSON, load it using the [File source](https://docs.airbyte.com/integrations/sources/file) or a custom connector. See the [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

## Overview

The Pivotal Tracker source supports Full Refresh syncs. It can pull data from:

- Activity
- Epics
- Labels
- Project Membership
- Projects
- Releases
- Stories

### Output schema

The connector provides these output streams:

- [Activity](https://www.pivotaltracker.com/help/api/rest/v5#Activity)
- [Epics](https://www.pivotaltracker.com/help/api/rest/v5#Epics)
- [Labels](https://www.pivotaltracker.com/help/api/rest/v5#Labels)
- [Project Membership](https://www.pivotaltracker.com/help/api/rest/v5#Project_Memberships)
- [Projects](https://www.pivotaltracker.com/help/api/rest/v5#Projects)
- [Releases](https://www.pivotaltracker.com/help/api/rest/v5#Releases)
- [Stories](https://www.pivotaltracker.com/help/api/rest/v5#Stories)

### Features

| Feature                       | Supported?  |
| :---------------------------- | :---------- |
| Full Refresh Sync             | Yes         |
| Incremental - Append Sync     | Coming soon |
| Replicate Incremental Deletes | Coming soon |
| SSL connection                | Yes         |
| Namespaces                    | No          |

### Performance

Under normal use, the Pivotal Tracker connector shouldn't encounter Stripe API limits. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if rate limit issues aren't retried successfully.

## Get started

### Requirements

- Pivotal Tracker API Token

### Create the API Token

To get your API Token, access your profile [here](https://www.pivotaltracker.com/profile). Scroll down and click **Create New Token**.
Use this token to pull data from Pivotal Tracker.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject         |
| :------ | :--------- | :------------------------------------------------------- | :-------------- |
| 0.3.23 | 2026-10-07 | [88261](https://github.com/airbytehq/airbyte/pull/88261) | Archive connector: Pivotal Tracker service and API were shut down on 2025-04-30 |
| 0.3.22 | 2025-05-10 | [60085](https://github.com/airbytehq/airbyte/pull/60085) | Update dependencies |
| 0.3.21 | 2025-05-03 | [59485](https://github.com/airbytehq/airbyte/pull/59485) | Update dependencies |
| 0.3.20 | 2025-04-27 | [59040](https://github.com/airbytehq/airbyte/pull/59040) | Update dependencies |
| 0.3.19 | 2025-04-19 | [58456](https://github.com/airbytehq/airbyte/pull/58456) | Update dependencies |
| 0.3.18 | 2025-04-12 | [57897](https://github.com/airbytehq/airbyte/pull/57897) | Update dependencies |
| 0.3.17 | 2025-04-05 | [57345](https://github.com/airbytehq/airbyte/pull/57345) | Update dependencies |
| 0.3.16 | 2025-03-29 | [56781](https://github.com/airbytehq/airbyte/pull/56781) | Update dependencies |
| 0.3.15 | 2025-03-22 | [56210](https://github.com/airbytehq/airbyte/pull/56210) | Update dependencies |
| 0.3.14 | 2025-03-08 | [55521](https://github.com/airbytehq/airbyte/pull/55521) | Update dependencies |
| 0.3.13 | 2025-03-01 | [54613](https://github.com/airbytehq/airbyte/pull/54613) | Update dependencies |
| 0.3.12 | 2025-02-15 | [54020](https://github.com/airbytehq/airbyte/pull/54020) | Update dependencies |
| 0.3.11 | 2025-02-08 | [53468](https://github.com/airbytehq/airbyte/pull/53468) | Update dependencies |
| 0.3.10 | 2025-02-01 | [52985](https://github.com/airbytehq/airbyte/pull/52985) | Update dependencies |
| 0.3.9 | 2025-01-25 | [52479](https://github.com/airbytehq/airbyte/pull/52479) | Update dependencies |
| 0.3.8 | 2025-01-18 | [51850](https://github.com/airbytehq/airbyte/pull/51850) | Update dependencies |
| 0.3.7 | 2025-01-11 | [51348](https://github.com/airbytehq/airbyte/pull/51348) | Update dependencies |
| 0.3.6 | 2024-12-28 | [50737](https://github.com/airbytehq/airbyte/pull/50737) | Update dependencies |
| 0.3.5 | 2024-12-21 | [50277](https://github.com/airbytehq/airbyte/pull/50277) | Update dependencies |
| 0.3.4 | 2024-12-14 | [49730](https://github.com/airbytehq/airbyte/pull/49730) | Update dependencies |
| 0.3.3 | 2024-12-12 | [49047](https://github.com/airbytehq/airbyte/pull/49047) | Update dependencies |
| 0.3.2 | 2024-10-29 | [47679](https://github.com/airbytehq/airbyte/pull/47679) | Update dependencies |
| 0.3.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.3.0 | 2024-08-14 | [44087](https://github.com/airbytehq/airbyte/pull/44087) | Refactor connector to manifest-only format |
| 0.2.12 | 2024-08-12 | [43849](https://github.com/airbytehq/airbyte/pull/43849) | Update dependencies |
| 0.2.11 | 2024-08-10 | [43506](https://github.com/airbytehq/airbyte/pull/43506) | Update dependencies |
| 0.2.10 | 2024-08-03 | [43223](https://github.com/airbytehq/airbyte/pull/43223) | Update dependencies |
| 0.2.9 | 2024-07-27 | [42784](https://github.com/airbytehq/airbyte/pull/42784) | Update dependencies |
| 0.2.8 | 2024-07-20 | [42199](https://github.com/airbytehq/airbyte/pull/42199) | Update dependencies |
| 0.2.7 | 2024-07-13 | [41772](https://github.com/airbytehq/airbyte/pull/41772) | Update dependencies |
| 0.2.6 | 2024-07-10 | [41595](https://github.com/airbytehq/airbyte/pull/41595) | Update dependencies |
| 0.2.5 | 2024-07-09 | [41139](https://github.com/airbytehq/airbyte/pull/41139) | Update dependencies |
| 0.2.4 | 2024-07-06 | [40964](https://github.com/airbytehq/airbyte/pull/40964) | Update dependencies |
| 0.2.3 | 2024-06-25 | [40472](https://github.com/airbytehq/airbyte/pull/40472) | Update dependencies |
| 0.2.2 | 2024-06-22 | [40036](https://github.com/airbytehq/airbyte/pull/40036) | Update dependencies |
| 0.2.1 | 2024-06-04 | [39071](https://github.com/airbytehq/airbyte/pull/39071) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.0 | 2024-04-01 | [36499](https://github.com/airbytehq/airbyte/pull/36499) | Migrate to low code |
| 0.1.1 | 2023-10-25 | [11060](https://github.com/airbytehq/airbyte/pull/11060) | Fix schema and check connection |
| 0.1.0 | 2022-04-04 | [11060](https://github.com/airbytehq/airbyte/pull/11060) | Initial Release |


</details>
