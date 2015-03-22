---
date: "2015-03-16T11:17:38Z"
title: "aptly repo include"
tags:
    - command
menu:
    doc:
        parent: aptly repo
        weight: 25
---

aptly repo include
------------------

Command allows automatic processing of `.changes` file controlling
package upload to local repositories.

Usage:

    $  aptly repo include <file.changes>|<directory> ...

Flags:

-   `-accept-unsigned=false`: accept unsigned .changes files
-   `-force-replace=false`: when adding package that conflicts with existing package,
    remove existing package
-   `-ignore-signatures=false`: disable verification of .changes file signature
-   `-keyring=`: gpg keyring to use when verifying .changes file (could be specified multiple times)
-   `-no-remove-files=false`: don't remove files that have been imported successfully into repository
-   `-repo="{{.Distribution}}"`: which repo should files go to, defaults to Distribution field of .changes file
-   `-uploaders-file=""`: path to uploaders.json file

This command allows to implement package upload forkflow using Debian tools:
`dpkg-genchanges`, `dput`, etc. Set of Debian package files is uploaded together
with `.changes` file signed by developer and describing changeset.
aptly would verify signature, package integrity and using optional
rules supplied would add package to local repositories.

List of steps:

1. aptly does recursive search for `.changes` files in paths given as program
   arguments
2. for every `.changes` file discovered:
3. `.changes` file is copied to temporary directory
4. signature presence is checked, if signature is missing `.changes` file is
   rejected (unless `-accept-unsigned` flag is used)
5. signature is verified, GPG key IDs used to sign file are remembered, if
   file fails signature verification step, it is rejected (unless
   `-ignore-signatures` flag is given)
6. package files referenced in `.changes` file are copied to temporary directory
   and checksums are verified, if checksums don't match `.changes` file is rejected
7. aptly figures out local repository name based on `-repo` flag and `.changes` file
   fields (see below for details)
8. every package file is checked so that it matches fields `Architecture`, `Source`
   and `Binary`
9. if local repository has `-uploaders-file` attached, it would be used, otherwise
   value of `-uploaders-file` flag would be used; if no `-uploaders-file` has been given,
   it is assumed that anyone can upload any package
10. `.changes` file fields and GPG key IDs are matched agains rules in `-uploaders-file`
11. package files are added to local repository
12. continue to next `.changes` file


aptly won't complain if package is added to the repo which is complete
duplicate. However it is forbidden to have two packages in one repo with identical
triples (architecture, name, version) that have different metadata or
files (see [Duplicate packages](/doc/feature/duplicate) for details).
If you need to replace package that conflicts with existing, use flag
`-force-replace`.
All files added to package pool would be deduplicated, as it
happens with files coming from mirrors, so exactly one copy of each file
would be stored in aptly pool.

Flag `-no-remove-files` reverts default behaviour to remove all package files sucessfully
imported.

Example:

    $ aptly repo include incoming/
    gpgv: Signature made Sun Mar 15 20:36:44 2015 MSK using DSA key ID 16DB3E6D
    gpgv: Good signature from "Aptly Tester (don't use it) <test@aptly.info>"
    Loading repository unstable for changes file hardlink_0.2.1_amd64.changes...
    [+] hardlink_0.2.1_source added
    [+] hardlink_0.2.1_amd64 added


### Repo name

For each `.changes` file local repository name is calculated based on value of `-repo` flag
and `.changes` file fields. aptly is using [Go template syntax](http://godoc.org/text/template)
for value of `-repo` flag.

By default `-repo` flag has value `{{.Distribution}}` which means that packages would be
uploaded to local repository matching value of `Distribution` field in `.changes` file.
If raw value (e.g. `-repo=mysoft`) is given, it would be used for any `.changes` file.

Values of all `.changes` file fields are exposed to the template as `{{.Field}}` replacements.
Templates are powerful, e.g. `local-{{.Distribution}}` would be expanded to `local-` concatenated
with `Distribution:` field value. `{{if eq .Source foo}}mysoftware{{else}}foreignsoftware{{end}}`
would choose repo name based on test `Source: == "foo"`.

### Uploaders.json

Uploaders configuration allows to restrict who can upload packages (based on GPG key IDs). Uploaders
file is JSON-based (it allows inline comments and relaxed comma placement):


    {
        "groups": {
            "admins": ["1B2AFA1C"]
            // admins can do whatever developers can do
            "developers": ["21DBB89C16DB3E6D", "37E1C17570096AD1", "admins"],
        },
        "rules": [
            // don't let anyone upload these packages
            { "condition": "Source (dangerous) | Source (kernel)",
              "deny": ["*"],
            },
            // admins and our CTO can upload to stable
            { "condition": "Distribution (stable)",
              "allow": ["admins", "CEA4B22E"]
            },
            // everybody else is denied upload
            { "condition": "Distribution (stable)",
              "deny": ["*"]
            },
            // hardlink is our favourite package!
            { "condition": "Source (hardlink)",
              "allow": ["developers", "admins"],
            },
            // arm64 is open to anyone
            {
              "condition": "Architecture (% *arm64*)",
              "allow": ["*"],
            }
        ]
    }

Uploaders file consists of two parts: groups definition and rules. Groups are optional, but they could
be used to place list of GPG key IDs to be used in rules. Groups may reference other groups, group name
would be expanded to list of GPG key IDs when found in rules.

GPG keys could be given in short or long format. GPG signature verification produces always long key IDs,
but short keys would match against them. It is recommended long key IDs due to risk of collisions.
Special value `*` matches against any key.

Rules are evaluated like firewall from first item to last. If no rules match `.changes` file, upload
is denied. Each rule consists of three parts: condition, allow/deny (or both) lists. Condition is using
[package query](/doc/feature/query) syntax, but it matches agains `.changes` file fields. If condition
part of the rule matches `.changes` file, search stops and rule is processed:

 * if any of keys which have been used to sign `.changes` file match `deny` list, upload would be rejected
 * if any of keys which have been used to sign `.changes` file match `allow` list, upload would be accepted

