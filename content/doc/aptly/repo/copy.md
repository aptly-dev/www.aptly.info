---
date: "2014-08-08T11:17:38Z"
title: "aptly repo copy"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 60
---

aptly repo copy
---------------

Command copy copies packages matching [package query](/doc/feature/query/)
from local repo `src-name` to local repo `dst-name`. If dependency
following is enabled, aptly would try to copy missing dependencies from
`src-name` as well.

Usage:

    $  aptly repo copy <src-name> <dst-name> <package-query> ...

Params are:

-   `src-name` packages would be searched in this local repository
-   `dst-name` packages would be copied to this local repository
-   `package-query` list of [package queries](/doc/feature/query/)

Flags:

-   `-dry-run=false`: don't copy, just show what would be copied
-   `-with-deps=false`: follow dependencies when processing package
    query

When copying with dependencies, global dependency options are used. For
example, to copy source packages, use `-dep-follow-source`. If aptly
won't be able to guess list of architectures from contents of local
repository `dst-name`, architectures should be specified with
`-architectures` flag.

Example:

    $ aptly repo copy testing stable percona-server-client-5.5
    Loading packages...
    [o] percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_i386 copied
    [o] percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_amd64 copied

 