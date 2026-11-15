---
generated_record: true
connector_name: Notion
connector_type: source
connector_slug: notion
connector_directory: source-notion
definition_id: 6e00b415-b02e-4160-bf02-58176a0ae687
version: 4.0.33
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/notion
logo: /images/connectors/sources/notion.svg
logo_source_path: airbyte-integrations/connectors/source-notion/icon.svg
logo_sha256: bf35babd06e4398d7d58eb22c620ec4f86bb360f74fa1ee737bdc904d67384d2
original_metadata_path: airbyte-integrations/connectors/source-notion/metadata.yaml
original_metadata_sha256: 8662d04d822f6fc5b73c1fbb6528472388d2503d195d86b4ca20b2b1e0c5ea9f
original_document_path: docs/integrations/sources/notion.md
original_document_sha256: bf3f72aa2debb86baaf158b41426703eeee5a7df2ff3f8f4a9ffced35f717eeb
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4138b85faeeba7ae0cb9d09b1daa92d965714327166f009aed0d03f72615d28a
rewritten_at: 2026-11-12T13:49:21.310739+00:00
---

# Notion

Set up the Notion source connector and find its reference information on this page.

## Prerequisites

- Access to a [Notion](https://notion.so/login) workspace
- You must own the workspace to create a Notion integration

## Setup guide

Authenticate the Notion source connector using **one** of these two methods:

- OAuth2.0 authorization (recommended for Airbyte Cloud)
- Access Token

<!-- env:cloud -->

:::note
**For Airbyte Cloud users:** OAuth2.0 authorization significantly simplifies your Notion setup. In Airbyte Cloud, you do **not** need to create and configure a new Notion integration. You can proceed directly to [setting up the connector in Airbyte](#step-3-set-up-the-notion-connector-in-airbyte).
:::

<!-- /env:cloud -->

The quick guide below explains how to create a Notion integration. For more detail, context or setup help, refer to the [official Notion documentation](https://developers.notion.com/docs).

### Step 1: Create an integration and set capabilities

1. Log in to your Notion workspace and open the [My integrations](https://www.notion.so/my-integrations) page. Select **New integration**.

:::note
You must own the Notion workspace to create a new integration for it.
:::

2. Enter a **Name** for your integration. Select the correct workspace from the **Associated workspace** dropdown menu, then click **Submit**.
3. Select [**Capabilities**](https://developers.notion.com/reference/capabilities) in the navbar. Choose these capabilities based on your use case:

- [**Read content**](https://developers.notion.com/reference/capabilities#content-capabilities): required for every connection.
- [**Read comments**](https://developers.notion.com/reference/capabilities#comment-capabilities): required to sync the Comments stream.
- [**Read user information**](https://developers.notion.com/reference/capabilities#user-capabilities) (with or without emails): required to sync the Users stream.

### Step 2: Share pages and get credentials

#### Access Token (Cloud and Open Source)

When authenticating with an Access Token, manually share each page you want to sync with Airbyte.

1. Open the page or pages you want to share with Airbyte. Click the **•••** menu at the top right. Select **Add connections**, then choose the integration you created in Step 1.
2. After selecting every page, open the **Secrets** tab on your Notion integration's page. Copy the Access Token, then proceed to [setting up the connector in Airbyte](#step-3-set-up-the-notion-connector-in-airbyte).

<!-- env:oss -->

#### OAuth2.0 (Open Source only)

To authenticate via OAuth2.0 for **Airbyte Open Source**, make your integration public. You also need your Client ID, Client Secret and Access Token.

1. Open the **Distribution** tab on your integration page. Toggle the switch to make the integration public.
2. Complete the required fields in the **Organization information** and **OAuth Domain & URIs** section, then click **Submit**.
3. Open the **Secrets** tab to find your Client ID and Client Secret.
4. Use your integration's authorization URL to set the required page permissions. Then send a request to obtain your Access Token. The [official Notion documentation](https://developers.notion.com/docs/authorization#public-integration-auth-flow-set-up) provides detailed instructions. You can proceed after getting your Client ID, Client Secret and Access Token.
<!-- /env:oss -->

### Step 3: Set up the connector in Airbyte

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account, or open your Airbyte Open Source dashboard.
2. Click **Sources** in the left navigation bar. Then click **New source** in the top-right corner.
3. Find and select **Notion** from the available sources.
4. Enter your chosen **Source name**.
5. Choose an authentication method from the dropdown menu:

<!-- env:cloud -->

#### Authentication for Airbyte Cloud

- **OAuth2.0** (Recommended): Click **Authenticate your Notion account**. In the popup, click **Select pages**. Select the pages you want Airbyte to access, then click **Allow access**.
- **Access Token**: Copy the Access Token from the **Secrets** tab on your private integration's page, then paste it.
<!-- /env:cloud -->

<!-- env:oss -->

#### Authentication for Airbyte Open Source

- **Access Token**: Copy the Access Token from the **Secrets** tab on your private integration's page, then paste it.
- **OAuth2.0**: Copy and paste the Client ID, Client Secret and Access Token from your public integration setup.
<!-- /env:oss -->

6. (Optional) Provide a **Start Date** using the datepicker or enter a UTC date and time in this format: `YYYY-MM-DDTHH:mm:ss.SSSZ`. Incremental syncs only replicate data generated after this date. If blank, the start date defaults to two years before the current date.
7. Click **Set up source** and wait for the tests to finish.

## Supported sync modes

The Notion source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Stream       | Full Refresh (Overwrite/Append) | Incremental (Append/Append + Deduped) |
|--------------|:-------------------------------:|:-------------------------------------:|
| Blocks       |                ✓                |                   ✓                   |
| Comments     |                ✓                |                   ✓                   |
| Data Sources |                ✓                |                   ✓                   |
| Pages        |                ✓                |                   ✓                   |
| Users        |                ✓                |                                       |

## Supported streams

The Notion source connector supports these streams:

- [Blocks](https://developers.notion.com/reference/retrieve-a-block): Retrieves content blocks from every synced page. This includes recursively nested child blocks up to 30 levels deep. It excludes block types `child_page`, `child_database` and `ai_block`.
- [Comments](https://developers.notion.com/reference/list-comments): Retrieves comments from every synced page. Requires the **Read comments** integration capability.
- [Data Sources](https://developers.notion.com/reference/data-source): Retrieves data source objects. In the Notion API `2025-09-03`, a data source is a structured table containing pages and properties. It was previously called a "database". Since v4.0.0, this stream replaces the former `Databases` stream. For migration details, see the [Notion migration guide](notion-migrations.md).
- [Pages](https://developers.notion.com/reference/retrieve-a-page): Retrieves page objects from every shared page.
- [Users](https://developers.notion.com/reference/get-users): Retrieves user objects from the workspace. Requires the **Read user information** integration capability.

## Performance considerations

The Notion API limits each integration to approximately three requests per second. After an HTTP 429 response, the connector follows the `Retry-After` header and retries automatically. Rate-limited requests don't count towards the maximum retry limit. Syncs continue indefinitely until the rate limit clears. For more information, see Notion's [request limits](https://developers.notion.com/reference/request-limits) documentation.

The Blocks stream recursively fetches child blocks up to 30 levels deep. Deeply nested pages can generate many API requests. This may slow syncs for workspaces with complex page structures.

## IP allow list

If Airbyte Cloud access is restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version     | Date       | Pull Request                                             | Subject                                                                                                                                                                |
|:------------|:-----------|:---------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 4.0.33 | 2026-11-10 | [91664](https://github.com/airbytehq/airbyte/pull/91664) | Update dependencies |
| 4.0.32 | 2026-11-03 | [90393](https://github.com/airbytehq/airbyte/pull/90393) | Consolidate each stream's error handling into a single error handler |
| 4.0.31 | 2026-11-03 | [90664](https://github.com/airbytehq/airbyte/pull/90664) | Update dependencies |
| 4.0.30 | 2026-10-27 | [90033](https://github.com/airbytehq/airbyte/pull/90033) | Update dependencies |
| 4.0.29 | 2026-10-20 | [89299](https://github.com/airbytehq/airbyte/pull/89299) | Update dependencies |
| 4.0.28 | 2026-10-13 | [88131](https://github.com/airbytehq/airbyte/pull/88131) | Replace custom record transformations for the users, pages and data_sources streams with declarative components (no change to record output) |
| 4.0.27 | 2026-10-13 | [88718](https://github.com/airbytehq/airbyte/pull/88718) | Update dependencies |
| 4.0.26 | 2026-10-06 | [87944](https://github.com/airbytehq/airbyte/pull/87944) | Update dependencies |
| 4.0.25 | 2026-09-29 | [87242](https://github.com/airbytehq/airbyte/pull/87242) | Update dependencies |
| 4.0.24 | 2026-09-22 | [86721](https://github.com/airbytehq/airbyte/pull/86721) | Update dependencies |
| 4.0.23 | 2026-09-15 | [86135](https://github.com/airbytehq/airbyte/pull/86135) | Update dependencies |
| 4.0.22 | 2026-09-08 | [85579](https://github.com/airbytehq/airbyte/pull/85579) | Update dependencies |
| 4.0.21 | 2026-08-18 | [84680](https://github.com/airbytehq/airbyte/pull/84680) | Update dependencies |
| 4.0.20 | 2026-08-11 | [84017](https://github.com/airbytehq/airbyte/pull/84017) | Update dependencies |
| 4.0.19 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 4.0.18 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 4.0.16 — 4.0.17 is built on SDM 7.23.7, which breaks bundled custom components |
| 4.0.17 | 2026-07-28 | [83001](https://github.com/airbytehq/airbyte/pull/83001) | Update dependencies |
| 4.0.16 | 2026-07-21 | [82506](https://github.com/airbytehq/airbyte/pull/82506) | Update dependencies |
| 4.0.15 | 2026-07-14 | [81929](https://github.com/airbytehq/airbyte/pull/81929) | Update dependencies |
| 4.0.14 | 2026-06-30 | [81166](https://github.com/airbytehq/airbyte/pull/81166) | Update dependencies |
| 4.0.13 | 2026-06-23 | [80566](https://github.com/airbytehq/airbyte/pull/80566) | Update dependencies |
| 4.0.12 | 2026-06-16 | [79948](https://github.com/airbytehq/airbyte/pull/79948) | Update dependencies |
| 4.0.11 | 2026-06-09 | [79397](https://github.com/airbytehq/airbyte/pull/79397) | Update dependencies |
| 4.0.10 | 2026-06-02 | [78821](https://github.com/airbytehq/airbyte/pull/78821) | Update dependencies |
| 4.0.9 | 2026-06-01 | [78048](https://github.com/airbytehq/airbyte/pull/78048) | Improve the permission error message for the Users stream when the Notion integration lacks user information capabilities. |
| 4.0.8 | 2026-06-01 | [78543](https://github.com/airbytehq/airbyte/pull/78543) | Set final default concurrency to 3 with configurable worker count |
| 4.0.8-rc.5 | 2026-05-27 | [78500](https://github.com/airbytehq/airbyte/pull/78500) | Remove Notion API budget while keeping configurable worker count defaulted to 5 |
| 4.0.8-rc.4 | 2026-05-26 | [78433](https://github.com/airbytehq/airbyte/pull/78433) | Reduce default concurrency to 4 while preserving configurable worker count and Notion API budget |
| 4.0.8-rc.3 | 2026-05-21 | [78343](https://github.com/airbytehq/airbyte/pull/78343) | Revert default concurrency to 5, add configurable worker count, and enforce Notion API budget |
| 4.0.8-rc.2 | 2026-05-19 | [78274](https://github.com/airbytehq/airbyte/pull/78274) | Increase `default_concurrency` to 6 for concurrency tuning iteration 2 |
| 4.0.8-rc.1 | 2026-05-18 | [78149](https://github.com/airbytehq/airbyte/pull/78149) | Start concurrency tuning rollout |
| 4.0.7 | 2026-04-28 | [77340](https://github.com/airbytehq/airbyte/pull/77340) | Update dependencies |
| 4.0.6 | 2026-04-21 | [76681](https://github.com/airbytehq/airbyte/pull/76681) | Update dependencies |
| 4.0.5 | 2026-04-01 | [75577](https://github.com/airbytehq/airbyte/pull/75577) | Add `oauth_connector_input_specification` for declarative OAuth |
| 4.0.4 | 2026-03-31 | [75747](https://github.com/airbytehq/airbyte/pull/75747) | Update dependencies |
| 4.0.3 | 2026-03-30 | [75603](https://github.com/airbytehq/airbyte/pull/75603) | Fix 429 status code mapping from RETRY to RATE_LIMITED for improved rate limit handling and observability |
| 4.0.2 | 2026-03-23 | [75290](https://github.com/airbytehq/airbyte/pull/75290) | Update v4.0.0 upgrade deadline to 2026-04-10 |
| 4.0.1 | 2026-03-10 | [74616](https://github.com/airbytehq/airbyte/pull/74616) | Update dependencies |
| 4.0.0 | 2026-02-25 | [74017](https://github.com/airbytehq/airbyte/pull/74017) | Migrate to Notion API version 2025-09-03: replace `databases` stream with `data_sources`, update page parent references, and add new schema fields |
| 3.3.14 | 2026-02-24 | [73856](https://github.com/airbytehq/airbyte/pull/73856) | Update dependencies |
| 3.3.13 | 2026-02-10 | [73032](https://github.com/airbytehq/airbyte/pull/73032) | Update dependencies |
| 3.3.12 | 2026-02-06 | [72925](https://github.com/airbytehq/airbyte/pull/72925) | Add client-side incremental filtering to blocks stream RecordFilter |
| 3.3.11 | 2026-01-20 | [71943](https://github.com/airbytehq/airbyte/pull/71943) | Update dependencies |
| 3.3.10 | 2026-01-14 | [71602](https://github.com/airbytehq/airbyte/pull/71602) | Update dependencies |
| 3.3.9 | 2025-12-18 | [70534](https://github.com/airbytehq/airbyte/pull/70534) | Update dependencies |
| 3.3.8 | 2025-11-25 | [69853](https://github.com/airbytehq/airbyte/pull/69853) | Update dependencies |
| 3.3.7 | 2025-11-24 | [69780](https://github.com/airbytehq/airbyte/pull/69780) | Fix bug in current_block_depth |
| 3.3.6 | 2025-11-18 | [69375](https://github.com/airbytehq/airbyte/pull/69375) | Update dependencies |
| 3.3.5 | 2025-10-29 | [68750](https://github.com/airbytehq/airbyte/pull/68750) | Update dependencies |
| 3.3.4 | 2025-10-21 | [68399](https://github.com/airbytehq/airbyte/pull/68399) | Update dependencies |
| 3.3.3 | 2025-10-14 | [67801](https://github.com/airbytehq/airbyte/pull/67801) | Update dependencies |
| 3.3.2 | 2025-10-07 | [67422](https://github.com/airbytehq/airbyte/pull/67422) | Update dependencies |
| 3.3.1 | 2025-09-30 | [66927](https://github.com/airbytehq/airbyte/pull/66927) | Update dependencies |
| 3.3.0 | 2025-09-29 | [66734](https://github.com/airbytehq/airbyte/pull/66734) | Promoting release candidate 3.3.0-rc.1 to a main version. |
| 3.3.0-rc.1 | 2025-09-25 | [66532](https://github.com/airbytehq/airbyte/pull/66532) | Migrate to manifest-only. |
| 3.2.0 | 2025-09-25 | [66695](https://github.com/airbytehq/airbyte/pull/66695) | Promoting release candidate 3.2.0-rc.4 to a main version. |
| 3.2.0-rc.4 | 2025-09-24 | [66664](https://github.com/airbytehq/airbyte/pull/66664) | Handle 404 error and add sequence_number for blocks stream |
| 3.2.0-rc.3 | 2025-09-19 | [66539](https://github.com/airbytehq/airbyte/pull/66539) | Add default start date if not provided in the config to custom component |
| 3.2.0-rc.2 | 2025-09-19 | [66530](https://github.com/airbytehq/airbyte/pull/66530) | Add default start date if not provided in the config |
| 3.2.0-rc.1 | 2025-09-18 | [66191](https://github.com/airbytehq/airbyte/pull/66191) | Migrate Blocks stream to manifest. |
| 3.1.0 | 2025-07-30 | [55725](https://github.com/airbytehq/airbyte/pull/55725) | Add sequence_number to fetched Notion blocks |
| 3.0.16 | 2025-07-28 | [64102](https://github.com/airbytehq/airbyte/pull/64102) | Promoting release candidate 3.0.16-rc.1 to a main version. |
| 3.0.16-rc.1 | 2025-07-21 | [63368](https://github.com/airbytehq/airbyte/pull/63368) | Migrate to CDK V6 |
| 3.0.15 | 2025-07-19 | [63382](https://github.com/airbytehq/airbyte/pull/63382) | Update dependencies |
| 3.0.14 | 2025-07-12 | [63213](https://github.com/airbytehq/airbyte/pull/63213) | Update dependencies |
| 3.0.13 | 2025-07-05 | [62609](https://github.com/airbytehq/airbyte/pull/62609) | Update dependencies |
| 3.0.12 | 2025-06-24 | [62033](https://github.com/airbytehq/airbyte/pull/62033) | Add "in_trash" field in Notion "Pages" endpoint schema |
| 3.0.11 | 2025-06-28 | [62356](https://github.com/airbytehq/airbyte/pull/62356) | Update dependencies |
| 3.0.10 | 2025-06-21 | [61902](https://github.com/airbytehq/airbyte/pull/61902) | Update dependencies |
| 3.0.9 | 2025-06-14 | [61602](https://github.com/airbytehq/airbyte/pull/61602) | Update dependencies |
| 3.0.8 | 2025-06-07 | [52290](https://github.com/airbytehq/airbyte/pull/52290) | Update dependencies |
| 3.0.7 | 2025-01-11 | [43832](https://github.com/airbytehq/airbyte/pull/43832) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 3.0.6 | 2024-06-25 | [40498](https://github.com/airbytehq/airbyte/pull/40498) | Fix Pydantic error - add missing type annotation for `max_cursor_time` |
| 3.0.5 | 2024-06-04 | [38871](https://github.com/airbytehq/airbyte/pull/38871) | Refactor: use `client_side_incremental` feature |
| 3.0.4 | 2024-06-06 | [38798](https://github.com/airbytehq/airbyte/pull/38798) | Implement CheckpointMixin for state handling |
| 3.0.3 | 2024-06-06 | [39204](https://github.com/airbytehq/airbyte/pull/39204) | [autopull] Upgrade base image to v1.2.2 |
| 3.0.2 | 2024-05-20 | [38266](https://github.com/airbytehq/airbyte/pull/38266) | Replace AirbyteLogger with logging.Logger |
| 3.0.1 | 2024-04-24 | [36653](https://github.com/airbytehq/airbyte/pull/36653) | Schema descriptions and CDK 0.80.0 |
| 3.0.0 | 2024-04-12 | [35974](https://github.com/airbytehq/airbyte/pull/35974) | Migrate to low-code CDK (python CDK for Blocks stream) |
| 2.2.0 | 2024-04-08 | [36890](https://github.com/airbytehq/airbyte/pull/36890) | Unpin CDK version |
| 2.1.0 | 2024-02-19 | [35409](https://github.com/airbytehq/airbyte/pull/35409) | Update users stream schema with bot type info fields and block schema with mention type info fields. |
| 2.0.9 | 2024-02-12 | [35155](https://github.com/airbytehq/airbyte/pull/35155) | Manage dependencies with Poetry. |
| 2.0.8 | 2023-11-01 | [31899](https://github.com/airbytehq/airbyte/pull/31899) | Fix `table_row.cells` property in `Blocks` stream |
| 2.0.7 | 2023-10-31 | [32004](https://github.com/airbytehq/airbyte/pull/32004) | Reduce page_size on 504 errors |
| 2.0.6 | 2023-10-25 | [31825](https://github.com/airbytehq/airbyte/pull/31825) | Increase max_retries on retryable errors |
| 2.0.5 | 2023-10-23 | [31742](https://github.com/airbytehq/airbyte/pull/31742) | Add 'synced_block' property to Blocks schema |
| 2.0.4 | 2023-10-19 | [31625](https://github.com/airbytehq/airbyte/pull/31625) | Fix check_connection method |
| 2.0.3 | 2023-10-19 | [31612](https://github.com/airbytehq/airbyte/pull/31612) | Add exponential backoff for 500 errors |
| 2.0.2 | 2023-10-19 | [31599](https://github.com/airbytehq/airbyte/pull/31599) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 2.0.1 | 2023-10-17 | [31507](https://github.com/airbytehq/airbyte/pull/31507) | Add start_date validation checks |
| 2.0.0 | 2023-10-09 | [30587](https://github.com/airbytehq/airbyte/pull/30587) | Source-wide schema update |
| 1.3.0 | 2023-10-09 | [30324](https://github.com/airbytehq/airbyte/pull/30324) | Add `Comments` stream |
| 1.2.2 | 2023-10-09 | [30780](https://github.com/airbytehq/airbyte/pull/30780) | Update Start Date in config to optional field |
| 1.2.1 | 2023-10-08 | [30750](https://github.com/airbytehq/airbyte/pull/30750) | Add availability strategy |
| 1.2.0 | 2023-10-04 | [31053](https://github.com/airbytehq/airbyte/pull/31053) | Add undeclared fields for blocks and pages streams |
| 1.1.2 | 2023-08-30 | [29999](https://github.com/airbytehq/airbyte/pull/29999) | Update error handling during connection check |
| 1.1.1 | 2023-06-14 | [26535](https://github.com/airbytehq/airbyte/pull/26535) | Migrate from deprecated `authSpecification` to `advancedAuth` |
| 1.1.0 | 2023-06-08 | [27170](https://github.com/airbytehq/airbyte/pull/27170) | Fix typo in `blocks` schema |
| 1.0.9 | 2023-06-08 | [27062](https://github.com/airbytehq/airbyte/pull/27062) | Skip streams with `invalid_start_cursor` error |
| 1.0.8 | 2023-06-07 | [27073](https://github.com/airbytehq/airbyte/pull/27073) | Add empty results handling for stream `Blocks` |
| 1.0.7 | 2023-06-06 | [27060](https://github.com/airbytehq/airbyte/pull/27060) | Add skipping 404 error in `Blocks` stream |
| 1.0.6 | 2023-05-18 | [26286](https://github.com/airbytehq/airbyte/pull/26286) | Add `parent` field to `Blocks` stream |
| 1.0.5 | 2023-05-01 | [25709](https://github.com/airbytehq/airbyte/pull/25709) | Fixed `ai_block is unsupported by API` issue, while fetching `Blocks` stream |
| 1.0.4 | 2023-04-11 | [25041](https://github.com/airbytehq/airbyte/pull/25041) | Improve error handling for API /search |
| 1.0.3 | 2023-03-02 | [22931](https://github.com/airbytehq/airbyte/pull/22931) | Specified date formatting in specification |
| 1.0.2 | 2023-02-24 | [23437](https://github.com/airbytehq/airbyte/pull/23437) | Add retry for 400 error (validation_error) |
| 1.0.1 | 2023-01-27 | [22018](https://github.com/airbytehq/airbyte/pull/22018) | Set `AvailabilityStrategy` for streams explicitly to `None` |
| 1.0.0 | 2022-12-19 | [20639](https://github.com/airbytehq/airbyte/pull/20639) | Fix `Pages` stream schema |
| 0.1.10 | 2022-09-28 | [17298](https://github.com/airbytehq/airbyte/pull/17298) | Use "Retry-After" header for backoff |
| 0.1.9 | 2022-09-16 | [16799](https://github.com/airbytehq/airbyte/pull/16799) | Migrate to per-stream state |
| 0.1.8 | 2022-09-05 | [16272](https://github.com/airbytehq/airbyte/pull/16272) | Update spec description to include working timestamp example |
| 0.1.7 | 2022-07-26 | [15042](https://github.com/airbytehq/airbyte/pull/15042) | Update `additionalProperties` field to true from shared schemas |
| 0.1.6 | 2022-07-21 | [14924](https://github.com/airbytehq/airbyte/pull/14924) | Remove `additionalProperties` field from schemas and spec |
| 0.1.5 | 2022-07-14 | [14706](https://github.com/airbytehq/airbyte/pull/14706) | Added OAuth2.0 authentication |
| 0.1.4 | 2022-07-07 | [14505](https://github.com/airbytehq/airbyte/pull/14505) | Fixed bug when normalization didn't run through |
| 0.1.3 | 2022-04-22 | [11452](https://github.com/airbytehq/airbyte/pull/11452) | Use pagination for User stream |
| 0.1.2 | 2022-01-11 | [9084](https://github.com/airbytehq/airbyte/pull/9084) | Fix documentation URL |
| 0.1.1 | 2021-12-30 | [9207](https://github.com/airbytehq/airbyte/pull/9207) | Update connector fields title/description |
| 0.1.0 | 2021-10-17 | [7092](https://github.com/airbytehq/airbyte/pull/7092) | Initial Release |

</details>
