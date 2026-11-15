---
generated_record: true
connector_name: Gorgias
connector_type: source
connector_slug: gorgias
connector_directory: source-gorgias
definition_id: 9fdc3733-c51a-4129-9be5-7e9ad6eab6ac
version: 0.1.61
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/gorgias
logo: /images/connectors/sources/gorgias.svg
logo_source_path: airbyte-integrations/connectors/source-gorgias/icon.svg
logo_sha256: 7da46d9c9ee0bd47d002e6f72b55598bcc3d9a23cb75731c7d23327cf18fe515
original_metadata_path: airbyte-integrations/connectors/source-gorgias/metadata.yaml
original_metadata_sha256: 4935a5bb07a0280a300d0c587942a28ccf11dc01bd2792b04f06ec10ae33182c
original_document_path: docs/integrations/sources/gorgias.md
original_document_sha256: 54085b07d05c592ac0e401095477743f9bd395802c422b6f4b4ff137c12d3aa3
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: bc83b09f8f4d62126b45dfc30287eae498f55b7807f3c57cf2b52829ae355628
rewritten_at: 2026-11-12T13:41:42.351110+00:00
---

# Gorgias

[Gorgias](https://gorgias.com/) is a customer support helpdesk for ecommerce. This source syncs your helpdesk data from the [Gorgias REST API](https://developers.gorgias.com/reference/introduction). This includes tickets, messages, customers, and their supporting configuration and activity objects. See [Streams](#streams) for the full list.

## Prerequisites

- A Gorgias account with access to **Settings** > **REST API**, where you create API keys.
- Your Gorgias subdomain. If you sign in at `https://acme.gorgias.com`, your subdomain is `acme`.

## Set up the Gorgias source

1. In Gorgias, go to `https://YOUR_SUBDOMAIN.gorgias.com/app/settings/api` and create an API key.
2. In Airbyte, create a new Gorgias source and complete the fields below.

The connector uses HTTP basic authentication. Enter your email address as the username and your API key as the password. Private apps, including this connector, use API keys. OAuth2 is only for public Gorgias apps. See the [Gorgias authentication reference](https://developers.gorgias.com/reference/authentication) for details.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `username` | `string` | The email address of the Gorgias user that owns the API key. |  |
| `password` | `string` | The API key generated in **Settings** > **REST API**. |  |
| `domain_name` | `string` | Your Gorgias subdomain, taken from the URL prefix you use to reach Gorgias. For `https://acme.gorgias.com`, enter `acme`. |  |
| `start_date` | `string` | The starting cursor value for incremental syncs, in `YYYY-MM-DDTHH:MM:SSZ` format. Airbyte rejects any other format. The streams that read in full on every sync ignore this value. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| account | domain | No pagination | ✅ |  ✅  |
| customers | id | DefaultPaginator | ✅ |  ✅  |
| custom-fields | id | DefaultPaginator | ✅ |  ✅  |
| events | id | DefaultPaginator | ✅ |  ✅  |
| integrations | id | DefaultPaginator | ✅ |  ✅  |
| jobs | id | DefaultPaginator | ✅ |  ✅  |
| macros | id | DefaultPaginator | ✅ |  ✅  |
| views | id | DefaultPaginator | ✅ |  ✅  |
| rules | id | DefaultPaginator | ✅ |  ✅  |
| satisfaction-surveys | id | DefaultPaginator | ✅ |  ✅  |
| tags | id | DefaultPaginator | ✅ |  ✅  |
| teams | id | DefaultPaginator | ✅ |  ✅  |
| tickets | id | DefaultPaginator | ✅ |  ✅  |
| messages | id | DefaultPaginator | ✅ |  ✅  |
| users | id | DefaultPaginator | ✅ |  ✅  |
| views_items | view_id, id | DefaultPaginator | ✅ |  ✅  |

The `views_items` stream reads every view's items returned by the `views` stream. It adds the parent view's `view_id` to each record. The same item can appear in multiple views. Therefore, the stream uses `view_id` and `id` together as its primary key.

## Rate limits

Gorgias limits API key integrations to 40 requests within 20 seconds. It returns `429 Too Many Requests` when you exceed this limit. The connector paces requests within that limit and requests the maximum 100 records per page. Before retrying a throttled request, it waits for the seconds specified in the `Retry-after` response header. See the [Gorgias rate limit reference](https://developers.gorgias.com/reference/limitations) for details.

Anything using the same credentials shares this request limit. If other integrations use the same API key, syncs can still receive 429 responses. A sync can fail after three retries of a request.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Incremental syncs

Each stream has its own cursor field and applies sync state differently:

| Stream | Cursor field | How state limits the sync |
|--------|--------------|---------------------------|
| account | `created_datetime` | Reads in full on every sync |
| customers | `updated_datetime` | Stops paginating at the cursor |
| custom-fields | `updated_datetime` | Filters records after reading in full |
| events | `created_datetime` | Filters server-side, with a 5-minute lookback |
| integrations | `updated_datetime` | Filters records after reading in full |
| jobs | `created_datetime` | Stops paginating at the cursor |
| macros | `created_datetime` | Reads in full on every sync |
| views | `created_datetime` | Reads in full on every sync |
| rules | `created_datetime` | Stops paginating at the cursor |
| satisfaction-surveys | `created_datetime` | Reads in full on every sync |
| tags | `created_datetime` | Stops paginating at the cursor |
| teams | `created_datetime` | Stops paginating at the cursor |
| tickets | `updated_datetime` | Stops paginating at the cursor |
| messages | `created_datetime` | Stops paginating at the cursor |
| users | `created_datetime` | Stops paginating at the cursor |
| views_items | `created_datetime` | Reads in full on every sync |

Streams that stop paginating at the cursor only request pages that can contain new records. Their incremental syncs are therefore much cheaper than a full read. Streams that filter after a full read still request every page from the Gorgias API. They reduce the records Airbyte emits, but not the API calls made during the sync.

### Limitations

The following streams use `created_datetime` as their incremental cursor. Their incremental syncs don't capture changes made after a record's creation:

- **jobs**: job status transitions, including changes to `started_datetime` and `ended_datetime`. The schema doesn't include `updated_datetime`.
- **messages**: changes to message fields after creation. The schema doesn't include `updated_datetime`.
- **rules**: rule edits and deactivation changes. The schema includes `updated_datetime`, but the `/api/rules` endpoint can't order by it. Therefore, the stream uses `created_datetime` as its cursor.
- **tags**: tag renames and changes to descriptions or decorations. The schema doesn't include `updated_datetime`.
- **teams**: team renames and changes to descriptions, decorations, or members. The schema doesn't include `updated_datetime`.
- **users**: role, name, active-status, and timezone changes. The schema includes `updated_datetime`, but the `/api/users` endpoint can't order by it. Therefore, the stream uses `created_datetime` as its cursor.

Run a full refresh of the affected stream to capture these changes.

The `custom-fields` stream only returns custom fields with the object type `Ticket`. It doesn't sync custom fields defined on other Gorgias objects, such as customers.

Streams that read in full during every sync capture changes made after creation. These include a macro's name or a survey's `score` and `scored_datetime`.

The connector doesn't capture deletions as deletion events. Tickets expose `trashed`, and tags expose `deleted_datetime`. However, there is no deletion stream, so deleted records aren't captured as deletion events.

The incremental sync `end_datetime` is evaluated when the sync starts. Records created during a sync fall outside that window and are picked up by the next sync.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| ------------------ | ------------ | --- | ---------------- |
| 0.1.61 | 2026-11-03 | [90597](https://github.com/airbytehq/airbyte/pull/90597) | Update dependencies |
| 0.1.60 | 2026-11-01 | [90358](https://github.com/airbytehq/airbyte/pull/90358) | Simplify rate-limit error handling configuration with no change in sync behavior |
| 0.1.59 | 2026-10-27 | [89935](https://github.com/airbytehq/airbyte/pull/89935) | Update dependencies |
| 0.1.58 | 2026-10-20 | [89237](https://github.com/airbytehq/airbyte/pull/89237) | Update dependencies |
| 0.1.57 | 2026-10-13 | [88643](https://github.com/airbytehq/airbyte/pull/88643) | Update dependencies |
| 0.1.56 | 2026-10-06 | [87876](https://github.com/airbytehq/airbyte/pull/87876) | Update dependencies |
| 0.1.55 | 2026-09-29 | [87230](https://github.com/airbytehq/airbyte/pull/87230) | Update dependencies |
| 0.1.54 | 2026-09-22 | [86646](https://github.com/airbytehq/airbyte/pull/86646) | Update dependencies |
| 0.1.53 | 2026-09-15 | [86083](https://github.com/airbytehq/airbyte/pull/86083) | Update dependencies |
| 0.1.52 | 2026-09-08 | [85503](https://github.com/airbytehq/airbyte/pull/85503) | Update dependencies |
| 0.1.51 | 2026-08-25 | [84910](https://github.com/airbytehq/airbyte/pull/84910) | Incremental syncs now avoid re-reading previously-synced data across the applicable Gorgias streams using cursor-aware pagination, server-side date filtering, or client-side filtering. See [Incremental syncs](#incremental-syncs) for what an incremental sync no longer picks up. |
| 0.1.50 | 2026-08-18 | [84643](https://github.com/airbytehq/airbyte/pull/84643) | Update dependencies |
| 0.1.49 | 2026-08-11 | [83969](https://github.com/airbytehq/airbyte/pull/83969) | Update dependencies |
| 0.1.48 | 2026-08-04 | [83514](https://github.com/airbytehq/airbyte/pull/83514) | Update dependencies |
| 0.1.47 | 2026-07-28 | [82941](https://github.com/airbytehq/airbyte/pull/82941) | Update dependencies |
| 0.1.46 | 2026-07-21 | [82473](https://github.com/airbytehq/airbyte/pull/82473) | Update dependencies |
| 0.1.45 | 2026-07-14 | [81873](https://github.com/airbytehq/airbyte/pull/81873) | Update dependencies |
| 0.1.44 | 2026-06-30 | [81090](https://github.com/airbytehq/airbyte/pull/81090) | Update dependencies |
| 0.1.43 | 2026-06-23 | [80502](https://github.com/airbytehq/airbyte/pull/80502) | Update dependencies |
| 0.1.42 | 2026-06-16 | [79893](https://github.com/airbytehq/airbyte/pull/79893) | Update dependencies |
| 0.1.41 | 2026-06-09 | [79345](https://github.com/airbytehq/airbyte/pull/79345) | Update dependencies |
| 0.1.40 | 2026-06-02 | [78776](https://github.com/airbytehq/airbyte/pull/78776) | Update dependencies |
| 0.1.39 | 2026-04-28 | [77277](https://github.com/airbytehq/airbyte/pull/77277) | Update dependencies |
| 0.1.38 | 2026-04-21 | [76614](https://github.com/airbytehq/airbyte/pull/76614) | Update dependencies |
| 0.1.37 | 2026-03-17 | [74936](https://github.com/airbytehq/airbyte/pull/74936) | Update dependencies |
| 0.1.36 | 2026-03-10 | [74662](https://github.com/airbytehq/airbyte/pull/74662) | Update dependencies |
| 0.1.35 | 2026-02-24 | [73115](https://github.com/airbytehq/airbyte/pull/73115) | Update dependencies |
| 0.1.34 | 2026-01-20 | [71909](https://github.com/airbytehq/airbyte/pull/71909) | Update dependencies |
| 0.1.33 | 2026-01-14 | [71733](https://github.com/airbytehq/airbyte/pull/71733) | Update dependencies |
| 0.1.32 | 2025-12-18 | [70485](https://github.com/airbytehq/airbyte/pull/70485) | Update dependencies |
| 0.1.31 | 2025-11-25 | [70062](https://github.com/airbytehq/airbyte/pull/70062) | Update dependencies |
| 0.1.30 | 2025-11-18 | [69410](https://github.com/airbytehq/airbyte/pull/69410) | Update dependencies |
| 0.1.29 | 2025-10-29 | [68809](https://github.com/airbytehq/airbyte/pull/68809) | Update dependencies |
| 0.1.28 | 2025-10-21 | [68243](https://github.com/airbytehq/airbyte/pull/68243) | Update dependencies |
| 0.1.27 | 2025-10-14 | [67919](https://github.com/airbytehq/airbyte/pull/67919) | Update dependencies |
| 0.1.26 | 2025-10-07 | [67412](https://github.com/airbytehq/airbyte/pull/67412) | Update dependencies |
| 0.1.25 | 2025-09-30 | [66399](https://github.com/airbytehq/airbyte/pull/66399) | Update dependencies |
| 0.1.24 | 2025-09-09 | [66058](https://github.com/airbytehq/airbyte/pull/66058) | Update dependencies |
| 0.1.23 | 2025-08-23 | [65350](https://github.com/airbytehq/airbyte/pull/65350) | Update dependencies |
| 0.1.22 | 2025-08-09 | [64599](https://github.com/airbytehq/airbyte/pull/64599) | Update dependencies |
| 0.1.21 | 2025-08-02 | [64303](https://github.com/airbytehq/airbyte/pull/64303) | Update dependencies |
| 0.1.20 | 2025-07-26 | [63845](https://github.com/airbytehq/airbyte/pull/63845) | Update dependencies |
| 0.1.19 | 2025-07-19 | [63487](https://github.com/airbytehq/airbyte/pull/63487) | Update dependencies |
| 0.1.18 | 2025-07-12 | [63114](https://github.com/airbytehq/airbyte/pull/63114) | Update dependencies |
| 0.1.17 | 2025-07-05 | [62553](https://github.com/airbytehq/airbyte/pull/62553) | Update dependencies |
| 0.1.16 | 2025-06-28 | [62193](https://github.com/airbytehq/airbyte/pull/62193) | Update dependencies |
| 0.1.15 | 2025-06-21 | [61810](https://github.com/airbytehq/airbyte/pull/61810) | Update dependencies |
| 0.1.14 | 2025-06-14 | [61147](https://github.com/airbytehq/airbyte/pull/61147) | Update dependencies |
| 0.1.13 | 2025-05-24 | [60609](https://github.com/airbytehq/airbyte/pull/60609) | Update dependencies |
| 0.1.12 | 2025-05-10 | [59874](https://github.com/airbytehq/airbyte/pull/59874) | Update dependencies |
| 0.1.11 | 2025-05-03 | [59240](https://github.com/airbytehq/airbyte/pull/59240) | Update dependencies |
| 0.1.10 | 2025-04-26 | [58770](https://github.com/airbytehq/airbyte/pull/58770) | Update dependencies |
| 0.1.9 | 2025-04-19 | [58193](https://github.com/airbytehq/airbyte/pull/58193) | Update dependencies |
| 0.1.8 | 2025-04-12 | [57708](https://github.com/airbytehq/airbyte/pull/57708) | Update dependencies |
| 0.1.7 | 2025-04-05 | [57041](https://github.com/airbytehq/airbyte/pull/57041) | Update dependencies |
| 0.1.6 | 2025-03-29 | [56719](https://github.com/airbytehq/airbyte/pull/56719) | Update dependencies |
| 0.1.5 | 2025-03-22 | [56041](https://github.com/airbytehq/airbyte/pull/56041) | Update dependencies |
| 0.1.4 | 2025-03-08 | [55491](https://github.com/airbytehq/airbyte/pull/55491) | Update dependencies |
| 0.1.3 | 2025-03-01 | [54794](https://github.com/airbytehq/airbyte/pull/54794) | Update dependencies |
| 0.1.2 | 2025-02-22 | [54335](https://github.com/airbytehq/airbyte/pull/54335) | Update dependencies |
| 0.1.1 | 2025-02-15 | [50638](https://github.com/airbytehq/airbyte/pull/50638) | Update dependencies |
| 0.1.0 | 2025-01-30 | [52637](https://github.com/airbytehq/airbyte/pull/52637) | Add retries for rate limited streams |
| 0.0.8 | 2024-12-23 | [49935](https://github.com/airbytehq/airbyte/pull/49935) | Add additional cursor datetime format |
| 0.0.7 | 2024-12-21 | [50123](https://github.com/airbytehq/airbyte/pull/50123) | Update dependencies |
| 0.0.6 | 2024-12-14 | [49219](https://github.com/airbytehq/airbyte/pull/49219) | Update dependencies |
| 0.0.5 | 2024-12-11 | [48973](https://github.com/airbytehq/airbyte/pull/48973) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.4 | 2024-11-06 | [48378](https://github.com/airbytehq/airbyte/pull/48378) | Fix incremental sync format, Auto update schema with additional fields |
| 0.0.3 | 2024-10-29 | [47923](https://github.com/airbytehq/airbyte/pull/47923) | Update dependencies |
| 0.0.2 | 2024-10-28 | [47459](https://github.com/airbytehq/airbyte/pull/47459) | Update dependencies |
| 0.0.1 | 2024-09-29 | [46221](https://github.com/airbytehq/airbyte/pull/46221) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
