---
generated_record: true
connector_name: SearchMetrics
connector_type: source
connector_slug: search-metrics
connector_directory: source-search-metrics
definition_id: 8d7ef552-2c0f-11ec-8d3d-0242ac130003
version: 0.1.1
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/search-metrics
logo: /images/connectors/sources/search-metrics.svg
logo_source_path: airbyte-integrations/connectors/source-search-metrics/icon.svg
logo_sha256: 8a918387f2207f41f1f15693ab83cf080d366f418b840cb63729c19e235a4ba8
original_metadata_path: airbyte-integrations/connectors/source-search-metrics/metadata.yaml
original_metadata_sha256: c0fe67b3c9c5be1e1ef570b8e8f05ae99d00ec324d05bfe8c4db1a0cfd1ca15c
original_document_path: docs/integrations/sources/search-metrics.md
original_document_sha256: 0cd6a72a54042636d268079ddaf49abef433d23c63c993580b72ebd3cfc75213
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d26c36bb0da474f22ddecadbd43b1c39acbc54dc637cb577a94dda5154855a80
rewritten_at: 2026-11-12T13:54:48.279061+00:00
---

# SearchMetrics

:::warning

## Deprecation notice

The SearchMetrics source connector is scheduled for deprecation on March 5th, 2024. It’s incompatible with upcoming platform updates supporting the launch of Airbyte 1.0. The connector will then be unavailable and unsupported in Airbyte.

This connector doesn’t support new per-stream features that are essential for data integrity during Airbyte synchronisation. Without them, Airbyte can’t enforce its reliability and correctness standards for data syncing.

### Recommended actions

To continue syncing data from this source, consider creating a custom connector. For guidance, visit [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

## Overview

The SearchMetrics source supports Full Refresh and Incremental syncs. You can copy only new or updated data during each sync. Alternatively, copy every row in the tables and columns you’ve set up for replication.

### Output schema

You can use several output streams from this source:

- [Projects](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQwODQ5ODE-get-list-projects) \(Full table\)
- [BenchmarkRankingsS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NDY-get-list-benchmark-rankings-s7) \(Full table\)
- [CompetitorRankingsS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NDc-get-list-competitor-rankings-s7) \(Full table\)
- [DistributionKeywordsS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NDg-get-list-distribution-keywords-s7) \(Full table\)
- [KeywordPotentialsS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NTA-get-list-keyword-potentials-s7) \(Full table\)
- [ListCompetitors](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQwODQ5OTI-get-list-competitors) \(Full table\)
- [ListCompetitorsRelevancy](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQxODQxNjU-get-list-competitors-relevancy) \(Full table\)
- [ListLosersS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NTE-get-list-losers-s7) \(Full table\)
- [ListMarketShareS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NTI-get-list-market-share-s7) \(Incremental\)
- [ListPositionSpreadHistoricS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NTM-get-list-position-spread-historic-s7) \(Incremental\)
- [ListRankingsDomain](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQwODQ5OTg-get-list-rankings-domain) \(Full table\)
- [ListRankingsHistoricS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NTY-get-list-rankings-historic-s7) \(Full table\)
- [ListSeoVisibilityCountry](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQyMjg4NDk-get-list-seo-visibility-country) \(Full table\)
- [ListSeoVisibilityHistoricS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NTc-get-list-seo-visibility-historic-s7) \(Incremental\)
- [ListSerpSpreadS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NTg-get-list-serp-spread-s7) \(Full table\)
- [ListWinnersS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NjQ-get-list-winners-s7) \(Full table\)
- [SeoVisibilityValueS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQyMzQzMjk-get-value-seo-visibility) \(Full table\)
- [SerpSpreadValueS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0Njc-get-value-serp-spread-s7) \(Full table\)
- [TagPotentialsS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NTk-get-list-tag-potentials-s7) \(Full table\)
- [Tags](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjE4NzQ0ODMz-get-list-project-tags) \(Full table\)
- [UrlRankingsS7](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQzNjc0NjM-get-list-url-rankings-s7) \(Full table\)

If you’d like Airbyte to support more endpoints, please [create an issue.](https://github.com/airbytehq/airbyte/issues/new/choose)

### Features

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | Yes        |
| SSL connection            | Yes        |
| Namespaces                | No         |

During normal use, the SearchMetrics connector shouldn’t encounter SearchMetrics API limitations. Please [create an issue](https://github.com/airbytehq/airbyte/issues) if any rate-limit issues aren’t successfully retried automatically.

## Get started

### Requirements

- SearchMetrics Client Secret
- SearchMetrics API Key

### Setup guide

Read [How to get your API Key and Client Secret](https://developer.searchmetrics.com/docs/apiv4-documentation/ZG9jOjQ2Nzk1-getting-started).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                           | Subject                             |
| :------ | :--------- | :----------------------------------------------------- | :---------------------------------- |
| 0.1.1   | 2021-12-22 | [6992](https://github.com/airbytehq/airbyte/pull/6992) | Deleted windows in days from config |
| 0.1.0   | 2021-10-13 | [6992](https://github.com/airbytehq/airbyte/pull/6992) | Release SearchMetrics CDK Connector |

</details>
