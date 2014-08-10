---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot rename"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 80
---

aptly snapshot rename
---------------------

Command changes name of the snapshot. Snapshot name should be unique.

Usage:

    $ aptly snapshot rename <old-name> <new-name>

Params:

-   `old-name` is current snapshot name
-   `new-name` is new snapshot name

Example:

    $ aptly snapshot rename whezy-main wheezy-main

    Snapshot whezy-main -> wheezy-main has been successfully renamed.

 