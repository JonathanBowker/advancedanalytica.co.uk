---
generated_record: true
connector_name: Ticketmaster
connector_type: source
connector_slug: ticketmaster
connector_directory: source-ticketmaster
definition_id: 053eb2fe-5c44-49fc-a1e4-2dc82b09318e
version: 0.0.70
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/ticketmaster
logo: /images/connectors/sources/ticketmaster.svg
logo_source_path: airbyte-integrations/connectors/source-ticketmaster/icon.svg
logo_sha256: 349f11e80afdc445a560dd0412d0321e38096f0ab9621c30029874d8153b0059
original_metadata_path: airbyte-integrations/connectors/source-ticketmaster/metadata.yaml
original_metadata_sha256: a497d87395413513fa22a54c24203fe0a050129b3581fd2d3b738af0273002a9
original_document_path: docs/integrations/sources/ticketmaster.md
original_document_sha256: 9e71bb9b9fbd7fb7bcf1f7e023d5dd664ea5665f9615a53ee6ffc687e8642268
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: cad60eaca0ede01e10cc7fc5cf9c2e21f3fc75d26a24f7d67bf7ce760400d150
rewritten_at: 2026-11-12T13:58:23.620162+00:00
---

# Ticketmaster

You can buy and sell tickets online for nearby concerts, sports, theatre, family and other events through Ticketmaster.

[TicketMaster API Documentation](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-classifications-v2)

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |

## Limits

The Ticketmaster Discovery API only lets you page through the first 1,000 items in a result set.
`page * size` must be less than 1,000. See [Deep Paging](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/).
The `events`, `attractions` and `venues` streams therefore stop after 1,000 records.
The API rejects requests for deeper pages with error `DIS1035`.

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| events | id | DefaultPaginator | ✅ |  ❌  |
| attractions | id | DefaultPaginator | ✅ |  ❌  |
| venues | id | DefaultPaginator | ✅ |  ❌  |
| suggest | id | No pagination | ✅ |  ❌  |
| event_images | id | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.70 | 2026-11-10 | [91745](https://github.com/airbytehq/airbyte/pull/91745) | Update dependencies |
| 0.0.69 | 2026-11-03 | [90388](https://github.com/airbytehq/airbyte/pull/90388) | Simplify rate-limit error handling configuration with no change in behavior |
| 0.0.68 | 2026-11-03 | [90766](https://github.com/airbytehq/airbyte/pull/90766) | Update dependencies |
| 0.0.67 | 2026-10-20 | [89426](https://github.com/airbytehq/airbyte/pull/89426) | Update dependencies |
| 0.0.66 | 2026-10-13 | [88846](https://github.com/airbytehq/airbyte/pull/88846) | Update dependencies |
| 0.0.65 | 2026-10-07 | [88241](https://github.com/airbytehq/airbyte/pull/88241) | Stop paginating `events`, `attractions` and `venues` at the API's 1,000-item deep-paging limit (fixes `DIS1035` 400 errors) and start from page 0 instead of skipping the first page |
| 0.0.64 | 2026-10-06 | [88077](https://github.com/airbytehq/airbyte/pull/88077) | Update dependencies |
| 0.0.63 | 2026-09-29 | [87393](https://github.com/airbytehq/airbyte/pull/87393) | Update dependencies |
| 0.0.62 | 2026-09-22 | [86855](https://github.com/airbytehq/airbyte/pull/86855) | Update dependencies |
| 0.0.61 | 2026-09-15 | [86276](https://github.com/airbytehq/airbyte/pull/86276) | Update dependencies |
| 0.0.60 | 2026-09-08 | [85679](https://github.com/airbytehq/airbyte/pull/85679) | Update dependencies |
| 0.0.59 | 2026-08-18 | [84786](https://github.com/airbytehq/airbyte/pull/84786) | Update dependencies |
| 0.0.58 | 2026-08-11 | [84145](https://github.com/airbytehq/airbyte/pull/84145) | Update dependencies |
| 0.0.57 | 2026-08-04 | [83649](https://github.com/airbytehq/airbyte/pull/83649) | Update dependencies |
| 0.0.56 | 2026-07-28 | [83143](https://github.com/airbytehq/airbyte/pull/83143) | Update dependencies |
| 0.0.55 | 2026-07-21 | [82639](https://github.com/airbytehq/airbyte/pull/82639) | Update dependencies |
| 0.0.54 | 2026-07-14 | [82027](https://github.com/airbytehq/airbyte/pull/82027) | Update dependencies |
| 0.0.53 | 2026-06-30 | [81291](https://github.com/airbytehq/airbyte/pull/81291) | Update dependencies |
| 0.0.52 | 2026-06-23 | [80680](https://github.com/airbytehq/airbyte/pull/80680) | Update dependencies |
| 0.0.51 | 2026-06-16 | [80078](https://github.com/airbytehq/airbyte/pull/80078) | Update dependencies |
| 0.0.50 | 2026-06-09 | [79483](https://github.com/airbytehq/airbyte/pull/79483) | Update dependencies |
| 0.0.49 | 2026-06-02 | [79046](https://github.com/airbytehq/airbyte/pull/79046) | Update dependencies |
| 0.0.48 | 2026-04-28 | [77435](https://github.com/airbytehq/airbyte/pull/77435) | Update dependencies |
| 0.0.47 | 2026-04-21 | [75360](https://github.com/airbytehq/airbyte/pull/75360) | Update dependencies |
| 0.0.46 | 2026-03-10 | [74578](https://github.com/airbytehq/airbyte/pull/74578) | Update dependencies |
| 0.0.45 | 2026-03-03 | [73884](https://github.com/airbytehq/airbyte/pull/73884) | Update dependencies |
| 0.0.44 | 2026-02-17 | [73108](https://github.com/airbytehq/airbyte/pull/73108) | Update dependencies |
| 0.0.43 | 2026-02-03 | [72778](https://github.com/airbytehq/airbyte/pull/72778) | Update dependencies |
| 0.0.42 | 2026-01-20 | [72000](https://github.com/airbytehq/airbyte/pull/72000) | Update dependencies |
| 0.0.41 | 2026-01-14 | [71394](https://github.com/airbytehq/airbyte/pull/71394) | Update dependencies |
| 0.0.40 | 2025-12-18 | [70763](https://github.com/airbytehq/airbyte/pull/70763) | Update dependencies |
| 0.0.39 | 2025-11-25 | [69870](https://github.com/airbytehq/airbyte/pull/69870) | Update dependencies |
| 0.0.38 | 2025-11-18 | [69656](https://github.com/airbytehq/airbyte/pull/69656) | Update dependencies |
| 0.0.37 | 2025-10-29 | [69039](https://github.com/airbytehq/airbyte/pull/69039) | Update dependencies |
| 0.0.36 | 2025-10-21 | [68528](https://github.com/airbytehq/airbyte/pull/68528) | Update dependencies |
| 0.0.35 | 2025-10-14 | [67879](https://github.com/airbytehq/airbyte/pull/67879) | Update dependencies |
| 0.0.34 | 2025-10-07 | [67467](https://github.com/airbytehq/airbyte/pull/67467) | Update dependencies |
| 0.0.33 | 2025-09-30 | [66875](https://github.com/airbytehq/airbyte/pull/66875) | Update dependencies |
| 0.0.32 | 2025-09-24 | [66360](https://github.com/airbytehq/airbyte/pull/66360) | Update dependencies |
| 0.0.31 | 2025-09-09 | [65685](https://github.com/airbytehq/airbyte/pull/65685) | Update dependencies |
| 0.0.30 | 2025-08-24 | [65496](https://github.com/airbytehq/airbyte/pull/65496) | Update dependencies |
| 0.0.29 | 2025-08-16 | [65039](https://github.com/airbytehq/airbyte/pull/65039) | Update dependencies |
| 0.0.28 | 2025-08-03 | [64475](https://github.com/airbytehq/airbyte/pull/64475) | Update dependencies |
| 0.0.27 | 2025-07-19 | [63615](https://github.com/airbytehq/airbyte/pull/63615) | Update dependencies |
| 0.0.26 | 2025-07-12 | [63083](https://github.com/airbytehq/airbyte/pull/63083) | Update dependencies |
| 0.0.25 | 2025-06-28 | [62288](https://github.com/airbytehq/airbyte/pull/62288) | Update dependencies |
| 0.0.24 | 2025-06-14 | [60567](https://github.com/airbytehq/airbyte/pull/60567) | Update dependencies |
| 0.0.23 | 2025-05-10 | [60161](https://github.com/airbytehq/airbyte/pull/60161) | Update dependencies |
| 0.0.22 | 2025-05-04 | [59629](https://github.com/airbytehq/airbyte/pull/59629) | Update dependencies |
| 0.0.21 | 2025-04-27 | [58978](https://github.com/airbytehq/airbyte/pull/58978) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58379](https://github.com/airbytehq/airbyte/pull/58379) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57946](https://github.com/airbytehq/airbyte/pull/57946) | Update dependencies |
| 0.0.18 | 2025-04-05 | [56900](https://github.com/airbytehq/airbyte/pull/56900) | Update dependencies |
| 0.0.17 | 2025-03-22 | [56243](https://github.com/airbytehq/airbyte/pull/56243) | Update dependencies |
| 0.0.16 | 2025-03-08 | [55607](https://github.com/airbytehq/airbyte/pull/55607) | Update dependencies |
| 0.0.15 | 2025-03-01 | [55128](https://github.com/airbytehq/airbyte/pull/55128) | Update dependencies |
| 0.0.14 | 2025-02-22 | [54516](https://github.com/airbytehq/airbyte/pull/54516) | Update dependencies |
| 0.0.13 | 2025-02-15 | [54073](https://github.com/airbytehq/airbyte/pull/54073) | Update dependencies |
| 0.0.12 | 2025-02-08 | [53543](https://github.com/airbytehq/airbyte/pull/53543) | Update dependencies |
| 0.0.11 | 2025-02-01 | [53094](https://github.com/airbytehq/airbyte/pull/53094) | Update dependencies |
| 0.0.10 | 2025-01-25 | [52422](https://github.com/airbytehq/airbyte/pull/52422) | Update dependencies |
| 0.0.9 | 2025-01-18 | [52005](https://github.com/airbytehq/airbyte/pull/52005) | Update dependencies |
| 0.0.8 | 2025-01-11 | [51389](https://github.com/airbytehq/airbyte/pull/51389) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50795](https://github.com/airbytehq/airbyte/pull/50795) | Update dependencies |
| 0.0.6 | 2024-12-21 | [50368](https://github.com/airbytehq/airbyte/pull/50368) | Update dependencies |
| 0.0.5 | 2024-12-14 | [49773](https://github.com/airbytehq/airbyte/pull/49773) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49412](https://github.com/airbytehq/airbyte/pull/49412) | Update dependencies |
| 0.0.3 | 2024-12-11 | [49123](https://github.com/airbytehq/airbyte/pull/49123) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.2 | 2024-11-04 | [48297](https://github.com/airbytehq/airbyte/pull/48297) | Update dependencies |
| 0.0.1 | 2024-10-21 | | Initial release by [@gemsteam](https://github.com/gemsteam) via Connector Builder |

</details>
