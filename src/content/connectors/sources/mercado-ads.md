---
generated_record: true
connector_name: Mercado Ads
connector_type: source
connector_slug: mercado-ads
connector_directory: source-mercado-ads
definition_id: ada19dae-81e5-4241-8e64-a9b2680b1b35
version: 0.0.51
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/mercado-ads
logo: /images/connectors/sources/mercado-ads.svg
logo_source_path: airbyte-integrations/connectors/source-mercado-ads/icon.svg
logo_sha256: 4d8d303732825ca0c00277e02430414a11d60e4dbdfc9ed6491cae7a59ddd627
original_metadata_path: airbyte-integrations/connectors/source-mercado-ads/metadata.yaml
original_metadata_sha256: 28648f6b9d76dbe9e24b25a698c08321442c218cb6e1f6070685b98635d004b2
original_document_path: docs/integrations/sources/mercado-ads.md
original_document_sha256: 78d490adb302d8755b57c116dac023c6504da9e090de454e382c4f43c8338b4d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: cf79648160757fc545674016f8d1ccacf19fa7f146d1e539634997177f864885
rewritten_at: 2026-11-12T13:46:25.286051+00:00
---

# Mercado Ads
Get advertising analytics across all Mercado Ads placements.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `client_id` | `string` | Client ID.  |  |
| `client_secret` | `string` | Client secret.  |  |
| `client_refresh_token` | `string` | Refresh token.  |  |
| `lookback_days` | `number` | Lookback Days.  | 7 |
| `start_date` | `string` | Start Date. Cannot exceed 90 days from current day for Product Ads, and 90 days from &quot;End Date&quot; on Brand and Display Ads |  |
| `end_date` | `string` | End Date. Cannot exceed 90 days from current day for Product Ads |  |
| `access_token` | `string` | Access Token. Managed automatically by the connector; leave empty. |  |
| `token_expiry_date` | `string` | Token Expiry Date. Managed automatically by the connector; leave empty. |  |

:::note
Mercado Libre refresh tokens are single-use. Each call to `/oauth/token` invalidates the refresh token used and returns a new one.
See [Authentication and Authorization](https://developers.mercadolibre.com.ar/en_us/authentication-and-authorization).

After each refresh, the connector saves the rotated `client_refresh_token` to the source configuration.

Don't use the refresh token elsewhere after obtaining it. This includes a manual `curl` call or another integration.

If you see an `invalid_grant` error, generate a new refresh token. Then update the source configuration.
:::

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| brand_advertisers | advertiser_id | No pagination | ✅ |  ❌  |
| brand_campaigns | advertiser_id.campaign_id | No pagination | ✅ |  ❌  |
| brand_campaigns_metrics | date.advertiser_id.campaign_id | DefaultPaginator | ✅ |  ✅  |
| brand_items | advertiser_id.campaign_id.item_id | No pagination | ✅ |  ❌  |
| brand_keywords | advertiser_id.campaign_id.term.match_type | No pagination | ✅ |  ❌  |
| brand_keywords_metrics | date.advertiser_id.campaign_id | DefaultPaginator | ✅ |  ✅  |
| display_advertisers | advertiser_id | No pagination | ✅ |  ❌  |
| display_campaigns | advertiser_id.campaign_id | No pagination | ✅ |  ❌  |
| display_campaigns_metrics | date.advertiser_id.campaign_id | No pagination | ✅ |  ✅  |
| display_line_items | advertiser_id.campaign_id.line_item_id | No pagination | ✅ |  ❌  |
| display_line_items_metrics | date.advertiser_id.campaign_id.line_item_id | No pagination | ✅ |  ✅  |
| display_creatives | advertiser_id.campaign_id.line_item_id | No pagination | ✅ |  ❌  |
| product_advertisers | advertiser_id | No pagination | ✅ |  ❌  |
| product_campaigns | advertiser_id.campaign_id | DefaultPaginator | ✅ |  ❌  |
| product_campaigns_metrics | date.advertiser_id.campaign_id | DefaultPaginator | ✅ |  ✅  |
| product_items | advertiser_id.campaign_id.item_id | DefaultPaginator | ✅ |  ❌  |
| product_items_metrics | date.advertiser_id.campaign_id.item_id | DefaultPaginator | ✅ |  ✅  |

## Allow IP addresses

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.51 | 2026-11-10 | [91599](https://github.com/airbytehq/airbyte/pull/91599) | Update dependencies |
| 0.0.50 | 2026-11-03 | [90649](https://github.com/airbytehq/airbyte/pull/90649) | Update dependencies |
| 0.0.49 | 2026-10-27 | [89980](https://github.com/airbytehq/airbyte/pull/89980) | Update dependencies |
| 0.0.48 | 2026-10-20 | [89290](https://github.com/airbytehq/airbyte/pull/89290) | Update dependencies |
| 0.0.47 | 2026-10-13 | [88698](https://github.com/airbytehq/airbyte/pull/88698) | Update dependencies |
| 0.0.46 | 2026-10-07 | [88243](https://github.com/airbytehq/airbyte/pull/88243) | Persist Mercado Libre's rotated single-use refresh token (`refresh_token_updater`), surface `invalid_grant` as a config error, fix double slash in `brand_keywords_metrics` path |
| 0.0.45 | 2026-10-06 | [87946](https://github.com/airbytehq/airbyte/pull/87946) | Update dependencies |
| 0.0.44 | 2026-09-29 | [87245](https://github.com/airbytehq/airbyte/pull/87245) | Update dependencies |
| 0.0.43 | 2026-09-22 | [86711](https://github.com/airbytehq/airbyte/pull/86711) | Update dependencies |
| 0.0.42 | 2026-09-15 | [86141](https://github.com/airbytehq/airbyte/pull/86141) | Update dependencies |
| 0.0.41 | 2026-09-08 | [85568](https://github.com/airbytehq/airbyte/pull/85568) | Update dependencies |
| 0.0.40 | 2026-08-18 | [84657](https://github.com/airbytehq/airbyte/pull/84657) | Update dependencies |
| 0.0.39 | 2026-08-11 | [84024](https://github.com/airbytehq/airbyte/pull/84024) | Update dependencies |
| 0.0.38 | 2026-08-04 | [83536](https://github.com/airbytehq/airbyte/pull/83536) | Update dependencies |
| 0.0.37 | 2026-07-28 | [82985](https://github.com/airbytehq/airbyte/pull/82985) | Update dependencies |
| 0.0.36 | 2026-07-21 | [82489](https://github.com/airbytehq/airbyte/pull/82489) | Update dependencies |
| 0.0.35 | 2026-07-14 | [81897](https://github.com/airbytehq/airbyte/pull/81897) | Update dependencies |
| 0.0.34 | 2026-06-30 | [81144](https://github.com/airbytehq/airbyte/pull/81144) | Update dependencies |
| 0.0.33 | 2026-06-23 | [80537](https://github.com/airbytehq/airbyte/pull/80537) | Update dependencies |
| 0.0.32 | 2026-06-16 | [79954](https://github.com/airbytehq/airbyte/pull/79954) | Update dependencies |
| 0.0.31 | 2026-06-09 | [79395](https://github.com/airbytehq/airbyte/pull/79395) | Update dependencies |
| 0.0.30 | 2026-06-02 | [78848](https://github.com/airbytehq/airbyte/pull/78848) | Update dependencies |
| 0.0.29 | 2026-04-28 | [77296](https://github.com/airbytehq/airbyte/pull/77296) | Update dependencies |
| 0.0.28 | 2026-04-21 | [76679](https://github.com/airbytehq/airbyte/pull/76679) | Update dependencies |
| 0.0.27 | 2026-03-31 | [75834](https://github.com/airbytehq/airbyte/pull/75834) | Update dependencies |
| 0.0.26 | 2026-03-24 | [74582](https://github.com/airbytehq/airbyte/pull/74582) | Update dependencies |
| 0.0.25 | 2026-02-24 | [73811](https://github.com/airbytehq/airbyte/pull/73811) | Update dependencies |
| 0.0.24 | 2026-02-17 | [73382](https://github.com/airbytehq/airbyte/pull/73382) | Update dependencies |
| 0.0.23 | 2026-02-10 | [73186](https://github.com/airbytehq/airbyte/pull/73186) | Update dependencies |
| 0.0.22 | 2026-02-03 | [72689](https://github.com/airbytehq/airbyte/pull/72689) | Update dependencies |
| 0.0.21 | 2026-01-20 | [72022](https://github.com/airbytehq/airbyte/pull/72022) | Update dependencies |
| 0.0.20 | 2026-01-14 | [71531](https://github.com/airbytehq/airbyte/pull/71531) | Update dependencies |
| 0.0.19 | 2025-12-18 | [70785](https://github.com/airbytehq/airbyte/pull/70785) | Update dependencies |
| 0.0.18 | 2025-11-25 | [70094](https://github.com/airbytehq/airbyte/pull/70094) | Update dependencies |
| 0.0.17 | 2025-11-18 | [69576](https://github.com/airbytehq/airbyte/pull/69576) | Update dependencies |
| 0.0.16 | 2025-10-29 | [69068](https://github.com/airbytehq/airbyte/pull/69068) | Update dependencies |
| 0.0.15 | 2025-10-21 | [68437](https://github.com/airbytehq/airbyte/pull/68437) | Update dependencies |
| 0.0.14 | 2025-10-14 | [67833](https://github.com/airbytehq/airbyte/pull/67833) | Update dependencies |
| 0.0.13 | 2025-10-07 | [67378](https://github.com/airbytehq/airbyte/pull/67378) | Update dependencies |
| 0.0.12 | 2025-09-30 | [66343](https://github.com/airbytehq/airbyte/pull/66343) | Update dependencies |
| 0.0.11 | 2025-09-09 | [65839](https://github.com/airbytehq/airbyte/pull/65839) | Update dependencies |
| 0.0.10 | 2025-08-23 | [65192](https://github.com/airbytehq/airbyte/pull/65192) | Update dependencies |
| 0.0.9 | 2025-08-16 | [64977](https://github.com/airbytehq/airbyte/pull/64977) | Update dependencies |
| 0.0.8 | 2025-08-02 | [64270](https://github.com/airbytehq/airbyte/pull/64270) | Update dependencies |
| 0.0.7 | 2025-07-26 | [63897](https://github.com/airbytehq/airbyte/pull/63897) | Update dependencies |
| 0.0.6 | 2025-07-19 | [63442](https://github.com/airbytehq/airbyte/pull/63442) | Update dependencies |
| 0.0.5 | 2025-07-12 | [63257](https://github.com/airbytehq/airbyte/pull/63257) | Update dependencies |
| 0.0.4 | 2025-07-05 | [62576](https://github.com/airbytehq/airbyte/pull/62576) | Update dependencies |
| 0.0.3 | 2025-06-28 | [62401](https://github.com/airbytehq/airbyte/pull/62401) | Update dependencies |
| 0.0.2 | 2025-06-21 | [61136](https://github.com/airbytehq/airbyte/pull/61136) | Update dependencies |
| 0.0.1 | 2025-05-26 | | Initial release by [@joacoc2020](https://github.com/joacoc2020) via Connector Builder |

</details>
