---
generated_record: true
connector_name: Cumul.io
connector_type: destination
connector_slug: cumulio
connector_directory: destination-cumulio
definition_id: e088acb6-9780-4568-880c-54c2dd7f431b
version: 0.1.41
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/cumulio
logo: /images/connectors/destinations/cumulio.svg
logo_source_path: airbyte-integrations/connectors/destination-cumulio/icon.svg
logo_sha256: 9255112805398ba63903c91d28377ef9a4ddee973201093826d41f25eb2969ab
original_metadata_path: airbyte-integrations/connectors/destination-cumulio/metadata.yaml
original_metadata_sha256: 8ea8c9853a77ce863fd81fa4ef271bdc4ed10d8cb5613728529652c5de75162f
original_document_path: docs/integrations/destinations/cumulio.md
original_document_sha256: a6227dade1f8750ebeac7d64a05d825a91ce3d5eb0c00622e2f939b32ac1d384
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: ebe67f9e4e0964e230f6c7658a487c9e0bf55013ff326ca0030c2c2e5a6d0d5c
rewritten_at: 2026-11-12T13:23:33.210785+00:00
---

# Cumul.io

## Overview

Stream data from [any Airbyte Source](https://airbyte.io/connectors?connector-type=Sources) into Cumul.io with the Airbyte Cumul.io destination connector.

Cumul.io is an **[Embedded analytics SaaS solution](https://cumul.io/product/embedded-analytics)** that helps SaaS companies grow through an **engaging customer analytics experience** embedded seamlessly in their product.

Its intuitive, low-code interface helps business users act on insights quickly. It does this **without straining engineering resources from the core product**.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | Yes |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

## Get started

First, **create a [Cumul.io account](https://app.cumul.io/signup)** to use the Cumul.io destination, if you don’t already have one.

After signing in to Cumul.io, you can **generate an API key and token** in your [Profile -> API Tokens](https://app.cumul.io/start/profile/integration).

You’ll need these Cumul.io properties to set up the destination connector in Airbyte:

- "**Cumul.io API Host URL**": the API host URL for the **Cumul.io environment** containing your **Cumul.io account resides**. Use `https://api.cumul.io` for EU multi-tenant users, `https://api.us.cumul.io/` for US multi-tenant users, or a VPC-specific address. This property depends on the environment where your Cumul.io account was created. For example, accounts created through https://app.us.cumul.io/signup, use `https://api.us.cumul.io/` as the API host URL.
- "**Cumul.io API key**": a Cumul.io API key. See above for instructions on generating an API key-token pair.
- "**Cumul.io API token**": the corresponding Cumul.io API token. See above for instructions on generating an API key-token pair.

Once you’ve connected a source and the **first stream synchronization** has **succeeded**, the desired **Dataset(s)** will be **available in Cumul.io to build dashboards on**.

Cumul.io’s ["Getting started" Academy course](https://academy.cumul.io/course/a0bf5530-edfb-441e-901b-e1fcb95dfac7) can help you become familiar with the platform.

Depending on your **synchronization mode** setup, the **next synchronizations** will either **replace/append data in/to these datasets**.

_If you have questions or want to get started with Cumul.io, contact [our contact page](https://cumul.io/contact)._

## Connector overview

### Supported sync modes

| [Sync modes](https://docs.airbyte.com/understanding-airbyte/connections/#sync-modes)                                     | Supported?\(Yes/No\) | Notes                                                 |
| :----------------------------------------------------------------------------------------------------------------------- | :------------------- | :---------------------------------------------------- |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append/)                 | Yes                  | /                                                     |
| [Full Refresh - Replace](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite)             | Yes                  | /                                                     |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append/)              | Yes                  | /                                                     |
| [Incremental - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No                   | Cumul.io's data warehouse does not support dbt (yet). |

### Supported Airbyte features

| Feature                                                                  | Supported?\(Yes/No\) | Notes                                                                                                                                                                                                                                                                                                                                                                                               |
| :----------------------------------------------------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Clear data](https://docs.airbyte.com/operator-guides/clear)             | Yes                  | **Existing data** in a dataset is **not deleted** upon resetting a stream in Airbyte, however the next synchronization batch will replace all existing data. This ensures that the dataset is never empty (e.g. upon disabling the synchronization), which would otherwise result in "No data" upon querying it.                                                                                    |

### Supported Airbyte data types

| [Airbyte data types](https://docs.airbyte.com/understanding-airbyte/supported-data-types#the-types) | Remarks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Array & Object                                                                                      | To support a limited amount of insights, this connector will **stringify data values with type `Array` or `Object`** ([recommended by Airbyte](https://docs.airbyte.com/understanding-airbyte/supported-data-types/#unsupported-types)) as Cumul.io does not support storing nor querying such data types. For analytical purposes, it's always recommended to **unpack these values in different rows or columns** (depending on the use-case) before pushing the data to Cumul.io!                                                              |
| Time with(out) timezone                                                                             | While these values **will be stored as-is** in Cumul.io, they should be interpreted as `hierarchy`\* (i.e. text/string, see [Cumul.io's data types Academy article](https://academy.cumul.io/article/p68253bn)). Alternatively, you could either **provide a (default) date and timezone** for these values, or **unpack them in different columns** (e.g. `hour`, `minute`, `second` columns), before pushing the data to Cumul.io.                                                                                                              |
| Timestamp without timezone                                                                          | Cumul.io **does not support storing dates without timestamps**, these timestamps will be **interpreted as UTC date values**.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Number & Integer data types with NaN, Infinity, -Infinity values                                    | While these values **will be stored as-is** in Cumul.io, they will not support numeric aggregations such as sum, avg, etc. (_using such aggregations on these values likely causes unexpected behavior_). Ideally, such values are **converted into meaningful values** (e.g. no value, 0, a specific value, etc.) before pushing the data to Cumul.io.                                                                                                                                                                                           |
| Boolean                                                                                             | Boolean values **will be stringified** ([recommended by Airbyte](https://docs.airbyte.com/understanding-airbyte/supported-data-types/#unsupported-types)) and result in a hierarchy column type (i.e. text/string, see [Cumul.io's data types Academy article](https://academy.cumul.io/article/p68253bn)). You could use Cumul.io's hierarchy translation (see [this Academy article](https://academy.cumul.io/article/dqgn0316)) to assign translations to `true` and `false` that are meaningful to the business user in the column's context. |
| All other data types                                                                                | Should be supported and correctly interpreted by Cumul.io's Data API service\*.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

\*_Note: Cumul.io’s automatic typing might initially interpret this data type incorrectly because of its format. See `Possible future improvements` below. You can then try changing the column type manually in the Cumul.io UI._

### Cumul.io output schema

Each stream replicated from Airbyte outputs data to a corresponding Cumul.io dataset.

Each dataset will **initially** have an **`Airbyte - <namespace><stream_name>` English name**, which can be **further adapted in Cumul.io's UI** or even [via API](https://developer.cumul.io/#dashboard_update).

If a batch request fails, the connector retries it up to three times. The respective backoff intervals are 5, 10 and 20 minutes.

The connector will **associate one or more of the following tags to each dataset**:

- `[AIRBYTE - DO NOT DELETE] - <namespace><stream_name>`: this tag **retrieves the dataset ID and its current columns** from Cumul.io. It’s associated with the dataset after the first data batch is written to a new dataset.
- `[AIRBYTE - DO NOT DELETE] - REPLACE DATA`: this tag will be **associated to a dataset** when it should be "resetted". This means the **existing data should be replaced**. See `Feature` -> `Reset data` above. When this tag is present, the next synchronisation’s first data batch replaces all existing data.

As the tag name indicates, **never remove these tags from the datasets or manually add them** to other datasets. Doing so might break existing or new synchronisations.

## Data recommendations

### Data structure

For the best query performance, **denormalise your data as much as possible beforehand**. This reduces the joins needed to produce your desired insights.

Denormalised datasets are also easier for less technical users, who often don’t understand relationships between tables.

Rather than denormalising datasets for specific insights, **set up one or more dimensional data models** that support every type of dashboard slicing and dicing.

This creates a **flexible and scalable setup** which is **easy to understand and performant to query**.

This Cumul.io blog post explains why customer-facing analytics requires a simple data model: https://blog.cumul.io/2022/12/07/why-a-dimensional-data-model-for-embedded-analytics/.

### Push data

Cumul.io uses an **OLAP database** to **ensure the most performant concurrent "Read" queries** on large data volumes.

However, OLAP databases such as Cumul.io’s are often less suitable for many small "Write" queries.

For the best write performance, **synchronise larger data volumes less frequently** rather than _smaller volumes more frequently_.

## Possible improvements

- Many concurrent synchronisations might eventually cause the following unevaluated issues:
  - Data from all write buffers could cause a memory overload. If this happens, change the `flush_interval` variable in `destination_cumulio/writer.py` to adjust the flush rate. It’s currently set to 10 000. This is the maximum number of data points accepted by Cumul.io’s Data API service in one request. See note [here](https://developer.cumul.io/#data_create). Keep the `flush_interval` value **as high as possible** to minimise the total overhead across all pushed batches.
  - More than 200 Airbyte connections flushing simultaneously might encounter [Cumul.io's API Rate limit](https://developer.cumul.io/#core_api_ratelimiting). This applies when every connection uses the same Cumul.io API key and token. Cumul.io’s burstable rate limit means this will rarely happen. If you expect this concurrency, use separate API keys and tokens for identical destination connectors. Multiple streams within one connection synchronise sequentially, so they won’t encounter the rate limit.
- The current connector doesn’t consider Airbyte source data types. Instead, Cumul.io’s API detects column types automatically from a random data sample. If the detected type isn’t suitable, you can change the column type manually in the Cumul.io UI. For example, a `VARCHAR` column containing only numeric values might initially be interpreted as a `numeric` column. You can change it to `hierarchy` at any time if that type is more appropriate.
  - A possible future improvement is to:
    1. Create a new dataset:
       [Create Dataset API Documentation](https://developer.cumul.io/#dataset_create)
    2. Create the appropriate tag, `[AIRBYTE - DO NOT DELETE] - <stream_name>`, and associate it with the new dataset. The `_validate_tag_dataset_id_association(stream_name, dataset_id)` method defined in `destination_cumulio/client.py` could support this step.
    3. Create each column with the correct Cumul.io type:
       [Create Column API Documentation](https://developer.cumul.io/#column_create)
    4. Associate each column with the dataset:
       [Associate Dataset Column API Documentation](https://developer.cumul.io/#column_assoc_dataset)
    5. From then on, replace or append data for this dataset using the tag. This is already implemented.

## Namespace support

This destination doesn’t support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                             |
|:--------| :--------- | :-------------------------------------------------------- | :-------------------------------------------------- |
| 0.1.41 | 2025-05-10 | [59772](https://github.com/airbytehq/airbyte/pull/59772) | Update dependencies |
| 0.1.40 | 2025-05-03 | [59333](https://github.com/airbytehq/airbyte/pull/59333) | Update dependencies |
| 0.1.39 | 2025-04-26 | [58722](https://github.com/airbytehq/airbyte/pull/58722) | Update dependencies |
| 0.1.38 | 2025-04-12 | [57628](https://github.com/airbytehq/airbyte/pull/57628) | Update dependencies |
| 0.1.37 | 2025-04-05 | [57145](https://github.com/airbytehq/airbyte/pull/57145) | Update dependencies |
| 0.1.36 | 2025-03-29 | [56586](https://github.com/airbytehq/airbyte/pull/56586) | Update dependencies |
| 0.1.35 | 2025-03-22 | [56101](https://github.com/airbytehq/airbyte/pull/56101) | Update dependencies |
| 0.1.34 | 2025-03-08 | [54909](https://github.com/airbytehq/airbyte/pull/54909) | Update dependencies |
| 0.1.33 | 2025-02-22 | [54208](https://github.com/airbytehq/airbyte/pull/54208) | Update dependencies |
| 0.1.32 | 2025-02-15 | [53866](https://github.com/airbytehq/airbyte/pull/53866) | Update dependencies |
| 0.1.31 | 2025-02-01 | [52937](https://github.com/airbytehq/airbyte/pull/52937) | Update dependencies |
| 0.1.30 | 2025-01-25 | [51767](https://github.com/airbytehq/airbyte/pull/51767) | Update dependencies |
| 0.1.29 | 2025-01-11 | [51261](https://github.com/airbytehq/airbyte/pull/51261) | Update dependencies |
| 0.1.28 | 2024-12-28 | [50504](https://github.com/airbytehq/airbyte/pull/50504) | Update dependencies |
| 0.1.27 | 2024-12-21 | [50167](https://github.com/airbytehq/airbyte/pull/50167) | Update dependencies |
| 0.1.26 | 2024-12-14 | [49302](https://github.com/airbytehq/airbyte/pull/49302) | Update dependencies |
| 0.1.25 | 2024-11-25 | [48679](https://github.com/airbytehq/airbyte/pull/48679) | Update dependencies |
| 0.1.24 | 2024-11-04 | [47029](https://github.com/airbytehq/airbyte/pull/47029) | Update dependencies |
| 0.1.23 | 2024-10-12 | [46816](https://github.com/airbytehq/airbyte/pull/46816) | Update dependencies |
| 0.1.22 | 2024-10-05 | [46445](https://github.com/airbytehq/airbyte/pull/46445) | Update dependencies |
| 0.1.21 | 2024-09-28 | [46201](https://github.com/airbytehq/airbyte/pull/46201) | Update dependencies |
| 0.1.20 | 2024-09-21 | [45831](https://github.com/airbytehq/airbyte/pull/45831) | Update dependencies |
| 0.1.19 | 2024-09-14 | [45580](https://github.com/airbytehq/airbyte/pull/45580) | Update dependencies |
| 0.1.18 | 2024-09-07 | [45291](https://github.com/airbytehq/airbyte/pull/45291) | Update dependencies |
| 0.1.17 | 2024-08-31 | [45033](https://github.com/airbytehq/airbyte/pull/45033) | Update dependencies |
| 0.1.16 | 2024-08-24 | [44656](https://github.com/airbytehq/airbyte/pull/44656) | Update dependencies |
| 0.1.15 | 2024-08-22 | [44530](https://github.com/airbytehq/airbyte/pull/44530) | Update test dependencies |
| 0.1.14 | 2024-08-17 | [44283](https://github.com/airbytehq/airbyte/pull/44283) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43695](https://github.com/airbytehq/airbyte/pull/43695) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43178](https://github.com/airbytehq/airbyte/pull/43178) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42780](https://github.com/airbytehq/airbyte/pull/42780) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42281](https://github.com/airbytehq/airbyte/pull/42281) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41711](https://github.com/airbytehq/airbyte/pull/41711) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41341](https://github.com/airbytehq/airbyte/pull/41341) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41104](https://github.com/airbytehq/airbyte/pull/41104) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40763](https://github.com/airbytehq/airbyte/pull/40763) | Update dependencies |
| 0.1.5 | 2024-06-26 | [40507](https://github.com/airbytehq/airbyte/pull/40507) | Update dependencies |
| 0.1.4 | 2024-06-21 | [39930](https://github.com/airbytehq/airbyte/pull/39930) | Update dependencies |
| 0.1.3 | 2024-06-06 | [39292](https://github.com/airbytehq/airbyte/pull/39292) | [autopull] Upgrade base image to v1.2.2 |
| 0.1.2 | 2024-05-20 | [38371](https://github.com/airbytehq/airbyte/pull/38371) | [autopull] base image + poetry + up_to_date |
| 0.1.1   | 2024-03-05 | [#35838](https://github.com/airbytehq/airbyte/pull/35838) | Un-archive connector                                |
| 0.1.0   | 2023-02-16 |                                                           | Initial release of Cumul.io's Destination connector |

</details>
