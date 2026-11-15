---
generated_record: true
connector_name: Vitally
connector_type: source
connector_slug: vitally
connector_directory: source-vitally
definition_id: 6c6d8b0c-db35-4cd1-a7de-0ca8b080f5ac
version: 0.4.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/vitally
logo: /images/connectors/sources/vitally.svg
logo_source_path: airbyte-integrations/connectors/source-vitally/icon.svg
logo_sha256: 6be3efe7653b9675fb942abebac5d3f12d76232ef11d55509029120d798549e3
original_metadata_path: airbyte-integrations/connectors/source-vitally/metadata.yaml
original_metadata_sha256: b5b1d21a6a054d9929bf15cf5e6f925cd3d2ceb648686f200ff2e04ef1a8eb04
original_document_path: docs/integrations/sources/vitally.md
original_document_sha256: 6f86e49ba13c13eb722eabc39b424c2888100086033733674d4e757dbe09849e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 947a433c0440320d5b792a0cfed61395e4f27ef08104436f9ccc89d8d11c5195
rewritten_at: 2026-11-12T14:00:08.933085+00:00
---

# Vitally

## Sync overview

The Vitally source supports Full Refresh only.

You can sync data for the [Vitally API](https://docs.vitally.io/pushing-data-to-vitally/rest-api) with this source.

### Output schema

You can sync these core streams:

- [Accounts](https://docs.vitally.io/pushing-data-to-vitally/rest-api/accounts)
- [Admins](https://docs.vitally.io/pushing-data-to-vitally/rest-api/admins)
- [Conversations](https://docs.vitally.io/pushing-data-to-vitally/rest-api/conversations)
- [Notes](https://docs.vitally.io/pushing-data-to-vitally/rest-api/notes)
- [NPS Responses](https://docs.vitally.io/pushing-data-to-vitally/rest-api/nps-responses)
- [Tasks](https://docs.vitally.io/pushing-data-to-vitally/rest-api/tasks)
- [Users](https://docs.vitally.io/pushing-data-to-vitally/rest-api/users)

### Features

| Feature                   | Supported?\(Yes/No\) | Notes |
| :------------------------ | :------------------- | :---- |
| Full Refresh Sync         | Yes                  |       |
| Incremental - Append Sync | No                   |       |
| Namespaces                | No                   |       |

### Performance

Under normal usage, the Vitally connector shouldn't encounter Vitally API limitations.

## Requirements

- You need **Vitaly API key**. See [Vitally docs](https://docs.vitally.io/pushing-data-to-vitally/rest-api#authentication) for details on getting an API key.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                     |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------ |
| 0.4.4 | 2026-06-30 | [81345](https://github.com/airbytehq/airbyte/pull/81345) | Add missing `airbyte_secret` flag to `secret_token` spec field |
| 0.4.3 | 2026-06-02 | [79008](https://github.com/airbytehq/airbyte/pull/79008) | Update dependencies |
| 0.4.2 | 2025-05-24 | [60783](https://github.com/airbytehq/airbyte/pull/60783) | Update dependencies |
| 0.4.1 | 2025-05-10 | [59942](https://github.com/airbytehq/airbyte/pull/59942) | Update dependencies |
| 0.4.0 | 2025-05-05 | [58062](https://github.com/airbytehq/airbyte/pull/58062) | Fix subdomain parameter config |
| 0.3.10 | 2025-05-04 | [59561](https://github.com/airbytehq/airbyte/pull/59561) | Update dependencies |
| 0.3.9 | 2025-04-26 | [58951](https://github.com/airbytehq/airbyte/pull/58951) | Update dependencies |
| 0.3.8 | 2025-04-20 | [58018](https://github.com/airbytehq/airbyte/pull/58018) | Update dependencies |
| 0.3.7 | 2025-04-05 | [57478](https://github.com/airbytehq/airbyte/pull/57478) | Update dependencies |
| 0.3.6 | 2025-03-29 | [56894](https://github.com/airbytehq/airbyte/pull/56894) | Update dependencies |
| 0.3.5 | 2025-03-22 | [56255](https://github.com/airbytehq/airbyte/pull/56255) | Update dependencies |
| 0.3.4 | 2025-03-08 | [55622](https://github.com/airbytehq/airbyte/pull/55622) | Update dependencies |
| 0.3.3 | 2025-03-01 | [55090](https://github.com/airbytehq/airbyte/pull/55090) | Update dependencies |
| 0.3.2 | 2025-02-22 | [54500](https://github.com/airbytehq/airbyte/pull/54500) | Update dependencies |
| 0.3.1 | 2025-02-15 | [47470](https://github.com/airbytehq/airbyte/pull/47470) | Update dependencies |
| 0.3.0 | 2025-02-12 | [53648](https://github.com/airbytehq/airbyte/pull/53648) | Add support for custom domain. |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44049](https://github.com/airbytehq/airbyte/pull/44049) | Refactor connector to manifest-only format |
| 0.1.13 | 2024-08-12 | [43850](https://github.com/airbytehq/airbyte/pull/43850) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43505](https://github.com/airbytehq/airbyte/pull/43505) | Update dependencies |
| 0.1.11 | 2024-08-03 | [43189](https://github.com/airbytehq/airbyte/pull/43189) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42607](https://github.com/airbytehq/airbyte/pull/42607) | Update dependencies |
| 0.1.9 | 2024-07-20 | [41877](https://github.com/airbytehq/airbyte/pull/41877) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41378](https://github.com/airbytehq/airbyte/pull/41378) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41223](https://github.com/airbytehq/airbyte/pull/41223) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40808](https://github.com/airbytehq/airbyte/pull/40808) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40287](https://github.com/airbytehq/airbyte/pull/40287) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40189](https://github.com/airbytehq/airbyte/pull/40189) | Update dependencies |
| 0.1.3 | 2024-06-25 | [38605](https://github.com/airbytehq/airbyte/pull/38605) | Make compatible with builder |
| 0.1.2 | 2024-06-06 | [39203](https://github.com/airbytehq/airbyte/pull/39203) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-20 | [38446](https://github.com/airbytehq/airbyte/pull/38446) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-10-27 | [18545](https://github.com/airbytehq/airbyte/pull/18545) | Add Vitally Source Connector |

</details>
