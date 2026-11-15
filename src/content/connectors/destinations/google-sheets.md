---
generated_record: true
connector_name: Google Sheets
connector_type: destination
connector_slug: google-sheets
connector_directory: destination-google-sheets
definition_id: a4cbd2d1-8dbe-4818-b8bc-b90ad782d12a
version: 0.3.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/google-sheets
logo: /images/connectors/destinations/google-sheets.svg
logo_source_path: airbyte-integrations/connectors/destination-google-sheets/icon.svg
logo_sha256: 44a467fde0f95f84990d473a328b4230c4852025fd17e27866c4664cb87bf4d3
original_metadata_path: airbyte-integrations/connectors/destination-google-sheets/metadata.yaml
original_metadata_sha256: 6a24bc743572a5cab29d089975e739da18579b2a6ab7618fe5d601a1ebd44bf8
original_document_path: docs/integrations/destinations/google-sheets.md
original_document_sha256: 87088f2d20f67a3b25f2391707e16e7fe01038dbff7a797128e69f3f1ea85e38
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5abbc66d0536a99fc5092f0340790d48b832086cf0f69bb5a193a33e6c0f2518
rewritten_at: 2026-11-12T14:04:18.013073+00:00
---

# Google Sheets

The Google Sheets Destination sends data to one Google Sheets spreadsheet, using multiple Worksheets as streams. To replicate data to multiple spreadsheets, create multiple Google Sheets Destination instances in your Airbyte instance.

:::warning

Google Sheets limits request rates and the amount of data it can receive. These limits can cause syncs to fail. Only use Google Sheets as a destination for small, non-production use cases. It isn't designed for large-scale data operations.

Read more about the [limitations](#limitations) of using Google Sheets below.

:::

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Prerequisites

- A Google Account or GCP Service Account for authentication
- A Google Spreadsheet URL

## Step 1: Set up Google Sheets

### Google Account

Visit [Google](https://support.google.com/accounts/answer/27441?hl=en) to create a Google Account.

### Google Sheets (Google Spreadsheets)

1. After signing in to your Google account, create a new Google Sheet. Select [Follow this guide](https://support.google.com/docs/answer/6000292?hl=en&co=GENIE.Platform%3DDesktop) to create one. You can also use an existing Google Sheet.
2. You'll need the link for the Google Sheet you want to sync. Select "Share" in the interface's top-right corner. Then select Copy Link in the dialog.

## Step 2: Set up the Google Sheets destination connector in Airbyte

<!-- env:cloud -->

**For Airbyte Cloud:**

1. Select **Google Sheets** from the Source type dropdown, then enter a name for this connector.
2. Select `Sign in with Google`.
3. Sign in and Authorize the Google account, then select `Set up source`.
4. Copy the Google Sheet link to **Spreadsheet Link**.
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

You can authenticate with Google Sheets using OAuth or a GCP Service Account token.

**Using OAuth**

1. Create a new [Google Cloud project](https://console.cloud.google.com/projectcreate).
2. Enable the [Google Sheets API](https://console.cloud.google.com/apis/library/sheets.googleapis.com).
3. Create a new [OAuth client ID](https://console.cloud.google.com/apis/credentials/oauthclient). Select `Web application` as the Application type and give it a `name`. Add `https://developers.google.com/oauthplayground` as an Authorized redirect URI.
4. Add a `Client Secret` (Add secret). Note both the `Client Secret` and `Client ID`.
5. Go to [Google OAuth Playground](https://developers.google.com/oauthplayground/).
6. Select the cog in the top-right corner, then select `Use your own OAuth credentials`. Enter the `OAuth Client ID` and `OAuth Client secret` from the previous step.
7. Find and select `Google Sheets API v4` in the left sidebar, then choose the `https://www.googleapis.com/auth/spreadsheets` scope. Select `Authorize APIs`.
8. In **step 2**, select `Exchange authorization code for tokens`. Note the `Refresh token`.
9. Set up a new destination in Airbyte and select `Google Sheets`. Enter the `Client ID`, `Client Secret`, `Refresh Token` and `Spreadsheet Link` from the previous steps.

**Using GCP Service Account:**

1. In the Google Cloud console, go to the Service accounts page.
2. Select a project.
3. Select the email address of the service account you want to create a key for.
4. Select the Keys tab.
5. Select the Add key drop-down menu, then select Create new key.
6. Select JSON as the Key type, then select Create.
Selecting Create downloads a service account key file. You can't download the key file again after downloading it.

The key should look like this:

```json
{
  "type": "service_account",
  "project_id": "PROJECT_ID",
  "private_key_id": "KEY_ID",
  "private_key": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "SERVICE_ACCOUNT_EMAIL",
  "client_id": "CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/SERVICE_ACCOUNT_EMAIL"
}
```

<!-- /env:oss -->

### Output schema

Each worksheet in the selected spreadsheet becomes a separate source-connector stream in the output.

Output columns are reordered alphabetically. You should **not** reorder them manually after syncing because this could cause future syncs to fail.

Google Sheets coerces all data into a `string` format.
Nested lists and objects are formatted as strings instead of standard lists and objects. You'll need further processing for downstream analysis.

Airbyte only replicates `Grid Sheets`, so only text is replicated. Objects such as charts or images can't be synced. See the [Google Sheets API docs](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetType) for more information about all available sheet types.

### Rate limits and performance

The [Google API rate limit](https://developers.google.com/sheets/api/limits) is 60 requests per 60 seconds per user and 300 requests per 60 seconds per project. These limits result in slow sync speeds. Airbyte batches API requests to pull data efficiently while respecting these limits.

### Limitations {#limitations}

Google Sheets limits the amount of data you can sync. Exceeding these limits may cause the sync to fail. In some cases, data is truncated to meet the limits.

**Maximum of 10 Million Cells**

A Google Sheets document can contain up to 10 million cells across one or multiple worksheets.
After reaching this limit, you can't add more columns. You also can't add rows if the existing rows reach the limit.

**Maximum of 50,000 characters per cell**

A single cell can contain up to 50,000 characters. Airbyte automatically truncates longer values and appends `...[TRUNCATED]`. Don't use Google Sheets if your source contains fields with long text.

**Maximum of 18,278 Columns**

A Google Sheets worksheet can contain up to 18,278 columns.

**Maximum of 200 Worksheets in a Spreadsheet**

A single spreadsheet can contain up to 200 worksheets.

#### Note

- Record normalisation prevents data corruption during the write process. It handles two scenarios:

1. UnderSetting: the record has fewer keys (columns) than the catalogue declares
2. OverSetting: the record has more keys (columns) than the catalogue declares

```
EXAMPLE:

- UnderSetting:
    * Catalog:
        - has 3 entities:
            [ 'id', 'key1', 'key2' ]
                        ^
    * Input record:
        - missing 1 entity, compare to catalog
            { 'id': 123,    'key2': 'value' }
                            ^
    * Result:
        - 'key1' has been added to the record, because it was declared in catalog, to keep the data structure.
            {'id': 123, 'key1': '', {'key2': 'value'} }
                            ^
- OverSetting:
    * Catalog:
        - has 3 entities:
            [ 'id', 'key1', 'key2',   ]
                                    ^
    * Input record:
        - doesn't have entity 'key1'
        - has 1 more enitity, compare to catalog 'key3'
            { 'id': 123,     ,'key2': 'value', 'key3': 'value' }
                            ^                      ^
    * Result:
        - 'key1' was added, because it expected be the part of the record, to keep the data structure
        - 'key3' was dropped, because it was not declared in catalog, to keep the data structure
            { 'id': 123, 'key1': '', 'key2': 'value',   }
                            ^                          ^
```

### Data type mapping

| Integration Type | Airbyte Type |
| :--------------- | :----------- |
| Any Type         | `string`     |

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                    |
|---------| ---------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| 0.3.5 | 2025-04-30 | [59647](https://github.com/airbytehq/airbyte/pull/59647) | Truncate cell values exceeding 50,000 characters with warning |
| 0.3.4 | 2025-04-26 | [58280](https://github.com/airbytehq/airbyte/pull/58280) | Update dependencies |
| 0.3.3 | 2025-04-12 | [57636](https://github.com/airbytehq/airbyte/pull/57636) | Update dependencies |
| 0.3.2 | 2025-04-05 | [57166](https://github.com/airbytehq/airbyte/pull/57166) | Update dependencies |
| 0.3.1 | 2025-03-29 | [56600](https://github.com/airbytehq/airbyte/pull/56600) | Update dependencies |
| 0.3.0 | 2025-02-27 | [54689](https://github.com/airbytehq/airbyte/pull/54689) | Support service account authentication |
| 0.2.42 | 2025-03-22 | [56149](https://github.com/airbytehq/airbyte/pull/56149) | Update dependencies |
| 0.2.41 | 2025-03-08 | [55374](https://github.com/airbytehq/airbyte/pull/55374) | Update dependencies |
| 0.2.40 | 2025-03-01 | [54847](https://github.com/airbytehq/airbyte/pull/54847) | Update dependencies |
| 0.2.39 | 2025-02-22 | [54248](https://github.com/airbytehq/airbyte/pull/54248) | Update dependencies |
| 0.2.38 | 2025-02-15 | [53892](https://github.com/airbytehq/airbyte/pull/53892) | Update dependencies |
| 0.2.37 | 2025-02-01 | [52194](https://github.com/airbytehq/airbyte/pull/52194) | Update dependencies |
| 0.2.36 | 2025-01-18 | [51748](https://github.com/airbytehq/airbyte/pull/51748) | Update dependencies |
| 0.2.35 | 2025-01-11 | [51262](https://github.com/airbytehq/airbyte/pull/51262) | Update dependencies |
| 0.2.34 | 2025-01-04 | [50912](https://github.com/airbytehq/airbyte/pull/50912) | Update dependencies |
| 0.2.33 | 2024-12-28 | [50492](https://github.com/airbytehq/airbyte/pull/50492) | Update dependencies |
| 0.2.32 | 2024-12-21 | [50168](https://github.com/airbytehq/airbyte/pull/50168) | Update dependencies |
| 0.2.31 | 2024-12-14 | [48915](https://github.com/airbytehq/airbyte/pull/48915) | Update dependencies |
| 0.2.30 | 2024-11-25 | [48678](https://github.com/airbytehq/airbyte/pull/48678) | Update dependencies |
| 0.2.29 | 2024-11-04 | [48281](https://github.com/airbytehq/airbyte/pull/48281) | Update dependencies |
| 0.2.28 | 2024-10-28 | [47042](https://github.com/airbytehq/airbyte/pull/47042) | Update dependencies |
| 0.2.27 | 2024-10-12 | [46772](https://github.com/airbytehq/airbyte/pull/46772) | Update dependencies |
| 0.2.26 | 2024-10-05 | [46464](https://github.com/airbytehq/airbyte/pull/46464) | Update dependencies |
| 0.2.25 | 2024-09-28 | [46204](https://github.com/airbytehq/airbyte/pull/46204) | Update dependencies |
| 0.2.24 | 2024-09-21 | [45772](https://github.com/airbytehq/airbyte/pull/45772) | Update dependencies |
| 0.2.23 | 2024-09-14 | [45577](https://github.com/airbytehq/airbyte/pull/45577) | Update dependencies |
| 0.2.22 | 2024-09-07 | [45325](https://github.com/airbytehq/airbyte/pull/45325) | Update dependencies |
| 0.2.21 | 2024-08-31 | [44989](https://github.com/airbytehq/airbyte/pull/44989) | Update dependencies |
| 0.2.20 | 2024-08-24 | [44736](https://github.com/airbytehq/airbyte/pull/44736) | Update dependencies |
| 0.2.19 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.2.18 | 2024-08-17 | [44259](https://github.com/airbytehq/airbyte/pull/44259) | Update dependencies |
| 0.2.17 | 2024-08-10 | [43603](https://github.com/airbytehq/airbyte/pull/43603) | Update dependencies |
| 0.2.16 | 2024-08-03 | [43066](https://github.com/airbytehq/airbyte/pull/43066) | Update dependencies |
| 0.2.15 | 2024-07-27 | [42819](https://github.com/airbytehq/airbyte/pull/42819) | Update dependencies |
| 0.2.14 | 2024-07-20 | [42368](https://github.com/airbytehq/airbyte/pull/42368) | Update dependencies |
| 0.2.13 | 2024-07-13 | [41721](https://github.com/airbytehq/airbyte/pull/41721) | Update dependencies |
| 0.2.12 | 2024-07-10 | [41520](https://github.com/airbytehq/airbyte/pull/41520) | Update dependencies |
| 0.2.11 | 2024-07-09 | [41076](https://github.com/airbytehq/airbyte/pull/41076) | Update dependencies |
| 0.2.10 | 2024-07-06 | [40999](https://github.com/airbytehq/airbyte/pull/40999) | Update dependencies |
| 0.2.9 | 2024-06-26 | [40529](https://github.com/airbytehq/airbyte/pull/40529) | Update dependencies |
| 0.2.8 | 2024-06-25 | [40353](https://github.com/airbytehq/airbyte/pull/40353) | Update dependencies |
| 0.2.7 | 2024-06-22 | [40172](https://github.com/airbytehq/airbyte/pull/40172) | Update dependencies |
| 0.2.6 | 2024-06-04 | [39011](https://github.com/airbytehq/airbyte/pull/39011) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.5 | 2024-05-22 | [38516](https://github.com/airbytehq/airbyte/pull/38516) | [autopull] base image + poetry + up_to_date |
| 0.2.4 | 2024-05-21 | [38516](https://github.com/airbytehq/airbyte/pull/38516) | [autopull] base image + poetry + up_to_date |
| 0.2.3 | 2023-09-25 | [30748](https://github.com/airbytehq/airbyte/pull/30748) | Performance testing - include socat binary in docker image |
| 0.2.2 | 2023-07-06 | [28035](https://github.com/airbytehq/airbyte/pull/28035) | Migrate from authSpecification to advancedAuth |
| 0.2.1 | 2023-06-26 | [27782](https://github.com/airbytehq/airbyte/pull/27782) | Only allow HTTPS urls |
| 0.2.0 | 2023-06-26 | [27780](https://github.com/airbytehq/airbyte/pull/27780) | License Update: Elv2 |
| 0.1.2 | 2022-10-31 | [18729](https://github.com/airbytehq/airbyte/pull/18729) | Fix empty headers list |
| 0.1.1 | 2022-06-15 | [14751](https://github.com/airbytehq/airbyte/pull/14751) | Yield state only when records saved |
| 0.1.0 | 2022-04-26 | [12135](https://github.com/airbytehq/airbyte/pull/12135) | Initial Release |

</details>
