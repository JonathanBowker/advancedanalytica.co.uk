---
generated_record: true
connector_name: Hubplanner
connector_type: source
connector_slug: hubplanner
connector_directory: source-hubplanner
definition_id: 8097ceb9-383f-42f6-9f92-d3fd4bcc7689
version: 0.3.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/hubplanner
logo: /images/connectors/sources/hubplanner.svg
logo_source_path: airbyte-integrations/connectors/source-hubplanner/icon.svg
logo_sha256: 297bf5d0da1b367ba4dc688a6d652309a9c94effa89b38f81a6400134763ff3e
original_metadata_path: airbyte-integrations/connectors/source-hubplanner/metadata.yaml
original_metadata_sha256: 1864f89261d9c94713fe0eb705eecf43e52e4867fda2f622edecd24bc41ea7d1
original_document_path: docs/integrations/sources/hubplanner.md
original_document_sha256: aff9c23206f64dd6a910de63e17372e808e4fbc1b5bffbb231d8e28a8b5d075b
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7fc285606c760a56a23f7b5fd7377e3c2717a3d14dfd12ef8797e46f5c4f27c9
rewritten_at: 2026-11-12T13:42:36.641646+00:00
---

# Hubplanner

Hubplanner helps you plan, schedule, report on and manage your entire team.

## Prerequisites

- Create an API Key to access your Hubplanner data.

## Airbyte Open Source

- API Key

## Airbyte Cloud

- Coming soon.

## Setup guide

### Airbyte Open Source

1. Access https://your-domain.hubplanner.com/settings#api, or select Integrations/Hub Planner API in the left panel.
2. Select Generate Key.

## Supported sync modes

The Okta source connector supports the following [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh

## Supported streams

- [Billing Rates](https://github.com/hubplanner/API/blob/master/Sections/billingrate.md)
- [Bookings](https://github.com/hubplanner/API/blob/master/Sections/bookings.md)
- [Clients](https://github.com/hubplanner/API/blob/master/Sections/clients.md)
- [Events](https://github.com/hubplanner/API/blob/master/Sections/events.md)
- [Holidays](https://github.com/hubplanner/API/blob/master/Sections/holidays.md)
- [Projects](https://github.com/hubplanner/API/blob/master/Sections/project.md)
- [Resources](https://github.com/hubplanner/API/blob/master/Sections/resource.md)

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--- | :----------- | :------ |
| 0.3.23 | 2025-05-24 | [60674](https://github.com/airbytehq/airbyte/pull/60674) | Update dependencies |
| 0.3.22 | 2025-05-10 | [59879](https://github.com/airbytehq/airbyte/pull/59879) | Update dependencies |
| 0.3.21 | 2025-05-03 | [59248](https://github.com/airbytehq/airbyte/pull/59248) | Update dependencies |
| 0.3.20 | 2025-04-26 | [58817](https://github.com/airbytehq/airbyte/pull/58817) | Update dependencies |
| 0.3.19 | 2025-04-19 | [58158](https://github.com/airbytehq/airbyte/pull/58158) | Update dependencies |
| 0.3.18 | 2025-04-12 | [57726](https://github.com/airbytehq/airbyte/pull/57726) | Update dependencies |
| 0.3.17 | 2025-04-05 | [57028](https://github.com/airbytehq/airbyte/pull/57028) | Update dependencies |
| 0.3.16 | 2025-03-29 | [56701](https://github.com/airbytehq/airbyte/pull/56701) | Update dependencies |
| 0.3.15 | 2025-03-22 | [56002](https://github.com/airbytehq/airbyte/pull/56002) | Update dependencies |
| 0.3.14 | 2025-03-08 | [55450](https://github.com/airbytehq/airbyte/pull/55450) | Update dependencies |
| 0.3.13 | 2025-03-01 | [54773](https://github.com/airbytehq/airbyte/pull/54773) | Update dependencies |
| 0.3.12 | 2025-02-22 | [54362](https://github.com/airbytehq/airbyte/pull/54362) | Update dependencies |
| 0.3.11 | 2025-02-15 | [53805](https://github.com/airbytehq/airbyte/pull/53805) | Update dependencies |
| 0.3.10 | 2025-02-08 | [53253](https://github.com/airbytehq/airbyte/pull/53253) | Update dependencies |
| 0.3.9 | 2025-02-01 | [52716](https://github.com/airbytehq/airbyte/pull/52716) | Update dependencies |
| 0.3.8 | 2025-01-25 | [51846](https://github.com/airbytehq/airbyte/pull/51846) | Update dependencies |
| 0.3.7 | 2025-01-11 | [51142](https://github.com/airbytehq/airbyte/pull/51142) | Update dependencies |
| 0.3.6 | 2024-12-28 | [50623](https://github.com/airbytehq/airbyte/pull/50623) | Update dependencies |
| 0.3.5 | 2024-12-21 | [50075](https://github.com/airbytehq/airbyte/pull/50075) | Update dependencies |
| 0.3.4 | 2024-12-14 | [49617](https://github.com/airbytehq/airbyte/pull/49617) | Update dependencies |
| 0.3.3 | 2024-12-12 | [48239](https://github.com/airbytehq/airbyte/pull/48239) | Update dependencies |
| 0.3.2 | 2024-10-29 | [47738](https://github.com/airbytehq/airbyte/pull/47738) | Update dependencies |
| 0.3.1 | 2024-10-28 | [47511](https://github.com/airbytehq/airbyte/pull/47511) | Update dependencies |
| 0.3.0 | 2024-08-22 | [44569](https://github.com/airbytehq/airbyte/pull/44569) | Refactor connector to manifest-only format |
| 0.2.12 | 2024-08-17 | [43903](https://github.com/airbytehq/airbyte/pull/43903) | Update dependencies |
| 0.2.11 | 2024-08-10 | [43511](https://github.com/airbytehq/airbyte/pull/43511) | Update dependencies |
| 0.2.10 | 2024-08-03 | [43082](https://github.com/airbytehq/airbyte/pull/43082) | Update dependencies |
| 0.2.9 | 2024-07-27 | [42692](https://github.com/airbytehq/airbyte/pull/42692) | Update dependencies |
| 0.2.8 | 2024-07-20 | [42256](https://github.com/airbytehq/airbyte/pull/42256) | Update dependencies |
| 0.2.7 | 2024-07-13 | [41840](https://github.com/airbytehq/airbyte/pull/41840) | Update dependencies |
| 0.2.6 | 2024-07-10 | [41455](https://github.com/airbytehq/airbyte/pull/41455) | Update dependencies |
| 0.2.5 | 2024-07-06 | [40967](https://github.com/airbytehq/airbyte/pull/40967) | Update dependencies |
| 0.2.4 | 2024-06-25 | [40397](https://github.com/airbytehq/airbyte/pull/40397) | Update dependencies |
| 0.2.3 | 2024-06-22 | [40015](https://github.com/airbytehq/airbyte/pull/40015) | Update dependencies |
| 0.2.2 | 2024-06-06 | [39164](https://github.com/airbytehq/airbyte/pull/39164) | [autopull] Upgrade base image to v1.2.2 |
| 0.2.1 | 2024-05-20 | [38417](https://github.com/airbytehq/airbyte/pull/38417) | [autopull] base image + poetry + up_to_date |

| 0.2.0 | 2021-09-31 | [29311](https://github.com/airbytehq/airbyte/pull/29311) | Migrated to LowCode CDK |
| 0.1.0 | 2021-08-10 | [12145](https://github.com/airbytehq/airbyte/pull/12145) | Initial Release |

</details>
