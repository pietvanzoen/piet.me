---
title: "My IndieWeb tech stack"
unsplashImageId: louTBOGho8c
date: 2022-11-21
slug: stack

---

I run a single server for most of my projects. Here's the rundown of the stack and apps.

<!-- excerpt -->

## Server

* Linode VPS based in Frankfurt, DE (shameless [referral link](https://www.linode.com/lp/refer/?r=95348fe3c161d21c9b2508cd6bedda68b9580d9a) for free credit).
* Debian 9.
* Docker compose.
* [Caddy](https://caddyserver.com) via [caddy-docker-proxy](https://github.com/lucaslorentz/caddy-docker-proxy) for web server and auto-cert renewals.
* Healthcheck.io for cronjob monitoring.
* [rclone](https://rclone.org) backups to Dropbox.

## Apps

**Piet.me** ([source](https://github.com/pietvanzoen/piet.me))

* My own digital garden.
* [Eleventy](https://11ty.dev) static website.
* Build via GitHub actions and committed to `dist` branch.
* Cronjob on server pulls updates periodically.
* [Caddy file_server](https://caddyserver.com/docs/caddyfile/directives/file_server#file-server) mostly handles the rest.

**[Dolphin](https://github.com/jeffkreeftmeijer/dolphin)**

* Microblogger tool for cross posting to twitter, mastodon, and GitHub.
* Powers piet.me/updates. [Updates repo](https://github.com/pietvanzoen/updates).
* Updates pulled into piet.me repo via git submodule.

**[Plausible](https://plausible.io)**

* Privacy friendly analytics.
* Self hosted ([docs](https://plausible.io/docs/self-hosting)) via docker compose.
* Sendgrid via [smtp relay](https://hub.docker.com/r/bytemark/smtp/).

**[Miniflux](https://miniflux.app)**

* Feed reader.
* Self hosted via docker compose (example [docker-compose.yml](https://github.com/miniflux/v2/blob/main/contrib/docker-compose/basic.yml)).
