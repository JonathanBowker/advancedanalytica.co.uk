# Functions And Roles SEO Implementation Plan

## Purpose

This plan turns the current recommendation into an implementation path for the Advanced Analytica site.

The core principle is:

`functions` are audience hub pages for search and navigation.

`roles` are journey-routing pages unless they are expanded into genuinely distinct landing pages.

## Current Position

The site currently has:

- indexable function hub pages at `/functions/[slug]/`
- indexable role pages at `/functions/[slug]/roles/[role]/`
- persona pages at `/personas/[slug]/`
- strong content types for acquisition:
  - `/opinions/[slug]/`
  - `/use-cases/[slug]/`
  - `/resources/[slug]/`

From an SEO point of view:

- function pages are the strongest part of this structure
- role pages are structurally repetitive and risk thin-page duplication
- persona pages are useful for audience modelling and journey design, but are weaker search assets by default

## Target Model

Use a two-layer model:

1. Search layer
   Pages designed to rank and attract organic traffic.

2. Routing layer
   Pages designed to segment visitors by function and role, then move them to relevant content faster.

## Indexing Policy

### Keep indexable

- `/`
- `/services/*`
- `/enterprise/`
- `/developers/*`
- `/opinions/`
- `/opinions/[slug]/`
- selected `/opinions/tag/[tag]/`
- selected `/opinions/series/[series]/`
- `/use-cases/`
- `/use-cases/[slug]/`
- selected `/use-cases/tag/[tag]/`
- `/resources/`
- `/resources/[slug]/`
- `/functions/[slug]/`

### Make non-indexable by default

- `/functions/[slug]/roles/[role]/`
- `/personas/[slug]/`
- utility pages
- auth pages
- routing-only pages

### Conditional index

These can become indexable later if they are expanded materially:

- role pages with substantial unique copy
- persona pages with strong unique intent and proof content
- high-depth tag or series pages

## Page-Type Purpose

### Functions

Purpose:

- audience hub page
- search landing page
- route into relevant use cases, opinions, and resources
- ask the visitor to identify their role

Success criteria:

- distinct audience intent
- strong intro copy tied to function-level commercial problems
- clear internal links to relevant content
- role-selector block that reduces time to relevant content

### Roles

Purpose:

- journey-routing page
- contextual selector for function-specific users
- optional deeper page if the role becomes content-rich

Success criteria:

- help a visitor self-identify quickly
- send them to the right content cluster
- avoid competing with stronger acquisition pages unless the role page is materially expanded

### Personas

Purpose:

- strategic audience modelling layer
- messaging and content planning support
- optional public support content, not primary SEO surface

## User Journey Design

### Journey entry points

Visitors will most often enter through:

- opinion articles
- use cases
- resources
- function pages

### Journey logic

1. Visitor lands on content from search, link, or campaign
2. Page asks: `What is your function?`
3. Visitor chooses a function
4. Function page explains the function-level value proposition
5. Function page asks: `What is your role?`
6. Visitor chooses a role
7. Site shows the most relevant:
   - opinions
   - use cases
   - resources
   - CTA

## Placement Recommendations

### Opinion pages

Add a post-content segmentation block:

- prompt: `What is your function?`
- options mapped to `/functions/[slug]/`

Placement:

- after the article body
- before related posts or final CTA

### Use-case pages

Add a contextual routing block:

- prompt: `How does this apply to your function?`
- function links or cards

Placement:

- after outcome/results section
- before related use cases

### Resource pages

Add a role/function routing block:

- prompt: `Which function are you leading?`
- then route to function hub or filtered content

Placement:

- near download CTA
- or directly after the summary/introduction

### Function pages

Keep function pages indexable and strengthen them as hubs.

Required blocks:

- search-aligned intro
- function value proposition
- relevant use cases
- relevant opinions
- role selection prompt
- CTA

### Role selection

Best current implementation:

- keep role selection on the function page itself
- use the role cards to change the recommended content set inline
- keep dedicated role pages available if needed, but plan to `noindex` them unless expanded

## Recommended Technical Changes

### Phase 1: Indexing control

Goal:

- separate search pages from routing pages

Tasks:

- add `noindex` support to role pages
- add `noindex` support to persona pages
- leave function pages indexable

Files likely involved:

- `src/pages/functions/[slug]/roles/[role].astro`
- `src/pages/personas/[slug].astro`
- shared layout or SEO helpers if robots meta is centralized

### Phase 2: Function-page strengthening

Goal:

- make function hubs more valuable as audience landing pages

Tasks:

- improve H1/subhead wording toward search intent
- tighten intros around governed AI problems for each function
- improve related content relevance
- make role selection more prominent

Files likely involved:

- `src/pages/functions/[slug].astro`
- `src/lib/businessFunctions.ts`

### Phase 3: Role-routing optimization

Goal:

- use roles as routing tools without relying on them as search pages

Tasks:

- keep role cards on function pages
- optionally update role pages to emphasize routing over ranking
- optionally reduce crawl priority via `noindex`

Files likely involved:

- `src/pages/functions/[slug].astro`
- `src/pages/functions/[slug]/roles/[role].astro`
- `src/content/roles/*`

### Phase 4: Content-entry prompts

Goal:

- move visitors faster from search content to function/role-matched content

Tasks:

- add function prompt block to opinion pages
- add function prompt block to use-case pages
- add function prompt block to resource pages

Files likely involved:

- `src/pages/opinions/[slug].astro`
- `src/pages/use-cases/[slug].astro`
- `src/pages/resources/[slug].astro`
- possibly a new shared component for function selection

### Phase 5: Role-specific content curation

Goal:

- improve relevance after role selection

Tasks:

- create role-to-content mapping
- tailor related opinions/use cases/resources by role, not only by function
- align CTA text to role context

Files likely involved:

- `src/lib/businessFunctions.ts`
- `src/content/roles/*`
- function and role templates

## Content Strategy Rules

### Function pages should:

- target real function-level problems
- use clear audience language
- link into proof content
- convert visitors into deeper journeys

### Role pages should not be indexable unless they have:

- unique problem framing
- unique proof or case material
- unique FAQ content
- distinct content curation
- meaningful differentiation from sibling roles

### Persona pages should:

- remain secondary in public SEO
- support audience design and content planning
- be indexed only if intentionally upgraded into strong standalone pages

## Success Metrics

Track:

- organic traffic to function pages
- click-through from articles to function hubs
- click-through from function pages to role selections
- click-through from role selections to relevant content
- contact or assessment conversion by function path
- engagement depth on function pages
- whether role pages attract low-value impressions without clicks

## Decision Summary

Use this as the default policy:

- `functions` are SEO hubs
- `roles` are routing pages
- `personas` are strategic support pages
- `opinions`, `use-cases`, and `resources` remain the main acquisition layer

## Recommended Next Step

Implement Phase 1 first:

- make role pages `noindex`
- make persona pages `noindex`
- leave function pages indexable

Then move to Phase 4:

- add `What is your function?` prompts to opinions, use cases, and resources

That gives the site a clearer separation between pages that should rank and pages that should route.
