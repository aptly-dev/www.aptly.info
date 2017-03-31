---
date: "2014-08-08T11:17:38Z"
title: "aptly repo move"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 70
---

aptly repo move
---------------

Command `move` moves packages matching [package query](/doc/feature/query/)
from local repo `src-repo` to local repo `dst-name`. If dependency
following is enabled, aptly would try to move dependencies from
`src-name` as well.

Usage:

    $  aptly repo move <src-name> <dst-name> <package-query> ...

Params are:

-   `src-name` packages would be searched in this local repository
-   `dst-name` packages would be moved to this local repository
-   `package-query` list of [package queries](/doc/feature/query/)

Flags:

-   `-dry-run=false`: don't move, just show what would be moved
-   `-with-deps=false`: follow [dependencies](/doc/feature/dependencies) when processing package
    query

When moving with dependencies, global dependency options are used. For
example, to move source packages, use `-dep-follow-source`. If aptly
won't be able to guess list of architectures from contents of local
repository `dst-name`, architectures should be specified with
`-architectures` flag.

Example:

    $ aptly repo move stable testing percona-server-client-5.5
    Loading packages...
    [o] percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_i386 moved
    [o] percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_amd64 moved

 
