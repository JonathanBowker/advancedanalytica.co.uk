---
generated_record: true
connector_name: Marketo
connector_type: source
connector_slug: marketo
connector_directory: source-marketo
definition_id: 9e0556f4-69df-4522-a3fb-03264d36b348
version: 2.1.3
support_level: community
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/marketo
logo: /images/connectors/sources/marketo.svg
logo_source_path: airbyte-integrations/connectors/source-marketo/icon.svg
logo_sha256: c8dddf13a194b69f06500d0e39ff97a6dd12439b6b6846107419eb1976bae028
original_metadata_path: airbyte-integrations/connectors/source-marketo/metadata.yaml
original_metadata_sha256: c27a0ffd1a95721b98637b36575f277ba81d9aa71fb5bef0c3b0f432dcd68efe
original_document_path: docs/integrations/sources/marketo.md
original_document_sha256: 883f9c132027d2fce2351224270c3cc7ce9c36678a60c514215c012e98437987
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 47be99e698de728a81ac685e9f26160b4314d2c073990a0519bdac365d9ce7a5
rewritten_at: 2026-11-12T13:47:08.875744+00:00
---

# Marketo

Use this page to set up the Marketo source connector and find reference information.

## Prerequisites

- (Optional) Allowlist Airbyte's IP address if required
- An API-only Marketo User Role
- An Airbyte Marketo API-only user
- A Marketo API Custom Service
- Marketo Client ID and Client Secret
- Marketo Base URL

## Setup guide

### Step 1: Set up Marketo

#### Step 1.1: (Optional) Allowlist Airbyte's IP address

Skip this step if you haven't enabled IP Restriction in Marketo.

If you've enabled IP Restriction in Marketo, allowlist the IP address of the machine running your Airbyte instance. Run `curl ifconfig.io` from the node running Airbyte to get your IP address. Copy the returned IP address and keep it available.

After getting the IP address, follow the [Marketo documentation for allowlisting IP addresses](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/additional-integrations/create-an-allowlist-for-ip-based-api-access) for API-based access to allowlist it.

#### Step 1.2: Create an API-only Marketo User Role

Follow the [Marketo documentation for creating an API-only Marketo User Role](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/create-an-api-only-user-role).

#### Step 1.3: Create an Airbyte Marketo API-only user

Follow the [Marketo documentation to create an API-only user](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/create-an-api-only-user).

#### Step 1.4: Create a Marketo API custom service

Follow the [Marketo documentation for creating a custom service for use with a REST API](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/additional-integrations/create-a-custom-service-for-use-with-rest-api).

Follow the "**Credentials for API Access"**" section in the Marketo docs to generate a **Client ID** and **Client Secret.**. Copy these credentials and keep them available for later use in the Airbyte UI.

#### Step 1.5: Get your Endpoint URL

Follow the [Marketo documentation for obtaining your base URL](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/base-url). In Marketo, go to **Admin** > **Integration** > **Web Services**. Under **REST API**, copy the **Endpoint** URL without the trailing `/rest`. For example, if the endpoint is `https://000-AAA-000.mktorest.com/rest`, use `https://000-AAA-000.mktorest.com`.

You can configure the Marketo connector in Airbyte after getting your Endpoint URL, Client ID, and Client Secret.

### Step 2: Set up the Marketo connector in Airbyte

<!-- env:cloud -->

**For Airbyte Cloud:**

1. Sign in to your [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click Sources. In the top-right corner, click **+new source**.
3. On the Set up the source page, name the Marketo connector. Select **Marketo** from the Source type dropdown.
4. Enter the start date, domain URL, client ID, and secret.
5. Submit the form.
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

1. Go to the Airbyte Open Source dashboard.
2. Name your source.
3. Enter the start date.
4. Enter the domain URL.
5. Enter the client ID and secret.
6. Click **Set up source**.
<!-- /env:oss -->

### Advanced configuration

The **Bulk Export Window in Days** setting controls each date range the connector requests during an incremental sync. The default is 30 days, and you can enter 1 to 31 days. Values outside this range cause the sync to fail with a configuration error.

This setting affects these streams:

- **Leads** and **Activities_X** streams request one Marketo Bulk Extract job for each window.
- **Programs** and **Emails** streams send one request for each window, filtered on `earliestUpdatedAt` and `latestUpdatedAt`.
- **Campaigns** and **Lists** streams filter records after fetching them, so this setting doesn't affect them.

Reduce the window if a Leads sync struggles with one Bulk Extract job's data volume. This issue is most common with large lead databases. It can also follow a backfill or enrichment process that updates many leads at once. Smaller windows create more jobs, with less data to download and process in each job.

## Supported sync modes

The Marketo source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh | Overwrite
- Full Refresh | Append
- Incremental | Append
- Incremental | Deduped

## Supported streams

This connector syncs these streams from Marketo:

| Stream | Sync mode | Description |
| :----- | :-------- | :---------- |
| **Activities_X** | Incremental | Lead activities of type X. For example, `activities_send_email` contains lead activities related to the `send_email` activity type. One stream is created per activity type. Uses `activityDate` as the cursor field. See the [Marketo Activities API docs](https://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#!/Activities/getLeadActivitiesUsingGET) for details. |
| **[Activity types](https://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#!/Activities/getAllActivityTypesUsingGET)** | Full Refresh | Metadata about activity types. |
| **[Campaigns](https://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#!/Campaigns/getCampaignsUsingGET)** | Incremental | Marketo campaigns. Uses `createdAt` as the cursor field. |
| **[Emails](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/assets/emails)** | Incremental | Marketo email assets, including subject, sender info, status, and template. Uses `updatedAt` as the cursor field. |
| **[Leads](https://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#!/Leads/getLeadByIdUsingGET)** | Incremental | Marketo leads. Uses `updatedAt` as the cursor field. The schema is dynamically generated from the `leads/describe.json` API, so custom fields are automatically discovered and included. |
| **[Lists](https://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#!/Static_Lists/getListByIdUsingGET)** | Incremental | Marketo static lists. Uses `createdAt` as the cursor field. |
| **[Programs](https://developers.marketo.com/rest-api/endpoint-reference/asset-endpoint-reference/#!/Programs/browseProgramsUsingGET)** | Incremental | Marketo programs, including user-defined tags, period costs, and Salesforce cross-reference fields (`sfdcId` and `sfdcName`) for programs synced with Salesforce. Uses `updatedAt` as the cursor field. |
| **[Program Tokens](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/assets/tokens)** | Full Refresh | Token definitions (My Tokens) for each program. This is a child stream of Programs, fetching tokens for every program. |
| **[Segmentations](https://developers.marketo.com/rest-api/endpoint-reference/asset-endpoint-reference/#!/Segments/getSegmentationUsingGET)** | Full Refresh | Marketo segmentations. |

## Limitations and troubleshooting

### Leads fields and schema behaviour

The Leads stream schema combines every static schema field with custom fields found through the Marketo `leads/describe.json` API. The static schema contains standard Marketo fields, but some aren't available in every Marketo instance. For consistency, unavailable fields remain in the schema and always contain `null` in synced records. Bulk export API calls only request fields confirmed by the `leads/describe.json` endpoint. Selected fields unavailable through your Marketo instance's describe endpoint are silently excluded from the export request. This prevents Marketo API error 1003 ("Invalid fields").

### Stalled requests and timeouts

From version 2.1.1, every Marketo request has a 30-second connection timeout and a 300-second read timeout. The read timeout measures the gap between response chunks, not the total download time. Bulk export files can therefore take as long as needed while Marketo continues sending data. If a connection stalls, the request fails and Airbyte retries it, preventing the sync from hanging indefinitely. Repeated timeout errors in your sync logs usually indicate network problems between Airbyte and Marketo, not a configuration issue.

### Failed or cancelled bulk export jobs

The Leads and Activities streams create one Marketo Bulk Extract job for each date window. They then poll the job until Marketo reports it as `Completed`. If Marketo reports `Failed` or `Cancelled` instead, the sync stops with an error naming the affected stream. The error log also includes the export job ID and the window's date range. From version 2.1.3, the connector reports this as a transient error instead of a configuration error. The failure is usually temporary and doesn't indicate a problem with your connector settings. Repeated failures for the same stream and date window indicate that the job is failing in Marketo. Check the export job in Marketo. Consider reducing [**Bulk Export Window in Days**](#advanced-configuration) so each job exports less data.

### Activity attributes and value conversion

Each `activities_X` stream builds its schema from Marketo's attribute metadata for that activity type. Attributes become top-level columns with snake_case names. Every activity also includes `marketoGUID`, `leadId`, `activityDate`, `activityTypeId`, `campaignId`, `primaryAttributeValueId`, and `primaryAttributeValue`. Attribute values arrive inside a JSON blob in the bulk export file. Marketo may describe an attribute as a boolean, but deliver it as `0` or `1` instead of `"true"` or `"false"`. From version 2.1.2, the connector converts numbers to booleans. It writes `null` for values it can't convert instead of failing the sync. See [Data type map](#data-type-map) for the complete conversion rules.

If you add an attribute to a Marketo activity type, refresh the source schema in Airbyte. The new column will then appear in the stream.

### Program Tokens performance

The Program Tokens stream makes one API call for each program in your Marketo instance. With many programs, this stream may take longer to sync and consume more of your daily API quota.

## Performance considerations

Marketo applies these API limits:

- **Daily API call quota**: 50,000 calls per day, resetting at 12:00 AM CST.
- **Rate limit**: 100 calls per 20 seconds.
- **Concurrency limit**: 10 concurrent API calls.
- **Bulk extract quota**: 500 MB per day, shared between leads and activities. Resets at midnight CST.

The Leads and Activities streams use the [Marketo Bulk Extract API](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/bulk-extract/bulk-extract). This is subject to the bulk extract quota, not the daily API call quota. If you exceed the bulk extract quota, the connector stops replicating data until the quota resets.

For large incremental Leads catch-up syncs, reduce [**Bulk Export Window in Days**](#advanced-configuration). This splits the `updatedAt` cursor range into smaller Bulk Extract jobs. It helps you avoid very large export files after external processes update many of your leads.

All other streams use the standard REST API and count against the daily API call quota.

If these limits are too restrictive, contact your Marketo account manager to request a quota increase.

## Data type map

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`, `text`, `textarea`, `url`, `phone`, `email`, `reference`, `lead_function` | `string` | Marketo types the connector doesn't recognize are also mapped to `string`. |
| `integer`, `percent`, `score` | `integer` | Decimals arriving as strings are truncated, so `"4.7"` becomes `4`. Anything else the connector can't read as a whole number, including a JSON float in an activity attribute, becomes `null`. |
| `float`, `currency` | `number` | Values the connector can't parse as a number become `null`. |
| `boolean` | `boolean` | Strings become `true` only when they read `true`, in any capitalization; every other string becomes `false`. Numbers follow `0` is `false` and anything else is `true`. Values of any other type become `null`. |
| `date` | `string` | Format: `date` |
| `datetime` | `string` | Format: `date-time` |
| `array` | `array` | Primitive arrays are converted into arrays of the types described in this table. |

Empty values, empty strings, and the literal string `null` always sync as `null`.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version  | Date       | Pull Request                                             | Subject                                                                                          |
|:---------|:-----------|:---------------------------------------------------------|:-------------------------------------------------------------------------------------------------|
| 2.1.3 | 2026-09-02 | [79644](https://github.com/airbytehq/airbyte/pull/79644) | Raise structured `AirbyteTracedException` with context when Marketo bulk export jobs fail or are cancelled. |
| 2.1.2 | 2026-08-28 | [85097](https://github.com/airbytehq/airbyte/pull/85097) | Handle numeric and other non-string values for boolean-typed fields in activity streams instead of failing the sync. |
| 2.1.1 | 2026-07-27 | [80926](https://github.com/airbytehq/airbyte/pull/80926) | Configure HTTP streaming and read timeouts for Marketo requests to detect stalled connections. |
| 2.1.0 | 2026-07-27 | [78362](https://github.com/airbytehq/airbyte/pull/78362) | Expose Bulk Export Window in Days so large incremental Marketo syncs can use smaller Bulk Extract jobs. |
| 2.0.1 | 2026-06-04 | [78428](https://github.com/airbytehq/airbyte/pull/78428) | Stream Marketo bulk export downloads to reduce memory usage for large CSV exports. |
| 2.0.0 | 2026-05-07 | [76892](https://github.com/airbytehq/airbyte/pull/76892) | Fix `leads` stream to filter Bulk Lead Extract on `updatedAt` so incremental syncs capture updates to pre-existing leads. See the [migration guide](/integrations/sources/marketo-migrations) for details. |
| 1.6.2 | 2026-03-26 | [75461](https://github.com/airbytehq/airbyte/pull/75461) | Add sfdcId and sfdcName fields to programs stream schema |
| 1.6.1 | 2026-03-25 | [74088](https://github.com/airbytehq/airbyte/pull/74088) | Fix CSV column misalignment when syncing leads containing CJK characters |
| 1.6.0 | 2026-03-19 | [74826](https://github.com/airbytehq/airbyte/pull/74826) | Add Emails and Program Tokens streams |
| 1.5.0 | 2026-03-18 | [74136](https://github.com/airbytehq/airbyte/pull/74136) | Add dynamic schema discovery for custom fields on Leads stream; add tags and costs to Programs schema; add workspace to Segmentations schema |
| 1.4.40 | 2026-02-25 | [73309](https://github.com/airbytehq/airbyte/pull/73309) | Fix KeyError and TypeError when Marketo API responses lack 'result' key in export status and create endpoints |
| 1.4.39 | 2026-01-26 | [71849](https://github.com/airbytehq/airbyte/pull/71849) | Add error handling for type conversion in format_value |
| 1.4.38 | 2025-10-21 | [68475](https://github.com/airbytehq/airbyte/pull/68475) | Update dependencies |
| 1.4.37 | 2025-10-14 | [67858](https://github.com/airbytehq/airbyte/pull/67858) | Update dependencies |
| 1.4.36 | 2025-10-07 | [67394](https://github.com/airbytehq/airbyte/pull/67394) | Update dependencies |
| 1.4.35 | 2025-09-30 | [66352](https://github.com/airbytehq/airbyte/pull/66352) | Update dependencies |
| 1.4.34 | 2025-09-09 | [65855](https://github.com/airbytehq/airbyte/pull/65855) | Update dependencies |
| 1.4.33 | 2025-08-23 | [65168](https://github.com/airbytehq/airbyte/pull/65168) | Update dependencies |
| 1.4.32 | 2025-08-16 | [64988](https://github.com/airbytehq/airbyte/pull/64988) | Update dependencies |
| 1.4.31 | 2025-08-09 | [64729](https://github.com/airbytehq/airbyte/pull/64729) | Update dependencies |
| 1.4.30 | 2025-08-02 | [64262](https://github.com/airbytehq/airbyte/pull/64262) | Update dependencies |
| 1.4.29 | 2025-07-26 | [63912](https://github.com/airbytehq/airbyte/pull/63912) | Update dependencies |
| 1.4.28 | 2025-07-12 | [63152](https://github.com/airbytehq/airbyte/pull/63152) | Update dependencies |
| 1.4.27 | 2025-07-05 | [61142](https://github.com/airbytehq/airbyte/pull/61142) | Update dependencies |
| 1.4.26 | 2025-05-28 | [60823](https://github.com/airbytehq/airbyte/pull/60823) | Fix Attribute Errors on `Leads` stream |
| 1.4.25 | 2025-05-24 | [60693](https://github.com/airbytehq/airbyte/pull/60693) | Update dependencies |
| 1.4.24 | 2025-05-10 | [59770](https://github.com/airbytehq/airbyte/pull/59770) | Update dependencies |
| 1.4.23 | 2025-05-03 | [58788](https://github.com/airbytehq/airbyte/pull/58788) | Update dependencies |
| 1.4.22 | 2025-04-12 | [57702](https://github.com/airbytehq/airbyte/pull/57702) | Update dependencies |
| 1.4.21 | 2025-04-05 | [57071](https://github.com/airbytehq/airbyte/pull/57071) | Update dependencies |
| 1.4.20 | 2025-03-29 | [56674](https://github.com/airbytehq/airbyte/pull/56674) | Update dependencies |
| 1.4.19 | 2025-03-22 | [56016](https://github.com/airbytehq/airbyte/pull/56016) | Update dependencies |
| 1.4.18 | 2025-03-08 | [55426](https://github.com/airbytehq/airbyte/pull/55426) | Update dependencies |
| 1.4.17 | 2025-03-01 | [54761](https://github.com/airbytehq/airbyte/pull/54761) | Update dependencies |
| 1.4.16 | 2025-02-22 | [54321](https://github.com/airbytehq/airbyte/pull/54321) | Update dependencies |
| 1.4.15 | 2025-02-15 | [53790](https://github.com/airbytehq/airbyte/pull/53790) | Update dependencies |
| 1.4.14 | 2025-02-01 | [52711](https://github.com/airbytehq/airbyte/pull/52711) | Update dependencies |
| 1.4.13 | 2025-01-25 | [52278](https://github.com/airbytehq/airbyte/pull/52278) | Update dependencies |
| 1.4.12 | 2025-01-11 | [51165](https://github.com/airbytehq/airbyte/pull/51165) | Update dependencies |
| 1.4.11 | 2025-01-04 | [50890](https://github.com/airbytehq/airbyte/pull/50890) | Update dependencies |
| 1.4.10 | 2024-12-28 | [50655](https://github.com/airbytehq/airbyte/pull/50655) | Update dependencies |
| 1.4.9 | 2024-12-21 | [43736](https://github.com/airbytehq/airbyte/pull/43736) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 1.4.8 | 2024-12-20 | [49972](https://github.com/airbytehq/airbyte/pull/49972) | Pin CDK due to breaking changes in newer versions. |
| 1.4.7 | 2024-07-06 | [40629](https://github.com/airbytehq/airbyte/pull/40629) | Update dependencies |
| 1.4.6 | 2024-06-26 | [40530](https://github.com/airbytehq/airbyte/pull/40530) | Update dependencies |
| 1.4.5 | 2024-06-25 | [40318](https://github.com/airbytehq/airbyte/pull/40318) | Update dependencies |
| 1.4.4 | 2024-06-23 | [40001](https://github.com/airbytehq/airbyte/pull/40001) | Update dependencies |
| `1.4.3`  | 2024-06-18 | [39549](https://github.com/airbytehq/airbyte/pull/39549) | Refactor: use `client_side_incremental` feature                                                  |
| `1.4.2`  | 2024-06-06 | [39297](https://github.com/airbytehq/airbyte/pull/39297) | [autopull] Upgrade base image to v1.2.2                                                          |
| `1.4.1`  | 2024-05-23 | [38631](https://github.com/airbytehq/airbyte/pull/38631) | Update deprecated authenticator package                                                          |
| `1.4.0`  | 2024-04-15 | [36854](https://github.com/airbytehq/airbyte/pull/36854) | Migrate to low-code                                                                              |
| `1.3.2`  | 2024-04-19 | [36650](https://github.com/airbytehq/airbyte/pull/36650) | Updating to 0.80.0 CDK                                                                           |
| `1.3.1`  | 2024-04-12 | [36650](https://github.com/airbytehq/airbyte/pull/36650) | schema descriptions                                                                              |
| `1.3.0`  | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0`                                                                  |
| `1.2.6`  | 2024-02-09 | [35078](https://github.com/airbytehq/airbyte/pull/35078) | Manage dependencies with Poetry.                                                                 |
| `1.2.5`  | 2024-01-15 | [34246](https://github.com/airbytehq/airbyte/pull/34246) | prepare for airbyte-lib                                                                          |
| `1.2.4`  | 2024-01-08 | [33999](https://github.com/airbytehq/airbyte/pull/33999) | Fix for `Export daily quota exceeded`                                                            |
| `1.2.3`  | 2023-08-02 | [28999](https://github.com/airbytehq/airbyte/pull/28999) | Fix for ` _csv.Error: line contains NUL`                                                         |
| `1.2.2`  | 2023-10-19 | [31599](https://github.com/airbytehq/airbyte/pull/31599) | Base image migration: remove Dockerfile and use the python-connector-base image                  |
| `1.2.1`  | 2023-09-18 | [30533](https://github.com/airbytehq/airbyte/pull/30533) | Fix `json_schema` for stream `Leads`                                                             |
| `1.2.0`  | 2023-06-26 | [27726](https://github.com/airbytehq/airbyte/pull/27726) | License Update: Elv2                                                                             |
| `1.1.0`  | 2023-04-18 | [23956](https://github.com/airbytehq/airbyte/pull/23956) | Add `Segmentations` Stream                                                                       |
| `1.0.4`  | 2023-04-25 | [25481](https://github.com/airbytehq/airbyte/pull/25481) | Minor fix for bug caused by `<=` producing additional API call when there is a single date slice |
| `1.0.3`  | 2023-02-13 | [22938](https://github.com/airbytehq/airbyte/pull/22938) | Specified date formatting in specification                                                       |
| `1.0.2`  | 2023-02-01 | [22203](https://github.com/airbytehq/airbyte/pull/22203) | Handle Null cursor values                                                                        |
| `1.0.1`  | 2023-01-31 | [22015](https://github.com/airbytehq/airbyte/pull/22015) | Set `AvailabilityStrategy` for streams explicitly to `None`                                      |
| `1.0.0`  | 2023-01-25 | [21790](https://github.com/airbytehq/airbyte/pull/21790) | Fix `activities_*` stream schemas                                                                |
| `0.1.12` | 2023-01-19 | [20973](https://github.com/airbytehq/airbyte/pull/20973) | Fix encoding error (note: this change is not in version 1.0.0, but is in later versions          |
| `0.1.11` | 2022-09-30 | [17445](https://github.com/airbytehq/airbyte/pull/17445) | Do not use temporary files for memory optimization                                               |
| `0.1.10` | 2022-09-30 | [17445](https://github.com/airbytehq/airbyte/pull/17445) | Optimize memory consumption                                                                      |
| `0.1.9`  | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/pull/17304) | Migrate to per-stream sate.                                                                      |
| `0.1.7`  | 2022-08-23 | [15817](https://github.com/airbytehq/airbyte/pull/15817) | Improved unit test coverage                                                                      |
| `0.1.6`  | 2022-08-21 | [15824](https://github.com/airbytehq/airbyte/pull/15824) | Fix semi incremental streams: do not ignore start date, make one api call instead of multiple    |
| `0.1.5`  | 2022-08-16 | [15683](https://github.com/airbytehq/airbyte/pull/15683) | Retry failed creation of a job instead of skipping it                                            |
| `0.1.4`  | 2022-06-20 | [13930](https://github.com/airbytehq/airbyte/pull/13930) | Process failing creation of export jobs                                                          |
| `0.1.3`  | 2021-12-25 | [8578](https://github.com/airbytehq/airbyte/pull/8578)   | Updated titles and descriptions                                                                  |
| `0.1.2`  | 2021-12-03 | [8483](https://github.com/airbytehq/airbyte/pull/8483)   | Improve field conversion to conform schema                                                       |
| `0.1.1`  | 2021-11-29 | [0000](https://github.com/airbytehq/airbyte/pull/0000)   | Fix timestamp value format issue                                                                 |
| `0.1.0`  | 2021-09-06 | [5863](https://github.com/airbytehq/airbyte/pull/5863)   | Release Marketo CDK Connector                                                                    |

</details>
