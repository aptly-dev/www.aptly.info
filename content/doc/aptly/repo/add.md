---
date: "2014-08-08T11:17:38Z"
title: "aptly repo add"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 20
---

aptly repo add
--------------

Command adds packages to local repository from `.deb` (binary packages)
and `.dsc` (source packages) files. When importing from directory aptly
would do recursive scan looking for all files matching `*.deb` or
`*.dsc` patterns. Every file discovered would be analyzed to extract
metadata, package would be created and added to database. Files would be
imported to internal package pool. For source packages, all required
files are added as well automatically. Extra files for source package
should be in the same directory as `*.dsc` file.

Usage:

    $  aptly repo add <name> <package file>|<directory> ...

Params are:

-   `name` is local repository name

Flags:

-   `-force-replace=false`: when adding package that conflicts with existing package,
    remove existing package
-   `-remove-files=false`: remove files that have been imported
    successfully into repository

Local repositories work best for distribution of in-house software or
for custom-built upstream packages. Command `aptly repo add` allows to
add source packages and built binary package to local repository. Local
repository could be snapshotted, possibly mixed with snapshots of
official repositories and published.

aptly won't complain if package is added to the repo which is complete
duplicate. However it is forbidden to have two packages in one repo with identical
triples (architecture, name, version) that have different metadata or
files (see [Duplicate packages](/doc/feature/duplicate) for details).
If you need to replace package that conflicts with existing, use flag
`-force-replace`.
All files added to package pool would be deduplicated, as it
happens with files coming from mirrors, so exactly one copy of each file
would be stored in aptly pool.

Flag `-remove-files` allows to implement concept of `incoming/` directory
where packages are removed as soon as they're imported into database.

Example:

    $ aptly repo add testing files/libboost-program-options-dev_1.49.0.1_i386.deb
    Loading packages...
    [+] libboost-program-options-dev_1.49.0.1_i386 added

 