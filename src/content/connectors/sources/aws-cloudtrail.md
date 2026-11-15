---
generated_record: true
connector_name: Aws Cloudtrail
connector_type: source
connector_slug: aws-cloudtrail
connector_directory: source-aws-cloudtrail
definition_id: 6ff047c0-f5d5-4ce5-8c81-204a830fa7e1
version: 1.1.0
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/aws-cloudtrail
logo: /images/connectors/sources/aws-cloudtrail.svg
logo_source_path: airbyte-integrations/connectors/source-aws-cloudtrail/icon.svg
logo_sha256: 8e006c2242aacc51e93cce9abc772d6a20d7bf5a13be8804f8daa335d281c4e5
original_metadata_path: airbyte-integrations/connectors/source-aws-cloudtrail/metadata.yaml
original_metadata_sha256: 9623543f111d62b411a448addd3f37eaeb0fe4cba7bf087cec7bcc308cd954a3
original_document_path: docs/integrations/sources/aws-cloudtrail.md
original_document_sha256: 8a6466749f17a3d593bc860adac2e51025936a00b6ccf16ad8778e1b425bf4f2
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5ae90ad0fd5a557fe5682ca5c470329862606dcd9e2bb3027d8abbddcd85641a
rewritten_at: 2026-11-12T13:30:55.388371+00:00
---

# AWS CloudTrail

## Overview

The AWS CloudTrail source supports Full Refresh and Incremental syncs. Choose whether each sync copies only new or updated data. You can instead copy every row in the tables and columns you set up for replication.

This source connector is based on a [Boto3 CloudTrail](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cloudtrail.html).

### Output schema

You can sync the following core streams:

- [Management Events](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cloudtrail.html#CloudTrail.Client.lookup_events)

Insight events aren't currently supported. Only Management events are available.

### Data type mapping

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`         | `string`     |       |
| `number`         | `integer`    |       |
| `array`          | `array`      |       |
| `object`         | `object`     |       |

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | Yes                  |       |
| Namespaces        | No                   |       |

### Performance

Lookup requests for the `events` stream are limited to two per second, per account, per region. The connector retries when it encounters a throttling error. The sync will fail if errors continue after multiple retries. This can happen if you set up many connector instances with the same account and region.

## Get started

### Requirements

- AWS Access key ID
- AWS Secret access key
- AWS region name

### Setup

Follow this [steps](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html) to get your AWS access key and secret.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 1.1.0   | 2024-10-29 | [47287](https://github.com/airbytehq/airbyte/pull/47287) | Migrate to manifest only format |
| 1.0.20  | 2024-10-29 | [47768](https://github.com/airbytehq/airbyte/pull/47768) | Update dependencies |
| 1.0.19  | 2024-10-28 | [47096](https://github.com/airbytehq/airbyte/pull/47096) | Update dependencies |
| 1.0.18  | 2024-10-12 | [46761](https://github.com/airbytehq/airbyte/pull/46761) | Update dependencies |
| 1.0.17  | 2024-10-05 | [46498](https://github.com/airbytehq/airbyte/pull/46498) | Update dependencies |
| 1.0.16  | 2024-09-28 | [46156](https://github.com/airbytehq/airbyte/pull/46156) | Update dependencies |
| 1.0.15  | 2024-09-21 | [45819](https://github.com/airbytehq/airbyte/pull/45819) | Update dependencies |
| 1.0.14  | 2024-09-14 | [45574](https://github.com/airbytehq/airbyte/pull/45574) | Update dependencies |
| 1.0.13  | 2024-09-07 | [45304](https://github.com/airbytehq/airbyte/pull/45304) | Update dependencies |
| 1.0.12  | 2024-08-31 | [45000](https://github.com/airbytehq/airbyte/pull/45000) | Update dependencies |
| 1.0.11  | 2024-08-24 | [44361](https://github.com/airbytehq/airbyte/pull/44361) | Update dependencies |
| 1.0.10  | 2024-08-12 | [43756](https://github.com/airbytehq/airbyte/pull/43756) | Update dependencies |
| 1.0.9   | 2024-08-10 | [43627](https://github.com/airbytehq/airbyte/pull/43627) | Update dependencies |
| 1.0.8   | 2024-08-03 | [43140](https://github.com/airbytehq/airbyte/pull/43140) | Update dependencies |
| 1.0.7   | 2024-07-27 | [42642](https://github.com/airbytehq/airbyte/pull/42642) | Update dependencies |
| 1.0.6   | 2024-07-20 | [42286](https://github.com/airbytehq/airbyte/pull/42286) | Update dependencies |
| 1.0.5   | 2024-07-13 | [41846](https://github.com/airbytehq/airbyte/pull/41846) | Update dependencies |
| 1.0.4   | 2024-07-10 | [41435](https://github.com/airbytehq/airbyte/pull/41435) | Update dependencies |
| 1.0.3   | 2024-07-09 | [41230](https://github.com/airbytehq/airbyte/pull/41230) | Update dependencies |
| 1.0.2   | 2024-07-06 | [40995](https://github.com/airbytehq/airbyte/pull/40995) | Update dependencies |
| 1.0.1   | 2024-06-26 | [40419](https://github.com/airbytehq/airbyte/pull/40419) | Update dependencies |
| 1.0.0   | 2024-07-02 | [36562](https://github.com/airbytehq/airbyte/pull/36562) | Migrate to low code CDK, Add filtering capability |
| 0.1.12  | 2024-06-22 | [39960](https://github.com/airbytehq/airbyte/pull/39960) | Update dependencies |
| 0.1.11  | 2024-06-06 | [39246](https://github.com/airbytehq/airbyte/pull/39246) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.10  | 2024-06-03 | [38911](https://github.com/airbytehq/airbyte/pull/38911) | Replace AirbyteLogger with logging.Logger |
| 0.1.9   | 2024-06-03 | [38911](https://github.com/airbytehq/airbyte/pull/38911) | Replace AirbyteLogger with logging.Logger |
| 0.1.8   | 2024-05-20 | [38448](https://github.com/airbytehq/airbyte/pull/38448) | [autopull] base image + poetry + up_to_date |
| 0.1.7   | 2024-04-15 | [37122](https://github.com/airbytehq/airbyte/pull/37122) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.6   | 2024-04-12 | [37122](https://github.com/airbytehq/airbyte/pull/37122) | schema descriptions |
| 0.1.5   | 2023-02-15 | [23083](https://github.com/airbytehq/airbyte/pull/23083) | Specified date formatting in specification |
| 0.1.4   | 2022-04-11 | [11763](https://github.com/airbytehq/airbyte/pull/11763) | Upgrade to Python 3.9 |
| 0.1.3   | 2021-12-23 | [8434](https://github.com/airbytehq/airbyte/pull/8434) | Update fields in source-connectors specifications |
| 0.1.2   | 2021-08-04 | [5152](https://github.com/airbytehq/airbyte/pull/5152) | Fix connector spec.json |
| 0.1.1   | 2021-07-06 | [4539](https://github.com/airbytehq/airbyte/pull/4539) | Add `AIRBYTE_ENTRYPOINT` for Kubernetes support |
| 0.1.0   | 2021-06-23 | [4122](https://github.com/airbytehq/airbyte/pull/4122) | Initial release supporting the LookupEvent API |

</details>
