---
date: "2014-08-08T11:17:38Z"
title: "aptly repo rename"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 100
---


aptly repo rename
-----------------

Command changes name of the local repository. Local repository name
should be unique.

Usage:

    $ aptly repo rename <old-name> <new-name>

Params:

-   `old-name` is current local repository name
-   `new-name` is new local repository name

Example:

    $ aptly repo rename whezy-main wheezy-main

    Local repository whezy-main -> wheezy-main has been successfully renamed.
