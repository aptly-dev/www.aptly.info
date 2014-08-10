---
date: "2014-08-08T11:17:38Z"
title: "aptly mirror rename"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 60
---

aptly mirror rename
-------------------

Command changes name of the mirror. Mirror name should be unique.

Usage:

    $ aptly mirror rename <old-name> <new-name>

Params:

-   `old-name` is current mirror name
-   `new-name` is new mirror name

Example:

    $ aptly mirror rename whezy-main wheezy-main

    Mirror whezy-main -> wheezy-main has been successfully renamed.

