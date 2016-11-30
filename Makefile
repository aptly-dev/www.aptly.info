all: prepare deploy

env:
	virtualenv env
	env/bin/pip install boto_rsync

prepare: env
	go get -u -v github.com/spf13/hugo

links:
	linkchecker http://localhost:1313/

deploy:
	hugo
	. env/bin/activate && BOTO_CONFIG=./boto.config boto-rsync -g public-read public/ s3://www.aptly.info/

deploy-beta:
	hugo
	boto-rsync -g public-read  public/ s3://beta.aptly.info/
