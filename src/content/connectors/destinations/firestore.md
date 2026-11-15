---
generated_record: true
connector_name: Google Firestore
connector_type: destination
connector_slug: firestore
connector_directory: destination-firestore
definition_id: 27dc7500-6d1b-40b1-8b07-e2f2aea3c9f4
version: 0.2.22
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/firestore
logo: /images/connectors/destinations/firestore.svg
logo_source_path: airbyte-integrations/connectors/destination-firestore/icon.svg
logo_sha256: 0725d1318aa7fb2a20f335d5910cc44f339d5a4841837a3d901a7e0f54bff630
original_metadata_path: airbyte-integrations/connectors/destination-firestore/metadata.yaml
original_metadata_sha256: f3ddb4eaf3ed007026782903f7a4b56abcbb3984e9528352caf39e794d2c4278
original_document_path: docs/integrations/destinations/firestore.md
original_document_sha256: 01e97e9ad9132e8f3a4ceaa9f17f46645b78523978ff95460a9c413d1a553383
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: e7e620d886d101f2eaf52a323d7f546571bad8d69e3a882c0bfbd0c3cdfe5fb0
rewritten_at: 2026-11-12T13:24:01.030340+00:00
---

# Firestore

Send your data to Google Firestore with this destination.

Google Firestore, officially known as Cloud Firestore, is a flexible, scalable database from Firebase and Google Cloud. It supports mobile, web and server development. Developers commonly use this NoSQL database to sync data across user devices in real time.

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

- An existing GCP project
- A role with permission to create a Service Account Key in GCP

### Step 1: Create a Service Account

1. Log in to the Google Cloud Console. Select the project containing your Firestore database.
2. Go to "IAM & Admin" and select "Service Accounts". Create a Service Account and assign the appropriate roles. Ensure “Cloud Datastore User” or “Firebase Rules System” are enabled.
3. Go to the service account and generate the JSON key. Download it, then copy its contents into the configuration.

## Sync overview

### Output schema

Each stream is output to a BigQuery table.

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                           | Subject                       |
|:--------| :--------- | :----------------------------------------------------- | :---------------------------- |
| 0.2.22 | 2025-05-10 | [59845](https://github.com/airbytehq/airbyte/pull/59845) | Update dependencies |
| 0.2.21 | 2025-05-03 | [59334](https://github.com/airbytehq/airbyte/pull/59334) | Update dependencies |
| 0.2.20 | 2025-04-26 | [58266](https://github.com/airbytehq/airbyte/pull/58266) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57626](https://github.com/airbytehq/airbyte/pull/57626) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57167](https://github.com/airbytehq/airbyte/pull/57167) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56569](https://github.com/airbytehq/airbyte/pull/56569) | Update dependencies |
| 0.2.16 | 2025-03-22 | [56127](https://github.com/airbytehq/airbyte/pull/56127) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55399](https://github.com/airbytehq/airbyte/pull/55399) | Update dependencies |
| 0.2.14 | 2025-03-01 | [54831](https://github.com/airbytehq/airbyte/pull/54831) | Update dependencies |
| 0.2.13 | 2025-03-01 | [54739](https://github.com/airbytehq/airbyte/pull/54739) | Update airbyte-cdk to ^6.0.0 in destination-firestore |
| 0.2.12 | 2025-02-22 | [54230](https://github.com/airbytehq/airbyte/pull/54230) | Update dependencies |
| 0.2.11 | 2025-02-15 | [53881](https://github.com/airbytehq/airbyte/pull/53881) | Update dependencies |
| 0.2.10 | 2025-02-01 | [52890](https://github.com/airbytehq/airbyte/pull/52890) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52152](https://github.com/airbytehq/airbyte/pull/52152) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51229](https://github.com/airbytehq/airbyte/pull/51229) | Update dependencies |
| 0.2.7 | 2025-01-04 | [50911](https://github.com/airbytehq/airbyte/pull/50911) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50507](https://github.com/airbytehq/airbyte/pull/50507) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50212](https://github.com/airbytehq/airbyte/pull/50212) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49294](https://github.com/airbytehq/airbyte/pull/49294) | Update dependencies |
| 0.2.3 | 2024-11-25 | [48681](https://github.com/airbytehq/airbyte/pull/48681) | Update dependencies |
| 0.2.2 | 2024-11-04 | [48223](https://github.com/airbytehq/airbyte/pull/48223) | Update dependencies |
| 0.2.1 | 2024-10-29 | [43758](https://github.com/airbytehq/airbyte/pull/43758) | Update dependencies |
| 0.2.0 | 2024-10-14 | [46874](https://github.com/airbytehq/airbyte/pull/46874) | Bump Airbyte CDK version to 5.13 |
| 0.1.8 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.7 | 2024-07-06 | [40834](https://github.com/airbytehq/airbyte/pull/40834) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40477](https://github.com/airbytehq/airbyte/pull/40477) | Update dependencies |
| 0.1.5 | 2024-06-22 | [40053](https://github.com/airbytehq/airbyte/pull/40053) | Update dependencies |
| 0.1.4 | 2024-06-06 | [39149](https://github.com/airbytehq/airbyte/pull/39149) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.3 | 2024-06-03 | [38902](https://github.com/airbytehq/airbyte/pull/38902) | Replace AirbyteLogger with logging.Logger |
| 0.1.2 | 2024-05-20 | [38422](https://github.com/airbytehq/airbyte/pull/38422) | [autopull] base image + poetry + up_to_date |
| 0.1.1 | 2021-11-21 | [8158](https://github.com/airbytehq/airbyte/pull/8158) | Publish Destination Firestore |

</details>
