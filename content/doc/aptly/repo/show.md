---
date: "2014-08-08T11:17:38Z"
title: "aptly repo show"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 40
---

aptly repo show
---------------

Commands show displays information about local repository, possibly
listing all packages in the repository.

Usage:

    $  aptly repo show <name>

Params are:

-   `name` local repository name

Flags:

-   `-with-packages=false`: show detailed list of packages and versions
    stored in the mirror

Example:

    $ aptly repo show -with-packages stable
    Name: stable
    Comment: Stable packages for project Foo
    Default Distribution: wheezy
    Default Component: main
    Number of packages: 10
    Packages:
      libmysqlclient18_5.5.35-rel33.0-611.squeeze_amd64
      percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_amd64
      percona-server-common-5.5_5.5.35-rel33.0-611.squeeze_amd64
      percona-server-server_5.5.35-rel33.0-611.squeeze_amd64
      percona-server-server-5.5_5.5.35-rel33.0-611.squeeze_amd64
      libmysqlclient18_5.5.35-rel33.0-611.squeeze_i386
      percona-server-client-5.5_5.5.35-rel33.0-611.squeeze_i386
      percona-server-common-5.5_5.5.35-rel33.0-611.squeeze_i386
      percona-server-server_5.5.35-rel33.0-611.squeeze_i386
      percona-server-server-5.5_5.5.35-rel33.0-611.squeeze_i386


