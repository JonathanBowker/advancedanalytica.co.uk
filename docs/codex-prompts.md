# Codex Prompt Patterns

Use these prompts to keep Codex bounded and cheaper.

## Standard bounded edit

```txt
Follow AGENTS.md.
Only inspect:
- src/pages/index.astro
- src/components/AssessmentHero.astro

Do not scan the full repo.
Do not run build, tests, lint, or install.
Make the smallest change needed.
Summarize the exact files changed.
```

## Copy-only edit

```txt
Follow AGENTS.md.
Edit only the copy in src/pages/index.astro.
Do not change layout, imports, routes, styles, or config.
Do not run any commands.
Apply the Advanced Analytica voice rules in AGENTS.md.
```

## Hero layout polish

```txt
Follow AGENTS.md.
Only inspect src/pages/index.astro and the hero component if it is directly imported there.
Do not inspect other files.
Do not run build.
Improve spacing, hierarchy, and CTA clarity only.
Keep the current brand palette and visual system.
```

## Component bug fix

```txt
Follow AGENTS.md.
Only inspect the component named below and the file that imports it.
Component: src/components/ComponentName.astro
Do not scan the repo.
If you need another file, explain why before opening it.
Do not run build unless I approve it.
```

## Build failure with one command allowance

```txt
Follow AGENTS.md.
Run npm run build once.
If it fails, inspect only the erroring file first.
Explain the fix before rerunning any command.
Do not run tests, lint, install, or repo-wide search.
```

## Plan before edit

```txt
Follow AGENTS.md.
Do not edit yet.
Inspect only these files:
- FILE_A
- FILE_B

Give me the smallest safe implementation plan and list any extra files you would need.
```

## Diff review

```txt
Follow AGENTS.md.
Review only the current diff.
Do not inspect unrelated files.
Do not run commands.
Tell me if the change is safe, scoped, and aligned with the brand voice.
```

## Bad prompts

Avoid:

```txt
Fix the site.
Refactor the homepage.
Make it more professional.
Run all tests and fix everything.
Search the repo and clean this up.
```

## Better prompts

Use:

```txt
Follow AGENTS.md.
Only edit src/pages/index.astro.
Improve the Brand AI Readiness Assessment section heading and CTA copy.
Do not change layout or run commands.
```

```txt
Follow AGENTS.md.
Only inspect src/components/AssessmentHero.astro.
Make the card spacing more balanced.
Do not scan the repo.
Do not run build.
```

## Working rule

Use ChatGPT to decide what to change. Use Codex to apply bounded changes to named files.
