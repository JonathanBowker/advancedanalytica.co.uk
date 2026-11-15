---
generated_record: true
connector_name: OPUSWatch
connector_type: source
connector_slug: opuswatch
connector_directory: source-opuswatch
definition_id: f916944f-cf43-421f-9058-dbfeb7baba2f
version: 0.0.52
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/opuswatch
logo: /images/connectors/sources/opuswatch.svg
logo_source_path: airbyte-integrations/connectors/source-opuswatch/icon.svg
logo_sha256: 327bfb95c6fc34f109185fa6e43b4cf040a1df91083807459ba321ed0a26c7f3
original_metadata_path: airbyte-integrations/connectors/source-opuswatch/metadata.yaml
original_metadata_sha256: 541a18b9ff2ea4b292d360174ee4b457f363b0ae4f08d7acbf5c4b1db06e5a4a
original_document_path: docs/integrations/sources/opuswatch.md
original_document_sha256: 8f59846345c04eb7a3cc28c8cd2679d3d3053e0cc1e8230fbe8b9401e55cb194
rewrite_status: review
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7ecb0cc380d75a1a1c6c4596bd6b61cd1d520db87a2c70e9f52da4dacc94e0cb
rewritten_at: 2026-11-12T13:49:58.207402+00:00
---

# OPUSWatch
## Get horticultural insights with Airbyte and OPUSWatch

**What is OPUSWatch?**
OPUSWatch is a smart wearable developed by OPUS Solutions B.V. in the Netherlands. Designed for horticulture, this smartwatch digitises and streamlines operational processes across greenhouses and nurseries. It gives growers real-time insights into labour, productivity and overall operations. Employees can record tasks, track work on specific crops and manage orders from their wrist. The watch sends this data to a central system for analysis and decision-making.

Website: opuswatch.nl

**What does the OPUSWatch Airbyte Connector do?**
The Airbyte connector for OPUSWatch extracts valuable data from the OPUSWatch platform. You can load this data into your data warehouse or lake. Connecting OPUSWatch to Airbyte centralises your horticultural operational data alongside other business-critical information. This supports comprehensive analysis and reporting.

**With the OPUSWatch Airbyte connector, you can retrieve the following streams of data:**
* **Clients:** Information about your clients or customers.
* **Locations:** Details about locations or areas within your greenhouse or nursery.
* **Rows:** Data about specific rows or sections where you cultivate plants.
* **Users:** Information about people with access to the OPUSWatch system.
* **Workers:** Details about your workforce, including identification and potentially other relevant attributes.
* **Worker Groups:** Information about how you organise workers into teams or groups.
* **Tasks:** Data about the activities or jobs your workers perform.
* **Task Groups:** Information about how you categorise or group tasks.
* **Labels:** Details about labels used for plants, products or processes.
* **Varieties:** Information about the plant varieties you cultivate.
* **Registrations Initial:** A snapshot of initial work registrations recorded by OPUSWatch devices.
* **Registrations Incremental:** Updated and new work registrations recorded by OPUSWatch devices since the last synchronisation.
* **Sessions Initial:** A snapshot of initial work sessions or periods tracked by OPUSWatch devices.
* **Sessions Incremental:** Updated and new work sessions or periods tracked by OPUSWatch devices since the last synchronisation.

The OPUSWatch Airbyte connector helps horticultural businesses break down data silos and see their operations as a whole. This supports data-led decisions about labour allocation, productivity and operational efficiency across greenhouses and nurseries.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `start_date` | `string` | Start Date.  | 20250101 |

## Streams

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
| --- | --- | --- | --- | --- |
| client | | No pagination | ✅ | ❌ |
| locations | | No pagination | ✅ | ❌ |
| rows | | No pagination | ✅ | ❌ |
| users | | No pagination | ✅ | ❌ |
| workers | | No pagination | ✅ | ❌ |
| worker groups | | No pagination | ✅ | ❌ |
| tasks | | No pagination | ✅ | ❌ |
| task groups | | No pagination | ✅ | ❌ |
| labels | | No pagination | ✅ | ❌ |
| varieties | | No pagination | ✅ | ❌ |
| registrations initial | | DefaultPaginator | ✅ | ❌ |
| registrations incremental | | DefaultPaginator | ✅ | ❌ |
| sessions initial | | DefaultPaginator | ✅ | ❌ |
| sessions incremental | | DefaultPaginator | ✅ | ❌ |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| --- | --- | --- | --- |
| 0.0.52 | 2026-11-10 | [91661](https://github.com/airbytehq/airbyte/pull/91661) | Update dependencies |
| 0.0.51 | 2026-11-03 | [90695](https://github.com/airbytehq/airbyte/pull/90695) | Update dependencies |
| 0.0.50 | 2026-10-27 | [89996](https://github.com/airbytehq/airbyte/pull/89996) | Update dependencies |
| 0.0.49 | 2026-10-20 | [89335](https://github.com/airbytehq/airbyte/pull/89335) | Update dependencies |
| 0.0.48 | 2026-10-13 | [88743](https://github.com/airbytehq/airbyte/pull/88743) | Update dependencies |
| 0.0.47 | 2026-10-07 | [88308](https://github.com/airbytehq/airbyte/pull/88308) | Paginate recent registrations and sessions to avoid truncating results after the first page. |
| 0.0.46 | 2026-10-06 | [87977](https://github.com/airbytehq/airbyte/pull/87977) | Update dependencies |
| 0.0.45 | 2026-09-29 | [87274](https://github.com/airbytehq/airbyte/pull/87274) | Update dependencies |
| 0.0.44 | 2026-09-22 | [86763](https://github.com/airbytehq/airbyte/pull/86763) | Update dependencies |
| 0.0.43 | 2026-09-15 | [86161](https://github.com/airbytehq/airbyte/pull/86161) | Update dependencies |
| 0.0.42 | 2026-09-08 | [85599](https://github.com/airbytehq/airbyte/pull/85599) | Update dependencies |
| 0.0.41 | 2026-08-18 | [84691](https://github.com/airbytehq/airbyte/pull/84691) | Update dependencies |
| 0.0.40 | 2026-08-11 | [84041](https://github.com/airbytehq/airbyte/pull/84041) | Update dependencies |
| 0.0.39 | 2026-08-04 | [83574](https://github.com/airbytehq/airbyte/pull/83574) | Update dependencies |
| 0.0.38 | 2026-07-28 | [83049](https://github.com/airbytehq/airbyte/pull/83049) | Update dependencies |
| 0.0.37 | 2026-07-21 | [82522](https://github.com/airbytehq/airbyte/pull/82522) | Update dependencies |
| 0.0.36 | 2026-07-14 | [81960](https://github.com/airbytehq/airbyte/pull/81960) | Update dependencies |
| 0.0.35 | 2026-06-30 | [81186](https://github.com/airbytehq/airbyte/pull/81186) | Update dependencies |
| 0.0.34 | 2026-06-23 | [80576](https://github.com/airbytehq/airbyte/pull/80576) | Update dependencies |
| 0.0.33 | 2026-06-16 | [79991](https://github.com/airbytehq/airbyte/pull/79991) | Update dependencies |
| 0.0.32 | 2026-06-09 | [79444](https://github.com/airbytehq/airbyte/pull/79444) | Update dependencies |
| 0.0.31 | 2026-06-02 | [78863](https://github.com/airbytehq/airbyte/pull/78863) | Update dependencies |
| 0.0.30 | 2026-04-28 | [77361](https://github.com/airbytehq/airbyte/pull/77361) | Update dependencies |
| 0.0.29 | 2026-04-21 | [76729](https://github.com/airbytehq/airbyte/pull/76729) | Update dependencies |
| 0.0.28 | 2026-03-17 | [74987](https://github.com/airbytehq/airbyte/pull/74987) | Update dependencies |
| 0.0.27 | 2026-03-10 | [74626](https://github.com/airbytehq/airbyte/pull/74626) | Update dependencies |
| 0.0.26 | 2026-02-24 | [73575](https://github.com/airbytehq/airbyte/pull/73575) | Update dependencies |
| 0.0.25 | 2026-02-10 | [73070](https://github.com/airbytehq/airbyte/pull/73070) | Update dependencies |
| 0.0.24 | 2026-02-03 | [72584](https://github.com/airbytehq/airbyte/pull/72584) | Update dependencies |
| 0.0.23 | 2026-01-20 | [72183](https://github.com/airbytehq/airbyte/pull/72183) | Update dependencies |
| 0.0.22 | 2026-01-14 | [71690](https://github.com/airbytehq/airbyte/pull/71690) | Update dependencies |
| 0.0.21 | 2025-12-18 | [70518](https://github.com/airbytehq/airbyte/pull/70518) | Update dependencies |
| 0.0.20 | 2025-11-25 | [70113](https://github.com/airbytehq/airbyte/pull/70113) | Update dependencies |
| 0.0.19 | 2025-11-18 | [69702](https://github.com/airbytehq/airbyte/pull/69702) | Update dependencies |
| 0.0.18 | 2025-10-29 | [69035](https://github.com/airbytehq/airbyte/pull/69035) | Update dependencies |
| 0.0.17 | 2025-10-21 | [68323](https://github.com/airbytehq/airbyte/pull/68323) | Update dependencies |
| 0.0.16 | 2025-10-14 | [67804](https://github.com/airbytehq/airbyte/pull/67804) | Update dependencies |
| 0.0.15 | 2025-10-07 | [67347](https://github.com/airbytehq/airbyte/pull/67347) | Update dependencies |
| 0.0.14 | 2025-09-30 | [66379](https://github.com/airbytehq/airbyte/pull/66379) | Update dependencies |
| 0.0.13 | 2025-09-09 | [65891](https://github.com/airbytehq/airbyte/pull/65891) | Update dependencies |
| 0.0.12 | 2025-08-23 | [65199](https://github.com/airbytehq/airbyte/pull/65199) | Update dependencies |
| 0.0.11 | 2025-08-09 | [64781](https://github.com/airbytehq/airbyte/pull/64781) | Update dependencies |
| 0.0.10 | 2025-08-02 | [64205](https://github.com/airbytehq/airbyte/pull/64205) | Update dependencies |
| 0.0.9 | 2025-07-26 | [63856](https://github.com/airbytehq/airbyte/pull/63856) | Update dependencies |
| 0.0.8 | 2025-07-19 | [63393](https://github.com/airbytehq/airbyte/pull/63393) | Update dependencies |
| 0.0.7 | 2025-07-12 | [63184](https://github.com/airbytehq/airbyte/pull/63184) | Update dependencies |
| 0.0.6 | 2025-07-05 | [62574](https://github.com/airbytehq/airbyte/pull/62574) | Update dependencies |
| 0.0.5 | 2025-06-28 | [62391](https://github.com/airbytehq/airbyte/pull/62391) | Update dependencies |
| 0.0.4 | 2025-06-21 | [60559](https://github.com/airbytehq/airbyte/pull/60559) | Update dependencies |
| 0.0.3 | 2025-05-10 | [60190](https://github.com/airbytehq/airbyte/pull/60190) | Update dependencies |
| 0.0.2 | 2025-05-04 | [59519](https://github.com/airbytehq/airbyte/pull/59519) | Update dependencies |
| 0.0.1 | 2025-04-22 | | Initial release by [@SebasZwinkels](https://github.com/SebasZwinkels) via Connector Builder |

</details>
