---
generated_record: true
connector_name: Auth0
connector_type: source
connector_slug: auth0
connector_directory: source-auth0
definition_id: 6c504e48-14aa-4221-9a72-19cf5ff1ae78
version: 0.6.2
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/auth0
logo: /images/connectors/sources/auth0.svg
logo_source_path: airbyte-integrations/connectors/source-auth0/icon.svg
logo_sha256: db38bfe2b860eeabb8919c1e5f71c23fcc689b781f94c641939eb60cc67fd545
original_metadata_path: airbyte-integrations/connectors/source-auth0/metadata.yaml
original_metadata_sha256: ba36b96443d61a9825f6eed751b98c779d10a85a2ae5915119d2a1ee3c6c5d9d
original_document_path: docs/integrations/sources/auth0.md
original_document_sha256: 2ea43df135959a02020b2f1b9d1e36f35f3edecd03c1a815568fd739002629d0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9fe2c194e8452590bbf0736c5e2a5593dd6ff5fcae354b3aa9f22a880f6b0721
rewritten_at: 2026-11-12T14:05:12.036163+00:00
---

# Auth0

Auth0 provides flexible, drop-in authentication and authorisation services for your applications.

The source connector fetches data from [Auth0 Management API](https://auth0.com/docs/api/authentication#introduction).

## Prerequisites

- You have a free or paid Auth0 account.
- Follow [Setup guide](#setup-guide) to authorise Airbyte to read data from your account.

## Setup

### Step 1: Set up Auth0

1. Create an Auth0 account for free at [sign up an account](https://auth0.com/signup).
2. Confirm your Email.

### Step 2.1: Get a test access token

1. In Auth0, go to [the Api Explorer tab of your Auth0 Management API](https://manage.auth0.com/#/apis/management/explorer). Auth0 automatically generates and displays a token there.
2. Click **Copy Token**.
3. In Airbyte, choose **OAuth2 Access Token** from the **Authentication Method** menu. Paste the token into the **OAuth2 Access Token** text box.
4. Click **Save** to test the connection.
5. See [this documentation](https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-access-tokens-for-testing) for more details.

### Step 2.2: Create an OAuth2 app

1. For frequent scheduled calls in production, set up an OAuth2 integration. Airbyte can then generate the access token automatically.
2. In Auth0, go to [Dashboard > Applications > Applications](https://manage.auth0.com/?#/applications).
3. Create a new application named **Airbyte**. Choose the application type **Machine to Machine Applications**.
4. Select the Management API V2. This is the API you want to call from Airbyte.
5. Every M2M app accessing an API needs a set of permissions, or scopes. Only grant permissions beginning with `read`, such as _read:users_. Under [API doc](https://auth0.com/docs/api/management/v2#!/Users/get_users), each API lists its required scopes.
6. See [this documentation](https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-access-tokens-for-production) for more details.

## Supported sync modes

The Auth0 source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh
- Incremental

## Supported streams

- [Clients](https://auth0.com/docs/api/management/v2#!/Clients/get_clients)
- [Organizations](https://auth0.com/docs/api/management/v2#!/Organizations/get_organizations)
- [OrganizationMembers](https://auth0.com/docs/api/management/v2#!/Organizations/get_members)
- [OrganizationMemberRoles](https://auth0.com/docs/api/management/v2#!/Organizations/get_organization_member_roles)
- [Users](https://auth0.com/docs/api/management/v2#!/Users/get_users)
- [Clients](https://auth0.com/docs/api/management/v2/clients/get-clients)

## Performance considerations

Auth0 [rate limits](https://auth0.com/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/management-api-endpoint-rate-limits) restrict the connector.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                 |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------------------------------------- |
| 0.6.2 | 2024-10-29 | [47807](https://github.com/airbytehq/airbyte/pull/47807) | Update dependencies |
| 0.6.1 | 2024-10-28 | [47624](https://github.com/airbytehq/airbyte/pull/47624) | Update dependencies |
| 0.6.0 | 2024-08-23 | [44590](https://github.com/airbytehq/airbyte/pull/44590) | Refactor connector to manifest-only format |
| 0.5.16 | 2024-08-17 | [44211](https://github.com/airbytehq/airbyte/pull/44211) | Update dependencies |
| 0.5.15 | 2024-08-12 | [43746](https://github.com/airbytehq/airbyte/pull/43746) | Update dependencies |
| 0.5.14 | 2024-08-10 | [43490](https://github.com/airbytehq/airbyte/pull/43490) | Update dependencies |
| 0.5.13 | 2024-08-03 | [43250](https://github.com/airbytehq/airbyte/pull/43250) | Update dependencies |
| 0.5.12 | 2024-07-27 | [42794](https://github.com/airbytehq/airbyte/pull/42794) | Update dependencies |
| 0.5.11 | 2024-07-20 | [42171](https://github.com/airbytehq/airbyte/pull/42171) | Update dependencies |
| 0.5.10 | 2024-07-13 | [41899](https://github.com/airbytehq/airbyte/pull/41899) | Update dependencies |
| 0.5.9 | 2024-07-10 | [41417](https://github.com/airbytehq/airbyte/pull/41417) | Update dependencies |
| 0.5.8 | 2024-07-09 | [41320](https://github.com/airbytehq/airbyte/pull/41320) | Update dependencies |
| 0.5.7 | 2024-07-06 | [40840](https://github.com/airbytehq/airbyte/pull/40840) | Update dependencies |
| 0.5.6 | 2024-06-25 | [40344](https://github.com/airbytehq/airbyte/pull/40344) | Update dependencies |
| 0.5.5 | 2024-06-21 | [39933](https://github.com/airbytehq/airbyte/pull/39933) | Update dependencies |
| 0.5.4 | 2024-06-06 | [39194](https://github.com/airbytehq/airbyte/pull/39194) | [autopull] Upgrade base image to v1.2.2 |
| 0.5.3 | 2024-05-31 | [38513](https://github.com/airbytehq/airbyte/pull/38513) | Upgrade base image and update dependencies |
| 0.5.2 | 2024-05-02 | [37770](https://github.com/airbytehq/airbyte/pull/37770) | Add Selective Authenticator. Migrate to poetry |
| 0.5.1 | 2023-10-20 | [31643](https://github.com/airbytehq/airbyte/pull/31643) | Upgrade base image to airbyte/python-connector-base:1.1.0 |
| 0.5.0 | 2023-10-11 | [30467](https://github.com/airbytehq/airbyte/pull/30467) | Use Python base image |
| 0.4.1 | 2023-08-24 | [29804](https://github.com/airbytehq/airbyte/pull/29804) | Fix low code migration bugs |
| 0.4.0 | 2023-08-03 | [28972](https://github.com/airbytehq/airbyte/pull/28972) | Migrate to Low-Code CDK |
| 0.3.0 | 2023-06-20 | [29001](https://github.com/airbytehq/airbyte/pull/29001) | Add Organizations, OrganizationMembers, OrganizationMemberRoles streams |
| 0.2.0 | 2023-05-23 | [26445](https://github.com/airbytehq/airbyte/pull/26445) | Add Clients stream |
| 0.1.0 | 2022-10-21 | [18338](https://github.com/airbytehq/airbyte/pull/18338) | Add Auth0 and Users stream |

</details>
