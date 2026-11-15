---
generated_record: true
connector_name: PagerDuty
connector_type: source
connector_slug: pagerduty
connector_directory: airbyte-pagerduty-source
definition_id: 2817b3f0-04e4-4c7a-9f32-7a5e8a83db95
version: 0.1.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pagerduty
logo: /images/connectors/sources/pagerduty--airbyte-pagerduty-source.svg
logo_source_path: airbyte-integrations/connectors/third-party/farosai/airbyte-pagerduty-source/icon.svg
logo_sha256: a7d989011d7ac17b0615ab2f0c1f42c6e579914ccff678a728ac026cbf93385b
original_metadata_path: airbyte-integrations/connectors/third-party/farosai/airbyte-pagerduty-source/metadata.yaml
original_metadata_sha256: dcda39534b056846c86ddfb1b4b9c747d89fb2b5e1d3c3d2f7fcd62a565d248c
original_document_path: docs/integrations/sources/pagerduty.md
original_document_sha256: eccb9af148ebf4fd59f0939d1a3fbb3c8079088257465f1dc428a02b62a2e69a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1a532d86fae5f7695e3541f372e723d276c519751ee5e76eddbcc64223a6c51e
rewritten_at: 2026-11-12T13:50:25.966885+00:00
---

# PagerDuty

## Overview

[Faros
AI](https://github.com/faros-ai/airbyte-connectors/tree/main/sources/pagerduty-source) maintains the PagerDuty source.
Submit support requests in that repository to reduce maintainer response times.

The source supports Full Refresh and Incremental syncs. For each sync, you can copy only new or updated data. Alternatively, copy every row from the tables and columns configured for replication.

### Output schema

This source provides several output streams:

- [Incidents](https://developer.pagerduty.com/api-reference/b3A6Mjc0ODEzOA-list-incidents) \(Incremental\)
- [Incident Log Entries](https://developer.pagerduty.com/api-reference/b3A6Mjc0ODE1NA-list-log-entries) \(Incremental\)
- [Priorities](https://developer.pagerduty.com/api-reference/b3A6Mjc0ODE2NA-list-priorities)
- [Users](https://developer.pagerduty.com/api-reference/b3A6Mjc0ODIzMw-list-users)

If you'd like Faros AI to support more endpoints, please [create an
issue.](https://github.com/faros-ai/airbyte-connectors/issues/new)

### Features

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |
| SSL connection    | Yes        |
| Namespaces        | No         |

### Performance

Under normal usage, the PagerDuty source shouldn't encounter PagerDuty API limitations. If rate limit issues aren't automatically retried successfully, please [create an
issue](https://github.com/faros-ai/airbyte-connectors/issues/new).

## Get started

### Requirements

- PagerDuty API Key

Follow the [their documentation for generating a PagerDuty API
Key](https://support.pagerduty.com/docs/generating-api-keys#section-generating-a-general-access-rest-api-key).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                   | Subject                              |
| :------ | :--------- | :------------------------------------------------------------- | :----------------------------------- |
| 0.3.51 | 2026-11-10 | [91669](https://github.com/airbytehq/airbyte/pull/91669) | Update dependencies |
| 0.3.50 | 2026-11-03 | [90680](https://github.com/airbytehq/airbyte/pull/90680) | Update dependencies |
| 0.3.49 | 2026-10-27 | [90009](https://github.com/airbytehq/airbyte/pull/90009) | Update dependencies |
| 0.3.48 | 2026-10-20 | [89341](https://github.com/airbytehq/airbyte/pull/89341) | Update dependencies |
| 0.3.47 | 2026-10-13 | [84042](https://github.com/airbytehq/airbyte/pull/84042) | Update dependencies |
| 0.3.46 | 2026-08-04 | [83562](https://github.com/airbytehq/airbyte/pull/83562) | Update dependencies |
| 0.3.45 | 2026-07-28 | [83026](https://github.com/airbytehq/airbyte/pull/83026) | Update dependencies |
| 0.3.44 | 2026-07-21 | [82545](https://github.com/airbytehq/airbyte/pull/82545) | Update dependencies |
| 0.3.43 | 2026-07-14 | [81915](https://github.com/airbytehq/airbyte/pull/81915) | Update dependencies |
| 0.3.42 | 2026-06-30 | [81194](https://github.com/airbytehq/airbyte/pull/81194) | Update dependencies |
| 0.3.41 | 2026-06-23 | [80597](https://github.com/airbytehq/airbyte/pull/80597) | Update dependencies |
| 0.3.40 | 2026-06-16 | [79976](https://github.com/airbytehq/airbyte/pull/79976) | Update dependencies |
| 0.3.39 | 2026-06-09 | [79431](https://github.com/airbytehq/airbyte/pull/79431) | Update dependencies |
| 0.3.38 | 2026-06-02 | [78877](https://github.com/airbytehq/airbyte/pull/78877) | Update dependencies |
| 0.3.37 | 2026-04-28 | [77384](https://github.com/airbytehq/airbyte/pull/77384) | Update dependencies |
| 0.3.36 | 2026-04-21 | [75667](https://github.com/airbytehq/airbyte/pull/75667) | Update dependencies |
| 0.3.35 | 2026-03-24 | [75328](https://github.com/airbytehq/airbyte/pull/75328) | Update dependencies |
| 0.3.34 | 2026-03-10 | [74629](https://github.com/airbytehq/airbyte/pull/74629) | Update dependencies |
| 0.3.33 | 2026-03-03 | [74232](https://github.com/airbytehq/airbyte/pull/74232) | Update dependencies |
| 0.3.32 | 2026-02-10 | [73120](https://github.com/airbytehq/airbyte/pull/73120) | Update dependencies |
| 0.3.31 | 2026-02-03 | [72585](https://github.com/airbytehq/airbyte/pull/72585) | Update dependencies |
| 0.3.30 | 2026-01-20 | [72171](https://github.com/airbytehq/airbyte/pull/72171) | Update dependencies |
| 0.3.29 | 2026-01-14 | [71671](https://github.com/airbytehq/airbyte/pull/71671) | Update dependencies |
| 0.3.28 | 2025-12-18 | [70522](https://github.com/airbytehq/airbyte/pull/70522) | Update dependencies |
| 0.3.27 | 2025-11-25 | [70092](https://github.com/airbytehq/airbyte/pull/70092) | Update dependencies |
| 0.3.26 | 2025-11-18 | [69672](https://github.com/airbytehq/airbyte/pull/69672) | Update dependencies |
| 0.3.25 | 2025-10-29 | [68998](https://github.com/airbytehq/airbyte/pull/68998) | Update dependencies |
| 0.3.24 | 2025-10-21 | [68290](https://github.com/airbytehq/airbyte/pull/68290) | Update dependencies |
| 0.3.23 | 2025-10-14 | [67782](https://github.com/airbytehq/airbyte/pull/67782) | Update dependencies |
| 0.3.22 | 2025-10-07 | [67345](https://github.com/airbytehq/airbyte/pull/67345) | Update dependencies |
| 0.3.21 | 2025-09-30 | [66395](https://github.com/airbytehq/airbyte/pull/66395) | Update dependencies |
| 0.3.20 | 2025-09-10 | [65858](https://github.com/airbytehq/airbyte/pull/65858) | Update dependencies |
| 0.3.19 | 2025-08-23 | [65170](https://github.com/airbytehq/airbyte/pull/65170) | Update dependencies |
| 0.3.18 | 2025-08-09 | [64767](https://github.com/airbytehq/airbyte/pull/64767) | Update dependencies |
| 0.3.17 | 2025-08-02 | [64253](https://github.com/airbytehq/airbyte/pull/64253) | Update dependencies |
| 0.3.16 | 2025-07-26 | [63884](https://github.com/airbytehq/airbyte/pull/63884) | Update dependencies |
| 0.3.15 | 2025-07-19 | [63435](https://github.com/airbytehq/airbyte/pull/63435) | Update dependencies |
| 0.3.14 | 2025-07-12 | [63161](https://github.com/airbytehq/airbyte/pull/63161) | Update dependencies |
| 0.3.13 | 2025-07-05 | [62552](https://github.com/airbytehq/airbyte/pull/62552) | Update dependencies |
| 0.3.12 | 2025-06-28 | [62388](https://github.com/airbytehq/airbyte/pull/62388) | Update dependencies |
| 0.3.11 | 2025-06-21 | [61923](https://github.com/airbytehq/airbyte/pull/61923) | Update dependencies |
| 0.3.10 | 2025-06-14 | [61027](https://github.com/airbytehq/airbyte/pull/61027) | Update dependencies |
| 0.3.9 | 2025-05-24 | [60123](https://github.com/airbytehq/airbyte/pull/60123) | Update dependencies |
| 0.3.8 | 2025-05-03 | [59469](https://github.com/airbytehq/airbyte/pull/59469) | Update dependencies |
| 0.3.7 | 2025-04-27 | [59103](https://github.com/airbytehq/airbyte/pull/59103) | Update dependencies |
| 0.3.6 | 2025-04-19 | [58486](https://github.com/airbytehq/airbyte/pull/58486) | Update dependencies |
| 0.3.5 | 2025-04-12 | [57925](https://github.com/airbytehq/airbyte/pull/57925) | Update dependencies |
| 0.3.4 | 2025-04-05 | [57302](https://github.com/airbytehq/airbyte/pull/57302) | Update dependencies |
| 0.3.3 | 2025-03-29 | [56736](https://github.com/airbytehq/airbyte/pull/56736) | Update dependencies |
| 0.3.2 | 2025-03-22 | [56208](https://github.com/airbytehq/airbyte/pull/56208) | Update dependencies |
| 0.3.1 | 2025-03-08 | [43794](https://github.com/airbytehq/airbyte/pull/43794) | Update dependencies |
| 0.3.0 | 2024-10-06 | [46528](https://github.com/airbytehq/airbyte/pull/46528) | Converting to manifest-only format |
| 0.2.12 | 2024-08-03 | [43061](https://github.com/airbytehq/airbyte/pull/43061) | Update dependencies |
| 0.2.11 | 2024-07-27 | [42713](https://github.com/airbytehq/airbyte/pull/42713) | Update dependencies |
| 0.2.10 | 2024-07-20 | [42267](https://github.com/airbytehq/airbyte/pull/42267) | Update dependencies |
| 0.2.9 | 2024-07-13 | [41725](https://github.com/airbytehq/airbyte/pull/41725) | Update dependencies |
| 0.2.8 | 2024-07-10 | [41501](https://github.com/airbytehq/airbyte/pull/41501) | Update dependencies |
| 0.2.7 | 2024-07-09 | [41240](https://github.com/airbytehq/airbyte/pull/41240) | Update dependencies |
| 0.2.6 | 2024-07-06 | [40803](https://github.com/airbytehq/airbyte/pull/40803) | Update dependencies |
| 0.2.5 | 2024-06-25 | [40303](https://github.com/airbytehq/airbyte/pull/40303) | Update dependencies |
| 0.2.4 | 2024-06-22 | [39985](https://github.com/airbytehq/airbyte/pull/39985) | Update dependencies |
| 0.2.3 | 2024-06-12 | [39115](https://github.com/airbytehq/airbyte/pull/39115) | Make compatible with builder |
| 0.2.2 | 2024-06-06 | [39169](https://github.com/airbytehq/airbyte/pull/39169) | [autopull] Upgrade base image to v1.2.2 |
| 0.2.1 | 2024-05-20 | [38429](https://github.com/airbytehq/airbyte/pull/38429) | [autopull] base image + poetry + up_to_date |
| 0.2.0 | 2023-10-20 | [31160](https://github.com/airbytehq/airbyte/pull/31160) | Migrate to low code |
| 0.1.23  | 2021-11-12 | [125](https://github.com/faros-ai/airbyte-connectors/pull/125) | Add Pagerduty source and destination |

</details>
