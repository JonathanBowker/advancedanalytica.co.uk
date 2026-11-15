---
generated_record: true
connector_name: Papersign
connector_type: source
connector_slug: papersign
connector_directory: source-papersign
definition_id: afdc7cc3-a424-4118-9714-c8faca04c72c
version: 0.0.68
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/papersign
logo: /images/connectors/sources/papersign.svg
logo_source_path: airbyte-integrations/connectors/source-papersign/icon.svg
logo_sha256: 95aa45ab768c7c9dc40c52441395bd404bebfe806e58791bc29d294bd40fdd69
original_metadata_path: airbyte-integrations/connectors/source-papersign/metadata.yaml
original_metadata_sha256: e278d6c7dfb4e1ae1a42b092c57e4d83408726269e8372271e41f608e0389e80
original_document_path: docs/integrations/sources/papersign.md
original_document_sha256: 7a0e5475bcbae76420f0fa0fc1d39e1c6bdf09c533ccdc2d8a35fbe6e65fc96e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ac0e9d000c381809c2ebce1e2e9be33fcc62d6cf89d92c2025a5bf791d3e58ab
rewritten_at: 2026-11-12T13:50:23.850888+00:00
---

# Papersign
The Airbyte connector for [Papersign](https://paperform.co/products/papersign/) automatically syncs data between your Papersign documents and other platforms. It extracts, transforms and loads e-signature data, document statuses and user interactions. This streamlines workflows and keeps your e-signature data accessible across systems.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. API key to use. Generate it on your account page at https://paperform.co/account/developer. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| documents | id | DefaultPaginator | ✅ |  ❌  |
| folders | id | No pagination | ✅ |  ❌  |
| spaces | id | No pagination | ✅ |  ❌  |
| webhooks | id | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.68 | 2026-11-10 | [91636](https://github.com/airbytehq/airbyte/pull/91636) | Update dependencies |
| 0.0.67 | 2026-11-03 | [90672](https://github.com/airbytehq/airbyte/pull/90672) | Update dependencies |
| 0.0.66 | 2026-10-27 | [90028](https://github.com/airbytehq/airbyte/pull/90028) | Update dependencies |
| 0.0.65 | 2026-10-20 | [89344](https://github.com/airbytehq/airbyte/pull/89344) | Update dependencies |
| 0.0.64 | 2026-10-13 | [88734](https://github.com/airbytehq/airbyte/pull/88734) | Update dependencies |
| 0.0.63 | 2026-10-06 | [87998](https://github.com/airbytehq/airbyte/pull/87998) | Update dependencies |
| 0.0.62 | 2026-09-29 | [87279](https://github.com/airbytehq/airbyte/pull/87279) | Update dependencies |
| 0.0.61 | 2026-09-22 | [86752](https://github.com/airbytehq/airbyte/pull/86752) | Update dependencies |
| 0.0.60 | 2026-09-15 | [86171](https://github.com/airbytehq/airbyte/pull/86171) | Update dependencies |
| 0.0.59 | 2026-09-08 | [85607](https://github.com/airbytehq/airbyte/pull/85607) | Update dependencies |
| 0.0.58 | 2026-08-18 | [84701](https://github.com/airbytehq/airbyte/pull/84701) | Update dependencies |
| 0.0.57 | 2026-08-11 | [84048](https://github.com/airbytehq/airbyte/pull/84048) | Update dependencies |
| 0.0.56 | 2026-08-04 | [83575](https://github.com/airbytehq/airbyte/pull/83575) | Update dependencies |
| 0.0.55 | 2026-07-28 | [83030](https://github.com/airbytehq/airbyte/pull/83030) | Update dependencies |
| 0.0.54 | 2026-07-21 | [82544](https://github.com/airbytehq/airbyte/pull/82544) | Update dependencies |
| 0.0.53 | 2026-07-14 | [81947](https://github.com/airbytehq/airbyte/pull/81947) | Update dependencies |
| 0.0.52 | 2026-06-30 | [81172](https://github.com/airbytehq/airbyte/pull/81172) | Update dependencies |
| 0.0.51 | 2026-06-23 | [80600](https://github.com/airbytehq/airbyte/pull/80600) | Update dependencies |
| 0.0.50 | 2026-06-16 | [79970](https://github.com/airbytehq/airbyte/pull/79970) | Update dependencies |
| 0.0.49 | 2026-06-09 | [79428](https://github.com/airbytehq/airbyte/pull/79428) | Update dependencies |
| 0.0.48 | 2026-06-02 | [78875](https://github.com/airbytehq/airbyte/pull/78875) | Update dependencies |
| 0.0.47 | 2026-04-28 | [77371](https://github.com/airbytehq/airbyte/pull/77371) | Update dependencies |
| 0.0.46 | 2026-04-21 | [76686](https://github.com/airbytehq/airbyte/pull/76686) | Update dependencies |
| 0.0.45 | 2026-03-24 | [74992](https://github.com/airbytehq/airbyte/pull/74992) | Update dependencies |
| 0.0.44 | 2026-03-03 | [72589](https://github.com/airbytehq/airbyte/pull/72589) | Update dependencies |
| 0.0.43 | 2026-01-20 | [71647](https://github.com/airbytehq/airbyte/pull/71647) | Update dependencies |
| 0.0.42 | 2025-12-18 | [70473](https://github.com/airbytehq/airbyte/pull/70473) | Update dependencies |
| 0.0.41 | 2025-11-25 | [70136](https://github.com/airbytehq/airbyte/pull/70136) | Update dependencies |
| 0.0.40 | 2025-11-18 | [69708](https://github.com/airbytehq/airbyte/pull/69708) | Update dependencies |
| 0.0.39 | 2025-10-29 | [69034](https://github.com/airbytehq/airbyte/pull/69034) | Update dependencies |
| 0.0.38 | 2025-10-21 | [68312](https://github.com/airbytehq/airbyte/pull/68312) | Update dependencies |
| 0.0.37 | 2025-10-14 | [67727](https://github.com/airbytehq/airbyte/pull/67727) | Update dependencies |
| 0.0.36 | 2025-10-07 | [67351](https://github.com/airbytehq/airbyte/pull/67351) | Update dependencies |
| 0.0.35 | 2025-09-30 | [66388](https://github.com/airbytehq/airbyte/pull/66388) | Update dependencies |
| 0.0.34 | 2025-09-09 | [65795](https://github.com/airbytehq/airbyte/pull/65795) | Update dependencies |
| 0.0.33 | 2025-08-23 | [65183](https://github.com/airbytehq/airbyte/pull/65183) | Update dependencies |
| 0.0.32 | 2025-08-09 | [64771](https://github.com/airbytehq/airbyte/pull/64771) | Update dependencies |
| 0.0.31 | 2025-08-02 | [64209](https://github.com/airbytehq/airbyte/pull/64209) | Update dependencies |
| 0.0.30 | 2025-07-26 | [63854](https://github.com/airbytehq/airbyte/pull/63854) | Update dependencies |
| 0.0.29 | 2025-07-19 | [63383](https://github.com/airbytehq/airbyte/pull/63383) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63231](https://github.com/airbytehq/airbyte/pull/63231) | Update dependencies |
| 0.0.27 | 2025-07-05 | [62571](https://github.com/airbytehq/airbyte/pull/62571) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62360](https://github.com/airbytehq/airbyte/pull/62360) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61882](https://github.com/airbytehq/airbyte/pull/61882) | Update dependencies |
| 0.0.24 | 2025-06-14 | [60481](https://github.com/airbytehq/airbyte/pull/60481) | Update dependencies |
| 0.0.23 | 2025-05-10 | [60106](https://github.com/airbytehq/airbyte/pull/60106) | Update dependencies |
| 0.0.22 | 2025-05-03 | [59457](https://github.com/airbytehq/airbyte/pull/59457) | Update dependencies |
| 0.0.21 | 2025-04-27 | [59072](https://github.com/airbytehq/airbyte/pull/59072) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58488](https://github.com/airbytehq/airbyte/pull/58488) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57887](https://github.com/airbytehq/airbyte/pull/57887) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57351](https://github.com/airbytehq/airbyte/pull/57351) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56723](https://github.com/airbytehq/airbyte/pull/56723) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56207](https://github.com/airbytehq/airbyte/pull/56207) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55558](https://github.com/airbytehq/airbyte/pull/55558) | Update dependencies |
| 0.0.14 | 2025-03-01 | [55003](https://github.com/airbytehq/airbyte/pull/55003) | Update dependencies |
| 0.0.13 | 2025-02-23 | [54608](https://github.com/airbytehq/airbyte/pull/54608) | Update dependencies |
| 0.0.12 | 2025-02-15 | [53949](https://github.com/airbytehq/airbyte/pull/53949) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53463](https://github.com/airbytehq/airbyte/pull/53463) | Update dependencies |
| 0.0.10 | 2025-02-01 | [53020](https://github.com/airbytehq/airbyte/pull/53020) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52507](https://github.com/airbytehq/airbyte/pull/52507) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51881](https://github.com/airbytehq/airbyte/pull/51881) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51316](https://github.com/airbytehq/airbyte/pull/51316) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50691](https://github.com/airbytehq/airbyte/pull/50691) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50272](https://github.com/airbytehq/airbyte/pull/50272) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49696](https://github.com/airbytehq/airbyte/pull/49696) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49361](https://github.com/airbytehq/airbyte/pull/49361) | Update dependencies |
| 0.0.2 | 2024-12-11 | [49105](https://github.com/airbytehq/airbyte/pull/49105) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1 | 2024-11-08 | | Initial release by [@parthiv11](https://github.com/parthiv11) via Connector Builder |

</details>
