---
generated_record: true
connector_name: Fauna
connector_type: source
connector_slug: fauna
connector_directory: source-fauna
definition_id: 3825db3e-c94b-42ac-bd53-b5a9507ace2b
version: 0.1.10
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/fauna
logo: /images/connectors/sources/fauna.svg
logo_source_path: airbyte-integrations/connectors/source-fauna/icon.svg
logo_sha256: ac315b1911c6540c9e751b897c0bc002bd2abb6488f4961af66ae30726127412
original_metadata_path: airbyte-integrations/connectors/source-fauna/metadata.yaml
original_metadata_sha256: 5cf1c534a062f4d4b6abd0af9d7cf47ff58e10ffdad8ff57450df4fbb14762d1
original_document_path: docs/integrations/sources/fauna.md
original_document_sha256: 13c1e1a681a4ca955cb760cfaed825b4c6b4121684c420bb9f30636f6f749f39
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: fe7b62bd6aecf2c7fc582d92eea429b1b8ab4ee4eb99cb03445c7f0d1a352762
rewritten_at: 2026-11-12T13:37:17.071755+00:00
---

# Fauna

:::warning

## Deprecation

You can no longer use the archived Fauna source connector in Airbyte. Fauna shut down its database service on May 30, 2025. See [Fauna announcement](https://fauna.com/blog/the-future-of-fauna). The connector can’t sync data because its API, including `db.fauna.com` and the regional endpoints, no longer exists.

### Recommended actions

Fauna hasn’t published a hosted replacement for the service. If you migrated your data, use the connector for its new platform. If needed, build a [custom connector](https://docs.airbyte.com/connector-development/).

:::

This page shows you how to set up a [Fauna](https://fauna.com/) source.

## Overview

The Fauna source supports these sync modes:

- **Full Sync** - exports all data from a Fauna collection.
- **Incremental Sync** - exports data incrementally from a Fauna collection.

Create a separate source for each collection you want to export.

## Initial setup

Enter the domain of the collection’s database you’re exporting. You can find the URL in [the docs](https://docs.fauna.com/fauna/current/learn/understanding/region_groups#how-to-use-region-groups).

## Full sync

Follow these steps to run a full sync for this connection.

1. Create a role that can read the collection you’re exporting. Create the role in [Dashboard](https://dashboard.fauna.com/) or [fauna shell](https://github.com/fauna/fauna-shell) using this query:

```javascript
CreateRole({
  name: "airbyte-readonly",
  privileges: [
    {
      resource: Collections(),
      actions: { read: true },
    },
    {
      resource: Indexes(),
      actions: { read: true },
    },
    {
      resource: Collection("COLLECTION_NAME"),
      actions: { read: true },
    },
  ],
});
```

Replace `COLLECTION_NAME` with the collection name configured for this connector. To sync multiple collections, add an entry for each additional collection. For example, use this query to sync `users` and `products`:

```javascript
CreateRole({
  name: "airbyte-readonly",
  privileges: [
    {
      resource: Collections(),
      actions: { read: true },
    },
    {
      resource: Indexes(),
      actions: { read: true },
    },
    {
      resource: Collection("users"),
      actions: { read: true },
    },
    {
      resource: Collection("products"),
      actions: { read: true },
    },
  ],
});
```

2. Create a key with that role using this query:

```javascript
CreateKey({
  name: "airbyte-readonly",
  role: Role("airbyte-readonly"),
});
```

3. Copy the `secret` output from the `CreateKey` command. Enter it as the "Fauna Secret" on the left.
   **Important**: The secret appears only once. If you lose it, you’ll need to create a new key.

## Incremental sync

Follow these steps to run incremental syncs for this connection.

1. Create the "Incremental Sync Index" so the connector can run incremental syncs. Create the index with [fauna shell](https://github.com/fauna/fauna-shell) or in [Dashboard](https://dashboard.fauna.com/) using this query:

```javascript
CreateIndex({
  name: "INDEX_NAME",
  source: Collection("COLLECTION_NAME"),
  terms: [],
  values: [{ field: "ts" }, { field: "ref" }],
});
```

Replace `COLLECTION_NAME` with the collection name configured for this connector.
Replace `INDEX_NAME` with the name configured for the Incremental Sync Index.

Repeat this step for each collection you want to sync.

2. Create a role that can read the collection, index and metadata for all indexes. The role needs index metadata access to validate the index settings. Create it using this query:

```javascript
CreateRole({
  name: "airbyte-readonly",
  privileges: [
    {
      resource: Collections(),
      actions: { read: true },
    },
    {
      resource: Indexes(),
      actions: { read: true },
    },
    {
      resource: Collection("COLLECTION_NAME"),
      actions: { read: true },
    },
    {
      resource: Index("INDEX_NAME"),
      actions: { read: true },
    },
  ],
});
```

Replace `COLLECTION_NAME` with the collection name configured for this connector.
Replace `INDEX_NAME` with the name configured for the Incremental Sync Index.

To sync multiple collections, add an entry for each collection and index. For example, use this query to sync `users` and `products` with Incremental Sync:

```javascript
CreateRole({
  name: "airbyte-readonly",
  privileges: [
    {
      resource: Collections(),
      actions: { read: true },
    },
    {
      resource: Indexes(),
      actions: { read: true },
    },
    {
      resource: Collection("users"),
      actions: { read: true },
    },
    {
      resource: Index("users-ts"),
      actions: { read: true },
    },
    {
      resource: Collection("products"),
      actions: { read: true },
    },
    {
      resource: Index("products-ts"),
      actions: { read: true },
    },
  ],
});
```

3. Create a key with that role using this query:

```javascript
CreateKey({
  name: "airbyte-readonly",
  role: Role("airbyte-readonly"),
});
```

4. Copy the `secret` output from the `CreateKey` command. Enter it as the "Fauna Secret" on the left.
   **Important**: The secret appears only once. If you lose it, you’ll need to create a new key.

## Export formats

This section covers every export format for special-case data stored in Fauna. The list is exhaustive.

The exported database’s `ref` column contains only the document ID from each document’s reference, or "ref". Each connector configuration includes one collection. The document ID therefore refers to a document in the synced collection.

| Fauna Type                                                                          | Format                                                              | Note                                        |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------- |
| [Document Ref](https://docs.fauna.com/fauna/current/learn/understanding/types#ref)  | `{ id: "id", "collection": "collection-name", "type": "document" }` |                                             |
| [Other Ref](https://docs.fauna.com/fauna/current/learn/understanding/types#ref)     | `{ id: "id", "type": "ref-type" }`                                  | This includes all other refs, listed below. |
| [Byte Array](https://docs.fauna.com/fauna/current/learn/understanding/types#byte)   | base64 url formatting                                               |                                             |
| [Timestamp](https://docs.fauna.com/fauna/current/learn/understanding/types#date)    | date-time, or an iso-format timestamp                               |                                             |
| [Query, SetRef](https://docs.fauna.com/fauna/current/learn/understanding/types#set) | a string containing the wire protocol of this value                 | The wire protocol is not documented.        |

### Ref types

Each ref is serialised as a JSON object with 2 or 3 fields, as listed above. The `type` field must contain one of these strings:

| Reference Type                                                                          | `type` string       |
| --------------------------------------------------------------------------------------- | ------------------- |
| Document                                                                                | `"document"`        |
| [Collection](https://docs.fauna.com/fauna/current/api/fql/functions/collection)         | `"collection"`      |
| [Database](https://docs.fauna.com/fauna/current/api/fql/functions/database)             | `"database"`        |
| [Index](https://docs.fauna.com/fauna/current/api/fql/functions/iindex)                  | `"index"`           |
| [Function](https://docs.fauna.com/fauna/current/api/fql/functions/function)             | `"function"`        |
| [Role](https://docs.fauna.com/fauna/current/api/fql/functions/role)                     | `"role"`            |
| [AccessProvider](https://docs.fauna.com/fauna/current/api/fql/functions/accessprovider) | `"access_provider"` |
| [Key](https://docs.fauna.com/fauna/current/api/fql/functions/keys)                      | `"key"`             |
| [Token](https://docs.fauna.com/fauna/current/api/fql/functions/tokens)                  | `"token"`           |
| [Credential](https://docs.fauna.com/fauna/current/api/fql/functions/credentials)        | `"credential"`      |

For all other refs, such as a stored `Collections()` result, `type` must be `"unknown"`. A specific collection ref, retrieved with `Collection("name")`, differs from the reference to all collections, retrieved with `Collections()`. Therefore, `type` is `"unknown"` for `Collections()`, but not for `Collection("name")`.

To select the document ID from a ref, add `"id"` to the additional column’s "Path". For example, change the "Path" from `["data", "parent"]` to `["data", "parent", "id"]`.

To select the collection name, add `"collection", "id"` to the additional column’s "Path". For example, change the "Path" from `["data", "parent"]` to `["data", "parent", "collection", "id"]`. This uses the FQL [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) internally.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                         |
| ------- | ---------- | -------------------------------------------------------- | ------------------------------- |
| 0.1.10 | 2026-10-07 | [88305](https://github.com/airbytehq/airbyte/pull/88305) | Archive connector: Fauna shut down its service on 2025-05-30 |
| 0.1.9 | 2025-05-10 | [59992](https://github.com/airbytehq/airbyte/pull/59992) | Update dependencies |
| 0.1.8 | 2025-05-03 | [59430](https://github.com/airbytehq/airbyte/pull/59430) | Update dependencies |
| 0.1.7 | 2025-04-26 | [58913](https://github.com/airbytehq/airbyte/pull/58913) | Update dependencies |
| 0.1.6 | 2025-04-12 | [57799](https://github.com/airbytehq/airbyte/pull/57799) | Update dependencies |
| 0.1.5 | 2025-04-05 | [57218](https://github.com/airbytehq/airbyte/pull/57218) | Update dependencies |
| 0.1.4 | 2025-03-29 | [56519](https://github.com/airbytehq/airbyte/pull/56519) | Update dependencies |
| 0.1.3 | 2025-03-22 | [55955](https://github.com/airbytehq/airbyte/pull/55955) | Update dependencies |
| 0.1.2 | 2024-07-10 | [41051](https://github.com/airbytehq/airbyte/pull/41051) | Migrate to poetry |
| 0.1.1 | 2022-12-12 | [20275](https://github.com/airbytehq/airbyte/pull/20275) | Fix index lookup with no values |
| 0.1.0 | 2022-11-17 | [15274](https://github.com/airbytehq/airbyte/pull/15274) | Add Fauna Source |

</details>
