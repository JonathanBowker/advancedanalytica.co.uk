---
generated_record: true
connector_name: KYVE
connector_type: source
connector_slug: kyve
connector_directory: source-kyve
definition_id: 60a1efcc-c31c-4c63-b508-5b48b6a9f4a6
version: 0.2.54
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/kyve
logo: /images/connectors/sources/kyve.svg
logo_source_path: airbyte-integrations/connectors/source-kyve/icon.svg
logo_sha256: 97c41515e812caa1f83db2921db5d0b6f8e3880cd5abd8f8d7fc526b54ea8dfc
original_metadata_path: airbyte-integrations/connectors/source-kyve/metadata.yaml
original_metadata_sha256: fb47692cd2a0343bf33eb10ffcd2e03875a96a28b02288bc73e87d00dddf95c7
original_document_path: docs/integrations/sources/kyve.md
original_document_sha256: 596b1beb9733c2521ab38c21b7713156aa67cfdf2a2c842da7e4fef20b078f71
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 593190f9d57320369fbaac732a4375f7b0bdab4445545c8bbfa3ba46e0c0a644
rewritten_at: 2026-11-12T13:44:52.686819+00:00
---

# KYVE

Use this page to set up the **KYVE** source connector and find reference information.

The KYVE Data Pipeline imports KYVE data into any data warehouse or destination supported by [Airbyte](https://airbyte.com/). The `ELT` format lets data analysts and engineers source KYVE data confidently, without concerns about validity or reliability.

To set up an end-to-end pipeline with this connector, see [the documentation](https://docs.kyve.network/data_engineers/accessing_data/elt_pipeline/overview).

## Configure the source

1. To create an ELT pipeline with the KYVE source, specify the **`Pool-ID`** of [KYVE storage pool](https://app.kyve.network/#/pools) you want to retrieve data from.

2. To narrow the records retrieved from the pool, specify a **`Bundle-Start-ID`**. You can find valid bundles in the KYVE app, for example [Cosmos Hub pool](https://app.kyve.network/#/pools/0/bundles).

3. To extract validated data from KYVE, specify the endpoint that **`KYVE-API URL Base`** will request. By default, the official KYVE **`mainnet`** endpoint provides the data for [these pools](https://app.kyve.network/#/pools).

   **_Note:_**
   KYVE Network has three separate networks. _Korellia_ is the `devnet` for development, while _Kaon_ is the `testnet` for testing. **`mainnet`** is the official network. You can use data validated through Kaon and Korellia for development. However, you should only trust data validated on Mainnet.

## Fetch multiple pools

You can fetch multiple pools simultaneously with one source configuration. For each KYVE storage pool you want to archive, specify its **`Pool-IDs`** and **`Bundle-Start-ID`**, separated by commas.

## Allow IP addresses

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request | Subject                                              |
| :------ | :--------- | :----------- | :--------------------------------------------------- |
| 0.2.54 | 2026-10-07 | [88269](https://github.com/airbytehq/airbyte/pull/88269) | Skip hash verification for bundles without a `data_hash` instead of failing with `AssertionError`; raise a descriptive error on hash mismatch |
| 0.2.53 | 2026-10-07 | [88168](https://github.com/airbytehq/airbyte/pull/88168) | Format unit test data with the repository ruff version |
| 0.2.52 | 2025-10-14 | [68066](https://github.com/airbytehq/airbyte/pull/68066) | Update dependencies |
| 0.2.51 | 2025-10-07 | [67529](https://github.com/airbytehq/airbyte/pull/67529) | Update dependencies |
| 0.2.50 | 2025-09-30 | [66819](https://github.com/airbytehq/airbyte/pull/66819) | Update dependencies |
| 0.2.49 | 2025-09-24 | [66652](https://github.com/airbytehq/airbyte/pull/66652) | Update dependencies |
| 0.2.48 | 2025-09-09 | [66064](https://github.com/airbytehq/airbyte/pull/66064) | Update dependencies |
| 0.2.47 | 2025-08-23 | [64971](https://github.com/airbytehq/airbyte/pull/64971) | Update dependencies |
| 0.2.46 | 2025-08-09 | [64589](https://github.com/airbytehq/airbyte/pull/64589) | Update dependencies |
| 0.2.45 | 2025-07-19 | [63450](https://github.com/airbytehq/airbyte/pull/63450) | Update dependencies |
| 0.2.44 | 2025-07-12 | [63093](https://github.com/airbytehq/airbyte/pull/63093) | Update dependencies |
| 0.2.43 | 2025-07-05 | [62580](https://github.com/airbytehq/airbyte/pull/62580) | Update dependencies |
| 0.2.42 | 2025-06-28 | [62154](https://github.com/airbytehq/airbyte/pull/62154) | Update dependencies |
| 0.2.41 | 2025-06-21 | [61867](https://github.com/airbytehq/airbyte/pull/61867) | Update dependencies |
| 0.2.40 | 2025-06-14 | [61151](https://github.com/airbytehq/airbyte/pull/61151) | Update dependencies |
| 0.2.39 | 2025-05-24 | [60619](https://github.com/airbytehq/airbyte/pull/60619) | Update dependencies |
| 0.2.38 | 2025-05-10 | [59796](https://github.com/airbytehq/airbyte/pull/59796) | Update dependencies |
| 0.2.37 | 2025-05-03 | [59300](https://github.com/airbytehq/airbyte/pull/59300) | Update dependencies |
| 0.2.36 | 2025-04-26 | [58166](https://github.com/airbytehq/airbyte/pull/58166) | Update dependencies |
| 0.2.35 | 2025-04-12 | [57714](https://github.com/airbytehq/airbyte/pull/57714) | Update dependencies |
| 0.2.34 | 2025-04-05 | [57054](https://github.com/airbytehq/airbyte/pull/57054) | Update dependencies |
| 0.2.33 | 2025-03-29 | [56675](https://github.com/airbytehq/airbyte/pull/56675) | Update dependencies |
| 0.2.32 | 2025-03-22 | [55428](https://github.com/airbytehq/airbyte/pull/55428) | Update dependencies |
| 0.2.31 | 2025-03-01 | [54786](https://github.com/airbytehq/airbyte/pull/54786) | Update dependencies |
| 0.2.30 | 2025-02-22 | [54357](https://github.com/airbytehq/airbyte/pull/54357) | Update dependencies |
| 0.2.29 | 2025-02-15 | [53854](https://github.com/airbytehq/airbyte/pull/53854) | Update dependencies |
| 0.2.28 | 2025-02-01 | [52712](https://github.com/airbytehq/airbyte/pull/52712) | Update dependencies |
| 0.2.27 | 2025-01-25 | [51779](https://github.com/airbytehq/airbyte/pull/51779) | Update dependencies |
| 0.2.26 | 2025-01-11 | [51140](https://github.com/airbytehq/airbyte/pull/51140) | Update dependencies |
| 0.2.25 | 2024-12-28 | [50668](https://github.com/airbytehq/airbyte/pull/50668) | Update dependencies |
| 0.2.24 | 2024-12-21 | [50149](https://github.com/airbytehq/airbyte/pull/50149) | Update dependencies |
| 0.2.23 | 2024-12-14 | [48985](https://github.com/airbytehq/airbyte/pull/48985) | Update dependencies |
| 0.2.22 | 2024-11-25 | [48651](https://github.com/airbytehq/airbyte/pull/48651) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.21 | 2024-11-04 | [48190](https://github.com/airbytehq/airbyte/pull/48190) | Update dependencies |
| 0.2.20 | 2024-10-28 | [47078](https://github.com/airbytehq/airbyte/pull/47078) | Update dependencies |
| 0.2.19 | 2024-10-12 | [46477](https://github.com/airbytehq/airbyte/pull/46477) | Update dependencies |
| 0.2.18 | 2024-09-28 | [45815](https://github.com/airbytehq/airbyte/pull/45815) | Update dependencies |
| 0.2.17 | 2024-09-14 | [45493](https://github.com/airbytehq/airbyte/pull/45493) | Update dependencies |
| 0.2.16 | 2024-09-07 | [45219](https://github.com/airbytehq/airbyte/pull/45219) | Update dependencies |
| 0.2.15 | 2024-08-31 | [44955](https://github.com/airbytehq/airbyte/pull/44955) | Update dependencies |
| 0.2.14 | 2024-08-24 | [44687](https://github.com/airbytehq/airbyte/pull/44687) | Update dependencies |
| 0.2.13 | 2024-08-17 | [44218](https://github.com/airbytehq/airbyte/pull/44218) | Update dependencies |
| 0.2.12 | 2024-08-10 | [43671](https://github.com/airbytehq/airbyte/pull/43671) | Update dependencies |
| 0.2.11 | 2024-08-03 | [43059](https://github.com/airbytehq/airbyte/pull/43059) | Update dependencies |
| 0.2.10 | 2024-07-27 | [42736](https://github.com/airbytehq/airbyte/pull/42736) | Update dependencies |
| 0.2.9 | 2024-07-20 | [42279](https://github.com/airbytehq/airbyte/pull/42279) | Update dependencies |
| 0.2.8 | 2024-07-13 | [41749](https://github.com/airbytehq/airbyte/pull/41749) | Update dependencies |
| 0.2.7 | 2024-07-10 | [41422](https://github.com/airbytehq/airbyte/pull/41422) | Update dependencies |
| 0.2.6 | 2024-07-09 | [41239](https://github.com/airbytehq/airbyte/pull/41239) | Update dependencies |
| 0.2.5 | 2024-07-06 | [40859](https://github.com/airbytehq/airbyte/pull/40859) | Update dependencies |
| 0.2.4 | 2024-06-26 | [40268](https://github.com/airbytehq/airbyte/pull/40268) | Update dependencies |
| 0.2.3 | 2024-06-24 | [40049](https://github.com/airbytehq/airbyte/pull/40049) | Update dependencies |
| 0.2.2 | 2024-06-04 | [39004](https://github.com/airbytehq/airbyte/pull/39004) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.1 | 2024-05-21 | [38514](https://github.com/airbytehq/airbyte/pull/38514) | [autopull] base image + poetry + up_to_date |
| 0.2.0   | 2023-11-10 |              | Update KYVE source to support to Mainnet and Testnet |
| 0.1.0   | 2023-05-25 |              | Initial release of KYVE source connector             |

</details>
