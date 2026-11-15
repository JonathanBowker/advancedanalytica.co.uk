---
generated_record: true
connector_name: Secoda
connector_type: source
connector_slug: secoda
connector_directory: source-secoda
definition_id: da9fc6b9-8059-4be0-b204-f56e22e4d52d
version: 0.2.27
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/secoda
logo: /images/connectors/sources/secoda.svg
logo_source_path: airbyte-integrations/connectors/source-secoda/icon.svg
logo_sha256: 088317507ce9b62fbdda75d8b84d9de729816e6268a0e5d2ce3d37f2588348f1
original_metadata_path: airbyte-integrations/connectors/source-secoda/metadata.yaml
original_metadata_sha256: 92dafb55b16dac3585a680267f48b60e0673fa90f0757655d03a9a809bdb0388
original_document_path: docs/integrations/sources/secoda.md
original_document_sha256: 14ed95e65fc8ef1e019ec521aad28e5ce97571e10e0758562655e32eea8c23fe
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 6cf85979d41d614339d81816e7d8e012acd3501eb1493e7f9906a3ed4429effc
rewritten_at: 2026-11-12T13:54:35.545052+00:00
---

# Secoda API

## Sync overview

This source syncs data from the [Secoda API](https://docs.secoda.co/api). It currently supports full refresh syncs only. Each sync retrieves all available records from scratch. Take care if you expect your API to contain many records.

## Supported streams

- collections
- tables
- terms

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

### Performance considerations

## Get started

### Requirements

- A Secoda API key. In Secoda, open **Settings → API** and click **Generate New API Key** (see the [Secoda authentication docs](https://docs.secoda.co/api/authentication)). The key has the same access as the user who created it.

### Set up the connector

1. Enter the API key in the **Api Key** field.
2. Click **Set up source**.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                  |
| :------ | :--------- | :-------------------------------------------------------- | :--------------------------------------- |
| 0.2.27 | 2026-11-09 | [91430](https://github.com/airbytehq/airbyte/pull/91430) | Upgrade to `source-declarative-manifest` base image `7.47.0` |
| 0.2.26 | 2026-10-07 | [88325](https://github.com/airbytehq/airbyte/pull/88325) | Fix dead Secoda API documentation links; migrate acceptance-test-config.yml to the `acceptance_tests` layout so CI tests can run |
| 0.2.25 | 2025-05-10 | [60140](https://github.com/airbytehq/airbyte/pull/60140) | Update dependencies |
| 0.2.24 | 2025-05-04 | [59624](https://github.com/airbytehq/airbyte/pull/59624) | Update dependencies |
| 0.2.23 | 2025-04-27 | [58987](https://github.com/airbytehq/airbyte/pull/58987) | Update dependencies |
| 0.2.22 | 2025-04-19 | [57454](https://github.com/airbytehq/airbyte/pull/57454) | Update dependencies |
| 0.2.21 | 2025-03-29 | [56768](https://github.com/airbytehq/airbyte/pull/56768) | Update dependencies |
| 0.2.20 | 2025-03-22 | [56234](https://github.com/airbytehq/airbyte/pull/56234) | Update dependencies |
| 0.2.19 | 2025-03-08 | [55516](https://github.com/airbytehq/airbyte/pull/55516) | Update dependencies |
| 0.2.18 | 2025-03-01 | [54996](https://github.com/airbytehq/airbyte/pull/54996) | Update dependencies |
| 0.2.17 | 2025-02-23 | [54606](https://github.com/airbytehq/airbyte/pull/54606) | Update dependencies |
| 0.2.16 | 2025-02-15 | [54017](https://github.com/airbytehq/airbyte/pull/54017) | Update dependencies |
| 0.2.15 | 2025-02-08 | [53486](https://github.com/airbytehq/airbyte/pull/53486) | Update dependencies |
| 0.2.14 | 2025-02-01 | [53024](https://github.com/airbytehq/airbyte/pull/53024) | Update dependencies |
| 0.2.13 | 2025-01-25 | [52488](https://github.com/airbytehq/airbyte/pull/52488) | Update dependencies |
| 0.2.12 | 2025-01-18 | [51870](https://github.com/airbytehq/airbyte/pull/51870) | Update dependencies |
| 0.2.11 | 2025-01-11 | [51322](https://github.com/airbytehq/airbyte/pull/51322) | Update dependencies |
| 0.2.10 | 2024-12-28 | [50692](https://github.com/airbytehq/airbyte/pull/50692) | Update dependencies |
| 0.2.9 | 2024-12-21 | [50271](https://github.com/airbytehq/airbyte/pull/50271) | Update dependencies |
| 0.2.8 | 2024-12-14 | [49691](https://github.com/airbytehq/airbyte/pull/49691) | Update dependencies |
| 0.2.7 | 2024-12-12 | [49362](https://github.com/airbytehq/airbyte/pull/49362) | Update dependencies |
| 0.2.6 | 2024-12-11 | [49076](https://github.com/airbytehq/airbyte/pull/49076) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.5 | 2024-11-05 | [48360](https://github.com/airbytehq/airbyte/pull/48360) | Revert to source-declarative-manifest v5.17.0 |
| 0.2.4 | 2024-11-05 | [48337](https://github.com/airbytehq/airbyte/pull/48337) | Update dependencies |
| 0.2.3 | 2024-10-29 | [47908](https://github.com/airbytehq/airbyte/pull/47908) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47566](https://github.com/airbytehq/airbyte/pull/47566) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44074](https://github.com/airbytehq/airbyte/pull/44074) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-12 | [43864](https://github.com/airbytehq/airbyte/pull/43864) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43631](https://github.com/airbytehq/airbyte/pull/43631) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43097](https://github.com/airbytehq/airbyte/pull/43097) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42829](https://github.com/airbytehq/airbyte/pull/42829) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42189](https://github.com/airbytehq/airbyte/pull/42189) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41723](https://github.com/airbytehq/airbyte/pull/41723) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41459](https://github.com/airbytehq/airbyte/pull/41459) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41202](https://github.com/airbytehq/airbyte/pull/41202) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40848](https://github.com/airbytehq/airbyte/pull/40848) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40266](https://github.com/airbytehq/airbyte/pull/40266) | Update dependencies |
| 0.1.4 | 2024-06-22 | [39983](https://github.com/airbytehq/airbyte/pull/39983) | Update dependencies |
| 0.1.3 | 2024-06-05 | [38932](https://github.com/airbytehq/airbyte/pull/38932) | Make connector compatible with builder |
| 0.1.2 | 2024-06-04 | [38957](https://github.com/airbytehq/airbyte/pull/38957) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-21 | [38530](https://github.com/airbytehq/airbyte/pull/38530) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2022-10-27 | [#18378](https://github.com/airbytehq/airbyte/pull/18378) | 🎉 New Source: Secoda API [low-code CDK] |

</details>
