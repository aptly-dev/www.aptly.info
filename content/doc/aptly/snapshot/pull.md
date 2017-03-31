---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot pull"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 50
---

aptly snapshot pull
-------------------

Pulls new packages (along with its [dependencies](/doc/feature/dependencies)) to `name` snapshot from
`source` snapshot. Also pull command can upgrade package versions if
`name` snapshot already contains packages being pulled. New
snapshot `destination` is created as result of this process.

Usage:

    $ aptly snapshot pull <name> <source> <destination> <package-query> ...

Params:

-   `name` is snapshot name which has been given during snapshot
    creation
-   `source` is a snapshot name where packages and dependencies would be
    searched
-   `destination` is a name of the snapshot that would be created
-   `package-query` is a list of [package queries](/doc/feature/query/), in
    the simplest form, name of package to be pulled from `source` could
    be specified

Flags:

-   `-all-matches=false`: pull all the packages that satisfy the
    dependency version requirements (default is to pull first matching
    package)
-   `-dry-run=false`: don't create `destination` snapshot, just show what
    would be pulled
-   `-no-deps=false`: don't process dependencies, just pull listed
    packages
-   `-no-remove=false`: don't remove other package versions when pulling
    package

If architectures are limited (with config `architectures` or option
`-architectures`), only mentioned architectures are processed, otherwise
`aptly` will process all architectures in the snapshot.

If following dependencies by source is enabled (using either
`dependencyFollowSource` config option or flag `-dep-follow-source`),
pulling binary packages would also pull corresponding source packages as
well.

By default aptly would remove packages matching name and architecture
while importing: e.g. when importing `software_1.3_amd64`, package
`software_1.2.9_amd64` would be removed. With flag `-no-remove` both
package versions would stay in the snapshot.

aptly pulls first package matching each of `package queries`, but with
flag `-all-matches` all matching packages would be pulled.

Example:

    $ aptly snapshot pull snap-deb2-main back snap-deb-main-w-xorg xserver-xorg
    Dependencies would be pulled into snapshot:
        [snap-deb2-main]: Snapshot from mirror [deb2-main]: http://ftp.ru.debian.org/debian/ squeeze
    from snapshot:
        [back]: Snapshot from mirror [backports2]: http://mirror.yandex.ru/backports.org/ squeeze-backports
    and result would be saved as new snapshot snap-deb-main-w-xorg.
    Loading packages (49476)...
    Building indexes...
    [-] xserver-xorg-1:7.5+8+squeeze1_amd64 removed
    [+] xserver-xorg-1:7.6+8~bpo60+1_amd64 added
    [-] xserver-xorg-core-2:1.7.7-16_amd64 removed
    [+] xserver-xorg-core-2:1.10.4-1~bpo60+2_amd64 added
    [-] xserver-common-2:1.7.7-16_all removed
    [+] xserver-common-2:1.10.4-1~bpo60+2_all added
    [-] libxfont1-1:1.4.1-3_amd64 removed
    [+] libxfont1-1:1.4.4-1~bpo60+1_amd64 added
    [-] xserver-xorg-1:7.5+8+squeeze1_i386 removed
    [+] xserver-xorg-1:7.6+8~bpo60+1_i386 added
    [-] xserver-xorg-core-2:1.7.7-16_i386 removed
    [+] xserver-xorg-core-2:1.10.4-1~bpo60+2_i386 added
    [-] libxfont1-1:1.4.1-3_i386 removed
    [+] libxfont1-1:1.4.4-1~bpo60+1_i386 added

    Snapshot snap-deb-main-w-xorg successfully created.
    You can run 'aptly publish snapshot snap-deb-main-w-xorg' to publish snapshot as Debian repository.
