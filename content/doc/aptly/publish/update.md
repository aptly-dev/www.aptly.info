---
date: "2014-08-08T11:17:38Z"
title: "aptly publish update"
tags:
    - command
menu:
    doc:
        parent: aptly publish
        weight: 30
---

aptly publish update
--------------------

Command re-publishes (updates) published local repository.
`distribution` and `prefix` should be occupied with local repository
published using command [`aptly publish repo`](/doc/aptly/publish/repo/).
Update happens in-place with minimum possible downtime for published
repository. Valid [GPG key](/doc/aptly/publish/) is required for publishing.

When published repository is updated, all the options are preserved:
distribution, component, list of architectures, etc.

Usage:

    $ aptly publish update <distribution> [[<endpoint:>]<prefix>]

Params:

-   `distribution` is distribution name of published repository
-   `endpoint` is publishing endpoint, if not specified, it would
    default to empty endpoint (local file system).
-   `prefix` is publishing prefix, if not specified, it would default to
    empty prefix (`.`).

Flags:

-   `-batch`: run GPG with detached tty (useful when running from crontab)
-   `-force-overwrite=false`: overwrite packages files in the pool even
    if content is different (see also [duplicate packages](/doc/feature/duplicate/))
-   `-gpg-key=""`: GPG key ID to use when signing the release, if not
    specified default key is used
-   `-keyring=""`: GPG keyring to use (instead of default)
-   `-passphrase=""`: GPG passphrase to unlock private key (possibly insecure)
-   `-passphrase-file=""`: GPG passphrase file to unlock private key (possibly insecure)
-   `-secret-keyring=""`: GPG secret keyring to use (instead of default)
-   `-skip-contents=false`: don't generate Contents indexes (setting would
    be stored permanently for published repository)
-   `-skip-cleanup`: don't remove unreferenced files in prefix/component
-   `-skip-signing=false`: don't sign Release files with GPG

When updating multiple-component published repository, all local
repositories are updated simultaneously.

Example:

    $ aptly publish update maverick
    Loading packages...
    Generating metadata files and linking package files...
    Signing file '/var/aptly/public/dists/maverick/Release.tmp' with gpg, please enter your passphrase when prompted:

    <<gpg asks for passphrase>>

    Clearsigning file '/var/aptly/public/dists/maverick/Release.tmp' with gpg, please enter your passphrase when prompted:

    <<gpg asks for passphrase>>

    Cleaning up prefix "." component "main"...

    Publish for local repo ./maverick [i386, source] publishes {main: [local-repo]} has been successfully updated.

 
