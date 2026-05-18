---
# =============================================================================
# BRANDO(R) MESSAGING FRAMEWORK STANDARD TEMPLATE
# brando-schema-1.0 | document_type: policy_standard
# =============================================================================

id: "{brand_id}.standards.verbal-identity.messaging-framework"
key: "{brand_id}.standards.verbal-identity.messaging-framework"
title: "{Brand Name} Messaging Framework"
description: >
  Core messaging framework standard governing message architecture, claims,
  proof points, audience messaging, and narrative hierarchy across
  {Brand Name} communications.

policy_kind: standard
pillar: standards
category: verbal_identity
subcategory: messaging_framework
document_type: policy_standard

template:
  is_template: true
  placeholder_status: contains_placeholders
  instantiate_before_validation: true

version: "1.0.0"
status: draft
lifecycle_state: proposed
effective_date: "YYYY-MM-DD"
created: "YYYY-MM-DD"
last_modified: "YYYY-MM-DD"
next_review: "YYYY-MM-DD"

owner:
  team: "{Brand Team Name}"
  steward: "{Steward Role or Name}"

approved_by:
  - "{Approving Team or Role}"

schema:
  type: BrandMessagingFrameworkStandard
  version: brando-schema-1.0
  validation_status: ready_for_validation

naming:
  client_term: Messaging Framework
  canonical_term: Verbal Identity
  policy_label: Messaging Framework
  rationale: >
    {Explain how the client names this artefact and how Brando should map it
    into the canonical governance model.}

scope:
  applies_to:
    channels:
      - website
      - linkedin
      - email
      - newsletter
      - event_platform
      - sales_enablement
      - pitch_deck
      - proposal
    content_types:
      - positioning_statement
      - core_promise
      - value_proposition
      - message_pillar
      - proof_point
      - differentiator
      - audience_message
      - campaign_message
      - sales_message
      - headline
      - subhead
      - body_copy
      - email_copy
      - call_to_action
    audiences:
      - marketing_manager
      - content_creator
      - social_media
      - executive_communications
      - sales
      - partner_marketing
      - new_hire
      - ai_agent
      - "{audience_1_id}"
      - "{audience_2_id}"
    content_zones:
      - rendered_copy
      - quotation
      - citation
      - metadata
      - source_note
      - legal_disclaimer
  excludes:
    content_types:
      - legal_disclaimer
      - regulated_disclosure
      - invoice
      - procurement_template
  notes:
    - Applies to generated and edited messaging, marketing, editorial, sales, and campaign copy.
    - Governs the message architecture behind copy, not only the final rendered text.

policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - "{brand_id}.applications.*"
    - "{brand_id}.standards.verbal-identity.messaging-framework"
    - "{brand_id}.standards.verbal-identity.tone-of-voice"
  conflict_resolution:
    mode: higher_priority_wins
    notes:
      - Higher-priority safety, legal, and market policies always override message preferences.

inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
    - "{brand_id}.standards.verbal-identity.tone-of-voice"
  may_be_overridden_by:
    - "{brand_id}.applications.*"
    - "{brand_id}.campaigns.*"

messaging_policy:
  objectives:
    required:
      - clarity
      - differentiation
      - evidence_alignment
      - audience_relevance
  message_characteristics:
    required:
      - specific
      - evidence_led
      - audience_aware
    discouraged:
      - generic_category_language
      - unsupported_superlatives
      - vague_transformation_claims
  hierarchy:
    required_order:
      - positioning_statement
      - core_promise
      - value_proposition
      - proof_point
      - call_to_action

message_architecture:
  positioning_statement:
    id: positioning_statement
    label: Positioning Statement
    message: "{Approved positioning statement.}"
    required: true
  core_promise:
    id: core_promise
    label: Core Promise
    message: "{Approved core promise.}"
    required: true
  value_propositions:
    minimum_required: 1
    items:
      - id: "{value_prop_1_id}"
        label: "{Value proposition 1 label}"
        message: "{Approved value proposition 1.}"
        proof_refs:
          - "{proof_ref_1}"
  message_pillars:
    minimum_required: 3
    items:
      - id: "{pillar_1_id}"
        label: "{Pillar 1 label}"
        message: "{Approved pillar 1 message.}"
        proof_refs:
          - "{proof_ref_1}"
  proof_points:
    minimum_required: 1
    items:
      - id: "{proof_1_id}"
        label: "{Proof point 1 label}"
        statement: "{Approved proof point statement.}"
        source_ref: "{source_reference_or_repository_key}"

audience_messaging:
  default_audience: "{audience_1_id}"
  segments:
    - id: "{audience_1_id}"
      label: "{Audience 1 label}"
      primary_need: "{Audience need, problem, or decision context.}"
      approved_message: "{Approved audience-specific message.}"
      preferred_cta: "{cta_1_id}"

claims_policy:
  allowed_claim_types:
    - capability_claim
    - operational_claim
    - audience_problem_claim
  restricted_claim_types:
    - performance_claim
    - comparative_claim
    - compliance_claim
  forbidden_claim_types:
    - unverified_superlative
    - guaranteed_outcome
  evidence_requirements:
    default:
      proof_required: true
      accepted_proof_types:
        - case_study
        - benchmark
        - audit_result

lexical_policy:
  forbidden_words:
    exact:
      - "{forbidden_word_1}"
      - "{forbidden_word_2}"
  discouraged_words:
    - "{discouraged_word_1}"
  preferred_replacements:
    "{discouraged_word_1}":
      - "{preferred_replacement_1}"

field_applicability:
  positioning_statement:
    target_max_words: 24
    hard_max_words: 36
    proof_required: true
  value_proposition:
    target_max_words: 18
    hard_max_words: 28
    proof_required: true
  headline:
    target_max_words: 10
    hard_max_words: 14
    proof_required: false
  body_copy:
    target_max_words: 18
    hard_max_words: 28
    proof_required: true
  call_to_action:
    target_max_words: 10
    hard_max_words: 14
    proof_required: false

exceptions:
  undeclared_exception_behaviour: hard_fail
  validation:
    exception_must_be_declared_in_policy: true
    exception_must_match_content_context: true
  declared:
    - id: quoted_material
      description: Quoted material may retain source phrasing where traceability is required.
      when:
        content_zone:
          - quotation
          - citation

exemplars:
  minimum_review_count: 2
  active_exemplar_keys:
    - "{example_key_1}"
    - "{example_key_2}"
  anti_exemplars:
    excluded_from_deterministic_validation: true
    excluded_from_heuristic_validation: true

classifiers:
  claim_type_classifier:
    description: >
      Classifies governed copy into approved, restricted, or forbidden claim types.
  audience_relevance_classifier:
    description: >
      Scores whether a message matches the declared audience segment and need state.
  proof_quality_classifier:
    description: >
      Scores the quality and sufficiency of attached proof for governed claims.

execution:
  enforcement_mode: blocking
  max_retry_attempts: 3
  escalate_to_human_after: 3
  rule_id_policy:
    deterministic_pattern: "^D[0-9]{3}$"
    heuristic_pattern: "^H[0-9]{3}[A-Z]?$"

decision_policy:
  pass_conditions:
    - all_required_message_sources_present
    - no_hard_failures
  warn_conditions:
    - only_soft_warnings_present
  fail_conditions:
    - any_hard_failure_present

telemetry:
  log_policy_key: true
  log_policy_version: true
  log_rule_failures: true
  log_retry_history: true
  log_exception_usage: true
  log_message_source_refs: true
  log_proof_refs: true
  retain_validation_report: true
  output_format: json

related_standards:
  - "{brand_id}.brand.core"
  - "{brand_id}.standards.verbal-identity.tone-of-voice"

related_applications:
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.newsletter"

template_checklist:
  - All `{placeholder}` values have been replaced with brand-specific content.
  - All `YYYY-MM-DD` values have been replaced with real ISO dates.
  - The `template` block has been removed before final policy publication.
  - The YAML parses cleanly before validation.
---

# {Brand Name} Messaging Framework

This template is designed to produce a Markdown document with YAML frontmatter.
The YAML frontmatter holds the executable message policy. The Markdown body
should explain how humans should read, review, and apply the policy.

## How To Use This Template

1. Replace all `{placeholder}` values with brand-specific content.
2. Replace all `YYYY-MM-DD` values with real ISO dates.
3. Keep message architecture, claim rules, and validation settings in YAML.
4. Use the Markdown body for narrative explanation, reviewer notes, and examples.
5. Remove the `template` block when publishing a final policy.

## Suggested Markdown Sections

- Messaging summary
- Message architecture overview
- Claims and proof guidance
- Audience notes
- Review and approval notes

## Authoring Notes

- Keep the YAML authoritative.
- Keep the Markdown explanatory.
- Do not duplicate executable rules in prose unless the duplication is intentional for reviewer clarity.

## Purpose

This messaging framework governs how a brand structures meaning before copy is
rendered into specific applications or campaigns. It defines the approved
message architecture, claims model, proof expectations, and audience
adaptation behaviour that downstream content must inherit.

## Policy Structure

The YAML frontmatter is expected to define:

- policy identity, ownership, lifecycle, and schema metadata
- scope, precedence, inheritance, and resolution
- messaging principles and the approved message hierarchy
- audience messaging, claims policy, lexical policy, and field applicability
- exceptions, exemplars, classifiers, execution, decision policy, and telemetry

## What The Final Markdown Should Explain

When this template becomes a real messaging framework, the Markdown body should
explain:

- the approved positioning statement, core promise, and value proposition logic
- how proof is attached to claims
- how audience-specific messages differ within approved bounds
- what wording patterns are forbidden or discouraged
- how validation outcomes should be interpreted by editors and approvers

## Reviewer Notes

Reviewers should be able to compare the Markdown explanation against the YAML
fields and confirm that:

- the message hierarchy described in prose matches `message_architecture`
- claims and evidence expectations match `claims_policy`
- lexical guidance in prose matches `lexical_policy`
- field-level expectations described in prose match `field_applicability`
