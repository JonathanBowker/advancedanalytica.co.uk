---
generated_record: true
connector_name: Kustomer
connector_type: source
connector_slug: kustomer-singer
connector_directory: source-kustomer-singer
definition_id: cd06e646-31bf-4dc8-af48-cbc6530fcad3
version: 0.1.2
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/kustomer-singer
logo: /images/connectors/sources/kustomer-singer.svg
logo_source_path: airbyte-integrations/connectors/source-kustomer-singer/icon.svg
logo_sha256: fb6f44c2e052a7cd506c6dfe2e6eabc9b671b46942d567e5fb0df89347e14160
original_metadata_path: airbyte-integrations/connectors/source-kustomer-singer/metadata.yaml
original_metadata_sha256: 15d219885e57ec6d5e2c3033cb39b7868fe56491337a5283c5835f3b7913c071
original_document_path: docs/integrations/sources/kustomer-singer.md
original_document_sha256: b8d774f2bba696f8a0c9301a3c8415fcf1518f8a5a87342fa324c4335d6b8766
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: e454d2b094d9d16e18f1e2bbbe37a9df13cf76240ff156b8a2b70c76399ed55d
rewritten_at: 2026-11-12T13:44:56.598244+00:00
---

# Kustomer

:::warning

## Deprecation notice

The Kustomer source connector is scheduled for deprecation on March 5th, 2024. It is incompatible with upcoming platform updates for Airbyte 1.0. After deprecation, it will no longer be supported or available in Airbyte.

This connector doesn't support the new per-stream features needed to protect data integrity during Airbyte synchronisation. Without these capabilities, Airbyte can't enforce its standards for reliable and correct data syncing.

### Recommended action

To continue syncing data from this connector, you can explore creating a custom connector. For guidance, visit [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

## Sync overview

The Kustomer source supports Full Refresh and Incremental syncs. For each sync, you can copy only new or updated data. Alternatively, you can copy every row from the tables and columns you set up for replication.

You can sync data for the [Kustomer API](https://developer.kustomer.com/kustomer-api-docs).

This source connector is based on a [Singer tap](https://github.com/singer-io/tap-kustomer).

### Output schema

You can sync the following core streams:

- [Conversations](https://developer.kustomer.com/kustomer-api-docs/reference/conversations)
- [Customers](https://developer.kustomer.com/kustomer-api-docs/reference/customers)
- [KObjects](https://developer.kustomer.com/kustomer-api-docs/reference/kobjects-custom-objects)
- [Messages](https://developer.kustomer.com/kustomer-api-docs/reference/messages)
- [Notes](https://developer.kustomer.com/kustomer-api-docs/reference/notes)
- [Shortcuts](https://developer.kustomer.com/kustomer-api-docs/reference/shortcuts)
- [Tags](https://developer.kustomer.com/kustomer-api-docs/reference/tags-knowledge-base)
- [Teams](https://developer.kustomer.com/kustomer-api-docs/reference/teams)
- [Users](https://developer.kustomer.com/kustomer-api-docs/reference/users)

### Features

| Feature                   | Supported?\(Yes/No\) | Notes |
| :------------------------ | :------------------- | :---- |
| Full Refresh Sync         | Yes                  |       |
| Incremental - Append Sync | Yes                  |       |
| Namespaces                | No                   |       |

### Performance considerations

Kustomer has some [rate limit restrictions](https://developer.kustomer.com/kustomer-api-docs/reference/rate-limiting).

## Requirements

- **Kustomer API token**. See the [Kustomer docs](https://help.kustomer.com/api-keys-SJs5YTIWX) for details about obtaining an API token.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                           | Subject                                                                           |
| :------ | :--------- | :----------------------------------------------------- | :-------------------------------------------------------------------------------- |
| 0.1.2   | 2021-12-25 | [8578](https://github.com/airbytehq/airbyte/pull/8578) | Update fields in source-connectors specifications                                 |
| 0.1.1   | 2021-12-22 | [8738](https://github.com/airbytehq/airbyte/pull/8738) | Deleted `user-agent`, `date_window_size`, `page_size_limit` from `spec.json` file |
| 0.1.0   | 2021-07-22 | [4550](https://github.com/airbytehq/airbyte/pull/4550) | Add Kustomer Source Connector                                                     |

</details>
