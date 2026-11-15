---
generated_record: true
connector_name: Google Ads
connector_type: source
connector_slug: google-ads
connector_directory: source-google-ads
definition_id: 253487c0-2246-43ba-a21f-5116b20a2c50
version: 6.1.11
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/google-ads
logo: /images/connectors/sources/google-ads.svg
logo_source_path: airbyte-integrations/connectors/source-google-ads/icon.svg
logo_sha256: 9b9900f1bc0472dba9edc45a9268792ce92bfb3362f64ff8b7a071159418ea15
original_metadata_path: airbyte-integrations/connectors/source-google-ads/metadata.yaml
original_metadata_sha256: 6279e270b86d660b2b4c6157af5a4ede165c08182fe132910c3d1c9cf9205543
original_document_path: docs/integrations/sources/google-ads.md
original_document_sha256: fadec9a1202dfc05a2167063a3f193f5914db85656229ded7b83ef143c5b2193
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7c85aae98be663810ee4a2ac235b2841750f631e9d194acc8fd05cdcda4fd84c
rewritten_at: 2026-11-12T14:08:53.889073+00:00
---

# Google Ads

<HideInUI>

Use this page to set up and reference the [Google Ads](https://developers.google.com) source connector.

</HideInUI>

## Prerequisites

- A [Google Ads Account](https://support.google.com/google-ads/answer/6366720) [linked](https://support.google.com/google-ads/answer/7459601) to a Google Ads Manager account
<!-- env:oss -->
- For Airbyte Open Source:
  - Google Ads API access (Basic or Standard) for the Google Cloud project that owns your OAuth client (see Step 1)
  - OAuth credentials to authenticate your Google account
  <!-- /env:oss -->

## Setup

### Set up Google Ads

<!-- env:oss -->

#### Step 1: Get Google Ads API access for Airbyte Open Source

Google Ads API access belongs to the Google Cloud project that owns your OAuth client, not a developer token. Google sunset developer tokens on September 9, 2026. Existing tokens still work and remain valid Airbyte entries. However, Google ignores them and no longer issues new tokens through the Google Ads manager account API Center. See Google's [developer token sunset guide](https://developers.google.com/google-ads/api/docs/api-policy/developer-token).

1. Create or choose the [Google Cloud project](https://console.cloud.google.com/) that will own the OAuth client you use in Step 2.
2. Open the project's **Google Ads API Overview** page in the Google Cloud Console and apply for API access. New Basic and Standard access applications require project [brand verification](https://developers.google.com/google-ads/api/docs/api-policy/developer-token). Basic access receives automatic approval within minutes after verification.
3. Confirm that the project shows at least **Basic** access. Projects with only Test access can't read production Google Ads accounts. They fail with `ACTION_NOT_PERMITTED`, or `CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION` on newer API versions.

:::note
Google transferred approved developer-token access to every Google Cloud project that used the token before September 9, 2026. This transfer covered the preceding 90 days. If your OAuth client's project didn't inherit access, apply through that project's Google Ads API Overview page. Airbyte still requires a value in the **Developer Token** field. Enter your existing token or any non-empty placeholder, such as `placeholder`, if you never had one. Google rejects an empty value with `DEVELOPER_TOKEN_PARAMETER_MISSING`.
:::

#### Step 2: Get OAuth credentials for Airbyte Open Source

For Airbyte Open Source, get these OAuth credentials to authenticate your Google Ads account:

- Client ID
- Client Secret
- Refresh Token

Follow [Google's documentation](https://developers.google.com/identity/protocols/oauth2) for detailed instructions on getting these credentials.

One access token can provide different access levels across multiple APIs. A variable parameter called scope controls which resources and operations the token permits. Your app sends one or more values in the scope parameter when requesting the access token.

Use this scope for the Google Ads API: https://www.googleapis.com/auth/adwords

Each Google Cloud project's OAuth client has an access level and "permissible use". The access level controls production-account access and the daily number of permitted operations and requests. Permissible use controls which Google Ads API features the project can use. Read [Google's access levels documentation](https://developers.google.com/google-ads/api/docs/productionize/access-levels) for details and to apply for higher access.

### Step 3: Set up the connector in Airbyte

<!-- /env:oss -->

<!-- env:cloud -->

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Google Ads from the Source type dropdown.
4. Enter a name for the Google Ads connector.
5. Click **Sign in with Google** to authenticate your Google Ads account. In the pop-up, select the appropriate Google account. Click **Continue** to continue.

##### Optional: Use your Google OAuth app

Airbyte Cloud normally uses Airbyte-managed OAuth client credentials for the Google Ads source. To use your own Google OAuth app, create OAuth override credentials.

Create the override first, then click **Sign in with Google**.

Use the Airbyte API to create OAuth override credentials for the workspace or organization. For the workspace endpoint, see [Create OAuth override credentials for a workspace and source type](https://reference.airbyte.com/reference/workspaceoauthcredentials). For the organization endpoint, see [Create OAuth override credentials for an organization and source type](https://reference.airbyte.com/reference/createorupdateorganizationoauthcredentials).

For Google Ads, set `actorType` to `source` and `name` to `google-ads`. Include your Google OAuth app credentials and Google Ads developer token in `configuration.credentials`.

Google has ignored the `developer_token` value since September 9, 2026. See the [developer token sunset guide](https://developers.google.com/google-ads/api/docs/api-policy/developer-token). The connector still requires this field. Pass your existing token or any non-empty placeholder because Google rejects an empty string. API access belongs to the Google Cloud project that owns your OAuth app. Confirm that the project has at least Basic access on its Google Ads API Overview page.

```json
{
  "actorType": "source",
  "name": "google-ads",
  "configuration": {
    "credentials": {
      "client_id": "<your-google-oauth-client-id>",
      "client_secret": "<your-google-oauth-client-secret>",
      "developer_token": "<your-google-ads-developer-token>"
    }
  }
}
```

After creating the override, click **Sign in with Google** and authorise the source. The authorisation server must issue the refresh token for the Google OAuth app credentials Airbyte uses to refresh it. If you change those credentials, authorise the source again.

<FieldAnchor field="customer_id">
6. (Optional) Enter a comma-separated list of your account's **Customer ID(s)**. These 10-digit numbers uniquely identify your account. Follow [Google's instructions](https://support.google.com/google-ads/answer/1704344) to find your Customer ID. Leave this field blank to replicate data from all connected accounts.

:::note
If you access your account through a Google Ads Manager account, enter the Manager account's [**Customer ID**](https://developers.google.com/google-ads/api/docs/concepts/call-structure#cid).
:::
</FieldAnchor>

<FieldAnchor field="customer_status_filter">
7. (Optional) Enter customer statuses to filter customers. Leave this field blank to replicate data from all accounts. See [Google Ads documentation](https://developers.google.com/google-ads/api/reference/rpc/v23/CustomerStatusEnum.CustomerStatus) for details.
</FieldAnchor>

<FieldAnchor field="start_date">
8. (Optional) Enter a **Start Date** using the datepicker or programmatically in YYYY-MM-DD format. The connector replicates data added on or after this date. The default start date is two years ago.
</FieldAnchor>

9. (Optional) Use the **Custom GAQL Queries** field to enter a custom Google Ads Query Language query. Click **Add** and enter your query. Also enter the destination table's preferred name. You can provide multiple queries. See our [guide below](#custom-query-understanding-google-ads-query-language) for guidance on writing them.

<FieldAnchor field="conversion_window_days">
10. (Optional) Enter a **Conversion Window**. This value sets how many days after an ad interaction Google Ads records a conversion. See the [Google Ads Help Center](https://support.google.com/google-ads/answer/3123169?hl=en) for details. This field defaults to 14 days.
</FieldAnchor>

<FieldAnchor field="end_date">
11. (Optional) Enter an **End Date** in YYYY-MM-DD format. The connector won't replicate data added after this date. Leave this field blank to replicate all data from the start date onwards.
</FieldAnchor>

12. Click **Set up source** and wait for the tests to finish.
<!-- /env:cloud -->

<!-- env:oss -->

#### Airbyte Open Source

1. Open the Airbyte Open Source dashboard.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **Google Ads** from the available sources.
4. Enter your preferred **Source name**.
5. Enter a **Developer Token**. Google has ignored this value since September 9, 2026. Use your existing token or any non-empty placeholder.
6. Enter your Google application's **Client ID**, **Client Secret** and **Refresh Token** to authenticate your Google account. You can also enter the optional **Access Token**.
7. (Optional) Enter a comma-separated list of your account's **Customer ID(s)**. These 10-digit numbers uniquely identify your account. Follow [Google's instructions](https://support.google.com/google-ads/answer/1704344) to find your Customer ID. Leave this field blank to replicate data from all connected accounts.
8. (Optional) Enter customer statuses to filter customers. Leave this field blank to replicate data from all accounts. See [Google Ads documentation](https://developers.google.com/google-ads/api/reference/rpc/v23/CustomerStatusEnum.CustomerStatus) for details.
9. (Optional) Enter a **Start Date** using the datepicker or programmatically in YYYY-MM-DD format. The connector replicates data added on or after this date. The default start date is two years ago.
10. (Optional) Use the **Custom GAQL Queries** field to enter a custom Google Ads Query Language query. Click **Add** and enter your query. Also enter the destination table's preferred name. You can provide multiple queries. See our [guide below](#custom-query-understanding-google-ads-query-language) for guidance on writing them.
11. (Required for Manager accounts) When accessing your account through a Google Ads Manager account, enter the Manager account's [**Customer ID**](https://developers.google.com/google-ads/api/docs/concepts/call-structure#cid).
12. (Optional) Enter a **Conversion Window**. This value sets how many days after an ad interaction Google Ads records a conversion. See [Conversion Windows](#note-on-conversion-windows) below or the [Google Ads Help Center](https://support.google.com/google-ads/answer/3123169?hl=en) for details. This field defaults to 14 days.
13. (Optional) Enter an **End Date** in YYYY-MM-DD format. The connector won't replicate data added after this date. Leave this field blank to replicate all data from the start date onwards.
14. Click **Set up source** and wait for the tests to finish.

<!-- /env:oss -->
<HideInUI>

## Supported sync modes

The Google Ads source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental Sync - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental Sync - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

**Incremental Events Streams:**

Streams:

- [ad_group_criterions](https://developers.google.com/google-ads/api/fields/v23/ad_group_criterion)
- [ad_listing_group_criterions](https://developers.google.com/google-ads/api/fields/v23/ad_group_criterion)
- [campaign_criterion](https://developers.google.com/google-ads/api/fields/v23/campaign_criterion)

These streams support incremental updates and deletions through the Change Status stream. However, they capture updates from only the latest three months.

The initial sync runs as a full refresh. Later syncs first read updates from the Change Status stream. They then sync records by ID.

:::warning
The Google Ads API resource ChangeStatus allows up to 10,000 records per request. You can't sync a stream with more than 10,000 updates in one microsecond. In this case, use a full refresh sync to capture every update.
:::

## Supported streams

The Google Ads source connector can sync the following tables and custom GAQL queries.

### Main tables

- [customer](https://developers.google.com/google-ads/api/fields/v23/customer)

Shows a Google Ads account's setup and configuration. It covers features such as call reporting and conversion tracking. Together, these provide a clear view of the account's operational settings and features.

- [customer_label](https://developers.google.com/google-ads/api/fields/v23/customer_label)
- [campaign_criterion](https://developers.google.com/google-ads/api/fields/v23/campaign_criterion)

A campaign targeting option, such as a keyword, placement or audience.

- [campaign_bidding_strategy](https://developers.google.com/google-ads/api/fields/v23/campaign)

Represents the campaign-level bidding strategy.

- [campaign_label](https://developers.google.com/google-ads/api/fields/v23/campaign_label)
- [label](https://developers.google.com/google-ads/api/fields/v23/label)

Represents labels attached to entities such as campaigns or ads.

- [ad_group_ad](https://developers.google.com/google-ads/api/fields/v23/ad_group_ad)

Shows date-segmented ad attributes from ad groups.

- [ad_performance](https://developers.google.com/google-ads/api/fields/v23/ad_group_ad)

Provides an ad-level performance report built on the `ad_group_ad` resource. It includes ad identity dimensions and performance metrics. These metrics cover clicks, impressions, cost, conversions, video and active-view metrics. Data is segmented by date, ad network and device. This report is available only for non-manager accounts.

- [ad_group_ad_label](https://developers.google.com/google-ads/api/fields/v23/ad_group_ad_label)
- [ad_group](https://developers.google.com/google-ads/api/fields/v23/ad_group)

Represents an ad group within a campaign. Ad groups contain one or more ads targeting a shared keyword set.

- [ad_group_label](https://developers.google.com/google-ads/api/fields/v23/ad_group_label)
- [ad_group_bidding_strategy](https://developers.google.com/google-ads/api/fields/v23/ad_group)

Represents the ad-group-level bidding strategy.

- [ad_group_criterion](https://developers.google.com/google-ads/api/fields/v23/ad_group_criterion)

Represents criteria in an ad group, such as keywords or placements.

- [ad_listing_group_criterion](https://developers.google.com/google-ads/api/fields/v23/ad_group_criterion)

Represents criteria for listing group ads.

- [ad_group_criterion_label](https://developers.google.com/google-ads/api/fields/v23/ad_group_criterion_label)
- [audience](https://developers.google.com/google-ads/api/fields/v23/audience)

Represents advertiser-defined user lists for targeting specific users.

- [user_interest](https://developers.google.com/google-ads/api/fields/v23/user_interest)

Represents a specific interest-based vertical for targeting.

- [click_view](https://developers.google.com/google-ads/api/reference/rpc/v23/ClickView)

Provides a click view with metrics aggregated at each click level, including valid and invalid clicks.

The `ad_group`, `ad_group_ad` and `campaign` streams contain a `labels` field. Join this field to each stream's corresponding `*_label` stream to view the labels. For example, join the `ad_group` stream's `ad_group.labels` field to the `ad_group_label` stream's `label.resource_name` field.

### Report tables

- [account_performance_report](https://developers.google.com/google-ads/api/fields/v23/overview)

Provides detailed ad-interaction metrics, including viewability, click-through rates and conversions. It segments data by several factors, showing how ads perform across different contexts.

- [campaign](https://developers.google.com/google-ads/api/fields/v23/campaign)

Represents a Google Ads campaign.

- [campaign_budget](https://developers.google.com/google-ads/api/fields/v23/campaign_budget)

Represents a campaign's budget settings.

- [geographic_view](https://developers.google.com/google-ads/api/fields/v23/geographic_view)

Geographic View provides dimension fields aggregated at country level, including country, location type and ad group. It reports either the user's physical location or an area of interest. This stream doesn't include performance metrics. Use `geographic_view_with_metrics` for metrics such as clicks, impressions and conversions.

- [geographic_view_with_metrics](https://developers.google.com/google-ads/api/fields/v23/geographic_view)

An enhanced version of `geographic_view` that adds performance metrics to dimension fields. Metrics include clicks, impressions, cost, conversions and CTR. Use this stream for geographic performance data.

- [geo_performance](https://developers.google.com/google-ads/api/fields/v23/geographic_view)

Provides a geographic performance report built on the `geographic_view` resource. It adds detailed geo-target segments for region, metro, city and most specific location. It also includes device and ad network segments with performance metrics. This report is available only for non-manager accounts. Resolve the `segments.geo_target_*` resource names against the `geo_target_constant` resource for readable location names.

- [user_location_view](https://developers.google.com/google-ads/api/fields/v23/user_location_view)

User Location View includes all metrics aggregated at country level. It reports metrics for the user's physical location, split by targeted or untargeted location.

- [display_keyword_view](https://developers.google.com/google-ads/api/fields/v23/display_keyword_view)

Provides metrics for display keywords targeted in display campaigns.

- [topic_view](https://developers.google.com/google-ads/api/fields/v23/topic_view)

Provides a reporting view with metrics aggregated by topic. Topics are broad categories of user interests.

- [shopping_performance_view](https://developers.google.com/google-ads/api/fields/v23/shopping_performance_view)

Provides Shopping campaign statistics aggregated across several product dimension levels. Merchant Center dimensions include brand, category, custom attributes, product condition and product type. Their values reflect each dimension's state when the corresponding event was recorded.

- [keyword_view](https://developers.google.com/google-ads/api/fields/v23/keyword_view)

Provides campaign keyword performance metrics.

- [ad_group_ad_legacy](https://developers.google.com/google-ads/api/fields/v23/ad_group_ad)

Provides metrics and attributes for legacy ads from ad groups.

:::note
Google Ads API constraints require the `click_view` stream to retrieve data one day at a time. It can retrieve only data from the past 90 days. You can't request [metrics](https://developers.google.com/google-ads/api/fields/v23/metrics) for a Google Ads Manager account. Report streams are available only when retrieving data from a non-manager account.
:::

:::warning
Google Ads supports `PERFORMANCE_MAX` campaigns only at the `campaign` level. It doesn't support them at the `ad_group` or `ad` stream level.
Google removes this campaign type from `ads` report results.
See [info](https://github.com/airbytehq/airbyte/issues/11062) and [Google Discussions](https://groups.google.com/g/adwords-api/c/_mxbgNckaLQ).
:::

:::note
Streams with metric fields may return fewer rows than dimension-only streams for the same resource. Metric fields include clicks, impressions, cost and conversions. This happens because the [Google Ads API omits rows where all metrics are zero](https://developers.google.com/google-ads/api/docs/reporting/zero-impressions) when the query includes metrics. Omitted rows represent entity and segment combinations with no recorded activity.
:::

Incremental streams sync data through the previous day, based on your Google Ads account time zone. Google Ads can filter data only by [date](https://developers.google.com/google-ads/api/fields/v23/ad_group_ad#segments.date) without time. Some reports also can't load data in real time because of [Google Ads limitations](https://support.google.com/google-ads/answer/2544985?hl=en).

From connector version 6.0.0, the [Google Ads Data Retention Policy](https://support.google.com/google-ads/answer/15188209) limits report streams and custom queries using `segments.date` to 37 months. The connector skips older data. If your configured `start_date` is older, the connector uses a date 37 months ago as the effective start. If `start_date` and `end_date` are both outside this window, the connector emits no records for that historical range. When upgrading from version 5.x or earlier, see the [migration guide](/integrations/sources/google-ads-migrations) for guidance on preserving historical destination data.

### Primary key selection

Primary keys uniquely identify records within streams. Selection considers the ID uniqueness scope described in [the Google Ads API structure documentation](https://developers.google.com/google-ads/api/docs/concepts/api-structure#object_ids). This approach keeps each record unique across different scopes and contexts. Segmentation is also essential for analysing performance data in the Google Ads API. As [the Google Ads support documentation](https://developers.google.com/google-ads/api/docs/reporting/segmentation) explains, segments provide detailed data by criteria such as device type or click interactions.

</HideInUI>

<FieldAnchor field="custom_queries_array">
## Understand custom GAQL queries

Create additional Google Ads streams dynamically with custom queries.

Google Ads Query Language queries the Google Ads API. Review the [Google Ads Query Language](https://developers.google.com/google-ads/api/docs/query/overview) and [query builder](https://developers.google.com/google-ads/api/fields/v23/query_validator) to validate your query. Then add the query when configuring the Google Ads source.

Example GAQL custom query:

```
SELECT
    campaign.name,
    metrics.conversions,
    metrics.conversions_by_conversion_date
FROM ad_group
```

The connector automatically adds `segments.date` to the `WHERE` clause when the `SELECT` clause includes it. Custom queries containing `segments.date` sync one day at a time. From connector version 6.0.0, these queries share the built-in report streams' 37-month granular data retention window. The connector skips older report slices. See the [migration guide](/integrations/sources/google-ads-migrations) for upgrade guidance.

Each configured custom query must work for every customer account ID. Otherwise, every query failing validation skips that customer ID. For example, queries with metric fields in the select clause won't run against manager accounts.

Follow Google's guidance on [Selectability between segments and metrics](https://developers.google.com/google-ads/api/docs/reporting/segmentation#selectability_between_segments_and_metrics) when editing custom queries or default stream schemas. The connector also converts default stream schemas into GAQL queries. Fields such as `segments.keyword.info.text`, `segments.keyword.info.match_type` and `segments.keyword.ad_group_criterion` in the `SELECT` clause return only rows containing keywords. They remove any row without an associated keyword. This behaviour is often unclear and unwanted, and it can cause missing data records. If you need this field, add a new stream instead of editing an existing one.

:::info
After updating or removing Custom GAQL Queries from an existing Google Ads source, refresh the source schema to retrieve your changes.
:::

:::note
Custom queries using `click_view` as the resource have the same limits as the built-in `click_view` stream. They retrieve only the past 90 days and sync one day at a time.
:::

:::note
Custom GAQL queries sync selected MESSAGE-type fields as JSON-encoded strings. Examples include `change_event.old_resource` and `change_event.new_resource` on the `change_event` resource. Parse these values downstream to read individual nested fields.
:::
</FieldAnchor>

<HideInUI>
## Manager and client accounts

A manager account isn't an "upgrade" of your Google Ads account. It's a separate Google Ads account that you create. Think of it as an umbrella account linked to several individual Google Ads accounts. You can link new or existing Google Ads accounts and other manager accounts.

You can monitor ad performance, update campaigns and manage other tasks for those client accounts. Your manager account can also own a client account. This ownership lets you manage user access for the client account.

See [Link](https://support.google.com/google-ads/answer/6139186?hl=en#) for details about how it works and how to create one.

**Manager Accounts (MCC)** mainly focus on account management and oversight. They can access and manage multiple client accounts and view shared resources. They can also handle invitations to link client accounts.

**Client Accounts** focus more on operations. They cover campaign management, bidding, keywords, targeting, extensions, metrics, reporting, billing and other ad-specific functions.

Both account types can access many API resources, but their scope and purpose differ. Manager accounts provide broader oversight. Client accounts focus on specific advertising operations.

For details, see the [official documentation.](https://developers.google.com/google-ads/api/fields/v23/overview).

## Conversion windows

In digital advertising, a 'conversion' usually means a user completes a desired action after viewing or interacting with an ad. Examples include visiting the advertiser's website, subscribing to a newsletter or making a purchase. The conversion window covers the period when an action can still receive credit for that ad.

For example, an online shoe shop runs an advert with a 30-day conversion window. If you click today, purchases made on its site within 30 days count as conversions from that advert.
The conversion window's length can vary with the advertiser's goals and the product or service. A business might choose a shorter window for a limited-time offer. It might choose a longer window for a product that customers consider before buying.

The conversion window helps measure an advertising campaign's effectiveness. Tracking actions after an ad view or interaction shows businesses how their ads perform. They can then adjust their strategies accordingly.

During each sync, the Google Ads source connector retrieves all conversions active within the specified conversion window. With a 30-day window, each sync retrieves all conversions active during the past 30 days. As a result, the same campaigns, ad groups or ads may appear to have different conversion numbers. Each record accurately shows that resource's conversion count when the connector extracted data from the Google Ads API.

</HideInUI>

## IP allow list

If you use Airbyte Cloud and your organization restricts access by IP, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

<HideInUI>

## Performance considerations

The [Google Ads API limits](https://developers.google.com/google-ads/api/docs/best-practices/quotas) constrains this source.

The Google Ads API can't provide performance data at a level smaller than one day. Therefore, the Google Ads connector usually retrieves data through the previous day. For example, a sync at 5 PM on Wednesday retrieves data through Tuesday at midnight. It exports Wednesday's data only during a later sync, such as one at 12:01 AM on Thursday. This approach avoids syncing partial performance data and resyncing it after Google records the full day. Without it, Wednesday's 5 PM sync would retrieve Wednesday's performance data from 12:01 AM to 5 PM. Another sync would then be needed after the day ends to retrieve all Wednesday data.
</HideInUI>

## Changelog

<details>
  <summary>Expand to review</summary>

| Version     | Date       | Pull Request                                             | Subject                                                                                                                                                                |
|:------------|:-----------|:---------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 6.1.11 | 2026-11-10 | [91581](https://github.com/airbytehq/airbyte/pull/91581) | Update dependencies |
| 6.1.10 | 2026-11-03 | [90953](https://github.com/airbytehq/airbyte/pull/90953) | Raise the minimum supported Python version to 3.11 |
| 6.1.9 | 2026-11-03 | [90594](https://github.com/airbytehq/airbyte/pull/90594) | Update dependencies |
| 6.1.8 | 2026-11-02 | [88944](https://github.com/airbytehq/airbyte/pull/88944) | Correct the suggested streams to the current stream names (13 of the 16 used names from before 2.0.0). |
| 6.1.7 | 2026-10-27 | [89917](https://github.com/airbytehq/airbyte/pull/89917) | Update dependencies |
| 6.1.6 | 2026-10-20 | [78740](https://github.com/airbytehq/airbyte/pull/78740) | Update dependencies |
| 6.1.5 | 2026-10-15 | [89011](https://github.com/airbytehq/airbyte/pull/89011) | Upgrade to Python 3.13 and python-connector-base 4.1.1; upgrade pendulum to 3.x. |
| 6.1.4 | 2026-10-06 | [88123](https://github.com/airbytehq/airbyte/pull/88123) | Report invalid custom GAQL queries as configuration errors that include the Google Ads error message. |
| 6.1.3 | 2026-10-05 | [87630](https://github.com/airbytehq/airbyte/pull/87630) | Split interrupted reports with the CDK's request window splitting (CDK 7.33.0); retry dropped criterion first syncs and mid-stream read timeouts instead of failing. |
| 6.1.2 | 2026-09-28 | [87026](https://github.com/airbytehq/airbyte/pull/87026) | Fix state migration discarding mid-sync per-partition checkpoints, which caused retries to restart incremental streams from the start date. |
| 6.1.1 | 2026-08-25 | [85023](https://github.com/airbytehq/airbyte/pull/85023) | Fixed multi-byte UTF-8 characters being corrupted at chunk boundaries in large streamed responses. |
| 6.1.0 | 2026-07-06 | [80952](https://github.com/airbytehq/airbyte/pull/80952) | Add `ad_performance` and `geo_performance` streams. |
| 6.0.0 | 2026-05-29 | [78504](https://github.com/airbytehq/airbyte/pull/78504) | Clamp incremental report dates to Google Ads' 37-month granular data retention window. |
| 5.0.2 | 2026-05-29 | [78514](https://github.com/airbytehq/airbyte/pull/78514) | Remove the Google Ads 400 response filter predicate to avoid buffering large streaming responses. |
| 5.0.1 | 2026-05-26 | [78419](https://github.com/airbytehq/airbyte/pull/78419) | Classify unrecognized fields in custom GAQL queries as configuration errors. |
| 5.0.0 | 2026-04-20 | [73722](https://github.com/airbytehq/airbyte/pull/73722) | Upgrade Google Ads API from v20 to v23 (field renames, removals, Performance Max ad network type support) and remove nullable `bidding_strategy.id` from primary keys of `campaign_bidding_strategy` and `ad_group_bidding_strategy` streams |
| 4.2.6 | 2026-05-13 | [78065](https://github.com/airbytehq/airbyte/pull/78065) | Promoted release candidate to GA |
| 4.2.6-rc.3 | 2026-05-07 | [77835](https://github.com/airbytehq/airbyte/pull/77835) | Update CDK to pre-release with runtime cap on concurrent partition generators to fix thread pool starvation deadlock |
| 4.2.6-rc.2 | 2026-05-01 | [77663](https://github.com/airbytehq/airbyte/pull/77663) | Mount `TimeoutHTTPAdapter` on parent-stream sessions (`customer_client`, `customer_client_non_manager`, `accessible_accounts`) so the 5-minute HTTP socket timeout also covers parent-record fetches |
| 4.2.6-rc.1 | 2026-04-28 | [77514](https://github.com/airbytehq/airbyte/pull/77514) | Update CDK to pre-release with stderr heartbeat diagnostics and concurrent-source deadlock fix |
| 4.2.5 | 2026-04-27 | [77037](https://github.com/airbytehq/airbyte/pull/77037) | Promoted release candidate to GA |
| 4.2.5-rc.1 | 2026-04-27 | [76074](https://github.com/airbytehq/airbyte/pull/76074) | Update CDK to pre-release with deadlock fix, add 5-minute HTTP socket timeout, and retry HTTP 500 (transient internal error) responses from the Google Ads API |
| 4.2.4 | 2026-04-16 | [76331](https://github.com/airbytehq/airbyte/pull/76331) | Improve UNRECOGNIZED_FIELD error message for custom GAQL queries |
| 4.2.3 | 2026-04-16 | [75451](https://github.com/airbytehq/airbyte/pull/75451) | Fix NULL values for MESSAGE-type fields (e.g., change_event.old_resource, change_event.new_resource) in custom GAQL queries |
| 4.2.2 | 2026-04-13 | [76276](https://github.com/airbytehq/airbyte/pull/76276) | Rename "concurrent workers" to "concurrent threads" in connector spec |
| 4.2.1 | 2026-03-25 | [75458](https://github.com/airbytehq/airbyte/pull/75458) | Set maxSecondsBetweenMessages to 4 hours |
| 4.2.0 | 2026-03-19 | [73321](https://github.com/airbytehq/airbyte/pull/73321) | Add new `geographic_view_with_metrics` stream with metrics and dimension fields (geographic_view remains unchanged) |
| 4.1.6 | 2026-02-18 | [73636](https://github.com/airbytehq/airbyte/pull/73636) | Promoting release candidate 4.1.6-rc.1 to a main version. |
| 4.1.6-rc.1 | 2026-02-16 | [72953](https://github.com/airbytehq/airbyte/pull/72953) | Add HTTPAPIBudget and configurable concurrency level |
| 4.1.5 | 2026-02-16 | [73363](https://github.com/airbytehq/airbyte/pull/73363) | Promoting release candidate 4.1.5-rc.2 to a main version. |
| 4.1.5-rc.2 | 2026-02-11 | [73269](https://github.com/airbytehq/airbyte/pull/73269) | Fix decoder wiring to prevent OOM when using CustomRetriever |
| 4.1.5-rc.1 | 2026-02-10 | [72840](https://github.com/airbytehq/airbyte/pull/72840) | Add retry for ChunkedEncodingError in response streaming |
| 4.1.4 | 2026-01-29 | [72453](https://github.com/airbytehq/airbyte/pull/72453) | Promoting release candidate 4.1.4-rc.1 to a main version. |
| 4.1.4-rc.1 | 2025-12-17 | [70228](https://github.com/airbytehq/airbyte/pull/70228) | Fix custom queries with tab characters and click_view custom queries |
| 4.1.3 | 2025-11-25 | [69844](https://github.com/airbytehq/airbyte/pull/69844) | Fix custom queries regular expression to be case-insensitive |
| 4.1.2 | 2025-11-24 | [69837](https://github.com/airbytehq/airbyte/pull/69837) | Fix schema loader for custom queries |
| 4.1.1 | 2025-11-24 | [69802](https://github.com/airbytehq/airbyte/pull/69802) | Fix custom query regex conditions |
| 4.1.0 | 2025-11-20 | [69776](https://github.com/airbytehq/airbyte/pull/69776) | Promoting release candidate 4.1.0-rc.8 to a main version. |
| 4.1.0-rc.8 | 2025-10-29 | [69084](https://github.com/airbytehq/airbyte/pull/69084) | Fix criterion streams |
| 4.1.0-rc.7 | 2025-10-16 | [68030](https://github.com/airbytehq/airbyte/pull/68030) | Fix schema loader for `custom_queries` streams |
| 4.1.0-rc.6 | 2025-09-25 | [66701](https://github.com/airbytehq/airbyte/pull/66701) | Enables progressive rollouts |
| 4.1.0-rc.5 | 2025-09-25 | [66569](https://github.com/airbytehq/airbyte/pull/66569) | Bumps to CDK v7, adds retry/backoff logic to custom schema loader |
| 4.1.0-rc.4 | 2025-09-18 | [66522](https://github.com/airbytehq/airbyte/pull/66522) | Revert to CDK v6.60.12 |
| 4.1.0-rc.3 | 2025-09-17 | [65535](https://github.com/airbytehq/airbyte/pull/65535) | Update custom query dynamic streams to use regex for conditional incremental sync component mapping |
| 4.1.0-rc.2 | 2025-08-22 | [65149](https://github.com/airbytehq/airbyte/pull/65149) | Update custom query URL to use Google Ads API v20 |
| 4.1.0-rc.1 | 2025-08-19 | [63344](https://github.com/airbytehq/airbyte/pull/63344) | Migrate `custom_queries` streams to low-code |
| 4.0.2 | 2025-08-16 | [64987](https://github.com/airbytehq/airbyte/pull/64987) | Update dependencies |
| 4.0.1 | 2025-08-09 | [64612](https://github.com/airbytehq/airbyte/pull/64612) | Update dependencies |
| 4.0.0 | 2025-08-07 | [64512](https://github.com/airbytehq/airbyte/pull/64512) | Update API version to v20 |
| 3.15.0 | 2025-08-04 | [64495](https://github.com/airbytehq/airbyte/pull/64495) | Promoting release candidate 3.15.0-rc.1 to a main version. |
| 3.15.0-rc.1 | 2025-07-20 | [64124](https://github.com/airbytehq/airbyte/pull/64124) | Switch all streams to paginated endpoints for improved reliability |
| 3.14.2 | 2025-07-28 | [63753](https://github.com/airbytehq/airbyte/pull/63753) | Switching `click_view` to paginated endpoint for improved reliability |
| 3.14.1 | 2025-07-26 | [61472](https://github.com/airbytehq/airbyte/pull/61472) | Update dependencies |
| 3.14.0 | 2025-07-23 | [63733](https://github.com/airbytehq/airbyte/pull/63733) | Promoting release candidate 3.14.0-rc.1 to a main version. |
| 3.14.0-rc.1 | 2025-07-18 | [63357](https://github.com/airbytehq/airbyte/pull/63357) | Migrate incremental events streams |
| 3.13.0 | 2025-07-18 | [63369](https://github.com/airbytehq/airbyte/pull/63369) | Promoting release candidate 3.13.0-rc.2 to a main version. |
| 3.13.0-rc.2 | 2025-07-16 | [63348](https://github.com/airbytehq/airbyte/pull/63348) | Minor metadata update |
| 3.13.0-rc.1 | 2025-07-16 | [62510](https://github.com/airbytehq/airbyte/pull/62510) | Migrate `click_view`, `campaign_bidding_strategy`, and `ad_group_bidding_strategy` streams to low-code |
| 3.12.0 | 2025-07-16 | [63335](https://github.com/airbytehq/airbyte/pull/63335) | Promoting release candidate 3.12.0-rc.2 to a main version. |
| 3.12.0-rc.2 | 2025-07-15 | [63323](https://github.com/airbytehq/airbyte/pull/63323) | Fixes erroneous transformation override |
| 3.12.0-rc.1 | 2025-07-15 | [62510](https://github.com/airbytehq/airbyte/pull/62510) | Migrate additional streams to low-code: See PR for more details |
| 3.11.0 | 2025-07-15 | [63302](https://github.com/airbytehq/airbyte/pull/63302) | Promoting release candidate 3.11.0-rc.1 to a main version. |
| 3.11.0-rc.1 | 2025-07-14 | [62846](https://github.com/airbytehq/airbyte/pull/62846) | Migrate views streams to Low Code |
| 3.10.0 | 2025-07-14 | [63282](https://github.com/airbytehq/airbyte/pull/63282) | Promoting release candidate 3.10.0-rc.1 to a main version. |
| 3.10.0-rc.1 | 2025-07-10 | [62066](https://github.com/airbytehq/airbyte/pull/62066) | Migrate AdGroup stream to Low Code |
| 3.9.0 | 2025-07-10 | [62900](https://github.com/airbytehq/airbyte/pull/62900) | Promoting release candidate 3.9.0-rc.6 to a main version. |
| 3.9.0-rc.6 | 2025-07-08 | [62857](https://github.com/airbytehq/airbyte/pull/62857) | Add per partition state migration |
| 3.9.0-rc.5 | 2025-07-04 | [62518](https://github.com/airbytehq/airbyte/pull/62518) | Fix state migration for new empty states |
| 3.9.0-rc.4 | 2025-07-03 | [62513](https://github.com/airbytehq/airbyte/pull/62513) | Update rollout flag in metadata |
| 3.9.0-rc.3 | 2025-07-03 | [62494](https://github.com/airbytehq/airbyte/pull/62494) | Handle ServiceUnavailableErrors and retry on account check |
| 3.9.0-rc.2 | 2025-07-03 | [62505](https://github.com/airbytehq/airbyte/pull/62505) | Fix state migration for empty states |
| 3.9.0-rc.1 | 2025-06-18 | [61674](https://github.com/airbytehq/airbyte/pull/61674) | Migrate Campaign stream to Low Code |
| 3.8.2 | 2025-05-31 | [51664](https://github.com/airbytehq/airbyte/pull/51664) | Update dependencies |
| 3.8.1 | 2025-05-30 | [61002](https://github.com/airbytehq/airbyte/pull/61002) | Fix error during connection check for custom queries. |
| 3.8.0 | 2025-05-30 | [61000](https://github.com/airbytehq/airbyte/pull/61000) | Promoting release candidate 3.8.0-rc.1 to a main version. |
| 3.8.0-rc.1 | 2025-05-28 | [60949](https://github.com/airbytehq/airbyte/pull/60949) | Update API version to v18 |
| 3.7.10 | 2025-01-11 | [47090](https://github.com/airbytehq/airbyte/pull/47090) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 3.7.9 | 2024-10-14 | [46893](https://github.com/airbytehq/airbyte/pull/46893) | Update getting customers logic |
| 3.7.8 | 2024-10-12 | [46120](https://github.com/airbytehq/airbyte/pull/46120) | Update dependencies |
| 3.7.7 | 2024-10-07 | [45852](https://github.com/airbytehq/airbyte/pull/45852) | Change to the objects serialization in lists to JSON |
| 3.7.6 | 2024-09-21 | [46543](https://github.com/airbytehq/airbyte/pull/46543) | Raise exception on missing stream |
| 3.7.5 | 2024-09-21 | [45801](https://github.com/airbytehq/airbyte/pull/45801) | Update dependencies |
| 3.7.4 | 2024-09-20 | [44600](https://github.com/airbytehq/airbyte/pull/44600) | Update API documentation URLs |
| 3.7.3 | 2024-09-14 | [45497](https://github.com/airbytehq/airbyte/pull/45497) | Update dependencies |
| 3.7.2 | 2024-09-07 | [45263](https://github.com/airbytehq/airbyte/pull/45263) | Update dependencies |
| 3.7.1 | 2024-08-31 | [44326](https://github.com/airbytehq/airbyte/pull/44326) | Update dependencies |
| `3.7.0  `   | 2024-08-15 | [44095](https://github.com/airbytehq/airbyte/pull/44095) | Migrate to google-ads v17                                                                                                                                              |
| `3.6.5  `   | 2024-08-12 | [43882](https://github.com/airbytehq/airbyte/pull/43882) | Update dependencies                                                                                                                                                    |
| `3.6.4`     | 2024-08-10 | [43628](https://github.com/airbytehq/airbyte/pull/43628) | Update dependencies                                                                                                                                                    |
| `3.6.3`     | 2024-08-03 | [43138](https://github.com/airbytehq/airbyte/pull/43138) | Update dependencies                                                                                                                                                    |
| `3.6.2`     | 2024-08-02 | [42971](https://github.com/airbytehq/airbyte/pull/42971) | Fix attribute error on check connection                                                                                                                                |
| `3.6.1`     | 2024-08-02 | [42960](https://github.com/airbytehq/airbyte/pull/42960) | Update error message for Interval Server Error                                                                                                                         |
| `3.6.0`     | 2024-07-31 | [42544](https://github.com/airbytehq/airbyte/pull/42544) | Migrate to CDK v4.0.2                                                                                                                                                  |
| `3.5.10`    | 2024-07-27 | [42714](https://github.com/airbytehq/airbyte/pull/42714) | Update dependencies                                                                                                                                                    |
| `3.5.9`     | 2024-07-20 | [42339](https://github.com/airbytehq/airbyte/pull/42339) | Update dependencies                                                                                                                                                    |
| `3.5.8`     | 2024-07-13 | [41911](https://github.com/airbytehq/airbyte/pull/41911) | Update dependencies                                                                                                                                                    |
| `3.5.7`     | 2024-07-10 | [41528](https://github.com/airbytehq/airbyte/pull/41528) | Update dependencies                                                                                                                                                    |
| `3.5.6`     | 2024-07-09 | [41323](https://github.com/airbytehq/airbyte/pull/41323) | Update dependencies                                                                                                                                                    |
| `3.5.5`     | 2024-07-06 | [40933](https://github.com/airbytehq/airbyte/pull/40933) | Update dependencies                                                                                                                                                    |
| `3.5.4`     | 2024-06-25 | [40326](https://github.com/airbytehq/airbyte/pull/40326) | Update dependencies                                                                                                                                                    |
| `3.5.3`     | 2024-06-22 | [40158](https://github.com/airbytehq/airbyte/pull/40158) | Update dependencies                                                                                                                                                    |
| `3.5.2`     | 2024-06-06 | [39277](https://github.com/airbytehq/airbyte/pull/39277) | [autopull] Upgrade base image to v1.2.2                                                                                                                                |
| `3.5.1`     | 2024-06-13 | [39425](https://github.com/airbytehq/airbyte/pull/39425) | Fix integration tests; update acceptance tests                                                                                                                         |
| `3.5.0`     | 2024-05-22 | [37840](https://github.com/airbytehq/airbyte/pull/37840) | Fix custom GAQL queries default value                                                                                                                                  |
| `3.4.3`     | 2024-05-20 | [38270](https://github.com/airbytehq/airbyte/pull/38270) | Replace AirbyteLogger with logging.Logger                                                                                                                              |
| `3.4.2`     | 2024-04-24 | [36638](https://github.com/airbytehq/airbyte/pull/36638) | Schema descriptions and CDK 0.80.0                                                                                                                                     |
| `3.4.1`     | 2024-04-08 | [36891](https://github.com/airbytehq/airbyte/pull/36891) | Optimize `check` method                                                                                                                                                |
| `3.4.0`     | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0`                                                                                                                                        |
| `3.3.7`     | 2024-03-15 | [36208](https://github.com/airbytehq/airbyte/pull/36208) | Added error message when there is the `unrecognized field` inside of the `custom query`                                                                                |
| `3.3.6`     | 2024-03-01 | [35664](https://github.com/airbytehq/airbyte/pull/35664) | Fix error for new customers for incremental events streams                                                                                                             |
| `3.3.5`     | 2024-02-28 | [35709](https://github.com/airbytehq/airbyte/pull/35709) | Handle 2-Step Verification exception as config error                                                                                                                   |
| `3.3.4`     | 2024-02-21 | [35493](https://github.com/airbytehq/airbyte/pull/35493) | Rolling back the patch 3.3.3 made for `user_interest` steam                                                                                                            |
| `3.3.3`     | 2024-02-14 | [35280](https://github.com/airbytehq/airbyte/pull/35280) | Temporary patch that disables some fields to avoid 500 error when syncing `user_interest` steam                                                                        |
| `3.3.2`     | 2024-02-12 | [35158](https://github.com/airbytehq/airbyte/pull/35158) | Manage dependencies with Poetry.                                                                                                                                       |
| `3.3.1`     | 2024-01-16 | [34007](https://github.com/airbytehq/airbyte/pull/34007) | prepare for airbyte-lib                                                                                                                                                |
| `3.3.0`     | 2024-01-12 | [34212](https://github.com/airbytehq/airbyte/pull/34212) | Remove metric from query in Ad Group stream for non-manager account                                                                                                    |
| `3.2.1`     | 2024-01-12 | [34200](https://github.com/airbytehq/airbyte/pull/34200) | Disable raising error for not enabled accounts                                                                                                                         |
| `3.2.0`     | 2024-01-09 | [33707](https://github.com/airbytehq/airbyte/pull/33707) | Add possibility to sync all connected accounts                                                                                                                         |
| `3.1.0`     | 2024-01-09 | [33603](https://github.com/airbytehq/airbyte/pull/33603) | Fix two issues in the custom queries: automatic addition of `segments.date` in the query; incorrect field type for `DATE` fields.                                      |
| `3.0.2`     | 2024-01-08 | [33494](https://github.com/airbytehq/airbyte/pull/33494) | Add handling for 401 error while parsing response. Add `metrics.cost_micros` field to Ad Group stream.                                                                 |
| `3.0.1`     | 2023-12-26 | [33769](https://github.com/airbytehq/airbyte/pull/33769) | Run a read function in a separate thread to enforce a time limit for its execution                                                                                     |
| `3.0.0`     | 2023-12-07 | [33120](https://github.com/airbytehq/airbyte/pull/33120) | Upgrade API version to v15                                                                                                                                             |
| `2.0.4`     | 2023-11-10 | [32414](https://github.com/airbytehq/airbyte/pull/32414) | Add backoff strategy for read_records method                                                                                                                           |
| `2.0.3`     | 2023-11-02 | [32102](https://github.com/airbytehq/airbyte/pull/32102) | Fix incremental events streams                                                                                                                                         |
| `2.0.2`     | 2023-10-31 | [32001](https://github.com/airbytehq/airbyte/pull/32001) | Added handling (retry) for `InternalServerError` while reading the streams                                                                                             |
| `2.0.1`     | 2023-10-27 | [31908](https://github.com/airbytehq/airbyte/pull/31908) | Base image migration: remove Dockerfile and use the python-connector-base image                                                                                        |
| `2.0.0`     | 2023-10-04 | [31048](https://github.com/airbytehq/airbyte/pull/31048) | Fix schem default streams, change names of streams.                                                                                                                    |
| `1.0.0`     | 2023-09-28 | [30705](https://github.com/airbytehq/airbyte/pull/30705) | Fix schemas for custom queries                                                                                                                                         |
| `0.11.1`    | 2023-09-26 | [30758](https://github.com/airbytehq/airbyte/pull/30758) | Exception should not be raises if a stream is not found                                                                                                                |
| `0.11.0`    | 2023-09-23 | [30704](https://github.com/airbytehq/airbyte/pull/30704) | Update error handling                                                                                                                                                  |
| `0.10.0`    | 2023-09-19 | [30091](https://github.com/airbytehq/airbyte/pull/30091) | Fix schemas for correct primary and foreign keys                                                                                                                       |
| `0.9.0`     | 2023-09-14 | [28970](https://github.com/airbytehq/airbyte/pull/28970) | Add incremental deletes for Campaign and Ad Group Criterion streams                                                                                                    |
| `0.8.1`     | 2023-09-13 | [30376](https://github.com/airbytehq/airbyte/pull/30376) | Revert pagination changes from 0.8.0                                                                                                                                   |
| `0.8.0`     | 2023-09-01 | [30071](https://github.com/airbytehq/airbyte/pull/30071) | Delete start_date from required parameters and fix pagination                                                                                                          |
| `0.7.4`     | 2023-07-28 | [28832](https://github.com/airbytehq/airbyte/pull/28832) | Update field descriptions                                                                                                                                              |
| `0.7.3`     | 2023-07-24 | [28510](https://github.com/airbytehq/airbyte/pull/28510) | Set dates with client's timezone                                                                                                                                       |
| `0.7.2`     | 2023-07-20 | [28535](https://github.com/airbytehq/airbyte/pull/28535) | UI improvement: Make the query field in custom reports a multi-line string field                                                                                       |
| `0.7.1`     | 2023-07-17 | [28365](https://github.com/airbytehq/airbyte/pull/28365) | 0.3.1 and 0.3.2 follow up: make today the end date, not yesterday                                                                                                      |
| `0.7.0`     | 2023-07-12 | [28246](https://github.com/airbytehq/airbyte/pull/28246) | Add new streams: labels, criterions, biddig strategies                                                                                                                 |
| `0.6.1`     | 2023-07-12 | [28230](https://github.com/airbytehq/airbyte/pull/28230) | Reduce amount of logs produced by the connector while working with big amount of data                                                                                  |
| `0.6.0`     | 2023-07-10 | [28078](https://github.com/airbytehq/airbyte/pull/28078) | Add new stream `Campaign Budget`                                                                                                                                       |
| `0.5.0`     | 2023-07-07 | [28042](https://github.com/airbytehq/airbyte/pull/28042) | Add metrics & segment to `Campaigns` stream                                                                                                                            |
| `0.4.3`     | 2023-07-05 | [27959](https://github.com/airbytehq/airbyte/pull/27959) | Add `audience` and `user_interest` streams                                                                                                                             |
| `0.3.3`     | 2023-07-03 | [27913](https://github.com/airbytehq/airbyte/pull/27913) | Improve Google Ads exception handling (wrong customer ID)                                                                                                              |
| `0.3.2`     | 2023-06-29 | [27835](https://github.com/airbytehq/airbyte/pull/27835) | Fix bug introduced in 0.3.1: update query template                                                                                                                     |
| `0.3.1`     | 2023-06-26 | [27711](https://github.com/airbytehq/airbyte/pull/27711) | Refactor date slicing; make start date inclusive                                                                                                                       |
| `0.3.0`     | 2023-06-26 | [27738](https://github.com/airbytehq/airbyte/pull/27738) | License Update: Elv2                                                                                                                                                   |
| `0.2.24`    | 2023-06-06 | [27608](https://github.com/airbytehq/airbyte/pull/27608) | Improve Google Ads exception handling                                                                                                                                  |
| `0.2.23`    | 2023-06-06 | [26905](https://github.com/airbytehq/airbyte/pull/26905) | Replace deprecated `authSpecification` in the connector specification with `advancedAuth`                                                                              |
| `0.2.22`    | 2023-06-02 | [26948](https://github.com/airbytehq/airbyte/pull/26948) | Refactor error messages; add `pattern_descriptor` for fields in spec                                                                                                   |
| `0.2.21`    | 2023-05-30 | [25314](https://github.com/airbytehq/airbyte/pull/25314) | Add full refresh custom table `asset_group_listing_group_filter`                                                                                                       |
| `0.2.20`    | 2023-05-30 | [25624](https://github.com/airbytehq/airbyte/pull/25624) | Add `asset` Resource to full refresh custom tables (GAQL Queries)                                                                                                      |
| `0.2.19`    | 2023-05-15 | [26209](https://github.com/airbytehq/airbyte/pull/26209) | Handle Token Refresh errors as `config_error`                                                                                                                          |
| `0.2.18`    | 2023-05-15 | [25947](https://github.com/airbytehq/airbyte/pull/25947) | Improve GAQL parser error message if multiple resources provided                                                                                                       |
| `0.2.17`    | 2023-05-11 | [25987](https://github.com/airbytehq/airbyte/pull/25987) | Categorized Config Errors Accurately                                                                                                                                   |
| `0.2.16`    | 2023-05-10 | [25965](https://github.com/airbytehq/airbyte/pull/25965) | Fix Airbyte date-time data-types                                                                                                                                       |
| `0.2.14`    | 2023-03-21 | [24945](https://github.com/airbytehq/airbyte/pull/24945) | For custom google query fixed schema type for "data_type: ENUM" and "is_repeated: true" to array of strings                                                            |
| `0.2.13`    | 2023-03-21 | [24338](https://github.com/airbytehq/airbyte/pull/24338) | Migrate to v13                                                                                                                                                         |
| `0.2.12`    | 2023-03-17 | [22985](https://github.com/airbytehq/airbyte/pull/22985) | Specified date formatting in specification                                                                                                                             |
| `0.2.11`    | 2023-03-13 | [23999](https://github.com/airbytehq/airbyte/pull/23999) | Fix incremental sync for Campaigns stream                                                                                                                              |
| `0.2.10`    | 2023-02-11 | [22703](https://github.com/airbytehq/airbyte/pull/22703) | Add support for custom full_refresh streams                                                                                                                            |
| `0.2.9`     | 2023-01-23 | [21705](https://github.com/airbytehq/airbyte/pull/21705) | Fix multibyte issue; Bump google-ads package to 19.0.0                                                                                                                 |
| `0.2.8`     | 2023-01-18 | [21517](https://github.com/airbytehq/airbyte/pull/21517) | Write fewer logs                                                                                                                                                       |
| `0.2.7`     | 2023-01-10 | [20755](https://github.com/airbytehq/airbyte/pull/20755) | Add more logs to debug stuck syncs                                                                                                                                     |
| `0.2.6`     | 2022-12-22 | [20855](https://github.com/airbytehq/airbyte/pull/20855) | Retry 429 and 5xx errors                                                                                                                                               |
| `0.2.5`     | 2022-11-22 | [19700](https://github.com/airbytehq/airbyte/pull/19700) | Fix schema for `campaigns` stream                                                                                                                                      |
| `0.2.4`     | 2022-11-09 | [19208](https://github.com/airbytehq/airbyte/pull/19208) | Add TypeTransofrmer to Campaings stream to force proper type casting                                                                                                   |
| `0.2.3`     | 2022-10-17 | [18069](https://github.com/airbytehq/airbyte/pull/18069) | Add `segments.hour`, `metrics.ctr`, `metrics.conversions` and `metrics.conversions_values` fields to `campaigns` report stream                                         |
| `0.2.2`     | 2022-10-21 | [17412](https://github.com/airbytehq/airbyte/pull/17412) | Release with CDK >= 0.2.2                                                                                                                                              |
| `0.2.1`     | 2022-09-29 | [17412](https://github.com/airbytehq/airbyte/pull/17412) | Always use latest CDK version                                                                                                                                          |
| `0.2.0`     | 2022-08-23 | [15858](https://github.com/airbytehq/airbyte/pull/15858) | Mark the `query` and `table_name` fields in `custom_queries` as required                                                                                               |
| `0.1.44`    | 2022-07-27 | [15084](https://github.com/airbytehq/airbyte/pull/15084) | Fix data type `ad_group_criterion.topic.path` in `display_topics_performance_report` and shifted `campaigns` to non-managers streams                                   |
| `0.1.43`    | 2022-07-12 | [14614](https://github.com/airbytehq/airbyte/pull/14614) | Update API version to `v11`, update `google-ads` to 17.0.0                                                                                                             |
| `0.1.42`    | 2022-06-08 | [13624](https://github.com/airbytehq/airbyte/pull/13624) | Update `google-ads` to 15.1.1, pin `protobuf==3.20.0` to work on MacOS M1 machines (AMD)                                                                               |
| `0.1.41`    | 2022-06-08 | [13618](https://github.com/airbytehq/airbyte/pull/13618) | Add missing dependency                                                                                                                                                 |
| `0.1.40`    | 2022-06-02 | [13423](https://github.com/airbytehq/airbyte/pull/13423) | Fix the missing data [issue](https://github.com/airbytehq/airbyte/issues/12999)                                                                                        |
| `0.1.39`    | 2022-05-18 | [12914](https://github.com/airbytehq/airbyte/pull/12914) | Fix GAQL query validation and log auth errors instead of failing the sync                                                                                              |
| `0.1.38`    | 2022-05-12 | [12807](https://github.com/airbytehq/airbyte/pull/12807) | Documentation updates                                                                                                                                                  |
| `0.1.37`    | 2022-05-06 | [12651](https://github.com/airbytehq/airbyte/pull/12651) | Improve integration and unit tests                                                                                                                                     |
| `0.1.36`    | 2022-04-19 | [12158](https://github.com/airbytehq/airbyte/pull/12158) | Fix `*_labels` streams data type                                                                                                                                       |
| `0.1.35`    | 2022-04-18 | [9310](https://github.com/airbytehq/airbyte/pull/9310)   | Add new fields to reports                                                                                                                                              |
| `0.1.34`    | 2022-03-29 | [11602](https://github.com/airbytehq/airbyte/pull/11602) | Add budget amount to campaigns stream.                                                                                                                                 |
| `0.1.33`    | 2022-03-29 | [11513](https://github.com/airbytehq/airbyte/pull/11513) | When `end_date` is configured in the future, use today's date instead.                                                                                                 |
| `0.1.32`    | 2022-03-24 | [11371](https://github.com/airbytehq/airbyte/pull/11371) | Improve how connection check returns error messages                                                                                                                    |
| `0.1.31`    | 2022-03-23 | [11301](https://github.com/airbytehq/airbyte/pull/11301) | Update docs and spec to clarify usage                                                                                                                                  |
| `0.1.30`    | 2022-03-23 | [11221](https://github.com/airbytehq/airbyte/pull/11221) | Add `*_labels` streams to fetch the label text rather than their IDs                                                                                                   |
| `0.1.29`    | 2022-03-22 | [10919](https://github.com/airbytehq/airbyte/pull/10919) | Fix user location report schema and add to acceptance tests                                                                                                            |
| `0.1.28`    | 2022-02-25 | [10372](https://github.com/airbytehq/airbyte/pull/10372) | Add network fields to click view stream                                                                                                                                |
| `0.1.27`    | 2022-02-16 | [10315](https://github.com/airbytehq/airbyte/pull/10315) | Make `ad_group_ads` and other streams support incremental sync.                                                                                                        |
| `0.1.26`    | 2022-02-11 | [10150](https://github.com/airbytehq/airbyte/pull/10150) | Add support for multiple customer IDs.                                                                                                                                 |
| `0.1.25`    | 2022-02-04 | [9812](https://github.com/airbytehq/airbyte/pull/9812)   | Handle `EXPIRED_PAGE_TOKEN` exception and retry with updated state.                                                                                                    |
| `0.1.24`    | 2022-02-04 | [9996](https://github.com/airbytehq/airbyte/pull/9996)   | Use Google Ads API version V9.                                                                                                                                         |
| `0.1.23`    | 2022-01-25 | [8669](https://github.com/airbytehq/airbyte/pull/8669)   | Add end date parameter in spec.                                                                                                                                        |
| `0.1.22`    | 2022-01-24 | [9608](https://github.com/airbytehq/airbyte/pull/9608)   | Reduce stream slice date range.                                                                                                                                        |
| `0.1.21`    | 2021-12-28 | [9149](https://github.com/airbytehq/airbyte/pull/9149)   | Update title and description                                                                                                                                           |
| `0.1.20`    | 2021-12-22 | [9071](https://github.com/airbytehq/airbyte/pull/9071)   | Fix: Keyword schema enum                                                                                                                                               |
| `0.1.19`    | 2021-12-14 | [8431](https://github.com/airbytehq/airbyte/pull/8431)   | Add new streams: Geographic and Keyword                                                                                                                                |
| `0.1.18`    | 2021-12-09 | [8225](https://github.com/airbytehq/airbyte/pull/8225)   | Include time_zone to sync. Remove streams for manager account.                                                                                                         |
| `0.1.16`    | 2021-11-22 | [8178](https://github.com/airbytehq/airbyte/pull/8178)   | Clarify setup fields                                                                                                                                                   |
| `0.1.15`    | 2021-10-07 | [6684](https://github.com/airbytehq/airbyte/pull/6684)   | Add new stream `click_view`                                                                                                                                            |
| `0.1.14`    | 2021-10-01 | [6565](https://github.com/airbytehq/airbyte/pull/6565)   | Fix OAuth Spec File                                                                                                                                                    |
| `0.1.13`    | 2021-09-27 | [6458](https://github.com/airbytehq/airbyte/pull/6458)   | Update OAuth Spec File                                                                                                                                                 |
| `0.1.11`    | 2021-09-22 | [6373](https://github.com/airbytehq/airbyte/pull/6373)   | Fix inconsistent segments.date field type across all streams                                                                                                           |
| `0.1.10`    | 2021-09-13 | [6022](https://github.com/airbytehq/airbyte/pull/6022)   | Annotate Oauth2 flow initialization parameters in connector spec                                                                                                       |
| `0.1.9`     | 2021-09-07 | [5302](https://github.com/airbytehq/airbyte/pull/5302)   | Add custom query stream support                                                                                                                                        |
| `0.1.8`     | 2021-08-03 | [5509](https://github.com/airbytehq/airbyte/pull/5509)   | Allow additionalProperties in spec.json                                                                                                                                |
| `0.1.7`     | 2021-08-03 | [5422](https://github.com/airbytehq/airbyte/pull/5422)   | Correct query to not skip dates                                                                                                                                        |
| `0.1.6`     | 2021-08-03 | [5423](https://github.com/airbytehq/airbyte/pull/5423)   | Added new stream UserLocationReport                                                                                                                                    |
| `0.1.5`     | 2021-08-03 | [5159](https://github.com/airbytehq/airbyte/pull/5159)   | Add field `login_customer_id` to spec                                                                                                                                  |
| `0.1.4`     | 2021-07-28 | [4962](https://github.com/airbytehq/airbyte/pull/4962)   | Support new Report streams                                                                                                                                             |
| `0.1.3`     | 2021-07-23 | [4788](https://github.com/airbytehq/airbyte/pull/4788)   | Support main streams, fix bug with exception `DATE_RANGE_TOO_NARROW` for incremental streams                                                                           |
| `0.1.2`     | 2021-07-06 | [4539](https://github.com/airbytehq/airbyte/pull/4539)   | Add `AIRBYTE_ENTRYPOINT` for Kubernetes support                                                                                                                        |
| `0.1.1`     | 2021-06-23 | [4288](https://github.com/airbytehq/airbyte/pull/4288)   | Fix `Bugfix: Correctly declare required parameters`                                                                                                                    |

</details>
