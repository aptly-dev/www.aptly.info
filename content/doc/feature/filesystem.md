---
date: "2017-07-06T11:17:38Z"
title: Filesystem Publishing
menu:
    doc:
        weight: 37
        parent: Features
---


Custom Filesystem Publishing  {{< version "1.1.0" >}}
----------------------------

aptly defaults to publish to a single publish directory under `~/.aptly/public`. For
a more advanced publishing strategy, you can define one or more filesystem endpoints in the
`FileSystemPublishEndpoints` list of the aptly [configuration](/doc/configuration) file.

Example:

    ...
    "FileSystemPublishEndpoints": {
      "test1": {
        "rootDir": "/opt/srv1/aptly_public",
        "linkMethod": "symlink"
      },
      "test2": {
        "rootDir": "/opt/srv2/aptly_public",
        "linkMethod": "absoluteSymlink"
      },
      "test3": {
        "rootDir": "/opt/srv3/aptly_public",
        "linkMethod": "relativeSymlink"
      },
      "test4": {
        "rootDir": "/opt/srv4/aptly_public",
        "linkMethod": "copy",
        "verifyMethod": "md5"
      },
      "test5": {
        "rootDir": "/opt/srv5/aptly_public",
        "linkMethod": "hardlink"
      }
    },
    ...


Each endpoint has a name and the following associated settings:

   * `rootDir`:
     The publish directory, e.g., `/opt/srv/aptly_public`.
   * `linkMethod`:
     This is one of `hardlink`, `symlink`, `absoluteSymlink`, `relativeSymlink` or `copy`. 
     It specifies how aptly links the files from the internal pool to the published directory.
     The option `symlink` will be treated as `absoluteSymlink`
     If not specified, empty or wrong, this defaults to `hardlink`.
   * `verifyMethod`:
     This is used only when setting the `linkMethod` to `copy`. Possible values are
     `md5` and `size`. It specifies how aptly compares existing links from the
     internal pool to the published directory. The `size` method compares only the
     file sizes, whereas the `md5` method calculates the md5 checksum of the found
     file and compares it to the desired one.
     If not specified, empty or wrong, this defaults to `md5`.

In order to publish to such an endpoint, specify the endpoint as `filesystem:endpoint-name`
with `endpoint-name` as the name given in the aptly configuration file. For example:

    $ aptly publish snapshot wheezy-main filesystem:test1:wheezy/daily
