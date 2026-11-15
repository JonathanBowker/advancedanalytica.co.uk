---
generated_record: true
connector_name: Pylon
connector_type: source
connector_slug: pylon
connector_directory: source-pylon
definition_id: f2e53e88-3c6b-4e5a-b7c2-a1d9c5e8f4b6
version: 0.1.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pylon
logo: /images/connectors/sources/pylon.svg
logo_source_path: airbyte-integrations/connectors/source-pylon/icon.svg
logo_sha256: 2d6e1ba353143c3b33d369a2e72167e029392ceca726f376e4e565e49661f4a3
original_metadata_path: airbyte-integrations/connectors/source-pylon/metadata.yaml
original_metadata_sha256: 2f6264dcb8e45a9963bb5c5ff7eda5fc29aab3b887b73a10c8ea6b4c5601fe30
original_document_path: docs/integrations/sources/pylon.md
original_document_sha256: 1b65cc1f31667964445ba89a046c8c4a68f1ef3f9bb47676b35ec5f9026b6854
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 42e3fe8d67bf62d038f455c538bf4e48db7b429ea4f4fe3f86d66726bdb416d7
rewritten_at: 2026-11-12T13:53:19.603961+00:00
---

# Pylon

<HideInUI>

This page provides setup guidance and reference information for the [Pylon](https://usepylon.com) source connector.

</HideInUI>

## Prerequisites

- An Admin must create a Pylon API token under **Settings > Integrations & dev > API tokens**. Choose a role that can read the data you’ll sync. Tokens acting as users or bots inherit that identity’s current role and permissions. Pylon tokens don’t have separate scopes. For creation steps, see [Pylon's authentication guide](https://docs.usepylon.com/pylon-docs/developer/api/authentication).
- You need access to Tags for the source connection check. You also need access to every selected stream and its parent stream. A successful connection check doesn’t confirm access to every stream.

## Set up the connector

<FieldAnchor field="api_token">

Enter only your **API Token**, without `Bearer` or surrounding spaces. The connector adds the authentication header to every Pylon API request.

</FieldAnchor>

<FieldAnchor field="region">

Select **Region** to match your Pylon tenant and API token. **US** is the default and uses `https://api.usepylon.com` with tokens prefixed `pylon_api_`. **EU** uses `https://api.eu.usepylon.com` with tokens prefixed `pylon_api_eu_`. For older tokens without a prefix, choose your Pylon tenant’s hosted region. Existing configurations without Region continue using US.

</FieldAnchor>

<FieldAnchor field="start_date">

You can enter a **Start Date** in UTC format (`YYYY-MM-DDTHH:MM:SSZ`). The connector uses each issue’s `updated_at`, not its creation date. This selects Issues and parent issues for Issue Messages and Issue Threads. Without a date, each sync starts 30 days earlier. Set a date to keep a fixed history window for the child streams. Later incremental Issues syncs continue from the saved cursor.

</FieldAnchor>

<FieldAnchor field="num_workers">

You can set **Number of Workers** from **2** to **10**. The default is **3**. At least two workers let child streams read records while generating parent partitions. Lower this value if other integrations share your organisation’s API allowance.

</FieldAnchor>

## Sync modes

The Pylon source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- Full Refresh | Overwrite
- Full Refresh | Append
- Incremental Sync | Append (Issues stream only)
- Incremental Sync | Append + Deduped (Issues stream only; recommended)

Issue time filters include both boundaries. Each incremental sync can emit issues again at the saved cursor. Adjacent query windows can also replay records at shared edges. **Incremental | Append** retains these replays as duplicate rows. This includes another copy of an issue at the saved cursor during every sync. Use **Incremental | Append + Deduped** with `id` as the primary key to retain one row per issue.

An issue updated exactly at a shared window edge also creates two child partitions. Therefore, **Issue Messages** and **Issue Threads** can emit the same child rows twice during one sync. **Full Refresh | Overwrite** doesn’t deduplicate rows within that sync. With a fixed Start Date, this rare edge case can recur until the issue is updated. No data is lost. If needed, deduplicate child rows downstream using `id`.

## Streams

The Pylon source connector supports these streams:

- [Accounts](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/accounts)
- [Activity Types](https://docs.usepylon.com/pylon-docs/developer/api/api-reference)
- [Audit Logs](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/audit-logs)
- [Contacts](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/contacts)
- [Custom Fields](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/custom-fields)
- [Issues](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/issues) (Incremental)
  - [Issue Messages](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/messages)
  - [Issue Threads](https://docs.usepylon.com/pylon-docs/developer/api/api-reference)
- [Issue Statuses](https://docs.usepylon.com/pylon-docs/developer/api/api-reference)
- [Knowledge Bases](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/knowledge-base)
  - [Knowledge Base Articles](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/knowledge-base)
- [Macro Groups](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/macros)
- [Surveys](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/surveys)
- [Tags](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/tags)
- [Teams](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/teams)
- [Ticket Forms](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/ticket-forms)
- [Training Data](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/training-data)
- [User Roles](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/user-roles)
- [Users](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/users)

### Stream details

- **Audit Logs** requires an Admin-role API token and a Pylon plan with audit log access. A 403 response on this stream stops the sync. Deselect the stream if the token isn’t Admin. On Enterprise plans, every sync returns the full audit history. Other plans return a rolling 30-day window. **Start Date** doesn’t apply. To retain history beyond 30 days, use **Full Refresh | Append** and deduplicate downstream on `id`. Append rewrites the window’s events during every sync. Overwrite modes retain only the current window, which is 30 days on non-Enterprise plans.
- **Issues** is the only incremental stream. It uses `updated_at` as its cursor field and the `POST /issues/search` endpoint. Incremental syncs therefore capture every issue modification, not only newly created issues. The connector chooses 30-day query windows. This isn’t a documented Pylon search API limit. Inclusive bounds overlap at window edges to prevent subsecond gaps. The final query can extend one second beyond the cursor interval’s end. Its bounds remain fixed across pages.
- **Issue Messages** and **Issue Threads** are full-refresh child streams of Issues. Every sync rereads all messages or threads for each issue updated since **Start Date**. This happens independently of the Issues stream’s saved incremental cursor. Messages and threads aren’t filtered by timestamp, so child records can predate **Start Date**. Both streams include `issue_id`. You can join this field to Issues on `id`.
- **Knowledge Base Articles** is a full-refresh child stream of Knowledge Bases. It includes `knowledge_base_id`, which you can join to Knowledge Bases on `id`.
- **Custom Fields** retrieves field definitions for three object types: account, issue, and contact. It doesn’t retrieve definitions for other Pylon object types.
- **Users** includes active and deactivated users.
- Every stream except Issues supports full refresh only and doesn’t save an incremental cursor. **Start Date** only limits Issues, Issue Messages, and Issue Threads.

### Upgrade to 0.0.8

Connector version 0.0.8 switches the Issues stream from `GET /issues` to `POST /issues/search`. Its cursor also changes from `created_at` to `updated_at`. Incremental syncs therefore capture updates to existing issues, not only newly created issues. Upgrading from any earlier version automatically runs a one-time state migration. The migration rewinds the issues cursor and retrieves history starting from:

- your configured **Start Date**, if set, or
- **30 days before the first sync**, if Start Date is unset.

For a longer backfill, set Start Date before your first sync on 0.0.8. Use the date where you want the backfill to begin. Later syncs use the new `updated_at` cursor incrementally and don’t retrieve that history again.

## Troubleshooting and limitations

### Authentication and permissions

- For `wrong_region_token` (HTTP 401), set **Region** to match your Pylon tenant and token.
- For `invalid_api_token` (HTTP 401), confirm the token is correct and hasn’t been rotated or revoked. If the token has an IP allowlist, permit the public egress IP addresses used by Airbyte. Pylon returns the same error for a blocked IP address.
- For HTTP 403, give the token’s role read access to the affected data or deselect the stream. Child streams also require access to their parent data. The connector stops on permission errors instead of silently skipping inaccessible streams.

For other error codes, see [Pylon's error reference](https://docs.usepylon.com/pylon-docs/developer/api/errors).

### Rate limits

The [Pylon API rate limits](https://docs.usepylon.com/pylon-docs/developer/api/rate-limits) apply to each endpoint and are shared by every API token in your organisation:

- `GET /activity-types` and `GET /issue-statuses`: 30 requests per minute each.
- `POST /issues/search`, `GET /issues/{id}/messages`, `GET /issues/{id}/threads`, and `GET /knowledge-bases/{id}/articles`: 120 requests per minute each.
- Other endpoints used by this connector: 300 requests per minute each.

The connector manages request budgets separately for each endpoint. For rate-limited responses (HTTP 429), it first uses `Retry-After`. If that header is absent, it uses `X-Retry-After`. If neither is present, it uses exponential backoff and retries up to five times. If the selected retry header specifies 120 seconds or more, the stream stops instead of waiting. The connector uses three workers by default, with a minimum of two and a maximum of ten. Lower **Number of Workers** if other integrations also use your organisation’s API allowance.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                        |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------- |
| 0.1.0 | 2026-11-10 | [91827](https://github.com/airbytehq/airbyte/pull/91827) | Add Audit Logs, Macro Groups, Surveys, and Training Data streams, with an Admin-role error message for Audit Logs. |
| 0.0.32 | 2026-11-10 | [91678](https://github.com/airbytehq/airbyte/pull/91678) | Update dependencies |
| 0.0.31 | 2026-11-06 | [91022](https://github.com/airbytehq/airbyte/pull/91022) | Add EU region support, documented fields, deactivated users, inclusive issue windows, parent IDs on child streams, actionable errors, request budgets, and configurable concurrency. |
| 0.0.30 | 2026-11-03 | [90398](https://github.com/airbytehq/airbyte/pull/90398) | Simplify error handling while preserving retry and rate-limit behavior. |
| 0.0.29 | 2026-11-03 | [90704](https://github.com/airbytehq/airbyte/pull/90704) | Update dependencies |
| 0.0.28 | 2026-10-27 | [90041](https://github.com/airbytehq/airbyte/pull/90041) | Update dependencies |
| 0.0.27 | 2026-10-20 | [89362](https://github.com/airbytehq/airbyte/pull/89362) | Update dependencies |
| 0.0.26 | 2026-10-13 | [88765](https://github.com/airbytehq/airbyte/pull/88765) | Update dependencies |
| 0.0.25 | 2026-10-06 | [87996](https://github.com/airbytehq/airbyte/pull/87996) | Update dependencies |
| 0.0.24 | 2026-09-29 | [87314](https://github.com/airbytehq/airbyte/pull/87314) | Update dependencies |
| 0.0.23 | 2026-09-22 | [86771](https://github.com/airbytehq/airbyte/pull/86771) | Update dependencies |
| 0.0.22 | 2026-09-15 | [86190](https://github.com/airbytehq/airbyte/pull/86190) | Update dependencies |
| 0.0.21 | 2026-09-08 | [85622](https://github.com/airbytehq/airbyte/pull/85622) | Update dependencies |
| 0.0.20 | 2026-08-18 | [84722](https://github.com/airbytehq/airbyte/pull/84722) | Update dependencies |
| 0.0.19 | 2026-08-11 | [84079](https://github.com/airbytehq/airbyte/pull/84079) | Update dependencies |
| 0.0.18 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 0.0.17 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 0.0.15 — 0.0.16 is built on SDM 7.23.7, which breaks bundled custom components |
| 0.0.16 | 2026-07-28 | [83064](https://github.com/airbytehq/airbyte/pull/83064) | Update dependencies |
| 0.0.15 | 2026-07-21 | [82527](https://github.com/airbytehq/airbyte/pull/82527) | Update dependencies |
| 0.0.14 | 2026-07-14 | [81963](https://github.com/airbytehq/airbyte/pull/81963) | Update dependencies |
| 0.0.13 | 2026-06-30 | [81204](https://github.com/airbytehq/airbyte/pull/81204) | Update dependencies |
| 0.0.12 | 2026-06-23 | [80608](https://github.com/airbytehq/airbyte/pull/80608) | Update dependencies |
| 0.0.11 | 2026-06-16 | [80004](https://github.com/airbytehq/airbyte/pull/80004) | Update dependencies |
| 0.0.10 | 2026-06-09 | [79462](https://github.com/airbytehq/airbyte/pull/79462) | Update dependencies |
| 0.0.9 | 2026-06-02 | [78905](https://github.com/airbytehq/airbyte/pull/78905) | Update dependencies |
| 0.0.8 | 2026-05-07 | [76083](https://github.com/airbytehq/airbyte/pull/76083) | Switch the Issues stream to `POST /issues/search` cursored on `updated_at` for true incremental sync. State migration rewinds the issues cursor to the configured Start Date (or 30 days ago if unset) on the first sync after upgrade. |
| 0.0.7 | 2026-04-28 | [77394](https://github.com/airbytehq/airbyte/pull/77394) | Update dependencies |
| 0.0.6 | 2026-04-21 | [76721](https://github.com/airbytehq/airbyte/pull/76721) | Update dependencies |
| 0.0.5 | 2026-03-31 | [75855](https://github.com/airbytehq/airbyte/pull/75855) | Update dependencies |
| 0.0.4 | 2026-03-17 | [74921](https://github.com/airbytehq/airbyte/pull/74921) | Update dependencies |
| 0.0.3 | 2026-02-24 | [73850](https://github.com/airbytehq/airbyte/pull/73850) | Update dependencies |
| 0.0.2 | 2026-02-20 | [73693](https://github.com/airbytehq/airbyte/pull/73693) | Make start_date optional, default to 1 month ago |
| 0.0.1 | 2026-02-20 | [73624](https://github.com/airbytehq/airbyte/pull/73624) | Initial release of Pylon source connector |

</details>
