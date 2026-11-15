---
generated_record: true
connector_name: Goldcast
connector_type: source
connector_slug: goldcast
connector_directory: source-goldcast
definition_id: c2c25d04-9bb1-4171-8a7a-bb7cead8add0
version: 1.0.1
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/goldcast
logo: /images/connectors/sources/goldcast.svg
logo_source_path: airbyte-integrations/connectors/source-goldcast/icon.svg
logo_sha256: 65a98614d298f39de9618b5bdf3a0ff7ecfc3499c5b00f54d55228e020e8aa25
original_metadata_path: airbyte-integrations/connectors/source-goldcast/metadata.yaml
original_metadata_sha256: aec6bee8e08ae036b7a436b8e9ebf7156b8dddf44c5192e364159e182b10f906
original_document_path: docs/integrations/sources/goldcast.md
original_document_sha256: cdc08d82f67cfaa9d005dc04cd54fe92d0bf826020c53b21c5ee3818dbeee7e7
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3a9b387b7df90e307d8a596111ecd24376036d7bc1b50f413b3df2553247459c
rewritten_at: 2026-11-12T13:39:35.139528+00:00
---

# Goldcast

Use this guide to set up the Goldcast source connector and find reference information.

## Prerequisites

- A [Goldcast Pro plan](https://www.goldcast.io/pricing) or higher. The Starter plan doesn't allow API access.
- API tokens enabled for your Goldcast organisation. Goldcast disables tokens by default. If your plan includes API access, contact Goldcast support to enable them.
- A Goldcast API token. Follow [Goldcast's guide](https://help.goldcast.io/hc/en-us/articles/22931655725723-How-To-Create-an-API-Token-in-Goldcast) to create one in Goldcast Studio under **Settings** > **Tokens**. If your organisation uses Goldcast Teams, only organisation admins can create tokens. Goldcast shows the token value only once, so copy it when you create it. The token is case-sensitive.

## Set up Goldcast

<!-- env:cloud -->

### Airbyte Cloud

Set up Goldcast as a source in Airbyte Cloud:

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **Goldcast** from the available sources.
4. Enter a **Source name** of your choice.
5. Enter the **Access Key**, which is the API token you created in Goldcast.
6. Click **Set up source** and wait for the tests to finish.

<!-- /env:cloud -->

<!-- env:oss -->

### Airbyte Open Source

Set up Goldcast as a source in Airbyte Open Source:

1. Log in to your Airbyte Open Source account.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New source**.
3. Find and select **Goldcast** from the available sources.
4. Enter a **Source name** of your choice.
5. Enter the **Access Key**, which is the API token you created in Goldcast.
6. Click **Set up source** and wait for the tests to finish.

<!-- /env:oss -->

## Supported sync modes

The Goldcast source connector supports these [sync modes](/platform/using-airbyte/core-concepts/sync-modes/):

- [Full Refresh - Overwrite](/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite)
- [Full Refresh - Append](/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append)

Incremental modes aren't supported because the Goldcast API doesn't expose a cursor field that the connector can filter on. Examples include a modified-at timestamp.

## Supported streams

The Goldcast source connector can sync the following streams. See the [Goldcast API documentation](https://apidocs.goldcast.io/) for details about each endpoint.

| Stream | Description |
| :--- | :--- |
| [organizations](https://apidocs.goldcast.io/#tag/Organization/operation/List%20organization) | Your Goldcast organization and its workspace settings. |
| [events](https://apidocs.goldcast.io/#tag/Event/operation/List%20events) | All events of every type (webinars, conferences, and so on). |
| [event_members](https://apidocs.goldcast.io/#tag/Event-members/operation/List%20event%20members) | Registrants and attendees of each event. Child of `events`. See [The `props` field](#the-props-field-in-event_members). |
| [webinars](https://apidocs.goldcast.io/#tag/Webinars/operation/Retrieve%20webinars) | Webinar settings for each event. Child of `events`, limited to events whose type is `Webinar`. |
| [tracks](https://apidocs.goldcast.io/#tag/Tracks/operation/List%20tracks) | Tracks associated with your events. |
| [agenda_items](https://apidocs.goldcast.io/#tag/Agenda-item/operation/List%20agenda%20item) | Agenda items associated with your events. |
| [discussion_groups](https://apidocs.goldcast.io/#tag/Discussion-groups/operation/List%20discussion%20groups) | Discussion groups associated with your events. |

The connector requests list endpoints using `limit`/`offset` pagination, with 100 records per page. The `webinars` stream only includes webinar-type events. The Goldcast webinars endpoint returns an error for other event types.

### The `props` field in `event_members`

Each `event_members` record contains a `props` object with that registrant's registration form fields, such as UTM parameters or job title. Each Goldcast workspace can define its own registration fields. Therefore, the connector doesn't declare fixed properties within `props`. It syncs `props` as a schemaless object containing the fields your workspace collects.

Your destination determines how it stores `props`:

- Database and data lake destinations store `props` as one JSON value, with every field intact.
- S3 and GCS destinations writing Avro or Parquet files store `props` as a JSON string. Parse that string in your query engine to read individual fields. Don't address `props.<field>` as a nested column.

Before version 1.0.0, the connector declared eleven fixed fields within `props`. Avro and Parquet files silently dropped all other registration fields. If you're upgrading from an earlier version, see the [migration guide](goldcast-migrations).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version  | Date       | Pull Request                                             | Subject                                                                                                                              |
|:---------|:-----------|:---------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| 1.0.1 | 2026-11-09 | [91381](https://github.com/airbytehq/airbyte/pull/91381) | Upgrade base image to `source-declarative-manifest` 7.47.0 |
| 1.0.0 | 2026-09-15 | [82770](https://github.com/airbytehq/airbyte/pull/82770) | Make `event_members` `props` schemaless so every workspace-defined registration field is preserved on S3/GCS Avro and Parquet destinations; see the [migration guide](https://docs.airbyte.com/integrations/sources/goldcast-migrations) |
| 0.2.26 | 2026-08-20 | [83237](https://github.com/airbytehq/airbyte/pull/83237) | Fix connector broken by Goldcast's API changes: list streams now request `limit`/`offset` pagination and extract records from the `results` envelope, and the `webinars` stream is scoped to webinar-type events only to avoid errors on other event types |
| 0.2.25 | 2026-06-02 | [78729](https://github.com/airbytehq/airbyte/pull/78729) | Update dependencies |
| 0.2.24 | 2025-05-10 | [59909](https://github.com/airbytehq/airbyte/pull/59909) | Update dependencies |
| 0.2.23 | 2025-05-03 | [59258](https://github.com/airbytehq/airbyte/pull/59258) | Update dependencies |
| 0.2.22 | 2025-04-26 | [58791](https://github.com/airbytehq/airbyte/pull/58791) | Update dependencies |
| 0.2.21 | 2025-04-19 | [58182](https://github.com/airbytehq/airbyte/pull/58182) | Update dependencies |
| 0.2.20 | 2025-04-12 | [57670](https://github.com/airbytehq/airbyte/pull/57670) | Update dependencies |
| 0.2.19 | 2025-04-05 | [57206](https://github.com/airbytehq/airbyte/pull/57206) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56472](https://github.com/airbytehq/airbyte/pull/56472) | Update dependencies |
| 0.2.17 | 2025-03-22 | [55958](https://github.com/airbytehq/airbyte/pull/55958) | Update dependencies |
| 0.2.16 | 2025-03-08 | [55274](https://github.com/airbytehq/airbyte/pull/55274) | Update dependencies |
| 0.2.15 | 2025-03-01 | [54953](https://github.com/airbytehq/airbyte/pull/54953) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54439](https://github.com/airbytehq/airbyte/pull/54439) | Update dependencies |
| 0.2.13 | 2025-02-15 | [53762](https://github.com/airbytehq/airbyte/pull/53762) | Update dependencies |
| 0.2.12 | 2025-02-08 | [53338](https://github.com/airbytehq/airbyte/pull/53338) | Update dependencies |
| 0.2.11 | 2025-02-01 | [52838](https://github.com/airbytehq/airbyte/pull/52838) | Update dependencies |
| 0.2.10 | 2025-01-25 | [52325](https://github.com/airbytehq/airbyte/pull/52325) | Update dependencies |
| 0.2.9 | 2025-01-18 | [51636](https://github.com/airbytehq/airbyte/pull/51636) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51103](https://github.com/airbytehq/airbyte/pull/51103) | Update dependencies |
| 0.2.7 | 2024-12-28 | [50571](https://github.com/airbytehq/airbyte/pull/50571) | Update dependencies |
| 0.2.6 | 2024-12-21 | [49998](https://github.com/airbytehq/airbyte/pull/49998) | Update dependencies |
| 0.2.5 | 2024-12-14 | [49480](https://github.com/airbytehq/airbyte/pull/49480) | Update dependencies |
| 0.2.4 | 2024-12-12 | [49158](https://github.com/airbytehq/airbyte/pull/49158) | Update dependencies |
| 0.2.3 | 2024-11-04 | [48148](https://github.com/airbytehq/airbyte/pull/48148) | Update dependencies |
| 0.2.2 | 2024-10-29 | [47875](https://github.com/airbytehq/airbyte/pull/47875) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47533](https://github.com/airbytehq/airbyte/pull/47533) | Update dependencies |
| 0.2.0 | 2024-08-22 | [44568](https://github.com/airbytehq/airbyte/pull/44568) | Refactor connector to manifest-only format |
| 0.1.8 | 2024-08-12 | [43804](https://github.com/airbytehq/airbyte/pull/43804) | Update dependencies |
| 0.1.7 | 2024-08-10 | [43522](https://github.com/airbytehq/airbyte/pull/43522) | Update dependencies |
| 0.1.6 | 2024-08-03 | [43284](https://github.com/airbytehq/airbyte/pull/43284) | Update dependencies |
| 0.1.5 | 2024-07-27 | [42616](https://github.com/airbytehq/airbyte/pull/42616) | Update dependencies |
| 0.1.4 | 2024-07-20 | [42237](https://github.com/airbytehq/airbyte/pull/42237) | Update dependencies |
| 0.1.3 | 2024-07-13 | [41806](https://github.com/airbytehq/airbyte/pull/41806) | Update dependencies |
| 0.1.2 | 2024-07-10 | [41406](https://github.com/airbytehq/airbyte/pull/41406) | Update dependencies |
| 0.1.1 | 2024-07-09 | [41263](https://github.com/airbytehq/airbyte/pull/41263) | Update dependencies |
| 0.1.0 | 2024-06-26 | [38786](https://github.com/airbytehq/airbyte/pull/38786) | New Source: Goldcast |
</details>
