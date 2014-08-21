---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot"
menu:
    doc:
        parent: Commands
        weight: 30
---

aptly snapshot
--------------

Snapshot is a fixed state of remote repository mirror or local repository.
Internally snapshot is list of references to packages. Snapshot is immutable, i.e. it
can't be changed since it has been created. Snapshots could be [merged](/doc/aptly/snapshot/merge/),
individual packages could be [pulled](/doc/aptly/snapshot/pull/), snapshot could be
[verified](/doc/aptly/snapshot/verify/) for missing dependencies. Finally, snapshots could be
[published as repositories](/doc/aptly/publish/snapshot).

