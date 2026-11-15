---
generated_record: true
connector_name: Waiteraid
connector_type: source
connector_slug: waiteraid
connector_directory: source-waiteraid
definition_id: 03a53b13-794a-4d6b-8544-3b36ed8f3ce4
version: 0.2.25
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/waiteraid
logo: /images/connectors/sources/waiteraid.svg
logo_source_path: airbyte-integrations/connectors/source-waiteraid/icon.svg
logo_sha256: 59fe6d72e9e166b524fd4b0542a48967047db51afdec89d3c2a81fa24ad0a128
original_metadata_path: airbyte-integrations/connectors/source-waiteraid/metadata.yaml
original_metadata_sha256: 2e5d6bbab3acf58f9dd72eaef8896f9c7d0839ee94ce56ebcd9f238606687ffb
original_document_path: docs/integrations/sources/waiteraid.md
original_document_sha256: 1a19d8c8b2638f05f05c354fedda446cd578c32c8721797883880e9dc156e9d7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 285737087b58c5566c7e0858d6b172f72aa14b05d263d8f0512b43df35149e5b
rewritten_at: 2026-11-12T14:00:08.607645+00:00
---

# Waiteraid

Set up the Waiteraid source connector and find its reference information on this page.

## Prerequisites

You can find or create authentication tokens in [Waiteraid](https://app.waiteraid.com/api-docs/index.html#auth_call).

## Setup guide

## Step 1: Set up Waiteraid in Airbyte

### Airbyte Cloud

1. Have an [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. Then, in the top-right corner, click **+new source**.
3. On the Set up the source page, name the Waiteraid connector. Select **Waiteraid** from the Source type dropdown.
4. Enter your `auth_token` - Waiteraid Authentication Token.
5. Enter your `restaurant ID` - The Waiteraid ID of the Restaurant you want to sync.
6. Click **Set up source**.
<!-- env:oss -->

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Set the name for your source.
3. Enter your `auth_token` - Waiteraid Authentication Token.
4. Enter your `restaurant ID` - The Waiteraid ID of the Restaurant you want to sync.
5. Click **Set up source**.

## Supported sync modes

The Waiteraid source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| SSL connection    | No         |
| Namespaces        | No         |

<!-- /env:oss -->

## Supported streams

- [Bookings](https://app.waiteraid.com/api-docs/index.html#api_get_bookings)

## Data type map

| Integration Type    | Airbyte Type |
| :------------------ | :----------- |
| `string`            | `string`     |
| `integer`, `number` | `number`     |
| `array`             | `array`      |
| `object`            | `object`     |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                           | Subject               |
| :------ | :--------- | :----------------------------------------------------- | :-------------------- |
| 0.2.25 | 2026-11-09 | [91439](https://github.com/airbytehq/airbyte/pull/91439) | Upgrade to source-declarative-manifest 7.47.0 |
| 0.2.24 | 2026-10-07 | [88303](https://github.com/airbytehq/airbyte/pull/88303) | Extract records from the `bookings` array, query the full `start_date`..today range via `dateto`, and fail on `status: ERROR` API responses |
| 0.2.23 | 2026-06-02 | [79032](https://github.com/airbytehq/airbyte/pull/79032) | Update dependencies |
| 0.2.22 | 2025-05-24 | [60757](https://github.com/airbytehq/airbyte/pull/60757) | Update dependencies |
| 0.2.21 | 2025-05-10 | [59925](https://github.com/airbytehq/airbyte/pull/59925) | Update dependencies |
| 0.2.20 | 2025-05-04 | [58536](https://github.com/airbytehq/airbyte/pull/58536) | Update dependencies |
| 0.2.19 | 2025-04-13 | [58041](https://github.com/airbytehq/airbyte/pull/58041) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57446](https://github.com/airbytehq/airbyte/pull/57446) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56870](https://github.com/airbytehq/airbyte/pull/56870) | Update dependencies |
| 0.2.16 | 2025-03-22 | [55577](https://github.com/airbytehq/airbyte/pull/55577) | Update dependencies |
| 0.2.15 | 2025-03-01 | [55105](https://github.com/airbytehq/airbyte/pull/55105) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54499](https://github.com/airbytehq/airbyte/pull/54499) | Update dependencies |
| 0.2.13 | 2025-02-15 | [54034](https://github.com/airbytehq/airbyte/pull/54034) | Update dependencies |
| 0.2.12 | 2025-02-08 | [53532](https://github.com/airbytehq/airbyte/pull/53532) | Update dependencies |
| 0.2.11 | 2025-02-01 | [53058](https://github.com/airbytehq/airbyte/pull/53058) | Update dependencies |
| 0.2.10 | 2025-01-25 | [52386](https://github.com/airbytehq/airbyte/pull/52386) | Update dependencies |
| 0.2.9 | 2025-01-18 | [52002](https://github.com/airbytehq/airbyte/pull/52002) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51386](https://github.com/airbytehq/airbyte/pull/51386) | Update dependencies |
| 0.2.7 | 2024-12-28 | [50810](https://github.com/airbytehq/airbyte/pull/50810) | Update dependencies |
| 0.2.6 | 2024-12-21 | [50372](https://github.com/airbytehq/airbyte/pull/50372) | Update dependencies |
| 0.2.5 | 2024-12-14 | [49770](https://github.com/airbytehq/airbyte/pull/49770) | Update dependencies |
| 0.2.4 | 2024-12-12 | [49405](https://github.com/airbytehq/airbyte/pull/49405) | Update dependencies |
| 0.2.3 | 2024-10-29 | [47835](https://github.com/airbytehq/airbyte/pull/47835) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47610](https://github.com/airbytehq/airbyte/pull/47610) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44047](https://github.com/airbytehq/airbyte/pull/44047) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-12 | [43789](https://github.com/airbytehq/airbyte/pull/43789) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43568](https://github.com/airbytehq/airbyte/pull/43568) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43242](https://github.com/airbytehq/airbyte/pull/43242) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42762](https://github.com/airbytehq/airbyte/pull/42762) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42207](https://github.com/airbytehq/airbyte/pull/42207) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41777](https://github.com/airbytehq/airbyte/pull/41777) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41506](https://github.com/airbytehq/airbyte/pull/41506) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41135](https://github.com/airbytehq/airbyte/pull/41135) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40794](https://github.com/airbytehq/airbyte/pull/40794) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40311](https://github.com/airbytehq/airbyte/pull/40311) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40087](https://github.com/airbytehq/airbyte/pull/40087) | Update dependencies |
| 0.1.3 | 2024-06-06 | [39185](https://github.com/airbytehq/airbyte/pull/39185) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.2 | 2024-05-28 | [38697](https://github.com/airbytehq/airbyte/pull/38697) | Make connector compatible with builder |
| 0.1.1 | 2024-05-20 | [38433](https://github.com/airbytehq/airbyte/pull/38433) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2022-10-QQ | [QQQQ](https://github.com/airbytehq/airbyte/pull/QQQQ) | New Source: Waiteraid |

</details>
