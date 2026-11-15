---
generated_record: true
connector_name: Google Drive
connector_type: source
connector_slug: google-drive
connector_directory: source-google-drive
definition_id: 9f8dda77-1048-4368-815b-269bf54ee9b8
version: 0.6.4
support_level: certified
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/google-drive
logo: /images/connectors/sources/google-drive.svg
logo_source_path: airbyte-integrations/connectors/source-google-drive/icon.svg
logo_sha256: 7a0448afcbc4e24bfa59b03def7166e8b5a8d0075d0ddc9ed1c563b5950b1c32
original_metadata_path: airbyte-integrations/connectors/source-google-drive/metadata.yaml
original_metadata_sha256: 8d99287e8d12f58ed8b940008e4add558901ce9b1eeea1a58b18a6cc033cda25
original_document_path: docs/integrations/sources/google-drive.md
original_document_sha256: 7ee69814bb38f3ee219ba1986aeab4e6b40aec877d2c8be3b478f91ee9723bb0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a14f83fe39c093ce00a7899b7907e0ac39995a143b4a96fcca5f52df9cc4d308
rewritten_at: 2026-11-12T14:09:25.427467+00:00
---

# Google Drive

Use this guide to set up and reference the Google Drive source connector.

:::info
The Google Drive source connector pulls data from one Google Drive folder. Syncs recursively include every file in that folder and its subfolders.
:::

## Prerequisites

- Drive folder link: The Google Drive folder link for the files you want to sync, including files in subfolders
<!-- env:cloud -->
- **For Airbyte Cloud:** A Google Workspace user who can access the Google Drive folder
  <!-- /env:cloud -->
  <!-- env:oss -->
- **For Airbyte Open Source:**
  - A GCP project
  - The Google Drive API enabled in your GCP project
  - A Service Account Key with access to the Google Drive folder you want to replicate
  <!-- /env:oss -->

## Set up the connector

You can authenticate the Google Drive source connector through OAuth or Service Account Key Authentication.

<!-- env:cloud -->

For **Airbyte Cloud** users, OAuth significantly simplifies setup and lets you authenticate [directly from the Airbyte UI](#set-up-the-google-drive-source-connector-in-airbyte). We strongly recommend this method.

<!-- /env:cloud -->

<!-- env:oss -->

For **Airbyte Open Source** users, Service Account Key Authentication is recommended. Follow these steps to create an account and key, then enable the Google Drive API.

:::note
To authenticate with OAuth on **Airbyte Open Source**, follow [Google's OAuth instructions](https://developers.google.com/identity/protocols/oauth2) to create an authentication app. Set the scopes to `https://www.googleapis.com/auth/drive.readonly`. To sync the **Files Permissions** or **Identities** streams, also include the Admin SDK scopes listed in [Replicate Permissions ACL](#replicate-permissions-acl). You'll need your client ID, client secret and refresh token when setting up the connector.
:::

### Set up the service account key (Airbyte Open Source)

#### Create a service account

1. Open the [Service Accounts page](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts) in your Google Cloud console.
2. Select an existing project or create a new one.
3. At the top of the page, click **+ Create service account**.
4. Enter a name and description for the service account, then click **Create and Continue**.
5. Under **Service account permissions**, select the roles for the service account, then click **Continue**. The **Viewer** role is recommended.

#### Generate a key

1. Go to the [API Console/Credentials](https://console.cloud.google.com/apis/credentials) page. Click the email address of the service account you created.
2. In the **Keys** tab, click **+ Add key**, then click **Create new key**.
3. Select **JSON** as the Key type. This generates and downloads the JSON key file used for authentication. Click **Continue**.

#### Enable the Google Drive API

1. Go to the [API Console/Library](https://console.cloud.google.com/apis/library) page.
2. Confirm that you've selected the correct project at the top.
3. Find and select the **Google Drive API**.
4. Click **ENABLE**.

If anyone with the link can view your folder, you don't need to take further action. Otherwise, select the folder in Google Drive and click **Share**. Add the service account's email address with **Viewer** permission. This address is the `client_email` value in your JSON key. See [Google's sharing instructions](https://support.google.com/drive/answer/7166529) for details.

<!-- /env:oss -->

### Set up Google Drive in Airbyte

Set up Google Drive as a source in Airbyte Cloud:

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) or Airbyte Open Source account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **Google Drive** from the available sources.
4. For **Source name**, enter a name that helps you identify this source.
5. Select your authentication method:

<!-- env:cloud -->

#### Airbyte Cloud

- **(Recommended)** Select **Authenticate via Google (OAuth)** from the Authentication dropdown. Click **Sign in with Google** and complete the authentication workflow.

<!-- /env:cloud -->
<!-- env:oss -->

#### Airbyte Open Source

- **(Recommended)** Select **Service Account Key Authentication** from the dropdown. Enter your Google Cloud service account key in JSON format:

  ```js
  { "type": "service_account", "project_id": "YOUR_PROJECT_ID", "private_key_id": "YOUR_PRIVATE_KEY", ... }
  ```

- To authenticate your Google account through OAuth, select **Authenticate via Google (OAuth)** from the dropdown. Enter your Google application's client ID, client secret and refresh token.

<!-- /env:oss -->

6. For **Folder Link**, enter the Google Drive folder link. In the Google Drive UI, open the folder you want to sync and copy its current URL.
7. Optionally configure **Start Date** to set the UTC start date and time for data replication. Files not modified since this date and time won't be replicated. Use the provided datepicker, which is recommended, or enter the date programmatically using `YYYY-MM-DDTHH:mm:ssZ`. Leave this field blank to replicate every file not excluded by **Path Pattern** and **Path Prefix**.
8. Click **Set up source** and wait for the tests to finish.

## Supported sync modes

The Google Drive source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                                        | Supported? |
| :--------------------------------------------- | :--------- |
| Full Refresh Sync                              | Yes        |
| Incremental Sync                               | Yes        |
| Replicate Incremental Deletes                  | No         |
| Replicate Multiple Files \(pattern matching\)  | Yes        |
| Replicate Multiple Streams \(distinct tables\) | Yes        |
| Namespaces                                     | No         |

## Path patterns

Path patterns use [wcmatch.glob](https://facelessuser.github.io/wcmatch/glob/) syntax with the `GLOBSTAR` and `SPLIT` flags enabled.

Use glob-style patterns to sync multiple files without specifying each file's path. This lets you:

- Reference many files with one pattern. For example, `**` indicates every file in the folder.
- Reference future files that don't exist yet \(and therefore don't have a specific path\).

You must provide a path pattern. For complex directory layouts, you can provide multiple patterns separated by \|.

:::tip
If your folder contains several file types, use glob patterns to select files matching your configured format. For example, your folder might contain CSV files and PDFs while the connector is configured to parse CSV files. Use a pattern such as `**/*.csv` so that only CSV files are processed. Without this filter, the connector parses every matched file as the configured format. Incompatible file types can cause parsing errors.
:::

Each path pattern starts from the folder's _root_. Don't include the root folder name in the pattern\(s\).

Example patterns:

- `**` : Match everything. (Warning: see the tip above before using this glob with folders containing multiple file types.)
- `**/*.csv` : Match all files with a specific extension.
- `myFolder/**/*.csv` : Match all csv files anywhere under myFolder.
- `*/**` : Match everything at least one folder deep. (Warning: see the tip above before using this glob with folders containing multiple file types.)
- `*/*/*/**` : Match everything at least three folders deep. (Warning: see the tip above before using this glob with folders containing multiple file types.)
- `**/file.*|**/file` : Match every file called "file" with any extension \(or no extension\).
- `x/*/y/*` : Match all files in sub-folder x -&gt; any folder -&gt; folder y. (Warning: see the tip above before using this glob with folders containing multiple file types.)
- `**/prefix*.csv` : Match all csv files with a specific prefix.
- `**/prefix*.parquet` : Match all parquet files with a specific prefix.

Consider this folder layout. `MyFolder` is the connector's configured root folder, and the patterns are relative to it:

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

Suppose you want part1.csv, part2.csv and part3.csv, but not another_part1.csv. You could use several approaches:

- Use the single pattern `**/part*.csv` to select every csv file called "partX".
- Use the dual pattern `some_table_files/*.csv|more_table_files/*.csv` to select relevant files from only those exact folders.
- Use the single pattern `*table_files/*.csv` to achieve the same result. However, unexpected new folders could cause future problems.
- You can also use a recursive wildcard. The pattern `extras/**/*.csv` selects csv files nested below "extras", including "extras/misc/another_part1.csv".

Path patterns offer several ways to achieve the same outcome. Choose a clear pattern that remains reliable as the directory structure grows.

## User schema

For Avro, Jsonl, CSV or Parquet formats, you can provide a schema for the output stream. **Note that this doesn't apply to the Document file type format.**

A schema gives you more control over the stream's output. Without one, columns and datatypes are inferred from the first created file matching your path pattern and suffix. This approach will probably work in most cases. However, you may want to enforce a schema when:

- You only need a known subset of columns. Other columns remain included but are packed into the `_ab_additional_properties` map.
- Your initial dataset has few records, so automatic type inference might not represent future data.
- You want to define a type for every column.
- You know which columns future data will add. You want them in the core schema instead of the `_ab_additional_properties` map.

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

CSV files are effectively plain text, so correct parsing often requires specific reader options. Apply these settings consistently whenever you create or export a CSV.

- **Header Definition**: Defines how headers work. `User Provided` assumes the CSV has no header row and uses the provided headers. `Autogenerated` also assumes there is no header row. The CDK generates headers using `f{i}`, where `i` is the index starting from 0. Otherwise, the header from the CSV file is used by default. To generate or provide column names for a CSV with headers, set "Skip rows before header" to ignore the header row.
- **Delimiter**: CSV means Comma Separated Values, but the term also covers flat-file data separated by other characters. Use the delimiter field to specify the separator character. To use [tab-delimiters](https://en.wikipedia.org/wiki/Tab-separated_values), set this value to `\t`. By default, this value is `,`.
- **Double Quote**: Determines whether two quotes within a quoted CSV value represent one quote in the data. The default is True.
- **Encoding**: Some data uses a different character set, typically when it contains different alphabets. See the [list of allowable encodings here](https://docs.python.org/3/library/codecs.html#standard-encodings). The default is `utf8`.
- **Escape Character**: An escape character can prefix a reserved character to support correct parsing. A common choice is the backslash (`\`). For example, consider this data:

```
Product,Description,Price
Jeans,"Navy Blue, Bootcut, 34\"",49.99
```

The backslash (`\`) directly precedes the second double quote (`"`). This shows it isn't the field's closing quote. Instead, the value includes it as a literal double quote. Here, it shows the jeans size in inches: `34"`.

Leave this field blank, the default option, to prevent escaping.

- **False Values**: A set of case-sensitive strings interpreted as false values.
- **Null Values**: A set of case-sensitive strings interpreted as null values. To interpret 'NA' as null, enter 'NA' in this field.
- **Quote Character**: Data values can contain reserved characters, such as a comma when that's the delimiter. CSVs handle these characters by wrapping values in defined quote characters, allowing correct parsing. The default is `"`.
- **Skip Rows After Header**: The number of rows skipped after the header row.
- **Skip Rows Before Header**: The number of rows skipped before the header row.
- **Strings Can Be Null**: Determines whether strings can be interpreted as null values. If true, strings matching the null_values set are interpreted as null. If false, matching strings remain unchanged.
- **True Values**: A set of case-sensitive strings interpreted as true values.

### Parquet

Apache Parquet is a column-oriented data storage format in the Apache Hadoop ecosystem. Its compression and encoding schemes support efficient handling of complex data in bulk. Partitioned parquet datasets aren't currently supported. The following setting is available:

- **Convert Decimal Fields to Floats**: Determines whether decimal fields are converted to floats. This conversion loses precision, so it isn't recommended.

### Avro

The Avro parser uses the [Fastavro library](https://fastavro.readthedocs.io/en/latest/). The following setting is available:

- **Convert Double Fields to Strings**: Determines whether double fields are converted to strings. This is recommended for highly precise decimal numbers because floating-point handling can lose precision.

### JSONL

JSONL parsing currently has no options.

### Document file type format

The Document file type format extracts text from Markdown, TXT, PDF, Word, Powerpoint and Google documents. When selected, the connector outputs extracted text in one field named `content`. The `document_key` field stores a unique identifier for the processed file and can serve as a primary key. Document content includes markdown formatting converted from the original file format. Every file matching the defined glob pattern must use markdown (`md`), PDF (`pdf`) or Docx (`docx`) format.

The connector emits one record for each document. Large files can produce records that exceed some destinations' different string-field limits.

Before parsing, the connector internally exports Google Document files to Docx format. It exports and parses Google Sheets, Google Slides and drawings as PDFs.

#### Parse with the Unstructured.io Python Library

This connector uses the open source [Unstructured](https://unstructured-io.github.io/unstructured/introduction.html#product-offerings) library for OCR and text extraction. It processes PDFs, MS Word files, embedded tables and images. Read about the parsing logic in the [Unstructured docs](https://unstructured-io.github.io/unstructured/core/partition.html). Learn about other Unstructured tools and services at [www.unstructured.io](https://www.unstructured.io).

### Copy raw files configuration

<FieldAnchor field="delivery_method.delivery_type">

:::info

Raw file replication has these requirements and limitations:
- **Supported Airbyte Versions:**
  - Cloud: All Workspaces
  - OSS / Enterprise: `v1.2.0` or later
- **Max File Size:** `1GB` per file
- **Supported Destinations:**
  - S3: `v1.4.0` or later

:::

Copy raw files without parsing their content. Bits reach the destination exactly as they appeared in the source. This method is recommended for unstructured text data, non-text files and compressed files.

Format options don't apply. Files are transferred to the file-based destination without parsing their underlying data.

</FieldAnchor>

#### Preserve subdirectories in file paths

When enabled, this option sends the subdirectory structure and source file names to the destination. Otherwise, files sync using only their names. This option is ignored unless file-based replication is enabled.

### Exclude trashed files

This option is disabled by default. The Google Drive API returns trashed files unless you explicitly filter them out. When enabled, the connector skips trashed files and files within trashed folders. Files synced before being trashed remain in the destination. Run a refresh to remove them.

### Replicate permissions ACL
This mode syncs Google Drive file permissions (ACLs) and Identities (users and groups) from your Google Workspace.
The Identities Stream is enabled by default.

To use these features, confirm that you have the correct permissions and have enabled the required Google APIs.

#### Required Google APIs
Enable these APIs in your Google Cloud project:

- [Google Drive API](https://console.cloud.google.com/apis/library/drive.googleapis.com)
  Provides access to read file metadata and permissions in Google Drive.
- [Google Admin SDK API](https://console.cloud.google.com/apis/library/admin.googleapis.com)
  Allows retrieval of users and groups in your Google Workspace.

#### Authorisation scopes
When setting up this connector, authorise these scopes in the Google consent screen:

- https://www.googleapis.com/auth/drive.readonly
- https://www.googleapis.com/auth/admin.directory.group.readonly
- https://www.googleapis.com/auth/admin.directory.group.member.readonly
- https://www.googleapis.com/auth/admin.directory.user.readonly

#### Domain field (optional)
You must specify the `domain` field in the connector configuration when syncing **identities** (users and groups) from another domain.

#### Streams

##### 1. Files permissions (ACLs)

This stream syncs file permissions (Access Control Lists) for files in your Google Drive. Set up a stream name and globs.

##### 2. Identities (users and groups)

This stream is enabled by default and retrieves information about **users and groups** in your Google Workspace. It helps you map file permissions (ACLs) to users and groups.

##### Requirements

- Confirm that the **Google Admin SDK API** is enabled.
- The authenticated user must have the required Google Admin Directory permissions.

## IP allow list

If you use Airbyte Cloud and your company restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                      |
|---------|------------|----------------------------------------------------------|----------------------------------------------------------------------------------------------|
| 0.6.4 | 2026-11-10 | [91555](https://github.com/airbytehq/airbyte/pull/91555) | Update dependencies |
| 0.6.3 | 2026-11-03 | [90888](https://github.com/airbytehq/airbyte/pull/90888) | Raise minimum supported Python version to 3.11 |
| 0.6.2 | 2026-11-03 | [90608](https://github.com/airbytehq/airbyte/pull/90608) | Update dependencies |
| 0.6.1 | 2026-10-27 | [89918](https://github.com/airbytehq/airbyte/pull/89918) | Update dependencies |
| 0.6.0 | 2026-10-21 | [89595](https://github.com/airbytehq/airbyte/pull/89595) | Add optional "Exclude Trashed Files" setting to skip files in the Google Drive trash |
| 0.5.40 | 2026-10-20 | [89242](https://github.com/airbytehq/airbyte/pull/89242) | Update dependencies |
| 0.5.39 | 2026-10-13 | [88658](https://github.com/airbytehq/airbyte/pull/88658) | Update dependencies |
| 0.5.38 | 2026-10-06 | [87880](https://github.com/airbytehq/airbyte/pull/87880) | Update dependencies |
| 0.5.37 | 2026-09-29 | [87198](https://github.com/airbytehq/airbyte/pull/87198) | Update dependencies |
| 0.5.36 | 2026-09-22 | [86653](https://github.com/airbytehq/airbyte/pull/86653) | Update dependencies |
| 0.5.35 | 2026-09-15 | [86072](https://github.com/airbytehq/airbyte/pull/86072) | Update dependencies |
| 0.5.34 | 2026-09-08 | [85518](https://github.com/airbytehq/airbyte/pull/85518) | Update dependencies |
| 0.5.33 | 2026-09-01 | [85247](https://github.com/airbytehq/airbyte/pull/85247) | Update dependencies |
| 0.5.32 | 2026-08-25 | [85013](https://github.com/airbytehq/airbyte/pull/85013) | Update dependencies |
| 0.5.31 | 2026-08-18 | [83838](https://github.com/airbytehq/airbyte/pull/83838) | Resolve Google-native export extensions before computing file-transfer paths |
| 0.5.30 | 2026-08-18 | [84602](https://github.com/airbytehq/airbyte/pull/84602) | Update dependencies |
| 0.5.29 | 2026-08-11 | [84223](https://github.com/airbytehq/airbyte/pull/84223) | Update CDK to ^7.25.1 |
| 0.5.28 | 2026-08-11 | [83966](https://github.com/airbytehq/airbyte/pull/83966) | Update dependencies |
| 0.5.27 | 2026-08-04 | [83492](https://github.com/airbytehq/airbyte/pull/83492) | Update dependencies |
| 0.5.26 | 2026-07-28 | [82943](https://github.com/airbytehq/airbyte/pull/82943) | Update dependencies |
| 0.5.25 | 2026-07-21 | [82459](https://github.com/airbytehq/airbyte/pull/82459) | Update dependencies |
| 0.5.24 | 2026-07-14 | [81878](https://github.com/airbytehq/airbyte/pull/81878) | Update dependencies |
| 0.5.23 | 2026-07-07 | [81443](https://github.com/airbytehq/airbyte/pull/81443) | Update dependencies |
| 0.5.22 | 2026-06-30 | [80501](https://github.com/airbytehq/airbyte/pull/80501) | Update dependencies |
| 0.5.21 | 2026-06-16 | [79912](https://github.com/airbytehq/airbyte/pull/79912) | Update dependencies |
| 0.5.20 | 2026-06-09 | [79341](https://github.com/airbytehq/airbyte/pull/79341) | Update dependencies |
| 0.5.19 | 2026-06-02 | [78739](https://github.com/airbytehq/airbyte/pull/78739) | Update dependencies |
| 0.5.18 | 2026-05-02 | [77714](https://github.com/airbytehq/airbyte/pull/77714) | Update airbyte-cdk to 7.18.1 (surface actionable check errors instead of full Python tracebacks) |
| 0.5.17 | 2026-05-02 | [77711](https://github.com/airbytehq/airbyte/pull/77711) | Update airbyte-cdk to 7.18.0 |
| 0.5.16 | 2026-04-28 | [77266](https://github.com/airbytehq/airbyte/pull/77266) | Update dependencies |
| 0.5.15 | 2026-04-21 | [76611](https://github.com/airbytehq/airbyte/pull/76611) | Update dependencies |
| 0.5.14 | 2026-04-01 | [75573](https://github.com/airbytehq/airbyte/pull/75573) | Migrate OAuth scope to scopes object array for granular scopes support |
| 0.5.13 | 2026-03-31 | [75368](https://github.com/airbytehq/airbyte/pull/75368) | Update dependencies |
| 0.5.12 | 2026-03-17 | [74923](https://github.com/airbytehq/airbyte/pull/74923) | Update dependencies |
| 0.5.11 | 2026-03-03 | [73119](https://github.com/airbytehq/airbyte/pull/73119) | Update dependencies |
| 0.5.10 | 2026-02-06 | [72377](https://github.com/airbytehq/airbyte/pull/72377) | Update dependencies |
| 0.5.9 | 2026-01-20 | [71890](https://github.com/airbytehq/airbyte/pull/71890) | Update dependencies |
| 0.5.8 | 2026-01-14 | [71735](https://github.com/airbytehq/airbyte/pull/71735) | Update dependencies |
| 0.5.7 | 2025-12-18 | [70532](https://github.com/airbytehq/airbyte/pull/70532) | Update dependencies |
| 0.5.6 | 2025-12-02 | [70289](https://github.com/airbytehq/airbyte/pull/70289) | Update dependencies |
| 0.5.5 | 2025-11-25 | [70090](https://github.com/airbytehq/airbyte/pull/70090) | Update dependencies |
| 0.5.4 | 2025-11-18 | [69386](https://github.com/airbytehq/airbyte/pull/69386) | Update dependencies |
| 0.5.3 | 2025-11-11 | [69272](https://github.com/airbytehq/airbyte/pull/69272) | Update dependencies |
| 0.5.2 | 2025-11-04 | [69158](https://github.com/airbytehq/airbyte/pull/69158) | Update dependencies |
| 0.5.1 | 2025-10-29 | [69053](https://github.com/airbytehq/airbyte/pull/69053) | Update dependencies |
| 0.5.0 | 2025-10-27 | [68618](https://github.com/airbytehq/airbyte/pull/68618) | Upgrade to Python 3.13 |
| 0.4.10 | 2025-10-21 | [68321](https://github.com/airbytehq/airbyte/pull/68321) | Update dependencies |
| 0.4.9 | 2025-10-14 | [68038](https://github.com/airbytehq/airbyte/pull/68038) | Update dependencies |
| 0.4.8 | 2025-10-07 | [67259](https://github.com/airbytehq/airbyte/pull/67259) | Update dependencies |
| 0.4.7 | 2025-09-30 | [66169](https://github.com/airbytehq/airbyte/pull/66169) | Update dependencies |
| 0.4.6 | 2025-09-10 | [66009](https://github.com/airbytehq/airbyte/pull/66009) | Update to CDK v7 |
| 0.4.5 | 2025-09-09 | [66108](https://github.com/airbytehq/airbyte/pull/66108) | Update dependencies |
| 0.4.4 | 2025-08-23 | [61127](https://github.com/airbytehq/airbyte/pull/61127) | Update dependencies |
| 0.4.3 | 2025-08-21 | [65081](https://github.com/airbytehq/airbyte/pull/65081) | Certify connector |
| 0.4.2 | 2025-05-24 | [60621](https://github.com/airbytehq/airbyte/pull/60621) | Update dependencies |
| 0.4.1 | 2025-05-10 | [58227](https://github.com/airbytehq/airbyte/pull/58227) | Update dependencies |
| 0.4.0 | 2025-05-06 | [59690](https://github.com/airbytehq/airbyte/pull/59690) | Promoting release candidate 0.4.0-rc.1 to a main version. |
| 0.4.0-rc.1 | 2025-05-05 | [57496](https://github.com/airbytehq/airbyte/pull/57496) | Adapt file-transfer records to latest protocol, requires platform >= 1.7.0, destination-s3 >= 1.8.0 |
| 0.3.4 | 2025-04-12 | [57675](https://github.com/airbytehq/airbyte/pull/57675) | Update dependencies |
| 0.3.3 | 2025-04-05 | [57072](https://github.com/airbytehq/airbyte/pull/57072) | Update dependencies |
| 0.3.2 | 2025-03-29 | [56665](https://github.com/airbytehq/airbyte/pull/56665) | Update dependencies |
| 0.3.1 | 2025-03-22 | [55938](https://github.com/airbytehq/airbyte/pull/55938) | Update dependencies |
| 0.3.0 | 2025-03-14 | [55689](https://github.com/airbytehq/airbyte/pull/55689) | Refactor to use new Stream Permissions Reader |
| 0.2.4 | 2025-03-08 | [55349](https://github.com/airbytehq/airbyte/pull/55349) | Update dependencies |
| 0.2.3 | 2025-03-01 | [54955](https://github.com/airbytehq/airbyte/pull/54955) | Update dependencies |
| 0.2.2 | 2025-02-22 | [54416](https://github.com/airbytehq/airbyte/pull/54416) | Update dependencies |
| 0.2.1 | 2025-02-15 | [53774](https://github.com/airbytehq/airbyte/pull/53774) | Update dependencies |
| 0.2.0 | 2025-02-14 | [52099](https://github.com/airbytehq/airbyte/pull/52099) | Introduce ACLs and Permissions streams |
| 0.1.2 | 2025-02-08 | [53320](https://github.com/airbytehq/airbyte/pull/53320) | Update dependencies |
| 0.1.1 | 2025-02-01 | [43895](https://github.com/airbytehq/airbyte/pull/43895) | Update dependencies |
| 0.1.0 | 2025-01-27 | [52572](https://github.com/airbytehq/airbyte/pull/52572) | Promoting release candidate 0.1.0-rc.1 to a main version. |
| 0.1.0-rc.1 | 2025-01-20 | [51585](https://github.com/airbytehq/airbyte/pull/51585) | Bump cdk to enable universal file transfer |
| 0.0.12 | 2024-06-06 | [39291](https://github.com/airbytehq/airbyte/pull/39291) | [autopull] Upgrade base image to v1.2.2 |
| 0.0.11 | 2024-05-29 | [38698](https://github.com/airbytehq/airbyte/pull/38698) | Avoid error on empty stream when running discover |
| 0.0.10 | 2024-03-28 | [36581](https://github.com/airbytehq/airbyte/pull/36581) | Manage dependencies with Poetry |
| 0.0.9 | 2024-02-06 | [34936](https://github.com/airbytehq/airbyte/pull/34936) | Bump CDK version to avoid missing SyncMode errors |
| 0.0.8 | 2024-01-30 | [34681](https://github.com/airbytehq/airbyte/pull/34681) | Unpin CDK version to make compatible with the Concurrent CDK |
| 0.0.7 | 2024-01-30 | [34661](https://github.com/airbytehq/airbyte/pull/34661) | Pin CDK version until upgrade for compatibility with the Concurrent CDK |
| 0.0.6 | 2023-12-16 | [33414](https://github.com/airbytehq/airbyte/pull/33414) | Prepare for airbyte-lib |
| 0.0.5 | 2023-12-14 | [33411](https://github.com/airbytehq/airbyte/pull/33411) | Bump CDK version to auto-set primary key for document file streams and support raw txt files |
| 0.0.4 | 2023-12-06 | [33187](https://github.com/airbytehq/airbyte/pull/33187) | Bump CDK version to hide source-defined primary key |
| 0.0.3 | 2023-11-16 | [31458](https://github.com/airbytehq/airbyte/pull/31458) | Improve folder id input and update document file type parser |
| 0.0.2 | 2023-11-02 | [31458](https://github.com/airbytehq/airbyte/pull/31458) | Allow syncs on shared drives |
| 0.0.1 | 2023-11-02 | [31458](https://github.com/airbytehq/airbyte/pull/31458) | Initial Google Drive source |

</details>
