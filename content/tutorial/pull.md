+++
date = 2014-10-10T23:20:00Z
title = "Pulling new versions of packages"
description = "How to pull some packages from backports and 3rd party repositories."
+++

Pulling new versions of packages
--------------------------------

Let's start with mirrors created in [first tutorial](/tutorial/mirror/): `wheezy-main`,
`wheezy-updates` and `wheezy-security`.

### Backporting nginx

Create new mirror `wheezy-backports`:

<pre class="code">
$ aptly mirror create -architectures=amd64 -filter=nginx -filter-with-deps wheezy-backports http://ftp.ru.debian.org/debian/ wheezy-backports main
...

$ aptly mirror update wheezy-backports
Downloading http://ftp.ru.debian.org/debian/dists/wheezy-backports/InRelease...
gpgv: Signature made Thu 09 Oct 2014 02:49:29 PM UTC using RSA key ID 46925553
gpgv: Good signature from "Debian Archive Automatic Signing Key (7.0/wheezy) &lt;ftpmaster@debian.org&gt;"
Downloading &amp; parsing package files...
Downloading http://ftp.ru.debian.org/debian/dists/wheezy-backports/main/binary-amd64/Packages.bz2...
Applying filter...
Packages filtered: 3290 -> 10.
Building download queue...
Download queue: 10 items (2.45 MiB)
Downloading http://ftp.ru.debian.org/debian/pool/main/l/luajit/libluajit-5.1-2_2.0.3+dfsg-3~bpo70+1_amd64.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/n/nginx/nginx-full_1.6.2-1~bpo70+1_amd64.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/n/nginx/nginx-extras_1.6.2-1~bpo70+1_amd64.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/n/nginx/nginx-common_1.6.2-1~bpo70+1_all.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/l/luajit/libluajit-5.1-common_2.0.3+dfsg-3~bpo70+1_all.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/n/nginx/nginx-naxsi_1.6.2-1~bpo70+1_amd64.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/n/nginx/nginx-light_1.6.2-1~bpo70+1_amd64.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/i/init-system-helpers/init-system-helpers_1.18~bpo70+1_all.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/g/geoip/libgeoip1_1.5.0-3~bpo70+1_amd64.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/n/nginx/nginx_1.6.2-1~bpo70+1_all.deb...

Mirror `wheezy-backports` has been successfully updated.
</pre>

Once again, I've been using filters to reduce download size, but I could've create mirror without filter
covering whole wheezy-backports repostiroy.

Create snapshot of that mirror:

<pre class="code">
$ aptly snapshot create wheezy-backports-20141009 from mirror wheezy-backports

Snapshot wheezy-backports-20141009 successfully created.
You can run 'aptly publish snapshot wheezy-backports-20141009' to publish snapshot as Debian repository.
</pre>

The magic happens when I ask aptly to pull new version of `nginx` package from `wheezy-backports` snapshot
into my `wheezy-main` snapshot:

<pre class="code">
$ aptly snapshot pull wheezy-final-20141009 wheezy-backports-20141009 wheezy-main-nginx-20141009 nginx
Dependencies would be pulled into snapshot:
    [wheezy-final-20141009]: Merged from sources: 'wheezy-main-7.6', 'wheezy-updates-20141009', 'wheezy-security-20141009'
from snapshot:
    [wheezy-backports-20141009]: Snapshot from mirror [wheezy-backports]: http://ftp.ru.debian.org/debian/ wheezy-backports
and result would be saved as new snapshot wheezy-main-nginx-20141009.
Loading packages (327)...
Building indexes...
[+] init-system-helpers_1.18~bpo70+1_all added
[+] libluajit-5.1-2_2.0.3+dfsg-3~bpo70+1_amd64 added
[+] libluajit-5.1-common_2.0.3+dfsg-3~bpo70+1_all added
[-] nginx-naxsi-ui_1.2.1-2.2+wheezy3_all removed
[-] nginx_1.2.1-2.2+wheezy3_all removed
[+] nginx_1.6.2-1~bpo70+1_all added
[-] nginx-common_1.2.1-2.2+wheezy3_all removed
[+] nginx-common_1.6.2-1~bpo70+1_all added
[-] nginx-extras_1.2.1-2.2+wheezy3_amd64 removed
[+] nginx-extras_1.6.2-1~bpo70+1_amd64 added
[-] nginx-full_1.2.1-2.2+wheezy3_amd64 removed
[+] nginx-full_1.6.2-1~bpo70+1_amd64 added
[-] nginx-light_1.2.1-2.2+wheezy3_amd64 removed
[+] nginx-light_1.6.2-1~bpo70+1_amd64 added
[-] nginx-naxsi_1.2.1-2.2+wheezy3_amd64 removed
[+] nginx-naxsi_1.6.2-1~bpo70+1_amd64 added

Snapshot wheezy-main-nginx-20141009 successfully created.
You can run 'aptly publish snapshot wheezy-main-nginx-20141009' to publish snapshot as Debian repository.
</pre>

As you can see, aptly has replaced not only `nginx` package, but all its dependencies that required upgrade.
Now snapshot `wheezy-main-nginx-20141009` is Debian wheezy 7.6 plus new version of nginx.

### Pulling aptly

In order to add latest version of aptly package from `repo.aptly.info` mirror, create
and update mirror:

<pre class="code">
$ aptly mirror create aptly-repo http://repo.aptly.info/ squeeze
Downloading http://repo.aptly.info/dists/squeeze/InRelease...
gpgv: Signature made Fri 03 Oct 2014 02:35:18 PM UTC using RSA key ID 2A194991
gpgv: Good signature from "Andrey Smirnov &lt;me@smira.ru&gt;"

Mirror [aptly-repo]: http://repo.aptly.info/ squeeze successfully added.
You can run 'aptly mirror update aptly-repo' to download repository contents.
$ aptly mirror update aptly-repo
Downloading http://repo.aptly.info/dists/squeeze/InRelease...
gpgv: Signature made Fri 03 Oct 2014 02:35:18 PM UTC using RSA key ID 2A194991
gpgv: Good signature from "Andrey Smirnov &lt;me@smira.ru&gt;"
Downloading &amp; parsing package files...
Downloading http://repo.aptly.info/dists/squeeze/main/binary-amd64/Packages.bz2...
Downloading http://repo.aptly.info/dists/squeeze/main/binary-i386/Packages.bz2...
Building download queue...
Download queue: 14 items (47.29 MiB)
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.5_amd64.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.5_i386.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.6_amd64.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.6_i386.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.7.1_amd64.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.7.1_i386.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.7_amd64.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.7_i386.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.4.1_amd64.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.4.1_i386.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.8_amd64.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.8_i386.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.5.1_amd64.deb...
Downloading http://repo.aptly.info/pool/main/a/aptly/aptly_0.5.1_i386.deb...

Mirror `aptly-repo` has been successfully updated.
</pre>

In this case I haven't limited architectures (so both `i386` and `amd64` were downloaded) and haven't specified
component name: aptly can figure it out on its own.

Next, create snapshot:

<pre class="code">
$ aptly snapshot create aptly-0.8 from mirror aptly-repo

Snapshot aptly-0.8 successfully created.
You can run 'aptly publish snapshot aptly-0.8' to publish snapshot as Debian repository.
</pre>

And pull latest version of aptly from that snapshot into my `wheezy-main-nginx-20141009` snapshot created
in previous section:

<pre class="code">
$ aptly snapshot pull wheezy-main-nginx-20141009 aptly-0.8 wheezy-main-nginx-aptly-20141009 aptly
Dependencies would be pulled into snapshot:
    [wheezy-main-nginx-20141009]: Pulled into 'wheezy-main-7.6' with 'wheezy-backports-20141009' as source, pull request was: 'nginx'
from snapshot:
    [aptly-0.8]: Snapshot from mirror [aptly-repo]: http://repo.aptly.info/ squeeze
and result would be saved as new snapshot wheezy-main-nginx-aptly-20141009.
Loading packages (331)...
Building indexes...
[+] aptly_0.8_amd64 added

Snapshot wheezy-main-nginx-aptly-20141009 successfully created.
You can run 'aptly publish snapshot wheezy-main-nginx-aptly-20141009' to publish snapshot as Debian repository.
</pre>

I haven't specified version: aptly would choose latest version by default, also aptly is smart enough
to pull only `amd64` package, as my snapshot `wheezy-main-nginx-20141009` contains only `amd64` packages.

### Publishing

So we're ready to publish new snapshot as Debian repository. This time I would use two prefixes: one for stable
version of repository, which is well-tested, and another one for "testing" version that I would like to test
on small set of machines before deploying it fully.

Publishing vanilla wheezy distribution from [mirroring tutorial](/tutorial/mirror/) as stable version:

<pre class="code">
$ aptly publish snapshot -distribution=wheezy wheezy-final-20141009 stable

...

Snapshot wheezy-final-20141009 has been successfully published.
Please setup your webserver to serve directory '/home/smira/.aptly/public' with autoindexing.
Now you can add following line to apt sources:
  deb http://your-server/stable/ wheezy main
Don't forget to add your GPG key to apt with apt-key.

You can also use `aptly serve` to publish your repositories over HTTP quickly.
</pre>

I've added one more argument on the command line, `stable` which is publishing prefix (simply
subdirectory to publish under). Now the apt-sources line suggested by aptly contains
that prefix: `deb http://your-server/stable/ wheezy main`.

And I publish my wheezy + new nginx + aptly repository as testing version:

<pre class="code">
$ aptly publish snapshot -distribution=wheezy wheezy-main-nginx-aptly-20141009 testing

...

Snapshot wheezy-main-nginx-aptly-20141009 has been successfully published.
Please setup your webserver to serve directory '/home/smira/.aptly/public' with autoindexing.
Now you can add following line to apt sources:
  deb http://your-server/testing/ wheezy main
Don't forget to add your GPG key to apt with apt-key.

You can also use `aptly serve` to publish your repositories over HTTP quickly.
</pre>

I can verify that I have two published repos in different prefixes:

<pre class="code">
$ aptly serve
Serving published repositories, recommended apt sources list:

# stable/wheezy [amd64] publishes {main: [wheezy-final-20141009]: Merged from sources: 'wheezy-main-7.6', 'wheezy-updates-20141009', 'wheezy-security-20141009'}
deb http://debian:8080/stable/ wheezy main
# testing/wheezy [amd64] publishes {main: [wheezy-main-nginx-aptly-20141009]: Pulled into 'wheezy-main-nginx-20141009' with 'aptly-0.8' as source, pull request was: 'aptly'}
deb http://debian:8080/testing/ wheezy main
</pre>

After successful round of testing, I can use `aptly publish switch` to switch by stable published repository
to the new snapshot `wheezy-main-nginx-aptly-20141009` and update my target machines.

If I generate the graph, it would look like that:

<img class="img-responsive" src="/img/aptly-graph3.png">
