---
generated_record: true
connector_name: Google Workspace Admin Reports
connector_type: source
connector_slug: google-workspace-admin-reports
connector_directory: source-google-workspace-admin-reports
definition_id: ed9dfefa-1bbc-419d-8c5e-4d78f0ef6734
version: 0.1.8
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/google-workspace-admin-reports
logo: /images/connectors/sources/google-workspace-admin-reports.svg
logo_source_path: airbyte-integrations/connectors/source-google-workspace-admin-reports/icon.svg
logo_sha256: c2b2d37cd7f1f185d2bf8fd45a7bfd79277e80a0e2782ecc47808be9dd1200b1
original_metadata_path: airbyte-integrations/connectors/source-google-workspace-admin-reports/metadata.yaml
original_metadata_sha256: 4bd8b6dba282ff9ecb754cccfe144b290b03e9efc09d088f52be4e97833a1282
original_document_path: docs/integrations/sources/google-workspace-admin-reports.md
original_document_sha256: bd97090a8ef2fb05b4b6f618b258659796aa0ce00402e0e7bc88ee1b15382fc2
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 75c5dd19a975559c9bddb86222efcb89b797e0c57f377da52f533e08d7f7072d
rewritten_at: 2026-11-12T13:41:37.974728+00:00
---

# Google Workspace Admin Reports

## Overview

This source supports Full Refresh syncs. It uses the [Reports API](https://developers.google.com/admin-sdk/reports/v1/get-start/getting-started) to provide content management insights from Google Drive activity reports and administrator audit actions.

### Output schema

This source can sync the following streams:

- [admin](https://developers.google.com/admin-sdk/reports/v1/guides/manage-audit-admin)
- [drive](https://developers.google.com/admin-sdk/reports/v1/guides/manage-audit-drive)
- [logins](https://developers.google.com/admin-sdk/reports/v1/guides/manage-audit-login)
- [mobile](https://developers.google.com/admin-sdk/reports/v1/guides/manage-audit-mobile)
- [oauth_tokens](https://developers.google.com/admin-sdk/reports/v1/guides/manage-audit-tokens)

### Data type mapping

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`         | `string`     |       |
| `number`         | `number`     |       |
| `array`          | `array`      |       |
| `object`         | `object`     |       |

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |
| SSL connection    | Yes                  |       |
| Namespaces        | No                   |       |

### Performance

This connector attempts to back off gracefully when it reaches the Reports API's rate limits. For more information about limits, see the [Reports API Limits and Quotas](https://developers.google.com/admin-sdk/reports/v1/limits) documentation.

## Get started

### Requirements

- Credentials for a Google Service Account with delegated Domain Wide Authority
- The workspace administrator's email address used to create the Service Account

### Create a Service Account with delegated domain-wide authority

Follow the Google documentation for [Domain Wide Delegation of Authority](https://developers.google.com/admin-sdk/reports/v1/guides/delegation) to create a Service Account with delegated domain-wide authority. A Google Workspace administrator must create this account. Grant the service user these OAuth scopes:

1. `https://www.googleapis.com/auth/admin.reports.audit.readonly`
2. `https://www.googleapis.com/auth/admin.reports.usage.readonly`

When you've finished, you should have JSON credentials for this Google Service Account.

You're now ready to use the Google Workspace Admin Reports API connector in Airbyte.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                   |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------- |
| 0.1.8   | 2022-02-24 | [10244](https://github.com/airbytehq/airbyte/pull/10244) | Add Meet Stream                           |
| 0.1.7   | 2021-12-06 | [8524](https://github.com/airbytehq/airbyte/pull/8524)   | Update connector fields title/description |
| 0.1.6   | 2021-11-02 | [7623](https://github.com/airbytehq/airbyte/pull/7623)   | Migrate to the CDK                        |
| 0.1.5   | 2021-10-07 | [6878](https://github.com/airbytehq/airbyte/pull/6878)   | Improve testing & output schemas          |

</details>
