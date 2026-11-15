---
generated_record: true
connector_name: Commcare
connector_type: source
connector_slug: commcare
connector_directory: source-commcare
definition_id: f39208dc-7e1c-48b8-919b-5006360cc27f
version: 0.1.40
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/commcare
logo: /images/connectors/sources/commcare.svg
logo_source_path: airbyte-integrations/connectors/source-commcare/icon.svg
logo_sha256: 660bec8df9b5168236b160f22aea821ea1a6d05a384c30d21cd70b8a3e6da4cf
original_metadata_path: airbyte-integrations/connectors/source-commcare/metadata.yaml
original_metadata_sha256: e5ea08cbb82fa5d873c70e0064216af32c3afc03b011e3016d74b1f6f48c3ada
original_document_path: docs/integrations/sources/commcare.md
original_document_sha256: b3609149b41a5b3584b700d53c5baaf391b50ec88d0316bd2adfbf1fb38e58e1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 597a1f372acd05bce843431d56c20dcd809fc952f5bd4c2c3200d976b283ca88
rewritten_at: 2026-11-12T13:34:05.532720+00:00
---

# Commcare

Set up the Commcare source connector by following this guide.

## Prerequisites

- Your Commcare API Key
- The Application ID you want to use
- The start date for replicating records

## Set up the source connector

1. Sign in to your [Airbyte Cloud](https://cloud.airbyte.com/workspaces) or Airbyte Open Source account.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Commcare** from the Source type dropdown.
4. Enter a name for your source.
5. For **API Key**, enter your Commcare API Key.
6. Click **Set up source**.

## Supported sync modes

The Commcare source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh
- Overwrite
- Incremental

## Supported streams

The Commcare source connector supports these streams:

- Application
- Case
- Form

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                   |
| ------- | ---------- | -------------------------------------------------------- | ------------------------- |
| 0.1.40 | 2026-06-02 | [78626](https://github.com/airbytehq/airbyte/pull/78626) | Update dependencies |
| 0.1.39 | 2025-05-24 | [60382](https://github.com/airbytehq/airbyte/pull/60382) | Update dependencies |
| 0.1.38 | 2025-05-10 | [60011](https://github.com/airbytehq/airbyte/pull/60011) | Update dependencies |
| 0.1.37 | 2025-05-03 | [59396](https://github.com/airbytehq/airbyte/pull/59396) | Update dependencies |
| 0.1.36 | 2025-04-26 | [58905](https://github.com/airbytehq/airbyte/pull/58905) | Update dependencies |
| 0.1.35 | 2025-04-19 | [58353](https://github.com/airbytehq/airbyte/pull/58353) | Update dependencies |
| 0.1.34 | 2025-04-12 | [55998](https://github.com/airbytehq/airbyte/pull/55998) | Update dependencies |
| 0.1.33 | 2025-03-08 | [55313](https://github.com/airbytehq/airbyte/pull/55313) | Update dependencies |
| 0.1.32 | 2025-03-01 | [54912](https://github.com/airbytehq/airbyte/pull/54912) | Update dependencies |
| 0.1.31 | 2025-02-22 | [54424](https://github.com/airbytehq/airbyte/pull/54424) | Update dependencies |
| 0.1.30 | 2025-02-15 | [53749](https://github.com/airbytehq/airbyte/pull/53749) | Update dependencies |
| 0.1.29 | 2025-02-01 | [52845](https://github.com/airbytehq/airbyte/pull/52845) | Update dependencies |
| 0.1.28 | 2025-01-25 | [52319](https://github.com/airbytehq/airbyte/pull/52319) | Update dependencies |
| 0.1.27 | 2025-01-18 | [51097](https://github.com/airbytehq/airbyte/pull/51097) | Update dependencies |
| 0.1.26 | 2024-12-28 | [50509](https://github.com/airbytehq/airbyte/pull/50509) | Update dependencies |
| 0.1.25 | 2024-12-21 | [50064](https://github.com/airbytehq/airbyte/pull/50064) | Update dependencies |
| 0.1.24 | 2024-12-14 | [49172](https://github.com/airbytehq/airbyte/pull/49172) | Update dependencies |
| 0.1.23 | 2024-11-25 | [48645](https://github.com/airbytehq/airbyte/pull/48645) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.22 | 2024-10-29 | [47767](https://github.com/airbytehq/airbyte/pull/47767) | Update dependencies |
| 0.1.21 | 2024-10-28 | [46795](https://github.com/airbytehq/airbyte/pull/46795) | Update dependencies |
| 0.1.20 | 2024-10-05 | [46413](https://github.com/airbytehq/airbyte/pull/46413) | Update dependencies |
| 0.1.19 | 2024-09-28 | [46163](https://github.com/airbytehq/airbyte/pull/46163) | Update dependencies |
| 0.1.18 | 2024-09-21 | [45758](https://github.com/airbytehq/airbyte/pull/45758) | Update dependencies |
| 0.1.17 | 2024-09-14 | [45549](https://github.com/airbytehq/airbyte/pull/45549) | Update dependencies |
| 0.1.16 | 2024-09-07 | [45266](https://github.com/airbytehq/airbyte/pull/45266) | Update dependencies |
| 0.1.15 | 2024-08-31 | [45038](https://github.com/airbytehq/airbyte/pull/45038) | Update dependencies |
| 0.1.14 | 2024-08-24 | [44714](https://github.com/airbytehq/airbyte/pull/44714) | Update dependencies |
| 0.1.13 | 2024-08-17 | [44261](https://github.com/airbytehq/airbyte/pull/44261) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43590](https://github.com/airbytehq/airbyte/pull/43590) | Update dependencies |
| 0.1.11 | 2024-08-03 | [43193](https://github.com/airbytehq/airbyte/pull/43193) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42748](https://github.com/airbytehq/airbyte/pull/42748) | Update dependencies |
| 0.1.9 | 2024-07-20 | [42184](https://github.com/airbytehq/airbyte/pull/42184) | Update dependencies |
| 0.1.8 | 2024-07-13 | [41907](https://github.com/airbytehq/airbyte/pull/41907) | Update dependencies |
| 0.1.7 | 2024-07-10 | [41512](https://github.com/airbytehq/airbyte/pull/41512) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40807](https://github.com/airbytehq/airbyte/pull/40807) | Update dependencies |
| 0.1.5 | 2024-06-26 | [40542](https://github.com/airbytehq/airbyte/pull/40542) | Update dependencies |
| 0.1.4 | 2024-06-25 | [40325](https://github.com/airbytehq/airbyte/pull/40325) | Update dependencies |
| 0.1.3 | 2024-06-22 | [40057](https://github.com/airbytehq/airbyte/pull/40057) | Update dependencies |
| 0.1.2 | 2024-06-04 | [39026](https://github.com/airbytehq/airbyte/pull/39026) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-21 | [38519](https://github.com/airbytehq/airbyte/pull/38519) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-11-08 | [20220](https://github.com/airbytehq/airbyte/pull/20220) | Commcare Source Connector |

</details>
