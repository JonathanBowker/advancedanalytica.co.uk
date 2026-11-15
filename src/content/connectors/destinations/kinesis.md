---
generated_record: true
connector_name: Kinesis
connector_type: destination
connector_slug: kinesis
connector_directory: destination-kinesis
definition_id: 6d1d66d4-26ab-4602-8d32-f85894b04955
version: 0.1.5
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/kinesis
logo: /images/connectors/destinations/kinesis.svg
logo_source_path: airbyte-integrations/connectors/destination-kinesis/icon.svg
logo_sha256: 4537c232a48935ba003769f5937ceb37294ac500bd17b611b9f599d8a526a083
original_metadata_path: airbyte-integrations/connectors/destination-kinesis/metadata.yaml
original_metadata_sha256: 20357acb7dd1690319bb835efb2636fa5bbb4b086c90ef1d73ab4fd6998fa186
original_document_path: docs/integrations/destinations/kinesis.md
original_document_sha256: eedf7e5afda4d85f4ce80567ceb02d584500c4b4bd6aa1d62744f51175281ea3
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ff2472f59b4791d9e39b1b6adba36bb2fc690dcc256ce8805e659bf1cceb35a9
rewritten_at: 2026-11-12T13:24:39.219831+00:00
---

# Kinesis

## Prerequisites

- If you use the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector with Airbyte Open Source, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your platform to `v0.40.0-alpha` or newer. Then, upgrade your Kinesis connector to `0.1.4` or newer.

## Sync overview

### Output schema

Incoming Airbyte data uses JSON format. The partition key determines how data is sent across different stream shards.
This connector maps incoming data from each namespace and stream to a unique Kinesis stream. Each Kinesis record contains the following JSON fields:

- `_airbyte_ab_id`: A random UUID used as the partition key when sending data to different shards.
- `_airbyte_emitted_at`: A timestamp showing when the event was received from the data source.
- `_airbyte_data`: A JSON text or object containing the data received from the data source.

### Features

| Feature                        | Support | Notes                                                                             |
| :----------------------------- | :-----: | :-------------------------------------------------------------------------------- |
| Full Refresh Sync              |   ❌    |                                                                                   |
| Incremental - Append Sync      |   ✅    | Incoming messages are streamed/appended to a Kinesis stream as they are received. |
| Incremental - Append + Deduped |   ❌    |                                                                                   |
| Namespaces                     |   ✅    | Namespaces will be used to determine the Kinesis stream name.                     |

### Performance considerations

Kinesis handles large volumes of real-time data by scaling streams with shards. However, you should understand the following Kinesis [Quotas and Limits](https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html).
Adjust the connector buffer size to match your data size and frequency.

## Getting started

### Requirements

- The connector supports the latest Kinesis service version available when this page was written.
- Configuration
  - **_Endpoint_**: The AWS Kinesis endpoint to connect to. If you don't provide one, the default endpoint is used.
  - **_Region_**: The AWS Kinesis region to connect to. If you don't provide one, the default region is used.
  - **_shardCount_**: The number of shards created for the stream. The shard count affects your stream's throughput.
  - **_accessKey_**: The access key credential used to authenticate with the service.
  - **_privateKey_**: The private key credential used to authenticate with the service.
  - **_bufferSize_**: The buffer size used to increase throughput by sending data in one request.

### Setup guide

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                    |
| :------ | :--------- | :------------------------------------------------------- | :------------------------- |
| 0.1.5   | 2022-09-22 | [16952](https://github.com/airbytehq/airbyte/pull/16952) | Add required config fields |

</details>
