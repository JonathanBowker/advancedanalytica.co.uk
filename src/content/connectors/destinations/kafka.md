---
generated_record: true
connector_name: Kafka
connector_type: destination
connector_slug: kafka
connector_directory: destination-kafka
definition_id: 9f760101-60ae-462f-9ee6-b7a9dafd454d
version: 0.1.13
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/kafka
logo: /images/connectors/destinations/kafka.svg
logo_source_path: airbyte-integrations/connectors/destination-kafka/icon.svg
logo_sha256: 3bc4d7393421480730b52c723ee462461405be7ed7abf985dbecc6851c44af25
original_metadata_path: airbyte-integrations/connectors/destination-kafka/metadata.yaml
original_metadata_sha256: a1a927b253776916059ea9dbbc38fe83ed23d42fb003de161342dd366ee5f19b
original_document_path: docs/integrations/destinations/kafka.md
original_document_sha256: c507405d5c4e9f19bee2d0fa18ec8f5e99033a6ff0c45f1783c042d7ed824685
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 816fb672dc70c69ce15a5ba498796e568d997232ccc110aa3d51ca72e89ec24e
rewritten_at: 2026-11-12T13:24:46.675887+00:00
---

# Kafka

## Overview

Sync data to Kafka with the Airbyte Kafka destination. It writes each stream to the corresponding Kafka topic.

## Prerequisites

- If you use Airbyte Open Source with the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to version `v0.40.0-alpha` or newer. Upgrade your Kafka connector to version `0.1.10` or newer.

### Sync overview

#### Output schema

The connector outputs each stream to a Kafka topic.

This connector currently writes data only in JSON format. More formats \(e.g. Apache Avro\) will be supported in future.

Each record's key contains the uuid assigned by Airbyte. Its value contains these four fields:

- `_airbyte_ab_id`: a uuid that Airbyte assigns to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a json blob containing the event data.
- `_airbyte_stream`: the name of each record's stream.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | No |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started

### Requirements

To use the Kafka destination, you'll need:

- A Kafka cluster 1.0 or above.

### Setup guide

#### Network access

Make sure Airbyte can access your Kafka brokers.

#### **Permissions**

Allow Airbyte to write messages to topics. Create these topics before writing to Kafka. Alternatively, enable `auto.create.topics.enable` in the brokers, although this isn't recommended for production environments.

If you use dynamic topic names, you'll probably need to enable `auto.create.topics.enable`. This prevents connection failures after source connector schema updates. Otherwise, a hardcoded topic name may be best.

#### Target topics

Use the `topic_pattern` configuration parameter to choose where messages are written. You can use a hardcoded, pre-defined topic. Alternatively, write dynamically to different topics based on their [namespace](https://docs.airbyte.com/understanding-airbyte/namespaces) or source stream.

To write all messages to one hardcoded topic, enter its name in the `topic_pattern` field. For example, setting `topic_pattern` to `my-topic-name` writes all messages from every stream and namespace to that topic.

To define output topics dynamically, use the `{namespace}` and `{stream}` pattern variables. These variables route messages to different topics using the values available when producing records. For example, set the `topic_pattern` parameter to `airbyte_syncs/{namespace}/{stream}`. Messages from namespace `n1` and stream `s1` will then be written to topic `airbyte_syncs/n1/s1`. Messages from `s2` will be written to `airbyte_syncs/n1/s2`, and so on.

If you define output topics dynamically, consider enabling `auto.create.topics.enable`. This prevents connection failures after source connector schema updates. Otherwise, manually create Kafka topics as the source adds or updates them. Manual creation is recommended for production environments.

**NOTICE**: the `StandardNameTransformer` applies a naming convention transformation to the target topic name. This replaces some special characters.

### Set up the Kafka destination

You now have the requirements to configure Kafka as a destination in the UI. You can configure the following Kafka destination parameters. Many are optional or have default values:

- **Bootstrap servers**
- **Topic pattern**
- **Test topic**
- **Sync producer**
- **Security protocol**
- **SASL JAAS config**
- **SASL mechanism**
- **Client ID**
- **ACKs**
- **Enable idempotence**
- **Compression type**
- **Batch size**
- **Linger ms**
- **Max in flight requests per connection**
- **Client DNS lookup**
- **Buffer memory**
- **Max request size**
- **Retries**
- **Socket connection setup timeout**
- **Socket connection setup max timeout**
- **Max block ms**
- **Request timeout**
- **Delivery timeout**
- **Send buffer bytes**
- **Receive buffer bytes**

For more information, see the [Kafka producer configs documentation site](https://kafka.apache.org/documentation/#producerconfigs).

### Secure Airbyte Cloud connections

Airbyte Cloud requires TLS encryption for Kafka broker connections. The **Protocol** field offers only **SASL SSL** (`SASL_SSL`), while **SASL Mechanism** offers only `PLAIN`. Connection checks and write setup reject other protocols or mechanisms before creating a Kafka producer. This includes configurations submitted through the API. The Kafka client uses TLS for the broker connection. It doesn't fall back to plaintext if the TLS handshake fails.

On Airbyte Cloud, **SASL JAAS Config** must contain exactly one `org.apache.kafka.common.security.plain.PlainLoginModule` entry. Missing, malformed or unsupported JAAS configurations are rejected before connecting to Kafka.

Airbyte Open Source continues to support **PLAINTEXT**, **SASL PLAINTEXT** and **SASL SSL** without these Cloud-only restrictions. This connector doesn't expose custom SSL truststore or client-certificate settings.

#### Confluent Cloud API-key authentication

To authenticate with a Confluent Cloud Kafka cluster:

1. Set **Bootstrap servers** to your cluster's bootstrap endpoint.
2. Set **Protocol** to **SASL SSL**.
3. Set **SASL mechanism** to `PLAIN`.
4. Set **SASL JAAS config** to the following. Replace the placeholders with your Kafka API key and secret:

   ```text
   org.apache.kafka.common.security.plain.PlainLoginModule required username="YOUR_KAFKA_API_KEY" password="YOUR_KAFKA_API_SECRET";
   ```

Your API key must have permission to write to the target topics. This destination writes JSON records. It doesn't provide Avro serialisation or Schema Registry integration.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces). The `{namespace}` variable incorporates the namespace into the topic name in the `topic_pattern` configuration.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                        |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------------------------------------  |
| 0.1.13  | 2026-11-04 | [91019](https://github.com/airbytehq/airbyte/pull/91019) | Update Java CDK, Kafka libraries and security dependencies. |
| 0.1.12 | 2026-11-04 | [90997](https://github.com/airbytehq/airbyte/pull/90997) | Enable on Airbyte Cloud with TLS-only Kafka broker connections; avoid logging SASL credentials. |
| 0.1.11  | 2025-03-28 | [56450](https://github.com/airbytehq/airbyte/pull/56450) | Add support for other SASL Mechanisms when SASL_PLAINTEXT protocol is selected |
| 0.1.10  | 2022-08-04 | [15287](https://github.com/airbytehq/airbyte/pull/15287) | Update Kafka destination to use outputRecordCollector to properly store state  |
| 0.1.9   | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors                         |
| 0.1.7   | 2022-04-19 | [12134](https://github.com/airbytehq/airbyte/pull/12134) | Add PLAIN Auth                                                                 |
| 0.1.6   | 2022-02-15 | [10186](https://github.com/airbytehq/airbyte/pull/10186) | Add SCRAM-SHA-512 Auth                                                         |
| 0.1.5   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256) | Add `-XX:+ExitOnOutOfMemoryError` JVM option                                   |
| 0.1.4   | 2022-01-31 | [9905](https://github.com/airbytehq/airbyte/pull/9905)   | Fix SASL config read issue                                                     |
| 0.1.3   | 2021-12-30 | [8809](https://github.com/airbytehq/airbyte/pull/8809)   | Update connector fields title/description                                      |
| 0.1.2   | 2021-09-14 | [6040](https://github.com/airbytehq/airbyte/pull/6040)   | Change spec.json and config parser                                             |
| 0.1.1   | 2021-07-30 | [5125](https://github.com/airbytehq/airbyte/pull/5125)   | Enable `additionalPropertities` in spec.json                                   |
| 0.1.0   | 2021-07-21 | [3746](https://github.com/airbytehq/airbyte/pull/3746)   | Initial Release                                                                |

</details>
