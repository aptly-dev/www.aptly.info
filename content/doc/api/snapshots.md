---
date: "2014-02-08T11:17:38Z"
title: "Snapshot API"
menu:
    doc:
        parent: Legacy API
        weight: 30
---

Snapshot API
------------

[Snapshot](/doc/aptly/snapshot) management APIs.

Snapshot is a immutable package reference list taken from local repository, mirror or
result of other snapshot processing.

Snapshot properties:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | *required*, string  | snapshot name
 `Description`             | string              | free-format description how snapshot has been created
 `CreatedAt`               | timestamp           | creation timestamp

### List

`GET /api/snapshots`

Return list of all snapshots created in the system.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `sort`                    | snapshot order, defaults to `name`, set to `time` to display in creation order

Example:

    $ curl -v http://localhost:8080/api/snapshots
    [{"Name":"snap1","CreatedAt":"2015-02-27T21:36:08.337443295+03:00","Description":"Snapshot from mirror [wheezy-main]: http://mirror.yandex.ru/debian/ wheezy"},{"Name":"snap2","CreatedAt":"2015-02-27T21:36:08.462492037+03:00","Description":"Snapshot from mirror [wheezy-contrib]: http://mirror.yandex.ru/debian/ wheezy"},{"Name":"snap3","CreatedAt":"2015-02-27T21:36:08.562465797+03:00","Description":"Merged from sources: 'snap1', 'snap2'"},{"Name":"snap4","CreatedAt":"2015-02-27T21:36:11.274963+03:00","Description":"Pulled into 'snap1' with 'snap2' as source, pull request was: 'mame unrar'"},{"Name":"snap5","CreatedAt":"2015-02-27T21:36:11.462710195+03:00","Description":"Snapshot from local repo [local-repo]"}]

### Create Snapshot from Local Repo

`POST /api/repos/:name/snapshots`

Create snapshot of current local repository `:name` contents as new snapshot with name `:snapname`.

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | string, *required*  | snapshot name
 `Description`             | string              | free-format description how snapshot has been created


HTTP Errors:

 Code     | Description
----------|-------------------------
 400      | snapshot with name `Name` already exists
 404      | local repo with name `:name` doesn't exist

Example:

    $ curl -X POST -H 'Content-Type: application/json' --data '{"Name":"snap9"}' http://localhost:8080/api/repos/local-repo/snapshots
    {"Name":"snap9","CreatedAt":"2015-02-28T19:56:59.137192613+03:00","Description":"Snapshot from local repo [local-repo]: fun repo"}

### Create Snapshot from Mirror

`POST /api/mirrors/:name/snapshots`

Create snapshot of mirror `:name` contents as new snapshot with name `:snapname`.

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | string, *required*  | snapshot name
 `Description`             | string              | free-format description how snapshot has been created


HTTP Errors:

 Code     | Description
----------|-------------------------
 400      | snapshot with name `Name` already exists
 404      | mirror with name `:name` doesn't exist

Example:

    $ curl -X POST -H 'Content-Type: application/json' --data '{"Name":"snap10"}' http://localhost:8080/api/mirrors/aptly-mirror/snapshots
    {"Name":"snap10","CreatedAt":"2023-07-21T15:51:06.692330984+03:00","SourceKind":"repo","Description":"Snapshot from mirror [aptly-mirror]: http://security.debian.org/debian-security/ bullseye","Origin":"aptly-mirror","NotAutomatic":"","ButAutomaticUpgrades":""}

### Create Snapshot from Package Refs

`POST /api/snapshots`

Create snapshot from list of package references.

This API creates snapshot out of any list of package references. Package references could be obtained from other snapshots,
local repos or mirrors.

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | string, *required*  | snapshot name
 `Description`             | string              | free-format description how snapshot has been created
 `SourceSnapshots`         | []string            | list of source snapshot names (only for tracking purposes)
 `PackageRefs`             | []string            | list of package keys which would be contents of the repository

Sending request without `SourceSnapshots` and `PackageRefs` would create empty snapshot.

HTTP Errors:

 Code     | Description
----------|-------------------------
 400      | snapshot with name `Name` already exists, package conflict
 404      | source snapshot doesn't exist, package doesn't exist

Example:

    $ curl -X POST -H 'Content-Type: application/json' --data '{"Name":"empty"}' http://localhost:8080/api/snapshots
    {"Name":"empty","CreatedAt":"2015-02-28T20:20:54.19791237+03:00","Description":"Created as empty"}

    $ curl -X POST -H 'Content-Type: application/json' --data '{"Name":"snap10", "SourceSnapshots": ["snap9"], "Description": "Custom", "PackageRefs": ["Psource pyspi 0.6.1-1.3 3a8b37cbd9a3559e"]}'  http://localhost:8080/api/snapshots
    {"Name":"snap10","CreatedAt":"2015-02-28T20:22:13.312866396+03:00","Description":"Custom"}

### Update

`PUT /api/snapshots/:name`

Update snapshot's description or name.

JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Name`                    | string              | new snapshot name
 `Description`             | string              | free-format description how snapshot has been created

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | snapshot with such name doesn't exist
 409      | rename is not possible: name already used by another snapshot

Example:

    $ curl -X PUT -H 'Content-Type: application/json' --data '{"Name": "snap-wheezy"}' http://localhost:8080/api/snapshots/snap1
    {"Name":"snap-wheezy","CreatedAt":"2015-02-27T21:36:08.337443295+03:00","Description":"Snapshot from mirror [wheezy-main]: http://mirror.yandex.ru/debian/ wheezy"}

### Show

`GET /api/snapshots/:name`

Get information about snapshot by name.

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | snapshot with such name doesn't exist

Example:

    $ curl http://localhost:8080/api/snapshots/snap1
    {"Name":"snap1","CreatedAt":"2015-02-27T21:36:08.337443295+03:00","Description":"Snapshot from mirror [wheezy-main]: http://mirror.yandex.ru/debian/ wheezy"}

### Delete

`DELETE /api/snapshots/:name`

Delete snapshot. Snapshot can't be deleted if it is published. aptly would refuse to delete snapshot if it has been
used as source to create other snapshots, but that could be overridden with `force` parameter.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `force`                   | when value is set to `1`, delete snapshot even if it has been used as source snapshot

HTTP Errors:

 Code     | Description
----------|-------------------------
 404      | snapshot with such name doesn't exist
 409      | snapshot can't be dropped (reason in the message)


Example:

    $ curl -X DELETE http://localhost:8080/api/snapshots/snap-wheezy
    [{"error":"won't delete snapshot that was used as source for other snapshots, use ?force=1 to override","meta":"Operation aborted"}]

    $ curl -X DELETE 'http://localhost:8080/api/snapshots/snap-wheezy?force=1'
    {}

### Show Packages/Search

`GET /api/snapshots/:name/packages`

List all packages in snapshot or perform search on snapshot contents and return result.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `q`                       | [package query](/doc/feature/query), if missing - return all packages
 `withDeps`                | set to `1` to include dependencies when evaluating package query
 `format`                  | result format, compact by default (only package keys), `details` to return full information about each package (might be slow on large snapshots)

Example:

    $ curl http://localhost:8080/api/snapshots/snap2/packages
    ["Pi386 basilisk2 0.9.20120331-2 86c3e67a4743361f","Pi386 gtktrain 0.9b-13 8770e2e7bfb66bad","Pi386 microcode.ctl 1.18~0+nmu2 5974bce6bd6dbc9e", ...]

    $ curl  http://localhost:8080/api/snapshots/snap2/packages?q='Name%20(~%20matlab)'
    ["Pall matlab-support 0.0.18 c19e7719c5f39ba0","Pall dynare-matlab 4.3.0-2 e0672404f552bd85","Pall matlab-gdf 0.1.2-2 e5d967263b9047e7"]

### Difference between Snapshots

`GET /api/snapshots/:name/diff/:withSnapshot`

Calculate difference between two snapshots `:name` (left) and `:withSnapshot` (right).

Response is a list of elements:

 Name                      | Description
---------------------------|-------------------------------
 `Left`                    | package reference present only in left snapshot
 `Right`                   | package reference present only in right snapshot

 If two snapshots are identical, response would be empty list.

 `Left`                    | `Right`                  | Description
---------------------------|--------------------------|----
 null                      | package reference        | right snapshot has package missing in left
 package reference         | null                     | left snapshot has package missing in right
 package reference         | package reference        | snapshots have different packages

Example:

    $ curl http://localhost:8080/api/snapshots/snap2/diff/snap3
    [{"Left":null,"Right":"Pi386 zziplib-bin 0.13.56-1.1 4eb4563dc85bc3b6"},{"Left":null,"Right":"Pi386 zzuf 0.13.svn20100215-4 2abcc80de15e25f8"}, ... ]

### Merge Snapshots

`POST /api/snapshots/merge`

Merge multiple snapshots into one new snapshot.


JSON body params:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Destination`             | string              | Name for the new snapshot
 `Sources`                 | []string            | Names of the source snapshots

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `latest`                  | set to `1` to only use the latest version of each package
 `no-remove`               | set to `1` to make sure duplicate arch/name packages aren't removed

HTTP Errors:

 Code     | Description
----------|-------------------------
 201      | Snapshot has been created.
 400      | No `Sources` specified or both `latest` and `no-remove` set.
 404      | A snapshot specified in `Sources` could not be found.
 500      | Another failure occured, check the response message for more detail.

Example:

    $ curl -X POST -H 'Content-Type: application/json' --data '{"Destination": "Merged-Snapshot", "Sources": ["snap-wheezy"]}' http://localhost:8080/api/snapshots/merge
    {"Name":"Merged-Snapshot","CreatedAt":"2023-03-10T15:05:10.618008737+01:00","SourceKind":"snapshot","Description":"Merged from sources: 'snap-wheezy'","Origin":"","NotAutomatic":"","ButAutomaticUpgrades":""}
