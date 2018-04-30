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

Aptly at this time only supports GNUPG 1.x for server-side use.
On newer Debian systems you'll want to make sure that the `gnupg1` and `gpgv1` packages are installed.
Please note that GNUPG 1 and 2 maintain different keyrings, in order for keys to
be available to Aptly they need to be in the GNUPG 1 keyring.

Since version {{< version "1.1.0" >}}, Aptly supports pluggable validation/signing providers.
The original `gpg` provider calls the actual gpg binary as a subprocess.
The newer `internal` provider relies on a [Go native OpenPGP implementation](https://github.com/golang/crypto/tree/master/openpgp).
With any PGP provider, aptly is using same keyrings both for signing and signature validation,
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
