---
generated_record: true
connector_name: Microsoft OneDrive
connector_type: source
connector_slug: microsoft-onedrive
connector_directory: source-microsoft-onedrive
definition_id: 01d1c685-fd4a-4837-8f4c-93fe5a0d2188
version: 0.2.44
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/microsoft-onedrive
logo: /images/connectors/sources/microsoft-onedrive.svg
logo_source_path: airbyte-integrations/connectors/source-microsoft-onedrive/icon.svg
logo_sha256: d0e0459b880f62e5a8fbc067c52081b1e10f320291432bd2d4969515c0ddde0a
original_metadata_path: airbyte-integrations/connectors/source-microsoft-onedrive/metadata.yaml
original_metadata_sha256: 6627aaef801330cd8f1485a9b993589eeff8ddbee24ed5ca47b58c31e084036d
original_document_path: docs/integrations/sources/microsoft-onedrive.md
original_document_sha256: ea5af54f9382637f24f378b3b19732a8b59b4df8758306e69b39cdf3171f5d38
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ff3be7857f8ed86d22138851910fc9b9b93da22ff6c7b157786522a3dc7ea616
rewritten_at: 2026-11-12T13:47:57.415090+00:00
---

# Microsoft OneDrive

Use this page to set up the Microsoft OneDrive source connector and find reference information.

### Requirements

- Application \(client\) ID
- Directory \(tenant\) ID
- Drive name
- Folder Path
- Client secrets

## Setup guide

<!-- env:cloud -->

**For Airbyte Cloud:**

1. Go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Microsoft OneDrive** from the Source type dropdown.
4. Enter a name for the Microsoft OneDrive connector.
5. Enter **Drive Name**. To find your drive name, open settings. The name appears at the top of the settings menu.
6. Select **Search Scope**. This specifies where to search for files. Select 'ACCESSIBLE_DRIVES' to search the selected OneDrive drive. Select 'SHARED_ITEMS' for shared items the user can access. Select 'ALL' to search both. The default value is 'ALL'.
7. Enter **Folder Path**. Leave this empty to search every folder on the drives. This setting doesn't apply to shared items.
8. The **OAuth2.0** authorisation method is selected by default. Click **Authenticate your Microsoft OneDrive account**, then sign in and authorise your Microsoft account.
9. For **Start Date**, enter the date in YYYY-MM-DD format. Data added on or after this date will be replicated.
10. Add a stream:
    1. Enter the **File Type**.
    2. In the **Format** box, select the file format you want to replicate. The supported formats are **CSV**, **Parquet**, **Avro** and **JSONL**. Turn on **Optional fields** in the **Format** box to enter more settings for your selected format. For details about these settings, see [File Format section](#file-format-settings) below.
    3. Give the stream a **Name**.
    4. Optionally, enter a **Input schema** to enforce a specific schema. By default, this value is `{}`. It automatically infers the schema from the file\(s\) you're replicating. For details about providing a custom schema, see [User Schema section](#user-schema).
    5. Optionally, enter the **Globs** to specify which files to sync. This regular expression lets Airbyte match the specific files to replicate. To replicate every file in your bucket, use `**` as the pattern. For more precise pattern matching, see [Path Patterns section](#path-patterns) below.
11. Click **Set up source**.
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

### Step 1: Set up the OneDrive application

The Microsoft Graph API uses OAuth for authentication. Microsoft Graph provides granular permissions controlling app access to resources such as users, groups and mail. When a user signs in, they or an administrator can consent to these permissions. If they consent, your app can access its requested resources and APIs. For apps without a signed-in user, an administrator can pre-consent to permissions during installation.

Microsoft Graph provides two permission types:

- **Delegated permissions** apply to apps with a signed-in user. The user or an administrator consents to the requested permissions. The app can then act as the signed-in user when calling Microsoft Graph. Non-administrative users can consent to some delegated permissions. Higher-privileged permissions require administrator consent.
- **Application permissions** apply to apps without a signed-in user, including background services or daemons. Only an administrator can consent to application permissions.

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
   1. Description: tap-microsoft-onedrive client secret
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

### Step 2: Set up the Microsoft OneDrive connector in Airbyte

1. Go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the **Set up** the source page, select **Microsoft OneDrive** from the Source type dropdown.
4. Enter a name for the Microsoft OneDrive connector.
5. Enter **Drive Name**. To find your drive name, open settings. The name appears at the top of the settings menu.
6. Select **Search Scope**. This specifies where to search for files. Select 'ACCESSIBLE_DRIVES' to search the selected OneDrive drive. Select 'SHARED_ITEMS' for shared items the user can access. Select 'ALL' to search both. The default value is 'ALL'.
7. Enter **Folder Path**. Leave this empty to search every folder on the drives. This setting doesn't apply to shared items.
8. Switch to **Service Key Authentication**.
9. For **User Practical Name**, enter your user's [UPN](https://learn.microsoft.com/en-us/sharepoint/list-onedrive-urls).
10. Enter **Tenant ID**, **Client ID** and **Client secret**.
11. For **Start Date**, enter the date in YYYY-MM-DD format. Data added on or after this date will be replicated.
12. Add a stream:
    1. Enter the **File Type**.
    2. In the **Format** box, select the file format you want to replicate. The supported formats are **CSV**, **Parquet**, **Avro** and **JSONL**. Turn on **Optional fields** in the **Format** box to enter more settings for your selected format. For details about these settings, see [File Format section](#file-format-settings) below.
    3. Give the stream a **Name**.
    4. Optionally, enter a **Input schema** to enforce a specific schema. By default, this value is `{}`. It automatically infers the schema from the file\(s\) you're replicating. For details about providing a custom schema, see [User Schema section](#user-schema).
    5. Optionally, enter the **Globs** to specify which files to sync. This regular expression lets Airbyte match the specific files to replicate. To replicate every file in your bucket, use `**` as the pattern. For more precise pattern matching, see [Path Patterns section](#path-patterns) below.
13. Click **Set up source**.

<!-- /env:oss -->

## Path patterns

\(In short, path patterns use [wcmatch.glob](https://facelessuser.github.io/wcmatch/glob/) syntax. GLOBSTAR and SPLIT flags are enabled.\)

Use glob-style patterns to sync multiple files without providing each file's path. This lets you:

- Reference many files with one pattern. For example, `**` represents every file in the folder.
- Reference future files that don't yet exist and therefore have no specific path.

You must provide a path pattern. For complex directory layouts, you can provide several patterns separated by \|.

Each path pattern starts from the folder's _root_. Don't include the root folder name in the pattern\(s\).

Example patterns include:

- `**`: Match everything.
- `**/*.csv`: Match every file with a specific extension.
- `myFolder/**/*.csv`: Match every csv file anywhere under myFolder.
- `*/**`: Match everything at least one folder deep.
- `*/*/*/**`: Match everything at least three folders deep.
- `**/file.*|**/file`: Match every file named "file", with any extension or no extension.
- `x/*/y/*`: Match every file in sub-folder x -&gt; any folder -&gt; folder y.
- `**/prefix*.csv`: Match every csv file with a specific prefix.
- `**/prefix*.parquet`: Match every parquet file with a specific prefix.

Consider this folder layout. `MyFolder` is the connector's root folder, and all patterns are relative to it:

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

You want part1.csv, part2.csv and part3.csv, but not another_part1.csv. You can achieve this in several ways:

- Use `**/part*.csv` to select every csv file named "partX".
- Use the dual pattern `some_table_files/*.csv|more_table_files/*.csv` to select relevant files only from those exact folders.
- Use `*table_files/*.csv` to achieve the same result with one pattern. However, future unexpected folders could cause problems.
- Use a recursive wildcard. The pattern `extras/**/*.csv` selects any csv files nested below "extras", including "extras/misc/another_part1.csv".

Path patterns offer several ways to achieve the same goal. Choose a clear pattern that can accommodate future directory additions.

## User schema

For Avro, Jsonl, CSV or Parquet formats, you can provide a schema for the output stream. **Note that this doesn't apply to the Document file type format.**

A schema gives you more control over the stream's output. Without one, the connector infers columns and datatypes from the first created file matching your path pattern and suffix. This approach will suit most cases. However, you may want to enforce a schema when:

- You only need a known subset of columns. Other columns remain included but are packed into the `_ab_additional_properties` map.
- Your initial dataset contains few records, so its automatic type inference may not represent future data.
- You want to define types for every column.
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

CSV files are plain text, so correct parsing often requires specific reader options. Apply these settings consistently whenever you create or export a CSV.

- **Header Definition**: Defines the headers. `User Provided` assumes the CSV has no header row and uses the provided headers. `Autogenerated` also assumes there is no header row. The CDK generates headers using `f{i}`, where `i` is the index starting from 0. Otherwise, the CSV file's header is used by default. To generate or provide column names for a CSV with headers, set "Skip rows before header" to ignore the header row.
- **Delimiter**: CSV means Comma Separated Values, but the term also covers flat-file data using other separators. The delimiter field specifies the separator character. To use [tab-delimiters](https://en.wikipedia.org/wiki/Tab-separated_values), set this value to `\t`. The default value is `,`.
- **Double Quote**: Determines whether two quotes within a quoted CSV value represent one quote in the data. The default is True.
- **Encoding**: Some data uses another character set, typically for different alphabets. See [list of allowable encodings here](https://docs.python.org/3/library/codecs.html#standard-encodings). The default is `utf8`.
- **Escape Character**: An escape character prefixes a reserved character to support correct parsing. The backslash (`\`) is commonly used. For example, consider this data:

```
Product,Description,Price
Jeans,"Navy Blue, Bootcut, 34\"",49.99
```

The backslash (`\`) directly precedes the second double quote (`"`). It shows that the quote isn't the field's closing quote. Instead, it's a literal double quote included in the value. Here, it represents the jeans size in inches: `34"`.

Leave this field blank, the default option, to disallow escaping.

- **False Values**: A set of case-sensitive strings interpreted as false values.
- **Null Values**: A set of case-sensitive strings interpreted as null values. For example, enter 'NA' if 'NA' should be interpreted as null.
- **Quote Character**: Data values can contain reserved characters, such as a comma used as the delimiter. CSVs handle these characters by wrapping the value in defined quote characters for correct parsing. The default is `"`.
- **Skip Rows After Header**: The number of rows skipped after the header row.
- **Skip Rows Before Header**: The number of rows skipped before the header row.
- **Strings Can Be Null**: Determines whether strings can be interpreted as null values. If true, strings matching the null_values set are interpreted as null. If false, they remain strings.
- **True Values**: A set of case-sensitive strings interpreted as true values.

### Parquet

Apache Parquet is a column-oriented data storage format in the Apache Hadoop ecosystem. Its compression and encoding schemes support efficient bulk processing of complex data. Partitioned parquet datasets are currently unsupported. The following setting is available:

- **Convert Decimal Fields to Floats**: Determines whether decimal fields are converted to floats. This conversion loses precision, so it isn't recommended.

### Avro

The Avro parser uses [Fastavro library](https://fastavro.readthedocs.io/en/latest/). The following setting is available:

- **Convert Double Fields to Strings**: Determines whether double fields are converted to strings. This is recommended for highly precise decimal numbers because floating-point handling can lose precision.

### JSONL

JSONL parsing currently has no options.

### Document file type format

The Document file type format extracts text from Markdown, TXT, PDF, Word, Powerpoint and Google documents. The connector outputs the extracted text as a single field named `content`. The `document_key` field contains a unique identifier for the processed file and can serve as a primary key. The document content includes markdown formatting converted from the original file format. Each matching file must be a markdown (`md`), PDF (`pdf`) or Docx (`docx`) file.

The connector emits one record for each document. Large files can produce records that exceed some destinations' string-field limits. These limits vary by destination.

Before parsing, the connector internally exports Google Document files to Docx format. It exports and parses Google Sheets, Google Slides and drawings as PDFs.

## Sync overview

### Data type mapping

| Integration Type | Airbyte Type |
| :--------------- | :----------- |
| `string`         | `string`     |
| `number`         | `number`     |
| `array`          | `array`      |
| `object`         | `object`     |

### Features

| Feature           | Supported?\(Yes/No\) |
| :---------------- | :------------------- |
| Full Refresh Sync | Yes                  |
| Incremental Sync  | Yes                  |

### Performance considerations

Normal Microsoft Graph [requests limitation](https://docs.microsoft.com/en-us/graph/throttling) restrict the connector.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                         |
|:--------|:-----------|:---------------------------------------------------------|:------------------------------------------------------------------------------------------------|
| 0.2.44 | 2025-05-24 | [60568](https://github.com/airbytehq/airbyte/pull/60568) | Update dependencies |
| 0.2.43 | 2025-05-10 | [60168](https://github.com/airbytehq/airbyte/pull/60168) | Update dependencies |
| 0.2.42 | 2025-05-03 | [59475](https://github.com/airbytehq/airbyte/pull/59475) | Update dependencies |
| 0.2.41 | 2025-04-26 | [58790](https://github.com/airbytehq/airbyte/pull/58790) | Update dependencies |
| 0.2.40 | 2025-04-12 | [57877](https://github.com/airbytehq/airbyte/pull/57877) | Update dependencies |
| 0.2.39 | 2025-04-05 | [57058](https://github.com/airbytehq/airbyte/pull/57058) | Update dependencies |
| 0.2.38 | 2025-03-29 | [56703](https://github.com/airbytehq/airbyte/pull/56703) | Update dependencies |
| 0.2.37 | 2025-03-22 | [56024](https://github.com/airbytehq/airbyte/pull/56024) | Update dependencies |
| 0.2.36 | 2025-03-08 | [55511](https://github.com/airbytehq/airbyte/pull/55511) | Update dependencies |
| 0.2.35 | 2025-03-01 | [54797](https://github.com/airbytehq/airbyte/pull/54797) | Update dependencies |
| 0.2.34 | 2025-02-22 | [54358](https://github.com/airbytehq/airbyte/pull/54358) | Update dependencies |
| 0.2.33 | 2025-02-15 | [53855](https://github.com/airbytehq/airbyte/pull/53855) | Update dependencies |
| 0.2.32 | 2025-02-08 | [53283](https://github.com/airbytehq/airbyte/pull/53283) | Update dependencies |
| 0.2.31 | 2025-02-01 | [52781](https://github.com/airbytehq/airbyte/pull/52781) | Update dependencies |
| 0.2.30 | 2025-01-25 | [52252](https://github.com/airbytehq/airbyte/pull/52252) | Update dependencies |
| 0.2.29 | 2025-01-11 | [51172](https://github.com/airbytehq/airbyte/pull/51172) | Update dependencies |
| 0.2.28 | 2025-01-04 | [50888](https://github.com/airbytehq/airbyte/pull/50888) | Update dependencies |
| 0.2.27 | 2024-12-28 | [50601](https://github.com/airbytehq/airbyte/pull/50601) | Update dependencies |
| 0.2.26 | 2024-12-21 | [50102](https://github.com/airbytehq/airbyte/pull/50102) | Update dependencies |
| 0.2.25 | 2024-12-14 | [49143](https://github.com/airbytehq/airbyte/pull/49143) | Update dependencies |
| 0.2.24 | 2024-11-25 | [48639](https://github.com/airbytehq/airbyte/pull/48639) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.23 | 2024-11-04 | [48274](https://github.com/airbytehq/airbyte/pull/48274) | Update dependencies |
| 0.2.22 | 2024-10-28 | [47060](https://github.com/airbytehq/airbyte/pull/47060) | Update dependencies |
| 0.2.21 | 2024-10-12 | [46177](https://github.com/airbytehq/airbyte/pull/46177) | Update dependencies |
| 0.2.20 | 2024-09-21 | [45728](https://github.com/airbytehq/airbyte/pull/45728) | Update dependencies |
| 0.2.19 | 2024-09-14 | [45583](https://github.com/airbytehq/airbyte/pull/45583) | Update dependencies |
| 0.2.18 | 2024-09-07 | [45312](https://github.com/airbytehq/airbyte/pull/45312) | Update dependencies |
| 0.2.17 | 2024-08-31 | [45048](https://github.com/airbytehq/airbyte/pull/45048) | Update dependencies |
| 0.2.16 | 2024-08-24 | [44699](https://github.com/airbytehq/airbyte/pull/44699) | Update dependencies |
| 0.2.15 | 2024-08-12 | [43799](https://github.com/airbytehq/airbyte/pull/43799) | Update dependencies |
| 0.2.14 | 2024-08-10 | [43538](https://github.com/airbytehq/airbyte/pull/43538) | Update dependencies |
| 0.2.13 | 2024-08-03 | [43168](https://github.com/airbytehq/airbyte/pull/43168) | Update dependencies |
| 0.2.12 | 2024-07-27 | [42630](https://github.com/airbytehq/airbyte/pull/42630) | Update dependencies |
| 0.2.11 | 2024-07-20 | [42175](https://github.com/airbytehq/airbyte/pull/42175) | Update dependencies |
| 0.2.10 | 2024-07-13 | [41764](https://github.com/airbytehq/airbyte/pull/41764) | Update dependencies |
| 0.2.9 | 2024-07-10 | [41366](https://github.com/airbytehq/airbyte/pull/41366) | Update dependencies |
| 0.2.8 | 2024-07-09 | [41213](https://github.com/airbytehq/airbyte/pull/41213) | Update dependencies |
| 0.2.7 | 2024-06-29 | [40623](https://github.com/airbytehq/airbyte/pull/40623) | Update dependencies |
| 0.2.6 | 2024-06-26 | [40534](https://github.com/airbytehq/airbyte/pull/40534) | Update dependencies |
| 0.2.5 | 2024-06-25 | [40506](https://github.com/airbytehq/airbyte/pull/40506) | Update dependencies |
| 0.2.4 | 2024-06-23 | [40226](https://github.com/airbytehq/airbyte/pull/40226) | Update dependencies |
| 0.2.3 | 2024-06-22 | [40160](https://github.com/airbytehq/airbyte/pull/40160) | Update dependencies |
| 0.2.2 | 2024-06-06 | [39227](https://github.com/airbytehq/airbyte/pull/39227) | [autopull] Upgrade base image to v1.2.2 |
| 0.2.1 | 2024-05-29 | [38676](https://github.com/airbytehq/airbyte/pull/38676) | Avoid error on empty stream when running discover |
| 0.2.0 | 2024-03-12 | [35849](https://github.com/airbytehq/airbyte/pull/35849) | Add fetching shared items |
| 0.1.9 | 2024-03-11 | [35956](https://github.com/airbytehq/airbyte/pull/35956) | Pin `transformers` transitive dependency |
| 0.1.8 | 2024-03-06 | [35858](https://github.com/airbytehq/airbyte/pull/35858) | Bump poetry.lock to upgrade transitive dependency |
| 0.1.7 | 2024-03-04 | [35584](https://github.com/airbytehq/airbyte/pull/35584) | Enable in Cloud |
| 0.1.6 | 2024-02-06 | [34936](https://github.com/airbytehq/airbyte/pull/34936) | Bump CDK version to avoid missing SyncMode errors |
| 0.1.5 | 2024-01-30 | [34681](https://github.com/airbytehq/airbyte/pull/34681) | Unpin CDK version to make compatible with the Concurrent CDK |
| 0.1.4 | 2024-01-30 | [34661](https://github.com/airbytehq/airbyte/pull/34661) | Pin CDK version until upgrade for compatibility with the Concurrent CDK |
| 0.1.3 | 2024-01-24 | [34478](https://github.com/airbytehq/airbyte/pull/34478) | Fix OAuth |
| 0.1.2 | 2021-12-22 | [33745](https://github.com/airbytehq/airbyte/pull/33745) | Add ql and sl to metadata |
| 0.1.1 | 2021-12-15 | [33758](https://github.com/airbytehq/airbyte/pull/33758) | Fix for docs name |
| 0.1.0 | 2021-12-06 | [32655](https://github.com/airbytehq/airbyte/pull/32655) | New source |

</details>
