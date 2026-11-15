---
generated_record: true
connector_name: OpenAI
connector_type: source
connector_slug: openai
connector_directory: source-openai
definition_id: 620ee20c-a153-4af2-bbfa-092bb9e34b7e
version: 0.0.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/openai
logo: /images/connectors/sources/openai.svg
logo_source_path: airbyte-integrations/connectors/source-openai/icon.svg
logo_sha256: 0a7299e00911e739c00f9aa12239af0caff07a4daf7c6bf400a5d18453034e56
original_metadata_path: airbyte-integrations/connectors/source-openai/metadata.yaml
original_metadata_sha256: 7e335c720b966e7c59ce64b6d2c44c0084d3d840931ec87d34068314251285e6
original_document_path: docs/integrations/sources/openai.md
original_document_sha256: af8cfcfaad116c2570a48426f1b59c8d929797e363bec8d2717e415f4331dda2
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: b38f338537c4ac0fdcfb2605629ecaa6454e66e2189b1928aaaac1dd999dc1f1
rewritten_at: 2026-11-12T13:49:51.869591+00:00
---

# OpenAI
Sync OpenAI organization and ChatGPT Enterprise compliance data. This connector syncs organization members and pending invites from the OpenAI Admin API. It also syncs daily completion usage, aggregated by project, user and model. ChatGPT workspace user rosters include current and historical data. For Enterprise workspaces, it also syncs compliance conversation log metadata and message-level events from JSONL export files. You need an OpenAI organization API key with admin access. ChatGPT Enterprise compliance streams also need a compliance API token and workspace ID. Usage and compliance log streams support incremental sync with configurable start and end dates (YYYY-MM-DD).

The connection **check** runs only the `users` stream using the OpenAI Admin API. A valid organization API key can pass this check when the compliance token or workspace ID is missing or invalid. Any related errors appear when compliance streams run during a sync.

## Set up the connector

### API Platform (Admin API): required for `users`, `invites` and `completions`

1. **Organization ID**: In [OpenAI Platform](https://platform.openai.com/) organization settings, copy your organization ID, such as `org-…`. Enter it as **OpenAI-Organization** (`openai_organization`).
2. **Admin API key**: An organization owner creates an [Admin API key](https://help.openai.com/en/articles/9687866-admin-and-audit-logs-api-for-the-api-platform) under **Organization settings → Admin keys**. Use a key with the scopes needed for members, invites and usage. See the [Admin APIs guide](https://developers.openai.com/api/docs/guides/admin-apis). Enter the secret as **OpenAI-token** (`openai_token`).

These credentials call `api.openai.com` for organization users, invites and completion usage. They’re separate from ChatGPT workspace Admin keys.

### ChatGPT Enterprise compliance: required only for compliance streams

Compliance streams (`conversation_messages`, `conversation_messages_log`, `current_users`, `historical_users`) require a **[ChatGPT Enterprise or Edu](https://help.openai.com/en/articles/9261474-openai-compliance-platform-for-enterprise-and-edu-customers)** workspace. Standard API Platform access isn’t enough.

1. **Compliance API token**: In [Admin Console](https://chatgpt.com/admin), a workspace owner or admin creates a **workspace-scoped Admin key**. It needs the compliance permissions required by your integration, such as conversation messages and workspace user read access. See [Managing Admin keys in Admin Console](https://help.openai.com/en/articles/20001407-managing-admin-keys-in-admin-console). Enter the key as **OpenAI-compliance-token** (`openai_compliance_token`). Only workspace owners can grant broad compliance or conversation-message access.
2. **Workspace ID**: In Admin Console, open the target workspace. Copy its workspace ID from the URL or workspace settings. Enter it as **Workspace ID** (`workspace_id`). Compliance API requests use `https://api.chatgpt.com/v1` with this ID in the path.

If you only need organization admin data, leave the compliance token and workspace ID blank. Then disable the compliance streams in the connection schema.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `end_time` | `string` (date, `YYYY-MM-DD`) | End Time. The end time for querying the API in YYYY-MM-DD (defaults to today if omitted). Because the end date is treated as midnight UTC on that day, **today’s data is not included until a sync runs after that calendar day ends** (typically the next day). |  |
| `start_time` | `string` (date, `YYYY-MM-DD`) | Start time. The start time for querying the API in YYYY-MM-DD |  |
| `openai_token` | `string` | OpenAI-token. The API key token used for authorizing API requests |  |
| `workspace_id` | `string` | Workspace ID. Required for compliance streams; not validated during connection check. |  |
| `openai_organization` | `string` | OpenAI-Organization. The organization (organization_id) associated with the request |  |
| `openai_compliance_token` | `string` | OpenAI-compliance-token. Required for compliance streams; not validated during connection check (only `users` is checked). |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| users | id | DefaultPaginator | ✅ |  ❌  |
| conversation_messages | id | DefaultPaginator | ✅ |  ✅  |
| conversation_messages_log | event_id.snapshot_date | No pagination | ✅ |  ✅  |
| invites | id | DefaultPaginator | ✅ |  ❌  |
| completions | snapshot_date.project_id.user_id.model | DefaultPaginator | ✅ |  ✅  |
| current_users | id | DefaultPaginator | ✅ |  ❌  |
| historical_users | id | DefaultPaginator | ✅ |  ❌  |

### `conversation_messages_log`

Each JSONL line is flattened for analytics. `actor` and `principal` become the `actor_*` and `principal_*` columns. Message text appears in `message_content_value`, while conversation metadata includes `conversation_title`. `message.author` is split into `author_type`, `author_client_type`, `author_skills_used` and `author_tools_used`. Skills, tools and non-text content are stringified, so nested or tuple-shaped API values have clean types. The raw nested `message`, `conversation`, `actor` and `principal` objects aren’t emitted.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.4 | 2026-11-10 | [91660](https://github.com/airbytehq/airbyte/pull/91660) | Update dependencies |
| 0.0.3 | 2026-11-03 | [90676](https://github.com/airbytehq/airbyte/pull/90676) | Update dependencies |
| 0.0.2 | 2026-10-27 | [90015](https://github.com/airbytehq/airbyte/pull/90015) | Update dependencies |
| 0.0.1 | 2026-10-08 | [88374](https://github.com/airbytehq/airbyte/pull/88374) | Initial release by [@Ella6882](https://github.com/Ella6882) via Connector Builder |

</details>
