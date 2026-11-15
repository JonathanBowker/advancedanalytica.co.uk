---
generated_record: true
connector_name: Exasol
connector_type: destination
connector_slug: exasol
connector_directory: destination-exasol
definition_id: bb6071d9-6f34-4766-bec2-d1d4ed81a653
version: 0.1.1
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/exasol
logo: null
logo_source_path: null
logo_sha256: null
original_metadata_path: airbyte-integrations/connectors/destination-exasol/metadata.yaml
original_metadata_sha256: 283538eb24f279033315576f3001ce3db53b74c9df21c5cdf777ec7a5215393d
original_document_path: docs/integrations/destinations/exasol.md
original_document_sha256: bc874f037dd3d1ef6984010762d39b9597b7989ad9c77e1fc8e7a00c1aa472b0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 8d286db17275618dd302e24a684b99f94e78e3d8435e68db94ef6d3bd2ac3f82
rewritten_at: 2026-11-12T13:23:54.197481+00:00
---

# Exasol

Exasol is an in-memory database built for analytics.

## Sync overview

### Output schema

Each Airbyte Stream becomes an Exasol table. Each Airbyte Field becomes an Exasol column. Every Exasol table created by Airbyte contains three columns:

- `_AIRBYTE_AB_ID`: a uuid that Airbyte assigns to each processed event. The Exasol column type is `VARCHAR(64)`.
- `_AIRBYTE_DATA`: a json blob containing the event data. The Exasol column type is `VARCHAR(2000000)`.
- `_AIRBYTE_EMITTED_AT`: a timestamp showing when the event was pulled from the data source. The Exasol column type is `TIMESTAMP`.

### Features

The Exasol destination supports these features:

| Feature                        | Supported? (Yes/No) | Notes |
| :----------------------------- | :------------------ | :---- |
| Full Refresh Sync              | Yes                 |       |
| Incremental - Append Sync      | Yes                 |       |
| Incremental - Append + Deduped | No                  |       |
| Normalization                  | No                  |       |
| Namespaces                     | Yes                 |       |
| SSL connection                 | Yes                 | TLS   |
| SSH Tunnel Support             | No                  |       |

### Limitations

#### Maximum data size: two million characters

Exasol doesn't have a dedicated data type for arbitrary-length data or JSON. This connector therefore stores Airbyte data using type `VARCHAR(2000000)`.

## Getting started

### Requirements

You'll need Exasol database version 7.1 or above to use the Exasol destination.

#### Network access

Make sure Airbyte can access your Exasol database. For databases within a VPC, you may need to allow the IP used to expose Airbyte.

#### **Permissions**

Airbyte namespaces let you store data in different schemas. Each scenario requires different permissions for the user account. The following table describes four scenarios for the login user and destination user.

| Login user   | Destination user   | Required permissions                                          | Comment                                                                    |
| :----------- | :----------------- | :------------------------------------------------------------ | :------------------------------------------------------------------------- |
| DBA User     | Any user           | -                                                             |                                                                            |
| Regular user | Same user as login | Create, drop and write table, create session                  |                                                                            |
| Regular user | Any existing user  | Create, drop and write ANY table, create session              | Grants can be provided on a system level by DBA or by target user directly |
| Regular user | Not existing user  | Create, drop and write ANY table, create user, create session | Grants should be provided on a system level by DBA                         |

You should create an Airbyte-specific user for this purpose.

### Setup guide

You now have everything needed to configure Exasol as a destination in the UI. You'll need these details:

- Host
- Port
- Fingerprint of the Exasol server's TLS certificate (if the database uses a self-signed certificate)
- Username
- Password

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                   |
| :------ | :--------- | :------------------------------------------------------- | :---------------------------------------- |
| 0.1.1   | 2023-02-21 | [xxx](https://github.com/airbytehq/airbyte/pull/xxx)     | Fix the build                             |
| 0.1.0   | 2023-01-?? | [21200](https://github.com/airbytehq/airbyte/pull/21200) | Initial version of the Exasol destination |

</details>
