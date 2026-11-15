---
generated_record: true
connector_name: Amazon SQS
connector_type: source
connector_slug: amazon-sqs
connector_directory: source-amazon-sqs
definition_id: 983fd355-6bf3-4709-91b5-37afa391eeb6
version: 1.0.15
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/amazon-sqs
logo: /images/connectors/sources/amazon-sqs.svg
logo_source_path: airbyte-integrations/connectors/source-amazon-sqs/icon.svg
logo_sha256: 2aa1cfb4a5fd7f950f36ddfa3a2984c94fc1b7ea40a1903eb6c95d9591e318c5
original_metadata_path: airbyte-integrations/connectors/source-amazon-sqs/metadata.yaml
original_metadata_sha256: ad6b3602437f4b24e16680455b9d668e248875245798492e51bcf6ad00265858
original_document_path: docs/integrations/sources/amazon-sqs.md
original_document_sha256: cefcf5b4fcf5efd2a6f24f1686f084fa44066eff60ba652223b9b46404701760
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 43757835692d745f48c1c9f7359e745959dd7a2aff6efe9a51478f70533065bc
rewritten_at: 2026-11-12T13:29:30.765596+00:00
---

# Amazon SQS

## Overview

The Amazon SQS source syncs the SQS API. See https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/Welcome.html. It supports full refresh sync. You can view it in builder with low-code support.

## Get started

### Requirements

- AWS IAM Access Key
- AWS IAM Secret Key
- AWS SQS Queue URL
- AWS Region
- Action target

### Setup guide

- [Create IAM Keys](https://aws.amazon.com/premiumsupport/knowledge-center/create-access-key/)
- [Create SQS Queue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-getting-started.html#step-create-queue)

### Supported streams

This source can sync the following core Actions as streams:

- [RecieveMessage](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html)
- [QueueAttributes](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_GetQueueAttributes.html)

Other Actions are in beta and might require more or fewer parameters.

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |
| Namespaces        | No                   |       |

### Performance

Lookup requests for the `RecieveMessage` stream are limited to two per second, per account and per region. The connector retries after throttling errors. However, the sync will fail if errors continue after multiple retries. This can happen when you set up many connector instances using the same account and region.


### Output schema

This source outputs one stream for the configured SQS Queue. Each stream record contains three fields:

- id (a UUIDv4 as a STRING)
- body (message body as a STRING)
- attributes (attributes of the messages as an OBJECT or NULL)

### Properties

The required properties are 'Queue URL', 'AWS Region' and 'Delete Messages After Read', as shown in **bold** below.

- **Queue URL** (STRING)
  - The queue's full AWS endpoint URL, e.g.
    `https://sqs.eu-west-1.amazonaws.com/1234567890/example-queue-url`
- **AWS Region** (STRING)
  - The region code for the SQS Queue, e.g. eu-west-1
- Max Batch Size (INTEGER)
  - The maximum number of messages to consume in one poll, e.g. 5
  - Minimum of 1, maximum of 10
  - Default: 10
- Max Wait Time (INTEGER)
  - The maximum polling time, in seconds, before committing or timing out a batch
  - Polling ends earlier if the batch reaches `Max Batch Size`
  - Minimum of 1, maximum of 20
  - Default: 20
- Message Attributes To Return (STRING)
  - A comma-separated list of Attributes to return for each message
  - Default: All
- Message Visibility Timeout (INTEGER)
  - The time, in seconds, that a read message stays hidden from other consumers
  - After this timeout, the message isn't deleted and can be read again
  - Default: 20
- **AWS IAM Access Key ID** (STRING)
  - The Access Key for the IAM User with permissions on this Queue
- **AWS IAM Secret Key** (STRING)
  - The Secret Key for the IAM User with permissions on this Queue
- **Target** (STRING)
  - The targeted action resource for the fetch

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                           |
| :------ | :--------- | :-------------------------------------------------------- | :-------------------------------- |
| 1.0.15 | 2025-05-10 | [59775](https://github.com/airbytehq/airbyte/pull/59775) | Update dependencies |
| 1.0.14 | 2025-05-03 | [59344](https://github.com/airbytehq/airbyte/pull/59344) | Update dependencies |
| 1.0.13 | 2025-04-26 | [58684](https://github.com/airbytehq/airbyte/pull/58684) | Update dependencies |
| 1.0.12 | 2025-04-19 | [58293](https://github.com/airbytehq/airbyte/pull/58293) | Update dependencies |
| 1.0.11 | 2025-04-12 | [57609](https://github.com/airbytehq/airbyte/pull/57609) | Update dependencies |
| 1.0.10 | 2025-04-05 | [57146](https://github.com/airbytehq/airbyte/pull/57146) | Update dependencies |
| 1.0.9 | 2025-03-29 | [56614](https://github.com/airbytehq/airbyte/pull/56614) | Update dependencies |
| 1.0.8 | 2025-03-22 | [56083](https://github.com/airbytehq/airbyte/pull/56083) | Update dependencies |
| 1.0.7 | 2025-03-08 | [54832](https://github.com/airbytehq/airbyte/pull/54832) | Update dependencies |
| 1.0.6 | 2025-03-01 | [54738](https://github.com/airbytehq/airbyte/pull/54738) | fix: Update source-amazon-sqs to use nltk 3.9.1 or higher |
| 1.0.5 | 2025-02-22 | [54271](https://github.com/airbytehq/airbyte/pull/54271) | Update dependencies |
| 1.0.4 | 2025-02-15 | [53936](https://github.com/airbytehq/airbyte/pull/53936) | Update dependencies |
| 1.0.3 | 2025-02-01 | [52878](https://github.com/airbytehq/airbyte/pull/52878) | Update dependencies |
| 1.0.2 | 2025-01-25 | [52163](https://github.com/airbytehq/airbyte/pull/52163) | Update dependencies |
| 1.0.1 | 2025-01-18 | [51742](https://github.com/airbytehq/airbyte/pull/51742) | Update dependencies |
| 1.0.0 | 2024-11-07 | [41064](https://github.com/airbytehq/airbyte/pull/41064) | Migrate to low code |
| 0.1.1   | 2024-01-03 | [#33924](https://github.com/airbytehq/airbyte/pull/33924) | Add new ap-southeast-3 AWS region |
| 0.1.0   | 2021-10-10 | [\#0000](https://github.com/airbytehq/airbyte/pull/0000)  | Initial version                   |

</details>
