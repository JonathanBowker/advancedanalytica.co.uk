---
generated_record: true
connector_name: Azure Blob Storage
connector_type: source
connector_slug: azure-blob-storage
connector_directory: source-azure-blob-storage
definition_id: fdaaba68-4875-4ed9-8fcd-4ae1e0a25093
version: 0.8.42
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/azure-blob-storage
logo: /images/connectors/sources/azure-blob-storage.svg
logo_source_path: airbyte-integrations/connectors/source-azure-blob-storage/icon.svg
logo_sha256: d0ef9bd336ac7f71856ce3c125f418055b6d40017e265d5c663590c0313ec533
original_metadata_path: airbyte-integrations/connectors/source-azure-blob-storage/metadata.yaml
original_metadata_sha256: a54faf9cf256c75817a9c170f23085df86e6426402e1a9026e80fbd1275eef76
original_document_path: docs/integrations/sources/azure-blob-storage.md
original_document_sha256: 51c7bbda1084433c22f698531bf030358bd78f176800aa61c80fb5e3c5ab8995
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 6e1ec893a3666c5888e5b6e0a31faa0accd12a1960f77a742bcc3d2119ef6898
rewritten_at: 2026-11-12T14:06:22.181626+00:00
---

# Azure Blob Storage

<HideInUI>

Use this page to set up and reference the [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs/) source connector.

</HideInUI>

:::info
Cloud storage may incur egress costs. Egress is data transferred out of cloud storage, including downloaded files or files accessed elsewhere. For more information, see the [Azure Blob Storage pricing guide](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/).
:::

:::warning Azure storage account retirements

Microsoft will retire general-purpose v1 (GPv1) and legacy Blob Storage (`BlobStorage` kind) accounts on October 13, 2026. Before then, check the account kind for the storage account you sync from and [upgrade it to general-purpose v2 (GPv2)](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-upgrade). Microsoft will automatically migrate any remaining accounts to GPv2 after the retirement date. The upgrade retains your endpoint names and data, so you don't need to change your Airbyte source configuration. However, migration timing can vary, access may be temporarily interrupted, and legacy Blob Storage accounts may be billed differently afterwards. See Microsoft's [GPv1 migration overview](https://learn.microsoft.com/en-us/azure/storage/common/general-purpose-version-1-account-migration-overview) and [legacy Blob Storage account migration overview](https://learn.microsoft.com/en-us/azure/storage/common/legacy-blob-storage-account-migration-overview).

:::

## Prerequisites

- [Tenant ID of the Microsoft Azure Application user](https://www.youtube.com/watch?v=WECmqC-MylA)
- [Azure Blob Storage account name](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview#storage-account-name)
- [Azure blob storage container (Bucket) Name](https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-portal#container-properties)

<details>
<summary>
Minimum permissions (role [Storage Blob Data Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-blob-data-reader) ):
</summary>
```json
[
   {
      "actions": [
         "Microsoft.Storage/storageAccounts/blobServices/containers/read",
         "Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey/action"
      ],
      "notActions": [],
      "dataActions": [
         "Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read"
      ],
      "notDataActions": []
   }
]
```
</details>

## Set up the connector

### 1. Set up Azure Blob Storage

- Create a storage account and grant roles [details](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal)

:::warning
Set up Access Control (IAM) to use Oauth2 or Client Credentials Authentication. The recommended role is [Storage Blob Data Reader](https://learn.microsoft.com/en-gb/azure/storage/blobs/assign-azure-role-data-access?tabs=portal)

<details>
<summary>
Follow these steps to set up an IAM role:
</summary>

1. In Azure portal, select the Storage or Container you want to sync. Then open Access Control(IAM) -> Role Assignment ![Access Control (IAM)](/.gitbook/assets/source/azure-blob-storage/access_control_iam.png)
2. Click `Add`, then select `Add role assignment` from the dropdown list ![Add role assignment](/.gitbook/assets/source/azure-blob-storage/add_role.png)
3. Search for `Storage Blob Data Reader` in the search box. Select the role, then click `Next` ![Search Role](/.gitbook/assets/source/azure-blob-storage/search_role.png)
4. Select `User, Group, or service principal`, then click `members`. Select members so they appear in the table, then click `Next` ![Add Members](/.gitbook/assets/source/azure-blob-storage/add_members.png)
5. (Optional) Add Conditions to restrict which role assignments a user can create.
6. Click `Review + Assign`
</details>
:::

<details>
<summary>
Follow these steps to set up a Service Principal to use the Client Credentials authentication method.
</summary>

In Azure portal, open your Service Principal's App Registration.

Note the `Directory (tenant) ID` and `Application (client) ID` shown in the Overview panel.

In the `Manage / Certificates & secrets` panel, click `Client Secrets` and create a new secret. Note the secret's `Value`.

</details>


### 2. Set up the connector in Airbyte

<!-- env:cloud -->

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Azure Blob Storage from the Source type dropdown.
4. Enter a name for the Azure Blob Storage connector.
5. Choose a [delivery method](/platform/using-airbyte/delivery-methods) for your data.
6. Enter the name of your Azure **Account**.
7. Enter your Tenant ID, then click **Authenticate your Azure Blob Storage account**.
8. Sign in and authorise the Azure Blob Storage account.
9. Enter the name of the **Container** containing the files you want to replicate.
10. Add a stream
   1. Enter the **File Type**
   2. In the **Format** box, select the format of the files you want to replicate. Supported formats are **CSV**, **Parquet**, **Avro** and **JSONL**. Turn on **Optional fields** in the **Format** box to enter more settings for the selected format. For details about these settings, see the [File Format section](#file-format-settings) below.
   3. Give the stream a **Name**
   4. (Optional) To enforce a specific schema, enter a **Input schema**. The default value is `{}`, which infers the schema automatically from the replicated file\(s\). For details about providing a custom schema, see the [User Schema section](#user-schema).
   5. Optionally, enter the **Globs** to control which files are synced. This regular expression lets Airbyte match the specific files to replicate. To replicate every file in your bucket, use `**` as the pattern. For more precise matching options, see the [Path Patterns section](#path-patterns) below.
11. (Optional) Enter the endpoint to use for data replication.
12. (Optional) Enter the start date for data replication.
<!-- /env:cloud -->

<!-- env:oss -->
### For Airbyte Open Source:

1. Open the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Azure Blob Storage from the Source type dropdown.
4. Enter a name for the Azure Blob Storage connector.
5. Choose a [delivery method](/platform/using-airbyte/delivery-methods) for your data.
6. Enter the name of your Azure **Storage Account** and **container**.
7. Choose the Authentication method.
   1. For access through a Storage Account Key, choose `Authenticate via Storage Account Key` and enter the key.
   1. For access through a Service Principal, choose the `Authenticate via Client Credentials`.
     0. See [above](#step-1-set-up-azure-blob-storage) for setting IAM role bindings and getting the Service Principal's app registration details
     1. Enter the app registration's `Directory (tenant) ID` value from Azure Portal in the `Tenant ID` field.
     2. Enter the `Application (client) ID` from Azure Portal in the `Client ID` field. This is **not** the secret ID
     3. Enter the Secret `Value` from Azure Portal in the `Client Secret` field.
8. Add a stream
   1. Enter the **File Type**
   2. In the **Format** box, select the format of the files you want to replicate. Supported formats are **CSV**, **Parquet**, **Avro** and **JSONL**. Turn on **Optional fields** in the **Format** box to enter more settings for the selected format. For details about these settings, see the [File Format section](#file-format-settings) below.
   3. Give the stream a **Name**
   4. (Optional) To enforce a specific schema, enter a **Input schema**. The default value is `{}`, which infers the schema automatically from the replicated file\(s\). For details about providing a custom schema, see the [User Schema section](#user-schema).
   5. Optionally, enter the **Globs** to control which files are synced. This regular expression lets Airbyte match the specific files to replicate. To replicate every file in your bucket, use `**` as the pattern. For more precise matching options, see the [Path Patterns section](#path-patterns) below.
9. (Optional) Enter the endpoint to use for data replication.
10. (Optional) Enter the start date for data replication.
<!-- /env:oss -->

## Supported sync modes

The Azure Blob Storage source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

| Feature                                        | Supported? |
| :--------------------------------------------- | :--------- |
| Full Refresh Sync                              | Yes        |
| Incremental Sync                               | Yes        |
| Replicate Incremental Deletes                  | No         |
| Replicate Multiple Files \(pattern matching\)  | Yes        |
| Replicate Multiple Streams \(distinct tables\) | Yes        |
| Namespaces                                     | No         |

## Supported streams

### File compression

| Compression | Supported? |
| :---------- | :--------- |
| Gzip        | Yes        |
| Zip         | No         |
| Bzip2       | Yes        |
| Lzma        | No         |
| Xz          | No         |
| Snappy      | No         |

Share any specific compression formats you'd like supported next.

### Path patterns

\(In short: path pattern syntax uses [wcmatch.glob](https://facelessuser.github.io/wcmatch/glob/). GLOBSTAR and SPLIT flags are enabled.\)

Use glob-style patterns to sync multiple files without specifying every file path. This lets you:

- Reference many files with one pattern. For example, `**` indicates every file in the bucket.
- Reference future files that don't yet exist \(and therefore don't have a specific path\).

You must provide a path pattern. For complex directory layouts, you can provide multiple patterns separated by \|.

Each path pattern starts from the bucket's _root_. Don't include the bucket name in the pattern\(s\).

Example patterns include:

- `**`: Match everything.
- `**/*.csv`: Match every file with a specific extension.
- `myFolder/**/*.csv`: Match every csv file anywhere under myFolder.
- `*/**`: Match everything at least one folder deep.
- `*/*/*/**`: Match everything at least three folders deep.
- `**/file.*|**/file`: Match every file named "file" with any extension \(or no extension\).
- `x/*/y/*`: Match every file in folder x -&gt; any folder -&gt; folder y.
- `**/prefix*.csv`: Match every csv file with a specific prefix.
- `**/prefix*.parquet`: Match every parquet file with a specific prefix.

Consider a specific example using this bucket layout:

```text
myBucket
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

You want part1.csv, part2.csv and part3.csv, while excluding another_part1.csv. You can match them in several ways:

- Match every csv file named "partX" with the single pattern `**/part*.csv`.
- Use the dual pattern `some_table_files/*.csv|more_table_files/*.csv` to match relevant files only from those exact folders.
- Use `*table_files/*.csv` to achieve the same result with one pattern. However, unexpected new folders could cause future problems.
- Use recursive wildcards. The pattern `extras/**/*.csv` matches any csv files nested below "extras", including "extras/misc/another_part1.csv".

Path patterns offer several ways to achieve the same goal. Choose a clear pattern that accommodates future additions to the directory structure.

### User schema

Provide a schema for greater control over the stream's output. Without one, the connector infers columns and datatypes from the first created matching file. The file must match your path pattern and suffix. This approach will suit most cases, but you may want to enforce a schema when:

- You only need a known subset of columns. Other columns remain included but are packed into the `_ab_additional_properties` map.
- Your initial dataset has few records, so automatic type inference may not represent future data.
- You want to define every column's type deliberately.
- You know which columns future data will add. You want them as core schema columns, not in the `_ab_additional_properties` map.

You may also have another reason. Provide the schema as valid JSON mapping `{"column": "datatype"}`, with each datatype set to one of:

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

### File format settings

#### CSV

CSV files are plain text, so correct parsing often requires specific reader options. Apply these settings consistently whenever you create or export a CSV.

- **Header Definition**: Defines the headers. `User Provided` assumes the CSV has no header row and uses the provided headers. `Autogenerated` also assumes there isn't a header row. The CDK generates headers using `f{i}`, where `i` is the index starting from 0. Otherwise, the default behaviour uses the CSV file's header. To generate or provide column names for a CSV with headers, set "Skip rows before header" to ignore the header row.
- **Delimiter**: CSV means Comma Separated Values, but the term also covers flat-file data that may use another separator. The delimiter field defines which character acts as the separator. To use [tab-delimiters](https://en.wikipedia.org/wiki/Tab-separated_values), set this value to `\t`. The default value is `,`.
- **Double Quote**: Determines whether two quotes within a quoted CSV value represent one quote in the data. The default is True.
- **Encoding**: Some data uses another character set, typically when it includes different alphabets. See the [list of allowable encodings here](https://docs.python.org/3/library/codecs.html#standard-encodings). The default is `utf8`.
- **Escape Character**: Prefix a reserved character with an escape character to support correct parsing. A common choice is the backslash (`\`). Consider this data:

```
Product,Description,Price
Jeans,"Navy Blue, Bootcut, 34\"",49.99
```

The backslash (`\`) directly precedes the second double quote (`"`), showing that it isn't the field's closing quote. Instead, it's a literal double quote included in the value. Here, it indicates the jeans' size in inches: `34"`.

Leave this field blank, the default option, to disallow escaping.

- **False Values**: A set of case-sensitive strings interpreted as false values.
- **Null Values**: A set of case-sensitive strings interpreted as null values. To interpret 'NA' as null, enter 'NA' in this field.
- **Quote Character**: Data values may contain reserved characters, such as a comma used as the delimiter. CSVs handle these characters by enclosing values in defined quote characters, supporting correct parsing. The default is `"`.
- **Skip Rows After Header**: The number of rows to skip after the header row.
- **Skip Rows Before Header**: The number of rows to skip before the header row.
- **Strings Can Be Null**: Controls whether strings can be interpreted as null values. If true, strings matching the null_values set become null. If false, strings matching the null_values set remain unchanged.
- **True Values**: A set of case-sensitive strings interpreted as true values.

#### Parquet

Apache Parquet is a column-oriented data storage format in the Apache Hadoop ecosystem. It offers efficient data compression and encoding for processing complex data in bulk. Partitioned parquet datasets aren't currently supported. The following setting is available:

- **Convert Decimal Fields to Floats**: Controls whether decimal fields are converted to floats. This conversion loses precision, so it isn't recommended.

#### Avro

The Avro parser uses the [Fastavro library](https://fastavro.readthedocs.io/en/latest/). The following setting is available:

- **Convert Double Fields to Strings**: Controls whether double fields are converted to strings. This is recommended for highly precise decimal numbers because floating-point handling can lose precision.

#### JSONL

JSONL parsing currently has no options.

<FieldAnchor field="streams.0.format[unstructured],streams.1.format[unstructured],streams.2.format[unstructured]">

#### Document File Type Format

The Document File Type Format extracts text from Markdown, TXT, PDF, Word and Powerpoint documents. When selected, the connector outputs extracted document text in one field named `content`. The `document_key` field stores a unique identifier for the processed file and can serve as a primary key. Document content includes markdown formatting converted from the original file format. Each file matching the glob pattern must be markdown (`md`), PDF (`pdf`), Word (`docx`) or Powerpoint (`.pptx`).

The connector emits one record for each document. Large files can produce records that exceed some destinations' different string-field limits.

#### Parse with the Unstructured.io Python Library

This connector uses the open source [Unstructured](https://unstructured-io.github.io/unstructured/introduction.html#product-offerings) library for OCR and text extraction from PDFs and MS Word files. It also extracts text from embedded tables and images. Read about the parsing logic in the [Unstructured docs](https://unstructured-io.github.io/unstructured/core/partition.html). Learn about other Unstructured tools and services at [www.unstructured.io](https://www.unstructured.io).

</FieldAnchor>

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Performance

Under normal use, the Azure Blob Storage connector shouldn't encounter any [Microsoft API limitations](https://learn.microsoft.com/en-us/azure/storage/blobs/scalability-targets#scale-targets-for-blob-storage).

### Raw file copy limits

When using the **Copy raw files** [delivery method](/platform/using-airbyte/delivery-methods):

- Maximum file size: 1.5 GB per file
- Requires Airbyte version 1.2.0 or later (1.7.0+ for metadata support)
- Only works with file-based destinations that support file transfer

## Changelog

<details>
  <summary>Expand to review</summary>

| Version    | Date       | Pull Request                                             | Subject                                                                                      |
|:-----------|:-----------|:---------------------------------------------------------|:---------------------------------------------------------------------------------------------|
| 0.8.42 | 2026-11-10 | [91353](https://github.com/airbytehq/airbyte/pull/91353) | Update dependencies |
| 0.8.41 | 2026-11-03 | [90485](https://github.com/airbytehq/airbyte/pull/90485) | Update dependencies |
| 0.8.40 | 2026-10-27 | [89808](https://github.com/airbytehq/airbyte/pull/89808) | Update dependencies |
| 0.8.39 | 2026-10-20 | [89104](https://github.com/airbytehq/airbyte/pull/89104) | Update dependencies |
| 0.8.38 | 2026-10-13 | [88506](https://github.com/airbytehq/airbyte/pull/88506) | Update dependencies |
| 0.8.37 | 2026-10-06 | [87764](https://github.com/airbytehq/airbyte/pull/87764) | Update dependencies |
| 0.8.36 | 2026-09-29 | [87067](https://github.com/airbytehq/airbyte/pull/87067) | Update dependencies |
| 0.8.35 | 2026-09-22 | [86513](https://github.com/airbytehq/airbyte/pull/86513) | Update dependencies |
| 0.8.34 | 2026-09-15 | [85952](https://github.com/airbytehq/airbyte/pull/85952) | Update dependencies |
| 0.8.33 | 2026-09-08 | [85398](https://github.com/airbytehq/airbyte/pull/85398) | Update dependencies |
| 0.8.32 | 2026-09-01 | [85241](https://github.com/airbytehq/airbyte/pull/85241) | Update dependencies |
| 0.8.31 | 2026-08-25 | [85007](https://github.com/airbytehq/airbyte/pull/85007) | Update dependencies |
| 0.8.30 | 2026-08-18 | [84471](https://github.com/airbytehq/airbyte/pull/84471) | Update dependencies |
| 0.8.29 | 2026-08-11 | [83826](https://github.com/airbytehq/airbyte/pull/83826) | Update dependencies |
| 0.8.28 | 2026-08-04 | [83347](https://github.com/airbytehq/airbyte/pull/83347) | Update dependencies |
| 0.8.27 | 2026-07-28 | [82801](https://github.com/airbytehq/airbyte/pull/82801) | Update dependencies |
| 0.8.26 | 2026-07-22 | [82241](https://github.com/airbytehq/airbyte/pull/82241) | Bump base image to python-connector-base 4.1.1 (Python 3.13.14) |
| 0.8.25 | 2026-07-21 | [82311](https://github.com/airbytehq/airbyte/pull/82311) | Update dependencies |
| 0.8.24 | 2026-07-14 | [81715](https://github.com/airbytehq/airbyte/pull/81715) | Update dependencies |
| 0.8.23 | 2026-07-07 | [81437](https://github.com/airbytehq/airbyte/pull/81437) | Update dependencies |
| 0.8.22 | 2026-06-30 | [80986](https://github.com/airbytehq/airbyte/pull/80986) | Update dependencies |
| 0.8.21 | 2026-06-23 | [80365](https://github.com/airbytehq/airbyte/pull/80365) | Update dependencies |
| 0.8.20 | 2026-06-16 | [79773](https://github.com/airbytehq/airbyte/pull/79773) | Update dependencies |
| 0.8.19 | 2026-06-09 | [79224](https://github.com/airbytehq/airbyte/pull/79224) | Update dependencies |
| 0.8.18 | 2026-06-02 | [78559](https://github.com/airbytehq/airbyte/pull/78559) | Update dependencies |
| 0.8.17 | 2026-04-28 | [77147](https://github.com/airbytehq/airbyte/pull/77147) | Update dependencies |
| 0.8.16 | 2026-04-21 | [75028](https://github.com/airbytehq/airbyte/pull/75028) | Update dependencies |
| 0.8.15 | 2026-03-10 | [74507](https://github.com/airbytehq/airbyte/pull/74507) | Update dependencies |
| 0.8.14 | 2026-03-03 | [74178](https://github.com/airbytehq/airbyte/pull/74178) | Update dependencies |
| 0.8.13 | 2026-02-17 | [73438](https://github.com/airbytehq/airbyte/pull/73438) | Update dependencies |
| 0.8.12 | 2026-01-27 | [72368](https://github.com/airbytehq/airbyte/pull/72368) | Update dependencies |
| 0.8.11 | 2026-01-20 | [71921](https://github.com/airbytehq/airbyte/pull/71921) | Update dependencies |
| 0.8.10 | 2026-01-14 | [71450](https://github.com/airbytehq/airbyte/pull/71450) | Update dependencies |
| 0.8.9 | 2026-01-07 | [71000](https://github.com/airbytehq/airbyte/pull/71000) | Enable 'Copy raw files' delivery method for file transfers |
| 0.8.8 | 2025-12-18 | [70804](https://github.com/airbytehq/airbyte/pull/70804) | Update dependencies |
| 0.8.7 | 2025-12-03 | [70316](https://github.com/airbytehq/airbyte/pull/70316) | Increase memory for check_connection to 4096Mi |
| 0.8.6 | 2025-12-02 | [70291](https://github.com/airbytehq/airbyte/pull/70291) | Update dependencies |
| 0.8.5 | 2025-11-25 | [69910](https://github.com/airbytehq/airbyte/pull/69910) | Update dependencies |
| 0.8.4 | 2025-11-18 | [69579](https://github.com/airbytehq/airbyte/pull/69579) | Update dependencies |
| 0.8.3 | 2025-11-11 | [69269](https://github.com/airbytehq/airbyte/pull/69269) | Update dependencies |
| 0.8.2 | 2025-11-04 | [69156](https://github.com/airbytehq/airbyte/pull/69156) | Update dependencies |
| 0.8.1 | 2025-10-29 | [68376](https://github.com/airbytehq/airbyte/pull/68376) | Update dependencies |
| 0.8.0 | 2025-10-27 | [68615](https://github.com/airbytehq/airbyte/pull/68615) | Update dependencies |
| 0.7.0 | 2025-10-27 | [68663](https://github.com/airbytehq/airbyte/pull/68663) | Promoting release candidate 0.7.0-rc.1 to a main version. |
| 0.7.0-rc.1 | 2025-10-21 | [68161](https://github.com/airbytehq/airbyte/pull/68161) | Update to airbyte-cdk ^v7 |
| 0.6.16 | 2025-10-14 | [68015](https://github.com/airbytehq/airbyte/pull/68015) | Update dependencies |
| 0.6.15 | 2025-10-07 | [67171](https://github.com/airbytehq/airbyte/pull/67171) | Update dependencies |
| 0.6.14 | 2025-09-30 | [66167](https://github.com/airbytehq/airbyte/pull/66167) | Update dependencies |
| 0.6.13 | 2025-08-23 | [65326](https://github.com/airbytehq/airbyte/pull/65326) | Update dependencies |
| 0.6.12 | 2025-07-26 | [63800](https://github.com/airbytehq/airbyte/pull/63800) | Update dependencies |
| 0.6.11 | 2025-07-19 | [63472](https://github.com/airbytehq/airbyte/pull/63472) | Update dependencies |
| 0.6.10 | 2025-07-12 | [63067](https://github.com/airbytehq/airbyte/pull/63067) | Update dependencies |
| 0.6.9 | 2025-07-05 | [62534](https://github.com/airbytehq/airbyte/pull/62534) | Update dependencies |
| 0.6.8 | 2025-05-27 | [60867](https://github.com/airbytehq/airbyte/pull/60867) | Update dependencies |
| 0.6.7 | 2025-05-24 | [60675](https://github.com/airbytehq/airbyte/pull/60675) | Update dependencies |
| 0.6.6 | 2025-05-10 | [59806](https://github.com/airbytehq/airbyte/pull/59806) | Update dependencies |
| 0.6.5 | 2025-05-03 | [59318](https://github.com/airbytehq/airbyte/pull/59318) | Update dependencies |
| 0.6.4 | 2025-04-26 | [58728](https://github.com/airbytehq/airbyte/pull/58728) | Update dependencies |
| 0.6.3 | 2025-04-19 | [58295](https://github.com/airbytehq/airbyte/pull/58295) | Update dependencies |
| 0.6.2 | 2025-04-12 | [57627](https://github.com/airbytehq/airbyte/pull/57627) | Update dependencies |
| 0.6.1 | 2025-04-05 | [43869](https://github.com/airbytehq/airbyte/pull/43869) | Update dependencies |
| 0.6.0 | 2025-03-31 | [56466](https://github.com/airbytehq/airbyte/pull/56466) | Upgrading dependencies and CDK and Python to 3.11 |
| 0.5.0 | 2025-01-02 | [50398](https://github.com/airbytehq/airbyte/pull/50398) | Add client_credentials auth for Azure Service Principals |
| 0.4.4 | 2024-06-06 | [39275](https://github.com/airbytehq/airbyte/pull/39275) | [autopull] Upgrade base image to v1.2.2 |
| 0.4.3 | 2024-05-29 | [38701](https://github.com/airbytehq/airbyte/pull/38701) | Avoid error on empty stream when running discover |
| 0.4.2 | 2024-04-23 | [37504](https://github.com/airbytehq/airbyte/pull/37504) | Update specification |
| 0.4.1 | 2024-04-22 | [37467](https://github.com/airbytehq/airbyte/pull/37467) | Fix start date filter |
| 0.4.0 | 2024-04-05 | [36825](https://github.com/airbytehq/airbyte/pull/36825) | Add oauth 2.0 support |
| 0.3.6 | 2024-04-03 | [36542](https://github.com/airbytehq/airbyte/pull/36542) | Use Latest CDK; add integration tests |
| 0.3.5 | 2024-03-26 | [36487](https://github.com/airbytehq/airbyte/pull/36487) | Manage dependencies with Poetry. |
| 0.3.4 | 2024-02-06 | [34936](https://github.com/airbytehq/airbyte/pull/34936) | Bump CDK version to avoid missing SyncMode errors |
| 0.3.3 | 2024-01-30 | [34681](https://github.com/airbytehq/airbyte/pull/34681) | Unpin CDK version to make compatible with the Concurrent CDK |
| 0.3.2 | 2024-01-30 | [34661](https://github.com/airbytehq/airbyte/pull/34661) | Pin CDK version until upgrade for compatibility with the Concurrent CDK |
| 0.3.1 | 2024-01-10 | [34084](https://github.com/airbytehq/airbyte/pull/34084) | Fix bug for running check with document file format |
| 0.3.0 | 2023-12-14 | [33411](https://github.com/airbytehq/airbyte/pull/33411) | Bump CDK version to auto-set primary key for document file streams and support raw txt files |
| 0.2.5 | 2023-12-06 | [33187](https://github.com/airbytehq/airbyte/pull/33187) | Bump CDK version to hide source-defined primary key |
| 0.2.4 | 2023-11-16 | [32608](https://github.com/airbytehq/airbyte/pull/32608) | Improve document file type parser |
| 0.2.3 | 2023-11-13 | [32357](https://github.com/airbytehq/airbyte/pull/32357) | Improve spec schema |
| 0.2.2 | 2023-10-30 | [31904](https://github.com/airbytehq/airbyte/pull/31904) | Update CDK to support document file types |
| 0.2.1 | 2023-10-18 | [31543](https://github.com/airbytehq/airbyte/pull/31543) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.2.0 | 2023-10-10 | [31336](https://github.com/airbytehq/airbyte/pull/31336) | Migrate to File-based CDK. Add support of CSV, Parquet and Avro files |
| 0.1.0 | 2023-02-17 | [23222](https://github.com/airbytehq/airbyte/pull/23222) | Initial release with full-refresh and incremental sync with JSONL files |

</details>
