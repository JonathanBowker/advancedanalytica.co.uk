---
generated_record: true
connector_name: Orb
connector_type: source
connector_slug: orb
connector_directory: source-orb
definition_id: 7f0455fb-4518-4ec0-b7a3-d808bf8081cc
version: 2.1.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/orb
logo: /images/connectors/sources/orb.svg
logo_source_path: airbyte-integrations/connectors/source-orb/icon.svg
logo_sha256: b43a386cce4a1f0b02e7b400771c63d388a84a9f1db625c816f7de164fcc7ba1
original_metadata_path: airbyte-integrations/connectors/source-orb/metadata.yaml
original_metadata_sha256: b8108f701e487c43c68160e57ce4b868334325dc8626997af056da28167af29e
original_document_path: docs/integrations/sources/orb.md
original_document_sha256: e4a4be7fac5d39a01e3096fbefcad7192affd27d93c4d78907124b93025080cd
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4b4391be09fd91c94fcb85c155599ff9f10915a6ce43661a72d2bee1a1b4407a
rewritten_at: 2026-11-12T13:50:09.663990+00:00
---

# Orb

## Overview

The Orb source supports Full Refresh and Incremental syncs. Incremental syncs read and output only new records, based on their `created_at` timestamp.

### Output schema

The source syncs the following core resources. Each resource has a separate Stream, and every Stream is incremental:

- [Subscriptions](https://docs.withorb.com/reference/list-subscriptions)
- [Plans](https://docs.withorb.com/reference/list-plans)
- [Customers](https://docs.withorb.com/reference/list-customers)
- [Credits Ledger Entries](https://docs.withorb.com/reference/fetch-customer-credits-ledger)
- [Subscription Usage](https://docs.withorb.com/reference/fetch-subscription-usage)

For an incremental sync, Credits Ledger Entries must read all Customers. However, they return only new ledger entries for each customer.

For an incremental sync, the Subscription Usage stream must read all Subscriptions. It must also read all Plans when using the optional `subscription_usage_grouping_key`. It returns only new usage entries for each subscription.

### Incremental syncs

The Orb API can't query objects based on an `updated_at` time. Instead, this connector uses the `created_at` field to query for new data since the last sync. For the Subscription Usage stream, it uses the `timeframe_start` field.

Run a periodic Full Refresh to capture data updated after creation.

### Features

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | Yes        |
| Incremental - Dedupe Sync | Yes        |
| SSL connection            | Yes        |

### Performance considerations

The Orb connector shouldn't encounter Orb API limitations during normal use. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if any rate limit issues aren't retried successfully.

:::warning
The `credit_ledger_entries` stream now includes `events` data. This upgrade uses the `created_at` timestamps from the `credits` to define a 30-day timeframe. The earliest `created_at` marks the starting point. The Orb API sets this restriction.
:::

:::info
When using the `start_date` and `end_date` parameter with the `credit_ledger_entries` stream, it syncs all customers created within that time window. You can't query data directly using `credit_ledger_entries`. The connector must first retrieve customer data before ingesting the credit data.
:::

## Getting started

### Requirements

- Orb Account
- Orb API Key

### Setup guide

Contact the Orb team at [team@withorb.com](mailto:team@withorb.com) to request an Orb Account and API Key.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                                               |
|---------|------------| -------------------------------------------------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2.1.23 | 2026-10-27 | [78910](https://github.com/airbytehq/airbyte/pull/78910) | Update dependencies |
| 2.1.22 | 2025-05-24 | [60516](https://github.com/airbytehq/airbyte/pull/60516) | Update dependencies |
| 2.1.21 | 2025-05-10 | [60083](https://github.com/airbytehq/airbyte/pull/60083) | Update dependencies |
| 2.1.20 | 2025-05-04 | [59524](https://github.com/airbytehq/airbyte/pull/59524) | Update dependencies |
| 2.1.19 | 2025-04-27 | [59063](https://github.com/airbytehq/airbyte/pull/59063) | Update dependencies |
| 2.1.18 | 2025-04-19 | [58508](https://github.com/airbytehq/airbyte/pull/58508) | Update dependencies |
| 2.1.17 | 2025-04-12 | [57888](https://github.com/airbytehq/airbyte/pull/57888) | Update dependencies |
| 2.1.16 | 2025-04-05 | [57304](https://github.com/airbytehq/airbyte/pull/57304) | Update dependencies |
| 2.1.15 | 2025-03-29 | [56758](https://github.com/airbytehq/airbyte/pull/56758) | Update dependencies |
| 2.1.14 | 2025-03-22 | [56230](https://github.com/airbytehq/airbyte/pull/56230) | Update dependencies |
| 2.1.13 | 2025-03-08 | [55552](https://github.com/airbytehq/airbyte/pull/55552) | Update dependencies |
| 2.1.12 | 2025-03-01 | [55033](https://github.com/airbytehq/airbyte/pull/55033) | Update dependencies |
| 2.1.11 | 2025-02-23 | [54564](https://github.com/airbytehq/airbyte/pull/54564) | Update dependencies |
| 2.1.10 | 2025-02-15 | [54019](https://github.com/airbytehq/airbyte/pull/54019) | Update dependencies |
| 2.1.9 | 2025-02-08 | [53476](https://github.com/airbytehq/airbyte/pull/53476) | Update dependencies |
| 2.1.8 | 2025-02-01 | [53005](https://github.com/airbytehq/airbyte/pull/53005) | Update dependencies |
| 2.1.7 | 2025-01-25 | [52516](https://github.com/airbytehq/airbyte/pull/52516) | Update dependencies |
| 2.1.6 | 2025-01-18 | [51886](https://github.com/airbytehq/airbyte/pull/51886) | Update dependencies |
| 2.1.5 | 2025-01-11 | [51350](https://github.com/airbytehq/airbyte/pull/51350) | Update dependencies |
| 2.1.4 | 2024-12-28 | [50741](https://github.com/airbytehq/airbyte/pull/50741) | Update dependencies |
| 2.1.3 | 2024-12-21 | [50228](https://github.com/airbytehq/airbyte/pull/50228) | Update dependencies |
| 2.1.2 | 2024-12-14 | [49693](https://github.com/airbytehq/airbyte/pull/49693) | Update dependencies |
| 2.1.1 | 2024-12-12 | [48296](https://github.com/airbytehq/airbyte/pull/48296) | Update dependencies |
| 2.1.0 | 2024-10-23 | [47288](https://github.com/airbytehq/airbyte/pull/47288) | Migrate to manifest only format |
| 2.0.14 | 2024-10-29 | [46770](https://github.com/airbytehq/airbyte/pull/46770) | Update dependencies |
| 2.0.13 | 2024-10-05 | [46395](https://github.com/airbytehq/airbyte/pull/46395) | Update dependencies |
| 2.0.12 | 2024-09-28 | [45785](https://github.com/airbytehq/airbyte/pull/45785) | Update dependencies |
| 2.0.11 | 2024-09-14 | [45472](https://github.com/airbytehq/airbyte/pull/45472) | Update dependencies |
| 2.0.10 | 2024-09-07 | [45212](https://github.com/airbytehq/airbyte/pull/45212) | Update dependencies |
| 2.0.9 | 2024-08-24 | [44626](https://github.com/airbytehq/airbyte/pull/44626) | Update dependencies |
| 2.0.8 | 2024-08-10 | [43601](https://github.com/airbytehq/airbyte/pull/43601) | Update dependencies |
| 2.0.7 | 2024-08-03 | [43163](https://github.com/airbytehq/airbyte/pull/43163) | Update dependencies |
| 2.0.6 | 2024-07-20 | [42198](https://github.com/airbytehq/airbyte/pull/42198) | Update dependencies |
| 2.0.5 | 2024-07-13 | [41720](https://github.com/airbytehq/airbyte/pull/41720) | Update dependencies |
| 2.0.4 | 2024-07-10 | [41386](https://github.com/airbytehq/airbyte/pull/41386) | Update dependencies |
| 2.0.3 | 2024-07-09 | [41090](https://github.com/airbytehq/airbyte/pull/41090) | Update dependencies |
| 2.0.2 | 2024-07-06 | [40826](https://github.com/airbytehq/airbyte/pull/40826) | Update dependencies |
| 2.0.1 | 2024-06-29 | [40541](https://github.com/airbytehq/airbyte/pull/40541) | Update dependencies |
| 2.0.0 | 2024-06-24 | [40227](https://github.com/airbytehq/airbyte/pull/40227) | Migrate connector to Low Code. Update data type of credit_block_per_unit_cost_basis field in credits_ledger_entries stream to match return type from the upstream API |
| 1.2.4 | 2024-06-22 | [40004](https://github.com/airbytehq/airbyte/pull/40004) | Update dependencies |
| 1.2.3 | 2024-06-04 | [39015](https://github.com/airbytehq/airbyte/pull/39015) | [autopull] Upgrade base image to v1.2.1 |
| 1.2.2 | 2024-04-19 | [37211](https://github.com/airbytehq/airbyte/pull/37211) | Updating to 0.80.0 CDK |
| 1.2.1 | 2024-04-12 | [37211](https://github.com/airbytehq/airbyte/pull/37211) | schema descriptions |
| 1.2.0   | 2024-03-19 | [x](https://github.com/airbytehq/airbyte/pull/x)         | Expose `end_date`parameter                                                                                                                                            |
| 1.1.2   | 2024-03-13 | [x](https://github.com/airbytehq/airbyte/pull/x)         | Fix window to 30 days for events query timesframe start and query                                                                                                     |
| 1.1.1   | 2024-02-07 | [35005](https://github.com/airbytehq/airbyte/pull/35005) | Pass timeframe_start, timeframe_end to events query                                                                                                                   |
| 1.1.0   | 2023-03-03 | [24567](https://github.com/airbytehq/airbyte/pull/24567) | Add Invoices incremental stream merged from [#24737](https://github.com/airbytehq/airbyte/pull/24737)                                                                 |
| 1.0.0   | 2023-02-02 | [21951](https://github.com/airbytehq/airbyte/pull/21951) | Add SubscriptionUsage stream, and made `start_date` a required field                                                                                                  |
| 0.1.4   | 2022-10-07 | [17761](https://github.com/airbytehq/airbyte/pull/17761) | Fix bug with enriching ledger entries with multiple credit blocks                                                                                                     |
| 0.1.3   | 2022-08-26 | [16017](https://github.com/airbytehq/airbyte/pull/16017) | Add credit block id to ledger entries                                                                                                                                 |
| 0.1.2   | 2022-04-20 | [11528](https://github.com/airbytehq/airbyte/pull/11528) | Add cost basis to ledger entries, update expiration date, sync only committed entries                                                                                 |
| 0.1.1   | 2022-03-03 | [10839](https://github.com/airbytehq/airbyte/pull/10839) | Support ledger entries with numeric properties + schema fixes                                                                                                         |
| 0.1.0   | 2022-02-01 |                                                          | New Source: Orb                                                                                                                                                       |
| :---    | :---       | :---                                                     | :---                                                                                                                                                                  |

</details>
