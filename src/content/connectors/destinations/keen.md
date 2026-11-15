---
generated_record: true
connector_name: Chargify (Keen)
connector_type: destination
connector_slug: keen
connector_directory: destination-keen
definition_id: 81740ce8-d764-4ea7-94df-16bb41de36ae
version: 0.2.4
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/keen
logo: /images/connectors/destinations/keen.svg
logo_source_path: airbyte-integrations/connectors/destination-keen/icon.svg
logo_sha256: 75da3b753940816b04677cba4738b9d2345d6e1e4dab7f41a0b38299a24c28ec
original_metadata_path: airbyte-integrations/connectors/destination-keen/metadata.yaml
original_metadata_sha256: 5a218498a7f2eae62b2e9b0b11698429cb9a2f473a8e7938e8d11f63a6fddce2
original_document_path: docs/integrations/destinations/keen.md
original_document_sha256: 33b2d26e0242da32998fa803b52e1fb34f4a6f79260249dd8d02dd0bacc125ab
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a88ec271585a917c45f7bec8b54dd0c0734dfc5129c54e2bb285e5521c5481dc
rewritten_at: 2026-11-12T14:04:03.887694+00:00
---

---
description: >-
  Keen is a fully managed platform for event streaming and analytics.
---

# Keen

## Overview

The Airbyte Keen destination streams data from any Airbyte Source into [Keen](https://keen.io?utm_campaign=Airbyte%20Destination%20Connector&utm_source=Airbyte%20Hosted%20Docs&utm_medium=Airbyte%20Hosted%20Docs&utm_term=Airbyte%20Hosted%20Docs&utm_content=Airbyte%20Hosted%20Docs) for storage, analysis and visualisation. Keen is a flexible, fully managed platform for event streaming and analytics. It enables anyone to deliver custom, embeddable dashboards in minutes, not months.

## Prerequisites

- If you use Airbyte Open Source with the [Postgres](https://docs.airbyte.com/integrations/sources/postgres) source connector, [upgrade](https://docs.airbyte.com/operator-guides/upgrading-airbyte/) your Airbyte platform to version `v0.40.0-alpha` or newer. You must also upgrade your Keen connector to version `0.2.4` or newer.

### Sync overview

#### Output schema

Each replicated Airbyte stream outputs data to a corresponding event collection in Keen. Event collections store data in JSON format. Each collection inherits the stream name. The connector removes all non-alphanumeric characters, except `.’, ‘-’, ‘_’,` and whitespace characters. Where possible, the connector infers the record's timestamp value and uses it to override the special `keen.timestamp` field.

#### Features

| Feature                        | Supported?\(Yes/No\) | Notes |
| :----------------------------- | :------------------- | :---- |
| Full Refresh Sync              | Yes                  |       |
| Incremental - Append Sync      | Yes                  |       |
| Incremental - Append + Deduped | No                   |       |
| Namespaces                     | No                   |       |

## Get started

### Requirements

Before using the Keen destination, create a [Keen account](https://keen.io/users/signup?utm_campaign=Airbyte%20Destination%20Connector&utm_source=Airbyte%20Hosted%20Docs&utm_medium=Airbyte%20Hosted%20Docs&utm_term=Airbyte%20Hosted%20Docs&utm_content=Airbyte%20Hosted%20Docs) if you don't already have one.

Once you have a Keen account, use these credentials to set up the connector:

- A Keen Project ID
- A Keen Master API key associated with the project

See the setup guide for more information about getting started.

### Setup guide

#### Keen Project

If you haven't created a project for streaming your data:

Sign in to the [Keen application](https://keen.io/) and add a new project. Select the ‘Add New’ link beside the Projects label in the left-hand side panel. Then name the project.

A project works as a data silo. Its data remains completely separate from data in other projects. Create separate projects for each application and for Dev and Prod environments.

Open the ‘Access’ section and copy your Project ID and Master API Key.

If you've already created a project:

Open the ‘Access’ tab and copy your Project ID and Master API Key.

#### API Key and Project ID

The Keen Connector uses the [Keen Kafka Inbound Cluster](https://keen.io/docs/streams/kafka-streaming/kafka-inbound-cluster/?utm_campaign=Airbyte%20Destination%20Connector&utm_source=Airbyte%20Hosted%20Docs&utm_medium=Airbyte%20Hosted%20Docs&utm_term=Airbyte%20Hosted%20Docs&utm_content=Airbyte%20Hosted%20Docs) to stream data. Authentication requires your `Project ID` and `Master Key`. To find them, open the `Access` tab from the left-hand side panel. Then check the `Project Details` section.
**Important**: This destination requires the Project's **Master** Key.

#### Timestamp inference

The `Infer Timestamp` field controls whether the connector infers the [keen.timestamp](https://keen.io/docs/streams/overview/data-modeling-guide/#timestamp-data-type) field from event data recorded in the source application. This feature supports historical data synchronisation, giving you the full power of Keen's time series analytics. By default, this property is set to `true`. If you turn it off, `keen.timestamp` uses the date and time when Keen recorded the data.

### Set up the Keen destination in Airbyte

You now have all the parameters required to configure the Keen destination.

- **Project ID**
- **Master API Key**
- **Infer Timestamp**

Connect your first source, then open the Keen application. You can run [custom analysis](https://keen.io/docs/compute/data-explorer-guide/?utm_campaign=Airbyte%20Destination%20Connector&utm_source=Airbyte%20Hosted%20Docs&utm_medium=Airbyte%20Hosted%20Docs&utm_term=Airbyte%20Hosted%20Docs&utm_content=Airbyte%20Hosted%20Docs) on your data and [build interactive dashboards](https://keen.io/docs/visualize/dashboard-creator/dashboard-edition/?utm_campaign=Airbyte%20Destination%20Connector&utm_source=Airbyte%20Hosted%20Docs&utm_medium=Airbyte%20Hosted%20Docs&utm_term=Airbyte%20Hosted%20Docs&utm_content=Airbyte%20Hosted%20Docs) for key stakeholders.

If you have questions, contact team@keen.io for help.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                      |
| :------ | :--------- | :------------------------------------------------------- | :--------------------------------------------------------------------------- |
| 0.2.4   | 2022-08-04 | [15291](https://github.com/airbytehq/airbyte/pull/15291) | Update Keen destination to use outputRecordCollector to properly store state |
| 0.2.3   | 2022-06-17 | [13864](https://github.com/airbytehq/airbyte/pull/13864) | Updated stacktrace format for any trace message errors                       |
| 0.2.1   | 2021-12-30 | [8809](https://github.com/airbytehq/airbyte/pull/8809)   | Update connector fields title/description                                    |
| 0.2.0   | 2021-09-10 | [5973](https://github.com/airbytehq/airbyte/pull/5973)   | Fix timestamp inference for complex schemas                                  |
| 0.1.0   | 2021-08-18 | [5339](https://github.com/airbytehq/airbyte/pull/5339)   | Keen Destination Release!                                                    |

</details>
