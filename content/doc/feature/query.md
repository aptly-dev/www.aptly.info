---
date: "2014-08-08T11:17:38Z"
title: Package Queries
menu:
    doc:
        weight: 10
        parent: Features
---

Package Queries
---------------

Some commands accept package queries to identify list of packages to
process. Package query syntax almost matches `reprepro` query language.
Query consists of the following simple terms:

-   **direct package reference**: reference to exactly one package.
    Format is identical to the way aptly lists packages in show commands
    with `-with-packages` flag: `name_version_arch`, e.g.:
    `libmysqlclient18_5.5.35-rel33.0-611.squeeze_amd64`
-   **dependency condition**: syntax follows Debian dependency
    specification: `package_name` followed by optional version
    specification and architecture limit, e.g: `mysql-client (>= 3.6)`.
-   **query against package fields**: syntax is the same as for dependency
    conditions, but instead of package name field name is used, e.g:
    `Priority (optional)`.

Supported fields:

-   all field names from Debian package control files are supported
    except for `Filename`, `MD5sum`, `SHA1`, `SHA256`, `Size`, `Files`,
    `Checksums-SHA1`, `Checksums-SHA256`.
-   `$Source` is a name of source package (for binary packages)
-   `$SourceVersion` is a version of source package
-   `$Architecture` is `Architecture` for binary packages and `source`
    for source packages, when matching with equal (`=`) operator,
    package with `any` architecture matches all architectures but
    `source`.
-   `$Version` has the same value as `Version`, but comparison operators
    use Debian version precedence rules
-   `$PackageType` is `deb` for binary packages, `udeb` for .udeb packages
    and `source` for source packages

Operators:

-   `=`: strict match, default operator is no operator is given
-   `>=`, `<=`, `=`, `>>` (strictly greater), `<<` (strictly less):
    lexicographical comparison for all fields and special rules when
    comparing package versions
-   `%`: pattern matching, like shell patterns, supported special
    symbols are: `[^]?*`, e.g.: `$Version (% 3.5-*)`
-   `~`: regular expression matching, e.g.: `Name (~ .*-dev)`

Simple terms could be combined into more complex queries using operators
`,` (and), `|` (or) and `!` (not), parentheses `()` are used to change
operator precedence. Match value could be enclosed in single (`'`) or
double (`"`) quotes if required to resolve ambiguity, quotes inside
quoted string should escaped with slash (`\`).

Examples:

-   `mysql-client`: matches package mysql-client of any version and
    architecture (including source), also matches packages that
    `Provide:` `mysql-client`.
-   `mysql-client (>= 3.6)`: matches package mysql-client with version
    greater or equal to 3.6. Valid operators for version are: `>=`,
    `<=`, `=`, `>>` (strictly greater), `<<` (strictly less).
-   `mysql-client {i386}`: matches package `mysql-client` on
    architecture `i386`, architecture `all` matches all architectures
    but source.
-   `mysql-client (>= 3.6) {i386}`: version and architecture conditions
    combined.
-   `libmysqlclient18_5.5.35-rel33.0-611.squeeze_amd64`: direct package
    reference.
-   `$Source (nginx)`: all binary packages with `nginx` as source
    package.
-   `!Name (~ .*-dev), mail-transport, $Version (>= 3.5)`: matches all
    packages that provide `mail-transport` with name that has no suffix
    `-dev` and with version greater or equal to `3.5`.
-   `Name`: query matches all the packages (as it means "package name is not
     empty").

When specified on command line, query may have to be quoted according to
shell rules, so that it stays single argument:

    $ aptly repo import percona stable 'mysql-client (>= 3.6)'

You can use package queries filter mirrors to include only packages with limited
priorities:

    $ aptly mirror create -filter="Priority (required)" wheezy-required http://mirror.yandex.ru/debian/ wheezy main

Or download single packages and all its dependencies:

    $ aptly mirror create -filter="nginx" -filter-with-deps wheezy-required http://mirror.yandex.ru/debian/ wheezy main

Pull packages with complex conditions:

    $ aptly snapshot pull snapshot1 source snapshot2 '!Name (% *-dev), $Version (>= 3.5)'

Or remove packages based on query:

    $ aptly repo remove local-repo 'Name (% http-*) | $Source (webserver)'

Query could be tested by using family of search commands: for [mirrors](/doc/aptly/mirror/search/),
[snapshots](/doc/aptly/snapshot/search/) and [local repos](/doc/aptly/repo/search/).
