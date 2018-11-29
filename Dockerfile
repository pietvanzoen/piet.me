FROM abiosoft/caddy:latest

RUN adduser -S caddy
USER caddy

COPY Caddyfile /etc/Caddyfile
COPY ./build /html

ENV SITE_ADDRESS 0.0.0.0:8080
