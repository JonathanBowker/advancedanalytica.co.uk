---
generated_record: true
connector_name: Google Analytics (Universal Analytics)
connector_type: source
connector_slug: google-analytics-v4-service-account-only
connector_directory: source-google-analytics-v4-service-account-only
definition_id: 9e28a926-8f3c-4911-982d-a2e1c378b59c
version: 0.1.4
support_level: archived
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/google-analytics-v4-service-account-only
logo: /images/connectors/sources/google-analytics-v4-service-account-only.svg
logo_source_path: airbyte-integrations/connectors/source-google-analytics-v4-service-account-only/icon.svg
logo_sha256: 58bfa2254f9cb05850f7d9791db97103e6bfd4cf26a8e5afa2da2025a7ddff95
original_metadata_path: airbyte-integrations/connectors/source-google-analytics-v4-service-account-only/metadata.yaml
original_metadata_sha256: c62d35c5ed5699222f76383e91fd62af9e53a5c01a4f80f6f4f17952d276a254
original_document_path: docs/integrations/sources/google-analytics-v4-service-account-only.md
original_document_sha256: 0fd938adaeecdcba4ae7e3819e9a015eb88ed207dc2a046ced874b1841af5af8
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f0563c5b70db31820eefdae546139c56f49de12488dda8f9a1622aec829f5ca5
rewritten_at: 2026-11-12T13:39:44.043491+00:00
---

# Google Analytics (Universal Analytics)

Google has discontinued Universal Analytics in favour of Google Analytics 4. Airbyte has archived this connector, and the Reporting API v4 is no longer available. Use the [Google Analytics 4 (GA4) connector](https://docs.airbyte.com/integrations/sources/google-analytics-data-api) instead to sync data from Google Analytics 4.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                  |
|:--------|:-----------| :------------------------------------------------------- |:-----------------------------------------|
| 0.1.4 | 2025-02-15 | [53782](https://github.com/airbytehq/airbyte/pull/53782) | Update dependencies |
| 0.1.3 | 2025-02-01 | [52827](https://github.com/airbytehq/airbyte/pull/52827) | Update dependencies |
| 0.1.2 | 2024-12-12 | [49153](https://github.com/airbytehq/airbyte/pull/49153) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.1.1 | 2024-10-29 | [47820](https://github.com/airbytehq/airbyte/pull/47820) | Update dependencies |
| 0.1.0 | 2024-07-01 | [40244](https://github.com/airbytehq/airbyte/pull/40244) | Deprecate the connector |
| 0.0.2   | 2024-04-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Fix empty response error for test stream |
| 0.0.1   | 2024-01-29 | [34323](https://github.com/airbytehq/airbyte/pull/34323) | Initial Release                          |

</details>
