---
generated_record: true
connector_name: Pocket
connector_type: source
connector_slug: pocket
connector_directory: source-pocket
definition_id: b0dd65f1-081f-4731-9c51-38e9e6aa0ebf
version: 0.2.38
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/pocket
logo: /images/connectors/sources/pocket.svg
logo_source_path: airbyte-integrations/connectors/source-pocket/icon.svg
logo_sha256: bbf2192c5a1898a2d2e27d9e07b8cc9eaedda54dd7b6a8ae02265f91b45234f3
original_metadata_path: airbyte-integrations/connectors/source-pocket/metadata.yaml
original_metadata_sha256: 5ea0d411e7e870bdb4e33fa80fa8bb9bbb77e65529baf6cc5a31528be9a58984
original_document_path: docs/integrations/sources/pocket.md
original_document_sha256: 5e1eec7f0e498b7530b65c7f7e7eb4645e3c910f5953819cb06ec665a97a32f6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9a6e667d3d98ddbf0cdad10fbfb4894411d6450ec657ab0c1ddf0ecb93e04bbe
rewritten_at: 2026-11-12T13:51:26.443192+00:00
---

# Pocket

:::warning

## Deprecation notice

You can no longer use the Pocket source connector in Airbyte. It has been archived and is no longer supported.

Mozilla shut down Pocket on July 8, 2025. User data exports remained available until October 8, 2025, when all accounts were deleted.

The connector relies on the Pocket v3 API (`https://getpocket.com/v3/get`). It now returns `502`/`503` ("Pocket temporarily unavailable") for every request.

The developer documentation at `https://getpocket.com/developer/` is also offline. As a result, the connector can't sync any data.

### Recommended actions

Pocket has no successor API. If you downloaded your Pocket data before October 8, 2025, you can load the CSV/HTML export using [File source](https://docs.airbyte.com/integrations/sources/file) or a custom connector. See the [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

## Overview

The Pocket source connector supports full refresh syncs only.

### Output schema

This source provides one output stream:

- [Retrieve](https://getpocket.com/developer/docs/v3/retrieve)

### Features

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |

### Performance considerations

For more information about rate limiting, see [Pocket Docs > Rate Limits](https://getpocket.com/developer/docs/rate-limits).

## Get started

### Requirements

- Consumer Key
- Access Token

### Setup guide

Follow the official [Pocket Authentication docs](https://getpocket.com/developer/docs/authentication) to get your Consumer Key and Access Token.

You can also follow James Mackenzie's recommended [this guide](https://www.jamesfmackenzie.com/getting-started-with-the-pocket-developer-api/), summarised below:

1. Create an App in the [Pocket Developer Portal](https://getpocket.com/developer/apps/new). Give it Retrieve permissions, then get your Consumer Key.
2. Get a temporary Request Token by sending a POST request. You can run the command below:

```sh
curl --insecure -X POST -H 'Content-Type: application/json' -H 'X-Accept: application/json' \
    https://getpocket.com/v3/oauth/request  -d '{"consumer_key":"REPLACE-ME","redirect_uri":"http://www.google.com"}'
```

3. Open the following website in your browser, then authorise the app: `https://getpocket.com/auth/authorize?request_token=REPLACE-ME&redirect_uri=http://www.google.com`
4. Convert your Request Token Into a Pocket Access Token. You can run the following command:

```sh
curl --insecure -X POST -H 'Content-Type: application/json' -H 'X-Accept: application/json' \
    https://getpocket.com/v3/oauth/authorize  -d '{"consumer_key":"REPLACE-ME","code":"REQUEST-TOKEN"}'
```

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                         |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.2.38 | 2026-10-07 | [88322](https://github.com/airbytehq/airbyte/pull/88322) | Archive connector: Mozilla shut down the Pocket service and its v3 API on 2025-07-08 |
| 0.2.37 | 2025-10-29 | [68933](https://github.com/airbytehq/airbyte/pull/68933) | Update dependencies |
| 0.2.36 | 2025-10-21 | [68277](https://github.com/airbytehq/airbyte/pull/68277) | Update dependencies |
| 0.2.35 | 2025-10-14 | [67842](https://github.com/airbytehq/airbyte/pull/67842) | Update dependencies |
| 0.2.34 | 2025-10-07 | [67490](https://github.com/airbytehq/airbyte/pull/67490) | Update dependencies |
| 0.2.33 | 2025-10-01 | [66420](https://github.com/airbytehq/airbyte/pull/66420) | Update dependencies |
| 0.2.32 | 2025-09-10 | [65872](https://github.com/airbytehq/airbyte/pull/65872) | Update dependencies |
| 0.2.31 | 2025-08-23 | [65226](https://github.com/airbytehq/airbyte/pull/65226) | Update dependencies |
| 0.2.30 | 2025-08-09 | [64736](https://github.com/airbytehq/airbyte/pull/64736) | Update dependencies |
| 0.2.29 | 2025-08-02 | [64252](https://github.com/airbytehq/airbyte/pull/64252) | Update dependencies |
| 0.2.28 | 2025-07-26 | [63895](https://github.com/airbytehq/airbyte/pull/63895) | Update dependencies |
| 0.2.27 | 2025-07-19 | [63403](https://github.com/airbytehq/airbyte/pull/63403) | Update dependencies |
| 0.2.26 | 2025-07-12 | [63223](https://github.com/airbytehq/airbyte/pull/63223) | Update dependencies |
| 0.2.25 | 2025-07-05 | [62599](https://github.com/airbytehq/airbyte/pull/62599) | Update dependencies |
| 0.2.24 | 2025-06-28 | [62327](https://github.com/airbytehq/airbyte/pull/62327) | Update dependencies |
| 0.2.23 | 2025-06-21 | [61901](https://github.com/airbytehq/airbyte/pull/61901) | Update dependencies |
| 0.2.22 | 2025-06-14 | [61030](https://github.com/airbytehq/airbyte/pull/61030) | Update dependencies |
| 0.2.21 | 2025-05-24 | [60434](https://github.com/airbytehq/airbyte/pull/60434) | Update dependencies |
| 0.2.20 | 2025-05-10 | [59510](https://github.com/airbytehq/airbyte/pull/59510) | Update dependencies |
| 0.2.19 | 2025-04-27 | [59074](https://github.com/airbytehq/airbyte/pull/59074) | Update dependencies |
| 0.2.18 | 2025-04-19 | [58470](https://github.com/airbytehq/airbyte/pull/58470) | Update dependencies |
| 0.2.17 | 2025-04-12 | [57924](https://github.com/airbytehq/airbyte/pull/57924) | Update dependencies |
| 0.2.16 | 2025-04-05 | [57316](https://github.com/airbytehq/airbyte/pull/57316) | Update dependencies |
| 0.2.15 | 2025-03-29 | [56219](https://github.com/airbytehq/airbyte/pull/56219) | Update dependencies |
| 0.2.14 | 2025-03-08 | [55551](https://github.com/airbytehq/airbyte/pull/55551) | Update dependencies |
| 0.2.13 | 2025-03-01 | [55016](https://github.com/airbytehq/airbyte/pull/55016) | Update dependencies |
| 0.2.12 | 2025-02-23 | [54594](https://github.com/airbytehq/airbyte/pull/54594) | Update dependencies |
| 0.2.11 | 2025-02-15 | [54018](https://github.com/airbytehq/airbyte/pull/54018) | Update dependencies |
| 0.2.10 | 2025-02-08 | [53457](https://github.com/airbytehq/airbyte/pull/53457) | Update dependencies |
| 0.2.9 | 2025-02-01 | [53006](https://github.com/airbytehq/airbyte/pull/53006) | Update dependencies |
| 0.2.8 | 2025-01-25 | [52462](https://github.com/airbytehq/airbyte/pull/52462) | Update dependencies |
| 0.2.7 | 2025-01-18 | [51887](https://github.com/airbytehq/airbyte/pull/51887) | Update dependencies |
| 0.2.6 | 2025-01-11 | [51366](https://github.com/airbytehq/airbyte/pull/51366) | Update dependencies |
| 0.2.5 | 2024-12-28 | [50740](https://github.com/airbytehq/airbyte/pull/50740) | Update dependencies |
| 0.2.4 | 2024-12-21 | [50282](https://github.com/airbytehq/airbyte/pull/50282) | Update dependencies |
| 0.2.3 | 2024-12-14 | [49671](https://github.com/airbytehq/airbyte/pull/49671) | Update dependencies |
| 0.2.2 | 2024-12-12 | [47783](https://github.com/airbytehq/airbyte/pull/47783) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47034](https://github.com/airbytehq/airbyte/pull/47034) | Update dependencies |
| 0.2.0 | 2024-10-21 | [47143](https://github.com/airbytehq/airbyte/pull/47143) | Migrate to manifest only format |
| 0.1.21 | 2024-10-12 | [46838](https://github.com/airbytehq/airbyte/pull/46838) | Update dependencies |
| 0.1.20 | 2024-10-05 | [46404](https://github.com/airbytehq/airbyte/pull/46404) | Update dependencies |
| 0.1.19 | 2024-09-28 | [46138](https://github.com/airbytehq/airbyte/pull/46138) | Update dependencies |
| 0.1.18 | 2024-09-21 | [45736](https://github.com/airbytehq/airbyte/pull/45736) | Update dependencies |
| 0.1.17 | 2024-09-14 | [45487](https://github.com/airbytehq/airbyte/pull/45487) | Update dependencies |
| 0.1.16 | 2024-09-07 | [45225](https://github.com/airbytehq/airbyte/pull/45225) | Update dependencies |
| 0.1.15 | 2024-08-31 | [44994](https://github.com/airbytehq/airbyte/pull/44994) | Update dependencies |
| 0.1.14 | 2024-08-24 | [44321](https://github.com/airbytehq/airbyte/pull/44321) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43116](https://github.com/airbytehq/airbyte/pull/43116) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42775](https://github.com/airbytehq/airbyte/pull/42775) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42385](https://github.com/airbytehq/airbyte/pull/42385) | Update dependencies |
| 0.1.10 | 2024-07-13 | [41923](https://github.com/airbytehq/airbyte/pull/41923) | Update dependencies |
| 0.1.9 | 2024-07-10 | [41457](https://github.com/airbytehq/airbyte/pull/41457) | Update dependencies |
| 0.1.8 | 2024-07-09 | [41294](https://github.com/airbytehq/airbyte/pull/41294) | Update dependencies |
| 0.1.7 | 2024-07-06 | [41001](https://github.com/airbytehq/airbyte/pull/41001) | Update dependencies |
| 0.1.6 | 2024-06-25 | [40308](https://github.com/airbytehq/airbyte/pull/40308) | Update dependencies |
| 0.1.5 | 2024-06-22 | [39957](https://github.com/airbytehq/airbyte/pull/39957) | Update dependencies |
| 0.1.4 | 2024-06-06 | [39298](https://github.com/airbytehq/airbyte/pull/39298) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.3 | 2024-04-19 | [37228](https://github.com/airbytehq/airbyte/pull/37228) | Upgrade to CDK 0.80.0 and manage dependencies with Poetry. |
| 0.1.2 | 2024-04-15 | [37228](https://github.com/airbytehq/airbyte/pull/37228) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.1 | 2024-04-12 | [37228](https://github.com/airbytehq/airbyte/pull/37228) | schema descriptions |
| 0.1.0 | 2022-10-30 | [18655](https://github.com/airbytehq/airbyte/pull/18655) | 🎉 New Source: Pocket |

</details>
