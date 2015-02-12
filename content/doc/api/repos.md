---
date: "2014-02-08T11:17:38Z"
title: "Local Repos API"
menu:
    doc:
        parent: API
        weight: 10
---

Local Repos API
----------------

[Local repositories management](/doc/aptly/repo) via REST API.



### Create

`POST /api/repos`

Create empty local repository with specified parameters (see also [aptly repo create](/doc/aptly/repo/create)).

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | *required*, string  | local repository name
 `Comment`                 | string              | text describing local repository, for the user
 `DefaultDistribution`     | string              | default distribution when publishing from this local repo
 `DefaultComponent`        | string              | default component when publishing from this local repo

HTTP Errors:

 Code     | Description
----------|-------------------------
 400      | repository with such name already exists

Example:

    $ curl -X POST -H 'Content-Type: application/json' --data '{"Name": "aptly-repo"}' http://localhost:8080/api/repos
    {"Name":"aptly-repo","Comment":"","DefaultDistribution":"","DefaultComponent":""}

### Show

`GET /api/repos/:name`

Returns basic information about local repository.

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | repository with such name doesn't exist

Response:

Name                       | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | string              | local repository name
 `Comment`                 | string              | text describing local repository, for the user
 `DefaultDistribution`     | string              | default distribution when publishing from this local repo
 `DefaultComponent`        | string              | default component when publishing from this local repo

Example:

    $ curl http://localhost:8080/api/repos/aptly-repo
    {"Name":"aptly-repo","Comment":"","DefaultDistribution":"","DefaultComponent":""}

### Show packages/search

`GET /api/repos/:name/packages`

List all packages in local repository or perform search on repository contents and return result.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `q`                       | [package query](/doc/feature/query), if missing - return all packages
 `withDeps`                | set to `1` to include dependencies when evaluating package query
 `format`                  | result format, compact by default (only package keys), `details` to return full information about each package (might be slow on large repos)

Example:

    $ curl http://localhost:8080/api/repos/aptly-repo/packages
    ["Pi386 aptly 0.8 966561016b44ed80"]

    $ curl http://localhost:8080/api/repos/aptly-repo/packages?q=aptly
    ["Pi386 aptly 0.8 966561016b44ed80"]

    $ curl http://localhost:8080/api/repos/aptly-repo/packages?format=details
    [{"Architecture":"i386","Description":" Debian repository management tool\n","Filename":"aptly_0.8_i386.deb","FilesHash":"966561016b44ed80","Homepage":"http://www.aptly.info/","Installed-Size":"11084","Key":"Pi386 aptly 0.8 966561016b44ed80","License":"MIT","MD5sum":"b9be9ed873f1a05da103406cc0a6b9d1","Maintainer":"Andrey Smirnov \u003cme@smira.ru\u003e","Package":"aptly","Priority":"extra","Recommends":"bzip2","SHA1":" 257ab261adcf5dd5bda800976ae606fedb882679","SHA256":" 6342804c7f6bd8cb004ca9d19a7e27f492b7e07843b935a4f96a07a254ae6312","Section":"default","ShortKey":"Pi386 aptly 0.8","Size":"3510032","Vendor":"Andrey Smirnov \u003cme@smira.ru\u003e","Version":"0.8"}]

### List

`GET /api/repos`

Show list of currently available local repositories. Each repository is returned as in "show" API.

Example:

    $ curl http://localhost:8080/api/repos
    [{"Name":"aptly-repo","Comment":"","DefaultDistribution":"","DefaultComponent":""}]

### Delete

`DELETE /api/repos/:name`

Delete local repository.

### Add packages from uploaded file/directory

`POST /api/repos/:name/file/:dir`

`POST /api/repos/:name/file/:dir/:file`

### Add packages by key

`POST /repos/:name/packages`

### Delete packages by key

`DELETE /repos/:name/packages`
