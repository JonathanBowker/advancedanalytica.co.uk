---
generated_record: true
connector_name: Netsuite
connector_type: source
connector_slug: netsuite
connector_directory: source-netsuite
definition_id: 4f2f093d-ce44-4121-8118-9d13b7bfccd0
version: 0.1.29
support_level: community
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/sources/netsuite
logo: /images/connectors/sources/netsuite.svg
logo_source_path: airbyte-integrations/connectors/source-netsuite/icon.svg
logo_sha256: a56fec98500e46bbb997a3b68516f52d37ce3574c9534cf927bf204d495a6b3d
original_metadata_path: airbyte-integrations/connectors/source-netsuite/metadata.yaml
original_metadata_sha256: bad1397f6fa2b77684724aced3298332a5db863bfa89f0d5dd878eafbf61ef06
original_document_path: docs/integrations/sources/netsuite.md
original_document_sha256: 97bd3f33f0c7204c9f4ba1e110a1e0fecdd8a72f123207fef823c17a6edfacc5
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: de7d3a358fb42d0eed840f42ff0765fe707ee9b13729daf62856421fc792ecc1
rewritten_at: 2026-11-12T13:49:06.715884+00:00
---

# Oracle Netsuite

A unified business management suite covering ERP/Financials, CRM and ecommerce for more than 31,000 customers.

This connector implements the [SuiteTalk REST Web Services](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_1540391670.html) and uses the REST API to fetch customer data.

## Prerequisites

- Oracle NetSuite [account](https://system.netsuite.com/pages/customerlogin.jsp?country=US)
- Access to all Account permissions options

## Airbyte OSS and Airbyte Cloud

- Realm (Account ID)
- Consumer Key
- Consumer Secret
- Token ID
- Token Secret

## Setup guide

### Step 1: Create a NetSuite account

1. Create [account](https://system.netsuite.com/pages/customerlogin.jsp?country=US) on Oracle NetSuite
2. Confirm your email

### Step 2: Set up your NetSuite account

#### Step 2.1: Get Realm information

1. Sign in to your NetSuite [account](https://system.netsuite.com/pages/customerlogin.jsp?country=US)
2. Go to **Setup** » **Company** » **Company Information**
3. Copy your Account ID (Realm). It should look like **1234567** for the `Production` env. or **1234567_SB2** for a `Sandbox`

#### Step 2.2: Enable features

1. Go to **Setup** » **Company** » **Enable Features**
2. Select the **SuiteCloud** tab
3. Scroll to the **SuiteScript** section
4. Select the checkboxes for `CLIENT SUITESCRIPT` and `SERVER SUITESCRIPT`
5. Scroll to the **Manage Authentication** section
6. Select the `TOKEN-BASED AUTHENTICATION` checkbox
7. Scroll to **SuiteTalk (Web Services)**
8. Select the `REST WEB SERVISES` checkbox
9. Save your changes

#### Step 2.3: Create Integration and get Consumer Key and Consumer Secret

1. Go to **Setup** » **Integration** » **Manage Integrations** » **New**
2. Complete the **Name** field. `airbyte-rest-integration` is the recommended name.
3. Confirm that **State** is `enabled`
4. Select the `Token-Based Authentication` checkbox in the **Authentication** section
5. Save your changes
6. **Consumer Key** and **Consumer Secret** will appear once. Copy them to a safe place.

#### Step 2.4: Set up the Role

1. Go to **Setup** » **Users/Roles** » **Manage Roles** » **New**
2. Complete the **Name** field. `airbyte-integration-role` is the recommended name.
3. Scroll to the **Permissions** tab
4. (REQUIRED) Select `Transactions`. Manually `add` every dropdown entity with either `full` or `view` access level.
5. (REQUIRED) Select `Reports`. Manually `add` every dropdown entity with either `full` or `view` access level.
6. (REQUIRED) Select `Lists`. Manually `add` every dropdown entity with either `full` or `view` access level.
7. (REQUIRED) Select `Setup`. Manually `add` every dropdown entity with either `full` or `view` access level.

- Complete all `REQUIRED` steps correctly to avoid future sync issues.
- Edit these parameters again whenever you `rename` or `customise` any `Object` in Netsuite. This allows `airbyte-integration-role` to reflect those changes.

#### Step 2.5: Set up the User

1. Go to **Setup** » **Users/Roles** » **Manage Users**
2. In the `Name` column, select the user’s name you want to grant access to the `airbyte-integration-role`
3. Select the **Edit** button under the user’s name
4. Scroll to the **Access** tab at the bottom
5. From the dropdown list, select the `airbyte-integration-role` role you created in step 2.4
6. Save your changes

#### Step 2.6: Create an Access Token for the role

1. Go to **Setup** » **Users/Roles** » **Access Tokens** » **New**
2. Select an **Application Name**
3. Under **User**, select the user you assigned the `airbyte-integration-role` in step **2.4**
4. Inside **Role**, select the one you assigned to the user in step **2.5**
5. Under **Token Name**, give the Token a descriptive name. `airbyte-rest-integration-token` is the recommended name.
6. Save your changes
7. **Token ID** and **Token Secret** will appear once. Copy them to a safe place.

#### Step 2.7: Summary

You’ve copied these parameters:

- Realm (Account ID)
- Consumer Key
- Consumer Secret
- Token ID
- Token Secret

You’ve also correctly **Configured Account** with **Correct Permissions** and **Access Token** for the User and Role you created earlier.

### Step 3: Set up the source connector in Airbyte

### Airbyte Cloud

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. Select **Sources** in the left navigation bar. Then select **+ new source** in the top-right corner.
3. On the source setup page, select **NetSuite** from the Source type dropdown. Enter a name for this connector.
4. Add **Realm**
5. Add **Consumer Key**
6. Add **Consumer Secret**
7. Add **Token ID**
8. Add **Token Secret**
9. Select `Set up source`.

### Airbyte OSS

1. Go to your local Airbyte page.
2. Select **Sources** in the left navigation bar. Then select **+ new source** in the top-right corner.
3. On the source setup page, select **NetSuite** from the Source type dropdown. Enter a name for this connector.
4. Add **Realm**
5. Add **Consumer Key**
6. Add **Consumer Secret**
7. Add **Token ID**
8. Add **Token Secret**
9. Select `Set up source`

## Supported sync modes

The NetSuite source connector supports these [sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh
- Incremental

## Supported streams

- Stream generation depends on `ROLE`, `USER` access to streams and `Account` settings.
- Use the correct assigned role, such as `airbyte-integration-role` in this case, or another custom `ROLE` granted to the Access Token.
- The role must have access to the NetSuite objects required for data sync.
- See **Setup guide** > **Step 2.4** and **Setup guide** > **Step 2.5**.

## Performance considerations

The connector is restricted by Netsuite [Concurrency Limit per Integration](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/bridgehead_156224824287.html).

## IP allow list

If you use Airbyte Cloud and your organisation restricts access to specific IPs, add the [Airbyte Cloud IP addresses](https://docs.airbyte.com/platform/operating-airbyte/ip-allowlist) to your allow list.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                             | Subject                                                   |
|:--------|:-----------|:---------------------------------------------------------|:----------------------------------------------------------|
| 0.1.29 | 2026-09-15 | [79191](https://github.com/airbytehq/airbyte/pull/79191) | Emit warning and fail sync when >50% of records are silently skipped due to NetSuite workflow locks (USER_ERROR) |
| 0.1.28 | 2026-08-17 | [79654](https://github.com/airbytehq/airbyte/pull/79654) | Fix incremental sync permanently dropping records modified between the sync time and account-local midnight; retry a rejected date format on the same slice instead of skipping it |
| 0.1.27 | 2025-10-14 | [67787](https://github.com/airbytehq/airbyte/pull/67787) | Update dependencies |
| 0.1.26 | 2025-10-07 | [67429](https://github.com/airbytehq/airbyte/pull/67429) | Update dependencies |
| 0.1.25 | 2025-09-30 | [66934](https://github.com/airbytehq/airbyte/pull/66934) | Update dependencies |
| 0.1.24 | 2025-09-24 | [66623](https://github.com/airbytehq/airbyte/pull/66623) | Update dependencies |
| 0.1.23 | 2025-09-09 | [65813](https://github.com/airbytehq/airbyte/pull/65813) | Update dependencies |
| 0.1.22 | 2025-08-23 | [65215](https://github.com/airbytehq/airbyte/pull/65215) | Update dependencies |
| 0.1.21 | 2025-08-16 | [61055](https://github.com/airbytehq/airbyte/pull/61055) | Update dependencies |
| 0.1.20 | 2025-08-12 | [63698](https://github.com/airbytehq/airbyte/pull/63698) | Add support for german date format in NetSuite input |
| 0.1.19 | 2025-05-24 | [60581](https://github.com/airbytehq/airbyte/pull/60581) | Update dependencies |
| 0.1.18 | 2025-05-10 | [60086](https://github.com/airbytehq/airbyte/pull/60086) | Update dependencies |
| 0.1.17 | 2025-05-03 | [59481](https://github.com/airbytehq/airbyte/pull/59481) | Update dependencies |
| 0.1.16 | 2025-04-27 | [59091](https://github.com/airbytehq/airbyte/pull/59091) | Update dependencies |
| 0.1.15 | 2025-04-19 | [58531](https://github.com/airbytehq/airbyte/pull/58531) | Update dependencies |
| 0.1.14 | 2025-04-12 | [57860](https://github.com/airbytehq/airbyte/pull/57860) | Update dependencies |
| 0.1.13 | 2025-04-05 | [57301](https://github.com/airbytehq/airbyte/pull/57301) | Update dependencies |
| 0.1.12 | 2025-03-29 | [56692](https://github.com/airbytehq/airbyte/pull/56692) | Update dependencies |
| 0.1.11 | 2025-03-22 | [56060](https://github.com/airbytehq/airbyte/pull/56060) | Update dependencies |
| 0.1.10 | 2025-03-08 | [55455](https://github.com/airbytehq/airbyte/pull/55455) | Update dependencies |
| 0.1.9 | 2025-03-05 | [55207](https://github.com/airbytehq/airbyte/pull/55207) | Add support for additional date format in Netsuite input |
| 0.1.8 | 2025-03-01 | [54821](https://github.com/airbytehq/airbyte/pull/54821) | Update dependencies |
| 0.1.7 | 2025-02-22 | [54363](https://github.com/airbytehq/airbyte/pull/54363) | Update dependencies |
| 0.1.6 | 2025-02-15 | [53853](https://github.com/airbytehq/airbyte/pull/53853) | Update dependencies |
| 0.1.5 | 2025-02-08 | [53243](https://github.com/airbytehq/airbyte/pull/53243) | Update dependencies |
| 0.1.4 | 2024-07-29 | [42857](https://github.com/airbytehq/airbyte/pull/42857) | Migrate connector to Poetry |
| 0.1.3 | 2023-01-20 | [21645](https://github.com/airbytehq/airbyte/pull/21645) | Minor issues fix, Setup Guide corrections for public docs |
| 0.1.1 | 2022-09-28 | [17304](https://github.com/airbytehq/airbyte/pull/17304) | Migrate to per-stream state |
| 0.1.0 | 2022-09-15 | [16093](https://github.com/airbytehq/airbyte/pull/16093) | Initial Alpha release |

</details>
