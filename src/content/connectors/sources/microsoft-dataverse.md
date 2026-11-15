---
generated_record: true
connector_name: Microsoft Dataverse
connector_type: source
connector_slug: microsoft-dataverse
connector_directory: source-microsoft-dataverse
definition_id: 9220e3de-3b60-4bb2-a46f-046d59ea235a
version: 1.0.2
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/microsoft-dataverse
logo: /images/connectors/sources/microsoft-dataverse.svg
logo_source_path: airbyte-integrations/connectors/source-microsoft-dataverse/icon.svg
logo_sha256: 16402394cd4d48b19380f21558766fcecb62dc21902e6a59824943869824784c
original_metadata_path: airbyte-integrations/connectors/source-microsoft-dataverse/metadata.yaml
original_metadata_sha256: 4c95f212bb9e67c31647118f0a6879fc15f6359d7c654b2c6f12d930094e8f31
original_document_path: docs/integrations/sources/microsoft-dataverse.md
original_document_sha256: ca075559c7fe4d388493b28d6229cf8e5e6f9ce2f46743459f3633d8e9e6e507
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f6442d4ccb3a0478ebd06a1c97e6b16be57c4287c34f139507bd7906507a6cd5
rewritten_at: 2026-11-12T13:47:18.402715+00:00
---

# Microsoft Dataverse

This source syncs data from [Microsoft Dataverse](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/overview) through the [Dataverse Web API](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview) (v9.2).

## What you need

- A Microsoft Dataverse environment, included with Dynamics 365 or Power Apps
- An [app registration](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/walkthrough-register-app-azure-active-directory) in Microsoft Entra ID, formerly Azure Active Directory, with a client secret
- The app registration added as an [application user](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/authenticate-oauth) in your Dataverse environment
- At least read access to the tables you want to sync

## Set up the connector

### Step 1: Register an application

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Go to **Microsoft Entra ID** > **App registrations** > **New registration**.
3. Enter an application name and select **Register**.
4. Note the **Application (client) ID** and **Directory (tenant) ID** on the Overview page.
5. Under **Certificates & secrets**, select **New client secret**. Add a description and expiry, then select **Add**.
6. Copy the secret **Value** immediately. It won't appear again.

### Step 2: Add the application user

1. Sign in to the [Power Platform admin center](https://admin.powerplatform.microsoft.com).
2. Select your environment, then select **Settings** > **Users + permissions** > **Application users**.
3. Select **New app user** and find your app registration.
4. Assign it to a business unit.
5. Grant it a security role with read privileges for the tables you want to sync.

### Step 3: Configure the Airbyte connector

Enter these fields:

| Field | Description |
| :---- | :---------- |
| **URL** | Your Dataverse environment URL, for example `https://yourorg.crm.dynamics.com`. Do not include a trailing slash or path. |
| **Tenant ID** | The Directory (tenant) ID from your app registration. |
| **Client ID** | The Application (client) ID from your app registration. |
| **Client Secret** | The client secret value you created in Step 1. |
| **Max page size** | Maximum number of records per API response page (default: 5000). Reduce this value if you encounter timeout errors on tables with wide rows. |

## Supported streams

The connector discovers every table, or entity, in your Dataverse environment through the [EntityDefinitions](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/entitymetadata) API. Each table becomes an available stream.

### Sync modes

| Feature | Supported | Notes |
| :------ | :-------- | :---- |
| Full Refresh | Yes | Available for all tables. |
| Incremental Sync | Yes | Available for tables with [change tracking](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/use-change-tracking-synchronize-data-external-systems) enabled. Uses OData delta tokens to fetch only modified and deleted records. |
| Replicate Incremental Deletes | Yes | Deleted records are emitted with only the primary key, the cursor field, and `_ab_cdc_deleted_at` populated. The cursor field and `_ab_cdc_deleted_at` are set to the time the sync processed the deletion, not the time the record was deleted. |
| Namespaces | No | |

For incremental sync, the connector uses Dataverse's change tracking feature through the `Prefer: odata.track-changes` header. The API returns a `@odata.deltaLink` on the final results page. The connector stores this value as state. Subsequent syncs use it to retrieve only changes made since the previous sync. The first incremental sync reads every record in the table.

If a table has a `modifiedon` column, the connector uses it as the cursor field. Each updated record also includes an `_ab_cdc_updated_at` column containing the cursor field's value.

### Data type mapping

| Dataverse Type | Airbyte Type | Notes |
| :------------- | :----------- | :---- |
| `String` | `string` | |
| `Uniqueidentifier` | `string` | |
| `DateTime` (DateOnly behavior) | `date` | Fields with `DateTimeBehavior=DateOnly` |
| `DateTime` (other behaviors) | `timestamp_with_timezone` | `UserLocal` and `TimeZoneIndependent` behaviors |
| `Integer` | `integer` | |
| `BigInt` | `integer` | |
| `Money` | `number` | |
| `Boolean` | `boolean` | |
| `Double` | `number` | |
| `Decimal` | `number` | |
| `Picklist` | `integer` | |
| `Status` | `integer` | |
| `State` | `integer` | |
| `Lookup` | `string` | Field name is prefixed with `_` and suffixed with `_value` (for example, `_parentaccountid_value`). |
| `Virtual` | — | Skipped; not synced. |

All other types default to `string`.

## Limitations and known issues

- **Change tracking must be enabled** on a table before you can use incremental sync. Tables without change tracking support only full refresh. You can [enable change tracking](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-create-entity#enable-change-tracking) in the Power Apps table settings.
- **Virtual fields** don't appear in the schema and aren't synced.
- **Owner and Customer columns aren't renamed.** Only columns with the `Lookup` type use the `_<name>_value` naming in the schema. `Owner` and `Customer` columns, including `ownerid`, appear under their logical names as strings. The Web API returns their values in properties named like `_ownerid_value`.
- **State is saved only at the end of an incremental sync.** The delta token appears on the final results page. If an incremental sync fails partway through, the next sync restarts from the previous delta token.
- **Service protection limits**: Dataverse enforces [API service protection limits](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/api-limits), which return HTTP 429 when exceeded. The connector handles back-off automatically. For persistent throttling, reduce the **Max page size** or schedule syncs during off-peak hours.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access by IP, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| 1.0.2 | 2026-06-07 | [79143](https://github.com/airbytehq/airbyte/pull/79143) | Revert connector base image to 4.0.0 (4.1.0 ships Python 3.13, incompatible with the connector's pinned CDK). |
| 1.0.1 | 2026-06-02 | [78805](https://github.com/airbytehq/airbyte/pull/78805) | Update dependencies |
| 1.0.0 | 2026-05-13 | [77565](https://github.com/airbytehq/airbyte/pull/77565) | Map DateOnly fields to `date` format instead of `date-time`. Add `$select` projection to discovery to reduce metadata payload size. Streams with DateOnly fields require a schema refresh and data reset. |
| 0.1.32 | 2025-05-10 | [60052](https://github.com/airbytehq/airbyte/pull/60052) | Update dependencies |
| 0.1.31 | 2025-05-03 | [59292](https://github.com/airbytehq/airbyte/pull/59292) | Update dependencies |
| 0.1.30 | 2025-04-26 | [58830](https://github.com/airbytehq/airbyte/pull/58830) | Update dependencies |
| 0.1.29 | 2025-04-19 | [57684](https://github.com/airbytehq/airbyte/pull/57684) | Update dependencies |
| 0.1.28 | 2025-04-05 | [57100](https://github.com/airbytehq/airbyte/pull/57100) | Update dependencies |
| 0.1.27 | 2025-03-29 | [56631](https://github.com/airbytehq/airbyte/pull/56631) | Update dependencies |
| 0.1.26 | 2025-03-22 | [56043](https://github.com/airbytehq/airbyte/pull/56043) | Update dependencies |
| 0.1.25 | 2025-03-08 | [55454](https://github.com/airbytehq/airbyte/pull/55454) | Update dependencies |
| 0.1.24 | 2025-03-01 | [54768](https://github.com/airbytehq/airbyte/pull/54768) | Update dependencies |
| 0.1.23 | 2025-02-22 | [54356](https://github.com/airbytehq/airbyte/pull/54356) | Update dependencies |
| 0.1.22 | 2025-02-15 | [46493](https://github.com/airbytehq/airbyte/pull/46493) | Update dependencies |
| 0.1.21 | 2024-09-26 | [45938](https://github.com/airbytehq/airbyte/pull/45938) | Make Dataverse available on Airbyte Cloud |
| 0.1.20 | 2024-09-21 | [45777](https://github.com/airbytehq/airbyte/pull/45777) | Update dependencies |
| 0.1.19 | 2024-09-14 | [45482](https://github.com/airbytehq/airbyte/pull/45482) | Update dependencies |
| 0.1.18 | 2024-09-07 | [45224](https://github.com/airbytehq/airbyte/pull/45224) | Update dependencies |
| 0.1.17 | 2024-08-31 | [44987](https://github.com/airbytehq/airbyte/pull/44987) | Update dependencies |
| 0.1.16 | 2024-08-24 | [44640](https://github.com/airbytehq/airbyte/pull/44640) | Update dependencies |
| 0.1.15 | 2024-08-17 | [44224](https://github.com/airbytehq/airbyte/pull/44224) | Update dependencies |
| 0.1.14 | 2024-08-10 | [43653](https://github.com/airbytehq/airbyte/pull/43653) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43164](https://github.com/airbytehq/airbyte/pull/43164) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42612](https://github.com/airbytehq/airbyte/pull/42612) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42373](https://github.com/airbytehq/airbyte/pull/42373) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41920](https://github.com/airbytehq/airbyte/pull/41920) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41346](https://github.com/airbytehq/airbyte/pull/41346) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41247](https://github.com/airbytehq/airbyte/pull/41247) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40800](https://github.com/airbytehq/airbyte/pull/40800) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40340](https://github.com/airbytehq/airbyte/pull/40340) | Update dependencies |
| 0.1.5 | 2024-06-21 | [39931](https://github.com/airbytehq/airbyte/pull/39931) | Update dependencies |
| 0.1.4 | 2024-06-06 | [39265](https://github.com/airbytehq/airbyte/pull/39265) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.3 | 2024-05-20 | [38397](https://github.com/airbytehq/airbyte/pull/38397) | [autopull] base image + poetry + up_to_date |
| 0.1.2 | 2023-08-24 | [29732](https://github.com/airbytehq/airbyte/pull/29732) | Adjust source_default_cursor when modifiedon not exists |
| 0.1.1 | 2023-03-16 | [22805](https://github.com/airbytehq/airbyte/pull/22805) | Fixed deduped cursor field value update |
| 0.1.0 | 2022-11-14 | [18646](https://github.com/airbytehq/airbyte/pull/18646) | New Source: Microsoft Dataverse |

</details>
