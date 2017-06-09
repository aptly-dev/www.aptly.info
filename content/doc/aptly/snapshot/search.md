---
date: "2014-08-29T11:17:38Z"
title: "aptly snapshot search"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 75
---

aptly snapshot search
---------------------

Search snapshot for packages matching query.

Usage:

    $ aptly snapshot search <name> [<package-query>]

Params are:

-   `name` is snapshot name which has been given during snapshot
    creation
-   `package-query` is a [package query](/doc/feature/query/) to
    search for packages

If package query is omitted, all the packages are displayed.

Flags:

-   `-format=""`:
    [custom format](/doc/feature/package-display/) for result printing
-   `-with-deps=false`: include [dependencies](/doc/feature/dependencies) of matching packages
    into search results

Example:

    $ aptly snapshot search backports 'nginx, !Name (% *-light)'
    nginx_1.6.0-1~bpo70+1_all
    nginx-full_1.6.0-1~bpo70+1_amd64
    nginx-extras_1.6.0-1~bpo70+1_i386
    nginx-extras_1.6.0-1~bpo70+1_amd64
    nginx-full_1.6.0-1~bpo70+1_i386
    nginx-naxsi_1.6.0-1~bpo70+1_amd64
    nginx-naxsi_1.6.0-1~bpo70+1_i386
