---
generated_record: true
connector_name: Akeneo
connector_type: source
connector_slug: akeneo
connector_directory: source-akeneo
definition_id: d6754ed7-dd8a-4a0a-a07e-e768fbac420c
version: 0.0.59
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/akeneo
logo: /images/connectors/sources/akeneo.svg
logo_source_path: airbyte-integrations/connectors/source-akeneo/icon.svg
logo_sha256: 735274a25da4bf40a30b81eb0537806b05807db4586cadc8c6aa34b566e86eaa
original_metadata_path: airbyte-integrations/connectors/source-akeneo/metadata.yaml
original_metadata_sha256: e405eff0ebfa4e141b79f55b19aa8b3502a328ced3af11a48615ed9bcd3e9078
original_document_path: docs/integrations/sources/akeneo.md
original_document_sha256: 3685c401b9b9450f1cce23a8101c00dcd6f0d74d5c314cc7e3c005b7437d139c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3ade3cb800e8a179882b053426c3b382fb6b9206881a37b6d2112d3caf012c44
rewritten_at: 2026-11-12T13:28:50.573514+00:00
---

# Akeneo
The Akeneo Airbyte connector synchronises data between Akeneo PIM (Product Information Management) and other platforms. You can extract, transform and load product information from Akeneo into your chosen data destination. This supports efficient product catalogue management and integration across systems. Bidirectional data flows help you keep product information accurate and current across sales channels.

## Configure the connector

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `host` | `string` | Host.  |  |
| `api_username` | `string` | API Username.  |  |
| `password` | `string` | password.  |  |
| `client_id` | `string` | Client ID.  |  |
| `secret` | `string` | Secret.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| products | uuid | DefaultPaginator | ✅ |  ❌  |
| categories  | code | DefaultPaginator | ✅ |  ❌  |
| families | code | DefaultPaginator | ✅ |  ❌  |
| family_variants | code | DefaultPaginator | ✅ |  ❌  |
| attributes | code | DefaultPaginator | ✅ |  ❌  |
| attribute_groups | code | DefaultPaginator | ✅ |  ❌  |
| association_types | code | DefaultPaginator | ✅ |  ❌  |
| channels | code | DefaultPaginator | ✅ |  ❌  |
| locales |  | DefaultPaginator | ✅ |  ❌  |
| currencies | code | DefaultPaginator | ✅ |  ❌  |
| measure_families | code | DefaultPaginator | ✅ |  ❌  |

## Allow IP addresses

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.59 | 2026-11-10 | [91351](https://github.com/airbytehq/airbyte/pull/91351) | Update dependencies |
| 0.0.58 | 2026-11-03 | [90444](https://github.com/airbytehq/airbyte/pull/90444) | Update dependencies |
| 0.0.57 | 2026-10-27 | [89811](https://github.com/airbytehq/airbyte/pull/89811) | Update dependencies |
| 0.0.56 | 2026-10-20 | [89098](https://github.com/airbytehq/airbyte/pull/89098) | Update dependencies |
| 0.0.55 | 2026-10-13 | [88531](https://github.com/airbytehq/airbyte/pull/88531) | Update dependencies |
| 0.0.54 | 2026-10-06 | [87759](https://github.com/airbytehq/airbyte/pull/87759) | Update dependencies |
| 0.0.53 | 2026-09-29 | [87058](https://github.com/airbytehq/airbyte/pull/87058) | Update dependencies |
| 0.0.52 | 2026-09-22 | [86518](https://github.com/airbytehq/airbyte/pull/86518) | Update dependencies |
| 0.0.51 | 2026-09-15 | [85940](https://github.com/airbytehq/airbyte/pull/85940) | Update dependencies |
| 0.0.50 | 2026-09-08 | [84478](https://github.com/airbytehq/airbyte/pull/84478) | Update dependencies |
| 0.0.49 | 2026-08-11 | [83828](https://github.com/airbytehq/airbyte/pull/83828) | Update dependencies |
| 0.0.48 | 2026-08-04 | [83380](https://github.com/airbytehq/airbyte/pull/83380) | Update dependencies |
| 0.0.47 | 2026-07-28 | [82809](https://github.com/airbytehq/airbyte/pull/82809) | Update dependencies |
| 0.0.46 | 2026-07-21 | [82325](https://github.com/airbytehq/airbyte/pull/82325) | Update dependencies |
| 0.0.45 | 2026-07-14 | [81716](https://github.com/airbytehq/airbyte/pull/81716) | Update dependencies |
| 0.0.44 | 2026-06-30 | [80969](https://github.com/airbytehq/airbyte/pull/80969) | Update dependencies |
| 0.0.43 | 2026-06-23 | [80372](https://github.com/airbytehq/airbyte/pull/80372) | Update dependencies |
| 0.0.42 | 2026-06-16 | [79753](https://github.com/airbytehq/airbyte/pull/79753) | Update dependencies |
| 0.0.41 | 2026-06-09 | [79204](https://github.com/airbytehq/airbyte/pull/79204) | Update dependencies |
| 0.0.40 | 2026-06-02 | [78602](https://github.com/airbytehq/airbyte/pull/78602) | Update dependencies |
| 0.0.39 | 2026-04-28 | [77137](https://github.com/airbytehq/airbyte/pull/77137) | Update dependencies |
| 0.0.38 | 2026-04-21 | [76508](https://github.com/airbytehq/airbyte/pull/76508) | Update dependencies |
| 0.0.37 | 2026-03-24 | [75347](https://github.com/airbytehq/airbyte/pull/75347) | Update dependencies |
| 0.0.36 | 2026-03-10 | [74536](https://github.com/airbytehq/airbyte/pull/74536) | Update dependencies |
| 0.0.35 | 2026-02-24 | [73763](https://github.com/airbytehq/airbyte/pull/73763) | Update dependencies |
| 0.0.34 | 2026-02-10 | [72996](https://github.com/airbytehq/airbyte/pull/72996) | Update dependencies |
| 0.0.33 | 2026-02-03 | [72634](https://github.com/airbytehq/airbyte/pull/72634) | Update dependencies |
| 0.0.32 | 2026-01-20 | [71989](https://github.com/airbytehq/airbyte/pull/71989) | Update dependencies |
| 0.0.31 | 2026-01-14 | [71504](https://github.com/airbytehq/airbyte/pull/71504) | Update dependencies |
| 0.0.30 | 2025-12-19 | [70940](https://github.com/airbytehq/airbyte/pull/70940) | Update dependencies |
| 0.0.29 | 2025-11-25 | [69932](https://github.com/airbytehq/airbyte/pull/69932) | Update dependencies |
| 0.0.28 | 2025-10-29 | [65644](https://github.com/airbytehq/airbyte/pull/65644) | Update dependencies |
| 0.0.27 | 2025-07-19 | [63483](https://github.com/airbytehq/airbyte/pull/63483) | Update dependencies |
| 0.0.26 | 2025-06-28 | [62151](https://github.com/airbytehq/airbyte/pull/62151) | Update dependencies |
| 0.0.25 | 2025-06-21 | [61098](https://github.com/airbytehq/airbyte/pull/61098) | Update dependencies |
| 0.0.24 | 2025-05-17 | [60691](https://github.com/airbytehq/airbyte/pull/60691) | Update dependencies |
| 0.0.23 | 2025-05-10 | [59887](https://github.com/airbytehq/airbyte/pull/59887) | Update dependencies |
| 0.0.22 | 2025-05-03 | [59341](https://github.com/airbytehq/airbyte/pull/59341) | Update dependencies |
| 0.0.21 | 2025-04-26 | [58731](https://github.com/airbytehq/airbyte/pull/58731) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58289](https://github.com/airbytehq/airbyte/pull/58289) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57594](https://github.com/airbytehq/airbyte/pull/57594) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57165](https://github.com/airbytehq/airbyte/pull/57165) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56585](https://github.com/airbytehq/airbyte/pull/56585) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56142](https://github.com/airbytehq/airbyte/pull/56142) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55422](https://github.com/airbytehq/airbyte/pull/55422) | Update dependencies |
| 0.0.14 | 2025-03-01 | [54901](https://github.com/airbytehq/airbyte/pull/54901) | Update dependencies |
| 0.0.13 | 2025-02-22 | [54253](https://github.com/airbytehq/airbyte/pull/54253) | Update dependencies |
| 0.0.12 | 2025-02-15 | [53899](https://github.com/airbytehq/airbyte/pull/53899) | Update dependencies |
| 0.0.11 | 2025-02-08 | [53402](https://github.com/airbytehq/airbyte/pull/53402) | Update dependencies |
| 0.0.10 | 2025-02-04 | [53151](https://github.com/airbytehq/airbyte/pull/53151) | fix typoe in manifest description |
| 0.0.9 | 2025-02-01 | [52924](https://github.com/airbytehq/airbyte/pull/52924) | Update dependencies |
| 0.0.8 | 2025-01-25 | [52200](https://github.com/airbytehq/airbyte/pull/52200) | Update dependencies |
| 0.0.7 | 2025-01-18 | [51763](https://github.com/airbytehq/airbyte/pull/51763) | Update dependencies |
| 0.0.6 | 2025-01-11 | [51285](https://github.com/airbytehq/airbyte/pull/51285) | Update dependencies |
| 0.0.5 | 2024-12-28 | [50454](https://github.com/airbytehq/airbyte/pull/50454) | Update dependencies |
| 0.0.4 | 2024-12-21 | [50160](https://github.com/airbytehq/airbyte/pull/50160) | Update dependencies |
| 0.0.3 | 2024-12-14 | [49558](https://github.com/airbytehq/airbyte/pull/49558) | Update dependencies |
| 0.0.2 | 2024-12-12 | [49011](https://github.com/airbytehq/airbyte/pull/49011) | Update dependencies |
| 0.0.1 | 2024-10-28 | | Initial release by [@parthiv11](https://github.com/parthiv11) via Connector Builder |

</details>
