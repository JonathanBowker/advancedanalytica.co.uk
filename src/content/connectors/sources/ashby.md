---
generated_record: true
connector_name: Ashby
connector_type: source
connector_slug: ashby
connector_directory: source-ashby
definition_id: 4e8c9fa0-3634-499b-b948-11581b5c3efa
version: 2.1.4
support_level: certified
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/ashby
logo: /images/connectors/sources/ashby.svg
logo_source_path: airbyte-integrations/connectors/source-ashby/icon.svg
logo_sha256: 21312ef086bf634fc19d95af5c6487bfea9697c5c3120112b86374d0d8257faf
original_metadata_path: airbyte-integrations/connectors/source-ashby/metadata.yaml
original_metadata_sha256: 9dbc1224af839ebef6a708f8b1a17e9a4c67b00a65219905ca608913a4d03dfd
original_document_path: docs/integrations/sources/ashby.md
original_document_sha256: b15a0f25a3587806c6ef4a9fc65ccccfcdadc25cb70a421e53448d8c3d24f2c6
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 43141a35655a2b77ff148397701149382266f6c3cd338bf2a2852f4454502c8f
rewritten_at: 2026-11-12T13:31:33.848103+00:00
---

# Ashby

<HideInUI>

Use this page to set up the [Ashby](https://www.ashbyhq.com/) source connector and find reference information.

</HideInUI>

## Before you start

You need:

- An Ashby account
- An Ashby API key with appropriate permissions for the streams you want to sync. See [Ashby authentication docs](https://developers.ashbyhq.com/reference/authentication) for details about creating an API key.
- A start date in `YYYY-MM-DDTHH:MM:SSZ` format. The connector only replicates applications, application feedback, and interview schedules created on or after this date. See [setup guide](#setup-guide) to understand how the start date affects other streams.

Enable read permissions for the modules that match the streams you want to sync:

| Ashby permission module | Streams |
| :--- | :--- |
| Candidates | `applications`, `application_criteria_evaluations`, `application_feedback`, `application_history`, `candidates` |
| Interviews | `interviews`, `interview_plans`, `interview_schedules`, `interview_stage_groups`, `interview_stages` |
| Jobs | `job_boards`, `job_postings`, `job_templates`, `jobs`, `openings` |
| Hiring Process | `archive_reasons`, `candidate_tags`, `custom_fields`, `feedback_form_definitions`, `interviewer_pools`, `source_tracking_links`, `sources`, `survey_form_definitions` |
| Organization *(always required)* | `departments`, `locations`, `users` — The connection check validates connectivity using the `users` stream, so you must enable this permission even if you only intend to sync streams from other modules. Without it, the check fails with a `403 missing_endpoint_permission` error. |
| Offers | `offers` |
| Approvals | `approvals` |
| Projects or Candidates | `projects` (Ashby accepts either permission) |

Ashby API keys can't read confidential jobs and projects by default. To sync them, enable **Allow access to confidential jobs and projects?** on the API key.

To read private candidate fields outside offers, enable **Allow access to non-offer private fields?** on the API key. Module read permissions don't grant access to these fields.

:::note
The AI Application Review feature must be enabled for your Ashby account to use the `application_criteria_evaluations` stream. Without this feature, the stream returns empty results.
:::

## Set up Ashby

1. Log in to your Ashby account.
2. Generate an API key by following [Ashby authentication guide](https://developers.ashbyhq.com/reference/authentication). Grant read permissions for the modules listed in the prerequisites. You must enable at least the **Organization** read permission, which the connection check requires. Enable read permissions for any other modules whose streams you want to sync.
3. In Airbyte, create a new Ashby source.
4. Enter your **API key**.
5. Enter a **Start date** in `YYYY-MM-DDTHH:MM:SSZ` format. The connector sends this date as the `createdAfter` filter for the `application_feedback`, `applications`, and `interview_schedules` streams. Records created before this date aren't replicated. The date also limits `application_criteria_evaluations` and `application_history`. These streams use the same filtered application list to identify applications requiring child records. All other streams ignore the start date, including `candidates`. Their initial data loads aren't limited by this date.

## Supported sync modes

| Feature | Supported |
| :--- | :--- |
| Full Refresh | Yes |
| Incremental - Append | Yes, for every stream except `application_criteria_evaluations`, `archive_reasons`, `interview_stage_groups`, `interview_stages`, `job_boards`, `job_postings`, and `sources` |
| Incremental - Append + Deduped | Yes, for every stream except `application_criteria_evaluations`, `archive_reasons`, `interview_stage_groups`, `interview_stages`, `job_boards`, `job_postings`, and `sources` |

For existing connections, refresh the source schema after upgrading to make new sync modes available. Then select Incremental for each stream you want to sync incrementally.

### Sync-token streams

From version 2.1.0, all incremental streams except `applications` and `application_history` use Ashby's [sync tokens](https://developers.ashbyhq.com/docs/pagination-and-incremental-sync). The first incremental sync reads every available record, subject to the start date where applicable. After reading the final page, the connector saves a token. Later syncs use this token to request only new or modified records. Airbyte manages these tokens automatically, so you don't need to enter one in the source configuration.

If Ashby rejects a stored token, the stream fails but keeps its state. For `sync_token_expired` or `sync_token_invalid`, refresh the affected stream to clear its state and read it fully again.

:::warning
Ashby limits each sync-token incremental sync to 100 pages. This limit represents about 10,000 records changed since the stream's previous sync. A larger change set can occur after a bulk data migration. It fails the stream with `incremental_sync_too_large`. Syncing again with the same state produces the same failure. To recover, switch the stream to Full Refresh. Alternatively, refresh the stream and sync the connection more often, at least daily. Ashby's sync tokens expire after 14 days, so sync incremental streams at least weekly.
:::

### Applications and application history

From version 1.5.0, `applications` and `application_history` support incremental sync using the application's `updatedAt` timestamp. These streams don't use sync tokens, so token expiry and page-depth limits don't apply.

Ashby's `application.list` doesn't filter on `updatedAt`. An incremental sync of `applications` therefore still reads every application from Ashby. It only emits applications updated within one day before the previous sync's latest `updatedAt`. This one-day lookback prevents missed updates because Ashby returns applications in creation order. Applications updated during this period are emitted again during the next sync. Use Incremental | Append + Deduped, keyed on `id`, to keep one row per application. Every incremental sync still reads the full application list. The time savings come from `application_history`, described below. Refresh the source schema to see the `application_updated_at` column on `application_history`.

## Supported streams

This source syncs these streams:

- [applications](https://developers.ashbyhq.com/reference/applicationlist)
- [application_criteria_evaluations](https://developers.ashbyhq.com/reference/applicationlistcriteriaevaluations) (substream of applications)
- [application_feedback](https://developers.ashbyhq.com/reference/applicationfeedbacklist)
- [application_history](https://developers.ashbyhq.com/reference/applicationlisthistory) (substream of applications)
- [approvals](https://developers.ashbyhq.com/reference/approvallist)
- [archive_reasons](https://developers.ashbyhq.com/reference/archivereasonlist-1)
- [candidate_tags](https://developers.ashbyhq.com/reference/candidatetaglist)
- [candidates](https://developers.ashbyhq.com/reference/candidatelist)
- [custom_fields](https://developers.ashbyhq.com/reference/customfieldlist)
- [departments](https://developers.ashbyhq.com/reference/departmentlist)
- [feedback_form_definitions](https://developers.ashbyhq.com/reference/feedbackformdefinitionlist)
- [interview_plans](https://developers.ashbyhq.com/reference/interviewplanlist)
- [interview_schedules](https://developers.ashbyhq.com/reference/interviewschedulelist)
- [interview_stage_groups](https://developers.ashbyhq.com/reference/interviewstagegrouplist)
- [interviews](https://developers.ashbyhq.com/reference/interviewlist)
- [interview_stages](https://developers.ashbyhq.com/reference/interviewstagelist)
- [interviewer_pools](https://developers.ashbyhq.com/reference/interviewerpoollist)
- [job_boards](https://developers.ashbyhq.com/reference/jobboardlist)
- [job_postings](https://developers.ashbyhq.com/reference/jobpostinglist)
- [job_templates](https://developers.ashbyhq.com/reference/jobtemplatelist)
- [jobs](https://developers.ashbyhq.com/reference/joblist)
- [locations](https://developers.ashbyhq.com/reference/locationlist-1)
- [offers](https://developers.ashbyhq.com/reference/offerlist)
- [openings](https://developers.ashbyhq.com/reference/openinglist-1)
- [projects](https://developers.ashbyhq.com/reference/projectlist-1)
- [source_tracking_links](https://developers.ashbyhq.com/reference/sourcetrackinglinklist-1)
- [sources](https://developers.ashbyhq.com/reference/sourcelist-1)
- [survey_form_definitions](https://developers.ashbyhq.com/reference/surveyformdefinitionlist)
- [users](https://developers.ashbyhq.com/reference/userlist)

The `application_criteria_evaluations` stream is a substream of `applications`. The connector only requests evaluations for applications whose current interview stage has the type `PreInterviewScreen`. Their status must also be neither `Archived` nor `Hired`. The stream therefore doesn't cover every application in your account. Each record includes an `application_id` field copied from its parent application. Use this field to join evaluations to `applications`. From version 2.0.0, the stream's primary key is `application_id` and `id`. Earlier versions had no primary key. From version 1.4.0, the connector pages through every evaluation for each application. Earlier versions synced only the first page. Like `application_history`, this stream makes at least one request per application. The connector therefore caps `application.listCriteriaEvaluations` at 100 requests per minute. It skips applications when Ashby returns `application_not_found`.

The `application_history` stream is a substream of `applications`. Each record represents an interview stage entered by an application. It includes the `enteredStageAt` and `leftStageAt` timestamps, which no other Ashby endpoint provides. Join `application_history.application_id` to `applications.id` and `application_history.stageId` to `interview_stages.id`. The connector also copies the parent application's status, creation timestamp, and update timestamp into each record. These fields are `application_status`, `application_created_at`, and `application_updated_at`, alongside `application_id`. You can therefore analyse stage timing without joining back to `applications`. The stream's primary key is `id`. Deduplicating destinations therefore key history events instead of appending a copy during every sync.

The parent application list uses the same `createdAfter` filter as the `applications` stream. A start date after your oldest application returns partial history, not an error.

The connector requests history for one application at a time. `application.listHistory` accepts neither a date filter nor a `syncToken`. The connector caps this endpoint at 100 requests per minute, setting a minimum duration for full syncs. For example, 10,000 applications require at least 100 minutes. Applications with over 100 history records require extra pagination requests.

In incremental mode, the first sync requests history for every application. Later syncs only request history for applications updated within one day before the previous sync's latest `updatedAt`. This lookback prevents missing applications updated during the previous sync. Testing showed that Ashby updated `updatedAt` when an application moved to a new stage. New stage entries are therefore included. Ashby doesn't update `updatedAt` for every change. Examples include history entries edited or deleted through `application.updateHistory` and some application changes. If these changes matter, run a periodic Refresh and remove records. Each changed application emits its full history again. Use Incremental | Append + Deduped, keyed on `id`, to keep one row per history event. Incremental | Append adds another history copy each time. Each incremental sync still reads the full application list to find changed applications. In full refresh mode, every sync reads the history of every selected application again. Sync it through a separate connection with an infrequent schedule.

Ashby can return an `application_not_found` error when an application is deleted or your API key can't access it. The connector then skips that application's history, logs the Ashby request ID, and continues. It retries HTTP 429 and 5xx responses. Any other error fails the sync.

The `application_feedback` stream returns submitted interview scorecards, with one record for each feedback form submission. Each record includes the `submittedValues` entered by an interviewer and the `formDefinition` active when they submitted the form. Join `applicationId` to `applications.id`, `interviewId` to `interviews.id`, and `feedbackFormDefinitionId` to `feedback_form_definitions.id`. `submittedValues` is a free-form object keyed by each field's `path`. The connector therefore doesn't declare its keys. For select fields, it stores the option value, such as `hire`, instead of the display label, such as `Hire`. To find labels, map each value through `formDefinition.sections[].fields[].field.selectableValues` on the same record. Don't use the current `feedback_form_definitions` stream because form definitions can change after feedback is submitted. Ashby added the `creditedToUser` field to its API on 2026-07-21. This field may be null on older records. This endpoint requires the **Candidates** read permission.

The `interview_stages` stream is a substream of Ashby's interview plans. Ashby's `interviewStage.list` endpoint returns stages for one interview plan at a time. From version 1.4.0, the connector lists every interview plan, including archived plans, then requests each plan's stages. Versions before 1.4.0 didn't send an interview plan ID, so they synced no stages. Each record includes `interviewPlanId` and an `interview_plan_is_archived` flag copied from its parent plan. Join `interviewPlanId` to `interview_plans.id` and `interviewStageGroupId` to `interview_stage_groups.id`. Ashby's `interviewPlan.list` doesn't return draft plans. It only returns job-specific plans when your API key can read the associated job. Enable the **Jobs** read permission if you need job-specific plans in `interview_plans` or their stages in `interview_stages`.

The `interviews` stream returns interview definitions, such as a technical phone screen, configured in your Ashby account. It doesn't return scheduled interviews. Each record includes the definition's `title`, `externalTitle`, instructions, feedback settings, and `feedbackFormDefinitionId`. For scheduled interviews, including their times and interviewers, use `interview_schedules`.

From version 1.2.0, the connector sends `includeNonSharedInterviews: true`. Definitions belonging to one job therefore sync alongside shared definitions. Use `jobId` to distinguish them. It contains the related job for job-specific definitions and is null for shared definitions. You can schedule shared definitions against any job. From version 1.4.0, the connector also sends `includeArchived: true`, so archived definitions sync. Use `isArchived` to exclude them.

Version 1.2.0 also declared the fields returned by `interview.list`, which the schema previously omitted. Refresh the source schema and enable the new columns in your connection to replicate them. Version 2.0.0 removed twelve scheduled-interview fields because Ashby's `interview.list` endpoint never returns them. These fields were `applicationId`, `interviewScheduleId`, `interviewStageId`, `status`, `createdAt`, `updatedAt`, `cancelledAt`, `startTime`, `endTime`, `feedbackLink`, `interviewerUserIds`, and `meetingLink`.

The `openings` stream returns headcount openings. Each record's `latestVersion` object contains the opening's current details, including `jobIds` and `locationIds`. These fields join to `jobs.id` and `locations.id`.

The `approvals` stream returns approval processes for offers, jobs, and openings. The connector doesn't filter by entity, so every approval in your account syncs. Use `entityType` to identify the record type referenced by `entityId`. Then join `entityId` to `offers.id`, `jobs.id`, or `openings.id`.

### Archived and deactivated records

From version 1.4.0, the connector asks Ashby to include archived records from several streams. These streams are `archive_reasons`, `candidate_tags`, `custom_fields`, `departments`, `feedback_form_definitions`, `interviews`, `locations`, and `sources`. It also includes deactivated users from `users`. Earlier versions only synced active records from these streams. Your first sync after upgrading may therefore return more rows. To include only active records, filter on `isArchived`. For `users`, filter on `isEnabled`.

Streams added in version 1.6.0 also include inactive records. `interview_plans` includes archived plans. `interviewer_pools` includes archived pools and archived training stages. Filter on `isArchived` to exclude these records. `source_tracking_links` includes disabled links, which you can exclude by filtering on `enabled`.

Among the streams added in version 1.7.0, `job_templates` returns active and inactive templates. Filter on `status` to include only active templates. Ashby's `jobBoard.list` only returns enabled job boards, so `job_boards` doesn't include disabled job boards.

## Performance

Ashby documents a rate limit of [1,000 requests per minute per API key](https://docs.ashbyhq.com/how-do-i-generate-an-api-key). The connector reads up to two streams simultaneously. An API key shared with other integrations has less available capacity. To protect this capacity, the connector limits `application.listHistory` and `application.listCriteriaEvaluations` to 100 requests per minute each. It calls each of these endpoints at least once per application. The connector applies no request budget to other endpoints. After an HTTP 429 response, it waits for the `Retry-After` interval and retries. If the header is missing, it applies exponential backoff before retrying.

## Troubleshooting

Ashby reports most errors as HTTP 200 responses with `success: false` in the body. From version 1.4.0, the connector fails the sync after these responses. The error includes Ashby's error code, message, and request ID. Earlier versions could finish without records or an error report.

- **HTTP 401 Unauthorized**: Ashby rejected the API key. Check that the key in the source settings is correct and active. Alternatively, generate a new key in Ashby.
- **HTTP 403 Forbidden**: The API key may be deactivated or lack access. Generate a new key in Ashby.
- **`incremental_sync_too_large`**: About 10,000 records have changed since the stream's previous incremental sync. Switch the stream to Full Refresh. Alternatively, refresh the stream and sync the connection more often, at least daily.
- **`sync_token_expired` or `sync_token_invalid`**: The stored sync token is over 14 days old or can't be read. Refresh the stream to read it fully again.
- **`missing_endpoint_permission`**: The API key lacks a read permission required by a selected stream. The error message identifies the missing permission. Enable it on the key by using [permission table](#prerequisites), or deselect the stream.

The connector retries HTTP 429 and 5xx responses before it fails.

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Upgrade to 2.0.0

Version 2.0.0 corrects four stream schemas to match the Ashby API. `applications.archiveReason` becomes an object, and `job_postings.publishedDate` becomes a date. `application_criteria_evaluations` gains a primary key comprising `application_id` and `id`. Fields Ashby never returns are removed from `interviews` and `application_criteria_evaluations`. Refresh the source schema after upgrading. Because `applications` syncs incrementally, existing rows keep their old `archiveReason` value until the application changes in Ashby. Refresh the `applications` stream to rewrite them using the new shape. The destination may then fail to change a column's type. Examples include a Snowflake `invalid type ... for parameter 'TO_OBJECT'` error or an S3 Data Lake or Iceberg schema-evolution error. If this happens, drop the affected tables and refresh those streams. See [Ashby migration guide](/integrations/sources/ashby-migrations#upgrading-to-200) for every change, required downstream query update, and upgrade step.

## Upgrade to 1.0.0

Version 1.0.0 declares element schemas for array columns that the connector previously left untyped. These columns change type in data-lake destinations such as S3 Data Lake and Iceberg. Syncs can therefore fail with a schema evolution error. Refresh the affected streams first. Only drop and recreate the affected destination tables if a sync still fails. See [Ashby migration guide](/integrations/sources/ashby-migrations) for every affected column and the upgrade steps.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :-------- | :--------- | :------------------------------------------------------- | :-------------------------------------------- |
| 2.1.4 | 2026-11-10 | [91399](https://github.com/airbytehq/airbyte/pull/91399) | Update dependencies |
| 2.1.3 | 2026-11-03 | [90480](https://github.com/airbytehq/airbyte/pull/90480) | Update dependencies |
| 2.1.2 | 2026-10-30 | [90220](https://github.com/airbytehq/airbyte/pull/90220) | Promote to certified |
| 2.1.1 | 2026-10-29 | [90197](https://github.com/airbytehq/airbyte/pull/90197) | Show a date picker for the start date field. |
| 2.1.0 | 2026-10-29 | [89675](https://github.com/airbytehq/airbyte/pull/89675) | Added incremental sync using Ashby sync tokens for the 20 streams whose endpoints support them. |
| 2.0.1 | 2026-10-27 | [89792](https://github.com/airbytehq/airbyte/pull/89792) | Update dependencies |
| 2.0.0 | 2026-10-23 | [87726](https://github.com/airbytehq/airbyte/pull/87726) | Breaking: correct the `applications`, `job_postings`, `application_criteria_evaluations`, and `interviews` schemas to match the Ashby API. See the [migration guide](/integrations/sources/ashby-migrations). |
| 1.7.3 | 2026-10-20 | [89142](https://github.com/airbytehq/airbyte/pull/89142) | Update dependencies |
| 1.7.2 | 2026-10-13 | [88502](https://github.com/airbytehq/airbyte/pull/88502) | Update dependencies |
| 1.7.1 | 2026-10-06 | [87745](https://github.com/airbytehq/airbyte/pull/87745) | Update dependencies |
| 1.7.0 | 2026-10-05 | [87590](https://github.com/airbytehq/airbyte/pull/87590) | Add openings, job templates, job boards, approvals, and projects streams |
| 1.6.0 | 2026-10-05 | [87587](https://github.com/airbytehq/airbyte/pull/87587) | Add interview plans, interview stage groups, interviewer pools, survey form definitions, and source tracking links streams |
| 1.5.0 | 2026-10-02 | [87597](https://github.com/airbytehq/airbyte/pull/87597) | Add incremental sync to `applications` and `application_history`, so incremental syncs request history only for applications updated since the previous sync, with a 1-day lookback |
| 1.4.0 | 2026-09-30 | [87051](https://github.com/airbytehq/airbyte/pull/87051) | Fail syncs on Ashby `success: false` errors, sync `interview_stages` per interview plan, paginate `application_criteria_evaluations`, and include archived and deactivated records in lookup streams |
| 1.3.4 | 2026-09-29 | [87080](https://github.com/airbytehq/airbyte/pull/87080) | Update dependencies |
| 1.3.3 | 2026-09-22 | [86515](https://github.com/airbytehq/airbyte/pull/86515) | Update dependencies |
| 1.3.2 | 2026-09-21 | [86501](https://github.com/airbytehq/airbyte/pull/86501) | Add mock-server tests and sandbox acceptance-test secret |
| 1.3.1 | 2026-09-15 | [85974](https://github.com/airbytehq/airbyte/pull/85974) | Update dependencies |
| 1.3.0 | 2026-09-09 | [85755](https://github.com/airbytehq/airbyte/pull/85755) | Add `application_feedback` stream; send the API key as the Basic auth username with a blank password per Ashby docs |
| 1.2.1 | 2026-09-08 | [85402](https://github.com/airbytehq/airbyte/pull/85402) | Update dependencies |
| 1.2.0 | 2026-08-29 | [85183](https://github.com/airbytehq/airbyte/pull/85183) | Declare the interview definition fields `interview.list` actually returns on the `interviews` stream, and request non-shared (job-specific) interviews |
| 1.1.0 | 2026-08-25 | [84392](https://github.com/airbytehq/airbyte/pull/84392) | Add application history stream |
| 1.0.1 | 2026-08-25 | [84405](https://github.com/airbytehq/airbyte/pull/84405) | Send the pagination page size using Ashby's documented `limit` field instead of the undocumented `per_page` field |
| 1.0.0 | 2026-08-18 | [84274](https://github.com/airbytehq/airbyte/pull/84274) | Breaking: declare documented API fields across stream schemas, including element schemas for previously untyped array columns. Data-lake users must refresh the affected streams, then recreate the affected tables if a sync still fails. See the [migration guide](/integrations/sources/ashby-migrations). |
| 0.3.9 | 2026-08-18 | [78554](https://github.com/airbytehq/airbyte/pull/78554) | Update dependencies |
| 0.3.8 | 2026-08-11 | [84215](https://github.com/airbytehq/airbyte/pull/84215) | Promoted release candidate to GA |
| 0.3.8-rc.5 | 2026-08-11 | [84214](https://github.com/airbytehq/airbyte/pull/84214) | Revert concurrency support |
| 0.3.8-rc.4 | 2026-08-11 | [83816](https://github.com/airbytehq/airbyte/pull/83816) | Add missing application, candidate, and source fields to the declared schemas, and remove duplicated unreferenced manifest blocks. |
| 0.3.8-rc.3 | 2026-05-26 | [78434](https://github.com/airbytehq/airbyte/pull/78434) | Decrease default concurrency to 2 and add explicit worker count plus API request budget for the next rollout. |
| 0.3.8-rc.2 | 2026-05-21 | [78307](https://github.com/airbytehq/airbyte/pull/78307) | Decrease default concurrency to 3 after Phase 1 rollout monitoring found source-read regressions and a 429 retry warning. |
| 0.3.8-rc.1 | 2026-05-18 | [77048](https://github.com/airbytehq/airbyte/pull/77048) | Add concurrency support with default_concurrency=4 for concurrent stream reads |
| 0.3.7 | 2026-04-28 | [77144](https://github.com/airbytehq/airbyte/pull/77144) | Update dependencies |
| 0.3.6 | 2026-04-21 | [76510](https://github.com/airbytehq/airbyte/pull/76510) | Update dependencies |
| 0.3.5 | 2026-03-31 | [75881](https://github.com/airbytehq/airbyte/pull/75881) | Update dependencies |
| 0.3.4 | 2026-03-24 | [75325](https://github.com/airbytehq/airbyte/pull/75325) | Update dependencies |
| 0.3.3 | 2026-03-10 | [74490](https://github.com/airbytehq/airbyte/pull/74490) | Update dependencies |
| 0.3.2 | 2026-02-24 | [73805](https://github.com/airbytehq/airbyte/pull/73805) | Update dependencies |
| 0.3.1 | 2026-02-17 | [60692](https://github.com/airbytehq/airbyte/pull/60692) | Update dependencies |
| 0.3.0 | 2026-02-13 | [73244](https://github.com/airbytehq/airbyte/pull/73244) | Add interviews, interview_stages, and application_criteria_evaluations streams |
| 0.2.23 | 2025-05-10 | [59853](https://github.com/airbytehq/airbyte/pull/59853) | Update dependencies |
| 0.2.22 | 2025-05-03 | [59322](https://github.com/airbytehq/airbyte/pull/59322) | Update dependencies |
| 0.2.21 | 2025-04-26 | [58746](https://github.com/airbytehq/airbyte/pull/58746) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58271](https://github.com/airbytehq/airbyte/pull/58271) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57150](https://github.com/airbytehq/airbyte/pull/57150) | Update dependencies |
| 0.2.18 | 2025-03-29 | [56594](https://github.com/airbytehq/airbyte/pull/56594) | Update dependencies |
| 0.2.17 | 2025-03-22 | [56140](https://github.com/airbytehq/airbyte/pull/56140) | Update dependencies |
| 0.2.16 | 2025-03-08 | [55387](https://github.com/airbytehq/airbyte/pull/55387) | Update dependencies |
| 0.2.15 | 2025-03-01 | [54888](https://github.com/airbytehq/airbyte/pull/54888) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54234](https://github.com/airbytehq/airbyte/pull/54234) | Update dependencies |
| 0.2.13 | 2025-02-15 | [53874](https://github.com/airbytehq/airbyte/pull/53874) | Update dependencies |
| 0.2.12 | 2025-02-08 | [53407](https://github.com/airbytehq/airbyte/pull/53407) | Update dependencies |
| 0.2.11 | 2025-02-01 | [52893](https://github.com/airbytehq/airbyte/pull/52893) | Update dependencies |
| 0.2.10 | 2025-01-25 | [52162](https://github.com/airbytehq/airbyte/pull/52162) | Update dependencies |
| 0.2.9 | 2025-01-18 | [51710](https://github.com/airbytehq/airbyte/pull/51710) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51292](https://github.com/airbytehq/airbyte/pull/51292) | Update dependencies |
| 0.2.7 | 2024-12-28 | [50493](https://github.com/airbytehq/airbyte/pull/50493) | Update dependencies |
| 0.2.6 | 2024-12-21 | [50207](https://github.com/airbytehq/airbyte/pull/50207) | Update dependencies |
| 0.2.5 | 2024-12-14 | [49572](https://github.com/airbytehq/airbyte/pull/49572) | Update dependencies |
| 0.2.4 | 2024-12-12 | [49014](https://github.com/airbytehq/airbyte/pull/49014) | Update dependencies |
| 0.2.3 | 2024-11-04 | [48196](https://github.com/airbytehq/airbyte/pull/48196) | Update dependencies |
| 0.2.2 | 2024-10-29 | [47729](https://github.com/airbytehq/airbyte/pull/47729) | Update dependencies |
| 0.2.1 | 2024-10-28 | [47616](https://github.com/airbytehq/airbyte/pull/47616) | Update dependencies |
| 0.2.0 | 2024-08-19 | [44420](https://github.com/airbytehq/airbyte/pull/44420) | Refactor connector to manifest-only format |
| 0.1.16 | 2024-08-17 | [44288](https://github.com/airbytehq/airbyte/pull/44288) | Update dependencies |
| 0.1.15 | 2024-08-12 | [43780](https://github.com/airbytehq/airbyte/pull/43780) | Update dependencies |
| 0.1.14 | 2024-08-10 | [43491](https://github.com/airbytehq/airbyte/pull/43491) | Update dependencies |
| 0.1.13 | 2024-08-03 | [43080](https://github.com/airbytehq/airbyte/pull/43080) | Update dependencies |
| 0.1.12 | 2024-07-27 | [42658](https://github.com/airbytehq/airbyte/pull/42658) | Update dependencies |
| 0.1.11 | 2024-07-20 | [42220](https://github.com/airbytehq/airbyte/pull/42220) | Update dependencies |
| 0.1.10 | 2024-07-17 | [42028](https://github.com/airbytehq/airbyte/pull/42028) | Fix typo in application stream |
| 0.1.9 | 2024-07-13 | [41818](https://github.com/airbytehq/airbyte/pull/41818) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41379](https://github.com/airbytehq/airbyte/pull/41379) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41271](https://github.com/airbytehq/airbyte/pull/41271) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40971](https://github.com/airbytehq/airbyte/pull/40971) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40469](https://github.com/airbytehq/airbyte/pull/40469) | Update dependencies |
| 0.1.4 | 2024-06-22 | [40107](https://github.com/airbytehq/airbyte/pull/40107) | Update dependencies |
| 0.1.3 | 2024-06-06 | [39159](https://github.com/airbytehq/airbyte/pull/39159) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.2 | 2024-05-28 | [38666](https://github.com/airbytehq/airbyte/pull/38666) | Make connector compatible with Builder |
| 0.1.1 | 2024-05-20 | [38421](https://github.com/airbytehq/airbyte/pull/38421) | [autopull] base image + poetry + up_to_date |
| 0.1.0 | 2022-10-22 | [18334](https://github.com/airbytehq/airbyte/pull/18334) | Add Ashby Source Connector |

</details>
