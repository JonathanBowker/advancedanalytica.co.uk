---
generated_record: true
connector_name: Wordpress
connector_type: source
connector_slug: wordpress
connector_directory: source-wordpress
definition_id: c71d6f95-a912-432b-ad96-73ded4be7b9c
version: 0.0.72
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/wordpress
logo: /images/connectors/sources/wordpress.svg
logo_source_path: airbyte-integrations/connectors/source-wordpress/icon.svg
logo_sha256: 788a8152358831686538647b1cc2173d2fd6941d8908f21aee30bae22210d46b
original_metadata_path: airbyte-integrations/connectors/source-wordpress/metadata.yaml
original_metadata_sha256: fe2039ed4af18a58d090d7809a9e4741e507dc2c24b2addb2d5d941cb0078b6a
original_document_path: docs/integrations/sources/wordpress.md
original_document_sha256: 9377b356acc611f40e52fe2f83d329d844e7ed087552c80081a22a57e09536b1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5aca0b7c2aab1f8d1431d69d4df7d4fc3d0f2b7d4317401902eb156f7204fa88
rewritten_at: 2026-11-12T14:00:46.673325+00:00
---

# WordPress

<HideInUI>

Use this page to set up the [WordPress](https://wordpress.org/) source connector and find reference information.

</HideInUI>

## Prerequisites

- A self-hosted WordPress site (WordPress.org) with the [REST API](https://developer.wordpress.org/rest-api/) enabled. It's enabled by default on WordPress 4.7 and later.
- Your site's domain name, for example, `my-site.example.com`.

:::note
This connector reads data from the public WordPress REST API. You can access most read endpoints without authentication. These include posts, pages, comments, categories, tags, and media. Endpoints exposing private data require authentication. These include plugins, themes, settings, and full user details.
:::

### Authentication

The connector sends HTTP Basic Authentication headers with every request. For public endpoints, leave the **Username** and **Password** fields at their default values.

To access authenticated endpoints, including plugins, themes, and settings, provide valid WordPress credentials. WordPress recommends [Application Passwords](https://developer.wordpress.org/advanced-administration/security/application-passwords/) for REST API authentication. They're available from WordPress 5.6.

1. In your WordPress admin dashboard, go to **Users > Profile**.
2. Scroll to the **Application Passwords** section.
3. Enter an application name, for example, `Airbyte`, then click **Add New Application Password**.
4. Copy the generated password. Use your WordPress username and this application password as the connector credentials.

## Set up

1. Enter your WordPress site's **Domain** without the protocol, for example, `my-site.example.com`.
2. Enter your **Username** and **Password**. Keep the default values if you only need to sync public data.
3. Optionally, set a **Start Date**. This limits incremental streams to records modified after that date. Use the format `YYYY-MM-DDTHH:MM:SSZ`, for example, `2024-01-01T00:00:00Z`.
4. Optionally, set a **Lookback Window** in hours for incremental streams. Each sync re-fetches that many hours of previously synced data to prevent data loss. Set it to `0` to disable this setting. Destination deduplication handles duplicates.

<HideInUI>

## Supported sync modes

The WordPress source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- Full Refresh
- Incremental

## Supported streams

The connector syncs data from these [WordPress REST API](https://developer.wordpress.org/rest-api/reference/) endpoints:

| Stream | API Endpoint | Sync Mode | Pagination | Primary Key | Description |
| --- | --- | --- | --- | --- | --- |
| [users](https://developer.wordpress.org/rest-api/reference/users/) | `/wp/v2/users` | Full Refresh | Yes | `id` | Site authors and contributors. |
| [posts](https://developer.wordpress.org/rest-api/reference/posts/) | `/wp/v2/posts` | Full Refresh | Yes | `id` | Blog posts. |
| [categories](https://developer.wordpress.org/rest-api/reference/categories/) | `/wp/v2/categories` | Full Refresh | Yes | `id` | Post categories. |
| [tags](https://developer.wordpress.org/rest-api/reference/tags/) | `/wp/v2/tags` | Full Refresh | Yes | `id` | Post tags. |
| [pages](https://developer.wordpress.org/rest-api/reference/pages/) | `/wp/v2/pages` | Incremental | Yes | `id` | Static pages. Cursor field: `modified`. |
| [page_revisions](https://developer.wordpress.org/rest-api/reference/page-revisions/) | `/wp/v2/pages/{id}/revisions` | Full Refresh | Yes | `id` | Revision history for each page. |
| [comments](https://developer.wordpress.org/rest-api/reference/comments/) | `/wp/v2/comments` | Incremental | Yes | `id` | Comments on posts and pages. Cursor field: `date`. |
| [media](https://developer.wordpress.org/rest-api/reference/media/) | `/wp/v2/media` | Incremental | Yes | `id` | Uploaded images, videos, and other media files. Cursor field: `modified`. |
| [editor_blocks](https://developer.wordpress.org/rest-api/reference/blocks/) | `/wp/v2/blocks` | Incremental | Yes | `id` | Reusable block patterns (synced patterns). Cursor field: `modified`. |
| [plugins](https://developer.wordpress.org/rest-api/reference/plugins/) | `/wp/v2/plugins` | Full Refresh | No | `plugin` | Installed plugins. Requires authentication. |
| [taxonomies](https://developer.wordpress.org/rest-api/reference/taxonomies/) | `/wp/v2/taxonomies` | Full Refresh | No | `category` | Registered taxonomies (for example, categories and tags). |
| [types](https://developer.wordpress.org/rest-api/reference/post-types/) | `/wp/v2/types` | Full Refresh | No | — | Registered post types (for example, post, page, attachment). |
| [themes](https://developer.wordpress.org/rest-api/reference/themes/) | `/wp/v2/themes` | Full Refresh | No | `stylesheet` | Installed themes. Requires authentication. |
| [statuses](https://developer.wordpress.org/rest-api/reference/post-statuses/) | `/wp/v2/statuses` | Full Refresh | No | — | Available post statuses (for example, publish, draft, private). |
| [settings](https://developer.wordpress.org/rest-api/reference/settings/) | `/wp/v2/settings` | Full Refresh | No | — | Site-wide settings such as title, description, and timezone. Requires authentication. |

### Incremental sync

The `pages`, `media`, and `editor_blocks` streams use the `modified` field as their cursor. This tracks records by their last modification time in the site's local timezone. The `comments` stream uses the `date` field.

These timestamps use the site's local timezone. Clock changes during daylight saving time (DST) transitions can therefore cause non-monotonic timestamps. If this concerns you, configure a **Lookback Window** to re-fetch recent data and prevent gaps.

## Limitations

- **Pagination**: The WordPress REST API limits paginated responses to 100 items per page. The connector handles this automatically.
- **Authenticated endpoints**: The `plugins`, `themes`, and `settings` streams require valid credentials. Without authentication, these streams return errors or empty results.
- **WordPress.com hosted sites**: This connector supports the self-hosted WordPress REST API (`/wp-json/wp/v2/`). It may not work with WordPress.com sites, which use a different API structure.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| --- | --- | --- | --- |
| 0.0.72 | 2026-11-10 | [91777](https://github.com/airbytehq/airbyte/pull/91777) | Update dependencies |
| 0.0.71 | 2026-11-03 | [90819](https://github.com/airbytehq/airbyte/pull/90819) | Update dependencies |
| 0.0.70 | 2026-10-27 | [90072](https://github.com/airbytehq/airbyte/pull/90072) | Update dependencies |
| 0.0.69 | 2026-10-20 | [89460](https://github.com/airbytehq/airbyte/pull/89460) | Update dependencies |
| 0.0.68 | 2026-10-13 | [88873](https://github.com/airbytehq/airbyte/pull/88873) | Update dependencies |
| 0.0.67 | 2026-10-06 | [88109](https://github.com/airbytehq/airbyte/pull/88109) | Update dependencies |
| 0.0.66 | 2026-09-29 | [87423](https://github.com/airbytehq/airbyte/pull/87423) | Update dependencies |
| 0.0.65 | 2026-09-22 | [86896](https://github.com/airbytehq/airbyte/pull/86896) | Update dependencies |
| 0.0.64 | 2026-09-15 | [86286](https://github.com/airbytehq/airbyte/pull/86286) | Update dependencies |
| 0.0.63 | 2026-09-08 | [85725](https://github.com/airbytehq/airbyte/pull/85725) | Update dependencies |
| 0.0.62 | 2026-08-18 | [84832](https://github.com/airbytehq/airbyte/pull/84832) | Update dependencies |
| 0.0.61 | 2026-08-11 | [84186](https://github.com/airbytehq/airbyte/pull/84186) | Update dependencies |
| 0.0.60 | 2026-08-04 | [83677](https://github.com/airbytehq/airbyte/pull/83677) | Update dependencies |
| 0.0.59 | 2026-07-28 | [83155](https://github.com/airbytehq/airbyte/pull/83155) | Update dependencies |
| 0.0.58 | 2026-07-21 | [82673](https://github.com/airbytehq/airbyte/pull/82673) | Update dependencies |
| 0.0.57 | 2026-07-14 | [82079](https://github.com/airbytehq/airbyte/pull/82079) | Update dependencies |
| 0.0.56 | 2026-06-30 | [81328](https://github.com/airbytehq/airbyte/pull/81328) | Update dependencies |
| 0.0.55 | 2026-06-23 | [80728](https://github.com/airbytehq/airbyte/pull/80728) | Update dependencies |
| 0.0.54 | 2026-06-16 | [80120](https://github.com/airbytehq/airbyte/pull/80120) | Update dependencies |
| 0.0.53 | 2026-06-09 | [79563](https://github.com/airbytehq/airbyte/pull/79563) | Update dependencies |
| 0.0.52 | 2026-06-02 | [79064](https://github.com/airbytehq/airbyte/pull/79064) | Update dependencies |
| 0.0.51 | 2026-04-28 | [77478](https://github.com/airbytehq/airbyte/pull/77478) | Update dependencies |
| 0.0.49 | 2026-04-09 | [76063](https://github.com/airbytehq/airbyte/pull/76063) | Add configurable lookback window to incremental streams to prevent data loss; fix tab character in pages stream request parameter |
| Version | Date       | Pull Request | Subject                                                                               |
| ------- | ---------- | ------------ | ------------------------------------------------------------------------------------- |
| 0.0.50 | 2026-04-21 | [76792](https://github.com/airbytehq/airbyte/pull/76792) | Update dependencies |
| 0.0.49 | 2026-04-03 | [76063](https://github.com/airbytehq/airbyte/pull/76063) | Add 1-hour lookback window to incremental streams to prevent data loss during DST transitions; fix tab character in pages stream request parameter |
| 0.0.48 | 2026-03-31 | [75861](https://github.com/airbytehq/airbyte/pull/75861) | Update dependencies |
| 0.0.47 | 2026-03-24 | [74691](https://github.com/airbytehq/airbyte/pull/74691) | Update dependencies |
| 0.0.46 | 2026-03-03 | [74149](https://github.com/airbytehq/airbyte/pull/74149) | Update dependencies |
| 0.0.45 | 2026-02-17 | [73511](https://github.com/airbytehq/airbyte/pull/73511) | Update dependencies |
| 0.0.44 | 2026-01-27 | [72050](https://github.com/airbytehq/airbyte/pull/72050) | Update dependencies |
| 0.0.43 | 2026-01-14 | [71483](https://github.com/airbytehq/airbyte/pull/71483) | Update dependencies |
| 0.0.42 | 2025-12-18 | [70682](https://github.com/airbytehq/airbyte/pull/70682) | Update dependencies |
| 0.0.41 | 2025-11-25 | [70195](https://github.com/airbytehq/airbyte/pull/70195) | Update dependencies |
| 0.0.40 | 2025-11-18 | [69649](https://github.com/airbytehq/airbyte/pull/69649) | Update dependencies |
| 0.0.39 | 2025-10-29 | [68929](https://github.com/airbytehq/airbyte/pull/68929) | Update dependencies |
| 0.0.38 | 2025-10-21 | [68373](https://github.com/airbytehq/airbyte/pull/68373) | Update dependencies |
| 0.0.37 | 2025-10-14 | [67932](https://github.com/airbytehq/airbyte/pull/67932) | Update dependencies |
| 0.0.36 | 2025-10-07 | [67324](https://github.com/airbytehq/airbyte/pull/67324) | Update dependencies |
| 0.0.35 | 2025-09-30 | [66457](https://github.com/airbytehq/airbyte/pull/66457) | Update dependencies |
| 0.0.34 | 2025-09-09 | [65666](https://github.com/airbytehq/airbyte/pull/65666) | Update dependencies |
| 0.0.33 | 2025-08-24 | [65432](https://github.com/airbytehq/airbyte/pull/65432) | Update dependencies |
| 0.0.32 | 2025-08-10 | [64860](https://github.com/airbytehq/airbyte/pull/64860) | Update dependencies |
| 0.0.31 | 2025-08-02 | [64324](https://github.com/airbytehq/airbyte/pull/64324) | Update dependencies |
| 0.0.30 | 2025-07-27 | [64091](https://github.com/airbytehq/airbyte/pull/64091) | Update dependencies |
| 0.0.29 | 2025-07-19 | [63637](https://github.com/airbytehq/airbyte/pull/63637) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63192](https://github.com/airbytehq/airbyte/pull/63192) | Update dependencies |
| 0.0.27 | 2025-07-05 | [62750](https://github.com/airbytehq/airbyte/pull/62750) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62239](https://github.com/airbytehq/airbyte/pull/62239) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61780](https://github.com/airbytehq/airbyte/pull/61780) | Update dependencies |
| 0.0.24 | 2025-06-15 | [61196](https://github.com/airbytehq/airbyte/pull/61196) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60745](https://github.com/airbytehq/airbyte/pull/60745) | Update dependencies |
| 0.0.22 | 2025-05-10 | [60006](https://github.com/airbytehq/airbyte/pull/60006) | Update dependencies |
| 0.0.21 | 2025-05-04 | [59556](https://github.com/airbytehq/airbyte/pull/59556) | Update dependencies |
| 0.0.20 | 2025-04-26 | [58946](https://github.com/airbytehq/airbyte/pull/58946) | Update dependencies |
| 0.0.19 | 2025-04-19 | [58568](https://github.com/airbytehq/airbyte/pull/58568) | Update dependencies |
| 0.0.18 | 2025-04-13 | [58050](https://github.com/airbytehq/airbyte/pull/58050) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57402](https://github.com/airbytehq/airbyte/pull/57402) | Update dependencies |
| 0.0.16 | 2025-03-29 | [56901](https://github.com/airbytehq/airbyte/pull/56901) | Update dependencies |
| 0.0.15 | 2025-03-22 | [56297](https://github.com/airbytehq/airbyte/pull/56297) | Update dependencies |
| 0.0.14 | 2025-03-08 | [55593](https://github.com/airbytehq/airbyte/pull/55593) | Update dependencies |
| 0.0.13 | 2025-03-01 | [55140](https://github.com/airbytehq/airbyte/pull/55140) | Update dependencies |
| 0.0.12 | 2025-02-22 | [54494](https://github.com/airbytehq/airbyte/pull/54494) | Update dependencies |
| 0.0.11 | 2025-02-15 | [54027](https://github.com/airbytehq/airbyte/pull/54027) | Update dependencies |
| 0.0.10 | 2025-02-08 | [53564](https://github.com/airbytehq/airbyte/pull/53564) | Update dependencies |
| 0.0.9 | 2025-02-01 | [53044](https://github.com/airbytehq/airbyte/pull/53044) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52424](https://github.com/airbytehq/airbyte/pull/52424) | Update dependencies |
| 0.0.7 | 2025-01-18 | [52008](https://github.com/airbytehq/airbyte/pull/52008) | Update dependencies |
| 0.0.6 | 2025-01-11 | [51432](https://github.com/airbytehq/airbyte/pull/51432) | Update dependencies |
| 0.0.5 | 2024-12-28 | [50763](https://github.com/airbytehq/airbyte/pull/50763) | Update dependencies |
| 0.0.4 | 2024-12-21 | [50361](https://github.com/airbytehq/airbyte/pull/50361) | Update dependencies |
| 0.0.3 | 2024-12-14 | [49743](https://github.com/airbytehq/airbyte/pull/49743) | Update dependencies |
| 0.0.2 | 2024-12-12 | [49433](https://github.com/airbytehq/airbyte/pull/49433) | Update dependencies |
| 0.0.1 | 2024-10-21 | 46378 | Initial release by [@bishalbera](https://github.com/bishalbera) via Connector Builder |

</details>

</HideInUI>
