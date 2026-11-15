---
generated_record: true
connector_name: Open Exchange Rates
connector_type: source
connector_slug: open-exchange-rates
connector_directory: source-open-exchange-rates
definition_id: 77d5ca6b-d345-4dce-ba1e-1935a75778b8
version: 0.3.13
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/open-exchange-rates
logo: /images/connectors/sources/open-exchange-rates.svg
logo_source_path: airbyte-integrations/connectors/source-open-exchange-rates/icon.svg
logo_sha256: 46ed1c7b150172abd27acc9234839d845263244ae55ca5802737aa116bf6e044
original_metadata_path: airbyte-integrations/connectors/source-open-exchange-rates/metadata.yaml
original_metadata_sha256: 0b4fbd70fed21e5d35ed2ec88cd0f8ff4350e3f37bd2ca298641c25f882502a2
original_document_path: docs/integrations/sources/open-exchange-rates.md
original_document_sha256: bdee7859aa4a5eb5e91c1a00f181e55325be4e3dfdbc9791df8d5cfebd34733d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 16a5cad994e9057d32ce19361a4d1e8a76b1b4b26caebbea0fa3a1bc773cb47e
rewritten_at: 2026-11-12T13:49:27.104916+00:00
---

# Open Exchange Rates

## Overview

This integration pulls data from [Open Exchange Rates](https://openexchangerates.org/).

#### Output schema

The integration provides one stream: `open_exchange_rates`.

Each stream record contains these fields:

- Record timestamp
- Base currency
- Conversion rates from the base currency to the target currency

#### Data types

Currencies use `number`, and the date uses `string`.

#### Features

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | Yes        |
| Namespaces                | No         |

### Get started

### Requirements

- App ID

### Setup guide

To get an `app_id`, go to the [this](https://docs.openexchangerates.org/reference/authentication) page and follow the required steps. After registering and signing in, you’ll see your `app_id`. You can also find it [here](https://openexchangerates.org/account).

If you have the `free` subscription plan, you’ll have two limitations. You can check your plan [here](https://openexchangerates.org/account/usage).

1. You can make 1000 API calls each month.
2. You can’t specify the `base` parameter. You can only use the default base value, USD.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                                                         |
| :------ | :--------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.3.13 | 2025-02-15 | [53979](https://github.com/airbytehq/airbyte/pull/53979) | Update dependencies |
| 0.3.12 | 2025-02-08 | [53469](https://github.com/airbytehq/airbyte/pull/53469) | Update dependencies |
| 0.3.11 | 2025-02-01 | [52968](https://github.com/airbytehq/airbyte/pull/52968) | Update dependencies |
| 0.3.10 | 2025-01-25 | [52530](https://github.com/airbytehq/airbyte/pull/52530) | Update dependencies |
| 0.3.9 | 2025-01-18 | [51866](https://github.com/airbytehq/airbyte/pull/51866) | Update dependencies |
| 0.3.8 | 2025-01-11 | [51364](https://github.com/airbytehq/airbyte/pull/51364) | Update dependencies |
| 0.3.7 | 2024-12-28 | [50673](https://github.com/airbytehq/airbyte/pull/50673) | Update dependencies |
| 0.3.6 | 2024-12-21 | [50301](https://github.com/airbytehq/airbyte/pull/50301) | Update dependencies |
| 0.3.5 | 2024-12-14 | [49678](https://github.com/airbytehq/airbyte/pull/49678) | Update dependencies |
| 0.3.4 | 2024-12-12 | [48251](https://github.com/airbytehq/airbyte/pull/48251) | Update dependencies |
| 0.3.3 | 2024-10-29 | [47805](https://github.com/airbytehq/airbyte/pull/47805) | Update dependencies |
| 0.3.2 | 2024-10-28 | [47452](https://github.com/airbytehq/airbyte/pull/47452) | Update dependencies |
| 0.3.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.3.0 | 2024-08-15 | [44108](https://github.com/airbytehq/airbyte/pull/44108) | Refactor connector to manifest-only format |
| 0.2.16 | 2024-08-10 | [43582](https://github.com/airbytehq/airbyte/pull/43582) | Update dependencies |
| 0.2.15 | 2024-08-03 | [43120](https://github.com/airbytehq/airbyte/pull/43120) | Update dependencies |
| 0.2.14 | 2024-07-27 | [42656](https://github.com/airbytehq/airbyte/pull/42656) | Update dependencies |
| 0.2.13 | 2024-07-20 | [42352](https://github.com/airbytehq/airbyte/pull/42352) | Update dependencies |
| 0.2.12 | 2024-07-13 | [41775](https://github.com/airbytehq/airbyte/pull/41775) | Update dependencies |
| 0.2.11 | 2024-07-10 | [41576](https://github.com/airbytehq/airbyte/pull/41576) | Update dependencies |
| 0.2.10 | 2024-07-09 | [41149](https://github.com/airbytehq/airbyte/pull/41149) | Update dependencies |
| 0.2.9 | 2024-07-06 | [40857](https://github.com/airbytehq/airbyte/pull/40857) | Update dependencies |
| 0.2.8 | 2024-06-25 | [40300](https://github.com/airbytehq/airbyte/pull/40300) | Update dependencies |
| 0.2.7 | 2024-06-21 | [39922](https://github.com/airbytehq/airbyte/pull/39922) | Update dependencies |
| 0.2.6 | 2024-06-04 | [39028](https://github.com/airbytehq/airbyte/pull/39028) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.5 | 2024-05-14 | [38141](https://github.com/airbytehq/airbyte/pull/38141) | Make connector compatable with builder |
| 0.2.4 | 2024-04-19 | [37208](https://github.com/airbytehq/airbyte/pull/37208) | Updating to 0.80.0 CDK |
| 0.2.3 | 2024-04-18 | [37208](https://github.com/airbytehq/airbyte/pull/37208) | Manage dependencies with Poetry. |
| 0.2.2 | 2024-04-15 | [37208](https://github.com/airbytehq/airbyte/pull/37208) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.2.1 | 2024-04-12 | [37208](https://github.com/airbytehq/airbyte/pull/37208) | schema descriptions |
| 0.2.0 | 2023-10-03 | [30983](https://github.com/airbytehq/airbyte/pull/30983) | Migrate to low code |
| 0.1.0   | 2022-11-15 | [19436](https://github.com/airbytehq/airbyte/issues/19436) | Created CDK native Open Exchange Rates connector                                |

</details>
