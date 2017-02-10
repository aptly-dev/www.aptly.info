---
date: "2014-08-29T11:17:38Z"
title: "aptly mirror search"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 55
---

aptly mirror search
-------------------

Search mirror for packages matching query.

Usage:

    $ aptly mirror search <name> [<package-query>]

Params are:

-   `name` is a mirror name (given when mirror was created)
-   `package-query` is a [package query](/doc/feature/query/) to
    search for packages

If package query is omitted, all the packages are displayed.

Flags:

-   `-format=""`:
    [custom format](/doc/feature/package-display/) for result printing
-   `-with-deps=false`: include dependencies of matching packages
    into search results

Example:

    $ aptly mirror search wheezy 'Name (% nginx*), $Architecture (i386), !Name (% *-dbg)'
    nginx-full_1.2.1-2.2+wheezy2_i386
    nginx-extras_1.2.1-2.2+wheezy2_i386
    nginx-light_1.2.1-2.2+wheezy2_i386
    nginx-common_1.2.1-2.2+wheezy2_all
    nginx-doc_1.2.1-2.2+wheezy2_all
    nginx-naxsi-ui_1.2.1-2.2+wheezy2_all
    nginx_1.2.1-2.2+wheezy2_all
    nginx-naxsi_1.2.1-2.2+wheezy2_i386
