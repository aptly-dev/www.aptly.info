---
date: "2014-08-08T11:17:38Z"
title: "aptly publish repo"
tags:
    - command
menu:
    doc:
        parent: aptly publish
        weight: 20
---

aptly publish repo
------------------

Publishes local repository directly, bypassing snapshot creation step.
Published repositories appear under `rootDir/public` directory. Valid
[GPG key](/doc/aptly/publish) is required for publishing.

<div class="alert alert-warning alert-note">It is not advised to publish local repositories directly unless
repository is used to host testing versions of packages that change
frequently. For production usage please <a href="/doc/aptly/snapshot/create/">create snapshot</a> from repository and
<a href="/doc/aptly/publish/snapshot/">publish it</a>.</div>

Usage:

    $ aptly publish repo <name> [[<endpoint:>]<prefix>]

Params:

-   `name` is a local repo name that snould be published
-   `endpoint` is an optional endpoint reference. Without endpoint,
    repository would be pulished to local file system. In order to
    publish to Amazon S3, use endpoint name `s3:<name>:`, where endpoint
    `name` is configured as S3 publishing endpoint in
    [configuration file](/doc/feature/s3), for OpenStack Swift,
    use endpoint `swift:<name>` ([Swift configuration](/doc/feature/swift))
-   `prefix` is an optional prefix for publishing, if not specified,
    repository would be published to the root of publiс directory.
    `prefix` could be single directory like `ppa` or part of the tree
    like `ppa/android`. `prefix` shouldn't contain `..`, and names
    `dists` and `pool` are not accepted. Empty `prefix` would be
    converted to `.`.

Flags:

-   `-batch`: run GPG with detached tty (useful when running from crontab)
-   `-component=""`: component name to publish; it is taken from local
    repository default, otherwise it defaults to `main` (for
    multi-component publishing, separate components with commas)
-   `-distribution=""`: distribution name to publish; guessed from local
    repository default distribution
-   `-force-overwrite=false`: overwrite packages files in the pool even
    if content is different (see also [duplicate packages](/doc/feature/duplicate/))
-   `-gpg-key=""`: GPG key ID to use when signing the release, if not
    specified default key is used
-   `-keyring=""`: GPG keyring to use (instead of default)
-   `-label=""`: value for `Label:` field
-   `-origin=""`: value for `Origin:` field
-   `-passphrase=""`: GPG passphrase to unlock private key (possibly insecure)
-   `-passphrase-file=""`: GPG passphrase file to unlock private key (possibly insecure)
-   `-secret-keyring=""`: GPG secret keyring to use (instead of default)
-   `-skip-signing=false`: don't sign Release files with GPG

If architectures are limited (with config `architectures` or option
`-architectures`), only mentioned architectures would be published,
otherwise `aptly` will publish all architectures in the snapshot.

It is not allowed to publish two repositories or snapshots to the same
`prefix` and `distribution`.

When local repository changes, published repository could be updated
in-place using command [aptly publish update](/doc/aptly/publish/update/).

Empty local repos could be published as well (as placeholder, for
subsequent updates using [aptly publish update](/doc/aptly/publish/update/)
command). When publishing empty local repos it is important to specify
complete architectures list (using `-architectures` flag), as it can't
be changed after publishing.

Multiple component repositories should be published from several local
repositories, one repository per component. In that case, command
accepts several local repositories names:

    $ aptly publish repo -component=main,contrib mysoft-main mysoft-contrib

Please see [multiple-component publishing](/doc/feature/multi-component/)
for more examples.

Example:

    $ aptly publish repo local-repo
    Signing file '/var/aptly/public/dists/squeeze/Release' with gpg, please enter your passphrase when prompted:

    <<gpg asks for passphrase>>

    Clearsigning file '/var/aptly/public/dists/squeeze/Release' with gpg, please enter your passphrase when prompted:

    <<gpg asks for passphrase>>

    Snapshot back has been successfully published.
    Please setup your webserver to serve directory '/var/aptly/public' with autoindexing.
    Now you can add following line to apt sources:
      deb http://your-server/ squeeze main
    Don't forget to add your GPG key to apt with apt-key.
