---
generated_record: true
connector_name: Hibob
connector_type: source
connector_slug: hibob
connector_directory: source-hibob
definition_id: 4dc991ed-3dcc-4c40-ac28-9402836709f1
version: 0.2.69
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/hibob
logo: /images/connectors/sources/hibob.svg
logo_source_path: airbyte-integrations/connectors/source-hibob/icon.svg
logo_sha256: f35793a98a42d15dd264f78a4ae5a9cb69dfa3fa0d0bd8ee0360a7f592b99686
original_metadata_path: airbyte-integrations/connectors/source-hibob/metadata.yaml
original_metadata_sha256: e1ce3a9c3c75e607c13f6343ef8735fd5f5e32d9a7ba3579751be7ee666c9175
original_document_path: docs/integrations/sources/hibob.md
original_document_sha256: 13ab5a1f477077d404c11e65c4971f0828f371364cfad74e8b52d1eafa9787ed
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 63ec98295ba4d07fdedc20e084c6f206db2a3e9f77c508afbacf6eebc40e4299
rewritten_at: 2026-11-12T14:09:30.006717+00:00
---

# HiBob

Set up the HiBob source connector and find its reference information on this page.

## Prerequisites

- At least a [HiBob account](https://www.hibob.com)
<!-- env:oss -->
- A HiBob Token generated [here](https://apidocs.hibob.com/reference/getting-started-with-bob-api#test-endpoints)
  <!-- /env:oss -->

## Set up HiBob

<!-- env:oss -->

### Step 1: Set up a HiBob account for Airbyte Open Source

Set up an account in [HiBob](https://www.hibob.com/).


### Step 2: Get an API key for Airbyte Open Source

You only need a simple API key to access the HiBob API. Generate this token [here](https://apidocs.hibob.com/docs/api-service-users#step-1-create-a-new-api-service-user).


#### Airbyte Cloud

Set up HiBob as a source in Airbyte Cloud:

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **HiBob** from the available sources.
4. Enter your chosen **Source name**.
5. Enter the **api key** you obtained from HiBob.
6. Click **Set up source** and wait for the tests to finish.

<!-- /env:cloud -->

<!-- env:oss -->

#### Airbyte Open Source

Set up HiBob as a source in Airbyte Open Source:

1. Log in to your Airbyte Open Source account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **HiBob** from the available sources.
4. Enter your chosen **Source name**.
5. Enter the **api key** you obtained from HiBob.
6. Click **Set up source** and wait for the tests to finish.

<!-- /env:oss -->

## Supported sync modes

The HiBob source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)

The HiBob connector doesn't currently support incremental modes.

## Supported streams

The HiBob source connector can sync these streams.

### Main tables

See the HiBob API documentation [here](https://apidocs.hibob.com/docs/).

- [Profiles](https://apidocs.hibob.com/reference/get_profiles)

- [Payroll](https://apidocs.hibob.com/reference/get_payroll-history)

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version  | Date       | Pull Request                                             | Subject                                                                                                                              |
|:---------|:-----------|:---------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| 0.2.69 | 2026-11-10 | [91572](https://github.com/airbytehq/airbyte/pull/91572) | Update dependencies |
| 0.2.68 | 2026-11-03 | [90600](https://github.com/airbytehq/airbyte/pull/90600) | Update dependencies |
| 0.2.67 | 2026-10-27 | [89946](https://github.com/airbytehq/airbyte/pull/89946) | Update dependencies |
| 0.2.66 | 2026-10-20 | [89247](https://github.com/airbytehq/airbyte/pull/89247) | Update dependencies |
| 0.2.65 | 2026-10-13 | [88649](https://github.com/airbytehq/airbyte/pull/88649) | Update dependencies |
| 0.2.64 | 2026-10-06 | [87875](https://github.com/airbytehq/airbyte/pull/87875) | Update dependencies |
| 0.2.63 | 2026-09-29 | [87232](https://github.com/airbytehq/airbyte/pull/87232) | Update dependencies |
| 0.2.62 | 2026-09-22 | [86673](https://github.com/airbytehq/airbyte/pull/86673) | Update dependencies |
| 0.2.61 | 2026-09-15 | [86074](https://github.com/airbytehq/airbyte/pull/86074) | Update dependencies |
| 0.2.60 | 2026-09-08 | [85511](https://github.com/airbytehq/airbyte/pull/85511) | Update dependencies |
| 0.2.59 | 2026-08-18 | [84631](https://github.com/airbytehq/airbyte/pull/84631) | Update dependencies |
| 0.2.58 | 2026-08-11 | [83988](https://github.com/airbytehq/airbyte/pull/83988) | Update dependencies |
| 0.2.57 | 2026-08-04 | [83491](https://github.com/airbytehq/airbyte/pull/83491) | Update dependencies |
| 0.2.56 | 2026-07-28 | [82974](https://github.com/airbytehq/airbyte/pull/82974) | Update dependencies |
| 0.2.55 | 2026-07-21 | [82448](https://github.com/airbytehq/airbyte/pull/82448) | Update dependencies |
| 0.2.54 | 2026-07-14 | [81871](https://github.com/airbytehq/airbyte/pull/81871) | Update dependencies |
| 0.2.53 | 2026-06-30 | [81107](https://github.com/airbytehq/airbyte/pull/81107) | Update dependencies |
| 0.2.52 | 2026-06-23 | [80513](https://github.com/airbytehq/airbyte/pull/80513) | Update dependencies |
| 0.2.51 | 2026-06-16 | [79918](https://github.com/airbytehq/airbyte/pull/79918) | Update dependencies |
| 0.2.50 | 2026-06-09 | [79353](https://github.com/airbytehq/airbyte/pull/79353) | Update dependencies |
| 0.2.49 | 2026-06-02 | [78757](https://github.com/airbytehq/airbyte/pull/78757) | Update dependencies |
| 0.2.48 | 2026-04-28 | [77270](https://github.com/airbytehq/airbyte/pull/77270) | Update dependencies |
| 0.2.47 | 2026-04-21 | [76618](https://github.com/airbytehq/airbyte/pull/76618) | Update dependencies |
| 0.2.46 | 2026-03-31 | [75735](https://github.com/airbytehq/airbyte/pull/75735) | Update dependencies |
| 0.2.45 | 2026-03-24 | [75352](https://github.com/airbytehq/airbyte/pull/75352) | Update dependencies |
| 0.2.44 | 2026-03-10 | [74683](https://github.com/airbytehq/airbyte/pull/74683) | Update dependencies |
| 0.2.43 | 2026-02-24 | [73966](https://github.com/airbytehq/airbyte/pull/73966) | Update dependencies |
| 0.2.42 | 2026-02-03 | [72636](https://github.com/airbytehq/airbyte/pull/72636) | Update dependencies |
| 0.2.41 | 2026-01-20 | [71872](https://github.com/airbytehq/airbyte/pull/71872) | Update dependencies |
| 0.2.40 | 2026-01-14 | [71734](https://github.com/airbytehq/airbyte/pull/71734) | Update dependencies |
| 0.2.39 | 2025-12-18 | [70520](https://github.com/airbytehq/airbyte/pull/70520) | Update dependencies |
| 0.2.38 | 2025-11-25 | [70032](https://github.com/airbytehq/airbyte/pull/70032) | Update dependencies |
| 0.2.37 | 2025-11-18 | [69418](https://github.com/airbytehq/airbyte/pull/69418) | Update dependencies |
| 0.2.36 | 2025-10-29 | [68829](https://github.com/airbytehq/airbyte/pull/68829) | Update dependencies |
| 0.2.35 | 2025-10-21 | [68251](https://github.com/airbytehq/airbyte/pull/68251) | Update dependencies |
| 0.2.34 | 2025-10-14 | [67915](https://github.com/airbytehq/airbyte/pull/67915) | Update dependencies |
| 0.2.33 | 2025-10-07 | [67404](https://github.com/airbytehq/airbyte/pull/67404) | Update dependencies |
| 0.2.32 | 2025-09-30 | [66400](https://github.com/airbytehq/airbyte/pull/66400) | Update dependencies |
| 0.2.31 | 2025-09-09 | [66072](https://github.com/airbytehq/airbyte/pull/66072) | Update dependencies |
| 0.2.30 | 2025-08-23 | [65377](https://github.com/airbytehq/airbyte/pull/65377) | Update dependencies |
| 0.2.29 | 2025-08-09 | [64624](https://github.com/airbytehq/airbyte/pull/64624) | Update dependencies |
| 0.2.28 | 2025-08-02 | [64219](https://github.com/airbytehq/airbyte/pull/64219) | Update dependencies |
| 0.2.27 | 2025-07-26 | [63816](https://github.com/airbytehq/airbyte/pull/63816) | Update dependencies |
| 0.2.26 | 2025-07-19 | [63526](https://github.com/airbytehq/airbyte/pull/63526) | Update dependencies |
| 0.2.25 | 2025-07-12 | [60699](https://github.com/airbytehq/airbyte/pull/60699) | Update dependencies |
| 0.2.24 | 2025-06-10 | [61501](https://github.com/airbytehq/airbyte/pull/61501) | Add employees stream |
| 0.2.23 | 2025-05-10 | [59801](https://github.com/airbytehq/airbyte/pull/59801) | Update dependencies |
| 0.2.22 | 2025-05-03 | [58784](https://github.com/airbytehq/airbyte/pull/58784) | Update dependencies |
| 0.2.21 | 2025-04-19 | [58206](https://github.com/airbytehq/airbyte/pull/58206) | Update dependencies |
| 0.2.20 | 2025-04-12 | [57740](https://github.com/airbytehq/airbyte/pull/57740) | Update dependencies |
| 0.2.19 | 2025-04-05 | [57099](https://github.com/airbytehq/airbyte/pull/57099) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56646](https://github.com/airbytehq/airbyte/pull/56646) | Update dependencies |
| 0.2.17 | 2025-03-22 | [56067](https://github.com/airbytehq/airbyte/pull/56067) | Update dependencies |
| 0.2.16 | 2025-03-10 | [55674](https://github.com/airbytehq/airbyte/pull/55674) | Change check stream from payrolls to profiles |
| 0.2.15 | 2025-03-08 | [55484](https://github.com/airbytehq/airbyte/pull/55484) | Update dependencies |
| 0.2.14 | 2025-03-01 | [54742](https://github.com/airbytehq/airbyte/pull/54742) | Update dependencies |
| 0.2.13 | 2025-02-22 | [54314](https://github.com/airbytehq/airbyte/pull/54314) | Update dependencies |
| 0.2.12 | 2025-02-15 | [53809](https://github.com/airbytehq/airbyte/pull/53809) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53265](https://github.com/airbytehq/airbyte/pull/53265) | Update dependencies |
| 0.2.10 | 2025-02-01 | [52737](https://github.com/airbytehq/airbyte/pull/52737) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52220](https://github.com/airbytehq/airbyte/pull/52220) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51802](https://github.com/airbytehq/airbyte/pull/51802) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51201](https://github.com/airbytehq/airbyte/pull/51201) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50628](https://github.com/airbytehq/airbyte/pull/50628) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50132](https://github.com/airbytehq/airbyte/pull/50132) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49595](https://github.com/airbytehq/airbyte/pull/49595) | Update dependencies |
| 0.2.3 | 2024-12-12 | [49240](https://github.com/airbytehq/airbyte/pull/49240) | Update dependencies |
| 0.2.2 | 2024-12-11 | [48972](https://github.com/airbytehq/airbyte/pull/48972) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.1 | 2024-10-28 | [47672](https://github.com/airbytehq/airbyte/pull/47672) | Update dependencies |
| 0.2.0 | 2024-08-21 | [44542](https://github.com/airbytehq/airbyte/pull/44542) | Refactor connector to manifest-only format |
| 0.1.3 | 2024-08-17 | [44298](https://github.com/airbytehq/airbyte/pull/44298) | Update dependencies |
| 0.1.2 | 2024-08-12 | [43853](https://github.com/airbytehq/airbyte/pull/43853) | Update dependencies |
| 0.1.1 | 2024-08-10 | [43519](https://github.com/airbytehq/airbyte/pull/43519) | Update dependencies |
| 0.1.0 | 2024-08-06 | [43336](https://github.com/airbytehq/airbyte/pull/43336) | New Source: HiBob |
</details>
