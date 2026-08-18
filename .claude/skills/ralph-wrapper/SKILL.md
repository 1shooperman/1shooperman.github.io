---
name: ralph-wrapper
description: >
  Use this skill when the user asks you to ralph loop
user-invocable: true
argument-hint: "SPEC / Ticket Link"
---

Use /ralph-loop:ralph-loop 1shooperman/1shooperman.github.io/issues/${ARGS} --max-iterations 5 --completion-promise "${Read(./.claude/completion-promise.md)}"