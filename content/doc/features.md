---
date: "2014-08-08T11:17:38Z"
title: Features
menu:
    doc:
        weight: 40
---


Features
--------

List of aptly features, in no particular order:

* [mirroring](/doc/aptly/mirror/create/) remote repositories:
  * regular and flat repositories
  * HTTP(S) and FTP servers are supported
  * mirror only specified architectures/components
  * [partial mirrors](/doc/feature/query/) (with filters on packages)
  * [search](/doc/aptly/mirror/search/) mirror for packages matching query
* local repositories handling:
  * any number of local repositories
  * packages could be [added](/doc/aptly/repo/add/) from files or by directory scan
  * source packages pull all related files automatically
  * [moving](/doc/aptly/repo/move/), [copying](/doc/aptly/repo/copy/) packages between repositories
  * [importing](/doc/aptly/repo/import/) packages from mirrors
  * [removing](/doc/aptly/repo/import) packages matching condition
* package pool (internal package files storage):
  * packages from mirrors and local repos are stored in deduplicated manner
  * package file is kept in package pool until there's at least a single reference
  * pool could be [cleaned up](/doc/aptly/db/cleanup/)
  * [searching](/doc/aptly/package/search/) and [showing details](/doc/aptly/package/show/) for
    packages in the pool
* handling of [duplicate](/doc/feature/duplicate/) packages
* snapshots for mirrors and local repositories:
  * [creating](/doc/aptly/snapshot/create/) snapshots from mirrors and local repositories
  * snapshot is immutable
  * [merging](/doc/aptly/snapshot/merge/) several snapshots into one
  * [filtering](/doc/aptly/snapshot/filter/) snapshots producing new snapshot
  * [pulling](/doc/aptly/snapshot/pull/) packages matching query from one snapshot into another,
    producing new snapshot
  * [checking](/doc/aptly/snapshot/verify/) snapshot for unsatisfied dependencies
  * calculating [difference](/doc/aptly/snapshot/diff/) between snapshots
  * [searching](/doc/aptly/snapshot/search/) snapshots for packages matching query
* publishing snapshots and local repositories:
  * publishing [snapshots](/doc/aptly/publish/snapshot/) created from mirrors or local repositories
  * publishing [local repositories](/doc/aptly/publish/repo/) directly
  * [multi-component](/doc/feature/multi-component/) publishing
  * publishing under prefix
  * publishing to [Amazon S3](/doc/feature/s3/)
  * atomic [switching](/doc/aptly/publish/switch) of published snapshots
  * atomic [updating](/doc/aptly/publish/update) of published local repositories
* displaying [graph](/doc/aptly/graph/) of dependencies between mirrors, local repos, snapshots and
  published repositories
* quickly [serving](/doc/aptly/serve/) published repositories over HTTP