---
generated_record: true
connector_name: Xero
connector_type: source
connector_slug: xero
connector_directory: source-xero
definition_id: 6fd1e833-dd6e-45ec-a727-ab917c5be892
version: 2.1.6
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/sources/xero
logo: /images/connectors/sources/xero.svg
logo_source_path: airbyte-integrations/connectors/source-xero/icon.svg
logo_sha256: 6932d3860929980a8a18f9b7276d7756b8747c54cc3bbe52c53cad8e793288d3
original_metadata_path: airbyte-integrations/connectors/source-xero/metadata.yaml
original_metadata_sha256: aef9f73cedf9f35f701b52646e6e952385b46d328c7a38c173784b6d9b0b912b
original_document_path: docs/integrations/sources/xero.md
original_document_sha256: 40e0ad4c7f5533a32208e9a2b8dae6c29ec9245939fa171bf4813082bb6dfb69
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7ad0456e89a57e987e9db8f5ec8154bb78c9d21a91450e5ab993f8f47b3146ed
rewritten_at: 2026-11-12T14:01:19.963617+00:00
---

# Xero

Use this page to set up the Xero source connector and find reference information.

## Prerequisites

- **Tenant ID** - Your Xero organisation ID (required)
- **Start Date** - The date to start replicating data from (UTC format)

For multi-tenant Xero accounts, use the Tenant ID to select the organisation you want to connect. Find your Tenant IDs by following [Xero documentation](https://developer.xero.com/documentation/guides/oauth2/auth-flow/#xero-tenants).

**Required list of scopes to sync all streams:**

- accounting.attachments.read
- accounting.budgets.read
- accounting.contacts.read
- accounting.journals.read
- accounting.reports.read
- accounting.reports.tenninetynine.read
- accounting.settings.read
- accounting.transactions.read
- assets.read
- offline_access

## Authentication

You can authenticate with Xero in two supported ways:

For bearer token authentication, follow [instructions](https://developer.xero.com/documentation/guides/oauth2/pkce-flow/) to obtain:
- Client ID

For OAuth client credentials, follow [instructions](https://developer.xero.com/documentation/guides/oauth2/custom-connections) to obtain:
- Client ID
- Client Secret

## Setup guide

1. Create an application in [Xero development center](https://developer.xero.com/app/manage/).
2. Select your authentication method: bearer token or OAuth client credentials.
3. Configure the required scopes listed in the Prerequisites section.
4. For bearer token authentication:
   - Follow [PKCE flow](https://developer.xero.com/documentation/guides/oauth2/pkce-flow/) to obtain an access token.
   - You can use Postman as described in [migration guide](./xero-migrations.md#using-postman-to-get-access-token).
5. For OAuth client credentials:
   - Make sure you have the Client ID and Client Secret from your Xero application.
6. Enter your Xero Organisation's [Tenant ID](https://developer.xero.com/documentation/guides/oauth2/auth-flow/#xero-tenants).
7. Enter a Start Date in UTC format `YYYY-MM-DDTHH:mm:ssZ` for when you want data replication to begin.

## Supported sync modes

The Xero source connector supports these [sync modes](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite)
- [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append)

## Supported streams

- [Accounts](https://developer.xero.com/documentation/api/accounting/accounts)
- [BankTransactions](https://developer.xero.com/documentation/api/accounting/banktransactions)
- [BankTransfers](https://developer.xero.com/documentation/api/accounting/banktransfers)
- [BrandingThemes](https://developer.xero.com/documentation/api/accounting/brandingthemes)
- [ContactGroups](https://developer.xero.com/documentation/api/accounting/contactgroups)
- [Contacts](https://developer.xero.com/documentation/api/accounting/contacts)
- [CreditNotes](https://developer.xero.com/documentation/api/accounting/creditnotes)
- [Currencies](https://developer.xero.com/documentation/api/accounting/currencies)
- [Employees](https://developer.xero.com/documentation/api/accounting/employees)
- [Invoices](https://developer.xero.com/documentation/api/accounting/invoices)
- [Items](https://developer.xero.com/documentation/api/accounting/items)
- [ManualJournals](https://developer.xero.com/documentation/api/accounting/manualjournals)
- [Organisation](https://developer.xero.com/documentation/api/accounting/organisation)
- [Overpayments](https://developer.xero.com/documentation/api/accounting/overpayments)
- [Payments](https://developer.xero.com/documentation/api/accounting/payments)
- [Prepayments](https://developer.xero.com/documentation/api/accounting/prepayments)
- [PurchaseOrders](https://developer.xero.com/documentation/api/accounting/purchaseorders)
- [RepeatingInvoices](https://developer.xero.com/documentation/api/accounting/repeatinginvoices)
- [TaxRates](https://developer.xero.com/documentation/api/accounting/taxrates)
- [TrackingCategories](https://developer.xero.com/documentation/api/accounting/trackingcategories)
- [Users](https://developer.xero.com/documentation/api/accounting/users)

### Date transformation

Xero uses .NET, so some record date fields may use [.NET JSON date format](https://developer.xero.com/documentation/api/accounting/requests-and-responses) and look like `/Date(1419937200000+0000)/`. The connector automatically detects and transforms these dates into ISO 8601 format. This provides consistency and makes data processing easier.

The connector also handles ISO 8601 formatted dates. It gives all datetime fields a consistent format with the UTC timezone.

### Incremental sync

You can use incremental sync for every stream. The connector uses the `UpdatedDateUTC` field as the cursor field to track records. Your first sync fetches all data from your specified start date. Later syncs only fetch records updated since the previous sync.

### Error handling

The connector automatically handles common API errors:
- **401 Unauthorized**: The connector attempts to refresh the access token and retry the request.
- **403 Forbidden**: The connector logs the error and skips the affected record.
- **429 Rate Limit Exceeded**: The connector follows the Retry-After header and automatically retries after the specified wait time.

### Performance considerations

The following Xero [API rate limits](https://developer.xero.com/documentation/guides/oauth2/limits/#api-rate-limits) restrict the connector:

- **Concurrent Limit**: 5 calls in progress at one time
- **Minute Limit**: 60 calls per minute per tenant
- **Daily Limit**: 5000 calls per day per tenant
- **App Minute Limit**: 10,000 calls per minute across all tenants

When rate limits are exceeded, the API returns a 429 HTTP status code. The Retry-After header states how many seconds to wait before retrying.

### Pagination

The connector automatically handles pagination for every stream. It uses a page size of 100 records per request.

## Migration guide

If you're upgrading from an earlier connector version, see [migration guide](./xero-migrations.md) for important information about changes between versions.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                   |
|:--------|:-----------|:---------------------------------------------------------|:----------------------------------------------------------|
| 2.1.6 | 2026-06-30 | [79089](https://github.com/airbytehq/airbyte/pull/79089) | Update dependencies |
| 2.1.5 | 2026-02-25 | [71340](https://github.com/airbytehq/airbyte/pull/71340) | Resolve the generator returned from JsonDecoder into dictionary |
| 2.1.4 | 2025-03-01 | [55142](https://github.com/airbytehq/airbyte/pull/55142) | Update dependencies |
| 2.1.3 | 2025-02-22 | [54526](https://github.com/airbytehq/airbyte/pull/54526) | Update dependencies |
| 2.1.2 | 2025-02-15 | [54042](https://github.com/airbytehq/airbyte/pull/54042) | Update dependencies |
| 2.1.1 | 2025-02-08 | [43841](https://github.com/airbytehq/airbyte/pull/43841) | Update dependencies |
| 2.1.0 | 2024-10-23 | [47264](https://github.com/airbytehq/airbyte/pull/47264) | Migrate to Manifest-only |
| 2.0.1 | 2025-01-10 | [51034](https://github.com/airbytehq/airbyte/pull/51034) | Fix for time part being removed from all datetimes fields |
| 2.0.0 | 2024-06-06 | [39316](https://github.com/airbytehq/airbyte/pull/39316) | Add OAuth and Bearer strategies |
| 1.0.1 | 2024-06-06 | [39264](https://github.com/airbytehq/airbyte/pull/39264) | [autopull] Upgrade base image to v1.2.2 |
| 1.0.0 | 2024-04-30 | [36878](https://github.com/airbytehq/airbyte/pull/36878) | Migrate to low code |
| 0.2.6 | 2024-05-17 | [38330](https://github.com/airbytehq/airbyte/pull/38330) | Updating python dependencies |
| 0.2.5 | 2024-01-11 | [34154](https://github.com/airbytehq/airbyte/pull/34154) | prepare for airbyte-lib |
| 0.2.4 | 2023-11-24 | [32837](https://github.com/airbytehq/airbyte/pull/32837) | Handle 403 error |
| 0.2.3 | 2023-06-19 | [27471](https://github.com/airbytehq/airbyte/pull/27471) | Update CDK to 0.40 |
| 0.2.2 | 2023-06-06 | [27007](https://github.com/airbytehq/airbyte/pull/27007) | Update CDK |
| 0.2.1 | 2023-03-20 | [24217](https://github.com/airbytehq/airbyte/pull/24217) | Certify to Beta |
| 0.2.0 | 2023-03-14 | [24005](https://github.com/airbytehq/airbyte/pull/24005) | Enable in Cloud |
| 0.1.0 | 2021-11-11 | [18666](https://github.com/airbytehq/airbyte/pull/18666) | 🎉 New Source - Xero [python cdk] |

</details>
