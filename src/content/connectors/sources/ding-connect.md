---
generated_record: true
connector_name: Ding Connect
connector_type: source
connector_slug: ding-connect
connector_directory: source-ding-connect
definition_id: 03383c9d-acff-468b-9afb-444479cd7fbc
version: 0.0.47
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/ding-connect
logo: /images/connectors/sources/ding-connect.svg
logo_source_path: airbyte-integrations/connectors/source-ding-connect/icon.svg
logo_sha256: c76da9bd8e69caa391b0cf77235d52f9303ccf8eb81862dd1b00d51b75c0a164
original_metadata_path: airbyte-integrations/connectors/source-ding-connect/metadata.yaml
original_metadata_sha256: 2248827adb835c964cbf7a5dd1f57c57dc2a615305deb88facec622f50a3b355
original_document_path: docs/integrations/sources/ding-connect.md
original_document_sha256: b6b01f6d973edcb72670ba807aa848b0de4283dc0a4ffdb57cb7687c50f8003b
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 2712f66567a8ea39d026aba9737c2cf5711a46ace2625bb182f5ec5327781195
rewritten_at: 2026-11-12T13:34:59.534111+00:00
---

# Ding Connect
Website: https://www.dingconnect.com/
API Reference: https://www.dingconnect.com/Api/Description

## Configure Ding Connect

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Your API key for authenticating with the DingConnect API. You can generate this key by navigating to the Developer tab in the Account Settings section of your DingConnect account. |  |
| `X-Correlation-Id` | `string` | X-Correlation-Id. Optional header to correlate HTTP requests between a client and server. |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name                 | Primary Key | Pagination        | Supports Full Sync | Supports Incremental |
|-----------------------------|-------------|-------------------|---------------------|----------------------|
| countries                   | uuid        | No pagination     | ✅                  | ❌                  |
| currencies                  | uuid        | No pagination     | ✅                  | ❌                  |
| error_code_descriptions     | uuid        | No pagination     | ✅                  | ❌                  |
| product_descriptions        | uuid        | No pagination     | ✅                  | ❌                  |
| products                    | uuid        | No pagination     | ✅                  | ❌                  |
| promotions                  | uuid        | No pagination     | ✅                  | ✅                  |
| providers                   | uuid        | No pagination     | ✅                  | ❌                  |
| regions                     | uuid        | No pagination     | ✅                  | ❌                  |

## Allow IP addresses

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.47 | 2026-11-10 | [91485](https://github.com/airbytehq/airbyte/pull/91485) | Update dependencies |
| 0.0.46 | 2026-11-03 | [90500](https://github.com/airbytehq/airbyte/pull/90500) | Update dependencies |
| 0.0.45 | 2026-10-27 | [89842](https://github.com/airbytehq/airbyte/pull/89842) | Update dependencies |
| 0.0.44 | 2026-10-20 | [89161](https://github.com/airbytehq/airbyte/pull/89161) | Update dependencies |
| 0.0.43 | 2026-10-13 | [88540](https://github.com/airbytehq/airbyte/pull/88540) | Update dependencies |
| 0.0.42 | 2026-10-07 | [88262](https://github.com/airbytehq/airbyte/pull/88262) | Fix never-ending syncs: the Ding API does not support `Skip` offset pagination, so stop paginating and read each endpoint's full `Items` list once |
| 0.0.41 | 2026-10-06 | [87817](https://github.com/airbytehq/airbyte/pull/87817) | Update dependencies |
| 0.0.40 | 2026-09-29 | [87133](https://github.com/airbytehq/airbyte/pull/87133) | Update dependencies |
| 0.0.39 | 2026-09-22 | [86577](https://github.com/airbytehq/airbyte/pull/86577) | Update dependencies |
| 0.0.38 | 2026-09-15 | [86005](https://github.com/airbytehq/airbyte/pull/86005) | Update dependencies |
| 0.0.37 | 2026-09-08 | [85416](https://github.com/airbytehq/airbyte/pull/85416) | Update dependencies |
| 0.0.36 | 2026-08-18 | [84538](https://github.com/airbytehq/airbyte/pull/84538) | Update dependencies |
| 0.0.35 | 2026-08-11 | [83880](https://github.com/airbytehq/airbyte/pull/83880) | Update dependencies |
| 0.0.34 | 2026-08-04 | [83390](https://github.com/airbytehq/airbyte/pull/83390) | Update dependencies |
| 0.0.33 | 2026-07-28 | [82874](https://github.com/airbytehq/airbyte/pull/82874) | Update dependencies |
| 0.0.32 | 2026-07-21 | [82345](https://github.com/airbytehq/airbyte/pull/82345) | Update dependencies |
| 0.0.31 | 2026-07-14 | [81759](https://github.com/airbytehq/airbyte/pull/81759) | Update dependencies |
| 0.0.30 | 2026-06-30 | [81024](https://github.com/airbytehq/airbyte/pull/81024) | Update dependencies |
| 0.0.29 | 2026-06-23 | [80403](https://github.com/airbytehq/airbyte/pull/80403) | Update dependencies |
| 0.0.28 | 2026-06-16 | [79826](https://github.com/airbytehq/airbyte/pull/79826) | Update dependencies |
| 0.0.27 | 2026-06-09 | [79279](https://github.com/airbytehq/airbyte/pull/79279) | Update dependencies |
| 0.0.26 | 2026-06-02 | [78576](https://github.com/airbytehq/airbyte/pull/78576) | Update dependencies |
| 0.0.25 | 2026-04-28 | [77205](https://github.com/airbytehq/airbyte/pull/77205) | Update dependencies |
| 0.0.24 | 2026-04-21 | [76524](https://github.com/airbytehq/airbyte/pull/76524) | Update dependencies |
| 0.0.23 | 2026-03-03 | [74150](https://github.com/airbytehq/airbyte/pull/74150) | Update dependencies |
| 0.0.22 | 2026-01-14 | [71549](https://github.com/airbytehq/airbyte/pull/71549) | Update dependencies |
| 0.0.21 | 2025-10-29 | [69007](https://github.com/airbytehq/airbyte/pull/69007) | Update dependencies |
| 0.0.20 | 2025-09-30 | [66948](https://github.com/airbytehq/airbyte/pull/66948) | Update dependencies |
| 0.0.19 | 2025-09-09 | [65838](https://github.com/airbytehq/airbyte/pull/65838) | Update dependencies |
| 0.0.18 | 2025-08-23 | [65298](https://github.com/airbytehq/airbyte/pull/65298) | Update dependencies |
| 0.0.17 | 2025-08-09 | [64763](https://github.com/airbytehq/airbyte/pull/64763) | Update dependencies |
| 0.0.16 | 2025-08-02 | [64382](https://github.com/airbytehq/airbyte/pull/64382) | Update dependencies |
| 0.0.15 | 2025-07-26 | [63954](https://github.com/airbytehq/airbyte/pull/63954) | Update dependencies |
| 0.0.14 | 2025-07-19 | [63585](https://github.com/airbytehq/airbyte/pull/63585) | Update dependencies |
| 0.0.13 | 2025-07-12 | [63013](https://github.com/airbytehq/airbyte/pull/63013) | Update dependencies |
| 0.0.12 | 2025-07-05 | [62789](https://github.com/airbytehq/airbyte/pull/62789) | Update dependencies |
| 0.0.11 | 2025-06-28 | [62315](https://github.com/airbytehq/airbyte/pull/62315) | Update dependencies |
| 0.0.10 | 2025-06-21 | [61983](https://github.com/airbytehq/airbyte/pull/61983) | Update dependencies |
| 0.0.9 | 2025-06-14 | [61173](https://github.com/airbytehq/airbyte/pull/61173) | Update dependencies |
| 0.0.8 | 2025-05-24 | [60411](https://github.com/airbytehq/airbyte/pull/60411) | Update dependencies |
| 0.0.7 | 2025-05-10 | [60028](https://github.com/airbytehq/airbyte/pull/60028) | Update dependencies |
| 0.0.6 | 2025-05-03 | [59380](https://github.com/airbytehq/airbyte/pull/59380) | Update dependencies |
| 0.0.5 | 2025-04-26 | [58874](https://github.com/airbytehq/airbyte/pull/58874) | Update dependencies |
| 0.0.4 | 2025-04-19 | [58321](https://github.com/airbytehq/airbyte/pull/58321) | Update dependencies |
| 0.0.3 | 2025-04-12 | [57842](https://github.com/airbytehq/airbyte/pull/57842) | Update dependencies |
| 0.0.2 | 2025-04-05 | [57191](https://github.com/airbytehq/airbyte/pull/57191) | Update dependencies |
| 0.0.1 | 2025-04-03 | [56995](https://github.com/airbytehq/airbyte/pull/56995) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
