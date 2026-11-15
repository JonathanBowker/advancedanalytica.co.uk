---
generated_record: true
connector_name: Marketstack
connector_type: source
connector_slug: marketstack
connector_directory: source-marketstack
definition_id: 0caeba13-0807-46aa-a6c0-7e8d25d168be
version: 0.0.74
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/marketstack
logo: /images/connectors/sources/marketstack.svg
logo_source_path: airbyte-integrations/connectors/source-marketstack/icon.svg
logo_sha256: 445a8d730db54ba846807233878769fc52dca0b0a812634b8f812bd63d5365e0
original_metadata_path: airbyte-integrations/connectors/source-marketstack/metadata.yaml
original_metadata_sha256: b84a890cd9d8c8fcdb3a730097ec14e7e6c45591466d6240d52eac25ef596ef3
original_document_path: docs/integrations/sources/marketstack.md
original_document_sha256: 35bc28729e212053d982add66ff57390cd68bba10e244b3386943ca5f2965bbf
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9f46e19c864e489c4d92f5789419f82430fac580b227ad77e5e406c2288e67c4
rewritten_at: 2026-11-12T13:46:22.324797+00:00
---

# Marketstack
Marketstack provides data from 72 global stock exchanges.
This connector extracts Historical Data, Splits and Dividends data.

This connector uses the [Marketstack API v2](https://marketstack.com/documentation_v2) (`https://api.marketstack.com/v2/`). Marketstack deprecated the v1 endpoints after 30 June 2025.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `start_date` | `string` | Start Date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| Exchanges | mic | DefaultPaginator | ✅ |  ❌  |
| Tickers | symbol | DefaultPaginator | ✅ |  ❌  |
| Historical Data |  | DefaultPaginator | ✅ |  ✅  |
| Splits |  | DefaultPaginator | ✅ |  ❌  |
| Dividends |  | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list when using Airbyte Cloud.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date              | Pull Request | Subject        |
|---------|-------------------|--------------|----------------|
| 0.0.74 | 2026-11-10 | [91627](https://github.com/airbytehq/airbyte/pull/91627) | Update dependencies |
| 0.0.73 | 2026-11-03 | [90653](https://github.com/airbytehq/airbyte/pull/90653) | Update dependencies |
| 0.0.72 | 2026-10-27 | [89976](https://github.com/airbytehq/airbyte/pull/89976) | Update dependencies |
| 0.0.71 | 2026-10-20 | [89288](https://github.com/airbytehq/airbyte/pull/89288) | Update dependencies |
| 0.0.70 | 2026-10-13 | [88684](https://github.com/airbytehq/airbyte/pull/88684) | Update dependencies |
| 0.0.69 | 2026-10-07 | [88194](https://github.com/airbytehq/airbyte/pull/88194) | Migrate from the deprecated Marketstack API v1 to v2 (`https://api.marketstack.com/v2/`) |
| 0.0.68 | 2026-10-06 | [87920](https://github.com/airbytehq/airbyte/pull/87920) | Update dependencies |
| 0.0.67 | 2026-09-29 | [87269](https://github.com/airbytehq/airbyte/pull/87269) | Update dependencies |
| 0.0.66 | 2026-09-22 | [86724](https://github.com/airbytehq/airbyte/pull/86724) | Update dependencies |
| 0.0.65 | 2026-09-15 | [86134](https://github.com/airbytehq/airbyte/pull/86134) | Update dependencies |
| 0.0.64 | 2026-09-08 | [85561](https://github.com/airbytehq/airbyte/pull/85561) | Update dependencies |
| 0.0.63 | 2026-08-18 | [84664](https://github.com/airbytehq/airbyte/pull/84664) | Update dependencies |
| 0.0.62 | 2026-08-11 | [84005](https://github.com/airbytehq/airbyte/pull/84005) | Update dependencies |
| 0.0.61 | 2026-08-04 | [83534](https://github.com/airbytehq/airbyte/pull/83534) | Update dependencies |
| 0.0.60 | 2026-07-28 | [82999](https://github.com/airbytehq/airbyte/pull/82999) | Update dependencies |
| 0.0.59 | 2026-07-21 | [82490](https://github.com/airbytehq/airbyte/pull/82490) | Update dependencies |
| 0.0.58 | 2026-07-14 | [81902](https://github.com/airbytehq/airbyte/pull/81902) | Update dependencies |
| 0.0.57 | 2026-06-30 | [81156](https://github.com/airbytehq/airbyte/pull/81156) | Update dependencies |
| 0.0.56 | 2026-06-23 | [80538](https://github.com/airbytehq/airbyte/pull/80538) | Update dependencies |
| 0.0.55 | 2026-06-16 | [79926](https://github.com/airbytehq/airbyte/pull/79926) | Update dependencies |
| 0.0.54 | 2026-06-09 | [79401](https://github.com/airbytehq/airbyte/pull/79401) | Update dependencies |
| 0.0.53 | 2026-06-02 | [78818](https://github.com/airbytehq/airbyte/pull/78818) | Update dependencies |
| 0.0.52 | 2026-04-28 | [77389](https://github.com/airbytehq/airbyte/pull/77389) | Update dependencies |
| 0.0.51 | 2026-04-21 | [76689](https://github.com/airbytehq/airbyte/pull/76689) | Update dependencies |
| 0.0.50 | 2026-03-31 | [75829](https://github.com/airbytehq/airbyte/pull/75829) | Update dependencies |
| 0.0.49 | 2026-03-24 | [73831](https://github.com/airbytehq/airbyte/pull/73831) | Update dependencies |
| 0.0.48 | 2026-02-17 | [73396](https://github.com/airbytehq/airbyte/pull/73396) | Update dependencies |
| 0.0.47 | 2026-02-10 | [73205](https://github.com/airbytehq/airbyte/pull/73205) | Update dependencies |
| 0.0.46 | 2026-02-03 | [72695](https://github.com/airbytehq/airbyte/pull/72695) | Update dependencies |
| 0.0.45 | 2026-01-20 | [72029](https://github.com/airbytehq/airbyte/pull/72029) | Update dependencies |
| 0.0.44 | 2026-01-14 | [71528](https://github.com/airbytehq/airbyte/pull/71528) | Update dependencies |
| 0.0.43 | 2025-12-18 | [70744](https://github.com/airbytehq/airbyte/pull/70744) | Update dependencies |
| 0.0.42 | 2025-11-25 | [70097](https://github.com/airbytehq/airbyte/pull/70097) | Update dependencies |
| 0.0.41 | 2025-11-18 | [69590](https://github.com/airbytehq/airbyte/pull/69590) | Update dependencies |
| 0.0.40 | 2025-10-29 | [69062](https://github.com/airbytehq/airbyte/pull/69062) | Update dependencies |
| 0.0.39 | 2025-10-21 | [68415](https://github.com/airbytehq/airbyte/pull/68415) | Update dependencies |
| 0.0.38 | 2025-10-14 | [67850](https://github.com/airbytehq/airbyte/pull/67850) | Update dependencies |
| 0.0.37 | 2025-10-07 | [67384](https://github.com/airbytehq/airbyte/pull/67384) | Update dependencies |
| 0.0.36 | 2025-09-30 | [66349](https://github.com/airbytehq/airbyte/pull/66349) | Update dependencies |
| 0.0.35 | 2025-09-10 | [65771](https://github.com/airbytehq/airbyte/pull/65771) | Update dependencies |
| 0.0.34 | 2025-09-05 | [65966](https://github.com/airbytehq/airbyte/pull/65966) | Update to CDK v7.0.0 |
| 0.0.33 | 2025-08-23 | [65185](https://github.com/airbytehq/airbyte/pull/65185) | Update dependencies |
| 0.0.32 | 2025-08-09 | [64745](https://github.com/airbytehq/airbyte/pull/64745) | Update dependencies |
| 0.0.31 | 2025-08-02 | [64178](https://github.com/airbytehq/airbyte/pull/64178) | Update dependencies |
| 0.0.30 | 2025-07-26 | [63909](https://github.com/airbytehq/airbyte/pull/63909) | Update dependencies |
| 0.0.29 | 2025-07-19 | [63390](https://github.com/airbytehq/airbyte/pull/63390) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63120](https://github.com/airbytehq/airbyte/pull/63120) | Update dependencies |
| 0.0.27 | 2025-07-05 | [62651](https://github.com/airbytehq/airbyte/pull/62651) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62175](https://github.com/airbytehq/airbyte/pull/62175) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61856](https://github.com/airbytehq/airbyte/pull/61856) | Update dependencies |
| 0.0.24 | 2025-06-14 | [61099](https://github.com/airbytehq/airbyte/pull/61099) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60618](https://github.com/airbytehq/airbyte/pull/60618) | Update dependencies |
| 0.0.22 | 2025-05-10 | [59897](https://github.com/airbytehq/airbyte/pull/59897) | Update dependencies |
| 0.0.21 | 2025-05-03 | [59257](https://github.com/airbytehq/airbyte/pull/59257) | Update dependencies |
| 0.0.20 | 2025-04-26 | [58825](https://github.com/airbytehq/airbyte/pull/58825) | Update dependencies |
| 0.0.19 | 2025-04-19 | [58163](https://github.com/airbytehq/airbyte/pull/58163) | Update dependencies |
| 0.0.18 | 2025-04-12 | [57715](https://github.com/airbytehq/airbyte/pull/57715) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57087](https://github.com/airbytehq/airbyte/pull/57087) | Update dependencies |
| 0.0.16 | 2025-03-29 | [56660](https://github.com/airbytehq/airbyte/pull/56660) | Update dependencies |
| 0.0.15 | 2025-03-22 | [56062](https://github.com/airbytehq/airbyte/pull/56062) | Update dependencies |
| 0.0.14 | 2025-03-08 | [55473](https://github.com/airbytehq/airbyte/pull/55473) | Update dependencies |
| 0.0.13 | 2025-03-01 | [54829](https://github.com/airbytehq/airbyte/pull/54829) | Update dependencies |
| 0.0.12 | 2025-02-22 | [54307](https://github.com/airbytehq/airbyte/pull/54307) | Update dependencies |
| 0.0.11 | 2025-02-15 | [53842](https://github.com/airbytehq/airbyte/pull/53842) | Update dependencies |
| 0.0.10 | 2025-02-08 | [53262](https://github.com/airbytehq/airbyte/pull/53262) | Update dependencies |
| 0.0.9 | 2025-02-01 | [52761](https://github.com/airbytehq/airbyte/pull/52761) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52279](https://github.com/airbytehq/airbyte/pull/52279) | Update dependencies |
| 0.0.7 | 2025-01-18 | [51781](https://github.com/airbytehq/airbyte/pull/51781) | Update dependencies |
| 0.0.6 | 2025-01-11 | [51177](https://github.com/airbytehq/airbyte/pull/51177) | Update dependencies |
| 0.0.5 | 2024-12-28 | [50620](https://github.com/airbytehq/airbyte/pull/50620) | Update dependencies |
| 0.0.4 | 2024-12-21 | [50084](https://github.com/airbytehq/airbyte/pull/50084) | Update dependencies |
| 0.0.3 | 2024-12-14 | [49626](https://github.com/airbytehq/airbyte/pull/49626) | Update dependencies |
| 0.0.2 | 2024-12-12 | [48963](https://github.com/airbytehq/airbyte/pull/48963) | Update dependencies |
| 0.0.1   | 2024-11-07 | | Initial release by [@ombhardwajj](https://github.com/ombhardwajj) via Connector Builder |

</details>
