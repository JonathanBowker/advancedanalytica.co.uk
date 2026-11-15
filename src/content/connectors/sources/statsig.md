---
generated_record: true
connector_name: Statsig
connector_type: source
connector_slug: statsig
connector_directory: source-statsig
definition_id: c8f77358-755a-4778-a1fc-c23c3cee7d83
version: 0.0.69
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/statsig
logo: /images/connectors/sources/statsig.svg
logo_source_path: airbyte-integrations/connectors/source-statsig/icon.svg
logo_sha256: 0afa50452ab3f2ce45618b2d442dda3bb52560077d9576d861821aee2ef45514
original_metadata_path: airbyte-integrations/connectors/source-statsig/metadata.yaml
original_metadata_sha256: 7432f5933ceb3fd5b8bc3c89eb259927fafdaf1c731479c7e19b3fa22f490c4b
original_document_path: docs/integrations/sources/statsig.md
original_document_sha256: 4939a8fd7f63c5539d4ee24b2900ff4e80e08b6d9ae3d129e529acdb6200313a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fd440fd1972a887258de2d222c9dfcea366dd56a3c2d5fff63f67e0d309fea7b
rewritten_at: 2026-11-12T13:57:16.015116+00:00
---

# Statsig
Statsig gives you one platform to ship, test and analyse new features. It provides advanced Experimentation and Feature Flagging tools alongside full-featured Product Analytics, Session Replay and more.

## Configure Statsig

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `start_date` | `string` | Start date.  |  |
| `end_date` | `string` | End date.  |  |

Follow the steps in [API docs](https://docs.statsig.com/http-api) to generate the API key.

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| audit_logs | id | DefaultPaginator | ✅ |  ❌  |
| autotunes | id | DefaultPaginator | ✅ |  ✅  |
| dynamic_configs | id | DefaultPaginator | ✅ |  ✅  |
| dynamic_configs_versions | id.version | DefaultPaginator | ✅ |  ✅  |
| dynamic_configs_rules | id | DefaultPaginator | ✅ |  ❌  |
| events |  | DefaultPaginator | ✅ |  ❌  |
| events_metrics | id | DefaultPaginator | ✅ |  ✅  |
| experiments | id | DefaultPaginator | ✅ |  ✅  |
| gates | id | DefaultPaginator | ✅ |  ✅  |
| gates_rules | id | DefaultPaginator | ✅ |  ❌  |
| holdouts | id | DefaultPaginator | ✅ |  ✅  |
| ingestion_status |  | No pagination | ✅ |  ✅  |
| ingestion_runs | runID | DefaultPaginator | ✅ |  ✅  |
| layers | id | DefaultPaginator | ✅ |  ✅  |
| metrics | id | DefaultPaginator | ✅ |  ❌  |
| metrics_values |  | DefaultPaginator | ✅ |  ❌  |
| segments | id | DefaultPaginator | ✅ |  ✅  |
| segments_ids |  | DefaultPaginator | ✅ |  ❌  |
| tags | id | DefaultPaginator | ✅ |  ❌  |
| target_apps | id | DefaultPaginator | ✅ |  ❌  |
| users |  | DefaultPaginator | ✅ |  ❌  |

## Allow IP addresses

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|---------|------|--------------|---------|
| 0.0.69 | 2026-11-10 | [91762](https://github.com/airbytehq/airbyte/pull/91762) | Update dependencies |
| 0.0.68 | 2026-11-03 | [90746](https://github.com/airbytehq/airbyte/pull/90746) | Update dependencies |
| 0.0.67 | 2026-10-20 | [89446](https://github.com/airbytehq/airbyte/pull/89446) | Update dependencies |
| 0.0.66 | 2026-10-13 | [88841](https://github.com/airbytehq/airbyte/pull/88841) | Update dependencies |
| 0.0.65 | 2026-10-06 | [88051](https://github.com/airbytehq/airbyte/pull/88051) | Update dependencies |
| 0.0.64 | 2026-09-29 | [87360](https://github.com/airbytehq/airbyte/pull/87360) | Update dependencies |
| 0.0.63 | 2026-09-22 | [86821](https://github.com/airbytehq/airbyte/pull/86821) | Update dependencies |
| 0.0.62 | 2026-09-15 | [86271](https://github.com/airbytehq/airbyte/pull/86271) | Update dependencies |
| 0.0.61 | 2026-09-08 | [85699](https://github.com/airbytehq/airbyte/pull/85699) | Update dependencies |
| 0.0.60 | 2026-08-18 | [84791](https://github.com/airbytehq/airbyte/pull/84791) | Update dependencies |
| 0.0.59 | 2026-08-11 | [84167](https://github.com/airbytehq/airbyte/pull/84167) | Update dependencies |
| 0.0.58 | 2026-08-04 | [83650](https://github.com/airbytehq/airbyte/pull/83650) | Update dependencies |
| 0.0.57 | 2026-07-28 | [83115](https://github.com/airbytehq/airbyte/pull/83115) | Update dependencies |
| 0.0.56 | 2026-07-21 | [82630](https://github.com/airbytehq/airbyte/pull/82630) | Update dependencies |
| 0.0.55 | 2026-07-14 | [81986](https://github.com/airbytehq/airbyte/pull/81986) | Update dependencies |
| 0.0.54 | 2026-06-30 | [81287](https://github.com/airbytehq/airbyte/pull/81287) | Update dependencies |
| 0.0.53 | 2026-06-23 | [80678](https://github.com/airbytehq/airbyte/pull/80678) | Update dependencies |
| 0.0.52 | 2026-06-16 | [80083](https://github.com/airbytehq/airbyte/pull/80083) | Update dependencies |
| 0.0.51 | 2026-06-09 | [79529](https://github.com/airbytehq/airbyte/pull/79529) | Update dependencies |
| 0.0.50 | 2026-06-02 | [79031](https://github.com/airbytehq/airbyte/pull/79031) | Update dependencies |
| 0.0.49 | 2026-04-28 | [77458](https://github.com/airbytehq/airbyte/pull/77458) | Update dependencies |
| 0.0.48 | 2026-04-21 | [76790](https://github.com/airbytehq/airbyte/pull/76790) | Update dependencies |
| 0.0.47 | 2026-03-31 | [75884](https://github.com/airbytehq/airbyte/pull/75884) | Update dependencies |
| 0.0.46 | 2026-03-17 | [74613](https://github.com/airbytehq/airbyte/pull/74613) | Update dependencies |
| 0.0.45 | 2026-02-24 | [73959](https://github.com/airbytehq/airbyte/pull/73959) | Update dependencies |
| 0.0.44 | 2026-02-17 | [73130](https://github.com/airbytehq/airbyte/pull/73130) | Update dependencies |
| 0.0.43 | 2026-02-03 | [72749](https://github.com/airbytehq/airbyte/pull/72749) | Update dependencies |
| 0.0.42 | 2026-01-20 | [72133](https://github.com/airbytehq/airbyte/pull/72133) | Update dependencies |
| 0.0.41 | 2026-01-14 | [71624](https://github.com/airbytehq/airbyte/pull/71624) | Update dependencies |
| 0.0.40 | 2025-12-18 | [70611](https://github.com/airbytehq/airbyte/pull/70611) | Update dependencies |
| 0.0.39 | 2025-11-25 | [70067](https://github.com/airbytehq/airbyte/pull/70067) | Update dependencies |
| 0.0.38 | 2025-11-18 | [69559](https://github.com/airbytehq/airbyte/pull/69559) | Update dependencies |
| 0.0.37 | 2025-10-29 | [69042](https://github.com/airbytehq/airbyte/pull/69042) | Update dependencies |
| 0.0.36 | 2025-10-21 | [68543](https://github.com/airbytehq/airbyte/pull/68543) | Update dependencies |
| 0.0.35 | 2025-10-14 | [67914](https://github.com/airbytehq/airbyte/pull/67914) | Update dependencies |
| 0.0.34 | 2025-10-07 | [67458](https://github.com/airbytehq/airbyte/pull/67458) | Update dependencies |
| 0.0.33 | 2025-09-30 | [66887](https://github.com/airbytehq/airbyte/pull/66887) | Update dependencies |
| 0.0.32 | 2025-09-23 | [66374](https://github.com/airbytehq/airbyte/pull/66374) | Update dependencies |
| 0.0.31 | 2025-09-09 | [65658](https://github.com/airbytehq/airbyte/pull/65658) | Update dependencies |
| 0.0.30 | 2025-08-24 | [65469](https://github.com/airbytehq/airbyte/pull/65469) | Update dependencies |
| 0.0.29 | 2025-08-16 | [65012](https://github.com/airbytehq/airbyte/pull/65012) | Update dependencies |
| 0.0.28 | 2025-08-02 | [64453](https://github.com/airbytehq/airbyte/pull/64453) | Update dependencies |
| 0.0.27 | 2025-07-26 | [64003](https://github.com/airbytehq/airbyte/pull/64003) | Update dependencies |
| 0.0.26 | 2025-07-12 | [63062](https://github.com/airbytehq/airbyte/pull/63062) | Update dependencies |
| 0.0.25 | 2025-06-28 | [62291](https://github.com/airbytehq/airbyte/pull/62291) | Update dependencies |
| 0.0.24 | 2025-06-14 | [61617](https://github.com/airbytehq/airbyte/pull/61617) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60201](https://github.com/airbytehq/airbyte/pull/60201) | Update dependencies |
| 0.0.22 | 2025-05-04 | [59633](https://github.com/airbytehq/airbyte/pull/59633) | Update dependencies |
| 0.0.21 | 2025-04-27 | [59035](https://github.com/airbytehq/airbyte/pull/59035) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58381](https://github.com/airbytehq/airbyte/pull/58381) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57947](https://github.com/airbytehq/airbyte/pull/57947) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57408](https://github.com/airbytehq/airbyte/pull/57408) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56878](https://github.com/airbytehq/airbyte/pull/56878) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56319](https://github.com/airbytehq/airbyte/pull/56319) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55596](https://github.com/airbytehq/airbyte/pull/55596) | Update dependencies |
| 0.0.14 | 2025-03-01 | [55104](https://github.com/airbytehq/airbyte/pull/55104) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54492](https://github.com/airbytehq/airbyte/pull/54492) | Update dependencies |
| 0.0.12 | 2025-02-15 | [54101](https://github.com/airbytehq/airbyte/pull/54101) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53586](https://github.com/airbytehq/airbyte/pull/53586) | Update dependencies |
| 0.0.10 | 2025-02-01 | [53076](https://github.com/airbytehq/airbyte/pull/53076) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52458](https://github.com/airbytehq/airbyte/pull/52458) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51986](https://github.com/airbytehq/airbyte/pull/51986) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51440](https://github.com/airbytehq/airbyte/pull/51440) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50755](https://github.com/airbytehq/airbyte/pull/50755) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50310](https://github.com/airbytehq/airbyte/pull/50310) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49776](https://github.com/airbytehq/airbyte/pull/49776) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49419](https://github.com/airbytehq/airbyte/pull/49419) | Update dependencies |
| 0.0.2 | 2024-10-28 | [47473](https://github.com/airbytehq/airbyte/pull/47473) | Update dependencies |
| 0.0.1 | 2024-09-27 | | Initial release by [@topefolorunso](https://github.com/topefolorunso) via Connector Builder |

</details>
