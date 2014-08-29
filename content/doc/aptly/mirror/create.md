---
date: "2014-08-08T11:17:38Z"
title: "aptly mirror create"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 10
---

aptly mirror create
-------------------

Creates mirror of remote repository, aptly supports both regular and
flat Debian repositories exported via HTTP(S) or FTP. aptly would try download
Release file from remote repository and verify its signature.

Usage:

    $  aptly mirror create <name> <archive url> <distribution> [<component1> ...]

For Launchpad PPAs:

    $  aptly mirror create <name> <ppa:user/project>

Params are:

-   `name` is a name that would be used in aptly to reference this
    mirror
-   `archive url` is a root of archive, e.g.
    [http://ftp.ru.debian.org/debian/](http://ftp.ru.debian.org/debian/)
-   `distribution` is a distribution name, e.g. `squeeze`, for flat
    repositories use `./` instead of distribution name
-   `component1` is an optional list of components to download, if not
    specified aptly would fetch all components.

Flags:

-   `-filter=`: [package query](/doc/feature/query/) that is applied to
    packages in the mirror
-   `-filter-with-deps=false`: when filtering, include dependencies of
    matching packages as well
-   `-ignore-signatures=false`: disable verification of Release file
    signatures
-   `-keyring=trustedkeys.gpg`: gpg keyring to use when verifying
    Release file (could be specified multiple times)
-   `-with-sources=false`: download source packages in addition to
    binary packages (could be enabled by default with config option
    `downloadSourcePackages`)

By default aptly would download packages for all available
architectures. If architectures are limited (with config `architectures`
or option `-architectures`), only packages for those architectures are
downloaded.

If components are not specified, aptly will download packages from all
components and merge them into one. If components should
be left separate, please create [separate mirror for each component](/doc/feature/multi-component/).

If PPA url is specified, aptly would expand it to HTTP url using
configuration options `ppaDistributorID` & `ppaCodename`. If you're
running aptly on Ubuntu, defaults should work (aptly would figure out
codename using `lsb_release` command).

If filtering is enabled, all package lists are downloaded and filters
are applied to those lists. Only packages that match filter query would
be downloaded and filtered list would be stored as contents of the mirror. If
dependency following is enabled, dependencies would be expanded in
filtered list to build resulting package list. Filters could be used to
limit mirror to only one package and its dependencies
(`-filter='nginx' -filter-follow-deps`), download only high-priority
packages (`-filter='Prirority (required)'`) and so on.

aptly would try to verify signature of Release files using GnuPG. By
default, keyring `~/.gnupg/trustedkeys.gpg` would be used. If you would
like to use different keyring(s), specify them using `-keyring` flag.
aptly would advise `gpg` commands to import keys into trusted keys
keyring in order to successfully verify repository signature.

If aptly is running on Debian/Ubuntu machine, it would be good idea to import
archive signing keys shipped with the operating system:

    $ gpg --keyring /usr/share/keyrings/debian-archive-keyring.gpg --export | gpg --no-default-keyring --keyring trustedkeys.gpg --import

If you're running Ubuntu, use
`/usr/share/keyrings/ubuntu-archive-keyring.gpg`

If GnuPG is complaining that required key to verify signature is
missing, it would report key ID, e.g. `46925553`. Keys could be
downloaded from public keyserver and imported into trusted keyring using
command:

    $ gpg --no-default-keyring --keyring trustedkeys.gpg --keyserver keys.gnupg.net --recv-keys 46925553

Replace `46925553` with the key ID GnuPG is complaining about.

If you're mirroring flat repository, sometimes repository key is located
near release files, so you can download it and import into your trusted
keychain:

    $ wget -O - http://some.repo/repository/Release.key | gpg --no-default-keyring --keyring trustedkeys.gpg --import

You can learn about signed Debian repositories in [Debian wiki](https://wiki.debian.org/SecureApt).
If you would like to disable signature checks, you can use flag `-ignore-signatures` or configuration
setting `gpgDisableVerify`.

aptly deduplicates all downloaded files, so if two mirrors are created
one with source packages enabled and another with source packages
disabled, they would consume only space required to store all binary and
source packages (not twice the space required to store binary packages).

Example:

    $ aptly -architectures="amd64" mirror create debian-main http://ftp.ru.debian.org/debian/ squeeze main
    2013/12/28 19:44:45 Downloading http://ftp.ru.debian.org/debian/dists/squeeze/Release...
    ...

    Mirror [debian-main]: http://ftp.ru.debian.org/debian/ squeeze successfully added.
    You can run 'aptly mirror update debian-main' to download repository contents.

For newly created mirror, [`aptly mirror update`](/doc/aptly/mirror/update/) should be run
to download mirror contents for the first time.
