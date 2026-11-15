---
generated_record: true
connector_name: Commission Junction (CJ Affiliate)
connector_type: source
connector_slug: commission-junction
connector_directory: source-commission-junction
definition_id: b2ad3cc6-5d5d-4a81-96b9-58d4bc4be9b9
version: 0.0.15
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/commission-junction
logo: /images/connectors/sources/commission-junction.svg
logo_source_path: airbyte-integrations/connectors/source-commission-junction/icon.svg
logo_sha256: ddc196536d9090e0ad8a5debe302ed105a80a52808594440ecd6fedbfbfbdc37
original_metadata_path: airbyte-integrations/connectors/source-commission-junction/metadata.yaml
original_metadata_sha256: d2eef4e6cbcf7610747e45062f87980ef000fb808a444e7e805bea6530379a27
original_document_path: docs/integrations/sources/commission-junction.md
original_document_sha256: 08007d4bb544d4f9f02b4de369776bf7c05e7388aaa59d149145ab5ab8055338
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9cad7a08352a0661bb60ae254c460df150be4f4c5cdbb17fa2024c8e5b2d4eaf
rewritten_at: 2026-11-12T13:34:08.666371+00:00
---

# Commission Junction (CJ Affiliate)
CJ Affiliate, formerly Commission Junction, is one of the world&#39;s largest and most established affiliate marketing networks.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `cid` | `string` | CID.  |  |
| `start_date` | `string` | start_date.  | 2025-02-01T00:00:00Z |
| `personal_access_token` | `string` | Personal Access Token. Your CJ API personal access token. You can create and manage tokens at https://developers.cj.com/account/personal-access-tokens. Make sure to keep this token secure and do not share it publicly. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| AdvertiserCommissions | commissionId | DefaultPaginator | ✅ |  ✅  |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.15 | 2026-11-10 | [91477](https://github.com/airbytehq/airbyte/pull/91477) | Update dependencies |
| 0.0.14 | 2026-11-03 | [90515](https://github.com/airbytehq/airbyte/pull/90515) | Update dependencies |
| 0.0.13 | 2026-10-27 | [89858](https://github.com/airbytehq/airbyte/pull/89858) | Update dependencies |
| 0.0.12 | 2026-10-20 | [89146](https://github.com/airbytehq/airbyte/pull/89146) | Update dependencies |
| 0.0.11 | 2026-10-13 | [88584](https://github.com/airbytehq/airbyte/pull/88584) | Update dependencies |
| 0.0.10 | 2026-10-06 | [87799](https://github.com/airbytehq/airbyte/pull/87799) | Update dependencies |
| 0.0.9 | 2026-09-29 | [87102](https://github.com/airbytehq/airbyte/pull/87102) | Update dependencies |
| 0.0.8 | 2026-09-22 | [86585](https://github.com/airbytehq/airbyte/pull/86585) | Update dependencies |
| 0.0.7 | 2026-09-15 | [85992](https://github.com/airbytehq/airbyte/pull/85992) | Update dependencies |
| 0.0.6 | 2026-09-08 | [85453](https://github.com/airbytehq/airbyte/pull/85453) | Update dependencies |
| 0.0.5 | 2026-08-18 | [84537](https://github.com/airbytehq/airbyte/pull/84537) | Update dependencies |
| 0.0.4 | 2026-08-11 | [83873](https://github.com/airbytehq/airbyte/pull/83873) | Update dependencies |
| 0.0.3 | 2026-08-04 | [83420](https://github.com/airbytehq/airbyte/pull/83420) | Update dependencies |
| 0.0.2 | 2026-07-28 | [82883](https://github.com/airbytehq/airbyte/pull/82883) | Update dependencies |
| 0.0.1 | 2026-06-30 | [81336](https://github.com/airbytehq/airbyte/pull/81336) | Initial release by [@Ella6882](https://github.com/Ella6882) via Connector Builder |

</details>
