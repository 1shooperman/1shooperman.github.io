---
title: "Whitepapers: Spanner"
excerpt: A brief summary of your blog post
author: Brandon Shoop
date: "2025-12-17"
---

# Spanner

[Link to paper](https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf)

## TL;DR

I recently read Google's paper on Spanner. It helped me build better mental models around the challenges of distributed systems. Its biggest invention / callout is the "TrueTime API". Effectively, this api is a centralized clock that all transactions reach out to for timestamps. This alleviates the microsecond differences between the clocks in physical hardware and allows _externally consistent_ timestamps.




