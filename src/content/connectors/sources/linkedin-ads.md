---
generated_record: true
connector_name: LinkedIn Ads
connector_type: source
connector_slug: linkedin-ads
connector_directory: source-linkedin-ads
definition_id: 137ece28-5434-455c-8f34-69dc3782f451
version: 6.2.11
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/linkedin-ads
logo: /images/connectors/sources/linkedin-ads.svg
logo_source_path: airbyte-integrations/connectors/source-linkedin-ads/icon.svg
logo_sha256: 82c387f66d902b945a2bfb082a625a70a72425eea78f234454102d9f63b5f4f4
original_metadata_path: airbyte-integrations/connectors/source-linkedin-ads/metadata.yaml
original_metadata_sha256: 3b4b763307edf39f9124fa21304d760c249505f9a6f9e087166ce2e497a2f552
original_document_path: docs/integrations/sources/linkedin-ads.md
original_document_sha256: a4d7f7d99ca77cfda9003f703e924cbf17af8d7c38e033154868edcfad667eac
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: b0e681d16030dd8b9d70b714a58a0385f01b08a39ca64afb8a32b218e23ddbbd
rewritten_at: 2026-11-12T13:46:33.578942+00:00
---

# LinkedIn Ads

<HideInUI>

Use this page to set up the [LinkedIn Ads](https://learn.microsoft.com/en-us/linkedin/) source connector and find reference information.

</HideInUI>

## Prerequisites

- A LinkedIn Ads account with permission to access data from the accounts you want to sync.
- A start date in YYYY-MM-DD format. The connector doesn't replicate data from before this date.

## Setup guide

### Step 1: Set up LinkedIn Ads

<!-- env:cloud -->

For Airbyte Cloud, **Oauth2.0** authentication significantly simplifies setup. You can authenticate your account directly from the Airbyte UI.

<!-- /env:cloud -->

<!-- env:oss -->

### Set up authentication for Airbyte Open Source

To authenticate the connector in Airbyte Open Source, create a LinkedIn developer application. Then obtain one of these credentials:

1. OAuth2.0 credentials, consisting of:

   - Client ID
   - Client Secret
   - Refresh Token (expires after 12 months)

2. Access Token (expires after 60 days)

Follow the steps below to create the application and obtain the required credentials. For an authentication overview, see the [official documentation](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication?context=linkedin%2Fcontext).

#### Create a LinkedIn developer application

1. [Log in to LinkedIn](https://developer.linkedin.com/) with a developer account.
2. Go to the [Apps page](https://www.linkedin.com/developers/apps) and click the **Create App** icon. Complete these fields:

   1. For **App Name**, enter a name.
   2. For **LinkedIn Page**, enter your company's name or LinkedIn Company Page URL.
   3. For **Privacy policy URL**, enter the link to your company's privacy policy.
   4. For **App logo**, upload your company's logo.
   5. Check **I have read and agree to these terms**, then click **Create App**. LinkedIn redirects you to your application's details page.

3. Verify your app by following these steps:

   1. Click the **Settings** tab. In the **App Settings** section, click **Verify** under **Company**. A popup window appears. Click **Generate URL** to generate the verification URL. Copy and send the URL to the Page Admin, who may be you. Click **I'm done**. If you administer the Page, open the URL in a new tab. Otherwise, an administrator must complete the next step. Click **Verify**.

   2. Click the **Product** tab to display the Products page. For **Marketing Developer Platform**, click **Request access**. A popup window appears. Review and select **I have read and agree to these terms**. Finally, click **Request access**.

#### Authorise your app

1. Click the **Auth** tab to authorise your application. Copy the **Client ID** and **Client Secret**. Click the open eye icon to reveal the client secret. In the **Oauth 2.0 settings**, click the pencil icon and provide your app's redirect URL.

2. Click the **OAuth 2.0 tools** link in the **Understanding authentication and OAuth 2.0** section on the right side of the page.
3. Click **Create token**.
4. Select the scopes you want your app to use. The connector requires these scopes:
   - `r_ads` - Read ad accounts and related data
   - `r_ads_reporting` - Read ad analytics and reporting data
   - `r_basicprofile` - Read basic profile information
   - `r_liteprofile` - Read lite profile information
   - `r_emailaddress` - Read email address
   - `r_organization_social` - Read organization social data
   - `r_organization_admin` - Read organization admin data
   - `r_events` - Read events data
   - `r_1st_connections_size` - Read first-degree connection count
   - `r_marketing_leadgen_automation` - Read lead gen form data
   - `r_ads_leadgen_automation` - Read lead gen automation data

   Available scopes depend on your LinkedIn API programme access level. You need at least `r_ads` and `r_ads_reporting` to sync ad account data and analytics. The **Videos** stream also requires `r_organization_social`. See [Videos](#videos).
5. Click **Request access token**. LinkedIn redirects you to an authorisation page. Sign in with your LinkedIn credentials and authorise your app. You then receive your **Access Token** and **Refresh Token**.

:::caution
These tokens won't appear again. Copy them and store them securely.
:::

:::tip
If either token expires, return to LinkedIn's [Token Generator](https://www.linkedin.com/developers/tools/oauth/token-generator) to generate a new one. You can check your tokens' status using the [Token Inspector](https://www.linkedin.com/developers/tools/oauth/token-inspector).
:::

<!-- /env:oss -->

### Step 2: Set up the connector in Airbyte


<!-- env:cloud -->

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select LinkedIn Ads from the Source type dropdown.
4. Enter a name for the LinkedIn Ads connector.
5. To authenticate:

- Select **OAuth2.0** from the Authentication dropdown, then click **Authenticate your LinkedIn Ads account**. Sign in to your account and click **Allow**.
<!-- /env:cloud -->

<!-- env:oss -->

#### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select LinkedIn Ads from the Source type dropdown.
4. Enter a name for the LinkedIn Ads connector.
5. To authenticate:
- Select an option from the Authentication dropdown:
  1. **OAuth2.0:** Enter your **Client ID**, **Client Secret** and **Refresh Token**. The refresh token expires after 12 months.
  2. **Access Token:** Enter your **Access Token**. The access token expires after 60 days.
  <!-- /env:oss -->

6. For **Start Date**, use the provided datepicker or enter a date programmatically in YYYY-MM-DD format. The connector won't replicate data from before this date.
7. (Optional) For **Account IDs**, provide a space-separated list of Account IDs to pull data from. Without Account IDs, the connector replicates data from every account accessible with your credentials.
8. (Optional) For **Lookback Window**, enter how many days before the last saved cursor each incremental sync re-fetches. This window applies to every incremental stream. It captures late-arriving analytics values, including conversions and attribution updates. It also captures entities whose `lastModified` timestamp changed after the previous sync. The default is 0, which re-fetches nothing.
9. (Optional) For **Number of Workers**, enter the number of concurrent workers syncing ad analytics streams. The default is 3. A higher value may improve sync speed but could increase the risk of reaching API rate limits.
10. (Optional) For **Custom Ad Analytics Reports**, provide one or more custom reports to query through the LinkedIn Ads API. Custom reports can align the data pulled from LinkedIn Ads with your specific needs. To add a custom report:
   1. Click **Add**.
   2. Enter a **Report Name**. This becomes the stream name during replication, preceded by `custom_`.
   3. Select a **Pivot Category** from the dropdown. This sets the main dimension used to group or segment the report data.
   4. Select a **Time Granularity** to group your report data by time. The options are:
      - `ALL`: Data isn't grouped by time, providing a cumulative view.
      - `DAILY`: Returns data grouped by day. Use this to monitor short-term changes and effects closely.
      - `MONTHLY`: Returns data grouped by month. Use this to assess monthly goals or observe seasonal patterns.
      - `YEARLY`: Returns data grouped by year. Use this for high-level analysis of long-term trends and year-over-year comparisons.
11. (Optional) For **Custom Ad Statistics Reports**, provide one or more reports that use LinkedIn's **Statistics Finder**. This groups results by up to three pivot categories at once. To add a statistics report:
   1. Click **Add**.
   2. Enter a **Report Name**. This becomes the stream name during replication, preceded by `custom_statistics_`.
   3. Select up to three **Pivot Categories**. Airbyte sends them using LinkedIn's Statistics Finder (`q=statistics`) request format.
   4. Select a **Time Granularity** using the same options listed above.

   **Note:** Analytics reports become streams named `custom_<Report Name>`. Statistics reports become streams named `custom_statistics_<Report Name>`. Report names must be unique within each list. Don't name an analytics report `statistics_<something>`, as it would conflict with a statistics report named `<something>`.
12. Click **Set up source** and wait for the tests to finish.
<!-- /env:cloud -->

## Supported sync modes

The LinkedIn Ads source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental Sync - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental Sync - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

## Supported streams

- [Accounts](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-accounts?tabs=http&view=li-lms-2023-05#search-for-accounts)
- [Organizations](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/organizations/organization-access-control-by-role)
- [Account Users](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-account-users?tabs=http&view=li-lms-2023-05#find-ad-account-users-by-accounts)
- [Campaign Groups](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-campaign-groups?tabs=http&view=li-lms-2023-05#search-for-campaign-groups)
- [Campaigns](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-campaigns?tabs=http&view=li-lms-2023-05#search-for-campaigns)
- [Creatives](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-creatives?tabs=http%2Chttp-update-a-creative&view=li-lms-2023-05#search-for-creatives)
- [Conversions](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversion-tracking?view=li-lms-2023-05&tabs=curl#find-conversions-by-ad-account)
- [Lead forms](https://learn.microsoft.com/en-us/linkedin/marketing/lead-sync/leadsync?view=li-lms-2024-06&tabs=http#lead-forms-1)
- [Lead form responses](https://learn.microsoft.com/en-us/linkedin/marketing/lead-sync/leadsync?view=li-lms-2024-06&tabs=http#get-lead-form-responses)
- [Videos](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/videos-api#get-a-video)
- [Ad Analytics by Campaign](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Creative](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Impression Device](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Member Company Size](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Member Country](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Member Job Function](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Member Job Title](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Member Industry](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Member Seniority](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Member Region](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)
- [Ad Analytics by Member Company](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?tabs=curl&view=li-lms-2023-05#ad-analytics)

:::info

The `Organizations` stream returns the authenticated member's organisation access control (ACL) records. It returns one row for each organisation and role, including the organisation URN, role and state. The stream returns all role states: `APPROVED`, `REQUESTED`, `REJECTED` and `REVOKED`. Filter the `state` field if you only need approved roles. This stream requires the `r_organization_admin` or `rw_organization_admin` OAuth scope. Without it, LinkedIn returns a 403 for this stream only.

:::

:::info

For Ad Analytics Streams such as `Ad Analytics by Campaign` and `Ad Analytics by Creative`, the `pivot` column is renamed to `pivotValue`. This supports correct data normalisation and prevents name conflicts with certain destinations. The field contains the associated entity's ID as a [URN](https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/urns). See the [LinkedIn documentation](https://learn.microsoft.com/en-us/linkedin/marketing/urn-resolution?view=li-lms-2023-05) for the Ad Analytics streams' URN value format.

:::

## Performance considerations

### Rate limits

LinkedIn Ads applies Official Rate Limits for API Usage, [more information here](https://docs.microsoft.com/en-us/linkedin/shared/api-guide/concepts/rate-limits?context=linkedin/marketing/context). Rate-limited requests receive a 429 response. These limits reset every day at midnight UTC. In rare cases, LinkedIn may also return a 429 response to protect its infrastructure. API service returns to normal automatically. In these cases, you receive this error message:

```text
"Caught retriable error '<some_error> or null' after <some_number> tries. Waiting <some_number> seconds then retrying..."
```

This response is expected when the connector reaches the 429 - Rate Limit Exceeded HTTP Error. The connector automatically retries rate-limited requests using exponential backoff. For persistent rate limiting, check Rate Limits [on this page](https://www.linkedin.com/developers/apps) &gt; Choose your app &gt; Analytics.

### Ad analytics streams

LinkedIn Ads supports several streams that provide ad effectiveness metrics for a specified date range. These cover properties and dimensions such as `clicks`, `follows`, `impressions`, `reactions` and `totalEngagements`, among others. Fetching every property for each ad object can increase sync times.

To improve sync performance, select only the columns you need in your downstream destination. Selecting fewer columns should reduce sync duration.

:::caution

The LinkedIn Ads API doesn't return records without values for any specified dimension. Select columns carefully, as your selection may produce fewer or more records.

:::

## Data type map

| Integration Type | Airbyte Type | Notes                       |
|:-----------------|:-------------|:----------------------------|
| `number`         | `number`     | float number                |
| `integer`        | `integer`    | whole number                |
| `date`           | `string`     | FORMAT YYYY-MM-DD           |
| `datetime`       | `string`     | FORMAT YYYY-MM-DDThh:mm:ss  |
| `array`          | `array`      |                             |
| `boolean`        | `boolean`    | True/False                  |
| `string`         | `string`     |                             |

## Limitations

### Lead forms and responses

The **Lead forms** and **Lead form responses** streams only support Full Refresh sync mode. Incremental sync isn't available because the LinkedIn API limits time-range filtering for lead data.

### Videos

The **Videos** stream returns videos referenced by each sponsored account's ad creatives. This includes the video `duration` in milliseconds. For each creative, the connector resolves the referenced sponsored-content post. It then fetches the video embedded in that post. The stream therefore covers videos used in ads. You can join it with the **Creatives** stream through the creative's `content.reference`. It only supports Full Refresh sync mode. The LinkedIn API doesn't provide a modification timestamp suitable for filtering.

Keep these limitations in mind:

- A video used by several creatives or posts appears once per reference. Deduplicate using the `id` primary key for one row per video.
- The Videos API can't retrieve legacy media assets uploaded through the deprecated Assets API (`urn:li:digitalmediaAsset:` URNs). The connector skips them.
- The connector skips deleted or inaccessible posts and videos with a log message. They don't cause the sync to fail.
- Resolving a creative's post requires the `r_organization_social` scope ([Posts API permissions](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api#permissions)). The connector's OAuth flow requests this scope. With a raw access token lacking this scope, every post lookup is skipped. The stream therefore completes with zero records.
- Message Ads (Sponsored InMail) creatives reference InMail content (`urn:li:adInMailContent:` URNs), not a post. They can't contain videos retrievable through the Videos API. The post lookup returns a `400`. The connector skips the creative with a log message instead of failing the sync.
- The stream intentionally doesn't use the Videos API `associatedAccount` finder for the account's whole media library. LinkedIn controls access to that finder at application level. Applications with only the `r_ads` scope receive `403 ACCESS_DENIED` from it. Fetching each video by URN works with the standard scopes this connector already requests.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Troubleshooting

- **Invalid or expired access token (401):** Re-authenticate the source to get a valid LinkedIn access token.
- **Ad account access denied (403):** Authorise the `r_ads` scope to read ad accounts. Confirm the authorised member has access in Campaign Manager. If LinkedIn identifies another missing scope, such as `rw_ads`, grant it and re-authenticate.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--- | :----------- | :------ |
| 6.2.11 | 2026-11-10 | [86483](https://github.com/airbytehq/airbyte/pull/86483) | Replace YAML anchors with declarative `$ref` for the shared analytics property list (no functional change) |
| 6.2.10 | 2026-11-10 | [91628](https://github.com/airbytehq/airbyte/pull/91628) | Update dependencies |
| 6.2.9 | 2026-10-30 | [90258](https://github.com/airbytehq/airbyte/pull/90258) | Explain authentication and missing scopes in connection checks |
| 6.2.8 | 2026-11-03 | [89292](https://github.com/airbytehq/airbyte/pull/89292) | Update dependencies |
| 6.2.7 | 2026-11-02 | [90379](https://github.com/airbytehq/airbyte/pull/90379) | Restore the creatives stream's DNS retry diagnostic while preserving rate-limit and server-error handling. |
| 6.2.6 | 2026-10-13 | [88690](https://github.com/airbytehq/airbyte/pull/88690) | Update dependencies |
| 6.2.5 | 2026-10-06 | [87926](https://github.com/airbytehq/airbyte/pull/87926) | Update dependencies |
| 6.2.4 | 2026-09-29 | [86321](https://github.com/airbytehq/airbyte/pull/86321) | Fix the `videos` stream failing on Message Ads (Sponsored InMail) creatives and on creatives with a null `content.reference` |
| 6.2.3 | 2026-09-29 | [87239](https://github.com/airbytehq/airbyte/pull/87239) | Update dependencies |
| 6.2.2 | 2026-09-22 | [86716](https://github.com/airbytehq/airbyte/pull/86716) | Update dependencies |
| 6.2.1 | 2026-09-15 | [84019](https://github.com/airbytehq/airbyte/pull/84019) | Update dependencies |
| 6.2.0 | 2026-09-14 | [76087](https://github.com/airbytehq/airbyte/pull/76087) | Add `organizations` stream via the `organizationAcls` endpoint |
| 6.1.0 | 2026-09-14 | [81509](https://github.com/airbytehq/airbyte/pull/81509) | Add `videos` stream |
| 6.0.2 | 2026-07-31 | [83268](https://github.com/airbytehq/airbyte/pull/83268) | Fix `pivot` in custom analytics report streams to contain the configured pivot category. |
| 6.0.1 | 2026-07-31 | [83269](https://github.com/airbytehq/airbyte/pull/83269) | Fix invalid `error_handlers` manifest key so the custom error handler and exponential backoff are actually applied |
| 6.0.0 | 2026-07-30 | [74334](https://github.com/airbytehq/airbyte/pull/74334) | Batch analytics requests for `ad_campaign_analytics`, `ad_creative_analytics`, and `ad_impression_device_analytics` in groups of up to 50, reducing sync time by approximately 98% for large accounts. Breaking change for `ad_impression_device_analytics` only: its primary key now includes `sponsoredCampaign`, preventing records from different campaigns from being collapsed in deduplication mode. Refresh the source schema after upgrading; deduplication users should refresh this stream to rebuild destination data. |
| 5.7.0 | 2026-07-30 | [78505](https://github.com/airbytehq/airbyte/pull/78505) | Add custom_statistics_report stream and ad_statistics_reports config for LinkedIn Statistics Finder reports (up to three pivots). |
| 5.6.13 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 5.6.12 | 2026-07-28 | [83183](https://github.com/airbytehq/airbyte/pull/83183) | Roll Cloud back to 5.6.10 — 5.6.11 is built on SDM 7.23.7, which breaks bundled custom components |
| 5.6.11 | 2026-07-28 | [83018](https://github.com/airbytehq/airbyte/pull/83018) | Update dependencies |
| 5.6.10 | 2026-07-21 | [77286](https://github.com/airbytehq/airbyte/pull/77286) | Update dependencies |
| 5.6.9 | 2026-04-21 | [73947](https://github.com/airbytehq/airbyte/pull/73947) | Update dependencies |
| 5.6.8 | 2026-04-07 | [76120](https://github.com/airbytehq/airbyte/pull/76120) | Fix dynamic stream name field_path to avoid parent stream name collision |
| 5.6.7 | 2026-04-06 | [76040](https://github.com/airbytehq/airbyte/pull/76040) | Replace deprecated MessageRepresentationAirbyteTracedErrors with AirbyteTracedException in tests |
| 5.6.6 | 2026-04-06 | [75583](https://github.com/airbytehq/airbyte/pull/75583) | Add `oauth_connector_input_specification` with granular scopes |
| 5.6.5 | 2026-03-30 | [75597](https://github.com/airbytehq/airbyte/pull/75597) | Map HTTP 429 responses to RATE_LIMITED instead of RETRY for proper indefinite backoff on rate-limited requests |
| 5.6.4 | 2026-02-11 | [72831](https://github.com/airbytehq/airbyte/pull/72831) | Upgrade LinkedIn API version from 202502 to 202601 |
| 5.6.3 | 2026-02-10 | [72768](https://github.com/airbytehq/airbyte/pull/72768) | Update dependencies |
| 5.6.2 | 2026-01-20 | [72028](https://github.com/airbytehq/airbyte/pull/72028) | Update dependencies |
| 5.6.1 | 2026-01-14 | [68982](https://github.com/airbytehq/airbyte/pull/68982) | Update dependencies |
| 5.6.0 | 2025-11-04 | [69180](https://github.com/airbytehq/airbyte/pull/69180) | Promoting release candidate 5.6.0-rc.1 to a main version. |
| 5.6.0-rc.1 | 2025-10-29 | [68614](https://github.com/airbytehq/airbyte/pull/68614) | Upgrade to latest CDK to only include the selected columns of the schema in API requests for ad analytics streams |
| 5.5.5 | 2025-10-28 | [68626](https://github.com/airbytehq/airbyte/pull/68626) | Increase concurrency and introduce initial attempt at API budget |
| 5.5.4 | 2025-10-21 | [64967](https://github.com/airbytehq/airbyte/pull/64967) | Update dependencies |
| 5.5.3 | 2025-10-14 | [67564](https://github.com/airbytehq/airbyte/pull/67564) | Upgrade to CDK v7. |
| 5.5.2 | 2025-07-16 | [63336](https://github.com/airbytehq/airbyte/pull/63336) | Promoting release candidate 5.5.2-rc.1 to a main version. |
| 5.5.2-rc.1 | 2025-06-23 | [60996](https://github.com/airbytehq/airbyte/pull/60996) | Fix to properly manage pagination for `Lead forms` and `Lead form responses` streams |
| 5.5.1 | 2025-06-18 | [61639](https://github.com/airbytehq/airbyte/pull/61639) | Reduce default concurrency level to 3 and enable configurability via `num_workers` config property |
| 5.5.0 | 2025-04-28 | [59116](https://github.com/airbytehq/airbyte/pull/59116) | Promoting release candidate 5.5.0-rc.1 to a main version. |
| 5.5.0-rc.1 | 2025-04-25 | [58628](https://github.com/airbytehq/airbyte/pull/58628) | Convert to manifest-only format |
| 5.4.1 | 2025-04-23 | [58134](https://github.com/airbytehq/airbyte/pull/58134) | Fix to properly retrieve `approximateMemberReach` for `adAnalytics` streams following `v5.3.3`. |
| 5.4.0 | 2025-04-22 | [58593](https://github.com/airbytehq/airbyte/pull/58593) | Promoting release candidate 5.4.0-rc.1 to a main version. |
| 5.4.0-rc.1 | 2025-04-18 | [58114](https://github.com/airbytehq/airbyte/pull/58114) | Removes custom retrievers and cursors from analytics streams so that they can take up concurrency. |
| 5.3.3 | 2025-03-12 | [55724](https://github.com/airbytehq/airbyte/pull/55724) | Update outdated schema `approximateUniqueImpressions` to new `approximateMemberReach` for `adAnalytics` streams. |
| 5.3.2 | 2025-03-08 | [55447](https://github.com/airbytehq/airbyte/pull/55447) | Update dependencies |
| 5.3.1 | 2025-03-05 | [55211](https://github.com/airbytehq/airbyte/pull/55211) | Update dependencies |
| 5.3.0 | 2025-03-02 | [55171](https://github.com/airbytehq/airbyte/pull/55171) | Migrate API to v202502 |
| 5.2.3 | 2025-03-01 | [54813](https://github.com/airbytehq/airbyte/pull/54813) | Update dependencies |
| 5.2.2 | 2025-02-22 | [53308](https://github.com/airbytehq/airbyte/pull/53308) | Update dependencies |
| 5.2.1 | 2025-02-10 | [53611](https://github.com/airbytehq/airbyte/pull/53611) | Add schema precisions for `Lead forms` and `Lead form responses` streams |
| 5.2.0 | 2025-02-04 | [52047](https://github.com/airbytehq/airbyte/pull/52047) | Add `Lead forms` and `Lead form responses` new streams - See Limits & considerations |
| 5.1.6 | 2025-02-02 | [49458](https://github.com/airbytehq/airbyte/pull/49458) | Update Linkedin Ads API version to 202410 for creatives stream |
| 5.1.5 | 2025-02-01 | [52791](https://github.com/airbytehq/airbyte/pull/52791) | Update dependencies |
| 5.1.4 | 2025-01-30 | [52604](https://github.com/airbytehq/airbyte/pull/52604) | Fix state error |
| 5.1.3 | 2025-01-22 | [52604](https://github.com/airbytehq/airbyte/pull/52604) | Update CDK to production ^6 |
| 5.1.2 | 2025-01-25 | [52253](https://github.com/airbytehq/airbyte/pull/52253) | Update dependencies |
| 5.1.1 | 2025-01-15 | [47092](https://github.com/airbytehq/airbyte/pull/47092) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 5.1.0 | 2025-01-14 | [48863](https://github.com/airbytehq/airbyte/pull/48863) | Custom streams moved to manifest implementation & URL Error Handling |
| 5.0.0 | 2024-11-26 | [48451](https://github.com/airbytehq/airbyte/pull/48451) | Update primary keys for streams ad_campaign_analytics, Custom Ad Analytics Reports and account_users |
| 4.1.4 | 2024-10-12 | [46862](https://github.com/airbytehq/airbyte/pull/46862) | Update dependencies |
| 4.1.3 | 2024-10-05 | [46433](https://github.com/airbytehq/airbyte/pull/46433) | Update dependencies |
| 4.1.2 | 2024-09-28 | [46171](https://github.com/airbytehq/airbyte/pull/46171) | Update dependencies |
| 4.1.1 | 2024-09-21 | [45774](https://github.com/airbytehq/airbyte/pull/45774) | Update dependencies |
| 4.1.0 | 2024-09-20 | [44370](https://github.com/airbytehq/airbyte/pull/44370) | Migrate to low-code |
| 4.0.6 | 2024-09-14 | [45532](https://github.com/airbytehq/airbyte/pull/45532) | Update dependencies |
| 4.0.5 | 2024-09-07 | [45209](https://github.com/airbytehq/airbyte/pull/45209) | Update dependencies |
| 4.0.4 | 2024-08-31 | [44950](https://github.com/airbytehq/airbyte/pull/44950) | Update dependencies |
| 4.0.3 | 2024-08-24 | [44682](https://github.com/airbytehq/airbyte/pull/44682) | Update dependencies |
| 4.0.2 | 2024-08-17 | [44220](https://github.com/airbytehq/airbyte/pull/44220) | Update dependencies |
| 4.0.1 | 2024-08-10 | [43629](https://github.com/airbytehq/airbyte/pull/43629) | Update dependencies |
| 4.0.0 | 2024-08-07 | [43359](https://github.com/airbytehq/airbyte/pull/43359) | Revert low code migration |
| 3.0.1 | 2024-08-03 | [43087](https://github.com/airbytehq/airbyte/pull/43087) | Update dependencies |
| 3.0.0 | 2024-06-18 | [38314](https://github.com/airbytehq/airbyte/pull/38314) | Migrate to low-code |
| 2.1.12 | 2024-07-27 | [42728](https://github.com/airbytehq/airbyte/pull/42728) | Update dependencies |
| 2.1.11 | 2024-07-20 | [42291](https://github.com/airbytehq/airbyte/pull/42291) | Update dependencies |
| 2.1.10 | 2024-07-13 | [41710](https://github.com/airbytehq/airbyte/pull/41710) | Update dependencies |
| 2.1.9 | 2024-07-10 | [41517](https://github.com/airbytehq/airbyte/pull/41517) | Update dependencies |
| 2.1.8 | 2024-07-09 | [41315](https://github.com/airbytehq/airbyte/pull/41315) | Update dependencies |
| 2.1.7 | 2024-07-06 | [40868](https://github.com/airbytehq/airbyte/pull/40868) | Update dependencies |
| 2.1.6 | 2024-06-25 | [40331](https://github.com/airbytehq/airbyte/pull/40331) | Update dependencies |
| 2.1.5 | 2024-06-22 | [39998](https://github.com/airbytehq/airbyte/pull/39998) | Update dependencies |
| 2.1.4 | 2024-06-16 | [39442](https://github.com/airbytehq/airbyte/pull/39442) | Fix README commands, change spec from json to yaml, fix schema states to object |
| 2.1.3 | 2024-06-06 | [39240](https://github.com/airbytehq/airbyte/pull/39240) | [autopull] Upgrade base image to v1.2.2 |
| 2.1.2 | 2024-05-07 | [36648](https://github.com/airbytehq/airbyte/pull/36648) | Schema descriptions |
| 2.1.1 | 2024-05-07 | [38013](https://github.com/airbytehq/airbyte/pull/38013) | Fix an issue where the `Accounts` stream did not correctly handle provided account IDs |
| 2.1.0 | 2024-04-30 | [37573](https://github.com/airbytehq/airbyte/pull/37573) | Update API version to `202404`; add cursor-based pagination |
| 2.0.0 | 2024-04-24 | [37531](https://github.com/airbytehq/airbyte/pull/37531) | Change primary key for Analytics Streams |
| 1.0.1 | 2024-03-28 | [34152](https://github.com/airbytehq/airbyte/pull/34152) | Proceed pagination if return less than expected |
| 1.0.0 | 2024-04-10 | [36927](https://github.com/airbytehq/airbyte/pull/36927) | Update primary key for Analytics Streams |
| 0.8.0 | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0` |
| 0.7.0 | 2024-02-20 | [35465](https://github.com/airbytehq/airbyte/pull/35465) | Per-error reporting and continue sync on stream failures |
| 0.6.8 | 2024-02-09 | [35086](https://github.com/airbytehq/airbyte/pull/35086) | Manage dependencies with Poetry |
| 0.6.7 | 2024-01-11 | [34152](https://github.com/airbytehq/airbyte/pull/34152) | Prepare for airbyte-lib |
| 0.6.6 | 2024-01-15 | [34222](https://github.com/airbytehq/airbyte/pull/34222) | Use stream slices for Analytics streams |
| 0.6.5 | 2023-12-15 | [33530](https://github.com/airbytehq/airbyte/pull/33530) | Fix typo in `Pivot Category` list |
| 0.6.4 | 2023-10-19 | [31599](https://github.com/airbytehq/airbyte/pull/31599) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.6.3 | 2023-10-13 | [31396](https://github.com/airbytehq/airbyte/pull/31396) | Fix pagination for reporting |
| 0.6.2 | 2023-08-23 | [31221](https://github.com/airbytehq/airbyte/pull/31221) | Increase max time between messages to 24 hours |
| 0.6.1 | 2023-08-23 | [29600](https://github.com/airbytehq/airbyte/pull/29600) | Update field descriptions |
| 0.6.0 | 2023-08-22 | [29721](https://github.com/airbytehq/airbyte/pull/29721) | Add `Conversions` stream |
| 0.5.0 | 2023-08-14 | [29175](https://github.com/airbytehq/airbyte/pull/29175) | Add Custom report Constructor |
| 0.4.0 | 2023-08-08 | [29175](https://github.com/airbytehq/airbyte/pull/29175) | Add analytics streams |
| 0.3.1 | 2023-08-08 | [29189](https://github.com/airbytehq/airbyte/pull/29189) | Fix empty accounts field |
| 0.3.0 | 2023-08-07 | [29045](https://github.com/airbytehq/airbyte/pull/29045) | Add new fields to schemas; convert datetime fields to `rfc3339` |
| 0.2.1 | 2023-05-30 | [26780](https://github.com/airbytehq/airbyte/pull/26780) | Reduce records limit for Creatives Stream |
| 0.2.0 | 2023-05-23 | [26372](https://github.com/airbytehq/airbyte/pull/26372) | Migrate to LinkedIn API version: May 2023 |
| 0.1.16 | 2023-05-24 | [26512](https://github.com/airbytehq/airbyte/pull/26512) | Removed authSpecification from spec.json in favour of advancedAuth |
| 0.1.15 | 2023-02-13 | [22940](https://github.com/airbytehq/airbyte/pull/22940) | Specified date formatting in specification |
| 0.1.14 | 2023-02-03 | [22361](https://github.com/airbytehq/airbyte/pull/22361) | Turn on default HttpAvailabilityStrategy |
| 0.1.13 | 2023-01-27 | [22013](https://github.com/airbytehq/airbyte/pull/22013) | For adDirectSponsoredContents stream skip accounts which are part of organization |
| 0.1.12 | 2022-10-18 | [18111](https://github.com/airbytehq/airbyte/pull/18111) | For adDirectSponsoredContents stream skip accounts which are part of organization |
| 0.1.11 | 2022-10-07 | [17724](https://github.com/airbytehq/airbyte/pull/17724) | Retry 429/5xx errors when refreshing access token |
| 0.1.10 | 2022-09-28 | [17326](https://github.com/airbytehq/airbyte/pull/17326) | Migrate to per-stream states. |
| 0.1.9 | 2022-07-21 | [14924](https://github.com/airbytehq/airbyte/pull/14924) | Remove `additionalProperties` field from schemas |
| 0.1.8 | 2022-06-07 | [13495](https://github.com/airbytehq/airbyte/pull/13495) | Fixed `base-normalization` issue on `Destination Redshift` caused by wrong casting of `pivot` column |
| 0.1.7 | 2022-05-04 | [12482](https://github.com/airbytehq/airbyte/pull/12482) | Update input configuration copy |
| 0.1.6 | 2022-04-04 | [11690](https://github.com/airbytehq/airbyte/pull/11690) | Small documentation corrections |
| 0.1.5 | 2021-12-21 | [8984](https://github.com/airbytehq/airbyte/pull/8984) | Update connector fields title/description |
| 0.1.4 | 2021-12-02 | [8382](https://github.com/airbytehq/airbyte/pull/8382) | Modify log message in rate-limit cases |
| 0.1.3 | 2021-11-11 | [7839](https://github.com/airbytehq/airbyte/pull/7839) | Added OAuth support |
| 0.1.2 | 2021-11-08 | [7499](https://github.com/airbytehq/airbyte/pull/7499) | Remove base-python dependencies |
| 0.1.1 | 2021-10-02 | [6610](https://github.com/airbytehq/airbyte/pull/6610) | Fix for `Campaigns/targetingCriteria` transformation, coerced `Creatives/variables/values` to string by default |
| 0.1.0 | 2021-09-05 | [5285](https://github.com/airbytehq/airbyte/pull/5285) | Initial release of Native LinkedIn Ads connector for Airbyte |

</details>
