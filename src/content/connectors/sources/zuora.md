---
generated_record: true
connector_name: Zuora
connector_type: source
connector_slug: zuora
connector_directory: source-zuora
definition_id: 3dc3037c-5ce8-4661-adc2-f7a9e3c5ece5
version: 0.1.3
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/zuora
logo: /images/connectors/sources/zuora.svg
logo_source_path: airbyte-integrations/connectors/source-zuora/icon.svg
logo_sha256: bdabd8198d3bc0a9ae84da77fa6b55d8cb4fe65f987852a0fea12e8dfbc392d4
original_metadata_path: airbyte-integrations/connectors/source-zuora/metadata.yaml
original_metadata_sha256: f6fe0effaad73fbf4f2528741356b1e9d3fd7f0d70d6005c7d8b98faf1c22121
original_document_path: docs/integrations/sources/zuora.md
original_document_sha256: d1608cea52a10c5e3eae9bc82f24095cbf1e4ab7afe6bb15d5ecaff7c3996138
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 57da60d8ba53f965576e8a1672e70614cd01ab702d316ffa73b28d02459f04f1
rewritten_at: 2026-11-12T14:02:45.051903+00:00
---

# Zuora

:::warning

## Deprecation notice

The Zuora source connector is scheduled for deprecation on 5 March 2024. It is incompatible with upcoming platform updates for Airbyte 1.0. After deprecation, the connector won't be supported or available in Airbyte.

This connector doesn't support the new per-stream features needed to protect data integrity during Airbyte synchronisation. Without these features, Airbyte can't enforce its reliability and correctness standards for data syncing operations.

### Recommended actions

To continue syncing this data, consider creating a custom connector as an alternative. For guidance, visit [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

## Sync overview

The Zuora source supports Full Refresh and Incremental syncs. You can copy only new or updated data with each sync. Alternatively, copy every row from the tables and columns you've configured for replication.

Airbyte uses [REST API](https://www.zuora.com/developer/api-reference/#section/Introduction) to fetch data from Zuora. The REST API accepts [ZOQL \(Zuora Object Query Language\)](https://knowledgecenter.zuora.com/Central_Platform/Query/Export_ZOQL), a SQL-like language, to export the data.

### Output schema

This source can sync:

- standard objects available in your Zuora Account
- custom objects you've manually added and that are available in your Zuora Account
- custom fields in standard and custom objects that are available in your Zuora Account

Discovering your Zuora Account object schema may take some time when you first add the connection. It may also take time when you refresh the available streams. Don't cancel this operation while it runs. It usually takes 5-10 min, depending on the number of objects available in your Zuora Account.

### Note

Some Zuora Objects may be unavailable for syncing because of Zuora Supscription Plan or Permissions limitations. See the [Availability of Data Source Objects](https://knowledgecenter.zuora.com/DC_Developers/M_Export_ZOQL) section in the Zuora documentation for details.

### Data type mapping

| Integration Type           | Airbyte Type | Notes                                       |
| :------------------------- | :----------- | :------------------------------------------ |
| `decimal(22,9)`            | `number`     | float number                                |
| `decimal`                  | `number`     | float number                                |
| `float`                    | `number`     | float number                                |
| `double`                   | `number`     | float number                                |
| `integer`                  | `number`     |                                             |
| `int`                      | `number`     |                                             |
| `bigint`                   | `number`     |                                             |
| `smallint`                 | `number`     |                                             |
| `timestamp`                | `number`     | number representation of the unix timestamp |
| `date`                     | `string`     |                                             |
| `datetime`                 | `string`     |                                             |
| `timestamp with time zone` | `string`     |                                             |
| `picklist`                 | `string`     |                                             |
| `text`                     | `string`     |                                             |
| `varchar`                  | `string`     |                                             |
| `zoql`                     | `object`     |                                             |
| `binary`                   | `object`     |                                             |
| `json`                     | `object`     |                                             |
| `xml`                      | `object`     |                                             |
| `blob`                     | `object`     |                                             |
| `list`                     | `array`      |                                             |
| `array`                    | `array`      |                                             |
| `boolean`                  | `boolean`    |                                             |
| `bool`                     | `boolean`    |                                             |

Any data type not listed in the table above is treated as `string`.

### Features

| Feature                                   | Supported?\(Yes/No\) | Notes |
| :---------------------------------------- | :------------------- | :---- |
| Full Refresh Overwrite Sync               | Yes                  |       |
| Full Refresh Append Sync                  | Yes                  |       |
| Incremental - Append Sync                 | Yes                  |       |
| Incremental - Append + Deduplication Sync | Yes                  |       |
| Namespaces                                | No                   |       |

## Supported Zuora environments

| Environment | Supported?\(Yes/No\) | Notes                                   |
| :---------- | :------------------- | :-------------------------------------- |
| Production  | Yes                  | Select from exising options while setup |
| Sandbox     | Yes                  | Select from exising options while setup |

## Supported data query options

| Option    | Supported?\(Yes/No\) | Notes                                                                                                                                                                                                                                                                                                 |
| :-------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LIVE      | Yes                  | Run data queries against Zuora live transactional databases                                                                                                                                                                                                                                           |
| UNLIMITED | Yes                  | Run data queries against an optimized, replicated database at 12 hours freshness for high volume extraction use cases (Early Adoption, additionall access required, contact [Zuora Support](http://support.zuora.com/hc/en-us) in order to request this feature enabled for your account beforehand.) |

## Supported Zuora environments

### Production

| Environment         | Endpoint          |
| :------------------ | :---------------- |
| US Production       | rest.zuora.com    |
| US Cloud Production | rest.na.zuora.com |
| EU Production       | rest.eu.zuora.com |

### Sandbox

| Environment          | Endpoint                  |
| :------------------- | :------------------------ |
| US API Sandbox       | rest.apisandbox.zuora.com |
| US Cloud API Sandbox | rest.sandbox.na.zuora.com |
| US Central Sandbox   | rest.test.zuora.com       |
| EU API Sandbox       | rest.sandbox.eu.zuora.com |
| EU Central Sandbox   | rest.test.eu.zuora.com    |

### Other

| Environment         | Endpoint           |
| :------------------ | :----------------- |
| US Performance Test | rest.pt1.zuora.com |

For more information about available environments, visit [this page](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/D_Zuora_Environments).

### Performance considerations

If your sync takes a long time, consider these options:

- increase the `window_in_days` parameter in the Zuora source configuration
- use a smaller date range by adjusting the `start_date` parameter

### Note

The first sync for all objects in your Zuora Account usually takes 25-45-60 min. More data requires more time.

## Get started

### Create an API user role

1. Log in to your `Zuora acccount`.
2. In the Zuora dashboard's top-right corner, select `Settings` &gt; `Administration Settings`.
3. Select `Manage User Roles`.
4. Select `Add new role` to create a new role, then complete the required form fields.

### Assign the role to a user

1. From the `administration` page, select `Manage Users`.
2. Select `add single user`.
3. Create a user and assign the role you created in the `Create an API user role` section.
4. You'll receive an email with activation instructions. Follow them to activate your API user.

   For more information, visit [Create an API User page](https://knowledgecenter.zuora.com/Billing/Tenant_Management/A_Administrator_Settings/Manage_Users/Create_an_API_User).

### Create Client ID and Client Secret

1. From the `administration` page, select `Manage Users`.
2. Select the User Name of the target user.
3. Enter a client name and description, then select `create`.
4. A pop-up opens with your Client ID and Client Secret.

   Save your Client ID and Client Secret because they won't be shown again. You'll need them to configure Airbyte Zuora Connector.

5. You can now set up Zuora connector in Airbyte using the created `Client ID` and `Client Secret`.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                           | Subject                                                       |
| :------ | :--------- | :----------------------------------------------------- | :------------------------------------------------------------ |
| 0.1.3   | 2021-10-16 | [7093](https://github.com/airbytehq/airbyte/pull/7093) | Added support of `Unlimited` option for `Data Query`          |
| 0.1.2   | 2021-10-11 | [6960](https://github.com/airbytehq/airbyte/pull/6960) | Change minimum value for `Window_in_days` to 1, instead of 30 |
| 0.1.1   | 2021-10-01 | [6575](https://github.com/airbytehq/airbyte/pull/6575) | Added OAuth support for Airbyte Cloud                         |
| 0.1.0   | 2021-08-01 | [4661](https://github.com/airbytehq/airbyte/pull/4661) | Initial release of Native Zuora connector for Airbyte         |

</details>
