
# Self-documenting Makefile
# https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:  ## Print this help
	@grep -E '^[a-zA-Z][a-zA-Z0-9_-]*:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

serve:   ## Run hugo server (live reload)
	hugo serve --bind 0.0.0.0

docker-image:  ## Build aptly-www docker image
	@docker build . -t aptly-www

docker-serve:  ## Run hugo server (live reload) in docker on http://localhost:1313
	@docker run -it --rm -p 1313:1313 -v ${PWD}:/work aptly-www /work/docker-wrapper serve


