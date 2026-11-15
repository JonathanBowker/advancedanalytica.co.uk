---
generated_record: true
connector_name: Yotpo
connector_type: source
connector_slug: yotpo
connector_directory: source-yotpo
definition_id: 18139f00-b1ba-4971-8f80-8387b617cfd8
version: 0.2.16
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/yotpo
logo: /images/connectors/sources/yotpo.svg
logo_source_path: airbyte-integrations/connectors/source-yotpo/icon.svg
logo_sha256: e94f6104a63cf2066558554197a5346f0c790be574bbfcad6e46fc9160386020
original_metadata_path: airbyte-integrations/connectors/source-yotpo/metadata.yaml
original_metadata_sha256: d49e2a17c553ffa9e63b3836fe18a003f26d0a4d3db387dad517b7a59d5a2e83
original_document_path: docs/integrations/sources/yotpo.md
original_document_sha256: 3ef0fd88a43488bf33d4cf205d83cd2364f5061b944ea8543a3bfbb00a4f699e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d63ef5b48895c0cd8f6094edf3fb4bc5cdc30eae5b761c51b595d69c79ced413
rewritten_at: 2026-11-12T14:01:21.783545+00:00
---

# Yotpo

Use this page to set up the [Yotpo](https://apidocs.yotpo.com/reference/welcome) source connector and find reference information.

## Prerequisites

To set up the Yotpo source connector, you’ll need:

1. A Yotpo account with API access
2. Your Yotpo App Key, found in your Yotpo account settings
3. An Access Token generated from the Yotpo API

## Setup guide

### Step 1: Generate an Access Token

1. Get your App Key and API Secret to generate an access token
2. Find your App Key and API Secret in your [Yotpo account settings](https://settings.yotpo.com/#/general_settings)
3. Generate an access token using the [Yotpo authentication endpoint](https://apidocs.yotpo.com/reference/yotpo-authentication):
   ```
   POST https://api.yotpo.com/oauth/token
   ```
   Include these parameters:
   ```json
   {
     "client_id": "YOUR_APP_KEY",
     "client_secret": "YOUR_API_SECRET",
     "grant_type": "client_credentials"
   }
   ```
4. Store the returned access token securely. You’ll use it for all API calls.

### Step 2: Set up the Yotpo connector in Airbyte

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.io/workspaces) account
2. Select **Sources** from the left navigation bar. Then select **New Source** in the top-right corner
3. On the Set up the source page, name the Yotpo connector. Select **Yotpo** from the Source type dropdown
4. Enter these required parameters:
   - `access_token`: The access token generated in Step 1
   - `app_key`: Your Yotpo App Key
   - `start_date`: Your data sync start date (format: YYYY-MM-DDT00:00:00.000Z)
   - `email`: Your registered Yotpo email address
5. Select **Set up source**

#### Airbyte OSS

1. Go to the Airbyte Open Source dashboard
2. Name your source
3. Enter the required parameters described above
4. Select **Set up source**

## Supported sync modes

The Yotpo source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | Yes        |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

| Stream Name      | Description                                                  | Incremental | Notes |
|------------------|--------------------------------------------------------------|-------------|-------|
| email_analytics  | Retrieves aggregated data for email metrics                  | No          | Data is grouped by metrics and can be filtered by date range |
| raw_data         | Returns detailed data about every email sent from Yotpo      | No          | Includes email recipient, delivery status, open/click events |
| reviews          | Retrieves product reviews                                    | Yes         | Uses `created_at` as cursor field with a lookback window of 31 days |
| unsubscribers    | Lists users who have unsubscribed from emails                | No          | Limited to 5000 responses per request, requires pagination for larger datasets |
| webhooks         | Lists all webhooks created for the account                   | No          | Includes webhook URL and event type information |
| webhook_events   | Lists available webhook event types                          | No          | Includes event names and descriptions |

## Performance considerations

### Rate limits

- The Reviews endpoint allows 5,000 requests per minute for each app key
- For Reviews, query up to 100 reviews per request. The default is 10
- Review data has a retrieval delay of 1 hour

### Pagination

- The Reviews stream handles pagination automatically using page and count parameters
- If the Unsubscribers list exceeds 5000 email addresses, use the count and page parameters for pagination

## API method example

```
GET https://api.yotpo.com/v1/apps/{app_key}/reviews?utoken={access_token}
```

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                            | Subject        |
| :------ | :--------- | :------------------------------------------------------ | :------------- |
| 0.2.16 | 2025-10-21 | [68442](https://github.com/airbytehq/airbyte/pull/68442) | Update dependencies |
| 0.2.15 | 2025-10-14 | [68011](https://github.com/airbytehq/airbyte/pull/68011) | Update dependencies |
| 0.2.14 | 2025-10-07 | [67250](https://github.com/airbytehq/airbyte/pull/67250) | Update dependencies |
| 0.2.13 | 2025-09-30 | [66843](https://github.com/airbytehq/airbyte/pull/66843) | Update dependencies |
| 0.2.12 | 2025-09-24 | [66469](https://github.com/airbytehq/airbyte/pull/66469) | Update dependencies |
| 0.2.11 | 2025-09-09 | [65710](https://github.com/airbytehq/airbyte/pull/65710) | Update dependencies |
| 0.2.10 | 2025-08-24 | [65429](https://github.com/airbytehq/airbyte/pull/65429) | Update dependencies |
| 0.2.9 | 2025-08-10 | [64819](https://github.com/airbytehq/airbyte/pull/64819) | Update dependencies |
| 0.2.8 | 2025-08-02 | [64357](https://github.com/airbytehq/airbyte/pull/64357) | Update dependencies |
| 0.2.7 | 2025-07-26 | [64066](https://github.com/airbytehq/airbyte/pull/64066) | Update dependencies |
| 0.2.6 | 2025-07-19 | [63622](https://github.com/airbytehq/airbyte/pull/63622) | Update dependencies |
| 0.2.5 | 2025-07-12 | [63210](https://github.com/airbytehq/airbyte/pull/63210) | Update dependencies |
| 0.2.4 | 2025-07-05 | [62684](https://github.com/airbytehq/airbyte/pull/62684) | Update dependencies |
| 0.2.3 | 2025-06-28 | [62250](https://github.com/airbytehq/airbyte/pull/62250) | Update dependencies |
| 0.2.2 | 2025-06-21 | [61748](https://github.com/airbytehq/airbyte/pull/61748) | Update dependencies |
| 0.2.1 | 2025-06-15 | [47597](https://github.com/airbytehq/airbyte/pull/47597) | Update dependencies |
| 0.2.0 | 2024-08-26 | [44780](https://github.com/airbytehq/airbyte/pull/44780) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-24 | [44661](https://github.com/airbytehq/airbyte/pull/44661) | Update dependencies |
| 0.1.13 | 2024-08-17 | [44254](https://github.com/airbytehq/airbyte/pull/44254) | Update dependencies |
| 0.1.12 | 2024-08-12 | [43891](https://github.com/airbytehq/airbyte/pull/43891) | Update dependencies |
| 0.1.11 | 2024-08-10 | [43658](https://github.com/airbytehq/airbyte/pull/43658) | Update dependencies |
| 0.1.10 | 2024-08-03 | [43198](https://github.com/airbytehq/airbyte/pull/43198) | Update dependencies |
| 0.1.9 | 2024-07-27 | [42610](https://github.com/airbytehq/airbyte/pull/42610) | Update dependencies |
| 0.1.8 | 2024-07-20 | [42275](https://github.com/airbytehq/airbyte/pull/42275) | Update dependencies |
| 0.1.7 | 2024-07-13 | [41815](https://github.com/airbytehq/airbyte/pull/41815) | Update dependencies |
| 0.1.6 | 2024-07-10 | [41444](https://github.com/airbytehq/airbyte/pull/41444) | Update dependencies |
| 0.1.5 | 2024-07-09 | [41250](https://github.com/airbytehq/airbyte/pull/41250) | Update dependencies |
| 0.1.4 | 2024-07-06 | [40795](https://github.com/airbytehq/airbyte/pull/40795) | Update dependencies |
| 0.1.3 | 2024-06-25 | [40488](https://github.com/airbytehq/airbyte/pull/40488) | Update dependencies |
| 0.1.2 | 2024-06-21 | [39945](https://github.com/airbytehq/airbyte/pull/39945) | Update dependencies |
| 0.1.1 | 2024-05-20 | [38390](https://github.com/airbytehq/airbyte/pull/38390) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2023-04-14 | [Init](https://github.com/airbytehq/airbyte/pull/25532) | Initial commit |

</details>
