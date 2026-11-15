---
generated_record: true
connector_name: HubSpot
connector_type: destination
connector_slug: hubspot
connector_directory: destination-hubspot
definition_id: c8ccd253-8525-4bbd-801c-f0b84ac71f61
version: 0.0.13
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/hubspot
logo: /images/connectors/destinations/hubspot.svg
logo_source_path: airbyte-integrations/connectors/destination-hubspot/icon.svg
logo_sha256: 52d27793f98e1402b9dd27c1831299ba04e7d9f7acadcfa8866d783bf0cec78a
original_metadata_path: airbyte-integrations/connectors/destination-hubspot/metadata.yaml
original_metadata_sha256: 199816208f524caa550588c29281fcf653f7a9c8a46757d125092dcf2f2d31e0
original_document_path: docs/integrations/destinations/hubspot.md
original_document_sha256: 76305e6f242ab8e277fc538c5139c67deb6429cb3972486bb472eccb31da1185
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: f5fa34318bfe61d142c646bdee2c5600d2e500a4a32b0bfa6b338169260f57a2
rewritten_at: 2026-11-12T13:24:37.914972+00:00
---

---
dockerRepository: airbyte/destination-hubspot
---

# HubSpot destination

Set up the [HubSpot](https://www.hubspot.com/) destination connector by following this guide. The connector supports [data activation](/platform/move-data/elt-data-activation) for operational workflows.

## Prerequisites

- A HubSpot account
- Airbyte version 1.8 or later, or Airbyte Cloud

### S3 prerequisites for rejected records

If you use an S3 bucket to store rejected records, you'll also need the following.

1. Allow connections between Airbyte and your AWS S3/Minio S3 cluster if they're in separate VPCs.
2. [Enforce encryption of data in transit](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html#transit).
3. An S3 bucket with credentials, a Role ARN, or an instance profile with host read/write permissions configured for EC2 or EKS.

    - These fields are always required:

      - **S3 Bucket Name**
      - **S3 Bucket Region**
      - **Prefix Path in the Bucket**

    - If you use STS Assume Role, you must provide:

      - **Role ARN**

    - If you use AWS credentials, you must provide:

      - **Access Key ID**
      - **Secret Access Key**

    - If you use an Instance Profile, you can omit the Access Key ID, Secret Access Key, and Role ARN.

## Setup guide

### Set up HubSpot in Airbyte

1. Log in to your Airbyte account.
2. Select Destination, then select + New destination.
3. On the Set up the destination page, select HubSpot from the Destination tiles.
4. Enter a name for the HubSpot connector.
5. OAuth authentication is available from the **Authentication** dropdown. Select **Authenticate your HubSpot account** to sign in with HubSpot and authorise your account.

   :::note HubSpot authentication issues
   The popup window may display the error `An invalid scope name was provided` during authentication. Close the window and retry authentication.
   :::

6. Select **Set up destination** and wait for the tests to finish.

## Supported sync modes

| Sync mode | Supported? |
| :--- | :--- |
| [Full Refresh - Overwrite](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite) | No |
| [Full Refresh - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-append) | Yes |
| [Full Refresh - Overwrite + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/full-refresh-overwrite-deduped) | No |
| [Incremental Sync - Append](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append) | Yes |
| [Incremental Sync - Append + Deduped](https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped) | No |

This is a [data activation](/platform/move-data/elt-data-activation) destination. Alongside the Airbyte sync modes above, HubSpot supports per-object write operations: insert, upsert, update, and soft delete. Configure these operations in the connection settings.

## Supported objects

The HubSpot destination connector supports these streams:

- [Companies](https://developers.hubspot.com/docs/api/crm/companies): Upsert on unique field
- [Contacts](https://developers.hubspot.com/docs/methods/contacts): Upsert on email
- [Deals](https://developers.hubspot.com/docs/api/crm/deals): Upsert on unique field
- [Products](https://developers.hubspot.com/docs/api/crm/products): Upsert on unique field
- [Custom Objects](https://developers.hubspot.com/docs/guides/api/crm/objects/custom-objects): Upsert on unique field

## Limitations and troubleshooting

### Rate limits

The connector automatically follows HubSpot's standard API rate limits. If rate limiting occurs, the connector retries requests with exponential backoff.

### Missing destination objects

For every object except CONTACT, which uses email as its matching key, upsert requires a unique value field on the destination object.

**Matching Key Requirements:**
- **CONTACT**: Uses email field automatically
- **All other objects**: Requires a property with unique values enabled

Create a unique value property in HubSpot:
* From the CRM menu on the left, select the object you want to sync
* Under `Actions`, select `Edit Properties`
* Select `Create property`
* When entering the rules, select `Require unique values for this property`

### App verification

HubSpot requires application usage, such as [more than 60 installations](https://developers.hubspot.com/docs/guides/apps/marketplace/certification-requirements#value), before verifying the HubSpot application. During installation, you might see "You're connecting to an unverified app". This warning is expected for the first users. Once the application receives enough traffic, it can be verified and the warning will disappear.

### Scopes for unsupported streams

During app installation, you might see scopes for unsupported objects. This is expected because changing scopes might require users to re-authenticate, which can be disruptive. To avoid this, scopes were added for objects intended for future support based on user demand.

### 403 Forbidden error

Hubspot has **scopes** for each API call. Each stream is linked to a scope and requires access to sync data. Review the Hubspot OAuth scope documentation [here](https://developers.hubspot.com/docs/api/working-with-oauth#scopes).

## Namespace support

This destination doesn't support [namespaces](https://docs.airbyte.com/platform/using-airbyte/core-concepts/namespaces).

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                                    | Subject                                   |
|:--------|:-----------|:----------------------------------------------------------------|:------------------------------------------|
| 0.0.13 | 2026-11-10 | [91834](https://github.com/airbytehq/airbyte/pull/91834) | Fix HubSpot OAuth authorization by sending the PKCE code_challenge_method and code_verifier |
| 0.0.12 | 2026-06-17 | [80214](https://github.com/airbytehq/airbyte/pull/80214) | Move to community support level |
| 0.0.11 | 2026-04-15 | [76336](https://github.com/airbytehq/airbyte/pull/76336) | Upgrade Bulk CDK to 1.0.8 (OAuth token expiry fix) |
| 0.0.10 | 2026-02-09 | [72975](https://github.com/airbytehq/airbyte/pull/72975) | Upgrade CDK to 1.0.1 |
| 0.0.9 | 2026-01-26 | [72304](https://github.com/airbytehq/airbyte/pull/72304) | Upgrade CDK to 0.2.0 |
| 0.0.8 | 2025-11-05 | [69131](https://github.com/airbytehq/airbyte/pull/69131) | Upgrade to Bulk CDK 0.1.61. |
| 0.0.7 | 2025-09-24 | [66684](https://github.com/airbytehq/airbyte/pull/66684) | Pin to CDK artifact |
| 0.0.6 | 2025-09-10 | [65986](https://github.com/airbytehq/airbyte/pull/65986) | Adding product object |
| 0.0.5 | 2025-09-08 | [65157](https://github.com/airbytehq/airbyte/pull/65157) | Update following breaking changes on spec |
| 0.0.4 | 2025-07-31 | [64144](https://github.com/airbytehq/airbyte/pull/64144) | OSS release |
| 0.0.3   | 2025-07-18 | [205](https://github.com/airbytehq/airbyte-enterprise/pull/205) | Forcing new release                       |
| 0.0.2   | 2025-07-18 | [204](https://github.com/airbytehq/airbyte-enterprise/pull/204) | Fixing auth                               |
| 0.0.1   | 2025-07-18 | [201](https://github.com/airbytehq/airbyte-enterprise/pull/201) | First iteration internally                |

</details>
