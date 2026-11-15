---
generated_record: true
connector_name: Jenkins
connector_type: source
connector_slug: jenkins
connector_directory: airbyte-jenkins-source
definition_id: d6f73702-d7a0-4e95-9758-b0fb1af0bfba
version: 0.1.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/jenkins
logo: /images/connectors/sources/jenkins.svg
logo_source_path: airbyte-integrations/connectors/third-party/farosai/airbyte-jenkins-source/icon.svg
logo_sha256: 78aa471297e800f8cf0838ac8340e8df0f2b9acfeaa296673518568e907a36b4
original_metadata_path: airbyte-integrations/connectors/third-party/farosai/airbyte-jenkins-source/metadata.yaml
original_metadata_sha256: d1b0dc9faa83cbbead33010564f8ace6c8500a1bd4f50b8e2446d3c004ed5073
original_document_path: docs/integrations/sources/jenkins.md
original_document_sha256: 8dba5fbef2ab9a354461d7d61acec98e4fdfa6840f6a444c822eaec758f25b42
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9ccef8984ea3e386a18c3122592489110e4a12948c9f219719ba876662d1f720
rewritten_at: 2026-11-12T13:43:45.054764+00:00
---

# Jenkins

## Overview

The Jenkins source is maintained by [Faros
AI](https://github.com/faros-ai/airbyte-connectors/tree/main/sources/jenkins-source).
File support requests in that repository to reduce the maintainers' response time.

The source supports Full Refresh and Incremental syncs. You can copy only new or updated data. Alternatively, copy every row in the tables and columns configured for replication with each sync.

### Output schema

This source provides several output streams:

- [Builds](https://your.jenkins.url/job/$JOB_NAME/$BUILD_NUMBER/api/json?pretty=true) \(Incremental\)
- [Jobs](https://your.jenkins.url/job/$JOB_NAME/api/json?pretty=true)

In those links, replace `your.jenkins.url` with your Jenkins instance URL. Replace any environment variables with an existing Jenkins job or build ID.

To request support for more Faros AI endpoints, [create an
issue.](https://github.com/faros-ai/airbyte-connectors/issues/new)

### Features

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | Yes        |
| SSL connection    | Yes        |
| Namespaces        | No         |

### Performance

The Jenkins source shouldn't reach Jenkins API limits during normal use. If rate-limit issues aren't automatically retried successfully, [create an
issue](https://github.com/faros-ai/airbyte-connectors/issues/new).

## Get started

### Requirements

- Jenkins Server
- Jenkins User
- Jenkins API Token

### Setup

Log in to your Jenkins server through your browser. Go to `https://your.jenkins.url/me/configure` to generate your API token.

## IP allow list

If you use Airbyte Cloud and access is restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                   | Subject                                                              |
| :------ | :--------- | :------------------------------------------------------------- | :------------------------------------------------------------------- |
| 0.1.23  | 2021-10-01 | [114](https://github.com/faros-ai/airbyte-connectors/pull/114) | Added projects stream to Phabricator + cleanup                       |
| 0.1.22  | 2021-10-01 | [113](https://github.com/faros-ai/airbyte-connectors/pull/113) | Added revisions & users streams to Phabricator source + bump version |
| 0.1.21  | 2021-09-27 | [101](https://github.com/faros-ai/airbyte-connectors/pull/101) | Exclude tests from Docker + fix path + bump version                  |
| 0.1.20  | 2021-09-27 | [100](https://github.com/faros-ai/airbyte-connectors/pull/100) | Update Jenkins spec + refactor + add Phabricator source skeleton     |
| 0.1.7   | 2021-09-25 | [64](https://github.com/faros-ai/airbyte-connectors/pull/64)   | Add Jenkins source                                                   |

</details>
