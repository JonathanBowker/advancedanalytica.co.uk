---
generated_record: true
connector_name: Dolibarr
connector_type: source
connector_slug: dolibarr
connector_directory: source-dolibarr
definition_id: 10c2652f-00cf-421a-bd16-7758357e5d99
version: 1.0.40
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/dolibarr
logo: /images/connectors/sources/dolibarr.svg
logo_source_path: airbyte-integrations/connectors/source-dolibarr/icon.svg
logo_sha256: a57e6ecc5b7d688318abeed86018366499a80b60dbaaab6df798b93568c12e5a
original_metadata_path: airbyte-integrations/connectors/source-dolibarr/metadata.yaml
original_metadata_sha256: 4987d6fa25f5d3625a6c6b91f88a404eadc8219f18caa516c0d746a68ce9a4f9
original_document_path: docs/integrations/sources/dolibarr.md
original_document_sha256: bb7d615cd06a8112795e07f693d9c3dd4d7089be19857df1c4b3455ece508132
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ee01683702eb0f6a86eab49a38179fdee7f919c3b990154bde9d81cb7f958c44
rewritten_at: 2026-11-12T13:35:17.273844+00:00
---

# Dolibarr

Connect to the Dolibarr ERP/CRM REST API for GET operations.

## Prerequisites
- You need a Dolibarr installation in Cloud SaaS, on-premises, web hosting or a cPanel server.
- Identify your public Dolibarr URL. You'll need it to configure the connector.
- Configure your company data under Setup menu - Configure your company/organization: [Dolibarr documentation Wiki](https://wiki.dolibarr.org/index.php?title=First_setup#Company.2FOrganization)
- Enable and configure the Module Web Services API REST (developer) in the module setup menu.
- Enable the Dolibarr ERP/CRM modules you want to access through the REST API endpoints.
- Create a Dolibarr user for API Key access.
- Give this user permission to "read" the modules for the REST API endpoints used by your streams.
- Some streams or endpoints need extra permissions. For example, GET company information requires administrator or read/write permissions to work correctly.
- Open the setup/modify menu for this user and generate the API Key.
- This API Key differs from the user password. You'll need it to configure the connector.
- Your connector is now ready to use.
- For more information about using and configuring your Dolibarr connection, review this guide: [Integration of Dolibarr to the Airbyte data integration platform](https://wiki.dolibarr.org/index.php?title=Integration_of_Dolibarr_to_the_Airbyte_data_integration_platform)

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `my_dolibarr_domain_url` | `string` | `my_dolibarr_domain/url`. Enter your `domain/dolibarr_url` without `https://` Example: `mydomain.com/dolibarr` |  |
| `start_date` | `date` | Earliest start date of synchronization in source data in format `YYYY-MM-DDTHH:mm:ssZ` Enter the earliest modification date of data you want to incrementally synchronize |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| Products list | product_id | DefaultPaginator | ✅ |  ✅  |
| Products category id list |  | No pagination | ✅ |  ❌  |
| Product categories list | category_id | DefaultPaginator | ✅ |  ✅  |
| Customer invoices list | invoice_id | DefaultPaginator | ✅ |  ✅  |
| Customer invoices lines list |  | No pagination | ✅ |  ❌  |
| Customers list | customer_id | DefaultPaginator | ✅ |  ✅  |
| Supplier invoices list | supp_invoice_id | DefaultPaginator | ✅ |  ✅  |
| Supplier invoices lines list |  | No pagination | ✅ |  ❌  |
| Suppliers list | supplier_id | DefaultPaginator | ✅ |  ✅  |
| Internal Users | user_id | DefaultPaginator | ✅ |  ✅  |
| Company profile data |  | No pagination | ✅ |  ❌  |
| Customer invoices payments list | ref | No pagination | ✅ |  ❌  |
| Supplier invoices payments list | ref | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 1.0.40 | 2026-11-10 | [91488](https://github.com/airbytehq/airbyte/pull/91488) | Update dependencies |
| 1.0.39 | 2026-11-03 | [90495](https://github.com/airbytehq/airbyte/pull/90495) | Update dependencies |
| 1.0.38 | 2026-10-27 | [89838](https://github.com/airbytehq/airbyte/pull/89838) | Update dependencies |
| 1.0.37 | 2026-10-20 | [89175](https://github.com/airbytehq/airbyte/pull/89175) | Update dependencies |
| 1.0.36 | 2026-10-13 | [88577](https://github.com/airbytehq/airbyte/pull/88577) | Update dependencies |
| 1.0.35 | 2026-10-06 | [87814](https://github.com/airbytehq/airbyte/pull/87814) | Update dependencies |
| 1.0.34 | 2026-09-29 | [87123](https://github.com/airbytehq/airbyte/pull/87123) | Update dependencies |
| 1.0.33 | 2026-09-22 | [86560](https://github.com/airbytehq/airbyte/pull/86560) | Update dependencies |
| 1.0.32 | 2026-09-15 | [86017](https://github.com/airbytehq/airbyte/pull/86017) | Update dependencies |
| 1.0.31 | 2026-09-08 | [85446](https://github.com/airbytehq/airbyte/pull/85446) | Update dependencies |
| 1.0.30 | 2026-08-18 | [84531](https://github.com/airbytehq/airbyte/pull/84531) | Update dependencies |
| 1.0.29 | 2026-08-11 | [83898](https://github.com/airbytehq/airbyte/pull/83898) | Update dependencies |
| 1.0.28 | 2026-08-04 | [83421](https://github.com/airbytehq/airbyte/pull/83421) | Update dependencies |
| 1.0.27 | 2026-07-28 | [82881](https://github.com/airbytehq/airbyte/pull/82881) | Update dependencies |
| 1.0.26 | 2026-07-21 | [82366](https://github.com/airbytehq/airbyte/pull/82366) | Update dependencies |
| 1.0.25 | 2026-07-14 | [81758](https://github.com/airbytehq/airbyte/pull/81758) | Update dependencies |
| 1.0.24 | 2026-06-30 | [81009](https://github.com/airbytehq/airbyte/pull/81009) | Update dependencies |
| 1.0.23 | 2026-06-23 | [80391](https://github.com/airbytehq/airbyte/pull/80391) | Update dependencies |
| 1.0.22 | 2026-06-16 | [79823](https://github.com/airbytehq/airbyte/pull/79823) | Update dependencies |
| 1.0.21 | 2026-06-09 | [79263](https://github.com/airbytehq/airbyte/pull/79263) | Update dependencies |
| 1.0.20 | 2026-06-02 | [78630](https://github.com/airbytehq/airbyte/pull/78630) | Update dependencies |
| 1.0.19 | 2026-04-28 | [77261](https://github.com/airbytehq/airbyte/pull/77261) | Update dependencies |
| 1.0.18 | 2026-04-21 | [76577](https://github.com/airbytehq/airbyte/pull/76577) | Update dependencies |
| 1.0.17 | 2026-03-17 | [75082](https://github.com/airbytehq/airbyte/pull/75082) | Update dependencies |
| 1.0.16 | 2026-03-10 | [74449](https://github.com/airbytehq/airbyte/pull/74449) | Update dependencies |
| 1.0.15 | 2026-03-03 | [74192](https://github.com/airbytehq/airbyte/pull/74192) | Update dependencies |
| 1.0.14 | 2026-02-17 | [73544](https://github.com/airbytehq/airbyte/pull/73544) | Update dependencies |
| 1.0.13 | 2025-10-07 | [67155](https://github.com/airbytehq/airbyte/pull/67155) | Update dependencies |
| 1.0.12 | 2025-09-30 | [65758](https://github.com/airbytehq/airbyte/pull/65758) | Update dependencies |
| 1.0.11 | 2025-08-23 | [65305](https://github.com/airbytehq/airbyte/pull/65305) | Update dependencies |
| 1.0.10 | 2025-08-09 | [64715](https://github.com/airbytehq/airbyte/pull/64715) | Update dependencies |
| 1.0.9 | 2025-08-02 | [64362](https://github.com/airbytehq/airbyte/pull/64362) | Update dependencies |
| 1.0.8 | 2025-07-26 | [63981](https://github.com/airbytehq/airbyte/pull/63981) | Update dependencies |
| 1.0.7 | 2025-07-19 | [63581](https://github.com/airbytehq/airbyte/pull/63581) | Update dependencies |
| 1.0.6 | 2025-07-12 | [62976](https://github.com/airbytehq/airbyte/pull/62976) | Update dependencies |
| 1.0.5 | 2025-07-09 | [62869](https://github.com/airbytehq/airbyte/pull/62869) | Enabled "incremental Parent" switch for the child streams that have parent streams with incremental sync. |
| 1.0.4 | 2025-07-05 | [62779](https://github.com/airbytehq/airbyte/pull/62779) | Update dependencies |
| 1.0.3 | 2025-06-28 | [62306](https://github.com/airbytehq/airbyte/pull/62306) | Update dependencies |
| 1.0.2 | 2025-06-22 | [61992](https://github.com/airbytehq/airbyte/pull/61992) | Update dependencies |
| 1.0.1 | 2025-06-14 | [61174](https://github.com/airbytehq/airbyte/pull/61174) | Update dependencies |
| 1.0.0 | 2025-06-05 | [61388](https://github.com/airbytehq/airbyte/pull/61388) | Implements incremental sync in all applicable parent streams, improves the performance and efficiency of data extraction, compatible with Dolibarr 21.0.0 or higher versions |
| 0.0.1 | 2025-05-20 | [60320](https://github.com/airbytehq/airbyte/pull/60320) | Initial release by [@leonmm2](https://github.com/leonmm2) via Connector Builder |

</details>
