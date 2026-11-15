---
generated_record: true
connector_name: Microsoft SharePoint
connector_type: source
connector_slug: microsoft-sharepoint
connector_directory: source-microsoft-sharepoint
definition_id: 59353119-f0f2-4e5a-a8ba-15d887bc34f6
version: 0.10.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/microsoft-sharepoint
logo: /images/connectors/sources/microsoft-sharepoint.svg
logo_source_path: airbyte-integrations/connectors/source-microsoft-sharepoint/icon.svg
logo_sha256: ba41cd88fa9c53cb53e08fd6a339f901051636b7cf13d8c4aff53c29bc2b9551
original_metadata_path: airbyte-integrations/connectors/source-microsoft-sharepoint/metadata.yaml
original_metadata_sha256: 9201713b5230f59ccdb87129c221aedb0bce84caae7d48a184ad468a87999d8b
original_document_path: docs/integrations/sources/microsoft-sharepoint.md
original_document_sha256: 7eda0170a0c6edd3c8fc6b3a688fd925f77bf400b0dec9cc6f44ce08aa6bcfa3
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8fc71d20dbb6bcca7f981c515576d3dff04709d1f15eb70f1489c60dffb1158f
rewritten_at: 2026-11-12T13:48:18.213056+00:00
---

# Microsoft SharePoint

<HideInUI>

Use this page to set up and reference the [Microsoft SharePoint](https://portal.azure.com) source connector.

</HideInUI>

### Prerequisites

- Application \(client\) ID
- Directory \(tenant\) ID
- Drive name
- Folder Path
- Client secrets

## Setup guide

### Set up Microsoft SharePoint

<!-- env:cloud -->

### Airbyte Cloud

1. You need an [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Microsoft SharePoint from the Source type dropdown.
4. Enter a name for the Microsoft SharePoint connector.
5. Select **Search Scope** to specify where to search for files. Valid options are 'ACCESSIBLE_DRIVES', 'SHARED_ITEMS' and 'ALL'. 'ACCESSIBLE_DRIVES' searches all SharePoint drives you can access. 'SHARED_ITEMS' searches shared items you can access. 'ALL' searches both and is the default value. Microsoft is retiring the Graph `sharedWithMe` API used by 'SHARED_ITEMS' and 'ALL' to find shared items. The API stops returning data after November 2026. To sync files shared from a SharePoint site, select 'ACCESSIBLE_DRIVES' and set **Site URL** to that site. This setting syncs the whole document library. You can't sync files shared from another user's OneDrive after the retirement.
6. Enter **Folder Path**. Leave it empty to search every folder in the drives. This setting doesn't apply to shared items.
7. The **OAuth2.0** authorisation method is selected by default. Click **Authenticate your Microsoft SharePoint account**, then sign in and authorise your Microsoft account.
8. For **Start Date**, enter the date in YYYY-MM-DD format. Data added on or after this date will be replicated.
9. Add a stream:
   1. Enter the **File Type**.
   2. In the **Format** box, select the file format you want to replicate from the dropdown menu. Supported formats are **CSV**, **Parquet**, **Avro** and **JSONL**. Toggle the **Optional fields** button in the **Format** box to enter more settings for your selected format. For a detailed breakdown of these settings, see the [File Format section](#file-format-settings) below.
   3. Give the stream a **Name**.
   4. Optionally, enter a **Input schema** to enforce a specific schema. By default, this value is `{}`, which infers the schema from the file\(s\) you're replicating. For details about providing a custom schema, see the [User Schema section](#user-schema).
   5. Optionally, enter the **Globs** to control which files are synced. This regular expression lets Airbyte match the specific files to replicate. To replicate every file in your bucket, use `**` as the pattern. For more precise matching options, see the [Path Patterns section](#path-patterns) below.
10. Click **Set up source**.
<!-- /env:cloud -->

<!-- env:oss -->

### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Microsoft SharePoint from the Source type dropdown.
4. Enter a name for the Microsoft SharePoint connector.

### Step 1: Set up the SharePoint application

Microsoft Graph API uses OAuth for authentication. Microsoft Graph provides granular permissions that control app access to resources such as users, groups and mail. When you sign in, you or an administrator can consent to the requested permissions. After consent, your app can access the resources and APIs it requested. For apps without a signed-in user, an administrator can pre-consent to permissions during installation.

Microsoft Graph provides two permission types:

- **Delegated permissions** apply to apps with a signed-in user. The user or an administrator consents to the requested permissions. The app can then act as the signed-in user when calling Microsoft Graph. Non-administrative users can consent to some delegated permissions. Higher-privileged permissions require administrator consent.
- **Application permissions** apply to apps without a signed-in user, including background services and daemons. Only an administrator can consent to application permissions.

This source requires **Application permissions**. Follow these [instructions](https://docs.microsoft.com/en-us/graph/auth-v2-service?context=graph%2Fapi%2F1.0&view=graph-rest-1.0) to create an app in the Azure portal. This process provides the `client_id`, `client_secret` and `tenant_id` required for the tap configuration file.

1. Sign in to [Azure Portal](https://portal.azure.com/#home).
2. Click the upper-left menu icon and select **Azure Active Directory**.
3. Select **App Registrations**.
4. Click **New registration**.
5. Register an application:
   1. Name:
   2. Supported account types: Accounts in this organizational directory only
   3. Register \(button\)
6. Record the client_id and tenant_id. The tap uses them for authentication and API integration.
7. Select **Certificates & secrets**.
8. Provide **Description and Expires**:
   1. Description: tap-microsoft-teams client secret
   2. Expires: 1-year
   3. Add
9. Copy the client secret value. This value is the client_secret.
10. Select **API permissions**:
    1. Click **Add a permission**.
11. Select **Microsoft Graph**.
12. Select **Application permissions**.
13. Select the following permissions:
    1. Files
       - Files.Read.All
14. Click **Add permissions**.
15. Click **Grant admin consent**.

### Step 2: Set up the connector in Airbyte

1. Go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the **Set up** the source page, select **Microsoft SharePoint** from the Source type dropdown.
4. Enter a name for the Microsoft SharePoint connector.
5. Select **Search Scope** to specify where to search for files. Valid options are 'ACCESSIBLE_DRIVES', 'SHARED_ITEMS' and 'ALL'. 'ACCESSIBLE_DRIVES' searches all SharePoint drives you can access. 'SHARED_ITEMS' searches shared items you can access. 'ALL' searches both and is the default value. Service Key Authentication can't list items shared with you, so 'SHARED_ITEMS' isn't supported. With Service Key Authentication, 'ALL' only searches accessible drives. To sync files shared from a SharePoint site, select 'ACCESSIBLE_DRIVES' and enter that site's Site URL. This setting syncs the whole document library.
6. Enter **Folder Path**. Leave it empty to search every folder in the drives. This setting doesn't apply to shared items.
7. Switch to **Service Key Authentication**.
8. For **User Practical Name**, enter the [UPN](https://learn.microsoft.com/en-us/sharepoint/list-onedrive-urls) for your user.
9. Enter **Tenant ID**, **Client ID** and **Client secret**.
10. For **Start Date**, enter the date in YYYY-MM-DD format. Data added on or after this date will be replicated.
11. Add a stream:
    1. Enter the **File Type**.
    2. In the **Format** box, select the file format you want to replicate from the dropdown menu. Supported formats are **CSV**, **Parquet**, **Avro** and **JSONL**. Toggle the **Optional fields** button in the **Format** box to enter more settings for your selected format. For a detailed breakdown of these settings, see the [File Format section](#file-format-settings) below.
    3. Give the stream a **Name**.
    4. Optionally, enter a **Input schema** to enforce a specific schema. By default, this value is `{}`, which infers the schema from the file\(s\) you're replicating. For details about providing a custom schema, see the [User Schema section](#user-schema).
    5. Optionally, enter the **Globs** to control which files are synced. This regular expression lets Airbyte match the specific files to replicate. To replicate every file in your bucket, use `**` as the pattern. For more precise matching options, see the [Path Patterns section](#path-patterns) below.
12. Click **Set up source**.

<!-- /env:oss -->

## Path patterns

\(In short: path pattern syntax uses [wcmatch.glob](https://facelessuser.github.io/wcmatch/glob/). GLOBSTAR and SPLIT flags are enabled.\)

Use glob-style patterns to sync multiple files without specifying every file path. You can:

- Reference many files with one pattern. For example, `**` indicates every file in the folder.
- Reference future files that don't yet exist and therefore don't have a specific path.

You must provide a path pattern. For complex directory layouts, you can provide multiple patterns separated by \|.

Each path pattern starts from the folder's _root_. Don't include the root folder name in the pattern\(s\).

Example patterns:

- `**`: Match everything.
- `**/*.csv`: Match all files with a specific extension.
- `myFolder/**/*.csv`: Match all csv files anywhere under myFolder.
- `*/**`: Match everything at least one folder deep.
- `*/*/*/**`: Match everything at least three folders deep.
- `**/file.*|**/file`: Match every file called "file", with any extension or no extension.
- `x/*/y/*`: Match all files in sub-folder x -&gt; any folder -&gt; folder y.
- `**/prefix*.csv`: Match all csv files with a specific prefix.
- `**/prefix*.parquet`: Match all parquet files with a specific prefix.

Consider this folder layout. `MyFolder` is the root folder specified in the connector config, and all patterns are relative to it:

```text
MyFolder
    -> log_files
    -> some_table_files
        -> part1.csv
        -> part2.csv
    -> images
    -> more_table_files
        -> part3.csv
    -> extras
        -> misc
            -> another_part1.csv
```

To include part1.csv, part2.csv and part3.csv, while excluding another_part1.csv, you have several options:

- Use the single pattern `**/part*.csv` to include every csv file called "partX".
- For more precise matching, use the dual pattern `some_table_files/*.csv|more_table_files/*.csv` to include relevant files only from those exact folders.
- Use `*table_files/*.csv` to achieve the same result with one pattern. However, unexpected new folders could cause future problems.
- Use a recursive wildcard. The pattern `extras/**/*.csv` includes csv files nested below "extras", such as "extras/misc/another_part1.csv".

Path patterns offer several ways to achieve the same result. Choose a clear pattern that accounts for future additions to the directory structure.

## User schema

For Avro, Jsonl, CSV or Parquet formats, you can provide a schema for the output stream. **Note that this doesn't apply to the Document file type format.**

A schema gives you more control over the stream output. Without one, columns and datatypes are inferred from the first created file matching your path pattern and suffix. This approach will suit most cases. However, you may want to enforce a schema when:

- You only need a known subset of columns. Other columns remain included but are packed into the `_ab_additional_properties` map.
- Your initial dataset has few records, so automatic type inference might not represent future data.
- You want to define types for every column.
- You know which columns future data will add. You want them in the core schema, rather than the `_ab_additional_properties` map.

You may also have another reason. Provide the schema as valid JSON, using a map of `{"column": "datatype"}`. Each datatype must be one of:

- string
- number
- integer
- object
- array
- boolean
- null

For example:

- `{"id": "integer", "location": "string", "longitude": "number", "latitude": "number"}`
- `{"username": "string", "friends": "array", "information": "object"}`

## File format settings

### CSV

CSV files are plain text, so you may need specific reader options to parse them correctly. Apply these settings consistently whenever a CSV is created or exported.

- **Header Definition**: Defines the headers. `User Provided` assumes the CSV has no header row and uses the provided headers. `Autogenerated` also assumes there is no header row. The CDK generates headers using `f{i}`, where `i` is the index starting from 0. Otherwise, the default behaviour uses the CSV file's header. To generate or provide column names for a CSV with headers, set the "Skip rows before header" option. This setting ignores the header row.
- **Delimiter**: CSV means Comma Separated Values, but the term also covers flat-file data using other separators. The delimiter field specifies the separator character. To use [tab-delimiters](https://en.wikipedia.org/wiki/Tab-separated_values), set this value to `\t`. The default value is `,`.
- **Double Quote**: Determines whether two quotes within a quoted CSV value represent one quote in the data. The default is True.
- **Encoding**: Some data uses another character set, typically when it contains different alphabets. See the [list of allowable encodings here](https://docs.python.org/3/library/codecs.html#standard-encodings). The default is `utf8`.
- **Escape Character**: Prefix a reserved character with an escape character to ensure correct parsing. A common escape character is the backslash (`\`). For example, consider the following data:

```
Product,Description,Price
Jeans,"Navy Blue, Bootcut, 34\"",49.99
```

The backslash (`\`) directly precedes the second double quote (`"`), showing that it isn't the field's closing quote. Instead, the parser includes it as a literal double quote. Here, it marks the jeans' size in inches: `34"`.

Leave this field blank, the default option, to prevent escaping.

- **False Values**: A set of case-sensitive strings to interpret as false values.
- **Null Values**: A set of case-sensitive strings to interpret as null values. For example, enter 'NA' to interpret 'NA' as null.
- **Quote Character**: Data values can contain reserved characters, such as a comma used as the delimiter. CSVs handle these characters by wrapping the value in defined quote characters, allowing correct parsing. The default is `"`.
- **Skip Rows After Header**: The number of rows to skip after the header row.
- **Skip Rows Before Header**: The number of rows to skip before the header row.
- **Strings Can Be Null**: Controls whether strings can be interpreted as null values. If true, strings matching the null_values set are interpreted as null. If false, they're interpreted as the original strings.
- **True Values**: A set of case-sensitive strings to interpret as true values.

### Parquet

Apache Parquet is a column-oriented data storage format in the Apache Hadoop ecosystem. Its data compression and encoding schemes support efficient bulk processing of complex data. Partitioned parquet datasets aren't currently supported. The following setting is available:

- **Convert Decimal Fields to Floats**: Controls whether decimal fields are converted to floats. This conversion loses precision, so it isn't recommended.

### Avro

The Avro parser uses the [Fastavro library](https://fastavro.readthedocs.io/en/latest/). The following setting is available:

- **Convert Double Fields to Strings**: Controls whether double fields are converted to strings. This is recommended for highly precise decimal numbers because floating-point handling can lose precision.

### JSONL

JSONL parsing currently has no options.

### Document file type format

The Document file type format extracts text from Markdown, TXT, PDF, Word, Powerpoint and Google documents. When selected, the connector outputs the extracted text in one field named `content`. The `document_key` field contains a unique identifier for the processed file and can serve as a primary key. Document content contains markdown formatting converted from the original file format. Every file matching the defined glob pattern must be a markdown (`md`), PDF (`pdf`) or Docx (`docx`) file.

The connector emits one record for each document. Large files can produce records that exceed a destination's string-field limits, which vary by destination.

Before parsing, the connector internally exports Google Document files to Docx format. It exports and parses Google Sheets, Google Slides and drawings as PDFs.

<HideInUI>

### Copy raw files configuration

<FieldAnchor field="delivery_method.delivery_type">

:::info

Raw file replication has the following requirements and limitations:
- **Supported Airbyte Versions:**
  - Cloud: All Workspaces
  - OSS / Enterprise: `v1.2.0` or later
- **Max File Size:** `1GB` per file
- **Supported Destinations:**
  - S3: `v1.4.0` or later

:::

Copy raw files without parsing their contents. Bits reach the destination exactly as they appeared in the source. This method is recommended for unstructured text, non-text and compressed files.

Format options don't apply. Files are transferred to the file-based destination without parsing the underlying data.

</FieldAnchor>

##### Preserve subdirectories in file paths

When enabled, this option sends the subdirectory structure and source file names to the destination. Otherwise, files sync using only their names. This option is ignored when file-based replication isn't enabled.

### Multi-site support

Enter a url in the site URL field to access files from a specific sharepoint site.
The site url must use the format `https://<tenant_name>.sharepoint.com/sites/<site>`. Leave the field empty to access files from the main site.
To iterate through every sub-site, enter `https://<tenant_name>.sharepoint.com/sites/` as the site url.

### Supported sync modes

The Microsoft SharePoint source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

| Feature           | Supported?\(Yes/No\) |
|:------------------|:---------------------|
| Full Refresh Sync | Yes                  |
| Incremental Sync  | Yes                  |

### Supported streams

There are no predefined streams. Streams depend on the file contents added on the Set up page.

### Performance considerations

Normal Microsoft Graph [requests limitation](https://docs.microsoft.com/en-us/graph/throttling) restrict the connector.

### Data type map

| Integration Type | Airbyte Type |
| :--------------- | :----------- |
| `string`         | `string`     |
| `number`         | `number`     |
| `array`          | `array`      |
| `object`         | `object`     |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                   |
|:--------|:-----------|:---------------------------------------------------------|:--------------------------------------------------------------------------|
| 0.10.5 | 2026-10-22 | [89687](https://github.com/airbytehq/airbyte/pull/89687) | Keep syncing drive files and report a clear error when the deprecated Microsoft Graph sharedWithMe API stops returning shared items |
| 0.10.4 | 2025-08-21 | [65118](https://github.com/airbytehq/airbyte/pull/65118) | Decertify connector |
| 0.10.3 | 2025-07-13 | [60562](https://github.com/airbytehq/airbyte/pull/60562) | Update dependencies |
| 0.10.2 | 2025-05-10 | [59113](https://github.com/airbytehq/airbyte/pull/59113) | Update dependencies |
| 0.10.1 | 2025-05-07 | [59711](https://github.com/airbytehq/airbyte/pull/59711) | Fix edege case for unexcpeted uris. |
| 0.10.0 | 2025-05-07 | [59700](https://github.com/airbytehq/airbyte/pull/59700) | Promoting release candidate 0.10.0-rc.1 to a main version. |
| 0.10.0-rc.1 | 2025-05-05 | [57507](https://github.com/airbytehq/airbyte/pull/57507) | Adapt file-transfer records to latest protocol, requires platform >= 1.7.0, destination-s3 >= 1.8.0 |
| 0.9.3 | 2025-04-19 | [58471](https://github.com/airbytehq/airbyte/pull/58471) | Update dependencies |
| 0.9.2 | 2025-04-12 | [57920](https://github.com/airbytehq/airbyte/pull/57920) | Update dependencies |
| 0.9.1 | 2025-04-05 | [57065](https://github.com/airbytehq/airbyte/pull/57065) | Update dependencies |
| 0.9.0 | 2025-04-01 | [55912](https://github.com/airbytehq/airbyte/pull/55912) | Provide ability to iterate all sharepoint sites |
| 0.8.2 | 2025-03-29 | [56712](https://github.com/airbytehq/airbyte/pull/56712) | Update dependencies |
| 0.8.1 | 2025-03-22 | [56014](https://github.com/airbytehq/airbyte/pull/56014) | Update dependencies |
| 0.8.0 | 2025-03-12 | [54658](https://github.com/airbytehq/airbyte/pull/54658) | Provide ability to sync other sites than Main sharepoint site |
| 0.7.2 | 2025-03-08 | [55427](https://github.com/airbytehq/airbyte/pull/55427) | Update dependencies |
| 0.7.1 | 2025-03-01 | [54749](https://github.com/airbytehq/airbyte/pull/54749) | Update dependencies |
| 0.7.0 | 2025-02-27 | [54200](https://github.com/airbytehq/airbyte/pull/54200) | Add advanced Oauth |
| 0.6.1 | 2025-02-22 | [45062](https://github.com/airbytehq/airbyte/pull/45062) | Update dependencies |
| 0.6.0 | 2025-02-20 | [54140](https://github.com/airbytehq/airbyte/pull/54140) | Implement file transfer mode to move raw files |
| 0.5.2 | 2024-08-24 | [45646](https://github.com/airbytehq/airbyte/pull/45646) | Fix: handle wrong folder name |
| 0.5.1 | 2024-08-24 | [44660](https://github.com/airbytehq/airbyte/pull/44660) | Update dependencies |
| 0.5.0 | 2024-08-19 | [42983](https://github.com/airbytehq/airbyte/pull/42983) | Migrate to CDK v4.5.1 |
| 0.4.5 | 2024-08-19 | [44382](https://github.com/airbytehq/airbyte/pull/44382) | Update dependencies |
| 0.4.4 | 2024-08-12 | [43743](https://github.com/airbytehq/airbyte/pull/43743) | Update dependencies |
| 0.4.3 | 2024-08-10 | [43565](https://github.com/airbytehq/airbyte/pull/43565) | Update dependencies |
| 0.4.2 | 2024-08-03 | [43235](https://github.com/airbytehq/airbyte/pull/43235) | Update dependencies |
| 0.4.1 | 2024-07-27 | [42704](https://github.com/airbytehq/airbyte/pull/42704) | Update dependencies |
| 0.4.0 | 2024-07-25 | [42008](https://github.com/airbytehq/airbyte/pull/42008) | Migrate to CDK v3.5.3 |
| 0.3.1 | 2024-07-20 | [42143](https://github.com/airbytehq/airbyte/pull/42143) | Update dependencies |
| 0.3.0 | 2024-07-16 | [42007](https://github.com/airbytehq/airbyte/pull/42007) | Migrate to CDK v2.4.0 |
| 0.2.11 | 2024-07-13 | [41688](https://github.com/airbytehq/airbyte/pull/41688) | Update dependencies |
| 0.2.10 | 2024-07-10 | [41589](https://github.com/airbytehq/airbyte/pull/41589) | Update dependencies |
| 0.2.9 | 2024-07-06 | [40917](https://github.com/airbytehq/airbyte/pull/40917) | Update dependencies |
| 0.2.8 | 2024-06-26 | [40539](https://github.com/airbytehq/airbyte/pull/40539) | Update dependencies |
| 0.2.7 | 2024-06-25 | [40357](https://github.com/airbytehq/airbyte/pull/40357) | Update dependencies |
| 0.2.6 | 2024-06-24 | [40233](https://github.com/airbytehq/airbyte/pull/40233) | Update dependencies |
| 0.2.5 | 2024-06-22 | [39987](https://github.com/airbytehq/airbyte/pull/39987) | Update dependencies |
| 0.2.4 | 2024-05-29 | [38675](https://github.com/airbytehq/airbyte/pull/38675) | Avoid error on empty stream when running discover |
| 0.2.3 | 2024-04-17 | [37372](https://github.com/airbytehq/airbyte/pull/37372) | Make refresh token optional |
| 0.2.2 | 2024-03-28 | [36573](https://github.com/airbytehq/airbyte/pull/36573) | Update QL to 400 |
| 0.2.1 | 2024-03-22 | [36381](https://github.com/airbytehq/airbyte/pull/36381) | Unpin CDK |
| 0.2.0 | 2024-03-06 | [35830](https://github.com/airbytehq/airbyte/pull/35830) | Add fetching shared items |
| 0.1.0 | 2024-01-25 | [33537](https://github.com/airbytehq/airbyte/pull/33537) | New source |

</details>

</HideInUI>
