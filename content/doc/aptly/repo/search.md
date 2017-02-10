---
date: "2014-08-29T11:17:38Z"
title: "aptly repo search"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 85
---

aptly repo search
-----------------

Search local repositories for packages matching query.

Usage:

    $ aptly repo search <name> [<package-query>]

Params are:

-   `name` is a repo name (given when repo was created)
-   `package-query` is a [package query](/doc/feature/query/) to
    search for packages

If package query is omitted, all the packages are displayed.

Flags:

-   `-format=""`:
    [custom format](/doc/feature/package-display/) for result printing
-   `-with-deps=false`: include dependencies of matching packages
    into search results

Example:

    $ aptly repo search internal-pkg 'Version (>= 4.5)'
    libtinfo5_5.9-10_i386
    perl-base_5.14.2-21+deb7u1_amd64
    ncurses-base_5.9-10_all
    xz-utils_5.1.1alpha+20120614-2_i386
    gcc-4.7-base_4.7.2-5_amd64
    libtinfo5_5.9-10_amd64
    base-files_7.1wheezy5_i386
    ncurses-bin_5.9-10_i386
    xz-utils_5.1.1alpha+20120614-2_amd64
    liblzma5_5.1.1alpha+20120614-2_i386
    coreutils_8.13-3.5_amd64
    liblzma5_5.1.1alpha+20120614-2_amd64
    libncurses5_5.9-10_amd64
    coreutils_8.13-3.5_i386
    libncurses5_5.9-10_i386
    perl-base_5.14.2-21+deb7u1_i386
    base-files_7.1wheezy5_amd64
    ncurses-bin_5.9-10_amd64
    gcc-4.7-base_4.7.2-5_i386
