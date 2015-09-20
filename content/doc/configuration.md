---
date: "2014-08-08T11:17:38Z"
title: Configuration
menu:
    doc:
        weight: 90
---

Configuration
--------------

aptly looks for configuration file first in `~/.aptly.conf` then
in `/etc/aptly.conf` and, if no config file found, new one is created in
home directory. If
`-config=` flag is specified, aptly would use config file at specified
location. Also aptly needs root directory for database, package and
published repository storage. If not specified, directory defaults to
`~/.aptly`, it will be created if missing.

Configuration file is stored in JSON format (default values shown
below):

    {
      "rootDir": "$HOME/.aptly",
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
      "S3PublishEndpoints": {
        "test": {
          "region": "us-east-1",
          "bucket": "repo",
          "awsAccessKeyID": "",
          "awsSecretAccessKey": "",
          "prefix": "",
          "acl": "public-read",
          "storageClass": "",
          "encryptionMethod": "",
          "plusWorkaround": false
        }
      },
      "SwiftPublishEndpoints": {
        "test": {
          "container": "repo",
          "osname": "",
          "password": "",
          "prefix": "",
          "authurl": "",
          "tenant": "",
          "tenantid": ""
        }
      }
    }

Options:

-   `rootDir` is root of directory storage to store database
    (`rootDir/db`), downloaded packages (`rootDir/pool`) and published
    repositories (`rootDir/public`)
-   `downloadConcurrency` is a number of parallel download threads to
    use when downloading packages
-   `downloadSpeedLimit` is a limit on download bandwidth used by aptly
    in kbytes per second, 0 means unlimited
-   `architectures` is a list of architectures to process; if left empty
    defaults to all available architectures; could be overridden with
    option `-architectures`
-   `dependencyFollowSuggests`: follow contents of `Suggests:` field
    when processing dependencies for the package
-   `dependencyFollowRecommends`: follow contents of `Recommends:` field
    when processing dependencies for the package
-   `dependencyFollowAllVariants`: when dependency looks like
    `package-a | package-b`, follow both variants always
-   `dependencyFollowSource`: follow dependency from binary package to
    source package
-   `gpgDisableSign`: don't sign published repositories with `gpg`, also
    can be disabled on per-repo basis using `-skip-signing` flag when
    publishing
-   `gpgDisableVerify`: don't verify remote mirrors with `gpg`, also can
    be disabled on per-mirror basis using `-ignore-signatures` flag when
    creating and updating mirrors
-   `downloadSourcePackages`: if enabled, all mirrors created would have
    flag set to download source packages; this setting could be
    controlled on per-mirror basis with `-with-sources` flag
-   `ppaDistributorID` & `ppaCodename` specifies paramaters for short
    PPA url expansion, if left blank they default to output of
    `lsb_release` command
-   `S3PublishEndpoints` is a configuration of Amazon S3 publishing
    endpoints (see [publishing to S3](/doc/feature/s3/))
-   `SwiftPublishEndpoints` describes OpenStack Swift publishing
    parameters (see [publishing to Swift](/doc/feature/swift))

<div class="alert alert-warning alert-note"><strong>Warning:</strong> <code>rootDir</code> contains all the downloaded packages from remote
mirrors, so it should have enough space. For example. mirror of Debian
wheezy (amd64 and i386) requires 70 GiB of disk space.</div>

aptly would use HTTP proxy configured in `HTTP_PROXY` environment
variable.