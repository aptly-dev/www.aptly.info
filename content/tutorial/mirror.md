+++
date = 2014-10-09T23:20:00Z
title = "Mirroring with snapshots"
description = "How to create mirror of Debian wheezy with security updates incorporated into the mirror, publish it and consume with apt-get."
+++

Mirroring with snapshots
------------------------

<p class="lead">Goal: build mirror of Debian wheezy, with security updates incorporated,
done using snapshots to make package installation consistent on all the hosts.</p>

### Preparation

First, [install](/download/) aptly. Please verify that you have aptly
dependencies installed: packages `bzip2`, `gnupg` and `gpgv`.
Second, choose some user that would
be running all aptly commands (it shouldn't be root user).

We would be signing published repositories with our GPG key, so if you don't
have GPG key yet, it's time to create one:

<pre class="code">
$ gpg --gen-key
gpg (GnuPG) 1.4.12; Copyright (C) 2012 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection?
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048)
Requested keysize is 2048 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y

You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
    "Heinrich Heine (Der Dichter) &lt;heinrichh@duesseldorf.de&gt;"

Real name: Andrey Smirnov
Email address: me@smira.ru
Comment: Signing repos
You selected this USER-ID:
    "Andrey Smirnov (Signing repos) &lt;me@smira.ru&gt;"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key.

gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
pub   2048R/6430156A 2014-10-09
      Key fingerprint = 52EC DF0E EE8B 5DDF CC8F  7038 B9C8 F8B4 6430 156A
uid                  Andrey Smirnov (Signing repos) &lt;me@smira.ru&gt;
sub   2048R/E0C10001 2014-10-09
</pre>

Default options should be fine, you need to backup your key and prepare revocation
certificate, for examle like described [here](http://fedoraproject.org/wiki/Creating_GPG_Keys).

Now we're ready to start!

### Creating Mirrors

Let's assume that we need to mirror `wheezy` (current stable) Debian distribution for architecture `amd64`,
Only `main` component is required and this repository is targeted for servers, not desktops.
Choose one of the Debian servers to download packages from the
[official list](https://www.debian.org/mirror/list). Let it be `ftp.ru.debian.org` in this tutorial.

Create first mirror for `main` component:

<pre class="code">
$ aptly mirror create -architectures=amd64 -filter='Priority (required) | Priority (important) | Priority (standard)' wheezy-main http://ftp.ru.debian.org/debian/ wheezy main

Looks like your keyring with trusted keys is empty. You might consider importing some keys.
If you're running Debian or Ubuntu, it's a good idea to import current archive keys by running:

  gpg --keyring /usr/share/keyrings/debian-archive-keyring.gpg --export | gpg --no-default-keyring --keyring trustedkeys.gpg --import

(for Ubuntu, use /usr/share/keyrings/ubuntu-archive-keyring.gpg)

Downloading http://ftp.ru.debian.org/debian/dists/wheezy/InRelease...
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/Release...
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/Release.gpg...
gpgv: Signature made Sat 12 Jul 2014 10:59:56 AM UTC using RSA key ID 46925553
gpgv: Can't check signature: public key not found
gpgv: Signature made Sat 12 Jul 2014 11:04:06 AM UTC using RSA key ID 65FFB764
gpgv: Can't check signature: public key not found

Looks like some keys are missing in your trusted keyring, you may consider importing them from keyserver:

gpg --no-default-keyring --keyring trustedkeys.gpg --keyserver keys.gnupg.net --recv-keys 46925553 65FFB764

Sometimes keys are stored in repository root in file named Release.key, to import such key:

wget -O - https://some.repo/repository/Release.key | gpg --no-default-keyring --keyring trustedkeys.gpg --import

ERROR: unable to fetch mirror: verification of detached signature failed: exit status 2
</pre>

aptly is complaining about missing keys in our trusted keyring, as it's not possible to verify authencity
of files being downloaded. Let's follow the advice and import default Debian keyring:

<pre class="code">
$ gpg --keyring /usr/share/keyrings/debian-archive-keyring.gpg --export | gpg --no-default-keyring --keyring trustedkeys.gpg --import
gpg: key 6430156A: public key "Andrey Smirnov (Signing repos) &lt;me@smira.ru&gt;" imported
gpg: key 2A194991: public key "Andrey Smirnov &lt;me@smira.ru&gt;" imported
gpg: key B98321F9: public key "Squeeze Stable Release Key &lt;debian-release@lists.debian.org&gt;" imported
gpg: key 473041FA: public key "Debian Archive Automatic Signing Key (6.0/squeeze) &lt;ftpmaster@debian.org&gt;" imported
gpg: key 65FFB764: public key "Wheezy Stable Release Key &lt;debian-release@lists.debian.org&gt;" imported
gpg: key 46925553: public key "Debian Archive Automatic Signing Key (7.0/wheezy) &lt;ftpmaster@debian.org&gt;" imported
gpg: Total number processed: 6
gpg:               imported: 6  (RSA: 6)
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
</pre>

Now, let's retry the mirror creation procedure:

<pre class="code">
$ aptly mirror create -architectures=amd64 -filter='Priority (required) | Priority (important) | Priority (standard) | nginx | postgresql | redis-server | memcached | ruby | golang' -filter-with-deps wheezy-main http://ftp.ru.debian.org/debian/ wheezy main
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/InRelease...
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/Release...
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/Release.gpg...
gpgv: Signature made Sat 12 Jul 2014 10:59:56 AM UTC using RSA key ID 46925553
gpgv: Good signature from "Debian Archive Automatic Signing Key (7.0/wheezy) &lt;ftpmaster@debian.org&gt;"
gpgv: Signature made Sat 12 Jul 2014 11:04:06 AM UTC using RSA key ID 65FFB764
gpgv: Good signature from "Wheezy Stable Release Key &lt;debian-release@lists.debian.org&gt;"

Mirror [wheezy-main]: http://ftp.ru.debian.org/debian/ wheezy successfully added.
You can run 'aptly mirror update wheezy-main' to download repository contents.
</pre>

Now the signature has been verified: files in the mirror are signed with Debian key
([list of active keys](https://ftp-master.debian.org/keys.html)).

The flag `-filter=` allows us to cut down number of packages to download. First part, `Priority (required) | Priority (important) | Priority (standard)` is essential "base" Debian system, then several (virtual) packages are added that I
need: `nginx`,  `postgresql`, etc. Flag `-filter-with-deps` instructs aptly to include dependencies of
matching packages as well. If filter is not specified, all packages would be included in the mirror and that would
require more space and download size would be bigger.

Create also `wheezy-updates` and `wheezy-security` mirrors to get important updates:

<pre class="code">
$ aptly mirror create -architectures=amd64 -filter='Priority (required) | Priority (important) | Priority (standard) | nginx | postgresql | redis-server | memcached | ruby | golang' -filter-with-deps wheezy-updates http://ftp.ru.debian.org/debian/ wheezy-updates main
...

$ aptly mirror create -architectures=amd64 -filter='Priority (required) | Priority (important) | Priority (standard) | nginx | postgresql | redis-server | memcached | ruby | golang' -filter-with-deps wheezy-security http://security.debian.org/ wheezy/updates main
...
</pre>

### Updating mirrors

Update `wheezy-main` mirror for the first time:

<pre class="code">
$ aptly mirror update wheezy-main
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/InRelease...
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/Release...
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/Release.gpg...
gpgv: Signature made Sat 12 Jul 2014 10:59:56 AM UTC using RSA key ID 46925553
gpgv: Good signature from "Debian Archive Automatic Signing Key (7.0/wheezy) &lt;ftpmaster@debian.org&gt;"
gpgv: Signature made Sat 12 Jul 2014 11:04:06 AM UTC using RSA key ID 65FFB764
gpgv: Good signature from "Wheezy Stable Release Key &lt;debian-release@lists.debian.org&gt;"
Downloading &amp; parsing package files...
Downloading http://ftp.ru.debian.org/debian/dists/wheezy/main/binary-amd64/Packages.bz2...
Applying filter...
Packages filtered: 35933 -> 304.
Building download queue...
Download queue: 304 items (147.18 MiB)
Downloading http://ftp.ru.debian.org/debian/pool/main/g/gnutls26/libgnutls26_2.12.20-8+deb7u2_amd64.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/e/eglibc/locales_2.13-38+deb7u2_all.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/p/perl/perl-modules_5.14.2-21+deb7u1_all.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/v/vim/vim-tiny_7.3.547-7_amd64.deb...
Downloading http://ftp.ru.debian.org/debian/pool/main/libt/libtext-iconv-perl/libtext-iconv-perl_1.7-5_amd64.deb...
....

Mirror `wheezy-main` has been successfully updated.
</pre>

Packages files have been downloaded to `~/.aptly/pool/`, current mirror contents stored in the package database.
You can update mirror at any moment as required.

And, for two other mirrors:

<pre class="code">
$ aptly mirror update wheezy-security
...

$ aptly mirror update wheezy-updates
...
</pre>

### Taking snapshots

It's time take snapshots of the mirrors to preserve *exact* current mirror state. I will label snapshots
after mirror name, applying version for the main `wheezy` mirror and current date for frequently updated
`security` and `updates` mirrors:

<pre class="code">
$ aptly snapshot create wheezy-main-7.6 from mirror wheezy-main

Snapshot wheezy-main-7.6 successfully created.
You can run 'aptly publish snapshot wheezy-main-7.6' to publish snapshot as Debian repository.

$ aptly snapshot create wheezy-updates-20141009 from mirror wheezy-updates

Snapshot wheezy-updates-20141009 successfully created.
You can run 'aptly publish snapshot wheezy-updates-20141009' to publish snapshot as Debian repository.

$ aptly snapshot create wheezy-security-20141009 from mirror wheezy-security

Snapshot wheezy-security-20141009 successfully created.
You can run 'aptly publish snapshot wheezy-security-20141009' to publish snapshot as Debian repository.
</pre>

Snapshots are created instantly and they don't occupy any extra space: only list of packages
is stored inside the snapshot.

### Merging snapshots

Now we can merge snapshots into one, producing "wheezy with security updates applied":

<pre class="code">
$ aptly snapshot merge -latest wheezy-final-20141009 wheezy-main-7.6 wheezy-updates-20141009 wheezy-security-20141009

Snapshot wheezy-final-20141009 successfully created.
You can run 'aptly publish snapshot wheezy-final-20141009' to publish snapshot as Debian repository.
</pre>

Flag `-latest` chooses merge strategy: package with latest version "wins".

Let's verify that merge was correct:

<pre class="code">
$ aptly package show -with-references 'Name (nginx)'
Package: nginx
Version: 1.2.1-2.2+wheezy2
Installed-Size: 87
Priority: optional
Section: httpd
Maintainer: Kartik Mistry &lt;kartik@debian.org&gt;
Architecture: all
Description: small, powerful, scalable web/proxy server
MD5sum: fa5f86939aace1957b1fc846573cd2b1
SHA1: 05e521a9ec7854ed706aabcb0c0ea83fdee980d2
SHA256: 846905a046608aded2d29e05409ec3c0024717e6446cd0bdb544396a9652644d
Tag: implemented-in::c, interface::daemon, network::server, network::service,protocol::http, role::program, use::proxying
Description-md5: 19a4ea43e33eae4a46abf8a78966deb5
Source:
Filename: nginx_1.2.1-2.2+wheezy2_all.deb
Size: 61254
Depends: nginx-full | nginx-light
Homepage: http://nginx.net

References to package:
  mirror [wheezy-main]: http://ftp.ru.debian.org/debian/ wheezy
  snapshot [wheezy-main-7.6]: Snapshot from mirror [wheezy-main]: http://ftp.ru.debian.org/debian/ wheezy

Package: nginx
Version: 1.2.1-2.2+wheezy3
Installed-Size: 87
Priority: optional
Section: web
Maintainer: Kartik Mistry &lt;kartik@debian.org&gt;
Architecture: all
Description: small, powerful, scalable web/proxy server
MD5sum: 25ae5234388762babbfbe3632dbdcc57
SHA1: 34d7ff8f24cc47960688ae84d6d98f92275ad453
SHA256: 516d33cf93f20ca070a203bafacc6f7ceb04bd3ae221d5a9a59f90e2ab828245
Depends: nginx-full | nginx-light
Description-md5: 19a4ea43e33eae4a46abf8a78966deb5
Homepage: http://nginx.net
Source:
Filename: nginx_1.2.1-2.2+wheezy3_all.deb
Size: 61374

References to package:
  mirror [wheezy-security]: http://security.debian.org/ wheezy/updates
  snapshot [wheezy-final-20141009]: Merged from sources: 'wheezy-main-7.6', 'wheezy-updates-20141009', 'wheezy-security-20141009'
  snapshot [wheezy-security-20141009]: Snapshot from mirror [wheezy-security]: http://security.debian.org/ wheezy/updates
</pre>

New version of `nginx` package which came from `wheezy-security` mirror is now part of our final snapshot
`wheezy-final-20141009`.

### PUBLISHING REPOSITORY

Final step: publishing our snapshot as Debian repository, ready to be consumed by `apt-get`:

<pre class="code">
$ aptly publish snapshot wheezy-final-20141009
ERROR: unable to publish: unable to guess distribution name, please specify explicitly
</pre>

aptly complains that it can't guess distribution name, as the source mirrors we had (main, security and
updates) all have different distribution names. So we need to help aptly a bit by supplying
distribution name:

<pre class="code">
$ aptly publish snapshot -distribution=wheezy wheezy-final-20141009
Loading packages...
Generating metadata files and linking package files...
Finalizing metadata files...
Signing file 'Release' with gpg, please enter your passphrase when prompted:

You need a passphrase to unlock the secret key for
user: "Andrey Smirnov (Signing repos) &lt;me@smira.ru&gt;"
2048-bit RSA key, ID 6430156A, created 2014-10-09

Clearsigning file 'Release' with gpg, please enter your passphrase when prompted:

You need a passphrase to unlock the secret key for
user: "Andrey Smirnov (Signing repos) &lt;me@smira.ru&gt;"
2048-bit RSA key, ID 6430156A, created 2014-10-09


Snapshot wheezy-final-20141009 has been successfully published.
Please setup your webserver to serve directory '/home/smira/.aptly/public' with autoindexing.
Now you can add following line to apt sources:
  deb http://your-server/ wheezy main
Don't forget to add your GPG key to apt with apt-key.

You can also use `aptly serve` to publish your repositories over HTTP quickly.
</pre>

The repository is published to `~/.aptly/public/` directory. You can start any HTTP server
to serve this directory as static files, or use aptly built-in webserver for testing:

<pre class="code">
$ aptly serve
Serving published repositories, recommended apt sources list:

# ./wheezy [amd64] publishes {main: [wheezy-final-20141009]: Merged from sources: 'wheezy-main-7.6', 'wheezy-updates-20141009', 'wheezy-security-20141009'}
deb http://debian:8080/ wheezy main

Starting web server at: :8080 (press Ctrl+C to quit)...
</pre>

I can also visalize the objects I've created and dependencies:

<pre class="code">
$ aptly graph
Loading mirrors...
Loading local repos...
Loading snapshots...
Loading published repos...
Generating graph...
Rendered to PNG file: /tmp/aptly-graph128726742.png
</pre>

This would result in picture like this one:

<img class="img-responsive" src="/img/aptly-graph.png">

### Using repository

First I need to import public part of the key that was used to sign the repository
into trusted apt keyring on target machine.

Export the key on machine with aptly:

<pre class="code">
$ gpg --export --armor > my_key.pub
</pre>

Copy `my_key.pub` to target machine and import it into apt keyring:

<pre class="code">
$ sudo apt-key add my_key.pub
OK
</pre>

It's time to edit `/etc/apt/sources.list`. I comment out default sources and add address of my
first machine running `aptly serve` currently:

    #deb http://ftp.ru.debian.org/debian/ wheezy main
    #deb-src http://ftp.ru.debian.org/debian/ wheezy main

    deb http://10.0.2.14:8080/ wheezy main

Repository is ready to be used:

<pre class="code">
$ sudo apt-get update
Get:1 http://10.0.2.14 wheezy Release.gpg [490 B]
Hit http://10.0.2.14 wheezy Release
Hit http://10.0.2.14 wheezy/main amd64 Packages
Ign http://10.0.2.14 wheezy/main Translation-en_US
Ign http://10.0.2.14 wheezy/main Translation-en
Fetched 490 B in 0s (33.1 kB/s)
Reading package lists... Done

$ sudo apt-get upgrade
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following packages have been kept back:
  libc-bin libc6 openssh-client
The following packages will be upgraded:
  apt apt-utils base-files bash dpkg gnupg gpgv krb5-locales libapt-inst1.5 libapt-pkg4.12 libgnutls26 libgssapi-krb5-2 libk5crypto3 libkrb5-3 libkrb5support0 libssl1.0.0 libxfont1 locales
  multiarch-support tzdata
20 upgraded, 0 newly installed, 0 to remove and 3 not upgraded.
Need to get 19.6 MB of archives.
After this operation, 74.8 kB of additional disk space will be used.
Do you want to continue [Y/n]? y
Get:1 http://10.0.2.14/ wheezy/main base-files amd64 7.1wheezy6 [78.7 kB]
Get:2 http://10.0.2.14/ wheezy/main bash amd64 4.2+dfsg-0.1+deb7u3 [1,501 kB]
...
</pre>

As this repository has been published from snapshot, it would never change until it is update to new snapshot.
Good thing is that I can setup all my machine to use this repo and get identical set of packages
installed.
Bad thing is that I need to maintain and update my repo as updates are coming,
but if I have many machines, the advantage of predictable upgrades outweighs the maintenance costs.

### Upgrading repository

Several days after, when I update my mirrors I discover new security updates:

<pre class="code">
$ aptly mirror update wheezy-security
....
</pre>

So it's time to create new snapshot:

<pre class="code">
$ aptly snapshot create wheezy-security-20141019 from mirror wheezy-security

Snapshot wheezy-security-20141019 successfully created.
You can run 'aptly publish snapshot wheezy-security-20141019' to publish snapshot as Debian repository.
</pre>

And do merge once again:

<pre class="code">
$ aptly snapshot merge -latest wheezy-final-20141019 wheezy-main-7.6 wheezy-updates-20141009 wheezy-security-20141019

Snapshot wheezy-final-20141019 successfully created.
You can run 'aptly publish snapshot wheezy-final-20141019' to publish snapshot as Debian repository.
</pre>

Now I can update my published repository by switching it to new snapshot:

<pre>
$ aptly publish switch wheezy wheezy-final-20141019
Loading packages...
Generating metadata files and linking package files...
Finalizing metadata files...

...

Cleaning up prefix "." components main...

Publish for snapshot ./wheezy [amd64] publishes {main: [wheezy-final-20141019]: Merged from sources: 'wheezy-main-7.6', 'wheezy-updates-20141009', 'wheezy-security-20141019'} has been successfully switched to new snapshot.
</pre>

`apt-get` would notice new packages on next update, and I can upgrade my target machine.

If run `aptly graph` again, the picture would be more interesting:

<img class="img-responsive" src="/img/aptly-graph2.png">

### Maintenance

You can drop old snapshots as they're not used anymore. This would allow to cleanup some files
with `aptly db cleanup`:

<pre class="code">
$ aptly db cleanup
Loading mirrors, local repos and snapshots...
Loading list of all packages...
Deleting unreferenced packages (23)...
Building list of files referenced by packages...
Building list of files in package pool...
Deleting unreferenced files (10)...
Compacting database...
</pre>

Package files are not deleted until there's at least one object that references them (snapshot, mirror or
local repositories).

Next tutorial is about [pulling new version of packages from backports or 3rd party repos](/tutorial/pull/).