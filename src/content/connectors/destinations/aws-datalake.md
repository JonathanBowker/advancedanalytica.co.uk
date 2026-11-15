---
generated_record: true
connector_name: AWS Datalake
connector_type: destination
connector_slug: aws-datalake
connector_directory: destination-aws-datalake
definition_id: 99878c90-0fbd-46d3-9d98-ffde879d17fc
version: 0.1.58
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/aws-datalake
logo: /images/connectors/destinations/aws-datalake.svg
logo_source_path: airbyte-integrations/connectors/destination-aws-datalake/icon.svg
logo_sha256: 00e067f8000c3ea99b725b8457f95bf4014354304c6f9c880442be34aea0c7f0
original_metadata_path: airbyte-integrations/connectors/destination-aws-datalake/metadata.yaml
original_metadata_sha256: ec19751ad01fc6dcb2912e2a022930ec95f550aa7c1afdc84eb0e3560a796f92
original_document_path: docs/integrations/destinations/aws-datalake.md
original_document_sha256: 80b531645ae9d3af38172d020f35aeb6f7997222288ff86e19c91c0193001cd5
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d2baa74274459b4424de1d827327d4a52ac5d9aebe6f91d69020f80c08183c91
rewritten_at: 2026-11-12T13:23:11.608833+00:00
---

# AWS Datalake

Use this page to set up the AWS Datalake destination connector and find reference information.

The AWS Datalake destination connector syncs your data to AWS. It writes data as JSON files in S3.

It also makes data available through a
[Lake Formation Governed Table](https://docs.aws.amazon.com/lake-formation/latest/dg/governed-tables.html)
in the Glue Data Catalog. You can then access it through other AWS services, including Athena, Glue jobs, EMR and Redshift.

## Prerequisites

You’ll need the following items to use this destination connector:

- An AWS account
- An S3 bucket where the data will be written
- An AWS Lake Formation database where tables will be created, with one table per stream
- AWS credentials, using either an Access key ID / Secret key ID pair or a role with these permissions:

  - Permission to write objects to the S3 bucket
  - Permission to update the Lake Formation database

If you need help creating these items, follow the setup guide below.

## Setup guide

You now have everything required to configure AWS Datalake as a destination in the UI. You’ll need the following information:

- Aws Account Id : Your AWS account ID. Follow the instructions to set up a new AWS account
  [here](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/).
- Aws Region : The region where your resources are deployed
- Authentication mode : You can authenticate the AWS Datalake connector with either a user or a
  role. In both cases, ensure the appropriate policies are in place. Select
  "ROLE" when using a role. Select "USER" when using a user with Access key / Secret Access key.
- Target Role Arn : The role name when "Authentication mode" is "ROLE". Follow the instructions to
  create a new role
  [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html).
- Access Key Id : The user’s Access Key ID when "Authentication mode" is "USER". Follow the
  instructions to create a new user
  [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html). Select
  "Programmatic Access" to receive secret access keys.
- Secret Access Key : The user’s Secret Access Key ID when "Authentication mode" is "USER"
- S3 Bucket Name : The bucket where the data will be written. Follow the instructions to
  create a new S3 bucket
  [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html).
- Target S3 Bucket Prefix : A prefix added before the file name when writing to the bucket
- Database : The database where the tables will be created. Follow the instructions to
  create a new Lakeformation Database
  [here](https://docs.aws.amazon.com/lake-formation/latest/dg/creating-database.html).

**Assigning proper permissions**

The user or role policy must provide access to these services:

- AWS Lake Formation
- AWS Glue
- AWS S3

Use [the AWS policy generator](https://awspolicygen.s3.amazonaws.com/policygen.html) to help
you generate an appropriate policy.

Also ensure your role or user has the appropriate database permissions in AWS Lakeformation. Find more information about Lake Formation permissions in the
[AWS Lake Formation Developer Guide](https://docs.aws.amazon.com/lake-formation/latest/dg/lake-formation-permissions.html).

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Data type map

Glue tables use schema information provided by the source. The destination table contains the same columns and types as the source.

The following types are translated for compatibility with the Glue Data Catalog:

| Type in the source | Type in the destination |
| :----------------- | :---------------------- |
| number             | float                   |
| integer            | int                     |

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                                              |
|:--------| :--------- | :--------------------------------------------------------- | :--------------------------------------------------- |
| 0.1.58 | 2025-05-24 | [59824](https://github.com/airbytehq/airbyte/pull/59824) | Update dependencies |
| 0.1.57 | 2025-05-03 | [59366](https://github.com/airbytehq/airbyte/pull/59366) | Update dependencies |
| 0.1.56 | 2025-04-26 | [58711](https://github.com/airbytehq/airbyte/pull/58711) | Update dependencies |
| 0.1.55 | 2025-04-19 | [58281](https://github.com/airbytehq/airbyte/pull/58281) | Update dependencies |
| 0.1.54 | 2025-04-12 | [57665](https://github.com/airbytehq/airbyte/pull/57665) | Update dependencies |
| 0.1.53 | 2025-04-05 | [57136](https://github.com/airbytehq/airbyte/pull/57136) | Update dependencies |
| 0.1.52 | 2025-03-29 | [56623](https://github.com/airbytehq/airbyte/pull/56623) | Update dependencies |
| 0.1.51 | 2025-03-22 | [56157](https://github.com/airbytehq/airbyte/pull/56157) | Update dependencies |
| 0.1.50 | 2025-03-08 | [55353](https://github.com/airbytehq/airbyte/pull/55353) | Update dependencies |
| 0.1.49 | 2025-03-01 | [54848](https://github.com/airbytehq/airbyte/pull/54848) | Update dependencies |
| 0.1.48 | 2025-02-22 | [54231](https://github.com/airbytehq/airbyte/pull/54231) | Update dependencies |
| 0.1.47 | 2025-02-15 | [53910](https://github.com/airbytehq/airbyte/pull/53910) | Update dependencies |
| 0.1.46 | 2025-02-08 | [53436](https://github.com/airbytehq/airbyte/pull/53436) | Update dependencies |
| 0.1.45 | 2025-02-01 | [52881](https://github.com/airbytehq/airbyte/pull/52881) | Update dependencies |
| 0.1.44 | 2025-01-25 | [51770](https://github.com/airbytehq/airbyte/pull/51770) | Update dependencies |
| 0.1.43 | 2025-01-11 | [51289](https://github.com/airbytehq/airbyte/pull/51289) | Update dependencies |
| 0.1.42 | 2025-01-04 | [50914](https://github.com/airbytehq/airbyte/pull/50914) | Update dependencies |
| 0.1.41 | 2024-12-28 | [50458](https://github.com/airbytehq/airbyte/pull/50458) | Update dependencies |
| 0.1.40 | 2024-12-21 | [50220](https://github.com/airbytehq/airbyte/pull/50220) | Update dependencies |
| 0.1.39 | 2024-12-14 | [48945](https://github.com/airbytehq/airbyte/pull/48945) | Update dependencies |
| 0.1.38 | 2024-11-25 | [48671](https://github.com/airbytehq/airbyte/pull/48671) | Update dependencies |
| 0.1.37 | 2024-11-04 | [48243](https://github.com/airbytehq/airbyte/pull/48243) | Update dependencies |
| 0.1.36 | 2024-10-29 | [47878](https://github.com/airbytehq/airbyte/pull/47878) | Update dependencies |
| 0.1.35 | 2024-10-28 | [47590](https://github.com/airbytehq/airbyte/pull/47590) | Update dependencies |
| 0.1.34 | 2024-10-22 | [47091](https://github.com/airbytehq/airbyte/pull/47091) | Update dependencies |
| 0.1.33 | 2024-10-12 | [46790](https://github.com/airbytehq/airbyte/pull/46790) | Update dependencies |
| 0.1.32 | 2024-10-05 | [46400](https://github.com/airbytehq/airbyte/pull/46400) | Update dependencies |
| 0.1.31 | 2024-09-28 | [46126](https://github.com/airbytehq/airbyte/pull/46126) | Update dependencies |
| 0.1.30 | 2024-09-21 | [45821](https://github.com/airbytehq/airbyte/pull/45821) | Update dependencies |
| 0.1.29 | 2024-09-14 | [45533](https://github.com/airbytehq/airbyte/pull/45533) | Update dependencies |
| 0.1.28 | 2024-09-07 | [45328](https://github.com/airbytehq/airbyte/pull/45328) | Update dependencies |
| 0.1.27 | 2024-08-31 | [45032](https://github.com/airbytehq/airbyte/pull/45032) | Update dependencies |
| 0.1.26 | 2024-08-24 | [44677](https://github.com/airbytehq/airbyte/pull/44677) | Update dependencies |
| 0.1.25 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.24 | 2024-08-17 | [44341](https://github.com/airbytehq/airbyte/pull/44341) | Update dependencies |
| 0.1.23 | 2024-08-12 | [43822](https://github.com/airbytehq/airbyte/pull/43822) | Update dependencies |
| 0.1.22 | 2024-08-10 | [43497](https://github.com/airbytehq/airbyte/pull/43497) | Update dependencies |
| 0.1.21 | 2024-08-03 | [43139](https://github.com/airbytehq/airbyte/pull/43139) | Update dependencies |
| 0.1.20 | 2024-07-27 | [42821](https://github.com/airbytehq/airbyte/pull/42821) | Update dependencies |
| 0.1.19 | 2024-07-20 | [42174](https://github.com/airbytehq/airbyte/pull/42174) | Update dependencies |
| 0.1.18 | 2024-07-13 | [41819](https://github.com/airbytehq/airbyte/pull/41819) | Update dependencies |
| 0.1.17 | 2024-07-10 | [41590](https://github.com/airbytehq/airbyte/pull/41590) | Update dependencies |
| 0.1.16 | 2024-07-09 | [41083](https://github.com/airbytehq/airbyte/pull/41083) | Update dependencies |
| 0.1.15 | 2024-07-06 | [40907](https://github.com/airbytehq/airbyte/pull/40907) | Update dependencies |
| 0.1.14 | 2024-06-29 | [40631](https://github.com/airbytehq/airbyte/pull/40631) | Update dependencies |
| 0.1.13 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.1.12 | 2024-06-26 | [40535](https://github.com/airbytehq/airbyte/pull/40535) | Update dependencies |
| 0.1.11 | 2024-06-25 | [40458](https://github.com/airbytehq/airbyte/pull/40458) | Update dependencies |
| 0.1.10 | 2024-06-22 | [39958](https://github.com/airbytehq/airbyte/pull/39958) | Update dependencies |
| 0.1.9 | 2024-06-04 | [39033](https://github.com/airbytehq/airbyte/pull/39033) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.8 | 2024-05-20 | [38413](https://github.com/airbytehq/airbyte/pull/38413) | [autopull] base image + poetry + up_to_date |
| `0.1.7` | 2024-04-29 | [#33853](https://github.com/airbytehq/airbyte/pull/33853)  | Enable STS Role Credential Refresh for Long Sync     |
| `0.1.6` | 2024-03-22 | [#36386](https://github.com/airbytehq/airbyte/pull/36386)  | Support new state message protocol                   |
| `0.1.5` | 2024-01-03 | [#33924](https://github.com/airbytehq/airbyte/pull/33924)  | Add new ap-southeast-3 AWS region                    |
| `0.1.4` | 2023-10-25 | [\#29221](https://github.com/airbytehq/airbyte/pull/29221) | Upgrade AWSWrangler                                  |
| `0.1.3` | 2023-03-28 | [\#24642](https://github.com/airbytehq/airbyte/pull/24642) | Prefer airbyte type for complex types when available |
| `0.1.2` | 2022-09-26 | [\#17193](https://github.com/airbytehq/airbyte/pull/17193) | Fix schema keyerror and add parquet support          |
| `0.1.1` | 2022-04-20 | [\#11811](https://github.com/airbytehq/airbyte/pull/11811) | Fix name of required param in specification          |
| `0.1.0` | 2022-03-29 | [\#10760](https://github.com/airbytehq/airbyte/pull/10760) | Initial release                                      |

</details>
