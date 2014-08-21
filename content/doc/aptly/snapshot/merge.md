---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot merge"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 70
---

aptly snapshot merge
--------------------

Command merges several `source` snapshots into new `destination` snapshot.
Merge happens from left to right. By default, packages with the same
name-architecture pair are replaced during merge (package from latest snapshot on the list wins).

With `-latest` flag, package with latest version wins. With `-no-remove`
flag, all versions of packages are preserved during merge.

If only one snapshot is specified, merge copies `source` into `destination`.

Usage:

    $ aptly snapshot merge <destination> <source> [<source>...]

Params:

-   `destination` is a name of the snapshot that would be created
-   `source` is a list of snapshot names that would be merged together

Flags:

-   `-latest=false`: use only the latest version of each package
-   `-no-remove=false`: don't remove duplicate arch/name packages

Example:

    $ aptly snapshot merge debian-w-backports debian-main debian-backports

    Snapshot debian-w-backports successfully created.
    You can run 'aptly publish snapshot debian-w-backports' to publish snapshot as Debian repository.

 
