---
generated_record: true
connector_name: Plaid
connector_type: source
connector_slug: plaid
connector_directory: source-plaid
definition_id: ed799e2b-2158-4c66-8da4-b40fe63bc72a
version: 0.5.14
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/plaid
logo: /images/connectors/sources/plaid.svg
logo_source_path: airbyte-integrations/connectors/source-plaid/icon.svg
logo_sha256: 5791bd1cdf71ffa38dfa04056ff198fd958ff876873ead5991573d99b623d72d
original_metadata_path: airbyte-integrations/connectors/source-plaid/metadata.yaml
original_metadata_sha256: 4e9ed29b539c7cd9ee7ad86281016dd5acccb938d0b33aa19e574c55b9e6d058
original_document_path: docs/integrations/sources/plaid.md
original_document_sha256: c78167ffb8f232a3213aa5267473bca81ef9b831756d4ba3c0821c8f71dbc173
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a7dfa008a6a59927e6f449a71f8c19e8d52452012a03f52e9aa4fd8d33403914
rewritten_at: 2026-11-12T13:51:22.770458+00:00
---

# Plaid

## Overview

The Plaid source supports Full Refresh syncs. It currently retrieves data only from the balances endpoint. Support for other data streams, such as transactions, is coming soon.

### Output schema

Available output streams:

- [Balance](https://plaid.com/docs/api/products/#balance)

### Features

| Feature                       | Supported?  |
| :---------------------------- | :---------- |
| Full Refresh Sync             | Yes         |
| Incremental - Append Sync     | Coming soon |
| Replicate Incremental Deletes | Coming soon |
| SSL connection                | Yes         |
| Namespaces                    | No          |

### Performance

The Plaid connector shouldn't encounter Stripe API limitations during normal use. If rate limit issues aren't automatically retried successfully, please [create an issue](https://github.com/airbytehq/airbyte/issues).

## Get started

### Requirements

- Plaid Account \(with client_id and API key\)
- Access Token

### Sandbox setup

Follow this guide to create the credentials needed to run this source in a new Plaid account's sandbox. For production use, consider Plaid's Link functionality [here](https://plaid.com/docs/api/tokens/#linktokencreate)

- **Create a Plaid account** Go to the [plaid website](https://plaid.com/) and select "Get API Keys". Follow the instructions to create an account.
- **Get Client id and API key** Go to the [keys page](https://dashboard.plaid.com/team/keys) to find the client id and your Sandbox API Key. In the UI, this key is called "Sandbox".
- **Create an Access Token** First, create a public token key. You can then create an access token.

  - **Create public key** Make the API call described in [plaid docs](https://plaid.com/docs/api/sandbox/#sandboxpublic_tokencreate).

    ```bash
      curl --location --request POST 'https://sandbox.plaid.com/sandbox/public_token/create' \
          --header 'Content-Type: application/json;charset=UTF-16' \
          --data-raw '{
              "client_id": "<your-client-id>",
              "secret": "<your-sandbox-api-key>",
              "institution_id": "ins_127287",
              "initial_products": ["auth", "transactions"]
          }'
    ```

  - **Exchange public key for access token** Make the API call described in [plaid docs](https://plaid.com/docs/api/tokens/#itempublic_tokenexchange). Use the public token returned by the previous request. This request returns an `access_token`, the final field needed to configure this source.

    ```bash
    curl --location --request POST 'https://sandbox.plaid.com/item/public_token/exchange' \
      --header 'Content-Type: application/json;charset=UTF-16' \
      --data-raw '{
          "client_id": "<your-client-id>",
          "secret": "<your-sandbox-api-key>",
          "public_token": "<public-token-returned-by-previous-request>"
      }'
    ```

- You now have everything needed to configure this source in the UI.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                       |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------ |
| 0.5.14 | 2025-05-10 | [60070](https://github.com/airbytehq/airbyte/pull/60070) | Update dependencies |
| 0.5.13 | 2025-05-03 | [59498](https://github.com/airbytehq/airbyte/pull/59498) | Update dependencies |
| 0.5.12 | 2025-04-27 | [59039](https://github.com/airbytehq/airbyte/pull/59039) | Update dependencies |
| 0.5.11 | 2025-04-19 | [58455](https://github.com/airbytehq/airbyte/pull/58455) | Update dependencies |
| 0.5.10 | 2025-04-12 | [57876](https://github.com/airbytehq/airbyte/pull/57876) | Update dependencies |
| 0.5.9 | 2025-04-05 | [57333](https://github.com/airbytehq/airbyte/pull/57333) | Update dependencies |
| 0.5.8 | 2025-03-29 | [56804](https://github.com/airbytehq/airbyte/pull/56804) | Update dependencies |
| 0.5.7 | 2025-03-22 | [56173](https://github.com/airbytehq/airbyte/pull/56173) | Update dependencies |
| 0.5.6 | 2025-03-08 | [55535](https://github.com/airbytehq/airbyte/pull/55535) | Update dependencies |
| 0.5.5 | 2025-03-01 | [55004](https://github.com/airbytehq/airbyte/pull/55004) | Update dependencies |
| 0.5.4 | 2025-02-23 | [54575](https://github.com/airbytehq/airbyte/pull/54575) | Update dependencies |
| 0.5.3 | 2025-02-15 | [53973](https://github.com/airbytehq/airbyte/pull/53973) | Update dependencies |
| 0.5.2 | 2025-02-08 | [47502](https://github.com/airbytehq/airbyte/pull/47502) | Update dependencies |
| 0.5.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.5.0 | 2024-08-14 | [44086](https://github.com/airbytehq/airbyte/pull/44086) | Refactor connector to manifest-only format |
| 0.4.13 | 2024-08-12 | [43861](https://github.com/airbytehq/airbyte/pull/43861) | Update dependencies |
| 0.4.12 | 2024-08-10 | [43663](https://github.com/airbytehq/airbyte/pull/43663) | Update dependencies |
| 0.4.11 | 2024-08-03 | [43239](https://github.com/airbytehq/airbyte/pull/43239) | Update dependencies |
| 0.4.10 | 2024-07-27 | [42686](https://github.com/airbytehq/airbyte/pull/42686) | Update dependencies |
| 0.4.9 | 2024-07-20 | [42230](https://github.com/airbytehq/airbyte/pull/42230) | Update dependencies |
| 0.4.8 | 2024-07-13 | [41730](https://github.com/airbytehq/airbyte/pull/41730) | Update dependencies |
| 0.4.7 | 2024-07-10 | [41412](https://github.com/airbytehq/airbyte/pull/41412) | Update dependencies |
| 0.4.6 | 2024-07-09 | [41235](https://github.com/airbytehq/airbyte/pull/41235) | Update dependencies |
| 0.4.5 | 2024-07-06 | [41007](https://github.com/airbytehq/airbyte/pull/41007) | Update dependencies |
| 0.4.4 | 2024-06-25 | [40379](https://github.com/airbytehq/airbyte/pull/40379) | Update dependencies |
| 0.4.3 | 2024-06-22 | [40147](https://github.com/airbytehq/airbyte/pull/40147) | Update dependencies |
| 0.4.2 | 2024-06-04 | [38963](https://github.com/airbytehq/airbyte/pull/38963) | [autopull] Upgrade base image to v1.2.1 |
| 0.4.1 | 2024-05-31 | [38810](https://github.com/airbytehq/airbyte/pull/38810) | [autopull] Migrate to base image and poetry |
| 0.4.0 | 2023-08-17 | [29127](https://github.com/airbytehq/airbyte/pull/29127) | Rewrote connector to no-code SDK |
| 0.3.2 | 2022-08-02 | [15231](https://github.com/airbytehq/airbyte/pull/15231) | Added min_last_updated_datetime support for Capital One items |
| 0.3.1 | 2022-03-31 | [11104](https://github.com/airbytehq/airbyte/pull/11104) | Fix 100 record limit and added start_date |
| 0.3.0 | 2022-01-05 | [7977](https://github.com/airbytehq/airbyte/pull/7977) | Migrate to Python CDK + add transaction stream |

</details>
