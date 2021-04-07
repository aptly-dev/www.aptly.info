BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

ifeq ($(BRANCH),master)
DESTINATION = s3://www.aptly.info/
else
ifeq ($(TRAVIS_PULL_REQUEST),false)
DESTINATION = s3://www.aptly.info/
else
DESTINATION = s3://beta.aptly.info/
endif
endif

all: prepare deploy

env:
	virtualenv env
	env/bin/pip install s3cmd

prepare: env

	go install github.com/gohugoio/hugo@latest

links:
	linkchecker http://localhost:1313/

deploy:
	hugo
	[ -z "$$AWS_ACCESS_KEY_ID" ] || env/bin/s3cmd sync -c /dev/null --acl-public public/ $(DESTINATION)
