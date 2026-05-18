---
# =============================================================================
# BRANDO(R) COLOUR STANDARD SAMPLE POLICY
# brando-schema-1.0 | document_type: policy_standard
# =============================================================================

id: "example-brand.standards.visual-identity.colour"
key: "example-brand.standards.visual-identity.colour"
title: "Example Brand Colour"
description: >
  Core colour standard governing approved colour tokens, palette usage,
  contrast, accessibility, gradients, and print and digital colour behaviour
  across Example Brand communications.

policy_kind: standard
pillar: standards
category: visual_identity
subcategory: colour
document_type: policy_standard

version: "1.0.0"
status: active
lifecycle_state: published
effective_date: "2026-05-03"
created: "2026-05-03"
last_modified: "2026-05-03"
next_review: "2026-11-03"

owner:
  team: "Brand Systems"
  steward: "Head of Design Governance"

approved_by:
  - "Brand Council"
  - "Accessibility Lead"

schema:
  type: BrandColourStandard
  version: brando-schema-1.0
  validation_status: human_reviewed

naming:
  client_term: Colour
  canonical_term: Visual Identity
  policy_label: Colour
  rationale: >
    Example Brand uses Colour as the client-facing label for its visual identity
    rules. In Brando, this maps to the visual_identity category and the colour
    subcategory.

scope:
  applies_to:
    channels:
      - website
      - linkedin
      - email
      - newsletter
      - pitch_deck
      - print
      - product_ui
    content_types:
      - brand_mark
      - logo_lockup
      - typography
      - foreground_text
      - background
      - gradient
      - icon
      - chart
      - data_visualisation
      - ui_component
      - webpage
      - presentation_slide
      - social_asset
      - campaign_asset
    audiences:
      - marketing_manager
      - designer
      - product_designer
      - accessibility_reviewer
      - ai_agent
    content_zones:
      - rendered_design
      - live_text
      - decorative_background
      - image_overlay
      - chart_area
      - metadata
      - legal_disclaimer
  excludes:
    content_types:
      - third_party_logo
      - third_party_screenshot
      - unedited_source_image
      - regulated_disclosure
  notes:
    - Applies to generated and edited visual assets and the underlying colour tokens used to create them.
    - Does not apply to third-party marks or screenshots unless they are recoloured or composited.

policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.regulatory
    - global.accessibility
    - market.legal
    - enterprise.brand-core
    - "example-brand.applications.*"
    - "example-brand.standards.visual-identity.colour"
    - "example-brand.standards.visual-identity.logo"
    - "example-brand.standards.visual-identity.typography"
    - campaign.local
  conflict_resolution:
    mode: higher_priority_wins
    notes:
      - Accessibility and regulatory constraints override colour preference where they conflict.
      - Campaign adaptation must remain traceable to approved tokens, tints, or declared exceptions.

inheritance:
  inherits_from:
    - "example-brand.brand.core"
  may_be_overridden_by:
    - "example-brand.applications.website"
    - "example-brand.applications.product-ui"
    - "example-brand.campaigns.*"
    - "example-brand.legal.*"

resolution:
  resolve_inheritance_before_validation: true
  resolve_exceptions_before_rule_execution: true
  materialize_effective_policy: true
  effective_policy_output:
    include_resolved_rules: true
    include_applied_exceptions: true
    include_precedence_path: true
    include_resolved_colour_tokens: true
    include_resolved_palette_roles: true
    include_resolved_accessibility_requirements: true

principles:
  required:
    - brand_distinction
    - accessibility_first
    - functional_clarity
  definitions:
    brand_distinction:
      description: Colour use must reinforce instant recognition of Example Brand.
    accessibility_first:
      description: Colour choices must preserve readable contrast and non-colour cues for meaning.
    functional_clarity:
      description: Functional colours must carry stable meaning across all governed outputs.

colour_policy:
  objectives:
    required:
      - preserve_brand_recognition
      - maintain_accessibility
      - support_visual_hierarchy
      - distinguish_functional_meaning
      - maintain_cross_channel_consistency
  colour_characteristics:
    required:
      - distinctive
      - accessible
      - consistent
      - purposeful
    discouraged:
      - decorative_without_purpose
      - low_contrast_pairings
      - overuse_of_accent_colour
      - colour_only_meaning
  usage_model:
    required_roles:
      - primary_brand_colour
      - secondary_brand_colour
      - accent_colour
      - neutral_colour
      - text_colour
      - functional_colour
  accessibility:
    default_standard: WCAG_2_1_AA
    normal_text_minimum_contrast_ratio: 4.5
    large_text_minimum_contrast_ratio: 3.0
    non_text_ui_minimum_contrast_ratio: 3.0
    colour_only_meaning_forbidden: true
  gradients:
    allowed: true
    require_approved_tokens: true
    require_contrast_check_for_text_overlays: true
    contrast_evaluation: worst_case_within_text_bounding_box
  print_colour:
    cmyk_required_for_print: true
    default_colour_profile: "ISO Coated v2 (ECI)"
    fallback_materialization:
      enabled: true
      source_values:
        - hex
        - rgb
      colour_profile: "ISO Coated v2 (ECI)"
      fail_if_materialization_unavailable: true
      log_materialized_value: true

colour_tokens:
  palettes:
    primary:
      minimum_required: 1
      items:
        - id: midnight_navy
          name: Midnight Navy
          role: primary_brand_colour
          hex: "#10233F"
          rgb: "16,35,63"
          cmyk: "75,44,0,75"
    secondary:
      minimum_required: 1
      items:
        - id: signal_teal
          name: Signal Teal
          role: secondary_brand_colour
          hex: "#14B8A6"
          rgb: "20,184,166"
          cmyk: "89,0,10,28"
    accent:
      minimum_required: 1
      items:
        - id: ember_coral
          name: Ember Coral
          role: accent_colour
          hex: "#FF8C69"
          rgb: "255,140,105"
          cmyk: "0,45,59,0"
    neutral:
      minimum_required: 2
      items:
        - id: paper
          name: Paper
          role: neutral_colour
          hex: "#F8F3EA"
          rgb: "248,243,234"
          cmyk: "0,2,6,3"
        - id: carbon
          name: Carbon
          role: text_colour
          hex: "#12161D"
          rgb: "18,22,29"
          cmyk: "38,24,0,89"
    functional:
      minimum_required: 4
      items:
        - id: success_green
          name: Success Green
          role: functional_colour
          semantic_meaning: success
          hex: "#15803D"
          rgb: "21,128,61"
          cmyk: "84,0,52,50"
        - id: warning_amber
          name: Warning Amber
          role: functional_colour
          semantic_meaning: warning
          hex: "#D97706"
          rgb: "217,119,6"
          cmyk: "0,45,97,15"
        - id: error_red
          name: Error Red
          role: functional_colour
          semantic_meaning: error
          hex: "#DC2626"
          rgb: "220,38,38"
          cmyk: "0,83,83,14"
        - id: info_blue
          name: Info Blue
          role: functional_colour
          semantic_meaning: information
          hex: "#2563EB"
          rgb: "37,99,235"
          cmyk: "84,58,0,8"
  approved_tints:
    enabled: true
    allowed_percentages:
      - 10
      - 20
      - 40
      - 60
      - 80
    require_token_reference: true
    id_format: "base_colour_id.tint.percentage"
  approved_gradients:
    enabled: true
    items:
      - id: navy_to_teal
        name: Navy to Teal
        stops:
          - colour_ref: midnight_navy
            position: 0
          - colour_ref: signal_teal
            position: 100
        allowed_uses:
          - background
          - campaign_asset
          - presentation_slide
        restricted_uses:
          - live_text_background
        contrast_check_required_for_text_overlay: true

colour_pairings:
  approved:
    - id: carbon_on_paper
      foreground_ref: carbon
      background_ref: paper
      allowed_for:
        - foreground_text
        - body_copy
        - ui_component
      minimum_contrast_ratio: 4.5
    - id: paper_on_midnight
      foreground_ref: paper
      background_ref: midnight_navy
      allowed_for:
        - foreground_text
        - presentation_slide
      minimum_contrast_ratio: 4.5
  restricted:
    - id: coral_on_navy_large_only
      foreground_ref: ember_coral
      background_ref: midnight_navy
      allowed_only_for:
        - large_display_text
      minimum_contrast_ratio: 3.0
  forbidden:
    - id: teal_on_coral
      foreground_ref: signal_teal
      background_ref: ember_coral
      reason: Contrast is unstable and the pairing weakens functional clarity.

required_elements:
  default:
    - approved_colour_token
    - usage_context
    - colour_role
    - contrast_check
    - output_format
  conditional:
    - id: contrast_required_for_text
      required_when:
        content_type:
          - foreground_text
          - typography
          - ui_component
    - id: non_colour_cue_required_for_semantic_colour
      required_when:
        colour_conveys_meaning: true

field_applicability:
  brand_mark:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    cmyk_required_for_print: true
  foreground_text:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true
  gradient:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    worst_case_contrast_required: true
    cmyk_required_for_print: true
  data_visualisation:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    non_colour_cue_required: true
    cmyk_required_for_print: true
  ui_component:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    cmyk_required_for_print: false

persona_profiles:
  marketing_manager:
    colour_adjustment: standard
  designer:
    colour_adjustment: full_token_system_access
  product_designer:
    colour_adjustment: ui_accessibility_first
  accessibility_reviewer:
    colour_adjustment: strict_contrast_enforcement
  ai_agent:
    colour_adjustment: strict_constraint_enforcement

exceptions:
  undeclared_exception_behaviour: hard_fail
  validation:
    exception_must_be_declared_in_policy: true
    exception_must_match_content_context: true
    log_all_exception_activations: true
  declared:
    - id: third_party_asset_exception
      description: Third-party logos and screenshots may retain their original colours when not recoloured.
      when:
        content_type:
          - third_party_logo
          - third_party_screenshot
      override:
        enforcement_mode: third_party_asset_preserved
    - id: accessibility_override_exception
      description: Accessibility requirements may override brand preference where a pairing fails contrast.
      when:
        policy_context:
          higher_priority_policy_matches:
            - global.accessibility
      override:
        enforcement_mode: accessibility_override

document_self_validation:
  validate_yaml_structure: true
  validate_authoritative_positive_exemplars: true
  validate_colour_token_references: true
  validate_colour_pairing_references: true
  validate_print_colour_resolution: true
  validate_heuristic_score_scale: true
  exclude_markdown_guidance: true
  exclude_change_log: true
  exclude_comments: true
  exclude_anti_exemplars: true

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
    - all_required_token_references_resolve
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
  retain_validation_report: true
  output_format: json
---

# Example Brand Colour

This sample policy shows what an instantiated colour standard should look like once it has been promoted from template to policy. The YAML frontmatter is the machine-readable source of truth. The Markdown body exists to make the same policy legible to human reviewers without forcing them to read raw YAML alone.

## Policy Summary

This standard governs how Example Brand uses colour across marketing, product, and presentation outputs. It defines:

- where the policy applies
- which colour roles are approved
- which tokens may be used for those roles
- how contrast and accessibility are enforced
- how gradients, print conversion, and exceptions are handled
- how validation, retry, and publication decisions should work

## Scope

This policy applies to Example Brand visual outputs across web, email, print, decks, and product UI. It governs both rendered visuals and the approved colour-token system used to create them.

Excluded cases:

- Third-party logos and screenshots that are not recoloured
- Regulated disclosures where higher-priority policy takes precedence

Governed content includes:

- brand marks and logo lockups
- typography and foreground text
- backgrounds and gradients
- icons, charts, and data visualisation
- UI components, webpages, slides, social assets, and campaign assets

Primary audiences in scope are marketing, design, product design, accessibility review, and AI-assisted production.

## Policy Precedence

This standard does not sit alone. It is evaluated in a precedence stack.

Higher-priority layers include:

- global safety
- global regulatory rules
- global accessibility
- market legal policy
- enterprise brand core

Application policies may narrow this standard, but they do not override accessibility or legal requirements. Where a colour preference conflicts with accessibility, accessibility wins.

## Colour Principles

The policy is built on three governing principles:

- `brand_distinction`: colour should reinforce instant recognition
- `accessibility_first`: colour should preserve readable contrast and non-colour meaning cues
- `functional_clarity`: functional states should carry stable meaning across outputs

These principles are not decorative. They are the interpretive basis for how token choice, contrast, and exceptions are judged.

## Colour System

The approved palette is built from five role groups, each with a clear governance role:

- `midnight_navy` as the primary brand colour
- `signal_teal` as the secondary brand colour
- `ember_coral` as the accent colour
- `paper` and `carbon` as neutral and text colours
- `success_green`, `warning_amber`, `error_red`, and `info_blue` as functional colours

The policy separates colour role from colour value. A token is not approved simply because it exists. It must be used in a way that matches its role:

- primary and secondary brand colours support recognition
- accent colours are used selectively for emphasis
- neutrals support text, whitespace, and stable surfaces
- functional colours are reserved for semantic states such as success, warning, error, and information

Approved gradients must use approved tokens only. Approved tints are limited to declared percentages. Print contexts require CMYK values, with controlled fallback materialization from Hex or RGB where necessary.

## Approved Pairings

The sample policy includes both positive and negative pairing logic.

Approved pairings include:

- `carbon` on `paper`
- `paper` on `midnight_navy`

Restricted pairing:

- `ember_coral` on `midnight_navy` for large display text only

Forbidden pairing:

- `signal_teal` on `ember_coral`

This is important because the policy does not only approve tokens. It also governs token combinations.

## Accessibility Rules

The policy defaults to `WCAG_2_1_AA`.

- Normal text must meet a minimum contrast ratio of `4.5`
- Large text must meet a minimum contrast ratio of `3.0`
- Non-text UI elements must meet a minimum contrast ratio of `3.0`
- Colour-only meaning is forbidden

Accessibility in this policy is broader than contrast alone. It also requires:

- non-colour cues where meaning depends on colour
- worst-case contrast evaluation for gradient overlays
- field-level thresholding for different visual component types

Where accessibility conflicts with brand preference, accessibility wins. That is enforced both by precedence and by explicit exception logic.

## Field-Level Behaviour

Different output fields are governed differently.

Examples from this sample:

- `brand_mark`: approved token required, `3.0` minimum contrast, CMYK required for print
- `foreground_text`: approved token required, `4.5` minimum contrast
- `gradient`: approved token required, `4.5` minimum contrast, worst-case contrast required
- `data_visualisation`: approved token required, `3.0` minimum contrast, non-colour cue required
- `ui_component`: approved token required, `3.0` minimum contrast

This matters because the policy is not a flat palette file. It is an executable rule set that treats different content types differently.

## Exceptions

Two exceptions are declared in this sample:

- `third_party_asset_exception`
  Allows third-party logos and screenshots to retain original colours when they are not recoloured.
- `accessibility_override_exception`
  Allows accessibility requirements to override preferred brand colour choices when a pairing fails required contrast.

Any undeclared exception must hard fail validation.

## Validation And Execution

The sample is configured as a blocking policy.

- deterministic rules use IDs matching `D###`
- heuristic rules use IDs matching `H###` or `H###A`
- maximum retry attempts: `3`
- escalation to human review after: `3`

The decision model is:

- pass when there are no hard failures and required references resolve
- warn when only soft warnings are present
- fail when any hard failure is present

Telemetry is expected to log:

- policy key and version
- rule failures
- retry history
- exception usage
- retained validation reports

## Validation Notes

This sample is intended to behave like a final policy document rather than a reusable template.

- The `template` block has been removed
- Placeholders have been replaced with concrete values
- Dates are real ISO dates
- The YAML frontmatter parses cleanly
- The Markdown body now reflects the actual policy structure rather than giving only a superficial summary
