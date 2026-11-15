---
generated_record: true
connector_name: Shopify
connector_type: source
connector_slug: shopify
connector_directory: source-shopify
definition_id: 9da77001-af33-4bcd-be46-6252bf9342b9
version: 4.3.6
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/shopify
logo: /images/connectors/sources/shopify.svg
logo_source_path: airbyte-integrations/connectors/source-shopify/icon.svg
logo_sha256: 4bb72c18ec61039722d9b08f1eb0f1aef5d5262a2fe48cd0c49e64b8729a25e6
original_metadata_path: airbyte-integrations/connectors/source-shopify/metadata.yaml
original_metadata_sha256: 32906ff519262c0ae95ac6e58cefaba364a2da14396b206f70faf4f8ad267968
original_document_path: docs/integrations/sources/shopify.md
original_document_sha256: 8262189ccb3c6cd84b9484c165ad19a72e2c760fe844c09a7c477b0db95e30e0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 6968d8db4e14fc8fd512b63bd8c9ff7317a7deaf00a6f25e0e94b495282dc825
rewritten_at: 2026-11-12T13:57:32.623819+00:00
---

# Shopify

<HideInUI>

Use this page to set up and reference the [Shopify](https://www.shopify.com/) source connector.

</HideInUI>

## Prerequisites

- An active [Shopify store](https://www.shopify.com).
- To sync data from a store you don't own, you must [request access to your client's store](https://help.shopify.com/en/partners/dashboard/managing-stores/request-access#request-access). Account owners don't need to do this.
<!-- env:oss  -->
- For **Airbyte Open Source** users: A custom Shopify application with [`read_` scopes enabled](#scopes-required-for-custom-app).
<!-- /env:oss -->

## Set up the connector

You can authenticate this connector using **OAuth2.0** or **API Password** for private applications.

:::warning
Shopify's API can't retrieve only the most recently updated discount codes. The connector instead fetches every code associated with each recently updated discount. This approach syncs every updated code but may re-sync codes that haven't changed. Discounts with many codes may therefore consume more credits than expected.
:::

### Set up Shopify

<!-- env:cloud -->

:::note
Existing **Airbyte Cloud** customers using **API Password** authentication should switch to **OAuth2.0**. The API Password will be deprecated shortly. This change doesn't affect **Airbyte Open Source** connections.
:::

<HideInUI>

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Shopify from the Source type dropdown.
4. Enter a name for the Shopify connector.
</HideInUI>

#### Connect using OAuth2.0

1. Choose a **Source name**.
2. Click **Authenticate your Shopify account**.
3. Click **Install** to install the Airbyte application. Log in if needed, then select the store you want to sync. Review the consent form, then click **Install app** to finish the installation.
<FieldAnchor field="shop">
4. After authentication, the **Shopify Store** field is automatically filled using your selected store. Confirm that the populated value is correct.
</FieldAnchor>
<FieldAnchor field="start_date">
5. (Optional) Set a **Replication Start Date** as the starting point for data replication. Data created before this date won't sync. The default is January 1st, 2020.
</FieldAnchor>
6. Click **Set up source** and wait for the connection test to finish.
<!-- /env:cloud -->

<!-- env:oss -->

### Airbyte Open Source

1. Go to the Airbyte Open Source dashboard.
2. Click Sources, then click + New source.
3. On the Set up the source page, select Shopify from the Source type dropdown.
4. Enter a name for the Shopify connector.

#### Create a custom app

Shopify API authentication requires a [custom application](https://help.shopify.com/en/manual/apps/app-types/custom-apps). Follow these steps to create a custom app and find your Admin API Access Token.

1. Log in to your Shopify account.
2. In the dashboard, go to **Settings** > **App and sales channels** > **Develop apps** > **Create an app**.
3. Choose a name for your new app.
4. Select **Configure Admin API scopes**.
5. Grant access to the [following list of scopes](#scopes-required-for-custom-app). Select only scopes prefixed with `read_`, not `write_`, such as `read_locations` and `read_price_rules`.
6. Click **Install app** to give the app access to your data.
7. After installation, go to **API Credentials** and copy the **Admin API Access Token**. You can now set up the source in Airbyte.

#### Connect using API Password

1. Enter a **Source name**.
2. Enter your **Shopify Store** name. Find it in your Shopify URL or the Store details section of Settings.
3. For **API Password**, enter your custom application's Admin API access token.
4. (Optional) Set a **Replication Start Date** as the starting point for data replication. Data created before this date won't sync. The default is January 1st, 2020.
5. Click **Set up source** and wait for the connection test to finish.

### Custom app scopes

Add these scopes to your custom app so Airbyte can sync all available data. For details about access scopes, see the [Shopify docs](https://shopify.dev/docs/api/usage/access-scopes).

- `read_analytics`
- `read_assigned_fulfillment_orders`
- `read_content`
- `read_customers`
- `read_discounts`
- `read_draft_orders`
- `read_fulfillments`
- `read_gdpr_data_request`
- `read_gift_cards`
- `read_inventory`
- `read_legal_policies`
- `read_locations`
- `read_locales`
- `read_marketing_events`
- `read_markets`
- `read_merchant_managed_fulfillment_orders`
- `read_online_store_pages`
- `read_order_edits`
- `read_orders`
- `read_price_rules`
- `read_product_listings`
- `read_products`
- `read_publications`
- `read_reports`
- `read_resource_feedbacks`
- `read_script_tags`
- `read_shipping`
- `read_shopify_payments_accounts`
- `read_shopify_payments_bank_accounts`
- `read_shopify_payments_disputes`
- `read_shopify_payments_payouts`
- `read_themes`
- `read_third_party_fulfillment_orders`
- `read_translations`

<!-- /env:oss -->

<HideInUI>

## Supported sync modes

The Shopify source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- Full Refresh
- Incremental

This source syncs data through the [Shopify REST API](https://shopify.dev/api/admin-rest), [Shopify GraphQL API](https://shopify.dev/api/admin-graphql), and [Shopify GraphQL BULK API](https://shopify.dev/docs/api/usage/bulk-operations/queries). Listed streams marked "(GraphQL)" use the GraphQL or BULK API. Unmarked streams use the REST API.

## Supported streams

- [Abandoned Checkouts](https://shopify.dev/api/admin-rest/latest/resources/abandoned-checkouts#top)
- [Articles](https://shopify.dev/api/admin-rest/latest/resources/article)
- [Balance Transactions](https://shopify.dev/docs/api/admin-rest/latest/resources/transactions)
- [Blogs](https://shopify.dev/api/admin-rest/latest/resources/blog)
- [Collects](https://shopify.dev/api/admin-rest/latest/resources/collect#top)
- [Collection Products (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/Collection#field-Collection.fields.products): All products associated with each collection, including smart collection matches
- [Collections (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/Collection)
- [Countries (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/queries/deliveryProfiles): Legacy shipping configuration. Returns a frozen snapshot for shops using [market-driven shipping](#countries-and-market-driven-shipping).
- [Custom Collections](https://shopify.dev/api/admin-rest/latest/resources/customcollection#top)
- [Customers](https://shopify.dev/api/admin-rest/latest/resources/customer#top)
- [Customer Journey Summary (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/customerjourneysummary)
- [Customer Address (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/Customer#field-customer-addresses)
- [Deleted Products (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/queries/events): Product deletion events
- [Discount Codes (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/unions/DiscountCode)
- [Discount Codes Sync (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/unions/DiscountCode): Synchronous Discount Codes variant that returns every redeem code for discounts with more than ~100 codes. See [Syncing discount codes](#syncing-discount-codes).
- [Disputes](https://shopify.dev/docs/api/admin-rest/latest/resources/dispute)
- [Draft Orders](https://shopify.dev/api/admin-rest/latest/resources/draftorder#top)
- [Fulfillments](https://shopify.dev/api/admin-rest/latest/resources/fulfillment)
- [Fulfillment Orders (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/FulfillmentOrder): Closed fulfilment orders are excluded by default. To include them, enable **Include Closed Fulfillment Orders** in the connector configuration.
- [Inventory Items (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/InventoryItem)
- [Inventory Levels (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/InventoryLevel)
- [Locations](https://shopify.dev/api/admin-rest/latest/resources/location)
- [Market Countries (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/queries/markets): Shipping configuration for shops using [market-driven shipping](#countries-and-market-driven-shipping). Requires the `read_markets` scope.
- [Metafields (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/Metafield): Separate streams are available for Articles, Blogs, Collections, Customers, Draft Orders, Locations, Orders, Pages, Product Images, Products, Product Variants, Shops, and Smart Collections
- [Order Agreements (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/OrderAgreement)
- [Orders](https://shopify.dev/api/admin-rest/latest/resources/order#top): Optional [top-level customer fields](#customer-fields-in-orders) support for selecting and hashing individual customer attributes.
- [Order Refunds](https://shopify.dev/api/admin-rest/latest/resources/refund#top)
- [Order Risks (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/OrderRisk)
- [Pages](https://shopify.dev/api/admin-rest/latest/resources/page#top)
- [Price Rules](https://shopify.dev/docs/api/admin-rest/latest/resources/pricerule)
- [Products (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/queries/products)
- [Product Images (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/Image)
- [Product Variants (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/queries/productVariant)
- [Shop](https://shopify.dev/api/admin-rest/latest/resources/shop)
- [Smart Collections](https://shopify.dev/api/admin-rest/latest/resources/smartcollection)
- [Tender Transactions](https://shopify.dev/api/admin-rest/latest/resources/tendertransaction)
- [Transactions](https://shopify.dev/api/admin-rest/latest/resources/transaction#top)
- [Transactions (GraphQL)](https://shopify.dev/docs/api/admin-graphql/latest/objects/OrderTransaction)

### Entity-relationship diagram
<EntityRelationshipDiagram></EntityRelationshipDiagram>

## Customer fields in Orders

The `Orders` stream includes top-level copies of customer attributes, including `customer_id`, `customer_email`, and `customer_default_address`. Enable **Populate top-level customer fields in Orders** (`populate_top_level_orders_customer_fields`) in the source configuration to populate them from the nested `customer` object.

This setting defaults to `false`. When disabled or omitted, every new customer field contains `null`. When enabled, each field contains its corresponding customer value. Missing attributes and orders without customers still produce `null`. The fields remain selectable in the schema in both modes. This setting doesn't affect the existing `customer_locale` field.

The original `customer` object remains available in both modes. To sync only selected or hashed attributes, deselect `customer` and select the required `customer_*` fields. Then configure hashing on those fields. Hashing or deselecting `customer_email` alone doesn't remove its original value from `customer.email` while `customer` remains selected.

If population is disabled and you select any new top-level customer field, the connector logs one warning per sync attempt. It logs the warning when it reads an order. The warning says these fields are redacted to `null`, but the nested `customer` object isn't redacted. Enable the setting to populate selected fields, or deselect them.

After enabling population on an existing incremental connection, refresh the `Orders` stream. This populates historical orders that wouldn't otherwise be read again. Disabling population affects subsequently read orders. It doesn't clear existing destination values by itself.

## Countries and market-driven shipping

Shopify is moving merchant shipping configuration from delivery profiles to [Markets](https://shopify.dev/docs/apps/build/orders-fulfillment/market-driven-shipping/upgrade-your-app). After migration, the `deliveryProfiles` API behind the `Countries` stream returns a frozen snapshot. That snapshot no longer reflects the merchant's changes.

The connector checks `shop.features.marketDrivenShipping` when the `Countries` or `Market Countries` stream starts syncing:

- Shops using legacy shipping: `Countries` syncs as before, while `Market Countries` emits no records.
- Shops using market-driven shipping: `Countries` continues emitting the shipping configuration snapshot captured at migration and logs a warning. This prevents previously synced data from being wiped. `Market Countries` emits one record for each market region. A region can be a whole country or a subdivision, such as a US state. Each record contains the market's current shipping options.

`Market Countries` and `Countries` have different shapes. A country belonging to several markets appears once for each market. Whole-country regions don't include a province list. `shipping_enabled` and `shipping_options` are null when a market inherits shipping configuration from its parent. Every market type and status is included. Filter by `market_type = REGION` and `market_status = ACTIVE` to find buyer-facing shipping countries.

Shopify's rollout starts on October 1, 2026. It covers merchants who opt in and shops Shopify moves after confirming their installed apps are compatible. Shopify plans to cover all shops by July 1, 2027. Both stream behaviours will coexist during this period. Your connection doesn't change automatically, and you don't need a global switch. Keep `Countries` for the legacy snapshot. Enable `Market Countries` for shops that have migrated.

### Enable Market Countries after migration

1. Confirm that the connector has the `read_markets` scope. With **OAuth2.0**, re-authenticate the source from its Settings page. With **API password**, add `read_markets` to your custom app's Admin API scopes and save the source again. Without this scope, the stream won't appear in the catalogue. The source also logs a warning during schema discovery.
2. Refresh the source schema on the connection so `Market Countries` appears in the stream list.
3. Enable the `Market Countries` stream. You can keep `Countries` enabled because it retains the final legacy snapshot.
4. Run a sync and confirm that `market_countries` contains one record per market region: `market_handle`, `code`, `subdivision_code`, `shipping_options`. For an unmigrated shop, the stream remains empty until Shopify migrates it. You don't need to take any action.

## Capture deleted records

The connector captures deleted records from the `Articles`, `Blogs`, `CustomCollections`, `Orders`, `Pages`, and `PriceRules` streams. For each deletion, it outputs the record's `ID`. It also populates the `deleted_at`, `deleted_message`, and `deleted_description` fields. All other fields remain empty.

For deleted products, use the dedicated `Deleted Products` stream. It queries the Shopify GraphQL Events API for product deletion events. Records include `id`, the product ID, with the `deleted_at`, `deleted_message`, and `shop_url` fields.

For more information about [retrieving deleted records](https://shopify.dev/docs/api/admin-rest/latest/resources/event), see the Shopify documentation.

## Sync discount codes

The connector provides two discount code streams:

| Stream | Method | Best for |
|---|---|---|
| **Discount Codes** | Bulk Operations (async) | Stores where every discount has fewer than ~100 redeem codes. High throughput, low API cost. |
| **Discount Codes Sync** | Synchronous cursor-paginated GraphQL | Stores that have one or more discounts with **more than ~100 redeem codes**. Guarantees every code is returned. |

Shopify's Bulk Operations API silently truncates the nested `codes` connection at about 100 records per parent discount, even with `groupObjects: true`. For example, the bulk stream returns only ~100 codes from a discount containing 500. It doesn't return an error or warning.

**Discount Codes Sync** avoids this limit by querying parent discounts with cursor pagination. It then pages through each parent's child codes, with up to 250 per page. This approach has a higher per-record API cost and lower throughput than the bulk stream.

**Recommendation:** Enable the **Discount Codes Sync** stream if any discount has more than ~100 redeem codes. You can run both streams together. They produce the same schema, so you can deduplicate downstream using `id`.

Both discount code streams re-sync every code when its discount is updated. See the [warning in the setup guide](#setup-guide).

**Discounts in Shopify Rollouts:** Connector versions before 4.2.3 omit a discount while a serving [Rollout](https://shopify.dev/docs/apps/build/discounts/rollouts) activates or expires it for some or all buyers. Version 4.2.3 and later return these discounts. However, incremental syncs don't backfill previously omitted codes because their `updated_at` predates the saved cursor. If your store has placed discounts into Rollouts, [refresh and retain records](/platform/operator-guides/refreshes) for incrementally synced discount code streams after upgrading. During a Rollout, a discount's `status` reflects its own dates, not what buyers receive.

## Marketing attribution data
You can find data related to [marketing attribution](https://www.shopify.com/au/blog/marketing-attribution) across several streams. Sync these streams to understand marketing performance:
- `Customer Journey Summary` (firstVisit.source, firstVisit.sourcetype)
- `Orders` (referring_site, source_name)
- `Abandoned Checkouts` (referring_site, source_name)

## Features

| Feature                   | Supported?\(Yes/No\) |
| :------------------------ | :------------------- |
| Full Refresh Sync         | Yes                  |
| Incremental - Append Sync | Yes                  |
| Namespaces                | No                   |

## IP allow list

Airbyte's Shopify app accepts Admin API requests only from the IP addresses below. With **OAuth2.0** authentication, the connector only works in Airbyte Cloud or Airbyte Agents. To run it elsewhere, including Airbyte Open Source, authenticate using **API Password** and your own [custom app](#create-a-custom-app).

If your organisation restricts access by IP address, add these addresses to your allow list. They're the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) plus the [Airbyte Agents IP addresses](https://docs.airbyte.com/ai-agents/admin/ip-allowlist).

| Product        | Cloud provider | Region       | IP addresses                                                                                                                    |
| :------------- | :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------ |
| Airbyte Cloud  | GCP            | us-west3     | 34.106.109.131, 34.106.196.165, 34.106.60.246, 34.106.229.69, 34.106.127.139, 34.106.218.58, 34.106.115.240, 34.106.225.141 |
| Airbyte Cloud  | GCP            | us-central1  | 34.33.7.0/29                                                                                                                    |
| Airbyte Cloud  | AWS            | eu-west-3    | 13.37.4.46, 13.37.142.60, 35.181.124.238                                                                                        |
| Airbyte Agents | AWS            | us-west-2    | 44.226.44.242, 35.163.106.179, 44.227.212.246                                                                                   |

## Data type map

| Integration Type | Airbyte Type |
|:-----------------|:-------------|
| `string`         | `string`     |
| `number`         | `number`     |
| `array`          | `array`      |
| `object`         | `object`     |
| `boolean`        | `boolean`    |

## Limitations and troubleshooting

</HideInUI>
<details>
<summary>

View Shopify connector limitations and troubleshooting details

</summary>

### Connector limitations

#### Rate limits

Shopify applies several [rate limit restrictions](https://shopify.dev/docs/api/usage/rate-limits). Throttling and exceeded limits aren't typical, but you may see this warning in some edge cases:

```text
"Caught retryable error '<some_error> or null' after <some_number> tries.
Waiting <some_number> seconds then retrying..."
```

This warning is expected when the connector receives a `429 - Rate Limit Exceeded` HTTP Error. The sync continues after a short backoff period.

Shopify's [bulk operation limitations](https://shopify.dev/docs/api/usage/bulk-operations/queries#operation-restrictions) apply to every Shopify GraphQL Bulk API request. Different request types can have different limits.

#### Missing records after bulk checkpoints

Version 3.3.3 fixes an issue affecting incremental GraphQL Bulk streams. Some streams could skip parent records after a bulk job checkpointed during output. The issue affected these streams:

- `metafield_customers`
- `metafield_products`
- `metafield_product_images`
- `product_images`
- `customer_address`

If an earlier connector version may have missed historical records, clear the affected stream and run a backfill sync. Clearing a stream deletes the data Airbyte wrote for it in your destination. For more information, see [Clearing your data](/platform/operator-guides/clear).

#### Transactions created before orders

Some payment methods create transactions a few minutes before Shopify creates the order. These include offsite or redirect gateways such as Klarna. From version 4.2.6, the connector emits these transactions when their order first syncs. It may emit the transaction again until a newer transaction moves the cursor beyond the order's creation time. Destinations without deduplication, such as **Incremental | Append**, may therefore contain duplicate rows. Upgrading doesn't backfill transactions skipped by earlier versions. Refresh the `transactions` stream or clear its state to recover them.

#### Transaction status changes

Shopify transactions don't have an `updated_at` field, so the `transactions` stream uses `created_at` as its cursor. From version 4.3.4, incremental syncs also emit every transaction from orders updated since the saved cursor. The saved cursor is the latest synced transaction `created_at`, minus the **Lookback Window** when configured. This allows status changes to reach the destination, such as refunds moving from `PENDING` to `SUCCESS`. Any order edit, including tag or fulfilment changes, re-emits every transaction for that order. Without new transactions, the cursor doesn't move, so each sync may emit the same transactions. Use **Incremental | Append + Deduped** to retain one row per transaction. Upgrading doesn't correct rows left stale by earlier versions. Refresh the `transactions` stream to correct them.

This behaviour applies to the default GraphQL `transactions` stream. The REST `transactions` stream doesn't yet capture status changes incrementally. This REST stream is used when **Add `user_id` to Transactions (slower)** is enabled. The `order_refunds` stream also doesn't capture them incrementally. Refresh these streams to correct stale rows.

#### Product category values

The `category` field in the `products` stream comes from Shopify's Standard Product Taxonomy. Shopify updates this taxonomy several times each year. It can rename or move a category without changing its ID. Because `products` syncs incrementally using `updated_at`, it only reads a product again after that product changes. Its `category` values may therefore fall behind the current taxonomy. Use `category.id` as the stable identifier. Refresh the `products` stream to retrieve current values.

#### BULK job checkpoint collisions

Incremental GraphQL Bulk streams checkpoint a bulk job after collecting **BULK Job checkpoint (rows collected)** lines. They then start the next job from the newest cursor value found. If one cursor value contains more lines than this threshold, the next job can't advance beyond it. The sync then fails with:

```text
The stream: `<stream_name>` checkpoint collision is detected. Try to increase the
`BULK Job checkpoint (rows collected)` to the bigger value. The stream will be
synced again during the next sync attempt.
```

This issue usually affects metafield streams and `discount_codes`, where one parent record has many child rows. It often follows a bulk store change that assigns the same `updated_at` value to many records.

**First, check whether it cleared itself.** Check whether any sync has succeeded since the collision:

- **A later sync succeeded.** The next attempt passed the cluster without intervention. You don't need to act, but failed attempts still count towards your usage.
- **No sync has succeeded since.** The stream is blocked and won't recover without a configuration change. Recent records aren't reaching your destination, so address this urgently.

**To unblock a stream that is not recovering,** raise **BULK Job checkpoint (rows collected)** in your source configuration. Set it above the number of lines sharing that cursor value. The maximum is 1,000,000. Increase the value gradually instead of moving directly to the maximum. Larger bulk jobs cover more data, take longer, and need more temporary disk space for sorting.

These two actions don't help:

- **Lowering GraphQL BULK Date Range in Days.** A collision prevents the sync from passing one cursor value. A date range can't divide that single value.
- **Clearing the stream.** The cluster exists in your source data, so a fresh sync encounters it again.

If the stream still collides at 1,000,000, or raising the value doesn't change its behaviour, [contact Airbyte Support](https://docs.airbyte.com/community/getting-support). Find the affected cursor value in the sync logs on the line containing `Stream <stream_name>, continue from checkpoint:`.

### Troubleshooting

- **Connection test returns 401**: The Shopify access token is invalid or revoked.
  Re-authenticate the source for OAuth, or regenerate the custom app's Admin API access token.
- **Connection test returns 403**: Grant the app the required access scopes. Then re-authorise the source or regenerate its Admin API access token.
  When Shopify names a scope in its response, the connection test includes it in the error message.
  For example, products require `read_products`, while orders require `read_orders`.
  The connection test reads shop metadata but doesn't validate access to every stream.
- **Invalid Shopify Store**: Enter `mystore`, `mystore.myshopify.com`, or `https://mystore.myshopify.com`. These values normalise to `mystore`.
  Remove paths such as `/admin`, credentials, query strings, and fragments from pasted URLs.

- If **OAuth2.0** authentication returns access errors, follow this [Shopify Article](https://help.shopify.com/en/partners/dashboard/managing-stores/request-access#request-access) to request access to the client's store. After receiving access, you can continue with **OAuth2.0** authentication.
- If you receive "The BULK job couldn't be created at this time, since another job is running.", [check your operation's progress](https://shopify.dev/docs/api/usage/bulk-operations/queries#check-an-operations-progress) using the `Shopify GraphQL BULK` api.
- For a "checkpoint collision is detected" stream error, see [BULK job checkpoint collisions](#bulk-job-checkpoint-collisions) above. It explains how to distinguish self-clearing failures from blocked streams.
- To cancel a `Shopify GraphQL BULK`job, follow [these steps](https://shopify.dev/docs/api/usage/bulk-operations/queries#canceling-an-operation). You need the current in-progress job ID.
- For common Shopify source connector issues, visit this Airbyte Forum [here](https://github.com/airbytehq/airbyte/discussions).

</details>

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--- | :----------- | :------ |
| 4.3.6 | 2026-11-10 | [91709](https://github.com/airbytehq/airbyte/pull/91709) | Update dependencies |
| 4.3.5 | 2026-11-03 | [90900](https://github.com/airbytehq/airbyte/pull/90900) | Require Python 3.11 or newer, retaining support through Python 3.13 |
| 4.3.4 | 2026-11-03 | [89704](https://github.com/airbytehq/airbyte/pull/89704) | Emit `transactions` of orders updated since the saved state so transaction status changes, such as refunds going from `PENDING` to `SUCCESS`, are captured by incremental syncs; refresh `transactions` to correct stale rows |
| 4.3.3 | 2026-11-03 | [90723](https://github.com/airbytehq/airbyte/pull/90723) | Update dependencies |
| 4.3.2 | 2026-10-30 | [90254](https://github.com/airbytehq/airbyte/pull/90254) | Explain connection test authentication and access scope failures, and improve invalid store name guidance. |
| 4.3.1 | 2026-10-26 | [89760](https://github.com/airbytehq/airbyte/pull/89760) | Fix `deleted_products` incremental syncs skipping product deletions recorded in the same second as the saved cursor on Shopify API 2026-10 |
| 4.3.0 | 2026-10-20 | [88902](https://github.com/airbytehq/airbyte/pull/88902) | Add the Shopify product taxonomy `category` field to the `products` stream; refresh the `products` stream to populate it for existing products |
| 4.2.7 | 2026-10-20 | [78958](https://github.com/airbytehq/airbyte/pull/78958) | Update dependencies |
| 4.2.6 | 2026-10-16 | [87638](https://github.com/airbytehq/airbyte/pull/87638) | Emit `transactions` of newly created orders even when the transaction `created_at` predates the saved state (offsite/redirect payment methods); refresh `transactions` to recover previously skipped records |
| 4.2.5 | 2026-10-15 | [89009](https://github.com/airbytehq/airbyte/pull/89009) | Upgrade to Python 3.13 and pendulum 3 |
| 4.2.4 | 2026-10-13 | [88385](https://github.com/airbytehq/airbyte/pull/88385) | Re-run the slice instead of rewinding to a stale cursor from an earlier slice when a checkpointed BULK job has no records within the current slice |
| 4.2.3 | 2026-10-13 | [88469](https://github.com/airbytehq/airbyte/pull/88469) | Upgrade Shopify Admin API to 2026-10 so `discount_codes` and `discount_codes_sync` no longer leave out discounts affected by a serving Shopify Rollout; see [Syncing discount codes](#syncing-discount-codes) to backfill them. Retry GraphQL pages that Shopify fails with a throttling or `INTERNAL_SERVER_ERROR` code in `deleted_products`, `countries`, `market_countries` and `discount_codes_sync`, fail `deleted_products` on other GraphQL errors instead of completing silently, skip discounts deleted mid-sync in `discount_codes_sync`, and stop the `product_images` query from growing with every slice |
| 4.2.2 | 2026-10-09 | [88405](https://github.com/airbytehq/airbyte/pull/88405) | Fix `countries` returning no records when a second `Countries` stream is read in the same process: keep the dedup list per stream instance instead of on the class |
| 4.2.1 | 2026-09-28 | [87001](https://github.com/airbytehq/airbyte/pull/87001) | Re-run the slice with checkpointing disabled instead of silently skipping it when a checkpointed BULK job is canceled and returns no result URL |
| 4.2.0 | 2026-09-25 | [87007](https://github.com/airbytehq/airbyte/pull/87007) | Add selectable top-level `customer_*` fields to `orders`, populated by the optional `populate_top_level_orders_customer_fields` setting (default: false); fields remain null when disabled |
| 4.1.1 | 2026-09-28 | [86966](https://github.com/airbytehq/airbyte/pull/86966) | Fail the stream instead of silently skipping the slice when a failed BULK job returns no partial result or no records to resume from; retry failed BULK jobs as system errors (`ACCESS_DENIED` is a config error); show BULK error details to the user |
| 4.1.0 | 2026-09-21 | [86493](https://github.com/airbytehq/airbyte/pull/86493) | Add `market_countries` stream for shops on market-driven shipping (requires `read_markets`); `countries` logs a warning for such shops since `deliveryProfiles` returns a frozen snapshot; `countries` and `market_countries` retry throttled pages and fail on other Shopify GraphQL `errors` responses instead of completing a partial snapshot |
| 4.0.3 | 2026-09-16 | [86371](https://github.com/airbytehq/airbyte/pull/86371) | Fix `ValueError: year 0 is out of range` when the lookback window is applied to an empty stream state |
| 4.0.2 | 2026-09-15 | [83335](https://github.com/airbytehq/airbyte/pull/83335) | Upgrade Shopify API version to 2026-07 |
| 4.0.1 | 2026-09-14 | [81363](https://github.com/airbytehq/airbyte/pull/81363) | Classify Shopify authentication errors as config errors instead of system errors during bulk job creation |
| 4.0.0 | 2026-08-11 | [81339](https://github.com/airbytehq/airbyte/pull/81339) | Add missing `format: date-time` annotations to datetime fields in `orders` and `order_refunds`. `orders.processed_at` and `order_refunds.processed_at` change column type in typed destinations and require a schema refresh and resync. See the [migration guide](./shopify-migrations.md#upgrading-to-400). |
| 3.5.1 | 2026-06-24 | [80787](https://github.com/airbytehq/airbyte/pull/80787) | Validate and normalize the `shop` config value: accept a bare subdomain or full myshopify URL, and reject malformed input with a clear config error. The normalized handle is also written to the `shop_url` record field, so previously-malformed configs now emit a clean value. |
| 3.5.0 | 2026-06-11 | [79624](https://github.com/airbytehq/airbyte/pull/79624) | Add new synchronous cursor-paginated `discount_codes_sync` stream with support for >100 redeem codes per discount |
| 3.4.1 | 2026-06-10 | [78513](https://github.com/airbytehq/airbyte/pull/78513) | Enable `groupObjects: true` on the `discount_codes` bulk query to preserve grouped output for stores with many redeem codes per discount. |
| 3.4.0 | 2026-05-19 | [76192](https://github.com/airbytehq/airbyte/pull/76192) | Add `lookback_window_in_days` config option to re-fetch recent records during incremental syncs, preventing missing data from race conditions or late-arriving updates. |
| 3.3.3 | 2026-05-11 | [77005](https://github.com/airbytehq/airbyte/pull/77005) | Fix some incremental GraphQL Bulk streams silently skipping parent records when a bulk job checkpoints mid-output. Use the parent cursor tracked by the bulk record producer to advance the next slice, not the child record's cursor. |
| 3.3.2 | 2026-04-24 | [76969](https://github.com/airbytehq/airbyte/pull/76969) | Replace in-memory sort of bulk GraphQL records with a disk-backed external merge sort to fix OOM failures on large metafield syncs |
| 3.3.1 | 2026-04-22 | [76920](https://github.com/airbytehq/airbyte/pull/76920) | Fix `AttributeError` from null logger in `LimitReducingErrorHandler` when handling non-500 HTTP errors |
| 3.3.0 | 2026-04-15 | [76327](https://github.com/airbytehq/airbyte/pull/76327) | Upgrade airbyte-cdk dependency from v6 to v7 |
| 3.2.3 | 2026-03-20 | [75255](https://github.com/airbytehq/airbyte/pull/75255) | Upgrade Shopify API version from 2025-01 to 2025-10 |
| 3.2.2 | 2026-03-09 | [72849](https://github.com/airbytehq/airbyte/pull/72849) | Fix missing fulfillment orders by querying fulfillmentOrders endpoint directly; add configurable `fulfillment_orders_include_closed` option (default: false) |
| 3.2.1 | 2026-02-04 | [72810](https://github.com/airbytehq/airbyte/pull/72810) | feat(source-shopify): Add id and position fields to product_variants.options schema (AI-Triage PR) |
| 3.2.0 | 2026-01-20 | [72209](https://github.com/airbytehq/airbyte/pull/72209) | Add `CollectionProducts` stream for all product-collection associations |
| 3.1.2 | 2026-01-15 | [71188](https://github.com/airbytehq/airbyte/pull/71188) | Handle CDK exceptions in connection check |
| 3.1.1 | 2026-01-06 | [71035](https://github.com/airbytehq/airbyte/pull/71035) | Fix IndexError in countries stream when profile_location_groups is empty |
| 3.1.0 | 2026-01-05 | [71005](https://github.com/airbytehq/airbyte/pull/71005) | Add `deleted_products` stream using GraphQL Events API |
| 3.0.13 | 2025-10-21 | [68245](https://github.com/airbytehq/airbyte/pull/68245) | Update dependencies |
| 3.0.12 | 2025-10-14 | [67805](https://github.com/airbytehq/airbyte/pull/67805) | Update dependencies |
| 3.0.11 | 2025-10-07 | [67448](https://github.com/airbytehq/airbyte/pull/67448) | Update dependencies |
| 3.0.10 | 2025-09-30 | [66904](https://github.com/airbytehq/airbyte/pull/66904) | Update dependencies |
| 3.0.9 | 2025-09-16 | [66291](https://github.com/airbytehq/airbyte/pull/66291) | Promoting release candidate 3.0.9-rc.1 to a main version. |
| 3.0.9-rc.1 | 2025-09-09 | [65987](https://github.com/airbytehq/airbyte/pull/65987) | Use filter field value to adjust slice for streams with ID cursor field. |
| 3.0.8 | 2025-09-04 | [65552](https://github.com/airbytehq/airbyte/pull/65552) | Fix Incremental Syncs for Metafield child streams. |
| 3.0.7 | 2025-06-02 | [59015](https://github.com/airbytehq/airbyte/pull/59015) | 🐙 source-shopify: Update dependencies [2025-05-17] |
| 3.0.6 | 2025-05-28 | [60797](https://github.com/airbytehq/airbyte/pull/60797) | Fix 500s on `orders` & `order_refunds` streams by adding dynamic page limit. |
| 3.0.5 | 2025-04-23 | [58598](https://github.com/airbytehq/airbyte/pull/58598) | Fix AttributeError with Null `measurement_weight` fields for `product_variants` streams |
| 3.0.4 | 2025-04-19 | [58431](https://github.com/airbytehq/airbyte/pull/58431) | Update dependencies |
| 3.0.3 | 2025-04-12 | [57984](https://github.com/airbytehq/airbyte/pull/57984) | Update dependencies |
| 3.0.2 | 2025-04-05 | [57449](https://github.com/airbytehq/airbyte/pull/57449) | Update dependencies |
| 3.0.1 | 2025-03-29 | [56861](https://github.com/airbytehq/airbyte/pull/56861) | Update dependencies |
| 3.0.0 | 2025-03-27 | [55823](https://github.com/airbytehq/airbyte/pull/55823) | Update API version |
| 2.6.7 | 2025-03-22 | [56316](https://github.com/airbytehq/airbyte/pull/56316) | Update dependencies |
| 2.6.6 | 2025-03-08 | [55621](https://github.com/airbytehq/airbyte/pull/55621) | Update dependencies |
| 2.6.5 | 2025-03-01 | [55126](https://github.com/airbytehq/airbyte/pull/55126) | Update dependencies |
| 2.6.4 | 2025-02-22 | [54477](https://github.com/airbytehq/airbyte/pull/54477) | Update dependencies |
| 2.6.3 | 2025-02-15 | [51983](https://github.com/airbytehq/airbyte/pull/51983) | Update dependencies |
| 2.6.2 | 2025-01-14 | [50976](https://github.com/airbytehq/airbyte/pull/50976) | Retry requests that return HTTP 500 |
| 2.6.1 | 2025-02-16 | [51602](https://github.com/airbytehq/airbyte/pull/51602) | Updated the `UpgradeDeadline` for the deprecation notice about [this change](https://github.com/airbytehq/airbyte/pull/51037) |
| 2.6.0 | 2025-01-15 | [51037](https://github.com/airbytehq/airbyte/pull/51037) | Deprecated the `ProductsGraphQL` and `CustomerSavedSearch` stream from the stream catalog |
| 2.5.18 | 2025-01-11 | [51326](https://github.com/airbytehq/airbyte/pull/51326) | Update dependencies |
| 2.5.17 | 2025-01-06 | [50884](https://github.com/airbytehq/airbyte/pull/50884) | Add `moments` field `Customer Journey Summary` stream |
| 2.5.16 | 2025-01-04 | [50938](https://github.com/airbytehq/airbyte/pull/50938) | Update dependencies |
| 2.5.15 | 2024-12-28 | [50779](https://github.com/airbytehq/airbyte/pull/50779) | Update dependencies |
| 2.5.14 | 2024-12-21 | [49088](https://github.com/airbytehq/airbyte/pull/49088) | Update dependencies |
| 2.5.13 | 2024-12-11 | [49134](https://github.com/airbytehq/airbyte/pull/49134) | Added `checkpointed value` collision detection for BULK-supported streams |
| 2.5.12 | 2024-11-25 | [48661](https://github.com/airbytehq/airbyte/pull/48661) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 2.5.11 | 2024-11-07 | [48402](https://github.com/airbytehq/airbyte/pull/48402) | Add `image_src`, `image_url`, including `options` to `Product Variants` stream |
| 2.5.10 | 2024-11-05 | [48322](https://github.com/airbytehq/airbyte/pull/48322) | Update dependencies |
| 2.5.9 | 2024-10-29 | [47814](https://github.com/airbytehq/airbyte/pull/47814) | Update dependencies |
| 2.5.8 | 2024-10-28 | [47044](https://github.com/airbytehq/airbyte/pull/47044) | Update dependencies |
| 2.5.7 | 2024-10-14 | [46552](https://github.com/airbytehq/airbyte/pull/46552) | Add `parent state` tracking for BULK sub-streams |
| 2.5.6 | 2024-10-12 | [46844](https://github.com/airbytehq/airbyte/pull/46844) | Update dependencies |
| 2.5.5 | 2024-10-05 | [46578](https://github.com/airbytehq/airbyte/pull/46578) | Raise exception on missing stream |
| 2.5.4 | 2024-10-05 | [45759](https://github.com/airbytehq/airbyte/pull/45759) | Update dependencies |
| 2.5.3 | 2024-09-27 | [46095](https://github.com/airbytehq/airbyte/pull/46095) | Fixed duplicates for `Product Images`, `Metafield Product Images` and `Metafield Products` streams for Incremental syncs |
| 2.5.2 | 2024-09-17 | [45633](https://github.com/airbytehq/airbyte/pull/45633) | Adds `read_inventory` as a required scope for `product_variants` stream |
| 2.5.1 | 2024-09-14 | [45255](https://github.com/airbytehq/airbyte/pull/45255) | Update dependencies |
| 2.5.0 | 2024-09-06 | [45190](https://github.com/airbytehq/airbyte/pull/45190) | Migrate to CDK v5 |
| 2.4.24 | 2024-09-03 | [45116](https://github.com/airbytehq/airbyte/pull/45116) | Have message and description be nullable for custom_collections deleted events |
| 2.4.23 | 2024-08-31 | [44971](https://github.com/airbytehq/airbyte/pull/44971) | Update dependencies |
| 2.4.22 | 2024-08-24 | [44723](https://github.com/airbytehq/airbyte/pull/44723) | Update dependencies |
| 2.4.21 | 2024-08-17 | [44318](https://github.com/airbytehq/airbyte/pull/44318) | Update dependencies |
| 2.4.20 | 2024-08-12 | [43834](https://github.com/airbytehq/airbyte/pull/43834) | Update dependencies |
| 2.4.19 | 2024-08-10 | [43194](https://github.com/airbytehq/airbyte/pull/43194) | Update dependencies |
| 2.4.18 | 2024-08-06 | [43326](https://github.com/airbytehq/airbyte/pull/43326) | Added missing `type` type for `customer_journey_summary` field for `Customer Journey Summary` stream schema |
| 2.4.17 | 2024-08-02 | [42973](https://github.com/airbytehq/airbyte/pull/42973) | Fixed `FAILED` Job handling for `no-checkpointing` BULK Streams, fixed STATE collision for REST Streams with `Deleted Events` |
| 2.4.16 | 2024-07-21 | [42095](https://github.com/airbytehq/airbyte/pull/42095) | Added the `Checkpointing` for the `BULK` streams, fixed the `store` redirection |
| 2.4.15 | 2024-07-27 | [42806](https://github.com/airbytehq/airbyte/pull/42806) | Update dependencies |
| 2.4.14 | 2024-07-20 | [42150](https://github.com/airbytehq/airbyte/pull/42150) | Update dependencies |
| 2.4.13 | 2024-07-13 | [41809](https://github.com/airbytehq/airbyte/pull/41809) | Update dependencies |
| 2.4.12 | 2024-07-10 | [41103](https://github.com/airbytehq/airbyte/pull/41103) | Update dependencies |
| 2.4.11 | 2024-07-09 | [41068](https://github.com/airbytehq/airbyte/pull/41068) | Added `options` field to `Product Variants` stream |
| 2.4.10 | 2024-07-09 | [41042](https://github.com/airbytehq/airbyte/pull/41042) | Use latest `CDK`: 3.0.0 |
| 2.4.9 | 2024-07-06 | [40768](https://github.com/airbytehq/airbyte/pull/40768) | Update dependencies |
| 2.4.8 | 2024-07-03 | [40707](https://github.com/airbytehq/airbyte/pull/40707) | Fixed the bug when `product_images` stream emitted records with no `primary_key` |
| 2.4.7 | 2024-06-27 | [40593](https://github.com/airbytehq/airbyte/pull/40593) | Use latest `CDK` version possible |
| 2.4.6 | 2024-06-26 | [40526](https://github.com/airbytehq/airbyte/pull/40526) | Made `BULK Job termination threshold` limit adjustable from `input configuration`, increased the default value to `1 hour`. |
| 2.4.5 | 2024-06-25 | [40484](https://github.com/airbytehq/airbyte/pull/40484) | Update dependencies |
| 2.4.4 | 2024-06-19 | [39594](https://github.com/airbytehq/airbyte/pull/39594) | Extended the `Discount Codes`, `Fulfillment Orders`, `Inventory Items`, `Inventory Levels`, `Products`, `Product Variants` and `Transactions` stream schemas |
| 2.4.3 | 2024-06-06 | [38084](https://github.com/airbytehq/airbyte/pull/38084) | add resiliency on some transient errors using the HttpClient |
| 2.4.1 | 2024-06-20 | [39651](https://github.com/airbytehq/airbyte/pull/39651) | Update dependencies |
| 2.4.0 | 2024-06-17 | [39527](https://github.com/airbytehq/airbyte/pull/39527) | Added new stream `Order Agreements` |
| 2.3.0 | 2024-06-14 | [39487](https://github.com/airbytehq/airbyte/pull/39487) | Added new stream `Customer Journey Summary` |
| 2.2.3 | 2024-06-06 | [38084](https://github.com/airbytehq/airbyte/pull/38084) | add resiliency on some transient errors using the HttpClient |
| 2.2.2 | 2024-06-04 | [39019](https://github.com/airbytehq/airbyte/pull/39019) | [autopull] Upgrade base image to v1.2.1 |
| 2.2.1 | 2024-05-30 | [38769](https://github.com/airbytehq/airbyte/pull/38769) | Have products stream return all the tags comma separated |
| 2.2.0 | 2024-05-29 | [38746](https://github.com/airbytehq/airbyte/pull/38746) | Updated countries schema |
| 2.1.4 | 2024-05-24 | [38610](https://github.com/airbytehq/airbyte/pull/38610) | Updated the source `API Version` to `2024-04` |
| 2.1.3 | 2024-05-23 | [38464](https://github.com/airbytehq/airbyte/pull/38464) | Added missing fields to `Products` stream |
| 2.1.2 | 2024-05-23 | [38352](https://github.com/airbytehq/airbyte/pull/38352) | Migrated `Order Risks` stream to `GraphQL BULK` |
| 2.1.1 | 2024-05-20 | [38251](https://github.com/airbytehq/airbyte/pull/38251) | Replace AirbyteLogger with logging.Logger |
| 2.1.0 | 2024-05-02 | [37767](https://github.com/airbytehq/airbyte/pull/37767) | Migrated `Products`, `Product Images` and `Product Variants` to `GraphQL BULK` |
| 2.0.8 | 2024-05-02 | [37589](https://github.com/airbytehq/airbyte/pull/37589) | Added retry for known HTTP Errors for BULK streams |
| 2.0.7 | 2024-04-24 | [36660](https://github.com/airbytehq/airbyte/pull/36660) | Schema descriptions |
| 2.0.6 | 2024-04-22 | [37468](https://github.com/airbytehq/airbyte/pull/37468) | Fixed one time retry for `Internal Server Error` for BULK streams |
| 2.0.5 | 2024-04-03 | [36788](https://github.com/airbytehq/airbyte/pull/36788) | Added ability to dynamically adjust the size of the `slice` |
| 2.0.4 | 2024-03-22 | [36355](https://github.com/airbytehq/airbyte/pull/36355) | Update CDK version to ensure Per-Stream Error Messaging and Record Counts In State (features were already there so just upping the version) |
| 2.0.3 | 2024-03-15 | [36170](https://github.com/airbytehq/airbyte/pull/36170) | Fixed the `STATE` messages emittion frequency for the `nested` sub-streams |
| 2.0.2 | 2024-03-12 | [36000](https://github.com/airbytehq/airbyte/pull/36000) | Fix and issue where invalid shop name causes index out of bounds error |
| 2.0.1 | 2024-03-11 | [35952](https://github.com/airbytehq/airbyte/pull/35952) | Fixed the issue when `start date` is missing but the `stream` required it |
| 2.0.0 | 2024-02-12 | [32345](https://github.com/airbytehq/airbyte/pull/32345) | Fixed the issue with `state` causing the `substreams` to skip the records, made `metafield_*`: `collections, customers, draft_orders, locations, orders, product_images, product_variants, products`, and `fulfillment_orders, collections, discount_codes, inventory_levels, inventory_items, transactions_graphql, customer_address` streams to use `BULK Operations` instead of `REST` |
| 1.1.8 | 2024-02-12 | [35166](https://github.com/airbytehq/airbyte/pull/35166) | Manage dependencies with Poetry. |
| 1.1.7 | 2024-01-19 | [33804](https://github.com/airbytehq/airbyte/pull/33804) | Updated documentation with list of all supported streams |
| 1.1.6 | 2024-01-04 | [33414](https://github.com/airbytehq/airbyte/pull/33414) | Prepare for airbyte-lib |
| 1.1.5 | 2023-12-28 | [33827](https://github.com/airbytehq/airbyte/pull/33827) | Fix GraphQL query |
| 1.1.4 | 2023-10-19 | [31599](https://github.com/airbytehq/airbyte/pull/31599) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 1.1.3 | 2023-10-17 | [31500](https://github.com/airbytehq/airbyte/pull/31500) | Fixed the issue caused by the `missing access token` while setup the new source and not yet authenticated |
| 1.1.2 | 2023-10-13 | [31381](https://github.com/airbytehq/airbyte/pull/31381) | Fixed the issue caused by the `state` presence while fetching the `deleted events` with pagination |
| 1.1.1 | 2023-09-18 | [30560](https://github.com/airbytehq/airbyte/pull/30560) | Performance testing - include socat binary in docker image |
| 1.1.0 | 2023-09-07 | [30246](https://github.com/airbytehq/airbyte/pull/30246) | Added ability to fetch `destroyed` records for `Articles, Blogs, CustomCollections, Orders, Pages, PriceRules, Products` |
| 1.0.0 | 2023-08-11 | [29361](https://github.com/airbytehq/airbyte/pull/29361) | Migrate to the `2023-07` Shopify API Version |
| 0.6.2 | 2023-08-09 | [29302](https://github.com/airbytehq/airbyte/pull/29302) | Handle the `Internal Server Error` when entity could be fetched |
| 0.6.1 | 2023-08-08 | [28291](https://github.com/airbytehq/airbyte/pull/28291) | Allow `shop` field to accept `*.myshopify.com` shop names, updated `OAuth Spec` |
| 0.6.0 | 2023-08-02 | [28770](https://github.com/airbytehq/airbyte/pull/28770) | Added `Disputes` stream |
| 0.5.1 | 2023-07-13 | [28700](https://github.com/airbytehq/airbyte/pull/28700) | Improved `error messages` with more user-friendly description, refactored code |
| 0.5.0 | 2023-06-13 | [27732](https://github.com/airbytehq/airbyte/pull/27732) | License Update: Elv2 |
| 0.4.0 | 2023-06-13 | [27083](https://github.com/airbytehq/airbyte/pull/27083) | Added `CustomerSavedSearch`, `CustomerAddress` and `Countries` streams |
| 0.3.4 | 2023-05-10 | [25961](https://github.com/airbytehq/airbyte/pull/25961) | Added validation for `shop` in input configuration (accepts non-url-like inputs) |
| 0.3.3 | 2023-04-12 | [25110](https://github.com/airbytehq/airbyte/pull/25110) | Fixed issue when `cursor_field` is `"None"`, added missing properties to stream schemas, fixed `access_scopes` validation error |
| 0.3.2 | 2023-02-27 | [23473](https://github.com/airbytehq/airbyte/pull/23473) | Fixed OOM / Memory leak issue for Airbyte Cloud |
| 0.3.1 | 2023-01-16 | [21461](https://github.com/airbytehq/airbyte/pull/21461) | Added `discount_applications` to `orders` stream |
| 0.3.0 | 2022-11-16 | [19492](https://github.com/airbytehq/airbyte/pull/19492) | Added support for graphql and add a graphql products stream |
| 0.2.0 | 2022-10-21 | [18298](https://github.com/airbytehq/airbyte/pull/18298) | Updated API version to the `2022-10`, make stream schemas backward cpmpatible |
| 0.1.39 | 2022-10-13 | [17962](https://github.com/airbytehq/airbyte/pull/17962) | Added metafield streams; support for nested list streams |
| 0.1.38 | 2022-10-10 | [17777](https://github.com/airbytehq/airbyte/pull/17777) | Fixed `404` for configured streams, fix missing `cursor` error for old records |
| 0.1.37 | 2022-04-30 | [12500](https://github.com/airbytehq/airbyte/pull/12500) | Improve input configuration copy |
| 0.1.36 | 2022-03-22 | [9850](https://github.com/airbytehq/airbyte/pull/9850) | Added `BalanceTransactions` stream |
| 0.1.35 | 2022-03-07 | [10915](https://github.com/airbytehq/airbyte/pull/10915) | Fixed a bug which caused `full-refresh` syncs of child REST entities configured for `incremental` |
| 0.1.34 | 2022-03-02 | [10794](https://github.com/airbytehq/airbyte/pull/10794) | Minor specification re-order, fixed links in documentation |
| 0.1.33 | 2022-02-17 | [10419](https://github.com/airbytehq/airbyte/pull/10419) | Fixed wrong field type for tax_exemptions for `Abandoned_checkouts` stream |
| 0.1.32 | 2022-02-18 | [10449](https://github.com/airbytehq/airbyte/pull/10449) | Added `tender_transactions` stream |
| 0.1.31 | 2022-02-08 | [10175](https://github.com/airbytehq/airbyte/pull/10175) | Fixed compatibility issues for legacy user config |
| 0.1.30 | 2022-01-24 | [9648](https://github.com/airbytehq/airbyte/pull/9648) | Added permission validation before sync |
| 0.1.29 | 2022-01-20 | [9248](https://github.com/airbytehq/airbyte/pull/9248) | Added `shop_url` to the record for all streams |
| 0.1.28 | 2022-01-19 | [9591](https://github.com/airbytehq/airbyte/pull/9591) | Implemented `OAuth2.0` authentication method for Airbyte Cloud |
| 0.1.27 | 2021-12-22 | [9049](https://github.com/airbytehq/airbyte/pull/9049) | Updated connector fields title/description |
| 0.1.26 | 2021-12-14 | [8597](https://github.com/airbytehq/airbyte/pull/8597) | Fixed `mismatched number of tables` for base-normalization, increased performance of `order_refunds` stream |
| 0.1.25 | 2021-12-02 | [8297](https://github.com/airbytehq/airbyte/pull/8297) | Added Shop stream |
| 0.1.24 | 2021-11-30 | [7783](https://github.com/airbytehq/airbyte/pull/7783) | Reviewed and corrected schemas for all streams |
| 0.1.23 | 2021-11-15 | [7973](https://github.com/airbytehq/airbyte/pull/7973) | Added `InventoryItems` |
| 0.1.22 | 2021-10-18 | [7107](https://github.com/airbytehq/airbyte/pull/7107) | Added FulfillmentOrders, Fulfillments streams |
| 0.1.21 | 2021-10-14 | [7382](https://github.com/airbytehq/airbyte/pull/7382) | Fixed `InventoryLevels` primary key |
| 0.1.20 | 2021-10-14 | [7063](https://github.com/airbytehq/airbyte/pull/7063) | Added `Location` and `InventoryLevels` as streams |
| 0.1.19 | 2021-10-11 | [6951](https://github.com/airbytehq/airbyte/pull/6951) | Added support of `OAuth 2.0` authorisation option |
| 0.1.18 | 2021-09-21 | [6056](https://github.com/airbytehq/airbyte/pull/6056) | Added `pre_tax_price` to the `orders/line_items` schema |
| 0.1.17 | 2021-09-17 | [5244](https://github.com/airbytehq/airbyte/pull/5244) | Created data type enforcer for converting prices into numbers |
| 0.1.16 | 2021-09-09 | [5945](https://github.com/airbytehq/airbyte/pull/5945) | Fixed the connector's performance for `Incremental refresh` |
| 0.1.15 | 2021-09-02 | [5853](https://github.com/airbytehq/airbyte/pull/5853) | Fixed `amount` type in `order_refund` schema |
| 0.1.14 | 2021-09-02 | [5801](https://github.com/airbytehq/airbyte/pull/5801) | Fixed `line_items/discount allocations` & `duties` parts of `orders` schema |
| 0.1.13 | 2021-08-17 | [5470](https://github.com/airbytehq/airbyte/pull/5470) | Fixed rate limits throttling |
| 0.1.12 | 2021-08-09 | [5276](https://github.com/airbytehq/airbyte/pull/5276) | Added status property to product schema |
| 0.1.11 | 2021-07-23 | [4943](https://github.com/airbytehq/airbyte/pull/4943) | Fixed products schema up to API 2021-07 |
| 0.1.10 | 2021-07-19 | [4830](https://github.com/airbytehq/airbyte/pull/4830) | Fixed for streams json schemas, upgrade to API version 2021-07 |
| 0.1.9 | 2021-07-04 | [4472](https://github.com/airbytehq/airbyte/pull/4472) | Incremental sync is now using updated_at instead of since_id by default |
| 0.1.8 | 2021-06-29 | [4121](https://github.com/airbytehq/airbyte/pull/4121) | Added draft orders stream |
| 0.1.7 | 2021-06-26 | [4290](https://github.com/airbytehq/airbyte/pull/4290) | Fixed the bug when limiting output records to 1 caused infinity loop |
| 0.1.6 | 2021-06-24 | [4009](https://github.com/airbytehq/airbyte/pull/4009) | Added pages, price rules and discount codes streams |
| 0.1.5 | 2021-06-10 | [3973](https://github.com/airbytehq/airbyte/pull/3973) | Added `AIRBYTE_ENTRYPOINT` for Kubernetes support |
| 0.1.4 | 2021-06-09 | [3926](https://github.com/airbytehq/airbyte/pull/3926) | New attributes to Orders schema |
| 0.1.3 | 2021-06-08 | [3787](https://github.com/airbytehq/airbyte/pull/3787) | Added Native Shopify Source Connector |

</details>
