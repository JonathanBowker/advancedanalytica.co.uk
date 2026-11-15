---
generated_record: true
connector_name: Appstore
connector_type: source
connector_slug: appstore
connector_directory: source-appstore-singer
definition_id: 2af123bf-0aaf-4e0d-9784-cb497f23741a
version: 0.2.6
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/appstore
logo: /images/connectors/sources/appstore.svg
logo_source_path: airbyte-integrations/connectors/source-appstore-singer/icon.svg
logo_sha256: 00520290421fac7b4ce77ddf9a300e558cebbe1e9bed2ac99fc40970468b3d5a
original_metadata_path: airbyte-integrations/connectors/source-appstore-singer/metadata.yaml
original_metadata_sha256: 3bd89a867cadc69121ff3683b60fcb50dad51244c74dd031130a9628fadccb6d
original_document_path: docs/integrations/sources/appstore.md
original_document_sha256: 417c83bbd10f84f978d200db40b86c62db15c826a01a3ba7b5b206419fa1b800
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3e5a63ff4b1848a52f3fad964a9234fca416e14452c3a63b08598d1be1b2cf9d
rewritten_at: 2026-11-12T13:30:18.670286+00:00
---

# Appstore

:::warning

## Deprecation notice

The Appstore source connector is scheduled for deprecation on 5 March 2024. It is incompatible with upcoming platform updates for Airbyte 1.0. After deprecation, it will no longer be supported or available in Airbyte.

This connector doesn't support new per-stream features that protect data integrity during Airbyte synchronisation. Without them, Airbyte cannot enforce its reliability and correctness standards for data syncing operations.

### Recommended actions

To continue syncing data from this source, consider creating a custom connector. For guidance, visit [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

## Sync overview

This source can sync data for the [Appstore API](https://developer.apple.com/documentation/appstoreconnectapi) using Incremental syncs only. The Appstore API is available for [many types of services](https://developer.apple.com/documentation/appstoreconnectapi). It currently supports syncing Sales and Trends reports. To sync data from other endpoints, create an issue on Github.

This Source Connector is based on a [Singer Tap](https://github.com/miroapp/tap-appstore).

### Output schema

You can sync the following "Sales and Trends" Streams with this Source:

- [SALES](https://help.apple.com/app-store-connect/#/dev15f9508ca)
- [SUBSCRIPTION](https://help.apple.com/app-store-connect/#/itc5dcdf6693)
- [SUBSCRIPTION_EVENT](https://help.apple.com/app-store-connect/#/itc0b9b9d5b2)
- [SUBSCRIBER](https://help.apple.com/app-store-connect/#/itcf20f3392e)

Your credentials may only allow you to sync some of these reports. For example, you can't sync subscription-related reports if your app doesn't offer subscriptions.

### Data type mapping

| Integration Type         | Airbyte Type | Notes |
| :----------------------- | :----------- | :---- |
| `string`                 | `string`     |       |
| `int`, `float`, `number` | `number`     |       |
| `date`                   | `date`       |       |
| `datetime`               | `datetime`   |       |
| `array`                  | `array`      |       |
| `object`                 | `object`     |       |

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | no                   |       |
| Incremental Sync  | yes                  |       |
| Namespaces        | No                   |       |

### Performance considerations

The connector is subject to standard Appstore [requests limitation](https://developer.apple.com/documentation/appstoreconnectapi/identifying_rate_limits).

Under normal use, the Appstore connector shouldn't reach Appstore API limits. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if any rate limit issues aren't retried successfully.

The API may not have data available for your requested period. This can happen when you request data older than 365 days. Today's or yesterday's data may also not yet be available to request.

## Getting started

### Requirements

- Key ID
- Private Key: The contents of the private API key file in P8 format. It should start with `-----BEGIN PRIVATE KEY-----` and end with `-----END PRIVATE KEY-----`.
- Issuer ID
- Vendor ID: Go to "Sales and Trends", then choose "Reports" from the top-left drop-down menu. On the next screen, open the "Vendor" drop-down menu. Your name and ID will appear there. Use the numeric Vendor ID.
- Start Date \(The date used for the first sync. Apple only allows you to go back 365 days from today.\) Example: `2020-11-16T00:00:00Z`

### Setup guide

Use this [external article](https://leapfin.com/blog/apple-appstore-integration/) to generate or find all requirements.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                           | Subject                                           |
| :------ | :--------- | :----------------------------------------------------- | :------------------------------------------------ |
| 0.2.6   | 2021-12-23 | [8434](https://github.com/airbytehq/airbyte/pull/8434) | Update fields in source-connectors specifications |
| 0.2.5   | 2021-12-09 | [7757](https://github.com/airbytehq/airbyte/pull/7757) | Migrate to the CDK                                |
| 0.2.4   | 2021-07-06 | [4539](https://github.com/airbytehq/airbyte/pull/4539) | Add `AIRBYTE_ENTRYPOINT` for Kubernetes support   |

</details>
