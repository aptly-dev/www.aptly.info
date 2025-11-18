---
date: "2025-11-18T00:00:00Z"
title: "Mirror from Google Artifact Registry"
menu:
    doc:
        weight: 50
        parent: Features
---

Mirror from Google Artifact Registry
---------------------------------

Aptly supports mirroring Debian packages from Google Artifact Registry with automatic authentication using the special `ar+https://` URL scheme.

Google Artifact Registry is a universal package manager that can host Debian packages. When using the `ar+https://` scheme, aptly automatically obtains OAuth2 access tokens and handles authentication transparently.

Prerequisites:

To use this feature, you need to have Google Cloud credentials configured. Aptly uses Application Default Credentials (ADC). For details on how to set up authentication, see the [Application Default Credentials documentation](https://cloud.google.com/docs/authentication/application-default-credentials).

GPG Key Setup:

Google Artifact Registry repositories are signed with Google's GPG key. You need to import this key before creating a mirror.

Option 1: Import into aptly's default keyring

Import Google's GPG key into `trustedkeys.gpg`:

    $ wget -O - https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --no-default-keyring --keyring trustedkeys.gpg --import

Option 2: Use a custom keyring

If you prefer to use a separate keyring, create and use it with the `-keyring` flag:

    $ curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor | sudo tee /etc/apt/keyrings/google-artifact-registry-repository-signer.gpg > /dev/null
    $ aptly mirror create -keyring=/etc/apt/keyrings/google-artifact-registry-repository-signer.gpg <name> ar+https://...
    $ aptly mirror update -keyring=/etc/apt/keyrings/google-artifact-registry-repository-signer.gpg <name>

Usage:

To create a mirror of a repository hosted on Google Artifact Registry, use the `ar+https://` URL scheme.

Create a mirror from Google Artifact Registry:

    $ aptly mirror create <name> ar+https://<location>-apt.pkg.dev/projects/<project_id> <repository> main

Params are:

-   `name` is a name that would be used in aptly to reference this mirror
-   `location` is the regional or multi-regional [location](http://docs.cloud.google.com/artifact-registry/docs/repositories/repo-locations) of the repository
-   `project_id` is the project ID of the repository
-   `repository` is the name of the Artifact Registry repository

Update the mirror:

    $ aptly mirror update <name>


Authentication Details:

When using the `ar+https://` scheme:

1.  Aptly automatically obtains an OAuth2 access token using your configured credentials (on first request)
2.  The token is added to each HTTP request as an `Authorization: Bearer` header
3.  The `ar+https://` scheme is transparently converted to `https://` for the actual request
4.  Tokens are automatically refreshed as needed
5.  If credential initialization fails, aptly will attempt the request without authentication (may result in 403 errors)

Permissions Required:

The service account or user account needs the following IAM permissions:

-   `artifactregistry.repositories.downloadArtifacts`
-   `artifactregistry.repositories.get`
-   `artifactregistry.repositories.list`

These are included in the `roles/artifactregistry.reader` role.

Troubleshooting:

If you get a 403 error:

1.  Check that the service account has the required permissions
2.  Check the ADC setup and ensure the correct credentials are being used


See Also:

-   [Aptly Mirror Command](../aptly/mirror.md)
-   [Google Artifact Registry Documentation](https://cloud.google.com/artifact-registry/docs)
-   [Google Artifact Registry / Manage Debian packages](https://cloud.google.com/artifact-registry/docs/os-packages/debian)
-   [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials)

