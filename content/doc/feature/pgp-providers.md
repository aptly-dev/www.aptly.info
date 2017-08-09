---
date: "2017-08-09T11:17:38Z"
title: PGP Providers
menu:
    doc:
        weight: 41
        parent: Features
---


PGP Providers  {{< version "1.1.0" >}}
-------------

Before version 1.1.0, aptly was using `gpg` to validate signatures and sign published repositories.
In version {{< version "1.1.0" >}}, support for pluggable validation/signing providers is added.
Previous implementation which does external calls to `gpg` is still the default one, but new
provider based on [Go native OpenPGP implementation](https://github.com/golang/crypto/tree/master/openpgp) was added to aptly. With any PGP provider, aptly is using same keyrings both for signing and signature validation,
so providers can be easily switched. Signing/validation options apply the same way for both provider
implementations.

Comparing external `gpg` provider and `internal` OpenPGP implementation:

* `internal` implementation doesn't require `gpg` to be installed (but `gpg` is still required to manage
keyrings)
* `internal` implementation has better handling for batch operations (passing passphrase using command-line arguments)
* `gpg` provides additional measures to lock sensitive information in memory
* `gpg` has more features, support for external authentication methods and so on
* `internal` implementation opens keyring only once, so it asks for passphrase once per aptly
run, not every time file is signed (which is the case for `gpg` provider)
* `gpg` implementation might have issue with GnuPG 2.1 (it works fine with 1.x version)
* `internal` implementation only supports "classic" format of keyrings

PGP provider could be configured via [flags](/doc/aptly/flags) (`-gpg-provider=[gpg|internal]`) or via `gpgProvider` [configuration setting](/doc/configuration).
