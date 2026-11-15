---
generated_record: true
connector_name: Pulsar
connector_type: destination
connector_slug: pulsar
connector_directory: destination-pulsar
definition_id: 2340cbba-358e-11ec-8d3d-0242ac130203
version: 0.1.3
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/pulsar
logo: /images/connectors/destinations/pulsar.svg
logo_source_path: airbyte-integrations/connectors/destination-pulsar/icon.svg
logo_sha256: 54722eaf41345ca1e760ea77fe8c632cee22a4fa86268900894f13981012fff2
original_metadata_path: airbyte-integrations/connectors/destination-pulsar/metadata.yaml
original_metadata_sha256: 9257130036d1ff59196461be39ad216ae044a925e49c948290fbf5e9a03cada1
original_document_path: docs/integrations/destinations/pulsar.md
original_document_sha256: 497aba7a7e911e69d463097fa76055e4e13803a34bd4dd5546abd5067bd7e1f9
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 72fcf2f1be47545546f71b4fdcd460b52caa50b855f54aba3bf8dfadb3d886ba
rewritten_at: 2026-11-12T13:26:43.560123+00:00
---

# Pulsar

## How Pulsar syncs data

The Airbyte Pulsar destination syncs your data to Pulsar. It writes each stream to the corresponding Pulsar topic.

## Prerequisites

- If you use Airbyte Open Source with the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to `v0.40.0-alpha` or newer. Upgrade your Pulsar connector to `0.1.3` or newer.

### How syncing works

#### Output schema

Each stream is written to a Pulsar topic.

This connector currently writes data only in JSON format. More formats \(e.g. Apache Avro\) will be supported in future.

Each record key contains the uuid assigned by Airbyte. Its value contains these 3 fields:

- `_airbyte_ab_id`: a uuid assigned by Airbyte to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a json blob containing the event data, encoded in base64.
- `_airbyte_stream`: the name of each record's stream.

#### Features

| Feature                        | Supported?\(Yes/No\) | Notes |
| :----------------------------- | :------------------- | :---- |
| Full Refresh Sync              | No                   |       |
| Incremental - Append Sync      | Yes                  |       |
| Incremental - Append + Deduped | No                   |       |
| Namespaces                     | Yes                  |       |

## Get started

### Requirements

You’ll need the following to use the Pulsar destination:

- A Pulsar cluster 2.8 or above.

### Setup guide

#### Network access

Make sure Airbyte can access your Pulsar brokers.

#### **Permissions**

Allow Airbyte to write messages to topics. Create these topics before writing to Pulsar. Alternatively, enable `allowAutoTopicCreation` in the brokers. This option isn’t recommended for production environments.

If you use dynamic topic names, you’ll probably need to enable `allowAutoTopicCreation`. This prevents connection failures after source connector schema updates. Otherwise, a hardcoded topic name may be best.

Messages are sent to topics using their `topic_type`, based on the configured Pulsar `topic_tenant` and `topic_namespace` settings.

#### Target topics

Set target topics through the `topic_pattern` parameter in its corresponding Pulsar `topic_tenant`-`topic_namespace`. You can use one hardcoded, predefined topic. Alternatively, write dynamically to different topics based on the [namespace](https://docs.airbyte.com/understanding-airbyte/namespaces) or originating stream.

To write all messages to one hardcoded topic, enter its name in the `topic_pattern` field. For example, setting `topic_pattern` to `my-topic-name` writes messages from every stream and namespace to that topic.

Use the `{namespace}` and `{stream}` pattern variables to define output topics dynamically. These variables direct messages to topics using values present when records are produced. For example, set `topic_pattern` to `airbyte_syncs/{namespace}/{stream}`. Messages from namespace `n1` and stream `s1` are written to topic `airbyte_syncs/n1/s1`. Messages from `s2` are written to `airbyte_syncs/n1/s2`, and so on.

If you define output topics dynamically, you might want to enable `allowAutoTopicCreation`. This prevents connection failures after source connector schema updates. Otherwise, you’ll need to create Pulsar topics manually as they’re added or updated in the source. This is the recommended option for production environments.

**NOTICE**: The `StandardNameTransformer` applies a naming convention transformation to the target topic name. This replaces some special characters.

### Set up Pulsar in Airbyte

You can now configure Pulsar as a destination in the UI. The Pulsar destination includes the following parameters. Many are optional or have default values:

- **Pulsar brokers**
- **Use TLS**
- **Topic type**
- **Topic tenant**
- **Topic namespace**
- **Topic pattern**
- **Test topic**
- **Producer name**
- **Sync producer**
- **Compression type**
- **Message send timeout**
- **Max pending messages**
- **Max pending messages across partitions**
- **Enable batching**
- **Batching max messages**
- **Batching max publish delay**
- **Block if queue is full**

See the [Pulsar producer configs documentation site](https://pulsar.apache.org/docs/en/client-libraries-java/#producer) for more information.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                        |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------------------------------------- |
| 0.1.3   | 2022-08-05 | [15349](https://github.com/airbytehq/airbyte/pull/15349) | Update Pulsar destination to use outputRecordCollector to properly store state |

</details>
