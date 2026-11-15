---
generated_record: true
connector_name: TalkDesk Explore
connector_type: source
connector_slug: talkdesk-explore
connector_directory: source-talkdesk-explore
definition_id: f00d2cf4-3c28-499a-ba93-b50b6f26359e
version: 0.1.0
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/talkdesk-explore
logo: /images/connectors/sources/talkdesk-explore.svg
logo_source_path: airbyte-integrations/connectors/source-talkdesk-explore/icon.svg
logo_sha256: 157b0202b5c36d8089292e9ac2bbb27e904dfc82daee8b0691271e136922f4c0
original_metadata_path: airbyte-integrations/connectors/source-talkdesk-explore/metadata.yaml
original_metadata_sha256: c3b82d19b6efab9a46a3cb085dc63cbac51ce4d1fa506cf76f9b17cf34b477b1
original_document_path: docs/integrations/sources/talkdesk-explore.md
original_document_sha256: c93f62c3515566568af92482b0bef893512643c78ceec1a55575ed22a59a3ba6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d0533c5b0309187bcab159d7831f50afb18fb35b775a3b98afeee83c3aa02c4a
rewritten_at: 2026-11-12T13:58:10.169490+00:00
---

# Talkdesk Explore

:::warning

## Deprecation notice

The Talkdesk Explore source connector is scheduled for deprecation on March 5th, 2024. It’s incompatible with upcoming platform updates for the launch of Airbyte 1.0. After deprecation, it won’t be supported or available in Airbyte.

This connector doesn’t support new per-stream features needed to protect data integrity during Airbyte synchronisation. Without these features, Airbyte can’t enforce its reliability and correctness standards for data syncing operations.

### Recommended action

To continue syncing data from this connector, consider creating a custom connector. For guidance, visit [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

## Overview

Talkdesk is software for contact centre operations.

The Talkdesk Explore connector uses the [Talkdesk Explore API](https://docs.talkdesk.com/docs/explore-api) to fetch data from usage reports.

### Output schema

The connector supports Full Refresh and Incremental on these streams:

- [Calls Report](https://docs.talkdesk.com/docs/calls-report)
- [User Status Report](https://docs.talkdesk.com/docs/user-status-explore)
- [Studio Flow Execution Report](https://docs.talkdesk.com/docs/studio-flow-execution-report)
- [Contacts Report](https://docs.talkdesk.com/docs/contacts-report)
- [Ring Attempts Report](https://docs.talkdesk.com/docs/ring-attempts-report)

### Report generation

Before requesting data from an endpoint, you need to generate a report. Send a POST request with the report specifications as its payload. The response provides a report ID. Use this ID in a GET request to retrieve the report’s data.

For more details about this process, see [Executing a Report](https://docs.talkdesk.com/docs/executing-a-report).

### Features

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | Yes        |
| Incremental - Dedupe Sync | No         |
| SSL connection            | Yes        |

### Performance considerations

The Explore API has an account-based quota of 15 simultaneous reports, including executing and enqueued reports. If you exceed this limit, you’ll receive a 429 (too many requests) response.

## Get started

### Requirements

- Talkdesk account
- Talkdesk API key (`Client Credentials` auth method)

### Setup

Follow the [getting started with the API](https://docs.talkdesk.com/docs/api-access) guide.

## IP allow list

If you use Airbyte Cloud with access restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request | Subject                      |
| ------- | ---------- | ------------ | ---------------------------- |
| 0.1.0   | 2022-02-07 |              | New Source: Talkdesk Explore |
| :---    | :---       | :---         | :---                         |

</details>
