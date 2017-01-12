---
date: "2017-01-12T13:33:38Z"
title: "aptly publish show"
tags:
    - command
menu:
    doc:
        parent: aptly publish
        weight: 55
---

aptly publish show
-------------------

Shows detailed information of published repository.

Usage:

    $ aptly publish show <distribution> [[<endpoint>:]<prefix>]

Params:

-   `distribution` is a distribution name for published repository (as
    displayed by `aptly publish list`).
-   `endpoint` is publishing endpoint, if not specified, it would
    default to empty endpoint (local file system).
-   `prefix` is an optional prefix for publishing, if not specified,
    prefix is considered to be `.`.

Example:

    $ aptly publish show squeeze-backports
    Prefix: .
    Distribution: squeeze
    Architectures: amd64 i386
    Sources:
      main: back3 [snapshot]
 
