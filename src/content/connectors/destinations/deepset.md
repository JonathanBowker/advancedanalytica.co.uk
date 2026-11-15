---
generated_record: true
connector_name: Deepset
connector_type: destination
connector_slug: deepset
connector_directory: destination-deepset
definition_id: a6fe9a28-7377-4d2d-aa39-15bcf9578e17
version: 0.1.9
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/deepset
logo: /images/connectors/destinations/deepset.svg
logo_source_path: airbyte-integrations/connectors/destination-deepset/icon.svg
logo_sha256: 7fe29a76bf1cf31ae6182dea3d3079b0cdb55aa8c1dc9758833b36db5c3588d9
original_metadata_path: airbyte-integrations/connectors/destination-deepset/metadata.yaml
original_metadata_sha256: 9f2dc810dae81a51a72eb82a50f0d093c404176d6ac4322b57c7284d19535ffc
original_document_path: docs/integrations/destinations/deepset.md
original_document_sha256: 59e9a4895655b8384189845d064184ad03f2348a47dfa48ce8947bbd7e945c1c
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: df93e4b939e8e7cf254a9b8cc60c9bf8bc903e378c18d18d989738b02024f08b
rewritten_at: 2026-11-12T13:23:32.863009+00:00
---

# deepset AI Platform

deepset AI Platform is a SaaS platform for building LLM applications and managing their whole lifecycle. This covers early prototypes through to large-scale production. For details, see [deepset documentation](https://docs.cloud.deepset.ai/docs/getting-started).

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | Yes |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | Yes |

## Integrate data with Airbyte

The Airbyte deepset destination connector lets you synchronise data to deepset AI Platform. You can stream data from any Airbyte source that emits records matching the document file type. Your synchronised data appear in deepset on the Files page as Markdown files.

_Note_: The deepset destination connector writes data to your deepset workspace but doesn't delete any workspace data. If a file with the same name already exists in the destination workspace, the connector overwrites it.

## Sync data to deepset AI Platform

To use the deepset destination in Airbyte:

1. Log in to deepset AI Platform.

2. Generate your deepset Cloud API key:

    - Click your initials in the top right corner and choose Connections.
    - Scroll to the API Keys section on the Connections page and click _Add new key_. If you need help, see [Generate an API Key](https://docs.cloud.deepset.ai/docs/generate-api-key).

3. Set up the destination connector in Airbyte and provide these details:

    - `Base URL`: The URL for the deepset environment containing your account. Options include `https://api.cloud.deepset.ai` (default) for EU users, `https://api.us.deepset.ai` for US users, or a custom URL for on-premise deployments.
    - `API key`: Your deepset API key, generated in step 2 above.
    - `Workspace name`: The name of the deepset workspace where you want to store the data.
    - `Retry count`: The number of sync retries for a record before it's marked as failed. The default is 5 times.

After you connect a source and the first stream synchronisation succeeds, your records appear as Markdown files on the deepset AI Platform Files page.

## Namespace support

This destination supports [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                |
| :------ | :--------- | :------------------------------------------------------- | :------------------------------------- |
| 0.1.9 | 2026-10-07 | [88205](https://github.com/airbytehq/airbyte/pull/88205) | Fix sync failures caused by unserializable error trace messages (`failure_type` emitted as a string instead of `FailureType`); surface the real reason in `check` failures; drop `main.py` from poetry `packages` so the Docker image builds |
| 0.1.8 | 2025-05-17 | [60635](https://github.com/airbytehq/airbyte/pull/60635) | Update dependencies |
| 0.1.7 | 2025-05-10 | [59834](https://github.com/airbytehq/airbyte/pull/59834) | Update dependencies |
| 0.1.6 | 2025-05-03 | [58717](https://github.com/airbytehq/airbyte/pull/58717) | Update dependencies |
| 0.1.5 | 2025-04-19 | [58229](https://github.com/airbytehq/airbyte/pull/58229) | Update dependencies |
| 0.1.4 | 2025-04-12 | [57619](https://github.com/airbytehq/airbyte/pull/57619) | Update dependencies |
| 0.1.3 | 2025-04-05 | [57176](https://github.com/airbytehq/airbyte/pull/57176) | Update dependencies |
| 0.1.2 | 2025-03-29 | [56599](https://github.com/airbytehq/airbyte/pull/56599) | Update dependencies |
| 0.1.1 | 2025-03-22 | [56097](https://github.com/airbytehq/airbyte/pull/56097) | Update dependencies |
| 0.1.0 | 2025-01-10 | [48875](https://github.com/airbytehq/airbyte/pull/48875) | Initial release |

</details>
