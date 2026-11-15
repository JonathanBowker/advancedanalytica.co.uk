---
generated_record: true
connector_name: Pipedrive
connector_type: source
connector_slug: pipedrive
connector_directory: source-pipedrive
definition_id: d8286229-c680-4063-8c59-23b9b391c700
version: 5.0.3
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/pipedrive
logo: /images/connectors/sources/pipedrive.svg
logo_source_path: airbyte-integrations/connectors/source-pipedrive/icon.svg
logo_sha256: f5ee2ef376df5c6b3e1e9dbd8106cfffee66b91167bfb60f5e2b81e32fff1b98
original_metadata_path: airbyte-integrations/connectors/source-pipedrive/metadata.yaml
original_metadata_sha256: 9c9a6cd563d0280773584f217759f406ccf8c7daaeb961febe5f89f92f5f94e8
original_document_path: docs/integrations/sources/pipedrive.md
original_document_sha256: 372b586613494d142493c77c677cb32b31c6c8aecb6dde30dd80ed27cc029696
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d5f48e1743ab73d00c760c5af34580062b062be596a1e9c8dc76af90d412420a
rewritten_at: 2026-11-12T13:52:05.130951+00:00
---

# Pipedrive

Use this page to set up the Pipedrive source connector and find reference information.

## Prerequisites

- A Pipedrive account.
- For OAuth authentication on Airbyte Cloud, you don't need anything else. You'll authorise Airbyte's Pipedrive app during setup.
- For API token authentication, or self-managed Airbyte, you need a personal API token. API access must be enabled for your Pipedrive user.

## Setup guide

### Step 1: Set up Pipedrive

You can authenticate the connector with OAuth or a personal API token. Each credential belongs to one Pipedrive user. The connector can only read data that this user can see.

**OAuth (default on Airbyte Cloud)**: You don't need to prepare anything. During setup, you'll authorise Airbyte's Pipedrive app in a browser window. Pipedrive then returns your company's API host, which the connector uses for every request. Pipedrive asks you to accept all the app's scopes together. The `roles`, `permission_sets` and `permission_set_assignments` streams depend on the app's `admin` scope. Pipedrive only honours this scope when a company admin authorises the app. See Pipedrive's [scopes and permission explanations](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations).

**API token**:

1. In the Pipedrive web app, click your account name in the top-right corner. Then select **Company settings** > **Personal preferences** > **API**.
2. Copy the API token shown on the page. See [How to find the API token](https://pipedrive.readme.io/docs/how-to-find-the-api-token) for screenshots.

You can have one active Pipedrive API token per user. If you regenerate it, update the connector configuration. Each company has its own token if you belong to several companies.

If you can't see the **API** tab, your company admin hasn't enabled API access for your permission set. Ask them to follow [Enabling API for company users](https://pipedrive.readme.io/docs/enabling-api-for-company-users).

### Step 2: Set up the connector in Airbyte

1. In the Airbyte UI, go to **Sources** and click **+ New source**.
2. Select **Pipedrive** from the list.
3. Enter a name for the source.
4. Complete the fields below, then click **Set up source**.

<FieldAnchor field="credentials">

**Authentication**: Choose **OAuth2.0** and click **Authenticate your Pipedrive account**. Alternatively, choose **API Token** and paste the token you copied in Step 1. Airbyte sends the API token in the `x-api-token` header with every request. The token never appears in URLs. On self-managed Airbyte, choose **API Token** unless you've registered your own Pipedrive OAuth app. See Pipedrive's [OAuth authorization guide](https://pipedrive.readme.io/docs/marketplace-oauth-authorization).

</FieldAnchor>

<FieldAnchor field="replication_start_date">

**Start Date** (optional): Enter a UTC date and time in the format `YYYY-MM-DDTHH:MM:SSZ`, such as `2017-01-25T00:00:00Z`. You can also use a space instead of `T`. If you leave this empty, it defaults to `2010-01-01T00:00:00Z`. Incremental streams only replicate records updated on or after this date. Full refresh streams ignore it, except `deal_products` and `deal_installments`. These streams only read the deals returned by `deals` and `deals_archived`. See [Incremental sync and Start Date](#incremental-sync-and-start-date).

</FieldAnchor>

<FieldAnchor field="num_workers">

**Number of concurrent workers** (optional): Set how many streams Airbyte syncs in parallel, from 2 to 10. A value of 1 runs with 2 workers. The default is 3. All requests share one client-side request budget, sized to Pipedrive's lowest-plan burst limit. Higher values therefore rarely make a sync faster.

</FieldAnchor>

When you click **Set up source**, Airbyte tests the connection by calling the [Currencies](https://developers.pipedrive.com/docs/api/v1/Currencies#getCurrencies) endpoint. Every credential can read this endpoint. The test therefore passes even when an account has no deals.

## Supported sync modes

The Pipedrive source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes):

| Feature                       | Supported?                              |
| :---------------------------- | :-------------------------------------- |
| Full Refresh Sync             | Yes                                     |
| Incremental Sync              | Yes                                     |
| Replicate Incremental Deletes | Yes (`deals` and `deals_archived` only) |
| SSL connection                | Yes                                     |
| Namespaces                    | No                                      |

## Supported streams

Most streams read Pipedrive API v1. The following streams read API v2: `deals`, `deals_archived`, `persons`, `organizations`, `activities`, `products`, `pipelines`, `stages`, `deal_products`, `deal_installments`, `product_variations`, `projects` and `tasks`. Ten streams support incremental sync. `deals`, `deals_archived`, `persons`, `organizations`, `activities`, `products`, `notes` and `leads` filter on the server with `updated_since`. `files` and `deal_flow` filter on the client side. The other twenty-seven streams only support full refresh. The stream names below match those shown in Airbyte.

| Stream                       | Sync modes                | Notes                                                                                                                                                                                                                                                                                                         |
| :--------------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `activities`                 | Full Refresh, Incremental | API v2 `api/v2/activities`, cursor: `update_time`.                                                                                                                                                                                                                                                            |
| `activity_fields`            | Full Refresh              | [ActivityFields](https://developers.pipedrive.com/docs/api/v1/ActivityFields#getActivityFields)                                                                                                                                                                                                               |
| `activity_types`             | Full Refresh              | [ActivityTypes](https://developers.pipedrive.com/docs/api/v1/ActivityTypes#getActivityTypes)                                                                                                                                                                                                                  |
| `call_logs`                  | Full Refresh              | Call logs of the connected user ([CallLogs](https://developers.pipedrive.com/docs/api/v1/CallLogs#getUserCallLogs)). Empty unless a phone integration is connected in Pipedrive.                                                                                                                              |
| `currencies`                 | Full Refresh              | [Currencies](https://developers.pipedrive.com/docs/api/v1/Currencies#getCurrencies)                                                                                                                                                                                                                           |
| `deal_fields`                | Full Refresh              | [DealFields](https://developers.pipedrive.com/docs/api/v1/DealFields#getDealFields)                                                                                                                                                                                                                           |
| `deal_flow`                  | Full Refresh, Incremental | Field change history of each deal returned by `deals` and `deals_archived` ([Deals getDealUpdates](https://developers.pipedrive.com/docs/api/v1/Deals#getDealUpdates)), one request per deal, so it is slow on large accounts. Cursor: `log_time`, filtered client-side.                                      |
| `deal_installments`          | Full Refresh              | Payment installments of deals returned by `deals` and `deals_archived` ([DealInstallments](https://developers.pipedrive.com/docs/api/v1/DealInstallments#getInstallments)), 100 deals per request. Installments are only available on Pipedrive's Growth plan and higher; the stream is empty on other plans. |
| `deal_products`              | Full Refresh              | Products attached to the deals returned by `deals` and `deals_archived`, fetched for 100 deals per request from API v2 `GET /api/v2/deals/products`.                                                                                                                                                          |
| `deals`                      | Full Refresh, Incremental | Not-archived deals from API v2 `GET /api/v2/deals` with `status=open,won,lost,deleted`, so deals deleted within the last 30 days are included with `is_deleted: true`. Cursor: `update_time`.                                                                                                                 |
| `deals_archived`             | Full Refresh, Incremental | Archived deals from API v2 `GET /api/v2/deals/archived`, same fields and status handling as `deals`. Cursor: `update_time`.                                                                                                                                                                                   |
| `files`                      | Full Refresh, Incremental | API v1 `GET /v1/files` sorted by `id`; the connector reads the full list and keeps records modified on or after the cursor minus one hour. Cursor: `update_time`.                                                                                                                                             |
| `filters`                    | Full Refresh              | API v1 `/filters`.                                                                                                                                                                                                                                                                                            |
| `goals`                      | Full Refresh              | Everyone's goals, read once per assignee type (person, team and company) from [Goals](https://developers.pipedrive.com/docs/api/v1/Goals#getGoals).                                                                                                                                                           |
| `lead_labels`                | Full Refresh              | [LeadLabels](https://developers.pipedrive.com/docs/api/v1/LeadLabels#getLeadLabels)                                                                                                                                                                                                                           |
| `lead_sources`               | Full Refresh              | [LeadSources](https://developers.pipedrive.com/docs/api/v1/LeadSources#getLeadSources)                                                                                                                                                                                                                        |
| `leads`                      | Full Refresh, Incremental | Leads that are not archived ([Leads](https://developers.pipedrive.com/docs/api/v1/Leads#getLeads)) with the inclusive `updated_since` filter, sorted by `id`; each sync re-reads the hour before the cursor. Cursor: `update_time`.                                                                           |
| `leads_archived`             | Full Refresh              | Archived leads ([Leads getArchivedLeads](https://developers.pipedrive.com/docs/api/v1/Leads#getArchivedLeads)), which `leads` leaves out. Same fields as `leads`.                                                                                                                                             |
| `legacy_teams`               | Full Refresh              | [LegacyTeams](https://developers.pipedrive.com/docs/api/v1/LegacyTeams#getTeams). Pipedrive has deprecated this endpoint; the stream is empty when the Teams feature is disabled for your company, and fails if Pipedrive retires the endpoint.                                                               |
| `mail`                       | Full Refresh              | Messages in each mail thread, fetched with one request per thread ([Mailbox getMailThreadMessages](https://developers.pipedrive.com/docs/api/v1/Mailbox#getMailThreadMessages)). See [Mail streams](#mail-streams).                                                                                           |
| `mailThreads`                | Full Refresh              | Mail threads from the `inbox`, `drafts`, `sent`, and `archive` folders ([Mailbox getMailThreads](https://developers.pipedrive.com/docs/api/v1/Mailbox#getMailThreads)). See [Mail streams](#mail-streams).                                                                                                    |
| `notes`                      | Full Refresh, Incremental | API v1 `GET /v1/notes` with the inclusive `updated_since` filter, sorted by `id`; each sync re-reads the hour before the cursor. Cursor: `update_time`.                                                                                                                                                       |
| `organization_fields`        | Full Refresh              | [OrganizationFields](https://developers.pipedrive.com/docs/api/v1/OrganizationFields#getOrganizationFields)                                                                                                                                                                                                   |
| `organizations`              | Full Refresh, Incremental | API v2 `api/v2/organizations`, cursor: `update_time`.                                                                                                                                                                                                                                                         |
| `permission_set_assignments` | Full Refresh              | Users assigned to each permission set ([PermissionSets](https://developers.pipedrive.com/docs/api/v1/PermissionSets#getPermissionSetAssignments)). Requires an admin user; the stream is empty otherwise.                                                                                                     |
| `permission_sets`            | Full Refresh              | [PermissionSets](https://developers.pipedrive.com/docs/api/v1/PermissionSets#getPermissionSets)                                                                                                                                                                                                               |
| `person_fields`              | Full Refresh              | [PersonFields](https://developers.pipedrive.com/docs/api/v1/PersonFields#getPersonFields)                                                                                                                                                                                                                     |
| `persons`                    | Full Refresh, Incremental | API v2 `api/v2/persons`, cursor: `update_time`.                                                                                                                                                                                                                                                               |
| `pipelines`                  | Full Refresh              | API v2 `api/v2/pipelines`.                                                                                                                                                                                                                                                                                    |
| `product_fields`             | Full Refresh              | [ProductFields](https://developers.pipedrive.com/docs/api/v1/ProductFields#getProductFields)                                                                                                                                                                                                                  |
| `product_variations`         | Full Refresh              | Variations of every product ([Products getProductVariations](https://developers.pipedrive.com/docs/api/v1/Products#getProductVariations)), one request per product. The Start Date does not apply.                                                                                                            |
| `products`                   | Full Refresh, Incremental | API v2 `api/v2/products`, cursor: `update_time`.                                                                                                                                                                                                                                                              |
| `projects`                   | Full Refresh              | Active and archived projects ([Projects](https://developers.pipedrive.com/docs/api/v1/Projects#getProjects)), including deleted projects with `status: deleted`. Requires the Projects add-on; the stream is empty otherwise.                                                                                 |
| `roles`                      | Full Refresh              | [Roles](https://developers.pipedrive.com/docs/api/v1/Roles#getRoles)                                                                                                                                                                                                                                          |
| `stages`                     | Full Refresh              | API v2 `api/v2/stages`.                                                                                                                                                                                                                                                                                       |
| `tasks`                      | Full Refresh              | Project tasks ([Tasks](https://developers.pipedrive.com/docs/api/v1/Tasks#getTasks)). Requires the Projects add-on; the stream is empty otherwise. Pipedrive marks the Tasks API as beta.                                                                                                                     |
| `users`                      | Full Refresh              | API v1 `/users`.                                                                                                                                                                                                                                                                                              |

### Incremental sync and Start Date

`deals`, `deals_archived`, `persons`, `organizations`, `activities`, `products`, `notes` and `leads` send Pipedrive the Start Date or last saved cursor as `updated_since`. This filter is inclusive. Each incremental run re-emits the record whose `update_time` matches the saved cursor. Destinations deduplicate this record using the primary key. `files` reads the full list, sorted by `id`. It keeps records modified on or after the cursor. `files`, `notes` and `leads` also reread the hour before the saved cursor. This prevents missing records edited while a sync reads the list. `deal_flow` reads the change history for each deal returned by `deals` and `deals_archived`. It keeps changes whose `log_time` is on or after the cursor. It doesn't reread the previous hour. `pipelines`, `stages`, `filters` and `users` use full refresh. The v2 pipelines and stages endpoints have no `updated_since` parameter. The v1 filters and users endpoints return short, unpaginated lists. Full refresh streams ignore the Start Date and return all records, except `deal_products` and `deal_installments`. These only cover deals returned by `deals` and `deals_archived` for the Start Date. `product_variations` reads every product's variations during each sync.

`deals` and `deals_archived` request `status=open,won,lost,deleted`. They return deals deleted within the last 30 days with `is_deleted: true`. `projects` requests every project status and returns deleted projects with `status: deleted`. No other stream requests deleted records. The `is_deleted` field on other API v2 records and `users` passes through exactly as Pipedrive returns it. `deals_archived` delivers archived deals with `is_archived: true`.

### Custom fields

You can add Pipedrive custom fields to deals, persons, organizations, products and activities. The API returns each custom field as a 40-character hash key, not a readable name. API v2 streams expose these values under the `custom_fields` object. `leads` and `leads_archived` use API v1 and return them as top-level hash keys. To match a hash key with its label and type, sync the corresponding `*_fields` stream. These are `deal_fields`, `person_fields`, `organization_fields`, `product_fields` or `activity_fields`. Then join on the `key` column.

Monetary custom fields are objects with `value` and `currency` keys. API v1 instead returned separate `<hash>` and `<hash>_currency` fields.

### Mail streams

`mailThreads` lists threads from the connected Pipedrive user's mailbox. It queries the `inbox`, `drafts`, `sent` and `archive` folders separately. A thread in several folders may therefore appear more than once. `mail` then requests messages from every thread returned by `mailThreads`, making one request per thread. Both streams only support full refresh. You can only see mail for the connected Pipedrive user, not the whole company. If that user hasn't connected a mailbox to Pipedrive through Mail sync, both streams return no records.

## Performance considerations

Pipedrive applies per-company, token-based [rate limits](https://pipedrive.readme.io/docs/core-api-concepts-rate-limiting) based on your plan and seat count. The connector limits itself to 20 requests per rolling 2 seconds across all streams. This matches Pipedrive's lowest-plan burst limit. Bursts therefore rarely trigger a 429, regardless of how many workers you configure. When Pipedrive returns HTTP 429, the connector waits for the window in the `x-ratelimit-reset` header. If the header is missing, it uses exponential backoff. It retries up to ten times before failing the sync. If the header specifies 300 seconds or more, the connector stops with a retryable error instead of waiting. Two limits apply. The first is a rolling 2-second burst window for each API token. It allows 20 to 120 requests, depending on your plan, and recovers after a short wait. The second is a daily token budget shared across the whole company. It equals 30,000 tokens multiplied by the plan multiplier and seat count. Every API token and app in the company shares this budget. Once exhausted, every request fails until midnight in Pipedrive's server timezone. Waiting doesn't help in this case. If your account is nearing its limits, run fewer streams per connection or schedule syncs less often.

These streams make requests for each parent record. They can run slowly on large accounts and consume more of the daily token budget:

- `deal_products` makes one request for every 100 deals returned by `deals` and `deals_archived` (10 tokens each).
- `product_variations` makes one request per product during every sync, regardless of the Start Date (10 tokens each).
- `mail` makes one request per mail thread (20 tokens each).
- `deal_flow` makes one request per deal returned by `deals` and `deals_archived` (40 tokens each).
- `deal_installments` makes one request for every 100 deals returned by `deals` and `deals_archived` (10 tokens each).

Leave these streams disabled unless you need them.

## Limitations and troubleshooting

<details>
<summary>Expand to see details about Pipedrive connector limitations and troubleshooting.</summary>

### Connector limitations

The connector handles Pipedrive HTTP errors as follows:

| HTTP status        | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 401, 402, 403      | The sync fails with a configuration error that includes Pipedrive's error text. For `deal_flow`, `mail` and `product_variations`, a 403 on a single parent record is skipped and the sync continues; `deal_products` asks for 100 deals at once, so a 403 skips that batch. If the token can't read any deal products, deal changes, mail messages or product variations at all, those streams finish empty rather than failing. `projects`, `tasks` and `deal_installments` treat a 402 or 403 on the whole endpoint, and `legacy_teams` and `permission_set_assignments` a 403, as a feature that isn't available on the account or to the token's user, and return no records instead of failing. Cloudflare's HTML 403, sent after repeated rate-limit violations, always fails the sync. |
| 404, 410           | For `deal_flow`, `mail` and `product_variations`, a parent deal, mail thread or product deleted after the parent stream was read is skipped (an HTML 404 page fails instead); `deal_products` asks for 100 deals at once and Pipedrive leaves out deals it no longer has. `projects` and `tasks` return no records on a JSON 404, and `permission_set_assignments` skips a permission set without assignments (404). On other streams these fail the sync.                                                                                                                                                                                                                                                                                                                                    |
| 415                | Pipedrive reports that a feature isn't enabled for your company. `legacy_teams`, `projects`, `tasks` and `deal_installments` return no records; other streams fail with a configuration error that asks you to enable the feature or deselect the stream.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 429                | Rate limited; retried as described under [Performance considerations](#performance-considerations).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 500, 502, 503, 504 | Temporary Pipedrive errors; retried with backoff.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 501                | The sync fails with a system error: the connector sent a request Pipedrive does not implement. Report it to Airbyte.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

- The connector replicates deletions for `deals` and `deals_archived` for 30 days after deletion (`is_deleted: true`). It also replicates deletions for `projects` (`status: deleted`). Records deleted from other streams remain in your destination until you clear and resync the stream.
- With OAuth, requests use the company host returned by Pipedrive during authorisation (`https://<company>.pipedrive.com/api/...`). With an API token, they use `https://api.pipedrive.com`.
- With OAuth, Pipedrive access tokens expire after 60 minutes. The connector refreshes them automatically. The refresh token expires if unused for 60 days. You must re-authenticate a source that hasn't synced for 60 days. See Pipedrive's [OAuth authorization guide](https://pipedrive.readme.io/docs/marketplace-oauth-authorization).
- With OAuth, a 403 "Scope and URL mismatch" means Airbyte's Pipedrive app lacks a required stream scope. This causes every stream to fail with a configuration error, including streams that otherwise skip a 403.

### Troubleshooting

- **Missing streams or empty streams**: You can only access records visible to the connected Pipedrive user. Connect as a user with broader visibility or an admin. `mail` and `mailThreads` remain empty unless that user has connected a mailbox in Pipedrive. Some streams finish without records when your plan or connected user can't access the feature. These are `projects`, `tasks`, `deal_installments`, `legacy_teams` and `permission_set_assignments`. An information-level log entry identifies the stream.
- **Records missing from incremental streams**: Incremental streams only replicate records modified on or after the Start Date. Later syncs use the last saved cursor instead. Records unchanged since the Start Date are excluded. To backfill them, move the Start Date earlier or clear the stream.
- **Custom fields appear as hash keys**: This is expected. See [Custom fields](#custom-fields).
- **Syncs fail with HTTP 429**: The connector exhausted its retries, usually because the daily token budget is spent. Every integration in your Pipedrive company shares this budget, so another integration can also spend it. Enable fewer streams, increase the interval between syncs or upgrade the plan.
- **Setup or syncs fail with HTTP 401, 402, 403 or 415**: The message includes Pipedrive's error text. A 415 means your company hasn't enabled a feature that the stream reads. Enable it in Pipedrive or deselect the stream. With an API token, a 401 can mean the token is incomplete, regenerated or disabled for the user. See Step 1. With OAuth, the connector first refreshes the access token once and retries. If a 401 remains, the authorisation has expired or been revoked. Re-authenticate the source. A 402 means the company account isn't active. A 403 can mean the connected user lacks permission for the data. It can also mean Cloudflare blocked requests after repeated rate-limit violations. With OAuth, "Scope and URL mismatch" means Airbyte's app lacks a scope. Deselect the stream and contact Airbyte support. For your own OAuth app, grant the scope in the Pipedrive Developer Hub and re-authenticate.
- **Syncs fail because Pipedrive answered with an HTML page instead of JSON**: After repeated rate-limit violations, Cloudflare blocks requests with an HTML page. Reduce the sync frequency and retry later. If the issue continues, Pipedrive may no longer serve an endpoint that the stream reads. Report it to Airbyte with the stream name. This message comes from `deal_flow`, `mail`, `product_variations`, `deal_products`, `deal_installments`, `projects`, `tasks`, `legacy_teams` and `permission_set_assignments`.

</details>

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

| Version | Date | Pull Request | Subject |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5.0.3 | 2026-11-10 | [91677](https://github.com/airbytehq/airbyte/pull/91677) | Update dependencies |
| 5.0.2 | 2026-11-03 | [90685](https://github.com/airbytehq/airbyte/pull/90685) | Update dependencies |
| 5.0.1 | 2026-11-02 | [90176](https://github.com/airbytehq/airbyte/pull/90176) | Mark the connector as certified |
| 5.0.0 | 2026-11-01 | [90177](https://github.com/airbytehq/airbyte/pull/90177) | Type the remaining date and time fields on nine streams and correct declared shapes on goals, leads, mailThreads and deal_fields; declare fields Pipedrive returns without documenting them |
| 4.2.1 | 2026-10-28 | [90148](https://github.com/airbytehq/airbyte/pull/90148) | Read `call_logs`, `product_variations` and `leads_archived` in the standard tests, fail `legacy_teams` when Pipedrive retires its endpoint instead of returning no records, and allow `null` on eight `mailThreads` fields the API reference marks nullable |
| 4.2.0 | 2026-10-28 | [85773](https://github.com/airbytehq/airbyte/pull/85773) | Add OAuth2.0 as the default authentication; existing API token configs move into `credentials` automatically |
| 4.1.3 | 2026-10-27 | [90008](https://github.com/airbytehq/airbyte/pull/90008) | Update dependencies |
| 4.1.2 | 2026-10-24 | [89714](https://github.com/airbytehq/airbyte/pull/89714) | Rebuild error handling for child and plan-gated streams as one handler per stream; an unexpected HTML page on those streams, such as an endpoint Pipedrive no longer serves, now fails the sync instead of reading as empty or being retried |
| 4.1.1 | 2026-10-20 | [89349](https://github.com/airbytehq/airbyte/pull/89349) | Update dependencies |
| 4.1.0 | 2026-10-14 | [88479](https://github.com/airbytehq/airbyte/pull/88479) | Add the `product_variations` and `leads_archived` streams, read everyone's goals and deleted projects, declare missing Pipedrive fields, send the API token in a header and fix error handling and paging gaps |
| 4.0.1 | 2026-10-13 | [88753](https://github.com/airbytehq/airbyte/pull/88753) | Update dependencies |
| 4.0.0 | 2026-10-06 | [87669](https://github.com/airbytehq/airbyte/pull/87669) | Correct declared field types to match the Pipedrive API reference (lead ids on notes and files are strings) and declare the missing vendor fields on mail, mailThreads, notes and permission_sets |
| 3.0.5 | 2026-10-06 | [87979](https://github.com/airbytehq/airbyte/pull/87979) | Update dependencies |
| 3.0.4 | 2026-09-29 | [87265](https://github.com/airbytehq/airbyte/pull/87265) | Update dependencies |
| 3.0.3 | 2026-09-22 | [86762](https://github.com/airbytehq/airbyte/pull/86762) | Update dependencies |
| 3.0.2 | 2026-09-15 | [86184](https://github.com/airbytehq/airbyte/pull/86184) | Update dependencies |
| 3.0.1 | 2026-09-14 | [85919](https://github.com/airbytehq/airbyte/pull/85919) | Test-only release: cover the streams the sandbox cannot populate with mock-server tests and make the 429 retry test deterministic |
| 3.0.0 | 2026-09-14 | [85812](https://github.com/airbytehq/airbyte/pull/85812) | Read `deals`, `persons`, `organizations`, `activities`, `products`, `pipelines`, `stages` and `deal_products` from Pipedrive API v2, add the `deals_archived` stream, read `notes`, `files`, `filters`, `users` and `leads` from their list endpoints instead of Recents, add primary keys to twelve streams, type the date fields and expose deleted deals |
| 2.6.0 | 2026-09-10 | [85775](https://github.com/airbytehq/airbyte/pull/85775) | Add the `call_logs`, `lead_sources`, `legacy_teams`, `projects`, `tasks`, `deal_installments`, `deal_flow` and `permission_set_assignments` streams |
| 2.5.0 | 2026-09-10 | [85772](https://github.com/airbytehq/airbyte/pull/85772) | Throttle requests to Pipedrive's burst limit with one shared API budget and add the `num_workers` option for parallel streams |
| 2.4.7 | 2026-09-10 | [85774](https://github.com/airbytehq/airbyte/pull/85774) | Make Start Date optional with a default, rewrite the spec tooltips and migrate pre-2.0.0 configurations automatically |
| 2.4.6 | 2026-09-09 | [85770](https://github.com/airbytehq/airbyte/pull/85770) | Classify Pipedrive HTTP errors, wait on `x-ratelimit-reset` for 429s and skip inaccessible parent records in `deal_products` and `mail` |
| 2.4.5 | 2026-09-09 | [85767](https://github.com/airbytehq/airbyte/pull/85767) | Restructure the documentation and add contributor guides |
| 2.4.4 | 2026-09-09 | [85763](https://github.com/airbytehq/airbyte/pull/85763) | Set the heartbeat timeout, add a CODEOWNERS entry and tidy the changelog |
| 2.4.3 | 2026-09-09 | [85764](https://github.com/airbytehq/airbyte/pull/85764) | Use the `currencies` stream for the connection check and add suggested streams |
| 2.4.2 | 2026-09-09 | [85766](https://github.com/airbytehq/airbyte/pull/85766) | Make pagination null-safe for responses without `additional_data`, fixing the `mail` stream |
| 2.4.1 | 2026-09-09 | [85762](https://github.com/airbytehq/airbyte/pull/85762) | Fix `components.py` import failure on Python 3.11+ (use `default_factory` for decoder) and move to SDM 7.28.3 |
| 2.4.0 | 2025-02-28 | [54716](https://github.com/airbytehq/airbyte/pull/54716) | Refactor: Optimize Parameters, remove redundant code and Improve Manifest Readability |
| 2.3.8 | 2025-02-22 | [47292](https://github.com/airbytehq/airbyte/pull/47292) | Migrate to manifest only format |
| 2.3.7 | 2025-02-08 | [53488](https://github.com/airbytehq/airbyte/pull/53488) | Update dependencies |
| 2.3.6 | 2025-02-01 | [52986](https://github.com/airbytehq/airbyte/pull/52986) | Update dependencies |
| 2.3.5 | 2025-01-25 | [52477](https://github.com/airbytehq/airbyte/pull/52477) | Update dependencies |
| 2.3.4 | 2025-01-18 | [51922](https://github.com/airbytehq/airbyte/pull/51922) | Update dependencies |
| 2.3.3 | 2025-01-11 | [51305](https://github.com/airbytehq/airbyte/pull/51305) | Update dependencies |
| 2.3.2 | 2025-01-04 | [50929](https://github.com/airbytehq/airbyte/pull/50929) | Update dependencies |
| 2.3.1 | 2024-12-28 | [50288](https://github.com/airbytehq/airbyte/pull/50288) | Update dependencies |
| 2.3.0 | 2024-12-17 | [48615](https://github.com/airbytehq/airbyte/pull/48615) | Update airbyte-cdk to use concurrency |
| 2.2.28 | 2024-12-14 | [49692](https://github.com/airbytehq/airbyte/pull/49692) | Update dependencies |
| 2.2.27 | 2024-12-12 | [49041](https://github.com/airbytehq/airbyte/pull/49041) | Make the Docker image rootless (requires Airbyte platform 0.64 or later) |
| 2.2.26 | 2024-11-04 | [48293](https://github.com/airbytehq/airbyte/pull/48293) | Update dependencies |
| 2.2.25 | 2024-10-29 | [47743](https://github.com/airbytehq/airbyte/pull/47743) | Update dependencies |
| 2.2.24 | 2024-10-28 | [47103](https://github.com/airbytehq/airbyte/pull/47103) | Update dependencies |
| 2.2.23 | 2024-10-12 | [46822](https://github.com/airbytehq/airbyte/pull/46822) | Update dependencies |
| 2.2.22 | 2024-10-05 | [46487](https://github.com/airbytehq/airbyte/pull/46487) | Update dependencies |
| 2.2.21 | 2024-09-28 | [46132](https://github.com/airbytehq/airbyte/pull/46132) | Update dependencies |
| 2.2.20 | 2024-09-21 | [45748](https://github.com/airbytehq/airbyte/pull/45748) | Update dependencies |
| 2.2.19 | 2024-09-14 | [45556](https://github.com/airbytehq/airbyte/pull/45556) | Update dependencies |
| 2.2.18 | 2024-09-07 | [45303](https://github.com/airbytehq/airbyte/pull/45303) | Update dependencies |
| 2.2.17 | 2024-08-31 | [44981](https://github.com/airbytehq/airbyte/pull/44981) | Update dependencies |
| 2.2.16 | 2024-08-24 | [44644](https://github.com/airbytehq/airbyte/pull/44644) | Update dependencies |
| 2.2.15 | 2024-08-17 | [44316](https://github.com/airbytehq/airbyte/pull/44316) | Update dependencies |
| 2.2.14 | 2024-08-12 | [43888](https://github.com/airbytehq/airbyte/pull/43888) | Update dependencies |
| 2.2.13 | 2024-08-10 | [43679](https://github.com/airbytehq/airbyte/pull/43679) | Update dependencies |
| 2.2.12 | 2024-08-03 | [43056](https://github.com/airbytehq/airbyte/pull/43056) | Update dependencies |
| 2.2.11 | 2024-07-27 | [42287](https://github.com/airbytehq/airbyte/pull/42287) | Update dependencies |
| 2.2.10 | 2024-07-13 | [41729](https://github.com/airbytehq/airbyte/pull/41729) | Update dependencies |
| 2.2.9 | 2024-07-10 | [41465](https://github.com/airbytehq/airbyte/pull/41465) | Update dependencies |
| 2.2.8 | 2024-07-09 | [41082](https://github.com/airbytehq/airbyte/pull/41082) | Update dependencies |
| 2.2.7 | 2024-07-06 | [40778](https://github.com/airbytehq/airbyte/pull/40778) | Update dependencies |
| 2.2.6 | 2024-06-25 | [40501](https://github.com/airbytehq/airbyte/pull/40501) | Update dependencies |
| 2.2.5 | 2024-06-22 | [40171](https://github.com/airbytehq/airbyte/pull/40171) | Update dependencies |
| 2.2.4 | 2024-06-04 | [39095](https://github.com/airbytehq/airbyte/pull/39095) | [autopull] Upgrade base image to v1.2.1 |
| 2.2.3 | 2024-05-20 | [38405](https://github.com/airbytehq/airbyte/pull/38405) | [autopull] base image + poetry + up_to_date |
| 2.2.2 | 2024-01-11 | [34153](https://github.com/airbytehq/airbyte/pull/34153) | prepare for airbyte-lib |
| 2.2.1 | 2023-11-06 | [31147](https://github.com/airbytehq/airbyte/pull/31147) | Bugfix: handle records with a null data field |
| 2.2.0 | 2023-10-25 | [31707](https://github.com/airbytehq/airbyte/pull/31707) | Add new stream mail |
| 2.1.0 | 2023-10-10 | [31184](https://github.com/airbytehq/airbyte/pull/31184) | Add new stream goals |
| 2.0.1 | 2023-10-13 | [31151](https://github.com/airbytehq/airbyte/pull/31151) | Add additionalProperties in schemas to read custom fields |
| 2.0.0 | 2023-08-09 | [29293](https://github.com/airbytehq/airbyte/pull/29293) | Migrated to Low-Code CDK |
| 1.0.0 | 2023-06-29 | [27832](https://github.com/airbytehq/airbyte/pull/27832) | Remove `followers_count` field from `Products` stream |
| 0.1.19 | 2023-07-05 | [27967](https://github.com/airbytehq/airbyte/pull/27967) | Update `OrganizationFields` and `ProductFields` with `display_field` field |
| 0.1.18 | 2023-06-02 | [26892](https://github.com/airbytehq/airbyte/pull/26892) | Update `DialFields` schema with `pipeline_ids` property |
| 0.1.17 | 2023-03-21 | [24282](https://github.com/airbytehq/airbyte/pull/24282) | Bugfix handle missed `cursor_field` |
| 0.1.16 | 2023-03-08 | [23789](https://github.com/airbytehq/airbyte/pull/23789) | Add 11 new streams |
| 0.1.15 | 2023-03-02 | [23705](https://github.com/airbytehq/airbyte/pull/23705) | Disable OAuth |
| 0.1.14 | 2023-03-01 | [23539](https://github.com/airbytehq/airbyte/pull/23539) | Fix schema for "activities", "check" works if empty "deals" |
| 0.1.13 | 2022-09-16 | [16799](https://github.com/airbytehq/airbyte/pull/16799) | Migrate to per-stream state |
| 0.1.12 | 2022-05-23 | [13082](https://github.com/airbytehq/airbyte/pull/13082) | Remove date-time format from schemas |
| 0.1.11 | 2022-05-16 | [12867](https://github.com/airbytehq/airbyte/pull/12867) | Add unit tests |
| 0.1.10 | 2022-04-26 | [11870](https://github.com/airbytehq/airbyte/pull/11870) | Add 3 streams: DealFields, OrganizationFields and PersonFields |
| 0.1.9 | 2021-12-07 | [8582](https://github.com/airbytehq/airbyte/pull/8582) | Update connector fields title/description |
| 0.1.8 | 2021-11-16 | [7875](https://github.com/airbytehq/airbyte/pull/7875) | Extend schema for "persons" stream |
| 0.1.7 | 2021-11-15 | [7968](https://github.com/airbytehq/airbyte/pull/7968) | Update oAuth flow config |
| 0.1.6 | 2021-10-05 | [6821](https://github.com/airbytehq/airbyte/pull/6821) | Add OAuth support |
| 0.1.5 | 2021-09-27 | [6441](https://github.com/airbytehq/airbyte/pull/6441) | Fix normalization error |
| 0.1.4 | 2021-08-26 | [5943](https://github.com/airbytehq/airbyte/pull/5943) | Add organizations stream |
| 0.1.3 | 2021-08-26 | [5642](https://github.com/airbytehq/airbyte/pull/5642) | Remove date-time from deals stream |
| 0.1.2 | 2021-07-23 | [4912](https://github.com/airbytehq/airbyte/pull/4912) | Update money type to support floating point |
| 0.1.1 | 2021-07-19 | [4686](https://github.com/airbytehq/airbyte/pull/4686) | Update spec.json |
| 0.1.0 | 2021-07-19 | [4686](https://github.com/airbytehq/airbyte/pull/4686) | 🎉 New source: Pipedrive connector |
