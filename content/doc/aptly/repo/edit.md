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

Default distribution and component would be taken as defaults when
publishing repository either directly or via snapshots.

Example:

    $ aptly repo edit -comment="Nightly builds" -distribution=wheezy testing
    Local repo [testing]: Nightly builds successfully updated.

 