---
generated_record: true
connector_name: Pendo
connector_type: source
connector_slug: pendo
connector_directory: source-pendo
definition_id: b1ccb590-e84f-46c0-83a0-2048ccfffdae
version: 0.2.69
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pendo
logo: /images/connectors/sources/pendo.svg
logo_source_path: airbyte-integrations/connectors/source-pendo/icon.svg
logo_sha256: eccb43bce36793b8af962f86e0ba1f0a4fbf41bc2e1399002d6e424ed0ef694b
original_metadata_path: airbyte-integrations/connectors/source-pendo/metadata.yaml
original_metadata_sha256: ea04cbb6c5381e0e516cd71647f4a925510dee09980d3a49f140bc2770fd6475
original_document_path: docs/integrations/sources/pendo.md
original_document_sha256: 674a3af4f4be5d916bf7139805d991e0a74bacb81c36495592249b5f053aeb79
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 2734021617f7af01b3b535a3548b49beaa84abab220406e1753fd6dc3e231f79
rewritten_at: 2026-11-12T13:50:42.215584+00:00
---

# Pendo

Fetch data from the v1 API using the Pendo source connector. Pendo is a powerful product analytics tool.

The aggregation endpoint isn't currently supported. Please [create an issue](https://github.com/airbytehq/airbyte/issues/new/choose) to request support for more streams.

## Prerequisites

- Create a Pendo account and enable the integration feature
- Generate [an API token](https://app.pendo.io/admin/integrationkeys)

## Airbyte Open Source

- Api Token

## Airbyte Cloud

- Api Token

## Setup guide

### Create an integration key in Pendo

1. Log in to the Pendo Application as an Admin user.
2. Visit the **Integrations** section in the Pendo App, then click **Integration Keys**.
3. Click the **Add Integration Key** button in the top-right corner of the screen.
4. Give your new key an appropriate description.
5. If you need a read-write key, tick the box marked **Allow Write Access**.
6. Click **Create** to finish.

### Set up Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. Then, in the top-right corner, click **+ new source**.
3. On the source setup page, select **Pendo** from the Source type dropdown. Then enter a name for this connector.
4. Add **API Key** from the previous step.
5. Click `Set up source`.

### Set up Airbyte Open Source

1. Go to your deployed Airbyte instance, for example, http://localhost:8000
2. In the left navigation bar, click **Sources**. Then, in the top-right corner, click **+ new source**.
3. On the source setup page, select **Pendo** from the Source type dropdown. Then enter a name for this connector.
4. Add **API Key** from the previous step.
5. Click `Set up source`.

## Supported sync modes

The Pendo source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh.

## Supported streams

- [Page](https://engageapi.pendo.io/#a53463f9-bdd3-443e-b22f-b6ea6c7376fb)
- [Feature](https://engageapi.pendo.io/#75c6b443-eb07-4a0c-9e27-6c12ad3dbbc4)
- [Report](https://engageapi.pendo.io/#2ac0699a-b653-4082-be11-563e5c0c9410)
- [Guide](https://engageapi.pendo.io/#4f1e3ca1-fc41-4469-bf4b-da90ee8caf3d)

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.2.69 | 2026-11-10 | [90683](https://github.com/airbytehq/airbyte/pull/90683) | Update dependencies |
| 0.2.68 | 2026-10-27 | [90006](https://github.com/airbytehq/airbyte/pull/90006) | Update dependencies |
| 0.2.67 | 2026-10-20 | [89332](https://github.com/airbytehq/airbyte/pull/89332) | Update dependencies |
| 0.2.66 | 2026-10-13 | [88757](https://github.com/airbytehq/airbyte/pull/88757) | Update dependencies |
| 0.2.65 | 2026-10-06 | [87991](https://github.com/airbytehq/airbyte/pull/87991) | Update dependencies |
| 0.2.64 | 2026-09-29 | [87281](https://github.com/airbytehq/airbyte/pull/87281) | Update dependencies |
| 0.2.63 | 2026-09-22 | [86767](https://github.com/airbytehq/airbyte/pull/86767) | Update dependencies |
| 0.2.62 | 2026-09-15 | [86165](https://github.com/airbytehq/airbyte/pull/86165) | Update dependencies |
| 0.2.61 | 2026-09-08 | [85589](https://github.com/airbytehq/airbyte/pull/85589) | Update dependencies |
| 0.2.60 | 2026-08-18 | [84687](https://github.com/airbytehq/airbyte/pull/84687) | Update dependencies |
| 0.2.59 | 2026-08-11 | [84055](https://github.com/airbytehq/airbyte/pull/84055) | Update dependencies |
| 0.2.58 | 2026-08-04 | [83582](https://github.com/airbytehq/airbyte/pull/83582) | Update dependencies |
| 0.2.57 | 2026-07-28 | [83045](https://github.com/airbytehq/airbyte/pull/83045) | Update dependencies |
| 0.2.56 | 2026-07-21 | [82525](https://github.com/airbytehq/airbyte/pull/82525) | Update dependencies |
| 0.2.55 | 2026-07-14 | [81949](https://github.com/airbytehq/airbyte/pull/81949) | Update dependencies |
| 0.2.54 | 2026-06-30 | [81184](https://github.com/airbytehq/airbyte/pull/81184) | Update dependencies |
| 0.2.53 | 2026-06-23 | [80587](https://github.com/airbytehq/airbyte/pull/80587) | Update dependencies |
| 0.2.52 | 2026-06-16 | [79984](https://github.com/airbytehq/airbyte/pull/79984) | Update dependencies |
| 0.2.51 | 2026-06-09 | [79400](https://github.com/airbytehq/airbyte/pull/79400) | Update dependencies |
| 0.2.50 | 2026-06-02 | [78901](https://github.com/airbytehq/airbyte/pull/78901) | Update dependencies |
| 0.2.49 | 2026-04-28 | [77337](https://github.com/airbytehq/airbyte/pull/77337) | Update dependencies |
| 0.2.48 | 2026-04-21 | [76713](https://github.com/airbytehq/airbyte/pull/76713) | Update dependencies |
| 0.2.47 | 2026-03-31 | [75826](https://github.com/airbytehq/airbyte/pull/75826) | Update dependencies |
| 0.2.46 | 2026-03-24 | [74455](https://github.com/airbytehq/airbyte/pull/74455) | Update dependencies |
| 0.2.45 | 2026-02-24 | [73847](https://github.com/airbytehq/airbyte/pull/73847) | Update dependencies |
| 0.2.44 | 2026-02-17 | [73577](https://github.com/airbytehq/airbyte/pull/73577) | Update dependencies |
| 0.2.43 | 2026-02-10 | [72684](https://github.com/airbytehq/airbyte/pull/72684) | Update dependencies |
| 0.2.42 | 2026-01-20 | [72170](https://github.com/airbytehq/airbyte/pull/72170) | Update dependencies |
| 0.2.41 | 2026-01-14 | [71581](https://github.com/airbytehq/airbyte/pull/71581) | Update dependencies |
| 0.2.40 | 2025-12-18 | [70488](https://github.com/airbytehq/airbyte/pull/70488) | Update dependencies |
| 0.2.39 | 2025-11-25 | [69976](https://github.com/airbytehq/airbyte/pull/69976) | Update dependencies |
| 0.2.38 | 2025-11-18 | [69657](https://github.com/airbytehq/airbyte/pull/69657) | Update dependencies |
| 0.2.37 | 2025-10-29 | [69000](https://github.com/airbytehq/airbyte/pull/69000) | Update dependencies |
| 0.2.36 | 2025-10-21 | [68257](https://github.com/airbytehq/airbyte/pull/68257) | Update dependencies |
| 0.2.35 | 2025-10-14 | [67797](https://github.com/airbytehq/airbyte/pull/67797) | Update dependencies |
| 0.2.34 | 2025-10-07 | [67335](https://github.com/airbytehq/airbyte/pull/67335) | Update dependencies |
| 0.2.33 | 2025-09-30 | [66386](https://github.com/airbytehq/airbyte/pull/66386) | Update dependencies |
| 0.2.32 | 2025-09-10 | [65849](https://github.com/airbytehq/airbyte/pull/65849) | Update dependencies |
| 0.2.31 | 2025-08-23 | [65206](https://github.com/airbytehq/airbyte/pull/65206) | Update dependencies |
| 0.2.30 | 2025-08-09 | [64692](https://github.com/airbytehq/airbyte/pull/64692) | Update dependencies |
| 0.2.29 | 2025-08-02 | [64213](https://github.com/airbytehq/airbyte/pull/64213) | Update dependencies |
| 0.2.28 | 2025-07-26 | [63924](https://github.com/airbytehq/airbyte/pull/63924) | Update dependencies |
| 0.2.27 | 2025-07-19 | [63434](https://github.com/airbytehq/airbyte/pull/63434) | Update dependencies |
| 0.2.26 | 2025-07-12 | [63264](https://github.com/airbytehq/airbyte/pull/63264) | Update dependencies |
| 0.2.25 | 2025-07-05 | [62594](https://github.com/airbytehq/airbyte/pull/62594) | Update dependencies |
| 0.2.24 | 2025-06-28 | [62298](https://github.com/airbytehq/airbyte/pull/62298) | Update dependencies |
| 0.2.23 | 2025-06-21 | [60580](https://github.com/airbytehq/airbyte/pull/60580) | Update dependencies |
| 0.2.22 | 2025-05-11 | [60204](https://github.com/airbytehq/airbyte/pull/60204) | Update dependencies |
| 0.2.21 | 2025-05-04 | [59515](https://github.com/airbytehq/airbyte/pull/59515) | Update dependencies |
| 0.2.20 | 2025-04-27 | [59104](https://github.com/airbytehq/airbyte/pull/59104) | Update dependencies |
| 0.2.19 | 2025-04-19 | [58485](https://github.com/airbytehq/airbyte/pull/58485) | Update dependencies |
| 0.2.18 | 2025-04-12 | [57883](https://github.com/airbytehq/airbyte/pull/57883) | Update dependencies |
| 0.2.17 | 2025-04-05 | [57367](https://github.com/airbytehq/airbyte/pull/57367) | Update dependencies |
| 0.2.16 | 2025-03-29 | [56742](https://github.com/airbytehq/airbyte/pull/56742) | Update dependencies |
| 0.2.15 | 2025-03-22 | [56161](https://github.com/airbytehq/airbyte/pull/56161) | Update dependencies |
| 0.2.14 | 2025-03-08 | [55559](https://github.com/airbytehq/airbyte/pull/55559) | Update dependencies |
| 0.2.13 | 2025-03-01 | [55031](https://github.com/airbytehq/airbyte/pull/55031) | Update dependencies |
| 0.2.12 | 2025-02-23 | [54580](https://github.com/airbytehq/airbyte/pull/54580) | Update dependencies |
| 0.2.11 | 2025-02-15 | [54003](https://github.com/airbytehq/airbyte/pull/54003) | Update dependencies |
| 0.2.10 | 2025-02-08 | [53456](https://github.com/airbytehq/airbyte/pull/53456) | Update dependencies |
| 0.2.9 | 2025-02-01 | [52970](https://github.com/airbytehq/airbyte/pull/52970) | Update dependencies |
| 0.2.8 | 2025-01-25 | [52524](https://github.com/airbytehq/airbyte/pull/52524) | Update dependencies |
| 0.2.7 | 2025-01-18 | [51901](https://github.com/airbytehq/airbyte/pull/51901) | Update dependencies |
| 0.2.6 | 2025-01-11 | [51299](https://github.com/airbytehq/airbyte/pull/51299) | Update dependencies |
| 0.2.5 | 2025-01-04 | [50244](https://github.com/airbytehq/airbyte/pull/50244) | Update dependencies |
| 0.2.4 | 2024-12-14 | [48313](https://github.com/airbytehq/airbyte/pull/48313) | Update dependencies |
| 0.2.3 | 2024-10-29 | [47847](https://github.com/airbytehq/airbyte/pull/47847) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47563](https://github.com/airbytehq/airbyte/pull/47563) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-15 | [44100](https://github.com/airbytehq/airbyte/pull/44100) | Refactor connector to manifest-only format |
| 0.1.16 | 2024-08-10 | [43593](https://github.com/airbytehq/airbyte/pull/43593) | Update dependencies |
| 0.1.15 | 2024-08-03 | [43114](https://github.com/airbytehq/airbyte/pull/43114) | Update dependencies |
| 0.1.14 | 2024-07-27 | [42791](https://github.com/airbytehq/airbyte/pull/42791) | Update dependencies |
| 0.1.13 | 2024-07-20 | [42236](https://github.com/airbytehq/airbyte/pull/42236) | Update dependencies |
| 0.1.12 | 2024-07-13 | [41769](https://github.com/airbytehq/airbyte/pull/41769) | Update dependencies |
| 0.1.11 | 2024-07-10 | [41421](https://github.com/airbytehq/airbyte/pull/41421) | Update dependencies |
| 0.1.10 | 2024-07-09 | [41094](https://github.com/airbytehq/airbyte/pull/41094) | Update dependencies |
| 0.1.9 | 2024-07-06 | [40984](https://github.com/airbytehq/airbyte/pull/40984) | Update dependencies |
| 0.1.8 | 2024-06-25 | [40343](https://github.com/airbytehq/airbyte/pull/40343) | Update dependencies |
| 0.1.7 | 2024-06-22 | [40105](https://github.com/airbytehq/airbyte/pull/40105) | Update dependencies |
| 0.1.6 | 2024-06-04 | [39069](https://github.com/airbytehq/airbyte/pull/39069) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.5 | 2024-05-20 | [38226](https://github.com/airbytehq/airbyte/pull/38226) | Make connector compatible with the builder |
| 0.1.4 | 2024-04-19 | [37220](https://github.com/airbytehq/airbyte/pull/37220) | Updating to 0.80.0 CDK |
| 0.1.3 | 2024-04-18 | [37220](https://github.com/airbytehq/airbyte/pull/37220) | Manage dependencies with Poetry. |
| 0.1.2 | 2024-04-15 | [37220](https://github.com/airbytehq/airbyte/pull/37220) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.1 | 2024-04-12 | [37220](https://github.com/airbytehq/airbyte/pull/37220) | schema descriptions |
| 0.1.0 | 2023-03-14 | [3563](https://github.com/airbytehq/airbyte/pull/3563) | Initial Release |

</details>
