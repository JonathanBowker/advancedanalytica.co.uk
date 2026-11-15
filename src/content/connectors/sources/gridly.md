---
generated_record: true
connector_name: Gridly
connector_type: source
connector_slug: gridly
connector_directory: source-gridly
definition_id: 6cbea164-3237-433b-9abb-36d384ee4cbf
version: 0.1.40
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/gridly
logo: /images/connectors/sources/gridly.svg
logo_source_path: airbyte-integrations/connectors/source-gridly/icon.svg
logo_sha256: 26f644a5b2d345f633ee16569b334e271c183f3506a63923d19ee9efd864f6a7
original_metadata_path: airbyte-integrations/connectors/source-gridly/metadata.yaml
original_metadata_sha256: f4c8c0c3399d4f9581732b146b9064225b677da0d9a46adc1fc94b052d179ec1
original_document_path: docs/integrations/sources/gridly.md
original_document_sha256: bd90c616e799d99c9b04f65931136e25933b347be9a488d63568cf2ecb14d7a7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f6b3389149f3969053f63d74171f8965bb1c39c3574a8c64a392e639059304f6
rewritten_at: 2026-11-12T13:41:55.919880+00:00
---

# Gridly

Use this page to set up the Gridly source connector and find reference information.

## Prerequisites

- Access to an active Gridly account
- An API Key, requiring Owner or Administrator access

## Setup

### Find your API Key

1. Go to your Gridly Dashboard.
2. Select **[API]**. You'll find the API key in the API Quickstart panel.
3. Owners and Administrators can also go to their **Settings**, then **API Keys**. There, they can create company-level API keys with scoped privileges and access.

### Find the Grid ID

1. When you access the Grid in the UI, the URL includes `Grid ID`. The Grid ID follows `/grids/` in the URL.
2. By default, `Branch ID` matches `Grid ID` when you select the `Master` branch. To fetch records from other branches, use `Branch ID` instead.

## Supported sync modes

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |

## Supported streams

- [Records](https://www.gridly.com/docs/api/#record)

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                     |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------------------- |
| 0.1.40 | 2025-05-24 | [60679](https://github.com/airbytehq/airbyte/pull/60679) | Update dependencies |
| 0.1.39 | 2025-05-10 | [59904](https://github.com/airbytehq/airbyte/pull/59904) | Update dependencies |
| 0.1.38 | 2025-05-03 | [59241](https://github.com/airbytehq/airbyte/pull/59241) | Update dependencies |
| 0.1.37 | 2025-04-26 | [58758](https://github.com/airbytehq/airbyte/pull/58758) | Update dependencies |
| 0.1.36 | 2025-04-19 | [57667](https://github.com/airbytehq/airbyte/pull/57667) | Update dependencies |
| 0.1.35 | 2025-04-05 | [57090](https://github.com/airbytehq/airbyte/pull/57090) | Update dependencies |
| 0.1.34 | 2025-03-29 | [56648](https://github.com/airbytehq/airbyte/pull/56648) | Update dependencies |
| 0.1.33 | 2025-03-22 | [55501](https://github.com/airbytehq/airbyte/pull/55501) | Update dependencies |
| 0.1.32 | 2025-03-01 | [54806](https://github.com/airbytehq/airbyte/pull/54806) | Update dependencies |
| 0.1.31 | 2025-02-22 | [54286](https://github.com/airbytehq/airbyte/pull/54286) | Update dependencies |
| 0.1.30 | 2025-02-15 | [53845](https://github.com/airbytehq/airbyte/pull/53845) | Update dependencies |
| 0.1.29 | 2025-02-01 | [52727](https://github.com/airbytehq/airbyte/pull/52727) | Update dependencies |
| 0.1.28 | 2025-01-25 | [51796](https://github.com/airbytehq/airbyte/pull/51796) | Update dependencies |
| 0.1.27 | 2025-01-11 | [51195](https://github.com/airbytehq/airbyte/pull/51195) | Update dependencies |
| 0.1.26 | 2024-12-28 | [50663](https://github.com/airbytehq/airbyte/pull/50663) | Update dependencies |
| 0.1.25 | 2024-12-21 | [50085](https://github.com/airbytehq/airbyte/pull/50085) | Update dependencies |
| 0.1.24 | 2024-12-14 | [49000](https://github.com/airbytehq/airbyte/pull/49000) | Update dependencies |
| 0.1.23 | 2024-11-25 | [48675](https://github.com/airbytehq/airbyte/pull/48675) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.22 | 2024-10-28 | [47075](https://github.com/airbytehq/airbyte/pull/47075) | Update dependencies |
| 0.1.21 | 2024-10-12 | [46476](https://github.com/airbytehq/airbyte/pull/46476) | Update dependencies |
| 0.1.20 | 2024-09-28 | [46122](https://github.com/airbytehq/airbyte/pull/46122) | Update dependencies |
| 0.1.19 | 2024-09-21 | [45723](https://github.com/airbytehq/airbyte/pull/45723) | Update dependencies |
| 0.1.18 | 2024-09-14 | [45529](https://github.com/airbytehq/airbyte/pull/45529) | Update dependencies |
| 0.1.17 | 2024-09-07 | [45314](https://github.com/airbytehq/airbyte/pull/45314) | Update dependencies |
| 0.1.16 | 2024-08-31 | [44949](https://github.com/airbytehq/airbyte/pull/44949) | Update dependencies |
| 0.1.15 | 2024-08-24 | [44750](https://github.com/airbytehq/airbyte/pull/44750) | Update dependencies |
| 0.1.14 | 2024-08-17 | [44320](https://github.com/airbytehq/airbyte/pull/44320) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43668](https://github.com/airbytehq/airbyte/pull/43668) | Update dependencies |
| 0.1.12 | 2024-08-03 | [42662](https://github.com/airbytehq/airbyte/pull/42662) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42173](https://github.com/airbytehq/airbyte/pull/42173) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41768](https://github.com/airbytehq/airbyte/pull/41768) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41376](https://github.com/airbytehq/airbyte/pull/41376) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41163](https://github.com/airbytehq/airbyte/pull/41163) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40908](https://github.com/airbytehq/airbyte/pull/40908) | Update dependencies |
| 0.1.6 | 2024-06-26 | [40549](https://github.com/airbytehq/airbyte/pull/40549) | Migrate off deprecated auth package |
| 0.1.5 | 2024-06-25 | [40495](https://github.com/airbytehq/airbyte/pull/40495) | Update dependencies |
| 0.1.4 | 2024-06-22 | [39982](https://github.com/airbytehq/airbyte/pull/39982) | Update dependencies |
| 0.1.3 | 2024-06-04 | [39051](https://github.com/airbytehq/airbyte/pull/39051) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.2 | 2024-05-21 | [38542](https://github.com/airbytehq/airbyte/pull/38542) | [autopull] base image + poetry + up_to_date |
| 0.1.1 | 2022-12-08 | [20048](https://github.com/airbytehq/airbyte/pull/20048) | Source Gridly: add icon and make grid_id parameter required |

</details>
