---
generated_record: true
connector_name: Gutendex
connector_type: source
connector_slug: gutendex
connector_directory: source-gutendex
definition_id: bff9a277-e01d-420d-81ee-80f28a307318
version: 0.2.15
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/gutendex
logo: /images/connectors/sources/gutendex.svg
logo_source_path: airbyte-integrations/connectors/source-gutendex/icon.svg
logo_sha256: 5db140e8338f69a5a1fdeef86c425cb0942be4bf305ff93959eb3e6c0547bfe0
original_metadata_path: airbyte-integrations/connectors/source-gutendex/metadata.yaml
original_metadata_sha256: d704331dbd93b67a58f6ae98ca5ceea15e6a8e099d024ea45c70ae32c6a472ae
original_document_path: docs/integrations/sources/gutendex.md
original_document_sha256: 9d30e1c265e2de1564a9a62188dfe5b33931ccc974c774e6802f4cd8b1c59680
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 41cc769426984ac89a004fbb4c643ae503aaf03bced90df5c79b2ad0dab9a922
rewritten_at: 2026-11-12T13:42:11.923727+00:00
---

# Gutendex

## Overview

You can sync data from the [Gutendex API](https://gutendex.com/) with the Gutendex source.

## Requirements

You don't need an access token or API key to make requests.
You can provide these optional connector parameters:

---

##### `author_year_start` and `author_year_end`

Use these to find books with at least one author alive within a specified year range. Enter positive integers for CE or negative integers for BCE.

For example, `/books?author_year_start=1800&author_year_end=1899` returns books whose authors were alive during the 19th century.

---

##### `copyright`

Use this to find books by copyright status. Use true for existing copyrights or false for books in the USA's public domain. Use null when copyright information isn't available.

---

##### `languages`

Use this to find books in any listed language. Enter comma-separated, two-character language codes. For example, `/books?languages=en` returns English books. `/books?languages=fr,fi` returns books in French, Finnish or both.

---

##### `search`

Use this to search author names and book titles for specified words. Separate words with a space, or %20 in URL-encoded format. Searches are case-insensitive. For example, `/books?search=dickens%20great` includes Great Expectations by Charles Dickens.

---

##### `sort`

Use this to sort books. Choose ascending for Project Gutenberg IDs from lowest to highest. Choose descending for IDs from highest to lowest. Choose popular, the default, to sort from most to least popular by download count.

---

##### `topic`

Use this to search for a case-insensitive key phrase in book subjects or bookshelves. For example, `/books?topic=children` returns books from the "Children's Literature" bookshelf and with subjects such as "Sick children -- Fiction".

---

## Output schema

Query the API at /books, such as gutendex.com/books, for book information from the Project Gutenberg database. The API returns book data in this format:

```
{
    "count": <number>,
    "next": <string or null>,
    "previous": <string or null>,
    "results": <array of Books>
}
```

`results` is an array containing 0–32 book objects. next and previous are URLs for the next and previous result pages. count is the query's total number of books across all pages.

By default, books are ordered by popularity, based on their Project Gutenberg download numbers.

The source can sync the results stream.

## Setup guide

## Step 1: Set up Gutendex in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Select **Sources** from the left navigation bar. Then select **+new source** in the top-right corner.
3. On the Set up the source page, select **Gutendex** from the Source type dropdown.
4. Select **Set up source**.

### Airbyte OSS

1. Open the Airbyte Open Source dashboard.
2. Name your source Gutendex.
3. Select **Set up source**.

## Supported sync modes

The Gutendex source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature           | Supported? |
| :---------------- | :--------- |
| Full Refresh Sync | Yes        |
| Incremental Sync  | No         |
| Namespaces        | No         |

## Performance considerations

No rate limit is published. However, this data updates infrequently, so set the update cadence to 24hr or higher.

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                              | Subject                                     |
| :------ |:-----------| :-------------------------------------------------------- |:--------------------------------------------|
| 0.2.15 | 2026-11-09 | [91405](https://github.com/airbytehq/airbyte/pull/91405) | Upgrade source-declarative-manifest base image to 7.47.0 |
| 0.2.14 | 2026-10-13 | [78743](https://github.com/airbytehq/airbyte/pull/78743) | Update dependencies |
| 0.2.13 | 2026-10-08 | [88363](https://github.com/airbytehq/airbyte/pull/88363) | Replace the default Airbyte icon with a generic book icon |
| 0.2.12 | 2025-05-24 | [60673](https://github.com/airbytehq/airbyte/pull/60673) | Update dependencies |
| 0.2.11 | 2025-05-10 | [59245](https://github.com/airbytehq/airbyte/pull/59245) | Update dependencies |
| 0.2.10 | 2025-04-26 | [58752](https://github.com/airbytehq/airbyte/pull/58752) | Update dependencies |
| 0.2.9 | 2025-04-19 | [58168](https://github.com/airbytehq/airbyte/pull/58168) | Update dependencies |
| 0.2.8 | 2025-04-12 | [57706](https://github.com/airbytehq/airbyte/pull/57706) | Update dependencies |
| 0.2.7 | 2025-04-05 | [57046](https://github.com/airbytehq/airbyte/pull/57046) | Update dependencies |
| 0.2.6 | 2025-03-29 | [56636](https://github.com/airbytehq/airbyte/pull/56636) | Update dependencies |
| 0.2.5 | 2025-03-22 | [56003](https://github.com/airbytehq/airbyte/pull/56003) | Update dependencies |
| 0.2.4 | 2025-03-08 | [55442](https://github.com/airbytehq/airbyte/pull/55442) | Update dependencies |
| 0.2.3 | 2025-03-01 | [54754](https://github.com/airbytehq/airbyte/pull/54754) | Update dependencies |
| 0.2.2 | 2025-02-22 | [54345](https://github.com/airbytehq/airbyte/pull/54345) | Update dependencies |
| 0.2.1 | 2025-02-15 | [48316](https://github.com/airbytehq/airbyte/pull/48316) | Update dependencies |
| 0.2.0 | 2024-08-23 | [44617](https://github.com/airbytehq/airbyte/pull/44617) | Refactor connector to manifest-only format |
| 0.1.15 | 2024-08-17 | [44264](https://github.com/airbytehq/airbyte/pull/44264) | Update dependencies |
| 0.1.14 | 2024-08-12 | [43924](https://github.com/airbytehq/airbyte/pull/43924) | Update dependencies |
| 0.1.13 | 2024-08-10 | [43562](https://github.com/airbytehq/airbyte/pull/43562) | Update dependencies |
| 0.1.12 | 2024-08-03 | [43258](https://github.com/airbytehq/airbyte/pull/43258) | Update dependencies |
| 0.1.11 | 2024-07-27 | [42701](https://github.com/airbytehq/airbyte/pull/42701) | Update dependencies |
| 0.1.10 | 2024-07-20 | [42278](https://github.com/airbytehq/airbyte/pull/42278) | Update dependencies |
| 0.1.9 | 2024-07-13 | [41827](https://github.com/airbytehq/airbyte/pull/41827) | Update dependencies |
| 0.1.8 | 2024-07-10 | [41507](https://github.com/airbytehq/airbyte/pull/41507) | Update dependencies |
| 0.1.7 | 2024-07-09 | [41244](https://github.com/airbytehq/airbyte/pull/41244) | Update dependencies |
| 0.1.6 | 2024-07-06 | [40823](https://github.com/airbytehq/airbyte/pull/40823) | Update dependencies |
| 0.1.5 | 2024-06-25 | [40394](https://github.com/airbytehq/airbyte/pull/40394) | Update dependencies |
| 0.1.4 | 2024-06-23 | [39924](https://github.com/airbytehq/airbyte/pull/39924) | Update dependencies |
| 0.1.3 | 2024-06-15 | [39509](https://github.com/airbytehq/airbyte/pull/39509) | Make connector compatible with Builder |
| 0.1.2 | 2024-06-04 | [39017](https://github.com/airbytehq/airbyte/pull/39017) | [autopull] Upgrade base image to v1.2.1 |
| 0.1.1 | 2024-05-21 | [38509](https://github.com/airbytehq/airbyte/pull/38509) | [autopull] base image + poetry + up_to_date |
| 0.1.0   | 2022-10-17 | [#18075](https://github.com/airbytehq/airbyte/pull/18075) | 🎉 New Source: Gutendex API [low-code CDK]  |

</details>
