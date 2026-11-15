---
generated_record: true
connector_name: Feishu
connector_type: source
connector_slug: feishu
connector_directory: source-feishu
definition_id: 3f1aa18a-a111-4e3b-8cac-9b79a091cc13
version: 0.0.28
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/feishu
logo: /images/connectors/sources/feishu.svg
logo_source_path: airbyte-integrations/connectors/source-feishu/icon.svg
logo_sha256: dadc81423055eb486a5d5c08405622a55cce8b2f7b10eb1d73fbf044628715c1
original_metadata_path: airbyte-integrations/connectors/source-feishu/metadata.yaml
original_metadata_sha256: be39564c360c9b3afa4fb389ed96d90ad89506d791b20ba386b263ebb2d8826f
original_document_path: docs/integrations/sources/feishu.md
original_document_sha256: fadeeffc461d012dfa5db4e3f6fa38bc849a74156949c7aa12c40178e63e3723
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 94b7d125877bcd56cd4f8be445cda2e4cbd36ee281ec0570781774872ef311ad
rewritten_at: 2026-11-12T13:37:08.847833+00:00
---

# Feishu

<HideInUI>

Set up the [Feishu](https://www.feishu.cn/) source connector, also known as [Lark](https://www.larksuite.com/), using this guide and reference information.

</HideInUI>

Sync records from a [Feishu/Lark Bitable](https://www.feishu.cn/product/bitable) (Base) table using the Feishu source connector and Feishu Open Platform API.

## Prerequisites

- A [Feishu](https://www.feishu.cn/) or [Lark](https://www.larksuite.com/) account
- A custom app created in the [Feishu Open Platform](https://open.feishu.cn/) (or [Lark Developer](https://open.larksuite.com/)) with Bitable read permissions
- The **App ID** and **App Secret** for that custom app
- A Bitable (Base) with at least one table you want to sync

## Set up Feishu

### Step 1: Create a custom app

1. Go to the [Feishu Open Platform Developer Console](https://open.feishu.cn/app), or [Lark Developer Console](https://open.larksuite.com/app) for international accounts.
2. Click **Create Custom App**, then enter the app name and description.
3. After creating the app, go to **Credentials & Basic Info** to find your **App ID** and **App Secret**.

### Step 2: Grant Bitable permissions

1. In your custom app's settings, go to **Permissions & Scopes**.
2. Add the Bitable scopes required to read records, such as `bitable:app:readonly` or `bitable:app`.
3. Publish the app or submit it for review, depending on your organisation's requirements.

### Step 3: Find the App Token and Table ID

1. Open the Bitable (Base) you want to sync in your browser.
2. Find the **App Token** in the URL path: `https://your-domain.feishu.cn/base/{app_token}`.
3. Find the **Table ID** in the URL query parameter: `?table={table_id}`.

### Step 4: Set up the Airbyte connector

1. In Airbyte, go to **Sources** and select **Feishu**.
2. Enter the **App ID** and **App Secret** from Step 1.
3. Enter the **App Token** and **Table ID** from Step 3.
4. If you use Lark (international), change the **Lark Host** to `https://open.larksuite.com`. The default (`https://open.feishu.cn`) is for Feishu (China mainland).
5. Optionally, adjust the **Page Size** (default: 100, maximum: 500).
6. Click **Set up source**.

## Supported sync modes

The Feishu source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/):

- [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite)
- [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append)

## Supported streams

| Stream | Primary key | Pagination | Incremental |
|--------|-------------|------------|-------------|
| records | `record_id` | Cursor-based (`page_token`) | No |

The **records** stream returns every record from the specified Bitable table. Each record includes a `record_id`, an optional `id` and a `fields` object. This object contains each table column's values. The columns defined in your Bitable table determine the `fields` object's structure.

## Limitations

- Each configured source syncs records from one Bitable table. To sync multiple tables, create a separate source for each table.
- The connector supports full refresh sync only. Incremental sync isn't available.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|---------|------|--------------|---------|
| 0.0.28 | 2026-11-10 | [91508](https://github.com/airbytehq/airbyte/pull/91508) | Update dependencies |
| 0.0.27 | 2026-11-03 | [90539](https://github.com/airbytehq/airbyte/pull/90539) | Update dependencies |
| 0.0.26 | 2026-10-27 | [89894](https://github.com/airbytehq/airbyte/pull/89894) | Update dependencies |
| 0.0.25 | 2026-10-20 | [89219](https://github.com/airbytehq/airbyte/pull/89219) | Update dependencies |
| 0.0.24 | 2026-10-13 | [88609](https://github.com/airbytehq/airbyte/pull/88609) | Update dependencies |
| 0.0.23 | 2026-10-07 | [88298](https://github.com/airbytehq/airbyte/pull/88298) | Fix `SessionTokenAuthenticator` `expiration_duration` (`"7200"` is not a valid ISO 8601 duration, so every check/sync failed with "Unable to parse duration string"); surface Feishu auth errors as config errors |
| 0.0.22 | 2026-10-06 | [87868](https://github.com/airbytehq/airbyte/pull/87868) | Update dependencies |
| 0.0.21 | 2026-09-29 | [87166](https://github.com/airbytehq/airbyte/pull/87166) | Update dependencies |
| 0.0.20 | 2026-09-22 | [86611](https://github.com/airbytehq/airbyte/pull/86611) | Update dependencies |
| 0.0.19 | 2026-09-15 | [86064](https://github.com/airbytehq/airbyte/pull/86064) | Update dependencies |
| 0.0.18 | 2026-09-08 | [85462](https://github.com/airbytehq/airbyte/pull/85462) | Update dependencies |
| 0.0.17 | 2026-08-18 | [84561](https://github.com/airbytehq/airbyte/pull/84561) | Update dependencies |
| 0.0.16 | 2026-08-11 | [83904](https://github.com/airbytehq/airbyte/pull/83904) | Update dependencies |
| 0.0.15 | 2026-08-04 | [83444](https://github.com/airbytehq/airbyte/pull/83444) | Update dependencies |
| 0.0.14 | 2026-07-28 | [82892](https://github.com/airbytehq/airbyte/pull/82892) | Update dependencies |
| 0.0.13 | 2026-07-21 | [82387](https://github.com/airbytehq/airbyte/pull/82387) | Update dependencies |
| 0.0.12 | 2026-07-14 | [81821](https://github.com/airbytehq/airbyte/pull/81821) | Update dependencies |
| 0.0.11 | 2026-06-30 | [81054](https://github.com/airbytehq/airbyte/pull/81054) | Update dependencies |
| 0.0.10 | 2026-06-23 | [80477](https://github.com/airbytehq/airbyte/pull/80477) | Update dependencies |
| 0.0.9 | 2026-06-16 | [79796](https://github.com/airbytehq/airbyte/pull/79796) | Update dependencies |
| 0.0.8 | 2026-06-09 | [79335](https://github.com/airbytehq/airbyte/pull/79335) | Update dependencies |
| 0.0.7 | 2026-06-02 | [78689](https://github.com/airbytehq/airbyte/pull/78689) | Update dependencies |
| 0.0.6 | 2026-04-28 | [77250](https://github.com/airbytehq/airbyte/pull/77250) | Update dependencies |
| 0.0.5 | 2026-04-21 | [76574](https://github.com/airbytehq/airbyte/pull/76574) | Update dependencies |
| 0.0.4 | 2026-03-31 | [75717](https://github.com/airbytehq/airbyte/pull/75717) | Update dependencies |
| 0.0.3 | 2026-03-17 | [74640](https://github.com/airbytehq/airbyte/pull/74640) | Update dependencies |
| 0.0.2 | 2026-02-24 | [73777](https://github.com/airbytehq/airbyte/pull/73777) | Update dependencies |
| 0.0.1 | 2026-02-19 | [71256](https://github.com/airbytehq/airbyte/pull/71256) | Initial release by [@WYW-min](https://github.com/WYW-min) via Connector Builder |

</details>
