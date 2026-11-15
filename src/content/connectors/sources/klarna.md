---
generated_record: true
connector_name: Klarna
connector_type: source
connector_slug: klarna
connector_directory: source-klarna
definition_id: 60c24725-00ae-490c-991d-55b78c3197e0
version: 0.3.25
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/klarna
logo: /images/connectors/sources/klarna.svg
logo_source_path: airbyte-integrations/connectors/source-klarna/icon.svg
logo_sha256: eb73807b6385b10ca172e2790a43fc3e48fbbfd5098f4e9d2b0788b3cdb39415
original_metadata_path: airbyte-integrations/connectors/source-klarna/metadata.yaml
original_metadata_sha256: dbf3556b0ccee84b1cd83687b3a0ac539c734bfe309e7c402ce42a74c3d5ac15
original_document_path: docs/integrations/sources/klarna.md
original_document_sha256: 8dc7deb10f68e1f0af9a4c7b1cdf901abb8cbba0159d6cee4ea00ab1aaee0ef1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f5ff38e9e6d9311eb6b22a9389df2840d90f53467a0d345e448dab4bc535d8f0
rewritten_at: 2026-11-12T13:44:29.274231+00:00
---

# Klarna

Use this page to set up the Klarna source connector and find reference information.

## Prerequisites

You’ll use the [Klarna Settlements API](https://developers.klarna.com/api/#settlements-api) to get payouts and transactions for a Klarna account.

## Setup guide

### Step 1: Set up Klarna

To get an `Username (UID)` and `Password`, go to the [this](https://docs.klarna.com/) page. Find the **Merchant Portal** button. Use this button to log in to your production / playground in the correct region. After registering or logging in, you can find and create `Username (UID)` and `Password` in the settings tab.

:::note

The Klarna Source Connector doesn’t currently support OAuth because of limitations outside its control.

:::

## Step 2: Set up the Klarna connector in Airbyte

### For Airbyte Open Source

1. Go to the Airbyte Open Source dashboard
2. Set the name for your source
3. Choose whether your account is sandbox
4. Enter your username
5. Enter your password
6. Enter the date you want your sync to start from
7. Click **Set up source**

## Supported sync modes

The Klarna source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | No         |

## Supported streams

The Klarna source connector can sync these Klarna Settlements Streams:

- [Payouts](https://developers.klarna.com/api/#settlements-api-get-all-payouts)
- [Transactions](https://developers.klarna.com/api/#settlements-api-get-transactions)

## Performance considerations

The Klarna API has [rate limiting](https://developers.klarna.com/api/#api-rate-limiting).

**Production environments**: the API rate limit averages 20 create-sessions per second, measured over a 1-minute period. For other operations, the API limit averages 200 requests per second, measured over a 1 minute period.
**Playground environments**: the API rate limit is one quarter (1/4th) of the production environment rate limits.

The connector handles rate limiting when Klarna returns a 429 status code after limits are reached.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.3.25 | 2026-11-09 | [91383](https://github.com/airbytehq/airbyte/pull/91383) | Upgrade to source-declarative-manifest 7.47.0 |
| 0.3.24 | 2026-10-27 | [78792](https://github.com/airbytehq/airbyte/pull/78792) | Update dependencies |
| 0.3.23 | 2025-05-24 | [60684](https://github.com/airbytehq/airbyte/pull/60684) | Update dependencies |
| 0.3.22 | 2025-05-10 | [59777](https://github.com/airbytehq/airbyte/pull/59777) | Update dependencies |
| 0.3.21 | 2025-05-03 | [59239](https://github.com/airbytehq/airbyte/pull/59239) | Update dependencies |
| 0.3.20 | 2025-04-26 | [58783](https://github.com/airbytehq/airbyte/pull/58783) | Update dependencies |
| 0.3.19 | 2025-04-19 | [58220](https://github.com/airbytehq/airbyte/pull/58220) | Update dependencies |
| 0.3.18 | 2025-04-12 | [57692](https://github.com/airbytehq/airbyte/pull/57692) | Update dependencies |
| 0.3.17 | 2025-04-05 | [57049](https://github.com/airbytehq/airbyte/pull/57049) | Update dependencies |
| 0.3.16 | 2025-03-29 | [56685](https://github.com/airbytehq/airbyte/pull/56685) | Update dependencies |
| 0.3.15 | 2025-03-22 | [56040](https://github.com/airbytehq/airbyte/pull/56040) | Update dependencies |
| 0.3.14 | 2025-03-08 | [55440](https://github.com/airbytehq/airbyte/pull/55440) | Update dependencies |
| 0.3.13 | 2025-03-01 | [54743](https://github.com/airbytehq/airbyte/pull/54743) | Update dependencies |
| 0.3.12 | 2025-02-22 | [54333](https://github.com/airbytehq/airbyte/pull/54333) | Update dependencies |
| 0.3.11 | 2025-02-15 | [52751](https://github.com/airbytehq/airbyte/pull/52751) | Update dependencies |
| 0.3.10 | 2025-01-25 | [52268](https://github.com/airbytehq/airbyte/pull/52268) | Update dependencies |
| 0.3.9 | 2025-01-18 | [51800](https://github.com/airbytehq/airbyte/pull/51800) | Update dependencies |
| 0.3.8 | 2025-01-11 | [51169](https://github.com/airbytehq/airbyte/pull/51169) | Update dependencies |
| 0.3.7 | 2024-12-28 | [50659](https://github.com/airbytehq/airbyte/pull/50659) | Update dependencies |
| 0.3.6 | 2024-12-21 | [50146](https://github.com/airbytehq/airbyte/pull/50146) | Update dependencies |
| 0.3.5 | 2024-12-14 | [49639](https://github.com/airbytehq/airbyte/pull/49639) | Update dependencies |
| 0.3.4 | 2024-12-12 | [49230](https://github.com/airbytehq/airbyte/pull/49230) | Update dependencies |
| 0.3.3 | 2024-10-29 | [47478](https://github.com/airbytehq/airbyte/pull/47478) | Update dependencies |
| 0.3.2 | 2024-10-21 | [47195](https://github.com/airbytehq/airbyte/pull/47195) | Update dependencies |
| 0.3.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.3.0 | 2024-08-15 | [44136](https://github.com/airbytehq/airbyte/pull/44136) | Refactor connector to manifest-only format |
| 0.2.16 | 2024-08-10 | [43550](https://github.com/airbytehq/airbyte/pull/43550) | Update dependencies |
| 0.2.15 | 2024-08-03 | [43266](https://github.com/airbytehq/airbyte/pull/43266) | Update dependencies |
| 0.2.14 | 2024-07-27 | [42818](https://github.com/airbytehq/airbyte/pull/42818) | Update dependencies |
| 0.2.13 | 2024-07-20 | [42276](https://github.com/airbytehq/airbyte/pull/42276) | Update dependencies |
| 0.2.12 | 2024-07-13 | [41874](https://github.com/airbytehq/airbyte/pull/41874) | Update dependencies |
| 0.2.11 | 2024-07-10 | [41483](https://github.com/airbytehq/airbyte/pull/41483) | Update dependencies |
| 0.2.10 | 2024-07-09 | [41267](https://github.com/airbytehq/airbyte/pull/41267) | Update dependencies |
| 0.2.9 | 2024-07-06 | [40819](https://github.com/airbytehq/airbyte/pull/40819) | Update dependencies |
| 0.2.8 | 2024-06-25 | [40504](https://github.com/airbytehq/airbyte/pull/40504) | Update dependencies |
| 0.2.7 | 2024-06-22 | [40151](https://github.com/airbytehq/airbyte/pull/40151) | Update dependencies |
| 0.2.6 | 2024-06-07 | [38709](https://github.com/airbytehq/airbyte/pull/38709) | Updating US endpoints |
| 0.2.5 | 2024-06-04 | [39045](https://github.com/airbytehq/airbyte/pull/39045) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.4 | 2024-04-19 | [37182](https://github.com/airbytehq/airbyte/pull/37182) | Updating to 0.80.0 CDK |
| 0.2.3 | 2024-04-18 | [37182](https://github.com/airbytehq/airbyte/pull/37182) | Manage dependencies with Poetry. |
| 0.2.2 | 2024-04-15 | [37182](https://github.com/airbytehq/airbyte/pull/37182) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.2.1 | 2024-04-12 | [37182](https://github.com/airbytehq/airbyte/pull/37182) | schema descriptions |
| 0.2.0 | 2023-10-23 | [31003](https://github.com/airbytehq/airbyte/pull/31003) | Migrate to low-code |
| 0.1.0 | 2022-10-24 | [18385](https://github.com/airbytehq/airbyte/pull/18385) | Klarna Settlements Payout and Transactions API |

</details>
