---
date: "2014-02-08T11:17:38Z"
title: "Misc API"
menu:
    doc:
        parent: API
        weight: 50
---

Graph API
---------

`GET /api/graph.:ext`

Generate graph of aptly objects (same as in [aptly graph](/doc/aptly/graph) command).

`:ext` specifies desired file extension, e.g. `.png`, `.svg`.

Query params:

 Name                      | Description
---------------------------|-------------------------------
 `layout`                  | Change between a `horizontal` (default) and a `vertical` graph layout.

Example:

* open url http://localhost:8080/api/graph.svg?layout=vertical in browser (hint: aptly database should be non-empty)


Version API
-----------

`GET /api/version`

Return current aptly version.

Example:

    $ curl http://localhost:8080/api/version
    {"Version":"0.9~dev"}

Ready API
-----------

`GET /api/ready`

Return current readiness status of Aptly.

Example:

    $ curl http://localhost:8080/api/ready
    {"Status": "Aptly is ready"}

Healthy API
-----------

`GET /api/healthy`

Return current healthiness status of Aptly.

Example:

    $ curl http://localhost:8080/api/healthy
    {"Status": "Aptly is healthy"}

Metrics
-------

`GET /api/metrics`

Disabled by default. Can be switched on by setting `"enableMetricsEndpoint": true` in the config file.

Returns aptly metrics in Prometheus format.

Provides the following metrics alongside the standard go metrics already provided by the [Prometheus go client library](https://pkg.go.dev/github.com/prometheus/client_golang/prometheus/promhttp):

 Name                                      | Description
-------------------------------------------|-------------------------------
 `aptly_api_http_request_duration_seconds` | Duration of api requests in seconds
 `aptly_api_http_request_size_bytes`       | Api HTTP request size in bytes
 `aptly_api_http_requests_in_flight`       | Number of concurrent HTTP api requests currently handled
 `aptly_api_http_requests_total`           | Total number of api requests
 `aptly_api_http_response_size_bytes`      | Api HTTP response size in bytes
 `aptly_build_info`                        | Versions of aptly and go

Example (standard go metrics omitted):

    $ curl http://localhost:8080/api/metrics
    # HELP aptly_api_http_request_duration_seconds Duration of api requests in seconds.
    # TYPE aptly_api_http_request_duration_seconds summary
    aptly_api_http_request_duration_seconds_sum{code="200",method="GET",path="/api/files"} 0.0011117079999999999
    aptly_api_http_request_duration_seconds_count{code="200",method="GET",path="/api/files"} 2
    aptly_api_http_request_duration_seconds_sum{code="200",method="GET",path="/api/repos"} 0.07773475
    aptly_api_http_request_duration_seconds_count{code="200",method="GET",path="/api/repos"} 2
    aptly_api_http_request_duration_seconds_sum{code="200",method="GET",path="/api/version"} 0.000177125
    aptly_api_http_request_duration_seconds_count{code="200",method="GET",path="/api/version"} 1
    aptly_api_http_request_duration_seconds_sum{code="200",method="POST",path="/api/files"} 0.00064675
    aptly_api_http_request_duration_seconds_count{code="200",method="POST",path="/api/files"} 1
    aptly_api_http_request_duration_seconds_sum{code="400",method="POST",path="/api/files"} 0.000128833
    aptly_api_http_request_duration_seconds_count{code="400",method="POST",path="/api/files"} 1
    
    # HELP aptly_api_http_request_size_bytes Api HTTP request size in bytes.
    # TYPE aptly_api_http_request_size_bytes summary
    aptly_api_http_request_size_bytes_sum{code="200",method="GET",path="/api/files"} 0
    aptly_api_http_request_size_bytes_count{code="200",method="GET",path="/api/files"} 2
    aptly_api_http_request_size_bytes_sum{code="200",method="GET",path="/api/repos"} 0
    aptly_api_http_request_size_bytes_count{code="200",method="GET",path="/api/repos"} 2
    aptly_api_http_request_size_bytes_sum{code="200",method="GET",path="/api/version"} 0
    aptly_api_http_request_size_bytes_count{code="200",method="GET",path="/api/version"} 1
    aptly_api_http_request_size_bytes_sum{code="200",method="POST",path="/api/files"} 3325
    aptly_api_http_request_size_bytes_count{code="200",method="POST",path="/api/files"} 1
    aptly_api_http_request_size_bytes_sum{code="400",method="POST",path="/api/files"} 0
    aptly_api_http_request_size_bytes_count{code="400",method="POST",path="/api/files"} 1
    
    # HELP aptly_api_http_requests_in_flight Number of concurrent HTTP api requests currently handled.
    # TYPE aptly_api_http_requests_in_flight gauge
    aptly_api_http_requests_in_flight{method="GET",path="/api/files"} 0
    aptly_api_http_requests_in_flight{method="GET",path="/api/metrics"} 1
    aptly_api_http_requests_in_flight{method="GET",path="/api/repos"} 0
    aptly_api_http_requests_in_flight{method="GET",path="/api/version"} 0
    aptly_api_http_requests_in_flight{method="POST",path="/api/files"} 0
    
    # HELP aptly_api_http_requests_total Total number of api requests.
    # TYPE aptly_api_http_requests_total counter
    aptly_api_http_requests_total{code="200",method="GET",path="/api/files"} 2
    aptly_api_http_requests_total{code="200",method="GET",path="/api/repos"} 2
    aptly_api_http_requests_total{code="200",method="GET",path="/api/version"} 1
    aptly_api_http_requests_total{code="200",method="POST",path="/api/files"} 1
    aptly_api_http_requests_total{code="400",method="POST",path="/api/files"} 1
    
    # HELP aptly_api_http_response_size_bytes Api HTTP response size in bytes.
    # TYPE aptly_api_http_response_size_bytes summary
    aptly_api_http_response_size_bytes_sum{code="200",method="GET",path="/api/files"} 74
    aptly_api_http_response_size_bytes_count{code="200",method="GET",path="/api/files"} 2
    aptly_api_http_response_size_bytes_sum{code="200",method="GET",path="/api/repos"} 188
    aptly_api_http_response_size_bytes_count{code="200",method="GET",path="/api/repos"} 2
    aptly_api_http_response_size_bytes_sum{code="200",method="GET",path="/api/version"} 21
    aptly_api_http_response_size_bytes_count{code="200",method="GET",path="/api/version"} 1
    aptly_api_http_response_size_bytes_sum{code="200",method="POST",path="/api/files"} 51
    aptly_api_http_response_size_bytes_count{code="200",method="POST",path="/api/files"} 1
    aptly_api_http_response_size_bytes_sum{code="400",method="POST",path="/api/files"} 0
    aptly_api_http_response_size_bytes_count{code="400",method="POST",path="/api/files"} 1

    # HELP aptly_build_info Metric with a constant '1' value labeled by version and goversion from which aptly was built.
    # TYPE aptly_build_info gauge
    aptly_build_info{goversion="go1.19.3",version="0.0.0"} 1

    # HELP promhttp_metric_handler_requests_in_flight Current number of scrapes being served.
    # TYPE promhttp_metric_handler_requests_in_flight gauge
    promhttp_metric_handler_requests_in_flight 1
    
    # HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
    # TYPE promhttp_metric_handler_requests_total counter
    promhttp_metric_handler_requests_total{code="200"} 0
    promhttp_metric_handler_requests_total{code="500"} 0
    promhttp_metric_handler_requests_total{code="503"} 0
