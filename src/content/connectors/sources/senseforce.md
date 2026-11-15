---
generated_record: true
connector_name: Senseforce
connector_type: source
connector_slug: senseforce
connector_directory: source-senseforce
definition_id: 39de93cb-1511-473e-a673-5cbedb9436af
version: 0.2.27
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/senseforce
logo: /images/connectors/sources/senseforce.svg
logo_source_path: airbyte-integrations/connectors/source-senseforce/icon.svg
logo_sha256: 587d3ef3cceafcb9e0cddef6897ab8603380cde3ee6b7eb02bb3fc1fe3543e5f
original_metadata_path: airbyte-integrations/connectors/source-senseforce/metadata.yaml
original_metadata_sha256: d473d1e3ca713f39c0134f0dc006f884e5307af01d937100c260359519566f87
original_document_path: docs/integrations/sources/senseforce.md
original_document_sha256: e3172f7bf28a0d262f1cacdb751a4d3221fdc46df0320ba174082590b3d9498a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: b323579e884e50d9bb661acf76850aeb65795272f08e13e036a43273dff8d12c
rewritten_at: 2026-11-12T13:55:10.702483+00:00
---

# Senseforce

Set up the Senseforce source connector by following this guide.

## Sync overview

## Prerequisites

- A [Senseforce Dataset](https://manual.senseforce.io/manual/sf-platform/dataset-builder) to export
- Your [Senseforce `API Access Token`](https://manual.senseforce.io/manual/sf-platform/public-api/get-your-access-token)
- Your [Senseforce `Backend URL`](https://manual.senseforce.io/manual/sf-platform/public-api/endpoints#prerequisites)
- Your [Senseforce `Dataset ID`](https://manual.senseforce.io/manual/sf-platform/public-api/endpoints#prerequisites)

## Create a Senseforce Dataset to export

The Senseforce Airbyte connector lets you export custom datasets created by Senseforce users. Follow these steps to configure an exportable dataset:

1. Create a new, empty dataset as documented [here](https://manual.senseforce.io/manual/sf-platform/dataset-builder).
2. Add these Senseforce system columns. They're available for all your custom data models and event schemas:
   1. Metadata -> Timestamp
   2. Metadata -> Thing
   3. Metadata -> Id
3. Add any other column from your event schemas that you want to export.
4. Enter a descriptive Name and Description, then save the dataset.
5. Note the dataset ID. It's the GUID at the end of the dataset URL path in your browser's address bar.

> **Tip:** For most exports, place the Timestamp column first. The Airbyte connector automatically sorts it in ascending order. Incremental syncs might not work correctly if the Timestamp column isn't first.

> **IMPORTANT:** The Timestamp, Thing and Id columns are required for the connector to work as intended. The connector can still work without a column such as "Id". However, missing any of these three columns might affect functionality. Don't rename these columns. Keep their default names.

## Set up the Senseforce source connector

1. Log in to your [Airbyte Cloud](https://cloud.airbyte.com/workspaces) or Airbyte Open Source account.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Senseforce** from the Source type dropdown.
4. Enter a name for your source.
5. For **API Access Token**, enter your [Senseforce `API Access Token`](https://manual.senseforce.io/manual/sf-platform/public-api/get-your-access-token).
6. For **Senseforce backend URL**, enter your [Senseforce `Backend URL`](https://manual.senseforce.io/manual/sf-platform/public-api/endpoints#prerequisites).
7. For **Dataset ID**, enter your [Senseforce `Dataset ID`](https://manual.senseforce.io/manual/sf-platform/public-api/endpoints#prerequisites).

   Create an API access token specifically for Airbyte to control which resources it can access. For reliable operation, create a separate Airbyte User and a separate Senseforce [Airbyte Group](https://manual.senseforce.io/manual/sf-platform/user-and-group-management). Share the dataset with this group. Grant Dataset Read, Event Schema Read and Machine Master Data Read permissions.

8. For **The first day (in UTC) when to read data from**, enter the day in YYYY-MM-DD format. Data added on or after this day will be replicated.
9. Click **Set up source**.

## Supported sync modes

The Senseforce source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh
- Incremental

> **NOTE:** The Senseforce Airbyte connector uses the Timestamp column to identify data it has already read. After a sync finishes, newly inserted data with earlier timestamps won't be included in the next sync.
> If this behaviour doesn't suit your use case, follow the next section.

### Use Inserted Timestamp for incremental modes

1. Rename your "Timestamp" column to "Timestamp_data".
2. Add the Metadata -> Inserted column to your dataset.
3. Move the new "Inserted" column to position 1.
4. Rename the "Inserted" column to "Timestamp".

The inserted timestamp will now create the Airbyte cursor. This method produces slower syncs because Senseforce queries generate Datasets more slowly than when using the data timestamp.

## Supported streams

The Senseforce source connector supports these streams:

- [Senseforce Datasets](https://manual.senseforce.io/manual/sf-platform/public-api/endpoints)

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | Yes                  |       |

### Performance considerations

Senseforce applies an undocumented rate limit. During normal use, it shouldn't trigger, even with huge datasets.
[Create an issue](https://github.com/airbytehq/airbyte/issues) if you experience rate limit issues that automatic retries don't resolve.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                       |
| :------ | :--------- | :-------------------------------------------------------- | :-------------------------------------------- |
| 0.2.27 | 2025-05-24 | [60492](https://github.com/airbytehq/airbyte/pull/60492) | Update dependencies |
| 0.2.26 | 2025-05-10 | [60180](https://github.com/airbytehq/airbyte/pull/60180) | Update dependencies |
| 0.2.25 | 2025-05-04 | [59594](https://github.com/airbytehq/airbyte/pull/59594) | Update dependencies |
| 0.2.24 | 2025-04-27 | [59027](https://github.com/airbytehq/airbyte/pull/59027) | Update dependencies |
| 0.2.23 | 2025-04-19 | [58378](https://github.com/airbytehq/airbyte/pull/58378) | Update dependencies |
| 0.2.22 | 2025-04-12 | [58005](https://github.com/airbytehq/airbyte/pull/58005) | Update dependencies |
| 0.2.21 | 2025-04-05 | [57476](https://github.com/airbytehq/airbyte/pull/57476) | Update dependencies |
| 0.2.20 | 2025-03-29 | [56906](https://github.com/airbytehq/airbyte/pull/56906) | Update dependencies |
| 0.2.19 | 2025-03-22 | [56323](https://github.com/airbytehq/airbyte/pull/56323) | Update dependencies |
| 0.2.18 | 2025-03-08 | [55611](https://github.com/airbytehq/airbyte/pull/55611) | Update dependencies |
| 0.2.17 | 2025-03-01 | [55006](https://github.com/airbytehq/airbyte/pull/55006) | Update dependencies |
| 0.2.16 | 2025-02-23 | [54562](https://github.com/airbytehq/airbyte/pull/54562) | Update dependencies |
| 0.2.15 | 2025-02-15 | [54005](https://github.com/airbytehq/airbyte/pull/54005) | Update dependencies |
| 0.2.14 | 2025-02-08 | [53498](https://github.com/airbytehq/airbyte/pull/53498) | Update dependencies |
| 0.2.13 | 2025-02-01 | [52957](https://github.com/airbytehq/airbyte/pull/52957) | Update dependencies |
| 0.2.12 | 2025-01-25 | [52483](https://github.com/airbytehq/airbyte/pull/52483) | Update dependencies |
| 0.2.11 | 2025-01-18 | [51912](https://github.com/airbytehq/airbyte/pull/51912) | Update dependencies |
| 0.2.10 | 2025-01-11 | [51356](https://github.com/airbytehq/airbyte/pull/51356) | Update dependencies |
| 0.2.9 | 2024-12-28 | [50738](https://github.com/airbytehq/airbyte/pull/50738) | Update dependencies |
| 0.2.8 | 2024-12-21 | [50235](https://github.com/airbytehq/airbyte/pull/50235) | Update dependencies |
| 0.2.7 | 2024-12-14 | [49662](https://github.com/airbytehq/airbyte/pull/49662) | Update dependencies |
| 0.2.6 | 2024-12-12 | [49341](https://github.com/airbytehq/airbyte/pull/49341) | Update dependencies |
| 0.2.5 | 2024-12-11 | [49100](https://github.com/airbytehq/airbyte/pull/49100) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.4 | 2024-11-04 | [48166](https://github.com/airbytehq/airbyte/pull/48166) | Update dependencies |
| 0.2.3 | 2024-10-29 | [47765](https://github.com/airbytehq/airbyte/pull/47765) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47567](https://github.com/airbytehq/airbyte/pull/47567) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44073](https://github.com/airbytehq/airbyte/pull/44073) | Refactor connector to manifest-only format |
| 0.1.15 | 2024-08-12 | [43865](https://github.com/airbytehq/airbyte/pull/43865) | Update dependencies |
| 0.1.14 | 2024-08-10 | [43704](https://github.com/airbytehq/airbyte/pull/43704) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43274](https://github.com/airbytehq/airbyte/pull/43274) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42763](https://github.com/airbytehq/airbyte/pull/42763) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42247](https://github.com/airbytehq/airbyte/pull/42247) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41792](https://github.com/airbytehq/airbyte/pull/41792) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41402](https://github.com/airbytehq/airbyte/pull/41402) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41242](https://github.com/airbytehq/airbyte/pull/41242) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40914](https://github.com/airbytehq/airbyte/pull/40914) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40380](https://github.com/airbytehq/airbyte/pull/40380) | Update dependencies |
| 0.1.5 | 2024-06-22 | [40190](https://github.com/airbytehq/airbyte/pull/40190) | Update dependencies |
| 0.1.4 | 2024-06-15 | [39462](https://github.com/airbytehq/airbyte/pull/39462) | Make compatible with builder |
| 0.1.3 | 2024-06-04 | [39073](https://github.com/airbytehq/airbyte/pull/39073) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.2 | 2024-05-20 | [38431](https://github.com/airbytehq/airbyte/pull/38431) | [autopull] base image + poetry + up_to_date |
| 0.1.1 | 2023-02-13 | [22892](https://github.com/airbytehq/airbyte/pull/22892) | Specified date formatting in specification |
|  0.1.0  | 2022-10-26 | [#18775](https://github.com/airbytehq/airbyte/pull/18775) | 🎉 New Source: Mailjet SMS API [low-code CDK] |

</details>
