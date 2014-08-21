---
date: "2014-08-08T11:17:38Z"
title: "aptly publish snapshot"
tags:
    - command
menu:
    doc:
        parent: aptly publish
        weight: 10
---

aptly publish snapshot
----------------------

Publishes snapshot as repository to be consumed by `apt`. Published
repostiories appear under `rootDir/public` directory.
Valid [GPG key](/doc/aptly/publish) is required for publishing.

Usage:

    $ aptly publish snapshot <name> [[<endpoint:>]<prefix>]

Params:

-   `name` is a snapshot name that snould be published
-   `endpoint` is an optional endpoint reference. Without endpoint,
    repository would be pulished to local file system. In order to
    publish to Amazon S3, use endpoint name `s3:<name>:`, where endpoint
    `name` should configured
    as S3 publishing endpoint in [configuration file](/doc/feature/s3/).
-   `prefix` is an optional prefix for publishing, if not specified,
    repository would be published to the root of public directory.
    `prefix` could be single directory like `ppa` or part of the tree
    like `ppa/android`. `prefix` shouldn't contain `..`, and names
    `dists` and `pool` are not accepted. Empty `prefix` would be
    converted to `.`.

Flags:

-   `-component=""`: component name to publish; guessed from original
    repository (if any), or defaults to `main` (for multi-component
    publishing, separate components with commas)
-   `-distribution=""`: distribution name to publish; guessed from
    original repository distribution
-   `-force-overwrite=false`: overwrite packages files in the pool even
    if content is different (see also [duplicate packages](/doc/feature/duplicate/))
-   `-gpg-key=""`: GPG key ID to use when signing the release, if not
    specified default key is used
-   `-keyring=""`: GPG keyring to use (instead of default)
-   `-label=""`: value for `Label:` field
-   `-origin=""`: value for `Origin:` field
-   `-secret-keyring=""`: GPG secret keyring to use (instead of default)
-   `-skip-signing=false`: don't sign Release files with GPG

If architectures are limited (with config `architectures` or option
`-architectures`), only mentioned architectures would be published,
otherwise `aptly` will publish all architectures in the snapshot.
When publishing `source` is treated as separate architecture,
so if `-architectures` flag is used, include `source` when required.

`aptly` would try to figure out distribution and component from snapshot
by going via snapshot source tree up to mirrors and local
repositories. If all roots report the same distribution name, it is
chosen as default. If there are different distribution names or
distribution name is not specfied, `aptly` would display an error. For
component name the same rules apply except in case of not being able to
figure out component, aptly would use component `main`.

It is not allowed to publish two snapshots to the same `prefix` and
`distribution`.

Empty snapshots could be published as well (as placeholder, for
subsequent updates using [aptly publish switch](/doc/aptly/publish/switch/)
command). When publishing empty snapshots it is important to specify
complete architectures list (using `-architectures` flag), as it can't
be changed after publishing.

Multiple component repositories should be published from several
snapshots, one snapshot per component. In case of multiple component
publishing, command accepts several snapshot names:

    $ aptly publish snapshot -component=main,contrib wheezy-main wheezy-contrib

When mirroring remote repositories in order to preserve package split by
component, create individual mirrors for each component, take snapshots
and publish them as multi-component repository. Please see [multiple-component publishing](/doc/feature/multiple/)
for more examples.

Example:

    $ aptly publish snapshot back
    Signing file '/var/aptly/public/dists/squeeze-backports/Release' with gpg, please enter your passphrase when prompted:

    <<gpg asks for passphrase>>

    Clearsigning file '/var/aptly/public/dists/squeeze-backports/Release' with gpg, please enter your passphrase when prompted:

    <<gpg asks for passphrase>>

    Snapshot back has been successfully published.
    Please setup your webserver to serve directory '/var/aptly/public' with autoindexing.
    Now you can add following line to apt sources:
      deb http://your-server/ squeeze-backports main
    Don't forget to add your GPG key to apt with apt-key.

Directory structure for published repositories:

-   `<rootDir>`: [configuration](/doc/configuration/) parameter, defaults to
    `~/.aptly`
    -   `public/`: root of published tree (root for webserver)
        -   `dists/`
            -   `squeeze/`: distribution name
                -   `Release`: raw file
                -   `InRelease`: clearsigned version
                -   `Release.gpg`: detached `Release` signature
                -   `binary-i386`: binary packages index for
                    architecture `i386`
                    -   `Packages`: package metadata
                    -   `Packages.gz`
                    -   `Packages.bz2`
                    -   `Release`: used by debian-installer
                -   `source`: source packages index (generated only if
                    source packages are available)
                    -   `Sources`: package metadata
                    -   `Sources.gz`
                    -   `Sources.bz2`
                    -   `Release`: used by debian-installer
        -   `pool/`
            -   `main/`: component main
                -   `m/`
                    -   `mars-invaders/`
                        -   `mars-invaders_1.0.3_i386.deb`: package file
                            (hard link to package from main pool)
