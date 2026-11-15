---
generated_record: true
connector_name: Pingdom
connector_type: source
connector_slug: pingdom
connector_directory: source-pingdom
definition_id: 14fb7a17-a371-4ebc-a072-b339c4daa4c1
version: 0.0.2
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pingdom
logo: /images/connectors/sources/pingdom.svg
logo_source_path: airbyte-integrations/connectors/source-pingdom/icon.svg
logo_sha256: c5f2eec0655463e64e784ee93aaeaaec8610db0c66e796fd8240ac3f5b22d645
original_metadata_path: airbyte-integrations/connectors/source-pingdom/metadata.yaml
original_metadata_sha256: e0ac8933ef04cda18c1754c2fe9bedccc39e1d779d5a6b28cf29710f537893a8
original_document_path: docs/integrations/sources/pingdom.md
original_document_sha256: b3e0dade6c4b66766e418e361801f8687bc87889013d3e6c827b387e542d66c6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ca45fa653e64400b09bc6dd9b821f2292e382037332fdc5bf7b3ebaacaa81ce0
rewritten_at: 2026-11-12T13:50:53.592268+00:00
---

# Pingdom
This source can sync these core streams:

- [checks](https://docs.pingdom.com/api/#tag/Checks/paths/~1checks/get)
- [performance](https://docs.pingdom.com/api/#tag/Summary.performance/paths/~1summary.performance~1{checkid}/get)

## Requirements

- **Pingdom API Key**.[required] See [PingDom API docs](https://docs.pingdom.com/api/#section/Authentication) for details on obtaining the API token.
- **Start date**.[required]. Fetch data from this point. Use only for incremental syncing.
- **Probes**[optional]. Filter results using a list of probes. Use a comma-separated list of probe identifiers.
- **Resolution**[optional]. Interval Size. Choose `hour`, `day` or `week`. Default: `hour`

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `probes` | `string` | probes.  |  |
| `api_key` | `string` | API Key.  |  |
| `resolution` | `string` | resolution.  | hour |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| checks | id | DefaultPaginator | ✅ |  ❌  |
| performance |  | No pagination | ✅ |  ✅  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date       | Subject        |
|------------------|------------|----------------|
| 0.0.2 | 2026-11-09 | Update to CDK v7 (source-declarative-manifest 7.47.0) ([91419](https://github.com/airbytehq/airbyte/pull/91419)) |
| 0.0.1 | 2024-12-03 | Initial release by [@KimPlv](https://github.com/KimPlv) via Connector Builder|

</details>
