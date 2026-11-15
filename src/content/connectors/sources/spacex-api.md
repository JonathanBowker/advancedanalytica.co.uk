---
generated_record: true
connector_name: SpaceX API
connector_type: source
connector_slug: spacex-api
connector_directory: source-spacex-api
definition_id: 62235e65-af7a-4138-9130-0bda954eb6a8
version: 0.2.23
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/spacex-api
logo: /images/connectors/sources/spacex-api.svg
logo_source_path: airbyte-integrations/connectors/source-spacex-api/icon.svg
logo_sha256: f9bc1a71575278e92d831934e89acd0d57363a7bb6ec8bf38d5080e3892c4f32
original_metadata_path: airbyte-integrations/connectors/source-spacex-api/metadata.yaml
original_metadata_sha256: 0db3db528e35f130246c023f1fcd3ba16b51b931210036cbec7d79054822c38c
original_document_path: docs/integrations/sources/spacex-api.md
original_document_sha256: 4706d4f3484d8cdb9a48195e1c52850c09aefdbfe9d7b7156a1429e355afcd8a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1b90e635c57b9d9799ae8a2305150a8e52c1a40be0370ec57014a6e0c7173141
rewritten_at: 2026-11-12T13:57:06.173729+00:00
---

# SpaceX-API

:::warning

## Deprecation notice

The SpaceX-API source connector is archived. It’s no longer available in Airbyte Cloud or Airbyte Open Source.

The upstream community-run [r/SpaceX REST API](https://github.com/r-spacex/SpaceX-API) (`api.spacexdata.com`) was [wound down by its maintainer in October 2022](https://github.com/r-spacex/SpaceX-API/issues/1243), and its GitHub repository was archived in August 2024. Since mid-2026, every endpoint has returned Cloudflare origin errors (HTTP 521/522/525). Therefore, this connector hasn’t completed a successful sync for over a year and can’t be fixed.

### Recommended actions

The maintainer recommends moving to the [Launch Library 2 API](https://thespacedevs.com/llapi) by The Space Devs. It covers the same launch, rocket and pad data. To continue syncing SpaceX data, build a custom connector for that API. For guidance, visit [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

Use this page to find setup guidance and reference information for the [SpaceX-API](https://github.com/r-spacex/SpaceX-API) source connector.

## Prerequisites

There are no prerequisites. However, you need a dummy api_key to improve security in a future build. Check the available routes at [SpaceX Routes](https://github.com/r-spacex/SpaceX-API/tree/master/routes).

## Setup guide

### Step 1: Set up your SpaceX connection

- Have a dummy API key, for example, 12345.
- Have a specific id if you need specific information.

## Step 2: Set up the SpaceX-API connector in Airbyte

### Airbyte Cloud

1. Have an [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. Then, click **+new source** in the top-right corner.
3. On the Set up the source page, name the SpaceX-API connector. Select **Spacex-API** from the Source type dropdown.
4. Enter your `api_key`.
5. Enter your `id` if needed. This field is optional.
6. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Name your source.
3. Enter your `api_key`.
4. Enter your `id` if needed. This field is optional.
5. Click **Set up source**.

## Supported sync modes

The SpaceX-API source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
|:------------------------------|:-----------|
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- Launches
- Capsules
- Company
- Crew
- Cores
- Dragons
- History
- Landpads
- Payloads
- Roadster
- Rockets
- Ships
- Starlink

## API method example

`GET https://api.spacexdata.com/v5/launches/latest`

## Performance considerations

The SpaceX API offers v4 and v5 for [launches](https://github.com/r-spacex/SpaceX-API/tree/master/docs/launches). The connector uses V4 by default because it has fewer bugs.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                           |
|:--------|:-----------|:---------------------------------------------------------|:--------------------------------------------------|
| 0.2.23 | 2026-10-07 | [PR](https://github.com/airbytehq/airbyte/pull/88280) | Archive connector: upstream r/SpaceX API (api.spacexdata.com) is shut down |
| 0.2.22 | 2025-05-10 | [60164](https://github.com/airbytehq/airbyte/pull/60164) | Update dependencies |
| 0.2.21 | 2025-05-04 | [59612](https://github.com/airbytehq/airbyte/pull/59612) | Update dependencies |
| 0.2.20 | 2025-04-27 | [59001](https://github.com/airbytehq/airbyte/pull/59001) | Update dependencies |
| 0.2.19 | 2025-04-19 | [58377](https://github.com/airbytehq/airbyte/pull/58377) | Update dependencies |
| 0.2.18 | 2025-04-12 | [57958](https://github.com/airbytehq/airbyte/pull/57958) | Update dependencies |
| 0.2.17 | 2025-04-05 | [57482](https://github.com/airbytehq/airbyte/pull/57482) | Update dependencies |
| 0.2.16 | 2025-03-29 | [56321](https://github.com/airbytehq/airbyte/pull/56321) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55619](https://github.com/airbytehq/airbyte/pull/55619) | Update dependencies |
| 0.2.14 | 2025-03-01 | [55114](https://github.com/airbytehq/airbyte/pull/55114) | Update dependencies |
| 0.2.13 | 2025-02-22 | [54522](https://github.com/airbytehq/airbyte/pull/54522) | Update dependencies |
| 0.2.12 | 2025-02-15 | [54037](https://github.com/airbytehq/airbyte/pull/54037) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53552](https://github.com/airbytehq/airbyte/pull/53552) | Update dependencies |
| 0.2.10 | 2025-02-01 | [53062](https://github.com/airbytehq/airbyte/pull/53062) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52399](https://github.com/airbytehq/airbyte/pull/52399) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51946](https://github.com/airbytehq/airbyte/pull/51946) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51423](https://github.com/airbytehq/airbyte/pull/51423) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50819](https://github.com/airbytehq/airbyte/pull/50819) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50354](https://github.com/airbytehq/airbyte/pull/50354) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49752](https://github.com/airbytehq/airbyte/pull/49752) | Update dependencies |
| 0.2.3 | 2024-12-12 | [48197](https://github.com/airbytehq/airbyte/pull/48197) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47561](https://github.com/airbytehq/airbyte/pull/47561) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-09 | [43431](https://github.com/airbytehq/airbyte/pull/43431) | Refactor connector to manifest-only format |
| 0.1.13 | 2024-08-03 | [43176](https://github.com/airbytehq/airbyte/pull/43176) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42792](https://github.com/airbytehq/airbyte/pull/42792) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42261](https://github.com/airbytehq/airbyte/pull/42261) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41909](https://github.com/airbytehq/airbyte/pull/41909) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41569](https://github.com/airbytehq/airbyte/pull/41569) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41089](https://github.com/airbytehq/airbyte/pull/41089) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40771](https://github.com/airbytehq/airbyte/pull/40771) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40463](https://github.com/airbytehq/airbyte/pull/40463) | Update dependencies |
| 0.1.5 | 2024-06-22 | [40165](https://github.com/airbytehq/airbyte/pull/40165) | Update dependencies |
| 0.1.4 | 2024-06-04 | [38976](https://github.com/airbytehq/airbyte/pull/38976) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.3 | 2024-05-30 | [38504](https://github.com/airbytehq/airbyte/pull/38504) | [autopull] base image + poetry + up_to_date |
| 0.1.2 | 2024-05-28 | [38603](https://github.com/airbytehq/airbyte/pull/38603) | Make connector compatible with builder |
| 0.1.1 | 2023-11-08 | [32202](https://github.com/airbytehq/airbyte/pull/32202) | Adjust schemas to cover all fields in the records |
| 0.1.0   | 2022-10-22 | [Init](https://github.com/airbytehq/airbyte/pull/18311)  | Initial commit                                    |

</details>
