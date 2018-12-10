FROM abiosoft/caddy:latest

RUN adduser -S caddy
RUN mkdir /site && chown -R caddy /site
USER caddy

COPY Caddyfile /etc/Caddyfile

ENV PORT 8080
ENV BRANCH dist
HEALTHCHECK --interval=5m --timeout=3s CMD wget -qO- 0.0.0.0:${PORT}/healthcheck/index.html || exit 1
