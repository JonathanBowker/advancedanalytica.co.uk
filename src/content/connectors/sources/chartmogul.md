---
generated_record: true
connector_name: Chartmogul
connector_type: source
connector_slug: chartmogul
connector_directory: source-chartmogul
definition_id: b6604cbd-1b12-4c08-8767-e140d0fb0877
version: 1.1.49
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/sources/chartmogul
logo: /images/connectors/sources/chartmogul.svg
logo_source_path: airbyte-integrations/connectors/source-chartmogul/icon.svg
logo_sha256: 25d0e8147fd4bbaeebc8fadb30a227adb7bb759e7ed50e13791c82ea1c4df259
original_metadata_path: airbyte-integrations/connectors/source-chartmogul/metadata.yaml
original_metadata_sha256: 43997031b7834e80eca94045c8373614bf6471b857b227f3ad4111126b0450fe
original_document_path: docs/integrations/sources/chartmogul.md
original_document_sha256: 1d36ff397327586ee122b22a1a6a824e7e6400472b6d52a94e2f974b81233162
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4af906f88a02c39eba7072a28262d51fe49c8950bc42ffdee1adfd4589a71bdb
rewritten_at: 2026-11-12T13:33:14.651255+00:00
---

# Chartmogul

Use this page to set up the [Chartmogul](https://chartmogul.com/) source connector and find reference information.

## Prerequisites

- A Chartmogul API Key.
- Your preferred start date for replicating data.

## Setup guide

### Step 1: Create a Chartmogul API key

1. Log in to your Chartmogul account.
2. In the left navbar, select **Profile** > **View Profile**.
3. Select **NEW API KEY**.
4. Enter a unique key name in the **Name** field.
5. If you're a Staff, Admin, or Owner, use the dropdown menu to set **Access Level** to **Read-only** or **Read & Write**. **Read-only** is recommended.
6. Click **ADD** to create the key.
7. Click the **Reveal** icon to view the key. Click the **Copy** icon to copy it to your clipboard.

For more information about creating and maintaining Chartmogul API Keys, see the official [Chartmogul documentation](https://help.chartmogul.com/hc/en-us/articles/4407796325906-Creating-and-Managing-API-keys#creating-an-api-key).

### Step 2: Set up the Chartmogul connector in Airbyte

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account, or go to the Airbyte Open Source dashboard.
2. In the Airbyte UI, click **Sources**, then **+ New Source**. Select **Chartmogul** from the available sources.
3. Enter your preferred **Source name**.
4. Enter the **API key** you obtained.
5. Enter a **Start date**. For programmatic configuration, format the date as `yyyy-mm-ddThh:mm:ssZ`. For example, `2017-01-25T06:30:00Z` sets the start date to 6:30 AM UTC on January 25th, 2017. Where feasible, data from before this date won't be replicated.

:::note
The **Start date** applies only to the `Activities` stream. The `Customers` endpoint can't filter by creation or update dates.
:::

6. Click **Set up source** and wait for the tests to finish.

## Supported sync modes

The Chartmogul source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)

## Supported streams

The connector outputs these full refresh streams:

- [Activities](https://dev.chartmogul.com/reference/list-activities)
- [CustomerCountDaily](https://dev.chartmogul.com/reference/retrieve-customer-count)
- [CustomerCountWeekly](https://dev.chartmogul.com/reference/retrieve-customer-count)
- [CustomerCountMonthly](https://dev.chartmogul.com/reference/retrieve-customer-count)
- [CustomerCountQuarterly](https://dev.chartmogul.com/reference/retrieve-customer-count)
- [Customers](https://dev.chartmogul.com/reference/list-customers)

## Performance considerations

Under normal usage, the Chartmogul connector shouldn't encounter Chartmogul API limits. If automatic retries don't resolve rate limit issues, please [create an issue](https://github.com/airbytehq/airbyte/issues).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                          |
|:--------|:-----------| :------------------------------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------|
| 1.1.49 | 2026-06-09 | [79259](https://github.com/airbytehq/airbyte/pull/79259) | Update dependencies |
| 1.1.48 | 2026-06-02 | [78648](https://github.com/airbytehq/airbyte/pull/78648) | Update dependencies |
| 1.1.47 | 2026-04-28 | [77185](https://github.com/airbytehq/airbyte/pull/77185) | Update dependencies |
| 1.1.46 | 2026-04-21 | [76534](https://github.com/airbytehq/airbyte/pull/76534) | Update dependencies |
| 1.1.45 | 2026-03-24 | [75394](https://github.com/airbytehq/airbyte/pull/75394) | Update dependencies |
| 1.1.44 | 2026-02-24 | [73793](https://github.com/airbytehq/airbyte/pull/73793) | Update dependencies |
| 1.1.43 | 2026-02-10 | [72995](https://github.com/airbytehq/airbyte/pull/72995) | Update dependencies |
| 1.1.42 | 2026-02-03 | [72699](https://github.com/airbytehq/airbyte/pull/72699) | Update dependencies |
| 1.1.41 | 2026-01-20 | [72144](https://github.com/airbytehq/airbyte/pull/72144) | Update dependencies |
| 1.1.40 | 2026-01-14 | [71721](https://github.com/airbytehq/airbyte/pull/71721) | Update dependencies |
| 1.1.39 | 2025-12-18 | [70610](https://github.com/airbytehq/airbyte/pull/70610) | Update dependencies |
| 1.1.38 | 2025-11-25 | [69939](https://github.com/airbytehq/airbyte/pull/69939) | Update dependencies |
| 1.1.37 | 2025-11-18 | [69634](https://github.com/airbytehq/airbyte/pull/69634) | Update dependencies |
| 1.1.36 | 2025-10-29 | [68866](https://github.com/airbytehq/airbyte/pull/68866) | Update dependencies |
| 1.1.35 | 2025-10-21 | [68514](https://github.com/airbytehq/airbyte/pull/68514) | Update dependencies |
| 1.1.34 | 2025-10-14 | [68069](https://github.com/airbytehq/airbyte/pull/68069) | Update dependencies |
| 1.1.33 | 2025-10-07 | [67195](https://github.com/airbytehq/airbyte/pull/67195) | Update dependencies |
| 1.1.32 | 2025-09-30 | [65867](https://github.com/airbytehq/airbyte/pull/65867) | Update dependencies |
| 1.1.31 | 2025-08-23 | [65264](https://github.com/airbytehq/airbyte/pull/65264) | Update dependencies |
| 1.1.30 | 2025-08-09 | [64673](https://github.com/airbytehq/airbyte/pull/64673) | Update dependencies |
| 1.1.29 | 2025-08-02 | [64401](https://github.com/airbytehq/airbyte/pull/64401) | Update dependencies |
| 1.1.28 | 2025-07-26 | [64017](https://github.com/airbytehq/airbyte/pull/64017) | Update dependencies |
| 1.1.27 | 2025-07-19 | [63601](https://github.com/airbytehq/airbyte/pull/63601) | Update dependencies |
| 1.1.26 | 2025-07-12 | [62959](https://github.com/airbytehq/airbyte/pull/62959) | Update dependencies |
| 1.1.25 | 2025-07-05 | [62758](https://github.com/airbytehq/airbyte/pull/62758) | Update dependencies |
| 1.1.24 | 2025-06-28 | [62433](https://github.com/airbytehq/airbyte/pull/62433) | Update dependencies |
| 1.1.23 | 2025-06-21 | [61967](https://github.com/airbytehq/airbyte/pull/61967) | Update dependencies |
| 1.1.22 | 2025-06-14 | [61279](https://github.com/airbytehq/airbyte/pull/61279) | Update dependencies |
| 1.1.21 | 2025-05-24 | [60353](https://github.com/airbytehq/airbyte/pull/60353) | Update dependencies |
| 1.1.20 | 2025-05-10 | [60032](https://github.com/airbytehq/airbyte/pull/60032) | Update dependencies |
| 1.1.19 | 2025-05-03 | [59408](https://github.com/airbytehq/airbyte/pull/59408) | Update dependencies |
| 1.1.18 | 2025-04-26 | [58843](https://github.com/airbytehq/airbyte/pull/58843) | Update dependencies |
| 1.1.17 | 2025-04-19 | [58297](https://github.com/airbytehq/airbyte/pull/58297) | Update dependencies |
| 1.1.16 | 2025-04-12 | [57790](https://github.com/airbytehq/airbyte/pull/57790) | Update dependencies |
| 1.1.15 | 2025-04-05 | [56570](https://github.com/airbytehq/airbyte/pull/56570) | Update dependencies |
| 1.1.14 | 2025-03-22 | [56095](https://github.com/airbytehq/airbyte/pull/56095) | Update dependencies |
| 1.1.13 | 2025-03-08 | [55405](https://github.com/airbytehq/airbyte/pull/55405) | Update dependencies |
| 1.1.12 | 2025-03-01 | [54250](https://github.com/airbytehq/airbyte/pull/54250) | Update dependencies |
| 1.1.11 | 2025-02-15 | [53932](https://github.com/airbytehq/airbyte/pull/53932) | Update dependencies |
| 1.1.10 | 2025-02-08 | [53411](https://github.com/airbytehq/airbyte/pull/53411) | Update dependencies |
| 1.1.9 | 2025-02-01 | [52933](https://github.com/airbytehq/airbyte/pull/52933) | Update dependencies |
| 1.1.8 | 2025-01-25 | [52202](https://github.com/airbytehq/airbyte/pull/52202) | Update dependencies |
| 1.1.7 | 2025-01-18 | [51709](https://github.com/airbytehq/airbyte/pull/51709) | Update dependencies |
| 1.1.6 | 2025-01-11 | [51276](https://github.com/airbytehq/airbyte/pull/51276) | Update dependencies |
| 1.1.5 | 2024-12-28 | [50503](https://github.com/airbytehq/airbyte/pull/50503) | Update dependencies |
| 1.1.4 | 2024-12-21 | [50210](https://github.com/airbytehq/airbyte/pull/50210) | Update dependencies |
| 1.1.3 | 2024-12-14 | [49563](https://github.com/airbytehq/airbyte/pull/49563) | Update dependencies |
| 1.1.2 | 2024-12-12 | [48951](https://github.com/airbytehq/airbyte/pull/48951) | Update dependencies |
| 1.1.1 | 2024-10-28 | [47637](https://github.com/airbytehq/airbyte/pull/47637) | Update dependencies |
| 1.1.0 | 2024-08-19 | [44418](https://github.com/airbytehq/airbyte/pull/44418) | Refactor connector to manifest-only format |
| 1.0.13 | 2024-08-17 | [44342](https://github.com/airbytehq/airbyte/pull/44342) | Update dependencies |
| 1.0.12 | 2024-08-12 | [43847](https://github.com/airbytehq/airbyte/pull/43847) | Update dependencies |
| 1.0.11 | 2024-08-10 | [43660](https://github.com/airbytehq/airbyte/pull/43660) | Update dependencies |
| 1.0.10 | 2024-08-03 | [43231](https://github.com/airbytehq/airbyte/pull/43231) | Update dependencies |
| 1.0.9 | 2024-07-27 | [42589](https://github.com/airbytehq/airbyte/pull/42589) | Update dependencies |
| 1.0.8 | 2024-07-20 | [42349](https://github.com/airbytehq/airbyte/pull/42349) | Update dependencies |
| 1.0.7 | 2024-07-13 | [41854](https://github.com/airbytehq/airbyte/pull/41854) | Update dependencies |
| 1.0.6 | 2024-07-10 | [41259](https://github.com/airbytehq/airbyte/pull/41259) | Update dependencies |
| 1.0.5 | 2024-07-06 | [40963](https://github.com/airbytehq/airbyte/pull/40963) | Update dependencies |
| 1.0.4 | 2024-06-25 | [40448](https://github.com/airbytehq/airbyte/pull/40448) | Update dependencies |
| 1.0.3 | 2024-06-21 | [39932](https://github.com/airbytehq/airbyte/pull/39932) | Update dependencies |
| 1.0.2 | 2024-06-06 | [39289](https://github.com/airbytehq/airbyte/pull/39289) | [autopull] Upgrade base image to v1.2.2 |
| 1.0.1 | 2024-05-14 | [38145](https://github.com/airbytehq/airbyte/pull/38145) | Make connector compatible with builder |
| 1.0.0 | 2023-11-09 | [23075](https://github.com/airbytehq/airbyte/pull/23075) | Refactor CustomerCount stream into CustomerCountDaily, CustomerCountWeekly, CustomerCountMonthly, CustomerCountQuarterly Streams |
| 0.2.1 | 2023-02-15 | [23075](https://github.com/airbytehq/airbyte/pull/23075) | Specified date formatting in specification |
| 0.2.0 | 2022-11-15 | [19276](https://github.com/airbytehq/airbyte/pull/19276) | Migrate connector from Alpha (Python) to Beta (YAML) |
| 0.1.1 | 2022-03-02 | [10756](https://github.com/airbytehq/airbyte/pull/10756) | Add new stream: customer-count |
| 0.1.0 | 2022-01-10 | [9381](https://github.com/airbytehq/airbyte/pull/9381) | New Source: Chartmogul |

</details>
