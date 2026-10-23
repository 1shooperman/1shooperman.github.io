---
title: "There Be Dragons"
date: "2026-10-23"
excerpt: "Claude Code's auto mode keeps nudging you toward 'always allow in the future.' That one click is permission creep, and it compounds."
author: Brandon Shoop
---

Claude Code's auto mode is useful, but it has a habit I don't like: when it asks for a permission, the (un)helpfully pre-selected default is "always allow in the future." Click yes once under auto mode and you haven't granted one permission--you've granted it forever, for every future session, until someone goes back and revokes it.

That's permission creep, and it's worth naming because it's easy to wave off in the moment. You're mid-task, the agent asks to run a command, and "always allow" is the path of least resistance. Multiply that across weeks of sessions and you end up with a permissions file that's far more permissive than you'd choose if you were deciding it all at once instead of one prompt at a time.

## Permissions Are a Guardrail, Not a Formality

Permissions are guardrails, same as any other guardrail you'd put around an agent: a rule that exists to catch the agent before it goes somewhere you didn't intend, not to slow down the common case. The point of a permission prompt is to put a human in the loop before an agent does something irreversible or high-blast-radius. Each time you grant "always allow," you're removing that guardrail--not just for this command in this session, but for every future invocation of it. That's a reasonable trade for low-risk, frequently-repeated actions: letting `npm test` run without a prompt every time saves real friction and costs little. It's a bad trade for anything destructive, anything that touches credentials, or anything that reaches outside your local environment.

The risk isn't any single grant. It's that the grants accumulate quietly, in small increments, each one individually defensible, until the aggregate permission set is far wider than anyone deliberately decided on. Nobody sits down and says "I want to allow force-pushes, unrestricted `rm`, and arbitrary network calls without asking." They say yes to one thing on Tuesday, another on Thursday, and three weeks later that's the state of the file.

## How the Prompt Nudges You

The permission dialog gives you a few options when an agent wants to do something outside its current allowlist: allow once, allow for the rest of this session, or allow always. Under auto mode, the UI leans toward the broadest of those--"always allow"--as the path that gets you back to work fastest. That's a reasonable default for a tool optimizing for flow, but it's worth noticing that the fastest option and the safest option are not the same option, and the UI doesn't make you choose between them with equal friction.

This isn't unique to Claude Code. Any tool that asks for incremental permission and offers a "remember this choice" shortcut has the same shape: OAuth consent screens, browser notification permissions, sudo timeouts. The pattern is always the same--convenience accumulates into scope, and the scope rarely gets reviewed afterward because there's no natural moment that prompts the review. You don't get reminded that you granted something six weeks ago; you just have it; it just works, right up until it's used in a way you didn't anticipate.

## What's Actually at Stake

A coding agent with broad "always allow" permissions can run arbitrary shell commands, write and delete files, and--depending on what you've granted--push to remote branches or hit external services. Most of the time this is fine, because most of what an agent does in a given session is routine: running tests, formatting code, reading files. The failure mode isn't the agent going rogue on its own; it's the agent executing an unexpected or destructive instruction (from a bad prompt, a confused multi-step task, or a malicious instruction smuggled in through content it reads) without a human in the loop to catch it, because that checkpoint was traded away for convenience weeks earlier.

The blast radius scales with what you've allowed. A standing grant to run arbitrary `git` commands is a bigger exposure than a standing grant to run `npm run lint`. A grant that applies globally, across every project, is a bigger exposure than one scoped to a single repo. Auto mode doesn't distinguish between these when it nudges you toward "always allow"--it treats the next permission request the same way it treated the last one, regardless of how much more it's asking for.

## Audit What You've Already Allowed

Claude Code keeps its permission state in `settings.json` and `settings.local.json`, at both the user level (`~/.claude/`) and the project level (`.claude/`). Four files, any of which can be quietly accumulating "always allow" entries from past sessions. The user-level files apply everywhere you run Claude Code; the project-level ones apply only inside that repo--but a broad grant in either one is a standing grant until someone removes it.

Worth a regular pass:

- Check both `settings.json` and `settings.local.json` at `~/.claude/` and in each project's `.claude/`.
- Look for allowlisted commands that are broader than they need to be--a wildcard where a specific command would do, or a user-level grant that only ever gets used in one project and belongs scoped down to `.claude/settings.local.json` instead.
- Remove anything you don't recognize granting, or don't remember needing. If you can't explain why a permission is there, that's the answer to whether it should stay.
- Prefer narrow grants over broad ones when you do say "always allow"--a specific command string over a glob, a project-scoped file over the user-level one.

This doesn't need to be a big ceremony. A few minutes, on a schedule--monthly is reasonable--catches the slow accumulation before it becomes a surprise. The alternative is finding out what you allowed only when something goes wrong, which is the worst time to learn it.

None of this means auto mode is bad--it's useful for exactly what it's built for: letting an agent move without an approval prompt per line. But "useful" and "unexamined" shouldn't be the same thing. Guardrails only work while they're still standing; audit the permissions the same way you'd audit any other access grant: on a schedule, not just when something goes wrong.
