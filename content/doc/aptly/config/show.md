---
date: "2014-10-12T11:17:38Z"
title: "aptly config show"
tags:
    - command
menu:
    doc:
        parent: aptly config
        weight: 10
---

aptly config show
-----------------


Commands displays current aptly configuration as
indented JSON. This command could be useful when
upgrading from older versions of aptly to view
updated configuration.

Usage:

    $  aptly config show

Examples:

    $ aptly config show
    {
        "rootDir": "/Users/smira/.aptly",
        "downloadConcurrency": 4,
        "downloadSpeedLimit": 0,
        "architectures": [],
        "dependencyFollowSuggests": false,
        "dependencyFollowRecommends": false,
        "dependencyFollowAllVariants": false,
        "dependencyFollowSource": false,
        "gpgDisableSign": false,
        "gpgDisableVerify": false,
        "downloadSourcePackages": false,
        "ppaDistributorID": "ubuntu",
        "ppaCodename": "",
        "S3PublishEndpoints": {}
    }
