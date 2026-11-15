---
generated_record: true
connector_name: Customer IO
connector_type: destination
connector_slug: customer-io
connector_directory: destination-customer-io
definition_id: c101b15f-2de9-4616-b54f-0ec9d28ca64d
version: 0.0.12
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/customer-io
logo: /images/connectors/destinations/customer-io.svg
logo_source_path: airbyte-integrations/connectors/destination-customer-io/icon.svg
logo_sha256: b46379cc3ab4be5711d52e6d4d1e6182e1ebd29bd5f50b90956811baacbd5d9c
original_metadata_path: airbyte-integrations/connectors/destination-customer-io/metadata.yaml
original_metadata_sha256: 7a2dbb95c15503fbdcca4b92442ed25ae747d245ea2623c53d5044cc7e515d36
original_document_path: docs/integrations/destinations/customer-io.md
original_document_sha256: bf3bd831e0b91bc21688587048c87ade1850a018dbc497f1c7c0d6a9de3b7f5c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 264f252bf52e7aea0bfff3af44d80fd272cf40866c92fe783f83062eee06d48d
rewritten_at: 2026-11-12T13:23:31.147333+00:00
---

# Customer.io

Use this page to set up the Customer.io destination connector and find its reference information.

## Overview

The Customer.io destination connector syncs data to [Customer.io](https://customer.io/) using the [Track API v2 batch endpoint](https://customer.io/docs/api/track/#tag/Track-v2). It supports [data activation](/platform/move-data/elt-data-activation), so you can identify people and track Customer.io events from your data warehouse or other sources.

## Prerequisites

- A Customer.io account
- A Customer.io Track API Key and Site ID (see [Setup guide](#setup-guide))
- Airbyte version 1.8 or later, or Airbyte Cloud

### S3 prerequisites for rejected records

To store rejected records in an S3 bucket, you’ll also need the following.

1. Allow connections from Airbyte to your AWS S3/Minio S3 cluster if they’re in separate VPCs.
2. [Enforce encryption of data in transit](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html#transit).
3. An S3 bucket with credentials, a Role ARN, or an instance profile with host read/write permissions configured for EC2 or EKS.

    - You must always provide these fields:

      - **S3 Bucket Name**
      - **S3 Bucket Region**
      - **Prefix Path in the Bucket**

    - If you’re using STS Assume Role, you must provide:

      - **Role ARN**

    - If you’re using AWS credentials, you must provide:

      - **Access Key ID**
      - **Secret Access Key**

    - If you’re using an Instance Profile, you can omit the Access Key ID, Secret Access Key, and Role ARN.

## Setup guide

Configure the connector as follows:

1. In Customer.io, go to **Settings** > **API & Webhook Credentials**.
2. Under **Track API Keys**, click **Create Track API Key**.
3. Copy the **Site ID** and **API Key**.
4. In Airbyte, create a new Customer.io destination and enter the **Site ID** and **API Key**.

The connector uses [HTTP Basic authentication](https://customer.io/docs/api/track/#section/Authentication), with the Site ID as the username and the API Key as the password.

### Rejected records

You can store [rejected records](/platform/move-data/rejected-records) in object storage, such as S3. Configure object storage in the connector settings to capture records that couldn’t sync to Customer.io. Rejections may result from payload size limits, missing required fields or Customer.io API validation errors.

## Objects and operations

The connector supports two destination objects:

- **person_identify** (Upsert): [Identifies a person](https://docs.customer.io/journeys/create-update-person/) and assigns attributes to them. The `person_email` field is required and serves as the matching key. Every other record field is sent as a person attribute.
- **person_event** (Insert): [Tracks an event](https://docs.customer.io/journeys/events/) for a person. Required fields: `person_email`, `event_name`. Optional fields: `event_id` (for event deduplication), `timestamp` (Unix timestamp). Every other field is sent as an event attribute.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | No |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

This is a [data activation](/platform/move-data/elt-data-activation) destination. Alongside the Airbyte sync modes above, Customer.io supports identify (person) and track (event) operations configured for each stream.

## Limitations

- The connector sends data to the US region endpoint (`track.customer.io`). For EU-region Customer.io accounts, data still reaches your workspace but first passes through US servers. See [Customer.io server addresses](https://customer.io/docs/api/track/#section/Overview/Server-addresses:-US-and-EU) for details.
- The Track API limits requests to 1000 per second. The connector batches records, up to 500 KB per batch, to stay within this limit.
- Each batch entry must be 32 KB or smaller.
- Customer.io applies these attribute limits:
    - Maximum 300 attributes per person or identify call
    - Maximum 100 KB total attribute size per person
    - Attribute names: 150 bytes or smaller
    - Attribute values: 1000 bytes or smaller
- Event names must be 100 bytes or smaller.

## Namespace support

This destination doesn’t support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

| Version | Date | Pull Request | Subject |
| :--- | :--- | :--- | :--- |
| 0.0.12 | 2026-10-22 | [89652](https://github.com/airbytehq/airbyte/pull/89652) | Upgrade to Bulk CDK 1.1.9: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86; netty 4.1.139, Hadoop 3.4.3, Parquet 1.18.1 |
| 0.0.11 | 2026-06-18 | [80254](https://github.com/airbytehq/airbyte/pull/80254) | Move to community support level |
| 0.0.10 | 2026-02-09 | [72973](https://github.com/airbytehq/airbyte/pull/72973) | Upgrade CDK to 1.0.1 |
| 0.0.9 | 2026-01-26 | [72303](https://github.com/airbytehq/airbyte/pull/72303) | Upgrade CDK to 0.2.0 |
| 0.0.8 | 2025-11-05 | [69132](https://github.com/airbytehq/airbyte/pull/69132) | Upgrade to Bulk CDK 0.1.61 |
| 0.0.7 | 2025-09-23 | [66571](https://github.com/airbytehq/airbyte/pull/66571) | Fix person_identify in incremental mode |
| 0.0.6 | 2025-09-18 | [66238](https://github.com/airbytehq/airbyte/pull/66238) | Use low-code discover definition and pin to a CDK version |
| 0.0.5 | 2025-09-08 | [65157](https://github.com/airbytehq/airbyte/pull/65157) | Update following breaking changes on spec |
| 0.0.4 | 2025-08-20 | [65113](https://github.com/airbytehq/airbyte/pull/65113) | Update logo |
| 0.0.3 | 2025-07-10 | [62848](https://github.com/airbytehq/airbyte/pull/62848) | Improve UX on connector configuration |
| 0.0.2 | 2025-07-08 | [62843](https://github.com/airbytehq/airbyte/pull/62843) | Checker should validate DLQ |
| 0.0.1 | 2025-07-07 | [62083](https://github.com/airbytehq/airbyte/pull/62083) | Initial release of the Customer.io destination connector |
