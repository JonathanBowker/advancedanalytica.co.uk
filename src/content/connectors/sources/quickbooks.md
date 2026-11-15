---
generated_record: true
connector_name: QuickBooks
connector_type: source
connector_slug: quickbooks
connector_directory: source-quickbooks
definition_id: cf9c4355-b171-4477-8f2d-6c5cc5fc8b7e
version: 5.4.0
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/quickbooks
logo: /images/connectors/sources/quickbooks.svg
logo_source_path: airbyte-integrations/connectors/source-quickbooks/icon.svg
logo_sha256: 903ced4e3887d1ea05ab0bf329b4ee699e54ecde74b07aef0acc8474bbde07fb
original_metadata_path: airbyte-integrations/connectors/source-quickbooks/metadata.yaml
original_metadata_sha256: c8430fd77f15acb17567b323a50b6e336b5e31b24715bfc15b2781d87cc4e907
original_document_path: docs/integrations/sources/quickbooks.md
original_document_sha256: 3dfc341ddfcd17fa4e322ffc16b39a53ccba0faacfd1a9118d34cd91b3c01af3
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a6898575a48b3e1badba6669d5e0ff61ab471ce7d1eda2c2cc30fb4990731f76
rewritten_at: 2026-11-12T13:53:24.324538+00:00
---

# QuickBooks

Use this page to set up the QuickBooks Source connector and review its reference information.

## Prerequisites

- [Intuit QuickBooks account](https://quickbooks.intuit.com/global/)
- For the own-app option: an [Intuit Developer account](https://developer.intuit.com/app/developer/qbo/docs/get-started) with an app created
- **Client ID** and **Client Secret**: these identify your Intuit app when using the own-app option. Find them on the app profile's Keys tab, under My Apps on the developer site. Separate development and production versions are available.
- **Refresh Token**: this OAuth 2.0 token lets the connector exchange it for access tokens. It applies to the own-app option. Intuit's [OAuth 2.0 playground](https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0-playground) is the easiest way to get one. Select the `com.intuit.quickbooks.accounting` scope when authorising. The connector can't read data without it. The connector gets and maintains the **Access Token** and **Token Expiry Date** from the refresh token.
- **Realm ID**: for the own-app option, enter the labelled [Company ID](https://developer.intuit.com/app/developer/qbo/docs/learn/learn-basic-field-definitions#realm-id) of the company whose data you want to replicate.
- **Start Date** (optional): enter the earliest date-time to replicate, as a UTC timestamp in the form `YYYY-MM-DDTHH:MM:SSZ`. For example, use `2026-01-01T00:00:00Z`. Offsets and fractional seconds aren't accepted. Airbyte doesn't replicate data from before this date. If left empty, the connector uses one year before its first run and saves that date to the configuration.
- **Sandbox** (required for the own-app option; defaults to off): turn this on only for an Intuit Developer sandbox company. The sandbox uses your app's Development credentials. Leave it off for a real QuickBooks company, which uses your app's Production credentials.

## Setup guide

### Step 1: Set up your Intuit app

1. Create an [Intuit Developer account](https://developer.intuit.com/app/developer/qbo/docs/get-started).
2. Create an application.
3. Get your credentials. Intuit's [OAuth 2.0 playground](https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0-playground) is the easiest way to get them. The playground also shows the **Realm ID** of the company you authorise.

:::caution Refresh tokens rotate
Intuit issues a new refresh token roughly every 24 hours. Only the latest token continues working. The connector automatically stores each new token in the source configuration. Don't share the refresh token with another tool or a second Airbyte source. Otherwise, one stops working within a day and reports a rejected refresh token. Refresh tokens also expire after 100 days without use.
:::

### Step 2: Set up the connector in Airbyte

<!-- env:cloud -->

**For Airbyte Cloud:**

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. Then click **+ new source** in the top-right corner.
3. On the source setup page, select **QuickBooks** from the Source type dropdown. Enter a name for the connector.
4. Under **Authentication**, choose one option:
   - **Use the Airbyte OAuth App**: click **Authenticate your QuickBooks account**. This option supports production companies only.
   - **Use your own Intuit app**: enter your app's **Client ID**, **Client Secret**, **Refresh Token**, and **Realm ID**.
5. **Start date**: enter the date from which you want to replicate data.
6. **Page Size** (optional): enter the records requested per query page. Intuit's `MAXRESULTS` defaults to 1,000, which is also the maximum.
7. Click **Set up source**.

:::note
To sync a sandbox company, choose **Use your own Intuit app** and enter your app's development keys. Then turn on **Sandbox** under that option. The Airbyte app can access production companies only.
:::

<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

Under **Authentication**, choose **Use your own Intuit app**.

1. **Client ID**: the OAuth2.0 application ID.
2. **Client Secret**: the OAuth2.0 application secret.
3. **Refresh Token**: the refresh token used to get a new access token when the current token expires.
4. **Realm ID**: the labelled [Company ID](https://developer.intuit.com/app/developer/qbo/docs/learn/learn-basic-field-definitions#realm-id) for the company whose stream data you want to replicate.
5. **Start date**: the date from which you want to replicate data.
6. **Sandbox** (required; defaults to off): turn this on only to sync a sandbox company using your app's Development credentials. Leave it off for a real QuickBooks company.
7. **Page Size** (optional): the records requested per query page. Intuit's `MAXRESULTS` defaults to 1,000, which is also the maximum.

The connector gets the **Access Token** and maintains the **Token Expiry Date** after every refresh.
<!-- /env:oss -->

## Supported sync modes

The QuickBooks Source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

The `company_info` and `preferences` streams contain one row and support Full Refresh only. All other streams support Incremental sync.

Incremental streams use each record's `MetaData.LastUpdatedTime` as the cursor. The connector copies this value into each record's top-level `airbyte_cursor` field. The reference streams are `accounts`, `classes`, `departments`, `employees`, `payment_methods`, `tax_agencies`, `tax_codes`, `tax_rates`, and `terms`. They query the entire range from **Start Date**, or the last synced cursor, to now in one window. They page through the results. All other incremental streams query in 365-day windows, starting from **Start Date**. A company's first sync can take time when it has a long history. The `exchange_rates` stream returns one row per currency pair each day. It can be very large when multi-currency is enabled.

## Supported streams

The Source can sync these [Streams](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/most-commonly-used/account):

- [Accounts](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account)
- [Attachables](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/attachable)
- [BillPayments](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/billpayment)
- [Budgets](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/budget)
- [Bills](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/bill)
- [Classes](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/class)
- [CompanyInfo](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/companyinfo)
- [CreditCardPayments](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/creditcardpaymenttxn)
- [CreditMemos](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/creditmemo)
- [Customers](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/customer)
- [Departments](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/department)
- [Deposits](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/deposit)
- [Employees](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/employee)
- [Estimates](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/estimate)
- [ExchangeRates](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/exchangerate)
- [Invoices](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice)
- [Items](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/item)
- [JournalEntries](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/journalentry)
- [Payments](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/payment)
- [PaymentMethods](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/paymentmethod)
- [Purchases](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/purchase)
- [Preferences](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/preferences)
- [PurchaseOrders](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/purchaseorder)
- [RefundReceipts](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/refundreceipt)
- [ReimburseCharges](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/reimbursecharge)
- [SalesReceipts](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/salesreceipt)
- [TaxAgencies](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/taxagency)
- [TaxCodes](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/taxcode)
- [TaxRates](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/taxrate)
- [Terms](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/term)
- [TimeActivities](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/timeactivity)
- [Transfers](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/transfer)
- [VendorCredits](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/vendorcredit)
- [Vendors](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/vendor)

## Data type map

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`         | `string`     |       |
| `number`         | `number`     |       |
| `array`          | `array`      |       |
| `object`         | `object`     |       |

## Troubleshoot errors

| What you see | What it means | What to do |
| :----------- | :------------ | :--------- |
| `Refresh token was rejected by the OAuth provider...` or `The QuickBooks OAuth grant is expired or revoked...` | Intuit invalidated the refresh token. The first message comes from Intuit's token endpoint (`invalid_grant`), the second from an API call answered with HTTP 401. Refresh tokens expire after 100 days of disuse, and are revoked if the app is disconnected in Intuit's **My Apps**. | Obtain a new refresh token and update the source. |
| `QuickBooks rejected the app credentials...` (fault code `3200`) | Wrong **Client ID**/**Client Secret**, or development keys used against production (or the reverse). | Re-copy both keys from the matching environment on the app's **Keys** tab. |
| `The QuickBooks user has not authorized this app for the configured company.` (fault code `3201`) | The company was never authorized for this app, or authorization was revoked. | Re-run the authorization flow for that company. |
| `The QuickBooks OAuth grant lacks the accounting scope...` (HTTP 403) | The grant is missing `com.intuit.quickbooks.accounting`. | Re-authorize with the accounting scope selected. |
| `QuickBooks does not recognize the configured Realm ID.` (HTTP 404) | The **Realm ID** does not exist in the environment being called — most often a sandbox realm with **Sandbox** turned off. | Correct the **Realm ID**, or toggle **Sandbox** to match it. |
| Sync retries then fails with a throttling error | Intuit throttles at 500 requests per minute per realm. | Reduce concurrent syncs against the same company; the connector already retries with exponential backoff. |

Deleted records: QuickBooks soft-deletes records by setting `Active` to `false`. These updates sync because each incremental stream's query includes the `Active IN (true, false)` clause. The clause delivers the flag. These entities have no `Active` field: CompanyInfo, Preferences, ExchangeRate, ReimburseCharge, Attachable, and CreditCardPaymentTxn. Their streams omit the clause and carry no soft-delete signal. QuickBooks reports permanently deleted records only through Intuit's change-data-capture endpoint. This connector doesn't read that endpoint, so those records remain in the destination.

## IP allow list

If your Airbyte Cloud access is restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

> **Note:** Connector version 4.0.0 moved the credential fields (`client_id`, `client_secret`, `refresh_token`, `realm_id`, `access_token`, `token_expiry_date`) out of a nested `credentials` object to the root of the configuration. As of version 4.2.0, sources still using the nested shape are migrated automatically at the start of each sync — no manual repopulation is needed.

<details>
  <summary>Expand to review</summary>

| Version       | Date         | Pull Request                                               | Subject                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | ------------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5.4.0 | 2026-11-04 | [91003](https://github.com/airbytehq/airbyte/pull/91003) | **Sandbox** is required for the own-app option (existing configs default to off); **Access Token** and **Token Expiry Date** are hidden because the connector maintains them; clarify when to turn on **Sandbox** |
| 5.3.0 | 2026-11-03 | [90869](https://github.com/airbytehq/airbyte/pull/90869) | Transaction and other non-reference incremental streams query in 365-day windows instead of 30-day windows, so syncs send far fewer requests |
| 5.2.0 | 2026-11-03 | [90868](https://github.com/airbytehq/airbyte/pull/90868) | Start Date is optional; if left empty, it's set to 1 year before the connector's first run and saved to the configuration |
| 5.1.2 | 2026-10-30 | [90260](https://github.com/airbytehq/airbyte/pull/90260) | Revert the 5.1.2-rc.1 change that read incremental streams in one query window once they had saved state; those streams use 30-day windows again. Reference streams (accounts, classes, departments, employees, payment methods, tax agencies, tax codes, tax rates, terms) still read their whole date range in one query window |
| 5.1.2-rc.1 | 2026-10-29 | [90226](https://github.com/airbytehq/airbyte/pull/90226) | Reference streams read their whole date range in one query window, and the other incremental streams use 30-day windows only on a first sync or in full-refresh mode, so syncs send far fewer requests |
| 5.1.1 | 2026-10-27 | [89393](https://github.com/airbytehq/airbyte/pull/89393) | Update dependencies |
| 5.1.0 | 2026-10-26 | [89764](https://github.com/airbytehq/airbyte/pull/89764) | Page Size now defaults to 1,000 and sources still set to the old default of 200 are migrated to 1,000; incremental streams no longer send an extra empty request after the last page of each window |
| 5.0.0 | 2026-10-13 | [88914](https://github.com/airbytehq/airbyte/pull/88914) | Breaking: authentication fields moved under `credentials`; existing sources fail until reconfigured — choose **Use the Airbyte OAuth App** and click Authenticate (production only), or **Use your own Intuit app** and re-enter credentials (required for sandbox) |
| 4.2.2 | 2026-10-13 | [88915](https://github.com/airbytehq/airbyte/pull/88915) | Pin Airbyte Cloud to 4.0.4 and disable progressive rollout while the 4.2.x OAuth credential override is fixed |
| 4.2.1 | 2026-10-13 | [78925](https://github.com/airbytehq/airbyte/pull/78925) | Update dependencies |
| 4.2.0 | 2026-09-24 | [85216](https://github.com/airbytehq/airbyte/pull/85216) | Certification: actionable error handling for Intuit fault codes and rejected refresh tokens, SDM 7.30.0 bump, rate-limit budget and stream concurrency, automatic migration of pre-4.0.0 nested credentials configs, Cloud OAuth via advanced_auth, a configurable Page Size, and six new streams (company_info, preferences, exchange_rates, reimburse_charges, attachables, credit_card_payments; first two full refresh) |
| 4.1.8 | 2025-05-24 | [60468](https://github.com/airbytehq/airbyte/pull/60468) | Update dependencies |
| 4.1.7 | 2025-05-10 | [60170](https://github.com/airbytehq/airbyte/pull/60170) | Update dependencies |
| 4.1.6 | 2025-05-03 | [59500](https://github.com/airbytehq/airbyte/pull/59500) | Update dependencies |
| 4.1.5 | 2025-04-27 | [58481](https://github.com/airbytehq/airbyte/pull/58481) | Update dependencies |
| 4.1.4 | 2025-04-12 | [57880](https://github.com/airbytehq/airbyte/pull/57880) | Update dependencies |
| 4.1.3 | 2025-04-05 | [57355](https://github.com/airbytehq/airbyte/pull/57355) | Update dependencies |
| 4.1.2 | 2025-03-29 | [56800](https://github.com/airbytehq/airbyte/pull/56800) | Update dependencies |
| 4.1.1 | 2025-03-22 | [56202](https://github.com/airbytehq/airbyte/pull/56202) | Update dependencies |
| 4.1.0 | 2025-03-14 | [55776](https://github.com/airbytehq/airbyte/pull/55776) | Promoting release candidate 4.1.0-rc.1 to a main version. |
| 4.1.0-rc.1 | 2025-03-10 | [55263](https://github.com/airbytehq/airbyte/pull/55263) | Migrate to manifest-only |
| 4.0.4 | 2025-03-08 | [55527](https://github.com/airbytehq/airbyte/pull/55527) | Update dependencies |
| 4.0.3 | 2025-03-01 | [55075](https://github.com/airbytehq/airbyte/pull/55075) | Update dependencies |
| 4.0.2 | 2025-02-23 | [54573](https://github.com/airbytehq/airbyte/pull/54573) | Update dependencies |
| 4.0.1 | 2025-02-15 | [46789](https://github.com/airbytehq/airbyte/pull/46789) | Update dependencies |
| 4.0.0 | 2025-01-18 | [51615](https://github.com/airbytehq/airbyte/pull/51615) | Remove nested credentials object from config to enable overwriting of new refresh token in config |
| 3.0.26 | 2024-11-01 | [48089](https://github.com/airbytehq/airbyte/pull/48089) | Promoting release candidate 3.0.26-rc.1 to a main version. |
| 3.0.26-rc.1 | 2024-09-10 | [44560](https://github.com/airbytehq/airbyte/pull/44560) | Replace Custom Components with Airbyte CDK features |
| 3.0.25 | 2024-10-05 | [46424](https://github.com/airbytehq/airbyte/pull/46424) | Update dependencies |
| 3.0.24 | 2024-09-28 | [46142](https://github.com/airbytehq/airbyte/pull/46142) | Update dependencies |
| 3.0.23 | 2024-09-21 | [45727](https://github.com/airbytehq/airbyte/pull/45727) | Update dependencies |
| 3.0.22 | 2024-09-14 | [45517](https://github.com/airbytehq/airbyte/pull/45517) | Update dependencies |
| 3.0.21 | 2024-09-07 | [45231](https://github.com/airbytehq/airbyte/pull/45231) | Update dependencies |
| 3.0.20 | 2024-08-31 | [44961](https://github.com/airbytehq/airbyte/pull/44961) | Update dependencies |
| 3.0.19 | 2024-08-24 | [44713](https://github.com/airbytehq/airbyte/pull/44713) | Update dependencies |
| 3.0.18 | 2024-08-17 | [44282](https://github.com/airbytehq/airbyte/pull/44282) | Update dependencies |
| 3.0.17 | 2024-08-12 | [43829](https://github.com/airbytehq/airbyte/pull/43829) | Update dependencies |
| 3.0.16 | 2024-08-10 | [43563](https://github.com/airbytehq/airbyte/pull/43563) | Update dependencies |
| 3.0.15 | 2024-08-03 | [43052](https://github.com/airbytehq/airbyte/pull/43052) | Update dependencies |
| 3.0.14 | 2024-07-27 | [42666](https://github.com/airbytehq/airbyte/pull/42666) | Update dependencies |
| 3.0.13 | 2024-07-20 | [42358](https://github.com/airbytehq/airbyte/pull/42358) | Update dependencies |
| 3.0.12 | 2024-07-13 | [41745](https://github.com/airbytehq/airbyte/pull/41745) | Update dependencies |
| 3.0.11 | 2024-07-10 | [41414](https://github.com/airbytehq/airbyte/pull/41414) | Update dependencies |
| 3.0.10 | 2024-07-10 | [41325](https://github.com/airbytehq/airbyte/pull/41325) | Update dependencies |
| 3.0.9 | 2024-07-09 | [40660](https://github.com/airbytehq/airbyte/pull/40660) | Fix configured catalog, inline schemas |
| 3.0.8 | 2024-07-06 | [40885](https://github.com/airbytehq/airbyte/pull/40885) | Update dependencies |
| 3.0.7 | 2024-06-25 | [40355](https://github.com/airbytehq/airbyte/pull/40355) | Update dependencies |
| 3.0.6 | 2024-06-22 | [39955](https://github.com/airbytehq/airbyte/pull/39955) | Update dependencies |
| 3.0.5 | 2024-06-06 | [39285](https://github.com/airbytehq/airbyte/pull/39285) | [autopull] Upgrade base image to v1.2.2 |
| 3.0.4 | 2024-05-21 | [38518](https://github.com/airbytehq/airbyte/pull/38518) | [autopull] base image + poetry + up_to_date |
| `3.0.3`       | 2024-03-22   | [36389](https://github.com/airbytehq/airbyte/pull/36389)   | Add refresh token updater and add missing properties to streams                                                                                                                                                                                                                                                                                                                                          |
| `3.0.2`       | 2024-02-20   | [32236](https://github.com/airbytehq/airbyte/pull/32236)   | Small typo in spec correction                                                                                                                                                                                                                                                                                                                                                                            |
| `3.0.1`       | 2023-11-06   | [32236](https://github.com/airbytehq/airbyte/pull/32236)   | Upgrade to `airbyte-cdk>=0.52.10` to resolve refresh token issues                                                                                                                                                                                                                                                                                                                                        |
| `3.0.0`       | 2023-09-26   | [30770](https://github.com/airbytehq/airbyte/pull/30770)   | Update schema to use `number` instead of `integer`                                                                                                                                                                                                                                                                                                                                                       |
| `2.0.5`       | 2023-09-26   | [30766](https://github.com/airbytehq/airbyte/pull/30766)   | Fix improperly named keyword argument                                                                                                                                                                                                                                                                                                                                                                    |
| `2.0.4`       | 2023-06-28   | [27803](https://github.com/airbytehq/airbyte/pull/27803)   | Update following state breaking changes                                                                                                                                                                                                                                                                                                                                                                  |
| `2.0.3`       | 2023-06-08   | [27148](https://github.com/airbytehq/airbyte/pull/27148)   | Update description and example values of a Start Date in spec.json                                                                                                                                                                                                                                                                                                                                       |
| `2.0.2`       | 2023-06-07   | [26722](https://github.com/airbytehq/airbyte/pull/27053)   | Update CDK version and adjust authenticator configuration                                                                                                                                                                                                                                                                                                                                                |
| `2.0.1`       | 2023-05-28   | [26722](https://github.com/airbytehq/airbyte/pull/26722)   | Change datatype for undisclosed amount field in payments                                                                                                                                                                                                                                                                                                                                                 |
| `2.0.0`       | 2023-04-11   | [25045](https://github.com/airbytehq/airbyte/pull/25045)   | Fix datetime format, disable OAuth button in cloud                                                                                                                                                                                                                                                                                                                                                       |
| `1.0.0`       | 2023-03-20   | [24324](https://github.com/airbytehq/airbyte/pull/24324)   | Migrate to Low-Code                                                                                                                                                                                                                                                                                                                                                                                      |
| `0.1.5`       | 2022-02-17   | [10346](https://github.com/airbytehq/airbyte/pull/10346)   | Update label `Quickbooks` -> `QuickBooks`                                                                                                                                                                                                                                                                                                                                                                |
| `0.1.4`       | 2021-12-20   | [8960](https://github.com/airbytehq/airbyte/pull/8960)     | Update connector fields title/description                                                                                                                                                                                                                                                                                                                                                                |
| `0.1.3`       | 2021-08-10   | [4986](https://github.com/airbytehq/airbyte/pull/4986)     | Using number data type for decimal fields instead string                                                                                                                                                                                                                                                                                                                                                 |
| `0.1.2`       | 2021-07-06   | [4539](https://github.com/airbytehq/airbyte/pull/4539)     | Add `AIRBYTE_ENTRYPOINT` for Kubernetes support                                                                                                                                                                                                                                                                                                                                                          |

</details>
