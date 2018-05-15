+++
date = 2014-04-25T00:12:00Z
title = "aptly 0.5"
+++

[aptly](http://www.aptly.info) 0.5 has been released today. It is
available for download as [binary
executables](http://www.aptly.info#download) or from Debian repository:

    deb http://repo.aptly.info/ squeeze main

When installing from repository, don't forget to import key used to sign
the release:

    $ gpg --keyserver keys.gnupg.net --recv-keys 2A194991
    $ gpg -a --export 2A194991 | sudo apt-key add -

Most important new features are:

Local Repository Publishing
===========================

Local repositories could be used in two ways:

-   test new versions of software
-   provide stable distribution of new versions

For the second case, it is best to create snapshots of local
repositories and publish them. However, when testing out new versions,
there isn't much sense in creating snapshot each time repository is
updated. So aptly since version 0.5 supports [direct publishing of
repositories](http://www.aptly.info/#aptly-publish-repo). Moreover, when
local repository is updated, published repository could be updated as
well in [one step](http://www.aptly.info/#aptly-publish-update).

When local repository is created, default publishing options
(distribution and component) could be specified, so that these options
don't need to be specified when publishing:

    aptly repo create -distribution=wheezy testing-wheezy
    aptly repo add -remove-files testing-wheezy incoming/*.deb
    aptly publish repo testing-wheezy
    ...
    aptly repo add -remove-files testing-wheezy incoming/*.deb
    aptly publish update wheezy

Published Snapshot Switching
============================

Snapshot is a way to make package environment stable and repeatable, but
from time to time new snapshots are created that contain new versions of
software. To publish new version of snapshot, aptly before 0.5 required
old snapshot to be unpublished and new snapshot to be published again.
During this process, repository would be unusable.

New feature allows to ["switch" snapshots in published
repository](http://www.aptly.info/#aptly-publish-switch). aptly would do
its best to minimize repository downtime:

-   first, new packages files are linked to published root
-   new metadata files (`Packages`, `Release`, ...) are created in
    temporary locations
-   new versions of metadata files are moved to final locations
-   old package files are cleaned up from the pool (if required).

For example:

    aptly snapshot create wheezy-7.3 from mirror wheezy-main
    aptly publish snapshot wheezy-7.3
    ....
    aptly mirror update wheezy-main
    aptly snapshot create wheezy-7.4 from mirror wheezy-main
    aptly publish switch wheezy wheezy-7.4

Merge Strategy
==============

When [merging snapshots](http://www.aptly.info/#aptly-snapshot-merge)
aptly would override packages with the version from the latest argument
on the command line. This works ok if you merge, for example regular
repository and backports. But sometimes this is not enough, e.g. when
merging regular repository, updates and security repository. aptly now
supports flag `-latest` to change merge strategy to "latest version
wins":

    aptly snapshot merge -latest wheezy-latest wheezy-backports wheezy-main wheezy-security

Thanks to [Ryan Uber](https://github.com/ryanuber) and [Keith
Chambers](https://github.com/keithchambers) for the idea and pull
request.

Scripting
=========

Sometimes you need to perform bunch of actions with mirrors, snapshots
or repositories. aptly 0.5 supports special "raw" listing which is
easily parseable. E.g. update all Debian mirrors:

    aptly mirror list -raw | grep -E '^debian-.*' | xargs -n 1 aptly mirror update

Thanks to [Eric Keller](https://github.com/erickeller) for the idea.

All Changes
===========

Full list of changes in 0.5:

<ul>
    <li>Debian packages for aptly are <a href="http://www.aptly.info#download">available</a></li>
    <li>internal DB is compacted when calling <a href="http://www.aptly.info#aptly-db-cleanup">aptly db cleanup</a> (<a href="https://github.com/aptly-dev/aptly/issues/19">#19</a>)</li>
    <li>size is shown in human-readable format (<a href="https://github.com/aptly-dev/aptly/issues/18">#18</a>)</li>
    <li>fixed wrong location of man page in Debian package (<a href="https://github.com/aptly-dev/aptly/issues/22">#22</a>)</li>
    <li>new flags: <code>-distribution</code> and <code>-component</code> to specify default publishing options in <a href="http://www.aptly.info#aptly-repo-create">aptly repo create</a> (<a href="https://github.com/aptly-dev/aptly/issues/12">#12</a>)</li>
    <li>aptly would try harder to figure out distribution &amp; component automatically when publishing going through the tree of snapshots, mirrors and local repositories</li>
    <li>aptly supports publishing local repositories, without intermediate snapshot step (<a href="https://github.com/aptly-dev/aptly/issues/10">#10</a>)</li>
    <li>new command: <a href="http://www.aptly.info#aptly-publish-repo">aptly publish repo</a> to publish local repository directly (<a href="https://github.com/aptly-dev/aptly/issues/10">#10</a>)</li>
    <li>new command: <a href="http://www.aptly.info#aptly-repo-edit">aptly publish edit</a> to change defaults for the local repository (<a href="https://github.com/aptly-dev/aptly/issues/12">#12</a>)</li>
    <li>aptly supports global &amp; command flags placement in any position in command line (before command name, after command name) (<a href="https://github.com/aptly-dev/aptly/issues/17">#17</a>)</li>
    <li>new command: <a href="http://www.aptly.info#aptly-db-recover">aptly db recover</a> to recover internal DB after crash (<a href="https://github.com/aptly-dev/aptly/issues/25">#25</a>)</li>
    <li>new flag: <code>-raw</code> to display list in machine-readable format for commands <a href="http://www.aptly.info#aptly-mirror-list">aptly mirror list</a>, <a href="http://www.aptly.info#aptly-repo-list">aptly repo list</a>, <a href="http://www.aptly.info#aptly-snapshot-list">aptly snapshot list</a> and <a href="http://www.aptly.info#aptly-publish-list">aptly publish list</a> (<a href="https://github.com/aptly-dev/aptly/issues/27">#27</a>, <a href="https://github.com/aptly-dev/aptly/issues/31">#31</a>)</li>
    <li>new flags: <code>-origin</code> and <code>-label</code> to customize fields <code>Origin:</code> and <code>Label:</code> in <code>Release</code> files during publishing in commands <a href="http://www.aptly.info#aptly-publish-snapshot">aptly publish snapshot</a> and <a href="http://www.aptly.info#aptly-publish-repo">aptly publish repo</a> (<a href="https://github.com/aptly-dev/aptly/issues/29">#29</a>)</li>
    <li>bug fix: with some HTTP servers aptly might have given "size mismatch" errors due to unnecessary decompression (<a href="https://github.com/aptly-dev/aptly/issues/33">#33</a>)</li>
    <li>new command: <a href="http://www.aptly.info#aptly-publish-update">aptly publish update</a> updates published repo in-place (<a href="https://github.com/aptly-dev/aptly/issues/8">#8</a>)</li>
    <li>new command: <a href="http://www.aptly.info#aptly-publish-switch">aptly publish switch</a> switches published snapshot in-place (<a href="https://github.com/aptly-dev/aptly/issues/8">#8</a>)</li>
    <li>new flag: <code>-latest</code> for command <a href="http://www.aptly.info#aptly-snapshot-merge">aptly snapshot merge</a> changes merge strategy to "latest version wins" (<a href="https://github.com/aptly-dev/aptly/pull/42">#42</a>), thanks to <a href="https://github.com/ryanuber">@ryanuber</a> and <a href="https://github.com/keithchambers">@keithchambers</a></li>
</ul>

