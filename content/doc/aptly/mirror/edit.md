---
date: "2014-08-08T11:17:38Z"
title: "aptly mirror edit"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 50
---

aptly mirror edit
-----------------

Command edit allows to change mirror settings: filter query, whether
to include dependencies while filtering.

Usage:

    $ aptly mirror edit <name>

Params are:

-   `name` is a mirror name (given when mirror was created)

Flags:

-   `-filter=`: [package query](/doc/feature/query/) which is applied to
    packages in the mirror, set to empty to disable filtering
-   `-filter-with-deps=false`: when filtering, include dependencies of
    matching packages as well

In order to apply new filtering settings, [update](/doc/aptly/mirror/update/)
mirror.

Example:

    $ aptly mirror edit -filter=nginx -filter-with-deps wheezy-main
    Mirror [wheezy-main]: http://mirror.yandex.ru/debian/ wheezy successfully updated.

