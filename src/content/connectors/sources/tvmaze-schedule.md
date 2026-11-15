---
generated_record: true
connector_name: TVMaze Schedule
connector_type: source
connector_slug: tvmaze-schedule
connector_directory: source-tvmaze-schedule
definition_id: bd14b08f-9f43-400f-b2b6-7248b5c72561
version: 0.2.27
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/tvmaze-schedule
logo: /images/connectors/sources/tvmaze-schedule.svg
logo_source_path: airbyte-integrations/connectors/source-tvmaze-schedule/icon.svg
logo_sha256: ecfa6159a690d101402798f5979fd343ff422a695f8cdaeeeebb4f69c558d717
original_metadata_path: airbyte-integrations/connectors/source-tvmaze-schedule/metadata.yaml
original_metadata_sha256: a6b6b3348b85f8a0d06cafb0249e6e12dc1620ca6d5182f6ab9b0848938eda35
original_document_path: docs/integrations/sources/tvmaze-schedule.md
original_document_sha256: ccb508290c0e8734539ab9caa093a892eb959953889c45a293bb3fb229dd0e84
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 6f47c54dc21f4d4875c72e38c506e2653a616e198cae28db0d2f8f57ad974e0d
rewritten_at: 2026-11-12T13:59:30.740860+00:00
---

# TVMaze Schedule

## Sync overview

This source retrieves historical and future TV scheduling data through the
[TVMaze](https://www.tvmaze.com/) schedule API.

### Output schema

You can sync the following streams:

- `domestic`: episodes airing on TV networks in `domestic_schedule_country_code` each day within the date range (`/schedule`).
  The inclusive date range runs from `start_date` to `end_date` (`end_date` defaults to today).
- `web`: episodes airing on web or streaming channels each day within the date range (`/schedule/web`). You can optionally filter by `web_schedule_country_code`.
- `future`: all future episodes known to TVMaze, regardless of country or date range (`/schedule/full`). This stream supports full refresh only.

### Features

| Feature           | Supported? \(Yes/No\) | Notes                     |
| :---------------- | :-------------------- | :------------------------ |
| Full Refresh Sync | Yes                   |                           |
| Incremental Sync  | Yes                   | `domestic` and `web` only |

### Performance considerations

TVMaze limits requests to 20 per 10 seconds. This source shouldn't reach this limit.

## Get started

### Requirements

1. Choose a start date for your sync. It can be in the future.
2. Choose an ISO 3166-1 country code for domestic schedule syncs.

### Setup guide

Configure these fields for the connector to work:

- `start_date`: The start date for pulling `history` data.
- (optional) `end_date`: The end date for pulling `history` data.
- `domestic_schedule_country_code`: The ISO 3166-1 country code for pulling domestic schedule data.
- (optional) `web_schedule_country_code`: The ISO 3166-1 country code for pulling web schedule data. Leave it blank for all countries and global channels. Set it to 'global' for global channels only.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject    |
| :------ | :--------- | :------------------------------------------------------- | :--------- |
| 0.2.27 | 2026-10-13 | [79021](https://github.com/airbytehq/airbyte/pull/79021) | Update dependencies |
| 0.2.26 | 2026-10-07 | [88260](https://github.com/airbytehq/airbyte/pull/88260) | Fix `country` filter never being sent, point `web` stream at `/schedule/web`, include `end_date` (default: today) in the synced range, and make `future` a single full-refresh request instead of one full-schedule download per day |
| 0.2.25 | 2025-05-25 | [60539](https://github.com/airbytehq/airbyte/pull/60539) | Update dependencies |
| 0.2.24 | 2025-05-10 | [60194](https://github.com/airbytehq/airbyte/pull/60194) | Update dependencies |
| 0.2.23 | 2025-05-04 | [59574](https://github.com/airbytehq/airbyte/pull/59574) | Update dependencies |
| 0.2.22 | 2025-04-27 | [58995](https://github.com/airbytehq/airbyte/pull/58995) | Update dependencies |
| 0.2.21 | 2025-04-19 | [58440](https://github.com/airbytehq/airbyte/pull/58440) | Update dependencies |
| 0.2.20 | 2025-04-12 | [58010](https://github.com/airbytehq/airbyte/pull/58010) | Update dependencies |
| 0.2.19 | 2025-04-05 | [57444](https://github.com/airbytehq/airbyte/pull/57444) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56862](https://github.com/airbytehq/airbyte/pull/56862) | Update dependencies |
| 0.2.17 | 2025-03-22 | [56315](https://github.com/airbytehq/airbyte/pull/56315) | Update dependencies |
| 0.2.16 | 2025-03-08 | [55631](https://github.com/airbytehq/airbyte/pull/55631) | Update dependencies |
| 0.2.15 | 2025-03-01 | [55100](https://github.com/airbytehq/airbyte/pull/55100) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54478](https://github.com/airbytehq/airbyte/pull/54478) | Update dependencies |
| 0.2.13 | 2025-02-15 | [54103](https://github.com/airbytehq/airbyte/pull/54103) | Update dependencies |
| 0.2.12 | 2025-02-08 | [53533](https://github.com/airbytehq/airbyte/pull/53533) | Update dependencies |
| 0.2.11 | 2025-02-01 | [53088](https://github.com/airbytehq/airbyte/pull/53088) | Update dependencies |
| 0.2.10 | 2025-01-25 | [52389](https://github.com/airbytehq/airbyte/pull/52389) | Update dependencies |
| 0.2.9 | 2025-01-18 | [52015](https://github.com/airbytehq/airbyte/pull/52015) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51450](https://github.com/airbytehq/airbyte/pull/51450) | Update dependencies |
| 0.2.7 | 2024-12-28 | [50766](https://github.com/airbytehq/airbyte/pull/50766) | Update dependencies |
| 0.2.6 | 2024-12-21 | [50332](https://github.com/airbytehq/airbyte/pull/50332) | Update dependencies |
| 0.2.5 | 2024-12-14 | [49740](https://github.com/airbytehq/airbyte/pull/49740) | Update dependencies |
| 0.2.4 | 2024-12-12 | [49438](https://github.com/airbytehq/airbyte/pull/49438) | Update dependencies |
| 0.2.3 | 2024-12-11 | [49108](https://github.com/airbytehq/airbyte/pull/49108) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.2 | 2024-10-28 | [47573](https://github.com/airbytehq/airbyte/pull/47573) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44055](https://github.com/airbytehq/airbyte/pull/44055) | Refactor connector to manifest-only format |
| 0.1.13 | 2024-08-12 | [43740](https://github.com/airbytehq/airbyte/pull/43740) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43530](https://github.com/airbytehq/airbyte/pull/43530) | Update dependencies |
| 0.1.11 | 2024-08-03 | [43094](https://github.com/airbytehq/airbyte/pull/43094) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42640](https://github.com/airbytehq/airbyte/pull/42640) | Update dependencies |
| 0.1.9 | 2024-07-20 | [42386](https://github.com/airbytehq/airbyte/pull/42386) | Update dependencies |
| 0.1.8 | 2024-07-13 | [41917](https://github.com/airbytehq/airbyte/pull/41917) | Update dependencies |
| 0.1.7 | 2024-07-10 | [41358](https://github.com/airbytehq/airbyte/pull/41358) | Update dependencies |
| 0.1.6 | 2024-07-09 | [40928](https://github.com/airbytehq/airbyte/pull/40928) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40349](https://github.com/airbytehq/airbyte/pull/40349) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40048](https://github.com/airbytehq/airbyte/pull/40048) | Update dependencies |
| 0.1.3 | 2024-06-05 | [38837](https://github.com/airbytehq/airbyte/pull/38837) | Make connector compatible with builder |
| 0.1.2 | 2024-06-04 | [39053](https://github.com/airbytehq/airbyte/pull/39053) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-20 | [38453](https://github.com/airbytehq/airbyte/pull/38453) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-10-22 | [18333](https://github.com/airbytehq/airbyte/pull/18333) | New source |

</details>
