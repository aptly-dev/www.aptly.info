---
date: "2014-08-08T11:17:38Z"
title: "aptly snapshot diff"
tags:
    - command
menu:
    doc:
        parent: aptly snapshot
        weight: 60
---

aptly snapshot diff
-------------------

Displays difference in packages between two snapshots. Snapshot is a
list of packages, so difference between snapshots is a difference
between package lists. Package could be either completely missing in one
of the snapshots, or package is present in both snapshots with different
versions.

Usage:

    $ aptly snapshot diff <name-a> <name-b>

Params:

-   `name-a` is snapshot name which is "on the left" during comparison
-   `name-b` is snapshot name which is "on the right" during comparison

Flags:

-   `-only-matching`: display diff only for package versions
    (don't display missing packages)

Example:

    $ aptly snapshot diff snap-deb2-main snap-deb-main-w-xorg
      Arch   | Package            | Version in A     | Version in B
    ! amd64  | libxfont1          | 1:1.4.1-3        | 1:1.4.4-1~bpo60+1
    ! i386   | libxfont1          | 1:1.4.1-3        | 1:1.4.4-1~bpo60+1
    ! all    | xserver-common     | 2:1.7.7-16       | 2:1.10.4-1~bpo60+2
    ! amd64  | xserver-xorg       | 1:7.5+8+squeeze1 | 1:7.6+8~bpo60+1
    ! i386   | xserver-xorg       | 1:7.5+8+squeeze1 | 1:7.6+8~bpo60+1
    ! amd64  | xserver-xorg-core  | 2:1.7.7-16       | 2:1.10.4-1~bpo60+2
    ! i386   | xserver-xorg-core  | 2:1.7.7-16       | 2:1.10.4-1~bpo60+2

 
