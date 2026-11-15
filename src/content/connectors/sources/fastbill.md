---
generated_record: true
connector_name: Fastbill
connector_type: source
connector_slug: fastbill
connector_directory: source-fastbill
definition_id: eb3e9c1c-0467-4eb7-a172-5265e04ccd0a
version: 0.3.20
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/fastbill
logo: /images/connectors/sources/fastbill.svg
logo_source_path: airbyte-integrations/connectors/source-fastbill/icon.svg
logo_sha256: b8063ce616621327edd06c67d8d05c6b232432280b7f7e7ffbb0fd06df7e2fa6
original_metadata_path: airbyte-integrations/connectors/source-fastbill/metadata.yaml
original_metadata_sha256: 667a671e7c371ecd93da2b824cbd4fbd0afa324199b9453eb175b6e8e1394acd
original_document_path: docs/integrations/sources/fastbill.md
original_document_sha256: 14edd721b8e0bab29482b04d5524bc06974f5ecaae7776527561ebad1aa96c5d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9a17c449c66bd70aa9c5375c1075778d5fbf66125d7f05f440877ec5da0ab5ed
rewritten_at: 2026-11-12T13:36:48.031265+00:00
---

# Fastbill

Set up the [Fastbill](https://www.fastbill.com/) source connector and find its reference information on this page.

Find more information about the Fastbill REST API in [here](https://apidocs.fastbill.com/).

## Prerequisites

Find your Project ID, then find or create an API key within [Fastbill](https://my.fastbill.com/index.php?s=D7GCLx0WuylFq3nl4gAvRQMwS8RDyb3sCe_bEoXoU_w).

## Setup guide

## Step 1: Set up Fastbill in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Select **Sources** in the left navigation bar, then select **+new source** in the top-right corner.
3. On the Set up the source page, name the Fastbill connector.
4. Select **Fastbill** from the Source type dropdown.
5. Enter your `username`, your Fastbill username or email.
6. Enter your `api_key`, your Fastbill API key with read permissions.
7. Select **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Name your source.
3. Enter your `project_id`, your Fastbill Project ID.
4. Enter your `api_key`, your Fastbill API key with read permissions.
5. Select **Set up source**.

## Supported sync modes

The Fastbill source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| SSL connection    | No         |
| Namespaces        | No         |

## Supported streams

- [Customers](https://apidocs.fastbill.com/fastbill/de/customer.html#customer.get)
- [Invoices](https://apidocs.fastbill.com/fastbill/de/invoice.html#invoice.get)
- [Products](https://apidocs.fastbill.com/fastbill/de/recurring.html#recurring.get)
- [Recurring_invoices](https://apidocs.fastbill.com/fastbill/de/recurring.html#recurring.get)
- [Revenues](https://apidocs.fastbill.com/fastbill/de/revenue.html#revenue.get)

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

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.3.20 | 2025-05-10 | [60050](https://github.com/airbytehq/airbyte/pull/60050) | Update dependencies |
| 0.3.19 | 2025-05-03 | [59385](https://github.com/airbytehq/airbyte/pull/59385) | Update dependencies |
| 0.3.18 | 2025-04-26 | [58315](https://github.com/airbytehq/airbyte/pull/58315) | Update dependencies |
| 0.3.17 | 2025-04-12 | [57234](https://github.com/airbytehq/airbyte/pull/57234) | Update dependencies |
| 0.3.16 | 2025-03-29 | [56490](https://github.com/airbytehq/airbyte/pull/56490) | Update dependencies |
| 0.3.15 | 2025-03-22 | [55913](https://github.com/airbytehq/airbyte/pull/55913) | Update dependencies |
| 0.3.14 | 2025-03-08 | [55309](https://github.com/airbytehq/airbyte/pull/55309) | Update dependencies |
| 0.3.13 | 2025-03-01 | [54986](https://github.com/airbytehq/airbyte/pull/54986) | Update dependencies |
| 0.3.12 | 2025-02-22 | [54403](https://github.com/airbytehq/airbyte/pull/54403) | Update dependencies |
| 0.3.11 | 2025-02-15 | [53733](https://github.com/airbytehq/airbyte/pull/53733) | Update dependencies |
| 0.3.10 | 2025-02-08 | [53380](https://github.com/airbytehq/airbyte/pull/53380) | Update dependencies |
| 0.3.9 | 2025-02-01 | [52862](https://github.com/airbytehq/airbyte/pull/52862) | Update dependencies |
| 0.3.8 | 2025-01-25 | [52326](https://github.com/airbytehq/airbyte/pull/52326) | Update dependencies |
| 0.3.7 | 2025-01-18 | [51642](https://github.com/airbytehq/airbyte/pull/51642) | Update dependencies |
| 0.3.6 | 2025-01-11 | [51065](https://github.com/airbytehq/airbyte/pull/51065) | Update dependencies |
| 0.3.5 | 2025-01-04 | [50523](https://github.com/airbytehq/airbyte/pull/50523) | Update dependencies |
| 0.3.4 | 2024-12-21 | [50019](https://github.com/airbytehq/airbyte/pull/50019) | Update dependencies |
| 0.3.3 | 2024-12-14 | [49481](https://github.com/airbytehq/airbyte/pull/49481) | Update dependencies |
| 0.3.2 | 2024-12-12 | [48955](https://github.com/airbytehq/airbyte/pull/48955) | Update dependencies |
| 0.3.1 | 2024-12-11 | [47089](https://github.com/airbytehq/airbyte/pull/47089) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.3.0 | 2024-10-31 | [47297](https://github.com/airbytehq/airbyte/pull/47297) | Migrate to manifest only format |
| 0.2.24 | 2024-10-12 | [46777](https://github.com/airbytehq/airbyte/pull/46777) | Update dependencies |
| 0.2.23 | 2024-10-05 | [46505](https://github.com/airbytehq/airbyte/pull/46505) | Update dependencies |
| 0.2.22 | 2024-09-28 | [46172](https://github.com/airbytehq/airbyte/pull/46172) | Update dependencies |
| 0.2.21 | 2024-09-21 | [45751](https://github.com/airbytehq/airbyte/pull/45751) | Update dependencies |
| 0.2.20 | 2024-09-14 | [45486](https://github.com/airbytehq/airbyte/pull/45486) | Update dependencies |
| 0.2.19 | 2024-09-07 | [45251](https://github.com/airbytehq/airbyte/pull/45251) | Update dependencies |
| 0.2.18 | 2024-08-31 | [44999](https://github.com/airbytehq/airbyte/pull/44999) | Update dependencies |
| 0.2.17 | 2024-08-24 | [44647](https://github.com/airbytehq/airbyte/pull/44647) | Update dependencies |
| 0.2.16 | 2024-08-17 | [44329](https://github.com/airbytehq/airbyte/pull/44329) | Update dependencies |
| 0.2.15 | 2024-08-10 | [43515](https://github.com/airbytehq/airbyte/pull/43515) | Update dependencies |
| 0.2.14 | 2024-08-03 | [43112](https://github.com/airbytehq/airbyte/pull/43112) | Update dependencies |
| 0.2.13 | 2024-07-27 | [42722](https://github.com/airbytehq/airbyte/pull/42722) | Update dependencies |
| 0.2.12 | 2024-07-20 | [42179](https://github.com/airbytehq/airbyte/pull/42179) | Update dependencies |
| 0.2.11 | 2024-07-13 | [41755](https://github.com/airbytehq/airbyte/pull/41755) | Update dependencies |
| 0.2.10 | 2024-07-10 | [41441](https://github.com/airbytehq/airbyte/pull/41441) | Update dependencies |
| 0.2.9 | 2024-07-09 | [41176](https://github.com/airbytehq/airbyte/pull/41176) | Update dependencies |
| 0.2.8 | 2024-07-06 | [41003](https://github.com/airbytehq/airbyte/pull/41003) | Update dependencies |
| 0.2.7 | 2024-06-25 | [40399](https://github.com/airbytehq/airbyte/pull/40399) | Update dependencies |
| 0.2.6 | 2024-06-22 | [40197](https://github.com/airbytehq/airbyte/pull/40197) | Update dependencies |
| 0.2.5 | 2024-06-04 | [39066](https://github.com/airbytehq/airbyte/pull/39066) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.4 | 2024-04-19 | [37159](https://github.com/airbytehq/airbyte/pull/37159) | Updating to 0.80.0 CDK |
| 0.2.3 | 2024-04-18 | [37159](https://github.com/airbytehq/airbyte/pull/37159) | Manage dependencies with Poetry. |
| 0.2.2 | 2024-04-15 | [37159](https://github.com/airbytehq/airbyte/pull/37159) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.2.1 | 2024-04-12 | [37159](https://github.com/airbytehq/airbyte/pull/37159) | schema descriptions |
| 0.2.0 | 2023-08-13 | [29390](https://github.com/airbytehq/airbyte/pull/29390) | Migrated to Low Code CDK |
| 0.1.0   | 2022-11-08 | [18593](https://github.com/airbytehq/airbyte/pull/18593) | New Source: Fastbill                                                            |

</details>
