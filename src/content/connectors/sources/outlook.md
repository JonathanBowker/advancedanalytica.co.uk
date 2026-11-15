---
generated_record: true
connector_name: Outlook
connector_type: source
connector_slug: outlook
connector_directory: source-outlook
definition_id: 886bdbfe-7935-4d96-b097-e3c1db73b951
version: 0.0.39
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/outlook
logo: /images/connectors/sources/outlook.svg
logo_source_path: airbyte-integrations/connectors/source-outlook/icon.svg
logo_sha256: 2873869506b6a649f25a7cd9aa16f261ab12a97c1d6e26facb0cb819bd032fc6
original_metadata_path: airbyte-integrations/connectors/source-outlook/metadata.yaml
original_metadata_sha256: a816238eb43fa880fdf730cea53c5e936ccd051c33a90ae7bb7c37b25d1c1d27
original_document_path: docs/integrations/sources/outlook.md
original_document_sha256: 483f5dd690f5752e37091693b22ed45e001da97507e94a4101d3eb32dbeeb21e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fcb35e565261cbc35fa2d85f75b8357e057d004d533371d10e16c89a637aa84a
rewritten_at: 2026-11-12T13:50:16.058032+00:00
---

# Outlook

Sync emails, mailboxes and conversations from Microsoft Outlook/Exchange Online through the Microsoft Graph API. The connector uses delegated permissions to support multiple tenants.

## Prerequisites

You need:

- A Microsoft Entra ID (formerly Azure AD) tenant
- An account with at least the Cloud Application Administrator role
- An Azure App Registration with the required API permissions

## Setup

### Step 1: Register an application

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com)
2. Go to **Identity** > **Applications** > **App registrations**
3. Select **New registration**
4. Enter a display name for your application, such as "Airbyte Outlook Connector"
5. Under **Supported account types**, select the appropriate option:
   - **Accounts in this organizational directory only**: Single-tenant (your organization only)
   - **Accounts in any organizational directory**: Multi-tenant (any Microsoft Entra organization)
   - **Accounts in any organizational directory and personal Microsoft accounts**: Multi-tenant with personal accounts
6. Leave **Redirect URI** blank for now. You'll configure it in Step 3.
7. Select **Register**

After registration, note the **Application (client) ID** shown on the Overview page.

### Step 2: Configure API permissions

The connector requires these Microsoft Graph API permissions:

1. In your app registration, go to **API permissions**
2. Select **Add a permission** > **Microsoft Graph** > **Delegated permissions**
3. Add these permissions:
   - `Mail.Read`: Lets the app read the signed-in user's mailbox. You need this permission to access email messages and their attachments.
   - `User.Read`: Lets users sign in and lets the app read their profiles.
4. Select **Add permissions**

**Note**: The `Mail.Read` delegated permission doesn't require admin consent when accessing the signed-in user's own mailbox. However, your tenant's policies may require admin consent for every permission.

For more information about these permissions, see the [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference).

### Step 3: Configure the redirect URI

1. In your app registration, go to **Authentication**
2. Under **Platform configurations**, select **Add a platform**
3. Select **Web**
4. Enter the redirect URI provided by Airbyte during OAuth configuration
5. Select **Configure**

Microsoft sends the authentication response to the redirect URI after the user signs in. Airbyte provides this URI when you configure the connector.

### Step 4: Create a client secret

1. In your app registration, go to **Certificates & secrets**
2. Under **Client secrets**, select **New client secret**
3. Add a description, such as "Airbyte Outlook Connector Secret"
4. Select an expiry period. Microsoft recommends less than 12 months.
5. Select **Add**
6. **Important**: Copy the secret value immediately. It won't appear again after you leave this page.

### Step 5: Get OAuth credentials

To get the refresh token required for Airbyte configuration:

1. Use the OAuth 2.0 authorisation flow with your Client ID and Client Secret
2. Request these scopes: `https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/User.Read offline_access`
3. After user consent, exchange the authorisation code for an access token and refresh token
4. Save the refresh token for your Airbyte configuration

For detailed OAuth flow instructions, see [Get access on behalf of a user](https://learn.microsoft.com/en-us/graph/auth-v2-user).

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `client_id` | `string` | OAuth Client ID. The Client ID of your Microsoft Azure application |  |
| `tenant_id` | `string` | Tenant ID (Optional). Azure AD Tenant ID (optional for multi-tenant apps, defaults to &#39;common&#39;) | common |
| `client_secret` | `string` | OAuth Client Secret. The Client Secret of your Microsoft Azure application |  |
| `refresh_token` | `string` | Refresh Token. Refresh token obtained from Microsoft OAuth flow |  |

## Streams

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| profile |  | No pagination | ✅ |  ❌  |
| mailboxes | id | DefaultPaginator | ✅ |  ❌  |
| messages | id | DefaultPaginator | ✅ |  ❌  |
| messages_details | id | No pagination | ✅ |  ❌  |
| conversations | conversationId | DefaultPaginator | ✅ |  ❌  |

### Stream details

`messages`: Retrieves every message from the signed-in user's mailbox through the `/me/messages` endpoint. It includes Inbox, Sent Items, Deleted Items and other mail folders.

`mailboxes`: Retrieves information about mail folders in the user's mailbox.

`profile`: Retrieves the signed-in user's profile information.

`conversations`: Retrieves conversation threads from the user's mailbox.

`messages_details`: Retrieves detailed information about individual messages.

## Filters and limitations

You can't currently filter emails by these criteria:

- Specific mailbox or folder path
- Email subject
- Sender or recipient
- Date ranges

The connector retrieves every message from the signed-in user's mailbox through the `/me/messages` endpoint. Microsoft Graph API supports OData query parameter filtering, including `$filter`. However, the connector doesn't currently provide these parameters as configuration options.

After extraction, you can filter messages in these ways:

- Use [Airbyte Mappings](/platform/using-airbyte/mappings) to filter rows by field values
- Apply filters in your data warehouse or transformation tool after syncing
- Use Microsoft Graph API directly with custom filtering parameters

For more information about Microsoft Graph Mail API capabilities, see the [Microsoft Graph Mail API documentation](https://learn.microsoft.com/en-us/graph/api/user-list-messages).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.39 | 2026-11-10 | [91668](https://github.com/airbytehq/airbyte/pull/91668) | Update dependencies |
| 0.0.38 | 2026-11-03 | [90668](https://github.com/airbytehq/airbyte/pull/90668) | Update dependencies |
| 0.0.37 | 2026-10-27 | [90017](https://github.com/airbytehq/airbyte/pull/90017) | Update dependencies |
| 0.0.36 | 2026-10-20 | [89353](https://github.com/airbytehq/airbyte/pull/89353) | Update dependencies |
| 0.0.35 | 2026-10-13 | [88740](https://github.com/airbytehq/airbyte/pull/88740) | Update dependencies |
| 0.0.34 | 2026-10-06 | [87966](https://github.com/airbytehq/airbyte/pull/87966) | Update dependencies |
| 0.0.33 | 2026-09-29 | [87290](https://github.com/airbytehq/airbyte/pull/87290) | Update dependencies |
| 0.0.32 | 2026-09-22 | [86749](https://github.com/airbytehq/airbyte/pull/86749) | Update dependencies |
| 0.0.31 | 2026-09-15 | [86159](https://github.com/airbytehq/airbyte/pull/86159) | Update dependencies |
| 0.0.30 | 2026-09-08 | [85608](https://github.com/airbytehq/airbyte/pull/85608) | Update dependencies |
| 0.0.29 | 2026-08-18 | [84714](https://github.com/airbytehq/airbyte/pull/84714) | Update dependencies |
| 0.0.28 | 2026-08-11 | [84064](https://github.com/airbytehq/airbyte/pull/84064) | Update dependencies |
| 0.0.27 | 2026-08-04 | [83570](https://github.com/airbytehq/airbyte/pull/83570) | Update dependencies |
| 0.0.26 | 2026-07-28 | [83050](https://github.com/airbytehq/airbyte/pull/83050) | Update dependencies |
| 0.0.25 | 2026-07-21 | [82529](https://github.com/airbytehq/airbyte/pull/82529) | Update dependencies |
| 0.0.24 | 2026-07-14 | [81937](https://github.com/airbytehq/airbyte/pull/81937) | Update dependencies |
| 0.0.23 | 2026-06-30 | [81193](https://github.com/airbytehq/airbyte/pull/81193) | Update dependencies |
| 0.0.22 | 2026-06-23 | [80580](https://github.com/airbytehq/airbyte/pull/80580) | Update dependencies |
| 0.0.21 | 2026-06-16 | [79998](https://github.com/airbytehq/airbyte/pull/79998) | Update dependencies |
| 0.0.20 | 2026-06-09 | [79429](https://github.com/airbytehq/airbyte/pull/79429) | Update dependencies |
| 0.0.19 | 2026-06-02 | [78902](https://github.com/airbytehq/airbyte/pull/78902) | Update dependencies |
| 0.0.18 | 2026-04-28 | [77353](https://github.com/airbytehq/airbyte/pull/77353) | Update dependencies |
| 0.0.17 | 2026-04-21 | [76688](https://github.com/airbytehq/airbyte/pull/76688) | Update dependencies |
| 0.0.16 | 2026-03-17 | [74968](https://github.com/airbytehq/airbyte/pull/74968) | Update dependencies |
| 0.0.15 | 2026-03-03 | [73816](https://github.com/airbytehq/airbyte/pull/73816) | Update dependencies |
| 0.0.14 | 2026-01-20 | [72166](https://github.com/airbytehq/airbyte/pull/72166) | Update dependencies |
| 0.0.13 | 2026-01-14 | [71676](https://github.com/airbytehq/airbyte/pull/71676) | Update dependencies |
| 0.0.12 | 2025-12-18 | [70526](https://github.com/airbytehq/airbyte/pull/70526) | Update dependencies |
| 0.0.11 | 2025-11-25 | [70123](https://github.com/airbytehq/airbyte/pull/70123) | Update dependencies |
| 0.0.10 | 2025-11-18 | [69707](https://github.com/airbytehq/airbyte/pull/69707) | Update dependencies |
| 0.0.9 | 2025-10-29 | [69010](https://github.com/airbytehq/airbyte/pull/69010) | Update dependencies |
| 0.0.8 | 2025-10-21 | [68311](https://github.com/airbytehq/airbyte/pull/68311) | Update dependencies |
| 0.0.7 | 2025-10-14 | [67772](https://github.com/airbytehq/airbyte/pull/67772) | Update dependencies |
| 0.0.6 | 2025-10-07 | [67343](https://github.com/airbytehq/airbyte/pull/67343) | Update dependencies |
| 0.0.5 | 2025-09-30 | [66389](https://github.com/airbytehq/airbyte/pull/66389) | Update dependencies |
| 0.0.4 | 2025-09-09 | [65826](https://github.com/airbytehq/airbyte/pull/65826) | Update dependencies |
| 0.0.3 | 2025-08-23 | [65161](https://github.com/airbytehq/airbyte/pull/65161) | Update dependencies |
| 0.0.2 | 2025-08-15 | [64942](https://github.com/airbytehq/airbyte/pull/64942) | Fix docker image entrypoint for platform syncs |
| 0.0.1 | 2025-08-14 | | Initial release by [@saif-qureshi-341](https://github.com/saif-qureshi-341) via Connector Builder |

</details>
