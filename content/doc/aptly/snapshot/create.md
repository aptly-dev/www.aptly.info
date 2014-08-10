---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot create"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 10
---

aptly snapshot create
---------------------

#### Command `aptly snapshot create .. from mirror`

Creates snapshot from current state of remote mirror. Mirror should be
updated at least once before running this command.

Snapshot would contain exactly the same set of packages as mirror
currently does. Snapshot is immutable, so if mirror is updated, snapshot
contents won't change. If mirror contains source packages, snapshot
would also contain source packages.

Usage:

    $ aptly snapshot create <name> from mirror <mirror-name>

Params are:

-   `name` is a name for the snapshot to be created
-   `mirror-name` is a mirror name (given when mirror was created)

Example:

    $ aptly snapshot create monday-updates from mirror backports2

    Snapshot monday-updates successfully created.
    You can run 'aptly publish snapshot monday-updates' to publish snapshot as Debian repository.

 

#### Command `aptly snapshot create .. from repo`

Creates snapshot from current state of local package repository.
Repository should contain at least one package.

Snapshot would contain exactly the same set of packages as local
repositorory currently does. Snapshot is immutable, so if local
repository is changed in any way, snapshot contents won't change.

Usage:

    $ aptly snapshot create <name> from repo <repo-name>

Params are:

-   `name` is a name for the snapshot to be created
-   `repo-name` is a local repository name

Example:

    $ aptly snapshot create snap-stable from repo stable

    Snapshot snap-stable successfully created.
    You can run 'aptly publish snapshot snap-stable' to publish snapshot as Debian repository.

 

#### Command `aptly snapshot create .. empty`

Creates empty snapshot. As snapshots are immutable, creating one empty
snapshot should be enough. Empty snapshots could be used as first
snapshot while pulling packages to create completely defined set of
packages.

Usage:

    $ aptly snapshot create <name> empty

Params are:

-   `name` is a name for the snapshot to be created

Example:

    $ aptly snapshot create empty-snapshot empty

    Snapshot empty-snapshot successfully created.
    You can run 'aptly publish snapshot empty-snapshot' to publish snapshot as Debian repository.

