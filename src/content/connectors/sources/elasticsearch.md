---
generated_record: true
connector_name: Elasticsearch
connector_type: source
connector_slug: elasticsearch
connector_directory: source-elasticsearch
definition_id: 7cf88806-25f5-4e1a-b422-b2fa9e1b0090
version: 0.1.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/elasticsearch
logo: /images/connectors/sources/elasticsearch.svg
logo_source_path: airbyte-integrations/connectors/source-elasticsearch/icon.svg
logo_sha256: 6b141da978e2cd8bc1eca3ffe2b8abd0f232e4c693f068e3b93cdc4a6cb6b346
original_metadata_path: airbyte-integrations/connectors/source-elasticsearch/metadata.yaml
original_metadata_sha256: 7c92eb3343589e54b72431897ec94ab22c009b41ecf510f76f815a4f35528cf0
original_document_path: docs/integrations/sources/elasticsearch.md
original_document_sha256: b064f0020a8fa11fdaad852b50fd28984e5e6f755dbf491762d3334f71ecc583
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 04613a36d4528f46ee2d949fc1a8319e329b68d256bf2681b0e74c596878bfde
rewritten_at: 2026-11-12T13:36:08.699535+00:00
---

# Elasticsearch

Set up the Elasticsearch source connector and find its reference information here.

## Before you start

### What you need

- Elasticsearch endpoint URL
- Elasticsearch credentials (optional)

## Supported sync modes

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

This source syncs data from an ElasticSearch domain.

## Supported streams

You can sync any index because this source automatically discovers all indices in the domain.

## Performance

The underlying service may rate limit ElasticSearch calls.
Limits vary by deployment.

## Data type map

Elasticsearch data types: https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html

Airbyte data types: https://docs.airbyte.com/understanding-airbyte/supported-data-types/

Elasticsearch has no dedicated array data type.
By default, any field can contain zero or more values.
However, all values in an array must share the same data type.
Therefore, every field can also be an array.

| Integration Type          | Airbyte Type                               | Notes |
| :------------------------ | :----------------------------------------- | :---- |
| `binary`                  | `["string", "array"]`                      |       |
| `boolean`                 | `["boolean", "array"]`                     |       |
| `keyword`                 | `["string", "array", "number", "integer"]` |       |
| `constant_keyword`        | `["string", "array", "number", "integer"]` |       |
| `wildcard`                | `["string", "array", "number", "integer"]` |       |
| `long`                    | `["integer", "array"]`                     |       |
| `unsigned_long`           | `["integer", "array"]`                     |       |
| `integer`                 | `["integer", "array"]`                     |       |
| `short`                   | `["integer", "array"]`                     |       |
| `byte`                    | `["integer", "array"]`                     |       |
| `double`                  | `["number", "array"]`                      |       |
| `float`                   | `["number", "array"]`                      |       |
| `half_float`              | `["number", "array"]`                      |       |
| `scaled_float`            | `["number", "array"]`                      |       |
| `date`                    | `["string", "array"]`                      |       |
| `date_nanos`              | `["number", "array"]`                      |       |
| `object`                  | `["object", "array"]`                      |       |
| `flattened`               | `["object", "array"]`                      |       |
| `nested`                  | `["object", "string"]`                     |       |
| `join`                    | `["object", "string"]`                     |       |
| `integer_range`           | `["object", "array"]`                      |       |
| `float_range`             | `["object", "array"]`                      |       |
| `long_range`              | `["object", "array"]`                      |       |
| `double_range`            | `["object", "array"]`                      |       |
| `date_range`              | `["object", "array"]`                      |       |
| `ip_range`                | `["object", "array"]`                      |       |
| `ip`                      | `["string", "array"]`                      |       |
| `version`                 | `["string", "array"]`                      |       |
| `murmur3`                 | `["string", "array", "number", "integer"]` |       |
| `aggregate_metric_double` | `["string", "array", "number", "integer"]` |       |
| `histogram`               | `["string", "array", "number", "integer"]` |       |
| `text`                    | `["string", "array", "number", "integer"]` |       |
| `alias`                   | `["string", "array", "number", "integer"]` |       |
| `search_as_you_type`      | `["string", "array", "number", "integer"]` |       |
| `token_count`             | `["string", "array", "number", "integer"]` |       |
| `dense_vector`            | `["string", "array", "number", "integer"]` |       |
| `geo_point`               | `["string", "array", "number", "integer"]` |       |
| `geo_shape`               | `["string", "array", "number", "integer"]` |       |
| `shape`                   | `["string", "array", "number", "integer"]` |       |
| `point`                   | `["string", "array", "number", "integer"]` |       |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                        |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------- |
| 0.1.5 | 2025-07-10 | [62918](https://github.com/airbytehq/airbyte/pull/62918) | Convert to new gradle build flow |
| 0.1.4 | 2025-01-10 | [51509](https://github.com/airbytehq/airbyte/pull/51509) | Use a non root base image |
| 0.1.3 | 2024-12-18 | [49863](https://github.com/airbytehq/airbyte/pull/49863) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.1.2 | 2024-02-13 | [35230](https://github.com/airbytehq/airbyte/pull/35230) | Adopt CDK 0.20.4 |
| `0.1.2` | 2024-01-24 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version               |
| `0.1.1` | 2022-12-02 | [18118](https://github.com/airbytehq/airbyte/pull/18118) | Avoid too_long_frame_exception |
| `0.1.0` | 2022-07-12 | [14118](https://github.com/airbytehq/airbyte/pull/14118) | Initial Release                |

</details>
