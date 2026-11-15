---
generated_record: true
connector_name: Klaviyo
connector_type: source
connector_slug: klaviyo
connector_directory: source-klaviyo
definition_id: 95e8cffd-b8c4-4039-968e-d32fb4a69bde
version: 4.0.5
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/klaviyo
logo: /images/connectors/sources/klaviyo.svg
logo_source_path: airbyte-integrations/connectors/source-klaviyo/icon.svg
logo_sha256: 5aec5a73331ecf719a0b6b7c95f042f3d4325ca4cbf06454acf23141054a7526
original_metadata_path: airbyte-integrations/connectors/source-klaviyo/metadata.yaml
original_metadata_sha256: c292dbda2c043bb025a4fbe9dd413585ba918ae450d04b77cdf8113b74945cd1
original_document_path: docs/integrations/sources/klaviyo.md
original_document_sha256: 68d3ed00652c17f683074d15c3837f95ca0e99271d9828f7d71806bb5eb24dbc
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fb46ce22ee2dfbae590799cbae8ce0c55a6d8f1742c1bd138b40628fc756b0fc
rewritten_at: 2026-11-12T13:45:58.646559+00:00
---

# Klaviyo

<HideInUI>

Use this page to set up the [Klaviyo](https://www.klaviyo.com) source connector and find reference information.

</HideInUI>

## Prerequisites

- Klaviyo [account](https://www.klaviyo.com)
- [Klaviyo Private API key](https://help.klaviyo.com/hc/en-us/articles/115005062267-How-to-Manage-Your-Account-s-API-Keys#your-private-api-keys3)

## Setup guide

### Step 1: Set up Klaviyo

1. Create a [Klaviyo account](https://www.klaviyo.com).
2. Create a [Private API key](https://help.klaviyo.com/hc/en-us/articles/115005062267-How-to-Manage-Your-Account-s-API-Keys#your-private-api-keys3). Grant read access for every stream you want to replicate, as listed in [Required API key scopes](#required-api-key-scopes). If the key lacks a scope, Klaviyo rejects that stream's requests with a `403` error. The sync then fails.

### Required API key scopes

Klaviyo private API keys carry [per-object scopes](https://help.klaviyo.com/hc/en-us/articles/7423954176283). Each stream needs read access to the objects behind its endpoints:

| Stream                        | Required scopes                  |
| :---------------------------- | :------------------------------- |
| Campaigns, Campaigns Detailed | `campaigns:read`                 |
| Campaign Values Reports       | `campaigns:read`, `metrics:read` |
| Email Templates               | `templates:read`                 |
| Events, Events Detailed       | `events:read`                    |
| Flows                         | `flows:read`                     |
| Flow Series Reports           | `flows:read`, `metrics:read`     |
| GlobalExclusions, Profiles    | `profiles:read`                  |
| Lists, Lists Detailed         | `lists:read`                     |
| Metrics                       | `metrics:read`                   |
| Segments                      | `segments:read`                  |

The two report streams also need `metrics:read`. The connector lists your account's metrics to decide which conversion metrics to request reports for. Klaviyo publishes each endpoint's required scopes in its [API reference](https://developers.klaviyo.com/en/reference/api_overview) and [OpenAPI specification](https://github.com/klaviyo/openapi).

### Step 2: Set up the Klaviyo connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Klaviyo from the Source type dropdown.
4. Enter a name for the Klaviyo connector.
5. For **Api Key**, enter the Klaviyo [Private API key](https://help.klaviyo.com/hc/en-us/articles/115005062267-How-to-Manage-Your-Account-s-API-Keys#your-private-api-keys3).
6. For **Start Date**, enter a UTC date and time in `YYYY-MM-DDTHH:MM:SSZ` format, for example, `2017-01-25T00:00:00Z`. Airbyte replicates data added on or after this date. This field is optional. If you leave it blank, Airbyte replicates the previous year's data. The `metrics` and `global_exclusions` streams ignore this date. Their first sync reads all metric definitions and the full suppression list. Later incremental syncs continue from the stored cursor. See [Metrics stream](#metrics-stream) and [GlobalExclusions stream](#globalexclusions-stream).
7. (Optional) Select **Disable Fetching Predictive Analytics** to stop the connector requesting predictive analytics data. See [Performance considerations](#performance-considerations).
8. For **Number of concurrent threads**, enter the number of worker threads used by the sync. The default is 10, and the maximum is 50. Lower this value if syncs reach Klaviyo rate limits. Raise it only if your Klaviyo plan's [rate limit tier](https://developers.klaviyo.com/en/docs/rate_limits_and_error_handling) allows greater throughput.
9. For **Lookback Window (Days)**, enter the lookback period in days for incremental syncs. This period helps capture late-arriving data. The default is 0 days if you don't provide a value. This setting only applies to the events_detailed stream. For Flow Series Reports, use **Reporting Lookback Window (Days)** instead.
10. (Optional) For **Reporting Lookback Window (Days)**, enter how many days of Flow Series Reports data each incremental run should re-sync. Klaviyo revises conversion attribution after a send. Set this value to at least your attribution window to capture those revisions. Re-synced days replace the rows already written for those days. The default is 0. See [Analytics streams](#analytics-streams) for details.
11. (Optional) For **Report Stream Conversion Metric IDs**, enter a comma-separated list of Klaviyo metric IDs. This limits the Campaign Values Reports and Flow Series Reports streams to specific conversion metrics. Without this list, the connector fetches reports for all metrics. Rate limits can make this process slow. See [Analytics streams](#analytics-streams) for details.
12. (Optional) For **Event Stream Metric IDs**, enter a comma-separated list of Klaviyo metric IDs. This filters the Events and Events Detailed streams to specific metrics. Without this list, all events are synced. See [Event stream filtering](#event-stream-filtering) below.
13. Click **Set up source**.

### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Klaviyo from the Source type dropdown.
4. Enter a name for the Klaviyo connector.
5. For **Api Key**, enter the Klaviyo [Private API key](https://help.klaviyo.com/hc/en-us/articles/115005062267-How-to-Manage-Your-Account-s-API-Keys#your-private-api-keys3).
6. For **Start Date**, enter a UTC date and time in `YYYY-MM-DDTHH:MM:SSZ` format, for example, `2017-01-25T00:00:00Z`. Airbyte replicates data added on or after this date. This field is optional. If you leave it blank, Airbyte replicates the previous year's data. The `metrics` and `global_exclusions` streams ignore this date. Their first sync reads all metric definitions and the full suppression list. Later incremental syncs continue from the stored cursor. See [Metrics stream](#metrics-stream) and [GlobalExclusions stream](#globalexclusions-stream).
7. (Optional) Select **Disable Fetching Predictive Analytics** to stop the connector requesting predictive analytics data. See [Performance considerations](#performance-considerations).
8. For **Number of concurrent threads**, enter the number of worker threads used by the sync. The default is 10, and the maximum is 50. Lower this value if syncs reach Klaviyo rate limits. Raise it only if your Klaviyo plan's [rate limit tier](https://developers.klaviyo.com/en/docs/rate_limits_and_error_handling) allows greater throughput.
9. For **Lookback Window (Days)**, enter the lookback period in days for incremental syncs. This period helps capture late-arriving data. The default is 0 days if you don't provide a value. This setting only applies to the events_detailed stream. For Flow Series Reports, use **Reporting Lookback Window (Days)** instead.
10. (Optional) For **Reporting Lookback Window (Days)**, enter how many days of Flow Series Reports data each incremental run should re-sync. Klaviyo revises conversion attribution after a send. Set this value to at least your attribution window to capture those revisions. Re-synced days replace the rows already written for those days. The default is 0. See [Analytics streams](#analytics-streams) for details.
11. (Optional) For **Report Stream Conversion Metric IDs**, enter a comma-separated list of Klaviyo metric IDs. This limits the Campaign Values Reports and Flow Series Reports streams to specific conversion metrics. Without this list, the connector fetches reports for all metrics. Rate limits can make this process slow. See [Analytics streams](#analytics-streams) for details.
12. (Optional) For **Event Stream Metric IDs**, enter a comma-separated list of Klaviyo metric IDs. This filters the Events and Events Detailed streams to specific metrics. Without this list, all events are synced. See [Event stream filtering](#event-stream-filtering) below.
13. Click **Set up source**.

## Supported sync modes

The Klaviyo source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

## Supported streams

- [Campaigns](https://developers.klaviyo.com/en/v2026-01-15/reference/get_campaigns)
- [Campaigns Detailed](https://developers.klaviyo.com/en/v2026-01-15/reference/get_campaigns)
- [Campaign Values Reports](https://developers.klaviyo.com/en/v2026-01-15/reference/query_campaign_values) - Analytics stream for campaign performance metrics
- [Email Templates](https://developers.klaviyo.com/en/v2026-01-15/reference/get_templates)
- [Events](https://developers.klaviyo.com/en/v2026-01-15/reference/get_events)
- [Events Detailed](https://developers.klaviyo.com/en/v2026-01-15/reference/get_event)
- [Flows](https://developers.klaviyo.com/en/v2026-01-15/reference/get_flows)
- [Flow Series Reports](https://developers.klaviyo.com/en/v2026-01-15/reference/query_flow_series) - Analytics stream for automated flow performance over time
- [GlobalExclusions](https://developers.klaviyo.com/en/v2026-01-15/reference/get_profiles)
- [Lists](https://developers.klaviyo.com/en/v2026-01-15/reference/get_lists)
- [Lists Detailed](https://developers.klaviyo.com/en/v2026-01-15/reference/get_lists)
- [Metrics](https://developers.klaviyo.com/en/v2026-01-15/reference/get_metrics)
- [Profiles](https://developers.klaviyo.com/en/v2026-01-15/reference/get_profiles)
- [Segments](https://developers.klaviyo.com/en/v2026-01-15/reference/get_segments)

### Metrics stream

The **Metrics** stream always syncs every metric definition, regardless of the configured **Start Date**. You need metric definitions as reference data to interpret other streams. For example, you can join `relationships.data.metric.id` in `events` to a metric name. The Klaviyo API doesn't support filtering metrics by date. Later incremental syncs emit only new and updated metric definitions. After upgrading from an earlier connector version, older metric definitions might be missing. Clear or reset the `metrics` stream to backfill them.

### GlobalExclusions stream

The **GlobalExclusions** stream reads the same Klaviyo `/profiles` endpoint as **Profiles**. It keeps only profiles with a suppressed email marketing subscription. Suppressions include unsubscribes, hard bounces and manual suppressions. Each record stores the suppression details under `attributes.subscriptions.email.marketing.suppressions`.

This stream ignores **Start Date**. A first sync, or a sync after you clear the stream, returns your account's complete suppression list. Later incremental syncs request only profiles whose `updated` timestamp changed since the previous sync. These requests use a fixed one-hour lookback. Klaviyo doesn't always advance a profile's `updated` timestamp when recording a suppression. Bounce-driven and API-driven suppressions can arrive shortly afterwards. Each incremental sync therefore emits any suppressed profile again when its `updated` timestamp falls within the previous hour. Destinations that deduplicate on the `id` primary key replace those rows in place. Append-only destinations keep them as duplicate rows.

The lookback doesn't cover every case. Klaviyo might record a suppression more than an hour after the profile's `updated` timestamp. If Klaviyo never updates that profile again, incremental syncs won't capture the suppression. Clear the stream to reload the full suppression list and recover these rows.

Connector versions 2.10.14 through 3.0.2 paged through every profile during each sync, then filtered the results. Upgrading therefore makes this stream's incremental syncs considerably shorter.

### Streams that filter after fetching

The **Metrics**, **Lists**, **Lists Detailed** and **Segments** streams request every Klaviyo record during each sync. They then discard records older than the cursor position. **Start Date** and incremental sync reduce the records these streams emit, but not their API requests. Sync duration scales with your account's total lists, segments and metrics, rather than its new data volume.

### Analytics streams

The **Campaign Values Reports** and **Flow Series Reports** streams provide performance analytics from Klaviyo's [Reporting API](https://developers.klaviyo.com/en/reference/reporting_api_overview).

Flow Series Reports emits one record for each calendar day and flow message. Each `statistics` field contains that day's value. Its `date` field identifies the day covered by the row. This field forms part of the primary key: `date`, `flow_id`, `flow_message_id`, `send_channel`, `conversion_metric_id`. Reading a day again returns it with its existing identity.

Campaign Values Reports doesn't provide a daily breakdown. The endpoint returns one aggregate for the connector's entire requested period. `date` is the midnight that closes that period. A row dated `2024-06-15T00:00:00+00:00` therefore covers everything through the end of 2024-06-14. Its primary key is `date`, `campaign_id`, `campaign_message_id`, `send_channel` and `conversion_metric_id`.

The connector requests both reports in windows of up to 30 days. During the first sync, each Campaign Values Reports row therefore aggregates up to 30 days of activity. Later incremental syncs request only days since the previous sync, so their rows cover shorter periods.

Report periods always cover whole calendar days in your Klaviyo account's company timezone. Klaviyo ignores the timezone offset in a custom report timeframe. It interprets the timeframe using your account's configured company timezone. However, returned timestamps use a `+00:00` offset. If your start date includes a time, the first period extends back to the previous midnight. Every sync stops after the last complete day. The current day's data therefore arrives with the next sync.

Klaviyo continues revising conversion attribution after a send. The default period is up to 5 days. It can reach 90 days if you've increased the attribution window in your account settings. Numbers first reported for a day can therefore keep changing. Use **Reporting Lookback Window (Days)** to re-sync recent Flow Series Reports days during every incremental run. Set it to at least your attribution window to capture those revisions. A destination that deduplicates on the primary key replaces the existing row for each re-synced day. In append mode, each re-synced day adds another row during every sync. This setting doesn't apply to Campaign Values Reports. That endpoint reports one aggregate for each requested period, rather than daily values. Re-reading it could only add another row covering the same days.

Both streams partition data by conversion metric. By default, the connector fetches reports for every metric in your account. Use the optional **Report Stream Conversion Metric IDs** configuration field to limit reporting to specific conversion metrics. Enter a comma-separated list of metric IDs, for example, `RESQ6t,ABC123`.

:::warning
These analytics endpoints have strict Klaviyo API rate limits ([see documentation](https://developers.klaviyo.com/en/reference/query_campaign_values)). They allow a burst of 1 request per second, a steady 2 requests per minute and 225 requests daily. The connector makes a separate API request for every metric and time window. Syncing all metrics can therefore take several hours and exhaust the daily quota. Exceeding the quota causes the sync to fail with a rate limit error. See [Performance considerations](#performance-considerations). Use the **Report Stream Conversion Metric IDs** field to specify only the conversion metrics you need.
:::

Not every Klaviyo metric supports conversion value queries. For example, you can't query values data for metrics without a `$value` property. The connector automatically skips unsupported metrics and continues syncing the others. If you receive fewer results than expected, check whether your selected metrics support values data in Klaviyo.

To find your conversion metric IDs:

1. Sign in to your Klaviyo account.
2. Go to **Analytics** > **Metrics**.
3. Select the metric you want to track conversions for, such as "Placed Order".
4. Copy the metric ID from the URL. Alternatively, use the **Metrics** stream to list every available metric and its ID.

### Event stream filtering

The **Events** and **Events Detailed** streams support server-side filtering by metric ID through the **Event Stream Metric IDs** configuration field.

Klaviyo's `metric_id` filter only supports the `equals` operator. The connector therefore sends a separate request set for each configured metric ID. Every additional metric ID multiplies the API requests made during each sync. If syncs reach Klaviyo [rate limits](https://developers.klaviyo.com/en/docs/rate_limits_and_error_handling), configure fewer metrics or lower the **Number of concurrent threads** setting.

:::note
Klaviyo's [Get Events](https://developers.klaviyo.com/en/reference/get_events) endpoint doesn't support [custom metrics](https://developers.klaviyo.com/en/reference/custom_metrics_api_overview) in the `metric_id` filter. Filter only on built-in metrics, such as Placed Order or Opened Email.
:::

A metric ID added to an existing configuration syncs forward from the stream's current cursor position. The connector doesn't backfill older events for that metric. To sync its history, update the configuration and then clear the affected stream.

Find metric IDs under **Analytics** > **Metrics** in your Klaviyo account. Alternatively, use the **Metrics** stream to list every available metric and its ID.

## Performance considerations

Klaviyo [rate limits](https://developers.klaviyo.com/en/docs/rate_limits_and_error_handling) restrict the connector. When Klaviyo responds with `429`, the connector checks the response's `Retry-After` header. It waits for the specified number of seconds, then retries. Burst and steady limit waits typically last from seconds to about one minute. Syncs usually recover without any action from you.

The connector waits up to 10 minutes for each retry. If `Retry-After` specifies a longer wait, the sync fails with a rate limit error. This usually affects the reporting endpoints for the **Campaign Values Reports** and **Flow Series Reports** streams. These endpoints enforce 225 daily requests alongside their burst and steady limits. After a sync exhausts this quota, `Retry-After` contains the seconds remaining until the next daily reset. That wait can last many hours. To stay within the quota, narrow your requested conversion metrics with **Report Stream Conversion Metric IDs**. You can also sync these streams less often. Alternatively, move them to a separate connection so quota failures don't interrupt your other streams. Connector versions before 3.0.1 waited for the complete `Retry-After` value on every stream. This stalled the sync until Airbyte stopped and restarted the attempt.

[Create an issue](https://github.com/airbytehq/airbyte/issues) if you encounter rate limit issues that retries don't resolve.

The `Campaigns Detailed` stream includes `estimated_recipient_count` and `campaign_message` alongside information from the `Campaigns` stream. Fetching this extra data takes more time.

The `Lists Detailed` stream includes `profile_count` alongside information from the `Lists` stream. Klaviyo API [limitation](https://developers.klaviyo.com/en/reference/get_list) means fetching this extra data takes more time.

The `Events Detailed` stream includes the `name` field for the `metric` relationship, alongside [info](https://developers.klaviyo.com/en/reference/get_event).

The `Profiles` stream can encounter temporary API errors under heavy load. Use the **Disable Fetching Predictive Analytics** setting to increase sync success rates. This setting affects only the `predictive_analytics` field. The connector always fetches profile subscription and consent data, which remains unaffected.

:::warning
With the **Disable Fetching Predictive Analytics** setting, records in the `Profiles` stream no longer contain the `predictive_analytics` field. Workflows that depend on this field will stop working.
:::

## Data type map

| Integration Type | Airbyte Type |
|:-----------------|:-------------|
| `string`         | `string`     |
| `number`         | `number`     |
| `array`          | `array`      |
| `object`         | `object`     |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                                                                                                                                                |
|:--------|:-----------|:-----------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 4.0.5 | 2026-11-10 | [91622](https://github.com/airbytehq/airbyte/pull/91622) | Update dependencies |
| 4.0.4 | 2026-11-03 | [90629](https://github.com/airbytehq/airbyte/pull/90629) | Update dependencies |
| 4.0.3 | 2026-10-27 | [89977](https://github.com/airbytehq/airbyte/pull/89977) | Update dependencies |
| 4.0.2 | 2026-10-20 | [89305](https://github.com/airbytehq/airbyte/pull/89305) | Update dependencies |
| 4.0.1 | 2026-10-13 | [88714](https://github.com/airbytehq/airbyte/pull/88714) | Update dependencies |
| 4.0.0 | 2026-10-07 | [85352](https://github.com/airbytehq/airbyte/pull/85352) | Upgrade to Klaviyo API revision `2026-01-15` ahead of the `2024-10-15` retirement. Syncs and destinations are not affected, and the connector auto-upgrades at the deadline; only downstream consumers of `campaigns` and `campaigns_detailed` need to move to new nested paths. In `campaigns` and `campaigns_detailed`, `attributes.send_strategy.options_static.datetime`/`is_local`/`send_past_recipients_immediately`, `options_throttled.datetime`/`throttle_percentage` and `options_sto.date` move to `attributes.send_strategy.datetime`, `.options.is_local`, `.options.send_past_recipients_immediately`, `.throttle_percentage` and `.date`. In `campaigns_detailed`, `campaign_messages[].attributes.channel`/`label`/`content`/`render_options` move to `campaign_messages[].attributes.definition.*`. SMS messages no longer carry a `label` (Klaviyo stopped generating one). Refresh the source schema to pick up the new fields. See the [migration guide](https://docs.airbyte.com/integrations/sources/klaviyo-migrations#upgrading-to-400) |
| 3.0.6 | 2026-10-06 | [87223](https://github.com/airbytehq/airbyte/pull/87223) | Update dependencies |
| 3.0.5 | 2026-09-22 | [86678](https://github.com/airbytehq/airbyte/pull/86678) | Update dependencies |
| 3.0.4 | 2026-09-15 | [86109](https://github.com/airbytehq/airbyte/pull/86109) | Update dependencies |
| 3.0.3 | 2026-09-10 | [85217](https://github.com/airbytehq/airbyte/pull/85217) | Send the `global_exclusions` cursor filter to Klaviyo, with a one-hour lookback window, so incremental syncs no longer re-page all profiles; a first/stateless sync still returns the full suppression list. |
| 3.0.2 | 2026-09-08 | [84635](https://github.com/airbytehq/airbyte/pull/84635) | Update dependencies |
| 3.0.1 | 2026-08-21 | [84908](https://github.com/airbytehq/airbyte/pull/84908) | Fail fast with a rate limit error instead of sleeping for hours when Klaviyo returns a daily-quota `Retry-After` |
| 3.0.0 | 2026-08-14 | [75495](https://github.com/airbytehq/airbyte/pull/75495) | Emit one record per calendar day with scalar statistics in `flow_series_reports`, add a reporting lookback window for that stream, and align both report streams to whole-day windows to stop boundary double-counting (refresh the schema and clear both report streams) |
| 2.21.1 | 2026-08-11 | [83991](https://github.com/airbytehq/airbyte/pull/83991) | Update dependencies |
| 2.21.0 | 2026-08-07 | [75301](https://github.com/airbytehq/airbyte/pull/75301) | Add optional metric ID filtering for the `events` and `events_detailed` streams |
| 2.20.0 | 2026-08-05 | [61338](https://github.com/airbytehq/airbyte/pull/61338) | Sync all metric definitions in the `metrics` stream regardless of the configured start date (existing connections: clear/reset the `metrics` stream to backfill older metric definitions) |
| 2.19.3 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 2.19.2 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 2.19.0 — 2.19.1 is built on SDM 7.23.7, which breaks bundled custom components |
| 2.19.1 | 2026-07-28 | [82475](https://github.com/airbytehq/airbyte/pull/82475) | Update dependencies |
| 2.19.0 | 2026-07-15 | [81637](https://github.com/airbytehq/airbyte/pull/81637) | Default start date to one year back when not provided |
| 2.18.6 | 2026-07-14 | [81870](https://github.com/airbytehq/airbyte/pull/81870) | Update dependencies |
| 2.18.5 | 2026-06-30 | [81120](https://github.com/airbytehq/airbyte/pull/81120) | Update dependencies |
| 2.18.4 | 2026-06-23 | [80514](https://github.com/airbytehq/airbyte/pull/80514) | Update dependencies |
| 2.18.3 | 2026-06-22 | [76919](https://github.com/airbytehq/airbyte/pull/76919) | fix(source-klaviyo): Add missing unsubscribe and spam complaint fields to reporting streams |
| 2.18.2 | 2026-06-16 | [79898](https://github.com/airbytehq/airbyte/pull/79898) | Update dependencies |
| 2.18.1 | 2026-06-09 | [79342](https://github.com/airbytehq/airbyte/pull/79342) | Update dependencies |
| 2.18.0 | 2026-06-04 | [76941](https://github.com/airbytehq/airbyte/pull/76941) | Add new `segments` stream |
| 2.17.9 | 2026-06-02 | [78784](https://github.com/airbytehq/airbyte/pull/78784) | Update dependencies |
| 2.17.8 | 2026-04-28 | [77313](https://github.com/airbytehq/airbyte/pull/77313) | Update dependencies |
| 2.17.7 | 2026-04-25 | [77008](https://github.com/airbytehq/airbyte/pull/77008) | Fix sync failure when conversion metrics do not support values data queries in flow_series_reports and campaign_values_reports streams |
| 2.17.6 | 2026-04-21 | [75707](https://github.com/airbytehq/airbyte/pull/75707) | Update dependencies |
| 2.17.5 | 2026-04-16 | [75180](https://github.com/airbytehq/airbyte/pull/75180) | Restore `subscriptions` field to profiles stream `additional-fields[profile]` parameter, fixing a regression introduced in v2.16.x where the subscriptions data was no longer fetched from the Klaviyo API |
| 2.17.4 | 2026-04-13 | [76276](https://github.com/airbytehq/airbyte/pull/76276) | Rename "concurrent workers" to "concurrent threads" in connector spec |
| 2.17.3 | 2026-03-17 | [74995](https://github.com/airbytehq/airbyte/pull/74995) | Update dependencies |
| 2.17.2 | 2026-03-10 | [74435](https://github.com/airbytehq/airbyte/pull/74435) | Update dependencies |
| 2.17.1 | 2026-03-03 | [73958](https://github.com/airbytehq/airbyte/pull/73958) | Update dependencies |
| 2.17.0 | 2026-02-19 | [73642](https://github.com/airbytehq/airbyte/pull/73642) | Add new analytics streams: Flow Series Reports and Campaign Values Reports |
| 2.16.15 | 2026-02-17 | [73540](https://github.com/airbytehq/airbyte/pull/73540) | Update dependencies |
| 2.16.14 | 2026-02-10 | [73058](https://github.com/airbytehq/airbyte/pull/73058) | Update dependencies |
| 2.16.13 | 2026-02-03 | [72750](https://github.com/airbytehq/airbyte/pull/72750) | Update dependencies |
| 2.16.12 | 2026-01-20 | [72040](https://github.com/airbytehq/airbyte/pull/72040) | Update dependencies |
| 2.16.11 | 2026-01-19 | [70208](https://github.com/airbytehq/airbyte/pull/70208) | Add chunking to events_detailed stream to fix full refresh stalling and incremental mode returning zero rows |
| 2.16.10 | 2026-01-14 | [71461](https://github.com/airbytehq/airbyte/pull/71461) | Update dependencies |
| 2.16.9 | 2025-12-18 | [70783](https://github.com/airbytehq/airbyte/pull/70783) | Update dependencies |
| 2.16.8 | 2025-11-25 | [70028](https://github.com/airbytehq/airbyte/pull/70028) | Update dependencies |
| 2.16.7 | 2025-11-18 | [69457](https://github.com/airbytehq/airbyte/pull/69457) | Update dependencies |
| 2.16.6 | 2025-10-29 | [68983](https://github.com/airbytehq/airbyte/pull/68983) | Update dependencies |
| 2.16.5 | 2025-10-21 | [68298](https://github.com/airbytehq/airbyte/pull/68298) | Update dependencies |
| 2.16.4 | 2025-10-14 | [68028](https://github.com/airbytehq/airbyte/pull/68028) | Update dependencies |
| 2.16.3 | 2025-10-07 | [67517](https://github.com/airbytehq/airbyte/pull/67517) | Update dependencies |
| 2.16.2 | 2025-09-30 | [66643](https://github.com/airbytehq/airbyte/pull/66643) | Update dependencies |
| 2.16.1 | 2025-09-09 | [66070](https://github.com/airbytehq/airbyte/pull/66070) | Update dependencies |
| 2.16.0 | 2025-09-08 | [65990](https://github.com/airbytehq/airbyte/pull/65990) | Revert the v2.15.0 change, which caused `subscriptions` data to stop being fetched on the `profiles` stream (fixed in v2.17.5) |
| 2.15.0 | 2025-09-07 | [65935](https://github.com/airbytehq/airbyte/pull/65935) | Fetch `subscriptions` data on the `profiles` stream |
| 2.14.22 | 2025-08-25 | [65509](https://github.com/airbytehq/airbyte/pull/65509) | Fix custom migrations to reference DeclarativeStream Pydantic model instead of runtime component |
| 2.14.21 | 2025-08-23 | [65317](https://github.com/airbytehq/airbyte/pull/65317) | Update dependencies |
| 2.14.20 | 2025-08-09 | [64618](https://github.com/airbytehq/airbyte/pull/64618) | Update dependencies |
| 2.14.19 | 2025-08-02 | [64210](https://github.com/airbytehq/airbyte/pull/64210) | Update dependencies |
| 2.14.18 | 2025-07-26 | [63815](https://github.com/airbytehq/airbyte/pull/63815) | Update dependencies |
| 2.14.17 | 2025-07-19 | [63482](https://github.com/airbytehq/airbyte/pull/63482) | Update dependencies |
| 2.14.16 | 2025-07-12 | [63154](https://github.com/airbytehq/airbyte/pull/63154) | Update dependencies |
| 2.14.15 | 2025-07-05 | [62631](https://github.com/airbytehq/airbyte/pull/62631) | Update dependencies |
| 2.14.14 | 2025-06-28 | [62167](https://github.com/airbytehq/airbyte/pull/62167) | Update dependencies |
| 2.14.13 | 2025-06-21 | [61858](https://github.com/airbytehq/airbyte/pull/61858) | Update dependencies |
| 2.14.12 | 2025-06-14 | [60653](https://github.com/airbytehq/airbyte/pull/60653) | Update dependencies |
| 2.14.11 | 2025-05-10 | [59260](https://github.com/airbytehq/airbyte/pull/59260) | Update dependencies |
| 2.14.10 | 2025-04-29 | [58123](https://github.com/airbytehq/airbyte/pull/58123) | Add missing fields for `events_detailed` stream for attributions |
| 2.14.9 | 2025-04-26 | [58192](https://github.com/airbytehq/airbyte/pull/58192) | Update dependencies |
| 2.14.8 | 2025-04-12 | [57751](https://github.com/airbytehq/airbyte/pull/57751) | Update dependencies |
| 2.14.7 | 2025-04-05 | [57033](https://github.com/airbytehq/airbyte/pull/57033) | Update dependencies |
| 2.14.6 | 2025-03-29 | [56634](https://github.com/airbytehq/airbyte/pull/56634) | Update dependencies |
| 2.14.5 | 2025-03-22 | [56017](https://github.com/airbytehq/airbyte/pull/56017) | Update dependencies |
| 2.14.4 | 2025-03-14 | [55772](https://github.com/airbytehq/airbyte/pull/55772) | Add back step to streams that can process date ranges in parallel |
| 2.14.3 | 2025-03-08 | [55479](https://github.com/airbytehq/airbyte/pull/55479) | Update dependencies |
| 2.14.2 | 2025-03-03 | [54720](https://github.com/airbytehq/airbyte/pull/54720) | Add event_properties option to events request |
| 2.14.1 | 2025-03-01 | [54770](https://github.com/airbytehq/airbyte/pull/54770) | Update dependencies |
| 2.14.0 | 2025-02-26 | [54166](https://github.com/airbytehq/airbyte/pull/54166) | Migrate to Manifest-only |
| 2.13.1 | 2025-02-22 | [54369](https://github.com/airbytehq/airbyte/pull/54369) | Update dependencies |
| 2.13.0 | 2025-02-18 | [51551](https://github.com/airbytehq/airbyte/pull/51551) | Upgrade to API v2024-10-15 |
| 2.12.1 | 2025-02-15 | [52710](https://github.com/airbytehq/airbyte/pull/52710) | Update dependencies |
| 2.12.0 | 2025-02-11 | [53223](https://github.com/airbytehq/airbyte/pull/53223) | Add API Budget |
| 2.11.11 | 2025-01-27 | [52563](https://github.com/airbytehq/airbyte/pull/52563) | Fix `lists_detailed` incremental sync |
| 2.11.10 | 2025-01-25 | [52285](https://github.com/airbytehq/airbyte/pull/52285) | Update dependencies |
| 2.11.9 | 2025-01-11 | [51198](https://github.com/airbytehq/airbyte/pull/51198) | Update dependencies |
| 2.11.8 | 2025-01-09 | [51010](https://github.com/airbytehq/airbyte/pull/51010) | Fix AirbyteMessage serialization with integers bigger than 64 bits |
| 2.11.7 | 2025-01-04 | [50893](https://github.com/airbytehq/airbyte/pull/50893) | Update dependencies |
| 2.11.6 | 2024-12-28 | [50653](https://github.com/airbytehq/airbyte/pull/50653) | Update dependencies |
| 2.11.5 | 2024-12-21 | [50088](https://github.com/airbytehq/airbyte/pull/50088) | Update dependencies |
| 2.11.4 | 2024-12-14 | [49250](https://github.com/airbytehq/airbyte/pull/49250) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 2.11.3 | 2024-12-12 | [49144](https://github.com/airbytehq/airbyte/pull/49144) | Update dependencies |
| 2.11.2 | 2024-12-02 | [48748](https://github.com/airbytehq/airbyte/pull/48748) | Bump CDK to evict non retriable requests to avoid high memory usage |
| 2.11.1 | 2024-11-26 | [48710](https://github.com/airbytehq/airbyte/pull/48710) | Retry on "Temporary failure in name resolution" |
| 2.11.0 | 2024-11-18 | [48452](https://github.com/airbytehq/airbyte/pull/48452) | Enable concurrency for syncs that don't have client-side filtering |
| 2.10.14 | 2024-11-07 | [48391](https://github.com/airbytehq/airbyte/pull/48391) | Remove custom datetime cursor dependency |
| 2.10.13 | 2024-11-05 | [48331](https://github.com/airbytehq/airbyte/pull/48331) | Update dependencies |
| 2.10.12 | 2024-10-29 | [47797](https://github.com/airbytehq/airbyte/pull/47797) | Update dependencies |
| 2.10.11 | 2024-10-28 | [47043](https://github.com/airbytehq/airbyte/pull/47043) | Update dependencies |
| 2.10.10 | 2024-10-14 | [46741](https://github.com/airbytehq/airbyte/pull/46741) | Add checkpointing to events stream to improve large syncs after clear data |
| 2.10.9 | 2024-10-12 | [46787](https://github.com/airbytehq/airbyte/pull/46787) | Update dependencies |
| 2.10.8 | 2024-10-05 | [46503](https://github.com/airbytehq/airbyte/pull/46503) | Update dependencies |
| 2.10.7 | 2024-09-28 | [46174](https://github.com/airbytehq/airbyte/pull/46174) | Update dependencies |
| 2.10.6 | 2024-09-21 | [45813](https://github.com/airbytehq/airbyte/pull/45813) | Update dependencies |
| 2.10.5 | 2024-09-14 | [45530](https://github.com/airbytehq/airbyte/pull/45530) | Update dependencies |
| 2.10.4 | 2024-09-07 | [45244](https://github.com/airbytehq/airbyte/pull/45244) | Update dependencies |
| 2.10.3 | 2024-08-31 | [45064](https://github.com/airbytehq/airbyte/pull/45064) | Update dependencies |
| 2.10.2 | 2024-08-30 | [44930](https://github.com/airbytehq/airbyte/pull/44930) | Fix typing in profiles stream for field `attributes.location.region` |
| 2.10.1 | 2024-08-24 | [44628](https://github.com/airbytehq/airbyte/pull/44628) | Update dependencies |
| 2.10.0 | 2024-08-18 | [44366](https://github.com/airbytehq/airbyte/pull/44366) | Add field[metrics] to events stream |
| 2.9.4 | 2024-08-17 | [44317](https://github.com/airbytehq/airbyte/pull/44317) | Update dependencies |
| 2.9.3 | 2024-08-12 | [43806](https://github.com/airbytehq/airbyte/pull/43806) | Update dependencies |
| 2.9.2 | 2024-08-10 | [43613](https://github.com/airbytehq/airbyte/pull/43613) | Update dependencies |
| 2.9.1 | 2024-08-03 | [43247](https://github.com/airbytehq/airbyte/pull/43247) | Update dependencies |
| 2.9.0 | 2024-08-01 | [42891](https://github.com/airbytehq/airbyte/pull/42891) | Migrate to CDK v4.X and remove custom BackoffStrategy implementation |
| 2.8.2 | 2024-07-31 | [42895](https://github.com/airbytehq/airbyte/pull/42895) | Add config option disable_fetching_predictive_analytics to prevent 503 Service Unavailable errors |
| 2.8.1 | 2024-07-27 | [42664](https://github.com/airbytehq/airbyte/pull/42664) | Update dependencies |
| 2.8.0 | 2024-07-19 | [42121](https://github.com/airbytehq/airbyte/pull/42121) | Migrate to CDK v3.9.0 |
| 2.7.8 | 2024-07-20 | [42185](https://github.com/airbytehq/airbyte/pull/42185) | Update dependencies |
| 2.7.7 | 2024-07-08 | [40608](https://github.com/airbytehq/airbyte/pull/40608) | Update the `events_detailed` stream to improve efficiency using the events API |
| 2.7.6 | 2024-07-13 | [41903](https://github.com/airbytehq/airbyte/pull/41903) | Update dependencies |
| 2.7.5 | 2024-07-10 | [41548](https://github.com/airbytehq/airbyte/pull/41548) | Update dependencies |
| 2.7.4 | 2024-07-09 | [41211](https://github.com/airbytehq/airbyte/pull/41211) | Update dependencies |
| 2.7.3 | 2024-07-06 | [40770](https://github.com/airbytehq/airbyte/pull/40770) | Update dependencies |
| 2.7.2 | 2024-06-26 | [40401](https://github.com/airbytehq/airbyte/pull/40401) | Update dependencies |
| 2.7.1 | 2024-06-22 | [40032](https://github.com/airbytehq/airbyte/pull/40032) | Update dependencies |
| 2.7.0 | 2024-06-08 | [39350](https://github.com/airbytehq/airbyte/pull/39350) | Add `events_detailed` stream |
| 2.6.4 | 2024-06-06 | [38879](https://github.com/airbytehq/airbyte/pull/38879) | Implement `CheckpointMixin` for handling state in Python streams |
| 2.6.3 | 2024-06-04 | [38935](https://github.com/airbytehq/airbyte/pull/38935) | [autopull] Upgrade base image to v1.2.1 |
| 2.6.2 | 2024-05-08 | [37789](https://github.com/airbytehq/airbyte/pull/37789) | Move stream schemas and spec to manifest |
| 2.6.1 | 2024-05-07 | [38010](https://github.com/airbytehq/airbyte/pull/38010) | Add error handler for `5XX` status codes |
| 2.6.0 | 2024-04-19 | [37370](https://github.com/airbytehq/airbyte/pull/37370) | Add streams `campaigns_detailed` and `lists_detailed` |
| 2.5.0 | 2024-04-15 | [36264](https://github.com/airbytehq/airbyte/pull/36264) | Migrate to low-code |
| 2.4.0 | 2024-04-11 | [36989](https://github.com/airbytehq/airbyte/pull/36989) | Update `Campaigns` schema |
| 2.3.0 | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0` |
| 2.2.0 | 2024-02-27 | [35637](https://github.com/airbytehq/airbyte/pull/35637) | Fix `predictive_analytics` field in stream `profiles` |
| 2.1.3 | 2024-02-15 | [35336](https://github.com/airbytehq/airbyte/pull/35336) | Added type transformer for the `profiles` stream. |
| 2.1.2 | 2024-02-09 | [35088](https://github.com/airbytehq/airbyte/pull/35088) | Manage dependencies with Poetry. |
| 2.1.1 | 2024-02-07 | [34998](https://github.com/airbytehq/airbyte/pull/34998) | Add missing fields to stream schemas |
| 2.1.0 | 2023-12-07 | [33237](https://github.com/airbytehq/airbyte/pull/33237) | Continue syncing streams even when one of the stream fails |
| 2.0.2 | 2023-12-05 | [33099](https://github.com/airbytehq/airbyte/pull/33099) | Fix filtering for archived records stream |
| 2.0.1 | 2023-11-08 | [32291](https://github.com/airbytehq/airbyte/pull/32291) | Add logic to have regular checkpointing schedule |
| 2.0.0 | 2023-11-03 | [32128](https://github.com/airbytehq/airbyte/pull/32128) | Use the latest API for streams `campaigns`, `email_templates`, `events`, `flows`, `global_exclusions`, `lists`, and `metrics` |
| 1.1.0 | 2023-10-23 | [31710](https://github.com/airbytehq/airbyte/pull/31710) | Make `start_date` config field optional |
| 1.0.0 | 2023-10-18 | [31565](https://github.com/airbytehq/airbyte/pull/31565) | Add new known fields for 'events' stream |
| 0.5.0 | 2023-10-19 | [31611](https://github.com/airbytehq/airbyte/pull/31611) | Add `date-time` format for `datetime` field in `Events` stream |
| 0.4.0 | 2023-10-18 | [31562](https://github.com/airbytehq/airbyte/pull/31562) | Add `archived` field to `Flows` stream |
| 0.3.3 | 2023-10-13 | [31379](https://github.com/airbytehq/airbyte/pull/31379) | Skip streams that the connector no longer has access to |
| 0.3.2 | 2023-06-20 | [27498](https://github.com/airbytehq/airbyte/pull/27498) | Do not store state in the future |
| 0.3.1 | 2023-06-08 | [27162](https://github.com/airbytehq/airbyte/pull/27162) | Anonymize check connection error message |
| 0.3.0 | 2023-02-18 | [23236](https://github.com/airbytehq/airbyte/pull/23236) | Add `Email Templates` stream |
| 0.2.0 | 2023-03-13 | [23968](https://github.com/airbytehq/airbyte/pull/23968) | Add `Profiles` stream |
| 0.1.13 | 2023-02-13 | [22942](https://github.com/airbytehq/airbyte/pull/22942) | Specified date formatting in specification |
| 0.1.12 | 2023-01-30 | [22071](https://github.com/airbytehq/airbyte/pull/22071) | Fix `Events` stream schema |
| 0.1.11 | 2023-01-27 | [22012](https://github.com/airbytehq/airbyte/pull/22012) | Set `AvailabilityStrategy` for streams explicitly to `None` |
| 0.1.10  | 2022-09-29 | [17422](https://github.com/airbytehq/airbyte/issues/17422) | Update CDK dependency                                                                                                                                                  |
| 0.1.9   | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/issues/17304) | Migrate to per-stream state.                                                                                                                                           |
| 0.1.6   | 2022-07-20 | [14872](https://github.com/airbytehq/airbyte/issues/14872) | Increase test coverage                                                                                                                                                 |
| 0.1.5   | 2022-07-12 | [14617](https://github.com/airbytehq/airbyte/issues/14617) | Set max_retries = 10 for `lists` stream.                                                                                                                               |
| 0.1.4   | 2022-04-15 | [11723](https://github.com/airbytehq/airbyte/issues/11723) | Enhance klaviyo source for flows stream and update to events stream.                                                                                                   |
| 0.1.3   | 2021-12-09 | [8592](https://github.com/airbytehq/airbyte/pull/8592)     | Improve performance, make Global Exclusions stream incremental and enable Metrics stream.                                                                              |
| 0.1.2   | 2021-10-19 | [6952](https://github.com/airbytehq/airbyte/pull/6952)     | Update schema validation in SAT                                                                                                                                        |

</details>
