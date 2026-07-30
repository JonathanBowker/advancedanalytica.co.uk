# AGENTS.md

## Scope

This file covers the full repository.

The app is an Astro SSR codebase that now serves two modes from one server:

- the existing Advanced Analytica marketing site
- the multi-tenant portal layer keyed by hostname

## Codebase structure

- `src/config/tenants.ts`: tenant registry, service catalogue, and per-tenant service access
- `src/lib/tenants.ts`: hostname resolution, public origin helpers, and tenant theme loading
- `src/themes/`: portal theme files using CSS custom properties
- `src/layouts/PortalLayout.astro`: shared shell for tenant login and authenticated portal pages
- `src/pages/login.astro`: public tenant login page using Supabase magic links
- `src/pages/portal.astro`: authenticated tenant landing page
- `src/pages/portal/services/[slug].astro`: authenticated service intake forms
- `src/pages/api/auth/magic-link.ts`: server-side magic-link dispatch
- `src/pages/auth/callback.astro`: Supabase auth completion route
- `src/middleware.ts`: request-time tenant resolution and auth gating

## Tenant config pattern

Each tenant entry maps a hostname to:

- `slug`: stable internal portal key
- `name`: display name shown in the portal UI
- `theme`: CSS file path inside `src/themes/`
- `services`: allowed service slugs from `portalServices`

Add both apex and `www` hostnames when a tenant needs both.

Keep local development aliases such as `localhost` and `127.0.0.1` mapped to the default tenant unless the task explicitly requires something else.

## Theme conventions

Each file in `src/themes/` should define portal-level CSS custom properties, including:

- `--tenant-logo-url`
- `--font-body`
- `--font-display`
- `--color-ink`
- `--color-paper`
- `--color-background`
- `--color-surface`
- `--color-accent`
- `--color-accent-deep`

`src/themes/base.css` is the default tenant theme and should remain a safe fallback.

Tenant-specific theme files should override only what they need and should not duplicate unrelated global styling.

## Routing and auth rules

- Resolve the tenant from the incoming hostname on every SSR request.
- Keep `/login` public per tenant.
- Keep `/portal` and `/portal/services/*` behind the auth gate.
- Keep service form submission on authenticated routes only. Do not add public-facing intake endpoints.
- Use the current request hostname when generating Supabase callback URLs so magic links return to the correct tenant domain.

## Content and implementation guidance

- Prefer server-rendered portal pages over client-heavy dashboard logic unless interactivity requires more.
- Keep tenant logic centralized in `src/config/tenants.ts` and `src/lib/tenants.ts`.
- Do not create per-client `AGENTS.md` files.
- Do not create separate deployments or separate Supabase projects unless the user explicitly asks.

## Deployment note

This repository is intended to run as one SSR app behind the Node adapter. Multi-tenant behavior should be driven by domain routing at the platform or proxy layer, not by separate builds.

## Security

Do not read or print secrets.

Do not expose unauthenticated service forms or callback URLs that point at the wrong hostname.
