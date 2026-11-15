---
generated_record: true
connector_name: GitHub
connector_type: source
connector_slug: github
connector_directory: source-github
definition_id: ef69ef6e-aa7f-4af1-a01d-ef775033524e
version: 2.8.6
support_level: certified
release_stage: generally_available
documentation_url: https://docs.airbyte.com/integrations/sources/github
logo: /images/connectors/sources/github.svg
logo_source_path: airbyte-integrations/connectors/source-github/icon.svg
logo_sha256: 989aa2dcf35b07ac17a894eebe38c00b7f6950f75d5c8ddf4be7a66427b55f0b
original_metadata_path: airbyte-integrations/connectors/source-github/metadata.yaml
original_metadata_sha256: a41c5841d32a40e6796b9e85c82813cecfa29a932c5d6dda3226f02778b9b6c3
original_document_path: docs/integrations/sources/github.md
original_document_sha256: 76024797c8802670a577401b32b85c1efdf368af0b3e6426ec5499dae3230652
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 4454fbc173bbaad92cac50fb719645e49bb744c8ef8c5af6ab7c98dcc0d51542
rewritten_at: 2026-11-12T14:08:46.037657+00:00
---

# GitHub

<HideInUI>

Use this page to set up the [GitHub](https://www.github.com) source connector and find reference information.

</HideInUI>

## Prerequisites

- A list of GitHub repositories, with access to any private repositories

<!-- env:cloud -->

**For Airbyte Cloud:**

- OAuth
- Personal Access Token (see [Permissions and scopes](https://docs.airbyte.com/integrations/sources/github#permissions-and-scopes))
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

- Personal Access Token (see [Permissions and scopes](https://docs.airbyte.com/integrations/sources/github#permissions-and-scopes))
<!-- /env:oss -->

## Setup

### Step 1: Set up GitHub

Create a [GitHub Account](https://github.com).

<!-- env:oss -->

**Airbyte Open Source additional setup steps**

Sign in to [GitHub](https://github.com), then generate a [personal access token](https://github.com/settings/tokens). To distribute API quota usage across tokens, enter multiple tokens separated by `,`.

<!-- /env:oss -->

### Step 2: Set up the connector

<!-- env:cloud -->

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Select Sources, then select + New source.
3. On the Set up the source page, select GitHub from the Source type dropdown.
4. Enter a name for the GitHub connector.
5. Choose an authentication method:
   <!-- env:cloud -->

   - **For Airbyte Cloud:** **Authenticate your GitHub account** to authorise your GitHub account. Airbyte authenticates the GitHub account you're currently signed in to. Check that you're signed in to the correct account.
   <!-- /env:cloud -->
   <!-- env:oss -->

   - **For Airbyte Open Source:** Authenticate with **Personal Access Token**. To generate a personal access token, sign in to [GitHub](https://github.com) and generate a [personal access token](https://github.com/settings/tokens). Enter your GitHub personal access token. To distribute API quota usage across tokens, enter multiple tokens separated by `,`.
   <!-- /env:oss -->

6. **GitHub Repositories** - Enter a list of GitHub organizations or repositories. For one repository, use `airbytehq/airbyte`. For multiple repositories, use `airbytehq/airbyte airbytehq/another-repo`. To receive data from every repository in an organization, use `airbytehq/*`.

   :::caution
   The connector skips repositories that don't exist or have an incorrect name or name format. It records an `WARN` message in the logs.
   :::

7. **Start date (Optional)** - Enter the date from which you want to replicate stream data. Supported streams replicate only data generated on or after this date.

   - These streams sync only records generated on or after the **Start Date**: `comments`, `commit_comment_reactions`, `commit_comments`, `commits`, `deployments`, `events`, `issue_comment_reactions`, `issue_events`, `issue_milestones`, `issue_reactions`, `issues`, `project_cards`, `project_columns`, `projects`, `pull_request_comment_reactions`, `pull_requests`, `pull_request_stats`, `releases`, `review_comments`, `reviews`, `stargazers`, `workflow_run_attempts`, `workflow_runs`, `workflows`.

   - The **Start Date** doesn't apply to these streams, which sync all data: `assignees`, `branches`, `collaborators`, `issue_labels`, `organizations`, `pull_request_commits`, `repositories`, `tags`, `teams`, `users`

8. **Branch (Optional)** - Enter the GitHub repository branches from which you want to pull commits, such as `airbytehq/airbyte/master`. If you don't specify branches for a repository, the connector pulls its default branch, such as `airbytehq/airbyte/master airbytehq/airbyte/my-branch`.
9. **API URL (Optional)** - For a self-hosted GitHub instance, enter its API URL, such as `https://github.company.org`. Leave this empty to use `https://api.github.com/`.
10. **Max Waiting Time (in minutes) (Optional)** - Set how long the connector waits when every configured API token is rate-limited. After this period, the sync fails. The default is 120 minutes. This covers GitHub's 60-minute rate-limit reset window and adds a margin. You can enter any value from 1 to 240 minutes. With multiple personal access tokens, the connector rotates through them before waiting. It waits only after exhausting every token.

11. **Number of Concurrent Threads (Optional)** - Set how many partitions the connector reads in parallel. The default is 4, and the maximum is 25. During the declarative migration, this setting applies only to streams already moved to the declarative manifest. These are `repositories`, `assignees`, `branches`, `collaborators`, `issue_labels`, `tags`, `organizations`, `teams`, `users`, `events`, `pull_requests`, `commit_comments`, `issue_milestones`, `stargazers`, `projects`, `issue_events`, `deployments`, `workflows`, `comments`, `issues`, `review_comments`, `pull_request_commits`, `project_columns`, `project_cards`, `team_members`, `team_memberships`, `issue_timeline_events`, `commit_comment_reactions`, `issue_comment_reactions`, `commits`, `contributor_activity`, `workflow_runs` and `workflow_jobs`. The connector still reads the remaining streams one at a time. A higher value speeds up migrated streams but increases the risk of reaching GitHub's secondary rate limits.

### Airbyte Open Source

1. Open the Airbyte Open Source dashboard.
2. Select Sources, then select + New source.
3. On the Set up the source page, select GitHub from the Source type dropdown.
4. Enter a name for the GitHub connector.

<HideInUI>

## Supported sync modes

The GitHub source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental Sync - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental Sync - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

## Supported streams

The connector provides these full refresh streams:

- [Assignees](https://docs.github.com/en/rest/issues/assignees?apiVersion=2022-11-28#list-assignees)
- [Branches](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#list-branches)
- [Contributor Activity](https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-all-contributor-commit-activity)
- [Collaborators](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#list-repository-collaborators)
- [Issue labels](https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#list-labels-for-a-repository)
- [Organizations](https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#list-organizations)
- [Pull request commits](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-commits-on-a-pull-request)
- [Tags](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-tags)
- [TeamMembers](https://docs.github.com/en/rest/teams/members?apiVersion=2022-11-28#list-team-members)
- [TeamMemberships](https://docs.github.com/en/rest/teams/members?apiVersion=2022-11-28#get-team-membership-for-a-user)
- [Teams](https://docs.github.com/en/rest/teams/teams?apiVersion=2022-11-28#list-teams)
- [Users](https://docs.github.com/en/rest/orgs/members?apiVersion=2022-11-28#list-organization-members)
- [Issue timeline events](https://docs.github.com/en/rest/issues/timeline?apiVersion=2022-11-28#list-timeline-events-for-an-issue)

The connector provides these incremental streams:

- [Comments](https://docs.github.com/en/rest/issues/comments?apiVersion=2022-11-28#list-issue-comments-for-a-repository)
- [Commit comment reactions](https://docs.github.com/en/rest/reference/reactions?apiVersion=2022-11-28#list-reactions-for-a-commit-comment)
- [Commit comments](https://docs.github.com/en/rest/commits/comments?apiVersion=2022-11-28#list-commit-comments-for-a-repository)
- [Commits](https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits)
- [Deployments](https://docs.github.com/en/rest/deployments/deployments?apiVersion=2022-11-28#list-deployments)
- [Events](https://docs.github.com/en/rest/activity/events?apiVersion=2022-11-28#list-repository-events)
- [Issue comment reactions](https://docs.github.com/en/rest/reactions/reactions?apiVersion=2022-11-28#list-reactions-for-an-issue-comment)
- [Issue events](https://docs.github.com/en/rest/issues/events?apiVersion=2022-11-28#list-issue-events-for-a-repository)
- [Issue milestones](https://docs.github.com/en/rest/issues/milestones?apiVersion=2022-11-28#list-milestones)
- [Issue reactions](https://docs.github.com/en/rest/reactions/reactions?apiVersion=2022-11-28#list-reactions-for-an-issue)
- [Issues](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues)
- [Project (Classic) cards](https://docs.github.com/en/rest/projects/cards?apiVersion=2022-11-28#list-project-cards)
- [Project (Classic) columns](https://docs.github.com/en/rest/projects/columns?apiVersion=2022-11-28#list-project-columns)
- [Projects (Classic)](https://docs.github.com/en/rest/projects/projects?apiVersion=2022-11-28#list-repository-projects)
- [ProjectsV2](https://docs.github.com/en/graphql/reference/objects#projectv2)
- [Pull request comment reactions](https://docs.github.com/en/rest/reactions/reactions?apiVersion=2022-11-28#list-reactions-for-a-pull-request-review-comment)
- [Pull request stats](https://docs.github.com/en/graphql/reference/objects#pullrequest)
- [Pull requests](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests)
- [Releases](https://docs.github.com/en/graphql/reference/objects#release)
- [Repositories](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories)
- [Review comments](https://docs.github.com/en/rest/pulls/comments?apiVersion=2022-11-28#list-review-comments-in-a-repository)
- [Reviews](https://docs.github.com/en/rest/pulls/reviews?apiVersion=2022-11-28#list-reviews-for-a-pull-request)
- [Stargazers](https://docs.github.com/en/rest/activity/starring?apiVersion=2022-11-28#list-stargazers)
- [WorkflowJobs](https://docs.github.com/en/rest/actions/workflow-jobs?apiVersion=2022-11-28#list-jobs-for-a-workflow-run)
- [WorkflowRuns](https://docs.github.com/en/rest/actions/workflow-runs?apiVersion=2022-11-28#list-workflow-runs-for-a-repository)
- [WorkflowRunAttempts](https://docs.github.com/en/rest/actions/workflow-runs?apiVersion=2022-11-28#get-a-workflow-run-attempt)
- [Workflows](https://docs.github.com/en/rest/actions/workflows?apiVersion=2022-11-28#list-repository-workflows)

### Entity-relationship diagram
<EntityRelationshipDiagram></EntityRelationshipDiagram>

### Notes

1. Only four streams listed above are fully incremental: `comments`, `commits`, `issues` and `review comments`. They:

   - read only new records;
   - output only new records.

2. The `workflow_runs`, `workflow_jobs` and `workflow_run_attempts` streams are almost fully incremental. They:

   - read new records and some old records from the past 32 days [docs](https://docs.github.com/en/actions/managing-workflow-runs/re-running-workflows-and-jobs). GitHub prevents reruns 30 days after a run's creation. The connector adds a two-day margin because older runs can no longer change;
   - use the same logic because `workflow_jobs` depends on `workflow_runs` to read data [docs](https://docs.github.com/en/rest/actions/workflow-jobs#list-jobs-for-a-workflow-run);
   - output only new records.

   `workflow_runs` contains only the latest attempt for each run. The GitHub endpoint returns one record per run. When a workflow reruns, earlier attempts never reach your destination. The returned record combines the latest attempt's status with the original attempt's `created_at`. Sync `workflow_run_attempts` when you need the complete rerun history. It emits one record per attempt, keyed by `[id, run_attempt]`. Each attempt has its own `created_at`, `conclusion`, `logs_url` and `jobs_url`.

   GitHub has no endpoint for listing attempts, so each rerun attempt costs one request. A run that was never rerun adds no request beyond the run listing. Its only attempt comes from the listing record, with `logs_url` and `jobs_url` scoped to that attempt. Its `created_at` and `updated_at` then match `workflow_runs`. These can be one second earlier than the same attempt's values from GitHub's attempt endpoint. Its `pull_requests` reflects the listing read. For an active run, its `status` also reflects that read, as in `workflow_runs`. New runs created during the listing read can cause a run to appear twice, as in `workflow_runs`. Destinations that deduplicate on the primary key aren't affected. The connector selects runs for the window using the same approach as `workflow_runs`. It rereads a run when that run's `updated_at` changes. It then emits every attempt for that run, including attempts last updated before the cursor.

   Plan for these three points before enabling it:

   - **The first sync is the expensive one, and a repository is all-or-nothing.** It reads every run created since the **Start Date**. Allow one listing request per 100 runs and one request for each rerun attempt. An authenticated token allows 5,000 requests per hour. This work doesn't carry across syncs. A repository's cursor advances only after the connector reads that repository to the end. If interrupted part-way through, the next sync restarts that repository. It doesn't reread repositories it completed. Enabling the stream on a connection already syncing `workflow_runs` still starts from the **Start Date**. The stream keeps its own cursor.
   - **The run listing is read once per selected stream.** `workflow_runs`, `workflow_jobs` and `workflow_run_attempts` each read back to 32 days before their own cursor. The streams can't share a read yet.
   - **More tokens help only if they belong to different accounts.** GitHub's 5,000-request hourly limit applies per account. Its secondary rate limits also apply per account, so extra tokens for one account add no capacity. Beyond that limit, the connector applies one global budget of 900 requests per minute. This caps throughput at about eleven tokens' capacity.

   If the token can't read Actions for a repository, GitHub returns 403. The connector logs the issue and skips that repository without failing the sync. An empty `workflow_run_attempts` can therefore indicate a missing `workflow` scope for a classic token. It can also indicate a missing `Actions: read` permission for a fine-grained token, rather than no reruns.

3. The other 19 incremental streams differ in one way. They:

   - read all records;
   - output only new records.

   Consider this behaviour when using these streams because it may affect your API request limits.

4. For large streams, a `start_date` far in the past can cause repeated GitHub errors instead of records. The logs show the relevant `WARN` message. A more recent `start_date` may help.
   **The "Start date" configuration option does not apply to the streams below, because the GitHub API does not include dates which can be used for filtering:**

   - `assignees`
   - `branches`
   - `collaborators`
   - `issue_labels`
   - `organizations`
   - `pull_request_commits`
   - `tags`
   - `teams`
   - `users`

5. Adding a repository or organization to a connection that has already synced doesn't backfill its history. See [Adding repositories or organizations to an existing connection](#adding-repositories-or-organizations-to-an-existing-connection).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Limitations and troubleshooting

<details>
<summary>
Expand to see details about GitHub connector limitations and troubleshooting.
</summary>

### Connector limitations

#### Rate limits

You can make API requests with a personal access token. You can also authorise a GitHub App or OAuth app to make API requests for you.
These requests count towards your personal limit of 5,000 requests per hour. The limit is 15,000 for apps owned by a GitHub Enterprise Cloud organization.

:::info
GitHub counts `REST API` and `GraphQL API` rate limits separately. The REST API uses a request-based limit. The GraphQL API uses a [point-based limit](https://docs.github.com/en/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api), where each query costs a calculated number of points. Streams using the GraphQL API include `pull_request_stats`, `reviews`, `pull_request_comment_reactions`, `issue_reactions`, `releases` and `projects_v2`.
:::

:::tip
If you reach the limits before reading every stream, try these steps:

1. Use Incremental sync mode.
2. Increase the sync interval.
3. Split the sync into separate connections with fewer streams.
4. Enter multiple personal access tokens in the **Personal Access Tokens** field, separated by commas. The connector rotates through every token before waiting for rate limits to reset.

:::

When every configured token is rate-limited, the connector waits for the limits to reset instead of failing immediately. The **Max Waiting Time (in minutes)** option caps this wait. The default is 120 minutes, and the maximum is 240 minutes. The cap applies when the connector already knows its tokens are exhausted. It also applies when GitHub rejects a request and specifies a wait. Airbyte treats rate-limit exhaustion as a transient error. If the connector exceeds this wait, Airbyte retries according to your connection's retry behaviour. With several tokens, a rate-limited request switches tokens instead of waiting, regardless of this setting.

**Test connection** is exempt from the wait. It returns the rate-limit message within seconds instead of waiting. A rate-limited token therefore doesn't leave the connection setup page hanging.

See the GitHub article [Rate limits for the REST API](https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api).

#### Add to an existing connection

Expanding the **GitHub Repositories** field after a connection has synced doesn't backfill new repositories' or organizations' earlier activity. The connector keeps one sync position for each repository or organization. A new one starts from the connection's current overall position, not your configured **Start date**. It never emits items created or last updated before that position. The sync provides no warning or error.

For example, consider a connection syncing `docker/*` since 2026-01-01. If you expand it to `docker/*, airbytehq/*`, it collects `airbytehq` repositories updated after 2026-01-01. It doesn't collect repositories whose latest update is older.

To collect a newly added repository's or organization's full history, save the new value first. Then clear the affected streams, or refresh the connection, and sync. Each stream rereads from the start of its supported range. Streams respecting **Start date** use your configured value. The streams listed above that ignore it read everything available.

This currently affects the `repositories` and `workflow_run_attempts` streams. Other streams still use the **Start date** for a repository they haven't seen. They'll adopt the behaviour above when they move to the connector's declarative implementation.

#### GitHub Enterprise Server without rate limits

GitHub Enterprise Server disables HTTP API rate limits by default. In this state, the instance returns `404 Rate limiting is not enabled.` for `GET /rate_limit`. The connector interprets this as an instance that doesn't track quotas. It continues without quota tracking and no longer treats the response as a failed connection. Requests still require authentication, and the connector still rotates through multiple tokens. It also respects any enforced rate limits through its usual retry and backoff. Secondary rate limits use a separate GHES setting.

#### Releases asset limit

The Releases stream uses the GitHub GraphQL API and retrieves up to 100 assets per release. A release with more than 100 assets includes only the first 100. The connector doesn't currently support sub-pagination for release assets.

#### Stargazers access requirements

Since July 2026, GitHub only lists a repository's stargazers for its admins and collaborators ([GitHub changelog](https://github.blog/changelog/2026-06-30-upcoming-access-restrictions-to-public-api-endpoints-and-ui-views/)). GitHub returns `404` or `403` when the authenticated user or app has neither role. The connector skips only that repository's `stargazers` stream. It logs the repository name and restriction, while the sync still succeeds. Other streams for that repository aren't affected. Expect an empty `stargazers` stream for public or third-party repositories where you aren't a collaborator. The aggregate star count remains available in the `stargazers_count` field of the `repositories` stream.

#### Unreadable repositories and server errors

If a repository-specific issue prevents access, the connector logs it and continues to the next repository. One unreadable repository therefore doesn't fail the entire stream. This includes a deleted or renamed repository (`404`), or one your token can't access (`403`). It also includes a repository without commits (`409`), or one where the stream's supporting feature is disabled. For example, this applies to the `issue_labels` stream when Issues is disabled (`410`).

Version 2.2.0 changed how the connector handles repeated server errors. If GitHub continues returning `502 Bad Gateway` or `504 Gateway Timeout` after retries, the stream now fails. It no longer skips the affected repository or organization. Earlier versions logged a warning, skipped it and reported a successful sync. As a result, records could be missing without notice. Affected streams are `repositories` since 2.2.0; `assignees`, `branches`, `collaborators`, `issue_labels`, `tags`, `organizations`, `teams` and `users` since 2.3.0; `events`, `pull_requests`, `commit_comments`, `issue_milestones`, `stargazers`, `projects`, `issue_events`, `deployments`, `workflows`, `comments`, `issues` and `review_comments` since 2.4.0; `pull_request_commits`, `project_columns`, `project_cards`, `team_members`, `team_memberships`, `issue_timeline_events`, `commit_comment_reactions` and `issue_comment_reactions` since 2.5.0; and `commits`, `contributor_activity`, `workflow_runs` and `workflow_jobs` since 2.6.0. If a stream fails after an upgrade, check whether it previously skipped that repository or organization.

The same streams also no longer resume part-way through a stream. Previously, a failed attempt resumed from the repository or organization where it stopped. It now restarts from the first one. No data is lost because the retry rereads earlier records. However, a late failure repeats earlier partitions' requests against your rate limit. The same versions listed above apply. For `issues`, the connector now saves state once per repository, rather than once per page. An interrupted sync therefore restarts the current repository instead of resuming within it.

#### `contributor_activity` fails after five 202 responses

GitHub returns `202 Accepted` from the contributor statistics endpoint while calculating the statistics. The connector retries five times at 90-second intervals, as before. Since version 2.6.0, the stream fails if GitHub is still calculating after those retries. Earlier versions logged a message, skipped the repository and reported a successful sync.

#### Repeated parent records in `project_columns`, `project_cards`, `commit_comment_reactions` and `issue_comment_reactions`

Since version 2.5.0, these four streams keep a cursor for each parent record. The parent can be a project, column or comment. Each incremental sync re-emits one record per parent whose cursor matches the saved value, for the same reason described above. Existing connections retain their saved cursors. The first sync after upgrading converts the nested state written by earlier versions. Since version 2.6.0, the same behaviour applies to `commits`, with one cursor per branch, and to `workflow_runs` and `workflow_jobs`.

#### Repeated repository records in `comments`, `issues` and `review_comments`

Since version 2.4.0, each incremental sync of these streams re-emits one record. Its `updated_at` exactly matches the timestamp where the previous sync stopped. GitHub's `since` filter is inclusive, so this record always appears on the first page. The connector no longer removes it locally. The record is unchanged. Destinations using **Incremental | Append + Deduped** collapse it on the primary key. With **Incremental | Append**, you'll see one extra row per repository on each sync.

#### Repeated records in semi-incremental streams

Since version 2.4.0, each incremental sync re-emits one record per repository for these streams: `events`, `pull_requests`, `commit_comments`, `issue_milestones`, `stargazers`, `projects`, `issue_events`, `deployments` and `workflows`. Its cursor value, `updated_at`, `created_at` or `starred_at`, exactly matches the previous sync's stopping timestamp. These streams read GitHub's listing and filter it locally. Previously, the connector retained only records newer than the saved cursor. It now retains the boundary record too. The record is unchanged. Destinations using **Incremental | Append + Deduped** collapse it on the primary key. With **Incremental | Append**, you'll see one extra row per repository on each sync.

The same release includes two smaller changes:

- `pull_requests` now sets `base.repo_id` to the base repository's id. Earlier versions always emitted `null` because of a record transformation bug. `head.repo_id` is unchanged.
- `pull_requests` now always lists repositories newest first. Earlier versions listed them oldest first during a connection's first sync. This allowed a failed first sync to resume part-way through a repository. A failed attempt now restarts the repository, matching every later sync.

#### `review_comments` page size

Since version 2.8.2, `review_comments` requests 100 comments per page instead of 10. On very large repositories, GitHub could time out with the smaller page size and return HTTP 500. The larger page size reduces requests, but each request returns more data and takes longer. This stream's sync speed may therefore differ from earlier versions. Other large streams still request 10 records per page.

#### Permissions and scopes

With OAuth authentication, the OAuth2.0 application requests these [scopes](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes): **repo**, **read:org**, **read:repo_hook**, **read:user**, **read:discussion**, **read:project** and **workflow**. For [personal access token](https://github.com/settings/tokens), manually select the required scopes.

Your token needs at least the `repo` scope. The user who generates it needs additional permissions for some streams:

- To sync Collaborators, the user generating the personal access token must be a collaborator. An owner must invite them. If there are no collaborators, the connector syncs no records. Read more about access permissions [here](https://docs.github.com/en/get-started/learning-about-github/access-permissions-on-github).
- Syncing [Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams) is available only to authenticated members of a team's [organization](https://docs.github.com/en/rest/orgs). [Personal user accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts) and their repositories can't access Teams features. In this case, the connector syncs no records.
- To sync the Projects stream, enable the Projects feature for the repository.

### Troubleshooting

- Find common troubleshooting guidance for the GitHub source connector in the [Airbyte Forum](https://github.com/airbytehq/airbyte/discussions)

</details>

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :----------- | :----------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.8.6 | 2026-11-10 | [91494](https://github.com/airbytehq/airbyte/pull/91494) | Update dependencies |
| 2.8.5 | 2026-11-04 | [90970](https://github.com/airbytehq/airbyte/pull/90970) | Shorten manifest comments and move the design rationale to the connector docs; no behavior change |
| 2.8.4 | 2026-11-03 | [90166](https://github.com/airbytehq/airbyte/pull/90166) | Retry GitHub 5xx errors and timeouts with exponential backoff instead of waiting for the rate-limit reset |
| 2.8.3 | 2026-11-03 | [90557](https://github.com/airbytehq/airbyte/pull/90557) | Update dependencies |
| 2.8.2 | 2026-10-28 | [90165](https://github.com/airbytehq/airbyte/pull/90165) | Request `review_comments` with `per_page=100` to avoid GitHub timeouts on very large repositories |
| 2.8.1 | 2026-10-27 | [89848](https://github.com/airbytehq/airbyte/pull/89848) | Update dependencies |
| 2.8.0 | 2026-10-21 | [85378](https://github.com/airbytehq/airbyte/pull/85378) | Add the `workflow_run_attempts` stream: every attempt of a workflow run, keyed on `[id, run_attempt]`, since `workflow_runs` only ever returns the latest attempt of each run |
| 2.7.9 | 2026-10-20 | [89187](https://github.com/airbytehq/airbyte/pull/89187) | Update dependencies |
| 2.7.8 | 2026-10-13 | [88163](https://github.com/airbytehq/airbyte/pull/88163) | When GitHub refuses to list a repository's stargazers because the token is not an admin or collaborator, the `stargazers` stream now says so in the skip message, and names the skipped repository, instead of reporting a missing repository or missing token scopes. Upgrades to CDK 7.37.0 |
| 2.7.7 | 2026-10-13 | [88598](https://github.com/airbytehq/airbyte/pull/88598) | Update dependencies |
| 2.7.6 | 2026-10-12 | [87443](https://github.com/airbytehq/airbyte/pull/87443) | Stop reading the `releases` stream at the first already-synced release instead of the full release history on every sync. Records are unchanged |
| 2.7.5 | 2026-10-06 | [87862](https://github.com/airbytehq/airbyte/pull/87862) | Update dependencies |
| 2.7.4 | 2026-09-29 | [86932](https://github.com/airbytehq/airbyte/pull/86932) | Replace custom extractors of `reviews`, `issue_reactions` and `pull_request_comment_reactions` and the custom `workflow_runs` paginator with airbyte-cdk 7.31.0 features. Records are unchanged |
| 2.7.3 | 2026-09-29 | [87172](https://github.com/airbytehq/airbyte/pull/87172) | Update dependencies |
| 2.7.2 | 2026-09-22 | [86497](https://github.com/airbytehq/airbyte/pull/86497) | Make the connector manifest-only on the `source-declarative-manifest` base image; `check` and the legacy `repository`/`branch` config migrations now run from the manifest. Restore the GraphQL page size of `reviews`, `issue_reactions` and `pull_request_comment_reactions` to 100 and stop reading the deprecated `page_size_for_large_streams` setting, so the six large streams always use 10 |
| 2.7.1 | 2026-09-22 | [86600](https://github.com/airbytehq/airbyte/pull/86600) | Update dependencies |
| 2.7.0 | 2026-09-16 | [85822](https://github.com/airbytehq/airbyte/pull/85822) | Declarative migration Step 9 - move the `releases`, `projects_v2`, `pull_request_stats`, `reviews`, `issue_reactions` and `pull_request_comment_reactions` streams to the manifest. These streams now reduce the GraphQL page size and retry the same page when GitHub answers 502/504, instead of retrying the identical oversized query and eventually failing the stream; lowering "Page size for large streams" by hand is no longer needed to get past a timeout. Page-size reduction is also no longer shared between repositories, so one repository timing out no longer changes the page size used for the others. `pull_request_stats` now always reads newest-first and stops at the first already-synced pull request, rather than only doing so on syncs that already had state. Each incremental sync of the six streams now re-emits the one record per repository whose cursor equals the previous sync's cursor. A 502/504 on the GraphQL endpoint is now answered by reducing the page size and then, once the page size cannot be reduced any further, by retrying the same page: seven requests over about two minutes at the default page size, and four requests for a source configured with a page size of 1, which has no reduction to make. A GraphQL response that reports its error in the body rather than in the status code is retried again, as it was before 2.7.0, and a repository the token cannot read — which GitHub reports as a body error on an HTTP 200, not as a 404 — is now skipped with a warning like everywhere else in this connector, instead of failing the stream |
| 2.6.1 | 2026-09-17 | [86435](https://github.com/airbytehq/airbyte/pull/86435) | Follow GitHub's `Link` next URL with its `after` cursor to fix HTTP 422 `Pagination with the page parameter is not supported for large datasets` on large `issues` and other REST streams |
| 2.6.0 | 2026-09-10 | [85807](https://github.com/airbytehq/airbyte/pull/85807) | Declarative migration Step 8 - move the commits, contributor_activity, workflow_runs and workflow_jobs streams to the manifest. Each incremental sync of the three incremental ones now re-emits the one record per branch or repository whose cursor equals the previous sync's cursor, `contributor_activity` fails the stream when GitHub is still computing statistics after five retries instead of skipping the repository, and a repository that keeps returning 502/504 after retries fails the stream instead of being skipped with the sync still reported as successful |
| 2.5.0 | 2026-09-08 | [85380](https://github.com/airbytehq/airbyte/pull/85380) | Declarative migration Step 7 - move the pull_request_commits, project_columns, project_cards, team_members, team_memberships, issue_timeline_events, commit_comment_reactions and issue_comment_reactions streams to the manifest. The four incremental ones now re-emit the one record per parent whose cursor equals the previous sync's cursor, and a repository that keeps returning 502/504 after retries fails the stream instead of being skipped with the sync still reported as successful |
| 2.4.1 | 2026-09-15 | [86032](https://github.com/airbytehq/airbyte/pull/86032) | Update dependencies |
| 2.4.0 | 2026-09-09 | [85786](https://github.com/airbytehq/airbyte/pull/85786) | Declarative migration Steps 5 and 6 - move the events, pull_requests, commit_comments, issue_milestones, stargazers, projects, issue_events, deployments, workflows, comments, issues and review_comments streams to the manifest. Each incremental sync of these streams now re-emits the one record per repository whose cursor equals the previous sync's cursor, `pull_requests` fills `base.repo_id` (always null before) and always lists newest-first, `issues` checkpoints once per repository instead of once per page, and a repository that keeps returning 502/504 after retries fails the stream instead of being skipped with the sync still reported as successful |
| 2.3.0 | 2026-09-08 | [85746](https://github.com/airbytehq/airbyte/pull/85746) | Declarative migration Steps 3 and 4 - move the assignees, branches, collaborators, issue_labels, tags, organizations, teams and users streams to the manifest. For these eight streams, a repository or organization that keeps returning 502/504 after retries now fails the stream instead of being skipped with the sync still reported as successful, and a failed attempt restarts the stream instead of resuming from the repository or organization it stopped at. Also fixes a 2.2.0 regression where a `403` on one listed repository (SAML-protected organizations, most often) failed the sync instead of skipping that repository and syncing the rest |
| 2.2.3 | 2026-09-08 | [85494](https://github.com/airbytehq/airbyte/pull/85494) | Update dependencies |
| 2.2.2 | 2026-09-01 | [85253](https://github.com/airbytehq/airbyte/pull/85253) | Fix syncs hanging until the platform heartbeat timeout when a wildcard repository entry (`owner/*`) names a user account instead of an organization: the org-scoped streams no longer receive an unverified login, and a skipped stream slice can no longer be retried indefinitely |
| 2.2.1 | 2026-09-01 | [85244](https://github.com/airbytehq/airbyte/pull/85244) | Update dependencies |
| 2.2.0 | 2026-08-27 | [81428](https://github.com/airbytehq/airbyte/pull/81428) | Declarative migration Step 2 - multi-token auth shared by all streams (now rotates off a rate-limited token instead of waiting for its reset), spec in manifest, declarative Repositories stream, new optional `num_workers` setting for concurrent partition reads, a request budget matching GitHub's 900-points/minute secondary rate limit, Max Waiting Time now bounding every rate-limit wait so Test connection fails fast instead of sleeping until the reset, and support for GitHub Enterprise Server instances with rate limiting disabled |
| 2.1.42 | 2026-08-25 | [85011](https://github.com/airbytehq/airbyte/pull/85011) | Update dependencies |
| 2.1.41 | 2026-08-18 | [84569](https://github.com/airbytehq/airbyte/pull/84569) | Update dependencies |
| 2.1.40 | 2026-08-11 | [83943](https://github.com/airbytehq/airbyte/pull/83943) | Update dependencies |
| 2.1.39 | 2026-08-04 | [83469](https://github.com/airbytehq/airbyte/pull/83469) | Update dependencies |
| 2.1.38 | 2026-07-28 | [82893](https://github.com/airbytehq/airbyte/pull/82893) | Update dependencies |
| 2.1.37 | 2026-07-21 | [81799](https://github.com/airbytehq/airbyte/pull/81799) | Update dependencies |
| 2.1.36 | 2026-07-14 | [82093](https://github.com/airbytehq/airbyte/pull/82093) | Promoted release candidate to GA |
| 2.1.36-rc.1 | 2026-07-08 | [80133](https://github.com/airbytehq/airbyte/pull/80133) | Switch base class from AbstractSource to YamlDeclarativeSource (Step 1 of declarative migration) |
| 2.1.35 | 2026-07-07 | [81440](https://github.com/airbytehq/airbyte/pull/81440) | Update dependencies |
| 2.1.34 | 2026-06-30 | [81084](https://github.com/airbytehq/airbyte/pull/81084) | Update dependencies |
| 2.1.33 | 2026-06-23 | [80440](https://github.com/airbytehq/airbyte/pull/80440) | Update dependencies |
| 2.1.32 | 2026-06-16 | [79802](https://github.com/airbytehq/airbyte/pull/79802) | Update dependencies |
| 2.1.31 | 2026-06-08 | [79196](https://github.com/airbytehq/airbyte/pull/79196) | Upgrade cryptography from 44.0.3 to 46.0.7 to resolve CVE-2026-26007 |
| 2.1.30 | 2026-06-09 | [79312](https://github.com/airbytehq/airbyte/pull/79312) | Update dependencies |
| 2.1.29 | 2026-06-02 | [78702](https://github.com/airbytehq/airbyte/pull/78702) | Update dependencies |
| 2.1.28 | 2026-05-07 | [77847](https://github.com/airbytehq/airbyte/pull/77847) | Reduce GraphQL `releases` query cost (mark as large stream), bound page-size halving at 1, and improve 504 Gateway Timeout error messages |
| 2.1.27 | 2026-05-02 | [77685](https://github.com/airbytehq/airbyte/pull/77685) | Make `parse_response` and error-handler helpers defensive against unexpected response shapes (HTML error pages, malformed JSON, missing keys) |
| 2.1.26 | 2026-05-02 | [77681](https://github.com/airbytehq/airbyte/pull/77681) | Treat 410 "Issues/Projects disabled" responses as skip-the-slice instead of failing the stream |
| 2.1.25 | 2026-05-01 | [77690](https://github.com/airbytehq/airbyte/pull/77690) | Replaced placeholder and raw-passthrough error messages with actionable text including HTTP status codes, affected resources, and likely causes |
| 2.1.24 | 2026-04-28 | [77238](https://github.com/airbytehq/airbyte/pull/77238) | Update dependencies |
| 2.1.23 | 2026-04-22 | [76922](https://github.com/airbytehq/airbyte/pull/76922) | Handle `None` response in `read_records` error handler so transport-layer failures (connection errors, timeouts) surface as transient errors instead of `AttributeError` |
| 2.1.22 | 2026-04-22 | [74758](https://github.com/airbytehq/airbyte/pull/74758) | Fix rate limit sleep blocking heartbeat; classify rate limit errors as transient; increase default max_waiting_time to 120 minutes to cover GitHub's hourly rate limit window |
| 2.1.21 | 2026-04-21 | [74586](https://github.com/airbytehq/airbyte/pull/74586) | Update dependencies |
| 2.1.20 | 2026-04-15 | [76275](https://github.com/airbytehq/airbyte/pull/76275) | Bump airbyte-cdk to >=7.12.0 to fix OAuth `scope=null` in consent URL |
| 2.1.19 | 2026-04-08 | [76090](https://github.com/airbytehq/airbyte/pull/76090) | Fix 403 permission errors misclassified as retryable, causing infinite retry loops |
| 2.1.18 | 2026-04-07 | [76124](https://github.com/airbytehq/airbyte/pull/76124) | Fix silent error swallowing in exception handlers for ContributorActivity, GithubStreamABC, and Releases streams |
| 2.1.17 | 2026-04-07 | [76080](https://github.com/airbytehq/airbyte/pull/76080) | Fix remaining NameError references to removed MessageRepresentationAirbyteTracedErrors in ContributorActivity stream |
| 2.1.16 | 2026-04-03 | [76038](https://github.com/airbytehq/airbyte/pull/76038) | Replace deprecated MessageRepresentationAirbyteTracedErrors with AirbyteTracedException |
| 2.1.15 | 2026-03-27 | [75508](https://github.com/airbytehq/airbyte/pull/75508) | Add declarative OAuth with `oauth_connector_input_specification` and granular scopes |
| 2.1.14 | 2026-03-09 | [74284](https://github.com/airbytehq/airbyte/pull/74284) | Fix heartbeat timeout for pull_request_stats by using descending sort on incremental syncs |
| 2.1.13 | 2026-03-03 | [73698](https://github.com/airbytehq/airbyte/pull/73698) | feat(source-github): use GraphQL API for Releases stream to bypass 10k REST limit |
| 2.1.12 | 2026-03-03 | [74204](https://github.com/airbytehq/airbyte/pull/74204) | Update dependencies |
| 2.1.11 | 2026-02-24 | [73785](https://github.com/airbytehq/airbyte/pull/73785) | Update dependencies |
| 2.1.10 | 2026-02-10 | [73061](https://github.com/airbytehq/airbyte/pull/73061) | Update dependencies |
| 2.1.9 | 2026-01-27 | [72375](https://github.com/airbytehq/airbyte/pull/72375) | Update dependencies |
| 2.1.8 | 2026-01-20 | [71986](https://github.com/airbytehq/airbyte/pull/71986) | Update dependencies |
| 2.1.7 | 2026-01-14 | [71400](https://github.com/airbytehq/airbyte/pull/71400) | Update dependencies |
| 2.1.6 | 2025-12-18 | [70729](https://github.com/airbytehq/airbyte/pull/70729) | Update dependencies |
| 2.1.5 | 2025-12-02 | [70286](https://github.com/airbytehq/airbyte/pull/70286) | Update dependencies |
| 2.1.4 | 2025-11-25 | [69887](https://github.com/airbytehq/airbyte/pull/69887) | Update dependencies |
| 2.1.3 | 2025-11-18 | [69421](https://github.com/airbytehq/airbyte/pull/69421) | Update dependencies |
| 2.1.2 | 2025-11-11 | [69271](https://github.com/airbytehq/airbyte/pull/69271) | Update dependencies |
| 2.1.1 | 2025-11-04 | [69002](https://github.com/airbytehq/airbyte/pull/69002) | Update dependencies |
| 2.1.0 | 2025-10-29 | [68637](https://github.com/airbytehq/airbyte/pull/68637) | Update dependencies |
| 2.0.0 | 2025-10-22 | [68095](https://github.com/airbytehq/airbyte/pull/68095) | **Breaking Change**: Renames `+1` and `-1` fields to `plus_one` and `minus_one` respectively. |
| 1.9.2 | 2025-10-21 | [68332](https://github.com/airbytehq/airbyte/pull/68332) | Update dependencies |
| 1.9.1 | 2025-10-20 | [68197](https://github.com/airbytehq/airbyte/pull/68197) | Promoting release candidate 1.9.1-rc.1 to a main version. |
| 1.9.1-rc.1 | 2025-10-13 | [67584](https://github.com/airbytehq/airbyte/pull/67584) | Graceful error handling of invalid credentials when running operations |
| 1.9.0 | 2025-10-13 | [67708](https://github.com/airbytehq/airbyte/pull/67708) | Promoting release candidate 1.9.0-rc.3 to a main version. |
| 1.9.0-rc.3 | 2025-10-09 | [67589](https://github.com/airbytehq/airbyte/pull/67589) | Fix min time to wait on token rate limits |
| 1.9.0-rc.2 | 2025-10-03 | [67026](https://github.com/airbytehq/airbyte/pull/67026) | Fix converting datetime in workflows stream |
| 1.9.0-rc.1 | 2025-10-02 | [66736](https://github.com/airbytehq/airbyte/pull/66736) | Update to airbyte-cdk v^7 |
| 1.8.42 | 2025-09-30 | [66166](https://github.com/airbytehq/airbyte/pull/66166) | Update dependencies |
| 1.8.41 | 2025-09-09 | [66065](https://github.com/airbytehq/airbyte/pull/66065) | Update dependencies |
| 1.8.40 | 2025-08-23 | [65375](https://github.com/airbytehq/airbyte/pull/65375) | Update dependencies |
| 1.8.39 | 2025-08-16 | [64982](https://github.com/airbytehq/airbyte/pull/64982) | Update dependencies |
| 1.8.38 | 2025-08-09 | [64580](https://github.com/airbytehq/airbyte/pull/64580) | Update dependencies |
| 1.8.37 | 2025-08-02 | [64231](https://github.com/airbytehq/airbyte/pull/64231) | Update dependencies |
| 1.8.36 | 2025-07-26 | [63810](https://github.com/airbytehq/airbyte/pull/63810) | Update dependencies |
| 1.8.35 | 2025-07-19 | [63520](https://github.com/airbytehq/airbyte/pull/63520) | Update dependencies |
| 1.8.34 | 2025-07-12 | [63158](https://github.com/airbytehq/airbyte/pull/63158) | Update dependencies |
| 1.8.33 | 2025-07-05 | [62666](https://github.com/airbytehq/airbyte/pull/62666) | Update dependencies |
| 1.8.32 | 2025-06-28 | [62166](https://github.com/airbytehq/airbyte/pull/62166) | Update dependencies |
| 1.8.31 | 2025-06-25 | [62054](https://github.com/airbytehq/airbyte/pull/62054) | Fix problem with `contributor_activity` stream when author is not present/none |
| 1.8.30 | 2025-06-23 | [61742](https://github.com/airbytehq/airbyte/pull/61742) | Handle conflict when empty repositories, we will ignore |
| 1.8.29 | 2025-06-21 | [61857](https://github.com/airbytehq/airbyte/pull/61857) | Update dependencies |
| 1.8.28 | 2025-06-15 | [61603](https://github.com/airbytehq/airbyte/pull/61603) | Update dependencies |
| 1.8.27 | 2025-06-07 | [54931](https://github.com/airbytehq/airbyte/pull/54931) | Update dependencies |
| 1.8.26 | 2025-02-22 | [54404](https://github.com/airbytehq/airbyte/pull/54404) | Update dependencies |
| 1.8.25 | 2025-02-15 | [53703](https://github.com/airbytehq/airbyte/pull/53703) | Update dependencies |
| 1.8.24 | 2025-02-01 | [52875](https://github.com/airbytehq/airbyte/pull/52875) | Update dependencies |
| 1.8.23 | 2025-01-25 | [52364](https://github.com/airbytehq/airbyte/pull/52364) | Update dependencies |
| 1.8.22 | 2025-01-18 | [51666](https://github.com/airbytehq/airbyte/pull/51666) | Update dependencies |
| 1.8.21 | 2025-01-11 | [51130](https://github.com/airbytehq/airbyte/pull/51130) | Update dependencies |
| 1.8.20 | 2025-01-04 | [50517](https://github.com/airbytehq/airbyte/pull/50517) | Update dependencies |
| 1.8.19 | 2024-12-21 | [50055](https://github.com/airbytehq/airbyte/pull/50055) | Update dependencies |
| 1.8.18 | 2024-12-14 | [49178](https://github.com/airbytehq/airbyte/pull/49178) | Update dependencies |
| 1.8.17 | 2024-11-25 | [48631](https://github.com/airbytehq/airbyte/pull/48631) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 1.8.16 | 2024-11-05 | [48318](https://github.com/airbytehq/airbyte/pull/48318) | Update dependencies |
| 1.8.15 | 2024-10-28 | [47051](https://github.com/airbytehq/airbyte/pull/47051) | Update dependencies |
| 1.8.14 | 2024-10-12 | [46766](https://github.com/airbytehq/airbyte/pull/46766) | Update dependencies |
| 1.8.13 | 2024-10-05 | [46415](https://github.com/airbytehq/airbyte/pull/46415) | Update dependencies |
| 1.8.12 | 2024-09-28 | [46117](https://github.com/airbytehq/airbyte/pull/46117) | Update dependencies |
| 1.8.11 | 2024-09-21 | [45742](https://github.com/airbytehq/airbyte/pull/45742) | Update dependencies |
| 1.8.10 | 2024-09-14 | [45557](https://github.com/airbytehq/airbyte/pull/45557) | Update dependencies |
| 1.8.9 | 2024-09-07 | [45320](https://github.com/airbytehq/airbyte/pull/45320) | Update dependencies |
| 1.8.8 | 2024-08-23 | [44592](https://github.com/airbytehq/airbyte/pull/44592) | Fix state handling for stream WorkflowRuns |
| 1.8.7 | 2024-08-31 | [45061](https://github.com/airbytehq/airbyte/pull/45061) | Update dependencies |
| 1.8.6 | 2024-08-24 | [44703](https://github.com/airbytehq/airbyte/pull/44703) | Update dependencies |
| 1.8.5 | 2024-08-17 | [44227](https://github.com/airbytehq/airbyte/pull/44227) | Update dependencies |
| 1.8.4 | 2024-08-12 | [43749](https://github.com/airbytehq/airbyte/pull/43749) | Update dependencies |
| 1.8.3 | 2024-08-10 | [42671](https://github.com/airbytehq/airbyte/pull/42671) | Update dependencies |
| 1.8.2 | 2024-08-20 | [42966](https://github.com/airbytehq/airbyte/pull/42966) | Bump cdk version and enable RFR for all non-incremental streams |
| 1.8.1 | 2024-07-20 | [42342](https://github.com/airbytehq/airbyte/pull/42342) | Update dependencies |
| 1.8.0 | 2024-07-16 | [41677](https://github.com/airbytehq/airbyte/pull/41677) | Update to 3.4.0 CDK |
| 1.7.13 | 2024-07-13 | [41746](https://github.com/airbytehq/airbyte/pull/41746) | Update dependencies |
| 1.7.12 | 2024-07-10 | [41354](https://github.com/airbytehq/airbyte/pull/41354) | Update dependencies |
| 1.7.11 | 2024-07-09 | [41221](https://github.com/airbytehq/airbyte/pull/41221) | Update dependencies |
| 1.7.10 | 2024-07-06 | [41000](https://github.com/airbytehq/airbyte/pull/41000) | Update dependencies |
| 1.7.9 | 2024-06-25 | [40289](https://github.com/airbytehq/airbyte/pull/40289) | Update dependencies |
| 1.7.8 | 2024-06-22 | [40128](https://github.com/airbytehq/airbyte/pull/40128) | Update dependencies |
| 1.7.7 | 2024-06-17 | [39513](https://github.com/airbytehq/airbyte/pull/39513) | Update deprecated state handling method |
| 1.7.6 | 2024-06-04 | [39078](https://github.com/airbytehq/airbyte/pull/39078) | [autopull] Upgrade base image to v1.2.1 |
| 1.7.5 | 2024-05-29 | [38341](https://github.com/airbytehq/airbyte/pull/38341) | Add `max_waiting_time` to configuration |
| 1.7.4 | 2024-05-21 | [38341](https://github.com/airbytehq/airbyte/pull/38341) | Update CDK authenticator package |
| 1.7.3 | 2024-05-20 | [38299](https://github.com/airbytehq/airbyte/pull/38299) | Fixed spec typo |
| 1.7.2 | 2024-04-19 | [36636](https://github.com/airbytehq/airbyte/pull/36636) | Updating to 0.80.0 CDK |
| 1.7.1 | 2024-04-12 | [36636](https://github.com/airbytehq/airbyte/pull/36636) | schema descriptions |
| 1.7.0 | 2024-03-19 | [36267](https://github.com/airbytehq/airbyte/pull/36267) | Pin airbyte-cdk version to `^0` |
| 1.6.5 | 2024-03-12 | [35986](https://github.com/airbytehq/airbyte/pull/35986) | Handle rate limit exception as config error |
| 1.6.4 | 2024-03-08 | [35915](https://github.com/airbytehq/airbyte/pull/35915) | Fix per stream error handler; Make use the latest CDK version |
| 1.6.3 | 2024-02-15 | [35271](https://github.com/airbytehq/airbyte/pull/35271) | Update branches schema |
| 1.6.2 | 2024-02-12 | [34933](https://github.com/airbytehq/airbyte/pull/34933) | Update Airbyte CDK for integration tests |
| 1.6.1 | 2024-02-09 | [35087](https://github.com/airbytehq/airbyte/pull/35087) | Manage dependencies with Poetry. |
| 1.6.0 | 2024-02-02 | [34700](https://github.com/airbytehq/airbyte/pull/34700) | Continue Sync on Stream failure |
| 1.5.7 | 2024-01-29 | [34598](https://github.com/airbytehq/airbyte/pull/34598) | Fix MultipleToken sleep time |
| 1.5.6 | 2024-01-26 | [34503](https://github.com/airbytehq/airbyte/pull/34503) | Fix MultipleToken rotation logic |
| 1.5.5 | 2023-12-26 | [33783](https://github.com/airbytehq/airbyte/pull/33783) | Fix retry for 504 error in GraphQL based streams |
| 1.5.4 | 2023-11-20 | [32679](https://github.com/airbytehq/airbyte/pull/32679) | Return AirbyteMessage if max retry exeeded for 202 status code |
| 1.5.3 | 2023-10-23 | [31702](https://github.com/airbytehq/airbyte/pull/31702) | Base image migration: remove Dockerfile and use the python-connector-base image |
| 1.5.2 | 2023-10-13 | [31386](https://github.com/airbytehq/airbyte/pull/31386) | Handle `ContributorActivity` continuous `ACCEPTED` response |
| 1.5.1 | 2023-10-12 | [31307](https://github.com/airbytehq/airbyte/pull/31307) | Increase backoff_time for stream `ContributorActivity` |
| 1.5.0 | 2023-10-11 | [31300](https://github.com/airbytehq/airbyte/pull/31300) | Update Schemas: Add date-time format to fields |
| 1.4.6 | 2023-10-04 | [31056](https://github.com/airbytehq/airbyte/pull/31056) | Migrate spec properties' `repository` and `branch` type to \<array\> |
| 1.4.5 | 2023-10-02 | [31023](https://github.com/airbytehq/airbyte/pull/31023) | Increase backoff for stream `Contributor Activity` |
| 1.4.4 | 2023-10-02 | [30971](https://github.com/airbytehq/airbyte/pull/30971) | Mark `start_date` as optional. |
| 1.4.3 | 2023-10-02 | [30979](https://github.com/airbytehq/airbyte/pull/30979) | Fetch archived records in `Project Cards` |
| 1.4.2 | 2023-09-30 | [30927](https://github.com/airbytehq/airbyte/pull/30927) | Provide actionable user error messages |
| 1.4.1 | 2023-09-30 | [30839](https://github.com/airbytehq/airbyte/pull/30839) | Update CDK to Latest version |
| 1.4.0 | 2023-09-29 | [30823](https://github.com/airbytehq/airbyte/pull/30823) | Add new stream `issue Timeline Events` |
| 1.3.1 | 2023-09-28 | [30824](https://github.com/airbytehq/airbyte/pull/30824) | Handle empty response in stream `ContributorActivity` |
| 1.3.0 | 2023-09-25 | [30731](https://github.com/airbytehq/airbyte/pull/30731) | Add new stream `ProjectsV2` |
| 1.2.1 | 2023-09-22 | [30693](https://github.com/airbytehq/airbyte/pull/30693) | Handle 404 error in `TeamMemberShips` |
| 1.2.0 | 2023-09-22 | [30647](https://github.com/airbytehq/airbyte/pull/30647) | Add support for self-hosted GitHub instances |
| 1.1.1 | 2023-09-21 | [30654](https://github.com/airbytehq/airbyte/pull/30654) | Rewrite source connection error messages |
| 1.1.0 | 2023-08-03 | [30615](https://github.com/airbytehq/airbyte/pull/30615) | Add new stream `Contributor Activity` |
| 1.0.4 | 2023-08-03 | [29031](https://github.com/airbytehq/airbyte/pull/29031) | Reverted `advancedAuth` spec changes |
| 1.0.3 | 2023-08-01 | [28910](https://github.com/airbytehq/airbyte/pull/28910) | Updated `advancedAuth` broken references |
| 1.0.2 | 2023-07-11 | [28144](https://github.com/airbytehq/airbyte/pull/28144) | Add `archived_at` property to `Organizations` schema parameter |
| 1.0.1 | 2023-05-22 | [25838](https://github.com/airbytehq/airbyte/pull/25838) | Deprecate "page size" input parameter |
| 1.0.0 | 2023-05-19 | [25778](https://github.com/airbytehq/airbyte/pull/25778) | Improve repo(s) name validation on UI |
| 0.5.0 | 2023-05-16 | [25793](https://github.com/airbytehq/airbyte/pull/25793) | Implement client-side throttling of requests |
| 0.4.11 | 2023-05-12 | [26025](https://github.com/airbytehq/airbyte/pull/26025) | Added more transparent depiction of the personal access token expired |
| 0.4.10 | 2023-05-15 | [26075](https://github.com/airbytehq/airbyte/pull/26075) | Add more specific error message description for no repos case. |
| 0.4.9 | 2023-05-01 | [24523](https://github.com/airbytehq/airbyte/pull/24523) | Add undeclared columns to spec |
| 0.4.8 | 2023-04-19 | [25312](https://github.com/airbytehq/airbyte/pull/25312) | Fix repo name validation |
| 0.4.7 | 2023-03-24 | [24457](https://github.com/airbytehq/airbyte/pull/24457) | Add validation and transformation for repositories config |
| 0.4.6 | 2023-03-24 | [24398](https://github.com/airbytehq/airbyte/pull/24398) | Fix caching for `get_starting_point` in stream "Commits" |
| 0.4.5 | 2023-03-23 | [24417](https://github.com/airbytehq/airbyte/pull/24417) | Add pattern_descriptors to fields with an expected format |
| 0.4.4 | 2023-03-17 | [24255](https://github.com/airbytehq/airbyte/pull/24255) | Add field groups and titles to improve display of connector setup form |
| 0.4.3 | 2023-03-04 | [22993](https://github.com/airbytehq/airbyte/pull/22993) | Specified date formatting in specification |
| 0.4.2 | 2023-03-03 | [23467](https://github.com/airbytehq/airbyte/pull/23467) | Added user friendly messages, added AirbyteTracedException config_error, updated SAT |
| 0.4.1 | 2023-01-27 | [22039](https://github.com/airbytehq/airbyte/pull/22039) | Set `AvailabilityStrategy` for streams explicitly to `None` |
| 0.4.0 | 2023-01-20 | [21457](https://github.com/airbytehq/airbyte/pull/21457) | Use GraphQL for `issue_reactions` stream |
| 0.3.12 | 2023-01-18 | [21481](https://github.com/airbytehq/airbyte/pull/21481) | Handle 502 Bad Gateway error with proper log message |
| 0.3.11 | 2023-01-06 | [21084](https://github.com/airbytehq/airbyte/pull/21084) | Raise Error if no organizations or repos are available during read |
| 0.3.10 | 2022-12-15 | [20523](https://github.com/airbytehq/airbyte/pull/20523) | Revert changes from 0.3.9 |
| 0.3.9 | 2022-12-14 | [19978](https://github.com/airbytehq/airbyte/pull/19978) | Update CDK dependency; move custom HTTPError handling into `AvailabilityStrategy` classes |
| 0.3.8 | 2022-11-10 | [19299](https://github.com/airbytehq/airbyte/pull/19299) | Fix events and workflow_runs datetimes |
| 0.3.7 | 2022-10-20 | [18213](https://github.com/airbytehq/airbyte/pull/18213) | Skip retry on HTTP 200 |
| 0.3.6 | 2022-10-11 | [17852](https://github.com/airbytehq/airbyte/pull/17852) | Use default behaviour, retry on 429 and all 5XX errors |
| 0.3.5 | 2022-10-07 | [17715](https://github.com/airbytehq/airbyte/pull/17715) | Improve 502 handling for `comments` stream |
| 0.3.4 | 2022-10-04 | [17555](https://github.com/airbytehq/airbyte/pull/17555) | Skip repository if got HTTP 500 for WorkflowRuns stream |
| 0.3.3 | 2022-09-28 | [17287](https://github.com/airbytehq/airbyte/pull/17287) | Fix problem with "null" `cursor_field` for WorkflowJobs stream |
| 0.3.2 | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/pull/17304) | Migrate to per-stream state. |
| 0.3.1 | 2022-09-21 | [16947](https://github.com/airbytehq/airbyte/pull/16947) | Improve error logging when handling HTTP 500 error |
| 0.3.0 | 2022-09-09 | [16534](https://github.com/airbytehq/airbyte/pull/16534) | Add new stream `WorkflowJobs` |
| 0.2.46 | 2022-08-17 | [15730](https://github.com/airbytehq/airbyte/pull/15730) | Validate input organizations and repositories |
| 0.2.45 | 2022-08-11 | [15420](https://github.com/airbytehq/airbyte/pull/15420) | "User" object can be "null" |
| 0.2.44 | 2022-08-01 | [14795](https://github.com/airbytehq/airbyte/pull/14795) | Use GraphQL for `pull_request_comment_reactions` stream |
| 0.2.43 | 2022-07-26 | [15049](https://github.com/airbytehq/airbyte/pull/15049) | Bugfix schemas for streams `deployments`, `workflow_runs`, `teams` |
| 0.2.42 | 2022-07-12 | [14613](https://github.com/airbytehq/airbyte/pull/14613) | Improve schema for stream `pull_request_commits` added "null" |
| 0.2.41 | 2022-07-03 | [14376](https://github.com/airbytehq/airbyte/pull/14376) | Add Retry for GraphQL API Resource limitations |
| 0.2.40 | 2022-07-01 | [14338](https://github.com/airbytehq/airbyte/pull/14338) | Revert: "Rename field `mergeable` to `is_mergeable`" |
| 0.2.39 | 2022-06-30 | [14274](https://github.com/airbytehq/airbyte/pull/14274) | Rename field `mergeable` to `is_mergeable` |
| 0.2.38 | 2022-06-27 | [13989](https://github.com/airbytehq/airbyte/pull/13989) | Use GraphQL for `reviews` stream |
| 0.2.37 | 2022-06-21 | [13955](https://github.com/airbytehq/airbyte/pull/13955) | Fix "secondary rate limit" not retrying |
| 0.2.36 | 2022-06-20 | [13926](https://github.com/airbytehq/airbyte/pull/13926) | Break point added for `workflows_runs` stream |
| 0.2.35 | 2022-06-16 | [13763](https://github.com/airbytehq/airbyte/pull/13763) | Use GraphQL for `pull_request_stats` stream |
| 0.2.34 | 2022-06-14 | [13707](https://github.com/airbytehq/airbyte/pull/13707) | Fix API sorting, fix `get_starting_point` caching |
| 0.2.33 | 2022-06-08 | [13558](https://github.com/airbytehq/airbyte/pull/13558) | Enable caching only for parent streams |
| 0.2.32 | 2022-06-07 | [13531](https://github.com/airbytehq/airbyte/pull/13531) | Fix different result from `get_starting_point` when reading by pages |
| 0.2.31 | 2022-05-24 | [13115](https://github.com/airbytehq/airbyte/pull/13115) | Add incremental support for streams `WorkflowRuns` |
| 0.2.30 | 2022-05-09 | [12294](https://github.com/airbytehq/airbyte/pull/12294) | Add incremental support for streams `CommitCommentReactions`, `IssueCommentReactions`, `IssueReactions`, `PullRequestCommentReactions`, `Repositories`, `Workflows` |
| 0.2.29 | 2022-05-04 | [12482](https://github.com/airbytehq/airbyte/pull/12482) | Update input configuration copy |
| 0.2.28 | 2022-04-21 | [11893](https://github.com/airbytehq/airbyte/pull/11893) | Add new streams `TeamMembers`, `TeamMemberships` |
| 0.2.27 | 2022-04-02 | [11678](https://github.com/airbytehq/airbyte/pull/11678) | Fix "PAT Credentials" in spec |
| 0.2.26 | 2022-03-31 | [11623](https://github.com/airbytehq/airbyte/pull/11623) | Re-factored incremental sync for `Reviews` stream |
| 0.2.25 | 2022-03-31 | [11567](https://github.com/airbytehq/airbyte/pull/11567) | Improve code for better error handling |
| 0.2.24 | 2022-03-30 | [9251](https://github.com/airbytehq/airbyte/pull/9251) | Add Streams Workflow and WorkflowRuns |
| 0.2.23 | 2022-03-17 | [11212](https://github.com/airbytehq/airbyte/pull/11212) | Improve documentation and spec for Beta |
| 0.2.22 | 2022-03-10 | [10878](https://github.com/airbytehq/airbyte/pull/10878) | Fix error handling for unavailable streams with 404 status code |
| 0.2.21 | 2022-03-04 | [10749](https://github.com/airbytehq/airbyte/pull/10749) | Add new stream `ProjectCards` |
| 0.2.20 | 2022-02-16 | [10385](https://github.com/airbytehq/airbyte/pull/10385) | Add new stream `Deployments`, `ProjectColumns`, `PullRequestCommits` |
| 0.2.19 | 2022-02-07 | [10211](https://github.com/airbytehq/airbyte/pull/10211) | Add human-readable error in case of incorrect organization or repo name |
| 0.2.18 | 2021-02-09 | [10193](https://github.com/airbytehq/airbyte/pull/10193) | Add handling secondary rate limits |
| 0.2.17 | 2021-02-02 | [9999](https://github.com/airbytehq/airbyte/pull/9999) | Remove BAD_GATEWAY code from backoff_time |
| 0.2.16 | 2021-02-02 | [9868](https://github.com/airbytehq/airbyte/pull/9868) | Add log message for streams that are restricted for OAuth. Update oauth scopes. |
| 0.2.15 | 2021-01-26 | [9802](https://github.com/airbytehq/airbyte/pull/9802) | Add missing fields for auto_merge in pull request stream |
| 0.2.14 | 2021-01-21 | [9664](https://github.com/airbytehq/airbyte/pull/9664) | Add custom pagination size for large streams |
| 0.2.13 | 2021-01-20 | [9619](https://github.com/airbytehq/airbyte/pull/9619) | Fix logging for function `should_retry` |
| 0.2.11 | 2021-01-17 | [9492](https://github.com/airbytehq/airbyte/pull/9492) | Remove optional parameter `Accept` for reaction`s streams to fix error with 502 HTTP status code in response |
| 0.2.10 | 2021-01-03 | [7250](https://github.com/airbytehq/airbyte/pull/7250) | Use CDK caching and convert PR-related streams to incremental |
| 0.2.9 | 2021-12-29 | [9179](https://github.com/airbytehq/airbyte/pull/9179) | Use default retry delays on server error responses |
| 0.2.8 | 2021-12-07 | [8524](https://github.com/airbytehq/airbyte/pull/8524) | Update connector fields title/description |
| 0.2.7 | 2021-12-06 | [8518](https://github.com/airbytehq/airbyte/pull/8518) | Add connection retry with GitHub |
| 0.2.6 | 2021-11-24 | [8030](https://github.com/airbytehq/airbyte/pull/8030) | Support start date property for PullRequestStats and Reviews streams |
| 0.2.5 | 2021-11-21 | [8170](https://github.com/airbytehq/airbyte/pull/8170) | Fix slow check connection for organizations with a lot of repos |
| 0.2.4 | 2021-11-11 | [7856](https://github.com/airbytehq/airbyte/pull/7856) | Resolve $ref fields in some stream schemas |
| 0.2.3 | 2021-10-06 | [6833](https://github.com/airbytehq/airbyte/pull/6833) | Fix config backward compatability |
| 0.2.2 | 2021-10-05 | [6761](https://github.com/airbytehq/airbyte/pull/6761) | Add oauth worflow specification |
| 0.2.1 | 2021-09-22 | [6223](https://github.com/airbytehq/airbyte/pull/6223) | Add option to pull commits from user-specified branches |
| 0.2.0      | 2021-09-19 | [5898](https://github.com/airbytehq/airbyte/pull/5898) and [6227](https://github.com/airbytehq/airbyte/pull/6227) | Don't minimize any output fields & add better error handling                                                                                                           |
| 0.1.11     | 2021-09-15 | [5949](https://github.com/airbytehq/airbyte/pull/5949)                                                            | Add caching for all streams                                                                                                                                            |
| 0.1.10     | 2021-09-09 | [5860](https://github.com/airbytehq/airbyte/pull/5860)                                                            | Add reaction streams                                                                                                                                                   |
| 0.1.9      | 2021-09-02 | [5788](https://github.com/airbytehq/airbyte/pull/5788)                                                            | Handling empty repository, check method using RepositoryStats stream                                                                                                   |
| 0.1.8      | 2021-09-01 | [5757](https://github.com/airbytehq/airbyte/pull/5757)                                                            | Add more streams                                                                                                                                                       |
| 0.1.7      | 2021-08-27 | [5696](https://github.com/airbytehq/airbyte/pull/5696)                                                            | Handle negative backoff values                                                                                                                                         |
| 0.1.6      | 2021-08-18 | [5223](https://github.com/airbytehq/airbyte/pull/5223)                                                            | Add MultipleTokenAuthenticator                                                                                                                                         |
| 0.1.5      | 2021-08-18 | [5456](https://github.com/airbytehq/airbyte/pull/5456)                                                            | Fix set up validation                                                                                                                                                  |
| 0.1.4      | 2021-08-13 | [5136](https://github.com/airbytehq/airbyte/pull/5136)                                                            | Support syncing multiple repositories/organizations                                                                                                                    |
| 0.1.3      | 2021-08-03 | [5156](https://github.com/airbytehq/airbyte/pull/5156)                                                            | Extended existing schemas with `users` property for certain streams                                                                                                    |
| 0.1.2      | 2021-07-13 | [4708](https://github.com/airbytehq/airbyte/pull/4708)                                                            | Fix bug with IssueEvents stream and add handling for rate limiting                                                                                                     |
| 0.1.1      | 2021-07-07 | [4590](https://github.com/airbytehq/airbyte/pull/4590)                                                            | Fix schema in the `pull_request` stream                                                                                                                                |
| 0.1.0      | 2021-07-06 | [4174](https://github.com/airbytehq/airbyte/pull/4174)                                                            | New Source: GitHub                                                                                                                                                     |

</details>

</HideInUI>
