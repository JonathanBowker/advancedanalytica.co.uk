---
generated_record: true
connector_name: Shiftbase
connector_type: source
connector_slug: shiftbase
connector_directory: source-shiftbase
definition_id: 4d338322-bf11-4eeb-93b7-7aae9e92bcf7
version: 0.0.10
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/shiftbase
logo: /images/connectors/sources/shiftbase.svg
logo_source_path: airbyte-integrations/connectors/source-shiftbase/icon.svg
logo_sha256: a8ee1cb3c80f0854062bbe54f64e0290e9a199e9455dd47807f9965c1ebf76c3
original_metadata_path: airbyte-integrations/connectors/source-shiftbase/metadata.yaml
original_metadata_sha256: 1569dc87944e66418d94798c1cbd336b64d2629273536cc730a8cbdb5331f64b
original_document_path: docs/integrations/sources/shiftbase.md
original_document_sha256: 6a1223e3aeaef23b270d75c5a00eafccf2270972c99131933f7ff1aca8dc047a
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a9319879b388730b8e70e606c0383f159828bffe99c941da756352c471adab97
rewritten_at: 2026-11-12T13:55:34.600456+00:00
---

# Shiftbase

<HideInUI>

Find setup guidance and reference information for the [Shiftbase](https://www.shiftbase.com/) source connector on this page.

</HideInUI>

## Prerequisites

You'll need the following to set up the Shiftbase source connector:

- A Shiftbase account with API access
- An **Access Token** generated from the Shiftbase App Center

### Generate an Access Token

1. Log in to your Shiftbase account.
2. Go to the App Center.
3. Generate a new API Access Token.
4. Copy and securely store the token. You'll need it to configure the connector.

## Setup guide

### Set up Shiftbase

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Shiftbase from the Source type dropdown.
4. Enter a name for the Shiftbase connector.
5. Enter your **Access Token** from the Shiftbase App Center.
6. Enter your **Start Date** for historical data sync using the YYYY-MM-DD format.
7. Optionally, enter a **Schedule Report End Date** using the YYYY-MM-DD format. This sets the Schedule Detail Report stream's end date. If omitted, it defaults to one month into the future.
8. Click **Set up source**.

<!-- env:oss -->

#### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Shiftbase** from the Source type dropdown.
4. Enter a name for the Shiftbase connector.
5. For **Access Token**, enter the Shiftbase API access token generated in the App Center.
6. For **Start Date**, enter the date in `YYYY-MM-DD` format. Data from this date onwards will be replicated.
7. Optionally, for **Schedule Report End Date**, enter a date in `YYYY-MM-DD` format. This sets the Schedule Detail Report stream's end date. If omitted, it defaults to one month after the current date.
8. Click **Set up source**.

<!-- /env:oss -->

## Supported sync modes

The Shiftbase source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append) for supported streams
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped) for supported streams

## Supported streams

| Stream | Sync Mode | Description |
|:---|:---|:---|
| [Departments](https://developer.shiftbase.com/docs/core/510254d159b47-list-departments) | Full Refresh | Internal departments within the Shiftbase account |
| [Employees](https://developer.shiftbase.com/docs/core/75d0181c0add8-list-employees-in-department) | Full Refresh | List of employees (PII fields like name are excluded) |
| [Absentees](https://developer.shiftbase.com/docs/core/2e1fba402f9bb-list-absentees) | Full Refresh, Incremental | Records of employee absences and leave |
| [Employee Time Distribution](https://developer.shiftbase.com/docs/core/9ceb4dce3acb8-list-employee-time-distribution) | Full Refresh, Incremental | Distribution of worked and planned hours per employee |
| [Availabilities](https://developer.shiftbase.com/docs/core/0b8b4f51ba73a-list-availabilities) | Full Refresh, Incremental | Employee availability slots and preferences |
| [Shifts](https://developer.shiftbase.com/docs/core/c8dbe25e28719-list-shifts) | Full Refresh | Scheduled work shifts and roster details |
| [Users](https://developer.shiftbase.com/docs/core/7b22ead2360d9-list-users) | Full Refresh | User account details (PII excluded, flattened structure) |
| [Employees Report](https://developer.shiftbase.com/docs/core/4d05f64e94419-employees-report) | Full Refresh | Employees report data |
| [Timesheet Detail Report](https://developer.shiftbase.com/docs/core/5612d41bb72b1-timesheet-detail-report) | Full Refresh, Incremental | Detailed timesheet report data |
| [Schedule Detail Report](https://developer.shiftbase.com/docs/core/122ab05b95b82-schedule-detail-report) | Full Refresh, Incremental | Detailed schedule report data |

## Performance considerations

The Shiftbase API applies rate limits. The connector handles them automatically using exponential backoff. If you encounter rate-limit issues, consider:

- Reducing the sync frequency
- Using incremental sync where available to minimise API calls

## Data type map

| Shiftbase Type | Airbyte Type |
|:---|:---|
| `string` | `string` |
| `integer` | `integer` |
| `boolean` | `boolean` |
| `object` | `object` |
| `array` | `array` |
| `date` | `string` |
| `datetime` | `string` |

## Limitations and troubleshooting

<details>
<summary>Expand to review</summary>

### Connector limitations

- The `users` stream is flattened and excludes PII, including names, emails, phone numbers and addresses, for privacy compliance.
- The `employees` stream excludes the `name` field to minimise PII exposure.
- Some report streams make daily API calls. Large date ranges may therefore take longer to sync.

### Troubleshooting

- **Connection test fails**: Check that your access token is valid and hasn't expired.
- **Empty streams**: Check that your Shiftbase account contains data for the requested date range.
- **Rate limiting**: The connector handles rate limits automatically. Extended syncs may take longer if they frequently reach those limits.

</details>

## Changelog

<details>
<summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|:---|:---|:---|:---|
| 0.0.10 | 2026-11-10 | [91721](https://github.com/airbytehq/airbyte/pull/91721) | Update dependencies |
| 0.0.9 | 2026-11-03 | [90745](https://github.com/airbytehq/airbyte/pull/90745) | Update dependencies |
| 0.0.8 | 2026-10-20 | [89396](https://github.com/airbytehq/airbyte/pull/89396) | Update dependencies |
| 0.0.7 | 2026-10-13 | [88794](https://github.com/airbytehq/airbyte/pull/88794) | Update dependencies |
| 0.0.6 | 2026-10-06 | [88035](https://github.com/airbytehq/airbyte/pull/88035) | Update dependencies |
| 0.0.5 | 2026-09-29 | [87329](https://github.com/airbytehq/airbyte/pull/87329) | Update dependencies |
| 0.0.4 | 2026-09-22 | [86801](https://github.com/airbytehq/airbyte/pull/86801) | Update dependencies |
| 0.0.3 | 2026-09-15 | [86200](https://github.com/airbytehq/airbyte/pull/86200) | Update dependencies |
| 0.0.2 | 2026-09-08 | [85666](https://github.com/airbytehq/airbyte/pull/85666) | Update dependencies |
| 0.0.1 | 2026-08-27 | [72899](https://github.com/airbytehq/airbyte/pull/72899) | Initial release |

</details>
