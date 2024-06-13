---
date: "2023-03-09T11:17:38Z"
title: "Mirrors API"
menu:
    doc:
        parent: API
        weight: 10
---

Mirrors API
----------------

[Mirror management](/doc/aptly/mirror) via REST API.



### Create

`POST /api/mirrors`

Create empty mirror with specified parameters (see also [aptly repo create](/doc/aptly/mirror/create)).

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | *required*, string  | mirror name
 `ArchiveURL`              | *required*, string  | url of the archive to mirror e.g. [http://deb.debian.org/debian/](http://deb.debian.org/debian/)
 `Distribution`            | string              | distribution name to mirror e.g. `buster`, for flat repositories use `./` instead of distribution name
 `Filter`                  | string              | [package query](/doc/feature/query/) that is applied to packages in the mirror
 `Components`              | []string            | components to mirror, if not specified aptly would fetch all components
 `Architectures`           | []string            | limit mirror to those architectures, if not specified aptly would fetch all architectures
 `Keyrings`                | []string            | gpg keyring(s) to use when verifying Release file
 `DownloadSources`         | bool                | whether to mirror sources
 `DownloadUdebs`           | bool                | whether to mirror .udeb packages (Debian installer support)
 `DownloadInstaller`       | bool                | whether to download additional not packaged installer files
 `FilterWithDeps`          | bool                | when filtering, include [dependencies](/doc/feature/dependencies) of matching packages as well
 `SkipComponentCheck`      | bool                | whether to skip if the given components are in the `Release` file
 `SkipArchitectureCheck`   | bool                | whether to skip if the given architectures are in the `Release` file
 `IgnoreSignatures`        | bool                | whether to skip the verification of `Release` file signatures

HTTP Errors:

 Code     | Description
----------|-------------------------
 400      | mirror creation failed

Example:

    $ curl -X POST -H 'Content-Type: application/json' --data '{"Name": "aptly-mirror", "ArchiveURL": "http://security.debian.org/debian-security/", "Distribution": "buster/updates", "Components": ["main"]}' http://localhost:8080/api/mirrors
    {"UUID":"2dcc40c2-68e2-402c-a73b-af242b648452","Name":"aptly-mirror","ArchiveRoot":"http://security.debian.org/debian-security/","Distribution":"buster/updates","Components":["main"],"Architectures":["amd64","arm64","armhf","i386"],"Meta":{"Acquire-By-Hash":"yes","Architectures":"amd64 arm64 armhf i386","Codename":"buster","Components":"updates/main updates/contrib updates/non-free","Date":"Wed, 08 Mar 2023 23:32:32 UTC","Description":" Debian 10 - Security Updates\n","Label":"Debian-Security","Origin":"Debian","Suite":"oldstable","Valid-Until":"Wed, 15 Mar 2023 23:32:32 UTC","Version":"10"},"LastDownloadDate":"0001-01-01T00:00:00Z","Filter":"","Status":0,"WorkerPID":0,"FilterWithDeps":false,"SkipComponentCheck":false,"SkipArchitectureCheck":false,"DownloadSources":false,"DownloadUdebs":false,"DownloadInstaller":false}

### Show

`GET /api/mirrors/:name`

Returns basic information about a mirror.

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | mirror with such name doesn't exist

Example:

    curl http://localhost:8080/api/mirrors/aptly-mirror
    {"UUID":"2dcc40c2-68e2-402c-a73b-af242b648452","Name":"aptly-mirror","ArchiveRoot":"http://security.debian.org/debian-security/","Distribution":"buster/updates","Components":["main"],"Architectures":["amd64","arm64","armhf","i386"],"Meta":{"Acquire-By-Hash":"yes","Architectures":"amd64 arm64 armhf i386","Codename":"buster","Components":"updates/main updates/contrib updates/non-free","Date":"Wed, 08 Mar 2023 23:32:32 UTC","Description":" Debian 10 - Security Updates\n","Label":"Debian-Security","Origin":"Debian","Suite":"oldstable","Valid-Until":"Wed, 15 Mar 2023 23:32:32 UTC","Version":"10"},"LastDownloadDate":"0001-01-01T00:00:00Z","Filter":"","Status":0,"WorkerPID":0,"FilterWithDeps":false,"SkipComponentCheck":false,"SkipArchitectureCheck":false,"DownloadSources":false,"DownloadUdebs":false,"DownloadInstaller":false}

### Show packages/search

`GET /api/mirrors/:name/packages`

List all packages in a mirror or perform search on repository contents and return result.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `q`                       | [package query](/doc/feature/query), if missing - return all packages
 `withDeps`                | set to `1` to include dependencies when evaluating package query
 `format`                  | result format, compact by default (only package keys), `details` to return full information about each package (might be slow on large repos)

Example:

    $ curl http://localhost:8080/api/mirrors/aptly-mirror/packages
    ["Pi386 aptly 0.8 966561016b44ed80"]

    $ curl http://localhost:8080/api/mirrors/aptly-mirror/packages?q=aptly
    ["Pi386 aptly 0.8 966561016b44ed80"]

    $ curl http://localhost:8080/api/mirrors/aptly-mirror/packages?format=details
    [{"Architecture":"i386","Description":" Debian repository management tool\n","Filename":"aptly_0.8_i386.deb","FilesHash":"966561016b44ed80","Homepage":"http://www.aptly.info/","Installed-Size":"11084","Key":"Pi386 aptly 0.8 966561016b44ed80","License":"MIT","MD5sum":"b9be9ed873f1a05da103406cc0a6b9d1","Maintainer":"Andrey Smirnov \u003cme@smira.ru\u003e","Package":"aptly","Priority":"extra","Recommends":"bzip2","SHA1":" 257ab261adcf5dd5bda800976ae606fedb882679","SHA256":" 6342804c7f6bd8cb004ca9d19a7e27f492b7e07843b935a4f96a07a254ae6312","Section":"default","ShortKey":"Pi386 aptly 0.8","Size":"3510032","Vendor":"Andrey Smirnov \u003cme@smira.ru\u003e","Version":"0.8"}]

### Edit

`PUT /api/mirrors/:name`

This api has two functionalities:

1) Update mirror meta information.
2) Download packages from the archive to mirror

When updating a mirror, the packages will always be downloaded.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `_async`                  | when value is set to `1`, run task in background, and return a task ID which can be queried via the `tasks` api.

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | string              | mirror name
 `ArchiveURL`              | string              | url of the archive to mirror e.g. [http://deb.debian.org/debian/](http://deb.debian.org/debian/)
 `Filter`                  | string              | [package query](/doc/feature/query/) that is applied to packages in the mirror
 `Components`              | []string            | components to mirror, if not specified aptly would fetch all components
 `Architectures`           | []string            | limit mirror to those architectures, if not specified aptly would fetch all architectures
 `Keyrings`                | []string            | gpg keyring(s) to use when verifying Release file
 `DownloadSources`         | bool                | whether to mirror sources
 `DownloadUdebs`           | bool                | whether to mirror .udeb packages (Debian installer support)
 `DownloadInstaller`       | bool                | whether to download additional not packaged installer files
 `FilterWithDeps`          | bool                | when filtering, include [dependencies](/doc/feature/dependencies) of matching packages as well
 `SkipComponentCheck`      | bool                | whether to skip if the given components are in the `Release` file
 `SkipArchitectureCheck`   | bool                | whether to skip if the given architectures are in the `Release` file
 `IgnoreSignatures`        | bool                | whether to skip the verification of `Release` file signatures
 `ForceUpdate`             | bool                | whether to force a mirror update even if another process is already updating the mirror (use with caution!)
 `SkipExistingPackages`    | bool                | whether to not download already downloaded packages

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | mirror with such name doesn't exist

Response is the same as for `GET /api/mirror/:name` API.

Example:

    $ curl -X PUT http://localhost:8080/api/mirrors/aptly-mirror

### List

`GET /api/mirrors`

Show list of currently available mirrors. Each mirror is returned as in "show" API.

Example:

    $ curl http://localhost:8080/api/mirrors
    [{"UUID":"2dcc40c2-68e2-402c-a73b-af242b648452","Name":"aptly-mirror","ArchiveRoot":"http://security.debian.org/debian-security/","Distribution":"buster/updates","Components":["main"],"Architectures":["amd64","arm64","armhf","i386"],"Meta":{"Acquire-By-Hash":"yes","Architectures":"amd64 arm64 armhf i386","Codename":"buster","Components":"updates/main updates/contrib updates/non-free","Date":"Wed, 08 Mar 2023 23:32:32 UTC","Description":" Debian 10 - Security Updates\n","Label":"Debian-Security","Origin":"Debian","Suite":"oldstable","Valid-Until":"Wed, 15 Mar 2023 23:32:32 UTC","Version":"10"},"LastDownloadDate":"0001-01-01T00:00:00Z","Filter":"","Status":0,"WorkerPID":0,"FilterWithDeps":false,"SkipComponentCheck":false,"SkipArchitectureCheck":false,"DownloadSources":false,"DownloadUdebs":false,"DownloadInstaller":false}]

### Delete

`DELETE /api/mirrors/:name`

Delete a mirror.

If the mirror is used as a source to createsnapshots, aptly would refuse
to delete it by default, but that can be overridden with `force` flag.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `force`                   | when value is set to `1`, delete the mirror even if it has snapshots
 `_async`                  | when value is set to `1`, run task in background, and return a task ID which can be queried via the `tasks` api.

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | mirror with such name doesn't exist
 409      | mirror can't be dropped (reason in the message)

Example:

    $ curl -X DELETE http://localhost:8080/api/mirrors/aptly-mirror
