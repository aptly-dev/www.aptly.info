---
date: "2015-07-07T11:17:38Z"
title: Package Display Format
menu:
    doc:
        weight: 50
        parent: Features
---

Package Display Format
----------------------

Some aptly commands ([aptly mirror search](/doc/aptly/mirror/search),
[aptly package search](/doc/aptly/package/search), [aptly repo search](/doc/aptly/repo/search),
[aptly snapshot search](/doc/aptly/snapshot/search)) support `-format` flag
which allows to modify how search results are printed. Golang templates are used to specify
display format, with all package stanza fields available to template. In addition to package stanza
fields aptly provides additional:

 * `Key`:
   internal aptly package ID, unique for all packages in aptly
   (combination of `ShortKey` and `FilesHash`).

 * `FilesHash`:
   hash that includes MD5 of all packages files.

 * `ShortKey`:
   package ID, which is unique in single list (mirror, repo, snapshot, ...), but not unique
   in whole aptly package collection.

To access any field, use `{{.Field}}`, every other character would be passed to output as is.

For example, default aptly display format could be implemented with the following template:

    {{.Package}}_{{.Version}}_{{.Architecture}}

To display package name with dependencies:

    {{.Package}} || {{.Depends}}

This might produce following output:

    libyaml-libyaml-perl || perl (>= 5.14.2-21+deb7u1), perlapi-5.14.2, libc6 (>= 2.3.4)
    liberubis-ruby1.9.1 || ruby-erubis
    ...

For example:

    $ aptly package search -format="{{.Package}} (version {{.Version}})" 'Name (~ ^lib.*)'
    libbluray-doc (version 1:0.2.2-1)
    libglobus-gsi-callback-doc (version 4.2-1)
    libtimedate-perl (version 1.2000-1)
    libwebauth6 (version 4.1.1-2)
    ...

More information on Golang template syntax: http://godoc.org/text/template
