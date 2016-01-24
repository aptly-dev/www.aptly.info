---
date: "2014-08-08T11:17:38Z"
title: "aptly serve"
menu:
    doc:
        parent: Commands
        weight: 60
---

aptly serve
-----------

aptly can serve published repositories using its own embedded webserver.
This is not recommended for production use, but is a quick way to try
out published repository. 

Command serve starts embedded HTTP server (not suitable for real
production usage) to serve contents of `public/` subdirectory of aptly's
root that contains published repositories. aptly would print recommended
`apt-sources` for the currently published repositories. By default aptly
would listen on port 8080, but this can be changed with flag `-listen`.

When `-no-lock` option is enabled, API server acquires and drops the lock
around all the operations, so that API and CLI could be used concurrently.

Usage:

    $ aptly serve -listen=:8080

Flags:

-   `-listen=":8080"`: host:port for HTTP listening
-   `-no-lock=false`: don't lock the database

Example:

    $ aptly serve -listen=127.0.0.1:8765
    Serving published repositories, recommended apt sources list:

    # ./maverick (main) [amd64, i386] publishes [snap1]: Snapshot from mirror [gnuplot-maverick]: http://ppa.launchpad.net/gladky-anton/gnuplot/ubuntu/ maverick
    deb http://127.0.0.1:8765/ maverick main
    # debian/maverick (main) [amd64, i386] publishes [snap2]: Snapshot from mirror [gnuplot-maverick]: http://ppa.launchpad.net/gladky-anton/gnuplot/ubuntu/ maverick
    deb http://127.0.0.1:8765/debian/ maverick main

    Starting web server at: 127.0.0.1:8765 (press Ctrl+C to quit)...
