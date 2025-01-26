---
date: "2014-02-08T11:17:38Z"
title: "Package API"
menu:
    doc:
        parent: Legacy API
        weight: 45
---

Package API
-----------

APIs related to packages on their own.

### Show

`GET /api/packages/:key`

Show information about package by package key.

Package keys could be obtained from various `GET .../packages` APIs.

Response:

Name                       | Type                | Description
---------------------------|---------------------|-------------------------------
 `Key`                     | string              | package key (unique package identifier)
 `ShortKey`                | string              | short package key (should be unique in one package list: snapshot, mirror, local repository)
 `FilesHash`               | string              | hash of package files
 Package Stanza Fields     | string              | all package stanza fields, e.g. `Package`, `Architecture`, ...


HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | package with such key doesn't exist

Example:

    $ curl http://localhost:8080/api/packages/'Pi386%20libboost-program-options-dev%201.49.0.1%20918d2f433384e378'
    {"Architecture":"i386","Depends":"libboost-program-options1.49-dev","Description":" program options library for C++ (default version)\n This package forms part of the Boost C++ Libraries collection.\n .\n Library to let program developers obtain program options, that is\n (name, value) pairs from the user, via conventional methods such as\n command line and config file.\n .\n This package is a dependency package, which depends on Debian's default\n Boost version (currently 1.49).\n","Filename":"libboost-program-options-dev_1.49.0.1_i386.deb","FilesHash":"918d2f433384e378","Homepage":"http://www.boost.org/libs/program_options/","Installed-Size":"26","Key":"Pi386 libboost-program-options-dev 1.49.0.1 918d2f433384e378","MD5sum":"0035d7822b2f8f0ec4013f270fd650c2","Maintainer":"Debian Boost Team \u003cpkg-boost-devel@lists.alioth.debian.org\u003e","Package":"libboost-program-options-dev","Priority":"optional","SHA1":" 36895eb64cfe89c33c0a2f7ac2f0c6e0e889e04b","SHA256":" c76b4bd12fd92e4dfe1b55b18a67a669d92f62985d6a96c8a21d96120982cf12","Section":"libdevel","ShortKey":"Pi386 libboost-program-options-dev 1.49.0.1","Size":"2738","Source":"boost-defaults","Version":"1.49.0.1"}

Hint: `%20` is url-encoded space.
