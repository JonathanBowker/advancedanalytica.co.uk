---
generated_record: true
connector_name: Microsoft Teams
connector_type: source
connector_slug: microsoft-teams
connector_directory: source-microsoft-teams
definition_id: eaf50f04-21dd-4620-913b-2a83f5635227
version: 1.2.37
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/microsoft-teams
logo: /images/connectors/sources/microsoft-teams.svg
logo_source_path: airbyte-integrations/connectors/source-microsoft-teams/icon.svg
logo_sha256: 95fa9fdc623c3f38bff1a173e0c8cd59b9395bdc7b1ca7d27f69566cd428e080
original_metadata_path: airbyte-integrations/connectors/source-microsoft-teams/metadata.yaml
original_metadata_sha256: 20bdf6509d6fab5db38308c49198c198c6780f6c615be850b0051a8dd69d59dc
original_document_path: docs/integrations/sources/microsoft-teams.md
original_document_sha256: 47eb609a474977362eb1e3e13e653c5627851893d2000e99ce8f1ad436c9769c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9bb91e7e08705c56e96d60402df3a8acfe6005500447886dec4200f5ffd99c84
rewritten_at: 2026-11-12T13:47:25.094301+00:00
---

# Microsoft Teams

## Sync overview

Sync Microsoft Graph API data to work with [Microsoft Teams](https://docs.microsoft.com/en-us/graph/teams-concept-overview).

[Microsoft Graph REST APIs](https://docs.microsoft.com/en-us/graph/versioning-and-support) currently has two versions: v1.0 and beta. The beta version includes new or enhanced APIs that are still in preview. Preview APIs can change and may break existing scenarios without notice. Production dependencies on APIs in the beta endpoint aren't recommended. This Source Connector is based on a [API v1.0](https://docs.microsoft.com/en-us/graph/api/resources/teams-api-overview?view=graph-rest-1.0).

### Output schema

This Source can sync the following core Streams:

- [users](https://docs.microsoft.com/en-us/graph/api/user-list?view=graph-rest-beta&tabs=http)
- [groups](https://docs.microsoft.com/en-us/graph/teams-list-all-teams?context=graph%2Fapi%2F1.0&view=graph-rest-1.0)
- [group_members](https://docs.microsoft.com/en-us/graph/api/group-list-members?view=graph-rest-1.0&tabs=http)
- [group_owners](https://docs.microsoft.com/en-us/graph/api/group-list-owners?view=graph-rest-1.0&tabs=http)
- [channels](https://docs.microsoft.com/en-us/graph/api/channel-list?view=graph-rest-1.0&tabs=http)
- [channel_members](https://docs.microsoft.com/en-us/graph/api/channel-list-members?view=graph-rest-1.0&tabs=http)
- [channel_tabs](https://docs.microsoft.com/en-us/graph/api/channel-list-tabs?view=graph-rest-1.0&tabs=http)
- [conversations](https://docs.microsoft.com/en-us/graph/api/group-list-conversations?view=graph-rest-beta&tabs=http)
- [conversation_threads](https://docs.microsoft.com/en-us/graph/api/conversation-list-threads?view=graph-rest-beta&tabs=http)
- [conversation_posts](https://docs.microsoft.com/en-us/graph/api/conversationthread-list-posts?view=graph-rest-beta&tabs=http)
- [team_drives](https://docs.microsoft.com/en-us/graph/api/drive-get?view=graph-rest-beta&tabs=http#get-the-document-library-associated-with-a-group)
- [team_device_usage_report](https://docs.microsoft.com/en-us/graph/api/reportroot-getteamsdeviceusageuserdetail?view=graph-rest-1.0)

If you'd like Airbyte to support more endpoints, please [create an issue.](https://github.com/airbytehq/airbyte/issues/new/choose)

Some APIs aren't supported in v1.0, including channel messages and channel message replies.

### Data type mapping

| Integration Type | Airbyte Type                 |
| :--------------- | :--------------------------- |
| `string`         | `string`                     |
| `number`         | `number`                     |
| `date`           | `date`                       |
| `datetime`       | `timestamp_without_timezone` |
| `array`          | `array`                      |
| `object`         | `object`                     |

### Features

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

### Performance considerations

Normal Microsoft Graph [requests limitation](https://docs.microsoft.com/en-us/graph/throttling) restrict the connector.

## Getting started

### Requirements

- Application \(client\) ID
- Directory \(tenant\) ID
- Client secrets

### Setup guide

The Microsoft Graph API uses OAuth for authentication. Microsoft Graph provides granular permissions controlling app access to resources such as users, groups and mail. When a user signs in, they or an administrator can consent to these permissions. After consent, your app can access its requested resources and APIs. For apps without a signed-in user, an administrator can pre-consent to permissions during installation.

Microsoft Graph has two permission types:

- **Delegated permissions** apply to apps with a signed-in user. The user or an administrator consents to the requested permissions. The app can then act as the signed-in user when calling Microsoft Graph. Non-administrative users can consent to some delegated permissions. Higher-privileged permissions require administrator consent.
- **Application permissions** apply to apps without a signed-in user, including background services or daemons. Only an administrator can consent to application permissions.

This source requires **Application permissions**. Follow these [instructions](https://docs.microsoft.com/en-us/graph/auth-v2-service?context=graph%2Fapi%2F1.0&view=graph-rest-1.0) to create an app in the Azure portal. This process provides the `client_id`, `client_secret` and `tenant_id` required for the tap configuration file.

1. Sign in to [Azure Portal](https://portal.azure.com/#home)
2. Select the upper-left menu icon, then select Azure Active Directory
3. Select App Registrations
4. Select New registration
5. Register an application
   1. Name:
   2. Supported account types: Accounts in this organizational directory only
   3. Register \(button\)
6. Record the client_id and tenant_id. The tap uses them for authentication and API integration.
7. Select Certificates & secrets
8. Provide Description and Expires
   1. Description: tap-microsoft-teams client secret
   2. Expires: 1-year
   3. Add
9. Copy the client secret value. This value is the client_secret.
10. Select API permissions
    1. Select Add a permission
11. Select Microsoft Graph
12. Select Application permissions
13. Select the following permissions:
    1. Users
       - User.Read.All
       - User.ReadWrite.All
       - Directory.Read.All
       - Directory.ReadWrite.All
    2. Groups
       - GroupMember.Read.All
       - Group.Read.All
       - Directory.Read.All
       - Group.ReadWrite.All
       - Directory.ReadWrite.All
    3. Group members
       - GroupMember.Read.All
       - Group.Read.All
       - Directory.Read.All
    4. Group owners
       - Group.Read.All
       - User.Read.All
       - Group.Read.All
       - User.ReadWrite.All
       - Group.Read.All
       - User.Read.All
       - Application.Read.All
    5. Channels
       - ChannelSettings.Read.Group
       - ChannelSettings.ReadWrite.Group
       - Channel.ReadBasic.All
       - ChannelSettings.Read.All
       - ChannelSettings.ReadWrite.All
       - Group.Read.All
       - Group.ReadWrite.All
       - Directory.Read.All
       - Directory.ReadWrite.All
    6. Channel members
       - ChannelMember.Read.All
       - ChannelMember.ReadWrite.All
    7. Channel tabs
       - TeamsTab.Read.Group
       - TeamsTab.ReadWrite.Group
       - TeamsTab.Read.All
       - TeamsTab.ReadWriteForTeam.All
       - TeamsTab.ReadWrite.All
       - Group.Read.All
       - Group.ReadWrite.All
       - Directory.Read.All
       - Directory.ReadWrite.All
    8. Conversations
       - Group.Read.All
       - Group.ReadWrite.All
    9. Conversation threads
       - Group.Read.All
       - Group.ReadWrite.All
    10. Conversation posts
        - Group.Read.All
        - Group.ReadWrite.All
    11. Team drives
        - Files.Read.All
        - Files.ReadWrite.All
        - Sites.Read.All
        - Sites.ReadWrite.All
    12. Team device usage report
        - Reports.Read.All
14. Select Add permissions

[instantiate](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-daemon-app-configuration?tabs=python#instantiate-the-msal-application) implements token acquisition for the confidential client application using a client secret and [calling](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-daemon-acquire-token?tabs=python) AcquireTokenForClient from [Microsoft Authentication Library \(MSAL\) for Python](https://github.com/AzureAD/microsoft-authentication-library-for-python)

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                        |
| :------ | :--------- | :------------------------------------------------------- | :----------------------------- |
| 1.2.37 | 2026-11-03 | [90656](https://github.com/airbytehq/airbyte/pull/90656) | Update dependencies |
| 1.2.36 | 2026-10-27 | [89978](https://github.com/airbytehq/airbyte/pull/89978) | Update dependencies |
| 1.2.35 | 2026-10-20 | [89298](https://github.com/airbytehq/airbyte/pull/89298) | Update dependencies |
| 1.2.34 | 2026-10-13 | [88697](https://github.com/airbytehq/airbyte/pull/88697) | Update dependencies |
| 1.2.33 | 2026-10-06 | [87925](https://github.com/airbytehq/airbyte/pull/87925) | Update dependencies |
| 1.2.32 | 2026-09-29 | [87272](https://github.com/airbytehq/airbyte/pull/87272) | Update dependencies |
| 1.2.31 | 2026-09-22 | [86725](https://github.com/airbytehq/airbyte/pull/86725) | Update dependencies |
| 1.2.30 | 2026-09-15 | [86124](https://github.com/airbytehq/airbyte/pull/86124) | Update dependencies |
| 1.2.29 | 2026-09-08 | [85571](https://github.com/airbytehq/airbyte/pull/85571) | Update dependencies |
| 1.2.28 | 2026-08-18 | [84667](https://github.com/airbytehq/airbyte/pull/84667) | Update dependencies |
| 1.2.27 | 2026-08-11 | [84010](https://github.com/airbytehq/airbyte/pull/84010) | Update dependencies |
| 1.2.26 | 2026-08-04 | [83526](https://github.com/airbytehq/airbyte/pull/83526) | Update dependencies |
| 1.2.25 | 2026-07-28 | [83017](https://github.com/airbytehq/airbyte/pull/83017) | Update dependencies |
| 1.2.24 | 2026-07-21 | [82492](https://github.com/airbytehq/airbyte/pull/82492) | Update dependencies |
| 1.2.23 | 2026-07-14 | [81903](https://github.com/airbytehq/airbyte/pull/81903) | Update dependencies |
| 1.2.22 | 2026-06-30 | [81155](https://github.com/airbytehq/airbyte/pull/81155) | Update dependencies |
| 1.2.21 | 2026-06-23 | [80545](https://github.com/airbytehq/airbyte/pull/80545) | Update dependencies |
| 1.2.20 | 2026-06-16 | [79958](https://github.com/airbytehq/airbyte/pull/79958) | Update dependencies |
| 1.2.19 | 2026-06-09 | [79386](https://github.com/airbytehq/airbyte/pull/79386) | Update dependencies |
| 1.2.18 | 2026-06-02 | [78850](https://github.com/airbytehq/airbyte/pull/78850) | Update dependencies |
| 1.2.17 | 2026-04-28 | [77352](https://github.com/airbytehq/airbyte/pull/77352) | Update dependencies |
| 1.2.16 | 2026-04-21 | [76682](https://github.com/airbytehq/airbyte/pull/76682) | Update dependencies |
| 1.2.15 | 2026-03-31 | [75805](https://github.com/airbytehq/airbyte/pull/75805) | Update dependencies |
| 1.2.14 | 2026-03-17 | [74567](https://github.com/airbytehq/airbyte/pull/74567) | Update dependencies |
| 1.2.13 | 2026-03-03 | [73414](https://github.com/airbytehq/airbyte/pull/73414) | Update dependencies |
| 1.2.12 | 2026-02-10 | [73207](https://github.com/airbytehq/airbyte/pull/73207) | Update dependencies |
| 1.2.11 | 2026-02-03 | [72717](https://github.com/airbytehq/airbyte/pull/72717) | Update dependencies |
| 1.2.10 | 2026-01-20 | [72026](https://github.com/airbytehq/airbyte/pull/72026) | Update dependencies |
| 1.2.9 | 2026-01-14 | [71530](https://github.com/airbytehq/airbyte/pull/71530) | Update dependencies |
| 1.2.8 | 2025-12-18 | [70764](https://github.com/airbytehq/airbyte/pull/70764) | Update dependencies |
| 1.2.7 | 2025-12-02 | [66337](https://github.com/airbytehq/airbyte/pull/66337) | Update dependencies |
| 1.2.6 | 2025-09-10 | [65755](https://github.com/airbytehq/airbyte/pull/65755) | Update dependencies |
| 1.2.5 | 2025-08-23 | [65219](https://github.com/airbytehq/airbyte/pull/65219) | Update dependencies |
| 1.2.4 | 2025-08-09 | [48176](https://github.com/airbytehq/airbyte/pull/48176) | Update dependencies |
| 1.2.3 | 2024-10-29 | [47758](https://github.com/airbytehq/airbyte/pull/47758) | Update dependencies |
| 1.2.2 | 2024-10-28 | [47453](https://github.com/airbytehq/airbyte/pull/47453) | Update dependencies |
| 1.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 1.2.0 | 2024-08-15 | [44116](https://github.com/airbytehq/airbyte/pull/44116) | Refactor connector to manifest-only format |
| 1.1.11 | 2024-08-12 | [43772](https://github.com/airbytehq/airbyte/pull/43772) | Update dependencies |
| 1.1.10 | 2024-08-10 | [43547](https://github.com/airbytehq/airbyte/pull/43547) | Update dependencies |
| 1.1.9 | 2024-08-03 | [43251](https://github.com/airbytehq/airbyte/pull/43251) | Update dependencies |
| 1.1.8 | 2024-07-27 | [42691](https://github.com/airbytehq/airbyte/pull/42691) | Update dependencies |
| 1.1.7 | 2024-07-20 | [41853](https://github.com/airbytehq/airbyte/pull/41853) | Update dependencies |
| 1.1.6 | 2024-07-10 | [41382](https://github.com/airbytehq/airbyte/pull/41382) | Update dependencies |
| 1.1.5 | 2024-07-09 | [41318](https://github.com/airbytehq/airbyte/pull/41318) | Update dependencies |
| 1.1.4 | 2024-07-06 | [40913](https://github.com/airbytehq/airbyte/pull/40913) | Update dependencies |
| 1.1.3 | 2024-06-25 | [40366](https://github.com/airbytehq/airbyte/pull/40366) | Update dependencies |
| 1.1.2 | 2024-06-22 | [40026](https://github.com/airbytehq/airbyte/pull/40026) | Update dependencies |
| 1.1.1 | 2024-06-04 | [39046](https://github.com/airbytehq/airbyte/pull/39046) | [autopull] Upgrade base image to v1.2.1 |
| 1.1.0 | 2024-03-24 | [36223](https://github.com/airbytehq/airbyte/pull/36223) | Migration to low code |
| 1.0.0 | 2024-01-04 | [33959](https://github.com/airbytehq/airbyte/pull/33959) | Schema updates |
| 0.2.5 | 2021-12-14 | [8429](https://github.com/airbytehq/airbyte/pull/8429) | Update titles and descriptions |
| 0.2.4 | 2021-12-07 | [7807](https://github.com/airbytehq/airbyte/pull/7807) | Implement OAuth support |
| 0.2.3 | 2021-12-06 | [8469](https://github.com/airbytehq/airbyte/pull/8469) | Migrate to the CDK |

</details>
