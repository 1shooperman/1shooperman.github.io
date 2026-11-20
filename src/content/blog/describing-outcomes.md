---
title: "AI development and Describing Outcomes"
date: "2026-11-20"
excerpt: "AI enabled development is about describing your outcomes, not writing lines of code."
author: Brandon Shoop
---

I've spent the past month rewriting a client's PHP and Vue app. The old stack was stale and the front end had become untenable, so the goal was a new one that was secure out of the box. It took several iterations, and the lesson had very little to do with code.

AI-enabled development is about describing outcomes. Typing the code is the cheap part now. The hard part is saying, clearly enough that a machine can act on it, what you actually want.

I break an outcome into three pieces.

## 1. The outcome itself

What should the system do, and for whom? Not "a Fastify API with Drizzle." More like: a specialist signs in, sees their projects, budgets and terms, and it looks and behaves like the app they use today. If I can't say it in terms of behavior, I'm not ready to hand it off.

## 2. How you'll know it's done

Acceptance criteria, ideally ones a machine can check. On this rewrite, that meant screenshots of every route in the old app at desktop, tablet, and phone sizes, then pixel-diffing the new screens against them. It meant recording the old API's real request and response shapes, then replaying them against the new API and diffing the results. I didn't have to trust that the new thing was right. I could measure it.

## 3. The problem and its constraints

The boundaries matter as much as the goal. Auth0 JWT validation, per-object permissions, and schema validation at the edge were requirements from day one, not cleanup tasks. So was "no UI kit whose upgrade cycle can block ours," because the old app's kit dependency was a big part of why it was stuck.

Constraints are also where my first pass broke. My original spec said Go for the API. Once the work got into the details, it was clear that nearly every vendor we integrate with ships a first-party Node SDK, and Go meant hand-rolling clients for several of them. I changed the spec to TypeScript. The AI didn't get that wrong; I hadn't described the constraint yet because I hadn't discovered it.

Early passes were also too big. "Rewrite this app" isn't an outcome. It was only after I split the work into smaller descriptions (capture the current app, inventory what the backend actually serves, then port by screen group) that results started landing cleanly.

## What review looks like now

I still read code. I read less of it than I used to. Auth, permissions, and anything touching data get a close read. The rest I lean on the criteria for. That's a refinement of my earlier take that [AI isn't an SME](/blog/ai-isnt-an-sme): the human is still the judge, but more of the judgment happens upfront, in the description.

## Where this breaks

- **You can't describe what you don't understand.** Weak fundamentals produce weak outcome descriptions, and the output will faithfully match them.
- **Plausible but wrong.** Output that looks right isn't the same as output that is right. This is the same plausibility-versus-prediction trap I wrote about in [AI Ranked Content](/blog/ai-ranked-content).
- **Hidden constraints.** Performance, security, and maintainability get violated silently if you never wrote them down.
- **Skill atrophy.** If you only think in terms of what the tool proposes, your range shrinks.

## Takeaways

- Describe behavior first. Implementation details come second.
- Write acceptance criteria a machine can run.
- State your constraints, then expect to discover more of them.
- Keep the passes small enough to verify.
- Keep reading code. Know where it matters most.

Keep building. Keep learning, especially the parts the tools can't do for you.
