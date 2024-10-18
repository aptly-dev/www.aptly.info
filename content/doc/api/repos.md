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
 `FromSnapshot`            | string              | snapshot name to create repo from

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

### Edit

`PUT /api/repos/:name`

Update local repository meta information.

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Comment`                 | string              | text describing local repository, for the user
 `DefaultDistribution`     | string              | default distribution when publishing from this local repo
 `DefaultComponent`        | string              | default component when publishing from this local repo

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | repository with such name doesn't exist

Response is the same as for `GET /api/repos/:name` API.

Example:

    $ curl -X PUT -H 'Content-Type: application/json' --data '{"DefaultDistribution": "trusty"}' http://localhost:8080/api/repos/local1
    {"Name":"local1","Comment":"","DefaultDistribution":"trusty","DefaultComponent":"main"}


### List

`GET /api/repos`

Show list of currently available local repositories. Each repository is returned as in "show" API.

Example:

    $ curl http://localhost:8080/api/repos
    [{"Name":"aptly-repo","Comment":"","DefaultDistribution":"","DefaultComponent":""}]

### Delete

`DELETE /api/repos/:name`

Delete local repository.

Local repository can't be deleted if it is published. If local repository has snapshots, aptly would refuse
to delete it by default, but that can be overridden with `force` flag.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `force`                   | when value is set to `1`, delete local repository even if it has snapshots

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | repository with such name doesn't exist
 409      | repository can't be dropped (reason in the message)

### Add packages from uploaded file/directory

`POST /api/repos/:name/file/:dir`

`POST /api/repos/:name/file/:dir/:file`

Import packages from files (uploaded using [File Upload API](/doc/api/files)) to the local repository. If directory
specified, aptly would discover package files automatically.

Adding same package to local repository is not an error.

By default aptly would try to remove every successfully processed file and directory `:dir` (if it becomes empty
after import).

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `noRemove`                | when value is set to `1`, don't remove any files
 `forceReplace`            | when value is set to `1`, remove packages conflicting with package being added (in local repository)

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | repository with such name doesn't exist

Response:

Name                       | Type                | Description
---------------------------|---------------------|-------------------------------
 `FailedFiles`             | []string            | list of files that failed to be processed
 `Report`                  | object              | operation report (see below)

Report structure:

Name                       | Type                | Description
---------------------------|---------------------|-------------------------------
 `Warnings`                | []string            | list of warnings
 `Added`                   | []string            | list of messages related to packages being added
 `Deleted`                 | []string            | list of messages related to packages being deleted

Example (file upload, add package to repo):

    $ curl -X POST -F file=@aptly_0.9~dev+217+ge5d646c_i386.deb http://localhost:8080/api/files/aptly-0.9
    ["aptly-0.9/aptly_0.9~dev+217+ge5d646c_i386.deb"]

    $ curl -X POST http://localhost:8080/api/repos/repo1/file/aptly-0.9
    {"FailedFiles":[],"Report":{"Warnings":[],"Added":["aptly_0.9~dev+217+ge5d646c_i386 added"],"Removed":[]}}


### Include packages from uploaded file/directory

`POST /api/repos/:name/include/:dir`

`POST /api/repos/:name/include/:dir/:file`

New in {{< version "1.4.0" >}}

Allows automatic processing of `.changes` file controlling package upload (uploaded using [File Upload API](/doc/api/files)) to the local repository. Exposes [repo include](/doc/aptly/repo/include) command in api.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `noRemoveFiles`           | when value is set to `1`, don’t remove files that have been imported successfully into repository
 `forceReplace`            | when value is set to `1`, when adding package that conflicts with existing package, remove existing package
 `ignoreSignature`         | when value is set to `1` disable verification of .changes file signature
 `acceptUnsigned`          | when value is set to `1` accept unsigned .changes files

Response:

Name                       | Type                | Description
---------------------------|---------------------|-------------------------------
 `FailedFiles`             | []string            | list of files that failed to be processed
 `Report`                  | object              | operation report (see below)

Report structure:

Name                       | Type                | Description
---------------------------|---------------------|-------------------------------
 `Warnings`                | []string            | list of warnings
 `Added`                   | []string            | list of messages related to packages being added
 `Deleted`                 | []string            | list of messages related to packages being deleted

Example (file upload, include changes files in repo):

    $ curl -X POST -F file=@hardlink_0.2.1_amd64.changes http://localhost:8080/api/files/hardlink
    ["file=@hardlink_0.2.1_amd64.changes"]

    $ # upload any other files referenced in .changes file...

    $ curl -X POST http://localhost:8080/api/repos/repo1/include/hardlink
    {"FailedFiles":[],"Report":{"Warnings":[],"Added":["hardlink_0.2.1_source added"],"Removed":[]}}



### Add packages by key

`POST /api/repos/:name/packages`

Add packages to local repository by package keys.

Any package could be added, it should be part of aptly database (it could come from any mirror, snapshot, other
local repository). This API combined with package list (search) APIs allows to implement importing, copying,
moving packages around.

API verifies that packages actually exist in aptly database and checks constraint that conflicting packages
can't be part of the same local repository.

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `PackageRefs`             | []string            | list of package references (package keys)

HTTP Errors:

 Code     | Description
----------|-------------------------
 400      | added package conflicts with already exists in repository
 404      | repository with such name doesn't exist
 404      | package with specified key doesn't exist

Response is the same as for `GET /api/repos/:name` API.

Example:

    $ curl -X POST -H 'Content-Type: application/json' --data '{"PackageRefs": ["Psource pyspi 0.6.1-1.4 f8f1daa806004e89","Pi386 libboost-program-options-dev 1.49.0.1 918d2f433384e378"]}' http://localhost:8080/api/repos/repo2/packages
    {"Name":"repo2","Comment":"","DefaultDistribution":"","DefaultComponent":"main"}

### Delete packages by key

`DELETE /api/repos/:name/packages`

Remove packages from local repository by package keys.

Any package(s) could be removed from local repository. List package references
in local repository could be retrieved with `GET /repos/:name/packages`.

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `PackageRefs`             | []string            | list of package references (package keys)

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | repository with such name doesn't exist

Response is the same as for `GET /api/repos/:name` API.

Example:

    $ curl -X DELETE -H 'Content-Type: application/json' --data '{"PackageRefs": ["Pi386 libboost-program-options-dev 1.49.0.1 918d2f433384e378"]}' http://localhost:8080/api/repos/repo2/packages
    {"Name":"repo2","Comment":"","DefaultDistribution":"","DefaultComponent":"main"}
