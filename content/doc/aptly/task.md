---
date: "2014-08-08T11:17:38Z"
title: "aptly task"
menu:
    doc:
        parent: Commands
        weight: 20
---

aptly task
----------
An aptly task is a sequence of multiple aptly commands run within a single aptly thread.

For example, a task could be to [create a new repository](/doc/aptly/repo/create), [add packages to it](/doc/aptly/repo/add), [create a snapshot](/doc/aptly/snapshot/create) and [serve it](/doc/aptly/serve). 

Four commands can be now run in a single command.
