---
date: "2014-08-08T11:17:38Z"
title: Multi-Component Publishing
menu:
    doc:
        weight: 40
        parent: Features
---

Multi-Component Repository Publishing
-------------------------------------

aptly is based on a concept of package lists. Snapshots, mirrors and
local repositories are lists of packages (more precisely, lists of
references to packages). When merging, pulling, copying or moving
packages might move from one list to another. Component is a way to
break down packages into groups, usually these groups make sense only in
published repository. At the same time mapping from package to component
is not universal, there's Debian way to group packages into `main`,
`contrib` and `non-free` components, Ubuntu uses different component schema,
some 3rd party repositories use components in place of
distribution name (like `squeeze`, `wheezy` etc.), other use them to separate
stable and testing versions of software.

In order to keep aptly simple, I've decided that there should be no mapping from
package to component and package lists internally aren't split by
component. Each list (snapshot, mirror and local repository) is
mono-component (actually there's no component at all). When publishing
repository, several lists could be published as separate components in
one published repository.

By default, aptly mirrors all components from remote repository and
merges them into one "single component". If we'd like to preserve
package split by components, individual mirrors should be created for
each component:

    $ aptly mirror create wheezy-main http://ftp.ru.debian.org/debian/ wheezy main
    $ aptly mirror create wheezy-contrib http://ftp.ru.debian.org/debian/ wheezy contrib
    $ aptly mirror create wheezy-non-free http://ftp.ru.debian.org/debian/ wheezy non-free

    # update all mirrors
    $ aptly mirror list -raw | xargs -n 1 aptly mirror update

We can create snapshots from each of the mirrors:

    $ aptly snapshot create wheezy-main-7.5 from mirror wheezy-main
    $ aptly snapshot create wheezy-contrib-7.5 from mirror wheezy-contrib
    $ aptly snapshot create wheezy-non-free-7.5 from mirror wheezy-non-free

And publish all snapshots as single repository preserving component
structure (publishing distribution `wheezy` under prefix `upstream`):

    $ aptly publish snapshot -component=main,contrib,non-free -distribution=wheezy wheezy-main-7.5 wheezy-contrib-7.5 wheezy-non-free-7.5 upstream

aptly is smart enough to figure out component names and distribution
from the mirrors, so I can omit them (commas left to identify number of
components):

    $ aptly publish snapshot -component=,, wheezy-main-7.5 wheezy-contrib-7.5 wheezy-non-free-7.5 upstream

Of course we could do all regular aptly operations: merging snapshots,
pulling packages, etc.

The same applies to local repositories: if packages should be published as different components,
several local repositories (one per component) should be created:

    $ aptly repo create -distribution=wheezy -component=main my-soft-main
    $ aptly repo create -distribution=wheezy -component=contrib my-soft-contrib

Local repositories could be published either directly:

    $ aptly publish repo -component=, my-soft-main my-soft-contrib

Or via snapshot:

    $ aptly snapshot create my-soft-main-1.0 from repo my-soft-main
    $ aptly snapshot create my-soft-contrib-1.0 from repo my-soft-contrib

    $ aptly publish snapshot -component=, my-soft-main-1.0 my-soft-contrib-1.0

When [updating published repository](/doc/aptly/publish/update/), all component
parts are updated at the same time. When [switching published snapshots](/doc/aptly/publish/switch/),
only specified components are updated.