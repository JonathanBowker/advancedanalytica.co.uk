---
generated_record: true
connector_name: Acuity Scheduling
connector_type: source
connector_slug: acuity-scheduling
connector_directory: source-acuity-scheduling
definition_id: bc7db25c-bdfb-4ec2-96ae-a4687cead916
version: 0.0.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/acuity-scheduling
logo: /images/connectors/sources/acuity-scheduling.svg
logo_source_path: airbyte-integrations/connectors/source-acuity-scheduling/icon.svg
logo_sha256: 363647bbaeb9ee787682a910233ceb4c18052a24dfc90a3a2469c14732829a2b
original_metadata_path: airbyte-integrations/connectors/source-acuity-scheduling/metadata.yaml
original_metadata_sha256: 4641377ab6661814ba32d63e94d7611eecad7eefb74f9051079cd8ab5e92be26
original_document_path: docs/integrations/sources/acuity-scheduling.md
original_document_sha256: 9149a7f4ee7eb86d69c76d5756eb497eb22f5d5031c9d2ec7cdc44814b0cea83
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 55e240cc38864ab3f63c03b1153f02dfe4ed0fefe888fc136094ed1f6fd67277
rewritten_at: 2026-11-12T13:28:40.622016+00:00
---

# Acuity Scheduling
Flexible scheduling software that helps you succeed
Manage seamless client scheduling, secure payments and automated workflows. You only need to show up on time.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `username` | `string` | Username.  |  |
| `password` | `string` | Password.  |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| appointments | id | No pagination | ✅ |  ✅  |
| calendars | id | No pagination | ✅ |  ❌  |
| clients | email | No pagination | ✅ |  ❌  |
| appointment-types | id | No pagination | ✅ |  ❌  |
| blocks | id | No pagination | ✅ |  ✅  |
| labels | id | No pagination | ✅ |  ❌  |
| forms | id | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.4 | 2026-11-09 | [91315](https://github.com/airbytehq/airbyte/pull/91315) | Upgrade base image to `source-declarative-manifest:7.47.0` |
| 0.0.3 | 2026-10-08 | [88363](https://github.com/airbytehq/airbyte/pull/88363) | Replace the default Airbyte icon with the Acuity Scheduling logo |
| 0.0.2 | 2026-04-21 | [76492](https://github.com/airbytehq/airbyte/pull/76492) | Update dependencies |
| 0.0.1 | 2025-07-02 | | Initial release by [@chanronson](https://github.com/chanronson) via Connector Builder |

</details>
