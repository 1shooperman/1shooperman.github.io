---
title: "Putting a Tiny Local Model to Work"
date: "2026-11-24"
excerpt: "I thought pretrained models didn't need big hardware. Then I put a 2B and a 4B model on a 2014 Mac mini and timed them."
---

# Putting a Tiny Local Model to Work

I had a misconception about local models: "pretrained" means the hard part is done, so a small box should handle it fine. My first attempt, Qwen under Ollama on a Mac mini, was painfully laggy and I didn't understand why.

Pretrained saves you the cost of *training*. It doesn't save you the cost of *running* the model. Training is writing the encyclopedia. Inference is flipping through every page to pick each single word of the reply. Someone else wrote the book, but you still do the page-flipping.

That reframed the whole project. If I couldn't make the box fast, I could at least find out exactly what it was good for. So I measured.

## The machine

A 2014 Mac mini (`Macmini7,1`) running Linux Mint 22.3, headless, on my home network. It was already sitting in a drawer.

| Part | Spec |
| --- | --- |
| CPU | Intel Core i5-4278U @ 2.60 GHz, 2 cores, AVX2 |
| RAM | 7.6 GiB |
| Swap | 2 GiB |
| GPU | Intel Haswell-ULT integrated graphics (not used for inference) |
| Disk | 931.5 GB spinning hard drive |
| OS | Linux Mint 22.3 (Zena) |

Inference is on the CPU. The only graphics is the CPU's integrated Haswell-ULT controller, and a spinning disk means a cold model load reads gigabytes at hard-drive speed.

Generation speed on hardware like this is bound mostly by memory bandwidth, because every token reads essentially every weight once:

```
tokens/sec <= memory bandwidth / model size in bytes
```

Small model, small bandwidth budget: pick a model that fits comfortably and don't expect miracles.

## The models

I tried two: Qwen3.5 2B and Qwen3.5 4B, both at Q4_K_M quantization, both run by llama.cpp (build `8af68d486`, 12549).

| | 2B | 4B |
| --- | ---: | ---: |
| File on disk | 1.19 GiB | 2.55 GiB |
| Parameters | 1.88 B | 4.21 B |

The 4B file is about 2.14x the size of the 2B. Both fit in 7.6 GiB of RAM, so the question was never whether they would load. It was how fast they would run.

The 2B is the one I keep running as a service with `llama-server`. The setup that mattered:

- `-c 16384` and `-np 1`: one slot, 16k context. The model was trained on 262k, but my RAM sets the limit, not the model.
- `-t 2 -tb 4`: two threads for generation, four for batch prompt processing. The benchmarks below show why.
- `--load-mode mmap+mlock` with `LimitMEMLOCK=infinity` in the systemd unit. After a restart, `grep VmLck /proc/<pid>/status` showed 1,240,116 kB locked, which is the whole model pinned in RAM and unable to swap to disk.
- `--alias qwen3.5-2b` so clients see a clean model ID instead of a file path.
- An API key from an environment file, so it never shows up on the command line. A request without it gets a 401.
- `ufw` allowing the LAN to reach the port, and nothing else.

Load time was about 2 seconds with the file still in the page cache. A true cold load of the 2B, with the file coming off the spinning disk, is roughly 4 minutes. That figure is from memory: I haven't dropped the caches to re-measure it, because this box is in service and I didn't want to disturb a running model.

## The benchmarks

I ran `llama-bench` on each model with a 2048-token prompt (`pp2048`) and 128 generated tokens (`tg128`), at 2 and 4 threads. The backend is CPU for every row. Results are tokens per second, as reported.

| Model | Threads | Prompt (pp2048) | Generation (tg128) |
| --- | ---: | ---: | ---: |
| 2B | 2 | 38.93 +/- 0.08 | 11.61 +/- 0.01 |
| 2B | 4 | 40.94 +/- 0.06 | 11.53 +/- 0.01 |
| 4B | 2 | 15.19 +/- 0.04 | 5.14 +/- 0.05 |
| 4B | 4 | 15.60 +/- 0.48 | 4.79 +/- 0.61 |

Three things stand out:

- **More threads helped prompt processing a little and generation not at all.** On the 2B, going from 2 to 4 threads gained about 5% on the prompt and nothing on generation. That is what you expect when generation waits on memory, not on compute, and it is why the service uses two threads for generation and four for the prompt. On the 4B, four threads were slightly slower at generation and much noisier (+/- 0.61 against +/- 0.05).
- **Speed tracks file size.** The 4B file is 2.14x the 2B. At two threads, generation fell from 11.61 to 5.14 tokens/sec, to about 0.44x. Prompt processing fell to about 0.38x. Doubling the model roughly halves the speed.
- **I only measured speed.** I did not measure whether the 4B answers better.

Turning those into wall-clock time, using four threads for the prompt and two for generation, the way the service runs:

| Job | 2B | 4B |
| --- | ---: | ---: |
| 1,000 token prompt, 100 token reply | about 33 s | about 84 s |
| 8,200 token prompt, before the first word | about 3.3 min | about 8.8 min |
| 4,096 token reply, worst case | about 5.9 min | about 13.3 min |
| Prompt tokens read per hour | about 147k | about 56k |
| Prompt tokens read in 8 hours | about 1.2 M | about 450k |

Those are my arithmetic from the table, not separate measurements.

I also watched the real thing. In the journal, a live request logged `prompt processing, n_tokens = 2048, progress = 0.25, t = 49.77 s / 41.15 tokens per second`. Total prompt size is tokens divided by progress, and the live rate matched the benchmark. A small 60-token readiness check against the 2B (more on that below) ran at 34.55 tokens/sec for the prompt and 11.25 for generation, and came back in 2.1 seconds with a 3-token answer.

### Temperature

I watched the sensors while both models ran, with `sensors` polled every 2 seconds. CPU temperature peaked at 78 to 79 C on both models. One snapshot read Package 77 C, Core 0 77 C and Core 1 75 C. The `high` and `crit` limits are both 100 C. The exhaust fan was at 4,065 RPM, in a range of 1,800 to 4,800. I did not record clock speeds, so I can't say whether the CPU throttled.

## The first use was the wrong one

My first instinct was to wire the box up as a model in my coding agent UI. It went badly, and instructively.

Selecting the local model immediately triggered conversation compaction, on a session that contained nothing but a greeting. The agent's own base prompt (system prompt, tool definitions, and 22 skill descriptions) was bigger than the input budget left after reserving room for output: 16,384 minus 4,096 is about 12k. Every new session would compact before sending a single real message, and the compaction request itself waits through 3+ minutes of prompt processing.

The lesson: at 41 tokens/sec, every token you send costs about 25 milliseconds, and a coding agent sends thousands before you type a word. A 2B model is also a poor tool user. Fewer tools means fewer chances to call the wrong one, and that's the opposite of what an agent wants. Coding agents are a poor fit for this box. Claude keeps that job.

## What it is good at

Short input, short output, no hurry, and output that is easy to check.

- **Classification and tagging.** A few output tokens, so generation speed barely matters.
- **Structured extraction.** Pull fields out of messy text into JSON. Format matters more than reasoning here.
- **Overnight batches.** Free tokens while I'm asleep.
- **Private data.** Anything I wouldn't send to a cloud service.

The most useful trick is constrained output. `llama-server` can force the response to match a JSON schema, so the model can only emit tokens that keep the output valid. That fixes the classic small-model failure of rambling or malformed output. It guarantees the format, not the correctness, so the model can still pick the wrong category.

For these short jobs I also turn thinking off. Qwen can burn hundreds of hidden reasoning tokens before it answers, which at 11 tokens/sec is a long wait for a classification that gains nothing from reasoning. Temperature goes to 0 as well.

## How I actually use it

I run a custom built agent broker and tool chain: a layer that runs many Claude sessions in parallel, one per ticket, each in its own git worktree, with every permission request funneled through one queue I answer from a single terminal. The local model is a small supporting player inside it, called directly over the API, never through an agent harness, so none of that big system prompt is sent.

It does two jobs:

1. **A readiness check.** Before a queued ticket starts, the model reads the issue title and body and decides whether the ticket is ready to work. A ticket it calls not ready gets filed with a one-line reason and never spends an expensive Claude session. If I disagree, I override it with a `ready` marker or label.
2. **Stall reasons and digests.** When a ticket stalls or fails, the model reads the tail of its log and tags it from a fixed set: CI failure, usage limit, merge conflict, unanswered question, auth, other. A daily digest also gets a one-line summary per ticket, so the first thing I read in the morning is what needs me.

Both jobs run on the 2B. Both are tiny prompts and tiny answers, and both run in the background, which is exactly the shape this hardware likes. The design assumes the box will sometimes fail:

- Each request has a timeout (ten minutes by default, since a cold, long prompt can really take that long).
- If the server is unreachable, slow, or answers nonsense, the ticket just runs anyway and I get one warning.
- If no key is configured, the checks are skipped entirely.

The model can be wrong and the box can be down, and the worst case is that I fall back to the old behavior. That's the right risk profile for a 2B model: it saves money when it works and costs nothing when it doesn't.

## Takeaways

- Pretrained doesn't mean cheap to run. Do the bandwidth math before you buy or blame anything.
- Measure prompt speed and generation speed separately. Prompt speed is what kills agent workloads.
- Match the job to the hardware: classify, extract, tag, summarize. Not code, not recall, not long documents.
- Model size costs speed almost one for one. The 4B was 2.14x the file and about 0.4x the speed, and the 2B is my default.
- Constrain the output and turn thinking off for short tasks.
- Build every call site to survive the box being slow or gone.

A small model on a spare machine won't replace a frontier model. But it can take the small, boring, private jobs off the expensive one, and it does that for free while I sleep.
