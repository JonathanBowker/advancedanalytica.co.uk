---
generated_record: true
connector_name: Alpaca Broker API
connector_type: source
connector_slug: alpaca-broker-api
connector_directory: source-alpaca-broker-api
definition_id: 9065ae98-3c65-4283-b858-d22772b6fab5
version: 0.0.45
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/alpaca-broker-api
logo: /images/connectors/sources/alpaca-broker-api.svg
logo_source_path: airbyte-integrations/connectors/source-alpaca-broker-api/icon.svg
logo_sha256: e60d7b3dc54233e14c0a2c83deb1bbc6c6f10acb0ea63fce07c5be54d693eae6
original_metadata_path: airbyte-integrations/connectors/source-alpaca-broker-api/metadata.yaml
original_metadata_sha256: f2d7f640cca2484a97451f1e625fc442f76f66d3c8ed7af2e7e224d767257cc7
original_document_path: docs/integrations/sources/alpaca-broker-api.md
original_document_sha256: a96459ca5c30814a280a1c865e6de7409dd571495f51efe9b13b2d0d0dd2edac
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: e3fb9558cfbb908563e383f14708ee57ae2a41d928bd3d687ce336d7b6b91873
rewritten_at: 2026-11-12T13:28:58.790681+00:00
---

# Alpaca Broker API
Website: https://broker-app.alpaca.markets/dashboard
API reference: https://docs.alpaca.markets/reference/getallaccounts

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `environment` | `string` | Environment. The trading environment, either &#39;live&#39;, &#39;paper&#39; or &#39;broker-api.sandbox&#39;. | broker-api.sandbox |
| `username` | `string` | Username. API Key ID for the alpaca market |  |
| `password` | `string` | Password. Your Alpaca API Secret Key. You can find this in the Alpaca developer web console under your account settings. |  |
| `start_date` | `string` | Start date.  |  |
| `limit` | `string` | Limit. Limit for each response objects | 20 |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| assets | id | No pagination | ✅ |  ❌  |
| accounts_activities | id | DefaultPaginator | ✅ |  ✅  |
| accounts | id | No pagination | ✅ |  ✅  |
| account_documents | id | No pagination | ✅ |  ✅  |
| calendar | uuid | No pagination | ✅ |  ✅  |
| clock | uuid | No pagination | ✅ |  ❌  |
| country-info | uuid | No pagination | ✅ |  ❌  |

## IP allow list

To connect through Airbyte Cloud, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you restrict access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.45 | 2026-11-10 | [91342](https://github.com/airbytehq/airbyte/pull/91342) | Update dependencies |
| 0.0.44 | 2026-11-03 | [90451](https://github.com/airbytehq/airbyte/pull/90451) | Update dependencies |
| 0.0.43 | 2026-10-27 | [89781](https://github.com/airbytehq/airbyte/pull/89781) | Update dependencies |
| 0.0.42 | 2026-10-20 | [89129](https://github.com/airbytehq/airbyte/pull/89129) | Update dependencies |
| 0.0.41 | 2026-10-13 | [88516](https://github.com/airbytehq/airbyte/pull/88516) | Update dependencies |
| 0.0.40 | 2026-10-06 | [87772](https://github.com/airbytehq/airbyte/pull/87772) | Update dependencies |
| 0.0.39 | 2026-09-29 | [87088](https://github.com/airbytehq/airbyte/pull/87088) | Update dependencies |
| 0.0.38 | 2026-09-22 | [86536](https://github.com/airbytehq/airbyte/pull/86536) | Update dependencies |
| 0.0.37 | 2026-09-15 | [85946](https://github.com/airbytehq/airbyte/pull/85946) | Update dependencies |
| 0.0.36 | 2026-09-08 | [85386](https://github.com/airbytehq/airbyte/pull/85386) | Update dependencies |
| 0.0.35 | 2026-08-18 | [84468](https://github.com/airbytehq/airbyte/pull/84468) | Update dependencies |
| 0.0.34 | 2026-08-11 | [83848](https://github.com/airbytehq/airbyte/pull/83848) | Update dependencies |
| 0.0.33 | 2026-08-04 | [83359](https://github.com/airbytehq/airbyte/pull/83359) | Update dependencies |
| 0.0.32 | 2026-07-28 | [82824](https://github.com/airbytehq/airbyte/pull/82824) | Update dependencies |
| 0.0.31 | 2026-07-21 | [82321](https://github.com/airbytehq/airbyte/pull/82321) | Update dependencies |
| 0.0.30 | 2026-07-14 | [81727](https://github.com/airbytehq/airbyte/pull/81727) | Update dependencies |
| 0.0.29 | 2026-06-30 | [80960](https://github.com/airbytehq/airbyte/pull/80960) | Update dependencies |
| 0.0.28 | 2026-06-23 | [80378](https://github.com/airbytehq/airbyte/pull/80378) | Update dependencies |
| 0.0.27 | 2026-06-16 | [79747](https://github.com/airbytehq/airbyte/pull/79747) | Update dependencies |
| 0.0.26 | 2026-06-09 | [79234](https://github.com/airbytehq/airbyte/pull/79234) | Update dependencies |
| 0.0.25 | 2026-06-02 | [78566](https://github.com/airbytehq/airbyte/pull/78566) | Update dependencies |
| 0.0.24 | 2026-04-28 | [77142](https://github.com/airbytehq/airbyte/pull/77142) | Update dependencies |
| 0.0.23 | 2026-04-21 | [76513](https://github.com/airbytehq/airbyte/pull/76513) | Update dependencies |
| 0.0.22 | 2026-03-24 | [74986](https://github.com/airbytehq/airbyte/pull/74986) | Update dependencies |
| 0.0.21 | 2026-02-24 | [73749](https://github.com/airbytehq/airbyte/pull/73749) | Update dependencies |
| 0.0.20 | 2026-02-17 | [72372](https://github.com/airbytehq/airbyte/pull/72372) | Update dependencies |
| 0.0.19 | 2026-01-14 | [71520](https://github.com/airbytehq/airbyte/pull/71520) | Update dependencies |
| 0.0.18 | 2025-12-18 | [70561](https://github.com/airbytehq/airbyte/pull/70561) | Update dependencies |
| 0.0.17 | 2025-11-25 | [69918](https://github.com/airbytehq/airbyte/pull/69918) | Update dependencies |
| 0.0.16 | 2025-10-29 | [69061](https://github.com/airbytehq/airbyte/pull/69061) | Update dependencies |
| 0.0.15 | 2025-10-14 | [67807](https://github.com/airbytehq/airbyte/pull/67807) | Update dependencies |
| 0.0.14 | 2025-09-30 | [66245](https://github.com/airbytehq/airbyte/pull/66245) | Update dependencies |
| 0.0.13 | 2025-09-09 | [66036](https://github.com/airbytehq/airbyte/pull/66036) | Update dependencies |
| 0.0.12 | 2025-08-23 | [65338](https://github.com/airbytehq/airbyte/pull/65338) | Update dependencies |
| 0.0.11 | 2025-08-02 | [64421](https://github.com/airbytehq/airbyte/pull/64421) | Update dependencies |
| 0.0.10 | 2025-07-26 | [63794](https://github.com/airbytehq/airbyte/pull/63794) | Update dependencies |
| 0.0.9 | 2025-07-12 | [63046](https://github.com/airbytehq/airbyte/pull/63046) | Update dependencies |
| 0.0.8 | 2025-06-28 | [62152](https://github.com/airbytehq/airbyte/pull/62152) | Update dependencies |
| 0.0.7 | 2025-06-15 | [60706](https://github.com/airbytehq/airbyte/pull/60706) | Update dependencies |
| 0.0.6 | 2025-05-10 | [59828](https://github.com/airbytehq/airbyte/pull/59828) | Update dependencies |
| 0.0.5 | 2025-05-03 | [58739](https://github.com/airbytehq/airbyte/pull/58739) | Update dependencies |
| 0.0.4 | 2025-04-19 | [58245](https://github.com/airbytehq/airbyte/pull/58245) | Update dependencies |
| 0.0.3 | 2025-04-12 | [57646](https://github.com/airbytehq/airbyte/pull/57646) | Update dependencies |
| 0.0.2 | 2025-04-05 | [57186](https://github.com/airbytehq/airbyte/pull/57186) | Update dependencies |
| 0.0.1 | 2025-04-02 | [56962](https://github.com/airbytehq/airbyte/pull/56962) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
