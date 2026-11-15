---
generated_record: true
connector_name: BambooHR
connector_type: source
connector_slug: bamboo-hr
connector_directory: source-bamboo-hr
definition_id: 90916976-a132-4ce9-8bce-82a03dd58788
version: 0.10.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/bamboo-hr
logo: /images/connectors/sources/bamboo-hr.svg
logo_source_path: airbyte-integrations/connectors/source-bamboo-hr/icon.svg
logo_sha256: 2764f590613737f24305fe363f96fbd625e283c28131eed35302385b6b0273e5
original_metadata_path: airbyte-integrations/connectors/source-bamboo-hr/metadata.yaml
original_metadata_sha256: 14932a885bd86b71795cbd3864ff8c715a4fa88854e23b7502afcd2db1ce9b50
original_document_path: docs/integrations/sources/bamboo-hr.md
original_document_sha256: 2d2ca192a35dea7840fce99badce02f061e0959504f6c980aedfc57f90406bb2
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 06e2169d33b008c6d69a8a9d111ab41a31c91bf5bd683b19ad12c4d2696b0003
rewritten_at: 2026-11-12T13:31:05.187664+00:00
---

# BambooHR

<HideInUI>

Use this page to set up the [BambooHR](https://www.bamboohr.com/) source connector and find reference information.

</HideInUI>

## What you need

- A BambooHR account with access to the data you want to sync.
- A BambooHR API key. API requests use the permissions of the user who generated the key. Choose a user who can view the employees, time off and time tracking data you want to sync.
- Your BambooHR company subdomain. If you access BambooHR at `https://mycompany.bamboohr.com`, your subdomain is `mycompany`.

### Generate an API key

1. Log in to BambooHR.
2. Select your name in the lower-left corner of any page to open the user menu.
3. Select **API Keys**. This option only appears if you have sufficient permissions.
4. Create a new API key. Copy it and store it securely.

For more information, see the [BambooHR API documentation](https://documentation.bamboohr.com/docs/getting-started).

## Set up the connector

1. In Airbyte, go to **Sources** and select **New source**.
2. Select **BambooHR** from the list of sources.
3. Enter a name for the source.
4. For **api_key**, enter your BambooHR API key.
5. For **subdomain**, enter your BambooHR company subdomain.
6. Optional: For **custom_reports_fields**, enter a comma-separated list of [BambooHR field names](https://documentation.bamboohr.com/docs/list-of-field-names) to request in the `custom_reports_stream` stream. For example, enter `firstName,lastName,department`. The connector only requests the fields you list. Enter every field you want in that stream.
7. Optional: For **employee_fields**, enter a comma-separated list of BambooHR field names to request in the `employees` stream. The default is `firstName,lastName`.
8. Optional: For **Start date**, enter the UTC date and time for starting the `time_off_requests_stream` and `timesheet_entries` stream syncs. Use the format `YYYY-MM-DDTHH:MM:SSZ`. If left blank, the connector syncs data from about 31 days before the current date.
9. Select **Set up source**.

The configuration form includes **custom_reports_include_default_fields**, but the current connector version doesn't use it. To include fields in the `custom_reports_stream` stream, list them in **custom_reports_fields**.

<HideInUI>

## Supported sync modes

The BambooHR source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | Yes        |
| Namespaces                | No         |

## Supported streams

| Stream | BambooHR endpoint | Primary key | Incremental | Notes |
| :----- | :---------------- | :---------- | :---------- | :---- |
| `custom_reports_stream` | [Request a custom report](https://documentation.bamboohr.com/reference/request-custom-report) | None | No | One record per employee, containing the fields listed in **custom_reports_fields**. |
| `employees_directory_stream` | [Get employee directory](https://documentation.bamboohr.com/reference/get-employees-directory) | `id` | No | Returns only employees and fields that your company shares in its Company Directory settings. |
| `employees` | [Get employee](https://documentation.bamboohr.com/reference/get-employee) | None | Yes | Requests each employee from `employees_directory_stream` with the fields listed in **employee_fields**. Every sync reads all employees. |
| `meta_fields_stream` | [Get a list of fields](https://documentation.bamboohr.com/reference/list-fields) | None | No | Lists the fields available in your BambooHR account. Use it to find field names for **custom_reports_fields** and **employee_fields**. |
| `time_off_requests_stream` | [Get time off requests](https://documentation.bamboohr.com/reference/list-time-off-requests-v1) | None | Yes | Cursor field: `created`. Each incremental sync re-reads the previous 365 days to capture updated requests. |
| `timesheet_entries` | [Get timesheet entries](https://documentation.bamboohr.com/reference/list-timesheet-entries) | `id` | Yes | Cursor field: `start`. |

## Limitations and troubleshooting

<details>
<summary>
Expand to see details about BambooHR connector limitations and troubleshooting.
</summary>

### Rate limits

BambooHR doesn't publish fixed rate limits, but may throttle requests it considers too frequent. BambooHR then returns an HTTP `429` response with a `Retry-After` header. The connector retries the request. For more information, see the BambooHR [technical overview](https://documentation.bamboohr.com/docs/api-details).

### Permission errors

An HTTP `403` error means the API key's user can't access that stream's data. Use an API key from a user with the required access. The `employees_directory_stream` stream and its dependent `employees` stream also return `403` in one case. This happens when the Company Directory isn't shared with the API key user's access level.

### Check the connection

The connector checks the connection by reading `meta_fields_stream`. If it returns an HTTP `404` error, verify your subdomain.

</details>

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.10.0 | 2026-11-10 | [91540](https://github.com/airbytehq/airbyte/pull/91540) | Expand declared fields and improve timesheet and time-off incremental sync reliability. |
| 0.9.4 | 2026-11-10 | [91320](https://github.com/airbytehq/airbyte/pull/91320) | Upgrade base image to source-declarative-manifest 7.47.0 |
| 0.9.3 | 2025-05-24 | [60660](https://github.com/airbytehq/airbyte/pull/60660) | Update dependencies |
| 0.9.2 | 2025-05-10 | [59340](https://github.com/airbytehq/airbyte/pull/59340) | Update dependencies |
| 0.9.1 | 2025-04-26 | [58243](https://github.com/airbytehq/airbyte/pull/58243) | Update dependencies |
| 0.9.0 | 2025-04-14 | [57587](https://github.com/airbytehq/airbyte/pull/57587) | change how to collect custom fields for custom reports |
| 0.8.3 | 2025-04-12 | [57604](https://github.com/airbytehq/airbyte/pull/57604) | Update dependencies |
| 0.8.2 | 2025-04-05 | [57190](https://github.com/airbytehq/airbyte/pull/57190) | Update dependencies |
| 0.8.1 | 2025-03-29 | [56627](https://github.com/airbytehq/airbyte/pull/56627) | Update dependencies |
| 0.8.0 | 2025-03-25 | [54688](https://github.com/airbytehq/airbyte/pull/54688) | Add employees stream |
| 0.7.3 | 2025-03-22 | [56137](https://github.com/airbytehq/airbyte/pull/56137) | Update dependencies |
| 0.7.2 | 2025-03-08 | [55362](https://github.com/airbytehq/airbyte/pull/55362) | Update dependencies |
| 0.7.1 | 2025-03-01 | [54842](https://github.com/airbytehq/airbyte/pull/54842) | Update dependencies |
| 0.7.0 | 2025-02-27 | [54701](https://github.com/airbytehq/airbyte/pull/54701) | Add timesheet_entrees stream |
| 0.6.2 | 2025-02-22 | [54238](https://github.com/airbytehq/airbyte/pull/54238) | Update dependencies |
| 0.6.1 | 2025-02-15 | [53873](https://github.com/airbytehq/airbyte/pull/53873) | Update dependencies |
| 0.6.0 | 2024-12-02 | [48759](https://github.com/airbytehq/airbyte/pull/48759) | Fix incremental for TimeOff Requests stream |
| 0.5.9 | 2025-02-08 | [53441](https://github.com/airbytehq/airbyte/pull/53441) | Update dependencies |
| 0.5.8 | 2025-02-01 | [52909](https://github.com/airbytehq/airbyte/pull/52909) | Update dependencies |
| 0.5.7 | 2025-01-25 | [52201](https://github.com/airbytehq/airbyte/pull/52201) | Update dependencies |
| 0.5.6 | 2025-01-18 | [51771](https://github.com/airbytehq/airbyte/pull/51771) | Update dependencies |
| 0.5.5 | 2025-01-11 | [51263](https://github.com/airbytehq/airbyte/pull/51263) | Update dependencies |
| 0.5.4 | 2024-12-28 | [50440](https://github.com/airbytehq/airbyte/pull/50440) | Update dependencies |
| 0.5.3 | 2024-12-21 | [50206](https://github.com/airbytehq/airbyte/pull/50206) | Update dependencies |
| 0.5.2 | 2024-12-14 | [49543](https://github.com/airbytehq/airbyte/pull/49543) | Update dependencies |
| 0.5.1 | 2024-12-12 | [49025](https://github.com/airbytehq/airbyte/pull/49025) | Update dependencies |
| 0.5.0 | 2024-10-28 | [47262](https://github.com/airbytehq/airbyte/pull/47262) | Migrate to Manifest-only |
| 0.4.14 | 2024-10-28 | [47072](https://github.com/airbytehq/airbyte/pull/47072) | Update dependencies |
| 0.4.13 | 2024-10-12 | [46842](https://github.com/airbytehq/airbyte/pull/46842) | Update dependencies |
| 0.4.12 | 2024-10-05 | [46500](https://github.com/airbytehq/airbyte/pull/46500) | Update dependencies |
| 0.4.11 | 2024-09-28 | [46157](https://github.com/airbytehq/airbyte/pull/46157) | Update dependencies |
| 0.4.10 | 2024-09-21 | [45766](https://github.com/airbytehq/airbyte/pull/45766) | Update dependencies |
| 0.4.9 | 2024-09-14 | [45542](https://github.com/airbytehq/airbyte/pull/45542) | Update dependencies |
| 0.4.8 | 2024-09-07 | [45210](https://github.com/airbytehq/airbyte/pull/45210) | Update dependencies |
| 0.4.7 | 2024-08-31 | [44978](https://github.com/airbytehq/airbyte/pull/44978) | Update dependencies |
| 0.4.6 | 2024-08-24 | [44652](https://github.com/airbytehq/airbyte/pull/44652) | Update dependencies |
| 0.4.5 | 2024-08-17 | [44272](https://github.com/airbytehq/airbyte/pull/44272) | Update dependencies |
| 0.4.4 | 2024-08-12 | [43851](https://github.com/airbytehq/airbyte/pull/43851) | Update dependencies |
| 0.4.3 | 2024-08-10 | [43467](https://github.com/airbytehq/airbyte/pull/43467) | Update dependencies |
| 0.4.2 | 2024-08-03 | [43154](https://github.com/airbytehq/airbyte/pull/43154) | Update dependencies |
| 0.4.1 | 2024-07-27 | [42779](https://github.com/airbytehq/airbyte/pull/42779) | Update dependencies |
| 0.4.0 | 2024-07-18 | [41443](https://github.com/airbytehq/airbyte/pull/41443) | Add TimeOff Requests stream |
| 0.3.8 | 2024-07-20 | [42200](https://github.com/airbytehq/airbyte/pull/42200) | Update dependencies |
| 0.3.7 | 2024-07-13 | [41780](https://github.com/airbytehq/airbyte/pull/41780) | Update dependencies |
| 0.3.6 | 2024-07-10 | [41437](https://github.com/airbytehq/airbyte/pull/41437) | Update dependencies |
| 0.3.5 | 2024-07-09 | [41088](https://github.com/airbytehq/airbyte/pull/41088) | Update dependencies |
| 0.3.4 | 2024-07-06 | [40818](https://github.com/airbytehq/airbyte/pull/40818) | Update dependencies |
| 0.3.3 | 2024-06-25 | [40288](https://github.com/airbytehq/airbyte/pull/40288) | Update dependencies |
| 0.3.2 | 2024-06-22 | [40156](https://github.com/airbytehq/airbyte/pull/40156) | Update dependencies |
| 0.3.1 | 2024-06-06 | [39201](https://github.com/airbytehq/airbyte/pull/39201) | [autopull] Upgrade base image to v1.2.2 |
| 0.3.0 | 2024-05-25 | [37452](https://github.com/airbytehq/airbyte/pull/37452) | Migrate to Low Code |
| 0.2.6 | 2024-04-19 | [37124](https://github.com/airbytehq/airbyte/pull/37124) | Updating to 0.80.0 CDK |
| 0.2.5 | 2024-04-18 | [37124](https://github.com/airbytehq/airbyte/pull/37124) | Manage dependencies with Poetry. |
| 0.2.4 | 2024-04-15 | [37124](https://github.com/airbytehq/airbyte/pull/37124) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.2.3 | 2024-04-12 | [37124](https://github.com/airbytehq/airbyte/pull/37124) | schema descriptions |
| 0.2.2 | 2022-09-16 | [17684](https://github.com/airbytehq/airbyte/pull/17684) | Fix custom field validation retrieve |
| 0.2.1 | 2022-09-16 | [16826](https://github.com/airbytehq/airbyte/pull/16826) | Add custom fields validation during check |
| 0.2.0 | 2022-03-24 | [11326](https://github.com/airbytehq/airbyte/pull/11326) | Add support for Custom Reports endpoint |
| 0.1.0 | 2021-08-27 | [5054](https://github.com/airbytehq/airbyte/pull/5054) | Initial release with Employees API |

</details>

</HideInUI>
