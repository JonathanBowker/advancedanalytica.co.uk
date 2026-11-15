---
generated_record: true
connector_name: ZohoCRM
connector_type: source
connector_slug: zoho-crm
connector_directory: source-zoho-crm
definition_id: 4942d392-c7b5-4271-91f9-3b4f4e51eb3e
version: 0.4.1
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/zoho-crm
logo: /images/connectors/sources/zoho-crm.svg
logo_source_path: airbyte-integrations/connectors/source-zoho-crm/icon.svg
logo_sha256: 2affa9a51790038297cd20d3410c561dee2beea7e05b92ab39bfaa936d398afb
original_metadata_path: airbyte-integrations/connectors/source-zoho-crm/metadata.yaml
original_metadata_sha256: 1d5ef9608e85f3dabede41c4fe06be64be1266a3e7d1c67a4a1d6831177a9414
original_document_path: docs/integrations/sources/zoho-crm.md
original_document_sha256: d02e9f7afeabc23174195159a77017ec1423a16e19fb66361eb55ce44d838f4c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 75a7b4944cdbbed4fc936dc2212283558636cf523d6516b366550191f2b3362d
rewritten_at: 2026-11-12T14:02:52.722338+00:00
---

# Zoho CRM

## Sync overview

The Zoho CRM source supports Full Refresh and Incremental syncs. It reads data through version 2 of the [Zoho CRM REST API](https://www.zoho.com/crm/developer/docs/api/v2/modules-api.html).

### Output schema

The connector syncs:

- Standard modules in your Zoho CRM account
- Custom modules you've added to your account
- Custom fields in standard and custom modules

The connector doesn't use a fixed list of streams. During discovery, it calls the [Modules API](https://www.zoho.com/crm/developer/docs/api/v2/modules-api.html) to list your modules. It then uses the [Modules Metadata API](https://www.zoho.com/crm/developer/docs/api/v2/module-meta.html) and [Fields Metadata API](https://www.zoho.com/crm/developer/docs/api/v2/field-meta.html) to build each module's schema. Discovery usually takes 10 to 30 seconds.

A module appears as a stream only when the Zoho CRM API returns its module and field metadata. Your Zoho CRM edition may make some modules unavailable. Modules may also be unavailable when your OAuth token doesn't include the required scope. For details, see [Scopes](https://www.zoho.com/crm/developer/docs/api/v2/scopes.html) in the Zoho CRM documentation.

### Data type mapping

| Integration Type      | Airbyte Type | Notes                     |
| :-------------------- | :----------- | :------------------------ |
| `boolean`             | `boolean`    |                           |
| `double`              | `number`     |                           |
| `currency`            | `number`     |                           |
| `integer`             | `integer`    |                           |
| `profileimage`        | `string`     |                           |
| `picklist`            | `string`     |                           |
| `textarea`            | `string`     |                           |
| `website`             | `string`     | format: uri               |
| `date`                | `string`     | format: date              |
| `datetime`            | `string`     | format: date-time         |
| `text`                | `string`     |                           |
| `phone`               | `string`     |                           |
| `bigint`              | `string`     | airbyte_type: big_integer |
| `event_reminder`      | `string`     |                           |
| `email`               | `string`     | format: email             |
| `autonumber`          | `string`     | airbyte_type: big_integer |
| `jsonarray`           | `array`      |                           |
| `jsonobject`          | `object`     |                           |
| `multiselectpicklist` | `array`      |                           |
| `lookup`              | `object`     |                           |
| `ownerlookup`         | `object`     |                           |
| `RRULE`               | `object`     |                           |
| `ALARM`               | `object`     |                           |

The connector treats any data type not listed above as `string`.

Picklist and multi-select picklist fields aren't limited to values currently defined in Zoho CRM. When you remove a picklist value, Zoho CRM keeps it on existing records. The connector therefore syncs the value held by each record.

Auto-number fields are the exception to this table. When you configure a prefix or suffix in Zoho CRM, values become plain strings such as `INV-1042`. The connector then drops the `big_integer` type and syncs them as strings.

### Features

| Feature                                   | Supported? \(Yes/No\) |
| :---------------------------------------- | :-------------------- |
| Full Refresh Overwrite Sync               | Yes                   |
| Full Refresh Append Sync                  | Yes                   |
| Incremental - Append Sync                 | Yes                   |
| Incremental - Append + Deduplication Sync | Yes                   |
| Namespaces                                | No                    |

### Incremental syncs

Every stream supports incremental syncs. The connector resolves each module's cursor field separately. It uses the first field exposed by the module's field metadata:

1. `Modified_Time`
2. `Action_Performed_Time`
3. `Created_Time`

Most modules use `Modified_Time`. Modules that don't expose it, such as `Actions_Performed`, use `Action_Performed_Time` instead. Each stream stores its state under its own cursor field name because cursor fields vary by module.

The connector reads only changed records by sending the stored cursor value in the `If-Modified-Since` request header. It advances this value by one second, avoiding another read of the previous sync's final record. Zoho CRM returns `304 Not Modified` when nothing has changed, which the connector treats as an empty page. If a record lacks a cursor value, the connector emits it without advancing the stream's state.

Every stream schema includes `id` and `Modified_Time`, including modules without a `Modified_Time` field. For these modules, the column is always null. The module's actual cursor field contains the timestamp.

Stream schemas mark only `id` and `Modified_Time` as required. Fields marked as mandatory in Zoho CRM's metadata aren't required in stream schemas. Records with empty values for these fields still match the schema.

#### Start date

**Start Date** is optional and controls how far back the first incremental sync reads. If you leave it empty, the connector reads from `1970-01-01T00:00:00+00:00`. Enter an ISO 8601 value, with or without a time and UTC offset. Accepted values include `2024-01-01`, `2024-01-01 13:00:00`, `2024-01-01T13:00:00-07:00` and `2024-01-01T13:00:00Z`.

Connector versions before 0.1.4 can't parse UTC timestamps ending in `Z`. They fail the sync with `Invalid isoformat string`. Upgrade to 0.1.4 or later when your start date or saved cursor value uses this format.

## Supported Zoho CRM environments

### Production

| Environment | Base URL                |
| :---------- | :---------------------- |
| US          | https://zohoapis.com    |
| AU          | https://zohoapis.com.au |
| EU          | https://zohoapis.eu     |
| IN          | https://zohoapis.in     |
| CN          | https://zohoapis.com.cn |
| JP          | https://zohoapis.jp     |

### Sandbox

| Environment | Endpoint                        |
| :---------- | :------------------------------ |
| US          | https://sandbox.zohoapis.com    |
| AU          | https://sandbox.zohoapis.com.au |
| EU          | https://sandbox.zohoapis.eu     |
| IN          | https://sandbox.zohoapis.in     |
| CN          | https://sandbox.zohoapis.com.cn |
| JP          | https://sandbox.zohoapis.jp     |

### Developer

| Environment | Endpoint                          |
| :---------- | :-------------------------------- |
| US          | https://developer.zohoapis.com    |
| AU          | https://developer.zohoapis.com.au |
| EU          | https://developer.zohoapis.eu     |
| IN          | https://developer.zohoapis.in     |
| CN          | https://developer.zohoapis.com.cn |
| JP          | https://developer.zohoapis.jp     |

For more information about available environments, visit [this page](https://www.zoho.com/crm/developer/sandbox.html?src=dev-hub).

### Performance considerations

Zoho CRM API calls consume credits. Each Zoho CRM edition has a credit limit within a rolling 24-hour window. Discovery uses one call to list your modules, followed by two metadata calls per module. These calls retrieve module metadata and field metadata. Consider this usage when setting your sync frequency. For each call's credit cost, see [API limits](https://www.zoho.com/crm/developer/docs/api/v2/api-limits.html) in the Zoho CRM documentation.

The connector retries record requests that return HTTP `429 Too Many Requests` or a `5xx` server error before failing the sync.

The connector automatically detects your **Zoho CRM Edition** through the Zoho organization API (`/crm/v2/org`). This API requires the `ZohoCRM.org.READ` scope. Your detected edition controls the number of parallel metadata requests used to build the stream list:

| Edition      | Parallel requests |
| :----------- | :---------------- |
| Free         | 5                 |
| Standard     | 10                |
| Professional | 15                |
| Enterprise   | 20                |
| Ultimate     | 25                |

If the connector can't detect your edition, it uses the Free tier concurrency limit of 5. It also logs a warning explaining why. Common causes include:

- Your refresh token doesn't include the `ZohoCRM.org.READ` scope. Airbyte Cloud sources using connector version 0.2.0 didn't request this scope. These sources remain in this group until you re-authenticate.
- Zoho returns an edition name that isn't one of the five listed in the table. The warning includes the name Zoho returned.

To skip detection, set **Max Concurrent Requests** to your preferred number of parallel requests. You can raise the limit without re-authenticating or match your plan's limit in Zoho's [API limits](https://www.zoho.com/crm/developer/docs/api/v2/api-limits.html) table. You can also throttle the connector when other integrations share the same Zoho API credits. Exceeding your account's concurrency limit can push the connector beyond Zoho's discovery allowance.

### Zoho Developer environment

The Zoho Developer environment API isn't consistent with the production environment API. It contains about half the modules supported in production. Consider this difference when pulling data from the Developer environment.

## Setup guide

Your authentication method depends on where you run Airbyte. In both cases, you also complete these fields:

| Field                   | Required | Notes                                                                                      |
| :---------------------- | :------- | :----------------------------------------------------------------------------------------- |
| Data Center Location    | Yes      | The region that hosts your Zoho CRM account: `US`, `AU`, `EU`, `IN`, `CN`, or `JP`         |
| Environment             | Yes      | `Production`, `Developer`, or `Sandbox`                                                    |
| Start Date              | No       | See [Start date](#start-date)                                                              |
| Max Concurrent Requests | No       | Overrides edition detection. See [Performance considerations](#performance-considerations) |

### Airbyte Cloud: sign in with Zoho

1. Select your **Data Center Location** first. Zoho uses a separate accounts server for each data centre. The sign-in flow uses the server for your selected region.
2. Select **Authenticate your Zoho CRM account** and sign in. Airbyte requests these read-only scopes:
   - `ZohoCRM.settings.modules.READ` and `ZohoCRM.settings.fields.READ`, to list your modules and their fields
   - `ZohoCRM.modules.READ` and `ZohoCRM.modules.custom.READ`, to read records from standard and custom modules
   - `ZohoCRM.org.READ`, to detect your Zoho CRM edition and set request concurrency
3. Complete the remaining fields and select **Set up source**.

The flow stores only the refresh token in your source. The client ID and secret belong to Airbyte's Zoho app.

### Airbyte Open Source

Create a Zoho API client and generate a refresh token. Then enter the **Client ID**, **Client Secret** and **Refresh Token** in the source.

#### Get Client ID, Client Secret, and Grant Token

1. Log into https://api-console.zoho.com/.
2. Choose client.
3. Enter the scopes covered by the refresh and access tokens. The connector reads module and field metadata, reads module records and detects your edition through the organization API. Grant `ZohoCRM.settings.modules.READ`, `ZohoCRM.settings.fields.READ`, `ZohoCRM.modules.READ`, `ZohoCRM.modules.custom.READ` and `ZohoCRM.org.READ`. Alternatively, grant `ZohoCRM.modules.ALL` if you prefer one module scope for records. **Make sure the scope covers every module you want to sync.** If the token lacks metadata access, that module doesn't appear as a stream. If it lacks record access, the stream appears, but the sync fails when reading data.
4. Enter the grant token's lifetime and description, then click "Create".
5. Copy Grant token and close the pop-up. Then copy Client ID and Client Secret from the "Client Secret" tab.

#### Create Refresh Token

To generate the refresh token, see [this page](https://www.zoho.com/crm/developer/docs/api/v2/access-refresh.html).
Complete the authentication flow quickly. Zoho CRM's initial token remains active for only a few minutes. After that, you can't use it to generate a refresh token.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| 0.4.1 | 2026-11-10 | [91774](https://github.com/airbytehq/airbyte/pull/91774) | Update dependencies |
| 0.4.0 | 2026-11-03 | [90861](https://github.com/airbytehq/airbyte/pull/90861) | Upgrade to Python 3.13 base image and airbyte-cdk 7; stop marking Zoho mandatory fields as required in stream schemas |
| 0.3.8 | 2026-11-03 | [90811](https://github.com/airbytehq/airbyte/pull/90811) | Update dependencies |
| 0.3.7 | 2026-11-02 | [88944](https://github.com/airbytehq/airbyte/pull/88944) | Stop declaring picklist values as a closed `enum` in stream schemas, as records keep values removed from a picklist |
| 0.3.6 | 2026-10-27 | [90099](https://github.com/airbytehq/airbyte/pull/90099) | Update dependencies |
| 0.3.5 | 2026-10-20 | [89462](https://github.com/airbytehq/airbyte/pull/89462) | Update dependencies |
| 0.3.4 | 2026-10-13 | [88877](https://github.com/airbytehq/airbyte/pull/88877) | Update dependencies |
| 0.3.3 | 2026-10-06 | [88089](https://github.com/airbytehq/airbyte/pull/88089) | Update dependencies |
| 0.3.2 | 2026-09-29 | [87414](https://github.com/airbytehq/airbyte/pull/87414) | Update dependencies |
| 0.3.1 | 2026-09-22 | [86874](https://github.com/airbytehq/airbyte/pull/86874) | Update dependencies |
| 0.3.0 | 2026-09-21 | [86491](https://github.com/airbytehq/airbyte/pull/86491) | Auto-detect Zoho CRM edition from the organization API instead of the `edition` config field (defaulting to a concurrency limit of 5 when detection fails); add optional `max_concurrent_requests` override |
| 0.2.0 | 2026-09-16 | [85833](https://github.com/airbytehq/airbyte/pull/85833) | Add `advanced_auth` with declarative OAuth (data-center-aware consent and token URLs) requesting Zoho's documented read scopes; document the OAuth and manual setup paths |
| 0.1.6 | 2026-09-15 | [86301](https://github.com/airbytehq/airbyte/pull/86301) | Update dependencies |
| 0.1.5 | 2026-08-25 | [79062](https://github.com/airbytehq/airbyte/pull/79062) | Update dependencies |
| 0.1.4 | 2026-08-24 | [80278](https://github.com/airbytehq/airbyte/pull/80278) | Fix incremental sync: tolerate `Z`-suffixed (UTC) cursor values and resolve cursor field per module instead of hardcoding `Modified_Time` |
| 0.1.3 | 2025-02-05 | [42864](https://github.com/airbytehq/airbyte/pull/42864) | Migrate to Poetry |
| 0.1.2 | 2023-03-19 | [23906](https://github.com/airbytehq/airbyte/pull/23906) | added support for the latest CDK, fixed SAT |
| 0.1.1 | 2023-03-15 | [24034](https://github.com/airbytehq/airbyte/pull/24034) | Set airbyte type to string for zoho autonumbers when they include prefix or suffix |
| 0.1.0 | 2022-04-06 | [11193](https://github.com/airbytehq/airbyte/pull/11193) | Initial release |

</details>
