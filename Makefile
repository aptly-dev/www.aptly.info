links:
	linkchecker http://localhost:1313/

push:
	git subtree push --prefix=public git@github.com:aptly-dev/aptly-dev.github.io.git master

deploy:
	hugo
	boto-rsync -g public-read public/ s3://www.aptly.info/

deploy-beta:
	hugo
	boto-rsync -g public-read  public/ s3://beta.aptly.info/
