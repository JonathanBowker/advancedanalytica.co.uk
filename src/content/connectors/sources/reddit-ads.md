---
generated_record: true
connector_name: Reddit Ads
connector_type: source
connector_slug: reddit-ads
connector_directory: source-reddit-ads
definition_id: c876992b-877e-4bb3-946b-4678c82bb7ac
version: 1.0.5
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/reddit-ads
logo: /images/connectors/sources/reddit-ads.svg
logo_source_path: airbyte-integrations/connectors/source-reddit-ads/icon.svg
logo_sha256: bd8538c4fff09a858d0df5ec7cc444086878d4c223a4471cd4a6f9e694a77659
original_metadata_path: airbyte-integrations/connectors/source-reddit-ads/metadata.yaml
original_metadata_sha256: 4f064c4dc7c5b11abc5ef17f57e8f4e12ec581520dda2bdb1f68e00a68c6a704
original_document_path: docs/integrations/sources/reddit-ads.md
original_document_sha256: ee7220bf60e4cef355ac93a844e4de0d3123c0fbedaa240e4909df41adf66e90
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: e02ed658e309ebc5d539bcddd3a003f4fec12ea9a9923ba08886118e979e9ab5
rewritten_at: 2026-11-12T13:54:07.058860+00:00
---

# Reddit Ads

The Reddit Ads source syncs data from the [Reddit Ads API v3](https://ads-api.reddit.com/docs/v3/api/reddit-advertising-api) for one ad account. This includes the account, campaigns, ads and ad groups. It also includes daily performance metrics for the account, campaigns, ads and ad groups.

## Before you start

- A [Reddit Ads](https://ads.reddit.com) account with at least one ad account. You also need a Reddit user with access to the ad account you want to sync.
- The **Ad Account ID** for the ad account you want to sync. It starts with `a2_`. See [Find your ad account ID](#find-your-ad-account-id).
- Credentials for the **Authentication** field, based on your chosen option:
  - **Authenticate with Reddit**: You don't need to prepare anything. Sign in to Reddit from Airbyte, which obtains the refresh token for you.
  - **Use your own Reddit app**:
    - The **OAuth Client ID** and **OAuth Client Secret** for a Reddit developer app. Reddit displays these as the app ID and secret. This connector uses them as the client ID and client secret. Only business admins with a verified Reddit account can create a developer app. See [Create a developer app](#create-a-developer-app).
    - An **OAuth Refresh Token** for that app, authorised with the `adsread` scope. See [Get a refresh token](#get-a-refresh-token).
- Optional: a **User Agent** to send when the connector requests access tokens from Reddit. If empty, the connector sends an Airbyte user agent.

## Set up the connector

Choose one of two **Authentication** options:

- **Authenticate with Reddit**: Sign in to Reddit from Airbyte, which obtains the refresh token for you. This is the default option in Airbyte Cloud. You don't need a developer app, so skip [Create a developer app](#create-a-developer-app) and [Get a refresh token](#get-a-refresh-token).
- **Use your own Reddit app**: Enter the client ID, client secret and refresh token for a Reddit developer app you manage. Choose this option for self-managed Airbyte or an existing developer app. Complete [Create a developer app](#create-a-developer-app) and [Get a refresh token](#get-a-refresh-token) first.

Sources created before version 0.2.0 automatically move to **Use your own Reddit app**. They keep their existing client ID, client secret and refresh token, so you don't need to act.

### Step 1: Set up Reddit Ads

#### Create a developer app

You only need a developer app for the **Use your own Reddit app** option.

1. In [Reddit Ads Manager](https://ads.reddit.com), open your business's **Developer Applications** page.
2. Select **Add Apps** > **Create an app**. Then enter the app name, About URL, redirect URL and primary contact. Reddit requires a redirect URL, although the connector never uses it interactively. You can enter any URL you control, such as `https://example.com/oauth/callback`.
3. Select **Create App**. Reddit displays the app ID and secret. Copy both values. The app ID is your **OAuth Client ID**, and the secret is your **OAuth Client Secret**.

If you already have a Reddit app under **Preferences** > **Apps**, select **Add Apps** > **Migrate an existing app** instead. Migrating restricts the app's scope to the Ads API.

For more details, see Reddit's [Create a Developer Application](https://ads-api.reddit.com/docs/v3/guides/quick-start/create-dev-app) guide.

#### Get a refresh token

You only need a refresh token for the **Use your own Reddit app** option. The connector authenticates through the OAuth refresh token grant, which requires a long-lived refresh token. Get one through the authorisation code flow in Reddit's [authentication guide](https://ads-api.reddit.com/docs/v3/guides/quick-start/authenticate).

1. Sign in to Reddit as the user whose ads data you want to sync. Then open the following URL in a browser and replace the placeholders:

   ```text
   https://www.reddit.com/api/v1/authorize?client_id=YOUR_APP_ID&response_type=code&state=airbyte&redirect_uri=YOUR_REDIRECT_URL&duration=permanent&scope=adsread
   ```

   Set `duration` to `permanent`. A `temporary` authorisation doesn't return a refresh token, so the connector can't sync. The connector only needs the `adsread` scope.

2. Select **Allow**. Reddit redirects you to your redirect URL with a `code` query parameter. Copy the code and remove any trailing `#_` characters. The code expires after 10 minutes and works once.

3. Exchange the code for tokens:

   ```bash
   curl -X POST https://www.reddit.com/api/v1/access_token \
     -H 'content-type: application/x-www-form-urlencoded' \
     -A 'YOUR_USER_AGENT' \
     -u 'YOUR_APP_ID:YOUR_APP_SECRET' \
     -d 'grant_type=authorization_code&code=YOUR_CODE&redirect_uri=YOUR_REDIRECT_URL'
   ```

4. Copy the `refresh_token` value from the response. This is your **OAuth Refresh Token**. The connector uses it to obtain access tokens, so you don't need the `access_token` value.

#### Find your ad account ID

Sign in to [Reddit Ads Manager](https://ads.reddit.com/account/). Your ad account ID appears in the top-right corner and starts with `a2_`.

You can also open **Business Manager** > **Assets** > **Ad Accounts** in Reddit Ads Manager. The ID appears below the ad account's name and starts with `a2_`. Alternatively, call [List Ad Accounts By Business](https://ads-api.reddit.com/docs/v3/api/ad-accounts) with an access token for your app.

### Step 2: Set up Reddit Ads in Airbyte

Except for **Authentication**, the source uses the same fields in Airbyte Cloud and Airbyte Open Source:

- **Ad Account ID**: Required. Enter the ID from [Find your ad account ID](#find-your-ad-account-id), such as `a2_abc123`.
- **User Agent**: Optional. This is the [user agent](https://ads-api.reddit.com/docs/v3/api/reddit-advertising-api#user-agents) sent when the connector requests a new access token. The connector sends it to Reddit's token endpoint, `https://www.reddit.com/api/v1/access_token`. Reddit recommends the format `platform:app_id:version (by /u/username)`, for example `airbyte:reddit-ads-sync:v1.0 (by /u/your-username)`. If empty, the connector sends `airbyte:source-reddit-ads:v1`. The connector doesn't send this value with requests that read your ads data.
- **Start Date**: Optional. Set the earliest data to sync in RFC 3339 format with a UTC offset, such as `2024-05-11T00:00:00Z`. This setting applies to incremental streams. It sets the earliest `modified_at` for `ad`, `ad_group` and `campaign`. It also sets the earliest report date for the four report streams. If empty, these streams start 24 months before the current sync.
- **Number of Concurrent Workers**: Optional. Set the number of parallel requests from 1 to 10. The default is 3. Higher values can accelerate syncs but increase the chance of Reddit rate limiting.
- **Report Lookback Window (Days)**: Optional. Set the whole days re-read before the last synced report date during each incremental sync. Choose from 0 to 30. The default is 7 days.

#### Airbyte Cloud

1. In Airbyte Cloud, create a source and select **Reddit Ads**.
2. Under **Authentication**, select **Authenticate with Reddit**, then select **Authenticate your Reddit Ads account**. Sign in to Reddit as a user with access to the ad account you want to sync. Then select **Allow**. To use your own developer app, select **Use your own Reddit app** instead. Then follow step 2 of [For Airbyte Open Source](#for-airbyte-open-source).
3. Enter the **Ad Account ID**.
4. Optionally, set **User Agent**, **Start Date**, **Number of Concurrent Workers** and **Report Lookback Window (Days)**.
5. Select **Set up source**.

#### Airbyte Open Source

1. In Airbyte, create a source and select **Reddit Ads**.
2. Under **Authentication**, select **Use your own Reddit app**. Enter the **OAuth Client ID** and **OAuth Client Secret** from [Create a developer app](#create-a-developer-app). Then enter the **OAuth Refresh Token** from [Get a refresh token](#get-a-refresh-token).
3. Enter the **Ad Account ID**.
4. Optionally, set **User Agent**, **Start Date**, **Number of Concurrent Workers** and **Report Lookback Window (Days)**.
5. Select **Set up source**.

## Supported sync modes

The Reddit Ads source supports these sync modes:

- [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite)
- [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped)

`ad_account` only supports full refresh. The other seven streams support both full refresh and incremental sync.

## Supported streams

| Stream | API endpoint | Primary key | Incremental cursor |
| --- | --- | --- | --- |
| `ad_account` | `GET /api/v3/ad_accounts/{ad_account_id}` | `id` | None |
| `ad` | `GET /api/v3/ad_accounts/{ad_account_id}/ads` | `id` | `modified_at` |
| `ad_group` | `GET /api/v3/ad_accounts/{ad_account_id}/ad_groups` | `id` | `modified_at` |
| `campaign` | `GET /api/v3/ad_accounts/{ad_account_id}/campaigns` | `id` | `modified_at` |
| `ad_account_report` | `POST /api/v3/ad_accounts/{ad_account_id}/reports` | `account_id`, `date` | `date` |
| `campaign_report` | `POST /api/v3/ad_accounts/{ad_account_id}/reports` | `campaign_id`, `date` | `date` |
| `ad_group_report` | `POST /api/v3/ad_accounts/{ad_account_id}/reports` | `ad_group_id`, `date` | `date` |
| `ad_report` | `POST /api/v3/ad_accounts/{ad_account_id}/reports` | `ad_id`, `date` | `date` |

All eight streams read from the single ad account you configure. To sync multiple ad accounts, create one source for each account.

`campaign_report`, `ad_account_report`, `ad_group_report` and `ad_report` return one row for each entity per UTC day. The entities are campaigns, accounts, ad groups and ads, respectively. Rows include delivery and conversion metrics, such as impressions, clicks, spend, reach and frequency. They also include per-objective conversion counts and values.

### Performance

Reddit applies rate limits by Reddit app, authorised user and endpoint group. Sources using the same app and Reddit user share these limits. The connector calls endpoints in two groups:

| Reddit rate limit group | Endpoints | Streams | Quota |
| --- | --- | --- | --- |
| `ads-campaign-management-read` | Get Ad Account, List Ads, List Ad Groups, List Campaigns | `ad_account`, `ad`, `ad_group`, `campaign` | 400 requests per 60 seconds |
| `ads-reporting` | Get A Report | `ad_account_report`, `campaign_report`, `ad_group_report`, `ad_report` | 60 requests per 60 seconds |

The connector throttles its requests to stay within these quotas. It only counts its own requests. Other sources using the same app and Reddit user can still exceed the limit. Each report stream requests a continuous three-day UTC window per call. A long backfill therefore makes many report calls.

By default, the connector runs up to 3 parallel requests. You can change this with **Number of Concurrent Workers**, up to a maximum of 10. Lower this value if syncs often reach rate limits.

The connector retries `429` and `5xx` responses up to 10 times with exponential backoff. See Reddit's [rate limiting](https://ads-api.reddit.com/docs/v3/guides/quick-start/rate-limiting#rate-limit-endpoint-groups) documentation for all endpoint groups and quotas.

The connector reuses an access token until it expires, then refreshes it. If a request still fails with `401`, the connector refreshes the token and retries the request. If Reddit returns a new refresh token, the connector saves it to the source configuration. You don't need to rotate it yourself.

## Limitations and troubleshooting

### Sync behaviour and limitations

- **Report metrics use micro-units.** Reddit multiplies `spend`, `cpc`, `cpv`, `ecpm` and the `conversion_*_ecpa` metrics by 1,000,000. It multiplies the `conversion_*_total_value` metrics by 100. The connector loads these values unchanged. Divide them in your destination before reporting currency amounts. Since version 1.0.0, `spend` and the `conversion_*_total_value` metrics are integers. Some warehouses truncate integer division, so cast these values to a decimal type before dividing.
- **Recent report data changes after it lands.** Reddit says metrics can take up to 6 hours to stabilise. A daily refresh applies late conversions to earlier hours or days. Each incremental report-stream sync re-reads the last synced date and the configured **Report Lookback Window (Days)**. Conversion metrics follow your ad account's attribution window. To include late conversions from older days, increase the lookback to cover that window, up to 30 days. Use **Incremental | Append + Deduped** so re-read rows replace earlier rows. The current UTC day's row remains partial until a sync runs after the day ends.
- **Report streams re-read days without data.** A report stream saves its latest row's date as its state. Without delivery after that date, each incremental sync requests every later day again. An account with no delivery history requests the full 24 months during every sync.
- **Refresh the source schema after upgrading to 1.0.0.** Version 1.0.0 types the `ad` and `campaign` timestamps as date-times. It types the report `date` as a date in `YYYY-MM-DD` format. It also types 26 count and micro-currency report metrics, plus `campaign.spend_cap`, as integers. The version also adds `start_time` and `end_time` to `campaign`. Connections syncing only `ad_account` and `ad_group` don't need any action. Only clear a stream if a sync fails after the schema refresh. Some destinations can't change an existing column's type, including S3 Data Lake and other Iceberg destinations. If this happens, back up the affected tables. Then clear only the streams named in the error and sync them again. See the [Reddit Ads migration guide](./reddit-ads-migrations.md#upgrading-to-100) for full instructions and the risks of clearing report streams.
- **Refresh `campaign_report` after upgrading from a version earlier than 0.3.0.** Earlier versions requested report windows with gaps. Any sync covering more than three days left some dates missing or partial, including the first sync. Each incremental sync also resent the row before the last synced date with only that day's final 7 hours. The lookback window only corrects recent days, so run a [refresh](https://docs.airbyte.com/platform/operator-guides/refreshes) with **Refresh stream and retain records**. In **Incremental | Append** mode, keep the latest row for each `campaign_id` and `date`. Don't use **Refresh stream and remove records** or **Clear**. Reddit only provides the last 24 months of report data, so you can't resync older rows. Full refresh syncs correct themselves during the next sync.
- **Report history has a limit.** Delivery data covers the last 24 months. Reach and frequency data begins in June 2024. If **Start Date** is earlier, report streams still start 24 months before the current sync. Reddit rejects requests for older report data. `ad`, `ad_group` and `campaign` aren't clamped.
- **Report streams use fixed breakdowns.** Each report stream breaks metrics down by entity ID and UTC date. `ad_group_report` and `ad_report` also break data down by campaign, so their rows include `campaign_id`. `ad_account_report` sets `account_id` to your **Ad Account ID**. To find an `ad_report` row's ad group, join `ad` on `ad_id`. Country and region breakdowns aren't available. Custom conversion events by name aren't available either.
- **Versions earlier than 0.0.9 synced only the first page of each stream.** Reddit returns the next-page token URL-encoded. Earlier versions passed it back without decoding it, so every stream stopped after its first page. After upgrading from an earlier version, clear affected streams if records are missing from your destination. Then run a new sync.
- **`ad`, `ad_group`, and `campaign` read every record on each sync.** The Reddit API can't filter these lists by `modified_at`. Each incremental sync therefore requests every record in the ad account. It keeps only records modified since the previous sync, or since **Start Date** during the first sync. Sync duration depends on the account's size, not the amount of new data.
- **Deletions aren't detected.** The connector doesn't detect or mark deletions. Reddit marks a deleted ad, ad group or campaign with a `configured_status` or `effective_status` of `DELETED`. If Reddit still lists the item, the connector syncs it with that status. If Reddit stops listing it, the last-synced row remains in your destination. A **Full Refresh | Overwrite** sync replaces the table.

### Troubleshooting

| Error | Cause and fix |
| --- | --- |
| Refresh token was rejected by the OAuth provider | Reddit's token endpoint rejected the refresh token or the client credentials. If you use **Authenticate with Reddit**, select **Authenticate your Reddit Ads account** again. If you use **Use your own Reddit app**, confirm the OAuth Client ID and Client Secret, then [get a new refresh token](#get-a-refresh-token) with `duration=permanent`. |
| Reddit denied access to ad account (HTTP 403) | The refresh token lacks the `adsread` scope, or the Reddit user who authorized it can't access this ad account. Re-authenticate, or get a new refresh token with the `adsread` scope, while signed in as a user with access to the ad account. |
| Reddit could not find ad account (HTTP 404) or Reddit rejected the ad account ID | The **Ad Account ID** is wrong. [Find your ad account ID](#find-your-ad-account-id), which starts with `a2_`, and update the source. |
| Reddit rejected the request as invalid (HTTP 400) | Reddit rejected the request for a reason unrelated to the ad account. The error message includes the explanation Reddit returned. |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| ------------------ | ------------------- | -------------- | ---------------- |
| 1.0.5 | 2026-11-10 | [91692](https://github.com/airbytehq/airbyte/pull/91692) | Update dependencies |
| 1.0.4 | 2026-11-03 | [90706](https://github.com/airbytehq/airbyte/pull/90706) | Update dependencies |
| 1.0.3 | 2026-10-27 | [90048](https://github.com/airbytehq/airbyte/pull/90048) | Update dependencies |
| 1.0.2 | 2026-10-22 | [89672](https://github.com/airbytehq/airbyte/pull/89672) | Promote to certified |
| 1.0.1 | 2026-10-22 | [89670](https://github.com/airbytehq/airbyte/pull/89670) | Use Reddit's official icon from the Reddit Brand System; document where to find the ad account ID |
| 1.0.0 | 2026-10-20 | [89083](https://github.com/airbytehq/airbyte/pull/89083) | Type timestamp, date and integer fields to match Reddit's API and normalize report `date` to `YYYY-MM-DD` |
| 0.4.1 | 2026-10-20 | [88784](https://github.com/airbytehq/airbyte/pull/88784) | Update dependencies |
| 0.4.0 | 2026-10-16 | [88964](https://github.com/airbytehq/airbyte/pull/88964) | Add ad_account, ad_group, ad_account_report, ad_group_report and ad_report streams; show Reddit's field-level reason in HTTP 400 error messages |
| 0.3.0 | 2026-10-15 | [88963](https://github.com/airbytehq/airbyte/pull/88963) | Fix campaign_report windows that skipped one day in every three and overwrote earlier days with partial data; add a configurable report lookback window |
| 0.2.0 | 2026-10-14 | [88145](https://github.com/airbytehq/airbyte/pull/88145) | Add OAuth (Authenticate with Reddit) for Airbyte Cloud with automatic config migration to a credentials object; make User Agent optional |
| 0.1.1 | 2026-10-06 | [88015](https://github.com/airbytehq/airbyte/pull/88015) | Update dependencies |
| 0.1.0 | 2026-10-05 | [87043](https://github.com/airbytehq/airbyte/pull/87043) | Show actionable errors for rejected refresh tokens or client credentials, invalid ad account IDs, and 400/403/404 responses, add a client-side API budget and configurable concurrency, add suggested streams, make spec titles human-readable, and add unit tests |
| 0.0.12 | 2026-09-29 | [87338](https://github.com/airbytehq/airbyte/pull/87338) | Update dependencies |
| 0.0.11 | 2026-09-22 | [86789](https://github.com/airbytehq/airbyte/pull/86789) | Update dependencies |
| 0.0.10 | 2026-09-15 | [86198](https://github.com/airbytehq/airbyte/pull/86198) | Update dependencies |
| 0.0.9 | 2026-09-09 | [84850](https://github.com/airbytehq/airbyte/pull/84850) | Fix pagination so every stream syncs all pages instead of only the first |
| 0.0.8 | 2026-09-08 | [85629](https://github.com/airbytehq/airbyte/pull/85629) | Update dependencies |
| 0.0.7 | 2026-08-18 | [84348](https://github.com/airbytehq/airbyte/pull/84348) | Enable acceptance test suite with GSM test secrets |
| 0.0.6 | 2026-08-18 | [84725](https://github.com/airbytehq/airbyte/pull/84725) | Update dependencies |
| 0.0.5 | 2026-08-11 | [84089](https://github.com/airbytehq/airbyte/pull/84089) | Update dependencies |
| 0.0.4 | 2026-08-04 | [83603](https://github.com/airbytehq/airbyte/pull/83603) | Update dependencies |
| 0.0.3 | 2026-08-04 | [83266](https://github.com/airbytehq/airbyte/pull/83266) | Stop refreshing the access token before every request, and refresh it before retrying a 401. Make `start_time` optional, apply it to all three streams, and default it to 24 months before the sync; clamp `campaign_report` to Reddit's 24-month reporting window |
| 0.0.2 | 2026-07-28 | [83100](https://github.com/airbytehq/airbyte/pull/83100) | Update dependencies |
| 0.0.1 | 2026-07-27 | [81399](https://github.com/airbytehq/airbyte/pull/81399) | Initial release by [@Ella6882](https://github.com/Ella6882) via Connector Builder |

</details>
