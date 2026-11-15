---
generated_record: true
connector_name: Postmark App
connector_type: source
connector_slug: postmarkapp
connector_directory: source-postmarkapp
definition_id: cde75ca1-1e28-4a0f-85bb-90c546de9f1f
version: 0.2.10
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/postmarkapp
logo: /images/connectors/sources/postmarkapp.svg
logo_source_path: airbyte-integrations/connectors/source-postmarkapp/icon.svg
logo_sha256: 8725f68f4a90a4b8cb056699182ce057b024471d08a048cc2c194d5f1bc26697
original_metadata_path: airbyte-integrations/connectors/source-postmarkapp/metadata.yaml
original_metadata_sha256: 8ab451e17ae8736733049b2ef9310aeb2a9321b670f27fd93fdb049368dd8730
original_document_path: docs/integrations/sources/postmarkapp.md
original_document_sha256: 5ed58699bcda12c53bd94bdb03e2082acf6120660a53b7273655875dbe5c3153
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 2b8fadee9ed618fe99129086e8db679ac83ef0089f3ca289f44c2465870e1db7
rewritten_at: 2026-11-12T13:51:54.219514+00:00
---

# Postmarkapp

## Overview

Sync data from [Postmarkapp API](https://postmarkapp.com/developer) with the Postmarkapp source.

## Requirements

You need an API key to request and retrieve data from Postmarkapp. Find your API key in the [Postmarkapp dashboard](https://account.postmarkapp.com/servers/9708911/credentials).

## Streams

The following streams are currently supported:

Server-API

- [Bounces: Deliverystats](https://postmarkapp.com/developer/api/bounce-api#delivery-stats): Access all bounce reports for a specific server. Bounces remain available for 45 days after a bounce.
- [Message-Streams](https://postmarkapp.com/developer/api/message-streams-api#list-message-streams): Manage message streams for a specific server. A Server can have up to 10 Streams, including the default ones. You can't delete Default Streams. Each Server can have only 1 Inbound Stream.
- [Outbound stats](https://account.postmarkapp.com/servers/9708911/credentials): Get all outbound email statistics for a specific server. These statistics are stored permanently and don't expire. All stats use EST timezone.

Account-API

- [Servers](https://postmarkapp.com/developer/api/servers-api): Manage servers for a specific account.
- [Domains](https://postmarkapp.com/developer/api/domains-api): Get a list of domains, including each domain's overview and authentication status.
- [Sender signatures](https://postmarkapp.com/developer/api/signatures-api): Get a list of sender signatures, including brief details associated with your account.

## Setup guide

## Step 1: Set up Postmarkapp in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. Then click **+new source** in the top-right corner.
3. On the Set up the source page, select **Postmarkapp** from the Source type dropdown.
4. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Set your source name to Postmarkapp.
3. Click **Set up source**.

## Supported sync modes

The Postmarkapp source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| Namespaces        | No         |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.2.10 | 2025-02-15 | [53947](https://github.com/airbytehq/airbyte/pull/53947) | Update dependencies |
| 0.2.9 | 2025-02-08 | [53462](https://github.com/airbytehq/airbyte/pull/53462) | Update dependencies |
| 0.2.8 | 2025-02-01 | [52967](https://github.com/airbytehq/airbyte/pull/52967) | Update dependencies |
| 0.2.7 | 2025-01-25 | [51879](https://github.com/airbytehq/airbyte/pull/51879) | Update dependencies |
| 0.2.6 | 2025-01-11 | [51372](https://github.com/airbytehq/airbyte/pull/51372) | Update dependencies |
| 0.2.5 | 2024-12-28 | [50703](https://github.com/airbytehq/airbyte/pull/50703) | Update dependencies |
| 0.2.4 | 2024-12-21 | [50281](https://github.com/airbytehq/airbyte/pull/50281) | Update dependencies |
| 0.2.3 | 2024-12-14 | [49667](https://github.com/airbytehq/airbyte/pull/49667) | Update dependencies |
| 0.2.2 | 2024-12-12 | [49046](https://github.com/airbytehq/airbyte/pull/49046) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47539](https://github.com/airbytehq/airbyte/pull/47539) | Update dependencies |
| 0.2.0 | 2024-10-06 | [46522](https://github.com/airbytehq/airbyte/pull/46522) | Migrate to Manifest-only |
| 0.1.21 | 2024-10-05 | [46509](https://github.com/airbytehq/airbyte/pull/46509) | Update dependencies |
| 0.1.20 | 2024-09-28 | [45793](https://github.com/airbytehq/airbyte/pull/45793) | Update dependencies |
| 0.1.19 | 2024-09-14 | [45535](https://github.com/airbytehq/airbyte/pull/45535) | Update dependencies |
| 0.1.18 | 2024-09-07 | [45259](https://github.com/airbytehq/airbyte/pull/45259) | Update dependencies |
| 0.1.17 | 2024-08-31 | [44975](https://github.com/airbytehq/airbyte/pull/44975) | Update dependencies |
| 0.1.16 | 2024-08-24 | [44705](https://github.com/airbytehq/airbyte/pull/44705) | Update dependencies |
| 0.1.15 | 2024-08-17 | [44309](https://github.com/airbytehq/airbyte/pull/44309) | Update dependencies |
| 0.1.14 | 2024-08-10 | [43592](https://github.com/airbytehq/airbyte/pull/43592) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43265](https://github.com/airbytehq/airbyte/pull/43265) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42648](https://github.com/airbytehq/airbyte/pull/42648) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42190](https://github.com/airbytehq/airbyte/pull/42190) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41820](https://github.com/airbytehq/airbyte/pull/41820) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41564](https://github.com/airbytehq/airbyte/pull/41564) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41184](https://github.com/airbytehq/airbyte/pull/41184) | Update dependencies |
| 0.1.7 | 2024-07-06 | [40762](https://github.com/airbytehq/airbyte/pull/40762) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40483](https://github.com/airbytehq/airbyte/pull/40483) | Update dependencies |
| 0.1.5 | 2024-06-22 | [39970](https://github.com/airbytehq/airbyte/pull/39970) | Update dependencies |
| 0.1.4 | 2024-06-04 | [39062](https://github.com/airbytehq/airbyte/pull/39062) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.3 | 2024-04-19 | [37232](https://github.com/airbytehq/airbyte/pull/37232) | Upgrade to CDK 0.80.0 and manage dependencies with Poetry. |
| 0.1.2 | 2024-04-15 | [37232](https://github.com/airbytehq/airbyte/pull/37232) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.1 | 2024-04-12 | [37232](https://github.com/airbytehq/airbyte/pull/37232) | schema descriptions |
| 0.1.0   | 2022-11-09 | 18220                                                    | 🎉 New Source: Postmarkapp API [low-code CDK]                                   |

</details>
