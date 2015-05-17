---
date: "2014-08-08T11:17:38Z"
title: History
menu:
    doc:
        weight: 120
---

History
-------

### Version 0.9.6~dev

- support for `.changes` file processing, including
  uploaders restriction: new command
  [aptly repo include](/doc/aptly/repo/include), new flag
  `-uploaders-file` for commands [aptly repo create](/doc/aptly/repo/create)
  and [aptly repo edit](/doc/aptly/repo/edit)
  ([\#71](https://github.com/smira/aptly/issues/71))
  **this work has been sponsored by sipgate GmbH** (http://www.sipgate.de/)
- support for `Contents` indexes generation, new flag `-skip-contents`
  for `aptly publish` commands to disable it (per published repository)
  ([\#142](https://github.com/smira/aptly/issues/142))
- support for non-Amazon S3-compatible cloud storages
  ([\#218](https://github.com/smira/aptly/pull/218))
  thanks to
  [Serge van Ginderachter](https://github.com/srvg)
- new flags `-format` and `-output` for [aptly graph](/doc/aptly/graph)
  ([\#163](https://github.com/smira/aptly/issues/163),
   [\#242](https://github.com/smira/aptly/pull/242)),
   thanks to [Zhang, Guodong](https://github.com/gdbdzgd)
- now aptly removes empty `Depends:` lines
  ([\#233](https://github.com/smira/aptly/issues/233))
- preliminary support for `.ddeb` packages
  ([\#231](https://github.com/smira/aptly/pull/231))

### Version 0.9.5

- all `search` commands now exit with code 1 if no results had been found
  ([\#213](https://github.com/smira/aptly/issues/213))
- command [aptly db cleanup](/doc/aptly/db/cleanup) supports two new flags
  `-verbose` and `-dry-run`
  ([\#217](https://github.com/smira/aptly/issues/217))
- command [aptly publish drop](/doc/aptly/publish/drop) gets new flag
  `-force-drop` to drop published repository even if component cleanup
  errors
  ([\#153](https://github.com/smira/aptly/issues/153))
- bug fix: aptly reads fields from control files in case-insensitive manner
  ([\#193](https://github.com/smira/aptly/issues/193))

### Version 0.9.1

*Critical bugfix release*

- bug fix: `aptly db cleanup` was cleaning up duplicate packages
  ([\#217](https://github.com/smira/aptly/issues/217))

### Version 0.9

- **REST API** for snapshots, local repos, file upload, publishing, graphs and version
  ([\#16](https://github.com/smira/aptly/issues/16))
  ([\#116](https://github.com/smira/aptly/issues/116))
  ([\#167](https://github.com/smira/aptly/pull/167))
  ([\#168](https://github.com/smira/aptly/pull/168))
  ([\#169](https://github.com/smira/aptly/pull/169))
  ([\#174](https://github.com/smira/aptly/pull/174)),
  thanks to
  [Sylvain Baubeau](https://github.com/lebauce),
  [Michael Koval](https://github.com/mkoval)
- new **OpenStack Swift** backend for publishing
  ([\#191](https://github.com/smira/aptly/pull/191)),
  thanks to [Sebastien Badia](https://github.com/sbadia),
  [Sylvain Baubeau](https://github.com/lebauce) and
  [John Leach](https://github.com/johnl)
- command [aptly package search](/doc/aptly/package/search) exits with
  failure code if no packages have been found
  ([\#188](https://github.com/smira/aptly/issues/188))
- fix to continue downloading on 403 error (workaround for Amazon S3 behavior)
  ([\#131](https://github.com/smira/aptly/pull/131)),
  thanks to [Rohan Garg](https://github.com/shadeslayer)
- fix to support different types of `control` member in Debian archive
  ([\#128](https://github.com/smira/aptly/pull/128)),
  thanks to [Russ Allbery](https://github.com/rra)
- new flag `-batch` for publish commands in no-tty mode (e.g. when running from cron)
  ([\#121](https://github.com/smira/aptly/issues/121))
  ([\#122](https://github.com/smira/aptly/pull/122)),
  thanks to [Dmitrii Kashin](https://github.com/freehck)
- new flag `-force-components` for [aptly mirror create](/doc/aptly/mirror/create) to
  workaround repos which list actually missing components in `Release` files
  ([\#147](https://github.com/smira/aptly/issues/147))
- new expiremental command [aptly task run](/doc/aptly/task/run)
  ([\#96](https://github.com/smira/aptly/pull/96)),
  thanks to [Simon Aquino](https://github.com/simonaquino)
- new command [aptly config show](/doc/aptly/config/show)
  ([\#123](https://github.com/smira/aptly/pull/123)),
  thanks to [Simon Aquino](https://github.com/simonaquino)
- security issue: advise to use https:// when dowloading repo keys,
  ([\#179](https://github.com/smira/aptly/issues/179))
- goleveldb updated to new version with panic fixed
  ([\#150](https://github.com/smira/aptly/issues/150))
- workaround for different `MD5Sum` field name
  ([\#151](https://github.com/smira/aptly/issues/151))
- workaround for repositories with conflicting packages in the index
  ([\#183](https://github.com/smira/aptly/issues/183))
- bug fix: aptly shouldn't include empty `Source:` fields
  into package stanza when publishing
  ([\#195](https://github.com/smira/aptly/issues/195))
- bug fix: when doing [aptly repo add](/doc/aptly/repo/add) with
  `-force-replace` too many packages have been removed
  ([\#185](https://github.com/smira/aptly/issues/185))
  ([\#186](https://github.com/smira/aptly/pull/186))
  thanks to [Andrea Bernardo Ciddio](https://github.com/bcandrea)
- bug fix: adding packages to repository from published location
  truncates the file in the pool
  ([\#127](https://github.com/smira/aptly/pull/127)),
  thanks to [Simon Aquino](https://github.com/simonaquino)
- bug fix: start writing to stdout only when database is closed,
  avoids problems with pipes
  ([\#117](https://github.com/smira/aptly/issues/117))
- bug fix: report correct errors when falling back between
  package index versions
  ([\#125](https://github.com/smira/aptly/issues/125))
  ([\#129](https://github.com/smira/aptly/issues/129))
- bug fix: workaround `+` encoding when downloading from Amazon S3
  ([\#130](https://github.com/smira/aptly/issues/130))
- bug fix: handling mirrors with `/` in component names
  ([\#140](https://github.com/smira/aptly/issues/140))
  ([\#141](https://github.com/smira/aptly/issues/141))
- bug fix: [aptly db cleanup](/doc/aptly/db/cleanup) might remove
  packages still being published when publishing local repos
  ([\#146](https://github.com/smira/aptly/issues/146))
- bug fix: [aptly snapshot merge](/doc/aptly/snapshot/merge)
  might have created unusable snapshots with conflicting packages
  ([\#154](https://github.com/smira/aptly/issues/154))
- bug fix: gpg with `--passphrase-file` on Ubuntu requires
  `--no-use-agent`
  ([\#162](https://github.com/smira/aptly/issues/162))
- bug fix: some Debian tools expect `Packages` index
  file to be sorted and fields to be in canonical order
  ([\#172](https://github.com/smira/aptly/issues/172))
- bug fix: publishing repository with `.udeb` and sources
  might produce empty `Sources` index
  ([\#180](https://github.com/smira/aptly/issues/180))
- bug fix: when proxying, don't apply fix for Amazon S3
  and `+` in URLs
  ([\#189](https://github.com/smira/aptly/issues/189))
- bug fix: command [aptly publish switch](/doc/aptly/publish/switch) might have corrupted
  published repository due to missing checks on component names
  ([\#192](https://github.com/smira/aptly/issues/192))
- bug fix: debian installer doesn't like Release files without `Suite` field
  ([\#201](https://github.com/smira/aptly/pull/201))
  thanks to [Alexander Guy](https://github.com/alexanderguy)

### Version 0.8

 - aptly supports **concurrent operations while mirror is updated**, new flag
   `-force` for [aptly mirror update](/doc/aptly/mirror/update/)
   ([\#45](https://github.com/smira/aptly/issues/45)) ([\#114](https://github.com/smira/aptly/issues/114))
 - support for **`.udeb` packages (Debian installer)** in mirrors, local repos and
   published repositories
   ([\#108](https://github.com/smira/aptly/issues/108))
 - new command [aptly snapshot filter](/doc/aptly/snapshot/filter):
   **filtering snapshots** using package query, complementary
   to [snapshot pulling](/doc/aptly/snapshot/pull/)
   ([\#82](https://github.com/smira/aptly/issues/82))
 - **searching for packages matching query** in
   [mirrors](/doc/aptly/mirror/search),
   [local repos](/doc/aptly/repo/search),
   [snapshots](/doc/aptly/snapshot/search) and
   [whole package database](/doc/aptly/package/search)
   ([\#81](https://github.com/smira/aptly/issues/81))
   ([\#80](https://github.com/smira/aptly/issues/80))
 - new command [aptly package show](/doc/aptly/package/show/):
   displaying **details about package**, its inclusion into snapshots,
   mirrors, local repos
   ([\#80](https://github.com/smira/aptly/issues/80))
 - [aptly mirror edit](/doc/aptly/mirror/edit/) now supports changing list of architectures
   and download source setting
   ([\#109](https://github.com/smira/aptly/issues/109))
   ([\#99](https://github.com/smira/aptly/issues/99))
 - workaround S3/apt issue with `+` in package filenames
   (S3 config option `plusWorkaround`)
   ([\#105](https://github.com/smira/aptly/issues/105))
 - when publishing to S3 it's possible to choose reduced redundancy storage and
   server-side encryption (S3 config options `storageClass` and `encryptionMethod`)
   ([\#105](https://github.com/smira/aptly/issues/105))
 - when signing published repository, it's possible to pass passphrase
   for GPG key with flags `-passphrase` or `-passphrase-file`
   ([\#94](https://github.com/smira/aptly/issues/194))
 - new flag `-force-replace` in [aptly repo add](/doc/aptly/repo/add/) command
   to replace conflicting packages automatically
   ([\#83](https://github.com/smira/aptly/issues/83))
 - dependency resolution algorithm has been improved
   ([\#100](https://github.com/smira/aptly/issues/100))
 - aptly now supports mirroring over FTP
   ([\#48](https://github.com/smira/aptly/issues/48))
 - bug fix: for boolean options, settings
   from configuration file were overriding settings on command line
   ([\#104](https://github.com/smira/aptly/issues/104))
 - bug fix: [aptly publish list](/doc/aptly/publish/list/) with `-raw` flag
   hasn't been displaying storage prefix for repositories published to S3
   ([\#113](https://github.com/smira/aptly/issues/113))
 - bug fix: dropping repositories published to S3 might result in "bad signature" error
 - bug fix: publishing repositories with `/` in distribution name isn't allowed anymore,
   when guessing distribution `/` is replaced with `-`
   ([\#110](https://github.com/smira/aptly/issues/110))
 - bug fix: download errors while mirroring now include original
   URL
   ([\#26](https://github.com/smira/aptly/issues/26))

### Version 0.7.1

-   bug fix: publish update fails on package conflicts, new flag
    `-force-overwrite` added to publish commands
    ([\#90](https://github.com/smira/aptly/issues/90))
-   bug fix: aptly built with go1.2+ fails to read DB of aptly built
    with go1.1 or go1.0
    ([\#89](https://github.com/smira/aptly/issues/89))
-   aptly supports go compilers version 1.2 and up (go 1.1 is not
    supported anymore)

### Version 0.7

-   direct [publishing to Amazon S3](/doc/feature/s3/)
    ([\#15](https://github.com/smira/aptly/issues/15))
-   support for new, powerful [query language](/doc/feature/query/) in many
    commands: [aptly snapshot pull](/doc/aptly/snapshot/pull/), [aptly repo
    move](/doc/aptly/repo/move/), [aptly repo copy](/doc/aptly/repo/copy/), [aptly
    repo import](/doc/aptly/repo/import/) and [aptly repo
    remove](/doc/aptly/repo/remove/)
-   bug fix: files from conflicting packages might override each other
    while publishing ([\#65](https://github.com/smira/aptly/issues/65))
-   partial mirrors: filter package lists when mirroring
    ([\#64](https://github.com/smira/aptly/issues/64))
-   new commands: [mirrors](/doc/aptly/mirror/rename/), [local
    repositories](/doc/aptly/repo/rename/) and
    [snapshots](/doc/aptly/snapshot/rename/) can be renamed
    ([\#63](https://github.com/smira/aptly/issues/63))
-   new command: [aptly mirror edit](/doc/aptly/mirror/edit/) allows to
    change mirror filtering
    ([\#63](https://github.com/smira/aptly/issues/63))
-   download transfer rate could be limited either via
    [configuration](/doc/configuration) file parameter `downloadSpeedLimit`
    or with flag `-download-limit` for command [aptly mirror
    update](/doc/aptly/mirror/update/)
    ([\#62](https://github.com/smira/aptly/issues/62))
-   new flag: `-all-matches` for [aptly snapshot
    pull](/doc/aptly/snapshot/pull/) enables pulling of all matching packages
    ([\#70](https://github.com/smira/aptly/pull/70)), thanks to [Simon
    Aquino](https://github.com/simonaquino)
-   when matching single package in [aptly snapshot
    pull](/doc/aptly/snapshot/pull/) latest version would be pulled
    ([\#67](https://github.com/smira/aptly/pull/67)), thanks to [Simon
    Aquino](https://github.com/simonaquino)
-   new flag: `-sort` for [aptly snapshot list](/doc/aptly/snapshot/list/)
    allows to change order of snapshots in the list
    ([\#73](https://github.com/smira/aptly/pull/73)), thanks to [Simon
    Aquino](https://github.com/simonaquino)
-   bug fix: publish update fails on empty multi-component repo
    ([\#66](https://github.com/smira/aptly/issues/66))
-   bug fix: [aptly snapshot pull](/doc/aptly/snapshot/pull/) might remove
    already pulled packages
    ([\#78](https://github.com/smira/aptly/issues/78))
-   bug fix: aptly package was missing `bzip2` dependency
    ([\#84](https://github.com/smira/aptly/issues/84))
-   aptly binary packages are built with go1.3

### Version 0.6

-   support for multi-component published repositories
    ([\#36](https://github.com/smira/aptly/issues/36))
-   handling duplicate packages with different content gracefully
    ([\#60](https://github.com/smira/aptly/issues/60))
-   repositories published by aptly now can be consumed by
    debian-installer ([\#61](https://github.com/smira/aptly/issues/61))
-   new flag: `-no-remove` for [aptly snapshot
    merge](/doc/aptly/snapshot/merge/) to merge snapshots with all package
    versions preserved
    ([\#57](https://github.com/smira/aptly/issues/57))
-   publishing of empty snapshots/repositories is possible
    ([\#55](https://github.com/smira/aptly/issues/55))
-   [aptly repo add](/doc/aptly/repo/add/) now exits with 1 if any of files
    failed to add ([\#53](https://github.com/smira/aptly/issues/53))
-   bug fix: `Package:` line comes first in package metadata
    ([\#49](https://github.com/smira/aptly/issues/49))
-   bug fix: when command parsing fails, aptly returns exit code 2
    ([\#52](https://github.com/smira/aptly/issues/52))
-   bug fix: pulling more than 128 packates at once
    ([\#53](https://github.com/smira/aptly/issues/53))
-   bug fix: [aptly graph](/doc/aptly/graph/) may get confused with package
    pull requests ([\#58](https://github.com/smira/aptly/issues/58))

### Version 0.5.1

-   bug fix: `HTTP_PROXY` environment variable has been ignored
    ([\#46](https://github.com/smira/aptly/issues/46))
-   bug fix: support for flat repositories in subdirectory
    ([\#47](https://github.com/smira/aptly/issues/47))
-   bug fix: wrong pool directory name when `Source:` contains version
    ([\#44](https://github.com/smira/aptly/issues/44))

### Version 0.5

-   Debian packages for aptly are [available](/download/)
-   internal DB is compacted when calling [aptly db
    cleanup](/doc/aptly/db/cleanup/)
    ([\#19](https://github.com/smira/aptly/issues/19))
-   size is shown in human-readable format
    ([\#18](https://github.com/smira/aptly/issues/18))
-   fixed wrong location of man page in Debian package
    ([\#22](https://github.com/smira/aptly/issues/22))
-   new flags: `-distribution` and `-component` to specify default
    publishing options in [aptly repo create](/doc/aptly/repo/create/)
    ([\#12](https://github.com/smira/aptly/issues/12))
-   aptly would try harder to figure out distribution & component
    automatically when publishing going through the tree of snapshots,
    mirrors and local repositories
-   aptly supports publishing local repositories, without intermediate
    snapshot step ([\#10](https://github.com/smira/aptly/issues/10))
-   new command: [aptly publish repo](/doc/aptly/publish/repo/) to publish
    local repository directly
    ([\#10](https://github.com/smira/aptly/issues/10))
-   new command: [aptly publish edit](/doc/aptly/repo/edit/) to change
    defaults for the local repository
    ([\#12](https://github.com/smira/aptly/issues/12))
-   aptly supports global & command flags placement in any position in
    command line (before command name, after command name)
    ([\#17](https://github.com/smira/aptly/issues/17))
-   new command: [aptly db recover](/doc/aptly/db/recover/) to recover
    internal DB after crash
    ([\#25](https://github.com/smira/aptly/issues/25))
-   new flag: `-raw` to display list in machine-readable format for
    commands [aptly mirror list](/doc/aptly/mirror/list/), [aptly repo
    list](/doc/aptly/repo/list/), [aptly snapshot list](/doc/aptly/snapshot/list/)
    and [aptly publish list](/doc/aptly/publish/list/)
    ([\#27](https://github.com/smira/aptly/issues/27),
    [\#31](https://github.com/smira/aptly/issues/31))
-   new flags: `-origin` and `-label` to customize fields `Origin:` and
    `Label:` in `Release` files during publishing in commands [aptly
    publish snapshot](/doc/aptly/publish/snapshot/) and [aptly publish
    repo](/doc/aptly/publish/repo/)
    ([\#29](https://github.com/smira/aptly/issues/29))
-   bug fix: with some HTTP servers aptly might have given "size
    mismatch" errors due to unnecessary decompression
    ([\#33](https://github.com/smira/aptly/issues/33))
-   new command: [aptly publish update](/doc/aptly/publish/update/) updates
    published repo in-place
    ([\#8](https://github.com/smira/aptly/issues/8))
-   new command: [aptly publish switch](/doc/aptly/publish/switch/) switches
    published snapshot in-place
    ([\#8](https://github.com/smira/aptly/issues/8))
-   new flag: `-latest` for command [aptly snapshot
    merge](/doc/aptly/snapshot/merge/) changes merge strategy to "latest
    version wins" ([\#42](https://github.com/smira/aptly/pull/42)),
    thanks to [@ryanuber](https://github.com/ryanuber) and
    [@keithchambers](https://github.com/keithchambers)

### Version 0.4.1

-   fixed [bug](https://github.com/smira/aptly/issues/5) with slashes in
    component names

### Version 0.4

-   new command: [aptly db cleanup](/doc/aptly/db/cleanup/) to remove
    unreferenced DB entries and files
-   new flags: `-keyring` & `-secret-keyring` for [aptly snapshot
    publish](/doc/aptly/publish/snapshot/) command
-   aptly supports mirroring remote repos with source packages and
    publishing repositories with sources
-   new config: `downloadSourcePackages` to enable source package
    downloading
-   new flag: `-with-sources` for [aptly mirror
    create](/doc/aptly/mirror/create/) command
-   new config & flag: `dependencyFollowSource` & `-dep-follow-source`
    to follow `Source:` dependencies
-   packages are printed in lists with underscores instead of dashes,
    e.g. `pkg_1.3-3_amd64` instead of `pkg-1.3-3-amd64`
-   local package repositories are supported
-   new commands in `aptly repo` family: [add](/doc/aptly/repo/add/),
    [copy](/doc/aptly/repo/copy/), [create](/doc/aptly/repo/create/),
    [drop](/doc/aptly/repo/drop/), [import](/doc/aptly/repo/import/),
    [list](/doc/aptly/repo/list/), [move](/doc/aptly/repo/move/),
    [remove](/doc/aptly/repo/remove/) and [show](/doc/aptly/repo/show/)
-   command [aptly snapshot create](/doc/aptly/snapshot/create/) supports
    creation of snapshots from local repos
-   aptly peak memory usage has been reduced by factor of 3x
-   new flag `-no-remove` for [aptly snapshot
    pull](/doc/aptly/snapshot/pull/): don't remove other version of packages
    when pulling (e.g. keep old versions)
-   command [aptly mirror create](/doc/aptly/mirror/create/) supports
    shorthand PPA url: `ppa:user/project`
-   new config: `ppaDistributorID` & `ppaCodename` to specify PPA url
    expansion rules

### Version 0.3

-   `aptly snapshot show` doesn't show list of packages by default
-   option `-with-packages` to show list of packages stored in mirror
    and snapshot
-   [bash
    completion](https://github.com/aptly-dev/aptly-bash-completion) is
    now available for aptly
-   dropping [snapshots](/doc/aptly/snapshot/drop/) and
    [mirrors](/doc/aptly/mirror/drop/) is supported
-   [serving](/doc/aptly/serve/) published repositories
-   aptly does checksum validation when downloading from remote mirrors
-   aptly verifies crypto signature on Release files
-   aptly can create empty snapshots
-   new global flag `-config` to override default config location
-   Debian flat repositories are now supported
-   command [aptly graph](/doc/aptly/graph) can generate graph of
    dependencies
