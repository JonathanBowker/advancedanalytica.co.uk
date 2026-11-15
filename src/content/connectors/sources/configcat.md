---
generated_record: true
connector_name: ConfigCat
connector_type: source
connector_slug: configcat
connector_directory: source-configcat
definition_id: 4fd7565c-8b99-439b-80d0-2d965e1d958c
version: 0.2.25
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/configcat
logo: /images/connectors/sources/configcat.svg
logo_source_path: airbyte-integrations/connectors/source-configcat/icon.svg
logo_sha256: 90d8510971ba739fe30f229caed16c64ed40b0f0bfae4dada18fa54630c3665b
original_metadata_path: airbyte-integrations/connectors/source-configcat/metadata.yaml
original_metadata_sha256: ecf5bafa7e22b7890de2dec50fc81305402ad289b32874c3383367286b577238
original_document_path: docs/integrations/sources/configcat.md
original_document_sha256: 6049023ee4b2e91f9246dfaa28dbe4448b66ccbfb839152e8409165611fa46c8
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 65e0a417d3df0f4ed8469f4978acbb4111c814364107baf4fa8ffb13ab63c453
rewritten_at: 2026-11-12T13:34:20.739650+00:00
---

# Configcat API

## Sync overview

This source syncs data from the [Configcat API](https://api.configcat.com/docs). It currently supports full refresh syncs only. Each sync retrieves every available record from scratch. Use the connector cautiously if you expect your API to contain many records.

## Supported streams

- organizations
- organization_members
- products
- tags
- environments

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

### Performance considerations

Configcat APIs limit how many API calls each API key can make per second. If you reach this limit, the API returns a 429 HTTP error code. See [here](https://api.configcat.com/docs/#section/Throttling-and-rate-limits)

## Getting started

### Requirements

- Username
- Password

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                     |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------------------------ |
| 0.2.25  | 2026-11-09 | [91319](https://github.com/airbytehq/airbyte/pull/91319) | Upgrade to source-declarative-manifest 7.47.0 (Airbyte CDK 7) |
| 0.2.24 | 2025-05-24 | [60397](https://github.com/airbytehq/airbyte/pull/60397) | Update dependencies |
| 0.2.23 | 2025-05-10 | [60016](https://github.com/airbytehq/airbyte/pull/60016) | Update dependencies |
| 0.2.22 | 2025-05-03 | [59435](https://github.com/airbytehq/airbyte/pull/59435) | Update dependencies |
| 0.2.21 | 2025-04-26 | [58850](https://github.com/airbytehq/airbyte/pull/58850) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58326](https://github.com/airbytehq/airbyte/pull/58326) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57762](https://github.com/airbytehq/airbyte/pull/57762) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57211](https://github.com/airbytehq/airbyte/pull/57211) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56543](https://github.com/airbytehq/airbyte/pull/56543) | Update dependencies |
| 0.2.16 | 2025-03-22 | [55988](https://github.com/airbytehq/airbyte/pull/55988) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55288](https://github.com/airbytehq/airbyte/pull/55288) | Update dependencies |
| 0.2.14 | 2025-03-01 | [54924](https://github.com/airbytehq/airbyte/pull/54924) | Update dependencies |
| 0.2.13 | 2025-02-22 | [54378](https://github.com/airbytehq/airbyte/pull/54378) | Update dependencies |
| 0.2.12 | 2025-02-15 | [53760](https://github.com/airbytehq/airbyte/pull/53760) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53341](https://github.com/airbytehq/airbyte/pull/53341) | Update dependencies |
| 0.2.10 | 2025-02-01 | [52814](https://github.com/airbytehq/airbyte/pull/52814) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52297](https://github.com/airbytehq/airbyte/pull/52297) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51701](https://github.com/airbytehq/airbyte/pull/51701) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51102](https://github.com/airbytehq/airbyte/pull/51102) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50591](https://github.com/airbytehq/airbyte/pull/50591) | Update dependencies |
| 0.2.5 | 2024-12-21 | [49996](https://github.com/airbytehq/airbyte/pull/49996) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49491](https://github.com/airbytehq/airbyte/pull/49491) | Update dependencies |
| 0.2.3 | 2024-12-12 | [48256](https://github.com/airbytehq/airbyte/pull/48256) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47465](https://github.com/airbytehq/airbyte/pull/47465) | Update dependencies |
| 0.2.1 | 2024-10-21 | [47194](https://github.com/airbytehq/airbyte/pull/47194) | Update dependencies |
| 0.2.0 | 2024-08-23 | [44594](https://github.com/airbytehq/airbyte/pull/44594) | Refactor connector to manifest-only format |
| 0.1.13 | 2024-08-17 | [44357](https://github.com/airbytehq/airbyte/pull/44357) | Update dependencies |
| 0.1.12 | 2024-08-12 | [43870](https://github.com/airbytehq/airbyte/pull/43870) | Update dependencies |
| 0.1.11 | 2024-08-10 | [43596](https://github.com/airbytehq/airbyte/pull/43596) | Update dependencies |
| 0.1.10 | 2024-08-03 | [43272](https://github.com/airbytehq/airbyte/pull/43272) | Update dependencies |
| 0.1.9 | 2024-07-27 | [42702](https://github.com/airbytehq/airbyte/pull/42702) | Update dependencies |
| 0.1.8 | 2024-07-20 | [42329](https://github.com/airbytehq/airbyte/pull/42329) | Update dependencies |
| 0.1.7 | 2024-07-13 | [41705](https://github.com/airbytehq/airbyte/pull/41705) | Update dependencies |
| 0.1.6 | 2024-07-10 | [41450](https://github.com/airbytehq/airbyte/pull/41450) | Update dependencies |
| 0.1.5 | 2024-07-06 | [40929](https://github.com/airbytehq/airbyte/pull/40929) | Update dependencies |
| 0.1.4 | 2024-06-25 | [40442](https://github.com/airbytehq/airbyte/pull/40442) | Update dependencies |
| 0.1.3 | 2024-06-22 | [40076](https://github.com/airbytehq/airbyte/pull/40076) | Update dependencies |
| 0.1.2 | 2024-06-06 | [39230](https://github.com/airbytehq/airbyte/pull/39230) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-21 | [38547](https://github.com/airbytehq/airbyte/pull/38547) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2022-10-30 | [#18649](https://github.com/airbytehq/airbyte/pull/18649) | 🎉 New Source: Configcat API [low-code CDK] |

</details>
