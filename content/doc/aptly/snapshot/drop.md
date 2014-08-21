---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot drop"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 90
---

aptly snapshot drop
-------------------

Drop removes information about snapshot. If snapshot is published, it
can't be dropped (first remove publishing for snapshot). If snapshot is
used as source for other snapshots (using merge or pull), aptly would
refuse to drop such snapshot, use flag `-force` to override this check.

Usage:

    $ aptly snapshot drop <name>

Params:

-   `name` is snapshot name which has been given during snapshot
    creation

Flags:

-   `-force=false`: drop snapshot even if it used as source in other
    snapshots

Dropping snapshot only removes metadata, in order to cleanup the disk
space occupied by package files you might need to run
[`aptly db cleanup`](/doc/aptly/db/cleanup/) command (package files would be
removed only if they're not referenced by mirrors and other snapshots
anymore).

Example:

    $ snapshot drop snap-wheezy
    Snapshot `snap-wheezy` has been dropped.
