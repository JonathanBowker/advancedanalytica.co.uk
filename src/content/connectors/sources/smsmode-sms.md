---
generated_record: true
connector_name: smsmode SMS
connector_type: source
connector_slug: smsmode-sms
connector_directory: source-smsmode-sms
definition_id: 58bf5021-0dc4-46d3-b834-bf576ee27748
version: 0.0.11
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/smsmode-sms
logo: /images/connectors/sources/smsmode-sms.svg
logo_source_path: airbyte-integrations/connectors/source-smsmode-sms/icon.svg
logo_sha256: f9a77d0d428b6a21e89ac1c67ad2f82aaf7dfad32a231e5757cebe979185c997
original_metadata_path: airbyte-integrations/connectors/source-smsmode-sms/metadata.yaml
original_metadata_sha256: c5850425471a5beea3ef20f2299263a4adfad3e7ecd6831d67fe3c7e0b2236bb
original_document_path: docs/integrations/sources/smsmode-sms.md
original_document_sha256: be443847d71b123b9c66fc2bb12713ac1650c3280a0e63cab4d76d7237e194be
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ad761417b8b44d72206c33f29e7ff5b8ebd8822d84bcb71c423c9d3c87e73844
rewritten_at: 2026-11-12T13:56:35.257206+00:00
---

# smsmode SMS
This source connector synchronises message logs and general consumption data from the smsmode API for standard SMS services.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Your smsmode API key. You can generate and manage API keys in the smsmode dashboard under the &#39;Credentials&#39; section: https://dev.smsmode.com/commons/v1/#tag/Credential. Make sure the key is active and has the required permissions for your use case. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| messages |  | DefaultPaginator | ✅ |  ❌  |
| consumptions | consumptionId | DefaultPaginator | ✅ |  ❌  |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.11 | 2026-11-10 | [91750](https://github.com/airbytehq/airbyte/pull/91750) | Update dependencies |
| 0.0.10 | 2026-11-03 | [90771](https://github.com/airbytehq/airbyte/pull/90771) | Update dependencies |
| 0.0.9 | 2026-10-27 | [90057](https://github.com/airbytehq/airbyte/pull/90057) | Update dependencies |
| 0.0.8 | 2026-10-20 | [89427](https://github.com/airbytehq/airbyte/pull/89427) | Update dependencies |
| 0.0.7 | 2026-10-13 | [88816](https://github.com/airbytehq/airbyte/pull/88816) | Update dependencies |
| 0.0.6 | 2026-10-06 | [88071](https://github.com/airbytehq/airbyte/pull/88071) | Update dependencies |
| 0.0.5 | 2026-09-29 | [87358](https://github.com/airbytehq/airbyte/pull/87358) | Update dependencies |
| 0.0.4 | 2026-09-22 | [86847](https://github.com/airbytehq/airbyte/pull/86847) | Update dependencies |
| 0.0.3 | 2026-09-15 | [86240](https://github.com/airbytehq/airbyte/pull/86240) | Update dependencies |
| 0.0.2 | 2026-09-08 | [85688](https://github.com/airbytehq/airbyte/pull/85688) | Update dependencies |
| 0.0.1 | 2026-06-15 | | Initial release by [@CaladeTechnologies](https://github.com/CaladeTechnologies) via Connector Builder |

</details>
