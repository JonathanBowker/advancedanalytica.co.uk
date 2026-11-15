---
generated_record: true
connector_name: K6 Cloud
connector_type: source
connector_slug: k6-cloud
connector_directory: source-k6-cloud
definition_id: e300ece7-b073-43a3-852e-8aff36a57f13
version: 0.2.27
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/k6-cloud
logo: /images/connectors/sources/k6-cloud.svg
logo_source_path: airbyte-integrations/connectors/source-k6-cloud/icon.svg
logo_sha256: 03f3c5fa4a9ffca35c5fc66f72837793fdbbdb8f32613464b18148eacf8ce9a9
original_metadata_path: airbyte-integrations/connectors/source-k6-cloud/metadata.yaml
original_metadata_sha256: 8a169204f1c48265545aca99ca6d26e54990dc76d6bcb5facc881d98d749e222
original_document_path: docs/integrations/sources/k6-cloud.md
original_document_sha256: c71323da148efd8388c1e23b89276498154c1d0a728c3143a4ccf0888f3cfbbe
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 834fb4e46457619705a6546e39a14bb35b96bb46ea769c5457454a927c8b9c03
rewritten_at: 2026-11-12T13:44:10.567377+00:00
---

# K6 Cloud API

:::warning

## Deprecation notice

The K6 Cloud source connector is archived. It is no longer available in Airbyte Cloud or the OSS connector registry.

This connector targets the legacy k6 Cloud product (`app.k6.io`). It uses REST endpoints `/v3/organizations`, `/v3/organizations/{id}/projects` and `/loadtests/v2/tests` on `api.k6.io`. Grafana Labs [sunset app.k6.io in September 2024](https://grafana.com/docs/grafana-cloud/observe-and-act/testing/k6/reference/migrate-from-app-k6-io-to-gck6/) and migrated all accounts to Grafana Cloud k6. Legacy API tokens no longer authenticate. The API now answers `app.k6.io has been migrated to Grafana Cloud. To continue using k6 Cloud, please start a new account at https://grafana.com/products/cloud/k6/`. The `organizations` stream used for connection checks returns HTTP 500. No sync using this connector has succeeded since the sunset.

### Recommended actions

To sync Grafana Cloud k6 data, build a connector for its API with the [Connector Builder](https://docs.airbyte.com/platform/connector-development/connector-builder-ui/overview). The replacement [Grafana Cloud k6 REST API](https://grafana.com/docs/grafana-cloud/observe-and-act/testing/k6/reference/cloud-rest-api/) (`https://api.k6.io/cloud/v6/...`) uses a different resource model. It requires a Grafana Cloud API token and an `X-Stack-Id` header. Therefore, it isn't a drop-in replacement for this connector.

:::

## Sync overview

This source syncs data from the [K6 Cloud API](https://developers.k6.io). It currently supports full refresh syncs only. Each sync retrieves all available records from scratch. Use it cautiously if you expect your API to contain many records.

## Supported streams

- organizations
- projects
- tests

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

### Performance considerations

## Getting started

### Requirements

- API Token

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                         |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.2.27 | 2026-10-07 | [88222](https://github.com/airbytehq/airbyte/pull/88222) | Archive connector: the legacy k6 Cloud (app.k6.io) API it targets was sunset by Grafana Labs in September 2024 |
| 0.2.26 | 2025-05-24 | [60713](https://github.com/airbytehq/airbyte/pull/60713) | Update dependencies |
| 0.2.25 | 2025-05-10 | [59830](https://github.com/airbytehq/airbyte/pull/59830) | Update dependencies |
| 0.2.24 | 2025-05-03 | [59232](https://github.com/airbytehq/airbyte/pull/59232) | Update dependencies |
| 0.2.23 | 2025-04-26 | [58780](https://github.com/airbytehq/airbyte/pull/58780) | Update dependencies |
| 0.2.22 | 2025-04-19 | [58224](https://github.com/airbytehq/airbyte/pull/58224) | Update dependencies |
| 0.2.21 | 2025-04-12 | [57693](https://github.com/airbytehq/airbyte/pull/57693) | Update dependencies |
| 0.2.20 | 2025-04-05 | [57092](https://github.com/airbytehq/airbyte/pull/57092) | Update dependencies |
| 0.2.19 | 2025-03-29 | [56698](https://github.com/airbytehq/airbyte/pull/56698) | Update dependencies |
| 0.2.18 | 2025-03-22 | [56019](https://github.com/airbytehq/airbyte/pull/56019) | Update dependencies |
| 0.2.17 | 2025-03-08 | [55486](https://github.com/airbytehq/airbyte/pull/55486) | Update dependencies |
| 0.2.16 | 2025-03-01 | [54748](https://github.com/airbytehq/airbyte/pull/54748) | Update dependencies |
| 0.2.15 | 2025-02-22 | [54290](https://github.com/airbytehq/airbyte/pull/54290) | Update dependencies |
| 0.2.14 | 2025-02-15 | [53830](https://github.com/airbytehq/airbyte/pull/53830) | Update dependencies |
| 0.2.13 | 2025-02-08 | [53251](https://github.com/airbytehq/airbyte/pull/53251) | Update dependencies |
| 0.2.12 | 2025-02-01 | [52732](https://github.com/airbytehq/airbyte/pull/52732) | Update dependencies |
| 0.2.11 | 2025-01-25 | [52229](https://github.com/airbytehq/airbyte/pull/52229) | Update dependencies |
| 0.2.10 | 2025-01-18 | [51837](https://github.com/airbytehq/airbyte/pull/51837) | Update dependencies |
| 0.2.9 | 2025-01-11 | [51190](https://github.com/airbytehq/airbyte/pull/51190) | Update dependencies |
| 0.2.8 | 2024-12-28 | [50656](https://github.com/airbytehq/airbyte/pull/50656) | Update dependencies |
| 0.2.7 | 2024-12-21 | [50077](https://github.com/airbytehq/airbyte/pull/50077) | Update dependencies |
| 0.2.6 | 2024-12-14 | [49612](https://github.com/airbytehq/airbyte/pull/49612) | Update dependencies |
| 0.2.5 | 2024-12-12 | [49242](https://github.com/airbytehq/airbyte/pull/49242) | Update dependencies |
| 0.2.4 | 2024-12-11 | [48204](https://github.com/airbytehq/airbyte/pull/48204) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.3 | 2024-10-29 | [47895](https://github.com/airbytehq/airbyte/pull/47895) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47454](https://github.com/airbytehq/airbyte/pull/47454) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-15 | [44137](https://github.com/airbytehq/airbyte/pull/44137) | Refactor connector to manifest-only format |
| 0.1.15 | 2024-08-10 | [43493](https://github.com/airbytehq/airbyte/pull/43493) | Update dependencies |
| 0.1.14 | 2024-08-03 | [43077](https://github.com/airbytehq/airbyte/pull/43077) | Update dependencies |
| 0.1.13 | 2024-07-27 | [42789](https://github.com/airbytehq/airbyte/pull/42789) | Update dependencies |
| 0.1.12 | 2024-07-20 | [42249](https://github.com/airbytehq/airbyte/pull/42249) | Update dependencies |
| 0.1.11 | 2024-07-13 | [41871](https://github.com/airbytehq/airbyte/pull/41871) | Update dependencies |
| 0.1.10 | 2024-07-10 | [41462](https://github.com/airbytehq/airbyte/pull/41462) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41324](https://github.com/airbytehq/airbyte/pull/41324) | Update dependencies |
| 0.1.8 | 2024-07-06 | [40875](https://github.com/airbytehq/airbyte/pull/40875) | Update dependencies |
| 0.1.7 | 2024-06-25 | [40291](https://github.com/airbytehq/airbyte/pull/40291) | Update dependencies |
| 0.1.6 | 2024-06-21 | [39921](https://github.com/airbytehq/airbyte/pull/39921) | Update dependencies |
| 0.1.5 | 2024-06-04 | [39044](https://github.com/airbytehq/airbyte/pull/39044) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.4 | 2024-05-15 | [38150](https://github.com/airbytehq/airbyte/pull/38150) | Make connector compatable with the builder |
| 0.1.3 | 2024-04-19 | [37181](https://github.com/airbytehq/airbyte/pull/37181) | Upgrade to CDK 0.80.0 and manage dependencies with Poetry. |
| 0.1.2 | 2024-04-15 | [37181](https://github.com/airbytehq/airbyte/pull/37181) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.1 | 2024-04-12 | [37181](https://github.com/airbytehq/airbyte/pull/37181) | schema descriptions |
| 0.1.0   | 2022-10-27 | [#18393](https://github.com/airbytehq/airbyte/pull/18393) | 🎉 New Source: K6 Cloud API [low-code CDK]                                      |

</details>
