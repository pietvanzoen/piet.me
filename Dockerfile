FROM abiosoft/caddy:latest

RUN adduser -S caddy
USER caddy

COPY Caddyfile /etc/Caddyfile
COPY ./build /html
