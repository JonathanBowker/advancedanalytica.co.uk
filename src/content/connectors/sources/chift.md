---
generated_record: true
connector_name: Chift
connector_type: source
connector_slug: chift
connector_directory: source-chift
definition_id: d03aa64c-21a9-4edc-97b9-5590600ee3d6
version: 0.1.8
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/chift
logo: /images/connectors/sources/chift.svg
logo_source_path: airbyte-integrations/connectors/source-chift/icon.svg
logo_sha256: 24ba3b7fdd7f08d7eb95774ae14311fde437b7fc98c47f25eb912f1af8be4181
original_metadata_path: airbyte-integrations/connectors/source-chift/metadata.yaml
original_metadata_sha256: 42e67c558fb281e16a151f6a569788dd5cd20b612e21f8d6c92025d9807c8886
original_document_path: docs/integrations/sources/chift.md
original_document_sha256: db2dc0e534a93caaccc8b6697854e55d720124809ecaa16d89ac821e9ffdbe40
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8bb5383dc57987e7045c4678a7029b95a5b1a6818092f04475688f8053d3e462
rewritten_at: 2026-11-12T13:33:27.394053+00:00
---

# Chift

Set up the Chift source connector and find its reference information on this page.

[Chift](https://www.chift.eu/) is a unified API for financial software. It connects your SaaS product to accounting, invoicing, point-of-sale and other financial tools. It uses **consumers** for your end customers and **connections** for a consumer's link to one of those tools. **syncs** are data flows that Chift runs between tools. This connector reads platform metadata and your sync execution history from the [Chift API](https://docs.chift.eu/). It doesn't read financial data, such as invoices and journal entries, flowing through those connections.

## Prerequisites

- A Chift account with access to the [Chift platform](https://chift.app/).
- A Chift API key. In the Chift platform, open the **API Keys** page and click **Add API Key**. When you create the key, copy the **Client ID** and **Client Secret**. Chift shows the client secret only once. You'll find your **Account ID** at the top left of the same page. See Chift's [Create and manage API keys](https://docs.chift.eu/developer-guides/create-api-key) guide.

Consider the following when choosing or creating your key:

- The key determines the environment. All keys use the same base URL. A key created in Chift's Sandbox environment only sees sandbox consumers. A key created in Production only sees production consumers.
- Chift lets you restrict a key to one or more consumers. A restricted key limits the connector to data that the key can access. Use an unrestricted key to sync your whole account.

## Set up Chift

1. In the Airbyte UI's left navigation bar, click **Sources**. Then click **+ New source** in the top-right corner.
2. Find and select **Chift** from the available sources.
3. Enter a **Source name** of your choice.
4. Enter the **Client Id**, **Client Secret** and **Account Id** from your Chift API key.
5. Optionally, enter a **Start Date** in `YYYY-MM-DDTHH:MM:SS` format, such as `2026-01-01T00:00:00`. The connector only syncs executions that started on or after this date. Leave it empty to sync all executions. Other formats are rejected, including dates without times or values with a `Z` suffix.
6. Click **Set up source** and wait for the tests to finish.

At the start of each sync, the connector calls Chift's `POST /token` endpoint to exchange your credentials for a short-lived bearer token. If the call returns a `401` error, check that all three values belong to the same API key. Also check that the key hasn't been deleted.

## Supported sync modes

The Chift source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | Yes        |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

| Stream        | Primary key    | Incremental | Chift endpoint                            |
| :------------ | :------------- | :---------- | :---------------------------------------- |
| `consumers`   | `consumerid`   | No          | `GET /consumers`                          |
| `connections` | `connectionid` | No          | `GET /consumers/{consumerid}/connections` |
| `syncs`       | `syncid`       | No          | `GET /syncs`                              |
| `executions`  | `id`           | Yes         | `GET /syncs/{syncid}/executions`          |

- `consumers` lists the consumers, your end customers, linked to your account.
- `connections` lists every active or inactive connection for each consumer returned by `consumers`. The `data` field is a free-form object. Its keys depend on the connection's integration, so the contents vary between rows.
- `syncs` lists your account's configured syncs. These include their connections, mappings, flows and the consumers they're activated for. The `display_condition` object inside each mapping's `sub_mappings[].target_field` is also free-form.
- `executions` lists every run of each sync returned by `syncs`. Each record includes the execution's `start` and `end` timestamps. It also includes its `status`, such as `IN PROGRESS`, `FINISHED`, `ERROR` or `CANCELED`. Each record identifies the `consumer_id` and `flow_id` it ran for. The stream is incremental on the `start` timestamp and pages through 50 results at a time.

`connections` and `executions` are child streams. The connector always reads `consumers` to build `connections`, even when you don't select the parent stream. It also always reads `syncs` to build `executions`, even when you don't select the parent stream.

## Limits and troubleshooting

- Chift doesn't rate limit calls to its API, so the connector doesn't throttle requests. Chift's [rate limit documentation](https://docs.chift.eu/developer-guides/core-concepts/rate-limits) explains limits that individual third-party integrations may enforce. These limits don't affect the endpoints used by this connector.
- The `executions` stream only filters by execution start time. It never syncs executions started before your **Start Date**, even if they finished afterwards.
- The `connections.data` and `syncs.mappings[].sub_mappings[].target_field.display_condition` objects have no fixed schema. Destinations writing typed files store them as JSON strings. This applies to S3 and GCS destinations using Avro or Parquet format. Destinations using JSON, VARIANT or JSONB columns keep the whole object. See the [migration guide](https://docs.airbyte.com/integrations/sources/chift-migrations) for details.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.1.8 | 2026-11-10 | [91410](https://github.com/airbytehq/airbyte/pull/91410) | Update dependencies |
| 0.1.7 | 2026-11-03 | [90488](https://github.com/airbytehq/airbyte/pull/90488) | Update dependencies |
| 0.1.6 | 2026-10-27 | [89850](https://github.com/airbytehq/airbyte/pull/89850) | Update dependencies |
| 0.1.5 | 2026-10-20 | [89115](https://github.com/airbytehq/airbyte/pull/89115) | Update dependencies |
| 0.1.4 | 2026-10-13 | [88571](https://github.com/airbytehq/airbyte/pull/88571) | Update dependencies |
| 0.1.3 | 2026-10-06 | [87789](https://github.com/airbytehq/airbyte/pull/87789) | Update dependencies |
| 0.1.2 | 2026-09-29 | [87100](https://github.com/airbytehq/airbyte/pull/87100) | Update dependencies |
| 0.1.1 | 2026-09-22 | [86568](https://github.com/airbytehq/airbyte/pull/86568) | Update dependencies |
| 0.1.0 | 2026-09-16 | [77576](https://github.com/airbytehq/airbyte/pull/77576) | Add `executions` stream, incremental on `start` and paginated on `page`/`size`. Declare `connections.data` and `target_field.display_condition` schemaless, matching Chift's contract, so schematizing destinations (S3/GCS Avro/Parquet) stop dropping their integration-defined keys - see the [migration guide](https://docs.airbyte.com/integrations/sources/chift-migrations) |
| 0.0.26 | 2026-09-15 | [85978](https://github.com/airbytehq/airbyte/pull/85978) | Update dependencies |
| 0.0.25 | 2026-09-08 | [85452](https://github.com/airbytehq/airbyte/pull/85452) | Update dependencies |
| 0.0.24 | 2026-08-18 | [84529](https://github.com/airbytehq/airbyte/pull/84529) | Update dependencies |
| 0.0.23 | 2026-08-11 | [83887](https://github.com/airbytehq/airbyte/pull/83887) | Update dependencies |
| 0.0.22 | 2026-08-04 | [83399](https://github.com/airbytehq/airbyte/pull/83399) | Update dependencies |
| 0.0.21 | 2026-07-28 | [82860](https://github.com/airbytehq/airbyte/pull/82860) | Update dependencies |
| 0.0.20 | 2026-07-21 | [82371](https://github.com/airbytehq/airbyte/pull/82371) | Update dependencies |
| 0.0.19 | 2026-07-14 | [81778](https://github.com/airbytehq/airbyte/pull/81778) | Update dependencies |
| 0.0.18 | 2026-06-30 | [81003](https://github.com/airbytehq/airbyte/pull/81003) | Update dependencies |
| 0.0.17 | 2026-06-23 | [80430](https://github.com/airbytehq/airbyte/pull/80430) | Update dependencies |
| 0.0.16 | 2026-06-16 | [79800](https://github.com/airbytehq/airbyte/pull/79800) | Update dependencies |
| 0.0.15 | 2026-06-09 | [79250](https://github.com/airbytehq/airbyte/pull/79250) | Update dependencies |
| 0.0.14 | 2026-06-02 | [78653](https://github.com/airbytehq/airbyte/pull/78653) | Update dependencies |
| 0.0.13 | 2026-04-28 | [77164](https://github.com/airbytehq/airbyte/pull/77164) | Update dependencies |
| 0.0.12 | 2026-04-21 | [76551](https://github.com/airbytehq/airbyte/pull/76551) | Update dependencies |
| 0.0.11 | 2026-03-31 | [75769](https://github.com/airbytehq/airbyte/pull/75769) | Update dependencies |
| 0.0.10 | 2026-03-17 | [75077](https://github.com/airbytehq/airbyte/pull/75077) | Update dependencies |
| 0.0.9 | 2026-03-10 | [74454](https://github.com/airbytehq/airbyte/pull/74454) | Update dependencies |
| 0.0.8 | 2026-02-24 | [73822](https://github.com/airbytehq/airbyte/pull/73822) | Update dependencies |
| 0.0.7 | 2026-02-17 | [73447](https://github.com/airbytehq/airbyte/pull/73447) | Update dependencies |
| 0.0.6 | 2026-02-10 | [73000](https://github.com/airbytehq/airbyte/pull/73000) | Update dependencies |
| 0.0.5 | 2026-02-03 | [72704](https://github.com/airbytehq/airbyte/pull/72704) | Update dependencies |
| 0.0.4 | 2026-01-20 | [72112](https://github.com/airbytehq/airbyte/pull/72112) | Update dependencies |
| 0.0.3 | 2026-01-14 | [71711](https://github.com/airbytehq/airbyte/pull/71711) | Update dependencies |
| 0.0.2 | 2025-12-19 | [70944](https://github.com/airbytehq/airbyte/pull/70944) | Update dependencies |
| 0.0.1 | 2025-10-13 | | Initial release by [@FVidalCarneiro](https://github.com/FVidalCarneiro) via Connector Builder |

</details>
