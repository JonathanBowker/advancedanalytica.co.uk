---
generated_record: true
connector_name: Ebay Finance
connector_type: source
connector_slug: ebay-finance
connector_directory: source-ebay-finance
definition_id: 177c8ac0-5b2e-497d-9526-c787fb333fc9
version: 0.0.57
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/ebay-finance
logo: /images/connectors/sources/ebay-finance.svg
logo_source_path: airbyte-integrations/connectors/source-ebay-finance/icon.svg
logo_sha256: 7036848527ff55004ef199bf5610edaee0cd090d7828f0ffeac7e7a6cb8f37dc
original_metadata_path: airbyte-integrations/connectors/source-ebay-finance/metadata.yaml
original_metadata_sha256: 37af4dd804dfb073e9e8e5324e7aaf4932a167d2dfe9a49212712b89d2d05d8b
original_document_path: docs/integrations/sources/ebay-finance.md
original_document_sha256: c3ef6c4567868d35f91185a41f90e36b93dd54a67cf11d7f421de199051b1446
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 841bafd9f0243a914a2041e323b02397fd93ab42eb2ad53e4b280c90ddfa96ad
rewritten_at: 2026-11-12T13:35:56.123412+00:00
---

# Ebay Finance
Website: https://www.ebay.com/
Documentation: https://developer.ebay.com/api-docs/sell/finances/overview.html

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `token_refresh_endpoint` | `string` | Refresh Token Endpoint.  | https://api.ebay.com/identity/v1/oauth2/token |
| `client_access_token` | `string` | Access token.  |  |
| `username` | `string` | Username. Ebay Developer Client ID |  |
| `password` | `string` | Password. Ebay Client Secret |  |
| `redirect_uri` | `string` | Redirect URI.  |  |
| `refresh_token` | `string` | Refresh Token.  |  |
| `api_host` | `string` | API Host. https://apiz.sandbox.ebay.com for sandbox &amp; https://apiz.ebay.com for production | https://apiz.ebay.com |
| `start_date` | `string` | Start date. UTC date and time to start replicating from. eBay only returns transactions and payouts from the last five years. |  |
| `marketplace_id` | `string` | Marketplace ID. eBay marketplace of the seller, sent as the `X-EBAY-C-MARKETPLACE-ID` header (for example EBAY_US, EBAY_GB, EBAY_DE). | EBAY_US |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| transactions |  | DefaultPaginator | ✅ |  ✅  |
| payouts | payoutId | DefaultPaginator | ✅ |  ✅  |

## IP allow list

Add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list if you use Airbyte Cloud and your organisation restricts access to specific IPs.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.57 | 2026-11-10 | [91526](https://github.com/airbytehq/airbyte/pull/91526) | Update dependencies |
| 0.0.56 | 2026-11-03 | [90568](https://github.com/airbytehq/airbyte/pull/90568) | Update dependencies |
| 0.0.55 | 2026-10-27 | [89900](https://github.com/airbytehq/airbyte/pull/89900) | Update dependencies |
| 0.0.54 | 2026-10-20 | [89222](https://github.com/airbytehq/airbyte/pull/89222) | Update dependencies |
| 0.0.53 | 2026-10-13 | [88596](https://github.com/airbytehq/airbyte/pull/88596) | Update dependencies |
| 0.0.52 | 2026-10-07 | [88203](https://github.com/airbytehq/airbyte/pull/88203) | Fix `transactionDate`/`payoutDate` filters (3-digit ms, bounded 1-year windows), cap payouts page size at 200, add marketplace ID header |
| 0.0.51 | 2026-10-06 | [87839](https://github.com/airbytehq/airbyte/pull/87839) | Update dependencies |
| 0.0.50 | 2026-09-29 | [87178](https://github.com/airbytehq/airbyte/pull/87178) | Update dependencies |
| 0.0.49 | 2026-09-22 | [86641](https://github.com/airbytehq/airbyte/pull/86641) | Update dependencies |
| 0.0.48 | 2026-09-15 | [86043](https://github.com/airbytehq/airbyte/pull/86043) | Update dependencies |
| 0.0.47 | 2026-09-08 | [85478](https://github.com/airbytehq/airbyte/pull/85478) | Update dependencies |
| 0.0.46 | 2026-08-18 | [84582](https://github.com/airbytehq/airbyte/pull/84582) | Update dependencies |
| 0.0.45 | 2026-08-11 | [83933](https://github.com/airbytehq/airbyte/pull/83933) | Update dependencies |
| 0.0.44 | 2026-08-04 | [83434](https://github.com/airbytehq/airbyte/pull/83434) | Update dependencies |
| 0.0.43 | 2026-07-28 | [82919](https://github.com/airbytehq/airbyte/pull/82919) | Update dependencies |
| 0.0.42 | 2026-07-21 | [82388](https://github.com/airbytehq/airbyte/pull/82388) | Update dependencies |
| 0.0.41 | 2026-07-14 | [81815](https://github.com/airbytehq/airbyte/pull/81815) | Update dependencies |
| 0.0.40 | 2026-06-30 | [81059](https://github.com/airbytehq/airbyte/pull/81059) | Update dependencies |
| 0.0.39 | 2026-06-23 | [80455](https://github.com/airbytehq/airbyte/pull/80455) | Update dependencies |
| 0.0.38 | 2026-06-16 | [79858](https://github.com/airbytehq/airbyte/pull/79858) | Update dependencies |
| 0.0.37 | 2026-06-09 | [79323](https://github.com/airbytehq/airbyte/pull/79323) | Update dependencies |
| 0.0.36 | 2026-06-02 | [78678](https://github.com/airbytehq/airbyte/pull/78678) | Update dependencies |
| 0.0.35 | 2026-04-28 | [77198](https://github.com/airbytehq/airbyte/pull/77198) | Update dependencies |
| 0.0.34 | 2026-04-21 | [76572](https://github.com/airbytehq/airbyte/pull/76572) | Update dependencies |
| 0.0.33 | 2026-03-31 | [75781](https://github.com/airbytehq/airbyte/pull/75781) | Update dependencies |
| 0.0.32 | 2026-03-17 | [75006](https://github.com/airbytehq/airbyte/pull/75006) | Update dependencies |
| 0.0.31 | 2026-03-10 | [74445](https://github.com/airbytehq/airbyte/pull/74445) | Update dependencies |
| 0.0.30 | 2026-02-24 | [73910](https://github.com/airbytehq/airbyte/pull/73910) | Update dependencies |
| 0.0.29 | 2026-02-17 | [73485](https://github.com/airbytehq/airbyte/pull/73485) | Update dependencies |
| 0.0.28 | 2026-02-10 | [72994](https://github.com/airbytehq/airbyte/pull/72994) | Update dependencies |
| 0.0.27 | 2026-02-03 | [72621](https://github.com/airbytehq/airbyte/pull/72621) | Update dependencies |
| 0.0.26 | 2026-01-20 | [71878](https://github.com/airbytehq/airbyte/pull/71878) | Update dependencies |
| 0.0.25 | 2026-01-14 | [71560](https://github.com/airbytehq/airbyte/pull/71560) | Update dependencies |
| 0.0.24 | 2025-12-18 | [70601](https://github.com/airbytehq/airbyte/pull/70601) | Update dependencies |
| 0.0.23 | 2025-11-25 | [70161](https://github.com/airbytehq/airbyte/pull/70161) | Update dependencies |
| 0.0.22 | 2025-11-18 | [69395](https://github.com/airbytehq/airbyte/pull/69395) | Update dependencies |
| 0.0.21 | 2025-10-29 | [68709](https://github.com/airbytehq/airbyte/pull/68709) | Update dependencies |
| 0.0.20 | 2025-10-21 | [68573](https://github.com/airbytehq/airbyte/pull/68573) | Update dependencies |
| 0.0.19 | 2025-10-14 | [67779](https://github.com/airbytehq/airbyte/pull/67779) | Update dependencies |
| 0.0.18 | 2025-10-07 | [67272](https://github.com/airbytehq/airbyte/pull/67272) | Update dependencies |
| 0.0.17 | 2025-09-30 | [65873](https://github.com/airbytehq/airbyte/pull/65873) | Update dependencies |
| 0.0.16 | 2025-08-23 | [65278](https://github.com/airbytehq/airbyte/pull/65278) | Update dependencies |
| 0.0.15 | 2025-08-09 | [64795](https://github.com/airbytehq/airbyte/pull/64795) | Update dependencies |
| 0.0.14 | 2025-08-02 | [64349](https://github.com/airbytehq/airbyte/pull/64349) | Update dependencies |
| 0.0.13 | 2025-07-26 | [63962](https://github.com/airbytehq/airbyte/pull/63962) | Update dependencies |
| 0.0.12 | 2025-07-19 | [63546](https://github.com/airbytehq/airbyte/pull/63546) | Update dependencies |
| 0.0.11 | 2025-07-12 | [63000](https://github.com/airbytehq/airbyte/pull/63000) | Update dependencies |
| 0.0.10 | 2025-07-05 | [62804](https://github.com/airbytehq/airbyte/pull/62804) | Update dependencies |
| 0.0.9 | 2025-06-28 | [62429](https://github.com/airbytehq/airbyte/pull/62429) | Update dependencies |
| 0.0.8 | 2025-06-22 | [62000](https://github.com/airbytehq/airbyte/pull/62000) | Update dependencies |
| 0.0.7 | 2025-06-14 | [60371](https://github.com/airbytehq/airbyte/pull/60371) | Update dependencies |
| 0.0.6 | 2025-05-10 | [59927](https://github.com/airbytehq/airbyte/pull/59927) | Update dependencies |
| 0.0.5 | 2025-05-03 | [58900](https://github.com/airbytehq/airbyte/pull/58900) | Update dependencies |
| 0.0.4 | 2025-04-19 | [58371](https://github.com/airbytehq/airbyte/pull/58371) | Update dependencies |
| 0.0.3 | 2025-04-12 | [57824](https://github.com/airbytehq/airbyte/pull/57824) | Update dependencies |
| 0.0.2 | 2025-04-05 | [57248](https://github.com/airbytehq/airbyte/pull/57248) | Update dependencies |
| 0.0.1 | 2025-04-01 | | Initial release by [@adityamohta](https://github.com/adityamohta) via Connector Builder |

</details>
