---
date: "2014-02-08T11:17:38Z"
title: "Misc API"
menu:
    doc:
        parent: API
        weight: 50
---

Graph API
---------

`GET /api/graph.:ext`

Generate graph of aptly objects (same as in [aptly graph](/doc/aptly/graph) command).

`:ext` specifies desired file extension, e.g. `.png`, `.svg`.

Example:

* open url http://localhost:8080/api/graph.svg in browser (hint: aptly database should be non-empty)

Version API
-----------

`GET /api/version`

Return current aptly version.

Example:

    $ curl http://localhost:8080/api/version
    {"Version":"0.9~dev"}