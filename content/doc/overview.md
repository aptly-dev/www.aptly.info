---
date: "2014-08-08T11:17:38Z"
title: "Overview"
menu:
    doc:
        weight: 10
---

Overview
--------

aptly goal is to establish repeatiblity and controlled changes in
package environment. aptly allows to fix set of packages in repository,
so that package installation and upgrade becomes deterministic. At the
same time aptly allows to perform controlled, fine-grained changes in
repository contents to transition your package environment to new
version.
 

<dl>
    <dt>mirror</dt>
    <dd>mirror of remote repository, consists of metadata, list of packages
    and package files</dd>
    <dt>local repo</dt>
    <dd>local package repository, consists of metadata, packages and files,
    packages could be easily added and removed</dd>
    <dt>snapshot</dt>
    <dd>immutable list of packages, basic block to implement repeatability
    and controlled changes</dd>
    <dt>published repository</dt>
    <dd>published representation of snapshot or local repository, ready to
    be consumed by apt tools</dd>
</dl>


The schema of aptly's commands and transitions between entities:

<img src="/img/schema.png" alt="aptly core schema" class="img-responsive">

We can start with creating [mirrors of remote
repositories](#aptly-mirror-create). Also you can create [local package
repositories](#aptly-repo-create) and import there packages as files.
Local repos could be modified by [copying](#aptly-repo-copy) and
[moving](#aptly-repo-move) packages between local repositories and
[importing](#aptly-repo-import) them from mirrors. Snapshot could be
[created](#aptly-snapshot-create) from remote repository (official
Debain repositories, backports, 3rd party repos, etc.) or your local
repository (custom built packages, your own software). Snapshots can be
used to produce new snapshots by [pulling](#aptly-snapshot-pull)
packages with dependencies between snapshots and by
[merging](#aptly-snapshot-merge) snapshots. Any snapshot can be
[published](#aptly-publish-snapshot) to location (distribution name,
prefix) and consumed by `apt` tools on your Debian systems. Local
repositories could be [published directly](#aptly-publish-repo)
bypassing snapshot step.
