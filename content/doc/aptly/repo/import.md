---
date: "2014-08-08T11:17:38Z"
title: "aptly repo import"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 30
---

aptly repo import
-----------------

Commands import copies packages matching [package spec](#package-query)
from mirror `src-name` to local repo `dst-repo`. If dependency following
is enabled, aptly would try to copy missing dependencies from
`src-mirror` as well.

Usage:

    $  aptly repo import <src-mirror> <dst-repo> <package-query> ...

Params are:

-   `src-mirror` packages would be searched in this mirror
-   `dst-repo` packages would be copied to this local repository
-   `package-query` list of [package search conditions](#package-query)

Flags:

-   `-dry-run=false`: don't import, just show what would be imported
-   `-with-deps=false`: follow dependencies when processing
    package-query

When copying with dependencies, global dependency options are used. For
example, to copy source packages, use `-dep-follow-source`. If aptly
won't be able to guess list of architectures from contents of local
repository `dst-repo`, architectures should be specified with
`-architectures` flag.

Example:

    $ aptly repo import percona testing percona-server-client-5.5
    Loading packages...
    [o] percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_i386 imported
    [o] percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_amd64 imported
