---
generated_record: true
connector_name: NinjaOne RMM
connector_type: source
connector_slug: ninjaone-rmm
connector_directory: source-ninjaone-rmm
definition_id: 49897212-53be-4898-ba2e-b73e72d645ef
version: 0.1.5
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/ninjaone-rmm
logo: /images/connectors/sources/ninjaone-rmm.svg
logo_source_path: airbyte-integrations/connectors/source-ninjaone-rmm/icon.svg
logo_sha256: 2c08718e3d446fb8a0f198dffe7e2db54536bdf7746bdafc2b39d3c92e691d28
original_metadata_path: airbyte-integrations/connectors/source-ninjaone-rmm/metadata.yaml
original_metadata_sha256: a1f6cf56a7b08ca1198a33511f4f3defaa253f89988a1bef5d8450d0ed823161
original_document_path: docs/integrations/sources/ninjaone-rmm.md
original_document_sha256: 4a3d103816b186a9e7095241a0f80cc1b691f1a2ab600c89f446a4f5f7d76582
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 3800021aa3b2117b718ae91bb94555cc134f73ae2620a3d870cf6ea1cafb61cf
rewritten_at: 2026-11-12T13:48:36.393633+00:00
---

# NinjaOne RMM
Website: https://app.ninjarmm.com/
API Reference: https://app.ninjarmm.com/apidocs/?links.active=core

When upgrading across a breaking version, such as 0.1.0, see [migration guide](ninjaone-rmm-migrations.md).

## Prerequisites

The connector requests a fresh access token whenever needed because tokens expire after one hour. NinjaOne Public API only supports [OAuth 2.0](https://app.ninjarmm.com/apidocs-beta/authorization/overview), so the connector authenticates with [Client Credentials flow](https://app.ninjarmm.com/apidocs-beta/authorization/flows/client-credentials-flow).

1. In NinjaOne, go to **Administration > Apps > API**, open the **Client App IDs** tab and click **Add**.
2. Choose **API Services (machine-to-machine)** as the Application Platform, name the application and select the **Monitoring** scope. Monitoring grants the read-only access the connector needs. The connector doesn't request specific scopes. Its access token receives every scope you enable for the application.
3. Under **Allowed Grant Types**, select **Client Credentials**.
4. Save the application, then copy the generated **Client ID** and **Client Secret**. The secret appears only once.

:::note
If the connection test fails with `404 Client Error: Not Found for url: https://<region>.ninjarmm.com/ws/oauth/token`, NinjaOne didn't recognise the Client ID. Check the ID. Make sure the selected **Region** matches the instance where you created the application.
:::

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `client_id` | `string` | Client ID of a NinjaOne API application that allows the `Client Credentials` grant. |  |
| `client_secret` | `string` | Client Secret of the NinjaOne API application. |  |
| `region` | `string` | The NinjaOne instance your account is hosted on: `app` (app.ninjarmm.com), `us2`, `eu`, `ca` or `oc`. | `app` |
| `start_date` | `string` | Earliest record date to sync for incremental streams, in `YYYY-MM-DDTHH:MM:SSZ` format. The `organizations`, `locations`, and `software_products` streams ignore this value. |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental | Cursor Field |
|-------------|-------------|------------|---------------------|----------------------|--------------|
| organizations | id | DefaultPaginator | ✅ |  ❌  | |
| policies | id | No pagination | ✅ |  ✅  | `updated` |
| activities | id | DefaultPaginator | ✅ |  ✅  | `activityTime` |
| automation_scripts | id | No pagination | ✅ |  ✅  | `updatedOn` |
| groups | id | No pagination | ✅ |  ✅  | `updatedOn` |
| locations | id | DefaultPaginator | ✅ |  ❌  | |
| roles | id | No pagination | ✅ |  ✅  | `created` |
| software_products | id | No pagination | ✅ |  ❌  | |

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.1.5 | 2026-11-10 | [91623](https://github.com/airbytehq/airbyte/pull/91623) | Update dependencies |
| 0.1.4 | 2026-11-03 | [90627](https://github.com/airbytehq/airbyte/pull/90627) | Update dependencies |
| 0.1.3 | 2026-10-27 | [89987](https://github.com/airbytehq/airbyte/pull/89987) | Update dependencies |
| 0.1.2 | 2026-10-20 | [89304](https://github.com/airbytehq/airbyte/pull/89304) | Update dependencies |
| 0.1.1 | 2026-10-13 | [88709](https://github.com/airbytehq/airbyte/pull/88709) | Update dependencies |
| 0.1.0 | 2026-10-09 | [88252](https://github.com/airbytehq/airbyte/pull/88252) | Authenticate with OAuth2 client credentials (NinjaOne access tokens expire after 1 hour), add `region` option, fix `after`/`olderThan` pagination parameters |
| 0.0.51 | 2026-10-06 | [87939](https://github.com/airbytehq/airbyte/pull/87939) | Update dependencies |
| 0.0.50 | 2026-09-29 | [87234](https://github.com/airbytehq/airbyte/pull/87234) | Update dependencies |
| 0.0.49 | 2026-09-22 | [86723](https://github.com/airbytehq/airbyte/pull/86723) | Update dependencies |
| 0.0.48 | 2026-09-15 | [86142](https://github.com/airbytehq/airbyte/pull/86142) | Update dependencies |
| 0.0.47 | 2026-09-08 | [85578](https://github.com/airbytehq/airbyte/pull/85578) | Update dependencies |
| 0.0.46 | 2026-08-18 | [84650](https://github.com/airbytehq/airbyte/pull/84650) | Update dependencies |
| 0.0.45 | 2026-08-11 | [84038](https://github.com/airbytehq/airbyte/pull/84038) | Update dependencies |
| 0.0.44 | 2026-08-04 | [83544](https://github.com/airbytehq/airbyte/pull/83544) | Update dependencies |
| 0.0.43 | 2026-07-28 | [83021](https://github.com/airbytehq/airbyte/pull/83021) | Update dependencies |
| 0.0.42 | 2026-07-21 | [82515](https://github.com/airbytehq/airbyte/pull/82515) | Update dependencies |
| 0.0.41 | 2026-07-14 | [81927](https://github.com/airbytehq/airbyte/pull/81927) | Update dependencies |
| 0.0.40 | 2026-06-30 | [81149](https://github.com/airbytehq/airbyte/pull/81149) | Update dependencies |
| 0.0.39 | 2026-06-23 | [80569](https://github.com/airbytehq/airbyte/pull/80569) | Update dependencies |
| 0.0.38 | 2026-06-16 | [79941](https://github.com/airbytehq/airbyte/pull/79941) | Update dependencies |
| 0.0.37 | 2026-06-09 | [79419](https://github.com/airbytehq/airbyte/pull/79419) | Update dependencies |
| 0.0.36 | 2026-06-02 | [78838](https://github.com/airbytehq/airbyte/pull/78838) | Update dependencies |
| 0.0.35 | 2026-04-28 | [77364](https://github.com/airbytehq/airbyte/pull/77364) | Update dependencies |
| 0.0.34 | 2026-04-21 | [76691](https://github.com/airbytehq/airbyte/pull/76691) | Update dependencies |
| 0.0.33 | 2026-03-31 | [75742](https://github.com/airbytehq/airbyte/pull/75742) | Update dependencies |
| 0.0.32 | 2026-03-17 | [75066](https://github.com/airbytehq/airbyte/pull/75066) | Update dependencies |
| 0.0.31 | 2026-03-10 | [74596](https://github.com/airbytehq/airbyte/pull/74596) | Update dependencies |
| 0.0.30 | 2026-02-24 | [73833](https://github.com/airbytehq/airbyte/pull/73833) | Update dependencies |
| 0.0.29 | 2026-02-10 | [72595](https://github.com/airbytehq/airbyte/pull/72595) | Update dependencies |
| 0.0.28 | 2026-01-20 | [71951](https://github.com/airbytehq/airbyte/pull/71951) | Update dependencies |
| 0.0.27 | 2026-01-14 | [71596](https://github.com/airbytehq/airbyte/pull/71596) | Update dependencies |
| 0.0.26 | 2025-12-18 | [70537](https://github.com/airbytehq/airbyte/pull/70537) | Update dependencies |
| 0.0.25 | 2025-11-25 | [69851](https://github.com/airbytehq/airbyte/pull/69851) | Update dependencies |
| 0.0.24 | 2025-11-18 | [69404](https://github.com/airbytehq/airbyte/pull/69404) | Update dependencies |
| 0.0.23 | 2025-10-29 | [68696](https://github.com/airbytehq/airbyte/pull/68696) | Update dependencies |
| 0.0.22 | 2025-10-21 | [68401](https://github.com/airbytehq/airbyte/pull/68401) | Update dependencies |
| 0.0.21 | 2025-10-14 | [67752](https://github.com/airbytehq/airbyte/pull/67752) | Update dependencies |
| 0.0.20 | 2025-10-07 | [67414](https://github.com/airbytehq/airbyte/pull/67414) | Update dependencies |
| 0.0.19 | 2025-09-30 | [66925](https://github.com/airbytehq/airbyte/pull/66925) | Update dependencies |
| 0.0.18 | 2025-09-24 | [66610](https://github.com/airbytehq/airbyte/pull/66610) | Update dependencies |
| 0.0.17 | 2025-09-10 | [65807](https://github.com/airbytehq/airbyte/pull/65807) | Update dependencies |
| 0.0.16 | 2025-08-23 | [65176](https://github.com/airbytehq/airbyte/pull/65176) | Update dependencies |
| 0.0.15 | 2025-08-09 | [64686](https://github.com/airbytehq/airbyte/pull/64686) | Update dependencies |
| 0.0.14 | 2025-08-02 | [64230](https://github.com/airbytehq/airbyte/pull/64230) | Update dependencies |
| 0.0.13 | 2025-07-26 | [63812](https://github.com/airbytehq/airbyte/pull/63812) | Update dependencies |
| 0.0.12 | 2025-07-19 | [63445](https://github.com/airbytehq/airbyte/pull/63445) | Update dependencies |
| 0.0.11 | 2025-07-12 | [63218](https://github.com/airbytehq/airbyte/pull/63218) | Update dependencies |
| 0.0.10 | 2025-07-05 | [62621](https://github.com/airbytehq/airbyte/pull/62621) | Update dependencies |
| 0.0.9 | 2025-06-28 | [62358](https://github.com/airbytehq/airbyte/pull/62358) | Update dependencies |
| 0.0.8 | 2025-06-21 | [61905](https://github.com/airbytehq/airbyte/pull/61905) | Update dependencies |
| 0.0.7 | 2025-06-14 | [61033](https://github.com/airbytehq/airbyte/pull/61033) | Update dependencies |
| 0.0.6 | 2025-05-24 | [60495](https://github.com/airbytehq/airbyte/pull/60495) | Update dependencies |
| 0.0.5 | 2025-05-10 | [59093](https://github.com/airbytehq/airbyte/pull/59093) | Update dependencies |
| 0.0.4 | 2025-04-19 | [58525](https://github.com/airbytehq/airbyte/pull/58525) | Update dependencies |
| 0.0.3 | 2025-04-12 | [57868](https://github.com/airbytehq/airbyte/pull/57868) | Update dependencies |
| 0.0.2 | 2025-04-05 | [57325](https://github.com/airbytehq/airbyte/pull/57325) | Update dependencies |
| 0.0.1 | 2025-04-04 | [57013](https://github.com/airbytehq/airbyte/pull/57013) | Initial release by [@btkcodedev](https://github.com/btkcodedev) via Connector Builder |

</details>
