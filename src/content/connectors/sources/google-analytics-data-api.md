---
generated_record: true
connector_name: Google Analytics 4 (GA4)
connector_type: source
connector_slug: google-analytics-data-api
connector_directory: source-google-analytics-data-api
definition_id: 3cc2eafd-84aa-4dca-93af-322d9dfeec1a
version: 2.11.10
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/google-analytics-data-api
logo: /images/connectors/sources/google-analytics-data-api.svg
logo_source_path: airbyte-integrations/connectors/source-google-analytics-data-api/icon.svg
logo_sha256: 58bfa2254f9cb05850f7d9791db97103e6bfd4cf26a8e5afa2da2025a7ddff95
original_metadata_path: airbyte-integrations/connectors/source-google-analytics-data-api/metadata.yaml
original_metadata_sha256: bbbb43f2a617fe2208234e5e3d6b3b784a237013c2ad13cc8af88b75bb7a78c2
original_document_path: docs/integrations/sources/google-analytics-data-api.md
original_document_sha256: b332ca1fc912d6b24b53c925742faa77630f48d970c6e80e26559055a1873b22
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8d2969dc1ace5776e53d351269c3f5ffc85f5e9f1dc9eee400f37cbeca4e127b
rewritten_at: 2026-11-12T14:08:38.479408+00:00
---

# Google Analytics 4 (GA4)

<HideInUI>

Find setup guidance and reference information for the [Google Analytics 4 (GA4)](https://developers.google.com/analytics) source connector on this page.

</HideInUI>

Google Analytics 4 (GA4) is the latest Google Analytics version, introduced in 2020. Its data model focuses on events and user properties instead of page views and sessions. This model gives you more flexibility when customising reports. It also measures user behaviour more accurately across different devices and platforms.

This connector supports Google Analytics 4 (GA4) and [Google Analytics 360](https://support.google.com/analytics/answer/11202874?sjid=13261024199799321083-NC#limits) (GA360) properties.

## Prerequisites

- A Google Analytics account with access to the GA4 property and property ID you want to sync

## Set up the connector

### 1. Set up Google Analytics 4

<!-- env:oss -->

#### Create a service account

1. Sign in as an administrator to the Google Account you use for Google Analytics.
2. Go to the [Service Accounts](https://console.developers.google.com/iam-admin/serviceaccounts) page in the Google Developers console.
3. Select your project, or create one, then click **Continue**.
4. Click **+ Create Service Account** at the top of the page.
5. Enter a service account name and, optionally, a description. Click **Create and Continue**.
6. Choose the service account role. The recommended role is **Viewer** (Read & Analyze permissions). Click **Continue**.
7. Select your new service account, then open the **Keys** tab. Click **Add Key** > **Create New Key**.
8. Select **JSON** as the Key type. This generates and downloads the JSON key file used for authentication. Click **Continue**.

:::note
When authenticating with a **service account** (Airbyte Open Source), grant the service account access to the **GA4 property** in **Google Analytics**. Creating the account and downloading its JSON key doesn't automatically grant permission to read Analytics data.

1. In Google Analytics, go to **Admin** → under **Property**, click **Property access management**.
2. Click **+** → **Add users**, then add the service account email, for example, `...@...iam.gserviceaccount.com`.
3. Grant at least the **Viewer** role (read-only) for the target property.
:::

#### Enable the Google Analytics APIs

Enable the required APIs before using the service account to access Google Analytics data:

1. Go to the [Google Analytics Reporting API dashboard](https://console.developers.google.com/apis/api/analyticsreporting.googleapis.com/overview). Select the project linked to your service account, then enable the API. You can also set quotas and check usage.
2. Go to the [Google Analytics API dashboard](https://console.developers.google.com/apis/api/analytics.googleapis.com/overview). Select the project linked to your service account, then enable the API.
3. Go to the [Google Analytics Data API dashboard](https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview). Select the project linked to your service account, then enable the API.

<!-- /env:oss -->

<!-- env:cloud -->

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Google Analytics 4 (GA4) from the Source type dropdown.
4. Enter a name for the Google Analytics 4 (GA4) connector.
5. Select **Authenticate via Google (Oauth)** from the dropdown menu, then click **Authenticate your Google Analytics 4 (GA4) account**. In the pop-up window, sign in to your Google account and grant Airbyte access to your Google Analytics account.
6. Enter the **Property ID** whose events are tracked. Use a numeric value, such as `123456789`. If you're unsure where to find it, refer to [Google's documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id#what_is_my_property_id).
   :::note
   A "Tracking Id", such as "UA-123...-1", in Property Settings identifies a Universal Analytics property. This connector can't report Analytics data for that property. To create a new Google Analytics 4 property, follow [these instructions](https://support.google.com/analytics/answer/9744165?hl=en).
   :::

7. (Optional) In the **Start Date** field, use the datepicker or enter a date programmatically in the format `YYYY-MM-DD`. The connector replicates all data added from this date onwards. This setting doesn't apply to custom Cohort reports.
8. (Optional) In the **Custom Reports** field, describe any custom Google Analytics reports you want to sync. See the [Custom Reports](#custom-reports) section below for guidance on defining these reports.
9. (Optional) In the **Data Request Interval (Days)** field, set the interval for Google Analytics API data requests. Enter a value from 1 to 364 days. Larger values make syncing faster but increase the chance of sampling, which can make results inaccurate. Set this value to 1 unless faster syncing is essential and reduced accuracy is acceptable. This field doesn't apply to custom Cohort reports. See the [Data Sampling](#data-sampling-and-data-request-intervals) section below for more context.
10. (Optional) Enable **One Stream per Report** to create one stream per report across all configured property IDs. Otherwise, the connector creates one stream for each report and property. This setting is recommended when syncing many properties. See the [One Stream per Report](#one-stream-per-report) section below &mdash; enabling it on an existing connection requires a full re-sync.

:::caution

Consider how you specify dimensions such as `month` or `yearMonth`. These dimensions organise the data according to your preferences.
Your selected report date range also affects how data appears. A very specific range, such as one day, may produce duplicate entries for each day. This occurs when **Data Request Interval (Days)** is set to one day.
To get more precise results and prevent duplicates, set **Data Request Interval (Days)** to 364.

:::

11. Click **Set up source** and wait for the tests to finish.

<!-- /env:cloud -->

<!-- env:oss -->

### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **Google Analytics 4 (GA4)** from the available sources.
4. Select **Service Account Key Authentication** from the dropdown list, then enter the **Service Account JSON Key** from Step 1.
5. Enter the **Property ID** whose events are tracked. Use a numeric value, such as `123456789`. If you're unsure where to find it, refer to [Google's documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id#what_is_my_property_id).
   :::note
   A "Tracking Id", such as "UA-123...-1", in Property Settings identifies a Universal Analytics property. The Data API can't report Analytics data for that property. To create a new Google Analytics 4 property, follow [these instructions](https://support.google.com/analytics/answer/9744165?hl=en).
   :::

6. (Optional) In the **Start Date** field, use the datepicker or enter a date programmatically in the format `YYYY-MM-DD`. The connector replicates all data added from this date onwards. This setting doesn't apply to custom Cohort reports.

:::note
If you don't provide a start date, the default is two years before the initial sync.
:::

:::caution
Many analyses and data investigations need 24-48 hours to process information from your website or app. To improve data accuracy, the connector subtracts two days from the start date. For more details, refer to [Google's documentation](https://support.google.com/analytics/answer/9333790?hl=en).
:::

7. (Optional) Turn on **Keep Empty Rows** to return every row where all metrics equal 0.
8. (Optional) In the **Custom Reports** field, describe any custom Google Analytics reports you want to sync. See the [Custom Reports](#custom-reports) section below for guidance on defining these reports.
9. (Optional) In the **Data Request Interval (Days)** field, set the interval for Google Analytics API data requests. Enter a value from 1 to 364 days. Larger values make syncing faster but increase the chance of sampling, which can make results inaccurate. Set this value to 1 unless faster syncing is essential and reduced accuracy is acceptable. This field doesn't apply to custom Cohort reports. See the [Data Sampling](#data-sampling-and-data-request-intervals) section below for more context.
10. (Optional) In the **Lookback window (Days)** field, set how many days of past data each run refreshes. This keeps your data consistent when attribution changes after the event date and Google Analytics has processing latency. For example, a value of 5 re-fetches data from five days before the last bookmark date.
11. (Optional) Enable **One Stream per Report** to create one stream per report across all configured property IDs. Otherwise, the connector creates one stream for each report and property. This setting is recommended when syncing many properties. See the [One Stream per Report](#one-stream-per-report) section below &mdash; enabling it on an existing connection requires a full re-sync.

:::caution

Consider how you specify dimensions such as `month` or `yearMonth`. These dimensions organise the data according to your preferences.
Your selected report date range also affects how data appears. A very specific range, such as one day, may produce duplicate entries for each day. This occurs when **Data Request Interval (Days)** is set to one day.
To get more precise results and prevent duplicates, set **Data Request Interval (Days)** to 364.

:::

12. Click **Set up source** and wait for the tests to finish.
<!-- /env:oss -->

## Supported sync modes

The Google Analytics 4 (GA4) source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

## Supported streams

This connector outputs these streams:

Preconfigured and custom report streams use the Google Analytics Data API [`properties.runReport`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport) method. Each stream represents a different combination of dimensions and metrics sent to the same API endpoint. Custom reports with specified pivots use the [`properties.runPivotReport`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runPivotReport) method instead.

- Preconfigured streams:
  - daily_active_users
  - devices
  - four_weekly_active_users
  - locations
  - pages
  - traffic_sources
  - website_overview
  - weekly_active_users
  - user_acquisition_first_user_medium_report
  - user_acquisition_first_user_source_report
  - user_acquisition_first_user_source_medium_report
  - user_acquisition_first_user_source_platform_report
  - user_acquisition_first_user_campaign_report
  - user_acquisition_first_user_google_ads_ad_network_type_report
  - user_acquisition_first_user_google_ads_ad_group_name_report
  - traffic_acquisition_session_source_medium_report
  - traffic_acquisition_session_medium_report
  - traffic_acquisition_session_source_report
  - traffic_acquisition_session_campaign_report
  - traffic_acquisition_session_default_channel_grouping_report
  - traffic_acquisition_session_source_platform_report
  - events_report
  - weekly_events_report
  - conversions_report
  - pages_title_and_screen_class_report
  - pages_path_report
  - pages_title_and_screen_name_report
  - content_group_report
  - ecommerce_purchases_item_name_report
  - ecommerce_purchases_item_id_report
  - ecommerce_purchases_item_category_report_combined
  - ecommerce_purchases_item_category_report
  - ecommerce_purchases_item_category_2_report
  - ecommerce_purchases_item_category_3_report
  - ecommerce_purchases_item_category_4_report
  - ecommerce_purchases_item_category_5_report
  - ecommerce_purchases_item_brand_report
  - publisher_ads_ad_unit_report
  - publisher_ads_page_path_report
  - publisher_ads_ad_format_report
  - publisher_ads_ad_source_report
  - demographic_country_report
  - demographic_region_report
  - demographic_city_report
  - demographic_language_report
  - demographic_age_report
  - demographic_gender_report
  - demographic_interest_report
  - tech_browser_report
  - tech_device_category_report
  - tech_device_model_report
  - tech_screen_resolution_report
  - tech_app_version_report
  - tech_platform_report
  - tech_platform_device_category_report
  - tech_operating_system_report
  - tech_os_with_version_report
- Property metadata stream:
  - `property_metadata`
- Custom stream(s)

The `property_metadata` stream uses full refresh and the Admin API [`properties.get`](https://developers.google.com/analytics/admin-rest/v1beta/properties/get) method. It emits one record for each configured property ID. Each record includes a `property_id` field for joining it with report streams.

The `property_metadata` stream requires Google Analytics Admin API (`analyticsadmin.googleapis.com`) for the GCP project linked to the credentials. Service account users must enable it in their own project. Without it, this stream fails with a `403 SERVICE_DISABLED` error, but report streams continue working.

## Connector features

### Custom reports

Custom Google Analytics reports let you query specific data for your needs. You can define these components:

- **Name**: The custom report's name.
- **Dimensions**: An array of data categories, such as city or user type.
- **Metrics**: An array of quantitative measurements, such as active users or page views.
- **CohortSpec**: (Optional) An object containing cohort analysis settings, such as cohort size and date range. Find more information about this object in [the GA4 documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/CohortSpec).
- **Pivots**: (Optional) An array of data pivot tables, such as page views by city. Find more information about pivots in [the GA4 documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/Pivot).

Find the full list of API-supported dimensions and metrics in [here](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema). Use the [GA4 Dimensions & Metrics Explorer](https://ga-dev-tools.google/ga4/dimensions-metrics-explorer/) to check whether dimensions and metrics are compatible with your GA4 property.

This basic User Engagement report tracks sessions and bounce rate by city:

```json
[
  {
    "name": "User Engagement Report",
    "dimensions": ["city"],
    "metrics": ["sessions", "bounceRate"]
  }
]
```

Add a cohort with a seven-day range and pivot on the city dimension for more detail. The report then shows engagement trends across the top 50 cities for the specified date range.

```json
[
  {
    "name": "User Engagement Report",
    "dimensions": ["city"],
    "metrics": ["sessions", "bounceRate"],
    "cohortSpec": {
      "cohorts": [
        {
          "name": "Last 7 Days",
          "dateRange": {
            "startDate": "2023-07-27",
            "endDate": "2023-08-03"
          }
        }
      ],
      "cohortReportSettings": {
        "accumulate": true
      }
    },
    "pivots": [
      {
        "fieldNames": ["city"],
        "limit": 50,
        "metricAggregations": ["TOTAL"]
      }
    ]
  }
]
```

### One stream per report

By default, the connector creates a stream for every report and Property ID combination. With 57 built-in reports and 70 properties, this creates about 3,990 streams. This volume slows catalogue loading, complicates stream management and increases the chance of setup errors.

Enable **One Stream per Report** to create one stream per report across every configured property. Each record includes a `property_id` field. The stream's primary key includes `property_id`, keeping rows from different properties distinct in the destination. Each property also has its own incremental cursor, so properties sync independently.

Consolidated streams use the name `<report_name>Consolidated`. For example, the `devices` report becomes `devicesConsolidated`. The connector doesn't create per-property streams such as `devices` and `devicesProperty5729978930` while this setting is enabled. The distinct name ensures the consolidated stream starts clean. It doesn't inherit the destination table or incremental cursor from the single-property stream it replaces.

The stream schema combines the field definitions from every configured property. This is important when you use custom metrics, which GA4 defines separately for each property. The schema includes a custom metric even when it exists for only some properties, preventing its data from being dropped. If properties type the same metric differently, the connector uses the type from the property listed first in **Property IDs**.

:::caution

Enabling or disabling this setting changes stream names. Data is written to new destination tables, and incremental state resets. Avoid changing this setting casually on an established connection.

**Changing it on an existing connection requires a schema refresh.** Your connection's stream list reflects its latest schema discovery. Per-property streams continue appearing and syncing no data until you refresh the schema. Follow these steps in order:

1. Enable the source setting and save your changes.
2. Run **Refresh source schema** on each connection that uses this source. The per-property streams, including `devices` and `devicesProperty5729978930`, are reported as removed. The `<report_name>Consolidated` streams then appear.
3. Enable your chosen consolidated streams and apply the changes.
4. Run a sync. The consolidated streams are new, so this fully backfills every property.
5. After confirming the backfill, you may drop the old per-property destination tables. Airbyte leaves these tables in place. Keep them if you might revert &mdash; see below.

Between steps 1 and 3, the connection still lists old stream names that no longer exist in the source. Syncs during this period return no records for those streams.

**Reverting is supported and loses no data.** Disable the setting and refresh the schema to restore per-property streams under their original names. Each stream resumes from the cursor it held before you enabled the setting. The next sync re-fetches the period when the setting was enabled, leaving no gap.

Step 5 is the only exception. Deleting a destination table doesn't reset the stream's cursor. If you drop the old tables and later revert, streams resume from their old cursors. The recreated tables will then omit everything before those cursors. Clear these streams when reverting to run a full backfill.

:::

:::caution

**Adding a Property ID after enabling this setting.** New properties join existing consolidated streams as new partitions. A new partition starts from the stream's current cursor, not from your **Start Date**. The connector doesn't backfill the new property's historical data or raise an error. After adding the Property ID, clear the affected streams to backfill this data.

This behaviour doesn't apply when the setting is off. A new Property ID then creates new streams that backfill independently.

:::

Both settings make the same number of API requests. This setting reduces catalogue size and destination table count, not sync duration.

### Data sampling and request intervals

Google Analytics 4 uses data sampling to estimate analytics data above Google's predefined compute thresholds. Set **Data Request Interval** to control the interval used for Google Analytics API data requests. This can reduce the chance of sampling in your results.

Set the interval to one day to process less data per request. This reduces the chance of sampling and can produce more accurate results. Larger intervals, up to 364 days, can speed up syncing. Choose a smaller value for accuracy unless faster syncing is essential and potential inaccuracies are acceptable. This field doesn't apply to custom Cohort reports.

For more information about data sampling, refer to [Google Analytics documentation](https://support.google.com/analytics/answer/13331292?sjid=10678419627000327283).

## Performance

The Google Analytics connector is subject to Google Analytics Data API quotas. For a detailed quota breakdown, refer to [Google's documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/quotas).

## Data type map

| Integration Type | Airbyte Type |
|:-----------------|:-------------|
| `string`         | `string`     |
| `number`         | `number`     |
| `array`          | `array`      |
| `object`         | `object`     |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version        | Date       | Pull Request                                             | Subject                                                                                                                                                                |
|:---------------|:-----------|:---------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2.11.10 | 2026-11-03 | [90580](https://github.com/airbytehq/airbyte/pull/90580) | Update dependencies |
| 2.11.9 | 2026-10-29 | [76413](https://github.com/airbytehq/airbyte/pull/76413) | Surface expired/revoked OAuth refresh tokens as a `config_error` with a re-authentication message instead of a generic "Something went wrong" error |
| 2.11.8 | 2026-10-27 | [89937](https://github.com/airbytehq/airbyte/pull/89937) | Update dependencies |
| 2.11.7 | 2026-10-20 | [89236](https://github.com/airbytehq/airbyte/pull/89236) | Update dependencies |
| 2.11.6 | 2026-10-13 | [88637](https://github.com/airbytehq/airbyte/pull/88637) | Update dependencies |
| 2.11.5 | 2026-10-06 | [87874](https://github.com/airbytehq/airbyte/pull/87874) | Update dependencies |
| 2.11.4 | 2026-09-29 | [86645](https://github.com/airbytehq/airbyte/pull/86645) | Update dependencies |
| 2.11.3 | 2026-09-22 | [86919](https://github.com/airbytehq/airbyte/pull/86919) | Promoted release candidate to GA |
| 2.11.3-rc.1 | 2026-09-15 | [83188](https://github.com/airbytehq/airbyte/pull/83188) | Reports with more than 100,000 rows per slice are now fully paginated instead of being silently truncated. Report rows are now returned in a deterministic order (sorted by every configured dimension), so pages cannot overlap or skip rows while paginating. |
| 2.11.2 | 2026-09-15 | [84599](https://github.com/airbytehq/airbyte/pull/84599) | Update dependencies |
| 2.11.1 | 2026-09-09 | [85797](https://github.com/airbytehq/airbyte/pull/85797) | Stop inferring the credentials `auth_type` from empty `client_id` / `credentials_json` values |
| 2.11.0 | 2026-09-09 | [85761](https://github.com/airbytehq/airbyte/pull/85761) | Promoted release candidate to GA |
| 2.11.0-rc.1 | 2026-08-11 | [83783](https://github.com/airbytehq/airbyte/pull/83783) | Add an opt-in **One Stream per Report** mode that combines all configured property IDs into one stream per report named `<report_name>Consolidated`, with schemas merged across properties. Off by default; existing connections are unchanged |
| 2.10.2 | 2026-08-11 | [83343](https://github.com/airbytehq/airbyte/pull/83343) | Preserve nested `name` fields when resolving dynamic streams |
| 2.10.1 | 2026-08-11 | [83952](https://github.com/airbytehq/airbyte/pull/83952) | Update dependencies |
| 2.10.0 | 2026-07-30 | [83273](https://github.com/airbytehq/airbyte/pull/83273) | Add the `property_metadata` stream with GA4 property metadata from the Admin API |
| 2.9.45 | 2026-07-28 | [82938](https://github.com/airbytehq/airbyte/pull/82938) | Update dependencies |
| 2.9.44 | 2026-07-21 | [82436](https://github.com/airbytehq/airbyte/pull/82436) | Update dependencies |
| 2.9.43 | 2026-07-14 | [81845](https://github.com/airbytehq/airbyte/pull/81845) | Update dependencies |
| 2.9.42 | 2026-06-30 | [81086](https://github.com/airbytehq/airbyte/pull/81086) | Update dependencies |
| 2.9.41 | 2026-06-23 | [80482](https://github.com/airbytehq/airbyte/pull/80482) | Update dependencies |
| 2.9.40 | 2026-06-16 | [79881](https://github.com/airbytehq/airbyte/pull/79881) | Update dependencies |
| 2.9.39 | 2026-06-09 | [79340](https://github.com/airbytehq/airbyte/pull/79340) | Update dependencies |
| 2.9.38 | 2026-06-02 | [77618](https://github.com/airbytehq/airbyte/pull/77618) | Infer `auth_type` from credentials when missing to fix OAuth connection failures |
| 2.9.37 | 2026-06-02 | [77243](https://github.com/airbytehq/airbyte/pull/77243) | Update dependencies |
| 2.9.36 | 2026-05-27 | [77877](https://github.com/airbytehq/airbyte/pull/77877) | Update the connector runtime to the latest CDK version and reduce intermittent stream read hangs |
| 2.9.35 | 2026-05-19 | [PR-pending](https://github.com/airbytehq/airbyte/pull/PR-pending) | Restore `default_concurrency` to 4 after c=6 rollout showed heartbeat timeout outliers |
| 2.9.34 | 2026-05-18 | [78161](https://github.com/airbytehq/airbyte/pull/78161) | Promoted release candidate to GA |
| 2.9.34-rc.2 | 2026-05-01 | [PR-pending](https://github.com/airbytehq/airbyte/pull/PR-pending) | Phase 1 step 3: bump `default_concurrency` 5 to 6 (tier-aware `api_budget` stays live) |
| 2.9.34-rc.1 | 2026-04-29 | [77550](https://github.com/airbytehq/airbyte/pull/77550) | Phase 1 step 2: bump `default_concurrency` 4 to 5 and activate the tier-aware `api_budget` (Standard 10 req/s, Analytics 360 50 req/s on opt-in via `subscription_tier`) |
| 2.9.33-rc.1 | 2026-04-23 | [76956](https://github.com/airbytehq/airbyte/pull/76956) | Add `concurrency_level` (default 4, max 16) and `subscription_tier` spec field (Standard or Analytics 360) for the Path B concurrency tuning rollout (RC); existing and tier-aware `api_budget` kept commented during tuning |
| 2.9.31 | 2026-04-20 | [76185](https://github.com/airbytehq/airbyte/pull/76185) | Surface the GA4 API error message on 400 and 403 responses, and stop retrying permission errors |
| 2.9.30 | 2026-04-14 | [76190](https://github.com/airbytehq/airbyte/pull/76190) | Add access_token to extract_output and complete_oauth_output_specification to fix OAuth secretId 422 regression |
| 2.9.32 | 2026-04-21 | [76600](https://github.com/airbytehq/airbyte/pull/76600) | Update dependencies |
| 2.9.31 | 2026-04-09 | [76185](https://github.com/airbytehq/airbyte/pull/76185) | Improve error messages for HTTP 400/403 responses; use predicate-based 403 handling to distinguish permission errors (config_error) from other 403s (retry) |
| 2.9.30 | 2026-04-09 | [76190](https://github.com/airbytehq/airbyte/pull/76190) | Add access_token to extract_output and complete_oauth_output_specification to fix OAuth secretId 422 regression |
| 2.9.29 | 2026-04-01 | [75580](https://github.com/airbytehq/airbyte/pull/75580) | Add `oauth_connector_input_specification` with granular scopes |
| 2.9.28 | 2026-03-31 | [75678](https://github.com/airbytehq/airbyte/pull/75678) | Update dependencies |
| 2.9.27 | 2026-03-24 | [74568](https://github.com/airbytehq/airbyte/pull/74568) | Update dependencies |
| 2.9.26 | 2026-02-25 | [73632](https://github.com/airbytehq/airbyte/pull/73632) | fix(source-google-analytics-data-api): use GA4 today keyword for timezone-correct end dates (AI-Triage PR) |
| 2.9.25 | 2026-02-24 | [73750](https://github.com/airbytehq/airbyte/pull/73750) | Update dependencies |
| 2.9.24 | 2026-02-17 | [73404](https://github.com/airbytehq/airbyte/pull/73404) | Update dependencies |
| 2.9.23 | 2026-02-10 | [73067](https://github.com/airbytehq/airbyte/pull/73067) | Update dependencies |
| 2.9.22 | 2026-02-03 | [72590](https://github.com/airbytehq/airbyte/pull/72590) | Update dependencies |
| 2.9.21 | 2026-01-20 | [71924](https://github.com/airbytehq/airbyte/pull/71924) | Update dependencies |
| 2.9.20 | 2026-01-14 | [71432](https://github.com/airbytehq/airbyte/pull/71432) | Update dependencies |
| 2.9.19 | 2025-12-18 | [70693](https://github.com/airbytehq/airbyte/pull/70693) | Update dependencies |
| 2.9.18 | 2025-11-25 | [69892](https://github.com/airbytehq/airbyte/pull/69892) | Update dependencies |
| 2.9.17 | 2025-11-18 | [69414](https://github.com/airbytehq/airbyte/pull/69414) | Update dependencies |
| 2.9.16 | 2025-11-12 | [69279](https://github.com/airbytehq/airbyte/pull/69279) | Flag authentication issues as config_error |
| 2.9.15 | 2025-10-29 | [69011](https://github.com/airbytehq/airbyte/pull/69011) | Update dependencies |
| 2.9.14 | 2025-10-21 | [68302](https://github.com/airbytehq/airbyte/pull/68302) | Update dependencies |
| 2.9.13 | 2025-10-14 | [tbd](https://github.com/airbytehq/airbyte/pull/tbd)     | Promoting release candidate 2.9.13-rc.1 to a main version. |
| 2.9.13-rc.1 | 2025-10-08 | [67148](https://github.com/airbytehq/airbyte/pull/67148) | Add dimensionFilter into the body of requests for custom reports and custom DimensionFilterConfigTransformation component                                              |
| 2.9.12 | 2025-10-07 | [67262](https://github.com/airbytehq/airbyte/pull/67262) | Update dependencies |
| 2.9.11 | 2025-09-30 | [66306](https://github.com/airbytehq/airbyte/pull/66306) | Update dependencies |
| 2.9.10 | 2025-09-10 | [66008](https://github.com/airbytehq/airbyte/pull/66008) | Update to CDK v7 |
| 2.9.9 | 2025-09-09 | [65895](https://github.com/airbytehq/airbyte/pull/65895) | Update dependencies |
| 2.9.8 | 2025-08-23 | [65311](https://github.com/airbytehq/airbyte/pull/65311) | Update dependencies |
| 2.9.7 | 2025-08-09 | [64631](https://github.com/airbytehq/airbyte/pull/64631) | Update dependencies |
| 2.9.6 | 2025-08-02 | [64254](https://github.com/airbytehq/airbyte/pull/64254) | Update dependencies |
| 2.9.5 | 2025-07-26 | [63820](https://github.com/airbytehq/airbyte/pull/63820) | Update dependencies |
| 2.9.4 | 2025-07-19 | [63528](https://github.com/airbytehq/airbyte/pull/63528) | Update dependencies |
| 2.9.3 | 2025-07-16 | [63339](https://github.com/airbytehq/airbyte/pull/63339) | Promoting release candidate 2.9.3-rc.2 to a main version. |
| 2.9.3-rc.2 | 2025-07-15 | [63297](https://github.com/airbytehq/airbyte/pull/63297) | Enable progressive rollout |
| 2.9.3-rc.1 | 2025-07-15 | [63297](https://github.com/airbytehq/airbyte/pull/63297) | Fix bug where concurrent partitions are not merged back together properly so sequential state can't progress to the latest record |
| 2.9.2 | 2025-07-12 | [63129](https://github.com/airbytehq/airbyte/pull/63129) | Update dependencies |
| 2.9.1 | 2025-07-05 | [61135](https://github.com/airbytehq/airbyte/pull/61135) | Update dependencies |
| 2.9.0 | 2025-07-03 | [62507](https://github.com/airbytehq/airbyte/pull/62507) | Promoting release candidate 2.9.0-rc.1 to a main version. |
| 2.9.0-rc.1     | 2025-06-30 | [61550](https://github.com/airbytehq/airbyte/pull/61550) | Unwrap to manifest-only                                                                                                                                                |
| 2.8.2          | 2025-06-17 | [61678](https://github.com/airbytehq/airbyte/pull/61678) | Bump Memory on CHECK to 1600Mi |
| 2.8.1          | 2025-06-12 | [61555](https://github.com/airbytehq/airbyte/pull/61555) | Fixes time data parsing issue |
| 2.8.0          | 2025-06-11 | [61533](https://github.com/airbytehq/airbyte/pull/61533) | Promoting release candidate 2.8.0-rc.2 to a main version. |
| 2.8.0-rc.2     | 2025-06-11 | [61491](https://github.com/airbytehq/airbyte/pull/61491) | Fixed cohort check, record extractor and discovery                                                                                                                     |
| 2.8.0-rc.1     | 2025-05-20 | [60342](https://github.com/airbytehq/airbyte/pull/60342) | Migrate to low-code                                                                                                                                                    |
| 2.7.7          | 2025-05-17 | [60708](https://github.com/airbytehq/airbyte/pull/60708) | Update dependencies                                                                                                                                                    |
| 2.7.6          | 2025-05-10 | [59870](https://github.com/airbytehq/airbyte/pull/59870) | Update dependencies                                                                                                                                                    |
| 2.7.5          | 2025-05-03 | [59225](https://github.com/airbytehq/airbyte/pull/59225) | Update dependencies                                                                                                                                                    |
| 2.7.4          | 2025-04-26 | [58808](https://github.com/airbytehq/airbyte/pull/58808) | Update dependencies                                                                                                                                                    |
| 2.7.3          | 2025-04-12 | [57703](https://github.com/airbytehq/airbyte/pull/57703) | Update dependencies                                                                                                                                                    |
| 2.7.2          | 2025-04-05 | [57063](https://github.com/airbytehq/airbyte/pull/57063) | Update dependencies                                                                                                                                                    |
| 2.7.1          | 2025-03-29 | [50048](https://github.com/airbytehq/airbyte/pull/50048) | Update dependencies                                                                                                                                                    |
| 2.7.0          | 2025-02-12 | [48381](https://github.com/airbytehq/airbyte/pull/48381) | add end date optional parameter                                                                                                                                        |
| 2.6.2          | 2024-12-14 | [48649](https://github.com/airbytehq/airbyte/pull/48649) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 2.6.1          | 2024-10-29 | [47899](https://github.com/airbytehq/airbyte/pull/47899) | Update dependencies                                                                                                                                                    |
| 2.6.0          | 2024-10-28 | [47013](https://github.com/airbytehq/airbyte/pull/47013) | Migrate to CDK v5                                                                                                                                                      |
| 2.5.13         | 2024-10-28 | [47061](https://github.com/airbytehq/airbyte/pull/47061) | Update dependencies                                                                                                                                                    |
| 2.5.12         | 2024-10-12 | [46819](https://github.com/airbytehq/airbyte/pull/46819) | Update dependencies                                                                                                                                                    |
| 2.5.11         | 2024-10-05 | [46475](https://github.com/airbytehq/airbyte/pull/46475) | Update dependencies                                                                                                                                                    |
| 2.5.10         | 2024-09-28 | [46158](https://github.com/airbytehq/airbyte/pull/46158) | Update dependencies                                                                                                                                                    |
| 2.5.9          | 2024-09-21 | [45773](https://github.com/airbytehq/airbyte/pull/45773) | Update dependencies                                                                                                                                                    |
| 2.5.8          | 2024-09-14 | [45503](https://github.com/airbytehq/airbyte/pull/45503) | Update dependencies                                                                                                                                                    |
| 2.5.7          | 2024-09-07 | [45289](https://github.com/airbytehq/airbyte/pull/45289) | Update dependencies                                                                                                                                                    |
| 2.5.6          | 2024-08-31 | [44980](https://github.com/airbytehq/airbyte/pull/44980) | Update dependencies                                                                                                                                                    |
| 2.5.5          | 2024-08-24 | [44645](https://github.com/airbytehq/airbyte/pull/44645) | Update dependencies                                                                                                                                                    |
| 2.5.4          | 2024-08-17 | [44337](https://github.com/airbytehq/airbyte/pull/44337) | Update dependencies                                                                                                                                                    |
| 2.5.3          | 2024-08-13 | [43929](https://github.com/airbytehq/airbyte/pull/43929) | Increase streams max_time to backoff                                                                                                                                   |
| 2.5.2          | 2024-08-12 | [43909](https://github.com/airbytehq/airbyte/pull/43909) | Update dependencies                                                                                                                                                    |
| 2.5.1          | 2024-08-10 | [43289](https://github.com/airbytehq/airbyte/pull/43289) | Update dependencies                                                                                                                                                    |
| 2.5.0          | 2024-08-07 | [42841](https://github.com/airbytehq/airbyte/pull/42841) | Upgrade to CDK 3                                                                                                                                                       |
| 2.4.14         | 2024-07-27 | [42746](https://github.com/airbytehq/airbyte/pull/42746) | Update dependencies                                                                                                                                                    |
| 2.4.13         | 2024-07-20 | [42347](https://github.com/airbytehq/airbyte/pull/42347) | Update dependencies                                                                                                                                                    |
| 2.4.12         | 2024-07-13 | [41801](https://github.com/airbytehq/airbyte/pull/41801) | Update dependencies                                                                                                                                                    |
| 2.4.11         | 2024-07-10 | [41561](https://github.com/airbytehq/airbyte/pull/41561) | Update dependencies                                                                                                                                                    |
| 2.4.10         | 2024-07-09 | [41295](https://github.com/airbytehq/airbyte/pull/41295) | Update dependencies                                                                                                                                                    |
| 2.4.9          | 2024-07-06 | [40935](https://github.com/airbytehq/airbyte/pull/40935) | Update dependencies                                                                                                                                                    |
| 2.4.8          | 2024-06-25 | [40429](https://github.com/airbytehq/airbyte/pull/40429) | Update dependencies                                                                                                                                                    |
| 2.4.7          | 2024-06-22 | [40140](https://github.com/airbytehq/airbyte/pull/40140) | Update dependencies                                                                                                                                                    |
| 2.4.6          | 2024-06-21 | [39916](https://github.com/airbytehq/airbyte/pull/39916) | Added ability to skip `missing stream` in the CATALOG                                                                                                                  |
| 2.4.5          | 2024-06-06 | [38884](https://github.com/airbytehq/airbyte/pull/38884) | Make lookback window configurable.                                                                                                                                     |
| 2.4.4          | 2024-06-06 | [39209](https://github.com/airbytehq/airbyte/pull/39209) | [autopull] Upgrade base image to v1.2.2                                                                                                                                |
| 2.4.3          | 2024-06-03 | [38865](https://github.com/airbytehq/airbyte/pull/38865) | Enforce unique property IDs                                                                                                                                            |
| 2.4.2          | 2024-03-20 | [36302](https://github.com/airbytehq/airbyte/pull/36302) | Don't extract state from the latest record if stream doesn't have a cursor_field                                                                                       |
| 2.4.1          | 2024-02-09 | [35073](https://github.com/airbytehq/airbyte/pull/35073) | Manage dependencies with Poetry.                                                                                                                                       |
| 2.4.0          | 2024-02-07 | [34951](https://github.com/airbytehq/airbyte/pull/34951) | Replace the spec parameter from previous version to convert all `conversions:*` fields                                                                                 |
| 2.3.0          | 2024-02-06 | [34907](https://github.com/airbytehq/airbyte/pull/34907) | Add new parameter to spec to convert `conversions:purchase` field to float                                                                                             |
| 2.2.2          | 2024-02-01 | [34708](https://github.com/airbytehq/airbyte/pull/34708) | Add rounding integer values that may be float                                                                                                                          |
| 2.2.1          | 2024-01-18 | [34352](https://github.com/airbytehq/airbyte/pull/34352) | Add incorrect custom reports config handling                                                                                                                           |
| 2.2.0          | 2024-01-10 | [34176](https://github.com/airbytehq/airbyte/pull/34176) | Add a report option keepEmptyRows                                                                                                                                      |
| 2.1.1          | 2024-01-08 | [34018](https://github.com/airbytehq/airbyte/pull/34018) | prepare for airbyte-lib                                                                                                                                                |
| 2.1.0          | 2023-12-28 | [33802](https://github.com/airbytehq/airbyte/pull/33802) | Add `CohortSpec` to custom report in specification                                                                                                                     |
| 2.0.3          | 2023-11-03 | [32149](https://github.com/airbytehq/airbyte/pull/32149) | Fixed bug with missing `metadata` when the credentials are not valid                                                                                                   |
| 2.0.2          | 2023-11-02 | [32094](https://github.com/airbytehq/airbyte/pull/32094) | Added handling for `JSONDecodeError` while checking for `api qouta` limits                                                                                             |
| 2.0.1          | 2023-10-18 | [31543](https://github.com/airbytehq/airbyte/pull/31543) | Base image migration: remove Dockerfile and use the python-connector-base image                                                                                        |
| 2.0.0          | 2023-09-29 | [30930](https://github.com/airbytehq/airbyte/pull/30930) | Use distinct stream naming in case there are multiple properties in the config.                                                                                        |
| 1.6.0          | 2023-09-19 | [30460](https://github.com/airbytehq/airbyte/pull/30460) | Migrated custom reports from string to array; add `FilterExpressions` support                                                                                          |
| 1.5.1          | 2023-09-20 | [30608](https://github.com/airbytehq/airbyte/pull/30608) | Revert `:` auto replacement name to underscore                                                                                                                         |
| 1.5.0          | 2023-09-18 | [30421](https://github.com/airbytehq/airbyte/pull/30421) | Add `yearWeek`, `yearMonth`, `year` dimensions cursor                                                                                                                  |
| 1.4.1          | 2023-09-17 | [30506](https://github.com/airbytehq/airbyte/pull/30506) | Fix None type error when metrics or dimensions response does not have name                                                                                             |
| 1.4.0          | 2023-09-15 | [30417](https://github.com/airbytehq/airbyte/pull/30417) | Change start date to optional; add suggested streams and update errors handling                                                                                        |
| 1.3.1          | 2023-09-14 | [30424](https://github.com/airbytehq/airbyte/pull/30424) | Fixed duplicated stream issue                                                                                                                                          |
| 1.3.0          | 2023-09-13 | [30152](https://github.com/airbytehq/airbyte/pull/30152) | Ability to add multiple property ids                                                                                                                                   |
| 1.2.0          | 2023-09-11 | [30290](https://github.com/airbytehq/airbyte/pull/30290) | Add new preconfigured reports                                                                                                                                          |
| 1.1.3          | 2023-08-04 | [29103](https://github.com/airbytehq/airbyte/pull/29103) | Update input field descriptions                                                                                                                                        |
| 1.1.2          | 2023-07-03 | [27909](https://github.com/airbytehq/airbyte/pull/27909) | Limit the page size of custom report streams                                                                                                                           |
| 1.1.1          | 2023-06-26 | [27718](https://github.com/airbytehq/airbyte/pull/27718) | Limit the page size when calling `check()`                                                                                                                             |
| 1.1.0          | 2023-06-26 | [27738](https://github.com/airbytehq/airbyte/pull/27738) | License Update: Elv2                                                                                                                                                   |
| 1.0.0          | 2023-06-22 | [26283](https://github.com/airbytehq/airbyte/pull/26283) | Added primary_key and lookback window                                                                                                                                  |
| 0.2.7          | 2023-06-21 | [27531](https://github.com/airbytehq/airbyte/pull/27531) | Fix formatting                                                                                                                                                         |
| 0.2.6          | 2023-06-09 | [27207](https://github.com/airbytehq/airbyte/pull/27207) | Improve api rate limit messages                                                                                                                                        |
| 0.2.5          | 2023-06-08 | [27175](https://github.com/airbytehq/airbyte/pull/27175) | Improve Error Messages                                                                                                                                                 |
| 0.2.4          | 2023-06-01 | [26887](https://github.com/airbytehq/airbyte/pull/26887) | Remove `authSpecification` from connector spec in favour of `advancedAuth`                                                                                             |
| 0.2.3          | 2023-05-16 | [26126](https://github.com/airbytehq/airbyte/pull/26126) | Fix pagination                                                                                                                                                         |
| 0.2.2          | 2023-05-12 | [25987](https://github.com/airbytehq/airbyte/pull/25987) | Categorized Config Errors Accurately                                                                                                                                   |
| 0.2.1          | 2023-05-11 | [26008](https://github.com/airbytehq/airbyte/pull/26008) | Added handling for `429 - potentiallyThresholdedRequestsPerHour` error                                                                                                 |
| 0.2.0          | 2023-04-13 | [25179](https://github.com/airbytehq/airbyte/pull/25179) | Implement support for custom Cohort and Pivot reports                                                                                                                  |
| 0.1.3          | 2023-03-10 | [23872](https://github.com/airbytehq/airbyte/pull/23872) | Fix parse + cursor for custom reports                                                                                                                                  |
| 0.1.2          | 2023-03-07 | [23822](https://github.com/airbytehq/airbyte/pull/23822) | Improve `rate limits` customer faced error messages and retry logic for `429`                                                                                          |
| 0.1.1          | 2023-01-10 | [21169](https://github.com/airbytehq/airbyte/pull/21169) | Slicer updated, unit tests added                                                                                                                                       |
| 0.1.0          | 2023-01-08 | [20889](https://github.com/airbytehq/airbyte/pull/20889) | Improved config validation, SAT                                                                                                                                        |
| 0.0.3          | 2022-08-15 | [15229](https://github.com/airbytehq/airbyte/pull/15229) | Source Google Analytics Data Api: code refactoring                                                                                                                     |
| 0.0.2          | 2022-07-27 | [15087](https://github.com/airbytehq/airbyte/pull/15087) | fix documentationUrl                                                                                                                                                   |
| 0.0.1          | 2022-05-09 | [12701](https://github.com/airbytehq/airbyte/pull/12701) | Introduce Google Analytics Data API source                                                                                                                             |

</details>
