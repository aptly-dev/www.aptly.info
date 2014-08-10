---
date: "2014-08-08T11:17:38Z"
title: "aptly graph"
menu:
    doc:
        parent: Commands
        weight: 70
---

aptly graph
-----------

aptly generates graph showing depedencies between mirrors, snapshots and
published repositories.
 

Command graph generates graph of dependencies between snapshots and
(what mirrors were used to create each snapshots), between snapshots
(pulling, merging, etc.) and between snapshots and published
repositories (how snapshots were published). Graph is rendered to PNG
file using graphviz package.

Usage:

    $ aptly graph

Example:

<a href="/img/graphfull.png"><img src="/img/graph.png" alt="Example graph from aptly graph" class="img-responsive"></a>
 