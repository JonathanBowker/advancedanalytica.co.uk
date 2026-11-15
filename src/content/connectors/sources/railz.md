---
generated_record: true
connector_name: Railz
connector_type: source
connector_slug: railz
connector_directory: source-railz
definition_id: 9b6cc0c0-da81-4103-bbfd-5279e18a849a
version: 0.2.14
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/railz
logo: /images/connectors/sources/railz.svg
logo_source_path: airbyte-integrations/connectors/source-railz/icon.svg
logo_sha256: 7e313b623007e44e3742394029a385a0ee0f4568ee26bca58eade0daa4fad2e3
original_metadata_path: airbyte-integrations/connectors/source-railz/metadata.yaml
original_metadata_sha256: b57dd391af6c0eb8cf677049d2596caba2f15972c4e5387aa75ed69b1148da00
original_document_path: docs/integrations/sources/railz.md
original_document_sha256: b1d4125bbdc90400a298fb9813954947044d66c540cb0a54781fe181f3574bd0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 6fbe6171036eb982e8844b8d17b3d3d07adbd1c1cb6d520c6af80d40c4b5119b
rewritten_at: 2026-11-12T13:52:45.373319+00:00
---

# Railz

Use this source to sync data for the [Railz API](https://docs.railz.ai/).
This guide shows you how to set up the Railz source connector.

## Prerequisites

- A Railz account with permission to access data from the accounts you want to sync.
- Railz Client ID and Secret key

## Setup guide

### Step 1: Set up Railz

Generate an API key [on the dashboard](https://dashboard.railz.ai/developers/api-keys), then copy its client_id and secret_key.

### Step 2: Set up the source connector in Airbyte

<!-- env:cloud -->

**For Airbyte Cloud:**

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account;
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ new source**;
3. On the source setup page, select **Railz** from the Source type dropdown. Enter a name for this connector;
4. Enter `Client ID (client_id)`;
5. Enter `Secret key (secret_key)`;
6. Enter `Start date` (optional);
7. Click `Set up source`.
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

1. Open your local Airbyte page;
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ new source**;
3. On the source setup page, select **Railz** from the Source type dropdown. Enter a name for this connector;
4. Enter `Client ID (client_id)`;
5. Enter `Secret key (secret_key)`;
6. Enter `Start date`;
7. Click `Set up source`.
<!-- /env:oss -->

## Supported sync modes

Railz supports full refresh and incremental sync.

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |

## Supported streams

This source provides several output streams:

- [Businesses](https://docs.railz.ai/reference/get-businesses)
- [Connections](https://docs.railz.ai/reference/getconnections)
- [Customers](https://docs.railz.ai/reference/getcustomers)
- [Accounts](https://docs.railz.ai/reference/getaccounts)
- [Inventory](https://docs.railz.ai/reference/getinventory)
- [Tax Rates](https://docs.railz.ai/reference/gettaxrates)
- [Tracking Categories](https://docs.railz.ai/reference/get-trackingcategories)
- [Vendors](https://docs.railz.ai/reference/getvendors)
- [Bank Accounts](https://docs.railz.ai/reference/get-bankaccounts)
- [Accounting Transactions](https://docs.railz.ai/reference/get-accountingtransactions) \(Incremental sync\)
- [Bank Transfers](https://docs.railz.ai/reference/get-banktransfers) \(Incremental sync\)
- [Bills](https://docs.railz.ai/reference/getbills) \(Incremental sync\)
- [Bills Credit Notes](https://docs.railz.ai/reference/bill-creditnotes) \(Incremental sync\)
- [Bills Payments](https://docs.railz.ai/reference/getbillspayments) \(Incremental sync\)
- [Deposits](https://docs.railz.ai/reference/get-deposits) \(Incremental sync\)
- [Estimates](https://docs.railz.ai/reference/get-estimates) \(Incremental sync\)
- [Invoices](https://docs.railz.ai/reference/getinvoices) \(Incremental sync\)
- [Invoices Credit Notes](https://docs.railz.ai/reference/get-invoice-creditnotes) \(Incremental sync\)
- [Invoices Payments](https://docs.railz.ai/reference/getinvoicespayments) \(Incremental sync\)
- [Journal Entries](https://docs.railz.ai/reference/get-journalentries) \(Incremental sync\)
- [Purchase Orders](https://docs.railz.ai/reference/get-purchaseorder) \(Incremental sync\)
- [Refunds](https://docs.railz.ai/reference/get-refund) \(Incremental sync\)
- [Commerce Disputes](https://docs.railz.ai/reference/dispute) \(Incremental sync\)
- [Commerce Orders](https://docs.railz.ai/reference/order) \(Incremental sync\)
- [Commerce Products](https://docs.railz.ai/reference/product) \(Incremental sync\)
- [Commerce Transactions](https://docs.railz.ai/reference/transactions) \(Incremental sync\)

If you'd like Airbyte to support more endpoints, please [create an issue.](https://github.com/airbytehq/airbyte/issues/new/choose)

### Performance considerations

Under normal usage, the Railz connector should handle Railz API limitations gracefully. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if rate limit issues aren't retried successfully.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject           |
| :------ | :--------- | :------------------------------------------------------- | :---------------- |
| 0.2.14 | 2026-11-09 | [91414](https://github.com/airbytehq/airbyte/pull/91414) | Upgrade to source-declarative-manifest 7.47.0 |
| 0.2.13 | 2026-10-13 | [78922](https://github.com/airbytehq/airbyte/pull/78922) | Update dependencies |
| 0.2.12 | 2026-10-07 | [88276](https://github.com/airbytehq/airbyte/pull/88276) | Fix all substreams failing with `StreamSlice object has no attribute 'businessName'` and incremental record filter dropping every record (`stream_interval['start_date']` -> `start_time`); honor `Retry-After` on 429 responses with up to 10 retries |
| 0.2.11 | 2025-05-24 | [60560](https://github.com/airbytehq/airbyte/pull/60560) | Update dependencies |
| 0.2.10 | 2025-05-10 | [60145](https://github.com/airbytehq/airbyte/pull/60145) | Update dependencies |
| 0.2.9 | 2025-05-03 | [59502](https://github.com/airbytehq/airbyte/pull/59502) | Update dependencies |
| 0.2.8 | 2025-04-27 | [59087](https://github.com/airbytehq/airbyte/pull/59087) | Update dependencies |
| 0.2.7 | 2025-04-19 | [58477](https://github.com/airbytehq/airbyte/pull/58477) | Update dependencies |
| 0.2.6 | 2025-04-12 | [57878](https://github.com/airbytehq/airbyte/pull/57878) | Update dependencies |
| 0.2.5 | 2025-04-05 | [57324](https://github.com/airbytehq/airbyte/pull/57324) | Update dependencies |
| 0.2.4 | 2025-03-29 | [56792](https://github.com/airbytehq/airbyte/pull/56792) | Update dependencies |
| 0.2.3 | 2025-03-22 | [56177](https://github.com/airbytehq/airbyte/pull/56177) | Update dependencies |
| 0.2.2 | 2025-03-08 | [53971](https://github.com/airbytehq/airbyte/pull/53971) | Update dependencies |
| 0.2.1 | 2025-02-24 | [54164](https://github.com/airbytehq/airbyte/pull/54164) | Remove stream_state interpolation from record filter |
| 0.2.0 | 2025-02-05 | [47244](https://github.com/airbytehq/airbyte/pull/47244) | Migrate to manifest only format |
| 0.1.26 | 2025-02-01 | [52978](https://github.com/airbytehq/airbyte/pull/52978) | Update dependencies |
| 0.1.25 | 2025-01-25 | [52519](https://github.com/airbytehq/airbyte/pull/52519) | Update dependencies |
| 0.1.24 | 2025-01-18 | [51928](https://github.com/airbytehq/airbyte/pull/51928) | Update dependencies |
| 0.1.23 | 2025-01-11 | [51318](https://github.com/airbytehq/airbyte/pull/51318) | Update dependencies |
| 0.1.22 | 2025-01-04 | [50926](https://github.com/airbytehq/airbyte/pull/50926) | Update dependencies |
| 0.1.21 | 2024-12-28 | [50699](https://github.com/airbytehq/airbyte/pull/50699) | Update dependencies |
| 0.1.20 | 2024-12-21 | [50266](https://github.com/airbytehq/airbyte/pull/50266) | Update dependencies |
| 0.1.19 | 2024-12-14 | [49067](https://github.com/airbytehq/airbyte/pull/49067) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.18 | 2024-10-28 | [47114](https://github.com/airbytehq/airbyte/pull/47114) | Update dependencies |
| 0.1.17 | 2024-10-12 | [46786](https://github.com/airbytehq/airbyte/pull/46786) | Update dependencies |
| 0.1.16 | 2024-10-05 | [46462](https://github.com/airbytehq/airbyte/pull/46462) | Update dependencies |
| 0.1.15 | 2024-09-28 | [46182](https://github.com/airbytehq/airbyte/pull/46182) | Update dependencies |
| 0.1.14 | 2024-09-21 | [45811](https://github.com/airbytehq/airbyte/pull/45811) | Update dependencies |
| 0.1.13 | 2024-09-14 | [45576](https://github.com/airbytehq/airbyte/pull/45576) | Update dependencies |
| 0.1.12 | 2024-09-07 | [45317](https://github.com/airbytehq/airbyte/pull/45317) | Update dependencies |
| 0.1.11 | 2024-08-31 | [45036](https://github.com/airbytehq/airbyte/pull/45036) | Update dependencies |
| 0.1.10 | 2024-08-24 | [44649](https://github.com/airbytehq/airbyte/pull/44649) | Update dependencies |
| 0.1.9 | 2024-08-17 | [44206](https://github.com/airbytehq/airbyte/pull/44206) | Update dependencies |
| 0.1.8 | 2024-08-12 | [43801](https://github.com/airbytehq/airbyte/pull/43801) | Update dependencies |
| 0.1.7 | 2024-08-10 | [43541](https://github.com/airbytehq/airbyte/pull/43541) | Update dependencies |
| 0.1.6 | 2024-08-03 | [43288](https://github.com/airbytehq/airbyte/pull/43288) | Update dependencies |
| 0.1.5 | 2024-07-27 | [42674](https://github.com/airbytehq/airbyte/pull/42674) | Update dependencies |
| 0.1.4 | 2024-07-20 | [40029](https://github.com/airbytehq/airbyte/pull/40029) | Update dependencies |
| 0.1.3 | 2024-07-19 | [42125](https://github.com/airbytehq/airbyte/pull/42125) | Fix Python MRO bug |
| 0.1.2 | 2024-05-21 | [38545](https://github.com/airbytehq/airbyte/pull/38545) | [autopull] base image + poetry + up_to_date |
| 0.1.1 | 2023-02-16 | [20960](https://github.com/airbytehq/airbyte/pull/20960) | New Source: Railz |

</details>
