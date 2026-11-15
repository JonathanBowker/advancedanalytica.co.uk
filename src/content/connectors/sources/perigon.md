---
generated_record: true
connector_name: Perigon
connector_type: source
connector_slug: perigon
connector_directory: source-perigon
definition_id: 88031c22-4e1e-40da-8900-80f2ad176c34
version: 0.0.54
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/perigon
logo: /images/connectors/sources/perigon.svg
logo_source_path: airbyte-integrations/connectors/source-perigon/icon.svg
logo_sha256: db62a908793468c32f455a5e324c48123113dd08710e126a9dbf395f6a33ba6c
original_metadata_path: airbyte-integrations/connectors/source-perigon/metadata.yaml
original_metadata_sha256: d90a1194cbee9f19038f2483100b48249d1c0278be65afe087c8fd19eb17110b
original_document_path: docs/integrations/sources/perigon.md
original_document_sha256: 6f78d1177c98eed14dad66325b0215143ab48387ca67159fa16fcd3708ffaea5
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: bc87e6d5c33ef6776dec80c91a2bf1e07b3ae85dbdbb0e1a36c4b46fdd718c21
rewritten_at: 2026-11-12T13:50:32.434310+00:00
---

# Perigon
Website: https://www.perigon.io/
API Reference: https://docs.perigon.io/reference/all-news

## Configure Perigon

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Your API key for authenticating with the Perigon API. Obtain it by creating an account at https://www.perigon.io/sign-up and verifying your email. The API key will be visible on your account dashboard. |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| articles | articleId | DefaultPaginator | ✅ |  ✅  |
| stories | id | DefaultPaginator | ✅ |  ✅  |
| journalists | id | No pagination | ✅ |  ✅  |
| sources | id | No pagination | ✅ |  ✅  |
| people | wikidataId | No pagination | ✅ |  ✅  |
| companies | id | No pagination | ✅ |  ✅  |
| topics | id | DefaultPaginator | ✅ |  ✅  |

## IP allow list

Add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and your organisation restricts access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date              | Pull Request | Subject        |
|---------|-------------------|--------------|----------------|
| 0.0.54 | 2026-11-10 | [91653](https://github.com/airbytehq/airbyte/pull/91653) | Update dependencies |
| 0.0.53 | 2026-11-03 | [90671](https://github.com/airbytehq/airbyte/pull/90671) | Update dependencies |
| 0.0.52 | 2026-10-27 | [90002](https://github.com/airbytehq/airbyte/pull/90002) | Update dependencies |
| 0.0.51 | 2026-10-20 | [89336](https://github.com/airbytehq/airbyte/pull/89336) | Update dependencies |
| 0.0.50 | 2026-10-13 | [88720](https://github.com/airbytehq/airbyte/pull/88720) | Update dependencies |
| 0.0.49 | 2026-10-06 | [87967](https://github.com/airbytehq/airbyte/pull/87967) | Update dependencies |
| 0.0.48 | 2026-09-29 | [87286](https://github.com/airbytehq/airbyte/pull/87286) | Update dependencies |
| 0.0.47 | 2026-09-22 | [86747](https://github.com/airbytehq/airbyte/pull/86747) | Update dependencies |
| 0.0.46 | 2026-09-15 | [86182](https://github.com/airbytehq/airbyte/pull/86182) | Update dependencies |
| 0.0.45 | 2026-09-08 | [85616](https://github.com/airbytehq/airbyte/pull/85616) | Update dependencies |
| 0.0.44 | 2026-08-18 | [84707](https://github.com/airbytehq/airbyte/pull/84707) | Update dependencies |
| 0.0.43 | 2026-08-11 | [84045](https://github.com/airbytehq/airbyte/pull/84045) | Update dependencies |
| 0.0.42 | 2026-08-04 | [83587](https://github.com/airbytehq/airbyte/pull/83587) | Update dependencies |
| 0.0.41 | 2026-07-28 | [83062](https://github.com/airbytehq/airbyte/pull/83062) | Update dependencies |
| 0.0.40 | 2026-07-21 | [82541](https://github.com/airbytehq/airbyte/pull/82541) | Update dependencies |
| 0.0.39 | 2026-07-14 | [81950](https://github.com/airbytehq/airbyte/pull/81950) | Update dependencies |
| 0.0.38 | 2026-06-30 | [81180](https://github.com/airbytehq/airbyte/pull/81180) | Update dependencies |
| 0.0.37 | 2026-06-23 | [80604](https://github.com/airbytehq/airbyte/pull/80604) | Update dependencies |
| 0.0.36 | 2026-06-16 | [79953](https://github.com/airbytehq/airbyte/pull/79953) | Update dependencies |
| 0.0.35 | 2026-06-09 | [79449](https://github.com/airbytehq/airbyte/pull/79449) | Update dependencies |
| 0.0.34 | 2026-06-02 | [78909](https://github.com/airbytehq/airbyte/pull/78909) | Update dependencies |
| 0.0.33 | 2026-04-28 | [77367](https://github.com/airbytehq/airbyte/pull/77367) | Update dependencies |
| 0.0.32 | 2026-04-21 | [76724](https://github.com/airbytehq/airbyte/pull/76724) | Update dependencies |
| 0.0.31 | 2026-03-24 | [75400](https://github.com/airbytehq/airbyte/pull/75400) | Update dependencies |
| 0.0.30 | 2026-02-24 | [73849](https://github.com/airbytehq/airbyte/pull/73849) | Update dependencies |
| 0.0.29 | 2026-02-10 | [73169](https://github.com/airbytehq/airbyte/pull/73169) | Update dependencies |
| 0.0.28 | 2026-02-03 | [72646](https://github.com/airbytehq/airbyte/pull/72646) | Update dependencies |
| 0.0.27 | 2026-01-20 | [72168](https://github.com/airbytehq/airbyte/pull/72168) | Update dependencies |
| 0.0.26 | 2026-01-14 | [71540](https://github.com/airbytehq/airbyte/pull/71540) | Update dependencies |
| 0.0.25 | 2025-12-18 | [70471](https://github.com/airbytehq/airbyte/pull/70471) | Update dependencies |
| 0.0.24 | 2025-11-25 | [69958](https://github.com/airbytehq/airbyte/pull/69958) | Update dependencies |
| 0.0.23 | 2025-11-18 | [69631](https://github.com/airbytehq/airbyte/pull/69631) | Update dependencies |
| 0.0.22 | 2025-10-29 | [68935](https://github.com/airbytehq/airbyte/pull/68935) | Update dependencies |
| 0.0.21 | 2025-10-21 | [68283](https://github.com/airbytehq/airbyte/pull/68283) | Update dependencies |
| 0.0.20 | 2025-10-14 | [67859](https://github.com/airbytehq/airbyte/pull/67859) | Update dependencies |
| 0.0.19 | 2025-10-07 | [67499](https://github.com/airbytehq/airbyte/pull/67499) | Update dependencies |
| 0.0.18 | 2025-10-01 | [66958](https://github.com/airbytehq/airbyte/pull/66958) | Update dependencies |
| 0.0.17 | 2025-09-23 | [66414](https://github.com/airbytehq/airbyte/pull/66414) | Update dependencies |
| 0.0.16 | 2025-09-09 | [65881](https://github.com/airbytehq/airbyte/pull/65881) | Update dependencies |
| 0.0.15 | 2025-09-05 | [65966](https://github.com/airbytehq/airbyte/pull/65966) | Update to CDK v7.0.0 |
| 0.0.14 | 2025-08-23 | [65190](https://github.com/airbytehq/airbyte/pull/65190) | Update dependencies |
| 0.0.13 | 2025-08-16 | [64984](https://github.com/airbytehq/airbyte/pull/64984) | Update dependencies |
| 0.0.12 | 2025-08-02 | [64182](https://github.com/airbytehq/airbyte/pull/64182) | Update dependencies |
| 0.0.11 | 2025-07-26 | [63839](https://github.com/airbytehq/airbyte/pull/63839) | Update dependencies |
| 0.0.10 | 2025-07-19 | [63422](https://github.com/airbytehq/airbyte/pull/63422) | Update dependencies |
| 0.0.9 | 2025-07-12 | [63167](https://github.com/airbytehq/airbyte/pull/63167) | Update dependencies |
| 0.0.8 | 2025-07-05 | [62578](https://github.com/airbytehq/airbyte/pull/62578) | Update dependencies |
| 0.0.7 | 2025-06-28 | [62326](https://github.com/airbytehq/airbyte/pull/62326) | Update dependencies |
| 0.0.6 | 2025-06-21 | [61873](https://github.com/airbytehq/airbyte/pull/61873) | Update dependencies |
| 0.0.5 | 2025-06-14 | [60076](https://github.com/airbytehq/airbyte/pull/60076) | Update dependencies |
| 0.0.4 | 2025-05-03 | [59090](https://github.com/airbytehq/airbyte/pull/59090) | Update dependencies |
| 0.0.3 | 2025-04-19 | [58522](https://github.com/airbytehq/airbyte/pull/58522) | Update dependencies |
| 0.0.2 | 2025-04-12 | [57891](https://github.com/airbytehq/airbyte/pull/57891) | Update dependencies |
| 0.0.1 | 2025-04-06 | [57494](https://github.com/airbytehq/airbyte/pull/57494) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
