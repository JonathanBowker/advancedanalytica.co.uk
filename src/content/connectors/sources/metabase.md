---
generated_record: true
connector_name: Metabase
connector_type: source
connector_slug: metabase
connector_directory: source-metabase
definition_id: c7cb421b-942e-4468-99ee-e369bcabaec5
version: 2.1.66
support_level: community
release_stage: beta
documentation_url: https://docs.airbyte.com/integrations/sources/metabase
logo: /images/connectors/sources/metabase.svg
logo_source_path: airbyte-integrations/connectors/source-metabase/icon.svg
logo_sha256: e9ef5225d529d3c099b00a5f14f340d4f9fe2d46bca83f3212835047bfcf4404
original_metadata_path: airbyte-integrations/connectors/source-metabase/metadata.yaml
original_metadata_sha256: a4a2ed1f34e6ed1fdc8f12cf5c7b0990fdbe744c3c9187bc49d1a5aa0be9cc55
original_document_path: docs/integrations/sources/metabase.md
original_document_sha256: c22ffe62bc463dd5ba491a8ebd350b5c20aed2980850233b998cf5c122fe4f2b
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3a5ebbbbd50e305785b20530fca7eda1fc04ec4da6882a1149ed61ce48316490
rewritten_at: 2026-11-12T13:46:47.361719+00:00
---

# Metabase

Set up the Metabase source connector and find its reference information on this page.

## Prerequisites

To set up Metabase, you need:

- `username` and `password` - Credential pairs for authenticating with a Metabase instance. You can use them to generate a new `session_token` if needed. Metabase may email the owner's account whenever these credentials open a new session.
- `session_token` - Credential token for authenticating requests sent to the Metabase API. It usually expires after 14 days.
- `instance_api_url` - URL for interacting with the Metabase instance API. It uses https.

## Set up the connector

Run the following command to find or create authentication tokens from [Metabase](https://www.metabase.com/learn/administration/metabase-api.html#authenticate-your-requests-with-a-session-token):`

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"username": "person@metabase.com", "password": "fakepassword"}' \
http://localhost:3000/api/session
```

If you're using a remote server, replace localhost:3000 with your server address. The request returns a JSON object with an id key. The key's value is the token, for example:

```
{"id":"38f4939c-ad7f-4cbe-ae54-30946daf8593"}
```

Use this id value as your `session_token` when configuring the connector.
By default, these credential tokens may expire after 14 days. When this happens, you may need to update your connector configuration with a new value. The connector should throw exceptions about Invalid and expired session tokens. It should also return a 401 (Unauthorized) status code.

If you host your own Metabase instance, set the MAX_SESSION_AGE environment variable to configure the session duration. The value is in minutes.

If you supply only username and password, the connector generates a session_token whenever it runs an authenticated query. This may trigger security alerts on the user's Metabase account.

## Supported sync modes

The Metabase source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)

## Supported streams

- [Card](https://www.metabase.com/docs/latest/api/card.html#get-apicard)
- [Collections](https://www.metabase.com/docs/latest/api/collection.html#get-apicollection)
- [Dashboard](https://www.metabase.com/docs/latest/api/dashboard.html#get-apidashboard)
- [User](https://www.metabase.com/docs/latest/api/user.html#get-apiuser)
- [Databases](https://www.metabase.com/docs/latest/api/user.html#get-apiuser)
- [Native Query Snippet](https://www.metabase.com/docs/latest/api/native-query-snippet#get-apinative-query-snippetid)

## Tutorials

### Data type mapping

| Integration Type    | Airbyte Type | Notes |
| :------------------ | :----------- | :---- |
| `string`            | `string`     |       |
| `integer`, `number` | `number`     |       |
| `array`             | `array`      |       |
| `object`            | `object`     |       |

### Features

| Feature           | Supported?\(Yes/No\) | Notes |
| :---------------- | :------------------- | :---- |
| Full Refresh Sync | Yes                  |       |
| Incremental Sync  | No                   |       |
| SSL connection    | Yes                  |       |
| Namespaces        | No                   |       |

## IP allow list

If you use Airbyte Cloud with access restricted to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                                                                                          |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| 2.1.66 | 2026-11-10 | [91617](https://github.com/airbytehq/airbyte/pull/91617) | Update dependencies |
| 2.1.65 | 2026-11-03 | [90648](https://github.com/airbytehq/airbyte/pull/90648) | Update dependencies |
| 2.1.64 | 2026-10-27 | [89986](https://github.com/airbytehq/airbyte/pull/89986) | Update dependencies |
| 2.1.63 | 2026-10-20 | [89321](https://github.com/airbytehq/airbyte/pull/89321) | Update dependencies |
| 2.1.62 | 2026-10-13 | [88706](https://github.com/airbytehq/airbyte/pull/88706) | Update dependencies |
| 2.1.61 | 2026-10-06 | [87947](https://github.com/airbytehq/airbyte/pull/87947) | Update dependencies |
| 2.1.60 | 2026-09-29 | [87257](https://github.com/airbytehq/airbyte/pull/87257) | Update dependencies |
| 2.1.59 | 2026-09-22 | [86719](https://github.com/airbytehq/airbyte/pull/86719) | Update dependencies |
| 2.1.58 | 2026-09-15 | [86093](https://github.com/airbytehq/airbyte/pull/86093) | Update dependencies |
| 2.1.57 | 2026-09-08 | [85573](https://github.com/airbytehq/airbyte/pull/85573) | Update dependencies |
| 2.1.56 | 2026-08-18 | [84644](https://github.com/airbytehq/airbyte/pull/84644) | Update dependencies |
| 2.1.55 | 2026-08-11 | [84029](https://github.com/airbytehq/airbyte/pull/84029) | Update dependencies |
| 2.1.54 | 2026-08-04 | [83518](https://github.com/airbytehq/airbyte/pull/83518) | Update dependencies |
| 2.1.53 | 2026-07-28 | [82990](https://github.com/airbytehq/airbyte/pull/82990) | Update dependencies |
| 2.1.52 | 2026-07-21 | [82504](https://github.com/airbytehq/airbyte/pull/82504) | Update dependencies |
| 2.1.51 | 2026-07-14 | [81931](https://github.com/airbytehq/airbyte/pull/81931) | Update dependencies |
| 2.1.50 | 2026-06-30 | [81145](https://github.com/airbytehq/airbyte/pull/81145) | Update dependencies |
| 2.1.49 | 2026-06-23 | [80555](https://github.com/airbytehq/airbyte/pull/80555) | Update dependencies |
| 2.1.48 | 2026-06-16 | [79950](https://github.com/airbytehq/airbyte/pull/79950) | Update dependencies |
| 2.1.47 | 2026-06-09 | [79392](https://github.com/airbytehq/airbyte/pull/79392) | Update dependencies |
| 2.1.46 | 2026-06-02 | [78845](https://github.com/airbytehq/airbyte/pull/78845) | Update dependencies |
| 2.1.45 | 2026-04-28 | [77344](https://github.com/airbytehq/airbyte/pull/77344) | Update dependencies |
| 2.1.44 | 2026-04-21 | [75839](https://github.com/airbytehq/airbyte/pull/75839) | Update dependencies |
| 2.1.43 | 2026-03-17 | [74977](https://github.com/airbytehq/airbyte/pull/74977) | Update dependencies |
| 2.1.42 | 2026-02-24 | [73804](https://github.com/airbytehq/airbyte/pull/73804) | Update dependencies |
| 2.1.41 | 2026-02-17 | [73224](https://github.com/airbytehq/airbyte/pull/73224) | Update dependencies |
| 2.1.40 | 2026-01-20 | [72020](https://github.com/airbytehq/airbyte/pull/72020) | Update dependencies |
| 2.1.39 | 2026-01-14 | [71547](https://github.com/airbytehq/airbyte/pull/71547) | Update dependencies |
| 2.1.38 | 2025-12-18 | [70765](https://github.com/airbytehq/airbyte/pull/70765) | Update dependencies |
| 2.1.37 | 2025-11-25 | [70109](https://github.com/airbytehq/airbyte/pull/70109) | Update dependencies |
| 2.1.36 | 2025-11-18 | [69556](https://github.com/airbytehq/airbyte/pull/69556) | Update dependencies |
| 2.1.35 | 2025-10-29 | [69057](https://github.com/airbytehq/airbyte/pull/69057) | Update dependencies |
| 2.1.34 | 2025-10-21 | [68434](https://github.com/airbytehq/airbyte/pull/68434) | Update dependencies |
| 2.1.33 | 2025-10-14 | [67829](https://github.com/airbytehq/airbyte/pull/67829) | Update dependencies |
| 2.1.32 | 2025-10-07 | [67388](https://github.com/airbytehq/airbyte/pull/67388) | Update dependencies |
| 2.1.31 | 2025-09-30 | [66335](https://github.com/airbytehq/airbyte/pull/66335) | Update dependencies |
| 2.1.30 | 2025-09-10 | [65815](https://github.com/airbytehq/airbyte/pull/65815) | Update dependencies |
| 2.1.29 | 2025-08-23 | [65218](https://github.com/airbytehq/airbyte/pull/65218) | Update dependencies |
| 2.1.28 | 2025-08-09 | [64780](https://github.com/airbytehq/airbyte/pull/64780) | Update dependencies |
| 2.1.27 | 2025-08-02 | [64288](https://github.com/airbytehq/airbyte/pull/64288) | Update dependencies |
| 2.1.26 | 2025-07-26 | [63931](https://github.com/airbytehq/airbyte/pull/63931) | Update dependencies |
| 2.1.25 | 2025-07-19 | [60606](https://github.com/airbytehq/airbyte/pull/60606) | Update dependencies |
| 2.1.24 | 2025-05-10 | [59880](https://github.com/airbytehq/airbyte/pull/59880) | Update dependencies |
| 2.1.23 | 2025-05-03 | [59270](https://github.com/airbytehq/airbyte/pull/59270) | Update dependencies |
| 2.1.22 | 2025-04-26 | [58776](https://github.com/airbytehq/airbyte/pull/58776) | Update dependencies |
| 2.1.21 | 2025-04-19 | [58213](https://github.com/airbytehq/airbyte/pull/58213) | Update dependencies |
| 2.1.20 | 2025-04-12 | [57671](https://github.com/airbytehq/airbyte/pull/57671) | Update dependencies |
| 2.1.19 | 2025-04-05 | [57086](https://github.com/airbytehq/airbyte/pull/57086) | Update dependencies |
| 2.1.18 | 2025-03-29 | [56716](https://github.com/airbytehq/airbyte/pull/56716) | Update dependencies |
| 2.1.17 | 2025-03-22 | [56081](https://github.com/airbytehq/airbyte/pull/56081) | Update dependencies |
| 2.1.16 | 2025-03-08 | [55449](https://github.com/airbytehq/airbyte/pull/55449) | Update dependencies |
| 2.1.15 | 2025-03-01 | [54793](https://github.com/airbytehq/airbyte/pull/54793) | Update dependencies |
| 2.1.14 | 2025-02-22 | [54326](https://github.com/airbytehq/airbyte/pull/54326) | Update dependencies |
| 2.1.13 | 2025-02-15 | [53791](https://github.com/airbytehq/airbyte/pull/53791) | Update dependencies |
| 2.1.12 | 2025-02-08 | [53288](https://github.com/airbytehq/airbyte/pull/53288) | Update dependencies |
| 2.1.11 | 2025-02-01 | [52735](https://github.com/airbytehq/airbyte/pull/52735) | Update dependencies |
| 2.1.10 | 2025-01-25 | [52258](https://github.com/airbytehq/airbyte/pull/52258) | Update dependencies |
| 2.1.9 | 2025-01-18 | [51841](https://github.com/airbytehq/airbyte/pull/51841) | Update dependencies |
| 2.1.8 | 2025-01-11 | [51218](https://github.com/airbytehq/airbyte/pull/51218) | Update dependencies |
| 2.1.7 | 2024-12-28 | [50616](https://github.com/airbytehq/airbyte/pull/50616) | Update dependencies |
| 2.1.6 | 2024-12-21 | [50089](https://github.com/airbytehq/airbyte/pull/50089) | Update dependencies |
| 2.1.5 | 2024-12-14 | [49215](https://github.com/airbytehq/airbyte/pull/49215) | Update dependencies |
| 2.1.4 | 2024-12-11 | [48982](https://github.com/airbytehq/airbyte/pull/48982) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 2.1.3 | 2024-10-29 | [47776](https://github.com/airbytehq/airbyte/pull/47776) | Update dependencies |
| 2.1.2 | 2024-10-28 | [47531](https://github.com/airbytehq/airbyte/pull/47531) | Update dependencies |
| 2.1.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 2.1.0 | 2024-08-15 | [44127](https://github.com/airbytehq/airbyte/pull/44127) | Refactor connector to manifest-only format |
| 2.0.13 | 2024-08-12 | [43857](https://github.com/airbytehq/airbyte/pull/43857) | Update dependencies |
| 2.0.12 | 2024-08-10 | [43685](https://github.com/airbytehq/airbyte/pull/43685) | Update dependencies |
| 2.0.11 | 2024-08-03 | [43156](https://github.com/airbytehq/airbyte/pull/43156) | Update dependencies |
| 2.0.10 | 2024-07-27 | [42798](https://github.com/airbytehq/airbyte/pull/42798) | Update dependencies |
| 2.0.9 | 2024-07-20 | [42314](https://github.com/airbytehq/airbyte/pull/42314) | Update dependencies |
| 2.0.8 | 2024-07-16 | [38347](https://github.com/airbytehq/airbyte/pull/38347) | Make connector compatible with the builder |
| 2.0.7 | 2024-07-13 | [41816](https://github.com/airbytehq/airbyte/pull/41816) | Update dependencies |
| 2.0.6 | 2024-07-10 | [41471](https://github.com/airbytehq/airbyte/pull/41471) | Update dependencies |
| 2.0.5 | 2024-07-09 | [41171](https://github.com/airbytehq/airbyte/pull/41171) | Update dependencies |
| 2.0.4 | 2024-07-06 | [40940](https://github.com/airbytehq/airbyte/pull/40940) | Update dependencies |
| 2.0.3 | 2024-06-26 | [40528](https://github.com/airbytehq/airbyte/pull/40528) | Update dependencies |
| 2.0.2 | 2024-06-22 | [40117](https://github.com/airbytehq/airbyte/pull/40117) | Update dependencies |
| 2.0.1 | 2024-06-06 | [39205](https://github.com/airbytehq/airbyte/pull/39205) | [autopull] Upgrade base image to v1.2.2 |
| 2.0.0 | 2024-03-01 | [35680](https://github.com/airbytehq/airbyte/pull/35680) | Updates `dashboards` stream, Base image migration: remove Dockerfile and use the python-connector-base image, migrated to poetry |
| 1.1.0 | 2023-10-31 | [31909](https://github.com/airbytehq/airbyte/pull/31909) | Add `databases` and `native_query_snippets` streams |
| 1.0.1 | 2023-07-20 | [27777](https://github.com/airbytehq/airbyte/pull/27777) | Update CDK to 0.47.0 |
| 1.0.0 | 2023-06-27 | [27777](https://github.com/airbytehq/airbyte/pull/27777) | Remove Activity Stream |
| 0.3.1 | 2022-12-15 | [20535](https://github.com/airbytehq/airbyte/pull/20535) | Run on CDK 0.15.0 |
| 0.3.0 | 2022-12-13 | [19236](https://github.com/airbytehq/airbyte/pull/19236) | Migrate to YAML. |
| 0.2.0 | 2022-10-28 | [18607](https://github.com/airbytehq/airbyte/pull/18607) | Disallow using `http` URLs |
| 0.1.0 | 2022-06-15 | [13752](https://github.com/airbytehq/airbyte/pull/13752) | Initial (alpha) release |

</details>
