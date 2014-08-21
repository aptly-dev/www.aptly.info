---
date: "2014-08-08T11:17:38Z"
title: "aptly db cleanup"
tags:
    - command
menu:
    doc:
        parent: aptly db
        weight: 10
---

aptly db cleanup
----------------

Database cleanup removes information about unreferenced packages and
deletes files in the package pool that aren't used by packages anymore.
It is a good idea to run this command after massive deletion of
mirrors, snapshots or local repos.

Usage:

    $ aptly db cleanup

Example:

    $ aptly db cleanup
    Loading mirrors and snapshots...
    Loading list of all packages...
    Deleting unreferenced packages (325)...
    Building list of files referenced by packages...
    Building list of files in package pool...
    Deleting unreferenced files (325)...
    Disk space freed: 0.27 GiB...

 