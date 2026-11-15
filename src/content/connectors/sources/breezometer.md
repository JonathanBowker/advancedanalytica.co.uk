---
generated_record: true
connector_name: Breezometer
connector_type: source
connector_slug: breezometer
connector_directory: source-breezometer
definition_id: 7c37685e-8512-4901-addf-9afbef6c0de9
version: 0.2.25
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/breezometer
logo: /images/connectors/sources/breezometer.svg
logo_source_path: airbyte-integrations/connectors/source-breezometer/icon.svg
logo_sha256: ed36f6ef6a07582be259ebe588ffc72f3c560cd7617fb2248840fca4a050b526
original_metadata_path: airbyte-integrations/connectors/source-breezometer/metadata.yaml
original_metadata_sha256: a3eb1d9f032b4b562287f95e27cc97df170f83988e72c77d30d075f9f768c022
original_document_path: docs/integrations/sources/breezometer.md
original_document_sha256: 39b655b29ca2f2da2c1e6a5dec235f2e4e1c7d123e31deab6fd95f55a1ecff5c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: dcf1617408c6066f06e6db167df10d219dc36c59965b9840d2a17883563bdf2f
rewritten_at: 2026-11-12T13:32:02.676159+00:00
---

# Breezometer

:::warning

## Deprecation notice

The Breezometer source connector is archived and no longer available for new Airbyte connections.

Google acquired BreezoMeter in September 2022 and wound down its standalone API. The BreezoMeter website and API documentation (`breezometer.com`, `docs.breezometer.com`) now redirect to the [Google Maps Platform Environment APIs](https://mapsplatform.google.com/maps-products/#environment-section). You can no longer obtain new BreezoMeter API keys. The Weather API endpoints used by the `weather_current` and `weather_forecast` streams no longer exist. The replacement products are Google Maps Platform Air Quality API and Pollen API. They use a different host, authentication scheme, request format and response schema. Therefore, you can't migrate this connector to them in place.

### Recommended actions

If you still need environmental data, use the [Google Maps Platform Air Quality API](https://developers.google.com/maps/documentation/air-quality) and [Pollen API](https://developers.google.com/maps/documentation/pollen) through a custom connector. For guidance, visit [Custom Connector documentation](https://docs.airbyte.com/connector-development/).

:::

The Breezometer connector lets you request environmental information for a specific location. This includes air quality, pollen forecasts, current and forecast weather, and wildfires.

## Prerequisites

- A Breezometer
- An `api_key`, which you can find on your Breezometer account home page.

## Supported sync modes

The Breezometer connector supports full refresh syncs.

## Airbyte Open Source

- API Key
- Latitude
- Longitude
- Days to Forecast
- Hours to Forecast
- Historic Hours
- Radius

## Supported streams

- [Air Quality - Current](https://docs.breezometer.com/api-documentation/air-quality-api/v2/#current-conditions)
- [Air Quality - Forecast](https://docs.breezometer.com/api-documentation/air-quality-api/v2/#hourly-forecast)
- [Air Quality - Historical](https://docs.breezometer.com/api-documentation/air-quality-api/v2/#hourly-history)
- [Pollen - Forecast](https://docs.breezometer.com/api-documentation/pollen-api/v2/#daily-forecast)
- [Weather - Current](https://docs.breezometer.com/api-documentation/weather-api/v1/#current-conditions)
- [Weather - Forecast](https://docs.breezometer.com/api-documentation/weather-api/v1/#hourly-forecast)
- [Wildfire - Burnt Area](https://docs.breezometer.com/api-documentation/wildfire-tracker-api/v1/#burnt-area-api)
- [Wildfire - Locate](https://docs.breezometer.com/api-documentation/wildfire-tracker-api/v1/#current-conditions)

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                     |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------------ |
| 0.2.25 | 2026-10-07 | [88295](https://github.com/airbytehq/airbyte/pull/88295) | Archive connector: BreezoMeter API was folded into Google Maps Platform after the Google acquisition; vendor docs/signup are gone and the Weather API endpoints no longer exist |
| 0.2.24 | 2025-05-10 | [59868](https://github.com/airbytehq/airbyte/pull/59868) | Update dependencies |
| 0.2.23 | 2025-05-03 | [59319](https://github.com/airbytehq/airbyte/pull/59319) | Update dependencies |
| 0.2.22 | 2025-04-26 | [58734](https://github.com/airbytehq/airbyte/pull/58734) | Update dependencies |
| 0.2.21 | 2025-04-19 | [58255](https://github.com/airbytehq/airbyte/pull/58255) | Update dependencies |
| 0.2.20 | 2025-04-12 | [57640](https://github.com/airbytehq/airbyte/pull/57640) | Update dependencies |
| 0.2.19 | 2025-04-05 | [57179](https://github.com/airbytehq/airbyte/pull/57179) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56555](https://github.com/airbytehq/airbyte/pull/56555) | Update dependencies |
| 0.2.17 | 2025-03-22 | [56113](https://github.com/airbytehq/airbyte/pull/56113) | Update dependencies |
| 0.2.16 | 2025-03-08 | [55389](https://github.com/airbytehq/airbyte/pull/55389) | Update dependencies |
| 0.2.15 | 2025-03-01 | [54884](https://github.com/airbytehq/airbyte/pull/54884) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54277](https://github.com/airbytehq/airbyte/pull/54277) | Update dependencies |
| 0.2.13 | 2025-02-15 | [53931](https://github.com/airbytehq/airbyte/pull/53931) | Update dependencies |
| 0.2.12 | 2025-02-08 | [52936](https://github.com/airbytehq/airbyte/pull/52936) | Update dependencies |
| 0.2.11 | 2025-01-25 | [52160](https://github.com/airbytehq/airbyte/pull/52160) | Update dependencies |
| 0.2.10 | 2025-01-18 | [51747](https://github.com/airbytehq/airbyte/pull/51747) | Update dependencies |
| 0.2.9 | 2025-01-11 | [51250](https://github.com/airbytehq/airbyte/pull/51250) | Update dependencies |
| 0.2.8 | 2024-12-28 | [50488](https://github.com/airbytehq/airbyte/pull/50488) | Update dependencies |
| 0.2.7 | 2024-12-21 | [50219](https://github.com/airbytehq/airbyte/pull/50219) | Update dependencies |
| 0.2.6 | 2024-12-14 | [49559](https://github.com/airbytehq/airbyte/pull/49559) | Update dependencies |
| 0.2.5 | 2024-12-12 | [49280](https://github.com/airbytehq/airbyte/pull/49280) | Update dependencies |
| 0.2.4 | 2024-12-11 | [48902](https://github.com/airbytehq/airbyte/pull/48902) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.2.3 | 2024-11-04 | [48260](https://github.com/airbytehq/airbyte/pull/48260) | Update dependencies |
| 0.2.2 | 2024-10-29 | [47882](https://github.com/airbytehq/airbyte/pull/47882) | Update dependencies |
| 0.2.1 | 2024-10-28 | [43777](https://github.com/airbytehq/airbyte/pull/43777) | Update dependencies |
| 0.2.0 | 2024-08-22 | [44563](https://github.com/airbytehq/airbyte/pull/44563) | Refactor connector to manifest-only format |
| 0.1.1 | 2024-05-21 | [38529](https://github.com/airbytehq/airbyte/pull/38529) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-10-29 | [18650](https://github.com/airbytehq/airbyte/pull/18650) | Initial version/release of the connector. |

</details>
