---
generated_record: true
connector_name: RD Station Marketing
connector_type: source
connector_slug: rd-station-marketing
connector_directory: source-rd-station-marketing
definition_id: fb141f29-be2a-450b-a4f2-2cd203a00f84
version: 0.3.24
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/rd-station-marketing
logo: /images/connectors/sources/rd-station-marketing.svg
logo_source_path: airbyte-integrations/connectors/source-rd-station-marketing/icon.svg
logo_sha256: 5c356da18e4dfd73d18c3d97a99ef328cc440d7deac97f804538c37b6f5fe57e
original_metadata_path: airbyte-integrations/connectors/source-rd-station-marketing/metadata.yaml
original_metadata_sha256: c158b33b22bf630dae1ab5d39806b75e53d0efd384a110d950cf1b37ec2944ba
original_document_path: docs/integrations/sources/rd-station-marketing.md
original_document_sha256: 084fbee79cae9940d7cfcb718755943224829713146108c3b647016b1d157056
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: b56e248fbaa40661e158af3a894c7c754c5f0abb875ed4601a58d1cba5b961d3
rewritten_at: 2026-11-12T13:52:49.099952+00:00
---

# RD Station Marketing

RD Station Marketing is Latin America's leading Marketing Automation tool. It helps your company run better campaigns, nurture Leads, generate qualified business opportunities and achieve more results. It covers social media, email, Landing Pages, Pop-ups, Automations and Analytics.

## Prerequisites

- An RD Station account
- A callback URL for receiving the first account credential. You can use localhost.
- `client_id` and `client_secret` credentials. Access [this link](https://appstore.rdstation.com/en/publisher) to register a new application and start the authentication flow.

## Airbyte Open Source

- Start Date
- Client Id
- Client Secret
- Refresh token

## Supported sync modes

The RD Station Marketing source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh
- Incremental (for analytics endpoints)

## Supported streams

- conversions (analytics endpoint)
- emails (analytics endpoint)
- funnel (analytics endpoint)
- workflow_emails_statistics (analytics endpoint)
- emails
- embeddables
- fields
- landing_pages
- popups
- segmentations
- workflows

## Performance considerations

Each endpoint has its own performance limits, which also depend on the account plan. For more information, visit the [API request limit](https://developers.rdstation.com/reference/limite-de-requisicoes-da-api?lng=en) page.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                          |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------------- |
| 0.3.24 | 2025-09-05 | [65966](https://github.com/airbytehq/airbyte/pull/65966) | Update to CDK v7.0.0 |
| 0.3.23 | 2025-05-10 | [60134](https://github.com/airbytehq/airbyte/pull/60134) | Update dependencies |
| 0.3.22 | 2025-05-03 | [58497](https://github.com/airbytehq/airbyte/pull/58497) | Update dependencies |
| 0.3.21 | 2025-04-12 | [57845](https://github.com/airbytehq/airbyte/pull/57845) | Update dependencies |
| 0.3.20 | 2025-04-05 | [57360](https://github.com/airbytehq/airbyte/pull/57360) | Update dependencies |
| 0.3.19 | 2025-03-29 | [56745](https://github.com/airbytehq/airbyte/pull/56745) | Update dependencies |
| 0.3.18 | 2025-03-22 | [56205](https://github.com/airbytehq/airbyte/pull/56205) | Update dependencies |
| 0.3.17 | 2025-03-08 | [55550](https://github.com/airbytehq/airbyte/pull/55550) | Update dependencies |
| 0.3.16 | 2025-03-01 | [55026](https://github.com/airbytehq/airbyte/pull/55026) | Update dependencies |
| 0.3.15 | 2025-02-23 | [54609](https://github.com/airbytehq/airbyte/pull/54609) | Update dependencies |
| 0.3.14 | 2025-02-15 | [53966](https://github.com/airbytehq/airbyte/pull/53966) | Update dependencies |
| 0.3.13 | 2025-02-08 | [53465](https://github.com/airbytehq/airbyte/pull/53465) | Update dependencies |
| 0.3.12 | 2025-02-01 | [53015](https://github.com/airbytehq/airbyte/pull/53015) | Update dependencies |
| 0.3.11 | 2025-01-25 | [52525](https://github.com/airbytehq/airbyte/pull/52525) | Update dependencies |
| 0.3.10 | 2025-01-18 | [51869](https://github.com/airbytehq/airbyte/pull/51869) | Update dependencies |
| 0.3.9 | 2025-01-11 | [51324](https://github.com/airbytehq/airbyte/pull/51324) | Update dependencies |
| 0.3.8 | 2024-12-28 | [50676](https://github.com/airbytehq/airbyte/pull/50676) | Update dependencies |
| 0.3.7 | 2024-12-21 | [50264](https://github.com/airbytehq/airbyte/pull/50264) | Update dependencies |
| 0.3.6 | 2024-12-14 | [49679](https://github.com/airbytehq/airbyte/pull/49679) | Update dependencies |
| 0.3.5 | 2024-12-12 | [49334](https://github.com/airbytehq/airbyte/pull/49334) | Update dependencies |
| 0.3.4 | 2024-12-11 | [48161](https://github.com/airbytehq/airbyte/pull/48161) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.3.3 | 2024-10-29 | [47936](https://github.com/airbytehq/airbyte/pull/47936) | Update dependencies |
| 0.3.2 | 2024-10-28 | [47577](https://github.com/airbytehq/airbyte/pull/47577) | Update dependencies |
| 0.3.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.3.0 | 2024-08-14 | [44081](https://github.com/airbytehq/airbyte/pull/44081) | Refactor connector to manifest-only format |
| 0.2.8 | 2024-08-10 | [43486](https://github.com/airbytehq/airbyte/pull/43486) | Update dependencies |
| 0.2.7 | 2024-08-03 | [43085](https://github.com/airbytehq/airbyte/pull/43085) | Update dependencies |
| 0.2.6 | 2024-07-27 | [42665](https://github.com/airbytehq/airbyte/pull/42665) | Update dependencies |
| 0.2.5 | 2024-07-20 | [42187](https://github.com/airbytehq/airbyte/pull/42187) | Update dependencies |
| 0.2.4 | 2024-07-13 | [41898](https://github.com/airbytehq/airbyte/pull/41898) | Update dependencies |
| 0.2.3 | 2024-07-10 | [41525](https://github.com/airbytehq/airbyte/pull/41525) | Update dependencies |
| 0.2.2 | 2024-07-09 | [41232](https://github.com/airbytehq/airbyte/pull/41232) | Update dependencies |
| 0.2.1 | 2024-07-06 | [40791](https://github.com/airbytehq/airbyte/pull/40791) | Update dependencies |
| 0.2.0 | 2024-06-27 | [40216](https://github.com/airbytehq/airbyte/pull/40216) | Migrate connector to Low Code |
| 0.1.9 | 2024-06-26 | [40549](https://github.com/airbytehq/airbyte/pull/40549) | Migrate off deprecated auth package |
| 0.1.8 | 2024-06-25 | [40324](https://github.com/airbytehq/airbyte/pull/40324) | Update dependencies |
| 0.1.7 | 2024-06-22 | [40145](https://github.com/airbytehq/airbyte/pull/40145) | Update dependencies |
| 0.1.6 | 2024-06-06 | [39228](https://github.com/airbytehq/airbyte/pull/39228) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.5 | 2024-06-03 | [38916](https://github.com/airbytehq/airbyte/pull/38916) | Replace AirbyteLogger with logging.Logger |
| 0.1.4 | 2024-06-03 | [38916](https://github.com/airbytehq/airbyte/pull/38916) | Replace AirbyteLogger with logging.Logger |
| 0.1.3 | 2024-05-20 | [38372](https://github.com/airbytehq/airbyte/pull/38372) | [autopull] base image + poetry + up_to_date |
| 0.1.2   | 2022-07-06 | [28009](https://github.com/airbytehq/airbyte/pull/28009/) | Migrated to advancedOAuth        |
| 0.1.1   | 2022-11-01 | [18826](https://github.com/airbytehq/airbyte/pull/18826)  | Fix stream analytics_conversions |
| 0.1.0   | 2022-10-23 | [18348](https://github.com/airbytehq/airbyte/pull/18348)  | Initial Release                  |

</details>
