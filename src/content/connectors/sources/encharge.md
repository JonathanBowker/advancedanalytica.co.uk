---
generated_record: true
connector_name: Encharge
connector_type: source
connector_slug: encharge
connector_directory: source-encharge
definition_id: 44a57f92-595c-4512-9983-1563b8764b63
version: 0.0.70
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/encharge
logo: /images/connectors/sources/encharge.svg
logo_source_path: airbyte-integrations/connectors/source-encharge/icon.svg
logo_sha256: a12ccf33d0887c2ef2bb823bc9a2ab59e6a6163b98d5680fcd05b2806c2dd510
original_metadata_path: airbyte-integrations/connectors/source-encharge/metadata.yaml
original_metadata_sha256: 468dd0a97d939a8d06661900c3c747263b0ce8a80f3e2f28108d190da9c69f2f
original_document_path: docs/integrations/sources/encharge.md
original_document_sha256: 8e8f1f9c0e2366c8cc8b7aef11d245cb550cffb1eb9688e8aa329179ef1deb93
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 71c21377742465afd5c6f64db8217bc77cf446586b1c703d5afaf363c8ff5c89
rewritten_at: 2026-11-12T13:36:10.229410+00:00
---

# Encharge
Connect Encharge to your data warehouse or other destinations with the Airbyte connector for [Encharge](https://encharge.io/). You can sync marketing automation data from Encharge. This supports better data-driven decisions and stronger marketing insights across platforms.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. The API key to use for authentication |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| peoples | id | DefaultPaginator | ✅ |  ❌  |
| accounts | accountId | No pagination | ✅ |  ❌  |
| account_tags | tag | No pagination | ✅ |  ❌  |
| segments | id | DefaultPaginator | ✅ |  ❌  |
| segment_people | id | DefaultPaginator | ✅ |  ❌  |
| fields | name | No pagination | ✅ |  ❌  |
| schemas | name | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.70 | 2026-11-10 | [91514](https://github.com/airbytehq/airbyte/pull/91514) | Update dependencies |
| 0.0.69 | 2026-11-03 | [90537](https://github.com/airbytehq/airbyte/pull/90537) | Update dependencies |
| 0.0.68 | 2026-10-27 | [89871](https://github.com/airbytehq/airbyte/pull/89871) | Update dependencies |
| 0.0.67 | 2026-10-20 | [89188](https://github.com/airbytehq/airbyte/pull/89188) | Update dependencies |
| 0.0.66 | 2026-10-13 | [88602](https://github.com/airbytehq/airbyte/pull/88602) | Update dependencies |
| 0.0.65 | 2026-10-06 | [87836](https://github.com/airbytehq/airbyte/pull/87836) | Update dependencies |
| 0.0.64 | 2026-09-29 | [87170](https://github.com/airbytehq/airbyte/pull/87170) | Update dependencies |
| 0.0.63 | 2026-09-22 | [86594](https://github.com/airbytehq/airbyte/pull/86594) | Update dependencies |
| 0.0.62 | 2026-09-15 | [86065](https://github.com/airbytehq/airbyte/pull/86065) | Update dependencies |
| 0.0.61 | 2026-09-08 | [85466](https://github.com/airbytehq/airbyte/pull/85466) | Update dependencies |
| 0.0.60 | 2026-08-18 | [84555](https://github.com/airbytehq/airbyte/pull/84555) | Update dependencies |
| 0.0.59 | 2026-08-11 | [83912](https://github.com/airbytehq/airbyte/pull/83912) | Update dependencies |
| 0.0.58 | 2026-08-04 | [83432](https://github.com/airbytehq/airbyte/pull/83432) | Update dependencies |
| 0.0.57 | 2026-07-28 | [82889](https://github.com/airbytehq/airbyte/pull/82889) | Update dependencies |
| 0.0.56 | 2026-07-21 | [82396](https://github.com/airbytehq/airbyte/pull/82396) | Update dependencies |
| 0.0.55 | 2026-07-14 | [81823](https://github.com/airbytehq/airbyte/pull/81823) | Update dependencies |
| 0.0.54 | 2026-06-30 | [81065](https://github.com/airbytehq/airbyte/pull/81065) | Update dependencies |
| 0.0.53 | 2026-06-23 | [80462](https://github.com/airbytehq/airbyte/pull/80462) | Update dependencies |
| 0.0.52 | 2026-06-16 | [79841](https://github.com/airbytehq/airbyte/pull/79841) | Update dependencies |
| 0.0.51 | 2026-06-09 | [79325](https://github.com/airbytehq/airbyte/pull/79325) | Update dependencies |
| 0.0.50 | 2026-06-02 | [78691](https://github.com/airbytehq/airbyte/pull/78691) | Update dependencies |
| 0.0.49 | 2026-04-28 | [77253](https://github.com/airbytehq/airbyte/pull/77253) | Update dependencies |
| 0.0.48 | 2026-04-21 | [76564](https://github.com/airbytehq/airbyte/pull/76564) | Update dependencies |
| 0.0.47 | 2026-03-17 | [74994](https://github.com/airbytehq/airbyte/pull/74994) | Update dependencies |
| 0.0.46 | 2026-03-10 | [73486](https://github.com/airbytehq/airbyte/pull/73486) | Update dependencies |
| 0.0.45 | 2026-02-10 | [73016](https://github.com/airbytehq/airbyte/pull/73016) | Update dependencies |
| 0.0.44 | 2026-02-03 | [72604](https://github.com/airbytehq/airbyte/pull/72604) | Update dependencies |
| 0.0.43 | 2026-01-20 | [71896](https://github.com/airbytehq/airbyte/pull/71896) | Update dependencies |
| 0.0.42 | 2026-01-14 | [71562](https://github.com/airbytehq/airbyte/pull/71562) | Update dependencies |
| 0.0.41 | 2025-12-18 | [70554](https://github.com/airbytehq/airbyte/pull/70554) | Update dependencies |
| 0.0.40 | 2025-11-25 | [70153](https://github.com/airbytehq/airbyte/pull/70153) | Update dependencies |
| 0.0.39 | 2025-11-18 | [69402](https://github.com/airbytehq/airbyte/pull/69402) | Update dependencies |
| 0.0.38 | 2025-10-29 | [68734](https://github.com/airbytehq/airbyte/pull/68734) | Update dependencies |
| 0.0.37 | 2025-10-21 | [68568](https://github.com/airbytehq/airbyte/pull/68568) | Update dependencies |
| 0.0.36 | 2025-10-14 | [67799](https://github.com/airbytehq/airbyte/pull/67799) | Update dependencies |
| 0.0.35 | 2025-10-07 | [67273](https://github.com/airbytehq/airbyte/pull/67273) | Update dependencies |
| 0.0.34 | 2025-09-30 | [66289](https://github.com/airbytehq/airbyte/pull/66289) | Update dependencies |
| 0.0.33 | 2025-09-09 | [65844](https://github.com/airbytehq/airbyte/pull/65844) | Update dependencies |
| 0.0.32 | 2025-08-23 | [65260](https://github.com/airbytehq/airbyte/pull/65260) | Update dependencies |
| 0.0.31 | 2025-08-09 | [64764](https://github.com/airbytehq/airbyte/pull/64764) | Update dependencies |
| 0.0.30 | 2025-07-26 | [64002](https://github.com/airbytehq/airbyte/pull/64002) | Update dependencies |
| 0.0.29 | 2025-07-19 | [63548](https://github.com/airbytehq/airbyte/pull/63548) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63014](https://github.com/airbytehq/airbyte/pull/63014) | Update dependencies |
| 0.0.27 | 2025-07-05 | [62765](https://github.com/airbytehq/airbyte/pull/62765) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62428](https://github.com/airbytehq/airbyte/pull/62428) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61959](https://github.com/airbytehq/airbyte/pull/61959) | Update dependencies |
| 0.0.24 | 2025-06-14 | [61244](https://github.com/airbytehq/airbyte/pull/61244) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60346](https://github.com/airbytehq/airbyte/pull/60346) | Update dependencies |
| 0.0.22 | 2025-05-10 | [60015](https://github.com/airbytehq/airbyte/pull/60015) | Update dependencies |
| 0.0.21 | 2025-05-03 | [59374](https://github.com/airbytehq/airbyte/pull/59374) | Update dependencies |
| 0.0.20 | 2025-04-26 | [58834](https://github.com/airbytehq/airbyte/pull/58834) | Update dependencies |
| 0.0.19 | 2025-04-19 | [58339](https://github.com/airbytehq/airbyte/pull/58339) | Update dependencies |
| 0.0.18 | 2025-04-12 | [57785](https://github.com/airbytehq/airbyte/pull/57785) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57194](https://github.com/airbytehq/airbyte/pull/57194) | Update dependencies |
| 0.0.16 | 2025-03-29 | [56503](https://github.com/airbytehq/airbyte/pull/56503) | Update dependencies |
| 0.0.15 | 2025-03-22 | [55925](https://github.com/airbytehq/airbyte/pull/55925) | Update dependencies |
| 0.0.14 | 2025-03-08 | [55267](https://github.com/airbytehq/airbyte/pull/55267) | Update dependencies |
| 0.0.13 | 2025-03-01 | [54965](https://github.com/airbytehq/airbyte/pull/54965) | Update dependencies |
| 0.0.12 | 2025-02-22 | [54392](https://github.com/airbytehq/airbyte/pull/54392) | Update dependencies |
| 0.0.11 | 2025-02-15 | [53785](https://github.com/airbytehq/airbyte/pull/53785) | Update dependencies |
| 0.0.10 | 2025-02-08 | [53357](https://github.com/airbytehq/airbyte/pull/53357) | Update dependencies |
| 0.0.9 | 2025-02-01 | [52810](https://github.com/airbytehq/airbyte/pull/52810) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52327](https://github.com/airbytehq/airbyte/pull/52327) | Update dependencies |
| 0.0.7 | 2025-01-18 | [51708](https://github.com/airbytehq/airbyte/pull/51708) | Update dependencies |
| 0.0.6 | 2025-01-11 | [51115](https://github.com/airbytehq/airbyte/pull/51115) | Update dependencies |
| 0.0.5 | 2024-12-28 | [50537](https://github.com/airbytehq/airbyte/pull/50537) | Update dependencies |
| 0.0.4 | 2024-12-21 | [50001](https://github.com/airbytehq/airbyte/pull/50001) | Update dependencies |
| 0.0.3 | 2024-12-14 | [49509](https://github.com/airbytehq/airbyte/pull/49509) | Update dependencies |
| 0.0.2 | 2024-12-12 | [49175](https://github.com/airbytehq/airbyte/pull/49175) | Update dependencies |
| 0.0.1 | 2024-11-08 | | Initial release by [@parthiv11](https://github.com/parthiv11) via Connector Builder |

</details>
