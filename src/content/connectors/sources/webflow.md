---
generated_record: true
connector_name: Webflow
connector_type: source
connector_slug: webflow
connector_directory: source-webflow
definition_id: ef580275-d9a9-48bb-af5e-db0f5855be04
version: 0.1.46
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/webflow
logo: /images/connectors/sources/webflow.svg
logo_source_path: airbyte-integrations/connectors/source-webflow/icon.svg
logo_sha256: 8165430f780d8bffeb35959f90c419f9a6a9cf010b0d87a5292a058adc407750
original_metadata_path: airbyte-integrations/connectors/source-webflow/metadata.yaml
original_metadata_sha256: e34790b9beec04ab39d3debf26e3b321172ae5dd5bcdd5de2bff0bbc11bd3baf
original_document_path: docs/integrations/sources/webflow.md
original_document_sha256: c8c3ff81a5dc63f87dd61180d5cfdf2250573cf88069b5d6bf3fc4a05a734a23
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: e9120d3884e2401c37c06f19ec82f7821272d83504d707b59a8230e4c2aa1871
rewritten_at: 2026-11-12T14:00:28.002863+00:00
---

---
description: 'Extracts "collections" from Webflow'
---

# Webflow

:::warning
This connector uses the Webflow v1 API, which Webflow deprecated on March 31, 2025. The v1 API may still work, but Webflow no longer maintains, updates or supports it. For more information, see the [Webflow v1 API Deprecation Notice](https://developers.webflow.com/data/docs/webflow-v1-api-deprecation-notice).
:::

Webflow is a CMS for publishing websites and blogs. This connector returns data available through [Webflow APIs](https://developers.webflow.com/).

Webflow stores different kinds of information in [Collections](https://developers.webflow.com/data/reference/cms). A collection can contain "Blog Posts" or "Blog Authors", for example. Collection names aren't predefined, and the number of collections isn't known in advance. Each collection may also have a different schema.

This connector identifies the available collections dynamically. It creates each collection's schema using data extracted from Webflow. It also creates an [Airbyte Stream](https://docs.airbyte.com/connector-development/cdk-python/full-refresh-stream/) for each collection.

## Webflow credentials

You can create a Webflow `API key`, also called `API token`, as described in [Intro to the Webflow API](https://university.webflow.com/lesson/intro-to-the-webflow-api). This connector uses the Webflow v1 API and requires a legacy v1 API key. Webflow has stopped creating new v1 API Site Tokens, so you must use an existing v1 token.

Once you have the `API Key`/`API token`, run the following command to confirm a [list of available sites](https://developers.webflow.com/#sites) and get its `_id`:

```
curl https://api.webflow.com/sites \
  -H "Authorization: Bearer <your API Key>" \
  -H "accept-version: 1.0.0"
```

You should receive a response similar to:

```
[{"_id":"<redacted>","createdOn":"2021-03-26T15:46:04.032Z","name":"Airbyte","shortName":"airbyte-dev","lastPublished":"2022-06-09T12:55:52.533Z","previewUrl":"https://screenshots.webflow.com/sites/<redacted>","timezone":"America/Los_Angeles","database":"<redacted>"}]
```

Provide the `Site ID` and `API key` so the Webflow connector can pull data from your Webflow site.

## Related tutorial

To learn more about the Webflow API and this connector's implementation, see the [tutorial about how to build a connector to extract data from the Webflow API](https://airbyte.com/tutorials/extract-data-from-the-webflow-api).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                |
| :------ | :--------- | :------------------------------------------------------- | :--------------------------------------------------------------------- |
| 0.1.46 | 2025-05-24 | [59994](https://github.com/airbytehq/airbyte/pull/59994) | Update dependencies |
| 0.1.45 | 2025-05-04 | [58958](https://github.com/airbytehq/airbyte/pull/58958) | Update dependencies |
| 0.1.44 | 2025-04-19 | [58556](https://github.com/airbytehq/airbyte/pull/58556) | Update dependencies |
| 0.1.43 | 2025-04-12 | [58011](https://github.com/airbytehq/airbyte/pull/58011) | Update dependencies |
| 0.1.42 | 2025-04-05 | [57370](https://github.com/airbytehq/airbyte/pull/57370) | Update dependencies |
| 0.1.41 | 2025-03-29 | [56853](https://github.com/airbytehq/airbyte/pull/56853) | Update dependencies |
| 0.1.40 | 2025-03-22 | [56285](https://github.com/airbytehq/airbyte/pull/56285) | Update dependencies |
| 0.1.39 | 2025-03-08 | [55612](https://github.com/airbytehq/airbyte/pull/55612) | Update dependencies |
| 0.1.38 | 2025-03-01 | [55156](https://github.com/airbytehq/airbyte/pull/55156) | Update dependencies |
| 0.1.37 | 2025-02-22 | [54505](https://github.com/airbytehq/airbyte/pull/54505) | Update dependencies |
| 0.1.36 | 2025-02-15 | [54076](https://github.com/airbytehq/airbyte/pull/54076) | Update dependencies |
| 0.1.35 | 2025-02-01 | [53089](https://github.com/airbytehq/airbyte/pull/53089) | Update dependencies |
| 0.1.34 | 2025-01-25 | [52435](https://github.com/airbytehq/airbyte/pull/52435) | Update dependencies |
| 0.1.33 | 2025-01-18 | [52027](https://github.com/airbytehq/airbyte/pull/52027) | Update dependencies |
| 0.1.32 | 2025-01-11 | [51437](https://github.com/airbytehq/airbyte/pull/51437) | Update dependencies |
| 0.1.31 | 2024-12-28 | [50811](https://github.com/airbytehq/airbyte/pull/50811) | Update dependencies |
| 0.1.30 | 2024-12-21 | [50367](https://github.com/airbytehq/airbyte/pull/50367) | Update dependencies |
| 0.1.29 | 2024-12-14 | [49759](https://github.com/airbytehq/airbyte/pull/49759) | Update dependencies |
| 0.1.28 | 2024-12-12 | [49391](https://github.com/airbytehq/airbyte/pull/49391) | Update dependencies |
| 0.1.27 | 2024-11-25 | [48643](https://github.com/airbytehq/airbyte/pull/48643) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.26 | 2024-10-29 | [47871](https://github.com/airbytehq/airbyte/pull/47871) | Update dependencies |
| 0.1.25 | 2024-10-28 | [47102](https://github.com/airbytehq/airbyte/pull/47102) | Update dependencies |
| 0.1.24 | 2024-10-12 | [46854](https://github.com/airbytehq/airbyte/pull/46854) | Update dependencies |
| 0.1.23 | 2024-10-05 | [46410](https://github.com/airbytehq/airbyte/pull/46410) | Update dependencies |
| 0.1.22 | 2024-09-28 | [46194](https://github.com/airbytehq/airbyte/pull/46194) | Update dependencies |
| 0.1.21 | 2024-09-21 | [45729](https://github.com/airbytehq/airbyte/pull/45729) | Update dependencies |
| 0.1.20 | 2024-09-14 | [45296](https://github.com/airbytehq/airbyte/pull/45296) | Update dependencies |
| 0.1.19 | 2024-08-31 | [45040](https://github.com/airbytehq/airbyte/pull/45040) | Update dependencies |
| 0.1.18 | 2024-08-24 | [44724](https://github.com/airbytehq/airbyte/pull/44724) | Update dependencies |
| 0.1.17 | 2024-08-17 | [44347](https://github.com/airbytehq/airbyte/pull/44347) | Update dependencies |
| 0.1.16 | 2024-08-10 | [43620](https://github.com/airbytehq/airbyte/pull/43620) | Update dependencies |
| 0.1.15 | 2024-08-03 | [43240](https://github.com/airbytehq/airbyte/pull/43240) | Update dependencies |
| 0.1.14 | 2024-07-27 | [42646](https://github.com/airbytehq/airbyte/pull/42646) | Update dependencies |
| 0.1.13 | 2024-07-20 | [42297](https://github.com/airbytehq/airbyte/pull/42297) | Update dependencies |
| 0.1.12 | 2024-07-13 | [41690](https://github.com/airbytehq/airbyte/pull/41690) | Update dependencies |
| 0.1.11 | 2024-07-10 | [41482](https://github.com/airbytehq/airbyte/pull/41482) | Update dependencies |
| 0.1.10 | 2024-07-09 | [41280](https://github.com/airbytehq/airbyte/pull/41280) | Update dependencies |
| 0.1.9 | 2024-07-06 | [40996](https://github.com/airbytehq/airbyte/pull/40996) | Update dependencies |
| 0.1.8 | 2024-06-26 | [40549](https://github.com/airbytehq/airbyte/pull/40549) | Migrate off deprecated auth package |
| 0.1.7 | 2024-06-25 | [40259](https://github.com/airbytehq/airbyte/pull/40259) | Update dependencies |
| 0.1.6 | 2024-06-22 | [40009](https://github.com/airbytehq/airbyte/pull/40009) | Update dependencies |
| 0.1.5 | 2024-06-06 | [39151](https://github.com/airbytehq/airbyte/pull/39151) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.4 | 2024-05-21 | [38498](https://github.com/airbytehq/airbyte/pull/38498) | [autopull] base image + poetry + up_to_date |
| 0.1.3 | 2022-12-11 | [33315](https://github.com/airbytehq/airbyte/pull/33315) | Updates CDK to latest version and adds additional properties to schema |
| 0.1.2 | 2022-07-14 | [14689](https://github.com/airbytehq/airbyte/pull/14689) | Webflow added IDs to streams |
| 0.1.1 | 2022-06-22 | [13617](https://github.com/airbytehq/airbyte/pull/13617) | Updates Spec Documentation URL |
| 0.1.0 | 2022-06-22 | [13617](https://github.com/airbytehq/airbyte/pull/13617) | Initial release |

</details>
