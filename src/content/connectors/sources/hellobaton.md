---
generated_record: true
connector_name: Hellobaton
connector_type: source
connector_slug: hellobaton
connector_directory: source-hellobaton
definition_id: 492b56d1-937c-462e-8076-21ad2031e784
version: 0.3.28
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/hellobaton
logo: /images/connectors/sources/hellobaton.svg
logo_source_path: airbyte-integrations/connectors/source-hellobaton/icon.svg
logo_sha256: c143fba64c6e8f7808bb33023d919ce8d0a70e096393b7f92cfd4729f6fb2c2a
original_metadata_path: airbyte-integrations/connectors/source-hellobaton/metadata.yaml
original_metadata_sha256: 2ad222c7a7e6adfde9bea655a9918dc094c4716f62779cc9fa09b81dafa3f29b
original_document_path: docs/integrations/sources/hellobaton.md
original_document_sha256: bf6d283ade2890596900c1ef399a3d81f42458198ded5c099d954fdccda97923
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 80bd55211706eb2ae2d5c2ee0a14bb21fc82090768b8b7ac79f80ea246909659
rewritten_at: 2026-11-12T13:42:28.499269+00:00
---

# Hellobaton

## Sync overview

This source syncs data from the [Baton API](https://app.hellobaton.com/api/redoc/). It currently supports full refresh syncs only. Each sync retrieves all available records from scratch. Use it cautiously if you expect your API to contain many records.

## Supported streams

- activity
- companies
- milestones
- phases
- project_attachments
- projects
- task_attachments
- tasks
- templates
- time_entries
- users

Hellobaton adds new streams regularly. Submit an issue or PR if this project doesn't support the streams you need.

### Data type mapping

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`         | `string`     |       |
| `integer`        | `integer`    |       |
| `number`         | `number`     |       |
| `array`          | `array`      |       |
| `object`         | `object`     |       |

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |
| Namespaces        | No                   |       |

### Performance considerations

Each API key is limited to 1000 requests per minute. If you receive errors, contact your customer success manager to request a rate limit increase.

## Get started

### Requirements

- Hellobaton account
- Hellobaton API key

### Setup guide

1. **Company**: your Baton workspace subdomain. This is the `<company>` part of your workspace URL `https://<company>.hellobaton.com`. The connector calls `https://<company>.hellobaton.com/api/`.
2. **API Key**: the API key Baton issued for your workspace. The connector sends it as the `api-key` request header, documented in the [Baton API reference](https://app.hellobaton.com/api/redoc/). For backwards compatibility, it also sends the key as the legacy `api_key` query parameter.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                             |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------- |
| 0.3.28 | 2026-10-13 | [78797](https://github.com/airbytehq/airbyte/pull/78797) | Update dependencies |
| 0.3.27 | 2026-10-07 | [88336](https://github.com/airbytehq/airbyte/pull/88336) | Send the API key as the `api-key` header documented by the Baton API, turn unknown-workspace 404s into a clear config error, fix spec descriptions and point docs at the live API reference |
| 0.3.26 | 2025-05-10 | [59908](https://github.com/airbytehq/airbyte/pull/59908) | Update dependencies |
| 0.3.25 | 2025-05-03 | [59244](https://github.com/airbytehq/airbyte/pull/59244) | Update dependencies |
| 0.3.24 | 2025-04-26 | [58795](https://github.com/airbytehq/airbyte/pull/58795) | Update dependencies |
| 0.3.23 | 2025-04-19 | [58157](https://github.com/airbytehq/airbyte/pull/58157) | Update dependencies |
| 0.3.22 | 2025-04-12 | [57705](https://github.com/airbytehq/airbyte/pull/57705) | Update dependencies |
| 0.3.21 | 2025-04-05 | [57098](https://github.com/airbytehq/airbyte/pull/57098) | Update dependencies |
| 0.3.20 | 2025-03-29 | [56661](https://github.com/airbytehq/airbyte/pull/56661) | Update dependencies |
| 0.3.19 | 2025-03-22 | [56050](https://github.com/airbytehq/airbyte/pull/56050) | Update dependencies |
| 0.3.18 | 2025-03-08 | [55434](https://github.com/airbytehq/airbyte/pull/55434) | Update dependencies |
| 0.3.17 | 2025-03-01 | [54771](https://github.com/airbytehq/airbyte/pull/54771) | Update dependencies |
| 0.3.16 | 2025-02-22 | [54347](https://github.com/airbytehq/airbyte/pull/54347) | Update dependencies |
| 0.3.15 | 2025-02-15 | [53806](https://github.com/airbytehq/airbyte/pull/53806) | Update dependencies |
| 0.3.14 | 2025-02-08 | [53286](https://github.com/airbytehq/airbyte/pull/53286) | Update dependencies |
| 0.3.13 | 2025-02-01 | [52772](https://github.com/airbytehq/airbyte/pull/52772) | Update dependencies |
| 0.3.12 | 2025-01-25 | [52292](https://github.com/airbytehq/airbyte/pull/52292) | Update dependencies |
| 0.3.11 | 2025-01-18 | [51810](https://github.com/airbytehq/airbyte/pull/51810) | Update dependencies |
| 0.3.10 | 2025-01-11 | [51203](https://github.com/airbytehq/airbyte/pull/51203) | Update dependencies |
| 0.3.9 | 2025-01-04 | [50657](https://github.com/airbytehq/airbyte/pull/50657) | Update dependencies |
| 0.3.8 | 2024-12-21 | [50122](https://github.com/airbytehq/airbyte/pull/50122) | Update dependencies |
| 0.3.7 | 2024-12-14 | [49643](https://github.com/airbytehq/airbyte/pull/49643) | Update dependencies |
| 0.3.6 | 2024-12-12 | [49245](https://github.com/airbytehq/airbyte/pull/49245) | Update dependencies |
| 0.3.5 | 2024-12-11 | [48981](https://github.com/airbytehq/airbyte/pull/48981) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.3.4 | 2024-11-05 | [48359](https://github.com/airbytehq/airbyte/pull/48359) | Revert to source-declarative-manifest v5.17.0 |
| 0.3.3 | 2024-11-05 | [48320](https://github.com/airbytehq/airbyte/pull/48320) | Update dependencies |
| 0.3.2 | 2024-10-22 | [47236](https://github.com/airbytehq/airbyte/pull/47236) | Update dependencies |
| 0.3.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.3.0 | 2024-08-15 | [44142](https://github.com/airbytehq/airbyte/pull/44142) | Refactor connector to manifest-only format |
| 0.2.14 | 2024-08-12 | [43779](https://github.com/airbytehq/airbyte/pull/43779) | Update dependencies |
| 0.2.13 | 2024-08-10 | [43465](https://github.com/airbytehq/airbyte/pull/43465) | Update dependencies |
| 0.2.12 | 2024-08-03 | [43233](https://github.com/airbytehq/airbyte/pull/43233) | Update dependencies |
| 0.2.11 | 2024-07-27 | [42678](https://github.com/airbytehq/airbyte/pull/42678) | Update dependencies |
| 0.2.10 | 2024-07-20 | [42232](https://github.com/airbytehq/airbyte/pull/42232) | Update dependencies |
| 0.2.9 | 2024-07-13 | [41888](https://github.com/airbytehq/airbyte/pull/41888) | Update dependencies |
| 0.2.8 | 2024-07-10 | [41538](https://github.com/airbytehq/airbyte/pull/41538) | Update dependencies |
| 0.2.7 | 2024-07-09 | [41277](https://github.com/airbytehq/airbyte/pull/41277) | Update dependencies |
| 0.2.6 | 2024-07-06 | [40838](https://github.com/airbytehq/airbyte/pull/40838) | Update dependencies |
| 0.2.5 | 2024-06-26 | [40445](https://github.com/airbytehq/airbyte/pull/40445) | Update dependencies |
| 0.2.4 | 2024-06-22 | [40195](https://github.com/airbytehq/airbyte/pull/40195) | Update dependencies |
| 0.2.3 | 2024-06-15 | [39113](https://github.com/airbytehq/airbyte/pull/39113) | Make compatible with builder |
| 0.2.2 | 2024-06-06 | [39189](https://github.com/airbytehq/airbyte/pull/39189) | [autopull] Upgrade base image to v1.2.2 |
| 0.2.1 | 2024-05-21 | [38507](https://github.com/airbytehq/airbyte/pull/38507) | [autopull] base image + poetry + up_to_date |
| 0.2.0 | 2023-08-19 | [29490](https://github.com/airbytehq/airbyte/pull/29490) | Migrate CDK from Python to Low Code |
| 0.1.0 | 2022-01-14 | [8461](https://github.com/airbytehq/airbyte/pull/8461) | 🎉 New Source: Hellobaton |

</details>
