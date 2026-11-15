---
generated_record: true
connector_name: Web Scrapper
connector_type: source
connector_slug: web-scrapper
connector_directory: source-web-scrapper
definition_id: 2f87b960-0220-4b76-9ab3-fba67ca4c959
version: 0.0.73
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/web-scrapper
logo: /images/connectors/sources/web-scrapper.svg
logo_source_path: airbyte-integrations/connectors/source-web-scrapper/icon.svg
logo_sha256: a12a300226b17f2415f2df2e9b3c3c9d0c802a1c04a4028102e4ee43661952da
original_metadata_path: airbyte-integrations/connectors/source-web-scrapper/metadata.yaml
original_metadata_sha256: 8e00a7b783487a91df6a1333b326c68596d8ba37d6da8e250c39fddcfcf718a0
original_document_path: docs/integrations/sources/web-scrapper.md
original_document_sha256: dd237a3f17081c567a98f9f0f7df23327e79bbe841ae42ca06e519e2d7629204
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: cd62ec27276c528edfa4fb58af0cbc864569a3c0e8d766df4beb840d5c5d8d0c
rewritten_at: 2026-11-12T14:00:14.583087+00:00
---

# Web Scrapper
Synchronise data from the Web Scrapper source to various data destinations with the [Web Scrapper](https://webscraper.io/documentation/web-scraper-cloud/api) connector. It provides information about sitemaps, users and scraping jobs.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_token` | `string` | API Token. API token to use. Find it at https://cloud.webscraper.io/api |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| sitemap_list | id | DefaultPaginator | ✅ |  ❌  |
| sitemap_detail | id | DefaultPaginator | ✅ |  ❌  |
| users |  | No pagination | ✅ |  ❌  |
| scraping_jobs | id | DefaultPaginator | ✅ |  ❌  |
| scraping_job_data_quality |  | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.73 | 2026-11-10 | [91784](https://github.com/airbytehq/airbyte/pull/91784) | Update dependencies |
| 0.0.72 | 2026-11-03 | [90806](https://github.com/airbytehq/airbyte/pull/90806) | Update dependencies |
| 0.0.71 | 2026-10-27 | [90081](https://github.com/airbytehq/airbyte/pull/90081) | Update dependencies |
| 0.0.70 | 2026-10-20 | [89416](https://github.com/airbytehq/airbyte/pull/89416) | Update dependencies |
| 0.0.69 | 2026-10-13 | [88854](https://github.com/airbytehq/airbyte/pull/88854) | Update dependencies |
| 0.0.68 | 2026-10-07 | [88247](https://github.com/airbytehq/airbyte/pull/88247) | Authenticate with the documented `Authorization: Bearer` header instead of the undocumented `api_token` query parameter |
| 0.0.67 | 2026-10-06 | [88090](https://github.com/airbytehq/airbyte/pull/88090) | Update dependencies |
| 0.0.66 | 2026-09-29 | [87416](https://github.com/airbytehq/airbyte/pull/87416) | Update dependencies |
| 0.0.65 | 2026-09-22 | [86886](https://github.com/airbytehq/airbyte/pull/86886) | Update dependencies |
| 0.0.64 | 2026-09-15 | [86298](https://github.com/airbytehq/airbyte/pull/86298) | Update dependencies |
| 0.0.63 | 2026-09-08 | [85717](https://github.com/airbytehq/airbyte/pull/85717) | Update dependencies |
| 0.0.62 | 2026-08-18 | [84819](https://github.com/airbytehq/airbyte/pull/84819) | Update dependencies |
| 0.0.61 | 2026-08-11 | [84172](https://github.com/airbytehq/airbyte/pull/84172) | Update dependencies |
| 0.0.60 | 2026-08-04 | [83678](https://github.com/airbytehq/airbyte/pull/83678) | Update dependencies |
| 0.0.59 | 2026-07-28 | [83164](https://github.com/airbytehq/airbyte/pull/83164) | Update dependencies |
| 0.0.58 | 2026-07-21 | [82623](https://github.com/airbytehq/airbyte/pull/82623) | Update dependencies |
| 0.0.57 | 2026-07-14 | [82043](https://github.com/airbytehq/airbyte/pull/82043) | Update dependencies |
| 0.0.56 | 2026-06-30 | [81276](https://github.com/airbytehq/airbyte/pull/81276) | Update dependencies |
| 0.0.55 | 2026-06-23 | [80663](https://github.com/airbytehq/airbyte/pull/80663) | Update dependencies |
| 0.0.54 | 2026-06-16 | [80069](https://github.com/airbytehq/airbyte/pull/80069) | Update dependencies |
| 0.0.53 | 2026-06-09 | [79541](https://github.com/airbytehq/airbyte/pull/79541) | Update dependencies |
| 0.0.52 | 2026-06-02 | [79047](https://github.com/airbytehq/airbyte/pull/79047) | Update dependencies |
| 0.0.51 | 2026-04-28 | [77476](https://github.com/airbytehq/airbyte/pull/77476) | Update dependencies |
| 0.0.50 | 2026-04-21 | [76787](https://github.com/airbytehq/airbyte/pull/76787) | Update dependencies |
| 0.0.49 | 2026-03-31 | [75733](https://github.com/airbytehq/airbyte/pull/75733) | Update dependencies |
| 0.0.48 | 2026-03-24 | [75060](https://github.com/airbytehq/airbyte/pull/75060) | Update dependencies |
| 0.0.47 | 2026-03-10 | [74489](https://github.com/airbytehq/airbyte/pull/74489) | Update dependencies |
| 0.0.46 | 2026-02-24 | [73445](https://github.com/airbytehq/airbyte/pull/73445) | Update dependencies |
| 0.0.45 | 2026-02-03 | [72655](https://github.com/airbytehq/airbyte/pull/72655) | Update dependencies |
| 0.0.44 | 2026-01-20 | [72095](https://github.com/airbytehq/airbyte/pull/72095) | Update dependencies |
| 0.0.43 | 2026-01-14 | [71442](https://github.com/airbytehq/airbyte/pull/71442) | Update dependencies |
| 0.0.42 | 2025-12-18 | [70731](https://github.com/airbytehq/airbyte/pull/70731) | Update dependencies |
| 0.0.41 | 2025-11-25 | [70190](https://github.com/airbytehq/airbyte/pull/70190) | Update dependencies |
| 0.0.40 | 2025-11-18 | [69700](https://github.com/airbytehq/airbyte/pull/69700) | Update dependencies |
| 0.0.39 | 2025-10-29 | [68949](https://github.com/airbytehq/airbyte/pull/68949) | Update dependencies |
| 0.0.38 | 2025-10-21 | [68387](https://github.com/airbytehq/airbyte/pull/68387) | Update dependencies |
| 0.0.37 | 2025-10-14 | [67968](https://github.com/airbytehq/airbyte/pull/67968) | Update dependencies |
| 0.0.36 | 2025-10-07 | [67331](https://github.com/airbytehq/airbyte/pull/67331) | Update dependencies |
| 0.0.35 | 2025-09-30 | [66448](https://github.com/airbytehq/airbyte/pull/66448) | Update dependencies |
| 0.0.34 | 2025-09-09 | [65727](https://github.com/airbytehq/airbyte/pull/65727) | Update dependencies |
| 0.0.33 | 2025-08-24 | [65408](https://github.com/airbytehq/airbyte/pull/65408) | Update dependencies |
| 0.0.32 | 2025-08-10 | [64855](https://github.com/airbytehq/airbyte/pull/64855) | Update dependencies |
| 0.0.31 | 2025-08-02 | [64393](https://github.com/airbytehq/airbyte/pull/64393) | Update dependencies |
| 0.0.30 | 2025-07-26 | [64050](https://github.com/airbytehq/airbyte/pull/64050) | Update dependencies |
| 0.0.29 | 2025-07-19 | [63641](https://github.com/airbytehq/airbyte/pull/63641) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63235](https://github.com/airbytehq/airbyte/pull/63235) | Update dependencies |
| 0.0.27 | 2025-07-05 | [62687](https://github.com/airbytehq/airbyte/pull/62687) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62204](https://github.com/airbytehq/airbyte/pull/62204) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61744](https://github.com/airbytehq/airbyte/pull/61744) | Update dependencies |
| 0.0.24 | 2025-06-15 | [61195](https://github.com/airbytehq/airbyte/pull/61195) | Update dependencies |
| 0.0.23 | 2025-05-24 | [59950](https://github.com/airbytehq/airbyte/pull/59950) | Update dependencies |
| 0.0.22 | 2025-05-04 | [59544](https://github.com/airbytehq/airbyte/pull/59544) | Update dependencies |
| 0.0.21 | 2025-04-26 | [58960](https://github.com/airbytehq/airbyte/pull/58960) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58538](https://github.com/airbytehq/airbyte/pull/58538) | Update dependencies |
| 0.0.19 | 2025-04-12 | [58024](https://github.com/airbytehq/airbyte/pull/58024) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57418](https://github.com/airbytehq/airbyte/pull/57418) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56827](https://github.com/airbytehq/airbyte/pull/56827) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56322](https://github.com/airbytehq/airbyte/pull/56322) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55614](https://github.com/airbytehq/airbyte/pull/55614) | Update dependencies |
| 0.0.14 | 2025-03-01 | [55086](https://github.com/airbytehq/airbyte/pull/55086) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54465](https://github.com/airbytehq/airbyte/pull/54465) | Update dependencies |
| 0.0.12 | 2025-02-15 | [54038](https://github.com/airbytehq/airbyte/pull/54038) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53556](https://github.com/airbytehq/airbyte/pull/53556) | Update dependencies |
| 0.0.10 | 2025-02-01 | [53102](https://github.com/airbytehq/airbyte/pull/53102) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52396](https://github.com/airbytehq/airbyte/pull/52396) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51429](https://github.com/airbytehq/airbyte/pull/51429) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50754](https://github.com/airbytehq/airbyte/pull/50754) | Update dependencies |
| 0.0.6 | 2024-12-21 | [50370](https://github.com/airbytehq/airbyte/pull/50370) | Update dependencies |
| 0.0.5 | 2024-12-14 | [49778](https://github.com/airbytehq/airbyte/pull/49778) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49393](https://github.com/airbytehq/airbyte/pull/49393) | Update dependencies |
| 0.0.3 | 2024-12-11 | [49115](https://github.com/airbytehq/airbyte/pull/49115) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.2 | 2024-11-04 | [48269](https://github.com/airbytehq/airbyte/pull/48269) | Update dependencies |
| 0.0.1 | 2024-10-29 | | Initial release by [@bishalbera](https://github.com/bishalbera) via Connector Builder |

</details>
