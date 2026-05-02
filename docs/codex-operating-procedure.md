# Codex Operating Procedure

## Goal

Use Codex as a bounded implementation tool, not an open-ended autonomous developer.

## Standard process

1. Decide the desired change outside Codex.
2. Name the exact files Codex may inspect.
3. Start the prompt with `Follow AGENTS.md.`
4. Deny repo scans by default.
5. Deny build, test, lint, install, and format commands by default.
6. Ask for a plan first if the task may touch more than 2 files.
7. Approve broader work only when needed.

## Cost review checklist

After a Codex run, check:

- Did it inspect more than 5 files?
- Did it scan the full repo?
- Did it run build, test, lint, or install without approval?
- Did it rerun a failed command without a new fix?
- Did it rewrite a whole file?
- Did it edit package or config files?
- Did it produce long logs or paste full files?

If yes, tighten the next prompt and point back to AGENTS.md.

## Expensive Mode approval

Use Expensive Mode only for tasks that genuinely require broader work.

To approve it, say:

```txt
Use Expensive Mode.
```

Then require Codex to list:

- files or folders it will inspect
- searches it will run
- commands it will run
- how many attempts it will make

## Command approval wording

Approve one command at a time:

```txt
You may run npm run build once. If it fails, inspect only the erroring file and explain the fix before rerunning.
```

```txt
You may run one targeted rg search inside src/components only.
```

## When to stop Codex

Stop Codex and take over planning if it:

- asks to scan the full repo for a copy or layout task
- wants to install a package for a visual polish task
- proposes a full refactor for a single-section change
- keeps rerunning tests without a new fix
- touches routing, config, or package files without a clear reason

## Recommended daily operating model

Use ChatGPT for strategy, copy, UX, and architecture decisions.

Use Codex for narrow implementation in named files.

Use manual review before approving builds, broad searches, or multi-file refactors.
