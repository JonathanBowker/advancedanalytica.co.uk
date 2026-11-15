---
generated_record: true
connector_name: Adjust
connector_type: source
connector_slug: adjust
connector_directory: source-adjust
definition_id: d3b7fa46-111b-419a-998a-d7f046f6d66d
version: 0.2.2
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/adjust
logo: /images/connectors/sources/adjust.svg
logo_source_path: airbyte-integrations/connectors/source-adjust/icon.svg
logo_sha256: 22eeb45318bee2fb0948115536fa9f902aff9ef27f597a6b1104684058db53fc
original_metadata_path: airbyte-integrations/connectors/source-adjust/metadata.yaml
original_metadata_sha256: 0882e6d93f95edb9424d2bef339bd103283ba5f6f7d412191f52cb30718a73d1
original_document_path: docs/integrations/sources/adjust.md
original_document_sha256: 83615c67488d1c1c9434cf86c386c0f3a410bdee95d7a91470d6350bc17ff015
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8310232ff23f0e3ba871d8c790c74adec71ccedccfa7d4d38fea8ae4844fcf8d
rewritten_at: 2026-11-12T13:28:55.585762+00:00
---

# Adjust

Sync aggregated metrics from the [Adjust Report Service API](https://dev.adjust.com/en/api/rs-api/reports/) with the Adjust source connector. It's available for Airbyte Self-Managed.

## Prerequisites

You need an Adjust API token. In the Adjust dashboard, go to **Account settings** > **My profile** and copy your **API Token**. If you use single sign-on (SSO), API tokens aren't available in the dashboard. Contact your Adjust representative or support@adjust.com for help. See [Report service API authentication](https://dev.adjust.com/en/api/rs-api/authentication/).

If you install connector version 0.2.2 as a Python package, use Python 3.11, 3.12, or 3.13. Container deployments include their own Python runtime.

### Find more metrics

The **Metrics to ingest** field provides a fixed set of metrics. For other metrics, including app-specific event and cohort metrics, use **Additional metrics for ingestion**. See the [Datascape metrics glossary](https://help.adjust.com/en/article/datascape-metrics-glossary) for metric definitions.

Query the [Events endpoint](https://dev.adjust.com/en/api/rs-api/events/) to find event slugs for your apps. Replace `API_TOKEN` with your Adjust API token. Use the returned `id` values as metric names:

```sh
curl --header 'Authorization: Bearer API_TOKEN' 'https://automate.adjust.com/reports-service/events' | jq
```

## Set up the Adjust source

1. Click **Sources**, then click **+ New source**.
2. On the **Set up the source** page, select **Adjust** from the **Source type** dropdown.
3. Enter a name for your new source.
4. For **API Token**, enter your Adjust API token.
5. For **Ingest Start Date**, enter the sync start date. For JSON configuration, use a UTC timestamp such as `2024-01-01T00:00:00Z`.
6. For **Metrics to ingest**, select at least one metric.
7. (Optional) For **Additional metrics for ingestion**, enter any additional metric names. The connector types these columns as numbers.
8. For **Dimensions**, select at least one dimension for grouping metrics. The connector always adds `day` as a dimension.
9. (Optional) Turn on **Until Today** to end the requested date range on the current UTC date, rather than the following date. This option is off by default.
10. Click **Set up source**.

## Supported streams

The connector syncs one stream, `AdjustReport`, from the Adjust [JSON report endpoint](https://dev.adjust.com/en/api/rs-api/reports/). It reads the response's `rows` array, not `totals` or `warnings`. It groups metrics by `day` and your selected dimensions. The discovered schema includes `day`, your selected predefined metrics and dimensions, and any additional metrics.

## Supported sync modes

The source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/):

- Full Refresh
- Incremental

For incremental syncs, the connector uses `day` as the cursor and requests data in one-day intervals.

## Limitations

The Report Service API allows 50 requests per second for each source IP address, with a 100-request burst allowance. Clients sharing a NAT gateway or proxy also share this limit. Adjust returns `429 Too Many Requests` when you exceed the limit. See [Report service API rate limits](https://dev.adjust.com/en/api/rs-api/rate-limits/).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                     |
|---------|------------| -------------------------------------------------------- |---------------------------------------------|
| 0.2.2 | 2026-11-11 | [90889](https://github.com/airbytehq/airbyte/pull/90889) | Raise minimum supported Python version to 3.11 |
| 0.2.1 | 2026-11-10 | [78584](https://github.com/airbytehq/airbyte/pull/78584) | Update dependencies |
| 0.2.0 | 2026-11-03 | [90863](https://github.com/airbytehq/airbyte/pull/90863) | Upgrade to airbyte-cdk 7 and Python 3.13 base image |
| 0.1.33 | 2025-02-01 | [52916](https://github.com/airbytehq/airbyte/pull/52916) | Update dependencies |
| 0.1.32 | 2025-01-25 | [52196](https://github.com/airbytehq/airbyte/pull/52196) | Update dependencies |
| 0.1.31 | 2025-01-18 | [51733](https://github.com/airbytehq/airbyte/pull/51733) | Update dependencies |
| 0.1.30 | 2025-01-11 | [51272](https://github.com/airbytehq/airbyte/pull/51272) | Update dependencies |
| 0.1.29 | 2025-01-04 | [50901](https://github.com/airbytehq/airbyte/pull/50901) | Update dependencies |
| 0.1.28 | 2024-12-28 | [50439](https://github.com/airbytehq/airbyte/pull/50439) | Update dependencies |
| 0.1.27 | 2024-12-21 | [50151](https://github.com/airbytehq/airbyte/pull/50151) | Update dependencies |
| 0.1.26 | 2024-12-14 | [49030](https://github.com/airbytehq/airbyte/pull/49030) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.25 | 2024-10-28 | [47046](https://github.com/airbytehq/airbyte/pull/47046) | Update dependencies |
| 0.1.24 | 2024-10-12 | [46851](https://github.com/airbytehq/airbyte/pull/46851) | Update dependencies |
| 0.1.23 | 2024-10-05 | [46411](https://github.com/airbytehq/airbyte/pull/46411) | Update dependencies |
| 0.1.22 | 2024-09-28 | [46147](https://github.com/airbytehq/airbyte/pull/46147) | Update dependencies |
| 0.1.21 | 2024-09-21 | [45741](https://github.com/airbytehq/airbyte/pull/45741) | Update dependencies |
| 0.1.20 | 2024-09-14 | [45511](https://github.com/airbytehq/airbyte/pull/45511) | Update dependencies |
| 0.1.19 | 2024-09-07 | [45222](https://github.com/airbytehq/airbyte/pull/45222) | Update dependencies |
| 0.1.18 | 2024-08-31 | [44985](https://github.com/airbytehq/airbyte/pull/44985) | Update dependencies |
| 0.1.17 | 2024-08-24 | [44751](https://github.com/airbytehq/airbyte/pull/44751) | Update dependencies |
| 0.1.16 | 2024-08-17 | [44266](https://github.com/airbytehq/airbyte/pull/44266) | Update dependencies |
| 0.1.15 | 2024-08-12 | [43828](https://github.com/airbytehq/airbyte/pull/43828) | Update dependencies |
| 0.1.14 | 2024-08-10 | [43492](https://github.com/airbytehq/airbyte/pull/43492) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43055](https://github.com/airbytehq/airbyte/pull/43055) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42698](https://github.com/airbytehq/airbyte/pull/42698) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42155](https://github.com/airbytehq/airbyte/pull/42155) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41852](https://github.com/airbytehq/airbyte/pull/41852) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41055](https://github.com/airbytehq/airbyte/pull/41055) | Update datetime format |
| 0.1.8 | 2024-07-10 | [41460](https://github.com/airbytehq/airbyte/pull/41460) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41182](https://github.com/airbytehq/airbyte/pull/41182) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40947](https://github.com/airbytehq/airbyte/pull/40947) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40470](https://github.com/airbytehq/airbyte/pull/40470) | Update dependencies |
| 0.1.4 | 2024-06-24 | [39911](https://github.com/airbytehq/airbyte/pull/39911) | Migrate connector to low code |
| 0.1.3 | 2024-06-21 | [39923](https://github.com/airbytehq/airbyte/pull/39923) | Update dependencies |
| 0.1.2 | 2024-06-06 | [39287](https://github.com/airbytehq/airbyte/pull/39287) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-20 | [38373](https://github.com/airbytehq/airbyte/pull/38373) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-08-26 | [16051](https://github.com/airbytehq/airbyte/pull/16051) | Initial version. |

</details>
