---
date: "2014-08-08T11:17:38Z"
title: "aptly task run"
tags:
    - command
menu:
    doc:
        parent: aptly task
        weight: 10
---

aptly task run
--------------

<div class="alert alert-warning alert-note"><strong>Warning:</strong>
This command is experimental.</div>

Command runs an aptly task, namely a sequence of atomic aptly commands within a single thread.

The commands are run sequentially. If one returns an error, the remaining commands in the queue will not run.

Usage:

    $  aptly task run <command1>, <command2>, ...

or:

    $  aptly task run
       > <command1>
       > <command2>
       > ...
       >

or:

    $ aptly task -filename="filename.txt"

The user can choose between three different ways to run an aptly task:

1. If multiple args are passed, aptly task run assumes it's a sequence of aptly commands separated by a comma `,`
1. If no args are passed, then aptly task run assumes the use wants to input the commands manually falling into a kind of shell, where the user can type one command per line leaving a blank one when finished.
1. If the `-filename="filename.txt"` flag is set, `aptly task run` will run the commands contained in the text file. The commands must be written on separate lines.

Example:

    $ aptly task run repo create local, repo add local jenkins_1.575_all.deb, snapshot create snap1 from repo local, snapshot verify -architectures=amd64 snap1, publish snapshot -distribution=main -architectures=amd64 snap1, serve
    1) [Running]: repo create local

    Begin command output: ----------------------------


    Local repo [local] successfully added.
    You can run 'aptly repo add local ...' to add packages to repository.

    End command output: ------------------------------

    2) [Running]: repo add local jenkins_1.575_all.deb

    Begin command output: ----------------------------

    Loading packages...
    [+] jenkins_1.575_all added

    End command output: ------------------------------

    3) [Running]: snapshot create snap1 from repo local

    Begin command output: ----------------------------


    Snapshot snap1 successfully created.
    You can run 'aptly publish snapshot snap1' to publish snapshot as Debian repository.

    End command output: ------------------------------

    4) [Running]: snapshot verify -architectures=amd64 snap1

    Begin command output: ----------------------------

    Loading packages...
    Verifying...
    Missing dependencies (5):
      adduser [amd64]
      daemon [amd64]
      default-jre-headless [amd64]
      java-runtime-headless [amd64]
      psmisc [amd64]

    End command output: ------------------------------

    5) [Running]: publish snapshot -distribution=main -architectures=amd64 snap1

    Begin command output: ----------------------------

    Loading packages...
    Generating metadata files and linking package files...
    Signing file 'Release' with gpg, please enter your passphrase when prompted:
    Clearsigning file 'Release' with gpg, please enter your passphrase when prompted:

    Snapshot snap1 has been successfully published.
    Please setup your webserver to serve directory '/home/vagrant/.aptly/public' with autoindexing.
    Now you can add following line to apt sources:
      deb http://your-server/ main main
    Don't forget to add your GPG key to apt with apt-key.

    You can also use `aptly serve` to publish your repositories over HTTP quickly.

    End command output: ------------------------------

    6) [Running]: serve

    Begin command output: ----------------------------

    Serving published repositories, recommended apt sources list:

    # ./main [amd64] publishes {main: [snap1]: Snapshot from local repo [local]}
    deb http://precise64.localdomain:8080/ main main

    Starting web server at: :8080 (press Ctrl+C to quit)... 
