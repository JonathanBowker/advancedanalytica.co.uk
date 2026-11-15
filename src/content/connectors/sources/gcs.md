---
generated_record: true
connector_name: Google Cloud Storage (GCS)
connector_type: source
connector_slug: gcs
connector_directory: source-gcs
definition_id: 2a8c41ae-8c23-4be0-a73f-2ab10ca1a820
version: 0.10.42
support_level: certified
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/gcs
logo: /images/connectors/sources/gcs.svg
logo_source_path: airbyte-integrations/connectors/source-gcs/icon.svg
logo_sha256: a3881052d8e6020c5922ff4df12a334e8f0df3a48f1ff6907087e808db88766c
original_metadata_path: airbyte-integrations/connectors/source-gcs/metadata.yaml
original_metadata_sha256: 6ef2b61092c72f96c9adee128eb83e9c51f8aecfe1580e788cd5c016d8e4d855
original_document_path: docs/integrations/sources/gcs.md
original_document_sha256: 573429e19e98f29294d1ba048fc0c2d075fe89b853d5cea60e2dea025fdc8971
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4b73c746c493af536646a6b9e8cb37b819589a3e4edde45a9119d21c236c68c7
rewritten_at: 2026-11-12T13:39:34.295291+00:00
---

# Google Cloud Storage (GCS)

<HideInUI>

Use this page to set up the [Google Cloud Storage (GCS)](https://cloud.google.com/storage/docs/apis) source connector and find reference information.

</HideInUI>

:::info
Cloud storage may incur egress costs. Egress is data transferred out of cloud storage. This includes downloading files or accessing them from another location. For more information, see the [Google Cloud Storage pricing guide](https://cloud.google.com/storage/pricing).
:::

## Prerequisites

- A Google account or service account JSON credentials with access to GCS. For more details, see [instructions](https://cloud.google.com/iam/docs/creating-managing-service-accounts).
- A GCS bucket
- The streams you want to sync

## Setup guide

## Set up Google Cloud Storage (GCS)

### Create a service account

First, select an existing project or create one in the Google Cloud Console:

1. Sign in to the Google Account.
2. Go to the [Service Accounts](https://console.developers.google.com/iam-admin/serviceaccounts) page.
3. Click `Create service account`.
4. Create a JSON key file for the service user. You'll provide this file's contents as the `service_account` in the UI.

### Grant GCS permission

Use the service account ID created above to grant read access to your target bucket. Click [here](https://cloud.google.com/storage/docs/access-control/using-iam-permissions) for more details.

### Set up the connector in Airbyte

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Google Cloud Storage (GCS) from the Source type dropdown.
4. Enter a name for the Google Cloud Storage (GCS) connector.
5. Select an authorisation type:
   1. Select **Authenticate via Google (OAuth)** from the Authentication dropdown. Click **Sign in with Google** and complete the authentication workflow.
   2. Select **Service Account Information** and paste the service account JSON key into the `Service Account Information` field.
6. Paste the service account JSON key into the `Service Account Information` field.
7. Enter your GCS bucket name in the `Bucket` field.
8. Add a stream:
   1. Give the stream a **Name**.
   2. In the **Format** box, select the file format you want to replicate from the dropdown menu. Toggle **Optional fields** within the **Format** box to enter more settings for your selected format. See the [File Format section](#file-format-settings) below for a detailed breakdown of these settings.
   3. Optionally, enter the **Globs** to control which files are synced. This regular expression lets Airbyte match the specific files to replicate. To replicate every file in your bucket, use `**` as the pattern. See the [Path Patterns section](#path-patterns) below for more precise pattern-matching options.
   4. Optionally, enter a **Input schema** to enforce a specific schema. The default value is `{}`, which automatically infers the schema from the file\(s\) you're replicating. See the [User Schema section](#user-schema) for details about providing a custom schema.
9. Configure the optional **Start Date** parameter to set a UTC start date and time for data replication. Files not modified since this date and time won't be replicated. Use the provided datepicker, which is recommended, or enter the date programmatically using the `YYYY-MM-DDTHH:mm:ssZ` format. Leave this field blank to replicate all files not excluded by the **Path Pattern** and **Path Prefix**.
10. Click **Set up source** and wait for the tests to complete.

#### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Google Cloud Storage (GCS) from the Source type dropdown.
4. Enter a name for the Google Cloud Storage (GCS) connector.
5. Select an authorisation type:
   1. Select **Authenticate via Google (OAuth)** from the Authentication dropdown. Click **Sign in with Google** and complete the authentication workflow.
   2. Select **Service Account Information** and paste the service account JSON key into the `Service Account Information` field.
6. Paste the service account JSON key into the `Service Account Information` field.
7. Enter your GCS bucket name in the `Bucket` field.
8. Add a stream:
   1. Give the stream a **Name**.
   2. In the **Format** box, select the file format you want to replicate from the dropdown menu. Toggle **Optional fields** within the **Format** box to enter more settings for your selected format. See the [File Format section](#file-format-settings) below for a detailed breakdown of these settings.
   3. Optionally, enter the **Globs** to control which files are synced. This regular expression lets Airbyte match the specific files to replicate. To replicate every file in your bucket, use `**` as the pattern. See the [Path Patterns section](#path-patterns) below for more precise pattern-matching options.
   4. Optionally, enter a **Input schema** to enforce a specific schema. The default value is `{}`, which automatically infers the schema from the file\(s\) you're replicating. See the [User Schema section](#user-schema) for details about providing a custom schema.
9. Configure the optional **Start Date** parameter to set a UTC start date and time for data replication. Files not modified since this date and time won't be replicated. Use the provided datepicker, which is recommended, or enter the date programmatically using the `YYYY-MM-DDTHH:mm:ssZ` format. Leave this field blank to replicate all files not excluded by the **Path Pattern** and **Path Prefix**.
10. Click **Set up source** and wait for the tests to complete.

#### File URLs

The Google Cloud Storage (GCS) source connector reads files through the authenticated GCS client. It uses `gs://{bucket}/{blob}` URIs for both authentication types. The `_ab_source_file_url` record field contains `https://storage.googleapis.com/{bucket}/{blob}` for `Service Account Information` authentication. It contains `gs://{bucket}/{blob}` for Google (OAuth) authentication.
File URLs are used in the connection state.
If you change the authorisation type during Incremental sync, the next sync won't use the old state. It will reread the provided files in Full Refresh mode, like the initial sync. Later syncs will run incrementally as expected.

#### Sanitise file URLs

Deprecated: this option has no effect. The connector no longer generates signed URLs for Service Account authentication. Therefore, `_ab_source_file_url` never contains credential-bearing query parameters such as `X-Goog-Credential` or `X-Goog-Signature`. The option remains in the connector specification so existing configurations continue to validate.

## Path patterns

\(In short: path pattern syntax uses [wcmatch.glob](https://facelessuser.github.io/wcmatch/glob/). GLOBSTAR and SPLIT flags are enabled.\)

Use glob-style patterns to sync multiple files without providing a specific path for each file. This lets you:

- Reference many files with one pattern. For example, `**` indicates every file in the folder.
- Reference future files that don't exist yet \(and therefore don't have a specific path\).

You must provide a path pattern. For complex directory layouts, you can provide multiple patterns separated by \|.

Each path pattern starts from the folder's _root_. Don't include the root folder name in the pattern\(s\).

Example patterns:

- `**`: matches everything.
- `**/*.csv`: matches all files with a specific extension.
- `myFolder/**/*.csv`: matches all CSV files anywhere under myFolder.
- `*/**`: matches everything at least one folder deep.
- `*/*/*/**`: matches everything at least three folders deep.
- `**/file.*|**/file`: matches every file named "file" with any extension \(or no extension\).
- `x/*/y/*`: matches all files in sub-folder x -&gt; any folder -&gt; folder y.
- `**/prefix*.csv`: matches all CSV files with a specific prefix.
- `**/prefix*.parquet`: matches all Parquet files with a specific prefix.

Consider this folder layout. `MyFolder` is the root folder specified in the connector configuration. All patterns are relative to it:

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

You want part1.csv, part2.csv and part3.csv, while excluding another_part1.csv. You can achieve this in several ways:

- Use the single pattern `**/part*.csv` to select every CSV file named "partX".
- For greater resilience, use the dual pattern `some_table_files/*.csv|more_table_files/*.csv` to select relevant files from only those exact folders.
- Use `*table_files/*.csv` to achieve the same result with one pattern. However, new and unexpected folders could cause future problems.
- You can also use recursive wildcards. The pattern `extras/**/*.csv` selects CSV files nested below "extras", including "extras/misc/another_part1.csv".

Path patterns offer several ways to achieve the same goal. Choose a clear pattern that can accommodate future additions to the directory structure.

## User schema

For Avro, Jsonl, CSV or Parquet formats, you can provide a schema for the output stream. **Note that this doesn't apply to the Document file type format.**

A schema gives you more control over the stream's output. Without one, the connector infers columns and datatypes from the first created matching file. The file must match your path pattern and suffix. Inference will suit most cases, but you may want to enforce a schema when:

- You only need a specific, known subset of columns. Other columns remain included but are packed into the `_ab_additional_properties` map.
- Your initial dataset contains few records, so automatic type inference may not represent future data.
- You want to define types for every column intentionally.
- You know which columns future data will add. You want them in the core schema, not the `_ab_additional_properties` map.

You can also provide a schema for any other reason. Provide valid JSON as a map of `{"column": "datatype"}`. Each datatype must be one of:

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

### Avro

- **Convert Double Fields to Strings**: Controls whether double fields are converted to strings. This is recommended for highly precise decimal numbers. Handling floating-point numbers can reduce their precision.

### CSV

CSV files are plain text, so you may need reader options to parse them correctly. Apply these settings consistently whenever you create or export a CSV.

- **Header Definition**: Defines how headers are handled. `User Provided` assumes the CSV has no header row and uses the provided headers. `Autogenerated` assumes the CSV has no header row. The CDK then generates headers using `f{i}`, where `i` is the zero-based index. Otherwise, the default behaviour uses the CSV file's header. To generate or provide column names for a CSV with headers, set the "Skip rows before header" value. This ignores the header row.
- **Delimiter**: CSV means Comma Separated Values. However, the term also covers flat-file data that may use another separator. Use the delimiter field to specify the separator character. To use [tab-delimiters](https://en.wikipedia.org/wiki/Tab-separated_values), set this value to `\t`. The default value is `,`.
- **Double Quote**: Controls whether two quotes inside a quoted CSV value represent one quote in the data. The default is True.
- **Encoding**: Some data uses a different character set, typically for different alphabets. See the [list of allowable encodings here](https://docs.python.org/3/library/codecs.html#standard-encodings). The default value is `utf8`.
- **Escape Character**: An escape character prefixes a reserved character to ensure correct parsing. A common choice is the backslash (`\`). For example, consider the following data:

```
Product,Description,Price
Jeans,"Navy Blue, Bootcut, 34\"",49.99
```

The backslash (`\`) appears directly before the second double quote (`"`). This shows that the quote doesn't close the field. Instead, it's a literal double quote included in the value. Here, it represents the jeans' size in inches: `34"`.

Leave this field blank, the default option, to prevent escaping.

- **False Values**: A set of case-sensitive strings interpreted as false values.
- **Null Values**: A set of case-sensitive strings interpreted as null values. To interpret 'NA' as null, enter 'NA' in this field.
- **Quote Character**: Some data values may contain reserved characters, such as a comma used as the delimiter. CSVs handle these characters by wrapping values in defined quote characters. The reader can then parse each value correctly. The default value is `"`.
- **Skip Rows After Header**: The number of rows skipped after the header row.
- **Skip Rows Before Header**: The number of rows skipped before the header row.
- **Strings Can Be Null**: Controls whether strings can be interpreted as null values. If true, strings matching the null_values set are interpreted as null. If false, they're interpreted as the original strings.
- **True Values**: A set of case-sensitive strings interpreted as true values.

### JSONL

- **Schemaless**: When enabled, syncs don't validate or structure records against the stream's schema.

### Parquet

- **Convert Double Fields to Strings**: Controls whether double fields are converted to strings. This is recommended for highly precise decimal numbers. Handling floating-point numbers can reduce their precision.

### Unstructured document format

- **Parsing Strategy**: Sets the document parsing strategy. `fast` extracts text directly from the document but doesn't work for every file. `ocr_only` is more reliable but slower. `hi_res` is the most reliable option. It requires an API key and a hosted instance of unstructured, and it can't run in local mode. See the [unstructured.io](https://unstructured-io.github.io/unstructured/core/partition.html#partition-pdf) documentation for more details.
- **Processing**: Sets the processing configuration. Options:
  - Local: processes files locally and supports `fast` and `ocr` modes. This is the default option.
  - Via API: processes files through an API using `hi_res` mode. This option can improve performance and accuracy. It requires an API key and a hosted instance of unstructured.
- **Skip Unprocessable Files**: If true, skips files that can't be parsed. It passes the error message through the _ab_source_file_parse_error field. If false, the sync fails.
- **Schemaless**: When enabled, syncs don't validate or structure records against the stream's schema.

### Excel

- **Schemaless**: When enabled, syncs don't validate or structure records against the stream's schema.

## Supported sync modes

The Google Cloud Storage (GCS) source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):


| Feature           | Supported?\(Yes/No\) | Notes |
|:------------------|:---------------------|:------|
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | Yes                  |       |

## Supported streams

Google Cloud Storage (GCS) supports these file formats:
 - avro
 - jsonl
 - csv
 - parquet
 - unstructured document format
 - excel

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :----------- | :----------- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.10.42 | 2026-11-10 | [91503](https://github.com/airbytehq/airbyte/pull/91503) | Update dependencies |
| 0.10.41 | 2026-11-03 | [90891](https://github.com/airbytehq/airbyte/pull/90891) | Require Python 3.11 or newer for local connector development. |
| 0.10.40 | 2026-11-03 | [90561](https://github.com/airbytehq/airbyte/pull/90561) | Update dependencies |
| 0.10.39 | 2026-10-27 | [89875](https://github.com/airbytehq/airbyte/pull/89875) | Update dependencies |
| 0.10.38 | 2026-10-20 | [89230](https://github.com/airbytehq/airbyte/pull/89230) | Update dependencies |
| 0.10.37 | 2026-10-13 | [88608](https://github.com/airbytehq/airbyte/pull/88608) | Update dependencies |
| 0.10.36 | 2026-10-06 | [87837](https://github.com/airbytehq/airbyte/pull/87837) | Update dependencies |
| 0.10.35 | 2026-09-29 | [87145](https://github.com/airbytehq/airbyte/pull/87145) | Update dependencies |
| 0.10.34 | 2026-09-22 | [86631](https://github.com/airbytehq/airbyte/pull/86631) | Update dependencies |
| 0.10.33 | 2026-09-15 | [86057](https://github.com/airbytehq/airbyte/pull/86057) | Update dependencies |
| 0.10.32 | 2026-09-11 | [84891](https://github.com/airbytehq/airbyte/pull/84891) | Fix spurious Parquet columns from signed URL query parameters (Service Account auth); `_ab_source_file_url` now contains the clean canonical HTTPS path instead of a signed URL; Service Account syncs now read `Content-Encoding: gzip` objects through the gs:// client instead of failing on the signed URL; `sanitize_signed_urls` option is deprecated (no-op) |
| 0.10.31 | 2026-09-08 | [85491](https://github.com/airbytehq/airbyte/pull/85491) | Update dependencies |
| 0.10.30 | 2026-09-01 | [85245](https://github.com/airbytehq/airbyte/pull/85245) | Update dependencies |
| 0.10.29 | 2026-08-25 | [85012](https://github.com/airbytehq/airbyte/pull/85012) | Update dependencies |
| 0.10.28 | 2026-08-18 | [84572](https://github.com/airbytehq/airbyte/pull/84572) | Update dependencies |
| 0.10.27 | 2026-08-11 | [83924](https://github.com/airbytehq/airbyte/pull/83924) | Update dependencies |
| 0.10.26 | 2026-08-04 | [83471](https://github.com/airbytehq/airbyte/pull/83471) | Update dependencies |
| 0.10.25 | 2026-07-28 | [82925](https://github.com/airbytehq/airbyte/pull/82925) | Update dependencies |
| 0.10.24 | 2026-07-22 | [82238](https://github.com/airbytehq/airbyte/pull/82238) | Bump base image to python-connector-base 4.1.1 (Python 3.13.14) |
| 0.10.23 | 2026-07-21 | [82394](https://github.com/airbytehq/airbyte/pull/82394) | Update dependencies |
| 0.10.22 | 2026-07-14 | [81818](https://github.com/airbytehq/airbyte/pull/81818) | Update dependencies |
| 0.10.21 | 2026-07-07 | [81441](https://github.com/airbytehq/airbyte/pull/81441) | Update dependencies |
| 0.10.20 | 2026-06-30 | [81081](https://github.com/airbytehq/airbyte/pull/81081) | Update dependencies |
| 0.10.19 | 2026-06-22 | [74242](https://github.com/airbytehq/airbyte/pull/74242) | Handle GCS objects with `Content-Encoding: gzip` that fail on ranged/chunked downloads through OAuth/Client auth |
| 0.10.18 | 2026-06-23 | [80443](https://github.com/airbytehq/airbyte/pull/80443) | Update dependencies |
| 0.10.17 | 2026-06-16 | [79871](https://github.com/airbytehq/airbyte/pull/79871) | Update dependencies |
| 0.10.16 | 2026-06-09 | [79336](https://github.com/airbytehq/airbyte/pull/79336) | Update dependencies |
| 0.10.15 | 2026-06-02 | [78684](https://github.com/airbytehq/airbyte/pull/78684) | Update dependencies |
| 0.10.14 | 2026-04-27 | [77033](https://github.com/airbytehq/airbyte/pull/77033) | Add `sanitize_signed_urls` option to strip Service Account credentials from `_ab_source_file_url` signed URL query parameters |
| 0.10.13 | 2026-04-28 | [77257](https://github.com/airbytehq/airbyte/pull/77257) | Update dependencies |
| 0.10.12 | 2026-04-21 | [76591](https://github.com/airbytehq/airbyte/pull/76591) | Update dependencies |
| 0.10.11 | 2026-03-31 | [75690](https://github.com/airbytehq/airbyte/pull/75690) | Update dependencies |
| 0.10.10 | 2026-03-24 | [75390](https://github.com/airbytehq/airbyte/pull/75390) | Update dependencies |
| 0.10.9 | 2026-03-19 | [74779](https://github.com/airbytehq/airbyte/pull/74779) | Fix ZIP file detection for files with compound extensions (e.g. `.csv.zip`) |
| 0.10.8 | 2026-03-18 | [74781](https://github.com/airbytehq/airbyte/pull/74781) | Fix records quadratic duplication |
| 0.10.7 | 2026-03-03 | [70287](https://github.com/airbytehq/airbyte/pull/70287) | Update dependencies |
| 0.10.6 | 2026-02-13 | [73332](https://github.com/airbytehq/airbyte/pull/73332) | Fix zip file extraction failing with `DeliverRawFiles has no attribute delivery_type` error |
| 0.10.5 | 2025-11-25 | [69913](https://github.com/airbytehq/airbyte/pull/69913) | Update dependencies |
| 0.10.4 | 2025-11-18 | [69426](https://github.com/airbytehq/airbyte/pull/69426) | Update dependencies |
| 0.10.3 | 2025-11-11 | [69270](https://github.com/airbytehq/airbyte/pull/69270) | Update dependencies |
| 0.10.2 | 2025-11-04 | [69159](https://github.com/airbytehq/airbyte/pull/69159) | Update dependencies |
| 0.10.1 | 2025-10-29 | [69054](https://github.com/airbytehq/airbyte/pull/69054) | Update dependencies |
| 0.10.0 | 2025-10-27 | [68619](https://github.com/airbytehq/airbyte/pull/68619) | Update dependencies |
| 0.9.2 | 2025-10-21 | [68330](https://github.com/airbytehq/airbyte/pull/68330) | Update dependencies |
| 0.9.1 | 2025-10-14 | [68032](https://github.com/airbytehq/airbyte/pull/68032) | Update dependencies |
| 0.9.0 | 2025-10-07 | [67340](https://github.com/airbytehq/airbyte/pull/67340) | Promoting release candidate 0.9.0-rc.1 to a main version. |
| 0.9.0-rc.1 | 2025-10-06 | [66671](https://github.com/airbytehq/airbyte/pull/66671) | Update to latest airbyte cdk |
| 0.8.31 | 2025-09-30 | [66303](https://github.com/airbytehq/airbyte/pull/66303) | Update dependencies |
| 0.8.30 | 2025-09-09 | [66088](https://github.com/airbytehq/airbyte/pull/66088) | Update dependencies |
| 0.8.29 | 2025-08-23 | [65389](https://github.com/airbytehq/airbyte/pull/65389) | Update dependencies |
| 0.8.28 | 2025-08-16 | [64980](https://github.com/airbytehq/airbyte/pull/64980) | Update dependencies |
| 0.8.27 | 2025-08-09 | [64627](https://github.com/airbytehq/airbyte/pull/64627) | Update dependencies |
| 0.8.26 | 2025-08-02 | [64367](https://github.com/airbytehq/airbyte/pull/64367) | Update dependencies |
| 0.8.25 | 2025-07-26 | [63951](https://github.com/airbytehq/airbyte/pull/63951) | Update dependencies |
| 0.8.24 | 2025-07-19 | [63564](https://github.com/airbytehq/airbyte/pull/63564) | Update dependencies |
| 0.8.23 | 2025-07-12 | [62985](https://github.com/airbytehq/airbyte/pull/62985) | Update dependencies |
| 0.8.22 | 2025-07-05 | [62822](https://github.com/airbytehq/airbyte/pull/62822) | Update dependencies |
| 0.8.21 | 2025-06-28 | [61274](https://github.com/airbytehq/airbyte/pull/61274) | Update dependencies |
| 0.8.20 | 2025-05-27 | [60868](https://github.com/airbytehq/airbyte/pull/60868) | Update dependencies |
| 0.8.19 | 2025-05-24 | [60392](https://github.com/airbytehq/airbyte/pull/60392) | Update dependencies |
| 0.8.18 | 2025-05-10 | [60012](https://github.com/airbytehq/airbyte/pull/60012) | Update dependencies |
| 0.8.17 | 2025-05-03 | [59443](https://github.com/airbytehq/airbyte/pull/59443) | Update dependencies |
| 0.8.16 | 2025-04-26 | [58915](https://github.com/airbytehq/airbyte/pull/58915) | Update dependencies |
| 0.8.15 | 2025-04-19 | [58312](https://github.com/airbytehq/airbyte/pull/58312) | Update dependencies |
| 0.8.14 | 2025-04-12 | [57772](https://github.com/airbytehq/airbyte/pull/57772) | Update dependencies |
| 0.8.13 | 2025-04-05 | [57213](https://github.com/airbytehq/airbyte/pull/57213) | Update dependencies |
| 0.8.12 | 2025-03-29 | [56520](https://github.com/airbytehq/airbyte/pull/56520) | Update dependencies |
| 0.8.11 | 2025-03-22 | [55956](https://github.com/airbytehq/airbyte/pull/55956) | Update dependencies |
| 0.8.10 | 2025-03-08 | [55314](https://github.com/airbytehq/airbyte/pull/55314) | Update dependencies |
| 0.8.9 | 2025-03-01 | [54973](https://github.com/airbytehq/airbyte/pull/54973) | Update dependencies |
| 0.8.8 | 2025-02-25 | [54677](https://github.com/airbytehq/airbyte/pull/54677) | Fix io.UnsupportedOperation: underlying stream is not seekable |
| 0.8.7 | 2025-02-22 | [54458](https://github.com/airbytehq/airbyte/pull/54458) | Update dependencies |
| 0.8.6 | 2025-02-15 | [53712](https://github.com/airbytehq/airbyte/pull/53712) | Update dependencies |
| 0.8.5 | 2025-02-08 | [53365](https://github.com/airbytehq/airbyte/pull/53365) | Update dependencies |
| 0.8.4 | 2025-02-01 | [52379](https://github.com/airbytehq/airbyte/pull/52379) | Update dependencies |
| 0.8.3 | 2025-01-18 | [49174](https://github.com/airbytehq/airbyte/pull/49174) | Update dependencies |
| 0.8.2 | 2024-11-25 | [48647](https://github.com/airbytehq/airbyte/pull/48647) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.8.1 | 2024-10-28 | [45923](https://github.com/airbytehq/airbyte/pull/45923) | Update logging |
| 0.8.0 | 2024-10-28 | [45414](https://github.com/airbytehq/airbyte/pull/45414) | Add support for OAuth authentication |
| 0.7.4 | 2024-10-12 | [46858](https://github.com/airbytehq/airbyte/pull/46858) | Update dependencies |
| 0.7.3 | 2024-10-05 | [46458](https://github.com/airbytehq/airbyte/pull/46458) | Update dependencies |
| 0.7.2 | 2024-09-28 | [46178](https://github.com/airbytehq/airbyte/pull/46178) | Update dependencies |
| 0.7.1 | 2024-09-24 | [45850](https://github.com/airbytehq/airbyte/pull/45850) | Add integration tests |
| 0.7.0 | 2024-09-24 | [45671](https://github.com/airbytehq/airbyte/pull/45671) | Add .zip files support |
| 0.6.9 | 2024-09-21 | [45798](https://github.com/airbytehq/airbyte/pull/45798) | Update dependencies |
| 0.6.8 | 2024-09-19 | [45092](https://github.com/airbytehq/airbyte/pull/45092) | Update CDK v5; Fix OSError not raised in stream_reader.open_file |
| 0.6.7 | 2024-09-14 | [45492](https://github.com/airbytehq/airbyte/pull/45492) | Update dependencies |
| 0.6.6 | 2024-09-07 | [45232](https://github.com/airbytehq/airbyte/pull/45232) | Update dependencies |
| 0.6.5 | 2024-08-31 | [45010](https://github.com/airbytehq/airbyte/pull/45010) | Update dependencies |
| 0.6.4 | 2024-08-27 | [44796](https://github.com/airbytehq/airbyte/pull/44796) | Fix empty list of globs when prefix empty |
| 0.6.3 | 2024-08-26 | [44781](https://github.com/airbytehq/airbyte/pull/44781) | Set file signature URL expiration limit default to max |
| 0.6.2 | 2024-08-24 | [44733](https://github.com/airbytehq/airbyte/pull/44733) | Update dependencies |
| 0.6.1 | 2024-08-17 | [44285](https://github.com/airbytehq/airbyte/pull/44285) | Update dependencies |
| 0.6.0 | 2024-08-15 | [44015](https://github.com/airbytehq/airbyte/pull/44015) | Add support for all FileBasedSpec file types |
| 0.5.0 | 2024-08-14 | [44070](https://github.com/airbytehq/airbyte/pull/44070) | Update CDK v4 and Python 3.10 dependencies |
| 0.4.15 | 2024-08-12 | [43733](https://github.com/airbytehq/airbyte/pull/43733) | Update dependencies |
| 0.4.14 | 2024-08-10 | [43512](https://github.com/airbytehq/airbyte/pull/43512) | Update dependencies |
| 0.4.13 | 2024-08-03 | [43236](https://github.com/airbytehq/airbyte/pull/43236) | Update dependencies |
| 0.4.12 | 2024-07-27 | [42693](https://github.com/airbytehq/airbyte/pull/42693) | Update dependencies |
| 0.4.11 | 2024-07-20 | [42312](https://github.com/airbytehq/airbyte/pull/42312) | Update dependencies |
| 0.4.10 | 2024-07-13 | [41865](https://github.com/airbytehq/airbyte/pull/41865) | Update dependencies |
| 0.4.9 | 2024-07-10 | [41430](https://github.com/airbytehq/airbyte/pull/41430) | Update dependencies |
| 0.4.8 | 2024-07-09 | [41148](https://github.com/airbytehq/airbyte/pull/41148) | Update dependencies |
| 0.4.7 | 2024-07-06 | [41015](https://github.com/airbytehq/airbyte/pull/41015) | Update dependencies |
| 0.4.6 | 2024-06-26 | [40540](https://github.com/airbytehq/airbyte/pull/40540) | Update dependencies |
| 0.4.5 | 2024-06-25 | [40391](https://github.com/airbytehq/airbyte/pull/40391) | Update dependencies |
| 0.4.4 | 2024-06-24 | [40234](https://github.com/airbytehq/airbyte/pull/40234) | Update dependencies |
| 0.4.3 | 2024-06-22 | [40089](https://github.com/airbytehq/airbyte/pull/40089) | Update dependencies |
| 0.4.2 | 2024-06-06 | [39255](https://github.com/airbytehq/airbyte/pull/39255) | [autopull] Upgrade base image to v1.2.2 |
| 0.4.1 | 2024-05-29 | [38696](https://github.com/airbytehq/airbyte/pull/38696) | Avoid error on empty stream when running discover |
| 0.4.0 | 2024-03-21 | [36373](https://github.com/airbytehq/airbyte/pull/36373) | Add Gzip and Bzip compression support. Manage dependencies with Poetry. |
| 0.3.7 | 2024-02-06 | [34936](https://github.com/airbytehq/airbyte/pull/34936) | Bump CDK version to avoid missing SyncMode errors |
| 0.3.6 | 2024-01-30 | [34681](https://github.com/airbytehq/airbyte/pull/34681) | Unpin CDK version to make compatible with the Concurrent CDK |
| 0.3.5 | 2024-01-30 | [34661](https://github.com/airbytehq/airbyte/pull/34661) | Pin CDK version until upgrade for compatibility with the Concurrent CDK |
| 0.3.4 | 2024-01-11 | [34158](https://github.com/airbytehq/airbyte/pull/34158) | Fix issue in stream reader for document file type parser |
| 0.3.3 | 2023-12-06 | [33187](https://github.com/airbytehq/airbyte/pull/33187) | Bump CDK version to hide source-defined primary key |
| 0.3.2 | 2023-11-16 | [32608](https://github.com/airbytehq/airbyte/pull/32608) | Improve document file type parser |
| 0.3.1 | 2023-11-13 | [32357](https://github.com/airbytehq/airbyte/pull/32357) | Improve spec schema |
| 0.3.0 | 2023-10-11 | [31212](https://github.com/airbytehq/airbyte/pull/31212) | Migrated to file based CDK |
| 0.2.0 | 2023-06-26 | [27725](https://github.com/airbytehq/airbyte/pull/27725) | License Update: Elv2 |
| 0.1.0 | 2023-02-16 | [23186](https://github.com/airbytehq/airbyte/pull/23186) | New Source: GCS |

</details>
