---
generated_record: true
connector_name: Iterable
connector_type: source
connector_slug: iterable
connector_directory: source-iterable
definition_id: 2e875208-0c0b-4ee4-9e92-1cb3156ea799
version: 1.0.2
support_level: community
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/iterable
logo: /images/connectors/sources/iterable.svg
logo_source_path: airbyte-integrations/connectors/source-iterable/icon.svg
logo_sha256: acbcc1ef8d9a955b3a6784407960132d38fb1b41c4c58d238b9658f24fa4843b
original_metadata_path: airbyte-integrations/connectors/source-iterable/metadata.yaml
original_metadata_sha256: 0f7f85a9cde663f022339db7e582da554ec92c9090f7f6998c20f68dbb92822f
original_document_path: docs/integrations/sources/iterable.md
original_document_sha256: 1601520be879a22eb7bf31848128bab7241e3a598b6e0964a8c56cf8a9ce87ed
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3f94a7365895d49ac0ae336c04d2cbff690f759e8d3b2e8d59ec8b33e2a880a5
rewritten_at: 2026-11-12T13:44:31.959544+00:00
---

# Iterable

Use this guide to set up the Iterable source connector and find reference information.

## Prerequisites

To set up the Iterable source connector, you need:

- An Iterable [Server-side API key](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys) with **Standard** permissions. Create the key in the Iterable project you want to sync. Mobile, Browser, and other client-side API keys aren't supported.
- The data centre hosting your Iterable project. Each project uses either the US data centre (USDC) or European data centre (EDC). An API key only works with the data centre that issued it. If you're unsure, ask an Iterable administrator or check your Iterable login URL.

## Set up the connector

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account or go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Iterable** from the **Source type** dropdown.
4. Enter a name for the Iterable connector.
5. For **API Key**, enter your Iterable [Server-side API key](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys).
6. For **Start Date**, enter the date in `YYYY-MM-DDTHH:mm:ssZ` format. The connector replicates data created on or after this date.
7. For **Region**, select the option matching your project's data centre. Select **US** for the US data centre or **EU** for the European data centre. The default is **US**. The connector calls `https://api.iterable.com/api/` for **US** and `https://api.eu.iterable.com/api/` for **EU**. Your selected region must match the data centre that issued your API key.
8. (Optional) For **Lookback Window (Minutes)**, enter the minutes to re-read before the current time at each sync window's end. The default is 5 minutes. This setting accounts for eventual consistency delays in Iterable's Export API. Increase it if events are missing near the end of sync windows.
9. Click **Set up source**.

## Supported sync modes

The Iterable source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh - Overwrite
- Full Refresh - Append
- Incremental - Append
- Incremental - Append + Deduped

Incremental streams don't declare primary keys. To use Incremental - Append + Deduped, select a primary key when configuring the connection.

## Supported streams

- [Campaigns](https://api.iterable.com/api/docs#campaigns_campaigns)
- [Campaign Metrics](https://api.iterable.com/api/docs#campaigns_metrics)
- [Channels](https://api.iterable.com/api/docs#channels_channels)
- [Email Bounce](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Email Click](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Email Complaint](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Email Open](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Email Send](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Email Send Skip](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Email Subscribe](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Email Unsubscribe](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Events](https://api.iterable.com/api/docs#events_User_events)
- [Lists](https://api.iterable.com/api/docs#lists_getLists)
- [List Users](https://api.iterable.com/api/docs#lists_getLists_0)
- [Message Types](https://api.iterable.com/api/docs#messageTypes_messageTypes)
- [Metadata](https://api.iterable.com/api/docs#metadata_list_tables)
- [Templates](https://api.iterable.com/api/docs#templates_getTemplates) \(Incremental\)
- [Users](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [PushSend](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [PushSendSkip](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [PushOpen](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [PushUninstall](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [PushBounce](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [WebPushSend](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [WebPushClick](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [WebPushSendSkip](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InAppSend](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InAppOpen](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InAppClick](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InAppClose](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InAppDelete](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InAppDelivery](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InAppSendSkip](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InboxSession](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [InboxMessageImpression](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [SmsSend](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [SmsBounce](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [SmsClick](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [SmsReceived](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [SmsSendSkip](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [SmsUsageInfo](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [Purchase](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [CustomEvent](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)
- [HostedUnsubscribeClick](https://api.iterable.com/api/docs#export_exportDataJson) \(Incremental\)

## Limits and considerations

### Data centre regions

Iterable hosts each project in either the US data centre (USDC) or European data centre (EDC). API keys only work with the data centre where they were created. Choose the **Region** matching your project, so the connector calls the correct base URL. If a working configuration suddenly fails authentication, confirm that **Region** still matches the data centre that issued your API key.

### Rate limits

Iterable's Export API allows 4 requests per minute for each project. The connector respects this limit and adjusts date-range slice sizes automatically. Most other endpoints allow 100 requests per second for each project. The connector retries rate-limited requests (HTTP 429) using exponential backoff.

### Campaigns and Campaign Metrics

The Campaigns stream requests 1,000 campaigns at a time from Iterable's `GET /api/campaigns` endpoint. It continues until a page returns fewer than 1,000 campaigns. From connector version 1.0.2, it always sends the `page` and `pageSize` parameters. Iterable has deprecated returning every campaign in one unpaginated response. With earlier versions, affected projects only receive the first campaign page when Iterable doesn't allow unpaginated access.

The Campaign Metrics stream reads the same paginated campaign list. It then requests metrics for 20 campaigns at a time from `GET /api/campaigns/metrics`. Each request covers the period from your **Start Date** to the sync time. Therefore, every sync re-reads metrics for the full period. Projects with many campaigns generate many metrics requests.

### Incremental sync behaviour

Streams supporting incremental sync use these approaches:

- **Users**: Splits data retrieval into 90-day intervals. Uses `profileUpdatedAt` as the cursor.
- **Export-based event streams** (Email, Push, SMS, In-App, Web Push, Inbox, Purchase, CustomEvent, HostedUnsubscribeClick): Uses adaptive date-range slicing. The connector starts with a 30-day slice. It adjusts later slice sizes based on each request's processing time. If Iterable closes the connection before export finishes (a `ChunkedEncodingError`), the connector halves the slice size and retries. The sync fails after 6 consecutive failures for the same window, with the error `Iterable Export API response repeatedly closed for the selected event window.` The slice size resets for the next sync. Retry the sync before investigating further.
- **Templates**: Uses fixed 90-day intervals. Uses `updatedAt` as the cursor.

### Custom fields and the `data` object

Iterable projects define their own user profile and event fields. Three streams keep documented columns fixed and collect all other fields in a generic `data` object.

**Users**, from connector version 1.0.0, keeps the [fields Iterable manages](https://support.iterable.com/hc/en-us/articles/217744303-User-Profile-Fields-Used-by-Iterable) at the top level. These include `email`, `userId`, `itblUserId`, `emailListIds`, `userListIds`, `profileUpdatedAt`, `signupDate`, and `signupSource`. They also include `subscribedMessageTypeIds`, `unsubscribedChannelIds`, `unsubscribedMessageTypeIds`, `knownLitigatorFilter`, `receivedSMSDisclaimer`, `city`, `region`, and `country`. The remaining fields are `devices`, `ip`, `locale`, `phoneNumber`, `whatsAppPhoneNumber`, `profile`, and `timeZone`. It also keeps the `itblInternal` and `itblDS` keys listed below. Every other profile field arrives inside `data`, including custom fields defined by your project.

The Export API returns Iterable's internal metadata as flat, dotted keys, rather than a nested object. The connector preserves `itblInternal.emailDomain`, `itblInternal.phoneCountry`, `itblInternal.phoneType`, `itblInternal.documentCreatedAt`, `itblInternal.documentUpdatedAt`, `itblInternal.isUnknownUser`, `itblDS.brandAffinityLabel`, and `itblDS.predictiveGoals` in this form. Most destinations replace unsupported characters in column names. Expect something like `itblinternal_emaildomain`, rather than a nested structure you can traverse.

Iterable returns some profile timestamps in a space-separated format, such as `2024-01-15 10:30:00 +00:00`. The connector converts `signupDate`, `profileUpdatedAt`, `itblInternal.documentCreatedAt`, and `itblInternal.documentUpdatedAt` to RFC 3339 (`2024-01-15T10:30:00+00:00`). This conversion lets destinations store them as timestamps. Values in other formats pass through unchanged.

**Events** keeps `_type`, `createdAt`, `email`, and `itblInternal` at the top level. Every other field, including `userId`, goes into `data`.

**Campaign Metrics** returns one `data` object for each campaign. Iterable provides these metrics as CSV. The connector parses each row into `data`. Individual metrics are keys within that object, not top-level columns.

If you're upgrading from connector version 0.x, see the [Iterable migration guide](/integrations/sources/iterable-migrations) for details about the users stream restructuring.

### Lookback window

Iterable's Export API has eventual consistency, so recent events may not appear immediately in export results. To prevent silent data loss, the connector applies a configurable lookback window. It subtracts this window from the current time when setting each sync window's end. The default is 5 minutes. The connector also removes duplicate records within the lookback overlap.

### Error handling

The List Users stream skips lists returning `500 - Generic Error` responses and continues processing the remaining lists. This behaviour stops intermittent API failures for individual lists from blocking the entire sync.

For all streams, the connector retries rate-limited requests (HTTP 429) and server errors (HTTP 500–599) using exponential backoff. It makes up to 10 retries, with delays from 20 to 400 seconds.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                                                                    |
|:--------|:-----------|:---------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.0.2 | 2026-11-11 | [85908](https://github.com/airbytehq/airbyte/pull/85908) | Paginate `GET /api/campaigns` (the `campaigns` stream and the campaign lookup used by `campaigns_metrics`) using the Iterable API's page and pageSize parameters. |
| 1.0.1 | 2026-09-16 | [78129](https://github.com/airbytehq/airbyte/pull/78129) | Improve the error message for Iterable Export API response closures after retries. |
| 1.0.0 | 2026-08-25 | [79635](https://github.com/airbytehq/airbyte/pull/79635) | 🚨 Breaking: Restructure `users` stream schema - standard Iterable fields stay top-level, custom fields move to a `data` object, `itblInternal` flattened to dotted keys, timestamp values (`signupDate`, `profileUpdatedAt`, `itblInternal` document timestamps) normalized to RFC3339 to match their `timestamp_with_timezone` typing, added `itblUserId`, `whatsAppPhoneNumber`, `city`, `region`. See the [migration guide](/integrations/sources/iterable-migrations). |
| 0.7.2 | 2026-05-07 | [74702](https://github.com/airbytehq/airbyte/pull/74702) | Add optional `Region` parameter to support Iterable's EU data center |
| 0.7.1 | 2026-04-07 | [76036](https://github.com/airbytehq/airbyte/pull/76036) | Fix `reduce_range()` to actually halve slice size on ChunkedEncodingError retry |
| 0.7.0 | 2026-03-24 | [74379](https://github.com/airbytehq/airbyte/pull/74379) | Add configurable lookback window to prevent silent data loss from Iterable Export API eventual consistency |
| 0.6.54 | 2026-03-04 | [74256](https://github.com/airbytehq/airbyte/pull/74256) | Filter duplicate records in export streams during incremental syncs |
| 0.6.53 | 2025-10-21 | [68545](https://github.com/airbytehq/airbyte/pull/68545) | Update dependencies |
| 0.6.52 | 2025-10-14 | [67947](https://github.com/airbytehq/airbyte/pull/67947) | Update dependencies |
| 0.6.51 | 2025-10-10 | [67602](https://github.com/airbytehq/airbyte/pull/67602) | Fix array schema definitions |
| 0.6.50 | 2025-10-07 | [67361](https://github.com/airbytehq/airbyte/pull/67361) | Update dependencies |
| 0.6.49 | 2025-09-30 | [66798](https://github.com/airbytehq/airbyte/pull/66798) | Update dependencies |
| 0.6.48 | 2025-09-09 | [66107](https://github.com/airbytehq/airbyte/pull/66107) | Update dependencies |
| 0.6.47 | 2025-08-23 | [65380](https://github.com/airbytehq/airbyte/pull/65380) | Update dependencies |
| 0.6.46 | 2025-08-16 | [64970](https://github.com/airbytehq/airbyte/pull/64970) | Update dependencies |
| 0.6.45 | 2025-08-09 | [64604](https://github.com/airbytehq/airbyte/pull/64604) | Update dependencies |
| 0.6.44 | 2025-08-02 | [64284](https://github.com/airbytehq/airbyte/pull/64284) | Update dependencies |
| 0.6.43 | 2025-07-26 | [63868](https://github.com/airbytehq/airbyte/pull/63868) | Update dependencies |
| 0.6.42 | 2025-07-19 | [63451](https://github.com/airbytehq/airbyte/pull/63451) | Update dependencies |
| 0.6.41 | 2025-07-12 | [63141](https://github.com/airbytehq/airbyte/pull/63141) | Update dependencies |
| 0.6.40 | 2025-07-05 | [62665](https://github.com/airbytehq/airbyte/pull/62665) | Update dependencies |
| 0.6.39 | 2025-06-28 | [62174](https://github.com/airbytehq/airbyte/pull/62174) | Update dependencies |
| 0.6.38 | 2025-06-21 | [61814](https://github.com/airbytehq/airbyte/pull/61814) | Update dependencies |
| 0.6.37 | 2025-06-16 | [61119](https://github.com/airbytehq/airbyte/pull/61119) | Update dependencies |
| 0.6.36 | 2025-05-24 | [58772](https://github.com/airbytehq/airbyte/pull/58772) | Update dependencies |
| 0.6.35 | 2025-05-22 | [60854](https://github.com/airbytehq/airbyte/pull/60854) | Update dependencies and expected records |
| 0.6.34 | 2025-04-12 | [57737](https://github.com/airbytehq/airbyte/pull/57737) | Update dependencies |
| 0.6.33 | 2025-04-05 | [57057](https://github.com/airbytehq/airbyte/pull/57057) | Update dependencies |
| 0.6.32 | 2025-03-29 | [56655](https://github.com/airbytehq/airbyte/pull/56655) | Update dependencies |
| 0.6.31 | 2025-03-22 | [56015](https://github.com/airbytehq/airbyte/pull/56015) | Update dependencies |
| 0.6.30 | 2025-03-09 | [55510](https://github.com/airbytehq/airbyte/pull/55510) | Update dependencies |
| 0.6.29 | 2025-03-01 | [54759](https://github.com/airbytehq/airbyte/pull/54759) | Update dependencies |
| 0.6.28 | 2025-02-22 | [54287](https://github.com/airbytehq/airbyte/pull/54287) | Update dependencies |
| 0.6.27 | 2025-02-18 | [53814](https://github.com/airbytehq/airbyte/pull/53814) | Update dependencies |
| 0.6.26 | 2025-02-01 | [52726](https://github.com/airbytehq/airbyte/pull/52726) | Update dependencies |
| 0.6.25 | 2025-01-25 | [52277](https://github.com/airbytehq/airbyte/pull/52277) | Update dependencies |
| 0.6.24 | 2025-01-11 | [51163](https://github.com/airbytehq/airbyte/pull/51163) | Update dependencies |
| 0.6.23 | 2025-01-04 | [50889](https://github.com/airbytehq/airbyte/pull/50889) | Update dependencies |
| 0.6.22 | 2024-12-28 | [50608](https://github.com/airbytehq/airbyte/pull/50608) | Update dependencies |
| 0.6.21 | 2024-12-21 | [50101](https://github.com/airbytehq/airbyte/pull/50101) | Update dependencies |
| 0.6.20 | 2024-12-14 | [49211](https://github.com/airbytehq/airbyte/pull/49211) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.6.19 | 2024-12-12 | [48993](https://github.com/airbytehq/airbyte/pull/48993) | Update dependencies |
| 0.6.18 | 2024-11-04 | [48294](https://github.com/airbytehq/airbyte/pull/48294) | Update dependencies |
| 0.6.17 | 2024-10-29 | [47803](https://github.com/airbytehq/airbyte/pull/47803) | Update dependencies |
| 0.6.16 | 2024-10-28 | [47487](https://github.com/airbytehq/airbyte/pull/47487) | Update dependencies |
| 0.6.15 | 2024-10-23 | [47057](https://github.com/airbytehq/airbyte/pull/47057) | Update dependencies |
| 0.6.14 | 2024-10-12 | [46814](https://github.com/airbytehq/airbyte/pull/46814) | Update dependencies |
| 0.6.13 | 2024-10-05 | [46399](https://github.com/airbytehq/airbyte/pull/46399) | Update dependencies |
| 0.6.12 | 2024-09-28 | [46155](https://github.com/airbytehq/airbyte/pull/46155) | Update dependencies |
| 0.6.11 | 2024-09-21 | [45828](https://github.com/airbytehq/airbyte/pull/45828) | Update dependencies |
| 0.6.10 | 2024-09-14 | [45518](https://github.com/airbytehq/airbyte/pull/45518) | Update dependencies |
| 0.6.9 | 2024-09-07 | [45221](https://github.com/airbytehq/airbyte/pull/45221) | Update dependencies |
| 0.6.8 | 2024-08-31 | [45029](https://github.com/airbytehq/airbyte/pull/45029) | Update dependencies |
| 0.6.7 | 2024-08-24 | [44636](https://github.com/airbytehq/airbyte/pull/44636) | Update dependencies |
| 0.6.6 | 2024-08-17 | [44260](https://github.com/airbytehq/airbyte/pull/44260) | Update dependencies |
| 0.6.5 | 2024-08-12 | [43899](https://github.com/airbytehq/airbyte/pull/43899) | Update dependencies |
| 0.6.4 | 2024-08-10 | [43527](https://github.com/airbytehq/airbyte/pull/43527) | Update dependencies |
| 0.6.3 | 2024-08-03 | [43142](https://github.com/airbytehq/airbyte/pull/43142) | Update dependencies |
| 0.6.2 | 2024-07-27 | [42653](https://github.com/airbytehq/airbyte/pull/42653) | Update dependencies |
| 0.6.1 | 2024-07-23 | [42449](https://github.com/airbytehq/airbyte/pull/42449) | Fix OOM errors; bum CDK version |
| 0.6.0 | 2024-07-22 | [41983](https://github.com/airbytehq/airbyte/pull/41983) | Fix OOM errors; update CDK to v3 |
| 0.5.11 | 2024-07-20 | [42228](https://github.com/airbytehq/airbyte/pull/42228) | Update dependencies |
| 0.5.10 | 2024-07-13 | [41684](https://github.com/airbytehq/airbyte/pull/41684) | Update dependencies |
| 0.5.9 | 2024-07-10 | [41401](https://github.com/airbytehq/airbyte/pull/41401) | Update dependencies |
| 0.5.8 | 2024-07-09 | [41293](https://github.com/airbytehq/airbyte/pull/41293) | Update dependencies |
| 0.5.7 | 2024-07-06 | [40811](https://github.com/airbytehq/airbyte/pull/40811) | Update dependencies |
| 0.5.6 | 2024-06-25 | [40362](https://github.com/airbytehq/airbyte/pull/40362) | Update dependencies |
| 0.5.5 | 2024-06-22 | [40080](https://github.com/airbytehq/airbyte/pull/40080) | Update dependencies |
| 0.5.4 | 2024-06-17 | [39382](https://github.com/airbytehq/airbyte/pull/39382) | Refactor state handling for Python incremental streams |
| 0.5.3 | 2024-06-05 | [39142](https://github.com/airbytehq/airbyte/pull/39142) | Updated the `CDK` version to `0.89.0` to fix OOM |
| 0.5.2 | 2024-06-04 | [39077](https://github.com/airbytehq/airbyte/pull/39077) | [autopull] Upgrade base image to v1.2.1 |
| 0.5.1 | 2024-04-24 | [36645](https://github.com/airbytehq/airbyte/pull/36645) | Schema descriptions and CDK 0.80.0 |
| 0.5.0 | 2024-03-18 | [36231](https://github.com/airbytehq/airbyte/pull/36231) | Migrate connector to low-code |
| 0.4.0 | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0` |
| 0.3.0 | 2024-02-20 | [35465](https://github.com/airbytehq/airbyte/pull/35465) | Per-error reporting and continue sync on stream failures |
| 0.2.2 | 2024-02-12 | [35150](https://github.com/airbytehq/airbyte/pull/35150) | Manage dependencies with Poetry. |
| 0.2.1 | 2024-01-12 | [1234](https://github.com/airbytehq/airbyte/pull/1234) | prepare for airbyte-lib |
| 0.2.0 | 2023-09-29 | [30931](https://github.com/airbytehq/airbyte/pull/30931) | Added `userId` to `email_bounce`, `email_click`, `email_complaint`, `email_open`, `email_send` `email_send_skip`, `email_subscribe`, `email_unsubscribe`, `events` streams |
| 0.1.31 | 2023-12-06 | [33106](https://github.com/airbytehq/airbyte/pull/33106) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.30 | 2023-07-19 | [28457](https://github.com/airbytehq/airbyte/pull/28457) | Fixed TypeError for StreamSlice in debug mode |
| 0.1.29 | 2023-05-24 | [26459](https://github.com/airbytehq/airbyte/pull/26459) | Added requests reading timeout 300 seconds |
| 0.1.28 | 2023-05-12 | [26014](https://github.com/airbytehq/airbyte/pull/26014) | Improve 500 handling for Events stream |
| 0.1.27 | 2023-04-06 | [24962](https://github.com/airbytehq/airbyte/pull/24962) | `UserList` stream when meet `500 - Generic Error` will skip a broken slice and keep going with the next one |
| 0.1.26 | 2023-03-10 | [23938](https://github.com/airbytehq/airbyte/pull/23938) | Improve retry for `500 - Generic Error` |
| 0.1.25 | 2023-03-07 | [23821](https://github.com/airbytehq/airbyte/pull/23821) | Added retry for `500 - Generic Error`, increased max attempts number to `6` to handle `ChunkedEncodingError` |
| 0.1.24 | 2023-02-14 | [22979](https://github.com/airbytehq/airbyte/pull/22979) | Specified date formatting in specification |
| 0.1.23 | 2023-01-27 | [22011](https://github.com/airbytehq/airbyte/pull/22011) | Set `AvailabilityStrategy` for streams explicitly to `None` |
| 0.1.22 | 2022-11-30 | [19913](https://github.com/airbytehq/airbyte/pull/19913) | Replace pendulum.parse -> dateutil.parser.parse to avoid memory leak |
| 0.1.21 | 2022-10-27 | [18537](https://github.com/airbytehq/airbyte/pull/18537) | Improve streams discovery |
| 0.1.20 | 2022-10-21 | [18292](https://github.com/airbytehq/airbyte/pull/18292) | Better processing of 401 and 429 errors |
| 0.1.19 | 2022-10-05 | [17602](https://github.com/airbytehq/airbyte/pull/17602) | Add check for stream permissions |
| 0.1.18 | 2022-10-04 | [17573](https://github.com/airbytehq/airbyte/pull/17573) | Limit time range for SATs |
| 0.1.17 | 2022-09-02 | [16067](https://github.com/airbytehq/airbyte/pull/16067) | added new events streams |
| 0.1.16 | 2022-08-15 | [15670](https://github.com/airbytehq/airbyte/pull/15670) | Api key is passed via header |
| 0.1.15 | 2021-12-06 | [8524](https://github.com/airbytehq/airbyte/pull/8524) | Update connector fields title/description |
| 0.1.14 | 2021-12-01 | [8380](https://github.com/airbytehq/airbyte/pull/8380) | Update `Events` stream to use `export/userEvents` endpoint |
| 0.1.13 | 2021-11-22 | [8091](https://github.com/airbytehq/airbyte/pull/8091) | Adjust slice ranges for email streams |
| 0.1.12 | 2021-11-09 | [7780](https://github.com/airbytehq/airbyte/pull/7780) | Split EmailSend stream into slices to fix premature connection close error |
| 0.1.11 | 2021-11-03 | [7619](https://github.com/airbytehq/airbyte/pull/7619) | Bugfix type error while incrementally loading the `Templates` stream |
| 0.1.10 | 2021-11-03 | [7591](https://github.com/airbytehq/airbyte/pull/7591) | Optimize export streams memory consumption for large requests |
| 0.1.9 | 2021-10-06 | [5915](https://github.com/airbytehq/airbyte/pull/5915) | Enable campaign_metrics stream |
| 0.1.8 | 2021-09-20 | [5915](https://github.com/airbytehq/airbyte/pull/5915) | Add new streams: campaign_metrics, events |
| 0.1.7 | 2021-09-20 | [6242](https://github.com/airbytehq/airbyte/pull/6242) | Updated schema for: campaigns, lists, templates, metadata |

</details>
