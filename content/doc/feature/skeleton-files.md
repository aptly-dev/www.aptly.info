---
date: "2018-04-30T17:08:52T"
title: Skeleton Files
menu:
    doc:
        weight: 25
        parent: Features
---

Skeleton Files
--------------

Sometimes you want to include extra files, like appstream data, in your
repository. Luckily aptly supports skeleton files that will be included in your
repository, and `Release` files during publishing.

The `<rootDir>/skel` folder should mirror very similar to the publishing folder
for your repository. Simply put, it follows the pattern of
`<rootDir>/skel/<prefix>/dists/<distribution>/<component>`.

For example: If you are trying to publish appstream information for an
unprefixed Ubuntu bionic repo under the `main` component, you would place the
appstream data like so:
`<rootDir>/skel/dists/bionic/main/dep11/Components-amd64.yml.gz`.
