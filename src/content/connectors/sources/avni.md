---
generated_record: true
connector_name: Avni
connector_type: source
connector_slug: avni
connector_directory: source-avni
definition_id: 5d297ac7-355e-4a04-be75-a5e7e175fc4e
version: 0.1.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/avni
logo: /images/connectors/sources/avni.svg
logo_source_path: airbyte-integrations/connectors/source-avni/icon.svg
logo_sha256: 4ab44b624172c31eaec9b7d88e836509bd601c5c7fd1cdbf50ea9cb8d3492a8f
original_metadata_path: airbyte-integrations/connectors/source-avni/metadata.yaml
original_metadata_sha256: fbfc70acb7db783a50a8852325c2498cb2f2b21a775b15934a35f47539099356
original_document_path: docs/integrations/sources/avni.md
original_document_sha256: dc3e428730f0720117131cb42c5649da33b0d3b48b5327f922a0e32bf86d3f6f
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 1e21c82aa70d3d85a05beb47e7f1645addc9fbb3379032091451f9e07ea396fd
rewritten_at: 2026-11-12T13:30:42.067534+00:00
---

# Avni

Use this page to set up the Avni source connector and find reference information.

## Prerequisites

- Your Avni account username
- Your Avni account password

## Setup guide

### Step 1: Set up your Avni account

1. Sign up on [Avni](https://avniproject.org/) to create an account.
2. Create Forms for Subjects Registrations, Programs Enrolment and Program Encounter using Avni Web Console -> [Getting Started](https://avniproject.org/getting-started/)
3. Register Subjects and enrol them in Program using Avni Android Application [Here](https://play.google.com/store/apps/details?id=com.openchsclient&hl=en&gl=US)

### Step 2: Set up the Avni connector in Airbyte

**For Airbyte Open Source:**

1. Go to your local Airbyte page.
2. In the left navigation bar, click **Sources**. In the top-right corner, click **+ New Source**.
3. On the source setup page, select **Avni** from the Source type dropdown. Then enter a name for this connector.
4. Enter your Avni account **username** and **password**.
5. Enter **lastModifiedDateTime**. The connector returns all data updated since this time. Specify the value in "yyyy-MM-dd'T'HH:mm:ss.SSSz", for example, "2000-10-31T01:30:00.000Z". To fetch all data, set this parameter to any old date, such as the example date.
6. Click **Set up source**.

## Supported sync modes

The Avni source connector supports the following[ sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):
​

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental Sync - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- Recommended: [Incremental Sync - Append and Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped)

## Supported streams

The Avni source connector supports these streams:

- **Subjects Stream**: Provides details about registered subjects. You can retrieve information about subjects registered in the system.
- **Program Enrolment Stream**: Provides program enrolment data. You can retrieve information about subjects enrolled in programs.
- **Program Encounter Stream**: Provides data about encounters within programs. You can retrieve information about every encounter that has occurred within programs.
- **Subject Encounter Stream**: Provides data about subject encounters, excluding program encounters. You can retrieve information about encounters subjects have had outside program-encounter.

avirajsingh7 marked this conversation as resolved.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| 0.1.2 | 2026-10-06 | [88141](https://github.com/airbytehq/airbyte/pull/88141) | Migrate to manifest-only and replace the custom Cognito authenticator with declarative authentication; removes the boto3 dependency. |
| 0.1.5 | 2026-11-10 | [91344](https://github.com/airbytehq/airbyte/pull/91344) | Update dependencies |
| 0.1.4 | 2026-11-03 | [90466](https://github.com/airbytehq/airbyte/pull/90466) | Update dependencies |
| 0.1.3 | 2026-10-27 | [78581](https://github.com/airbytehq/airbyte/pull/78581) | Update dependencies |
| 0.1.1 | 2025-02-26 | [54696](https://github.com/airbytehq/airbyte/pull/54696) | Update requests-mock version |
| 0.1.0 | 2023-09-07 | [30222](https://github.com/airbytehq/airbyte/pull/30222) | Avni Source Connector |

</details>
