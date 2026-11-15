---
generated_record: true
connector_name: Couchbase
connector_type: destination
connector_slug: couchbase
connector_directory: destination-couchbase
definition_id: 7312e2d5-3067-455c-ab45-c7f3a5c78003
version: 0.1.9
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/couchbase
logo: /images/connectors/destinations/couchbase.svg
logo_source_path: airbyte-integrations/connectors/destination-couchbase/icon.svg
logo_sha256: 2c454c26d34cdffdd64cb59ad448c7b0539dd5abe186480f89521f6086ed62fe
original_metadata_path: airbyte-integrations/connectors/destination-couchbase/metadata.yaml
original_metadata_sha256: cd4d12e247ea6e96bea701a024719b0c8ea7b76eab16534c4383fbaf13b14b06
original_document_path: docs/integrations/destinations/couchbase.md
original_document_sha256: 78be41e7b0fa5855e297c72b1cdba05761e909d080e14f030ffcc5cf876dce2e
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 929301ff19f42322f66f5d2e93a9204992c08e472ab3a3637149b6e04c241065
rewritten_at: 2026-11-12T13:23:13.511566+00:00
---

# Couchbase

Use this guide to set up the Couchbase destination connector and find reference information.

## Overview

You can sync data to Couchbase, a distributed NoSQL database. The connector writes each stream to a collection. It supports local clusters and Couchbase Capella, the cloud service.

### Output schema

The connector writes each stream to a Couchbase collection and maps data using these rules:

* The connector stores each record as a JSON document in Couchbase
* The stream name becomes the collection name, sanitised to meet Couchbase naming rules
* Each document contains:
  * `id`: A unique identifier, using a UUID or composite key for deduplication
  * `type`: Set to "airbyte_record"
  * `stream`: The source stream name
  * `data`: The record data

### Performance

* The connector uses batch operations to improve performance
* The connector automatically creates primary indexes for each collection
* For large datasets, consider using incremental sync modes
* Adjust the batch size if needed. The default is 1000 documents

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Get started

### Requirements

#### Local cluster requirements
1. Couchbase Server 7.0 or later installed
2. A bucket created in Couchbase
3. A username and password with these permissions:
   * Data Reader (`data_reader`)
   * Data Writer (`data_writer`)
   * Query Manager (`query_manage_index`)

#### Capella cloud requirements
1. A Couchbase Capella account
2. Database access credentials:
   * Database username
   * Database password
3. A bucket created in your Capella cluster
4. Allow-list the IP addresses that Airbyte will connect from

### Setup guide

#### Set up a local cluster

1. **Install Couchbase Server**
   * Download and install [Couchbase Server Community or Enterprise](https://www.couchbase.com/downloads/)
   * Follow the installation wizard for your platform
   * Open the web console at `http://localhost:8091`

2. **Create Resources**
   * In the Couchbase Web Console, go to "Buckets" and click "Add Bucket"
   * Enter these bucket details:
      * Name: mybucket
      * Memory Quota: Set an appropriate size (e.g. 100 MB)
      * Bucket Type: Couchbase
      * Click "Add Bucket" to create it

3. **Configure in Airbyte**
   * Connection String: Enter your Couchbase connection string (e.g. `couchbase://localhost`)
   * Username: Enter your database username (e.g. `airbyte_user`)
   * Password: Enter your database password (e.g. `your_secure_password`)
   * Bucket: Enter your bucket name (e.g. `my_bucket`)
   * Scope: Enter your scope name (defaults to `_default`)

#### Set up Capella

1. **Create Capella Resources**
   * Log in to [Couchbase Capella](https://cloud.couchbase.com)
   * Create a new database or use an existing one
   * Create a bucket for your data

2. **Create Database Credentials**
   * In Capella, go to "Security → Database Access"
   * Click "Create Database Credential"
   * Save the username and password

3. **Allow List IP Addresses**
   * In Capella, go to "Security → Network Security"
   * Add the IP addresses that Airbyte will connect from
   * [Get the IPs from Airbyte documentation](https://docs.airbyte.com/cloud/getting-started-with-airbyte-cloud#allowlist-ip-addresses)

4. **Get Connection Details**
   * In Capella, go to "Connect"
   * Copy the connection string

5. **Configure in Airbyte**
   * Connection String: Your Capella connection string
   * Username: Database username
   * Password: Database password
   * Bucket: Your bucket name
   * Scope: `_default` (or your custom scope)

### Connection configuration

| Parameter        | Description                                                                                     | Example                                            |
|:----------------|:------------------------------------------------------------------------------------------------|:--------------------------------------------------|
| Connection String| The connection string to your Couchbase cluster                                                  | `couchbase://localhost` or Capella connection string|
| Username        | Database username with required permissions                                                       | `airbyte`                                          |
| Password        | Database password                                                                                | `password`                                         |
| Bucket          | The name of the bucket to sync data to                                                          | `mybucket`                                         |
| Scope           | The scope within the bucket (optional, defaults to `_default`)                                   | `_default`                                         |

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

| Version | Date       | Pull Request                                             | Subject                                                                 |
|:--------|:-----------|:---------------------------------------------------------|:------------------------------------------------------------------------|
| 0.1.9 | 2025-05-24 | [60719](https://github.com/airbytehq/airbyte/pull/60719) | Update dependencies |
| 0.1.8 | 2025-05-10 | [59875](https://github.com/airbytehq/airbyte/pull/59875) | Update dependencies |
| 0.1.7 | 2025-05-03 | [59358](https://github.com/airbytehq/airbyte/pull/59358) | Update dependencies |
| 0.1.6 | 2025-04-26 | [58279](https://github.com/airbytehq/airbyte/pull/58279) | Update dependencies |
| 0.1.5 | 2025-04-12 | [57651](https://github.com/airbytehq/airbyte/pull/57651) | Update dependencies |
| 0.1.4 | 2025-04-05 | [57148](https://github.com/airbytehq/airbyte/pull/57148) | Update dependencies |
| 0.1.3 | 2025-03-29 | [56612](https://github.com/airbytehq/airbyte/pull/56612) | Update dependencies |
| 0.1.2 | 2025-03-22 | [56082](https://github.com/airbytehq/airbyte/pull/56082) | Update dependencies |
| 0.1.1 | 2025-03-08 | [55354](https://github.com/airbytehq/airbyte/pull/55354) | Update dependencies |
| 0.1.0   | 2024-01-20 | [#xxxxx](https://github.com/airbytehq/airbyte/pull/xxxxx) | Initial release of the Couchbase destination connector                   |
