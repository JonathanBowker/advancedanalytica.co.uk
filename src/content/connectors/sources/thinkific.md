---
generated_record: true
connector_name: Thinkific
connector_type: source
connector_slug: thinkific
connector_directory: source-thinkific
definition_id: 80e5803c-7013-4ecc-a3b1-2344ce43e054
version: 0.0.57
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/thinkific
logo: /images/connectors/sources/thinkific.svg
logo_source_path: airbyte-integrations/connectors/source-thinkific/icon.svg
logo_sha256: c5ebd24342b1419e3d74ce1ffdc59b59ed95a7d06c2596477f7053098c8f65b9
original_metadata_path: airbyte-integrations/connectors/source-thinkific/metadata.yaml
original_metadata_sha256: 519d87eeb75bb8c7e07bf63ac65fa77d24ef1d5f3ee6b4ce6f62c9c6812a2048
original_document_path: docs/integrations/sources/thinkific.md
original_document_sha256: 6f800f4ac1a7867a54b57f7703c52775fe30d94ecaf4cf242534516e84ab1414
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a3302e52054883a968ed67125b4fdfae8f21eb1e6b7834d1bf28dc028e8eadea
rewritten_at: 2026-11-12T13:58:16.096699+00:00
---

# Thinkific
Sync users, course participants and instructors from Thinkific to other platforms with this Airbyte connector. It makes managing and analysing your online courses and communities easier.

## Configure Thinkific

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. Your Thinkific API key for authentication. |  |
| `subdomain` | `string` | subdomain. The subdomain of your Thinkific URL (e.g., if your URL is example.thinkific.com, your subdomain is "example". |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| courses | id | DefaultPaginator | ✅ |  ❌  |
| users | id | DefaultPaginator | ✅ |  ❌  |
| promotions | id | DefaultPaginator | ✅ |  ❌  |
| categories | id | DefaultPaginator | ✅ |  ❌  |
| reviews | id | DefaultPaginator | ✅ |  ❌  |
| enrollments | id | DefaultPaginator | ✅ |  ❌  |
| groups | id | DefaultPaginator | ✅ |  ❌  |
| instructors | id | DefaultPaginator | ✅ |  ❌  |
| orders | id | DefaultPaginator | ✅ |  ❌  |
| products | id | DefaultPaginator | ✅ |  ❌  |
| coupons | id | DefaultPaginator | ✅ |  ❌  |

## Allow specific IPs

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.57 | 2026-11-10 | [91759](https://github.com/airbytehq/airbyte/pull/91759) | Update dependencies |
| 0.0.56 | 2026-11-03 | [90769](https://github.com/airbytehq/airbyte/pull/90769) | Update dependencies |
| 0.0.55 | 2026-10-20 | [89452](https://github.com/airbytehq/airbyte/pull/89452) | Update dependencies |
| 0.0.54 | 2026-10-13 | [88818](https://github.com/airbytehq/airbyte/pull/88818) | Update dependencies |
| 0.0.53 | 2026-10-06 | [88047](https://github.com/airbytehq/airbyte/pull/88047) | Update dependencies |
| 0.0.52 | 2026-09-29 | [87394](https://github.com/airbytehq/airbyte/pull/87394) | Update dependencies |
| 0.0.51 | 2026-09-22 | [86856](https://github.com/airbytehq/airbyte/pull/86856) | Update dependencies |
| 0.0.50 | 2026-09-15 | [86242](https://github.com/airbytehq/airbyte/pull/86242) | Update dependencies |
| 0.0.49 | 2026-09-08 | [85671](https://github.com/airbytehq/airbyte/pull/85671) | Update dependencies |
| 0.0.48 | 2026-08-18 | [84788](https://github.com/airbytehq/airbyte/pull/84788) | Update dependencies |
| 0.0.47 | 2026-08-11 | [84142](https://github.com/airbytehq/airbyte/pull/84142) | Update dependencies |
| 0.0.46 | 2026-08-04 | [83632](https://github.com/airbytehq/airbyte/pull/83632) | Update dependencies |
| 0.0.45 | 2026-07-28 | [83120](https://github.com/airbytehq/airbyte/pull/83120) | Update dependencies |
| 0.0.44 | 2026-07-21 | [82635](https://github.com/airbytehq/airbyte/pull/82635) | Update dependencies |
| 0.0.43 | 2026-07-14 | [82046](https://github.com/airbytehq/airbyte/pull/82046) | Update dependencies |
| 0.0.42 | 2026-06-30 | [81298](https://github.com/airbytehq/airbyte/pull/81298) | Update dependencies |
| 0.0.41 | 2026-06-23 | [80695](https://github.com/airbytehq/airbyte/pull/80695) | Update dependencies |
| 0.0.40 | 2026-06-16 | [80060](https://github.com/airbytehq/airbyte/pull/80060) | Update dependencies |
| 0.0.39 | 2026-06-09 | [79548](https://github.com/airbytehq/airbyte/pull/79548) | Update dependencies |
| 0.0.38 | 2026-06-02 | [79051](https://github.com/airbytehq/airbyte/pull/79051) | Update dependencies |
| 0.0.37 | 2026-04-28 | [77419](https://github.com/airbytehq/airbyte/pull/77419) | Update dependencies |
| 0.0.36 | 2026-04-21 | [76791](https://github.com/airbytehq/airbyte/pull/76791) | Update dependencies |
| 0.0.35 | 2026-03-10 | [74545](https://github.com/airbytehq/airbyte/pull/74545) | Update dependencies |
| 0.0.34 | 2026-02-24 | [73843](https://github.com/airbytehq/airbyte/pull/73843) | Update dependencies |
| 0.0.33 | 2026-01-20 | [72141](https://github.com/airbytehq/airbyte/pull/72141) | Update dependencies |
| 0.0.32 | 2026-01-14 | [71573](https://github.com/airbytehq/airbyte/pull/71573) | Update dependencies |
| 0.0.31 | 2025-12-18 | [70739](https://github.com/airbytehq/airbyte/pull/70739) | Update dependencies |
| 0.0.30 | 2025-12-02 | [70285](https://github.com/airbytehq/airbyte/pull/70285) | Update dependencies |
| 0.0.29 | 2025-11-18 | [69526](https://github.com/airbytehq/airbyte/pull/69526) | Update dependencies |
| 0.0.28 | 2025-10-29 | [68997](https://github.com/airbytehq/airbyte/pull/68997) | Update dependencies |
| 0.0.27 | 2025-10-07 | [67459](https://github.com/airbytehq/airbyte/pull/67459) | Update dependencies |
| 0.0.26 | 2025-09-30 | [66890](https://github.com/airbytehq/airbyte/pull/66890) | Update dependencies |
| 0.0.25 | 2025-08-24 | [65406](https://github.com/airbytehq/airbyte/pull/65406) | Update dependencies |
| 0.0.24 | 2025-08-16 | [64993](https://github.com/airbytehq/airbyte/pull/64993) | Update dependencies |
| 0.0.23 | 2025-07-26 | [63994](https://github.com/airbytehq/airbyte/pull/63994) | Update dependencies |
| 0.0.22 | 2025-07-05 | [62713](https://github.com/airbytehq/airbyte/pull/62713) | Update dependencies |
| 0.0.21 | 2025-05-24 | [60474](https://github.com/airbytehq/airbyte/pull/60474) | Update dependencies |
| 0.0.20 | 2025-05-10 | [60124](https://github.com/airbytehq/airbyte/pull/60124) | Update dependencies |
| 0.0.19 | 2025-05-04 | [59570](https://github.com/airbytehq/airbyte/pull/59570) | Update dependencies |
| 0.0.18 | 2025-04-12 | [57967](https://github.com/airbytehq/airbyte/pull/57967) | Update dependencies |
| 0.0.17 | 2025-03-22 | [56271](https://github.com/airbytehq/airbyte/pull/56271) | Update dependencies |
| 0.0.16 | 2025-03-08 | [55579](https://github.com/airbytehq/airbyte/pull/55579) | Update dependencies |
| 0.0.15 | 2025-03-01 | [55087](https://github.com/airbytehq/airbyte/pull/55087) | Update dependencies |
| 0.0.14 | 2025-02-22 | [54536](https://github.com/airbytehq/airbyte/pull/54536) | Update dependencies |
| 0.0.13 | 2025-02-15 | [54048](https://github.com/airbytehq/airbyte/pull/54048) | Update dependencies |
| 0.0.12 | 2025-02-08 | [53580](https://github.com/airbytehq/airbyte/pull/53580) | Update dependencies |
| 0.0.11 | 2025-02-01 | [53038](https://github.com/airbytehq/airbyte/pull/53038) | Update dependencies |
| 0.0.10 | 2025-01-25 | [52416](https://github.com/airbytehq/airbyte/pull/52416) | Update dependencies |
| 0.0.9 | 2025-01-18 | [51962](https://github.com/airbytehq/airbyte/pull/51962) | Update dependencies |
| 0.0.8 | 2025-01-11 | [51452](https://github.com/airbytehq/airbyte/pull/51452) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50799](https://github.com/airbytehq/airbyte/pull/50799) | Update dependencies |
| 0.0.6 | 2024-12-21 | [50338](https://github.com/airbytehq/airbyte/pull/50338) | Update dependencies |
| 0.0.5 | 2024-12-14 | [49798](https://github.com/airbytehq/airbyte/pull/49798) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49377](https://github.com/airbytehq/airbyte/pull/49377) | Update dependencies |
| 0.0.3 | 2024-11-04 | [48142](https://github.com/airbytehq/airbyte/pull/48142) | Update dependencies |
| 0.0.2 | 2024-10-29 | [47525](https://github.com/airbytehq/airbyte/pull/47525) | Update dependencies |
| 0.0.1 | 2024-10-07 | | Initial release by [@parthiv11](https://github.com/parthiv11) via Connector Builder |

</details>
