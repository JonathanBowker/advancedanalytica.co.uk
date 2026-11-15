---
generated_record: true
connector_name: Astra DB
connector_type: destination
connector_slug: astra
connector_directory: destination-astra
definition_id: 042ce96f-1158-4662-9543-e2ff015be97a
version: 0.1.46
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/astra
logo: /images/connectors/destinations/astra.svg
logo_source_path: airbyte-integrations/connectors/destination-astra/icon.svg
logo_sha256: 5cf7621cff07d54e6e75e07c9b76c97879558754086293a8d437bd744de42a5e
original_metadata_path: airbyte-integrations/connectors/destination-astra/metadata.yaml
original_metadata_sha256: 57d1ff7550f54441d613468e29ac1eb482c70638f89e34771f144a4da8e36e39
original_document_path: docs/integrations/destinations/astra.md
original_document_sha256: f607ff6384873c7739a897e206bbcdf1627770586968d40f46ef2da6a3eb323d
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 5ce25846bdea9e7a61fb44843e2d5fbbd00d5f4f0566ac94d72fefd4ebf6fdb2
rewritten_at: 2026-11-12T13:20:04.567938+00:00
---

# Astra DB Destination

Use this page to set up the destination-astra connector and find reference information.

## Prerequisites

- An API key for OpenAI, AzureOpenAI, Cohere or another provider

## Setup guide

#### Set up an Astra database

- Create an Astra account [here](https://astra.datastax.com/signup)
- In the Astra Portal, select Databases from the main navigation.
- Click Create Database.
- In the Create Database dialogue, select the Serverless (Vector) deployment type.
- In the Configuration section, enter a name in the Database name field.
  - Choose a meaningful name because you can’t change it later.
  - Database names must start and end with an alphanumeric character.
  - They may contain these special characters: & + - \_ ( ) < > . , @.
- Select your preferred Provider and Region.
  - The Free plan offers a limited number of regions.
  - Regions with a lock icon require an upgrade to a Pay As You Go plan.
- Click Create Database.
  - The Astra Portal redirects you to your new database’s Overview screen.
  - Your database starts with Pending status before moving to Initializing.
  - You’ll receive a notification when your database is initialized.

#### Gather other credentials

- Return to the Overview tab in the Astra UI.
- Copy the Endpoint under Database Details and enter it in Airbyte as astra_db_endpoint.
- Click generate token, then copy the application token and enter it as astra_db_app_token.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request | Subject                                                   |
|:--------| :--------- | :----------- |:----------------------------------------------------------|
| 0.1.46 | 2026-10-07 | [88313](https://github.com/airbytehq/airbyte/pull/88313) | Delete all matching documents on overwrite/dedup (Data API `deleteMany` returns at most 20 per request; follow `moreData`) and send the token via the documented `Token` header |
| 0.1.45 | 2026-08-13 | [84359](https://github.com/airbytehq/airbyte/pull/84359) | Update the CDK to remediate CVE-2025-68664 in the langchain dependency |
| 0.1.44 | 2025-03-29 | [56606](https://github.com/airbytehq/airbyte/pull/56606) | Update dependencies |
| 0.1.43 | 2025-03-22 | [56098](https://github.com/airbytehq/airbyte/pull/56098) | Update dependencies |
| 0.1.42 | 2025-03-08 | [55394](https://github.com/airbytehq/airbyte/pull/55394) | Update dependencies |
| 0.1.41 | 2025-03-01 | [54871](https://github.com/airbytehq/airbyte/pull/54871) | Update dependencies |
| 0.1.40 | 2025-02-22 | [54244](https://github.com/airbytehq/airbyte/pull/54244) | Update dependencies |
| 0.1.39 | 2025-02-15 | [53883](https://github.com/airbytehq/airbyte/pull/53883) | Update dependencies |
| 0.1.38 | 2025-02-08 | [53388](https://github.com/airbytehq/airbyte/pull/53388) | Update dependencies |
| 0.1.37 | 2025-02-01 | [52943](https://github.com/airbytehq/airbyte/pull/52943) | Update dependencies |
| 0.1.36 | 2025-01-25 | [52179](https://github.com/airbytehq/airbyte/pull/52179) | Update dependencies |
| 0.1.35 | 2025-01-11 | [51295](https://github.com/airbytehq/airbyte/pull/51295) | Update dependencies |
| 0.1.34 | 2025-01-04 | [50910](https://github.com/airbytehq/airbyte/pull/50910) | Update dependencies |
| 0.1.33 | 2024-12-28 | [50446](https://github.com/airbytehq/airbyte/pull/50446) | Update dependencies |
| 0.1.32 | 2024-12-21 | [50213](https://github.com/airbytehq/airbyte/pull/50213) | Update dependencies |
| 0.1.31 | 2024-12-14 | [49288](https://github.com/airbytehq/airbyte/pull/49288) | Update dependencies |
| 0.1.30 | 2024-11-25 | [48674](https://github.com/airbytehq/airbyte/pull/48674) | Update dependencies |
| 0.1.29 | 2024-10-29 | [47105](https://github.com/airbytehq/airbyte/pull/47105) | Update dependencies |
| 0.1.28 | 2024-10-12 | [46857](https://github.com/airbytehq/airbyte/pull/46857) | Update dependencies |
| 0.1.27 | 2024-10-05 | [46402](https://github.com/airbytehq/airbyte/pull/46402) | Update dependencies |
| 0.1.26 | 2024-09-28 | [46179](https://github.com/airbytehq/airbyte/pull/46179) | Update dependencies |
| 0.1.25 | 2024-09-21 | [45829](https://github.com/airbytehq/airbyte/pull/45829) | Update dependencies |
| 0.1.24 | 2024-09-14 | [45498](https://github.com/airbytehq/airbyte/pull/45498) | Update dependencies |
| 0.1.23 | 2024-09-07 | [45330](https://github.com/airbytehq/airbyte/pull/45330) | Update dependencies |
| 0.1.22 | 2024-08-31 | [44983](https://github.com/airbytehq/airbyte/pull/44983) | Update dependencies |
| 0.1.21 | 2024-08-24 | [44700](https://github.com/airbytehq/airbyte/pull/44700) | Update dependencies |
| 0.1.20 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.19 | 2024-08-17 | [44319](https://github.com/airbytehq/airbyte/pull/44319) | Update dependencies |
| 0.1.18 | 2024-08-12 | [43811](https://github.com/airbytehq/airbyte/pull/43811) | Update dependencies |
| 0.1.17 | 2024-08-10 | [43598](https://github.com/airbytehq/airbyte/pull/43598) | Update dependencies |
| 0.1.16 | 2024-08-03 | [43075](https://github.com/airbytehq/airbyte/pull/43075) | Update dependencies |
| 0.1.15 | 2024-07-27 | [42805](https://github.com/airbytehq/airbyte/pull/42805) | Update dependencies |
| 0.1.14 | 2024-07-20 | [42251](https://github.com/airbytehq/airbyte/pull/42251) | Update dependencies |
| 0.1.13 | 2024-07-13 | [41698](https://github.com/airbytehq/airbyte/pull/41698) | Update dependencies |
| 0.1.12 | 2024-07-10 | [41451](https://github.com/airbytehq/airbyte/pull/41451) | Update dependencies |
| 0.1.11 | 2024-07-09 | [41095](https://github.com/airbytehq/airbyte/pull/41095) | Update dependencies |
| 0.1.10 | 2024-07-06 | [40779](https://github.com/airbytehq/airbyte/pull/40779) | Update dependencies |
| 0.1.9 | 2024-06-29 | [40626](https://github.com/airbytehq/airbyte/pull/40626) | Update dependencies |
| 0.1.8 | 2024-06-27 | [40215](https://github.com/airbytehq/airbyte/pull/40215) | Replaced deprecated AirbyteLogger with logging.Logger |
| 0.1.7 | 2024-06-25 | [40467](https://github.com/airbytehq/airbyte/pull/40467) | Update dependencies |
| 0.1.6 | 2024-06-22 | [40162](https://github.com/airbytehq/airbyte/pull/40162) | Update dependencies |
| 0.1.5 | 2024-06-06 | [39198](https://github.com/airbytehq/airbyte/pull/39198) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.4   | 2024-05-16 | #38181       | Add explicit projection when reading from Astra DB        |
| 0.1.3   | 2024-04-19 | #37405       | Add "airbyte" user-agent in the HTTP requests to Astra DB |
| 0.1.2   | 2024-04-15 |              | Moved to Poetry; Updated CDK & pytest versions            |
| 0.1.1   | 2024-01-26 |              | DS Branding Update                                        |
| 0.1.0   | 2024-01-08 |              | Initial Release                                           |

</details>
