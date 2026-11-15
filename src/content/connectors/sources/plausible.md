---
generated_record: true
connector_name: Plausible
connector_type: source
connector_slug: plausible
connector_directory: source-plausible
definition_id: 603ba446-3d75-41d7-92f3-aba901f8b897
version: 0.2.17
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/plausible
logo: /images/connectors/sources/plausible.svg
logo_source_path: airbyte-integrations/connectors/source-plausible/icon.svg
logo_sha256: 82fe7a7196d4524706f3f76d5ce5c3e37bfaa0e8082ca3a4b53131faefac4dab
original_metadata_path: airbyte-integrations/connectors/source-plausible/metadata.yaml
original_metadata_sha256: c80c733df287dc40be443ee5c2ff8e0b69ef8e0a8ccb547f71cd326957497a2e
original_document_path: docs/integrations/sources/plausible.md
original_document_sha256: ba8b2e32b11c55d3bf7f0356e69a9cea9bcf0ef3420d7f42e3f093a3828452f0
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: a974b0b58413a76ac1d6e15aaeb8836cac56cd91f245d4ffd4a74f3bf3fdc926
rewritten_at: 2026-11-12T13:51:31.196037+00:00
---

# Plausible

## Requirements

- [Plausible account](https://plausible.io/)
- Plausible [API key](https://plausible.io/docs/stats-api)

## Supported sync modes

| Feature           | Supported?\(Yes/No\) | Notes                                                                                          |
| :---------------- | :------------------- | :--------------------------------------------------------------------------------------------- |
| Full Refresh Sync | Yes                  | [Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite) |
| Incremental Sync  | No                   |                                                                                                |

## Supported streams

- [Stats - Time Series](https://plausible.io/docs/stats-api#get-apiv1statstimeseries)

## Set up the connector
1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account or go to the Airbyte Open Source dashboard.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Plausible** from the Source type dropdown.
4. Enter a name for the connector.
5. Enter these configurations:
    - **API Key**: Your Plausible API Key. See the <a href="https://plausible.io/docs/stats-api">docs</a> for details on generating this key.
    - **Site ID**: The domain of the site you want data for. Enter the site name configured in Plausible, excluding "https://" and "www". You can find it in the 'domain' field within your Plausible site settings.
    - **API URL**: The API URL for your Plausible instance. Change this if you self-host Plausible. Otherwise, it defaults to https://plausible.io/api/v1/stats
    - **start_date**: The data start date, in ISO-8601 format.


### Notes

Plausible is a privacy-first analytics service. Its API intentionally provides less granular and comprehensive data than Google Analytics. Therefore:

1. When you retrieve multi-day data, [metrics](https://plausible.io/docs/stats-api#metrics) are aggregated daily.
2. You can't directly export [non-metric properties](https://plausible.io/docs/stats-api#properties), such as referrer, entry page and exit page. You can only export [grouped on](https://plausible.io/docs/stats-api#get-apiv1statsbreakdown).

This source connector retrieves [all possible metrics](https://plausible.io/docs/stats-api#metrics) daily for every day with nonzero website activity.

## Performance considerations

The [stated rate limit](https://plausible.io/docs/stats-api) is 600 requests per hour for each API key. Higher capacities may be available [upon request](https://plausible.io/contact).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject        |
|:--------|:-----------| :------------------------------------------------------- | :------------- |
| 0.2.17 | 2026-11-09 | [91428](https://github.com/airbytehq/airbyte/pull/91428) | Upgrade to `source-declarative-manifest` 7.47.0 |
| 0.2.16 | 2026-07-28 | [83200](https://github.com/airbytehq/airbyte/pull/83200) | Remove invalid hostname pattern from `api_url` config field |
| 0.2.15 | 2026-06-02 | [78893](https://github.com/airbytehq/airbyte/pull/78893) | Update dependencies |
| 0.2.14 | 2025-05-24 | [60528](https://github.com/airbytehq/airbyte/pull/60528) | Update dependencies |
| 0.2.13 | 2025-05-10 | [60098](https://github.com/airbytehq/airbyte/pull/60098) | Update dependencies |
| 0.2.12 | 2025-05-03 | [59483](https://github.com/airbytehq/airbyte/pull/59483) | Update dependencies |
| 0.2.11 | 2025-04-27 | [59083](https://github.com/airbytehq/airbyte/pull/59083) | Update dependencies |
| 0.2.10 | 2025-04-19 | [58482](https://github.com/airbytehq/airbyte/pull/58482) | Update dependencies |
| 0.2.9 | 2025-04-12 | [57854](https://github.com/airbytehq/airbyte/pull/57854) | Update dependencies |
| 0.2.8 | 2025-04-05 | [57358](https://github.com/airbytehq/airbyte/pull/57358) | Update dependencies |
| 0.2.7 | 2025-03-29 | [56803](https://github.com/airbytehq/airbyte/pull/56803) | Update dependencies |
| 0.2.6 | 2025-03-22 | [56236](https://github.com/airbytehq/airbyte/pull/56236) | Update dependencies |
| 0.2.5 | 2025-03-08 | [55536](https://github.com/airbytehq/airbyte/pull/55536) | Update dependencies |
| 0.2.4 | 2025-03-01 | [55010](https://github.com/airbytehq/airbyte/pull/55010) | Update dependencies |
| 0.2.3 | 2025-02-23 | [54559](https://github.com/airbytehq/airbyte/pull/54559) | Update dependencies |
| 0.2.2 | 2025-02-15 | [48194](https://github.com/airbytehq/airbyte/pull/48194) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44085](https://github.com/airbytehq/airbyte/pull/44085) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-12 | [43731](https://github.com/airbytehq/airbyte/pull/43731) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43680](https://github.com/airbytehq/airbyte/pull/43680) | Update dependencies |
| 0.1.12 | 2024-08-06 | [43048](https://github.com/airbytehq/airbyte/pull/43048) | new API URL config option available |
| 0.1.11 | 2024-08-03 | [43252](https://github.com/airbytehq/airbyte/pull/43252) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42793](https://github.com/airbytehq/airbyte/pull/42793) | Update dependencies |
| 0.1.9 | 2024-07-20 | [41918](https://github.com/airbytehq/airbyte/pull/41918) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41403](https://github.com/airbytehq/airbyte/pull/41403) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41120](https://github.com/airbytehq/airbyte/pull/41120) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40992](https://github.com/airbytehq/airbyte/pull/40992) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40502](https://github.com/airbytehq/airbyte/pull/40502) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40185](https://github.com/airbytehq/airbyte/pull/40185) | Update dependencies |
| 0.1.3 | 2024-06-04 | [38974](https://github.com/airbytehq/airbyte/pull/38974) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.2 | 2024-05-28 | [38660](https://github.com/airbytehq/airbyte/pull/38660) | Make connector compatible with Builder |
| 0.1.1 | 2024-05-21 | [38494](https://github.com/airbytehq/airbyte/pull/38494) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-10-30 | [18657](https://github.com/airbytehq/airbyte/pull/18657) | Initial commit |

</details>
