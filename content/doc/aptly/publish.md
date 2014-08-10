---
date: "2014-08-08T11:17:38Z"
title: "aptly publish"
menu:
    doc:
        parent: Commands
        weight: 40
---

aptly publish
-------------

Publish snapshot or local repo as Debian repository which could be
served by HTTP/FTP/rsync server. Repository is signed by user's key with
GnuPG. Key should be created beforehand (see section GPG Keys).
Published repository could be consumed directly by apt.

Repositories could be published to Amazon S3 service: create bucket,
[configure publishing endpoint](#s3-publishing), use endpoint when
publishing.

 

#### GPG Keys

GPG key is required to sign any published repository. Key should be
generated before publishing first repository.

Key generation, storage, backup and revocation is out of scope of this
document, there are many tutorials available, e.g. [this
one](http://fedoraproject.org/wiki/Creating_GPG_Keys).

Publiс part of the key should be exported (`gpg --export --armor`) and
imported into apt keyring on all machines that would be using published
repositories using `apt-key`.

Signing releases is highly recommended, but if you want to skip it, you
can either use `gpgDisableSign` configuration option or `--skip-signing`
flag.

