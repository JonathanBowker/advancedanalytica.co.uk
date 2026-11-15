---
generated_record: true
connector_name: Google Sheets
connector_type: source
connector_slug: google-sheets
connector_directory: source-google-sheets
definition_id: 71607ba1-c0ac-4799-8049-7f4b90dd50f7
version: 0.13.1
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/google-sheets
logo: /images/connectors/sources/google-sheets.svg
logo_source_path: airbyte-integrations/connectors/source-google-sheets/icon.svg
logo_sha256: 44a467fde0f95f84990d473a328b4230c4852025fd17e27866c4664cb87bf4d3
original_metadata_path: airbyte-integrations/connectors/source-google-sheets/metadata.yaml
original_metadata_sha256: 68c484bb136fe79df1ad0f05c9b22336cfa8ece90ae4ad390b82446cdc3d0eba
original_document_path: docs/integrations/sources/google-sheets.md
original_document_sha256: 8726dff5e2eaae0fc8f7ff9c8ff60e70ff89b68885323d7564520af344dc9927
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 732de7cfc518fdbb7d26132afff0e80f53b9ecee0bb8de9b0482dce10624f1b4
rewritten_at: 2026-11-12T14:17:17.319823+00:00
---

# Google Sheets

<HideInUI>

Use this page to set up and reference the [Google Sheets](https://developers.google.com/sheets) source connector.

</HideInUI>

:::info
The Google Sheets source connector pulls data from one Google Sheets spreadsheet. You can sync every sheet within that spreadsheet. To sync multiple spreadsheets, use the Google Drive connector or configure multiple Google Sheets source connectors in your Airbyte instance. The connector doesn't access other files in your Google Drive.
:::

### Prerequisites

- **Spreadsheet Link** - The link to the Google spreadsheet you want to sync.
<!-- env:cloud -->
- **For Airbyte Cloud** A Google Workspace user with access to the spreadsheet
<!-- /env:cloud -->
  <!-- env:oss -->
- **For Airbyte Open Source:**
  - A GCP project
  - The Google Sheets API enabled in your GCP project
  - A Service Account Key with access to the spreadsheet you want to replicate
<!-- /env:oss -->

## Setup guide

You can authenticate the Google Sheets source connector with OAuth or Service Account Key Authentication.

### Step 1: Set up Google Sheets

<!-- env:cloud -->

**For Airbyte Cloud:**

OAuth is strongly recommended because it simplifies setup and lets you authenticate [directly from the Airbyte UI](#set-up-the-google-sheets-source-connector-in-airbyte).

<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

Service Account Key Authentication is recommended. Follow these steps to create a service account, generate a key and enable the Google Sheets API.

:::note
If you prefer OAuth authentication with **Airbyte Open Source**, follow [Google's OAuth instructions](https://developers.google.com/identity/protocols/oauth2) to create an authentication app. Set the scopes to `https://www.googleapis.com/auth/spreadsheets.readonly` and `https://www.googleapis.com/auth/drive.readonly`. You'll need your client ID, client secret and refresh token when setting up the connector.
:::

### Set up the service account key

#### Create a service account

1. Open the [Service Accounts page](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts) in your Google Cloud console.
2. Select an existing project or create a new one.
3. At the top of the page, click **+ Create service account**.
4. Enter a name and description for the service account, then click **Create and Continue**.
5. Under **Service account permissions**, select the roles to grant the service account, then click **Continue**. The **Viewer** role is recommended.

#### Generate a key

1. Go to the [API Console/Credentials](https://console.cloud.google.com/apis/credentials) page and click the email address of the service account you created.
2. In the **Keys** tab, click **+ Add key**, then click **Create new key**.
3. Select **JSON** as the Key type. This generates and downloads the JSON key file you'll use for authentication. Click **Continue**.

#### Enable the Google Sheets API

1. Go to the [API Console/Library](https://console.cloud.google.com/apis/library) page.
2. Confirm that you've selected the correct project at the top.
3. Find and select the **Google Sheets API**.
4. Click **ENABLE**.

If anyone with the link can view your spreadsheet, you don't need to take further action. Otherwise, select the spreadsheet in Google Drive and click **Share**. Add the service account's email address with **Viewer** permission. This address is the `client_email` value in your JSON key. See [Google's sharing instructions](https://support.google.com/drive/answer/7166529) for details.

<!-- /env:oss -->

### Set up the Google Sheets connector in Airbyte

<!-- env:cloud -->
#### For Airbyte Cloud: 

1. Open your [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Google Sheets from the Source type dropdown.
4. Enter a name for the Google Sheets connector.
<!-- /env:cloud -->
<!-- env:oss -->
### For Airbyte Open Source:

1. Open the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Google Sheets from the Source type dropdown.
4. Enter a name for the Google Sheets connector.
<!-- /env:oss -->
5. Select your authentication method:
<!-- env:cloud -->
- **For Airbyte Cloud: (Recommended)** Select **Authenticate via Google (OAuth)** from the Authentication dropdown, click **Sign in with Google** and complete the authentication workflow.
  <!-- /env:cloud -->
  <!-- env:oss -->
- **For Airbyte Open Source: (Recommended)** Select **Service Account Key Authentication** from the dropdown and enter your Google Cloud service account key in JSON format:

```json
  {
    "type": "service_account",
    "project_id": "YOUR_PROJECT_ID",
    "private_key_id": "YOUR_PRIVATE_KEY",
    ...
  }
```

- To authenticate your Google account through OAuth, select **Authenticate via Google (OAuth)** from the dropdown. Enter your Google application's client ID, client secret and refresh token.
<!-- /env:oss -->
<FieldAnchor field="spreadsheet_id">
6. For **Spreadsheet Link**, enter the link to the Google spreadsheet. To get it, open the Google spreadsheet you want to sync. Click **Share** in the top-right corner, then click **Copy Link**.
</FieldAnchor>
<FieldAnchor field="batch_size">
7. For **Batch Size**, enter an integer representing the batch size used to process a Google Sheet. The default value is 1000000.
   Batch size is the number of rows included in each request sent to the Google Sheets API.
   For example, the default value of 1000000 processes rows 2-1000002, followed by 1000003-2000003, and so on.
   Based on [Google Sheets API limits documentation](https://developers.google.com/sheets/api/limits), you can send up to 300 requests per minute.
   Each request must finish within 180 seconds or it returns a timeout error.
   Consider your network speed and the Google Sheet's column count when choosing a batch_size value.
</FieldAnchor>
<FieldAnchor field="names_conversion">
8. (Optional) You can enable **Convert Column Names to SQL-Compliant Format**. This option converts column names into a standardised, SQL-friendly format. For example, it converts `Café Earnings 2022` to `cafe_earnings_2022`. Enable this option if your target destination uses SQL, such as Postgres or MySQL. The default is false.
9. Click **Set up source** and wait for the tests to finish.
</FieldAnchor>
<HideInUI>

## Configuration options

### Rename sheet and stream names

You can rename streams, including sheet and tab names, as they appear in Airbyte and your destination. This option helps when sheet names aren't descriptive, contain special characters or need consistent naming across sources.

#### How stream renaming works

- Provide a list of overrides. Each override specifies a `source_stream_name`, the exact sheet or tab name in your spreadsheet. It also specifies a `custom_stream_name`, the name shown in Airbyte and your destination.
- If `source_stream_name` isn’t found in your spreadsheet, the connector ignores it and uses the default name.
- This feature only changes stream names for sheets or tabs. It doesn’t change field or column names.
- To rename fields or columns, use the Airbyte Mappings feature after creating your connection. See the Airbyte [documentation](https://docs.airbyte.com/platform/using-airbyte/mappings) for details on using Mappings.
- Stream renaming happens before any other name conversion or sanitisation options.

#### Example

Your spreadsheet contains sheets named `Sheet1`, `2024 Q1` and `Summary`. You want to rename them to `sales_data` and `q1_2024`, while leaving `Summary` unchanged. Configure:

```json
[
  { "source_stream_name": "Sheet1", "custom_stream_name": "sales_data" },
  { "source_stream_name": "2024 Q1", "custom_stream_name": "q1_2024" }
]
```

After discovery, Airbyte names your streams `sales_data`, `q1_2024` and `Summary`.

#### Configure stream names

- In the Airbyte UI, add your overrides to the **Stream Name Overrides** field as an array of objects.
- Leave this field blank if you don’t want to rename any streams.
- **After adding or changing a stream name override, refresh your schema in Airbyte to see the new stream names take effect.**
- **Overridden streams will default to Sync Mode: Full Refresh (Append), which does not support primary keys. If you want to use primary keys and deduplication, update the sync mode to "Full Refresh | Overwrite + Deduped" in your connection settings.**

---

### Google Sheets connector column names

The Google Sheets connector lets you convert spreadsheet column names into a SQL-compliant format. Configure these settings in the Airbyte UI when setting up the connector.

---

#### 1. Convert Column Names to SQL-Compliant Format
- **Description**: When enabled, this setting converts column names into a format compatible with SQL databases. For example, it uses lowercase and replaces spaces with underscores. You must enable this primary toggle before applying any column name conversion.
- **Default**: Off

---

#### 2. Additional Conversion Options
Use the following options to refine column name conversion. They only apply when "Convert Column Names to SQL-Compliant Format" is enabled.

- **Remove Leading and Trailing Underscores**
  - **Description**: Removes leading and trailing underscores from column names. If "Allow Leading Numbers" is disabled, leading underscores remain on names starting with a number.
  - **Example**:  
    - Input: `"  EXAMPLE Domain  "`  
    - Output: `"example_domain"`
  - **Default**: Off

- **Combine Number-Word Pairs**
  - **Description**: Combines adjacent numbers and words into one token without separators.
  - **Example**:  
    - Input: `"50th Percentile"`  
    - Output: `"50th_percentile"` (if "Allow Leading Numbers" is enabled)  
    - Output: `"_50th_percentile"` (if "Allow Leading Numbers" is disabled)
  - **Default**: Off

- **Remove All Special Characters**
  - **Description**: Removes all special characters, including `*`, `?`, `!`, `$`, `%`, `(` and `)`, from column names.
  - **Example**:  
    - Input: `"Example ID*"`  
    - Output: `"example_id"`
  - **Default**: Off

- **Combine Letter-Number Pairs**
  - **Description**: Combines adjacent letters and numbers into one token without separators.
  - **Example**:  
    - Input: `"Q3 2023"`  
    - Output: `"q3_2023"`
  - **Default**: Off

- **Allow Leading Numbers**
  - **Description**: Allows column names to start with numbers. If disabled, column names beginning with a number receive a leading underscore.
  - **Example**:  
    - Input: `"50th Percentile"`  
    - Output: `"50_th_percentile"` (if enabled)  
    - Output: `"_50_th_percentile"` (if disabled)
  - **Default**: Off

---

#### Conversion details
- All converted column names use lowercase.
- Multiple spaces or special characters are collapsed or removed, rather than replaced with multiple underscores.
- Only single underscores separate tokens.
- The result is always SQL-friendly and readable.

---

Use these options to match column name conversions to your database requirements. Adjust them as needed in the Airbyte UI when configuring the Google Sheets connector.

---

### Header deduplication

The Google Sheets connector automatically creates unique field names for duplicate column headers by appending each cell position. This ensures every column syncs correctly, even when your spreadsheet contains duplicate header names.

#### How duplicate headers work

- When the connector detects duplicate headers, it appends `_<cell_position>` to each duplicated header name.
- The cell position follows the standard Google Sheet naming convention, such as A1, B1 and C1.
- This creates unique field names while preserving the original header text.

#### Example

Your spreadsheet has a header named `stats` in columns C and Q, at positions C1 and Q1. The connector creates two distinct fields:
- `stats_C1` for the column at position C1
- `stats_Q1` for the column at position Q1

This ensures data from both columns is captured and synced to your destination. Each field clearly identifies the column it represents.

---

## Supported sync modes

The Google Sheets source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)

### Supported streams

Each sheet in the selected spreadsheet syncs as a separate stream. Each selected column in the sheet syncs as a string field.

Airbyte can only replicate [Grid](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetType) sheets.

## Data type mapping

| Integration Type | Airbyte Type | Notes |
|:-----------------|:-------------|:------|
| any type         | `string`     |       |

## Limitations and troubleshooting

<details>
<summary>
Expand to see details about Google Sheets connector limitations and troubleshooting.
</summary>

### Connector limitations

#### Rate limits

The [Google API rate limits](https://developers.google.com/sheets/api/limits) are:

- 300 read requests per minute per project
- 60 requests per minute per user per project

Airbyte batches API requests to pull data efficiently while respecting these rate limits. For high transfer speeds, Airbyte recommends using each user or service account for no more than 3 Google Sheets source connector instances.

### Troubleshooting

- **Invalid Spreadsheet Link:** Enter a bare spreadsheet ID. An optional trailing `/` is accepted. You can also enter a full spreadsheet URL. Supported forms include `https://docs.google.com/spreadsheets/d/<id>/...`, `https://docs.google.com/spreadsheets/u/0/d/<id>/...`, and `https://sheets.googleapis.com/v4/spreadsheets/<id>/...`. Existing HTTPS links remain supported when Airbyte can extract the ID. Airbyte checks access through the Google Sheets API.
- **Spreadsheet not found or access denied:** Check that the spreadsheet exists and the link is correct. Share the spreadsheet with the service account's `client_email` from its JSON key. Alternatively, share it with the Google user authorised for the source.
- **Google API disabled:** Enable both the Google Sheets API and Google Drive API in the Google Cloud project linked to your credentials. Allow a few minutes for the change to take effect, then retry.
- **Authentication failed:** Re-authenticate the source if OAuth authorisation has expired or been revoked. For service accounts, provide the complete JSON key downloaded from Google Cloud. Create a new key if the existing key is invalid or revoked.
- Airbyte won't delete the destination table if your sheet is deleted or completely empty, with no header rows. In this case, the sync logs will say the sheet was skipped while syncing the full spreadsheet.
- Connector setup will fail unless the spreadsheet is a Google Sheets file. Setup could fail if the file was saved or imported as another file type.
- Google is probably struggling to serve the spreadsheet if connection checks or schema discovery fail with `Failed to find output files from connector within timeout of 9 minute(s)` after repeated `Rate limit exceeded (HTTP 503)` retries. The connector records every retry as `Rate limit exceeded`. However, `503` means the Sheets API is unavailable or considers the request or spreadsheet too complex. Therefore, the API rate limits above usually aren't the cause. During checks and discovery, the connector reads every sheet's header row. This includes hidden sheets and sheets you don't sync. It retries each `503` up to five times, with increasingly long waits. Across all requests, these waits can exceed the 9-minute limit. If one request exhausts its retries first, you'll see `Exhausted available request attempts` instead. Airbyte checks the source before sync attempts. Therefore, syncs can fail for days, then succeed without any Airbyte-side change. To reduce the load, follow Google's [suggestions for `503` errors](https://developers.google.com/workspace/sheets/api/troubleshoot-api-errors#503-service-unavailable). For example:
  - Limit spreadsheet access to people who need it. For example, remove inactive accounts from its sharing settings.
  - Limit `IMPORTRANGE`, `QUERY`, and other complex formulas. Use volatile functions like `NOW`, `TODAY`, and `RAND` sparingly.
  - Delete sheets you don't need. Alternatively, move the sheets you sync into a separate, smaller spreadsheet. Hiding a sheet doesn't help because the connector still reads it. Paste plain values into the new spreadsheet instead of using `IMPORTRANGE`, which increases formula load.
- See common troubleshooting issues for the Google Sheets source connector on the [Airbyte Forum](https://github.com/airbytehq/airbyte/discussions).

</details>

</HideInUI>

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--- | :----------- | :------ |
| 0.13.1 | 2026-11-10 | [91589](https://github.com/airbytehq/airbyte/pull/91589) | Update dependencies |
| 0.13.0 | 2026-10-30 | [90237](https://github.com/airbytehq/airbyte/pull/90237) | Declare the sections of the stepped setup form (Connect spreadsheet, Review & set up) in the spec; the CDK's section-aware CHECK runs the declared check for the first section |
| 0.12.47 | 2026-10-30 | [90255](https://github.com/airbytehq/airbyte/pull/90255) | Validate spreadsheet links and explain authentication, API enablement, and access failures in connection checks |
| 0.12.46 | 2026-11-03 | [90596](https://github.com/airbytehq/airbyte/pull/90596) | Update dependencies |
| 0.12.45 | 2026-10-27 | [89945](https://github.com/airbytehq/airbyte/pull/89945) | Update dependencies |
| 0.12.44 | 2026-10-20 | [89239](https://github.com/airbytehq/airbyte/pull/89239) | Update dependencies |
| 0.12.43 | 2026-10-16 | [89046](https://github.com/airbytehq/airbyte/pull/89046) | Show Authentication before Spreadsheet Link in the setup form |
| 0.12.42 | 2026-10-13 | [88639](https://github.com/airbytehq/airbyte/pull/88639) | Update dependencies |
| 0.12.41 | 2026-10-06 | [87878](https://github.com/airbytehq/airbyte/pull/87878) | Update dependencies |
| 0.12.40 | 2026-09-29 | [87193](https://github.com/airbytehq/airbyte/pull/87193) | Update dependencies |
| 0.12.39 | 2026-09-22 | [86655](https://github.com/airbytehq/airbyte/pull/86655) | Update dependencies |
| 0.12.38 | 2026-09-15 | [86081](https://github.com/airbytehq/airbyte/pull/86081) | Update dependencies |
| 0.12.37 | 2026-09-08 | [85517](https://github.com/airbytehq/airbyte/pull/85517) | Update dependencies |
| 0.12.36 | 2026-08-18 | [83961](https://github.com/airbytehq/airbyte/pull/83961) | Update dependencies |
| 0.12.35 | 2026-07-28 | [82977](https://github.com/airbytehq/airbyte/pull/82977) | Update dependencies |
| 0.12.34 | 2026-07-21 | [82453](https://github.com/airbytehq/airbyte/pull/82453) | Update dependencies |
| 0.12.33 | 2026-07-14 | [81855](https://github.com/airbytehq/airbyte/pull/81855) | Update dependencies |
| 0.12.32 | 2026-06-30 | [81092](https://github.com/airbytehq/airbyte/pull/81092) | Update dependencies |
| 0.12.31 | 2026-06-23 | [80490](https://github.com/airbytehq/airbyte/pull/80490) | Update dependencies |
| 0.12.30 | 2026-06-16 | [79895](https://github.com/airbytehq/airbyte/pull/79895) | Update dependencies |
| 0.12.29 | 2026-06-09 | [78741](https://github.com/airbytehq/airbyte/pull/78741) | Update dependencies |
| 0.12.28 | 2026-06-03 | [79121](https://github.com/airbytehq/airbyte/pull/79121) | Promoted release candidate to GA |
| 0.12.28-rc.1 | 2026-05-29 | [78519](https://github.com/airbytehq/airbyte/pull/78519) | Set default_concurrency to 2, add num_workers spec field, add HTTP API budget |
| 0.12.27-rc.1 | 2026-05-26 | [78437](https://github.com/airbytehq/airbyte/pull/78437) | Set default_concurrency to 4 for concurrency tuning |
| 0.12.26 | 2026-05-26 | [78443](https://github.com/airbytehq/airbyte/pull/78443) | Update dependencies |
| 0.12.25 | 2026-04-28 | [77273](https://github.com/airbytehq/airbyte/pull/77273) | Update dependencies |
| 0.12.24 | 2026-04-21 | [76629](https://github.com/airbytehq/airbyte/pull/76629) | Update dependencies |
| 0.12.23 | 2026-04-02 | [75578](https://github.com/airbytehq/airbyte/pull/75578) | Add `oauth_connector_input_specification` with granular scopes |
| 0.12.23 | 2026-03-30 | [75578](https://github.com/airbytehq/airbyte/pull/75578) | Add `oauth_connector_input_specification` with granular scopes |
| 0.12.22 | 2026-03-17 | [74660](https://github.com/airbytehq/airbyte/pull/74660) | Update dependencies |
| 0.12.21 | 2026-02-24 | [73968](https://github.com/airbytehq/airbyte/pull/73968) | Update dependencies |
| 0.12.20 | 2026-02-10 | [73078](https://github.com/airbytehq/airbyte/pull/73078) | Update dependencies |
| 0.12.19 | 2026-02-03 | [72644](https://github.com/airbytehq/airbyte/pull/72644) | Update dependencies |
| 0.12.18 | 2026-01-20 | [71904](https://github.com/airbytehq/airbyte/pull/71904) | Update dependencies |
| 0.12.17 | 2026-01-14 | [71703](https://github.com/airbytehq/airbyte/pull/71703) | Update dependencies |
| 0.12.16 | 2025-12-18 | [70510](https://github.com/airbytehq/airbyte/pull/70510) | Update dependencies |
| 0.12.15 | 2025-12-03 | [69848](https://github.com/airbytehq/airbyte/pull/69848) | Add optional flag to read columns with empty headers |
| 0.12.14 | 2025-11-25 | [70029](https://github.com/airbytehq/airbyte/pull/70029) | Update dependencies |
| 0.12.13 | 2025-11-18 | [69396](https://github.com/airbytehq/airbyte/pull/69396) | Update dependencies |
| 0.12.12 | 2025-10-29 | [68759](https://github.com/airbytehq/airbyte/pull/68759) | Update dependencies |
| 0.12.11 | 2025-10-21 | [68254](https://github.com/airbytehq/airbyte/pull/68254) | Update dependencies |
| 0.12.10 | 2025-10-16 | [67531](https://github.com/airbytehq/airbyte/pull/67531) | Add error handling for unexpected data in sheets causing 500 responses. |
| 0.12.9 | 2025-10-14 | [67876](https://github.com/airbytehq/airbyte/pull/67876) | Update dependencies |
| 0.12.8 | 2025-10-07 | [67395](https://github.com/airbytehq/airbyte/pull/67395) | Update dependencies |
| 0.12.7 | 2025-09-30 | [65383](https://github.com/airbytehq/airbyte/pull/65383) | Update dependencies |
| 0.12.6 | 2025-09-16 | [66012](https://github.com/airbytehq/airbyte/pull/66012) | Update to CDK v7 |
| 0.12.5 | 2025-08-09 | [64633](https://github.com/airbytehq/airbyte/pull/64633) | Update dependencies |
| 0.12.4 | 2025-08-02 | [64179](https://github.com/airbytehq/airbyte/pull/64179) | Update dependencies |
| 0.12.3 | 2025-07-26 | [63822](https://github.com/airbytehq/airbyte/pull/63822) | Update dependencies |
| 0.12.2 | 2025-07-22 | [63334](https://github.com/airbytehq/airbyte/pull/63334) | Feature: Deduplicate Headers |
| 0.12.1 | 2025-07-19 | [55490](https://github.com/airbytehq/airbyte/pull/55490) | Update dependencies |
| 0.12.0 | 2025-07-15 | [63305](https://github.com/airbytehq/airbyte/pull/63305) | Promoting release candidate 0.12.0-rc.2 to a main version. |
| 0.12.0-rc.2 | 2025-07-11 | [62931](https://github.com/airbytehq/airbyte/pull/62931) | Fix: handle empty `propeties_to_match` in SchmemaMatchingExtractor |
| 0.12.0-rc.1 | 2025-07-02 | [62456](https://github.com/airbytehq/airbyte/pull/62456) | Feature: migrate connector to manifest-only format |
| 0.11.0 | 2025-06-11 | [61489](https://github.com/airbytehq/airbyte/pull/61489) | Feature: Added Streeam Name Override Options |
| 0.10.0 | 2025-06-09 | [60836](https://github.com/airbytehq/airbyte/pull/60836) | Feature: Added additional sanitization flags when using Convert Column Names to SQL-Compliant Format (names_conversion) |
| 0.9.6 | 2025-05-22 | [60874](https://github.com/airbytehq/airbyte/pull/60874) | Use custom backoff policy on 429 errors for single sheets |
| 0.9.5 | 2025-05-13 | [60259](https://github.com/airbytehq/airbyte/pull/60259) | Fix whitespaces used for column names when enabling `names_conversion` |
| 0.9.4 | 2025-03-01 | [54989](https://github.com/airbytehq/airbyte/pull/54989) | Update dependencies |
| 0.9.3 | 2025-02-22 | [54434](https://github.com/airbytehq/airbyte/pull/54434) | Update dependencies |
| 0.9.2 | 2025-02-15 | [53720](https://github.com/airbytehq/airbyte/pull/53720) | Update dependencies |
| 0.9.1 | 2025-02-08 | [51696](https://github.com/airbytehq/airbyte/pull/51696) | Update dependencies |
| 0.9.0 | 2025-02-04 | [53154](https://github.com/airbytehq/airbyte/pull/53154) | Promoting release candidate 0.9.0-rc.3 to a main version. |
| 0.9.0-rc.3 | 2025-01-31 | [52682](https://github.com/airbytehq/airbyte/pull/52682) | Fix stream name typing |
| 0.9.0-rc.2 | 2025-01-31 | [52671](https://github.com/airbytehq/airbyte/pull/52671) | Fix sheet id encoding |
| 0.9.0-rc.1 | 2025-01-30 | [50843](https://github.com/airbytehq/airbyte/pull/50843) | Migrate to low-code |
| 0.8.5 | 2025-01-11 | [44270](https://github.com/airbytehq/airbyte/pull/44270) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.8.4 | 2024-12-09 | [48835](https://github.com/airbytehq/airbyte/pull/48835) | Implementing integration tests |
| 0.7.4 | 2024-09-09 | [45108](https://github.com/airbytehq/airbyte/pull/45108) | Google Sheets API errors now cause syncs to fail |
| 0.7.3 | 2024-08-12 | [43921](https://github.com/airbytehq/airbyte/pull/43921) | Update dependencies |
| 0.7.2 | 2024-08-10 | [43544](https://github.com/airbytehq/airbyte/pull/43544) | Update dependencies |
| 0.7.1 | 2024-08-03 | [43290](https://github.com/airbytehq/airbyte/pull/43290) | Update dependencies |
| 0.7.0 | 2024-08-02 | [42975](https://github.com/airbytehq/airbyte/pull/42975) | Migrate to CDK v4.3.0 |
| 0.6.3 | 2024-07-27 | [42826](https://github.com/airbytehq/airbyte/pull/42826) | Update dependencies |
| 0.6.2 | 2024-07-22 | [41993](https://github.com/airbytehq/airbyte/pull/41993) | Avoid syncs with rate limits being considered successful |
| 0.6.1 | 2024-07-20 | [42376](https://github.com/airbytehq/airbyte/pull/42376) | Update dependencies |
| 0.6.0 | 2024-07-17 | [42071](https://github.com/airbytehq/airbyte/pull/42071) | Migrate to CDK v3.9.0 |
| 0.5.11 | 2024-07-13 | [41527](https://github.com/airbytehq/airbyte/pull/41527) | Update dependencies |
| 0.5.10 | 2024-07-09 | [41273](https://github.com/airbytehq/airbyte/pull/41273) | Update dependencies |
| 0.5.9 | 2024-07-06 | [41005](https://github.com/airbytehq/airbyte/pull/41005) | Update dependencies |
| 0.5.8 | 2024-06-28 | [40587](https://github.com/airbytehq/airbyte/pull/40587) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.5.7 | 2024-06-25 | [40560](https://github.com/airbytehq/airbyte/pull/40560) | Catch an auth error during discover and raise a config error |
| 0.5.6 | 2024-06-26 | [40533](https://github.com/airbytehq/airbyte/pull/40533) | Update dependencies |
| 0.5.5 | 2024-06-25 | [40505](https://github.com/airbytehq/airbyte/pull/40505) | Update dependencies |
| 0.5.4 | 2024-06-22 | [40129](https://github.com/airbytehq/airbyte/pull/40129) | Update dependencies |
| 0.5.3 | 2024-06-06 | [39225](https://github.com/airbytehq/airbyte/pull/39225) | [autopull] Upgrade base image to v1.2.2 |
| 0.5.2 | 2024-06-02 | [38851](https://github.com/airbytehq/airbyte/pull/38851) | Emit state message at least once per stream |
| 0.5.1 | 2024-04-11 | [35404](https://github.com/airbytehq/airbyte/pull/35404) | Add `row_batch_size` parameter more granular control read records |
| 0.5.0 | 2024-03-26 | [36515](https://github.com/airbytehq/airbyte/pull/36515) | Resolve poetry dependency conflict, add record counts to state messages |
| 0.4.0 | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0` |
| 0.3.17 | 2024-02-29 | [35722](https://github.com/airbytehq/airbyte/pull/35722) | Add logic to emit stream statuses |
| 0.3.16 | 2024-02-12 | [35136](https://github.com/airbytehq/airbyte/pull/35136) | Fix license in `pyproject.toml`. |
| 0.3.15 | 2024-02-07 | [34944](https://github.com/airbytehq/airbyte/pull/34944) | Manage dependencies with Poetry. |
| 0.3.14 | 2024-01-23 | [34437](https://github.com/airbytehq/airbyte/pull/34437) | Fix header cells filtering |
| 0.3.13 | 2024-01-19 | [34376](https://github.com/airbytehq/airbyte/pull/34376) | Fix names conversion |
| 0.3.12 | 2023-12-14 | [33414](https://github.com/airbytehq/airbyte/pull/33414) | Prepare for airbyte-lib |
| 0.3.11 | 2023-10-19 | [31599](https://github.com/airbytehq/airbyte/pull/31599) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.3.10 | 2023-09-27 | [30487](https://github.com/airbytehq/airbyte/pull/30487) | Fix bug causing rows to be skipped when batch size increased due to rate limits. |
| 0.3.9 | 2023-09-25 | [30749](https://github.com/airbytehq/airbyte/pull/30749) | Performance testing - include socat binary in docker image |
| 0.3.8 | 2023-09-25 | [30747](https://github.com/airbytehq/airbyte/pull/30747) | Performance testing - include socat binary in docker image |
| 0.3.7 | 2023-08-25 | [29826](https://github.com/airbytehq/airbyte/pull/29826) | Remove row batch size from spec, add auto increase this value when rate limits |
| 0.3.6 | 2023-08-16 | [29491](https://github.com/airbytehq/airbyte/pull/29491) | Update to latest CDK |
| 0.3.5 | 2023-08-16 | [29427](https://github.com/airbytehq/airbyte/pull/29427) | Add stop reading in case of 429 error |
| 0.3.4 | 2023-05-15 | [29453](https://github.com/airbytehq/airbyte/pull/29453) | Update spec descriptions |
| 0.3.3 | 2023-08-10 | [29327](https://github.com/airbytehq/airbyte/pull/29327) | Add user-friendly error message for 404 and 403 error while discover |
| 0.3.2 | 2023-08-09 | [29246](https://github.com/airbytehq/airbyte/pull/29246) | Add checking while reading to skip modified sheets |
| 0.3.1 | 2023-07-06 | [28033](https://github.com/airbytehq/airbyte/pull/28033) | Fixed several reported vulnerabilities (25 total), CVE-2022-37434, CVE-2022-42898 |
| 0.3.0 | 2023-06-26 | [27738](https://github.com/airbytehq/airbyte/pull/27738) | License Update: Elv2 |
| 0.2.39 | 2023-05-31 | [26833](https://github.com/airbytehq/airbyte/pull/26833) | Remove authSpecification in favour of advancedAuth in specification |
| 0.2.38 | 2023-05-16 | [26097](https://github.com/airbytehq/airbyte/pull/26097) | Refactor config error |
| 0.2.37 | 2023-02-21 | [23292](https://github.com/airbytehq/airbyte/pull/23292) | Skip non grid sheets. |
| 0.2.36 | 2023-02-21 | [23272](https://github.com/airbytehq/airbyte/pull/23272) | Handle empty sheets gracefully. |
| 0.2.35 | 2023-02-23 | [23057](https://github.com/airbytehq/airbyte/pull/23057) | Slugify column names |
| 0.2.34 | 2023-02-15 | [23071](https://github.com/airbytehq/airbyte/pull/23071) | Change min spreadsheet id size to 20 symbols |
| 0.2.33 | 2023-02-13 | [23278](https://github.com/airbytehq/airbyte/pull/23278) | Handle authentication errors |
| 0.2.32 | 2023-02-13 | [22884](https://github.com/airbytehq/airbyte/pull/22884) | Do not consume http spreadsheets. |
| 0.2.31 | 2022-10-09 | [19574](https://github.com/airbytehq/airbyte/pull/19574) | Revert 'Add row_id to rows and use as primary key' |
| 0.2.30 | 2022-10-09 | [19215](https://github.com/airbytehq/airbyte/pull/19215) | Add row_id to rows and use as primary key |
| 0.2.21 | 2022-10-04 | [15591](https://github.com/airbytehq/airbyte/pull/15591) | Clean instantiation of AirbyteStream |
| 0.2.20 | 2022-10-10 | [17766](https://github.com/airbytehq/airbyte/pull/17766) | Fix null pointer exception when parsing the spreadsheet id. |
| 0.2.19 | 2022-09-29 | [17410](https://github.com/airbytehq/airbyte/pull/17410) | Use latest CDK. |
| 0.2.18 | 2022-09-28 | [17326](https://github.com/airbytehq/airbyte/pull/17326) | Migrate to per-stream states. |
| 0.2.17 | 2022-08-03 | [15107](https://github.com/airbytehq/airbyte/pull/15107) | Expose Row Batch Size in Connector Specification |
| 0.2.16 | 2022-07-07 | [13729](https://github.com/airbytehq/airbyte/pull/13729) | Improve configuration field description |
| 0.2.15 | 2022-06-02 | [13446](https://github.com/airbytehq/airbyte/pull/13446) | Retry requests resulting in a server error |
| 0.2.13 | 2022-05-06 | [12685](https://github.com/airbytehq/airbyte/pull/12685) | Update CDK to v0.1.56 to emit an `AirbyeTraceMessage` on uncaught exceptions |
| 0.2.12 | 2022-04-20 | [12230](https://github.com/airbytehq/airbyte/pull/12230) | Update connector to use a `spec.yaml` |
| 0.2.11 | 2022-04-13 | [11977](https://github.com/airbytehq/airbyte/pull/11977) | Replace leftover print statement with airbyte logger |
| 0.2.10 | 2022-03-25 | [11404](https://github.com/airbytehq/airbyte/pull/11404) | Allow using Spreadsheet Link/URL instead of Spreadsheet ID |
| 0.2.9 | 2022-01-25 | [9208](https://github.com/airbytehq/airbyte/pull/9208) | Update title and descriptions |
| 0.2.7 | 2021-09-27 | [8470](https://github.com/airbytehq/airbyte/pull/8470) | Migrate to the CDK |
| 0.2.6 | 2021-09-27 | [6354](https://github.com/airbytehq/airbyte/pull/6354) | Support connecting via Oauth webflow |
| 0.2.5 | 2021-09-12 | [5972](https://github.com/airbytehq/airbyte/pull/5972) | Fix full_refresh test by adding supported_sync_modes to Stream initialization |
| 0.2.4 | 2021-08-05 | [5233](https://github.com/airbytehq/airbyte/pull/5233) | Fix error during listing sheets with diagram only |
| 0.2.3 | 2021-06-09 | [3973](https://github.com/airbytehq/airbyte/pull/3973) | Add AIRBYTE_ENTRYPOINT for Kubernetes support |
| 0.2.2 | 2021-04-20 | [2994](https://github.com/airbytehq/airbyte/pull/2994) | Formatting spec |
| 0.2.1 | 2021-04-03 | [2726](https://github.com/airbytehq/airbyte/pull/2726) | Fix base connector versioning |
| 0.2.0 | 2021-03-09 | [2238](https://github.com/airbytehq/airbyte/pull/2238) | Protocol allows future/unknown properties |
| 0.1.7 | 2021-01-21 | [1762](https://github.com/airbytehq/airbyte/pull/1762) | Fix issue large spreadsheet |
| 0.1.6 | 2021-01-27 | [1668](https://github.com/airbytehq/airbyte/pull/1668) | Adopt connector best practices |
| 0.1.5 | 2020-12-30 | [1438](https://github.com/airbytehq/airbyte/pull/1438) | Implement backoff |
| 0.1.4 | 2020-11-30 | [1046](https://github.com/airbytehq/airbyte/pull/1046) | Add connectors using an index YAML file |

</details>
