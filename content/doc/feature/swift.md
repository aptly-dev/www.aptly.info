---
date: "2014-08-08T11:17:38Z"
title: Publishing to Swift
menu:
    doc:
        weight: 35
        parent: Features
---


Publishing to OpenStack Swift
-----------------------------

aptly could be configured to publish repository directly to [OpenStack Swift](http://docs.openstack.org/developer/swift/).
First, publishing endpoints should be described in aptly [configuration](/doc/configuration/) file.
Each endpoint has name and associated settings:

* `container`: container name
* `prefix`: (optional) do publishing under specified prefix in the container, defaults to
  no prefix (container root)
* `osname`, `password`: (optional) OpenStack credentials to access Keystone. If not supplied,
  environment variables `OS_USERNAME` and `OS_PASSWORD` are used.
* `tenant`, `tenantid`: (optional) OpenStack tenant name and id (in order to use v2 and v3 authentication).
* `domain`: (optional) The Openstack domain name (in order to use v3 authentication)
* `domainid`: (optional) The Openstack domain id (in order to use v3 authentication)
* `tenantdomain`: (optional) The OpenStack domain name the tenant/projects belong to (in order to use v3 authentication)
* `tenantdomainid`: (optional) The OpenStack domain id the tenant/projects belong to (in order to use v3 authentication)
* `authurl`: (optional) the full url of Keystone server (including port, and version),
  for example `http://identity.example.com:5000/v2.0`

Authentication for v1 protocol could be supplied via following environment variables:

* `ST_USER`: username
* `ST_KEY`: password
* `ST_AUTH`: authentication url (v1)

For v2 protocol environment variables are:

* `OS_USERNAME`: username
* `OS_PASSWORD`: password
* `OS_AUTH_URL`: authentication url (v2)
* `OS_TENANT_NAME`: tenant name (optional)
* `OS_TENANT_ID`: tenant ID (optional)

For v3 protocol environment variables are:

* `OS_USERNAME`: username
* `OS_PASSWORD`: password
* `OS_AUTH_URL`: authentication url (v3)
* `OS_TENANT_NAME`: tenant/project name (optional)
* `OS_TENANT_ID`: tenant/project ID (optional)
* `OS_USER_DOMAIN_NAME`: the domain name we authenticate with
* `OS_USER_DOMAIN_ID`: the domain id we authenticate with
* `OS_PROJECT_DOMAIN`: the domain name the project/tenant is located
* `OS_PROJECT_DOMAIN_ID`: the domain id the project/tenant is located

In order to publish to Swift, specify endpoint as `swift:endpoint-name:` before
publishing prefix on the command line, e.g.:

    $ aptly publish snapshot jessie-main swift:test:
