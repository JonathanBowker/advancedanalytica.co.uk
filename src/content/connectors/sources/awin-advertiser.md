---
generated_record: true
connector_name: AWIN Advertiser
connector_type: source
connector_slug: awin-advertiser
connector_directory: source-awin-advertiser
definition_id: 807cabe0-9c76-4132-8863-60f669dea534
version: 0.0.43
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/awin-advertiser
logo: /images/connectors/sources/awin-advertiser.svg
logo_source_path: airbyte-integrations/connectors/source-awin-advertiser/icon.svg
logo_sha256: 65569f067b421fc13941269ccf28c4b12eef1c877ddc0dc37272be48619c0a3e
original_metadata_path: airbyte-integrations/connectors/source-awin-advertiser/metadata.yaml
original_metadata_sha256: 3189343e7dd05e0928ea085bef9eec0ef4c7ffc9c2a3f2bf00d210d38e58e42c
original_document_path: docs/integrations/sources/awin-advertiser.md
original_document_sha256: d4158ba46ef1cb8baaea23f45e9fa57e3acd24533e181b0ab6e7957bacdcaaf7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: eeeb762759cad17b7070af9b3ce257cab32d69e921fb11828fc28846898714d9
rewritten_at: 2026-11-12T13:30:27.960733+00:00
---

# AWIN Advertiser
Website: https://www.awin.com/
Documentation: https://developer.awin.com/apidocs/for-advertisers

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `advertiserId` | `string` | advertiserId. Your Awin Advertiser ID. You can find this in your Awin dashboard or account settings. |  |
| `api_key` | `string` | API Key. Your Awin API key. Generate this from your Awin account under API Credentials. |  |
| `step_increment` | `string` | Step Increment. The time window size for each API request in ISO8601 duration format. For the campaign performance stream, Awin API explicitly limits the period between startDate and endDate to 400 days maximum.  | P400D |
| `lookback_days` | `integer` | Lookback Days. Number of days to look back on each sync to catch any updates to existing records. |  |
| `start_date` | `string` | Start Date. Start date for data replication in YYYY-MM-DD format |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| campaign_performance | date.publisherId.campaign | No pagination | ✅ |  ✅  |
| transactions | id | No pagination | ✅ |  ✅  |

## IP allow list

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and restrict access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.43 | 2026-11-10 | [91364](https://github.com/airbytehq/airbyte/pull/91364) | Update dependencies |
| 0.0.42 | 2026-11-03 | [90448](https://github.com/airbytehq/airbyte/pull/90448) | Update dependencies |
| 0.0.41 | 2026-10-27 | [89797](https://github.com/airbytehq/airbyte/pull/89797) | Update dependencies |
| 0.0.40 | 2026-10-20 | [89137](https://github.com/airbytehq/airbyte/pull/89137) | Update dependencies |
| 0.0.39 | 2026-10-13 | [88529](https://github.com/airbytehq/airbyte/pull/88529) | Update dependencies |
| 0.0.38 | 2026-10-06 | [87751](https://github.com/airbytehq/airbyte/pull/87751) | Update dependencies |
| 0.0.37 | 2026-09-29 | [87093](https://github.com/airbytehq/airbyte/pull/87093) | Update dependencies |
| 0.0.36 | 2026-09-22 | [86547](https://github.com/airbytehq/airbyte/pull/86547) | Update dependencies |
| 0.0.35 | 2026-09-15 | [85944](https://github.com/airbytehq/airbyte/pull/85944) | Update dependencies |
| 0.0.34 | 2026-09-08 | [84473](https://github.com/airbytehq/airbyte/pull/84473) | Update dependencies |
| 0.0.33 | 2026-08-11 | [83822](https://github.com/airbytehq/airbyte/pull/83822) | Update dependencies |
| 0.0.32 | 2026-08-04 | [83355](https://github.com/airbytehq/airbyte/pull/83355) | Update dependencies |
| 0.0.31 | 2026-07-28 | [82811](https://github.com/airbytehq/airbyte/pull/82811) | Update dependencies |
| 0.0.30 | 2026-07-21 | [82332](https://github.com/airbytehq/airbyte/pull/82332) | Update dependencies |
| 0.0.29 | 2026-07-14 | [81720](https://github.com/airbytehq/airbyte/pull/81720) | Update dependencies |
| 0.0.28 | 2026-06-30 | [80977](https://github.com/airbytehq/airbyte/pull/80977) | Update dependencies |
| 0.0.27 | 2026-06-23 | [80361](https://github.com/airbytehq/airbyte/pull/80361) | Update dependencies |
| 0.0.26 | 2026-06-16 | [79758](https://github.com/airbytehq/airbyte/pull/79758) | Update dependencies |
| 0.0.25 | 2026-06-09 | [79209](https://github.com/airbytehq/airbyte/pull/79209) | Update dependencies |
| 0.0.24 | 2026-06-02 | [78592](https://github.com/airbytehq/airbyte/pull/78592) | Update dependencies |
| 0.0.23 | 2026-04-28 | [77154](https://github.com/airbytehq/airbyte/pull/77154) | Update dependencies |
| 0.0.22 | 2026-04-21 | [76491](https://github.com/airbytehq/airbyte/pull/76491) | Update dependencies |
| 0.0.21 | 2026-03-24 | [75313](https://github.com/airbytehq/airbyte/pull/75313) | Update dependencies |
| 0.0.20 | 2026-03-10 | [74511](https://github.com/airbytehq/airbyte/pull/74511) | Update dependencies |
| 0.0.19 | 2026-02-24 | [73820](https://github.com/airbytehq/airbyte/pull/73820) | Update dependencies |
| 0.0.18 | 2026-02-17 | [73393](https://github.com/airbytehq/airbyte/pull/73393) | Update dependencies |
| 0.0.17 | 2026-02-03 | [72722](https://github.com/airbytehq/airbyte/pull/72722) | Update dependencies |
| 0.0.16 | 2026-01-20 | [71895](https://github.com/airbytehq/airbyte/pull/71895) | Update dependencies |
| 0.0.15 | 2026-01-14 | [71440](https://github.com/airbytehq/airbyte/pull/71440) | Update dependencies |
| 0.0.14 | 2025-12-18 | [70790](https://github.com/airbytehq/airbyte/pull/70790) | Update dependencies |
| 0.0.13 | 2025-11-25 | [69874](https://github.com/airbytehq/airbyte/pull/69874) | Update dependencies |
| 0.0.12 | 2025-11-18 | [69520](https://github.com/airbytehq/airbyte/pull/69520) | Update dependencies |
| 0.0.11 | 2025-10-29 | [68899](https://github.com/airbytehq/airbyte/pull/68899) | Update dependencies |
| 0.0.10 | 2025-10-21 | [68381](https://github.com/airbytehq/airbyte/pull/68381) | Update dependencies |
| 0.0.9 | 2025-10-14 | [68006](https://github.com/airbytehq/airbyte/pull/68006) | Update dependencies |
| 0.0.8 | 2025-10-07 | [67167](https://github.com/airbytehq/airbyte/pull/67167) | Update dependencies |
| 0.0.7 | 2025-09-30 | [65646](https://github.com/airbytehq/airbyte/pull/65646) | Update dependencies |
| 0.0.6 | 2025-08-09 | [64645](https://github.com/airbytehq/airbyte/pull/64645) | Update dependencies |
| 0.0.5 | 2025-08-02 | [64430](https://github.com/airbytehq/airbyte/pull/64430) | Update dependencies |
| 0.0.4 | 2025-06-25 | [62059](https://github.com/airbytehq/airbyte/pull/62059) | source-awin-advertiser contribution from navneetmaharishi |
| 0.0.3 | 2025-06-21 | [60733](https://github.com/airbytehq/airbyte/pull/60733) | Update dependencies |
| 0.0.2 | 2025-05-10 | [59902](https://github.com/airbytehq/airbyte/pull/59902) | Update dependencies |
| 0.0.1 | 2025-04-29 | | Initial release by [@ryanmcg2203](https://github.com/ryanmcg2203) via Connector Builder |

</details>
