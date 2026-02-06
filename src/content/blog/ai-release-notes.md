---
title: AI Release Notes
excerpt: A Cursor command that turns the git changelog into release notes and press copy, with conventional commits as optional structure.
author: Brandon Shoop
date: "2026-02-06"
---

![AI Release Notes](/assets/ai-release-notes.png)

<p class="photo-credit">ChatGPT (GPT 4.x) with the prompt: "go check out this post and draw me a picture"</p>

# AI Release Notes

I tried several hosted models (GPT, Gemini, Mixtral-8x7B-Instruct and Phi-3 Mini via Hugging Face, and Cursor's Composer) for turning code changes into release notes. Free-tier limits and changing model behavior made those options unreliable, so I moved the workflow into Cursor as a custom command. It works against any existing git repo and is adaptable for most agents.

The rest of this post covers how the command works and how I use it for technical summaries and press-style copy. The skill is [here](https://github.com/1shooperman/cursor-template/blob/main/.cursor/skills/summarize/SKILL.md); you can drop it into your own Cursor setup.

## What you need

An existing git repo and a way to run an LLM over your change set. In Cursor, that’s the summarize command. The prompt tells the agent to compare `main` to `HEAD`, so whatever’s in that range is what gets summarized. No need to adopt a new commit style first. Conventional commits are purely additive. If you use them, the history gives the model structured input (type, scope, message); if you don’t, it still has the diff and commit messages. I run it on history as-is and don’t rewrite or squash for the summarizer.

## What the summarize command does

The command is a Cursor skill that resets context and instructs the model to act as a senior engineer writing a GitHub PR description for reviewers who know the codebase but not this change. It does *not* invoke the model by itself (`disable-model-invocation: true`); you run it when you want a summary, and the agent uses only the current change set.

The objective is a concise, high-signal markdown summary that explains what the change does, why it exists, and what problem it solves or behavior it changes. The prompt explicitly tells the agent *not* to list files changed or dump commit history, and to avoid implementation walkthroughs unless they clarify intent. Outcomes and behavior over internal mechanics; neutral, factual language; if something is preparatory or refactoring-only, say so. If intent is unclear from the diff, the agent should state that instead of guessing.

The required output is a markdown file called `change-summary.md` in a fixed format: a **Summary** (one to three short paragraphs), a **Why** section (motivation, bug, or requirement), and an optional **Notes for Reviewers** (edge cases, rollout considerations, things to double-check). That file is suitable for pasting straight into a GitHub PR description. Constraints: don’t speculate beyond what the diff supports, and avoid jargon that isn’t already in the codebase.

In practice you run the command, the agent reads the diff (main vs HEAD), and it writes `change-summary.md`. You get a technical release note or PR blurb without leaving the editor.

## Press release variant

When I need external-facing copy for a general audience, I run the same command and add one sentence of context: *summarize as a press release, with approachable language for a general audience*. I don’t change the prompt itself; that instruction is enough for the model to shift tone and strip out internal detail. If the output is off, I iterate (re-run with a slightly different ask or edit the result). No separate pipeline or second skill.

## Tradeoffs and where else this could live

- Conventional commits are not required. They help when you have them; the summarizer works either way. 
- I keep this in Cursor because it’s where I’m already working and I can trigger it and edit the output in place. The same workflow could be adapted to any system that can talk to an LLM: CI job, CLI script, or another editor. 
- Earlier work on a standalone summarizer lives at [AGLFlorida/summarizer](https://github.com/AGLFlorida/summarizer); that repo is in a broken state but shows the idea is not Cursor-specific. 
- If you have a repo and a way to send a diff plus instructions to a model, you can get the same kind of release notes without this exact setup.