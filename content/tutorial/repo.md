+++
date = 2014-10-10T23:30:00Z
title = "Managing repositories of your packages"
description = "How to manage repository of your own software with aptly itself as an example, includes S3 publishing."
+++

Managing repositories of your packages
--------------------------------------

<p class="lead">Goal: create repository with your own software as .deb packages,
publish it to Amazon S3, handle updates.</p>

In this tutorial I would describe how do I manage *aptly* releases in repo.aptly.info repository using *aptly* itself.

### Adding packages and creating snapshots

First, I create local repository that would hold all released versions of aptly:

<pre class="code">
$ aptly repo create -distribution=squeeze -component=main aptly-release

Local repo [aptly-release] successfully added.
You can run 'aptly repo add aptly-release ...' to add packages to repository.
</pre>

While creating repository I've specified distribution and component names, that would be used
when I publish packages from this repository.

As new versions of aptly are released, I add new `.deb` packages by simply pointing aptly
to the directory with files:

<pre class="code">
$ aptly repo add aptly-release debs
Loading packages...
[+] aptly_0.8_amd64 added
[+] aptly_0.8_i386 added
</pre>

The repository holds all versions of aptly released so far:

<pre class="code">
$ aptly repo show -with-packages aptly-release
Name: aptly-release
Comment:
Default Distribution: squeeze
Default Component: main
Number of packages: 14
Packages:
  aptly_0.4.1_amd64
  aptly_0.5_amd64
  aptly_0.5.1_amd64
  aptly_0.6_amd64
  aptly_0.7_amd64
  aptly_0.7.1_amd64
  aptly_0.8_amd64
  aptly_0.4.1_i386
  aptly_0.5_i386
  aptly_0.5.1_i386
  aptly_0.6_i386
  aptly_0.7_i386
  aptly_0.7.1_i386
  aptly_0.8_i386
</pre>

After each major release, I create snapshot of local repository, so that I can "get back in time" to old
state of repository:

<pre class="code">
$ aptly snapshot create aptly-0.8 from repo aptly-release

Snapshot aptly-0.8 successfully created.
You can run 'aptly publish snapshot aptly-0.8' to publish snapshot as Debian repository.

$ aptly snapshot list
List of snapshots:
 * [aptly-0.4.1]: Snapshot from local repo [aptly-release]
 * [aptly-0.5]: Snapshot from local repo [aptly-release]
 * [aptly-0.5.1]: Snapshot from local repo [aptly-release]
 * [aptly-0.6]: Snapshot from local repo [aptly-release]
 * [aptly-0.7]: Snapshot from local repo [aptly-release]
 * [aptly-0.7.1]: Snapshot from local repo [aptly-release]
 * [aptly-0.8]: Snapshot from local repo [aptly-release]

To get more information about snapshot, run `aptly snapshot show <name>`.
</pre>

### Publishing to Amazon S3

I've chosen to Amazon S3 to host aptly package repository, as it is the easiest way to get reliable HTTP
hosting for static files.

First, I've created S3 bucket `repo.aptly.info` (name should match future domain name) using Amazon console, and
enabled website hosting. To the root of the bucket I've uploaded manually file `index.html` with
some [introductory notes](http://repo.aptly.info/).

Next, for security reasons it's best to create separate user via Amazon IAM console that would do uploads
from aptly to S3. Save security credentials for the user into handy bash script `.aws.sh`:

    export AWS_SECRET_ACCESS_KEY="XXXXXXXXXXXXXXXXXXX"
    export AWS_ACCESS_KEY_ID="YYYYYYYYYYYYYYYYYYYY"

And source this script in before performing any S3 operations from aptly:

<pre class="code">
$ . .aws.sh
</pre>

For the user created, apply custom security policy:

    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "Stmt1405592139000",
          "Effect": "Allow",
          "Action": [
            "s3:DeleteObject",
            "s3:GetObject",
            "s3:ListBucket",
            "s3:PutObject",
            "s3:PutObjectAcl"
          ],
          "Resource": [
            "arn:aws:s3:::repo.aptly.info/*", "arn:aws:s3:::repo.aptly.info"
          ]
        }
      ]
    }

You would need to change `repo.aptly.info` to the name of your S3 bucket. This policy allows limited
number of operations only on one bucket, which should be pretty safe.

Final piece: setup your DNS name to point to S3, more information in [Amazon S3 docs](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html).

So the only thing left is to setup aptly to use that S3 bucket for publishing. I edit `~/.aptly.conf`:

    {
       "architectures":[],
       ....
       "S3PublishEndpoints":{
          "repo.aptly.info":{
             "region":"us-east-1",
             "bucket":"repo.aptly.info",
             "acl":"public-read"
          }
       }
    }

In `S3PublishEndpoints` section I add new entry `repo.aptly.info` with bucket name, region (you choose region when creating the bucket) and `public-read` acl. By default aptly publishes files with `private` acl which doesn't work for me, as I'm
creating public repo.

So now I can publish to S3 with aptly. I'm publishing latest snapshot, `aptly-0.8`. I could have published repository `aptly-release` directly, but doing via snapshot gives more flexibility: I can rollback to previous snapshot if things go wrong
for any reason.

<pre class="code">
$ aptly publish snapshot aptly-0.8 s3:repo.aptly.info:
...
</pre>

aptly would upload package files to my S3 bucket, generate index files, do signing and so on. In the end `repo.aptly.info`
holds complete Debian repository structure, and I can use it in apt sources:

    deb http://repo.aptly.info/ squeeze main

When next of aptly would be released, I would add new package to `aptly-release` local repo, create snapshot `aptly-0.9` and
switch S3 published repository to new version with following command:

<pre class="code">
$ aptly publish switch squeeze s3:repo.aptly.info: aptly-0.9
...
</pre>

Published repositories are referenced by distribution name (`squeeze` in our case, taken from local repo defaults) and
prefix which includes storage engine (`s3:repo.aptly.info:`).