---
generated_record: true
connector_name: CallRail
connector_type: source
connector_slug: callrail
connector_directory: source-callrail
definition_id: dc98a6ad-2dd1-47b6-9529-2ec35820f9c6
version: 0.2.15
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/callrail
logo: /images/connectors/sources/callrail.svg
logo_source_path: airbyte-integrations/connectors/source-callrail/icon.svg
logo_sha256: 1cdc05cdf4569651055a2666c19cea42eb6261baee63d618d17588821b8d8b36
original_metadata_path: airbyte-integrations/connectors/source-callrail/metadata.yaml
original_metadata_sha256: 3c2f3de91772375784b0c7a84cc7f413e97d3945ad4fda5419381e88b9a5dcfc
original_document_path: docs/integrations/sources/callrail.md
original_document_sha256: 880f23b0cac69b6b3d3d336d3cb319b976826087d9e3d6bd1000afef44ed6d34
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: d4513af8e2fc512ca4767ba3c78f5e909f916dc6713337986b2e5cdfa5f084c4
rewritten_at: 2026-11-12T13:32:46.002062+00:00
---

# CallRail

Use this page to set up the [CallRail](https://www.callrail.com/) source connector and find reference information.

The connector reads calls, text message conversations, companies and users from the [CallRail API v3](https://apidocs.callrail.com/) for one CallRail account.

## Prerequisites

- A CallRail account.
- A CallRail API key. CallRail API keys are scoped to the user who created them. The connector can only read data that this user can see in the CallRail interface. It doesn't return calls, text messages or companies from accounts or companies the user can't access. An account administrator can also ask CallRail support to disable API access or restrict it to admin users. For details, see [Authorization](https://apidocs.callrail.com/#authorization) in the CallRail API documentation.
- Your CallRail account ID. Open the CallRail dashboard in your browser. Copy the nine-digit number that follows `/a/` in the URL.

## Set up the CallRail connector in Airbyte

1. In Airbyte, go to **Sources** and select **CallRail**.
2. Enter a **Source name**.
3. For **API key**, enter your CallRail API key.
4. For **Account ID**, enter your nine-digit CallRail account ID.
5. For **Start date**, enter the sync start date in `YYYY-MM-DD` format. The connector only reads records on or after this date.
6. Click **Set up source**.

## Supported sync modes

| Feature                   | Supported? |
| :------------------------ | :--------- |
| Full Refresh Sync         | Yes        |
| Incremental - Append Sync | Yes        |
| Incremental - Dedupe Sync | Yes        |
| SSL connection            | No         |
| Namespaces                | No         |

## Supported streams

| Stream | CallRail endpoint | Primary key | Cursor field |
| :----- | :---------------- | :---------- | :----------- |
| `calls` | [Calls](https://apidocs.callrail.com/#calls) | `id` | `start_time` |
| `conversations` | [Text Messages](https://apidocs.callrail.com/#text-messages) | `id` | `last_message_at` |
| `companies` | [Companies](https://apidocs.callrail.com/#companies) | `id` | `created_at` |
| `users` | [Users](https://apidocs.callrail.com/#users) | `id` | `created_at` |

The `conversations` stream contains SMS conversations from the CallRail Text Messages endpoint. Each record represents a conversation with one customer. Its `recent_messages` field contains the most recent messages.

The `companies` and `users` streams use `created_at` as their cursor. Incremental syncs pick up newly created records, but don't capture changes to existing records. Use a full refresh sync to capture updates to existing companies or users.

## Limitations

The connector requests 100 records per page across 100-day windows, from the start date to the current date.

By default, CallRail limits each account to 1,000 general API requests per hour and 10,000 per day. CallRail returns HTTP 429 responses when the connector exceeds these limits. If you reach these limits while syncing extensive historical data, consider a later start date. You can also contact CallRail support to request a higher limit. For details, see [Rate Limiting](https://apidocs.callrail.com/#rate-limiting).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                 |
| :------ | :--------- | :------------------------------------------------------- | :---------------------- |
| 0.2.15 | 2026-11-10 | [91325](https://github.com/airbytehq/airbyte/pull/91325) | Upgrade to source-declarative-manifest 7.47.0 |
| 0.2.14 | 2026-11-10 | [89534](https://github.com/airbytehq/airbyte/pull/89534) | Migrate `acceptance-test-config.yml` to the `acceptance_tests` layout read by the standard tests |
| 0.2.13 | 2025-05-17 | [60647](https://github.com/airbytehq/airbyte/pull/60647) | Update dependencies |
| 0.2.12 | 2025-05-10 | [59890](https://github.com/airbytehq/airbyte/pull/59890) | Update dependencies |
| 0.2.11 | 2025-05-03 | [59303](https://github.com/airbytehq/airbyte/pull/59303) | Update dependencies |
| 0.2.10 | 2025-04-26 | [58699](https://github.com/airbytehq/airbyte/pull/58699) | Update dependencies |
| 0.2.9 | 2025-04-19 | [58234](https://github.com/airbytehq/airbyte/pull/58234) | Update dependencies |
| 0.2.8 | 2025-04-12 | [57612](https://github.com/airbytehq/airbyte/pull/57612) | Update dependencies |
| 0.2.7 | 2025-04-05 | [57161](https://github.com/airbytehq/airbyte/pull/57161) | Update dependencies |
| 0.2.6 | 2025-03-29 | [56589](https://github.com/airbytehq/airbyte/pull/56589) | Update dependencies |
| 0.2.5 | 2025-03-22 | [56145](https://github.com/airbytehq/airbyte/pull/56145) | Update dependencies |
| 0.2.4 | 2025-03-08 | [55415](https://github.com/airbytehq/airbyte/pull/55415) | Update dependencies |
| 0.2.3 | 2025-03-01 | [54887](https://github.com/airbytehq/airbyte/pull/54887) | Update dependencies |
| 0.2.2 | 2025-02-22 | [54241](https://github.com/airbytehq/airbyte/pull/54241) | Update dependencies |
| 0.2.1 | 2025-02-15 | [47584](https://github.com/airbytehq/airbyte/pull/47584) | Update dependencies |
| 0.2.0 | 2024-08-23 | [44591](https://github.com/airbytehq/airbyte/pull/44591) | Refactor connector to manifest-only format |
| 0.1.14 | 2024-08-17 | [44240](https://github.com/airbytehq/airbyte/pull/44240) | Update dependencies |
| 0.1.13 | 2024-08-12 | [43796](https://github.com/airbytehq/airbyte/pull/43796) | Update dependencies |
| 0.1.12 | 2024-08-10 | [43705](https://github.com/airbytehq/airbyte/pull/43705) | Update dependencies |
| 0.1.11 | 2024-08-03 | [43173](https://github.com/airbytehq/airbyte/pull/43173) | Update dependencies |
| 0.1.10 | 2024-07-27 | [42619](https://github.com/airbytehq/airbyte/pull/42619) | Update dependencies |
| 0.1.9 | 2024-07-20 | [42229](https://github.com/airbytehq/airbyte/pull/42229) | Update dependencies |
| 0.1.8 | 2024-07-13 | [41788](https://github.com/airbytehq/airbyte/pull/41788) | Update dependencies |
| 0.1.7 | 2024-07-10 | [41551](https://github.com/airbytehq/airbyte/pull/41551) | Update dependencies |
| 0.1.6 | 2024-07-09 | [41129](https://github.com/airbytehq/airbyte/pull/41129) | Update dependencies |
| 0.1.5 | 2024-07-06 | [40833](https://github.com/airbytehq/airbyte/pull/40833) | Update dependencies |
| 0.1.4 | 2024-06-25 | [40335](https://github.com/airbytehq/airbyte/pull/40335) | Update dependencies |
| 0.1.3 | 2024-06-22 | [39949](https://github.com/airbytehq/airbyte/pull/39949) | Update dependencies |
| 0.1.2 | 2024-06-06 | [39281](https://github.com/airbytehq/airbyte/pull/39281) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.1 | 2024-05-21 | [38531](https://github.com/airbytehq/airbyte/pull/38531) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-10-31 | [18739](https://github.com/airbytehq/airbyte/pull/18739) | 🎉 New Source: CallRail |

</details>
