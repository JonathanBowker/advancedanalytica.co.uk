---
generated_record: true
connector_name: Slack
connector_type: source
connector_slug: slack
connector_directory: source-slack
definition_id: c2281cee-86f9-4a86-bb48-d23286b4c7bd
version: 3.2.28
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/slack
logo: /images/connectors/sources/slack.svg
logo_source_path: airbyte-integrations/connectors/source-slack/icon.svg
logo_sha256: a3fa0277aae2ffeec419b985fe1e437336215bb2fc66ffe247d37543e9ee9d89
original_metadata_path: airbyte-integrations/connectors/source-slack/metadata.yaml
original_metadata_sha256: 55b2f6364df6a104e064215bce5f9a79974cce364d001ea5de506b452cf0c9c0
original_document_path: docs/integrations/sources/slack.md
original_document_sha256: c5206abbed11009ef5d50b8f5cdd8f76fcc01a43e3bfa070571c4e53a7764ef7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 26816e6b9ad07a773ed893bbe3547eba57bbfbf0c923630d0057c1bf768fc181
rewritten_at: 2026-11-12T13:56:58.500869+00:00
---

# Slack

<HideInUI>

Set up the [Slack](https://www.slack.com) source connector and find its reference information on this page.

</HideInUI>

## Prerequisites

Before you begin, make sure you have:

- Administrator access to an active Slack Workspace
- Slack App OAuth (preferred) or Bot Token

## Setup guide

### Step 1: Set up Slack

Follow these instructions to create a Slack app. Airbyte can only replicate messages from channels containing the app.

:::info
If you're using a Slack Bot Token, skip this section.
:::

:::warning
**OAuth-only rate limit note:** When authenticating through **OAuth**, the Slack source temporarily limits the **Channel Messages** and **Threads** streams after an HTTP 429 response. Each stream drops to one request per minute. The connector returns to full speed after five consecutive successful responses. Consider creating a separate connection for these streams, preventing throttling from slowing other streams. See the [Rate limiting](#rate-limiting) section for details.

This OAuth-specific throttle does **not** apply when you authenticate using a **Bot Token**.
:::

To create a Slack App, read this [tutorial](https://api.slack.com/tutorials/tracks/getting-a-token) or follow these instructions.

1. Go to your [Apps](https://api.slack.com/apps).
2. Click **Create New App**. Select **From Scratch**.
3. Name your app and select your Slack workspace. Click **Create App**.
4. In the navigation menu, select **OAuth & Permissions**.
5. Go to **Scopes**. In **Bot Token Scopes**, select these scopes:

```
 channels:history
 channels:join
 channels:read
 files:read
 groups:read
 links:read
 reactions:read
 remote_files:read
 team:read
 usergroups:read
 users:read
 users.profile:read
```

6. At the top of the "OAuth & Permissions" page, click **Install to Workspace**. This generates a Bot User OAuth Token. Copy it for later if you're using bot token authentication.
7. Go to your Slack instance. For each public channel, go to **Info**, **More**, and select **Add Apps**.
8. Search for your new app. If you're using Slack's desktop version, you may need to restart it before the new App appears. Add the App to every channel you want to sync data from.

:::note
You don't need a refresh token when authenticating to Slack with a bot token. Bot tokens never expire. Learn more about refresh tokens [here](https://api.slack.com/authentication/rotation).
:::

### Step 2: Set up the Slack connector

<!-- env:cloud -->

**For Airbyte Cloud:**

1. In the navigation bar, click **Sources**.
2. Click **New source**.
3. Find and click **Slack**.
4. Click **Authenticate your Slack account**. Log in and authorise Airbyte to access your Slack account.
<FieldAnchor field="join_channels">
5. Toggle `join_channels` to join all public channels. Otherwise, you can sync only channels containing the bot. If unset, manually add the bot to every channel you want to sync messages from. This feature requires the `channels:join` OAuth scope.
</FieldAnchor>
<FieldAnchor field="start_date">
6. **Start Date**: Data from before this date won't be extracted.
</FieldAnchor>
<FieldAnchor field="lookback_window">
7. **Threads Lookback window (Days)**. This is the number of past days you want to sync data from.
</FieldAnchor>
<FieldAnchor field="channel_filter">
8. (Optional) **Channel filter**: List the channel names without the leading `#` to limit which channels you sync. If you don't specify channels, Airbyte replicates data from all channels.
</FieldAnchor>
<FieldAnchor field="include_private_channels">
9. (Optional) **Include private channels**: Toggle on to sync data from private channels. You must manually add the bot to private channels, even when **Join all channels** is toggled on.
</FieldAnchor>
<FieldAnchor field="include_archived_channels">
10. (Optional) **Include archived channels**: Toggle on to include archived channels in the sync. By default, the Slack API response excludes archived channels, reducing API calls for downstream streams. Enable this option if you need to sync data from archived channels.
</FieldAnchor>
<FieldAnchor field="threads_ignore_no_replies">
11. (Optional) **Ignore messages with no replies in threads stream**: Toggle on to skip messages without replies (`reply_count=0`) in the Threads stream. This reduces unnecessary `conversations.replies` API calls and can significantly speed up syncs for workspaces with many messages. It's disabled by default, so the Threads stream contains records for every message.
</FieldAnchor>
12. Click **Set up source**. Add the App created in Step 1 to each channel containing data you want to sync.
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

1. In the navigation bar, click **Sources**.
2. Click **New source**.
3. Find and click **Slack**.
4. Click **Sign in via Slack (OAuth)**. Enter the Access Token, Client ID, and Client Secret. Alternatively, enter the Bot Token from Step 1.
5. Toggle `join_channels` to join all public channels. Otherwise, you can sync only channels containing the bot. If unset, manually add the bot to every channel you want to sync messages from. This feature requires the `channels:join` OAuth scope.
6. **Start Date**: Data from before this date won't be extracted.
7. **Threads Lookback window (Days)**. This is the number of past days you want to sync data from.
8. (Optional) **Channel filter**: List the channel names without the leading `#` to limit which channels you sync. If you don't specify channels, Airbyte replicates data from all channels.
9. (Optional) **Include private channels**: Toggle on to sync data from private channels. You must manually add the bot to private channels, even when **Join all channels** is toggled on.
10. (Optional) **Include archived channels**: Toggle on to include archived channels in the sync. By default, the Slack API response excludes archived channels, reducing API calls for downstream streams. Enable this option if you need to sync data from archived channels.
11. (Optional) **Ignore messages with no replies in threads stream**: Toggle on to skip messages without replies (`reply_count=0`) in the Threads stream. This reduces unnecessary `conversations.replies` API calls and can significantly speed up syncs for workspaces with many messages. It's disabled by default, so the Threads stream contains records for every message.
12. Click **Set up source**. Add the App created in Step 1 to each channel containing data you want to sync.
<!-- /env:oss -->

<HideInUI>

## Supported sync modes

The Slack source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |
| Namespaces        | No         |

## Supported streams

The Slack source connector uses the [Conversations API](https://api.slack.com/docs/conversations-api) for most streams.

- [Channels \(Conversations\)](https://api.slack.com/methods/conversations.list)
- [Channel Members \(Conversation Members\)](https://api.slack.com/methods/conversations.members)
- [Messages \(Conversation History\)](https://api.slack.com/methods/conversations.history): Replicates messages from non-archived public and private channels containing the Slack App.
- [Users](https://api.slack.com/methods/users.list)
- [Threads \(Conversation Replies\)](https://api.slack.com/methods/conversations.replies)

## Performance considerations

Slack [rate limits](https://api.slack.com/docs/rate-limits) restrict the connector. After an HTTP 429 response, the connector follows the Slack API's `Retry-After` header. It waits for the specified duration before retrying.

Sync only the channels you need. Specify the `channel_filter` in the Slack configuration settings.

For large syncs, including historical data, try increasing the number of concurrent threads. The default is 2. A higher value could trigger Slack rate limits, so monitor the logs for rate-limit errors.

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
Expand to see details about Slack connector limitations and troubleshooting.
</summary>

### Connector limitations

#### Rate limits

Slack has [rate limit restrictions](https://api.slack.com/docs/rate-limits).

###### Channel Messages and Threads rate limits

**OAuth authentication:** For apps authenticated through OAuth, the connector applies a stricter budget to:
- [`conversations.replies`](https://api.slack.com/methods/conversations.replies)
- [`conversations.history`](https://api.slack.com/methods/conversations.history)

After an HTTP 429 response on these streams, the connector temporarily drops to **one request per minute**. After **five consecutive successful responses**, it automatically returns to its normal request rate. Another 429 during recovery resets the counter.

This throttle can slow syncs containing other streams. Consider creating a **separate connection** for Channel Messages and Threads. This prevents impacts on Users, Channels, and Channel Members.

**Bot Token authentication:** This OAuth-specific throttle does **not** apply when using a Slack Bot Token. Only Slack's [general rate limits](https://api.slack.com/docs/rate-limits) apply. Both `conversations.history` and `conversations.replies` are [Tier 3](https://api.slack.com/docs/rate-limits) methods, allowing at least 50 requests per minute.

### Troubleshooting

- Find common Slack source connector issues on the Airbyte Forum [here](https://github.com/airbytehq/airbyte/discussions).

#### Threads stream performance

For faster Threads stream syncs, consider enabling the **Ignore messages with no replies in threads stream** (`threads_ignore_no_replies`) option. By default, the Threads stream calls the `conversations.replies` API for every message, including messages without replies. In many workspaces, most messages have no replies. These unnecessary API calls consume the rate-limit budget.

- **Set to `true`** to improve sync performance when you only need replies from messages with threaded conversations. Depending on your workspace, this can reduce API calls by up to 89%.
- **Keep as `false` (default)** when the Threads stream must include records for every message, including unthreaded messages. This retains the current behaviour, where every message appears in the Threads stream output.

</details>

</HideInUI>

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version    | Date       | Pull Request                                             | Subject                                                                                                                                                                |
|:-----------|:-----------|:---------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 3.2.28 | 2026-11-10 | [88808](https://github.com/airbytehq/airbyte/pull/88808) | Update dependencies |
| 3.2.27 | 2026-10-06 | [88029](https://github.com/airbytehq/airbyte/pull/88029) | Update dependencies |
| 3.2.26 | 2026-09-29 | [87330](https://github.com/airbytehq/airbyte/pull/87330) | Update dependencies |
| 3.2.25 | 2026-09-28 | [86496](https://github.com/airbytehq/airbyte/pull/86496) | Preserve thread parent checkpoints on restart and skip archived channels the bot cannot join |
| 3.2.24 | 2026-09-22 | [86814](https://github.com/airbytehq/airbyte/pull/86814) | Update dependencies |
| 3.2.23 | 2026-09-15 | [86208](https://github.com/airbytehq/airbyte/pull/86208) | Update dependencies |
| 3.2.22 | 2026-09-08 | [85654](https://github.com/airbytehq/airbyte/pull/85654) | Update dependencies |
| 3.2.21 | 2026-08-27 | [83796](https://github.com/airbytehq/airbyte/pull/83796) | Fix sync failure when the optional `channel_filter` config field is not set |
| 3.2.20 | 2026-08-18 | [84839](https://github.com/airbytehq/airbyte/pull/84839) | Accept fractional epoch cursor values for the `threads` stream |
| 3.2.19 | 2026-08-18 | [84762](https://github.com/airbytehq/airbyte/pull/84762) | Update dependencies |
| 3.2.18 | 2026-08-11 | [84106](https://github.com/airbytehq/airbyte/pull/84106) | Update dependencies |
| 3.2.17 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 3.2.16 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 3.2.14 — 3.2.15 is built on SDM 7.23.7, which breaks bundled custom components |
| 3.2.15 | 2026-07-28 | [83082](https://github.com/airbytehq/airbyte/pull/83082) | Update dependencies |
| 3.2.14 | 2026-07-21 | [82582](https://github.com/airbytehq/airbyte/pull/82582) | Update dependencies |
| 3.2.13 | 2026-07-14 | [82022](https://github.com/airbytehq/airbyte/pull/82022) | Update dependencies |
| 3.2.12 | 2026-06-30 | [81255](https://github.com/airbytehq/airbyte/pull/81255) | Update dependencies |
| 3.2.11 | 2026-06-23 | [80627](https://github.com/airbytehq/airbyte/pull/80627) | Update dependencies |
| 3.2.10 | 2026-06-16 | [80042](https://github.com/airbytehq/airbyte/pull/80042) | Update dependencies |
| 3.2.9 | 2026-06-09 | [79480](https://github.com/airbytehq/airbyte/pull/79480) | Update dependencies |
| 3.2.8 | 2026-06-02 | [78986](https://github.com/airbytehq/airbyte/pull/78986) | Update dependencies |
| 3.2.7 | 2026-04-30 | [77628](https://github.com/airbytehq/airbyte/pull/77628) | Improve threads_ignore_no_replies filter to also check thread_ts, reducing unnecessary conversations.replies API calls |
| 3.2.6 | 2026-04-30 | [77607](https://github.com/airbytehq/airbyte/pull/77607) | Improve error handling for Slack API ok=false responses: add catch-all for unrecognized errors and expand error code coverage |
| 3.2.5 | 2026-04-29 | [77601](https://github.com/airbytehq/airbyte/pull/77601) | Surface missing OAuth scope as config error instead of silently failing channel joins |
| 3.2.4 | 2026-04-28 | [77531](https://github.com/airbytehq/airbyte/pull/77531) | Use RATE_LIMITED action for rate-limit filters, add failure_type classification, and remove generic ok=false catch-all in favor of default HTTP status handling |
| 3.2.3 | 2026-04-28 | [77450](https://github.com/airbytehq/airbyte/pull/77450) | Update dependencies |
| 3.2.2 | 2026-04-27 | [76985](https://github.com/airbytehq/airbyte/pull/76985) | Allow OAuth API budget to recover after transient 429 rate limits instead of permanently throttling the sync |
| 3.2.1 | 2026-04-27 | [76981](https://github.com/airbytehq/airbyte/pull/76981) | Remove unused OAuth scopes (`im:history`, `mpim:history`, `im:read`, `mpim:read`) not exercised by any stream. New OAuth installs see a narrower consent screen; existing tokens are unaffected. |
| 3.2.0 | 2026-04-27 | [76982](https://github.com/airbytehq/airbyte/pull/76982) | Exclude archived channels by default; add `include_archived_channels` config option to opt in |
| 3.1.24 | 2026-04-27 | [76980](https://github.com/airbytehq/airbyte/pull/76980) | Reduce `channels` stream page size from 1000 to 999 to comply with Slack API spec |
| 3.1.23 | 2026-04-24 | [76984](https://github.com/airbytehq/airbyte/pull/76984) | Detect Slack API ok=false responses as errors to prevent silent data loss |
| 3.1.22 | 2026-04-24 | [76983](https://github.com/airbytehq/airbyte/pull/76983) | Honor Slack's `Retry-After` header on HTTP 429 responses for all streams |
| 3.1.21 | 2026-04-21 | [76477](https://github.com/airbytehq/airbyte/pull/76477) | Scope the non-member channel filter to only `channel_messages` and `threads` so `channel_members` and `channels` keep syncing every public channel |
| 3.1.20 | 2026-04-21 | [76760](https://github.com/airbytehq/airbyte/pull/76760) | Update dependencies |
| 3.1.19 | 2026-04-20 | [76297](https://github.com/airbytehq/airbyte/pull/76297) | Rename "API Token" to "Bot Token" in connector spec and docs |
| 3.1.18 | 2026-04-15 | [76324](https://github.com/airbytehq/airbyte/pull/76324) | Skip non-member channels when auto-join is disabled to prevent cursor pollution |
| 3.1.17 | 2026-04-13 | [76276](https://github.com/airbytehq/airbyte/pull/76276) | Rename "concurrent workers" to "concurrent threads" in connector spec |
| 3.1.16 | 2026-04-02 | [76052](https://github.com/airbytehq/airbyte/pull/76052) | Skip joining archived channels that are rejected by the Slack API |
| 3.1.15 | 2026-04-02 | [75905](https://github.com/airbytehq/airbyte/pull/75905) | Add configurable option to skip conversations.replies API calls for messages with no replies, reducing unnecessary API usage |
| 3.1.14 | 2026-03-27 | [75197](https://github.com/airbytehq/airbyte/pull/75197) | Add declarative OAuth with `oauth_connector_input_specification` and granular scopes |
| 3.1.13 | 2026-03-24 | [75329](https://github.com/airbytehq/airbyte/pull/75329) | Update dependencies |
| 3.1.12 | 2026-03-10 | [74598](https://github.com/airbytehq/airbyte/pull/74598) | Update dependencies |
| 3.1.11 | 2026-02-24 | [73948](https://github.com/airbytehq/airbyte/pull/73948) | Update dependencies |
| 3.1.10 | 2026-02-17 | [73564](https://github.com/airbytehq/airbyte/pull/73564) | Update dependencies |
| 3.1.9 | 2026-02-10 | [73208](https://github.com/airbytehq/airbyte/pull/73208) | Update dependencies |
| 3.1.8 | 2026-02-03 | [69495](https://github.com/airbytehq/airbyte/pull/69495) | Update dependencies |
| 3.1.7 | 2025-10-29 | [68772](https://github.com/airbytehq/airbyte/pull/68772) | Update dependencies |
| 3.1.6 | 2025-10-21 | [68282](https://github.com/airbytehq/airbyte/pull/68282) | Update dependencies |
| 3.1.5 | 2025-10-14 | [67767](https://github.com/airbytehq/airbyte/pull/67767) | Update dependencies |
| 3.1.4 | 2025-10-07 | [67449](https://github.com/airbytehq/airbyte/pull/67449) | Update dependencies |
| 3.1.3 | 2025-10-06 | [67084](https://github.com/airbytehq/airbyte/pull/67084) | Update dependencies |
| 3.1.2 | 2025-09-30 | [66566](https://github.com/airbytehq/airbyte/pull/66566) | Update to CDK v7 |
| 3.1.1 | 2025-09-24 | [66640](https://github.com/airbytehq/airbyte/pull/66640) | Update dependencies |
| 3.1.0 | 2025-09-18 | [66501](https://github.com/airbytehq/airbyte/pull/66501) | Promoting release candidate 3.1.0-rc.1 to a main version. |
| 3.1.0-rc.1 | 2025-09-10 | [64160](https://github.com/airbytehq/airbyte/pull/64160) | Migrate to manifest-only. |
| 3.0.0 | 2025-09-10 | [65937](https://github.com/airbytehq/airbyte/pull/65937) | Add migration guide for missing state issue |
| 2.2.0 | 2025-09-10 | [66155](https://github.com/airbytehq/airbyte/pull/66155) | Promoting release candidate 2.2.0-rc.7 to a main version. |
| 2.2.0-rc.7 | 2025-08-21 | [65132](https://github.com/airbytehq/airbyte/pull/65132) | Update API budget to depend on auth method (rate limits apply only with OAuth). |
| 2.2.0-rc.6 | 2025-08-14 | [64553](https://github.com/airbytehq/airbyte/pull/64553) | Add API budget for Threads and Channel Messages streams. |
| 2.2.0-rc.5 | 2025-08-06 | [64530](https://github.com/airbytehq/airbyte/pull/64530) | Set use_cache = true for Channels and Channel Messages streams. |
| 2.2.0-rc.4 | 2025-08-04 | [64486](https://github.com/airbytehq/airbyte/pull/64486) | Add backoff strategy for Channels stream. |
| 2.2.0-rc.3 | 2025-07-29 | [64107](https://github.com/airbytehq/airbyte/pull/64107) | Add custom partition router. |
| 2.2.0-rc.2 | 2025-07-23 | [63732](https://github.com/airbytehq/airbyte/pull/63732) | Enable progressive rollout. |
| 2.2.0-rc.1 | 2025-07-23 | [63278](https://github.com/airbytehq/airbyte/pull/63278) | Migrate Threads stream to manifest. |
| 2.1.0 | 2025-07-11 | [62930](https://github.com/airbytehq/airbyte/pull/62930) | Promoting release candidate 2.1.0-rc.1 to a main version. |
| 2.1.0-rc.1 | 2025-07-07 | [62110](https://github.com/airbytehq/airbyte/pull/62110) | Bump cdk v6 |
| 2.0.2 | 2025-07-05 | [62709](https://github.com/airbytehq/airbyte/pull/62709) | Update dependencies |
| 2.0.1 | 2025-06-28 | [51965](https://github.com/airbytehq/airbyte/pull/51965) | Update dependencies |
| 2.0.0 | 2025-06-25 | [62055](https://github.com/airbytehq/airbyte/pull/62055) | Add breaking change notification for migrating to the new Slack Marketplace application to retain higher rate limits. |
| 1.3.2 | 2025-01-11 | [43812](https://github.com/airbytehq/airbyte/pull/43812) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 1.3.1 | 2024-07-24 | [42485](https://github.com/airbytehq/airbyte/pull/42485) | Fix MRO error for `IncrementalMessageStream` |
| 1.3.0 | 2024-07-17 | [41994](https://github.com/airbytehq/airbyte/pull/41994) | Migrate to CDK v3.5.1 |
| 1.2.0 | 2024-07-16 | [41970](https://github.com/airbytehq/airbyte/pull/41970) | Migrate to CDK v2.4.0 |
| 1.1.13 | 2024-07-13 | [41863](https://github.com/airbytehq/airbyte/pull/41863) | Update dependencies |
| 1.1.12 | 2024-07-10 | [41485](https://github.com/airbytehq/airbyte/pull/41485) | Update dependencies |
| 1.1.11 | 2024-07-09 | [41231](https://github.com/airbytehq/airbyte/pull/41231) | Update dependencies |
| 1.1.10 | 2024-07-06 | [40839](https://github.com/airbytehq/airbyte/pull/40839) | Update dependencies |
| 1.1.9 | 2024-06-25 | [40347](https://github.com/airbytehq/airbyte/pull/40347) | Update dependencies |
| 1.1.8 | 2024-06-22 | [40166](https://github.com/airbytehq/airbyte/pull/40166) | Update dependencies |
| 1.1.7 | 2025-06-14 | [39343](https://github.com/airbytehq/airbyte/pull/39343) | Update state handling for `threads` Python stream |
| 1.1.6 | 2024-06-12 | [39416](https://github.com/airbytehq/airbyte/pull/39416) | Respect `include_private_channels` option in `threads` stream |
| 1.1.5 | 2024-06-10 | [39132](https://github.com/airbytehq/airbyte/pull/39132) | Convert string state to float for `threads` stream |
| 1.1.4 | 2024-06-06 | [39271](https://github.com/airbytehq/airbyte/pull/39271) | [autopull] Upgrade base image to v1.2.2 |
| 1.1.3 | 2024-06-05 | [39121](https://github.com/airbytehq/airbyte/pull/39121) | Change cursor format for `channel_messages` stream to `%s_as_float` |
| 1.1.2 | 2024-05-23 | [38619](https://github.com/airbytehq/airbyte/pull/38619) | Fix cursor granularity for the `channel_messages` stream |
| 1.1.1 | 2024-05-02 | [36661](https://github.com/airbytehq/airbyte/pull/36661) | Schema descriptions |
| 1.1.0 | 2024-04-18 | [37332](https://github.com/airbytehq/airbyte/pull/37332) | Add the capability to sync from private channels |
| 1.0.0 | 2024-04-02 | [35477](https://github.com/airbytehq/airbyte/pull/35477) | Migration to low-code CDK |
| 0.4.1 | 2024-03-27 | [36579](https://github.com/airbytehq/airbyte/pull/36579) | Upgrade airbyte-cdk version to emit record counts as floats |
| 0.4.0 | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0` |
| 0.3.9 | 2024-02-12 | [35157](https://github.com/airbytehq/airbyte/pull/35157) | Manage dependencies with Poetry |
| 0.3.8 | 2024-02-09 | [35131](https://github.com/airbytehq/airbyte/pull/35131) | Fixed the issue when `schema discovery` fails with `502` due to the platform timeout |
| 0.3.7 | 2024-01-10 | [1234](https://github.com/airbytehq/airbyte/pull/1234) | Prepare for airbyte-lib |
| 0.3.6 | 2023-11-21 | [32707](https://github.com/airbytehq/airbyte/pull/32707) | Threads: do not use client-side record filtering |
| 0.3.5 | 2023-10-19 | [31599](https://github.com/airbytehq/airbyte/pull/31599) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.3.4 | 2023-10-06 | [31134](https://github.com/airbytehq/airbyte/pull/31134) | Update CDK and remove non iterable return from records |
| 0.3.3 | 2023-09-28 | [30580](https://github.com/airbytehq/airbyte/pull/30580) | Add `bot_id` field to threads schema |
| 0.3.2 | 2023-09-20 | [30613](https://github.com/airbytehq/airbyte/pull/30613) | Set default value for channel_filters during discover |
| 0.3.1 | 2023-09-19 | [30570](https://github.com/airbytehq/airbyte/pull/30570) | Use default availability strategy |
| 0.3.0 | 2023-09-18 | [30521](https://github.com/airbytehq/airbyte/pull/30521) | Add unexpected fields to streams `channel_messages`, `channels`, `threads`, `users` |
| 0.2.0 | 2023-05-24 | [26497](https://github.com/airbytehq/airbyte/pull/26497) | Fixed `lookback window` value limitations |
| 0.1.26 | 2023-05-17 | [26186](https://github.com/airbytehq/airbyte/pull/26186) | Limited the `lookback window` range for input configuration |
| 0.1.25 | 2023-03-20 | [22889](https://github.com/airbytehq/airbyte/pull/22889) | Specified date formatting in specification |
| 0.1.24 | 2023-03-20 | [24126](https://github.com/airbytehq/airbyte/pull/24126) | Increase page size to 1000 |
| 0.1.23 | 2023-02-21 | [21907](https://github.com/airbytehq/airbyte/pull/21907) | Do not join channels that not gonna be synced |
| 0.1.22 | 2023-01-27 | [22022](https://github.com/airbytehq/airbyte/pull/22022) | Set `AvailabilityStrategy` for streams explicitly to `None` |
| 0.1.21 | 2023-01-12 | [21321](https://github.com/airbytehq/airbyte/pull/21321) | Retry Timeout error |
| 0.1.20 | 2022-12-21 | [20767](https://github.com/airbytehq/airbyte/pull/20767) | Update schema |
| 0.1.19 | 2022-12-01 | [19970](https://github.com/airbytehq/airbyte/pull/19970) | Remove OAuth2.0 broken `refresh_token` support |
| 0.1.18 | 2022-09-28 | [17315](https://github.com/airbytehq/airbyte/pull/17315) | Always install latest version of Airbyte CDK |
| 0.1.17 | 2022-08-28 | [16085](https://github.com/airbytehq/airbyte/pull/16085) | Increase unit test coverage |
| 0.1.16 | 2022-08-28 | [16050](https://github.com/airbytehq/airbyte/pull/16050) | Fix SATs |
| 0.1.15 | 2022-03-31 | [11613](https://github.com/airbytehq/airbyte/pull/11613) | Add 'channel_filter' config and improve performance |
| 0.1.14 | 2022-01-26 | [9575](https://github.com/airbytehq/airbyte/pull/9575) | Correct schema |
| 0.1.13 | 2021-11-08 | [7499](https://github.com/airbytehq/airbyte/pull/7499) | Remove base-python dependencies |
| 0.1.12 | 2021-10-07 | [6570](https://github.com/airbytehq/airbyte/pull/6570) | Implement OAuth support with OAuth authenticator |
| 0.1.11 | 2021-08-27 | [5830](https://github.com/airbytehq/airbyte/pull/5830) | Fix sync operations hang forever issue |
| 0.1.10 | 2021-08-27 | [5697](https://github.com/airbytehq/airbyte/pull/5697) | Fix max retries issue |
| 0.1.9 | 2021-07-20 | [4860](https://github.com/airbytehq/airbyte/pull/4860) | Fix reading threads issue |
| 0.1.8 | 2021-07-14 | [4683](https://github.com/airbytehq/airbyte/pull/4683) | Add float_ts primary key |
| 0.1.7 | 2021-06-25 | [3978](https://github.com/airbytehq/airbyte/pull/3978) | Release Slack CDK Connector |

</details>
