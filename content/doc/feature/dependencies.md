---
date: "2017-03-31T11:17:38Z"
title: Dependency Resolving
menu:
    doc:
        weight: 60
        parent: Features
---

Dependency Resolving
--------------------

aptly supports automatic recursive resolving of package dependencies. For example, given set
of packages `pkg-a` and `pkg-b` aptly can figure out all the package dependencies and pull them
with the packages. This allows to pull `Depends:` (including `Pre-Depends:`), `Recommends:`, source
packages and so on.

Command [aptly snapshot pull](/doc/aptly/snapshot/pull) was the first one to support dependency resolving
(it is enabled by default in this command). The best example is
[pulling selected packages from backports repos with dependencies, overriding packages in base distribution](/tutorial/pull).

All the commands which accept [package query](/doc/feature/query) as parameter (this includes family of
`aptly * search` commands, various `copy`, `move` commands), apply filter to the source matching only specified
packages. But if `-with-deps` flag is set, aptly resolves dependencies of packages matching the filter expanding
matching packages with all the available dependencies. This allows for example to search for package with all its
dependencies.

Command [aptly mirror update](/doc/aptly/mirror/update) also supports package filters set either when mirror is
[created](/doc/aptly/mirror/create) or [modified](/doc/aptly/mirror/edit). This allows to cut down download size
dramatically by selecting only subset of the available packages.

Overall, aptly dependency resolution is not that robust as `apt-get` one, but it should work fine in the most cases.
When filtering complete Debian distributions, it's advised to always pick up `Priority (Required)` or
`Priority (Important)` packages
([what is that?](https://www.debian.org/doc/manuals/debian-faq/ch-pkg_basics.en.html#s-priority)) as a basis to resolve
dependencies against.

### Options

Several options affect dependency resolving process. They might be set either in the [configuration file](/doc/configuration) or
passed via [command-line flags](/doc/aptly/flags). If passed via flags, they should be passed to the command which executes
dependency resolution algorithm each time command is run (e.g. mirror filter is set with [aptly mirror create](/doc/aptly/mirror/create),
but filter is applied in [aptly mirror update](/doc/aptly/mirror/update), so dependency flags should be passed to
`aptly mirror update` command).

By default, aptly only follows dependencies in `Depends:` and `Pre-Depends:` fields, flags `-dep-follow-recommends` and
`-dep-follow-suggests` expand that to `Recommens:` and `Suggests` fields. When `-dep-follow-source` flag is set, aptly
pulls source packages for each binary package selected.

When `-dep-follow-all-variants` is enabled, aptly follows all the paths for dependencies to grab all the available
dependent packages. For example, if `pkg-a` depends on either `pkg-b` or `pkg-c`, by default aptly will pick one of
`pkg-b` or `pkg-c`, but with `-dep-follow-all-variants` aptly would pick up both packages. Same applies to virtual packages,
all the package which provide the feature would be selected.

### Verbose Logging

New in {{< version "1.1.0" >}}.

When global flag `-dep-verbose-resolve` is set (or respective configuration option is enabled), aptly prints
detailed log while resolving dependencies:

    Missing dependencies: file-rc (>= 0.8.16) [amd64], python:any (>= 2.7.1-0ubuntu2) [amd64], python3:any (>= 3.3.2-2~) [amd64], file-rc [amd64], perl (<< 5.17) [amd64], iptables-router (>= 1.2.3) [amd64], systemd [amd64], sgml-base (>= 1.26+nmu2) [amd64], sed (>= 4.1.2-8) [amd64]
    Unsatisfied dependency: file-rc (>= 0.8.16) [amd64]
    Unsatisfied dependency: python:any (>= 2.7.1-0ubuntu2) [amd64]
    Unsatisfied dependency: python3:any (>= 3.3.2-2~) [amd64]
    Unsatisfied dependency: file-rc [amd64]
    Unsatisfied dependency: perl (<< 5.17) [amd64]
    Unsatisfied dependency: iptables-router (>= 1.2.3) [amd64]
    Unsatisfied dependency: systemd [amd64]
    Injecting package: sgml-base_1.26+nmu4ubuntu1_all
    Injecting package: sed_4.2.2-4ubuntu1_amd64

Dependency resolving process goes through several steps in a loop, exiting the loop once it's not possible to inject any
new dependency:

1. Scan all the packages in the list, collect all the dependencies (`Missing dependencies`)
2. For each dependency, find package (or packages) which might satisfy dependency. If such package
is not available, `Unsatisfied dependency:` message is printed.
3. Add packages to the set which satisfy some of the dependencies (`Injecting package:`)
4. If any packages were added on step 3, repeat from step 1, otherwise finish dependency resolving.
