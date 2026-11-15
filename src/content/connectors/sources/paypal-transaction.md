---
generated_record: true
connector_name: Paypal Transaction
connector_type: source
connector_slug: paypal-transaction
connector_directory: source-paypal-transaction
definition_id: d913b0f2-cc51-4e55-a44c-8ba1697b9239
version: 2.6.61
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/paypal-transaction
logo: /images/connectors/sources/paypal-transaction.svg
logo_source_path: airbyte-integrations/connectors/source-paypal-transaction/icon.svg
logo_sha256: b369c00836bef54d298c5b7d365cd47f967d563b27041d5f3bfafe489d7c8879
original_metadata_path: airbyte-integrations/connectors/source-paypal-transaction/metadata.yaml
original_metadata_sha256: 3805efbfeec3cb46defcc4a7ff41296a04eb0628c59d7c47ab92b550e26d173d
original_document_path: docs/integrations/sources/paypal-transaction.md
original_document_sha256: ad614106463409d30f79b12150d691b515bf8a803d736c9b1601064a1818abc1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 713905addde4549ceb2d1f72bb2b6f51e2fc62540ca3ee2c0559beb641c2a7f8
rewritten_at: 2026-11-12T13:51:25.568605+00:00
---

# Paypal

Set up the Paypal source connector using this guide and reference information.

This connector authenticates requests using [PayPal APIs](https://developer.paypal.com/api/rest/authentication/) OAuth 2.0 access token.

## Prerequisites

You need a Paypal account, which you can get by following [these steps](https://developer.paypal.com/docs/platforms/get-started/).

The same page explains how to set up a Sandbox for testing before using the connector in production.

## Setup guide

### Step 1: Get your Paypal secrets

After creating your account, you can get your `Client ID` and `Secret`. You'll find them in your [Apps & Credentials page](https://developer.paypal.com/dashboard/applications/live).

### Step 2: Set up the Paypal Transaction connector in Airbyte

1. Log in to your Airbyte account.

   - For Cloud, [Log in here](https://cloud.airbyte.com/workspaces).

2. In the left navigation bar, select **Sources**.

   a. If you're creating your first source, enter **Paypal Transaction** in the search bar and select it.

   b. If you've configured sources, select **+new source** in the top-right corner. Enter **Paypal Transaction** in the search bar and select the connector.

3. Set your source name.
4. Enter your `Client ID`.
5. Enter your `Client secret`.
6. `Start Date`: Use the datepicker or manually enter a UTC date and time in the format `YYYY-MM-DDTHH:MM:SSZ`.
7. Switch the Sandbox toggle ON/Off. It's OFF by default, so the connector works only in production.
8. _(Optional) `Dispute Start Date Range`:_ Use the datepicker or manually enter a UTC date and time in the format `YYYY-MM-DDTHH:MM:SS.sssZ`.
   - If you don't add a date and sync `lists_disputes stream`, the connector retrieves data from the previous 180 days by default.
   - If you enter a datetime, you must include milliseconds.
   - This option works only for `lists_disputes stream`.

9. _(Optional) `Refresh Token`:_ You can manually enter a refresh token. The stream currently handles this automatically.
10. _(Optional) `Number of days per request`:_ Specify how many days the connector covers when requesting data from the Paypal API. A smaller retrieval window can help when you have a rate limit.
   - Paypal limits each request to 10K records. This option helps when weekly syncs contain more than 10K records.
   - The default value is 7.
   - The maximum value is 31 days.
11. Select **Set up source**.

:::info

By default, syncs use a seven-day slice period. PayPal caps each transaction search at 10K records. The `transactions` stream automatically retries rejected slices using smaller date ranges. The sync fails only if PayPal rejects a one-second date range. If a sync fails with `Result set size is greater than the maximum limit` or `RESULTSET_TOO_LARGE`:

- Reduce the slice period in your connection configuration's optional parameters.
- If a one-day slice isn't enough, shorten the scheduled sync window. This may help you avoid the 10K limit.

:::

## Supported sync modes

The PayPal Transaction source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | Yes        |
| Namespaces                | No         |

## Supported streams

This source can sync these core streams:

- [Transactions](https://developer.paypal.com/docs/api/transaction-search/v1/#transactions)
- [Balances](https://developer.paypal.com/docs/api/transaction-search/v1/#balances)
- [List Products](https://developer.paypal.com/docs/api/catalog-products/v1/#products_list)
- [Show Product Details](https://developer.paypal.com/docs/api/catalog-products/v1/#products_get)
- [List Disputes](https://developer.paypal.com/docs/api/customer-disputes/v1/#disputes_list)
- [Search Invoices](https://developer.paypal.com/docs/api/invoicing/v2/#invoices_search-invoices)
- [List Payments](https://developer.paypal.com/docs/api/payments/v1/#payment_list)

### Transactions stream

The table below lists this connector's configuration parameters, default values and available features.

| **Param/Feature**            | `Transactions`            |
| :--------------------------- | :------------------------ |
| `Start Date`                 | Timestamp with TZ (no ms) |
| `Dispute Start Date Range`   | NA                        |
| `Refresh token`              | Auto                      |
| `Number of days per request` | Max 31 , 7(D)             |
| `Pagination Strategy`        | Page Increment            |
| `Page size `                 | Max 500 (F)               |
| `Full Refresh`               | :white_check_mark:        |
| `Incremental`                | :white_check_mark: (D)    |

**D:** Default configured value

**F:** Fixed value. You can't configure it.

---

### Balances stream

The table below lists this connector's configuration parameters, default values and available features.

| **Param/Feature**            | `Balances`                |
| :--------------------------- | :------------------------ |
| `Start Date`                 | Timestamp with TZ (no ms) |
| `Dispute Start Date Range`   | NA                        |
| `Refresh token`              | Auto                      |
| `Number of days per request` | NA                        |
| `Pagination Strategy`        | NA                        |
| `Page size `                 | NA                        |
| `Full Refresh`               | :white_check_mark:        |
| `Incremental`                | :white_check_mark: (D)    |

**D:** Default configured value

**F:** Fixed value. You can't configure it.

---

### List Products stream

The table below lists this connector's configuration parameters, default values and available features.

| **Param/Feature**            | `List Products`        |
| :--------------------------- | :--------------------- |
| `Start Date`                 | NA                     |
| `Dispute Start Date Range`   | NA                     |
| `Refresh token`              | Auto                   |
| `Number of days per request` | NA                     |
| `Pagination Strategy`        | Page Increment         |
| `Page size `                 | Max 20 (F)             |
| `Full Refresh`               | :white_check_mark: (D) |
| `Incremental`                | :x:                    |

**D:** Default configured value

**F:** Fixed value. You can't configure it.

:::caution

The API limits data retrieval speed, so consider this when configuring your stream. Retrieving a +30K catalog can take 10 to 15 minutes in some cases.

:::

---

### Show Products stream

The table below lists this connector's configuration parameters, default values and available features.

| **Param/Feature**            | `Show Prod. Details`   |
| :--------------------------- | :--------------------- |
| `Start Date`                 | NA                     |
| `Dispute Start Date Range`   | NA                     |
| `Refresh token`              | Auto                   |
| `Number of days per request` | NA                     |
| `Pagination Strategy`        | NA                     |
| `Page size `                 | NA                     |
| `Full Refresh`               | :white_check_mark: (D) |
| `Incremental`                | :x:                    |

**D:** Default configured value

**F:** Fixed value. You can't configure it.

:::caution

The parent stream paginates 20 items at a time, the maximum allowed page size. Paypal API calls aren't concurrent, so sync time depends entirely on the server.
This stream can take considerable time to sync. Consider syncing it and its parent stream, `list_products`, at the end of the day.
Depending on the catalog size, the sync can take several hours.

:::

---

### List Disputes stream

The table below lists this connector's configuration parameters, default values and available features.

| **Param/Feature**            | `List Disputes`          |
| :--------------------------- | :----------------------- |
| `Start Date`                 | NA                       |
| `Dispute Start Date Range`   | Timestamp with TZ (w/ms) |
| `Refresh token`              | Auto                     |
| `Number of days per request` | Max 180 , 7(D)           |
| `Pagination Strategy`        | Page Token               |
| `Page size `                 | Max 50 (F)               |
| `Full Refresh`               | :white_check_mark:       |
| `Incremental`                | :white_check_mark: (D)   |

**D:** Default configured value

**F:** Fixed value. You can't configure it.

---

### Search Invoices stream

The table below lists this connector's configuration parameters, default values and available features.

| **Param/Feature**            | `Search Invoices`         |
| :--------------------------- | :------------------------ |
| `Start Date`                 | Timestamp with TZ (no ms) |
| `Dispute Start Date Range`   | NA                        |
| `Refresh token`              | Auto                      |
| `Number of days per request` | ND                        |
| `Pagination Strategy`        | Page Number               |
| `Page size `                 | Max 100 (F)               |
| `Full Refresh`               | :white_check_mark: (D)    |
| `Incremental`                | :x:                       |

**D:** Default configured value

**F:** Fixed value. You can't configure it.

**ND:** Not defined in the source.

:::info

The connector passes the configured `start_end` to the request body and uses `creation_date_range.start` and `creation_date_range.end`. See [Paypal Developer API documentation](https://developer.paypal.com/docs/api/invoicing/v2/#invoices_search-invoices) for more information.

:::

---

### List Payments stream

The table below lists this connector's configuration parameters, default values and available features.

| **Param/Feature**            | `List Payments`           |
| :--------------------------- | :------------------------ |
| `Start Date`                 | Timestamp with TZ (no ms) |
| `Dispute Start Date Range`   | NA                        |
| `Refresh token`              | Auto                      |
| `Number of days per request` | NA , 7(D)                 |
| `Pagination Strategy`        | Page Cursor               |
| `Page size `                 | Max 20 (F)                |
| `Full Refresh`               | :white_check_mark:        |
| `Incremental`                | :white_check_mark: (D)    |

**D:** Default configured value

**F:** Fixed value. You can't configure it.

---

## Performance considerations

- **Data Availability:** Executed transactions can take up to 3 hours to appear in the list transactions call.
- **Number of days per request:** The maximum supported date range is 31 days.
- **Historical Data:** You can't retrieve more than 3yrs of data for the `transactions` stream. For `dispute_start_date`, you can retrieve only 180 days of data. See the specifications for each stream.
- `records_per_request`: A single request supports up to 10K records due to an API server restriction.
- `page_size`: The number of records per page differs by stream. By default, `source-paypal-transaction` sets each stream's maximum allowed page size.
- `requests_per_minute`: The API server limits all endpoints to 50 requests per minute from each IP address.

## Data type map

| Integration Type | Airbyte Type |
| :--------------- | :----------- |
| `string`         | `string`     |
| `number`         | `number`     |
| `array`          | `array`      |
| `object`         | `object`     |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--------- | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| 2.6.61 | 2026-11-10 | [91676](https://github.com/airbytehq/airbyte/pull/91676) | Update dependencies |
| 2.6.60 | 2026-11-03 | [90673](https://github.com/airbytehq/airbyte/pull/90673) | Update dependencies |
| 2.6.59 | 2026-11-01 | [90328](https://github.com/airbytehq/airbyte/pull/90328) | Simplify error handling configuration with no change to retry, backoff, or window-splitting behavior |
| 2.6.58 | 2026-10-27 | [89998](https://github.com/airbytehq/airbyte/pull/89998) | Update dependencies |
| 2.6.57 | 2026-10-20 | [89356](https://github.com/airbytehq/airbyte/pull/89356) | Update dependencies |
| 2.6.56 | 2026-10-14 | [85249](https://github.com/airbytehq/airbyte/pull/85249) | Wait 100 seconds before each retry of a failed `transactions` request, such as on HTTP 429 or 5xx, as the other streams already do |
| 2.6.55 | 2026-10-13 | [88730](https://github.com/airbytehq/airbyte/pull/88730) | Update dependencies |
| 2.6.54 | 2026-10-06 | [87974](https://github.com/airbytehq/airbyte/pull/87974) | Update dependencies |
| 2.6.53 | 2026-09-29 | [87441](https://github.com/airbytehq/airbyte/pull/87441) | Keep the `list_disputes` start date inside PayPal's 180-day window to fix `INVALID_DATE_RANGE` 400 errors on first syncs |
| 2.6.52 | 2026-09-29 | [86920](https://github.com/airbytehq/airbyte/pull/86920) | feat(source-paypal-transaction): adopt declarative request_window_red… |
| 2.6.51 | 2026-09-29 | [87311](https://github.com/airbytehq/airbyte/pull/87311) | Update dependencies |
| 2.6.51 | 2026-09-22 | [86920](https://github.com/airbytehq/airbyte/pull/86920) | Replace the `transactions` stream's custom `DateWindowSplittingRetriever`/`ResultSetTooLargeErrorHandler` components with the CDK's declarative `request_window_splitting` feature; the stream's failure type when a window is rejected even at its smallest split changes from `config_error` to `transient_error` |
| 2.6.50 | 2026-09-22 | [86765](https://github.com/airbytehq/airbyte/pull/86765) | Update dependencies |
| 2.6.49 | 2026-09-15 | [86180](https://github.com/airbytehq/airbyte/pull/86180) | Update dependencies |
| 2.6.48 | 2026-09-08 | [84916](https://github.com/airbytehq/airbyte/pull/84916) | Retry oversized `transactions` date slices as smaller date ranges instead of failing the sync on the first `RESULTSET_TOO_LARGE` response |
| 2.6.47 | 2026-09-08 | [85594](https://github.com/airbytehq/airbyte/pull/85594) | Update dependencies |
| 2.6.46 | 2026-08-26 | [79676](https://github.com/airbytehq/airbyte/pull/79676) | Fix `transaction_id` primary key emitted as null for IDs resembling scientific notation |
| 2.6.45 | 2026-08-18 | [84690](https://github.com/airbytehq/airbyte/pull/84690) | Update dependencies |
| 2.6.44 | 2026-08-11 | [84075](https://github.com/airbytehq/airbyte/pull/84075) | Update dependencies |
| 2.6.43 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 2.6.42 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 2.6.40 — 2.6.41 is built on SDM 7.23.7, which breaks bundled custom components |
| 2.6.41 | 2026-07-28 | [83052](https://github.com/airbytehq/airbyte/pull/83052) | Update dependencies |
| 2.6.40 | 2026-07-21 | [82533](https://github.com/airbytehq/airbyte/pull/82533) | Update dependencies |
| 2.6.39 | 2026-07-14 | [81962](https://github.com/airbytehq/airbyte/pull/81962) | Update dependencies |
| 2.6.38 | 2026-06-30 | [81175](https://github.com/airbytehq/airbyte/pull/81175) | Update dependencies |
| 2.6.37 | 2026-06-23 | [80610](https://github.com/airbytehq/airbyte/pull/80610) | Update dependencies |
| 2.6.36 | 2026-06-16 | [79986](https://github.com/airbytehq/airbyte/pull/79986) | Update dependencies |
| 2.6.35 | 2026-06-09 | [79456](https://github.com/airbytehq/airbyte/pull/79456) | Update dependencies |
| 2.6.34 | 2026-06-02 | [78907](https://github.com/airbytehq/airbyte/pull/78907) | Update dependencies |
| 2.6.33 | 2026-04-28 | [77335](https://github.com/airbytehq/airbyte/pull/77335) | Update dependencies |
| 2.6.32 | 2026-04-21 | [76710](https://github.com/airbytehq/airbyte/pull/76710) | Update dependencies |
| 2.6.31 | 2026-04-07 | [76135](https://github.com/airbytehq/airbyte/pull/76135) | Fix undefined `security_context` variable in payments generator utility script |
| 2.6.30 | 2026-03-31 | [75850](https://github.com/airbytehq/airbyte/pull/75850) | Update dependencies |
| 2.6.29 | 2026-03-24 | [75396](https://github.com/airbytehq/airbyte/pull/75396) | Update dependencies |
| 2.6.28 | 2026-03-10 | [74484](https://github.com/airbytehq/airbyte/pull/74484) | Update dependencies |
| 2.6.27 | 2026-03-03 | [73875](https://github.com/airbytehq/airbyte/pull/73875) | Update dependencies |
| 2.6.26 | 2026-02-26 | [74027](https://github.com/airbytehq/airbyte/pull/74027) | Fix INVALID_DATE_TIME_FORMAT error on disputes stream by using 3-digit milliseconds |
| 2.6.25 | 2026-02-17 | [73574](https://github.com/airbytehq/airbyte/pull/73574) | Update dependencies |
| 2.6.24 | 2026-02-10 | [73171](https://github.com/airbytehq/airbyte/pull/73171) | Update dependencies |
| 2.6.23 | 2026-02-03 | [72637](https://github.com/airbytehq/airbyte/pull/72637) | Update dependencies |
| 2.6.22 | 2026-01-22 | [70967](https://github.com/airbytehq/airbyte/pull/70967) | Update HTTP response action for 400 error transactions from IGNORE to FAIL |
| 2.6.21 | 2026-01-20 | [71652](https://github.com/airbytehq/airbyte/pull/71652) | Update dependencies |
| 2.6.20 | 2025-12-18 | [70505](https://github.com/airbytehq/airbyte/pull/70505) | Update dependencies |
| 2.6.19 | 2025-11-25 | [69974](https://github.com/airbytehq/airbyte/pull/69974) | Update dependencies |
| 2.6.18 | 2025-11-18 | [69668](https://github.com/airbytehq/airbyte/pull/69668) | Update dependencies |
| 2.6.17 | 2025-10-29 | [69044](https://github.com/airbytehq/airbyte/pull/69044) | Update dependencies |
| 2.6.16 | 2025-10-21 | [68286](https://github.com/airbytehq/airbyte/pull/68286) | Update dependencies |
| 2.6.15 | 2025-10-14 | [67760](https://github.com/airbytehq/airbyte/pull/67760) | Update dependencies |
| 2.6.14 | 2025-10-07 | [67348](https://github.com/airbytehq/airbyte/pull/67348) | Update dependencies |
| 2.6.13 | 2025-09-30 | [66378](https://github.com/airbytehq/airbyte/pull/66378) | Update dependencies |
| 2.6.12 | 2025-09-09 | [65835](https://github.com/airbytehq/airbyte/pull/65835) | Update dependencies |
| 2.6.11 | 2025-08-23 | [65171](https://github.com/airbytehq/airbyte/pull/65171) | Update dependencies |
| 2.6.10 | 2025-08-09 | [64716](https://github.com/airbytehq/airbyte/pull/64716) | Update dependencies |
| 2.6.9 | 2025-08-02 | [64258](https://github.com/airbytehq/airbyte/pull/64258) | Update dependencies |
| 2.6.8 | 2025-07-26 | [63821](https://github.com/airbytehq/airbyte/pull/63821) | Update dependencies |
| 2.6.7 | 2025-07-19 | [63449](https://github.com/airbytehq/airbyte/pull/63449) | Update dependencies |
| 2.6.6 | 2025-07-12 | [63255](https://github.com/airbytehq/airbyte/pull/63255) | Update dependencies |
| 2.6.5 | 2025-07-05 | [62625](https://github.com/airbytehq/airbyte/pull/62625) | Update dependencies |
| 2.6.4 | 2025-06-28 | [62390](https://github.com/airbytehq/airbyte/pull/62390) | Update dependencies |
| 2.6.3 | 2025-06-21 | [61932](https://github.com/airbytehq/airbyte/pull/61932) | Update dependencies |
| 2.6.2 | 2025-06-14 | [51848](https://github.com/airbytehq/airbyte/pull/51848) | Update dependencies |
| 2.6.1 | 2025-06-05 | [58674](https://github.com/airbytehq/airbyte/pull/58674) | Update CDK to fix complex datatype errors with interpolation |
| 2.6.0 | 2024-10-23 | [47282](https://github.com/airbytehq/airbyte/pull/47282) | Migrate to Manifest-only |
| 2.5.8 | 2025-01-11 | [43797](https://github.com/airbytehq/airbyte/pull/43797) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 2.5.7 | 2024-06-25 | [40269](https://github.com/airbytehq/airbyte/pull/40269) | Update dependencies |
| 2.5.6 | 2024-06-22 | [40110](https://github.com/airbytehq/airbyte/pull/40110) | Update dependencies |
| 2.5.5 | 2024-06-04 | [38983](https://github.com/airbytehq/airbyte/pull/38983) | [autopull] Upgrade base image to v1.2.1 |
| 2.5.4 | 2024-05-20 | [38265](https://github.com/airbytehq/airbyte/pull/38265) | Replace AirbyteLogger with logging.Logger |
| 2.5.3 | 2024-04-24 | [36654](https://github.com/airbytehq/airbyte/pull/36654) | Schema descriptions |
| 2.5.2 | 2024-04-19 | [37435](https://github.com/airbytehq/airbyte/pull/37435) | Updated `manifest.yaml` to use the latest CDK Manifest version to fix the Incremental STATE values |
| 2.5.1 | 2024-03-15 | [36165](https://github.com/airbytehq/airbyte/pull/36165) | Unpin CDK Version |
| 2.5.0 | 2024-03-15 | [36173](https://github.com/airbytehq/airbyte/pull/36173) | Extended `Disputes` stream schema with missing properties |
| 2.4.0 | 2024-02-20 | [35465](https://github.com/airbytehq/airbyte/pull/35465) | Per-error reporting and continue sync on stream failures |
| 2.3.0 | 2024-02-14 | [34510](https://github.com/airbytehq/airbyte/pull/34510) | Silver certified. New Streams Added |
| 2.2.2 | 2024-02-09 | [35075](https://github.com/airbytehq/airbyte/pull/35075) | Manage dependencies with Poetry. |
| 2.2.1 | 2024-01-11 | [34155](https://github.com/airbytehq/airbyte/pull/34155) | prepare for airbyte-lib |
| 2.2.0 | 2023-10-25 | [31852](https://github.com/airbytehq/airbyte/pull/31852) | The size of the time_window can be configured |
| 2.1.2 | 2023-10-23 | [31759](https://github.com/airbytehq/airbyte/pull/31759) | Keep transaction_id as a string and fetch data in 7-day batches |
| 2.1.1 | 2023-10-19 | [31599](https://github.com/airbytehq/airbyte/pull/31599) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 2.1.0 | 2023-08-14 | [29223](https://github.com/airbytehq/airbyte/pull/29223) | Migrate Python CDK to Low Code schema |
| 2.0.0 | 2023-07-05 | [27916](https://github.com/airbytehq/airbyte/pull/27916) | Update `Balances` schema |
| 1.0.0 | 2023-07-03 | [27968](https://github.com/airbytehq/airbyte/pull/27968) | mark `Client ID` and `Client Secret` as required fields |
| 0.1.13 | 2023-02-20 | [22916](https://github.com/airbytehq/airbyte/pull/22916) | Specified date formatting in specification |
| 0.1.12 | 2023-02-18 | [23211](https://github.com/airbytehq/airbyte/pull/23211) | Fix error handler |
| 0.1.11 | 2023-01-27 | [22019](https://github.com/airbytehq/airbyte/pull/22019) | Set `AvailabilityStrategy` for streams explicitly to `None` |
| 0.1.10 | 2022-09-04 | [17554](https://github.com/airbytehq/airbyte/pull/17554) | Made the spec and source config to be consistent |
| 0.1.9 | 2022-08-18 | [15741](https://github.com/airbytehq/airbyte/pull/15741) | Removed `OAuth2.0` option |
| 0.1.8 | 2022-07-25 | [15000](https://github.com/airbytehq/airbyte/pull/15000) | Added support of `OAuth2.0` authentication, fixed bug when normalization couldn't handle nested cursor field and primary key |
| 0.1.7 | 2022-07-18 | [14804](https://github.com/airbytehq/airbyte/pull/14804) | Added `RESULTSET_TOO_LARGE` error validation |
| 0.1.6 | 2022-06-10 | [13682](https://github.com/airbytehq/airbyte/pull/13682) | Updated paypal transaction schema |
| 0.1.5 | 2022-04-27 | [12335](https://github.com/airbytehq/airbyte/pull/12335) | Added fixtures to mock time.sleep for connectors that explicitly sleep |
| 0.1.4 | 2021-12-22 | [9034](https://github.com/airbytehq/airbyte/pull/9034) | Updated connector fields title/description |
| 0.1.3 | 2021-12-16 | [8580](https://github.com/airbytehq/airbyte/pull/8580) | Added more logs during `check connection` stage |
| 0.1.2 | 2021-11-08 | [7499](https://github.com/airbytehq/airbyte/pull/7499) | Removed base-python dependencies |
| 0.1.1 | 2021-08-03 | [5155](https://github.com/airbytehq/airbyte/pull/5155) | Fixed start_date_min limit |
| 0.1.0 | 2021-06-10 | [4240](https://github.com/airbytehq/airbyte/pull/4240) | PayPal Transaction Search API |

</details>
