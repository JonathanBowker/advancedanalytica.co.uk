---
generated_record: true
connector_name: Merge
connector_type: source
connector_slug: merge
connector_directory: source-merge
definition_id: 23240e9e-d14a-43bc-899f-72ea304d1994
version: 0.2.27
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/merge
logo: /images/connectors/sources/merge.svg
logo_source_path: airbyte-integrations/connectors/source-merge/icon.svg
logo_sha256: 1f75001d856fa9daf9eae9835a3fefbc050a8e9eb64f5defde2e753168965584
original_metadata_path: airbyte-integrations/connectors/source-merge/metadata.yaml
original_metadata_sha256: fc8b5d66bd2aa65fd6a1870b05e82551d5bdd25f19ded4c6246ba60490269525
original_document_path: docs/integrations/sources/merge.md
original_document_sha256: ca587ea6a8fe998b4b4d89d06be86e2c41a09ffd6af31f2d102d44b661cd94f6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4192327a77c0810670cbf1544765df5e67d308d9d86b74cdcb2480b0599760b5
rewritten_at: 2026-11-12T13:46:41.707894+00:00
---

# Merge

This page explains how to set up the [Merge](https://docs.merge.dev/ats/overview/) source and provides reference information.

## Prerequisites

You need an Access Token, which acts as a bearer token, and linked account tokens. Find them in settings (Bearer ref - https://app.merge.dev/keys) and (Account token ref - https://app.merge.dev/keys).

## Setup guide

### Step 1: Set up your Merge connection

- Link your other integrations using account credentials in the accounts section (ref - https://app.merge.dev/linked-accounts/accounts).
- Get your bearer token from the keys section (ref - https://app.merge.dev/keys).
- Enter all parameters. Each parameter is required.
- Available parameters:
  - account_token: Linked account token shown in the linked account section after integration
  - api_token: Bearer token shown in the keys section. Use production keys where possible
  - start_date: Date filter for eligible streams
- Enable Common Model Scopes for the models you want to sync for the Linked Account (ref - https://help.merge.dev/en/articles/5950052-common-model-and-field-scopes). Streams with a disabled Scope return HTTP 403. They're skipped with a warning instead of failing the sync.

## Step 2: Set up the Merge connector in Airbyte

### Airbyte Cloud

1. Have a [Log into your Airbyte Cloud](https://cloud.airbyte.io/workspaces) account.
2. In the left navigation bar, click **Sources**. Then, in the top-right corner, click **+new source**.
3. On the Set up the source page, name the merge connector. Select **Merge** from the Source type dropdown.
4. Enter your `account_token, api_token and start_date`.
5. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Name your source.
3. Enter your `account_token, api_token and start_date`.
4. Click **Set up source**.

## Supported sync modes

The Merge source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- account_details
- activities
- applications
- attachments
- candidates
- departments
- eeocs
- interviews
- job-interview-stages
- jobs
- offers
- offices
- sync_status
- users

## API method example

GET https://api.merge.dev/api/ats/v1/account-details

## Performance considerations

Merge [API reference](https://api.merge.dev/api/ats/v1/) currently has v1. The connector uses v1 by default.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access by IP, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                       | Subject        |
| :------ | :--------- | :------------------------------------------------- | :------------- |
| 0.2.27 | 2026-11-09 | [91390](https://github.com/airbytehq/airbyte/pull/91390) | Upgrade base image to `source-declarative-manifest:7.47.0` |
| 0.2.26 | 2026-10-13 | [78834](https://github.com/airbytehq/airbyte/pull/78834) | Update dependencies |
| 0.2.25 | 2026-10-07 | [88273](https://github.com/airbytehq/airbyte/pull/88273) | Fix pagination: send the `next` cursor as the `cursor` query parameter (was appended to the URL path, causing 404s on multi-page streams) and request `page_size=100`; skip (instead of failing on) streams whose Common Model Scope is disabled for the Linked Account (HTTP 403) |
| 0.2.24 | 2025-05-24 | [60605](https://github.com/airbytehq/airbyte/pull/60605) | Update dependencies |
| 0.2.23 | 2025-05-10 | [59794](https://github.com/airbytehq/airbyte/pull/59794) | Update dependencies |
| 0.2.22 | 2025-05-03 | [59229](https://github.com/airbytehq/airbyte/pull/59229) | Update dependencies |
| 0.2.21 | 2025-04-26 | [58819](https://github.com/airbytehq/airbyte/pull/58819) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58225](https://github.com/airbytehq/airbyte/pull/58225) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57679](https://github.com/airbytehq/airbyte/pull/57679) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57085](https://github.com/airbytehq/airbyte/pull/57085) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56706](https://github.com/airbytehq/airbyte/pull/56706) | Update dependencies |
| 0.2.16 | 2025-03-22 | [56049](https://github.com/airbytehq/airbyte/pull/56049) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55468](https://github.com/airbytehq/airbyte/pull/55468) | Update dependencies |
| 0.2.14 | 2025-03-01 | [54825](https://github.com/airbytehq/airbyte/pull/54825) | Update dependencies |
| 0.2.13 | 2025-02-22 | [54301](https://github.com/airbytehq/airbyte/pull/54301) | Update dependencies |
| 0.2.12 | 2025-02-15 | [53802](https://github.com/airbytehq/airbyte/pull/53802) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53274](https://github.com/airbytehq/airbyte/pull/53274) | Update dependencies |
| 0.2.10 | 2025-02-01 | [52715](https://github.com/airbytehq/airbyte/pull/52715) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52234](https://github.com/airbytehq/airbyte/pull/52234) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51822](https://github.com/airbytehq/airbyte/pull/51822) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51221](https://github.com/airbytehq/airbyte/pull/51221) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50627](https://github.com/airbytehq/airbyte/pull/50627) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50092](https://github.com/airbytehq/airbyte/pull/50092) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49652](https://github.com/airbytehq/airbyte/pull/49652) | Update dependencies |
| 0.2.3 | 2024-12-12 | [49222](https://github.com/airbytehq/airbyte/pull/49222) | Update dependencies |
| 0.2.2 | 2024-12-11 | [47906](https://github.com/airbytehq/airbyte/pull/47906) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.1 | 2024-10-28 | [47593](https://github.com/airbytehq/airbyte/pull/47593) | Update dependencies |
| 0.2.0 | 2024-08-26 | [44768](https://github.com/airbytehq/airbyte/pull/44768) | Refactor connector to manifest-only format |
| 0.1.15 | 2024-08-24 | [44665](https://github.com/airbytehq/airbyte/pull/44665) | Update dependencies |
| 0.1.14 | 2024-08-17 | [44297](https://github.com/airbytehq/airbyte/pull/44297) | Update dependencies |
| 0.1.13 | 2024-08-12 | [43778](https://github.com/airbytehq/airbyte/pull/43778) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43661](https://github.com/airbytehq/airbyte/pull/43661) | Update dependencies |
| 0.1.11 | 2024-08-03 | [43074](https://github.com/airbytehq/airbyte/pull/43074) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42645](https://github.com/airbytehq/airbyte/pull/42645) | Update dependencies |
| 0.1.9 | 2024-07-20 | [42313](https://github.com/airbytehq/airbyte/pull/42313) | Update dependencies |
| 0.1.8 | 2024-07-13 | [41862](https://github.com/airbytehq/airbyte/pull/41862) | Update dependencies |
| 0.1.7 | 2024-07-10 | [41572](https://github.com/airbytehq/airbyte/pull/41572) | Update dependencies |
| 0.1.6 | 2024-07-09 | [41246](https://github.com/airbytehq/airbyte/pull/41246) | Update dependencies |
| 0.1.5 | 2024-07-06 | [40932](https://github.com/airbytehq/airbyte/pull/40932) | Update dependencies |
| 0.1.4 | 2024-06-25 | [40272](https://github.com/airbytehq/airbyte/pull/40272) | Update dependencies |
| 0.1.3 | 2024-06-22 | [40163](https://github.com/airbytehq/airbyte/pull/40163) | Update dependencies |
| 0.1.2 | 2024-06-06 | [39238](https://github.com/airbytehq/airbyte/pull/39238) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-20 | [38445](https://github.com/airbytehq/airbyte/pull/38445) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2023-04-18 | [Init](https://github.com/airbytehq/airbyte/pull/) | Initial commit |

</details>
