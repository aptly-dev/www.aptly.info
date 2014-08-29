---
date: "2014-08-29T11:17:38Z"
title: "aptly package show"
tags:
    - command
menu:
    doc:
        parent: aptly package
        weight: 20
---

aptly package show
------------------

Display details about packages from whole package database. Command
show does searching much like [`aptly package search`](/doc/aptly/package/search/)
command does, but displays complete information about the package:

- contents of control file
- (optionally) information about package files in the pool
- (optionally) list of mirrors, local repos and snapshots that reference (include) this package

It is possible to submit any search query to this command, but it is much more common
to have queries resulting in single package.

Usage:

    $ aptly package show <package-query>

Params are:

-   `package-query` is a [package query](/doc/feature/query/) to
    search for packages (most usually in the format of package
    reference, e.g. `bwbar_1.2.3-2_amd64`)

Flags:

-   `-with-files=false`: display list of package files in the package pool
-   `-with-references=false`: display list of mirrors, snapshots and local repos
    which reference this package.

Example:

    $ aptly package show -with-files -with-references bwbar_1.2.3-2_source
    Package: bwbar
    Version: 1.2.3-2
    Priority: source
    Section: net
    Maintainer: Julien Danjou <acid@debian.org>
    Architecture: any
    Format: 1.0
    Build-Depends: debhelper (>> 7.0.0), libpng12-dev, cdbs
    Files: 138ba54405656adc16c882839482795e 54582 bwbar_1.2.3-2.diff.gz
     cd4f216514cf38f42be9d7b35d429adc 1586 bwbar_1.2.3-2.dsc
     766265ddf0615b552ff19d12f78be719 34142 bwbar_1.2.3.orig.tar.gz
    Checksums-Sha1: c5259d7fc3ac750d9d9b8d458d702a1bc49a708e 54582 bwbar_1.2.3-2.diff.gz
     674a6f5db91e83f9ad4f30d1563d3249aa21bb39 1586 bwbar_1.2.3-2.dsc
     13f5a17658a5c5adbb0db5b0fdd88805d6b3158b 34142 bwbar_1.2.3.orig.tar.gz
    Directory: pool/main/b/bwbar
    Binary: bwbar
    Standards-Version: 3.9.2
    Checksums-Sha256: 1ae625e6a29b745d24bab9185692ecc5b17cb4624d2019ae9a94e08a89f15edb 54582 bwbar_1.2.3-2.diff.gz
     b2d022dd912bc1129b0d0e216b7f8e587649582578484c776bcbe81afe993879 1586 bwbar_1.2.3-2.dsc
     bd8f5079f17b1dec6eae81ddc43c58c49b777b336fd902ffbb8e631885fbb45c 34142 bwbar_1.2.3.orig.tar.gz

    Files in the pool:
      /Users/smira/.aptly/pool/13/8b/bwbar_1.2.3-2.diff.gz
      /Users/smira/.aptly/pool/cd/4f/bwbar_1.2.3-2.dsc
      /Users/smira/.aptly/pool/76/62/bwbar_1.2.3.orig.tar.gz

    References to package:
      mirror [wheezy-main-src]: http://mirror.yandex.ru/debian/ wheezy [src]

