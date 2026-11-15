---
generated_record: true
connector_name: Customer.io
connector_type: source
connector_slug: customer-io
connector_directory: source-customer-io
definition_id: 34f697bc-b989-4eda-b06f-d0f39b88825b
version: 1.1.7
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/customer-io
logo: /images/connectors/sources/customer-io.svg
logo_source_path: airbyte-integrations/connectors/source-customer-io/icon.svg
logo_sha256: b46379cc3ab4be5711d52e6d4d1e6182e1ebd29bd5f50b90956811baacbd5d9c
original_metadata_path: airbyte-integrations/connectors/source-customer-io/metadata.yaml
original_metadata_sha256: 4f46024e5fb574e5cefd2f0fa571b7686e1d6f24ad81e5a9f840e4b5bbad0ee1
original_document_path: docs/integrations/sources/customer-io.md
original_document_sha256: 0d75b55dbb97862e38ae3d05a83b0c3ecdde365ec797143f3dcf0f2cb360cc25
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 82eb508f214b7db84dacb44d6ec003b8385901a4e3bc8aaa014a38818fd5fe90
rewritten_at: 2026-11-12T13:36:45.028760+00:00
---

# Customer.io

Use this page to set up and reference the Customer.io source connector.

The connector reads a Customer.io workspace through the [App API](https://docs.customer.io/integrations/api/app/). It reads automations and their actions, one-time sends and their variants, and API-triggered broadcasts and their actions. It also reads transactional message templates, sender identities, segments and their usage, subscription topics, object types, workspaces and reporting webhooks. Other data includes snippets, collections, message deliveries, the activity log, people, segment memberships and email suppression lists. Stream names follow the App API. Automations are `campaigns`, while one-time sends are `newsletters`. `messages` contains deliveries, with one record for each message sent to one person.

## Prerequisites

- A Customer.io account where you're an Account Admin or Member with the account-level **Manage API credentials** permission to create the key
- A private API key (`sk_`) or existing legacy App API key for the workspace you want to sync. Public API keys (`pk_`) and Track API keys don't work.
- Your Customer.io account's **Region**, either US or EU
- The IP addresses Airbyte connects from on your allowlist, if your account restricts API access by IP address

## Set up the connector

### 1. Set up Customer.io

The connector uses bearer authentication with a [private API key](https://docs.customer.io/accounts/settings/managing-credentials/#public-and-private-keys). Existing legacy App API keys still work, but Customer.io no longer allows you to create them. You can keep using an existing App API key for the workspace you want to sync. If you do, skip the key creation steps below.

1. Confirm that you can manage API credentials. You must be an Account Admin or Member with the account-level **Manage API credentials** permission ([Manage your API credentials](https://docs.customer.io/accounts/settings/managing-credentials/)).
2. In Customer.io, go to **Account Settings** > **API Credentials** and click **Create API key**.
3. Select the workspace you want to sync, then choose **Private API key**. Under **Used in**, leave the integration type empty if you'll only use the key for the App API. Name the key and click **Create private key** ([Create a key](https://docs.customer.io/accounts/settings/managing-credentials/#create-a-key)). Don't choose **Public API key** or **Track site ID + key**. Neither can read the App API data this connector syncs.
4. Copy the private key immediately and store it securely. Customer.io shows it only once. If you lose it, create a new key.
5. Find your account's region, either US or EU. Account Admins can find it under **Settings** > **Account Settings** > **Data and Privacy**. Other roles can't see it, so ask an Account Admin ([How do I know what region my data is in?](https://docs.customer.io/accounts/settings/data-centers/#how-do-i-know-what-region-my-data-is-in)). The wrong region causes the connection test to fail with a 401 error.
6. If your workspace restricts API access by IP address, allow the addresses Airbyte connects from. Use the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) for Airbyte Cloud or your deployment's public IP addresses for Self-Managed Airbyte. On the **API Credentials** page, under **IP address allowlist**, click **Add IP address**. Enter an address, select the workspace and click **Add IP address**, once for each address ([Restrict API access by IP address](https://docs.customer.io/accounts/settings/managing-credentials/#restrict-api-access-by-ip-address)). Customer.io denies addresses missing from the list, even when the key is valid.

### 2. Set up the connector in Airbyte

1. In the Airbyte UI, go to **Sources** and click **+ New source**.
2. Select **Customer.io** from the list.
3. Enter a name for the source.
4. Complete the fields below, then click **Set up source**. You'll find **Region**, **Start Date** and the other optional fields under **Optional fields**. Accounts in the EU region must set **Region**.

<FieldAnchor field="app_api_key">

**App API Key**: Enter the private API key (`sk_`) created in Step 1 for the workspace you want to sync. You can instead enter an existing [legacy App API key](https://docs.customer.io/accounts/settings/managing-credentials/#app-api-keys). The field remains named **App API Key**, but accepts either credential. Airbyte sends the credential as a bearer token. Public API keys (`pk_`) and Track API keys don't work.

</FieldAnchor>

<FieldAnchor field="region">

**Region** (optional, required for EU accounts): Select your Customer.io account's data centre region. Choose `US`, the default, or `EU`. Account Admins can find it under **Settings** > **Account Settings** > **Data and Privacy**. The connector calls `api.customer.io/v1` or `api-eu.customer.io/v1`. Customer.io doesn't redirect App API requests to the other region. A region that doesn't match your account causes a 401 error ([Specifying your region in the API](https://docs.customer.io/accounts/settings/data-centers/#specifying-your-region-in-the-api)).

</FieldAnchor>

<FieldAnchor field="start_date">

**Start Date** (optional): Enter a UTC date and time in the format `YYYY-MM-DDTHH:MM:SSZ`, such as `2023-01-01T00:00:00Z`. Supported streams only sync records created or last updated at or after this value. This applies to incremental sync and Full Refresh mode. Automations, actions, one-time sends, broadcasts, transactional message templates, segments and snippets use their last update. `messages` uses creation time, while `activities` uses event time. Full-refresh-only streams, including `newsletter_variants`, `people`, `segment_memberships` and `esp_suppressions`, sync every record. Leave this field blank to sync all records. See [Incremental sync and Start Date](#incremental-sync-and-start-date).

</FieldAnchor>

<FieldAnchor field="messages_lookback_days">

**Messages Lookback Window (Days)** (optional): Set how many days each incremental `messages` sync rereads before the last synced message. This brings later opens, clicks, conversions, bounces and unsubscribes into the destination. Customer.io can record conversions up to 90 days after a message is sent, opened or clicked ([conversions](https://docs.customer.io/messaging/send/automations/conversions/#how-it-works)). It records opens and clicks for up to 6 months ([delivery metrics](https://docs.customer.io/messaging/metrics/analytics/#delivery-metrics)). A longer window keeps these metrics more complete. However, each sync requests one page for every 1,000 messages sent during the window. Enter 1 to 180 days. The default is 30.

</FieldAnchor>

<FieldAnchor field="activities_lookback_days">

**Activities Lookback Window (Days)** (optional): Set how many days each incremental `activities` sync rereads before the last synced activity. Customer.io can record an activity with a time well before processing it. This can happen when it merges an anonymous person's events into a profile or receives a backdated event ([Filtering Logs](https://docs.customer.io/messaging/people/filtering-logs/)). An incremental sync skips activities arriving later than this window. Customer.io guarantees 30 days of activities, so a 30-day window covers them all. A longer window skips fewer late activities. However, each sync requests one page for every 100 activities in the window. Enter 1 to 30 days. The default is 7.

</FieldAnchor>

<FieldAnchor field="esp_suppression_domains">

**Sending Domains for ESP Suppressions** (optional): Enter your email sending domains in lowercase, such as `mail.example.com`. Customer.io lists them under **Settings** > **Workspace Settings** > **Email**. `esp_suppressions` reads each Customer.io email service provider (ESP) suppression list once for each domain. It records the domain on every row. Customer.io suppresses an address on the domain where it bounced or was reported as spam ([suppressions across domains](https://docs.customer.io/messaging/channels/email/deliverability/esp-suppression/#sync-suppressions-across-domains)). If you send from multiple domains, enter them all. Leave this field empty to read each list once without a domain filter. The `domain` column will then be empty. You don't need this field if you send through your own SMTP server.

</FieldAnchor>

<FieldAnchor field="num_workers">

**Number of Concurrent Workers** (optional): Set how many requests Airbyte sends to Customer.io simultaneously across all streams. Every request counts towards Customer.io's workspace limit of 10 requests per second (see [Performance considerations](#performance-considerations)). Increasing the value beyond about 5 rarely makes a sync faster. Enter 2 to 10. The default is 3.

</FieldAnchor>

When you click **Set up source**, Airbyte tests the connection by reading automations (`campaigns`). If the test returns a 401 or 403 error, see [Troubleshooting](#troubleshooting).

## Supported sync modes

The Customer.io source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes):

| Feature | Supported? |
| :--- | :--- |
| Full Refresh Sync | Yes |
| Incremental Sync | Yes |
| Namespaces | No |

Ten streams support incremental sync. The other eleven support full refresh only. No stream marks records deleted in Customer.io. See [Limitations & Troubleshooting](#limitations--troubleshooting).

## Supported streams

New connections select streams marked **Yes** under **Selected by default**. Select other streams when you need them.

| Stream | Customer.io resource | Primary key | Cursor | Sync modes | Selected by default |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `campaigns` | [Automations](https://docs.customer.io/integrations/api/app/tag/automations/listcampaigns/) | `id` | `updated` | Full Refresh, Incremental | Yes |
| `campaigns_actions` | [Automation actions](https://docs.customer.io/integrations/api/app/tag/automations/listcampaignactions/) | `id` | `updated`, per automation | Full Refresh, Incremental | Yes |
| `newsletters` | [One-time sends](https://docs.customer.io/integrations/api/app/tag/newsletters/listnewsletters/) | `id` | `updated` | Full Refresh, Incremental | Yes |
| `broadcasts` | [API-triggered broadcasts](https://docs.customer.io/integrations/api/app/tag/broadcasts/listbroadcasts/) | `id` | `updated` | Full Refresh, Incremental | Yes |
| `broadcast_actions` | [Broadcast actions](https://docs.customer.io/integrations/api/app/tag/broadcasts/broadcastactions/) | `broadcast_id`, `id` | `updated`, per broadcast | Full Refresh, Incremental | No |
| `newsletter_variants` | [One-time send variants](https://docs.customer.io/integrations/api/app/tag/newsletter-variants/listnewslettervariants/) | `newsletter_id`, `id` | None | Full Refresh | No |
| `transactional_messages` | [Transactional messages](https://docs.customer.io/integrations/api/app/tag/transactional/listtransactional/): templates, not deliveries | `id` | `updated_at` | Full Refresh, Incremental | Yes |
| `sender_identities` | [Sender identities](https://docs.customer.io/integrations/api/app/tag/sender-identities/listsenders/) | `id` | None | Full Refresh | No |
| `segments` | [Segments](https://docs.customer.io/integrations/api/app/tag/segments/listsegments/) | `id` | `updated_at` | Full Refresh, Incremental | Yes |
| `segment_usage` | [Segment dependencies](https://docs.customer.io/integrations/api/app/tag/segments/getsegmentdependencies/) | `segment_id` | None | Full Refresh | No |
| `subscription_topics` | [Subscription topics](https://docs.customer.io/integrations/api/app/tag/subscription-center/gettopics/) | `id` | None | Full Refresh | No |
| `object_types` | [Object types](https://docs.customer.io/integrations/api/app/tag/objects/getobjecttypes/) | `id` | None | Full Refresh | No |
| `workspaces` | [Workspaces](https://docs.customer.io/integrations/api/app/tag/workspaces/listworkspaces/) | `id` | None | Full Refresh | No |
| `reporting_webhooks` | [Reporting webhooks](https://docs.customer.io/integrations/api/app/tag/reporting-webhooks/listwebhooks/) | `id` | None | Full Refresh | No |
| `snippets` | [Snippets](https://docs.customer.io/integrations/api/app/tag/snippets/listsnippets/) | `name` | `updated_at` | Full Refresh, Incremental | No |
| `collections` | [Collections](https://docs.customer.io/integrations/api/app/tag/collections/getcollections/) | `id` | None | Full Refresh | No |
| `messages` | [Messages](https://docs.customer.io/integrations/api/app/tag/messages/listmessages/): deliveries | `id` | `created` | Full Refresh, Incremental | No (personal data) |
| `activities` | [Activities](https://docs.customer.io/integrations/api/app/tag/activities/listactivities/) | `id` | `timestamp` | Full Refresh, Incremental | No (personal data) |
| `people` | [Customers](https://docs.customer.io/integrations/api/app/tag/customers/getpeoplefilter/) with their [attributes and devices](https://docs.customer.io/integrations/api/app/tag/customers/getpeoplebyid/) | `cio_id` | None | Full Refresh | No (personal data) |
| `segment_memberships` | [Customers in a segment](https://docs.customer.io/integrations/api/app/tag/segments/getsegmentmembership/) | `segment_id`, `cio_id` | None | Full Refresh | No (personal data) |
| `esp_suppressions` | [ESP-suppressed emails](https://docs.customer.io/integrations/api/app/tag/esp-suppression/getsuppressionbytype/) | `suppression_type`, `domain`, `email` | None | Full Refresh | No (personal data) |

`reporting_webhooks` syncs each webhook's `endpoint` URL after removing any `username:password@` part. Tokens in the URL path or query string sync exactly as Customer.io returns them ([reporting webhooks FAQ](https://docs.customer.io/integrations/data-out/connections/webhooks/#frequently-asked-questions)). New connections don't select this stream. Select it only when the destination can store these tokens. Connections set to **Propagate all field and stream changes** add and sync it automatically after upgrading to 0.7.0. To stop syncing it, deselect the stream and clear its destination data.

`workspaces` lists every workspace in the account. It includes message counts for the current billing period and current totals for people and objects. Customer.io caches these values for up to two hours. The records have no update time. Use Full Refresh | Overwrite for the latest counts. Use Full Refresh | Append to keep one snapshot from each sync.

`collections` lists each collection's name, schema, row count and size, but not its contents. It supports full refresh only, so every sync contains the current counts.

`messages` contains one record for each delivery, meaning one message sent to one person. Each record includes when every metric was recorded, including delivered, opened, clicked and converted. Syncs read deliveries in 30-day creation-time windows, with one request for every 1,000 deliveries. Start Date applies to the creation time. Customer.io records opens and clicks for up to 6 months. It records conversions for up to 90 days. Each incremental sync rereads deliveries created during the last **Messages Lookback Window (Days)**. The default is 30 days, with a maximum of 180. Use Incremental | Append + Deduped. Increase the setting or occasionally run a full refresh for complete metrics. Reduce it to shorten syncs in high-volume workspaces. Records include the recipient's address and identifiers, subject line, and per-person open and click times.

`activities` is the workspace activity log, with one record for each event. Events include sent, opened and clicked messages, tracked events, page views, screen views and attribute changes. The log includes events for deleted people. Customer.io guarantees only the last 30 days. Sync at least every 30 days and use Incremental | Append + Deduped to retain older history. Expect several records for each sent message. The first sync reads every retained activity, with 100 records per request. Each incremental sync rereads activities from the last **Activities Lookback Window (Days)** before the newest synced activity. The default is 7 days, with a maximum of 30. Customer.io can record an activity with a time well before processing it. Activities arriving after the window are skipped. Set the window to 30 to cover Customer.io's guaranteed 30 days. Customer.io's list can place a page of 100 older activities before newer activities. If that page falls outside the window, the newer activities are also skipped. Records include email addresses, your person IDs, event and attribute values, and page URLs. They also include IP addresses and user agents for opens and clicks.

`people` contains one record for each person, keyed by `cio_id`. Customer.io assigns this ID to every person. Records include every profile attribute, identifier, subscription preference and device push token. Each sync reads every profile. It uses one request for every 1,000 people to find them, then one for every 100 to fetch them. Reading 1,000,000 people takes about 11,000 requests. At 10 requests per second, this takes at least 18 minutes. Start Date doesn't apply. Full Refresh | Overwrite mirrors the workspace. Append retains deleted people.

`segment_memberships` contains one record for each person in each segment. Records include the person's `cio_id`, ID and email address. The stream therefore contains the sum of all segment sizes, often several times the total number of people. Each request returns up to 30,000 members. Membership has no timestamps, so use Full Refresh | Overwrite. Append adds a complete copy during every sync. Segment members can be outdated while Customer.io calculates them when `state` is `build`. Archived segments aren't included.

`esp_suppressions` contains one record for each address on every Customer.io email suppression list. These lists cover bounces, blocks, spam reports and invalid emails. A reason can repeat the address. Each sync makes one request for every 1,000 addresses on each list. It makes at least 4 requests, or 4 for each configured domain. Lifted suppressions leave the list without a record, so use Full Refresh | Overwrite. Append adds a complete copy during every sync. Customer.io suppresses an address on the sending domain where it bounced or received a spam report. If you use several domains, enter them in **Sending Domains for ESP Suppressions**. Each list is then read once for each domain, and records include their `domain`. A mistyped or unknown domain returns no records instead of an error. Lists can include addresses suppressed by other workspaces using the same sending domain. Your email provider stores suppressions when you use your own SMTP server, so deselect this stream.

`messages`, `activities`, `people`, `segment_memberships` and `esp_suppressions` contain personal data and aren't selected by default. Connections set to **Propagate all field and stream changes** add and sync them automatically after upgrading to 0.8.0. To stop syncing them, deselect the streams and clear their destination data. Incremental and Append syncs retain rows for people later deleted or suppressed in Customer.io. You must therefore also handle erasure requests in the destination. If these streams return a 403 error, check that the key can read their data. Also confirm that the Airbyte IP addresses are on your allowlist, or deselect the streams.

## Incremental sync and Start Date

Only deliveries support server-side time filtering, so Customer.io filters `messages` on the server. Other incremental streams use client-side cursors. Each sync reads the full list, although `activities` can stop early as described below. It emits records at or after the saved cursor minus one hour. For `activities`, it instead subtracts **Activities Lookback Window (Days)**. Cursors use `updated`, `updated_at` or `timestamp` in Unix seconds. The lists aren't sorted by cursor. A record edited during a sync can therefore fall behind the saved cursor. The one-hour lookback captures it during the next sync. The lookback adds no requests because each sync already reads the full lists. However, `activities` rereads its lookback window, with one request for every 100 activities. Records updated within the lookback before the saved cursor repeat until a newer change advances the cursor. Use Incremental | Append + Deduped. Incremental | Append stores these records as repeated rows. Both modes make the same requests for these streams. Incremental | Append + Deduped writes fewer rows. Full Refresh | Overwrite also removes records deleted in Customer.io.

`campaigns_actions` and `broadcast_actions` keep one cursor for each automation or broadcast. They request actions from every automation or broadcast, including parents last updated before the Start Date. This happens because changing an action doesn't change its parent's update time. The actions remain filtered by the Start Date. Actions from a newly added automation or broadcast don't start from the Start Date. They start from the stream's newest saved update time, minus the previous sync's duration and one-hour lookback. Actions that retain an older update time arrive only after they change. This can affect a duplicated automation. Customer.io doesn't document whether copied actions retain their update time.

`messages` reads 30-day creation-time windows. Each incremental sync begins **Messages Lookback Window (Days)** before the newest synced `created`. This brings metrics recorded after sending into the destination. `activities` reads newest records first. It stops at the first page without activity inside the cursor window. Customer.io guarantees only the last 30 days of activity. See the notes for both streams under [Supported Streams](#supported-streams) for the trade-offs.

Start Date applies to streams supporting incremental sync, including in Full Refresh mode. These streams skip records created or last updated before that date. `messages` uses creation time, while `activities` uses event time. The eleven full-refresh streams ignore Start Date and sync every record. A future Start Date passes the connection check. Until that date, a sync only emits records changed while it runs. Leave Start Date blank to sync all records.

### Performance

Customer.io limits most App API endpoints to 10 requests per second for each workspace ([Rate Limits](https://docs.customer.io/integrations/api/app/#rate-limits)). Every App API call without a separate limit uses one shared bucket, including writes ([Design Studio API rate limits](https://docs.customer.io/integrations/api/design-studio/#rate-limits)). The connector shares this bucket with your other App API traffic. It limits itself to 10 requests per rolling second across all streams. It sends the number of simultaneous requests set by **Number of Concurrent Workers**, which defaults to 3. When other traffic fills the bucket, Customer.io returns 429 errors and the connector waits. See [Troubleshooting](#troubleshooting).

These streams have the highest request costs:

- `campaigns_actions`, `broadcast_actions`, `newsletter_variants` and `segment_usage`: one request for each automation, broadcast, one-time send or segment. Each additional actions page needs another request. Reading 1,000 one-time sends adds about 100 seconds of `newsletter_variants` requests.
- `messages`: one request for every 1,000 deliveries, plus one for each 30-day window. Reading 10 million deliveries takes about 10,000 requests during the first sync. Every incremental sync rereads the lookback window. With a blank Start Date, about 690 empty windows since 1970 add roughly 70 seconds to the first sync. They add the same time to every sync while the workspace has no deliveries.
- `activities`: one request for every 100 activities, with pages read sequentially. The first sync takes about 10,000 requests for every million activities. Incremental syncs read new activities, the lookback window and one additional page. With the default 7-day window, 100,000 daily activities take about 7,000 requests for each sync. This stream sends requests sequentially. Testing showed 0.3 to 0.6 seconds per request, giving a total of about 35 to 70 minutes.
- `people`: one request for every 1,000 people, plus one for every 100. Reading 1,000,000 people takes about 11,000 requests and at least 18 minutes.
- `segment_memberships`: one request for each segment and every 30,000 members. Reading 10 million memberships across 200 segments takes at most about 735 requests.
- `esp_suppressions`: one request for every 1,000 addresses on each of the four suppression lists. This means at least 4 requests, multiplied by the number of configured domains.

Keep streams you don't need unselected.

## Limitations and troubleshooting

### Connector limitations

The connector handles Customer.io HTTP errors as follows:

| HTTP status | Behavior |
| :--- | :--- |
| 401 | The sync fails with a configuration error: Customer.io rejected the key. See [Troubleshooting](#troubleshooting). |
| 403 | The sync fails with a configuration error: Customer.io denied the key access to the data. See [Troubleshooting](#troubleshooting). |
| 404 | On `campaigns_actions`, `broadcast_actions`, `newsletter_variants`, `segment_usage` and `segment_memberships`, the records of an automation, broadcast, one-time send or segment deleted during the sync are skipped. On other streams, the sync fails. |
| 429 | Retried up to 30 times after the wait in the `Retry-After` header; with `Retry-After: 1`, that rides out about a minute of rate limiting. Customer.io leaves the header out when a daily quota is reached; the connector then backs off exponentially and fails the sync after about 17 minutes. |
| 500, 502, 503, 504 | Retried with exponential backoff; the sync fails after about 17 minutes of errors. |

- **Deletions**: Customer.io omits deleted records from its lists, so no stream marks deletions. In Incremental and Append modes, deleted records retain their last version in the destination. Full Refresh | Overwrite mirrors the current state when Start Date is blank. With a Start Date, it retains only records last updated since that date. `snippets` use `name` as their key, and you can't rename a snippet. A snippet copied under a new name arrives as a new record. Deleting the old snippet retains its last version, like any other deleted record.
- **Archived segments**: Customer.io omits [archived segments](https://docs.customer.io/messaging/segmentation/segments/#archive-unarchive-a-segment) from its segment list. As a result, `segments`, `segment_usage` and `segment_memberships` skip them. A segment archived after an incremental sync retains its last destination row. You can archive a segment while archived automations or sent one-time sends still use it. That usage never reaches `segment_usage`.
- **Deprecated fields**: Customer.io's [List automations](https://docs.customer.io/integrations/api/app/tag/automations/listcampaigns/) reference marks `campaigns.type`, the trigger type, as "Sunsetting on March 30, 2025". It also marks `campaigns.msg_templates` as deprecated. These values may arrive as null or stop arriving. Don't build new reports using them.
- **Field types that differ from the API reference**: `campaigns_actions.id` is a string, as Customer.io sends it, although the reference documents an integer. `campaigns.actions[].id` is an integer, so cast one side when joining them. `broadcast_actions.id` is cast to the documented integer. The `campaigns` fields `audience.person_filters`, `audience.relationship_filters`, `object_attribute_triggers` and `relationship_attribute_triggers` have no declared type. The reference types them as objects, but its examples show JSON strings. `campaigns_actions.payload_android` also has no declared type because the reference doesn't document it. `campaigns.webhook_id` is cast to the documented integer when Customer.io sends a string of up to 18 digits. Other strings don't match the declared integer. Typed destinations therefore store null and record the change in `_airbyte_meta`. `messages` also contains `transactional_message_id` and `msg_template_id`, which the reference's response schema doesn't declare. Version 1.0.0 changed the declared types of `campaigns_actions.from_id` and `reply_to_id`. It also changed `newsletters.sent_at` and four ID and tag arrays. See the [migration guide](./customer-io-migrations.md).
- **Joins**: `object_types.id` is a string because Customer.io sends object type IDs as strings. `campaigns.object_type_id` is an integer, so cast one side when joining them.
- **Variants**: `broadcast_actions` contains one record for each message language variant. Every variant has the same `multi_language_branch_action_id`. `newsletter_variants` contains one record for each language or A/B test of a one-time send. Each record has its own `id`.
- **Hidden senders**: `sender_identities` includes hidden senders. Use `hidden` to identify them.
- **Empty streams**: `subscription_topics` remains empty until the workspace has subscription topics. A non-empty stream doesn't mean the subscription centre is enabled. `broadcasts` and `broadcast_actions` remain empty without API-triggered broadcasts. `activities` can be empty after 30 days without activity.
- **Deliveries without content**: a `messages` record with `forgotten: true` has content that Customer.io didn't retain. For example, this can be a transactional message sent with message retention disabled.
- **Log warning**: `campaigns_actions` logs "Parent state handling is not supported for CartesianProductStreamSlicer." during every sync. This message is harmless and requires no action.

### Troubleshooting

- **401 errors**: Customer.io rejected the key. Confirm it's a private API key (`sk_`) or legacy App API key. It mustn't be a public API key (`pk_`) or Track API key. Also confirm that you copied the complete key. Create a new private key if you lost the original. Check that **Region** matches your account (see [Step 1](#step-1-set-up-customerio)). If your workspace restricts API access by IP address, add Airbyte's connection addresses to the allowlist ([Step 1](#step-1-set-up-customerio)). Customer.io doesn't document which error a blocked address receives. Therefore, both the 401 and 403 messages mention this restriction. The connector's error message still refers to an App API key. Private keys work in the same field.
- **403 errors**: Customer.io denied the key access to the stream's data. Alternatively, Airbyte's connection addresses aren't on the allowlist. Use a key that can read the data, or deselect the stream.
- **429 errors or slow syncs**: your other App API traffic shares the limit of 10 requests per second. Schedule syncs when that traffic is low, sync less often or deselect expensive streams listed in [Performance considerations](#performance-considerations).
- **5xx errors**: Customer.io returned temporary errors. If the sync fails after its retries, check [Customer.io Status](https://status.customerio.com/) and sync again later.
- **Records missing from incremental streams**: incremental streams skip records last updated before Start Date. `activities` skips activities dated more than **Activities Lookback Window (Days)** before the newest synced activity. Actions from a new automation or broadcast start from the stream's newest saved update time. See [Incremental sync and Start Date](#incremental-sync-and-start-date). For `activities`, increase **Activities Lookback Window (Days)**. For other streams, move Start Date earlier or leave it blank, then clear the stream. Clearing also removes destination rows for records deleted in Customer.io. In Append modes, it also removes each record's earlier versions. Don't clear `activities`. Customer.io guarantees only the last 30 days, so clearing permanently removes older destination activity.
- **Repeated rows**: Incremental | Append repeats records updated during the hour before the saved cursor on every sync. `messages` and `activities` also repeat their lookback windows. Use Incremental | Append + Deduped.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                   | Subject                                     |
|:--------|:-----------| :------------------------------------------------------------- |:--------------------------------------------|
| 1.1.7 | 2026-11-10 | [91486](https://github.com/airbytehq/airbyte/pull/91486) | Update dependencies |
| 1.1.6 | 2026-11-03 | [90493](https://github.com/airbytehq/airbyte/pull/90493) | Update dependencies |
| 1.1.5 | 2026-11-02 | [90331](https://github.com/airbytehq/airbyte/pull/90331) | Consolidate substream error handling into a single error handler; no behavior change |
| 1.1.4 | 2026-10-27 | [89851](https://github.com/airbytehq/airbyte/pull/89851) | Update dependencies |
| 1.1.3 | 2026-10-20 | [89499](https://github.com/airbytehq/airbyte/pull/89499) | Mark the connector as certified |
| 1.1.2 | 2026-10-20 | [89495](https://github.com/airbytehq/airbyte/pull/89495) | Add the Customer.io OpenAPI spec to the documentation URLs |
| 1.1.1 | 2026-10-20 | [89163](https://github.com/airbytehq/airbyte/pull/89163) | Update dependencies |
| 1.1.0 | 2026-10-12 | [88473](https://github.com/airbytehq/airbyte/pull/88473) | Add worker and activity lookback options (7-day default) and declare fields seen in production |
| 1.0.0 | 2026-10-09 | [88159](https://github.com/airbytehq/airbyte/pull/88159) | Declare `from_id`, `reply_to_id` and `sent_at` as integers and the item types of four ID and tag arrays |
| 0.8.0 | 2026-10-08 | [88158](https://github.com/airbytehq/airbyte/pull/88158) | Add message, activity, people, segment membership and ESP suppression streams |
| 0.7.0 | 2026-10-08 | [88135](https://github.com/airbytehq/airbyte/pull/88135) | Add subscription topic, object type, workspace, reporting webhook, snippet and collection streams |
| 0.6.0 | 2026-10-07 | [88130](https://github.com/airbytehq/airbyte/pull/88130) | Add broadcast, newsletter variant, transactional message, sender identity and segment streams |
| 0.5.0 | 2026-10-07 | [88129](https://github.com/airbytehq/airbyte/pull/88129) | Add rate limiting, Retry-After retries, clearer authentication errors, a one-hour lookback, and missing fields |
| 0.4.17 | 2026-10-06 | [87812](https://github.com/airbytehq/airbyte/pull/87812) | Update dependencies |
| 0.4.16 | 2026-09-29 | [87129](https://github.com/airbytehq/airbyte/pull/87129) | Update dependencies |
| 0.4.15 | 2026-09-22 | [86584](https://github.com/airbytehq/airbyte/pull/86584) | Update dependencies |
| 0.4.14 | 2026-09-15 | [85996](https://github.com/airbytehq/airbyte/pull/85996) | Update dependencies |
| 0.4.13 | 2026-09-08 | [85433](https://github.com/airbytehq/airbyte/pull/85433) | Update dependencies |
| 0.4.12 | 2026-08-18 | [84549](https://github.com/airbytehq/airbyte/pull/84549) | Update dependencies |
| 0.4.11 | 2026-08-11 | [83899](https://github.com/airbytehq/airbyte/pull/83899) | Update dependencies |
| 0.4.10 | 2026-08-04 | [83394](https://github.com/airbytehq/airbyte/pull/83394) | Update dependencies |
| 0.4.9 | 2026-07-28 | [82865](https://github.com/airbytehq/airbyte/pull/82865) | Update dependencies |
| 0.4.8 | 2026-07-21 | [82368](https://github.com/airbytehq/airbyte/pull/82368) | Update dependencies |
| 0.4.7 | 2026-07-14 | [81795](https://github.com/airbytehq/airbyte/pull/81795) | Update dependencies |
| 0.4.6 | 2026-06-30 | [81036](https://github.com/airbytehq/airbyte/pull/81036) | Update dependencies |
| 0.4.5 | 2026-06-23 | [80394](https://github.com/airbytehq/airbyte/pull/80394) | Update dependencies |
| 0.4.4 | 2026-06-16 | [79829](https://github.com/airbytehq/airbyte/pull/79829) | Update dependencies |
| 0.4.3 | 2026-06-09 | [79257](https://github.com/airbytehq/airbyte/pull/79257) | Update dependencies |
| 0.4.2 | 2026-06-02 | [78639](https://github.com/airbytehq/airbyte/pull/78639) | Update dependencies |
| 0.4.1 | 2026-05-08 | [77895](https://github.com/airbytehq/airbyte/pull/77895) | Upgrade the base image to source-declarative-manifest 7.18.1 |
| 0.4.0 | 2026-05-08 | [77819](https://github.com/airbytehq/airbyte/pull/77819) | Add pagination, incremental sync, and EU region support |
| 0.3.19 | 2025-08-20 | [65113](https://github.com/airbytehq/airbyte/pull/65113) | Update logo |
| 0.3.18 | 2025-05-11 | [60049](https://github.com/airbytehq/airbyte/pull/60049) | Update dependencies |
| 0.3.17 | 2025-05-04 | [58875](https://github.com/airbytehq/airbyte/pull/58875) | Update dependencies |
| 0.3.16 | 2025-04-19 | [57766](https://github.com/airbytehq/airbyte/pull/57766) | Update dependencies |
| 0.3.15 | 2025-04-05 | [57225](https://github.com/airbytehq/airbyte/pull/57225) | Update dependencies |
| 0.3.14 | 2025-03-29 | [56546](https://github.com/airbytehq/airbyte/pull/56546) | Update dependencies |
| 0.3.13 | 2025-03-22 | [55918](https://github.com/airbytehq/airbyte/pull/55918) | Update dependencies |
| 0.3.12 | 2025-03-08 | [55311](https://github.com/airbytehq/airbyte/pull/55311) | Update dependencies |
| 0.3.11 | 2025-03-01 | [54942](https://github.com/airbytehq/airbyte/pull/54942) | Update dependencies |
| 0.3.10 | 2025-02-22 | [54374](https://github.com/airbytehq/airbyte/pull/54374) | Update dependencies |
| 0.3.9 | 2025-02-18 | [51670](https://github.com/airbytehq/airbyte/pull/51670) | Update dependencies |
| 0.3.8 | 2025-01-11 | [51062](https://github.com/airbytehq/airbyte/pull/51062) | Update dependencies |
| 0.3.7 | 2025-01-04 | [50582](https://github.com/airbytehq/airbyte/pull/50582) | Update dependencies |
| 0.3.6 | 2024-12-21 | [49999](https://github.com/airbytehq/airbyte/pull/49999) | Update dependencies |
| 0.3.5 | 2024-12-14 | [49490](https://github.com/airbytehq/airbyte/pull/49490) | Update dependencies |
| 0.3.4 | 2024-12-12 | [48923](https://github.com/airbytehq/airbyte/pull/48923) | Update dependencies |
| 0.3.3 | 2024-11-05 | [48225](https://github.com/airbytehq/airbyte/pull/48225) | Update dependencies |
| 0.3.2 | 2024-10-28 | [47464](https://github.com/airbytehq/airbyte/pull/47464) | Update dependencies |
| 0.3.1 | 2024-08-17 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.3.0 | 2024-08-16 | [44158](https://github.com/airbytehq/airbyte/pull/44158) | Refactor connector to manifest-only format |
| 0.2.15 | 2024-08-12 | [43889](https://github.com/airbytehq/airbyte/pull/43889) | Update dependencies |
| 0.2.14 | 2024-08-11 | [43513](https://github.com/airbytehq/airbyte/pull/43513) | Update dependencies |
| 0.2.13 | 2024-08-04 | [43185](https://github.com/airbytehq/airbyte/pull/43185) | Update dependencies |
| 0.2.12 | 2024-07-28 | [42631](https://github.com/airbytehq/airbyte/pull/42631) | Update dependencies |
| 0.2.11 | 2024-07-21 | [42219](https://github.com/airbytehq/airbyte/pull/42219) | Update dependencies |
| 0.2.10 | 2024-07-14 | [41808](https://github.com/airbytehq/airbyte/pull/41808) | Update dependencies |
| 0.2.9 | 2024-07-10 | [41389](https://github.com/airbytehq/airbyte/pull/41389) | Update dependencies |
| 0.2.8 | 2024-07-10 | [41225](https://github.com/airbytehq/airbyte/pull/41225) | Update dependencies |
| 0.2.7 | 2024-07-07 | [40883](https://github.com/airbytehq/airbyte/pull/40883) | Update dependencies |
| 0.2.6 | 2024-06-30 | [40624](https://github.com/airbytehq/airbyte/pull/40624) | Update dependencies |
| 0.2.5 | 2024-06-27 | [38318](https://github.com/airbytehq/airbyte/pull/38318) | Make the connector compatible with Connector Builder |
| 0.2.4 | 2024-06-26 | [40369](https://github.com/airbytehq/airbyte/pull/40369) | Update dependencies |
| 0.2.3 | 2024-06-23 | [39953](https://github.com/airbytehq/airbyte/pull/39953) | Update dependencies |
| 0.2.2 | 2024-06-05 | [38980](https://github.com/airbytehq/airbyte/pull/38980) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.1 | 2024-05-31 | [38812](https://github.com/airbytehq/airbyte/pull/38812) | [autopull] Migrate to base image and poetry |
| 0.2.0 | 2023-08-29 | [29385](https://github.com/airbytehq/airbyte/pull/29385) | Migrate TS CDK to Low code |
| 0.1.23 | 2021-11-09 | 126 | Add Customer.io source |

</details>
