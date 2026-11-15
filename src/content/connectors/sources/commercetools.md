---
generated_record: true
connector_name: Commercetools
connector_type: source
connector_slug: commercetools
connector_directory: source-commercetools
definition_id: 008b2e26-11a3-11ec-82a8-0242ac130003
version: 0.3.11
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/commercetools
logo: /images/connectors/sources/commercetools.svg
logo_source_path: airbyte-integrations/connectors/source-commercetools/icon.svg
logo_sha256: 38cc932cd52337389b8a67a32c8823176189df6dd56ea04ead5047d2306fbbf8
original_metadata_path: airbyte-integrations/connectors/source-commercetools/metadata.yaml
original_metadata_sha256: a8d814d161174e126ffa0e6f106e74d692a430f5d3bd7a737e1f578f4d732d39
original_document_path: docs/integrations/sources/commercetools.md
original_document_sha256: d325860cc8772824c2a89418978a2bfa78f383f8502d03a18ca1881af5d55c2f
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 357f62a716eb6158f0c8a839c881ab340654e5575326c569dd660e754629ba1d
rewritten_at: 2026-11-12T13:34:07.582856+00:00
---

# Commercetools

## Sync overview

The Commercetools source supports Full Refresh and Incremental syncs. You can copy only new or updated data. Alternatively, you can copy every row from the tables and columns configured for replication during each sync.

You can sync data for the [Commercetools API](https://docs.commercetools.com/api/).

### Output schema

You can sync these core Streams:

- [Customers](https://docs.commercetools.com/api/projects/customers)
- [Orders](https://docs.commercetools.com/api/projects/orders)
- [Products](https://docs.commercetools.com/api/projects/products)
- [DiscountCodes](https://docs.commercetools.com/api/projects/discountCodes)
- [Payments](https://docs.commercetools.com/api/projects/payments)

### Data type mapping

| Integration Type | Airbyte Type | Notes |
| :--------------- | :----------- | :---- |
| `string`         | `string`     |       |
| `number`         | `number`     |       |
| `array`          | `array`      |       |
| `object`         | `object`     |       |

### Features

| Feature                   | Supported?\(Yes/No\) | Notes |
| :------------------------ | :------------------- | :---- |
| Full Refresh Sync         | Yes                  |       |
| Incremental - Append Sync | Yes                  |       |
| Namespaces                | No                   |       |

### Performance considerations

Commercetools has some [rate limit restrictions](https://docs.commercetools.com/api/limits).

## Get started

1. Create an API Client in the admin interface.
2. Choose the API client scopes. Airbyte only needs read-level access.
   - Note: The UI shows all possible data sources. Sync errors appear if the client lacks permission to access a resource.
3. You'll need the store's `projectKey` and the generated `client_id` and `client_secret` for the integration.
4. You're ready to set up Commercetools in Airbyte.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access by IP, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                               |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------ |
| 0.3.11 | 2025-05-10 | [60035](https://github.com/airbytehq/airbyte/pull/60035) | Update dependencies |
| 0.3.10 | 2025-05-03 | [59424](https://github.com/airbytehq/airbyte/pull/59424) | Update dependencies |
| 0.3.9 | 2025-04-26 | [58914](https://github.com/airbytehq/airbyte/pull/58914) | Update dependencies |
| 0.3.8 | 2025-04-19 | [57809](https://github.com/airbytehq/airbyte/pull/57809) | Update dependencies |
| 0.3.7 | 2025-04-05 | [57239](https://github.com/airbytehq/airbyte/pull/57239) | Update dependencies |
| 0.3.6 | 2025-03-29 | [56537](https://github.com/airbytehq/airbyte/pull/56537) | Update dependencies |
| 0.3.5 | 2025-03-22 | [55911](https://github.com/airbytehq/airbyte/pull/55911) | Update dependencies |
| 0.3.4 | 2025-03-08 | [55281](https://github.com/airbytehq/airbyte/pull/55281) | Update dependencies |
| 0.3.3 | 2025-03-01 | [54930](https://github.com/airbytehq/airbyte/pull/54930) | Update dependencies |
| 0.3.2 | 2025-02-22 | [54396](https://github.com/airbytehq/airbyte/pull/54396) | Update dependencies |
| 0.3.1 | 2025-02-15 | [53765](https://github.com/airbytehq/airbyte/pull/53765) | Update dependencies |
| 0.3.0 | 2025-02-10 | [48564](https://github.com/airbytehq/airbyte/pull/48564) | fix schema date type parameter |
| 0.2.31 | 2025-02-01 | [52792](https://github.com/airbytehq/airbyte/pull/52792) | Update dependencies |
| 0.2.30 | 2025-01-25 | [52354](https://github.com/airbytehq/airbyte/pull/52354) | Update dependencies |
| 0.2.29 | 2025-01-18 | [51665](https://github.com/airbytehq/airbyte/pull/51665) | Update dependencies |
| 0.2.28 | 2025-01-11 | [51079](https://github.com/airbytehq/airbyte/pull/51079) | Update dependencies |
| 0.2.27 | 2025-01-04 | [50918](https://github.com/airbytehq/airbyte/pull/50918) | Update dependencies |
| 0.2.26 | 2024-12-28 | [50516](https://github.com/airbytehq/airbyte/pull/50516) | Update dependencies |
| 0.2.25 | 2024-12-21 | [50032](https://github.com/airbytehq/airbyte/pull/50032) | Update dependencies |
| 0.2.24 | 2024-12-12 | [49171](https://github.com/airbytehq/airbyte/pull/49171) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.23 | 2024-11-04 | [48186](https://github.com/airbytehq/airbyte/pull/48186) | Update dependencies |
| 0.2.22 | 2024-10-29 | [47859](https://github.com/airbytehq/airbyte/pull/47859) | Update dependencies |
| 0.2.21 | 2024-10-28 | [47112](https://github.com/airbytehq/airbyte/pull/47112) | Update dependencies |
| 0.2.20 | 2024-10-12 | [46779](https://github.com/airbytehq/airbyte/pull/46779) | Update dependencies |
| 0.2.19 | 2024-10-05 | [46497](https://github.com/airbytehq/airbyte/pull/46497) | Update dependencies |
| 0.2.18 | 2024-09-28 | [46103](https://github.com/airbytehq/airbyte/pull/46103) | Update dependencies |
| 0.2.17 | 2024-09-21 | [45778](https://github.com/airbytehq/airbyte/pull/45778) | Update dependencies |
| 0.2.16 | 2024-09-14 | [45552](https://github.com/airbytehq/airbyte/pull/45552) | Update dependencies |
| 0.2.15 | 2024-09-07 | [45287](https://github.com/airbytehq/airbyte/pull/45287) | Update dependencies |
| 0.2.14 | 2024-08-31 | [45022](https://github.com/airbytehq/airbyte/pull/45022) | Update dependencies |
| 0.2.13 | 2024-08-24 | [44744](https://github.com/airbytehq/airbyte/pull/44744) | Update dependencies |
| 0.2.12 | 2024-08-17 | [44209](https://github.com/airbytehq/airbyte/pull/44209) | Update dependencies |
| 0.2.11 | 2024-08-12 | [43770](https://github.com/airbytehq/airbyte/pull/43770) | Update dependencies |
| 0.2.10 | 2024-08-03 | [43131](https://github.com/airbytehq/airbyte/pull/43131) | Update dependencies |
| 0.2.9 | 2024-07-27 | [42673](https://github.com/airbytehq/airbyte/pull/42673) | Update dependencies |
| 0.2.8 | 2024-07-20 | [42330](https://github.com/airbytehq/airbyte/pull/42330) | Update dependencies |
| 0.2.7 | 2024-07-13 | [41849](https://github.com/airbytehq/airbyte/pull/41849) | Update dependencies |
| 0.2.6 | 2024-07-10 | [41396](https://github.com/airbytehq/airbyte/pull/41396) | Update dependencies |
| 0.2.5 | 2024-07-06 | [40781](https://github.com/airbytehq/airbyte/pull/40781) | Update dependencies |
| 0.2.4 | 2024-06-25 | [40418](https://github.com/airbytehq/airbyte/pull/40418) | Update dependencies |
| 0.2.3 | 2024-06-22 | [40198](https://github.com/airbytehq/airbyte/pull/40198) | Update dependencies |
| 0.2.2 | 2024-06-04 | [38995](https://github.com/airbytehq/airbyte/pull/38995) | [autopull] Upgrade base image to v1.2.1 |
| 0.2.1 | 2024-05-21 | [38522](https://github.com/airbytehq/airbyte/pull/38522) | [autopull] base image + poetry + up_to_date |
| 0.2.0 | 2023-08-24 | [29384](https://github.com/airbytehq/airbyte/pull/29384) | Migrate to low code |
| 0.1.1 | 2023-08-23 | [5957](https://github.com/airbytehq/airbyte/pull/5957) | Fix schemas |
| 0.1.0 | 2021-08-19 | [5957](https://github.com/airbytehq/airbyte/pull/5957) | Initial Release. Source Commercetools |

</details>
