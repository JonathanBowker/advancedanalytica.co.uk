---
generated_record: true
connector_name: ElasticSearch
connector_type: destination
connector_slug: elasticsearch
connector_directory: destination-elasticsearch-strict-encrypt
definition_id: 68f351a7-2745-4bef-ad7f-996b8e51bb8c
version: 0.2.0
support_level: null
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/elasticsearch
logo: /images/connectors/destinations/elasticsearch--destination-elasticsearch-strict-encrypt.svg
logo_source_path: airbyte-integrations/connectors/destination-elasticsearch-strict-encrypt/icon.svg
logo_sha256: 6b141da978e2cd8bc1eca3ffe2b8abd0f232e4c693f068e3b93cdc4a6cb6b346
original_metadata_path: airbyte-integrations/connectors/destination-elasticsearch-strict-encrypt/metadata.yaml
original_metadata_sha256: c134b203e5c8478d51301869c64d640b8e7d5d1425429e1f19ba2cfadccbcb11
original_document_path: docs/integrations/destinations/elasticsearch.md
original_document_sha256: 68be0ccbeef464412914e2ff7053ba9bb1b8f11714c69fe999e352b407aa196b
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 38afda95bf576b1ae6144315363f1e7cfa9cdc3b51fd0587b622638804db8721
rewritten_at: 2026-11-12T13:24:05.724564+00:00
---

# Elasticsearch

## Sync overview

### Output schema

Elasticsearch is a Lucene-based search engine and a type of NoSQL storage.  
It creates documents in an `index`, similar to a `table` in a relational database.

The output schema matches the source's input schema.
Each source `stream` becomes a destination `index`.  
For example, with a relational database source:  
The database table name maps to the destination index.
The database table columns become fields in the destination document.  
Each row becomes a document in the destination index.

### Data type mapping

[See Elastic documentation for detailed information about the field types](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)
This section should map each connector data type to an Airbyte type. Airbyte currently uses the same types as [JSONSchema](https://json-schema.org/understanding-json-schema/reference/index.html). `string`, `date-time`, `object`, `array`, `boolean`, `integer`, and `number` are the most common data types.

| Integration Type | Airbyte Type | Notes                                                                                     |
| :--------------- | :----------- | :---------------------------------------------------------------------------------------- |
| text             | string       | [more info](https://www.elastic.co/guide/en/elasticsearch/reference/current/text.html)    |
| date             | date-time    | [more info](https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html)    |
| object           | object       | [more info](https://www.elastic.co/guide/en/elasticsearch/reference/current/object.html)  |
| array            | array        | [more info](https://www.elastic.co/guide/en/elasticsearch/reference/current/array.html)   |
| boolean          | boolean      | [more info](https://www.elastic.co/guide/en/elasticsearch/reference/current/boolean.html) |
| numeric          | integer      | [more info](https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html)  |
| numeric          | number       | [more info](https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html)  |

### Performance

The connector uses batch or bulk writes. Large records may affect performance.  
The connector should support variable batch sizes in future.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started

### Requirements

- Elasticsearch >= 7.x
- Configuration
  - Endpoint URL [for example, https://elasticsearch.savantly.net:9423]
  - Username [optional] (basic auth)
  - Password [optional] (basic auth)
  - CA certificate [optional]
  - Api key ID [optional]
  - Api key secret [optional]
- If you use authentication, the user needs permission to create a missing index and/or `create` documents

### CA certificate

You can fetch the CA certificate from /usr/share/elasticsearch/config/certs/http_ca.crt on the Elasticsearch server.
For a Docker-based Elasticsearch deployment, use:
`docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .` where es01 is the container's name. For more details, visit https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

### Setup

Enter the endpoint URL and select an authentication method. Then choose whether to use 'upsert' when indexing new documents.

### Connect through an SSH tunnel

Airbyte can connect to an Elastic instance through an SSH tunnel.
You may need this connection when direct access is unavailable or conflicts with security policy. For example, the instance may lack a public IP address.

An SSH tunnel connects Airbyte to an intermediate server, also called a bastion server. This server has direct access to the Elastic instance.
Airbyte connects to the bastion, which then connects directly to the server.

This feature needs additional configuration when you create the source. The following steps explain each configuration setting.

1. Configure the source fields as usual, except `SSH Tunnel Method`.
2. `SSH Tunnel Method` defaults to `No Tunnel`, which means a direct connection. For an SSH tunnel, choose `SSH Key Authentication` or `Password Authentication`.
   1. Choose `Key Authentication` to use an RSA private key for the SSH tunnel. See below for information about generating this key.
   2. Choose `Password Authentication` to use a password for the SSH tunnel.
3. `SSH Tunnel Jump Server Host` identifies the intermediate bastion server that Airbyte connects to. Enter a hostname or IP address.
4. `SSH Connection Port` is the bastion server port for the SSH connection. The default SSH port is `22`. Use it unless you've changed the port.
5. `SSH Login Username` is the username Airbyte uses to connect to the bastion server. This isn't the TiDB username.
6. If you use `Password Authentication`, set `SSH Login Username` to the previous step's user password. If you use `SSH Key Authentication`, enter the OS user's password, not the TiDB password. Airbyte uses this OS user to run commands on the bastion.
7. If you use `SSH Key Authentication`, set `SSH Private Key` to the RSA private key for the SSH connection. Include the full key file contents, starting with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                               |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------ |
| 0.2.0 | 2025-05-14 | [58586](https://github.com/airbytehq/airbyte/pull/58586) | add path prefix |
| 0.1.6 | 2022-10-26 | [18341](https://github.com/airbytehq/airbyte/pull/18341) | enforce ssl connection on cloud |
| 0.1.5 | 2022-10-24 | [18177](https://github.com/airbytehq/airbyte/pull/18177) | add custom CA certificate processing |
| 0.1.4 | 2022-10-14 | [17805](https://github.com/airbytehq/airbyte/pull/17805) | add SSH Tunneling |
| 0.1.3 | 2022-05-30 | [14640](https://github.com/airbytehq/airbyte/pull/14640) | Include lifecycle management |
| 0.1.2 | 2022-04-19 | [11752](https://github.com/airbytehq/airbyte/pull/11752) | Reduce batch size to 32Mb |
| 0.1.1   | 2022-02-10 | [1256](https://github.com/airbytehq/airbyte/pull/1256)  | Add ExitOnOutOfMemoryError connectors |
| 0.1.0   | 2021-10-13 | [7005](https://github.com/airbytehq/airbyte/pull/7005)   | Initial release.                      |

</details>
