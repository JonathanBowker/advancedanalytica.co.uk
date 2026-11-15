---
generated_record: true
connector_name: Amazon SQS
connector_type: destination
connector_slug: amazon-sqs
connector_directory: destination-amazon-sqs
definition_id: 0eeee7fb-518f-4045-bacc-9619e31c43ea
version: 0.1.18
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/amazon-sqs
logo: /images/connectors/destinations/amazon-sqs.svg
logo_source_path: airbyte-integrations/connectors/destination-amazon-sqs/icon.svg
logo_sha256: 2aa1cfb4a5fd7f950f36ddfa3a2984c94fc1b7ea40a1903eb6c95d9591e318c5
original_metadata_path: airbyte-integrations/connectors/destination-amazon-sqs/metadata.yaml
original_metadata_sha256: cb80470eb0c24c6f89d46a26d231e72b32070c6fc3b05e660e22c1e5bb7fe009
original_document_path: docs/integrations/destinations/amazon-sqs.md
original_document_sha256: f94bb01dc5a2e1e99fc85bdf51658d7f769208d962e62017bbc607f7a061cda7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 0590e235d2621efb80cb8f5d6c3f5664bd33218fd2055872ffa58841193a67b6
rewritten_at: 2026-11-12T13:20:16.799785+00:00
---

# Amazon SQS

:::warning

This connector is archived. It's no longer available in the Airbyte Cloud or Airbyte Open Source connector catalogs. It doesn't receive updates or support from the Airbyte team. For more information, see [Archived connectors](../connector-support-levels.md#archived-connectors).

:::

## Overview

The Amazon SQS destination sends every source record to one Amazon SQS queue. It supports standard and FIFO queues.

## Prerequisites

- An Amazon SQS queue. See [Create a queue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/creating-sqs-standard-queues.html) in the AWS documentation.
- An AWS IAM access key ID and secret access key for an IAM user with these queue permissions:
  - `sqs:SendMessage`
  - `sqs:GetQueueAttributes`

The connector always authenticates with an access key. The configuration form shows these fields as optional. However, connection checks and syncs fail if you don't provide them.

## Setup guide

### Step 1: Create an IAM user and access key

1. Create an IAM user for Airbyte in the AWS IAM console.
2. Attach a policy granting the required permissions for your queue. For example:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["sqs:SendMessage", "sqs:GetQueueAttributes"],
         "Resource": "arn:aws:sqs:<region>:<account-id>:<queue-name>"
       }
     ]
   }
   ```

3. [Create an access key](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) for the user, then save the access key ID and secret access key.

### Step 2: Set up the destination in Airbyte

Provide these configuration details:

- **Queue URL**: The queue's full URL, for example `https://sqs.eu-west-1.amazonaws.com/1234567890/example-queue`. The connector treats it as a FIFO queue if the URL ends in `.fifo`.
- **AWS Region**: The queue's region, for example `eu-west-1`.
- **AWS IAM Access Key ID** and **AWS IAM Secret Key**: The credentials from Step 1.
- **Message Delay** (optional): The delay, in seconds, before consumers can receive each message. Amazon SQS accepts values from 0 to 900. Don't set this for FIFO queues. See [Amazon SQS message timers](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-timers.html).
- **Message Body Key** (optional): The top-level record field to use as the message body. See [Use the Message Body Key](#use-the-message-body-key).
- **Message Group Id**: Required for FIFO queues and ignored for standard queues. See [FIFO queues](#fifo-queues).

## Message format

All streams are written to the same queue. The connector sends one message per record without batching messages.

By default, the message body contains the record's data serialised as a JSON string. It doesn't include the stream name or other Airbyte metadata. Each message has one [message attribute](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html), `airbyte_emitted_at` and a `String` attribute. This attribute contains the record's source emission time in milliseconds since the Unix epoch.

Amazon SQS limits each message's size. Records exceeding this limit fail to send. See [Amazon SQS message quotas](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html).

### Use the Message Body Key

Set **Message Body Key** to use one top-level field's value as the message body instead of the whole record. Nested fields aren't supported. Use this setting to send text or XML messages.

The field's value must be a string. The message fails if the value is an object, array or number. The sync fails if a record doesn't contain the field or the field is `null`.

For example, consider this input record:

```json
{
  "my_xml_field": "<something>value</something>"
}
```

Setting **Message Body Key** to `my_xml_field` creates this message body:

```xml
<something>value</something>
```

### FIFO queues

When the queue URL ends in `.fifo`, the connector confirms it's a FIFO queue and requires **Message Group Id**. Every message uses the same message group ID. Amazon SQS therefore delivers all records in order as one group.

The queue's [content-based deduplication](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagededuplicationid-property.html) setting determines how the connector handles deduplication:

- **Disabled**: The connector generates a random deduplication ID for each message. As a result, Amazon SQS doesn't deduplicate any records.
- **Enabled**: Amazon SQS deduplicates messages by their body. It delivers identical message bodies only once within the five-minute deduplication interval.

Amazon SQS doesn't support per-message delays for FIFO queues. Leave **Message Delay** empty and configure the delay on the queue instead.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | No |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                           |
|:--------|:-----------| :-------------------------------------------------------- | :-------------------------------- |
| 0.1.18 | 2026-11-03 | [90866](https://github.com/airbytehq/airbyte/pull/90866) | Archive connector |
| 0.1.17  | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies                                  |
| 0.1.16  | 2024-08-03 | [43278](https://github.com/airbytehq/airbyte/pull/43278) | Update dependencies |
| 0.1.15  | 2024-07-27 | [42795](https://github.com/airbytehq/airbyte/pull/42795) | Update dependencies |
| 0.1.14  | 2024-07-20 | [42165](https://github.com/airbytehq/airbyte/pull/42165) | Update dependencies |
| 0.1.13  | 2024-07-13 | [41733](https://github.com/airbytehq/airbyte/pull/41733) | Update dependencies |
| 0.1.12  | 2024-07-10 | [41439](https://github.com/airbytehq/airbyte/pull/41439) | Update dependencies |
| 0.1.11  | 2024-07-09 | [41237](https://github.com/airbytehq/airbyte/pull/41237) | Update dependencies |
| 0.1.10  | 2024-07-06 | [40960](https://github.com/airbytehq/airbyte/pull/40960) | Update dependencies |
| 0.1.9   | 2024-06-29 | [40622](https://github.com/airbytehq/airbyte/pull/40622) | Update dependencies |
| 0.1.8   | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.1.7   | 2024-06-26 | [40536](https://github.com/airbytehq/airbyte/pull/40536) | Update dependencies |
| 0.1.6   | 2024-06-25 | [40461](https://github.com/airbytehq/airbyte/pull/40461) | Update dependencies |
| 0.1.5   | 2024-06-22 | [40075](https://github.com/airbytehq/airbyte/pull/40075) | Update dependencies |
| 0.1.4   | 2024-06-04 | [39070](https://github.com/airbytehq/airbyte/pull/39070) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.3   | 2024-05-21 | [38493](https://github.com/airbytehq/airbyte/pull/38493) | [autopull] base image + poetry + up_to_date |
| 0.1.2   | 2024-03-05 | [#35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector              |
| 0.1.1   | 2024-01-03 | [#33924](https://github.com/airbytehq/airbyte/pull/33924) | Add new ap-southeast-3 AWS region |
| 0.1.0   | 2021-10-27 | [#0000](https://github.com/airbytehq/airbyte/pull/0000)   | Initial version                   |

</details>
