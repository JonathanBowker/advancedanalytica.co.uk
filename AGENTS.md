# AGENTS.md

## Scope

These instructions apply to the whole Advanced Analytica Astro website repository.

The site positions Advanced Analytica as the company behind Brand Semantics services, iBOM, Brando, QWIKI, Digividuals, AICE, and Brand AI Readiness diagnostics.

## Core mandate

Minimize cost, context, and blast radius.

Prefer bounded edits over broad exploration. Make the smallest safe change that satisfies the request.

Direct user instructions override this file only when the user is explicit.

## Default mode: Scoped Edit Mode

Assume every task starts in Scoped Edit Mode.

In this mode:

- Inspect only files named by the user.
- If no files are named, inspect at most 3 likely files.
- Read at most 5 files total before asking for approval.
- Edit at most 2 files before asking for approval.
- Do not rewrite more than 120 contiguous lines without approval.
- Do not scan the full repo.
- Do not run build, test, lint, format, install, or dev commands unless approved.

## Expensive Mode

Only enter Expensive Mode if the user explicitly says:

```txt
Use Expensive Mode.
```

Before starting Expensive Mode, state:

- why broad work is needed
- which folders will be searched
- which commands may run
- the maximum number of command attempts

In Expensive Mode, run at most one broad search and one build or test pass before reporting back.

## Stop and ask first

Ask for approval before doing any of the following:

- inspecting more than 5 files
- editing more than 2 files
- running a repo-wide search
- running `npm run build`, `npm test`, `npm run lint`, `pnpm build`, `pnpm test`, or `pnpm lint`
- running `npm install`, `pnpm install`, or adding dependencies
- editing `package.json`, lockfiles, config files, routes, deployment files, or environment files
- changing content collection schemas
- moving or renaming routes
- rewriting a whole file
- deleting files
- running commands likely to produce long output

## Search controls

Inspect exact files named in the prompt first.

Allowed targeted search examples:

```bash
rg "AssessmentHero" src/components
rg "Assess your brand" src/pages/index.astro
sed -n '1,220p' src/pages/index.astro
```

Do not run these without approval:

```bash
find .
ls -R
grep -R
rg .
rg "" .
rg "pattern" .
```

Never search these folders unless explicitly asked:

```txt
node_modules
.git
dist
build
.astro
coverage
.cache
.vercel
.netlify
```

## Command controls

Safe without approval:

```bash
pwd
git status --short
sed -n 'START,ENDp' named-file
rg "literal" named-file-or-folder
```

Ask before running:

```bash
npm run build
npm test
npm run lint
npm run format
npm install
pnpm install
pnpm build
pnpm test
pnpm lint
pnpm dev
```

Never run destructive commands unless explicitly requested:

```bash
rm -rf
git reset --hard
git clean -fd
git push --force
```

## Editing workflow

For every task:

1. Restate the requested change in one sentence.
2. List the files you plan to inspect.
3. Inspect only those files.
4. Propose the smallest safe edit.
5. Make the edit.
6. Summarize exactly what changed.
7. State any checks skipped and why.

If more files are needed, explain why before opening them.

## Astro conventions

Use existing Astro components and Tailwind utility patterns.

Prefer editing an existing section or component over creating new structure.

Keep class changes local to the affected section.

Do not change routes, layouts, global CSS, content collection config, or shared data files unless explicitly asked.

Do not add packages unless explicitly asked.

## Brand positioning

The core position is:

```txt
The brand-first operating model for governed AI.
```

Preferred copy:

- Assess your brand's AI readiness
- Brand AI Readiness Assessment
- A Brand Semantics diagnostic from Advanced Analytica
- We test your brand against the roles and intents your AI will meet
- You see which rules hold, where toolkits create ambiguity, and where stronger controls are needed
- machine-operable controls
- governed workflows
- traceable decisions
- clear control layer

Naming stack:

- Company: Advanced Analytica
- Service line: Brand Semantics
- Diagnostic: Brand AI Readiness Assessment
- Operating model: iBOM
- Governance system: Brando
- Decisioning layer: QWIKI
- Simulation and validation layer: Digividuals
- Runtime gateway: AICE

## Brand voice

Use a collaborative, bold, optimistic, direct, audience-first voice.

Use:

- we
- you
- your
- businesses
- system
- approach
- governed AI
- brand-first AI governance

Avoid:

- leverage
- leveraging
- innovative
- innovation
- synergy
- utilize
- utilise
- utilisation
- robust
- myriad
- optimal
- optimise
- solutions
- organisations
- journey
- best-in-class
- transformative
- Begin the journey
- generic AI consultancy language
- exclamation points

Do not refer to Advanced Analytica in the third person in normal rendered marketing copy unless the user asks for metadata, legal text, or a case study.

## Validation rules

For copy or layout edits, do not run a build unless asked.

For import or component API changes, ask before running a build.

If a command fails, inspect only the erroring file first. Explain the fix before rerunning the command.

Do not rerun the same command repeatedly without a new fix.

## Deployment branches

Production branch wiring must stay explicit.

- The DigitalOcean App Platform app builds the production site and the `lead-api` function from `deploy-live`.
- The GitHub Actions workflow `.github/workflows/deploy-digitalocean.yml` triggers only on pushes to `main`.
- A push to `main` forces a rebuild, but that rebuild uses the current `deploy-live` branch content, not `main`.
- To publish production code safely, make sure the intended deploy commit is on `deploy-live` before triggering the DigitalOcean rebuild.
- If you want the GitHub workflow to trigger the rebuild automatically, also push `main` after `deploy-live` is updated.
- `deploy-live-refresh` is not the production source branch and should not be used unless the user explicitly asks for it.
- If production output does not match the repo, verify both `.do/app.yaml` and the live DigitalOcean app spec before assuming the deploy succeeded.

## Security and privacy

Do not read, edit, print, or summarize secrets.

Do not inspect `.env`, tokens, deployment credentials, billing settings, auth config, or private keys unless explicitly asked.
