---
generated_record: true
connector_name: Ramp
connector_type: source
connector_slug: ramp
connector_directory: source-ramp
definition_id: 57e906dd-03c3-4d2a-8b4c-e3334acaf8b4
version: 1.1.4
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/ramp
logo: /images/connectors/sources/ramp.svg
logo_source_path: airbyte-integrations/connectors/source-ramp/icon.svg
logo_sha256: d0de36b0f7e675986f9f4afd084f47d1274aa61da4c02512e0f4891df8ff9e90
original_metadata_path: airbyte-integrations/connectors/source-ramp/metadata.yaml
original_metadata_sha256: 7513fdbb3841b5d7397b8cd9930a80320c8eae056a48d185b7ea705a18a20afc
original_document_path: docs/integrations/sources/ramp.md
original_document_sha256: e81495717d555275e77ed105b8cfbe4b8434ab00513f1da45982f73b26210984
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 04c3ba8057d41b48ccf15c696171070e119c94184e6318b95b562ea7683f95ad
rewritten_at: 2026-11-12T13:53:39.781394+00:00
---

# Ramp

The Ramp source syncs data from the [Ramp Developer API](https://docs.ramp.com/developer-api) for one Ramp business. It covers card spend, including cards, transactions, and reimbursements. It also covers users, departments, locations, entities, business details, funds, and spend programs. Accounts payable and procurement data includes bills, vendors, receipts, merchants, and purchase orders.

## Prerequisites

- A Ramp account with administrator access, allowing you to create a developer app.
- A Ramp developer app using the **Client Credentials** grant type. Enable the `transactions:read`, `cards:read`, and `reimbursements:read` scopes, plus the read scope for each other stream you want to sync. See [Supported Streams](#supported-streams) for the scope required by each stream.
- The app's client ID and client secret.

## Setup

Create a developer app in Ramp. Then create the Airbyte source using the app's client ID and client secret.

## Set up Ramp

1. In your Ramp account, go to **Company** > **Developer**.
2. Select **Create New App**, name the app, and accept the terms.
3. Under **Grant types**, select **Add new grant type** > **Client Credentials**. The connector authenticates server-to-server. It doesn't use the authorization code flow or need a redirect URI.
4. Under **Scopes**, select **Configure allowed scopes**. Enable `transactions:read`, `cards:read`, and `reimbursements:read`. Then enable the read scope for every other stream you plan to sync.
5. Copy the client ID and client secret.

For more information, see Ramp's [quickstart](https://docs.ramp.com/developer-api/v1/getting-started) and [authorization guide](https://docs.ramp.com/developer-api/v1/authorization).

<HideInUI>

## Set up Ramp in Airbyte

1. Open your [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account or your self-managed Airbyte instance.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Ramp** from the Source type dropdown.
4. Enter a name for the Ramp connector.
5. Enter the **Ramp Client ID** and **Ramp Client Secret** from your developer app.
6. Optionally, set **Start Date**. See [Start Date](#start-date).
7. Click **Set up source**.

</HideInUI>

## Connector settings

### Start Date

On the first sync, the `transactions` and `reimbursements` streams only read records with an `updated_at` on or after this date. The `receipts` stream only reads receipts created on or after this date. Later syncs use the saved cursor. Other streams ignore Start Date. This includes `vendors`, which reads every vendor during its first sync. If you leave Start Date empty, the connector uses `2019-01-01T00:00:00Z`.

Enter Start Date as a UTC timestamp with a `Z` suffix, such as `2024-01-01T00:00:00Z`. Fractional seconds, such as `2024-01-01T00:00:00.000Z`, are accepted. Values with a numeric offset, such as `2024-01-01T00:00:00+00:00`, are rejected.

### Connection test

The connection test only reads the `transactions` stream. The test still passes if your app lacks the scope for another stream. That stream then fails during the sync.

## Test with the Ramp sandbox

The connector calls `https://api.ramp.com` by default. Since version 0.0.4, an **API Base URL** (`api_url`) field can direct it to Ramp's [sandbox](https://docs.ramp.com/developer-api/v1/sandbox) at `https://demo-api.ramp.com`. The value must start with `https://`. Keep the default for production accounts.

The field is hidden in the Airbyte UI, so you must set it programmatically. Include it in the source configuration sent through the Airbyte API, Terraform provider, or PyAirbyte. Sandbox and production credentials aren't interchangeable. Create a developer app in the sandbox (`https://demo.ramp.com`) with the same grant type and scopes. Use that app's client ID and secret with the sandbox base URL.

## Supported sync modes

The Ramp source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

Only `transactions`, `reimbursements`, `receipts`, and `vendors` support incremental syncs. Every other stream reads all records again during each sync.

- **Incremental syncs filter on the server.** For `transactions` and `reimbursements`, the connector sends the cursor as the `updated_after` query parameter. Ramp doesn't list `updated_after` in its published parameters for the transactions endpoint. However, testing confirms that the API honours it. If Ramp stopped honouring it, each sync would read every transaction again. You would receive duplicate rows, not lose rows. For `receipts`, the connector sends the cursor as `created_after`. For `vendors`, it sends the saved cursor as `from_updated_at`. A full refresh or first incremental sync of `vendors` sends no filter and reads every vendor.
- **Records at the cursor boundary are read again.** Testing shows that `updated_after` and `created_after` include records at the exact specified time. Ramp rounds vendor `updated_at` values down to whole seconds. Therefore, `from_updated_at` also returns the vendor at the saved cursor. The next sync emits records again when their cursor value equals the saved cursor. Use the **Incremental - Append + Deduped** sync mode to keep one row per `id`.
- **`receipts` only picks up new receipts.** Ramp's receipts have no `updated_at` field, so incremental syncs use `created_at`. Changes made after the sync first reads a receipt aren't synced until you refresh the stream.
- **Incremental `vendors` leaves spend totals stale.** The `total_spend_last_30_days`, `total_spend_last_365_days`, `total_spend_ytd`, and `total_spend_all_time` fields are running totals that change over time. Ramp doesn't document whether those changes update the vendor's `updated_at`. An incremental sync only reads vendors again when their `updated_at` changes. These totals can therefore retain the value from the last sync that read the vendor. If you report on them, sync `vendors` using a **Full Refresh** mode instead.
- **Incremental `vendors` keeps deleted vendors.** A vendor deleted in Ramp stops appearing in the API. Incremental syncs don't detect the deletion, so the destination keeps its last row. **Full Refresh - Overwrite** removes it during the next sync.

## Supported streams

All endpoints are under `/developer/v1`.

| Stream | API endpoint | Required scope | Primary key | Sync modes | Incremental cursor |
| --- | --- | --- | --- | --- | --- |
| `cards` | `GET /cards` | `cards:read` | `id` | Full refresh | None |
| `transactions` | `GET /transactions` | `transactions:read` | `id` | Full refresh, incremental | `updated_at` |
| `reimbursements` | `GET /reimbursements` | `reimbursements:read` | `id` | Full refresh, incremental | `updated_at` |
| `users` | `GET /users` | `users:read` | `id` | Full refresh | None |
| `departments` | `GET /departments` | `departments:read` | `id` | Full refresh | None |
| `locations` | `GET /locations` | `locations:read` | `id` | Full refresh | None |
| `entities` | `GET /entities` | `entities:read` | `id` | Full refresh | None |
| `business` | `GET /business` | `business:read` | `id` | Full refresh | None |
| `business_balance` | `GET /business/balance` | `business:read` | None | Full refresh | None |
| `funds` | `GET /funds` | `funds:read` | `id` | Full refresh | None |
| `spend_programs` | `GET /spend-programs` | `spend_programs:read` | `id` | Full refresh | None |
| `bills` | `GET /bills` | `bills:read` | `id` | Full refresh | None |
| `vendors` | `GET /vendors` | `vendors:read` | `id` | Full refresh, incremental | `updated_at` |
| `vendor_contacts` | `GET /vendors/{vendor_id}/contacts` | `vendors:read` | `vendor_id`, `id` | Full refresh | None |
| `vendor_agreements` | `POST /vendors/agreements` | `vendors:read` | `id` | Full refresh | None |
| `receipts` | `GET /receipts` | `receipts:read` | `id` | Full refresh, incremental | `created_at` |
| `merchants` | `GET /merchants` | `merchants:read` | `id` | Full refresh | None |
| `purchase_orders` | `GET /purchase-orders` | `purchase_orders:read` | `id` | Full refresh | None |

### Card spend

`cards` returns physical and virtual cards, including their state, cardholder, card program, and spending restrictions. It doesn't return terminated cards because it reads Ramp's legacy cards endpoint (`GET /cards`), which excludes them. With the **Overwrite** or **Overwrite + Deduped** sync mode, a card disappears from the destination after its first post-termination sync. Its transactions remain in the `transactions` stream. Use a left join from `transactions.card_id` to `cards`, or read the cardholder from `transactions.card_holder`. With **Append**, the destination keeps every earlier card copy. The newest copy still shows its pre-termination `state`, such as `ACTIVE`.

`transactions` returns card transactions in every state, including `DECLINED`. Declined transactions have `state: DECLINED` and a populated `decline_details` object. Filter them out when calculating spend totals.

The connector also requests purchase data that merchants send to Ramp and stores it in the `merchant_data` field. This data can include itemised receipt lines, a merchant reference, and flight, lodging, or car rental details. `merchant_data` is null when a transaction's merchant sent no purchase data. Versions before 0.3.0 didn't request this data. Refresh the `transactions` stream to populate `merchant_data` for transactions you've already synced.

`reimbursements` returns out-of-pocket reimbursements and repayments. Ramp's endpoint returns one direction at a time. The connector requests both `BUSINESS_TO_USER` (out-of-pocket reimbursements) and `USER_TO_BUSINESS` (repayments), then emits them into one stream. Use the `direction` field to distinguish them.

### Business and spend controls

`users` returns users in every status. Ramp's users list excludes suspended users by default, so the connector reads them in a second request.

`business` returns one record containing your business's details. `business_balance` returns one snapshot of your current balances during each sync. It has no primary key, so each sync adds a new row with **Append**.

`funds` includes terminated funds. The connector reads active and terminated funds in separate requests.

### Accounts payable and procurement

`bills` includes archived (deleted) bills. The connector reads active and archived bills in separate requests.

`vendors` excludes draft vendors and vendors awaiting approval because Ramp's vendors list omits them by default. The connector requests each vendor's ERP subsidiary identifiers. During incremental syncs, spend total fields aren't kept current and deleted vendors aren't removed. See [Supported sync modes](#supported-sync-modes).

`vendor_contacts` reads every vendor's contacts during each sync, even when `vendors` syncs incrementally. It adds the `vendor_id` to every record. If Ramp returns `404 Not Found` for a vendor, the connector skips that vendor.

`vendor_agreements` and `purchase_orders` include archived records.

`receipts` includes Ramp's OCR data for each receipt.

`purchase_orders` requires Ramp Plus. Deselect this stream if your Ramp plan doesn't include purchase orders.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Performance

Ramp allows 200 requests per rolling 10-second window for each source IP address. It returns `429 Too Many Requests` when you exceed this limit. The connector limits itself to 180 requests per 10 seconds. It retries failed requests up to 5 times using exponential backoff. Other Ramp sources or integrations from the same IP address share Ramp's limit. They can therefore still trigger `429` responses.

The connector reads 50 records per page. `vendor_contacts` makes at least one request for each vendor, so requests increase with vendor numbers. Ramp ends requests lasting longer than 60 seconds with a `504 Gateway Timeout`. See Ramp's [rate limits and timeouts](https://docs.ramp.com/developer-api/v1/rate-limiting) guide.

Ramp's client credentials access tokens last 10 days. The connector requests one token for each stream and reuses it for that stream's requests.

## Limitations and troubleshooting

### Limitations

- **Declined transactions from before version 0.1.0 aren't backfilled automatically.** Versions before 0.1.0 didn't sync declined transactions. Refresh the `transactions` stream to retrieve declined transactions older than your current cursor.
- **Date and timestamp fields are typed.** The connector declares Ramp's ISO 8601 date and timestamp fields using `date` or `date-time` formats. Typed destinations therefore store them as dates and timestamps instead of text. Streams added in version 0.2.0 were typed from the start. `cards`, `transactions`, and `reimbursements` were typed in version 1.0.0. Three date-like fields remain strings because Ramp doesn't return them in ISO 8601 format. These are `cards.expiration` (`MMYY`, for example `0430`), and `business_balance.next_billing_date` and `prev_billing_date` (`MM/DD/YYYY`). If you're upgrading from a version before 1.0.0, follow the [migration guide](/integrations/sources/ramp-migrations#upgrading-to-100).
- **One business per source.** Client credentials apply to one Ramp business. Create one Airbyte source for each business you want to sync.

### Deletions

Ramp's API doesn't report hard deletes. Some Ramp list endpoints exclude archived or terminated records by default. The connector also requests these records, so deleted records continue arriving with their final state:

- `bills`: archived bills have `archived_at` set.
- `purchase_orders`: archived purchase orders have `archived_at` set.
- `vendor_agreements`: archived agreements have `deleted_at` set.
- `funds`: terminated funds have `state: TERMINATED`.
- `users`: deactivated and suspended users remain in the stream with `status` `USER_INACTIVE` or `USER_SUSPENDED`.

Filter these fields downstream if you only want live records. `cards` is the exception. The connector's legacy cards endpoint doesn't return terminated cards. See [Card spend](#card-spend) for how they leave the destination.

### Configuration errors

The connector reports these Ramp errors as configuration errors, so Airbyte doesn't retry them:

| Error | Cause | Fix |
| --- | --- | --- |
| `Ramp rejected the client ID or client secret` | The token request returned `400` or `401`. | Copy the client ID and client secret again from **Company** > **Developer** > your app, and confirm the app has the **Client Credentials** grant type. |
| `Your Ramp app is not allowed to read this data` | Ramp returned error code `DEVELOPER_7100`. The connector requests every stream's scope when it gets a token. Ramp doesn't fail the token request when the app lacks one of those scopes. It issues a token without that scope, and only the streams that need it fail. | Enable the missing read scope on your app, then test the source again. Or deselect the streams that need it. |
| `Ramp no longer accepts this connector's access token` | Ramp returned error code `DEVELOPER_7002`. | Check that the Ramp app still exists and that its client secret hasn't been rotated, then test the source again. |
| `Ramp rejected the connector's credentials` | Any other `401` response. | Re-enter the client ID and client secret. |
| `Ramp denied access to this data` | Any other `403` response. | Confirm the app has the scope named in the error. For `purchase_orders`, confirm your plan includes Ramp Plus. |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 1.1.4 | 2026-11-10 | [91686](https://github.com/airbytehq/airbyte/pull/91686) | Update dependencies |
| 1.1.3 | 2026-11-03 | [90728](https://github.com/airbytehq/airbyte/pull/90728) | Update dependencies |
| 1.1.2 | 2026-10-27 | [90047](https://github.com/airbytehq/airbyte/pull/90047) | Update dependencies |
| 1.1.1 | 2026-10-20 | [89387](https://github.com/airbytehq/airbyte/pull/89387) | Update dependencies |
| 1.1.0 | 2026-10-15 | [88938](https://github.com/airbytehq/airbyte/pull/88938) | Make `vendors` incremental on `updated_at`, declare the `vendors.updated_at` field, show a readable Start Date format hint, and hide the generic Airbyte setup steps from the in-app guide |
| 1.0.2 | 2026-10-14 | [88895](https://github.com/airbytehq/airbyte/pull/88895) | Replace the outdated README with the shared declarative-source README, and rebuild the icon from Ramp's press-kit glyph |
| 1.0.1 | 2026-10-13 | [88768](https://github.com/airbytehq/airbyte/pull/88768) | Update dependencies |
| 1.0.0 | 2026-10-12 | [88373](https://github.com/airbytehq/airbyte/pull/88373) | Declare 13 date and timestamp fields on `cards`, `transactions` and `reimbursements` with their real types. See the [migration guide](/integrations/sources/ramp-migrations#upgrading-to-100) |
| 0.3.0 | 2026-10-08 | [88365](https://github.com/airbytehq/airbyte/pull/88365) | Request merchant purchase data on `transactions` and declare 10 more fields Ramp already returns |
| 0.2.1 | 2026-10-06 | [87999](https://github.com/airbytehq/airbyte/pull/87999) | Update dependencies |
| 0.2.0 | 2026-10-02 | [87610](https://github.com/airbytehq/airbyte/pull/87610) | Add 15 streams for Ramp's organisation, spend-control, accounts-payable and procurement resources |
| 0.1.0 | 2026-10-01 | [86957](https://github.com/airbytehq/airbyte/pull/86957) | Map Ramp auth and scope errors to config errors, add a rate-limit budget, filter `transactions` server-side, sync declined transactions, declare missing fields, and make `start_date` optional |
| 0.0.8 | 2026-09-29 | [87331](https://github.com/airbytehq/airbyte/pull/87331) | Update dependencies |
| 0.0.7 | 2026-09-22 | [86778](https://github.com/airbytehq/airbyte/pull/86778) | Update dependencies |
| 0.0.6 | 2026-09-15 | [86193](https://github.com/airbytehq/airbyte/pull/86193) | Update dependencies |
| 0.0.5 | 2026-09-08 | [85624](https://github.com/airbytehq/airbyte/pull/85624) | Update dependencies |
| 0.0.4 | 2026-08-20 | [84843](https://github.com/airbytehq/airbyte/pull/84843) | Add hidden configurable API base URL for sandbox testing |
| 0.0.3 | 2026-08-18 | [84721](https://github.com/airbytehq/airbyte/pull/84721) | Update dependencies |
| 0.0.2 | 2026-08-11 | [84077](https://github.com/airbytehq/airbyte/pull/84077) | Update dependencies |
| 0.0.1 | 2026-08-06 | [83706](https://github.com/airbytehq/airbyte/pull/83706) | Initial release by [@MercureTony](https://github.com/MercureTony) via Connector Builder |

</details>
