---
date: "2014-08-08T11:17:38Z"
title: "aptly publish drop"
tags:
    - command
menu:
    doc:
        parent: aptly publish
        weight: 60
---

aptly publish drop
------------------

Remove files belonging to published repository. aptly would try to
remove as many files belonging to this repository as possible. For
example, if no other published repositories share the same prefix, all
files inside prefix would be removed.

Usage:

    $ aptly publish drop <distribution> [[<endpoint:>]<prefix>]

-   `distribution` is a distribution name for published repository (as
    displayed by `aptly publish list`).
-   `endpoint` is publishing endpoint, if not specified, it would
    default to empty endpoint (local file system).
-   `prefix` is an optional prefix for publishing, if not specified,
    prefix is considered to be `.`.

Flags:

-   `-force-drop`: drop published repository even if component cleanup
    fails
-   `-skip-cleanup`: don't remove unreferenced files in prefix/component

Usually `-force-drop` isn't required, but if due to some corruption component cleanup
fails, `-force-drop` could be used to drop published repository. This might leave
some published repository files left under `public/` directory.

Example:
```bash
# List all published:
$ aptly publish list
Published repositories:
  * ubuntu-main-local/plucky (origin: Ubuntu) [amd64, i386] publishes {main: [ubuntu-main]: Snapshot from mirror [ubuntu-main]: http://archive.ubuntu.com/ubuntu/ plucky}

# Can be removed by running:
$ aptly publish drop plucky ubuntu-main-local
Removing /var/aptly/public/.../dists/...
Removing /var/aptly/public/.../pool/...
```

 
