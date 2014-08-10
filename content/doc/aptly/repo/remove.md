---
date: "2014-08-08T11:17:38Z"
title: "aptly repo remove"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 80
---

aptly repo remove
-----------------

Command `remove` deletes packages matching [package
query](#package-query) from local repo `name`.

Usage:

    $  aptly repo remove <name> <package-query> ...

Params are:

-   `name` packages would be removed in this local repository
-   `package-query` list of [package queries](#package-query)

Flags:

-   `-dry-run=false`: don't remove, just show what would be removed

When packages are removed from local repository, only references to
those packages are removed. If packages are part of any snapshot, this
action won't remove them from snapshot. If there are no references to
the packages, package files and metadata could be cleaned up by running
command [aptly db cleanup](#aptly-db-cleanup).

Example:

    $ aptly repo remove stable percona-server-client-5.5
    Loading packages...
    [-] percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_i386 removed
    [-] percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_amd64 removed

 