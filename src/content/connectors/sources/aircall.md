---
generated_record: true
connector_name: Aircall
connector_type: source
connector_slug: aircall
connector_directory: source-aircall
definition_id: 912eb6b7-a893-4a5b-b1c0-36ebbe2de8cd
version: 1.1.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/aircall
logo: /images/connectors/sources/aircall.svg
logo_source_path: airbyte-integrations/connectors/source-aircall/icon.svg
logo_sha256: 0b51e339be135bef95c3ce9632b8b2341c7b051cdbd44e68f4af708ec11536fe
original_metadata_path: airbyte-integrations/connectors/source-aircall/metadata.yaml
original_metadata_sha256: 6856db3659cc78972cd78c490d4363bd1b5e85adecf671775ac0d70d2fa33de9
original_document_path: docs/integrations/sources/aircall.md
original_document_sha256: d5213487ccde71d26ab686a69e25fb6df5360d457c550a3c1f6362852463faa1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 92df8f8a680371890b431ec2c07f75080d5782beed54873c46994d124a3e2285
rewritten_at: 2026-11-12T14:05:32.816239+00:00
---

# Aircall

Use this page to set up the [Aircall](https://aircall.io/) source connector and check its reference information. The connector reads calls, contacts, users, numbers, teams, conversations, campaigns and other company data from the [Aircall Public API](https://developers.aircall.io/api-references/).

## Prerequisites

- An Aircall account with the **Admin** role. Only Admins can open the Aircall Dashboard and create API keys ([Users](https://developers.aircall.io/api-references/#user-v2-overview)).
- An Aircall API key, comprising an **API ID** and an **API token**. The connector authenticates each request with [Basic authentication](https://developers.aircall.io/api-references/#basic-auth-aircall-customers). It uses the API ID as the username and the API token as the password.

## Setup guide

### Step 1: Set up Aircall

Create an Aircall API key:

1. Log in to the [Aircall Dashboard](https://dashboard.aircall.io/) as an Admin.
2. Go to **Integrations & API** > [**API Keys**](https://dashboard.aircall.io/integrations/api-keys). Aircall's reference calls this the **API Keys** section of your company's settings.
3. Click **Add a new API key**.
4. Copy the **API ID** and the **API token**. Aircall doesn't store the token in plain text, so it can't show it again. Keep it somewhere safe. If you lose it, create a new key ([Basic authentication](https://developers.aircall.io/api-references/#basic-auth-aircall-customers)).

### Step 2: Set up the Aircall connector in Airbyte

<!-- env:cloud -->

#### Airbyte Cloud

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**, then click **New source**.
3. Select **Aircall** from the source list.
4. Enter a name for the source.
5. Enter your **API ID** and **API Token**.
6. Optionally, set **Window size (days)**, **Contacts window size (days)**, **Concurrent workers** and **Sync conversation intelligence (AI Assist)**. See [Configuration options](#configuration-options).
7. Click **Set up source**.

<!-- /env:cloud -->

<!-- env:oss -->

#### Airbyte Open Source

1. Open your Airbyte Open Source dashboard.
2. In the left navigation bar, click **Sources**, then click **New source**.
3. Select **Aircall** from the source list.
4. Enter a name for the source.
5. Enter your **API ID** and **API Token**.
6. Optionally, set **Window size (days)**, **Contacts window size (days)**, **Concurrent workers** and **Sync conversation intelligence (AI Assist)**. See [Configuration options](#configuration-options).
7. Click **Set up source**.

<!-- /env:oss -->

### Configuration options

| Field | Required | Description |
| :--- | :--- | :--- |
| **API ID** | Yes | The API ID of your Aircall API key. |
| **API Token** | Yes | The API token shown with the API ID when you created the key. |
| **Window size (days)** | No | Days of calls requested at a time, from 1 to 365. The default is 1. A window that holds more than 10,000 calls is split and partly read again, so a larger window only saves requests for companies with few calls. If a sync fails with `could not split its request window`, lower this setting. See [10,000-result limit](#10000-result-limit). |
| **Contacts window size (days)** | No | Days of newly created contacts requested at a time, from 1 to 365. The default is 30. Lower it if a sync fails with the 10,000-results error for contacts. |
| **Concurrent workers** | No | Number of parallel requests, from 1 to 4. The default is 2. All workers share one [rate limit](#rate-limit). |
| **Sync conversation intelligence (AI Assist)** | No | Adds the six [conversation intelligence](#conversation-intelligence) streams. Off by default. They need the AI Assist or AI Assist Pro package and cost one request per call for each selected stream on every sync. |

Connections created before version 0.5.0 also have a Start date. The connector no longer uses this date, and the form hides it.

## Supported sync modes

The Aircall source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/):

| Feature | Supported? |
| :--- | :--- |
| Full Refresh Sync | Yes |
| Incremental Sync | Yes |
| Replicate Incremental Deletes | No |
| SSL connection | Yes |
| Namespaces | No |

`calls`, `conversations`, `conversation_engagements` and the six conversation intelligence streams support incremental sync. Each incremental sync re-reads the previous three days. Use `Incremental | Append + Deduped` to keep one row per record.

- `calls` uses `started_at`. Calls in progress and edits made soon after a call reach the destination. Later edits to older calls only arrive with a [Refresh and Retain Records](https://docs.airbyte.com/platform/operator-guides/refreshes#refresh-and-retain-records) sync. This includes a tag added weeks later. Clearing `calls`, using Refresh and Remove Records, or using Overwrite permanently deletes calls older than six months. See [Six months of call history](#six-months-of-call-history).
- `conversations` uses the time of the last call or message. Closing, reopening or assigning a conversation without new activity doesn't change that time. Those changes arrive with the next activity or a full refresh.
- `conversation_engagements` reads engagements from the conversations returned by `conversations`. Incremental syncs only read conversations active since three days before the previous sync.
- The [conversation intelligence](#conversation-intelligence) streams read results from the calls returned by `calls`. Incremental syncs only read calls started since three days before the previous sync. Their cursor is `call_started_at`, the call's `started_at`.

Every other stream supports full refresh only. Aircall filters some lists, including contacts, numbers and users, by creation date. It doesn't filter them by update date, so incremental sync would miss edits to existing records ([List all Contacts](https://developers.aircall.io/api-references/#list-all-contacts), [List all Numbers](https://developers.aircall.io/api-references/#list-all-numbers)).

## Supported streams

| Stream | Sync modes | Primary key | Plan or add-on |
| :--- | :--- | :--- | :--- |
| [`call_action_items`](https://developers.aircall.io/api-references/#retrieve-action-items) | Full refresh, incremental | `call_id`, `id` | AI Assist or AI Assist Pro, opt-in |
| [`call_playbook_results`](https://developers.aircall.io/api-references/#retrieve-a-playbook-result) | Full refresh, incremental | `id` | AI Assist Pro, opt-in |
| [`call_sentiments`](https://developers.aircall.io/api-references/#retrieve-sentiments) | Full refresh, incremental | `id` | AI Assist or AI Assist Pro, opt-in |
| [`call_summaries`](https://developers.aircall.io/api-references/#retrieve-a-summary) | Full refresh, incremental | `id` | AI Assist or AI Assist Pro, opt-in |
| [`call_topics`](https://developers.aircall.io/api-references/#retrieve-topics) | Full refresh, incremental | `id` | AI Assist or AI Assist Pro, opt-in |
| [`call_transcriptions`](https://developers.aircall.io/api-references/#retrieve-a-transcription) | Full refresh, incremental | `id` | AI Assist or AI Assist Pro, opt-in |
| [`calls`](https://developers.aircall.io/api-references/#list-all-calls) | Full refresh, incremental | `id` | All plans |
| [`campaign_outcomes`](https://developers.aircall.io/api-references/#list-all-campaign-outcomes) | Full refresh | `id` | Outbound Campaigns |
| [`campaigns`](https://developers.aircall.io/api-references/#list-all-campaigns) | Full refresh | `id` | Outbound Campaigns |
| [`company`](https://developers.aircall.io/api-references/#retrieve-company-information) | Full refresh | None | All plans |
| [`contacts`](https://developers.aircall.io/api-references/#list-all-contacts) | Full refresh | `id` | All plans |
| [`conversation_engagements`](https://developers.aircall.io/api-references/#list-the-engagements-of-a-conversation) | Full refresh, incremental | `id` | Conversations API |
| [`conversations`](https://developers.aircall.io/api-references/#list-all-conversations) | Full refresh, incremental | `id` | Conversations API |
| [`numbers`](https://developers.aircall.io/api-references/#list-all-numbers) | Full refresh | `id` | All plans |
| [`sms_templates`](https://developers.aircall.io/api-references/#list-sms-templates) | Full refresh | `id` | All plans |
| [`tags`](https://developers.aircall.io/api-references/#list-all-tags) | Full refresh | `id` | All plans |
| [`teams`](https://developers.aircall.io/api-references/#list-all-teams) | Full refresh | `id` | All plans |
| [`trackers`](https://developers.aircall.io/api-references/#list-all-trackers) | Full refresh | `id` | AI Assist or AI Assist Pro |
| [`user_availability`](https://developers.aircall.io/api-references/#retrieve-list-of-users-availability) | Full refresh | `id` | All plans |
| [`user_numbers`](https://developers.aircall.io/api-references/#list-all-numbers-for-a-user-v2) | Full refresh | `user_id`, `id` | All plans |
| [`users`](https://developers.aircall.io/api-references/#list-all-users-v2) | Full refresh | `id` | All plans |
| [`webhooks`](https://developers.aircall.io/api-references/#list-all-webhooks) | Full refresh | `webhook_id` | All plans |
| [`whatsapp_templates`](https://developers.aircall.io/api-references/#list-whatsapp-templates) | Full refresh | `number_id`, `id` | Numbers registered for WhatsApp |

Notes:

- `calls` includes `ivr_options_selected`, the IVR options selected by the caller ([List all Calls](https://developers.aircall.io/api-references/#list-all-calls)). Aircall returns it only for calls from the last two months. Calls synced before version 1.1.0 receive it only through a [Refresh and Retain Records](https://docs.airbyte.com/platform/operator-guides/refreshes#refresh-and-retain-records) sync. This also applies only to calls from the last two months. A refresh immediately after upgrading loses nothing because earlier versions never synced the field. A later refresh re-reads calls from two to six months ago without it. In `Incremental | Append + Deduped`, this empties values synced while those calls were recent.
- `company` has no primary key. Aircall returns one company object without an identifier ([Retrieve Company information](https://developers.aircall.io/api-references/#retrieve-company-information)).
- `contacts` returns only shared contacts ([List all Contacts](https://developers.aircall.io/api-references/#list-all-contacts)).
- `users` reads the [User V2 API](https://developers.aircall.io/api-references/#user-v2-overview).
- `user_numbers` returns the numbers assigned to each user, with `user_id` identifying the user. It makes at least one request for each user.
- `webhooks` uses `webhook_id`, the UUID that identifies a webhook. Aircall treats the integer `id` as the old identifier ([List all Webhooks](https://developers.aircall.io/api-references/#list-all-webhooks)).
- `conversation_engagements` returns each conversation's calls, messages, WhatsApp messages, assignments, unassignments, closes and reopens. The first sync and every full refresh make at least one request for each conversation. Each incremental sync re-reads engagements for every conversation active since three days before the previous sync. Syncing more often than daily therefore repeats most of that work.
- `whatsapp_templates` returns each number's templates, with `number_id` identifying the number.

## Limitations and troubleshooting

### 10,000-result limit

Aircall returns up to 10,000 calls, contacts, conversations or engagements for one query, including paginated queries ([Pagination](https://developers.aircall.io/api-references/#pagination), [List all Conversations](https://developers.aircall.io/api-references/#list-all-conversations)). The connector handles this limit for each stream:

- By default, `calls` are requested one day at a time (**Window size (days)**). The connector splits windows containing over 10,000 calls into smaller time ranges and reads them again. Some calls are therefore sent more than once, while `Incremental | Append + Deduped` keeps one row per call.
- `contacts` are requested in 30-day creation-date periods (**Contacts window size (days)**). If a sync fails with `Aircall returns at most 10,000 contacts per request window`, lower that setting. The connector can't read a single day containing over 10,000 new contacts.
- `conversations` continue from the last record's time after every 10,000 records.
- `conversation_engagements` returns up to the newest 10,000 engagements in a conversation. Older engagements aren't synced.

### Conversation intelligence

The `call_transcriptions`, `call_sentiments`, `call_topics`, `call_summaries`, `call_action_items` and `call_playbook_results` streams exist only when **Sync conversation intelligence (AI Assist)** is on. They require the AI Assist or AI Assist Pro package. Playbook results require AI Assist Pro ([Conversation Intelligence](https://developers.aircall.io/api-references/#conversation-intelligence-overview)). Without the package, a sync selecting these streams fails with `Conversation intelligence needs the AI Assist or AI Assist Pro package`. For `call_playbook_results`, it fails with `Playbook results need the AI Assist Pro package`. Add the package or deselect streams excluded from your plan. If you turn off the option, refresh the source schema or deselect all six streams. A sync that still selects them reports them as incomplete.

Each selected stream reads the calls included in the sync. It reuses call responses already fetched during that sync when the request matches. It then makes one request for each call. The first sync and every full refresh request all six months of calls kept by Aircall. Each incremental sync requests calls started since three days before the previous sync. Daily syncs therefore request about four days of calls each time. All selected streams share the connector's [rate limit](#rate-limit) of 100 requests per minute, so their durations add together. Each stream takes about one hour for every 6,000 calls. For a company with 1,000 daily calls, each stream adds about 40 minutes to each daily sync. It also adds about 30 hours to the first sync. All six streams take about four hours per sync. Their first sync takes about 180 hours, or seven and a half days. In incremental modes, an interrupted first sync resumes from its last checkpoint during the next sync. Interruptions include failures and the platform's sync time limit. The resumed sync re-reads the three preceding days of calls. In full refresh modes, the next sync restarts with all six months of calls. Select only the streams you need. For the first incremental sync, select one or two, then add the others to later syncs. Calls without a result, including missed calls, are skipped with a log message.

Results changed after a call only reach incremental sync while that call remains within the three-day lookback. This includes edited action items. Later changes arrive only through a [Refresh and Retain Records](https://docs.airbyte.com/platform/operator-guides/refreshes#refresh-and-retain-records) sync, as they do for `calls`.

### Six months of call history

Aircall keeps only six months of call history in the API ([List all Calls](https://developers.aircall.io/api-references/#list-all-calls)). The connector reads `calls` from 365 days ago during every full refresh and the first incremental sync. This covers all history kept by Aircall. Older calls aren't returned. Syncing `calls` in Overwrite mode, clearing it, or running Refresh and Remove Records permanently deletes older calls from the destination. Keep `calls` in `Incremental | Append + Deduped`, then use [Refresh and Retain Records](https://docs.airbyte.com/platform/operator-guides/refreshes#refresh-and-retain-records) to re-read the last six months. In `Incremental | Append + Deduped`, that refresh empties `ivr_options_selected` for calls from two to six months ago. Aircall only returns it for calls from the last two months. Copy the `calls` table before clearing it or changing its sync mode.

### Rate limit

Aircall allows 120 requests per minute for each company ([Rate limiting](https://developers.aircall.io/api-references/#rate-limiting)). Every API key and integration on your Aircall account shares this limit. Each sync uses up to 100 requests per minute. When Aircall rejects a request for exceeding the limit, the connector waits for Aircall to reset the counter. Raising **Concurrent workers** doesn't increase this limit. Aircall Support can increase the limit for your API keys. A higher limit reduces waits when your syncs and other integrations exceed the limit together. However, one sync still sends no more than 100 requests per minute.

### Streams that sync no records

Some streams require an Aircall add-on or a specific number setup. Without it, Aircall refuses the requests. The connector logs each refused request instead of failing the sync:

| Stream | Requirement |
| :--- | :--- |
| `conversations`, `conversation_engagements` | The Conversations API must be enabled for your company ([List all Conversations](https://developers.aircall.io/api-references/#list-all-conversations)). Without it, each sync still spends one request per 30 days since January 2014 on each of the two streams, about 157 each, so deselect both streams. |
| `trackers` | The AI Assist or AI Assist Pro package ([List all Trackers](https://developers.aircall.io/api-references/#list-all-trackers)). |
| `whatsapp_templates` | Only numbers registered for WhatsApp return templates ([List WhatsApp Templates](https://developers.aircall.io/api-references/#list-whatsapp-templates)). |

A sync failing with `Aircall rejected the API ID and API token` or `Aircall returned HTTP 403` indicates an incorrect or deleted API key. It can also mean your Aircall plan excludes that data. Create a new API key and update the source, or check your plan. For conversation intelligence streams, see [Conversation intelligence](#conversation-intelligence).

### Upgrade to 1.0.0

Version 1.0.0 adds primary keys to `calls` and `contacts`. It changes the `webhooks` primary key to `webhook_id`. It also makes `numbers` and `teams` full refresh only and changes several column types. Some destinations require a step before upgrading or running the first 1.0.0 sync. This applies to ClickHouse for `Full Refresh | Append` `users` ([Before you upgrade](aircall-migrations.md#before-you-upgrade)) and Snowflake for append-mode `calls` ([If you keep an append-mode calls table](aircall-migrations.md#if-you-keep-an-append-mode-calls-table)). After upgrading, refresh the source schema. Switch `numbers` and `teams` from an Incremental mode to `Full Refresh | Overwrite`. Clearing `calls` or switching it to Overwrite mode permanently deletes calls older than six months. Follow the [migration guide](aircall-migrations.md#upgrading-to-100).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :--- | :--- | :--- | :--- |
| 1.1.0 | 2026-11-11 | [92012](https://github.com/airbytehq/airbyte/pull/92012) | Add user_numbers, IVR options on calls and opt-in conversation intelligence streams |
| 1.0.0 | 2026-11-11 | [90838](https://github.com/airbytehq/airbyte/pull/90838) | Add primary keys to `calls` and `contacts`, key `webhooks` on `webhook_id`, make `numbers` and `teams` full refresh only, and declare the column types the Aircall API documents |
| 0.6.1 | 2026-11-10 | [91341](https://github.com/airbytehq/airbyte/pull/91341) | Update dependencies |
| 0.6.0 | 2026-11-09 | [90837](https://github.com/airbytehq/airbyte/pull/90837) | Add `conversations`, `conversation_engagements`, `campaigns`, `campaign_outcomes`, `trackers`, `sms_templates` and `whatsapp_templates` streams |
| 0.5.0 | 2026-11-09 | [90835](https://github.com/airbytehq/airbyte/pull/90835) | Read calls incrementally in daily windows that split at Aircall's 10,000-result limit, read contacts in date windows, honour Aircall's rate limit, declare `user_availability` `id` and `availability`, and read numbers and teams once per sync |
| 0.4.27 | 2026-10-13 | [88524](https://github.com/airbytehq/airbyte/pull/88524) | Update dependencies |
| 0.4.26 | 2026-10-06 | [87742](https://github.com/airbytehq/airbyte/pull/87742) | Update dependencies |
| 0.4.25 | 2026-09-29 | [87057](https://github.com/airbytehq/airbyte/pull/87057) | Update dependencies |
| 0.4.24 | 2026-09-23 | [85909](https://github.com/airbytehq/airbyte/pull/85909) | Migrate the `users` stream to the Aircall User V2 API ahead of the V1 sunset and add pagination |
| 0.4.23 | 2026-09-22 | [86517](https://github.com/airbytehq/airbyte/pull/86517) | Update dependencies |
| 0.4.22 | 2026-09-15 | [85956](https://github.com/airbytehq/airbyte/pull/85956) | Update dependencies |
| 0.4.21 | 2026-09-08 | [85381](https://github.com/airbytehq/airbyte/pull/85381) | Update dependencies |
| 0.4.20 | 2026-08-18 | [84505](https://github.com/airbytehq/airbyte/pull/84505) | Update dependencies |
| 0.4.19 | 2026-08-11 | [83832](https://github.com/airbytehq/airbyte/pull/83832) | Update dependencies |
| 0.4.18 | 2026-08-04 | [83374](https://github.com/airbytehq/airbyte/pull/83374) | Update dependencies |
| 0.4.17 | 2026-07-28 | [82810](https://github.com/airbytehq/airbyte/pull/82810) | Update dependencies |
| 0.4.16 | 2026-07-21 | [82307](https://github.com/airbytehq/airbyte/pull/82307) | Update dependencies |
| 0.4.15 | 2026-07-14 | [81718](https://github.com/airbytehq/airbyte/pull/81718) | Update dependencies |
| 0.4.14 | 2026-06-30 | [80992](https://github.com/airbytehq/airbyte/pull/80992) | Update dependencies |
| 0.4.13 | 2026-06-23 | [80364](https://github.com/airbytehq/airbyte/pull/80364) | Update dependencies |
| 0.4.12 | 2026-06-16 | [79750](https://github.com/airbytehq/airbyte/pull/79750) | Update dependencies |
| 0.4.11 | 2026-06-09 | [79207](https://github.com/airbytehq/airbyte/pull/79207) | Update dependencies |
| 0.4.10 | 2026-06-02 | [78574](https://github.com/airbytehq/airbyte/pull/78574) | Update dependencies |
| 0.4.9 | 2026-04-28 | [77183](https://github.com/airbytehq/airbyte/pull/77183) | Update dependencies |
| 0.4.8 | 2026-04-21 | [76490](https://github.com/airbytehq/airbyte/pull/76490) | Update dependencies |
| 0.4.7 | 2026-03-17 | [74979](https://github.com/airbytehq/airbyte/pull/74979) | Update dependencies |
| 0.4.6 | 2026-02-10 | [73001](https://github.com/airbytehq/airbyte/pull/73001) | Update dependencies |
| 0.4.5 | 2026-01-27 | [72373](https://github.com/airbytehq/airbyte/pull/72373) | Update dependencies |
| 0.4.4 | 2026-01-14 | [71503](https://github.com/airbytehq/airbyte/pull/71503) | Update dependencies |
| 0.4.3 | 2025-12-02 | [70282](https://github.com/airbytehq/airbyte/pull/70282) | Update dependencies |
| 0.4.2 | 2025-10-29 | [65055](https://github.com/airbytehq/airbyte/pull/65055) | Update dependencies |
| 0.4.1 | 2025-09-12 | [66197](https://github.com/airbytehq/airbyte/pull/66197) | Update to CDK v7 |
| 0.4.0 | 2024-08-23 | [44597](https://github.com/airbytehq/airbyte/pull/44597) | Refactor connector to manifest-only format |
| 0.3.0 | 2024-08-19 | [44437](https://github.com/airbytehq/airbyte/pull/44437) | Fix pagination |
| 0.2.12 | 2024-08-17 | [43879](https://github.com/airbytehq/airbyte/pull/43879) | Update dependencies |
| 0.2.11 | 2024-08-10 | [43482](https://github.com/airbytehq/airbyte/pull/43482) | Update dependencies |
| 0.2.10 | 2024-08-03 | [43101](https://github.com/airbytehq/airbyte/pull/43101) | Update dependencies |
| 0.2.9 | 2024-07-27 | [42743](https://github.com/airbytehq/airbyte/pull/42743) | Update dependencies |
| 0.2.8 | 2024-07-20 | [42357](https://github.com/airbytehq/airbyte/pull/42357) | Update dependencies |
| 0.2.7 | 2024-07-13 | [41708](https://github.com/airbytehq/airbyte/pull/41708) | Update dependencies |
| 0.2.6 | 2024-07-10 | [41448](https://github.com/airbytehq/airbyte/pull/41448) | Update dependencies |
| 0.2.5 | 2024-07-09 | [41156](https://github.com/airbytehq/airbyte/pull/41156) | Update dependencies |
| 0.2.4 | 2024-07-06 | [40801](https://github.com/airbytehq/airbyte/pull/40801) | Update dependencies |
| 0.2.3 | 2024-06-25 | [40503](https://github.com/airbytehq/airbyte/pull/40503) | Update dependencies |
| 0.2.2 | 2024-06-21 | [39920](https://github.com/airbytehq/airbyte/pull/39920) | Update dependencies |
| 0.2.2 | 2024-06-20 | [39681](https://github.com/airbytehq/airbyte/pull/39681) | Update dependencies |
| 0.2.1 | 2024-06-06 | [38454](https://github.com/airbytehq/airbyte/pull/38454) | [autopull] base image + poetry + up_to_date |
| 0.2.0 | 2023-06-20 | [Correcting availablity typo](https://github.com/airbytehq/airbyte/pull/27433) | Correcting availablity typo |
| 0.1.0 | 2023-04-19 | [Init](https://github.com/airbytehq/airbyte/pull/) | Initial commit |

</details>
