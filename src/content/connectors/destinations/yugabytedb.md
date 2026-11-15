---
generated_record: true
connector_name: YugabyteDB
connector_type: destination
connector_slug: yugabytedb
connector_directory: destination-yugabytedb
definition_id: 2300fdcf-a532-419f-9f24-a014336e7966
version: 0.1.1
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/yugabytedb
logo: /images/connectors/destinations/yugabytedb.svg
logo_source_path: airbyte-integrations/connectors/destination-yugabytedb/icon.svg
logo_sha256: 5fc755ea3dc54c633bb05234300d8ae9485f98ddf27358a3d2464f9bc3832ee9
original_metadata_path: airbyte-integrations/connectors/destination-yugabytedb/metadata.yaml
original_metadata_sha256: 25ff789eda8b1ca504e26022887d2ec92a12d24e32008d723120add73cbe2853
original_document_path: docs/integrations/destinations/yugabytedb.md
original_document_sha256: 2959404739285f62066898068a4833e2db826ac276b856e5d31a325cd3ee2f7f
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 30c0997e98f47b524b5bbbaf83ff26bc675c6a90d59d804347d0aa7b97f26188
rewritten_at: 2026-11-12T13:28:29.390502+00:00
---

# Yugabytedb

TODO: Update this document.

## Sync overview

### Output schema

Is the output schema fixed, as it is for an API like Stripe? If so, link to the connector's schema, such as Stripe’s documentation. You can instead describe the schema here using a diagram or explanatory paragraphs.

Describe how the connector's schema maps to Airbyte concepts. For example: "MagicDB tables become Airbyte Streams, and MagicDB columns become Airbyte Fields. The connector also appends an extracted_at column to each row it reads."

### Data type mapping

Add a table mapping each connector data type to its Airbyte type. Airbyte currently uses the same types as [JSONSchema](https://json-schema.org/understanding-json-schema/reference/index.html). The most common data types are `string`, `date-time`, `object`, `array`, `boolean`, `integer` and `number`.

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |

### Features

Add a table using the following format:

| Feature                                | Supported?(Yes/No) | Notes |
| :------------------------------------- | :----------------- | :---- |
| Full Refresh Sync                      |                    |       |
| Incremental Sync                       |                    |       |
| Replicate Incremental Deletes          |                    |       |
| For databases, WAL/Logical replication |                    |       |
| SSL connection                         |                    |       |
| SSH Tunnel Support                     |                    |       |
| (Any other source-specific features)   |                    |       |

### Performance considerations

Explain when the connector could strain or affect your database, API or other system. Consider scenarios with many tables or rows. State the breaking point, such as 100mm&gt; records. Explain how you can prevent problems, such as using a read-only replica or scheduling frequent syncs.

## Getting started

### Requirements

- Which connector versions does this implementation support? For example, `postgres v3.14 and above`.
- Which connector configurations are required, if any? For example, `buffer_size > 1024`.
- What network access does the connector require?
- Which credentials or authentication does the connector require? For example, a database user with read permissions for specific tables.

### Setup guide

For each relevant requirement above, add or link to a step-by-step guide. See existing source or destination guides for an example.

For each supported major cloud provider, add a step-by-step guide for connecting Airbyte to that destination. See the Postgres destination guide for the expected format.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                    |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------- |
| 0.1.1   | 2023-03-17 | [#24180](https://github.com/airbytehq/airbyte/pull/24180) | Fix field order            |
| 0.1.0   | 2022-10-28 | [#18039](https://github.com/airbytehq/airbyte/pull/18039) | New Destination YugabyteDB |

</details>
