# Advanced Analytica Codex Controls Pack

Drop these files into the Advanced Analytica Astro website repo to make Codex work in a more bounded, lower-cost way.

## What this controls

These instructions tell Codex and other coding agents to:

- inspect fewer files
- avoid whole-repo scans
- ask before running builds, tests, installs, and broad searches
- avoid repeated command runs
- avoid large rewrites unless explicitly approved
- keep website copy aligned to the Advanced Analytica brand-first AI governance position

## What this does not control

These files do not create a hard billing cap. For hard limits, use workspace billing controls, spend limits, or admin-level credit controls.

## Install

Copy the files into the matching paths in your repo:

```txt
AGENTS.md
src/pages/AGENTS.md
src/components/AGENTS.md
src/content/AGENTS.md
docs/codex-prompts.md
docs/codex-operating-procedure.md
```

## Daily usage pattern

Start Codex prompts with:

```txt
Follow AGENTS.md.
```

Then name the exact files it may inspect. For example:

```txt
Follow AGENTS.md.
Only inspect src/pages/index.astro and src/components/AssessmentHero.astro.
Do not scan the full repo.
Do not run build, tests, lint, or install.
Make the smallest change needed.
```

## Recommended rule

Use ChatGPT to decide what to change. Use Codex to apply bounded changes to named files.
