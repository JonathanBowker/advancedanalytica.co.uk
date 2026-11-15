---
generated_record: true
connector_name: Vertica
connector_type: destination
connector_slug: vertica
connector_directory: destination-vertica
definition_id: ca81ee7c-3163-9678-af40-094cc31e5e42
version: 0.1.0
support_level: archived
release_stage: alpha
documentation_url: https://docs.airbyte.com/integrations/destinations/vertica
logo: /images/connectors/destinations/vertica.svg
logo_source_path: airbyte-integrations/connectors/destination-vertica/icon.svg
logo_sha256: 324294600ea6562928df8dd55e2133af84f81b649b5de6862e7fff4e36b63238
original_metadata_path: airbyte-integrations/connectors/destination-vertica/metadata.yaml
original_metadata_sha256: aba9633b03986703eea003507479677117490d00abede7e3f21f7da11aeb2a63
original_document_path: docs/integrations/destinations/vertica.md
original_document_sha256: 8ed5f4f7c9ca3c18d6eb51f6b34fd99a858aff86b0543f513ffee8344d814b99
rewrite_status: complete
rewrite_policy: advanced-analytica.standards.verbal-identity.tone-of-voice
rewrite_policy_version: 2.5.4
rewrite_model: codex-default
rewrite_source_sha256: 0cde89abae918376d910da91627b4ce6d14df0e6c6f52d9fd8d120b8c9a3a935
rewritten_at: 2026-11-12T13:28:32.156990+00:00
---

# Vertica

Set up the Vertica destination connector using this guide.

## Prerequisites

To use the Vertica destination, you'll need:

- A Vertica server running version 11.0 or later

Airbyte Cloud only supports SSL or TLS encrypted connections to your Vertica instances. TLS is used by default.
You can follow the open-source instructions below for everything else.

You'll need this information to configure the Vertica destination:

- **Host** - The server's host name.
- **Port** - The port where the server listens. The default is the standard VSQL™ port number (5433).
- **Username**
- **Password**
- **Default Schema Name** - Specify the schema or several comma-separated schemas for the search-path. These schemas resolve unqualified object names in statements executed through this connection.
- **Database** - The database name. By default, the connection uses a database matching the user name.
- **JDBC URL Params** (optional)

[Refer to this guide for more details](https://www.vertica.com/docs/12.0.4/HTML/Content/Authoring/ConnectingToVertica/ClientJDBC/JDBCConnectionProperties.htm)

#### Configure network access

Make sure Airbyte can access your Vertica database. If your database is within a VPC, allow access from the IP exposing Airbyte.

## Step 1: Set up Vertica

#### **Permissions**

You need a Vertica user with these permissions:

- Can create tables and write rows.
- Can create schemas, for example:

Create a user with these permissions by running:

```
CREATE USER airbyte_user WITH PASSWORD '<password>';
GRANT CREATE, TEMPORARY ON DATABASE <database> TO airbyte_user;
```

You can use an existing user. However, creating a dedicated user for Airbyte is highly recommended.

## Step 2: Set up the Vertica connector in Airbyte

#### Choose a target database

Choose an existing database or create one to store data synced from Airbyte.

## Naming conventions

From [Vertica SQL Identifiers syntax](https://www.vertica.com/docs/12.0.x/HTML/Content/Authoring/ConnectingToVertica/ClientJDBC/ExecutingQueriesThroughJDBC.htm?tocpath=Connecting%20to%20Vertica%7CClient%20Libraries%7CProgramming%20JDBC%20Client%20Applications%7C_____4):

- SQL identifiers and key words must start with a letter or underscore \(\_\). Letters include a-z, letters with diacritical marks and non-Latin letters.
- Later characters can be letters, underscores, digits \(0-9\) or dollar signs \($\).

  The SQL standard doesn't allow dollar signs in identifiers, so using them may make applications less portable.
  The SQL standard won't define a key word containing digits or starting or ending with an underscore.
  Identifiers in these forms are therefore safe from possible conflicts with future standard extensions.

- The system uses no more than NAMEDATALEN-1 bytes of an identifier. You can write longer names in commands, but the system truncates them. By default, NAMEDATALEN is 64, so identifiers can contain up to 63 bytes.
- Quoted identifiers can contain any character except the character with code zero. \(To include a double quote, write two double quotes.\) This supports otherwise invalid table or column names, including names with spaces or ampersands. The length limit still applies.
- Quoted identifiers are case-sensitive, while unquoted names are always converted to lower case.
- Use consistent quoting for each name to make your applications more portable and reduce errors. Either always quote a name or never quote it.

The Airbyte Vertica destination creates tables and schemas with Unquoted identifiers where possible. It uses Quoted Identifiers when names contain special characters.

**For Airbyte Cloud:**

1. [Log into your Airbyte Cloud](https://cloud.airbyte.com/workspaces) account.
2. In the left navigation bar, click **Destinations**. In the top-right corner, click **new destination**.
3. On the Set up the destination page, name the Vertica connector. Then select **Vertica** from the Destination type dropdown.
4. Enter a name for your source.
5. For **Host**, **Port**, and **DB Name**, enter your Vertica database's hostname, port number, and name.
6. List the **Default Schemas**.
   :::note
   Schema names are case-sensitive. The 'public' schema is set by default. You can use several schemas at once. If you don't specify schemas, all existing schemas will sync.
   :::
7. For **User** and **Password**, enter the username and password you created in [Step 1](#step-1-optional-create-a-dedicated-read-only-user).
8. For Airbyte Open Source, toggle the switch to connect using SSL. Airbyte Cloud uses SSL by default.
9. For SSL Modes, select:
   - **disable** to disable encrypted communication between Airbyte and the source
   - **allow** to enable encrypted communication only when the source requires it
   - **prefer** to allow unencrypted communication only when the source doesn't support encryption
   - **require** to always require encryption. The connection will fail if the source doesn't support encryption.
   - **verify-ca** to always require encryption and verify that the source has a valid SSL certificate
   - **verify-full** to always require encryption and verify the source's identity
10. To customise the JDBC connection beyond common options, enter additional supported [JDBC URL parameters](https://www.vertica.com/docs/12.0.x/HTML/Content/Authoring/ConnectingToVertica/ClientJDBC/JDBCConnectionProperties.htm) in the **JDBC URL Parameters (Advanced)** field. Use key-value pairs separated by the symbol &.

    Example: key1=value1&key2=value2&key3=value3

    These parameters are added to the end of the JDBC URL that the AirByte uses to connect to your Vertica database.

    The connector supports `connectTimeout` and defaults to 60 seconds. Setting connectTimeout to 0 seconds sets the timeout to the longest available time.

    **Note:** Don't use these keys in the JDBC URL Params field because Airbyte will overwrite them:
    `currentSchema`, `user`, `password`, `ssl`, and `sslmode`.

    :::warning
    This is an advanced configuration option. Use it with caution.
    :::

11. For SSH Tunnel Method, select:

    - **No Tunnel** to connect directly to the database
    - **SSH Key Authentication** to use an RSA Private as your secret for the SSH tunnel
    - **Password Authentication** to use a password as your secret for the SSH tunnel

    :::warning
    Airbyte Cloud requires encrypted communication. Select **SSH Key Authentication** or **Password Authentication** if you selected **disable**, **allow**, or **prefer** as the **SSL Mode**. Otherwise, the connection will fail.
    :::

12. Click **Set up destination**.

## Supported sync modes

The Vertica destination connector supports these [ sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

| Feature                        | Supported?\(Yes/No\) | Notes |
| :----------------------------- | :------------------- | :---- |
| Full Refresh Sync              | Yes                  |       |
| Incremental - Append Sync      | No                   |       |
| Incremental - Append + Deduped | No                   |       |
| Namespaces                     | No                   |       |

## Schema map

#### Output schema

Each stream maps to a separate table in Vertica. Each table contains three columns:

- `_airbyte_ab_id`: a uuid that Airbyte assigns to each processed event. Its Vertica column type is `VARCHAR`.
- `_airbyte_emitted_at`: a timestamp showing when the event was pulled from the data source. Its Vertica column type is `TIMESTAMP WITH TIME ZONE`.
- `_airbyte_data`: a json blob containing the event data. Its Vertica column type is `JSONB`.

## Changelog

<details>
  <summary>Expand to review</summary>

| Version | Date       | Pull Request                                               | Subject                 |
| :------ | :--------- | :--------------------------------------------------------- | :---------------------- |
| 0.1.0   | 2023-05-29 | [\#25682](https://github.com/airbytehq/airbyte/pull/25682) | Add Vertica Destination |

</details>
