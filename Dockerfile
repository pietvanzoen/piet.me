FROM abiosoft/caddy:latest

RUN adduser -S caddy
USER caddy

COPY Caddyfile /etc/Caddyfile
COPY ./build /srv

ENV PORT 8080
HEALTHCHECK --interval=5m --timeout=3s CMD wget -qO- 0.0.0.0:${PORT}/healthcheck/index.html || exit 1
