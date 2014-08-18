---
date: "2014-08-08T11:17:38Z"
title: "Why aptly?"
menu:
    doc:
        weight: 20
---

Why aptly?
----------

Linux distribution is well-tested collection of packages carefully organized and
supported by the vendor. There's a support for the released version, including
updates, security fixes, etc. For many of us that is just enough.

But sooner or later our requirements start to evolve:

* we have a lot of machines and we would like to have internal mirror
  of package repository, so that we could save bandwidth and manage
  upgrades;
* some packages are missing in official distribution or are outdated,
  so we need to add 3rd party repositories;
* we start packaging our own software (or modified versions of official
  packages), so we need to host our own internal package repository.

In the end, we would like **to own package repository**, that is to have
package repository that is our "own distribution" tailored to fit our
needs. Relying on single vendor is fine, but if we start to manage our
own repository, we need great tools to help us. That's where aptly comes to help us.

### Mirroring remote repositories

Creating our own mirror of remote repositories has several benefits:

* saving bandwidth if we have a lot of servers;
* no dependency on remote service to work properly in order to manage
  critical pieces of infrastructure;
* reproducible package installation.

Last point requires some comments: if I setup server (install packages) by issuing
fixed set of `apt-get install package` commands, I get some package versions installed.
If later I issue exactly the same `apt-get install package` commands on the second
server, I might get slightly different set of package versions, as remote repository
might have been updated in the mean time.

There are many tools to create mirror of Debian package repositories, not many of those tools
are able to create partial mirrors (download only specified packages) and most
important, there are just several tools that can update mirror at any moment in time and preserve previous
mirror states as snapshots.

Snapshotting mirror is very important to make sure that all servers are installed from the same
snapshot. When tested, mirror could be upgraded to new snapshot.

Using aptly, you can do something like that:

    $ aptly mirror create wheezy-main http://mirror.yandex.ru/debian/ wheezy main
    $ aptly mirror update wheezy-main
    $ aptly snapshot create wheezy-main-2014-08-16 from mirror wheezy-main
    $ aptly publish snapshot wheezy-main-2014-08-16

Your servers are configured to download packages from your own mirror.
As Debian distribution is updated, we can take new snapshot and update published repository:

    $ aptly mirror update wheezy-main
    $ aptly snapshot create wheezy-main-2014-09-02 from mirror wheezy-main
    $ aptly publish switch wheezy wheezy-main-2014-09-02

### Mixing different packages sources

One can configure `apt` to use multiple package sources via `apt.sources.list`. This works just fine
until you get conflicts (one package coming from different sources). You might use apt pinning
to control package source priority, but this is hard to maintain and doesn't guarantee consistent
results.

Reasons to use multiple sources might be different:

* updating some packages to newer versions from `backports` repository;
* using 3rd party repositories because:
  * they have newer versions of software available;
  * software is not included into Debian distribution.
* installing internal software from Debian packages.

Most usually we would like to add some software from 3rd party repositories into official repository,
create our own "mix", which should be consistent, tested and available in the same state to all servers.

Once state of mirrors and our internal package repositories is fixed using snapshots, we might
use [aptly snapshot pull](/doc/aptly/snapshot/pull) to mix packages from several snapshots into final
snapshot that would be published to be consumed from our servers. aptly would take care about dependencies,
replacing conflicting packages when required. Please see [examples](/examples/) on how to pull
package `nginx` from backports.

### Managing internal package repositories

Sometimes we produce our own packages: it could be our own software or patched version of official
packages. Historically tools to create package repositories were complex and required complex
setup. aptly makes things different: managing local repositories is easy, they could be
snapshotted as remote repositories, packages from local repositories could be mixed with packages
from mirrors (in snapshots).

Local repositories could be published either via snapshots or directly (loosing flexibility of
snapshots). Please see [`aptly repo`](/doc/aptly/repo/) commands for examples.


