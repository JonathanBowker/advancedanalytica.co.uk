---
generated_record: true
connector_name: Capsule CRM
connector_type: source
connector_slug: capsule-crm
connector_directory: source-capsule-crm
definition_id: 4f1b8b9c-fa2c-4fc2-b041-e3bde27a0cb1
version: 0.0.64
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/capsule-crm
logo: /images/connectors/sources/capsule-crm.svg
logo_source_path: airbyte-integrations/connectors/source-capsule-crm/icon.svg
logo_sha256: 9b0ed758e54f3c7b6f23d63e240617afff675c1dc2bb1e97201c35cd5eebc881
original_metadata_path: airbyte-integrations/connectors/source-capsule-crm/metadata.yaml
original_metadata_sha256: 2ebdc6e43c972fbc5ddb78c516db785a4f6bcb97059dc1dfbd45cf9a3c78b745
original_document_path: docs/integrations/sources/capsule-crm.md
original_document_sha256: 3d7f1a58e652c4e6d7ca2578e80126bcded6d46a09c32cedc53c578c3727e3f9
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a2811be47807e19086ef3bec925ca8272cbe91a87b50b421520677051254ad53
rewritten_at: 2026-11-12T13:32:49.468183+00:00
---

# Capsule CRM
The Capsule CRM connector syncs data seamlessly from Capsule CRM to various data warehouses. This helps you centralise and analyse customer data efficiently. It supports real-time extraction of contacts, opportunities and custom fields for comprehensive CRM analytics and reporting.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `bearer_token` | `string` | Bearer Token. Bearer token to authenticate API requests. Generate it from the &#39;My Preferences&#39; &gt; &#39;API Authentication Tokens&#39; page in your Capsule account. |  |
| `start_date` | `string` | Start date.  |  |
| `entity` | `string` | Entity.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| users | id | DefaultPaginator | ✅ |  ❌  |
| parties | id | DefaultPaginator | ✅ |  ❌  |
| tasks | id | DefaultPaginator | ✅ |  ❌  |
| employees | id | DefaultPaginator | ✅ |  ❌  |
| projects | id | DefaultPaginator | ✅ |  ❌  |
| opportunities | id | DefaultPaginator | ✅ |  ✅  |
| pipelines | id | DefaultPaginator | ✅ |  ❌  |
| milestones | id | DefaultPaginator | ✅ |  ❌  |
| site |  | DefaultPaginator | ✅ |  ❌  |
| tags | id | DefaultPaginator | ✅ |  ❌  |
| custom_fields | id | DefaultPaginator | ✅ |  ❌  |
| lost_reasons | id | DefaultPaginator | ✅ |  ❌  |
| board | id | DefaultPaginator | ✅ |  ❌  |
| categories | id | DefaultPaginator | ✅ |  ❌  |
| activity_types | id | DefaultPaginator | ✅ |  ❌  |
| stages | id | DefaultPaginator | ✅ |  ❌  |

## Rate limits

Capsule allows up to 4,000 API requests per user each hour ([docs](https://developer.capsulecrm.com/v2/overview/handling-api-responses)). After you exhaust the quota, Capsule returns HTTP 429 until the window resets. The connector waits until the time specified in the `X-RateLimit-Reset` header before retrying. For large accounts, the `employees` stream sends one request per party. As a result, a sync may pause for up to an hour.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.64 | 2026-11-10 | [91427](https://github.com/airbytehq/airbyte/pull/91427) | Update dependencies |
| 0.0.63 | 2026-11-03 | [90489](https://github.com/airbytehq/airbyte/pull/90489) | Update dependencies |
| 0.0.62 | 2026-10-27 | [89821](https://github.com/airbytehq/airbyte/pull/89821) | Update dependencies |
| 0.0.61 | 2026-10-20 | [89158](https://github.com/airbytehq/airbyte/pull/89158) | Update dependencies |
| 0.0.60 | 2026-10-13 | [88551](https://github.com/airbytehq/airbyte/pull/88551) | Update dependencies |
| 0.0.59 | 2026-10-07 | [88223](https://github.com/airbytehq/airbyte/pull/88223) | Wait until `X-RateLimit-Reset` on HTTP 429 instead of failing with "Too many requests" |
| 0.0.58 | 2026-10-06 | [87791](https://github.com/airbytehq/airbyte/pull/87791) | Update dependencies |
| 0.0.57 | 2026-09-29 | [87109](https://github.com/airbytehq/airbyte/pull/87109) | Update dependencies |
| 0.0.56 | 2026-09-22 | [86575](https://github.com/airbytehq/airbyte/pull/86575) | Update dependencies |
| 0.0.55 | 2026-09-15 | [86001](https://github.com/airbytehq/airbyte/pull/86001) | Update dependencies |
| 0.0.54 | 2026-09-08 | [85434](https://github.com/airbytehq/airbyte/pull/85434) | Update dependencies |
| 0.0.53 | 2026-08-18 | [84516](https://github.com/airbytehq/airbyte/pull/84516) | Update dependencies |
| 0.0.52 | 2026-08-11 | [83881](https://github.com/airbytehq/airbyte/pull/83881) | Update dependencies |
| 0.0.51 | 2026-08-04 | [83408](https://github.com/airbytehq/airbyte/pull/83408) | Update dependencies |
| 0.0.50 | 2026-07-28 | [82862](https://github.com/airbytehq/airbyte/pull/82862) | Update dependencies |
| 0.0.49 | 2026-07-21 | [82355](https://github.com/airbytehq/airbyte/pull/82355) | Update dependencies |
| 0.0.48 | 2026-07-14 | [81776](https://github.com/airbytehq/airbyte/pull/81776) | Update dependencies |
| 0.0.47 | 2026-06-30 | [81022](https://github.com/airbytehq/airbyte/pull/81022) | Update dependencies |
| 0.0.46 | 2026-06-23 | [80423](https://github.com/airbytehq/airbyte/pull/80423) | Update dependencies |
| 0.0.45 | 2026-06-16 | [79813](https://github.com/airbytehq/airbyte/pull/79813) | Update dependencies |
| 0.0.44 | 2026-06-09 | [79272](https://github.com/airbytehq/airbyte/pull/79272) | Update dependencies |
| 0.0.43 | 2026-06-02 | [78644](https://github.com/airbytehq/airbyte/pull/78644) | Update dependencies |
| 0.0.42 | 2026-04-28 | [77175](https://github.com/airbytehq/airbyte/pull/77175) | Update dependencies |
| 0.0.41 | 2026-04-21 | [76523](https://github.com/airbytehq/airbyte/pull/76523) | Update dependencies |
| 0.0.40 | 2026-03-31 | [75681](https://github.com/airbytehq/airbyte/pull/75681) | Update dependencies |
| 0.0.39 | 2026-03-17 | [74916](https://github.com/airbytehq/airbyte/pull/74916) | Update dependencies |
| 0.0.38 | 2026-03-03 | [74215](https://github.com/airbytehq/airbyte/pull/74215) | Update dependencies |
| 0.0.37 | 2026-02-17 | [73425](https://github.com/airbytehq/airbyte/pull/73425) | Update dependencies |
| 0.0.36 | 2026-02-03 | [72086](https://github.com/airbytehq/airbyte/pull/72086) | Update dependencies |
| 0.0.35 | 2026-01-14 | [71457](https://github.com/airbytehq/airbyte/pull/71457) | Update dependencies |
| 0.0.34 | 2025-12-18 | [70647](https://github.com/airbytehq/airbyte/pull/70647) | Update dependencies |
| 0.0.33 | 2025-11-25 | [69987](https://github.com/airbytehq/airbyte/pull/69987) | Update dependencies |
| 0.0.32 | 2025-11-18 | [69444](https://github.com/airbytehq/airbyte/pull/69444) | Update dependencies |
| 0.0.31 | 2025-10-29 | [68700](https://github.com/airbytehq/airbyte/pull/68700) | Update dependencies |
| 0.0.30 | 2025-10-21 | [68248](https://github.com/airbytehq/airbyte/pull/68248) | Update dependencies |
| 0.0.29 | 2025-10-14 | [67812](https://github.com/airbytehq/airbyte/pull/67812) | Update dependencies |
| 0.0.28 | 2025-10-07 | [67198](https://github.com/airbytehq/airbyte/pull/67198) | Update dependencies |
| 0.0.27 | 2025-09-30 | [66316](https://github.com/airbytehq/airbyte/pull/66316) | Update dependencies |
| 0.0.26 | 2025-08-09 | [64660](https://github.com/airbytehq/airbyte/pull/64660) | Update dependencies |
| 0.0.25 | 2025-07-12 | [63037](https://github.com/airbytehq/airbyte/pull/63037) | Update dependencies |
| 0.0.24 | 2025-06-21 | [61876](https://github.com/airbytehq/airbyte/pull/61876) | Update dependencies |
| 0.0.23 | 2025-06-15 | [60664](https://github.com/airbytehq/airbyte/pull/60664) | Update dependencies |
| 0.0.22 | 2025-05-10 | [59856](https://github.com/airbytehq/airbyte/pull/59856) | Update dependencies |
| 0.0.21 | 2025-05-03 | [58700](https://github.com/airbytehq/airbyte/pull/58700) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58252](https://github.com/airbytehq/airbyte/pull/58252) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57593](https://github.com/airbytehq/airbyte/pull/57593) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57174](https://github.com/airbytehq/airbyte/pull/57174) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56619](https://github.com/airbytehq/airbyte/pull/56619) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56146](https://github.com/airbytehq/airbyte/pull/56146) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55386](https://github.com/airbytehq/airbyte/pull/55386) | Update dependencies |
| 0.0.14 | 2025-03-01 | [54846](https://github.com/airbytehq/airbyte/pull/54846) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54262](https://github.com/airbytehq/airbyte/pull/54262) | Update dependencies |
| 0.0.12 | 2025-02-15 | [53923](https://github.com/airbytehq/airbyte/pull/53923) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53384](https://github.com/airbytehq/airbyte/pull/53384) | Update dependencies |
| 0.0.10 | 2025-02-01 | [52934](https://github.com/airbytehq/airbyte/pull/52934) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52199](https://github.com/airbytehq/airbyte/pull/52199) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51758](https://github.com/airbytehq/airbyte/pull/51758) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51282](https://github.com/airbytehq/airbyte/pull/51282) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50484](https://github.com/airbytehq/airbyte/pull/50484) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50172](https://github.com/airbytehq/airbyte/pull/50172) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49566](https://github.com/airbytehq/airbyte/pull/49566) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49314](https://github.com/airbytehq/airbyte/pull/49314) | Update dependencies |
| 0.0.2 | 2024-12-11 | [49028](https://github.com/airbytehq/airbyte/pull/49028) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1 | 2024-11-09 | | Initial release by [@bishalbera](https://github.com/bishalbera) via Connector Builder |

</details>
