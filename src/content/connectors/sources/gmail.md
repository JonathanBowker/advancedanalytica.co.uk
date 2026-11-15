---
generated_record: true
connector_name: Gmail
connector_type: source
connector_slug: gmail
connector_directory: source-gmail
definition_id: f7833dac-fc18-4feb-a2a9-94b22001edc6
version: 1.0.2
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/gmail
logo: /images/connectors/sources/gmail.svg
logo_source_path: airbyte-integrations/connectors/source-gmail/icon.svg
logo_sha256: bb5c61e537a79e5254394cf8728ecbfbd815b2e8eac578f7024886e42f799dd5
original_metadata_path: airbyte-integrations/connectors/source-gmail/metadata.yaml
original_metadata_sha256: 2a815f4bc2aea3470a239748e2a6f67fec10e5bb78f31c10d533f1037c6b60b6
original_document_path: docs/integrations/sources/gmail.md
original_document_sha256: a6a3ed7bad2887d3f7c447d6700c866e893834933a52279c165cbd0c80b9d1c7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 6dbc97ea6c170705eceebd2b886eb70e3d605790d107f0214e89c15e3bdd0a2a
rewritten_at: 2026-11-12T14:16:37.973623+00:00
---

# Gmail

<HideInUI>

Find setup guidance and reference information for the [Gmail](https://mail.google.com/) source connector on this page.

</HideInUI>

Gmail is Google's email service. The Gmail source connector replicates messages, drafts, threads, labels, and the authenticated user's profile from Gmail's [REST API](https://developers.google.com/workspace/gmail/api/reference/rest).

## Prerequisites

- A Google account with access to the mailbox you want to replicate.
- A Gmail API scope that permits reading mail. Airbyte Cloud's OAuth flow requests `https://www.googleapis.com/auth/gmail.modify`, which includes read access. Your own OAuth client can grant the narrower `https://www.googleapis.com/auth/gmail.readonly` scope. In both cases, the connector only sends read requests.
<!-- env:oss -->
- For **Airbyte Open Source**: a Google Cloud project with the [Gmail API enabled](https://console.cloud.google.com/apis/library/gmail.googleapis.com), plus an OAuth 2.0 client and refresh token.
<!-- /env:oss -->

## Setup

### Step 1: Configure authentication

The Gmail source connector offers two authentication methods: **OAuth** and **Service Account Key**. Use OAuth because Service Account Key authentication can't currently read a mailbox.

<!-- env:cloud -->

#### OAuth for Airbyte Cloud

In **Airbyte Cloud**, sign in with the Google account for the mailbox you want to replicate. Airbyte Cloud handles the OAuth flow. When configuring the source, authorise Airbyte through the standard Google consent screen. The screen requests `https://www.googleapis.com/auth/gmail.modify`, so it asks you to allow Airbyte to read, compose, and send mail. The connector only sends read requests.

Sources authorised before connector version 0.1.11 retain the scope Google granted during consent. You don't need to authenticate them again.

<!-- /env:cloud -->

<!-- env:oss -->

#### OAuth for Airbyte Open Source

To use OAuth in **Airbyte Open Source**, create an OAuth client in your Google Cloud project. Complete the authorisation code flow yourself to get a refresh token. You'll need the resulting **Client ID**, **Client Secret**, and **Refresh Token** to configure the connector.

1. In the Google Cloud console, [enable the Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com) for your project.
2. Configure your OAuth consent screen and add a Gmail scope. Choose the scope based on how you complete the flow:
   - If you get the refresh token yourself, add `https://www.googleapis.com/auth/gmail.readonly`.
   - If you register your OAuth client with your Airbyte instance and click **Authenticate your account**, add `https://www.googleapis.com/auth/gmail.modify`. Airbyte builds the consent URL from the connector, which requests `gmail.modify`. You must also configure this scope on your consent screen.

   See [Choose Gmail API scopes](https://developers.google.com/workspace/gmail/api/auth/scopes).
3. Follow [Google's web server OAuth 2.0 guide](https://developers.google.com/identity/protocols/oauth2/web-server) to create a **Web application** OAuth client. Then exchange the authorisation code for a refresh token.

:::note
If you configured this source before version 0.1.1, **Client ID**, **Client Secret**, and **Refresh Token** were top-level fields. On its first newer-version run, the connector automatically moves them into the nested **Authentication** object. All three values must be present. You don't need to enter them again. Sources already using the nested OAuth or Service Account Key configuration don't change.
:::

#### Service Account Key for Airbyte Open Source

:::warning
Service Account Key authentication can't currently read a mailbox. Google requires the token request to identify the impersonated user in the `sub` claim. Google only applies [domain-wide delegation](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority) when this claim is set. The connector doesn't set `sub` or provide a field for the user to impersonate. Google therefore issues a token for the service account itself. A service account has no Gmail mailbox. Connection tests and syncs therefore fail with `Precondition check failed`, whether or not you've configured domain-wide delegation. Use OAuth instead.
:::

<!-- /env:oss -->

### Step 2: Configure Gmail in Airbyte

1. Log in to your Airbyte instance, click **Sources**, then click **+ New source**.
2. Select **Gmail** from the source type dropdown.
3. Choose your authentication method:
   - **Authenticate via Google (OAuth)**: Click **Authenticate your account** and complete the Google sign-in flow. **Airbyte Cloud** users authenticate through Airbyte's pre-registered OAuth app. **Airbyte Open Source** users provide their own **Client ID**, **Client Secret**, and **Refresh Token**.
   - **Service Account Key Authentication**: This method isn't currently usable. The connector authenticates as the service account itself, which has no mailbox. Use OAuth instead.
4. (Optional) Set **Start date** in `YYYY-MM-DDTHH:MM:SSZ` format. The connector only replicates messages, drafts, and threads received on or after this date. Leave it blank to replicate the complete mailbox history.
5. (Optional) Toggle **Include Spam & Trash** to include drafts and messages from the Spam and Trash folders. This setting defaults to off.
6. (Optional) Adjust **Number of concurrent workers**, between `2` and `10`, to control parallel requests. The default is `5`. Lower this value if you frequently see rate-limit errors.
7. Click **Set up source** to test the connection and save your configuration. The connection test reads the authenticated user's Gmail profile.

## Supported sync modes

The Gmail source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/):

| Sync mode                       | Supported |
|---------------------------------|:---------:|
| Full Refresh \| Overwrite       | Yes       |
| Full Refresh \| Append          | Yes       |
| Incremental \| Append           | Yes       |
| Incremental \| Append + Deduped | Yes       |

Only the `messages_details` stream supports incremental sync. Every other stream runs in full refresh mode during each sync.

## Streams

| Stream             | Primary Key    | Sync Mode                     | Description                                                                               |
|--------------------|:--------------:|-------------------------------|-------------------------------------------------------------------------------------------|
| `profile`          | `emailAddress` | Full Refresh                  | The authenticated user's Gmail profile, including email address and history ID.           |
| `drafts`           | `id`           | Full Refresh                  | Stub records (`id`, `message.id`, `message.threadId`) returned by `users.drafts.list`.    |
| `labels`           | `id`           | Full Refresh                  | All Gmail labels, including system labels (e.g. `INBOX`, `SENT`) and user-created labels. |
| `labels_details`   | `id`           | Full Refresh                  | Per-label metadata such as message and thread counts. Substream of `labels`.              |
| `messages`         | `id`           | Full Refresh                  | Stub records (`id`, `threadId`) returned by `users.messages.list`.                        |
| `messages_details` | `id`           | Incremental on `internalDate` | Full message payloads, headers, snippet, and labels.                                      |
| `threads`          | `id`           | Full Refresh                  | Stub records (`id`, `snippet`, `historyId`) returned by `users.threads.list`.             |
| `threads_details`  | `id`           | Full Refresh                  | Per-thread details and the messages in each thread. Substream of `threads`.               |

The `messages_details` cursor uses the message's `internalDate` field. This value is the Unix epoch in milliseconds when Gmail received the message. Other streams have no record-level cursor field, so they use full refresh.

During incremental syncs, `messages_details` lists messages received since the previous sync, using a one-hour lookback. It fetches details only for the returned IDs. This process re-emits messages received during the hour before the previous sync. Append-only destinations can therefore receive duplicates, while **Append + Deduped** prevents them. Gmail's `after:` filter uses received time, not modification time. Incremental syncs therefore miss changes to older messages, including new labels or read states. They also miss messages entering the mailbox later with an older received time. Examples include mail moved from Spam or Trash while **Include Spam & Trash** is off, or mail imported from another account. Run a full refresh periodically to keep labels and read states current for older messages. If **Start date** is blank, the initial lower bound is 2004-04-01, when Gmail launched.

The first incremental sync of `messages_details` reads every message since **Start date**. This also applies to your first sync after upgrading to version 0.3.0. State saved by earlier versions doesn't limit the list request. The connector lists messages in 30-day windows and saves state after each window. If a sync fails, the next sync resumes from the last completed window.

When **Start date** is set, the connector applies the Gmail `after:<epoch_seconds>` [search operator](https://support.google.com/mail/answer/7190) to several requests. These are the `messages`, including the internal list used by `messages_details`, plus `drafts` and `threads` `list` requests. This allows the API to skip records older than that date.

## Performance and quota limits

The Gmail API applies per-project and per-user rate limits, measured in [quota units](https://developers.google.com/workspace/gmail/api/reference/quota). Limits and call costs depend on when your credentials' Google Cloud project started using the Gmail API:

| Quota                                    | Earlier projects (used the API November 2025 to April 2026) | Projects created on or after May 1, 2026 |
|------------------------------------------|-------------------------------------------------------------|------------------------------------------|
| Per-project limit (`rateLimitExceeded`)  | 1,200,000 units per minute                                  | 1,200,000 units per minute               |
| Per-user limit (`userRateLimitExceeded`) | 15,000 units per minute per user                            | 6,000 units per minute per user          |
| `threads.get`                            | 10 units                                                    | 120 units                                |
| `messages.get`                           | 5 units                                                     | 60 units                                 |
| `threads.list`                           | 10 units                                                    | 10 units                                 |
| `messages.list`                          | 5 units                                                     | 5 units                                  |

For projects created on or after May 1, 2026, `drafts.list` costs 5 units. `labels` and `profile` calls cost 1 unit. The `get` costs apply to full-format reads, which the connector requests. The `messages_details` and `threads_details` substreams make one `get` call per parent record. As a result, high-volume mailboxes consume quota quickly.

The connector paces requests to stay within the per-user limit. The authentication method determines its approach:

- **OAuth**: The connector assumes the earlier quota because Airbyte Cloud's OAuth app belongs to a project that retained it. Your own OAuth client may use a project created on or after May 1, 2026. In this case, the connector may send more requests than your quota allows. It then relies on Gmail's rate-limit responses.
- **Service Account Key**: The connector assumes the newer quota because the service account belongs to your project. Service Account Key authentication can't currently read a mailbox, so this has no effect yet.

Every project user shares the per-project limit. The connector can't track this shared usage, so it relies on Gmail's rate-limit responses.

The connector retries `429 Too Many Requests` and `403` quota-saturation errors. It calculates the wait before each retry as follows:

1. If the response includes a `Retry-After` header, it waits for the specified time.
2. Otherwise, if the error message includes a `Retry after <timestamp>` time, it waits until then, for up to 30 minutes.
3. Otherwise, it uses exponential backoff.

The connector retries each request up to 10 times. It usually stops retrying after about 10 minutes. A wait taken from the error message can continue beyond this limit. The connector then retries once and fails the request if that retry also fails. After a `429`, every request waits up to one minute for the current quota window to clear. If sync logs show frequent rate-limit warnings, lower the **Number of concurrent workers** setting.

## Limits and troubleshooting

- **`messages` and `threads` are stub-only.** The Gmail API's `users.messages.list` and `users.threads.list` endpoints return only `{id, threadId}` (or `{id, snippet, historyId}`) for each record. To replicate full message bodies, headers or labels, sync `messages_details` or `threads_details`. You don't also need to select `messages` or `threads`. Selecting `messages` adds a full mailbox list to every sync.
- **Service account keys can't read a mailbox.** The connector doesn't set the `sub` claim Google requires for a service account to impersonate a user. The token therefore belongs to the service account, which has no mailbox. Domain-wide delegation doesn't change this. Use OAuth instead.
- **`Precondition check failed`.** The authenticated account has no Gmail mailbox. You either used Service Account Key authentication or authorised a Google Workspace user without Gmail enabled. Authenticate with OAuth as the user whose mailbox you want to sync.
- **The Gmail API isn't enabled.** On Airbyte Open Source, your own OAuth client causes a configuration error. You must [enable the Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com) in the Google Cloud project that owns the client.
- **The authorized account lacks the required scope.** If Gmail returns `insufficientPermissions`, re-authenticate and grant `https://www.googleapis.com/auth/gmail.readonly` (a refresh token you obtained yourself) or `https://www.googleapis.com/auth/gmail.modify` (the **Authenticate your account** flow).
- **Your Workspace administrator has disabled Gmail apps.** If Gmail returns `domainPolicy`, ask your Google Workspace administrator to allow Gmail API access for the app. Then retry.
- **The Cloud consent screen asks for more access than the connector uses.** `https://www.googleapis.com/auth/gmail.modify` lets an app read, compose and send mail, change labels and trash messages. This connector only makes GET requests. To grant the narrower `https://www.googleapis.com/auth/gmail.readonly` scope instead, use your own OAuth client on a self-managed Airbyte instance.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `credentials` | `object` | Authentication. Credentials for connecting to the Gmail API. |  |
| `credentials.client_id` | `string` | Client ID. Enter your Google application's Client ID. See Google's documentation for more information. |  |
| `credentials.client_secret` | `string` | Client Secret. Enter your Google application's Client Secret. See Google's documentation for more information. |  |
| `credentials.client_refresh_token` | `string` | Refresh Token. Enter your Google application's refresh token. See Google's documentation for more information. |  |
| `credentials.service_account_info` | `string` | Service Account Information. The JSON key of the service account to use for authorization. |  |
| `include_spam_and_trash` | `boolean` | Include Spam &amp; Trash. Include drafts/messages from SPAM and TRASH in the results. Defaults to false. | false |
| `num_workers` | `integer` | Number of concurrent workers. Higher values result in faster syncs but may trigger rate limiting on lower-tier Gmail API quotas. Reduce this value if you see frequent rate-limit errors in sync logs. | 5 |
| `start_date` | `string` | UTC date and time in the format YYYY-MM-DDTHH:MM:SSZ. Only messages, threads, and drafts received on or after this date will be replicated. If unset, the full history is replicated. |  |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 1.0.2 | 2026-11-02 | [90426](https://github.com/airbytehq/airbyte/pull/90426) | Promote to Certified (GA); update to source-declarative-manifest 7.45.0 |
| 1.0.1 | 2026-10-28 | [90147](https://github.com/airbytehq/airbyte/pull/90147) | Request 500 items per page from Gmail list endpoints |
| 1.0.0 | 2026-10-27 | [89502](https://github.com/airbytehq/airbyte/pull/89502) | Add profile primary key and type count and size fields as integers |
| 0.3.0 | 2026-10-27 | [89756](https://github.com/airbytehq/airbyte/pull/89756) | Bound incremental `messages_details` reads to the previous sync with a one-hour lookback |
| 0.2.0 | 2026-10-27 | [89703](https://github.com/airbytehq/airbyte/pull/89703) | Pace requests to the Gmail per-user quota |
| 0.1.24 | 2026-10-27 | [89912](https://github.com/airbytehq/airbyte/pull/89912) | Update dependencies |
| 0.1.23 | 2026-10-20 | [88896](https://github.com/airbytehq/airbyte/pull/88896) | Declare nested message parts and honor Gmail's rate-limit retry time |
| 0.1.22 | 2026-10-20 | [89234](https://github.com/airbytehq/airbyte/pull/89234) | Update dependencies |
| 0.1.21 | 2026-10-13 | [88403](https://github.com/airbytehq/airbyte/pull/88403) | Check connections via the profile endpoint and retry rate-limited requests |
| 0.1.20 | 2026-10-13 | [88635](https://github.com/airbytehq/airbyte/pull/88635) | Update dependencies |
| 0.1.19 | 2026-10-06 | [87854](https://github.com/airbytehq/airbyte/pull/87854) | Update dependencies |
| 0.1.18 | 2026-09-29 | [87179](https://github.com/airbytehq/airbyte/pull/87179) | Update dependencies |
| 0.1.17 | 2026-09-22 | [86632](https://github.com/airbytehq/airbyte/pull/86632) | Update dependencies |
| 0.1.16 | 2026-09-15 | [86066](https://github.com/airbytehq/airbyte/pull/86066) | Update dependencies |
| 0.1.15 | 2026-09-11 | [85800](https://github.com/airbytehq/airbyte/pull/85800) | Fix config migration copying empty or incomplete legacy OAuth fields into nested `credentials` |
| 0.1.14 | 2026-09-08 | [85497](https://github.com/airbytehq/airbyte/pull/85497) | Update dependencies |
| 0.1.13 | 2026-08-18 | [84554](https://github.com/airbytehq/airbyte/pull/84554) | Update dependencies |
| 0.1.12 | 2026-08-11 | [83951](https://github.com/airbytehq/airbyte/pull/83951) | Update dependencies |
| 0.1.11 | 2026-08-04 | [83308](https://github.com/airbytehq/airbyte/pull/83308) | Request the `gmail.modify` scope in Airbyte Cloud's OAuth flow |
| 0.1.10 | 2026-08-04 | [83463](https://github.com/airbytehq/airbyte/pull/83463) | Update dependencies |
| 0.1.9 | 2026-07-28 | [82922](https://github.com/airbytehq/airbyte/pull/82922) | Update dependencies |
| 0.1.8 | 2026-07-21 | [82425](https://github.com/airbytehq/airbyte/pull/82425) | Update dependencies |
| 0.1.7 | 2026-07-14 | [81816](https://github.com/airbytehq/airbyte/pull/81816) | Update dependencies |
| 0.1.6 | 2026-06-30 | [81079](https://github.com/airbytehq/airbyte/pull/81079) | Update dependencies |
| 0.1.5 | 2026-06-23 | [80468](https://github.com/airbytehq/airbyte/pull/80468) | Update dependencies |
| 0.1.4 | 2026-06-16 | [79869](https://github.com/airbytehq/airbyte/pull/79869) | Update dependencies |
| 0.1.3 | 2026-06-09 | [79310](https://github.com/airbytehq/airbyte/pull/79310) | Update dependencies |
| 0.1.2 | 2026-06-02 | [78732](https://github.com/airbytehq/airbyte/pull/78732) | Update dependencies |
| 0.1.1 | 2026-05-04 | [76065](https://github.com/airbytehq/airbyte/pull/76065) | Add OAuth and service account authentication |
| 0.1.0 | 2026-04-29 | [76431](https://github.com/airbytehq/airbyte/pull/76431) | Add incremental `messages_details` sync, `start_date` filtering and rate-limit handling |
| 0.0.52 | 2026-04-28 | [77264](https://github.com/airbytehq/airbyte/pull/77264) | Update dependencies |
| 0.0.51 | 2026-04-21 | [76616](https://github.com/airbytehq/airbyte/pull/76616) | Update dependencies |
| 0.0.50 | 2026-03-24 | [75387](https://github.com/airbytehq/airbyte/pull/75387) | Update dependencies |
| 0.0.49 | 2026-03-10 | [74532](https://github.com/airbytehq/airbyte/pull/74532) | Update dependencies |
| 0.0.48 | 2026-03-03 | [74205](https://github.com/airbytehq/airbyte/pull/74205) | Update dependencies |
| 0.0.47 | 2026-02-11 | [73300](https://github.com/airbytehq/airbyte/pull/73300) | Revert OAuth authentication support |
| 0.0.46 | 2026-02-11 | [73273](https://github.com/airbytehq/airbyte/pull/73273) | Add OAuth authentication support (reverted in 0.0.47) |
| 0.0.45 | 2026-02-10 | [72593](https://github.com/airbytehq/airbyte/pull/72593) | Update dependencies |
| 0.0.44 | 2026-01-20 | [71967](https://github.com/airbytehq/airbyte/pull/71967) | Update dependencies |
| 0.0.43 | 2026-01-14 | [71388](https://github.com/airbytehq/airbyte/pull/71388) | Update dependencies |
| 0.0.42 | 2025-12-18 | [70726](https://github.com/airbytehq/airbyte/pull/70726) | Update dependencies |
| 0.0.41 | 2025-11-25 | [69871](https://github.com/airbytehq/airbyte/pull/69871) | Update dependencies |
| 0.0.40 | 2025-11-18 | [69412](https://github.com/airbytehq/airbyte/pull/69412) | Update dependencies |
| 0.0.39 | 2025-10-29 | [69004](https://github.com/airbytehq/airbyte/pull/69004) | Update dependencies |
| 0.0.38 | 2025-10-21 | [68299](https://github.com/airbytehq/airbyte/pull/68299) | Update dependencies |
| 0.0.37 | 2025-10-14 | [67999](https://github.com/airbytehq/airbyte/pull/67999) | Update dependencies |
| 0.0.36 | 2025-10-07 | [67258](https://github.com/airbytehq/airbyte/pull/67258) | Update dependencies |
| 0.0.35 | 2025-09-30 | [66299](https://github.com/airbytehq/airbyte/pull/66299) | Update dependencies |
| 0.0.34 | 2025-09-09 | [66063](https://github.com/airbytehq/airbyte/pull/66063) | Update dependencies |
| 0.0.33 | 2025-08-23 | [65371](https://github.com/airbytehq/airbyte/pull/65371) | Update dependencies |
| 0.0.32 | 2025-08-09 | [64626](https://github.com/airbytehq/airbyte/pull/64626) | Update dependencies |
| 0.0.31 | 2025-08-02 | [64194](https://github.com/airbytehq/airbyte/pull/64194) | Update dependencies |
| 0.0.30 | 2025-07-26 | [63861](https://github.com/airbytehq/airbyte/pull/63861) | Update dependencies |
| 0.0.29 | 2025-07-19 | [63463](https://github.com/airbytehq/airbyte/pull/63463) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63123](https://github.com/airbytehq/airbyte/pull/63123) | Update dependencies |
| 0.0.27 | 2025-07-05 | [62624](https://github.com/airbytehq/airbyte/pull/62624) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62169](https://github.com/airbytehq/airbyte/pull/62169) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61834](https://github.com/airbytehq/airbyte/pull/61834) | Update dependencies |
| 0.0.24 | 2025-06-14 | [61134](https://github.com/airbytehq/airbyte/pull/61134) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60608](https://github.com/airbytehq/airbyte/pull/60608) | Update dependencies |
| 0.0.22 | 2025-05-10 | [59895](https://github.com/airbytehq/airbyte/pull/59895) | Update dependencies |
| 0.0.21 | 2025-05-03 | [59276](https://github.com/airbytehq/airbyte/pull/59276) | Update dependencies |
| 0.0.20 | 2025-04-26 | [58813](https://github.com/airbytehq/airbyte/pull/58813) | Update dependencies |
| 0.0.19 | 2025-04-19 | [58184](https://github.com/airbytehq/airbyte/pull/58184) | Update dependencies |
| 0.0.18 | 2025-04-12 | [57732](https://github.com/airbytehq/airbyte/pull/57732) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57214](https://github.com/airbytehq/airbyte/pull/57214) | Update dependencies |
| 0.0.16 | 2025-03-29 | [55947](https://github.com/airbytehq/airbyte/pull/55947) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55265](https://github.com/airbytehq/airbyte/pull/55265) | Update dependencies |
| 0.0.14 | 2025-03-01 | [54937](https://github.com/airbytehq/airbyte/pull/54937) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54417](https://github.com/airbytehq/airbyte/pull/54417) | Update dependencies |
| 0.0.12 | 2025-02-15 | [53369](https://github.com/airbytehq/airbyte/pull/53369) | Update dependencies |
| 0.0.11 | 2025-02-01 | [52831](https://github.com/airbytehq/airbyte/pull/52831) | Update dependencies |
| 0.0.10 | 2025-01-25 | [52329](https://github.com/airbytehq/airbyte/pull/52329) | Update dependencies |
| 0.0.9 | 2025-01-18 | [51700](https://github.com/airbytehq/airbyte/pull/51700) | Update dependencies |
| 0.0.8 | 2025-01-11 | [51110](https://github.com/airbytehq/airbyte/pull/51110) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50536](https://github.com/airbytehq/airbyte/pull/50536) | Update dependencies |
| 0.0.6 | 2024-12-21 | [50008](https://github.com/airbytehq/airbyte/pull/50008) | Update dependencies |
| 0.0.5 | 2024-12-14 | [49474](https://github.com/airbytehq/airbyte/pull/49474) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49185](https://github.com/airbytehq/airbyte/pull/49185) | Update dependencies |
| 0.0.3 | 2024-10-29 | [47852](https://github.com/airbytehq/airbyte/pull/47852) | Update dependencies |
| 0.0.2 | 2024-10-28 | [47570](https://github.com/airbytehq/airbyte/pull/47570) | Update dependencies |
| 0.0.1 | 2024-10-09 | | Initial release by [@topefolorunso](https://github.com/topefolorunso) via Connector Builder |

</details>
