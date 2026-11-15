---
generated_record: true
connector_name: Weatherstack
connector_type: source
connector_slug: weatherstack
connector_directory: source-weatherstack
definition_id: 5db8292c-5f5a-11ed-9b6a-0242ac120002
version: 1.1.16
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/weatherstack
logo: /images/connectors/sources/weatherstack.svg
logo_source_path: airbyte-integrations/connectors/source-weatherstack/icon.svg
logo_sha256: cd740bb6af218e6dc7a17c7599aad4f9e2d74e974f63377744d434a1fe5f02a0
original_metadata_path: airbyte-integrations/connectors/source-weatherstack/metadata.yaml
original_metadata_sha256: a150f3c979d489096afbe481c5362750ccd0477dab6a59b800bd8619839ce353
original_document_path: docs/integrations/sources/weatherstack.md
original_document_sha256: 01f9d13dc3e2ee630c6b5877947013cedfbdf2f6613ec8188fc54f0d2271dcf1
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d10d28fd2581f078581c7461b6dec53c3a7ebc4ed4c26811c05afcc2147a3028
rewritten_at: 2026-11-12T14:00:23.321986+00:00
---

# Weatherstack

## Overview

This source connector syncs data from the [Weatherstack API](http://api.weatherstack.com/). It provides current, historical, location lookup and weather forecast data.

### Output schema

This source has four streams: `current`, `historical`, `forecast` and `autocomplete`. The Current Weather API is available on every plan. The Historical Weather and Autocomplete APIs are available on the standard plan and higher. The Forecast API is available on the Professional plan and higher. You can find examples of this stream's output [here](https://weatherstack.com/documentation).

### Features

| Feature                           | Supported? |
| :-------------------------------- | :--------- |
| Full Refresh Sync - (append only) | Yes        |
| Incremental - Append Sync         | Yes        |
| Namespaces                        | No         |

## Get started

### Requirements

- A Weatherstack API key
- A city or zip code location for the weather data you want
- A historical date for the API stream to gather data for a specific date

### Setup guide

Create a user account and get an API key from [Wetherstack](https://weatherstack.com/). The current and forecast streams are available with the free plan.

## Rate limits

The free plan allows 250 calls each month. Airbyte's existing sync frequencies won't exceed this limit.

## IP allow list

If you use Airbyte Cloud with access restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject         |
| :------ | :--------- | :------------------------------------------------------- | :-------------- |
| 1.1.16 | 2026-11-09 | [91452](https://github.com/airbytehq/airbyte/pull/91452) | Upgrade to source-declarative-manifest 7.47.0 (Airbyte CDK 7) |
| 1.1.15 | 2026-11-03 | [79044](https://github.com/airbytehq/airbyte/pull/79044) | Update dependencies |
| 1.1.14 | 2025-05-24 | [60741](https://github.com/airbytehq/airbyte/pull/60741) | Update dependencies |
| 1.1.13 | 2025-05-10 | [59914](https://github.com/airbytehq/airbyte/pull/59914) | Update dependencies |
| 1.1.12 | 2025-05-04 | [59546](https://github.com/airbytehq/airbyte/pull/59546) | Update dependencies |
| 1.1.11 | 2025-04-26 | [58952](https://github.com/airbytehq/airbyte/pull/58952) | Update dependencies |
| 1.1.10 | 2025-04-19 | [58542](https://github.com/airbytehq/airbyte/pull/58542) | Update dependencies |
| 1.1.9 | 2025-04-12 | [58016](https://github.com/airbytehq/airbyte/pull/58016) | Update dependencies |
| 1.1.8 | 2025-04-05 | [57433](https://github.com/airbytehq/airbyte/pull/57433) | Update dependencies |
| 1.1.7 | 2025-03-29 | [56831](https://github.com/airbytehq/airbyte/pull/56831) | Update dependencies |
| 1.1.6 | 2025-03-22 | [56268](https://github.com/airbytehq/airbyte/pull/56268) | Update dependencies |
| 1.1.5 | 2025-03-08 | [55600](https://github.com/airbytehq/airbyte/pull/55600) | Update dependencies |
| 1.1.4 | 2025-03-01 | [55096](https://github.com/airbytehq/airbyte/pull/55096) | Update dependencies |
| 1.1.3 | 2025-02-22 | [54498](https://github.com/airbytehq/airbyte/pull/54498) | Update dependencies |
| 1.1.2 | 2025-02-15 | [47532](https://github.com/airbytehq/airbyte/pull/47532) | Update dependencies |
| 1.1.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 1.1.0 | 2024-08-14 | [44046](https://github.com/airbytehq/airbyte/pull/44046) | Refactor connector to manifest-only format |
| 1.0.2 | 2024-08-12 | [43892](https://github.com/airbytehq/airbyte/pull/43892) | Update dependencies |
| 1.0.1 | 2024-08-10 | [43615](https://github.com/airbytehq/airbyte/pull/43615) | Update dependencies |
| 1.0.0 | 2024-08-04 | [43298](https://github.com/airbytehq/airbyte/pull/43298) | Migrate to LowCode |
| 0.1.12 | 2024-08-03 | [43177](https://github.com/airbytehq/airbyte/pull/43177) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42672](https://github.com/airbytehq/airbyte/pull/42672) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42280](https://github.com/airbytehq/airbyte/pull/42280) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41887](https://github.com/airbytehq/airbyte/pull/41887) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41566](https://github.com/airbytehq/airbyte/pull/41566) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41241](https://github.com/airbytehq/airbyte/pull/41241) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40876](https://github.com/airbytehq/airbyte/pull/40876) | Update dependencies |
| 0.1.5 | 2024-06-26 | [40549](https://github.com/airbytehq/airbyte/pull/40549) | Migrate off deprecated auth package |
| 0.1.4 | 2024-06-25 | [40414](https://github.com/airbytehq/airbyte/pull/40414) | Update dependencies |
| 0.1.3 | 2024-06-22 | [40086](https://github.com/airbytehq/airbyte/pull/40086) | Update dependencies |
| 0.1.2 | 2024-06-06 | [39190](https://github.com/airbytehq/airbyte/pull/39190) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-20 | [38438](https://github.com/airbytehq/airbyte/pull/38438) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-09-08 | [16473](https://github.com/airbytehq/airbyte/pull/16473) | Initial release |

</details>
