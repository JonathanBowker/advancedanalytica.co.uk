---
generated_record: true
connector_name: Firebolt
connector_type: source
connector_slug: firebolt
connector_directory: source-firebolt
definition_id: 6f2ac653-8623-43c4-8950-19218c7caf3d
version: 2.0.39
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/firebolt
logo: /images/connectors/sources/firebolt.svg
logo_source_path: airbyte-integrations/connectors/source-firebolt/icon.svg
logo_sha256: e4490527873edf3e6280537f4d71409eb69a7b81ecc2dfb8a90e7e9222955dfa
original_metadata_path: airbyte-integrations/connectors/source-firebolt/metadata.yaml
original_metadata_sha256: d2a79460839feb3c0adeb96899cd6bd7b20a77d5035b221310be9f9e9944ebe9
original_document_path: docs/integrations/sources/firebolt.md
original_document_sha256: 54bfa819f27d91762127b4c1de86598b03f3b03aac9e395d40cf0a7e87dbe412
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 76cea5d37dadf147071bd3c81f0bbd9970e064f5cc4a8fc428a2e0844d5a3bab
rewritten_at: 2026-11-12T13:37:32.034036+00:00
---

# Firebolt

## Overview

Sync your data from [Firebolt](https://www.firebolt.io/) with the Firebolt source. It currently supports Full refresh only.

The connector uses a pure Python [firebolt-sdk](https://pypi.org/project/firebolt-sdk/) and requires no additional dependencies.

#### Resulting schema

The Firebolt source preserves your database schema. However, the connected destination may alter the resulting schema. See the destination's documentation for details.

#### Features

| Feature                   | Supported?\(Yes/No\) | Notes |
| :------------------------ | :------------------- | :---- |
| Full Refresh Sync         | Yes                  |       |
| Incremental - Append Sync | No                   |       |

## Get started

### Requirements

1. An existing AWS account

### Set up Firebolt

1. Sign up for Firebolt by following the [guide](https://docs.firebolt.io/godocs/Guides/managing-your-organization/creating-an-organization.html).

1. Follow the getting started [tutorial](https://docs.firebolt.io/godocs/Guides/getting-started.html) to set up a database.

1. Create a [service account](https://docs.firebolt.io/godocs/Guides/managing-your-organization/service-accounts.html).

1. [Load data](https://docs.firebolt.io/godocs/Guides/loading-data/loading-data.html).

#### Check your setup

You should now have:

1. An existing Firebolt account
1. Your connection parameters ready
   1. Service account id
   1. Service account password
   1. [Account name](https://docs.firebolt.io/godocs/Guides/managing-your-organization/managing-accounts.html)
   1. Host (Optional)
   1. Engine (Optional)
1. A running engine. You can't connect while an engine is stopped or starting.
1. Your data in either [Fact or Dimension](https://docs.firebolt.io/godocs/Overview/working-with-tables/working-with-tables.html#fact-and-dimension-tables) tables.

You can now use the Airbyte Firebolt source.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                      |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------------------------------------- |
| 2.0.39 | 2025-10-14 | [68068](https://github.com/airbytehq/airbyte/pull/68068) | Update dependencies |
| 2.0.38 | 2025-10-07 | [67315](https://github.com/airbytehq/airbyte/pull/67315) | Update dependencies |
| 2.0.37 | 2025-09-30 | [66779](https://github.com/airbytehq/airbyte/pull/66779) | Update dependencies |
| 2.0.36 | 2025-09-24 | [66165](https://github.com/airbytehq/airbyte/pull/66165) | Update dependencies |
| 2.0.35 | 2025-09-09 | [65804](https://github.com/airbytehq/airbyte/pull/65804) | Update dependencies |
| 2.0.34 | 2025-08-23 | [65289](https://github.com/airbytehq/airbyte/pull/65289) | Update dependencies |
| 2.0.33 | 2025-08-16 | [65019](https://github.com/airbytehq/airbyte/pull/65019) | Update dependencies |
| 2.0.32 | 2025-08-09 | [64742](https://github.com/airbytehq/airbyte/pull/64742) | Update dependencies |
| 2.0.31 | 2025-08-02 | [64374](https://github.com/airbytehq/airbyte/pull/64374) | Update dependencies |
| 2.0.30 | 2025-07-26 | [63969](https://github.com/airbytehq/airbyte/pull/63969) | Update dependencies |
| 2.0.29 | 2025-07-19 | [63563](https://github.com/airbytehq/airbyte/pull/63563) | Update dependencies |
| 2.0.28 | 2025-07-12 | [62984](https://github.com/airbytehq/airbyte/pull/62984) | Update dependencies |
| 2.0.27 | 2025-07-05 | [62754](https://github.com/airbytehq/airbyte/pull/62754) | Update dependencies |
| 2.0.26 | 2025-06-28 | [62434](https://github.com/airbytehq/airbyte/pull/62434) | Update dependencies |
| 2.0.25 | 2025-06-22 | [48657](https://github.com/airbytehq/airbyte/pull/48657) | Update dependencies |
| 2.0.24 | 2024-11-04 | [48154](https://github.com/airbytehq/airbyte/pull/48154) | Update dependencies |
| 2.0.23 | 2024-10-28 | [47109](https://github.com/airbytehq/airbyte/pull/47109) | Update dependencies |
| 2.0.22 | 2024-10-12 | [46826](https://github.com/airbytehq/airbyte/pull/46826) | Update dependencies |
| 2.0.21 | 2024-10-05 | [46471](https://github.com/airbytehq/airbyte/pull/46471) | Update dependencies |
| 2.0.20 | 2024-09-28 | [46210](https://github.com/airbytehq/airbyte/pull/46210) | Update dependencies |
| 2.0.19 | 2024-09-21 | [45765](https://github.com/airbytehq/airbyte/pull/45765) | Update dependencies |
| 2.0.18 | 2024-09-14 | [45572](https://github.com/airbytehq/airbyte/pull/45572) | Update dependencies |
| 2.0.17 | 2024-09-07 | [45211](https://github.com/airbytehq/airbyte/pull/45211) | Update dependencies |
| 2.0.16 | 2024-08-31 | [45030](https://github.com/airbytehq/airbyte/pull/45030) | Update dependencies |
| 2.0.15 | 2024-08-24 | [44715](https://github.com/airbytehq/airbyte/pull/44715) | Update dependencies |
| 2.0.14 | 2024-08-17 | [44212](https://github.com/airbytehq/airbyte/pull/44212) | Update dependencies |
| 2.0.13 | 2024-08-12 | [43774](https://github.com/airbytehq/airbyte/pull/43774) | Update dependencies |
| 2.0.12 | 2024-08-10 | [43535](https://github.com/airbytehq/airbyte/pull/43535) | Update dependencies |
| 2.0.11 | 2024-08-03 | [43268](https://github.com/airbytehq/airbyte/pull/43268) | Update dependencies |
| 2.0.10 | 2024-07-20 | [42159](https://github.com/airbytehq/airbyte/pull/42159) | Update dependencies |
| 2.0.9 | 2024-07-13 | [41744](https://github.com/airbytehq/airbyte/pull/41744) | Update dependencies |
| 2.0.8 | 2024-07-10 | [41575](https://github.com/airbytehq/airbyte/pull/41575) | Update dependencies |
| 2.0.7 | 2024-07-09 | [41151](https://github.com/airbytehq/airbyte/pull/41151) | Update dependencies |
| 2.0.6 | 2024-07-06 | [40979](https://github.com/airbytehq/airbyte/pull/40979) | Update dependencies |
| 2.0.5 | 2024-06-25 | [40438](https://github.com/airbytehq/airbyte/pull/40438) | Update dependencies |
| 2.0.4 | 2024-06-22 | [40199](https://github.com/airbytehq/airbyte/pull/40199) | Update dependencies |
| 2.0.3 | 2024-06-06 | [39183](https://github.com/airbytehq/airbyte/pull/39183) | [autopull] Upgrade base image to v1.2.2 |
| 2.0.2 | 2024-06-03 | [38892](https://github.com/airbytehq/airbyte/pull/38892) | Replace AirbyteLogger with logging.Logger |
| 2.0.1 | 2024-06-03 | [38892](https://github.com/airbytehq/airbyte/pull/38892) | Replace AirbyteLogger with logging.Logger |
| 2.0.0 | 2024-06-01 | [36349](https://github.com/airbytehq/airbyte/pull/36349) | Service account authentication support |
| 1.0.0 | 2023-07-20 | [21842](https://github.com/airbytehq/airbyte/pull/21842) | PGDate, TimestampTZ, TimestampNTZ and Boolean column support |
| 0.2.1 | 2022-05-10 | [25965](https://github.com/airbytehq/airbyte/pull/25965) | Fix DATETIME conversion to Airbyte date-time type |
| 0.2.0 | 2022-09-09 | [16583](https://github.com/airbytehq/airbyte/pull/16583) | Reading from views |
| 0.1.0 | 2022-04-28 | [13874](https://github.com/airbytehq/airbyte/pull/13874) | Create Firebolt source |

</details>
