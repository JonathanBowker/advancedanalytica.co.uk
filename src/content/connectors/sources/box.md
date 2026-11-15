---
generated_record: true
connector_name: Box
connector_type: source
connector_slug: box
connector_directory: source-box
definition_id: 3eab5d94-2e12-4bca-ab0c-3af869b2dcd8
version: 0.0.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/box
logo: /images/connectors/sources/box.svg
logo_source_path: airbyte-integrations/connectors/source-box/icon.svg
logo_sha256: 21b07a7f83fb463da22708e07295197fec0c94853ea5925ca23fa0473d56a3e9
original_metadata_path: airbyte-integrations/connectors/source-box/metadata.yaml
original_metadata_sha256: faca892967b15a5082acf8c6c5a2621ee817c5611725d943041c6c8c8d99ffc7
original_document_path: docs/integrations/sources/box.md
original_document_sha256: 0465df918c13d5d47ee897556faefd07d7e7cd34035a9159f772d58c9b001deb
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 83c95399fed698e018d946f92239a38eacc80a68fb2c0ad5499ad01b1eade031
rewritten_at: 2026-11-12T13:31:43.296996+00:00
---

# Box
The Box Connector extracts data from Box. You can list, access and synchronise files or folders in your Box cloud storage. Integrating Box data with other tools helps automate workflows and supports efficient file management and analysis.

## Authentication

This connector uses Box's [Client Credentials Grant (CCG)](https://developer.box.com/guides/authentication/client-credentials/) server authentication. Follow the [setup guide](https://developer.box.com/guides/authentication/client-credentials/client-credentials-setup/):

1. In the [Box Developer Console](https://app.box.com/developers/console), create a **Platform App** of type **Server Authentication (Client Credentials Grant)**. Copy its **Client ID** and **Client Secret** from the **Configuration** tab.
2. Authorise the app. For an enterprise account, submit the app for approval. An admin must then authorise it in **Admin Console > Apps > Custom Apps Manager**. Re-authorise the app after every configuration change.
3. Choose the subject the connector authenticates as (**Subject Type**):
   - `enterprise`: authenticate as the app's Service Account. This works with the default **App Access Only** level. Set **User ID or Enterprise ID** to your enterprise ID (**Admin Console > Account & Billing**).
   - `user`: authenticate as a Managed User or Admin. The app's **App Access Level** must be **App + Enterprise Access**, and **Generate User Access Tokens** must be enabled. Set **User ID or Enterprise ID** to the user's ID.

If the check fails with `400 Bad Request` from `https://api.box.com/oauth2/token`, Box rejected the grant (`invalid_grant - Grant credentials are invalid`). The client ID or secret may be incorrect or belong to different apps. The app may not be authorised in the Admin Console. Alternatively, the app's access level may not allow the chosen Subject Type. See Box's [common errors](https://developer.box.com/guides/authentication/client-credentials/client-credentials-setup/#common-errors).

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `client_id` | `string` | OAuth Client ID.  |  |
| `client_secret` | `string` | OAuth Client Secret.  |  |
| `user` | `number` | Box user ID (Subject Type `user`) or enterprise ID (Subject Type `enterprise`) to authenticate as.  |  |
| `box_subject_type` | `string` | Subject Type: `user` or `enterprise`.  | `user` |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| events |  | DefaultPaginator | ✅ |  ❌  |
| sign_templates | id | DefaultPaginator | ✅ |  ❌  |
| collections | id | DefaultPaginator | ✅ |  ❌  |
| collection_items | id | DefaultPaginator | ✅ |  ❌  |
| sign_request | id | DefaultPaginator | ✅ |  ❌  |
| admin_logs | event_id | DefaultPaginator | ✅ |  ❌  |
| files | id | DefaultPaginator | ✅ |  ❌  |
| file_collaborations | id | DefaultPaginator | ✅ |  ❌  |
| file_comments | id | DefaultPaginator | ✅ |  ❌  |
| file_tasks | id | No pagination | ✅ |  ❌  |
| folders | id | DefaultPaginator | ✅ |  ❌  |
| folder_collaborations | id | DefaultPaginator | ✅ |  ❌  |
| recent_items | id | DefaultPaginator | ✅ |  ❌  |
| trashed_items | id | DefaultPaginator | ✅ |  ❌  |
| users | id | DefaultPaginator | ✅ |  ❌  |

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.23 | 2026-11-09 | [91333](https://github.com/airbytehq/airbyte/pull/91333) | Update to CDK v7 (source-declarative-manifest 7.47.0) |
| 0.0.22 | 2026-10-07 | [88216](https://github.com/airbytehq/airbyte/pull/88216) | Add optional `box_subject_type` (user/enterprise) so the CCG token request can authenticate as the app Service Account; document Box app setup |
| 0.0.21 | 2026-04-21 | [76536](https://github.com/airbytehq/airbyte/pull/76536) | Update dependencies |
| 0.0.20 | 2025-05-24 | [60665](https://github.com/airbytehq/airbyte/pull/60665) | Update dependencies |
| 0.0.19 | 2025-04-26 | [58701](https://github.com/airbytehq/airbyte/pull/58701) | Update dependencies |
| 0.0.18 | 2025-04-19 | [58259](https://github.com/airbytehq/airbyte/pull/58259) | Update dependencies |
| 0.0.17 | 2025-04-05 | [57131](https://github.com/airbytehq/airbyte/pull/57131) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56147](https://github.com/airbytehq/airbyte/pull/56147) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55361](https://github.com/airbytehq/airbyte/pull/55361) | Update dependencies |
| 0.0.14 | 2025-03-01 | [54833](https://github.com/airbytehq/airbyte/pull/54833) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54236](https://github.com/airbytehq/airbyte/pull/54236) | Update dependencies |
| 0.0.12 | 2025-02-15 | [53877](https://github.com/airbytehq/airbyte/pull/53877) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53399](https://github.com/airbytehq/airbyte/pull/53399) | Update dependencies |
| 0.0.10 | 2025-02-01 | [52888](https://github.com/airbytehq/airbyte/pull/52888) | Update dependencies |
| 0.0.9 | 2025-01-25 | [52167](https://github.com/airbytehq/airbyte/pull/52167) | Update dependencies |
| 0.0.8 | 2025-01-18 | [51757](https://github.com/airbytehq/airbyte/pull/51757) | Update dependencies |
| 0.0.7 | 2025-01-11 | [51291](https://github.com/airbytehq/airbyte/pull/51291) | Update dependencies |
| 0.0.6 | 2024-12-28 | [50497](https://github.com/airbytehq/airbyte/pull/50497) | Update dependencies |
| 0.0.5 | 2024-12-21 | [50209](https://github.com/airbytehq/airbyte/pull/50209) | Update dependencies |
| 0.0.4 | 2024-12-14 | [49580](https://github.com/airbytehq/airbyte/pull/49580) | Update dependencies |
| 0.0.3 | 2024-12-12 | [49276](https://github.com/airbytehq/airbyte/pull/49276) | Update dependencies |
| 0.0.2 | 2024-12-11 | [48933](https://github.com/airbytehq/airbyte/pull/48933) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.1 | 2024-10-24 | | Initial release by [@bishalbera](https://github.com/bishalbera) via Connector Builder |

</details>
