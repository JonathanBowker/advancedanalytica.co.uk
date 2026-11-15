---
generated_record: true
connector_name: Firebolt
connector_type: destination
connector_slug: firebolt
connector_directory: destination-firebolt
definition_id: 18081484-02a5-4662-8dba-b270b582f321
version: 0.2.41
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/firebolt
logo: /images/connectors/destinations/firebolt.svg
logo_source_path: airbyte-integrations/connectors/destination-firebolt/icon.svg
logo_sha256: e4490527873edf3e6280537f4d71409eb69a7b81ecc2dfb8a90e7e9222955dfa
original_metadata_path: airbyte-integrations/connectors/destination-firebolt/metadata.yaml
original_metadata_sha256: ea62ba758dc93dbd5885f871c4ba8cf4a25f6d7a3a9b1b66b949a82e3f7bbfc1
original_document_path: docs/integrations/destinations/firebolt.md
original_document_sha256: 769b5a85a483ad02984e15941e132964c88f605be7550e9a1196341a302449e0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ab3b726f7458b814fb7cf1b05d10fc380cdd6a587e894cc9d666d1c8bb51899f
rewritten_at: 2026-11-12T13:24:08.526519+00:00
---

# Firebolt

Set up the Firebolt destination connector using this guide.

## Prerequisites

1. Firebolt Account: You need an active Firebolt account. If you don’t have one, sign up [here](https://www.firebolt.io/).
2. Firebolt Database and Engine created: Follow [guide](https://docs.firebolt.io/guides/operate-engines/working-with-engines-using-ddl) to create an engine in your Firebolt workspace if needed.
3. Service Account credentials: All programmatic access to Firebolt requires a service account for database interactions. Follow [guide](https://docs.firebolt.io/guides/managing-your-organization/service-accounts) to create one, then note its ID and secret.

## Replication strategies

You can use two replication strategies with this Firebolt destination connector:

1. SQL: Replicates data through SQL INSERT queries. It uses
   [Firebolt SDK](https://pypi.org/project/firebolt-sdk/) to run queries directly on Firebolt
   [Engines](https://docs.firebolt.io/godocs/Overview/understanding-engine-fundamentals.html).
   **Not recommended for production workloads as this does not scale well**.

2. S3: Replicates data by uploading it to an S3 bucket, creating an External Table and
   writing it to a final Fact Table. This is the recommended loading
   [approach](https://docs.firebolt.io/godocs/Guides/loading-data/loading-data.html). You’ll need an S3 bucket and
   credentials alongside your Firebolt credentials.

## Connection parameters

- **Client ID**
  - Your service account id.
- **Client Secret**
  - Your service account secret.
- **Account**
  - Your Firebolt [account](https://docs.firebolt.io/guides/managing-your-organization/managing-accounts).
- **Database**
  - The database name where you want to store the data.
- **Engine**
  - The engine name that will run the queries.
- **Host (optional)**
  - Firebolt backend URL. You can leave this blank for most use cases.

For the S3 strategy, you’ll also need:

- **S3 Bucket Name**
  - See [this](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) to
    create an S3 bucket.
- **S3 Bucket Region**
  - Create the S3 bucket in the same region as the Firebolt database.
- **Access Key Id**
  - See
    [this](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)
    for instructions on generating an access key.
  - An Airbyte-specific user is recommended. This user requires
    [read, write and delete permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_rw-bucket.html)
    to objects in the staging bucket.
- **Secret Access Key**
  - The corresponding key for the key id above.

## Setup guide

1. Sign up to Firebolt by following the
   [guide](https://docs.firebolt.io/godocs/Guides/managing-your-organization/creating-an-organization.html)
1. Follow the getting started [tutorial](https://docs.firebolt.io/godocs/Guides/getting-started.html) to set up a database.
1. Create a [service account](https://docs.firebolt.io/godocs/Guides/managing-your-organization/service-accounts.html).
1. Create an engine as described in
   [here](https://docs.firebolt.io/godocs/Guides/working-with-engines/working-with-engines-using-the-firebolt-manager.html)
1. (Optional)
   [Create](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) a
   staging S3 bucket \(for the S3 strategy\).
1. (Optional)
   [Create](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-iam-policies.html) an IAM
   with programmatic access to read, write and delete objects from an S3 bucket.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Connector features

### Output schema

Each stream outputs to its own raw
[Fact table](https://docs.firebolt.io/working-with-tables.html#fact-and-dimension-tables) in
Firebolt. Each table contains three columns:

- `_airbyte_ab_id`: a uuid that Airbyte assigns to each processed event. The column type in
  Firebolt is `VARCHAR`.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source.
  The column type in Firebolt is `TIMESTAMP`.
- `_airbyte_data`: a json blob containing the event data. The column type in Firebolt is `VARCHAR`,
  but you can parse it with JSON functions.

## Namespace support

This destination doesn’t support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                |
|:--------| :--------- | :------------------------------------------------------- | :------------------------------------- |
| 0.2.41 | 2026-10-07 | [88246](https://github.com/airbytehq/airbyte/pull/88246) | Add missing `destination_firebolt.run` entrypoint module so the connector image starts with the shared python-connector Dockerfile |
| 0.2.40 | 2025-05-24 | [59866](https://github.com/airbytehq/airbyte/pull/59866) | Update dependencies |
| 0.2.39 | 2025-05-03 | [59316](https://github.com/airbytehq/airbyte/pull/59316) | Update dependencies |
| 0.2.38 | 2025-04-26 | [58725](https://github.com/airbytehq/airbyte/pull/58725) | Update dependencies |
| 0.2.37 | 2025-04-19 | [57623](https://github.com/airbytehq/airbyte/pull/57623) | Update dependencies |
| 0.2.36 | 2025-04-05 | [57115](https://github.com/airbytehq/airbyte/pull/57115) | Update dependencies |
| 0.2.35 | 2025-03-29 | [56607](https://github.com/airbytehq/airbyte/pull/56607) | Update dependencies |
| 0.2.34 | 2025-03-22 | [56156](https://github.com/airbytehq/airbyte/pull/56156) | Update dependencies |
| 0.2.33 | 2025-03-08 | [55391](https://github.com/airbytehq/airbyte/pull/55391) | Update dependencies |
| 0.2.32 | 2025-03-01 | [54853](https://github.com/airbytehq/airbyte/pull/54853) | Update dependencies |
| 0.2.31 | 2025-02-22 | [54217](https://github.com/airbytehq/airbyte/pull/54217) | Update dependencies |
| 0.2.30 | 2025-02-15 | [53940](https://github.com/airbytehq/airbyte/pull/53940) | Update dependencies |
| 0.2.29 | 2025-02-08 | [53427](https://github.com/airbytehq/airbyte/pull/53427) | Update dependencies |
| 0.2.28 | 2025-02-01 | [52946](https://github.com/airbytehq/airbyte/pull/52946) | Update dependencies |
| 0.2.27 | 2025-01-25 | [49292](https://github.com/airbytehq/airbyte/pull/49292) | Update dependencies |
| 0.2.26 | 2025-01-17 | [51560](https://github.com/airbytehq/airbyte/pull/51560) | Fix connection issues |
| 0.2.25 | 2024-11-25 | [48672](https://github.com/airbytehq/airbyte/pull/48672) | Update dependencies |
| 0.2.24 | 2024-10-29 | [47780](https://github.com/airbytehq/airbyte/pull/47780) | Update dependencies |
| 0.2.23 | 2024-10-28 | [47100](https://github.com/airbytehq/airbyte/pull/47100) | Update dependencies |
| 0.2.22 | 2024-10-12 | [46841](https://github.com/airbytehq/airbyte/pull/46841) | Update dependencies |
| 0.2.21 | 2024-10-05 | [46420](https://github.com/airbytehq/airbyte/pull/46420) | Update dependencies |
| 0.2.20 | 2024-09-28 | [46144](https://github.com/airbytehq/airbyte/pull/46144) | Update dependencies |
| 0.2.19 | 2024-09-21 | [45744](https://github.com/airbytehq/airbyte/pull/45744) | Update dependencies |
| 0.2.18 | 2024-09-14 | [45562](https://github.com/airbytehq/airbyte/pull/45562) | Update dependencies |
| 0.2.17 | 2024-09-07 | [45245](https://github.com/airbytehq/airbyte/pull/45245) | Update dependencies |
| 0.2.16 | 2024-08-31 | [44991](https://github.com/airbytehq/airbyte/pull/44991) | Update dependencies |
| 0.2.15 | 2024-08-24 | [44698](https://github.com/airbytehq/airbyte/pull/44698) | Update dependencies |
| 0.2.14 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.2.13 | 2024-08-17 | [44239](https://github.com/airbytehq/airbyte/pull/44239) | Update dependencies |
| 0.2.12 | 2024-08-10 | [43682](https://github.com/airbytehq/airbyte/pull/43682) | Update dependencies |
| 0.2.11 | 2024-08-03 | [43143](https://github.com/airbytehq/airbyte/pull/43143) | Update dependencies |
| 0.2.10 | 2024-07-27 | [42703](https://github.com/airbytehq/airbyte/pull/42703) | Update dependencies |
| 0.2.9 | 2024-07-20 | [42211](https://github.com/airbytehq/airbyte/pull/42211) | Update dependencies |
| 0.2.8 | 2024-07-13 | [41789](https://github.com/airbytehq/airbyte/pull/41789) | Update dependencies |
| 0.2.7 | 2024-07-10 | [41602](https://github.com/airbytehq/airbyte/pull/41602) | Update dependencies |
| 0.2.6 | 2024-07-09 | [41118](https://github.com/airbytehq/airbyte/pull/41118) | Update dependencies |
| 0.2.5 | 2024-07-06 | [40854](https://github.com/airbytehq/airbyte/pull/40854) | Update dependencies |
| 0.2.4 | 2024-06-27 | [40578](https://github.com/airbytehq/airbyte/pull/40578) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.2.3 | 2024-06-25 | [40494](https://github.com/airbytehq/airbyte/pull/40494) | Update dependencies |
| 0.2.2 | 2024-06-22 | [40078](https://github.com/airbytehq/airbyte/pull/40078) | Update dependencies |
| 0.2.1 | 2024-06-06 | [39157](https://github.com/airbytehq/airbyte/pull/39157) | [autopull] Upgrade base image to v1.2.2 |
| 0.2.0 | 2024-05-08 | [36443](https://github.com/airbytehq/airbyte/pull/36443) | Service account authentication support |
| 0.1.1 | 2024-03-05 | [35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector |
| 0.1.0 | 2022-05-18 | [13118](https://github.com/airbytehq/airbyte/pull/13118) | New Destination: Firebolt |

</details>
