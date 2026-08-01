create extension if not exists pgcrypto;

create or replace function public.is_internal_portal_user()
returns boolean
language sql
stable
as $$
  select
    coalesce((auth.jwt() ->> 'email') ilike '%@advancedanalytica.co.uk', false)
    or coalesce((auth.jwt() -> 'app_metadata' -> 'roles') ?| array['admin', 'operator', 'developer', 'consultant', 'partner'], false)
    or coalesce((auth.jwt() -> 'user_metadata' -> 'roles') ?| array['admin', 'operator', 'developer', 'consultant', 'partner'], false)
    or lower(coalesce(auth.jwt() #>> '{app_metadata,role}', '')) in ('admin', 'operator', 'developer', 'consultant', 'partner')
    or lower(coalesce(auth.jwt() #>> '{user_metadata,role}', '')) in ('admin', 'operator', 'developer', 'consultant', 'partner');
$$;

create table if not exists public.internal_sheets (
  id uuid primary key default gen_random_uuid(),
  tenant_slug text not null default 'advanced-analytica',
  slug text not null,
  sheet_type text not null default 'Service' check (sheet_type in ('Product', 'Service', 'Offer')),
  title text not null default '',
  audience text not null default '',
  strapline text not null default '',
  summary text not null default '',
  outcomes text not null default '',
  assumptions text not null default '',
  pricing_rows jsonb not null default '[]'::jsonb check (jsonb_typeof(pricing_rows) = 'array'),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_slug, slug)
);

create index if not exists internal_sheets_tenant_updated_idx
  on public.internal_sheets (tenant_slug, updated_at desc);

alter table public.internal_sheets enable row level security;

drop policy if exists "Internal users can read internal sheets" on public.internal_sheets;
create policy "Internal users can read internal sheets"
on public.internal_sheets
for select
to authenticated
using (public.is_internal_portal_user());

drop policy if exists "Internal users can create internal sheets" on public.internal_sheets;
create policy "Internal users can create internal sheets"
on public.internal_sheets
for insert
to authenticated
with check (
  public.is_internal_portal_user()
  and (created_by is null or created_by = auth.uid())
  and (updated_by is null or updated_by = auth.uid())
);

drop policy if exists "Internal users can update internal sheets" on public.internal_sheets;
create policy "Internal users can update internal sheets"
on public.internal_sheets
for update
to authenticated
using (public.is_internal_portal_user())
with check (
  public.is_internal_portal_user()
  and (updated_by is null or updated_by = auth.uid())
);

drop policy if exists "Internal users can delete internal sheets" on public.internal_sheets;
create policy "Internal users can delete internal sheets"
on public.internal_sheets
for delete
to authenticated
using (public.is_internal_portal_user());

create or replace function public.set_internal_sheets_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_internal_sheets_updated_at on public.internal_sheets;
create trigger set_internal_sheets_updated_at
before update on public.internal_sheets
for each row
execute function public.set_internal_sheets_updated_at();

insert into public.internal_sheets (
  tenant_slug,
  slug,
  sheet_type,
  title,
  audience,
  strapline,
  summary,
  outcomes,
  assumptions,
  pricing_rows
)
values
  (
    'advanced-analytica',
    'ai-ready-knowledge-pack',
    'Service',
    'AI-Ready Knowledge Pack',
    'Consultants and delivery partners',
    'Turn critical organisational knowledge into a structured asset AI systems can safely use.',
    'A focused engagement that captures source material, structures the knowledge layer, validates retrieval quality, and hands over an AI-ready pack consultants can position with confidence.',
    'Defined scope, source inventory, structured knowledge asset, usage guidance, validation notes, and an adoption-ready handoff pack.',
    'Pricing is indicative until scope, source quality, security constraints, and partner delivery responsibilities are confirmed.',
    '[
      {
        "tier": "Foundation",
        "description": "One constrained business domain with curated source material and basic validation.",
        "price": "POA",
        "notes": "Good fit for pilot offers and proof points."
      },
      {
        "tier": "Operating Pack",
        "description": "Expanded domain model, richer instructions, review loop, and delivery handoff.",
        "price": "POA",
        "notes": "Recommended starting point for live client work."
      },
      {
        "tier": "Enterprise",
        "description": "Multi-domain pack with governance, validation evidence, and partner enablement.",
        "price": "POA",
        "notes": "Requires scoped delivery plan."
      }
    ]'::jsonb
  ),
  (
    'advanced-analytica',
    'brando',
    'Product',
    'Brando',
    'Enterprise brand, AI, technology, and legal leaders',
    'A Brand Operator that makes brand knowledge executable inside AI-assisted workflows.',
    'Brando converts brand intent, rules, approvals, and exceptions into an interconnected data asset governed by the IBOM framework.',
    'Brand model, controlled agent workflow, MCP-ready knowledge layer, validation evidence, audit trail, and implementation roadmap.',
    'Position pricing as scoped programme work. Do not publish commercial figures outside approved partner material.',
    '[
      {
        "tier": "Readiness",
        "description": "Assess current brand governance, AI exposure, and priority workflows.",
        "price": "POA",
        "notes": "Useful pre-sales diagnostic."
      },
      {
        "tier": "Implementation",
        "description": "Build the governed Brand Operator for a defined workflow set.",
        "price": "POA",
        "notes": "Scoped through IBOM delivery stages."
      }
    ]'::jsonb
  )
on conflict (tenant_slug, slug) do update
set
  sheet_type = excluded.sheet_type,
  title = excluded.title,
  audience = excluded.audience,
  strapline = excluded.strapline,
  summary = excluded.summary,
  outcomes = excluded.outcomes,
  assumptions = excluded.assumptions,
  pricing_rows = excluded.pricing_rows;
