---
date: "2014-08-08T11:17:38Z"
title: "aptly mirror drop"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 70
---

aptly mirror drop
-----------------

Drop deletes information about remote repository mirror. Package data is
not deleted (it could be still used by other mirrors or snapshots). If
mirror is used as source to create a snapshot, aptly would refuse to
delete such mirror, use flag `-force` to override.

Usage:

    $ aptly mirror drop <name>

Params:

-   `name` is mirror name which has been given during mirror creation

Flags:

-   `-force=false`: drop mirror even if it used as source of some
    snapshot

Dropping mirror only removes metadata about the mirror, in order to
cleanup the disk space occupied by package files you might need to run
[`aptly db cleanup`](/doc/aptly/db/cleanup/) command.

Example:

    $ aptly mirror drop -force wheezy-main
    Mirror `wheezy-main` has been removed.
