---
id: advanced-analytica.standards.verbal-identity.tone-of-voice
key: advanced-analytica.standards.verbal-identity.tone-of-voice
title: Advanced Analytica Tone of Voice
description: Core tone-of-voice standard governing written brand expression across Advanced Analytica communications.
policy_kind: standard
pillar: standards
category: verbal_identity
subcategory: tone_of_voice
document_type: policy_standard

version: 2.5.4
status: active
lifecycle_state: published
effective_date: 2026-05-03
created: 2026-04-06
last_modified: 2026-05-03
next_review: 2026-11-03

owner:
  team: Global Brand Team
  steward: Brand Governance
approved_by:
  - Brand Governance

schema:
  type: BrandVoiceStandard
  version: brando-schema-1.0
  validation_status: schema_validated

naming:
  client_term: Tone of Voice
  canonical_term: Verbal Identity
  policy_label: Tone of Voice
  rationale: >
    Client uses "Tone of Voice" as a standalone standard within brand guidelines.
    Brando maps this to the verbal_identity category and tone_of_voice subcategory.
    This field is used for terminology mapping only. It is not part of the enforcement logic.

scope:
  applies_to:
    channels:
      - website
      - linkedin
      - email
      - newsletter
      - event_platform

    content_types:
      - headline
      - subhead
      - body_copy
      - intro_paragraph
      - call_to_action
      - social_post
      - email_copy
      - blog_post
      - case_study
      - thought_leadership
      - event_announcement
      - economic_buyer_message

    audiences:
      - marketing_manager
      - content_creator
      - social_media
      - executive_communications
      - new_hire
      - ai_agent

    content_zones:
      - rendered_copy
      - quotation
      - citation
      - metadata

  excludes:
    content_types:
      - legal_disclaimer
      - regulated_disclosure
      - invoice
      - procurement_template

  notes:
    - Applies to generated and edited marketing/editorial copy.
    - Does not apply to quoted source material unless explicitly rewritten.
    - Does not apply to legal or compliance text unless downstream policy explicitly says so.

policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - advanced-analytica.applications.*
    - advanced-analytica.standards.verbal-identity.tone-of-voice
    - campaign.local
  conflict_resolution:
    mode: higher_priority_wins
    notes:
      - If application-specific policy conflicts with this standard, application policy may narrow this standard only within its declared scope.
      - Application-specific policy may not weaken higher-priority legal, regulatory, or safety constraints.
      - Exceptions must be explicit and machine-readable to override defaults.

inheritance:
  inherits_from:
    - advanced-analytica.brand.core
  may_be_overridden_by:
    - advanced-analytica.applications.case-study
    - advanced-analytica.applications.linkedin
    - advanced-analytica.applications.thought-leadership
    - advanced-analytica.legal.*
    - advanced-analytica.market.*

resolution:
  resolve_inheritance_before_validation: true
  resolve_exceptions_before_rule_execution: true
  materialize_effective_policy: true
  effective_policy_output:
    include_resolved_rules: true
    include_applied_exceptions: true
    include_precedence_path: true

principles:
  required:
    - collaborative
    - bold
    - optimistic
  definitions:
    collaborative:
      description: We listen, encourage conversation, and use empathy to connect with our audiences.
    bold:
      description: We cut through the noise by being truth tellers, confident, candid, and clear in our point of view.
    optimistic:
      description: We see the opportunity beyond the challenge.

voice_policy:
  point_of_view:
    default_required:
      - first_person_plural
      - second_person
    default_forbidden:
      - third_person_self_reference
    notes:
      - Use "we", "our", "you", "your".
      - Do not refer to Advanced Analytica as "Advanced Analytica" in normal marketing/editorial copy.
  tone_characteristics:
    required:
      - collaborative
      - direct
      - confident
      - optimistic
      - audience_first
    discouraged:
      - inwardly_focused
      - hedging
      - overly_formal
      - ornate
  rhetorical_preferences:
    contractions:
      preferred: true
      examples:
        preferred:
          - today's
          - we'll
          - you'll
          - it's
        avoid:
          - today is
          - we will
          - you will
          - it is
    questions:
      encouraged: true
      minimum_default: 1
    punctuation:
      exclamation_points: forbidden
      # FIX v2.3.0 / confirmed v2.4.0: em_dash declaration removed entirely.
      # Prior v2.2.0 declared em_dash: allowed, creating a direct conflict with D010
      # which hard-fails em dash use. Em dashes are forbidden. D010 governs.
    sentence_style:
      target_max_words: 16
      hard_max_words: 24
      one_idea_per_sentence: preferred
      rhythm: varied_length_for_effect
    calls_to_action:
      required: true
      minimum_default: 1
      style: clear_and_concise
    data_support:
      preferred: true
      required_when: broad_claims_present

lexical_policy:
  forbidden_words:
    exact:
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
  discouraged_words:
    - journey
    - best-in-class
    - transformative
  preferred_replacements:
    leverage: use
    leveraging: using
    innovative: new
    innovation: new approach
    synergy: collaboration
    utilize: use
    utilise: use
    utilisation: use
    organisations: businesses
    solutions: approach
    robust: clear
    optimal: appropriate
    optimise: improve
    myriad: many
    "no time like the present": "it's time to act"

pattern_policy:
  forbidden_patterns:
    - id: third_person_self_reference
      description: Do not refer to Advanced Analytica as "Advanced Analytica" or "Advanced Analytica's" in normal marketing/editorial copy.
      examples:
        fail:
          - "Advanced Analytica's approach includes..."
          - "Advanced Analytica helps businesses reconstruct..."
        pass:
          - "Our approach includes..."
          - "We help you reconstruct..."
    - id: unnecessary_qualifiers
      description: Remove hedging language that weakens impact.
      trigger_phrases:
        - most likely
        - at some point
        - depending on how you look at it
        - could be
      examples:
        fail:
          - "This strategy will most likely yield positive results at some point."
        pass:
          - "This strategy will yield positive results."
    - id: passive_voice
      description: Prefer active voice in nearly all brand copy.
      examples:
        fail:
          - "We were tasked with leading..."
        pass:
          - "We led..."
    - id: flowery_language
      description: Avoid decorative or archaic phrasing.
      trigger_phrases:
        - no time like the present
        - seems apt here
      examples:
        fail:
          - "No time like the present seems apt here."
        pass:
          - "It's time to consider..."
    - id: jargon_complexity
      description: Simplify unnecessarily complex language.
      examples:
        fail:
          - "In terms of the best use of funding sources, we..."
        pass:
          - "To improve how we use funding sources, we..."
    - id: run_on_sentences
      description: Break long sentences into focused short units.
      examples:
        fail:
          - "What you might not expect is how much it matters to..."
        pass:
          - "It matters. More than you might expect."

required_elements:
  default:
    - customer_benefit
    - clear_point_of_view
    - call_to_action
  conditional:
    - id: data_support_for_broad_claim
      required_when:
        broad_claims_present: true

field_applicability:
  headline:
    sentence_style:
      target_max_words: 10
      hard_max_words: 14
    question_minimum: 0
    cta_required: false
  subhead:
    sentence_style:
      target_max_words: 14
      hard_max_words: 20
    question_minimum: 0
    cta_required: false
  body_copy:
    sentence_style:
      target_max_words: 16
      hard_max_words: 24
    question_minimum: 1
    cta_required: true
  intro_paragraph:
    sentence_style:
      target_max_words: 16
      hard_max_words: 24
    question_minimum: 0
    cta_required: false
  call_to_action:
    sentence_style:
      target_max_words: 10
      hard_max_words: 14
    question_minimum: 0
    cta_required: true
  social_post:
    sentence_style:
      target_max_words: 16
      hard_max_words: 22
    question_minimum: 0
    cta_required: true
  email_copy:
    sentence_style:
      target_max_words: 16
      hard_max_words: 24
    question_minimum: 1
    cta_required: true
  case_study:
    sentence_style:
      target_max_words: 18
      hard_max_words: 26
    question_minimum: 0
    cta_required: false

persona_profiles:
  marketing_manager:
    tone_adjustment: standard
  content_creator:
    tone_adjustment: standard
  social_media:
    tone_adjustment: slightly_more_conversational
  executive_communications:
    tone_adjustment: slightly_more_formal_but_still_direct
  new_hire:
    tone_adjustment: explanatory
  ai_agent:
    tone_adjustment: strict_constraint_enforcement

exceptions:
  undeclared_exception_behaviour: hard_fail
  validation:
    exception_must_be_declared_in_policy: true
    exception_must_match_content_context: true
    log_all_exception_activations: true
  declared:
    - id: case_study_third_person_exception
      description: In case studies, Advanced Analytica may be referred to in the third person to distinguish contributions from joint client efforts.
      when:
        application:
          - advanced-analytica.applications.case-study
        content_type:
          - case_study
      override:
        voice_policy:
          point_of_view:
            default_forbidden:
              remove:
                - third_person_self_reference
            additionally_allowed:
              - third_person_self_reference

    - id: quote_preservation_exception
      description: Quoted material may retain source phrasing, including forbidden words or sentence length.
      when:
        content_zone:
          - quotation
          - citation
      override:
        enforcement_mode: quoted_material_relaxed
        skip_rules:
          - D001
          - D005
          - D006

    - id: legal_text_exception
      description: Legal or regulated text may override tone preferences where required by law or compliance.
      when:
        policy_context:
          higher_priority_policy_matches:
            - advanced-analytica.legal.*
            - global.regulatory
      override:
        enforcement_mode: defer_to_higher_policy

exemplars:
  minimum_review_count: 2
  markdown_examples:
    role: human_readable_copy
    authoritative: false
    excluded_from_validation: true
  storage:
    mode: referenced
    source_key: advanced-analytica.standards.verbal-identity.tone-of-voice
    section: exemplars
    load_at_validation: true
    retrieval:
      protocol: brando_policy_repo
      base_path: /policies/exemplars/
      key_format: "<exemplar_key>.md"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 300
  fallback_behaviour:
    if_exemplars_unavailable: skip_rule_with_warning
    affected_rules:
      - H002
  active_exemplar_keys:
    - advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.linkedin-post
    - advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.audit-services
    - advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.alliances
    - advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.transformation
    - advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.blog-headline
    - advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.thought-leadership
    - advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.case-study
    - advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.newsletter
  source_contexts:
    channels:
      - website
      - linkedin
      - newsletter
    content_types:
      - blog_post
      - event_announcement
      - economic_buyer_message
      - case_study
      - thought_leadership
      - social_post

competitive_differentiation:
  competitors:
    - Deloitte
    - EY
    - KPMG
    - Accenture
  differentiators:
    - Use second person to connect personally.
    - Use short punchy sentences with rhythm.
    - Use emotion words where they clarify and energise.
    - Stay audience-first rather than inwardly focused.

anti_exemplars:
  enforcement_role: negative_reference_only
  used_by_rules: []
  excluded_from_deterministic_validation: true
  excluded_from_heuristic_validation: true
  sources:
    - id: deloitte
      label: Inwardly focused
      for_human_review_only: true
    - id: ey
      label: Third-person disconnection
      for_human_review_only: true
    - id: kpmg
      label: Emotionally flat
      for_human_review_only: true

document_self_validation:
  validate_yaml_structure: true
  validate_authoritative_positive_exemplars: true
  exclude_markdown_guidance: true
  exclude_change_log: true
  exclude_comments: true
  exclude_anti_exemplars: true
  exclude_markdown_exemplar_copies: true
  notes:
    - validate_authoritative_positive_exemplars applies only to repository exemplars retrieved via exemplars.storage.retrieval.
    - Markdown exemplar copies are excluded per exemplars.markdown_examples.excluded_from_validation.
    - Anti-exemplars are excluded per anti_exemplars.excluded_from_deterministic_validation.
    - YAML comments are excluded as they are stripped before rule execution.

classifiers:
  broad_claim_detector:
    description: >
      Detects sentences that make sweeping assertions without quantitative or
      attributed support. A sentence is a broad claim if it asserts a universal
      or near-universal condition, outcome, or advantage without citing a
      specific data point, named source, or scoped qualifier.
    trigger_signals:
      - superlative_adjectives: ["best", "most", "every", "all", "always", "never"]
      - universal_quantifiers: ["all businesses", "every organisation", "no company"]
      - unqualified_future_certainty: ["will transform", "will revolutionise", "guarantees"]
    non_trigger_signals:
      - numeric_evidence: true
      - attributed_source: true
      - scoped_qualifier: true
    output:
      type: boolean
      true_when: one_or_more_trigger_signals_present_and_no_non_trigger_signals
    used_by_rules:
      - H007

execution:
  enforcement_mode: blocking
  max_retry_attempts: 3
  escalate_to_human_after: 3
  rule_id_policy:
    deterministic_pattern: "^D[0-9]{3}$"
    heuristic_pattern: "^H[0-9]{3}[A-Z]?$"
  rule_execution_order:
    phase_1_deterministic:
      - D001
      - D002
      - D003
      - D005
      - D004
      - D007
      - D006
      - D008
      - D010
    phase_2_heuristic:
      - H001
      - H001B
      - H003
      - H004
      - H005
      - H002
      - H006
      - H007
    notes: Run all deterministic rules first. Only proceed to heuristic rules if all deterministic rules pass or produce soft warnings only.
  heuristic_decisioning:
    low_confidence_ignore_below: 0.60
    medium_confidence_warn_at_or_above: 0.60
    high_confidence_enforce_at_or_above: 0.85
    threshold_resolution:
      policy: per_rule_takes_precedence
      notes:
        - Where a rule declares its own threshold, that value governs for that rule.
        - Global heuristic_decisioning thresholds apply only where a rule does not declare its own threshold.
        - H002 uses minimum_score on a 0-100 percentage scale. All other heuristic rules use a 0.0-1.0 probability scale. Validators must not normalise across these scales. Apply each rule's declared scale directly.
  retry_strategy:
    mode: targeted_repair_then_regenerate
    repair_scope:
      deterministic_failures: sentence_level
      heuristic_failures: paragraph_level
      after_two_failed_repairs: full_regeneration
    repair_instruction_format:
      include_violation_id: true
      include_failing_text: true
      include_remediation_action: true
      include_exemplar_reference: true
    sequence:
      - repair_deterministic_failures
      - re-evaluate
      - repair_heuristic_weaknesses
      - re-evaluate
      - regenerate_if_still_failing
  output_contract:
    must_pass:
      - no_hard_fail_rules
    may_pass_with_warnings:
      - soft_warn_only
    must_block:
      - any_hard_fail_after_max_retries

rules:
  deterministic:
    - id: D001
      name: forbidden_word_detected
      severity: hard_fail
      applies_to:
        - headline
        - subhead
        - body_copy
        - social_post
        - email_copy
        - call_to_action
      detect:
        method: lexicon_match
        source: lexical_policy.forbidden_words.exact
        case_insensitive: true
        whole_word: true
        phrase_match:
          enabled: true
          boundary_mode: exact_phrase_with_word_boundaries
      remediation:
        action: replace_with_preferred_alternative_or_rewrite
        lookup: lexical_policy.preferred_replacements

    - id: D002
      name: exclamation_point_used
      severity: hard_fail
      applies_to:
        - headline
        - subhead
        - body_copy
        - social_post
        - email_copy
        - call_to_action
      detect:
        method: character_match
        pattern: "!"
      remediation:
        action: remove_or_rephrase

    - id: D003
      name: third_person_self_reference
      severity: hard_fail
      applies_to:
        - headline
        - subhead
        - body_copy
        - social_post
        - email_copy
      applies_in_content_zones:
        - rendered_copy
      detect:
        method: regex
        patterns:
          - "\\bAdvanced Analytica\\b"
          - "\\bAdvanced Analytica['\u2019]s\\b"
      exclude_content_zones:
        - quotation
        - citation
        - metadata
      unless_exception:
        - case_study_third_person_exception
        - quote_preservation_exception
      remediation:
        action: rewrite_to_first_person_plural

    - id: D004
      name: no_call_to_action
      severity: hard_fail
      applies_to:
        - body_copy
        - social_post
        - email_copy
      detect:
        method: structural_presence
        target: call_to_action
      when:
        cta_required: true
      remediation:
        action: add_single_clear_cta

    - id: D005
      name: sentence_exceeds_hard_max
      severity: hard_fail
      applies_to:
        - headline
        - subhead
        - body_copy
        - intro_paragraph
        - social_post
        - email_copy
        - call_to_action
      detect:
        method: sentence_word_count
        threshold_from_field_applicability: hard_max_words
        count_mode: whitespace_tokenized
        ignore_quoted_material: true
      remediation:
        action: split_sentence

    - id: D006
      name: contraction_missing_in_conversational_context
      severity: soft_warn
      applies_to:
        - body_copy
        - social_post
        - email_copy
      detect:
        method: stylistic_pattern
        signal: low_contraction_rate
        threshold: 0.2
        threshold_denominator: eligible_contraction_opportunities
      remediation:
        action: introduce_natural_contractions

    - id: D007
      name: hedging_phrase_detected
      severity: soft_warn
      applies_to:
        - body_copy
        - social_post
        - email_copy
      detect:
        method: phrase_match
        source:
          collection: pattern_policy.forbidden_patterns
          match:
            id: unnecessary_qualifiers
          field: trigger_phrases
      remediation:
        action: replace_with_decisive_language

    - id: D008
      name: missing_question
      severity: soft_warn
      applies_to:
        - body_copy
        - email_copy
      detect:
        method: punctuation_presence
        target: question_mark
        minimum_from_field_applicability: question_minimum
      remediation:
        action: add_question_if_naturally_supported

    - id: D010
      name: em_dash_used
      severity: hard_fail
      applies_to:
        - headline
        - subhead
        - body_copy
        - social_post
        - email_copy
        - call_to_action
      detect:
        method: regex
        pattern: "—"
      remediation:
        action: remove_or_rewrite_as_two_sentences

  heuristic:
    - id: H001
      name: passive_voice_overuse
      severity: soft_warn
      applies_to:
        - body_copy
        - social_post
        - email_copy
      detect:
        method: passive_voice_classifier
        threshold: 0.85
        max_instances: 1
      unless_exception:
        - legal_text_exception
      remediation:
        action: rewrite_in_active_voice

    - id: H001B
      name: repeated_passive_voice_overuse
      severity: hard_fail
      applies_to:
        - body_copy
        - email_copy
      detect:
        method: passive_voice_classifier
        threshold: 0.90
        max_instances_greater_than: 2
      unless_exception:
        - legal_text_exception
      remediation:
        action: rewrite_repeated_passive_constructions_in_active_voice

    - id: H002
      name: low_exemplar_alignment_score
      severity: soft_warn
      applies_to:
        - headline
        - subhead
        - body_copy
        - social_post
      detect:
        method: semantic_similarity
        exemplar_set: exemplars.active_exemplar_keys
        minimum_score: 70
      remediation:
        action: revise_toward_approved_rhythm_and_voice

    - id: H003
      name: missing_customer_benefit
      severity: hard_fail
      applies_to:
        - body_copy
        - social_post
        - email_copy
      detect:
        method: rhetorical_role_classifier
        target: customer_benefit
        threshold: 0.8
      remediation:
        action: foreground_audience_benefit

    - id: H004
      name: missing_clear_point_of_view
      severity: hard_fail
      applies_to:
        - body_copy
        - social_post
        - email_copy
      detect:
        method: stance_classifier
        threshold: 0.75
      remediation:
        action: strengthen_main_claim

    - id: H005
      name: inwardly_focused_copy
      severity: soft_warn
      applies_to:
        - body_copy
        - social_post
        - email_copy
      detect:
        method: audience_orientation_classifier
        preferred_ratio:
          second_person_to_self_reference_min: 1.5
      remediation:
        action: shift_focus_toward_reader

    - id: H006
      name: incomplete_principle_expression
      severity: soft_warn
      applies_to:
        - body_copy
        - social_post
      detect:
        method: multi_label_brand_principle_classifier
        required_labels:
          - collaborative
          - bold
          - optimistic
        minimum_confidence: 0.7
      remediation:
        action: rebalance_copy_against_core_principles

    - id: H007
      name: missing_data_support_for_broad_claim
      severity: soft_warn
      applies_to:
        - body_copy
      detect:
        method: claim_support_check
        requires_classifier: broad_claim_detector
        requires_evidence_pattern: numeric_or_attributed_support
      when:
        match_mode: any
        content_type:
          - thought_leadership
          - economic_buyer_message
        channel:
          - website
      remediation:
        action: add_specific_data_or_narrow_claim

decision_policy:
  pass_conditions:
    - zero_hard_failures
  warn_conditions:
    - one_or_more_soft_warnings
  fail_conditions:
    - one_or_more_hard_failures
  publish_conditions:
    - status in [pass, warn]
    - hard_fail_count == 0
  warn_behaviour:
    auto_publish_allowed: true
    conflict_resolution:
      mode: most_restrictive_wins
      notes:
        - If any matched channel or content_type requires human sign-off, human sign-off is required.
        - Auto-publish is allowed only when no matched rule requires human sign-off.
    requires_human_sign_off_on_warn:
      channels:
        - website
      content_types:
        - thought_leadership
        - economic_buyer_message
    allows_auto_publish_on_warn:
      channels:
        - linkedin
        - newsletter
      content_types:
        - blog_post
        - event_announcement
  human_review_conditions:
    - retry_count >= 3
    - unresolved_heuristic_conflict == true

telemetry:
  log_policy_key: true
  log_policy_version: true
  log_rule_failures: true
  log_retry_history: true
  log_exception_usage: true
  retain_validation_report: true
  output_format: json
  schema:
    type: object
    properties:
      policy_key:
        type: string
      policy_version:
        type: string
      content_id:
        type: string
      content_type:
        type: string
      channel:
        type: string
      persona:
        type: string
      timestamp:
        type: string
        format: iso8601
      rule_results:
        type: array
        items:
          type: object
          properties:
            rule_id:
              type: string
            severity:
              type: string
            status:
              type: string
            reason:
              type: string
            score:
              type: number
      retry_count:
        type: integer
      exception_activations:
        type: array
        items:
          type: object
          properties:
            exception_id:
              type: string
            reason:
              type: string
            matched_context:
              type: object
      final_decision:
        type: string
      validation_report_id:
        type: string
      effective_policy_ref:
        type: string

related_standards:
  - advanced-analytica.standards.visual-identity
  - advanced-analytica.standards.verbal-identity.messaging-framework

related_applications:
  - advanced-analytica.applications.linkedin
  - advanced-analytica.applications.thought-leadership
  - advanced-analytica.applications.case-study
  - advanced-analytica.applications.website
  - advanced-analytica.applications.newsletter
  - advanced-analytica.applications.event-announcement
  - advanced-analytica.applications.economic-buyer-message
---

# Advanced Analytica tone of voice

## Purpose

This standard governs how Advanced Analytica sounds in written communications. It is designed for
human creators, AI systems, validators, editors, and publishing workflows.

The tone must consistently express three qualities together:

- Collaborative
- Bold
- Optimistic

These are not optional stylistic flavours. They are the core expression contract.

---

## How to interpret this policy

This policy has four layers:

1. Principles define the intended feel.
2. Constraints define what must or must not appear.
3. Exemplars show what good looks like.
4. Execution rules determine whether output passes, warns, or fails.

The YAML front matter is the machine-executable layer. This markdown body is the
human-readable explanation layer. Where they appear to conflict, the YAML governs.

If a rule conflicts with a higher-priority legal, regulatory, or safety policy,
the higher-priority policy wins.

If a rule conflicts with an application-specific exception that is explicitly declared
in the YAML, the declared exception applies.

---

## Core principles

### Collaborative

We listen, encourage conversation, and use empathy to connect with our audiences.

Signals of collaborative writing:

- Uses "we" and "you"
- Sounds conversational rather than formal
- Invites the reader in
- Makes the audience feel seen

Good examples:

- "As a tax leader, you'll want to be sure..."
- "Today's the day to..."
- "How prepared are you for the change ahead?"
- "We'll help you make the next move with confidence."

Avoid:

- Distant third-person phrasing
- Talking about the reader instead of to the reader
- Stiff non-contracted language
- Inward-looking capability statements

---

### Bold

We cut through the noise by being truth tellers: confident, candid, and clear in our point of view.

Signals of bold writing:

- States a view clearly
- Removes hedging
- Keeps language simple
- Uses short, focused sentences

Good examples:

- "It matters. More than you might expect."
- "We'll map your opportunities."
- "The move is positive."
- "Start now."

Avoid:

- "most likely"
- "depending on how you look at it"
- jargon used to sound impressive
- meandering explanation before the point

---

### Optimistic

We see the opportunity beyond the challenge.

Signals of optimistic writing:

- Moves the reader toward action
- Balances realism with momentum
- Uses active voice
- Creates energy without hype

Good examples:

- "Start by considering..."
- "More than half of executives have plans to implement..."
- "Here's how to move with confidence."
- "Ready for what's next?"

Avoid:

- vague positivity
- unsupported big claims
- overpromising
- passive construction that drains energy

---

## Default execution expectations

Unless an explicit exception is declared in the YAML:

- Use first and second person throughout
- Do not refer to Advanced Analytica in the third person
- Avoid all forbidden words listed in lexical_policy
- Avoid exclamation points
- Avoid em dashes in all governed content types (see rule D010)
- Keep sentences within field-level hard limits
- Include a clear call to action where cta_required is true
- Use data when broad claims are made
- Prefer active voice in all contexts
- Stay audience-first throughout

---

## Exception model

Exceptions are allowed only when declared in the YAML exceptions block.
Undeclared exceptions hard fail.

Three exceptions are currently declared:

Case study exception: in case studies, third-person reference to Advanced Analytica is allowed
when it helps distinguish Advanced Analytica's role from the client's role. This is a narrow
exception to the point-of-view rule. It is not a general relaxation of any other rule.

Quote preservation exception: quoted material may preserve source phrasing even
when it contains language that would otherwise fail lexical or sentence rules.
Rules D001, D005, and D006 are skipped for quoted zones only.

Legal and regulated text exception: where legal or regulatory language is required,
higher-priority policy overrides this tone standard. The enforcement mode defers
to the higher-priority policy.

---

## Exemplars

Each exemplar below is referenced in the YAML by its active_exemplar_key.
Validators load these exemplars programmatically for semantic similarity scoring (H002).
Exemplars are retrieved via the Brando policy repository using the retrieval protocol
declared in exemplars.storage.retrieval.

All exemplars must pass the full deterministic rule set. If an exemplar is found to
contain a forbidden word or pattern, it must be corrected before the next policy
review cycle.

---

### linkedin-post

Key: advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.linkedin-post

"AI risk won't wait. We help you see it clearly, act on it decisively,
and turn it into your competitive edge. Ready to move?"

Why it works:

- Collaborative: strong we/you dynamic throughout
- Bold: short, clear, decisive sentences
- Optimistic: forward motion and a direct invitation to act

---

### audit-services

Key: advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.audit-services

"Your brand is built on the trust internal and external stakeholders have in you.
No trust, no brand. Our objective view of the facts gives you the certainty you
need to decide and the confidence to act."

Why it works:

- People-first opening
- Emotional texture without hype
- Clear benefit and forward movement

---

### alliances

Key: advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.alliances

"Working together creates a basis for success. With the right resources and alliances,
at the right time, you can deliver meaningful impact. On the ground and in the cloud,
we bring speed, direction and scale so you can harness opportunities."

Why it works:

- Strong rhythmic build to a powerful benefit
- Concrete outcome stated clearly
- Positive momentum throughout

---

### transformation

Key: advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.transformation

"We'll help you succeed in the face of seismic change. We'll help you rethink and
rebuild so you can make change your opportunity and the future your advantage."

Why it works:

- Strong future-facing energy
- Direct audience address throughout
- Clear and ambitious point of view

---

### blog-headline

Key: advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.blog-headline

"Build AI with controls that work."

Why it works:

- Immediate verb-led construction
- Specific and direct
- Compact and energetic

Note: prior version read "Enable AI innovation with controls that work." The word
"innovation" is in lexical_policy.forbidden_words. Corrected in v2.4.0.

---

### thought-leadership

Key: advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.thought-leadership

"What should your AI strategy address? More than you might think.
Here's how to make the opportunity governed and controlled."

Why it works:

- Opens with a question
- Balances ambition and realism
- Gives a clear path forward

---

### case-study

Key: advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.case-study

"The result: an intelligent business operating model built to lead, not follow."

Why it works:

- Compact and energised
- Concrete outcome
- Repeats parts of speech for rhythm

Note: case studies activate the case_study_third_person_exception declared in the YAML.
This exemplar reflects the narrowed exception. It is not a model for general copy.

---

### newsletter

Key: advanced-analytica.standards.verbal-identity.tone-of-voice.exemplar.newsletter

"Things are changing fast. Are you ready to move with them?
Here's what we're seeing and how to stay ahead."

Why it works:

- Conversational and timely
- Reader-focused throughout
- Ends with a useful, forward-looking direction

---

## Anti-exemplars

These are real competitor examples showing what Advanced Analytica copy must never sound like.
They are not keyed exemplars. They are negative reference material for human review only.

Inwardly focused (Deloitte):

"Through Deloitte's strategic collaborations with some of the world's largest technology
firms and innovators, we are building connections and designing offerings that empower
clients to address complex challenges, mitigate risk, ignite innovation, and fuel
competitive advantages."

Why it fails:

- Inwardly focused throughout
- Overloaded single sentence
- Jargon-heavy
- Weak direct connection to the reader

Third-person disconnection (EY):

"EY teams give you the confidence to shape the future and create new value by
reimagining and realizing transformations across the entire enterprise."

Why it fails:

- Third-person framing weakens immediacy
- Abstract phrasing with no concrete benefit
- Overly corporate rhythm

Emotionally flat (KPMG):

"Working together to build modern, intelligent, and resilient businesses."

Why it fails:

- Generic adjectives with no specificity
- Little urgency or reader motivation
- No clear point of view

---

## Validator interpretation notes

This section is for implementers building validation tooling against this policy.

### Deterministic checks

Implement with direct pattern logic, lexicons, structural checks, or measurable thresholds.
Run in the order declared in execution.rule_execution_order.phase_1_deterministic.

Covered by: D001, D002, D003, D004, D005, D006, D007, D008, D010

### Heuristic checks

Implement using a classifier, scorer, or model-based evaluator.
Run only after all deterministic checks pass or produce soft warnings only.
Run in the order declared in execution.rule_execution_order.phase_2_heuristic.

Covered by: H001, H001B, H002, H003, H004, H005, H006, H007

Every heuristic check must return both a score and a reason. Never return a score alone.

### Scale note for heuristic scores

H002 scores on a 0-100 percentage scale. All other heuristic rules score on a
0.0-1.0 probability scale. Do not normalise across these scales. Apply each rule's
declared scale directly. See execution.heuristic_decisioning.threshold_resolution.

### Classifier reference

The broad_claim_detector classifier used by H007 is defined in
classifiers.broad_claim_detector. Implementers must satisfy that specification
before H007 can execute correctly.

### Exemplar retrieval

Exemplars required by H002 are fetched via the Brando policy repository.
See exemplars.storage.retrieval for protocol, path format, auth, and timeout.
If retrieval fails, H002 is skipped with a soft warning per fallback_behaviour.

### Em dash detection

D010 detects all instances of the em dash character (U+2014), including both spaced
and unspaced usage. The regex pattern matches the glyph directly. Validators must not
limit detection to the spaced variant only.

### Retry behaviour

On deterministic failure: repair at sentence level, re-evaluate before proceeding.
On heuristic failure: repair at paragraph level, re-evaluate before proceeding.
After two failed repairs: trigger full regeneration.
After three total attempts: escalate to human review. Do not publish.

### Telemetry

Every validation run must produce a JSON telemetry record matching the schema
declared in telemetry.schema. Attach the policy_key and policy_version to every record.
Retain the validation_report_id for audit purposes.

---

## Change log

| Version | Date       | Changes                                                                                         |
|---------|------------|-------------------------------------------------------------------------------------------------|
| 2.5.4   | 2026-05-03 | Aligned policy with verbal_identity template structure.                                          |
|         |            | Added subcategory: tone_of_voice.                                                               |
|         |            | Updated naming.canonical_term to Verbal Identity and added naming.policy_label.                 |
|         |            | Migrated policy precedence, exemplar source keys, exemplar references, and Markdown exemplar keys to verbal-identity namespace. |
|         |            | Updated related_standards messaging framework reference to verbal-identity namespace.           |
|         |            | Updated D003 possessive regex to catch straight and typographic apostrophes.                    |
| 2.5.3   | 2026-05-03 | Added document_type: policy_standard.                                                           |
|         |            | Added schema.validation_status: schema_validated.                                               |
| 2.5.2   | 2026-05-03 | Fixed blocking YAML error: restored missing description: > key in classifiers.broad_claim_detector. |
|         |            | Renamed document_self_validation.validate_yaml_rules to validate_yaml_structure.                |
|         |            | Renamed validate_positive_exemplar_text to validate_authoritative_positive_exemplars.           |
|         |            | Renamed exclude_markdown_examples to exclude_markdown_exemplar_copies.                         |
|         |            | Added inline comments clarifying each document_self_validation field's scope.                  |
| 2.5.1   | 2026-05-03 | Fixed D007 source: replaced index-based forbidden_patterns[1] with ID-based collection lookup. |
|         |            | Removed em dash glyph from D010 YAML comment.                                                  |
|         |            | Added document_self_validation block declaring excluded document zones.                         |
|         |            | Added execution.rule_id_policy declaring deterministic and heuristic ID patterns.               |
|         |            | Added note to D006 clarifying its borderline deterministic status.                              |
| 2.5.0   | 2026-05-03 | Added warn_behaviour.conflict_resolution: most_restrictive_wins.                               |
|         |            | Renamed exemplars.sources to source_contexts; split into channels and content_types.            |
|         |            | Added D001.detect.phrase_match for multi-word forbidden phrase detection.                       |
|         |            | Added exemplars.markdown_examples block declaring Markdown copies non-authoritative.            |
|         |            | Fixed related_applications: webpage corrected to website.                                      |
| 2.4.1   | 2026-05-03 | Fixed preferred_replacements key: "no_time_like_the_present" to "no time like the present".   |
|         |            | Added match_mode: any to H007.when to make OR logic explicit.                                  |
|         |            | Fixed exemplars.sources: "webpage" corrected to "website".                                    |
|         |            | Added anti_exemplars YAML block with machine exclusion metadata.                               |
|         |            | Cleaned em dash detection guidance.                                                            |
|         |            | Changed optimal replacement from "best" to "appropriate".                                    |
| 2.4.0   | 2026-05-03 | Fixed voice_contract to voice_policy in case_study_third_person_exception override.            |
|         |            | Reclassified D009 as H007 (heuristic). Removed from phase_1_deterministic.                    |
|         |            | Fixed H007 when block: split correctly across content_type and channel.                        |
|         |            | Restructured warn_behaviour into requires_human_sign_off_on_warn and allows_auto_publish_on_warn with explicit channels/content_types separation. |
|         |            | Fixed blog-headline exemplar: "innovation" replaced.                                          |
|         |            | Fixed jargon_complexity pass example: "optimise" replaced.                                    |
|         |            | Fixed D010 pattern: now matches all em dash instances including unspaced.                      |
|         |            | Removed all em dashes from markdown body.                                                      |
|         |            | Extended preferred_replacements to cover all forbidden words.                                  |
|         |            | Updated D001 remediation to replace_with_preferred_alternative_or_rewrite.                    |
| 2.3.0   | 2026-05-03 | Fixed em dash conflict. Fixed D009 when.channel. Standardised delimiter usage.                 |
|         |            | Moved H001B after H001. Added threshold_resolution. Defined broad_claim_detector.              |
|         |            | Added exemplar retrieval protocol. Fixed D006 threshold_denominator.                          |
|         |            | Fixed Exemplars header typo. Fixed case-study exemplar missing "model".                       |
| 2.2.0   | 2026-04-06 | Initial published version.                                                                      |

---

## Publishing checklist

Before publication, confirm:

- The output has no unresolved hard failures
- Any warnings are acceptable for the publishing context
- Channel-specific warn behaviour has been applied correctly
- Any exception used is explicitly declared in the YAML and logged
- The policy key and version are attached to the validation report
- Retry history is retained if the content was machine-generated
- The telemetry record has been written and the validation_report_id stored