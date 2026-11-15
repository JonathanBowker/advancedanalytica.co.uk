---
generated_record: true
connector_name: Timely
connector_type: source
connector_slug: timely
connector_directory: source-timely
definition_id: bc617b5f-1b9e-4a2d-bebe-782fd454a771
version: 1.0.60
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/timely
logo: /images/connectors/sources/timely.svg
logo_source_path: airbyte-integrations/connectors/source-timely/icon.svg
logo_sha256: 77bcd577dd8522d4503f55379f488080beffb17196cb8d18d81343fb40fc30a7
original_metadata_path: airbyte-integrations/connectors/source-timely/metadata.yaml
original_metadata_sha256: 9b9dbe63ea1b01d8b91ad009e2e992a7dc2462de195ac7db46d7a4b2738909a6
original_document_path: docs/integrations/sources/timely.md
original_document_sha256: 221241c99e516279b69de0a595003afaf15c86a6d3bba36a671d6f1df007856d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a2d8837408b6a83540236fabde91fc3e103ff3e36024ed7ed649fa7662db9695
rewritten_at: 2026-11-12T13:58:42.972231+00:00
---

# Timely

Use this page to set up the Timely source connector and review its reference information.

## Prerequisites

1. Follow these [steps](https://dev.timelyapp.com/#authorization) to get `Bearer Token` for your account.
2. Sign in to your `https://app.timelyapp.com` portal and find the `Account ID` in the URL. For example: URL `https://app.timelyapp.com/12345/calendar` and account-id `12345`.
3. Choose a start date for your events. Use the date format `YYYY-MM-DDTHH:mm:ssZ`.

## Setup guide

## Step 1: Set up the Timely connector in Airbyte

### For Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Select **Sources** in the left navigation bar. Then select **+new source** in the top-right corner.
3. On the Set up the source page, enter a name for the Timely connector. Select **Timely** from the Source type dropdown.
4. Enter your `Bearer Token`, `Account ID` and `Start Date`.
5. Select `Authenticate your account`.
6. Select **Set up source**.

## Supported sync modes

The Timely source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- |:-----------|
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |

## IP allow list

If you use Airbyte Cloud and access is restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
|:--------|:-----------|:---------------------------------------------------------|:--------------------------------------------------------------------------------|
| 1.0.60 | 2026-11-10 | [91729](https://github.com/airbytehq/airbyte/pull/91729) | Update dependencies |
| 1.0.59 | 2026-11-03 | [90772](https://github.com/airbytehq/airbyte/pull/90772) | Update dependencies |
| 1.0.58 | 2026-10-20 | [89440](https://github.com/airbytehq/airbyte/pull/89440) | Update dependencies |
| 1.0.57 | 2026-10-13 | [88822](https://github.com/airbytehq/airbyte/pull/88822) | Update dependencies |
| 1.0.56 | 2026-10-06 | [88052](https://github.com/airbytehq/airbyte/pull/88052) | Update dependencies |
| 1.0.55 | 2026-09-29 | [87362](https://github.com/airbytehq/airbyte/pull/87362) | Update dependencies |
| 1.0.54 | 2026-09-22 | [86859](https://github.com/airbytehq/airbyte/pull/86859) | Update dependencies |
| 1.0.53 | 2026-09-15 | [86239](https://github.com/airbytehq/airbyte/pull/86239) | Update dependencies |
| 1.0.52 | 2026-09-08 | [85691](https://github.com/airbytehq/airbyte/pull/85691) | Update dependencies |
| 1.0.51 | 2026-08-18 | [84784](https://github.com/airbytehq/airbyte/pull/84784) | Update dependencies |
| 1.0.50 | 2026-08-11 | [84157](https://github.com/airbytehq/airbyte/pull/84157) | Update dependencies |
| 1.0.49 | 2026-08-04 | [83611](https://github.com/airbytehq/airbyte/pull/83611) | Update dependencies |
| 1.0.48 | 2026-07-28 | [83133](https://github.com/airbytehq/airbyte/pull/83133) | Update dependencies |
| 1.0.47 | 2026-07-21 | [82633](https://github.com/airbytehq/airbyte/pull/82633) | Update dependencies |
| 1.0.46 | 2026-07-14 | [82030](https://github.com/airbytehq/airbyte/pull/82030) | Update dependencies |
| 1.0.45 | 2026-06-30 | [81261](https://github.com/airbytehq/airbyte/pull/81261) | Update dependencies |
| 1.0.44 | 2026-06-23 | [80679](https://github.com/airbytehq/airbyte/pull/80679) | Update dependencies |
| 1.0.43 | 2026-06-16 | [80055](https://github.com/airbytehq/airbyte/pull/80055) | Update dependencies |
| 1.0.42 | 2026-06-09 | [79522](https://github.com/airbytehq/airbyte/pull/79522) | Update dependencies |
| 1.0.41 | 2026-06-02 | [79052](https://github.com/airbytehq/airbyte/pull/79052) | Update dependencies |
| 1.0.40 | 2026-04-28 | [77464](https://github.com/airbytehq/airbyte/pull/77464) | Update dependencies |
| 1.0.39 | 2026-04-21 | [76756](https://github.com/airbytehq/airbyte/pull/76756) | Update dependencies |
| 1.0.38 | 2026-03-17 | [75043](https://github.com/airbytehq/airbyte/pull/75043) | Update dependencies |
| 1.0.37 | 2026-03-10 | [74549](https://github.com/airbytehq/airbyte/pull/74549) | Update dependencies |
| 1.0.36 | 2026-02-24 | [73848](https://github.com/airbytehq/airbyte/pull/73848) | Update dependencies |
| 1.0.35 | 2026-02-17 | [73510](https://github.com/airbytehq/airbyte/pull/73510) | Update dependencies |
| 1.0.34 | 2026-02-10 | [73100](https://github.com/airbytehq/airbyte/pull/73100) | Update dependencies |
| 1.0.33 | 2026-02-03 | [72755](https://github.com/airbytehq/airbyte/pull/72755) | Update dependencies |
| 1.0.32 | 2026-01-20 | [72031](https://github.com/airbytehq/airbyte/pull/72031) | Update dependencies |
| 1.0.31 | 2026-01-14 | [71408](https://github.com/airbytehq/airbyte/pull/71408) | Update dependencies |
| 1.0.30 | 2025-12-18 | [70741](https://github.com/airbytehq/airbyte/pull/70741) | Update dependencies |
| 1.0.29 | 2025-11-25 | [69850](https://github.com/airbytehq/airbyte/pull/69850) | Update dependencies |
| 1.0.28 | 2025-11-18 | [69705](https://github.com/airbytehq/airbyte/pull/69705) | Update dependencies |
| 1.0.27 | 2025-10-29 | [68855](https://github.com/airbytehq/airbyte/pull/68855) | Update dependencies |
| 1.0.26 | 2025-10-21 | [68562](https://github.com/airbytehq/airbyte/pull/68562) | Update dependencies |
| 1.0.25 | 2025-10-14 | [67863](https://github.com/airbytehq/airbyte/pull/67863) | Update dependencies |
| 1.0.24 | 2025-10-07 | [67514](https://github.com/airbytehq/airbyte/pull/67514) | Update dependencies |
| 1.0.23 | 2025-09-30 | [66838](https://github.com/airbytehq/airbyte/pull/66838) | Update dependencies |
| 1.0.22 | 2025-09-24 | [66601](https://github.com/airbytehq/airbyte/pull/66601) | Update dependencies |
| 1.0.21 | 2025-09-09 | [65705](https://github.com/airbytehq/airbyte/pull/65705) | Update dependencies |
| 1.0.20 | 2025-08-24 | [65443](https://github.com/airbytehq/airbyte/pull/65443) | Update dependencies |
| 1.0.19 | 2025-08-10 | [64834](https://github.com/airbytehq/airbyte/pull/64834) | Update dependencies |
| 1.0.18 | 2025-08-02 | [64446](https://github.com/airbytehq/airbyte/pull/64446) | Update dependencies |
| 1.0.17 | 2025-07-19 | [63636](https://github.com/airbytehq/airbyte/pull/63636) | Update dependencies |
| 1.0.16 | 2025-07-12 | [63091](https://github.com/airbytehq/airbyte/pull/63091) | Update dependencies |
| 1.0.15 | 2025-06-28 | [62210](https://github.com/airbytehq/airbyte/pull/62210) | Update dependencies |
| 1.0.14 | 2025-06-14 | [61296](https://github.com/airbytehq/airbyte/pull/61296) | Update dependencies |
| 1.0.13 | 2025-05-25 | [60502](https://github.com/airbytehq/airbyte/pull/60502) | Update dependencies |
| 1.0.12 | 2025-05-10 | [60144](https://github.com/airbytehq/airbyte/pull/60144) | Update dependencies |
| 1.0.11 | 2025-05-04 | [59595](https://github.com/airbytehq/airbyte/pull/59595) | Update dependencies |
| 1.0.10 | 2025-04-27 | [58974](https://github.com/airbytehq/airbyte/pull/58974) | Update dependencies |
| 1.0.9 | 2025-04-19 | [58409](https://github.com/airbytehq/airbyte/pull/58409) | Update dependencies |
| 1.0.8 | 2025-04-12 | [57933](https://github.com/airbytehq/airbyte/pull/57933) | Update dependencies |
| 1.0.7 | 2025-04-05 | [57442](https://github.com/airbytehq/airbyte/pull/57442) | Update dependencies |
| 1.0.6 | 2025-03-29 | [56868](https://github.com/airbytehq/airbyte/pull/56868) | Update dependencies |
| 1.0.5 | 2025-03-22 | [56290](https://github.com/airbytehq/airbyte/pull/56290) | Update dependencies |
| 1.0.4 | 2025-03-08 | [55633](https://github.com/airbytehq/airbyte/pull/55633) | Update dependencies |
| 1.0.3 | 2025-03-01 | [55084](https://github.com/airbytehq/airbyte/pull/55084) | Update dependencies |
| 1.0.2 | 2025-02-22 | [54528](https://github.com/airbytehq/airbyte/pull/54528) | Update dependencies |
| 1.0.1 | 2025-02-15 | [54055](https://github.com/airbytehq/airbyte/pull/54055) | Update dependencies |
| 1.0.0 | 2025-01-07 | [45925](https://github.com/airbytehq/airbyte/pull/45925) | Add new streams, add incremental syncs, tidy inputs |
| 0.4.13 | 2025-02-08 | [53561](https://github.com/airbytehq/airbyte/pull/53561) | Update dependencies |
| 0.4.12 | 2025-02-01 | [53061](https://github.com/airbytehq/airbyte/pull/53061) | Update dependencies |
| 0.4.11 | 2025-01-25 | [52384](https://github.com/airbytehq/airbyte/pull/52384) | Update dependencies |
| 0.4.10 | 2025-01-18 | [52012](https://github.com/airbytehq/airbyte/pull/52012) | Update dependencies |
| 0.4.9 | 2025-01-11 | [51398](https://github.com/airbytehq/airbyte/pull/51398) | Update dependencies |
| 0.4.8 | 2024-12-28 | [50777](https://github.com/airbytehq/airbyte/pull/50777) | Update dependencies |
| 0.4.7 | 2024-12-21 | [50349](https://github.com/airbytehq/airbyte/pull/50349) | Update dependencies |
| 0.4.6 | 2024-12-14 | [49769](https://github.com/airbytehq/airbyte/pull/49769) | Update dependencies |
| 0.4.5 | 2024-12-12 | [49387](https://github.com/airbytehq/airbyte/pull/49387) | Update dependencies |
| 0.4.4 | 2024-12-11 | [48307](https://github.com/airbytehq/airbyte/pull/48307) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.4.3 | 2024-10-29 | [47887](https://github.com/airbytehq/airbyte/pull/47887) | Update dependencies |
| 0.4.2 | 2024-10-28 | [47503](https://github.com/airbytehq/airbyte/pull/47503) | Update dependencies |
| 0.4.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.4.0 | 2024-08-07 | [43368](https://github.com/airbytehq/airbyte/pull/43368) | Refactor connector to manifest-only format |
| 0.3.15 | 2024-08-03 | [43226](https://github.com/airbytehq/airbyte/pull/43226) | Update dependencies |
| 0.3.14 | 2024-07-27 | [42635](https://github.com/airbytehq/airbyte/pull/42635) | Update dependencies |
| 0.3.13 | 2024-07-20 | [42252](https://github.com/airbytehq/airbyte/pull/42252) | Update dependencies |
| 0.3.12 | 2024-07-13 | [41921](https://github.com/airbytehq/airbyte/pull/41921) | Update dependencies |
| 0.3.11 | 2024-07-10 | [41348](https://github.com/airbytehq/airbyte/pull/41348) | Update dependencies |
| 0.3.10 | 2024-07-09 | [41268](https://github.com/airbytehq/airbyte/pull/41268) | Update dependencies |
| 0.3.9 | 2024-07-06 | [40773](https://github.com/airbytehq/airbyte/pull/40773) | Update dependencies |
| 0.3.8 | 2024-06-26 | [40510](https://github.com/airbytehq/airbyte/pull/40510) | Update dependencies |
| 0.3.7 | 2024-06-22 | [39996](https://github.com/airbytehq/airbyte/pull/39996) | Update dependencies |
| 0.3.6 | 2024-06-04 | [39054](https://github.com/airbytehq/airbyte/pull/39054) | [autopull] Upgrade base image to v1.2.1 |
| 0.3.5 | 2024-05-20 | [38228](https://github.com/airbytehq/airbyte/pull/38228) | Make compatible with builder |
| 0.3.4 | 2024-04-19 | [37270](https://github.com/airbytehq/airbyte/pull/37270) | Updating to 0.80.0 CDK |
| 0.3.3 | 2024-04-18 | [37270](https://github.com/airbytehq/airbyte/pull/37270) | Manage dependencies with Poetry. |
| 0.3.2 | 2024-04-15 | [37270](https://github.com/airbytehq/airbyte/pull/37270) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.3.1 | 2024-04-12 | [37270](https://github.com/airbytehq/airbyte/pull/37270) | schema descriptions |
| 0.3.0 | 2023-10-25 | [31002](https://github.com/airbytehq/airbyte/pull/31002) | Migrate to low-code framework |
| 0.2.0 | 2023-10-23 | [31745](https://github.com/airbytehq/airbyte/pull/31745) | Fix schemas |
| 0.1.0 | 2022-06-22 | [13617](https://github.com/airbytehq/airbyte/pull/13617) | Initial release |

</details>
