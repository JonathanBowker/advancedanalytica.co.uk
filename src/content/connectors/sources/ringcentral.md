---
generated_record: true
connector_name: Ringcentral
connector_type: source
connector_slug: ringcentral
connector_directory: source-ringcentral
definition_id: 213d69b9-da66-419e-af29-c23142d4af5f
version: 0.2.23
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/ringcentral
logo: /images/connectors/sources/ringcentral.svg
logo_source_path: airbyte-integrations/connectors/source-ringcentral/icon.svg
logo_sha256: 3cac1f18184214a43f4c2aa492c2c3f3ec8d8d96e198eec2df6ca164e9f43090
original_metadata_path: airbyte-integrations/connectors/source-ringcentral/metadata.yaml
original_metadata_sha256: 8c8a1afd170ee9cc9b697f7bc9cc32cb01163eca224bd67fa01f867c5968cab8
original_document_path: docs/integrations/sources/ringcentral.md
original_document_sha256: 78132c94a868883aae1bcf7cbff3ad86620fe53068f2d022e4ec355ace9c8712
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8f9db85ecd9f02842bc74bcf2c88ecafbfb391eb50e759eb673dfd1bdbc42a04
rewritten_at: 2026-11-12T13:54:02.863156+00:00
---

# RingCentral

Use this page to set up and reference the [RingCentral](https://developers.ringcentral.com/api-reference/) source.

## Prerequisites

You need an auth token, account id and extension id for this connector. The auth token acts as a bearer token. Follow the bearer guidance to receive your account token (Bearer ref - https://developers.ringcentral.com/api-reference/authentication). The response from a basic API call using the ~ operator shows the account_id and extension id. Example: (https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/business-hours)

## Setup guide

### Step 1: Set up the RingCentral connection

- Get your bearer token by following the auth section (ref - https://developers.ringcentral.com/api-reference/authentication).
- Set up the parameters. All parameters are required.
- Available parameters:
  - auth_token: Received by following https://developers.ringcentral.com/api-reference/authentication
  - account_id: Shown in the response from a basic API call to an endpoint using the ~ operator. Example: (https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/business-hours)
  - extension_id: Shown in the response from a basic API call to an endpoint using the ~ operator. Example: (https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/business-hours)

## Step 2: Set up the RingCentral connector in Airbyte

### Airbyte Cloud

1. You need an [Log into your Airbyte Cloud](https://cloud.airbyte.io/workspaces) account.
2. In the left navigation bar, click **Sources**. Then, click **+new source** in the top-right corner.
3. On the Set up the source page, name the RingCentral connector. Select **RingCentral** from the Source type dropdown.
4. Enter your `auth_token, account_id, extension_id`.
5. Click **Set up source**.

### Airbyte OSS

1. Go to the Airbyte Open Source dashboard.
2. Set your source name.
3. Enter your `auth_token, account_id, extension_id`.
4. Click **Set up source**.

## Supported sync modes

The RingCentral source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- user_business_hours
- company_business_hours
- callblock_settings
- blocked_allowed_phonenumbers
- forwarding_numbers
- company_call_handling_rules
- user_call_records
- user_active_calls
- call_monitoring_groups
- call_queues
- call_record_settings
- greetings
- ivr_prompts
- fax_cover

## API method example

GET https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/business-hours

## Performance considerations

RingCentral [API reference](https://platform.ringcentral.com/restapi/v1.0) currently has v1. The connector uses v1 by default.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                       | Subject        |
| :------ | :--------- | :------------------------------------------------- | :------------- |
| 0.2.23 | 2026-10-07 | [88188](https://github.com/airbytehq/airbyte/pull/88188) | Switch base URL from the retired RingCentral developer sandbox (`platform.devtest.ringcentral.com`) to production (`platform.ringcentral.com`) |
| 0.2.22 | 2025-05-24 | [60537](https://github.com/airbytehq/airbyte/pull/60537) | Update dependencies |
| 0.2.21 | 2025-05-10 | [60159](https://github.com/airbytehq/airbyte/pull/60159) | Update dependencies |
| 0.2.20 | 2025-05-04 | [59640](https://github.com/airbytehq/airbyte/pull/59640) | Update dependencies |
| 0.2.19 | 2025-04-27 | [58396](https://github.com/airbytehq/airbyte/pull/58396) | Update dependencies |
| 0.2.18 | 2025-04-12 | [57968](https://github.com/airbytehq/airbyte/pull/57968) | Update dependencies |
| 0.2.17 | 2025-04-05 | [57359](https://github.com/airbytehq/airbyte/pull/57359) | Update dependencies |
| 0.2.16 | 2025-03-29 | [56772](https://github.com/airbytehq/airbyte/pull/56772) | Update dependencies |
| 0.2.15 | 2025-03-22 | [56231](https://github.com/airbytehq/airbyte/pull/56231) | Update dependencies |
| 0.2.14 | 2025-03-08 | [55050](https://github.com/airbytehq/airbyte/pull/55050) | Update dependencies |
| 0.2.13 | 2025-02-23 | [54554](https://github.com/airbytehq/airbyte/pull/54554) | Update dependencies |
| 0.2.12 | 2025-02-15 | [53968](https://github.com/airbytehq/airbyte/pull/53968) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53492](https://github.com/airbytehq/airbyte/pull/53492) | Update dependencies |
| 0.2.10 | 2025-02-01 | [52969](https://github.com/airbytehq/airbyte/pull/52969) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52517](https://github.com/airbytehq/airbyte/pull/52517) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51882](https://github.com/airbytehq/airbyte/pull/51882) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51353](https://github.com/airbytehq/airbyte/pull/51353) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50716](https://github.com/airbytehq/airbyte/pull/50716) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50298](https://github.com/airbytehq/airbyte/pull/50298) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49665](https://github.com/airbytehq/airbyte/pull/49665) | Update dependencies |
| 0.2.3 | 2024-12-12 | [49367](https://github.com/airbytehq/airbyte/pull/49367) | Update dependencies |
| 0.2.2 | 2024-12-11 | [49048](https://github.com/airbytehq/airbyte/pull/49048) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.1 | 2024-10-29 | [47611](https://github.com/airbytehq/airbyte/pull/47611) | Update dependencies |
| 0.2.0 | 2024-08-20 | [44448](https://github.com/airbytehq/airbyte/pull/44448) | Refactor connector to manifest-only format |
| 0.1.15 | 2024-08-17 | [44247](https://github.com/airbytehq/airbyte/pull/44247) | Update dependencies |
| 0.1.14 | 2024-08-12 | [43830](https://github.com/airbytehq/airbyte/pull/43830) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43662](https://github.com/airbytehq/airbyte/pull/43662) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43148](https://github.com/airbytehq/airbyte/pull/43148) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42591](https://github.com/airbytehq/airbyte/pull/42591) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42294](https://github.com/airbytehq/airbyte/pull/42294) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41891](https://github.com/airbytehq/airbyte/pull/41891) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41433](https://github.com/airbytehq/airbyte/pull/41433) | Update dependencies |
| 0.1.7 | 2024-07-10 | [41328](https://github.com/airbytehq/airbyte/pull/41328) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40973](https://github.com/airbytehq/airbyte/pull/40973) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40480](https://github.com/airbytehq/airbyte/pull/40480) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40054](https://github.com/airbytehq/airbyte/pull/40054) | Update dependencies |
| 0.1.3 | 2024-06-06 | [39111](https://github.com/airbytehq/airbyte/pull/39111) | Make compatible with builder |
| 0.1.2 | 2024-06-04 | [38937](https://github.com/airbytehq/airbyte/pull/38937) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-20 | [38382](https://github.com/airbytehq/airbyte/pull/38382) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2023-05-10 | [Init](https://github.com/airbytehq/airbyte/pull/) | Initial commit |

</details>
