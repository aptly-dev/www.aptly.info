---
date: "2014-02-08T11:17:38Z"
title: "Publish API"
menu:
    doc:
        parent: Legacy API
        weight: 40
---

Publish API
-----------

Manages [published repositories](/doc/aptly/publish).

Publish APIs use following convention to identify published repositories: `/api/publish/:prefix/:distribution`.
`:distribution` is distribution name, while `:prefix` is `[<storage>:]<prefix>` (storage is optional, it defaults
to empty string), if publishing prefix contains slashes `/`, they should be replaced with underscores (`_`) and underscores
should be replaced with double underscore (`__`). To specify root `:prefix`, use `:.`, as `.` is ambigious in URLs.

Published repository properties:

 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Storage`                 | string              | storage kind (empty for local filesystem, `s3` for S3 and `swift` for Swift)
 `Prefix`                  | string              | publishing prefix, `.` for root
 `Distribution`            | string              | distribution name
 `SourceKind`              | string              | type of published repository: `snapshot` for snapshot, `local` for local repositories
 `Sources`                 | []Source            | list of sources, `Component` and `Name` of local repository/snapshot
 `Architectures`           | []string            | list of architectures published, e.g. `["i386", "amd64"]`
 `Label`                   | string              | value of `Label:` field in published repository stanza
 `Origin`                  | string              | value of `Origin:` field in published repository stanza
 `NotAutomatic`            | string              | setting to `yes` indicates to the package manager to not install or upgrade packages from the repository without user consent [🛈](https://wiki.debian.org/DebianRepository/Format#NotAutomatic_and_ButAutomaticUpgrades)
 `ButAutomaticUpgrades`    | string              | setting to `yes` excludes upgrades from the `NotAutomic` setting [🛈](https://wiki.debian.org/DebianRepository/Format#NotAutomatic_and_ButAutomaticUpgrades)
 `AcquireByHash`           | bool                | provide index files by hash
 `MultiDist`               | bool                | enable multiple packages with the same filename in different distributions

Signing options (all are optional):


 Name                      | Type                | Description
---------------------------|---------------------|-------------------------------
 `Skip`                    | bool                | if `true`, don't sign published repository
 `GpgKey`                  | string              | gpg key name (local to aptly server/user)
 `Keyring`                 | string              | gpg keyring filename (local to aptly server/user)
 `SecretKeyring`           | string              | gpg secret keyring filename (local to aptly server/user)
 `Passphrase`              | string              | gpg key passphrase (if using over http, would be transmitted in clear text!)
 `PassphraseFile`          | string              | gpg passphrase file (local to aptly server/user)
 `Batch`                   | bool                | if `true`, prevent gpg from allocating a tty and asking for passphrase


### List

`GET /api/publish`

List published repositories.

Example:

    $ curl http://localhost:8080/api/publish
    [{"AcquireByHash":false,"Architectures":["i386"],"Distribution":"trusty","Label":"","Origin":"","Prefix":".","SourceKind":"snapshot","Sources":[{"Component":"main","Name":"snap1"}],"Storage":""},{"AcquireByHash":false,"Architectures":["i386","source"],"Distribution":"wheezy","Label":"","Origin":"","Prefix":"testing","SourceKind":"local","Sources":[{"Component":"main","Name":"local-repo"}],"Storage":""}]

### Publish Snapshot/Local Repo

`POST /api/publish/:prefix`

Publish local repository or snapshot under specified prefix. Storage might be passed in prefix as well,
e.g. `s3:packages/`. To supply empty prefix, just remove last part (`POST /api/publish`)

JSON body params:

 Name                      | Type                 | Description
---------------------------|----------------------|-------------------------------
 `SourceKind`              | string, *required*   | source kind: `local` for local repositories and `snapshot` for snapshots
 `Sources`                 | []Source, *required* | list of `Component`/`Name` objects, `Name` is either local repository or snapshot name
 `Distribution`            | string               | distribution name, if missing aptly would try to guess from sources
 `Label`                   | string               | value of `Label:` field in published repository stanza
 `Origin`                  | string               | value of `Origin:` field in published repository stanza
 `ForceOverwrite`          | bool                 | when publishing, overwrite files in `pool/` directory without notice
 `Architectures`           | []string             | override list of published architectures
 `Signing`                 | SigningOptions       | gpg options (see above)
 `NotAutomatic`            | string               | setting to `yes` indicates to the package manager to not install or upgrade packages from the repository without user consent [🛈](https://wiki.debian.org/DebianRepository/Format#NotAutomatic_and_ButAutomaticUpgrades)
 `ButAutomaticUpgrades`    | string               | setting to `yes` excludes upgrades from the `NotAutomic` setting [🛈](https://wiki.debian.org/DebianRepository/Format#NotAutomatic_and_ButAutomaticUpgrades)
 `SkipCleanup`             | bool                 | don't remove unreferenced files in prefix/component
 `AcquireByHash`           | bool                 | provide index files by hash
 `MultiDist`               | bool                 | enable multiple packages with the same filename in different distributions

Notes on `Sources` field:

 * when publishing single component repository, `Component` may be omitted, it would be guessed from source or set
   to default value `main`
 * for multiple component published repository, `Component` would be guessed from source if not set

 GPG signing would happen in aptly server, using local to server gpg binary, keyrings.

 It's not possible to configure publishing endpoints via API, they should be set in [configuration](/doc/configuration) and
 require aptly server restart.

HTTP errors:

Code      | Description
----------|-------------------------
 400      | prefix/distribution is already used by another published repository
 404      | source snapshot/repo hasn't been found

Example:

    $ curl -X POST -H 'Content-Type: application/json' --data '{"SourceKind": "local", "Sources": [{"Name": "local-repo"}], "Architectures": ["i386", "amd64"], "Distribution": "wheezy"}' http://localhost:8080/api/publish/:.
    {"AcquireByHash":false,"Architectures":["amd64","i386"],"Distribution":"wheezy","Label":"","Origin":"","Prefix":".","SourceKind":"local","Sources":[{"Component":"main","Name":"local-repo"}],"Storage":""}

    $ curl -X POST -H 'Content-Type: application/json' --data '{"SourceKind": "local", "Sources": [{"Name": "0XktRe6qMFp4b8C", "Component": "contrib"}, {"Name": "EqmoTZiVx8MGN65", "Component": "non-free"}], "Architectures": ["i386", "amd64"], "Distribution": "wheezy"}' http://localhost:8080/api/publish/debian_testing/
    {"AcquireByHash":false,"Architectures":["amd64","i386"],"Distribution":"wheezy","Label":"","Origin":"","Prefix":"debian/testing","SourceKind":"local","Sources":[{"Component":"contrib","Name":"0XktRe6qMFp4b8C"},{"Component":"non-free","Name":"EqmoTZiVx8MGN65"}],"Storage":""}

### Update Published Local Repo/Switch Published Snapshot

`PUT /api/publish/:prefix/:distribution`

API action depends on published repository contents:

* if local repository has been published, published repository would be updated to match local repository contents
* if snapshots have been been published, it is possible to switch each component to new snapshot

JSON body params:

 Name                      | Type                 | Description
---------------------------|----------------------|-------------------------------
 `Snapshots`               | []Source             | *only when updating published snapshots*, list of objects `Component`/`Name`
 `ForceOverwrite`          | bool                 | when publishing, overwrite files in `pool/` directory without notice
 `Signing`                 | SigningOptions       | gpg options (see above)
 `AcquireByHash`           | bool                 | provide index files by hash
 `MultiDist`               | bool                 | enable multiple packages with the same filename in different distributions


Example:

    $ curl -X PUT -H 'Content-Type: application/json' --data '{"Snapshots": [{"Component": "main", "Name": "8KNOnIC7q900L5v"}]}' http://localhost:8080/api/publish/:./wheezy
    {"AcquireByHash":false,"Architectures":["amd64","i386"],"Distribution":"wheezy","Label":"","Origin":"","Prefix":".","SourceKind":"local","Sources":[{"Component":"main","Name":"2y21K6aKBE5UJBQ"}],"Storage":""}

### Drop Published Repository

`DELETE /api/publish/:prefix/:distribution`

Delete published repository, clean up files in published directory.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `force`                   | force published repository removal even if component cleanup fails

Usually `?force=1` isn't required, but if due to some corruption component cleanup
fails, `?force=1` could be used to drop published repository. This might leave
some published repository files left under `public/` directory.

Example:

    $ curl -X DELETE http://localhost:8080/api/publish//wheezy
    {}
