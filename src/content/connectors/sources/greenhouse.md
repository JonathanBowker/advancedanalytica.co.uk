---
generated_record: true
connector_name: Greenhouse
connector_type: source
connector_slug: greenhouse
connector_directory: source-greenhouse
definition_id: 59f1e50a-331f-4f09-b3e8-2e8d4d355f44
version: 1.5.3
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/greenhouse
logo: /images/connectors/sources/greenhouse.svg
logo_source_path: airbyte-integrations/connectors/source-greenhouse/icon.svg
logo_sha256: dd4e9b83ed4c964f587f4bb1b1337566b6f598f5705b6ff8c4d9ba0050f9b418
original_metadata_path: airbyte-integrations/connectors/source-greenhouse/metadata.yaml
original_metadata_sha256: 8fb3794f9d9dec3144731f70ed447878262f596f8dd9f343ee39c5ce6b89dfca
original_document_path: docs/integrations/sources/greenhouse.md
original_document_sha256: 11b49a6f6931fdfa40d16760d57f39bf89359e94da3d5df5ef6ecc63c2bf923f
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 176f1eab4ecf461872a9ce03abda9b0338689d1dd1e3c7e56ddd517249369438
rewritten_at: 2026-11-12T13:43:52.632354+00:00
---

# Greenhouse

Set up the Greenhouse source connector and find its reference information on this page.

## Prerequisites

The connector reads the Greenhouse Harvest v3 API, which [supports two authentication methods](https://harvestdocs.greenhouse.io/docs/authentication). You need one of these authentication methods:

- **OAuth** (Airbyte Cloud only): a Greenhouse Site Admin must approve the consent flow. Airbyte provides the client ID and client secret.
- **Client Credentials**: provide the client ID and client secret for a **Harvest V3 (OAuth)** custom integration credential created in Greenhouse. You can also provide a Site Admin's user ID.

Whichever method you choose, the token needs the Harvest v3 [scopes](#scopes) for each stream you sync. The **Start date** and **Number of concurrent threads** settings are optional.

## Setup

Choose an authentication method and prepare it in Greenhouse. Then create the source in Airbyte.

## Set up Greenhouse

Choose the method that matches your Airbyte deployment and credential source.

### OAuth

OAuth (Authorization Code) authenticates through Airbyte's registered Greenhouse partner application. You don't create, request or register your own Greenhouse OAuth application. Greenhouse issues partner credentials only to integration partners, not Greenhouse customers. Airbyte provides the client ID and client secret during the consent flow. This method is available only in Airbyte Cloud because it depends on Airbyte's partner credentials.

To use OAuth, you need:

- An Airbyte Cloud workspace.
- A Greenhouse Site Admin who can approve the consent flow.

### Client Credentials

Client Credentials uses a **Harvest V3 (OAuth)** custom integration credential that you create in Greenhouse. Use it with self-managed Airbyte. You can also use it in Airbyte Cloud instead of Airbyte's partner application.

To use Client Credentials, you need:

- Access **Configure** > **Dev Center** > **API Credential Management** in Greenhouse. Click **Create new API credentials**, select **Harvest V3 (OAuth)** and save the credential. Then grant the scopes listed below. Greenhouse provides a client ID and client secret. Copy both into the source.
- You can provide the numeric Greenhouse user ID of a Site Admin. Greenhouse creates an integration service user for every custom credential. By default, the connector sends requests as this user, which can read every Harvest v3 list endpoint. Enter a user ID as the **Site Admin user ID** only to attribute requests to a specific person. Greenhouse denies list endpoints to users who aren't Site Admins.

### Scopes

Both methods need the same scopes. For OAuth, approve every scope requested during the consent flow. For Client Credentials, grant these scopes to the Greenhouse credential:

- `harvest:application_stages:list`
- `harvest:applications:list`
- `harvest:applied_candidate_tags:list`
- `harvest:approval_flows:list`
- `harvest:approver_groups:list`
- `harvest:approvers:list`
- `harvest:attachments:list`
- `harvest:candidate_attribute_types:list`
- `harvest:candidate_educations:list`
- `harvest:candidate_employments:list`
- `harvest:candidate_tags:list`
- `harvest:candidates:list`
- `harvest:close_reasons:list`
- `harvest:custom_field_options:list`
- `harvest:custom_fields:list`
- `harvest:demographic_answer_options:list`
- `harvest:demographic_answers:list`
- `harvest:demographic_question_sets:list`
- `harvest:demographic_questions:list`
- `harvest:departments:list`
- `harvest:eeoc:list`
- `harvest:email_templates:list`
- `harvest:interview_kits:list`
- `harvest:interviewer_tags:list`
- `harvest:interviewers:list`
- `harvest:interviews:list`
- `harvest:job_candidate_attributes:list`
- `harvest:job_hiring_managers:list`
- `harvest:job_interview_stages:list`
- `harvest:job_interviews:list`
- `harvest:job_notes:list`
- `harvest:job_owners:list`
- `harvest:job_post_locations:list`
- `harvest:job_posts:list`
- `harvest:jobs:list`
- `harvest:notes:list`
- `harvest:offers:list`
- `harvest:offices:list`
- `harvest:openings:list`
- `harvest:prospect_details:list`
- `harvest:prospect_pool_stages:list`
- `harvest:prospect_pools:list`
- `harvest:referrers:list`
- `harvest:rejection_details:list`
- `harvest:rejection_reasons:list`
- `harvest:scorecard_candidate_attributes:list`
- `harvest:scorecard_question_answer_options:list`
- `harvest:scorecard_question_answers:list`
- `harvest:scorecard_question_options:list`
- `harvest:scorecard_questions:list`
- `harvest:scorecards:list`
- `harvest:sources:list`
- `harvest:user_emails:list`
- `harvest:user_job_permissions:list`
- `harvest:user_roles:list`
- `harvest:users:list`

Harvest v3 rejects list endpoint requests from users who aren't Site Admins or custom integration service users. The connector then stops the sync with a configuration error. A missing scope causes the same failure for dependent streams. Grant every listed scope unless you plan to disable its corresponding streams. Always grant `harvest:users:list`. The connection check reads the `users` stream, so setup fails without this scope, even if you never sync it.

With OAuth, Greenhouse links scopes to the refresh token issued when you approved consent. Versions 1.2.0, 1.4.0, and 1.5.0 each added streams requiring new scopes. Tokens created before one of these versions don't include its added scopes. Enabling [streams added in 1.2.0](#streams-added-in-120), [streams added in 1.4.0](#streams-added-in-140), or [streams added in 1.5.0](#streams-added-in-150) then causes a `403` error. Open the source settings, click **Authenticate** and approve consent again. Existing synced streams keep working without re-authentication. The consent flow requests scopes for the source's current version. Re-authenticate after an upgrade, not before. Connections that propagate all field and stream changes enable new streams automatically. Syncs then fail with a `403` until you re-authenticate or disable those streams. With Client Credentials, grant the new scopes to the Greenhouse credential instead.

## Set up the connector in Airbyte

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account or open your self-managed Airbyte instance.
2. Click **Sources**, then click **+ New source**.
3. On the Set up the source page, select **Greenhouse** from the Source type dropdown.
4. Enter a name for the Greenhouse connector.
5. Under **Authentication**, select **OAuth** or **Client Credentials**.
   - For **OAuth** (Airbyte Cloud only), click **Authenticate**. Sign in to Greenhouse as a Site Admin and approve the requested scopes. Airbyte enters its partner application's client ID and client secret, then stores the resulting refresh token. You don't enter any Greenhouse credentials.
   - For **Client Credentials**, enter the custom integration credential's **Client ID** and **Client secret**. Leave **Site Admin user ID** blank to send requests as the credential's integration service user. Enter it only to send requests as a specific Site Admin.
6. You can enter a **Start date** in UTC using the format `YYYY-MM-DDTHH:MM:SSZ`. Records updated before this date won't be replicated. If you omit it, the connector replicates all history.
7. You can change **Number of concurrent threads**. The connector uses 2 threads by default and accepts 1 to 8. All threads share one Greenhouse rate limit. Increase this only if your Greenhouse account can handle more API traffic. Reduce it to 1 if syncs fail with rate-limit errors.
8. Click **Set up source**.

:::warning
If you use OAuth, sync at least once every 14 days. Greenhouse [refresh tokens expire after 14 days of non-use](https://harvestdocs.greenhouse.io/docs/harvest-partner-oauth) and rotate on every refresh. If a connection pauses, stops or fails for over 14 days, repeat consent from the source settings. See [Sync fails with a configuration error asking you to re-authenticate](#sync-fails-with-a-configuration-error-asking-you-to-re-authenticate) for the resulting error. Client Credentials has no refresh token, so this doesn't apply.
:::

## Supported sync modes

The Greenhouse source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

**Start date** filters the Greenhouse request, not the sync. Every incremental stream listed below sends `updated_at=gte|<start date>` with each sync. This includes streams configured as Full refresh. A full refresh therefore returns only records updated on or after your start date. Leave **Start date** empty to replicate all history.

Incremental streams reread a one-hour window before the saved cursor during each sync. This captures records updated shortly before the previous sync finished. Incremental - Append can therefore create duplicate destination records. Use Incremental - Append + Deduped, where supported, to keep only each record's latest version.

## Supported streams

New connections enable 10 streams by default: `applications`, `candidates`, `jobs`, `job_posts`, `offers`, `interviews`, `scorecards`, `users`, `departments`, and `offices`. Enable other streams from the connection's stream list.

The table shows each Airbyte stream name and its Harvest v3 endpoint. **Start date** applies to every stream marked incremental, regardless of its selected sync mode. It doesn't apply to other streams. Only the four demographics question and answer-option streams use full refresh. Harvest v3 provides no date filter on `/v3/demographic_questions` or `/v3/demographic_answer_options`, so these streams always read every returned record. Their two child streams retrieve parent IDs across your full Greenhouse history. Their coverage therefore doesn't depend on **Start date**.

| Stream | Sync mode | Notes |
| :--- | :--- | :--- |
| [`activity_feed`](https://harvestdocs.greenhouse.io/reference/get_v3-notes) | Incremental (`updated_at`) | Notes across all candidates |
| [`application_stages`](https://harvestdocs.greenhouse.io/reference/get_v3-application-stages) | Incremental (`updated_at`) | Stage history per application, with time in stage. One row per application per stage entered |
| [`applications`](https://harvestdocs.greenhouse.io/reference/get_v3-applications) | Incremental (`updated_at`) | |
| [`applied_candidate_tags`](https://harvestdocs.greenhouse.io/reference/get_v3-applied-candidate-tags) | Incremental (`updated_at`) | Candidate-to-tag assignments; `tags` on its own is only the dictionary |
| [`approvals`](https://harvestdocs.greenhouse.io/reference/get_v3-approval-flows) | Incremental (`updated_at`) | |
| [`approver_groups`](https://harvestdocs.greenhouse.io/reference/get_v3-approver-groups) | Incremental (`updated_at`) | The steps of an approval chain, per approval flow |
| [`approvers`](https://harvestdocs.greenhouse.io/reference/get_v3-approvers) | Incremental (`updated_at`) | Individual approvers and their status within a group |
| [`attachments`](https://harvestdocs.greenhouse.io/reference/get_v3-attachments) | Incremental (`updated_at`) | One file per application. `url` is a download link Greenhouse expires after seven days |
| [`candidate_attribute_types`](https://harvestdocs.greenhouse.io/reference/get_v3-candidate-attribute-types) | Incremental (`updated_at`) | The scorecard attribute dictionary, defined per job |
| [`candidate_educations`](https://harvestdocs.greenhouse.io/reference/get_v3-candidate-educations) | Incremental (`updated_at`) | School, degree and discipline history per candidate |
| [`candidate_employments`](https://harvestdocs.greenhouse.io/reference/get_v3-candidate-employments) | Incremental (`updated_at`) | Employer and title history per candidate |
| [`candidates`](https://harvestdocs.greenhouse.io/reference/get_v3-candidates) | Incremental (`updated_at`) | |
| [`close_reasons`](https://harvestdocs.greenhouse.io/reference/get_v3-close-reasons) | Incremental (`updated_at`) | |
| [`custom_field_options`](https://harvestdocs.greenhouse.io/reference/get_v3-custom-field-options) | Incremental (`updated_at`) | Every custom field option in the account |
| [`custom_fields`](https://harvestdocs.greenhouse.io/reference/get_v3-custom-fields) | Incremental (`updated_at`) | |
| [`degrees`](https://harvestdocs.greenhouse.io/reference/get_v3-custom-field-options) | Incremental (`updated_at`) | Custom field options for the `degree` field |
| [`demographics_answer_options`](https://harvestdocs.greenhouse.io/reference/get_v3-demographic-answer-options) | Full refresh | |
| [`demographics_answers`](https://harvestdocs.greenhouse.io/reference/get_v3-demographic-answers) | Incremental (`updated_at`) | |
| [`demographics_answers_answer_options`](https://harvestdocs.greenhouse.io/reference/get_v3-demographic-answer-options) | Full refresh | Answer options for each question in `demographics_questions` |
| [`demographics_question_sets`](https://harvestdocs.greenhouse.io/reference/get_v3-demographic-question-sets) | Incremental (`updated_at`) | |
| [`demographics_question_sets_questions`](https://harvestdocs.greenhouse.io/reference/get_v3-demographic-questions) | Full refresh | Questions in each set in `demographics_question_sets` |
| [`demographics_questions`](https://harvestdocs.greenhouse.io/reference/get_v3-demographic-questions) | Full refresh | |
| [`departments`](https://harvestdocs.greenhouse.io/reference/get_v3-departments) | Incremental (`updated_at`) | |
| [`disciplines`](https://harvestdocs.greenhouse.io/reference/get_v3-custom-field-options) | Incremental (`updated_at`) | Custom field options for the `discipline` field |
| [`eeoc`](https://harvestdocs.greenhouse.io/reference/get_v3-eeoc) | Incremental (`submitted_at`) | |
| [`email_templates`](https://harvestdocs.greenhouse.io/reference/get_v3-email-templates) | Incremental (`updated_at`) | |
| [`interview_kits`](https://harvestdocs.greenhouse.io/reference/get_v3-interview-kits) | Incremental (`updated_at`) | Kit content per job interview. `exercises` is the live value and may contain HTML |
| [`interviewer_tags`](https://harvestdocs.greenhouse.io/reference/get_v3-interviewer-tags) | Incremental (`updated_at`) | The interviewer tag dictionary |
| [`interviewers`](https://harvestdocs.greenhouse.io/reference/get_v3-interviewers) | Incremental (`updated_at`) | One row per panel member on a scheduled interview |
| [`interviews`](https://harvestdocs.greenhouse.io/reference/get_v3-interviews) | Incremental (`updated_at`) | |
| [`job_candidate_attributes`](https://harvestdocs.greenhouse.io/reference/get_v3-job-candidate-attributes) | Incremental (`updated_at`) | The scorecard attributes rated on each job. `scorecard_candidate_attributes.job_candidate_attribute_id` references this stream |
| [`job_hiring_managers`](https://harvestdocs.greenhouse.io/reference/get_v3-job-hiring-managers) | Incremental (`updated_at`) | One row per hiring manager on a job |
| [`job_interviews`](https://harvestdocs.greenhouse.io/reference/get_v3-job-interviews) | Incremental (`updated_at`) | The interview plan for each job stage |
| [`job_notes`](https://harvestdocs.greenhouse.io/reference/get_v3-job-notes) | Incremental (`updated_at`) | Free-text notes on jobs, separate from the candidate notes in `activity_feed` |
| [`job_owners`](https://harvestdocs.greenhouse.io/reference/get_v3-job-owners) | Incremental (`updated_at`) | Recruiter, sourcer and coordinator per job, with a `responsible` flag |
| [`job_post_locations`](https://harvestdocs.greenhouse.io/reference/get_v3-job-post-locations) | Incremental (`updated_at`) | One row per location attached to a job post, published or not, resolved to an office, a custom location or free text |
| [`job_posts`](https://harvestdocs.greenhouse.io/reference/get_v3-job-posts) | Incremental (`updated_at`) | Includes deleted posts |
| [`job_stages`](https://harvestdocs.greenhouse.io/reference/get_v3-job-interview-stages) | Incremental (`updated_at`) | |
| [`jobs`](https://harvestdocs.greenhouse.io/reference/get_v3-jobs) | Incremental (`updated_at`) | |
| [`jobs_openings`](https://harvestdocs.greenhouse.io/reference/get_v3-openings) | Incremental (`updated_at`) | Openings across all jobs |
| [`offers`](https://harvestdocs.greenhouse.io/reference/get_v3-offers) | Incremental (`updated_at`) | |
| [`offices`](https://harvestdocs.greenhouse.io/reference/get_v3-offices) | Incremental (`updated_at`) | |
| [`prospect_details`](https://harvestdocs.greenhouse.io/reference/get_v3-prospect-details) | Incremental (`updated_at`) | Pool, stage and owner per prospect application |
| [`prospect_pool_stages`](https://harvestdocs.greenhouse.io/reference/get_v3-prospect-pool-stages) | Incremental (`updated_at`) | The stage dictionary for each prospect pool |
| [`prospect_pools`](https://harvestdocs.greenhouse.io/reference/get_v3-prospect-pools) | Incremental (`updated_at`) | |
| [`referrers`](https://harvestdocs.greenhouse.io/reference/get_v3-referrers) | Incremental (`updated_at`) | Referral attribution per candidate |
| [`rejection_details`](https://harvestdocs.greenhouse.io/reference/get_v3-rejection-details) | Incremental (`updated_at`) | Reason, rejecter and note per rejected application |
| [`rejection_reasons`](https://harvestdocs.greenhouse.io/reference/get_v3-rejection-reasons) | Incremental (`updated_at`) | Includes the reasons Greenhouse ships with |
| [`schools`](https://harvestdocs.greenhouse.io/reference/get_v3-custom-field-options) | Incremental (`updated_at`) | Custom field options for the `school_name` field |
| [`scorecard_candidate_attributes`](https://harvestdocs.greenhouse.io/reference/get_v3-scorecard-candidate-attributes) | Incremental (`updated_at`) | One row per rated attribute on each scorecard |
| [`scorecard_question_answer_options`](https://harvestdocs.greenhouse.io/reference/get_v3-scorecard-question-answer-options) | Incremental (`updated_at`) | The options picked on each `single_select` or `multi_select` answer |
| [`scorecard_question_answers`](https://harvestdocs.greenhouse.io/reference/get_v3-scorecard-question-answers) | Incremental (`updated_at`) | Interviewers' answers to scorecard questions. One row per question on each scorecard, including questions left blank |
| [`scorecard_question_options`](https://harvestdocs.greenhouse.io/reference/get_v3-scorecard-question-options) | Incremental (`updated_at`) | The choices for `single_select` and `multi_select` scorecard questions |
| [`scorecard_questions`](https://harvestdocs.greenhouse.io/reference/get_v3-scorecard-questions) | Incremental (`updated_at`) | The question dictionary behind scorecards, defined per interview kit |
| [`scorecards`](https://harvestdocs.greenhouse.io/reference/get_v3-scorecards) | Incremental (`updated_at`) | |
| [`sources`](https://harvestdocs.greenhouse.io/reference/get_v3-sources) | Incremental (`updated_at`) | |
| [`tags`](https://harvestdocs.greenhouse.io/reference/get_v3-candidate-tags) | Incremental (`updated_at`) | Candidate tags |
| [`user_emails`](https://harvestdocs.greenhouse.io/reference/get_v3-user-emails) | Incremental (`updated_at`) | Every email address per user; `users.primary_email` is only one of them |
| [`user_permissions`](https://harvestdocs.greenhouse.io/reference/get_v3-user-job-permissions) | Incremental (`updated_at`) | Job permissions across all users |
| [`user_roles`](https://harvestdocs.greenhouse.io/reference/get_v3-user-roles) | Incremental (`updated_at`) | |
| [`users`](https://harvestdocs.greenhouse.io/reference/get_v3-users) | Incremental (`updated_at`) | Includes integration service users |

### Streams added in 1.5.0

Version 1.5.0 added these 5 streams, all incremental on `updated_at`. Together with `scorecard_questions`, the scorecard streams include each scorecard's content, not just its overall recommendation. `job_candidate_attributes` names the attributes rated by `scorecard_candidate_attributes`:

`job_candidate_attributes`, `job_post_locations`, `scorecard_question_answer_options`, `scorecard_question_answers`, `scorecard_question_options`

All 5 are disabled by default on new and existing connections. Each needs its own Harvest v3 scope. If you authorised an OAuth source before 1.5.0, repeat consent after upgrading and before enabling these streams. Connections propagating all field and stream changes enable all five when 1.5.0 arrives. Syncs then fail with a `403` configuration error until you repeat consent or disable the streams. To prevent this, select propagation of field changes only before upgrading. With Client Credentials, grant `harvest:job_candidate_attributes:list`, `harvest:job_post_locations:list`, `harvest:scorecard_question_answer_options:list`, `harvest:scorecard_question_answers:list`, and `harvest:scorecard_question_options:list` to the Greenhouse credential. See [Scopes](#scopes).

### Streams added in 1.4.0

Version 1.4.0 added these 2 streams, both incremental on `updated_at`:

`candidate_attribute_types`, `job_notes`

Both streams are disabled by default on new and existing connections. However, Airbyte enables them during upgrades when the connection propagates all field and stream changes. Each stream needs its own Harvest v3 scope. For OAuth sources authorised before 1.4.0, repeat consent before enabling either stream. With Client Credentials, grant `harvest:candidate_attribute_types:list` and `harvest:job_notes:list` to the Greenhouse credential. See [Scopes](#scopes).

### Streams added in 1.2.0

Version 1.2.0 added these 20 streams, all incremental on `updated_at`. They contain details embedded in Harvest v1 parent records but served through separate Harvest v3 endpoints:

`application_stages`, `applied_candidate_tags`, `approver_groups`, `approvers`, `attachments`, `candidate_educations`, `candidate_employments`, `interview_kits`, `interviewer_tags`, `interviewers`, `job_hiring_managers`, `job_interviews`, `job_owners`, `prospect_details`, `prospect_pool_stages`, `referrers`, `rejection_details`, `scorecard_candidate_attributes`, `scorecard_questions`, `user_emails`

All 20 streams are disabled by default on new and existing connections. However, Airbyte enables them during upgrades when the connection propagates all field and stream changes. Each stream needs its own Harvest v3 scope. For OAuth sources authorised before 1.2.0, repeat consent before enabling any stream. With Client Credentials, grant the corresponding scopes to the Greenhouse credential. See [Scopes](#scopes).

### Streams made incremental in 1.1.0

These 18 streams used full refresh before 1.1.0. They are now incremental on `updated_at`:

`activity_feed`, `approvals`, `close_reasons`, `custom_field_options`, `custom_fields`, `degrees`, `demographics_question_sets`, `departments`, `disciplines`, `jobs_openings`, `offices`, `prospect_pools`, `rejection_reasons`, `schools`, `sources`, `tags`, `user_permissions`, `user_roles`

This isn't a breaking change. Schemas, primary keys and existing sync modes remain unchanged. There was no stream state to migrate, so you don't need to act. Connections continue syncing.

One behaviour changes: **Start date** now applies to these 18 streams in every sync mode. Earlier versions sent no date filter and read your full Greenhouse history, regardless of **Start date**. With a start date, these streams now return only records updated on or after it. This applies to full refresh and incremental syncs because Greenhouse filters the request. On a **Full refresh | Overwrite** connection, this also removes older rows from the destination table. Each sync replaces the table with the records it reads. Existing rows remain on append and append + deduped connections, but stop refreshing. Clear **Start date** to continue reading full history, then [refresh](https://docs.airbyte.com/operator-guides/refreshes) the streams.

## Migrate from Harvest v1

Version 1.0.0 moves the 33 streams from 0.8.1 from Harvest v1 to Harvest v3. It also adds the new `custom_field_options` stream, bringing the total to 34. Greenhouse has scheduled Harvest v1 and v2 support to end together on 2026-08-31. Version 1.0.0 also replaces API-key authentication with OAuth Authorization Code authentication. It introduces an optional **Start date** that preserves full-history behaviour when omitted. Version 1.3.0 added [Client Credentials](#client-credentials) for self-managed deployments that can't use OAuth consent. These deployments can authenticate with a credential you create in Greenhouse. Create a new connection on 1.0.0 instead of refreshing the existing one. See the [upgrade paths](./greenhouse-migrations.md#upgrade-paths) before upgrading.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Performance

Greenhouse [rate limits](https://harvestdocs.greenhouse.io/docs/api-rate-limiting) Harvest v3 in fixed 30-second windows. Each response shows the remaining allowance in `X-RateLimit-Remaining`. It shows the current window's reset time in `X-RateLimit-Reset`. Greenhouse doesn't publish a fixed Harvest v3 request ceiling. It also gives custom and partner integrations different allowances. The connector therefore limits itself to a conservative 50 requests per window and tracks these headers. When Greenhouse returns `429`, the connector waits for the `Retry-After` interval. Every thread uses the same window. Syncing many streams with a high **Number of concurrent threads** commonly causes rate-limit errors. Lower this value before [creating an issue](https://github.com/airbytehq/airbyte/issues) about rate limits.

The connector requests 500 records per page, the Harvest v3 maximum. It then follows Greenhouse's cursor links. Large accounts can still require many requests for each stream.

`application_stages`, `scorecard_candidate_attributes`, and `scorecard_question_answers` are high-volume streams. `application_stages` contains one row for each application and stage entered. `scorecard_candidate_attributes` contains one row for every rated attribute on each scorecard. `scorecard_question_answers` contains one row for every question on each scorecard. Each stream contains several times more rows than its parent. They add many requests and consume the shared rate-limit window. Leave them disabled unless you need this detail.

## Limitations and troubleshooting

### Limitations

- **`eeoc`** replicates on `submitted_at`. Correcting an EEOC response after submission doesn't change `submitted_at`, so incremental syncs don't reread it. Refresh the stream to replicate corrections.
- **`custom_field_options`** reads every custom field option in your account. It is therefore a superset of `degrees`, `disciplines`, and `schools`. Those three streams read the same Greenhouse endpoint, filtered to one field key. They also share the same primary keys. Enabling all four writes identical option rows to four destination tables. Enable only the streams you need.
- **`users`** includes integration service users, which Greenhouse hides by default. Service accounts have no email address, so `primary_email` is empty for these records.
- **`rejection_reasons`** includes Greenhouse's default reasons, not only those added by your organisation.
- **`attachments`** returns a `url` for each file, which Greenhouse expires after seven days. Each request can redirect to a new short-lived file URL. A replicated `url` stops working one week after the sync that wrote it. Resync the stream to get current links.
- **`application_stages`** contains one row for each application and stage entered. It therefore holds several times more rows than `applications`. Enable it only for funnel or time-in-stage analysis.
- **`candidate_educations`** references schools, degrees and disciplines by custom field option ID: `school_name_custom_field_option_id`, `degree_custom_field_option_id`, and `discipline_custom_field_option_id`. Join `schools`, `degrees`, and `disciplines` to resolve their names.
- **`interviewers`** contains one row for each panel member and interview. An interview appears once for every attendee. `user_id` is empty for external attendees who don't match a Greenhouse user. Their address appears in `email` instead.
- **`scorecard_candidate_attributes`** contains one row for each rated attribute and scorecard. It therefore holds many more rows than `scorecards`.
- **`scorecard_question_answers`** contains one row for each question and scorecard, including unanswered questions. It therefore holds many more rows than `scorecards`. The question's `answer_type` determines which field contains the answer. Use `answer` for `text`, `boolean_value` for `yes_no`, and `scorecard_question_answer_options` for `single_select` and `multi_select`. `value` stores every answer as text. This can be the text itself, `"true"`/`"false"`, an option ID or a JSON array of option IDs such as `"[26384455003, 26384458003]"`. For an unanswered question, `answer` is empty and `value` is `null`. For `multi_select`, it is `"[]"`.
- **`interview_kits.exercises`** contains the live Interview Prep content and can include HTML. The `summary` and `instructions` fields on `job_interviews` are snapshots from when the slot was first added. They don't reflect later edits. Use `exercises` for the current text.
- **`user_emails`** lists every address for a user, while `users.primary_email` contains one. Integration service users have no addresses, so they have no rows here.
- **`approvers.send_auto_reminder_at`** is a date (`YYYY-MM-DD`), not a timestamp. This differs from every other Harvest v3 field using the `_at` timestamp suffix.
- **The 18 streams that became incremental in 1.1.0** now honour **Start date**. Previously, they always read full history. See [Streams that became incremental in 1.1.0](#streams-that-became-incremental-in-110).

### Deletions

Greenhouse Harvest v3 doesn't report permanently deleted records. The connector replicates soft deletions using a flag on each record:

- `active` on `job_posts`. Harvest v3 excludes deleted posts by default, so the connector requests active and deleted posts. Filter on `active` downstream if you only need live posts.
- `active` on `custom_fields`, `custom_field_options`, `degrees`, `disciplines`, `schools`, `demographics_question_sets`, `demographics_questions`, `demographics_question_sets_questions`, `demographics_answer_options`, `demographics_answers_answer_options`, `prospect_pools`, `scorecard_question_options`, and `job_candidate_attributes`. Harvest v3 returns active and inactive records for these streams.
- `deactivated` on `users`. Deactivated users remain in the stream.
- `active` on `job_stages`, `job_interviews`, and `scorecard_questions`. `false` means the stage, interview or question was removed from the job's interview plan or interview kit. Greenhouse retains the record so historical data still resolves.

Permanently deleted Greenhouse records remain in your destination until you resync the stream in **Full Refresh - Overwrite**.

### Configuration error requests re-authentication

This section applies to OAuth. For Client Credentials, see [Client Credentials authentication fails](#client-credentials-authentication-fails).

The connector can't renew its access token because Greenhouse rejected the refresh token. From version 1.0.1, this appears as a configuration error instead of a system error. Use the Greenhouse error code in the sync log to identify the fix:

- `invalid_grant`: the refresh token expired or became invalid. This happens when the connection hasn't synced for over 14 days. It also happens when another tool uses the same refresh token. A sync interrupted immediately after token renewal can cause it too. In the last two cases, Greenhouse issued a new refresh token that Airbyte didn't save. Greenhouse replaces the refresh token during every renewal. Open the source settings, click **Authenticate** and complete consent again to store a new token. Run consent separately for every Airbyte source. Don't reuse a refresh token across sources or other tools.
- `invalid_client` or `unauthorized_client`: Greenhouse rejected Airbyte's partner application credentials during refresh. The application might also lack permission to use the refresh token grant. Open the source settings, click **Authenticate** and complete consent again. If the error continues, contact Airbyte support. You don't have any credentials to correct.

### Client Credentials authentication fails

With Client Credentials, the connector requests a new Greenhouse access token using your client ID and secret. There is no refresh token to renew. The shared OAuth message still says the refresh token was rejected and asks you to re-authenticate. Use the Greenhouse error code at the message's end instead:

- `invalid_client`: Greenhouse doesn't recognise the client ID and client secret. Check both against the credential in **Configure** > **Dev Center** > **API Credential Management**. Confirm that the credential hasn't been revoked.
- `invalid_grant`: the **Site Admin user ID** doesn't match a Greenhouse user. Correct it or leave it blank. A blank value sends requests as the credential's integration service user.

### Stream fails with a `403` configuration error

The authorising user isn't a Site Admin, or consent didn't include the stream's scope. This is expected when [streams added in 1.2.0](#streams-added-in-120), [streams added in 1.4.0](#streams-added-in-140), or [streams added in 1.5.0](#streams-added-in-150) is enabled on a source authorised before that version. You might have enabled it manually. Airbyte might also enable it during upgrades when the connection propagates all field and stream changes. Compare the [scopes](#scopes) with your approved scopes. Then open the source settings, click **Authenticate** and repeat consent as a Site Admin. With Client Credentials, grant the missing scope to the Greenhouse credential. Confirm that **Site Admin user ID** is blank or belongs to a Site Admin.

### Fewer records after upgrading to 1.1.0

Version 1.1.0 made 18 streams incremental on `updated_at`. Every sync mode now applies **Start date** as a Greenhouse query filter for these streams. With a start date, records last updated before it aren't returned. This applies to incremental and full refresh syncs. If the connection writes in **Full refresh | Overwrite**, the first post-upgrade sync also deletes older destination rows. Your warehouse therefore shows the gap even though the sync succeeded. Earlier versions didn't filter these streams by date and ignored **Start date** entirely. [Streams that became incremental in 1.1.0](#streams-that-became-incremental-in-110) lists the affected streams.

To read full history again, clear **Start date** in the source settings. Then [refresh](https://docs.airbyte.com/operator-guides/refreshes) the affected streams to write the older records again.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version    | Date       | Pull Request                                             | Subject                                                                                                                                                                |
|:-----------|:-----------|:---------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.5.3 | 2026-10-13 | [88668](https://github.com/airbytehq/airbyte/pull/88668) | Update dependencies |
| 1.5.2 | 2026-10-05 | [87672](https://github.com/airbytehq/airbyte/pull/87672) | Promote the connector to certified |
| 1.5.1 | 2026-10-05 | [87670](https://github.com/airbytehq/airbyte/pull/87670) | Update to source-declarative-manifest 7.33.0 and name the fix for each authentication method in the `403` error message |
| 1.5.0 | 2026-10-02 | [87442](https://github.com/airbytehq/airbyte/pull/87442) | Add the `scorecard_question_answers`, `scorecard_question_options`, `scorecard_question_answer_options`, `job_candidate_attributes`, and `job_post_locations` streams, which need new scopes - see [Streams added in 1.5.0](#streams-added-in-150) |
| 1.4.0 | 2026-09-28 | [86478](https://github.com/airbytehq/airbyte/pull/86478) | Add the `candidate_attribute_types` and `job_notes` streams, which need new scopes - see [Streams added in 1.4.0](#streams-added-in-140) |
| 1.3.0 | 2026-09-24 | [85178](https://github.com/airbytehq/airbyte/pull/85178) | Add client-credentials authentication for Greenhouse custom integrations and self-managed deployments. |
| 1.2.0 | 2026-09-21 | [86477](https://github.com/airbytehq/airbyte/pull/86477) | Add 20 Harvest v3 detail streams, which need new scopes - see [Streams added in 1.2.0](#streams-added-in-120) |
| 1.1.0 | 2026-09-17 | [85841](https://github.com/airbytehq/airbyte/pull/85841) | Sync 18 previously full-refresh streams incrementally, so **Start date** now applies to them in every sync mode, and suggest 10 streams for new connections - see [Streams that became incremental in 1.1.0](#streams-that-became-incremental-in-110) |
| 1.0.3 | 2026-09-15 | [85507](https://github.com/airbytehq/airbyte/pull/85507) | Update dependencies |
| 1.0.2 | 2026-09-02 | [85306](https://github.com/airbytehq/airbyte/pull/85306) | Clarify in the spec that OAuth credentials come from Airbyte's Greenhouse partner application and must not be requested from Greenhouse |
| 1.0.1 | 2026-09-02 | [85300](https://github.com/airbytehq/airbyte/pull/85300) | Surface expired or rotated refresh tokens (`invalid_grant`) as a re-authenticate config error instead of a system error |
| 1.0.0 | 2026-08-28 | [84846](https://github.com/airbytehq/airbyte/pull/84846) | Breaking migration from Harvest v1 to Harvest v3 with OAuth. See the [migration guide](https://docs.airbyte.com/integrations/sources/greenhouse-migrations). |
| 0.8.1 | 2026-08-18 | [84641](https://github.com/airbytehq/airbyte/pull/84641) | Update dependencies |
| 0.8.0 | 2026-08-12 | [83811](https://github.com/airbytehq/airbyte/pull/83811) | Send pagination page-size parameters only on first-page requests and use fully-qualified per-stream URLs in preparation for the Harvest v3 migration. |
| 0.7.33 | 2026-08-11 | [83956](https://github.com/airbytehq/airbyte/pull/83956) | Update dependencies |
| 0.7.32 | 2026-07-28 | [83194](https://github.com/airbytehq/airbyte/pull/83194) | Update to CDK 7.23.8 (fixes AirbyteCustomCodeNotPermittedError for bundled custom components) and remove the temporary Cloud version override |
| 0.7.31 | 2026-07-28 | [1082](https://github.com/airbytehq/airbyte-python-cdk/issues/1082) | Roll Cloud back to 0.7.29 — 0.7.30 is built on SDM 7.23.7, which breaks bundled custom components |
| 0.7.30 | 2026-07-28 | [82944](https://github.com/airbytehq/airbyte/pull/82944) | Update dependencies |
| 0.7.29 | 2026-07-21 | [82444](https://github.com/airbytehq/airbyte/pull/82444) | Update dependencies |
| 0.7.28 | 2026-07-14 | [81887](https://github.com/airbytehq/airbyte/pull/81887) | Update dependencies |
| 0.7.27 | 2026-06-30 | [81129](https://github.com/airbytehq/airbyte/pull/81129) | Update dependencies |
| 0.7.26 | 2026-06-23 | [80487](https://github.com/airbytehq/airbyte/pull/80487) | Update dependencies |
| 0.7.25 | 2026-06-16 | [79888](https://github.com/airbytehq/airbyte/pull/79888) | Update dependencies |
| 0.7.24 | 2026-06-09 | [79354](https://github.com/airbytehq/airbyte/pull/79354) | Update dependencies |
| 0.7.23 | 2026-06-02 | [78766](https://github.com/airbytehq/airbyte/pull/78766) | Update dependencies |
| 0.7.22 | 2026-05-15 | [78119](https://github.com/airbytehq/airbyte/pull/78119) | Set the default concurrency to 2 and expose the number of concurrent threads as a user-configurable option. |
| 0.7.22-rc.3 | 2026-05-12 | [78052](https://github.com/airbytehq/airbyte/pull/78052) | Reduce default_concurrency to 3 for concurrency tuning after rate-limit failures at higher settings. |
| 0.7.22-rc.2 | 2026-05-08 | [78006](https://github.com/airbytehq/airbyte/pull/78006) | Concurrency tuning iteration: bump default_concurrency to 5 |
| 0.7.22-rc.1 | 2026-05-06 | [77826](https://github.com/airbytehq/airbyte/pull/77826) | Start concurrency tuning at default_concurrency=4 (Path A) and enable progressive rollout |
| 0.7.21 | 2026-04-28 | [77287](https://github.com/airbytehq/airbyte/pull/77287) | Update dependencies |
| 0.7.20 | 2026-04-21 | [76637](https://github.com/airbytehq/airbyte/pull/76637) | Update dependencies |
| 0.7.19 | 2026-03-31 | [75729](https://github.com/airbytehq/airbyte/pull/75729) | Update dependencies |
| 0.7.18 | 2026-03-17 | [74919](https://github.com/airbytehq/airbyte/pull/74919) | Update dependencies |
| 0.7.17 | 2026-03-10 | [74688](https://github.com/airbytehq/airbyte/pull/74688) | Update dependencies |
| 0.7.16 | 2026-03-03 | [74176](https://github.com/airbytehq/airbyte/pull/74176) | Update dependencies |
| 0.7.15 | 2026-02-10 | [73107](https://github.com/airbytehq/airbyte/pull/73107) | Update dependencies |
| 0.7.14 | 2026-02-03 | [72661](https://github.com/airbytehq/airbyte/pull/72661) | Update dependencies |
| 0.7.13 | 2026-01-20 | [71894](https://github.com/airbytehq/airbyte/pull/71894) | Update dependencies |
| 0.7.12 | 2026-01-14 | [71700](https://github.com/airbytehq/airbyte/pull/71700) | Update dependencies |
| 0.7.11 | 2025-12-18 | [70503](https://github.com/airbytehq/airbyte/pull/70503) | Update dependencies |
| 0.7.10 | 2025-11-25 | [70056](https://github.com/airbytehq/airbyte/pull/70056) | Update dependencies |
| 0.7.9 | 2025-11-18 | [69420](https://github.com/airbytehq/airbyte/pull/69420) | Update dependencies |
| 0.7.8 | 2025-10-29 | [68823](https://github.com/airbytehq/airbyte/pull/68823) | Update dependencies |
| 0.7.7 | 2025-10-21 | [68226](https://github.com/airbytehq/airbyte/pull/68226) | Update dependencies |
| 0.7.6 | 2025-10-14 | [67896](https://github.com/airbytehq/airbyte/pull/67896) | Update dependencies |
| 0.7.5 | 2025-10-07 | [67399](https://github.com/airbytehq/airbyte/pull/67399) | Update dependencies |
| 0.7.4 | 2025-09-30 | [66408](https://github.com/airbytehq/airbyte/pull/66408) | Update dependencies |
| 0.7.3 | 2025-09-09 | [65896](https://github.com/airbytehq/airbyte/pull/65896) | Update dependencies |
| 0.7.2 | 2025-08-28 | [64973](https://github.com/airbytehq/airbyte/pull/64973) | Update dependencies |
| 0.7.1 | 2025-08-26 | [65510](https://github.com/airbytehq/airbyte/pull/65510) | Fix custom migrations to reference DeclarativeStream Pydantic model instead of runtime component |
| 0.7.0 | 2025-07-07 | [62830](https://github.com/airbytehq/airbyte/pull/62830) | Promoting release candidate 0.7.0-rc.1 to a main version. |
| 0.7.0-rc.1 | 2025-06-29 | [47283](https://github.com/airbytehq/airbyte/pull/47283) | Migrate to Manifest-only |
| 0.6.1 | 2025-03-22 | [53800](https://github.com/airbytehq/airbyte/pull/53800) | Update dependencies |
| 0.6.0 | 2025-03-14 | [55774](https://github.com/airbytehq/airbyte/pull/55774) | Promoting release candidate 0.6.0-rc.1 to a main version. |
| 0.6.0-rc.1 | 2025-03-14 | [54702](https://github.com/airbytehq/airbyte/pull/54702) | Update to latest airbyte-cdk, remove custom cursors. |
| 0.5.32 | 2025-02-01 | [52724](https://github.com/airbytehq/airbyte/pull/52724) | Update dependencies |
| 0.5.31 | 2025-01-25 | [51842](https://github.com/airbytehq/airbyte/pull/51842) | Update dependencies |
| 0.5.30 | 2025-01-11 | [51214](https://github.com/airbytehq/airbyte/pull/51214) | Update dependencies |
| 0.5.29 | 2024-12-28 | [50632](https://github.com/airbytehq/airbyte/pull/50632) | Update dependencies |
| 0.5.28 | 2024-12-21 | [50109](https://github.com/airbytehq/airbyte/pull/50109) | Update dependencies |
| 0.5.27 | 2024-12-14 | [49248](https://github.com/airbytehq/airbyte/pull/49248) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.5.26 | 2024-12-12 | [48996](https://github.com/airbytehq/airbyte/pull/48996) | Update dependencies |
| 0.5.25 | 2024-10-29 | [47110](https://github.com/airbytehq/airbyte/pull/47110) | Update dependencies |
| 0.5.24 | 2024-10-23 | [47306](https://github.com/airbytehq/airbyte/pull/47306) | Add 'job_post_id' to applications stream scehma |
| 0.5.23 | 2024-10-12 | [46828](https://github.com/airbytehq/airbyte/pull/46828) | Update dependencies |
| 0.5.22 | 2024-10-05 | [46506](https://github.com/airbytehq/airbyte/pull/46506) | Update dependencies |
| 0.5.21 | 2024-09-28 | [46159](https://github.com/airbytehq/airbyte/pull/46159) | Update dependencies |
| 0.5.20 | 2024-09-21 | [45834](https://github.com/airbytehq/airbyte/pull/45834) | Update dependencies |
| 0.5.19 | 2024-09-17 | [45625](https://github.com/airbytehq/airbyte/pull/45625) | Change check stream |
| 0.5.18 | 2024-09-14 | [45476](https://github.com/airbytehq/airbyte/pull/45476) | Update dependencies |
| 0.5.17 | 2024-09-07 | [45229](https://github.com/airbytehq/airbyte/pull/45229) | Update dependencies |
| 0.5.16 | 2024-08-31 | [44755](https://github.com/airbytehq/airbyte/pull/44755) | Update dependencies |
| 0.5.15 | 2024-08-17 | [44246](https://github.com/airbytehq/airbyte/pull/44246) | Update dependencies |
| 0.5.14 | 2024-08-10 | [43595](https://github.com/airbytehq/airbyte/pull/43595) | Update dependencies |
| 0.5.13 | 2024-08-03 | [43160](https://github.com/airbytehq/airbyte/pull/43160) | Update dependencies |
| 0.5.12 | 2024-07-27 | [42816](https://github.com/airbytehq/airbyte/pull/42816) | Update dependencies |
| 0.5.11 | 2024-07-20 | [42240](https://github.com/airbytehq/airbyte/pull/42240) | Update dependencies |
| 0.5.10 | 2024-07-13 | [41787](https://github.com/airbytehq/airbyte/pull/41787) | Update dependencies |
| 0.5.9 | 2024-07-10 | [41215](https://github.com/airbytehq/airbyte/pull/41215) | Update dependencies |
| 0.5.8 | 2024-07-10 | [39601](https://github.com/airbytehq/airbyte/pull/39601) | Move spec to manifest, fix readme |
| 0.5.7 | 2024-07-06 | [40882](https://github.com/airbytehq/airbyte/pull/40882) | Update dependencies |
| 0.5.6 | 2024-06-25 | [40451](https://github.com/airbytehq/airbyte/pull/40451) | Update dependencies |
| 0.5.5 | 2024-06-22 | [39968](https://github.com/airbytehq/airbyte/pull/39968) | Update dependencies |
| 0.5.4 | 2024-06-06 | [39247](https://github.com/airbytehq/airbyte/pull/39247) | [autopull] Upgrade base image to v1.2.2 |
| 0.5.3 | 2024-04-19 | [36640](https://github.com/airbytehq/airbyte/pull/36640) | Updating to 0.80.0 CDK |
| 0.5.2 | 2024-04-12 | [36640](https://github.com/airbytehq/airbyte/pull/36640) | schema descriptions |
| 0.5.1 | 2024-03-12 | [35988](https://github.com/airbytehq/airbyte/pull/35988) | Unpin CDK version |
| 0.5.0 | 2024-02-20 | [35465](https://github.com/airbytehq/airbyte/pull/35465) | Per-error reporting and continue sync on stream failures |
| 0.4.5 | 2024-02-09 | [35077](https://github.com/airbytehq/airbyte/pull/35077) | Manage dependencies with Poetry. |
| 0.4.4 | 2023-11-29 | [32397](https://github.com/airbytehq/airbyte/pull/32397) | Increase test coverage and migrate to base image |
| 0.4.3 | 2023-09-20 | [30648](https://github.com/airbytehq/airbyte/pull/30648) | Update candidates.json |
| 0.4.2 | 2023-08-02 | [28969](https://github.com/airbytehq/airbyte/pull/28969) | Update CDK version |
| 0.4.1 | 2023-06-28 | [27773](https://github.com/airbytehq/airbyte/pull/27773) | Update following state breaking changes |
| 0.4.0 | 2023-04-26 | [25332](https://github.com/airbytehq/airbyte/pull/25332) | Add new streams: `ActivityFeed`, `Approvals`, `Disciplines`, `Eeoc`, `EmailTemplates`, `Offices`, `ProspectPools`, `Schools`, `Tags`, `UserPermissions`, `UserRoles` |
| 0.3.1 | 2023-03-06 | [23231](https://github.com/airbytehq/airbyte/pull/23231) | Publish using low-code CDK Beta version |
| 0.3.0 | 2022-10-19 | [18154](https://github.com/airbytehq/airbyte/pull/18154) | Extend `Users` stream schema |
| 0.2.11 | 2022-09-27 | [17239](https://github.com/airbytehq/airbyte/pull/17239) | Always install the latest version of Airbyte CDK |
| 0.2.10 | 2022-09-05 | [16338](https://github.com/airbytehq/airbyte/pull/16338) | Implement incremental syncs & fix SATs |
| 0.2.9 | 2022-08-22 | [15800](https://github.com/airbytehq/airbyte/pull/15800) | Bugfix to allow reading sentry.yaml and schemas at runtime |
| 0.2.8 | 2022-08-10 | [15344](https://github.com/airbytehq/airbyte/pull/15344) | Migrate connector to config-based framework |
| 0.2.7 | 2022-04-15 | [11941](https://github.com/airbytehq/airbyte/pull/11941) | Correct Schema data type for Applications, Candidates, Scorecards and Users |
| 0.2.6 | 2021-11-08 | [7607](https://github.com/airbytehq/airbyte/pull/7607) | Implement demographics streams support. Update SAT for demographics streams |
| 0.2.5 | 2021-09-22 | [6377](https://github.com/airbytehq/airbyte/pull/6377) | Refactor the connector to use CDK. Implement additional stream support |
| 0.2.4 | 2021-09-15 | [6238](https://github.com/airbytehq/airbyte/pull/6238) | Add identification of accessible streams for API keys with limited permissions |

</details>
