FROM debian:bookworm-slim

RUN apt-get update -y && apt-get install -y --no-install-recommends sudo make hugo && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -m --shell /bin/bash --home-dir /var/lib/aptly aptly

RUN mkdir /work
WORKDIR /work
RUN chown aptly /work

RUN echo "aptly ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/aptly

CMD bash
