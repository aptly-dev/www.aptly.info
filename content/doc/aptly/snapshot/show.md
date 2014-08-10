---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot show"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 30
---

aptly snapshot show
-------------------

Shows detailed information about snapshot. Full list of packages in the
snapshot is displayed as well.

Usage:

    $ aptly snapshot show <name>

Params:

-   `name` is snapshot name which has been given during snapshot
    creation

Flags:

-   `-with-packages=false`: show detailed list of packages and versions
    stored in the mirror

Example:

    $ aptly snapshot show back
    Name: back
    Created At: 2013-12-24 15:39:29 MSK
    Description: Snapshot from mirror [backports2]: http://mirror.yandex.ru/backports.org/ squeeze-backports
    Number of packages: 3898
    Packages:
      altos-1.0.3~bpo60+1_i386
      amanda-client-1:3.3.1-3~bpo60+1_amd64
      ...

 
