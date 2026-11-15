---
generated_record: true
connector_name: GoLogin
connector_type: source
connector_slug: gologin
connector_directory: source-gologin
definition_id: 02e5177c-84cf-424c-91e4-9f7ce344b813
version: 0.0.54
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/gologin
logo: /images/connectors/sources/gologin.svg
logo_source_path: airbyte-integrations/connectors/source-gologin/icon.svg
logo_sha256: 0d3c507a71fff9e18271e3708c3c5dfde94aca8ef2cb52f593b3f5b472f7b72d
original_metadata_path: airbyte-integrations/connectors/source-gologin/metadata.yaml
original_metadata_sha256: 57605789de36d9b8d9c9d129996cddcb4266ca0dab419ca8fead07fe3300c2bd
original_document_path: docs/integrations/sources/gologin.md
original_document_sha256: f3f35b160d61c40ae62e2cf4fe723f8a670ea5414a60250d3cb05061054b2cc1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 0a4608d3e7618b6d1ba7e3d75d9adaab46b85091add54cd315f15bc498f6a566
rewritten_at: 2026-11-12T13:39:27.793118+00:00
---

# GoLogin
Website: https://app.gologin.com/
Postman API Reference: https://documenter.getpostman.com/view/21126834/Uz5GnvaL#intro

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. API Key found at `https://app.gologin.com/personalArea/TokenApi` |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| profiles | id | DefaultPaginator | ✅ |  ✅  |
| browser_history | id | DefaultPaginator | ✅ |  ✅  |
| browser_cookies | uuid | DefaultPaginator | ✅ |  ✅  |
| folders | id | DefaultPaginator | ✅ |  ❌  |
| tags | _id | DefaultPaginator | ✅ |  ❌  |
| user | _id | DefaultPaginator | ✅ |  ✅  |
| user_metadata | _id | DefaultPaginator | ✅ |  ✅  |
| user_balance | uuid | DefaultPaginator | ✅ |  ❌  |
| user_timezones | uuid | DefaultPaginator | ✅ |  ❌  |

## IP allow list

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and restrict access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.54 | 2026-11-10 | [91547](https://github.com/airbytehq/airbyte/pull/91547) | Update dependencies |
| 0.0.53 | 2026-11-03 | [90576](https://github.com/airbytehq/airbyte/pull/90576) | Update dependencies |
| 0.0.52 | 2026-10-27 | [89914](https://github.com/airbytehq/airbyte/pull/89914) | Update dependencies |
| 0.0.51 | 2026-10-20 | [89235](https://github.com/airbytehq/airbyte/pull/89235) | Update dependencies |
| 0.0.50 | 2026-10-13 | [88638](https://github.com/airbytehq/airbyte/pull/88638) | Update dependencies |
| 0.0.49 | 2026-10-06 | [87872](https://github.com/airbytehq/airbyte/pull/87872) | Update dependencies |
| 0.0.48 | 2026-09-29 | [87188](https://github.com/airbytehq/airbyte/pull/87188) | Update dependencies |
| 0.0.47 | 2026-09-22 | [86642](https://github.com/airbytehq/airbyte/pull/86642) | Update dependencies |
| 0.0.46 | 2026-09-15 | [86068](https://github.com/airbytehq/airbyte/pull/86068) | Update dependencies |
| 0.0.45 | 2026-09-08 | [85505](https://github.com/airbytehq/airbyte/pull/85505) | Update dependencies |
| 0.0.44 | 2026-08-18 | [84598](https://github.com/airbytehq/airbyte/pull/84598) | Update dependencies |
| 0.0.43 | 2026-08-11 | [83954](https://github.com/airbytehq/airbyte/pull/83954) | Update dependencies |
| 0.0.42 | 2026-08-04 | [83475](https://github.com/airbytehq/airbyte/pull/83475) | Update dependencies |
| 0.0.41 | 2026-07-28 | [82936](https://github.com/airbytehq/airbyte/pull/82936) | Update dependencies |
| 0.0.40 | 2026-07-21 | [82427](https://github.com/airbytehq/airbyte/pull/82427) | Update dependencies |
| 0.0.39 | 2026-07-14 | [81801](https://github.com/airbytehq/airbyte/pull/81801) | Update dependencies |
| 0.0.38 | 2026-06-30 | [81045](https://github.com/airbytehq/airbyte/pull/81045) | Update dependencies |
| 0.0.37 | 2026-06-23 | [80452](https://github.com/airbytehq/airbyte/pull/80452) | Update dependencies |
| 0.0.36 | 2026-06-16 | [79877](https://github.com/airbytehq/airbyte/pull/79877) | Update dependencies |
| 0.0.35 | 2026-06-09 | [79334](https://github.com/airbytehq/airbyte/pull/79334) | Update dependencies |
| 0.0.34 | 2026-06-02 | [78713](https://github.com/airbytehq/airbyte/pull/78713) | Update dependencies |
| 0.0.33 | 2026-04-28 | [77242](https://github.com/airbytehq/airbyte/pull/77242) | Update dependencies |
| 0.0.32 | 2026-04-21 | [76589](https://github.com/airbytehq/airbyte/pull/76589) | Update dependencies |
| 0.0.31 | 2026-03-31 | [75674](https://github.com/airbytehq/airbyte/pull/75674) | Update dependencies |
| 0.0.30 | 2026-03-17 | [74562](https://github.com/airbytehq/airbyte/pull/74562) | Update dependencies |
| 0.0.29 | 2026-02-24 | [73767](https://github.com/airbytehq/airbyte/pull/73767) | Update dependencies |
| 0.0.28 | 2026-02-17 | [73087](https://github.com/airbytehq/airbyte/pull/73087) | Update dependencies |
| 0.0.27 | 2026-01-20 | [71930](https://github.com/airbytehq/airbyte/pull/71930) | Update dependencies |
| 0.0.26 | 2026-01-14 | [71415](https://github.com/airbytehq/airbyte/pull/71415) | Update dependencies |
| 0.0.25 | 2025-12-18 | [70670](https://github.com/airbytehq/airbyte/pull/70670) | Update dependencies |
| 0.0.24 | 2025-11-25 | [69898](https://github.com/airbytehq/airbyte/pull/69898) | Update dependencies |
| 0.0.23 | 2025-11-18 | [69401](https://github.com/airbytehq/airbyte/pull/69401) | Update dependencies |
| 0.0.22 | 2025-10-29 | [69028](https://github.com/airbytehq/airbyte/pull/69028) | Update dependencies |
| 0.0.21 | 2025-10-21 | [68301](https://github.com/airbytehq/airbyte/pull/68301) | Update dependencies |
| 0.0.20 | 2025-10-14 | [68018](https://github.com/airbytehq/airbyte/pull/68018) | Update dependencies |
| 0.0.19 | 2025-10-07 | [67253](https://github.com/airbytehq/airbyte/pull/67253) | Update dependencies |
| 0.0.18 | 2025-09-30 | [66304](https://github.com/airbytehq/airbyte/pull/66304) | Update dependencies |
| 0.0.17 | 2025-09-09 | [66097](https://github.com/airbytehq/airbyte/pull/66097) | Update dependencies |
| 0.0.16 | 2025-08-23 | [65335](https://github.com/airbytehq/airbyte/pull/65335) | Update dependencies |
| 0.0.15 | 2025-08-09 | [64622](https://github.com/airbytehq/airbyte/pull/64622) | Update dependencies |
| 0.0.14 | 2025-08-02 | [64282](https://github.com/airbytehq/airbyte/pull/64282) | Update dependencies |
| 0.0.13 | 2025-07-26 | [63823](https://github.com/airbytehq/airbyte/pull/63823) | Update dependencies |
| 0.0.12 | 2025-07-19 | [63457](https://github.com/airbytehq/airbyte/pull/63457) | Update dependencies |
| 0.0.11 | 2025-07-12 | [63153](https://github.com/airbytehq/airbyte/pull/63153) | Update dependencies |
| 0.0.10 | 2025-07-05 | [62563](https://github.com/airbytehq/airbyte/pull/62563) | Update dependencies |
| 0.0.9 | 2025-06-21 | [61784](https://github.com/airbytehq/airbyte/pull/61784) | Update dependencies |
| 0.0.8 | 2025-06-14 | [61102](https://github.com/airbytehq/airbyte/pull/61102) | Update dependencies |
| 0.0.7 | 2025-05-24 | [60727](https://github.com/airbytehq/airbyte/pull/60727) | Update dependencies |
| 0.0.6 | 2025-05-10 | [59283](https://github.com/airbytehq/airbyte/pull/59283) | Update dependencies |
| 0.0.5 | 2025-04-26 | [58826](https://github.com/airbytehq/airbyte/pull/58826) | Update dependencies |
| 0.0.4 | 2025-04-19 | [58154](https://github.com/airbytehq/airbyte/pull/58154) | Update dependencies |
| 0.0.3 | 2025-04-12 | [57674](https://github.com/airbytehq/airbyte/pull/57674) | Update dependencies |
| 0.0.2 | 2025-04-05 | [57044](https://github.com/airbytehq/airbyte/pull/57044) | Update dependencies |
| 0.0.1 | 2025-04-04 | [57010](https://github.com/airbytehq/airbyte/pull/57010) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
