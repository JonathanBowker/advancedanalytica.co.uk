---
generated_record: true
connector_name: Zoho Billing
connector_type: source
connector_slug: zoho-billing
connector_directory: source-zoho-billing
definition_id: cd0c7d19-6189-4ed2-9c9f-663d1bea7789
version: 0.0.70
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/zoho-billing
logo: /images/connectors/sources/zoho-billing.svg
logo_source_path: airbyte-integrations/connectors/source-zoho-billing/icon.svg
logo_sha256: 27fd4cdd9aebe53c53c65f37301185e00e35ff02696b2464240ee15358d4ebe1
original_metadata_path: airbyte-integrations/connectors/source-zoho-billing/metadata.yaml
original_metadata_sha256: 96add02684dd7042fd6a51906b52b58c9c640836956df4b8f8574725ba8a7eaf
original_document_path: docs/integrations/sources/zoho-billing.md
original_document_sha256: 8cb0b6363ab40e5078d402a0998f4c7db2200f5326d42b38e065f66107c8bcad
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 72397242ddc7c9e1f3fe5746093226ec2de21f9df24a62819310c095c8dd52ef
rewritten_at: 2026-11-12T14:02:02.654387+00:00
---

# Zoho Billing
Zoho Billing is billing software used by businesses worldwide.
This connector extracts data from streams including products, invoices, transactions and quotes.
Docs: https://www.zoho.com/billing/api/v1/introduction/#overview

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `region` | `string` | Region.  |  |
| `client_id` | `string` | OAuth Client ID.  |  |
| `client_secret` | `string` | OAuth Client Secret.  |  |
| `refresh_token` | `string` | OAuth Refresh Token.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| Products | product_id | DefaultPaginator | ✅ |  ❌  |
| plans | plan_code | DefaultPaginator | ✅ |  ❌  |
| addons | addon_code | DefaultPaginator | ✅ |  ❌  |
| coupons | coupon_code | DefaultPaginator | ✅ |  ❌  |
| customers | customer_id | DefaultPaginator | ✅ |  ❌  |
| Quotes | estimate_id | DefaultPaginator | ✅ |  ❌  |
| invoices | invoice_id | DefaultPaginator | ✅ |  ❌  |
| expenses | expense_id | DefaultPaginator | ✅ |  ❌  |
| subscriptions | customer_id | DefaultPaginator | ✅ |  ❌  |
| taxes | tax_id | DefaultPaginator | ✅ |  ❌  |
| transactions | transaction_id | DefaultPaginator | ✅ |  ❌  |
| recurring expenses | recurring_expense_id | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.70 | 2026-11-10 | [91786](https://github.com/airbytehq/airbyte/pull/91786) | Update dependencies |
| 0.0.69 | 2026-11-03 | [90821](https://github.com/airbytehq/airbyte/pull/90821) | Update dependencies |
| 0.0.68 | 2026-10-27 | [90074](https://github.com/airbytehq/airbyte/pull/90074) | Update dependencies |
| 0.0.67 | 2026-10-20 | [89471](https://github.com/airbytehq/airbyte/pull/89471) | Update dependencies |
| 0.0.66 | 2026-10-13 | [88889](https://github.com/airbytehq/airbyte/pull/88889) | Update dependencies |
| 0.0.65 | 2026-10-06 | [88093](https://github.com/airbytehq/airbyte/pull/88093) | Update dependencies |
| 0.0.64 | 2026-09-29 | [87408](https://github.com/airbytehq/airbyte/pull/87408) | Update dependencies |
| 0.0.63 | 2026-09-22 | [86862](https://github.com/airbytehq/airbyte/pull/86862) | Update dependencies |
| 0.0.62 | 2026-09-15 | [86300](https://github.com/airbytehq/airbyte/pull/86300) | Update dependencies |
| 0.0.61 | 2026-09-08 | [85737](https://github.com/airbytehq/airbyte/pull/85737) | Update dependencies |
| 0.0.60 | 2026-08-18 | [84821](https://github.com/airbytehq/airbyte/pull/84821) | Update dependencies |
| 0.0.59 | 2026-08-11 | [84168](https://github.com/airbytehq/airbyte/pull/84168) | Update dependencies |
| 0.0.58 | 2026-08-04 | [83674](https://github.com/airbytehq/airbyte/pull/83674) | Update dependencies |
| 0.0.57 | 2026-07-28 | [83172](https://github.com/airbytehq/airbyte/pull/83172) | Update dependencies |
| 0.0.56 | 2026-07-21 | [82662](https://github.com/airbytehq/airbyte/pull/82662) | Update dependencies |
| 0.0.55 | 2026-07-14 | [82089](https://github.com/airbytehq/airbyte/pull/82089) | Update dependencies |
| 0.0.54 | 2026-06-30 | [81316](https://github.com/airbytehq/airbyte/pull/81316) | Update dependencies |
| 0.0.53 | 2026-06-23 | [80721](https://github.com/airbytehq/airbyte/pull/80721) | Update dependencies |
| 0.0.52 | 2026-06-16 | [80115](https://github.com/airbytehq/airbyte/pull/80115) | Update dependencies |
| 0.0.51 | 2026-06-09 | [79584](https://github.com/airbytehq/airbyte/pull/79584) | Update dependencies |
| 0.0.50 | 2026-06-02 | [79075](https://github.com/airbytehq/airbyte/pull/79075) | Update dependencies |
| 0.0.49 | 2026-04-28 | [77506](https://github.com/airbytehq/airbyte/pull/77506) | Update dependencies |
| 0.0.48 | 2026-04-21 | [76810](https://github.com/airbytehq/airbyte/pull/76810) | Update dependencies |
| 0.0.47 | 2026-03-31 | [75833](https://github.com/airbytehq/airbyte/pull/75833) | Update dependencies |
| 0.0.46 | 2026-03-24 | [74466](https://github.com/airbytehq/airbyte/pull/74466) | Update dependencies |
| 0.0.45 | 2026-02-24 | [73987](https://github.com/airbytehq/airbyte/pull/73987) | Update dependencies |
| 0.0.44 | 2026-02-17 | [73590](https://github.com/airbytehq/airbyte/pull/73590) | Update dependencies |
| 0.0.43 | 2026-02-10 | [73219](https://github.com/airbytehq/airbyte/pull/73219) | Update dependencies |
| 0.0.42 | 2026-02-03 | [72620](https://github.com/airbytehq/airbyte/pull/72620) | Update dependencies |
| 0.0.41 | 2026-01-20 | [72046](https://github.com/airbytehq/airbyte/pull/72046) | Update dependencies |
| 0.0.40 | 2026-01-14 | [71710](https://github.com/airbytehq/airbyte/pull/71710) | Update dependencies |
| 0.0.39 | 2025-12-18 | [70706](https://github.com/airbytehq/airbyte/pull/70706) | Update dependencies |
| 0.0.38 | 2025-11-25 | [70069](https://github.com/airbytehq/airbyte/pull/70069) | Update dependencies |
| 0.0.37 | 2025-11-18 | [69572](https://github.com/airbytehq/airbyte/pull/69572) | Update dependencies |
| 0.0.36 | 2025-10-29 | [68967](https://github.com/airbytehq/airbyte/pull/68967) | Update dependencies |
| 0.0.35 | 2025-10-21 | [68459](https://github.com/airbytehq/airbyte/pull/68459) | Update dependencies |
| 0.0.34 | 2025-10-14 | [67992](https://github.com/airbytehq/airbyte/pull/67992) | Update dependencies |
| 0.0.33 | 2025-10-07 | [67242](https://github.com/airbytehq/airbyte/pull/67242) | Update dependencies |
| 0.0.32 | 2025-09-30 | [66844](https://github.com/airbytehq/airbyte/pull/66844) | Update dependencies |
| 0.0.31 | 2025-09-24 | [66476](https://github.com/airbytehq/airbyte/pull/66476) | Update dependencies |
| 0.0.30 | 2025-09-09 | [65663](https://github.com/airbytehq/airbyte/pull/65663) | Update dependencies |
| 0.0.29 | 2025-08-24 | [65477](https://github.com/airbytehq/airbyte/pull/65477) | Update dependencies |
| 0.0.28 | 2025-08-10 | [64821](https://github.com/airbytehq/airbyte/pull/64821) | Update dependencies |
| 0.0.27 | 2025-08-02 | [64389](https://github.com/airbytehq/airbyte/pull/64389) | Update dependencies |
| 0.0.26 | 2025-07-26 | [64076](https://github.com/airbytehq/airbyte/pull/64076) | Update dependencies |
| 0.0.25 | 2025-07-20 | [63653](https://github.com/airbytehq/airbyte/pull/63653) | Update dependencies |
| 0.0.24 | 2025-07-12 | [63187](https://github.com/airbytehq/airbyte/pull/63187) | Update dependencies |
| 0.0.23 | 2025-07-05 | [62706](https://github.com/airbytehq/airbyte/pull/62706) | Update dependencies |
| 0.0.22 | 2025-06-28 | [62255](https://github.com/airbytehq/airbyte/pull/62255) | Update dependencies |
| 0.0.21 | 2025-06-21 | [61776](https://github.com/airbytehq/airbyte/pull/61776) | Update dependencies |
| 0.0.20 | 2025-06-15 | [61193](https://github.com/airbytehq/airbyte/pull/61193) | Update dependencies |
| 0.0.19 | 2025-05-24 | [59984](https://github.com/airbytehq/airbyte/pull/59984) | Update dependencies |
| 0.0.18 | 2025-05-04 | [58954](https://github.com/airbytehq/airbyte/pull/58954) | Update dependencies |
| 0.0.17 | 2025-04-19 | [58539](https://github.com/airbytehq/airbyte/pull/58539) | Update dependencies |
| 0.0.16 | 2025-04-13 | [58046](https://github.com/airbytehq/airbyte/pull/58046) | Update dependencies |
| 0.0.15 | 2025-04-05 | [57372](https://github.com/airbytehq/airbyte/pull/57372) | Update dependencies |
| 0.0.14 | 2025-03-29 | [56837](https://github.com/airbytehq/airbyte/pull/56837) | Update dependencies |
| 0.0.13 | 2025-03-22 | [56331](https://github.com/airbytehq/airbyte/pull/56331) | Update dependencies |
| 0.0.12 | 2025-03-09 | [55654](https://github.com/airbytehq/airbyte/pull/55654) | Update dependencies |
| 0.0.11 | 2025-03-01 | [54639](https://github.com/airbytehq/airbyte/pull/54639) | Update dependencies |
| 0.0.10 | 2025-02-15 | [54114](https://github.com/airbytehq/airbyte/pull/54114) | Update dependencies |
| 0.0.9 | 2025-02-08 | [53590](https://github.com/airbytehq/airbyte/pull/53590) | Update dependencies |
| 0.0.8 | 2025-02-01 | [53119](https://github.com/airbytehq/airbyte/pull/53119) | Update dependencies |
| 0.0.7 | 2025-01-25 | [52553](https://github.com/airbytehq/airbyte/pull/52553) | Update dependencies |
| 0.0.6 | 2025-01-18 | [51933](https://github.com/airbytehq/airbyte/pull/51933) | Update dependencies |
| 0.0.5 | 2025-01-11 | [51468](https://github.com/airbytehq/airbyte/pull/51468) | Update dependencies |
| 0.0.4 | 2024-12-28 | [50836](https://github.com/airbytehq/airbyte/pull/50836) | Update dependencies |
| 0.0.3 | 2024-12-21 | [50392](https://github.com/airbytehq/airbyte/pull/50392) | Update dependencies |
| 0.0.2 | 2024-12-14 | [49451](https://github.com/airbytehq/airbyte/pull/49451) | Update dependencies |
| 0.0.1 | 2024-11-05 | | Initial release by [@ombhardwajj](https://github.com/ombhardwajj) via Connector Builder |

</details>
