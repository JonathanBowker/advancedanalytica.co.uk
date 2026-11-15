---
generated_record: true
connector_name: Public Apis
connector_type: source
connector_slug: public-apis
connector_directory: source-public-apis
definition_id: a4617b39-3c14-44cd-a2eb-6e720f269235
version: 0.2.39
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/public-apis
logo: /images/connectors/sources/public-apis.svg
logo_source_path: airbyte-integrations/connectors/source-public-apis/icon.svg
logo_sha256: f98283589c4541138ae6ecd65d30c199c83843731aa991a1767026eb6b19be4d
original_metadata_path: airbyte-integrations/connectors/source-public-apis/metadata.yaml
original_metadata_sha256: b45a63d70005fb9d99429313bd18fb307d066ca7680f607d37a9c76bd4cfe0de
original_document_path: docs/integrations/sources/public-apis.md
original_document_sha256: 931c063ed06bd6a94b8ac501f406874ae862bde176ddcab08a9335710f317021
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: b17559ffed9a4c07ca96395517834f3a455490f3913b85bb0cbffc99d64de889
rewritten_at: 2026-11-12T13:52:12.238617+00:00
---

# Public APIs

:::warning

## Deprecation notice

The Public APIs source connector is archived and no longer available in Airbyte. Its upstream API (`https://api.publicapis.org/`) has shut down. The hostname no longer resolves, and the [public-apis/public-apis](https://github.com/public-apis/public-apis) project no longer provides a hosted API. Every sync and connection check has failed since the API went offline. There is no replacement endpoint available for migration.

### Recommended actions

Remove existing connections using this source, as they'll continue to fail. If you need data from the [public-apis/public-apis](https://github.com/public-apis/public-apis) directory, consider building a [custom connector](https://docs.airbyte.com/connector-development/) against a data source you control.

:::

## Sync overview

You can sync data from the [Public APIs](https://api.publicapis.org/) REST API. This source supports Full Refresh syncs only.

### Output schema

You can sync the following streams:

- [Services](https://api.publicapis.org#get-entries)
- [Categories](https://api.publicapis.org#get-categories)

### Data type mapping

| Integration Type    | Airbyte Type | Notes |
| :------------------ | :----------- | :---- |
| `string`            | `string`     |       |
| `integer`, `number` | `number`     |       |
| `boolean`           | `boolean`    |       |

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |
| SSL connection    | Yes                  |
| Namespaces        | No                   |       |
| Pagination        | No                   |       |

## Get started

### Requirements

You don't need to meet any requirements to set up this source.

### Setup guide

You don't need to set up this source.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject              |
| :------ | :--------- | :------------------------------------------------------- | :------------------- |
| 0.2.39 | 2026-10-07 | [88201](https://github.com/airbytehq/airbyte/pull/88201) | Archive connector: upstream API `api.publicapis.org` has been shut down |
| 0.2.38 | 2026-07-28 | [83044](https://github.com/airbytehq/airbyte/pull/83044) | Update dependencies |
| 0.2.37 | 2026-07-14 | [81953](https://github.com/airbytehq/airbyte/pull/81953) | Update dependencies |
| 0.2.36 | 2026-07-07 | [81446](https://github.com/airbytehq/airbyte/pull/81446) | Update dependencies |
| 0.2.35 | 2026-06-23 | [80607](https://github.com/airbytehq/airbyte/pull/80607) | Update dependencies |
| 0.2.34 | 2026-06-09 | [79442](https://github.com/airbytehq/airbyte/pull/79442) | Update dependencies |
| 0.2.33 | 2026-06-02 | [78871](https://github.com/airbytehq/airbyte/pull/78871) | Update dependencies |
| 0.2.32 | 2026-04-28 | [77373](https://github.com/airbytehq/airbyte/pull/77373) | Update dependencies |
| 0.2.31 | 2026-04-21 | [65014](https://github.com/airbytehq/airbyte/pull/65014) | Update dependencies |
| 0.2.30 | 2025-02-01 | [52954](https://github.com/airbytehq/airbyte/pull/52954) | Update dependencies |
| 0.2.29 | 2025-01-25 | [52518](https://github.com/airbytehq/airbyte/pull/52518) | Update dependencies |
| 0.2.28 | 2025-01-18 | [51361](https://github.com/airbytehq/airbyte/pull/51361) | Update dependencies |
| 0.2.27 | 2025-01-04 | [50928](https://github.com/airbytehq/airbyte/pull/50928) | Update dependencies |
| 0.2.26 | 2024-12-28 | [50671](https://github.com/airbytehq/airbyte/pull/50671) | Update dependencies |
| 0.2.25 | 2024-12-21 | [50273](https://github.com/airbytehq/airbyte/pull/50273) | Update dependencies |
| 0.2.24 | 2024-12-14 | [49723](https://github.com/airbytehq/airbyte/pull/49723) | Update dependencies |
| 0.2.23 | 2024-12-12 | [49039](https://github.com/airbytehq/airbyte/pull/49039) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.22 | 2024-11-04 | [48230](https://github.com/airbytehq/airbyte/pull/48230) | Update dependencies |
| 0.2.21 | 2024-10-29 | [47035](https://github.com/airbytehq/airbyte/pull/47035) | Update dependencies |
| 0.2.20 | 2024-10-12 | [46839](https://github.com/airbytehq/airbyte/pull/46839) | Update dependencies |
| 0.2.19 | 2024-10-05 | [46440](https://github.com/airbytehq/airbyte/pull/46440) | Update dependencies |
| 0.2.18 | 2024-09-28 | [46198](https://github.com/airbytehq/airbyte/pull/46198) | Update dependencies |
| 0.2.17 | 2024-09-21 | [45797](https://github.com/airbytehq/airbyte/pull/45797) | Update dependencies |
| 0.2.16 | 2024-09-14 | [45515](https://github.com/airbytehq/airbyte/pull/45515) | Update dependencies |
| 0.2.15 | 2024-09-07 | [45273](https://github.com/airbytehq/airbyte/pull/45273) | Update dependencies |
| 0.2.14 | 2024-08-31 | [44947](https://github.com/airbytehq/airbyte/pull/44947) | Update dependencies |
| 0.2.13 | 2024-08-24 | [44360](https://github.com/airbytehq/airbyte/pull/44360) | Update dependencies |
| 0.2.12 | 2024-08-12 | [43763](https://github.com/airbytehq/airbyte/pull/43763) | Update dependencies |
| 0.2.11 | 2024-08-10 | [43632](https://github.com/airbytehq/airbyte/pull/43632) | Update dependencies |
| 0.2.10 | 2024-08-03 | [43202](https://github.com/airbytehq/airbyte/pull/43202) | Update dependencies |
| 0.2.9 | 2024-07-27 | [42815](https://github.com/airbytehq/airbyte/pull/42815) | Update dependencies |
| 0.2.8 | 2024-07-20 | [42379](https://github.com/airbytehq/airbyte/pull/42379) | Update dependencies |
| 0.2.7 | 2024-07-13 | [41750](https://github.com/airbytehq/airbyte/pull/41750) | Update dependencies |
| 0.2.6 | 2024-07-10 | [41359](https://github.com/airbytehq/airbyte/pull/41359) | Update dependencies |
| 0.2.5 | 2024-07-09 | [41218](https://github.com/airbytehq/airbyte/pull/41218) | Update dependencies |
| 0.2.4 | 2024-07-06 | [40998](https://github.com/airbytehq/airbyte/pull/40998) | Update dependencies |
| 0.2.3 | 2024-06-25 | [40276](https://github.com/airbytehq/airbyte/pull/40276) | Update dependencies |
| 0.2.2 | 2024-06-22 | [40073](https://github.com/airbytehq/airbyte/pull/40073) | Update dependencies |
| 0.2.1 | 2024-05-20 | [38377](https://github.com/airbytehq/airbyte/pull/38377) | [autopull] base image + poetry + up_to_date |
| 0.2.0 | 2023-06-15 | [29391](https://github.com/airbytehq/airbyte/pull/29391) | Migrated to Low Code |
| 0.1.0 | 2022-10-28 | [18471](https://github.com/airbytehq/airbyte/pull/18471) | Initial Release |

</details>
