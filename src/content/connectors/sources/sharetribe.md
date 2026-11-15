---
generated_record: true
connector_name: Sharetribe
connector_type: source
connector_slug: sharetribe
connector_directory: source-sharetribe
definition_id: efe368ce-cd19-4be4-a2b1-11c69dc6bffb
version: 0.0.64
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/sharetribe
logo: /images/connectors/sources/sharetribe.svg
logo_source_path: airbyte-integrations/connectors/source-sharetribe/icon.svg
logo_sha256: 48193762be1c0a0d3fe8d6b3ddd335eb7df58d8b13b69969db2864bcf5c8b931
original_metadata_path: airbyte-integrations/connectors/source-sharetribe/metadata.yaml
original_metadata_sha256: 9f13c8ac2178ee1072b85661913b71adc94207fefbed0c3a6a341701b608760c
original_document_path: docs/integrations/sources/sharetribe.md
original_document_sha256: aacd35084f5514ca5a2a6da3e00186366e0f32161ece496570b791c6b6fa3824
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 04379a39c69ccc9ec5f1799cf7b3798cd0b3714a6d59335049fa9943b69605d3
rewritten_at: 2026-11-12T13:55:26.565101+00:00
---

# Sharetribe

This guide explains how the Sharetribe source connector ingests data from the sharetribe integrations API.
Sharetribe is a no-code marketplace builder. The important streams are `listings` and `transactions`.
All streams support incremental sync, except the `marketplace` endpoint.

## Prerequisites

The source supports several API changes. For more information, see the website https://www.sharetribe.com/.
This source uses OAuth configuration to handle requests.

After creating an account, log in and go to your sharetribe console.
In the sidebar, find the `Advanced` section and click `Application` to create an application.
You need a client_ID and client_secret to set up a connection. Note these credentials.
For more API details, see https://www.sharetribe.com/api-reference/integration.html.

## Set up the Adjust source connector

1. Click **Sources**, then click **+ New source**.
2. On the Set up the source page, select **Sharetribe** from the Source type dropdown.
3. Enter a name for your new source.
4. For **Client Id**, enter the client_id you obtained in the previous step.
5. For **Client Secret**, enter the client_secret you obtained in the previous step.
6. For **Start Date**, enter the date from which you want to sync records.
7. Click **Set up source**.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `client_id` | `string` | Client ID.  |  |
| `client_secret` | `string` | Client secret.  |  |
| `oauth_access_token` | `string` | Access token. The current access token. This field might be overridden by the connector based on the token refresh endpoint response. |  |
| `oauth_token_expiry_date` | `string` | Token expiry date. The date the current access token expires in. This field might be overridden by the connector based on the token refresh endpoint response. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| users | id | Default pagination | ✅ |   ✅ |
| marketplace | id | No pagination | ✅ |  ❌  |
| listings | id | Default pagination | ✅ |  ✅  |
| transactions | id | Default pagination | ✅ |  ✅  |
| events | id | Default pagination | ✅ |  ✅  |
| bookings | id | Default pagination | ✅ |  ✅  |
| messages | id | Default pagination | ✅ |  ✅  |
| reviews | id | Default pagination | ✅ |  ✅  |

:::note
Sharetribe retains marketplace events for only 90 days on live marketplaces. It retains them for 7 days on dev and test marketplaces.
The `events/query` endpoint rejects a `createdAtStart` older than the applicable retention period.
The `events` stream therefore never requests events older than 89 days, regardless of the configured **Start date**.
A full event history isn't available from the API.
:::

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.64 | 2026-11-10 | [91714](https://github.com/airbytehq/airbyte/pull/91714) | Update dependencies |
| 0.0.63 | 2026-11-03 | [90730](https://github.com/airbytehq/airbyte/pull/90730) | Update dependencies |
| 0.0.62 | 2026-10-27 | [90049](https://github.com/airbytehq/airbyte/pull/90049) | Update dependencies |
| 0.0.61 | 2026-10-20 | [89377](https://github.com/airbytehq/airbyte/pull/89377) | Update dependencies |
| 0.0.60 | 2026-10-13 | [88798](https://github.com/airbytehq/airbyte/pull/88798) | Update dependencies |
| 0.0.59 | 2026-10-07 | [88248](https://github.com/airbytehq/airbyte/pull/88248) | Fix `events` stream failing with `Start time cannot be more than 90 day(s) in the past` by clamping `createdAtStart` to the API retention window |
| 0.0.58 | 2026-10-06 | [88024](https://github.com/airbytehq/airbyte/pull/88024) | Update dependencies |
| 0.0.57 | 2026-09-29 | [87340](https://github.com/airbytehq/airbyte/pull/87340) | Update dependencies |
| 0.0.56 | 2026-09-22 | [86800](https://github.com/airbytehq/airbyte/pull/86800) | Update dependencies |
| 0.0.55 | 2026-09-15 | [86207](https://github.com/airbytehq/airbyte/pull/86207) | Update dependencies |
| 0.0.54 | 2026-09-08 | [85625](https://github.com/airbytehq/airbyte/pull/85625) | Update dependencies |
| 0.0.53 | 2026-08-18 | [84743](https://github.com/airbytehq/airbyte/pull/84743) | Update dependencies |
| 0.0.52 | 2026-08-11 | [84086](https://github.com/airbytehq/airbyte/pull/84086) | Update dependencies |
| 0.0.51 | 2026-08-04 | [83599](https://github.com/airbytehq/airbyte/pull/83599) | Update dependencies |
| 0.0.50 | 2026-07-28 | [83076](https://github.com/airbytehq/airbyte/pull/83076) | Update dependencies |
| 0.0.49 | 2026-07-21 | [82596](https://github.com/airbytehq/airbyte/pull/82596) | Update dependencies |
| 0.0.48 | 2026-07-14 | [82012](https://github.com/airbytehq/airbyte/pull/82012) | Update dependencies |
| 0.0.47 | 2026-06-30 | [81256](https://github.com/airbytehq/airbyte/pull/81256) | Update dependencies |
| 0.0.46 | 2026-06-23 | [80655](https://github.com/airbytehq/airbyte/pull/80655) | Update dependencies |
| 0.0.45 | 2026-06-16 | [80041](https://github.com/airbytehq/airbyte/pull/80041) | Update dependencies |
| 0.0.44 | 2026-06-09 | [79490](https://github.com/airbytehq/airbyte/pull/79490) | Update dependencies |
| 0.0.43 | 2026-06-02 | [78940](https://github.com/airbytehq/airbyte/pull/78940) | Update dependencies |
| 0.0.42 | 2026-04-28 | [77418](https://github.com/airbytehq/airbyte/pull/77418) | Update dependencies |
| 0.0.41 | 2026-04-21 | [76770](https://github.com/airbytehq/airbyte/pull/76770) | Update dependencies |
| 0.0.40 | 2026-03-17 | [75114](https://github.com/airbytehq/airbyte/pull/75114) | Update dependencies |
| 0.0.39 | 2026-02-24 | [73970](https://github.com/airbytehq/airbyte/pull/73970) | Update dependencies |
| 0.0.38 | 2026-01-20 | [72145](https://github.com/airbytehq/airbyte/pull/72145) | Update dependencies |
| 0.0.37 | 2026-01-14 | [71631](https://github.com/airbytehq/airbyte/pull/71631) | Update dependencies |
| 0.0.36 | 2025-12-18 | [70667](https://github.com/airbytehq/airbyte/pull/70667) | Update dependencies |
| 0.0.35 | 2025-11-25 | [70074](https://github.com/airbytehq/airbyte/pull/70074) | Update dependencies |
| 0.0.34 | 2025-11-18 | [69469](https://github.com/airbytehq/airbyte/pull/69469) | Update dependencies |
| 0.0.33 | 2025-10-29 | [68890](https://github.com/airbytehq/airbyte/pull/68890) | Update dependencies |
| 0.0.32 | 2025-10-21 | [68265](https://github.com/airbytehq/airbyte/pull/68265) | Update dependencies |
| 0.0.31 | 2025-10-14 | [67926](https://github.com/airbytehq/airbyte/pull/67926) | Update dependencies |
| 0.0.30 | 2025-10-07 | [67228](https://github.com/airbytehq/airbyte/pull/67228) | Update dependencies |
| 0.0.29 | 2025-09-30 | [66863](https://github.com/airbytehq/airbyte/pull/66863) | Update dependencies |
| 0.0.28 | 2025-09-24 | [66639](https://github.com/airbytehq/airbyte/pull/66639) | Update dependencies |
| 0.0.27 | 2025-08-24 | [65493](https://github.com/airbytehq/airbyte/pull/65493) | Update dependencies |
| 0.0.26 | 2025-08-10 | [64839](https://github.com/airbytehq/airbyte/pull/64839) | Update dependencies |
| 0.0.25 | 2025-08-02 | [64447](https://github.com/airbytehq/airbyte/pull/64447) | Update dependencies |
| 0.0.24 | 2025-06-28 | [62289](https://github.com/airbytehq/airbyte/pull/62289) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60493](https://github.com/airbytehq/airbyte/pull/60493) | Update dependencies |
| 0.0.22 | 2025-05-10 | [60074](https://github.com/airbytehq/airbyte/pull/60074) | Update dependencies |
| 0.0.21 | 2025-05-04 | [59601](https://github.com/airbytehq/airbyte/pull/59601) | Update dependencies |
| 0.0.20 | 2025-04-27 | [58408](https://github.com/airbytehq/airbyte/pull/58408) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57945](https://github.com/airbytehq/airbyte/pull/57945) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57414](https://github.com/airbytehq/airbyte/pull/57414) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56883](https://github.com/airbytehq/airbyte/pull/56883) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56244](https://github.com/airbytehq/airbyte/pull/56244) | Update dependencies |
| 0.0.15 | 2025-03-09 | [55646](https://github.com/airbytehq/airbyte/pull/55646) | Update dependencies |
| 0.0.14 | 2025-03-01 | [55125](https://github.com/airbytehq/airbyte/pull/55125) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54518](https://github.com/airbytehq/airbyte/pull/54518) | Update dependencies |
| 0.0.12 | 2025-02-15 | [54051](https://github.com/airbytehq/airbyte/pull/54051) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53516](https://github.com/airbytehq/airbyte/pull/53516) | Update dependencies |
| 0.0.10 | 2025-02-01 | [53023](https://github.com/airbytehq/airbyte/pull/53023) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52485](https://github.com/airbytehq/airbyte/pull/52485) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51884](https://github.com/airbytehq/airbyte/pull/51884) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51369](https://github.com/airbytehq/airbyte/pull/51369) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50728](https://github.com/airbytehq/airbyte/pull/50728) | Update dependencies |
| 0.0.5 | 2024-12-21 | [49709](https://github.com/airbytehq/airbyte/pull/49709) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49327](https://github.com/airbytehq/airbyte/pull/49327) | Update dependencies |
| 0.0.3 | 2024-12-11 | [49055](https://github.com/airbytehq/airbyte/pull/49055) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.2 | 2024-11-04 | [48188](https://github.com/airbytehq/airbyte/pull/48188) | Update dependencies |
| 0.0.1 | 2024-10-03 | | Initial release by [@aazam-gh](https://github.com/aazam-gh) via Connector Builder |

</details>
