---
generated_record: true
connector_name: MNTN
connector_type: source
connector_slug: mntn
connector_directory: source-mntn
definition_id: a3a24742-a9f3-44f5-90b6-82a888063466
version: 0.0.13
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/mntn
logo: /images/connectors/sources/mntn.svg
logo_source_path: airbyte-integrations/connectors/source-mntn/icon.svg
logo_sha256: 8e88b913997d24ac1411c5da68dfbea710d1c3f247cf8518fa65361f38d84b22
original_metadata_path: airbyte-integrations/connectors/source-mntn/metadata.yaml
original_metadata_sha256: 77e2053eea7f3ce38499064adceb4ae2c9ff586115cf1a8c94dac05f940f6efc
original_document_path: docs/integrations/sources/mntn.md
original_document_sha256: a91d498b7aa99e946114189f3549e68f2ee22dd7f4e58187afe309d2322960e5
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4d1fc48bf080236a48aca1e1829955a472af88fcdbad1543361e57159e0779cb
rewritten_at: 2026-11-12T13:47:26.613471+00:00
---

# MNTN

MNTN lets brands of any size create and launch TV commercials on shows, movies and live sports. This source reads campaign, creative and advertiser reporting data from the MNTN Reporting API 3.0 (`api3.mountain.com`).

## Prerequisites

- An MNTN account with access to Reporting.
- Your MNTN Reporting API key.

To find the key, sign in to MNTN and open **My Account** from the account dropdown. In the left navigation, click **API**, then click **Copy** next to **Reporting API**. See [Access your Reporting API key](https://help.mountain.com/en/articles/6511970-access-your-reporting-api-key) for details. Every user on your MNTN account can read this key, so treat it like a password.

This source uses MNTN API 3.0. If your BI tool or script still queries MNTN through `api.mountain.com`, note that [API 1.0 stopped returning reporting data on April 1, 2026](https://help.mountain.com/en/articles/9106215-upgrade-to-api-3-0).

## Configuration

| Input | Type | Description | Default Value |
| --- | --- | --- | --- |
| `api_key` | `string` | API Key. | |
| `start_time` | `string` | start_time. | 2023-01-01 |

Set `start_time` to a date in `YYYY-MM-DD` format. This becomes the `begin` date for every reporting query. It also determines how far back the first sync reads from incremental streams.

## Streams

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
| --- | --- | --- | --- | --- |
| CampaignDetails | ID | No pagination | ✅ | ❌ |
| CreativeDetails | ID.Day | No pagination | ✅ | ✅ |
| Campaign | ID.Day | No pagination | ✅ | ✅ |
| Creative | ID.Day | No pagination | ✅ | ✅ |
| Advertiser | ID.Day | No pagination | ✅ | ✅ |

The streams fall into two groups:

- `CampaignDetails` and `CreativeDetails` return configuration data. `CampaignDetails` returns one row per campaign, including its name, status, budget, flight dates and goal. `CreativeDetails` returns one row per creative per day. Each row includes its name, creative group, active flag, template creative and click URL.
- `Campaign`, `Creative` and `Advertiser` return daily performance metrics at campaign, creative and account level. These include impressions, spend, visits, conversions, order value, ROAS, reach and frequency.

## Sync behaviour and limitations

- Performance metrics use First Touch attribution, the API 3.0 default. Each performance stream also includes equivalent Last Touch fields, such as `LastTouchConversions` and `LastTouchROAS`. You can compare both models.
- Every field arrives as a string, including numeric metrics and dates. Cast the values you need in your destination or transformation layer.
- Incremental streams use `Day` as the cursor and read one day per request. A first sync starting several years ago therefore sends one request for each day in that range. This can take some time. Set `start_time` no earlier than you need.
- `CampaignDetails` has no date dimension, so it only supports full refresh. Every sync reads from `start_time` through the current date in one request. Your chosen stream sync mode determines how your destination handles those rows.
- The connector calls MNTN's synchronous reporting endpoint. MNTN [recommends its asynchronous `/batch` endpoint](https://help.mountain.com/en/articles/8017927-generate-api-requests-from-reports) for requests covering more than four months, returning high-cardinality data or timing out. `CampaignDetails` requests your entire window in one call. Keep that guidance in mind when setting an early `start_time`.
- MNTN doesn't publish rate limits for the reporting API.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.13 | 2026-11-03 | [89296](https://github.com/airbytehq/airbyte/pull/89296) | Update dependencies |
| 0.0.12 | 2026-10-13 | [88719](https://github.com/airbytehq/airbyte/pull/88719) | Update dependencies |
| 0.0.11 | 2026-10-06 | [87917](https://github.com/airbytehq/airbyte/pull/87917) | Update dependencies |
| 0.0.10 | 2026-09-29 | [87263](https://github.com/airbytehq/airbyte/pull/87263) | Update dependencies |
| 0.0.9 | 2026-09-22 | [86728](https://github.com/airbytehq/airbyte/pull/86728) | Update dependencies |
| 0.0.8 | 2026-09-15 | [86150](https://github.com/airbytehq/airbyte/pull/86150) | Update dependencies |
| 0.0.7 | 2026-09-08 | [85583](https://github.com/airbytehq/airbyte/pull/85583) | Update dependencies |
| 0.0.6 | 2026-08-26 | [85027](https://github.com/airbytehq/airbyte/pull/85027) | Enable acceptance test suite with GSM test secrets |
| 0.0.5 | 2026-08-18 | [84647](https://github.com/airbytehq/airbyte/pull/84647) | Update dependencies |
| 0.0.4 | 2026-08-11 | [84027](https://github.com/airbytehq/airbyte/pull/84027) | Update dependencies |
| 0.0.3 | 2026-08-04 | [83541](https://github.com/airbytehq/airbyte/pull/83541) | Update dependencies |
| 0.0.2 | 2026-07-28 | [83005](https://github.com/airbytehq/airbyte/pull/83005) | Update dependencies |
| 0.0.1 | 2026-07-27 | [81334](https://github.com/airbytehq/airbyte/pull/81334) | Initial release by [@Ella6882](https://github.com/Ella6882) via Connector Builder |

</details>
