---
title: "Critic: an LLM devil's advocate over HTTP and MCP"
date: "2026-03-10"
excerpt: >-
  A small service that runs sequential prompt chains to produce multi-stage
  critical analysis of claims and plans. Single prompt sets or pipelines, Docker
  and MCP-ready.
author: Brandon Shoop
---

Critic is an HTTP and MCP (Model Context Protocol) server that runs LLM prompt chains sequentially. Each step's output is fed as context into the next. The result is multi-stage critical analysis of a claim or plan--either from a single named prompt set or from an ordered pipeline of several sets with outputs wired between stages. It's built to run in Docker. The repo is [1shooperman/critic](https://github.com/1shooperman/critic).

## How it runs

Two execution modes:

**Prompt set** -- One YAML file with an ordered list of steps. The chain runs through a single LLM; step N receives the rendered prompt for step N plus the previous step's output prepended as text. No growing conversation history: each call is a fixed system prompt plus one human message containing that context. That keeps token use predictable and avoids context blowout on long chains.

**Pipeline** -- A separate YAML defines an ordered sequence of prompt sets. Each set runs to completion; its final output is passed into the next set as an input variable. The caller only supplies top-level inputs; the server wires outputs from stage to stage.

Every LLM call uses the same system persona: a rigorous critic and devil's advocate that challenges assumptions, surfaces logical gaps, and argues the strongest counterposition. The API response returns both the final output and all intermediate step (or stage) outputs so callers can inspect the full chain.

## Deployment and security

The service has no built-in authentication. HTTP and MCP endpoints are unauthenticated by design, for use in trusted or internal environments--e.g. inside a multi-agent platform or mesh. Expose it only in segments where you control who can reach it (network policy, API gateway, or mTLS).

## Prompts and configuration

Prompts and pipelines live as YAML files in a private GitHub repo, fetched once at startup via the GitHub Contents API. That keeps prompt authorship out of the server code: edit the repo and restart the container to change behavior. Files with a `steps` key are prompt sets; files with a `stages` key are pipelines. Variables use `{{ name }}` double-brace substitution and are validated at call time; missing variables fail before any LLM call.

## API surface

- **POST /** -- Run a prompt set or pipeline (JSON body: `model`, exactly one of `promptSet` or `pipeline`, and `variables`). Returns `final` and `steps`.
- **MCP** -- Streamable HTTP transport at `POST http://localhost:3000/mcp`. Tools: `critique` (single prompt set) and `critique_pipeline` (multi-stage pipeline). Stateless: no server-side session, so it fits containerized, horizontally scaled deployments.

Model choice is by ID prefix: `claude-*` (Anthropic), `gpt-*` (OpenAI), `gemini-*` (Google). API keys go in `.env`; unused providers can be left blank.

Use case: a dedicated critique step in a pipeline--call it with a claim or plan, get back the full chain of critique (and the final answer) without maintaining prompt chains in your own code. Single service, Docker image, HTTP and MCP so orchestrators or other agents can call it directly.

## And the rest?

I say all of this to highlight something funny that came up in my first run. I had a gemini-backed Critic call respond to a plan written in Cursor (backed by Composer 1.5):

> Conclusion (Critic’s words)
>The plan was called a “blueprint for failure” that “systematically avoids core security challenges” and “punts responsibility.” Critic said no real audit execution should proceed until the critical gaps (especially unauthenticated design, threat modeling, MCP scope, and mandatory baseline scans) are fixed and folded into a “robust, realistic audit methodology.”
>That’s the essence of what Critic said. I can turn this into concrete edits to docs/AUDIT-PLAN.md if you want.