---
generated_record: true
connector_name: DynamoDB
connector_type: destination
connector_slug: dynamodb
connector_directory: destination-dynamodb
definition_id: 8ccd8909-4e99-4141-b48d-4984b70b2d89
version: 0.1.8
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/dynamodb
logo: /images/connectors/destinations/dynamodb.svg
logo_source_path: airbyte-integrations/connectors/destination-dynamodb/icon.svg
logo_sha256: 6166f4236a21d564fa0ce842bf090771000b0ca31ddd84ad686a068c3b557171
original_metadata_path: airbyte-integrations/connectors/destination-dynamodb/metadata.yaml
original_metadata_sha256: 4d0dd4cb36fefa8e273711727dc3ddc387b8b15b1270fb1733ed22efed8cde29
original_document_path: docs/integrations/destinations/dynamodb.md
original_document_sha256: 578460a9e10be20047e546ebf4aecdbbe0ff8902682283ed3007a7be3479f862
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7ff736e35e4c8bd6786ec76cfcb516300d3ca5950d0bf612a5b22395f5ac3127
rewritten_at: 2026-11-12T13:23:54.645626+00:00
---

# DynamoDB

Write your data to AWS DynamoDB with this destination.

Sync your data to AWS DynamoDB with the Airbyte DynamoDB destination. Each stream is written to its own DynamoDB table.

## Prerequisites

- If you use Airbyte Open Source with the
  [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector,
  [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to
  version `v0.40.0-alpha` or newer. Then upgrade your DynamoDB connector to version `0.1.5` or newer.

## Sync overview

### Output schema

Each stream is written to its own DynamoDB table. Each table contains a collection of `json` objects with four fields:

- `_airbyte_ab_id`: a UUID that Airbyte assigns to each processed event.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
- `_airbyte_data`: a JSON blob containing the extracted data.
- `sync_time`: a timestamp showing when the sync task was triggered.

### Performance

This connector creates tables using the on-demand (`PAY_PER_REQUEST`) billing mode. You don't need to provision capacity units upfront.

Records are written in batches of 25 items. Unprocessed items are retried automatically.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started

### Requirements

1. Allow connections between the Airbyte server and your AWS DynamoDB tables \(if they're in separate VPCs\).
2. Provide your AWS DynamoDB credentials \(for the COPY strategy\).

### Setup guide

- Enter your DynamoDB details.
  - **DynamoDB Endpoint**
    - Leave this empty when using AWS DynamoDB. Enter the endpoint URL when using a customised endpoint.
  - **DynamoDB Table Name**
    - Enter the name prefix for the DynamoDB table that stores the extracted data. The table name is \\_\\_\.
  - **DynamoDB Region**
    - Enter the DynamoDB region.
  - **Access Key Id**
    - See
      [this](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)
      for guidance on generating an access key.
    - Create an Airbyte-specific user. The connector creates one table per stream and a temporary `<prefix>_airbyte_connection_test_*` table during **Test connection**.
      Therefore, read and write access to existing tables isn't enough. The user's
      [IAM policy](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/iam-policy-structure.html)
      must allow these actions on `arn:aws:dynamodb:<region>:<account>:table/<prefix>_*`:
      `dynamodb:CreateTable`, `dynamodb:DescribeTable`, `dynamodb:DeleteTable`, `dynamodb:PutItem`
      and `dynamodb:BatchWriteItem`. Without the `dynamodb:CreateTable` permission, you'll receive
      `AccessDeniedException: User ... is not authorized to perform: dynamodb:CreateTable` when
      testing the connection.
  - **Secret Access Key**
    - Enter the key that corresponds to the key ID above.
- Make sure your DynamoDB tables are accessible from the machine running Airbyte.
  - Access depends on your network setup.
  - See the AWS DynamoDB documentation for guidance on configuring access to your DynamoDB
    [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/access-control-overview.html).
  - To verify the connection, use the check connection tool in the UI.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                                     |
| :------ | :--------- | :--------------------------------------------------------- | :---------------------------------------------------------- |
| 0.1.8   | 2024-01-03 | [#33924](https://github.com/airbytehq/airbyte/pull/33924)  | Add new ap-southeast-3 AWS region                           |
| 0.1.7   | 2022-11-03 | [\#18672](https://github.com/airbytehq/airbyte/pull/18672) | Added strict-encrypt cloud runner                           |
| 0.1.6   | 2022-11-01 | [\#18672](https://github.com/airbytehq/airbyte/pull/18672) | Enforce to use ssl connection                               |
| 0.1.5   | 2022-08-05 | [\#15350](https://github.com/airbytehq/airbyte/pull/15350) | Added per-stream handling                                   |
| 0.1.4   | 2022-06-16 | [\#13852](https://github.com/airbytehq/airbyte/pull/13852) | Updated stacktrace format for any trace message errors      |
| 0.1.3   | 2022-05-17 | [12820](https://github.com/airbytehq/airbyte/pull/12820)   | Improved 'check' operation performance                      |
| 0.1.2   | 2022-02-14 | [10256](https://github.com/airbytehq/airbyte/pull/10256)   | Add `-XX:+ExitOnOutOfMemoryError` JVM option                |
| 0.1.1   | 2022-12-05 | [\#9314](https://github.com/airbytehq/airbyte/pull/9314)   | Rename dynamo_db_table_name to dynamo_db_table_name_prefix. |
| 0.1.0   | 2021-08-20 | [\#5561](https://github.com/airbytehq/airbyte/pull/5561)   | Initial release.                                            |

</details>
