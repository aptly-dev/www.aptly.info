---
date: "2014-08-08T11:17:38Z"
title: "aptly db recover"
tags:
    - command
menu:
    doc:
        parent: aptly db
        weight: 20
---

aptly db recover
----------------

Database recover does its best to recover database after crash. It is
recommended to backup DB before running recover. Recover procedures
ignores all index files and tries to reconstruct them from `.sst` files.

Usage:

    $ aptly db recover

Example:

    $ aptly db recover
    Recovering DB...

 