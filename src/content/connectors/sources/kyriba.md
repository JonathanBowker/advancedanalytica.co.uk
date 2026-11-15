---
generated_record: true
connector_name: Kyriba
connector_type: source
connector_slug: kyriba
connector_directory: source-kyriba
definition_id: 547dc08e-ab51-421d-953b-8f3745201a8c
version: 0.1.60
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/kyriba
logo: /images/connectors/sources/kyriba.svg
logo_source_path: airbyte-integrations/connectors/source-kyriba/icon.svg
logo_sha256: 89fd13aa317e2bddbddbe05002b3fa5aec0eb3dbd00afd5daa98d117c4b903df
original_metadata_path: airbyte-integrations/connectors/source-kyriba/metadata.yaml
original_metadata_sha256: 25918c37431415fc7b753c4ff76f81b5fc4ec69fbaaebaff0add458b97dc82fd
original_document_path: docs/integrations/sources/kyriba.md
original_document_sha256: 795df155b3127ea50ce522a159a18febc6c263cd95fa4315a61188c76db270dd
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 6d1118d6af04ec4a28e0d6d06c3d0e3404f85a9e21e34523c669ca151298f3ba
rewritten_at: 2026-11-12T13:44:51.424504+00:00
---

# Kyriba

<HideInUI>

Use this page to set up the [Kyriba](https://www.kyriba.com/) source connector and find reference information.

</HideInUI>

## Overview

The Kyriba source retrieves data from [Kyriba](https://kyriba.com/) through its [JSON REST APIs](https://developer.kyriba.com/apiCatalog/).

## Prerequisites

- Kyriba domain
- Username
- Password

## Setup

### Set up Kyriba in Airbyte

1. Sign in to your [Airbyte Cloud](https://cloud.airbyte.com/workspaces) account or Airbyte Open Source account.
2. Go to **Sources** in the left sidebar. Click **+ New source** in the top-right corner.
3. Select **Kyriba** from the available sources.
4. For **Source name**, enter a descriptive name that helps you identify this source.
5. For **Domain**, enter your Kyriba domain.
6. Enter your **Username** and **Password** for basic authentication.
7. Specify the **Start Date** when data syncing should begin.
8. (Optional) Specify an End Date for the last date through which data should sync.

<HideInUI>

## Supported sync modes

The Kyriba source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh
- Incremental

## Supported streams

- [Accounts](https://developer.kyriba.com/site/global/apis/accounts/index.gsp)
- [Bank Balances](https://developer.kyriba.com/site/global/apis/bank-statement-balances/index.gsp) - End of Day and Intraday
- [Cash Balances](https://developer.kyriba.com/site/global/apis/cash-balances/index.gsp) - End of Day and Intraday
- [Cash Flows](https://developer.kyriba.com/site/global/apis/cash-flows/index.gsp)

## Limitations and troubleshooting

<details>
<summary>
Expand to see details about Kyriba connector limitations and troubleshooting.
</summary>

### Connector limitations

#### Rate limits

The Kyriba connector shouldn't encounter API limits during normal use. [Create an issue](https://github.com/airbytehq/airbyte/issues) if rate-limit issues aren't retried successfully.

### Troubleshooting

- Find common troubleshooting guidance for the Stripe source connector on our [Airbyte Forum](https://github.com/airbytehq/airbyte/discussions).

</details>

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                      |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| 0.1.60 | 2026-10-07 | [88198](https://github.com/airbytehq/airbyte/pull/88198) | Fix placeholder `documentationUrl` in spec and give a clearer error when Kyriba returns 403 on login |
| 0.1.59 | 2025-10-14 | [68065](https://github.com/airbytehq/airbyte/pull/68065) | Update dependencies |
| 0.1.58 | 2025-10-07 | [67525](https://github.com/airbytehq/airbyte/pull/67525) | Update dependencies |
| 0.1.57 | 2025-09-30 | [66818](https://github.com/airbytehq/airbyte/pull/66818) | Update dependencies |
| 0.1.56 | 2025-09-24 | [66651](https://github.com/airbytehq/airbyte/pull/66651) | Update dependencies |
| 0.1.55 | 2025-09-09 | [66053](https://github.com/airbytehq/airbyte/pull/66053) | Update dependencies |
| 0.1.54 | 2025-08-23 | [65343](https://github.com/airbytehq/airbyte/pull/65343) | Update dependencies |
| 0.1.53 | 2025-08-16 | [64981](https://github.com/airbytehq/airbyte/pull/64981) | Update dependencies |
| 0.1.52 | 2025-08-09 | [64610](https://github.com/airbytehq/airbyte/pull/64610) | Update dependencies |
| 0.1.51 | 2025-07-19 | [63485](https://github.com/airbytehq/airbyte/pull/63485) | Update dependencies |
| 0.1.50 | 2025-07-12 | [63140](https://github.com/airbytehq/airbyte/pull/63140) | Update dependencies |
| 0.1.49 | 2025-07-05 | [62542](https://github.com/airbytehq/airbyte/pull/62542) | Update dependencies |
| 0.1.48 | 2025-06-28 | [62187](https://github.com/airbytehq/airbyte/pull/62187) | Update dependencies |
| 0.1.47 | 2025-06-21 | [61841](https://github.com/airbytehq/airbyte/pull/61841) | Update dependencies |
| 0.1.46 | 2025-06-14 | [61113](https://github.com/airbytehq/airbyte/pull/61113) | Update dependencies |
| 0.1.45 | 2025-05-24 | [60657](https://github.com/airbytehq/airbyte/pull/60657) | Update dependencies |
| 0.1.44 | 2025-05-10 | [59816](https://github.com/airbytehq/airbyte/pull/59816) | Update dependencies |
| 0.1.43 | 2025-05-03 | [59226](https://github.com/airbytehq/airbyte/pull/59226) | Update dependencies |
| 0.1.42 | 2025-04-26 | [58751](https://github.com/airbytehq/airbyte/pull/58751) | Update dependencies |
| 0.1.41 | 2025-04-19 | [58211](https://github.com/airbytehq/airbyte/pull/58211) | Update dependencies |
| 0.1.40 | 2025-04-12 | [57711](https://github.com/airbytehq/airbyte/pull/57711) | Update dependencies |
| 0.1.39 | 2025-04-05 | [57025](https://github.com/airbytehq/airbyte/pull/57025) | Update dependencies |
| 0.1.38 | 2025-03-29 | [56654](https://github.com/airbytehq/airbyte/pull/56654) | Update dependencies |
| 0.1.37 | 2025-03-22 | [56042](https://github.com/airbytehq/airbyte/pull/56042) | Update dependencies |
| 0.1.36 | 2025-03-08 | [55425](https://github.com/airbytehq/airbyte/pull/55425) | Update dependencies |
| 0.1.35 | 2025-03-01 | [54788](https://github.com/airbytehq/airbyte/pull/54788) | Update dependencies |
| 0.1.34 | 2025-02-22 | [54320](https://github.com/airbytehq/airbyte/pull/54320) | Update dependencies |
| 0.1.33 | 2025-02-15 | [53817](https://github.com/airbytehq/airbyte/pull/53817) | Update dependencies |
| 0.1.32 | 2025-02-01 | [52788](https://github.com/airbytehq/airbyte/pull/52788) | Update dependencies |
| 0.1.31 | 2025-01-25 | [51787](https://github.com/airbytehq/airbyte/pull/51787) | Update dependencies |
| 0.1.30 | 2025-01-11 | [51171](https://github.com/airbytehq/airbyte/pull/51171) | Update dependencies |
| 0.1.29 | 2024-12-28 | [50617](https://github.com/airbytehq/airbyte/pull/50617) | Update dependencies |
| 0.1.28 | 2024-12-21 | [50147](https://github.com/airbytehq/airbyte/pull/50147) | Update dependencies |
| 0.1.27 | 2024-12-14 | [48971](https://github.com/airbytehq/airbyte/pull/48971) | Update dependencies |
| 0.1.26 | 2024-11-25 | [48670](https://github.com/airbytehq/airbyte/pull/48670) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.25 | 2024-11-04 | [48314](https://github.com/airbytehq/airbyte/pull/48314) | Update dependencies |
| 0.1.24 | 2024-10-28 | [47079](https://github.com/airbytehq/airbyte/pull/47079) | Update dependencies |
| 0.1.23 | 2024-10-12 | [46830](https://github.com/airbytehq/airbyte/pull/46830) | Update dependencies |
| 0.1.22 | 2024-10-05 | [46459](https://github.com/airbytehq/airbyte/pull/46459) | Update dependencies |
| 0.1.21 | 2024-09-28 | [46203](https://github.com/airbytehq/airbyte/pull/46203) | Update dependencies |
| 0.1.20 | 2024-09-21 | [45816](https://github.com/airbytehq/airbyte/pull/45816) | Update dependencies |
| 0.1.19 | 2024-09-14 | [45569](https://github.com/airbytehq/airbyte/pull/45569) | Update dependencies |
| 0.1.18 | 2024-09-07 | [45306](https://github.com/airbytehq/airbyte/pull/45306) | Update dependencies |
| 0.1.17 | 2024-08-31 | [45049](https://github.com/airbytehq/airbyte/pull/45049) | Update dependencies |
| 0.1.16 | 2024-08-24 | [44688](https://github.com/airbytehq/airbyte/pull/44688) | Update dependencies |
| 0.1.15 | 2024-08-17 | [44352](https://github.com/airbytehq/airbyte/pull/44352) | Update dependencies |
| 0.1.14 | 2024-08-10 | [43546](https://github.com/airbytehq/airbyte/pull/43546) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43256](https://github.com/airbytehq/airbyte/pull/43256) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42825](https://github.com/airbytehq/airbyte/pull/42825) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42289](https://github.com/airbytehq/airbyte/pull/42289) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41885](https://github.com/airbytehq/airbyte/pull/41885) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41452](https://github.com/airbytehq/airbyte/pull/41452) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41147](https://github.com/airbytehq/airbyte/pull/41147) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40874](https://github.com/airbytehq/airbyte/pull/40874) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40367](https://github.com/airbytehq/airbyte/pull/40367) | Update dependencies |
| 0.1.5 | 2024-06-22 | [40111](https://github.com/airbytehq/airbyte/pull/40111) | Update dependencies |
| 0.1.4 | 2024-06-06 | [39232](https://github.com/airbytehq/airbyte/pull/39232) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.3 | 2024-04-19 | [37184](https://github.com/airbytehq/airbyte/pull/37184) | Upgrade to CDK 0.80.0 and manage dependencies with Poetry. |
| 0.1.2 | 2024-04-12 | [37184](https://github.com/airbytehq/airbyte/pull/37184) | schema descriptions |
| 0.1.1 | 2024-01-30 | [34545](https://github.com/airbytehq/airbyte/pull/34545) | Updates CDK, Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.0 | 2022-07-13 | [12748](https://github.com/airbytehq/airbyte/pull/12748) | The Kyriba Source is created |

</details>

</HideInUI>
