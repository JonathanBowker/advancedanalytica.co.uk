---
generated_record: true
connector_name: Freshsales
connector_type: source
connector_slug: freshsales
connector_directory: source-freshsales
definition_id: eca08d79-7b92-4065-b7f3-79c14836ebe7
version: 1.1.55
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/sources/freshsales
logo: /images/connectors/sources/freshsales.svg
logo_source_path: airbyte-integrations/connectors/source-freshsales/icon.svg
logo_sha256: 2aba230d0c78c5a957d66c38595387f0f18f5b0fb8d60689154214d7917aa449
original_metadata_path: airbyte-integrations/connectors/source-freshsales/metadata.yaml
original_metadata_sha256: 0b381608bbc5fc24511e621914016f1a28b57b078c76ffb68bfcb23faef8e2d7
original_document_path: docs/integrations/sources/freshsales.md
original_document_sha256: 7cd3cfcca4e41d0c95a43180ef85d4ed2f4f97b952eb0fce4a2116e13a5bedfc
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 76dc85388d3040d2adf3232996e69b5cb055cbe2f7df7d2f29912818d82fef57
rewritten_at: 2026-11-12T14:06:38.149987+00:00
---

# Freshsales

Use this page to set up the Freshsales source connector and find reference information.

## Prerequisites

- Freshsales account
- Freshsales API Key
- Freshsales Domain Name

Read [How to find your API key](https://crmsupport.freshworks.com/support/solutions/articles/50000002503-how-to-find-my-api-key-).

## Setup guide

## Step 1: Set up Freshsales in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. Then, in the top-right corner, click **+new source**.
3. Set a name for your source.
4. Enter your `Domain Name`.
5. Enter your `API Key`, obtained from [these steps](https://crmsupport.freshworks.com/support/solutions/articles/50000002503-how-to-find-my-api-key-).
6. Click **Set up source**.

### Airbyte OSS

1. Open the Airbyte Open Source dashboard.
2. In the left navigation bar, click **Sources**. Then, in the top-right corner, click **+new source**.
3. Set a name for your source.
4. Enter your `Domain Name`.
5. Enter your `API Key`, obtained from [these steps](https://crmsupport.freshworks.com/support/solutions/articles/50000002503-how-to-find-my-api-key-).
6. Click **Set up source**.

## Supported sync modes

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| SSL connection    | No         |
| Namespaces        | No         |

## Supported streams

You can use several output streams from this source:

- [Contacts](https://developers.freshworks.com/crm/api/#contacts)
- [Accounts](https://developers.freshworks.com/crm/api/#accounts)
- [Open Deals](https://developers.freshworks.com/crm/api/#deals)
- [Won Deals](https://developers.freshworks.com/crm/api/#deals)
- [Lost Deals](https://developers.freshworks.com/crm/api/#deals)
- [Open Tasks](https://developers.freshworks.com/crm/api/#tasks)
- [Completed Tasks](https://developers.freshworks.com/crm/api/#tasks)
- [Past appointments](https://developers.freshworks.com/crm/api/#appointments)
- [Upcoming appointments](https://developers.freshworks.com/crm/api/#appointments)

If you'd like Airbyte to support more endpoints, please [create an issue.](https://github.com/airbytehq/airbyte/issues/new/choose)

### Performance considerations

Under normal usage, the Freshsales connector shouldn't encounter Freshsales API limitations. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if rate limit issues aren't automatically retried successfully.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                      |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------------------- |
| 1.1.55 | 2026-07-21 | [82428](https://github.com/airbytehq/airbyte/pull/82428) | Update dependencies |
| 1.1.54 | 2026-07-14 | [81808](https://github.com/airbytehq/airbyte/pull/81808) | Update dependencies |
| 1.1.53 | 2026-06-30 | [81055](https://github.com/airbytehq/airbyte/pull/81055) | Update dependencies |
| 1.1.52 | 2026-06-23 | [80464](https://github.com/airbytehq/airbyte/pull/80464) | Update dependencies |
| 1.1.51 | 2026-06-16 | [79872](https://github.com/airbytehq/airbyte/pull/79872) | Update dependencies |
| 1.1.50 | 2026-06-09 | [79328](https://github.com/airbytehq/airbyte/pull/79328) | Update dependencies |
| 1.1.49 | 2026-06-02 | [78683](https://github.com/airbytehq/airbyte/pull/78683) | Update dependencies |
| 1.1.48 | 2026-04-28 | [77230](https://github.com/airbytehq/airbyte/pull/77230) | Update dependencies |
| 1.1.47 | 2026-04-21 | [76582](https://github.com/airbytehq/airbyte/pull/76582) | Update dependencies |
| 1.1.46 | 2026-03-31 | [75723](https://github.com/airbytehq/airbyte/pull/75723) | Update dependencies |
| 1.1.45 | 2026-03-24 | [75315](https://github.com/airbytehq/airbyte/pull/75315) | Update dependencies |
| 1.1.44 | 2026-03-03 | [74194](https://github.com/airbytehq/airbyte/pull/74194) | Update dependencies |
| 1.1.43 | 2026-02-17 | [73402](https://github.com/airbytehq/airbyte/pull/73402) | Update dependencies |
| 1.1.42 | 2026-02-10 | [73146](https://github.com/airbytehq/airbyte/pull/73146) | Update dependencies |
| 1.1.41 | 2026-01-20 | [71662](https://github.com/airbytehq/airbyte/pull/71662) | Update dependencies |
| 1.1.40 | 2025-12-18 | [70592](https://github.com/airbytehq/airbyte/pull/70592) | Update dependencies |
| 1.1.39 | 2025-11-25 | [69496](https://github.com/airbytehq/airbyte/pull/69496) | Update dependencies |
| 1.1.38 | 2025-10-29 | [68776](https://github.com/airbytehq/airbyte/pull/68776) | Update dependencies |
| 1.1.37 | 2025-10-21 | [68423](https://github.com/airbytehq/airbyte/pull/68423) | Update dependencies |
| 1.1.36 | 2025-10-14 | [68041](https://github.com/airbytehq/airbyte/pull/68041) | Update dependencies |
| 1.1.35 | 2025-10-07 | [67311](https://github.com/airbytehq/airbyte/pull/67311) | Update dependencies |
| 1.1.34 | 2025-09-30 | [66775](https://github.com/airbytehq/airbyte/pull/66775) | Update dependencies |
| 1.1.33 | 2025-09-24 | [65792](https://github.com/airbytehq/airbyte/pull/65792) | Update dependencies |
| 1.1.32 | 2025-08-23 | [65299](https://github.com/airbytehq/airbyte/pull/65299) | Update dependencies |
| 1.1.31 | 2025-08-09 | [64790](https://github.com/airbytehq/airbyte/pull/64790) | Update dependencies |
| 1.1.30 | 2025-08-02 | [64337](https://github.com/airbytehq/airbyte/pull/64337) | Update dependencies |
| 1.1.29 | 2025-07-26 | [63971](https://github.com/airbytehq/airbyte/pull/63971) | Update dependencies |
| 1.1.28 | 2025-07-19 | [63543](https://github.com/airbytehq/airbyte/pull/63543) | Update dependencies |
| 1.1.27 | 2025-07-12 | [62972](https://github.com/airbytehq/airbyte/pull/62972) | Update dependencies |
| 1.1.26 | 2025-07-05 | [62782](https://github.com/airbytehq/airbyte/pull/62782) | Update dependencies |
| 1.1.25 | 2025-06-28 | [62427](https://github.com/airbytehq/airbyte/pull/62427) | Update dependencies |
| 1.1.24 | 2025-06-22 | [61994](https://github.com/airbytehq/airbyte/pull/61994) | Update dependencies |
| 1.1.23 | 2025-06-14 | [61289](https://github.com/airbytehq/airbyte/pull/61289) | Update dependencies |
| 1.1.22 | 2025-05-24 | [59971](https://github.com/airbytehq/airbyte/pull/59971) | Update dependencies |
| 1.1.21 | 2025-05-03 | [59398](https://github.com/airbytehq/airbyte/pull/59398) | Update dependencies |
| 1.1.20 | 2025-04-26 | [58907](https://github.com/airbytehq/airbyte/pull/58907) | Update dependencies |
| 1.1.19 | 2025-04-19 | [58317](https://github.com/airbytehq/airbyte/pull/58317) | Update dependencies |
| 1.1.18 | 2025-04-12 | [57788](https://github.com/airbytehq/airbyte/pull/57788) | Update dependencies |
| 1.1.17 | 2025-04-05 | [57193](https://github.com/airbytehq/airbyte/pull/57193) | Update dependencies |
| 1.1.16 | 2025-03-29 | [56514](https://github.com/airbytehq/airbyte/pull/56514) | Update dependencies |
| 1.1.15 | 2025-03-22 | [55995](https://github.com/airbytehq/airbyte/pull/55995) | Update dependencies |
| 1.1.14 | 2025-03-08 | [55304](https://github.com/airbytehq/airbyte/pull/55304) | Update dependencies |
| 1.1.13 | 2025-03-01 | [54913](https://github.com/airbytehq/airbyte/pull/54913) | Update dependencies |
| 1.1.12 | 2025-02-22 | [54401](https://github.com/airbytehq/airbyte/pull/54401) | Update dependencies |
| 1.1.11 | 2025-02-15 | [53708](https://github.com/airbytehq/airbyte/pull/53708) | Update dependencies |
| 1.1.10 | 2025-02-08 | [53368](https://github.com/airbytehq/airbyte/pull/53368) | Update dependencies |
| 1.1.9 | 2025-02-01 | [52852](https://github.com/airbytehq/airbyte/pull/52852) | Update dependencies |
| 1.1.8 | 2025-01-25 | [52300](https://github.com/airbytehq/airbyte/pull/52300) | Update dependencies |
| 1.1.7 | 2025-01-18 | [51688](https://github.com/airbytehq/airbyte/pull/51688) | Update dependencies |
| 1.1.6 | 2025-01-11 | [51070](https://github.com/airbytehq/airbyte/pull/51070) | Update dependencies |
| 1.1.5 | 2024-12-28 | [50527](https://github.com/airbytehq/airbyte/pull/50527) | Update dependencies |
| 1.1.4 | 2024-12-21 | [50004](https://github.com/airbytehq/airbyte/pull/50004) | Update dependencies |
| 1.1.3 | 2024-12-14 | [49473](https://github.com/airbytehq/airbyte/pull/49473) | Update dependencies |
| 1.1.2 | 2024-12-12 | [49203](https://github.com/airbytehq/airbyte/pull/49203) | Update dependencies |
| 1.1.1 | 2024-10-28 | [44277](https://github.com/airbytehq/airbyte/pull/44277) | Update dependencies |
| 1.1.0 | 2024-08-15 | [44149](https://github.com/airbytehq/airbyte/pull/44149) | Refactor connector to manifest-only format |
| 1.0.14 | 2024-08-12 | [43904](https://github.com/airbytehq/airbyte/pull/43904) | Update dependencies |
| 1.0.13 | 2024-08-10 | [43678](https://github.com/airbytehq/airbyte/pull/43678) | Update dependencies |
| 1.0.12 | 2024-08-03 | [43192](https://github.com/airbytehq/airbyte/pull/43192) | Update dependencies |
| 1.0.11 | 2024-07-27 | [42744](https://github.com/airbytehq/airbyte/pull/42744) | Update dependencies |
| 1.0.10 | 2024-07-20 | [42277](https://github.com/airbytehq/airbyte/pull/42277) | Update dependencies |
| 1.0.9 | 2024-07-13 | [41709](https://github.com/airbytehq/airbyte/pull/41709) | Update dependencies |
| 1.0.8 | 2024-07-10 | [41494](https://github.com/airbytehq/airbyte/pull/41494) | Update dependencies |
| 1.0.7 | 2024-07-09 | [41226](https://github.com/airbytehq/airbyte/pull/41226) | Update dependencies |
| 1.0.6 | 2024-07-06 | [40851](https://github.com/airbytehq/airbyte/pull/40851) | Update dependencies |
| 1.0.5 | 2024-06-25 | [40304](https://github.com/airbytehq/airbyte/pull/40304) | Update dependencies |
| 1.0.4 | 2024-06-21 | [39925](https://github.com/airbytehq/airbyte/pull/39925) | Update dependencies |
| 1.0.3 | 2024-06-04 | [39065](https://github.com/airbytehq/airbyte/pull/39065) | [autopull] Upgrade base image to v1.2.1 |
| 1.0.2 | 2024-05-21 | [38548](https://github.com/airbytehq/airbyte/pull/38548) | Upgrade to CDK 1.0.0 |
| 1.0.1 | 2024-05-28 | [38153](https://github.com/airbytehq/airbyte/pull/38153) | Make connector compatible with builder |
| 1.0.0 | 2023-10-21 | [31685](https://github.com/airbytehq/airbyte/pull/31685) | Migrate to Low-Code CDK |
| 0.1.4 | 2023-03-23 | [24396](https://github.com/airbytehq/airbyte/pull/24396) | Certify to Beta |
| 0.1.3 | 2023-03-16 | [24155](https://github.com/airbytehq/airbyte/pull/24155) | Set `additionalProperties` to `True` in `spec` to support BC |
| 0.1.2 | 2022-07-14 | [0](https://github.com/airbytehq/airbyte/pull/0) | Tune the `get_view_id` function |
| 0.1.1 | 2021-12-24 | [9101](https://github.com/airbytehq/airbyte/pull/9101) | Update fields and descriptions |
| 0.1.0 | 2021-11-03 | [6963](https://github.com/airbytehq/airbyte/pull/6963) | 🎉 New Source: Freshsales |


</details>
