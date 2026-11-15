---
generated_record: true
connector_name: Uptick
connector_type: source
connector_slug: uptick
connector_directory: source-uptick
definition_id: 54c75c42-df4a-4f3e-a5f3-d50cf80f1649
version: 2.1.6
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/uptick
logo: /images/connectors/sources/uptick.svg
logo_source_path: airbyte-integrations/connectors/source-uptick/icon.svg
logo_sha256: dadf0d1d89df5b4f6cff801b3770a29f59b828aedcfc9e59b02702d9c8329368
original_metadata_path: airbyte-integrations/connectors/source-uptick/metadata.yaml
original_metadata_sha256: ffe02337b152bb3fb19b673c53daa3f53dd64d78440dbe99dfba3d0349d8f351
original_document_path: docs/integrations/sources/uptick.md
original_document_sha256: d4b0246deffbcd80c94c09ae9b3d2891309835f5a0f71ce9120efca9129f2d0a
rewrite_status: review
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d2aa0040db8ace9d686e0d9b3f7efd4c0d9dfee12a843804ffec68cb5a57031d
rewritten_at: 2026-11-12T14:17:06.308122+00:00
---

# Uptick

Extract data from Uptick, a field service management platform for the fire protection industry.

## Prerequisites

- Your Uptick workspace URL in the form `https://<workspace>.onuptick.com`. The connector only connects to `onuptick.com` workspace hosts. Any other Base URL host fails the connection check for both authentication methods.
- Credentials for one authentication method below. OAuth 2.0 is recommended. Username and password remains available for existing connections.

### OAuth 2.0 (recommended)

Enter the **Base URL** exactly as `https://<workspace>.onuptick.com`, using lowercase and no path. This method uses the OAuth 2.0 authorisation-code flow with PKCE. The connector requests only Uptick's read-only `read` scope.

On Airbyte Cloud, enable Airbyte's Uptick app in your Uptick account before authenticating. The **Authenticate with Uptick** button uses this app. If it isn't enabled, ask your Uptick administrator to enable it. Enter your **Base URL** and choose **Authenticate with Uptick** under **Authentication**. Click **Authenticate**, then approve Uptick's consent page. The connector stores the resulting tokens in your connection's `credentials` block.

On self-hosted Airbyte (OSS), first create an OAuth application in Uptick under **Control Panel > Uptick API > Create Application**. Use your Airbyte instance's redirect URI `https://<airbyte-host>/auth_flow` and the authorisation-code grant with PKCE (S256). Then enter your Base URL, choose **Authenticate with Uptick** and complete the flow.

### Username and password

To authenticate, you need an OAuth application and an Uptick user account. The connector uses OAuth 2.0 with the password grant.

- An OAuth Client ID and Client Secret generated from your Uptick instance.
- An Uptick user's email address and password. The connector signs in as this user. The account needs permission to view every resource you want to sync.

To generate OAuth credentials, go to **Control Panel > Uptick API** in your Uptick instance and select **Create Application**. Provide a name and save. Uptick generates the Client ID and Client Secret. For step-by-step instructions, see [Uptick API - Getting started](https://support.uptickhq.com/en/articles/6728442-uptick-api-getting-started). Existing connections using the top-level `client_id`, `client_secret`, `username` and `password` fields continue working. On the first run after upgrading to 2.1.0, the connector copies them under Authentication (`credentials`). It then saves the migrated config. The original fields remain, so pinning back to 2.0.x continues working.

Your Uptick user account needs read access to each module you want to sync. In practice, `task_profitability` has required the Intelligence reports permission.

## Setup guide

### Set up Uptick in Airbyte

1. In Airbyte, go to **Sources** and select **+ New source**.
2. Search for **Uptick** and select it as the source type.
3. Enter your **Base URL** and choose an **Authentication** method. Then complete the fields from the configuration table below. For **Authenticate with Uptick**, click **Authenticate** and approve the consent page. For **Username & password**, complete `client_id`, `client_secret`, `username` and `password`. Consider creating a dedicated Uptick service user for the connector. The API token inherits that user's permissions, keeping access limited to exactly what you sync.
4. Select **Set up source** to test the connection.

| Input | Type | Description | Default Value |
| ------- | ------ | ------------- | --------------- |
| `base_url` | `string` | Root URL of your Uptick workspace, for example `https://yourcompany.onuptick.com`. Required for both authentication methods. The connector strips any scheme, path, or trailing slash and always connects over HTTPS. The host must be `<workspace>.onuptick.com`, or the connection check fails. For **Authenticate with Uptick**, enter the host in lowercase. | |
| `credentials.auth_type` | `string` | `oauth2.0` for the OAuth flow, `password` for the legacy username and password method. | |
| `credentials.client_id` | `string` | OAuth Client ID generated from **Control Panel > Uptick API**. Filled automatically by the OAuth flow on Airbyte Cloud. | |
| `credentials.client_secret` | `string` | OAuth Client Secret generated from **Control Panel > Uptick API**. Filled automatically by the OAuth flow on Airbyte Cloud. | |
| `credentials.refresh_token` | `string` | Refresh token obtained by authenticating with Uptick. Required for `oauth2.0`; filled automatically by the OAuth flow. | |
| `credentials.username` | `string` | Email address for an Uptick user account with API access. Required for `password`. Synced data is limited to what this user can see in Uptick. | |
| `credentials.password` | `string` | Password for the Uptick user account. Required for `password`. | |
| `num_workers` | `integer` | Number of concurrent requests. Higher values speed up syncs but increase the chance of Uptick rate limiting. Allowed range 1–10. | `3` |
| `max_requests_per_minute` | `integer` | Global request budget shared by all streams and threads. Uptick publishes no numeric limit; 60 is a conservative default. Allowed range 1–600. | `60` |

## Supported sync modes

| Sync mode | Supported |
| --------- | --------- |
| Full Refresh Sync | ✅ |
| Incremental Sync | ✅ |

Every stream except `majorservices` supports full refresh and incremental sync using the `updated` cursor. `majorservices` has no `updated` timestamp, so it supports full refresh only. Among the JSON:API streams, only those marked ✅ in the **Reports deletions** column expose a `deleted` timestamp. For streams marked ❌, incremental sync retains destination rows after they're deleted in Uptick. Use full refresh for those streams. `task_profitability` is a generated report without a deleted state, so you can safely sync it incrementally.

## Supported streams

The Uptick connector syncs the following streams, grouped by functional area:

### Core business entities

- `tasks` - Work tasks and maintenance requests, including scheduling, priority and assignment details
- `taskcategories` - Categories for organising tasks
- `tasksessions` - Time-tracking entries for work performed on tasks
- `rounds` - Work rounds for technician scheduling and route management
- `projects` - Project management entities for larger initiatives
- `clients` - Customer organisations and contact information
- `clientgroups` - Client organisation groupings
- `clientcontacts` - Contact people associated with clients
- `properties` - Physical locations where work is performed
- `propertycontacts` - Contact people associated with properties
- `contractors` - External service providers and subcontractors
- `users` - System users, including technicians and staff
- `servicegroups` - Service categories for organising work types

### Financial and billing

- `invoices` - Customer invoices and billing information
- `invoicelineitems` - Individual invoice line items
- `creditnotes` - Credit notes for refunds and adjustments
- `creditnotelineitems` - Credit note line items
- `billingcards` - Billing card information for cost allocation
- `billingcontracts` - Recurring billing contracts for ongoing services
- `billingcontractlineitems` - Billing contract line items
- `costcentres` - Cost centre assignments for financial tracking
- `task_profitability` - Task profitability metrics and financial performance data

### Purchasing and supply chain

- `purchaseorders` - Purchase orders for materials and services
- `purchaseorderlineitems` - Individual purchase order items
- `purchaseorderbills` - Bills received for purchase orders
- `purchaseorderbilllineitems` - Purchase order bill line items
- `purchaseorderdockets` - Delivery dockets for purchase orders
- `suppliers` - Vendor and supplier information
- `products` - Product and materials catalogue

### Asset management and inspections

- `assets` - Physical assets requiring maintenance and inspection
- `assettypes` - Asset type categories and specifications
- `assettypevariants` - Asset type variants and configurations
- `routines` - Scheduled maintenance and inspection routines
- `routineservices` - Routine service configurations for properties and assets
- `routineservicelevels` - Service level definitions for routine services
- `routineservicetypes` - Routine service types and categories
- `routineserviceleveltypes` - Service level type classifications
- `majorservices` - Major service records for assets
- `servicetasks` - Individual work activities on tasks
- `subtasks` - Links programme maintenance routines to tasks
- `remarks` - Issues, defects and observations recorded during inspections
- `remarkevents` - Events and actions taken on remarks
- `promptquestions` - Prompt questions asked while completing service reports
- `promptanswergroups` - Prompt answer groupings by service task and section
- `promptanswers` - Individual answers to prompt questions
- `appointments` - Scheduled appointments for work and inspections

### Quality and compliance

- `accreditations` - Technician certifications and qualifications
- `accreditationtypes` - Certification and accreditation types

### Sales

- `servicequotes` - Quotes for service work
- `servicequotefixedlineitems` - Fixed-price line items in service quotes
- `servicequotedoandchargelineitems` - Do-and-charge line items in service quotes
- `servicequoteproductlineitems` - Product line items in service quotes
- `defectquotes` - Quotes for remedial work on identified defects
- `defectquotelineitems` - Line items in defect quotes

### Organisation and location

- `branches` - Business locations and organisational units

### Stream details

| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental | Reports deletions |
| ------------- | ------------- | ------------ | --------------------- | ---------------------- | ------------------- |
| `tasks` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `taskcategories` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `clients` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `clientgroups` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `properties` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `invoices` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `projects` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `servicequotes` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `defectquotes` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `suppliers` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `purchaseorders` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `purchaseorderlineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `assets` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `routines` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `billingcards` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `purchaseorderbills` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `purchaseorderbilllineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `purchaseorderdockets` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `invoicelineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `users` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `servicegroups` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `costcentres` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `accreditationtypes` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `accreditations` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `branches` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `creditnotes` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `creditnotelineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `remarks` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `assettypes` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `assettypevariants` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `products` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `rounds` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `tasksessions` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `contractors` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `appointments` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `billingcontracts` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `billingcontractlineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `defectquotelineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `servicequotefixedlineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `servicequotedoandchargelineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `servicequoteproductlineitems` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `remarkevents` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `routineservices` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `routineservicelevels` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `routineservicetypes` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `routineserviceleveltypes` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `servicetasks` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `subtasks` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `task_profitability` | `task_id` | `DefaultPaginator` | ✅ | ✅ | n/a (generated report) |
| `clientcontacts` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `propertycontacts` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `promptquestions` | `id` | `DefaultPaginator` | ✅ | ✅ | ✅ |
| `promptanswergroups` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `promptanswers` | `id` | `DefaultPaginator` | ✅ | ✅ | ❌ |
| `majorservices` | `id` | `DefaultPaginator` | ✅ | ❌ (no `updated` timestamp) | n/a (full refresh only) |

### API versions and fields

Every stream except `task_profitability` reads a pinned Uptick endpoint under `/api/v2.16/`. The `task_profitability` stream reads the intelligence report at `/api/v2/intelligencereports/profitability_by_task/`. This resolves to the minor version that Uptick currently treats as the latest.

Each stream uses Uptick's sparse fieldsets to request a fixed field list. You receive a curated subset of the endpoint's available fields, rather than every field. Fields added later appear only after the connector is updated. Uptick keeps roughly three minor API versions live and retires the oldest. Connector releases moving to newer minor versions may add, rename or remove fields. The [Uptick API patch notes](https://support.uptickhq.com/en/articles/6728314-uptick-api-overview-and-patch-notes) list the changes in each version.

### Attribute values

Uptick returns each record as a JSON:API object containing an `attributes` block. The connector copies every attribute unchanged to the record's top level. It also keeps the original `attributes` object, `relationships` object and resource `type`. From version 2.1.2, every JSON:API stream declares `attributes` and `relationships` as nullable objects in its schema. Every stream except `accreditationtypes`, `billingcontracts`, `billingcontractlineitems`, `products` and `promptquestions` also declares `type`. Destinations that create typed columns therefore add these columns. Monetary and other decimal fields arrive as strings, preserving the precision Uptick sends, such as `"10.00"`. The exception is `servicequotes.product_subtotal`, which Uptick returns as a JSON number. From version 2.0.0, the connector declares it as a number. Attributes returned by Uptick as `null` arrive as `null` in your destination. Uptick returns an empty string (`""`), rather than `null`, for unset email fields such as `users.email` and `clients.contact_email`. It also does this for `tasks.workorder_url`. Filter for both values when finding missing emails or URLs.

Before version 1.2.0, the connector passed each attribute through a template. This reformatted decimal strings, so `"10.00"` became `"10.0"`, and converted `null` to the string `"None"`. If you filter or join these fields downstream, check both representations in data synced before your upgrade.

### Relationship fields

Uptick returns related records in a JSON:API `relationships` object. The connector flattens each relationship into a scalar `<relationship>_id` column. Examples include `client_id` on `clientcontacts` and `property_id` on `propertycontacts`. Use these columns to join streams in your destination.

Prompt data spans three streams. Uptick reworked its prompt model in API v2.15, so use these joins:

- `promptanswers.answergroup_id` joins `promptanswergroups.id`, and `promptanswers.question_id` joins `promptquestions.id`.
- `promptanswergroups.servicetask_id` and `promptanswergroups.task_id` link answer groups to the service task or task where the answers were recorded.
- `promptquestions.section_id` and `promptanswergroups.section_id` reference Uptick prompt sections. The connector doesn't sync prompt sections. You can't resolve these IDs to section names using synced data alone.

### Incremental sync

For supported streams, the connector uses each record's `updated` timestamp as the incremental sync cursor. It uses the Uptick API's `updatedsince` filter to fetch only records changed since the previous sync. Streams supporting full refresh only are read in full during every sync.

Before version 2.0.0, the `servicegroups` and `accreditationtypes` endpoints ignored the `updatedsince` filter. The connector therefore read both tables fully during every sync, then applied the cursor filter itself. Uptick now applies the filter to these endpoints. From version 2.0.0, incremental syncs for these streams fetch only changed rows.

The `majorservices` endpoint has no `updated` timestamp, so it has no cursor for incremental sync. From version 2.0.0, the connector offers this stream in full refresh mode only.

Airbyte's UI still offers incremental sync for streams marked ❌ under **Reports deletions**. This is because the connector defines the `updated` cursor for every stream except `majorservices`. Don't use incremental sync for those streams. Their Uptick endpoints don't report deletions, so deleted Uptick records remain in your destination. Sync them with **Full Refresh | Overwrite** instead.

## Data type map

| Connector schema type | Airbyte type |
| --------------------- | ------------ |
| string | string |
| integer | integer |
| number | number |
| decimal | string (airbyte_type `decimal`) |
| boolean | boolean |
| date | string (format `date`) |
| datetime | string (format `date-time`, airbyte_type `timestamp_with_timezone`) |
| object | object |
| array | array |

## Limitations and troubleshooting

### Permission errors (403)

The sync fails with `HTTP 403: Uptick user lacks permission for the requested endpoint.` if the Uptick user account lacks permission for an endpoint. Uptick doesn't publish permissions for each endpoint. In production, this error has occurred on `task_profitability` and was resolved by granting the Intelligence reports permission. It has also occurred on `billingcontractlineitems`. The connector reports a configuration error instead of retrying. Grant the missing module permission in Uptick or deselect the stream.

**`403 Access denied … required licenses (FIELD, DESK, CONTRACTOR)` after logging in during "Authenticate with Uptick".** The Uptick user you signed in with has no licence in that workspace. Ask your Uptick administrator to grant a licence, such as DESK, or use username/password authentication instead.

### Authentication errors

Uptick rejects an incorrect username or password with `invalid_grant`. It rejects an incorrect client ID or client secret with `invalid_client`. The connector reports these as a configuration error without retrying: `Refresh token was rejected by the OAuth provider (invalid, expired, or already used). Re-authenticate this source's credentials in its connection settings. Provider error: invalid_grant` (or `invalid_client`). For connections using **Authenticate with Uptick**, re-authenticate to refresh the stored tokens. For username and password connections, check all four credential fields in the source configuration. Confirm that the OAuth application still exists under **Control Panel > Uptick API**.

Uptick access tokens can expire or be revoked during a long sync. If a stream request returns 401 mid-sync, the connector refreshes the token once and retries. If Uptick rejects the refresh, the sync fails with the same configuration error. This can happen if the password changes during the sync. If the retried request still returns 401, it fails with configuration error `Refreshed OAuth access token is rejected by the API.` Update the credentials and run the sync again.

### Base URL errors

From version 2.1.2, the connection check rejects a Base URL whose host isn't `<workspace>.onuptick.com`. This validation applies to both authentication methods and happens before any request is sent. The check returns a `JSON schema validation error` saying that the URL `does not match` the `onuptick.com` pattern. Earlier versions didn't restrict the host for **Username & password**. Connections using that method with another host, such as a tunnel or `localhost`, now fail. Set the Base URL to your `https://<workspace>.onuptick.com` address.

Enter the host in lowercase. For **Authenticate with Uptick**, the host is also case-sensitive. A Base URL containing uppercase letters, such as `https://MyCompany.onuptick.com`, fails the check. The message contains `base_url-must-be-https-workspace.onuptick.com`, and the connector doesn't send your OAuth credentials to that host.

A misspelled workspace name, such as `https://typo.onuptick.com`, passes this check. It then fails with a DNS or connection error.

### Deleted records

Streams marked ❌ under **Reports deletions** in the table above don't report deletions. Records deleted in Uptick therefore stay in your destination until you run a **Full Refresh | Overwrite** sync. Full Refresh | Append doesn't remove rows. The 12 JSON:API streams marked ✅ expose a `deleted` timestamp on deleted records. `task_profitability` is a generated report and has no deleted state.

### Rate limits

Uptick enforces rate limits and reasonable-use guidelines on its API, but doesn't publish a numeric limit. Uptick states it can revoke API access without notice when applications violate these limits. Increase the connector's request rate cautiously.

Every stream except `task_profitability` uses Uptick's cursor pagination and requests 1,000 records per page. A stream therefore needs roughly one request per 1,000 records. With the default budget of 60 requests per minute, a sync reads about 60,000 records per minute across all streams.

Two settings control how quickly the connector reads from Uptick:

- `max_requests_per_minute` sets one request budget shared by all streams and threads (allowed range 1–600). The default of 60 requests per minute is a conservative value chosen by Airbyte. It sets the throughput ceiling for the whole sync. Large workspaces with millions of records may sync more slowly than before version 1.3.0. If Uptick confirms your workspace can tolerate more traffic, increase this value. If Uptick returns HTTP 429 responses, reduce it.
- `num_workers` sets how many requests run simultaneously. The default is 3, and the maximum is 10. Every request still counts against `max_requests_per_minute`. Adding workers only speeds up a sync when slow API responses prevent the connector from using its full per-minute budget.

When Uptick throttles a request and returns a `Retry-After` header, the connector waits for the indicated time before retrying. If the header specifies 30 minutes or longer, the connector doesn't wait. Instead, it fails the stream with a rate-limit error. Without a `Retry-After` header, the connector backs off exponentially. It retries a failed request up to five times.

To reduce API usage, sync only the streams you need. Schedule syncs no more often than your reporting requires.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| ------------------ | ------------------- | -------------- | ---------------- |
| 2.1.6 | 2026-11-10 | [91768](https://github.com/airbytehq/airbyte/pull/91768) | Update dependencies |
| 2.1.5 | 2026-11-03 | [90817](https://github.com/airbytehq/airbyte/pull/90817) | Update dependencies |
| 2.1.4 | 2026-10-27 | [90093](https://github.com/airbytehq/airbyte/pull/90093) | Update dependencies |
| 2.1.3 | 2026-10-22 | [89668](https://github.com/airbytehq/airbyte/pull/89668) | Promote connector to certified support level. |
| 2.1.2 | 2026-10-22 | [89616](https://github.com/airbytehq/airbyte/pull/89616) | Request 1,000 records per page; declare `attributes`, `relationships`, `type`, `invoicelineitems.subtotal`, and `properties.address.place_id` in stream schemas; accept date-only cursor state; reject a Base URL outside `onuptick.com` on check; stop validating email fields and `tasks.workorder_url` as `email` and `uri` formats because Uptick returns `""` when they're unset; update the base image and vendor docs links |
| 2.1.1 | 2026-10-21 | [89505](https://github.com/airbytehq/airbyte/pull/89505) | Reject an empty or whitespace-only `base_url` and remove unused legacy config fields |
| 2.1.0 | 2026-10-20 | [87436](https://github.com/airbytehq/airbyte/pull/87436) | Add OAuth 2.0 authorization-code (PKCE) authentication with the read-only scope |
| 2.0.1 | 2026-10-20 | [89415](https://github.com/airbytehq/airbyte/pull/89415) | Update dependencies |
| 2.0.0 | 2026-10-16 | [88925](https://github.com/airbytehq/airbyte/pull/88925) | Upgrade the Uptick API to v2.16, correct the types of object and numeric fields, make majorservices full refresh only, filter servicegroups and accreditationtypes server-side, and add product_id to invoicelineitems |
| 1.3.3 | 2026-10-13 | [88821](https://github.com/airbytehq/airbyte/pull/88821) | Update dependencies |
| 1.3.2 | 2026-10-06 | [88063](https://github.com/airbytehq/airbyte/pull/88063) | Update dependencies |
| 1.3.1 | 2026-09-29 | [87373](https://github.com/airbytehq/airbyte/pull/87373) | Update dependencies |
| 1.3.0 | 2026-09-28 | [86356](https://github.com/airbytehq/airbyte/pull/86356) | Add a configurable request budget (default 60/min), refresh expired tokens mid-sync, and normalize base_url |
| 1.2.1 | 2026-09-22 | [86843](https://github.com/airbytehq/airbyte/pull/86843) | Update dependencies |
| 1.2.0 | 2026-09-21 | [86363](https://github.com/airbytehq/airbyte/pull/86363) | Emit attribute values verbatim and filter servicegroups and accreditationtypes incrementally |
| 1.1.3 | 2026-09-15 | [86280](https://github.com/airbytehq/airbyte/pull/86280) | Update dependencies |
| 1.1.2 | 2026-09-08 | [85702](https://github.com/airbytehq/airbyte/pull/85702) | Update dependencies |
| 1.1.1 | 2026-08-18 | [84790](https://github.com/airbytehq/airbyte/pull/84790) | Update dependencies |
| 1.1.0 | 2026-08-12 | [83710](https://github.com/airbytehq/airbyte/pull/83710) | Add 6 new streams (clientcontacts, propertycontacts, promptquestions, promptanswergroups, promptanswers, majorservices), add fields to the clients, properties, invoices, defectquotes, servicequotes, users, and purchaseorders streams, and make relationship field extraction null-safe |
| 1.0.3 | 2026-08-11 | [84162](https://github.com/airbytehq/airbyte/pull/84162) | Update dependencies |
| 1.0.2 | 2026-08-04 | [83652](https://github.com/airbytehq/airbyte/pull/83652) | Update dependencies |
| 1.0.1 | 2026-07-28 | [83098](https://github.com/airbytehq/airbyte/pull/83098) | Update dependencies |
| 1.0.0 | 2026-07-21 | [73740](https://github.com/airbytehq/airbyte/pull/73740) | Upgrade the Uptick API to v2.15 and remove deprecated fields from the branches, defectquotelineitems, servicetasks, and tasksessions streams |
| 0.5.16 | 2026-07-21 | [82628](https://github.com/airbytehq/airbyte/pull/82628) | Update dependencies |
| 0.5.15 | 2026-07-14 | [81991](https://github.com/airbytehq/airbyte/pull/81991) | Update dependencies |
| 0.5.14 | 2026-06-30 | [81268](https://github.com/airbytehq/airbyte/pull/81268) | Update dependencies |
| 0.5.13 | 2026-06-23 | [80682](https://github.com/airbytehq/airbyte/pull/80682) | Update dependencies |
| 0.5.12 | 2026-06-16 | [80076](https://github.com/airbytehq/airbyte/pull/80076) | Update dependencies |
| 0.5.11 | 2026-06-09 | [79539](https://github.com/airbytehq/airbyte/pull/79539) | Update dependencies |
| 0.5.10 | 2026-06-02 | [79025](https://github.com/airbytehq/airbyte/pull/79025) | Update dependencies |
| 0.5.9 | 2026-04-28 | [77504](https://github.com/airbytehq/airbyte/pull/77504) | Update dependencies |
| 0.5.8 | 2026-04-21 | [76809](https://github.com/airbytehq/airbyte/pull/76809) | Update dependencies |
| 0.5.7 | 2026-03-31 | [75703](https://github.com/airbytehq/airbyte/pull/75703) | Update dependencies |
| 0.5.6 | 2026-03-17 | [75044](https://github.com/airbytehq/airbyte/pull/75044) | Update dependencies |
| 0.5.5 | 2026-03-10 | [74493](https://github.com/airbytehq/airbyte/pull/74493) | Update dependencies |
| 0.5.4 | 2026-02-24 | [73926](https://github.com/airbytehq/airbyte/pull/73926) | Update dependencies |
| 0.5.3 | 2026-02-23 | [72302](https://github.com/airbytehq/airbyte/pull/72302) | Add fields to defectquotes and projects streams |
| 0.5.2 | 2026-02-17 | [73433](https://github.com/airbytehq/airbyte/pull/73433) | Update dependencies |
| 0.5.1 | 2026-02-10 | [73007](https://github.com/airbytehq/airbyte/pull/73007) | Update dependencies |
| 0.5.0 | 2026-01-22 | [71122](https://github.com/airbytehq/airbyte/pull/71122) | Add invoice_id to invoicelineitems, and add 6 new streams: servicetasks, routineservices, routineservicelevels, routineservicetypes, routineserviceleveltypes, subtasks |
| 0.4.3 | 2026-01-20 | [72056](https://github.com/airbytehq/airbyte/pull/72056) | Update dependencies |
| 0.4.2 | 2026-01-14 | [71437](https://github.com/airbytehq/airbyte/pull/71437) | Update dependencies |
| 0.4.1 | 2025-12-18 | [70713](https://github.com/airbytehq/airbyte/pull/70713) | Update dependencies |
| 0.4.0 | 2025-12-10 | [68194](https://github.com/airbytehq/airbyte/pull/68194) | Remove expensive calculation fields from tasksessions, add more streams, including task profitability |
| 0.3.9 | 2025-11-25 | [70176](https://github.com/airbytehq/airbyte/pull/70176) | Update dependencies |
| 0.3.8 | 2025-11-18 | [69684](https://github.com/airbytehq/airbyte/pull/69684) | Update dependencies |
| 0.3.7 | 2025-10-29 | [68880](https://github.com/airbytehq/airbyte/pull/68880) | Update dependencies |
| 0.3.6 | 2025-10-21 | [68365](https://github.com/airbytehq/airbyte/pull/68365) | Update dependencies |
| 0.3.5 | 2025-10-17 | [67585](https://github.com/airbytehq/airbyte/pull/67585) | Remove projectsectiontask and add more incremental sync streams |
| 0.3.4 | 2025-10-14 | [67855](https://github.com/airbytehq/airbyte/pull/67855) | Update dependencies |
| 0.3.3 | 2025-10-07 | [67515](https://github.com/airbytehq/airbyte/pull/67515) | Update dependencies |
| 0.3.2 | 2025-10-03 | [67020](https://github.com/airbytehq/airbyte/pull/67020) | Remove start_date, include more task fields |
| 0.3.1 | 2025-09-30 | [66839](https://github.com/airbytehq/airbyte/pull/66839) | Update dependencies |
| 0.3.0 | 2025-09-25 | [66410](https://github.com/airbytehq/airbyte/pull/66410) | Add more streams |
| 0.2.4 | 2025-09-24 | [66598](https://github.com/airbytehq/airbyte/pull/66598) | Update dependencies |
| 0.2.3 | 2025-09-09 | [65733](https://github.com/airbytehq/airbyte/pull/65733) | Update dependencies |
| 0.2.2 | 2025-09-07 | [65534](https://github.com/airbytehq/airbyte/pull/65534) | Add extra_fields to property stream |
| 0.2.1 | 2025-08-24 | [65445](https://github.com/airbytehq/airbyte/pull/65445) | Update dependencies |
| 0.2.0 | 2025-08-22 | | Update task profitability stream to use start_date parameter |
| 0.0.11 | 2025-08-21 | [65061](https://github.com/airbytehq/airbyte/pull/65061) | Add users and task profitability streams |
| 0.0.10 | 2025-08-15 | [64942](https://github.com/airbytehq/airbyte/pull/64942) | Fix docker image entrypoint for platform syncs |
| 0.0.9 | 2025-08-14 | [64170](https://github.com/airbytehq/airbyte/pull/64170) | adds cursor pagination, incremental sync and rate limiting |
| 0.0.8 | 2025-08-10 | [64845](https://github.com/airbytehq/airbyte/pull/64845) | Update dependencies |
| 0.0.7 | 2025-08-02 | [64403](https://github.com/airbytehq/airbyte/pull/64403) | Update dependencies |
| 0.0.6 | 2025-07-26 | [64055](https://github.com/airbytehq/airbyte/pull/64055) | Update dependencies |
| 0.0.5 | 2025-07-20 | [63685](https://github.com/airbytehq/airbyte/pull/63685) | Update dependencies |
| 0.0.4 | 2025-07-12 | [63165](https://github.com/airbytehq/airbyte/pull/63165) | Update dependencies |
| 0.0.3 | 2025-07-05 | [62739](https://github.com/airbytehq/airbyte/pull/62739) | Update dependencies |
| 0.0.2 | 2025-06-28 | [62220](https://github.com/airbytehq/airbyte/pull/62220) | Update dependencies |
| 0.0.1 | 2025-06-10 | | Initial release by [@sajarin](https://github.com/sajarin) via Connector Builder |

</details>
