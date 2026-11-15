---
generated_record: true
connector_name: Dropbox Sign
connector_type: source
connector_slug: dropbox-sign
connector_directory: source-dropbox-sign
definition_id: da9cccd2-7319-44ea-b6cf-ddc08f13e959
version: 0.0.71
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/dropbox-sign
logo: /images/connectors/sources/dropbox-sign.svg
logo_source_path: airbyte-integrations/connectors/source-dropbox-sign/icon.svg
logo_sha256: 7d36d13e7d04f59d6c94d40a26f27498f3dd98d4639d5731cf9327f99d385d37
original_metadata_path: airbyte-integrations/connectors/source-dropbox-sign/metadata.yaml
original_metadata_sha256: ffb944b8519a80a0a44d50e6583a61ab333d780d5563c243f6ec2578be6527bc
original_document_path: docs/integrations/sources/dropbox-sign.md
original_document_sha256: e0848dee97a1eeba2d1d86299f8855fa043ac4e593bc461e512bfce9d2e98eed
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ec5d78ba57d596a7e9625447513152a00daddc89297f962404a9513180a0412b
rewritten_at: 2026-11-12T13:35:26.911362+00:00
---

# Dropbox Sign
With Dropbox Sign, you can get documents signed securely online in a simple, easy-to-use way.

## Configure Dropbox Sign

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key. API key to use. Find it at https://app.hellosign.com/home/myAccount#api |  |
| `start_date` | `string` | Start date.  |  |

For details about generating an API Key, see [API docs](https://developers.hellosign.com/api/reference/authentication/#api-key-management).

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| signature_requests | signature_request_id | DefaultPaginator | ✅ |  ✅  |
| templates | template_id | DefaultPaginator | ✅ |  ✅  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|---------|------|--------------|---------|
| 0.0.71 | 2026-11-10 | [91497](https://github.com/airbytehq/airbyte/pull/91497) | Update dependencies |
| 0.0.70 | 2026-11-03 | [90534](https://github.com/airbytehq/airbyte/pull/90534) | Update dependencies |
| 0.0.69 | 2026-10-27 | [89895](https://github.com/airbytehq/airbyte/pull/89895) | Update dependencies |
| 0.0.68 | 2026-10-20 | [89194](https://github.com/airbytehq/airbyte/pull/89194) | Update dependencies |
| 0.0.67 | 2026-10-13 | [88578](https://github.com/airbytehq/airbyte/pull/88578) | Update dependencies |
| 0.0.66 | 2026-10-06 | [87841](https://github.com/airbytehq/airbyte/pull/87841) | Update dependencies |
| 0.0.65 | 2026-09-29 | [87176](https://github.com/airbytehq/airbyte/pull/87176) | Update dependencies |
| 0.0.64 | 2026-09-22 | [86597](https://github.com/airbytehq/airbyte/pull/86597) | Update dependencies |
| 0.0.63 | 2026-09-15 | [86048](https://github.com/airbytehq/airbyte/pull/86048) | Update dependencies |
| 0.0.62 | 2026-09-08 | [85461](https://github.com/airbytehq/airbyte/pull/85461) | Update dependencies |
| 0.0.61 | 2026-08-18 | [84583](https://github.com/airbytehq/airbyte/pull/84583) | Update dependencies |
| 0.0.60 | 2026-08-11 | [83936](https://github.com/airbytehq/airbyte/pull/83936) | Update dependencies |
| 0.0.59 | 2026-08-04 | [83438](https://github.com/airbytehq/airbyte/pull/83438) | Update dependencies |
| 0.0.58 | 2026-07-28 | [82906](https://github.com/airbytehq/airbyte/pull/82906) | Update dependencies |
| 0.0.57 | 2026-07-21 | [82382](https://github.com/airbytehq/airbyte/pull/82382) | Update dependencies |
| 0.0.56 | 2026-07-14 | [81787](https://github.com/airbytehq/airbyte/pull/81787) | Update dependencies |
| 0.0.55 | 2026-06-30 | [81034](https://github.com/airbytehq/airbyte/pull/81034) | Update dependencies |
| 0.0.54 | 2026-06-23 | [80428](https://github.com/airbytehq/airbyte/pull/80428) | Update dependencies |
| 0.0.53 | 2026-06-16 | [79814](https://github.com/airbytehq/airbyte/pull/79814) | Update dependencies |
| 0.0.52 | 2026-06-09 | [79261](https://github.com/airbytehq/airbyte/pull/79261) | Update dependencies |
| 0.0.51 | 2026-06-02 | [78638](https://github.com/airbytehq/airbyte/pull/78638) | Update dependencies |
| 0.0.50 | 2026-04-28 | [77229](https://github.com/airbytehq/airbyte/pull/77229) | Update dependencies |
| 0.0.49 | 2026-04-21 | [76570](https://github.com/airbytehq/airbyte/pull/76570) | Update dependencies |
| 0.0.48 | 2026-03-31 | [75773](https://github.com/airbytehq/airbyte/pull/75773) | Update dependencies |
| 0.0.47 | 2026-03-17 | [74472](https://github.com/airbytehq/airbyte/pull/74472) | Update dependencies |
| 0.0.46 | 2026-02-24 | [73920](https://github.com/airbytehq/airbyte/pull/73920) | Update dependencies |
| 0.0.45 | 2026-02-03 | [72618](https://github.com/airbytehq/airbyte/pull/72618) | Update dependencies |
| 0.0.44 | 2026-01-20 | [71915](https://github.com/airbytehq/airbyte/pull/71915) | Update dependencies |
| 0.0.43 | 2026-01-14 | [71559](https://github.com/airbytehq/airbyte/pull/71559) | Update dependencies |
| 0.0.42 | 2025-12-18 | [70565](https://github.com/airbytehq/airbyte/pull/70565) | Update dependencies |
| 0.0.41 | 2025-11-25 | [70184](https://github.com/airbytehq/airbyte/pull/70184) | Update dependencies |
| 0.0.40 | 2025-11-18 | [69387](https://github.com/airbytehq/airbyte/pull/69387) | Update dependencies |
| 0.0.39 | 2025-10-29 | [68748](https://github.com/airbytehq/airbyte/pull/68748) | Update dependencies |
| 0.0.38 | 2025-10-21 | [68576](https://github.com/airbytehq/airbyte/pull/68576) | Update dependencies |
| 0.0.37 | 2025-10-14 | [67724](https://github.com/airbytehq/airbyte/pull/67724) | Update dependencies |
| 0.0.36 | 2025-10-07 | [67280](https://github.com/airbytehq/airbyte/pull/67280) | Update dependencies |
| 0.0.35 | 2025-09-30 | [65845](https://github.com/airbytehq/airbyte/pull/65845) | Update dependencies |
| 0.0.34 | 2025-08-23 | [65242](https://github.com/airbytehq/airbyte/pull/65242) | Update dependencies |
| 0.0.33 | 2025-08-16 | [64757](https://github.com/airbytehq/airbyte/pull/64757) | Update dependencies |
| 0.0.32 | 2025-08-02 | [64331](https://github.com/airbytehq/airbyte/pull/64331) | Update dependencies |
| 0.0.31 | 2025-07-26 | [63935](https://github.com/airbytehq/airbyte/pull/63935) | Update dependencies |
| 0.0.30 | 2025-07-19 | [63598](https://github.com/airbytehq/airbyte/pull/63598) | Update dependencies |
| 0.0.29 | 2025-07-12 | [63019](https://github.com/airbytehq/airbyte/pull/63019) | Update dependencies |
| 0.0.28 | 2025-07-05 | [62813](https://github.com/airbytehq/airbyte/pull/62813) | Update dependencies |
| 0.0.27 | 2025-06-28 | [62364](https://github.com/airbytehq/airbyte/pull/62364) | Update dependencies |
| 0.0.26 | 2025-06-22 | [62007](https://github.com/airbytehq/airbyte/pull/62007) | Update dependencies |
| 0.0.25 | 2025-06-14 | [61182](https://github.com/airbytehq/airbyte/pull/61182) | Update dependencies |
| 0.0.24 | 2025-05-24 | [60345](https://github.com/airbytehq/airbyte/pull/60345) | Update dependencies |
| 0.0.23 | 2025-05-10 | [59416](https://github.com/airbytehq/airbyte/pull/59416) | Update dependencies |
| 0.0.22 | 2025-04-26 | [58899](https://github.com/airbytehq/airbyte/pull/58899) | Update dependencies |
| 0.0.21 | 2025-04-19 | [57775](https://github.com/airbytehq/airbyte/pull/57775) | Update dependencies |
| 0.0.20 | 2025-04-05 | [57230](https://github.com/airbytehq/airbyte/pull/57230) | Update dependencies |
| 0.0.19 | 2025-03-29 | [56527](https://github.com/airbytehq/airbyte/pull/56527) | Update dependencies |
| 0.0.18 | 2025-03-22 | [55916](https://github.com/airbytehq/airbyte/pull/55916) | Update dependencies |
| 0.0.17 | 2025-03-08 | [55326](https://github.com/airbytehq/airbyte/pull/55326) | Update dependencies |
| 0.0.16 | 2025-03-01 | [54961](https://github.com/airbytehq/airbyte/pull/54961) | Update dependencies |
| 0.0.15 | 2025-02-22 | [54445](https://github.com/airbytehq/airbyte/pull/54445) | Update dependencies |
| 0.0.14 | 2025-02-15 | [53779](https://github.com/airbytehq/airbyte/pull/53779) | Update dependencies |
| 0.0.13 | 2025-02-08 | [53321](https://github.com/airbytehq/airbyte/pull/53321) | Update dependencies |
| 0.0.12 | 2025-02-01 | [52850](https://github.com/airbytehq/airbyte/pull/52850) | Update dependencies |
| 0.0.11 | 2025-01-25 | [52321](https://github.com/airbytehq/airbyte/pull/52321) | Update dependencies |
| 0.0.10 | 2025-01-18 | [51662](https://github.com/airbytehq/airbyte/pull/51662) | Update dependencies |
| 0.0.9 | 2025-01-11 | [51076](https://github.com/airbytehq/airbyte/pull/51076) | Update dependencies |
| 0.0.8 | 2024-12-28 | [50553](https://github.com/airbytehq/airbyte/pull/50553) | Update dependencies |
| 0.0.7 | 2024-12-21 | [50021](https://github.com/airbytehq/airbyte/pull/50021) | Update dependencies |
| 0.0.6 | 2024-12-14 | [49528](https://github.com/airbytehq/airbyte/pull/49528) | Update dependencies |
| 0.0.5 | 2024-12-12 | [49181](https://github.com/airbytehq/airbyte/pull/49181) | Update dependencies |
| 0.0.4 | 2024-12-11 | [48946](https://github.com/airbytehq/airbyte/pull/48946) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.3 | 2024-11-04 | [47831](https://github.com/airbytehq/airbyte/pull/47831) | Update dependencies |
| 0.0.2 | 2024-10-28 | [47607](https://github.com/airbytehq/airbyte/pull/47607) | Update dependencies |
| 0.0.1 | 2024-09-20 | | Initial release by [@topefolorunso](https://github.com/topefolorunso) via Connector Builder |

</details>
