---
date: "2014-08-29T11:17:38Z"
title: "aptly mirror edit"
tags:
    - command
menu:
    doc:
        parent: aptly mirror
        weight: 50
---

aptly mirror edit
-----------------

Command edit allows to change mirror settings: filter query, whether
to include dependencies while filtering, list of architectures to process.

Usage:

    $ aptly mirror edit <name>

Params are:

-   `name` is a mirror name (given when mirror was created)

Flags:

-   `-archive-url=`: flag to change archive url {{< version "1.2.0" >}}
-   `-filter=`: [package query](/doc/feature/query/) which is applied to
    packages in the mirror, set to empty to disable filtering
-   `-filter-with-deps`: when filtering, include [dependencies](/doc/feature/dependencies) of
    matching packages as well
-   `-architectures=`: global flag to change architectures list.
-   `-ignore-signatures`: disable verification of `Release` file
    signatures {{< version "1.2.0" >}}
-   `-keyring=trustedkeys.gpg`: gpg keyring to use when verifying
    Release file (could be specified multiple times) {{< version "1.2.0" >}}
-   `-with-installer`: download additional not packaged installer
    files
-   `-with-sources`: download source packages in addition to
    binary packages
-   `-with-udebs`: download .udeb packages (Debian installer
    support)

In order to apply new filtering settings, [update](/doc/aptly/mirror/update/)
mirror.

Examples:

    $ aptly mirror edit -filter=nginx -filter-with-deps wheezy-main
    Mirror [wheezy-main]: http://mirror.yandex.ru/debian/ wheezy successfully updated.

    $ aptly mirror edit -architectures=i386,amd64 sensu
    Downloading http://repos.sensuapp.org/apt/dists/sensu/Release...
    Mirror [sensu]: http://repos.sensuapp.org/apt/ sensu successfully updated.
