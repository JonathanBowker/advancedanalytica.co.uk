---
generated_record: true
connector_name: Serpstat
connector_type: source
connector_slug: serpstat
connector_directory: source-serpstat
definition_id: 3b2e8fb2-9137-41ff-a1e1-83ecb39e26c8
version: 0.2.24
support_level: null
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/serpstat
logo: /images/connectors/sources/serpstat.svg
logo_source_path: airbyte-integrations/connectors/source-serpstat/icon.svg
logo_sha256: b92e7e214916cf6277596b3468361b200176aa051a794e3e35eb09e5a3ffc649
original_metadata_path: airbyte-integrations/connectors/source-serpstat/metadata.yaml
original_metadata_sha256: 86770ecc52d406d9cecc6a6162d4b11a9b92df7b86b05572256c4dd4e2c76845
original_document_path: docs/integrations/sources/serpstat.md
original_document_sha256: da27308dd308fd9e206670b2a4d41edc09701176f1ac9c384fcc12bea3c16759
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: c7083f2b138dc6ce1d6af6ec57005b08ee54d47657d9f99b99c4ffac892f6441
rewritten_at: 2026-11-12T13:55:17.085641+00:00
---

# Serpstat

Use this page to set up the Serpstat source connector and review its reference information.

## Set up the connector

### Step 1: Get your Serpstat API key

#### New Serpstat users

1. Create a new [Serpstat account](https://serpstat.com/signup/?utm_source=).
2. Go to the [My account](https://serpstat.com/users/profile/) page and click **Get API key**.
3. Follow the instructions to get your API key.
4. Click **Copy** to copy your API key.

#### Existing Serpstat users

Go to the [My account](https://serpstat.com/users/profile/) page and click **Copy** to copy your API key.

### Step 2: Set up Serpstat in Airbyte

1. [Log into your Airbyte Cloud](https://cloud.airbyte.io/workspaces) or Airbyte Open Source account.
2. Click **Sources**, then click **+ New source**.
3. On the **Set up the source** page, select **Serpstat** from the **Source type** dropdown.
4. Enter a name for your connector.
5. Enter your API key.
6. Expand **Optional fields** and complete each field. Each API response uses API credits from your Serpstat subscription plan. To consume fewer API rows, reduce the **Page size** and **Pages to fetch** options.
7. Click **Set up source**.

## Supported sync modes

The Serpstat source connector supports this [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full refresh

## Supported streams

- [Domains summary](https://serpstat.com/api/412-summarnij-otchet-po-domenu-v4-serpstatdomainproceduregetdomainsinfo/)
- [Domain history](https://serpstat.com/api/420-istoriya-po-domenu-v4-serpstatdomainproceduregetdomainshistory/)
- [Domain keywords](https://serpstat.com/api/584-top-search-engine-keywords-by-v4-domain-serpstatdomainproceduregetdomainkeywords/)
- [Domain keywords by region](https://serpstat.com/api/sorting-the-domain-by-keywords/)
- [Domain competitors](https://serpstat.com/api/590-domain-competitors-in-v4-search-result-serpstatdomainproceduregetcompetitors/)
- [Domain top pages](https://serpstat.com/api/588-domain-top-urls-v4-serpstatdomainproceduregettopurls/)

## Performance limits

Requests per second for each API key limit the maximum sync speed. View this limit in your [Serpstat account](https://serpstat.com/users/profile/).

## IP allow list

If you use Airbyte Cloud and restrict access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                    |
| :------ | :--------- | :------------------------------------------------------- | :------------------------- |
| 0.2.24 | 2025-05-25 | [60550](https://github.com/airbytehq/airbyte/pull/60550) | Update dependencies |
| 0.2.23 | 2025-05-10 | [60179](https://github.com/airbytehq/airbyte/pull/60179) | Update dependencies |
| 0.2.22 | 2025-05-04 | [59642](https://github.com/airbytehq/airbyte/pull/59642) | Update dependencies |
| 0.2.21 | 2025-04-27 | [59021](https://github.com/airbytehq/airbyte/pull/59021) | Update dependencies |
| 0.2.20 | 2025-04-19 | [58426](https://github.com/airbytehq/airbyte/pull/58426) | Update dependencies |
| 0.2.19 | 2025-04-12 | [57956](https://github.com/airbytehq/airbyte/pull/57956) | Update dependencies |
| 0.2.18 | 2025-04-05 | [57463](https://github.com/airbytehq/airbyte/pull/57463) | Update dependencies |
| 0.2.17 | 2025-03-29 | [56875](https://github.com/airbytehq/airbyte/pull/56875) | Update dependencies |
| 0.2.16 | 2025-03-22 | [56272](https://github.com/airbytehq/airbyte/pull/56272) | Update dependencies |
| 0.2.15 | 2025-03-08 | [55081](https://github.com/airbytehq/airbyte/pull/55081) | Update dependencies |
| 0.2.14 | 2025-02-22 | [54485](https://github.com/airbytehq/airbyte/pull/54485) | Update dependencies |
| 0.2.13 | 2025-02-15 | [54094](https://github.com/airbytehq/airbyte/pull/54094) | Update dependencies |
| 0.2.12 | 2025-02-08 | [53475](https://github.com/airbytehq/airbyte/pull/53475) | Update dependencies |
| 0.2.11 | 2025-02-01 | [53021](https://github.com/airbytehq/airbyte/pull/53021) | Update dependencies |
| 0.2.10 | 2025-01-25 | [52522](https://github.com/airbytehq/airbyte/pull/52522) | Update dependencies |
| 0.2.9 | 2025-01-18 | [51849](https://github.com/airbytehq/airbyte/pull/51849) | Update dependencies |
| 0.2.8 | 2025-01-11 | [51306](https://github.com/airbytehq/airbyte/pull/51306) | Update dependencies |
| 0.2.7 | 2024-12-28 | [50712](https://github.com/airbytehq/airbyte/pull/50712) | Update dependencies |
| 0.2.6 | 2024-12-21 | [50230](https://github.com/airbytehq/airbyte/pull/50230) | Update dependencies |
| 0.2.5 | 2024-12-14 | [49714](https://github.com/airbytehq/airbyte/pull/49714) | Update dependencies |
| 0.2.4 | 2024-12-12 | [48241](https://github.com/airbytehq/airbyte/pull/48241) | Update dependencies |
| 0.2.3 | 2024-10-29 | [47928](https://github.com/airbytehq/airbyte/pull/47928) | Update dependencies |
| 0.2.2 | 2024-10-28 | [47666](https://github.com/airbytehq/airbyte/pull/47666) | Update dependencies |
| 0.2.1 | 2024-08-16 | [44196](https://github.com/airbytehq/airbyte/pull/44196) | Bump source-declarative-manifest version |
| 0.2.0 | 2024-08-14 | [44067](https://github.com/airbytehq/airbyte/pull/44067) | Refactor connector to manifest-only format |
| 0.1.11 | 2024-08-12 | [43920](https://github.com/airbytehq/airbyte/pull/43920) | Update dependencies |
| 0.1.10 | 2024-08-10 | [43510](https://github.com/airbytehq/airbyte/pull/43510) | Update dependencies |
| 0.1.9 | 2024-08-03 | [43076](https://github.com/airbytehq/airbyte/pull/43076) | Update dependencies |
| 0.1.8 | 2024-07-27 | [42697](https://github.com/airbytehq/airbyte/pull/42697) | Update dependencies |
| 0.1.7 | 2024-07-20 | [42214](https://github.com/airbytehq/airbyte/pull/42214) | Update dependencies |
| 0.1.6 | 2024-07-13 | [41714](https://github.com/airbytehq/airbyte/pull/41714) | Update dependencies |
| 0.1.5 | 2024-07-10 | [41550](https://github.com/airbytehq/airbyte/pull/41550) | Update dependencies |
| 0.1.4 | 2024-07-06 | [40767](https://github.com/airbytehq/airbyte/pull/40767) | Update dependencies |
| 0.1.3 | 2024-06-25 | [40400](https://github.com/airbytehq/airbyte/pull/40400) | Update dependencies |
| 0.1.2 | 2024-06-23 | [40221](https://github.com/airbytehq/airbyte/pull/40221) | Update dependencies |
| 0.1.1 | 2024-05-30 | [38690](https://github.com/airbytehq/airbyte/pull/38690) | Make compatible with the builder |
| 0.1.0 | 2023-08-21 | [28147](https://github.com/airbytehq/airbyte/pull/28147) | Release Serpstat Connector |

</details>
