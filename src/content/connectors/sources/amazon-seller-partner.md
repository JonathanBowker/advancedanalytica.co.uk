---
generated_record: true
connector_name: Amazon Seller Partner
connector_type: source
connector_slug: amazon-seller-partner
connector_directory: source-amazon-seller-partner
definition_id: e55879a8-0ef8-4557-abcf-ab34c53ec460
version: 7.0.2
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/amazon-seller-partner
logo: /images/connectors/sources/amazon-seller-partner.svg
logo_source_path: airbyte-integrations/connectors/source-amazon-seller-partner/icon.svg
logo_sha256: ddfaeb602e5ec6ba394867d16a725443c52050d767cc71d613918dd3537ff3f7
original_metadata_path: airbyte-integrations/connectors/source-amazon-seller-partner/metadata.yaml
original_metadata_sha256: 722f21071954c9a31e330b69fd15bc694cb13c2e28aa1113874688465d20fc3c
original_document_path: docs/integrations/sources/amazon-seller-partner.md
original_document_sha256: f63bbc92920676d71c20afdf4c337234eaddf26c47ae23c8745c58ea5dd453e7
rewrite_status: review
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 282ad7eaa4fb38f296d82ee1d941c27576b08fc031de112a4fc502f31911e115
rewritten_at: 2026-11-12T14:07:29.753115+00:00
---

# Amazon Seller Partner

<HideInUI>

Use this page to set up the [Amazon Seller Partner](https://developer.amazonservices.com/) source connector and find reference information.

</HideInUI>

## Prerequisites

- An Amazon Seller Partner account
- For Brand Analytics streams: registration in [Amazon Brand Registry](https://brandservices.amazon.com/) and the Brand Analytics role in your SP-API application. These streams include Market Basket Analysis, Search Terms, Repeat Purchase, Alternate Purchase and Item Comparison reports.
- The Brand Analytics role in your SP-API application for Sales and Traffic report streams and every vendor retail analytics report stream. These include Vendor Sales, Vendor Inventory, Vendor Traffic, Net Pure Product Margin, Rapid Retail Analytics Inventory and Vendor Forecasting. Amazon lists this role for each report type in the [analytics report type values](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics).
- For PII access in Orders and OrderItems streams: an approved [Restricted Role](https://developer-docs.amazon.com/sp-api/docs/roles-in-the-selling-partner-api) in your SP-API developer profile. You need either Direct-to-Consumer Shipping or Tax Invoicing to access BuyerInfo and ShippingAddress.

<!-- env:cloud -->

**For Airbyte Cloud:**

- AWS Environment
- AWS Region
- AWS Seller Partner Account Type
- Granted OAuth access

<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

- AWS Environment
- AWS Region
- AWS Seller Partner Account Type
- LWA Client Id
- LWA Client Secret
- Refresh Token

<!-- /env:oss -->

## Supported regions

The connector supports these Amazon marketplace regions: AE (United Arab Emirates), AU (Australia), BE (Belgium), BR (Brazil) and CA (Canada). It also supports DE (Germany), EG (Egypt), ES (Spain), FR (France), GB (United Kingdom), IE (Ireland) and IN (India). Other supported regions are IT (Italy), JP (Japan), MX (Mexico), NL (Netherlands), PL (Poland), SA (Saudi Arabia) and SE (Sweden). The connector also supports SG (Singapore), TR (Turkey), UK (United Kingdom) and US (United States).

GB and UK both refer to the United Kingdom marketplace. You can use them interchangeably. See the [Amazon SP-API documentation](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids) for the complete list of Amazon marketplace IDs.

## Setup guide

## Step 1: Set up Amazon Seller Partner

[Register](https://sellercentral.amazon.com/) your Amazon Seller Partner account.

<!-- env:oss -->

**Airbyte Open Source setup steps**

- [Register](https://developer-docs.amazon.com/sp-api/docs/registering-your-application) Amazon Seller Partner application. You must publish the application because Amazon doesn't allow external parties, including Airbyte, to access draft applications.

<!-- /env:oss -->

## Step 2: Set up the source connector in Airbyte

To pass the check, Seller accounts need access to [Orders endpoint](https://developer-docs.amazon.com/sp-api/docs/orders-api-v0-reference). Vendor accounts need access to [Vendor Orders endpoint](https://developer-docs.amazon.com/sp-api/docs/vendor-orders-api-v1-reference#get-vendorordersv1purchaseorders).

<!-- env:cloud -->

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Amazon Seller Partner from the Source type dropdown.
4. Enter a name for the Amazon Seller Partner connector.
5. Click `Authenticate your account`.
6. Log in and Authorize to your Amazon Seller Partner account.
7. For `Start Date`, enter the date in `YYYY-MM-DD` format. Data added on or after this date will be replicated. This field is optional. If you omit it, the connector uses the date two years before today. It uses the same date if your entry is more than two years old.
8. For `End Date`, enter the date in `YYYY-MM-DD` format. Data after this date won't be replicated. This field is optional. If you omit it, the connector uses today's date.
9. **Financial Events Step Size**: Select the time window for fetching financial events data from the ListFinancialEvents and ListFinancialEventGroups streams. Options include:
   - Hourly: 1H, 2H, 4H, 6H, 8H, 12H. These are recommended for high-volume sellers experiencing pagination token expiration.
   - Daily: 1D, 7D, 14D, 30D, 60D, 90D, 180D (default)
10. **Financial Events Max Results Per Page**: Set the maximum results per page for the ListFinancialEvents stream (1-100, default: 100). Lower this value if you encounter `InvalidInput` errors during sync. These errors occur when the response exceeds 10 MB.
11. For **Sales and Traffic Report ASIN Granularity**, select the ASIN detail level for the Sales and Traffic Report streams (`GET_SALES_AND_TRAFFIC_REPORT` and `GET_SALES_AND_TRAFFIC_REPORT_BY_MONTH`). Options are:
    - **PARENT** (default): Data aggregated at the parent ASIN level.
    - **CHILD**: Data at the child ASIN level, with `childAsin` values populated.
    - **SKU**: Data at the individual SKU level, with both `childAsin` and `sku` values populated.
12. You can add options for each report type in the **Report Options** section. The connector sends these options for both Inventory Ledger streams and four vendor retail analytics reports. These reports are Vendor Sales, Vendor Inventory, Vendor Traffic and Vendor Net Pure Product Margin. See [Report options](#report-options) before configuring them.
13. Enable **Include PII (Personally Identifiable Information)** to access PII fields in the Orders and OrderItems streams, including BuyerInfo and ShippingAddress. You need an approved Restricted Role from Amazon. Without the required role, the connector automatically uses standard access and leaves PII fields empty.
14. For **Max Done Report Age (Hours)**, set the maximum age for reusing a completed (DONE) report instead of creating one. Enter the age in hours. The default is `0`, so the connector never reuses completed reports and always creates a new one. Set a value from `1` to `72` to reuse recent reports and reduce API calls. The connector always reuses reports still in progress (IN_QUEUE, IN_PROGRESS), regardless of this setting.
15. For **Report Stream Lookback Window (Hours)**, set the hours of previously synced data that incremental report streams re-fetch during each sync. The default is `0`, which disables lookback. Increase the value when Amazon updates report data after a sync finishes. This setting doesn't affect `GET_SALES_AND_TRAFFIC_REPORT_BY_MONTH`, `GET_VENDOR_SALES_REPORT`, `GET_VENDOR_TRAFFIC_REPORT`, `GET_VENDOR_NET_PURE_PRODUCT_MARGIN_REPORT`, `GET_VENDOR_REAL_TIME_INVENTORY_REPORT` or `GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2`. To re-fetch their history, refresh those streams or move the replication start date back.
16. Enable **Stop Sync When Report Streams Are Rate Limited** to stop retries immediately when report creation exhausts the rate limit retry budget. The source then fails with an actionable configuration error. This helps when persistent rate limiting shows that you need to adjust the connector configuration. The source uses its backoff and retry strategy when this option is disabled (default). If every retry fails, it throws a transient error and may automatically reschedule the sync.
17. **Inbound API settings (Fulfillment Inbound streams only)**:
    - **Inbound Replication Mode**: Choose how the connector defines the time window for Fulfillment Inbound streams.
      - `rolling_days` (default): Fetch data for the last **N days including today**.
      - `fixed`: Fetch data for a fixed UTC datetime range.
    - **Inbound Rolling Days**: Used only when `Inbound Replication Mode=rolling_days`. Required when `Inbound Replication Mode=rolling_days`. Default: `30`. Minimum: `1`.
    - **Inbound Start Datetime** / **Inbound End Datetime**: Used only when `Inbound Replication Mode=fixed`. `Inbound Start Datetime` is required when `Inbound Replication Mode=fixed`. `Inbound End Datetime` is optional. If you don't set it, the connector uses the current UTC time. Format: `YYYY-MM-DDTHH:MM:SSZ` (UTC), for example `2026-01-25T00:00:00Z`.
    These options affect the **FbaInboundShipments** and **FbaInboundShipmentItems** streams.
18. Click `Set up source`.

<!-- /env:cloud -->

<!-- env:oss -->

#### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. On the Set up the source page, select Amazon Seller Partner from the Source type dropdown.
3. Enter a name for the Amazon Seller Partner connector.
4. Using the developer application from Step 1, [generate](https://developer-docs.amazon.com/sp-api/docs/self-authorization) refresh token.
5. For Start Date, enter the date in YYYY-MM-DD format. Data added on or after this date will be replicated. This field is optional. If you omit it, the connector uses the date two years before today. It uses the same date if your entry is more than two years old.
6. For End Date, enter the date in YYYY-MM-DD format. Data after this date won't be replicated. This field is optional. If you omit it, the connector uses today's date.
7. **Financial Events Step Size**: Select the time window for fetching financial events data from the ListFinancialEvents and ListFinancialEventGroups streams. Options include:
   - Hourly: 1H, 2H, 4H, 6H, 8H, 12H. These are recommended for high-volume sellers experiencing pagination token expiration.
   - Daily: 1D, 7D, 14D, 30D, 60D, 90D, 180D (default)
8. **Financial Events Max Results Per Page**: Set the maximum results per page for the ListFinancialEvents stream (1-100, default: 100). Lower this value if you encounter `InvalidInput` errors during sync. These errors occur when the response exceeds 10 MB.
9. For **Sales and Traffic Report ASIN Granularity**, select the ASIN detail level for the Sales and Traffic Report streams (`GET_SALES_AND_TRAFFIC_REPORT` and `GET_SALES_AND_TRAFFIC_REPORT_BY_MONTH`). Options are:
    - **PARENT** (default): Data aggregated at the parent ASIN level.
    - **CHILD**: Data at the child ASIN level, with `childAsin` values populated.
    - **SKU**: Data at the individual SKU level, with both `childAsin` and `sku` values populated.
10. You can add options for each report type in the **Report Options** section. The connector sends these options for both Inventory Ledger streams and four vendor retail analytics reports. These reports are Vendor Sales, Vendor Inventory, Vendor Traffic and Vendor Net Pure Product Margin. See [Report options](#report-options) before configuring them.
11. Enable **Include PII (Personally Identifiable Information)** to access PII fields in the Orders and OrderItems streams, including BuyerInfo and ShippingAddress. You need an approved Restricted Role from Amazon. Without the required role, the connector automatically uses standard access and leaves PII fields empty.
12. For **Max Done Report Age (Hours)**, set the maximum age for reusing a completed (DONE) report instead of creating one. Enter the age in hours. The default is `0`, so the connector never reuses completed reports and always creates a new one. Set a value from `1` to `72` to reuse recent reports and reduce API calls. The connector always reuses reports still in progress (IN_QUEUE, IN_PROGRESS), regardless of this setting.
13. For **Report Stream Lookback Window (Hours)**, set the hours of previously synced data that incremental report streams re-fetch during each sync. The default is `0`, which disables lookback. Increase the value when Amazon updates report data after a sync finishes. This setting doesn't affect `GET_SALES_AND_TRAFFIC_REPORT_BY_MONTH`, `GET_VENDOR_SALES_REPORT`, `GET_VENDOR_TRAFFIC_REPORT`, `GET_VENDOR_NET_PURE_PRODUCT_MARGIN_REPORT`, `GET_VENDOR_REAL_TIME_INVENTORY_REPORT` or `GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2`. To re-fetch their history, refresh those streams or move the replication start date back.
14. Enable **Stop Sync When Report Streams Are Rate Limited** to stop retries immediately when report creation exhausts the rate limit retry budget. The source then fails with an actionable configuration error. This helps when persistent rate limiting shows that you need to adjust the connector configuration. The source uses its backoff and retry strategy when this option is disabled (default). If every retry fails, it throws a transient error and may automatically reschedule the sync.
15. **Inbound API settings (Fulfillment Inbound streams only)**:
    - **Inbound Replication Mode**: Choose how the connector defines the time window for Fulfillment Inbound streams.
      - `rolling_days` (default): Fetch data for the last **N days including today**.
      - `fixed`: Fetch data for a fixed UTC datetime range.
    - **Inbound Rolling Days**: Used only when `Inbound Replication Mode=rolling_days`. Required when `Inbound Replication Mode=rolling_days`. Default: `30`. Minimum: `1`.
    - **Inbound Start Datetime** / **Inbound End Datetime**: Used only when `Inbound Replication Mode=fixed`. `Inbound Start Datetime` is required when `Inbound Replication Mode=fixed`. `Inbound End Datetime` is optional. If you don't set it, the connector uses the current UTC time. Format: `YYYY-MM-DDTHH:MM:SSZ` (UTC), for example `2026-01-25T00:00:00Z`.
    These options affect the **FbaInboundShipments** and **FbaInboundShipmentItems** streams.
16. Click `Set up source`.

<!-- /env:oss -->

## Supported sync modes

The Amazon Seller Partner source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- Full Refresh
- Incremental

The `GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL` and `GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_GENERAL` reports contain one row for each order item. They have no proven, reliably unique row identifier. Therefore, they have no primary key and don't offer `Incremental | Append + Deduped`.

## Supported streams

- [Active Listings Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-inventory) \(incremental\)
- [All Listings Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-inventory) \(incremental\)
- [Browse Tree Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-browse-tree) \(incremental\)
- [Canceled Listings Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-inventory) \(incremental\)
- [FBA Amazon Fulfilled Inventory Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [FBA Amazon Fulfilled Shipments Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-sales-reports) \(incremental\)
- [FBA Fee Preview Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-payments-reports) \(incremental\)
- [FBA Manage Inventory](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [FBA Manage Inventory Health Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [FBA Multi-Country Inventory Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [FBA Promotions Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-sales-reports) \(incremental\)
- [FBA Reimbursements Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-payments-reports) \(incremental\)
- [FBA Removal Order Detail Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-removals-reports) \(incremental\)
- [FBA Removal Shipment Detail Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-removals-reports) \(incremental\)
- [FBA Replacements Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-concessions-reports) \(incremental\)
- [FBA Returns Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-concessions-reports) \(incremental\)
- [FBA Storage Fees Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [FBA Stranded Inventory Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [Financial Events](https://developer-docs.amazon.com/sp-api/docs/finances-api-reference#get-financesv0financialevents) \(incremental\), see [Finances v0 deprecation](#finances-v0-deprecation)
- [Financial Event Groups](https://developer-docs.amazon.com/sp-api/docs/finances-api-reference#get-financesv0financialeventgroups) \(incremental\)
- [Flat File Archived Orders Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-order#order-tracking-reports) \(incremental\)
- [Flat File Feedback Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-performance) \(incremental\)
- [Flat File Orders By Last Update Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-order#order-tracking-reports) \(incremental\)
- [Flat File Orders By Order Date Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-order#order-tracking-reports) \(incremental\)
- [Flat File Returns Report by Return Date](https://developer-docs.amazon.com/sp-api/docs/report-type-values-returns) \(incremental\)
- [Flat File V2 Settlement Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-settlement) \(incremental\)
- [Inactive Listings Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-inventory) \(incremental\)
- [Inventory Ledger Report - Detailed View](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [Inventory Ledger Report - Summary View](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [Inventory Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-inventory) \(incremental\)
- [Open Listings Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-inventory) \(incremental\)
- [Orders](https://developer-docs.amazon.com/sp-api/docs/orders-api-v0-reference) \(incremental\)
- [Order Items](https://developer-docs.amazon.com/sp-api/docs/orders-api-v0-reference#getorderitems) \(incremental\)
- [Sales and Traffic Report By Date](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#seller-retail-analytics-reports) \(incremental\)
- [Restock Inventory Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-fba#fba-inventory-reports) \(incremental\)
- [Scheduled XML Order Report (Shipping)](https://developer-docs.amazon.com/sp-api/docs/report-type-values-order#order-reports) \(incremental\)
- [Suppressed Listings Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-inventory) \(incremental\)
- [Unshipped Orders Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-order#order-reports) \(incremental\)
- [Vendor Direct Fulfillment Shipping](https://developer-docs.amazon.com/sp-api/docs/vendor-direct-fulfillment-shipping-api-v1-reference) \(incremental\)
- [Vendor Forecasting Report (Fresh)](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports) \(full-refresh\)
- [Vendor Forecasting Report (Retail)](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports) \(full-refresh\)
- [Vendor Orders](https://developer-docs.amazon.com/sp-api/docs/vendor-orders-api-v1-reference#get-vendorordersv1purchaseorders) \(incremental\)
- [Vendor Order Status](https://developer-docs.amazon.com/sp-api/docs/vendor-orders-api-v1-reference#get-vendorordersv1purchaseOrdersStatus) \(incremental\)
- [Fulfillment Inbound Shipments](https://developer-docs.amazon.com/sp-api/reference/getshipments) \(full-refresh\)
- [Fulfillment Inbound Shipment Items](https://developer-docs.amazon.com/sp-api/reference/getshipmentitemsbyshipmentid) \(full-refresh\)
- [Amazon Search Terms Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#brand-analytics-reports) \(full-refresh\)
- [Market Basket Analysis Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#brand-analytics-reports) \(full-refresh\)
- [Repeat Purchase Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#brand-analytics-reports) \(full-refresh\)
- [Alternate Purchase Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#brand-analytics-reports) \(full-refresh\)
- [Item Comparison Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#brand-analytics-reports) \(full-refresh\)
- [Sales and Traffic Business Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#seller-retail-analytics-reports) \(incremental\)
- [Sales and Traffic Business Report \(Monthly\)](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#seller-retail-analytics-reports) \(incremental\)
- [Vendor Sales Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports) \(incremental\)
- [Vendor Inventory Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports) \(incremental\)
- [Vendor Traffic Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports) \(incremental\)
- [Vendor Net Pure Product Margin Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports) \(incremental\)
- [Vendor Rapid Retail Analytics Inventory Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports) \(incremental\), see `GET_VENDOR_REAL_TIME_INVENTORY_REPORT`. This stream reports inventory in hourly buckets. The connector replaces each record's `endTime` with `23:59:59Z` of the requested UTC report day. It does this because `endTime` is the stream's cursor. Use `startTime` to distinguish the hourly buckets.
- [XML Orders By Order Date Report](https://developer-docs.amazon.com/sp-api/docs/report-type-values-order#order-tracking-reports) \(incremental\)

### Streams by account type

The connector only shows streams compatible with your configured **Account Type** (Seller or Vendor). Amazon SP-API treats these as separate account types. Each credential set belongs to either a Seller Central or Vendor Central account.

**Seller accounts** have access to:

- Orders
- Order Items
- Financial Events
- Financial Event Groups
- Fulfillment Inbound Shipments
- Fulfillment Inbound Shipment Items
- All report streams (FBA reports, inventory reports, order reports, analytics, settlement, etc.)
- All Brand Analytics streams

**Vendor accounts** have access to:

- Vendor Orders
- Vendor Order Status
- Vendor Direct Fulfillment Shipping
- Vendor Forecasting Report (Fresh)
- Vendor Forecasting Report (Retail)
- Vendor Sales Report
- Vendor Inventory Report
- Vendor Traffic Report
- Vendor Net Pure Product Margin Report
- Vendor Rapid Retail Analytics Inventory Report
- All report streams (FBA reports, inventory reports, order reports, analytics, settlement, etc.)
- All Brand Analytics streams

Version 5.7.10 or later automatically removes configured streams for the wrong account type from your connection's catalog. You may receive a schema change notification asking you to accept the updated catalog.

See the [Amazon SP-API Role Mappings documentation](https://developer-docs.amazon.com/sp-api/docs/role-mappings) for more information about Amazon SP-API roles and permissions.

### Finances v0 deprecation

The Financial Events stream reads the Finances v0 `listFinancialEvents` operation. Amazon [deprecated](https://developer-docs.amazon.com/sp-api/docs/sp-api-deprecations) that operation on July 21, 2025. It plans to remove the operation on August 27, 2027. Amazon's replacement is the Finances v2024-06-19 [`listTransactions`](https://developer-docs.amazon.com/sp-api/docs/finances-api-v2024-06-19-reference) operation, which this connector doesn't use yet. Amazon's deprecation list doesn't include `listFinancialEventGroups`. Therefore, the Financial Event Groups stream isn't affected.

### Daily report windows

These daily report streams request one report for each UTC calendar day: Sales and Traffic Business Report (`GET_SALES_AND_TRAFFIC_REPORT`) and Sales and Traffic Report By Date (`GET_SALES_AND_TRAFFIC_REPORT_BY_DATE`). The same applies to Vendor Sales Report (`GET_VENDOR_SALES_REPORT`), Vendor Traffic Report (`GET_VENDOR_TRAFFIC_REPORT`) and Net Pure Product Margin Report (`GET_VENDOR_NET_PURE_PRODUCT_MARGIN_REPORT`). Vendor Inventory Report (`GET_VENDOR_INVENTORY_REPORT`) and Rapid Retail Analytics Inventory Report (`GET_VENDOR_REAL_TIME_INVENTORY_REPORT`) also use daily requests. Each report window is anchored to `00:00:00Z`–`23:59:59Z`. Amazon expands non-midnight report windows to include every calendar day they touch, then sums the results. Anchoring each request to one day keeps every record's metrics within that day.

Earlier versions sent an incorrect window on some of these streams in two ways. Upgrade, then refresh the affected streams to correct stored data. You can also re-sync the affected date range.

| Streams | Affected versions | Symptom | Fixed in |
| --- | --- | --- | --- |
| Sales and Traffic Business Report, Sales and Traffic Report By Date, Vendor Sales Report | before 5.9.2 | Off-midnight windows when a sync ended mid-day, inflating the metrics for the days those windows overlapped. Days look doubled. | 5.9.2 |
| Vendor Traffic Report, Net Pure Product Margin Report, Rapid Retail Analytics Inventory Report | 5.8.0 through 5.10.0 | No report window was sent at all, so Amazon returned its own default reporting period and every daily record was labelled with a date the report didn't cover. | 5.10.1 |
| Vendor Inventory Report | 5.0.0 through 6.0.x | No report window was sent at all. Amazon rejected every request with `dataStartTime and dataEndTime must be supplied`, so the stream returned no records. The stream was also full refresh only. | 6.1.0 |

### Vendor retail analytics time zone

Amazon reports vendor retail analytics data in Pacific Standard Time, regardless of your location or the marketplace's local time zone. This applies to Vendor Sales, Vendor Inventory, Vendor Traffic and Net Pure Product Margin. It also applies to Rapid Retail Analytics Inventory and Vendor Forecasting. Airbyte requests these reports using UTC date boundaries. Daily records may appear shifted against a local-time Vendor Central report.

### Vendor retail analytics availability lag

Amazon publishes the Vendor Sales, Vendor Traffic and Net Pure Product Margin reports [72 hours after the close of the period they cover](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports). Requesting an unpublished day makes the report fail with `The report data for the requested date range is not yet available`. This failure stops the whole stream instead of skipping that day.

From 6.0.4, these three streams stop four calendar days before the present instead of syncing to the current moment. You won't lose data. The first sync after Amazon publishes each day collects it. However, expect the latest three to four days to remain unavailable at any time. An explicit **End Date** is used as entered, without this holdback. Therefore, a date range ending within the last four days can still fail.

Before 6.0.4, every sync of these streams failed on its newest day. A sync is marked failed after 20 partial failures. Therefore, a long-running connection could fail even after loading most data.

<HideInUI>

### Entity-relationship diagram
<EntityRelationshipDiagram></EntityRelationshipDiagram>
</HideInUI>

## Report options

Amazon accepts a `reportOptions` object with each report request. Its options change the report's contents. Each report type accepts different options. See Amazon's [report type values](https://developer-docs.amazon.com/sp-api/docs/report-type-values) documentation for the list.

### Options you configure

The **Report Options** setting accepts a report type, stream name and list of option name/value pairs. From version 6.0.1, the connector sends these options for six streams:

- `GET_LEDGER_DETAIL_VIEW_DATA`: for example, set `eventType` to `Adjustments` to return only adjustment rows.
- `GET_LEDGER_SUMMARY_VIEW_DATA`: for daily rows, set `aggregatedByTimePeriod` to `DAILY` instead of Amazon's `MONTHLY` default. To group rows by fulfilment centre instead of country, set `aggregateByLocation` to `FC`.
- `GET_VENDOR_SALES_REPORT` and `GET_VENDOR_INVENTORY_REPORT`: Amazon documents `reportPeriod`, `distributorView` and `sellingProgram` as required for these reports.
- `GET_VENDOR_TRAFFIC_REPORT` and `GET_VENDOR_NET_PURE_PRODUCT_MARGIN_REPORT`: Amazon documents `reportPeriod` as required for these reports.

For other report types in the **Report Options** dropdown, the connector accepts and validates your entries. However, it doesn't send them to Amazon. Those reports use Amazon's defaults. [Issue #77617](https://github.com/airbytehq/airbyte/issues/77617) tracks the remaining streams.

For the four vendor retail analytics reports, the connector only sends your configured values. It doesn't supply defaults because the correct values depend on your vendor account. Without configured values, the request reaches Amazon without a `reportOptions` object, as in earlier versions. Amazon can reject this request. If these streams fail, add each report's required options. For example, use `reportPeriod` = `DAY` and `distributorView` = `MANUFACTURING` or `SOURCING`. Also use `sellingProgram` = `RETAIL`. Amazon's [vendor retail analytics documentation](https://developer-docs.amazon.com/sp-api/docs/report-type-values-analytics#vendor-retail-analytics-reports) lists the accepted values for each report. Use `DAY` for `reportPeriod`. The sales, traffic and net pure product margin streams request one calendar day per report. Option names and values are case-sensitive. Enter `distributorView`, not `distributorview`.

If Amazon can't generate a report (`FATAL` status), the connector writes Amazon's explanation to the sync logs. When an explanation identifies a missing option, the stream stops immediately without retrying. The error quotes Amazon's reason, helping you add the missing options under **Report Options**. If Amazon doesn't identify the options, the error lists those documented as required for that report type. Other streams continue syncing. The sync is marked failed when they finish. If Amazon rejects a configured option value, the error quotes its reason and asks you to check that value. For other reasons, including an unavailable reporting period, the connector retries the report as before. If every retry fails, the sync ends with the same generic async-job error. Check the sync logs for Amazon's reason.

Previously configured options take effect when you upgrade. This applies to either ledger stream before 5.9.3. It also applies to the four vendor retail analytics reports before 6.0.1. The records then change shape. A summary view aggregated `DAILY` returns one daily row instead of one monthly row. A detailed view filtered by `eventType` returns fewer rows. Refresh the stream if its history must match the new options.

### Options the connector sets

Some streams send options that you don't configure. The connector ignores anything you enter in **Report Options** for these report types:

| Stream | Report options sent |
| :----- | :------------------ |
| The five Brand Analytics streams | `reportPeriod: WEEK`, plus a fixed date range covering the most recent complete Sunday-to-Saturday week |
| `GET_SALES_AND_TRAFFIC_REPORT` | `asinGranularity` from **Sales and Traffic Report ASIN Granularity** |
| `GET_SALES_AND_TRAFFIC_REPORT_BY_MONTH` | `dateGranularity: MONTH` and `asinGranularity` |
| `GET_VENDOR_FORECASTING_FRESH_REPORT` | `sellingProgram: FRESH` |
| `GET_VENDOR_FORECASTING_RETAIL_REPORT` | `sellingProgram: RETAIL` |

Both Vendor Forecasting streams read Amazon's single `GET_VENDOR_FORECASTING_REPORT` report type. They differ only in the `sellingProgram` option they send.

Brand Analytics streams always request the same weekly window, so they only support full refresh. Each sync replaces the previous week's data with the latest complete week.

### Report window size

**Period In Days** controls the period covered by each report request and defaults to 90 days. Report streams cap this period at 365 days. These streams use lower caps because Amazon limits the data returned by each request:

| Stream or report type | Maximum window |
| :-------------------- | :------------- |
| Orders | 30 days |
| `GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL` | 30 days |
| `GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_GENERAL` | 30 days |
| `GET_AMAZON_FULFILLED_SHIPMENTS_DATA_GENERAL` | 30 days |
| `GET_FLAT_FILE_RETURNS_DATA_BY_RETURN_DATE` | 60 days |

If you enter a larger value, the connector applies the cap to those streams. It applies your value to the remaining streams.

Other streams ignore **Period In Days**:

- The daily report streams in [Daily report windows](#daily-report-windows) always request one calendar day for each report. Sales and Traffic Business Report (Monthly) always requests one calendar month.
- Vendor Orders, Vendor Order Status and Vendor Direct Fulfillment Shipping always request seven days at a time.
- Financial Events and Financial Event Groups use **Financial Events Step Size** instead.

## Performance considerations

See [Usage Plans and Rate Limits in the SP-API](https://developer-docs.amazon.com/sp-api/docs/usage-plans-and-rate-limits-in-the-sp-api) for information about rate limits.

Some report types have limits beyond the API-wide limits. For example, Amazon allows only three `GET_SALES_AND_TRAFFIC_REPORT` requests every five minutes. A long Sales and Traffic backfill therefore spends most of its time backing off.

### Report reuse

Before creating a report, the connector checks Amazon SP-API for one matching the report type, date range and marketplace IDs. If it finds a match, it reuses the report instead of calling `createReport`. This reduces API calls and helps prevent 429 rate limit errors.

- The connector always reuses **In-progress reports** (IN_QUEUE, IN_PROGRESS), regardless of age.
- It only reuses **Completed reports** (DONE) when `max_done_report_age_hours` exceeds 0 and the report falls within that time window. With the default value of `0`, the connector always creates a new report.
- It reuses and silently skips **Cancelled reports** (CANCELLED). The connector doesn't retry cancelled reports. The sync continues with the next date slice, but the cursor doesn't advance. The next sync therefore retries the same period.
- It reuses **Failed reports** (FATAL) and applies the connector's retry logic.

If the pre-check fails because of a network or API error, the connector creates a new report normally.

#### Cancellation and data loss

According to the [Amazon SP-API documentation](https://developer-docs.amazon.com/sp-api/reference/getreport), Amazon can cancel a report in two ways:

1. **Automatic cancellation**: Amazon automatically cancels a report when the requested parameters return no data. This is expected behaviour, and no data is lost. That period simply had nothing to report.
2. **Manual cancellation**: A user or application explicitly cancels a report through the [cancelReport](https://developer-docs.amazon.com/sp-api/reference/cancelreport) API before processing finishes.

:::caution
**If a report is manually cancelled, data for that time period will be skipped.** The connector handles every CANCELLED report identically. It skips the report without retrying or fetching records. Cancelling a report during connector processing prevents data for that report's date range from syncing. The cursor doesn't advance, so the connector tries to create another report for that period during the next sync. However, it skips the cancelled report again while that report remains the latest match. This continues until the report ages out of the report list.

Don't manually cancel reports used by Airbyte syncs. This prevents data loss.
:::

- Use the **Financial Events Step Size** configuration for the ListFinancialEvents and ListFinancialEventGroups streams:
  - **Hourly step sizes**, such as `1H` and `6H`, suit high-volume sellers experiencing pagination token expiration (TTL errors). They fetch smaller request chunks, reducing timeout risk.
  - **Daily step sizes**, such as `1D` and `7D`, suit moderate data volumes. They balance sync speed with API efficiency.
  - **Larger step sizes**, such as `30D` and `180D`, suit smaller data volumes. They reduce the number of API calls.

## Data type map

| Integration Type         | Airbyte Type |
|:-------------------------|:-------------|
| `string`                 | `string`     |
| `int`, `float`, `number` | `number`     |
| `date`                   | `date`       |
| `datetime`               | `datetime`   |
| `array`                  | `array`      |
| `object`                 | `object`     |

## PII access for Orders and OrderItems

The Orders and OrderItems streams can return personally identifiable information (PII). This includes buyer names, shipping addresses and phone numbers. Amazon restricts these fields through [Restricted Data Tokens (RDTs)](https://developer-docs.amazon.com/sp-api/docs/tokens-api-use-case-guide).

Enable **Include PII** in the connector configuration to access PII fields. The connector then requests an RDT scoped to the Orders and OrderItems endpoints. You must meet these prerequisites:

- Your Amazon SP-API developer profile needs an approved Restricted Role: **Direct-to-Consumer Shipping** or **Tax Invoicing**. To request access, update your [developer profile](https://developer-docs.amazon.com/sp-api/docs/roles-in-the-selling-partner-api) and submit it for Amazon's review.
- The selling partner must have authorised your application.

When you enable **Include PII**:

- The `ShippingAddress` object in Orders adds `Name`, `AddressLine1`, `AddressLine2`, `AddressLine3` and `Phone` to the standard address fields.
- The `BuyerInfo` object includes the buyer's email and name information.

Without the required Restricted Role, the connector logs a warning and uses standard authentication. PII fields remain empty, while non-PII data syncs normally. You don't need to intervene.

## Limitations and troubleshooting

### Failed to retrieve the report

```
Failed to retrieve the report 'YOUR_REPORT_NAME' for period 2024-01-01T12:01:15Z-2024-01-15T12:01:14Z.
This will be read during the next sync. Report ID: YOUR_REPORT_ID. Error: Failed to retrieve the report result document.
```

Amazon Seller Partner API report requests can fail with the error "Failed to retrieve the report...".

This issue can occur when you make report requests too frequently.

**Solution:**

Create a separate connection for streams that often fail with "Failed to retrieve the report...". In the original connection, disable the streams affected by this error. Schedule the two connections so their syncs don't overlap. Leave a gap between their syncs.

### Report stream rate limits

Report Stream syncs can sometimes fail because of rate limits.

The Amazon Seller Partner source connector follows the limits in [SP API docs](https://developer-docs.amazon.com/sp-api/lang-pt_BR/docs/reports-api-rate-limits). However, your actual Rate Limits may differ from the documented values. See [Usage Plans and Rate Limits](https://developer-docs.amazon.com/sp-api/docs/usage-plans-and-rate-limits) for more information. The connector may receive "rate limited" responses based on your actual limits. Unfortunately, you can't retrieve the account's actual rate limit values.

Use these steps to address rate limit issues:

1. **Enable report reuse** by setting **Max Done Report Age (Hours)** (`max_done_report_age_hours`) from `1` to `72`, such as `24`. This is strongly recommended when your connection encounters rate limits. The connector then reuses recent completed reports instead of creating new ones. This substantially reduces `createReport` API calls and helps prevent 429 rate limit and FATAL cooldown errors. This field is available in the connector UI.
2. **Reduce 429 retry attempts** by reducing **Report Creation 429 Max Retries** (`creation_requester_429_max_retries`) from its `5` default. Each retry uses exponential backoff. However, repeated retries consume rate limit capacity that other streams could use. Set this through the connector config API. Use `0` to skip all 429 retries and let the next sync retry the request.
3. **Stop sync on rate limit** by enabling **Stop Sync When Report Streams Are Rate Limited** (`stop_sync_on_rate_limit`). The source then stops retrying when it exhausts the rate limit retry budget. It fails with an actionable configuration error. This helps when persistent rate limiting shows that you need to adjust the connector configuration. You might reduce report streams or increase the sync interval.
4. **Adjust the FATAL report retry wait time** by setting **Failed Report Retry Wait Time** (`failed_retry_wait_time_in_seconds`). When Amazon's per-report-type cooldown returns FATAL status, the connector waits this long before retrying. The default is `1800` (30 minutes). Increase it if rate-limited report creation triggers FATAL responses, giving Amazon longer to clear the cooldown. For daily FBA reports, use `14400` (4 hours). Set this through the connector config API.
5. Adjust this value based on your data volume for each [Period In Days](https://docs.airbyte.com/integrations/sources/amazon-seller-partner#reference). This can reduce report processing time on the API side. If report creation exceeds one hour, set a lower `Period In Days` value.
6. Configure the affected Report Stream to read data incrementally using Incremental Sync mode (Append). This prevents the source from reading previously fetched data again. It reads new data from the state cursor value instead. See [Incremental Sync Mode - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) for more information.
7. Schedule syncs every 24 hours.

This configuration syncs partial data until the source reaches its rate limit. Eventually, the state date will match the sync date. The next sync will then contain one partition, representing one report date period. The source makes one request for the affected report, which should prevent further rate limit issues.

### Reports with FATAL status

Amazon applies an undocumented cooldown after generating each report type. If you request the same type before expiry, Amazon returns `FATAL` instead of processing it. The cooldown varies by report type:

- **Near-real-time FBA reports**, including `GET_AFN_INVENTORY_DATA` and `GET_FBA_MYI_UNSUPPRESSED_INVENTORY_DATA`: approximately 30 minutes.
- **Daily FBA reports**, including `GET_FBA_STORAGE_FEE_CHARGES_DATA` and `GET_FBA_FULFILLMENT_CUSTOMER_RETURNS_DATA`: approximately 4 hours.

The cooldown applies to each seller and report type across all applications. Requests from different apps count towards the same cooldown window.

The connector handles this by delaying retries for FATAL reports. It logs Amazon's reason and waits for the configured cooldown before retrying. Other report streams continue processing during this wait. Report option errors are an exception for streams that send your Report Options. This includes vendor retail analytics and ledger reports. The connector doesn't retry these errors. Instead, the stream fails immediately with a configuration error quoting Amazon's reason.

**Tuning options** (set through the connector config API and hidden from the UI):

- **Failed Report Retry Wait Time** (`failed_retry_wait_time_in_seconds`): Seconds to wait before retrying a FATAL report. The `1800` default (30 minutes) covers the most common cooldown. Range: `1`–`14400`. Increase it to `14400` (4 hours) for repeated FATAL errors on daily FBA reports.
- **Max Done Report Age (Hours)** (`max_done_report_age_hours`): Set a value from `1` to `72` to reuse recent completed reports. This reduces the chance of triggering the cooldown.

### Report creation 429 errors

Amazon SP-API may return HTTP 429 (Too Many Requests) when report creation exceeds the account's rate limits. The connector automatically retries these requests using exponential backoff.

**Tuning options:**

- **Report Creation 429 Max Retries** (`creation_requester_429_max_retries`, hidden from UI): Maximum retries for 429 errors during report creation. The default is `5`. Reduce this value to avoid exhausting rate limits through repeated requests. Use `0` to disable all 429 retries. Set this through the connector config API.
- **Max Done Report Age (Hours)** (`max_done_report_age_hours`, available in the UI): Set a value from `1` to `72` to reuse recent completed reports. This reduces `createReport` API calls and helps prevent rate limit errors.

### ListFinancialEvents and BigQuery deduplication

The `ListFinancialEvents` stream doesn't define a primary key. Amazon SP-API returns aggregated event lists for each time range, not uniquely identified individual events. Every top-level field in this stream is an array, including `ShipmentEventList` and `RefundEventList`.

BigQuery requires non-JSON, non-array types for its `CLUSTER BY` clause, which Airbyte uses during deduplication. Syncing `ListFinancialEvents` to BigQuery in deduplication mode produces this error:

```text
CLUSTER BY expression must be groupable, but type is JSON.
```

**Solution:**

Use **Append** sync mode instead of **Dedup** for the `ListFinancialEvents` stream when syncing to BigQuery. For deduplicated data, use SQL in BigQuery after the data arrives in append mode.

### ListFinancialEvents InvalidInput error

```text
The API returned an InvalidInput error. This typically occurs when the response exceeds the maximum number of transactions or 10 MB per page.
```

This error occurs when ListFinancialEvents returns more data than the API can process in one page response. According to [Amazon SP-API documentation](https://developer-docs.amazon.com/sp-api/docs/finances-api-reference), the API returns `InvalidInput` when the response exceeds its transaction limit or 10 MB.

**Solution:**

Lower the **Financial Events Max Results Per Page** value in your connector configuration:

1. Go to the connector settings page.
2. Find the **Financial Events Max Results Per Page** option.
3. Reduce the default value of 100. Try 50, 25, 10 or even 1 for very high-volume accounts.
4. Save the configuration and retry the sync.

You can also use a smaller **Financial Events Step Size**, such as 1H or 6H. This further reduces the data fetched by each request.

### Fulfillment Inbound shipment item pagination

The `FbaInboundShipmentItems` stream reads items for each shipment through the [getShipmentItemsByShipmentId](https://developer-docs.amazon.com/sp-api/reference/getshipmentitemsbyshipmentid) operation. Amazon's API model defines no pagination request parameter for this operation. However, its response can include a `NextToken` value. If Amazon truncates a shipment's item list, the connector can't request the remaining items. If you find incomplete item lists for very large shipments, [contact Airbyte Support](https://support.airbyte.com).

Amazon selects inbound shipments by their last-update time. Item-quantity updates don't always advance this time, as explained in [amzn/selling-partner-api-models#2594](https://github.com/amzn/selling-partner-api-models/issues/2594). If current item quantities matter, choose a generous **Inbound Rolling Days** window instead of a narrow one.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :----------- | :----------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 7.0.2 | 2026-11-09 | [89626](https://github.com/airbytehq/airbyte/pull/89626) | Retry rate-limited (429) report document lookups for longer (30 retries / 1 hour) so report downloads no longer fail when Amazon throttles `getReportDocument`; other errors keep 5 retries / 10 minutes. |
| 7.0.1 | 2026-10-27 | [89783](https://github.com/airbytehq/airbyte/pull/89783) | Update dependencies |
| 7.0.0 | 2026-10-22 | [74065](https://github.com/airbytehq/airbyte/pull/74065) | Replace `GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE`, which Amazon removes on November 11, 2026, with `GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2` |
| 6.1.3 | 2026-10-20 | [89131](https://github.com/airbytehq/airbyte/pull/89131) | Update dependencies |
| 6.1.2 | 2026-10-13 | [88532](https://github.com/airbytehq/airbyte/pull/88532) | Update dependencies |
| 6.1.1 | 2026-10-09 | [85912](https://github.com/airbytehq/airbyte/pull/85912) | Fix `GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE` returning 0 records: download each settlement report document, paginate the report listing correctly, and resolve the pre-signed download URL just before use |
| 6.1.0 | 2026-10-08 | [86943](https://github.com/airbytehq/airbyte/pull/86943) | Give `GET_VENDOR_INVENTORY_REPORT` the daily date window and `endDate` cursor its sibling reports already have, making it incremental; hold the cursor back four days for Amazon's publishing lag |
| 6.0.6 | 2026-10-07 | [86941](https://github.com/airbytehq/airbyte/pull/86941) | Log Amazon's explanation when a report fails with `FATAL`, and fail fast with a config error that quotes it when the reason points at report options |
| 6.0.5 | 2026-10-06 | [87776](https://github.com/airbytehq/airbyte/pull/87776) | Update dependencies |
| 6.0.4 | 2026-10-02 | [86942](https://github.com/airbytehq/airbyte/pull/86942) | Stop requesting vendor retail analytics days Amazon has not published yet by holding the Vendor Sales, Vendor Traffic and Net Pure Product Margin cursors four days back |
| 6.0.2 | 2026-09-29 | [87083](https://github.com/airbytehq/airbyte/pull/87083) | Update dependencies |
| 6.0.1 | 2026-09-28 | [86940](https://github.com/airbytehq/airbyte/pull/86940) | Send configured `reportOptions` for the vendor sales, inventory, traffic, and net pure product margin reports instead of validating and then dropping them |
| 6.0.0 | 2026-09-24 | [85813](https://github.com/airbytehq/airbyte/pull/85813) | Remove primary key from `GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL` and `GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_GENERAL` streams; these line-item reports have no proven, reliably unique identifier, so deduplicating on `amazon-order-id` dropped records |
| 5.10.5 | 2026-09-22 | [86512](https://github.com/airbytehq/airbyte/pull/86512) | Update dependencies |
| 5.10.4 | 2026-09-21 | [86322](https://github.com/airbytehq/airbyte/pull/86322) | Add `order-item-id` to `GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL` and `GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_GENERAL` schemas |
| 5.10.3 | 2026-09-15 | [85942](https://github.com/airbytehq/airbyte/pull/85942) | Update dependencies |
| 5.10.2 | 2026-09-08 | [85388](https://github.com/airbytehq/airbyte/pull/85388) | Update dependencies |
| 5.10.1 | 2026-08-25 | [84913](https://github.com/airbytehq/airbyte/pull/84913) | Send an explicit, day-aligned report window for the daily `GET_VENDOR_TRAFFIC_REPORT`, `GET_VENDOR_NET_PURE_PRODUCT_MARGIN_REPORT`, and `GET_VENDOR_REAL_TIME_INVENTORY_REPORT` streams, fixing records that were labelled with a date the report did not actually cover |
| 5.10.0 | 2026-08-24 | [76434](https://github.com/airbytehq/airbyte/pull/76434) | Add Fulfillment Inbound streams (FbaInboundShipments, FbaInboundShipmentItems) and Inbound API settings (`inbound_replication_mode`, `inbound_rolling_days`, `inbound_start_datetime`, `inbound_end_datetime`) |
| 5.9.5 | 2026-08-18 | [84482](https://github.com/airbytehq/airbyte/pull/84482) | Update dependencies |
| 5.9.4 | 2026-08-11 | [83818](https://github.com/airbytehq/airbyte/pull/83818) | Update dependencies |
| 5.9.3 | 2026-08-07 | [77620](https://github.com/airbytehq/airbyte/pull/77620) | Pass configured Report Options to the report creation request for GET_LEDGER_DETAIL_VIEW_DATA and GET_LEDGER_SUMMARY_VIEW_DATA |
| 5.9.2 | 2026-08-05 | [81374](https://github.com/airbytehq/airbyte/pull/81374) | Anchor the report window of the daily `GET_SALES_AND_TRAFFIC_REPORT`, `GET_SALES_AND_TRAFFIC_REPORT_BY_DATE`, and `GET_VENDOR_SALES_REPORT` streams to the slice's calendar day, fixing inflated/mislabeled metrics when a sync ends mid-day |
| 5.9.1 | 2026-07-28 | [82829](https://github.com/airbytehq/airbyte/pull/82829) | Update dependencies |
| 5.9.0 | 2026-07-24 | [82254](https://github.com/airbytehq/airbyte/pull/82254) | Add missing fields to GET_VENDOR_SALES_REPORT (customerReturns) and GET_VENDOR_INVENTORY_REPORT (startDate, endDate, unhealthyInventoryUnits, unhealthyInventoryCost, procurableProductOutOfStockRate, receiveFillRate, uft) |
| 5.8.2 | 2026-07-21 | [82317](https://github.com/airbytehq/airbyte/pull/82317) | Update dependencies |
| 5.8.1 | 2026-07-14 | [81724](https://github.com/airbytehq/airbyte/pull/81724) | Update dependencies |
| 5.8.0 | 2026-07-08 | [80845](https://github.com/airbytehq/airbyte/pull/80845) | Add three missing vendor report streams: GET_VENDOR_TRAFFIC_REPORT, GET_VENDOR_NET_PURE_PRODUCT_MARGIN_REPORT, and GET_VENDOR_REAL_TIME_INVENTORY_REPORT |
| 5.7.12 | 2026-07-07 | [80820](https://github.com/airbytehq/airbyte/pull/80820) | Add Ireland (IE) marketplace support |
| 5.7.11 | 2026-07-07 | [77151](https://github.com/airbytehq/airbyte/pull/77151) | Update dependencies |
| 5.7.10 | 2026-06-24 | [79172](https://github.com/airbytehq/airbyte/pull/79172) | Gate vendor-only and seller-only streams behind account type using ConditionalStreams; use CheckDynamicStream so connectivity check works for both Seller and Vendor accounts. Added documentation for stream availability by account type. |
| 5.7.9 | 2026-06-17 | [75470](https://github.com/airbytehq/airbyte/pull/75470) | Fix GzipXmlDecoder error handling that caused AttributeError on malformed XML responses |
| 5.7.8 | 2026-06-16 | [79673](https://github.com/airbytehq/airbyte/pull/79673) | Surface rate limit exhaustion on report creation as a config error with troubleshooting guidance |
| 5.7.7 | 2026-05-26 | [78321](https://github.com/airbytehq/airbyte/pull/78321) | Add configurable hourly lookback window for incremental report streams except monthly sales-and-traffic and date-only vendor sales reports |
| 5.7.6 | 2026-05-20 | [78285](https://github.com/airbytehq/airbyte/pull/78285) | Promoted release candidate to GA |
| 5.7.6-rc.4 | 2026-05-13 | [78037](https://github.com/airbytehq/airbyte/pull/78037) | Make failed report retry wait time and report creation 429 max retries visible in the source configuration |
| 5.7.6-rc.3 | 2026-05-11 | [77837](https://github.com/airbytehq/airbyte/pull/77837) | Add configurable cooldown-aware deferred retry for FATAL reports and dedicated 429 error handler with backoff on report creation |
| 5.7.6-rc.2 | 2026-05-06 | [77800](https://github.com/airbytehq/airbyte/pull/77800) | Skip FATAL reports when checking for existing reports to prevent infinite retry loops |
| 5.7.6-rc.1 | 2026-04-28 | [76093](https://github.com/airbytehq/airbyte/pull/76093) | Check for existing reports before creating new ones to avoid hitting Amazon SP-API rate limits |
| 5.7.5 | 2026-05-04 | [76269](https://github.com/airbytehq/airbyte/pull/76269) | Use 89-day buffer for GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE start date to avoid 400 errors caused by network latency near Amazon's 90-day boundary |
| 5.7.4 | 2026-04-28 | [77521](https://github.com/airbytehq/airbyte/pull/77521) | Restore HTTPAPIBudget that was temporarily commented out in 5.7.4-rc.1; revert default_concurrency back to 2. Concurrency tuning rollout was canceled and is being deferred. |
| 5.7.4-rc.1 | 2026-04-27 | [76955](https://github.com/airbytehq/airbyte/pull/76955) | Concurrency tuning iteration 1: bump default_concurrency from 2 to 4 and temporarily comment out HTTPAPIBudget to measure empirical concurrency ceiling. |
| 5.7.3 | 2026-04-21 | [76494](https://github.com/airbytehq/airbyte/pull/76494) | Update dependencies |
| 5.7.2 | 2026-04-13 | [75143](https://github.com/airbytehq/airbyte/pull/75143) | Fix incorrect URL path for GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE stream — add missing `/reports/` segment |
| 5.7.1 | 2026-04-08 | [76031](https://github.com/airbytehq/airbyte/pull/76031) | Deprecate non-functional `wait_to_avoid_fatal_errors` config option (hidden from UI) |
| 5.7.0 | 2026-03-23 | [74740](https://github.com/airbytehq/airbyte/pull/74740) | Add configurable `asinGranularity` for GET_SALES_AND_TRAFFIC_REPORT streams, enabling CHILD and SKU level data with populated childAsin and sku values |
| 5.6.1 | 2026-03-17 | [74538](https://github.com/airbytehq/airbyte/pull/74538) | Update dependencies |
| 5.6.0 | 2026-03-10 | [74296](https://github.com/airbytehq/airbyte/pull/74296) | Add Restricted Data Token (RDT) support for Orders and OrderItems streams to access PII fields (BuyerInfo, ShippingAddress) via opt-in `include_pii` config option |
| 5.5.1 | 2026-03-03 | [72961](https://github.com/airbytehq/airbyte/pull/72961) | Add time-windowed partitioning to Orders stream for proper state checkpointing of OrderItems substream |
| 5.5.0 | 2026-02-26 | [72258](https://github.com/airbytehq/airbyte/pull/72258) | Add GET_SALES_AND_TRAFFIC_REPORT_BY_DATE stream |
| 5.4.1 | 2026-02-24 | [73757](https://github.com/airbytehq/airbyte/pull/73757) | Update dependencies |
| 5.4.0 | 2026-02-20 | [72837](https://github.com/airbytehq/airbyte/pull/72837) | Add marketplaceId to GET_SALES_AND_TRAFFIC_REPORT stream and add new GET_SALES_AND_TRAFFIC_REPORT_BY_MONTH stream for monthly granularity |
| 5.3.1 | 2026-02-10 | [73006](https://github.com/airbytehq/airbyte/pull/73006) | Update dependencies |
| 5.3.0 | 2026-02-02 | [72259](https://github.com/airbytehq/airbyte/pull/72259) | Add configurable MaxResultsPerPage for ListFinancialEvents stream with InvalidInput error handling |
| 5.2.0 | 2026-01-21 | [71055](https://github.com/airbytehq/airbyte/pull/71055) | Re-add 8 brand analytics and vendor analytics streams to Cloud. Fix token expiration handling for long-running syncs. |
| 5.1.2 | 2026-01-20 | [71037](https://github.com/airbytehq/airbyte/pull/71037) | Fix GB marketplace_id config transformation |
| 5.1.1 | 2026-01-20 | [71991](https://github.com/airbytehq/airbyte/pull/71991) | Update dependencies |
| 5.1.0 | 2026-01-15 | [71327](https://github.com/airbytehq/airbyte/pull/71327) | Add rate limiting and hourly granularity options for ListFinancialEvents and ListFinancialEventGroups streams |
| 5.0.2 | 2026-01-14 | [71526](https://github.com/airbytehq/airbyte/pull/71526) | Update dependencies |
| 5.0.1 | 2025-12-11 | [70200](https://github.com/airbytehq/airbyte/pull/70200) | Fix financial events pagination causing 400 InvalidInput errors under rate limiting when syncing `ListFinancialEvents`, and align `ListFinancialEventGroups` pagination behavior |
| 5.0.0 | 2025-12-08 | [69805](https://github.com/airbytehq/airbyte/pull/69805) | Remove deprecated FBA Subscribe and Save report types (GET_FBA_SNS_FORECAST_DATA and GET_FBA_SNS_PERFORMANCE_DATA) |
| 4.9.1 | 2025-11-25 | [69935](https://github.com/airbytehq/airbyte/pull/69935) | Update dependencies |
| 4.9.0 | 2025-11-10 | [66995](https://github.com/airbytehq/airbyte/pull/66995) | Add APIBudget for reports streams |
| 4.8.4 | 2025-10-29 | [68678](https://github.com/airbytehq/airbyte/pull/68678) | Increase `maxSecondsBetweenMessages` to 14400 |
| 4.8.3 | 2025-10-29 | [66030](https://github.com/airbytehq/airbyte/pull/66030) | Update dependencies |
| 4.8.2 | 2025-09-24 | [66485](https://github.com/airbytehq/airbyte/pull/66485) | Upgrade to CDK v7 |
| 4.8.1 | 2025-08-16 | [65047](https://github.com/airbytehq/airbyte/pull/65047) | Update dependencies |
| 4.8.0 | 2025-07-29 | [55195](https://github.com/airbytehq/airbyte/pull/55195) | Add VendorOrdersStatus stream |
| 4.7.2 | 2025-08-02 | [63032](https://github.com/airbytehq/airbyte/pull/63032) | Update dependencies |
| 4.7.1 | 2025-07-15 | [63309](https://github.com/airbytehq/airbyte/pull/63309) | Adds `type` property to `config_normalization_rules` in manifest |
| 4.7.0 | 2025-07-08 | [62850](https://github.com/airbytehq/airbyte/pull/62850) | Promoting release candidate 4.7.0-rc.1 to a main version. |
| 4.7.0-rc.1 | 2025-06-30 | [62119](https://github.com/airbytehq/airbyte/pull/62119) | Migrate to manifest-only |
| 4.6.4 | 2025-06-15 | [54870](https://github.com/airbytehq/airbyte/pull/54870) | Update dependencies |
| 4.6.3 | 2025-06-03 | [61351](https://github.com/airbytehq/airbyte/pull/61351) | Update dependencies |
| 4.6.2 | 2025-04-09 | [57537](https://github.com/airbytehq/airbyte/pull/57537) | Fix Extend Minimum Date Range |
| 4.6.1 | 2025-04-08 | [55238](https://github.com/airbytehq/airbyte/pull/55238) | Fix daterange in `DatetimeBasedCursor` and Added configurable step size for financial events streams (`list_financial_event_groups`, `list_financial_events`) |
| 4.6.0 | 2025-02-24 | [53225](https://github.com/airbytehq/airbyte/pull/53225) | Add API Budget |
| 4.5.3 | 2025-02-22 | [53928](https://github.com/airbytehq/airbyte/pull/53928) | Update dependencies |
| 4.5.2 | 2025-02-17 | [53693](https://github.com/airbytehq/airbyte/pull/53693) | Add app_id to server configuration (OAuth) |
| 4.5.1 | 2025-02-08 | [49297](https://github.com/airbytehq/airbyte/pull/49297) | Update dependencies |
| 4.5.0 | 2025-02-04 | [53155](https://github.com/airbytehq/airbyte/pull/53155) | Promoting release candidate 4.5.0-rc.5 to a main version. |
| 4.5.0-rc.5 | 2025-01-31 | [52700](https://github.com/airbytehq/airbyte/pull/52700) | Use incremental_dependency for the OrderItems substream |
| 4.5.0-rc.4 | 2025-01-31 | [52683](https://github.com/airbytehq/airbyte/pull/52683) | Fix Rate Limiting issue; disable concurrency |
| 4.5.0-rc.3 | 2025-01-28 | [52619](https://github.com/airbytehq/airbyte/pull/52619) | Fix `Orders` pagination |
| 4.5.0-rc.2 | 2025-01-28 | [52592](https://github.com/airbytehq/airbyte/pull/52592) | Only request data for the `Orders` stream for up to 2 minutes before present if replication_start_date is not specified |
| 4.5.0-rc.1 | 2025-01-27 | [49293](https://github.com/airbytehq/airbyte/pull/49293) | Convert to REST and reports streams to concurrent low-code CDK in v6. Remove buggy analytics streams |
| 4.4.7 | 2024-11-14 | [47691](https://github.com/airbytehq/airbyte/pull/47691) | Fix `period_in_days` definition |
| 4.4.6 | 2024-11-25 | [48644](https://github.com/airbytehq/airbyte/pull/48644) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 4.4.5 | 2024-11-04 | [47049](https://github.com/airbytehq/airbyte/pull/47049) | Update dependencies |
| 4.4.4 | 2024-10-12 | [46817](https://github.com/airbytehq/airbyte/pull/46817) | Update dependencies |
| 4.4.3 | 2024-10-05 | [46473](https://github.com/airbytehq/airbyte/pull/46473) | Update dependencies |
| 4.4.2 | 2024-09-28 | [44748](https://github.com/airbytehq/airbyte/pull/44748) | Update dependencies |
| 4.4.1 | 2024-08-17 | [43739](https://github.com/airbytehq/airbyte/pull/43739) | Update dependencies |
| 4.4.0 | 2024-07-17 | [42052](https://github.com/airbytehq/airbyte/pull/42052) | Add waiting between requests logic to avoid failed report requests |
| 4.3.11 | 2024-07-13 | [41873](https://github.com/airbytehq/airbyte/pull/41873) | Update dependencies |
| 4.3.10 | 2024-07-10 | [41345](https://github.com/airbytehq/airbyte/pull/41345) | Update dependencies |
| 4.3.9 | 2024-07-09 | [41158](https://github.com/airbytehq/airbyte/pull/41158) | Update dependencies |
| 4.3.8 | 2024-07-08 | [40751](https://github.com/airbytehq/airbyte/pull/40751) | Improve error messaging and turning on alerting |
| 4.3.7 | 2024-07-06 | [40990](https://github.com/airbytehq/airbyte/pull/40990) | Update dependencies |
| 4.3.6 | 2024-07-01 | [40590](https://github.com/airbytehq/airbyte/pull/40590) | Add log message when data only accessible to seller accounts, add report id in log message for fatal report status, add check for start date. |
| 4.3.5 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 4.3.4 | 2024-06-25 | [40384](https://github.com/airbytehq/airbyte/pull/40384) | Update dependencies |
| 4.3.3 | 2024-06-22 | [40008](https://github.com/airbytehq/airbyte/pull/40008) | Update dependencies |
| 4.3.2 | 2024-06-13 | [39441](https://github.com/airbytehq/airbyte/pull/39441) | Update state handling for incremental streams |
| 4.3.1 | 2024-06-04 | [38969](https://github.com/airbytehq/airbyte/pull/38969) | [autopull] Upgrade base image to v1.2.1 |
| 4.3.0      | 2024-05-24 | [#38657](https://github.com/airbytehq/airbyte/pull/38657) | Extend the report_options spec config with a `stream_name` attribute                                                                                                                |
| 4.2.4      | 2024-05-15 | [#38210](https://github.com/airbytehq/airbyte/pull/38210) | Fix `GET_VENDOR_TRAFFIC_REPORT` stream with report option `reportPeriod=DAY`                                                                                                        |
| 4.2.3      | 2024-05-09 | [#38078](https://github.com/airbytehq/airbyte/pull/38078) | Hide OSS-only streams in report options config for cloud users                                                                                                                      |
| 4.2.2      | 2024-04-24 | [#36630](https://github.com/airbytehq/airbyte/pull/36630) | Schema descriptions and CDK 0.80.0                                                                                                                                                  |
| 4.2.1      | 2024-04-08 | [#36895](https://github.com/airbytehq/airbyte/pull/36895) | Fix `reportPeriod` day query params                                                                                                                                                 |
| 4.2.0      | 2024-03-19 | [#36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0`                                                                                                                                                     |
| 4.1.0      | 2024-03-12 | [#35954](https://github.com/airbytehq/airbyte/pull/35954) | Add `GET_VENDOR_FORECASTING_FRESH_REPORT` and `GET_VENDOR_FORECASTING_RETAIL_REPORT` streams                                                                                        |
| 4.0.0      | 2024-02-23 | [#35439](https://github.com/airbytehq/airbyte/pull/35439) | Update schema for the `GET_FBA_STORAGE_FEE_CHARGES_DATA` stream                                                                                                                     |
| 3.5.0      | 2024-02-09 | [#35331](https://github.com/airbytehq/airbyte/pull/35331) | Fix check for Vendor accounts. Add failed report result message                                                                                                                     |
| 3.4.0      | 2024-02-15 | [#35273](https://github.com/airbytehq/airbyte/pull/35273) | Add `VendorOrders` stream                                                                                                                                                           |
| 3.3.2      | 2024-02-13 | [#33996](https://github.com/airbytehq/airbyte/pull/33996) | Add integration tests                                                                                                                                                               |
| 3.3.1      | 2024-02-09 | [#35106](https://github.com/airbytehq/airbyte/pull/35106) | Add logs for the failed check command                                                                                                                                               |
| 3.3.0      | 2024-02-09 | [#35062](https://github.com/airbytehq/airbyte/pull/35062) | Fix the check command for the `Vendor` account type                                                                                                                                 |
| 3.2.2      | 2024-02-07 | [#34914](https://github.com/airbytehq/airbyte/pull/34914) | Fix date formatting for ledger reports with aggregation by month                                                                                                                    |
| 3.2.1      | 2024-01-30 | [#34654](https://github.com/airbytehq/airbyte/pull/34654) | Fix date format in state message for streams with custom dates formatting                                                                                                           |
| 3.2.0      | 2024-01-26 | [#34549](https://github.com/airbytehq/airbyte/pull/34549) | Update schemas for vendor analytics streams                                                                                                                                         |
| 3.1.0      | 2024-01-17 | [#34283](https://github.com/airbytehq/airbyte/pull/34283) | Delete deprecated streams                                                                                                                                                           |
| 3.0.1      | 2023-12-22 | [#33741](https://github.com/airbytehq/airbyte/pull/33741) | Improve report streams performance                                                                                                                                                  |
| 3.0.0      | 2023-12-12 | [#32977](https://github.com/airbytehq/airbyte/pull/32977) | Make all streams incremental                                                                                                                                                        |
| 2.5.0      | 2023-11-27 | [#32505](https://github.com/airbytehq/airbyte/pull/32505) | Make report options configurable via UI                                                                                                                                             |
| 2.4.0      | 2023-11-23 | [#32738](https://github.com/airbytehq/airbyte/pull/32738) | Add `GET_VENDOR_NET_PURE_PRODUCT_MARGIN_REPORT`, `GET_VENDOR_REAL_TIME_INVENTORY_REPORT`, and `GET_VENDOR_TRAFFIC_REPORT` streams                                                   |
| 2.3.0      | 2023-11-22 | [#32541](https://github.com/airbytehq/airbyte/pull/32541) | Make `GET_AFN_INVENTORY_DATA`, `GET_AFN_INVENTORY_DATA_BY_COUNTRY`, and `GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE` streams incremental                                               |
| 2.2.0      | 2023-11-21 | [#32639](https://github.com/airbytehq/airbyte/pull/32639) | Make start date optional, if start date is not provided, date 2 years ago from today will be used                                                                                   |
| 2.1.1      | 2023-11-21 | [#32560](https://github.com/airbytehq/airbyte/pull/32560) | Silently exit sync if the retry attempts were unsuccessful                                                                                                                          |
| 2.1.0      | 2023-11-21 | [#32591](https://github.com/airbytehq/airbyte/pull/32591) | Add new fields to GET_LEDGER_DETAIL_VIEW_DATA, GET_FBA_INVENTORY_PLANNING_DATA and Orders schemas                                                                                   |
| 2.0.2      | 2023-11-17 | [#32462](https://github.com/airbytehq/airbyte/pull/32462) | Remove Max time option from specification; set default waiting time for reports to 1 hour                                                                                           |
| 2.0.1      | 2023-11-16 | [#32550](https://github.com/airbytehq/airbyte/pull/32550) | Fix the OAuth flow                                                                                                                                                                  |
| 2.0.0      | 2023-11-23 | [#32355](https://github.com/airbytehq/airbyte/pull/32355) | Remove Brand Analytics from Airbyte Cloud, permanently remove deprecated FBA reports                                                                                                |
| 1.6.2      | 2023-11-14 | [#32508](https://github.com/airbytehq/airbyte/pull/32508) | Do not use AWS signature as it is no longer required by the Amazon API                                                                                                              |
| 1.6.1      | 2023-11-13 | [#32457](https://github.com/airbytehq/airbyte/pull/32457) | Fix report decompression                                                                                                                                                            |
| 1.6.0      | 2023-11-09 | [#32259](https://github.com/airbytehq/airbyte/pull/32259) | Mark "aws_secret_key" and "aws_access_key" as required in specification; update schema for stream `Orders`                                                                          |
| 1.5.1      | 2023-08-18 | [#29255](https://github.com/airbytehq/airbyte/pull/29255) | Field role_arn is optional on UI but not really on the backend blocking connector set up using oauth                                                                                |
| 1.5.0      | 2023-08-08 | [#29054](https://github.com/airbytehq/airbyte/pull/29054) | Add new stream `OrderItems`                                                                                                                                                         |
| 1.4.1      | 2023-07-25 | [#27050](https://github.com/airbytehq/airbyte/pull/27050) | Fix - non vendor accounts connector create/check issue                                                                                                                              |
| 1.4.0      | 2023-07-21 | [#27110](https://github.com/airbytehq/airbyte/pull/27110) | Add `GET_FLAT_FILE_ACTIONABLE_ORDER_DATA_SHIPPING` and `GET_ORDER_REPORT_DATA_SHIPPING` streams                                                                                     |
| 1.3.0      | 2023-06-09 | [#27110](https://github.com/airbytehq/airbyte/pull/27110) | Removed `app_id` from `InputConfiguration`, refactored `spec`                                                                                                                       |
| 1.2.0      | 2023-05-23 | [#22503](https://github.com/airbytehq/airbyte/pull/22503) | Enabled stream attribute customization from Source configuration                                                                                                                    |
| 1.1.0      | 2023-04-21 | [#23605](https://github.com/airbytehq/airbyte/pull/23605) | Add FBA Reimbursement Report stream                                                                                                                                                 |
| 1.0.1      | 2023-03-15 | [#24098](https://github.com/airbytehq/airbyte/pull/24098) | Add Belgium Marketplace                                                                                                                                                             |
| 1.0.0      | 2023-03-13 | [#23980](https://github.com/airbytehq/airbyte/pull/23980) | Make `app_id` required. Increase `end_date` gap up to 5 minutes from now for Finance streams. Fix connection check failure when trying to connect to Amazon Vendor Central accounts |
| 0.2.33     | 2023-03-01 | [#23606](https://github.com/airbytehq/airbyte/pull/23606) | Implement reportOptions for all missing reports and refactor                                                                                                                        |
| 0.2.32     | 2022-02-21 | [#23300](https://github.com/airbytehq/airbyte/pull/23300) | Make AWS Access Key, AWS Secret Access and Role ARN optional                                                                                                                        |
| 0.2.31     | 2022-01-10 | [#16430](https://github.com/airbytehq/airbyte/pull/16430) | Implement slicing for report streams                                                                                                                                                |
| 0.2.30     | 2022-12-28 | [#20896](https://github.com/airbytehq/airbyte/pull/20896) | Validate connections without orders data                                                                                                                                            |
| 0.2.29     | 2022-11-18 | [#19581](https://github.com/airbytehq/airbyte/pull/19581) | Use user provided end date for GET_SALES_AND_TRAFFIC_REPORT                                                                                                                         |
| 0.2.28     | 2022-10-20 | [#18283](https://github.com/airbytehq/airbyte/pull/18283) | Added multiple (22) report types                                                                                                                                                    |
| 0.2.26     | 2022-09-24 | [#16629](https://github.com/airbytehq/airbyte/pull/16629) | Report API version to 2021-06-30, added multiple (5) report types                                                                                                                   |
| 0.2.25     | 2022-07-27 | [#15063](https://github.com/airbytehq/airbyte/pull/15063) | Add Restock Inventory Report                                                                                                                                                        |
| 0.2.24     | 2022-07-12 | [#14625](https://github.com/airbytehq/airbyte/pull/14625) | Add FBA Storage Fees Report                                                                                                                                                         |
| 0.2.23     | 2022-06-08 | [#13604](https://github.com/airbytehq/airbyte/pull/13604) | Add new streams: Fullfiments returns and Settlement reports                                                                                                                         |
| 0.2.22     | 2022-06-15 | [#13633](https://github.com/airbytehq/airbyte/pull/13633) | Fix - handle start date for financial stream                                                                                                                                        |
| 0.2.21     | 2022-06-01 | [#13364](https://github.com/airbytehq/airbyte/pull/13364) | Add financial streams                                                                                                                                                               |
| 0.2.20     | 2022-05-30 | [#13059](https://github.com/airbytehq/airbyte/pull/13059) | Add replication end date to config                                                                                                                                                  |
| 0.2.19     | 2022-05-24 | [#13119](https://github.com/airbytehq/airbyte/pull/13119) | Add OAuth2.0 support                                                                                                                                                                |
| 0.2.18     | 2022-05-06 | [#12663](https://github.com/airbytehq/airbyte/pull/12663) | Add GET_XML_BROWSE_TREE_DATA report                                                                                                                                                 |
| 0.2.17     | 2022-05-19 | [#12946](https://github.com/airbytehq/airbyte/pull/12946) | Add throttling exception managing in Orders streams                                                                                                                                 |
| 0.2.16     | 2022-05-04 | [#12523](https://github.com/airbytehq/airbyte/pull/12523) | Allow to use IAM user arn or IAM role                                                                                                                                               |
| 0.2.15     | 2022-01-25 | [#9789](https://github.com/airbytehq/airbyte/pull/9789)   | Add stream FbaReplacementsReports                                                                                                                                                   |
| 0.2.14     | 2022-01-19 | [#9621](https://github.com/airbytehq/airbyte/pull/9621)   | Add GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_GENERAL report                                                                                                                     |
| 0.2.13     | 2022-01-18 | [#9581](https://github.com/airbytehq/airbyte/pull/9581)   | Change createdSince parameter to dataStartTime                                                                                                                                      |
| 0.2.12     | 2022-01-05 | [#9312](https://github.com/airbytehq/airbyte/pull/9312)   | Add all remaining brand analytics report streams                                                                                                                                    |
| 0.2.11     | 2022-01-05 | [#9115](https://github.com/airbytehq/airbyte/pull/9115)   | Fix reading only 100 orders                                                                                                                                                         |
| 0.2.10     | 2021-12-31 | [#9236](https://github.com/airbytehq/airbyte/pull/9236)   | Fix NoAuth deprecation warning                                                                                                                                                      |
| 0.2.9      | 2021-12-30 | [#9212](https://github.com/airbytehq/airbyte/pull/9212)   | Normalize GET_SELLER_FEEDBACK_DATA header field names                                                                                                                               |
| 0.2.8      | 2021-12-22 | [#8810](https://github.com/airbytehq/airbyte/pull/8810)   | Fix GET_SELLER_FEEDBACK_DATA Date cursor field format                                                                                                                               |
| 0.2.7      | 2021-12-21 | [#9002](https://github.com/airbytehq/airbyte/pull/9002)   | Extract REPORTS_MAX_WAIT_SECONDS to configurable parameter                                                                                                                          |
| 0.2.6      | 2021-12-10 | [#8179](https://github.com/airbytehq/airbyte/pull/8179)   | Add GET_BRAND_ANALYTICS_SEARCH_TERMS_REPORT report                                                                                                                                  |
| 0.2.5      | 2021-12-06 | [#8425](https://github.com/airbytehq/airbyte/pull/8425)   | Update title, description fields in spec                                                                                                                                            |
| 0.2.4      | 2021-11-08 | [#8021](https://github.com/airbytehq/airbyte/pull/8021)   | Added GET_SELLER_FEEDBACK_DATA report with incremental sync capability                                                                                                              |
| 0.2.3      | 2021-11-08 | [#7828](https://github.com/airbytehq/airbyte/pull/7828)   | Remove datetime format from all streams                                                                                                                                             |
| 0.2.2      | 2021-11-08 | [#7752](https://github.com/airbytehq/airbyte/pull/7752)   | Change `check_connection` function to use stream Orders                                                                                                                             |
| 0.2.1      | 2021-09-17 | [#5248](https://github.com/airbytehq/airbyte/pull/5248)   | Added `extra stream` support. Updated `reports streams` logics                                                                                                                      |
| 0.2.0      | 2021-08-06 | [#4863](https://github.com/airbytehq/airbyte/pull/4863)   | Rebuild source with `airbyte-cdk`                                                                                                                                                   |
| 0.1.3      | 2021-06-23 | [#4288](https://github.com/airbytehq/airbyte/pull/4288)   | Bugfix failing `connection check`                                                                                                                                                   |
| 0.1.2      | 2021-06-15 | [#4108](https://github.com/airbytehq/airbyte/pull/4108)   | Fixed: Sync fails with timeout when create report is CANCELLED`                                                                                                                     |

</details>
