---
generated_record: true
connector_name: Couchbase
connector_type: source
connector_slug: couchbase
connector_directory: source-couchbase
definition_id: 8fa13fb7-2cf7-4c5e-9a91-bae6f71f1fb7
version: 0.1.10
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/couchbase
logo: /images/connectors/sources/couchbase.svg
logo_source_path: airbyte-integrations/connectors/source-couchbase/icon.svg
logo_sha256: 923834a5c2584df935315b983ed2a4c55ddf3660020b290552714a4c3dcf08ad
original_metadata_path: airbyte-integrations/connectors/source-couchbase/metadata.yaml
original_metadata_sha256: 60a6bc4e2b9025fe2fc0e5c9f6b08a827b14d84ba178a3f6033d50978d0cca13
original_document_path: docs/integrations/sources/couchbase.md
original_document_sha256: b772cbe9337b337552e39d824509e05617985af4b54a7dc719f3fe437830b34f
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d8536026661bc9467064d83eafd10ce1bb74556668619fc73d426b79f3d0498c
rewritten_at: 2026-11-12T13:34:41.141244+00:00
---

# Couchbase

Set up the Couchbase source connector and find its reference information on this page.

## Prerequisites

- Couchbase server version 7.0 or later, or a Couchbase Capella account
- Couchbase connection string
- Couchbase username and password

## Setup guide

### Step 1: Set up Couchbase

#### Option A: Couchbase Capella (Cloud)

1. Create a Couchbase Capella account:
   - Go to the [Couchbase Capella signup page](https://cloud.couchbase.com/sign-up).
   - Follow the prompts to create your account.

2. Create a Capella cluster:
   - Sign in to your Capella account.
   - Select "Create Cluster" in the dashboard.
   - Choose your cloud provider (AWS, Azure, or GCP) and your preferred deployment region.
   - Select the cluster size and configuration that meet your needs.
   - Select "Create Cluster" and wait for deployment to finish. This may take a few minutes.

3. Set up database access:
   - In the Capella UI, go to "Security" > "Database Access".
   - Select "Add User" to create a database user.
   - Enter a username and password for the new user.
   - Assign the appropriate roles for the buckets you want to replicate, such as "Data Reader" and "Data Writer".
   - Select "Save" to create the user.

4. Configure allowed IP ranges:
   - In the Capella UI, go to "Security" > "Allowed IP Addresses".
   - Select "Add Allowed IP".
   - Enter the IP address or CIDR range your Airbyte instance will connect from.
   - Add a description for the IP range, such as "Airbyte Connection".
   - Select "Add" to save the allowed IP range.

5. Get your cluster credentials:
   - In the Capella UI, open your cluster's "Connect" tab.
   - Find the connection string, which typically looks like: `couchbases://cb.<your-cluster-id>.cloud.couchbase.com`
   - Save this connection string. You'll need it to configure the Airbyte connector.

#### Option B: Self-hosted Couchbase

1. Make sure your Couchbase server, version 7.0 or later, is running.
2. Create a user with the permissions needed to access the data you want to replicate.

### Step 2: Set up the Couchbase connector in Airbyte

1. In the Airbyte UI, open the Sources page and select Couchbase from the available sources.
2. Enter a name for your source.
3. Enter the Couchbase connection string:
   - For Capella: Use the connection string from the "Connect" tab, such as `couchbases://cb.<your-cluster-id>.cloud.couchbase.com`.
   - For self-hosted: Use your server's connection string, such as `couchbase://localhost`.
4. Enter your Couchbase username and password. For Capella, use the credentials you created in Step 1.3.
5. Enter the name of the bucket you want to replicate.
6. Optional: Enter a JSON object containing additional properties to pass to the Couchbase client.

## Supported sync modes

You can use the following [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes) with the Couchbase source connector:

| Feature                       | Supported? |
|:------------------------------|:-----------|
| Full Refresh Sync             | Yes        |
| Incremental - Append Sync     | Yes        |
| Replicate Incremental Deletes | No         |
| CDC                           | No         |

## Supported streams

The Couchbase source connector replicates every collection in the specified bucket as an individual stream. It skips collections in the Couchbase-managed `_system` scope.

Each collection needs a primary index for SQL++ queries. During discovery, the connector attempts to create one (`CREATE PRIMARY INDEX IF NOT EXISTS ...`).

If the configured user can't manage indexes, create the primary index before syncing. Otherwise, the sync fails with a "No primary index is available" error.

## Performance considerations

Couchbase server or Couchbase Capella cluster capacity limits the connector's rate. Adjust the batch size and worker count for your server capacity and network conditions.

For Capella, consider your cluster's performance limits and pricing tier. You may need to upgrade when replicating large data volumes or requiring higher throughput.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

| Version | Date       | Pull Request                                             | Subject                                         |
|:--------|:-----------|:---------------------------------------------------------|:------------------------------------------------|
| 0.1.10 | 2026-10-07 | [88341](https://github.com/airbytehq/airbyte/pull/88341) | Fix image build (0.1.9 was never published); page documents by `META().id` instead of sorting whole collections in one query (fixes query timeouts / out-of-memory on large collections); clear config error when the primary index is missing; skip the `_system` scope |
| 0.1.9 | 2026-06-02 | [78669](https://github.com/airbytehq/airbyte/pull/78669) | Update dependencies |
| 0.1.8 | 2025-05-24 | [60362](https://github.com/airbytehq/airbyte/pull/60362) | Update dependencies |
| 0.1.7 | 2025-05-10 | [59945](https://github.com/airbytehq/airbyte/pull/59945) | Update dependencies |
| 0.1.6 | 2025-05-03 | [59406](https://github.com/airbytehq/airbyte/pull/59406) | Update dependencies |
| 0.1.5 | 2025-04-26 | [58855](https://github.com/airbytehq/airbyte/pull/58855) | Update dependencies |
| 0.1.4 | 2025-04-19 | [57810](https://github.com/airbytehq/airbyte/pull/57810) | Update dependencies |
| 0.1.3 | 2025-04-05 | [56552](https://github.com/airbytehq/airbyte/pull/56552) | Update dependencies |
| 0.1.2 | 2025-03-22 | [55965](https://github.com/airbytehq/airbyte/pull/55965) | Update dependencies |
| 0.1.1 | 2025-03-08 | [55324](https://github.com/airbytehq/airbyte/pull/55324) | Update dependencies |
| 0.1.0   | 2023-10-12 | [#45876](https://github.com/airbytehq/airbyte/pull/45876) | Initial release of Couchbase Source Connector |
