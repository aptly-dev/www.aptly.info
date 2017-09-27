---
date: "2014-08-08T11:17:38Z"
title: "aptly repo drop"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 110
---


aptly repo drop
---------------

Drop deletes information about local package repository. Package data is
not deleted (it could be still used by other mirrors or snapshots). If
snapshot has been created from local repository, aptly would refuse to
delete such repository, use flag `-force` to override.

Usage:

    $ aptly repo drop <name>

Params:

-   `name` is local repository name

Flags:

-   `-force`: drop repository even if it used as source of some
    snapshot

Dropping local repository only removes metadata, in order to cleanup the
disk space occupied by package files you might need to run
[`aptly db cleanup`](/doc/aptly/db/cleanup/) command.

Example:

    $ aptly repo drop stable
    Local repo `stable` has been removed.

 