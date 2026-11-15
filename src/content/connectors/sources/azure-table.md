---
generated_record: true
connector_name: Azure Table Storage
connector_type: source
connector_slug: azure-table
connector_directory: source-azure-table
definition_id: 798ae795-5189-42b6-b64e-3cb91db93338
version: 0.1.57
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/azure-table
logo: /images/connectors/sources/azure-table.svg
logo_source_path: airbyte-integrations/connectors/source-azure-table/icon.svg
logo_sha256: d0ef9bd336ac7f71856ce3c125f418055b6d40017e265d5c663590c0313ec533
original_metadata_path: airbyte-integrations/connectors/source-azure-table/metadata.yaml
original_metadata_sha256: 45e426b1f9fc0c629627038a1fddcf41c0943b32cf10f20dd008baabdf889cb5
original_document_path: docs/integrations/sources/azure-table.md
original_document_sha256: 784d40e23b8a9536c7db4524fc005bd5fddda7a7ff726d05e7b59e90236778a8
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a563a86e6526c10774535ceda9c3023691b2638468ebb34cdc505a0e9864703e
rewritten_at: 2026-11-12T13:30:45.625196+00:00
---

# Azure Table Storage

## Overview

Azure Table Storage supports Full Refresh and Incremental syncs. You can choose which tables to replicate.

### Output schema

This source uses a generic schema for every stream.
Azure Table Storage stores non-relational structured data, also known as structured NoSQL data. You can't efficiently read the schema for a given table. The connector uses the `data` property to include every property for each row.

- data - Contains all values
- additionalProperties - Shows that all values are in the `data` property.

```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "data": {
            "type": "object"
        },
        "additionalProperties": {
            "type": "boolean"
        }
    }
}
```

### Data type mapping

Azure Table Storage uses different [property](https://docs.microsoft.com/en-us/rest/api/storageservices/understanding-the-table-service-data-model#property-types) types. Airbyte internally uses \(`string`, `date-time`, `object`, `array`, `boolean`, `integer`, and `number`\). The connector doesn't apply explicit data type mappings.

### Features

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | Yes        |
| Incremental - Dedupe Sync | No         |
| SSL connection            | Yes        |
| Namespaces                | No         |

### Performance

Under normal usage, the Azure Table Storage connector shouldn't encounter API limitations. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if rate-limit issues aren't retried successfully automatically.

## Get started

### Requirements

- Azure Storage Account
- Azure Storage Account Key
- Azure Storage Endpoint Suffix

### Setup

Visit the [Azure Portal](https://portal.azure.com), then open your storage account. You can find:

- Azure Storage Account - under the overview tab
- Azure Storage Account Key - under the Access keys tab
- Azure Storage Endpoint Suffix - under the Endpoint tab

Create a restricted key specifically for Airbyte access. This lets you control which resources Airbyte can access. However, this connector doesn't yet support shared access key authentication.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                           |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------ |
| 0.1.57 | 2025-10-21 | [68397](https://github.com/airbytehq/airbyte/pull/68397) | Update dependencies |
| 0.1.56 | 2025-10-14 | [67976](https://github.com/airbytehq/airbyte/pull/67976) | Update dependencies |
| 0.1.55 | 2025-10-07 | [67169](https://github.com/airbytehq/airbyte/pull/67169) | Update dependencies |
| 0.1.54 | 2025-09-30 | [65653](https://github.com/airbytehq/airbyte/pull/65653) | Update dependencies |
| 0.1.53 | 2025-08-23 | [65333](https://github.com/airbytehq/airbyte/pull/65333) | Update dependencies |
| 0.1.52 | 2025-08-16 | [65046](https://github.com/airbytehq/airbyte/pull/65046) | Update dependencies |
| 0.1.51 | 2025-08-09 | [64646](https://github.com/airbytehq/airbyte/pull/64646) | Update dependencies |
| 0.1.50 | 2025-07-26 | [63805](https://github.com/airbytehq/airbyte/pull/63805) | Update dependencies |
| 0.1.49 | 2025-06-21 | [61900](https://github.com/airbytehq/airbyte/pull/61900) | Update dependencies |
| 0.1.48 | 2025-06-15 | [61628](https://github.com/airbytehq/airbyte/pull/61628) | Update dependencies |
| 0.1.47 | 2025-05-24 | [60695](https://github.com/airbytehq/airbyte/pull/60695) | Update dependencies |
| 0.1.46 | 2025-05-10 | [59873](https://github.com/airbytehq/airbyte/pull/59873) | Update dependencies |
| 0.1.45 | 2025-05-03 | [59324](https://github.com/airbytehq/airbyte/pull/59324) | Update dependencies |
| 0.1.44 | 2025-04-26 | [58715](https://github.com/airbytehq/airbyte/pull/58715) | Update dependencies |
| 0.1.43 | 2025-04-19 | [58249](https://github.com/airbytehq/airbyte/pull/58249) | Update dependencies |
| 0.1.42 | 2025-04-12 | [57650](https://github.com/airbytehq/airbyte/pull/57650) | Update dependencies |
| 0.1.41 | 2025-04-05 | [57112](https://github.com/airbytehq/airbyte/pull/57112) | Update dependencies |
| 0.1.40 | 2025-03-29 | [56621](https://github.com/airbytehq/airbyte/pull/56621) | Update dependencies |
| 0.1.39 | 2025-03-22 | [56102](https://github.com/airbytehq/airbyte/pull/56102) | Update dependencies |
| 0.1.38 | 2025-03-08 | [55385](https://github.com/airbytehq/airbyte/pull/55385) | Update dependencies |
| 0.1.37 | 2025-03-01 | [54862](https://github.com/airbytehq/airbyte/pull/54862) | Update dependencies |
| 0.1.36 | 2025-02-22 | [54229](https://github.com/airbytehq/airbyte/pull/54229) | Update dependencies |
| 0.1.35 | 2025-02-15 | [53938](https://github.com/airbytehq/airbyte/pull/53938) | Update dependencies |
| 0.1.34 | 2025-02-01 | [52877](https://github.com/airbytehq/airbyte/pull/52877) | Update dependencies |
| 0.1.33 | 2025-01-25 | [51293](https://github.com/airbytehq/airbyte/pull/51293) | Update dependencies |
| 0.1.32 | 2024-12-28 | [50457](https://github.com/airbytehq/airbyte/pull/50457) | Update dependencies |
| 0.1.31 | 2024-12-21 | [50179](https://github.com/airbytehq/airbyte/pull/50179) | Update dependencies |
| 0.1.30 | 2024-12-14 | [49291](https://github.com/airbytehq/airbyte/pull/49291) | Update dependencies |
| 0.1.29 | 2024-11-25 | [48663](https://github.com/airbytehq/airbyte/pull/48663) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.28 | 2024-10-29 | [47050](https://github.com/airbytehq/airbyte/pull/47050) | Update dependencies |
| 0.1.27 | 2024-10-12 | [46763](https://github.com/airbytehq/airbyte/pull/46763) | Update dependencies |
| 0.1.26 | 2024-10-05 | [46396](https://github.com/airbytehq/airbyte/pull/46396) | Update dependencies |
| 0.1.25 | 2024-09-28 | [46183](https://github.com/airbytehq/airbyte/pull/46183) | Update dependencies |
| 0.1.24 | 2024-09-21 | [45836](https://github.com/airbytehq/airbyte/pull/45836) | Update dependencies |
| 0.1.23 | 2024-09-14 | [45544](https://github.com/airbytehq/airbyte/pull/45544) | Update dependencies |
| 0.1.22 | 2024-09-07 | [45248](https://github.com/airbytehq/airbyte/pull/45248) | Update dependencies |
| 0.1.21 | 2024-08-31 | [45039](https://github.com/airbytehq/airbyte/pull/45039) | Update dependencies |
| 0.1.20 | 2024-08-24 | [44623](https://github.com/airbytehq/airbyte/pull/44623) | Update dependencies |
| 0.1.19 | 2024-08-17 | [44344](https://github.com/airbytehq/airbyte/pull/44344) | Update dependencies |
| 0.1.18 | 2024-08-10 | [43677](https://github.com/airbytehq/airbyte/pull/43677) | Update dependencies |
| 0.1.17 | 2024-08-03 | [43292](https://github.com/airbytehq/airbyte/pull/43292) | Update dependencies |
| 0.1.16 | 2024-07-27 | [42734](https://github.com/airbytehq/airbyte/pull/42734) | Update dependencies |
| 0.1.15 | 2024-07-20 | [42274](https://github.com/airbytehq/airbyte/pull/42274) | Update dependencies |
| 0.1.14 | 2024-07-13 | [41929](https://github.com/airbytehq/airbyte/pull/41929) | Update dependencies |
| 0.1.13 | 2024-07-10 | [41492](https://github.com/airbytehq/airbyte/pull/41492) | Update dependencies |
| 0.1.12 | 2024-07-09 | [41105](https://github.com/airbytehq/airbyte/pull/41105) | Update dependencies |
| 0.1.11 | 2024-07-06 | [40937](https://github.com/airbytehq/airbyte/pull/40937) | Update dependencies |
| 0.1.10 | 2024-06-25 | [40277](https://github.com/airbytehq/airbyte/pull/40277) | Update dependencies |
| 0.1.9 | 2024-06-22 | [40072](https://github.com/airbytehq/airbyte/pull/40072) | Update dependencies |
| 0.1.8 | 2024-06-04 | [38968](https://github.com/airbytehq/airbyte/pull/38968) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.7 | 2024-06-03 | [38915](https://github.com/airbytehq/airbyte/pull/38915) | Replace AirbyteLogger with logging.Logger |
| 0.1.6 | 2024-06-03 | [38915](https://github.com/airbytehq/airbyte/pull/38915) | Replace AirbyteLogger with logging.Logger |
| 0.1.5 | 2024-05-20 | [38443](https://github.com/airbytehq/airbyte/pull/38443) | [autopull] base image + poetry + up_to_date |
| 0.1.4 | 2024-01-26 | [34576](https://github.com/airbytehq/airbyte/pull/34576) | Migrate to per-stream/global state |
| 0.1.3 | 2022-08-12 | [15591](https://github.com/airbytehq/airbyte/pull/15591) | Clean instantiation of AirbyteStream |
| 0.1.2 | 2021-12-23 | [14212](https://github.com/airbytehq/airbyte/pull/14212) | Adding incremental load capability |
| 0.1.1 | 2021-12-23 | [8434](https://github.com/airbytehq/airbyte/pull/8434) | Update fields in source-connectors specifications |

</details>
