---
generated_record: true
connector_name: Twilio Taskrouter
connector_type: source
connector_slug: twilio-taskrouter
connector_directory: source-twilio-taskrouter
definition_id: 2446953b-b794-429b-a9b3-c821ba992a48
version: 0.2.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/twilio-taskrouter
logo: /images/connectors/sources/twilio-taskrouter.svg
logo_source_path: airbyte-integrations/connectors/source-twilio-taskrouter/icon.svg
logo_sha256: e99f829c635f826bb77ac4ae138797545465e5685c6aa224a49771c9a53b67f4
original_metadata_path: airbyte-integrations/connectors/source-twilio-taskrouter/metadata.yaml
original_metadata_sha256: 8c6074d846d7867447a584b3677e681366387d34c1cef4e7474c4fe866f69b9b
original_document_path: docs/integrations/sources/twilio-taskrouter.md
original_document_sha256: aad97a91b132a4df26fe1eea62eefc7cd469a0afa57bee72c590eb60636cecd2
rewrite_status: review
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: afa6a82d6b9246130836d7cdcc6f7e22c7ebe8907754041a2807294125fa0a9a
rewritten_at: 2026-11-12T13:59:27.931415+00:00
---

# Twilio Taskrouter

Use this page to set up the Twilio Taskrouter source connector and find reference information.

## Prerequisites

Twilio Taskrouter protects REST API requests with HTTP Basic authentication. Use your Twilio Account SID as the username and your Auth Token as the password. To access a specific workspace or its subresources, use your Workspace ID as the sid.

After creating a Twilio account, scroll down the console to find your Account SID and Auth Token on your [dashboard](https://www.twilio.com/user/account).
On the Explore Products page, find [Taskrouter](https://console.twilio.com/develop/explore) under Solutions. Select it to expand the sidebar panel, then select Workspaces to view your created workspaces. Each workspace has a unique ID, shown as SID, which gives you access to its streams.

For more details, see [docs](https://www.twilio.com/docs/taskrouter/api).

## Setup guide

## Step 1: Set up the Twilio Taskrouter connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, select **Sources**. In the top-right corner, select **+new source**.
3. On the Set up the source page, enter a name for the Twilio connector. Select **Twilio Taskrouter** from the Source/Destination type dropdown.
4. Enter your `account_sid`.
5. Enter your `auth_token`.
6. Select **Set up source**.

### Airbyte OSS

1. Open the Airbyte Open Source dashboard.
2. Enter a name for your source.
3. Enter your `account_sid`.
4. Enter your `auth_token`.
5. Select **Set up source**.

## Supported sync modes

The Twilio source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |

## Supported streams

- [Workspaces](https://www.twilio.com/docs/taskrouter/api/workspace)
- [All Workspaces](https://www.twilio.com/docs/taskrouter/api/workspace)
- [Workers](https://www.twilio.com/docs/taskrouter/api/worker)

## Performance considerations

The Twilio Taskrouter connector handles rate limits gracefully.
For more information, see [the Twilio docs for rate limitations](https://support.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests).

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.2.23 | 2026-11-09 | [91429](https://github.com/airbytehq/airbyte/pull/91429) | Upgrade to `source-declarative-manifest` 7.47.0 |
| 0.2.22 | 2026-10-27 | [78989](https://github.com/airbytehq/airbyte/pull/78989) | Update dependencies |
| 0.2.21 | 2025-05-24 | [60758](https://github.com/airbytehq/airbyte/pull/60758) | Update dependencies |
| 0.2.20 | 2025-05-10 | [59991](https://github.com/airbytehq/airbyte/pull/59991) | Update dependencies |
| 0.2.19 | 2025-05-04 | [59582](https://github.com/airbytehq/airbyte/pull/59582) | Update dependencies |
| 0.2.18 | 2025-04-27 | [58972](https://github.com/airbytehq/airbyte/pull/58972) | Update dependencies |
| 0.2.17 | 2025-04-19 | [58402](https://github.com/airbytehq/airbyte/pull/58402) | Update dependencies |
| 0.2.16 | 2025-04-12 | [58003](https://github.com/airbytehq/airbyte/pull/58003) | Update dependencies |
| 0.2.15 | 2025-04-05 | [57441](https://github.com/airbytehq/airbyte/pull/57441) | Update dependencies |
| 0.2.14 | 2025-03-29 | [56842](https://github.com/airbytehq/airbyte/pull/56842) | Update dependencies |
| 0.2.13 | 2025-03-22 | [56277](https://github.com/airbytehq/airbyte/pull/56277) | Update dependencies |
| 0.2.12 | 2025-03-08 | [55082](https://github.com/airbytehq/airbyte/pull/55082) | Update dependencies |
| 0.2.11 | 2025-02-22 | [54514](https://github.com/airbytehq/airbyte/pull/54514) | Update dependencies |
| 0.2.10 | 2025-02-15 | [54089](https://github.com/airbytehq/airbyte/pull/54089) | Update dependencies |
| 0.2.9 | 2025-02-08 | [53522](https://github.com/airbytehq/airbyte/pull/53522) | Update dependencies |
| 0.2.8 | 2025-02-01 | [53040](https://github.com/airbytehq/airbyte/pull/53040) | Update dependencies |
| 0.2.7 | 2025-01-25 | [52391](https://github.com/airbytehq/airbyte/pull/52391) | Update dependencies |
| 0.2.6 | 2025-01-18 | [52003](https://github.com/airbytehq/airbyte/pull/52003) | Update dependencies |
| 0.2.5 | 2025-01-11 | [51394](https://github.com/airbytehq/airbyte/pull/51394) | Update dependencies |
| 0.2.4 | 2024-12-28 | [50816](https://github.com/airbytehq/airbyte/pull/50816) | Update dependencies |
| 0.2.3 | 2024-12-21 | [50366](https://github.com/airbytehq/airbyte/pull/50366) | Update dependencies |
| 0.2.2 | 2024-12-14 | [49383](https://github.com/airbytehq/airbyte/pull/49383) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47458](https://github.com/airbytehq/airbyte/pull/47458) | Update dependencies |
| 0.2.0 | 2024-08-26 | [44776](https://github.com/airbytehq/airbyte/pull/44776) | Refactor connector to manifest-only format |
| 0.1.17 | 2024-08-24 | [44727](https://github.com/airbytehq/airbyte/pull/44727) | Update dependencies |
| 0.1.16 | 2024-08-17 | [44294](https://github.com/airbytehq/airbyte/pull/44294) | Update dependencies |
| 0.1.15 | 2024-08-10 | [43626](https://github.com/airbytehq/airbyte/pull/43626) | Update dependencies |
| 0.1.14 | 2024-08-03 | [43255](https://github.com/airbytehq/airbyte/pull/43255) | Update dependencies |
| 0.1.13 | 2024-07-27 | [42718](https://github.com/airbytehq/airbyte/pull/42718) | Update dependencies |
| 0.1.12 | 2024-07-20 | [42282](https://github.com/airbytehq/airbyte/pull/42282) | Update dependencies |
| 0.1.11 | 2024-07-13 | [41858](https://github.com/airbytehq/airbyte/pull/41858) | Update dependencies |
| 0.1.10 | 2024-07-10 | [41585](https://github.com/airbytehq/airbyte/pull/41585) | Update dependencies |
| 0.1.9 | 2024-07-09 | [41125](https://github.com/airbytehq/airbyte/pull/41125) | Update dependencies |
| 0.1.8 | 2024-07-06 | [40827](https://github.com/airbytehq/airbyte/pull/40827) | Update dependencies |
| 0.1.7 | 2024-06-25 | [40295](https://github.com/airbytehq/airbyte/pull/40295) | Update dependencies |
| 0.1.6 | 2024-06-22 | [39965](https://github.com/airbytehq/airbyte/pull/39965) | Update dependencies |
| 0.1.5 | 2024-06-10 | [38788](https://github.com/airbytehq/airbyte/pull/38788) | Make compatible with the builder |
| 0.1.4 | 2024-06-04 | [39067](https://github.com/airbytehq/airbyte/pull/39067) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.3 | 2024-04-19 | [37278](https://github.com/airbytehq/airbyte/pull/37278) | Upgrade to CDK 0.80.0 and manage dependencies with Poetry. |
| 0.1.2 | 2024-04-15 | [37278](https://github.com/airbytehq/airbyte/pull/37278) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.1 | 2024-04-12 | [37278](https://github.com/airbytehq/airbyte/pull/37278) | schema descriptions |
| 0.1.0 | 2022-11-18 | [18685](https://github.com/airbytehq/airbyte/pull/18685) | 🎉 New Source: Twilio Taskrouter API [low-code cdk] |

</details>
