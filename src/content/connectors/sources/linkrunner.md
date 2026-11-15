---
generated_record: true
connector_name: Linkrunner
connector_type: source
connector_slug: linkrunner
connector_directory: source-linkrunner
definition_id: ec739bc6-f8a5-4cb3-9e7b-7e0f8f53ce74
version: 0.0.27
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/linkrunner
logo: /images/connectors/sources/linkrunner.svg
logo_source_path: airbyte-integrations/connectors/source-linkrunner/icon.svg
logo_sha256: 90145f89385f3c08d845fd5e41a9c928e68e46ded2cdc30e4329a4cb48c232d2
original_metadata_path: airbyte-integrations/connectors/source-linkrunner/metadata.yaml
original_metadata_sha256: ec336611694ad0fa7751786164005023b67e1b7ec3389011cc3edbdca10e6e07
original_document_path: docs/integrations/sources/linkrunner.md
original_document_sha256: 2e2522520f575c749c658daa7a401e75f43b28cc62f85b2e7283f6267b9741e8
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: c512f752c293972bcb46e1aeaf74b9bcdb3583cdd71c25287816b25d4556f06e
rewritten_at: 2026-11-12T13:45:18.167556+00:00
---

# Linkrunner
Linkrunner is a Mobile Measurement Partner (MMP) that helps you track journeys from first click to revenue generation. This connector extracts campaign data and attributed user analytics from Linkrunner&#39;s Data API. This supports comprehensive mobile attribution reporting and analysis. You can filter by campaign status, advertising channels (Google, Meta, TikTok), and time-based attribution data. The connector also supports automatic pagination and parent-child stream relationships.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `linkrunner-key` | `string` | LinkRunner API Key. Your LinkRunner API key for authentication. Find this in your LinkRunner dashboard. |  |
| `filter` | `string` | Campaign Filter. Filter campaigns by status (ALL, ACTIVE, or INACTIVE) | ALL |
| `channel` | `string` | Channel Filter. Filter campaigns by marketing channel (leave empty for all channels) |  |
| `start_timestamp` | `string` | Start Date. Start date for fetching attributed users in ISO 8601 format (e.g., 2024-01-01T00:00:00Z) |  |
| `end_timestamp` | `string` | End Date. End date for fetching attributed users in ISO 8601 format. Leave empty for current date. |  |
| `timezone` | `string` | Timezone. Timezone for date filtering (default is UTC) | UTC |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| campaigns | display_id | DefaultPaginator | ✅ |  ❌  |
| attributed_users |  | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>
    The Linkrunner Airbyte Source Connector extracts campaign data and attributed user analytics from Linkrunner’s Data API, enabling end-to-end mobile attribution analysis from first click to user attribution events.
    It supports:
    Campaign-level filtering by status (ALL, ACTIVE, INACTIVE)
    Filtering by advertising channels (Google, Meta, TikTok)
    Attributed user data linked to campaigns via parent–child streams
    Time-based attribution windows with timezone support
    Automatic pagination for large datasets
    Reliable full-refresh syncs using Airbyte’s Declarative (low-code) framework
    This connector is ideal for building comprehensive mobile marketing and attribution analytics pipelines in Airbyte.
  </summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.27 | 2026-11-10 | [91614](https://github.com/airbytehq/airbyte/pull/91614) | Update dependencies |
| 0.0.26 | 2026-11-03 | [90642](https://github.com/airbytehq/airbyte/pull/90642) | Update dependencies |
| 0.0.25 | 2026-10-27 | [89975](https://github.com/airbytehq/airbyte/pull/89975) | Update dependencies |
| 0.0.24 | 2026-10-20 | [89301](https://github.com/airbytehq/airbyte/pull/89301) | Update dependencies |
| 0.0.23 | 2026-10-13 | [88688](https://github.com/airbytehq/airbyte/pull/88688) | Update dependencies |
| 0.0.22 | 2026-10-06 | [87930](https://github.com/airbytehq/airbyte/pull/87930) | Update dependencies |
| 0.0.21 | 2026-09-29 | [87261](https://github.com/airbytehq/airbyte/pull/87261) | Update dependencies |
| 0.0.20 | 2026-09-22 | [86692](https://github.com/airbytehq/airbyte/pull/86692) | Update dependencies |
| 0.0.19 | 2026-09-15 | [86115](https://github.com/airbytehq/airbyte/pull/86115) | Update dependencies |
| 0.0.18 | 2026-09-08 | [85551](https://github.com/airbytehq/airbyte/pull/85551) | Update dependencies |
| 0.0.17 | 2026-08-18 | [84661](https://github.com/airbytehq/airbyte/pull/84661) | Update dependencies |
| 0.0.16 | 2026-08-11 | [83998](https://github.com/airbytehq/airbyte/pull/83998) | Update dependencies |
| 0.0.15 | 2026-08-04 | [83532](https://github.com/airbytehq/airbyte/pull/83532) | Update dependencies |
| 0.0.14 | 2026-07-28 | [83012](https://github.com/airbytehq/airbyte/pull/83012) | Update dependencies |
| 0.0.13 | 2026-07-21 | [82484](https://github.com/airbytehq/airbyte/pull/82484) | Update dependencies |
| 0.0.12 | 2026-07-14 | [81911](https://github.com/airbytehq/airbyte/pull/81911) | Update dependencies |
| 0.0.11 | 2026-06-30 | [81142](https://github.com/airbytehq/airbyte/pull/81142) | Update dependencies |
| 0.0.10 | 2026-06-23 | [80567](https://github.com/airbytehq/airbyte/pull/80567) | Update dependencies |
| 0.0.9 | 2026-06-16 | [79929](https://github.com/airbytehq/airbyte/pull/79929) | Update dependencies |
| 0.0.8 | 2026-06-09 | [79420](https://github.com/airbytehq/airbyte/pull/79420) | Update dependencies |
| 0.0.7 | 2026-06-02 | [78799](https://github.com/airbytehq/airbyte/pull/78799) | Update dependencies |
| 0.0.6 | 2026-04-28 | [77294](https://github.com/airbytehq/airbyte/pull/77294) | Update dependencies |
| 0.0.5 | 2026-04-21 | [76676](https://github.com/airbytehq/airbyte/pull/76676) | Update dependencies |
| 0.0.4 | 2026-03-31 | [75709](https://github.com/airbytehq/airbyte/pull/75709) | Update dependencies |
| 0.0.3 | 2026-03-17 | [74997](https://github.com/airbytehq/airbyte/pull/74997) | Update dependencies |
| 0.0.2 | 2026-03-10 | [74423](https://github.com/airbytehq/airbyte/pull/74423) | Update dependencies |
| 0.0.1 | 2026-02-06 | | Initial release by [@ChetanBhosale](https://github.com/ChetanBhosale) via Connector Builder |

</details>
