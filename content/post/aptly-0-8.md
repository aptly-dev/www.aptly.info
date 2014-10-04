+++
date = 2014-10-03T21:22:00Z
title = "aptly 0.8 - .udeb support, search and filtering"
+++

[aptly](http://www.aptly.info) 0.8 has been released today.
For installation instructions, please proceed to [Download](http://www.aptly.info#download) page.

Most important new features are:

Searching for Packages
----------------------

aptly has powerful [query language](http://www.aptly.info/doc/feature/query)
which allows to select subset of packages. Query language is used
in many commands: pulling packages between snapshots, copying, moving packages
between local repositories, filtering mirror contents, etc. \
aptly 0.8 allows to use queries to search mirrors, snapshots and local repos
for packages matching condition. E.g. all packages that have been built
from source package `apt`:

    $ aptly mirror search wheezy-main '$Source (apt)'
    apt-doc_0.9.7.9+deb7u1_all
    apt-transport-https_0.9.7.9+deb7u1_amd64
    apt-utils_0.9.7.9+deb7u1_amd64
    libapt-pkg4.12_0.9.7.9+deb7u1_amd64
    apt_0.9.7.9+deb7u1_amd64
    libapt-pkg-dev_0.9.7.9+deb7u1_i386
    apt_0.9.7.9+deb7u1_i386
    libapt-pkg-doc_0.9.7.9+deb7u1_all
    libapt-pkg-dev_0.9.7.9+deb7u1_amd64
    libapt-inst1.5_0.9.7.9+deb7u1_amd64
    libapt-inst1.5_0.9.7.9+deb7u1_i386
    apt-utils_0.9.7.9+deb7u1_i386
    apt-transport-https_0.9.7.9+deb7u1_i386
    libapt-pkg4.12_0.9.7.9+deb7u1_i386

aptly can also search whole package database for packages matching condition. For
example, all packages with name starting with `pam`, not including source packages:

    $ aptly package search 'Name (% pam*), !$Architecture (source)'
    pam-dbus-notify_0.2.1-1_all
    paml_4.5-1_amd64
    paman_0.9.4-1_i386
    pam-pkcs11-dbg_0.6.8-1_amd64
    pamusb-common_0.5.0-4_i386
    pamusb-common_0.5.0-4_amd64
    pamusb-tools_0.5.0-4_all
    paman_0.9.4-1_amd64
    paml-doc_4.5-1_all
    pam-pkcs11-dbg_0.6.8-1_i386

We can get details about packages, including its inclusion into other objects:

    $ aptly package show -with-references libattr1_1:2.4.46-8_amd64
    Package: libattr1
    Version: 1:2.4.46-8
    Installed-Size: 61
    Priority: required
    ...

    References to package:
      mirror [wheezy-main]: http://mirror.yandex.ru/debian/ wheezy
      mirror [wheezy-main-src]: http://mirror.yandex.ru/debian/ wheezy [src]
      snapshot [wheezy-7.5]: Snapshot from mirror [wheezy-main]: http://mirror.yandex.ru/debian/ wheezy


Filtering Snapshots
-------------------

Now snapshots could be filtered directly to produce other snapshots. Prior to that,
the same effect could be achieved using empty snapshot as one of the arguments
to `aptly snapshot pull` command. Filtering is based on package queries as well.
E.g. extract 'required' part of Debian into separate snapshot:

    $ aptly snapshot filter wheezy-7.5 wheezy-7.5-required 'Priority (required)'
    Loading packages (56121)...
    Building indexes...

    Snapshot wheezy-7.5-required successfully filtered.
    You can run 'aptly publish snapshot wheezy-7.5-required' to publish snapshot as Debian repository.

    $ aptly snapshot show wheezy-7.5-required
    Name: wheezy-7.5-required
    Created At: 2014-10-03 21:50:30 MSK
    Description: Filtered 'wheezy-7.5', query was: 'Priority (required)'
    Number of packages: 113

.udeb Support
-------------

aptly now supports .udeb (micro-deb) packages in mirrors, local repos and published repositories.
.udeb packages are used by Debian installer during initial installation phase. With .udeb support,
it should be possible to install Debian from repository published by aptly. As aptly doesn't support
yet mirroring without resigning (leaving Debian signature as-is), it would require some changes to installer
in order to support custom key.


Concurrent Mirror Update
------------------------

Prior to version 0.8, aptly was locking database (which prevented any concurrent operations)
during whole `aptly mirror update` run, which included
download of package files that might take hours. aptly 0.8 would unlock the database
after package index download (right before package files download), so during download phase
other commands could be run, e.g. create another mirror, take snapshots, publish other repositories
and so on. aptly locks repository being updated during package download to prevent modifications
to the repository.

All Changes
-----------

Full list of changes since 0.7.1:

<ul>
  <li>aptly supports <strong>concurrent operations while mirror is updated</strong>, new flag
  <code>-force</code> for <a href="http://www.aptly.info/doc/aptly/mirror/update/">aptly mirror update</a>
  (<a href="https://github.com/smira/aptly/issues/45">#45</a>) (<a href="https://github.com/smira/aptly/issues/114">#114</a>)</li>
  <li>support for <strong><code>.udeb</code> packages (Debian installer)</strong> in mirrors, local repos and
  published repositories
  (<a href="https://github.com/smira/aptly/issues/108">#108</a>)</li>
  <li>new command <a href="http://www.aptly.info/doc/aptly/snapshot/filter">aptly snapshot filter</a>:
  <strong>filtering snapshots</strong> using package query, complementary
  to <a href="http://www.aptly.info/doc/aptly/snapshot/pull/">snapshot pulling</a>
  (<a href="https://github.com/smira/aptly/issues/82">#82</a>)</li>
  <li><strong>searching for packages matching query</strong> in
  <a href="http://www.aptly.info/doc/aptly/mirror/search">mirrors</a>,
  <a href="http://www.aptly.info/doc/aptly/repo/search">local repos</a>,
  <a href="http://www.aptly.info/doc/aptly/snapshot/search">snapshots</a> and
  <a href="http://www.aptly.info/doc/aptly/package/search">whole package database</a>
  (<a href="https://github.com/smira/aptly/issues/81">#81</a>)
  (<a href="https://github.com/smira/aptly/issues/80">#80</a>)</li>
  <li>new command <a href="http://www.aptly.info/doc/aptly/package/show/">aptly package show</a>:
  displaying <strong>details about package</strong>, its inclusion into snapshots,
  mirrors, local repos
  (<a href="https://github.com/smira/aptly/issues/80">#80</a>)</li>
  <li><a href="http://www.aptly.info/doc/aptly/mirror/edit/">aptly mirror edit</a> now supports changing list of architectures
  and download source setting
  (<a href="https://github.com/smira/aptly/issues/109">#109</a>)
  (<a href="https://github.com/smira/aptly/issues/99">#99</a>)</li>
  <li>workaround S3/apt issue with <code>+</code> in package filenames
  (S3 config option <code>plusWorkaround</code>)
  (<a href="https://github.com/smira/aptly/issues/105">#105</a>)</li>
  <li>when publishing to S3 it&rsquo;s possible to choose reduced redundancy storage and
  server-side encryption (S3 config options <code>storageClass</code> and <code>encryptionMethod</code>)
  (<a href="https://github.com/smira/aptly/issues/105">#105</a>)</li>
  <li>when signing published repository, it&rsquo;s possible to pass passphrase
  for GPG key with flags <code>-passphrase</code> or <code>-passphrase-file</code>
  (<a href="https://github.com/smira/aptly/issues/194">#94</a>)</li>
  <li>new flag <code>-force-replace</code> in <a href="http://www.aptly.info/doc/aptly/repo/add/">aptly repo add</a> command
  to replace conflicting packages automatically
  (<a href="https://github.com/smira/aptly/issues/83">#83</a>)</li>
  <li>dependency resolution algorithm has been improved
  (<a href="https://github.com/smira/aptly/issues/100">#100</a>)</li>
  <li>aptly now supports mirroring over FTP
  (<a href="https://github.com/smira/aptly/issues/48">#48</a>)</li>
  <li>bug fix: for boolean options, settings
  from configuration file were overriding settings on command line
  (<a href="https://github.com/smira/aptly/issues/104">#104</a>)</li>
  <li>bug fix: <a href="http://www.aptly.info/doc/aptly/publish/list/">aptly publish list</a> with <code>-raw</code> flag
  hasn&rsquo;t been displaying storage prefix for repositories published to S3
  (<a href="https://github.com/smira/aptly/issues/113">#113</a>)</li>
  <li>bug fix: dropping repositories published to S3 might result in &ldquo;bad signature&rdquo; error</li>
  <li>bug fix: publishing repositories with <code>/</code> in distribution name isn&rsquo;t allowed anymore,
  when guessing distribution <code>/</code> is replaced with <code>-</code>
  (<a href="https://github.com/smira/aptly/issues/110">#110</a>)</li>
  <li>bug fix: download errors while mirroring now include original
  URL
  (<a href="https://github.com/smira/aptly/issues/26">#26</a>)</li>
</ul>

