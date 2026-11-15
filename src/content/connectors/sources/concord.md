---
generated_record: true
connector_name: Concord
connector_type: source
connector_slug: concord
connector_directory: source-concord
definition_id: dc50b4e6-862e-4b49-8ed7-3c988f4b1db0
version: 0.0.62
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/concord
logo: /images/connectors/sources/concord.svg
logo_source_path: airbyte-integrations/connectors/source-concord/icon.svg
logo_sha256: d04e627e50e5dffeda4007891af77a61dad010106ab1529e3e4fd51dbd477dbe
original_metadata_path: airbyte-integrations/connectors/source-concord/metadata.yaml
original_metadata_sha256: 51282d9a34d2e5dcd46996f4332f6c630a22e0213453ee341c0e0905fcd2efd4
original_document_path: docs/integrations/sources/concord.md
original_document_sha256: f5eb7ecb1d803602f192e4d9e494a64cb05257d476e1b681d64c98e87e96c81b
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a4f6bad2153a4976e8db1b79f5db1484b4d551f1c8862f83e80881d5f5bc0302
rewritten_at: 2026-11-12T13:34:14.790356+00:00
---

# Concord
Set up the Concord source to ingest data from the concord API.

Concord turns contract data into financial insights. You can sign, store and search unlimited contracts https://www.concord.app/

First, create a concord account and log in. Then go to Automations -> Integrations -> Concord API -> Generate New Key to get your API key.

You can access the API from two environments: sandbox and production. Learn more about the API here https://api.doc.concordnow.com/

## Configure the source

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `env` | `string` | Environment. The environment from where you want to access the API (`api` for production, `uat` for sandbox) https://api.doc.concordnow.com/#section/Environments. |  |


## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| agreements | uid | DefaultPaginator | ✅ |  ❌  |
| user_organizations | id | No pagination | ✅ |  ❌  |
| organization | id | No pagination | ✅ |  ❌  |
| folders | id | No pagination | ✅ |  ❌  |
| reports | id | DefaultPaginator | ✅ |  ❌  |
| tags | id | No pagination | ✅ |  ❌  |
| organization_members | user_id | DefaultPaginator | ✅ |  ❌  |

## Allow IP addresses

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.62 | 2026-11-10 | [91478](https://github.com/airbytehq/airbyte/pull/91478) | Update dependencies |
| 0.0.61 | 2026-11-03 | [90517](https://github.com/airbytehq/airbyte/pull/90517) | Update dependencies |
| 0.0.60 | 2026-10-27 | [89832](https://github.com/airbytehq/airbyte/pull/89832) | Update dependencies |
| 0.0.59 | 2026-10-20 | [89168](https://github.com/airbytehq/airbyte/pull/89168) | Update dependencies |
| 0.0.58 | 2026-10-13 | [88575](https://github.com/airbytehq/airbyte/pull/88575) | Update dependencies |
| 0.0.57 | 2026-10-07 | [88318](https://github.com/airbytehq/airbyte/pull/88318) | Use `user_organizations` as the check stream and pass the required `organizationId` to the `tags` endpoint |
| 0.0.56 | 2026-10-06 | [87820](https://github.com/airbytehq/airbyte/pull/87820) | Update dependencies |
| 0.0.55 | 2026-09-29 | [87121](https://github.com/airbytehq/airbyte/pull/87121) | Update dependencies |
| 0.0.54 | 2026-09-22 | [86567](https://github.com/airbytehq/airbyte/pull/86567) | Update dependencies |
| 0.0.53 | 2026-09-15 | [85983](https://github.com/airbytehq/airbyte/pull/85983) | Update dependencies |
| 0.0.52 | 2026-09-08 | [85451](https://github.com/airbytehq/airbyte/pull/85451) | Update dependencies |
| 0.0.51 | 2026-08-18 | [84543](https://github.com/airbytehq/airbyte/pull/84543) | Update dependencies |
| 0.0.50 | 2026-08-11 | [83892](https://github.com/airbytehq/airbyte/pull/83892) | Update dependencies |
| 0.0.49 | 2026-08-04 | [83395](https://github.com/airbytehq/airbyte/pull/83395) | Update dependencies |
| 0.0.48 | 2026-07-28 | [82884](https://github.com/airbytehq/airbyte/pull/82884) | Update dependencies |
| 0.0.47 | 2026-07-21 | [82380](https://github.com/airbytehq/airbyte/pull/82380) | Update dependencies |
| 0.0.46 | 2026-07-14 | [81783](https://github.com/airbytehq/airbyte/pull/81783) | Update dependencies |
| 0.0.45 | 2026-06-30 | [81017](https://github.com/airbytehq/airbyte/pull/81017) | Update dependencies |
| 0.0.44 | 2026-06-23 | [80431](https://github.com/airbytehq/airbyte/pull/80431) | Update dependencies |
| 0.0.43 | 2026-06-16 | [79804](https://github.com/airbytehq/airbyte/pull/79804) | Update dependencies |
| 0.0.42 | 2026-06-09 | [79265](https://github.com/airbytehq/airbyte/pull/79265) | Update dependencies |
| 0.0.41 | 2026-06-02 | [78654](https://github.com/airbytehq/airbyte/pull/78654) | Update dependencies |
| 0.0.40 | 2026-04-28 | [77203](https://github.com/airbytehq/airbyte/pull/77203) | Update dependencies |
| 0.0.39 | 2026-04-21 | [76549](https://github.com/airbytehq/airbyte/pull/76549) | Update dependencies |
| 0.0.38 | 2026-03-03 | [74153](https://github.com/airbytehq/airbyte/pull/74153) | Update dependencies |
| 0.0.37 | 2026-02-17 | [73549](https://github.com/airbytehq/airbyte/pull/73549) | Update dependencies |
| 0.0.36 | 2026-01-14 | [71569](https://github.com/airbytehq/airbyte/pull/71569) | Update dependencies |
| 0.0.35 | 2025-11-18 | [69610](https://github.com/airbytehq/airbyte/pull/69610) | Update dependencies |
| 0.0.34 | 2025-09-30 | [65756](https://github.com/airbytehq/airbyte/pull/65756) | Update dependencies |
| 0.0.33 | 2025-08-23 | [65291](https://github.com/airbytehq/airbyte/pull/65291) | Update dependencies |
| 0.0.32 | 2025-08-09 | [64792](https://github.com/airbytehq/airbyte/pull/64792) | Update dependencies |
| 0.0.31 | 2025-07-26 | [64038](https://github.com/airbytehq/airbyte/pull/64038) | Update dependencies |
| 0.0.30 | 2025-07-19 | [63586](https://github.com/airbytehq/airbyte/pull/63586) | Update dependencies |
| 0.0.29 | 2025-07-12 | [62975](https://github.com/airbytehq/airbyte/pull/62975) | Update dependencies |
| 0.0.28 | 2025-07-05 | [62771](https://github.com/airbytehq/airbyte/pull/62771) | Update dependencies |
| 0.0.27 | 2025-06-28 | [62301](https://github.com/airbytehq/airbyte/pull/62301) | Update dependencies |
| 0.0.26 | 2025-06-21 | [61978](https://github.com/airbytehq/airbyte/pull/61978) | Update dependencies |
| 0.0.25 | 2025-06-14 | [61287](https://github.com/airbytehq/airbyte/pull/61287) | Update dependencies |
| 0.0.24 | 2025-05-24 | [60373](https://github.com/airbytehq/airbyte/pull/60373) | Update dependencies |
| 0.0.23 | 2025-05-10 | [60030](https://github.com/airbytehq/airbyte/pull/60030) | Update dependencies |
| 0.0.22 | 2025-05-03 | [59386](https://github.com/airbytehq/airbyte/pull/59386) | Update dependencies |
| 0.0.21 | 2025-04-26 | [58305](https://github.com/airbytehq/airbyte/pull/58305) | Update dependencies |
| 0.0.20 | 2025-04-12 | [57823](https://github.com/airbytehq/airbyte/pull/57823) | Update dependencies |
| 0.0.19 | 2025-04-05 | [57196](https://github.com/airbytehq/airbyte/pull/57196) | Update dependencies |
| 0.0.18 | 2025-03-29 | [56511](https://github.com/airbytehq/airbyte/pull/56511) | Update dependencies |
| 0.0.17 | 2025-03-22 | [55934](https://github.com/airbytehq/airbyte/pull/55934) | Update dependencies |
| 0.0.16 | 2025-03-08 | [55294](https://github.com/airbytehq/airbyte/pull/55294) | Update dependencies |
| 0.0.15 | 2025-03-01 | [54929](https://github.com/airbytehq/airbyte/pull/54929) | Update dependencies |
| 0.0.14 | 2025-02-22 | [54407](https://github.com/airbytehq/airbyte/pull/54407) | Update dependencies |
| 0.0.13 | 2025-02-15 | [53750](https://github.com/airbytehq/airbyte/pull/53750) | Update dependencies |
| 0.0.12 | 2025-02-08 | [53312](https://github.com/airbytehq/airbyte/pull/53312) | Update dependencies |
| 0.0.11 | 2025-02-01 | [52864](https://github.com/airbytehq/airbyte/pull/52864) | Update dependencies |
| 0.0.10 | 2025-01-25 | [52308](https://github.com/airbytehq/airbyte/pull/52308) | Update dependencies |
| 0.0.9 | 2025-01-18 | [51621](https://github.com/airbytehq/airbyte/pull/51621) | Update dependencies |
| 0.0.8 | 2025-01-11 | [51131](https://github.com/airbytehq/airbyte/pull/51131) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50510](https://github.com/airbytehq/airbyte/pull/50510) | Update dependencies |
| 0.0.6 | 2024-12-21 | [50057](https://github.com/airbytehq/airbyte/pull/50057) | Update dependencies |
| 0.0.5 | 2024-12-14 | [49475](https://github.com/airbytehq/airbyte/pull/49475) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49160](https://github.com/airbytehq/airbyte/pull/49160) | Update dependencies |
| 0.0.3 | 2024-12-11 | [48913](https://github.com/airbytehq/airbyte/pull/48913) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.2 | 2024-11-04 | [48215](https://github.com/airbytehq/airbyte/pull/48215) | Update dependencies |
| 0.0.1 | 2024-10-16 | | Initial release by [@aazam-gh](https://github.com/aazam-gh) via Connector Builder |

</details>
