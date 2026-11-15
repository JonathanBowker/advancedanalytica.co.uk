---
generated_record: true
connector_name: Algolia
connector_type: source
connector_slug: algolia
connector_directory: source-algolia
definition_id: a20aa64a-bb59-4782-97bf-afd6a241c737
version: 0.0.59
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/algolia
logo: /images/connectors/sources/algolia.svg
logo_source_path: airbyte-integrations/connectors/source-algolia/icon.svg
logo_sha256: ed6169fb0a053b2c44e2f8b4289acd24589daa627ec601835cb20c0cf7a13280
original_metadata_path: airbyte-integrations/connectors/source-algolia/metadata.yaml
original_metadata_sha256: ab521cb3dc1ff069495bd82cd98f3d7ccc310855ff04bfd0d2e063c3ef84f59c
original_document_path: docs/integrations/sources/algolia.md
original_document_sha256: 0a6af4eaf5f772b0de4651bcebb04998fb81dce098c9854976a627448d3a762a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5db423f39995484f46eb612bc941fb65791b13e9c7c9931a2fbbe4973156879d
rewritten_at: 2026-11-12T13:28:53.933204+00:00
---

# Algolia
Use this page to set up the [Algolia](https://dashboard.algolia.com/) source connector and find reference information.

## API documentation
Visit `https://www.algolia.com/doc/rest-api/search/` for API documentation.

## Set up authentication
`Source-algolia` uses API keys and an application id for authentication.
Visit `https://dashboard.algolia.com/account/overview` to get your credentials and application id.
Visit `https://www.algolia.com/doc/rest-api/search/#section/Authentication` to learn more about authentication.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `application_id` | `string` | Application ID. The application ID for your application found in settings |  |
| `search_query` | `string` | Indexes Search query. Search query to be used with indexes_query stream with format defined in `https://www.algolia.com/doc/rest-api/search/#tag/Search/operation/searchSingleIndex` | hitsPerPage=2&amp;getRankingInfo=1 |
| `start_date` | `string` | Start date.  |  |
| `object_id` | `string` | Object ID. Object ID within index for search queries | ecommerce-sample-data-9999996 |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| indices | name | DefaultPaginator | ✅ |  ✅  |
| indexes_query |  | No pagination | ✅ |  ❌  |
| available_languages |  | No pagination | ✅ |  ❌  |
| logs | sha1 | No pagination | ✅ |  ✅  |
| indexes_settings |  | No pagination | ✅ |  ❌  |

## Allow IP addresses

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| ------------------ | ------------ | --- | ---------------- |
| 0.0.59 | 2026-11-10 | [91352](https://github.com/airbytehq/airbyte/pull/91352) | Update dependencies |
| 0.0.58 | 2026-11-03 | [90334](https://github.com/airbytehq/airbyte/pull/90334) | Simplify error handling without changing retry or rate-limit behavior. |
| 0.0.57 | 2026-11-03 | [90459](https://github.com/airbytehq/airbyte/pull/90459) | Update dependencies |
| 0.0.56 | 2026-10-27 | [89780](https://github.com/airbytehq/airbyte/pull/89780) | Update dependencies |
| 0.0.55 | 2026-10-20 | [89105](https://github.com/airbytehq/airbyte/pull/89105) | Update dependencies |
| 0.0.54 | 2026-10-13 | [88513](https://github.com/airbytehq/airbyte/pull/88513) | Update dependencies |
| 0.0.53 | 2026-10-06 | [87743](https://github.com/airbytehq/airbyte/pull/87743) | Update dependencies |
| 0.0.52 | 2026-09-29 | [87055](https://github.com/airbytehq/airbyte/pull/87055) | Update dependencies |
| 0.0.51 | 2026-09-22 | [86511](https://github.com/airbytehq/airbyte/pull/86511) | Update dependencies |
| 0.0.50 | 2026-09-15 | [85968](https://github.com/airbytehq/airbyte/pull/85968) | Update dependencies |
| 0.0.49 | 2026-09-08 | [84500](https://github.com/airbytehq/airbyte/pull/84500) | Update dependencies |
| 0.0.48 | 2026-08-11 | [83858](https://github.com/airbytehq/airbyte/pull/83858) | Update dependencies |
| 0.0.47 | 2026-08-04 | [83349](https://github.com/airbytehq/airbyte/pull/83349) | Update dependencies |
| 0.0.46 | 2026-07-28 | [82800](https://github.com/airbytehq/airbyte/pull/82800) | Update dependencies |
| 0.0.45 | 2026-07-21 | [82305](https://github.com/airbytehq/airbyte/pull/82305) | Update dependencies |
| 0.0.44 | 2026-07-14 | [81737](https://github.com/airbytehq/airbyte/pull/81737) | Update dependencies |
| 0.0.43 | 2026-06-30 | [80958](https://github.com/airbytehq/airbyte/pull/80958) | Update dependencies |
| 0.0.42 | 2026-06-23 | [80382](https://github.com/airbytehq/airbyte/pull/80382) | Update dependencies |
| 0.0.41 | 2026-06-16 | [79772](https://github.com/airbytehq/airbyte/pull/79772) | Update dependencies |
| 0.0.40 | 2026-06-09 | [79205](https://github.com/airbytehq/airbyte/pull/79205) | Update dependencies |
| 0.0.39 | 2026-06-02 | [78580](https://github.com/airbytehq/airbyte/pull/78580) | Update dependencies |
| 0.0.38 | 2026-04-28 | [77155](https://github.com/airbytehq/airbyte/pull/77155) | Update dependencies |
| 0.0.37 | 2026-04-21 | [76506](https://github.com/airbytehq/airbyte/pull/76506) | Update dependencies |
| 0.0.36 | 2026-03-17 | [74973](https://github.com/airbytehq/airbyte/pull/74973) | Update dependencies |
| 0.0.35 | 2026-02-10 | [72998](https://github.com/airbytehq/airbyte/pull/72998) | Update dependencies |
| 0.0.34 | 2025-12-19 | [70943](https://github.com/airbytehq/airbyte/pull/70943) | Update dependencies |
| 0.0.33 | 2025-12-02 | [70281](https://github.com/airbytehq/airbyte/pull/70281) | Update dependencies |
| 0.0.32 | 2025-10-29 | [69056](https://github.com/airbytehq/airbyte/pull/69056) | Update dependencies |
| 0.0.31 | 2025-09-30 | [65647](https://github.com/airbytehq/airbyte/pull/65647) | Update dependencies |
| 0.0.30 | 2025-07-26 | [63799](https://github.com/airbytehq/airbyte/pull/63799) | Update dependencies |
| 0.0.29 | 2025-07-19 | [63479](https://github.com/airbytehq/airbyte/pull/63479) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63073](https://github.com/airbytehq/airbyte/pull/63073) | Update dependencies |
| 0.0.27 | 2025-07-05 | [61630](https://github.com/airbytehq/airbyte/pull/61630) | Update dependencies |
| 0.0.26 | 2025-05-24 | [60643](https://github.com/airbytehq/airbyte/pull/60643) | Update dependencies |
| 0.0.25 | 2025-05-10 | [59889](https://github.com/airbytehq/airbyte/pull/59889) | Update dependencies |
| 0.0.24 | 2025-05-03 | [59339](https://github.com/airbytehq/airbyte/pull/59339) | Update dependencies |
| 0.0.23 | 2025-04-26 | [58744](https://github.com/airbytehq/airbyte/pull/58744) | Update dependencies |
| 0.0.22 | 2025-04-19 | [58237](https://github.com/airbytehq/airbyte/pull/58237) | Update dependencies |
| 0.0.21 | 2025-04-12 | [57629](https://github.com/airbytehq/airbyte/pull/57629) | Update dependencies |
| 0.0.20 | 2025-04-05 | [57122](https://github.com/airbytehq/airbyte/pull/57122) | Update dependencies |
| 0.0.19 | 2025-03-29 | [56565](https://github.com/airbytehq/airbyte/pull/56565) | Update dependencies |
| 0.0.18 | 2025-03-22 | [56118](https://github.com/airbytehq/airbyte/pull/56118) | Update dependencies |
| 0.0.17 | 2025-03-08 | [55411](https://github.com/airbytehq/airbyte/pull/55411) | Update dependencies |
| 0.0.16 | 2025-03-01 | [54856](https://github.com/airbytehq/airbyte/pull/54856) | Update dependencies |
| 0.0.15 | 2025-02-22 | [54224](https://github.com/airbytehq/airbyte/pull/54224) | Update dependencies |
| 0.0.14 | 2025-02-15 | [53913](https://github.com/airbytehq/airbyte/pull/53913) | Update dependencies |
| 0.0.13 | 2025-02-08 | [53391](https://github.com/airbytehq/airbyte/pull/53391) | Update dependencies |
| 0.0.12 | 2025-02-01 | [52932](https://github.com/airbytehq/airbyte/pull/52932) | Update dependencies |
| 0.0.11 | 2025-01-25 | [52207](https://github.com/airbytehq/airbyte/pull/52207) | Update dependencies |
| 0.0.10 | 2025-01-18 | [51773](https://github.com/airbytehq/airbyte/pull/51773) | Update dependencies |
| 0.0.9 | 2025-01-11 | [51225](https://github.com/airbytehq/airbyte/pull/51225) | Update dependencies |
| 0.0.8 | 2024-12-28 | [50499](https://github.com/airbytehq/airbyte/pull/50499) | Update dependencies |
| 0.0.7 | 2024-12-21 | [50177](https://github.com/airbytehq/airbyte/pull/50177) | Update dependencies |
| 0.0.6 | 2024-12-14 | [49560](https://github.com/airbytehq/airbyte/pull/49560) | Update dependencies |
| 0.0.5 | 2024-12-12 | [49308](https://github.com/airbytehq/airbyte/pull/49308) | Update dependencies |
| 0.0.4 | 2024-12-11 | [49027](https://github.com/airbytehq/airbyte/pull/49027) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.3 | 2024-11-04 | [48182](https://github.com/airbytehq/airbyte/pull/48182) | Update dependencies |
| 0.0.2 | 2024-10-29 | [47659](https://github.com/airbytehq/airbyte/pull/47659) | Update dependencies |
| 0.0.1 | 2024-09-16 | [45605](https://github.com/airbytehq/airbyte/pull/45605) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
