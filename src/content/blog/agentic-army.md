---
title: My Robot Army
excerpt: A practical breakdown of the automation tooling I'm using on a current project, and what's actually working.
author: Brandon Shoop
date: "2026-01-23"
---

![Map](/assets/robot-army.png)

<p class="photo-credit">ChatGPT (GPT 4.x) with the prompt: "and now draw a friendly robot army."</p>

# My Robot Army

I've been pushing deeper into automation tooling on a current engagement. It's been useful to see what actually works when you string together a bunch of automated helpers. Not everything is perfect, as some tools require more babysitting than others, but the overall setup has been productive.

Here's what I'm running for Wethos:

## GitHub Workflows

Three separate workflows handle dev, stage, and production deployments. Each one runs contextually relevent combinations of: builds, tests, tags releases, deploys, and kicks off UAT. The workflows themselves are straightforward YAML, but having them wired up means I can deploy with a button click instead of manually running commands and checking outputs. The main tradeoff is that when something breaks, you're debugging YAML and action logs instead of just running commands locally. Still worth it for the consistency.

## Dependabot

Dependabot opens pull requests for dependency updates. It also flags security vulnerabilities and creates PRs to patch them. The security alerts are particularly useful since they catch things I'd otherwise miss during regular updates. The downside is PR noise. I've had weeks where Dependabot opened a dozen PRs, and reviewing them all takes time. I've started being more selective about which ones I merge immediately versus batching them.

## Cursor Commands

I've set up a few custom commands in Cursor that handle different parts of the workflow:

**`plan`** - Takes a product description and generates a proof-of-concept implementation plan. This is basically me describing what I want built, and Cursor breaking it down into steps with file structure and key functions. It's not perfect. I still need to review and adjust but it saves me from starting with a blank page.

**`summarize`** - Generates technical notes from the current diff for peer review. Useful when I need to explain changes to someone else or just document what I did for future me.

**`summarize > marketing`** - Converts technical release notes into marketing-friendly copy. This one is hit-or-miss. Sometimes it nails the tone; sometimes it needs heavy editing. I use it more as a starting point than a final product.

**`review`** - Does a peer code review of the current changes. It catches obvious issues, suggests improvements, and flags potential bugs. It's not a replacement for human review, but it's good at catching things I miss when I'm deep in the weeds.

**`secure`** - Runs a security audit of the current codebase. It looks for common vulnerabilities, insecure patterns, and potential exploits. Like the review command, it's a helpful first pass, but I still do manual security reviews for anything sensitive.

## What's Working

The GitHub workflows are a solid, well developed tool. Once configured, they run reliably and catch deployment issues early. Dependabot's security alerts have caught a few things I would have missed. The Cursor commands are useful for scaffolding and first-pass reviews, but they require human oversight.

## What's Not

The Cursor commands sometimes miss context or make assumptions that don't hold. The marketing summarization is inconsistent. And Dependabot can create a lot of PR churn if you're not careful about configuration.

Overall, the setup reduces manual work and catches issues I'd otherwise miss. It's not fully autonomous—I'm still reviewing, adjusting, and making decisions—but it's a useful multiplier for the parts of development that are repetitive or easy to miss.

## What's Future Facing

I'd been toying with deeper automation behind both technical and product marketing release notes. That needs more work (because it's flaky) and lives here: https://github.com/AGLFlorida/summarizer

### Relevant context

The prompt commands I use can be found here: https://github.com/1shooperman/cursor-template/tree/main/.cursor/commands