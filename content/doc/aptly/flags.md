---
date: "2014-08-08T11:17:38Z"
title: "Global Flags"
menu:
    doc:
        parent: Commands
        weight: 5
---

Global Flags
------------

There are several flags that could be specfied almost with any aptly command.
Flags could be specified before or after command name:

    $ aptly -option1 command ...

Global flags are:

-   `-architectures=""`: list of architectures to consider during
    (comma-separated), default to all available
-   `-config=""`: location of configuration file (default locations are
    `/etc/aptly.conf`, `~/.aptly.conf`)
-   `-dep-follow-all-variants=false`: when processing dependencies,
    follow a & b if depdency is 'a|b'
-   `-dep-follow-recommends=false`: when processing dependencies, follow
    Recommends
-   `-dep-follow-source=false`: when processing dependencies, follow
    from binary package to source package
-   `-dep-follow-suggests=false`: when processing dependencies, follow
    Suggests

Global flags override configuration parameters with similar names.

 