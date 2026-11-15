---
generated_record: true
connector_name: Monday
connector_type: source
connector_slug: monday
connector_directory: source-monday
definition_id: 80a54ea2-9959-4040-aac1-eee42423ec9b
version: 2.6.3
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/monday
logo: /images/connectors/sources/monday.svg
logo_source_path: airbyte-integrations/connectors/source-monday/icon.svg
logo_sha256: a803eb73709b5f721a42f96d96d698f2f73aa325dfeffe12b9ed20789357f605
original_metadata_path: airbyte-integrations/connectors/source-monday/metadata.yaml
original_metadata_sha256: 7efa3fd69ca2163a6b90bd6a621513230e48b637c40febea13e43efd57aa68c4
original_document_path: docs/integrations/sources/monday.md
original_document_sha256: d5e0e6c33ab30e924894cc4502c4961b7d09140e0d28f2284abaa6dccff6d6c8
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a6c0eef53cb8ce6971664a0e48cf5ad34030aa5f2e21ed8de420898a5d07d386
rewritten_at: 2026-11-12T13:48:05.456314+00:00
---

# Monday

Use this guide to set up the [Monday](https://monday.com/) source connector and find reference information.

This connector uses the [Monday.com GraphQL API](https://developer.monday.com/api-reference/docs) (version 2026-01).

## Prerequisites

To set up the Monday source connector, you need one of these credentials:

- A **Personal API Token**. Generate it from your Monday.com account under **Profile picture** (top right corner) > **Developers** > **API token**.
- An **OAuth 2.0 application**. Find or create it under **Profile picture** (top right corner) > **Developers** > **My Apps**.

For more information, see Monday.com's [authentication documentation](https://developer.monday.com/api-reference/docs/authentication).

## Set up the connector

1. In Airbyte, go to **Sources** and click **+ New source**.
2. Search for and select **Monday**.
3. Enter a name for the connector.
4. Choose your authentication method and enter the required credentials.
5. To limit the Boards, Items, and Activity logs streams, optionally enter one or more board IDs in **Boards to sync**. Leave it empty to sync records from every board in your account.
6. Optionally, set **Number of concurrent threads** to control the number of parallel requests. The default is 4, and the allowed range is 2 to 50. However, the connector caps effective concurrency at 40. This is Monday.com's concurrency limit for the lowest plan tier. Increase this value only if your [Monday.com plan's rate limits](https://developer.monday.com/api-reference/docs/rate-limits) allow it. Higher values can cause rate limit errors on lower tiers.
7. Click **Set up source**.

### Connect with OAuth 2.0

1. Select **OAuth2.0** in **Authorization Method**.
2. If your Monday.com account uses a custom subdomain, enter it in the **Subdomain/Slug** field. This is the first part of the URL before `.monday.com`. Leave this field empty if you use the default `monday.com` domain.
3. Click **Authenticate your Monday account**.
4. Complete the authentication flow with your Monday.com credentials. The Airbyte app must be installed on your Monday.com account before you can authorise it. If it isn't installed, Monday.com asks an account admin to install it, then continues to the consent screen. If you aren't an admin, ask one to install the app first. If an admin completes the authorisation, the source syncs with that admin's permissions.

Airbyte stores the access token with a refresh token and refreshes the access token automatically. Sources authenticated with connector versions before 2.6.0 hold a legacy access token. On the first 2.6.0 run, the connector automatically migrates it to the new OAuth flow. You'll need to re-authenticate only if the migration fails. Run the source once on 2.6.0 before October 1, 2026, when Monday.com stops accepting legacy tokens. See [Upgrading to 2.6.0](#upgrading-to-260). Monday.com expires a refresh token if it hasn't been used for 3 months ([monday.com update](https://developer-community.monday.com/product-updates/oauth-2-1-is-now-open-for-all-monday-developers-5326)). You must re-authenticate a source that hasn't synced for that long.

The connector requests these OAuth scopes: `me:read`, `boards:read`, `workspaces:read`, `users:read`, `account:read`, `updates:read`, `assets:read`, `tags:read`, and `teams:read`.

#### Upgrade to 2.6.0

Monday.com is moving its OAuth flow to OAuth 2.1. It stops accepting legacy OAuth access tokens on **October 1, 2026**. See the [monday.com announcement](https://developer-community.monday.com/product-updates/oauth-2-1-is-now-open-for-all-monday-developers-5326) and the [monday.com migration guide](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow).

Version 2.6.0 authenticates through the new token endpoint (`https://auth.monday.com/oauth_ms/oauth/token`) with PKCE. Rotating refresh tokens keep the access token current. The connector configuration stores a `refresh_token` alongside the `access_token`. The connector refreshes the access token automatically and saves the newest refresh token after each refresh. This isn't a breaking change. Existing configurations remain valid and migrate automatically on their first run.

**Who is affected:** only sources that use the **OAuth2.0** authorisation method. Sources that use a **Personal API Token** require no action.

**What happens on upgrade:**

1. Airbyte Cloud applies the upgrade automatically through a progressive rollout. On self-managed Airbyte, upgrade the connector to 2.6.0 **before October 1, 2026**.
2. Run a connection test or sync on 2.6.0. The connector exchanges the existing legacy access token through Monday.com's [token migration endpoint](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow#6-migrate-legacy-api-tokens). It receives a new access token and refresh token, then stores them in the source configuration. You don't need to re-authenticate if this succeeds.
3. If a run asks you to re-authenticate, open the source in Airbyte and click **Authenticate your Monday account**. If the Airbyte app isn't installed on your Monday.com account, Monday.com asks an account admin to install it. This can happen if the app was removed. The consent screen appears after installation, so ask an account admin to install the app first. If the admin completes the authorisation, the source syncs with that admin's permissions.

Automatic migration works only while the legacy access token remains valid. Run the source once on 2.6.0 before October 1, 2026. Monday.com describes the migration endpoint as temporary and rate limited. If it rejects the token, complete the manual re-authentication in step 3. Rejection can occur because the token expired or was revoked, the Airbyte app was removed, or migration was disabled. It can also occur when a personal API token is stored in the OAuth2.0 settings. Re-authenticating with a version before 2.6.0 uses the legacy flow. This fails once the Airbyte app switches to Monday.com's new OAuth flow. Any token issued through the legacy flow stops working on October 1, 2026. From that date, OAuth2.0 sources with unmigrated legacy tokens stop syncing until you re-authenticate them.

### Connect with API Token

1. Generate an API token as described in Monday.com's [authentication documentation](https://developer.monday.com/api-reference/docs/authentication).
2. Select **API Token** in **Authorization Method**.
3. Enter your token in the **Personal API Token** field.

## Supported sync modes

The Monday source connector supports these sync modes:

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |
| Namespaces        | No         |

## Supported streams

You can use these streams:

| Stream | Sync mode | API documentation |
| :--- | :--- | :--- |
| Activity logs | Full Refresh, Incremental | [Activity logs](https://developer.monday.com/api-reference/docs/activity-logs) |
| Boards | Full Refresh, Incremental | [Boards](https://developer.monday.com/api-reference/docs/boards) |
| Items | Full Refresh, Incremental | [Items](https://developer.monday.com/api-reference/docs/items-queries) |
| Tags | Full Refresh | [Tags](https://developer.monday.com/api-reference/docs/tags-queries) |
| Teams | Full Refresh | [Teams](https://developer.monday.com/api-reference/docs/teams-queries) |
| Updates | Full Refresh | [Updates](https://developer.monday.com/api-reference/docs/updates-queries) |
| Users | Full Refresh | [Users](https://developer.monday.com/api-reference/docs/users-queries-1) |
| Workspaces | Full Refresh | [Workspaces](https://developer.monday.com/api-reference/docs/workspaces) |

### Stream notes

- The Boards stream includes each board's column definitions. In your destination, they appear as nested data, typically named `boards.columns`.

- The Items stream includes each item's column values. In your destination, they appear as nested data, typically named `items.column_values`. Each column value includes the `id`, `text`, `type`, and `value` fields. Some column types include extra fields through typed values:

  - **Connect Boards** (`board_relation`) and **Dependency** (`dependency`) columns include a `linked_item_ids` array with linked item IDs. Use these IDs to join the Items stream and find details about linked items. The `value` field returns `null` for these column types.
  - **Mirror**, **Connect Boards**, and **Dependency** columns include a `display_value` field with a human-readable text representation.

- Incremental sync for the Items and Boards streams relies on the Activity logs stream. The connector extracts board and item IDs from activity log events. It uses these IDs to sync only changed records. Some changes may be missed if the interval between syncs exceeds your [Monday.com plan](https://monday.com/pricing) activity log retention period.

- The Items stream uses [cursor-based pagination](https://developer.monday.com/api-reference/reference/items-page#cursor-based-pagination-using-next_items_page), and Monday.com pagination cursors expire after 60 minutes. A board may take longer to read because of rate limiting or its size. The API then returns a `CursorExpiredError`, and the connector restarts pagination for that stream. Pagination restarts from the beginning. As a result, syncing very large boards can take longer than expected.

If you'd like Airbyte to support more endpoints, [create an issue](https://github.com/airbytehq/airbyte/issues/new/choose).

## Performance considerations

Monday.com enforces [rate limits](https://developer.monday.com/api-reference/docs/rate-limits) based on your plan. These include per-minute query limits and a query complexity budget. The connector automatically retries complexity budget errors and HTTP rate limit responses with backoff. It follows the `retry-after` header when present. If you see rate limit errors, reduce the **Number of concurrent threads** setting. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if any rate limit issues aren't retried successfully.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version    | Date       | Pull Request                                              | Subject                                                                                                                                                                |
|:-----------|:-----------|:----------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2.6.3 | 2026-11-06 | [84969](https://github.com/airbytehq/airbyte/pull/84969) | Fix silent truncation at 25 records in the workspaces and updates streams by sending an explicit page size |
| 2.6.2 | 2026-10-13 | [87933](https://github.com/airbytehq/airbyte/pull/87933) | Update dependencies |
| 2.6.1 | 2026-09-29 | [87243](https://github.com/airbytehq/airbyte/pull/87243) | Update dependencies |
| 2.6.0 | 2026-09-24 | [85170](https://github.com/airbytehq/airbyte/pull/85170) | Move OAuth to Monday's OAuth 2.1 flow (PKCE, new token endpoint, rotating refresh tokens); migrate existing legacy OAuth tokens automatically on the first run; prompt the admin to install the Airbyte app during authorization |
| 2.5.22 | 2026-09-22 | [86707](https://github.com/airbytehq/airbyte/pull/86707) | Update dependencies |
| 2.5.21 | 2026-09-15 | [86149](https://github.com/airbytehq/airbyte/pull/86149) | Update dependencies |
| 2.5.20 | 2026-09-08 | [85557](https://github.com/airbytehq/airbyte/pull/85557) | Update dependencies |
| 2.5.19 | 2026-08-18 | [84675](https://github.com/airbytehq/airbyte/pull/84675) | Update dependencies |
| 2.5.18 | 2026-08-11 | [84004](https://github.com/airbytehq/airbyte/pull/84004) | Update dependencies |
| 2.5.17 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 2.5.16 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 2.5.14 — 2.5.15 is built on SDM 7.23.7, which breaks bundled custom components |
| 2.5.15 | 2026-07-28 | [83007](https://github.com/airbytehq/airbyte/pull/83007) | Update dependencies |
| 2.5.14 | 2026-07-21 | [82493](https://github.com/airbytehq/airbyte/pull/82493) | Update dependencies |
| 2.5.13 | 2026-07-14 | [81908](https://github.com/airbytehq/airbyte/pull/81908) | Update dependencies |
| 2.5.12 | 2026-06-30 | [81167](https://github.com/airbytehq/airbyte/pull/81167) | Update dependencies |
| 2.5.11 | 2026-06-23 | [80562](https://github.com/airbytehq/airbyte/pull/80562) | Update dependencies |
| 2.5.10 | 2026-06-16 | [78817](https://github.com/airbytehq/airbyte/pull/78817) | Update dependencies |
| 2.5.9 | 2026-06-09 | [79605](https://github.com/airbytehq/airbyte/pull/79605) | Clean up cancelled RC; revert source to previous stable |
| 2.5.9-rc.2 | 2026-05-28 | [78489](https://github.com/airbytehq/airbyte/pull/78489) | Reduce default concurrency to 4 and enable tier-aware HTTPAPIBudget rate limiting |
| 2.5.9-rc.1 | 2026-05-26 | [78442](https://github.com/airbytehq/airbyte/pull/78442) | Add subscription_tier spec field and tier-aware HTTPAPIBudget for concurrency tuning (Path B) |
| 2.5.8 | 2026-04-28 | [77302](https://github.com/airbytehq/airbyte/pull/77302) | Update dependencies |
| 2.5.7 | 2026-04-21 | [76675](https://github.com/airbytehq/airbyte/pull/76675) | Update dependencies |
| 2.5.6 | 2026-04-13 | [76276](https://github.com/airbytehq/airbyte/pull/76276) | Rename "concurrent workers" to "concurrent threads" in connector spec |
| 2.5.5 | 2026-03-17 | [74325](https://github.com/airbytehq/airbyte/pull/74325) | Migrate to scopes object array format |
| 2.5.4 | 2026-03-10 | [74620](https://github.com/airbytehq/airbyte/pull/74620) | Update dependencies |
| 2.5.3 | 2026-03-05 | [73658](https://github.com/airbytehq/airbyte/pull/73658) | Add `linked_item_ids` to `BoardRelationValue` and `DependencyValue` column types to restore linked item data lost after API version 2025-04+ |
| 2.5.2 | 2026-02-24 | [73582](https://github.com/airbytehq/airbyte/pull/73582) | Update dependencies |
| 2.5.1 | 2026-02-13 | [72192](https://github.com/airbytehq/airbyte/pull/72192) | Add `user_id` field to `activity_logs` stream |
| 2.5.0 | 2026-02-11 | [72832](https://github.com/airbytehq/airbyte/pull/72832) | Upgrade to Monday.com API version 2026-01 |
| 2.4.21 | 2026-02-10 | [73038](https://github.com/airbytehq/airbyte/pull/73038) | Update dependencies |
| 2.4.20 | 2026-02-03 | [72577](https://github.com/airbytehq/airbyte/pull/72577) | Update dependencies |
| 2.4.19 | 2026-01-20 | [71994](https://github.com/airbytehq/airbyte/pull/71994) | Update dependencies |
| 2.4.18 | 2026-01-14 | [71513](https://github.com/airbytehq/airbyte/pull/71513) | Update dependencies |
| 2.4.17 | 2025-12-18 | [70552](https://github.com/airbytehq/airbyte/pull/70552) | Update dependencies |
| 2.4.16 | 2025-12-03 | [69718](https://github.com/airbytehq/airbyte/pull/69718) | Add pagination reset handling for Monday CursorExpiredError |
| 2.4.15 | 2025-11-25 | [69883](https://github.com/airbytehq/airbyte/pull/69883) | Update dependencies |
| 2.4.14 | 2025-11-18 | [69367](https://github.com/airbytehq/airbyte/pull/69367) | Update dependencies |
| 2.4.13 | 2025-10-29 | [69048](https://github.com/airbytehq/airbyte/pull/69048) | Update dependencies |
| 2.4.12 | 2025-10-22 | [68591](https://github.com/airbytehq/airbyte/pull/68591) | Add `suggestedStreams` |
| 2.4.11 | 2025-10-21 | [68416](https://github.com/airbytehq/airbyte/pull/68416) | Update dependencies |
| 2.4.10 | 2025-10-14 | [67840](https://github.com/airbytehq/airbyte/pull/67840) | Update dependencies |
| 2.4.9 | 2025-10-07 | [67393](https://github.com/airbytehq/airbyte/pull/67393) | Update dependencies |
| 2.4.8 | 2025-10-02 | [66938](https://github.com/airbytehq/airbyte/pull/66938) | Surface HTTP 200 Error Messages |
| 2.4.7 | 2025-09-30 | [66336](https://github.com/airbytehq/airbyte/pull/66336) | Update dependencies |
| 2.4.6 | 2025-09-10 | [65884](https://github.com/airbytehq/airbyte/pull/65884) | Update dependencies |
| 2.4.5 | 2025-08-23 | [64705](https://github.com/airbytehq/airbyte/pull/64705) | Update dependencies |
| 2.4.4 | 2025-08-11 | [64878](https://github.com/airbytehq/airbyte/pull/64878) | Pass query in json body of request instead of query params. |
| 2.4.3 | 2025-08-02 | [64220](https://github.com/airbytehq/airbyte/pull/64220) | Update dependencies |
| 2.4.2 | 2025-07-26 | [63835](https://github.com/airbytehq/airbyte/pull/63835) | Update dependencies |
| 2.4.1 | 2025-07-19 | [63206](https://github.com/airbytehq/airbyte/pull/63206) | Update dependencies |
| 2.4.0 | 2025-07-09 | [62886](https://github.com/airbytehq/airbyte/pull/62886) | Promoting release candidate 2.4.0-rc.1 to a main version. |
| 2.4.0-rc.1 | 2025-07-02 | [62444](https://github.com/airbytehq/airbyte/pull/62444) | Migrate connector to manifest-only |
| 2.3.1 | 2025-05-31 | [53828](https://github.com/airbytehq/airbyte/pull/53828) | Update dependencies |
| 2.3.0 | 2025-04-02 | [56967](https://github.com/airbytehq/airbyte/pull/56967) | Promoting release candidate 2.3.0-rc.1 to a main version. |
| 2.3.0-rc.1 | 2025-03-18 | [55225](https://github.com/airbytehq/airbyte/pull/55225) | Update CDK to v6 |
| 2.2.0 | 2025-03-14 | [52780](https://github.com/airbytehq/airbyte/pull/52780) | Add optional config parameter to control which boards are fetched when syncing the `Boards` stream |
| 2.1.13 | 2025-02-01 | [52780](https://github.com/airbytehq/airbyte/pull/52780) | Update dependencies |
| 2.1.12 | 2025-01-25 | [51833](https://github.com/airbytehq/airbyte/pull/51833) | Update dependencies |
| 2.1.11 | 2025-01-14 | [10311](https://github.com/airbytehq/airbyte/pull/10311) | Update API version to 2024-10 |
| 2.1.10 | 2025-01-11 | [51147](https://github.com/airbytehq/airbyte/pull/51147) | Update dependencies |
| 2.1.9 | 2025-01-08 | [50984](https://github.com/airbytehq/airbyte/pull/50984) | Update the `spec` to support `Jinja` style variables for `DeclarativeOAuthFlow` |
| 2.1.8 | 2024-12-28 | [50624](https://github.com/airbytehq/airbyte/pull/50624) | Update dependencies |
| 2.1.7 | 2024-12-21 | [43901](https://github.com/airbytehq/airbyte/pull/43901) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 2.1.6 | 2024-12-19 | [49943](https://github.com/airbytehq/airbyte/pull/49943) | Pin CDK constraint to avoid breaking change in newer versions |
| 2.1.5 | 2024-10-31 | [48054](https://github.com/airbytehq/airbyte/pull/48054) | Moved to `DeclarativeOAuthFlow` specification |
| 2.1.4 | 2024-08-17 | [44201](https://github.com/airbytehq/airbyte/pull/44201) | Add boards name to the `items` stream |
| 2.1.3 | 2024-06-04 | [38958](https://github.com/airbytehq/airbyte/pull/38958) | [autopull] Upgrade base image to v1.2.1 |
| 2.1.2 | 2024-04-30 | [37722](https://github.com/airbytehq/airbyte/pull/37722) | Fetch `display_value` field for column values of `Mirror`, `Dependency` and `Connect Board` types |
| 2.1.1 | 2024-04-05 | [36717](https://github.com/airbytehq/airbyte/pull/36717) | Add handling of complexityBudgetExhausted error. |
| 2.1.0 | 2024-04-03 | [36746](https://github.com/airbytehq/airbyte/pull/36746) | Pin airbyte-cdk version to `^0` |
| 2.0.4 | 2024-02-28 | [35696](https://github.com/airbytehq/airbyte/pull/35696) | Fix extraction for `null` value in stream `Activity logs` |
| 2.0.3 | 2024-02-21 | [35506](https://github.com/airbytehq/airbyte/pull/35506) | Support for column values of the mirror type for the `Items` stream. |
| 2.0.2 | 2024-02-12 | [35146](https://github.com/airbytehq/airbyte/pull/35146) | Manage dependencies with Poetry. |
| 2.0.1 | 2024-02-08 | [35016](https://github.com/airbytehq/airbyte/pull/35016) | Migrated to the latest airbyte cdk |
| 2.0.0 | 2024-01-12 | [34108](https://github.com/airbytehq/airbyte/pull/34108) | Migrated to the latest API version: 2024-01 |
| 1.1.4 | 2023-12-13 | [33448](https://github.com/airbytehq/airbyte/pull/33448) | Increase test coverage and migrate to base image |
| 1.1.3 | 2023-09-23 | [30248](https://github.com/airbytehq/airbyte/pull/30248) | Add new field "type" to board stream |
| 1.1.2 | 2023-08-23 | [29777](https://github.com/airbytehq/airbyte/pull/29777) | Add retry for `502` error |
| 1.1.1 | 2023-08-15 | [29429](https://github.com/airbytehq/airbyte/pull/29429) | Ignore `null` records in response |
| 1.1.0 | 2023-07-05 | [27944](https://github.com/airbytehq/airbyte/pull/27944) | Add incremental sync for Items and Boards streams |
| 1.0.0 | 2023-06-20 | [27410](https://github.com/airbytehq/airbyte/pull/27410) | Add new streams: Tags, Workspaces. Add new fields for existing streams. |
| 0.2.6 | 2023-06-12 | [27244](https://github.com/airbytehq/airbyte/pull/27244) | Added http error handling for `403` and `500` HTTP errors |
| 0.2.5 | 2023-05-22 | [25881](https://github.com/airbytehq/airbyte/pull/25881) | Fix pagination for the items stream |
| 0.2.4 | 2023-04-26 | [25277](https://github.com/airbytehq/airbyte/pull/25277) | Increase row limit to 100 |
| 0.2.3 | 2023-03-06 | [23231](https://github.com/airbytehq/airbyte/pull/23231) | Publish using low-code CDK Beta version |
| 0.2.2 | 2023-01-04 | [20996](https://github.com/airbytehq/airbyte/pull/20996) | Fix json schema loader |
| 0.2.1 | 2022-12-15 | [20533](https://github.com/airbytehq/airbyte/pull/20533) | Bump CDK version |
| 0.2.0 | 2022-12-13 | [19586](https://github.com/airbytehq/airbyte/pull/19586) | Migrate to low-code |
| 0.1.4 | 2022-06-06 | [14443](https://github.com/airbytehq/airbyte/pull/14443) | Increase retry_factor for Items stream |
| 0.1.3 | 2021-12-23 | [8172](https://github.com/airbytehq/airbyte/pull/8172) | Add oauth2.0 support |
| 0.1.2 | 2021-12-07 | [8429](https://github.com/airbytehq/airbyte/pull/8429) | Update titles and descriptions |
| 0.1.1 | 2021-11-18 | [8016](https://github.com/airbytehq/airbyte/pull/8016) | 🐛 Source Monday: fix pagination and schema bug |
| 0.1.0 | 2021-11-07 | [7168](https://github.com/airbytehq/airbyte/pull/7168) | 🎉 New Source: Monday |

</details>
