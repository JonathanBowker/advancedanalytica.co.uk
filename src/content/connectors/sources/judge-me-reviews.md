---
generated_record: true
connector_name: Judge.me Reviews
connector_type: source
connector_slug: judge-me-reviews
connector_directory: source-judge-me-reviews
definition_id: a9184721-17d5-40c0-894d-f49b86749465
version: 0.0.47
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/judge-me-reviews
logo: /images/connectors/sources/judge-me-reviews.svg
logo_source_path: airbyte-integrations/connectors/source-judge-me-reviews/icon.svg
logo_sha256: f44c6d01453fe06a519125daa19b4ad7a1520439fc529fbac1c6953e4ab17331
original_metadata_path: airbyte-integrations/connectors/source-judge-me-reviews/metadata.yaml
original_metadata_sha256: a2a94291b6c640e4e27aba0872626ca163dcac9a034ae29d67051aebace79ecf
original_document_path: docs/integrations/sources/judge-me-reviews.md
original_document_sha256: e64946364b61a76e07e98e54eb18c95b04fb6626169334c32b4cb6f7cbcd5d12
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 506a9797130b324afdd13d45b8944c72b38da40cf840d2d15b6f00ed335c6502
rewritten_at: 2026-11-12T13:43:53.767886+00:00
---

# Judge.me Reviews
Get reviews from Judge.me Reviews: https://judge.me/
API: https://judge.me/api/docs#tag/Reviews/operation/reviews#index

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `start_date` | `string` | Start date.  |  |
| `shop_domain` | `string` | Shop Domain. example.myshopify.com |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| reviews | id | DefaultPaginator | ✅ |  ✅  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.47 | 2026-11-04 | [90371](https://github.com/airbytehq/airbyte/pull/90371) | Simplify the reviews stream error handler configuration; no change in retry behavior |
| 0.0.46 | 2026-11-03 | [90619](https://github.com/airbytehq/airbyte/pull/90619) | Update dependencies |
| 0.0.45 | 2026-10-27 | [89931](https://github.com/airbytehq/airbyte/pull/89931) | Update dependencies |
| 0.0.44 | 2026-10-20 | [89276](https://github.com/airbytehq/airbyte/pull/89276) | Update dependencies |
| 0.0.43 | 2026-10-13 | [88669](https://github.com/airbytehq/airbyte/pull/88669) | Update dependencies |
| 0.0.42 | 2026-10-06 | [87914](https://github.com/airbytehq/airbyte/pull/87914) | Update dependencies |
| 0.0.41 | 2026-09-29 | [87208](https://github.com/airbytehq/airbyte/pull/87208) | Update dependencies |
| 0.0.40 | 2026-09-22 | [86684](https://github.com/airbytehq/airbyte/pull/86684) | Update dependencies |
| 0.0.39 | 2026-09-15 | [86086](https://github.com/airbytehq/airbyte/pull/86086) | Update dependencies |
| 0.0.38 | 2026-09-08 | [85542](https://github.com/airbytehq/airbyte/pull/85542) | Update dependencies |
| 0.0.37 | 2026-08-18 | [84637](https://github.com/airbytehq/airbyte/pull/84637) | Update dependencies |
| 0.0.36 | 2026-08-11 | [83989](https://github.com/airbytehq/airbyte/pull/83989) | Update dependencies |
| 0.0.35 | 2026-08-04 | [83509](https://github.com/airbytehq/airbyte/pull/83509) | Update dependencies |
| 0.0.34 | 2026-07-28 | [82978](https://github.com/airbytehq/airbyte/pull/82978) | Update dependencies |
| 0.0.33 | 2026-07-21 | [82472](https://github.com/airbytehq/airbyte/pull/82472) | Update dependencies |
| 0.0.32 | 2026-07-14 | [81886](https://github.com/airbytehq/airbyte/pull/81886) | Update dependencies |
| 0.0.31 | 2026-06-30 | [81097](https://github.com/airbytehq/airbyte/pull/81097) | Update dependencies |
| 0.0.30 | 2026-06-23 | [80515](https://github.com/airbytehq/airbyte/pull/80515) | Update dependencies |
| 0.0.29 | 2026-06-16 | [79924](https://github.com/airbytehq/airbyte/pull/79924) | Update dependencies |
| 0.0.28 | 2026-06-09 | [79346](https://github.com/airbytehq/airbyte/pull/79346) | Update dependencies |
| 0.0.27 | 2026-06-02 | [78786](https://github.com/airbytehq/airbyte/pull/78786) | Update dependencies |
| 0.0.26 | 2026-04-28 | [77317](https://github.com/airbytehq/airbyte/pull/77317) | Update dependencies |
| 0.0.25 | 2026-04-21 | [76623](https://github.com/airbytehq/airbyte/pull/76623) | Update dependencies |
| 0.0.24 | 2026-03-31 | [75650](https://github.com/airbytehq/airbyte/pull/75650) | Update dependencies |
| 0.0.23 | 2026-03-17 | [75059](https://github.com/airbytehq/airbyte/pull/75059) | Update dependencies |
| 0.0.22 | 2026-03-10 | [74527](https://github.com/airbytehq/airbyte/pull/74527) | Update dependencies |
| 0.0.21 | 2026-02-24 | [73922](https://github.com/airbytehq/airbyte/pull/73922) | Update dependencies |
| 0.0.20 | 2026-02-17 | [73080](https://github.com/airbytehq/airbyte/pull/73080) | Update dependencies |
| 0.0.19 | 2026-02-03 | [72754](https://github.com/airbytehq/airbyte/pull/72754) | Update dependencies |
| 0.0.18 | 2026-01-20 | [71958](https://github.com/airbytehq/airbyte/pull/71958) | Update dependencies |
| 0.0.17 | 2026-01-14 | [71396](https://github.com/airbytehq/airbyte/pull/71396) | Update dependencies |
| 0.0.16 | 2025-12-18 | [70524](https://github.com/airbytehq/airbyte/pull/70524) | Update dependencies |
| 0.0.15 | 2025-11-25 | [70196](https://github.com/airbytehq/airbyte/pull/70196) | Update dependencies |
| 0.0.14 | 2025-11-18 | [69528](https://github.com/airbytehq/airbyte/pull/69528) | Update dependencies |
| 0.0.13 | 2025-10-29 | [68796](https://github.com/airbytehq/airbyte/pull/68796) | Update dependencies |
| 0.0.12 | 2025-10-21 | [68510](https://github.com/airbytehq/airbyte/pull/68510) | Update dependencies |
| 0.0.11 | 2025-10-14 | [67938](https://github.com/airbytehq/airbyte/pull/67938) | Update dependencies |
| 0.0.10 | 2025-10-07 | [67360](https://github.com/airbytehq/airbyte/pull/67360) | Update dependencies |
| 0.0.9 | 2025-09-30 | [66788](https://github.com/airbytehq/airbyte/pull/66788) | Update dependencies |
| 0.0.8 | 2025-09-09 | [66060](https://github.com/airbytehq/airbyte/pull/66060) | Update dependencies |
| 0.0.7 | 2025-08-23 | [65349](https://github.com/airbytehq/airbyte/pull/65349) | Update dependencies |
| 0.0.6 | 2025-08-09 | [64628](https://github.com/airbytehq/airbyte/pull/64628) | Update dependencies |
| 0.0.5 | 2025-08-02 | [64186](https://github.com/airbytehq/airbyte/pull/64186) | Update dependencies |
| 0.0.4 | 2025-07-26 | [63890](https://github.com/airbytehq/airbyte/pull/63890) | Update dependencies |
| 0.0.3 | 2025-07-19 | [63466](https://github.com/airbytehq/airbyte/pull/63466) | Update dependencies |
| 0.0.2 | 2025-07-12 | [63143](https://github.com/airbytehq/airbyte/pull/63143) | Update dependencies |
| 0.0.1 | 2025-06-18 | | Initial release by [@nmtruong93](https://github.com/nmtruong93) via Connector Builder |

</details>
