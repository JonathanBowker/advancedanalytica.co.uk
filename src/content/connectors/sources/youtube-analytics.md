---
generated_record: true
connector_name: YouTube Analytics
connector_type: source
connector_slug: youtube-analytics
connector_directory: source-youtube-analytics
definition_id: afa734e4-3571-11ec-991a-1e0031268139
version: 2.0.3
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/youtube-analytics
logo: /images/connectors/sources/youtube-analytics.svg
logo_source_path: airbyte-integrations/connectors/source-youtube-analytics/icon.svg
logo_sha256: ad5e6ab00b362d7ca2fc4a3ece1c3965c11364736ca6bad8910ba7c9ba19919a
original_metadata_path: airbyte-integrations/connectors/source-youtube-analytics/metadata.yaml
original_metadata_sha256: 6fb428f434676cffeb20389e7e7b0ed1e080b07e7c869bad76fb07afad823f8d
original_document_path: docs/integrations/sources/youtube-analytics.md
original_document_sha256: 04a3ec42a26b6af252947da27b8fe2ec479021e650518ad73d9ffbdeae974262
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fe3d4480f9764daef7ed1527ee4ecb00f91799b81bc4abd7fcfc7e5670b31d7e
rewritten_at: 2026-11-12T14:02:02.372428+00:00
---

# YouTube Analytics

Use this guide to set up the YouTube Analytics source connector and find reference information.

## Upgrade

Before upgrading from a version earlier than 2.0.0, review the [migration guide](/integrations/sources/youtube-analytics-migrations#upgrading-to-200). Version 2.0.0 changes metric field types across seven report streams. Preserve historical data before clearing or rebuilding affected streams. You can't download reports again once they fall outside YouTube's retention window.

## Prerequisites

Authorise a Google account that owns or manages a YouTube channel. Accounts without an associated channel can't access YouTube Reporting API data.

For Airbyte Open Source, you need a Google Cloud project with the YouTube Reporting API enabled. You also need an OAuth 2.0 **Client ID**, **Client Secret**, and **Refresh Token** with the `https://www.googleapis.com/auth/yt-analytics.readonly` scope. See [Set up YouTube Analytics](#set-up-youtube-analytics) for instructions. Airbyte Cloud users authenticate with OAuth during setup and don't need to provide these credentials. The Airbyte Cloud consent screen requests the `yt-analytics.readonly` and `yt-analytics-monetary.readonly` scopes.

YouTube partners can also provide a **Content Owner ID** to retrieve data for that content owner.

## Set up the connector

Prepare YouTube access, then add the source in Airbyte.

### Set up YouTube Analytics

Airbyte Cloud users can authorise their Google account during source setup. For Airbyte Open Source, create OAuth credentials for the Google account that owns or manages your YouTube channel:

1. [Create or select a Google Cloud project](https://console.cloud.google.com/) and [enable the YouTube Reporting API](https://console.cloud.google.com/apis/api/youtubereporting.googleapis.com/overview).
2. [Configure the OAuth consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent) and add the `https://www.googleapis.com/auth/yt-analytics.readonly` scope. If the app's publishing status is **Testing**, add the channel's Google account as a test user. Google states that refresh tokens for External apps in Testing status expire after 7 days. See [refresh token expiration](https://developers.google.com/identity/protocols/oauth2#expiration).
3. [Create an OAuth client ID](https://support.google.com/cloud/answer/6158849) with the application type **Web application**. Add `https://developers.google.com/oauthplayground` as an authorised redirect URI. Then copy the Client ID and Client Secret.
4. Open the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground). Select the gear icon, choose **Use your own OAuth credentials**, and enter the Client ID and Client Secret. In Step 1, enter `https://www.googleapis.com/auth/yt-analytics.readonly` as the scope and select **Authorize APIs**. Sign in with the channel's Google account. In Step 2, select **Exchange authorization code for tokens** and copy the Refresh token.

For more information, see Google's [YouTube Reporting API authorization guide](https://developers.google.com/youtube/reporting/guides/authorization).

### Add the connector in Airbyte

#### Airbyte Cloud

1. [Log in to Airbyte Cloud](https://cloud.airbyte.com/workspaces).
2. From the left navigation bar, select **Sources**, then select **+ new source**.
3. Name the source and select **YouTube Analytics** from the source type list.
4. Select **Authenticate your account** and sign in with the Google account that owns or manages the channel. Then authorise access.
5. Select **Set up source**.

#### Airbyte Open Source

1. From the left navigation bar, select **Sources**, then select **+ new source**.
2. Name the source and select **YouTube Analytics** from the source type list.
3. Enter the **Client ID**, **Client Secret**, and **Refresh Token** you created in [Set up YouTube Analytics](#set-up-youtube-analytics).
4. Optionally, enter a **Content Owner ID**.
5. Select **Set up source**.

## Content Owner ID

The optional **Content Owner ID** field is for YouTube partners participating in the [YouTube Partner Program](https://support.google.com/youtube/answer/72851). These partners manage multiple channels through a content owner account. This includes Multi-Channel Networks (MCNs) and media companies managing content across multiple YouTube channels.

- If you own a regular YouTube channel, leave this field empty. The connector retrieves data for the channel associated with your OAuth credentials.
- If you're a YouTube partner with a content owner account, enter your content owner ID. The connector then retrieves data for channels managed under that account.
- To find your content owner ID, check the URL while signed in to [YouTube Studio](https://studio.youtube.com/). Look for the `o=` parameter. You can also use the [YouTube Content ID API](https://developers.google.com/youtube/partner/docs/v1/contentOwners/list) or contact your YouTube partner manager.

## Supported sync modes

The YouTube Analytics source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported?                                                        |
| :---------------- | :---------------------------------------------------------------- |
| Full Refresh Sync | Yes                                                               |
| Incremental Sync  | Yes — report streams; `report_types` is full refresh only         |

## Supported streams

- [report_types](https://developers.google.com/youtube/reporting/v1/reference/rest/v1/reportTypes/list) - Report types available to your channel or content owner. Full refresh only. The connection check uses this stream because valid credentials alone return data, without requiring a reporting job.
- [channel_annotations_a1](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-annotations)
- [channel_basic_a3](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-user-activity)
- [channel_cards_a1](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-cards)
- [channel_combined_a3](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-combined)
- [channel_demographics_a1](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-viewer-demographics)
- [channel_device_os_a3](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-device-type-and-operating-system)
- [channel_end_screens_a1](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-end-screens)
- [channel_playback_location_a3](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-playback-locations)
- [channel_province_a3](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-province)
- [channel_reach_basic_a1](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#reach-basic) - Video thumbnail impressions and impressions click-through rate.
- [channel_reach_combined_a1](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#reach-combined) - Video thumbnail impressions and impressions click-through rate by traffic source, device type and operating system.
- [channel_sharing_service_a1](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-content-sharing)
- [channel_subtitles_a3](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-subtitles)
- [channel_traffic_source_a3](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#video-traffic-sources)
- [playlist_basic_a2](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#playlist-user-activity)
- [playlist_combined_a2](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#playlist-combined)
- [playlist_device_os_a2](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#playlist-device-type-and-operating-system)
- [playlist_playback_location_a2](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#playlist-playback-locations)
- [playlist_province_a2](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#playlist-province)
- [playlist_traffic_source_a2](https://developers.google.com/youtube/reporting/v1/reports/channel_reports#playlist-traffic-sources)

Each report stream provides one YouTube bulk report. Incremental syncs only download report files YouTube created after the previous sync. They also download reissued files containing corrected data. A reissued file replaces an earlier report covering the same days, so use **Incremental | Append + Deduped** for report streams. With **Incremental | Append**, the destination keeps both the original and corrected rows.

## Report availability

During the first sync, Airbyte creates a reporting job for each selected report without an existing job. YouTube starts generating reports after creating a job. The first report is typically available within 48 hours and covers the day the job was scheduled. For example, schedule a job on September 1, 2015, and the September 1 report becomes available on September 3. The September 2 report is posted on September 4.

When scheduling a new job, YouTube also generates historical reports for the preceding 30 days. Historical reports are typically posted within a couple of days, and Airbyte syncs the available historical data. Therefore, a first sync that creates new jobs might return no records from report streams.

YouTube keeps generated reports available for 60 days. Historical reports remain available for 30 days. See the [YouTube Reporting API report documentation](https://developers.google.com/youtube/reporting/v1/reports) for details.

## YouTube API Services disclosure

This connector uses [YouTube API Services](https://developers.google.com/youtube/analytics) to retrieve data from YouTube. By using the connector, you agree to the [YouTube Terms of Service](https://www.youtube.com/t/terms).

Google provides YouTube API Services. To understand how Google handles data, review the [Google Privacy Policy](https://www.google.com/policies/privacy).

With OAuth 2.0 authentication, this connector accesses authorised user data. You can revoke its Google account access at any time through the [Google security settings page](https://myaccount.google.com/connections?filters=3,4&hl=en). To delete previously synced YouTube data, remove it from your configured destination. Removing the Airbyte connection or revoking Google access doesn't delete data already stored in the destination.

## Rate limits and quotas

The connector limits requests to 60 per minute. YouTube might also return a rate-limit error. The connector automatically retries rate-limited requests and Google server errors (HTTP 5xx) after 30 seconds. Repeated rate-limit errors cause the sync to fail. If your project's daily YouTube API quota is exhausted, the sync stops with **Daily YouTube API project quota is exhausted.**. Try again when quota becomes available.

Airbyte Cloud uses an Airbyte Google Cloud project with a YouTube API quota shared across Cloud connections. Airbyte Open Source uses the quota from the Google Cloud project configured for the source. Check your [project's quota page in Google Cloud](https://console.cloud.google.com/iam-admin/quotas) for current limits.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Performance

Each selected report stream requests its reporting job and available reports, then downloads every available report file. Selecting more report streams can use more of your project's quota.

The optional **Number of Concurrent Workers** setting controls how many report files download in parallel. The default is 2, and the maximum is 4. More workers can shorten syncs containing many report files. However, every worker shares the same request limit and YouTube API quota. Higher values can therefore reach rate limits sooner.

## Limitations and troubleshooting

- **401: no channel associated with the Google account.** The error starts with `The authorized Google account does not appear to have an associated YouTube channel.`. Use an account that owns or manages a YouTube channel. When connecting as a content owner, also confirm that the Content Owner ID is correct.
- **401: credentials rejected.** The error starts with `Google rejected the YouTube Reporting API credentials:`, followed by Google's message. Re-authenticate the source. If the error continues, the Google account probably has no associated YouTube channel.
- **403: access denied.** The error starts with `The YouTube Reporting API denied access:`, followed by Google's message. Confirm that the authorised Google account owns or manages the channel. Also confirm that the OAuth consent screen includes the required scope. If you set a Content Owner ID, confirm that the account can act for that content owner.
- **Refresh token is invalid or expired.** Google rejected the refresh token, for example, because it was revoked or expired. Re-authenticate the source on Airbyte Cloud. For Airbyte Open Source, create a new refresh token.
- **Daily quota exhausted.** If the sync reports **Daily YouTube API project quota is exhausted.**, check your project's quota. Try again when quota becomes available.
- **No rows on the first sync.** YouTube might not have generated reports for newly created reporting jobs. Reports are typically available within 48 hours.
- **Skipped report files.** YouTube might list a report file that can no longer be downloaded (HTTP 404). This usually happens after its [retention period](#report-availability). The connector skips the file, records a message in the sync logs, and continues the remaining sync. The rows in that file aren't synced.
- **Refresh token expires after 7 days.** This applies to External OAuth apps in **Testing** status, even when the channel's Google account is a test user. For ongoing syncs, move the app to **In production** according to [Google's publishing requirements](https://support.google.com/cloud/answer/15549945). Then generate a new refresh token and update the source. While the app remains in **Testing**, generate a new refresh token whenever it expires.
- **Content-owner reports are not available as streams.** The available streams are channel and playlist reports. To retrieve YouTube Data API information, use the separate [YouTube Data connector](/integrations/sources/youtube-data).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :----------- | :----------- | :--------------------------------------------------------- | :---------------------------------------------------- |
| 2.0.3 | 2026-11-05 | [91124](https://github.com/airbytehq/airbyte/pull/91124) | Promote the connector to Certified (Generally Available) support |
| 2.0.2 | 2026-11-04 | [91024](https://github.com/airbytehq/airbyte/pull/91024) | Replace the icon with YouTube's official icon from brand.youtube and remove the added ANALYTICS wordmark |
| 2.0.1 | 2026-11-04 | [90433](https://github.com/airbytehq/airbyte/pull/90433) | Merge the report download error handlers into one handler; no behaviour change |
| 2.0.0 | 2026-11-04 | [89628](https://github.com/airbytehq/airbyte/pull/89628) | Correct the declared types of report metric fields to match YouTube's metric definitions |
| 1.6.1 | 2026-11-03 | [90800](https://github.com/airbytehq/airbyte/pull/90800) | Update dependencies |
| 1.6.0 | 2026-10-30 | [89627](https://github.com/airbytehq/airbyte/pull/89627) | Add the `channel_reach_basic_a1` and `channel_reach_combined_a1` streams for video thumbnail impressions and click-through rate |
| 1.5.0 | 2026-10-27 | [89629](https://github.com/airbytehq/airbyte/pull/89629) | Emit report metrics as numbers, follow pagination on job and report listings, and give clearer errors for credential, permission and missing-file failures |
| 1.4.7 | 2026-10-27 | [90075](https://github.com/airbytehq/airbyte/pull/90075) | Update dependencies |
| 1.4.6 | 2026-10-20 | [89472](https://github.com/airbytehq/airbyte/pull/89472) | Update dependencies |
| 1.4.5 | 2026-10-13 | [88882](https://github.com/airbytehq/airbyte/pull/88882) | Update dependencies |
| 1.4.4 | 2026-10-06 | [88106](https://github.com/airbytehq/airbyte/pull/88106) | Update dependencies |
| 1.4.3 | 2026-09-29 | [87431](https://github.com/airbytehq/airbyte/pull/87431) | Update dependencies |
| 1.4.2 | 2026-09-22 | [86879](https://github.com/airbytehq/airbyte/pull/86879) | Update dependencies |
| 1.4.1 | 2026-09-15 | [86309](https://github.com/airbytehq/airbyte/pull/86309) | Update dependencies |
| 1.4.0 | 2026-09-10 | [85335](https://github.com/airbytehq/airbyte/pull/85335) | Restore incremental syncs for report streams, including reports that YouTube re-issues with corrected data |
| 1.3.4 | 2026-09-08 | [85727](https://github.com/airbytehq/airbyte/pull/85727) | Update dependencies |
| 1.3.3 | 2026-08-26 | [84945](https://github.com/airbytehq/airbyte/pull/84945) | Fail fast with a clear transient error when the daily YouTube API project quota is exhausted, and correctly classify rate-limited and server-error responses |
| 1.3.2 | 2026-08-18 | [84816](https://github.com/airbytehq/airbyte/pull/84816) | Update dependencies |
| 1.3.1 | 2026-08-11 | [82653](https://github.com/airbytehq/airbyte/pull/82653) | Update dependencies |
| 1.3.0 | 2026-08-04 | [83286](https://github.com/airbytehq/airbyte/pull/83286) | Add new `report_types` stream, fix `check` failures, and explain 401s caused by a Google account with no YouTube channel |
| 1.2.12 | 2026-07-30 | [82712](https://github.com/airbytehq/airbyte/pull/82712) | Fix setup check failure by pointing the connection check at the always-available `channel_basic_a3` report instead of `channel_annotations_a1` |
| 1.2.11 | 2026-07-14 | [82069](https://github.com/airbytehq/airbyte/pull/82069) | Update dependencies |
| 1.2.10 | 2026-06-30 | [81330](https://github.com/airbytehq/airbyte/pull/81330) | Update dependencies |
| 1.2.9 | 2026-06-23 | [80732](https://github.com/airbytehq/airbyte/pull/80732) | Update dependencies |
| 1.2.8 | 2026-06-16 | [80106](https://github.com/airbytehq/airbyte/pull/80106) | Update dependencies |
| 1.2.7 | 2026-06-09 | [79579](https://github.com/airbytehq/airbyte/pull/79579) | Update dependencies |
| 1.2.6 | 2026-06-02 | [79073](https://github.com/airbytehq/airbyte/pull/79073) | Update dependencies |
| 1.2.5 | 2026-04-28 | [77489](https://github.com/airbytehq/airbyte/pull/77489) | Update dependencies |
| 1.2.4 | 2026-04-21 | [74693](https://github.com/airbytehq/airbyte/pull/74693) | Update dependencies |
| 1.2.3 | 2026-02-24 | [73149](https://github.com/airbytehq/airbyte/pull/73149) | Update dependencies |
| 1.2.2 | 2026-02-06 | [72635](https://github.com/airbytehq/airbyte/pull/72635) | Update dependencies |
| 1.2.1 | 2026-01-20 | [72048](https://github.com/airbytehq/airbyte/pull/72048) | Update dependencies |
| 1.2.0 | 2026-01-14 | [71377](https://github.com/airbytehq/airbyte/pull/71377) | Promoting release candidate 1.2.0-rc.2 to a main version. |
| 1.2.0-rc.2 | 2026-01-09 | [71244](https://github.com/airbytehq/airbyte/pull/71244) | Fix incorrect report_id key and remove additional error message |
| 1.2.0-rc.1 | 2026-01-07 | [71169](https://github.com/airbytehq/airbyte/pull/71169) | Add optional content_owner_id config for multi-channel support and improve error handling |
| 1.1.2 | 2025-12-18 | [70715](https://github.com/airbytehq/airbyte/pull/70715) | Update dependencies |
| 1.1.1 | 2025-12-02 | [64964](https://github.com/airbytehq/airbyte/pull/64964) | Update dependencies |
| 1.1.0 | 2025-11-17 | [69352](https://github.com/airbytehq/airbyte/pull/69352) | Promoting release candidate 1.1.0-rc.1 to a main version. |
| 1.1.0-rc.1 | 2025-11-10 | [42838](https://github.com/airbytehq/airbyte/pull/42838) | Migrate to Manifest-only |
| 1.0.0 | 2025-10-30 | [66558](https://github.com/airbytehq/airbyte/pull/66558) | Update deprecated channel and playlist BULK reports |
| 0.2.0 | 2025-05-29 | [53196](https://github.com/airbytehq/airbyte/pull/53196) | Update check connection and empty responses |
| 0.1.7 | 2025-02-27 | [54696](https://github.com/airbytehq/airbyte/pull/54696) | Update requests-mock dependency version |
| 0.1.6 | 2024-06-17 | [39529](https://github.com/airbytehq/airbyte/pull/39529) | Pin CDK version to 0.38.0 |
| 0.1.5 | 2024-06-13 | [38546](https://github.com/airbytehq/airbyte/pull/38546) | [autopull] base image + poetry + up_to_date |
| 0.1.4 | 2023-05-26 | [26420](https://github.com/airbytehq/airbyte/pull/26420) | Migrate to advancedAuth |
| 0.1.3 | 2022-10-07 | [17454](https://github.com/airbytehq/airbyte/pull/17454) | Added custom backoff logic |
| 0.1.2 | 2022-09-29 | [17399](https://github.com/airbytehq/airbyte/pull/17399) | Fixed `403` error while `check connection` |
| 0.1.1 | 2022-08-22 | [15744](https://github.com/airbytehq/airbyte/pull/15744) | Fix `channel_basic_a2` schema fields data type |
| 0.1.0 | 2021-11-19 | [7407](https://github.com/airbytehq/airbyte/pull/7407) | Initial Release |

</details>
