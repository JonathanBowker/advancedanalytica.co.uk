---
# =============================================================================
# BRANDO® TONE OF VOICE STANDARD TEMPLATE
# brando-schema-1.0 | document_type: policy_standard
# =============================================================================
#
# PLACEHOLDER CONVENTION — READ BEFORE EDITING
# -----------------------------------------------------------------------------
# {curly_brace} placeholders must be replaced with brand-specific content
# before this template is promoted to a brand policy and policy-validated.
#
# <angle_bracket> values are runtime variables resolved at validation time.
# Do NOT replace these — they are consumed by the validation engine.
#
# Quote every YAML value that contains a {curly_brace} placeholder.
# Unquoted curly braces are interpreted as flow mapping syntax and will
# cause a parse error. Quote all placeholder-containing values, including
# list items, map keys, and scalar string values.
# =============================================================================

# -----------------------------------------------------------------------------
# DOCUMENT IDENTITY
# -----------------------------------------------------------------------------
# Required. Stable, globally unique identifier for this policy.
# Recommended pattern: {brand_id}.standards.verbal-identity.tone-of-voice
id: "{brand_id}.standards.verbal-identity.tone-of-voice"

# Required. Usually mirrors id. Use as the stable lookup key in policy
# repositories, MCP servers, APIs, and audit logs.
key: "{brand_id}.standards.verbal-identity.tone-of-voice"

# Required. Human-readable title.
title: "{Brand Name} Tone of Voice"

# Required. Short description used in repositories, UIs, search, and audit logs.
description: "Core tone-of-voice standard governing written brand expression across {Brand Name} communications."

# Required. Defines what kind of policy artefact this is.
# Allowed values:
# - standard | application | campaign | exception
# - exemplar_set | lexicon | telemetry_schema
policy_kind: standard

# Required. Top-level governance pillar.
# Allowed values (controlled by Brando schema):
# - standards | applications | campaigns | legal | market | safety
pillar: standards

# Required. Category within the pillar. Use snake_case for controlled terms.
category: verbal_identity

# Required. Subcategory within the category. Use snake_case for controlled terms.
subcategory: tone_of_voice

# Required. Used by Brando to distinguish policy standards from related artefacts.
# Allowed values:
# - policy_standard | application_policy | campaign_policy | exemplar
# - exemplar_set | lexicon | classifier_spec | telemetry_schema | validation_report
document_type: policy_standard

# -----------------------------------------------------------------------------
# TEMPLATE METADATA
# -----------------------------------------------------------------------------
# Identifies this file as a reusable template rather than an instantiated policy.
# Remove this block when promoting to a brand-specific policy.
template:
  is_template: true
  placeholder_status: contains_placeholders
  instantiate_before_validation: true

# -----------------------------------------------------------------------------
# VERSIONING AND LIFECYCLE
# -----------------------------------------------------------------------------
# Required. Semantic version. Use MAJOR.MINOR.PATCH.
# MAJOR: breaking schema or rule changes
# MINOR: new rules, sections, scope, or behaviours
# PATCH: typo, copy, clarification, non-breaking fixes
version: "1.0.0"

# Required. Publication status.
# Allowed values: draft | active | deprecated | archived
status: draft

# Required. Governance lifecycle state.
# Allowed values: proposed | in_review | approved | published | superseded | retired
lifecycle_state: proposed

# Required once active/published. ISO date.
effective_date: "YYYY-MM-DD"

# Required. ISO date.
created: "YYYY-MM-DD"

# Required. ISO date.
last_modified: "YYYY-MM-DD"

# Recommended. ISO date for next scheduled governance review.
next_review: "YYYY-MM-DD"

# -----------------------------------------------------------------------------
# OWNERSHIP AND APPROVAL
# -----------------------------------------------------------------------------
owner:
  # Required. Owning team or function.
  team: "{Brand Team Name}"

  # Recommended. Steward responsible for governance upkeep.
  steward: "{Steward Role or Name}"

approved_by:
  # Required once lifecycle_state is approved or published.
  - "{Approving Team or Role}"

# -----------------------------------------------------------------------------
# SCHEMA METADATA
# -----------------------------------------------------------------------------
schema:
  # Required. Schema class used by Brando.
  type: BrandVoiceStandard

  # Required. Schema version this document conforms to.
  version: brando-schema-1.0

  # Required. Validation state of this file.
  # Allowed values:
  # - ready_for_validation: authored but not yet parsed or reviewed
  # - human_reviewed: reviewed by a human but not formally schema-validated
  # - schema_validated: parsed and validated against the declared schema
  #
  # Set to ready_for_validation on first authoring.
  # Update only after a parse or review cycle is complete.
  validation_status: ready_for_validation

# -----------------------------------------------------------------------------
# CLIENT NAMING MAP
# -----------------------------------------------------------------------------
# Optional but recommended. Maps client-facing terminology to Brando terms.
# This field supports terminology mapping only. It does not affect enforcement logic.
naming:
  # How the client refers to this document.
  client_term: Tone of Voice
  # The Brando category this standard sits within.
  canonical_term: Verbal Identity
  # The specific standard label within that category.
  policy_label: Tone of Voice
  rationale: >
    {Explain how the client names this artefact and how Brando should map it
    into the canonical governance model. canonical_term maps to category;
    policy_label maps to subcategory. This field does not affect enforcement logic.}

# -----------------------------------------------------------------------------
# SCOPE
# -----------------------------------------------------------------------------
# Required. Defines when this policy applies.
scope:
  applies_to:
    # Required. Distribution or publishing environments.
    # Do not mix channels with content types in this list.
    channels:
      - website
      - linkedin
      - email
      - newsletter
      - event_platform

    # Required. Types of content or copy components governed by this policy.
    # Note: In brando-schema-1.0, content_types includes both full content
    # formats (blog_post, case_study) and copy component fields (headline,
    # body_copy). Field-level thresholds for copy components are declared
    # separately in field_applicability. A future schema version may split
    # these into content_types and content_fields.
    #
    # Composite content types such as blog_post, case_study, and thought_leadership
    # should be decomposed into governed copy fields before rule execution.
    # For example, a blog_post may contain headline, intro_paragraph, body_copy,
    # and call_to_action fields. Rules such as D005 apply at field level, not
    # to the composite type as a whole. Passing a composite type as a single
    # blob will cause field-level rules to be skipped silently.
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

    # Recommended. Audience or persona types for tone adjustment.
    audiences:
      - marketing_manager
      - content_creator
      - social_media
      - executive_communications
      - new_hire
      - ai_agent

    # Recommended. Zones within content.
    # Useful for excluding quotations, citations, metadata, or legal text.
    content_zones:
      - rendered_copy
      - quotation
      - citation
      - metadata

  # Recommended. Explicitly excluded contexts.
  excludes:
    content_types:
      - legal_disclaimer
      - regulated_disclosure
      - invoice
      - procurement_template

  # Recommended. Human-readable scope clarifications.
  notes:
    - Applies to generated and edited marketing/editorial copy.
    - Does not apply to quoted source material unless explicitly rewritten.
    - Does not apply to legal or compliance text unless downstream policy explicitly says so.

# -----------------------------------------------------------------------------
# POLICY PRECEDENCE
# -----------------------------------------------------------------------------
# Recommended. Defines how this policy behaves when other policies also apply.
policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - "{brand_id}.applications.*"
    - "{brand_id}.standards.verbal-identity.tone-of-voice"
    - campaign.local

  conflict_resolution:
    # Allowed values:
    # - higher_priority_wins | most_restrictive_wins | explicit_exception_required
    mode: higher_priority_wins
    notes:
      - Application-specific policy may narrow this standard only within its declared scope.
      - Application-specific policy may not weaken higher-priority legal, regulatory, or safety constraints.
      - Exceptions must be explicit and machine-readable to override defaults.

# -----------------------------------------------------------------------------
# INHERITANCE
# -----------------------------------------------------------------------------
# Optional but recommended for enterprise or multi-brand systems.
inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
  may_be_overridden_by:
    - "{brand_id}.applications.case-study"
    - "{brand_id}.applications.linkedin"
    - "{brand_id}.applications.thought-leadership"
    - "{brand_id}.legal.*"
    - "{brand_id}.market.*"

# -----------------------------------------------------------------------------
# RESOLUTION BEHAVIOUR
# -----------------------------------------------------------------------------
# Recommended for executable policy systems.
resolution:
  resolve_inheritance_before_validation: true
  resolve_exceptions_before_rule_execution: true
  materialize_effective_policy: true
  effective_policy_output:
    include_resolved_rules: true
    include_applied_exceptions: true
    include_precedence_path: true

# -----------------------------------------------------------------------------
# CORE PRINCIPLES
# -----------------------------------------------------------------------------
# Required. Three to five principles is usually enough.
# Keep descriptions to one clear sentence each.
#
# Note: {principle_1}, {principle_2}, {principle_3} are also referenced in
# H006.detect.required_labels. Update both locations together.
principles:
  required:
    - "{principle_1}"
    - "{principle_2}"
    - "{principle_3}"
  definitions:
    # Map keys containing placeholders must be quoted to remain valid YAML.
    # Unquoted curly braces open a flow mapping and will cause a parse error.
    "{principle_1}":
      description: "{Describe principle 1 in one clear sentence.}"
    "{principle_2}":
      description: "{Describe principle 2 in one clear sentence.}"
    "{principle_3}":
      description: "{Describe principle 3 in one clear sentence.}"

# -----------------------------------------------------------------------------
# VOICE POLICY
# -----------------------------------------------------------------------------
# Required. Defines the intended voice shape.
# This is not the same as rules. Rules detect whether copy follows this policy.
voice_policy:
  point_of_view:
    # Recommended. Preferred grammatical perspective.
    default_required:
      - first_person_plural
      - second_person

    # Recommended. Default point-of-view restrictions.
    default_forbidden:
      - third_person_self_reference

    notes:
      - "Use 'we', 'our', 'you', 'your' where appropriate."
      - "Do not refer to {Brand Name} as '{Brand Name}' in normal copy unless an exception applies."

  tone_characteristics:
    # Required. Positive tonal traits to express.
    required:
      - "{tone_trait_1}"
      - "{tone_trait_2}"
      - "{tone_trait_3}"

    # Recommended. Tonal traits to avoid.
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
      # If em dashes are forbidden, do not declare them allowed here.
      # Enforce via a deterministic rule such as D010 instead.

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

# -----------------------------------------------------------------------------
# LEXICAL POLICY
# -----------------------------------------------------------------------------
# Required if the brand has forbidden, discouraged, or preferred vocabulary.
#
# Every forbidden word or phrase should have a preferred_replacements entry
# unless D001's remediation action is set to allow free rewriting.
#
# Multi-word forbidden phrases (e.g. "no time like the present") must use
# the exact phrase string as the key. Do not normalise spaces to underscores.
# D001 uses phrase_match with exact_phrase_with_word_boundaries.
lexical_policy:
  forbidden_words:
    exact:
      - "{forbidden_word_or_phrase_1}"
      - "{forbidden_word_or_phrase_2}"

  discouraged_words:
    - "{discouraged_word_or_phrase_1}"
    - "{discouraged_word_or_phrase_2}"

  preferred_replacements:
    # Map keys containing placeholders must be quoted to remain valid YAML.
    # Use the exact phrase string as the key — do not normalise spaces to underscores.
    "{forbidden_word_or_phrase_1}": "{preferred_replacement_1}"
    "{forbidden_word_or_phrase_2}": "{preferred_replacement_2}"

# -----------------------------------------------------------------------------
# PATTERN POLICY
# -----------------------------------------------------------------------------
# Recommended. Defines reusable phrase and pattern constraints.
# Rules reference patterns by id, not by list index.
# Do not rely on list order — use id-based lookups only.
pattern_policy:
  forbidden_patterns:
    - id: third_person_self_reference
      description: "Do not refer to {Brand Name} in the third person in normal copy unless an exception applies."
      examples:
        fail:
          - "{Brand Name}'s approach includes..."
          - "{Brand Name} helps businesses..."
        pass:
          - "Our approach includes..."
          - "We help you..."

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
      description: Prefer active voice in brand copy.
      examples:
        fail:
          - "We were tasked with leading..."
        pass:
          - "We led..."

# -----------------------------------------------------------------------------
# REQUIRED ELEMENTS
# -----------------------------------------------------------------------------
# Recommended. Defines rhetorical components that generated copy should include.
required_elements:
  default:
    - customer_benefit
    - clear_point_of_view
    - call_to_action
  conditional:
    - id: data_support_for_broad_claim
      required_when:
        broad_claims_present: true

# -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
# Required if different content fields need different thresholds.
#
# Every content_type in scope.applies_to.content_types that requires
# field-level threshold checking must have an entry here.
# D005 reads hard_max_words from this block. A missing field_applicability
# entry should produce a schema warning or validation error, rather than
# causing D005 to skip the content type silently.
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

  # intro_paragraph is declared in scope.applies_to.content_types and in D005.applies_to.
  # It must have an entry here so D005 can resolve hard_max_words for this field.
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

# -----------------------------------------------------------------------------
# PERSONA PROFILES
# -----------------------------------------------------------------------------
# Optional. Use when the same standard needs slightly different behaviour
# for editors, executives, social teams, new hires, or AI agents.
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

# -----------------------------------------------------------------------------
# EXCEPTIONS
# -----------------------------------------------------------------------------
# Required for executable governance. All exceptions must be declared here.
# Undeclared exceptions hard fail.
exceptions:
  undeclared_exception_behaviour: hard_fail
  validation:
    exception_must_be_declared_in_policy: true
    exception_must_match_content_context: true
    log_all_exception_activations: true

  declared:
    - id: case_study_third_person_exception
      description: "In case studies, {Brand Name} may be referred to in the third person to distinguish brand contribution from client or partner contribution."
      when:
        application:
          - "{brand_id}.applications.case-study"
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
            - "{brand_id}.legal.*"
            - global.regulatory
      override:
        enforcement_mode: defer_to_higher_policy

# -----------------------------------------------------------------------------
# EXEMPLARS
# -----------------------------------------------------------------------------
# Recommended. Positive examples for human guidance and semantic scoring.
exemplars:
  minimum_review_count: 2

  # Markdown exemplar copies in the document body are for humans only.
  # Authoritative exemplar text is retrieved from the policy repository.
  # Validators must use repository versions, not Markdown copies.
  markdown_examples:
    role: human_readable_copy
    authoritative: false
    excluded_from_validation: true

  storage:
    # Allowed values: inline | referenced | external_repository
    mode: referenced
    source_key: "{brand_id}.standards.verbal-identity.tone-of-voice"
    section: exemplars
    load_at_validation: true
    retrieval:
      # Allowed protocol values:
      # - brando_policy_repo | local_file | http | mcp_resource
      protocol: brando_policy_repo
      base_path: /policies/exemplars/
      # <exemplar_key> is a runtime variable resolved at validation time.
      # Do NOT replace this — it is not a template fill-in placeholder.
      key_format: "<exemplar_key>.md"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 300

  fallback_behaviour:
    if_exemplars_unavailable: skip_rule_with_warning
    affected_rules:
      - H002

  active_exemplar_keys:
    - "{brand_id}.standards.verbal-identity.tone-of-voice.exemplar.{example_key_1}"
    - "{brand_id}.standards.verbal-identity.tone-of-voice.exemplar.{example_key_2}"

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

# -----------------------------------------------------------------------------
# COMPETITIVE DIFFERENTIATION
# -----------------------------------------------------------------------------
# Optional. Helps human reviewers understand contrastive positioning.
competitive_differentiation:
  competitors:
    - "{competitor_1}"
    - "{competitor_2}"
  differentiators:
    - "{Differentiator 1}"
    - "{Differentiator 2}"

# -----------------------------------------------------------------------------
# ANTI-EXEMPLARS
# -----------------------------------------------------------------------------
# Optional. Negative examples for human review only.
# Anti-exemplars are excluded from all deterministic and heuristic validation.
# They must not be scored, repaired, or used as training signal unless a rule
# explicitly declares them as an input source.
anti_exemplars:
  enforcement_role: negative_reference_only
  used_by_rules: []
  excluded_from_deterministic_validation: true
  excluded_from_heuristic_validation: true
  sources:
    - id: "{anti_exemplar_source_1}"
      label: "{Human-readable label}"
      for_human_review_only: true

# -----------------------------------------------------------------------------
# DOCUMENT SELF-VALIDATION
# -----------------------------------------------------------------------------
# Recommended. Defines which parts of this file are subject to rule validation.
document_self_validation:
  # Validate YAML structure, rule ID patterns, path references, declared values,
  # and key consistency. Does NOT mean: run brand copy rules over the YAML text.
  validate_yaml_structure: true

  # Validate authoritative positive exemplars retrieved from the policy repository.
  # Does NOT apply to the Markdown exemplar copies in the document body.
  # See exemplars.markdown_examples.excluded_from_validation.
  validate_authoritative_positive_exemplars: true

  # Exclude the Markdown body guidance text from rule execution.
  exclude_markdown_guidance: true

  # Exclude the change log table from rule execution.
  exclude_change_log: true

  # Exclude YAML comments from rule execution.
  # Comments are stripped before the policy is parsed.
  exclude_comments: true

  # Exclude anti-exemplar copy from rule execution.
  # See anti_exemplars.excluded_from_deterministic_validation.
  exclude_anti_exemplars: true

  # Exclude the human-readable Markdown copies of exemplars from rule execution.
  # Authoritative exemplar text lives in the repository.
  exclude_markdown_exemplar_copies: true

  notes:
    - validate_authoritative_positive_exemplars applies only to repository exemplars retrieved via exemplars.storage.retrieval.
    - Markdown exemplar copies are excluded per exemplars.markdown_examples.excluded_from_validation.
    - Anti-exemplars are excluded per anti_exemplars.excluded_from_deterministic_validation.
    - YAML comments are excluded as they are stripped before rule execution.

# -----------------------------------------------------------------------------
# CLASSIFIERS
# -----------------------------------------------------------------------------
# Optional. Declare any judgement-based classifiers required by heuristic rules.
# Any classifier referenced in a rule's detect.requires_classifier field
# must have a full specification entry here.
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

# -----------------------------------------------------------------------------
# EXECUTION
# -----------------------------------------------------------------------------
# Required for executable validation.
execution:
  # Allowed values: blocking | advisory | audit_only
  enforcement_mode: blocking

  max_retry_attempts: 3
  escalate_to_human_after: 3

  # Declares the valid ID pattern for each rule phase.
  # H001B is intentional: the B suffix denotes a severity escalation variant
  # of H001, not a separate rule family. Validators must not treat it as a typo.
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
      # D009 is intentionally absent. It was reclassified as H007 because it
      # depends on broad_claim_detector, a judgement-based classifier.
      # Deterministic rules must be implementable without classifier dependencies.
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
        - H002 uses minimum_score on a 0-100 percentage scale. All other heuristic rules use a 0.0-1.0 probability scale. Do not normalise across these scales.

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

# -----------------------------------------------------------------------------
# RULES
# -----------------------------------------------------------------------------
# Required. Rules are executable validation checks.
# Rules reference pattern_policy entries by id, not by list index.
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
        # phrase_match handles multi-word forbidden phrases such as
        # "no time like the present". whole_word alone is insufficient
        # for phrases spanning multiple tokens.
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
        # Replace {Brand Name} with the actual brand name before validation.
        # If the brand name contains punctuation, numbers, or non-word endings,
        # test the boundary behaviour after substitution.
        # For example, "Acme (UK)" should become "Acme \\(UK\\)" in this regex.
        # The regex pattern does not fail YAML parsing with placeholder text,
        # but the literal string "{Brand Name}" will not match at runtime.
        # The character class ['\u2019] matches both straight apostrophe (U+0027)
        # and right single quotation mark (U+2019) to catch both typographic and plain variants.
        patterns:
          - "\\b{Brand Name}\\b"
          - "\\b{Brand Name}['\u2019]s\\b"
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
      # Note: D006 is borderline deterministic. Identifying eligible contraction
      # opportunities requires some context judgement. Retained in phase_1 as a
      # soft_warn only. Move to phase_2_heuristic if strict phase purity is required.
      severity: soft_warn
      applies_to:
        - body_copy
        - social_post
        - email_copy
      detect:
        method: stylistic_pattern
        signal: low_contraction_rate
        threshold: 0.2
        # Denominator is the count of eligible contraction opportunities:
        # instances where a standard contraction (e.g. "we will" to "we'll")
        # is available and grammatically valid in context.
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
        # ID-based lookup. Safe to reorder pattern_policy.forbidden_patterns
        # without breaking this reference.
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

    # D009 is intentionally absent.
    # It was reclassified as H007 (heuristic) because it depends on
    # broad_claim_detector, a judgement-based classifier.
    # Deterministic rules must be implementable via pattern logic,
    # lexicons, or measurable structural checks only.

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
        # Matches the em dash glyph U+2014, including both spaced and unspaced usage.
        # Do not limit detection to the spaced variant only.
        pattern: "\u2014"
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

    # H001B immediately follows H001 in execution order.
    # It is a severity escalation variant, not a separate rule family.
    # The B suffix is intentional. See execution.rule_id_policy.
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
        # Score is on a 0-100 percentage scale.
        # Do not normalise to 0.0-1.0. See execution.heuristic_decisioning.threshold_resolution.
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
        # Keep in sync with principles.required.
        required_labels:
          - "{principle_1}"
          - "{principle_2}"
          - "{principle_3}"
        minimum_confidence: 0.7
      remediation:
        action: rebalance_copy_against_core_principles

    # H007 is the reclassified D009.
    # It uses broad_claim_detector, a judgement-based classifier,
    # which makes it heuristic rather than deterministic.
    - id: H007
      name: missing_data_support_for_broad_claim
      severity: soft_warn
      applies_to:
        - body_copy
      detect:
        method: claim_support_check
        requires_classifier: broad_claim_detector
        requires_evidence_pattern: numeric_or_attributed_support
      # Adjust content_type and channel values to match your declared scope.
      # These defaults reflect the reference implementation (Advanced Analytica).
      # match_mode: any means fire if ANY of the listed contexts match.
      when:
        match_mode: any
        content_type:
          - thought_leadership
          - economic_buyer_message
        channel:
          - website
      remediation:
        action: add_specific_data_or_narrow_claim

# -----------------------------------------------------------------------------
# DECISION POLICY
# -----------------------------------------------------------------------------
# Required. Defines pass/warn/fail and publishing behaviour.
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
    # most_restrictive_wins: if any matched channel or content_type requires
    # human sign-off, that requirement overrides all other matched rules.
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

# -----------------------------------------------------------------------------
# TELEMETRY
# -----------------------------------------------------------------------------
# Recommended for auditability. Required for automated governance pipelines.
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

# -----------------------------------------------------------------------------
# RELATED POLICY LINKS
# -----------------------------------------------------------------------------
related_standards:
  - "{brand_id}.standards.visual-identity"
  - "{brand_id}.standards.verbal-identity.messaging-framework"

related_applications:
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.thought-leadership"
  - "{brand_id}.applications.case-study"
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.newsletter"
---

# {Brand Name} tone of voice

## How to complete this template

This is a Brando® Tone of Voice standard template. Complete the following steps in order before publishing.

1. Replace every `{placeholder}` value with brand-specific content.
2. Do not replace `<runtime_variable>` values — these are resolved at validation time by the Brando engine.
3. Set `status: draft` and `lifecycle_state: proposed` on first authoring. Update only after governance sign-off.
4. Set `schema.validation_status: ready_for_validation` on first authoring. Update only after a formal parse or review cycle.
5. Remove optional sections that do not apply, or retain them with placeholder values for future use.
6. Run the publishing checklist before changing `status` to `active`.

Placeholder reference:

| Token | Meaning | Example |
|-------|---------|---------|
| `{brand_id}` | Stable machine-readable brand identifier | `acme-corp` |
| `{Brand Name}` | Human-readable brand name | `Acme Corp` |
| `{principle_1}` | First core voice principle label | `collaborative` |
| `{example_key_1}` | Exemplar short key | `linkedin-post` |
| `<exemplar_key>` | Runtime variable — do not replace | |

---

## Purpose

This standard governs how {Brand Name} sounds in written communications. It is designed for human creators, AI systems, validators, editors, and publishing workflows.

The tone must consistently express:

- {principle_1}
- {principle_2}
- {principle_3}

These are not optional stylistic flavours. They are the core expression contract.

---

## How to interpret this policy

This policy has four layers:

1. Principles define the intended feel.
2. Constraints define what must or must not appear.
3. Exemplars show what good looks like.
4. Execution rules determine whether output passes, warns, or fails.

The YAML front matter is the machine-executable layer. This Markdown body is the human-readable explanation layer. Where they conflict, the YAML governs.

If a rule conflicts with a higher-priority legal, regulatory, or safety policy, the higher-priority policy wins.

If a rule conflicts with an application-specific exception declared in the YAML, the declared exception applies.

---

## Core principles

### {Principle 1}

{Explain principle 1 in plain language.}

Signals:

- {Signal 1}
- {Signal 2}
- {Signal 3}

Good examples:

- "{Good example 1}"
- "{Good example 2}"

Avoid:

- {Avoidance 1}
- {Avoidance 2}

---

### {Principle 2}

{Explain principle 2 in plain language.}

Signals:

- {Signal 1}
- {Signal 2}
- {Signal 3}

Good examples:

- "{Good example 1}"
- "{Good example 2}"

Avoid:

- {Avoidance 1}
- {Avoidance 2}

---

### {Principle 3}

{Explain principle 3 in plain language.}

Signals:

- {Signal 1}
- {Signal 2}
- {Signal 3}

Good examples:

- "{Good example 1}"
- "{Good example 2}"

Avoid:

- {Avoidance 1}
- {Avoidance 2}

---

## Default execution expectations

Unless an explicit exception is declared in the YAML:

- Use the required point of view declared in `voice_policy.point_of_view`.
- Avoid all forbidden words listed in `lexical_policy.forbidden_words.exact`.
- Avoid forbidden patterns listed in `pattern_policy.forbidden_patterns`.
- Keep sentences within field-level hard limits declared in `field_applicability`.
- Include a clear call to action where `cta_required` is true.
- Use data when broad claims are made.
- Prefer active voice unless an exception applies.
- Stay audience-first throughout.

---

## Exception model

Exceptions are allowed only when declared in the YAML `exceptions.declared` block. Undeclared exceptions hard fail.

Three exceptions are pre-declared in this template:

Case study exception: allows third-person brand reference in case study content to distinguish brand contribution from client contribution.

Quote preservation exception: allows quoted material to retain source phrasing even where it would otherwise fail lexical or sentence rules. Applies to `quotation` and `citation` content zones only.

Legal and regulated text exception: defers to higher-priority legal or regulatory policy where required by law or compliance.

---

## Exemplars

Each exemplar below is referenced in the YAML by its `active_exemplar_key`. Validators use authoritative repository exemplars retrieved via `exemplars.storage.retrieval`, not the Markdown copies shown here.

### {exemplar-name}

Key: `{brand_id}.standards.verbal-identity.tone-of-voice.exemplar.{example_key}`

"{Approved exemplar copy.}"

Why it works:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Anti-exemplars

Anti-exemplars are negative reference material for human review only. They are excluded from all deterministic and heuristic validation. They must not be scored, repaired, or published.

### {anti-exemplar-name}

"{Anti-exemplar copy.}"

Why it fails:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Validator interpretation notes

### Deterministic checks

Implement with direct pattern logic, lexicons, structural checks, or measurable thresholds. Run in the order declared in `execution.rule_execution_order.phase_1_deterministic`. D009 is intentionally absent from the deterministic rule set — it is implemented as H007.

### Heuristic checks

Implement using a classifier, scorer, or model-based evaluator. Run only after all deterministic checks pass or produce soft warnings only. Every heuristic check must return both a score and a reason. Never return a score alone.

### Scale note for heuristic scores

H002 scores on a 0-100 percentage scale. All other heuristic rules score on a 0.0-1.0 probability scale. Do not normalise across these scales. See `execution.heuristic_decisioning.threshold_resolution`.

### Classifier reference

Any classifier referenced in a rule's `detect.requires_classifier` field must be declared in `classifiers`. H007 depends on `broad_claim_detector`.

### Exemplar retrieval

Exemplars required by H002 are fetched via the protocol declared in `exemplars.storage.retrieval`. If retrieval fails, H002 is skipped with a soft warning per `fallback_behaviour`.

### Em dash detection

D010 matches the em dash glyph (U+2014) directly, including unspaced usage. Do not limit detection to the spaced variant only.

### Retry behaviour

On deterministic failure: repair at sentence level, re-evaluate before proceeding.
On heuristic failure: repair at paragraph level, re-evaluate before proceeding.
After two failed repairs: trigger full regeneration.
After three total attempts: escalate to human review. Do not publish.

---

## Change log

| Version | Date       | Changes                    |
|---------|------------|----------------------------|
| 1.0.0   | YYYY-MM-DD | Initial published version. |

---

## Validation modes

This file can be validated in two modes.

Template validation: validates the structure of this reusable template. In this mode, the validator recognises `template.is_template: true` and does not require placeholder substitution.

Policy validation: validates an instantiated brand policy. In this mode, all `{placeholder}` values and `YYYY-MM-DD` date placeholders must be replaced, and the `template` metadata block must be removed.

---

## Publishing checklist

Before publication, confirm:

- All `{placeholder}` values have been replaced with brand-specific content.
- All `YYYY-MM-DD` date placeholders have been replaced with real ISO dates.
- No `<runtime_variable>` values have been replaced.
- The `template` metadata block has been removed.
- The YAML parses successfully with no errors.
- `schema.validation_status` reflects the actual validation state.
- `status` and `lifecycle_state` reflect the actual governance state.
- All rule IDs referenced in `execution.rule_execution_order` exist in `rules`.
- All exception IDs referenced in `unless_exception` blocks exist in `exceptions.declared`.
- All exemplar keys in `active_exemplar_keys` resolve, or `fallback_behaviour` is declared.
- Every forbidden word with a replacement remediation action has a `preferred_replacements` entry.
- Positive exemplars do not violate any deterministic rule.
- Anti-exemplars are explicitly excluded from validation.
- All channel and content-type values in rules and `decision_policy` match `scope.applies_to`.
- D003 regex patterns contain the real, regex-escaped brand name, not the `{Brand Name}` placeholder.
- H007 `when` content_type and channel values reflect this brand's scope, not the template defaults.
- The telemetry schema is valid and the policy key and version are attached to every validation report.