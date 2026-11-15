---
generated_record: true
connector_name: Tyntec SMS
connector_type: source
connector_slug: tyntec-sms
connector_directory: source-tyntec-sms
definition_id: 3c0c3cd1-b3e0-464a-9090-d3ceb5f92346
version: 0.3.1
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/tyntec-sms
logo: /images/connectors/sources/tyntec-sms.svg
logo_source_path: airbyte-integrations/connectors/source-tyntec-sms/icon.svg
logo_sha256: 0a0fcd304a851c0d05a0662b7f552c4029e622d99945d3ab54ca9b0b298db881
original_metadata_path: airbyte-integrations/connectors/source-tyntec-sms/metadata.yaml
original_metadata_sha256: eab218d203e5f38b4ca2a78a753e7fb79d3d7667997c4ed2c80c4d02bd2ad153
original_document_path: docs/integrations/sources/tyntec-sms.md
original_document_sha256: c9aa0c44ee5239e9eaed6fb506d249236b108cd8dca51ff07201703a79e36dfb
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 40c75ea96df55164f26db5a57738f1a07c03f2f7090e67f73944d3c626f41261
rewritten_at: 2026-11-12T13:59:35.383069+00:00
---

# Tyntec SMS

Use this guide to set up and reference the [Tyntec SMS](https://api.tyntec.com/reference/sms/current.html) source connector.

The connector sends your configured SMS message through the tyntec SMS API. It then syncs the send result and delivery status.

:::warning
Each run sends real SMS messages, which tyntec charges to your account. The connection check sends one message. During a sync, each selected stream sends its own message. Selecting both streams sends two messages.
:::

## Prerequisites

- A tyntec account with access to the [tyntec Business Center](https://my.tyntec.com).
- A REST (web) gateway for SMS configured in the Business Center. tyntec requires a gateway before you can send SMS through the API. See tyntec's [SMS quick start](https://www.tyntec.com/helpcenter/docs/channels/sms/quick-start/).
- A tyntec API key.
- A sender ID and a recipient phone number. During a tyntec trial, you can only send SMS to verified phone numbers. You can verify, or whitelist, these numbers in the Business Center.

## Set up the connector

### Step 1: Get your tyntec API key

1. Log in to the [tyntec Business Center](https://my.tyntec.com).
2. In the left navigation menu, select **API Settings**.
3. Copy an existing API key or create a new one.

tyntec provides separate API keys for trial and live environments. Use the key for the environment you want to send messages from.

### Step 2: Set up the Tyntec SMS connector in Airbyte

1. In Airbyte, go to **Sources** and select **New source**.
2. Select **Tyntec SMS**.
3. Enter a name for the source.
4. For **Tyntec API Key**, enter the API key from Step 1.
5. For **SMS Message Recipient Phone**, enter the recipient's phone number in international format, such as `+4915112345678`.
6. For **SMS Message Sender Phone**, enter the sender ID. Use an international phone number or an alphanumeric sender ID with up to 11 characters. Some destination networks restrict the sender ID formats they accept.
7. For **SMS Message Body**, enter the message text. Airbyte marks this field as optional. However, tyntec's Send SMS endpoint requires a message, so you must enter a value.
8. Select **Set up source**. Airbyte tests the connection by sending the configured message.

## Supported sync modes

The Tyntec SMS source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |

## Supported streams

| Stream     | Endpoint | Description |
| :--------- | :------- | :---------- |
| `sms`      | [Send SMS (GET)](https://api.tyntec.com/reference/sms/current.html#sms-api-Send%20SMS%20(GET)) `GET /messaging/v1/sms` | Sends the configured message and returns one record with the send result, including `requestId`, message parts, and prices. |
| `messages` | [Read SMS status](https://api.tyntec.com/reference/sms/current.html#sms-api-Read%20SMS%20status) `GET /messaging/v1/messages/{requestId}` | Sends the configured message, then reads that message's delivery status by its `requestId`. |

Both streams use `requestId` as the primary key. The `messages` stream sends its own message instead of reusing the `sms` stream's message. Therefore, the streams return records with different `requestId` values.

Version 0.3.0 removed the `contacts`, `phones` and `registrations` streams. tyntec no longer serves the BYON (Bring Your Own Number) endpoints these streams used. See the [migration guide](tyntec-sms-migrations.md).

## Limitations

The connector can't read message history. It only returns data for messages sent during the current sync.

## IP allow list

If you use Airbyte Cloud with IP restrictions enabled, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your tyntec IP allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                   |
| :------ | :--------- | :------------------------------------------------------- | :------------------------ |
| 0.3.1 | 2026-11-09 | [91463](https://github.com/airbytehq/airbyte/pull/91463) | Upgrade base image to `source-declarative-manifest:7.47.0` |
| 0.3.0 | 2026-10-09 | [88337](https://github.com/airbytehq/airbyte/pull/88337) | Remove the `contacts`, `phones` and `registrations` streams (tyntec BYON endpoints return 404) and use the `sms` stream for the connection check |
| 0.2.25 | 2026-06-02 | [79035](https://github.com/airbytehq/airbyte/pull/79035) | Update dependencies |
| 0.2.24 | 2025-05-24 | [60738](https://github.com/airbytehq/airbyte/pull/60738) | Update dependencies |
| 0.2.23 | 2025-05-10 | [59956](https://github.com/airbytehq/airbyte/pull/59956) | Update dependencies |
| 0.2.22 | 2025-05-04 | [59537](https://github.com/airbytehq/airbyte/pull/59537) | Update dependencies |
| 0.2.21 | 2025-04-27 | [58985](https://github.com/airbytehq/airbyte/pull/58985) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58045](https://github.com/airbytehq/airbyte/pull/58045) | Update dependencies |
| 0.2.19 | 2025-04-05 | [57477](https://github.com/airbytehq/airbyte/pull/57477) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56294](https://github.com/airbytehq/airbyte/pull/56294) | Update dependencies |
| 0.2.17 | 2025-03-08 | [55636](https://github.com/airbytehq/airbyte/pull/55636) | Update dependencies |
| 0.2.16 | 2025-03-01 | [55151](https://github.com/airbytehq/airbyte/pull/55151) | Update dependencies |
| 0.2.15 | 2025-02-22 | [54512](https://github.com/airbytehq/airbyte/pull/54512) | Update dependencies |
| 0.2.14 | 2025-02-15 | [54061](https://github.com/airbytehq/airbyte/pull/54061) | Update dependencies |
| 0.2.13 | 2025-02-08 | [53567](https://github.com/airbytehq/airbyte/pull/53567) | Update dependencies |
| 0.2.12 | 2025-02-01 | [53063](https://github.com/airbytehq/airbyte/pull/53063) | Update dependencies |
| 0.2.11 | 2025-01-25 | [52385](https://github.com/airbytehq/airbyte/pull/52385) | Update dependencies |
| 0.2.10 | 2025-01-18 | [51961](https://github.com/airbytehq/airbyte/pull/51961) | Update dependencies |
| 0.2.9 | 2025-01-11 | [51439](https://github.com/airbytehq/airbyte/pull/51439) | Update dependencies |
| 0.2.8 | 2024-12-28 | [50783](https://github.com/airbytehq/airbyte/pull/50783) | Update dependencies |
| 0.2.7 | 2024-12-21 | [50364](https://github.com/airbytehq/airbyte/pull/50364) | Update dependencies |
| 0.2.6 | 2024-12-14 | [49793](https://github.com/airbytehq/airbyte/pull/49793) | Update dependencies |
| 0.2.5 | 2024-12-12 | [49431](https://github.com/airbytehq/airbyte/pull/49431) | Update dependencies |
| 0.2.4 | 2024-12-11 | [49110](https://github.com/airbytehq/airbyte/pull/49110) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.3 | 2024-11-04 | [47910](https://github.com/airbytehq/airbyte/pull/47910) | Update dependencies |
| 0.2.2 | 2024-10-28 | [43782](https://github.com/airbytehq/airbyte/pull/43782) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44054](https://github.com/airbytehq/airbyte/pull/44054) | Refactor connector to manifest-only format |
| 0.1.13 | 2024-08-10 | [43551](https://github.com/airbytehq/airbyte/pull/43551) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43221](https://github.com/airbytehq/airbyte/pull/43221) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42689](https://github.com/airbytehq/airbyte/pull/42689) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42209](https://github.com/airbytehq/airbyte/pull/42209) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41740](https://github.com/airbytehq/airbyte/pull/41740) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41364](https://github.com/airbytehq/airbyte/pull/41364) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41108](https://github.com/airbytehq/airbyte/pull/41108) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40804](https://github.com/airbytehq/airbyte/pull/40804) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40482](https://github.com/airbytehq/airbyte/pull/40482) | Update dependencies |
| 0.1.4 | 2024-06-22 | [39994](https://github.com/airbytehq/airbyte/pull/39994) | Update dependencies |
| 0.1.3 | 2024-06-05 | [38838](https://github.com/airbytehq/airbyte/pull/38838) | Make compatible with builder |
| 0.1.2 | 2024-06-04 | [39043](https://github.com/airbytehq/airbyte/pull/39043) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-21 | [38500](https://github.com/airbytehq/airbyte/pull/38500) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-11-02 | [18883](https://github.com/airbytehq/airbyte/pull/18883) | 🎉 New Source: Tyntec SMS |

</details>
