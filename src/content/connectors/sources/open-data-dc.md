---
generated_record: true
connector_name: Open Data DC
connector_type: source
connector_slug: open-data-dc
connector_directory: source-open-data-dc
definition_id: 1178ad64-72bb-4326-86fb-b623663842b6
version: 0.0.69
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/open-data-dc
logo: /images/connectors/sources/open-data-dc.svg
logo_source_path: airbyte-integrations/connectors/source-open-data-dc/icon.svg
logo_sha256: 8f0c6b1d11e45cfa5ac392671605bb368877ef35be14e53395acd4a18fd89ede
original_metadata_path: airbyte-integrations/connectors/source-open-data-dc/metadata.yaml
original_metadata_sha256: f3fac299df03fa2340b4f48a0e8301cf71d84231c6870a441fee8e9bdd505b3e
original_document_path: docs/integrations/sources/open-data-dc.md
original_document_sha256: 7f523997e1e6dd15028c246de6f0f2672cf76b69ba6a65352c9fdd10626bf6c2
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 2b412d546d2d9fad110b80cef9be66c0bda4da523158a2321f553dbe9f149eac
rewritten_at: 2026-11-12T13:49:19.053615+00:00
---

# Open Data DC

The Open Data DC source connector ingests data from the MAR 2 API.

## Prerequisites

Create a developer MAR account at https://developers.data.dc.gov/ to get your API key.

The MAR 2 API lets you search for addresses, place names, blocks and intersections within the DC boundary.
Enter your search string in the `location` field.

MARID is the Master Address Repository ID linked to every address within the DC boundary.

## Set up the Open Data DC source connector

1. Click **Sources**, then click **+ New source**.
2. On the Set up the source page, select **Open Data DC** from the Source type dropdown.
3. Enter a name for your new source.
4. For **API Key**, enter the API key you obtained in the previous step.
5. For **location**, enter any string to search for a location, as explained in the previous step.
6. For **marid**, enter your MARID, as explained in the previous step.
7. Click **Set up source**.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `location` | `string` | location. address or place or block |  |
| `marid` | `string` | marid. A unique identifier (Master Address Repository). |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| locations |  | No pagination | ✅ |  ❌  |
| units | UnitNum | No pagination | ✅ |  ❌  |
| ssls | SSL | No pagination | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.69 | 2026-11-10 | [91656](https://github.com/airbytehq/airbyte/pull/91656) | Update dependencies |
| 0.0.68 | 2026-11-03 | [90682](https://github.com/airbytehq/airbyte/pull/90682) | Update dependencies |
| 0.0.67 | 2026-10-27 | [90005](https://github.com/airbytehq/airbyte/pull/90005) | Update dependencies |
| 0.0.66 | 2026-10-20 | [89351](https://github.com/airbytehq/airbyte/pull/89351) | Update dependencies |
| 0.0.65 | 2026-10-13 | [88760](https://github.com/airbytehq/airbyte/pull/88760) | Update dependencies |
| 0.0.64 | 2026-10-06 | [87958](https://github.com/airbytehq/airbyte/pull/87958) | Update dependencies |
| 0.0.63 | 2026-09-29 | [87302](https://github.com/airbytehq/airbyte/pull/87302) | Update dependencies |
| 0.0.62 | 2026-09-22 | [86750](https://github.com/airbytehq/airbyte/pull/86750) | Update dependencies |
| 0.0.61 | 2026-09-15 | [86163](https://github.com/airbytehq/airbyte/pull/86163) | Update dependencies |
| 0.0.60 | 2026-09-08 | [85613](https://github.com/airbytehq/airbyte/pull/85613) | Update dependencies |
| 0.0.59 | 2026-08-18 | [84709](https://github.com/airbytehq/airbyte/pull/84709) | Update dependencies |
| 0.0.58 | 2026-08-11 | [84047](https://github.com/airbytehq/airbyte/pull/84047) | Update dependencies |
| 0.0.57 | 2026-08-04 | [83558](https://github.com/airbytehq/airbyte/pull/83558) | Update dependencies |
| 0.0.56 | 2026-07-28 | [83028](https://github.com/airbytehq/airbyte/pull/83028) | Update dependencies |
| 0.0.55 | 2026-07-21 | [82546](https://github.com/airbytehq/airbyte/pull/82546) | Update dependencies |
| 0.0.54 | 2026-07-14 | [81935](https://github.com/airbytehq/airbyte/pull/81935) | Update dependencies |
| 0.0.53 | 2026-06-30 | [81197](https://github.com/airbytehq/airbyte/pull/81197) | Update dependencies |
| 0.0.52 | 2026-06-23 | [80603](https://github.com/airbytehq/airbyte/pull/80603) | Update dependencies |
| 0.0.51 | 2026-06-16 | [79972](https://github.com/airbytehq/airbyte/pull/79972) | Update dependencies |
| 0.0.50 | 2026-06-09 | [79430](https://github.com/airbytehq/airbyte/pull/79430) | Update dependencies |
| 0.0.49 | 2026-06-02 | [78885](https://github.com/airbytehq/airbyte/pull/78885) | Update dependencies |
| 0.0.48 | 2026-04-28 | [77327](https://github.com/airbytehq/airbyte/pull/77327) | Update dependencies |
| 0.0.47 | 2026-04-21 | [75663](https://github.com/airbytehq/airbyte/pull/75663) | Update dependencies |
| 0.0.46 | 2026-03-17 | [74238](https://github.com/airbytehq/airbyte/pull/74238) | Update dependencies |
| 0.0.45 | 2026-02-10 | [73075](https://github.com/airbytehq/airbyte/pull/73075) | Update dependencies |
| 0.0.44 | 2026-01-20 | [71657](https://github.com/airbytehq/airbyte/pull/71657) | Update dependencies |
| 0.0.43 | 2025-12-18 | [70499](https://github.com/airbytehq/airbyte/pull/70499) | Update dependencies |
| 0.0.42 | 2025-11-25 | [70085](https://github.com/airbytehq/airbyte/pull/70085) | Update dependencies |
| 0.0.41 | 2025-11-18 | [69667](https://github.com/airbytehq/airbyte/pull/69667) | Update dependencies |
| 0.0.40 | 2025-10-29 | [68708](https://github.com/airbytehq/airbyte/pull/68708) | Update dependencies |
| 0.0.39 | 2025-10-21 | [68400](https://github.com/airbytehq/airbyte/pull/68400) | Update dependencies |
| 0.0.38 | 2025-10-14 | [67748](https://github.com/airbytehq/airbyte/pull/67748) | Update dependencies |
| 0.0.37 | 2025-10-07 | [67424](https://github.com/airbytehq/airbyte/pull/67424) | Update dependencies |
| 0.0.36 | 2025-09-30 | [66926](https://github.com/airbytehq/airbyte/pull/66926) | Update dependencies |
| 0.0.35 | 2025-09-24 | [66621](https://github.com/airbytehq/airbyte/pull/66621) | Update dependencies |
| 0.0.34 | 2025-09-09 | [65841](https://github.com/airbytehq/airbyte/pull/65841) | Update dependencies |
| 0.0.33 | 2025-08-23 | [65197](https://github.com/airbytehq/airbyte/pull/65197) | Update dependencies |
| 0.0.32 | 2025-08-09 | [64741](https://github.com/airbytehq/airbyte/pull/64741) | Update dependencies |
| 0.0.31 | 2025-08-02 | [64251](https://github.com/airbytehq/airbyte/pull/64251) | Update dependencies |
| 0.0.30 | 2025-07-26 | [63880](https://github.com/airbytehq/airbyte/pull/63880) | Update dependencies |
| 0.0.29 | 2025-07-19 | [63386](https://github.com/airbytehq/airbyte/pull/63386) | Update dependencies |
| 0.0.28 | 2025-07-12 | [63190](https://github.com/airbytehq/airbyte/pull/63190) | Update dependencies |
| 0.0.27 | 2025-07-05 | [62589](https://github.com/airbytehq/airbyte/pull/62589) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62386](https://github.com/airbytehq/airbyte/pull/62386) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61870](https://github.com/airbytehq/airbyte/pull/61870) | Update dependencies |
| 0.0.24 | 2025-06-14 | [61072](https://github.com/airbytehq/airbyte/pull/61072) | Update dependencies |
| 0.0.23 | 2025-05-24 | [60517](https://github.com/airbytehq/airbyte/pull/60517) | Update dependencies |
| 0.0.22 | 2025-05-10 | [60068](https://github.com/airbytehq/airbyte/pull/60068) | Update dependencies |
| 0.0.21 | 2025-05-03 | [59463](https://github.com/airbytehq/airbyte/pull/59463) | Update dependencies |
| 0.0.20 | 2025-04-27 | [59096](https://github.com/airbytehq/airbyte/pull/59096) | Update dependencies |
| 0.0.19 | 2025-04-19 | [58464](https://github.com/airbytehq/airbyte/pull/58464) | Update dependencies |
| 0.0.18 | 2025-04-12 | [57307](https://github.com/airbytehq/airbyte/pull/57307) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56178](https://github.com/airbytehq/airbyte/pull/56178) | Update dependencies |
| 0.0.16 | 2025-03-08 | [55544](https://github.com/airbytehq/airbyte/pull/55544) | Update dependencies |
| 0.0.15 | 2025-03-01 | [55032](https://github.com/airbytehq/airbyte/pull/55032) | Update dependencies |
| 0.0.14 | 2025-02-23 | [54614](https://github.com/airbytehq/airbyte/pull/54614) | Update dependencies |
| 0.0.13 | 2025-02-15 | [53992](https://github.com/airbytehq/airbyte/pull/53992) | Update dependencies |
| 0.0.12 | 2025-02-08 | [53454](https://github.com/airbytehq/airbyte/pull/53454) | Update dependencies |
| 0.0.11 | 2025-02-01 | [52977](https://github.com/airbytehq/airbyte/pull/52977) | Update dependencies |
| 0.0.10 | 2025-01-25 | [52498](https://github.com/airbytehq/airbyte/pull/52498) | Update dependencies |
| 0.0.9 | 2025-01-18 | [51893](https://github.com/airbytehq/airbyte/pull/51893) | Update dependencies |
| 0.0.8 | 2025-01-11 | [51349](https://github.com/airbytehq/airbyte/pull/51349) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50239](https://github.com/airbytehq/airbyte/pull/50239) | Update dependencies |
| 0.0.6 | 2024-12-14 | [49703](https://github.com/airbytehq/airbyte/pull/49703) | Update dependencies |
| 0.0.5 | 2024-12-12 | [49364](https://github.com/airbytehq/airbyte/pull/49364) | Update dependencies |
| 0.0.4 | 2024-12-11 | [49096](https://github.com/airbytehq/airbyte/pull/49096) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.3 | 2024-10-29 | [47912](https://github.com/airbytehq/airbyte/pull/47912) | Update dependencies |
| 0.0.2 | 2024-10-28 | [47594](https://github.com/airbytehq/airbyte/pull/47594) | Update dependencies |
| 0.0.1 | 2024-10-06 | | Initial release by [@aazam-gh](https://github.com/aazam-gh) via Connector Builder |

</details>
