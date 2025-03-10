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
GnuPG. Key should be created beforehand (see section GPG Keys below).
Published repository could be consumed directly by apt.

Repositories could be published to Amazon S3 service: create bucket,
[configure publishing endpoint](/doc/feature/s3/) and use S3 endpoint when
publishing.


#### GPG Keys

GPG key is required to sign any published repository. Key should be
generated before publishing first repository.

Key generation, storage, backup and revocation is out of scope of this
document, there are many tutorials available, e.g. [this one](http://fedoraproject.org/wiki/Creating_GPG_Keys).

Publiс part of the key should be exported from your keyring using `gpg --export --armor` and
imported into apt keyring using `apt-key` tool on all machines that would be using published
repositories.

Signing releases is highly recommended, but if you want to skip it, you
can either use `gpgDisableSign` configuration option or `--skip-signing`
flag.

For all commands in this section which accept a `-secret-keyring=""` argument,
when the "internal" Go-native OpenPGP implementation is in use, this keyring
can be of the form `tpm://HANDLE?dev=DEVICE` to use a key stored in the
system's Trusted Platform Module. `HANDLE` should be in a form similar to
`0x81000000`, and `DEVICE` should be the URL-escaped name of a device similar
to `/dev/tpmrm0` (which happens to be the default); URL-escaped, this would be
expressed as `?dev=%2Fdev%2Ftpmrm0`.
