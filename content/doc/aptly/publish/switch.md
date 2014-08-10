---
date: "2014-08-08T11:17:38Z"
title: "aptly publish switch"
tags:
    - command
menu:
    doc:
        parent: aptly publish
        weight: 40
---

aptly publish switch
--------------------

Command switches in-place published repository with new snapshot
contents. `distribution` and `prefix` should be occupied with snapshot
published using command [aptly publish
snapshot](#aptly-publish-snapshot). Update happens in-place with minimum
possible downtime for published repository. Valid [GPG key](#gpg-keys)
is required for publishing.

When published repository is updated, all the options are preserved:
distribution, component, list of architectures, etc.

Usage:

    $ aptly publish switch <distribution> [[<endpoint:>]<prefix>] <new-snapshot>

Params:

-   `distribution` is distribution name of published repository
-   `endpoint` is publishing endpoint, if not specified, it would
    default to empty endpoint (local file system).
-   `prefix` is publishing prefix, if not specified, it would default to
    empty prefix (`.`).
-   `new-snapshot` is a snapshot name that snould be re-published

Flags:

-   `-component=""`: list of components to update (separate components
    with commas)
-   `-force-overwrite=false`: overwrite packages files in the pool even
    if content is different (see also [duplicate
    packages](#duplicate-packages))
-   `-gpg-key=""`: GPG key ID to use when signing the release, if not
    specified default key is used
-   `-keyring=""`: GPG keyring to use (instead of default)
-   `-secret-keyring=""`: GPG secret keyring to use (instead of default)
-   `-skip-signing=false`: don't sign Release files with GPG

When switching published snapshots for multiple component repositories
any subset of snapshots could be updated, they should be listed on
command line with `-component` flag:

    $ aptly publish switch -component=main,contrib wheezy wheezy-main wheezy-contrib

Flag `-component` could be omitted for single-component published
repositories.

Example:

    $ aptly publish switch wheezy wheezy-7.4
    Loading packages...
    Generating metadata files and linking package files...
    Signing file '/var/aptly/public/dists/wheezy/Release.tmp' with gpg, please enter your passphrase when prompted:

    <<gpg asks for passphrase>>

    Clearsigning file '/var/aptly/public/dists/wheezy/Release.tmp' with gpg, please enter your passphrase when prompted:

    <<gpg asks for passphrase>>

    Cleaning up prefix "." component "main"...

    Publish for local repo ./wheezy [i386, amd64] publishes {main: [wheezy-7.4]: snapshot from mirror [wheezy]: http://ftp.ru.debian.org/debian/ wheezy} has been successfully updated.

 