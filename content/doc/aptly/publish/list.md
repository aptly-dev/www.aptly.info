---
date: "2014-08-08T11:17:38Z"
title: "aptly publish list"
tags:
    - command
menu:
    doc:
        parent: aptly publish
        weight: 50
---

aptly publish list
------------------

Lists repositories that have been published with
`aptly publish snapshot` and `aptly publish repo`. For each repository information about
`endpoint`, `prefix` and `distribution` is listed along with `component`
and architecture list. Information about snapshot or local repo being published is appended
to published repository description.

Usage:

    $ aptly publish list

Flags:

-   `-raw`: display list in machine-readable format

Format of the list is following: `endpoint:prefix/distribution [architecture list] publishes {local repo/snapshot description}`.
Empty `prefix` is displayed as `.`, if repository is published on local filesystem, `endpoint` would be empty.

Examples:

    $ aptly publish list
    Published repositories:
      * ./sq-b [amd64, i386] publishes {main: [back3]: Snapshot from mirror [backports2]: http://mirror.yandex.ru/backports.org/ squeeze-backports}
      * s3:repo:./squeeze-backports [amd64, i386] publishes {contrib: [back3]: Snapshot from mirror [backports2]: http://mirror.yandex.ru/backports.org/ squeeze-backports}

    $ aptly publish list -raw
    . sq-b
    . squeeze-backports

 

