---
generated_record: true
connector_name: Zendesk Sunshine
connector_type: source
connector_slug: zendesk-sunshine
connector_directory: source-zendesk-sunshine
definition_id: 325e0640-e7b3-4e24-b823-3361008f603f
version: 0.4.29
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/zendesk-sunshine
logo: /images/connectors/sources/zendesk-sunshine.svg
logo_source_path: airbyte-integrations/connectors/source-zendesk-sunshine/icon.svg
logo_sha256: 9d6b42f2bfbfc461b403f517094170722fdb2e2c581b20d111e948311c082a4e
original_metadata_path: airbyte-integrations/connectors/source-zendesk-sunshine/metadata.yaml
original_metadata_sha256: c5a520bcdbaaf1f661021f72d2a633c0853d44e7a94cf833d2b6c8c1bc64f78d
original_document_path: docs/integrations/sources/zendesk-sunshine.md
original_document_sha256: 9a357a0b26b2cf91adf0c8ee803e6618d49828a77187ef7ebff08970816ad9db
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 191e33b2ddc808e5ae0ab5bfde410abc9dbbc699f37038c7c134bbbe77ba7878
rewritten_at: 2026-11-12T14:01:49.184344+00:00
---

# Zendesk Sunshine

Sync legacy custom object types, records and relationships from the [Zendesk Sunshine API](https://developer.zendesk.com/api-reference/custom-data/custom-objects-api/custom-objects-api/). Zendesk now calls this the Legacy Custom Objects API. The source reads data under the `/api/sunshine/` endpoints.

:::warning End of life

Zendesk removed legacy custom objects on 27 July 2026. The legacy APIs, admin interface and object records are no longer available. They remain available if your account has a one-time extension from Zendesk. See Zendesk's [removal announcement](https://support.zendesk.com/hc/en-us/articles/9156194392730-Announcing-the-removal-of-legacy-custom-objects).

This connector only reads the legacy API. It can't read the [current custom objects](https://developer.zendesk.com/api-reference/custom-data/introduction/) because they use a different data model and incompatible endpoints. After migrating to the new custom objects experience, this source can no longer sync your data.

:::

## Supported streams

You can sync the following streams:

| Stream | Sync mode | Description |
| :----- | :-------- | :---------- |
| [`limits`](https://developer.zendesk.com/api-reference/custom-data/custom-objects-api/limits/) | Full refresh | Your account's legacy custom object limits and current usage. |
| [`object_types`](https://developer.zendesk.com/api-reference/custom-data/custom-objects-api/resource_types/) | Full refresh | The legacy object types defined in your account, including each type's schema. |
| [`object_records`](https://developer.zendesk.com/api-reference/custom-data/custom-objects-api/resources/) | Incremental | The records of each legacy object type. |
| [`object_type_policies`](https://developer.zendesk.com/api-reference/custom-data/custom-objects-api/permissions/) | Full refresh | The read and write permissions for each legacy object type. |
| [`relationship_types`](https://developer.zendesk.com/api-reference/custom-data/custom-objects-api/relationship_types/) | Full refresh | The relationship types defined in your account. |
| [`relationship_records`](https://developer.zendesk.com/api-reference/custom-data/custom-objects-api/relationships/) | Full refresh | The relationship records for each relationship type. |

Four streams depend on another stream to determine what they request:

- `object_records` and `object_type_policies` iterate through every type returned by `object_types`.
- `relationship_records` iterates through every type returned by `relationship_types`.

These streams sync no records if your account has no legacy object or relationship types. The sync still succeeds.

Only `object_records` supports incremental syncing. It uses `updated_at` as its cursor. It only requests records updated after your configured start date. The other streams re-read everything during each sync, so your start date doesn't affect them.

### Data type mapping

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`         | `string`     |       |
| `number`         | `number`     |       |
| `array`          | `array`      |       |
| `object`         | `object`     |       |

### Performance

Zendesk [API rate limits](https://developer.zendesk.com/api-reference/introduction/rate-limits/) restrict the connector. After a `429 Too Many Requests` response, the connector automatically retries requests using the `Retry-After` header. You shouldn't encounter rate limit issues under normal usage. If you do, [create an issue](https://github.com/airbytehq/airbyte/issues).

`object_records`, `object_type_policies` and `relationship_records` make at least one request for each type. Sync duration therefore grows with your legacy object and relationship type count, not only your record count.

## Prerequisites

- A Zendesk account with legacy custom objects still enabled. Legacy custom objects are an Enterprise plan feature. Zendesk only kept them enabled for accounts that used them before September 2023. You can't enable them now. See Zendesk's [getting started with legacy custom objects](https://developer.zendesk.com/documentation/custom-data/custom-objects/getting-started-with-custom-objects/).
- Your Zendesk subdomain, which is the part before `.zendesk.com` in your Zendesk URL.
- A start date for incremental syncs, using the format `YYYY-MM-DDT00:00:00Z`.
- One of these authentication methods:
  - **OAuth2.0**, recommended for Airbyte Cloud: Client ID, Client Secret and authorisation through Airbyte's OAuth flow.
  - **API Token**, recommended for Airbyte Open Source: your Zendesk email address and an API token.
  - **OAuth2.0 (Legacy)**: a manually generated OAuth access token.

## Setup

### Authentication

You can use one of three authentication methods:

#### OAuth2.0 for Airbyte Cloud

During setup in Airbyte Cloud, you'll be redirected to Zendesk to authorise the connection. Airbyte requests the `read` scope. Refresh tokens maintain access automatically, so you don't need to regenerate tokens manually.

Zendesk uses rotating refresh tokens. Each access token refresh provides a new refresh token and invalidates the previous one. The connector handles this automatically. Airbyte requests access tokens with a 48-hour lifetime and refreshes them only after expiry.

If an invalid refresh token causes a sync failure, re-authenticate the source in Airbyte. This provides a new token pair.

#### API Token for Airbyte Open Source

To authenticate with an API token:

1. In Zendesk, go to **Admin Center** > **Apps and integrations** > **APIs** > **Zendesk API**.
2. Enable token access if it isn't already enabled.
3. Click **Add API token**, add a description and click **Save**.
4. Copy the token value. Zendesk displays it only once.
5. In Airbyte, enter your Zendesk email address and the API token.

For more information, see Zendesk's [API token documentation](https://developer.zendesk.com/api-reference/ticketing/introduction/#api-token).

#### OAuth2.0 (Legacy)

This method uses a manually generated OAuth access token. It supports backward compatibility for existing connections. For new connections, use OAuth2.0 instead. It handles token refresh automatically.

Follow Zendesk's [OAuth documentation](https://developer.zendesk.com/documentation/ticketing/working-with-oauth/creating-and-using-oauth-tokens-with-the-api/) to generate a legacy access token.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.4.29 | 2026-11-10 | [91770](https://github.com/airbytehq/airbyte/pull/91770) | Update dependencies |
| 0.4.28 | 2026-11-03 | [90826](https://github.com/airbytehq/airbyte/pull/90826) | Update dependencies |
| 0.4.27 | 2026-10-27 | [90080](https://github.com/airbytehq/airbyte/pull/90080) | Update dependencies |
| 0.4.26 | 2026-10-20 | [89483](https://github.com/airbytehq/airbyte/pull/89483) | Update dependencies |
| 0.4.25 | 2026-10-13 | [88868](https://github.com/airbytehq/airbyte/pull/88868) | Update dependencies |
| 0.4.24 | 2026-10-06 | [88094](https://github.com/airbytehq/airbyte/pull/88094) | Update dependencies |
| 0.4.23 | 2026-09-29 | [87407](https://github.com/airbytehq/airbyte/pull/87407) | Update dependencies |
| 0.4.22 | 2026-09-22 | [86869](https://github.com/airbytehq/airbyte/pull/86869) | Update dependencies |
| 0.4.21 | 2026-09-15 | [86302](https://github.com/airbytehq/airbyte/pull/86302) | Update dependencies |
| 0.4.20 | 2026-09-08 | [85716](https://github.com/airbytehq/airbyte/pull/85716) | Update dependencies |
| 0.4.19 | 2026-08-18 | [84820](https://github.com/airbytehq/airbyte/pull/84820) | Update dependencies |
| 0.4.18 | 2026-08-11 | [83815](https://github.com/airbytehq/airbyte/pull/83815) | Persist OAuth token expiry on initial authentication so the first sync no longer refreshes and rotates away the single-use refresh token |
| 0.4.17 | 2026-08-11 | [84171](https://github.com/airbytehq/airbyte/pull/84171) | Update dependencies |
| 0.4.16 | 2026-08-04 | [83672](https://github.com/airbytehq/airbyte/pull/83672) | Update dependencies |
| 0.4.15 | 2026-07-28 | [83184](https://github.com/airbytehq/airbyte/pull/83184) | Update dependencies |
| 0.4.14 | 2026-07-21 | [82657](https://github.com/airbytehq/airbyte/pull/82657) | Update dependencies |
| 0.4.13 | 2026-07-14 | [82071](https://github.com/airbytehq/airbyte/pull/82071) | Update dependencies |
| 0.4.12 | 2026-06-30 | [81325](https://github.com/airbytehq/airbyte/pull/81325) | Update dependencies |
| 0.4.11 | 2026-06-23 | [80707](https://github.com/airbytehq/airbyte/pull/80707) | Update dependencies |
| 0.4.10 | 2026-06-16 | [80099](https://github.com/airbytehq/airbyte/pull/80099) | Update dependencies |
| 0.4.9 | 2026-06-09 | [79571](https://github.com/airbytehq/airbyte/pull/79571) | Update dependencies |
| 0.4.8 | 2026-06-02 | [79055](https://github.com/airbytehq/airbyte/pull/79055) | Update dependencies |
| 0.4.7 | 2026-04-28 | [77479](https://github.com/airbytehq/airbyte/pull/77479) | Update dependencies |
| 0.4.6 | 2026-04-21 | [76833](https://github.com/airbytehq/airbyte/pull/76833) | Update dependencies |
| 0.4.5 | 2026-03-31 | [75875](https://github.com/airbytehq/airbyte/pull/75875) | Update dependencies |
| 0.4.4 | 2026-03-17 | [74393](https://github.com/airbytehq/airbyte/pull/74393) | Migrate to scopes object array format |
| 0.4.3 | 2026-03-17 | [75115](https://github.com/airbytehq/airbyte/pull/75115) | Update dependencies |
| 0.4.2 | 2026-02-24 | [73539](https://github.com/airbytehq/airbyte/pull/73539) | Update dependencies |
| 0.4.1 | 2026-02-10 | [72608](https://github.com/airbytehq/airbyte/pull/72608) | Update dependencies |
| 0.4.0 | 2026-02-03 | [71856](https://github.com/airbytehq/airbyte/pull/71856) | Add OAuth2.0 with refresh token support; Upgrade CDK version to 7.8.1 |
| 0.3.41 | 2026-01-20 | [72044](https://github.com/airbytehq/airbyte/pull/72044) | Update dependencies |
| 0.3.40 | 2026-01-14 | [71709](https://github.com/airbytehq/airbyte/pull/71709) | Update dependencies |
| 0.3.39 | 2025-12-18 | [70704](https://github.com/airbytehq/airbyte/pull/70704) | Update dependencies |
| 0.3.38 | 2025-11-25 | [70071](https://github.com/airbytehq/airbyte/pull/70071) | Update dependencies |
| 0.3.37 | 2025-11-18 | [69511](https://github.com/airbytehq/airbyte/pull/69511) | Update dependencies |
| 0.3.36 | 2025-10-29 | [68965](https://github.com/airbytehq/airbyte/pull/68965) | Update dependencies |
| 0.3.35 | 2025-10-21 | [68429](https://github.com/airbytehq/airbyte/pull/68429) | Update dependencies |
| 0.3.34 | 2025-10-14 | [68014](https://github.com/airbytehq/airbyte/pull/68014) | Update dependencies |
| 0.3.33 | 2025-10-07 | [67239](https://github.com/airbytehq/airbyte/pull/67239) | Update dependencies |
| 0.3.32 | 2025-09-30 | [66852](https://github.com/airbytehq/airbyte/pull/66852) | Update dependencies |
| 0.3.31 | 2025-09-24 | [66471](https://github.com/airbytehq/airbyte/pull/66471) | Update dependencies |
| 0.3.30 | 2025-09-09 | [65735](https://github.com/airbytehq/airbyte/pull/65735) | Update dependencies |
| 0.3.29 | 2025-08-24 | [65484](https://github.com/airbytehq/airbyte/pull/65484) | Update dependencies |
| 0.3.28 | 2025-08-10 | [64838](https://github.com/airbytehq/airbyte/pull/64838) | Update dependencies |
| 0.3.27 | 2025-08-02 | [64368](https://github.com/airbytehq/airbyte/pull/64368) | Update dependencies |
| 0.3.26 | 2025-07-26 | [64065](https://github.com/airbytehq/airbyte/pull/64065) | Update dependencies |
| 0.3.25 | 2025-07-19 | [63620](https://github.com/airbytehq/airbyte/pull/63620) | Update dependencies |
| 0.3.24 | 2025-07-12 | [63245](https://github.com/airbytehq/airbyte/pull/63245) | Update dependencies |
| 0.3.23 | 2025-07-05 | [62671](https://github.com/airbytehq/airbyte/pull/62671) | Update dependencies |
| 0.3.22 | 2025-06-28 | [62257](https://github.com/airbytehq/airbyte/pull/62257) | Update dependencies |
| 0.3.21 | 2025-06-21 | [61754](https://github.com/airbytehq/airbyte/pull/61754) | Update dependencies |
| 0.3.20 | 2025-06-15 | [61210](https://github.com/airbytehq/airbyte/pull/61210) | Update dependencies |
| 0.3.19 | 2025-05-24 | [59966](https://github.com/airbytehq/airbyte/pull/59966) | Update dependencies |
| 0.3.18 | 2025-05-04 | [59562](https://github.com/airbytehq/airbyte/pull/59562) | Update dependencies |
| 0.3.17 | 2025-04-26 | [58944](https://github.com/airbytehq/airbyte/pull/58944) | Update dependencies |
| 0.3.16 | 2025-04-19 | [58533](https://github.com/airbytehq/airbyte/pull/58533) | Update dependencies |
| 0.3.15 | 2025-04-13 | [58038](https://github.com/airbytehq/airbyte/pull/58038) | Update dependencies |
| 0.3.14 | 2025-04-05 | [57377](https://github.com/airbytehq/airbyte/pull/57377) | Update dependencies |
| 0.3.13 | 2025-03-29 | [56820](https://github.com/airbytehq/airbyte/pull/56820) | Update dependencies |
| 0.3.12 | 2025-03-22 | [56337](https://github.com/airbytehq/airbyte/pull/56337) | Update dependencies |
| 0.3.11 | 2025-03-09 | [55668](https://github.com/airbytehq/airbyte/pull/55668) | Update dependencies |
| 0.3.10 | 2025-03-01 | [55165](https://github.com/airbytehq/airbyte/pull/55165) | Update dependencies |
| 0.3.9 | 2025-02-23 | [54636](https://github.com/airbytehq/airbyte/pull/54636) | Update dependencies |
| 0.3.8 | 2025-02-15 | [54112](https://github.com/airbytehq/airbyte/pull/54112) | Update dependencies |
| 0.3.7 | 2025-02-08 | [53603](https://github.com/airbytehq/airbyte/pull/53603) | Update dependencies |
| 0.3.6 | 2025-02-01 | [52554](https://github.com/airbytehq/airbyte/pull/52554) | Update dependencies |
| 0.3.5 | 2025-01-18 | [51990](https://github.com/airbytehq/airbyte/pull/51990) | Update dependencies |
| 0.3.4 | 2025-01-11 | [51421](https://github.com/airbytehq/airbyte/pull/51421) | Update dependencies |
| 0.3.3 | 2024-12-28 | [50380](https://github.com/airbytehq/airbyte/pull/50380) | Update dependencies |
| 0.3.2 | 2024-12-14 | [49753](https://github.com/airbytehq/airbyte/pull/49753) | Update dependencies |
| 0.3.1 | 2024-12-12 | [49415](https://github.com/airbytehq/airbyte/pull/49415) | Update dependencies |
| 0.3.0 | 2024-10-31 | [47327](https://github.com/airbytehq/airbyte/pull/47327) | Migrate to Manifest-only |
| 0.2.26 | 2024-10-29 | [47802](https://github.com/airbytehq/airbyte/pull/47802) | Update dependencies |
| 0.2.25 | 2024-10-28 | [47066](https://github.com/airbytehq/airbyte/pull/47066) | Update dependencies |
| 0.2.24 | 2024-10-12 | [46784](https://github.com/airbytehq/airbyte/pull/46784) | Update dependencies |
| 0.2.23 | 2024-10-05 | [46486](https://github.com/airbytehq/airbyte/pull/46486) | Update dependencies |
| 0.2.22 | 2024-09-28 | [46102](https://github.com/airbytehq/airbyte/pull/46102) | Update dependencies |
| 0.2.21 | 2024-09-21 | [45769](https://github.com/airbytehq/airbyte/pull/45769) | Update dependencies |
| 0.2.20 | 2024-09-14 | [45546](https://github.com/airbytehq/airbyte/pull/45546) | Update dependencies |
| 0.2.19 | 2024-09-07 | [45298](https://github.com/airbytehq/airbyte/pull/45298) | Update dependencies |
| 0.2.18 | 2024-08-31 | [45008](https://github.com/airbytehq/airbyte/pull/45008) | Update dependencies |
| 0.2.17 | 2024-08-24 | [44720](https://github.com/airbytehq/airbyte/pull/44720) | Update dependencies |
| 0.2.16 | 2024-08-17 | [44219](https://github.com/airbytehq/airbyte/pull/44219) | Update dependencies |
| 0.2.15 | 2024-08-10 | [43502](https://github.com/airbytehq/airbyte/pull/43502) | Update dependencies |
| 0.2.14 | 2024-08-03 | [43246](https://github.com/airbytehq/airbyte/pull/43246) | Update dependencies |
| 0.2.13 | 2024-07-27 | [42604](https://github.com/airbytehq/airbyte/pull/42604) | Update dependencies |
| 0.2.12 | 2024-07-20 | [42371](https://github.com/airbytehq/airbyte/pull/42371) | Update dependencies |
| 0.2.11 | 2024-07-13 | [41880](https://github.com/airbytehq/airbyte/pull/41880) | Update dependencies |
| 0.2.10 | 2024-07-10 | [41496](https://github.com/airbytehq/airbyte/pull/41496) | Update dependencies |
| 0.2.9 | 2024-07-09 | [41205](https://github.com/airbytehq/airbyte/pull/41205) | Update dependencies |
| 0.2.8 | 2024-07-06 | [40850](https://github.com/airbytehq/airbyte/pull/40850) | Update dependencies |
| 0.2.7 | 2024-06-25 | [40443](https://github.com/airbytehq/airbyte/pull/40443) | Update dependencies |
| 0.2.6 | 2024-06-22 | [39956](https://github.com/airbytehq/airbyte/pull/39956) | Update dependencies |
| 0.2.5 | 2024-06-04 | [39058](https://github.com/airbytehq/airbyte/pull/39058) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.4 | 2024-04-19 | [37302](https://github.com/airbytehq/airbyte/pull/37302) | Updating to 0.80.0 CDK |
| 0.2.3 | 2024-04-18 | [37302](https://github.com/airbytehq/airbyte/pull/37302) | Manage dependencies with Poetry. |
| 0.2.2 | 2024-04-15 | [37302](https://github.com/airbytehq/airbyte/pull/37302) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.2.1 | 2024-04-12 | [37302](https://github.com/airbytehq/airbyte/pull/37302) | schema descriptions |
| 0.2.0 | 2023-08-22 | [29310](https://github.com/airbytehq/airbyte/pull/29310) | Migrate Python CDK to Low Code |
| 0.1.2 | 2023-08-15 | [7976](https://github.com/airbytehq/airbyte/pull/7976) | Fix schemas and tests |
| 0.1.1 | 2021-11-15 | [7976](https://github.com/airbytehq/airbyte/pull/7976) | Add oauth2.0 support |
| 0.1.0 | 2021-07-08 | [4359](https://github.com/airbytehq/airbyte/pull/4359) | Initial Release |

</details>
