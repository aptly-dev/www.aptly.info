+++
date = 2014-06-09T00:57:00Z
title = "aptly 0.6"
+++

[aptly](http://www.aptly.info) 0.6 has been released on June, 7th. It is
available for download as [binary
executables](http://www.aptly.info#download) or from Debian repository:

    deb http://repo.aptly.info/ squeeze main

When installing from repository, don't forget to import key used to sign
the release:

    $ gpg --keyserver keys.gnupg.net --recv-keys 2A194991
    $ gpg -a --export 2A194991 | sudo apt-key add -

Most important new features are:

Multi-Component Repository Publishing
=====================================

aptly is based on concept of list of packages. Snapshots, mirrors and
local repositories are list of packages (more precisely, list of
references to packages). When merging, pulling, copying or moving
packages might move from one list into another. Component is a way to
break down packages into groups, usually these groups make sense only in
published repository. At the same time mapping from package to component
is not universal, there's Debian way to group packages into `main`,
`contrib` and `non-free` components, Ubuntu uses different schema of
components, some 3rd party repositories use components in place of
different distributions (like `squeeze`, `wheezy` etc.) or to separate
stable and testing versions of software.

In order to keep aptly simple, I decided that there's no mapping from
package to component and package lists internally aren't split by
component. Each list (snapshot, mirror and local repository) is
mono-component (actually there's no component at all). When publishing
repository, several lists could be published as separate components.

By default, aptly mirrors all components from remote repository and
merges them into one "single component". If we'd like to preserve
package split by components, individual mirrors should be created for
each component:

    aptly mirror create wheezy-main http://ftp.ru.debian.org/debian/ wheezy main
    aptly mirror create wheezy-contrib http://ftp.ru.debian.org/debian/ wheezy main
    aptly mirror create wheezy-non-free http://ftp.ru.debian.org/debian/ wheezy non-free

    aptly mirror list -raw | xargs -n 1 aptly mirror update

We can create snapshots from each of the mirrors:

    aptly snapshot create wheezy-main-7.5 from mirror wheezy-main
    aptly snapshot create wheezy-contrib-7.5 from mirror wheezy-contrib
    aptly snapshot create wheezy-non-free-7.5 from mirror wheezy-non-free

And publish all snapshots as single repository preserving component
structure (publishing distribution `wheezy` under prefix `upstream`):

    aptly publish snapshot -component=main,contrib,non-free -distribution=wheezy wheezy-main-7.5 wheezy-contrib-7.5 wheezy-non-free-7.5  upstream

aptly is smart enough to figure out component names and distribution
from the mirrors, so I can omit them (commas left to identify number of
components):

    aptly publish snapshot -component=,, wheezy-main-7.5 wheezy-contrib-7.5 wheezy-non-free-7.5 upstream

Of course we could do all regular aptly operations: merging snapshots,
pulling packages, etc.

Handling Package Conflicts
==========================

Package in Debian universe is identified by triple (architecture, name,
version). If two packages have the same (architecture, name, version)
but different content, they are called conflicting packages. Debian
guidelines prohibit including conflicting packages in repositories that
could be used together (which could be present in one `apt.sources`
file). Unfortunately, in real word there are conflicting packages, one
such package has been reported in `squeeze` + security updates, another
example was puppet repository which contains packages with the same
triple but for different Debian distributions in several components.

Before 0.6, aptly would complain when it detects such conflicts and stop
processing. In this version special handling has been added that
considers packages with same (architecture, name, version) and different
files as different package entires. There's one restriction though: you
can't put packages with duplicate (architecture, name, version) into one
list (one mirror, snapshot, local repo, published repository). This is
in line with Debian guidelines that one repository shouldn't contain
duplicate packages.

This feature works transparently when upgrading from older versions of
aptly: conflicts would be just gone. In the background aptly would be
updating references to packages when you update mirrors, create new
snapshots, etc.

Empty Repository Publishing
===========================

Many people are using aptly to handle package repository from various
automation tools, e.g. configuration management systems. For such usage
it is convenient to create local repository (empty initially), publish
it, and then add packages and update published repository.

Before 0.6, aptly would refuse to publish empty repositories. Now this
is possible, but correct architecture list should be supplied when
publishing (as aptly can't figure out architecture list automatically
from package list). List of architectures can't be changed when
published repository is updated, you would have drop published
repository and create new one if required.

Merging Snapshots: 3rd Strategy
===============================

There's a feature in aptly that allows to merge two snapshots: this is
useful to combine for example main repository and security updates or
main repository and 3rd-party repository. With 0.6, three merge
strategies are available:

-   for packages with same (architecture, name) package which comes from
    latest snapshot on the command line wins (default);
-   for packages with same (architecture, name) package with latest
    version wins (`-latest`);
-   all versions of packages are preserved (`-no-remove`, new in 0.6).

All Changes
===========

Full list of changes in 0.6:

<ul>
  <li>support for multi-component published repositories (<a href="https://github.com/aptly-dev/aptly/issues/36">#36</a>)</li>
  <li>handling duplicate packages with different content gracefully (<a href="https://github.com/aptly-dev/aptly/issues/60">#60</a>)</li>
  <li>repositories published by aptly now can be consumed by debian-installer (<a href="https://github.com/aptly-dev/aptly/issues/61">#61</a>)</li>
  <li>new flag: <code>-no-remove</code> for <a href="http://www.aptly.info/#aptly-snapshot-merge">aptly snapshot merge</a> to merge snapshots with all package versions preserved (<a href="https://github.com/aptly-dev/aptly/issues/57">#57</a>)</li>
  <li>publishing of empty snapshots/repositories is possible (<a href="https://github.com/aptly-dev/aptly/issues/55">#55</a>)</li>
  <li><a href="http://www.aptly.info/#aptly-repo-add">aptly repo add</a> now exists with 1 if any of files failed to add (<a href="https://github.com/aptly-dev/aptly/issues/53">#53</a>)</li>
  <li>bug fix: <code>Package:</code> line comes first in package metadata (<a href="https://github.com/aptly-dev/aptly/issues/49">#49</a>)</li>
  <li>bug fix: when command parsing fails, aptly returns exit code 2 (<a href="https://github.com/aptly-dev/aptly/issues/52">#52</a>)</li>
  <li>bug fix: pulling more than 128 packates at once (<a href="https://github.com/aptly-dev/aptly/issues/53">#53</a>)</li>
  <li>bug fix: <a href="http://www.aptly.info/#aptly-graph">aptly graph</a> may get confused with package pull requests (<a href="https://github.com/aptly-dev/aptly/issues/58">#58</a>)</li>
</ul>

