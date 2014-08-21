---
date: "2014-08-08T11:17:38Z"
title: History
menu:
    doc:
        weight: 120
---

History
-------

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

-   direct [publishing to Amazon S3](/doc/aptly/feature/s3/)
    ([\#15](https://github.com/smira/aptly/issues/15))
-   support for new, powerful [query language](/doc/aptly/feature/query/) in many
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
    publish](/doc/aptly/snapshot/publish/) command
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
