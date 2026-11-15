---
generated_record: true
connector_name: Linear
connector_type: source
connector_slug: linear
connector_directory: source-linear
definition_id: 1c5d8316-ed42-4473-8fbc-2626f03f070c
version: 1.0.3
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/linear
logo: /images/connectors/sources/linear.svg
logo_source_path: airbyte-integrations/connectors/source-linear/icon.svg
logo_sha256: e683e95a5eb9b360ae06360c0350fd1b5fcf3d2222ef9de8e71fa0bc413dccc3
original_metadata_path: airbyte-integrations/connectors/source-linear/metadata.yaml
original_metadata_sha256: 350c5c09cc777f198bbd94c74c17a95442bd29ec007c3ee14d3cce7bf242f52e
original_document_path: docs/integrations/sources/linear.md
original_document_sha256: ae7a685a8b56993e3f2263106c51ab829e4e54cecbe2413173a7e0e4011cfde0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4b5ee4ac89e2eabd447ea69e3f132fde50ad6bd1bcee50afe6f2e5318411dc09
rewritten_at: 2026-11-12T13:46:29.884596+00:00
---

# Linear

<HideInUI>

Use this page to set up the [Linear](https://linear.app/) source connector and find reference information.

</HideInUI>

[Linear](https://linear.app/) helps software teams manage projects and track issues. Its streamlined interface supports issues, sprints and product roadmaps, focusing on speed and simplicity.

## Prerequisites

- A Linear account
- One of these authentication methods:
  - **OAuth 2.0 (Airbyte Cloud)**: A Linear workspace administrator account permitted to authorise the required workspace data. Airbyte supplies the OAuth application.
  - **OAuth 2.0 (Self-managed)**: A Linear OAuth application, client ID and client secret. You also need a Linear workspace administrator account permitted to authorise the required workspace data. The connector installs the app at workspace level.
  - **API Key**: A Linear personal API key.
- To sync the `customers`, `customer_needs`, `customer_statuses` and `customer_tiers` streams, enable Linear's Customer Requests feature in your workspace. OAuth connections also need the `customer:read` scope. API keys don't use scopes. See [Customer Requests streams](#customer-requests-streams).

## Setup guide

## Set up Linear

The Linear source connector supports OAuth 2.0 and API key authentication. From connector version `0.2.19`, the setup form selects OAuth 2.0 by default.

### OAuth 2.0

1. Airbyte supplies the OAuth application for Airbyte Cloud. For a self-managed deployment, create a [Linear OAuth application](https://linear.app/settings/api/applications/new).
2. For a self-managed deployment, add the displayed Airbyte OAuth callback URL to the application's redirect URLs. Linear rejects authorisation requests when the app doesn't register the `redirect_uri`. Copy the application's client ID and client secret.
3. In Airbyte, choose **OAuth 2.0**. For self-managed deployments, enter your Linear application's client ID and client secret. Then complete the authorisation flow.
4. Linear access tokens last 24 hours, and the connector refreshes them automatically. Each refresh returns a new refresh token, which the connector stores in the source configuration. Linear rotates the refresh token after every exchange. The previous token then stops working, except during a short replay window for retrying interrupted refreshes.

The connector requests the `read`, `customer:read` and `initiative:read` scopes. It authorises through Linear's [actor authorization](https://linear.app/developers/oauth-actor-authorization) (`actor=app`), installing the app in the workspace. It doesn't act as the person who approved it. Linear treats `customer:read` as an app-only scope and requires administrator permission to install an app. A workspace administrator must therefore complete the authorisation.

If your Airbyte deployment doesn't provide browser-based OAuth, complete Linear's [authorization code flow](https://linear.app/developers/oauth-2-0-authentication) yourself. Then use the resulting refresh token:

1. Open `https://linear.app/oauth/authorize?client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&response_type=code&state=<STATE>&scope=read,customer:read,initiative:read&actor=app&prompt=consent` in a browser and approve the app. Generate a random `state` value and verify it on the callback to prevent CSRF. The `prompt=consent` parameter makes Linear display the consent screen. Linear redirects to your redirect URI with a `code` parameter.
2. Exchange the code for tokens. Send a form-encoded `POST` request to `https://api.linear.app/oauth/token` with `code`, `redirect_uri`, `client_id`, `client_secret` and `grant_type=authorization_code`.
3. Copy the response's `refresh_token` into the connector configuration. The connector uses it to create access tokens, which expire after 24 hours. The first refresh replaces this token. Don't reuse it in another source or save a copy for later.

### API key

1. Sign in to your [Linear](https://linear.app/) account.
2. Select your workspace name in the sidebar to open **Settings**.
3. Select **Security & access** from the settings menu.
4. Go to the **Personal API keys** section.
5. Click **Create key** and give the key a descriptive label, such as `airbyte`. Then click **Create**.
6. Copy and securely store the API key. Linear displays it only once.

The API key inherits your workspace permissions. The connector can only sync data you can view in Linear.

For more information, see the [Linear GraphQL API documentation](https://linear.app/developers/graphql).

## Set up the connector in Airbyte

1. In the Airbyte UI, go to **Sources** and click **+ New source**.
2. Select **Linear** from the available sources.
3. Enter your chosen **Source name**.
4. For **Authentication**, choose **OAuth 2.0**, the default, or **API Key**.
5. Enter the credentials required for your authentication method.
6. Optionally, enter a **Start Date** in ISO 8601 format, such as `2024-01-01T00:00:00.000Z`. Supporting incremental streams replicate only records updated on or after this date. Leave this field empty to default to two years before the first sync.
7. Optionally, adjust the **Number of concurrent workers**. The default is 4, with a range of 1–10. Higher values accelerate syncs but increase the risk of reaching Linear's rate limits. OAuth allows 5,000 requests hourly, compared with 2,500 for API keys. However, its hourly complexity budget is lower: 2,000,000 instead of 3,000,000. This connector uses GraphQL, so complexity is usually the binding limit. Increase this value only after confirming available headroom.
8. Click **Set up source** and wait for the connection test to finish.

Existing Linear API key connections continue using API key authentication after upgrading to connector version `0.2.1` or later. If an API key connection upgraded to `0.2.0` stops passing connection checks, upgrade to `0.2.1` or later.

## Supported sync modes

The Linear source connector supports these sync modes:

- [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite)
- [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped)

Incremental streams use the `updatedAt` field as their cursor. Your configured Start Date sets the lower bound for the first incremental sync. Later syncs use the previous sync's latest `updatedAt` value as the new lower bound.

The lower bound is inclusive. Records matching the stored `updatedAt` exactly are read again during the next sync. The overlap increases after a failed sync. Each stream has its own cursor, which advances only when that stream finishes. After interruption, a stream rereads everything updated since its last successful run. Streams completed before the failure keep their new cursor and remain unaffected. In **Incremental - Append + Deduped** mode, the destination collapses repeated records. In **Incremental - Append** mode, they become extra rows. Deduplicate downstream by primary key if needed.

Some streams only support full refresh because Linear's GraphQL API provides no filter for requesting updated records alone. These are `project_statuses`, `issue_relations`, `customer_statuses`, `customer_tiers` and `initiative_to_projects`. `issue_history` only supports full refresh for another reason. Linear exposes history through each issue, so the connector reads issues individually. See [Issue history](#issue-history).

## Supported streams

The Linear source connector supports the following streams. Incremental streams use `updatedAt` as the cursor field.

| Stream | Incremental | Description |
| ------ | :---------: | ----------- |
| `attachments` | Yes | File and link attachments on issues. |
| `comments` | Yes | Comments posted on issues. |
| `customer_needs` | Yes | Customer needs associated with issues. |
| `customers` | Yes | Customer records tracked in Linear's customer requests feature. |
| `customer_statuses` | No | Status definitions for customer records. |
| `customer_tiers` | No | Tier definitions for customer records. |
| `cycles` | Yes | Cycles (sprints) for each team. |
| `initiatives` | Yes | Strategic initiatives tracked across projects. |
| `initiative_to_projects` | No | Relationships between initiatives and projects. |
| `issue_history` | No | Changes made to issues over time. |
| `issue_labels` | Yes | Labels that can be applied to issues. |
| `issue_relations` | No | Relationships between issues (for example, blocks and duplicates). |
| `issues` | Yes | Issues in every team. |
| `project_milestones` | Yes | Milestones defined inside projects. |
| `project_statuses` | No | Status definitions for projects. |
| `project_updates` | Yes | Updates posted for projects. |
| `projects` | Yes | Projects across all teams. |
| `teams` | Yes | Teams in your Linear workspace. |
| `users` | Yes | Users in your Linear workspace. |
| `workflow_states` | Yes | Workflow states (for example, Todo, In Progress, Done) defined by each team. |

From connector version `0.2.16`, new connections preselect `issues`, `projects`, `teams`, `users`, `comments`, `cycles`, `issue_labels` and `workflow_states`. Enable any other streams you need. Existing connections keep their selected streams.

### Customer Requests streams

The `customers`, `customer_needs`, `customer_statuses` and `customer_tiers` streams read Linear's Customer Requests data. An administrator must enable Customer Requests in [Workspace Settings > Customer requests](https://linear.app/settings/customers) before your workspace has data to sync. OAuth connections also need the `customer:read` scope. Those settings also define customer tiers. The `customer_tiers` stream remains empty until someone configures tiers.

:::caution Behaviour change in `0.2.23`
Before `0.2.23`, the connector reported refused Customer Requests queries as successful, with zero records. From `0.2.23`, the sync fails and includes Linear's reason for refusing the query. If Customer Requests isn't enabled, deselect `customers`, `customer_needs`, `customer_statuses` and `customer_tiers` in the connection's schema tab. See [Syncs fail on errors Linear returns in the response body](#syncs-fail-on-errors-linear-returns-in-the-response-body).
:::

See Linear's [Customer Requests documentation](https://linear.app/docs/customer-requests) for details.

### Initiative streams

The `initiatives` and `initiative_to_projects` streams require Linear's `initiative:read` scope. Connector version `0.4.0` requests it. However, Linear grants scopes during authorisation, so OAuth sources created before `0.4.0` have tokens without it. If either stream fails with `Invalid scope: initiative:read ... required for app user to read initiative data`, a workspace administrator must re-authenticate it under Sources > your source > Settings. API key sources aren't affected.

### Issue history

`issue_history` is the only stream read through a parent stream. Each sync pages through every issue. It then queries each issue separately for its history, retrieving 50 entries per page. This has two consequences:

- Request volume and sync time depend on your issue count, not changes since the previous sync. These queries share the hourly request and complexity budgets used by every other stream. In workspaces with many issues, this stream can slow all other streams in the connection. See [Rate limiting](#rate-limiting).
- The stream has no cursor, so every sync returns the complete history. Use **Full Refresh - Overwrite** mode unless you need repeated records. In **Full Refresh - Append** mode, every sync appends another complete copy.

The connector reads parent issues directly. You don't need to select `issues` to sync `issue_history`. Each history record includes an `issueId` field added from the parent issue. Linear's response doesn't include this field. Together, `issueId` and `id` form the primary key.

### Archived records

Linear hides archived records from API responses by default instead of deleting them. It automatically archives completed issues, cycles and projects over time. Deletion is separate, as described in [Limitations & Troubleshooting](#limitations--troubleshooting) below. From connector version `0.3.0`, every stream requests archived records. They sync alongside active records. Each record's `archivedAt` field contains its archive time and is `null` while active.

Before `0.3.0`, the connector didn't request archived records. Linear omitted them from every response, and `archivedAt` was always `null`. Upgrading changes your sync results:

- Full-refresh streams return all archived records during the next sync. Established workspaces may see a large, one-off volume increase.
- Incremental streams return archived records only when their `updatedAt` value is later than the stream's cursor. Records archived from now on qualify. Records archived before upgrading usually don't because their `updatedAt` predates the cursor. To retrieve them, [refresh the stream](https://docs.airbyte.com/platform/operator-guides/refreshes).

### Date and timestamp columns

From connector version `1.0.0`, the connector declares `date` and `date-time` formats for Linear's temporal fields. Destinations therefore create date and timestamp columns instead of strings. `issues.dueDate`, `projects.startDate`, `projects.targetDate`, `project_milestones.targetDate`, `initiatives.targetDate`, `issue_history.fromDueDate` and `issue_history.toDueDate` become date columns. Linear stores them as calendar dates without times. Every other temporal field becomes a timestamp column, including `createdAt`, `updatedAt` and `archivedAt`.

This changes existing destination column types. After upgrading, refresh the source schema and clear the affected streams. Update downstream models that cast these columns from strings. See the [Linear migration guide](/integrations/sources/linear-migrations#upgrading-to-100).

### Deprecated Linear fields

Version `1.0.0` stops requesting these deprecated Linear fields: `users.inviteHash`, `users.calendarHash`, `teams.inviteHash`, `teams.private`, `teams.markedAsDuplicateWorkflowState`, its derived `teams.markedAsDuplicateWorkflowStateId`, and `customer_statuses.type`. After upgrading, those columns stop receiving values.

The `teams` stream provides `visibility` instead of `private`. It's a string, not a boolean, with three possible values. `public` identifies teams visible to every workspace member. `private` identifies teams visible only to their members. `restricted` identifies a non-private team within a private team's boundary. A `restricted` team isn't private. Write downstream logic as `visibility = 'private'` instead of treating every value except `public` as private.

## Limitations and troubleshooting

### Rate limits

The Linear API applies rate limits through a leaky bucket algorithm. From connector version `0.2.22`, the connector paces requests below your authentication method's hourly request limit. It distributes requests across the hour instead of sending bursts. The connector also detects API rate-limit errors and automatically waits until the rate-limit window resets. This reactive delay remains important because other applications may consume quota through the same credentials. The connector can't see that usage or track query complexity. Syncs may slow during pacing or backoff periods, but they resume without manual intervention.

Linear applies three types of rate limit:

- **Request limits**: API key authentication allows 2,500 requests per user each hour. OAuth app authentication allows 5,000. All requests from the same user share this quota.
- **Endpoint-specific limits**: Some queries have lower per-endpoint limits. When reached, the connector follows the `X-RateLimit-Endpoint-Requests-Reset` header.
- **Complexity limits**: Query complexity depends on the requested field count and pagination depth. A single query can use at most 10,000 points. The hourly budget is 3,000,000 points for API keys and 2,000,000 for OAuth. This connector uses GraphQL, so complexity usually becomes binding before request count.

Workspace-level OAuth applications receive dynamically higher limits based on paid seat numbers. For more information, see the [Linear rate limiting documentation](https://linear.app/developers/rate-limiting).

### OAuth authorisation fails

If an OAuth source starts returning an authorisation error, re-authenticate it from its settings page. This issues a new refresh token. Linear rotates the refresh token whenever the connector exchanges it. A source permanently breaks if an older value replaces its stored token. Don't restore an earlier source configuration or use the same refresh token for multiple sources.

Connector versions before `1.0.1` contained a bug preventing Airbyte Cloud from storing rotated refresh tokens. The connector added an empty `api_key` field to OAuth configurations. Airbyte Cloud rejects configuration updates containing an empty secret. An OAuth source therefore worked until its first token refresh. Every later sync then failed with Linear's `Refresh token revoked` error. If this happens, upgrade to `1.0.1` or later and re-authenticate once. You don't need any other changes. API key sources weren't affected.

### Connection tests only read issues

The connection test queries the `issues` stream. It confirms Linear accepts your credentials but doesn't test other streams. Credentials without access to Customer Requests data still pass. The problem appears only when a sync reads those streams.

### Data availability

The connector retrieves only data visible to its credentials. With API key authentication, that's everything visible to the key's owner in Linear. With OAuth, it's everything visible to the installed workspace app. If synced teams, projects or issues are missing, first check their Linear permissions.

### Deleted records remain in your destination

When you delete a Linear issue or project, it stays in the team's **Recently deleted** tab for 30 days. Linear then permanently removes it. The `issues`, `projects`, `initiatives` and `issue_history` streams include a `trashed` field for this state. You can use it to filter these records downstream. No other stream exposes `trashed`.

After Linear permanently removes a record, the API no longer reports it. Airbyte doesn't delete previously written rows, so the destination retains it. To find rows missing from Linear, compare a full stream refresh with your destination table.

### Response-body errors fail syncs

Linear's GraphQL API often reports problems in the response body instead of the HTTP status code. From version `0.2.23`, a sync fails when this response contains errors and no usable data. Responses the connector retries are excluded. Before `0.2.23`, the connector discarded these errors and treated the response as an empty, successful stream. A previously successful connection may therefore start failing after upgrading, even when nothing changed in Linear.

Each failure includes Linear's explanation. Use that text to choose your next step:

- **Rejected credentials**: Check that your API key still exists under **Settings** > **Security & access** > **Personal API keys** in Linear. Alternatively, re-authenticate an OAuth source to issue a new refresh token.
- **Denied access to data or to a feature your workspace doesn't have**: Give the credentials access to that Linear data, or deselect the stream. Customer Requests streams are the most common cause. See [Customer Requests streams](#customer-requests-streams).
- **An invalid query**: This indicates a connector defect, not a configuration problem. Report it to Airbyte support.

Responses containing errors and usable records still sync. If Linear returns partial results, the connector keeps the received records.

The connector retries request timeouts and Linear's 5xx responses. They fail a sync only when they persist. Rejected credentials, denied access and invalid queries fail immediately, regardless of their status code.

### Programmatic configuration

This connector uses the [Linear GraphQL API](https://linear.app/developers/graphql). Every API request uses the `https://api.linear.app/graphql` endpoint.

For programmatic configuration, use these parameter names:

| Field | Required | Description |
| ----- | :------: | ----------- |
| `credentials.auth_type` | Yes | Authentication method. Valid values are `API Key` and `OAuth2.0`. |
| `credentials.api_key` | Required for API key authentication | Linear personal API key. |
| `credentials.client_id` | Required for OAuth 2.0 authentication | Client ID of your Linear OAuth app. |
| `credentials.client_secret` | Required for OAuth 2.0 authentication | Client secret of your Linear OAuth app. |
| `credentials.refresh_token` | Required for OAuth 2.0 authentication | Refresh token returned by the Linear OAuth flow. |
| `start_date` | No | UTC date and time in ISO 8601 format. Records updated before this date aren't replicated for streams that support incremental sync. If unset, defaults to two years before the first sync. |
| `num_workers` | No | Number of worker threads used to read streams in parallel (default 4, range 1–10). Higher values speed up syncs but increase the risk of hitting rate limits. |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| ------- | ---- | ------------ | ------- |
| 1.0.3 | 2026-09-15 | [85560](https://github.com/airbytehq/airbyte/pull/85560) | Update dependencies |
| 1.0.2 | 2026-09-10 | [85793](https://github.com/airbytehq/airbyte/pull/85793) | Promote to certified support level |
| 1.0.1 | 2026-09-09 | [85789](https://github.com/airbytehq/airbyte/pull/85789) | Fix bug in config migration that prevented rotated refresh tokens from being persisted |
| 1.0.0 | 2026-08-28 | [85095](https://github.com/airbytehq/airbyte/pull/85095) | Breaking: declare `date` and `date-time` formats on every temporal field, and drop the fields Linear deprecated in the `users`, `teams`, and `customer_statuses` queries (`teams.visibility` replaces `teams.private`). See the [migration guide](/integrations/sources/linear-migrations#upgrading-to-100). |
| 0.4.0 | 2026-08-27 | [85056](https://github.com/airbytehq/airbyte/pull/85056) | Add initiatives, initiative-to-project relationships, project updates, and issue history streams |
| 0.3.1 | 2026-08-26 | [85053](https://github.com/airbytehq/airbyte/pull/85053) | Add regression tests covering incremental cursor boundary behavior |
| 0.3.0 | 2026-08-26 | [84950](https://github.com/airbytehq/airbyte/pull/84950) | Sync archived records in every stream and declare `archivedAt` (plus `trashed` on `issues` and `projects`) in the stream schemas |
| 0.2.23 | 2026-08-25 | [84949](https://github.com/airbytehq/airbyte/pull/84949) | Classify Linear GraphQL errors: surface actionable config errors for invalid credentials, fail fast on invalid queries, and fail any response carrying a GraphQL `errors` array instead of reporting it as a successful empty stream |
| 0.2.22 | 2026-08-25 | [84954](https://github.com/airbytehq/airbyte/pull/84954) | Add proactive rate-limit pacing for Linear API requests |
| 0.2.21 | 2026-08-24 | [84947](https://github.com/airbytehq/airbyte/pull/84947) | Fix OAuth consent scope encoding and persist the access token issued during authorization. |
| 0.2.20 | 2026-08-24 | [84947](https://github.com/airbytehq/airbyte/pull/84947) | Persist rotated OAuth refresh tokens so OAuth connections keep working after the first token refresh. |
| 0.2.19 | 2026-08-24 | [84947](https://github.com/airbytehq/airbyte/pull/84947) | Make OAuth 2.0 the default authentication method in the connector setup form |
| 0.2.18 | 2026-08-21 | [84948](https://github.com/airbytehq/airbyte/pull/84948) | Clarify authentication field titles and descriptions in the connector setup form. |
| 0.2.17 | 2026-08-21 | [84951](https://github.com/airbytehq/airbyte/pull/84951) | Enable acceptance test suites with GSM test secrets for API key and OAuth |
| 0.2.16 | 2026-08-21 | [84944](https://github.com/airbytehq/airbyte/pull/84944) | Add suggested streams so new connections pre-select core streams and exclude Customer Requests streams |
| 0.2.15 | 2026-08-21 | [84946](https://github.com/airbytehq/airbyte/pull/84946) | Update base image and declare a heartbeat timeout |
| 0.2.14 | 2026-08-18 | [84676](https://github.com/airbytehq/airbyte/pull/84676) | Update dependencies |
| 0.2.13 | 2026-08-11 | [84025](https://github.com/airbytehq/airbyte/pull/84025) | Update dependencies |
| 0.2.12 | 2026-08-04 | [83528](https://github.com/airbytehq/airbyte/pull/83528) | Update dependencies |
| 0.2.11 | 2026-07-28 | [82981](https://github.com/airbytehq/airbyte/pull/82981) | Update dependencies |
| 0.2.10 | 2026-07-21 | [82509](https://github.com/airbytehq/airbyte/pull/82509) | Update dependencies |
| 0.2.9 | 2026-07-14 | [81930](https://github.com/airbytehq/airbyte/pull/81930) | Update dependencies |
| 0.2.8 | 2026-06-30 | [81147](https://github.com/airbytehq/airbyte/pull/81147) | Update dependencies |
| 0.2.7 | 2026-06-23 | [80554](https://github.com/airbytehq/airbyte/pull/80554) | Update dependencies |
| 0.2.6 | 2026-06-16 | [79947](https://github.com/airbytehq/airbyte/pull/79947) | Update dependencies |
| 0.2.5 | 2026-06-10 | [78237](https://github.com/airbytehq/airbyte/pull/78237) | fix(source-linear): Handle GraphQL rate-limit errors |
| 0.2.4 | 2026-06-09 | [79388](https://github.com/airbytehq/airbyte/pull/79388) | Update dependencies |
| 0.2.3 | 2026-06-02 | [78816](https://github.com/airbytehq/airbyte/pull/78816) | Update dependencies |
| 0.2.2 | 2026-05-18 | [78160](https://github.com/airbytehq/airbyte/pull/78160) | Promote release candidate to GA |
| 0.2.1 | 2026-05-12 | [78013](https://github.com/airbytehq/airbyte/pull/78013) | Fix API key config migration for existing connections |
| 0.2.0 | 2026-05-11 | [77578](https://github.com/airbytehq/airbyte/pull/77578) | Add OAuth 2.0 authentication |
| 0.1.2 | 2026-04-28 | [77318](https://github.com/airbytehq/airbyte/pull/77318) | Update dependencies |
| 0.1.1 | 2026-04-21 | [76654](https://github.com/airbytehq/airbyte/pull/76654) | Update dependencies |
| 0.1.0 | 2026-04-17 | [76429](https://github.com/airbytehq/airbyte/pull/76429) | Add incremental sync support for 12 streams using the `updatedAt` cursor field |
| 0.0.36 | 2026-03-31 | [75720](https://github.com/airbytehq/airbyte/pull/75720) | Update dependencies |
| 0.0.35 | 2026-03-17 | [75023](https://github.com/airbytehq/airbyte/pull/75023) | Update dependencies |
| 0.0.34 | 2026-03-03 | [74239](https://github.com/airbytehq/airbyte/pull/74239) | Update dependencies |
| 0.0.33 | 2026-02-10 | [73035](https://github.com/airbytehq/airbyte/pull/73035) | Update dependencies |
| 0.0.32 | 2026-02-03 | [72748](https://github.com/airbytehq/airbyte/pull/72748) | Update dependencies |
| 0.0.31 | 2026-01-21 | [72240](https://github.com/airbytehq/airbyte/pull/72240) | fix(linear): icon |
| 0.0.30 | 2026-01-20 | [72027](https://github.com/airbytehq/airbyte/pull/72027) | Update dependencies |
| 0.0.29 | 2026-01-14 | [71489](https://github.com/airbytehq/airbyte/pull/71489) | Update dependencies |
| 0.0.28 | 2025-12-18 | [70775](https://github.com/airbytehq/airbyte/pull/70775) | Update dependencies |
| 0.0.27 | 2025-11-25 | [70007](https://github.com/airbytehq/airbyte/pull/70007) | Update dependencies |
| 0.0.26 | 2025-11-18 | [69442](https://github.com/airbytehq/airbyte/pull/69442) | Update dependencies |
| 0.0.25 | 2025-10-29 | [68966](https://github.com/airbytehq/airbyte/pull/68966) | Update dependencies |
| 0.0.24 | 2025-10-21 | [68296](https://github.com/airbytehq/airbyte/pull/68296) | Update dependencies |
| 0.0.23 | 2025-10-14 | [68027](https://github.com/airbytehq/airbyte/pull/68027) | Update dependencies |
| 0.0.22 | 2025-10-07 | [67519](https://github.com/airbytehq/airbyte/pull/67519) | Update dependencies |
| 0.0.21 | 2025-09-30 | [66807](https://github.com/airbytehq/airbyte/pull/66807) | Update dependencies |
| 0.0.20 | 2025-09-24 | [66655](https://github.com/airbytehq/airbyte/pull/66655) | Update dependencies |
| 0.0.19 | 2025-09-09 | [65897](https://github.com/airbytehq/airbyte/pull/65897) | Update dependencies |
| 0.0.18 | 2025-08-23 | [65391](https://github.com/airbytehq/airbyte/pull/65391) | Update dependencies |
| 0.0.17 | 2025-08-09 | [64629](https://github.com/airbytehq/airbyte/pull/64629) | Update dependencies |
| 0.0.16 | 2025-08-02 | [64275](https://github.com/airbytehq/airbyte/pull/64275) | Update dependencies |
| 0.0.15 | 2025-07-26 | [63892](https://github.com/airbytehq/airbyte/pull/63892) | Update dependencies |
| 0.0.14 | 2025-07-19 | [63518](https://github.com/airbytehq/airbyte/pull/63518) | Update dependencies |
| 0.0.13 | 2025-07-12 | [63095](https://github.com/airbytehq/airbyte/pull/63095) | Update dependencies |
| 0.0.12 | 2025-07-05 | [62601](https://github.com/airbytehq/airbyte/pull/62601) | Update dependencies |
| 0.0.11 | 2025-06-28 | [62178](https://github.com/airbytehq/airbyte/pull/62178) | Update dependencies |
| 0.0.10 | 2025-06-26 | [61417](https://github.com/airbytehq/airbyte/pull/61417) | Update connector configuration |
| 0.0.9 | 2025-06-21 | [61843](https://github.com/airbytehq/airbyte/pull/61843) | Update dependencies |
| 0.0.8 | 2025-06-14 | [61117](https://github.com/airbytehq/airbyte/pull/61117) | Update dependencies |
| 0.0.7 | 2025-05-24 | [60728](https://github.com/airbytehq/airbyte/pull/60728) | Update dependencies |
| 0.0.6 | 2025-05-10 | [59893](https://github.com/airbytehq/airbyte/pull/59893) | Update dependencies |
| 0.0.5 | 2025-05-03 | [59299](https://github.com/airbytehq/airbyte/pull/59299) | Update dependencies |
| 0.0.4 | 2025-04-26 | [58781](https://github.com/airbytehq/airbyte/pull/58781) | Update dependencies |
| 0.0.3 | 2025-04-19 | [58215](https://github.com/airbytehq/airbyte/pull/58215) | Update dependencies |
| 0.0.2 | 2025-04-12 | [57669](https://github.com/airbytehq/airbyte/pull/57669) | Update dependencies |
| 0.0.1 | 2025-04-11 | [57586](https://github.com/airbytehq/airbyte/pull/57586) | Initial release by [@natikgadzhi](https://github.com/natikgadzhi) |

</details>
