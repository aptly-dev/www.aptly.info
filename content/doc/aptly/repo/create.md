---
date: "2014-08-08T11:17:38Z"
title: "aptly repo create"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 10
---

aptly repo create
-----------------

Create local package repository. Repository would be empty when created,
packages could be added to the repository from [local files](/doc/aptly/repo/add/),
[copied](/doc/aptly/repo/copy/) or [moved](/doc/aptly/repo/move/) from another local
repository or [imported](/doc/aptly/repo/import/) from the mirror.

Usage:

    $  aptly repo create <name>

Params are:

-   `name` is a name that would be used in aptly to reference this
    repository

Flags:

-   `-comment=""`: any text that would be used to described local
    repository
-   `-component="main"`: default component when publishing
-   `-distribution=""`: default distribution when publishing
-   `-uploaders-file=""`: `uploaders.json` to be used when including .changes into this repository

Distribution and component would be used as defaults when
publishing repository either directly or via snapshot.

If `-uploaders-file` flag is given, contents of the file are parsed
and attached to local repository. This would be per-repository
upload restriction used by [aptly repo include](/doc/aptly/repo/include) command.

Example:

    $ aptly repo create -comment="Nightly builds" testing

    Local repo [testing] successfully added.
    You can run 'aptly repo add testing ...' to add packages to repository.

