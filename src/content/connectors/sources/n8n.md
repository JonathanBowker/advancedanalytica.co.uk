---
generated_record: true
connector_name: n8n
connector_type: source
connector_slug: n8n
connector_directory: source-n8n
definition_id: 4a961f66-5e99-4430-8320-a73afe52f7a2
version: 0.2.14
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/n8n
logo: /images/connectors/sources/n8n.svg
logo_source_path: airbyte-integrations/connectors/source-n8n/icon.svg
logo_sha256: d6b814b4a87836beff5138ca759b486671da40baeb59ab4f2b81ba1f923fa013
original_metadata_path: airbyte-integrations/connectors/source-n8n/metadata.yaml
original_metadata_sha256: 8a61da7ba7770c28eadc00591b11bc2501fd7a21f05956f14d755583984a4132
original_document_path: docs/integrations/sources/n8n.md
original_document_sha256: c01309ade60f54f3956319140b8ef5fac51767fddc23d2a38e53b00f2e70d37d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 078380e70f0b90b8501c0473ad07a6172779c1bc7819d47f3ec6b09314460add
rewritten_at: 2026-11-12T13:47:50.916579+00:00
---

# N8n

## Sync overview

This source syncs data from [N8n](https://docs.n8n.io/api/). It currently supports full refresh syncs only. Each sync starts from scratch and includes all available records.

## Supported streams

- [executions](https://docs.n8n.io/api/api-reference/#tag/Execution/paths/~1executions/get)

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

## Get started

You need an n8n instance or the cloud version.

### Create an API key

- Log in to n8n.
- Go to Settings > API.
- Select Create an API key.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                           |
| :------ | :--------- | :------------------------------------------------------- | :-------------------------------- |
| 0.2.14 | 2026-11-10 | [91395](https://github.com/airbytehq/airbyte/pull/91395) | Upgrade base image to `source-declarative-manifest` 7.47.0 |
| 0.2.13 | 2026-10-09 | [88414](https://github.com/airbytehq/airbyte/pull/88414) | Mark `api_key` as `airbyte_secret` |
| 0.2.12 | 2026-04-28 | [60138](https://github.com/airbytehq/airbyte/pull/60138) | Update dependencies |
| 0.2.11 | 2025-05-03 | [59471](https://github.com/airbytehq/airbyte/pull/59471) | Update dependencies |
| 0.2.10 | 2025-04-27 | [59082](https://github.com/airbytehq/airbyte/pull/59082) | Update dependencies |
| 0.2.9 | 2025-04-19 | [58528](https://github.com/airbytehq/airbyte/pull/58528) | Update dependencies |
| 0.2.8 | 2025-04-12 | [57855](https://github.com/airbytehq/airbyte/pull/57855) | Update dependencies |
| 0.2.7 | 2025-04-05 | [57320](https://github.com/airbytehq/airbyte/pull/57320) | Update dependencies |
| 0.2.6 | 2025-03-29 | [56659](https://github.com/airbytehq/airbyte/pull/56659) | Update dependencies |
| 0.2.5 | 2025-03-22 | [56061](https://github.com/airbytehq/airbyte/pull/56061) | Update dependencies |
| 0.2.4 | 2025-03-08 | [55505](https://github.com/airbytehq/airbyte/pull/55505) | Update dependencies |
| 0.2.3 | 2025-03-01 | [54751](https://github.com/airbytehq/airbyte/pull/54751) | Update dependencies |
| 0.2.2 | 2025-02-22 | [54313](https://github.com/airbytehq/airbyte/pull/54313) | Update dependencies |
| 0.2.1 | 2025-02-15 | [47529](https://github.com/airbytehq/airbyte/pull/47529) | Update dependencies |
| 0.2.0 | 2024-10-06 | [46520](https://github.com/airbytehq/airbyte/pull/46520) | Migrate to Manifest-only |
| 0.1.21 | 2024-10-05 | [46407](https://github.com/airbytehq/airbyte/pull/46407) | Update dependencies |
| 0.1.20 | 2024-09-28 | [46125](https://github.com/airbytehq/airbyte/pull/46125) | Update dependencies |
| 0.1.19 | 2024-09-21 | [45745](https://github.com/airbytehq/airbyte/pull/45745) | Update dependencies |
| 0.1.18 | 2024-09-14 | [45507](https://github.com/airbytehq/airbyte/pull/45507) | Update dependencies |
| 0.1.17 | 2024-09-07 | [45271](https://github.com/airbytehq/airbyte/pull/45271) | Update dependencies |
| 0.1.16 | 2024-08-31 | [45042](https://github.com/airbytehq/airbyte/pull/45042) | Update dependencies |
| 0.1.15 | 2024-08-24 | [44695](https://github.com/airbytehq/airbyte/pull/44695) | Update dependencies |
| 0.1.14 | 2024-08-17 | [44314](https://github.com/airbytehq/airbyte/pull/44314) | Update dependencies |
| 0.1.13 | 2024-08-12 | [43862](https://github.com/airbytehq/airbyte/pull/43862) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43499](https://github.com/airbytehq/airbyte/pull/43499) | Update dependencies |
| 0.1.11 | 2024-08-03 | [43170](https://github.com/airbytehq/airbyte/pull/43170) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42590](https://github.com/airbytehq/airbyte/pull/42590) | Update dependencies |
| 0.1.9 | 2024-07-20 | [42248](https://github.com/airbytehq/airbyte/pull/42248) | Update dependencies |
| 0.1.8 | 2024-07-13 | [41738](https://github.com/airbytehq/airbyte/pull/41738) | Update dependencies |
| 0.1.7 | 2024-07-10 | [41427](https://github.com/airbytehq/airbyte/pull/41427) | Update dependencies |
| 0.1.6 | 2024-07-09 | [41191](https://github.com/airbytehq/airbyte/pull/41191) | Update dependencies |
| 0.1.5 | 2024-07-06 | [40861](https://github.com/airbytehq/airbyte/pull/40861) | Update dependencies |
| 0.1.4 | 2024-06-25 | [40317](https://github.com/airbytehq/airbyte/pull/40317) | Update dependencies |
| 0.1.3 | 2024-06-22 | [40124](https://github.com/airbytehq/airbyte/pull/40124) | Update dependencies |
| 0.1.2 | 2024-06-06 | [39273](https://github.com/airbytehq/airbyte/pull/39273) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-21 | [38482](https://github.com/airbytehq/airbyte/pull/38482) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-11-08 | [18745](https://github.com/airbytehq/airbyte/pull/18745) | 🎉 New Source: N8n [low-code cdk] |

</details>
