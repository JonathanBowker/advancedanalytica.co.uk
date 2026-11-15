---
generated_record: true
connector_name: Phyllo
connector_type: source
connector_slug: phyllo
connector_directory: source-phyllo
definition_id: 65346f37-e31a-4c66-84c6-5c2fc060b00a
version: 0.0.58
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/phyllo
logo: /images/connectors/sources/phyllo.svg
logo_source_path: airbyte-integrations/connectors/source-phyllo/icon.svg
logo_sha256: f94d75f8d6ca135c8ea525457eaa9d6667762e0a08268092d7b3bbcfe0050c3d
original_metadata_path: airbyte-integrations/connectors/source-phyllo/metadata.yaml
original_metadata_sha256: 47f1932884ee0cacc9e5518a0b26c75e1faf88c4b97d4cddd64b497cbf73ac6a
original_document_path: docs/integrations/sources/phyllo.md
original_document_sha256: e2866f731afc3a4f75625ba47c8476115f8d77941c7b086e6c26d70fee7771ae
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8670ce4cf40995971399878b3fe500cbfc5d9b3a85f0a6496d8e9034b8e5500c
rewritten_at: 2026-11-12T13:50:47.406950+00:00
---

# Phyllo
Website: https://dashboard.getphyllo.com/
API Reference: https://docs.getphyllo.com/docs/api-reference/introduction/introduction

## Configure Phyllo

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `client_id` | `string` | Client ID. Your Client ID for the Phyllo API. You can find this in the Phyllo Developer Dashboard under API credentials. |  |
| `environment` | `string` | Environment. The environment for the API (e.g., &#39;api.sandbox&#39;, &#39;api.staging&#39;, &#39;api&#39;) | api |
| `client_secret` | `string` | Client Secret. Your Client Secret for the Phyllo API. You can find this in the Phyllo Developer Dashboard under API credentials. |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| work-platforms | id | DefaultPaginator | ✅ |  ✅  |
| users | id | DefaultPaginator | ✅ |  ✅  |
| accounts | id | DefaultPaginator | ✅ |  ✅  |
| profiles | id | DefaultPaginator | ✅ |  ✅  |
| content_items | id | DefaultPaginator | ✅ |  ✅  |
| social_income_transactions | id | DefaultPaginator | ✅ |  ✅  |

## IP allow list

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and restrict access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.58 | 2026-11-10 | [91641](https://github.com/airbytehq/airbyte/pull/91641) | Update dependencies |
| 0.0.57 | 2026-11-03 | [90694](https://github.com/airbytehq/airbyte/pull/90694) | Update dependencies |
| 0.0.56 | 2026-10-27 | [90020](https://github.com/airbytehq/airbyte/pull/90020) | Update dependencies |
| 0.0.55 | 2026-10-20 | [89359](https://github.com/airbytehq/airbyte/pull/89359) | Update dependencies |
| 0.0.54 | 2026-10-13 | [88749](https://github.com/airbytehq/airbyte/pull/88749) | Update dependencies |
| 0.0.53 | 2026-10-06 | [87976](https://github.com/airbytehq/airbyte/pull/87976) | Update dependencies |
| 0.0.52 | 2026-09-29 | [87295](https://github.com/airbytehq/airbyte/pull/87295) | Update dependencies |
| 0.0.51 | 2026-09-22 | [86741](https://github.com/airbytehq/airbyte/pull/86741) | Update dependencies |
| 0.0.50 | 2026-09-15 | [86103](https://github.com/airbytehq/airbyte/pull/86103) | Update dependencies |
| 0.0.49 | 2026-09-08 | [85618](https://github.com/airbytehq/airbyte/pull/85618) | Update dependencies |
| 0.0.48 | 2026-08-18 | [84698](https://github.com/airbytehq/airbyte/pull/84698) | Update dependencies |
| 0.0.47 | 2026-08-11 | [84071](https://github.com/airbytehq/airbyte/pull/84071) | Update dependencies |
| 0.0.46 | 2026-08-04 | [83561](https://github.com/airbytehq/airbyte/pull/83561) | Update dependencies |
| 0.0.45 | 2026-07-28 | [83039](https://github.com/airbytehq/airbyte/pull/83039) | Update dependencies |
| 0.0.44 | 2026-07-21 | [82547](https://github.com/airbytehq/airbyte/pull/82547) | Update dependencies |
| 0.0.43 | 2026-07-14 | [81968](https://github.com/airbytehq/airbyte/pull/81968) | Update dependencies |
| 0.0.42 | 2026-06-30 | [81171](https://github.com/airbytehq/airbyte/pull/81171) | Update dependencies |
| 0.0.41 | 2026-06-23 | [80571](https://github.com/airbytehq/airbyte/pull/80571) | Update dependencies |
| 0.0.40 | 2026-06-16 | [79992](https://github.com/airbytehq/airbyte/pull/79992) | Update dependencies |
| 0.0.39 | 2026-06-09 | [79427](https://github.com/airbytehq/airbyte/pull/79427) | Update dependencies |
| 0.0.38 | 2026-06-02 | [78895](https://github.com/airbytehq/airbyte/pull/78895) | Update dependencies |
| 0.0.37 | 2026-04-28 | [77374](https://github.com/airbytehq/airbyte/pull/77374) | Update dependencies |
| 0.0.36 | 2026-04-21 | [76696](https://github.com/airbytehq/airbyte/pull/76696) | Update dependencies |
| 0.0.35 | 2026-03-24 | [74477](https://github.com/airbytehq/airbyte/pull/74477) | Update dependencies |
| 0.0.34 | 2026-03-10 | [74451](https://github.com/airbytehq/airbyte/pull/74451) | Update dependencies |
| 0.0.33 | 2026-03-03 | [73877](https://github.com/airbytehq/airbyte/pull/73877) | Update dependencies |
| 0.0.32 | 2026-02-17 | [73596](https://github.com/airbytehq/airbyte/pull/73596) | Update dependencies |
| 0.0.31 | 2026-02-10 | [73192](https://github.com/airbytehq/airbyte/pull/73192) | Update dependencies |
| 0.0.30 | 2026-02-03 | [72667](https://github.com/airbytehq/airbyte/pull/72667) | Update dependencies |
| 0.0.29 | 2026-01-20 | [72178](https://github.com/airbytehq/airbyte/pull/72178) | Update dependencies |
| 0.0.28 | 2026-01-14 | [71578](https://github.com/airbytehq/airbyte/pull/71578) | Update dependencies |
| 0.0.27 | 2025-12-18 | [70531](https://github.com/airbytehq/airbyte/pull/70531) | Update dependencies |
| 0.0.26 | 2025-11-25 | [69941](https://github.com/airbytehq/airbyte/pull/69941) | Update dependencies |
| 0.0.25 | 2025-11-18 | [69630](https://github.com/airbytehq/airbyte/pull/69630) | Update dependencies |
| 0.0.24 | 2025-10-29 | [68924](https://github.com/airbytehq/airbyte/pull/68924) | Update dependencies |
| 0.0.23 | 2025-10-21 | [68222](https://github.com/airbytehq/airbyte/pull/68222) | Update dependencies |
| 0.0.22 | 2025-10-14 | [67861](https://github.com/airbytehq/airbyte/pull/67861) | Update dependencies |
| 0.0.21 | 2025-10-07 | [67497](https://github.com/airbytehq/airbyte/pull/67497) | Update dependencies |
| 0.0.20 | 2025-10-01 | [66957](https://github.com/airbytehq/airbyte/pull/66957) | Update dependencies |
| 0.0.19 | 2025-09-23 | [66426](https://github.com/airbytehq/airbyte/pull/66426) | Update dependencies |
| 0.0.18 | 2025-09-09 | [65861](https://github.com/airbytehq/airbyte/pull/65861) | Update dependencies |
| 0.0.17 | 2025-08-23 | [65189](https://github.com/airbytehq/airbyte/pull/65189) | Update dependencies |
| 0.0.16 | 2025-08-09 | [64744](https://github.com/airbytehq/airbyte/pull/64744) | Update dependencies |
| 0.0.15 | 2025-08-02 | [64283](https://github.com/airbytehq/airbyte/pull/64283) | Update dependencies |
| 0.0.14 | 2025-07-26 | [63926](https://github.com/airbytehq/airbyte/pull/63926) | Update dependencies |
| 0.0.13 | 2025-07-19 | [63409](https://github.com/airbytehq/airbyte/pull/63409) | Update dependencies |
| 0.0.12 | 2025-07-12 | [63181](https://github.com/airbytehq/airbyte/pull/63181) | Update dependencies |
| 0.0.11 | 2025-07-05 | [62582](https://github.com/airbytehq/airbyte/pull/62582) | Update dependencies |
| 0.0.10 | 2025-06-28 | [62296](https://github.com/airbytehq/airbyte/pull/62296) | Update dependencies |
| 0.0.9 | 2025-06-21 | [61906](https://github.com/airbytehq/airbyte/pull/61906) | Update dependencies |
| 0.0.8 | 2025-06-14 | [61054](https://github.com/airbytehq/airbyte/pull/61054) | Update dependencies |
| 0.0.7 | 2025-05-24 | [60441](https://github.com/airbytehq/airbyte/pull/60441) | Update dependencies |
| 0.0.6 | 2025-05-10 | [59490](https://github.com/airbytehq/airbyte/pull/59490) | Update dependencies |
| 0.0.5 | 2025-04-27 | [59070](https://github.com/airbytehq/airbyte/pull/59070) | Update dependencies |
| 0.0.4 | 2025-04-19 | [58493](https://github.com/airbytehq/airbyte/pull/58493) | Update dependencies |
| 0.0.3 | 2025-04-12 | [57895](https://github.com/airbytehq/airbyte/pull/57895) | Update dependencies |
| 0.0.2 | 2025-04-05 | [57326](https://github.com/airbytehq/airbyte/pull/57326) | Update dependencies |
| 0.0.1 | 2025-04-04 | [57012](https://github.com/airbytehq/airbyte/pull/57012) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
