---
generated_record: true
connector_name: Captain Data
connector_type: source
connector_slug: captain-data
connector_directory: source-captain-data
definition_id: fa290790-1dca-43e7-8ced-6a40b2a66099
version: 0.2.26
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/captain-data
logo: /images/connectors/sources/captain-data.svg
logo_source_path: airbyte-integrations/connectors/source-captain-data/icon.svg
logo_sha256: c1389f560f2b388494750374851ec1d1fa0a5492f4e7993f71d5b46998490ace
original_metadata_path: airbyte-integrations/connectors/source-captain-data/metadata.yaml
original_metadata_sha256: e9dadd6bb5b7f9b1451a642984a3611f805605cddb062e3411ad13818f92e5a4
original_document_path: docs/integrations/sources/captain-data.md
original_document_sha256: 9efe61bdea1859b35440a9c69d88fb9a731330d69e8278ac1dad0246898ccd78
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 53c694fba856ec12b818bd80e569c3c0a695810792c9960fa9c0f5147d93615a
rewritten_at: 2026-11-12T13:32:54.236495+00:00
---

# Captain Data

:::warning

## Connector archived

The Captain Data source connector is archived. It’s no longer available in Airbyte Cloud or Airbyte Open Source.

This connector was built on the Captain Data **v3 API** (`https://api.captaindata.co/v3/`). Captain Data discontinued the v3 API on 9 January 2026. Captain Data stated: "Captain Data v3 has been officially sunset. All v3 features and endpoints are no longer available." See the [Captain Data product updates](https://docs.captaindata.com/v1/changelog/overview). Every endpoint used by this connector now returns `404 Not Found`. These endpoints are `/workspace`, `/workflows`, `/workflows/{uid}/jobs` and `/jobs/{uid}/results`. As a result, the connector can no longer connect or sync.

The replacement [Captain Data v1 API](https://docs.captaindata.com/v1/introduction) is a people and company enrichment API. It doesn’t expose the workflow, job or job result resources used by this connector. Therefore, there’s no drop-in migration path.

### Recommended action

To sync data from the new Captain Data v1 API, build a custom connector with the [Connector Builder](https://docs.airbyte.com/platform/connector-development/connector-builder-ui/overview).

:::

Use this page to set up and reference the [Captain Data](https://docs.captaindata.co/#intro) source connector.

## Prerequisites

You need an api key and project UID for this connector. Generate them from the dashboard settings (see https://app.captaindata.co/settings).

## Setup guide

### Step 1: Configure Captain Data

- Available parameters
  - api_key: The api_key
  - project_uid: The project UID

## Step 2: Configure the connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.io/workspaces) account.
2. In the left navigation bar, click **Sources**. Then, click **+new source** in the top-right corner.
3. On the Set up the source page, enter a name for the Captain Data connector. Select **Captain Data** from the Source type dropdown.
4. Enter your `api_key` and `project_uid`.
5. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Enter a name for your source.
3. Enter your `api_key` and `project_uid`.
4. Click **Set up source**.

## Supported sync modes

The Captain Data source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- workspace
- workflows
- jobs
- job_results

## API method example

GET https://api.captaindata.co/v3/

## Performance considerations

Captain Data [API reference](https://docs.captaindata.co/#intro) currently has v3. The connector uses v3 by default.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                            | Subject                                     |
| :------ |:-----------| :------------------------------------------------------ |:--------------------------------------------|
| 0.2.26 | 2026-10-07 | [88177](https://github.com/airbytehq/airbyte/pull/88177) | Archive connector: Captain Data sunset the v3 API on 2026-01-09; all endpoints return 404 |
| 0.2.25 | 2026-06-02 | [78635](https://github.com/airbytehq/airbyte/pull/78635) | Update dependencies |
| 0.2.24 | 2025-05-10 | [59884](https://github.com/airbytehq/airbyte/pull/59884) | Update dependencies |
| 0.2.23 | 2025-05-03 | [59321](https://github.com/airbytehq/airbyte/pull/59321) | Update dependencies |
| 0.2.22 | 2025-04-26 | [58708](https://github.com/airbytehq/airbyte/pull/58708) | Update dependencies |
| 0.2.21 | 2025-04-19 | [58274](https://github.com/airbytehq/airbyte/pull/58274) | Update dependencies |
| 0.2.20 | 2025-04-12 | [57657](https://github.com/airbytehq/airbyte/pull/57657) | Update dependencies |
| 0.2.19 | 2025-04-05 | [57117](https://github.com/airbytehq/airbyte/pull/57117) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56572](https://github.com/airbytehq/airbyte/pull/56572) | Update dependencies |
| 0.2.17 | 2025-03-22 | [56152](https://github.com/airbytehq/airbyte/pull/56152) | Update dependencies |
| 0.2.16 | 2025-03-08 | [55396](https://github.com/airbytehq/airbyte/pull/55396) | Update dependencies |
| 0.2.15 | 2025-03-01 | [54834](https://github.com/airbytehq/airbyte/pull/54834) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54232](https://github.com/airbytehq/airbyte/pull/54232) | Update dependencies |
| 0.2.13 | 2025-02-15 | [53900](https://github.com/airbytehq/airbyte/pull/53900) | Update dependencies |
| 0.2.12 | 2025-02-08 | [53403](https://github.com/airbytehq/airbyte/pull/53403) | Update dependencies |
| 0.2.11 | 2025-02-01 | [52892](https://github.com/airbytehq/airbyte/pull/52892) | Update dependencies |
| 0.2.10 | 2025-01-25 | [52185](https://github.com/airbytehq/airbyte/pull/52185) | Update dependencies |
| 0.2.9 | 2025-01-18 | [51741](https://github.com/airbytehq/airbyte/pull/51741) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51277](https://github.com/airbytehq/airbyte/pull/51277) | Update dependencies |
| 0.2.7 | 2024-12-28 | [50475](https://github.com/airbytehq/airbyte/pull/50475) | Update dependencies |
| 0.2.6 | 2024-12-21 | [50192](https://github.com/airbytehq/airbyte/pull/50192) | Update dependencies |
| 0.2.5 | 2024-12-14 | [49569](https://github.com/airbytehq/airbyte/pull/49569) | Update dependencies |
| 0.2.4 | 2024-12-12 | [49299](https://github.com/airbytehq/airbyte/pull/49299) | Update dependencies |
| 0.2.3 | 2024-12-11 | [48900](https://github.com/airbytehq/airbyte/pull/48900) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.2 | 2024-11-04 | [48177](https://github.com/airbytehq/airbyte/pull/48177) | Update dependencies |
| 0.2.1 | 2024-10-29 | [47769](https://github.com/airbytehq/airbyte/pull/47769) | Update dependencies |
| 0.2.0 | 2024-08-19 | [44419](https://github.com/airbytehq/airbyte/pull/44419) | Refactor connector to manifest-only format |
| 0.1.15 | 2024-08-17 | [44340](https://github.com/airbytehq/airbyte/pull/44340) | Update dependencies |
| 0.1.14 | 2024-08-12 | [43919](https://github.com/airbytehq/airbyte/pull/43919) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43531](https://github.com/airbytehq/airbyte/pull/43531) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43136](https://github.com/airbytehq/airbyte/pull/43136) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42717](https://github.com/airbytehq/airbyte/pull/42717) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42137](https://github.com/airbytehq/airbyte/pull/42137) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41751](https://github.com/airbytehq/airbyte/pull/41751) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41583](https://github.com/airbytehq/airbyte/pull/41583) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41321](https://github.com/airbytehq/airbyte/pull/41321) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40886](https://github.com/airbytehq/airbyte/pull/40886) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40486](https://github.com/airbytehq/airbyte/pull/40486) | Update dependencies |
| 0.1.4 | 2024-06-21 | [39929](https://github.com/airbytehq/airbyte/pull/39929) | Update dependencies |
| 0.1.3 | 2024-06-15 | [39508](https://github.com/airbytehq/airbyte/pull/39508) | Make connector compatible with Builder |
| 0.1.2 | 2024-06-04 | [38951](https://github.com/airbytehq/airbyte/pull/38951) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-20 | [38374](https://github.com/airbytehq/airbyte/pull/38374) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2023-04-15 | [Init](https://github.com/airbytehq/airbyte/pull/25230) | Initial commit                              |

</details>
