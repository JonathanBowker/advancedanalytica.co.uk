---
generated_record: true
connector_name: Circleci
connector_type: source
connector_slug: circleci
connector_directory: source-circleci
definition_id: dd9a9d23-a64a-483c-b1ed-da1391d13f91
version: 0.1.2
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/circleci
logo: /images/connectors/sources/circleci.svg
logo_source_path: airbyte-integrations/connectors/source-circleci/icon.svg
logo_sha256: f9baf473ccb142897183fd4ebffb5cf251bf40cf53792faac41c05c22cd7cb47
original_metadata_path: airbyte-integrations/connectors/source-circleci/metadata.yaml
original_metadata_sha256: 5ff458187d80f63247bb4d26ce2b772e76b20b4773bb54443cb8a95c0572e203
original_document_path: docs/integrations/sources/circleci.md
original_document_sha256: 93324cf5d170d9a2dd59cf850daaaa10ea96cfc4371aa796c43260c54abad300
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ce429974b3d15c6a2d13f857be140aedd306df60e95f9834c7de0a18548d76b2
rewritten_at: 2026-11-12T13:33:19.455841+00:00
---

# Circleci
This directory contains the manifest-only connector for [`source-circleci`](https://app.circleci.com/).

## API documentation
- Visit `https://circleci.com/docs/api/v1/index.html` for the V1 API documentation
- Visit `https://circleci.com/docs/api/v2/index.html` for the V2 API documentation

## Set up authentication
`CircleCI` uses API key authentication. Visit `https://app.circleci.com/settings/user/tokens` to get your API keys.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `api_key` | `string` | API Key.  |  |
| `org_id` | `string` | Organization ID. The org ID found in `https://app.circleci.com/settings/organization/circleci/xxxxx/overview` |  |
| `start_date` | `string` | Start date.  |  |
| `project_id` | `string` | Project ID found in the project settings, Visit `https://app.circleci.com/settings/project/circleci/ORG_SLUG/YYYYY`  |  |
| `workflow_id` | `array` | Workflow ID's of project pipelines, Could be seen in the URL of pipeline build, Example `https://app.circleci.com/pipelines/circleci/55555xxxxxx/7yyyyyyyyxxxxx/2/workflows/WORKFLOW_ID`  |  |
| `job_number` | `string` | Job Number of the workflow for `jobs` stream, Auto fetches from `workflow_jobs` stream, if not configured  | `2` |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| context | id | DefaultPaginator | ✅ |  ✅  |
| self_ids | id | DefaultPaginator | ✅ |  ❌  |
| self_collaborations | id | DefaultPaginator | ✅ |  ❌  |
| me | analytics_id | DefaultPaginator | ✅ |  ✅  |
| projects | vcs_url | DefaultPaginator | ✅ |  ❌  |
| pipelines | id | DefaultPaginator | ✅ |  ✅ |
| specific_project | id | DefaultPaginator | ✅ |  ❌ |
| jobs | number | DefaultPaginator | ✅ |  ❌ |
| workflow | id | DefaultPaginator | ✅ |  ✅ |
| insights_metrics | project_id | DefaultPaginator | ✅ |  ❌ |
| insights_branches | id | DefaultPaginator | ✅ |  ❌ |
| workflow_jobs | id | DefaultPaginator | ✅ |  ✅ |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date       |PR| Subject        |
|------------------|------------|---|----------------|
| 0.1.2 | 2026-11-09 |[91328](https://github.com/airbytehq/airbyte/pull/91328)| Upgrade base image to source-declarative-manifest 7.47.0 |
| 0.1.0 | 2024-10-11 |[46729](https://github.com/airbytehq/airbyte/pull/46729)| Remove unwanted optional config parameters |
| 0.0.1 | 2024-09-29 |[46249](https://github.com/airbytehq/airbyte/pull/46249)| Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder|

</details>
