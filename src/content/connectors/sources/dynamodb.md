---
generated_record: true
connector_name: DynamoDB
connector_type: source
connector_slug: dynamodb
connector_directory: source-dynamodb
definition_id: 50401137-8871-4c5a-abb7-1f5fda35545a
version: 0.4.2
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/dynamodb
logo: /images/connectors/sources/dynamodb.svg
logo_source_path: airbyte-integrations/connectors/source-dynamodb/icon.svg
logo_sha256: 6166f4236a21d564fa0ce842bf090771000b0ca31ddd84ad686a068c3b557171
original_metadata_path: airbyte-integrations/connectors/source-dynamodb/metadata.yaml
original_metadata_sha256: 77cbdc67d63dfd57c74810e5c08c879484918667568a4b197b6a224818b067f4
original_document_path: docs/integrations/sources/dynamodb.md
original_document_sha256: 09ead54f2808b6f9f7ec3cdfbd9ded927bbcb3fd38fff1befccc5176871c4413
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8d402ff30e75c5b15c259516c7270c1667f1ceac049a0243fba1b32603f53567
rewritten_at: 2026-11-12T13:36:55.233983+00:00
---

---
description: >-
  Amazon DynamoDB is a fully managed NoSQL key-value database from
  Amazon Web Services.
---

# DynamoDB

The DynamoDB source connector reads tables from an Amazon DynamoDB account and region. It supports full refresh and incremental syncs. It infers each table's schema by sampling its items. It reads tables page by page with the `Scan` API. After each round of pages, it saves its position. Large tables can then resume after an interruption instead of restarting.

Version 0.4.0 rebuilds the connector on Airbyte's Bulk CDK. It accepts saved state from versions 0.3.x. It also accepts any configuration using an access key and region. These connections continue syncing without a reset. Sources using role-based authentication from versions 0.3.x fail until you edit them. Sources without a region also fail until edited. See [Changes in 0.4.0](#changes-in-040) for the changes and required actions.

## Features

| Feature                             | Supported | Notes                                                                                                                   |
| :---------------------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------- |
| Full refresh sync                   | Yes       | Resumable, see [State and resuming](#state-and-resuming)                                                                |
| Incremental sync - append           | Yes       | Cursor based, see [Incremental sync](#incremental-sync)                                                                 |
| Incremental sync - append + deduped | Yes       | Removes duplicates by the table's partition key, see [Limitations](#limitations-and-troubleshooting) for composite keys |
| Replicate deletes                   | No        | The connector doesn't read DynamoDB Streams                                                                             |
| Change data capture (CDC)           | No        |                                                                                                                         |
| Namespaces                          | No        | A region has a flat list of tables                                                                                      |
| Primary keys                        | Yes       | The table's partition key                                                                                               |
| Checkpoints                         | Yes       | A state message after every round of scan pages, per scan segment                                                       |
| Speed mode                          | Yes       | The connector supports the socket data channel with JSONL and protocol buffer serialization                             |

The connector is read-only. It calls `ListTables`, `DescribeTable` and `Scan`, but never writes to your tables.

## Get started

### Requirements

- An AWS account containing the DynamoDB tables you want to sync.
- An IAM identity, its access key and the permissions listed below. Credentials always come from the source configuration. The connector can't use an AWS profile, instance role or environment variables from its host machine.

### IAM permissions

Create a dedicated IAM user or role for Airbyte. Grant it the following permissions. You can restrict `DescribeTable` and `Scan` to the tables you sync. This prevents Airbyte from seeing other tables.

| Permission               | Resource                                   | Why                                                                     |
| :----------------------- | :----------------------------------------- | :---------------------------------------------------------------------- |
| `dynamodb:ListTables`    | `*`                                        | Lists the tables of the region during the connection test and discovery |
| `dynamodb:DescribeTable` | Each table to sync                         | Reads the table's key schema, which becomes the stream's primary key    |
| `dynamodb:Scan`          | Each table to sync                         | Samples items during discovery and reads the data during a sync         |
| `sts:AssumeRole`         | The role, with **Access Key and IAM Role** | Lets the access key's identity assume the role that reads the tables    |

This identity-based policy grants read access to two tables. Replace the region, account ID and table names with your own values.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "dynamodb:ListTables",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["dynamodb:DescribeTable", "dynamodb:Scan"],
      "Resource": [
        "arn:aws:dynamodb:us-east-1:123456789012:table/orders",
        "arn:aws:dynamodb:us-east-1:123456789012:table/customers"
      ]
    }
  ]
}
```

With **Access Key and IAM Role**, attach this policy to the role. Allow the IAM user owning the access key to call `sts:AssumeRole` on that role.

### Authentication

You can choose between two authentication methods. Both start with an access key.

- **Access Key**: provide an IAM user's access key ID and secret access key, or temporary credentials issued by AWS STS. For temporary credentials, also complete **Session Token**. The connector signs every request with this key. To create an access key, see [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
- **Access Key and IAM Role**: provide an access key permitted to call `sts:AssumeRole` on an IAM role, plus the role's ARN. When the role's trust policy requires an external ID, provide that too. The connector assumes the role and reads tables using the role's temporary credentials. Choose this method for cross-account access or to limit reading to a least-privilege role. The role's trust policy must let the access key's identity assume it. See [Grant a user permissions to switch roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html).

Role-based authentication from versions 0.3.x isn't available. It previously took credentials from the connector's environment. Saved configurations using it fail the connection test until you select one of the two available methods. See [What to do after upgrading](#what-to-do-after-upgrading).

### Set up the DynamoDB source

1. In the Airbyte UI, click **Sources**, then **+ New source**.
2. Select **DynamoDB** from the source type list.
3. Complete the connection fields:

| Field                                          | Required | Description                                                                                                                                                                                                 |
| :--------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Credentials**                                | Yes      | **Access Key** or **Access Key and IAM Role**, see [Authentication](#authentication).                                                                                                                       |
| **AWS Region**                                 | Yes      | The region of the tables, for example `us-east-1`. The region is required even with an endpoint override.                                                                                                   |
| **DynamoDB Endpoint**                          | No       | An `http` or `https` URL that replaces the public endpoint of the region: a VPC endpoint, a FIPS endpoint, or a DynamoDB Local instance.                                                                    |
| **Reserved attribute names**                   | No       | Kept so that configurations of versions 0.3.x still load. The connector ignores it: every attribute is aliased in its scan expressions, so reserved words and special characters need no configuration.     |
| **Ignore missing read permissions tables**     | No       | When on, discovery skips a table whose `Scan` is denied instead of failing. Off by default.                                                                                                                 |
| **Discovery sample size (Advanced)**           | No       | How many items discovery reads from each table to infer its attributes and their types. Defaults to 1000, the range is 1 to 100000. A larger sample finds rarer attributes and consumes more read capacity. |
| **Checkpoint Target Time Interval (Advanced)** | No       | How often, in seconds, a stream saves its position. A table is scanned in rounds of about this duration and a state message follows every round. Defaults to 300, the minimum is 1.                         |
| **Max Concurrent Queries to Database**         | No       | Airbyte Cloud only. How many `Scan` requests run at the same time, across the segments of a large table and across tables. Leave empty to let Airbyte choose. Self-managed Airbyte shows the field disabled and scans one table at a time. See [Concurrency](#concurrency). |

4. Click **Set up source**. The connection test lists the region's tables. It returns `Discovered zero tables.` when the identity can't see any tables there.

## Replication

### Discovered streams

Each table in the region becomes a stream. DynamoDB tables have no schema, and only their key attributes have defined types. The connector therefore infers schemas as versions 0.3.x did. It scans up to **Discovery sample size** table items and merges every sampled item's top-level attributes. It maps each attribute to a JSON schema based on its value type. When sampled values have different types, the last sampled item determines the type. Nested maps and lists retain the sampled values' structure. Attributes found only outside the sample don't appear in the schema. Empty tables are discovered with only their key attributes, typed from `DescribeTable`. Other attributes appear during the first schema refresh after the table contains items.

The stream's primary key is the table's partition key. As in versions 0.3.x, composite-key tables report only their partition key. More than one item can therefore share a primary key value. The connector never reads global or local secondary indexes.

### Full refresh

A full refresh scans the entire table with the `Scan` API. It reads one page of up to 1 MB at a time. The scan projects exactly the attributes in the stream's schema. Each expression references attributes through placeholders. Reserved words and names containing spaces, dots, dashes or a leading underscore therefore need no configuration.

`Scan` is eventually consistent and doesn't provide snapshot isolation. An item updated during a scan may appear in either version. An item inserted or deleted during the scan may or may not appear in the result.

### Incremental sync

For incremental syncs, choose one cursor attribute for each stream. The cursor must be a top-level string (`S`) or number (`N`) attribute. Examples include an ISO 8601 timestamp or epoch value. The connector takes the cursor type from the stream's schema. It compares `string` attributes as strings. It compares `integer` or `number` attributes as numbers, retaining full DynamoDB precision. You can't use nested attributes or other types as cursors.

The first sync reads the entire table. Each later sync scans the entire table again. A filter keeps items whose cursor exceeds the saved value. For plain dates such as `2016-02-15`, it keeps values greater than or equal to the saved value. This prevents items from the last sync date being skipped. DynamoDB applies the filter after reading items. Incremental syncs therefore consume the same read capacity and take about as long as full refreshes. The filter only reduces the records sent to the destination. After the scan completes, the highest cursor value read becomes the saved cursor. Items without the cursor attribute are replicated but don't advance the cursor. Changing a stream's cursor attribute restarts that stream.

Choose an attribute that only increases and appears on every new or updated item, such as an update timestamp. String cursors are compared as text. Use a fixed-width format that sorts chronologically, such as `2024-05-01T10:00:00Z`. Cursor values should never be empty.

### State and resuming

The connector emits state while reading, not just when a sync ends. It saves state after each round of scan pages, lasting about **Checkpoint Target Time Interval**. For every table segment, the state records the last page's key or marks the segment complete. For incremental streams, it also stores each segment's highest cursor value so far. Retried attempts resume unfinished segments from their saved keys. At most one page per segment is read twice, and no item is skipped. The segment count remains in state until the table completes. The retry's **Max Concurrent Queries to Database** setting doesn't change it. Completed incremental streams save cursor values in the same format as versions 0.3.x. Completed full refreshes save a marker, preventing retried attempts from reading the table again. Resetting the connection's data makes the next sync restart from the beginning.

The connector also reads state saved by versions 0.3.x. Streams with this state resume after the saved cursor value instead of restarting the table.

### Concurrency

Parallel and concurrent scans are available in Airbyte Cloud. Self-managed Airbyte scans tables sequentially, one at a time, as versions 0.3.x did. The **Max Concurrent Queries to Database** field appears disabled there. Values set through the API are ignored.

On Airbyte Cloud, the connector reads large tables with a [parallel scan](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html). DynamoDB divides each table into segments by hashing each item's partition key. The connector scans every segment separately. Computing segments costs nothing, and they consume the same read capacity as one sequential scan. The table size reported by `DescribeTable` determines the segment count. The connector uses one segment per 64 MB, up to 128 segments per table. Tables smaller than 64 MB still use a single scan. DynamoDB refreshes the reported size about every six hours. A table loaded since the latest refresh therefore reports zero bytes. The connector then uses as many segments as **Max Concurrent Queries to Database**.

**Max Concurrent Queries to Database** controls how many scans run simultaneously across all tables. When empty, Airbyte reads one table at a time on the standard data channel. In speed mode, it reads one table per socket. At 1, table segments and tables are read sequentially. This matches the speed of a single sequential scan. Increase it to read segments and tables in parallel. Speed increases almost linearly until read capacity or network bandwidth becomes saturated. Each active scan holds one page of up to 1 MB in memory.

Segments can have different sizes. Items sharing a partition key always enter the same segment. Tables with few partition keys or several large item collections can therefore have uneven segments. Larger segments simply finish later.

### Read throughput

These results were measured on 2026-09-24 against a 1 GB table in `us-east-2`. The table contained 1,000,000 items of about 1 KB each. Testing used a laptop on a residential connection, where each 1 MB scan page took about 0.4 seconds. Absolute speeds are higher inside AWS, but the ratios matter. Every run read the same 1,000,000 records. Each consumed 124,274 read units, costing about $0.03 on-demand. Concurrent scans are available in Airbyte Cloud. Self-managed Airbyte reads at the first row's rate.

| Concurrent scans | Segments read in parallel | Wall time  | Throughput |
| :--------------- | :------------------------ | :--------- | :--------- |
| 1                | 1                         | 7 min 47 s | 2.1 MB/s   |
| 4                | 4                         | 1 min 57 s | 8.5 MB/s   |
| 8                | 8                         | 1 min 12 s | 14 MB/s    |
| 16               | 16                        | 45 s       | 23 MB/s    |

A sync interrupted at concurrency 8 resumed from its latest state. It returned all 1,000,000 keys exactly once. The only exceptions were records read during the ten seconds after the latest checkpoint. Sixteen concurrent segments completed within a 384 MB Java heap.

### Read capacity

Every sync scans each configured table fully. Discovery also scans up to **Discovery sample size** items from each table. `Scan` consumes read capacity for every item read, regardless of the projection or filter. An eventually consistent read of up to 4 KB costs half a read request unit. See [Read/write capacity mode](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/read-write-capacity-mode.html). With provisioned capacity, syncs compete with your workload for read capacity units. DynamoDB throttles the connector when the table exceeds its capacity. The connector retries and reports a transient error when throttling continues. Airbyte then retries the sync. If syncs are throttled, increase the table's read capacity or switch to on-demand mode.

## Data type mapping

Each top-level table attribute becomes a field. Its JSON schema and value follow the attribute value's type in sampled items. Schemas use the same shapes as other Airbyte database connectors. They use `{"type": "string"}` instead of a `["null", "string"]` type list, and represent whole numbers as `{"type": "number", "airbyte_type": "integer"}`. As with all Airbyte sources, every field can contain null.

| DynamoDB type     | Airbyte type | Notes                                                                                                                                                                                                   |
| :---------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `S` (string)      | `string`     |                                                                                                                                                                                                         |
| `N` (number)      | `integer`    | When the sampled value is an integer that fits in 64 bits. Values are read as integers when they fit in 64 bits, otherwise as exact decimals with the full 38 digits of precision that DynamoDB stores. |
| `N` (number)      | `number`     | When the sampled value has a fraction or an exponent, or doesn't fit in 64 bits.                                                                                                                        |
| `B` (binary)      | `string`     | Base64 encoded, with `contentEncoding: base64` in the schema.                                                                                                                                           |
| `BOOL`            | `boolean`    |                                                                                                                                                                                                         |
| `NULL`            | `null`       |                                                                                                                                                                                                         |
| `M` (map)         | `object`     | The schema lists the nested attributes of the sampled value with their own types.                                                                                                                       |
| `L` (list)        | `array`      | The schema lists one item schema per element of the sampled value.                                                                                                                                      |
| `SS` (string set) | `array`      | Items are strings.                                                                                                                                                                                      |
| `NS` (number set) | `array`      | Items are numbers, read exactly.                                                                                                                                                                        |
| `BS` (binary set) | `array`      | Items are base64 encoded strings.                                                                                                                                                                       |

When a record's item doesn't contain an attribute, that attribute is `null` in the record.

## Changes in 0.4.0

Version 0.4.0 loads access key configurations and state from versions 0.3.x. For identical tables, its `discover` output lists the same streams, fields and types. The following differences apply. [What to do after upgrading](#what-to-do-after-upgrading) identifies the few cases requiring action.

- **Schemas use Airbyte's standard shapes.** Versions 0.3.x wrote `{"type": ["null", "string"]}` and `{"type": ["null", "integer"]}`. This connector writes `{"type": "string"}` and `{"type": "number", "airbyte_type": "integer"}`, matching other Airbyte database connectors. Upgraded connections continue syncing with their saved catalog. Their next schema refresh shows a change for every column. Column types in the destination don't change.

- **Credentials come from the configuration only.** Role-based authentication using credentials from the connector's environment is no longer available. Sources configured without an access key fail the connection test with an explanatory message. Temporary credentials with a session token are new. Role assumption with `sts:AssumeRole` is also new. **AWS Region** is required. **DynamoDB Endpoint** must be an `http` or `https` URL, as versions 0.3.x also required in practice.
- **Reserved attribute names need no configuration.** Every attribute has an alias in scan expressions, so the **Reserved attribute names** field is ignored. Versions 0.3.x failed on unlisted reserved words or special characters. They couldn't read tables containing both `field.name` and `field-name`.
- **Large numbers are exact.** An `N` value wider than 64 bits is read as an exact decimal. Versions 0.3.x converted it to a floating-point number and lost precision. Existing rows retain their rounded values until a full table read. Equality joins on these values may start or stop matching.
- **Absent attributes are `null`.** Missing item attributes appear in records as `null`. Versions 0.3.x omitted them. Destinations storing records as JSON, including object storage, now show the attribute as an explicit `null` key.
- **Integer cursors work.** Versions 0.3.x failed before the first record for cursor attributes discovered as `integer`. This affected every whole number.
- **Syncs resume.** Full refresh and incremental streams save their position after each round of scan pages. They resume from that position. Versions 0.3.x saved state only after an incremental stream finished, and saved nothing for full refreshes.
- **Failures carry a message.** The connection test now explains failures. Versions 0.3.x reported failures without messages. Missing configured tables and streams without fields now fail individually. Other streams in the sync are still read.
- **An empty table is discovered with its key attributes only.** Other attributes appear during the first schema refresh after the table contains items. Versions 0.3.x listed empty tables as streams without fields and couldn't read them. The connection test fails when the region contains no tables.
- **Large tables are read with parallel scans on Airbyte Cloud.** Tables larger than 64 MB are divided into scan segments. **Max Concurrent Queries to Database** reads these segments in parallel. Self-managed Airbyte reads every table sequentially, as versions 0.3.x did.
- **Discovery sample size and Max Concurrent Queries to Database** are new settings. Versions 0.3.x always sampled 1000 items and read one table at a time.

### Actions after upgrading

Sources using an access key with a configured region need no action. Their connections continue using the saved catalog. Incremental streams continue from their saved cursor values.

1. Edit sources that used role-based authentication. Choose **Access Key** and enter an IAM user's access key or temporary credentials with a session token. Alternatively, choose **Access Key and IAM Role** and enter an access key permitted to assume the reading role. See [IAM permissions](#iam-permissions) for the identity's required permissions. Until edited, the source's connection test and every sync fail with an explanatory message.
2. If **AWS Region** is empty, set it to the tables' region.
3. Refreshing the connection's source schema is recommended but optional. It shows a change for every column and finds key attributes from previously empty tables. Destination column types remain unchanged.
4. Clearing a stream's data is optional. Consider it only for tables containing `N` values wider than 64 bits. Versions 0.3.x wrote these values as rounded numbers. The next sync reads the entire table again.

## Limits and troubleshooting

- **No change data capture.** The connector doesn't detect deleted items. It detects updated items only when their cursor attribute changes. It doesn't read DynamoDB Streams.
- **Every sync scans every configured table in full**, including incremental syncs, and consumes read capacity for every table item. See [Read capacity](#read-capacity).
- **The schema comes from a sample.** Increase **Discovery sample size** and refresh the source schema when an attribute is missing or has the wrong type. To fix an attribute's type when it varies between items, store only one type.
- **Composite keys report only the partition key** as the primary key. Destinations deduplicating by primary key collapse items sharing a partition key value. Use append modes for these tables.
- **`The access key id or the session token is invalid`** or **`The secret access key is invalid`** indicate an incorrect configured access key. **`The temporary credentials (session token) have expired`** indicates that you need new temporary credentials.
- **`... is not authorized to perform: sts:AssumeRole ...`** identifies the identity and role. Either the role's trust policy blocks the identity, or the external ID is incorrect. **`... is not authorized to perform: dynamodb:...`** identifies a missing permission from the [IAM permissions](#iam-permissions) table.
- **`Could not reach the DynamoDB endpoint`** means the configured endpoint doesn't resolve or accept connections. Check **DynamoDB Endpoint** and **AWS Region**.
- **`A configured table does not exist (any more)`** appears when a table was deleted or renamed after source schema setup. Refresh the source schema. **`The saved state of a stream does not match its table's key schema`** appears when a table was recreated with different key attributes. **`... does not match its table's scan segments`** appears when a saved segment key no longer matches the table. In both cases, reset the stream's data.
- **Throttling errors** (`ProvisionedThroughputExceededException`, `ThrottlingException`) are transient. Airbyte retries the sync. If they continue, increase the table's read capacity.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------------------------------------------------- |
| 0.4.2 | 2026-10-22 | [89646](https://github.com/airbytehq/airbyte/pull/89646) | Upgrade to Bulk CDK 1.2.3: fix critical CVEs in Apache MINA (mina-core 2.0.31), MINA SSHD 2.20.0 and BouncyCastle 1.86. |
| 0.4.1 | 2026-10-07 | [88146](https://github.com/airbytehq/airbyte/pull/88146) | Promote the connector to generally available and certified |
| 0.4.0 | 2026-10-06 | [86997](https://github.com/airbytehq/airbyte/pull/86997) | Rebuild on the Bulk CDK: parallel scan segments on Airbyte Cloud, resumable full refresh and incremental syncs, speed mode, exact numbers, integer cursors, temporary credentials and IAM role assumption. Role-based authentication is removed, see [Changes in 0.4.0](#changes-in-040) |
| 0.3.11 | 2025-07-11 | [62916](https://github.com/airbytehq/airbyte/pull/62916) | Add gradle docker plugins |
| 0.3.10 | 2025-06-17 | [61601](https://github.com/airbytehq/airbyte/pull/61601) | fix(source-dynamodb): Replace ListNode with Iterator for lazyness #61600 |
| 0.3.9 | 2025-02-12 | [53202](https://github.com/airbytehq/airbyte/pull/53202) | fixed IRSA by adding STS to classpath of connector. |
| 0.3.8 | 2025-01-13 | [51489](https://github.com/airbytehq/airbyte/pull/51489) | Use a non root base image |
| 0.3.7 | 2024-12-19 | [49881](https://github.com/airbytehq/airbyte/pull/49881) | Use a base image: airbyte/java-connector-base:1.0.0 |
| 0.3.6 | 2024-07-31 | [41936](https://github.com/airbytehq/airbyte/pull/41936) | Fix incorrect type check for incremental read |
| 0.3.5 | 2024-07-23 | [42433](https://github.com/airbytehq/airbyte/pull/42433) | add PR number |
| 0.3.4 | 2024-07-23 | [42433](https://github.com/airbytehq/airbyte/pull/42433) | fix primary key fetching |
| 0.3.3 | 2024-07-22 | [42398](https://github.com/airbytehq/airbyte/pull/42398) | fix primary key fetching |
| 0.3.2 | 2024-05-01 | [27045](https://github.com/airbytehq/airbyte/pull/27045) | Fix missing scan permissions |
| 0.3.1 | 2024-05-01 | [31935](https://github.com/airbytehq/airbyte/pull/31935) | Fix list more than 100 tables |
| 0.3.0 | 2024-04-30 | [37530](https://github.com/airbytehq/airbyte/pull/37530) | Allow role based access |
| 0.2.3 | 2024-02-14 | [35232](https://github.com/airbytehq/airbyte/pull/35232) | Adopt CDK 0.20.4 |
| 0.2.2 | 2024-02-01 | [34453](https://github.com/airbytehq/airbyte/pull/34453) | bump CDK version |
| 0.2.1 | 2024-01-05 | [33924](https://github.com/airbytehq/airbyte/pull/33924) | Add new ap-southeast-3 AWS region |
| 0.2.0 | 2023-12-19 | [33485](https://github.com/airbytehq/airbyte/pull/33485) | Remove LEGACY state |
| 0.1.2 | 2023-02-27 | [20172](https://github.com/airbytehq/airbyte/pull/20172) | Fix reserved words in projection expression & make them configurable |
| 0.1.1 | 2023-02-10 | [22682](https://github.com/airbytehq/airbyte/pull/22682) | Fix build |
| 0.1.0 | 2022-11-14 | [18750](https://github.com/airbytehq/airbyte/pull/18750) | Initial version |

</details>
