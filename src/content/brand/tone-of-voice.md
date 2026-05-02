---
title: Advanced Analytica Tone of Voice
description: Core tone-of-voice standard governing written brand expression across Advanced Analytica communications.
draft: false
---

# Advanced Analytica Tone of Voice

This is the canonical tone-of-voice standard for written content across the site and any connected content-generation workflow.

## Core principles

- Collaborative
- Bold
- Optimistic

## Default voice contract

- Use first-person plural and second person by default: `we`, `our`, `you`, `your`
- Do not refer to us as `Advanced Analytica` in normal marketing or editorial copy
- Be direct, confident, optimistic, and audience-first
- Use contractions where they sound natural
- Ask at least one useful question in body copy when the format allows it
- End with a clear call to action when the format requires one

## Style guardrails

- Prefer short sentences with one idea per sentence
- Target 16 words per sentence in body copy
- Do not exceed 24 words per sentence in body copy
- Avoid exclamation points
- Do not use spaced em dashes like ` — `
- Prefer active voice
- Support broad claims with data or attribution

## Forbidden words

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
- no time like the present

## Preferred replacements

- `utilize` -> `use`
- `utilise` -> `use`
- `utilisation` -> `use`
- `organisations` -> `businesses`
- `solutions` -> `approach`
- `robust` -> `clear`
- `innovative` -> `new`
- `leverage` -> `use`

## Discouraged patterns

- Third-person self-reference
- Hedging such as `most likely` or `could be`
- Passive voice
- Flowery or decorative language
- Needlessly complex jargon
- Run-on sentences

## Required elements

- Customer benefit
- Clear point of view
- Call to action where the content type requires one

## Field defaults

- `headline`: target 10 words, hard max 14, no CTA required
- `subhead`: target 14 words, hard max 20, no CTA required
- `body_copy`: target 16 words, hard max 24, at least one question, CTA required
- `intro_paragraph`: target 16 words, hard max 24
- `call_to_action`: target 10 words, hard max 14, CTA required
- `social_post`: target 16 words, hard max 22, CTA required
- `email_copy`: target 16 words, hard max 24, at least one question, CTA required
- `case_study`: target 18 words, hard max 26

## Exceptions

- Case studies may use third-person reference to distinguish our role from a client's role
- Quotes and citations may preserve source wording
- Legal or regulated text defers to higher-priority legal and regulatory policy

## Operational use

This document is the human-readable source. The importable implementation lives in [`src/lib/brand/toneOfVoice.ts`](/Users/jonathanbowker/Projects/internal/prod/sites/advancedanalytica.co.uk/src/lib/brand/toneOfVoice.ts) and the machine-readable endpoint lives at [`src/pages/brand/tone-of-voice.json.ts`](/Users/jonathanbowker/Projects/internal/prod/sites/advancedanalytica.co.uk/src/pages/brand/tone-of-voice.json.ts).
