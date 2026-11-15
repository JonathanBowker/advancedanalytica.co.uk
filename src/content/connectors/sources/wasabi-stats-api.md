---
generated_record: true
connector_name: Wasabi
connector_type: source
connector_slug: wasabi-stats-api
connector_directory: source-wasabi-stats-api
definition_id: 6b0d43cb-8d31-4f9f-9832-6e577aa80db4
version: 0.0.7
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/wasabi-stats-api
logo: /images/connectors/sources/wasabi-stats-api.svg
logo_source_path: airbyte-integrations/connectors/source-wasabi-stats-api/icon.svg
logo_sha256: b95550e31b3ae4b9c686923c545c018bf676488d98282f9b9efbaabdee6f1028
original_metadata_path: airbyte-integrations/connectors/source-wasabi-stats-api/metadata.yaml
original_metadata_sha256: 1adb31b07d1d5bb5ca848ebe666ab4bd338ca7081b49490b71345cb8b15087c6
original_document_path: docs/integrations/sources/wasabi-stats-api.md
original_document_sha256: f63fedb0246c511de5bd767f7b88864771093ad3e1f2d7b16c1b7b7b8ea761c0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f07c21cf8c8c4f8417e9a2cdd01dbd54f4632b40e4fbb9bd167778473714e0f2
rewritten_at: 2026-11-12T14:00:08.802157+00:00
---

# Wasabi
Connect to the https://www.wasabi.com stats API.
API documentation: https://docs.wasabi.com/apidocs/wasabi-stats-api

:::info
This connector ingests stats information from the Wasabi server.
It **does not** ingest content from files stored in Wasabi.
:::

## Prerequisites

The Wasabi Stats API authenticates using a Wasabi access key pair. Send the pair as `AccessKey:SecretKey` in the `Authorization` header.

The keys must belong to the **Root user** or an authorised sub-user. The sub-user must have the `WasabiAccountStatsAccess` policy for account-level stats and/or `WasabiBucketStatsAccess` for bucket-level stats.

Wasabi Account Control (WAC) API keys and plain S3-only sub-user keys are rejected with `403 Forbidden`.

See [Generating a Wasabi Stats API Key](https://docs.wasabi.com/apidocs/generating-a-wasabi-stats-api-key) and [Authentication With Wasabi Stats API](https://docs.wasabi.com/apidocs/authentication-with-wasabi-stats-api).

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. The API key format is `AccessKey:SecretKey` |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| Standalone Utilizations |  | DefaultPaginator | ✅ |  ✅  |
| Standalone Bucket Utilizations |  | DefaultPaginator | ✅ |  ✅  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|---------|------|--------------|---------|
| 0.0.7 | 2026-11-10 | [90822](https://github.com/airbytehq/airbyte/pull/90822) | Update dependencies |
| 0.0.6 | 2026-10-27 | [90097](https://github.com/airbytehq/airbyte/pull/90097) | Update dependencies |
| 0.0.5 | 2026-10-20 | [89473](https://github.com/airbytehq/airbyte/pull/89473) | Update dependencies |
| 0.0.4 | 2026-10-13 | [88876](https://github.com/airbytehq/airbyte/pull/88876) | Update dependencies |
| 0.0.3 | 2026-10-07 | [88189](https://github.com/airbytehq/airbyte/pull/88189) | Return an actionable `config_error` on HTTP 401/403 (credentials lacking Stats API access), bump base image to `source-declarative-manifest:7.33.0` (the pinned 5.17.0 image no longer builds), document key requirements, fix stale Wasabi docs links |
| 0.0.2 | 2026-06-02 | [79045](https://github.com/airbytehq/airbyte/pull/79045) | Update dependencies |
| 0.0.1 | 2024-10-25 | | Initial release by [@dainiussa](https://github.com/dainiussa) via Connector Builder |

</details>
