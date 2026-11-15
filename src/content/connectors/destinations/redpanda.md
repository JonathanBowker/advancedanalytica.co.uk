---
generated_record: true
connector_name: Redpanda
connector_type: destination
connector_slug: redpanda
connector_directory: destination-redpanda
definition_id: 825c5ee3-ed9a-4dd1-a2b6-79ed722f7b13
version: 0.1.0
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/redpanda
logo: /images/connectors/destinations/redpanda.svg
logo_source_path: airbyte-integrations/connectors/destination-redpanda/icon.svg
logo_sha256: bbf934d69fdd8f9394bf3a79fb411b592c656e8ea1ed694792a375872fbc3bf6
original_metadata_path: airbyte-integrations/connectors/destination-redpanda/metadata.yaml
original_metadata_sha256: 31a7aab9e8c90a5113f2ef2ae51d53c6378754931f737217b076b8ff6cba3c3f
original_document_path: docs/integrations/destinations/redpanda.md
original_document_sha256: 8b09e83ac75a1cdbf9a917965d70223f7866f88a4dbedc424d6572ba7b47c4e4
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4a17f78db71f9f66b49a75444a7b3fff41d776828a4a3b9b15945b47f0ae56df
rewritten_at: 2026-11-12T13:26:47.060740+00:00
---

# Redpanda

The Airbyte Redpanda destination connector syncs your data to [Redpada](https://redpanda.com/). It writes each stream to the corresponding Redpanda topic.

## Sync overview

### Output schema

Each stream is written to a Redpanda topic.

Each Redpanda topic uses the following format: `{namespace}_{stream}`

This connector currently writes data only in JSON format. More formats, such as Apache Avro, will be supported in future.

Each record's key contains the UUID assigned by Airbyte. Its value contains these three fields:

- `_airbyte_ab_id`: a UUID assigned by Airbyte to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a JSON blob containing the event data.

### Data type mapping

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |

### Features

This section uses the following table format:

| Feature                        | Supported?\(Yes/No\) | Notes |
| :----------------------------- | :------------------- | :---- |
| Full Refresh Sync              | No                   |       |
| Incremental - Append Sync      | Yes                  |       |
| Incremental - Append + Deduped | No                   |       |
| Namespaces                     | Yes                  |       |

### Performance

With enough Redpanda nodes and partitions, the cluster should handle any connector load.

## Get started

### Requirements

- The connector should be able to create topics using the [AdminClient](https://docs.confluent.io/platform/current/installation/configuration/admin-configs.html)
- Configuration options:
  - **Bootstrap servers**
  - **Buffer Memory**
  - **Compression Type**
  - **Batch Size**
  - **Retries**
  - **Number of topic partitions**
  - **Topic replication factor**
  - **Socket Connection Setup Timeout**
  - **Socket Connection Setup Max Timeout**

You can find more information in the [Redpanda producer configs documentation site](https://docs.confluent.io/platform/current/installation/configuration/producer-configs.html).

_NOTE_: SSL configurations aren't available yet.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject        |
| :------ | :--------- | :------------------------------------------------------- | :------------- |
| 0.1.0   | 2022-08-05 | [18884](https://github.com/airbytehq/airbyte/pull/18884) | Initial commit |

</details>
