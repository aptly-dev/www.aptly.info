---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot filter"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 55
---

aptly snapshot filter
---------------------

Applies filter to contents of snapshot `source` producing `destination`
snapshot. All packages from `source` snapshot matching any of the package
queries (optionally with all their dependencies from `source`)  are used
to build new snapshot `destination`.

Usage:

    $ aptly snapshot filter <source> <destination> <package-query> ...

Params:

-   `source` is a snapshot name where packages would be
    searched
-   `destination` is a name of the snapshot that would be created
-   `package-query` is a list of [package queries](/doc/feature/query/), in
    the simplest form, name of package to be pulled from `source` could
    be specified

Flags:

-   `-with-deps=false`: include [dependencies](/doc/feature/dependencies) of matching packages

Filter command is almost identical to
`aptly snapshot pull empty source destination query` (`empty` being empty
snapshot), the differences are:

 * pull by default includes only first matching package
 * pull honors `-architectures` flag and would pull only packages with
   mentioned architectures, while filter command would use package
   query as given to match packages (one might use `$Architecture (i386)` in query
   to limit architectures)

Example:

    $ aptly snapshot filter wheezy-main wheezy-main-required 'Priority (required)'
    Loading packages (31661)...
    Building indexes...

    Snapshot wheezy-main-required successfully filtered.
    You can run 'aptly publish snapshot wheezy-main-required' to publish snapshot as Debian repository.
