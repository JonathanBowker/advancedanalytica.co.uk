---
generated_record: true
connector_name: CoinGecko Coins
connector_type: source
connector_slug: coingecko-coins
connector_directory: source-coingecko-coins
definition_id: 9cdd4183-d0ba-40c3-aad3-6f46d4103974
version: 0.2.28
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/coingecko-coins
logo: /images/connectors/sources/coingecko-coins.svg
logo_source_path: airbyte-integrations/connectors/source-coingecko-coins/icon.svg
logo_sha256: dbcbe8b05b2ed0d165c4cc5f5e582eeff3e3903840fe7c7cdf90ab54e21c0060
original_metadata_path: airbyte-integrations/connectors/source-coingecko-coins/metadata.yaml
original_metadata_sha256: 2a8750d55a11a2603c335ff9d9b2464b6d3437a2a7c4ad8928258943da3d16ec
original_document_path: docs/integrations/sources/coingecko-coins.md
original_document_sha256: 9080aca00d19ff455cec54e63509dd6cb8d09059d094670c76834c2caa2ea8fc
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f630be1e42b8be24c2583a434a38e57b3e5bfe609bc574d87effc1ca1ed9cc64
rewritten_at: 2026-11-12T13:34:06.417927+00:00
---

# CoinGecko Coins

## Sync overview

Sync market chart and historical data for one coin listed on the [CoinGecko](https://coingecko.com) API. This source currently supports Full Refresh syncing only.

### Output schema

You can sync the following streams:

- `market_chart`
- `history`

### Features

| Feature           | Supported? \(Yes/No\) | Notes                                                  |
| :---------------- | :-------------------- | :----------------------------------------------------- |
| Full Refresh Sync | Yes                   |                                                        |
| Incremental Sync  | No                    |                                                        |
| CoinGecko Pro API | Yes                   | Will default to free API unless an API key is provided |

### Performance

The CoinGecko API limits requests to 10–50 per minute. The connector shouldn't reach this limit during normal operation.

Public CoinGecko API users can only query historical data from the past 365 days. A `start_date` older than 365 days, or `days: max`, requires a [CoinGecko Pro API key](https://www.coingecko.com/en/api/pricing). Without one, the connector fails with a configuration error explaining the limit.

CoinGecko also requests attribution when free users use its data. Read more about this [here](https://www.coingecko.com/en/branding).

## Get started

### Requirements

1. Choose a coin listed on CoinGecko. You can find available coins through the `/coins/list` endpoint.
2. Choose a `vs_currency` for the data. You can find available currencies through the `/simple/supported_vs_currencies` endpoint.

### Setup guide

The connector requires the following fields:

- `coin_id`: The coin ID for the data. Find it through the `/coins/list` endpoint.
- `vs_currency`: The currency for the data. Find it through the `/simple/supported_vs_currencies` endpoint.
- `days`: The number of days of `market_chart` data to pull.
- `start_date`: The start date for `history` data, in `YYYY-MM-DD` format. The legacy `DD-MM-YYYY` format is also accepted.
- (optional) `end_date`: The end date for `history` data, in `YYYY-MM-DD` format. It defaults to today.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                       |
| :------ | :--------- | :------------------------------------------------------- | :-------------------------------------------- |
| 0.2.28 | 2026-11-09 | [91331](https://github.com/airbytehq/airbyte/pull/91331) | Upgrade to SDM 7.47.0 and add mock server tests |
| 0.2.27 | 2026-10-07 | [88334](https://github.com/airbytehq/airbyte/pull/88334) | Accept `YYYY-MM-DD` dates from the UI date picker for `start_date`/`end_date`; surface CoinGecko's 365-day public-API limit as a clear config error |
| 0.2.26 | 2025-05-24 | [60393](https://github.com/airbytehq/airbyte/pull/60393) | Update dependencies |
| 0.2.25 | 2025-05-10 | [59918](https://github.com/airbytehq/airbyte/pull/59918) | Update dependencies |
| 0.2.24 | 2025-05-03 | [59394](https://github.com/airbytehq/airbyte/pull/59394) | Update dependencies |
| 0.2.23 | 2025-04-26 | [58833](https://github.com/airbytehq/airbyte/pull/58833) | Update dependencies |
| 0.2.22 | 2025-04-19 | [58359](https://github.com/airbytehq/airbyte/pull/58359) | Update dependencies |
| 0.2.21 | 2025-04-12 | [57760](https://github.com/airbytehq/airbyte/pull/57760) | Update dependencies |
| 0.2.20 | 2025-04-05 | [57254](https://github.com/airbytehq/airbyte/pull/57254) | Update dependencies |
| 0.2.19 | 2025-03-29 | [56504](https://github.com/airbytehq/airbyte/pull/56504) | Update dependencies |
| 0.2.18 | 2025-03-22 | [55340](https://github.com/airbytehq/airbyte/pull/55340) | Update dependencies |
| 0.2.17 | 2025-03-01 | [54932](https://github.com/airbytehq/airbyte/pull/54932) | Update dependencies |
| 0.2.16 | 2025-02-22 | [54441](https://github.com/airbytehq/airbyte/pull/54441) | Update dependencies |
| 0.2.15 | 2025-02-15 | [53743](https://github.com/airbytehq/airbyte/pull/53743) | Update dependencies |
| 0.2.14 | 2025-02-08 | [53332](https://github.com/airbytehq/airbyte/pull/53332) | Update dependencies |
| 0.2.13 | 2025-02-01 | [52849](https://github.com/airbytehq/airbyte/pull/52849) | Update dependencies |
| 0.2.12 | 2025-01-25 | [52299](https://github.com/airbytehq/airbyte/pull/52299) | Update dependencies |
| 0.2.11 | 2025-01-18 | [51644](https://github.com/airbytehq/airbyte/pull/51644) | Update dependencies |
| 0.2.10 | 2025-01-11 | [51060](https://github.com/airbytehq/airbyte/pull/51060) | Update dependencies |
| 0.2.9 | 2024-12-28 | [50572](https://github.com/airbytehq/airbyte/pull/50572) | Update dependencies |
| 0.2.8 | 2024-12-21 | [49995](https://github.com/airbytehq/airbyte/pull/49995) | Update dependencies |
| 0.2.7 | 2024-12-14 | [49527](https://github.com/airbytehq/airbyte/pull/49527) | Update dependencies |
| 0.2.6 | 2024-12-12 | [49208](https://github.com/airbytehq/airbyte/pull/49208) | Update dependencies |
| 0.2.5 | 2024-12-11 | [48937](https://github.com/airbytehq/airbyte/pull/48937) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.4 | 2024-11-05 | [48363](https://github.com/airbytehq/airbyte/pull/48363) | Revert to source-declarative-manifest v5.17.0 |
| 0.2.3 | 2024-11-05 | [48330](https://github.com/airbytehq/airbyte/pull/48330) | Update dependencies |
| 0.2.2 | 2024-10-29 | [47804](https://github.com/airbytehq/airbyte/pull/47804) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47559](https://github.com/airbytehq/airbyte/pull/47559) | Update dependencies |
| 0.2.0 | 2024-08-22 | [44565](https://github.com/airbytehq/airbyte/pull/44565) | Refactor connector to manifest-only format |
| 0.1.13 | 2024-08-17 | [44306](https://github.com/airbytehq/airbyte/pull/44306) | Update dependencies |
| 0.1.12 | 2024-08-12 | [43911](https://github.com/airbytehq/airbyte/pull/43911) | Update dependencies |
| 0.1.11 | 2024-08-10 | [43537](https://github.com/airbytehq/airbyte/pull/43537) | Update dependencies |
| 0.1.10 | 2024-08-03 | [43113](https://github.com/airbytehq/airbyte/pull/43113) | Update dependencies |
| 0.1.9 | 2024-07-27 | [42625](https://github.com/airbytehq/airbyte/pull/42625) | Update dependencies |
| 0.1.8 | 2024-07-20 | [42335](https://github.com/airbytehq/airbyte/pull/42335) | Update dependencies |
| 0.1.7 | 2024-07-13 | [41707](https://github.com/airbytehq/airbyte/pull/41707) | Update dependencies |
| 0.1.6 | 2024-07-10 | [41262](https://github.com/airbytehq/airbyte/pull/41262) | Update dependencies |
| 0.1.5 | 2024-07-06 | [40879](https://github.com/airbytehq/airbyte/pull/40879) | Update dependencies |
| 0.1.4 | 2024-06-25 | [40292](https://github.com/airbytehq/airbyte/pull/40292) | Update dependencies |
| 0.1.3 | 2024-06-22 | [40035](https://github.com/airbytehq/airbyte/pull/40035) | Update dependencies |
| 0.1.2 | 2024-06-04 | [38971](https://github.com/airbytehq/airbyte/pull/38971) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-21 | [38515](https://github.com/airbytehq/airbyte/pull/38515) | [autopull] base image + poetry + up_to_date |
| 0.1.1 | 2023-04-30 | [25558](https://github.com/airbytehq/airbyte/pull/25558) | Make manifest.yaml connector builder-friendly |
| 0.1.0 | 2022-10-20 | [18248](https://github.com/airbytehq/airbyte/pull/18248) | New source |

</details>
