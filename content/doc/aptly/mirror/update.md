---
date: "2014-08-08T11:17:38Z"
title: "aptly mirror update"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 20
---

aptly mirror update
-------------------

Updates remote mirror (downloads package files and meta information).
When mirror is created, this command should be run for the first time to
fetch mirror contents. This command could be run many times to get
updated repository contents. If interrupted, command could be restarted
safely.

Usage:

    $ aptly mirror update <name>

Params are:

-   `name` is a mirror name (given when mirror was created)

All packages would be stored under aptly's root dir (see section on
[Configuration](/doc/configuration)).

Flags:

-   `-force=false`: force mirror update even if locked by another process
-   `-download-limit=0`: limit download speed (kbytes/sec)
-   `-ignore-checksums=false`: ignore checksum mismatches for downloaded
    items (package files, metadata)
-   `-ignore-signatures=false`: disable verification of `Release` file
    signatures
-   `-keyring=trustedkeys.gpg` gpg keyring to use when verifying Release
    file (could be specified multiple times)
-   `-max-tries=1`: Max download tries till process fails with download error

While updating mirror, aptly would verify signature of `Release` file
using GnuPG. Please read information about signature verification in
[aptly mirror create](/doc/aptly/mirror/create) command description.

Example:

    $ aptly mirror update debian-main

    2013/12/29 18:32:34 Downloading http://ftp.ru.debian.org/debian/dists/squeeze/Release...
    2013/12/29 18:32:37 Downloading http://ftp.ru.debian.org/debian/dists/squeeze/main/binary-amd64/Packages.bz2...
    2013/12/29 18:37:19 Downloading http://ftp.ru.debian.org/debian/pool/main/libg/libgwenhywfar/libgwenhywfar47-dev_3.11.3-1_amd64.deb...
    ....

#### Concurrent operations while mirror is updated

Mirror update is split in two phases:

 * initial download of `Release` and `Packages` files, parsing, analyzing
 * download of packages files

During second phase aptly would unlock the database and allow other aptly commands to be run while the mirror is
being updated. Any operations with the mirror currently updated would result in error and `aptly mirror show` would
show updating status. At the end of the mirror update operation, aptly would re-open the database
and store final status of the mirror.

If mirror update status would be stored in wrong way in DB (e.g. after crash), mirror update lock could be
overridden with flag `-force`.
