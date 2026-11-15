---
generated_record: true
connector_name: Copper
connector_type: source
connector_slug: copper
connector_directory: source-copper
definition_id: 44f3002f-2df9-4f6d-b21c-02cd3b47d0dc
version: 0.4.15
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/copper
logo: /images/connectors/sources/copper.svg
logo_source_path: airbyte-integrations/connectors/source-copper/icon.svg
logo_sha256: e928246779238b6a58e462e2aa6c09284094b74f56afd6b7b2ee7a77a5313ca8
original_metadata_path: airbyte-integrations/connectors/source-copper/metadata.yaml
original_metadata_sha256: 45c78d352c257dc08bd57a54aa340aba5c8653f3750daa26f27c3eb6810f4fcf
original_document_path: docs/integrations/sources/copper.md
original_document_sha256: 74bb392253d5db4fbd58bc37c2d471464af125b2b4987a81481f3e3b9ad96f97
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: b0aeed54e56124fb51eae9db2526956da960d9e5284944a1b62ed3af032ec07d
rewritten_at: 2026-11-12T13:34:22.496422+00:00
---

# Copper

Set up the Copper source connector and find its reference information on this page.

## Prerequisites

The Copper source uses the [Copper API](https://developer.copper.com/).

## Setup guide

### Step 1: Set up Copper

#### Airbyte OSS

1. Go to the Airbyte Open Source dashboard
2. Enter a name for your source
3. Enter your Copper `api_key`. Generate it in Copper under Settings -> Integrations -> API Keys
4. Enter your Copper `user_email`. Use the email address you use to log in to Copper
5. Click **Set up source**

## Supported sync modes

The Copper source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental - Append Sync     | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- [People](https://developer.copper.com/people/list-people-search.html)
- [Companies](https://developer.copper.com/companies/list-companies-search.html)
- [Projects](https://developer.copper.com/projects/list-projects-search.html)
- [Oppurtunities](https://developer.copper.com/opportunities/list-opportunities-search.html)

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                         |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.4.15 | 2026-11-09 | [91323](https://github.com/airbytehq/airbyte/pull/91323) | Upgrade base image to `source-declarative-manifest:7.47.0` |
| 0.4.14 | 2025-05-24 | [60387](https://github.com/airbytehq/airbyte/pull/60387) | Update dependencies |
| 0.4.13 | 2025-05-10 | [59997](https://github.com/airbytehq/airbyte/pull/59997) | Update dependencies |
| 0.4.12 | 2025-05-03 | [57238](https://github.com/airbytehq/airbyte/pull/57238) | Update dependencies |
| 0.4.11 | 2025-03-29 | [56479](https://github.com/airbytehq/airbyte/pull/56479) | Update dependencies |
| 0.4.10 | 2025-03-22 | [55936](https://github.com/airbytehq/airbyte/pull/55936) | Update dependencies |
| 0.4.9 | 2025-03-08 | [55301](https://github.com/airbytehq/airbyte/pull/55301) | Update dependencies |
| 0.4.8 | 2025-03-01 | [54411](https://github.com/airbytehq/airbyte/pull/54411) | Update dependencies |
| 0.4.7 | 2025-02-15 | [52851](https://github.com/airbytehq/airbyte/pull/52851) | Update dependencies |
| 0.4.6 | 2025-01-25 | [52349](https://github.com/airbytehq/airbyte/pull/52349) | Update dependencies |
| 0.4.5 | 2025-01-18 | [51672](https://github.com/airbytehq/airbyte/pull/51672) | Update dependencies |
| 0.4.4 | 2025-01-11 | [48940](https://github.com/airbytehq/airbyte/pull/48940) | Update dependencies |
| 0.4.3 | 2024-11-04 | [48146](https://github.com/airbytehq/airbyte/pull/48146) | Update dependencies |
| 0.4.2 | 2024-10-28 | [47660](https://github.com/airbytehq/airbyte/pull/47660) | Update dependencies |
| 0.4.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.4.0 | 2024-08-15 | [44159](https://github.com/airbytehq/airbyte/pull/44159) | Refactor connector to manifest-only format |
| 0.3.16 | 2024-08-10 | [43674](https://github.com/airbytehq/airbyte/pull/43674) | Update dependencies |
| 0.3.15 | 2024-08-03 | [43118](https://github.com/airbytehq/airbyte/pull/43118) | Update dependencies |
| 0.3.14 | 2024-07-27 | [42710](https://github.com/airbytehq/airbyte/pull/42710) | Update dependencies |
| 0.3.13 | 2024-07-20 | [42266](https://github.com/airbytehq/airbyte/pull/42266) | Update dependencies |
| 0.3.12 | 2024-07-13 | [41843](https://github.com/airbytehq/airbyte/pull/41843) | Update dependencies |
| 0.3.11 | 2024-07-10 | [41385](https://github.com/airbytehq/airbyte/pull/41385) | Update dependencies |
| 0.3.10 | 2024-07-09 | [41111](https://github.com/airbytehq/airbyte/pull/41111) | Update dependencies |
| 0.3.9 | 2024-07-06 | [41004](https://github.com/airbytehq/airbyte/pull/41004) | Update dependencies |
| 0.3.8 | 2024-06-25 | [40260](https://github.com/airbytehq/airbyte/pull/40260) | Update dependencies |
| 0.3.7 | 2024-06-22 | [40090](https://github.com/airbytehq/airbyte/pull/40090) | Update dependencies |
| 0.3.6 | 2024-06-06 | [39234](https://github.com/airbytehq/airbyte/pull/39234) | [autopull] Upgrade base image to v1.2.2 |
| 0.3.5 | 2024-05-17 | [38214](https://github.com/airbytehq/airbyte/pull/38214) | Make connector compatable with builder |
| 0.3.4 | 2024-04-19 | [37145](https://github.com/airbytehq/airbyte/pull/37145) | Updating to 0.80.0 CDK |
| 0.3.3 | 2024-04-18 | [37145](https://github.com/airbytehq/airbyte/pull/37145) | Manage dependencies with Poetry. |
| 0.3.2 | 2024-04-15 | [37145](https://github.com/airbytehq/airbyte/pull/37145) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.3.1 | 2024-04-12 | [37145](https://github.com/airbytehq/airbyte/pull/37145) | schema descriptions |
| 0.3.0 | 2023-08-10 | [**\***](https://github.com/airbytehq/airbyte/pull/*****) | Migrate to low code |
| 0.2.1 | 2023-08-24 | [29494](https://github.com/airbytehq/airbyte/pull/29494) | Fix schemas and tests |
| 0.2.0 | 2023-04-17 | [24824](https://github.com/airbytehq/airbyte/pull/24824) | Add `opportunities` stream |
| 0.1.0 | 2022-11-17 | [18848](https://github.com/airbytehq/airbyte/pull/18848) | 🎉 New Source: Copper [python cdk] |

</details>
