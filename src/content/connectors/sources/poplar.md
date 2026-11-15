---
generated_record: true
connector_name: Poplar
connector_type: source
connector_slug: poplar
connector_directory: source-poplar
definition_id: 2d9f2646-1e32-4336-abbe-7e5e113b479e
version: 0.0.58
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/poplar
logo: /images/connectors/sources/poplar.svg
logo_source_path: airbyte-integrations/connectors/source-poplar/icon.svg
logo_sha256: 99bf44b98919d70dbac2d4814e6070e7b967d6d40e91abe518d75ce884debb8b
original_metadata_path: airbyte-integrations/connectors/source-poplar/metadata.yaml
original_metadata_sha256: b98042bfde3a4b6c8c4bd5ff04825c9d7b0b72a2c24f515084265f5403523817
original_document_path: docs/integrations/sources/poplar.md
original_document_sha256: ea7189adcf15113c3fcfd45282eb446cd45244b845b820ba5daa3e918dabb815
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fcf7a4c971184858e292b05214bba4f101acdfd47e3fdb4c97fb2e1f9a089e84
rewritten_at: 2026-11-12T13:51:39.235107+00:00
---

# Poplar
Website: https://app.heypoplar.com/
Documentation: https://docs.heypoplar.com/api

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `access_token` | `string` | Access Token. Your Poplar API Access Token. Generate it from the [API Credentials page](https://app.heypoplar.com/credentials) in your account. Use a production token for live data or a test token for testing purposes. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| campaigns | id | No pagination | ✅ |  ❌  |
| creatives |  | No pagination | ✅ |  ❌  |
| audiences | id | No pagination | ✅ |  ❌  |
| me | id | No pagination | ✅ |  ❌  |
| mailings | id | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.58 | 2026-11-10 | [91674](https://github.com/airbytehq/airbyte/pull/91674) | Update dependencies |
| 0.0.57 | 2026-11-03 | [90681](https://github.com/airbytehq/airbyte/pull/90681) | Update dependencies |
| 0.0.56 | 2026-10-27 | [90034](https://github.com/airbytehq/airbyte/pull/90034) | Update dependencies |
| 0.0.55 | 2026-10-20 | [89331](https://github.com/airbytehq/airbyte/pull/89331) | Update dependencies |
| 0.0.54 | 2026-10-13 | [88751](https://github.com/airbytehq/airbyte/pull/88751) | Update dependencies |
| 0.0.53 | 2026-10-07 | [88195](https://github.com/airbytehq/airbyte/pull/88195) | Fix rate-limit (HTTP 429) failures: back off using the `ratelimit-reset` header, raise retries from 1 to 10, and fetch `mailings` 100 per page (API maximum) instead of 5 |
| 0.0.52 | 2026-10-06 | [87994](https://github.com/airbytehq/airbyte/pull/87994) | Update dependencies |
| 0.0.51 | 2026-09-29 | [87305](https://github.com/airbytehq/airbyte/pull/87305) | Update dependencies |
| 0.0.50 | 2026-09-22 | [86744](https://github.com/airbytehq/airbyte/pull/86744) | Update dependencies |
| 0.0.49 | 2026-09-15 | [86162](https://github.com/airbytehq/airbyte/pull/86162) | Update dependencies |
| 0.0.48 | 2026-09-08 | [85621](https://github.com/airbytehq/airbyte/pull/85621) | Update dependencies |
| 0.0.47 | 2026-08-18 | [84076](https://github.com/airbytehq/airbyte/pull/84076) | Update dependencies |
| 0.0.46 | 2026-08-04 | [83581](https://github.com/airbytehq/airbyte/pull/83581) | Update dependencies |
| 0.0.45 | 2026-07-28 | [83054](https://github.com/airbytehq/airbyte/pull/83054) | Update dependencies |
| 0.0.44 | 2026-07-21 | [82542](https://github.com/airbytehq/airbyte/pull/82542) | Update dependencies |
| 0.0.43 | 2026-07-14 | [81957](https://github.com/airbytehq/airbyte/pull/81957) | Update dependencies |
| 0.0.42 | 2026-06-30 | [81205](https://github.com/airbytehq/airbyte/pull/81205) | Update dependencies |
| 0.0.41 | 2026-06-23 | [80573](https://github.com/airbytehq/airbyte/pull/80573) | Update dependencies |
| 0.0.40 | 2026-06-16 | [79978](https://github.com/airbytehq/airbyte/pull/79978) | Update dependencies |
| 0.0.39 | 2026-06-09 | [79453](https://github.com/airbytehq/airbyte/pull/79453) | Update dependencies |
| 0.0.38 | 2026-06-02 | [78882](https://github.com/airbytehq/airbyte/pull/78882) | Update dependencies |
| 0.0.37 | 2026-04-28 | [77393](https://github.com/airbytehq/airbyte/pull/77393) | Update dependencies |
| 0.0.36 | 2026-04-21 | [76694](https://github.com/airbytehq/airbyte/pull/76694) | Update dependencies |
| 0.0.35 | 2026-03-31 | [75869](https://github.com/airbytehq/airbyte/pull/75869) | Update dependencies |
| 0.0.34 | 2026-03-17 | [74932](https://github.com/airbytehq/airbyte/pull/74932) | Update dependencies |
| 0.0.33 | 2026-03-10 | [74643](https://github.com/airbytehq/airbyte/pull/74643) | Update dependencies |
| 0.0.32 | 2026-02-24 | [73844](https://github.com/airbytehq/airbyte/pull/73844) | Update dependencies |
| 0.0.31 | 2026-02-17 | [73517](https://github.com/airbytehq/airbyte/pull/73517) | Update dependencies |
| 0.0.30 | 2026-02-03 | [72666](https://github.com/airbytehq/airbyte/pull/72666) | Update dependencies |
| 0.0.29 | 2026-01-20 | [72180](https://github.com/airbytehq/airbyte/pull/72180) | Update dependencies |
| 0.0.28 | 2026-01-14 | [71561](https://github.com/airbytehq/airbyte/pull/71561) | Update dependencies |
| 0.0.27 | 2025-12-18 | [70529](https://github.com/airbytehq/airbyte/pull/70529) | Update dependencies |
| 0.0.26 | 2025-11-25 | [69951](https://github.com/airbytehq/airbyte/pull/69951) | Update dependencies |
| 0.0.25 | 2025-11-18 | [69632](https://github.com/airbytehq/airbyte/pull/69632) | Update dependencies |
| 0.0.24 | 2025-10-29 | [68947](https://github.com/airbytehq/airbyte/pull/68947) | Update dependencies |
| 0.0.23 | 2025-10-21 | [68224](https://github.com/airbytehq/airbyte/pull/68224) | Update dependencies |
| 0.0.22 | 2025-10-14 | [67820](https://github.com/airbytehq/airbyte/pull/67820) | Update dependencies |
| 0.0.21 | 2025-10-07 | [67492](https://github.com/airbytehq/airbyte/pull/67492) | Update dependencies |
| 0.0.20 | 2025-10-01 | [66968](https://github.com/airbytehq/airbyte/pull/66968) | Update dependencies |
| 0.0.19 | 2025-09-23 | [66422](https://github.com/airbytehq/airbyte/pull/66422) | Update dependencies |
| 0.0.18 | 2025-09-10 | [65794](https://github.com/airbytehq/airbyte/pull/65794) | Update dependencies |
| 0.0.17 | 2025-08-23 | [65229](https://github.com/airbytehq/airbyte/pull/65229) | Update dependencies |
| 0.0.16 | 2025-08-09 | [64762](https://github.com/airbytehq/airbyte/pull/64762) | Update dependencies |
| 0.0.15 | 2025-08-02 | [64201](https://github.com/airbytehq/airbyte/pull/64201) | Update dependencies |
| 0.0.14 | 2025-07-26 | [63921](https://github.com/airbytehq/airbyte/pull/63921) | Update dependencies |
| 0.0.13 | 2025-07-19 | [63406](https://github.com/airbytehq/airbyte/pull/63406) | Update dependencies |
| 0.0.12 | 2025-07-12 | [63233](https://github.com/airbytehq/airbyte/pull/63233) | Update dependencies |
| 0.0.11 | 2025-07-05 | [62593](https://github.com/airbytehq/airbyte/pull/62593) | Update dependencies |
| 0.0.10 | 2025-06-28 | [62400](https://github.com/airbytehq/airbyte/pull/62400) | Update dependencies |
| 0.0.9 | 2025-06-21 | [61899](https://github.com/airbytehq/airbyte/pull/61899) | Update dependencies |
| 0.0.8 | 2025-06-14 | [60546](https://github.com/airbytehq/airbyte/pull/60546) | Update dependencies |
| 0.0.7 | 2025-05-10 | [60110](https://github.com/airbytehq/airbyte/pull/60110) | Update dependencies |
| 0.0.6 | 2025-05-04 | [59522](https://github.com/airbytehq/airbyte/pull/59522) | Update dependencies |
| 0.0.5 | 2025-04-27 | [59048](https://github.com/airbytehq/airbyte/pull/59048) | Update dependencies |
| 0.0.4 | 2025-04-19 | [58469](https://github.com/airbytehq/airbyte/pull/58469) | Update dependencies |
| 0.0.3 | 2025-04-12 | [57910](https://github.com/airbytehq/airbyte/pull/57910) | Update dependencies |
| 0.0.2 | 2025-04-05 | [57291](https://github.com/airbytehq/airbyte/pull/57291) | Update dependencies |
| 0.0.1 | 2025-03-31 | | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
