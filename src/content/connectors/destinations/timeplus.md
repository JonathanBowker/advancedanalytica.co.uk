---
generated_record: true
connector_name: Timeplus
connector_type: destination
connector_slug: timeplus
connector_directory: destination-timeplus
definition_id: f70a8ece-351e-4790-b37b-cb790bcd6d54
version: 0.1.46
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/timeplus
logo: /images/connectors/destinations/timeplus.svg
logo_source_path: airbyte-integrations/connectors/destination-timeplus/icon.svg
logo_sha256: a74d8e48ae051b7417b6c46713c8db85543041d58069fea7d36a642c0ebab5e4
original_metadata_path: airbyte-integrations/connectors/destination-timeplus/metadata.yaml
original_metadata_sha256: 1c31f39530692704a3265c394d23c3126b930a9275e876b340430621be606430
original_document_path: docs/integrations/destinations/timeplus.md
original_document_sha256: 24ff5b1fb7c0ef86c15bd521c063be3e299f6fae8a134f890d40c86af375ad37
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4c98e8dd633e40d8d74196e104a96c1b010d20455f96a0336ad8eef3e7e4b32f
rewritten_at: 2026-11-12T13:27:46.662313+00:00
---

# Timeplus

:::warning

## Deprecation notice

The Timeplus destination connector is archived. It’s no longer available in Airbyte Cloud or Airbyte Open Source.

This connector only supported [Timeplus Cloud](https://us-west-2.timeplus.cloud/), using API-key authentication against `https://<region>.timeplus.cloud/<workspace_id>`. The vendor has discontinued this service. The Timeplus Cloud endpoint now responds with "No new workspace can be created in Timeplus Cloud". Existing workspace hosts no longer resolve. Timeplus now offers [Timeplus Enterprise](https://www.timeplus.com/download) for self-hosting. Its [REST API](https://docs.timeplus.com/rest) uses basic authentication and isn’t compatible with this connector.

### Recommended actions

To load data into Timeplus Enterprise, use the [Timeplus ingest REST API](https://docs.timeplus.com/ingest-api) or build a custom connector. For guidance, visit the [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

This page guides you through setting up the [Timeplus](https://timeplus.com) destination connector.

#### Output schema

The connector outputs each stream to its own Timeplus stream, with corresponding schemas and columns.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started with Airbyte Cloud

The Timeplus destination connector is available in the Airbyte Cloud marketplace.

## Get started with Airbyte Open Source

Follow the [Quickstart with Timeplus Ingestion API](https://docs.timeplus.com/quickstart-ingest-api) to create a workspace and API key.

### Set up the Timeplus destination in Airbyte

You now have everything needed to configure Timeplus as a destination in the UI.
You’ll need the following information:

- **Endpoint**, for example https://us-west-2.timeplus.cloud/randomId123
- **API key**

## Compatibility

## Namespace support

This destination doesn’t support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject              |
|:--------| :--------- | :-------------------------------------------------------- | :------------------- |
| 0.1.46 | 2026-10-07 | [88314](https://github.com/airbytehq/airbyte/pull/88314) | Archive connector: Timeplus Cloud has been discontinued by the vendor; drop legacy `main.py` from poetry packages so the image builds |
| 0.1.45 | 2025-05-10 | [59836](https://github.com/airbytehq/airbyte/pull/59836) | Update dependencies |
| 0.1.44 | 2025-05-03 | [59343](https://github.com/airbytehq/airbyte/pull/59343) | Update dependencies |
| 0.1.43 | 2025-04-26 | [58263](https://github.com/airbytehq/airbyte/pull/58263) | Update dependencies |
| 0.1.42 | 2025-04-12 | [57625](https://github.com/airbytehq/airbyte/pull/57625) | Update dependencies |
| 0.1.41 | 2025-04-05 | [57181](https://github.com/airbytehq/airbyte/pull/57181) | Update dependencies |
| 0.1.40 | 2025-03-29 | [56620](https://github.com/airbytehq/airbyte/pull/56620) | Update dependencies |
| 0.1.39 | 2025-03-22 | [56129](https://github.com/airbytehq/airbyte/pull/56129) | Update dependencies |
| 0.1.38 | 2025-03-08 | [55371](https://github.com/airbytehq/airbyte/pull/55371) | Update dependencies |
| 0.1.37 | 2025-03-01 | [54249](https://github.com/airbytehq/airbyte/pull/54249) | Update dependencies |
| 0.1.36 | 2025-02-15 | [53867](https://github.com/airbytehq/airbyte/pull/53867) | Update dependencies |
| 0.1.35 | 2025-02-08 | [53417](https://github.com/airbytehq/airbyte/pull/53417) | Update dependencies |
| 0.1.34 | 2025-02-01 | [52897](https://github.com/airbytehq/airbyte/pull/52897) | Update dependencies |
| 0.1.33 | 2025-01-25 | [52195](https://github.com/airbytehq/airbyte/pull/52195) | Update dependencies |
| 0.1.32 | 2025-01-18 | [51717](https://github.com/airbytehq/airbyte/pull/51717) | Update dependencies |
| 0.1.31 | 2025-01-11 | [51271](https://github.com/airbytehq/airbyte/pull/51271) | Update dependencies |
| 0.1.30 | 2025-01-04 | [50907](https://github.com/airbytehq/airbyte/pull/50907) | Update dependencies |
| 0.1.29 | 2024-12-28 | [50176](https://github.com/airbytehq/airbyte/pull/50176) | Update dependencies |
| 0.1.28 | 2024-12-14 | [48930](https://github.com/airbytehq/airbyte/pull/48930) | Update dependencies |
| 0.1.27 | 2024-11-25 | [48273](https://github.com/airbytehq/airbyte/pull/48273) | Update dependencies |
| 0.1.26 | 2024-10-29 | [47059](https://github.com/airbytehq/airbyte/pull/47059) | Update dependencies |
| 0.1.25 | 2024-10-12 | [46788](https://github.com/airbytehq/airbyte/pull/46788) | Update dependencies |
| 0.1.24 | 2024-10-05 | [46443](https://github.com/airbytehq/airbyte/pull/46443) | Update dependencies |
| 0.1.23 | 2024-09-28 | [46130](https://github.com/airbytehq/airbyte/pull/46130) | Update dependencies |
| 0.1.22 | 2024-09-21 | [45826](https://github.com/airbytehq/airbyte/pull/45826) | Update dependencies |
| 0.1.21 | 2024-09-14 | [45568](https://github.com/airbytehq/airbyte/pull/45568) | Update dependencies |
| 0.1.20 | 2024-09-08 | [44758](https://github.com/airbytehq/airbyte/pull/44758) | Support new Timeplus Cloud using latest timeplus Python SDK |
| 0.1.19 | 2024-09-07 | [45218](https://github.com/airbytehq/airbyte/pull/45218) | Update dependencies |
| 0.1.18 | 2024-08-31 | [45020](https://github.com/airbytehq/airbyte/pull/45020) | Update dependencies |
| 0.1.17 | 2024-08-24 | [44707](https://github.com/airbytehq/airbyte/pull/44707) | Update dependencies |
| 0.1.16 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.15 | 2024-08-17 | [44363](https://github.com/airbytehq/airbyte/pull/44363) | Update dependencies |
| 0.1.14 | 2024-08-12 | [43854](https://github.com/airbytehq/airbyte/pull/43854) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43216](https://github.com/airbytehq/airbyte/pull/43216) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42761](https://github.com/airbytehq/airbyte/pull/42761) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42354](https://github.com/airbytehq/airbyte/pull/42354) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41861](https://github.com/airbytehq/airbyte/pull/41861) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41392](https://github.com/airbytehq/airbyte/pull/41392) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41257](https://github.com/airbytehq/airbyte/pull/41257) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40864](https://github.com/airbytehq/airbyte/pull/40864) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40270](https://github.com/airbytehq/airbyte/pull/40270) | Update dependencies |
| 0.1.5 | 2024-06-22 | [39990](https://github.com/airbytehq/airbyte/pull/39990) | Update dependencies |
| 0.1.4 | 2024-06-06 | [39301](https://github.com/airbytehq/airbyte/pull/39301) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.3 | 2024-06-03 | [38901](https://github.com/airbytehq/airbyte/pull/38901) | Replace AirbyteLogger with logging.Logger |
| 0.1.2 | 2024-05-21 | [38491](https://github.com/airbytehq/airbyte/pull/38491) | [autopull] base image + poetry + up_to_date |
| 0.1.1   | 2024-03-05 | [#35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector |
| 0.1.0   | 2023-06-14 | [21226](https://github.com/airbytehq/airbyte/pull/21226)  | Destination Timeplus |

</details>
