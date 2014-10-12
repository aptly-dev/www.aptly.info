---
date: "2014-08-08T11:17:38Z"
title: "Overview"
menu:
    doc:
        weight: 10
---

Overview
--------

<p class="lead">aptly's goal is to establish repeatiblity and controlled changes in
package environments.</p>

aptly produces a fixed set of packages in the repository,
so that package installation and upgrade becomes deterministic. At the
same time aptly is able to perform controlled, fine-grained changes to
repository content. aptly allows you to transistion your package environment to a
new version, or rollback to a previous version.

aptly has several core entities:

<dl class="dl-horizontal">
    <dt>mirror</dt>
    <dd>mirror of remote repository, consists of metadata, list of packages
    and package files</dd>
    <dt>local repo</dt>
    <dd>local package repository, consists of metadata, packages and files,
    packages can be easily added and removed</dd>
    <dt>snapshot</dt>
    <dd>immutable list of packages, basic block to implement repeatability
    and controlled changes</dd>
    <dt>published<br> repository</dt>
    <dd>published representation of aptly generated snapshot or local repository, ready to
    be consumed by apt tools</dd>
</dl>


The schema of aptly's commands and transitions between entities:

<img src="/img/schema.png" alt="aptly core schema" class="img-responsive">

We can start with creating [mirrors of remote
repositories](/doc/aptly/mirror/create). Also you can create [local package
repositories](/doc/aptly/repo/create) and import there packages as files.
Local repos could be modified by [copying](/doc/aptly/repo/copy) and
[moving](/doc/aptly/repo/move) packages between local repositories and
[importing](/doc/aptly/repo/import) them from mirrors. Snapshot could be
[created](/doc/aptly/snapshot/create) from remote repository (official
Debain repositories, backports, 3rd party repos, etc.) or your local
repository (custom built packages, your own software). Snapshots can be
used to produce new snapshots by [filtering](/doc/aptly/snapshot/filter/)
other snapshots, [pulling](/doc/aptly/snapshot/pull)
packages with dependencies between snapshots and by
[merging](/doc/aptly/snapshot/merge) snapshots. Any snapshot can be
[published](/doc/aptly/publish/snapshot) to location (distribution name,
prefix) and consumed by `apt` tools on your Debian systems. Local
repositories could be [published directly](/doc/aptly/publish/repo)
bypassing snapshot step.

Next section, [Why aptly?](/doc/why/) describes why aptly is unique.
