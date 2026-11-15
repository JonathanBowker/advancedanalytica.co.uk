---
generated_record: true
connector_name: Youtube Data
connector_type: source
connector_slug: youtube-data
connector_directory: source-youtube-data
definition_id: 743a2a44-fd13-4109-a8fe-fb0e68f467f5
version: 1.1.4
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/youtube-data
logo: /images/connectors/sources/youtube-data.svg
logo_source_path: airbyte-integrations/connectors/source-youtube-data/icon.svg
logo_sha256: 566ea4a31226fc3bc334c985531fc3967d39dc1ca36da1d3b9fb601f08302556
original_metadata_path: airbyte-integrations/connectors/source-youtube-data/metadata.yaml
original_metadata_sha256: aee9f4b90393f3564f279ea3d9b790b7fa7051d2615d0aef127e5c606fd3b262
original_document_path: docs/integrations/sources/youtube-data.md
original_document_sha256: ffcdab45c39c8710f7c879186a79142527aaf1d6649f9aa189e6f18a1d15a515
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: e819c8efafdc99b9130ee8cb22154ad845d71b85a5d0db86e2bc08d999bdd7ae
rewritten_at: 2026-11-12T14:02:27.806736+00:00
---

# YouTube Data API

<HideInUI>

Use this page to set up the [YouTube Data API](https://developers.google.com/youtube/v3) source connector and find reference information.

</HideInUI>

Sync video details, channel metadata, comments, and other YouTube channel data with the [YouTube Data API v3](https://developers.google.com/youtube/v3). For detailed analytics and reporting data, use the [YouTube Analytics connector](https://docs.airbyte.com/integrations/sources/youtube-analytics).

## Prerequisites

- One or more YouTube Channel IDs for the channels you want to sync

<!-- env:oss -->

- For Airbyte Open Source, a Google Cloud project with the YouTube Data API v3 enabled. You also need one authentication method from that project:
  - A Google API Key for public data only
  - OAuth 2.0 credentials: Client ID, Client Secret, and Refresh Token

<!-- /env:oss -->

## Set up the connector

### Find your Channel IDs

1. Go to [YouTube](https://www.youtube.com/) and open the channel you want to sync.
2. Find the Channel ID in the URL: `https://www.youtube.com/channel/CHANNEL_ID`. Channel IDs contain 24 characters and start with `UC`. A handle URL such as `https://www.youtube.com/@handle` isn't a Channel ID.
3. Alternatively, find it in YouTube Studio under **Settings** > **Channel** > **Advanced settings**.

Verify every Channel ID before setup. The connection check fails if any ID doesn't resolve to an existing channel.

<!-- env:cloud -->

### Airbyte Cloud

1. Sign in to your [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click **Sources**, then click **+ New source**.
3. Select **YouTube Data API** from the list.
4. Enter a name for your source.
5. Choose your authentication method:
   - For **OAuth 2.0**, click **Sign in with Google** to authenticate your Google account.
   - For **API Key**, enter your Google API key.
6. Enter one or more Channel IDs for the channels you want to sync.
7. Click **Set up source**.

<!-- /env:cloud -->

<!-- env:oss -->

### Airbyte Open Source

#### Create credentials

Authenticate with either an API Key or OAuth 2.0.

**Option A: API Key (simpler setup, public data only)**

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project or select an existing one.
3. Go to **APIs & Services** > **Library** and enable the YouTube Data API v3.
4. Go to **APIs & Services** > **Credentials**.
5. Click **Create Credentials** > **API key**.
6. Copy the generated API key.
7. We recommend clicking **Restrict key** to restrict the key to the YouTube Data API v3.

**Option B: OAuth 2.0 (required for accessing private data)**

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project or select an existing one.
3. Go to **APIs & Services** > **Library** and enable the YouTube Data API v3.
4. Go to **APIs & Services** > **Credentials**.
5. Click **Create Credentials** > **OAuth client ID**. If prompted, configure the OAuth consent screen.
6. Select **Web application** as the application type. Add `https://developers.google.com/oauthplayground` as an authorised redirect URI to generate a refresh token later.
7. Copy the **Client ID** and **Client Secret**.
8. Open the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground). Click the settings icon and select **Use your own OAuth credentials**. Enter your Client ID and Client Secret.
9. Enter `https://www.googleapis.com/auth/youtube.force-ssl` in the scope field, then click **Authorize APIs**. To sync unlisted and private videos, sign in with the Google account that owns the channel.
10. Click **Exchange authorization code for tokens** and copy the **Refresh token**.

If your OAuth consent screen has a publishing status of **Testing**, Google [expires refresh tokens after 7 days](https://developers.google.com/identity/protocols/oauth2#expiration). Syncs then begin failing with authentication errors. Before generating the refresh token for scheduled syncs, set the publishing status to **In production**.

#### Set up the connector

1. In Airbyte, go to **Sources** and click **+ New source**.
2. Select **YouTube Data API** from the list.
3. Enter a name for your source.
4. Choose your authentication method and enter the required credentials.
5. Enter one or more Channel IDs for the channels you want to sync.
6. Click **Set up source**.

<!-- /env:oss -->

## Supported sync modes

The YouTube Data API source connector supports these sync modes:

- [Full Refresh - Overwrite](/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite)
- [Full Refresh - Append](/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append)
- [Incremental - Append](/platform/using-airbyte/core-concepts/sync-modes/incremental-append)
- [Incremental - Append + Deduped](/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped)

Every stream except `channels` supports incremental sync. The YouTube Data API doesn't provide date filters, but every endpoint lists the newest records first. An incremental sync reads pages until it reaches the first existing record, then stops. See [Quota and rate limiting](#quota-and-rate-limiting) for each stream's request cost.

Two streams work differently in incremental mode:

- **`video`** fetches only videos published since the previous sync. Statistics are snapshots taken when each video was first fetched and aren't refreshed. Use `video_engagement` for counters that change.
- **`video_engagement`** reads every video's counters again during each sync. It uses each record's fetch time as its cursor. **Incremental - Append** therefore creates a counter time series for each video. **Incremental - Append + Deduped** retains only the latest counters.

Comment streams use the top-level comment's publish time as the cursor. Incremental syncs therefore miss edits to existing comments and changes to reply counts. They also don't remove destination records when videos or comments are deleted from YouTube.

## Supported streams

| Stream Name      | Primary Key   | Cursor                | Pagination       | Supports Full Sync | Supports Incremental |
| ---------------- | ------------- | --------------------- | ---------------- | ------------------ | -------------------- |
| videos           | videoId       | publishedAt           | DefaultPaginator | Yes                | Yes                  |
| video            | videoId       | publishedAt           | DefaultPaginator | Yes                | Yes                  |
| video_engagement | videoId       | datetime (fetch time) | None             | Yes                | Yes                  |
| channels         | id            | —                     | DefaultPaginator | Yes                | No                   |
| comments         | videoId, id   | publishedAt           | DefaultPaginator | Yes                | Yes                  |
| channel_comments | channelId, id | publishedAt           | DefaultPaginator | Yes                | Yes                  |

### Stream details

- **videos**: Returns one record for each upload in every configured channel. For each channel from `channels`, it reads the uploads playlist through [`playlistItems.list`](https://developers.google.com/youtube/v3/docs/playlistItems/list), with 50 items per page. Records are concise. They contain `kind` and `videoId`, the primary key, from the playlist item's `resourceId`. They also contain `channelId`, `title`, and `publishedAt`, which shows when the upload joined the channel. Finally, they contain `privacyStatus`, which can be `public`, `unlisted`, or `private`. OAuth 2.0 includes unlisted and private uploads when authenticated as the channel owner. An API key includes only public uploads. OAuth 2.0 also includes only public uploads for channels the user doesn't own. The `video`, `video_engagement`, and `comments` streams use this parent stream to identify videos to fetch.
- **video**: Returns detailed information about videos from specified channels. It uses [`videos.list`](https://developers.google.com/youtube/v3/docs/videos/list) and fetches 50 videos per request. Snippet data includes title, description, thumbnails, publish date, tags, category, and language settings. Content details include duration, dimension, definition, caption availability, and region restrictions. Statistics include view, like, and comment counts. Player information includes embed HTML. Status data includes upload status, privacy status, licence, embeddable, and made for kids. Each record also includes `datetime`, which the connector sets to the fetch time. This isn't a YouTube timestamp. Use it to distinguish snapshots in Full Refresh - Append mode.
- **video_engagement**: Returns every specified video's current `statistics`: `viewCount`, `likeCount`, `commentCount`, and `favoriteCount`. It uses `videos.list` with `part=statistics` and fetches 50 videos per request. Records also include `videoId` and a `datetime` field set to the fetch time. YouTube provides cumulative counters, not their history, so each sync creates one snapshot. Schedule the connection at your preferred sampling frequency. For daily views, watch time, and other report metrics, use the [YouTube Analytics connector](/integrations/sources/youtube-analytics).
- **channels**: Returns information about specified YouTube channels from [`channels.list`](https://developers.google.com/youtube/v3/docs/channels/list). Snippet data includes title, description, custom URL, country, and thumbnails. Content details include related playlists. Statistics include subscriber, view, and video counts. Branding settings include channel keywords, trailer, and default language. Records also include topic details, status, localisations, and content owner details. Status includes privacy status and made for kids. The connector adds an `uploadsPlaylistId` field copied from `contentDetails.relatedPlaylists.uploads`. The `videos` stream uses this field to list the channel's uploads.
- **comments**: Returns comment threads for individual videos from specified channels. It uses [`commentThreads.list`](https://developers.google.com/youtube/v3/docs/commentThreads/list) filtered by `videoId`. For each video found by `videos`, it fetches comment threads newest first, with 100 per request. Each record contains one thread's `snippet`. The top-level comment appears in `topLevelComment`, while `totalReplyCount` provides the reply count. The connector copies the top-level comment's ID into a top-level `id` field, which forms part of the primary key. It also copies its `publishedAt` into a top-level `publishedAt` cursor field. Records don't include the replies themselves. The stream skips deleted videos and videos with disabled comments without failing the sync.
- **channel_comments**: Returns all comment threads related to specified channels. It uses `commentThreads.list` filtered by `allThreadsRelatedToChannelId`, fetching newest first with 100 per request. This includes comments on the channel's videos and channel page. It therefore provides a broader engagement view than the `comments` stream. An incremental sync uses one or two requests per channel, rather than one per video. Records match the `comments` structure, including the copied `id` and `publishedAt` fields. If you don't need comments grouped by video, choose this stream instead of `comments`.

Comment records also contain `updatedAt` within the nested `topLevelComment.snippet` object. It isn't moved to the top level or used as a cursor.

## YouTube API Services disclosure

This connector retrieves YouTube data through [YouTube API Services](https://developers.google.com/youtube/v3). By using the connector, you agree to the [YouTube Terms of Service](https://www.youtube.com/t/terms).

Google provides YouTube API Services. Review the [Google Privacy Policy](https://www.google.com/policies/privacy) to learn how Google handles data.

With OAuth 2.0 authentication, the connector accesses authorised user data. You can revoke its Google account access through the [Google security settings page](https://myaccount.google.com/connections?filters=3,4&hl=en) at any time. To delete previously synced data, remove the relevant connection in Airbyte or delete it from your configured destination.

## Limits and considerations

### Quotas and rate limits

The YouTube Data API applies a daily [quota](https://developers.google.com/youtube/v3/getting-started#quota) to each Google Cloud project. Google's documented default is 10,000 quota units per day. Every endpoint this connector reads costs 1 unit per request: `playlistItems.list`, `channels.list`, `videos.list`, and `commentThreads.list`. Google states that defaults can change. Check the YouTube Data API's **Quotas** page in Google Cloud console for your project's current allocation. If you need more quota, [request a quota extension](https://support.google.com/youtube/contact/yt_api_form) from Google.

Each sync's request count scales with the configured channels' number of videos, V. The `video`, `video_engagement`, and `comments` streams each read the uploads playlist to find video IDs. Their costs below therefore include this parent read. In incremental mode, `video` reads only new playlist items. `video_engagement` and `comments` read the entire playlist again during every sync.

| Stream             | First sync or Full Refresh                                                                              | Incremental sync                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `videos`           | About V/50                                                                                              | About one per channel                             |
| `video`            | About V/50 for the playlist plus V/50 for video details                                                 | About one per channel, plus one per 50 new videos |
| `video_engagement` | About V/50 for the playlist plus V/50 for statistics                                                    | Same as a first sync                              |
| `channels`         | One per channel                                                                                         | Not supported                                     |
| `comments`         | About V/50 for the playlist, plus one per video, plus one per additional 100 comment threads on a video | About V/50 for the playlist plus one per video    |
| `channel_comments` | One per channel, plus one per additional 100 comment threads                                            | About one or two per channel                      |

For example, consider a channel with 5,000 videos. Syncing `videos`, `video`, `video_engagement`, `channels`, and `channel_comments` incrementally each hour uses about 200 units per sync. That's about 5,000 units per day. `video_engagement` uses most of this quota. Sync it less often, or exclude it, if you don't need frequent counter snapshots.

The connector limits its requests to guard against bursts. It sends at most 100 requests per minute across all endpoints. Requests exceeding this limit wait for the next available slot instead of failing. The connector retries with backoff when YouTube returns `rateLimitExceeded`, `userRateLimitExceeded`, or HTTP 429 per-minute rate-limit errors. The sync fails immediately when YouTube returns `quotaExceeded` or `dailyLimitExceeded` for an exhausted daily quota. It doesn't retry because the quota resets only at midnight Pacific time. Incremental streams resume from their latest checkpoint during the next scheduled sync.

Request pacing applies separately to each Airbyte source, while Google measures quota by Google Cloud project. Sources sharing a project's API keys or OAuth clients draw from the same quota. Use a separate project for each source or request more quota.

### Authentication

- API keys can access public data only. To sync unlisted or private videos and their comments, authenticate with OAuth 2.0 as the channel owner.
- With OAuth 2.0, the connector requests the `youtube.force-ssl` scope. This provides read and write access to YouTube resources. The scope is required, although the connector only reads data.
- With OAuth 2.0, the connector refreshes the access token and retries after an HTTP 401 response. If the 401 continues, the sync fails with a configuration error. Re-authenticate with Google in the source settings. API keys have no token to refresh, so a persistent 401 causes the same failure.
- The connector returns a configuration error instead of retrying in several cases. These include an invalid API key or a token without the `youtube.force-ssl` scope. The error also occurs when the project's YouTube Data API v3 isn't enabled or a configured Channel ID doesn't exist. Correct the credentials or Channel IDs, then run the sync again.
- Service account authentication isn't supported because the YouTube Data API doesn't support it for most operations.

### Data coverage

- The `videos` stream reads each channel's uploads playlist. The playlist has no result limit, so it returns every upload regardless of channel size.
- Unlisted and private uploads appear in `videos`, `video`, `video_engagement`, and `comments` only with channel-owner OAuth 2.0 authentication. With an API key, these streams contain public videos only. They also contain only public videos for channels the OAuth user doesn't own.
- YouTube provides only current engagement counters. `video_engagement` records are snapshots from each sync, not historical data the connector can backfill.
- The `comments` stream skips deleted videos and videos with disabled comments. It produces no records or errors for them.
- Incremental `comments` maintains a cursor for each video. For channels exceeding 10,000 videos, the connector switches to one stream-level cursor. This can read more comments again during each sync than strictly required.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                                                                                                                                                                                                                              |
| ------- | ---------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1.4 | 2026-11-10 | [91783](https://github.com/airbytehq/airbyte/pull/91783) | Update dependencies |
| 1.1.3 | 2026-11-03 | [90796](https://github.com/airbytehq/airbyte/pull/90796) | Update dependencies |
| 1.1.2 | 2026-10-31 | [90314](https://github.com/airbytehq/airbyte/pull/90314) | Report a specific error message when YouTube cannot find a channel's uploads playlist |
| 1.1.1 | 2026-10-27 | [90088](https://github.com/airbytehq/airbyte/pull/90088) | Update dependencies |
| 1.1.0 | 2026-10-20 | [87495](https://github.com/airbytehq/airbyte/pull/87495) | Add incremental sync to `videos`, `video`, `comments`, and `channel_comments`; add the `video_engagement` stream; add `publishedAt`, `privacyStatus`, `channelId`, and `title` to `videos` records; fetch 50 videos per `videos.list` request and 100 comment threads per `commentThreads.list` request; fail fast when the daily quota is exhausted |
| 1.0.8 | 2026-10-20 | [89482](https://github.com/airbytehq/airbyte/pull/89482) | Update dependencies |
| 1.0.7 | 2026-10-13 | [88831](https://github.com/airbytehq/airbyte/pull/88831) | Update dependencies |
| 1.0.6 | 2026-10-07 | [87637](https://github.com/airbytehq/airbyte/pull/87637) | Enumerate channel videos through the uploads playlist to remove the search endpoint's 500-video cap. |
| 1.0.5 | 2026-10-06 | [88113](https://github.com/airbytehq/airbyte/pull/88113) | Update dependencies |
| 1.0.4 | 2026-09-29 | [87429](https://github.com/airbytehq/airbyte/pull/87429) | Update dependencies |
| 1.0.3 | 2026-09-22 | [86891](https://github.com/airbytehq/airbyte/pull/86891) | Update dependencies |
| 1.0.2 | 2026-09-21 | [86466](https://github.com/airbytehq/airbyte/pull/86466) | Fix authentication failures (HTTP 401) on channels with many videos: refresh the access token and retry on 401, and shorten API budget windows so syncs no longer wait past the token lifetime |
| 1.0.1 | 2026-09-15 | [86306](https://github.com/airbytehq/airbyte/pull/86306) | Update dependencies |
| 1.0.0 | 2026-09-10 | [85214](https://github.com/airbytehq/airbyte/pull/85214) | Breaking: promote connector to certified — declare primary keys and timestamp formats and restrict `videos` to video results (see the [migration guide](/integrations/sources/youtube-data-migrations)) |
| 0.0.66 | 2026-09-08 | [85721](https://github.com/airbytehq/airbyte/pull/85721) | Update dependencies |
| 0.0.65 | 2026-08-18 | [84813](https://github.com/airbytehq/airbyte/pull/84813) | Update dependencies |
| 0.0.64 | 2026-08-11 | [84181](https://github.com/airbytehq/airbyte/pull/84181) | Update dependencies |
| 0.0.63 | 2026-08-04 | [83693](https://github.com/airbytehq/airbyte/pull/83693) | Update dependencies |
| 0.0.62 | 2026-07-28 | [83186](https://github.com/airbytehq/airbyte/pull/83186) | Update dependencies |
| 0.0.61 | 2026-07-21 | [82663](https://github.com/airbytehq/airbyte/pull/82663) | Update dependencies |
| 0.0.60 | 2026-07-14 | [82070](https://github.com/airbytehq/airbyte/pull/82070) | Update dependencies |
| 0.0.59 | 2026-06-30 | [81317](https://github.com/airbytehq/airbyte/pull/81317) | Update dependencies |
| 0.0.58 | 2026-06-23 | [80730](https://github.com/airbytehq/airbyte/pull/80730) | Update dependencies |
| 0.0.57 | 2026-06-16 | [80123](https://github.com/airbytehq/airbyte/pull/80123) | Update dependencies |
| 0.0.56 | 2026-06-09 | [79580](https://github.com/airbytehq/airbyte/pull/79580) | Update dependencies |
| 0.0.55 | 2026-06-02 | [79000](https://github.com/airbytehq/airbyte/pull/79000) | Update dependencies |
| 0.0.54 | 2026-04-28 | [77496](https://github.com/airbytehq/airbyte/pull/77496) | Update dependencies |
| 0.0.53 | 2026-04-21 | [76818](https://github.com/airbytehq/airbyte/pull/76818) | Update dependencies |
| 0.0.52 | 2026-04-08 | [75185](https://github.com/airbytehq/airbyte/pull/75185) | Replace connector icon with updated YouTube logo |
| 0.0.51 | 2026-03-17 | [74392](https://github.com/airbytehq/airbyte/pull/74392) | Migrate to scopes object array format |
| 0.0.50 | 2026-03-17 | [74698](https://github.com/airbytehq/airbyte/pull/74698) | Update dependencies |
| 0.0.49 | 2026-03-03 | [73914](https://github.com/airbytehq/airbyte/pull/73914) | Update dependencies |
| 0.0.48 | 2026-02-17 | [73507](https://github.com/airbytehq/airbyte/pull/73507) | Update dependencies |
| 0.0.47 | 2026-02-10 | [73175](https://github.com/airbytehq/airbyte/pull/73175) | Update dependencies |
| 0.0.46 | 2026-01-27 | [72066](https://github.com/airbytehq/airbyte/pull/72066) | Update dependencies |
| 0.0.45 | 2026-01-14 | [70677](https://github.com/airbytehq/airbyte/pull/70677) | Update dependencies |
| 0.0.44 | 2026-01-05 | [71016](https://github.com/airbytehq/airbyte/pull/71016) | Fixed schemas |
| 0.0.43 | 2025-12-19 | [70971](https://github.com/airbytehq/airbyte/pull/70971) | Add acceptance tests |
| 0.0.42 | 2025-12-16 | [69315](https://github.com/airbytehq/airbyte/pull/69315) | Add OAuth 2.0 support |
| 0.0.41 | 2025-11-25 | [70079](https://github.com/airbytehq/airbyte/pull/70079) | Update dependencies |
| 0.0.40 | 2025-11-18 | [69532](https://github.com/airbytehq/airbyte/pull/69532) | Update dependencies |
| 0.0.39 | 2025-10-29 | [68942](https://github.com/airbytehq/airbyte/pull/68942) | Update dependencies |
| 0.0.38 | 2025-10-21 | [68456](https://github.com/airbytehq/airbyte/pull/68456) | Update dependencies |
| 0.0.37 | 2025-10-14 | [67987](https://github.com/airbytehq/airbyte/pull/67987) | Update dependencies |
| 0.0.36 | 2025-10-07 | [67241](https://github.com/airbytehq/airbyte/pull/67241) | Update dependencies |
| 0.0.35 | 2025-09-30 | [66846](https://github.com/airbytehq/airbyte/pull/66846) | Update dependencies |
| 0.0.34 | 2025-09-24 | [66475](https://github.com/airbytehq/airbyte/pull/66475) | Update dependencies |
| 0.0.33 | 2025-09-09 | [65731](https://github.com/airbytehq/airbyte/pull/65731) | Update dependencies |
| 0.0.32 | 2025-08-24 | [65468](https://github.com/airbytehq/airbyte/pull/65468) | Update dependencies |
| 0.0.31 | 2025-08-10 | [64863](https://github.com/airbytehq/airbyte/pull/64863) | Update dependencies |
| 0.0.30 | 2025-08-02 | [64386](https://github.com/airbytehq/airbyte/pull/64386) | Update dependencies |
| 0.0.29 | 2025-07-26 | [64056](https://github.com/airbytehq/airbyte/pull/64056) | Update dependencies |
| 0.0.28 | 2025-07-19 | [63640](https://github.com/airbytehq/airbyte/pull/63640) | Update dependencies |
| 0.0.27 | 2025-07-12 | [63216](https://github.com/airbytehq/airbyte/pull/63216) | Update dependencies |
| 0.0.26 | 2025-07-05 | [62701](https://github.com/airbytehq/airbyte/pull/62701) | Update dependencies |
| 0.0.25 | 2025-06-28 | [62233](https://github.com/airbytehq/airbyte/pull/62233) | Update dependencies |
| 0.0.24 | 2025-06-21 | [61759](https://github.com/airbytehq/airbyte/pull/61759) | Update dependencies |
| 0.0.23 | 2025-06-15 | [61171](https://github.com/airbytehq/airbyte/pull/61171) | Update dependencies |
| 0.0.22 | 2025-05-24 | [60786](https://github.com/airbytehq/airbyte/pull/60786) | Update dependencies |
| 0.0.21 | 2025-05-10 | [59968](https://github.com/airbytehq/airbyte/pull/59968) | Update dependencies |
| 0.0.20 | 2025-05-04 | [59566](https://github.com/airbytehq/airbyte/pull/59566) | Update dependencies |
| 0.0.19 | 2025-04-26 | [58930](https://github.com/airbytehq/airbyte/pull/58930) | Update dependencies |
| 0.0.18 | 2025-04-19 | [58550](https://github.com/airbytehq/airbyte/pull/58550) | Update dependencies |
| 0.0.17 | 2025-04-13 | [58052](https://github.com/airbytehq/airbyte/pull/58052) | Update dependencies |
| 0.0.16 | 2025-04-05 | [57379](https://github.com/airbytehq/airbyte/pull/57379) | Update dependencies |
| 0.0.15 | 2025-03-29 | [56821](https://github.com/airbytehq/airbyte/pull/56821) | Update dependencies |
| 0.0.14 | 2025-03-22 | [56338](https://github.com/airbytehq/airbyte/pull/56338) | Update dependencies |
| 0.0.13 | 2025-03-09 | [55664](https://github.com/airbytehq/airbyte/pull/55664) | Update dependencies |
| 0.0.12 | 2025-03-01 | [55162](https://github.com/airbytehq/airbyte/pull/55162) | Update dependencies |
| 0.0.11 | 2025-02-23 | [54632](https://github.com/airbytehq/airbyte/pull/54632) | Update dependencies |
| 0.0.10 | 2025-02-15 | [53087](https://github.com/airbytehq/airbyte/pull/53087) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52387](https://github.com/airbytehq/airbyte/pull/52387) | Update dependencies |
| 0.0.8 | 2025-01-18 | [52006](https://github.com/airbytehq/airbyte/pull/52006) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51380](https://github.com/airbytehq/airbyte/pull/51380) | Update dependencies |
| 0.0.6 | 2025-01-04 | [50753](https://github.com/airbytehq/airbyte/pull/50753) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50326](https://github.com/airbytehq/airbyte/pull/50326) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49756](https://github.com/airbytehq/airbyte/pull/49756) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49403](https://github.com/airbytehq/airbyte/pull/49403) | Update dependencies |
| 0.0.2 | 2024-12-11 | [49125](https://github.com/airbytehq/airbyte/pull/49125) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1   | 2024-11-08 |                                                          | Initial release by [@bala-ceg](https://github.com/bala-ceg) via Connector Builder                                                                                                                                                                                                                                                                    |

</details>
