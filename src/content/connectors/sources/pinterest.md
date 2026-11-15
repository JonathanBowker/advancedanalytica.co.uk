---
generated_record: true
connector_name: Pinterest
connector_type: source
connector_slug: pinterest
connector_directory: source-pinterest
definition_id: 5cb7e5fe-38c2-11ec-8d3d-0242ac130003
version: 2.4.3
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/pinterest
logo: /images/connectors/sources/pinterest.svg
logo_source_path: airbyte-integrations/connectors/source-pinterest/icon.svg
logo_sha256: ca7d87aed2ee861a0bed498e256757877b8583c5993671990a3c1190afcf67d6
original_metadata_path: airbyte-integrations/connectors/source-pinterest/metadata.yaml
original_metadata_sha256: b529f09e736de93ac0f436b87dce262109fdd169a5b5f01a92f429f6d3f1e696
original_document_path: docs/integrations/sources/pinterest.md
original_document_sha256: e3ff4836ed7691f887c78ffab8e4b8e7e20bfb85f13c93e19d8f327a56a9cdf6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fe1f9232271b171ab857f6f95e1858b94c227183c7ca48dc4da8a25c73403f6f
rewritten_at: 2026-11-12T13:51:58.834412+00:00
---

# Pinterest

Use this page to set up the Pinterest source connector and find reference information.

## Prerequisites

<!-- env:cloud -->

Pinterest doesn't let you configure permissions during OAuth authentication for Airbyte Cloud. It therefore requests these permissions during authentication:

- See all your advertising data, including ads, ad groups, campaigns, and more.
- See your public boards, including group boards you join.
- See your secret boards.
- See all your catalogue data.
- See your public Pins.
- See your secret Pins.
- See your user accounts and followers.

For more information about the scopes required for Pinterest OAuth, see [Pinterest API Scopes documentation](https://developers.pinterest.com/docs/getting-started/scopes/#Read%20scopes).

<!-- /env:cloud -->

<!-- env:oss -->

To set up the Pinterest source connector with Airbyte Open Source, you need your Pinterest [App ID and secret key](https://developers.pinterest.com/docs/getting-started/set-up-app/) and [refresh token](https://developers.pinterest.com/docs/getting-started/authentication/#Refreshing%20an%20access%20token).

<!-- /env:oss -->

Each connector stream requires specific Pinterest OAuth scopes:

- **Account analytics** (`user_account_analytics`): Requires `user_accounts:read`.
- **Boards, board sections, and board pins**: Requires `boards:read` and `pins:read`.
- **Ad accounts, campaigns, ad groups, ads, and their analytics**: Requires `ads:read`.
- **Catalogs, catalog feeds, and catalog product groups**: Requires `catalogs:read`.

Some streams may not return data if your Pinterest account has limited permissions. The connector validates your connection through the `user_account_analytics` stream.

This stream only requires the `user_accounts:read` scope, which is available to all authenticated Pinterest users.

### Pinner data access for newer apps

Pinterest may return `403 PINNER_DATA_ACCESS_DENIED` for the `board_sections`, `board_pins`, and `board_section_pins` streams in specific circumstances.

This applies if your Pinterest app was registered on or after September 14, 2026. It continues until Pinterest approves the app for pinner data access.

This can happen when the connector reads boards that don't belong to the account that authorised the app. For example, it can affect boards returned for a business ad account set in **Account ID**.

You don't need extra approval to read the authorising account's boards and Pins. Apps registered before that date aren't affected.

Contact your Pinterest account manager to request approval. For details, see [Pinterest changelog](https://developers.pinterest.com/docs/changelog/changelog/#pinner-data-access-denial-error).

## Set up the connector

<!-- env:cloud -->

**For Airbyte Cloud:**

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Pinterest** from the Source type dropdown.
4. Enter a name for the Pinterest connector.
5. The **OAuth2.0** authorisation method is selected by default. Click **Authenticate your Pinterest account**. Log in and authorise your Pinterest account.
6. (Optional) For **Start Date**, enter the date in YYYY-MM-DD format. The connector replicates data from this date onwards. If you don't enter a date, the connector uses each stream's maximum lookback period. Analytics streams can look back up to 90 days. Report streams can look back up to 913 days.
7. (Optional) Select one or more status values from the dropdown menu. Available values are `ACTIVE`, `PAUSED`, and `ARCHIVED`. For the ads, ad_groups, and campaigns streams, a status excludes records that don't match. If you don't specify a status, the source defaults to `ACTIVE` and `PAUSED`.
8. (Optional) Add custom reports if needed. See the corresponding section for more information.
9. (Optional) Enter an **Ad Account ID**. The source then retrieves data only for that specific Pinterest Ad Account.
10. (Optional) Set **Number of concurrent workers** to control the connector's parallel requests during a sync. The default is 2. Higher values make syncs faster but increase rate-limit pressure. Reduce this value if you encounter rate-limit errors.
11. Click **Set up source**.
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

1. Go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Pinterest** from the Source type dropdown.
4. Enter a name for the Pinterest connector.
5. The **OAuth2.0** authorisation method is selected by default. For **Client ID** and **Client Secret**, enter your Pinterest [App ID and secret key](https://developers.pinterest.com/docs/getting-started/set-up-app/). For **Refresh Token**, enter your Pinterest [Refresh Token](https://developers.pinterest.com/docs/getting-started/authentication/#Refreshing%20an%20access%20token).
6. (Optional) For **Start Date**, enter the date in YYYY-MM-DD format. The connector replicates data from this date onwards. If you don't enter a date, the connector uses each stream's maximum lookback period. Analytics streams can look back up to 90 days. Report streams can look back up to 913 days.
7. (Optional) Select one or more status values from the dropdown menu. Available values are `ACTIVE`, `PAUSED`, and `ARCHIVED`. For the ads, ad_groups, and campaigns streams, a status excludes records that don't match. If you don't specify a status, the source defaults to `ACTIVE` and `PAUSED`.
8. (Optional) Add custom reports if needed. See the corresponding section for more information.
9. (Optional) Enter an **Ad Account ID**. The source then retrieves data only for that specific Pinterest Ad Account.
10. (Optional) Set **Number of concurrent workers** to control the connector's parallel requests during a sync. The default is 2. Higher values make syncs faster but increase rate-limit pressure. Reduce this value if you encounter rate-limit errors.
11. Click **Set up source**.
<!-- /env:oss -->

### Attribution window

Use **Attribution Window** to control how many previous days the connector rereads during each incremental sync. This setting applies to report and analytics streams.

Pinterest updates past metrics while it continues attributing conversions. Match this setting to your reports' longest click, engagement, or view window to capture late updates.

The default is `0`, so the connector reads only new days. You can set it to no more than `60`.

The connector always respects a stream's own date limit when it's shorter than the lookback. Hourly custom reports can look back 2 days. Analytics streams can look back 89 days, and product item reports 91 days.

The connector writes reread days again. Use the **Append + Deduped** sync mode and choose a primary key in the connection to keep one row per day.

## Supported sync modes

The Pinterest source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

## Supported streams

- [Account analytics](https://developers.pinterest.com/docs/api/v5/#operation/user_account/analytics) \(Incremental\)
- [Boards](https://developers.pinterest.com/docs/api/v5/#operation/boards/list) \(Full refresh\)
- [Board sections](https://developers.pinterest.com/docs/api/v5/#operation/board_sections/list) \(Full refresh\)
- [Pins on board section](https://developers.pinterest.com/docs/api/v5/#operation/board_sections/list_pins) \(Full refresh\)
- [Pins on board](https://developers.pinterest.com/docs/api/v5/#operation/boards/list_pins) \(Full refresh\)
- [Ad accounts](https://developers.pinterest.com/docs/api/v5/#operation/ad_accounts/list) \(Full refresh\)
- [Ad account analytics](https://developers.pinterest.com/docs/api/v5/#operation/ad_account/analytics) \(Incremental\)
- [Campaigns](https://developers.pinterest.com/docs/api/v5/#operation/campaigns/list) \(Incremental\)
- [Campaign analytics](https://developers.pinterest.com/docs/api/v5/#operation/campaigns/analytics) \(Incremental\)
- [Campaign Analytics Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Campaign Targeting Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Ad Groups](https://developers.pinterest.com/docs/api/v5/#operation/ad_groups/list) \(Incremental\)
- [Ad Group Analytics](https://developers.pinterest.com/docs/api/v5/#operation/ad_groups/analytics) \(Incremental\)
- [Ad Group Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Ad Group Targeting Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Ads](https://developers.pinterest.com/docs/api/v5/#operation/ads/list) \(Incremental\)
- [Ad analytics](https://developers.pinterest.com/docs/api/v5/#operation/ads/analytics) \(Incremental\)
- [Catalogs](https://developers.pinterest.com/docs/api/v5/#operation/catalogs/list) \(Full refresh\)
- [Catalogs Feeds](https://developers.pinterest.com/docs/api/v5/#operation/feeds/list) \(Full refresh\)
- [Catalogs Product Groups](https://developers.pinterest.com/docs/api/v5/#operation/catalogs_product_groups/list) \(Full refresh\)
- [Audiences](https://developers.pinterest.com/docs/api/v5/#operation/audiences/list) \(Full refresh\)
- [Keywords](https://developers.pinterest.com/docs/api/v5/#operation/keywords/get) \(Full refresh\)
- [Conversion Tags](https://developers.pinterest.com/docs/api/v5/#operation/conversion_tags/list) \(Full refresh\)
- [Customer Lists](https://developers.pinterest.com/docs/api/v5/#tag/customer_lists) \(Full refresh\)
- [Advertiser Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Advertiser Targeting Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Pin Promotion Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Pin Promotion Targeting Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Product Group Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Product Group Targeting Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Product Item Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)
- [Keyword Report](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report) \(Incremental\)

## Custom reports

Create personalised analytics reports for your account with custom reports. Tailor each report to your needs by choosing these properties:

1. **Name**: Provides a unique identifier for the report.
2. **Level**: Sets the data aggregation level, with options including ADVERTISER, CAMPAIGN, and AD_GROUP. The default level is ADVERTISER.
3. **Granularity**: Sets the data granularity, such as TOTAL, DAY, or HOUR. The default is TOTAL, which aggregates metrics across the specified date range.
4. **Columns**: Identifies the data columns included in the report.
5. **Click Window Days (Optional)**: Sets the conversion attribution period, in days, for a pin click action. This applies to Pinterest Tag conversion metrics. Valid values are 0, 1, 7, 14, 30, and 60. It defaults to 30 days if you don't specify a value. Set it to 0 to disable click attribution.
6. **Engagement Window Days (Optional)**: Sets the conversion attribution period, in days, for an engagement action. Engagements include saves, closeups, link clicks, and carousel card swipes. This applies to Pinterest Tag conversion metrics. Valid values are 0, 1, 7, 14, 30, and 60. It defaults to 30 days if you don't specify a value. Set it to 0 to disable engagement attribution.
7. **View Window Days (Optional)**: Sets the conversion attribution window, in days, for a view action. This applies to Pinterest Tag conversion metrics. Valid values are 0, 1, 7, 14, 30, and 60. It defaults to 30 days if you don't specify a value. Set it to 0 to disable view attribution.
8. **Conversion Report Time (Optional)**: Sets the date used to report returned conversion metrics. A conversion event has two associated dates: the ad interaction date and the conversion completion date. The default is TIME_OF_AD_ACTION.
9. **Attribution Types (Optional)**: Lists the report's attribution types, such as INDIVIDUAL or HOUSEHOLD.
10. **Campaign Statuses (Optional)**: Filters custom report results by campaign status. Select from RUNNING, PAUSED, NOT_STARTED, COMPLETED, ADVERTISER_DISABLED, ARCHIVED, DRAFT, and DELETED_DRAFT. Include ARCHIVED to report on archived campaigns. If you select more than six values, the connector splits them across multiple Pinterest report requests.
11. **Ad Group Statuses (Optional)**: Filters custom report results by ad group status. Select from RUNNING, PAUSED, NOT_STARTED, COMPLETED, ADVERTISER_DISABLED, ARCHIVED, DRAFT, and DELETED_DRAFT. If you select more than six values, the connector splits them across multiple Pinterest report requests.
12. **Ad Statuses (Optional)**: Filters custom report results by ad status. Select from APPROVED, PAUSED, PENDING, REJECTED, ADVERTISER_DISABLED, ARCHIVED, DRAFT, and DELETED_DRAFT. If you select more than six values, the connector splits them across multiple Pinterest report requests. Product Item level reports don't support this filter.
13. **Start Date (Optional)**: Sets the report's start date in YYYY-MM-DD format. It defaults to the report API's latest allowed date, which is 913 days from today.

For detailed guidance on creating custom reports, see [Pinterest API documentation](https://developers.pinterest.com/docs/api/v5/#operation/analytics/create_report).

## Performance considerations

The Pinterest [rate limits](https://developers.pinterest.com/docs/reference/rate-limits/) restricts the connector. The Pinterest API applies rate limits by endpoint category.

For example, the `ads_analytics` category allows 300 requests per minute with standard access. The `ads_read` and `org_read` categories allow 1,000 requests per minute.

For details, see [Pinterest rate limits documentation](https://developers.pinterest.com/docs/reference/rate-limits/).

When the connector receives a rate-limit response, it waits based on the `X-RateLimit-Reset` header and retries automatically.

Reduce **Number of concurrent workers** to lower rate-limit pressure, although syncs will take longer. The default is 2, and the range is 1–40.

The connector sends custom report status filters in chunks of no more than six values per dimension.

Selecting many campaign, ad group, and ad statuses multiplies asynchronous report-creation requests by `ceil(campaign_statuses / 6) × ceil(ad_group_statuses / 6) × ceil(ad_statuses / 6)` for each account and date window. The maximum is 8x because each field has eight possible values.

Each entity has exactly one status, so chunked requests return separate row sets. No rows are duplicated or lost.

Selecting more than six values requires the report level to match or sit below the filtered dimension. For example, more than six ad statuses require a `PIN_PROMOTION`-level report.

At broader levels, several chunks would return the same aggregated rows. The connector therefore rejects these configurations.

The connector automatically retries rate-limited report calls. If you reach analytics rate limits, select fewer statuses or reduce concurrent workers.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version     | Date       | Pull Request                                             | Subject                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|:------------|:-----------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2.4.3 | 2026-11-10 | [91197](https://github.com/airbytehq/airbyte/pull/91197) | Declare the refreshed `access_token` and `token_expiry_date` in the spec so the access token is masked as a secret |
| 2.4.2 | 2026-11-10 | [91673](https://github.com/airbytehq/airbyte/pull/91673) | Update dependencies |
| 2.4.1 | 2026-11-03 | [89338](https://github.com/airbytehq/airbyte/pull/89338) | Update dependencies |
| 2.4.0 | 2026-10-15 | [89007](https://github.com/airbytehq/airbyte/pull/89007) | Add `attribution_window` setting to re-read recent report and analytics dates on incremental syncs |
| 2.3.6 | 2026-10-13 | [88724](https://github.com/airbytehq/airbyte/pull/88724) | Update dependencies |
| 2.3.5 | 2026-10-06 | [87990](https://github.com/airbytehq/airbyte/pull/87990) | Update dependencies |
| 2.3.4 | 2026-09-29 | [87273](https://github.com/airbytehq/airbyte/pull/87273) | Update dependencies |
| 2.3.3 | 2026-09-22 | [86737](https://github.com/airbytehq/airbyte/pull/86737) | Update dependencies |
| 2.3.2 | 2026-09-15 | [86186](https://github.com/airbytehq/airbyte/pull/86186) | Update dependencies |
| 2.3.1 | 2026-09-08 | [85598](https://github.com/airbytehq/airbyte/pull/85598) | Update dependencies |
| 2.3.0 | 2026-08-24 | [80303](https://github.com/airbytehq/airbyte/pull/80303) | Split Pinterest custom report status filters into multiple API calls when more than six values are selected. |
| 2.2.12 | 2026-08-18 | [84706](https://github.com/airbytehq/airbyte/pull/84706) | Update dependencies |
| 2.2.11 | 2026-08-11 | [83997](https://github.com/airbytehq/airbyte/pull/83997) | Update dependencies |
| 2.2.10 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 2.2.9 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 2.2.7 — 2.2.8 is built on SDM 7.23.7, which breaks bundled custom components |
| 2.2.8 | 2026-07-28 | [83033](https://github.com/airbytehq/airbyte/pull/83033) | Update dependencies |
| 2.2.7 | 2026-07-21 | [82553](https://github.com/airbytehq/airbyte/pull/82553) | Update dependencies |
| 2.2.6 | 2026-07-14 | [81972](https://github.com/airbytehq/airbyte/pull/81972) | Update dependencies |
| 2.2.5 | 2026-06-30 | [81182](https://github.com/airbytehq/airbyte/pull/81182) | Update dependencies |
| 2.2.4 | 2026-06-23 | [80579](https://github.com/airbytehq/airbyte/pull/80579) | Update dependencies |
| 2.2.3 | 2026-06-16 | [79987](https://github.com/airbytehq/airbyte/pull/79987) | Update dependencies |
| 2.2.2 | 2026-06-15 | [79693](https://github.com/airbytehq/airbyte/pull/79693) | Handle Pinterest rate limits during report download target refresh and reduce default concurrency. |
| 2.2.1 | 2026-06-10 | [78496](https://github.com/airbytehq/airbyte/pull/78496) | Refresh Pinterest async report download URLs immediately before fetching reports. |
| 2.2.0 | 2026-06-10 | [79655](https://github.com/airbytehq/airbyte/pull/79655) | Promotes to stable release. |
| 2.2.0-rc.1 | 2026-06-09 | [78320](https://github.com/airbytehq/airbyte/pull/78320) | Added optional custom report status filters so archived campaigns, ad groups, and ads can be included in Pinterest analytics reports. |
| 2.1.30 | 2026-06-09 | [79465](https://github.com/airbytehq/airbyte/pull/79465) | Update dependencies |
| 2.1.29 | 2026-06-02 | [75841](https://github.com/airbytehq/airbyte/pull/75841) | Update dependencies |
| 2.1.28 | 2026-06-01 | [78538](https://github.com/airbytehq/airbyte/pull/78538) | Promoted release candidate to GA |
| 2.1.28-rc.4 | 2026-05-27 | [78466](https://github.com/airbytehq/airbyte/pull/78466) | Remove the HTTP API budget while keeping default concurrency at 4 for continued tuning. |
| 2.1.28-rc.3 | 2026-05-26 | [78432](https://github.com/airbytehq/airbyte/pull/78432) | Set default concurrency to 4 and use the standard num_workers override while preserving the Pinterest API budget. |
| 2.1.28-rc.2 | 2026-05-21 | [78345](https://github.com/airbytehq/airbyte/pull/78345) | Increase default concurrency to 5 for the source-pinterest Phase 1 tuning cohort. |
| 2.1.28-rc.1 | 2026-05-18 | [76952](https://github.com/airbytehq/airbyte/pull/76952) | Concurrency tuning (Path A): bump `default_concurrency` default to 4 via the `num_threads` fallback. No user-visible spec changes. |
| 2.1.27 | 2026-04-07 | [75485](https://github.com/airbytehq/airbyte/pull/75485) | Add maxLength validation to account_id field to reject values longer than 18 characters at config time |
| 2.1.26 | 2026-03-17 | [74453](https://github.com/airbytehq/airbyte/pull/74453) | Update dependencies |
| 2.1.25 | 2026-03-09 | [74339](https://github.com/airbytehq/airbyte/pull/74339) | Add TOTAL_IMPRESSION column to custom reports |
| 2.1.24 | 2026-03-09 | [74120](https://github.com/airbytehq/airbyte/pull/74120) | Fix custom reports `engagement_window_days` and `view_window_days` default values from array `[30]` to integer `30`; fix `or 30` fallback to correctly handle `0` as a valid value |
| 2.1.23 | 2026-02-24 | [73845](https://github.com/airbytehq/airbyte/pull/73845) | Update dependencies |
| 2.1.22 | 2026-02-17 | [73595](https://github.com/airbytehq/airbyte/pull/73595) | Update dependencies |
| 2.1.21 | 2026-02-12 | [71030](https://github.com/airbytehq/airbyte/pull/71030) | Use user_account_analytics for connection check to support all permission sets |
| 2.1.20 | 2026-02-10 | [73173](https://github.com/airbytehq/airbyte/pull/73173) | Update dependencies |
| 2.1.19 | 2026-02-03 | [72668](https://github.com/airbytehq/airbyte/pull/72668) | Update dependencies |
| 2.1.18 | 2026-01-20 | [69629](https://github.com/airbytehq/airbyte/pull/69629) | Update dependencies |
| 2.1.17 | 2025-10-29 | [68961](https://github.com/airbytehq/airbyte/pull/68961) | Update dependencies |
| 2.1.16 | 2025-10-21 | [68213](https://github.com/airbytehq/airbyte/pull/68213) | Update dependencies |
| 2.1.15 | 2025-10-14 | [67808](https://github.com/airbytehq/airbyte/pull/67808) | Update dependencies |
| 2.1.14 | 2025-10-07 | [62329](https://github.com/airbytehq/airbyte/pull/62329) | Update dependencies |
| 2.1.13 | 2025-10-06 | [67105](https://github.com/airbytehq/airbyte/pull/67105) | Promoting release candidate 2.1.13-rc.2 to a main version. |
| 2.1.13-rc.2 | 2025-10-03 | [67025](https://github.com/airbytehq/airbyte/pull/67025) | Add timeout status for reports |
| 2.1.13-rc.1 | 2025-09-30 | [66755](https://github.com/airbytehq/airbyte/pull/66755) | Migrate to manifest-only |
| 2.1.12 | 2025-09-30 | [66820](https://github.com/airbytehq/airbyte/pull/66820) | Promoting release candidate 2.1.12-rc.1 to a main version. |
| 2.1.12-rc.1 | 2025-09-29 | [66564](https://github.com/airbytehq/airbyte/pull/66564) | Migrate Custom Reports streams |
| 2.1.11 | 2025-09-29 | [66737](https://github.com/airbytehq/airbyte/pull/66737) | Promoting release candidate 2.1.11-rc.1 to a main version. |
| 2.1.11-rc.1 | 2025-09-23 | [66560](https://github.com/airbytehq/airbyte/pull/66560) | Migrate Targeting Analytics Reports streams |
| 2.1.10 | 2025-09-22 | [66565](https://github.com/airbytehq/airbyte/pull/66565) | Promoting release candidate 2.1.10-rc.1 to a main version. |
| 2.1.10-rc.1 | 2025-09-16 | [66187](https://github.com/airbytehq/airbyte/pull/66187) | Migrate Analytics Reports streams |
| 2.1.9 | 2025-09-16 | [66281](https://github.com/airbytehq/airbyte/pull/66281) | Promoting release candidate 2.1.9-rc.2 to a main version. |
| 2.1.9-rc.2 | 2025-09-12 | [66211](https://github.com/airbytehq/airbyte/pull/66211) | Add APIBudget and backoff strategy for analytics streams |
| 2.1.9-rc.1 | 2025-09-05 | [65960](https://github.com/airbytehq/airbyte/pull/65960) | feat(source-pinterest): Update CDK to v6 |
| 2.1.8 | 2025-06-21 | [61920](https://github.com/airbytehq/airbyte/pull/61920) | Update dependencies |
| 2.1.7 | 2025-06-14 | [61067](https://github.com/airbytehq/airbyte/pull/61067) | Update dependencies |
| 2.1.6 | 2025-05-24 | [60136](https://github.com/airbytehq/airbyte/pull/60136) | Update dependencies |
| 2.1.5 | 2025-05-04 | [59069](https://github.com/airbytehq/airbyte/pull/59069) | Update dependencies |
| 2.1.4 | 2025-04-19 | [58524](https://github.com/airbytehq/airbyte/pull/58524) | Update dependencies |
| 2.1.3 | 2025-04-12 | [57926](https://github.com/airbytehq/airbyte/pull/57926) | Update dependencies |
| 2.1.2 | 2025-04-05 | [57337](https://github.com/airbytehq/airbyte/pull/57337) | Update dependencies |
| 2.1.1 | 2025-03-29 | [56721](https://github.com/airbytehq/airbyte/pull/56721) | Update dependencies |
| 2.1.0 | 2025-02-03 | [53135](https://github.com/airbytehq/airbyte/pull/53135) | Added Account Id filter to allow retrieving data for a specific ad account |
| 2.0.32 | 2025-03-22 | [55055](https://github.com/airbytehq/airbyte/pull/55055) | Update dependencies |
| 2.0.31 | 2025-02-23 | [54581](https://github.com/airbytehq/airbyte/pull/54581) | Update dependencies |
| 2.0.30 | 2025-02-15 | [53977](https://github.com/airbytehq/airbyte/pull/53977) | Update dependencies |
| 2.0.29 | 2025-02-01 | [53001](https://github.com/airbytehq/airbyte/pull/53001) | Update dependencies |
| 2.0.28 | 2025-01-25 | [52502](https://github.com/airbytehq/airbyte/pull/52502) | Update dependencies |
| 2.0.27 | 2025-01-11 | [51377](https://github.com/airbytehq/airbyte/pull/51377) | Update dependencies |
| 2.0.26 | 2025-01-04 | [50933](https://github.com/airbytehq/airbyte/pull/50933) | Update dependencies |
| 2.0.25 | 2024-12-28 | [50710](https://github.com/airbytehq/airbyte/pull/50710) | Update dependencies |
| 2.0.24 | 2024-12-21 | [50302](https://github.com/airbytehq/airbyte/pull/50302) | Update dependencies |
| 2.0.23 | 2024-12-14 | [49040](https://github.com/airbytehq/airbyte/pull/49040) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 2.0.22 | 2024-11-04 | [48280](https://github.com/airbytehq/airbyte/pull/48280) | Update dependencies |
| 2.0.21 | 2024-10-29 | [47074](https://github.com/airbytehq/airbyte/pull/47074) | Update dependencies |
| 2.0.20 | 2024-10-12 | [46815](https://github.com/airbytehq/airbyte/pull/46815) | Update dependencies |
| 2.0.19 | 2024-10-05 | [46482](https://github.com/airbytehq/airbyte/pull/46482) | Update dependencies |
| 2.0.18 | 2024-09-28 | [46104](https://github.com/airbytehq/airbyte/pull/46104) | Update dependencies |
| 2.0.17 | 2024-09-21 | [45838](https://github.com/airbytehq/airbyte/pull/45838) | Update dependencies |
| 2.0.16 | 2024-09-14 | [45566](https://github.com/airbytehq/airbyte/pull/45566) | Update dependencies |
| 2.0.15 | 2024-09-07 | [45283](https://github.com/airbytehq/airbyte/pull/45283) | Update dependencies |
| 2.0.14 | 2024-08-31 | [45060](https://github.com/airbytehq/airbyte/pull/45060) | Update dependencies |
| 2.0.13 | 2024-08-24 | [44752](https://github.com/airbytehq/airbyte/pull/44752) | Update dependencies |
| 2.0.12 | 2024-08-17 | [44346](https://github.com/airbytehq/airbyte/pull/44346) | Update dependencies |
| 2.0.11 | 2024-08-12 | [43838](https://github.com/airbytehq/airbyte/pull/43838) | Update dependencies |
| 2.0.10 | 2024-08-10 | [43642](https://github.com/airbytehq/airbyte/pull/43642) | Update dependencies |
| 2.0.9 | 2024-08-03 | [43280](https://github.com/airbytehq/airbyte/pull/43280) | Update dependencies |
| 2.0.8 | 2024-07-30 | [39559](https://github.com/airbytehq/airbyte/pull/39559) | Ensure config_error when state has improper format and update CDK version |
| 2.0.7 | 2024-07-27 | [42603](https://github.com/airbytehq/airbyte/pull/42603) | Update dependencies |
| 2.0.6 | 2024-07-20 | [42343](https://github.com/airbytehq/airbyte/pull/42343) | Update dependencies |
| 2.0.5 | 2024-07-13 | [41765](https://github.com/airbytehq/airbyte/pull/41765) | Update dependencies |
| 2.0.4 | 2024-07-10 | [41449](https://github.com/airbytehq/airbyte/pull/41449) | Update dependencies |
| 2.0.3 | 2024-07-06 | [39972](https://github.com/airbytehq/airbyte/pull/39972) | Update dependencies |
| 2.0.2 | 2024-06-10 | [39367](https://github.com/airbytehq/airbyte/pull/39367) | Fix type error when start date was not provided |
| 2.0.1 | 2024-06-04 | [39037](https://github.com/airbytehq/airbyte/pull/39037) | [autopull] Upgrade base image to v1.2.1 |
| 2.0.0 | 2024-05-20 | [37698](https://github.com/airbytehq/airbyte/pull/37698) | Migrate to low-code |
| 1.3.3 | 2024-04-24 | [36655](https://github.com/airbytehq/airbyte/pull/36655) | Schema descriptions and CDK 0.80.0 |
| 1.3.2 | 2024-04-08 | [36912](https://github.com/airbytehq/airbyte/pull/36912) | Fix icon |
| 1.3.1 | 2024-04-03 | [36806](https://github.com/airbytehq/airbyte/pull/36806) | Update airbyte-cdk count bug to emit recordCount as float |
| 1.3.0 | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0` |
| 1.2.0 | 2024-02-20 | [35465](https://github.com/airbytehq/airbyte/pull/35465) | Per-error reporting and continue sync on stream failures |
| 1.1.1 | 2024-02-12 | [35159](https://github.com/airbytehq/airbyte/pull/35159) | Manage dependencies with Poetry. |
| 1.1.0 | 2023-11-22 | [32747](https://github.com/airbytehq/airbyte/pull/32747) | Update docs and spec. Add missing `placement_traffic_type` field to AdGroups stream |
| 1.0.0 | 2023-11-16 | [32595](https://github.com/airbytehq/airbyte/pull/32595) | Add airbyte_type: timestamp_without_timezone to date-time fields across all streams. Rename `Advertizer*` streams to `Advertiser*` |
| 0.8.2 | 2023-11-20 | [32672](https://github.com/airbytehq/airbyte/pull/32672) | Fix backoff waiting time |
| 0.8.1 | 2023-11-16 | [32601](https://github.com/airbytehq/airbyte/pull/32601) | added ability to create custom reports |
| 0.8.0 | 2023-11-16 | [32592](https://github.com/airbytehq/airbyte/pull/32592) | Make start_date optional; add suggested streams; add missing fields |
| 0.7.2 | 2023-11-08 | [32299](https://github.com/airbytehq/airbyte/pull/32299) | added default `AvailabilityStrategy`, fixed bug which cases duplicated requests, added new streams: Catalogs, CatalogsFeeds, CatalogsProductGroups, Audiences, Keywords, ConversionTags, CustomerLists, CampaignTargetingReport, AdvertizerReport, AdvertizerTargetingReport, AdGroupReport, AdGroupTargetingReport, PinPromotionReport, PinPromotionTargetingReport, ProductGroupReport, ProductGroupTargetingReport, ProductItemReport, KeywordReport |
| 0.7.1 | 2023-11-01 | [32078](https://github.com/airbytehq/airbyte/pull/32078) | handle non json response |
| 0.7.0 | 2023-10-25 | [31876](https://github.com/airbytehq/airbyte/pull/31876) | Migrated to base image, removed token based authentication method because access_token is valid for 1 day only |
| 0.6.0 | 2023-07-25 | [28672](https://github.com/airbytehq/airbyte/pull/28672) | Add report stream for `CAMPAIGN` level |
| 0.5.3 | 2023-07-05 | [27964](https://github.com/airbytehq/airbyte/pull/27964) | Add `id` field to `owner` field in `ad_accounts` stream |
| 0.5.2 | 2023-06-02 | [26949](https://github.com/airbytehq/airbyte/pull/26949) | Update `BoardPins` stream with `note` property |
| 0.5.1 | 2023-05-11 | [25984](https://github.com/airbytehq/airbyte/pull/25984) | Add pattern for start_date |
| 0.5.0 | 2023-05-17 | [26188](https://github.com/airbytehq/airbyte/pull/26188) | Add `product_tags` field to the `BoardPins` stream |
| 0.4.0 | 2023-05-16 | [26112](https://github.com/airbytehq/airbyte/pull/26112) | Add `is_standard` field to the `BoardPins` stream |
| 0.3.0 | 2023-05-09 | [25915](https://github.com/airbytehq/airbyte/pull/25915) | Add `creative_type` field to the `BoardPins` stream |
| 0.2.6 | 2023-04-26 | [25548](https://github.com/airbytehq/airbyte/pull/25548) | Fix `format` issue for `boards` stream schema for fields with `date-time` |
| 0.2.5 | 2023-04-19 | [0](https://github.com/airbytehq/airbyte/pull/0) | Update `AMOUNT_OF_DAYS_ALLOWED_FOR_LOOKUP` to 89 days |
| 0.2.4 | 2023-02-25 | [23457](https://github.com/airbytehq/airbyte/pull/23457) | Add missing columns for analytics streams for pinterest source |
| 0.2.3 | 2023-03-01 | [23649](https://github.com/airbytehq/airbyte/pull/23649) | Fix for `HTTP - 400 Bad Request` when requesting data >= 90 days |
| 0.2.2 | 2023-01-27 | [22020](https://github.com/airbytehq/airbyte/pull/22020) | Set `AvailabilityStrategy` for streams explicitly to `None` |
| 0.2.1 | 2022-12-15 | [20532](https://github.com/airbytehq/airbyte/pull/20532) | Bump CDK version |
| 0.2.0 | 2022-12-13 | [20242](https://github.com/airbytehq/airbyte/pull/20242) | Add data-type normalization up to the schemas declared |
| 0.1.9 | 2022-09-06 | [15074](https://github.com/airbytehq/airbyte/pull/15074) | Add filter based on statuses |
| 0.1.8 | 2022-10-21 | [18285](https://github.com/airbytehq/airbyte/pull/18285) | Fix type of `start_date` |
| 0.1.7 | 2022-09-29 | [17387](https://github.com/airbytehq/airbyte/pull/17387) | Set `start_date` dynamically based on API restrictions. |
| 0.1.6 | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/pull/17304) | Use CDK 0.1.89 |
| 0.1.5 | 2022-09-16 | [16799](https://github.com/airbytehq/airbyte/pull/16799) | Migrate to per-stream state |
| 0.1.4 | 2022-09-06 | [16161](https://github.com/airbytehq/airbyte/pull/16161) | Add ability to handle `429 - Too Many Requests` error with respect to `Max Rate Limit Exceeded Error` |
| 0.1.3 | 2022-09-02 | [16271](https://github.com/airbytehq/airbyte/pull/16271) | Add support of `OAuth2.0` authentication method |
| 0.1.2 | 2021-12-22 | [10223](https://github.com/airbytehq/airbyte/pull/10223) | Fix naming of `AD_ID` and `AD_ACCOUNT_ID` fields |
| 0.1.1 | 2021-12-22 | [9043](https://github.com/airbytehq/airbyte/pull/9043) | Update connector fields title/description |
| 0.1.0 | 2021-10-29 | [7493](https://github.com/airbytehq/airbyte/pull/7493) | Release Pinterest CDK Connector |
</details>
