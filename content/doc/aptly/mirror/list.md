---
date: "2014-08-08T11:17:38Z"
title: "aptly mirror list"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 30
---

aptly mirror list
-----------------

Shows list of created remote repository mirrors.

Usage:

    $ aptly mirror list

Flags:

-   `-raw`: display list in machine-readable format

Examples:

    $ aptly mirror list
    List of mirrors:
     * [backports]: http://mirror.yandex.ru/backports.org/ squeeze-backports
     * [debian-main]: http://ftp.ru.debian.org/debian/ squeeze

To get more information about repository, run `aptly mirror show <name>`.

    $ aptly mirror list -raw
    backports
    debian-main
