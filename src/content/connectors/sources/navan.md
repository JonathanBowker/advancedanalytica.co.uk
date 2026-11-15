---
generated_record: true
connector_name: Navan
connector_type: source
connector_slug: navan
connector_directory: source-navan
definition_id: 4ea87f6d-def2-4e77-8a28-7b860cd52f94
version: 0.0.65
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/navan
logo: /images/connectors/sources/navan.svg
logo_source_path: airbyte-integrations/connectors/source-navan/icon.svg
logo_sha256: dafbfeb6decda38d22cf779d589ddcb4b4175a6d748709381a15f563c0334592
original_metadata_path: airbyte-integrations/connectors/source-navan/metadata.yaml
original_metadata_sha256: c30d9426a5ebf11ac888256cae6ec3816834ad326a70f408c7418de9e40fcd84
original_document_path: docs/integrations/sources/navan.md
original_document_sha256: c6daf83f0920bfc2ed869e0320363def266eb0a33fc870dfa9319f5ccdf0ebcb
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 47968ab17f903302a0f732aeba8088257b52ab56ea5ee4763fab4c73166bfb05
rewritten_at: 2026-11-12T13:47:59.643854+00:00
---

# Navan

Use the Navan connector to access travel booking data, including hotels and flights.

## Prerequisites

* Client ID and Client Secret: credentials administrators can create for accessing the Navan API.
  * Follow [documentation provided by Navan](https://app.navan.com/app/helpcenter/articles/travel/admin/other-integrations/booking-data-integration) to create these API credentials. You can only access the credential details once.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `client_id` | `string` | OAuth Client ID.  |  |
| `client_secret` | `string` | OAuth Client Secret.  |  |
| `start_date` | `string` | Start date.  |  |

## Streams

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| bookings | uuid | DefaultPaginator | ✅ |  ✅  |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access by IP, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.65 | 2026-11-10 | [91620](https://github.com/airbytehq/airbyte/pull/91620) | Update dependencies |
| 0.0.64 | 2026-11-03 | [90657](https://github.com/airbytehq/airbyte/pull/90657) | Update dependencies |
| 0.0.63 | 2026-10-27 | [89969](https://github.com/airbytehq/airbyte/pull/89969) | Update dependencies |
| 0.0.62 | 2026-10-20 | [89309](https://github.com/airbytehq/airbyte/pull/89309) | Update dependencies |
| 0.0.61 | 2026-10-13 | [88712](https://github.com/airbytehq/airbyte/pull/88712) | Update dependencies |
| 0.0.60 | 2026-10-06 | [87931](https://github.com/airbytehq/airbyte/pull/87931) | Update dependencies |
| 0.0.59 | 2026-09-29 | [87235](https://github.com/airbytehq/airbyte/pull/87235) | Update dependencies |
| 0.0.58 | 2026-09-22 | [86697](https://github.com/airbytehq/airbyte/pull/86697) | Update dependencies |
| 0.0.57 | 2026-09-15 | [86116](https://github.com/airbytehq/airbyte/pull/86116) | Update dependencies |
| 0.0.56 | 2026-09-08 | [85546](https://github.com/airbytehq/airbyte/pull/85546) | Update dependencies |
| 0.0.55 | 2026-08-18 | [84666](https://github.com/airbytehq/airbyte/pull/84666) | Update dependencies |
| 0.0.54 | 2026-08-11 | [84039](https://github.com/airbytehq/airbyte/pull/84039) | Update dependencies |
| 0.0.53 | 2026-08-04 | [83551](https://github.com/airbytehq/airbyte/pull/83551) | Update dependencies |
| 0.0.52 | 2026-07-28 | [82996](https://github.com/airbytehq/airbyte/pull/82996) | Update dependencies |
| 0.0.51 | 2026-07-21 | [82497](https://github.com/airbytehq/airbyte/pull/82497) | Update dependencies |
| 0.0.50 | 2026-07-14 | [81906](https://github.com/airbytehq/airbyte/pull/81906) | Update dependencies |
| 0.0.49 | 2026-06-30 | [81163](https://github.com/airbytehq/airbyte/pull/81163) | Update dependencies |
| 0.0.48 | 2026-06-23 | [80556](https://github.com/airbytehq/airbyte/pull/80556) | Update dependencies |
| 0.0.47 | 2026-06-16 | [79940](https://github.com/airbytehq/airbyte/pull/79940) | Update dependencies |
| 0.0.46 | 2026-06-09 | [79415](https://github.com/airbytehq/airbyte/pull/79415) | Update dependencies |
| 0.0.45 | 2026-06-02 | [78808](https://github.com/airbytehq/airbyte/pull/78808) | Update dependencies |
| 0.0.44 | 2026-04-28 | [77329](https://github.com/airbytehq/airbyte/pull/77329) | Update dependencies |
| 0.0.43 | 2026-04-21 | [75363](https://github.com/airbytehq/airbyte/pull/75363) | Update dependencies |
| 0.0.42 | 2026-02-24 | [73579](https://github.com/airbytehq/airbyte/pull/73579) | Update dependencies |
| 0.0.41 | 2026-02-10 | [73052](https://github.com/airbytehq/airbyte/pull/73052) | Update dependencies |
| 0.0.40 | 2026-01-20 | [71978](https://github.com/airbytehq/airbyte/pull/71978) | Update dependencies |
| 0.0.39 | 2026-01-14 | [71639](https://github.com/airbytehq/airbyte/pull/71639) | Update dependencies |
| 0.0.38 | 2025-12-18 | [70539](https://github.com/airbytehq/airbyte/pull/70539) | Update dependencies |
| 0.0.37 | 2025-11-25 | [69866](https://github.com/airbytehq/airbyte/pull/69866) | Update dependencies |
| 0.0.36 | 2025-11-18 | [69397](https://github.com/airbytehq/airbyte/pull/69397) | Update dependencies |
| 0.0.35 | 2025-10-29 | [68724](https://github.com/airbytehq/airbyte/pull/68724) | Update dependencies |
| 0.0.34 | 2025-10-21 | [68377](https://github.com/airbytehq/airbyte/pull/68377) | Update dependencies |
| 0.0.33 | 2025-10-14 | [67784](https://github.com/airbytehq/airbyte/pull/67784) | Update dependencies |
| 0.0.32 | 2025-10-07 | [67426](https://github.com/airbytehq/airbyte/pull/67426) | Update dependencies |
| 0.0.31 | 2025-09-30 | [66936](https://github.com/airbytehq/airbyte/pull/66936) | Update dependencies |
| 0.0.30 | 2025-09-24 | [66619](https://github.com/airbytehq/airbyte/pull/66619) | Update dependencies |
| 0.0.29 | 2025-09-09 | [65843](https://github.com/airbytehq/airbyte/pull/65843) | Update dependencies |
| 0.0.28 | 2025-08-23 | [65184](https://github.com/airbytehq/airbyte/pull/65184) | Update dependencies |
| 0.0.27 | 2025-08-09 | [64720](https://github.com/airbytehq/airbyte/pull/64720) | Update dependencies |
| 0.0.26 | 2025-08-02 | [64272](https://github.com/airbytehq/airbyte/pull/64272) | Update dependencies |
| 0.0.25 | 2025-07-26 | [63819](https://github.com/airbytehq/airbyte/pull/63819) | Update dependencies |
| 0.0.24 | 2025-07-19 | [63419](https://github.com/airbytehq/airbyte/pull/63419) | Update dependencies |
| 0.0.23 | 2025-07-12 | [63208](https://github.com/airbytehq/airbyte/pull/63208) | Update dependencies |
| 0.0.22 | 2025-07-05 | [62545](https://github.com/airbytehq/airbyte/pull/62545) | Update dependencies |
| 0.0.21 | 2025-06-28 | [62308](https://github.com/airbytehq/airbyte/pull/62308) | Update dependencies |
| 0.0.20 | 2025-06-21 | [61069](https://github.com/airbytehq/airbyte/pull/61069) | Update dependencies |
| 0.0.19 | 2025-05-24 | [60511](https://github.com/airbytehq/airbyte/pull/60511) | Update dependencies |
| 0.0.18 | 2025-05-10 | [57894](https://github.com/airbytehq/airbyte/pull/57894) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57297](https://github.com/airbytehq/airbyte/pull/57297) | Update dependencies |
| 0.0.16 | 2025-03-29 | [56691](https://github.com/airbytehq/airbyte/pull/56691) | Update dependencies |
| 0.0.15 | 2025-03-22 | [56027](https://github.com/airbytehq/airbyte/pull/56027) | Update dependencies |
| 0.0.14 | 2025-03-08 | [55457](https://github.com/airbytehq/airbyte/pull/55457) | Update dependencies |
| 0.0.13 | 2025-03-01 | [54765](https://github.com/airbytehq/airbyte/pull/54765) | Update dependencies |
| 0.0.12 | 2025-02-22 | [54310](https://github.com/airbytehq/airbyte/pull/54310) | Update dependencies |
| 0.0.11 | 2025-02-15 | [53857](https://github.com/airbytehq/airbyte/pull/53857) | Update dependencies |
| 0.0.10 | 2025-02-08 | [53252](https://github.com/airbytehq/airbyte/pull/53252) | Update dependencies |
| 0.0.9 | 2025-02-01 | [52743](https://github.com/airbytehq/airbyte/pull/52743) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52270](https://github.com/airbytehq/airbyte/pull/52270) | Update dependencies |
| 0.0.7 | 2025-01-18 | [51799](https://github.com/airbytehq/airbyte/pull/51799) | Update dependencies |
| 0.0.6 | 2025-01-11 | [51174](https://github.com/airbytehq/airbyte/pull/51174) | Update dependencies |
| 0.0.5 | 2024-12-28 | [50642](https://github.com/airbytehq/airbyte/pull/50642) | Update dependencies |
| 0.0.4 | 2024-12-21 | [50106](https://github.com/airbytehq/airbyte/pull/50106) | Update dependencies |
| 0.0.3 | 2024-12-14 | [49599](https://github.com/airbytehq/airbyte/pull/49599) | Update dependencies |
| 0.0.2 | 2024-12-12 | [49217](https://github.com/airbytehq/airbyte/pull/49217) | Update dependencies |
| 0.0.1 | 2024-11-26 | | Initial release by [@matteogp](https://github.com/matteogp) via Connector Builder |

</details>
