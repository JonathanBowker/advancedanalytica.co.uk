---
generated_record: true
connector_name: Google PubSub
connector_type: destination
connector_slug: pubsub
connector_directory: destination-pubsub
definition_id: 356668e2-7e34-47f3-a3b0-67a8a481b692
version: 0.2.3
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/pubsub
logo: /images/connectors/destinations/pubsub.svg
logo_source_path: airbyte-integrations/connectors/destination-pubsub/icon.svg
logo_sha256: 19cc3dc9e8fd55ecf94c8f432e2f6cdf591f69c19de2d79e016fd56b382e2058
original_metadata_path: airbyte-integrations/connectors/destination-pubsub/metadata.yaml
original_metadata_sha256: e576be2018fc2e0a4bea9db8d311ae4817905a8d8b35762399a10f13238221d1
original_document_path: docs/integrations/destinations/pubsub.md
original_document_sha256: e506bbc32687c50f26ba93740aeb7e74828260c5f671cb94a44dc4b37a39d0cf
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5847eddfeabb8b5328171a6752ac45313bba9207794cbcc513bd274bafc40f71
rewritten_at: 2026-11-12T13:26:25.716663+00:00
---

---
description: >-
  Pub/Sub is an asynchronous messaging service from Google Cloud Provider.
---

# PubSub

## Overview

The Airbyte Google PubSub destination sends and streams data into PubSub. Pub/Sub is an asynchronous messaging service from Google Cloud Provider.

## Prerequisites

- Airbyte Open Source users with the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector must [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) Airbyte to version `v0.40.0-alpha` or newer. They must also upgrade the PubSub connector to version `0.1.6` or newer.

### Sync overview

#### Output schema

Each stream outputs a PubSubMessage with these attributes:

- `_stream`: the name of the stream providing the data
- `_namespace`: the stream's namespace, if available

The data is serialised JSON containing these fields:

- `_airbyte_ab_id`: a uuid string that Airbyte assigns to each processed event.
- `_airbyte_emitted_at`: a long timestamp\(ms\) showing when the event was pulled from the data source.
- `_airbyte_data`: a json string representing the source data.

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

You'll need the following to use the PubSub destination:

- A Google Cloud Project with PubSub enabled
- A PubSub Topic where Airbyte can stream or sync your data
- A Google Cloud Service Account with the `Pub/Sub Editor` role in your GCP project
- A Service Account Key to authenticate your Service Account

See the setup guide for details on creating the required resources.

### Setup guide

#### Google Cloud Project

If your Google Cloud Project has PubSub enabled, skip to the "Create a Topic" section.

First, follow the Google Cloud instructions to [Create a Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects#before_you_begin). PubSub is enabled automatically in new projects. Otherwise, find it in [Marketplace](https://console.cloud.google.com/marketplace/product/google/pubsub.googleapis.com) and enable it.

#### PubSub topic

Airbyte needs a PubSub topic to write data streamed or synced from your data sources. If you already have a suitable Topic, skip this section. Otherwise, follow the Google Cloud guide for [Creating a PubSub Topic](https://cloud.google.com/pubsub/docs/admin#creating_a_topic).

#### Service account

Airbyte needs credentials for a [Service Account](https://cloud.google.com/iam/docs/service-accounts) with the `Pub/Sub Editor` role to stream or sync data into PubSub. This role grants permission to publish messages to PubSub topics. A Service Account exclusive to Airbyte makes permissions and auditing easier. However, you can use an existing Service Account with the correct permissions.

The easiest approach is to follow GCP's guide for [Creating a Service Account](https://cloud.google.com/iam/docs/creating-managing-service-accounts). Keep the Service Account ID after creating the account. You'll need it when granting roles. Service Account IDs typically use this format: `<account-name>@<project-name>.iam.gserviceaccount.com`

Next, add the service account as a Member of your Google Cloud Project with the `Pub/Sub Editor` role. Follow the Google documentation for [Granting Access](https://cloud.google.com/iam/docs/granting-changing-revoking-access#granting-console). Use the Service Account ID you created as the member's email address.

You should now have a service account with the `Pub/Sub Editor` project-level permission.

#### Service account key

Service Account Keys authenticate Google Service Accounts. Airbyte needs the Service Account Keys to use the permissions you granted in the previous step. See the [Google documentation](https://cloud.google.com/iam/docs/service-accounts#service_account_keys) for more information about Keys.

Follow the [Creating and Managing Service Account Keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) guide to create a key. Airbyte currently supports JSON Keys only, so create your key in that format. Download the key immediately after creating it. Google won't let you view its contents again. After successfully configuring BigQuery as an Airbyte destination, delete this key from your computer.

### Set up PubSub in Airbyte

You now have everything required to configure PubSub as a destination in the UI. You'll need this information:

- **Project ID**: GCP project id
- **Topic ID**: name of pubsub topic under the project
- **Service Account Key**: the contents of your Service Account Key JSON file

After configuring PubSub as a destination, delete the Service Account Key from your computer.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date              | Pull Request                                             | Subject                                                    |
| :------ | :---------------- | :------------------------------------------------------- | :--------------------------------------------------------- |
| 0.2.3 | 2025-03-24 | [56355](https://github.com/airbytehq/airbyte/pull/56355) | Upgrade to airbyte/java-connector-base:2.0.1 to be M4 compatible. |
| 0.2.2 | 2025-01-10 | [51481](https://github.com/airbytehq/airbyte/pull/51481) | Use a non root base image |
| 0.2.1 | 2024-12-18 | [49878](https://github.com/airbytehq/airbyte/pull/49878) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.2.0   | August 16, 2022   | [15705](https://github.com/airbytehq/airbyte/pull/15705) | Add configuration for Batching and Ordering                |
| 0.1.5   | 2022-06-17        | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors     |
| 0.1.4   | February 21, 2022 | [\#9819](https://github.com/airbytehq/airbyte/pull/9819) | Upgrade version of google-cloud-pubsub                     |
| 0.1.3   | 2022-02-14        | [10256](https://github.com/airbytehq/airbyte/pull/10256) | (unpublished) Add `-XX:+ExitOnOutOfMemoryError` JVM option |
| 0.1.2   | December 29, 2021 | [\#9183](https://github.com/airbytehq/airbyte/pull/9183) | Update connector fields title/description                  |
| 0.1.1   | August 13, 2021   | [\#4699](https://github.com/airbytehq/airbyte/pull/4699) | Added json config validator                                |
| 0.1.0   | June 24, 2021     | [\#4339](https://github.com/airbytehq/airbyte/pull/4339) | Initial release                                            |

</details>
