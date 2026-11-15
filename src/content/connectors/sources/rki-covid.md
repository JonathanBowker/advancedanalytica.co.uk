---
generated_record: true
connector_name: RKI Covid
connector_type: source
connector_slug: rki-covid
connector_directory: source-rki-covid
definition_id: d78e5de0-aa44-4744-aa4f-74c818ccfe19
version: 0.1.41
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/rki-covid
logo: /images/connectors/sources/rki-covid.svg
logo_source_path: airbyte-integrations/connectors/source-rki-covid/icon.svg
logo_sha256: 85d61aa5eb4c171846f4f87edefe8b9984bd91ecb5e6f9164f5463ea85121cef
original_metadata_path: airbyte-integrations/connectors/source-rki-covid/metadata.yaml
original_metadata_sha256: cb10ea9bf6630c53a5086e10f8ee65743c1c266121668d41c3fb4d9c425dfada
original_document_path: docs/integrations/sources/rki-covid.md
original_document_sha256: ea38f0c8b496ad87b96a2a91c9d2401970ae0351b33fbdf1bc93f1b2cb674e05
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 75c5bca4880eb2ae7ed42316794817edbc93e9da938c6a73d891c3973a8096c9
rewritten_at: 2026-11-12T13:54:10.380303+00:00
---

# Robert Koch-Institut Covid

## Sync overview

This source syncs data for the [Robert Koch-Institut Covid API](https://api.corona-zahlen.org/) using Full Refresh or Incremental syncs. Choose whether each sync copies only new or updated data, or every row in your selected tables and columns.

### Output schema

This source can sync these core Streams for German cases only:

- Germany
- Germany by age and groups
- Germany cases by days
- Germany incidences by days
- Germany deaths by days
- Germany recovered by days
- Germany frozen-incidence by days
- Germany hospitalization by days

### Data type mapping

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`         | `string`     |       |
| `integer`        | `integer`    |       |
| `number`         | `number`     |       |
| `array`          | `array`      |       |
| `object`         | `object`     |       |

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | Yes                  |       |
| Namespaces        | No                   |       |

### Performance considerations

Under normal use, the RKI Covid connector shouldn't reach the RKI Covid API limits. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if rate-limit issues aren't retried automatically and successfully.

## Get started

### Requirements

- Start Date

### Setup guide

Select start date

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                            |
| :------ | :--------- | :------------------------------------------------------- | :--------------------------------- |
| 0.1.41 | 2025-05-24 | [60457](https://github.com/airbytehq/airbyte/pull/60457) | Update dependencies |
| 0.1.40 | 2025-05-10 | [59011](https://github.com/airbytehq/airbyte/pull/59011) | Update dependencies |
| 0.1.39 | 2025-04-19 | [58373](https://github.com/airbytehq/airbyte/pull/58373) | Update dependencies |
| 0.1.38 | 2025-04-12 | [57951](https://github.com/airbytehq/airbyte/pull/57951) | Update dependencies |
| 0.1.37 | 2025-04-05 | [57319](https://github.com/airbytehq/airbyte/pull/57319) | Update dependencies |
| 0.1.36 | 2025-03-29 | [56738](https://github.com/airbytehq/airbyte/pull/56738) | Update dependencies |
| 0.1.35 | 2025-03-22 | [56224](https://github.com/airbytehq/airbyte/pull/56224) | Update dependencies |
| 0.1.34 | 2025-03-08 | [54024](https://github.com/airbytehq/airbyte/pull/54024) | Update dependencies |
| 0.1.33 | 2025-02-08 | [53027](https://github.com/airbytehq/airbyte/pull/53027) | Update dependencies |
| 0.1.32 | 2025-01-25 | [52527](https://github.com/airbytehq/airbyte/pull/52527) | Update dependencies |
| 0.1.31 | 2025-01-18 | [51863](https://github.com/airbytehq/airbyte/pull/51863) | Update dependencies |
| 0.1.30 | 2025-01-11 | [51297](https://github.com/airbytehq/airbyte/pull/51297) | Update dependencies |
| 0.1.29 | 2024-12-28 | [50707](https://github.com/airbytehq/airbyte/pull/50707) | Update dependencies |
| 0.1.28 | 2024-12-21 | [50237](https://github.com/airbytehq/airbyte/pull/50237) | Update dependencies |
| 0.1.27 | 2024-12-14 | [49724](https://github.com/airbytehq/airbyte/pull/49724) | Update dependencies |
| 0.1.26 | 2024-12-12 | [49099](https://github.com/airbytehq/airbyte/pull/49099) | Update dependencies |
| 0.1.25 | 2024-11-25 | [48677](https://github.com/airbytehq/airbyte/pull/48677) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.24 | 2024-10-29 | [47083](https://github.com/airbytehq/airbyte/pull/47083) | Update dependencies |
| 0.1.23 | 2024-10-12 | [46791](https://github.com/airbytehq/airbyte/pull/46791) | Update dependencies |
| 0.1.22 | 2024-10-05 | [46495](https://github.com/airbytehq/airbyte/pull/46495) | Update dependencies |
| 0.1.21 | 2024-09-28 | [46123](https://github.com/airbytehq/airbyte/pull/46123) | Update dependencies |
| 0.1.20 | 2024-09-21 | [45833](https://github.com/airbytehq/airbyte/pull/45833) | Update dependencies |
| 0.1.19 | 2024-09-14 | [45478](https://github.com/airbytehq/airbyte/pull/45478) | Update dependencies |
| 0.1.18 | 2024-09-07 | [45284](https://github.com/airbytehq/airbyte/pull/45284) | Update dependencies |
| 0.1.17 | 2024-08-31 | [44993](https://github.com/airbytehq/airbyte/pull/44993) | Update dependencies |
| 0.1.16 | 2024-08-24 | [44639](https://github.com/airbytehq/airbyte/pull/44639) | Update dependencies |
| 0.1.15 | 2024-08-17 | [44290](https://github.com/airbytehq/airbyte/pull/44290) | Update dependencies |
| 0.1.14 | 2024-08-10 | [43557](https://github.com/airbytehq/airbyte/pull/43557) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43070](https://github.com/airbytehq/airbyte/pull/43070) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42707](https://github.com/airbytehq/airbyte/pull/42707) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42377](https://github.com/airbytehq/airbyte/pull/42377) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41824](https://github.com/airbytehq/airbyte/pull/41824) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41472](https://github.com/airbytehq/airbyte/pull/41472) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41134](https://github.com/airbytehq/airbyte/pull/41134) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40927](https://github.com/airbytehq/airbyte/pull/40927) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40449](https://github.com/airbytehq/airbyte/pull/40449) | Update dependencies |
| 0.1.5 | 2024-06-22 | [39980](https://github.com/airbytehq/airbyte/pull/39980) | Update dependencies |
| 0.1.4 | 2024-06-06 | [39294](https://github.com/airbytehq/airbyte/pull/39294) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.3 | 2024-05-20 | [38434](https://github.com/airbytehq/airbyte/pull/38434) | [autopull] base image + poetry + up_to_date |
| 0.1.2 | 2022-08-25 | [15667](https://github.com/airbytehq/airbyte/pull/15667) | Add message when no data available |
| 0.1.1 | 2022-05-30 | [11732](https://github.com/airbytehq/airbyte/pull/11732) | Fix docs |
| 0.1.0 | 2022-05-30 | [11732](https://github.com/airbytehq/airbyte/pull/11732) | Initial Release |

</details>
