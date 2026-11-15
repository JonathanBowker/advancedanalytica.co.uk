---
generated_record: true
connector_name: Incident.io
connector_type: source
connector_slug: incident-io
connector_directory: source-incident-io
definition_id: 7926da90-399e-4f9f-9833-52d8dc3fcb29
version: 1.0.3
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/incident-io
logo: /images/connectors/sources/incident-io.svg
logo_source_path: airbyte-integrations/connectors/source-incident-io/icon.svg
logo_sha256: 2ff8c70f9e4d5321d6c6b00b1ae57a9171147d4864c01c15928288140ed657ab
original_metadata_path: airbyte-integrations/connectors/source-incident-io/metadata.yaml
original_metadata_sha256: ee4abb9b3ac2e04a8a880c2b36fa6410d86232e85612441651ccd9dccfe1a287
original_document_path: docs/integrations/sources/incident-io.md
original_document_sha256: 16f6c6ef34e994eb3a308b5228275f122c881009ab86fac79f19f37a52484271
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 09b89afa86d4ce0409632f9fd7e6b4a9593cd0449974039c88a84c4e0403ca6b
rewritten_at: 2026-11-12T13:43:36.354438+00:00
---

# Incident.io

<HideInUI>

This page explains how to set up the [Incident.io](https://docs.airbyte.com/integrations/sources/incident-io) source connector and provides reference information.

</HideInUI>

[Incident.io](https://incident.io/) provides on-call scheduling, status pages and incident response tools. This connector reads your account data through the [Incident.io API](https://docs.incident.io/api-reference/introduction).

## Prerequisites

- An Incident.io account.
- An Incident.io API key with permission to view the resources you want to sync. [Step 1](#step-1-set-up-incidentio) explains how to create one. The [Supported Streams](#supported-streams) table lists the permission required for each stream.

## Set up the connector

### 1. Set up Incident.io

1. In Incident.io, go to **Settings** → **API keys** and create a key. You need the **Manage API keys** permission to create or edit keys.
2. Choose what the key can do. Keys can have account-level permissions, team-scoped permissions or both. You can only grant permissions you hold. The connector needs view permission for every stream you plan to sync. The [Supported Streams](#supported-streams) table lists each stream's required permission.
3. Copy the token. Incident.io shows it only once.

For more information about keys and permissions, see [Authentication](https://docs.incident.io/api-reference/introduction#authentication) in the Incident.io API reference.

### 2. Set up the connector in Airbyte

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Incident.io from the Source type dropdown.
4. Enter a name for the Incident.io connector.
5. For **API Key**, enter the key you created in Step 1.
6. Optionally, set **Start Date**, **Time window** and **Number of concurrent workers**. See [Configuration options](#configuration-options).
7. Click **Set up source**.

#### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Incident.io from the Source type dropdown.
4. Enter a name for the Incident.io connector.
5. For **API Key**, enter the key you created in Step 1.
6. Optionally, set **Start Date**, **Time window** and **Number of concurrent workers**. See [Configuration options](#configuration-options).
7. Click **Set up source**.

### Configuration options

| Input | Type | Description | Default Value |
| ------- | ------ | ------------- | --------------- |
| `api_key` | `string` | API Key. An Incident.io API key with view permission for the streams you sync. Create it in Incident.io under Settings → API keys. | |
| `start_date` | `string` | Start Date. Only sync records updated on or after this UTC date-time, in the format `YYYY-MM-DDTHH:MM:SSZ`, for the `incidents`, `alerts`, `escalations`, `actions`, and `follow-ups` streams. Applies to both Full Refresh and Incremental syncs. The default predates all incident.io data. Streams read per incident, such as `incident_attachments`, follow the same scope and only cover incidents updated on or after this date. | 2020-01-01T00:00:00Z |
| `time_window` | `string` | Time window. Size of each date window requested from incident.io on incremental streams, in whole days as an ISO 8601 duration (for example `P30D`, `P7D`, `P365D`). The minimum is `P1D` because incidents and escalations filter by date. Smaller windows let more requests run in parallel on large accounts; larger windows mean fewer requests on small accounts. Defaults to `P30D`. | P30D |
| `num_workers` | `integer` | Number of concurrent workers. Number of streams and partitions read in parallel, from 1 to 10. Higher values can speed up large syncs but use more of the incident.io rate limit (1,200 requests per minute per API key, 60 per minute on incidents). | 4 |

## Supported sync modes

The Incident.io source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes):

| Feature | Supported? |
| :--- | :--- |
| Full Refresh Sync | Yes |
| Incremental Sync | Yes, on `incidents`, `alerts`, `escalations`, `actions`, and `follow-ups`, using `updated_at` |

Incremental streams request `updated_at` in windows set by the `time_window` option, which defaults to 30 days. Each stream resumes from its last synced timestamp with a small overlap. This overlap captures rows that commit slightly out of order. Append + Deduped removes repeated rows by primary key, while plain Append keeps them.

The `start_date` filter applies to all five incremental streams in every sync mode, including Full Refresh. If `start_date` is later than the default, Full Refresh excludes records last updated before that date.

## Supported streams

The **Required permission** column lists each stream's required API key permission, as documented in [Incident.io API reference](https://docs.incident.io/api-reference/introduction#authentication). Without that permission, the stream returns HTTP 403. See [Limitations & Troubleshooting](#limitations--troubleshooting).

| Stream | Endpoint | Primary key | Full Refresh | Incremental | Required permission |
| ------- | ---------- | ------------- | -------------- | ------------- | --------------------- |
| actions | `/v3/actions` | id | ✅ | ✅ | `actions.view` |
| alert_attributes | `/v2/alert_attributes` | id | ✅ | ❌ | `alert_schema.view` |
| alert_routes | `/v3/alert_routes` | id | ✅ | ❌ | `alert_routes.view` |
| alert_sources | `/v2/alert_sources` | id | ✅ | ❌ | `alert_sources.view` |
| alerts | `/v2/alerts` | id | ✅ | ✅ | `alerts.view` |
| catalog_entries | `/v3/catalog_entries` | id | ✅ | ❌ | `catalog_entries.view` |
| catalog_resources | `/v3/catalog_resources` | type | ✅ | ❌ | `catalog_types.view` |
| catalog_types | `/v3/catalog_types` | id | ✅ | ❌ | `catalog_types.view` |
| custom_field_options | `/v1/custom_field_options` | id | ✅ | ❌ | `custom_fields.view` |
| custom_fields | `/v2/custom_fields` | id | ✅ | ❌ | `custom_fields.view` |
| escalation_paths | `/v2/escalation_paths` | id | ✅ | ❌ | `escalation_paths.view` |
| escalations | `/v2/escalations` | id | ✅ | ✅ | `escalations.view` |
| follow-ups | `/v3/follow_ups` | id | ✅ | ✅ | `actions.view` |
| incident_alerts | `/v2/incident_alerts` | id | ✅ | ❌ | `alerts.view` |
| incident_attachments | `/v1/incident_attachments` | id | ✅ | ❌ | `attachments.view` |
| incident_roles | `/v2/incident_roles` | id | ✅ | ❌ | `incident_roles.view` |
| incident_statuses | `/v1/incident_statuses` | id | ✅ | ❌ | `incident_statuses.view` |
| incident_timestamps | `/v2/incident_timestamps` | id | ✅ | ❌ | Not documented by Incident.io |
| incident_types | `/v1/incident_types` | id | ✅ | ❌ | `incident_types.view` |
| incident_updates | `/v2/incident_updates` | id | ✅ | ❌ | `incidents.view` |
| incidents | `/v2/incidents` | id | ✅ | ✅ | `incidents.view` |
| schedules | `/v2/schedules` | id | ✅ | ❌ | `schedules.view` |
| severities | `/v1/severities` | id | ✅ | ❌ | `severities.view` |
| users | `/v2/users` | id | ✅ | ❌ | `users.view` |
| workflows | `/v2/workflows` | id | ✅ | ❌ | `workflows.view` |

The `incidents` stream includes incidents in every status category. This includes `declined`, `canceled` and `merged`, which the API excludes by default.

By default, the Incident.io API returns only `standard` and `retrospective` incidents and their related records. The `incidents`, `actions` and `follow-ups` streams request every incident mode: `standard`, `retrospective`, `test`, `tutorial` and `stream`. The `/v2/incidents` endpoint doesn't document the `stream` mode. Therefore, `incidents` contains stream incidents only when Incident.io returns them. To exclude test, tutorial or stream incidents, filter `incidents` using its `mode` field. For `actions` and `follow-ups`, join `incident_id` to `incidents`, then filter on `mode`.

The `users` stream includes deactivated and not-yet-active users. Filter them using the `is_active` field.

The `incident_alerts` stream links alerts to their attached incidents. Each record contains the `alert`, the `incident` and the `alert_route_id` of the alert route that created the link. Use this stream to join the `alerts` stream to the `incidents` stream. It reads every link in your account, so `start_date` doesn't apply.

The `alert_sources` stream doesn't include each alert source's `secret_token`. The connector removes this field before emitting records.

The `schedules` stream doesn't include `next_shifts`. Incident.io returns that field only on pages containing 25 schedules or fewer. The connector reads larger pages.

The connector reads three streams once for each parent stream record:

- `catalog_entries` reads each catalog type's entries returned by `catalog_types`.
- `custom_field_options` reads each custom field's options returned by `custom_fields`.
- `incident_attachments` reads each incident's attachments returned by `incidents`. It only covers incidents last updated on or after `start_date`.

### Performance

The Incident.io API allows [1,200 requests per minute per API key](https://docs.incident.io/api-reference/introduction#rate-limits). The incidents endpoint has a lower limit of 60 requests per minute. The connector stays within both limits. If the API still returns a rate-limit response, the connector waits for the requested interval before retrying.

`num_workers` controls how many streams and partitions the connector reads simultaneously. All workers share the same rate budget. A higher value can't exceed these limits, but it can use more of the available budget.

`incident_attachments` sends one request per incident during every sync. It first rereads the `incidents` endpoint from `start_date` at 60 requests per minute. For accounts with many incidents, this stream can add significant time to each sync. If you don't need attachments, deselect the stream.

## Data type map

| Integration Type | Airbyte Type |
| :--- | :--- |
| `string` | `string` |
| `string` in RFC 3339 date-time format | `timestamp_with_timezone` |
| `number` | `number` |
| `integer` | `integer` |
| `boolean` | `boolean` |
| `array` | `array` |
| `object` | `object` |

Incident.io returns timestamps as RFC 3339 strings. The connector declares them with `format: date-time`. Destinations that support this type store them as timestamps with time zone.

## Limitations and troubleshooting

- **Invalid API key (HTTP 401):** The sync fails if the API key is invalid or revoked. Create a new key under **Settings** → **API keys** in Incident.io. Then update the source configuration.
- **Missing permission (HTTP 403):** The sync fails with an Incident.io error naming the missing permission. Find the affected streams in the [Supported Streams](#supported-streams) table. Then add the permission under **Settings** → **API keys** in Incident.io, or deselect those streams from your connection. You don't need a new key or a source configuration update.
- **Transient errors (HTTP 408, 500, 502, 503, and 504):** The connector retries these requests automatically.
- **Rejected requests (other HTTP 4xx, such as 400, 404, or 422):** The sync fails with an Incident.io error. The `incident_attachments` stream handles 404 differently. See the next item. For all API error codes, see [Errors](https://docs.incident.io/api-reference/introduction#errors) in the Incident.io API reference.
- **Deleted incidents during a sync:** If someone deletes an incident while `incident_attachments` is running, the connector skips its attachments instead of failing.
- **Upgrading from 0.x to 1.0.0:** Version 1.0.0 changes field types and endpoints. Follow the [migration guide](/integrations/sources/incident-io-migrations#upgrading-to-100), then refresh the source schema after upgrading.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access by IP, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| --------- | ------ | -------------- | --------- |
| 1.0.3 | 2026-10-16 | [89010](https://github.com/airbytehq/airbyte/pull/89010) | Promote to Certified (GA) |
| 1.0.2 | 2026-10-15 | [88989](https://github.com/airbytehq/airbyte/pull/88989) | Declare `auto_run_mode`, `delay`, `folder`, `owning_team_ids` and `shortform` on workflows; restructure the documentation and link to the Incident.io API reference |
| 1.0.1 | 2026-10-14 | [88962](https://github.com/airbytehq/airbyte/pull/88962) | Declare `filter_by`, `fixed_filter` and `helptext_catalog_attribute_id` on custom fields; update the base image |
| 1.0.0 | 2026-10-14 | [88437](https://github.com/airbytehq/airbyte/pull/88437) | Type timestamp fields, move catalog_types and alert_routes to /v3, sync all incident modes. See the [migration guide](/integrations/sources/incident-io-migrations#upgrading-to-100) |
| 0.4.2 | 2026-10-13 | [88435](https://github.com/airbytehq/airbyte/pull/88435) | Declare `external_issue_reference` on incidents and `holidays_public_config` on schedules |
| 0.4.1 | 2026-10-13 | [88663](https://github.com/airbytehq/airbyte/pull/88663) | Update dependencies |
| 0.4.0 | 2026-10-09 | [88418](https://github.com/airbytehq/airbyte/pull/88418) | Add five alerting and escalation path streams |
| 0.3.0 | 2026-10-09 | [88416](https://github.com/airbytehq/airbyte/pull/88416) | Add five incident and catalog streams |
| 0.2.0 | 2026-10-08 | [88150](https://github.com/airbytehq/airbyte/pull/88150) | Migrate actions and follow-ups to /v3; add incremental sync, rate limiting, clearer errors, time_window and num_workers options, and sync incidents in every status category |
| 0.1.42 | 2026-10-06 | [87912](https://github.com/airbytehq/airbyte/pull/87912) | Update dependencies |
| 0.1.41 | 2026-09-29 | [87212](https://github.com/airbytehq/airbyte/pull/87212) | Update dependencies |
| 0.1.40 | 2026-09-22 | [86668](https://github.com/airbytehq/airbyte/pull/86668) | Update dependencies |
| 0.1.39 | 2026-09-15 | [86108](https://github.com/airbytehq/airbyte/pull/86108) | Update dependencies |
| 0.1.38 | 2026-09-08 | [85534](https://github.com/airbytehq/airbyte/pull/85534) | Update dependencies |
| 0.1.37 | 2026-08-18 | [84609](https://github.com/airbytehq/airbyte/pull/84609) | Update dependencies |
| 0.1.36 | 2026-08-11 | [83968](https://github.com/airbytehq/airbyte/pull/83968) | Update dependencies |
| 0.1.35 | 2026-08-04 | [83515](https://github.com/airbytehq/airbyte/pull/83515) | Update dependencies |
| 0.1.34 | 2026-07-28 | [82950](https://github.com/airbytehq/airbyte/pull/82950) | Update dependencies |
| 0.1.33 | 2026-07-21 | [82451](https://github.com/airbytehq/airbyte/pull/82451) | Update dependencies |
| 0.1.32 | 2026-07-14 | [81861](https://github.com/airbytehq/airbyte/pull/81861) | Update dependencies |
| 0.1.31 | 2026-06-30 | [81093](https://github.com/airbytehq/airbyte/pull/81093) | Update dependencies |
| 0.1.30 | 2026-06-23 | [80512](https://github.com/airbytehq/airbyte/pull/80512) | Update dependencies |
| 0.1.29 | 2026-06-16 | [79887](https://github.com/airbytehq/airbyte/pull/79887) | Update dependencies |
| 0.1.28 | 2026-06-09 | [79368](https://github.com/airbytehq/airbyte/pull/79368) | Update dependencies |
| 0.1.27 | 2026-06-03 | [78426](https://github.com/airbytehq/airbyte/pull/78426) | Add `external_issue_reference` field to the follow-ups stream |
| 0.1.26 | 2026-06-02 | [78742](https://github.com/airbytehq/airbyte/pull/78742) | Update dependencies |
| 0.1.25 | 2026-04-28 | [77315](https://github.com/airbytehq/airbyte/pull/77315) | Update dependencies |
| 0.1.24 | 2026-04-21 | [76661](https://github.com/airbytehq/airbyte/pull/76661) | Update dependencies |
| 0.1.23 | 2026-03-17 | [75081](https://github.com/airbytehq/airbyte/pull/75081) | Update dependencies |
| 0.1.22 | 2026-03-10 | [74503](https://github.com/airbytehq/airbyte/pull/74503) | Update dependencies |
| 0.1.21 | 2026-02-26 | [74072](https://github.com/airbytehq/airbyte/pull/74072) | Migrate to incident_roles v2 endpoint and add escalations stream |
| 0.1.20 | 2026-02-24 | [73520](https://github.com/airbytehq/airbyte/pull/73520) | Update dependencies |
| 0.1.19 | 2026-02-10 | [73089](https://github.com/airbytehq/airbyte/pull/73089) | Update dependencies |
| 0.1.18 | 2026-02-03 | [72760](https://github.com/airbytehq/airbyte/pull/72760) | Update dependencies |
| 0.1.17 | 2026-01-20 | [71981](https://github.com/airbytehq/airbyte/pull/71981) | Update dependencies |
| 0.1.16 | 2026-01-14 | [71413](https://github.com/airbytehq/airbyte/pull/71413) | Update dependencies |
| 0.1.15 | 2025-12-18 | [70511](https://github.com/airbytehq/airbyte/pull/70511) | Update dependencies |
| 0.1.14 | 2025-11-25 | [70182](https://github.com/airbytehq/airbyte/pull/70182) | Update dependencies |
| 0.1.13 | 2025-11-18 | [69504](https://github.com/airbytehq/airbyte/pull/69504) | Update dependencies |
| 0.1.12 | 2025-10-29 | [68778](https://github.com/airbytehq/airbyte/pull/68778) | Update dependencies |
| 0.1.11 | 2025-10-21 | [68531](https://github.com/airbytehq/airbyte/pull/68531) | Update dependencies |
| 0.1.10 | 2025-10-14 | [67973](https://github.com/airbytehq/airbyte/pull/67973) | Update dependencies |
| 0.1.9 | 2025-10-07 | [67363](https://github.com/airbytehq/airbyte/pull/67363) | Update dependencies |
| 0.1.8 | 2025-09-30 | [66802](https://github.com/airbytehq/airbyte/pull/66802) | Update dependencies |
| 0.1.7 | 2025-09-09 | [66041](https://github.com/airbytehq/airbyte/pull/66041) | Update dependencies |
| 0.1.6 | 2025-09-05 | [65966](https://github.com/airbytehq/airbyte/pull/65966) | Update to CDK v7.0.0 |
| 0.1.5 | 2025-08-23 | [65332](https://github.com/airbytehq/airbyte/pull/65332) | Update dependencies |
| 0.1.4 | 2025-08-09 | [64591](https://github.com/airbytehq/airbyte/pull/64591) | Update dependencies |
| 0.1.3 | 2025-08-02 | [64299](https://github.com/airbytehq/airbyte/pull/64299) | Update dependencies |
| 0.1.2 | 2025-07-26 | [63825](https://github.com/airbytehq/airbyte/pull/63825) | Update dependencies |
| 0.1.1 | 2025-07-19 | [63480](https://github.com/airbytehq/airbyte/pull/63480) | Update dependencies |
| 0.1.0 | 2025-07-15 | [63304](https://github.com/airbytehq/airbyte/pull/63304) | Add new stream `alerts` |
| 0.0.29 | 2025-07-12 | [63128](https://github.com/airbytehq/airbyte/pull/63128) | Update dependencies |
| 0.0.28 | 2025-07-05 | [62591](https://github.com/airbytehq/airbyte/pull/62591) | Update dependencies |
| 0.0.27 | 2025-06-28 | [62168](https://github.com/airbytehq/airbyte/pull/62168) | Update dependencies |
| 0.0.26 | 2025-06-21 | [61830](https://github.com/airbytehq/airbyte/pull/61830) | Update dependencies |
| 0.0.25 | 2025-06-14 | [61149](https://github.com/airbytehq/airbyte/pull/61149) | Update dependencies |
| 0.0.24 | 2025-05-24 | [60668](https://github.com/airbytehq/airbyte/pull/60668) | Update dependencies |
| 0.0.23 | 2025-05-10 | [59803](https://github.com/airbytehq/airbyte/pull/59803) | Update dependencies |
| 0.0.22 | 2025-05-03 | [59231](https://github.com/airbytehq/airbyte/pull/59231) | Update dependencies |
| 0.0.21 | 2025-04-26 | [58787](https://github.com/airbytehq/airbyte/pull/58787) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58204](https://github.com/airbytehq/airbyte/pull/58204) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57724](https://github.com/airbytehq/airbyte/pull/57724) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57094](https://github.com/airbytehq/airbyte/pull/57094) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56650](https://github.com/airbytehq/airbyte/pull/56650) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56006](https://github.com/airbytehq/airbyte/pull/56006) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55475](https://github.com/airbytehq/airbyte/pull/55475) | Update dependencies |
| 0.0.14 | 2025-03-01 | [54780](https://github.com/airbytehq/airbyte/pull/54780) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54316](https://github.com/airbytehq/airbyte/pull/54316) | Update dependencies |
| 0.0.12 | 2025-02-15 | [53844](https://github.com/airbytehq/airbyte/pull/53844) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53299](https://github.com/airbytehq/airbyte/pull/53299) | Update dependencies |
| 0.0.10 | 2025-02-01 | [52718](https://github.com/airbytehq/airbyte/pull/52718) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52221](https://github.com/airbytehq/airbyte/pull/52221) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51782](https://github.com/airbytehq/airbyte/pull/51782) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51186](https://github.com/airbytehq/airbyte/pull/51186) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50648](https://github.com/airbytehq/airbyte/pull/50648) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50137](https://github.com/airbytehq/airbyte/pull/50137) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49218](https://github.com/airbytehq/airbyte/pull/49218) | Update dependencies |
| 0.0.3 | 2024-12-11 | [48989](https://github.com/airbytehq/airbyte/pull/48989) | Use a rootless Docker image (requires Airbyte 0.64 or later) |
| 0.0.2 | 2024-11-04 | [47842](https://github.com/airbytehq/airbyte/pull/47842) | Update dependencies |
| 0.0.1 | 2024-10-03 | | Initial release by [@aazam-gh](https://github.com/aazam-gh) via Connector Builder |

</details>
