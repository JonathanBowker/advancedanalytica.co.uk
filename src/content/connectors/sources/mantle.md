---
generated_record: true
connector_name: Mantle
connector_type: source
connector_slug: mantle
connector_directory: source-mantle
definition_id: da48299b-4afa-46b4-bb9d-e1ade37e7169
version: 0.0.43
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/mantle
logo: /images/connectors/sources/mantle.svg
logo_source_path: airbyte-integrations/connectors/source-mantle/icon.svg
logo_sha256: 20952cb8300a1b3f7223dbaec43ef82b5541c76a3adb582b76c6a20c44f96153
original_metadata_path: airbyte-integrations/connectors/source-mantle/metadata.yaml
original_metadata_sha256: 290282af6960ae7280c190e78b04d3cba4849c77eed7dc96be98a650a16542df
original_document_path: docs/integrations/sources/mantle.md
original_document_sha256: addeb85e42035a8f547f0eda761c613476826a539e2a6d9914256d5a8025ca01
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 26a168d3ba128ca6e377996d59396251853feff5c2fb5b3f7fc5b55f0f6a0b30
rewritten_at: 2026-11-12T13:46:12.706209+00:00
---

# Mantle
Get customer and subscription streams with this connector using the [Mantle Core API](https://coreapi.heymantle.dev/reference/introduction).

## Prerequisites

- You need a Mantle API token with the `read:customers` and `read:subscriptions` scopes. Generate one at [https://app.heymantle.com/settings/api_tokens](https://app.heymantle.com/settings/api_tokens).

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Mantle Core API token (sent as a Bearer token). |  |
| `start_date` | `string` | Start date. UTC date-time in `YYYY-MM-DDTHH:MM:SSZ` format; records updated/created before this date are not replicated. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| customers | id | DefaultPaginator | ✅ |  ✅  |
| subscriptions | id | DefaultPaginator | ✅ |  ✅  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.43 | 2026-11-10 | [91600](https://github.com/airbytehq/airbyte/pull/91600) | Update dependencies |
| 0.0.42 | 2026-11-03 | [90631](https://github.com/airbytehq/airbyte/pull/90631) | Update dependencies |
| 0.0.41 | 2026-10-27 | [89988](https://github.com/airbytehq/airbyte/pull/89988) | Update dependencies |
| 0.0.40 | 2026-10-20 | [89316](https://github.com/airbytehq/airbyte/pull/89316) | Update dependencies |
| 0.0.39 | 2026-10-13 | [88716](https://github.com/airbytehq/airbyte/pull/88716) | Update dependencies |
| 0.0.38 | 2026-10-07 | [88304](https://github.com/airbytehq/airbyte/pull/88304) | Align `customers` page size with the documented API maximum (100) and point the API docs link at the Mantle Core API reference |
| 0.0.37 | 2026-10-06 | [87924](https://github.com/airbytehq/airbyte/pull/87924) | Update dependencies |
| 0.0.36 | 2026-09-29 | [87259](https://github.com/airbytehq/airbyte/pull/87259) | Update dependencies |
| 0.0.35 | 2026-09-22 | [86694](https://github.com/airbytehq/airbyte/pull/86694) | Update dependencies |
| 0.0.34 | 2026-09-15 | [86132](https://github.com/airbytehq/airbyte/pull/86132) | Update dependencies |
| 0.0.33 | 2026-09-08 | [85562](https://github.com/airbytehq/airbyte/pull/85562) | Update dependencies |
| 0.0.32 | 2026-08-18 | [84663](https://github.com/airbytehq/airbyte/pull/84663) | Update dependencies |
| 0.0.31 | 2026-08-11 | [84007](https://github.com/airbytehq/airbyte/pull/84007) | Update dependencies |
| 0.0.30 | 2026-08-04 | [83542](https://github.com/airbytehq/airbyte/pull/83542) | Update dependencies |
| 0.0.29 | 2026-07-28 | [83009](https://github.com/airbytehq/airbyte/pull/83009) | Update dependencies |
| 0.0.28 | 2026-07-21 | [82481](https://github.com/airbytehq/airbyte/pull/82481) | Update dependencies |
| 0.0.27 | 2026-07-14 | [81892](https://github.com/airbytehq/airbyte/pull/81892) | Update dependencies |
| 0.0.26 | 2026-06-30 | [81143](https://github.com/airbytehq/airbyte/pull/81143) | Update dependencies |
| 0.0.25 | 2026-06-23 | [80533](https://github.com/airbytehq/airbyte/pull/80533) | Update dependencies |
| 0.0.24 | 2026-06-16 | [79959](https://github.com/airbytehq/airbyte/pull/79959) | Update dependencies |
| 0.0.23 | 2026-06-09 | [79406](https://github.com/airbytehq/airbyte/pull/79406) | Update dependencies |
| 0.0.22 | 2026-06-02 | [78824](https://github.com/airbytehq/airbyte/pull/78824) | Update dependencies |
| 0.0.21 | 2026-04-28 | [77359](https://github.com/airbytehq/airbyte/pull/77359) | Update dependencies |
| 0.0.20 | 2026-04-21 | [76687](https://github.com/airbytehq/airbyte/pull/76687) | Update dependencies |
| 0.0.19 | 2026-03-31 | [75810](https://github.com/airbytehq/airbyte/pull/75810) | Update dependencies |
| 0.0.18 | 2026-03-17 | [73821](https://github.com/airbytehq/airbyte/pull/73821) | Update dependencies |
| 0.0.17 | 2026-02-17 | [73394](https://github.com/airbytehq/airbyte/pull/73394) | Update dependencies |
| 0.0.16 | 2026-02-10 | [73189](https://github.com/airbytehq/airbyte/pull/73189) | Update dependencies |
| 0.0.15 | 2026-02-03 | [72724](https://github.com/airbytehq/airbyte/pull/72724) | Update dependencies |
| 0.0.14 | 2026-01-20 | [72009](https://github.com/airbytehq/airbyte/pull/72009) | Update dependencies |
| 0.0.13 | 2026-01-14 | [71544](https://github.com/airbytehq/airbyte/pull/71544) | Update dependencies |
| 0.0.12 | 2025-12-18 | [70750](https://github.com/airbytehq/airbyte/pull/70750) | Update dependencies |
| 0.0.11 | 2025-11-25 | [70132](https://github.com/airbytehq/airbyte/pull/70132) | Update dependencies |
| 0.0.10 | 2025-11-18 | [69545](https://github.com/airbytehq/airbyte/pull/69545) | Update dependencies |
| 0.0.9 | 2025-10-29 | [69069](https://github.com/airbytehq/airbyte/pull/69069) | Update dependencies |
| 0.0.8 | 2025-10-21 | [68445](https://github.com/airbytehq/airbyte/pull/68445) | Update dependencies |
| 0.0.7 | 2025-10-14 | [67809](https://github.com/airbytehq/airbyte/pull/67809) | Update dependencies |
| 0.0.6 | 2025-10-07 | [67377](https://github.com/airbytehq/airbyte/pull/67377) | Update dependencies |
| 0.0.5 | 2025-09-30 | [66339](https://github.com/airbytehq/airbyte/pull/66339) | Update dependencies |
| 0.0.4 | 2025-09-09 | [65746](https://github.com/airbytehq/airbyte/pull/65746) | Update dependencies |
| 0.0.3 | 2025-09-07 | [65150](https://github.com/airbytehq/airbyte/pull/65150) | Fix pagination for Subscriptions |
| 0.0.2 | 2025-08-23 | [65182](https://github.com/airbytehq/airbyte/pull/65182) | Update dependencies |
| 0.0.1 | 2025-08-13 | | Initial release by [@KimPlv](https://github.com/KimPlv) via Connector Builder |

</details>
