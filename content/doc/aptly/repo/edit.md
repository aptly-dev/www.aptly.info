---
date: "2014-08-08T11:17:38Z"
title: "aptly repo edit"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 90
---


aptly repo edit
---------------

Command edit allows to change metadata of local repository: comment,
default distribution and component.

Usage:

    $  aptly repo edit <name>

Params are:

-   `name` is a local repository name

Flags:

-   `-comment=""`: any text that would be used to described local
    repository
-   `-component=""`: default component when publishing
-   `-distribution=""`: default distribution when publishing
-   `-uploaders-file=""`: `uploaders.json` to be used when including .changes into this repository

Distribution and component would be used as defaults when
publishing repository either directly or via snapshot.

If `-uploaders-file` flag is given, contents of the file are parsed
and attached to local repository. This would be per-repository
upload restriction used by [aptly repo include](/doc/aptly/repo/include) command.
To remove uploaders restriction for the repository, use empty value:
`-uploaders-file=""`.


Example:

    $ aptly repo edit -comment="Nightly builds" -distribution=wheezy testing
    Local repo [testing]: Nightly builds successfully updated.

 