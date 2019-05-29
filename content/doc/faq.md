---
date: "2014-08-08T11:17:38Z"
title: "FAQ"
menu:
    doc:
        weight: 30
---

Frequently Asked Questions
--------------------------

**Q: Why does aptly look for uncompressed `Package` file and fails?**

Output from aptly looks like that:

    Downloading http://ubuntu.osuosl.org/ubuntu/dists/trusty/universe/binary-arm64/Packages.bz2...
    Downloading http://ubuntu.osuosl.org/ubuntu/dists/trusty/universe/binary-arm64/Packages.gz...
    Downloading http://ubuntu.osuosl.org/ubuntu/dists/trusty/universe/binary-arm64/Packages...
    ERROR: unable to update: HTTP code 404 while fetching http://ubuntu.osuosl.org/ubuntu/dists/trusty/universe/binary-arm64/Packages

Most probably mirror is broken or Packages files is missing completely. aptly first tries to
download compressed version of `Packages` file, then falls back to uncompressed version. If none
were found (or failed to download), aptly would display error message.

**Q: How do I mirror multi-component repository preserving components?**

Please see [multi-component publishing](/doc/feature/multi-component/).

**Q: How do I publish multi-component repository?**

Please see [multi-component publishing](/doc/feature/multi-component/).

**Q: How can I switch mirror from one HTTP URL to another?**

aptly stores package files in deduplicated way in the package pool (by default in directory `~/.aptly/pool`).
You can [create new mirror](/doc/aptly/mirror/create/) with new HTTP source URL and
[update it](/doc/aptly/mirror/update): aptly won't download any files if they're
already available in the pool.

**Q: Why does published repository miss source packages?**

When repository is first published, list of architectures is stored in the database
and can't be changed. By default aptly would guess list of architectures from the
contents of the snapshot or local repository being published. If it doesn't contain
source packages at the moment of publishing, aptly would never publish them even
when repository is updated or snapshots is switched. In order to include source
packages, specify explicit list of architectures when publishing:

    $ aptly publish snapshot -architectures=md5,source my-snapshot-1

**Q: How do I add packages with different components to local repository?**

Please see [multi-component publishing](/doc/feature/multi-component/).

**Q: How to automate entering GPG key passphrase with aptly?**

If you publish packages from some kind of automation tool (e.g. from continuous integration
service), it is not possible to enter passphrase manually. There are two possible workarounds,
both of them compromise on security: create key without passphrase or pass passphrase via
aptly flags when publishing.

*Key without passphrase*. To create such key,
create `gpg` batch file `foo` with following content:

    %echo Generating a default key
    Key-Type: default
    Subkey-Type: default
    Name-Real: Joe Tester
    Name-Comment: with stupid passphrase
    Name-Email: joe@foo.bar
    Expire-Date: 0
    %pubring foo.pub
    %secring foo.sec
    # Do a commit here, so that we can later print "done" :-)
    %commit
    %echo done

And run `gpg`:

    $ gpg --batch --gen-key foo

More information could be found in [GnuPG manual](https://www.gnupg.org/documentation/manuals/gnupg-devel/Unattended-GPG-key-generation.html).

*Passing passphrase when publishing*. Create key as usual, and add flags `-passphrase=` or
`-passphrase-file=` to aptly publishing commands. Flag values would be passed to corresponding GnuPG
flags. Contents of command line could be visible to other users on multi-user system, while contents
of the file with passphrase could be readable by other users. So use these options with caution.

**Q: Why does PXE installing of Debian fails with repository published by aptly?**

Debian installer requires `.udeb` packages, they can be mirrored from main Debian repository
with flag `-with-udebs` to [`aptly mirror create`](/doc/aptly/mirror/create) command. aptly
would sign repository with your GPG key, so you might need to modify installer to accept
your custom key.

**Q: Can I preserve Debian signing key when mirroring?**

When mirroring, snapshotting and publishing, aptly signs the resulting published repository
with GPG key. As you don't own official Debian GPG key, you can't sign with it. While publishing
repository, aptly re-generates metadata files, so original signature won't work.

aptly doesn't yet support [direct mirroring](https://github.com/aptly-dev/aptly/issues/37)
(publishing original metadata files), so currently there's no way to preserve Debian signing key.

**Q: I've created snapshot `-foo` and now I can't even drop it!**

Snapshot (mirror, local repository names) could be confused with flags if they start with
dash. Please use two dashes (`--`) to separate flags from arguments:

    $ aptly snapshot rename -- -foo my-foo


**Q: Why does aptly ignore config file `/etc/aptly.conf`?**

aptly first looks for configuration file in `~/.aptly.conf`, and if no file is found, it
makes attempt to load `/etc/aptly.conf`. aptly creates configuration file in `~/.aptly.conf`
if no config file is found, so you might need to remove auto-generated `~/.aptly.conf`.

**Q: How do I change permissions for published repository files?**

aptly creates files with permission `0666` and directories with permission `0777`, permissions
are affected by user's [umask](http://en.wikipedia.org/wiki/Umask) setting. With default umask
of `0022`, files created would have permissions `-rw-r--r--` and dirs would be `drwxr-xr-x`.
So change umask before running `aptly publish` in order to set final permissions as you need.

**Q: Why does apt-get fail to download packages published to S3 with `+` in filenames?**

This is a result of somewhat non-standard behavior of Amazon S3 API related to encoding
of `+` character. This has been fixed in `apt` version 0.9.9.1. If you have older version
of `apt`, you can enable workaround in aptly with option [`plusWorkaround`](/doc/feature/s3/).

**Q: How do I secure API access to aptly?**

Most easy way to protect the aptly remote API is to place it behind a reverse proxy like nginx or Apache and leverage their capabilities.

*nginx* Example:

Most of this is misc. nginx and ssl setup, interesting bits are tagged with ```###```.


```
server {
	listen 80;
	server_name your.repo.org ;
	
	### rewrite all non https traffic
	location /api/ {
		rewrite ^/(.*)$ https://$server_name$request_uri permanent;
	}
	root /nowhere;
	### end of rewrite
}
server {
	server_name your.repo.org;
	ssl on;
	listen 443 ssl http2;
	ssl_certificate ...
	ssl_certificate_key ...
	ssl_protocols ...
	ssl_ciphers ...
	ssl_prefer_server_ciphers on;
	root /nowhere;
	location ~ /\.ht {
		deny all;
	}
	### protect /api with basic auth
	location /api/ {
		client_max_body_size 100M;
		auth_basic "Restricted";
		auth_basic_user_file /etc/nginx/.htpasswd.aptly;
		proxy_redirect	off;
		proxy_pass	http://localhost:8080/api/;
		proxy_redirect	http://localhost:8080/api/ /api;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $remote_addr;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_set_header Host $http_host;
		proxy_set_header Origin "";
	}
	### end of api protection
}
```

You can create a *.htpasswd* file using *htpasswd*

```
apt-get install apache2-utils -y
htpasswd -c /etc/nginx/.htpasswd.aptly repo-api
chmod o-rw /etc/nginx/.htpasswd.aptly
chown www-data: /etc/nginx/.htpasswd.aptly
```

Now you can add users without ```-c``` flag.
