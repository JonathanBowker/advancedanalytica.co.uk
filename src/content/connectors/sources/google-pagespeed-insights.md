---
generated_record: true
connector_name: Google PageSpeed Insights
connector_type: source
connector_slug: google-pagespeed-insights
connector_directory: source-google-pagespeed-insights
definition_id: 1e9086ab-ddac-4c1d-aafd-ba43ff575fe4
version: 0.2.68
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/google-pagespeed-insights
logo: /images/connectors/sources/google-pagespeed-insights.svg
logo_source_path: airbyte-integrations/connectors/source-google-pagespeed-insights/icon.svg
logo_sha256: da8d2b36fb178ecc1ecbf3ea5c4930af26f0599c2e63cd8d89ff5df8643e6d57
original_metadata_path: airbyte-integrations/connectors/source-google-pagespeed-insights/metadata.yaml
original_metadata_sha256: 82f0609ca9b713e8a617134e4f2c00717cb80e8d38f4e6d852379ddce78ca48a
original_document_path: docs/integrations/sources/google-pagespeed-insights.md
original_document_sha256: 408b2c24c2e4d2b527f4d389ac6edc60a5d71fa651dbbaf3c45a6ca247a93c6d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 7fd3bb86b8b408102b856389d69f6bd2887224e84dba55a9693b43b901226b16
rewritten_at: 2026-11-12T13:40:39.085982+00:00
---

# Google PageSpeed Insights

Set up the Google PageSpeed Insights source connector using this guide.

## Sync overview

## Prerequisites

- Your [Google PageSpeed `API Key`](https://developers.google.com/speed/docs/insights/v5/get-started#APIKey)

## Set up the source connector

1. Log in to your [Airbyte Cloud](https://cloud.airbyte.com/workspaces) or Airbyte Open Source account.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Google PageSpeed Insights** from the Source type dropdown.
4. Enter a name for your source.
5. For **API Key**, enter your [Google PageSpeed `API Key`](https://developers.google.com/speed/docs/insights/v5/get-started#APIKey).
6. For **URLs to analyse**, enter one or more URLs for PageSpeed Insights. Example: https://www.google.com.
7. For **Analyses Strategies**, enter "desktop", "mobile" or both to define the Analyses strategy.
8. For **Lighthouse Categories**, select one or more provided options. Some [Google Lighthouse documentation](https://developer.chrome.com/docs/lighthouse/overview/) also call categories "audits".
9. Click **Set up source**.

> **IMPORTANT:** Since 2022-12-13, the PageSpeed Insights API and this Airbyte Connector support URLs prefixed with "origin:", such as `origin:https://www.google.com`. This produces condensed, aggregated reports for the specified origin. See [this FAQ](https://developers.google.com/speed/docs/insights/faq). **However**: Official documentation no longer includes this option, so it could be deprecated at any time.

## Supported sync modes

The Google PageSpeed Insights source connector supports this [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh

## Supported streams

The Google PageSpeed Insights source connector supports this stream:

- [pagespeed](https://developers.google.com/speed/docs/insights/v5/get-started#cli): Full PageSpeed report for the selected URLs, Lighthouse categories and Analyses strategies.

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |

### Performance considerations

Without an API key, Google applies a strict, undocumented rate limit. This limit also depends on current global request volumes to the PageSpeed API. The connector retries requests using an exponential backoff interval.

With an API key, Google allows 25.000 queries daily and 240 queries each minute. Under normal usage, the connector shouldn't trigger these rate limits.
Use [Create an issue](https://github.com/airbytehq/airbyte/issues) if rate limit issues persist after automatic retries.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                                                         |
| :------ | :--------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 0.2.68 | 2026-11-03 | [90604](https://github.com/airbytehq/airbyte/pull/90604) | Update dependencies |
| 0.2.67 | 2026-10-27 | [89934](https://github.com/airbytehq/airbyte/pull/89934) | Update dependencies |
| 0.2.66 | 2026-10-20 | [89258](https://github.com/airbytehq/airbyte/pull/89258) | Update dependencies |
| 0.2.65 | 2026-10-13 | [88640](https://github.com/airbytehq/airbyte/pull/88640) | Update dependencies |
| 0.2.64 | 2026-10-06 | [87902](https://github.com/airbytehq/airbyte/pull/87902) | Update dependencies |
| 0.2.63 | 2026-09-29 | [87213](https://github.com/airbytehq/airbyte/pull/87213) | Update dependencies |
| 0.2.62 | 2026-09-22 | [86647](https://github.com/airbytehq/airbyte/pull/86647) | Update dependencies |
| 0.2.61 | 2026-09-15 | [86071](https://github.com/airbytehq/airbyte/pull/86071) | Update dependencies |
| 0.2.60 | 2026-09-08 | [85502](https://github.com/airbytehq/airbyte/pull/85502) | Update dependencies |
| 0.2.59 | 2026-08-18 | [84606](https://github.com/airbytehq/airbyte/pull/84606) | Update dependencies |
| 0.2.58 | 2026-08-11 | [83967](https://github.com/airbytehq/airbyte/pull/83967) | Update dependencies |
| 0.2.57 | 2026-08-04 | [83477](https://github.com/airbytehq/airbyte/pull/83477) | Update dependencies |
| 0.2.56 | 2026-07-28 | [82946](https://github.com/airbytehq/airbyte/pull/82946) | Update dependencies |
| 0.2.55 | 2026-07-21 | [82443](https://github.com/airbytehq/airbyte/pull/82443) | Update dependencies |
| 0.2.54 | 2026-07-14 | [81865](https://github.com/airbytehq/airbyte/pull/81865) | Update dependencies |
| 0.2.53 | 2026-06-30 | [81089](https://github.com/airbytehq/airbyte/pull/81089) | Update dependencies |
| 0.2.52 | 2026-06-23 | [80499](https://github.com/airbytehq/airbyte/pull/80499) | Update dependencies |
| 0.2.51 | 2026-06-16 | [79885](https://github.com/airbytehq/airbyte/pull/79885) | Update dependencies |
| 0.2.50 | 2026-06-09 | [79352](https://github.com/airbytehq/airbyte/pull/79352) | Update dependencies |
| 0.2.49 | 2026-06-02 | [78745](https://github.com/airbytehq/airbyte/pull/78745) | Update dependencies |
| 0.2.48 | 2026-04-28 | [77301](https://github.com/airbytehq/airbyte/pull/77301) | Update dependencies |
| 0.2.47 | 2026-04-21 | [76730](https://github.com/airbytehq/airbyte/pull/76730) | Update dependencies |
| 0.2.46 | 2026-03-31 | [75734](https://github.com/airbytehq/airbyte/pull/75734) | Update dependencies |
| 0.2.45 | 2026-03-17 | [74938](https://github.com/airbytehq/airbyte/pull/74938) | Update dependencies |
| 0.2.44 | 2026-02-24 | [73931](https://github.com/airbytehq/airbyte/pull/73931) | Update dependencies |
| 0.2.43 | 2026-02-17 | [73374](https://github.com/airbytehq/airbyte/pull/73374) | Update dependencies |
| 0.2.42 | 2026-02-10 | [73109](https://github.com/airbytehq/airbyte/pull/73109) | Update dependencies |
| 0.2.41 | 2026-02-03 | [72679](https://github.com/airbytehq/airbyte/pull/72679) | Update dependencies |
| 0.2.40 | 2026-01-20 | [71874](https://github.com/airbytehq/airbyte/pull/71874) | Update dependencies |
| 0.2.39 | 2026-01-14 | [71695](https://github.com/airbytehq/airbyte/pull/71695) | Update dependencies |
| 0.2.38 | 2025-12-18 | [70480](https://github.com/airbytehq/airbyte/pull/70480) | Update dependencies |
| 0.2.37 | 2025-11-25 | [70081](https://github.com/airbytehq/airbyte/pull/70081) | Update dependencies |
| 0.2.36 | 2025-11-18 | [69366](https://github.com/airbytehq/airbyte/pull/69366) | Update dependencies |
| 0.2.35 | 2025-11-04 | [68274](https://github.com/airbytehq/airbyte/pull/68274) | Update dependencies |
| 0.2.34 | 2025-10-14 | [68001](https://github.com/airbytehq/airbyte/pull/68001) | Update dependencies |
| 0.2.33 | 2025-10-07 | [67254](https://github.com/airbytehq/airbyte/pull/67254) | Update dependencies |
| 0.2.32 | 2025-09-30 | [66297](https://github.com/airbytehq/airbyte/pull/66297) | Update dependencies |
| 0.2.31 | 2025-09-09 | [66039](https://github.com/airbytehq/airbyte/pull/66039) | Update dependencies |
| 0.2.30 | 2025-08-23 | [65378](https://github.com/airbytehq/airbyte/pull/65378) | Update dependencies |
| 0.2.29 | 2025-08-09 | [64613](https://github.com/airbytehq/airbyte/pull/64613) | Update dependencies |
| 0.2.28 | 2025-08-02 | [64255](https://github.com/airbytehq/airbyte/pull/64255) | Update dependencies |
| 0.2.27 | 2025-07-26 | [63891](https://github.com/airbytehq/airbyte/pull/63891) | Update dependencies |
| 0.2.26 | 2025-07-19 | [63522](https://github.com/airbytehq/airbyte/pull/63522) | Update dependencies |
| 0.2.25 | 2025-07-12 | [63105](https://github.com/airbytehq/airbyte/pull/63105) | Update dependencies |
| 0.2.24 | 2025-07-05 | [62573](https://github.com/airbytehq/airbyte/pull/62573) | Update dependencies |
| 0.2.23 | 2025-06-28 | [62184](https://github.com/airbytehq/airbyte/pull/62184) | Update dependencies |
| 0.2.22 | 2025-06-21 | [61844](https://github.com/airbytehq/airbyte/pull/61844) | Update dependencies |
| 0.2.21 | 2025-06-14 | [61093](https://github.com/airbytehq/airbyte/pull/61093) | Update dependencies |
| 0.2.20 | 2025-05-24 | [60729](https://github.com/airbytehq/airbyte/pull/60729) | Update dependencies |
| 0.2.19 | 2025-05-10 | [59832](https://github.com/airbytehq/airbyte/pull/59832) | Update dependencies |
| 0.2.18 | 2025-05-03 | [58804](https://github.com/airbytehq/airbyte/pull/58804) | Update dependencies |
| 0.2.17 | 2025-04-19 | [58210](https://github.com/airbytehq/airbyte/pull/58210) | Update dependencies |
| 0.2.16 | 2025-04-12 | [57096](https://github.com/airbytehq/airbyte/pull/57096) | Update dependencies |
| 0.2.15 | 2025-03-29 | [56717](https://github.com/airbytehq/airbyte/pull/56717) | Update dependencies |
| 0.2.14 | 2025-03-22 | [56022](https://github.com/airbytehq/airbyte/pull/56022) | Update dependencies |
| 0.2.13 | 2025-03-08 | [55322](https://github.com/airbytehq/airbyte/pull/55322) | Update dependencies |
| 0.2.12 | 2025-03-01 | [54925](https://github.com/airbytehq/airbyte/pull/54925) | Update dependencies |
| 0.2.11 | 2025-02-22 | [54400](https://github.com/airbytehq/airbyte/pull/54400) | Update dependencies |
| 0.2.10 | 2025-02-15 | [53729](https://github.com/airbytehq/airbyte/pull/53729) | Update dependencies |
| 0.2.9 | 2025-02-08 | [52367](https://github.com/airbytehq/airbyte/pull/52367) | Update dependencies |
| 0.2.8 | 2025-01-18 | [51693](https://github.com/airbytehq/airbyte/pull/51693) | Update dependencies |
| 0.2.7 | 2025-01-11 | [51118](https://github.com/airbytehq/airbyte/pull/51118) | Update dependencies |
| 0.2.6 | 2024-12-28 | [50529](https://github.com/airbytehq/airbyte/pull/50529) | Update dependencies |
| 0.2.5 | 2024-12-21 | [50030](https://github.com/airbytehq/airbyte/pull/50030) | Update dependencies |
| 0.2.4 | 2024-12-14 | [49526](https://github.com/airbytehq/airbyte/pull/49526) | Update dependencies |
| 0.2.3 | 2024-12-12 | [49177](https://github.com/airbytehq/airbyte/pull/49177) | Update dependencies |
| 0.2.2 | 2024-12-11 | [47793](https://github.com/airbytehq/airbyte/pull/47793) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-15 | [44143](https://github.com/airbytehq/airbyte/pull/44143) | Refactor connector to manifest-only format |
| 0.1.17 | 2024-08-10 | [43617](https://github.com/airbytehq/airbyte/pull/43617) | Update dependencies |
| 0.1.16 | 2024-08-03 | [43130](https://github.com/airbytehq/airbyte/pull/43130) | Update dependencies |
| 0.1.15 | 2024-07-27 | [42770](https://github.com/airbytehq/airbyte/pull/42770) | Update dependencies |
| 0.1.14 | 2024-07-20 | [42319](https://github.com/airbytehq/airbyte/pull/42319) | Update dependencies |
| 0.1.13 | 2024-07-13 | [41706](https://github.com/airbytehq/airbyte/pull/41706) | Update dependencies |
| 0.1.12 | 2024-07-10 | [41591](https://github.com/airbytehq/airbyte/pull/41591) | Update dependencies |
| 0.1.11 | 2024-07-09 | [41155](https://github.com/airbytehq/airbyte/pull/41155) | Update dependencies |
| 0.1.10 | 2024-07-06 | [41011](https://github.com/airbytehq/airbyte/pull/41011) | Update dependencies |
| 0.1.9 | 2024-06-29 | [40439](https://github.com/airbytehq/airbyte/pull/40439) | Update dependencies |
| 0.1.8 | 2024-06-22 | [40104](https://github.com/airbytehq/airbyte/pull/40104) | Update dependencies |
| 0.1.7 | 2024-06-06 | [39272](https://github.com/airbytehq/airbyte/pull/39272) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.6 | 2024-05-21 | [38147](https://github.com/airbytehq/airbyte/pull/38147) | Make compatable with builder |
| 0.1.5 | 2024-04-19 | [37171](https://github.com/airbytehq/airbyte/pull/37171) | Updating to 0.80.0 CDK |
| 0.1.4 | 2024-04-18 | [37171](https://github.com/airbytehq/airbyte/pull/37171) | Manage dependencies with Poetry. |
| 0.1.3 | 2024-04-15 | [37171](https://github.com/airbytehq/airbyte/pull/37171) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 0.1.2 | 2024-04-12 | [37171](https://github.com/airbytehq/airbyte/pull/37171) | schema descriptions |
| 0.1.1   | 2023-05-25 | [#22287](https://github.com/airbytehq/airbyte/pull/22287) | 🐛 Fix URL pattern regex                                                        |
| 0.1.0   | 2022-11-26 | [#19813](https://github.com/airbytehq/airbyte/pull/19813) | 🎉 New Source: Google PageSpeed Insights [low-code CDK]                         |

</details>
