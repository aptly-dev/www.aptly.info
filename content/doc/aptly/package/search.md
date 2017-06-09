---
date: "2014-08-29T11:17:38Z"
title: "aptly package search"
tags:
    - command
menu:
    doc:
        parent: aptly package
        weight: 10
---

aptly package search
--------------------

Search whole package database for packages matching query.
Whole database of packages includes all packages (deduplicated)
from all the mirrors, local repos and snapshots.

In order to get more detailed information about the package,
use [`aptly package show`](/doc/aptly/package/show/) command.

Usage:

    $ aptly package search [<package-query>]

Params are:

-   `package-query` is a [package query](/doc/feature/query/) to
    search for packages

If package query is omitted, all the packages are displayed.

Flags:

-   `-format=""`:
    [custom format](/doc/feature/package-display/) for result printing

If no package are found, aptly exits with code 1 (failure).

Example:

    $ aptly package search 'Version (>=1.2.3-2), Version (<1.2.3-3)'
    libibmad-dev_1.2.3-20090314-1.1_amd64
    libibumad-dev_1.2.3-20090314-1.1_i386
    libibumad1_1.2.3-20090314-1.1_amd64
    libibumad1_1.2.3-20090314-1.1_i386
    libghc-uuid-dev_1.2.3-2+b3_amd64
    python-mysqldb_1.2.3-2_i386
    libibumad-dev_1.2.3-20090314-1.1_amd64
    libibmad_1.2.3-20090314-1.1_source
    python-mysqldb_1.2.3-2_amd64
    jpegoptim_1.2.3-2+b2_i386
    libghc-uuid-doc_1.2.3-2_all
    libjibx1.2-java-doc_1.2.3-2_all
    bwbar_1.2.3-2_amd64
    libghc-certificate-doc_1.2.3-2_all
    haskell-certificate_1.2.3-2_source
    bwbar_1.2.3-2_i386
    jpegoptim_1.2.3-2_source
    libghc-certificate-dev_1.2.3-2_amd64
    libibmad1_1.2.3-20090314-1.1_i386
    libibmad-dev_1.2.3-20090314-1.1_i386
    libjibx1.2-java_1.2.3-2_source
    python-mysqldb-dbg_1.2.3-2_i386
    shush_1.2.3-2_i386
    moksha.common_1.2.3-2~bpo70+1_source
    libghc-certificate-prof_1.2.3-2_i386
    libghc-uuid-prof_1.2.3-2+b3_amd64
    libghc-uuid-prof_1.2.3-2+b4_i386
    shush_1.2.3-2_source
    libghc-certificate-prof_1.2.3-2_amd64
    libjibx1.2-java_1.2.3-2_all
    libjibx-java_1.2.3-2_all
    libghc-uuid-dev_1.2.3-2+b4_i386
    python-mysqldb_1.2.3-2_source
    haskell-uuid_1.2.3-2_source
    libibumad_1.2.3-20090314-1.1_source
    libghc-certificate-dev_1.2.3-2_i386
    jpegoptim_1.2.3-2+b2_amd64
    python-moksha.common_1.2.3-2~bpo70+1_all
    bwbar_1.2.3-2_source
    python-mysqldb-dbg_1.2.3-2_amd64
    libibmad1_1.2.3-20090314-1.1_amd64
    shush_1.2.3-2_amd64
