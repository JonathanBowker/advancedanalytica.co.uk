---
generated_record: true
connector_name: Grafana
connector_type: source
connector_slug: grafana
connector_directory: source-grafana
definition_id: bdf17de3-a522-4929-ab63-0205f794f7b4
version: 0.0.30
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/grafana
logo: /images/connectors/sources/grafana.svg
logo_source_path: airbyte-integrations/connectors/source-grafana/icon.svg
logo_sha256: 51788d291666b64a7dacf212eb372c093b71e2ed50fc3811404e54269f2db9e7
original_metadata_path: airbyte-integrations/connectors/source-grafana/metadata.yaml
original_metadata_sha256: c69659dc8c96fbc40a1a6017e1fc48c7d372218d871c751e6c00d17ec6bf051f
original_document_path: docs/integrations/sources/grafana.md
original_document_sha256: 83bdb206027efe8acd4a3dfd3b7c45819a7467b7beeb9fe96914d7b9747948fd
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f1265cd3e8c2f0eb1e153961cc798c9fefce5ddbcddb444e6de473f864874716
rewritten_at: 2026-11-12T13:41:35.898626+00:00
---

# Grafana
Sync Grafana resources into your warehouse or lake to audit configuration changes, analyse usage and combine metadata with operational data. Grafana is an observability and analytics platform for visualising, exploring and alerting on data from dozens of sources in one place. This connector replicates resources including datasources, dashboards, folders and users. Scheduled syncing helps you track dashboard changes over time and understand which teams and visualisations are most active. You can also build governance and reliability reporting across your Grafana estate.

## Configure Grafana

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `url` | `string` | Grafana URL. The URL of your Grafana instance (e.g., https://your-grafana.grafana.net) |  |
| `api_key` | `string` | API Key. Grafana API Key or Service Account Token |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| datasources | id | No pagination | ✅ |  ❌  |
| folders | id | No pagination | ✅ |  ❌  |
| dashboards | id | No pagination | ✅ |  ❌  |
| teams | id | No pagination | ✅ |  ❌  |
| users | userId | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.30 | 2026-11-10 | [91574](https://github.com/airbytehq/airbyte/pull/91574) | Update dependencies |
| 0.0.29 | 2026-11-03 | [90586](https://github.com/airbytehq/airbyte/pull/90586) | Update dependencies |
| 0.0.28 | 2026-10-27 | [89958](https://github.com/airbytehq/airbyte/pull/89958) | Update dependencies |
| 0.0.27 | 2026-10-20 | [89241](https://github.com/airbytehq/airbyte/pull/89241) | Update dependencies |
| 0.0.26 | 2026-10-13 | [88673](https://github.com/airbytehq/airbyte/pull/88673) | Update dependencies |
| 0.0.25 | 2026-10-08 | [88363](https://github.com/airbytehq/airbyte/pull/88363) | Replace the default Airbyte icon with the Grafana logo |
| 0.0.24 | 2026-10-06 | [87886](https://github.com/airbytehq/airbyte/pull/87886) | Update dependencies |
| 0.0.23 | 2026-09-29 | [87225](https://github.com/airbytehq/airbyte/pull/87225) | Update dependencies |
| 0.0.22 | 2026-09-22 | [86659](https://github.com/airbytehq/airbyte/pull/86659) | Update dependencies |
| 0.0.21 | 2026-09-15 | [86080](https://github.com/airbytehq/airbyte/pull/86080) | Update dependencies |
| 0.0.20 | 2026-09-08 | [85504](https://github.com/airbytehq/airbyte/pull/85504) | Update dependencies |
| 0.0.19 | 2026-08-18 | [84617](https://github.com/airbytehq/airbyte/pull/84617) | Update dependencies |
| 0.0.18 | 2026-08-11 | [83960](https://github.com/airbytehq/airbyte/pull/83960) | Update dependencies |
| 0.0.17 | 2026-08-04 | [83478](https://github.com/airbytehq/airbyte/pull/83478) | Update dependencies |
| 0.0.16 | 2026-07-28 | [82945](https://github.com/airbytehq/airbyte/pull/82945) | Update dependencies |
| 0.0.15 | 2026-07-21 | [82449](https://github.com/airbytehq/airbyte/pull/82449) | Update dependencies |
| 0.0.14 | 2026-07-14 | [81883](https://github.com/airbytehq/airbyte/pull/81883) | Update dependencies |
| 0.0.13 | 2026-06-30 | [81091](https://github.com/airbytehq/airbyte/pull/81091) | Update dependencies |
| 0.0.12 | 2026-06-23 | [80504](https://github.com/airbytehq/airbyte/pull/80504) | Update dependencies |
| 0.0.11 | 2026-06-16 | [79884](https://github.com/airbytehq/airbyte/pull/79884) | Update dependencies |
| 0.0.10 | 2026-06-09 | [79366](https://github.com/airbytehq/airbyte/pull/79366) | Update dependencies |
| 0.0.9 | 2026-06-02 | [78749](https://github.com/airbytehq/airbyte/pull/78749) | Update dependencies |
| 0.0.8 | 2026-04-28 | [77282](https://github.com/airbytehq/airbyte/pull/77282) | Update dependencies |
| 0.0.7 | 2026-04-21 | [76617](https://github.com/airbytehq/airbyte/pull/76617) | Update dependencies |
| 0.0.6 | 2026-03-31 | [74931](https://github.com/airbytehq/airbyte/pull/74931) | Update dependencies |
| 0.0.5 | 2026-03-10 | [74658](https://github.com/airbytehq/airbyte/pull/74658) | Update dependencies |
| 0.0.4 | 2026-02-24 | [73967](https://github.com/airbytehq/airbyte/pull/73967) | Update dependencies |
| 0.0.3 | 2026-02-10 | [73074](https://github.com/airbytehq/airbyte/pull/73074) | Update dependencies |
| 0.0.2 | 2026-02-03 | [72665](https://github.com/airbytehq/airbyte/pull/72665) | Update dependencies |
| 0.0.1 | 2026-01-29 | | Initial release by [@tgonzalezc5](https://github.com/tgonzalezc5) via Connector Builder |

</details>
