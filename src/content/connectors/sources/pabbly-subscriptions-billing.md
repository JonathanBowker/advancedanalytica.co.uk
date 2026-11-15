---
generated_record: true
connector_name: Pabbly Subscriptions Billing
connector_type: source
connector_slug: pabbly-subscriptions-billing
connector_directory: source-pabbly-subscriptions-billing
definition_id: b461c060-9d6a-43c9-a73c-634eaf83c4bf
version: 0.0.70
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pabbly-subscriptions-billing
logo: /images/connectors/sources/pabbly-subscriptions-billing.svg
logo_source_path: airbyte-integrations/connectors/source-pabbly-subscriptions-billing/icon.svg
logo_sha256: 7b0ff694c93c05e780468bb65d42d8f183c0a80a97516f289a54ed81f04d4e81
original_metadata_path: airbyte-integrations/connectors/source-pabbly-subscriptions-billing/metadata.yaml
original_metadata_sha256: bd196dea0fc58a07b1fe77186e55e7739ae5b72814c9aca4e293467d9399b1db
original_document_path: docs/integrations/sources/pabbly-subscriptions-billing.md
original_document_sha256: 954de9688a0d1efe2751f5041a8c64f52aae189b061da65dd784ef22ea825296
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8ad079db1865fe0adfecc286fe0cd1a3d9ca21bebece613a97f79a84d3fff1f0
rewritten_at: 2026-11-12T13:50:11.667558+00:00
---

# Pabbly Subscriptions Billing
Use the Airbyte connector for [Pabbly Subscriptions Billing](https://www.pabbly.com/subscriptions/) to synchronise data between Pabbly&#39;s subscription management platform and your chosen data warehouse or analytics environment. It automates extracting key subscription data, including customer details, payment transactions and subscription statuses. You can report, analyse and make decisions efficiently, without manual intervention.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `password` | `string` | Password.  |  |
| `username` | `string` | Username.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| customers | id | DefaultPaginator | ✅ |  ❌  |
| subscriptions | id | DefaultPaginator | ✅ |  ❌  |
| products | id | DefaultPaginator | ✅ |  ❌  |
| coupons | id | DefaultPaginator | ✅ |  ❌  |
| invoices | id | DefaultPaginator | ✅ |  ❌  |
| payment_methods | id | DefaultPaginator | ✅ |  ❌  |
| transactions | id | DefaultPaginator | ✅ |  ❌  |
| refunds | id | DefaultPaginator | ✅ |  ❌  |
| addons | id | DefaultPaginator | ✅ |  ❌  |
| addon_list_category | id | DefaultPaginator | ✅ |  ❌  |
| licenses | id | DefaultPaginator | ✅ |  ❌  |
| multiplans | id | DefaultPaginator | ✅ |  ❌  |
| payment_gateways | id | DefaultPaginator | ✅ |  ❌  |

## Allow IP addresses

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.70 | 2026-11-10 | [91615](https://github.com/airbytehq/airbyte/pull/91615) | Update dependencies |
| 0.0.69 | 2026-11-03 | [90690](https://github.com/airbytehq/airbyte/pull/90690) | Update dependencies |
| 0.0.68 | 2026-10-27 | [90014](https://github.com/airbytehq/airbyte/pull/90014) | Update dependencies |
| 0.0.67 | 2026-10-20 | [89325](https://github.com/airbytehq/airbyte/pull/89325) | Update dependencies |
| 0.0.66 | 2026-10-13 | [88723](https://github.com/airbytehq/airbyte/pull/88723) | Update dependencies |
| 0.0.65 | 2026-10-06 | [87959](https://github.com/airbytehq/airbyte/pull/87959) | Update dependencies |
| 0.0.64 | 2026-09-29 | [87275](https://github.com/airbytehq/airbyte/pull/87275) | Update dependencies |
| 0.0.63 | 2026-09-22 | [86740](https://github.com/airbytehq/airbyte/pull/86740) | Update dependencies |
| 0.0.62 | 2026-09-15 | [86168](https://github.com/airbytehq/airbyte/pull/86168) | Update dependencies |
| 0.0.61 | 2026-09-08 | [85587](https://github.com/airbytehq/airbyte/pull/85587) | Update dependencies |
| 0.0.60 | 2026-08-18 | [84692](https://github.com/airbytehq/airbyte/pull/84692) | Update dependencies |
| 0.0.59 | 2026-08-11 | [84052](https://github.com/airbytehq/airbyte/pull/84052) | Update dependencies |
| 0.0.58 | 2026-08-04 | [83584](https://github.com/airbytehq/airbyte/pull/83584) | Update dependencies |
| 0.0.57 | 2026-07-28 | [83031](https://github.com/airbytehq/airbyte/pull/83031) | Update dependencies |
| 0.0.56 | 2026-07-21 | [82539](https://github.com/airbytehq/airbyte/pull/82539) | Update dependencies |
| 0.0.55 | 2026-07-14 | [81945](https://github.com/airbytehq/airbyte/pull/81945) | Update dependencies |
| 0.0.54 | 2026-06-30 | [81198](https://github.com/airbytehq/airbyte/pull/81198) | Update dependencies |
| 0.0.53 | 2026-06-23 | [80583](https://github.com/airbytehq/airbyte/pull/80583) | Update dependencies |
| 0.0.52 | 2026-06-16 | [79983](https://github.com/airbytehq/airbyte/pull/79983) | Update dependencies |
| 0.0.51 | 2026-06-09 | [79433](https://github.com/airbytehq/airbyte/pull/79433) | Update dependencies |
| 0.0.50 | 2026-06-02 | [78881](https://github.com/airbytehq/airbyte/pull/78881) | Update dependencies |
| 0.0.49 | 2026-04-28 | [77309](https://github.com/airbytehq/airbyte/pull/77309) | Update dependencies |
| 0.0.48 | 2026-04-21 | [76708](https://github.com/airbytehq/airbyte/pull/76708) | Update dependencies |
| 0.0.47 | 2026-03-31 | [75675](https://github.com/airbytehq/airbyte/pull/75675) | Update dependencies |
| 0.0.46 | 2026-03-24 | [75327](https://github.com/airbytehq/airbyte/pull/75327) | Update dependencies |
| 0.0.45 | 2026-03-10 | [74649](https://github.com/airbytehq/airbyte/pull/74649) | Update dependencies |
| 0.0.44 | 2026-02-24 | [73814](https://github.com/airbytehq/airbyte/pull/73814) | Update dependencies |
| 0.0.43 | 2026-02-10 | [73112](https://github.com/airbytehq/airbyte/pull/73112) | Update dependencies |
| 0.0.42 | 2026-01-20 | [72174](https://github.com/airbytehq/airbyte/pull/72174) | Update dependencies |
| 0.0.41 | 2026-01-14 | [71673](https://github.com/airbytehq/airbyte/pull/71673) | Update dependencies |
| 0.0.40 | 2025-12-18 | [70495](https://github.com/airbytehq/airbyte/pull/70495) | Update dependencies |
| 0.0.39 | 2025-11-25 | [70122](https://github.com/airbytehq/airbyte/pull/70122) | Update dependencies |
| 0.0.38 | 2025-11-18 | [69670](https://github.com/airbytehq/airbyte/pull/69670) | Update dependencies |
| 0.0.37 | 2025-10-29 | [69024](https://github.com/airbytehq/airbyte/pull/69024) | Update dependencies |
| 0.0.36 | 2025-10-21 | [68308](https://github.com/airbytehq/airbyte/pull/68308) | Update dependencies |
| 0.0.35 | 2025-10-14 | [67741](https://github.com/airbytehq/airbyte/pull/67741) | Update dependencies |
| 0.0.34 | 2025-10-07 | [67350](https://github.com/airbytehq/airbyte/pull/67350) | Update dependencies |
| 0.0.33 | 2025-09-30 | [66381](https://github.com/airbytehq/airbyte/pull/66381) | Update dependencies |
| 0.0.32 | 2025-09-09 | [65773](https://github.com/airbytehq/airbyte/pull/65773) | Update dependencies |
| 0.0.31 | 2025-08-23 | [65201](https://github.com/airbytehq/airbyte/pull/65201) | Update dependencies |
| 0.0.30 | 2025-08-09 | [64758](https://github.com/airbytehq/airbyte/pull/64758) | Update dependencies |
| 0.0.29 | 2025-08-02 | [64297](https://github.com/airbytehq/airbyte/pull/64297) | Update dependencies |
| 0.0.28 | 2025-07-26 | [63920](https://github.com/airbytehq/airbyte/pull/63920) | Update dependencies |
| 0.0.27 | 2025-07-19 | [63448](https://github.com/airbytehq/airbyte/pull/63448) | Update dependencies |
| 0.0.26 | 2025-07-12 | [63248](https://github.com/airbytehq/airbyte/pull/63248) | Update dependencies |
| 0.0.25 | 2025-07-05 | [62575](https://github.com/airbytehq/airbyte/pull/62575) | Update dependencies |
| 0.0.24 | 2025-06-28 | [62378](https://github.com/airbytehq/airbyte/pull/62378) | Update dependencies |
| 0.0.23 | 2025-06-21 | [61911](https://github.com/airbytehq/airbyte/pull/61911) | Update dependencies |
| 0.0.22 | 2025-06-14 | [60549](https://github.com/airbytehq/airbyte/pull/60549) | Update dependencies |
| 0.0.21 | 2025-05-10 | [60157](https://github.com/airbytehq/airbyte/pull/60157) | Update dependencies |
| 0.0.20 | 2025-05-03 | [59482](https://github.com/airbytehq/airbyte/pull/59482) | Update dependencies |
| 0.0.19 | 2025-04-27 | [59052](https://github.com/airbytehq/airbyte/pull/59052) | Update dependencies |
| 0.0.18 | 2025-04-19 | [58466](https://github.com/airbytehq/airbyte/pull/58466) | Update dependencies |
| 0.0.17 | 2025-04-12 | [57911](https://github.com/airbytehq/airbyte/pull/57911) | Update dependencies |
| 0.0.16 | 2025-04-05 | [57290](https://github.com/airbytehq/airbyte/pull/57290) | Update dependencies |
| 0.0.15 | 2025-03-29 | [56798](https://github.com/airbytehq/airbyte/pull/56798) | Update dependencies |
| 0.0.14 | 2025-03-22 | [56203](https://github.com/airbytehq/airbyte/pull/56203) | Update dependencies |
| 0.0.13 | 2025-03-08 | [55049](https://github.com/airbytehq/airbyte/pull/55049) | Update dependencies |
| 0.0.12 | 2025-02-23 | [54556](https://github.com/airbytehq/airbyte/pull/54556) | Update dependencies |
| 0.0.11 | 2025-02-15 | [54011](https://github.com/airbytehq/airbyte/pull/54011) | Update dependencies |
| 0.0.10 | 2025-02-08 | [53512](https://github.com/airbytehq/airbyte/pull/53512) | Update dependencies |
| 0.0.9 | 2025-02-01 | [52974](https://github.com/airbytehq/airbyte/pull/52974) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52521](https://github.com/airbytehq/airbyte/pull/52521) | Update dependencies |
| 0.0.7 | 2025-01-18 | [51317](https://github.com/airbytehq/airbyte/pull/51317) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50725](https://github.com/airbytehq/airbyte/pull/50725) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50249](https://github.com/airbytehq/airbyte/pull/50249) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49681](https://github.com/airbytehq/airbyte/pull/49681) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49320](https://github.com/airbytehq/airbyte/pull/49320) | Update dependencies |
| 0.0.2 | 2024-12-11 | [49056](https://github.com/airbytehq/airbyte/pull/49056) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1 | 2024-11-08 | | Initial release by [@parthiv11](https://github.com/parthiv11) via Connector Builder |

</details>
