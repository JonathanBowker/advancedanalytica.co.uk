---
generated_record: true
connector_name: S3 Data Lake
connector_type: destination
connector_slug: s3-data-lake
connector_directory: destination-s3-data-lake
definition_id: 716ca874-520b-4902-9f80-9fad66754b89
version: 0.4.2
support_level: certified
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/s3-data-lake
logo: /images/connectors/destinations/s3-data-lake.svg
logo_source_path: airbyte-integrations/connectors/destination-s3-data-lake/icon.svg
logo_sha256: eba0bd6ac7414a356b28c075d3ff4fa79efeb2084ee7d876f05ab7c9165673af
original_metadata_path: airbyte-integrations/connectors/destination-s3-data-lake/metadata.yaml
original_metadata_sha256: ed29b1ad0804ece0fdc72172582bf36ecf75f2485eb4b48a09628b933d5f1566
original_document_path: docs/integrations/destinations/s3-data-lake.md
original_document_sha256: 6384162ed205cef8a08187cbc88ad9b5efbfaf96c0134fd5298d7c69d5765c5f
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 2aa6782a2255e4481ff290ec123d76f8a33b7f141c65fe339fb3fb17eafc3121
rewritten_at: 2026-11-12T13:28:02.107926+00:00
---

# S3 Data Lake

Set up the S3 Data Lake destination connector using this guide.

This connector provides Airbyte's official support for the Iceberg protocol on S3. It writes the Iceberg table format to S3 or a compatible storage backend. It uses a supported Iceberg catalog.

## Prerequisites

You need two things to use the S3 Data Lake connector.

1. An S3 storage bucket or S3-compatible storage backend.
2. A supported Iceberg catalog. The connector currently supports these catalogs:

    - REST
    - AWS Glue
    - Nessie
    - Polaris

If you use Airbyte Cloud with IP-based access controls, add Airbyte's [IP addresses](/platform/operating-airbyte/ip-allowlist) to your allowlist.

## Set up the connector

Follow these steps to configure your S3 storage and Iceberg catalog permissions.

### Set up S3 permissions

Create a bucket policy, then configure authentication.

:::note
For S3-compatible storage, set the **S3 Endpoint** field to your storage endpoint, such as `http://localhost:9000`. Leave this field empty for Amazon S3.
:::

#### Create a bucket policy

Create your bucket policy.

1. Open the [IAM console](https://console.aws.amazon.com/iam/home#home).
2. In the IAM dashboard, select **Policies** > **Create Policy**.
3. Select the **JSON** tab and paste the following JSON into the Policy editor. Replace the highlighted bucket name with your own.

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "s3:ListAllMyBuckets",
            "s3:GetObject*",
            "s3:PutObject",
            "s3:PutObjectAcl",
            "s3:DeleteObject",
            "s3:ListBucket*"
          ],
          "Resource": [
            // highlight-next-line
            "arn:aws:s3:::YOUR_BUCKET_NAME/*",
            // highlight-next-line
            "arn:aws:s3:::YOUR_BUCKET_NAME"
          ]
        }
      ]
    }
    ```

   :::note
   Object-level permissions alone can't authenticate. Include **bucket-level** permissions as shown in the preceding example.
   :::

4. Click **Next**, give your policy a descriptive name, then click **Create policy**.

#### Authenticate {#authentication-s3}

In most cases, authenticate with an IAM user. With Airbyte Cloud and the Glue catalog, you can authenticate with an IAM role.

<details>
  <summary>Authenticate with an IAM user (Self-Managed or Cloud, with any catalog)</summary>

Use a new or existing [Access Key ID and Secret Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html).

1. In the IAM dashboard, click **Users**.

2. For an existing IAM user, select the user, then click **Add permissions** > **Add permission**. To create a user, click **Add users**.

3. Click **Attach policies directly**, then select the checkbox for your policy. Click **Next** > **Add permissions**.

4. Click the **Security credentials** tab > **Create access key**. The AWS console asks you to select a use case and add optional access-key tags.

5. Click **Create access key** and record your keys.

6. In Airbyte, enter the keys in the connector's **AWS Access Key ID** and **AWS Secret Access Key** fields.

</details>

<!-- env:cloud -->
<details>
<summary>Authenticate with an IAM role (Cloud with Glue catalog only)</summary>

:::note
An Airbyte team member must enable S3 authentication with an IAM role. To use this feature, [contact the Sales team](https://airbyte.com/company/talk-to-sales).
:::

1. In the IAM dashboard, click **Roles**, then **Create role**.

2. Choose the **AWS account** trusted entity type.

3. Set up a trust relationship for the role. This lets the Airbyte instance's AWS account assume the role. You must also specify an external ID. This secret key is known by both the trusting service, Airbyte, and the trusted role you're creating. The ID prevents the "confused deputy" problem. Use your Airbyte workspace ID as the External ID. You can find it in your workspace page's URL. Edit the trust relationship policy to include the external ID:

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "AWS": "arn:aws:iam::094410056844:user/delegated_access_user"
                },
                "Action": "sts:AssumeRole",
                "Condition": {
                    "StringEquals": {
                        "sts:ExternalId": "{your-airbyte-workspace-id}"
                    }
                }
            }
        ]
    }
    ```

4. Complete the role creation and save the Role ARN for later.

5. Select **Attach policies directly**, then find and select the checkbox for your new policy. Click **Next**, then **Add permissions**.

6. In Airbyte, select **Glue** as the catalog. Enter the Role ARN in the **Role ARN** field.

</details>

<!-- /env:cloud -->

### Set up the Iceberg catalog

Complete the remaining setup for your chosen catalog.

#### REST

Enter your REST catalog's URI. You may also need to enter the default namespace.

#### AWS Glue

1. Add a second statement to your existing S3 policy to grant Glue permissions. Glue actions require Glue resource ARNs, not S3 ARNs. They must therefore use a separate statement.

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "s3:ListAllMyBuckets",
            "s3:GetObject*",
            "s3:PutObject",
            "s3:PutObjectAcl",
            "s3:DeleteObject",
            "s3:ListBucket*"
          ],
          "Resource": [
            "arn:aws:s3:::YOUR_BUCKET_NAME/*",
            "arn:aws:s3:::YOUR_BUCKET_NAME"
          ]
        },
        // highlight-start
        {
          "Effect": "Allow",
          "Action": [
            "glue:TagResource",
            "glue:UnTagResource",
            "glue:BatchCreatePartition",
            "glue:BatchDeletePartition",
            "glue:BatchDeleteTable",
            "glue:BatchGetPartition",
            "glue:CreateDatabase",
            "glue:CreateTable",
            "glue:CreatePartition",
            "glue:DeletePartition",
            "glue:DeleteTable",
            "glue:GetDatabase",
            "glue:GetPartition",
            "glue:GetPartitions",
            "glue:GetTable",
            "glue:GetTables",
            "glue:UpdateDatabase",
            "glue:UpdatePartition",
            "glue:UpdateTable"
          ],
          "Resource": [
            "arn:aws:glue:*:*:catalog",
            "arn:aws:glue:*:*:database/*",
            "arn:aws:glue:*:*:table/*/*"
          ]
        }
        // highlight-end
      ]
    }
    ```

    :::tip
    To restrict Glue access by region and account, replace the `*` wildcards in the Glue ARNs. Use your AWS region and account ID, such as `arn:aws:glue:us-east-1:123456789012:catalog`.
    :::

2. Set the **warehouse location** option to `s3://<bucket name>/path/within/bucket`.

3. If you use Airbyte Cloud with an IAM role, set the **Role ARN** option. Use the value you recorded while [setting up authentication](#authentication-s3) on S3.

4. To replace an existing Glue table with an Airbyte-managed Iceberg table, drop the Glue table. Otherwise, you'll encounter the error `Input Glue table is not an iceberg table: <your table name>`.

   Dropping Glue tables from the console [may not immediately delete them](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/glue/client/batch_delete_table.html). Wait for AWS to finish its background processing, or use the AWS API to drop all table versions.

5. If you use [AWS Lake Formation](https://docs.aws.amazon.com/lake-formation/), grant these permissions through Lake Formation:
    1. Grant `Data location_access` on the S3 path.
    2. To let the connector create databases for you, also grant `Create database` on the catalog.
    3. As an advanced option, you can create the databases manually. To restrict the connector to those databases, grant `Create table, Describe` on them.

#### Nessie

Complete two steps to authenticate with Nessie.

1. Set your Nessie catalog's URI and an access token for catalog authentication.

2. Set the **Warehouse location** option to `s3://<bucket name>/path/within/bucket`.

#### Polaris

Follow these steps to authenticate with Apache Polaris.

1. Set up your Polaris catalog and create a principal with the required permissions. See the [Apache Polaris documentation](https://polaris.apache.org/) for detailed setup instructions.

2. When you create a Polaris principal, you'll receive OAuth credentials: Client ID and Client Secret. Keep these credentials secure.

3. Grant the required privileges to your principal's catalog role. Choose either:

   **Option A: Grant the broad `CATALOG_MANAGE_CONTENT` privilege** (recommended for simplicity):
    - This single privilege lets the connector manage tables and namespaces in the catalog

   **Option B: Grant specific granular privileges**:
    - `TABLE_LIST` - List tables in a namespace
    - `TABLE_CREATE` - Create new tables
    - `TABLE_DROP` - Delete tables
    - `TABLE_READ_PROPERTIES` - Read table metadata
    - `TABLE_WRITE_PROPERTIES` - Update table metadata
    - `TABLE_WRITE_DATA` - Write data to tables
    - `NAMESPACE_LIST` - List namespaces
    - `NAMESPACE_CREATE` - Create new namespaces
    - `NAMESPACE_READ_PROPERTIES` - Read namespace metadata

4. Enter the following information in the Airbyte connector configuration:

    - **Polaris Server URI**: Your Polaris server's base URL. For example: `http://localhost:8181/api/catalog`
    - **Catalog Name**: The catalog name you created in Polaris, for example `quickstart_catalog`
    - **Client ID**: The OAuth Client ID provided when you created the principal
    - **Client Secret**: The OAuth Client Secret provided when you created the principal
    - **OAuth Scope**: The authentication scope to request, using the format `PRINCIPAL_ROLE:<role_name>`. For example: `PRINCIPAL_ROLE:catalog_admin`
    - **OAuth2 Server URI**: The OAuth2 token endpoint, for example `https://polaris.example.com/oauth/tokens`. This field is currently optional. A future connector version will require it, so set it if you know it.
    - **Default namespace**: The namespace used for table identifiers when the destination namespace is "Destination-defined" or "Source-defined"

5. Set the **Warehouse location** option to `s3://<bucket name>/path/within/bucket`.

6. Make sure your Polaris catalog has the correct storage credentials for accessing your S3 bucket.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Output schema

### Iceberg schema generation

For each stream, Airbyte maps top-level fields to Iceberg fields. Airbyte writes objects and unions as string columns containing serialised JSON. Arrays retain their structure. If the source schema declares an array's item type, Airbyte writes an Iceberg `list` column using the mapped item type. Arrays without a declared item type become string columns containing serialised JSON.

The following table shows the complete mapping between Airbyte and Iceberg types.

| Airbyte type                           | Iceberg type                     |
|----------------------------------------|----------------------------------|
| Boolean                                | Boolean                          |
| Date                                   | Date                             |
| Integer                                | Long                             |
| Number                                 | Double (String for primary keys) |
| String                                 | String                           |
| Time with timezone*                    | Time                             |
| Time without timezone                  | Time                             |
| Timestamp with timezone*               | Timestamp with timezone          |
| Timestamp without timezone             | Timestamp without timezone       |
| Object                                 | String (JSON-serialized value)   |
| Array with a declared item type        | List of the mapped item type     |
| Array without a declared item type     | String (JSON-serialized value)   |
| Union                                  | String (JSON-serialized value)   |

*Airbyte converts the `time with timezone` and `timestamp with timezone` types to Coordinated Universal Time (UTC) before writing to the Iceberg file.

### Manage schema evolution

The connector never rewrites existing Iceberg data files. Airbyte can therefore handle only specific source schema changes.

- Adding or removing a column
- Widening a column
- Changing the primary key

Choose one of these options to manage schema evolution.

- To handle unsupported schema changes automatically, use [Full Refresh - Overwrite](../../platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) as your [sync mode](../../platform/using-airbyte/core-concepts/sync-modes).
- To handle unsupported changes individually, wait for a sync to fail. Then restore it using one of these options:

    - Edit your table schema directly in Iceberg.
    - [Refresh](../../platform/operator-guides/refreshes) your connection in Airbyte.
    - [Clear](../../platform/operator-guides/clear) your connection in Airbyte.

### Naming

Like most Airbyte destination connectors, S3 Data Lake may modify identifiers for destination compatibility. These identifiers include stream names, namespaces and column names.

When you use AWS Glue, the connector:

- Converts all stream [table names and namespaces](https://docs.aws.amazon.com/glue/latest/webapi/API_Table.html) to lowercase
- Replaces each non-alphanumeric character in a table name or namespace with an [underscore](https://docs.aws.amazon.com/glue/latest/dg/define-database.html) for Athena compatibility

### Column names

By default, Iceberg column names match the source exactly, such as `Foo.Bar` or `userId`. Some query engines can't read mixed-case or special-character column names through a Glue catalog.

Enable the **Normalize Column Names** option to normalise each column name before writing it. The connector applies these rules in order:

1. Removes accents and other combining marks (`café` becomes `cafe`).
2. Replaces whitespace and non-alphanumeric characters, except underscores, with an underscore (`Foo.Bar` becomes `Foo_Bar`).
3. Converts the name to lowercase (`Foo_Bar` becomes `foo_bar`).
4. Adds an underscore prefix if the result is a listed SQL reserved word. Common query engines reject these words as unquoted column names: `constraint`, `current_date`, `current_time`, `current_timestamp`, `current_user`, `localtime`, `localtimestamp`. For example, `CURRENT_DATE` becomes `_current_date`.

A numeric suffix makes names unique when they normalise to the same value. For example, `ID` and `id` become `id` and `id_1`. Airbyte's `_airbyte_*` columns already meet these rules and are never renamed. The option applies to every catalog type. It only affects top-level column names, not keys within JSON-serialised object columns.

:::caution Changing the option on an existing connection
Enabling **Normalize Column Names** after tables exist changes their column names. The connector won't sync until you [clear the stream's data](../../platform/operator-guides/clear) and run a full refresh. This refresh recreates the table with the new column names. Clear the affected streams before disabling the option too.
:::

## Deduplication

The connector supports deduplication using a merge-on-read strategy.

- Airbyte translates the stream's primary keys to Iceberg's [identifier columns](https://iceberg.apache.org/spec/#identifier-field-ids).
- An "upsert" applies an [equality-based delete](https://iceberg.apache.org/spec/#equality-delete-files) to the row's primary key, then inserts the new data.

### Number-type primary keys

For an Airbyte `Number` primary key, the connector stores an Iceberg `StringType` instead of `DoubleType`. This preserves correct deduplication because Iceberg identifier fields don't support `DoubleType`. However, ordering and comparison become lexicographic rather than numeric, for example `"9" > "10"`. You may need to adjust downstream queries that assume numeric comparison for these fields.

### Primary key assumptions

The S3 Data Lake connector assumes one of these conditions is true:

- The source never emits the same primary key twice during one sync attempt.
- When a source emits the same primary key repeatedly, records always follow cursor order from oldest to newest.

If neither condition applies, older records may take precedence over newer records in Iceberg. If this occurs, use append or overwrite as your [sync modes](../../platform/using-airbyte/core-concepts/sync-modes/).

An unknown number of API source streams don't meet these conditions. Airbyte knows [Stripe](../sources/stripe) and [Monday](../sources/monday) don't, and others probably don't either.

## Branching and data availability

Iceberg supports [Git-like semantics](https://iceberg.apache.org/docs/latest/branching/) over your data. The connector uses these semantics to make syncs resilient.

- Each microbatch creates a new snapshot during every sync.

- During truncate syncs, the connector writes refreshed data to a unique `airbyte_staging_<uuid>` branch. After a successful sync, it replaces the `main` branch with the staging branch. Most query engines target the `main` branch, so your data remains available during the truncate sync. At completion, the connector atomically swaps it to the new version. The connector removes the staging branch after a successful promotion. After failed syncs, it preserves the branch so retries can recover staged data.

### Replace a branch

At the end of a stream sync, the connector replaces the current `main` branch with its unique staging branch. The connector intentionally avoids fast-forwarding to handle potential compaction issues better.
**Important Warning**: This process removes changes made to the `main` branch outside Airbyte's operations after the sync starts.

## Compaction

:::caution
**Do not run compaction during a truncate refresh sync to prevent data loss.**
During a truncate refresh sync, the system deletes every file outside the latest generation. This includes:

- Files without generation IDs (compacted files)
- Files from previous generations

If compaction runs during the sync, it deletes current-generation files and causes data loss. The system identifies generations by parsing generation IDs from file names.
:::

## Considerations and limitations

This section explains known considerations and limitations when this Iceberg destination interacts with other products.

### Snowflake

Airbyte marks older record versions as outdated using Iceberg row-level deletes. Snowflake doesn't recognise native Iceberg row-level deletes for tables using external catalogs, such as Glue ([see Snowflake's docs](https://docs.snowflake.com/en/user-guide/tables-iceberg#considerations-and-limitations)). As a result, queries return every version of a record.

For example, this table contains three versions of the 'Alice' record.

| `id` | `name` | `updated_at`     | `_airbyte_extracted_at` |
|:-----|:-------|:-----------------|:------------------------|
| 1    | Alice  | 2024-03-01 10:00 | 2024-03-01 10:10        |
| 1    | Alice  | 2024-03-02 12:00 | 2024-03-02 12:10        |
| 1    | Alice  | 2024-03-03 14:00 | 2024-03-03 14:10        |

To identify outdated records, generate a flag. Airbyte generates an `airbyte_extracted_at` [metadata field](../../platform/understanding-airbyte/airbyte-metadata-fields) to support this.

```sql
row_number() over (partition by {primary_key} order by {cursor}, _airbyte_extracted_at)) != 1 OR _ab_cdc_deleted_at IS NOT NULL as is_outdated;
```

You can now identify the latest 'Alice' record by checking whether `is_outdated` is false.

| `id` | `name` | `updated_at`     | `_airbyte_extracted_at` | `row_number` | `is_outdated` |
|:-----|:-------|:-----------------|:------------------------|--------------|---------------|
| 1    | Alice  | 2024-03-01 10:00 | 2024-03-01 10:10        | 3            | True          |
| 1    | Alice  | 2024-03-02 12:00 | 2024-03-02 12:10        | 2            | True          |
| 1    | Alice  | 2024-03-03 14:00 | 2024-03-03 14:10        | 1            | False         |

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version     | Date       | Pull Request                                               | Subject                                                                                                                                                         |
|:------------|:-----------|:-----------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0.4.2 | 2026-10-22 | [89644](https://github.com/airbytehq/airbyte/pull/89644) | Upgrade to Bulk CDK 1.1.9: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86; netty 4.1.139, Hadoop 3.4.3, Parquet 1.18.1; AWS SDK 2.57.2; drop Jetty from the Hadoop client. |
| 0.4.1 | 2026-10-09 | [87621](https://github.com/airbytehq/airbyte/pull/87621) | Upgrade to Bulk CDK 1.1.1. |
| 0.4.0 | 2026-09-15 | [85827](https://github.com/airbytehq/airbyte/pull/85827) | Add `normalize_column_names` option: lowercase column names, replace non-alphanumeric characters with underscores, and prefix SQL reserved keywords. |
| 0.3.53 | 2026-08-24 | [84994](https://github.com/airbytehq/airbyte/pull/84994) | Upgrade to Bulk CDK 1.0.25. |
| 0.3.52 | 2026-06-23 | [80349](https://github.com/airbytehq/airbyte/pull/80349) | Remove awssdk:bundle fat jar to fix OOMKilled during CHECK operations |
| 0.3.51 | 2026-06-15 | [79123](https://github.com/airbytehq/airbyte/pull/79123) | Update Apache Iceberg dependencies. |
| 0.3.50 | 2026-06-08 | [79112](https://github.com/airbytehq/airbyte/pull/79112) | Use unique staging branches and clean them up after each sync. |
| 0.3.49 | 2026-05-20 | [78232](https://github.com/airbytehq/airbyte/pull/78232) | Upgrade CDK to 1.0.13 |
| 0.3.48 | 2026-05-04 | [77677](https://github.com/airbytehq/airbyte/pull/77677) | Add configurable flush batch size for aggregate publishing. |
| 0.3.47 | 2026-04-17 | [76410](https://github.com/airbytehq/airbyte/pull/76410) | Upgrade CDK to 1.0.9. |
| 0.3.46 | 2026-03-30 | [75628](https://github.com/airbytehq/airbyte/pull/75628) | Upgrade CDK to 1.0.7: fix sort order handling during schema evolution. |
| 0.3.45 | 2026-03-13 | [74326](https://github.com/airbytehq/airbyte/pull/74326) | Upgrade CDK to 1.0.5: Number-type primary keys are now stored as String (enabling dedup on numeric PKs); fix schema evolution when replacing identifier columns |
| 0.3.44 | 2026-02-09 | [72848](https://github.com/airbytehq/airbyte/pull/72848) | Enable Speed. |
| 0.3.43 | 2026-01-30 | [72482](https://github.com/airbytehq/airbyte/pull/72482) | Release on dataflow. |
| 0.3.43-rc.1 | 2026-01-29 | [72443](https://github.com/airbytehq/airbyte/pull/72443) | Update to dataflow. |
| 0.3.42 | 2026-01-12 | [70205](https://github.com/airbytehq/airbyte/pull/70205) | Implement support for scope and OAuth server URI attributes for Polaris catalog |
| 0.3.41 | 2025-11-07 | [69232](https://github.com/airbytehq/airbyte/pull/69232) | Upgrade to Bulk CDK 0.1.69. Changes to handle changes in commit patterns |
| 0.3.40 | 2025-11-05 | [69133](https://github.com/airbytehq/airbyte/pull/69133) | Upgrade to Bulk CDK 0.1.61. |
| 0.3.39 | 2025-10-15 | [68108](https://github.com/airbytehq/airbyte/pull/68108) | Implement Polaris support |
| 0.3.38 | 2025-10-07 | [67005](https://github.com/airbytehq/airbyte/pull/67005) | Fix: Treat empty string role_arn as null to prevent misleading config errors |
| 0.3.37 | 2025-10-07 | [67150](https://github.com/airbytehq/airbyte/pull/67150) | Fix check operation to use unique table names, preventing conflicts with stale metadata and concurrent operations |
| 0.3.36 | 2025-09-25 | [66711](https://github.com/airbytehq/airbyte/pull/66711) | CHECK operation uses configured default dataset instead of `airbyte_test_namespace` |
| 0.3.35 | 2025-07-23 | [63746](https://github.com/airbytehq/airbyte/pull/63746) | Remove unnecessary properties from table |
| 0.3.34 | 2025-07-15 | [62952](https://github.com/airbytehq/airbyte/pull/62952) | Update CDK version |
| 0.3.33 | 2025-07-11 | [62888](https://github.com/airbytehq/airbyte/pull/62888) | Update CDK version to handle compaction issue when deleting files in a truncate refresh scenario |
| 0.3.32 | 2025-07-08 | [62852](https://github.com/airbytehq/airbyte/pull/62852) | Fix metadata (revert accidental archiving) |
| 0.3.31 | 2025-07-07 | [62835](https://github.com/airbytehq/airbyte/pull/62835) | Pin to latest CDK version 0.522 |
| 0.3.30 | 2025-07-07 | [62105](https://github.com/airbytehq/airbyte/pull/62105) | ReplaceBranch to staging from main instead of fast forwarding |
| 0.3.29 | 2025-06-13 | [61588](https://github.com/airbytehq/airbyte/pull/61588) | ~~Publish version to account for possible duplicate publishing in pipeline. Noop change.~~ WARNING: THIS HAS A BUG. DO NOT USE. |
| 0.3.28 | 2025-05-07 | [59710](https://github.com/airbytehq/airbyte/pull/59710) | CDK backpressure bugfix |
| 0.3.27 | 2025-04-21 | [58146](https://github.com/airbytehq/airbyte/pull/58146) | Upgrade to latest CDK |
| 0.3.26 | 2025-04-17 | [58104](https://github.com/airbytehq/airbyte/pull/58104) | Chore: Now passing a string around for the region |
| 0.3.25 | 2025-04-16 | [58085](https://github.com/airbytehq/airbyte/pull/58085) | Internal refactoring |
| 0.3.24 | 2025-03-27 | [56435](https://github.com/airbytehq/airbyte/pull/56435) | Bug fix: Correctly handle non-positive numbers. |
| 0.3.23 | 2025-03-25 | [56395](https://github.com/airbytehq/airbyte/pull/56395) | Bug fix: Correctly coerce values inside nested arrays. |
| 0.3.22 | 2025-03-24 | [56355](https://github.com/airbytehq/airbyte/pull/56355) | Upgrade to airbyte/java-connector-base:2.0.1 to be M4 compatible. |
| 0.3.21      | 2025-03-22 | [\#56347](https://github.com/airbytehq/airbyte/pull/56347) | Bugfix: stream start does not always await iceberg setup                                                                                                        |
| 0.3.20      | 2025-03-24 | [\#55849](https://github.com/airbytehq/airbyte/pull/55849) | Internal refactoring                                                                                                                                            |
| 0.3.19      | 2025-03-19 | [\#55798](https://github.com/airbytehq/airbyte/pull/55798) | CDK: Typing improvements                                                                                                                                        |
| 0.3.18      | 2025-03-18 | [\#55811](https://github.com/airbytehq/airbyte/pull/55811) | CDK: Pass DestinationStream around vs Descriptor                                                                                                                |
| 0.3.17      | 2025-03-13 | [\#55737](https://github.com/airbytehq/airbyte/pull/55737) | CDK: Pass DestinationRecordRaw around instead of DestinationRecordAirbyteValue                                                                                  |
| 0.3.16      | 2025-03-13 | [\#55755](https://github.com/airbytehq/airbyte/pull/55755) | Exclude number fields from identifier fields                                                                                                                    |
| 0.3.15      | 2025-02-28 | [\#54724](https://github.com/airbytehq/airbyte/pull/54724) | Certify connector                                                                                                                                               |
| 0.3.14      | 2025-02-14 | [\#53241](https://github.com/airbytehq/airbyte/pull/53241) | New CDK interface; perf improvements, skip initial record staging                                                                                               |
| 0.3.13      | 2025-02-14 | [\#53697](https://github.com/airbytehq/airbyte/pull/53697) | Internal refactor                                                                                                                                               |
| 0.3.12      | 2025-02-12 | [\#53170](https://github.com/airbytehq/airbyte/pull/53170) | Improve documentation, tweak error handling of invalid schema evolution                                                                                         |
| 0.3.11      | 2025-02-12 | [\#53216](https://github.com/airbytehq/airbyte/pull/53216) | Support arbitrary schema change in overwrite / truncate refresh / clear sync                                                                                    |
| 0.3.10      | 2025-02-11 | [\#53622](https://github.com/airbytehq/airbyte/pull/53622) | Enable the Nessie integration tests                                                                                                                             |
| 0.3.9       | 2025-02-10 | [\#53165](https://github.com/airbytehq/airbyte/pull/53165) | Very basic usability improvements and documentation                                                                                                             |
| 0.3.8       | 2025-02-10 | [\#52666](https://github.com/airbytehq/airbyte/pull/52666) | Change the chunk size to 1.5Gb                                                                                                                                  |
| 0.3.7       | 2025-02-07 | [\#53141](https://github.com/airbytehq/airbyte/pull/53141) | Adding integration tests around the Rest catalog                                                                                                                |
| 0.3.6       | 2025-02-06 | [\#53172](https://github.com/airbytehq/airbyte/pull/53172) | Internal refactor                                                                                                                                               |
| 0.3.5       | 2025-02-06 | [\#53164](https://github.com/airbytehq/airbyte/pull/53164) | Improve error message on null primary key in dedup mode                                                                                                         |
| 0.3.4       | 2025-02-05 | [\#53173](https://github.com/airbytehq/airbyte/pull/53173) | Tweak spec wording                                                                                                                                              |
| 0.3.3       | 2025-02-05 | [\#53176](https://github.com/airbytehq/airbyte/pull/53176) | Fix time_with_timezone handling (values are now adjusted to UTC)                                                                                                |
| 0.3.2       | 2025-02-04 | [\#52690](https://github.com/airbytehq/airbyte/pull/52690) | Handle special characters in stream name/namespace when using AWS Glue                                                                                          |
| 0.3.1       | 2025-02-03 | [\#52633](https://github.com/airbytehq/airbyte/pull/52633) | Fix dedup                                                                                                                                                       |
| 0.3.0       | 2025-01-31 | [\#52639](https://github.com/airbytehq/airbyte/pull/52639) | Make the database/namespace a required field                                                                                                                    |
| 0.2.23      | 2025-01-27 | [\#51600](https://github.com/airbytehq/airbyte/pull/51600) | Internal refactor                                                                                                                                               |
| 0.2.22      | 2025-01-22 | [\#52081](https://github.com/airbytehq/airbyte/pull/52081) | Implement support for REST catalog                                                                                                                              |
| 0.2.21      | 2025-01-27 | [\#52564](https://github.com/airbytehq/airbyte/pull/52564) | Fix crash on stream with 0 records                                                                                                                              |
| 0.2.20      | 2025-01-23 | [\#52068](https://github.com/airbytehq/airbyte/pull/52068) | Add support for default namespace (/database name)                                                                                                              |
| 0.2.19      | 2025-01-16 | [\#51595](https://github.com/airbytehq/airbyte/pull/51595) | Clarifications in connector config options                                                                                                                      |
| 0.2.18      | 2025-01-15 | [\#51042](https://github.com/airbytehq/airbyte/pull/51042) | Write structs as JSON strings instead of Iceberg structs.                                                                                                       |
| 0.2.17      | 2025-01-14 | [\#51542](https://github.com/airbytehq/airbyte/pull/51542) | New identifier fields should be marked as required.                                                                                                             |
| 0.2.16      | 2025-01-14 | [\#51538](https://github.com/airbytehq/airbyte/pull/51538) | Update identifier fields if incoming fields are different than existing ones                                                                                    |
| 0.2.15      | 2025-01-14 | [\#51530](https://github.com/airbytehq/airbyte/pull/51530) | Set AWS region for S3 bucket for nessie catalog                                                                                                                 |
| 0.2.14      | 2025-01-14 | [\#50413](https://github.com/airbytehq/airbyte/pull/50413) | Update existing table schema based on the incoming schema                                                                                                       |
| 0.2.13      | 2025-01-14 | [\#50412](https://github.com/airbytehq/airbyte/pull/50412) | Implement logic to determine super types between iceberg types                                                                                                  |
| 0.2.12      | 2025-01-10 | [\#50876](https://github.com/airbytehq/airbyte/pull/50876) | Add support for AWS instance profile auth                                                                                                                       |
| 0.2.11      | 2025-01-10 | [\#50971](https://github.com/airbytehq/airbyte/pull/50971) | Internal refactor in AWS auth flow                                                                                                                              |
| 0.2.10      | 2025-01-09 | [\#50400](https://github.com/airbytehq/airbyte/pull/50400) | Add S3DataLakeTypesComparator                                                                                                                                   |
| 0.2.9       | 2025-01-09 | [\#51022](https://github.com/airbytehq/airbyte/pull/51022) | Rename all classes and files from Iceberg V2                                                                                                                    |
| 0.2.8       | 2025-01-09 | [\#51012](https://github.com/airbytehq/airbyte/pull/51012) | Rename/Cleanup package from Iceberg V2                                                                                                                          |
| 0.2.7       | 2025-01-09 | [\#50957](https://github.com/airbytehq/airbyte/pull/50957) | Add support for GLUE RBAC (Assume role)                                                                                                                         |
| 0.2.6       | 2025-01-08 | [\#50991](https://github.com/airbytehq/airbyte/pull/50991) | Initial public release.                                                                                                                                         |

</details>
