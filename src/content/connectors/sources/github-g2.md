---
generated_record: true
connector_name: GitHub (Experimental, Gen 2)
connector_type: source
connector_slug: github-g2
connector_directory: source-github-g2
definition_id: 1b271d53-df7e-4d37-9951-974a3b4c8981
version: 0.2.3
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/github-g2
logo: /images/connectors/sources/github-g2.svg
logo_source_path: airbyte-integrations/connectors/source-github-g2/icon.svg
logo_sha256: 989aa2dcf35b07ac17a894eebe38c00b7f6950f75d5c8ddf4be7a66427b55f0b
original_metadata_path: airbyte-integrations/connectors/source-github-g2/metadata.yaml
original_metadata_sha256: 60ed09f3871e3c28f46c4d023a6fedab9ade6f950275409e05a34609220a7161
original_document_path: docs/integrations/sources/github-g2.md
original_document_sha256: 988b80c83ec465500c2648cb3fdac539749eaa6455c98d198cadd5895a22a411
rewrite_status: review
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 9a940b22b40da75bce06cf7a183ebfcb66b1ac594a083ba7bda916b3926107be
rewritten_at: 2026-11-12T14:13:32.251443+00:00
---

# GitHub (Experimental, Gen 2)

:::warning Experimental connector
This experimental connector is for internal Airbyte use only. It isn't publicly listed and may be removed or merged into the main GitHub source.
:::

<HideInUI>

Use this page to set up the [GitHub (Experimental, Gen 2)](https://www.github.com) source connector and find reference information.

</HideInUI>

## Before you start

- A list of GitHub repositories, with access to any private repositories

<!-- env:cloud -->

**For Airbyte Cloud:**

- OAuth
- Personal Access Token (see [Permissions and scopes](https://docs.airbyte.com/integrations/sources/github-g2#permissions-and-scopes))
<!-- /env:cloud -->

<!-- env:oss -->

**For Airbyte Open Source:**

- Personal Access Token (see [Permissions and scopes](https://docs.airbyte.com/integrations/sources/github-g2#permissions-and-scopes))
<!-- /env:oss -->

## Set up the connector

### Step 1: Set up GitHub

Create a [GitHub Account](https://github.com).

<!-- env:oss -->

#### Additional Airbyte Open Source setup

Sign in to [GitHub](https://github.com), then generate a [personal access token](https://github.com/settings/tokens). To balance API quota use across multiple tokens, enter the tokens separated by `,`.

<!-- /env:oss -->

### Step 2: Set up GitHub in Airbyte

<!-- env:cloud -->

#### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Select Sources, then select + New source.
3. On the Set up the source page, select GitHub from the Source type dropdown.
4. Enter a name for the GitHub connector.
5. Choose how to authenticate:
   <!-- env:cloud -->

   - Select **For Airbyte Cloud:** **Authenticate your GitHub account** to authorise your GitHub account. Airbyte authenticates the GitHub account you're currently signed in to. Make sure you're signed in to the correct account.
   <!-- /env:cloud -->
   <!-- env:oss -->

   - **For Airbyte Open Source:** Authenticate with **Personal Access Token**. To create a personal access token, sign in to [GitHub](https://github.com) and generate a [personal access token](https://github.com/settings/tokens). Enter your GitHub personal access token. To balance API quota use across multiple tokens, enter the tokens separated by `,`.
   <!-- /env:oss -->

6. **GitHub Repositories** - Enter your GitHub repositories, for example `airbytehq/airbyte` for one repository or `airbytehq/airbyte airbytehq/another-repo` for multiple repositories. To receive data from every repository under one GitHub owner, use this format: `airbytehq/*`.

   :::caution
   Repositories are skipped if they don't exist, use the wrong name or have an invalid name format. The logs will show an `WARN` message.
   :::

7. **Start date (Optional)** - Enter the earliest date for replicating stream data. Supported streams only replicate data generated on or after this date.

   - These streams only sync records generated on or after the **Start Date**: `comments`, `commit_comment_reactions`, `commit_comments`, `commits`, `deployments`, `events`, `issue_comment_reactions`, `issue_events`, `issue_milestones`, `issue_reactions`, `issues`, `project_cards`, `project_columns`, `projects`, `pull_request_comment_reactions`, `pull_requests`, `pull_request_stats`, `releases`, `review_comments`, `reviews`, `stargazers`, `workflow_runs`, `workflows`.

   - The **Start Date** doesn't apply to these streams, so they sync all data: `assignees`, `branches`, `collaborators`, `issue_labels`, `organizations`, `pull_request_commits`, `repositories`, `tags`, `teams`, `users`

8. **Branch (Optional)** - Enter the GitHub repository branches to pull commits from, for example `airbytehq/airbyte/master`. If you don't specify branches for a repository, the connector pulls its default branch. For example, `airbytehq/airbyte/master airbytehq/airbyte/my-branch`.
9. **API URL (Optional)** - For a self-hosted GitHub instance, enter its API URL, for example `https://github.company.org`. Leave this empty to use `https://api.github.com/`.
10. **Max Waiting Time (in minutes) (Optional)** - Set how long the connector waits before failing when every configured API token is rate-limited. The default is 120 minutes. This covers GitHub's 60-minute rate limit reset window and provides additional time. You can enter any value from 1 to 240 minutes. With multiple personal access tokens, the connector rotates through each token before waiting. It waits only after exhausting every token.

11. **Number of Concurrent Threads (Optional)** - Set how many partitions the connector reads in parallel. The default is 4, and the maximum is 25. All streams use the declarative manifest. A higher value may speed up syncs but increases the risk of reaching GitHub's secondary rate limits.

### Airbyte Open Source

1. Open the Airbyte Open Source dashboard.
2. Select Sources, then select + New source.
3. On the Set up the source page, select GitHub from the Source type dropdown.
4. Enter a name for the GitHub connector.

## Output shape

Every stream emits flat records with deterministic scalar columns and scalar arrays. Embedded GitHub identities use prefixed identity columns. The connector uses child streams only when members require a separate API call. No current stream needs a child stream for an array available in its parent response. `events.payload` and `deployments.payload` remain opaque JSON fields under approved exemptions.

`workflow_jobs` keeps job-level `status`, `conclusion`, `started_at`, `completed_at` and `created_at`. It doesn't emit step names or per-step timing. `releases.asset_download_urls` contains up to 100 asset download URLs per release. It doesn't emit other per-asset metadata. `contributor_activity` emits `author_id`, `author_login`, `author_type`, `repository` and `total`. It doesn't emit per-week additions, deletions or commits.

Every field is strongly typed. Values without a stable shape remain opaque JSON (`payload`), never partially described objects. Every stream root uses `additionalProperties: false`. Future fields beyond declared columns require a dedicated opaque JSON column. This column must remain separate from declared columns and never use root `additionalProperties`. Record human approval in `FLATTEN_EXEMPTIONS`.

<HideInUI>

## Supported sync modes

The GitHub source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts/#connection-sync-modes):

- [Full Refresh - Overwrite](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-overwrite/)
- [Full Refresh - Append](https://docs.airbyte.com/understanding-airbyte/connections/full-refresh-append)
- [Incremental Sync - Append](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append)
- [Incremental Sync - Append + Deduped](https://docs.airbyte.com/understanding-airbyte/connections/incremental-append-deduped)

## Supported streams

The connector outputs these full refresh streams:

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

The connector outputs these incremental streams:

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
- [Workflows](https://docs.github.com/en/rest/actions/workflows?apiVersion=2022-11-28#list-repository-workflows)

### Entity-relationship diagram (ERD)

<EntityRelationshipDiagram></EntityRelationshipDiagram>

### Notes

1. Only four listed streams are purely incremental: \(`comments`, `commits`, `issues` and `review comments`\). They:

   - read only new records;
   - output only new records.

2. Streams `workflow_runs` and `workflow_jobs` are almost purely incremental. They:

   - read new records and some old records from the past 30 days [docs](https://docs.github.com/en/actions/managing-workflow-runs/re-running-workflows-and-jobs);
   - depend on `workflow_runs` to read `workflow_jobs` data, so both follow the same logic [docs](https://docs.github.com/en/rest/actions/workflow-jobs#list-jobs-for-a-workflow-run);
   - output only new records.

3. The other 19 incremental streams differ because they:

   - read all records;
   - output only new records.

   Consider this behaviour when using these incremental streams, as it may affect your API call limits.

4. For large streams, a very distant `start_date` may sometimes cause repeated GitHub errors instead of returning records. The relevant `WARN` log message will appear. In this case, a more recent `start_date` may help.
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

5. Adding a repository or organization after a connection has synced doesn't backfill its history. See [Adding repositories or organizations to an existing connection](#adding-repositories-or-organizations-to-an-existing-connection).

## IP allow list

If you use Airbyte Cloud with IP-restricted access, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Limitations and troubleshooting

<details>
<summary>
Expand to see details about GitHub connector limitations and troubleshooting.
</summary>

### Connector limitations

#### Rate limits

You can make API requests with a personal access token. You can also authorise a GitHub App or OAuth app to make requests for you.
These requests count towards your personal limit of 5,000 requests each hour. This rises to 15,000 for apps owned by a GitHub Enterprise Cloud organisation.

:::info
`REST API` and `GraphQL API` rate limits are counted separately. The REST API limits requests. The GraphQL API uses a [point-based limit](https://docs.github.com/en/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api), with each query costing a calculated number of points. GraphQL API streams include `pull_request_stats`, `reviews`, `pull_request_comment_reactions`, `issue_reactions`, `releases` and `projects_v2`.
:::

:::tip
If you reach the limits before reading every stream, take these steps:

1. Use Incremental sync mode.
2. Set a higher sync interval.
3. Split the sync into separate connections with fewer streams.
4. Add multiple personal access tokens to the **Personal Access Tokens** field, separated by commas. The connector rotates through every token. It waits only after exhausting every token's rate limit.

:::

When every configured token is rate-limited, the connector waits for the limits to reset instead of failing immediately. The **Max Waiting Time (in minutes)** configuration option caps this wait at 120 minutes by default and 240 minutes maximum. The cap applies when the connector knows its tokens are spent. It also applies when GitHub rejects a request and asks the connector to wait. Rate-limit exhaustion is a transient error. If the connector exceeds this wait, Airbyte retries according to your connection's retry behaviour. With several tokens, a rate-limited request switches to another token instead of waiting, regardless of this setting.

**Test connection** doesn't wait. It returns the rate-limit message within seconds, so a rate-limited token won't leave the connection setup page hanging.

See the GitHub article [Rate limits for the REST API](https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api).

#### Add repositories or organisations

Expanding the **GitHub Repositories** field after a connection has synced doesn't backfill historical activity for new repositories or organisations. The connector keeps a separate sync position for each repository or organisation. A newly added one starts from the connection's current overall position, not your configured **Start date**. Records created or last updated before that position are never emitted. The sync provides no warning or error.

For example, a connection has synced `docker/*` since 2026-01-01. If you expand it to `docker/*, airbytehq/*`, it collects `airbytehq` repositories updated after 2026-01-01. It doesn't collect repositories whose last update is older.

To pull the full history for a new repository or organisation, first save the new value. Then clear the affected streams, or refresh the connection, before syncing. Each stream re-reads from the start of its supported range. Streams that honour **Start date** use your configured value. The streams listed above that don't honour it read everything available.

This currently affects the `repositories` stream. Other streams still use the **Start date** for a repository they haven't seen before. They'll follow the rule above as they move to the connector's declarative implementation.

#### Disabled GHES rate limits

GitHub Enterprise Server has HTTP API rate limiting turned off by default. In this state, the instance answers `GET /rate_limit` with `404 Rate limiting is not enabled.`. The connector interprets this as "this instance does not track quotas" and continues without quota tracking. It no longer treats this response as a failed connection. Requests remain authenticated, and multiple tokens are still used in turn. The connector also honours any rate limits the instance enforces through the usual retry and backoff. Secondary rate limits are a separate GHES setting.

#### Release assets

The `releases.asset_download_urls` array contains up to 100 download URLs for each release. For releases with more than 100 assets, the connector truncates the remaining URLs and logs a warning. Other asset metadata is no longer emitted. This includes `id`, `name`, `size`, `download_count`, `content_type`, `digest`, `label`, `state` and uploader. Keep the existing `release_assets` table if you need these values.

#### Stargazers access requirements

Since July 2026, GitHub only lists a repository's stargazers for its admins and collaborators ([GitHub changelog](https://github.blog/changelog/2026-06-30-upcoming-access-restrictions-to-public-api-endpoints-and-ui-views/)). Otherwise, GitHub returns `404` or `403` when listing stargazers. For the `stargazers` stream only, the connector skips that repository and logs its name and the restriction. The sync still succeeds, and the repository's other streams remain unaffected. Expect an empty `stargazers` stream for public or third-party repositories where you aren't a collaborator. The aggregate star count remains available in the `stargazers_count` field of the `repositories` stream.

#### Unreadable repositories and server errors

If an issue affects only one repository, the connector logs a message and moves to the next one. One unreadable repository therefore doesn't fail the whole stream. This behaviour covers:

- a deleted or renamed repository (`404`)
- a repository your token can't access (`403`)
- a repository without commits (`409`)
- a repository where the stream's supporting feature is disabled

For example, this applies to the `issue_labels` stream when Issues are disabled (`410`).

Version 2.2.0 changed how the connector handles repeated server errors. If GitHub keeps returning `502 Bad Gateway` or `504 Gateway Timeout` after retries, the stream now fails. It no longer skips the affected repository or organisation and continues. Earlier versions logged a warning, skipped it and reported a successful sync. As a result, records could be silently missing from a completed sync.

Affected streams so far:

- Since 2.2.0: `repositories`
- Since 2.3.0: `assignees`, `branches`, `collaborators`, `issue_labels`, `tags`, `organizations`, `teams` and `users`
- Since 2.4.0: `events`, `pull_requests`, `commit_comments`, `issue_milestones`, `stargazers`, `projects`, `issue_events`, `deployments`, `workflows`, `comments`, `issues` and `review_comments`
- Since 2.5.0: `pull_request_commits`, `project_columns`, `project_cards`, `team_members`, `team_memberships`, `issue_timeline_events`, `commit_comment_reactions` and `issue_comment_reactions`
- Since 2.6.0: `commits`, `contributor_activity`, `workflow_runs` and `workflow_jobs`

If a listed stream starts failing after an upgrade, check whether that repository or organisation was previously skipped.

The same streams no longer resume part-way through a stream. Previously, a failed attempt resumed from the repository or organisation where it stopped. It now restarts from the stream's first repository or organisation. Nothing is lost because the retry re-reads completed records. However, a late failure repeats requests for earlier partitions, counting them against your rate limit again. The same version groups listed above apply. For `issues`, state is now saved once per repository instead of once per page. An interrupted sync therefore restarts the current repository instead of resuming part-way through it.

#### `contributor_activity` fails after five 202 answers

GitHub answers `202 Accepted` on the contributor statistics endpoint while calculating the statistics. As before, the connector retries five times at 90-second intervals. Since version 2.6.0, the stream fails if GitHub is still calculating after those retries. Earlier versions logged a message, skipped the repository and reported a successful sync.

#### Repeated parent records on `project_columns`, `project_cards`, `commit_comment_reactions` and `issue_comment_reactions`

Since version 2.5.0, these four streams keep a cursor for each parent record, meaning each project, column or comment. Each incremental sync re-emits one record per parent whose cursor matches the saved value, for the reason described above. Existing connections keep their saved cursors. The first sync after upgrading converts the nested state written by earlier versions. Since version 2.6.0, the same behaviour applies to `commits`, with one cursor per branch, `workflow_runs` and `workflow_jobs`.

#### Repeated repository records on `comments`, `issues` and `review_comments`

Since version 2.4.0, every incremental sync of these streams re-emits one record. Its `updated_at` exactly matches the timestamp where the previous sync stopped. GitHub's `since` filter is inclusive, so this record always appears on the first page. The connector no longer filters it locally. The record is unchanged. Destinations using **Incremental | Append + Deduped** collapse it on the primary key. On **Incremental | Append**, you'll see one extra row for each repository on every sync.

#### Repeated repository records on semi-incremental streams

Since version 2.4.0, every incremental sync re-emits one record per repository for these streams: `events`, `pull_requests`, `commit_comments`, `issue_milestones`, `stargazers`, `projects`, `issue_events`, `deployments` and `workflows`. Its cursor value, `updated_at`, `created_at` or `starred_at`, exactly matches the timestamp where the previous sync stopped. These streams read GitHub's listing, then filter it locally. Previously, the connector kept only records newer than the saved cursor. It now also keeps the boundary record. The record remains unchanged. Destinations using **Incremental | Append + Deduped** collapse it on the primary key. With **Incremental | Append**, you'll see one extra row per repository during each sync.

The same release includes two smaller changes:

- `pull_requests` now fills `base.repo_id` with the base repository's id. Earlier versions always emitted `null` because of a record transformation bug. `head.repo_id` remains unchanged.
- `pull_requests` now always lists each repository newest-first. Earlier versions listed it oldest-first during a connection's first sync. This allowed a failed first sync to resume part-way through a repository. A failed attempt now restarts the repository, matching every later sync.

#### Permissions and scopes

If you use OAuth authentication, the OAuth2.0 application requests these [scopes](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes): **repo**, **read:org**, **read:repo_hook**, **read:user**, **read:discussion**, **read:project** and **workflow**. For [personal access token](https://github.com/settings/tokens), you must manually select the required scopes.

Your token needs at least the `repo` scope. The user generating it needs additional permissions for some streams:

- To sync Collaborators, the user generating the personal access token must be a collaborator. An owner must invite them to become a collaborator. If there are no collaborators, no records will sync. Learn more about [GitHub access permissions](https://docs.github.com/en/get-started/learning-about-github/access-permissions-on-github).
- Only authenticated members of a team's [organization](https://docs.github.com/en/rest/orgs) can sync [Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams). [Personal user accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts) and their repositories can't access Teams features. In this case, no records will sync.
- To sync the Projects stream, enable the Projects feature for the repository.

### Troubleshooting

- Review common troubleshooting issues for the GitHub source connector on the [Airbyte Forum](https://github.com/airbytehq/airbyte/discussions)

</details>

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date | Pull Request | Subject |
| :----------- | :----------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.2.3 | 2026-11-10 | [91518](https://github.com/airbytehq/airbyte/pull/91518) | Update dependencies |
| 0.2.2 | 2026-11-03 | [90564](https://github.com/airbytehq/airbyte/pull/90564) | Update dependencies |
| 0.2.1 | 2026-10-27 | [89909](https://github.com/airbytehq/airbyte/pull/89909) | Update dependencies |
| 0.2.0 | 2026-10-24 | [89750](https://github.com/airbytehq/airbyte/pull/89750) | Drop workflow_job_steps and contributor_activity_weeks data; replace release_assets with download URLs |
| 0.1.2 | 2026-10-24 | [89749](https://github.com/airbytehq/airbyte/pull/89749) | Declare `workflow_runs.pull_request_ids` and `pull_request_numbers` items as integers |
| 0.1.1 | 2026-10-20 | [89588](https://github.com/airbytehq/airbyte/pull/89588) | Rename display name to GitHub (Experimental, Gen 2) |
| 0.1.0 | 2026-10-20 | - | Initial release, forked from source-github 2.7.9 |

</details>

</HideInUI>
