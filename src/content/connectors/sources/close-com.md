---
generated_record: true
connector_name: Close.com
connector_type: source
connector_slug: close-com
connector_directory: source-close-com
definition_id: dfffecb7-9a13-43e9-acdc-b92af7997ca9
version: 0.6.16
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/sources/close-com
logo: /images/connectors/sources/close-com.svg
logo_source_path: airbyte-integrations/connectors/source-close-com/icon.svg
logo_sha256: 06b63852a57b6ad8ca47c05ff78b2fe58d335f6cf272033f0a97f33b5c2484f9
original_metadata_path: airbyte-integrations/connectors/source-close-com/metadata.yaml
original_metadata_sha256: 84aa1060a3485b51c40633d8d98543b15bd98e7f9dc7f0a88716138fb172217e
original_document_path: docs/integrations/sources/close-com.md
original_document_sha256: 1b6ee397c59250d0c619857f417714571013693ef77c6002cc955b8520aff007
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: af59a9d54fa01f0ca8675622aeb443f3e48479a8bdf9abd211f1e22794e2c751
rewritten_at: 2026-11-12T13:34:10.713891+00:00
---

# Close.com

Use this page to set up the [Close.com](https://www.close.com/) source connector and find reference information.

## Prerequisites

- Close.com API Key

Create a restricted key specifically for Airbyte access. This lets you control which resources Airbyte can access. For simpler setup, use read permissions for every resource. Then choose which resources to replicate in the Airbyte UI.

## Setup guide

### Step 1: Set up your Close.com API Key

1. [Log in to your Close.com](https://www.close.com) account.
2. At the bottom of the left navbar, select **Settings**.
3. In the left menu, select **Developer**.
4. At the top of the page, click **+ New API Key**.

:::caution
For security, the API Key appears only once, when you create it. Copy it and store it securely.
:::

For more information about creating and maintaining Close.com API keys, see the
[official documentation](https://help.close.com/docs/api-keys-oauth).

### Step 2: Set up the Close.com connector in Airbyte

1. [Log in to your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account, or go to the Airbyte Open Source dashboard.
2. In the Airbyte UI, click **Sources**, then **+ New Source**. Select **Close.com** from the available sources.
3. Enter your chosen **Source name**.
4. In the **API Key** field, enter your Close.com **API Key**.
5. _Optional_: In the **Replication Start Date** field, enter the earliest date for the data you want to replicate. Use this format: `YYYY-MM-DD`. Leave this field blank to replicate all data.
6. Click **Set up source** and wait for the tests to finish.

## Supported sync modes

The Close.com source supports **Full Refresh** and **Incremental** syncs. You can copy only new or updated data, or every row in the tables and columns selected for replication. These settings apply whenever a sync runs.

## Supported streams

You can sync these core streams:

- [Leads](https://developer.close.com/#leads) \(Incremental\)
- [Created Activities](https://developer.close.com/#activities-list-or-filter-all-created-activities) \(Incremental\)
- [Opportunity Status Change Activities](https://developer.close.com/#activities-list-or-filter-all-opportunitystatuschange-activities) \(Incremental\)
- [Note Activities](https://developer.close.com/#activities-list-or-filter-all-note-activities) \(Incremental\)
- [Meeting Activities](https://developer.close.com/#activities-list-or-filter-all-meeting-activities) \(Incremental\)
- [Call Activities](https://developer.close.com/#activities-list-or-filter-all-call-activities) \(Incremental\)
- [Email Activities](https://developer.close.com/#activities-list-or-filter-all-email-activities) \(Incremental\)
- [Email Thread Activities](https://developer.close.com/#activities-list-or-filter-all-emailthread-activities) \(Incremental\)
- [Lead Status Change Activities](https://developer.close.com/#activities-list-or-filter-all-leadstatuschange-activities) \(Incremental\)
- [SMS Activities](https://developer.close.com/#activities-list-or-filter-all-sms-activities) \(Incremental\)
- [Task Completed Activities](https://developer.close.com/#activities-list-or-filter-all-taskcompleted-activities) \(Incremental\)
- [Lead Tasks](https://developer.close.com/#tasks) \(Incremental\)
- [Incoming Email Tasks](https://developer.close.com/#tasks) \(Incremental\)
- [Email Followup Tasks](https://developer.close.com/#tasks) \(Incremental\)
- [Missed Call Tasks](https://developer.close.com/#tasks) \(Incremental\)
- [Answered Detached Call Tasks](https://developer.close.com/#tasks) \(Incremental\)
- [Voicemail Tasks](https://developer.close.com/#tasks) \(Incremental\)
- [Opportunity Due Tasks](https://developer.close.com/#tasks) \(Incremental\)
- [Incoming SMS Tasks](https://developer.close.com/#tasks) \(Incremental\)
- [Events](https://developer.close.com/#event-log) \(Incremental\)
- [Lead Custom Fields](https://developer.close.com/#custom-fields-list-all-the-lead-custom-fields-for-your-organization)
- [Contact Custom Fields](https://developer.close.com/#custom-fields-list-all-the-contact-custom-fields-for-your-organization)
- [Opportunity Custom Fields](https://developer.close.com/#custom-fields-list-all-the-opportunity-custom-fields-for-your-organization)
- [Activity Custom Fields](https://developer.close.com/#custom-fields-list-all-the-activity-custom-fields-for-your-organization)
- [Users](https://developer.close.com/#users)
- [Contacts](https://developer.close.com/#contacts)
- [Opportunities](https://developer.close.com/#opportunities) \(Incremental\)
- [Roles](https://developer.close.com/#roles)
- [Lead Statuses](https://developer.close.com/#lead-statuses)
- [Opportunity Statuses](https://developer.close.com/#opportunity-statuses)
- [Pipelines](https://developer.close.com/#pipelines)
- [Email Templates](https://developer.close.com/#email-templates)
- [Google Connected Accounts](https://developer.close.com/#connected-accounts)
- [Custom Email Connected Accounts](https://developer.close.com/#connected-accounts)
- [Zoom Connected Accounts](https://developer.close.com/#connected-accounts)
- [Send As](https://developer.close.com/#send-as)
- [Email Sequences](https://developer.close.com/#email-sequences)
- [Dialer](https://developer.close.com/#dialer)
- [Smart Views](https://developer.close.com/#smart-views)
- [Email Bulk Actions](https://developer.close.com/#bulk-actions-list-bulk-emails)
- [Sequence Subscription Bulk Actions](https://developer.close.com/#bulk-actions-list-bulk-sequence-subscriptions)
- [Delete Bulk Actions](https://developer.close.com/#bulk-actions-list-bulk-deletes)
- [Edit Bulk Actions](https://developer.close.com/#bulk-actions-list-bulk-edits)
- [Integration Links](https://developer.close.com/#integration-links)
- [Custom Activities](https://developer.close.com/#custom-activities)

### Notes

Leads and Events Incremental streams use the `date_updated` field as their cursor. All other Incremental streams use the `date_created` field.

The `SendAs` stream requires payment.

### Data type mapping

The [Close.com API](https://developer.close.com/) uses the same [JSONSchema](https://json-schema.org/understanding-json-schema/reference/index.html) types as Airbyte: `string`, `date-time`, `object`, `array`, `boolean`, `integer`, and `number`. This source therefore requires no type conversions.

### Performance considerations

The Close.com connector has rate limits. For more information,
see [click here](https://developer.close.com/topics/rate-limits/).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                |
| :------ |:-----------| :------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| 0.6.16 | 2026-11-09 | [91327](https://github.com/airbytehq/airbyte/pull/91327) | Upgrade to source-declarative-manifest 7.47.0 (Airbyte CDK 7) |
| 0.6.15 | 2025-05-10 | [59969](https://github.com/airbytehq/airbyte/pull/59969) | Update dependencies |
| 0.6.14 | 2025-05-03 | [59433](https://github.com/airbytehq/airbyte/pull/59433) | Update dependencies |
| 0.6.13 | 2025-04-26 | [58896](https://github.com/airbytehq/airbyte/pull/58896) | Update dependencies |
| 0.6.12 | 2025-04-19 | [58308](https://github.com/airbytehq/airbyte/pull/58308) | Update dependencies |
| 0.6.11 | 2025-04-12 | [57797](https://github.com/airbytehq/airbyte/pull/57797) | Update dependencies |
| 0.6.10 | 2025-04-05 | [57247](https://github.com/airbytehq/airbyte/pull/57247) | Update dependencies |
| 0.6.9 | 2025-03-29 | [56484](https://github.com/airbytehq/airbyte/pull/56484) | Update dependencies |
| 0.6.8 | 2025-03-22 | [55989](https://github.com/airbytehq/airbyte/pull/55989) | Update dependencies |
| 0.6.7 | 2025-03-08 | [55343](https://github.com/airbytehq/airbyte/pull/55343) | Update dependencies |
| 0.6.6 | 2025-03-01 | [54454](https://github.com/airbytehq/airbyte/pull/54454) | Update dependencies |
| 0.6.5 | 2025-02-15 | [53747](https://github.com/airbytehq/airbyte/pull/53747) | Update dependencies |
| 0.6.4 | 2025-02-08 | [53329](https://github.com/airbytehq/airbyte/pull/53329) | Update dependencies |
| 0.6.3 | 2025-02-01 | [52940](https://github.com/airbytehq/airbyte/pull/52940) | Update dependencies |
| 0.6.2 | 2025-01-25 | [52306](https://github.com/airbytehq/airbyte/pull/52306) | Update dependencies |
| 0.6.1 | 2025-01-18 | [51625](https://github.com/airbytehq/airbyte/pull/51625) | Update dependencies |
| 0.6.0 | 2025-01-16 | [50431](https://github.com/airbytehq/airbyte/pull/50431) | Migrate to manifest-only |
| 0.5.30 | 2025-01-11 | [51119](https://github.com/airbytehq/airbyte/pull/51119) | Update dependencies |
| 0.5.29 | 2025-01-04 | [50920](https://github.com/airbytehq/airbyte/pull/50920) | Update dependencies |
| 0.5.28 | 2024-12-28 | [50532](https://github.com/airbytehq/airbyte/pull/50532) | Update dependencies |
| 0.5.27 | 2024-12-21 | [50065](https://github.com/airbytehq/airbyte/pull/50065) | Update dependencies |
| 0.5.26 | 2024-12-14 | [48918](https://github.com/airbytehq/airbyte/pull/48918) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.5.25 | 2024-11-04 | [47933](https://github.com/airbytehq/airbyte/pull/47933) | Update dependencies |
| 0.5.24 | 2024-10-21 | [47047](https://github.com/airbytehq/airbyte/pull/47047) | Update dependencies |
| 0.5.23 | 2024-10-12 | [46803](https://github.com/airbytehq/airbyte/pull/46803) | Update dependencies |
| 0.5.22 | 2024-10-05 | [46449](https://github.com/airbytehq/airbyte/pull/46449) | Update dependencies |
| 0.5.21 | 2024-09-28 | [46116](https://github.com/airbytehq/airbyte/pull/46116) | Update dependencies |
| 0.5.20 | 2024-09-21 | [45738](https://github.com/airbytehq/airbyte/pull/45738) | Update dependencies |
| 0.5.19 | 2024-09-14 | [45483](https://github.com/airbytehq/airbyte/pull/45483) | Update dependencies |
| 0.5.18 | 2024-09-07 | [45300](https://github.com/airbytehq/airbyte/pull/45300) | Update dependencies |
| 0.5.17 | 2024-08-31 | [44976](https://github.com/airbytehq/airbyte/pull/44976) | Update dependencies |
| 0.5.16 | 2024-08-24 | [44651](https://github.com/airbytehq/airbyte/pull/44651) | Update dependencies |
| 0.5.15 | 2024-08-17 | [44305](https://github.com/airbytehq/airbyte/pull/44305) | Update dependencies |
| 0.5.14 | 2024-08-12 | [43877](https://github.com/airbytehq/airbyte/pull/43877) | Update dependencies |
| 0.5.13 | 2024-08-10 | [43574](https://github.com/airbytehq/airbyte/pull/43574) | Update dependencies |
| 0.5.12 | 2024-08-03 | [43296](https://github.com/airbytehq/airbyte/pull/43296) | Update dependencies |
| 0.5.11 | 2024-07-27 | [42639](https://github.com/airbytehq/airbyte/pull/42639) | Update dependencies |
| 0.5.10 | 2024-07-20 | [42318](https://github.com/airbytehq/airbyte/pull/42318) | Update dependencies |
| 0.5.9 | 2024-07-13 | [41896](https://github.com/airbytehq/airbyte/pull/41896) | Update dependencies |
| 0.5.8 | 2024-07-10 | [40515](https://github.com/airbytehq/airbyte/pull/40515) | Add support for array type custom fields |
| 0.5.7 | 2024-07-10 | [41374](https://github.com/airbytehq/airbyte/pull/41374) | Update dependencies |
| 0.5.6 | 2024-07-09 | [41313](https://github.com/airbytehq/airbyte/pull/41313) | Update dependencies |
| 0.5.5 | 2024-07-06 | [40994](https://github.com/airbytehq/airbyte/pull/40994) | Update dependencies |
| 0.5.4 | 2024-06-25 | [40350](https://github.com/airbytehq/airbyte/pull/40350) | Update dependencies |
| 0.5.3 | 2024-06-22 | [40043](https://github.com/airbytehq/airbyte/pull/40043) | Update dependencies |
| 0.5.2 | 2024-06-15 | [39477](https://github.com/airbytehq/airbyte/pull/39477) | Format source, delete requirements.txt |
| 0.5.1 | 2024-05-20 | [38391](https://github.com/airbytehq/airbyte/pull/38391) | [autopull] base image + poetry + up_to_date |
| 0.5.0 | 2023-11-30 | [32984](https://github.com/airbytehq/airbyte/pull/32984) | Add support for custom fields |
| 0.4.3 | 2023-10-28 | [31534](https://github.com/airbytehq/airbyte/pull/31534) | Fixed Email Activities Stream Pagination |
| 0.4.2 | 2023-08-08 | [29206](https://github.com/airbytehq/airbyte/pull/29206) | Fixed the issue with `DatePicker` format for `start date` |
| 0.4.1 | 2023-07-04 | [27950](https://github.com/airbytehq/airbyte/pull/27950) | Add human readable titles to API Key and Start Date fields |
| 0.4.0 | 2023-06-27 | [27776](https://github.com/airbytehq/airbyte/pull/27776) | Update the `Email Followup Tasks` stream schema |
| 0.3.0 | 2023-05-12 | [26024](https://github.com/airbytehq/airbyte/pull/26024) | Update the `Email sequences` stream schema |
| 0.2.2 | 2023-05-05 | [25868](https://github.com/airbytehq/airbyte/pull/25868) | Added `CDK TypeTransformer` to gurantee JSON Schema types, added missing properties for `roles` stream |
| 0.2.1 | 2023-02-15 | [23074](https://github.com/airbytehq/airbyte/pull/23074) | Specified date formatting in specification |
| 0.2.0 | 2022-11-04 | [18968](https://github.com/airbytehq/airbyte/pull/18968) | Migrate to Low-Code |
| 0.1.0 | 2021-08-10 | [5366](https://github.com/airbytehq/airbyte/pull/5366) | Initial release of Close.com connector for Airbyte |

</details>
