---
date: "2014-08-08T11:17:38Z"
title: "aptly repo list"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 50
---

aptly repo list
---------------

Commands list displays list of all local package repositories.

Usage:

    $  aptly repo list

Flags:

-   `-raw=false`: display list in machine-readable format

Examples:

    $ aptly repo list
    List of local repos:
     * [stable]: Stable packages for project Foo (packages: 10)
     * [testing] (packages: 1)

To get more information about local repository, run `aptly repo show <name>`.

    $ aptly repo list -raw
    stable
    testing

 