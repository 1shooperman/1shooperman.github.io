---
name: update-compat-matrix
description: Updates compat-matrix.json with interop-aware reasoning across the React Native ecosystem. Use when the user asks to update the compat matrix, bump dependency bounds, or refresh compat-matrix.json.
argument-hint: "[--dry-run]"
allowed-tools: Bash, Read, Write, WebSearch, WebFetch
---

Update `compat-matrix.json` by reasoning across cross-package interop constraints — not just checking each package in isolation.

## Context

This project's `compat-matrix.json` defines **maximum allowed versions** for key dependencies. The matrix exists because several packages in the React Native ecosystem have tight interop requirements: `react-native-reanimated`, `react-native-gesture-handler`, `react-native-screens`, and `react-native-safe-area-context` all peer-depend on specific RN ranges and may conflict if bumped independently.

The `agl-build-tools compat:update` script updates each entry in isolation (from npm peerDeps, Gemfile.lock, and the RN GitHub template). Do NOT simply run that script — it does not verify cross-package compatibility.

## Step 1 — Read current state

Read these files:
- `compat-matrix.json` — current matrix bounds
- `package.json` — installed ranges for all tracked packages
- `Gemfile.lock` — resolved gem versions
- `android/build.gradle` — current AGP classpath version
- `android/gradle/wrapper/gradle-wrapper.properties` — current Gradle wrapper version

## Step 2 — Fetch upstream info

Use the **`agent-npm-info`** subagent to fetch upstream package metadata. Pass it a JSON array of all packages in `matrix.npm` plus `react-native` itself. The agent returns a JSON object keyed by package name with `{ version, peerDependencies }` for each.

## Step 3 — Cross-validate interop

Before proposing any new bound, check peer dependency compatibility across the full set. The critical interop chains are:

**RN ecosystem chain** — all of these must be mutually compatible with the target `react-native` version:
- `react-native-reanimated` → check its `peerDependencies.react-native` range
- `react-native-gesture-handler` → check its `peerDependencies.react-native` range
- `react-native-screens` → check its `peerDependencies.react-native` range
- `react-native-safe-area-context` → check its `peerDependencies.react-native` range

**Rule**: If a package's latest `peerDependencies.react-native` does not include the installed `react-native` version, do NOT bump that package's matrix bound to latest — flag it as blocked and keep the current bound.

For each ecosystem package, also check:
- Does the latest version require a newer `react-native` than what's in `package.json`?
- Does it conflict with any other tracked package's peer requirements?

## Step 4 — Fetch Gradle bound (informational only)

The `gradle` matrix entry is a manually curated safety cap. Do NOT propose updating it from the RN template — the project may intentionally pin an older Gradle because newer versions break the build.

Use the **`agent-check-gradle`** subagent. Pass it the installed `react-native` version string (strip range prefix, e.g. `"0.85.3"`). The agent returns a single line with the Gradle version from the RN template.

Show the result in the diff table as **INFO**. Only update the `gradle` bound if the user explicitly requests it.

## Step 5 — Read gem versions from Gemfile.lock

For each gem in `matrix.gems`, extract the resolved version from `Gemfile.lock` (pattern: `^    <gem> (<version>)`).

## Step 6 — Produce a proposed diff

Present a table showing current vs proposed matrix values and the reasoning:

| Entry | Current | Proposed | Source | Interop status |
|-------|---------|----------|--------|----------------|
| react | 19.x | 19.x | RN peerDep | OK |
| react-native | 0.85.x | 0.86.x | package.json | OK |
| react-native-reanimated | 4.x | 4.x | peerDep check — latest requires RN 0.87+ | BLOCKED |
| ... | | | | |

Flag any entry as **BLOCKED** where bumping would exceed cross-package compatibility bounds. Explain why.

## Step 7 — Write or dry-run

- If `--dry-run` was passed, stop here and show the table. Do not write anything.
- Otherwise, ask for confirmation if any entry is BLOCKED or if any bound is decreasing.
- Write the updated `compat-matrix.json` preserving the `_comment` field and key order.
- Run `npm run compat:check` to verify the updated matrix passes.

## Important constraints

- Never remove an existing key from the matrix without explicit user instruction.
- Never bump a package's bound past what its published `peerDependencies` support against the currently installed `react-native`.
- The matrix stores **max allowed** versions, not pinned versions — use the `majorX` or `majorMinorX` format already established in the file.
- Preserve the existing format: `"X.x"` for major-only bounds, `"X.Y.x"` for major.minor bounds, exact `"X.Y.Z"` for patch-pinned entries.
