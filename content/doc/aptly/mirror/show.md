---
date: "2014-08-08T11:17:38Z"
title: "aptly mirror show"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 40
---

aptly mirror show
-----------------

Shows detailed information about mirror.

Usage:

    $ aptly mirror show <name>

Params are:

-   `name` is a mirror name (given when mirror was created)

Flags:

-   `-with-packages=false`: show detailed list of packages and versions
    stored in the mirror

Example:

    $ aptly mirror show backports2
    Name: backports2
    Archive Root URL: http://mirror.yandex.ru/backports.org/
    Distribution: squeeze-backports
    Components: main, contrib, non-free
    Architectures: i386, amd64
    Last update: 2013-12-27 19:30:19 MSK
    Number of packages: 3898

    Information from release file:
    ...

In detailed information basic information about mirror is displayed:
filters by component & architecture, timestamp of last successful
repository fetch and number of packages.
