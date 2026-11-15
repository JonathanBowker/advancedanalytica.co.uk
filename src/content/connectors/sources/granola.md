---
generated_record: true
connector_name: Granola
connector_type: source
connector_slug: granola
connector_directory: source-granola
definition_id: 9023923c-002f-4131-9554-3ebdf56540a4
version: 1.1.2
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/granola
logo: /images/connectors/sources/granola.svg
logo_source_path: airbyte-integrations/connectors/source-granola/icon.svg
logo_sha256: bc65b35c92f1c833073dcc0d3b708d5ff9684d05b7026c6e4f58fac3efddae60
original_metadata_path: airbyte-integrations/connectors/source-granola/metadata.yaml
original_metadata_sha256: 3249acfdf89a3802f12c16f97b66dbdcb883a02cb90864a67e96128cb44d0913
original_document_path: docs/integrations/sources/granola.md
original_document_sha256: 7c61d67c1e8b5087ff51f661c04dac29463385185e1e1dc0ff202abfa4c24629
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ba7389e259837275a059e971d6156f3310691ae9366cfdeedce192b7cf83732a
rewritten_at: 2026-11-12T13:42:27.095902+00:00
---

# Granola

<HideInUI>

This page explains how to set up and use the [Granola](https://www.granola.ai/) source connector. Granola is an AI-powered meeting notes tool. The connector reads meeting notes from a Granola workspace using the [Granola API](https://docs.granola.ai/introduction).

</HideInUI>

When upgrading across a breaking version, such as 1.0.0, see the [migration guide](granola-migrations.md).

## Prerequisites

You need a Granola API key from a workspace on a **Business** or **Enterprise** plan. Granola provides two kinds of keys:

- **Personal API key**: any workspace member can create one. It belongs to that member and inherits their access.
- **Workspace API key**: only workspace administrators can create one. It belongs to the workspace, doesn't expire, and remains active after its creator leaves.

Both keys use the same API endpoints and connector behaviour. The key type determines which notes it can read. See [Data access by key type](#data-access-by-key-type) for details.

## Set up the connector

### Generate an API key

#### Personal API key

1. Open the Granola desktop app.
2. Go to **Settings > Connectors > API keys > Create new key**.
3. Select the key's note access scopes: **Personal notes**, **Public notes**, or both.
4. Click **Generate API Key**.
5. Copy the generated API key and store it securely.

:::note
On Enterprise plans, a workspace administrator controls which scopes members can use in **Settings > Workspace > General > API access for members**. Members can't create keys with scopes disabled there. The connector can't read notes covered by those scopes.
:::

#### Workspace API key

1. Open the Granola desktop app as a workspace administrator.
2. Go to **Settings > Connectors > Workspace API keys > Create new key**.
3. Copy the generated API key and store it securely.

### Set up Granola in Airbyte

1. Enter a **Name** for the Granola source connector.
2. Enter your **API Key**.
3. Optionally, enter a **Start Date** in `YYYY-MM-DD` format. The connector replicates notes last updated on or after this date. If you leave this field empty, it replicates notes updated within the last two years.
4. Click **Set up source** and wait for the connection test to finish.

## Supported sync modes

The Granola source connector supports these sync modes:

| Feature                             | Supported? |
| :---------------------------------- | :--------- |
| Full Refresh Sync                   | Yes        |
| Full Refresh Sync - Overwrite       | Yes        |
| Incremental Sync                    | Yes        |
| Incremental Sync - Append           | Yes        |
| Incremental Sync - Append + Deduped | Yes        |

## Supported streams

The Granola source connector supports these streams:

| Stream | Sync mode | Primary key |
| :--- | :--- | :--- |
| `notes` | Incremental | `id` |
| `detailed_notes` | Incremental | `id` |
| `note_transcripts` | Full refresh | None |

### Notes

The `notes` stream retrieves meeting notes from your Granola workspace through the [`GET /v1/notes`](https://docs.granola.ai/api-reference/list-notes) endpoint. Each record includes the note ID, title, object type, owner name and email, and creation and last-update timestamps. The API may return other fields, which the connector captures automatically.

For incremental syncs, the connector uses `updated_at` as the cursor field. It passes the stored cursor in the `updated_after` query parameter. The API has no upper-bound update filter. Therefore, the connector reads every note updated since the cursor in one request window. The window begins one second before the stored cursor, preventing missed notes updated within that second. If someone edits a note after a sync, the next incremental sync emits it again. In **Incremental | Append** mode, each edit adds a new row. Each sync also repeats the most recently updated note.

The connector reads data in one window, so it saves the `notes` cursor only after finishing the stream. If a sync fails during `notes`, the next sync restarts from the last saved cursor. If no cursor exists, it restarts from your start date.

The API returns only notes with a generated AI summary and transcript. It excludes notes still being processed or never summarised.

The Granola API neither returns deleted notes nor marks them as deleted. Therefore, the connector can't report deletions. Deleted Granola notes remain in your destination until you run a full refresh with overwrite.

### Detailed notes

The `detailed_notes` stream retrieves each note from the `notes` stream through the [`GET /v1/notes/{note_id}`](https://docs.granola.ai/api-reference/get-note) endpoint. It includes note metadata and fields available only from the detail endpoint. These fields include summaries, transcripts, attendees, calendar events, and folder membership.

For incremental syncs, the stream uses `updated_at` as the cursor field. Its state keeps a separate copy of the `notes` cursor. It uses this cursor to list notes with `updated_after`. After the first sync, it requests details only for notes updated since the previous sync. Because this copy is separate, syncing, clearing, or refreshing `notes` doesn't change which notes `detailed_notes` requests. The connector always requests transcript data for this stream.

In **Incremental | Append** mode, each edit adds a row for the note. Each sync also repeats the most recently updated note because `notes` uses the same one-second lookback.

Incremental sync for `detailed_notes` is available from version 1.1.0. Existing connections using full refresh continue doing so until you change the stream's sync mode.

Because `detailed_notes` uses `notes` as its parent stream, it requests details only for notes returned by the list endpoint. The connector skips a note without producing a record in two cases:

- Granola responds with `413` and error code `TRANSCRIPT_TOO_LARGE` because the transcript is too large to return inline. Long recordings, such as multi-hour meetings, are most likely to reach this limit. Sync the `note_transcripts` stream to replicate these transcripts. Versions before 0.3.0 failed the sync in this situation.
- Granola lists the note but responds with `404 NOTE_NOT_FOUND` when the connector requests its details. Granola may return `404` for the same note on every sync. Versions 1.1.1 and earlier failed the entire stream in this situation.

Later incremental syncs request a skipped note again only after someone edits it. See [Notes are missing from `detailed_notes`](#notes-are-missing-from-detailed_notes) to identify skipped notes.

### Note transcripts

The `note_transcripts` stream retrieves each note's transcript from the [`GET /v1/notes/{note_id}/transcript`](https://docs.granola.ai/api-reference/get-transcript) endpoint, with one record per transcript segment. Each record contains the segment's speaker, text, start and end times, and the note's `note_id`. This paged endpoint returns transcripts of any size, including those `detailed_notes` can't return inline.

The stream has no primary key, so it appends records instead of deduplicating them. It isn't incremental. Every sync rereads all notes updated since your start date and requests their transcripts again. It therefore adds at least one request for every note in that range, not only new notes. The connector requests the API's maximum of 100 transcript segments per page. Transcripts exceeding 100 segments require one extra request for each additional page. With thousands of historical notes, these requests dominate sync time. Set your sync frequency according to the total note count.

Granola may stop returning a transcript for a note listed by the `notes` stream. This can happen when someone deletes or unshares a note during a sync. The API then responds with `404`, and the connector skips that note instead of failing the stream.

### Data access by key type

Your configured key determines which notes the connector can read:

| Key type | Data scope |
| :--- | :--- |
| **Personal API key** | The scopes selected when the key was created. **Personal notes** covers notes you own, notes shared directly with you, and notes in private folders shared with you. **Public notes** covers notes visible to everyone in the workspace, such as notes in the Team space. |
| **Workspace API key** | Public notes in the workspace, plus notes in spaces where **Allow Granola API access** is turned on. Granola turns this setting on by default for new spaces. For an existing space, a workspace administrator can open the space, click **Integrations** in the space header, choose **Granola API**, and switch on **Allow access with a workspace API key**. Folders inherit this setting from their space. If an administrator turned off **Allow public folders** for the workspace, the key can't read public notes. Private notes and folders that weren't shared this way are excluded. |

Granola notes are private by default. A key with only **Public notes** access returns nothing until notes enter a folder visible to everyone in the workspace. If a sync returns no records, check the key's scopes first. For more information, see the [Granola API documentation](https://docs.granola.ai/help-center/sharing/integrations/granola-api).

## Performance

The Granola API enforces rate limits. Depending on the key's access scope, these limits apply per user or workspace.

| Metric | Value |
| :--- | :--- |
| Burst capacity | 25 requests |
| Time window | 5 seconds |
| Sustained rate | 5 requests per second (300/minute) |

The connector limits requests to the documented burst limit of 25 requests per 5 seconds. If Granola still returns `429 Too Many Requests` or a `5xx` server error, the connector retries up to 5 times. When available, it follows the interval in the `Retry-After` response header, up to 60 seconds. Otherwise, it uses exponential backoff.

## Troubleshooting

### Syncs fail with `401` or `403`

When Granola returns `401` or `403`, the connector immediately fails the sync with a configuration error. It doesn't retry.

- `401 Unauthorized` means Granola rejected the API key. The key may be mistyped, revoked, or expired. Workspace API keys don't expire, but personal API keys can. Create a new key in the Granola desktop app, then update the connector's **API Key**.
- `403 Forbidden` means Granola accepted the key but denied access to the requested data. Compare the key's access scopes with [Data access by key type](#data-access-by-key-type).

### Notes missing after version 0.2.13 or earlier

Versions up to 0.2.13 sent each 30-day window's bounds as dates instead of timestamps. The Granola API excludes the entire day named by `created_before`. Those syncs therefore skipped every note created on a window boundary date. This affected both the `notes` and `detailed_notes` streams. Version 0.2.14 sends second-level timestamps, so new syncs cover the full range.

Existing connections don't automatically backfill skipped notes. After upgrading to 0.2.14 or later, [refresh](/platform/operator-guides/refreshes) the `notes` stream once to recover them. If you upgrade directly to 1.0.0 or later, you don't need a separate refresh. The first sync after upgrading rereads every note updated since your start date. You don't need to do anything for `detailed_notes`. Before version 1.1.0, it supported only full refresh. After the fix, each sync reread every note since your start date.

### Notes missing from `detailed_notes`

From version 0.3.0, the connector skips a note in `detailed_notes` when Granola can't return its transcript inline. Earlier versions failed the entire sync in this situation. The connector logs each skip at INFO level, not as a warning. Search the sync logs for `transcript is too large` to identify affected notes. From version 1.1.2, the connector also skips notes when Granola responds with `404`. Search the sync logs for `returned 404 when its details were requested` to identify those notes. A note skipped because of `404` still appears in `notes`, but may have no transcript in `note_transcripts`.

A note skipped because its transcript is too large still appears in `notes`. Its record includes the ID, title, owner, and creation and update times. Its transcript also remains available in `note_transcripts`. Only detail endpoint fields are unavailable: summaries, attendees, calendar events, and folder membership.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Reference

This connector uses the [Granola API](https://docs.granola.ai/introduction). Every API request uses the `https://public-api.granola.ai` endpoint.

For programmatic configuration, use these parameter names:

| Field | Required | Description |
| :--- | :---: | :--- |
| `api_key` | Yes | Granola API key. Use a personal API key for notes your own account can read, or a workspace API key for the workspace's shared notes. |
| `start_date` | No | Earliest note update date to replicate, in `YYYY-MM-DD` format. Defaults to two years before the sync runs. |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :------ | :--- | :----------- | :------ |
| 1.1.2 | 2026-11-10 | [91289](https://github.com/airbytehq/airbyte/pull/91289) | Skip notes that Granola returns as not found in the detailed_notes stream instead of failing the sync |
| 1.1.1 | 2026-11-10 | [91556](https://github.com/airbytehq/airbyte/pull/91556) | Update dependencies |
| 1.1.0 | 2026-11-04 | [89049](https://github.com/airbytehq/airbyte/pull/89049) | Add incremental sync to the detailed_notes stream |
| 1.0.6 | 2026-11-03 | [90584](https://github.com/airbytehq/airbyte/pull/90584) | Update dependencies |
| 1.0.5 | 2026-10-27 | [89923](https://github.com/airbytehq/airbyte/pull/89923) | Update dependencies |
| 1.0.4 | 2026-10-20 | [89255](https://github.com/airbytehq/airbyte/pull/89255) | Update dependencies |
| 1.0.3 | 2026-10-13 | [88655](https://github.com/airbytehq/airbyte/pull/88655) | Update dependencies |
| 1.0.2 | 2026-10-06 | [87885](https://github.com/airbytehq/airbyte/pull/87885) | Update dependencies |
| 1.0.1 | 2026-10-05 | [87682](https://github.com/airbytehq/airbyte/pull/87682) | Promote to certified |
| 1.0.0 | 2026-10-02 | [87011](https://github.com/airbytehq/airbyte/pull/87011) | Sync notes incrementally on updated_at so edited notes are replicated. Append-mode `notes` connections get duplicates on the first sync; see the migration guide |
| 0.3.5 | 2026-09-29 | [86915](https://github.com/airbytehq/airbyte/pull/86915) | Add Granola-specific messages for 401, 403, 429, and 5xx errors, add heartbeat timeout, suggest `notes` and `detailed_notes`, and fix icon dimensions |
| 0.3.4 | 2026-09-29 | [87192](https://github.com/airbytehq/airbyte/pull/87192) | Update dependencies |
| 0.3.3 | 2026-09-22 | [86667](https://github.com/airbytehq/airbyte/pull/86667) | Update dependencies |
| 0.3.2 | 2026-09-15 | [86082](https://github.com/airbytehq/airbyte/pull/86082) | Update dependencies |
| 0.3.1 | 2026-09-08 | [85516](https://github.com/airbytehq/airbyte/pull/85516) | Update dependencies |
| 0.3.0 | 2026-08-21 | [84907](https://github.com/airbytehq/airbyte/pull/84907) | Add note_transcripts stream for transcripts of any size. Notes whose transcript is too large to return inline are now skipped in detailed_notes, producing no record for those notes, instead of failing the sync |
| 0.2.14 | 2026-08-21 | [84898](https://github.com/airbytehq/airbyte/pull/84898) | Stop dropping notes created on a 30-day incremental slice boundary date |
| 0.2.13 | 2026-08-18 | [84623](https://github.com/airbytehq/airbyte/pull/84623) | Update dependencies |
| 0.2.12 | 2026-08-12 | [84278](https://github.com/airbytehq/airbyte/pull/84278) | Retry rate-limited and server-error responses with backoff honoring Retry-After |
| 0.2.11 | 2026-08-11 | [83964](https://github.com/airbytehq/airbyte/pull/83964) | Update dependencies |
| 0.2.10 | 2026-08-04 | [83481](https://github.com/airbytehq/airbyte/pull/83481) | Update dependencies |
| 0.2.9 | 2026-07-28 | [82970](https://github.com/airbytehq/airbyte/pull/82970) | Update dependencies |
| 0.2.8 | 2026-07-21 | [82437](https://github.com/airbytehq/airbyte/pull/82437) | Update dependencies |
| 0.2.7 | 2026-07-14 | [81869](https://github.com/airbytehq/airbyte/pull/81869) | Update dependencies |
| 0.2.6 | 2026-06-30 | [81096](https://github.com/airbytehq/airbyte/pull/81096) | Update dependencies |
| 0.2.5 | 2026-06-23 | [80491](https://github.com/airbytehq/airbyte/pull/80491) | Update dependencies |
| 0.2.4 | 2026-06-16 | [79886](https://github.com/airbytehq/airbyte/pull/79886) | Update dependencies |
| 0.2.3 | 2026-06-09 | [79357](https://github.com/airbytehq/airbyte/pull/79357) | Update dependencies |
| 0.2.2 | 2026-06-02 | [77288](https://github.com/airbytehq/airbyte/pull/77288) | Update dependencies |
| 0.2.1 | 2026-05-15 | [78117](https://github.com/airbytehq/airbyte/pull/78117) | Update API key setup instructions |
| 0.2.0 | 2026-05-07 | [77861](https://github.com/airbytehq/airbyte/pull/77861) | Promoted release candidate to GA |
| 0.2.0-rc.4 | 2026-05-01 | [77698](https://github.com/airbytehq/airbyte/pull/77698) | Revert default_concurrency from 6 to 5 (optimal value from tuning) and add HTTP API budget matching Granola's documented rate limit (25 req/5s burst) |
| 0.2.0-rc.3 | 2026-04-30 | [77645](https://github.com/airbytehq/airbyte/pull/77645) | Increase default_concurrency from 5 to 6 for concurrency tuning iteration 3 (final) |
| 0.2.0-rc.2 | 2026-04-28 | [77551](https://github.com/airbytehq/airbyte/pull/77551) | Increase default_concurrency from 4 to 5 for concurrency tuning iteration 2 |
| 0.2.0-rc.1 | 2026-04-27 | [77067](https://github.com/airbytehq/airbyte/pull/77067) | set default_concurrency=4 for concurrency tuning iteration 1 (Path A, max_rate_limit=5 req/s) |
| 0.1.3 | 2026-04-21 | [76632](https://github.com/airbytehq/airbyte/pull/76632) | Update dependencies |
| 0.1.2 | 2026-03-31 | [75737](https://github.com/airbytehq/airbyte/pull/75737) | Update dependencies |
| 0.1.1 | 2026-03-24 | [75353](https://github.com/airbytehq/airbyte/pull/75353) | Update dependencies |
| 0.1.0 | 2026-02-25 | [74033](https://github.com/airbytehq/airbyte/pull/74033) | Add detailed_notes substream with full note content via SubstreamPartitionRouter |
| 0.0.3 | 2026-02-24 | [73377](https://github.com/airbytehq/airbyte/pull/73377) | Update dependencies |
| 0.0.2 | 2026-02-12 | [73306](https://github.com/airbytehq/airbyte/pull/73306) | Fix pagination: set page_size to API maximum of 30 and improve stop condition |
| 0.0.1 | 2026-02-11 | [73238](https://github.com/airbytehq/airbyte/pull/73238) | Initial release |

</details>
