---
title: All the Ops
date: "2026-02-26"
excerpt: What it looks like when one person holds PHP, Vue, CI, E2E tests, and observability for a small product team—and why the role boundaries keep blurring.
author: Brandon Shoop
---

# All the ops

I read somewhere recently that the lines between disciplines in software development are blurring. I feel that very deeply. For the last nine months with Wethos I haven't had a single job title so much as a rotating stack of responsibilities: backend, frontend, CI/CD, test automation, security, and observability. Here's what that actually looked like in practice.

## Backend and frontend 
The app is PHP (Laravel) and Vue. I shipped features in both: API surface in PHP, UI and client state in Vue. Customer-reported bugs showed up in both layers—sometimes a bad assumption in the API, sometimes a race or a missing loading state in the frontend. Debugging meant tracing a request from the browser through the stack and into the database, then deciding whether the fix belonged in validation, in the UI, or in both. I also tracked down and fixed several performance issues: N+1 queries, missing indexes, and front-end work that could be deferred or cached. Those fixes were rarely glamorous; they were the usual suspects, but they required being able to read and change both sides of the stack.

## CI and test automation
There was no shared pipeline when I started, so I built one on GitHub Actions. That meant defining workflows for runs on push and pull request, wiring in PHP and Node so both sides of the stack could lint and test, and managing secrets and environments in a way that didn't block the rest of the team. On top of that I added two Cypress suites: a smoke suite that hits critical paths so we can catch regressions quickly, and a fuller user-acceptance-style (UAT) suite that covers more flows. Maintaining those suites meant keeping selectors and fixtures in sync with the app and deciding what belongs in smoke versus full run—tradeoffs between speed and coverage that every small team runs into.

## o11y
We didn't have a central place for application logs, so I stood up a small observability (o11y) setup: Loki for log aggregation and Grafana for querying and dashboards. Application logs are now drained there instead of living only on the host or in ad hoc tail sessions. That gave us a single place to search and correlate logs when debugging production issues, without committing to a heavier APM or vendor stack. It's minimal by design, enough to be useful, not so much that it becomes its own full-time job.

## Outro
None of this is exotic. The blurring isn't because the work is new; it's because in a small team one person often ends up owning the path from feature to pipeline to tests to logs. The disciplines are still distinct. You still need to understand PHP, Vue, YAML, Cypress, and Loki on their own terms. But the role that contains them isn't. **I've never liked staying in my lane anyway.**
