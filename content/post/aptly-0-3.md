+++
date = 2014-02-10T23:20:00Z
title = "aptly 0.3"
+++

Today I've released [aptly](http://www.aptly.info/) version 0.3. It's
the first version I would recommend for production usage. Please
[download it](http://www.aptly.info/#download) or install from
[source](https://github.com/aptly-dev/aptly), [raise
issues](https://github.com/smira/aplty/issues), disscuss in
[aptly-discuss
group](https://groups.google.com/forum/#!forum/aptly-discuss), follow
[me (@smira)](https://twitter.com/smira/) to get information about
updates.

New features:

-   using [aptly serve](http://www.aptly.info/#aptly-serve) command you
    can quickly serve your published repositories over HTTP, aptly would
    even advise right settings for apt sources;
-   aptly checks signatures and verifies checksums for downloaded files
    while mirroring remote repositories, if you don't have key that was
    used to sign the mirror in your trusted GnuPG keychain, aptly would
    give some hints, [some
    hints](http://www.aptly.info/#aptly-mirror-create);
-   flat format of Debian repositories is now supported (e.g.
    [OBS](https://build.opensuse.org) creates repositories in such
    format);
-   now you can drop [mirrors](http://www.aptly.info/#aptly-mirror-drop)
    and [snapshots](http://www.aptly.info/#aptly-snapshot-drop);
-   aptly can [draw graph of
    relationships](http://www.aptly.info/#aptly-graph) between your
    mirros, snapshots and published repositories;
-   [bash
    completion](https://github.com/aptly-dev/aptly-bash-completion) is
    available for aptly, try it out, it's amazing!
-   aptly gained ability to [create empty
    snapshot](http://www.aptly.info/#aptly-snapshot-create), it could be
    useful if you'd like to extract part of repository by
    [pulling](http://www.aptly.info/#aptly-snapshot-pull) packages;
-   custom config location could be given with flag `-config`.

Nice picture (actually it's output of [aptly
graph](http://www.aptly.info/#aptly-graph) command):

<img src="/img/aptlygraph.png" class="img-responsive" alt="aptly graph output">
