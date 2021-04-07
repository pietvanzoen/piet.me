---
slug: end-to-end-testing
title: End-to-end testing (WIP)
date: 2021-04-05
updated: 2021-04-07
tags:
  - dev
  - testing
---

---
slug: end-to-end-testing
title: End-to-end testing
date: 2021-04-05
tags:
  - dev
  - testing
---

Delivering a working software product to end users is not a trivial task and there are a lot of things that can go wrong along the way. The end user experience of your product is not just made up of the code that your team writes. It’s also 3rd party software, deployment processes, configuration, servers, operating systems, databases,  networks, caching systems, and much more. Each of these components can and have gone wrong.

End to end (e2e) testing is a powerful tool to help reduce the uncertainty of delivering and maintaining a functional product. But e2e testing has a lot of pitfalls and isn’t a silver bullet.

## What is end-to-end testing?

An end-to-end test is one that tests your whole technology stack. From the client (such as a browser), to server, to database, and back. The goal is to test all the components of your product in the same way that your end users use it, as one unified system.

The client can also be a simple http request in the case of a REST API e2e test. But for the purposes of this post I’m mostly going to talk about browser based e2e testing.

## Test regularly

Just because it was working 2 hours ago, doesn’t mean it’s working now.

## Focus your tests

E2e tests are flakey and expensive. Focus on what really matters.

## Balance with monitoring and other testing

Unit testing. Integration testing. Production monitoring.
