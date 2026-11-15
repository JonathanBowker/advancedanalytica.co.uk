---
generated_record: true
connector_name: Google Search Console
connector_type: source
connector_slug: google-search-console
connector_directory: source-google-search-console
definition_id: eb4c9e00-db83-4d63-a386-39cfa91012a8
version: 2.1.21
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/google-search-console
logo: /images/connectors/sources/google-search-console.svg
logo_source_path: airbyte-integrations/connectors/source-google-search-console/icon.svg
logo_sha256: 417466041ac172c149ae0e69e5124517315d3e237867f4bc1345637f9d1da72d
original_metadata_path: airbyte-integrations/connectors/source-google-search-console/metadata.yaml
original_metadata_sha256: e2544328b7522186d7b8eff60bc023631966a9a08e4e3ad4d71c2024d4992bb6
original_document_path: docs/integrations/sources/google-search-console.md
original_document_sha256: 0351baea35e50b195dcc5350768d5faf21cef45a305f3b06b0d4226cef3e6c49
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4c2b0f57757c039f99e6bf882af0f6c793873de30d0cf7dec048bf84ab88c628
rewritten_at: 2026-11-12T14:09:23.798198+00:00
---

# Google Search Console

<HideInUI>

Use this page to set up the [Google Search Console](https://search.google.com/search-console/about) source connector and find reference information.

</HideInUI>

## Prerequisites

- Google Account
- One or more verified Google Search Console properties. You need each property's exact identifier. URL-prefix properties look like `https://example.com/`. Domain properties look like `sc-domain:example.com`. See [Google's guide to property types](https://support.google.com/webmasters/answer/34592).
<!-- env:oss -->
- Google Search Console API enabled for your project (**Airbyte Open Source** only)
<!-- /env:oss -->

## Set up the connector

### Step 1: Set up Google Search Console

Choose one of the following methods to authenticate the Google Search Console connector:

<!-- env:cloud -->

#### OAuth (recommended for Airbyte Cloud)

You can authenticate with your Google Account using OAuth. You must own the Google Search Console property or have permission to view it. Follow [Google's instructions](https://support.google.com/webmasters/answer/7687615?sjid=11103698321670173176-NA) to confirm that your account has the required **Owner** or **Full User** permissions. This option is recommended for **Airbyte Cloud** users because it simplifies setup. It also lets you authenticate the connection [directly from the Airbyte UI](#step-2-set-up-the-google-search-console-connector-in-airbyte).

<!-- /env:cloud -->

<!-- env:oss -->

To authenticate with OAuth in **Airbyte Open Source**, create an authentication app and obtain these credentials and tokens:

- Client ID
- Client Secret
- Refresh Token
- Access Token

See [in Google's documentation](https://developers.google.com/identity/protocols/oauth2) for instructions on creating an OAuth app and obtaining these credentials for Google APIs.

#### Google service account with JSON key file (recommended for Airbyte Open Source)

You can authenticate using a JSON key file linked to a Google service account. This option is recommended for **Airbyte Open Source** users. Follow these steps to create a service account and generate the JSON key file:

1. Open the [Service Accounts page](https://console.developers.google.com/iam-admin/serviceaccounts).
2. Select an existing project or create a new one.
3. At the top of the page, click **+ Create service account**.
4. Enter a name and description for the service account, then click **Create and Continue**.
5. Under **Service account permissions**, select the roles to grant the service account, then click **Continue**. The **Viewer** role is recommended.
   - Optional: Under **Grant users access to this service account**, specify which users or groups can use and manage the service account.
6. Go to the [API Console/Credentials](https://console.cloud.google.com/apis/credentials) and click the email address of your new service account.
7. In the **Keys** tab, click **+ Add key**, then click **Create new key**.
8. Select **JSON** as the Key type. This generates and downloads the JSON key file you'll use for authentication. Click **Continue**.

:::caution
This file is your only copy of the JSON service key. You can't download it again, so store it securely.
:::

:::note
You can return to the [API Console/Credentials](https://console.cloud.google.com/apis/credentials) to manage your service account or generate more JSON keys. For details about service account credentials, see [Google's IAM documentation](https://cloud.google.com/iam/docs/understanding-service-accounts).
:::

#### Delegate domain-wide authority

Domain-wide delegation lets service accounts access users' data across a Google Workspace environment through 'impersonation'. Certain use cases require this authority. One example is a service account needing broad access across several users and services within a domain.

:::note
Only your Google Workspace domain's super admin can enable domain-wide delegation of authority for a service account.
:::

Follow the steps in [Google documentation](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority) to enable delegated domain-wide authority. Grant the service account this OAuth scope:

- `https://www.googleapis.com/auth/webmasters.readonly`

For more information, see [this Google article](https://support.google.com/a/answer/162106?hl=en).

<!-- /env:oss -->

### Step 2: Set up the connector in Airbyte

<!-- env:cloud -->

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Google Search Console from the Source type dropdown.
4. Enter a name for the Google Search Console connector.
5. For **Website URL Property**, enter each Search Console property exactly. Use `sc-domain:example.com` for Domain properties. For URL-prefix properties, enter the full URL, including its protocol and trailing slash, such as `https://www.example.com/`. You can add multiple properties.
6. For **Start Date**, the default is `2021-01-01`. Use the provided datepicker or enter a date in the `YYYY-MM-DD` format. The connector replicates data created on or after this date.
7. Authenticate the connection:
<!-- env:cloud -->

<!-- env:oss -->
### For Airbyte Open Source:

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Google Search Console from the Source type dropdown.
4. Enter a name for the Google Search Console connector.
<!-- /env:oss -->

- **For Airbyte Cloud:**
  - Select **Oauth** from the Authentication dropdown. Then click **Sign in with Google** to authorise your account.
    <!-- /env:cloud -->
    <!-- env:oss -->
- **For Airbyte Open Source:**
  - (Recommended) Select **Service Account Key Authorization** from the Authentication dropdown, then enter the **Admin Email** and **Service Account JSON Key**. For the key, paste the JSON key you obtained during service account setup. It should begin with `{"type": "service_account", "project_id": YOUR_PROJECT_ID, "private_key_id": YOUR_PRIVATE_KEY, ...}`
  - Select **Oauth** from the Authentication dropdown. Then enter your **Client ID**, **Client Secret**, **Access Token** and **Refresh Token**.
  <!-- /env:oss -->

8. (Optional) For **End Date**, enter a date in the `YYYY-MM-DD` format. The connector replicates data created between the defined Start Date and End Date. Leave this blank to replicate everything from the Start Date to the present.
9. (Optional) For **Custom Reports**, provide an array of JSON objects representing custom reports for querying the API. See the [Custom reports](#custom-reports) section below to learn how to create these reports.
10. (Optional) For **Data Freshness**, choose whether to include "fresh" data that Google hasn't finalised and might change. For Incremental sync mode, leave the default value of `final`. See the [Data Freshness](#data-freshness) section below for details about this parameter.
11. (Optional) For **Number of Concurrent Threads**, set the number of worker threads used during sync. The default is 40. Consider reducing this value when syncing many site URLs or encountering rate limit errors.
12. (Optional) Enable **Always Use Aggregation Type Auto** if your search analytics streams fail with a 400 error about an unsupported `aggregationType`. This setting replaces the default aggregation type with `auto`. It resolves the error for certain site configurations.
13. (Optional) For **Search Analytics API Requests Per Minute**, set the maximum requests per minute for Search Analytics API calls. The default is 1200, matching Google's documented maximum quota. Lower this value if you encounter rate limit errors. Most new Google Cloud projects start with a quota of 60 requests per minute. Check your Google Cloud Console quotas for your actual limit. See the [Rate Limiting](#rate-limiting) section below for more information.
14. Click **Set up source** and wait for the tests to finish.

<HideInUI>

## Supported sync modes

The Google Search Console source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

:::note
The cursor's granularity is one day. Incremental Sync in Append mode might therefore duplicate data.
:::

## Supported streams

- [Sites](https://developers.google.com/webmaster-tools/search-console-api-original/v3/sites/get)
- [Sitemaps](https://developers.google.com/webmaster-tools/search-console-api-original/v3/sitemaps/list)
- [Full Analytics report](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query): this detailed stream takes a long time to sync, so use it carefully
- [Analytics report by country](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics report by date](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics report by device](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics report by page](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics report by query](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics keyword report](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics keyword report by page](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics keyword report by site](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics page report](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics site report by page](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- [Analytics site report by site](https://developers.google.com/webmaster-tools/search-console-api-original/v3/searchanalytics/query)
- Analytics report by custom dimensions

### Entity-relationship diagram (ERD)
<EntityRelationshipDiagram></EntityRelationshipDiagram>

## Connector configuration

### Custom reports

Custom reports let you query the API and group results using your chosen dimensions. Results follow the order in which you provide these dimensions. Create each custom report as follows:

1. Click `Add` under the `Custom Reports` section.
2. Enter the report's `Name`. This becomes the stream name.
3. Select one or more `Dimensions` from the available dropdown list.

The available `Dimensions` are:

- `country`
- `date`
- `device`
- `page`
- `query`

For example, use this custom report to group API results first by country and then by date:

- Name: country_date
- Dimensions: ["country", "date"]

For technical reasons, `date` is the default dimension and always appears in your query. Specify it to change the grouping order. The primary key includes your custom dimensions, the default dimension, `site_url` and `search_type`.

The UI Custom report builder transforms your information into a custom stream using its `Name`.

Use the [Google APIS Explorer](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) to build and test your reports.

### Data freshness

The **Data Freshness** parameter controls the freshness, or finality, of the queried data.

- `final`: The query includes only finalised, stable data. Google has processed and verified this data, so it's unlikely to change. This option returns the definitive statistics and information Google has analysed and confirmed.
- `all`: The query returns finalised data and what Google calls "fresh" data. Fresh data is more recent but hasn't completed the full processing and verification applied to finalised data. This option provides more current insights, but the data might change as Google continues processing and analysing it.

:::caution
For Incremental Sync mode, leave this parameter at its default value of `final`. The `all` option might create discrepancies between your destination table and finalised Google Search Console data.
:::

## Data type map

| Integration Type | Airbyte Type |
| :--------------- | :----------- |
| `string`         | `string`     |
| `number`         | `number`     |
| `array`          | `array`      |
| `object`         | `object`     |

## Limitations and troubleshooting

<details>
<summary>
Expand to see details about Google Search Console connector limitations and troubleshooting.
</summary>

### Connector limitations

#### Rate limits

The Search Console API applies two distinct quota types to Search Analytics queries. The connector retries automatically after exceeding either quota, using different backoff periods. See Google's [Usage Limits](https://developers.google.com/webmaster-tools/limits) documentation for full details.

**QPS (queries per minute) quota**: Limits API requests per minute. Google documents a maximum of 1,200 requests per minute for each user and site. However, most new Google Cloud projects start at 60 requests per minute. When you exceed this quota, the connector retries after a 60-second backoff.

**Load quota**: Limits the internal resources that queries consume. Complex queries consume more load, especially when grouping or filtering by both `page` and `query` dimensions. Queries covering long date ranges also consume more load. Google measures load quota across 10-minute short-term and daily long-term windows. When exceeded, the connector retries after a 15-minute backoff. This matches Google's recommendation to wait 15 minutes before retrying.

To check your current QPS quota limits:

1. Go to your [Google Cloud Console](https://console.cloud.google.com/).
2. Go to **APIs & Services**, then **Quotas**.
3. Search for "Search Console API".
4. Find "Requests per minute per user" to view your current limit.

For higher QPS limits, enable billing on your Google Cloud project or request a quota increase through Google Cloud Console. Then set the connector's **Search Analytics API Requests Per Minute** to match your actual quota.

If you reach load quota limits, simplify your queries. Don't group or filter by `page` and `query` together. Use shorter date ranges and avoid querying the same data repeatedly.

#### Data retention

Google Search Console retains website data for only the previous 16 months. You can't access data from before this period. For more information, see [Google's documentation on data freshness and availability](https://support.google.com/webmasters/answer/7576553).

#### Retired search appearance values

The `search_analytics_keyword_page_report`, `search_analytics_keyword_site_report_by_page` and `search_analytics_keyword_site_report_by_site` streams separate their data by `search_appearance`. Google retires search appearance types over time. FAQ rich results stopped appearing in Search in May 2026. Google's [FAQ structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/faqpage) announced the removal of FAQ rich result data from the Search Console API in August 2026.

The connector discovers appearance values from the API during every sync instead of hard-coding them. A retired value therefore requires no configuration change. Rows for that value stop arriving, while other appearance values continue syncing normally. No stream or field is added or removed.

Plan for these two effects:

- `search_appearance` forms part of these streams' primary key, and syncs don't delete rows. Records already synced for a retired appearance value remain in your destination indefinitely. When you aggregate across `search_appearance`, these rows continue contributing to totals.
- Re-syncing a historical window might no longer reproduce rows for a retired value. A full refresh can therefore return fewer records than the original sync.

### Troubleshooting

#### Site URL errors

The connection test reads the `sites` stream for every configured property. An incorrect **Website URL Property** value therefore fails during setup, rather than during a sync. The `sites` and `sitemaps` streams report these errors as configuration errors:

- `Configured site URL is not a verified Search Console property in this account.` The value doesn't match a property in your authenticated Search Console account. Compare it with the property list in Search Console. Common errors include a missing trailing slash or using `http` instead of `https`. Other errors include a missing or extra `www.`. You might also have entered a plain domain instead of the `sc-domain:` form for a Domain property.
- `Configured site URL is not accessible with the account's Search Console permissions.` The property exists, but the authenticated account can't read it. Ask a property owner to add the Google account for OAuth authentication. For service account authentication, ask them to add the service account email as a user on that property.

#### Other issues

- Find common Google Search Console source connector issues on the [Airbyte Forum](https://github.com/airbytehq/airbyte/discussions).

</details>

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version     | Date       | Pull Request                                             | Subject                                                                                                                                                                |
|:------------|:-----------|:---------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2.1.21 | 2026-11-10 | [89240](https://github.com/airbytehq/airbyte/pull/89240) | Update dependencies |
| 2.1.20 | 2026-11-05 | [91063](https://github.com/airbytehq/airbyte/pull/91063) | Clarify Website URL Property formats for Domain and URL-prefix properties |
| 2.1.19 | 2026-11-05 | [91068](https://github.com/airbytehq/airbyte/pull/91068) | Emit dimension values exactly as Google returns them, including quoted and numeric-looking queries |
| 2.1.18 | 2026-10-22 | [89665](https://github.com/airbytehq/airbyte/pull/89665) | Fix 400 errors on the search_analytics_site_report_by_site stream by using aggregationType auto for Google News and Discover search types; keep numeric-looking search queries as strings in keyword streams |
| 2.1.17 | 2026-10-13 | [88645](https://github.com/airbytehq/airbyte/pull/88645) | Update dependencies |
| 2.1.16 | 2026-10-06 | [87882](https://github.com/airbytehq/airbyte/pull/87882) | Update dependencies |
| 2.1.15 | 2026-09-29 | [87207](https://github.com/airbytehq/airbyte/pull/87207) | Update dependencies |
| 2.1.14 | 2026-09-22 | [86665](https://github.com/airbytehq/airbyte/pull/86665) | Update dependencies |
| 2.1.13 | 2026-09-15 | [86094](https://github.com/airbytehq/airbyte/pull/86094) | Update dependencies |
| 2.1.12 | 2026-09-09 | [75289](https://github.com/airbytehq/airbyte/pull/75289) | Improve error messages for unverified or inaccessible site URLs on the sites and sitemaps streams |
| 2.1.11 | 2026-09-08 | [85529](https://github.com/airbytehq/airbyte/pull/85529) | Update dependencies |
| 2.1.10 | 2026-08-18 | [84615](https://github.com/airbytehq/airbyte/pull/84615) | Update dependencies |
| 2.1.9 | 2026-08-11 | [83959](https://github.com/airbytehq/airbyte/pull/83959) | Update dependencies |
| 2.1.8 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 2.1.7 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 2.1.5 — 2.1.6 is built on SDM 7.23.7, which breaks bundled custom components |
| 2.1.6 | 2026-07-28 | [82942](https://github.com/airbytehq/airbyte/pull/82942) | Update dependencies |
| 2.1.5 | 2026-07-21 | [82440](https://github.com/airbytehq/airbyte/pull/82440) | Update dependencies |
| 2.1.4 | 2026-07-14 | [81851](https://github.com/airbytehq/airbyte/pull/81851) | Update dependencies |
| 2.1.3 | 2026-06-30 | [81094](https://github.com/airbytehq/airbyte/pull/81094) | Update dependencies |
| 2.1.2 | 2026-06-23 | [80489](https://github.com/airbytehq/airbyte/pull/80489) | Update dependencies |
| 2.1.1 | 2026-06-16 | [79906](https://github.com/airbytehq/airbyte/pull/79906) | Update dependencies |
| 2.1.0 | 2026-06-12 | [79146](https://github.com/airbytehq/airbyte/pull/79146) | Handle 403 "Search Analytics load quota exceeded" as rate-limited with a 15-minute backoff instead of config error |
| 2.0.4 | 2026-06-09 | [79344](https://github.com/airbytehq/airbyte/pull/79344) | Update dependencies |
| 2.0.3 | 2026-06-01 | [78545](https://github.com/airbytehq/airbyte/pull/78545) | Adds jitter to backoff strategy |
| 2.0.2 | 2026-05-21 | [78289](https://github.com/airbytehq/airbyte/pull/78289) | Reduce `search_analytics_*` paginator `page_size` from `25000` to `5000` to lower peak worker memory on high-volume tenants. See airbytehq/oncall#12246 for context. |
| 2.0.1 | 2026-05-18 | [78157](https://github.com/airbytehq/airbyte/pull/78157) | Restore `default_concurrency` to `num_workers`-driven configuration (`{{ config.get('num_workers', 3) }}`) and keep `max_concurrency` at `100`; cancels the Phase 1 concurrency tuning rollout introduced in 2.0.1-rc.1 |
| 2.0.0 | 2026-05-04 | [76306](https://github.com/airbytehq/airbyte/pull/76306) | Append `search_appearance` to existing primary keys of keyword report streams; drop duplicate unfiltered keyword rows caused by empty/null `searchAppearance` partitions; fix multi-site duplication by removing the cartesian-product over `site_urls` on keyword streams; wrap `dimensionFilterGroups.filters` in an array to match the Google Search Console API spec. This is a **breaking change** for the `search_analytics_keyword_page_report`, `search_analytics_keyword_site_report_by_page`, and `search_analytics_keyword_site_report_by_site` streams. See the [migration guide](https://docs.airbyte.com/integrations/sources/google-search-console-migrations) for details. |
| 1.10.33 | 2026-04-28 | [77276](https://github.com/airbytehq/airbyte/pull/77276) | Update dependencies |
| 1.10.32 | 2026-04-21 | [76624](https://github.com/airbytehq/airbyte/pull/76624) | Update dependencies |
| 1.10.31 | 2026-04-14 | [76190](https://github.com/airbytehq/airbyte/pull/76190) | Add access_token to extract_output and complete_oauth_output_specification to fix OAuth secretId 422 regression |
| 1.10.30 | 2026-04-13 | [76276](https://github.com/airbytehq/airbyte/pull/76276) | Rename "concurrent workers" to "concurrent threads" in connector spec |
| 1.10.29 | 2026-04-01 | [75582](https://github.com/airbytehq/airbyte/pull/75582) | Add `oauth_connector_input_specification` with granular scopes |
| 1.10.28 | 2026-03-31 | [75699](https://github.com/airbytehq/airbyte/pull/75699) | Update dependencies |
| 1.10.27 | 2026-03-30 | [75426](https://github.com/airbytehq/airbyte/pull/75426) | Guard numeric metric fields against complex types to prevent serialization failures and deadlocks |
| 1.10.26 | 2026-03-24 | [74935](https://github.com/airbytehq/airbyte/pull/74935) | Update dependencies |
| 1.10.25 | 2026-03-10 | [74685](https://github.com/airbytehq/airbyte/pull/74685) | Update dependencies |
| 1.10.24 | 2026-02-24 | [73935](https://github.com/airbytehq/airbyte/pull/73935) | Update dependencies |
| 1.10.23 | 2026-02-17 | [73372](https://github.com/airbytehq/airbyte/pull/73372) | Update dependencies |
| 1.10.22 | 2026-02-10 | [72683](https://github.com/airbytehq/airbyte/pull/72683) | Update dependencies |
| 1.10.21 | 2026-01-20 | [71877](https://github.com/airbytehq/airbyte/pull/71877) | Update dependencies |
| 1.10.20 | 2026-01-14 | [71722](https://github.com/airbytehq/airbyte/pull/71722) | Update dependencies |
| 1.10.19 | 2025-12-18 | [70517](https://github.com/airbytehq/airbyte/pull/70517) | Update dependencies |
| 1.10.18 | 2025-12-09 | [70444](https://github.com/airbytehq/airbyte/pull/70444) | Add user-configurable API rate limit option for Search Analytics streams |
| 1.10.17 | 2025-11-25 | [70059](https://github.com/airbytehq/airbyte/pull/70059) | Update dependencies |
| 1.10.16 | 2025-11-18 | [69392](https://github.com/airbytehq/airbyte/pull/69392) | Update dependencies |
| 1.10.15 | 2025-10-29 | [68771](https://github.com/airbytehq/airbyte/pull/68771) | Update dependencies |
| 1.10.14 | 2025-10-21 | [68231](https://github.com/airbytehq/airbyte/pull/68231) | Update dependencies |
| 1.10.13 | 2025-10-14 | [68004](https://github.com/airbytehq/airbyte/pull/68004) | Update dependencies |
| 1.10.12 | 2025-10-07 | [67263](https://github.com/airbytehq/airbyte/pull/67263) | Update dependencies |
| 1.10.11 | 2025-09-30 | [65384](https://github.com/airbytehq/airbyte/pull/65384) | Update dependencies |
| 1.10.10 | 2025-09-16 | [66010](https://github.com/airbytehq/airbyte/pull/66010) | Update to CDK v7 |
| 1.10.9 | 2025-08-09 | [64584](https://github.com/airbytehq/airbyte/pull/64584) | Update dependencies |
| 1.10.8 | 2025-08-02 | [64187](https://github.com/airbytehq/airbyte/pull/64187) | Update dependencies |
| 1.10.7 | 2025-07-26 | [63877](https://github.com/airbytehq/airbyte/pull/63877) | Update dependencies |
| 1.10.6 | 2025-07-23 | [63720](https://github.com/airbytehq/airbyte/pull/63720) | Ignore 403 "insufficient permission" errors |
| 1.10.5 | 2025-07-19 | [63471](https://github.com/airbytehq/airbyte/pull/63471) | Update dependencies |
| 1.10.4 | 2025-07-15 | [63309](https://github.com/airbytehq/airbyte/pull/63309) | Adds `type` property to `config_normalization_rules` in manifest |
| 1.10.3 | 2025-07-12 | [63094](https://github.com/airbytehq/airbyte/pull/63094) | Update dependencies |
| 1.10.2 | 2025-07-05 | [62613](https://github.com/airbytehq/airbyte/pull/62613) | Update dependencies |
| 1.10.1 | 2025-06-28 | [62194](https://github.com/airbytehq/airbyte/pull/62194) | Update dependencies |
| 1.10.0 | 2025-06-23 | [61425](https://github.com/airbytehq/airbyte/pull/61425) | Migrate to manifest-only |
| 1.9.4 | 2025-06-21 | [61789](https://github.com/airbytehq/airbyte/pull/61789) | Update dependencies |
| 1.9.3 | 2025-06-18 | [61706](https://github.com/airbytehq/airbyte/pull/61706) | Fix record serialization bug |
| 1.9.2 | 2025-06-14 | [60663](https://github.com/airbytehq/airbyte/pull/60663) | Update dependencies |
| 1.9.1 | 2025-06-10 | [61514](https://github.com/airbytehq/airbyte/pull/61514) | Promoting release candidate 1.9.1-rc.1 to a main version. |
| 1.9.1-rc.1 | 2025-06-10 | [61508](https://github.com/airbytehq/airbyte/pull/61508) | Add API budget, reduce concurrency levels, and catch 403 rate limiting errors |
| 1.9.0 | 2025-06-06 | [61408](https://github.com/airbytehq/airbyte/pull/61408) | Migrate custom reports streams to low-code |
| 1.8.0 | 2025-06-06 | [61335](https://github.com/airbytehq/airbyte/pull/61335) | Migrate `SearchAnalyticsAllFields`, `SearchAnalyticsByDate`, `SearchAnalyticsByDevice`, `SearchAnalyticsByPage`, and `SearchAnalyticsByQuery` to low-code |
| 1.7.0 | 2025-06-05 | [61332](https://github.com/airbytehq/airbyte/pull/61332) | Migrate search_by_keyword streams to low-code |
| 1.6.0 | 2025-06-04 | [61380](https://github.com/airbytehq/airbyte/pull/61380) | Promoting release candidate 1.6.0-rc.1 to a main version. |
| 1.6.0-rc.1 | 2025-06-02 | [60928](https://github.com/airbytehq/airbyte/pull/60928) | Migrate `search_analytics_by_country`, `sites`, and `sitemaps` to low-code |
| 1.5.18 | 2025-05-28 | [58121](https://github.com/airbytehq/airbyte/pull/58121) | Prevent KeyError raise on check connetion when account does not have access to any site. Better Error message |
| 1.5.17 | 2025-05-10 | [54946](https://github.com/airbytehq/airbyte/pull/54946) | Update dependencies |
| 1.5.16 | 2025-05-09 | [59737](https://github.com/airbytehq/airbyte/pull/59737) | Promoting release candidate 1.5.16-rc.1 to a main version. |
| 1.5.16-rc.1 | 2025-05-02 | [59140](https://github.com/airbytehq/airbyte/pull/59140) | Migrate to CDK V6 |
| 1.5.15 | 2025-02-22 | [54426](https://github.com/airbytehq/airbyte/pull/54426) | Update dependencies |
| 1.5.14 | 2025-02-15 | [53781](https://github.com/airbytehq/airbyte/pull/53781) | Update dependencies |
| 1.5.13 | 2025-02-01 | [52854](https://github.com/airbytehq/airbyte/pull/52854) | Update dependencies |
| 1.5.12 | 2025-01-25 | [52303](https://github.com/airbytehq/airbyte/pull/52303) | Update dependencies |
| 1.5.11 | 2025-01-18 | [51629](https://github.com/airbytehq/airbyte/pull/51629) | Update dependencies |
| 1.5.10 | 2025-01-11 | [51129](https://github.com/airbytehq/airbyte/pull/51129) | Update dependencies |
| 1.5.9 | 2025-01-04 | [50919](https://github.com/airbytehq/airbyte/pull/50919) | Update dependencies |
| 1.5.8 | 2024-12-28 | [50579](https://github.com/airbytehq/airbyte/pull/50579) | Update dependencies |
| 1.5.7 | 2024-12-21 | [50040](https://github.com/airbytehq/airbyte/pull/50040) | Update dependencies |
| 1.5.6 | 2024-12-14 | [49173](https://github.com/airbytehq/airbyte/pull/49173) | Update dependencies |
| 1.5.5 | 2024-11-25 | [43730](https://github.com/airbytehq/airbyte/pull/43730) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 1.5.4 | 2024-09-06 | [45196](https://github.com/airbytehq/airbyte/pull/45196) | Fix request body for report streams by keyword |
| 1.5.3 | 2024-08-03 | [43067](https://github.com/airbytehq/airbyte/pull/43067) | Update dependencies |
| 1.5.2 | 2024-07-27 | [42786](https://github.com/airbytehq/airbyte/pull/42786) | Update dependencies |
| 1.5.1 | 2024-07-20 | [42142](https://github.com/airbytehq/airbyte/pull/42142) | Update dependencies |
| 1.5.0 | 2024-07-17 | [42073](https://github.com/airbytehq/airbyte/pull/42073) | Migrate to CDK v1.8.0 |
| 1.4.13 | 2024-07-13 | [41734](https://github.com/airbytehq/airbyte/pull/41734) | Update dependencies |
| 1.4.12 | 2024-07-10 | [41440](https://github.com/airbytehq/airbyte/pull/41440) | Update dependencies |
| 1.4.11 | 2024-07-09 | [41164](https://github.com/airbytehq/airbyte/pull/41164) | Update dependencies |
| 1.4.10 | 2024-07-06 | [40981](https://github.com/airbytehq/airbyte/pull/40981) | Update dependencies |
| 1.4.9 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 1.4.8 | 2024-06-26 | [40532](https://github.com/airbytehq/airbyte/pull/40532) | Update dependencies |
| 1.4.7 | 2024-06-25 | [40312](https://github.com/airbytehq/airbyte/pull/40312) | Update dependencies |
| 1.4.6 | 2024-06-22 | [40077](https://github.com/airbytehq/airbyte/pull/40077) | Update dependencies |
| 1.4.5 | 2024-06-17 | [39516](https://github.com/airbytehq/airbyte/pull/39516) | Update state handling for incremental streams |
| 1.4.4 | 2024-06-04 | [39059](https://github.com/airbytehq/airbyte/pull/39059) | [autopull] Upgrade base image to v1.2.1 |
| 1.4.3 | 2024-05-24 | [38649](https://github.com/airbytehq/airbyte/pull/38649) | Update deprecated auth package |
| 1.4.2 | 2024-04-19 | [36639](https://github.com/airbytehq/airbyte/pull/36639) | Updating to 0.80.0 CDK |
| 1.4.1 | 2024-04-12 | [36639](https://github.com/airbytehq/airbyte/pull/36639) | Schema descriptions |
| 1.4.0 | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0` |
| 1.3.7 | 2024-02-12 | [35163](https://github.com/airbytehq/airbyte/pull/35163) | Manage dependencies with Poetry |
| 1.3.6 | 2023-10-26 | [31863](https://github.com/airbytehq/airbyte/pull/31863) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 1.3.5 | 2023-09-28 | [30822](https://github.com/airbytehq/airbyte/pull/30822) | Fix primary key for custom reports |
| 1.3.4 | 2023-09-27 | [30785](https://github.com/airbytehq/airbyte/pull/30785) | Do not migrate config for the newly created connections |
| 1.3.3 | 2023-08-29 | [29941](https://github.com/airbytehq/airbyte/pull/29941) | Added `primary key` to each stream, added `custom_report` config migration |
| 1.3.2 | 2023-08-25 | [29829](https://github.com/airbytehq/airbyte/pull/29829) | Make `Start Date` a non-required, added the `suggested streams`, corrected public docs |
| 1.3.1 | 2023-08-24 | [29329](https://github.com/airbytehq/airbyte/pull/29329) | Update tooltip descriptions |
| 1.3.0 | 2023-08-24 | [29750](https://github.com/airbytehq/airbyte/pull/29750) | Add new `Keyword-Site-Report-By-Site` stream |
| 1.2.2 | 2023-08-23 | [29741](https://github.com/airbytehq/airbyte/pull/29741) | Handle `HTTP-401`, `HTTP-403` errors |
| 1.2.1 | 2023-07-04 | [27952](https://github.com/airbytehq/airbyte/pull/27952) | Removed deprecated `searchType`, added `discover`(Discover results) and `googleNews`(Results from news.google.com, etc.) types |
| 1.2.0 | 2023-06-29 | [27831](https://github.com/airbytehq/airbyte/pull/27831) | Add new streams |
| 1.1.0 | 2023-06-26 | [27738](https://github.com/airbytehq/airbyte/pull/27738) | License Update: Elv2 |
| 1.0.2 | 2023-06-13 | [27307](https://github.com/airbytehq/airbyte/pull/27307) | Fix `data_state` config typo |
| 1.0.1 | 2023-05-30 | [26746](https://github.com/airbytehq/airbyte/pull/26746) | Remove `authSpecification` from connector spec in favour of advancedAuth |
| 1.0.0 | 2023-05-24 | [26452](https://github.com/airbytehq/airbyte/pull/26452) | Add data_state parameter to specification |
| 0.1.22 | 2023-03-20 | [22295](https://github.com/airbytehq/airbyte/pull/22295) | Update specification examples |
| 0.1.21 | 2023-02-14 | [22984](https://github.com/airbytehq/airbyte/pull/22984) | Specified date formatting in specification |
| 0.1.20 | 2023-02-02 | [22334](https://github.com/airbytehq/airbyte/pull/22334) | Turn on default HttpAvailabilityStrategy |
| 0.1.19 | 2023-01-27 | [22007](https://github.com/airbytehq/airbyte/pull/22007) | Set `AvailabilityStrategy` for streams explicitly to `None` |
| 0.1.18 | 2022-10-27 | [18568](https://github.com/airbytehq/airbyte/pull/18568) | Improved config validation: custom_reports.dimension |
| 0.1.17 | 2022-10-08 | [17751](https://github.com/airbytehq/airbyte/pull/17751) | Improved config validation: start_date, end_date, site_urls |
| 0.1.16 | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/pull/17304) | Migrate to per-stream state. |
| 0.1.15 | 2022-09-16 | [16819](https://github.com/airbytehq/airbyte/pull/16819) | Check available site urls to avoid 403 error on sync |
| 0.1.14 | 2022-09-08 | [16433](https://github.com/airbytehq/airbyte/pull/16433) | Add custom analytics stream. |
| 0.1.13 | 2022-07-21 | [14924](https://github.com/airbytehq/airbyte/pull/14924) | Remove `additionalProperties` field from specs |
| 0.1.12 | 2022-05-04 | [12482](https://github.com/airbytehq/airbyte/pull/12482) | Update input configuration copy |
| 0.1.11 | 2022-01-05 | [9186](https://github.com/airbytehq/airbyte/pull/9186) | Fix incremental sync: keep all urls in state object |
| 0.1.10 | 2021-12-23 | [9073](https://github.com/airbytehq/airbyte/pull/9073) | Add slicing by date range |
| 0.1.9 | 2021-12-22 | [9047](https://github.com/airbytehq/airbyte/pull/9047) | Add 'order' to spec.json props |
| 0.1.8 | 2021-12-21 | [8248](https://github.com/airbytehq/airbyte/pull/8248) | Enable Sentry for performance and errors tracking |
| 0.1.7 | 2021-11-26 | [7431](https://github.com/airbytehq/airbyte/pull/7431) | Add default `end_date` param value |
| 0.1.6 | 2021-09-27 | [6460](https://github.com/airbytehq/airbyte/pull/6460) | Update OAuth Spec File |
| 0.1.4 | 2021-09-23 | [6394](https://github.com/airbytehq/airbyte/pull/6394) | Update Doc link Spec File |
| 0.1.3 | 2021-09-23 | [6405](https://github.com/airbytehq/airbyte/pull/6405) | Correct Spec File |
| 0.1.2 | 2021-09-17 | [6222](https://github.com/airbytehq/airbyte/pull/6222) | Correct Spec File |
| 0.1.1 | 2021-09-22 | [6315](https://github.com/airbytehq/airbyte/pull/6315) | Verify access to all sites when performing connection check |
| 0.1.0 | 2021-09-03 | [5350](https://github.com/airbytehq/airbyte/pull/5350) | Initial Release |

</details>

</HideInUI>
