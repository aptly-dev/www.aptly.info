---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot list"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 20
---

aptly snapshot list
-------------------

Displays list of all created snapshots.

Usage:

    $ aptly snapshot list

Flags:

-   `-raw`: display list in machine-readable format
-   `-sort="name"`: display list in 'name' or creation 'time' order

Examples:

    $ aptly snapshot list
    List of snapshots:
     * [monday-updates]: Snapshot from mirror [backports2]: http://mirror.yandex.ru/backports.org/ squeeze-backports
     * [back]: Snapshot from mirror [backports2]: http://mirror.yandex.ru/backports.org/ squeeze-backports

    To get more information about snapshot, run `aptly snapshot show <name>`.

In snapshot list, basic description on the way snapshot has been created is
displayed.

    $ aptly snapshot list -raw
    monday-updates
    back

 
