---
generated_record: true
connector_name: Mailjet Mail
connector_type: source
connector_slug: mailjet-mail
connector_directory: source-mailjet-mail
definition_id: 56582331-5de2-476b-b913-5798de77bbdf
version: 0.2.16
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/mailjet-mail
logo: /images/connectors/sources/mailjet-mail.svg
logo_source_path: airbyte-integrations/connectors/source-mailjet-mail/icon.svg
logo_sha256: eeb02e1b3ebb23c7174d97b654297aff89e173393490e8b01fce0293678ca37e
original_metadata_path: airbyte-integrations/connectors/source-mailjet-mail/metadata.yaml
original_metadata_sha256: 40ae1925cb7beadb1301591429fa8ee6110fcfd3023599682c8bad7a7e16b639
original_document_path: docs/integrations/sources/mailjet-mail.md
original_document_sha256: 6bb65402e175001db82161d53aa9a738c34fdc6984a0ff91d601899ce7c41b9c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: dc21938f063a75faf3442e05014d21cfff0a8f8960040086385349928e2da371
rewritten_at: 2026-11-12T13:46:07.137710+00:00
---

# Mailjet - Mail API

## Sync overview

This source can sync data from the [Mailjet Mail API](https://dev.mailjet.com/email/guides/). Currently, this connector supports full refresh syncs only. Each sync retrieves all available records from scratch. Use it cautiously if you expect your API to contain many records.

## Supported streams

- contact list
- contacts
- messages
- campaigns
- stats

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

### Performance considerations

Mailjet APIs limit the number of API calls allowed per API key each second. If you reach this limit, the API returns a 429 HTTP error code. See [here](https://dev.mailjet.com/email/reference/overview/rate-limits/)

## Get started

### Requirements

- Mailjet Mail API_KEY
- Mailjet Mail SECRET_KEY

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                        |
| :------ | :--------- | :-------------------------------------------------------- | :--------------------------------------------- |
| 0.2.16 | 2026-11-09 | [91389](https://github.com/airbytehq/airbyte/pull/91389) | Upgrade to source-declarative-manifest 7.47.0 |
| 0.2.15 | 2026-10-13 | [78828](https://github.com/airbytehq/airbyte/pull/78828) | Update dependencies |
| 0.2.14 | 2026-10-09 | [88414](https://github.com/airbytehq/airbyte/pull/88414) | Mark `api_key` as `airbyte_secret` |
| 0.2.13 | 2025-05-24 | [60716](https://github.com/airbytehq/airbyte/pull/60716) | Update dependencies |
| 0.2.12 | 2025-05-10 | [59781](https://github.com/airbytehq/airbyte/pull/59781) | Update dependencies |
| 0.2.11 | 2025-05-03 | [58794](https://github.com/airbytehq/airbyte/pull/58794) | Update dependencies |
| 0.2.10 | 2025-04-19 | [58200](https://github.com/airbytehq/airbyte/pull/58200) | Update dependencies |
| 0.2.9 | 2025-04-12 | [57720](https://github.com/airbytehq/airbyte/pull/57720) | Update dependencies |
| 0.2.8 | 2025-04-05 | [57083](https://github.com/airbytehq/airbyte/pull/57083) | Update dependencies |
| 0.2.7 | 2025-03-29 | [56711](https://github.com/airbytehq/airbyte/pull/56711) | Update dependencies |
| 0.2.6 | 2025-03-22 | [56026](https://github.com/airbytehq/airbyte/pull/56026) | Update dependencies |
| 0.2.5 | 2025-03-08 | [55444](https://github.com/airbytehq/airbyte/pull/55444) | Update dependencies |
| 0.2.4 | 2025-03-01 | [54764](https://github.com/airbytehq/airbyte/pull/54764) | Update dependencies |
| 0.2.3 | 2025-02-22 | [54322](https://github.com/airbytehq/airbyte/pull/54322) | Update dependencies |
| 0.2.2 | 2025-02-15 | [47463](https://github.com/airbytehq/airbyte/pull/47463) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-15 | [44129](https://github.com/airbytehq/airbyte/pull/44129) | Refactor connector to manifest-only format |
| 0.1.16 | 2024-08-12 | [43814](https://github.com/airbytehq/airbyte/pull/43814) | Update dependencies |
| 0.1.15 | 2024-08-10 | [43571](https://github.com/airbytehq/airbyte/pull/43571) | Update dependencies |
| 0.1.14 | 2024-08-03 | [43161](https://github.com/airbytehq/airbyte/pull/43161) | Update dependencies |
| 0.1.13 | 2024-07-27 | [42613](https://github.com/airbytehq/airbyte/pull/42613) | Update dependencies |
| 0.1.12 | 2024-07-20 | [42245](https://github.com/airbytehq/airbyte/pull/42245) | Update dependencies |
| 0.1.11 | 2024-07-13 | [41867](https://github.com/airbytehq/airbyte/pull/41867) | Update dependencies |
| 0.1.10 | 2024-07-10 | [41587](https://github.com/airbytehq/airbyte/pull/41587) | Update dependencies |
| 0.1.9 | 2024-07-09 | [41177](https://github.com/airbytehq/airbyte/pull/41177) | Update dependencies |
| 0.1.8 | 2024-07-06 | [40930](https://github.com/airbytehq/airbyte/pull/40930) | Update dependencies |
| 0.1.7 | 2024-07-02 | [40257](https://github.com/airbytehq/airbyte/pull/40257) | Make compatible with builder |
| 0.1.6 | 2024-06-25 | [40415](https://github.com/airbytehq/airbyte/pull/40415) | Update dependencies |
| 0.1.5 | 2024-06-22 | [40065](https://github.com/airbytehq/airbyte/pull/40065) | Update dependencies |
| 0.1.4 | 2024-06-04 | [38939](https://github.com/airbytehq/airbyte/pull/38939) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.3 | 2024-05-21 | [38483](https://github.com/airbytehq/airbyte/pull/38483) | [autopull] base image + poetry + up_to_date |
| 0.1.2   | 2022-12-18 | [#30924](https://github.com/airbytehq/airbyte/pull/30924) | Adds Subject field to `message` stream         |
| 0.1.1   | 2022-04-19 | [#24689](https://github.com/airbytehq/airbyte/pull/24689) | Add listrecipient stream                       |
| 0.1.0   | 2022-10-26 | [#18332](https://github.com/airbytehq/airbyte/pull/18332) | 🎉 New Source: Mailjet Mail API [low-code CDK] |

</details>
