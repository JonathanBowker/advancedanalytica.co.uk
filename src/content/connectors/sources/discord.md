---
generated_record: true
connector_name: Discord
connector_type: source
connector_slug: discord
connector_directory: source-discord
definition_id: e4f70138-6f3f-4e3b-9f33-792d41ccf765
version: 0.1.21
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/discord
logo: /images/connectors/sources/discord.svg
logo_source_path: airbyte-integrations/connectors/source-discord/icon.svg
logo_sha256: d3a4fabf32aad4780482cfb1e48b497792352a9d581889130dd3fbd9b4229fec
original_metadata_path: airbyte-integrations/connectors/source-discord/metadata.yaml
original_metadata_sha256: 07ad0bfe89fad6ffa9afc81a1ffba15bfe216cb0bc7630d9f475f22103f69df2
original_document_path: docs/integrations/sources/discord.md
original_document_sha256: a90b24185138983d0bc27277e7f57457bd47261fe1d96445d4cac52bfa200bdd
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a2b627b1b7f6b174a094b3bef0e046d815de1773fdb9bbfbd4bec42e2fcc0d1c
rewritten_at: 2026-11-12T13:35:46.389858+00:00
---

# Discord

<HideInUI>

Set up the [Discord](https://discord.com) source connector and find its reference information on this page.

</HideInUI>

## Before you start

- A Discord account with access to the [Developer Portal](https://discord.com/developers/applications)
- A Discord bot token, created in Step 1 below
- The bot must be invited to every guild (server) you want to sync

## Set up the connector

### Step 1: Create an application and bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and give it a name.
3. Go to the **Bot** section in the left sidebar.
4. Click **Reset Token** to generate a bot token. Copy and store this token securely. You'll need it to configure the connector.

:::caution
Discord only shows the token once. If you lose it, you must reset it to generate another.
:::

### Step 2: Enable privileged intents

You must enable [privileged intents](https://discord.com/developers/docs/events/gateway#privileged-intents) for some streams:

1. In the Developer Portal's **Bot** section, scroll to **Privileged Gateway Intents**.
2. Enable **Message Content Intent** to sync full message content, embeds, attachments, and components. Without this intent, the `messages` stream returns empty `content`, `embeds`, `attachments`, and `components` fields for most messages.
3. Enable **Server Members Intent** to sync the `members` stream. Without this intent, the List Guild Members endpoint returns a 403 error.

:::note
If your bot belongs to 100 or more guilds, Discord requires your application to be [verified](https://support.discord.com/hc/en-us/articles/360040720412-Bot-Verification-and-Data-Allowlisting). Verified bots must request privileged intent approval through the Developer Portal before these intents take effect.
:::

### Step 3: Invite the bot

1. Go to the **OAuth2** section in the left sidebar.
2. Under **OAuth2 URL Generator**, select the `bot` scope.
3. Under **Bot Permissions**, select:
   - **View Channels**: required to read channels and messages
   - **Read Message History**: required to access historical messages and archived threads
   - **Manage Threads**: optional and only required for private archived thread messages. Channels without it are skipped.
4. Copy the generated URL and open it in your browser.
5. Select the guild where you want to add the bot, then click **Authorize**.

Repeat these steps for every guild you want to sync.

### Step 4: Set up Discord in Airbyte

<!-- env:cloud -->

**For Airbyte Cloud:**

1. Go to **Sources** and click **New source**.
2. Find and select **Discord**.
3. Enter a name for your source.
4. Paste the **Bot Token** you copied from the Developer Portal.
5. Click **Set up source**.

<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

1. Go to **Sources** and click **New source**.
2. Find and select **Discord**.
3. Enter a name for your source.
4. Paste the **Bot Token** you copied from the Developer Portal.
5. Click **Set up source**.

<!-- /env:oss -->

## Supported sync modes

You can use the following [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes) with the Discord source connector:

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | No         |
| Namespaces                | No         |

## Supported streams

The connector syncs data from these Discord API endpoints:

| Stream             | Description                                                                                   |
| :----------------- | :-------------------------------------------------------------------------------------------- |
| `guilds`           | Guilds (servers) the bot has joined. Parent stream for all other streams.                      |
| `channels`         | All channels in each guild, including text, voice, category, forum, and announcement channels. |
| `messages`         | Messages from text channels, announcement channels, active threads, and archived threads. Paginated newest-to-oldest. |
| `members`          | Guild member list with roles, join dates, and nicknames. Requires Server Members Intent.       |
| `roles`            | All roles in each guild with permissions and metadata.                                         |
| `threads`          | Active threads across all channels in each guild.                                              |
| `scheduled_events` | Scheduled events in each guild.                                                                |

## Rate limits

Discord applies global and per-route rate limits:

- **Global limit**: 50 requests per second
- **Per-route limits**: Limits vary by endpoint and are provided through `X-RateLimit-*` response headers

The connector reads the `Retry-After` header and waits before retrying, automatically handling rate limits.

## Limitations

- **Message channel coverage**: The `messages` stream reads text channels (type 0), announcement channels (type 5), and their active and archived threads. It doesn't directly fetch messages from forum, media, or voice channels. However, it includes active threads, including active forum posts. The active threads endpoint returns threads from every channel type.
- **Archived forum and media threads**: The connector only fetches archived threads from text and announcement channels. It doesn't include archived forum posts or archived media channel threads.
- **Message Content Intent**: Without the `MESSAGE_CONTENT` privileged intent enabled in the Developer Portal, the `messages` stream returns empty `content`, `embeds`, `attachments`, and `components` fields for most messages. Messages mentioning the bot or sent in DMs with the bot still include content.
- **Server Members Intent**: The `members` stream requires the `GUILD_MEMBERS` privileged intent. Without it, the List Guild Members endpoint returns a 403 error. The connector surfaces this error, so you know which intent to enable.
- **Messages pagination**: The `messages` stream runs a full refresh, moving from newest to oldest with the `before` cursor parameter. The initial sync may take a long time for channels with large message histories. Incremental sync isn't yet supported.
- **Thread messages**: Messages from active and archived threads are automatically included in the `messages` stream with regular channel messages. Private archived threads require the bot to have **Manage Threads** and **Read Message History** permissions. The connector skips channels where the bot lacks these permissions by ignoring the `403 Missing Access` response. This allows the rest of the `messages` stream to sync. Grant **Manage Threads** if you need private archived thread messages.
- **Channel permissions**: The connector skips channels the bot can't access. It ignores 403 errors for per-channel streams. Streams requiring guild-level permissions (`members`) fail with an actionable error when permissions are missing.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request | Subject                         |
| :------ | :--------- | :----------- | :------------------------------ |
| 0.1.21 | 2026-11-10 | [91462](https://github.com/airbytehq/airbyte/pull/91462) | Update dependencies |
| 0.1.20 | 2026-11-03 | [90519](https://github.com/airbytehq/airbyte/pull/90519) | Update dependencies |
| 0.1.19 | 2026-10-27 | [89841](https://github.com/airbytehq/airbyte/pull/89841) | Update dependencies |
| 0.1.18 | 2026-10-20 | [89174](https://github.com/airbytehq/airbyte/pull/89174) | Update dependencies |
| 0.1.17 | 2026-10-13 | [88566](https://github.com/airbytehq/airbyte/pull/88566) | Update dependencies |
| 0.1.16 | 2026-10-07 | [88179](https://github.com/airbytehq/airbyte/pull/88179) | Skip channels where the bot lacks `MANAGE_THREADS` for private archived threads instead of failing the whole `messages` stream |
| 0.1.15 | 2026-10-06 | [87822](https://github.com/airbytehq/airbyte/pull/87822) | Update dependencies |
| 0.1.14 | 2026-09-29 | [87112](https://github.com/airbytehq/airbyte/pull/87112) | Update dependencies |
| 0.1.13 | 2026-09-22 | [86591](https://github.com/airbytehq/airbyte/pull/86591) | Update dependencies |
| 0.1.12 | 2026-09-15 | [85991](https://github.com/airbytehq/airbyte/pull/85991) | Update dependencies |
| 0.1.11 | 2026-09-08 | [85423](https://github.com/airbytehq/airbyte/pull/85423) | Update dependencies |
| 0.1.10 | 2026-08-18 | [84518](https://github.com/airbytehq/airbyte/pull/84518) | Update dependencies |
| 0.1.9 | 2026-08-11 | [83874](https://github.com/airbytehq/airbyte/pull/83874) | Update dependencies |
| 0.1.8 | 2026-08-04 | [83417](https://github.com/airbytehq/airbyte/pull/83417) | Update dependencies |
| 0.1.7 | 2026-07-28 | [82872](https://github.com/airbytehq/airbyte/pull/82872) | Update dependencies |
| 0.1.6 | 2026-07-21 | [82364](https://github.com/airbytehq/airbyte/pull/82364) | Update dependencies |
| 0.1.5 | 2026-07-14 | [81769](https://github.com/airbytehq/airbyte/pull/81769) | Update dependencies |
| 0.1.4 | 2026-06-30 | [81015](https://github.com/airbytehq/airbyte/pull/81015) | Update dependencies |
| 0.1.3 | 2026-06-23 | [80400](https://github.com/airbytehq/airbyte/pull/80400) | Update dependencies |
| 0.1.2 | 2026-06-16 | [79820](https://github.com/airbytehq/airbyte/pull/79820) | Update dependencies |
| 0.1.1 | 2026-06-09 | [79241](https://github.com/airbytehq/airbyte/pull/79241) | Update dependencies |
| 0.1.0 | 2026-06-08 | [76376](https://github.com/airbytehq/airbyte/pull/76376) | Initial release of source-discord connector with 7 streams: guilds, channels, messages, members, roles, threads, and scheduled_events. |

</details>
