---
generated_record: true
connector_name: Gemini for Google Workspace
connector_type: source
connector_slug: gemini
connector_directory: source-gemini
definition_id: 726008ad-34d8-4a52-bedb-d0eebbd3d78a
version: 0.0.3
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/gemini
logo: /images/connectors/sources/gemini.svg
logo_source_path: airbyte-integrations/connectors/source-gemini/icon.svg
logo_sha256: 8bf37934e84276b3a0e0c604161d404d4c292466f1d36eabf01bf0a3e7dd49b6
original_metadata_path: airbyte-integrations/connectors/source-gemini/metadata.yaml
original_metadata_sha256: 5e3cdec14847410d94248c67a8301ff16baecb5e50e1531acd4d16e0a114015c
original_document_path: docs/integrations/sources/gemini.md
original_document_sha256: e9fb3ba1d1ec7fe65e1a5e49c070bc890d52bd1fdfcbc756c1b58e75944118ae
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1488798cae0c157c21f6684184cc9647a85a4e43018d4059055fb36abff430de
rewritten_at: 2026-11-12T13:38:41.461020+00:00
---

# Gemini for Google Workspace

This source syncs Gemini for Google Workspace activity from the [Google Workspace Admin SDK Reports API](https://developers.google.com/workspace/admin/reports/v1/get-start/overview).
It reads `feature_utilization` events from the `gemini_in_workspace_apps` application. Admins can track Gemini adoption and usage across Gmail, Docs, Sheets, Slides, Meet and other Workspace apps. This supports auditing and governance.

This connector doesn't read from the Gemini API (Google AI Studio or Vertex AI).

## Prerequisites

- A Google Workspace account with an admin who has the **Reports** admin privilege, such as a super admin.
- A Google Cloud project where you can enable APIs and create OAuth clients.

## Setup guide

### Step 1: Enable the Admin SDK API

1. In the [Google Cloud console](https://console.cloud.google.com/), select or create a project.
2. Go to **APIs & Services** > **Library**, search for **Admin SDK API**, then click **Enable**.

### Step 2: Create an OAuth client

1. Go to **APIs & Services** > **OAuth consent screen** and configure the consent screen.
   Choose the **Internal** user type. This means only users in your Workspace organisation can authorise the app.
2. Go to **APIs & Services** > **Credentials**, click **Create credentials** > **OAuth client ID**, then choose **Web application**.
3. Under **Authorized redirect URIs**, add `https://developers.google.com/oauthplayground`.
4. Click **Create**, then copy the **Client ID** and **Client secret**.

### Step 3: Get a refresh token

The connector needs only one OAuth scope:

```text
https://www.googleapis.com/auth/admin.reports.audit.readonly
```

Generate a refresh token with the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground):

1. Click the gear icon, select **Use your own OAuth credentials**, then enter the Client ID and Client secret from Step 2.
2. In **Step 1 - Select & authorize APIs**, enter the scope above, then click **Authorize APIs**.
3. Sign in as the Workspace admin with the Reports privilege, then grant access.
4. In **Step 2 - Exchange authorization code for tokens**, click **Exchange authorization code for tokens**, then copy the **Refresh token**.

Google expires refresh tokens after 7 days when the consent screen uses the **External** user type with **Testing** publishing status.
Use the **Internal** user type to avoid this.

### Step 4: Set up the connector in Airbyte

1. In Airbyte, go to **Sources** and select **Gemini for Google Workspace**.
2. Enter the **Client ID**, **Client secret** and **Refresh token**.
3. Optionally, set **Start Time** and **End Time** in RFC 3339 format, such as `2026-01-01T00:00:00.000Z`.
4. Click **Set up source**.

## Configuration

| Input | Type | Description | Default Value |
| --- | --- | --- | --- |
| `client_id` | `string` | Client ID. OAuth client ID from your Google Cloud project. | |
| `client_secret` | `string` | Client secret. OAuth client secret from your Google Cloud project. | |
| `client_refresh_token` | `string` | Refresh token. Refresh token granted by a Workspace admin with the `admin.reports.audit.readonly` scope. | |
| `start_time` | `string` | Start Time. Start of the report time range in RFC 3339 format. The API only allows data from the last 180 days, so earlier dates are adjusted forward to stay within that window. | Start of the day (00:00:00 UTC) 180 days ago |
| `end_time` | `string` | End Time. End of the report time range in RFC 3339 format. | Start of the current day (00:00:00 UTC) |

## Streams

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
| --- | --- | --- | --- | --- |
| activity_events | time, uniqueQualifier | DefaultPaginator | ✅ | ✅ |

Records include the actor, events and their parameters, resource IDs, and an `isAgenticAction` flag. Actor details include email, profile ID, caller type and application information.
The `ipAddress`, `networkInfo`, `resourceDetails`, `etag` and `kind` fields are removed from records.

## Sync behaviour

Incremental syncs use the `time` cursor in 1-day slices. A 1-day lookback window captures events that Google reports late.
By default, the range ends at the start of the current UTC day. This means only complete days are synced.
The Reports API retains only 180 days of activity data.

The connector retries HTTP 429, 500, 502, 503 and 504 responses with exponential backoff.
For quota details, see [Reports API limits and quotas](https://developers.google.com/workspace/admin/reports/v1/limits).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.3 | 2026-11-10 | [91523](https://github.com/airbytehq/airbyte/pull/91523) | Update dependencies |
| 0.0.2 | 2026-11-03 | [90573](https://github.com/airbytehq/airbyte/pull/90573) | Update dependencies |
| 0.0.1 | 2026-10-26 | [88377](https://github.com/airbytehq/airbyte/pull/88377) | Initial release by [@Joshua-omolewa](https://github.com/Joshua-omolewa) via Connector Builder |

</details>
