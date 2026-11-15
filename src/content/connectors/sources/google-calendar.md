---
generated_record: true
connector_name: Google Calendar
connector_type: source
connector_slug: google-calendar
connector_directory: source-google-calendar
definition_id: c01b6259-bdf4-45ff-bcd5-66424cd2f18b
version: 1.2.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/google-calendar
logo: /images/connectors/sources/google-calendar.svg
logo_source_path: airbyte-integrations/connectors/source-google-calendar/icon.svg
logo_sha256: 1e6b1789a524e5157510057dfc1901e1745dcc423bd7e5f5531682d8eea9fb9d
original_metadata_path: airbyte-integrations/connectors/source-google-calendar/metadata.yaml
original_metadata_sha256: 952c83d6247c3d8d809f59c675b79fee316266619e37580695cfbbcf5a04c78e
original_document_path: docs/integrations/sources/google-calendar.md
original_document_sha256: d3c10387c2dac2ff57cc10f631ed935b3ddb7dc59500a1b5e719f044ce4b95b3
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: c7240a2ca2322ef0a4aea9db549ea8ea72ddfc8f7cc40558d486a4409901faf0
rewritten_at: 2026-11-12T14:12:39.140598+00:00
---

# Google Calendar

<HideInUI>

Use this page to set up the [Google Calendar](https://calendar.google.com) source connector and find reference information.

</HideInUI>

## Prerequisites

- A Google account with access to the calendars you want to sync.
- **Airbyte Cloud:** sign in with Google during setup through Airbyte's OAuth app. Alternatively, use your own OAuth app as described below.
- **Airbyte Open Source:** a Google Cloud project with the Google Calendar API enabled. You'll also need OAuth credentials: Client ID, Client Secret, and a Refresh Token. Follow the setup steps below.
- (Optional) A specific Calendar ID to sync only `events`, `acl`, and `freebusy` from one calendar.
- (Optional) A Start Date to limit event modification times. This applies to Full Refresh, initial Incremental syncs, and full re-reads.

## Setup guide

Set up your Google Calendar credentials, then configure the source in Airbyte.

## Set up Google Calendar

On Airbyte Cloud, choose **Authenticate via Google (OAuth)** in the [Airbyte setup](#set-up-the-google-calendar-connector-in-airbyte) to sign in through Airbyte's OAuth app. You don't need to create your own project. This flow requests six scopes: `calendar.calendarlist.readonly`, `calendar.calendars.readonly`, `calendar.events.readonly`, `calendar.settings.readonly`, `calendar.freebusy`, and `calendar.acls.readonly`. Each scope starts with `https://www.googleapis.com/auth/`. Google lists each permission separately on its consent screen. Allow every permission. If you leave a permission unchecked, its stream fails with a missing-scope error. Re-authenticate and allow the permission to resolve it.

For Airbyte Open Source, or to use **Authenticate with custom app (client ID / secret)** on Cloud, get three credentials from your Google Cloud project: **Client ID**, **Client secret**, and **Refresh token**.

1. Enable the Google Calendar API for your project in the [API Library](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com).
2. Configure the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent). Google won't create an OAuth client until the project has one. For a Google Workspace account in a Google Cloud organization, choose **Internal**. Otherwise, choose **External** and set the publishing status to **In production**. Google expires refresh tokens for an External app in **Testing** after 7 days. Syncs then fail with an authentication error. The Calendar scopes are sensitive. In production, an unverified app displays a "Google hasn't verified this app" warning during authorisation. You can continue past the warning for your own account. Add the `calendar.readonly` and `calendar.acls.readonly` scopes.
3. Create an OAuth client with type **Web application** on the [Credentials page](https://console.cloud.google.com/apis/credentials). Add `https://developers.google.com/oauthplayground` as an authorised redirect URI.
4. Get a refresh token with the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground):
   - Click the gear icon and check **Use your own OAuth credentials**. Then enter your Client ID and Client Secret.
   - Authorise the `https://www.googleapis.com/auth/calendar.readonly` and `https://www.googleapis.com/auth/calendar.acls.readonly` scopes. Then exchange the authorisation code for tokens. The `calendar.acls.readonly` scope is required for the `acl` stream. `calendar.readonly` alone supports every other stream. Instead of `calendar.readonly`, you can authorise the five granular scopes requested by Airbyte Cloud's OAuth flow. These are `calendar.calendarlist.readonly`, `calendar.calendars.readonly`, `calendar.events.readonly`, `calendar.settings.readonly`, and `calendar.freebusy`.

## Set up the connector in Airbyte

<!-- env:cloud -->

<!-- markdownlint-disable-next-line MD026 -->
### For Airbyte Cloud:

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Google Calendar** from the Source type dropdown.
4. Enter a name for the connector.
5. Under **Authentication**, choose **Authenticate via Google (OAuth)** and authorise your Google account. Alternatively, choose **Authenticate with custom app (client ID / secret)**. Enter your app's **Client ID**, **Client secret**, and **Refresh token** from [Google Calendar setup](#set-up-google-calendar).
6. (Optional) For **Calendar Id**, enter a calendar ID. This syncs only `events`, `acl`, and `freebusy` from that calendar. `calendarlist` and `calendars` ignore this setting. The calendar doesn't need to appear in the account's calendar list. The connector reads it directly. Use `primary` for the account's primary calendar. Leave this empty to sync every listed calendar, including hidden calendars.
7. (Optional) For **Start Date**, enter the earliest event `updated` timestamp. Use the format `YYYY-MM-DDTHH:mm:ssZ` or `YYYY-MM-DDTHH:mm:ss.SSSZ`. When unset, the cursor starts at `2000-01-01T00:00:00Z`. During an initial sync or full re-read, the connector applies the filter server-side only for dates within the last 21 days. For earlier dates, it reads the calendar and drops older events itself. See [Events sync behavior](#events-sync-behavior).
8. (Optional) For **Number of concurrent workers**, set 1–10 concurrent request workers. The default is 3. Values below 2 run with 2 workers.
9. Click **Set up source** and wait for the tests to finish.

<!-- /env:cloud -->

<!-- env:oss -->

<!-- markdownlint-disable-next-line MD026 -->
### For Airbyte Open Source:

1. Go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Google Calendar** from the Source type dropdown.
4. Enter a name for the connector.
5. Under **Authentication**, choose **Authenticate with custom app (client ID / secret)**. Enter the **Client ID**, **Client secret**, and **Refresh token** from [Google Calendar setup](#set-up-google-calendar). The refresh token must come from *your own* Google Cloud OAuth app. It must include the `calendar.readonly` and `calendar.acls.readonly` scopes. Also provide that app's client ID and client secret. Without `calendar.acls.readonly`, the `acl` stream fails with a configuration error. Generate a refresh token containing the scope, or deselect the stream.
6. (Optional) For **Calendar Id**, enter a calendar ID. This syncs only `events`, `acl`, and `freebusy` from that calendar. Use `primary` for the account's primary calendar. `calendarlist` and `calendars` ignore this setting. The calendar doesn't need to appear in the account's calendar list. The connector reads it directly. Leave this empty to sync every listed calendar, including hidden calendars.
7. (Optional) For **Start Date**, enter the earliest event `updated` timestamp. Use `YYYY-MM-DDTHH:mm:ssZ` or `YYYY-MM-DDTHH:mm:ss.SSSZ`. When unset, the cursor starts at `2000-01-01T00:00:00Z`. During an initial sync or full re-read, the connector applies the filter server-side only for dates within the last 21 days. For earlier dates, it reads the calendar and drops older events itself. See [Events sync behavior](#events-sync-behavior).
8. (Optional) For **Number of concurrent workers**, set 1–10 concurrent request workers. The default is 3. Values below 2 run with 2 workers.
9. Click **Set up source** and wait for the tests to finish.

<!-- /env:oss -->

### Configuration files and saved connections

When using a configuration file, the Airbyte API, or Terraform, you must provide `credentials`. It contains these fields:

- `auth_type`: use `oauth2.0` for **Authenticate via Google (OAuth)** or `manual` for **Authenticate with custom app (client ID / secret)**.
- `client_id`, `client_secret`, and `refresh_token`. The OAuth flow completes these fields for the `oauth2.0` option.

The optional top-level fields are `calendarid`, `start_date`, and `num_workers`. The default is 3, and the range is 1–10. Values below 2 run with 2 workers.

Before version 1.1.0, credentials used the top-level fields `client_id`, `client_secret`, and `client_refresh_token_2`. On its first run with version 1.1.0 or later, the connector rewrites saved configurations using these fields. It moves them to `credentials` with `auth_type: manual`. Existing connections continue using the same OAuth app. Keep these points in mind:

- The Airbyte API and Terraform validate new and updated configurations against the 1.1.0 spec before running the connector. They must therefore use the `credentials` fields. This requirement includes the next `apply` of an existing Terraform resource.
- After that first run, downgrading a connection below 1.1.0 requires you to restore the top-level fields manually.

<HideInUI>

## Supported sync modes

The Google Calendar source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append) (`events` only)
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped) (`events` only)

## Supported streams

The `events`, `acl`, and `freebusy` streams sync once for each calendar. When you configure **Calendar Id**, only that calendar syncs. The connector reads it directly, so it doesn't need to appear in the account's calendar list. Otherwise, every calendar in the account's calendar list syncs.

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
| ----------- | ----------- | ---------- | ------------------- | -------------------- |
| colors | kind | No pagination | ✅ | ❌ |
| settings | id | DefaultPaginator | ✅ | ❌ |
| calendarlist | id | DefaultPaginator | ✅ | ❌ |
| calendars | id | No pagination | ✅ | ❌ |
| events | calendar_id, id | DefaultPaginator | ✅ | ✅ |
| acl | calendar_id, id | DefaultPaginator | ✅ | ❌ |
| freebusy | calendar_id, start, end | No pagination | ✅ | ❌ |

When **Calendar Id** is empty, `events` reads only calendars where the account can read events. `acl` reads only calendars it owns. `freebusy` reads every listed calendar.

Deleted events are replicated. Cancelled events arrive with `status: "cancelled"` (`showDeleted=true`) and receive an `updated` value. This means they replace the live row under Append + Deduped. See [Events sync behavior](#events-sync-behavior).

Deleted calendar-list entries appear in `calendarlist` with `deleted: true`. Deleted sharing rules appear in `acl` with `role: "none"`. Internal calendar-list reads don't request deleted entries and prevent their use as child partitions. `calendars`, `events`, `acl`, and `freebusy` don't read removed calendars. This prevents requests for calendars you can no longer access. The full-refresh `calendars` stream has no deletion record. A removed calendar disappears from the next snapshot, and its deletion appears in `calendarlist`.

## Google user data

Airbyte follows the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including Limited Use requirements, when transferring Google API information to another app.

Raw or derived data from Google Workspace APIs follows the Google User Data Policy, including Limited Use requirements. This includes data from the Google Calendar API. Airbyte doesn't use this data to develop, improve or train generalised or non-personalised AI or machine learning models.

The connector only reads Calendar data to sync it to the destination configured in your connection.

## IP allow list

If your organisation restricts specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list when using Airbyte Cloud.

## Limitations and troubleshooting

<details>
<summary>
Expand to see details about Google Calendar connector limitations and troubleshooting.
</summary>

### Connector limitations

- **API quota:** The connector uses a moving-window budget of 500 requests/minute, including POST requests. It retries `rateLimitExceeded` / `userRateLimitExceeded` responses and HTTP 429 with exponential backoff. Other `quotaExceeded` / `dailyLimitExceeded` errors fail the sync as transient errors until the quota resets. These errors don't require a configuration change. Project quotas can vary. See [Google's quota documentation](https://developers.google.com/calendar/api/guides/quota).
- **Stale cursor:** Google rejects an `updatedMin` that's too far in the past. Testing measured this limit at 29 days, but Google doesn't document it. If the saved cursor is older than 21 days, the connector clears it and re-reads every event. When set, Start Date limits this re-read. If Google still returns `410 updatedMinTooLongAgo`, the connector treats it as a transient error. It automatically re-reads once the saved cursor is more than 21 days old. You can clear the `events` stream to re-read sooner. A `410` for a deleted calendar or `fullSyncRequired` is a configuration error.
- **`calendars` returns calendar resources, not list entries:** The connector returns each listed calendar the account can read (`minAccessRole=reader`), including hidden calendars. Fields include `kind`, `etag`, `id`, `summary`, `description`, `location`, `timeZone`, `conferenceProperties`, `dataOwner`, `autoAcceptInvitations` and `labelProperties`. The per-user list fields remain in `calendarlist`. These fields are `accessRole`, colours, reminders, `primary` and `selected`. This stream reads the calendar list regardless of **Calendar Id**.
- **`acl` scope and ownership:** The `acl` stream lists a calendar's sharing rules. It requires the `calendar.acls.readonly` OAuth scope, or `calendar.acls` / `calendar`. Without this scope, the stream fails with a configuration error. Re-authenticate and allow every requested permission, or generate a new refresh token for your OAuth client. Include the scope and paste the token into **Refresh token**. Alternatively, deselect the stream. If your connection adds new streams automatically, deselect `acl` until the token includes the scope. Google only shows sharing rules to a calendar's owner. The connector therefore skips calendars the account doesn't own.
- **`freebusy` is a point-in-time window:** The connector lists busy blocks from 30 days ago to 45 days ahead. It recalculates them during every sync, and `start_date` doesn't apply. If Google can't calculate free/busy for a calendar, the connector logs it and returns no rows. The destination therefore shows the same result as a free calendar. This data is a snapshot, not a historical record.
- **`settings.value` is always a string**, including numeric-looking settings.
- **`colors` is a singleton:** The connector returns one record containing `calendar` and `event` colour-palette objects.
- **Push notification channels** (`channels`) aren't synced by design. They're write-only subscriptions that the connector would need to create, not readable data.

### Troubleshooting

- Syncs may start failing with a rejected refresh token (`invalid_grant`) about one week after setup. This probably means the OAuth app's consent screen is an **External** app in **Testing**. Its refresh tokens expire after 7 days. Set its publishing status to **In production** and generate a new refresh token. Then paste it into **Refresh token**.
- A missing OAuth scope error means a permission was unchecked on Google's consent screen. Alternatively, the refresh token may omit a scope listed in [Google Calendar setup](#set-up-google-calendar). Re-authenticate and allow every requested permission, generate a new refresh token with the required scopes, or deselect the stream.
- Find common Google Calendar source connector issues on the [Airbyte Forum](https://github.com/airbytehq/airbyte/discussions).

</details>

### Events sync behaviour

The `events` stream syncs incrementally using the event's last modification time (`updated`) and Google Calendar's `updatedMin` filter.

- **Cancelled events** are included (`showDeleted=true`) with `status: cancelled`, so deletions reach the destination. Google returns these as stubs without a modification time. The connector therefore sets their `updated`. It uses the saved cursor or one hour before the sync, whichever is later. Under *Append + Deduped*, this lets the cancelled row replace the live row. Filter `status != 'cancelled'` downstream if you only want live events.
- **`calendar_id`** contains the calendar's actual ID, so it joins to `calendarlist.id` / `calendars.id`. The connector resolves the `primary` alias to the account's email address.
- **One cursor for all calendars.** The stream uses one `updated` cursor across all calendars. A calendar added after the first sync starts from this cursor, so its older events aren't synced. Clear the `events` stream to backfill them.
- **Recurring series** are returned as one record (`singleEvents=false`). Individual occurrences aren't expanded. The record's `updated` shows when the series was last edited.
- **`start_date`** limits events to those last modified on or after that date. This applies to every Full Refresh sync, the first Incremental sync and any full re-read. Full re-reads happen after a reset or when the saved cursor is older than 21 days. For these reads, the connector only sends `updatedMin` when the configured date falls within the previous 21 days. Otherwise, it downloads the calendar and removes older records itself. A recurring series counts as one event. A start date therefore removes series unchanged since that date, even when they still have upcoming occurrences. When unset, the cursor starts at `2000-01-01T00:00:00Z`.
- **29-day window.** Google rejects `updatedMin` older than 29 days. This measured limit isn't documented and has previously been shorter. The connector uses the newest `updated` it has seen as its cursor. If that cursor is older than 21 days when a sync starts, the connector clears it. This can happen when a calendar has no edits for three weeks or a connection is paused for three weeks. The connector then re-reads the full calendar, or everything since `start_date`, before continuing incrementally. A calendar with only deletions still advances its cursor, as explained under cancelled events. A calendar with no changes re-reads during every sync until something changes.
- **Recommended sync mode:** *Incremental | Append + Deduped* uses `calendar_id` and `id` as the primary key. The same event id appears on every calendar containing that meeting. With plain *Append*, each re-read described above adds another copy of every event.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| ------- | ---- | ------------ | ------- |
| 1.2.0 | 2026-11-11 | [92016](https://github.com/airbytehq/airbyte/pull/92016) | Include calendar and ACL tombstones, expand schemas, and improve pagination and concurrency reliability. |
| 1.1.0 | 2026-11-11 | [86469](https://github.com/airbytehq/airbyte/pull/86469) | Add declarative Google OAuth with granular read-only scopes and a custom-app authentication option; automatically migrate saved flat credentials (downgrading below 1.1.0 then needs them restored by hand); report a missing OAuth scope as a configuration error. |
| 1.0.1 | 2026-11-10 | [91570](https://github.com/airbytehq/airbyte/pull/91570) | Update dependencies |
| 1.0.0 | 2026-11-09 | [86470](https://github.com/airbytehq/airbyte/pull/86470) | Add `acl` and `freebusy` streams, read `events`/`acl`/`freebusy` from every calendar when `calendarid` is empty, change the `events` primary key to `[calendar_id, id]`, return calendar resources from `calendars`, change the `colors` primary key to `kind`, and type date and date-time fields (breaking, see the [migration guide](/integrations/sources/google-calendar-migrations)) |
| 0.1.4 | 2026-11-03 | [90589](https://github.com/airbytehq/airbyte/pull/90589) | Update dependencies |
| 0.1.3 | 2026-10-27 | [89924](https://github.com/airbytehq/airbyte/pull/89924) | Update dependencies |
| 0.1.2 | 2026-10-20 | [89285](https://github.com/airbytehq/airbyte/pull/89285) | Update dependencies |
| 0.1.1 | 2026-10-13 | [88641](https://github.com/airbytehq/airbyte/pull/88641) | Update dependencies |
| 0.1.0 | 2026-10-07 | [86468](https://github.com/airbytehq/airbyte/pull/86468) | Add error handling, API budget, concurrency, incremental `events` (now includes cancelled events via `showDeleted=true`) with a `calendar_id` column and an optional `start_date`, and enable acceptance tests |
| 0.0.55 | 2026-10-06 | [87901](https://github.com/airbytehq/airbyte/pull/87901) | Update dependencies |
| 0.0.54 | 2026-09-29 | [87194](https://github.com/airbytehq/airbyte/pull/87194) | Update dependencies |
| 0.0.53 | 2026-09-22 | [86679](https://github.com/airbytehq/airbyte/pull/86679) | Update dependencies |
| 0.0.52 | 2026-09-15 | [86070](https://github.com/airbytehq/airbyte/pull/86070) | Update dependencies |
| 0.0.51 | 2026-09-08 | [85541](https://github.com/airbytehq/airbyte/pull/85541) | Update dependencies |
| 0.0.50 | 2026-08-18 | [84636](https://github.com/airbytehq/airbyte/pull/84636) | Update dependencies |
| 0.0.49 | 2026-08-11 | [83962](https://github.com/airbytehq/airbyte/pull/83962) | Update dependencies |
| 0.0.48 | 2026-08-04 | [83499](https://github.com/airbytehq/airbyte/pull/83499) | Update dependencies |
| 0.0.47 | 2026-07-28 | [82972](https://github.com/airbytehq/airbyte/pull/82972) | Update dependencies |
| 0.0.46 | 2026-07-21 | [82435](https://github.com/airbytehq/airbyte/pull/82435) | Update dependencies |
| 0.0.45 | 2026-07-14 | [81849](https://github.com/airbytehq/airbyte/pull/81849) | Update dependencies |
| 0.0.44 | 2026-06-30 | [81038](https://github.com/airbytehq/airbyte/pull/81038) | Update dependencies |
| 0.0.43 | 2026-06-23 | [80483](https://github.com/airbytehq/airbyte/pull/80483) | Update dependencies |
| 0.0.42 | 2026-06-16 | [79880](https://github.com/airbytehq/airbyte/pull/79880) | Update dependencies |
| 0.0.41 | 2026-06-09 | [79339](https://github.com/airbytehq/airbyte/pull/79339) | Update dependencies |
| 0.0.40 | 2026-06-02 | [78738](https://github.com/airbytehq/airbyte/pull/78738) | Update dependencies |
| 0.0.39 | 2026-04-28 | [77268](https://github.com/airbytehq/airbyte/pull/77268) | Update dependencies |
| 0.0.38 | 2026-04-21 | [76584](https://github.com/airbytehq/airbyte/pull/76584) | Update dependencies |
| 0.0.37 | 2026-03-31 | [75671](https://github.com/airbytehq/airbyte/pull/75671) | Update dependencies |
| 0.0.36 | 2026-03-17 | [74985](https://github.com/airbytehq/airbyte/pull/74985) | Update dependencies |
| 0.0.35 | 2026-02-24 | [73746](https://github.com/airbytehq/airbyte/pull/73746) | Update dependencies |
| 0.0.34 | 2026-02-17 | [73085](https://github.com/airbytehq/airbyte/pull/73085) | Update dependencies |
| 0.0.33 | 2026-01-20 | [71931](https://github.com/airbytehq/airbyte/pull/71931) | Update dependencies |
| 0.0.32 | 2026-01-14 | [71428](https://github.com/airbytehq/airbyte/pull/71428) | Update dependencies |
| 0.0.31 | 2025-12-18 | [70696](https://github.com/airbytehq/airbyte/pull/70696) | Update dependencies |
| 0.0.30 | 2025-11-25 | [69889](https://github.com/airbytehq/airbyte/pull/69889) | Update dependencies |
| 0.0.29 | 2025-11-18 | [69373](https://github.com/airbytehq/airbyte/pull/69373) | Update dependencies |
| 0.0.28 | 2025-10-29 | [69049](https://github.com/airbytehq/airbyte/pull/69049) | Update dependencies |
| 0.0.27 | 2025-10-21 | [68310](https://github.com/airbytehq/airbyte/pull/68310) | Update dependencies |
| 0.0.26 | 2025-10-14 | [68007](https://github.com/airbytehq/airbyte/pull/68007) | Update dependencies |
| 0.0.25 | 2025-10-07 | [67257](https://github.com/airbytehq/airbyte/pull/67257) | Update dependencies |
| 0.0.24 | 2025-09-30 | [66309](https://github.com/airbytehq/airbyte/pull/66309) | Update dependencies |
| 0.0.23 | 2025-09-09 | [66046](https://github.com/airbytehq/airbyte/pull/66046) | Update dependencies |
| 0.0.22 | 2025-08-23 | [65366](https://github.com/airbytehq/airbyte/pull/65366) | Update dependencies |
| 0.0.21 | 2025-08-09 | [64614](https://github.com/airbytehq/airbyte/pull/64614) | Update dependencies |
| 0.0.20 | 2025-08-02 | [64218](https://github.com/airbytehq/airbyte/pull/64218) | Update dependencies |
| 0.0.19 | 2025-07-26 | [63813](https://github.com/airbytehq/airbyte/pull/63813) | Update dependencies |
| 0.0.18 | 2025-07-19 | [63491](https://github.com/airbytehq/airbyte/pull/63491) | Update dependencies |
| 0.0.17 | 2025-07-12 | [63149](https://github.com/airbytehq/airbyte/pull/63149) | Update dependencies |
| 0.0.16 | 2025-07-05 | [62653](https://github.com/airbytehq/airbyte/pull/62653) | Update dependencies |
| 0.0.15 | 2025-06-28 | [62156](https://github.com/airbytehq/airbyte/pull/62156) | Update dependencies |
| 0.0.14 | 2025-06-21 | [61833](https://github.com/airbytehq/airbyte/pull/61833) | Update dependencies |
| 0.0.13 | 2025-06-14 | [61121](https://github.com/airbytehq/airbyte/pull/61121) | Update dependencies |
| 0.0.12 | 2025-05-24 | [60587](https://github.com/airbytehq/airbyte/pull/60587) | Update dependencies |
| 0.0.11 | 2025-05-10 | [59250](https://github.com/airbytehq/airbyte/pull/59250) | Update dependencies |
| 0.0.10 | 2025-04-26 | [58812](https://github.com/airbytehq/airbyte/pull/58812) | Update dependencies |
| 0.0.9 | 2025-04-19 | [58175](https://github.com/airbytehq/airbyte/pull/58175) | Update dependencies |
| 0.0.8 | 2025-04-12 | [57066](https://github.com/airbytehq/airbyte/pull/57066) | Update dependencies |
| 0.0.7 | 2025-03-29 | [56487](https://github.com/airbytehq/airbyte/pull/56487) | Update dependencies |
| 0.0.6 | 2025-03-22 | [55939](https://github.com/airbytehq/airbyte/pull/55939) | Update dependencies |
| 0.0.5 | 2025-03-08 | [55325](https://github.com/airbytehq/airbyte/pull/55325) | Update dependencies |
| 0.0.4 | 2025-03-01 | [54992](https://github.com/airbytehq/airbyte/pull/54992) | Update dependencies |
| 0.0.3 | 2025-02-22 | [54395](https://github.com/airbytehq/airbyte/pull/54395) | Update dependencies |
| 0.0.2 | 2025-02-15 | [47915](https://github.com/airbytehq/airbyte/pull/47915) | Update dependencies |
| 0.0.1 | 2024-10-06 | | Initial release by [@bala-ceg](https://github.com/bala-ceg) via Connector Builder |

</details>

</HideInUI>
