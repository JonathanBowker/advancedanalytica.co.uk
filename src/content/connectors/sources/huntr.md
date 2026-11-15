---
generated_record: true
connector_name: Huntr
connector_type: source
connector_slug: huntr
connector_directory: source-huntr
definition_id: e1b1016c-04d5-41e6-b4ed-46f0893bb02a
version: 0.1.6
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/huntr
logo: /images/connectors/sources/huntr.svg
logo_source_path: airbyte-integrations/connectors/source-huntr/icon.svg
logo_sha256: 8d94ddbedb2e8a006d9236883fa443d568219b3f53e6dcac3cb97bd118850ff8
original_metadata_path: airbyte-integrations/connectors/source-huntr/metadata.yaml
original_metadata_sha256: f9c2af1b7f02c332364fca4acf1f76b53dc155b3f3ce236df26269268cdced29
original_document_path: docs/integrations/sources/huntr.md
original_document_sha256: a4430294243b495b9c8d2d8b142877b458d17b739a4a59cde0c8d0c4e51565e1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 225ed84550f3e321cd51dbd4f7773eb4ad813171dd17672885423e4d5c59a40f
rewritten_at: 2026-11-12T13:42:44.609977+00:00
---

# Huntr
Connect to the Huntr application.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| members | id | DefaultPaginator | ✅ |  ❌  |
| organization_invitations | id | DefaultPaginator | ✅ |  ❌  |
| member_fields | id | DefaultPaginator | ✅ |  ❌  |
| activities | id | DefaultPaginator | ✅ |  ❌  |
| notes | id | DefaultPaginator | ✅ |  ❌  |
| actions | id | DefaultPaginator | ✅ |  ❌  |
| candidates | id | DefaultPaginator | ✅ |  ❌  |

## Allow IP addresses

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and restrict access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|---------|------|--------------|---------|
| 0.1.6 | 2026-11-10 | [91578](https://github.com/airbytehq/airbyte/pull/91578) | Update dependencies |
| 0.1.5 | 2026-11-03 | [90617](https://github.com/airbytehq/airbyte/pull/90617) | Update dependencies |
| 0.1.4 | 2026-10-27 | [89962](https://github.com/airbytehq/airbyte/pull/89962) | Update dependencies |
| 0.1.3 | 2026-10-20 | [89252](https://github.com/airbytehq/airbyte/pull/89252) | Update dependencies |
| 0.1.2 | 2026-10-13 | [88653](https://github.com/airbytehq/airbyte/pull/88653) | Update dependencies |
| 0.1.1 | 2026-10-07 | [PR](https://github.com/airbytehq/airbyte/pull/88309) | Update base image to `source-declarative-manifest:7.33.0` so the connector image builds again |
| 0.1.0 | 2025-01-29 | | Add new streams |
| 0.0.1 | 2025-01-15 | | Initial release by [@krokrob](https://github.com/krokrob) via Connector Builder|

</details>
