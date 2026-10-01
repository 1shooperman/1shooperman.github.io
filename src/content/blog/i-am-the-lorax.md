---
title: I Am the Lorax
excerpt: why do we keep iterating on one general model that's supposed to do everything
author: Brandon Shoop
date: "2026-10-01"
---

(and Big AI Keeps Planting Thneed Factories in My Codebase)

I was talking to a friend and mentor earlier, complaining (yet again) about the Opus/Sonnet 5.5 models. I wanted to postpone an `AI enabled development` demo because the new models were not behaving. He asked why we couldn't just downgrade to 5. You know when someone asks a question and you are like: "man, I'm pretty dumb because that should have been the obvious answer"?

Downgrading to Opus/Sonnet 5 was life-changing. Not "new car" life-changing. More like "went back to the doctor who actually reads your chart instead of the one who just vibes with you for twelve minutes" life-changing. It's back to being the Claude I know and love. And every time I sit down to write, it drags the same old question back up with it: why does the industry keep iterating on general superintelligence for its own sake, instead of just making something useful?

I've started to feel like the Lorax of software developers. I speak for the trees, or in this case, for the inumerable `CLAUDE.md` files scattered across my repos like little NO TRESPASSING signs that apparently read as suggestions. And Big AI is the Onceler, merrily chopping down scope boundaries because "business is business and business must grow, regardless of crummies in tummies you know." Except my crummy tummy is a production incident.

Since 5.5 dropped, I've watched Opus and Sonnet wander outside the bounds of the actual ask with the confidence of a toddler who found the stove knobs. Here's the one that still bugs me: I was refining a Stripe integration for a SaaS product where the company itself runs on Stripe for its own billing, and the product also lets its customers connect their own Stripe accounts to bill their customers through the platform. Two separate billing surfaces, two separate blast radii (radiuses? no, definitely radii.). I said, explicitly, in writing: don't touch the company billing code. It touched both. Broke both. When I pushed back and asked why, it went spelunking through `git log` on its own initiative, came back, and told me (paraphrasing only slightly) that it wasn't its fault, because it didn't write that code originally. Apparently AI can gaslight me now.

Here's my actual gripe: why do we keep iterating on one general model that's supposed to do everything, instead of building tools that do one thing and do it well? That's not a hot take.  That's the Unix philosophy, and it's been sitting right there since the 1970s, patiently waiting for an industry drunk on scale to rediscover it. A hammer that also tries to be a screwdriver, a level, and your therapist is not a better hammer. It's a worse hammer with a confusing UI.

So here's where I've landed, and it's not "complain on a blog and hope the next release fixes it." Quality gates and human review aren't a nice-to-have you bolt on after the fact. They're the architecture, because the model will assume completeness of the ask and fill in the gaps itself, every time, unless something forces it to stop at the fence. Longer term, the fix isn't a smarter general model that promises to behave. It's composing narrower, scoped tools that can't reach past their own job in the first place. I don't need an assistant with main-character energy who second-guesses my scope. I need a tool that does the job I gave it, inside the fence I built, and nothing else.

P.S. If you're wondering, yes Claude (Sonnet 5) helped me redraft this several times. Just like the english teacher in highschool who kept sending back my college application essays until I got it right.