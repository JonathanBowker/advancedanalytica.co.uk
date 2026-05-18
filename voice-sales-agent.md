# Build Brief: AI Voice Sales Agent — Advanced Analytica

## Overview

Build a voice-driven AI sales qualification system that captures inbound leads via a magic link, validates them as genuine businesses, routes them to a persona-specific landing page, and connects them to a 15-minute AI voice discovery call powered by Twilio + Claude API + Google Text-to-Speech. All session data, transcripts, and discovery outputs are stored in Supabase.

---

## System Architecture

```
Website CTA
  → Gateway Page (role selector cards)
    → Persona-specific Landing Page (resonance questions + magic link form)
      → Business email captured → MX record validation → Cloudflare Turnstile check
        → Magic link email sent (Supabase Auth)
          → User clicks link → session loaded with role + UTM context
            → Twilio number revealed → user calls
              → Claude API agent loads role-specific prompt + session context
                → Google TTS delivers voice responses
                  → 15-minute session with time warnings
                    → Wrap-up: template sent to user, transcript stored in Supabase
                      → Internal team notified of qualified lead
```

---

## Stack

| Layer | Tool |
|---|---|
| Frontend / Site | Astro (existing) |
| Auth / Magic Link | Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Email | Supabase transactional email |
| Bot validation | Cloudflare Turnstile |
| Email validation | Server-side MX record DNS lookup (no external API needed) |
| Voice infrastructure | Twilio (inbound phone number, call routing) |
| AI agent brain | Claude API (claude-sonnet-4-20250514) |
| Text-to-speech | Google Cloud Text-to-Speech |
| Backend | FastAPI (Python) or Supabase Edge Functions |
| Hosting | DigitalOcean Droplet / App Platform (Docker container) |

---

## Phase 1: Gateway and Landing Pages (Astro)

### Gateway Page — `/talk-to-us`

- Full-screen card selector
- Cards for each persona: CEO, CMO, CFO, CISO, Creative Director, Content Creator, Approver, Compliance
- Each card is visually distinct, persona-named, with a one-line description of their core pain
- On click: routes to persona-specific landing page e.g. `/talk-to-us/cmo`
- UTM parameters from inbound URL are preserved and passed through to the landing page

### Persona Landing Pages — `/talk-to-us/[role]`

Each page has two columns (70/30 split):

**Left column (70%):**
- Eyebrow: role name e.g. "For CMOs"
- Headline: sharp, specific pain statement
- 4–5 resonance bullet points starting with "Your teams are..." or "You've invested in..." — no fluff, no question marks
- Closing line: "Does this resonate with you? Speak to a specialist agent. No sales. No obligation. Just a clear conversation to see if we're a good fit."
- Email input + Turnstile widget + Submit button

**Right column (30%):**
- Brief description of what the agent will cover for that role
- "15 minutes. At your pace. Confidential."

**Personas and resonance points:**

CEO:
- Your teams are generating AI content at scale with no governance controls
- You've invested in AI tools but can't prove you have control of the output
- Approval cycles are getting longer, not shorter
- You're exposed to brand risk you can't see or measure
- Your competitors are moving faster

CMO:
- Your brand team spends more time rejecting content than creating it
- AI tools are producing faster output that looks right but isn't on-brand
- Guidelines aren't being followed because nobody can find or understand them
- Approval backlogs are eating your team's time and budget
- You need to move faster without losing brand integrity

CFO:
- You've bought AI tools but costs keep climbing with no clear ROI
- Your teams keep asking for more tools because the ones they have don't work properly
- Approval cycles are a hidden cost centre nobody's measuring
- You're paying for speed and getting rework instead

CISO:
- Your people are uploading sensitive brand assets into public AI models
- You have no visibility into what data is leaving the organisation via AI prompts
- You can't audit or prove that AI-generated content meets your governance standards
- Shadow AI use is happening at scale and you can't stop it

Creative Director:
- Your team is doing admin and approvals instead of creative work
- AI tools are producing generic output that undermines your brand standards
- Budget expectations are rising but headcount isn't
- You're being asked to do more with the same team

Compliance:
- You have no audit trail for AI-generated brand content
- Policies and controls aren't being applied consistently across AI outputs
- You can't demonstrate governance of AI to regulators or board
- Brand risk is now a compliance risk and nobody owns it

---

## Phase 2: Magic Link and Validation (Backend)

### Email Submission Flow

1. User submits email on persona landing page
2. **Cloudflare Turnstile** validates human
3. **Server-side MX record lookup** on email domain:
   - If no valid MX records → reject with message "Please use a business email address"
   - Block common free domains (gmail, hotmail, yahoo, outlook personal etc.) as secondary filter
4. If valid business email:
   - Create session record in Supabase with: email, role, UTM params, timestamp
   - Send magic link email via Supabase Auth with session token in URL
5. Magic link is **one-time use** — expires after 24 hours or first click, whichever comes first

### Magic Link Email

- Subject: "Your Advanced Analytica specialist call"
- Body: brief intro, the Twilio number, instruction to call from their phone
- Include: "This call will be recorded for quality purposes"
- Mobile-optimised — clicking the number on mobile opens the dialler directly
- Do not publish the Twilio number on the public website

---

## Phase 3: Twilio Voice Agent

### Twilio Setup

- Single inbound Twilio number (UK and/or US)
- Calls routed via TwiML to FastAPI backend webhook
- On inbound call: Twilio sends caller ID + call SID to backend
- Backend looks up session by matching against expected caller (from magic link session) or falls back to asking for session code

### Call Session Routing

- When magic link is clicked, session record is updated: `session_token`, `role`, `call_window_start`
- When call comes in, backend loads session → determines role → loads correct agent system prompt
- If no matching session found: agent asks "Can you tell me your role and what you're hoping to discuss today?" and adapts

### Claude API Agent

**Model:** `claude-sonnet-4-20250514`

**System prompt structure (per role):**
```
You are a specialist discovery consultant for Advanced Analytica, an AI strategy and architecture consultancy. You are speaking with a [ROLE] at a [company type if known].

Your job is to:
1. Confirm their role and primary challenge in the first 2 minutes
2. Ask sharp diagnostic questions to understand their specific situation
3. Summarise what you've heard clearly and check for accuracy
4. Assess whether Advanced Analytica is a good fit
5. If a good fit: tell them a human specialist will follow up within 24 hours with a scoped proposal
6. If not a good fit: be honest, polite, and suggest who might be better placed

You are not a sales bot. You are an intelligent consultant. You listen more than you talk. You never push. You do not use filler phrases. You speak in clear, direct British English.

At 10 minutes: say "We have about 5 minutes left — let me make sure I've captured what matters most."
At 14 minutes: begin wrapping up and summarising.
At 15 minutes: close the call, confirm next steps, and end.

If at any point the caller seems frustrated or asks to speak to a human: offer to have Jonny or a team member call them back, and take a convenient time.

Session context:
- Role: [ROLE]
- Inbound page: [UTM_SOURCE / UTM_CONTENT]
- Notes: [any pre-loaded context from session]
```

### Google Cloud TTS

- Voice: `en-GB-Neural2-B` (professional male) or `en-GB-Neural2-C` (professional female) — TBC
- SSML for natural pauses and emphasis where needed
- Audio streamed back to Twilio via websocket or pre-generated per turn

### Time Management

- Backend tracks call start time
- At 10 min mark: inject time warning into next Claude prompt turn
- At 14 min mark: inject wrap-up instruction
- At 15 min: Twilio plays closing message and ends call

### Mid-call Sentiment Check

- Agent asks "Is this conversation useful so far?" at roughly the 7-minute mark
- If caller signals frustration or confusion: agent offers human handoff
- Human handoff flow: "Jonny isn't available right now but I can have him call you — what time works?" → stores callback slot in Supabase

---

## Phase 4: Data Storage (Supabase)

### Tables Required

**sessions**
- id, email, role, utm_source, utm_medium, utm_content, utm_campaign, created_at, link_used_at, link_expires_at, call_started_at, call_ended_at, call_duration_seconds

**call_transcripts**
- id, session_id, transcript_text, summary, fit_assessment (good_fit / not_fit / uncertain), callback_requested, callback_time, created_at

**leads**
- id, session_id, email, role, company_domain, summary, status (new / reviewed / converted / rejected), created_at

### Post-call Automation

- Twilio webhook fires on call end → backend fetches transcript → Claude API generates structured summary → stored in `call_transcripts`
- Email sent to internal team (jonny@advancedanalytica.co.uk) with: role, summary, fit assessment, transcript link
- Lead record created in `leads` table with status `new`

---

## Phase 5: Infrastructure

- Deployed as Docker container on DigitalOcean App Platform or Droplet
- FastAPI backend handles: Twilio webhooks, magic link validation, MX lookup, Claude API calls, Supabase writes
- Environment variables: Twilio credentials, Claude API key, Google TTS credentials, Supabase URL + service key
- Logging: all inbound calls, sessions, and errors logged to Supabase `logs` table
- Pay-as-you-go on all services — no fixed monthly infrastructure cost beyond the Droplet

---

## Personas to Build (Phase 1 scope)

Priority order:
1. CEO
2. CMO
3. CISO
4. CFO
5. Creative Director
6. Compliance

---

## Out of Scope (Phase 1)

- Stripe payment gateway (future phase — paywall on magic link)
- Multiple languages
- WhatsApp or SMS delivery
- CRM integration (future: HubSpot or Pipedrive)
- Public-facing call booking / Calendly integration (manual for now)

---

## Deliverables

- [ ] Gateway card selector page (Astro)
- [ ] 6x persona landing pages (Astro)
- [ ] Magic link flow with MX validation and Turnstile (Supabase + FastAPI)

---

## Recommended Repo Split

### Repo 1 — `advancedanalytica.co.uk`

Owns:

- Public acquisition pages
- Gateway selector page
- Persona landing pages
- UTM capture and pass-through
- Auth callback UX
- Authenticated call-instructions page

Should not own:

- Twilio webhooks
- Voice orchestration
- Claude runtime logic
- Google TTS integration
- Transcript processing
- Lead qualification pipeline

Recommended routes in this repo:

- `/talk-to-us`
- `/talk-to-us/[role]`
- `/talk-to-us/check-your-email`
- `/talk-to-us/call`
- `/auth/callback`

### Repo 2 — `advancedanalytica-voice-agent`

Owns:

- FastAPI backend
- Turnstile verification
- MX lookup and free-domain blocking
- Session creation and state transitions
- Supabase service-role writes
- Twilio inbound call webhooks
- Call session state
- Claude orchestration
- Google TTS integration
- Transcript and summary generation
- Internal lead notifications

Reason for the split:

- Different runtime and operational model
- Different secrets and failure modes
- Voice/webhook system should deploy independently of the Astro site
- Cleaner ownership boundary for auth-and-call workflow

### Ownership Boundary

Recommended integration pattern:

1. Astro page submits role + email + UTM + Turnstile token to the voice backend
2. Voice backend validates business email, creates lead session, and sends magic link
3. Supabase auth callback returns user to site UX
4. Site fetches session-backed call instructions from backend or Supabase
5. Twilio talks only to the voice backend

Avoid splitting validation logic across both repos. One backend should own:

- Turnstile verification
- MX validation
- free-domain blocking
- rate limiting
- session creation

---

## Recommended Folder Structure

### Astro Repo

```txt
src/
  pages/
    talk-to-us/
      index.astro
      check-your-email.astro
      call.astro
      [role].astro
    auth/
      callback.astro
  components/
    talkToUs/
      GatewayCards.astro
      PersonaHero.astro
      PersonaResonanceList.astro
      BusinessEmailForm.jsx
      CallInstructions.astro
  lib/
    talkToUs/
      personas.ts
      utm.ts
      validation.ts
```

### Voice Backend Repo

```txt
app/
  main.py
  api/
    routes/
      health.py
      lead_sessions.py
      auth.py
      twilio.py
      calls.py
      internal.py
  core/
    config.py
    logging.py
    security.py
  services/
    turnstile.py
    email_validation.py
    magic_links.py
    session_service.py
    twilio_service.py
    claude_service.py
    tts_service.py
    transcript_service.py
    notification_service.py
  models/
    lead_session.py
    call_session.py
    transcript.py
    summary.py
  schemas/
    lead_sessions.py
    auth.py
    twilio.py
    calls.py
  prompts/
    ceo.txt
    cmo.txt
    ciso.txt
    cfo.txt
    creative_director.txt
    compliance.txt
  utils/
    phone.py
    timebox.py
    utm.py
tests/
  api/
  services/
  fixtures/
infra/
  Dockerfile
  app-platform.yaml
  env.example
```

---

## Supabase Schema

### Design Notes

- Use Supabase Auth only for identity and email link completion
- Store lead and call workflow state in application tables
- Use service-role access from the voice backend for writes
- Keep raw transcript turns separate from generated summaries

### Tables

#### `lead_sessions`

- `id uuid primary key default gen_random_uuid()`
- `email text not null`
- `company_domain text not null`
- `role text not null`
- `status text not null default 'pending_validation'`
- `utm_source text`
- `utm_medium text`
- `utm_campaign text`
- `utm_content text`
- `utm_term text`
- `landing_path text`
- `turnstile_verified_at timestamptz`
- `mx_verified_at timestamptz`
- `magic_link_sent_at timestamptz`
- `link_used_at timestamptz`
- `link_expires_at timestamptz`
- `call_window_start timestamptz`
- `call_window_end timestamptz`
- `call_instructions_viewed_at timestamptz`
- `twilio_number text`
- `session_code text`
- `auth_user_id uuid`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Suggested status values:

- `pending_validation`
- `validated`
- `magic_link_sent`
- `authenticated`
- `call_started`
- `call_completed`
- `callback_requested`
- `closed`

#### `call_sessions`

- `id uuid primary key default gen_random_uuid()`
- `lead_session_id uuid not null references lead_sessions(id) on delete cascade`
- `twilio_call_sid text unique not null`
- `caller_number text`
- `started_at timestamptz`
- `ended_at timestamptz`
- `duration_seconds integer`
- `ended_reason text`
- `role_resolved text`
- `human_handoff_requested boolean not null default false`
- `callback_time text`
- `created_at timestamptz not null default now()`

#### `call_turns`

- `id uuid primary key default gen_random_uuid()`
- `call_session_id uuid not null references call_sessions(id) on delete cascade`
- `speaker text not null`
- `sequence_no integer not null`
- `utterance_text text not null`
- `utterance_ts timestamptz not null default now()`
- `model_name text`
- `metadata jsonb not null default '{}'::jsonb`

#### `call_summaries`

- `id uuid primary key default gen_random_uuid()`
- `call_session_id uuid not null references call_sessions(id) on delete cascade`
- `summary text not null`
- `fit_assessment text not null`
- `key_pains jsonb not null default '[]'::jsonb`
- `recommended_next_step text`
- `callback_requested boolean not null default false`
- `callback_time text`
- `generated_at timestamptz not null default now()`

#### `leads`

- `id uuid primary key default gen_random_uuid()`
- `lead_session_id uuid not null references lead_sessions(id) on delete cascade`
- `email text not null`
- `role text not null`
- `company_domain text not null`
- `status text not null default 'new'`
- `owner text`
- `qualification_score integer`
- `summary_id uuid references call_summaries(id) on delete set null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

#### `event_logs`

- `id uuid primary key default gen_random_uuid()`
- `scope text not null`
- `scope_id text`
- `event_type text not null`
- `payload jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`

### First-Pass SQL Migration Draft

```sql
create extension if not exists pgcrypto;

create table if not exists lead_sessions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  company_domain text not null,
  role text not null,
  status text not null default 'pending_validation',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  landing_path text,
  turnstile_verified_at timestamptz,
  mx_verified_at timestamptz,
  magic_link_sent_at timestamptz,
  link_used_at timestamptz,
  link_expires_at timestamptz,
  call_window_start timestamptz,
  call_window_end timestamptz,
  call_instructions_viewed_at timestamptz,
  twilio_number text,
  session_code text,
  auth_user_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lead_sessions_email on lead_sessions (email);
create index if not exists idx_lead_sessions_status on lead_sessions (status);
create index if not exists idx_lead_sessions_role on lead_sessions (role);

create table if not exists call_sessions (
  id uuid primary key default gen_random_uuid(),
  lead_session_id uuid not null references lead_sessions(id) on delete cascade,
  twilio_call_sid text not null unique,
  caller_number text,
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds integer,
  ended_reason text,
  role_resolved text,
  human_handoff_requested boolean not null default false,
  callback_time text,
  created_at timestamptz not null default now()
);

create index if not exists idx_call_sessions_lead_session_id on call_sessions (lead_session_id);

create table if not exists call_turns (
  id uuid primary key default gen_random_uuid(),
  call_session_id uuid not null references call_sessions(id) on delete cascade,
  speaker text not null,
  sequence_no integer not null,
  utterance_text text not null,
  utterance_ts timestamptz not null default now(),
  model_name text,
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists idx_call_turns_unique_sequence
  on call_turns (call_session_id, sequence_no);

create table if not exists call_summaries (
  id uuid primary key default gen_random_uuid(),
  call_session_id uuid not null references call_sessions(id) on delete cascade,
  summary text not null,
  fit_assessment text not null,
  key_pains jsonb not null default '[]'::jsonb,
  recommended_next_step text,
  callback_requested boolean not null default false,
  callback_time text,
  generated_at timestamptz not null default now()
);

create unique index if not exists idx_call_summaries_call_session_id
  on call_summaries (call_session_id);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  lead_session_id uuid not null references lead_sessions(id) on delete cascade,
  email text not null,
  role text not null,
  company_domain text not null,
  status text not null default 'new',
  owner text,
  qualification_score integer,
  summary_id uuid references call_summaries(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_leads_status on leads (status);
create index if not exists idx_leads_email on leads (email);

create table if not exists event_logs (
  id uuid primary key default gen_random_uuid(),
  scope text not null,
  scope_id text,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_event_logs_scope on event_logs (scope, scope_id);
create index if not exists idx_event_logs_event_type on event_logs (event_type);
```

---

## API Contract

### `POST /v1/lead-sessions`

Purpose:

- Verify Turnstile token
- Validate business email
- Block free-email providers
- Perform MX lookup
- Create lead session
- Send magic link

Request:

```json
{
  "email": "name@company.com",
  "role": "cmo",
  "landingPath": "/talk-to-us/cmo",
  "turnstileToken": "token",
  "utm": {
    "source": "linkedin",
    "medium": "paid-social",
    "campaign": "ai-governance-q3",
    "content": "cmo-ad-1",
    "term": ""
  }
}
```

Response:

```json
{
  "ok": true,
  "sessionId": "uuid",
  "status": "magic_link_sent",
  "expiresAt": "2026-05-10T12:00:00Z"
}
```

Error response examples:

```json
{ "ok": false, "error": "invalid_email" }
{ "ok": false, "error": "free_email_not_allowed" }
{ "ok": false, "error": "mx_lookup_failed" }
{ "ok": false, "error": "turnstile_failed" }
{ "ok": false, "error": "rate_limited" }
```

### `POST /v1/auth/callback-reconcile`

Purpose:

- Mark lead session as authenticated after Supabase callback
- Optionally attach auth user id to session

Request:

```json
{
  "sessionId": "uuid",
  "authUserId": "uuid"
}
```

### `GET /v1/lead-sessions/{sessionId}/call-brief`

Purpose:

- Return authenticated call instructions
- Reveal Twilio number only after login
- Return fallback session code

Response:

```json
{
  "sessionId": "uuid",
  "role": "cmo",
  "twilioNumber": "+44...",
  "sessionCode": "CMO-4821",
  "callWindowStart": "2026-05-09T10:00:00Z",
  "callWindowEnd": "2026-05-10T10:00:00Z"
}
```

### `POST /v1/twilio/inbound`

Purpose:

- Twilio inbound call entrypoint
- Resolve lead session by caller or session code
- Load role-specific prompt

### `POST /v1/twilio/status`

Purpose:

- Receive Twilio call lifecycle updates
- Persist status changes and end reasons

### `POST /v1/twilio/gather`

Purpose:

- Handle call turns for non-streaming implementation
- Pass transcript turn into Claude and return response payload

Alternative:

- use a websocket or Twilio media stream endpoint if real-time streaming is required

### `POST /v1/calls/{callSessionId}/complete`

Purpose:

- Finalize call
- Generate summary
- Create or update lead
- Trigger internal notification

### Internal-only: `POST /v1/internal/notify-qualified-lead`

Purpose:

- Send internal lead summary to team inbox

---

## Page Map

### `/talk-to-us`

- Gateway selector page
- Persona cards
- UTM preservation from inbound campaign links

### `/talk-to-us/[role]`

- Persona-specific landing page
- Resonance bullets
- Email input
- Turnstile widget
- Submit action to backend

### `/talk-to-us/check-your-email`

- Post-submit state
- Confirms email sent if validation passed
- Does not expose Twilio number publicly

### `/auth/callback`

- Supabase auth return point
- Reconciles auth state with lead session
- Redirects authenticated user to `/talk-to-us/call`

### `/talk-to-us/call`

- Authenticated page only
- Reveals Twilio number
- Shows session code fallback
- Explains expected 15-minute call flow
- Includes recording notice

### Optional Failure / Expiry States

- `/talk-to-us/session-expired`
- `/talk-to-us/not-a-fit`

---

## Deployment Layout

### Astro Site

- Keep on the current DigitalOcean App Platform setup
- Continue to serve public marketing pages and auth UX
- Only expose frontend-safe env vars

### Voice Backend

- Deploy as a separate App Platform service or Docker-based droplet
- Start with App Platform for speed
- Move to a dedicated container host if Twilio media streaming requires tighter control

### External Services

- Supabase: auth and application data
- Twilio: phone number and webhook delivery
- Cloudflare: Turnstile
- Anthropic: Claude runtime
- Google Cloud: TTS

### Voice Backend Environment Variables

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `TURNSTILE_SECRET_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `ANTHROPIC_API_KEY`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `APP_BASE_URL`
- `PUBLIC_SITE_URL`

### Traffic Flow

1. User lands on Astro page
2. Astro submits lead request to voice backend
3. Voice backend validates and sends magic link
4. Supabase callback returns user to Astro
5. Astro fetches call brief for authenticated user
6. User calls Twilio number
7. Twilio sends webhook events to voice backend
8. Voice backend stores transcripts and summaries in Supabase

---

## First-Pass Delivery Tickets

### Phase 1 — Website Entry Flow

1. Create `/talk-to-us` gateway page with persona cards and UTM pass-through
2. Create `/talk-to-us/[role]` template for CEO, CMO, CISO, CFO, Creative Director, and Compliance
3. Build shared business email form component with Turnstile support
4. Add `/talk-to-us/check-your-email` success page
5. Add `/talk-to-us/call` authenticated instructions page

### Phase 2 — Session and Auth Backend

1. Create voice backend repo and FastAPI app skeleton
2. Add `POST /v1/lead-sessions`
3. Implement free-domain blocking and MX validation
4. Implement Turnstile verification
5. Add Supabase session persistence
6. Send Supabase magic link with role and session context
7. Add `POST /v1/auth/callback-reconcile`

### Phase 3 — Twilio Call Handling

1. Buy and configure Twilio inbound number
2. Add Twilio inbound and status webhook endpoints
3. Create call session records
4. Resolve lead session by caller number or session code
5. Load role prompt per session
6. Add 10-minute and 14-minute call time cues

### Phase 4 — AI Call Runtime

1. Add Claude service wrapper
2. Add Google TTS service wrapper
3. Build turn-based response loop
4. Persist transcript turns
5. Add frustration or callback detection
6. Add end-of-call structured summary generation

### Phase 5 — Sales Ops and Internal Handoff

1. Create `leads` and `call_summaries` records on completed calls
2. Send internal qualified-lead email notification
3. Add callback request capture
4. Add operator review view in Supabase or internal admin surface
5. Define fit scoring and ownership workflow

---

## Recommended Build Order

1. Build the Astro gateway and persona landing pages first
2. Stand up the separate FastAPI repo
3. Create Supabase schema and session API
4. Wire magic-link flow end to end
5. Add authenticated call instructions page
6. Add Twilio call entrypoint
7. Add Claude and TTS orchestration
8. Add transcript summarisation and internal notifications

This keeps the highest-risk technical work isolated until the entry funnel and session model are proven.
- [ ] Magic link email template
- [ ] Twilio inbound number configured and routed
- [ ] FastAPI backend with Claude API + Google TTS integration
- [ ] 6x role-specific system prompts
- [ ] Time management logic (10-min warning, 15-min close)
- [ ] Mid-call sentiment check and human handoff flow
- [ ] Supabase schema (sessions, transcripts, leads, logs)
- [ ] Post-call summary automation
- [ ] Internal lead notification email
- [ ] Docker deployment on DigitalOcean

---

## Definition of Done

A test caller can:
1. Land on the gateway page, select a role, and reach a persona-specific page
2. Submit a business email and receive a magic link
3. Click the link, see the Twilio number, and call it
4. Complete a 15-minute discovery conversation with the AI agent
5. Receive a follow-up template or callback confirmation

Internally:
- Full transcript and summary appear in Supabase within 5 minutes of call end
- Lead notification email received by internal team
- Lead visible in `leads` table with status `new`
