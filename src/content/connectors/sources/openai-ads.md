---
generated_record: true
connector_name: OpenAI Ads
connector_type: source
connector_slug: openai-ads
connector_directory: source-openai-ads
definition_id: a152c0b0-6c5d-43d6-a74c-72df24dae70e
version: 0.1.9
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/openai-ads
logo: /images/connectors/sources/openai-ads.svg
logo_source_path: airbyte-integrations/connectors/source-openai-ads/icon.svg
logo_sha256: 7729289c4de3d9370384df04509e89b84b43b6f1b3b4dd5002c312fb31aad2b1
original_metadata_path: airbyte-integrations/connectors/source-openai-ads/metadata.yaml
original_metadata_sha256: 5b43cea5bbf9580dd7b60622a239d615295742856491799bd3e37c5a298e2b6d
original_document_path: docs/integrations/sources/openai-ads.md
original_document_sha256: e368eb4ab968dfde607bbabd339e98ed1bd452e7fd2370a99c69b71729fdc4dd
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a1da58e5a405ba65af071f2b505a69bccb176c2bce9f3898de60f548c995d7c8
rewritten_at: 2026-11-12T13:49:59.744015+00:00
---

# OpenAI Ads

Set up the OpenAI Ads source connector and find its reference information on this page.

## Prerequisites

- An [OpenAI Ads](https://ads.openai.com/) advertiser account
- An Advertiser API key for that account

## Setup

### 1. Create an API key

1. Log in to [Ads Manager](https://ads.openai.com/) as a user with access to the ad account.
2. Open the [**Settings**](https://ads.openai.com/settings) page and create an Advertiser API key.
3. Copy the key. Each key applies to one ad account. To replicate several accounts, create one key and set up one source for each account.

The `spend_limit_windows` stream requires an ad account with postpaid invoice billing. Its API key must have permission to manage billing for that account. See [Account spending limits](https://developers.openai.com/ads/api-reference/ad-account). If the API returns 403, the stream returns no records and the sync continues. The sync log shows the API's message.

The `conversion_pixels` stream requires pixel management to be enabled for the ad account. Otherwise, the stream returns no records and the sync continues.

For more information, see [OpenAI's quickstart](https://developers.openai.com/ads/api-quickstart).

### 2. Set up OpenAI Ads in Airbyte

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. On the Set up the source page, select **OpenAI Ads** from the Source type dropdown.
4. Enter a name for the OpenAI Ads connector.
5. Enter the **API Key**.
6. (Optional) Enter the **Start Date** in YYYY-MM-DD format, using the ad account's time zone. Data before this date won't be replicated. The default is 2026-02-01, when ads launched in ChatGPT. No data exists before that date. OpenAI retains a limited report history, so older days may no longer be available. See [Report Tables](#report-tables).
7. (Optional) Enter the **End Date** in YYYY-MM-DD format, using the ad account's time zone. Data after this date won't be replicated. OpenAI rejects report requests ending in the future. If left empty, report streams sync through the current date in UTC-12. The same applies if you enter a date later than the current date in UTC-12. The newest day in the account's time zone may arrive one day late. A later sync retrieves it.
8. (Optional) Enter the **Lookback Window** in days, from 0 to 90. The default is 32 days. This covers OpenAI's 30-day click attribution window and 2 processing days. OpenAI needs at least one day to process conversions. See [Lookback window](#lookback-window).
9. (Optional) Enter the **Number of concurrent workers**, from 1 to 20. The default is 3.
10. Click **Set up source**.

#### Airbyte Open Source

1. Open the Airbyte Open Source dashboard.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. On the Set up the source page, select **OpenAI Ads** from the Source type dropdown.
4. Enter a name for the OpenAI Ads connector.
5. Complete the fields described in the Airbyte Cloud section.
6. Click **Set up source**.

## Supported sync modes

The OpenAI Ads source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | Yes        |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

### Main tables

| Stream                                                                                        | Primary key | Sync modes   | Notes                                                                             |
| :-------------------------------------------------------------------------------------------- | :---------- | :----------- | :-------------------------------------------------------------------------------- |
| [ad_account](https://developers.openai.com/ads/api-reference/ad-account)                      | id          | Full Refresh | The ad account the key belongs to                                                 |
| [campaigns](https://developers.openai.com/ads/api-reference/campaigns)                        | id          | Full Refresh |                                                                                   |
| [ad_groups](https://developers.openai.com/ads/api-reference/ad-groups)                        | id          | Full Refresh | Listed per campaign, `campaign_id` added to each record                           |
| [ads](https://developers.openai.com/ads/api-reference/ads)                                    | id          | Full Refresh | Listed per ad group, `ad_group_id` added to each record                           |
| [conversion_event_settings](https://developers.openai.com/ads/api-reference/conversion-setup) | id          | Full Refresh | Conversion definitions of the account                                             |
| [conversion_pixels](https://developers.openai.com/ads/api-reference/conversion-setup)         | id          | Full Refresh | Conversion data sources referenced by conversion_event_settings                   |
| [custom_audiences](https://developers.openai.com/ads/custom-audiences)                        | id          | Full Refresh | Custom audiences of the account                                                   |
| [spend_limit_windows](https://developers.openai.com/ads/api-reference/ad-account)             | window_id   | Full Refresh | Date range spend limits. Postpaid invoice billing and billing permission required |

### Report tables

All report tables use the [insights](https://developers.openai.com/ads/api-reference/insights) endpoint, with daily granularity in the account time zone. Each row represents one entity for one day. Field names match the API's response keys.

| Stream                        | Primary key                                          | Sync modes                | Level and breakdown                         |
| :---------------------------- | :--------------------------------------------------- | :------------------------ | :------------------------------------------ |
| ad_account_insights           | ad_account_id, readable_time                         | Full Refresh, Incremental | Ad account                                  |
| campaign_insights             | campaign_id, readable_time                           | Full Refresh, Incremental | Campaign                                    |
| ad_group_insights             | ad_group_id, readable_time                           | Full Refresh, Incremental | Ad group                                    |
| ad_insights                   | ad_id, readable_time                                 | Full Refresh, Incremental | Ad                                          |
| campaign_insights_by_country  | campaign_id, country_name, readable_time             | Full Refresh, Incremental | Campaign by country                         |
| campaign_insights_by_device   | campaign_id, device_type, readable_time              | Full Refresh, Incremental | Campaign by device type                     |
| campaign_insights_by_platform | campaign_id, platform, readable_time                 | Full Refresh, Incremental | Campaign by platform                        |
| campaign_insights_by_product  | campaign_id, product_feed_id, item_id, readable_time | Full Refresh, Incremental | Campaign by product feed item               |
| campaign_conversions          | entity_id, date                                      | Full Refresh, Incremental | Attributed conversions per campaign and day |
| ad_group_conversions          | entity_id, date                                      | Full Refresh, Incremental | Attributed conversions per ad group and day |
| ad_conversions                | entity_id, date                                      | Full Refresh, Incremental | Attributed conversions per ad and day       |

Each insights stream requests every attribute field the API allows at its level. It also requests fields for its entity and every level above it. Account attributes include id, name, url and budgets. Campaign attributes include id, name, description, status, start and end time, and budgets. Ad group attributes include id, name, description and status. Ad attributes include id, name, title, copy, link, status and review status. Attributes that aren't set for an entity are omitted from its row. The metrics are `impressions`, `clicks`, `spend`, `ctr`, `cpc` and `cpm`. Their names are consistent across every level and segment. The API doesn't return days when an entity had no impressions. Within OpenAI's retention period, missing days therefore mean zero delivery. OpenAI retains the latest 365 days for daily insights and about 30 days for `campaign_insights_by_product`. See [Historical availability](https://developers.openai.com/ads/reporting). The connector can't read older days, regardless of the Start Date. A refresh or Full Refresh | Overwrite sync therefore keeps only data that OpenAI still retains. The record keeps the API's own row `id`, but doesn't use it as the primary key. It contains a query plan token that changes with the requested fields.

Conversion streams use the [conversions insights](https://developers.openai.com/ads/api-reference/insights) endpoint. They return `conversions`, `click_through_conversions`, `view_through_conversions`, `order_created_attributed_sales` and `order_created_attributed_sales_currency` for each entity (`entity_id`) and `date`. They cover campaign, ad group and ad levels. Unlike the insights endpoint, this endpoint returns every entity for every day in the requested range. It includes zero values and days before the entity was created. The connector keeps these rows as delivered. Each entity therefore has a complete daily series from the start date. Set the Start Date to when the account began advertising to avoid rows before that date. You can remove rows before each entity's creation downstream. Use `created_at` from the `campaigns`, `ad_groups` and `ads` streams.

## Lookback window

OpenAI credits conversions to the ad click or view that caused them throughout the report's attribution window. A past day's conversions can therefore change after that day. The connector doesn't set attribution parameters in its requests. OpenAI applies its [defaults](https://developers.openai.com/ads/reporting#understand-attribution): a 30-day click window and a 1-day view window. OpenAI also needs at least one day to process conversions. Spend may be finalised later than impressions and clicks. See [Data Freshness & Retention](https://developers.openai.com/ads/reporting#data-freshness--retention). During every sync, incremental report streams reread data within the lookback window and update those rows. The default 32-day window covers the 30-day click window and 2 processing days. Use the **Incremental | Append + Deduped** sync mode so updated rows replace earlier versions. Reduce the window only when syncing delivery metrics without conversions and you want fewer requests.

## IP allow list

If Airbyte Cloud access is restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Performance

The OpenAI Ads API allows 600 requests per minute for each endpoint and 1,200 requests per minute overall. OpenAI applies these limits per ad account and IP address. The connector keeps its requests below 600 per minute. It runs streams using the configured number of workers. It retries 429 and 5xx responses with exponential backoff. When available, it waits for the period specified in the `Retry-After` header.

Insights use 14 day request slices, with up to 2,000 rows per page. Cursor pagination handles additional rows. The conversions endpoint has no pagination cursor. It rejects requests when the response would exceed 2,000 rows. The connector therefore requests one entity for one 14 day slice at a time. Each request returns at most 14 rows. This makes conversion streams the connector's most request-intensive component. Each incremental sync makes about three requests for every campaign, ad group and ad. A 32 day lookback covers three 14 day slices. The first sync makes one request per entity for every 14 days between the start and end dates. An account with 5,000 ads needs about 15,000 requests per incremental sync for `ad_conversions` alone. This takes about 25 minutes at the rate limit and writes one row per ad per day. If that's too much, deselect `ad_conversions` and `ad_group_conversions`, then keep `campaign_conversions`. It needs three requests per campaign.

Amounts on insights rows are in the account currency. These include `spend`, `cpc`, `cpm` and budget columns such as `campaign_budget_daily`. Fields ending in `_micros` on entity and spend limit streams use micros. One unit of currency equals 1,000,000 micros. An `ad_account_budget_lifetime` value of 1,000,000,000 means no lifetime limit is set.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                                                        |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.1.9 | 2026-11-10 | [91652](https://github.com/airbytehq/airbyte/pull/91652) | Update dependencies |
| 0.1.8 | 2026-11-03 | [90660](https://github.com/airbytehq/airbyte/pull/90660) | Update dependencies |
| 0.1.7 | 2026-10-27 | [90026](https://github.com/airbytehq/airbyte/pull/90026) | Update dependencies |
| 0.1.6 | 2026-10-21 | [88396](https://github.com/airbytehq/airbyte/pull/88396) | Declare the documented `custom_audiences` and `ad_account` name fields, and type nested landing page, bid multiplier, product set filter, and conversion event campaign fields |
| 0.1.5 | 2026-10-21 | [88394](https://github.com/airbytehq/airbyte/pull/88394) | Skip `conversion_pixels` when pixel management is not enabled, report rate limiting, honor `Retry-After`, and correct the `spend_limit_windows` 403 message |
| 0.1.4 | 2026-10-21 | [88392](https://github.com/airbytehq/airbyte/pull/88392) | End report date ranges at the current date in UTC-12 so requests never end in the future, and raise the default lookback window to 32 days |
| 0.1.3 | 2026-10-20 | [89337](https://github.com/airbytehq/airbyte/pull/89337) | Update dependencies |
| 0.1.2 | 2026-10-13 | [88750](https://github.com/airbytehq/airbyte/pull/88750) | Update dependencies |
| 0.1.1 | 2026-10-09 | [88389](https://github.com/airbytehq/airbyte/pull/88389) | Add mocked unit tests and fix README symlink, test config end date, and release date |
| 0.1.0 | 2026-10-08 | [86351](https://github.com/airbytehq/airbyte/pull/86351) | Initial release by [@alexgreen496](https://github.com/alexgreen496) |

</details>
