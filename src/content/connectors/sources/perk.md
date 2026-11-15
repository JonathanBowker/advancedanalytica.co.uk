---
generated_record: true
connector_name: Perk
connector_type: source
connector_slug: perk
connector_directory: source-perk
definition_id: 5b86cbfa-a6aa-4f18-96bf-107789218ea7
version: 0.0.2
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/perk
logo: /images/connectors/sources/perk.svg
logo_source_path: airbyte-integrations/connectors/source-perk/icon.svg
logo_sha256: 32a9a2a345de1b4fb0e571e472289f19ab53cd0ee05563e764f906e87dd37ac8
original_metadata_path: airbyte-integrations/connectors/source-perk/metadata.yaml
original_metadata_sha256: de9104662c0eeff0b1c85ffa765016c017d0139c013178831e65b0744a604ff2
original_document_path: docs/integrations/sources/perk.md
original_document_sha256: 1f3edabe1afc4475e933d1afd81f1c50a95d32694ca3d9262bfcb31c22091d39
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3b3e7299e2e9e730df4240dfb0f9c1feb2030af4404fdad73e140983a2c03f02
rewritten_at: 2026-11-12T13:50:36.944991+00:00
---

# Perk
Sync travel and spend data from Perk to your data warehouse.
This source connector syncs users, trips, bookings, cost centers, invoices, invoice lines and profiles.
You’ll need your Perk API key and the start date for syncing data.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `start_date` | `string` | Start Date. ISO8601 Date-time (e.g. 2024-09-19T00:00:00Z) |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| users |  | DefaultPaginator | ✅ |  ❌  |
| trips |  | DefaultPaginator | ✅ |  ✅  |
| bookings |  | DefaultPaginator | ✅ |  ✅  |
| cost_centers |  | DefaultPaginator | ✅ |  ❌  |
| invoices |  | DefaultPaginator | ✅ |  ✅  |
| profiles |  | DefaultPaginator | ✅ |  ❌  |
| invoices_lines |  | DefaultPaginator | ✅ |  ✅  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.2 | 2026-11-09 | [91406](https://github.com/airbytehq/airbyte/pull/91406) | Update dependencies |
| 0.0.1 | 2026-02-16 | | Initial release by [@claudiangr](https://github.com/claudiangr) via Connector Builder |

</details>
