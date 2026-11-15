---
generated_record: true
connector_name: Pexels API
connector_type: source
connector_slug: pexels-api
connector_directory: source-pexels-api
definition_id: 69d9eb65-8026-47dc-baf1-e4bf67901fd6
version: 0.2.50
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pexels-api
logo: /images/connectors/sources/pexels-api.svg
logo_source_path: airbyte-integrations/connectors/source-pexels-api/icon.svg
logo_sha256: 5df6e8e14b7247ee102baaacc9391649e21701a5f9808c74c6a2cfb89dea4127
original_metadata_path: airbyte-integrations/connectors/source-pexels-api/metadata.yaml
original_metadata_sha256: 773020712d0569fb701264b4012fdce164564b13c9caa0962f23423cbadd73a4
original_document_path: docs/integrations/sources/pexels-api.md
original_document_sha256: c08169a40a65d8908cb6f05b3908d118facbf66265cbac3ed61db26c0b9b34ec
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: cc3311655af28e1bc982350f215dea3cc23e45819755a09c90fa64aa7ac67af7
rewritten_at: 2026-11-12T13:51:22.600740+00:00
---

# Pexels-API

Use this guide to set up the [Pexels-API](https://www.pexels.com/api/documentation) source connector and review its reference information.

## Prerequisites

This connector requires an API key. You can generate one free with a Gmail account at https://www.pexels.com/api/new/.
Enter the generated API key and any optional parameters to establish the connection.

## Setup guide

### Step 1: Set up your Pexels-API connection

- Generate an API key, for example, 12345.
- Params, if you need specific information.
- Available params:
  - query: Ocean, Tigers, Pears, etc. The default is people.
  - orientation: landscape, portrait or square. The default is landscape.
  - size: large, medium or small. The default is large.
  - color: red, orange, yellow, green, turquoise, blue, violet, pink, brown, black, grey, white or any hexadecimal colour code.
  - locale: en-US, pt-BR, es-ES, ca-ES, de-DE, it-IT, fr-FR, sv-SE, id-ID, pl-PL, ja-JP, zh-TW, zh-CN, ko-KR, th-TH, nl-NL, hu-HU, vi-VN, cs-CZ, da-DK, fi-FI, uk-UA, el-GR, ro-RO, nb-NO, sk-SK, tr-TR, ru-RU. The default is en-US.

## Step 2: Set up the Pexels-APIs connector in Airbyte

### Airbyte Cloud

1. Have a [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Sources**. Then, click **+new source** in the top-right corner.
3. On the Set up the source page, enter a name for the Pexels-API connector.
4. Select **Pexels-API** from the Source type dropdown, then enter your `api_key`.
5. If needed, enter the params configuration. Supported params are: query, orientation, size, color, locale, collection_id \
   video_id, photo_id
6. Click **Set up source**.

### Airbyte OSS

1. Open the Airbyte Open Source dashboard.
2. Enter a name for your source.
3. Enter your `api_key`.
4. If needed, enter the params configuration. Supported params are: query, orientation, size, color, locale, collection_id \
   video_id, photo_id
5. Click **Set up source**.

## Supported sync modes

The Pexels-API source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                       | Supported? |
| :---------------------------- | :--------- |
| Full Refresh Sync             | Yes        |
| Incremental Sync              | No         |
| Replicate Incremental Deletes | No         |
| SSL connection                | Yes        |
| Namespaces                    | No         |

## Supported streams

- photos_search
- photos_curated
- videos_search
- videos_popular
- collection_featured

## API method example

`GET https://api.pexels.com/v1/curated?per_page=1`

## Performance considerations

The Pexels-API [API reference]https://www.pexels.com/api/documentation) currently covers v1. v2 is in development. The connector uses v1 by default.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                            | Subject        |
| :------ | :--------- | :------------------------------------------------------ | :------------- |
| 0.2.50 | 2026-11-03 | [90920](https://github.com/airbytehq/airbyte/pull/90920) | Replace single-child `CompositeErrorHandler` wrappers with their `DefaultErrorHandler`; no behavior change. |
| 0.2.49 | 2026-11-10 | [91655](https://github.com/airbytehq/airbyte/pull/91655) | Update dependencies |
| 0.2.48 | 2026-11-03 | [90693](https://github.com/airbytehq/airbyte/pull/90693) | Update dependencies |
| 0.2.47 | 2026-10-27 | [90035](https://github.com/airbytehq/airbyte/pull/90035) | Update dependencies |
| 0.2.46 | 2026-10-20 | [89342](https://github.com/airbytehq/airbyte/pull/89342) | Update dependencies |
| 0.2.45 | 2026-10-13 | [88748](https://github.com/airbytehq/airbyte/pull/88748) | Update dependencies |
| 0.2.44 | 2026-10-06 | [87983](https://github.com/airbytehq/airbyte/pull/87983) | Update dependencies |
| 0.2.43 | 2026-09-29 | [87304](https://github.com/airbytehq/airbyte/pull/87304) | Update dependencies |
| 0.2.42 | 2026-09-22 | [78868](https://github.com/airbytehq/airbyte/pull/78868) | Update dependencies |
| 0.2.41 | 2025-11-25 | [69993](https://github.com/airbytehq/airbyte/pull/69993) | Update dependencies |
| 0.2.40 | 2025-11-18 | [69635](https://github.com/airbytehq/airbyte/pull/69635) | Update dependencies |
| 0.2.39 | 2025-10-29 | [68954](https://github.com/airbytehq/airbyte/pull/68954) | Update dependencies |
| 0.2.38 | 2025-10-21 | [68267](https://github.com/airbytehq/airbyte/pull/68267) | Update dependencies |
| 0.2.37 | 2025-10-14 | [67825](https://github.com/airbytehq/airbyte/pull/67825) | Update dependencies |
| 0.2.36 | 2025-10-07 | [67496](https://github.com/airbytehq/airbyte/pull/67496) | Update dependencies |
| 0.2.35 | 2025-10-01 | [66963](https://github.com/airbytehq/airbyte/pull/66963) | Update dependencies |
| 0.2.34 | 2025-09-23 | [66413](https://github.com/airbytehq/airbyte/pull/66413) | Update dependencies |
| 0.2.33 | 2025-09-09 | [65882](https://github.com/airbytehq/airbyte/pull/65882) | Update dependencies |
| 0.2.32 | 2025-08-23 | [65221](https://github.com/airbytehq/airbyte/pull/65221) | Update dependencies |
| 0.2.31 | 2025-08-09 | [64735](https://github.com/airbytehq/airbyte/pull/64735) | Update dependencies |
| 0.2.30 | 2025-08-02 | [64217](https://github.com/airbytehq/airbyte/pull/64217) | Update dependencies |
| 0.2.29 | 2025-07-26 | [63827](https://github.com/airbytehq/airbyte/pull/63827) | Update dependencies |
| 0.2.28 | 2025-07-19 | [63420](https://github.com/airbytehq/airbyte/pull/63420) | Update dependencies |
| 0.2.27 | 2025-07-12 | [63234](https://github.com/airbytehq/airbyte/pull/63234) | Update dependencies |
| 0.2.26 | 2025-07-05 | [62577](https://github.com/airbytehq/airbyte/pull/62577) | Update dependencies |
| 0.2.25 | 2025-06-28 | [62363](https://github.com/airbytehq/airbyte/pull/62363) | Update dependencies |
| 0.2.24 | 2025-06-21 | [61933](https://github.com/airbytehq/airbyte/pull/61933) | Update dependencies |
| 0.2.23 | 2025-06-14 | [60548](https://github.com/airbytehq/airbyte/pull/60548) | Update dependencies |
| 0.2.22 | 2025-05-10 | [60094](https://github.com/airbytehq/airbyte/pull/60094) | Update dependencies |
| 0.2.21 | 2025-05-04 | [59049](https://github.com/airbytehq/airbyte/pull/59049) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58479](https://github.com/airbytehq/airbyte/pull/58479) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57851](https://github.com/airbytehq/airbyte/pull/57851) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57350](https://github.com/airbytehq/airbyte/pull/57350) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56794](https://github.com/airbytehq/airbyte/pull/56794) | Update dependencies |
| 0.2.16 | 2025-03-22 | [56201](https://github.com/airbytehq/airbyte/pull/56201) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55543](https://github.com/airbytehq/airbyte/pull/55543) | Update dependencies |
| 0.2.14 | 2025-03-01 | [55034](https://github.com/airbytehq/airbyte/pull/55034) | Update dependencies |
| 0.2.13 | 2025-02-23 | [54572](https://github.com/airbytehq/airbyte/pull/54572) | Update dependencies |
| 0.2.12 | 2025-02-15 | [53990](https://github.com/airbytehq/airbyte/pull/53990) | Update dependencies |
| 0.2.11 | 2025-02-08 | [53477](https://github.com/airbytehq/airbyte/pull/53477) | Update dependencies |
| 0.2.10 | 2025-02-01 | [52990](https://github.com/airbytehq/airbyte/pull/52990) | Update dependencies |
| 0.2.9 | 2025-01-25 | [52533](https://github.com/airbytehq/airbyte/pull/52533) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51923](https://github.com/airbytehq/airbyte/pull/51923) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51374](https://github.com/airbytehq/airbyte/pull/51374) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50680](https://github.com/airbytehq/airbyte/pull/50680) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50274](https://github.com/airbytehq/airbyte/pull/50274) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49708](https://github.com/airbytehq/airbyte/pull/49708) | Update dependencies |
| 0.2.3 | 2024-12-12 | [49324](https://github.com/airbytehq/airbyte/pull/49324) | Update dependencies |
| 0.2.2 | 2024-12-11 | [47678](https://github.com/airbytehq/airbyte/pull/47678) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-15 | [44097](https://github.com/airbytehq/airbyte/pull/44097) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-12 | [43817](https://github.com/airbytehq/airbyte/pull/43817) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43057](https://github.com/airbytehq/airbyte/pull/43057) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42767](https://github.com/airbytehq/airbyte/pull/42767) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42204](https://github.com/airbytehq/airbyte/pull/42204) | Update dependencies |
| 0.1.10 | 2024-07-15 | [38930](https://github.com/airbytehq/airbyte/pull/38930) | Make compatible with builder |
| 0.1.9 | 2024-07-13 | [41932](https://github.com/airbytehq/airbyte/pull/41932) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41349](https://github.com/airbytehq/airbyte/pull/41349) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41077](https://github.com/airbytehq/airbyte/pull/41077) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40946](https://github.com/airbytehq/airbyte/pull/40946) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40490](https://github.com/airbytehq/airbyte/pull/40490) | Update dependencies |
| 0.1.4 | 2024-06-22 | [39971](https://github.com/airbytehq/airbyte/pull/39971) | Update dependencies |
| 0.1.3 | 2024-06-06 | [39216](https://github.com/airbytehq/airbyte/pull/39216) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.2 | 2024-05-21 | [38458](https://github.com/airbytehq/airbyte/pull/38458) | [autopull] base image + poetry + up_to_date |
| 0.1.1 | 2024-05-21 | [38458](https://github.com/airbytehq/airbyte/pull/38458) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-11-02 | [Init](https://github.com/airbytehq/airbyte/pull/18854)  | Initial commit |

</details>
