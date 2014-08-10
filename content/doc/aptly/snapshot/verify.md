---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot verify"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 40
---

aptly snapshot verify
---------------------

Verifies dependencies between packages in snapshot `<name>` and reports
unsatisfied dependencies. Command might take additional snapshots as
dependency sources.

Usage:

    $ aptly snapshot verify <name> [<source> ...]

Params:

-   `name` is snapshot name which has been given during snapshot
    creation
-   `source` is a optional list of snapshot names which would be used as
    additional sources

If architectures are limited (with config `architectures` or option
`-architectures`), only mentioned architectures are checked for internal
dependencies, otherwise `aptly` will check all architectures in the
snapshot.

By using `-dep-follow-source` global flag you can verify that snapshot
has all source packages available to re-build packages from source.

Example:

    $ aptly snapshot verify snap-deb2-main
    Missing dependencies (7):
      oracle-instantclient11.2-basic [i386]
      scsh-0.6 [amd64]
      fenix [amd64]
      fenix-plugins-system [amd64]
      mozart (>= 1.4.0) [amd64]
      scsh-0.6 (>= 0.6.6) [amd64]
      oracle-instantclient11.2-basic [amd64]


