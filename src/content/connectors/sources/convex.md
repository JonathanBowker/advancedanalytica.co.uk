---
generated_record: true
connector_name: Convex
connector_type: source
connector_slug: convex
connector_directory: source-convex
definition_id: c332628c-f55c-4017-8222-378cfafda9b2
version: 0.4.51
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/convex
logo: /images/connectors/sources/convex.svg
logo_source_path: airbyte-integrations/connectors/source-convex/icon.svg
logo_sha256: 51987cfaf982a9477ca84e95d06311038d53e7f93d9a80c3bf0a4c8fc96ef713
original_metadata_path: airbyte-integrations/connectors/source-convex/metadata.yaml
original_metadata_sha256: 89d8c3ae57057de1876ce23239e91fb5b754373991d952709474f7d303e43898
original_document_path: docs/integrations/sources/convex.md
original_document_sha256: d390581116ec6af1c3201b256adffcfd489d992de08dc7f6be1003a87f360f15
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 2ae7300e726accff0b14e17af578625732f5a13d9963e9747833cb3abe691f9b
rewritten_at: 2026-11-12T14:05:38.111886+00:00
---

# Convex

Use this guide to set up the Convex source connector and find reference information.

Get started with Convex at the [Convex website](https://convex.dev).
View your data on the [Convex dashboard](https://dashboard.convex.dev/).

## Overview

The Convex source connector supports Full Refresh, Incremental Append and Incremental Dedupe with deletes.

### Output schema

This source syncs each Convex table as a separate stream.
View your tables on the [Convex dashboard](https://dashboard.convex.dev/) in the "Data" view.

The connector encodes types that JSON doesn't directly support as described in the stream's
[JSONSchema](https://json-schema.org/understanding-json-schema/reference/index.html).

For example, the Javascript value `new Set(["a", "b"])` is encoded as `{"$set": ["a", "b"]}`, as described by the JSONSchema
`{"type": "object", "description": "Set", "properties": {"$set": {"type": "array", "items": {"type": "string"}}}}`.

Every record includes the table's client-defined fields.
For example, a `"messages"` table may contain fields for `"author"` and `"body"`.
Each document also has these system fields:

1. `_id` uniquely identifies the document. `.patch` and `.replace` operations don't change it.
2. `_creationTime` records the document's initial creation timestamp in milliseconds. `.patch` and `.replace` operations don't change it.
3. `_ts` records the document's last modification timestamp in nanoseconds. It orders operations in Incremental Append mode and is used automatically in Incremental Dedupe mode.
4. `_deleted` identifies whether the document was deleted. Use it to filter deleted documents in Incremental Append mode. Incremental Dedupe mode uses it automatically to remove documents.

### Features

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental - Append Sync     | Yes        |
| Incremental - Dedupe Sync     | Yes        |
| Replicate Incremental Deletes | Yes        |
| Change Data Capture           | Yes        |
| Namespaces                    | No         |

### Performance

The Convex connector syncs every document from the historical log.
If unnecessary old document versions cause performance issues, contact [Convex support](mailto:support@convex.dev).

## Get started

### Requirements

- Convex Account
- Convex Project
- Deploy key

### Set up the connector

Airbyte integration is available to Convex teams on Professional [plans](https://www.convex.dev/plans).

On the [Convex dashboard](https://dashboard.convex.dev/), open the project you want to sync.
Sync only "Production" deployments.

In the Data tab, you can view the tables and a sample of the data that will sync.

1. Go to the Settings tab.
2. Copy the "Deployment URL" from the settings page into the `deployment_url` field in Airbyte.
3. Click "Generate a deploy key".
4. Copy the generated deploy key into the `access_key` field in Airbyte.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                          |
| :------ | :--------- | :------------------------------------------------------- | :--------------------------------------------------------------- |
| 0.4.51 | 2025-10-07 | [65777](https://github.com/airbytehq/airbyte/pull/65777) | Update dependencies |
| 0.4.50 | 2025-08-23 | [65287](https://github.com/airbytehq/airbyte/pull/65287) | Update dependencies |
| 0.4.49 | 2025-08-16 | [65003](https://github.com/airbytehq/airbyte/pull/65003) | Update dependencies |
| 0.4.48 | 2025-08-09 | [64798](https://github.com/airbytehq/airbyte/pull/64798) | Update dependencies |
| 0.4.47 | 2025-07-19 | [63533](https://github.com/airbytehq/airbyte/pull/63533) | Update dependencies |
| 0.4.46 | 2025-07-12 | [62996](https://github.com/airbytehq/airbyte/pull/62996) | Update dependencies |
| 0.4.45 | 2025-07-05 | [62823](https://github.com/airbytehq/airbyte/pull/62823) | Update dependencies |
| 0.4.44 | 2025-06-28 | [62389](https://github.com/airbytehq/airbyte/pull/62389) | Update dependencies |
| 0.4.43 | 2025-06-21 | [61936](https://github.com/airbytehq/airbyte/pull/61936) | Update dependencies |
| 0.4.42 | 2025-06-14 | [61160](https://github.com/airbytehq/airbyte/pull/61160) | Update dependencies |
| 0.4.41 | 2025-05-24 | [60344](https://github.com/airbytehq/airbyte/pull/60344) | Update dependencies |
| 0.4.40 | 2025-05-10 | [59947](https://github.com/airbytehq/airbyte/pull/59947) | Update dependencies |
| 0.4.39 | 2025-05-03 | [59423](https://github.com/airbytehq/airbyte/pull/59423) | Update dependencies |
| 0.4.38 | 2025-04-26 | [58847](https://github.com/airbytehq/airbyte/pull/58847) | Update dependencies |
| 0.4.37 | 2025-04-19 | [58361](https://github.com/airbytehq/airbyte/pull/58361) | Update dependencies |
| 0.4.36 | 2025-04-12 | [57800](https://github.com/airbytehq/airbyte/pull/57800) | Update dependencies |
| 0.4.35 | 2025-04-05 | [57220](https://github.com/airbytehq/airbyte/pull/57220) | Update dependencies |
| 0.4.34 | 2025-03-29 | [55946](https://github.com/airbytehq/airbyte/pull/55946) | Update dependencies |
| 0.4.33 | 2025-03-08 | [55286](https://github.com/airbytehq/airbyte/pull/55286) | Update dependencies |
| 0.4.32 | 2025-03-01 | [54954](https://github.com/airbytehq/airbyte/pull/54954) | Update dependencies |
| 0.4.31 | 2025-02-22 | [54423](https://github.com/airbytehq/airbyte/pull/54423) | Update dependencies |
| 0.4.30 | 2025-02-15 | [53748](https://github.com/airbytehq/airbyte/pull/53748) | Update dependencies |
| 0.4.29 | 2025-02-08 | [52826](https://github.com/airbytehq/airbyte/pull/52826) | Update dependencies |
| 0.4.28 | 2025-01-25 | [52355](https://github.com/airbytehq/airbyte/pull/52355) | Update dependencies |
| 0.4.27 | 2025-01-18 | [51686](https://github.com/airbytehq/airbyte/pull/51686) | Update dependencies |
| 0.4.26 | 2025-01-11 | [51094](https://github.com/airbytehq/airbyte/pull/51094) | Update dependencies |
| 0.4.25 | 2024-12-28 | [50531](https://github.com/airbytehq/airbyte/pull/50531) | Update dependencies |
| 0.4.24 | 2024-12-21 | [50013](https://github.com/airbytehq/airbyte/pull/50013) | Update dependencies |
| 0.4.23 | 2024-12-14 | [49179](https://github.com/airbytehq/airbyte/pull/49179) | Update dependencies |
| 0.4.22 | 2024-11-25 | [48680](https://github.com/airbytehq/airbyte/pull/48680) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.4.21 | 2024-10-29 | [47081](https://github.com/airbytehq/airbyte/pull/47081) | Update dependencies |
| 0.4.20 | 2024-10-12 | [46480](https://github.com/airbytehq/airbyte/pull/46480) | Update dependencies |
| 0.4.19 | 2024-09-28 | [46208](https://github.com/airbytehq/airbyte/pull/46208) | Update dependencies |
| 0.4.18 | 2024-09-21 | [45809](https://github.com/airbytehq/airbyte/pull/45809) | Update dependencies |
| 0.4.17 | 2024-09-14 | [45494](https://github.com/airbytehq/airbyte/pull/45494) | Update dependencies |
| 0.4.16 | 2024-09-07 | [45267](https://github.com/airbytehq/airbyte/pull/45267) | Update dependencies |
| 0.4.15 | 2024-08-31 | [45043](https://github.com/airbytehq/airbyte/pull/45043) | Update dependencies |
| 0.4.14 | 2024-08-24 | [44655](https://github.com/airbytehq/airbyte/pull/44655) | Update dependencies |
| 0.4.13 | 2024-08-17 | [44353](https://github.com/airbytehq/airbyte/pull/44353) | Update dependencies |
| 0.4.12 | 2024-08-10 | [43567](https://github.com/airbytehq/airbyte/pull/43567) | Update dependencies |
| 0.4.11 | 2024-08-03 | [43166](https://github.com/airbytehq/airbyte/pull/43166) | Update dependencies |
| 0.4.10 | 2024-07-27 | [42751](https://github.com/airbytehq/airbyte/pull/42751) | Update dependencies |
| 0.4.9 | 2024-07-20 | [42224](https://github.com/airbytehq/airbyte/pull/42224) | Update dependencies |
| 0.4.8 | 2024-07-13 | [41868](https://github.com/airbytehq/airbyte/pull/41868) | Update dependencies |
| 0.4.7 | 2024-07-10 | [41584](https://github.com/airbytehq/airbyte/pull/41584) | Update dependencies |
| 0.4.6 | 2024-07-09 | [41261](https://github.com/airbytehq/airbyte/pull/41261) | Update dependencies |
| 0.4.5 | 2024-07-06 | [40799](https://github.com/airbytehq/airbyte/pull/40799) | Update dependencies |
| 0.4.4 | 2024-06-25 | [40305](https://github.com/airbytehq/airbyte/pull/40305) | Update dependencies |
| 0.4.3 | 2024-06-22 | [40038](https://github.com/airbytehq/airbyte/pull/40038) | Update dependencies |
| 0.4.2 | 2024-06-06 | [39210](https://github.com/airbytehq/airbyte/pull/39210) | [autopull] Upgrade base image to v1.2.2 |
| 0.4.1 | 2024-05-21 | [38485](https://github.com/airbytehq/airbyte/pull/38485) | [autopull] base image + poetry + up_to_date |
| 0.4.0 | 2023-12-13 | [33431](https://github.com/airbytehq/airbyte/pull/33431) | 🐛 Convex source fix bug where full_refresh stops after one page |
| 0.3.0 | 2023-09-28 | [30853](https://github.com/airbytehq/airbyte/pull/30853) | 🐛 Convex source switch to clean JSON format |
| 0.2.0 | 2023-06-21 | [27226](https://github.com/airbytehq/airbyte/pull/27226) | 🐛 Convex source fix skipped records |
| 0.1.1 | 2023-03-06 | [23797](https://github.com/airbytehq/airbyte/pull/23797) | 🐛 Convex source connector error messages |
| 0.1.0 | 2022-10-24 | [18403](https://github.com/airbytehq/airbyte/pull/18403) | 🎉 New Source: Convex |

</details>
