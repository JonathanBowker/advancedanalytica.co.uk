---
# =============================================================================
# BRANDO(R) APPLICATION POLICY TEMPLATE
# brando-schema-1.0 | document_type: application_policy
# =============================================================================
#
# PLACEHOLDER CONVENTION - READ BEFORE EDITING
# -----------------------------------------------------------------------------
# {curly_brace} placeholders must be replaced with brand-specific content
# before this template is promoted to an application policy and policy-validated.
#
# <angle_bracket> values are runtime variables resolved at validation time.
# Do NOT replace these. They are consumed by the validation engine.
#
# Quote every YAML value that contains a {curly_brace} placeholder.
# Unquoted curly braces are interpreted as flow mapping syntax and will
# cause a parse error.
# =============================================================================

# -----------------------------------------------------------------------------
# DOCUMENT IDENTITY
# -----------------------------------------------------------------------------
id: "{brand_id}.applications.{application_id}"
key: "{brand_id}.applications.{application_id}"
title: "{Brand Name} {Application Name} Application Policy"
description: >
  Application policy governing how {Brand Name} standards are applied to
  {Application Name} outputs, including channel context, required components,
  inherited standards, overrides, exceptions, validation rules, and publishing
  behaviour.

policy_kind: application
pillar: applications
category: application_policy
subcategory: "{application_id}"
document_type: application_policy

# -----------------------------------------------------------------------------
# TEMPLATE METADATA
# -----------------------------------------------------------------------------
template:
  is_template: true
  placeholder_status: contains_placeholders
  instantiate_before_validation: true

# -----------------------------------------------------------------------------
# VERSIONING AND LIFECYCLE
# -----------------------------------------------------------------------------
version: "1.0.0"
status: draft
lifecycle_state: proposed
effective_date: "YYYY-MM-DD"
created: "YYYY-MM-DD"
last_modified: "YYYY-MM-DD"
next_review: "YYYY-MM-DD"

# -----------------------------------------------------------------------------
# OWNERSHIP AND APPROVAL
# -----------------------------------------------------------------------------
owner:
  team: "{Brand Team Name}"
  steward: "{Steward Role or Name}"

approved_by:
  - "{Approving Team or Role}"

# -----------------------------------------------------------------------------
# SCHEMA METADATA
# -----------------------------------------------------------------------------
schema:
  type: BrandApplicationPolicy
  version: brando-schema-1.0
  validation_status: ready_for_validation

# -----------------------------------------------------------------------------
# CLIENT NAMING MAP
# -----------------------------------------------------------------------------
naming:
  client_term: "{Client-facing application name}"
  canonical_term: Application Policy
  policy_label: "{Application Name}"
  rationale: >
    {Explain how the client refers to this application, channel, format, or use
    case, and how Brando should map it into the canonical applications layer.}

# -----------------------------------------------------------------------------
# APPLICATION PROFILE
# -----------------------------------------------------------------------------
application:
  id: "{application_id}"
  name: "{Application Name}"
  type: "{application_type}"
  primary_channel: "{primary_channel}"
  secondary_channels:
    - "{secondary_channel_1}"
    - "{secondary_channel_2}"
  reusable_application: true
  campaign_overrides_allowed: true
  materialize_effective_application_policy: true

# -----------------------------------------------------------------------------
# SCOPE
# -----------------------------------------------------------------------------
scope:
  applies_to:
    channels:
      - "{primary_channel}"
      - "{secondary_channel_1}"
      - "{secondary_channel_2}"
    content_types:
      - "{application_content_type_1}"
      - "{application_content_type_2}"
      - headline
      - subhead
      - body_copy
      - call_to_action
      - image_asset
      - layout_asset
    audiences:
      - marketing_manager
      - content_creator
      - executive_communications
      - sales
      - partner_marketing
      - new_hire
      - ai_agent
      - "{audience_1_id}"
      - "{audience_2_id}"
    content_zones:
      - rendered_copy
      - visual_asset
      - logo_zone
      - image_zone
      - metadata
      - quotation
      - citation
      - legal_disclaimer
      - platform_ui_overlay
    output_contexts:
      - generated_content
      - edited_content
      - human_authored_content
      - ai_assisted_content
      - final_published_asset
  excludes:
    content_types:
      - legal_disclaimer
      - regulated_disclosure
      - invoice
      - procurement_template
  notes:
    - Applies to generated, edited, and assembled application-specific outputs.
    - Resolves and narrows inherited standards for a specific channel or format.
    - Does not replace higher-priority legal, safety, or market policies.

# -----------------------------------------------------------------------------
# POLICY PRECEDENCE AND INHERITANCE
# -----------------------------------------------------------------------------
policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - "{brand_id}.campaigns.*"
    - "{brand_id}.applications.{application_id}"
    - "{brand_id}.standards.*"
  conflict_resolution:
    mode: most_restrictive_wins
    notes:
      - Higher-priority policies always override application preferences.
      - Campaign policy may narrow this application policy only within declared scope.

inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
    - "{brand_id}.standards.verbal-identity.tone-of-voice"
    - "{brand_id}.standards.verbal-identity.messaging-framework"
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.visual-identity.logo"
    - "{brand_id}.standards.visual-identity.typography"
    - "{brand_id}.standards.visual-identity.layout"
    - "{brand_id}.standards.visual-identity.imagery"
  may_be_overridden_by:
    - "{brand_id}.campaigns.*"
    - "{brand_id}.market.*"
    - "{brand_id}.legal.*"
    - "{brand_id}.exceptions.*"
  override_constraints:
    application_may_narrow_standards: true
    application_may_weaken_legal_safety_or_regulatory_rules: false
    campaign_may_narrow_application_policy: true
    campaign_may_weaken_application_policy_without_exception: false

# -----------------------------------------------------------------------------
# STANDARD DEPENDENCIES AND REQUIREMENTS
# -----------------------------------------------------------------------------
standard_dependencies:
  required:
    - ref: "{brand_id}.brand.core:^1.0.0"
      role: brand_foundation
    - ref: "{brand_id}.standards.verbal-identity.tone-of-voice:^1.0.0"
      role: copy_behaviour
    - ref: "{brand_id}.standards.verbal-identity.messaging-framework:^1.0.0"
      role: message_governance
    - ref: "{brand_id}.standards.visual-identity.layout:^1.0.0"
      role: layout_and_safe_areas
  optional:
    - ref: "{brand_id}.standards.visual-identity.motion:^1.0.0"
      role: motion_behaviour
  fallback_behaviour:
    if_required_standard_unavailable: hard_fail
    if_optional_standard_unavailable: skip_with_warning

application_requirements:
  required_components:
    - id: "{required_component_1}"
      source_standard: "{brand_id}.standards.verbal-identity.messaging-framework"
      required: true
    - id: "{required_component_2}"
      source_standard: "{brand_id}.standards.visual-identity.layout"
      required: true
  conditional_components:
    - id: "{conditional_component_1}"
      required_when:
        branded_asset: true

# -----------------------------------------------------------------------------
# APPLICATION OVERRIDES
# -----------------------------------------------------------------------------
application_overrides:
  tone_of_voice:
    enabled: true
    source_ref: "{brand_id}.standards.verbal-identity.tone-of-voice"
    overrides:
      target_max_words: "{target_max_words}"
      hard_max_words: "{hard_max_words}"
      cta_required: "{cta_required_boolean}"
  layout:
    enabled: true
    source_ref: "{brand_id}.standards.visual-identity.layout"
    overrides:
      allowed_layout_patterns:
        - "{layout_pattern_1}"
        - "{layout_pattern_2}"
      target_aspect_ratios:
        - "{aspect_ratio_1}"
        - "{aspect_ratio_2}"
  logo:
    enabled: true
    source_ref: "{brand_id}.standards.visual-identity.logo"
    overrides:
      logo_required: "{logo_required_boolean}"
      allowed_logo_variants:
        - "{logo_variant_1}"
        - "{logo_variant_2}"

# -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
field_applicability:
  headline:
    required: "{headline_required_boolean}"
    target_max_words: 10
    hard_max_words: 14
  body_copy:
    required: "{body_copy_required_boolean}"
    target_max_words: 18
    hard_max_words: 28
  call_to_action:
    required: "{cta_required_boolean}"
    target_max_words: 10
    hard_max_words: 14
  layout_asset:
    required: true
    safe_area_required: true
    cognitive_load_check_required: true

# -----------------------------------------------------------------------------
# EXCEPTIONS, EXECUTION, AND TELEMETRY
# -----------------------------------------------------------------------------
exceptions:
  undeclared_exception_behaviour: hard_fail
  validation:
    exception_must_be_declared_in_policy: true
    exception_must_match_content_context: true
  declared:
    - id: "{exception_1_id}"
      description: "{Describe the allowed application exception.}"
      when:
        content_type: "{application_content_type_1}"

execution:
  enforcement_mode: blocking
  max_retry_attempts: 3
  escalate_to_human_after: 3
  rule_id_policy:
    deterministic_pattern: "^D[0-9]{3}$"
    heuristic_pattern: "^H[0-9]{3}[A-Z]?$"

decision_policy:
  pass_conditions:
    - no_hard_failures
  warn_conditions:
    - only_soft_warnings_present
  fail_conditions:
    - any_hard_failure_present
  publish_conditions:
    - pass_or_warn_with_approval

telemetry:
  log_policy_key: true
  log_policy_version: true
  log_application_id: true
  log_inherited_standard_refs: true
  log_application_overrides: true
  log_rule_failures: true
  retain_validation_report: true
  output_format: json

# -----------------------------------------------------------------------------
# RELATED REFERENCES
# -----------------------------------------------------------------------------
related_standards:
  - "{brand_id}.brand.core"
  - "{brand_id}.standards.verbal-identity.tone-of-voice"
  - "{brand_id}.standards.verbal-identity.messaging-framework"
  - "{brand_id}.standards.visual-identity.layout"

related_campaigns:
  - "{brand_id}.campaigns.*"

# -----------------------------------------------------------------------------
# TEMPLATE CHECKLIST
# -----------------------------------------------------------------------------
template_checklist:
  - All `{placeholder}` values have been replaced with application-specific content.
  - All `YYYY-MM-DD` values have been replaced with real ISO dates.
  - The `template` block has been removed before final policy publication.
  - The YAML parses cleanly before validation.
---

# {Application Name} Application Policy

This template is designed to produce a Markdown document with YAML frontmatter.
The frontmatter is the machine-readable policy source. The Markdown body is for
human review, handoff, and governance context.

## How To Use This Template

1. Replace all `{placeholder}` values with application-specific content.
2. Replace all `YYYY-MM-DD` values with real ISO dates.
3. Keep machine fields in the YAML frontmatter.
4. Use the Markdown body for explanation, reviewer notes, implementation context, and rollout guidance.
5. Remove the `template` block when promoting this file to a final published policy.

## Suggested Markdown Sections

- Application summary
- Intended channels and outputs
- Key inherited standards
- Important overrides
- Review and approval notes

## Authoring Notes

- Keep the YAML authoritative.
- Keep the Markdown explanatory.
- Do not move executable policy fields into the Markdown body.

## Purpose

This application policy governs how inherited brand standards are applied to a
specific channel, format, workflow, or surface. It narrows the brand system
for a particular use case without weakening higher-priority legal, safety,
regulatory, or accessibility requirements.

## Policy Structure

The YAML frontmatter is expected to define:

- application identity, ownership, lifecycle, and schema metadata
- the application profile, reusable status, and scope
- precedence, inheritance, and resolution behaviour
- standard dependencies and required components
- application-specific overrides across messaging, colour, logo, typography, layout, imagery, and motion
- field applicability, exceptions, execution, decision policy, and telemetry

## What The Final Markdown Should Explain

When this template becomes a real application policy, the Markdown body should
explain:

- what the application is and where it is used
- which inherited standards remain binding
- which overrides are intentional and why
- what reviewers should look for in required components and field behaviour
- how warnings, failures, retries, and approvals should be interpreted

## Reviewer Notes

Reviewers should be able to compare the Markdown explanation against the YAML
fields and confirm that:

- the described application scope matches `scope.applies_to`
- inherited standards and overrides described in prose match the declared refs
- required components are consistent with the intended output type
- approval and publication behaviour described in prose match `decision_policy`
