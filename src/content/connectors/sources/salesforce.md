---
generated_record: true
connector_name: Salesforce
connector_type: source
connector_slug: salesforce
connector_directory: source-salesforce
definition_id: b117307c-14b6-41aa-9422-947e34922962
version: 2.11.1
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/salesforce
logo: /images/connectors/sources/salesforce.svg
logo_source_path: airbyte-integrations/connectors/source-salesforce/icon.svg
logo_sha256: 657b7021cbda40e02e6e5ae8df94973e070ceee8d126025578d69af6b6472c04
original_metadata_path: airbyte-integrations/connectors/source-salesforce/metadata.yaml
original_metadata_sha256: bd0db0f016e6a7cf6a75bf4d7fde45b57e1d8e88600250d6193397574bed611d
original_document_path: docs/integrations/sources/salesforce.md
original_document_sha256: 3bf5b865f2acd225de4ceeeb89c8e2412fd7215fb885e30242cf5824ca21ea0c
rewrite_status: review
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 523283a29dfa7d0ae64ad1c28b7e586f4bc2e66a1620e83bbb3fd271e711a46a
rewritten_at: 2026-11-12T13:56:40.744192+00:00
---

# Salesforce

<HideInUI>

Use this page to set up and reference the [Salesforce](https://www.salesforce.com/) source connector.

</HideInUI>

## Prerequisites

- A [Salesforce Account](https://login.salesforce.com/) with Enterprise edition **or** Professional edition with API access purchased as an add-on

You may also need the following items. This article explains how to get them.

- Optional but recommended: A dedicated [Salesforce user](https://help.salesforce.com/s/articleView?id=adding_new_users.htm&type=5&language=en_US)
- For **ClientCredentials** (Use your own External Client App), a local External Client App configured for the client credentials flow and a My Domain URL
<!-- env:oss -->
- For Airbyte Open Source: Salesforce [OAuth](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_tokens_scopes.htm&type=5) credentials
<!-- /env:oss -->

## Setup

### Set up Salesforce

#### Create a dedicated Salesforce user (optional but recommended) {#dedicated-salesforce-user}

Create a Minimum Access standard profile, then assign custom permission sets. These give the new user read access to the required data.

You can use any Salesforce user with read permission. However, a dedicated user with the Minimum Access standard profile gives you granular control.

Use Permission Sets to give this user read access to the data Airbyte needs. Learn more about Permission sets in [Salesforce's documentation](https://help.salesforce.com/s/articleView?id=sf.perm_sets_overview.htm&type=5). To sync Salesforce permissions data, you also need the [permissions necessary to sync security-related data](#permissions-to-sync-permissions).

[Log in to Salesforce](https://login.salesforce.com/) with an admin account.

##### Step 1: Create a user

1. Click the gear icon in the top-right corner, then click **Setup**.
2. In the left navigation bar, under Administration, click **Users** > **Users**.
3. Create a new User. Enter the user's first name, last name, alias and email.
4. Entering the email automatically fills the username and nickname fields.
      1. Leave `role` unspecified
      2. Select `Salesforce` for the User License
      3. Select `Standard User` for Profile.
      4. Choose whether to generate a new password and notify the user.
      5. Select `save`

##### Step 2: Create a permission set

1. In the left navigation bar, select **Users** > **Permission Sets**.
2. Click `New` to create a Permission Set.
3. Give your permission set a descriptive label, such as "Airbyte Read Only Access". The API name fills automatically from this label.
4. For licence, leave `–None—` selected and click `save`.
5. After creating the permission set, define its permissions through Object Settings.
   1. Click "Object Settings."
   2. Select the `Object Name` for each object requiring read-only access, such as Accounts, Contacts and Opportunities.
   3. Select “Edit”, check the "Read" permission and clear every other permission, including Create, Edit and Delete.
   4. Click `Save`
   5. Continue adding read permissions for every object Airbyte needs to access.
6. Enable an additional permission to access uninstalled connected apps.
   1. Click "System Permissions"
   2. Select “Edit”
   3. If [API Access Control](https://help.salesforce.com/s/articleView?id=xcloud.security_api_access_control_about.htm&language=en_US&type=5) is enabled, check the "Use Any API Client" permission.
   4. If API Access Control isn't enabled, check the “Approve Uninstalled Connected Apps” permission.
   5. Click `Save`

##### Step 3: Assign the permission set

1. On the Permission Sets page, click "Manage Assignments" beside your new read-only permission set.
2. Click "Add Assignments."
3. Find and select the user you created in Step 1.
4. Click `Assign`

Open the email account you used and verify your new Salesforce user. You'll set a password during this process. Keep it accessible.

:::info
**Profile vs. Permission Set:** The user's profile provides their baseline permissions. The permission set adds or restricts permissions beyond that baseline.
**Object-Level vs. Field-Level Security:** This guide covers object-level read-only access. You can use object-level security or set more granular controls.
Within each object settings page, scroll down and select read access for only the required fields.
:::

<!-- env:oss -->

#### Get Salesforce OAuth credentials (Airbyte Open Source only)

To authenticate with Airbyte Open Source, get these OAuth credentials:

- Client ID
- Client Secret
- Refresh Token

Use credentials from an existing OAuth app with **Client** (Airbyte Connected App). Salesforce no longer allows new Connected Apps from Spring '26. For a new app, follow [Use your own External Client App (client credentials)](#use-your-own-external-client-app-client-credentials) below. Set **Authentication Method** to **ClientCredentials** (Use your own External Client App). This method doesn't require a refresh token.

<!-- /env:oss -->

### Use your own External Client App {#use-your-own-external-client-app-client-credentials}

Create a local External Client App (ECA) in your Salesforce org. This connects without an Airbyte-managed OAuth app or refresh token:

1. Create or choose a dedicated integration user for the **Run As** user.
   Give it read access to the objects and fields you want to sync. See [Create a dedicated Salesforce user](#dedicated-salesforce-user).
2. In Salesforce Setup, search for **External Client App Manager**, then click **New External Client App**.
   Under **Basic Information**, enter an app name and contact email. Keep the suggested API name and set **Distribution State** to **Local**.
   See Salesforce's [External Client App creation guide](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/eca-create.html).
3. Enable OAuth for the app. The form requires a **Callback URL**.
   Enter a placeholder because the client credentials flow doesn't use it. Under **Available OAuth Scopes**, add **Manage user data via APIs (`api`)**.
   You don't need the `web` and `refresh_token, offline_access` scopes. See Salesforce's [OAuth settings guide](https://help.salesforce.com/s/articleView?id=sf.configure_external_client_app_oauth_settings.htm&language=en_US) and [client credentials flow guide](https://help.salesforce.com/s/articleView?id=xcloud.remoteaccess_oauth_client_credentials_flow.htm&language=en_US&type=5).
4. In the app's **Settings**, enable **Client Credentials Flow** and save the change.
5. In **External Client App Manager**, open the app's actions list and select **Edit Policies**.
   In the client credentials policy, enable **Client Credentials Flow** if needed. Set **Run As** to the integration user's username and save the policies.
   See Salesforce's [External Client App client credentials policy guide](https://help.salesforce.com/s/articleView?id=xcloud.policies_configure_client_credentials_flow_for_external_client_apps.htm&language=en_US&type=5).
   Client-credentials policy changes for Connected Apps can take several minutes to propagate. Allow time before testing ([Salesforce guidance](https://help.salesforce.com/s/articleView?id=000886201&language=en_US&type=1)).
6. In **External Client App Manager**, open the app's actions list and select **Edit Settings**.
   Expand **OAuth Settings**, then select **Consumer Key and Secret** to copy the consumer key and secret.
   Salesforce might ask you to verify your identity before displaying them. See the [client credentials flow guide](https://help.salesforce.com/s/articleView?id=xcloud.remoteaccess_oauth_client_credentials_flow.htm&language=en_US&type=5).
7. In Setup, search for **My Domain** and open it. Copy your org's URL.
   A production URL looks like `https://acme.my.salesforce.com`. A sandbox URL looks like `https://acme--uat.sandbox.my.salesforce.com`.
   Salesforce explains where to find this URL in its [client credentials flow guide](https://help.salesforce.com/s/articleView?id=xcloud.remoteaccess_oauth_client_credentials_flow.htm&language=en_US&type=5).
8. In Airbyte, set **Authentication Method** to **ClientCredentials** (Use your own External Client App; selected by default).
   Enter the My Domain URL, consumer key (Client ID) and consumer secret (Client Secret).

Salesforce classifies this flow as high-risk because the key and secret alone grant access. Use a least-privilege integration user. Stream discovery shows only objects and fields the Run As user can read. `is_sandbox` doesn't select the org for ClientCredentials. The My Domain URL selects it. A sandbox refresh doesn't copy locally created External Client Apps. Recreate the app in the refreshed sandbox.

This method doesn't use a refresh token. Salesforce's 30-day idle refresh-token expiry therefore doesn't apply.

### Set up the connector in Airbyte

<!-- env:cloud -->

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Salesforce from the Source type dropdown.
4. Enter a name for the Salesforce connector.
5. Set **Authentication Method** to one of these options:
   - **ClientCredentials** (Use your own External Client App; selected by default): Enter your My Domain URL, Client ID (consumer key), and Client Secret (consumer secret) from your External Client App.
   - **Client** (Airbyte Connected App): Click **Authenticate your account** to authorise your Salesforce account. Airbyte authenticates the Salesforce account you're already signed in to. Confirm it's the correct account.
6. The **Sandbox** toggle applies only to **Client** (Airbyte Connected App). For **ClientCredentials**, your My Domain URL selects the org.
7. (Optional) For **Start Date**, use the datepicker or enter the date in `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ` format.
   Data added on or after this date will be replicated. If blank, Airbyte replicates the previous two years by default.
   Timestamps use [UTC](https://www.utctime.net/).
8. (Optional) For **End Date**, use the datepicker or enter the date in `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ` format.
   Incremental streams replicate data updated before this date. This exclusive bound means a date-only value excludes the named day from midnight UTC.
   Full refresh streams ignore this field and replicate all data. If blank, Airbyte replicates data up to the current time.
   Timestamps use [UTC](https://www.utctime.net/).
9. (Optional) Use the **Filter Salesforce Object** section to target specific data for replication.
   Click **Add**, then select the relevant criteria from the **Search criteria** dropdown. For **Search value**, add your relevant search terms.
   You can add multiple filters. Without filters, Airbyte replicates all data.
10. (Optional) For **Lookback Window**, enter an ISO 8601 duration, such as `PT10M`, `PT30M` or `PT1H`.
    This controls how far back the connector rereads data during each incremental sync. The default is `PT10M` (10 minutes).
    Increase this value if records are missing from your destination. Salesforce API eventual consistency delays can cause this issue.
11. (Optional) Enable **Preserve "NA" and similar string values** to preserve literal strings such as `NA`, `N/A`, `NULL`, `None` or `NaN`.
    Otherwise, these strings sync as null. This setting applies only to streams synced through the Bulk API.
    REST-synced streams already preserve these values. The setting is off by default, so these strings are treated as null.
    See [Preserving "NA" string values](#preserving-na-string-values) for details.
12. Click **Set up source** and wait for the tests to finish.

<!-- /env:cloud -->

<!-- env:oss -->

#### Airbyte Open Source

1. Open the Airbyte Open Source dashboard.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **Salesforce** from the available sources.
4. Enter a recognisable **Source name** for this source.
5. Set **Authentication Method** to one of these options:
   - **ClientCredentials** (Use your own External Client App; selected by default): Enter your My Domain URL, Client ID (consumer key), and Client Secret (consumer secret) from your External Client App.
   - **Client** (Airbyte Connected App): Enter your Client ID, Client Secret, and Refresh Token.
6. The **Sandbox** toggle applies only to **Client** (Airbyte Connected App). For **ClientCredentials**, your My Domain URL selects the org.
7. (Optional) For **Start Date**, use the datepicker or enter the date in `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ` format.
   Data added on or after this date will be replicated. If blank, Airbyte replicates the previous two years by default.
   Timestamps use [UTC](https://www.utctime.net/).
8. (Optional) For **End Date**, use the datepicker or enter the date in `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ` format.
   Incremental streams replicate data updated before this date. This exclusive bound means a date-only value excludes the named day from midnight UTC.
   Full refresh streams ignore this field and replicate all data. If blank, Airbyte replicates data up to the current time.
   Timestamps use [UTC](https://www.utctime.net/).
9. (Optional) Use the **Filter Salesforce Object** section to target specific data for replication.
   Click **Add**, then select the relevant criteria from the **Search criteria** dropdown. For **Search value**, add your relevant search terms.
   You can add multiple filters. Without filters, Airbyte replicates all data.
10. (Optional) For **Lookback Window**, enter an ISO 8601 duration, such as `PT10M`, `PT30M` or `PT1H`.
    This controls how far back the connector rereads data during each incremental sync. The default is `PT10M` (10 minutes).
    Increase this value if records are missing from your destination. Salesforce API eventual consistency delays can cause this issue.
11. (Optional) Enable **Preserve "NA" and similar string values** to preserve literal strings such as `NA`, `N/A`, `NULL`, `None` or `NaN`.
    Otherwise, these strings sync as null. This setting applies only to streams synced through the Bulk API.
    REST-synced streams already preserve these values. The setting is off by default, so these strings are treated as null.
    See [Preserving "NA" string values](#preserving-na-string-values) for details.
12. Click **Set up source** and wait for the tests to finish.

<!-- /env:oss -->

<HideInUI>

## Supported sync modes

The Salesforce source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- **[Incremental Sync - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped) (recommended to handle Salesforce's [daily rate limits](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm))**
- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental Sync - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)

## Supported streams

The Salesforce connector reads Standard Objects and Custom Objects from Salesforce. It reads each object as a separate stream. See all Salesforce Standard Objects [here](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_list.htm).

Airbyte dynamically exports available Salesforce objects based on these conditions:

- The authenticated Salesforce user has the Role and Permissions required to read and fetch objects.
  Set these through the Permission Set assigned to the Airbyte user. See [Create a dedicated Salesforce user](#dedicated-salesforce-user) for details.
- The Salesforce object's queryable property is set to true. Airbyte can only fetch queryable objects.
  If a queryable object isn't available in Airbyte, check the authenticated Salesforce user's API access.

## Sync permissions data

The Salesforce connector can sync security-related objects. Use this data to understand user permissions, roles and access patterns within your Salesforce organisation.

Common uses for Salesforce permissions data include:

- **Permission Replication**: Use Salesforce source permissions to guide downstream permissions.
- **Security Auditing**: Create reports about user access rights and permission assignments.

### Security-related streams

These streams contain security and permissions data:

- **[`User`](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_user.htm)**: Core user accounts with security fields, including profiles, roles and user permissions. Includes user status, login history and assigned licences.
- **[`ActivePermSetLicenseMetric`](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_activepermsetlicensemetric.htm)**: Permission set licence usage metrics, including assigned users, active users and total available licences.
- **[`ActiveProfileMetric`](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_activeprofilemetric.htm)**: User profile usage metrics, including user licence associations and assignment counts.

For full details about Salesforce security objects, see the [Salesforce Object Reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_concepts.htm) documentation.

### How permissions syncing works

Salesforce provides some security-related data through its standard object model:

1. **Dynamic Object Discovery**: The connector automatically discovers available Salesforce objects (sobjects) based on the authenticated user's permissions.
2. **Permission-Based Access**: Available security objects depend on the authenticated user's permissions and your Salesforce environment configuration.
3. **Standard Object Syncing**: Available security-related objects sync as regular Salesforce objects through the same mechanisms as other business data.

:::note
Security-related object availability varies by Salesforce environment, including production and sandbox, and by user permissions.
Security objects can contain large datasets when you have many users. Monitor your Salesforce API limits accordingly.
:::

### Permissions required {#permissions-to-sync-permissions}

The authenticated Salesforce user needs permission to read security objects. Consider granting these permissions through a dedicated permission set:

   - "View All Users": Required to access comprehensive User data.
   - Standard read permissions for the specific objects you want to sync.

For more about Salesforce security and permissions, see the official Salesforce documentation on [User Permissions](https://help.salesforce.com/s/articleView?id=sf.admin_userperms.htm&type=5) and [Permission Sets](https://help.salesforce.com/s/articleView?id=sf.perm_sets_overview.htm&type=5).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Limitations and troubleshooting

### Connection test login failures

- **Expired or revoked authentication / `invalid_grant`**: Re-authenticate the source.
  Check **Sandbox** (`is_sandbox`). Sandbox organisations authenticate through `test.salesforce.com`, while production organisations use `login.salesforce.com`.
- **Invalid Connected App credentials / `invalid_client_id` or `invalid_client`**:
  Compare the OAuth client ID and client secret in the source settings with the Connected App.
- **API access disabled / `API_DISABLED_FOR_ORG`**: Use a Salesforce edition that supports API access. Give the authenticated user the **API Enabled** permission.
- **IP restrictions / `LOGIN_MUST_USE_SECURITY_TOKEN`**: Allowlist the Airbyte deployment's outbound IP addresses.
  Alternatively, update the Connected App **IP Relaxation** policy to meet your security requirements.
  For Airbyte Cloud, use the addresses linked in [IP allow list](#ip-allow-list).

<details>
<summary>
Expand to see details about Salesforce connector limitations and troubleshooting.
</summary>

### Connector limitations

#### Rate limits

Salesforce's [Daily Rate Limits](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm) restricts the connector. It syncs until reaching the daily rate limit, then ends early with a successful status. The next sync continues where it stopped. This continuation works only with incremental syncs, so use the [Incremental Sync - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped) sync mode.

### Sync formula fields

The Salesforce connector syncs formula field outputs. If a formula changes without another field update, reset the stream. Then sync a historical backfill to retrieve every updated field value.

### Sync deleted records

The Salesforce connector retrieves deleted records from the Salesforce recycle bin. Supported streams mark deleted records with `isDeleted=true`. To learn how Salesforce manages recycle bin records, see [docs](https://help.salesforce.com/s/articleView?id=sf.home_delete.htm&type=5).

### BULK API and REST API usage

Salesforce extracts data through either the [BULK API](https://developer.salesforce.com/docs/atlas.en-us.236.0.api_asynch.meta/api_asynch/asynch_api_intro.htm) or [REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm). Salesforce recommends the BULK API for faster extraction above 2,000 records. The connector therefore uses the BULK API by default for Salesforce objects, except under these conditions:

- The Salesforce object contains columns unsupported by the BULK API, such as `base64` or `complexvalue` types.
- The BULK API doesn't support the Salesforce object. The connector then syncs it through the REST API.
  This can sometimes consume more of your API quota. Affected objects include:
  - AcceptedEventRelation
  - Attachment
  - CaseStatus
  - ContractStatus
  - DeclinedEventRelation
  - FieldSecurityClassification
  - KnowledgeArticle
  - KnowledgeArticleVersion
  - KnowledgeArticleVersionHistory
  - KnowledgeArticleViewStat
  - KnowledgeArticleVoteStat
  - OrderStatus
  - PartnerRole
  - RecentlyViewed
  - ServiceAppointmentStatus
  - ShiftStatus
  - SolutionStatus
  - TaskPriority
  - TaskStatus
  - UndecidedEventRelation

For more about the differences between Salesforce APIs, see [here](https://help.salesforce.com/s/articleView?id=sf.integrate_what_is_api.htm&type=5).

:::info Force Using Bulk API
Set `Force Use Bulk API` to `true` to ignore unsupported properties and sync streams through BULK API.
:::

### Session expiry during long Bulk API syncs

Salesforce access tokens expire after a configurable session timeout, which defaults to two hours. Before connector version 2.7.20, long Bulk API syncs could fail with `INVALID_SESSION_ID` errors. The connector captured the access token once at sync start and didn't refresh it. From version 2.7.20, the connector refreshes the access token every 30 minutes. This occurs well before the default session timeout. If a session ends between refreshes, the connector detects the `INVALID_SESSION_ID` response. It then immediately refreshes the token before retrying.

If `INVALID_SESSION_ID` errors continue, confirm that you're running connector version 2.7.20 or later.

### Session expiry during REST pagination

Streams that can't use the Bulk API use the REST `queryAll` endpoint. These include objects with compound fields, such as addresses. The connector paginates them with `nextRecordsUrl`. Before version 2.10.3, REST streams used the access token captured when the stream was created. They couldn't refresh it or use a token refreshed by another stream. If the session ended during a sync, the REST stream continued retrying with the expired token. This could happen after the proactive refresh above when Refresh Token Rotation was enabled. The sync then failed with `Exhausted available request attempts ... Salesforce session expired or invalid`.

From version 2.10.3, REST streams read the current access token for every request and retry. They therefore use refreshes made by any stream. They don't initiate the 30-minute refresh. If their session ends, the `INVALID_SESSION_ID` response forces a token refresh before retrying. Salesforce retains query results for the same user across sessions. The retried `nextRecordsUrl` therefore continues where the stream stopped. If Salesforce rejects the refresh, the sync fails immediately with a configuration error asking you to re-authenticate. It doesn't exhaust its retries.

### Refresh Token Rotation (RTR)

Salesforce's [Refresh Token Rotation](https://help.salesforce.com/s/articleView?id=xcloud.shr_security_enable_refresh_token_rotation.htm&language=en_US&type=5) makes refresh tokens **single-use**. Each `refresh_token` exchange returns a new refresh token and **immediately invalidates the previous one**, without a grace period or overlap window. From version 2.8.0, the connector captures the rotated token after every token exchange. This includes initial login and the mid-sync refreshes described above. It saves the token to the connection configuration, allowing syncs to continue with RTR enabled.

From 4 November 2026, Salesforce expires refresh tokens after 30 inactive days. This affects the Client method, but not ClientCredentials. ClientCredentials doesn't use refresh tokens. For External Client Apps created since July 2026, Salesforce permanently enables refresh token rotation.

**Enable the connector support before enabling RTR on the app.** Invalidation happens immediately. Enabling **Enable Refresh Token Rotation** while a connection uses a pre-2.8.0 connector will break it at the next token exchange. It will authenticate with an already invalidated token and require re-authentication. Follow this order:

1. Upgrade the Salesforce source to 2.8.0 or later. On Airbyte Cloud, wait until the rollout reaches your workspace.
2. Then enable **Enable Refresh Token Rotation** on the connected app / External Client App.

Responsibility for the connected-app setting depends on your authentication method:

- **Airbyte Cloud (default OAuth):** the connected app is managed by Airbyte.
- **Airbyte Open Source / bring-your-own OAuth app:** you own the connected app. After upgrading the connector, you're responsible for enabling RTR.

**Known limitations.** Salesforce provides no grace window. Therefore, two edge cases remain inherent to RTR and can't be fully prevented:

- The pre-save **Test connection** button rotates the token but can't save the new one because the connection doesn't exist yet.
  This invalidates the token you just entered. Complete the connection setup promptly after testing.
  Re-authenticate if a later sync reports an authentication error.
- Running a manual **check** during a sync on the same source can race two rotations and invalidate one.
  Don't start a connection test while a sync is running.

### ClientCredentials authentication errors

| Error message | Resolution |
|:--------------|:-----------|
| Salesforce accepts client credentials only at your org's My Domain URL. Enter the URL shown in Salesforce Setup under My Domain. | Use the My Domain URL from Salesforce Setup, not `login.salesforce.com` or `test.salesforce.com`. |
| Salesforce doesn't recognize the Client ID. Enter the consumer key of your External Client App. | Check the External Client App's consumer key. |
| Salesforce rejected the Client Secret. Enter the consumer secret of your External Client App. | Check the External Client App's consumer secret. |
| The External Client App has no Run As user for the client credentials flow. Set Run As to your integration user in the app's policies. | Set **Run As** in the app's Policies. |
| My Domain URL is required for the ClientCredentials method. Enter the URL shown in Salesforce Setup under My Domain. | Enter your Salesforce My Domain URL. |
| Client ID and Client Secret are not set for the ClientCredentials method. Enter the consumer key and consumer secret of your External Client App. | Enter both External Client App credentials. |
| Refresh Token is missing for the Client method. Authenticate your Salesforce account, or select ClientCredentials. | Re-authenticate with **Client** (Airbyte Connected App) or set **Authentication Method** to **ClientCredentials** (Use your own External Client App). |
| Salesforce rejected the client credentials. Check Client ID, Client Secret and My Domain URL against your External Client App. | Verify the app credentials and My Domain URL. |

### OAuth authorisation with required PKCE

Salesforce lets admins require the [Proof Key for Code Exchange (PKCE)](https://help.salesforce.com/s/articleView?id=xcloud.shr_security_require_proof_key_for_code_exchange_pkce.htm&type=5) extension for OAuth authorisation flows, either across the org or on the connected app. Before connector version 2.9.1, authorisation failed in orgs requiring PKCE because requests omitted `code_challenge`. From version 2.9.1, the connector sends a `code_challenge` using the S256 method in the authorisation request. It sends the matching `code_verifier` during the token exchange. Authorisation therefore works whether your org requires PKCE or not. You don't need to change the configuration.

### Missing records from eventual consistency

Salesforce doesn't guarantee immediate API access to recently created or updated records. A record may have its `SystemModStamp` set before the underlying transaction commits. During an incremental sync, the connector can move its cursor beyond these records. Later syncs can then miss them permanently.

**Symptoms:**

- Records are missing from the destination but appear when you query Salesforce directly
- The same source has no missing records when synced later to another destination
- Sync logs contain no errors

**Solution:** Increase the **Lookback Window** in the connector configuration. This controls how far the connector rereads data from the previous cursor position during each incremental sync. The default is `PT10M` (10 minutes). If records are missing, try `PT30M` (30 minutes) or `PT1H` (1 hour). The connector uses append-dedup mode, so rereading overlapping data doesn't create destination duplicates.

The lookback window uses ISO 8601 duration format. The format is `PT<number><unit>`. Here, `P` starts the duration and `T` separates date and time components. Common examples:

| Value  | Meaning    |
|:-------|:-----------|
| PT10M  | 10 minutes |
| PT30M  | 30 minutes |
| PT1H   | 1 hour     |
| PT2H   | 2 hours    |
| P1D    | 1 day      |

### Preserve "NA" string values {#preserving-na-string-values}

When using the Bulk API, the connector downloads results as CSV. By default, it interprets `NA`, `N/A`, `NULL`, `None`, `NaN`, `null` and `#N/A` as missing values. It then syncs them as `null`. This can affect data correctness when the string is a valid value. For example, `NA` might mean "North America" in a picklist.

**Symptoms:**

- A Salesforce field containing `NA`/`N/A` or a similar value becomes `null` in the destination
- This affects only streams synced through the Bulk API. See [Usage of the BULK API vs REST API](#usage-of-the-bulk-api-vs-rest-api). REST-synced streams aren't affected.

**Solution:** Enable **Preserve "NA" and similar string values** in the connector configuration using config field `preserve_na_values`. This preserves these strings while empty cells still sync as `null`. The option is **off by default** to preserve the connector's historical behaviour. After enabling it, refresh the affected streams to backfill the corrected values.

</details>

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--- | :----------- | :------ |
| 2.11.1 | 2026-11-09 | [91215](https://github.com/airbytehq/airbyte/pull/91215) | Add request timeouts and TCP keepalive so a stalled connection no longer hangs the sync |
| 2.11.0 | 2026-10-23 | [89735](https://github.com/airbytehq/airbyte/pull/89735) | Add the ClientCredentials authentication method (Use your own External Client App) as the default, alongside Client (Airbyte Connected App) |
| 2.10.5 | 2026-11-03 | [90894](https://github.com/airbytehq/airbyte/pull/90894) | Require Python 3.11 or newer, retaining support for Python 3.11–3.13. |
| 2.10.4 | 2026-10-30 | [90253](https://github.com/airbytehq/airbyte/pull/90253) | Explain Salesforce OAuth, API permission, and IP restriction failures with actionable guidance and sandbox login hints. |
| 2.10.3 | 2026-10-23 | [87665](https://github.com/airbytehq/airbyte/pull/87665) | Let REST streams use the refreshed access token, so a session invalidated mid-pagination no longer fails the sync, and mask rotated refresh tokens in logs |
| 2.10.2 | 2026-10-20 | [89072](https://github.com/airbytehq/airbyte/pull/89072) | Fix syncs hanging indefinitely when a Salesforce OAuth token refresh or describe request stalls, by adding a request timeout |
| 2.10.1 | 2026-10-20 | [89399](https://github.com/airbytehq/airbyte/pull/89399) | Update dependencies |
| 2.10.0 | 2026-10-15 | [89008](https://github.com/airbytehq/airbyte/pull/89008) | Upgrade to Python 3.13 and base image 4.1.1 |
| 2.9.3 | 2026-10-07 | [88170](https://github.com/airbytehq/airbyte/pull/88170) | Surface the underlying request error and retry, instead of failing with an `AttributeError`, when a Salesforce request raises a non-HTTP error such as an invalid URL |
| 2.9.2 | 2026-09-10 | [85166](https://github.com/airbytehq/airbyte/pull/85166) | Report a Salesforce field that no longer exists or is not accessible to the authenticated user as a configuration error naming the stream and field, instead of a system error containing the raw Salesforce response |
| 2.9.1 | 2026-08-27 | [85057](https://github.com/airbytehq/airbyte/pull/85057) | Send PKCE `code_challenge`/`code_challenge_method=S256` on the consent URL and `code_verifier` on the token exchange, so OAuth works in orgs that require PKCE |
| 2.9.0 | 2026-08-25 | [82722](https://github.com/airbytehq/airbyte/pull/82722) | Add an optional end date for bounded incremental syncs |
| 2.8.1 | 2026-08-05 | [82784](https://github.com/airbytehq/airbyte/pull/82784) | Fail fast when the refresh token is rejected instead of retrying the token endpoint from every stream |
| 2.8.0 | 2026-07-23 | [80892](https://github.com/airbytehq/airbyte/pull/80892) | Persist rotated refresh token to support Salesforce OAuth Refresh Token Rotation (RTR) |
| 2.7.26 | 2026-07-16 | [82225](https://github.com/airbytehq/airbyte/pull/82225) | Promoted release candidate to GA |
| 2.7.26-rc.1 | 2026-07-14 | [81535](https://github.com/airbytehq/airbyte/pull/81535) | Use ordered `ConcurrentMessageRepository` so state checkpoints are emitted in-order with records, preventing data loss (cursor advancing past uncommitted records) when a sync is terminated ungracefully |
| 2.7.25 | 2026-07-13 | [80307](https://github.com/airbytehq/airbyte/pull/80307) | Update cryptography to resolve CVEs (CVE-2026-26007, PYSEC-2026-35) |
| 2.7.24 | 2026-07-09 | [80738](https://github.com/airbytehq/airbyte/pull/80738) | Add optional `preserve_na_values` config toggle (default off) to keep 'NA'-like string values instead of converting them to null in Bulk API CSV parsing |
| 2.7.23 | 2026-05-21 | [78339](https://github.com/airbytehq/airbyte/pull/78339) | Add granular OAuth scopes (api, web, refresh_token, lightning) to consent URL |
| 2.7.22 | 2026-04-28 | [76978](https://github.com/airbytehq/airbyte/pull/76978) | Bump airbyte-cdk to ^7.17.4 |
| 2.7.21 | 2026-04-28 | [77132](https://github.com/airbytehq/airbyte/pull/77132) | Promoted release candidate to GA |
| 2.7.21-rc.1 | 2026-04-21 | [76389](https://github.com/airbytehq/airbyte/pull/76389) | Fix bulk job slicing by bypassing deprecated DeclarativeStream.stream_slices() after CDK 7.13+ upgrade |
| 2.7.20 | 2026-04-02 | [75201](https://github.com/airbytehq/airbyte/pull/75201) | Fix Bulk API INVALID_SESSION_ID by replacing static token provider with auto-refreshing SalesforceTokenProvider |
| 2.7.19 | 2026-03-31 | [75579](https://github.com/airbytehq/airbyte/pull/75579) | Add `oauth_connector_input_specification` for declarative OAuth with sandbox/production URL switching |
| 2.7.18 | 2026-02-25 | [73501](https://github.com/airbytehq/airbyte/pull/73501) | Skip time-based slicing for full refresh syncs |
| 2.7.17 | 2026-02-11 | [73235](https://github.com/airbytehq/airbyte/pull/73235) | Make lookback window configurable to address Salesforce API eventual consistency |
| 2.7.16 | 2025-10-29 | [69078](https://github.com/airbytehq/airbyte/pull/69078) | Promoting release candidate 2.7.16-rc.1 to a main version. |
| 2.7.16-rc.1 | 2025-10-27 | [67509](https://github.com/airbytehq/airbyte/pull/67509) | Minor performance tuning |
| 2.7.15 | 2025-10-22 | [68166](https://github.com/airbytehq/airbyte/pull/68166) | Add `ActivityFieldHistory` to `UNSUPPORTED_FILTERING_STREAMS` to fix missing records |
| 2.7.14 | 2025-10-21 | [68455](https://github.com/airbytehq/airbyte/pull/68455) | Update dependencies |
| 2.7.13 | 2025-10-14 | [60432](https://github.com/airbytehq/airbyte/pull/60432) | Update dependencies |
| 2.7.12 | 2025-09-15 | [66136](https://github.com/airbytehq/airbyte/pull/66136) | Update to CDK v7 |
| 2.7.11 | 2025-05-14 | [60271](https://github.com/airbytehq/airbyte/pull/60271) | Define suggested streams |
| 2.7.10 | 2025-05-10 | [60100](https://github.com/airbytehq/airbyte/pull/60100) | Update dependencies |
| 2.7.9 | 2025-05-04 | [59644](https://github.com/airbytehq/airbyte/pull/59644) | Update dependencies |
| 2.7.8 | 2025-04-27 | [58997](https://github.com/airbytehq/airbyte/pull/58997) | Update dependencies |
| 2.7.7 | 2025-04-19 | [58453](https://github.com/airbytehq/airbyte/pull/58453) | Update dependencies |
| 2.7.6 | 2025-04-12 | [57976](https://github.com/airbytehq/airbyte/pull/57976) | Update dependencies |
| 2.7.5 | 2025-04-05 | [57424](https://github.com/airbytehq/airbyte/pull/57424) | Update dependencies |
| 2.7.4 | 2025-03-27 | [53689](https://github.com/airbytehq/airbyte/pull/53689) | catch JSONDecodeError for error response |
| 2.7.3 | 2025-03-29 | [56776](https://github.com/airbytehq/airbyte/pull/56776) | Update dependencies |
| 2.7.2 | 2025-03-24 | [55898](https://github.com/airbytehq/airbyte/pull/55898) | Fix input state serialization issues |
| 2.7.1 | 2025-03-22 | [51921](https://github.com/airbytehq/airbyte/pull/51921) | Update dependencies |
| 2.7.0 | 2025-03-20 | [55186](https://github.com/airbytehq/airbyte/pull/55186) | Update manifest for adapting changes with AsyncRetriever |
| 2.6.5 | 2025-02-20 | [54178](https://github.com/airbytehq/airbyte/pull/54178) | Promoting release candidate 2.6.5-rc.1 to a main version. |
| 2.6.5-rc.1 | 2025-02-18 | [53229](https://github.com/airbytehq/airbyte/pull/53229) | Upgrade to API v62.0 |
| 2.6.4 | 2025-01-11 | [48635](https://github.com/airbytehq/airbyte/pull/48635) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 2.6.3 | 2024-11-05 | [46835](https://github.com/airbytehq/airbyte/pull/46835) | Update dependencies |
| 2.6.2       | 2024-10-10 | [](https://github.com/airbytehq/airbyte/pull/)           | Bump minimum CDK to 5.10.2                                                                                                                                             |
| 2.6.1       | 2024-10-05 | [46436](https://github.com/airbytehq/airbyte/pull/46436) | Update dependencies, including CDK fix in v5.10.2                                                                                                                      |
| 2.6.0       | 2024-10-02 | [45678](https://github.com/airbytehq/airbyte/pull/45678) | Have bulk streams use CDK components                                                                                                                                   |
| 2.5.34      | 2024-09-28 | [46187](https://github.com/airbytehq/airbyte/pull/46187) | Update dependencies                                                                                                                                                    |
| 2.5.33      | 2024-09-21 | [45779](https://github.com/airbytehq/airbyte/pull/45779) | Update dependencies                                                                                                                                                    |
| 2.5.32      | 2024-09-14 | [45579](https://github.com/airbytehq/airbyte/pull/45579) | Update dependencies                                                                                                                                                    |
| 2.5.31      | 2024-09-07 | [45329](https://github.com/airbytehq/airbyte/pull/45329) | Update dependencies                                                                                                                                                    |
| 2.5.30      | 2024-08-31 | [44959](https://github.com/airbytehq/airbyte/pull/44959) | Update dependencies                                                                                                                                                    |
| 2.5.29      | 2024-08-24 | [44747](https://github.com/airbytehq/airbyte/pull/44747) | Update dependencies                                                                                                                                                    |
| 2.5.28      | 2024-08-17 | [44327](https://github.com/airbytehq/airbyte/pull/44327) | Update dependencies                                                                                                                                                    |
| 2.5.27      | 2024-08-12 | [43732](https://github.com/airbytehq/airbyte/pull/43732) | Update dependencies                                                                                                                                                    |
| 2.5.26      | 2024-08-10 | [43673](https://github.com/airbytehq/airbyte/pull/43673) | Update dependencies                                                                                                                                                    |
| 2.5.25      | 2024-08-03 | [43211](https://github.com/airbytehq/airbyte/pull/43211) | Update dependencies                                                                                                                                                    |
| 2.5.24      | 2024-07-27 | [42685](https://github.com/airbytehq/airbyte/pull/42685) | Update dependencies                                                                                                                                                    |
| 2.5.23      | 2024-07-20 | [42166](https://github.com/airbytehq/airbyte/pull/42166) | Update dependencies                                                                                                                                                    |
| 2.5.22      | 2024-07-13 | [41752](https://github.com/airbytehq/airbyte/pull/41752) | Update dependencies                                                                                                                                                    |
| 2.5.21      | 2024-07-10 | [41529](https://github.com/airbytehq/airbyte/pull/41529) | Update dependencies                                                                                                                                                    |
| 2.5.20      | 2024-07-09 | [41255](https://github.com/airbytehq/airbyte/pull/41255) | Update dependencies                                                                                                                                                    |
| 2.5.19      | 2024-07-08 | [41043](https://github.com/airbytehq/airbyte/pull/41043) | Use the latest `CDK` version possible                                                                                                                                  |
| 2.5.18      | 2024-07-06 | [40835](https://github.com/airbytehq/airbyte/pull/40835) | Update dependencies                                                                                                                                                    |
| 2.5.17      | 2024-06-25 | [40329](https://github.com/airbytehq/airbyte/pull/40329) | Update dependencies                                                                                                                                                    |
| 2.5.16      | 2024-06-21 | [39927](https://github.com/airbytehq/airbyte/pull/39927) | Update dependencies                                                                                                                                                    |
| 2.5.15      | 2024-06-16 | [39517](https://github.com/airbytehq/airbyte/pull/39517) | Salesforce refactor: add CheckpointMixin for state management                                                                                                          |
| 2.5.14      | 2024-06-06 | [39269](https://github.com/airbytehq/airbyte/pull/39269) | [autopull] Upgrade base image to v1.2.2                                                                                                                                |
| 2.5.13      | 2024-05-23 | [38563](https://github.com/airbytehq/airbyte/pull/38563) | Use HttpClient to perform HTTP requests for bulk, authentication and schema discovery                                                                                  |
| 2.5.12      | 2024-05-16 | [38255](https://github.com/airbytehq/airbyte/pull/38255) | Replace AirbyteLogger with logging.Logger                                                                                                                              |
| 2.5.11      | 2024-05-09 | [38205](https://github.com/airbytehq/airbyte/pull/38205) | Use new delete method of HttpMocker for test_bulk_stream                                                                                                               |
| 2.5.10      | 2024-05-09 | [38065](https://github.com/airbytehq/airbyte/pull/38065) | Replace deprecated authentication mechanism to up-to-date one                                                                                                          |
| 2.5.9       | 2024-05-02 | [37749](https://github.com/airbytehq/airbyte/pull/37749) | Adding mock server tests for bulk streams                                                                                                                              |
| 2.5.8       | 2024-04-30 | [37340](https://github.com/airbytehq/airbyte/pull/37340) | Source Salesforce: reduce info logs                                                                                                                                    |
| 2.5.7       | 2024-04-24 | [36657](https://github.com/airbytehq/airbyte/pull/36657) | Schema descriptions                                                                                                                                                    |
| 2.5.6       | 2024-04-19 | [37448](https://github.com/airbytehq/airbyte/pull/37448) | Ensure AirbyteTracedException in concurrent CDK are emitted with the right type                                                                                        |
| 2.5.5       | 2024-04-18 | [37419](https://github.com/airbytehq/airbyte/pull/37419) | Ensure python return code != 0 in case of error                                                                                                                        |
| 2.5.4       | 2024-04-18 | [37392](https://github.com/airbytehq/airbyte/pull/37392) | Update CDK version to have partitioned state fix                                                                                                                       |
| 2.5.3       | 2024-04-17 | [37376](https://github.com/airbytehq/airbyte/pull/37376) | Improve rate limit error message during check command                                                                                                                  |
| 2.5.2       | 2024-04-15 | [37105](https://github.com/airbytehq/airbyte/pull/37105) | Raise error when schema generation fails                                                                                                                               |
| 2.5.1       | 2024-04-11 | [37001](https://github.com/airbytehq/airbyte/pull/37001) | Update airbyte-cdk to flush print buffer for every message                                                                                                             |
| 2.5.0       | 2024-04-11 | [36942](https://github.com/airbytehq/airbyte/pull/36942) | Move Salesforce to partitioned state in order to avoid stuck syncs                                                                                                     |
| 2.4.4       | 2024-04-08 | [36901](https://github.com/airbytehq/airbyte/pull/36901) | Upgrade CDK for empty internal_message empty when ExceptionWithDisplayMessage raised                                                                                   |
| 2.4.3       | 2024-04-08 | [36885](https://github.com/airbytehq/airbyte/pull/36885) | Add missing retry on REST API                                                                                                                                          |
| 2.4.2       | 2024-04-05 | [36862](https://github.com/airbytehq/airbyte/pull/36862) | Upgrade CDK for updated error messaging regarding missing streams                                                                                                      |
| 2.4.1       | 2024-04-03 | [36385](https://github.com/airbytehq/airbyte/pull/36385) | Retry HTTP requests and jobs on various cases                                                                                                                          |
| 2.4.0       | 2024-03-12 | [35978](https://github.com/airbytehq/airbyte/pull/35978) | Upgrade CDK to start emitting record counts with state and full refresh state                                                                                          |
| 2.3.3       | 2024-03-04 | [35791](https://github.com/airbytehq/airbyte/pull/35791) | Fix memory leak (OOM)                                                                                                                                                  |
| 2.3.2       | 2024-02-19 | [35421](https://github.com/airbytehq/airbyte/pull/35421) | Add Stream Slice Step option to specification                                                                                                                          |
| 2.3.1       | 2024-02-12 | [35147](https://github.com/airbytehq/airbyte/pull/35147) | Manage dependencies with Poetry.                                                                                                                                       |
| 2.3.0       | 2023-12-15 | [33522](https://github.com/airbytehq/airbyte/pull/33522) | Sync streams concurrently in all sync modes                                                                                                                            |
| 2.2.2       | 2024-01-04 | [33936](https://github.com/airbytehq/airbyte/pull/33936) | Prepare for airbyte-lib                                                                                                                                                |
| 2.2.1       | 2023-12-12 | [33342](https://github.com/airbytehq/airbyte/pull/33342) | Added new ContentDocumentLink stream                                                                                                                                   |
| 2.2.0       | 2023-12-12 | [33350](https://github.com/airbytehq/airbyte/pull/33350) | Sync streams concurrently on full refresh                                                                                                                              |
| 2.1.6       | 2023-11-28 | [32535](https://github.com/airbytehq/airbyte/pull/32535) | Run full refresh syncs concurrently                                                                                                                                    |
| 2.1.5       | 2023-10-18 | [31543](https://github.com/airbytehq/airbyte/pull/31543) | Base image migration: remove Dockerfile and use the python-connector-base image                                                                                        |
| 2.1.4       | 2023-08-17 | [29538](https://github.com/airbytehq/airbyte/pull/29538) | Fix encoding guess                                                                                                                                                     |
| 2.1.3       | 2023-08-17 | [29500](https://github.com/airbytehq/airbyte/pull/29500) | handle expired refresh token error                                                                                                                                     |
| 2.1.2       | 2023-08-10 | [28781](https://github.com/airbytehq/airbyte/pull/28781) | Fix pagination for BULK API jobs; Add option to force use BULK API                                                                                                     |
| 2.1.1       | 2023-07-06 | [28021](https://github.com/airbytehq/airbyte/pull/28021) | Several Vulnerabilities Fixes; switched to use alpine instead of slim, CVE-2022-40897, CVE-2023-29383, CVE-2023-31484, CVE-2016-2781                                   |
| 2.1.0       | 2023-06-26 | [27726](https://github.com/airbytehq/airbyte/pull/27726) | License Update: Elv2                                                                                                                                                   |
| 2.0.14      | 2023-05-04 | [25794](https://github.com/airbytehq/airbyte/pull/25794) | Avoid pandas inferring wrong data types by forcing all data type as object                                                                                             |
| 2.0.13      | 2023-04-30 | [25700](https://github.com/airbytehq/airbyte/pull/25700) | Remove pagination and query limits                                                                                                                                     |
| 2.0.12      | 2023-04-25 | [25507](https://github.com/airbytehq/airbyte/pull/25507) | Update API version to 57                                                                                                                                               |
| 2.0.11      | 2023-04-20 | [25352](https://github.com/airbytehq/airbyte/pull/25352) | Update API version to 53                                                                                                                                               |
| 2.0.10      | 2023-04-05 | [24888](https://github.com/airbytehq/airbyte/pull/24888) | Add more frequent checkpointing                                                                                                                                        |
| 2.0.9       | 2023-03-29 | [24660](https://github.com/airbytehq/airbyte/pull/24660) | Set default start_date. Sync for last two years if start date is not present in config                                                                                 |
| 2.0.8       | 2023-03-30 | [24690](https://github.com/airbytehq/airbyte/pull/24690) | Handle rate limit for bulk operations                                                                                                                                  |
| 2.0.7       | 2023-03-14 | [24071](https://github.com/airbytehq/airbyte/pull/24071) | Remove regex pattern for start_date, use format validation instead                                                                                                     |
| 2.0.6       | 2023-03-03 | [22891](https://github.com/airbytehq/airbyte/pull/22891) | Specified date formatting in specification                                                                                                                             |
| 2.0.5       | 2023-03-01 | [23610](https://github.com/airbytehq/airbyte/pull/23610) | Handle different Salesforce page size for different queries                                                                                                            |
| 2.0.4       | 2023-02-24 | [22636](https://github.com/airbytehq/airbyte/pull/22636) | Turn on default HttpAvailabilityStrategy for all streams that are not of class BulkSalesforceStream                                                                    |
| 2.0.3       | 2023-02-17 | [23190](https://github.com/airbytehq/airbyte/pull/23190) | In case properties are chunked, fetch primary key in every chunk                                                                                                       |
| 2.0.2       | 2023-02-13 | [22896](https://github.com/airbytehq/airbyte/pull/22896) | Count the URL length based on encoded params                                                                                                                           |
| 2.0.1       | 2023-02-08 | [22597](https://github.com/airbytehq/airbyte/pull/22597) | Make multiple requests if a REST stream has too many properties                                                                                                        |
| 2.0.0       | 2023-02-02 | [22322](https://github.com/airbytehq/airbyte/pull/22322) | Remove `ActivityMetricRollup` stream                                                                                                                                   |
| 1.0.30      | 2023-01-27 | [22016](https://github.com/airbytehq/airbyte/pull/22016) | Set `AvailabilityStrategy` for streams explicitly to `None`                                                                                                            |
| 1.0.29      | 2023-01-05 | [20886](https://github.com/airbytehq/airbyte/pull/20886) | Remove `ActivityMetric` stream                                                                                                                                         |
| 1.0.28      | 2022-12-29 | [20927](https://github.com/airbytehq/airbyte/pull/20927) | Fix tests; add expected records                                                                                                                                        |
| 1.0.27      | 2022-11-29 | [19869](https://github.com/airbytehq/airbyte/pull/19869) | Remove `AccountHistory` from unsupported BULK streams                                                                                                                  |
| 1.0.26      | 2022-11-15 | [19286](https://github.com/airbytehq/airbyte/pull/19286) | Bugfix: fallback to REST API if entity is not supported by BULK API                                                                                                    |
| 1.0.25      | 2022-11-13 | [19294](https://github.com/airbytehq/airbyte/pull/19294) | Use the correct encoding for non UTF-8 objects and data                                                                                                                |
| 1.0.24      | 2022-11-01 | [18799](https://github.com/airbytehq/airbyte/pull/18799) | Update list of unsupported Bulk API objects                                                                                                                            |
| 1.0.23      | 2022-11-01 | [18753](https://github.com/airbytehq/airbyte/pull/18753) | Add error_display_message for ConnectionError                                                                                                                          |
| 1.0.22      | 2022-10-12 | [17615](https://github.com/airbytehq/airbyte/pull/17615) | Make paging work, if `cursor_field` is not changed inside one page                                                                                                     |
| 1.0.21      | 2022-10-10 | [17778](https://github.com/airbytehq/airbyte/pull/17778) | Add `EventWhoRelation` to the list of unsupported Bulk API objects.                                                                                                    |
| 1.0.20      | 2022-09-30 | [17453](https://github.com/airbytehq/airbyte/pull/17453) | Check objects that are not supported by the Bulk API (v52.0)                                                                                                           |
| 1.0.19      | 2022-09-29 | [17314](https://github.com/airbytehq/airbyte/pull/17314) | Fixed bug with decoding response                                                                                                                                       |
| 1.0.18      | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/pull/17304) | Migrate to per-stream states.                                                                                                                                          |
| 1.0.17      | 2022-09-23 | [17094](https://github.com/airbytehq/airbyte/pull/17094) | Tune connection check: fetch a list of available streams                                                                                                               |
| 1.0.16      | 2022-09-21 | [17001](https://github.com/airbytehq/airbyte/pull/17001) | Improve writing file of decode                                                                                                                                         |
| 1.0.15      | 2022-08-30 | [16086](https://github.com/airbytehq/airbyte/pull/16086) | Improve API type detection                                                                                                                                             |
| 1.0.14      | 2022-08-29 | [16119](https://github.com/airbytehq/airbyte/pull/16119) | Exclude `KnowledgeArticleVersion` from using bulk API                                                                                                                  |
| 1.0.13      | 2022-08-23 | [15901](https://github.com/airbytehq/airbyte/pull/15901) | Exclude `KnowledgeArticle` from using bulk API                                                                                                                         |
| 1.0.12      | 2022-08-09 | [15444](https://github.com/airbytehq/airbyte/pull/15444) | Fixed bug when `Bulk Job` was timeout by the connector, but remained running on the server                                                                             |
| 1.0.11      | 2022-07-07 | [13729](https://github.com/airbytehq/airbyte/pull/13729) | Improve configuration field descriptions                                                                                                                               |
| 1.0.10      | 2022-06-09 | [13658](https://github.com/airbytehq/airbyte/pull/13658) | Correct logic to sync stream larger than page size                                                                                                                     |
| 1.0.9       | 2022-05-06 | [12685](https://github.com/airbytehq/airbyte/pull/12685) | Update CDK to v0.1.56 to emit an `AirbyeTraceMessage` on uncaught exceptions                                                                                           |
| 1.0.8       | 2022-05-04 | [12576](https://github.com/airbytehq/airbyte/pull/12576) | Decode responses as utf-8 and fallback to ISO-8859-1 if needed                                                                                                         |
| 1.0.7       | 2022-05-03 | [12552](https://github.com/airbytehq/airbyte/pull/12552) | Decode responses as ISO-8859-1 instead of utf-8                                                                                                                        |
| 1.0.6       | 2022-04-27 | [12335](https://github.com/airbytehq/airbyte/pull/12335) | Adding fixtures to mock time.sleep for connectors that explicitly sleep                                                                                                |
| 1.0.5       | 2022-04-25 | [12304](https://github.com/airbytehq/airbyte/pull/12304) | Add `Describe` stream                                                                                                                                                  |
| 1.0.4       | 2022-04-20 | [12230](https://github.com/airbytehq/airbyte/pull/12230) | Update connector to use a `spec.yaml`                                                                                                                                  |
| 1.0.3       | 2022-04-04 | [11692](https://github.com/airbytehq/airbyte/pull/11692) | Optimised memory usage for `BULK` API calls                                                                                                                            |
| 1.0.2       | 2022-03-01 | [10751](https://github.com/airbytehq/airbyte/pull/10751) | Fix broken link anchor in connector configuration                                                                                                                      |
| 1.0.1       | 2022-02-27 | [10679](https://github.com/airbytehq/airbyte/pull/10679) | Reorganize input parameter order on the UI                                                                                                                             |
| 1.0.0       | 2022-02-27 | [10516](https://github.com/airbytehq/airbyte/pull/10516) | Speed up schema discovery by using parallelism                                                                                                                         |
| 0.1.23      | 2022-02-10 | [10141](https://github.com/airbytehq/airbyte/pull/10141) | Processing of failed jobs                                                                                                                                              |
| 0.1.22      | 2022-02-02 | [10012](https://github.com/airbytehq/airbyte/pull/10012) | Increase CSV field_size_limit                                                                                                                                          |
| 0.1.21      | 2022-01-28 | [9499](https://github.com/airbytehq/airbyte/pull/9499)   | If a sync reaches daily rate limit it ends the sync early with success status. Read more in `Performance considerations` section                                       |
| 0.1.20      | 2022-01-26 | [9757](https://github.com/airbytehq/airbyte/pull/9757)   | Parse CSV with "unix" dialect                                                                                                                                          |
| 0.1.19      | 2022-01-25 | [8617](https://github.com/airbytehq/airbyte/pull/8617)   | Update connector fields title/description                                                                                                                              |
| 0.1.18      | 2022-01-20 | [9478](https://github.com/airbytehq/airbyte/pull/9478)   | Add available stream filtering by `queryable` flag                                                                                                                     |
| 0.1.17      | 2022-01-19 | [9302](https://github.com/airbytehq/airbyte/pull/9302)   | Deprecate API Type parameter                                                                                                                                           |
| 0.1.16      | 2022-01-18 | [9151](https://github.com/airbytehq/airbyte/pull/9151)   | Fix pagination in REST API streams                                                                                                                                     |
| 0.1.15      | 2022-01-11 | [9409](https://github.com/airbytehq/airbyte/pull/9409)   | Correcting the presence of an extra `else` handler in the error handling                                                                                               |
| 0.1.14      | 2022-01-11 | [9386](https://github.com/airbytehq/airbyte/pull/9386)   | Handling 400 error, while `sobject` doesn't support `query` or `queryAll` requests                                                                                     |
| 0.1.13      | 2022-01-11 | [8797](https://github.com/airbytehq/airbyte/pull/8797)   | Switched from authSpecification to advanced_auth in specefication                                                                                                      |
| 0.1.12      | 2021-12-23 | [8871](https://github.com/airbytehq/airbyte/pull/8871)   | Fix `examples` for new field in specification                                                                                                                          |
| 0.1.11      | 2021-12-23 | [8871](https://github.com/airbytehq/airbyte/pull/8871)   | Add the ability to filter streams by user                                                                                                                              |
| 0.1.10      | 2021-12-23 | [9005](https://github.com/airbytehq/airbyte/pull/9005)   | Handling 400 error when a stream is not queryable                                                                                                                      |
| 0.1.9       | 2021-12-07 | [8405](https://github.com/airbytehq/airbyte/pull/8405)   | Filter 'null' byte(s) in HTTP responses                                                                                                                                |
| 0.1.8       | 2021-11-30 | [8191](https://github.com/airbytehq/airbyte/pull/8191)   | Make `start_date` optional and change its format to `YYYY-MM-DD`                                                                                                       |
| 0.1.7       | 2021-11-24 | [8206](https://github.com/airbytehq/airbyte/pull/8206)   | Handling 400 error when trying to create a job for sync using Bulk API.                                                                                                |
| 0.1.6       | 2021-11-16 | [8009](https://github.com/airbytehq/airbyte/pull/8009)   | Fix retring of BULK jobs                                                                                                                                               |
| 0.1.5       | 2021-11-15 | [7885](https://github.com/airbytehq/airbyte/pull/7885)   | Add `Transform` for output records                                                                                                                                     |
| 0.1.4       | 2021-11-09 | [7778](https://github.com/airbytehq/airbyte/pull/7778)   | Fix types for `anyType` fields                                                                                                                                         |
| 0.1.3       | 2021-11-06 | [7592](https://github.com/airbytehq/airbyte/pull/7592)   | Fix getting `anyType` fields using BULK API                                                                                                                            |
| 0.1.2       | 2021-09-30 | [6438](https://github.com/airbytehq/airbyte/pull/6438)   | Annotate Oauth2 flow initialization parameters in connector specification                                                                                              |
| 0.1.1       | 2021-09-21 | [6209](https://github.com/airbytehq/airbyte/pull/6209)   | Fix bug with pagination for BULK API                                                                                                                                   |
| 0.1.0       | 2021-09-08 | [5619](https://github.com/airbytehq/airbyte/pull/5619)   | Salesforce Aitbyte-Native Connector                                                                                                                                    |

</details>

</HideInUI>
