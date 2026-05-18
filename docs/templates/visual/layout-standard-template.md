---
# =============================================================================
# BRANDO(R) LAYOUT STANDARD TEMPLATE
# brando-schema-1.0 | document_type: policy_standard
# =============================================================================

id: "{brand_id}.standards.visual-identity.layout"
key: "{brand_id}.standards.visual-identity.layout"
title: "{Brand Name} Layout"
description: >
  Core layout standard governing grid systems, spacing, hierarchy, composition,
  responsive behaviour, safe areas, accessibility, and layout-token usage
  across {Brand Name} communications.

policy_kind: standard
pillar: standards
category: visual_identity
subcategory: layout
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
  type: BrandLayoutStandard
  version: brando-schema-1.0
  validation_status: ready_for_validation

naming:
  client_term: Layout
  canonical_term: Visual Identity
  policy_label: Layout
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
      - digital_ad
      - print
      - social
      - mobile
    content_types:
      - page_layout
      - landing_page_layout
      - hero_layout
      - article_layout
      - email_layout
      - newsletter_layout
      - social_layout
      - pitch_deck_layout
      - proposal_layout
      - form_layout
      - navigation_layout
      - footer_layout
    audiences:
      - marketing_manager
      - content_creator
      - social_media
      - executive_communications
      - sales
      - ai_agent
      - "{audience_1_id}"
      - "{audience_2_id}"
    content_zones:
      - rendered_layout
      - safe_area
      - bleed_area
      - overlay_area
      - metadata
      - legal_disclaimer
    breakpoints:
      - mobile
      - tablet
      - desktop
      - wide_desktop
      - social_square
      - social_portrait
      - story_vertical
    target_aspect_ratios:
      - "1:1"
      - "4:5"
      - "9:16"
      - "16:9"
  excludes:
    content_types:
      - legal_contract_layout
      - invoice_layout
  notes:
    - Applies to generated, edited, templated, and assembled layouts.
    - Governs both tokenized layout rules and rendered compositions.

policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - "{brand_id}.applications.*"
    - "{brand_id}.standards.visual-identity.layout"
  conflict_resolution:
    mode: higher_priority_wins

inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.visual-identity.typography"
    - "{brand_id}.standards.visual-identity.imagery"
    - "{brand_id}.standards.verbal-identity.messaging-framework"
  may_be_overridden_by:
    - "{brand_id}.applications.*"
    - "{brand_id}.campaigns.*"

layout_policy:
  objectives:
    required:
      - hierarchy
      - accessibility
      - responsive_integrity
      - safe_area_compliance
  layout_characteristics:
    required:
      - structured
      - legible
      - balanced
      - channel_aware
    discouraged:
      - cluttered
      - unstable_overlay_text
      - inaccessible_density

layout_tokens:
  grid_systems:
    - id: "{grid_system_1_id}"
      label: "{Grid system 1 label}"
      columns: 12
      gutter_token: "{spacing_token_gutter}"
      margin_token: "{spacing_token_margin}"
  spacing_tokens:
    - id: "{spacing_token_s}"
      value_px: 8
    - id: "{spacing_token_m}"
      value_px: 16
    - id: "{spacing_token_l}"
      value_px: 24
  layout_patterns:
    - id: "{layout_pattern_1}"
      label: "{Layout pattern 1 label}"
      pattern_type: hero_layout
      semantic_role: primary_storytelling
      grid_ref: "{grid_system_1_id}"

safe_area_policy:
  default:
    safe_area_required: true
    minimum_inner_margin_token: "{spacing_token_m}"
  channel_specific_safe_areas:
    linkedin:
      source: channel_spec
    instagram_reels:
      source: channel_spec
    tiktok:
      source: channel_spec
  dynamic_safe_area_required_for_social_layout: true

responsive_policy:
  required_behaviours:
    - preserve_reading_order
    - preserve_safe_areas
    - preserve_cta_visibility
  allowed_reflow_actions:
    - stack_columns
    - resize_media
    - reduce_spacing_within_approved_bounds
  forbidden_reflow_actions:
    - hide_required_content
    - allow_overlay_obstruction

field_applicability:
  page_layout:
    maximum_visual_density_score: 0.72
    minimum_contrast_ratio: 4.5
    responsive_validation_required: true
  hero_layout:
    maximum_visual_density_score: 0.62
    minimum_contrast_ratio: 4.5
    cta_required: true
  social_layout:
    maximum_visual_density_score: 0.66
    minimum_contrast_ratio: 4.5
    dynamic_safe_area_required: true

exceptions:
  undeclared_exception_behaviour: hard_fail
  declared:
    - id: "{exception_1_id}"
      description: "{Describe the allowed layout exception.}"
      when:
        channel: social

classifiers:
  layout_semantic_fit_classifier:
    description: >
      Scores whether a selected layout pattern fits the declared content type and channel.
  layout_density_classifier:
    description: >
      Scores visual density and flags crowded regions that reduce comprehension.
  accessibility_risk_classifier:
    description: >
      Scores contrast, obstruction, and safe-area risks in rendered layouts.

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

telemetry:
  log_policy_key: true
  log_policy_version: true
  log_rule_failures: true
  log_retry_history: true
  log_layout_pattern_refs: true
  log_grid_refs: true
  log_spacing_token_refs: true
  log_breakpoint_results: true
  retain_validation_report: true
  output_format: json

related_standards:
  - "{brand_id}.brand.core"
  - "{brand_id}.standards.visual-identity.colour"
  - "{brand_id}.standards.visual-identity.typography"
  - "{brand_id}.standards.verbal-identity.messaging-framework"

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

# {Brand Name} Layout

This template is designed to produce a Markdown document with YAML frontmatter.
The YAML frontmatter contains the governed layout rules. The Markdown body
supports human review and explains how to apply the policy in practice.

## How To Use This Template

1. Replace all `{placeholder}` values with brand-specific content.
2. Replace all `YYYY-MM-DD` values with real ISO dates.
3. Keep grid, spacing, layout pattern, breakpoint, and validation fields in YAML.
4. Use the Markdown body for rollout notes, implementation interpretation, and reviewer guidance.
5. Remove the `template` block when publishing a final policy.

## Suggested Markdown Sections

- Layout summary
- Grid and spacing model
- Responsive behaviour notes
- Safe-area guidance
- Review and approval notes

## Authoring Notes

- Keep the YAML authoritative.
- Keep the Markdown explanatory.
- Use Markdown to explain intent, not to replace executable layout fields.

## Purpose

This layout standard governs how visual structure is built across channels and
formats. It defines the approved grid logic, spacing model, layout patterns,
safe-area behaviour, and responsive expectations that keep layouts legible,
stable, and brand-consistent.

## Policy Structure

The YAML frontmatter is expected to define:

- policy identity, ownership, lifecycle, and schema metadata
- scope, precedence, inheritance, and resolution
- layout principles, objectives, and token systems
- grid systems, spacing tokens, layout patterns, safe-area rules, and responsive behaviour
- field applicability, exceptions, classifiers, execution, decision policy, and telemetry

## What The Final Markdown Should Explain

When this template becomes a real layout standard, the Markdown body should
explain:

- how the grid and spacing model supports hierarchy and readability
- which layout patterns are approved for which contexts
- how breakpoints, aspect ratios, and social safe areas are handled
- what kinds of reflow are allowed and forbidden
- how reviewers should interpret layout failures, repairs, and escalations

## Reviewer Notes

Reviewers should be able to compare the Markdown explanation against the YAML
fields and confirm that:

- described layout patterns match `layout_tokens.layout_patterns`
- safe-area guidance in prose matches `safe_area_policy`
- responsive expectations match `responsive_policy`
- review and escalation behaviour matches `execution` and `decision_policy`
