---
generated_record: true
connector_name: Pipeliner
connector_type: source
connector_slug: pipeliner
connector_directory: source-pipeliner
definition_id: 39fd5da7-5713-446b-a9c6-c695f0352f20
version: 0.0.69
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pipeliner
logo: /images/connectors/sources/pipeliner.svg
logo_source_path: airbyte-integrations/connectors/source-pipeliner/icon.svg
logo_sha256: 3a4f9c3e0a51364a31ab88fc160d9e02168d311c1d0f2bf49d8e99a86b73b965
original_metadata_path: airbyte-integrations/connectors/source-pipeliner/metadata.yaml
original_metadata_sha256: 0d0588d3cb94b26bfdfdd809a5710a9837361531f264b948afa480aa95cb8ba5
original_document_path: docs/integrations/sources/pipeliner.md
original_document_sha256: 15116e5c7b0ecb998246cd75bace5bf1c80494cbd0a3c7f8f2c639509491ee73
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fe6a91e3a871187ad0cba457c96ca4404f83a6e90cbeeb60e067d71a8ceceb73
rewritten_at: 2026-11-12T13:51:01.632712+00:00
---

# Pipeliner

Pipeliner is a CRM tool.
This connector fetches data from streams including contacts, data, leads and quotes.
[API Docs](https://developers.pipelinersales.com/api-docs)

## Configure Pipeliner

Create an API application in your Pipeliner space's administration under **Unit, Users & Roles > Applications**. Then select **Show API Access**. Use the generated API username and password, not your account login credentials. See [authentication guide](https://developers.pipelinersales.com/api-docs/overview/authentication) for details.

Select the data centre from your application's Service URL. Then enter its Space ID. For example, for `https://us-east.api.pipelinersales.com/api/v100/rest/spaces/example_space`, select `us-east` and enter `example_space` as the Space ID.

| Input      | Type     | Description                                                            | Default Value |
| ---------- | -------- | ---------------------------------------------------------------------- | ------------- |
| `username` | `string` | API username generated for your space's application.                   |               |
| `password` | `string` | API password generated for your space's application.                   |               |
| `service`  | `string` | Data center: `eu-central`, `us-east`, `ca-central`, or `ap-southeast`. |               |
| `spaceid`  | `string` | Space ID from the application's API access settings, not a full URL.   |               |

## Streams

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| accounts | id | DefaultPaginator | ✅ |  ❌  |
| activities | id | DefaultPaginator | ✅ |  ❌  |
| clients | id | DefaultPaginator | ✅ |  ❌  |
| contacts | id | DefaultPaginator | ✅ |  ❌  |
| entities | id | DefaultPaginator | ✅ |  ❌  |
| data | id | DefaultPaginator | ✅ |  ❌  |
| cloud_objects | id | DefaultPaginator | ✅ |  ❌  |
| fields | id | DefaultPaginator | ✅ |  ❌  |
| forecasts | id | DefaultPaginator | ✅ |  ❌  |
| form_views | id | DefaultPaginator | ✅ |  ❌  |
| entity_scorings | id | DefaultPaginator | ✅ |  ❌  |
| leads | id | DefaultPaginator | ✅ |  ❌  |
| lead_oppties | id | DefaultPaginator | ✅ |  ❌  |
| memos | id | DefaultPaginator | ✅ |  ❌  |
| notes | id | DefaultPaginator | ✅ |  ❌  |
| entity_fitnesses | id | DefaultPaginator | ✅ |  ❌  |
| pipelines | id | DefaultPaginator | ✅ |  ❌  |
| products | id | DefaultPaginator | ✅ |  ❌  |
| oppty_product_relations | id | DefaultPaginator | ✅ |  ❌  |
| profiles | id | DefaultPaginator | ✅ |  ❌  |
| quotes | id | DefaultPaginator | ✅ |  ❌  |
| reports | id | DefaultPaginator | ✅ |  ❌  |
| steps | id | DefaultPaginator | ✅ |  ❌  |
| tags | id | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| ------------------ | ------------------- | -------------- | ---------------- |
| 0.0.69 | 2026-11-10 | [91675](https://github.com/airbytehq/airbyte/pull/91675) | Update dependencies |
| 0.0.68 | 2026-11-03 | [90666](https://github.com/airbytehq/airbyte/pull/90666) | Update dependencies |
| 0.0.67 | 2026-10-27 | [90012](https://github.com/airbytehq/airbyte/pull/90012) | Update dependencies |
| 0.0.66 | 2026-10-20 | [89345](https://github.com/airbytehq/airbyte/pull/89345) | Update dependencies |
| 0.0.65 | 2026-10-13 | [88741](https://github.com/airbytehq/airbyte/pull/88741) | Update dependencies |
| 0.0.64 | 2026-10-07 | [88284](https://github.com/airbytehq/airbyte/pull/88284) | Fix API hostname allowlist and update API setup documentation |
| 0.0.63 | 2026-10-06 | [87982](https://github.com/airbytehq/airbyte/pull/87982) | Update dependencies |
| 0.0.62 | 2026-09-29 | [87283](https://github.com/airbytehq/airbyte/pull/87283) | Update dependencies |
| 0.0.61 | 2026-09-22 | [86751](https://github.com/airbytehq/airbyte/pull/86751) | Update dependencies |
| 0.0.60 | 2026-09-15 | [86174](https://github.com/airbytehq/airbyte/pull/86174) | Update dependencies |
| 0.0.59 | 2026-09-08 | [85609](https://github.com/airbytehq/airbyte/pull/85609) | Update dependencies |
| 0.0.58 | 2026-08-18 | [84708](https://github.com/airbytehq/airbyte/pull/84708) | Update dependencies |
| 0.0.57 | 2026-08-11 | [83569](https://github.com/airbytehq/airbyte/pull/83569) | Update dependencies |
| 0.0.56 | 2026-07-28 | [83034](https://github.com/airbytehq/airbyte/pull/83034) | Update dependencies |
| 0.0.55 | 2026-07-21 | [82537](https://github.com/airbytehq/airbyte/pull/82537) | Update dependencies |
| 0.0.54 | 2026-07-14 | [81966](https://github.com/airbytehq/airbyte/pull/81966) | Update dependencies |
| 0.0.53 | 2026-06-30 | [81208](https://github.com/airbytehq/airbyte/pull/81208) | Update dependencies |
| 0.0.52 | 2026-06-23 | [80585](https://github.com/airbytehq/airbyte/pull/80585) | Update dependencies |
| 0.0.51 | 2026-06-16 | [80000](https://github.com/airbytehq/airbyte/pull/80000) | Update dependencies |
| 0.0.50 | 2026-06-09 | [79455](https://github.com/airbytehq/airbyte/pull/79455) | Update dependencies |
| 0.0.49 | 2026-06-02 | [78917](https://github.com/airbytehq/airbyte/pull/78917) | Update dependencies |
| 0.0.48 | 2026-04-28 | [77360](https://github.com/airbytehq/airbyte/pull/77360) | Update dependencies |
| 0.0.47 | 2026-04-21 | [76726](https://github.com/airbytehq/airbyte/pull/76726) | Update dependencies |
| 0.0.46 | 2026-03-31 | [75816](https://github.com/airbytehq/airbyte/pull/75816) | Update dependencies |
| 0.0.45 | 2026-03-24 | [75404](https://github.com/airbytehq/airbyte/pull/75404) | Update dependencies |
| 0.0.44 | 2026-03-10 | [74452](https://github.com/airbytehq/airbyte/pull/74452) | Update dependencies |
| 0.0.43 | 2026-02-24 | [73854](https://github.com/airbytehq/airbyte/pull/73854) | Update dependencies |
| 0.0.42 | 2026-02-10 | [73162](https://github.com/airbytehq/airbyte/pull/73162) | Update dependencies |
| 0.0.41 | 2026-02-03 | [72647](https://github.com/airbytehq/airbyte/pull/72647) | Update dependencies |
| 0.0.40 | 2026-01-20 | [72167](https://github.com/airbytehq/airbyte/pull/72167) | Update dependencies |
| 0.0.39 | 2026-01-14 | [71546](https://github.com/airbytehq/airbyte/pull/71546) | Update dependencies |
| 0.0.38 | 2025-12-18 | [70476](https://github.com/airbytehq/airbyte/pull/70476) | Update dependencies |
| 0.0.37 | 2025-11-25 | [69954](https://github.com/airbytehq/airbyte/pull/69954) | Update dependencies |
| 0.0.36 | 2025-11-18 | [69604](https://github.com/airbytehq/airbyte/pull/69604) | Update dependencies |
| 0.0.35 | 2025-10-29 | [68923](https://github.com/airbytehq/airbyte/pull/68923) | Update dependencies |
| 0.0.34 | 2025-10-21 | [68217](https://github.com/airbytehq/airbyte/pull/68217) | Update dependencies |
| 0.0.33 | 2025-10-14 | [67828](https://github.com/airbytehq/airbyte/pull/67828) | Update dependencies |
| 0.0.32 | 2025-10-07 | [67493](https://github.com/airbytehq/airbyte/pull/67493) | Update dependencies |
| 0.0.31 | 2025-10-01 | [66964](https://github.com/airbytehq/airbyte/pull/66964) | Update dependencies |
| 0.0.30 | 2025-09-23 | [66419](https://github.com/airbytehq/airbyte/pull/66419) | Update dependencies |
| 0.0.29 | 2025-09-09 | [65848](https://github.com/airbytehq/airbyte/pull/65848) | Update dependencies |
| 0.0.28 | 2025-08-23 | [65217](https://github.com/airbytehq/airbyte/pull/65217) | Update dependencies |
| 0.0.27 | 2025-08-09 | [64684](https://github.com/airbytehq/airbyte/pull/64684) | Update dependencies |
| 0.0.26 | 2025-08-02 | [64228](https://github.com/airbytehq/airbyte/pull/64228) | Update dependencies |
| 0.0.25 | 2025-07-26 | [63929](https://github.com/airbytehq/airbyte/pull/63929) | Update dependencies |
| 0.0.24 | 2025-07-19 | [63417](https://github.com/airbytehq/airbyte/pull/63417) | Update dependencies |
| 0.0.23 | 2025-07-12 | [63269](https://github.com/airbytehq/airbyte/pull/63269) | Update dependencies |
| 0.0.22 | 2025-06-28 | [62407](https://github.com/airbytehq/airbyte/pull/62407) | Update dependencies |
| 0.0.21 | 2025-06-21 | [60160](https://github.com/airbytehq/airbyte/pull/60160) | Update dependencies |
| 0.0.20 | 2025-05-04 | [59508](https://github.com/airbytehq/airbyte/pull/59508) | Update dependencies |
| 0.0.19 | 2025-04-27 | [58529](https://github.com/airbytehq/airbyte/pull/58529) | Update dependencies |
| 0.0.18 | 2025-04-12 | [57846](https://github.com/airbytehq/airbyte/pull/57846) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57327](https://github.com/airbytehq/airbyte/pull/57327) | Update dependencies |
| 0.0.16 | 2025-03-29 | [56774](https://github.com/airbytehq/airbyte/pull/56774) | Update dependencies |
| 0.0.15 | 2025-03-22 | [56195](https://github.com/airbytehq/airbyte/pull/56195) | Update dependencies |
| 0.0.14 | 2025-03-08 | [55052](https://github.com/airbytehq/airbyte/pull/55052) | Update dependencies |
| 0.0.13 | 2025-02-23 | [54591](https://github.com/airbytehq/airbyte/pull/54591) | Update dependencies |
| 0.0.12 | 2025-02-15 | [54009](https://github.com/airbytehq/airbyte/pull/54009) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53473](https://github.com/airbytehq/airbyte/pull/53473) | Update dependencies |
| 0.0.10 | 2025-02-01 | [53029](https://github.com/airbytehq/airbyte/pull/53029) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52512](https://github.com/airbytehq/airbyte/pull/52512) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51877](https://github.com/airbytehq/airbyte/pull/51877) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51358](https://github.com/airbytehq/airbyte/pull/51358) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50694](https://github.com/airbytehq/airbyte/pull/50694) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50276](https://github.com/airbytehq/airbyte/pull/50276) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49656](https://github.com/airbytehq/airbyte/pull/49656) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49321](https://github.com/airbytehq/airbyte/pull/49321) | Update dependencies |
| 0.0.2 | 2024-12-11 | [49077](https://github.com/airbytehq/airbyte/pull/49077) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1 | 2024-11-09 | | Initial release by [@ombhardwajj](https://github.com/ombhardwajj) via Connector Builder |

</details>
