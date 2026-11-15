---
generated_record: true
connector_name: Bitly
connector_type: source
connector_slug: bitly
connector_directory: source-bitly
definition_id: 3631f862-646b-4abf-abde-dc37acf3847c
version: 0.0.63
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/bitly
logo: /images/connectors/sources/bitly.svg
logo_source_path: airbyte-integrations/connectors/source-bitly/icon.svg
logo_sha256: c1393f7458ceaaac2b0339b02c05676f720cb3c94a1ac921f5a78bf3d313497f
original_metadata_path: airbyte-integrations/connectors/source-bitly/metadata.yaml
original_metadata_sha256: b0bcaf8340b5f5a27e420ac115b45aba1499bf65761d1c6c1bfeafeaa2bc6386
original_document_path: docs/integrations/sources/bitly.md
original_document_sha256: 0b8cb8cf1801023991571ec1a49d4f9134ada560600bfe82fea15c09f08403b6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: b687e0a14702b8e2ccbb8ef39192b7e89154e30231476db889a2de153f499ed6
rewritten_at: 2026-11-12T13:31:21.608018+00:00
---

# Bitly
Bitly is the world's most widely trusted link management platform. The Bitly API gives you the full power of your links through automated link customisation, mobile deep linking and click analytics.

## Configure Bitly

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `start_date` | `string` | Start date.  |  |
| `end_date` | `string` | End date.  |  |

Generate API Key [here](https://app.bitly.com/settings/api/). Alternatively, go to Settings → Developer settings → API → Access token and click Generate token. See [here](https://dev.bitly.com/docs/getting-started/authentication/) for more details.

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| bitlinks | id | DefaultPaginator | ✅ |  ✅  |
| bitlink_clicks |  | No pagination | ✅ |  ❌  |
| bsds |  | No pagination | ✅ |  ❌  |
| campaigns | guid | No pagination | ✅ |  ✅  |
| channels | guid | No pagination | ✅ |  ✅  |
| groups | guid | No pagination | ✅ |  ✅  |
| group_preferences | group_guid | No pagination | ✅ |  ❌  |
| group_shorten_counts |  | No pagination | ✅ |  ❌  |
| organizations | guid | No pagination | ✅ |  ✅  |
| organization_shorten_counts |  | No pagination | ✅ |  ❌  |
| qr_codes | id | No pagination | ✅ |  ✅  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|---------|------|--------------|---------|
| 0.0.63 | 2026-11-10 | [91367](https://github.com/airbytehq/airbyte/pull/91367) | Update dependencies |
| 0.0.62 | 2026-11-03 | [90468](https://github.com/airbytehq/airbyte/pull/90468) | Update dependencies |
| 0.0.61 | 2026-10-27 | [89809](https://github.com/airbytehq/airbyte/pull/89809) | Update dependencies |
| 0.0.60 | 2026-10-20 | [89126](https://github.com/airbytehq/airbyte/pull/89126) | Update dependencies |
| 0.0.59 | 2026-10-13 | [88541](https://github.com/airbytehq/airbyte/pull/88541) | Update dependencies |
| 0.0.58 | 2026-10-06 | [87753](https://github.com/airbytehq/airbyte/pull/87753) | Update dependencies |
| 0.0.57 | 2026-09-29 | [87060](https://github.com/airbytehq/airbyte/pull/87060) | Update dependencies |
| 0.0.56 | 2026-09-22 | [86533](https://github.com/airbytehq/airbyte/pull/86533) | Update dependencies |
| 0.0.55 | 2026-09-15 | [85964](https://github.com/airbytehq/airbyte/pull/85964) | Update dependencies |
| 0.0.54 | 2026-09-08 | [85395](https://github.com/airbytehq/airbyte/pull/85395) | Update dependencies |
| 0.0.53 | 2026-08-18 | [84467](https://github.com/airbytehq/airbyte/pull/84467) | Update dependencies |
| 0.0.52 | 2026-08-11 | [83839](https://github.com/airbytehq/airbyte/pull/83839) | Update dependencies |
| 0.0.51 | 2026-08-04 | [83366](https://github.com/airbytehq/airbyte/pull/83366) | Update dependencies |
| 0.0.50 | 2026-07-28 | [82840](https://github.com/airbytehq/airbyte/pull/82840) | Update dependencies |
| 0.0.49 | 2026-07-21 | [82316](https://github.com/airbytehq/airbyte/pull/82316) | Update dependencies |
| 0.0.48 | 2026-07-14 | [81747](https://github.com/airbytehq/airbyte/pull/81747) | Update dependencies |
| 0.0.47 | 2026-06-30 | [80976](https://github.com/airbytehq/airbyte/pull/80976) | Update dependencies |
| 0.0.46 | 2026-06-23 | [80360](https://github.com/airbytehq/airbyte/pull/80360) | Update dependencies |
| 0.0.45 | 2026-06-16 | [79783](https://github.com/airbytehq/airbyte/pull/79783) | Update dependencies |
| 0.0.44 | 2026-06-09 | [79213](https://github.com/airbytehq/airbyte/pull/79213) | Update dependencies |
| 0.0.43 | 2026-06-02 | [78588](https://github.com/airbytehq/airbyte/pull/78588) | Update dependencies |
| 0.0.42 | 2026-04-28 | [77157](https://github.com/airbytehq/airbyte/pull/77157) | Update dependencies |
| 0.0.41 | 2026-04-21 | [76544](https://github.com/airbytehq/airbyte/pull/76544) | Update dependencies |
| 0.0.40 | 2026-03-31 | [75893](https://github.com/airbytehq/airbyte/pull/75893) | Update dependencies |
| 0.0.39 | 2026-03-24 | [75013](https://github.com/airbytehq/airbyte/pull/75013) | Update dependencies |
| 0.0.38 | 2026-03-10 | [74608](https://github.com/airbytehq/airbyte/pull/74608) | Update dependencies |
| 0.0.37 | 2026-03-03 | [74198](https://github.com/airbytehq/airbyte/pull/74198) | Update dependencies |
| 0.0.36 | 2026-02-03 | [71485](https://github.com/airbytehq/airbyte/pull/71485) | Update dependencies |
| 0.0.35 | 2025-12-18 | [70639](https://github.com/airbytehq/airbyte/pull/70639) | Update dependencies |
| 0.0.34 | 2025-11-25 | [69946](https://github.com/airbytehq/airbyte/pull/69946) | Update dependencies |
| 0.0.33 | 2025-11-18 | [69439](https://github.com/airbytehq/airbyte/pull/69439) | Update dependencies |
| 0.0.32 | 2025-10-29 | [68754](https://github.com/airbytehq/airbyte/pull/68754) | Update dependencies |
| 0.0.31 | 2025-10-21 | [68241](https://github.com/airbytehq/airbyte/pull/68241) | Update dependencies |
| 0.0.30 | 2025-10-14 | [67835](https://github.com/airbytehq/airbyte/pull/67835) | Update dependencies |
| 0.0.29 | 2025-10-07 | [67206](https://github.com/airbytehq/airbyte/pull/67206) | Update dependencies |
| 0.0.28 | 2025-09-30 | [65637](https://github.com/airbytehq/airbyte/pull/65637) | Update dependencies |
| 0.0.27 | 2025-08-09 | [64648](https://github.com/airbytehq/airbyte/pull/64648) | Update dependencies |
| 0.0.26 | 2025-08-02 | [64438](https://github.com/airbytehq/airbyte/pull/64438) | Update dependencies |
| 0.0.25 | 2025-07-26 | [63785](https://github.com/airbytehq/airbyte/pull/63785) | Update dependencies |
| 0.0.24 | 2025-07-12 | [61100](https://github.com/airbytehq/airbyte/pull/61100) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60705](https://github.com/airbytehq/airbyte/pull/60705) | Update dependencies |
| 0.0.22 | 2025-05-10 | [59327](https://github.com/airbytehq/airbyte/pull/59327) | Update dependencies |
| 0.0.21 | 2025-04-26 | [58693](https://github.com/airbytehq/airbyte/pull/58693) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58257](https://github.com/airbytehq/airbyte/pull/58257) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57151](https://github.com/airbytehq/airbyte/pull/57151) | Update dependencies |
| 0.0.18 | 2025-03-29 | [56604](https://github.com/airbytehq/airbyte/pull/56604) | Update dependencies |
| 0.0.17 | 2025-03-22 | [56135](https://github.com/airbytehq/airbyte/pull/56135) | Update dependencies |
| 0.0.16 | 2025-03-08 | [55368](https://github.com/airbytehq/airbyte/pull/55368) | Update dependencies |
| 0.0.15 | 2025-03-01 | [54902](https://github.com/airbytehq/airbyte/pull/54902) | Update dependencies |
| 0.0.14 | 2025-02-22 | [54258](https://github.com/airbytehq/airbyte/pull/54258) | Update dependencies |
| 0.0.13 | 2025-02-15 | [53907](https://github.com/airbytehq/airbyte/pull/53907) | Update dependencies |
| 0.0.12 | 2025-02-08 | [53408](https://github.com/airbytehq/airbyte/pull/53408) | Update dependencies |
| 0.0.11 | 2025-02-01 | [52903](https://github.com/airbytehq/airbyte/pull/52903) | Update dependencies |
| 0.0.10 | 2025-01-25 | [52155](https://github.com/airbytehq/airbyte/pull/52155) | Update dependencies |
| 0.0.9 | 2025-01-18 | [51730](https://github.com/airbytehq/airbyte/pull/51730) | Update dependencies |
| 0.0.8 | 2025-01-11 | [51273](https://github.com/airbytehq/airbyte/pull/51273) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50447](https://github.com/airbytehq/airbyte/pull/50447) | Update dependencies |
| 0.0.6 | 2024-12-21 | [50164](https://github.com/airbytehq/airbyte/pull/50164) | Update dependencies |
| 0.0.5 | 2024-12-14 | [49571](https://github.com/airbytehq/airbyte/pull/49571) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49005](https://github.com/airbytehq/airbyte/pull/49005) | Update dependencies |
| 0.0.3 | 2024-11-04 | [48171](https://github.com/airbytehq/airbyte/pull/48171) | Update dependencies |
| 0.0.2 | 2024-10-28 | [47516](https://github.com/airbytehq/airbyte/pull/47516) | Update dependencies |
| 0.0.1 | 2024-09-01 | | Initial release by [@topefolorunso](https://github.com/topefolorunso) via Connector Builder |

</details>
