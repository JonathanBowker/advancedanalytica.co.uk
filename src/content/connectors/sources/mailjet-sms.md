---
generated_record: true
connector_name: Mailjet SMS
connector_type: source
connector_slug: mailjet-sms
connector_directory: source-mailjet-sms
definition_id: 6ec2acea-7fd1-4378-b403-41a666e0c028
version: 0.2.25
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/mailjet-sms
logo: /images/connectors/sources/mailjet-sms.svg
logo_source_path: airbyte-integrations/connectors/source-mailjet-sms/icon.svg
logo_sha256: eeb02e1b3ebb23c7174d97b654297aff89e173393490e8b01fce0293678ca37e
original_metadata_path: airbyte-integrations/connectors/source-mailjet-sms/metadata.yaml
original_metadata_sha256: 24d0f0b3fcb7dd5daaf562ff6481d5b015106821fe590710e0b3fbfd4419989e
original_document_path: docs/integrations/sources/mailjet-sms.md
original_document_sha256: 75c3b9bf334116025753466a4f8c4c6f5bd253c3896789d578fce43c8224fddc
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7a5e88264e62425ff7c3f4d5dbeab965453028ae05f675491b8dbd25ae518f4a
rewritten_at: 2026-11-12T13:46:17.986956+00:00
---

# Mailjet - SMS API

:::warning

## Deprecation notice

The Mailjet SMS source connector is archived. It’s no longer available in Airbyte Cloud or the OSS connector registry.

Mailjet (Sinch) has removed its SMS API from its product and documentation. The SMS API reference and guides at [dev.mailjet.com/sms](https://dev.mailjet.com/sms/reference) now return 404. The current [Mailjet API Reference](https://dev.mailjet.com/docs/api-reference) lists only the Email API (`/v3`) and Content API (`/v1`). The [Mailjet Help Center](https://documentation.mailjet.com/hc/en-us/search?query=SMS) contains no SMS articles. The `/v4/sms` endpoint used by this connector is undocumented and unsupported. No Airbyte connection has ever completed a successful sync with this connector.

### Recommended actions

If you still need SMS message data from Sinch, consider building a custom connector against the [Sinch SMS API](https://developers.sinch.com/docs/sms/) using the [Connector Builder](https://docs.airbyte.com/platform/connector-development/connector-builder-ui/overview).

:::

## Sync overview

You can sync data from the [Mailjet SMS API](https://dev.mailjet.com/sms/guides/). This connector currently supports only full refresh syncs. Each time you use it, the connector syncs all available records from scratch. Take care if you expect your API to contain many records.

## Supported streams

- SMS

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

### Performance considerations

Mailjet APIs limit the number of API calls allowed for each API key per second. If you reach a rate limit, the API returns a 429 HTTP error code. See [here](https://dev.mailjet.com/sms/reference/overview/rate-limits/)

## Getting started

### Requirements

- Mailjet SMS TOKEN

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                         |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.2.25 | 2026-10-07 | [88328](https://github.com/airbytehq/airbyte/pull/88328) | Archive connector: Mailjet has discontinued its SMS API |
| 0.2.24 | 2025-05-24 | [60724](https://github.com/airbytehq/airbyte/pull/60724) | Update dependencies |
| 0.2.23 | 2025-05-10 | [59911](https://github.com/airbytehq/airbyte/pull/59911) | Update dependencies |
| 0.2.22 | 2025-05-03 | [59294](https://github.com/airbytehq/airbyte/pull/59294) | Update dependencies |
| 0.2.21 | 2025-04-26 | [58162](https://github.com/airbytehq/airbyte/pull/58162) | Update dependencies |
| 0.2.20 | 2025-04-12 | [57750](https://github.com/airbytehq/airbyte/pull/57750) | Update dependencies |
| 0.2.19 | 2025-04-05 | [57102](https://github.com/airbytehq/airbyte/pull/57102) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56645](https://github.com/airbytehq/airbyte/pull/56645) | Update dependencies |
| 0.2.17 | 2025-03-22 | [56055](https://github.com/airbytehq/airbyte/pull/56055) | Update dependencies |
| 0.2.16 | 2025-03-08 | [55459](https://github.com/airbytehq/airbyte/pull/55459) | Update dependencies |
| 0.2.15 | 2025-03-01 | [54808](https://github.com/airbytehq/airbyte/pull/54808) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54351](https://github.com/airbytehq/airbyte/pull/54351) | Update dependencies |
| 0.2.13 | 2025-02-15 | [53858](https://github.com/airbytehq/airbyte/pull/53858) | Update dependencies |
| 0.2.12 | 2025-02-08 | [53255](https://github.com/airbytehq/airbyte/pull/53255) | Update dependencies |
| 0.2.11 | 2025-02-01 | [52740](https://github.com/airbytehq/airbyte/pull/52740) | Update dependencies |
| 0.2.10 | 2025-01-25 | [52286](https://github.com/airbytehq/airbyte/pull/52286) | Update dependencies |
| 0.2.9 | 2025-01-18 | [51809](https://github.com/airbytehq/airbyte/pull/51809) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51208](https://github.com/airbytehq/airbyte/pull/51208) | Update dependencies |
| 0.2.7 | 2024-12-28 | [50614](https://github.com/airbytehq/airbyte/pull/50614) | Update dependencies |
| 0.2.6 | 2024-12-21 | [50111](https://github.com/airbytehq/airbyte/pull/50111) | Update dependencies |
| 0.2.5 | 2024-12-14 | [49647](https://github.com/airbytehq/airbyte/pull/49647) | Update dependencies |
| 0.2.4 | 2024-12-12 | [49235](https://github.com/airbytehq/airbyte/pull/49235) | Update dependencies |
| 0.2.3 | 2024-12-11 | [47810](https://github.com/airbytehq/airbyte/pull/47810) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.2 | 2024-10-28 | [47489](https://github.com/airbytehq/airbyte/pull/47489) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-15 | [44128](https://github.com/airbytehq/airbyte/pull/44128) | Refactor connector to manifest-only format |
| 0.1.15 | 2024-08-10 | [43594](https://github.com/airbytehq/airbyte/pull/43594) | Update dependencies |
| 0.1.14 | 2024-08-03 | [43179](https://github.com/airbytehq/airbyte/pull/43179) | Update dependencies |
| 0.1.13 | 2024-07-27 | [42747](https://github.com/airbytehq/airbyte/pull/42747) | Update dependencies |
| 0.1.12 | 2024-07-20 | [42161](https://github.com/airbytehq/airbyte/pull/42161) | Update dependencies |
| 0.1.11 | 2024-07-13 | [41804](https://github.com/airbytehq/airbyte/pull/41804) | Update dependencies |
| 0.1.10 | 2024-07-10 | [41516](https://github.com/airbytehq/airbyte/pull/41516) | Update dependencies |
| 0.1.9 | 2024-07-09 | [41208](https://github.com/airbytehq/airbyte/pull/41208) | Update dependencies |
| 0.1.8 | 2024-07-06 | [40775](https://github.com/airbytehq/airbyte/pull/40775) | Update dependencies |
| 0.1.7 | 2024-06-25 | [40402](https://github.com/airbytehq/airbyte/pull/40402) | Update dependencies |
| 0.1.6 | 2024-06-22 | [40010](https://github.com/airbytehq/airbyte/pull/40010) | Update dependencies |
| 0.1.5 | 2024-06-06 | [39165](https://github.com/airbytehq/airbyte/pull/39165) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.4 | 2024-05-28 | [38730](https://github.com/airbytehq/airbyte/pull/38730) | Make compatible with builder. |
| 0.1.3 | 2024-04-19 | [37195](https://github.com/airbytehq/airbyte/pull/37195) | Upgrade to CDK 0.80.0 and manage dependencies with Poetry. |
| 0.1.2 | 2024-04-15 | [37195](https://github.com/airbytehq/airbyte/pull/37195) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.1 | 2024-04-12 | [37195](https://github.com/airbytehq/airbyte/pull/37195) | schema descriptions |
| 0.1.0   | 2022-10-26 | [#18345](https://github.com/airbytehq/airbyte/pull/18345) | 🎉 New Source: Mailjet SMS API [low-code CDK]                                   |

</details>
