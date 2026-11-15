---
generated_record: true
connector_name: Devin AI
connector_type: source
connector_slug: devin-ai
connector_directory: source-devin-ai
definition_id: 3bc4954a-9ebe-48f5-b11d-8f52d61b10d5
version: 0.3.1
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/devin-ai
logo: /images/connectors/sources/devin-ai.svg
logo_source_path: airbyte-integrations/connectors/source-devin-ai/icon.svg
logo_sha256: d2bcef592cb41badc7b40c95ce25ad54a4a67a78da7b043e3a24675f17572035
original_metadata_path: airbyte-integrations/connectors/source-devin-ai/metadata.yaml
original_metadata_sha256: 8c35a0939400c64e6898ec0f14253903f84d18fe730a09ffb5b90d757cbdd55c
original_document_path: docs/integrations/sources/devin-ai.md
original_document_sha256: fe34d4655c358f7ac701a4e193d5d384b663f402e9813951114df1de6d2a63ea
rewrite_status: review
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 91d344a4332166a7d75642cf9f8e80e7738492f7f4a8be6cf46563835d5a0523
rewritten_at: 2026-11-12T14:06:00.151442+00:00
---

# Devin AI

Set up the [Devin AI](https://devin.ai/) source connector and find its reference information on this page.

## Overview

Sync data from the [Devin AI](https://devin.ai) platform API (v3). View your organisation's AI engineering agent activity, conversations and configuration.

- **Sessions**: All Devin sessions in your organisation
  - Session status, title, tags and timestamps
  - ACU consumption (`acus_consumed`) and on-demand spend in USD (`on_demand_usage`, Teams plans only)
  - Associated pull requests and their PR state
  - User and service user attribution
  - Session starting point (`origin`), such as `webapp`, `slack`, `api` or `automation`
  - Creating automation (`automation_id`)
  - Agent mode (`devin_mode`), use-case category (`category`, `subcategory`) and security profile (`security_profile`)
  - Parent and child session relationships
- **Sessions Insights**: Sessions with aggregate insights
  - All fields from the Sessions stream
  - Message counts for each session (`num_user_messages`, `num_devin_messages`)
  - Session size classification (`session_size`)
  - AI-generated analysis of categories, programming languages, tools, frameworks, issues, note usage, suggested prompts and timelines
  - Analysis run state (`analysis_status`): `started`, `completed`, `failed` or null when analysis hasn't run
  - `analysis` remains null until an analysis run completes
- **Session Messages**: Full conversation history for each session
  - Every message exchanged between users and Devin
  - Message source attribution, either user or devin
  - Chronological order by timestamp
- **Playbooks**: Reusable playbook definitions
  - Playbook title, body content and macro triggers
  - Access type
  - Authorship and modification tracking
- **Secrets**: Secret metadata, with values never exposed
  - Secret keys, types and sensitivity flags
  - Access type and organisational scope
  - Creation and update audit trail
- **Knowledge Notes**: Organisation knowledge base entries
  - Note content, folder organisation and trigger rules
  - Enabled or disabled state for automated knowledge injection
  - Pinned repository associations and macro triggers

## Prerequisites

- A Devin account with access to an organisation.
- A Devin API key. All Devin API credentials use the `cog_` prefix.
- A [service user API key](https://docs.devin.ai/api-reference/authentication#service-users-recommended-for-automation) is recommended. A [personal access token](https://docs.devin.ai/api-reference/personal-access-tokens) also works and has the creator's permissions.
- Enterprise accounts must first enable personal access tokens in their enterprise policy.
- Your Devin organisation ID, which uses the `org_` prefix.
- The service user or personal access token needs the organisation-level permissions required for your selected streams:
  - `ViewOrgSessions`: Required for `sessions`, `sessions_insights` and `session_messages`.
  - `UseDevinSessions`: Required for `playbooks` and `knowledge_notes`.
  - `ManageOrgSecrets`: Required for `secrets`. The API returns only metadata and never exposes secret values.

For the complete permission reference, see [Devin Permissions & RBAC documentation](https://docs.devin.ai/api-reference/v3/overview).

## Set up the connector

### 1. Create a service user and API key

1. Sign in to [app.devin.ai](https://app.devin.ai/) as an organisation admin.
2. Open **Settings → Devin API** and select the **Service users** tab.
3. Create a service user. Assign a role granting the permissions listed under [Prerequisites](#prerequisites).
4. Generate an API key for the service user. The key appears only once when created.
5. Copy the key and store it securely. All keys start with `cog_`.

### 2. Find your organisation ID

Find your organisation ID at the top of the **Settings → Devin API** page in [app.devin.ai](https://app.devin.ai/). It starts with `org_`.

### 3. Configure the connector in Airbyte

1. Create a new Devin AI source in Airbyte.
2. Enter your **API Token**, the `cog_...` key from Step 1.
3. Enter your **Organization ID**, the `org_...` value from Step 2.
4. Optionally, set a **Start Date** in UTC and ISO 8601 format, such as `2026-01-01T00:00:00Z`.
5. This limits the `sessions`, `sessions_insights` and `session_messages` streams to sessions created from that instant.
6. Leave it empty to sync the full history.
7. Click **Test Connection** to verify your credentials.

## Supported streams

| Stream | Sync Mode | Description |
|--------|-----------|-------------|
| [Sessions](https://docs.devin.ai/api-reference/v3/sessions/organizations-sessions) | Full Refresh | All Devin sessions in your organization |
| [Sessions Insights](https://docs.devin.ai/api-reference/v3/sessions/organizations-sessions-insights) | Full Refresh | Sessions enriched with message counts, size classification, and AI-generated analysis |
| [Session Messages](https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session-messages) | Full Refresh | Conversation messages for each session |
| [Playbooks](https://docs.devin.ai/api-reference/v3/playbooks/organizations-playbooks) | Full Refresh | Playbooks owned by the organization. Enterprise-level playbooks aren't synced. |
| [Secrets](https://docs.devin.ai/api-reference/v3/secrets/organizations-secrets) | Full Refresh | Secret metadata (no secret values are synced) |
| [Knowledge Notes](https://docs.devin.ai/api-reference/v3/notes/organizations-knowledge-notes) | Full Refresh | Knowledge notes for the organization |

The `session_messages` stream is a substream of `sessions`. For each session from `sessions`, Airbyte makes one additional request for its messages.

Conversation history may contain PII. Enable this stream only when you need message-level data.

For aggregate message counts and Devin-generated classifications without raw message bodies, use `sessions_insights` instead.

The connector requests one message page for each session. By default, the Devin API returns up to 100 messages per page. For longer sessions, only the first 100 messages are synced.

## Limitations

- All streams support full refresh only, so each sync reads every record again.
- Set **Start Date** to limit the sessions read by `sessions`, `sessions_insights` and `session_messages`.
- The `on_demand_usage` field is populated only for organisations on a Devin Teams plan.
- It's `0` when your plan's quota fully covered a session. The field is absent for other plans.
- The connector retries requests returning HTTP `429` or `5xx` responses.
- It retries up to five times with exponential backoff.

## Configuration reference

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `api_token` | string | Yes | | Devin API key for authentication. All Devin API credentials use the `cog_` prefix. |
| `org_id` | string | Yes | | Your Devin organization ID. Uses the `org_` prefix. |
| `start_date` | string (ISO 8601, UTC) | No | (no filter) | Optional lower bound on `created_at` for the `sessions`, `sessions_insights`, and `session_messages` streams. Sessions created before this instant are excluded. Format: `YYYY-MM-DDTHH:MM:SSZ`. Example: `2026-01-01T00:00:00Z`. |

## IP allow list

Using Airbyte Cloud with IP-restricted access? Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your organisation's allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
|---------|------|--------------|---------|
| 0.3.1 | 2026-10-27 | [89826](https://github.com/airbytehq/airbyte/pull/89826) | Update dependencies |
| 0.3.0 | 2026-10-21 | [89592](https://github.com/airbytehq/airbyte/pull/89592) | Add `on_demand_usage`, `devin_mode`, `origin`, `category`, `subcategory`, `automation_id`, and `security_profile` to `sessions` and `sessions_insights`; add `analysis_status` to `sessions_insights` |
| 0.2.19 | 2026-10-20 | [89148](https://github.com/airbytehq/airbyte/pull/89148) | Update dependencies |
| 0.2.18 | 2026-10-13 | [88586](https://github.com/airbytehq/airbyte/pull/88586) | Update dependencies |
| 0.2.17 | 2026-10-06 | [87810](https://github.com/airbytehq/airbyte/pull/87810) | Update dependencies |
| 0.2.16 | 2026-09-29 | [87099](https://github.com/airbytehq/airbyte/pull/87099) | Update dependencies |
| 0.2.15 | 2026-09-22 | [86554](https://github.com/airbytehq/airbyte/pull/86554) | Update dependencies |
| 0.2.14 | 2026-09-15 | [86013](https://github.com/airbytehq/airbyte/pull/86013) | Update dependencies |
| 0.2.13 | 2026-09-08 | [85448](https://github.com/airbytehq/airbyte/pull/85448) | Update dependencies |
| 0.2.12 | 2026-08-18 | [84527](https://github.com/airbytehq/airbyte/pull/84527) | Update dependencies |
| 0.2.11 | 2026-08-11 | [83901](https://github.com/airbytehq/airbyte/pull/83901) | Update dependencies |
| 0.2.10 | 2026-08-04 | [83423](https://github.com/airbytehq/airbyte/pull/83423) | Update dependencies |
| 0.2.9 | 2026-07-28 | [82877](https://github.com/airbytehq/airbyte/pull/82877) | Update dependencies |
| 0.2.8 | 2026-07-21 | [82361](https://github.com/airbytehq/airbyte/pull/82361) | Update dependencies |
| 0.2.7 | 2026-07-14 | [81770](https://github.com/airbytehq/airbyte/pull/81770) | Update dependencies |
| 0.2.6 | 2026-07-07 | [81037](https://github.com/airbytehq/airbyte/pull/81037) | Update dependencies |
| 0.2.5 | 2026-06-23 | [80426](https://github.com/airbytehq/airbyte/pull/80426) | Update dependencies |
| 0.2.4 | 2026-06-16 | [79827](https://github.com/airbytehq/airbyte/pull/79827) | Update dependencies |
| 0.2.3 | 2026-06-09 | [79281](https://github.com/airbytehq/airbyte/pull/79281) | Update dependencies |
| 0.2.2 | 2026-06-02 | [78663](https://github.com/airbytehq/airbyte/pull/78663) | Update dependencies |
| 0.2.1 | 2026-04-28 | [77201](https://github.com/airbytehq/airbyte/pull/77201) | Update dependencies |
| 0.2.0 | 2026-04-22 | [76475](https://github.com/airbytehq/airbyte/pull/76475) | Add `sessions_insights` stream for analytics (message counts, session size, AI-generated classification); add optional `start_date` config to filter `sessions`, `sessions_insights`, and `session_messages` by creation time |
| 0.1.1 | 2026-04-21 | [76504](https://github.com/airbytehq/airbyte/pull/76504) | Update dependencies |
| 0.1.0 | 2026-04-15 | [74417](https://github.com/airbytehq/airbyte/pull/74417) | Initial release with sessions, session messages, playbooks, secrets, and knowledge notes streams |

</details>
