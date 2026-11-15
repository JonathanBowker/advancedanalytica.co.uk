---
generated_record: true
connector_name: Interzoid
connector_type: source
connector_slug: interzoid
connector_directory: source-interzoid
definition_id: c6905f33-f91a-4ef3-8e92-21d26c938691
version: 0.0.22
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/interzoid
logo: /images/connectors/sources/interzoid.svg
logo_source_path: airbyte-integrations/connectors/source-interzoid/icon.svg
logo_sha256: ef3c547f484303a8a49931ea30f53204f647f0dde465a27d51ceb97e0b4dd503
original_metadata_path: airbyte-integrations/connectors/source-interzoid/metadata.yaml
original_metadata_sha256: c84f15be392143a91831104dbf90ed23d3039ca823bece458ab8b961d3823379
original_document_path: docs/integrations/sources/interzoid.md
original_document_sha256: 2e9243d408695643adc881dab1457446297f6979ef352c464432ad496580ce0e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9d27889a0db44b0c6fd5705f73f19c928818f4e3b9d43acf1366453c7304a2f5
rewritten_at: 2026-11-12T13:43:05.894092+00:00
---

# Interzoid
Interzoid is an AI-powered API platform for data quality, data matching and data enrichment. These capabilities help your Airbyte pipelines deliver higher data ROI.

This connector calls Interzoid’s APIs directly from your Airbyte workflows. You can match records, enrich attributes, normalise and standardise fields, or verify data during extraction and loading.

You get cleaner, more consistent and actionable datasets across your Airbyte integrations, without additional engineering overhead.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| Company Name Matching |  | No pagination | ✅ |  ❌  |
| Individual Name Matching |  | No pagination | ✅ |  ❌  |
| Street Address Matching |  | No pagination | ✅ |  ❌  |
| Standardize Company Names |  | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.22 | 2026-11-03 | [90592](https://github.com/airbytehq/airbyte/pull/90592) | Update dependencies |
| 0.0.21 | 2026-10-27 | [89942](https://github.com/airbytehq/airbyte/pull/89942) | Update dependencies |
| 0.0.20 | 2026-10-20 | [89254](https://github.com/airbytehq/airbyte/pull/89254) | Update dependencies |
| 0.0.19 | 2026-10-13 | [88656](https://github.com/airbytehq/airbyte/pull/88656) | Update dependencies |
| 0.0.18 | 2026-10-06 | [87905](https://github.com/airbytehq/airbyte/pull/87905) | Update dependencies |
| 0.0.17 | 2026-09-29 | [87233](https://github.com/airbytehq/airbyte/pull/87233) | Update dependencies |
| 0.0.16 | 2026-09-22 | [86681](https://github.com/airbytehq/airbyte/pull/86681) | Update dependencies |
| 0.0.15 | 2026-09-15 | [86107](https://github.com/airbytehq/airbyte/pull/86107) | Update dependencies |
| 0.0.14 | 2026-09-08 | [85524](https://github.com/airbytehq/airbyte/pull/85524) | Update dependencies |
| 0.0.13 | 2026-08-18 | [84607](https://github.com/airbytehq/airbyte/pull/84607) | Update dependencies |
| 0.0.12 | 2026-08-11 | [83979](https://github.com/airbytehq/airbyte/pull/83979) | Update dependencies |
| 0.0.11 | 2026-08-04 | [83488](https://github.com/airbytehq/airbyte/pull/83488) | Update dependencies |
| 0.0.10 | 2026-07-28 | [82965](https://github.com/airbytehq/airbyte/pull/82965) | Update dependencies |
| 0.0.9 | 2026-07-21 | [82452](https://github.com/airbytehq/airbyte/pull/82452) | Update dependencies |
| 0.0.8 | 2026-07-14 | [81890](https://github.com/airbytehq/airbyte/pull/81890) | Update dependencies |
| 0.0.7 | 2026-06-30 | [81124](https://github.com/airbytehq/airbyte/pull/81124) | Update dependencies |
| 0.0.6 | 2026-06-23 | [80522](https://github.com/airbytehq/airbyte/pull/80522) | Update dependencies |
| 0.0.5 | 2026-06-16 | [79902](https://github.com/airbytehq/airbyte/pull/79902) | Update dependencies |
| 0.0.4 | 2026-06-09 | [79369](https://github.com/airbytehq/airbyte/pull/79369) | Update dependencies |
| 0.0.3 | 2026-06-02 | [78764](https://github.com/airbytehq/airbyte/pull/78764) | Update dependencies |
| 0.0.2 | 2026-04-28 | [77278](https://github.com/airbytehq/airbyte/pull/77278) | Update dependencies |
| 0.0.1 | 2025-11-24 | | Initial release by [@interzoid](https://github.com/interzoid) via Connector Builder |

</details>
