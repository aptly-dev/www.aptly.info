+++
date = 2014-07-16T17:02:05Z
title = "Examples"
type = "examples"
+++

Examples
--------

### Mirroring remote repository and serving published repository

Mirror Debian repository distribution squeeze only for architectures
`i386`, `amd64` and publish the result:

[Create](/doc/aptly/mirror/create) mirror:

    $ aptly -architectures="amd64,i386"  mirror create debian-main http://ftp.ru.debian.org/debian/ squeeze main
    2013/12/28 19:44:45 Downloading http://ftp.ru.debian.org/debian/dists/squeeze/Release...
    ...

    Mirror [debian-main]: http://ftp.ru.debian.org/debian/ squeeze successfully added.
    You can run 'aptly mirror update debian-main' to download repository contents.

[Download](/doc/aptly/mirror/update) mirror contents:

    $ aptly mirror update debian-main
    2014/01/15 16:50:50 Downloading http://ftp.ru.debian.org/debian/dists/squeeze/Release...
    Downloading & parsing release files...
    2014/01/15 16:50:50 Downloading http://ftp.ru.debian.org/debian/dists/squeeze/main/binary-amd64/Packages.bz2...
    Saving packages to database...
    Building download queue...
    Download queue: 27960 items, 30.68 GiB size

[Take](/doc/aptly/snapshot/create) snapshot:

    $ aptly snapshot create debian-3112 from mirror debian-main

    Snapshot debian-3112 successfully created.
    You can run 'aptly publish snapshot debian-3112' to publish snapshot as Debian repository.

[Publish](/doc/aptly/publish/snapshot) snapshot (requires generated GPG
key):

    $ aptly publish snapshot debian-3112

    ...

    Snapshot debian-3112 has been successfully published.
    Please setup your webserver to serve directory '/home/example/.aptly/public' with autoindexing.
    Now you can add following line to apt sources:
      deb http://your-server/ squeeze main
    Don't forget to add your GPG key to apt with apt-key.

Set up webserver (e.g. nginx):

    server {
          root /home/example/.aptly/public;
          server_name mirror.local;

          location / {
                  autoindex on;
          }
    }

Add new repository to apt's sources:

    deb http://mirror.local/ squeeze main

Alternatively, you can [serve](/doc/aptly/serve) published repositories with
aptly itself:

    $ aptly serve
    Serving published repositories, recommended apt sources list:

    # ./squeeze (main) [amd64, i386] publishes [debian-3112]: Snapshot from mirror [debian-main]: http://ftp.ru.debian.org/debian/ squeeze
    deb http://localhost:8080/ squeeze main

    Starting web server at: :8080 (press Ctrl+C to quit)...

Run apt-get to fetch repository metadata:

    $ apt-get update

### Pulling new version of packages from backports

Pulling new version of `nginx` from `backports`:

[Create](/doc/aptly/mirror/create) `backports` mirror,
[download](/doc/aptly/mirror/update) it and [take](/doc/aplty/snapshot/create)
snapshot:

    $ aptly -architectures="amd64,i386"  mirror create backports http://mirror.yandex.ru/backports.org/ squeeze-backports
    ...

    $ aptly mirror update backports
    ...

    $ aptly snapshot create back from mirror backports
    ...

[Pull](/doc/aptly/snapshot/pull) new version of `nginx` from `backports` to
main Debian snapshot and save result as `snap-deb-w-nginx`.

    $ aptly snapshot pull debian-3112 back snap-deb-w-nginx nginx
    Dependencies would be pulled into snapshot:
        [debian-3112]: Snapshot from mirror [debian-main]: http://ftp.ru.debian.org/debian/ squeeze
    from snapshot:
        [back]: Snapshot from mirror [backports]: http://mirror.yandex.ru/backports.org/ squeeze-backports
    and result would be saved as new snapshot snap-deb-w-nginx.
    Loading packages (49476)...
    Building indexes...
    [-] nginx-0.7.67-3+squeeze3_i386 removed
    [+] nginx-1.2.1-2.2~bpo60+2_all added
    [+] nginx-full-1.2.1-2.2~bpo60+2_i386 added
    [+] nginx-light-1.2.1-2.2~bpo60+2_i386 added
    [+] nginx-common-1.2.1-2.2~bpo60+2_all added
    [-] nginx-1.2.1-2.2~bpo60+2_all removed
    [-] nginx-0.7.67-3+squeeze3_amd64 removed
    [+] nginx-1.2.1-2.2~bpo60+2_all added
    [+] nginx-full-1.2.1-2.2~bpo60+2_amd64 added
    [+] nginx-light-1.2.1-2.2~bpo60+2_amd64 added

    Snapshot snap-deb-w-nginx successfully created.
    You can run 'aptly publish snapshot snap-deb-w-nginx' to publish snapshot as Debian repository.

Snapshot `snap-deb-w-nginx` can be [published](/doc/aptly/publish/snapshot)
as a separate repository.
