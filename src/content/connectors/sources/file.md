---
generated_record: true
connector_name: File (CSV, JSON, Excel, Feather, Parquet)
connector_type: source
connector_slug: file
connector_directory: source-file
definition_id: 778daa7c-feaf-4db6-96f3-70fd645acc77
version: 0.6.1
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/file
logo: /images/connectors/sources/file.svg
logo_source_path: airbyte-integrations/connectors/source-file/icon.svg
logo_sha256: d714147c764adddab72fefb5df9c1156b7d2305742ce868fd0636b2ad1f7e9b9
original_metadata_path: airbyte-integrations/connectors/source-file/metadata.yaml
original_metadata_sha256: 523474110e7607b219db150dc4ab4de56600fab0d1a38cecf73c6b35b2777c54
original_document_path: docs/integrations/sources/file.md
original_document_sha256: 79e6a7da8f73aec83e76eb14bb4a325b07b798c4a188017ce6c6c04757a3f575
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5c66e5d4e37747450660f423aab9c97c9227c3229c5fe2195b72786ffb8d0359
rewritten_at: 2026-11-12T14:06:48.607715+00:00
---

# File (CSV, JSON, Excel, Feather, Parquet)

<HideInUI>

Use this page to set up the [File (CSV, JSON, Excel, Feather, Parquet)](https://docs.airbyte.com/integrations/sources/file#storage-providers) source connector and find reference information.

</HideInUI>

## Prerequisites

- A file hosted on AWS S3, GCS, HTTPS, or an SFTP server
- Dataset Name
- File Format
- URL
- Storage Provider

## Setup guide

<!-- env:cloud -->

### Set up File (CSV, JSON, Excel, Feather, Parquet)

:::note
**For Airbyte Cloud users:** You can't use locally stored files as a source in Airbyte Cloud.
:::

<!-- /env:cloud -->

### Set up the connector in Airbyte

<!-- env:cloud -->

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select File (CSV, JSON, Excel, Feather, Parquet) from the Source type dropdown.
4. Enter a name for the File (CSV, JSON, Excel, Feather, Parquet) connector.
<FieldAnchor field="dataset_name">
5. For **Dataset Name**, enter the final table's _name_. This table will contain the replicated file. Use only letters, numbers, dashes and underscores.
</FieldAnchor>
<FieldAnchor field="format">
6. For **File Format**, select the file's _format_ from the dropdown menu. Some formats may be experimental. See [the table of supported formats](#file-formats).
</FieldAnchor>

<!-- /env:cloud -->

<!-- env:oss -->

### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select File (CSV, JSON, Excel, Feather, Parquet) from the Source type dropdown.
4. Enter a name for the File (CSV, JSON, Excel, Feather, Parquet) connector.
<FieldAnchor field="dataset_name">
5. For **Dataset Name**, enter the final table's _name_. This table will contain the replicated file. Use only letters, numbers, dashes and underscores.
</FieldAnchor>
<FieldAnchor field="format">
6. For **File Format**, select the file's _format_ from the dropdown menu. Some formats may be experimental. See [the table of supported formats](#file-formats).
</FieldAnchor>

<!-- /env:oss -->

### Step 2: Select and configure the provider

1. For **Storage Provider**, select the file's _Storage Provider_ or _Location_ from the dropdown menu. Then configure the required provider-specific fields:

<FieldAnchor field="provider[HTTPS]">
#### HTTPS: Public Web [Default]

- `User-Agent` (Optional)

Activate this option to add the [User-Agent header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) to requests. It's inactive by default.

</FieldAnchor>
<FieldAnchor field="provider[GCS]">
#### GCS: Google Cloud Storage

- `Service Account JSON` (Required for **private** buckets)

To access **private** buckets on Google Cloud, provide a service account JSON credentials file with the appropriate permissions. See [Google Cloud service accounts page](https://cloud.google.com/iam/docs/service-accounts) for a detailed explanation. Generate the "credentials.json" file and copy its JSON content into this field. **If you are accessing publicly available data**, this field isn't required.
</FieldAnchor>
<FieldAnchor field="provider[S3]">

#### S3: Amazon Web Services

- `AWS Access Key ID` (Required for **private** buckets)
- `AWS Secret Access Key` (Required for **private** buckets)

To access **private** buckets on AWS S3, provide valid credentials with the necessary permissions. To access these keys, see [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
For more information about setting permissions in AWS, see [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html). **If you are accessing publicly available data**, these fields aren't required.
</FieldAnchor>
<FieldAnchor field="provider[AzBlob]">

#### AzBlob: Azure Blob Storage

- `Storage Account` (Required)

Enter the globally unique storage account name containing the required blob. See [Azure documentation](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) for more details.

**If you are accessing private storage**, you must also provide _one_ of these security credentials with the necessary permissions:

- `SAS Token`: [Find more information here](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview).
- `Shared Key`: [Find more information here](https://learn.microsoft.com/en-us/rest/api/storageservices/authorize-with-shared-key).
</FieldAnchor>
<FieldAnchor field="provider[SSH],provider[SCP],provider[SFTP]">

#### SSH: Secure Shell / SCP: Secure Copy Protocol / SFTP: Secure File Transfer Protocol

- `Host` (Required)

Enter the remote server's _hostname_ or _IP address_ where the file transfer will take place.

- `User` (Required)

Enter the _username_ associated with your remote server account.

- `Password` (Optional)

**If required by the remote server**, enter the _password_ associated with your user account. Otherwise, leave this field blank.

- `Port` (Optional)

Enter the connection's _port number_. The default port is usually 22. If your remote server uses a non-standard port, enter that port number here.
</FieldAnchor>
<!-- env:oss -->
<FieldAnchor field="provider[local]">
#### Local Filesystem (Airbyte Open Source only)

- `Storage`

:::caution
The local storage URL for reading must currently start with the local mount "/local/".
:::

To replicate data from a locally stored file on Windows OS, open the `.env` file in your local Airbyte root folder. Change these values:

- `LOCAL_ROOT`
- `LOCAL_DOCKER_MOUNT`
- `HACK_LOCAL_ROOT_PARENT`

Set these values to an existing absolute path on your machine. Replace path colons with a double forward slash, `//`. Set `LOCAL_ROOT` and `LOCAL_DOCKER_MOUNT` to the same value. Set `HACK_LOCAL_ROOT_PARENT` to their parent directory.
</FieldAnchor>
<!-- /env:oss -->
<FieldAnchor field="url">

### Step 3: Complete the setup

1. For **URL**, enter the file's _URL path_.

:::note
When connecting to a file in **Google Drive**, use the Download URL format: `example: https://drive.google.com/uc?export=download&id=[DRIVE_FILE_ID]`. Replace `[DRIVE_FILE_ID]` with the unique string from the Google Drive Share URL. To find the Share URL, visit `example: https://drive.google.com/file/d/[DRIVE_FILE_ID]/view?usp=sharing`.

When connecting to a file using **Azure Blob Storage**, the connection accounts for the base URL. You only need to include the path to your specific file, such as `container/file.csv`.
:::

</FieldAnchor>
<FieldAnchor field="reader_options">
2. For **Reader Options** (Optional), you can enter a _string_ in JSON format. It provides additional options and adjusts the Reader's behaviour based on your source file format. See [next section](#reader-options) for the available inputs. Leave this field blank if you don't need custom Reader options.
3. Click **Set up source** and wait for the tests to complete.

### Reader options

The Reader that loads the file format currently uses [Pandas IO Tools](https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html). You can customise how this Source Connector loads the file into a Pandas DataFrame. Configure `reader_options` in JSON format based on your chosen file format. See the relevant pandas documentation:

For example, selecting the `CSV` format makes options from the [read_csv](https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html#io-read-csv-table) functions available.

- For tab-separated files, you can customise `delimiter` or `sep`.
- Ignore the header line with `header=0`, or customise it with `names`.
- If a file has no header, set `header=null`. Otherwise, the first record will be missing.
- Parse dates in specified columns.
- etc

Enter the following JSON in `reader_options`:

```
{ "sep" : "\t", "header" : null, "names": ["column1", "column2"], "parse_dates": ["column2"]}
```

If you select the `JSON` format, options from the [read_json](https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html#io-json-reader) reader become available.

For example, use `{"orient" : "records"}` to change how the data orientation loads when data is `[{column -> value}, … , {column -> value}]`.

To read an Excel Binary Workbook, select the `excel_binary` format in `File Format`.

:::caution
This connector doesn't support syncing unstructured data files, such as raw text, audio or videos.
:::

</FieldAnchor>

<HideInUI>

## Supported sync modes

The File (CSV, JSON, Excel, Feather, Parquet) source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

| Feature                                  | Supported? |
| ---------------------------------------- | ---------- |
| Full Refresh Sync                        | Yes        |
| Incremental Sync                         | No         |
| Replicate Incremental Deletes            | No         |
| Replicate Folders (multiple Files)       | No         |
| Replicate Glob Patterns (multiple Files) | No         |

:::note
This source produces one table for the target file because it currently replicates one file at a time. Provide the `dataset_name` to define how the destination identifies the table. This is necessary because `URL` can contain complex characters.
:::

## Supported streams

### File and stream compression

| Compression | Supported? |
| ----------- | ---------- |
| Gzip        | Yes        |
| Zip         | Yes        |
| Bzip2       | No         |
| Lzma        | No         |
| Xz          | No         |
| Snappy      | No         |

## Storage providers

| Storage Providers      | Supported?                                      |
| ---------------------- | ----------------------------------------------- |
| HTTPS                  | Yes                                             |
| Google Cloud Storage   | Yes                                             |
| Amazon Web Services S3 | Yes                                             |
| SFTP                   | Yes                                             |
| SSH / SCP              | Yes                                             |
| local filesystem       | Local use only (inaccessible for Airbyte Cloud) |

### File formats

| Format                | Supported? |
| --------------------- | ---------- |
| CSV                   | Yes        |
| JSON/JSONL            | Yes        |
| HTML                  | No         |
| XML                   | No         |
| Excel                 | Yes        |
| Excel Binary Workbook | Yes        |
| Fixed Width File      | Yes        |
| Feather               | Yes        |
| Parquet               | Yes        |
| Pickle                | No         |
| YAML                  | Yes        |


### Change source column data types

Airbyte usually infers each data type from the source. Use `reader_options` to set specific data types. Enter `{"dtype":"string"}` to parse every column as a string. To parse only one column as a string, use `{"dtype" : {"column name": "string"}}`.

### Examples

Here are examples of possible file inputs:

| Dataset Name      | Storage | URL                                                                                                                                                          | Reader Impl        | Service Account                                                  | Description                                                                                                                                                                                                           |
| ----------------- | ------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------| ------------------ | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| epidemiology      | HTTPS   | [ https://storage.googleapis.com/covid19-open-data/v2/latest/epidemiology.csv ](https://storage.googleapis.com/covid19-open-data/v2/latest/epidemiology.csv) |                    |                                                                  | [COVID-19 Public dataset](https://console.cloud.google.com/marketplace/product/bigquery-public-datasets/covid19-public-data-program?filter=solution-type:dataset&id=7d6cc408-53c8-4485-a187-b8cb9a5c0b56) on BigQuery |
| hr_and_financials | GCS     | gs://airbyte-vault/financial.csv                                                                                                                             | smart_open or gcfs | `{"type": "service_account", "private_key_id": "XXXXXXXX", ...}` | data from a private bucket, a service account is necessary                                                                                                                                                            |
| landsat_index     | GCS     | gcp-public-data-landsat/index.csv.gz                                                                                                                         | smart_open         |                                                                  | Using smart_open, we don't need to specify the compression (note the gs:// is optional too, same for other providers)                                                                                                 |

Examples with reader options:

| Dataset Name  | Storage | URL                                             | Reader Impl | Reader Options                  | Description                                                                                                                                      |
| ------------- | ------- | ----------------------------------------------- | ----------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| landsat_index | GCS     | gs://gcp-public-data-landsat/index.csv.gz       | GCFS        | `{"compression": "gzip"}`       | Additional reader options to specify a compression option to `read_csv`                                                                          |
| GDELT         | S3      | s3://gdelt-open-data/events/20190914.export.csv |             | `{"sep": "\t", "header": null}` | Here is TSV data separated by tabs without header row from [AWS Open Data](https://registry.opendata.aws/gdelt/)                                 |
| server_logs   | local   | /local/logs.log                                 |             | `{"sep": ";"}`                  | After making sure a local text file exists at `/tmp/airbyte_local/logs.log` with logs file from some server that are delimited by ';' delimiters |

SFTP example:

| Dataset Name | Storage | User | Password | Host            | URL                     | Reader Options                                                            | Description                                                                                                                       |
| ------------ | ------- | ---- | -------- | --------------- | ----------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Test Rebext  | SFTP    | demo | password | test.rebext.net | /pub/example/readme.txt | `{"sep": "\r\n", "header": null, "names": \["text"], "engine": "python"}` | We use `python` engine for `read_csv` in order to handle delimiter of more than 1 character while providing our own column names. |

See or add more usage examples at `airbyte-integrations/connectors/source-file/integration_tests/integration_source_test.py`.

## Performance notes

This connector uses the [smart_open](https://pypi.org/project/smart-open/) library to read large files from remote locations. You can switch to [GCSFS](https://gcsfs.readthedocs.io/en/latest/) or [S3FS](https://s3fs.readthedocs.io/en/latest/) implementations, which the `pandas` library supports natively. Use the optional `reader_impl` parameter to make this selection.

- For a local filesystem, you may need to store the file in the `/tmp/airbyte_local` folder. It has the same limitations as [CSV Destination](../destinations/csv), so `URL` should also start with `/local/`.
- Ensure Docker Desktop can access `/tmp`. On MacOS, it must also access `/private` because /tmp links to /private. Otherwise, it won't work. Allow access through "File sharing" in `Settings -> Resources -> File sharing -> add the one or two above folder`, then click the "Apply & restart" button.
- The JSON implementation needs further changes to produce a more complex catalog and remains experimental. Simple JSON schemas should work, but multiple nesting layers may not be handled well.

</HideInUI>

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version    | Date       | Pull Request                                             | Subject                                                                                                                                                                |
|:-----------|:-----------|:---------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0.6.1      | 2026-11-04 | [91047](https://github.com/airbytehq/airbyte/pull/91047) | Raise minimum supported Python version to 3.11 |
| 0.6.0      | 2025-11-03 | [69148](https://github.com/airbytehq/airbyte/pull/69148) | Promoting release candidate 0.6.0-rc.1 to a main version.                                                                                                                                             |
| 0.6.0-rc.1 | 2025-10-22 | [68588](https://github.com/airbytehq/airbyte/pull/68588) | Update to airbyte-cdk ^v7                                                                                                                                              |
| 0.5.46     | 2025-10-21 | [68484](https://github.com/airbytehq/airbyte/pull/68484) | Update dependencies                                                                                                                                                    |
| 0.5.45     | 2025-10-14 | [68081](https://github.com/airbytehq/airbyte/pull/68081) | Update dependencies                                                                                                                                                    |
| 0.5.44     | 2025-10-07 | [67316](https://github.com/airbytehq/airbyte/pull/67316) | Update dependencies                                                                                                                                                    |
| 0.5.43     | 2025-09-30 | [66783](https://github.com/airbytehq/airbyte/pull/66783) | Update dependencies                                                                                                                                                    |
| 0.5.42     | 2025-09-24 | [66164](https://github.com/airbytehq/airbyte/pull/66164) | Update dependencies                                                                                                                                                    |
| 0.5.41     | 2025-09-09 | [65822](https://github.com/airbytehq/airbyte/pull/65822) | Update dependencies                                                                                                                                                    |
| 0.5.40     | 2025-08-23 | [65011](https://github.com/airbytehq/airbyte/pull/65011) | Update dependencies                                                                                                                                                    |
| 0.5.39     | 2025-08-09 | [64028](https://github.com/airbytehq/airbyte/pull/64028) | Update dependencies                                                                                                                                                    |
| 0.5.38     | 2025-07-19 | [63567](https://github.com/airbytehq/airbyte/pull/63567) | Update dependencies                                                                                                                                                    |
| 0.5.37     | 2025-07-12 | [62979](https://github.com/airbytehq/airbyte/pull/62979) | Update dependencies                                                                                                                                                    |
| 0.5.36     | 2025-07-05 | [62770](https://github.com/airbytehq/airbyte/pull/62770) | Update dependencies                                                                                                                                                    |
| 0.5.35     | 2025-06-28 | [62343](https://github.com/airbytehq/airbyte/pull/62343) | Update dependencies                                                                                                                                                    |
| 0.5.34     | 2025-06-22 | [61283](https://github.com/airbytehq/airbyte/pull/61283) | Update dependencies                                                                                                                                                    |
| 0.5.33     | 2025-05-27 | [60869](https://github.com/airbytehq/airbyte/pull/60869) | Update dependencies                                                                                                                                                    |
| 0.5.32     | 2025-05-24 | [60421](https://github.com/airbytehq/airbyte/pull/60421) | Update dependencies                                                                                                                                                    |
| 0.5.31     | 2025-05-10 | [59390](https://github.com/airbytehq/airbyte/pull/59390) | Update dependencies                                                                                                                                                    |
| 0.5.30     | 2025-04-26 | [58890](https://github.com/airbytehq/airbyte/pull/58890) | Update dependencies                                                                                                                                                    |
| 0.5.29     | 2025-04-19 | [57801](https://github.com/airbytehq/airbyte/pull/57801) | Update dependencies                                                                                                                                                    |
| 0.5.28     | 2025-04-05 | [57281](https://github.com/airbytehq/airbyte/pull/57281) | Update dependencies                                                                                                                                                    |
| 0.5.27     | 2025-03-29 | [56485](https://github.com/airbytehq/airbyte/pull/56485) | Update dependencies                                                                                                                                                    |
| 0.5.26     | 2025-03-22 | [55921](https://github.com/airbytehq/airbyte/pull/55921) | Update dependencies                                                                                                                                                    |
| 0.5.25     | 2025-03-08 | [55282](https://github.com/airbytehq/airbyte/pull/55282) | Update dependencies                                                                                                                                                    |
| 0.5.24     | 2025-03-06 | [55205](https://github.com/airbytehq/airbyte/pull/55205) | Fix client error when reading zip files with non-canonical file extensions (e.g. .Zip, .ZIP)                                                                           |
| 0.5.23     | 2025-02-22 | [54387](https://github.com/airbytehq/airbyte/pull/54387) | Update dependencies                                                                                                                                                    |
| 0.5.22     | 2025-02-18 | [54141](https://github.com/airbytehq/airbyte/pull/54141) | Bump lxml                                                                                                                                                              |
| 0.5.21     | 2025-02-15 | [53754](https://github.com/airbytehq/airbyte/pull/53754) | Update dependencies                                                                                                                                                    |
| 0.5.20     | 2025-02-08 | [53339](https://github.com/airbytehq/airbyte/pull/53339) | Update dependencies                                                                                                                                                    |
| 0.5.19     | 2025-02-01 | [52794](https://github.com/airbytehq/airbyte/pull/52794) | Update dependencies                                                                                                                                                    |
| 0.5.18     | 2025-01-25 | [52317](https://github.com/airbytehq/airbyte/pull/52317) | Update dependencies                                                                                                                                                    |
| 0.5.17     | 2025-01-18 | [48656](https://github.com/airbytehq/airbyte/pull/48656) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.5.16     | 2024-12-10 | [48804](https://github.com/airbytehq/airbyte/pull/48804) | Added reader options: skiprows & header for Excel files                                                                                                                |
| 0.5.15     | 2024-11-05 | [48317](https://github.com/airbytehq/airbyte/pull/48317) | Update dependencies                                                                                                                                                    |
| 0.5.14     | 2024-10-29 | [47115](https://github.com/airbytehq/airbyte/pull/47115) | Update dependencies                                                                                                                                                    |
| 0.5.13     | 2024-10-12 | [45795](https://github.com/airbytehq/airbyte/pull/45795) | Update dependencies                                                                                                                                                    |
| 0.5.12     | 2024-09-14 | [45499](https://github.com/airbytehq/airbyte/pull/45499) | Update dependencies                                                                                                                                                    |
| 0.5.11     | 2024-09-07 | [45261](https://github.com/airbytehq/airbyte/pull/45261) | Update dependencies                                                                                                                                                    |
| 0.5.10     | 2024-08-31 | [44974](https://github.com/airbytehq/airbyte/pull/44974) | Update dependencies                                                                                                                                                    |
| 0.5.9      | 2024-08-24 | [44637](https://github.com/airbytehq/airbyte/pull/44637) | Update dependencies                                                                                                                                                    |
| 0.5.8      | 2024-08-17 | [44286](https://github.com/airbytehq/airbyte/pull/44286) | Update dependencies                                                                                                                                                    |
| 0.5.7      | 2024-08-12 | [43896](https://github.com/airbytehq/airbyte/pull/43896) | Update dependencies                                                                                                                                                    |
| 0.5.6      | 2024-08-10 | [43675](https://github.com/airbytehq/airbyte/pull/43675) | Update dependencies                                                                                                                                                    |
| 0.5.5      | 2024-08-03 | [39978](https://github.com/airbytehq/airbyte/pull/39978) | Update dependencies                                                                                                                                                    |
| 0.5.4      | 2024-07-01 | [39909](https://github.com/airbytehq/airbyte/pull/39909) | Fix error with zip files and encoding.                                                                                                                                 |
| 0.5.3      | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger                                                                                                                  |
| 0.5.2      | 2024-06-06 | [39192](https://github.com/airbytehq/airbyte/pull/39192) | [autopull] Upgrade base image to v1.2.2                                                                                                                                |
| 0.5.1      | 2024-05-03 | [37799](https://github.com/airbytehq/airbyte/pull/37799) | Add fastparquet engine for parquet file reader.                                                                                                                        |
| 0.5.0      | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0`                                                                                                                                        |
| 0.4.1      | 2024-03-04 | [35800](https://github.com/airbytehq/airbyte/pull/35800) | Add PyAirbyte support on Python 3.11                                                                                                                                   |
| 0.4.0      | 2024-02-15 | [32354](https://github.com/airbytehq/airbyte/pull/32354) | Add Zip File Support                                                                                                                                                   |
| 0.3.17     | 2024-02-13 | [34678](https://github.com/airbytehq/airbyte/pull/34678) | Add Fixed-Width File Support                                                                                                                                           |
| 0.3.16     | 2024-02-12 | [35186](https://github.com/airbytehq/airbyte/pull/35186) | Manage dependencies with Poetry                                                                                                                                        |
| 0.3.15     | 2023-10-19 | [31599](https://github.com/airbytehq/airbyte/pull/31599) | Upgrade to airbyte/python-connector-base:1.0.1                                                                                                                         |
| 0.3.14     | 2023-10-13 | [30984](https://github.com/airbytehq/airbyte/pull/30984) | Prevent local file usage on cloud                                                                                                                                      |
| 0.3.13     | 2023-10-12 | [31341](https://github.com/airbytehq/airbyte/pull/31341) | Build from airbyte/python-connector-base:1.0.0                                                                                                                         |
| 0.3.12     | 2023-09-19 | [30579](https://github.com/airbytehq/airbyte/pull/30579) | Add ParserError handling for `discovery`                                                                                                                               |
| 0.3.11     | 2023-06-08 | [27157](https://github.com/airbytehq/airbyte/pull/27157) | Force smart open log level to ERROR                                                                                                                                    |
| 0.3.10     | 2023-06-07 | [27107](https://github.com/airbytehq/airbyte/pull/27107) | Make source-file testable in our new airbyte-ci pipelines                                                                                                              |
| 0.3.9      | 2023-05-18 | [26275](https://github.com/airbytehq/airbyte/pull/26275) | Add ParserError handling                                                                                                                                               |
| 0.3.8      | 2023-05-17 | [26210](https://github.com/airbytehq/airbyte/pull/26210) | Bugfix for https://github.com/airbytehq/airbyte/pull/26115                                                                                                             |
| 0.3.7      | 2023-05-16 | [26131](https://github.com/airbytehq/airbyte/pull/26131) | Re-release source-file to be in sync with source-file-secure                                                                                                           |
| 0.3.6      | 2023-05-16 | [26115](https://github.com/airbytehq/airbyte/pull/26115) | Add retry on SSHException('Error reading SSH protocol banner')                                                                                                         |
| 0.3.5      | 2023-05-16 | [26117](https://github.com/airbytehq/airbyte/pull/26117) | Check if reader options is a valid JSON object                                                                                                                         |
| 0.3.4      | 2023-05-10 | [25965](https://github.com/airbytehq/airbyte/pull/25965) | fix Pandas date-time parsing to airbyte type                                                                                                                           |
| 0.3.3      | 2023-05-04 | [25819](https://github.com/airbytehq/airbyte/pull/25819) | GCP service_account_json is a secret                                                                                                                                   |
| 0.3.2      | 2023-05-01 | [25641](https://github.com/airbytehq/airbyte/pull/25641) | Handle network errors                                                                                                                                                  |
| 0.3.1      | 2023-04-27 | [25575](https://github.com/airbytehq/airbyte/pull/25575) | Fix OOM; read Excel files in chunks using `openpyxl`                                                                                                                   |
| 0.3.0      | 2023-04-24 | [25445](https://github.com/airbytehq/airbyte/pull/25445) | Add datatime format parsing support for csv files                                                                                                                      |
| 0.2.38     | 2023-04-12 | [23759](https://github.com/airbytehq/airbyte/pull/23759) | Fix column data types for numerical values                                                                                                                             |
| 0.2.37     | 2023-04-06 | [24525](https://github.com/airbytehq/airbyte/pull/24525) | Fix examples in spec                                                                                                                                                   |
| 0.2.36     | 2023-03-27 | [24588](https://github.com/airbytehq/airbyte/pull/24588) | Remove traceback from user messages.                                                                                                                                   |
| 0.2.35     | 2023-03-03 | [24278](https://github.com/airbytehq/airbyte/pull/24278) | Read only file header when checking connectivity; read only a single chunk when discovering the schema.                                                                |
| 0.2.34     | 2023-03-03 | [23723](https://github.com/airbytehq/airbyte/pull/23723) | Update description in spec, make user-friendly error messages and docs.                                                                                                |
| 0.2.33     | 2023-01-04 | [21012](https://github.com/airbytehq/airbyte/pull/21012) | Fix special characters bug                                                                                                                                             |
| 0.2.32     | 2022-12-21 | [20740](https://github.com/airbytehq/airbyte/pull/20740) | Source File: increase SSH timeout to 60s                                                                                                                               |
| 0.2.31     | 2022-11-17 | [19567](https://github.com/airbytehq/airbyte/pull/19567) | Source File: bump 0.2.31                                                                                                                                               |
| 0.2.30     | 2022-11-10 | [19222](https://github.com/airbytehq/airbyte/pull/19222) | Use AirbyteConnectionStatus for "check" command                                                                                                                        |
| 0.2.29     | 2022-11-08 | [18587](https://github.com/airbytehq/airbyte/pull/18587) | Fix pandas read_csv header none issue.                                                                                                                                 |
| 0.2.28     | 2022-10-27 | [18428](https://github.com/airbytehq/airbyte/pull/18428) | Add retry logic for `Connection reset error - 104`                                                                                                                     |
| 0.2.27     | 2022-10-26 | [18481](https://github.com/airbytehq/airbyte/pull/18481) | Fix check for wrong format                                                                                                                                             |
| 0.2.26     | 2022-10-18 | [18116](https://github.com/airbytehq/airbyte/pull/18116) | Transform Dropbox shared link                                                                                                                                          |
| 0.2.25     | 2022-10-14 | [17994](https://github.com/airbytehq/airbyte/pull/17994) | Handle `UnicodeDecodeError` during discover step.                                                                                                                      |
| 0.2.24     | 2022-10-03 | [17504](https://github.com/airbytehq/airbyte/pull/17504) | Validate data for `HTTPS` while `check_connection`                                                                                                                     |
| 0.2.23     | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/pull/17304) | Migrate to per-stream state.                                                                                                                                           |
| 0.2.22     | 2022-09-15 | [16772](https://github.com/airbytehq/airbyte/pull/16772) | Fix schema generation for JSON files containing arrays                                                                                                                 |
| 0.2.21     | 2022-08-26 | [15568](https://github.com/airbytehq/airbyte/pull/15568) | Specify `pyxlsb` library for Excel Binary Workbook files                                                                                                               |
| 0.2.20     | 2022-08-23 | [15870](https://github.com/airbytehq/airbyte/pull/15870) | Fix CSV schema discovery                                                                                                                                               |
| 0.2.19     | 2022-08-19 | [15768](https://github.com/airbytehq/airbyte/pull/15768) | Convert 'nan' to 'null'                                                                                                                                                |
| 0.2.18     | 2022-08-16 | [15698](https://github.com/airbytehq/airbyte/pull/15698) | Cache binary stream to file for discover                                                                                                                               |
| 0.2.17     | 2022-08-11 | [15501](https://github.com/airbytehq/airbyte/pull/15501) | Cache binary stream to file                                                                                                                                            |
| 0.2.16     | 2022-08-10 | [15293](https://github.com/airbytehq/airbyte/pull/15293) | Add support for encoding reader option                                                                                                                                 |
| 0.2.15     | 2022-08-05 | [15269](https://github.com/airbytehq/airbyte/pull/15269) | Bump `smart-open` version to 6.0.0                                                                                                                                     |
| 0.2.12     | 2022-07-12 | [14535](https://github.com/airbytehq/airbyte/pull/14535) | Fix invalid schema generation for JSON files                                                                                                                           |
| 0.2.11     | 2022-07-12 | [14588](https://github.com/airbytehq/airbyte/pull/14588)  | Add support to YAML format                                                                                                                                             |
| 0.2.9      | 2022-02-01 | [9974](https://github.com/airbytehq/airbyte/pull/9974)   | Update airbyte-cdk 0.1.47                                                                                                                                              |
| 0.2.8      | 2021-12-06 | [8524](https://github.com/airbytehq/airbyte/pull/8524)   | Update connector fields title/description                                                                                                                              |
| 0.2.7      | 2021-10-28 | [7387](https://github.com/airbytehq/airbyte/pull/7387)   | Migrate source to CDK structure, add SAT testing.                                                                                                                      |
| 0.2.6      | 2021-08-26 | [5613](https://github.com/airbytehq/airbyte/pull/5613)   | Add support to xlsb format                                                                                                                                             |
| 0.2.5      | 2021-07-26 | [4953](https://github.com/airbytehq/airbyte/pull/4953)   | Allow non-default port for SFTP type                                                                                                                                   |
| 0.2.4      | 2021-06-09 | [3973](https://github.com/airbytehq/airbyte/pull/3973)   | Add AIRBYTE_ENTRYPOINT for Kubernetes support                                                                                                                          |
| 0.2.3      | 2021-06-01 | [3771](https://github.com/airbytehq/airbyte/pull/3771)   | Add Azure Storage Blob Files option                                                                                                                                    |
| 0.2.2      | 2021-04-16 | [2883](https://github.com/airbytehq/airbyte/pull/2883)   | Fix CSV discovery memory consumption                                                                                                                                   |
| 0.2.1      | 2021-04-03 | [2726](https://github.com/airbytehq/airbyte/pull/2726)   | Fix base connector versioning                                                                                                                                          |
| 0.2.0      | 2021-03-09 | [2238](https://github.com/airbytehq/airbyte/pull/2238)   | Protocol allows future/unknown properties                                                                                                                              |
| 0.1.10     | 2021-02-18 | [2118](https://github.com/airbytehq/airbyte/pull/2118)   | Support JSONL format                                                                                                                                                   |
| 0.1.9      | 2021-02-02 | [1768](https://github.com/airbytehq/airbyte/pull/1768)   | Add test cases for all formats                                                                                                                                         |
| 0.1.8      | 2021-01-27 | [1738](https://github.com/airbytehq/airbyte/pull/1738)   | Adopt connector best practices                                                                                                                                         |
| 0.1.7      | 2020-12-16 | [1331](https://github.com/airbytehq/airbyte/pull/1331)   | Refactor Python base connector                                                                                                                                         |
| 0.1.6      | 2020-12-08 | [1249](https://github.com/airbytehq/airbyte/pull/1249)   | Handle NaN values                                                                                                                                                      |
| 0.1.5      | 2020-11-30 | [1046](https://github.com/airbytehq/airbyte/pull/1046)   | Add connectors using an index YAML file                                                                                                                                |

</details>
