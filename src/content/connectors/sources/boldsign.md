---
generated_record: true
connector_name: BoldSign
connector_type: source
connector_slug: boldsign
connector_directory: source-boldsign
definition_id: b013676a-2286-4f7a-bca4-811477207761
version: 0.0.47
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/boldsign
logo: /images/connectors/sources/boldsign.svg
logo_source_path: airbyte-integrations/connectors/source-boldsign/icon.svg
logo_sha256: 73b3ddd1a7b194f13059d4447ef00d38f4f7fe1eeae53ee4b37adcb8bca885b2
original_metadata_path: airbyte-integrations/connectors/source-boldsign/metadata.yaml
original_metadata_sha256: 2f1d4d06e293e8ea4f61fc01851b520d84a26d5870cbb95fe60b362609ad5eb3
original_document_path: docs/integrations/sources/boldsign.md
original_document_sha256: 31a4a805c3c2847fd90cd2339e213b8ea59b8f054344acf9516fa6f9374ad19b
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ad2a6485646e78c23cd7c707b1a16d2b1d4c91c51889be4a59ebdb98ca3d72f4
rewritten_at: 2026-11-12T13:31:29.930585+00:00
---

# BoldSign
Website: https://app.boldsign.com/
API Reference: https://developers.boldsign.com/api-overview/getting-started/?region=us

## Configure BoldSign

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Your BoldSign API key. You can generate it by navigating to the API menu in the BoldSign app, selecting &#39;API Key&#39;, and clicking &#39;Generate API Key&#39;. Copy the generated key and paste it here. |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| documents | documentId | DefaultPaginator | ✅ |  ✅  |
| brands | brandId | DefaultPaginator | ✅ |  ❌  |
| senderIdentities | email | DefaultPaginator | ✅ |  ❌  |
| teams | teamId | DefaultPaginator | ✅ |  ✅  |
| templates | documentId | DefaultPaginator | ✅ |  ✅  |
| users_list | userId | DefaultPaginator | ✅ |  ✅  |
| custom_fields | customFieldId | DefaultPaginator | ✅ |  ❌  |
| contacts | id | DefaultPaginator | ✅ |  ❌  |

## IP allow list

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and restrict access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.47 | 2026-11-10 | [91386](https://github.com/airbytehq/airbyte/pull/91386) | Update dependencies |
| 0.0.46 | 2026-11-03 | [90457](https://github.com/airbytehq/airbyte/pull/90457) | Update dependencies |
| 0.0.45 | 2026-10-27 | [89812](https://github.com/airbytehq/airbyte/pull/89812) | Update dependencies |
| 0.0.44 | 2026-10-20 | [89136](https://github.com/airbytehq/airbyte/pull/89136) | Update dependencies |
| 0.0.43 | 2026-10-13 | [88526](https://github.com/airbytehq/airbyte/pull/88526) | Update dependencies |
| 0.0.42 | 2026-10-06 | [87752](https://github.com/airbytehq/airbyte/pull/87752) | Update dependencies |
| 0.0.41 | 2026-09-29 | [87082](https://github.com/airbytehq/airbyte/pull/87082) | Update dependencies |
| 0.0.40 | 2026-09-22 | [86524](https://github.com/airbytehq/airbyte/pull/86524) | Update dependencies |
| 0.0.39 | 2026-09-15 | [85962](https://github.com/airbytehq/airbyte/pull/85962) | Update dependencies |
| 0.0.38 | 2026-09-08 | [84489](https://github.com/airbytehq/airbyte/pull/84489) | Update dependencies |
| 0.0.37 | 2026-08-11 | [83856](https://github.com/airbytehq/airbyte/pull/83856) | Update dependencies |
| 0.0.36 | 2026-08-04 | [83384](https://github.com/airbytehq/airbyte/pull/83384) | Update dependencies |
| 0.0.35 | 2026-07-28 | [82827](https://github.com/airbytehq/airbyte/pull/82827) | Update dependencies |
| 0.0.34 | 2026-07-21 | [82328](https://github.com/airbytehq/airbyte/pull/82328) | Update dependencies |
| 0.0.33 | 2026-07-14 | [81714](https://github.com/airbytehq/airbyte/pull/81714) | Update dependencies |
| 0.0.32 | 2026-06-30 | [80966](https://github.com/airbytehq/airbyte/pull/80966) | Update dependencies |
| 0.0.31 | 2026-06-23 | [80367](https://github.com/airbytehq/airbyte/pull/80367) | Update dependencies |
| 0.0.30 | 2026-06-16 | [79771](https://github.com/airbytehq/airbyte/pull/79771) | Update dependencies |
| 0.0.29 | 2026-06-09 | [79237](https://github.com/airbytehq/airbyte/pull/79237) | Update dependencies |
| 0.0.28 | 2026-06-02 | [78600](https://github.com/airbytehq/airbyte/pull/78600) | Update dependencies |
| 0.0.27 | 2026-04-28 | [77170](https://github.com/airbytehq/airbyte/pull/77170) | Update dependencies |
| 0.0.26 | 2026-04-21 | [76517](https://github.com/airbytehq/airbyte/pull/76517) | Update dependencies |
| 0.0.25 | 2026-03-31 | [75654](https://github.com/airbytehq/airbyte/pull/75654) | Update dependencies |
| 0.0.24 | 2026-03-17 | [74917](https://github.com/airbytehq/airbyte/pull/74917) | Update dependencies |
| 0.0.23 | 2026-02-24 | [73790](https://github.com/airbytehq/airbyte/pull/73790) | Update dependencies |
| 0.0.22 | 2026-02-03 | [72062](https://github.com/airbytehq/airbyte/pull/72062) | Update dependencies |
| 0.0.21 | 2026-01-14 | [71470](https://github.com/airbytehq/airbyte/pull/71470) | Update dependencies |
| 0.0.20 | 2025-12-18 | [70661](https://github.com/airbytehq/airbyte/pull/70661) | Update dependencies |
| 0.0.19 | 2025-11-25 | [69948](https://github.com/airbytehq/airbyte/pull/69948) | Update dependencies |
| 0.0.18 | 2025-11-18 | [69463](https://github.com/airbytehq/airbyte/pull/69463) | Update dependencies |
| 0.0.17 | 2025-10-29 | [68697](https://github.com/airbytehq/airbyte/pull/68697) | Update dependencies |
| 0.0.16 | 2025-10-21 | [68221](https://github.com/airbytehq/airbyte/pull/68221) | Update dependencies |
| 0.0.15 | 2025-10-14 | [67834](https://github.com/airbytehq/airbyte/pull/67834) | Update dependencies |
| 0.0.14 | 2025-10-07 | [67211](https://github.com/airbytehq/airbyte/pull/67211) | Update dependencies |
| 0.0.13 | 2025-09-30 | [65632](https://github.com/airbytehq/airbyte/pull/65632) | Update dependencies |
| 0.0.12 | 2025-08-09 | [64656](https://github.com/airbytehq/airbyte/pull/64656) | Update dependencies |
| 0.0.11 | 2025-07-12 | [63033](https://github.com/airbytehq/airbyte/pull/63033) | Update dependencies |
| 0.0.10 | 2025-07-05 | [62531](https://github.com/airbytehq/airbyte/pull/62531) | Update dependencies |
| 0.0.9 | 2025-06-28 | [62138](https://github.com/airbytehq/airbyte/pull/62138) | Update dependencies |
| 0.0.8 | 2025-06-21 | [61875](https://github.com/airbytehq/airbyte/pull/61875) | Update dependencies |
| 0.0.7 | 2025-06-15 | [59840](https://github.com/airbytehq/airbyte/pull/59840) | Update dependencies |
| 0.0.6 | 2025-05-03 | [59345](https://github.com/airbytehq/airbyte/pull/59345) | Update dependencies |
| 0.0.5 | 2025-04-26 | [58724](https://github.com/airbytehq/airbyte/pull/58724) | Update dependencies |
| 0.0.4 | 2025-04-19 | [58240](https://github.com/airbytehq/airbyte/pull/58240) | Update dependencies |
| 0.0.3 | 2025-04-12 | [57617](https://github.com/airbytehq/airbyte/pull/57617) | Update dependencies |
| 0.0.2 | 2025-04-05 | [57159](https://github.com/airbytehq/airbyte/pull/57159) | Update dependencies |
| 0.0.1 | 2025-04-04 | [57005](https://github.com/airbytehq/airbyte/pull/57005) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
