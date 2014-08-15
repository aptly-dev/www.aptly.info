---
date: "2014-08-08T11:17:38Z"
title: Duplicate Packages
menu:
    doc:
        weight: 20
        parent: Features
---

Duplicate Packages
------------------

In ideal world, tuple `(architecture, name, version)` should identify
unique package. That holds true (well, almost true) with Debian-based
distributions. If two packages with the same architecture, name and
version are coming from different sources, they should be identical.

Debian [documentation on repository
format](https://wiki.debian.org/RepositoryFormat) explicitly forbids
duplicate packages with different content in one repository or in set of
repositories for one distribution:

> A repository must not include different packages (different content)
> with the same package name, version, and architecture. When a
> repository is meant to be used as a supplement to another repository
> this should hold for the joint main+supplement repository as well.

aptly deduplicates packages with identical
`(architecture, name, version)` tuple and contents into one single
package record and treats them as single package. But if two packages
share architecture, name and version, but have different content, aptly
would treat them as different packages. Such packages should never be
placed into one list in aptly (into one local repo, snapshot, mirror,
etc.) When such thing happens, aptly would complain about conflict in
packages. Usually such duplicate packages with different content
represent some software packaged for different Debian distribution, so
they should never be in the same list.

When aptly is publishing repository, it would give an error if
conflicting package files (same name, but different content) are put
together in one package pool. Package pool is shared by all published
repositories with the same component and prefix. The same applies to
switching snapshots or updating published repositories: if previous
state and new state contain two conflicting packages, aptly would give
an error. If you're completely sure that this update operation is
correct, you can use flag `-force-overwrite` to disable check for
conflicting package files.