---
generated_record: true
connector_name: Polygon Stock API
connector_type: source
connector_slug: polygon-stock-api
connector_directory: source-polygon-stock-api
definition_id: 5807d72f-0abc-49f9-8fa5-ae820007032b
version: 0.2.52
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/polygon-stock-api
logo: /images/connectors/sources/polygon-stock-api.svg
logo_source_path: airbyte-integrations/connectors/source-polygon-stock-api/icon.svg
logo_sha256: 76555c122fbd9760372cc3df55a260f54db3e9c1350e4c2d703ab8083e21c8e3
original_metadata_path: airbyte-integrations/connectors/source-polygon-stock-api/metadata.yaml
original_metadata_sha256: bcbbb5ac233502ba864e5ac1c2d6327d2e2eda21402215bf7b4a331860912609
original_document_path: docs/integrations/sources/polygon-stock-api.md
original_document_sha256: 86c9d6001adb31ecfc6fe0567db97b6b38f50daa26c6b40a932940302a85e171
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 19a5c25ee9ae38c12f316ed99914062c84f45fa0fd2e8a3656e5a7940419a4c7
rewritten_at: 2026-11-12T13:51:39.356295+00:00
---

# Polygon Stock API

## Sync overview

This source provides stock data available on [PolygonStocksApi](https://polygon.io). It currently supports Full Refresh syncs only.

### Output schema

You can sync the following streams:

- `stock_api`

### Features

| Feature           | Supported? \(Yes/No\) | Notes |
| :---------------- | :-------------------- | :---- |
| Full Refresh Sync | Yes                   |       |
| Incremental Sync  | No                    |       |

### Performance

The free Polygon Stocks API plan allows only 5 API Calls/Minute. Your requirements may mean you need a paid plan.

## Get started

### Requirements

1. Get an API key from [PolygonStocksApi](https://polygon.io).
2. Find the stock's exchange symbol, also called its Ticker Symbol. You can find it through Google. For example, Microsoft's exchange symbol is MSFT.
3. Choose and verify the other options you need to fetch the stock details. [here](https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to).

### Setup guide

The connector requires these fields:

- `apiKey`: Your Polygon Stocks API key.
- `stocksTicker`: The ticker symbol of the `stock/equity`.
- `multiplier`: The size of the timespan multiplier.
- `timespan`: The
- `from`: The aggregate time window's start. Enter a YYYY-MM-DD date or a millisecond timestamp.
- `to`: The aggregate time window's end. Enter a YYYY-MM-DD date or a millisecond timestamp.
- (optional) `adjusted`: Determines whether results are adjusted for splits. Results are adjusted by default, with this value set to true. Set it to false for results that aren't adjusted for splits.
- (optional) `sort`: Sorts results by timestamp. asc returns results in ascending order, with the oldest first. desc returns results in descending order, with the newest first.
- (optional) `limit`: Limits the base aggregates queried to create the aggregate results. The maximum is 50000, and the default is 5000. Learn how limit calculates aggregate results in the Aggregate Data API Improvements article [Find-more](https://polygon.io/blog/aggs-api-updates/).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.2.52 | 2026-06-02 | [78869](https://github.com/airbytehq/airbyte/pull/78869) | Update dependencies |
| 0.2.51 | 2026-04-28 | [77385](https://github.com/airbytehq/airbyte/pull/77385) | Update dependencies |
| 0.2.50 | 2026-04-21 | [76718](https://github.com/airbytehq/airbyte/pull/76718) | Update dependencies |
| 0.2.49 | 2026-03-17 | [74926](https://github.com/airbytehq/airbyte/pull/74926) | Update dependencies |
| 0.2.48 | 2026-03-10 | [74635](https://github.com/airbytehq/airbyte/pull/74635) | Update dependencies |
| 0.2.47 | 2026-02-24 | [73840](https://github.com/airbytehq/airbyte/pull/73840) | Update dependencies |
| 0.2.46 | 2026-02-17 | [73572](https://github.com/airbytehq/airbyte/pull/73572) | Update dependencies |
| 0.2.45 | 2026-02-10 | [73165](https://github.com/airbytehq/airbyte/pull/73165) | Update dependencies |
| 0.2.44 | 2026-02-03 | [72640](https://github.com/airbytehq/airbyte/pull/72640) | Update dependencies |
| 0.2.43 | 2026-01-20 | [72169](https://github.com/airbytehq/airbyte/pull/72169) | Update dependencies |
| 0.2.42 | 2026-01-14 | [71565](https://github.com/airbytehq/airbyte/pull/71565) | Update dependencies |
| 0.2.41 | 2025-12-18 | [70525](https://github.com/airbytehq/airbyte/pull/70525) | Update dependencies |
| 0.2.40 | 2025-11-25 | [69937](https://github.com/airbytehq/airbyte/pull/69937) | Update dependencies |
| 0.2.39 | 2025-11-18 | [69628](https://github.com/airbytehq/airbyte/pull/69628) | Update dependencies |
| 0.2.38 | 2025-10-29 | [68931](https://github.com/airbytehq/airbyte/pull/68931) | Update dependencies |
| 0.2.37 | 2025-10-21 | [68247](https://github.com/airbytehq/airbyte/pull/68247) | Update dependencies |
| 0.2.36 | 2025-10-14 | [67485](https://github.com/airbytehq/airbyte/pull/67485) | Update dependencies |
| 0.2.35 | 2025-10-01 | [66962](https://github.com/airbytehq/airbyte/pull/66962) | Update dependencies |
| 0.2.34 | 2025-09-23 | [66424](https://github.com/airbytehq/airbyte/pull/66424) | Update dependencies |
| 0.2.33 | 2025-09-09 | [65824](https://github.com/airbytehq/airbyte/pull/65824) | Update dependencies |
| 0.2.32 | 2025-08-23 | [65232](https://github.com/airbytehq/airbyte/pull/65232) | Update dependencies |
| 0.2.31 | 2025-08-09 | [64669](https://github.com/airbytehq/airbyte/pull/64669) | Update dependencies |
| 0.2.30 | 2025-08-02 | [64226](https://github.com/airbytehq/airbyte/pull/64226) | Update dependencies |
| 0.2.29 | 2025-07-26 | [63932](https://github.com/airbytehq/airbyte/pull/63932) | Update dependencies |
| 0.2.28 | 2025-07-19 | [63387](https://github.com/airbytehq/airbyte/pull/63387) | Update dependencies |
| 0.2.27 | 2025-07-12 | [63220](https://github.com/airbytehq/airbyte/pull/63220) | Update dependencies |
| 0.2.26 | 2025-07-05 | [62603](https://github.com/airbytehq/airbyte/pull/62603) | Update dependencies |
| 0.2.25 | 2025-06-28 | [62299](https://github.com/airbytehq/airbyte/pull/62299) | Update dependencies |
| 0.2.24 | 2025-06-21 | [61026](https://github.com/airbytehq/airbyte/pull/61026) | Update dependencies |
| 0.2.23 | 2025-05-24 | [60573](https://github.com/airbytehq/airbyte/pull/60573) | Update dependencies |
| 0.2.22 | 2025-05-10 | [60127](https://github.com/airbytehq/airbyte/pull/60127) | Update dependencies |
| 0.2.21 | 2025-05-03 | [59474](https://github.com/airbytehq/airbyte/pull/59474) | Update dependencies |
| 0.2.20 | 2025-04-27 | [59075](https://github.com/airbytehq/airbyte/pull/59075) | Update dependencies |
| 0.2.19 | 2025-04-19 | [58498](https://github.com/airbytehq/airbyte/pull/58498) | Update dependencies |
| 0.2.18 | 2025-04-12 | [57866](https://github.com/airbytehq/airbyte/pull/57866) | Update dependencies |
| 0.2.17 | 2025-04-05 | [57363](https://github.com/airbytehq/airbyte/pull/57363) | Update dependencies |
| 0.2.16 | 2025-03-29 | [56783](https://github.com/airbytehq/airbyte/pull/56783) | Update dependencies |
| 0.2.15 | 2025-03-22 | [56188](https://github.com/airbytehq/airbyte/pull/56188) | Update dependencies |
| 0.2.14 | 2025-03-08 | [55058](https://github.com/airbytehq/airbyte/pull/55058) | Update dependencies |
| 0.2.13 | 2025-02-23 | [53996](https://github.com/airbytehq/airbyte/pull/53996) | Update dependencies |
| 0.2.12 | 2025-02-08 | [53458](https://github.com/airbytehq/airbyte/pull/53458) | Update dependencies |
| 0.2.11 | 2025-02-01 | [52981](https://github.com/airbytehq/airbyte/pull/52981) | Update dependencies |
| 0.2.10 | 2025-01-25 | [52508](https://github.com/airbytehq/airbyte/pull/52508) | Update dependencies |
| 0.2.9 | 2025-01-18 | [51907](https://github.com/airbytehq/airbyte/pull/51907) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51327](https://github.com/airbytehq/airbyte/pull/51327) | Update dependencies |
| 0.2.7 | 2024-12-28 | [50732](https://github.com/airbytehq/airbyte/pull/50732) | Update dependencies |
| 0.2.6 | 2024-12-21 | [50283](https://github.com/airbytehq/airbyte/pull/50283) | Update dependencies |
| 0.2.5 | 2024-12-14 | [49700](https://github.com/airbytehq/airbyte/pull/49700) | Update dependencies |
| 0.2.4 | 2024-12-12 | [49348](https://github.com/airbytehq/airbyte/pull/49348) | Update dependencies |
| 0.2.3 | 2024-12-11 | [48310](https://github.com/airbytehq/airbyte/pull/48310) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.2 | 2024-10-29 | [47901](https://github.com/airbytehq/airbyte/pull/47901) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47496](https://github.com/airbytehq/airbyte/pull/47496) | Update dependencies |
| 0.2.0 | 2024-08-19 | [44408](https://github.com/airbytehq/airbyte/pull/44408) | Refactor connector to manifest-only format |
| 0.1.17 | 2024-08-17 | [44245](https://github.com/airbytehq/airbyte/pull/44245) | Update dependencies |
| 0.1.16 | 2024-08-10 | [43526](https://github.com/airbytehq/airbyte/pull/43526) | Update dependencies |
| 0.1.15 | 2024-08-03 | [43062](https://github.com/airbytehq/airbyte/pull/43062) | Update dependencies |
| 0.1.14 | 2024-07-27 | [42771](https://github.com/airbytehq/airbyte/pull/42771) | Update dependencies |
| 0.1.13 | 2024-07-20 | [42317](https://github.com/airbytehq/airbyte/pull/42317) | Update dependencies |
| 0.1.12 | 2024-07-13 | [41897](https://github.com/airbytehq/airbyte/pull/41897) | Update dependencies |
| 0.1.11 | 2024-07-10 | [41391](https://github.com/airbytehq/airbyte/pull/41391) | Update dependencies |
| 0.1.10 | 2024-07-06 | [40912](https://github.com/airbytehq/airbyte/pull/40912) | Update dependencies |
| 0.1.9 | 2024-06-25 | [40360](https://github.com/airbytehq/airbyte/pull/40360) | Update dependencies |
| 0.1.8 | 2024-06-21 | [39938](https://github.com/airbytehq/airbyte/pull/39938) | Update dependencies |
| 0.1.7 | 2024-06-06 | [39302](https://github.com/airbytehq/airbyte/pull/39302) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.6 | 2024-04-28 | [37230](https://github.com/airbytehq/airbyte/pull/37230) | Make connector compatible with Builder |
| 0.1.5 | 2024-04-19 | [37230](https://github.com/airbytehq/airbyte/pull/37230) | Updating to 0.80.0 CDK |
| 0.1.4 | 2024-04-18 | [37230](https://github.com/airbytehq/airbyte/pull/37230) | Manage dependencies with Poetry. |
| 0.1.3 | 2024-04-15 | [37230](https://github.com/airbytehq/airbyte/pull/37230) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.2 | 2024-04-12 | [37230](https://github.com/airbytehq/airbyte/pull/37230) | schema descriptions |
| 0.1.1 | 2023-02-13 | [22908](https://github.com/airbytehq/airbyte/pull/22908) | Specified date formatting in specificatition |
| 0.1.0 | 2022-11-02 | [18842](https://github.com/airbytehq/airbyte/pull/18842) | New source |

</details>
