---
generated_record: true
connector_name: Curve
connector_type: source
connector_slug: defillama
connector_directory: source-defillama
definition_id: df19571f-208a-4a12-a402-a4cdf70a44d6
version: 0.0.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/defillama
logo: /images/connectors/sources/defillama.svg
logo_source_path: airbyte-integrations/connectors/source-defillama/icon.svg
logo_sha256: 70b30ba5839c3e38846ea75fd53b036c69c7fef0c3ddfab9f7759603bfebbd08
original_metadata_path: airbyte-integrations/connectors/source-defillama/metadata.yaml
original_metadata_sha256: 331d23cc36671699cf4a12abe25ce395f56948d7530b484149d5aaa78ac70543
original_document_path: docs/integrations/sources/defillama.md
original_document_sha256: 67a80593ed09261c9486cd98ec26e16c4386f9e53c40c630a374fa48b201aacb
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9eddc803df00d65d8772b8dd30a415bc8c76abc9a01edc46af9389b8e350cf66
rewritten_at: 2026-11-12T13:34:50.449123+00:00
---

# Curve
Curve token TVL data

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| Defillama |  | No pagination | ✅ |  ❌  |

## IP allow list

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and your organisation restricts access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.4 | 2026-11-09 | [91372](https://github.com/airbytehq/airbyte/pull/91372) | Upgrade to source-declarative-manifest base image 7.47.0 |
| 0.0.3 | 2026-10-08 | [88363](https://github.com/airbytehq/airbyte/pull/88363) | Replace the default Airbyte icon with the DefiLlama logo |
| 0.0.2 | 2026-04-21 | [76566](https://github.com/airbytehq/airbyte/pull/76566) | Update dependencies |
| 0.0.1 | 2025-08-03 | | Initial release by [@Ismailabdulraheem](https://github.com/Ismailabdulraheem) via Connector Builder |

</details>
