---
generated_record: true
connector_name: TicketTailor
connector_type: source
connector_slug: tickettailor
connector_directory: source-tickettailor
definition_id: e5f3b2f5-5782-46d6-8c6a-980d82686ff6
version: 0.0.68
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/tickettailor
logo: /images/connectors/sources/tickettailor.svg
logo_source_path: airbyte-integrations/connectors/source-tickettailor/icon.svg
logo_sha256: 8c1cddd0d159734762b62afcba6ead79277fc00866ea827c821cd1644969b88e
original_metadata_path: airbyte-integrations/connectors/source-tickettailor/metadata.yaml
original_metadata_sha256: 804ce52c6c0175427321cbb878dd80d3862ebff424f99ea803f46472a7659138
original_document_path: docs/integrations/sources/tickettailor.md
original_document_sha256: 108280796da152dbe27ed3dfca8208aff5322ff9e73fa7d57af95aa561c50afd
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 66ce44de53f5deabd3253a94683328b2f0b42b08b42fb70d8328fb89a22c4ebe
rewritten_at: 2026-11-12T13:58:24.992687+00:00
---

# TicketTailor
The Airbyte connector for [TicketTailor](https://tickettailor.com) extracts key event data. This includes events, products, vouchers, discounts, check-ins, issued tickets, orders and waitlists. You can analyse ticket sales, attendance and customer interactions to gain clearer event management insights.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. API key to use. Find it at https://www.getdrip.com/user/edit |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| events_series | id | DefaultPaginator | ✅ |  ❌  |
| events | id | DefaultPaginator | ✅ |  ❌  |
| products | id | DefaultPaginator | ✅ |  ❌  |
| vouchers | id | DefaultPaginator | ✅ |  ❌  |
| discounts | id | DefaultPaginator | ✅ |  ❌  |
| check_ins | id | DefaultPaginator | ✅ |  ❌  |
| issued_tickets | id | DefaultPaginator | ✅ |  ❌  |
| orders | id | DefaultPaginator | ✅ |  ❌  |
| waitlists | id | DefaultPaginator | ✅ |  ❌  |
| vouchers_codes | id | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list when using Airbyte Cloud.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.68 | 2026-11-10 | [91760](https://github.com/airbytehq/airbyte/pull/91760) | Update dependencies |
| 0.0.67 | 2026-11-03 | [90758](https://github.com/airbytehq/airbyte/pull/90758) | Update dependencies |
| 0.0.66 | 2026-10-20 | [89455](https://github.com/airbytehq/airbyte/pull/89455) | Update dependencies |
| 0.0.65 | 2026-10-13 | [88845](https://github.com/airbytehq/airbyte/pull/88845) | Update dependencies |
| 0.0.64 | 2026-10-06 | [88043](https://github.com/airbytehq/airbyte/pull/88043) | Update dependencies |
| 0.0.63 | 2026-09-29 | [87364](https://github.com/airbytehq/airbyte/pull/87364) | Update dependencies |
| 0.0.62 | 2026-09-22 | [86820](https://github.com/airbytehq/airbyte/pull/86820) | Update dependencies |
| 0.0.61 | 2026-09-15 | [86261](https://github.com/airbytehq/airbyte/pull/86261) | Update dependencies |
| 0.0.60 | 2026-09-08 | [85705](https://github.com/airbytehq/airbyte/pull/85705) | Update dependencies |
| 0.0.59 | 2026-08-18 | [84775](https://github.com/airbytehq/airbyte/pull/84775) | Update dependencies |
| 0.0.58 | 2026-08-11 | [84131](https://github.com/airbytehq/airbyte/pull/84131) | Update dependencies |
| 0.0.57 | 2026-08-04 | [83642](https://github.com/airbytehq/airbyte/pull/83642) | Update dependencies |
| 0.0.56 | 2026-07-28 | [83124](https://github.com/airbytehq/airbyte/pull/83124) | Update dependencies |
| 0.0.55 | 2026-07-21 | [82643](https://github.com/airbytehq/airbyte/pull/82643) | Update dependencies |
| 0.0.54 | 2026-07-14 | [82056](https://github.com/airbytehq/airbyte/pull/82056) | Update dependencies |
| 0.0.53 | 2026-06-30 | [81273](https://github.com/airbytehq/airbyte/pull/81273) | Update dependencies |
| 0.0.52 | 2026-06-23 | [80689](https://github.com/airbytehq/airbyte/pull/80689) | Update dependencies |
| 0.0.51 | 2026-06-16 | [80040](https://github.com/airbytehq/airbyte/pull/80040) | Update dependencies |
| 0.0.50 | 2026-06-09 | [79543](https://github.com/airbytehq/airbyte/pull/79543) | Update dependencies |
| 0.0.49 | 2026-06-02 | [79016](https://github.com/airbytehq/airbyte/pull/79016) | Update dependencies |
| 0.0.48 | 2026-04-28 | [77472](https://github.com/airbytehq/airbyte/pull/77472) | Update dependencies |
| 0.0.47 | 2026-04-21 | [75358](https://github.com/airbytehq/airbyte/pull/75358) | Update dependencies |
| 0.0.46 | 2026-02-24 | [73841](https://github.com/airbytehq/airbyte/pull/73841) | Update dependencies |
| 0.0.45 | 2026-02-17 | [73524](https://github.com/airbytehq/airbyte/pull/73524) | Update dependencies |
| 0.0.44 | 2026-02-10 | [73103](https://github.com/airbytehq/airbyte/pull/73103) | Update dependencies |
| 0.0.43 | 2026-02-03 | [72757](https://github.com/airbytehq/airbyte/pull/72757) | Update dependencies |
| 0.0.42 | 2026-01-20 | [71988](https://github.com/airbytehq/airbyte/pull/71988) | Update dependencies |
| 0.0.41 | 2026-01-14 | [71426](https://github.com/airbytehq/airbyte/pull/71426) | Update dependencies |
| 0.0.40 | 2025-12-18 | [70742](https://github.com/airbytehq/airbyte/pull/70742) | Update dependencies |
| 0.0.39 | 2025-11-25 | [69882](https://github.com/airbytehq/airbyte/pull/69882) | Update dependencies |
| 0.0.38 | 2025-11-18 | [69695](https://github.com/airbytehq/airbyte/pull/69695) | Update dependencies |
| 0.0.37 | 2025-10-29 | [68988](https://github.com/airbytehq/airbyte/pull/68988) | Update dependencies |
| 0.0.36 | 2025-10-21 | [68563](https://github.com/airbytehq/airbyte/pull/68563) | Update dependencies |
| 0.0.35 | 2025-10-14 | [67890](https://github.com/airbytehq/airbyte/pull/67890) | Update dependencies |
| 0.0.34 | 2025-10-07 | [67504](https://github.com/airbytehq/airbyte/pull/67504) | Update dependencies |
| 0.0.33 | 2025-09-30 | [66835](https://github.com/airbytehq/airbyte/pull/66835) | Update dependencies |
| 0.0.32 | 2025-09-24 | [66361](https://github.com/airbytehq/airbyte/pull/66361) | Update dependencies |
| 0.0.31 | 2025-09-09 | [65723](https://github.com/airbytehq/airbyte/pull/65723) | Update dependencies |
| 0.0.30 | 2025-08-24 | [65482](https://github.com/airbytehq/airbyte/pull/65482) | Update dependencies |
| 0.0.29 | 2025-08-10 | [64808](https://github.com/airbytehq/airbyte/pull/64808) | Update dependencies |
| 0.0.28 | 2025-08-02 | [64429](https://github.com/airbytehq/airbyte/pull/64429) | Update dependencies |
| 0.0.27 | 2025-07-26 | [63963](https://github.com/airbytehq/airbyte/pull/63963) | Update dependencies |
| 0.0.26 | 2025-07-05 | [62673](https://github.com/airbytehq/airbyte/pull/62673) | Update dependencies |
| 0.0.25 | 2025-06-28 | [62231](https://github.com/airbytehq/airbyte/pull/62231) | Update dependencies |
| 0.0.24 | 2025-06-14 | [61615](https://github.com/airbytehq/airbyte/pull/61615) | Update dependencies |
| 0.0.23 | 2025-05-25 | [60471](https://github.com/airbytehq/airbyte/pull/60471) | Update dependencies |
| 0.0.22 | 2025-05-10 | [60139](https://github.com/airbytehq/airbyte/pull/60139) | Update dependencies |
| 0.0.21 | 2025-05-04 | [59630](https://github.com/airbytehq/airbyte/pull/59630) | Update dependencies |
| 0.0.20 | 2025-04-27 | [58984](https://github.com/airbytehq/airbyte/pull/58984) | Update dependencies |
| 0.0.19 | 2025-04-19 | [58450](https://github.com/airbytehq/airbyte/pull/58450) | Update dependencies |
| 0.0.18 | 2025-04-12 | [57962](https://github.com/airbytehq/airbyte/pull/57962) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57409](https://github.com/airbytehq/airbyte/pull/57409) | Update dependencies |
| 0.0.16 | 2025-03-29 | [56864](https://github.com/airbytehq/airbyte/pull/56864) | Update dependencies |
| 0.0.15 | 2025-03-22 | [56303](https://github.com/airbytehq/airbyte/pull/56303) | Update dependencies |
| 0.0.14 | 2025-03-08 | [55578](https://github.com/airbytehq/airbyte/pull/55578) | Update dependencies |
| 0.0.13 | 2025-03-01 | [55115](https://github.com/airbytehq/airbyte/pull/55115) | Update dependencies |
| 0.0.12 | 2025-02-22 | [54519](https://github.com/airbytehq/airbyte/pull/54519) | Update dependencies |
| 0.0.11 | 2025-02-15 | [54068](https://github.com/airbytehq/airbyte/pull/54068) | Update dependencies |
| 0.0.10 | 2025-02-08 | [53544](https://github.com/airbytehq/airbyte/pull/53544) | Update dependencies |
| 0.0.9 | 2025-02-01 | [53055](https://github.com/airbytehq/airbyte/pull/53055) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52404](https://github.com/airbytehq/airbyte/pull/52404) | Update dependencies |
| 0.0.7 | 2025-01-18 | [51952](https://github.com/airbytehq/airbyte/pull/51952) | Update dependencies |
| 0.0.6 | 2025-01-11 | [51414](https://github.com/airbytehq/airbyte/pull/51414) | Update dependencies |
| 0.0.5 | 2024-12-28 | [50750](https://github.com/airbytehq/airbyte/pull/50750) | Update dependencies |
| 0.0.4 | 2024-12-21 | [50327](https://github.com/airbytehq/airbyte/pull/50327) | Update dependencies |
| 0.0.3 | 2024-12-14 | [49784](https://github.com/airbytehq/airbyte/pull/49784) | Update dependencies |
| 0.0.2 | 2024-12-12 | [49374](https://github.com/airbytehq/airbyte/pull/49374) | Update dependencies |
| 0.0.1 | 2024-11-06 | | Initial release by [@parthiv11](https://github.com/parthiv11) via Connector Builder |

</details>
