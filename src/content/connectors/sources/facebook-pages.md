---
generated_record: true
connector_name: Facebook Pages
connector_type: source
connector_slug: facebook-pages
connector_directory: source-facebook-pages
definition_id: 010eb12f-837b-4685-892d-0a39f76a98f5
version: 3.3.0
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/sources/facebook-pages
logo: /images/connectors/sources/facebook-pages.svg
logo_source_path: airbyte-integrations/connectors/source-facebook-pages/icon.svg
logo_sha256: 6b9a79ad1da9039afeb50c79cc5a31eaea44baa139734b4b979aa4ecb2a13a9e
original_metadata_path: airbyte-integrations/connectors/source-facebook-pages/metadata.yaml
original_metadata_sha256: 71655c7701369b0f8a38fdc2d6eb5da9173fb0489b8ebf6768b8cb84dee6dbdc
original_document_path: docs/integrations/sources/facebook-pages.md
original_document_sha256: 19346a5ccd0ddf54821eca95e06d1b7e3b0c335948fd6a96955e84ec2deac9e4
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 06f5c56e3823e5626e529cffd3e91bc5f38aa99b9b8da27f1b48a9e6bec6745e
rewritten_at: 2026-11-12T14:07:04.758041+00:00
---

# Facebook Pages

Set up the Facebook Pages source connector and find its reference information on this page.

## Prerequisites

You need a Facebook app, a long-lived Page access token and the Page ID you want to sync.

:::note
This connector calls v26.0 of the Facebook Graph API.
:::

Meta only returns Page Insights data for Pages with at least 100 likes. The connector checks your connection by reading the `page_insights` stream. An empty response still passes. You can therefore set up a Page with fewer than 100 likes and sync non-insights streams, including `page` and `post`. Its insights streams return no records until the Page reaches 100 likes.

## Setup guide

### Step 1: Set up Facebook Pages

1. Create a Facebook Developer Account. Follow [these instructions](https://developers.facebook.com/async/registration/) to create one.
2. Create a [Facebook App](https://developers.facebook.com/apps/). Choose "Company" as the app's purpose. Complete the remaining fields, create your app and follow the "Connect a User Page" section.
3. Connect a User [Page](https://developers.facebook.com/tools/explorer/) using the Graph API Explorer. Choose your app in the `Meta App` field. Choose your Page in the `User or Page` field. Add these permissions:
   - pages_read_engagement
   - pages_read_user_content
   - pages_show_list
   - read_insights
4. Click Generate Access Token and follow the instructions.

After completing these steps, your setup should look similar to this:

![](/.gitbook/assets/facebook-pages-1.png)

5. [Generate](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived#get-a-long-lived-user-access-token) Long-Lived User Access Token.
6. [Generate](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived#long-lived-page-token) Long-Lived Page Token.

### Step 2: Set up the connector in Airbyte

1. Click **Sources** in the left navigation bar. Click **+ New source** in the top-right corner.
2. Select **Facebook Pages** and enter a source name.
3. For **Page Access Token**, enter the long-lived Page token you generated in Step 1. You can also use a long-lived User token. That user must be able to generate a Page token for the configured Page.
4. For **Page ID**, enter the Page's ID or username. If the Page URL is `https://www.facebook.com/Test-1111111111`, use `Test-1111111111`.
5. (Optional) Set **Page Size** to control the records requested per API call for each paginated stream. These streams are `post`, `post_insights`, `video_insights`, `reel_insights`, `comment` and `rating`. The default is 100, and valid values range from 1 to 100. Reduce it if you see "Please reduce the amount of data you're asking for" errors.
6. (Optional) Set **Page Insights Metrics**, **Post Insights Metrics**, **Video Insights Metrics** or **Reel Insights Metrics** to choose the metrics requested by each insights stream. See [Insights metrics and period](#insights-metrics-and-period).
7. (Optional) Set **Page Insights Period** to request one aggregation period, such as `day`, for the `page_insights` stream. Valid values are `day`, `week`, `days_28`, `month`, `lifetime` and `total_over_range`.
8. (Optional) Set **Start Date** to the earliest date read by the `page_insights` stream. Use the `YYYY-MM-DDTHH:MM:SSZ` format, for example `2024-01-01T00:00:00Z`. Meta retains about two years of Page Insights history. See [Supported sync modes](#supported-sync-modes).
9. Click **Set up source**.

### Create your own OAuth App

Follow [Facebook documentation](https://developers.facebook.com/docs/development/create-an-app/) to create an OAuth App.

Your OAuth App needs these permissions to sync data through the Facebook Pages source connector:

- `pages_read_engagement`
- `pages_read_user_content`
- `pages_show_list`
- `read_insights`

If specific Page fields return permission errors, see [Meta's Permissions Reference](https://developers.facebook.com/docs/permissions) for other permissions you might need. Request the fewest permissions required for normal operation.

## Supported sync modes

The Facebook Pages source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append) (`post` and `page_insights` streams only)

The `post` stream uses full refresh by default. In Incremental mode, the connector saves the newest `created_time` it has seen. During the next sync, it asks Facebook only for posts created after that point. This reduces the data read during every sync after the first. The first incremental sync reads the complete post history. A full refresh always reads the complete history. The filter uses each post's creation time. Therefore, incremental mode doesn't refresh later edits, reactions or comment counts for previously synced posts. Use full refresh when you need that data to remain current.

The `page_insights` stream uses full refresh by default, requesting only Facebook's default trailing window. In Incremental mode, the connector saves the newest `end_time` it has seen. During the next sync, it asks Facebook only for subsequent days. Set **Start Date** to backfill history. The connector reads 90-day windows because Facebook returns at most 90 days per request. Facebook retains about two years of history. **Start Date** applies in both modes. A full refresh with this setting also reads 90-day windows from that date. Facebook's newest point usually belongs to a day still in progress. Each incremental sync therefore rereads the two days before the saved `end_time`. You can expect those days to reappear in your destination. Each record represents one metric and period for one window. If your destination deduplicates by primary key, use Incremental - Append instead of a deduplicated mode. Otherwise, windows overwrite each other. If you leave **Start Date** empty, the first incremental sync reads Facebook's default window. Later syncs continue from that point. A connection paused for over 90 days might need a reset or a **Start Date** before catching up.

## Supported streams

Version 3.1.0 added the `video_insights`, `reel_insights`, `comment` and `rating` streams. They need permissions that older tokens might lack. Facebook might reject their requests with error code `10` or a code from `200` to `299`. It might instead return a message mentioning a permission. The connector logs the error and skips the request instead of failing the sync. These streams can therefore sync zero records without an error. If one is empty, confirm your token has the permissions listed in [Step 1](#step-1-set-up-facebook-pages).

| Stream | Graph API endpoint | Notes |
| :--- | :--- | :--- |
| `page` | [`/{page-id}`](https://developers.facebook.com/docs/graph-api/reference/v26.0/page/#overview) | One record describing the Page. Airbyte requests only the fields you select in the connection's **Schema** tab. |
| `post` | [`/{page-id}/feed`](https://developers.facebook.com/docs/graph-api/reference/v26.0/page/feed) | One record per post. Paginated, so **Page Size** applies. Airbyte requests only the fields you select. Supports incremental sync on `created_time`. |
| `page_insights` | [`/{page-id}/insights`](https://developers.facebook.com/docs/graph-api/reference/v26.0/page/insights) | One record per metric and period, not per day. Metrics and period are configurable. Supports incremental sync on `end_time`, with **Start Date** to backfill. |
| `post_insights` | [`/{page-id}/feed`](https://developers.facebook.com/docs/graph-api/reference/v26.0/page/feed) with an `insights.metric(...)` field selection | Post-level [insights](https://developers.facebook.com/docs/graph-api/reference/v26.0/insights), one record per metric and period. Paginated, so **Page Size** applies. Metrics are configurable. |
| `video_insights` | [`/{page-id}/videos`](https://developers.facebook.com/docs/graph-api/reference/page/videos/) with a `video_insights.metric(...)` field selection | Lifetime [video insights](https://developers.facebook.com/docs/graph-api/reference/video/video_insights/) per Page video, one record per metric. Paginated, so **Page Size** applies. Metrics are configurable. |
| `reel_insights` | [`/{page-id}/video_reels`](https://developers.facebook.com/docs/video-api/guides/reels-publishing/) with a `video_insights.metric(...)` field selection | Lifetime [Reels insights](https://developers.facebook.com/docs/graph-api/reference/video/video_insights/#reels-metrics) per Page reel, such as `blue_reels_play_count`, one record per metric. Paginated, so **Page Size** applies. Metrics are configurable. |
| `comment` | [`/{post-id}/comments`](https://developers.facebook.com/docs/graph-api/reference/post/comments/) for each post in `/{page-id}/feed` | One record per comment, including replies, with the parent `post_id` added. This makes one request per post, so a Page with many posts uses many API calls. Needs `pages_read_user_content`. |
| `rating` | [`/{page-id}/ratings`](https://developers.facebook.com/docs/graph-api/reference/page/ratings/) | One record per recommendation or review. Recommendations have no ID of their own, so this stream has no primary key. Needs `pages_read_user_content`. |

### Insights metrics and period

Choose the metrics requested by each insights stream using **Page Insights Metrics**, **Post Insights Metrics**, **Video Insights Metrics** and **Reel Insights Metrics**. If you leave a setting empty, the connector requests these defaults:

- `page_insights`: `page_total_actions`, `page_post_engagements`, `page_fan_adds_by_paid_non_paid_unique`, `page_media_view`, `page_total_media_view_unique`
- `post_insights`: `post_media_view`, `post_total_media_view_unique`, `post_clicks`, `post_clicks_by_type`, `post_reactions_by_type_total`
- `video_insights`: `total_video_views`, `total_video_complete_views`, `total_video_avg_time_watched`, `total_video_view_total_time`, `total_video_reactions_by_type_total`
- `reel_insights`: `blue_reels_play_count`, `fb_reels_total_plays`, `fb_reels_replay_count`, `post_video_avg_time_watched`, `post_video_view_time`, `post_video_likes_by_reaction_type`, `post_video_social_actions`

By default, Facebook returns every supported period for each `page_insights` metric. These are usually `day`, `week` and `days_28`, producing about three records per metric and request. If you need only one, set **Page Insights Period** to that period. The stream then requests only that period.

A setting replaces the defaults instead of extending them, so include every metric you need. Facebook rejects the entire request if any metric is misspelt or deprecated. After changing a setting, check that list first if a sync returns the "must be a valid insights metric" error. Each additional metric also increases the response size and your Graph API usage.

All insights streams follow Meta's Page Insights limits. Data is available only for Pages with at least 100 likes. Most metrics refresh every 24 hours, and Meta retains at most two years of history.

## Reference

This connector uses the [Meta Graph API](https://developers.facebook.com/docs/graph-api/) with the `https://graph.facebook.com/v26.0` endpoint.
Airbyte requests the selected Page and Post fields from the connector catalogue. It also requests your configured insights metrics, or the defaults listed in [Insights metrics and period](#insights-metrics-and-period).

Use these parameter names for programmatic configuration:

| Field | Required | Description |
| :--- | :---: | :--- |
| `access_token` | Yes | Long-lived Page access token for the Facebook Page. The connector also accepts a long-lived User access token that can generate a Page access token for the configured Page. |
| `page_id` | Yes | Facebook Page ID. |
| `page_size` | No | Number of records to request per page for the paginated streams: `post`, `post_insights`, `video_insights`, `reel_insights`, `comment`, and `rating`. Defaults to `100`. Valid values are `1` through `100`. |
| `page_insights_metrics` | No | Array of metrics for the `page_insights` stream. Replaces the defaults. |
| `post_insights_metrics` | No | Array of metrics for the `post_insights` stream. Replaces the defaults. |
| `video_insights_metrics` | No | Array of lifetime metrics for the `video_insights` stream. Replaces the defaults. |
| `reel_insights_metrics` | No | Array of lifetime metrics for the `reel_insights` stream. Replaces the defaults. |
| `page_insights_period` | No | Aggregation period for the `page_insights` stream: `day`, `week`, `days_28`, `month`, `lifetime`, or `total_over_range`. If empty, Facebook returns every period it supports. |
| `start_date` | No | Earliest date for the `page_insights` stream, in the format `YYYY-MM-DDTHH:MM:SSZ`. If empty, Facebook's default window is used. |

## Limitations and troubleshooting

### "This application has not been approved to use this API"

This error means Meta rejected the API request. The app that generated the token lacks approval for the requested API, permission or Page field.

Use a token from an app with the permissions required by the streams you sync:

- `pages_read_engagement`
- `pages_read_user_content`
- `pages_show_list`
- `read_insights`

Your own Meta app might need [App Review](https://developers.facebook.com/docs/resp-plat-initiatives/appreview/tutorial/) and Advanced Access to use these permissions in production.
The person generating the token must also be able to perform the required Page task.
For Page Insights, Meta requires access to a Page you own or administer. Alternatively, you must be able to perform the `ANALYZE` task on it.

### "Error while generating page access token"

Before reading any stream, the connector exchanges your configured token for a Page access token by calling [`/{page-id}?fields=access_token`](https://developers.facebook.com/docs/pages/access-tokens#get-a-page-access-token). If Meta rejects the call, the check or sync fails. It returns `Error while generating page access token:` followed by Meta's response.

Resolve this error as follows:

- Confirm that **Page ID** is the ID or username of the Page belonging to the token. A Page access token can generate a token only for its own Page.
- Confirm the user who generated the token can still perform a Page task. Also check that the token hasn't expired or become invalid, such as after a password change. Generate a new long-lived token if needed.

### "Please reduce the amount of data you're asking for"

The Graph API returns this error when a response is too large to build in time. It uses error code 1, often with HTTP 500. Meta returns it intermittently, so the connector retries the request with backoff. If all retries fail, the sync returns a transient error. It usually succeeds on a later attempt. Version 2.1.3 failed immediately with a configuration error instead of retrying. Upgrade to 2.1.4 or later to restore retries.

If the error continues, reduce each response's size:

- **Deselect fields in the Schema tab.** Open the connection's **Schema** tab and deselect unnecessary fields for the affected stream. The connector requests only selected fields. This applies to the `page` and `post` streams.
- **Reduce the page size.** Set **Page Size** in the source settings to a lower value, such as 25 or 50. This applies to the `post`, `post_insights`, `video_insights`, `reel_insights`, `comment` and `rating` streams.

### `page` failures for New Pages Experience Pages

Meta [deprecated](https://developers.facebook.com/docs/graph-api/changelog/version26.0) the legacy Page fields `current_location`, `genre`, `network`, `parking` and `start_info` for New Pages Experience Pages. Requesting these fields returns an error on Graph API v26.0 and later. The connector calls v26.0 from version 3.3.0. Meta plans to extend the deprecation to every API version. Meta also doesn't provide the `live_videos` edge for New Pages Experience Pages.

Before version 3.0.0, the connector requests these fields. The entire `page` stream therefore fails for a New Pages Experience Page. The sync returns either the `Request contains invalid/deprecated field.` error or the [`Facebook API request contains invalid Page fields, metrics, or permissions`](#facebook-api-request-contains-invalid-page-fields-metrics-or-permissions-error) error. A Facebook message beginning with `(#10) To use live-video-api` follows the error. Upgrade to version 3.0.0 or later, which no longer requests these fields. Then refresh the source schema and update downstream models referencing the removed columns. See [migration guide](/integrations/sources/facebook-pages-migrations#upgrading-to-300) for the complete list of removed columns.

### "Facebook API request contains invalid Page fields, metrics, or permissions"

From version 2.1.3, the connector returns this configuration error for non-retryable HTTP 400 responses from the Graph API. It includes Facebook's error message, showing what Facebook rejected. Earlier versions retried these requests several times before failing, which hid Facebook's message.

Read the Facebook message following the error. It usually identifies an unsupported Page or Post field, or one your token can't read. Deselect that field in the connection's **Schema** tab. Alternatively, use a token with the [required permissions](#creating-your-own-oauth-app).

### Missing reach metrics in Page Insights and Post Insights

Meta retired the `page_impressions_*_unique` and `post_impressions_*_unique` metrics. The Graph API rejects an entire Insights request when any requested metric is invalid. Requesting these metrics therefore returned `(#100) The value must be a valid insights metric` and broke both insights streams. It also broke source setup because the connection check queries `page_insights`. See [Meta's deprecated metrics list](https://developers.facebook.com/docs/platforminsights/page/deprecated-metrics/).

From version 2.1.2, the connector no longer requests these metrics. Only total reach has a replacement. The paid, viral, non-viral, fan and organic reach breakdowns have no equivalent. They are permanently unavailable from the API.

| Stream | No longer emitted | Replacement |
| :--- | :--- | :--- |
| `page_insights` | `page_impressions_unique` | `page_total_media_view_unique` |
| `page_insights` | `page_impressions_paid_unique`, `page_impressions_viral_unique`, `page_impressions_nonviral_unique` | none |
| `post_insights` | `post_impressions_unique` | `post_total_media_view_unique` |
| `post_insights` | `post_impressions_paid_unique`, `post_impressions_fan_unique`, `post_impressions_organic_unique`, `post_impressions_viral_unique`, `post_impressions_nonviral_unique` | none |

The stream schemas remain unchanged, so you don't need to refresh the schema. Rows for the removed metrics simply stop arriving. Clear the affected streams if you want consistent history in your destination.

### Product catalogs field unavailable

From version 2.0.4, the Page stream no longer syncs the `product_catalogs` field. It will always be `null`. The Facebook Graph API returns only product catalogues owned directly by the Page, not those owned by a Business. Most product catalogues are now Business-owned because Page-owned catalogues are a legacy feature. This connector also uses Page access tokens. Therefore, the `product_catalogs` field wouldn't return meaningful data for most users.

## Data type map

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`         | `string`     |       |
| `number`         | `number`     |       |
| `array`          | `array`      |       |
| `object`         | `object`     |       |

## Performance considerations

By default, Facebook heavily throttles API tokens generated from Facebook Apps. These tokens make Airbyte syncs impractical. Rate limiting can make your syncs take days. Follow the Setup Guide above to generate a Long-Lived Page Token.

From version 3.0.2, the connector exchanges your token for a Page access token once per sync. Previously, it exchanged the token before every Graph API request. This change reduces API calls.

When Meta throttles a request, the `X-Business-Use-Case-Usage` response header states when access will return. The connector waits for that period, up to 10 minutes, before retrying. It doesn't retry on a fixed schedule. Each additional stream and metric increases usage. The `comment` stream makes one request per post.

The Graph API can report rate limits through HTTP 400. Error codes include `4`, `17`, `32`, `613` and `80001`. From version 2.1.3, the connector recognises these codes and any error Meta marks as transient. It retries those requests with backoff instead of failing immediately. Retries are limited. If throttling continues until retries run out, the sync still fails with a transient error. It succeeds on a later attempt after the quota resets.

See Facebook's [documentation on rate limiting](https://developers.facebook.com/docs/graph-api/overview/rate-limiting) for the complete code list and guidance on requesting a quota upgrade.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                   | Subject                                                                                                                                                                |
|:--------|:-----------|:---------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 3.3.0   | 2026-11-10 | [90129](https://github.com/airbytehq/airbyte/pull/90129)       | Move from Graph API v24.0 to v26.0.                                                                                                                                    |
| 3.2.0   | 2026-11-09 | [90124](https://github.com/airbytehq/airbyte/pull/90124)       | Add an optional incremental sync mode and a `start_date` setting to the `page_insights` stream, which reads a `since` and `until` date range in 90-day windows.        |
| 3.1.0   | 2026-11-09 | [90123](https://github.com/airbytehq/airbyte/pull/90123)       | Configurable insights metrics and period, new video, Reels, comment and rating streams, incremental posts                                                              |
| 3.0.2   | 2026-11-09 | [90130](https://github.com/airbytehq/airbyte/pull/90130)       | Exchange the Page access token once per sync instead of before every request, and resolve the schema's date-time paths once per stream instead of per record           |
| 3.0.1   | 2026-11-04 | [90914](https://github.com/airbytehq/airbyte/pull/90914)       | Require Python 3.11 for future CDK compatibility.                                                                                                                      |
| 3.0.0 | 2026-10-13 | [85780](https://github.com/airbytehq/airbyte/pull/85780) | Remove the Meta-deprecated legacy Page fields `current_location`, `genre`, `network`, `parking`, and `start_info`, and the `live_videos` edge, from the `page` stream. Remove `current_location`, `genre`, and `network` from nested page objects in the `page` and `post` streams. |
| 2.1.4 | 2026-09-22 | [86489](https://github.com/airbytehq/airbyte/pull/86489) | Retry Facebook's "Please reduce the amount of data you're asking for" error again instead of failing the sync as a configuration error. |
| 2.1.3 | 2026-09-08 | [78077](https://github.com/airbytehq/airbyte/pull/78077) | Fail fast on deterministic Facebook API bad request errors as config errors, surface the Facebook error message, and keep retrying rate-limit and transient errors. |
| 2.1.2 | 2026-08-17 | [84408](https://github.com/airbytehq/airbyte/pull/84408) | Remove Page/Post Insights metrics deprecated by Meta and request `page_total_media_view_unique` / `post_total_media_view_unique` instead; fail fast with Meta's own message on invalid-metric errors. |
| 2.1.1 | 2026-05-22 | [78342](https://github.com/airbytehq/airbyte/pull/78342) | Classify Facebook app-approval errors as configuration errors. |
| 2.1.0 | 2026-03-02 | [72949](https://github.com/airbytehq/airbyte/pull/72949) | Use QueryProperties with JsonSchemaPropertySelector to limit API field requests to user-selected fields; add configurable page_size for post and post_insights streams |
| 2.0.4 | 2026-01-29 | [72253](https://github.com/airbytehq/airbyte/pull/72253) | Remove product_catalogs from fields request parameter |
| 2.0.3 | 2025-12-01 | [70248](https://github.com/airbytehq/airbyte/pull/70248) | Use correct pagination parameter name (`limit` instead of `page_size`) |
| 2.0.2 | 2025-12-01 | [70258](https://github.com/airbytehq/airbyte/pull/70258) | Use Post stream for check, handle 400 error in Page stream |
| 2.0.1 | 2025-11-27 | [70242](https://github.com/airbytehq/airbyte/pull/70242) | Refresh in-app documentation to reflect v24 API version |
| 2.0.0 | 2025-11-19 | [69714](https://github.com/airbytehq/airbyte/pull/69714) | Upgrade Facebook API to v24.0 |
| 1.1.4 | 2025-08-14 | [64141](https://github.com/airbytehq/airbyte/pull/64141) | Upgrade Facebook API to v23.0 |
| 1.1.3 | 2025-07-12 | [60391](https://github.com/airbytehq/airbyte/pull/60391) | Update dependencies |
| 1.1.2 | 2025-05-10 | [60043](https://github.com/airbytehq/airbyte/pull/60043) | Update dependencies |
| 1.1.1 | 2025-05-03 | [53787](https://github.com/airbytehq/airbyte/pull/53787) | Update dependencies |
| 1.1.0 | 2025-04-30 | [59126](https://github.com/airbytehq/airbyte/pull/59126) | Re-enable in cloud and update versions |
| 1.0.32 | 2025-02-01 | [52793](https://github.com/airbytehq/airbyte/pull/52793) | Update dependencies |
| 1.0.31  | 2025-01-27 | [52122](https://github.com/airbytehq/airbyte/pull/52122/files) | Upgrade Facebook API to v21.0                                                                                                                                          |
| 1.0.30  | 2025-01-25 | [52373](https://github.com/airbytehq/airbyte/pull/52373)       | Update dependencies                                                                                                                                                    |
| 1.0.29  | 2025-01-18 | [51637](https://github.com/airbytehq/airbyte/pull/51637)       | Update dependencies                                                                                                                                                    |
| 1.0.28  | 2025-01-11 | [51056](https://github.com/airbytehq/airbyte/pull/51056)       | Update dependencies                                                                                                                                                    |
| 1.0.27  | 2025-01-04 | [50923](https://github.com/airbytehq/airbyte/pull/50923)       | Update dependencies                                                                                                                                                    |
| 1.0.26  | 2024-12-28 | [50530](https://github.com/airbytehq/airbyte/pull/50530)       | Update dependencies                                                                                                                                                    |
| 1.0.25  | 2024-12-21 | [49997](https://github.com/airbytehq/airbyte/pull/49997)       | Update dependencies                                                                                                                                                    |
| 1.0.24  | 2024-12-14 | [49154](https://github.com/airbytehq/airbyte/pull/49154)       | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 1.0.23  | 2024-10-29 | [47737](https://github.com/airbytehq/airbyte/pull/47737)       | Update dependencies                                                                                                                                                    |
| 1.0.22  | 2024-10-21 | [47025](https://github.com/airbytehq/airbyte/pull/47025)       | Update dependencies                                                                                                                                                    |
| 1.0.21  | 2024-10-12 | [46807](https://github.com/airbytehq/airbyte/pull/46807)       | Update dependencies                                                                                                                                                    |
| 1.0.20  | 2024-10-05 | [46461](https://github.com/airbytehq/airbyte/pull/46461)       | Update dependencies                                                                                                                                                    |
| 1.0.19  | 2024-09-28 | [46133](https://github.com/airbytehq/airbyte/pull/46133)       | Update dependencies                                                                                                                                                    |
| 1.0.18  | 2024-09-21 | [45734](https://github.com/airbytehq/airbyte/pull/45734)       | Update dependencies                                                                                                                                                    |
| 1.0.17  | 2024-09-14 | [45563](https://github.com/airbytehq/airbyte/pull/45563)       | Update dependencies                                                                                                                                                    |
| 1.0.16  | 2024-09-07 | [45311](https://github.com/airbytehq/airbyte/pull/45311)       | Update dependencies                                                                                                                                                    |
| 1.0.15  | 2024-08-31 | [45052](https://github.com/airbytehq/airbyte/pull/45052)       | Update dependencies                                                                                                                                                    |
| 1.0.14  | 2024-08-24 | [44664](https://github.com/airbytehq/airbyte/pull/44664)       | Update dependencies                                                                                                                                                    |
| 1.0.13  | 2024-08-17 | [44234](https://github.com/airbytehq/airbyte/pull/44234)       | Update dependencies                                                                                                                                                    |
| 1.0.12  | 2024-08-12 | [43729](https://github.com/airbytehq/airbyte/pull/43729)       | Update dependencies                                                                                                                                                    |
| 1.0.11  | 2024-08-10 | [43477](https://github.com/airbytehq/airbyte/pull/43477)       | Update dependencies                                                                                                                                                    |
| 1.0.10  | 2024-08-03 | [43224](https://github.com/airbytehq/airbyte/pull/43224)       | Update dependencies                                                                                                                                                    |
| 1.0.9   | 2024-07-27 | [42787](https://github.com/airbytehq/airbyte/pull/42787)       | Update dependencies                                                                                                                                                    |
| 1.0.8   | 2024-07-20 | [42255](https://github.com/airbytehq/airbyte/pull/42255)       | Update dependencies                                                                                                                                                    |
| 1.0.7   | 2024-07-13 | [41685](https://github.com/airbytehq/airbyte/pull/41685)       | Update dependencies                                                                                                                                                    |
| 1.0.6   | 2024-07-10 | [41543](https://github.com/airbytehq/airbyte/pull/41543)       | Update dependencies                                                                                                                                                    |
| 1.0.5   | 2024-07-09 | [41126](https://github.com/airbytehq/airbyte/pull/41126)       | Update dependencies                                                                                                                                                    |
| 1.0.4   | 2024-07-06 | [40812](https://github.com/airbytehq/airbyte/pull/40812)       | Update dependencies                                                                                                                                                    |
| 1.0.3   | 2024-06-25 | [40500](https://github.com/airbytehq/airbyte/pull/40500)       | Update dependencies                                                                                                                                                    |
| 1.0.2   | 2024-06-22 | [40058](https://github.com/airbytehq/airbyte/pull/40058)       | Update dependencies                                                                                                                                                    |
| 1.0.1   | 2024-06-06 | [39243](https://github.com/airbytehq/airbyte/pull/39243)       | [autopull] Upgrade base image to v1.2.2                                                                                                                                |
| 1.0.0   | 2024-03-14 | [36015](https://github.com/airbytehq/airbyte/pull/36015)       | Upgrade Facebook API to v19.0                                                                                                                                          |
| 0.3.0   | 2023-06-26 | [27728](https://github.com/airbytehq/airbyte/pull/27728)       | License Update: Elv2                                                                                                                                                   |
| 0.2.5   | 2023-04-13 | [26939](https://github.com/airbytehq/airbyte/pull/26939)       | Add advancedAuth to the connector spec                                                                                                                                 |
| 0.2.4   | 2023-04-13 | [25143](https://github.com/airbytehq/airbyte/pull/25143)       | Update insight metrics request params                                                                                                                                  |
| 0.2.3   | 2023-02-23 | [23395](https://github.com/airbytehq/airbyte/pull/23395)       | Parse datetime to rfc3339                                                                                                                                              |
| 0.2.2   | 2023-02-10 | [22804](https://github.com/airbytehq/airbyte/pull/22804)       | Retry 500 errors                                                                                                                                                       |
| 0.2.1   | 2022-12-29 | [20925](https://github.com/airbytehq/airbyte/pull/20925)       | Fix tests; modify expected records                                                                                                                                     |
| 0.2.0   | 2022-11-24 | [19788](https://github.com/airbytehq/airbyte/pull/19788)       | Migrate lo low-code; Beta certification; Upgrade Facebook API to v.15                                                                                                  |
| 0.1.6   | 2021-12-22 | [9032](https://github.com/airbytehq/airbyte/pull/9032)         | Remove deprecated field `live_encoders` from Page stream                                                                                                               |
| 0.1.5   | 2021-11-26 | [8267](https://github.com/airbytehq/airbyte/pull/8267)         | updated all empty objects in schemas for Page and Post streams                                                                                                         |
| 0.1.4   | 2021-11-26 | [](https://github.com/airbytehq/airbyte/pull/)                 | Remove unsupported insights_export field from Pages request                                                                                                            |
| 0.1.3   | 2021-10-28 | [7440](https://github.com/airbytehq/airbyte/pull/7440)         | Generate Page token from config access token                                                                                                                           |
| 0.1.2   | 2021-10-18 | [7128](https://github.com/airbytehq/airbyte/pull/7128)         | Upgrade Facebook API to v.12                                                                                                                                           |
| 0.1.1   | 2021-09-30 | [6438](https://github.com/airbytehq/airbyte/pull/6438)         | Annotate Oauth2 flow initialization parameters in connector specification                                                                                              |
| 0.1.0   | 2021-09-01 | [5158](https://github.com/airbytehq/airbyte/pull/5158)         | Initial Release                                                                                                                                                        |

</details>
