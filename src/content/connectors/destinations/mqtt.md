---
generated_record: true
connector_name: MQTT
connector_type: destination
connector_slug: mqtt
connector_directory: destination-mqtt
definition_id: f3802bc4-5406-4752-9e8d-01e504ca8194
version: 0.1.3
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/mqtt
logo: /images/connectors/destinations/mqtt.svg
logo_source_path: airbyte-integrations/connectors/destination-mqtt/icon.svg
logo_sha256: d49ae1b9d99699e192edd5a145bbb567cc58693052e0753bfd1cfc1952e06122
original_metadata_path: airbyte-integrations/connectors/destination-mqtt/metadata.yaml
original_metadata_sha256: fa585dffded8e258b4fad7f79c5c088a82c7221ce1d2ffbee0a79bafd962273e
original_document_path: docs/integrations/destinations/mqtt.md
original_document_sha256: 201af972d3983e9de699bc104e1818fd532d1f81f214800cad85dd1e5b9a6547
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 721ff47a40580b9e974b435ab59f0f3540694c8f91c434952fc29f2e84066fdf
rewritten_at: 2026-11-12T13:25:28.225314+00:00
---

# MQTT

## Overview

The Airbyte MQTT destination syncs your data to any MQTT system compliant with version 3.1.X. It writes each stream to its corresponding MQTT topic.

## Prerequisites

- If you use Airbyte Open Source with the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to version `v0.40.0-alpha` or newer. Then upgrade your MQTT connector to the latest version.

### Sync overview

#### Output schema

The connector outputs each stream to an MQTT topic.

The connector writes data in JSON format as bytes.

Each record's payload contains these four fields:

- `_airbyte_ab_id`: a UUID that Airbyte assigns to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a JSON blob containing the event data.
- `_airbyte_stream`: the name of the record's stream.

#### Features

| Feature                        | Supported?\(Yes/No\) | Notes |
| :----------------------------- | :------------------- | :---- |
| Full Refresh Sync              | No                   |       |
| Incremental - Append Sync      | Yes                  |       |
| Incremental - Append + Deduped | No                   |       |
| Namespaces                     | Yes                  |       |

## Get started

### Requirements

To use the MQTT destination, you need:

- An MQTT broker that implements MQTT protocol version 3.1.X.

### Setup guide

#### Network access

Make sure Airbyte can access your MQTT broker.

#### **Permissions**

Allow Airbyte to write messages to topics. Check whether your deployed MQTT broker requires specific permissions.

#### Target topics

Use the `topic_pattern` configuration parameter to choose where messages are written. You can specify one predefined topic or set topics dynamically using the source [namespace](https://docs.airbyte.com/understanding-airbyte/namespaces) or stream.

To write every message to one predefined topic, enter its name in the `topic_pattern` field. For example, setting `topic_pattern` to `path1/path2/my-topic-name` sends messages from every stream and namespace to that topic.

To define output topics dynamically, use the `{namespace}` and `{stream}` pattern variables. These variables route messages to different topics using the values available when records are produced. For example, set the `topic_pattern` parameter to `airbyte_syncs/{namespace}/{stream}`. Messages from namespace `n1` and stream `s1` are then written to topic `airbyte_syncs/n1/s1`. Messages from `s2` are written to `airbyte_syncs/n1/s2`, and so on.

### Set up the MQTT destination

You can now configure MQTT as a destination in the Airbyte UI. The following parameters are available, although many are optional or have default values:

- **MQTT broker host**
- **MQTT broker port**
- **Use TLS**
- **Username**
- **Password**
- **Topic pattern**
- **Test topic**
- **Client ID**
- **Sync publisher**
- **Connect timeout**
- **Automatic reconnect**
- **Clean session**
- **Message retained**
- **Message QoS**

For more information, see [OASIS MQTT standard site](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/mqtt-v3.1.1.html).

_NOTE_: MQTT version 5 isn't supported yet.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                         |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------- |
| 0.1.3   | 2022-09-02 | [16263](https://github.com/airbytehq/airbyte/pull/16263) | Marked password field in spec as airbyte_secret |
| 0.1.2   | 2022-07-12 | [14648](https://github.com/airbytehq/airbyte/pull/14648) | Include lifecycle management                    |
| 0.1.1   | 2022-05-24 | [13099](https://github.com/airbytehq/airbyte/pull/13099) | Fixed build's tests                             |

</details>
