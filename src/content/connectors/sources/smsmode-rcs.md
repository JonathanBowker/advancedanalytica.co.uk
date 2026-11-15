---
generated_record: true
connector_name: smsmode Rcs
connector_type: source
connector_slug: smsmode-rcs
connector_directory: source-smsmode-rcs
definition_id: 4f9c377f-a5a5-4979-a8b0-66ef044b691d
version: 0.0.8
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/smsmode-rcs
logo: /images/connectors/sources/smsmode-rcs.svg
logo_source_path: airbyte-integrations/connectors/source-smsmode-rcs/icon.svg
logo_sha256: f9a77d0d428b6a21e89ac1c67ad2f82aaf7dfad32a231e5757cebe979185c997
original_metadata_path: airbyte-integrations/connectors/source-smsmode-rcs/metadata.yaml
original_metadata_sha256: 976f633f33dcdcc47e3a3d2890a99c455ff60030abda6b8f6c515ef7ca27de72
original_document_path: docs/integrations/sources/smsmode-rcs.md
original_document_sha256: c8a7c0bf7994679bf1dba2a0803164a28670e586e735cc51bfba44e51ebe7251
rewrite_status: review
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 34d316649cb14d5eec31e7d2964737a75698685dcdb02639d21cc16ccee02178
rewritten_at: 2026-11-12T13:56:51.304455+00:00
---

# smsmode RCS

Sync RCS message logs and monthly consumption data from your [smsmode](https://www.smsmode.com/) account. The smsmode RCS source connector reads from [smsmode RCS API](https://dev.smsmode.com/rcs/v1/) and [smsmode Commons API](https://dev.smsmode.com/commons/v1/).

This connector reads RCS data only. To sync SMS data, use the [smsmode SMS](smsmode-sms) connector.

## Prerequisites

- A smsmode account with RCS enabled.
- A smsmode API key. See [Get your API key](#get-your-api-key).

## Setup

### Get your API key

The connector authenticates each request using an API key in the `X-Api-Key` header.

Create and manage API keys with the smsmode [Credential API](https://dev.smsmode.com/commons/v1/#tag/Credential). Each key has a role that determines which messages the connector can read:

- **User**: messages sent or received through the user's own channels.
- **Manager**: messages for the whole organisation.
- **Administrator**: messages for the organisation and its sub-organisations.

Create a key with a role covering every RCS channel you want to sync. You can revoke one key without affecting other account keys.

### Set up the connector

1. In the Airbyte UI, create a new source and select **smsmode RCS**.
2. Enter a name for the source.
3. Paste your smsmode API key into **API Key**.
4. Click **Set up source**.

## Supported sync modes

Both streams support **Full Refresh** only. They don't support incremental syncs.

Each sync returns a fixed lookback window: 30 days of messages and 12 months of consumption. A **Full Refresh | Overwrite** sync replaces older destination data with the latest window only. To retain a longer history, use **Full Refresh | Append** and deduplicate records in your destination.

## Supported streams

| Stream | Source endpoint | What it returns |
| --- | --- | --- |
| `rcs_messages` | [`GET /rcs/v1/messages`](https://dev.smsmode.com/rcs/v1/#tag/Message) | RCS message logs from the last 30 days, including both directions. |
| `consumptions_rcs` | [`GET /commons/v1/consumptions`](https://dev.smsmode.com/commons/v1/#tag/Consumption) | Monthly RCS consumption records for the last 12 months. |

### rcs_messages

Get message logs for a rolling 30-day window ending at sync time in UTC. You can't configure this window.

The connector requests each direction separately, then merges the results into one stream:

- **MT** (Mobile Terminated): messages your account sent to recipients.
- **MO** (Mobile Originated): messages recipients sent to your RCS agent.

Each record includes a `direction` field containing `MT` or `MO`. Use this field to distinguish the directions downstream.

The connector retries failed requests to this endpoint up to 5 times, using exponential backoff.

### consumptions_rcs

Get one RCS consumption record per month, starting 365 days before the sync date. The connector filters the Commons consumption endpoint to `periodType=MONTH` and `channel.type=RCS`. The results exclude daily breakdowns and SMS consumption.

## Limitations

- The connector fixes the message window at 30 days and the consumption window at 12 months. To backfill older data, export it directly from smsmode.
- Neither stream defines a primary key, so Airbyte can't deduplicate records for you.
- The connector pages through results in groups of 100 records. This is the maximum page size allowed by the smsmode API.
- smsmode doesn't publish rate limits for these endpoints.

## Reference

### Configuration

| Input | Type | Description | Default Value |
| --- | --- | --- | --- |
| `api_key` | `string` | API Key. Your smsmode API key, created with the [Credential API](https://dev.smsmode.com/commons/v1/#tag/Credential). | |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| --- | --- | --- | --- |
| 0.0.8 | 2026-11-10 | [91730](https://github.com/airbytehq/airbyte/pull/91730) | Update dependencies |
| 0.0.7 | 2026-11-03 | [90757](https://github.com/airbytehq/airbyte/pull/90757) | Update dependencies |
| 0.0.6 | 2026-10-20 | [89425](https://github.com/airbytehq/airbyte/pull/89425) | Update dependencies |
| 0.0.5 | 2026-10-13 | [88777](https://github.com/airbytehq/airbyte/pull/88777) | Update dependencies |
| 0.0.4 | 2026-10-06 | [88065](https://github.com/airbytehq/airbyte/pull/88065) | Update dependencies |
| 0.0.3 | 2026-09-29 | [87384](https://github.com/airbytehq/airbyte/pull/87384) | Update dependencies |
| 0.0.2 | 2026-09-22 | [86828](https://github.com/airbytehq/airbyte/pull/86828) | Update dependencies |
| 0.0.1 | 2026-09-16 | [79710](https://github.com/airbytehq/airbyte/pull/79710) | Initial release by [@CaladeTechnologies](https://github.com/CaladeTechnologies) via Connector Builder. Syncs a rolling 30-day window of `rcs_messages` across MT and MO directions, and monthly `consumptions_rcs`. |

</details>
