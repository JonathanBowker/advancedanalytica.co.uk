---
generated_record: true
connector_name: Apache Doris
connector_type: destination
connector_slug: doris
connector_directory: destination-doris
definition_id: 05c161bf-ca73-4d48-b524-d392be417002
version: 0.1.0
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/doris
logo: /images/connectors/destinations/doris.svg
logo_source_path: airbyte-integrations/connectors/destination-doris/icon.svg
logo_sha256: e10bcd5c306d0e7c73bd969fdf3cb971ccf5f0b10ec3fa31e3ce9e43913edb00
original_metadata_path: airbyte-integrations/connectors/destination-doris/metadata.yaml
original_metadata_sha256: 9b64fa923734e2769c7998f116982d848fd4733a0f4bcc9e8f2c7c919836c7a0
original_document_path: docs/integrations/destinations/doris.md
original_document_sha256: 3ae5715084b01cd488a12c9b52025ac13727153cf6ea4b5b0fdfb26c0aeaca52
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 99972b391c51bdd7dae6751ecf9430eb6181b7331b94d390a25f2143048573eb
rewritten_at: 2026-11-12T13:23:52.651164+00:00
---

# Doris

destination-doris is built on [Apache Doris stream load](https://doris.apache.org/docs/dev/data-operate/import/import-way/stream-load-manual). It supports batch rollback and sends HTTP/HTTPS PUT requests.

## Sync overview

### Output schema

Each stream is written to its own table in Doris. Each table contains three columns:

- `_airbyte_ab_id`: a UUID Airbyte assigns to each processed event. In Doris, the column type is `VARCHAR(40)`.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source. In Doris, the column type is `BIGINT`.
- `_airbyte_data`: a JSON blob containing the event data. In Doris, the column type is `String`.

### Features

Use the following table format:

| Feature                                | Supported?(Yes/No) | Notes                    |
| :------------------------------------- | :----------------- | :----------------------- |
| Full Refresh Sync                      | Yes                |                          |
| Incremental - Append Sync              | Yes                |                          |
| Incremental - Append + Deduped         | No                 | it will soon be realized |
| For databases, WAL/Logical replication | Yes                |                          |

### Performance considerations

Writes are processed in batches. Small record batches may affect performance.
Importing multiple tables creates multiple [Doris stream load](https://doris.apache.org/docs/dev/data-operate/import/import-way/stream-load-manual) transactions. Split imports as much as possible.

## Getting started

### Requirements

To use the Doris destination, you’ll need:

- A Doris server running version 0.14 or above
- Airbyte must be able to access your Doris FE HTTP port.
- Airbyte must be able to access your Doris database host.
- Your Doris user must have read and write permissions for specific tables.

### Target database and tables

Choose a database to store data synced from Airbyte.
Prepare the tables that will store this data. Match their column names and order as closely as possible.

### Set up access parameters

- **Host**
- **HttpPort**
- **QueryPort**
- **Username**
- **Password**
- **Database**

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject        |
| :------ | :--------- | :------------------------------------------------------- | :------------- |
| 0.1.0   | 2022-11-14 | [17884](https://github.com/airbytehq/airbyte/pull/17884) | Initial Commit |

</details>
