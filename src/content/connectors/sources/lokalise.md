---
generated_record: true
connector_name: Lokalise
connector_type: source
connector_slug: lokalise
connector_directory: source-lokalise
definition_id: 45e0b135-615c-40ac-b38e-e65b0944197f
version: 0.2.22
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/lokalise
logo: /images/connectors/sources/lokalise.svg
logo_source_path: airbyte-integrations/connectors/source-lokalise/icon.svg
logo_sha256: a3ed0bd3e9e31c3ae98c5613de1c02ad390948b2ade35848801ec4d02fd643ee
original_metadata_path: airbyte-integrations/connectors/source-lokalise/metadata.yaml
original_metadata_sha256: 7d2323296a0590bf159821abd874c2083384d48fcfbfc31104ba9a08f343d499
original_document_path: docs/integrations/sources/lokalise.md
original_document_sha256: 815c5f62db4be0061af1e45abd2e0e9212205a205f7a12873351ea8603b40a81
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: e3b9871d281576d625519343322f4e30822cf538faa815c0c5b670ab72c7c94c
rewritten_at: 2026-11-12T13:45:40.915758+00:00
---

# Lokalise

Use this page to set up the [Lokalise](https://lokalise.com/) source connector and find reference information.

Find more information about the Lokalise REST API [here](https://developers.lokalise.com/reference/lokalise-rest-api).

## Prerequisites

You can find your Project ID and find or create an API key in [Lokalise](https://docs.lokalise.com/en/articles/1929556-api-tokens).

## Setup guide

## Step 1: Set up Lokalise in Airbyte

### Airbyte Cloud

1. Sign in to your [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+new source**.
3. On the Set up the source page, enter a name for the Lokalise connector. Select **Lokalise** from the Source type dropdown.
4. Enter your `project_id`: Lokalise Project ID.
5. Enter your `api_key`: Lokalise API key with read permissions.
6. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Enter a name for your source.
3. Enter your `project_id`: Lokalise Project ID.
4. Enter your `api_key`: Lokalise API key with read permissions.
5. Click **Set up source**.

## Supported sync modes

The Lokalise source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| SSL connection    | Yes        |
| Namespaces        | No         |

## Supported streams

- [Keys](https://developers.lokalise.com/reference/list-all-keys)
- [Languages](https://developers.lokalise.com/reference/list-project-languages)
- [Comments](https://developers.lokalise.com/reference/list-project-comments)
- [Contributors](https://developers.lokalise.com/reference/list-all-contributors)
- [Translations](https://developers.lokalise.com/reference/list-all-translations)

## Data type map

| Integration Type    | Airbyte Type |
| :------------------ | :----------- |
| `string`            | `string`     |
| `integer`, `number` | `number`     |
| `array`             | `array`      |
| `object`            | `object`     |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject              |
| :------ | :--------- | :------------------------------------------------------- | :------------------- |
| 0.2.22 | 2025-05-10 | [59262](https://github.com/airbytehq/airbyte/pull/59262) | Update dependencies |
| 0.2.21 | 2025-04-26 | [58805](https://github.com/airbytehq/airbyte/pull/58805) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58212](https://github.com/airbytehq/airbyte/pull/58212) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57739](https://github.com/airbytehq/airbyte/pull/57739) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57097](https://github.com/airbytehq/airbyte/pull/57097) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56677](https://github.com/airbytehq/airbyte/pull/56677) | Update dependencies |
| 0.2.16 | 2025-03-22 | [56012](https://github.com/airbytehq/airbyte/pull/56012) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55487](https://github.com/airbytehq/airbyte/pull/55487) | Update dependencies |
| 0.2.14 | 2025-03-01 | [54746](https://github.com/airbytehq/airbyte/pull/54746) | Update dependencies |
| 0.2.13 | 2025-02-22 | [54303](https://github.com/airbytehq/airbyte/pull/54303) | Update dependencies |
| 0.2.12 | 2025-02-15 | [53811](https://github.com/airbytehq/airbyte/pull/53811) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53260](https://github.com/airbytehq/airbyte/pull/53260) | Update dependencies |
| 0.2.10 | 2025-02-01 | [52752](https://github.com/airbytehq/airbyte/pull/52752) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52294](https://github.com/airbytehq/airbyte/pull/52294) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51803](https://github.com/airbytehq/airbyte/pull/51803) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51204](https://github.com/airbytehq/airbyte/pull/51204) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50635](https://github.com/airbytehq/airbyte/pull/50635) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50121](https://github.com/airbytehq/airbyte/pull/50121) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49216](https://github.com/airbytehq/airbyte/pull/49216) | Update dependencies |
| 0.2.3 | 2024-12-11 | [48995](https://github.com/airbytehq/airbyte/pull/48995) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.2 | 2024-11-04 | [47935](https://github.com/airbytehq/airbyte/pull/47935) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47629](https://github.com/airbytehq/airbyte/pull/47629) | Update dependencies |
| 0.2.0 | 2024-08-26 | [44765](https://github.com/airbytehq/airbyte/pull/44765) | Refactor connector to manifest-only format |
| 0.1.15 | 2024-08-24 | [44696](https://github.com/airbytehq/airbyte/pull/44696) | Update dependencies |
| 0.1.14 | 2024-08-17 | [44203](https://github.com/airbytehq/airbyte/pull/44203) | Update dependencies |
| 0.1.13 | 2024-08-12 | [43917](https://github.com/airbytehq/airbyte/pull/43917) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43699](https://github.com/airbytehq/airbyte/pull/43699) | Update dependencies |
| 0.1.11 | 2024-08-03 | [43121](https://github.com/airbytehq/airbyte/pull/43121) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42644](https://github.com/airbytehq/airbyte/pull/42644) | Update dependencies |
| 0.1.9 | 2024-07-20 | [42307](https://github.com/airbytehq/airbyte/pull/42307) | Update dependencies |
| 0.1.8 | 2024-07-13 | [41803](https://github.com/airbytehq/airbyte/pull/41803) | Update dependencies |
| 0.1.7 | 2024-07-10 | [41395](https://github.com/airbytehq/airbyte/pull/41395) | Update dependencies |
| 0.1.6 | 2024-07-09 | [41188](https://github.com/airbytehq/airbyte/pull/41188) | Update dependencies |
| 0.1.5 | 2024-07-06 | [40809](https://github.com/airbytehq/airbyte/pull/40809) | Update dependencies |
| 0.1.4 | 2024-06-25 | [40337](https://github.com/airbytehq/airbyte/pull/40337) | Update dependencies |
| 0.1.3 | 2024-06-22 | [40178](https://github.com/airbytehq/airbyte/pull/40178) | Update dependencies |
| 0.1.2 | 2024-06-06 | [39168](https://github.com/airbytehq/airbyte/pull/39168) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-20 | [38435](https://github.com/airbytehq/airbyte/pull/38435) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-10-27 | [18522](https://github.com/airbytehq/airbyte/pull/18522) | New Source: Lokalise |

</details>
