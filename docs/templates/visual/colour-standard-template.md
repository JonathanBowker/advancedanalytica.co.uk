---
# =============================================================================
# BRANDO® COLOUR STANDARD TEMPLATE
# brando-schema-1.0 | document_type: policy_standard
# =============================================================================
#
# PLACEHOLDER CONVENTION — READ BEFORE EDITING
# -----------------------------------------------------------------------------
# {curly_brace} placeholders must be replaced with brand-specific content
# before this template is promoted to a brand policy and policy-validated.
#
# <angle_bracket> values are runtime variables resolved at validation time.
# Do NOT replace these. They are consumed by the validation engine.
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
# Recommended pattern: {brand_id}.standards.visual-identity.colour
id: "{brand_id}.standards.visual-identity.colour"

# Required. Usually mirrors id. Use as the stable lookup key in policy
# repositories, MCP servers, APIs, and audit logs.
key: "{brand_id}.standards.visual-identity.colour"

# Required. Human-readable title.
title: "{Brand Name} Colour"

# Required. Short description used in repositories, UIs, search, and audit logs.
description: "Core colour standard governing approved colour tokens, palette usage, contrast, accessibility, gradients, and print/digital colour behaviour across {Brand Name} communications."

# Required. Defines what kind of policy artefact this is.
# Allowed values:
# - standard | application | campaign | exception
# - exemplar_set | lexicon | telemetry_schema
policy_kind: standard

# Required. Top-level governance pillar.
# Allowed values controlled by Brando schema:
# - standards | applications | campaigns | legal | market | safety
pillar: standards

# Required. Category within the pillar. Use snake_case for controlled terms.
category: visual_identity

# Required. Subcategory within the category. Use snake_case for controlled terms.
subcategory: colour

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

# Required once active/published. ISO date. Quote to prevent YAML date parsing.
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
  - "{Approving Team or Role}"

# -----------------------------------------------------------------------------
# SCHEMA METADATA
# -----------------------------------------------------------------------------
schema:
  # Required. Schema class used by Brando.
  type: BrandColourStandard

  # Required. Schema version this document conforms to.
  version: brando-schema-1.0

  # Required. Validation state of this file.
  # Allowed values:
  # - ready_for_validation: authored but not yet parsed or reviewed
  # - human_reviewed: reviewed by a human but not formally schema-validated
  # - schema_validated: parsed and validated against the declared schema
  validation_status: ready_for_validation

# -----------------------------------------------------------------------------
# CLIENT NAMING MAP
# -----------------------------------------------------------------------------
# Optional but recommended. Maps client-facing terminology to Brando terms.
# This field supports terminology mapping only. It does not affect enforcement logic.
naming:
  client_term: Colour
  canonical_term: Visual Identity
  policy_label: Colour
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
    # Do not mix channels with design asset types in this list.
    channels:
      - website
      - linkedin
      - email
      - newsletter
      - event_platform
      - sales_enablement
      - pitch_deck
      - proposal
      - print
      - signage
      - product_ui

    # Required. Types of visual assets, design surfaces, or visual components
    # governed by this policy.
    #
    # Composite outputs such as pitch decks, landing pages, reports, and campaign
    # assets should be decomposed into governed visual fields before rule execution.
    content_types:
      - brand_mark
      - logo_lockup
      - typography
      - foreground_text
      - background
      - gradient
      - icon
      - illustration
      - photography_treatment
      - chart
      - data_visualisation
      - ui_component
      - webpage
      - landing_page
      - presentation_slide
      - report_page
      - proposal_page
      - social_asset
      - campaign_asset
      - sales_asset
      - event_graphic
      - packaging

    # Recommended. Audience or persona types for colour adaptation.
    audiences:
      - marketing_manager
      - content_creator
      - designer
      - social_media
      - executive_communications
      - sales
      - partner_marketing
      - product_designer
      - accessibility_reviewer
      - new_hire
      - ai_agent

    # Recommended. Zones within visual content.
    content_zones:
      - rendered_design
      - live_text
      - decorative_background
      - image_overlay
      - chart_area
      - metadata
      - legal_disclaimer
      - source_note

  excludes:
    content_types:
      - third_party_logo
      - third_party_screenshot
      - unedited_source_image
      - regulated_disclosure
      - invoice
      - procurement_template

  notes:
    - Applies to generated and edited visual assets, design systems, campaign layouts, presentation slides, reports, UI components, and data visualisations.
    - Applies to both final rendered visuals and the underlying colour tokens used to generate them.
    - Does not apply to third-party marks, screenshots, or source imagery unless recoloured, composited, or adapted.
    - Does not apply to legal or regulated text where a higher-priority policy explicitly overrides visual treatment.

# -----------------------------------------------------------------------------
# POLICY PRECEDENCE
# -----------------------------------------------------------------------------
# Recommended. Defines how this policy behaves when other policies also apply.
policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.regulatory
    - market.legal
    - global.accessibility
    - enterprise.brand-core
    - "{brand_id}.applications.*"
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.visual-identity.logo"
    - "{brand_id}.standards.visual-identity.typography"
    - campaign.local

  conflict_resolution:
    # Allowed values:
    # - higher_priority_wins | most_restrictive_wins | explicit_exception_required
    mode: higher_priority_wins
    notes:
      - Accessibility, legal, regulatory, and safety constraints override brand preference where they conflict.
      - Application-specific policy may narrow this standard only within its declared scope.
      - Application-specific policy may not weaken higher-priority legal, regulatory, safety, or accessibility constraints.
      - Campaign policy may adapt colour emphasis but must not introduce unapproved colour tokens unless an exception is declared.
      - Exceptions must be explicit and machine-readable to override defaults.

# -----------------------------------------------------------------------------
# INHERITANCE
# -----------------------------------------------------------------------------
# Optional but recommended for enterprise or multi-brand systems.
inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
  may_be_overridden_by:
    - "{brand_id}.applications.website"
    - "{brand_id}.applications.linkedin"
    - "{brand_id}.applications.pitch-deck"
    - "{brand_id}.applications.product-ui"
    - "{brand_id}.campaigns.*"
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
    include_resolved_colour_tokens: true
    include_resolved_palette_roles: true
    include_resolved_accessibility_requirements: true

# -----------------------------------------------------------------------------
# COLOUR PRINCIPLES
# -----------------------------------------------------------------------------
# Required. Three to five principles is usually enough.
# Keep descriptions to one clear sentence each.
principles:
  required:
    - "{colour_principle_1}"
    - "{colour_principle_2}"
    - "{colour_principle_3}"
  definitions:
    "{colour_principle_1}":
      description: "{Describe colour principle 1 in one clear sentence.}"
    "{colour_principle_2}":
      description: "{Describe colour principle 2 in one clear sentence.}"
    "{colour_principle_3}":
      description: "{Describe colour principle 3 in one clear sentence.}"

# -----------------------------------------------------------------------------
# COLOUR POLICY
# -----------------------------------------------------------------------------
# Required. Defines what colour must do.
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
      - adaptable_across_media
    discouraged:
      - decorative_without_purpose
      - low_contrast_pairings
      - unapproved_tints
      - overuse_of_accent_colour
      - colour_only_meaning
      - inconsistent_cross_channel_mapping

  usage_model:
    required_roles:
      - primary_brand_colour
      - secondary_brand_colour
      - accent_colour
      - neutral_colour
      - background_colour
      - text_colour
      - functional_colour
    notes:
      - Colour role is as important as colour value.
      - Approved colour tokens must be used according to their declared role.
      - Functional colour must be reserved for meaning-bearing states such as success, warning, error, and information.

  accessibility:
    default_standard: WCAG_2_1_AA
    normal_text_minimum_contrast_ratio: 4.5
    large_text_minimum_contrast_ratio: 3.0
    non_text_ui_minimum_contrast_ratio: 3.0
    colour_only_meaning_forbidden: true
    notes:
      - Text, icons, and UI controls must meet the contrast threshold declared for their field.
      - Colour must not be the only signal of status, risk, category, or action.
      - Add text, shape, iconography, pattern, or other non-colour cues where meaning depends on colour.

  gradients:
    allowed: true
    require_approved_tokens: true
    require_contrast_check_for_text_overlays: true
    contrast_evaluation: worst_case_within_text_bounding_box
    notes:
      - Gradients must use approved colour tokens or declared tints.
      - Text-over-gradient contrast must be checked at the lowest-contrast point covered by the text bounding box.
      - Validators must not use average contrast or endpoint-only contrast to pass text over gradients.

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
    notes:
      - Print and signage contexts should use declared CMYK values.
      - If CMYK values are missing for a print context, the engine shall attempt to materialize them from approved Hex or RGB values using the ISO Coated v2 (ECI) colour profile before failing.
      - Materialized CMYK values must be logged in the validation report.

# -----------------------------------------------------------------------------
# COLOUR TOKENS
# -----------------------------------------------------------------------------
# Required. Defines the approved colour system.
# Replace all placeholder entries before policy validation.
colour_tokens:
  palettes:
    primary:
      minimum_required: 1
      items:
        - id: "{primary_colour_1_id}"
          name: "{Primary colour 1 name}"
          role: primary_brand_colour
          hex: "{#000000}"
          rgb: "{0,0,0}"
          cmyk: "{0,0,0,100}"
          usage:
            preferred:
              - brand_mark
              - headline
              - background
            restricted:
              - error_state
            forbidden:
              - body_copy_on_dark_background

    secondary:
      minimum_required: 1
      items:
        - id: "{secondary_colour_1_id}"
          name: "{Secondary colour 1 name}"
          role: secondary_brand_colour
          hex: "{#000000}"
          rgb: "{0,0,0}"
          cmyk: "{0,0,0,100}"
          usage:
            preferred:
              - illustration
              - campaign_asset
              - supporting_background
            restricted: []
            forbidden: []

    accent:
      minimum_required: 1
      maximum_recommended: 3
      items:
        - id: "{accent_colour_1_id}"
          name: "{Accent colour 1 name}"
          role: accent_colour
          hex: "{#000000}"
          rgb: "{0,0,0}"
          cmyk: "{0,0,0,100}"
          usage:
            preferred:
              - call_to_action
              - highlight
              - data_visualisation
            restricted:
              - large_background_field
            forbidden:
              - legal_disclaimer_text

    neutral:
      minimum_required: 2
      items:
        - id: "{neutral_light_id}"
          name: "{Neutral light name}"
          role: neutral_colour
          hex: "{#FFFFFF}"
          rgb: "{255,255,255}"
          cmyk: "{0,0,0,0}"
          usage:
            preferred:
              - background
              - whitespace
            restricted: []
            forbidden: []

        - id: "{neutral_dark_id}"
          name: "{Neutral dark name}"
          role: text_colour
          hex: "{#000000}"
          rgb: "{0,0,0}"
          cmyk: "{0,0,0,100}"
          usage:
            preferred:
              - foreground_text
              - icon
            restricted: []
            forbidden: []

    functional:
      minimum_required: 4
      items:
        - id: "{success_colour_id}"
          name: "{Success colour name}"
          role: functional_colour
          semantic_meaning: success
          hex: "{#000000}"
          rgb: "{0,0,0}"
          cmyk: "{0,0,0,100}"

        - id: "{warning_colour_id}"
          name: "{Warning colour name}"
          role: functional_colour
          semantic_meaning: warning
          hex: "{#000000}"
          rgb: "{0,0,0}"
          cmyk: "{0,0,0,100}"

        - id: "{error_colour_id}"
          name: "{Error colour name}"
          role: functional_colour
          semantic_meaning: error
          hex: "{#000000}"
          rgb: "{0,0,0}"
          cmyk: "{0,0,0,100}"

        - id: "{info_colour_id}"
          name: "{Information colour name}"
          role: functional_colour
          semantic_meaning: information
          hex: "{#000000}"
          rgb: "{0,0,0}"
          cmyk: "{0,0,0,100}"

  approved_tints:
    enabled: true
    allowed_percentages:
      - 10
      - 20
      - 40
      - 60
      - 80
    require_token_reference: true
    id_format: "{base_colour_id}.tint.{percentage}"

  approved_gradients:
    enabled: true
    items:
      - id: "{gradient_1_id}"
        name: "{Gradient 1 name}"
        stops:
          - colour_ref: "{primary_colour_1_id}"
            position: 0
          - colour_ref: "{secondary_colour_1_id}"
            position: 100
        allowed_uses:
          - background
          - campaign_asset
          - presentation_slide
        restricted_uses:
          - live_text_background
        contrast_check_required_for_text_overlay: true

  deprecated_tokens:
    review_cycle: quarterly
    items:
      - id: "{deprecated_colour_1_id}"
        hex: "{#000000}"
        replacement_ref: "{primary_colour_1_id}"
        reason: "{Why this colour is no longer approved.}"

# -----------------------------------------------------------------------------
# COLOUR PAIRINGS
# -----------------------------------------------------------------------------
# Recommended. Defines approved and forbidden foreground/background pairings.
colour_pairings:
  approved:
    - id: "{pairing_1_id}"
      foreground_ref: "{neutral_dark_id}"
      background_ref: "{neutral_light_id}"
      allowed_for:
        - foreground_text
        - body_copy
        - ui_component
      minimum_contrast_ratio: 4.5

  restricted:
    - id: "{restricted_pairing_1_id}"
      foreground_ref: "{accent_colour_1_id}"
      background_ref: "{primary_colour_1_id}"
      allowed_only_for:
        - large_display_text
      minimum_contrast_ratio: 3.0
      notes:
        - Use only where large text threshold is met.

  forbidden:
    - id: "{forbidden_pairing_1_id}"
      foreground_ref: "{accent_colour_1_id}"
      background_ref: "{secondary_colour_1_id}"
      reason: "{Why this colour pairing is forbidden.}"

# -----------------------------------------------------------------------------
# REQUIRED ELEMENTS
# -----------------------------------------------------------------------------
# Recommended. Defines visual components generated assets should include.
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
          - headline
          - subhead
          - body_copy
          - ui_component

    - id: non_colour_cue_required_for_semantic_colour
      required_when:
        colour_conveys_meaning: true

    - id: cmyk_required_for_print
      required_when:
        channel:
          - print
          - signage
      resolution_strategy:
        if_cmyk_missing: materialize_from_hex_or_rgb
        colour_profile: "ISO Coated v2 (ECI)"
        fail_if_materialization_unavailable: true
        log_materialized_value: true

    - id: gradient_contrast_required_for_text_overlay
      required_when:
        text_overlay_on_gradient: true

# -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
# Required if different visual fields need different thresholds.
# Every content_type in scope.applies_to.content_types that requires field-level
# threshold checking must have an entry here. Missing entries should produce a
# schema warning or validation error.
field_applicability:
  brand_mark:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    cmyk_required_for_print: true

  logo_lockup:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    cmyk_required_for_print: true

  typography:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true

  foreground_text:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true

  background:
    approved_token_required: true
    minimum_contrast_ratio: 0
    cmyk_required_for_print: true

  gradient:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true
    worst_case_contrast_required: true

  icon:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    cmyk_required_for_print: true

  illustration:
    approved_token_required: true
    minimum_contrast_ratio: 0
    cmyk_required_for_print: true

  photography_treatment:
    approved_token_required: false
    minimum_contrast_ratio: 0
    cmyk_required_for_print: true

  chart:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    cmyk_required_for_print: true
    non_colour_cue_required: true

  data_visualisation:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    cmyk_required_for_print: true
    non_colour_cue_required: true

  ui_component:
    approved_token_required: true
    minimum_contrast_ratio: 3.0
    cmyk_required_for_print: false

  webpage:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: false

  landing_page:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: false

  presentation_slide:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: false

  report_page:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true

  proposal_page:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true

  social_asset:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: false

  campaign_asset:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true

  sales_asset:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true

  event_graphic:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true

  packaging:
    approved_token_required: true
    minimum_contrast_ratio: 4.5
    cmyk_required_for_print: true

# -----------------------------------------------------------------------------
# PERSONA PROFILES
# -----------------------------------------------------------------------------
# Optional. Use when the same standard needs slightly different behaviour
# for designers, editors, product teams, accessibility reviewers, or AI agents.
persona_profiles:
  marketing_manager:
    colour_adjustment: standard
  content_creator:
    colour_adjustment: use_approved_templates
  designer:
    colour_adjustment: full_token_system_access
  social_media:
    colour_adjustment: campaign_native_but_token_constrained
  executive_communications:
    colour_adjustment: conservative_and_accessible
  sales:
    colour_adjustment: presentation_safe_and_accessible
  partner_marketing:
    colour_adjustment: co_branding_review_required
  product_designer:
    colour_adjustment: ui_accessibility_first
  accessibility_reviewer:
    colour_adjustment: strict_contrast_enforcement
  new_hire:
    colour_adjustment: explanatory
  ai_agent:
    colour_adjustment: strict_constraint_enforcement

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
    - id: third_party_asset_exception
      description: Third-party logos, screenshots, or source imagery may retain their original colours when they are not recoloured, composited, or adapted.
      when:
        content_type:
          - third_party_logo
          - third_party_screenshot
          - unedited_source_image
      override:
        enforcement_mode: third_party_asset_preserved
        skip_rules:
          - D001
          - D002
          - D008
          - D009

    - id: photographic_content_exception
      description: Photography may contain non-brand colours, provided overlays, typography, captions, and graphic treatments use approved tokens.
      when:
        content_type:
          - photography_treatment
      override:
        enforcement_mode: image_colour_relaxed
        requirements:
          - text_overlay_contrast_required
          - brand_treatment_tokens_required

    - id: legal_text_exception
      description: Legal or regulated text may override colour preferences where required by law or compliance.
      when:
        policy_context:
          higher_priority_policy_matches:
            - "{brand_id}.legal.*"
            - global.regulatory
      override:
        enforcement_mode: defer_to_higher_policy

    - id: campaign_adaptation_exception
      description: Campaign policies may adapt colour emphasis for campaign context, provided all colours remain traceable to approved tokens, tints, gradients, or declared exceptions.
      when:
        application:
          - "{brand_id}.campaigns.*"
      override:
        enforcement_mode: campaign_colour_adaptation_allowed
        requirements:
          - approved_colour_token_required
          - accessibility_thresholds_must_still_pass
          - no_unapproved_colour_token

    - id: accessibility_override_exception
      description: Accessibility requirements may override brand colour preference where a colour pairing does not meet required contrast.
      when:
        policy_context:
          higher_priority_policy_matches:
            - global.accessibility
      override:
        enforcement_mode: accessibility_override
        requirements:
          - preserve_nearest_brand_token_where_possible
          - log_accessibility_override

# -----------------------------------------------------------------------------
# EXEMPLARS
# -----------------------------------------------------------------------------
# Recommended. Positive examples for human guidance and semantic scoring.
exemplars:
  minimum_review_count: 2

  markdown_examples:
    role: human_readable_copy
    authoritative: false
    excluded_from_validation: true

  storage:
    # Allowed values: inline | referenced | external_repository
    mode: referenced
    source_key: "{brand_id}.standards.visual-identity.colour"
    section: exemplars
    load_at_validation: true
    retrieval:
      # Allowed protocol values:
      # - brando_policy_repo | local_file | http | mcp_resource
      protocol: brando_policy_repo
      base_path: /policies/exemplars/
      key_format: "<exemplar_key>.md"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 300

  fallback_behaviour:
    if_exemplars_unavailable: skip_rule_with_warning
    affected_rules:
      - H005

  active_exemplar_keys:
    - "{brand_id}.standards.visual-identity.colour.exemplar.{example_key_1}"
    - "{brand_id}.standards.visual-identity.colour.exemplar.{example_key_2}"

  source_contexts:
    channels:
      - website
      - linkedin
      - newsletter
      - pitch_deck
      - print
    content_types:
      - webpage
      - presentation_slide
      - report_page
      - social_asset
      - campaign_asset
      - data_visualisation
      - ui_component

# -----------------------------------------------------------------------------
# COMPETITIVE DIFFERENTIATION
# -----------------------------------------------------------------------------
# Optional. Helps human reviewers understand contrastive positioning.
competitive_differentiation:
  competitors:
    - "{competitor_1}"
    - "{competitor_2}"
  category_norms_to_avoid:
    - "{Generic colour treatment or palette behaviour to avoid}"
  differentiators:
    - "{Differentiator 1}"
    - "{Differentiator 2}"

# -----------------------------------------------------------------------------
# ANTI-EXEMPLARS
# -----------------------------------------------------------------------------
# Optional. Negative examples for human review only.
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
  validate_yaml_structure: true
  validate_authoritative_positive_exemplars: true

  # Validate that every colour token, gradient stop, pairing reference, deprecated
  # token replacement, and exemplar key resolves to a declared entry.
  validate_colour_token_references: true

  # Validate that every colour pairing declared as approved or restricted has
  # foreground and background token references that resolve correctly.
  validate_colour_pairing_references: true

  # Validate that print contexts have declared CMYK values or an enabled fallback
  # materialization strategy.
  validate_print_colour_resolution: true

  # Validate that all heuristic rules use a 0.0-1.0 probability scale.
  validate_heuristic_score_scale: true

  exclude_markdown_guidance: true
  exclude_change_log: true
  exclude_comments: true
  exclude_anti_exemplars: true
  exclude_markdown_exemplar_copies: true

  notes:
    - validate_authoritative_positive_exemplars applies only to repository exemplars retrieved via exemplars.storage.retrieval.
    - Colour token references include palette token ids, tint ids, gradient stops, colour pairings, deprecated token replacements, and functional colour references.
    - Print colour validation should attempt declared fallback materialization before failing a missing CMYK value.
    - Markdown exemplar copies are excluded per exemplars.markdown_examples.excluded_from_validation.
    - Anti-exemplars are excluded per anti_exemplars.excluded_from_deterministic_validation.
    - YAML comments are excluded as they are stripped before rule execution.

# -----------------------------------------------------------------------------
# CLASSIFIERS
# -----------------------------------------------------------------------------
# Optional. Declare any judgement-based classifiers required by heuristic rules.
classifiers:
  brand_colour_balance_classifier:
    description: >
      Scores whether colour use reflects the approved balance of primary,
      secondary, accent, neutral, and functional colours for the declared
      channel and content type.
    output:
      type: object
      properties:
        brand_colour_balance_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H001

  colour_mood_classifier:
    description: >
      Scores whether the palette treatment expresses the intended brand
      principles and avoids inappropriate emotional or category cues.
    output:
      type: object
      properties:
        colour_mood_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H002

  visual_hierarchy_classifier:
    description: >
      Scores whether colour creates a clear hierarchy between primary action,
      secondary action, content, background, and supporting detail.
    output:
      type: object
      properties:
        visual_hierarchy_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H003

  accessibility_risk_classifier:
    description: >
      Scores whether colour usage may create accessibility risk beyond direct
      contrast checks, including reliance on colour-only meaning, weak state
      differentiation, or ambiguous chart colours.
    output:
      type: object
      properties:
        accessibility_risk_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H004

  palette_harmony_classifier:
    description: >
      Scores whether selected colour combinations remain coherent with the
      approved brand palette, role system, and channel context.
    output:
      type: object
      properties:
        palette_harmony_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H006

  cross_channel_consistency_classifier:
    description: >
      Scores whether colour usage remains consistent across related outputs,
      including campaign sets, presentation decks, reports, social assets, and
      web pages.
    output:
      type: object
      properties:
        cross_channel_consistency_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H007

# -----------------------------------------------------------------------------
# EXECUTION
# -----------------------------------------------------------------------------
# Required for executable validation.
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
      - D004
      - D005
      - D006
      - D007
      - D008
      - D009
      - D010
    phase_2_heuristic:
      - H001
      - H002
      - H003
      - H004
      - H005
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
        - All heuristic rules use a 0.0-1.0 probability scale.

  retry_strategy:
    mode: targeted_repair_then_regenerate
    repair_scope:
      deterministic_failures: visual_component_level
      heuristic_failures: asset_or_layout_level
      after_two_failed_repairs: full_regeneration
    repair_instruction_format:
      include_violation_id: true
      include_failing_asset_or_component: true
      include_remediation_action: true
      include_colour_token_reference: true
      include_contrast_result: true
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
      - inaccessible_colour_pairing
      - unapproved_colour_token
      - forbidden_colour_pairing
      - unresolved_print_colour_value

# -----------------------------------------------------------------------------
# RULES
# -----------------------------------------------------------------------------
# Required. Rules are executable validation checks.
rules:
  deterministic:
    - id: D001
      name: unapproved_colour_token_used
      severity: hard_fail
      applies_to:
        - brand_mark
        - logo_lockup
        - typography
        - foreground_text
        - background
        - gradient
        - icon
        - illustration
        - chart
        - data_visualisation
        - ui_component
        - webpage
        - landing_page
        - presentation_slide
        - report_page
        - proposal_page
        - social_asset
        - campaign_asset
        - sales_asset
        - event_graphic
        - packaging
      detect:
        method: colour_token_reference_check
        approved_sources:
          - colour_tokens.palettes.primary.items.id
          - colour_tokens.palettes.secondary.items.id
          - colour_tokens.palettes.accent.items.id
          - colour_tokens.palettes.neutral.items.id
          - colour_tokens.palettes.functional.items.id
          - colour_tokens.approved_tints.id_format
          - colour_tokens.approved_gradients.items.id
      unless_exception:
        - third_party_asset_exception
        - photographic_content_exception
      remediation:
        action: replace_with_nearest_approved_colour_token

    - id: D002
      name: colour_role_mismatch
      severity: hard_fail
      applies_to:
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
        - call_to_action
      detect:
        method: colour_role_usage_check
        source: colour_tokens.palettes
        compare_against:
          - colour_policy.usage_model.required_roles
          - colour_tokens.palettes.*.items.usage
      remediation:
        action: replace_with_colour_token_allowed_for_role

    - id: D003
      name: insufficient_contrast
      severity: hard_fail
      applies_to:
        - typography
        - foreground_text
        - gradient
        - icon
        - chart
        - data_visualisation
        - ui_component
        - webpage
        - landing_page
        - presentation_slide
        - report_page
        - proposal_page
        - social_asset
        - campaign_asset
        - sales_asset
        - event_graphic
        - packaging
      detect:
        method: contrast_ratio_check
        threshold_from_field_applicability: minimum_contrast_ratio
        resolve_transparency_before_check: true
        resolve_gradient_before_check: true
        gradient_contrast_mode: worst_case_within_text_bounding_box
        notes:
          - When checking gradients, contrast must be validated against the lowest-contrast point of the gradient area covered by the text bounding box.
          - Validators must not pass a text-over-gradient pairing based only on endpoint colours or average contrast.
          - If exact text bounds are unavailable, evaluate the full gradient region behind the governed text or UI element.
      unless_exception:
        - legal_text_exception
      remediation:
        action: adjust_foreground_or_background_to_meet_contrast

    - id: D004
      name: forbidden_colour_pairing_used
      severity: hard_fail
      applies_to:
        - typography
        - foreground_text
        - background
        - gradient
        - icon
        - chart
        - data_visualisation
        - ui_component
        - webpage
        - landing_page
        - presentation_slide
        - report_page
        - proposal_page
        - social_asset
        - campaign_asset
        - sales_asset
        - event_graphic
        - packaging
      detect:
        method: colour_pairing_match
        source: colour_pairings.forbidden
      remediation:
        action: replace_with_approved_or_accessible_pairing

    - id: D005
      name: colour_only_meaning_used
      severity: hard_fail
      applies_to:
        - chart
        - data_visualisation
        - ui_component
        - report_page
        - presentation_slide
        - webpage
        - landing_page
      detect:
        method: semantic_colour_dependency_check
        colour_only_meaning_forbidden: true
        require_non_colour_cue_when:
          colour_conveys_meaning: true
      remediation:
        action: add_text_icon_shape_pattern_or_label

    - id: D006
      name: unresolved_transparency_used
      severity: soft_warn
      applies_to:
        - background
        - gradient
        - ui_component
        - chart
        - data_visualisation
        - presentation_slide
        - webpage
        - landing_page
      detect:
        method: alpha_transparency_check
        require_resolved_rendered_colour: true
      remediation:
        action: resolve_transparency_and_recheck_contrast

    - id: D007
      name: invalid_gradient_usage
      severity: hard_fail
      applies_to:
        - gradient
        - background
        - campaign_asset
        - presentation_slide
        - webpage
        - landing_page
      detect:
        method: gradient_policy_check
        approved_gradient_source: colour_tokens.approved_gradients.items
        require_approved_tokens: true
        require_contrast_check_for_text_overlay: true
      remediation:
        action: replace_with_approved_gradient_or_flat_colour

    - id: D008
      name: logo_colour_variant_invalid
      severity: hard_fail
      applies_to:
        - brand_mark
        - logo_lockup
      detect:
        method: logo_colour_variant_check
        approved_sources:
          - colour_tokens.palettes.primary.items.id
          - colour_tokens.palettes.neutral.items.id
      unless_exception:
        - third_party_asset_exception
      remediation:
        action: use_approved_logo_colour_variant

    - id: D009
      name: print_asset_missing_cmyk_values
      severity: soft_warn
      applies_to:
        - brand_mark
        - logo_lockup
        - typography
        - foreground_text
        - background
        - gradient
        - icon
        - illustration
        - chart
        - data_visualisation
        - report_page
        - proposal_page
        - campaign_asset
        - sales_asset
        - event_graphic
        - packaging
      detect:
        method: print_colour_value_check
        required_field: cmyk
        when:
          channel:
            - print
            - signage
        fallback_materialization:
          enabled: true
          source_values:
            - hex
            - rgb
          colour_profile: "ISO Coated v2 (ECI)"
          fail_if_materialization_unavailable: true
          log_materialized_value: true
      remediation:
        action: materialize_cmyk_values_or_confirm_digital_only_context

    - id: D010
      name: deprecated_colour_token_used
      severity: hard_fail
      applies_to:
        - brand_mark
        - logo_lockup
        - typography
        - foreground_text
        - background
        - gradient
        - icon
        - illustration
        - chart
        - data_visualisation
        - ui_component
        - webpage
        - landing_page
        - presentation_slide
        - report_page
        - proposal_page
        - social_asset
        - campaign_asset
        - sales_asset
        - event_graphic
        - packaging
      detect:
        method: deprecated_colour_token_match
        source: colour_tokens.deprecated_tokens.items
        case_insensitive: true
      remediation:
        action: replace_with_current_approved_colour_token

  heuristic:
    - id: H001
      name: weak_brand_colour_balance
      severity: soft_warn
      applies_to:
        - webpage
        - landing_page
        - presentation_slide
        - report_page
        - proposal_page
        - social_asset
        - campaign_asset
        - sales_asset
        - event_graphic
      detect:
        method: brand_colour_balance_classifier
        threshold: 0.70
      remediation:
        action: rebalance_primary_secondary_accent_and_neutral_usage

    - id: H002
      name: inappropriate_colour_mood
      severity: soft_warn
      applies_to:
        - campaign_asset
        - social_asset
        - presentation_slide
        - landing_page
        - webpage
        - illustration
        - photography_treatment
      detect:
        method: colour_mood_classifier
        threshold: 0.70
      remediation:
        action: adjust_colour_treatment_to_match_brand_principles

    - id: H003
      name: insufficient_visual_hierarchy
      severity: soft_warn
      applies_to:
        - webpage
        - landing_page
        - presentation_slide
        - report_page
        - proposal_page
        - social_asset
        - campaign_asset
        - ui_component
      detect:
        method: visual_hierarchy_classifier
        threshold: 0.75
      remediation:
        action: strengthen_colour_hierarchy_between_content_actions_and_background

    - id: H004
      name: colour_accessibility_risk
      severity: hard_fail
      applies_to:
        - chart
        - data_visualisation
        - ui_component
        - webpage
        - landing_page
        - presentation_slide
        - report_page
        - proposal_page
      detect:
        method: accessibility_risk_classifier
        threshold: 0.85
      remediation:
        action: add_non_colour_cues_or_repair_accessibility_risk

    - id: H005
      name: low_exemplar_alignment_score
      severity: soft_warn
      applies_to:
        - webpage
        - landing_page
        - presentation_slide
        - report_page
        - social_asset
        - campaign_asset
        - chart
        - data_visualisation
        - ui_component
      detect:
        method: semantic_similarity
        exemplar_set: exemplars.active_exemplar_keys
        threshold: 0.70
      remediation:
        action: revise_toward_approved_colour_exemplars

    - id: H006
      name: poor_palette_harmony
      severity: soft_warn
      applies_to:
        - campaign_asset
        - social_asset
        - presentation_slide
        - report_page
        - landing_page
        - webpage
        - illustration
      detect:
        method: palette_harmony_classifier
        threshold: 0.70
      remediation:
        action: simplify_palette_or_replace_with_approved_pairings

    - id: H007
      name: inconsistent_cross_channel_colour_use
      severity: soft_warn
      applies_to:
        - campaign_asset
        - social_asset
        - presentation_slide
        - report_page
        - proposal_page
        - webpage
        - landing_page
      detect:
        method: cross_channel_consistency_classifier
        threshold: 0.75
      remediation:
        action: align_colour_usage_with_related_campaign_or_channel_assets

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
    conflict_resolution:
      mode: most_restrictive_wins
      notes:
        - If any matched channel, content type, or accessibility condition requires human sign-off, human sign-off is required.
        - Auto-publish is allowed only when no matched rule requires human sign-off.
    requires_human_sign_off_on_warn:
      channels:
        - website
        - product_ui
        - print
        - signage
        - pitch_deck
      content_types:
        - brand_mark
        - logo_lockup
        - chart
        - data_visualisation
        - report_page
        - proposal_page
      conditions:
        - cmyk_values_materialized
        - accessibility_override_used
    allows_auto_publish_on_warn:
      channels:
        - linkedin
        - newsletter
      content_types:
        - social_asset
        - campaign_asset

  human_review_conditions:
    - retry_count >= 3
    - unresolved_heuristic_conflict == true
    - accessibility_override_used == true
    - cmyk_values_materialized == true

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
  log_colour_token_refs: true
  log_colour_pairings: true
  log_contrast_results: true
  log_cmyk_materialization: true
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
      audience:
        type: string
      persona:
        type: string
      timestamp:
        type: string
        format: iso8601
      colour_token_refs:
        type: array
        items:
          type: string
      colour_pairings:
        type: array
        items:
          type: object
          properties:
            foreground_ref:
              type: string
            background_ref:
              type: string
            contrast_ratio:
              type: number
      cmyk_materializations:
        type: array
        items:
          type: object
          properties:
            colour_ref:
              type: string
            source_value:
              type: string
            materialized_cmyk:
              type: string
            colour_profile:
              type: string
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
  - "{brand_id}.brand.core"
  - "{brand_id}.standards.visual-identity.logo"
  - "{brand_id}.standards.visual-identity.typography"
  - "{brand_id}.standards.verbal-identity.tone-of-voice"
  - "{brand_id}.standards.verbal-identity.messaging-framework"

related_applications:
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.pitch-deck"
  - "{brand_id}.applications.product-ui"
  - "{brand_id}.applications.newsletter"
  - "{brand_id}.applications.report"
  - "{brand_id}.applications.proposal"
---

# {Brand Name} colour

## How to complete this template

This is a Brando® Colour standard template. Complete the following steps in order before publishing.

1. Replace every `{placeholder}` value with brand-specific content.
2. Do not replace `<runtime_variable>` values. These are resolved at validation time by the Brando engine.
3. Set `status: draft` and `lifecycle_state: proposed` on first authoring. Update only after governance sign-off.
4. Set `schema.validation_status: ready_for_validation` on first authoring. Update only after a formal parse or review cycle.
5. Remove optional sections that do not apply, or retain them with placeholder values for future use.
6. Remove the `template` metadata block before policy validation.
7. Run the publishing checklist before changing `status` to `active`.

Placeholder reference:

| Token | Meaning | Example |
|-------|---------|---------|
| `{brand_id}` | Stable machine-readable brand identifier | `acme-corp` |
| `{Brand Name}` | Human-readable brand name | `Acme Corp` |
| `{colour_principle_1}` | First colour principle label | `distinctive` |
| `{primary_colour_1_id}` | Approved primary colour token id | `brand-blue` |
| `{accent_colour_1_id}` | Approved accent colour token id | `signal-green` |
| `{neutral_dark_id}` | Approved dark neutral token id | `neutral-900` |
| `{gradient_1_id}` | Approved gradient token id | `hero-gradient` |
| `{example_key_1}` | Exemplar short key | `website-hero` |
| `<exemplar_key>` | Runtime variable. Do not replace | |

---

## Purpose

This standard governs the approved colour system for {Brand Name}. It is designed for human creators, designers, AI systems, validators, editors, product teams, campaign teams, and publishing workflows.

The colour standard defines which colours may be used, where they may be used, how they combine, and how they must behave across accessibility, digital, and print contexts.

It governs:

- Approved colour tokens
- Primary, secondary, accent, neutral, and functional palettes
- Colour roles
- Colour pairings
- Contrast and accessibility
- Gradients
- Print colour values
- CMYK materialization
- Deprecated colour tokens
- Cross-channel colour consistency

---

## How to interpret this policy

This policy has five layers:

1. Colour tokens define the approved palette.
2. Colour policy defines usage roles, accessibility expectations, gradients, and print behaviour.
3. Colour pairings define approved, restricted, and forbidden foreground/background combinations.
4. Exemplars show what good colour usage looks like.
5. Execution rules determine whether output passes, warns, or fails.

The YAML front matter is the machine-executable layer. This Markdown body is the human-readable guidance layer. Where they conflict, the YAML governs.

If a rule conflicts with a higher-priority legal, regulatory, accessibility, or safety policy, the higher-priority policy wins.

If a rule conflicts with an application-specific exception declared in the YAML, the declared exception applies.

---

## Colour principles

### {Colour Principle 1}

{Explain colour principle 1 in plain language.}

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

### {Colour Principle 2}

{Explain colour principle 2 in plain language.}

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

### {Colour Principle 3}

{Explain colour principle 3 in plain language.}

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

## Colour token system

The colour token system is the source of truth for approved brand colour.

Use it in this order:

1. Select an approved colour token.
2. Confirm the token role matches the intended use.
3. Check whether the pairing is approved, restricted, or forbidden.
4. Check contrast where text, UI, iconography, or chart meaning is involved.
5. For gradients, validate contrast at the worst-case point within the text bounding box.
6. For print and signage, confirm CMYK values or materialize them through the declared colour profile.
7. Log colour token references and contrast outcomes in the validation report.

---

## Accessibility and contrast

Colour use must be accessible, not just on-brand.

Text, icons, UI controls, and data visualisations must meet the contrast thresholds declared in `field_applicability`.

Text over gradients requires worst-case contrast validation. The validator must test the lowest-contrast point of the gradient area covered by the text bounding box. It must not pass a layout based on average contrast or endpoint-only contrast.

Colour must not be the only way to communicate status, risk, category, urgency, or action. Use labels, icons, shapes, patterns, or text where meaning depends on colour.

---

## Print and CMYK behaviour

Print and signage contexts require CMYK values.

If CMYK values are missing, the engine should attempt to materialize them from approved Hex or RGB values using the `ISO Coated v2 (ECI)` colour profile before failing. Any materialized values must be logged in telemetry.

This allows digital-native AI tools to generate usable first-pass assets while still preserving print governance.

---

## Default execution expectations

Unless an explicit exception is declared in the YAML:

- Use approved colour tokens.
- Use colour tokens according to their declared role.
- Avoid forbidden colour pairings.
- Meet contrast thresholds for text, icons, UI, charts, and data visualisation.
- Validate text-over-gradient contrast against the worst-case point.
- Do not rely on colour alone to convey meaning.
- Use approved gradients only.
- Use approved logo colour variants only.
- Provide CMYK values for print or signage, or materialize them through the declared fallback strategy.
- Replace deprecated colour tokens with current approved tokens.
- Keep colour usage consistent across related assets and channels.

---

## Exception model

Exceptions are allowed only when declared in the YAML `exceptions.declared` block. Undeclared exceptions hard fail.

Five exceptions are pre-declared in this template:

Third-party asset exception: third-party logos, screenshots, or unedited source imagery may retain original colours where they are not recoloured, composited, or adapted.

Photographic content exception: photography may contain non-brand colours, provided overlays, typography, captions, and graphic treatments use approved tokens and pass contrast checks.

Legal text exception: legal or regulated text may override colour preferences where required by law or compliance.

Campaign adaptation exception: campaign policies may adapt colour emphasis, provided all colours remain traceable to approved tokens, tints, gradients, or declared exceptions.

Accessibility override exception: accessibility requirements may override brand colour preference where a colour pairing does not meet required contrast.

---

## Exemplars

Each exemplar below is referenced in the YAML by its `active_exemplar_key`. Validators use authoritative repository exemplars retrieved via `exemplars.storage.retrieval`, not the Markdown copies shown here.

### {exemplar-name}

Key: `{brand_id}.standards.visual-identity.colour.exemplar.{example_key}`

"{Approved exemplar description or reference.}"

Why it works:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Anti-exemplars

Anti-exemplars are negative reference material for human review only. They are excluded from all deterministic and heuristic validation. They must not be scored, repaired, or published.

### {anti-exemplar-name}

"{Anti-exemplar description or reference.}"

Why it fails:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Validator interpretation notes

### Deterministic checks

Implement with direct token lookup, colour-value parsing, contrast calculation, structural checks, and declared reference validation. Run in the order declared in `execution.rule_execution_order.phase_1_deterministic`.

Covered by: D001, D002, D003, D004, D005, D006, D007, D008, D009, D010

### Heuristic checks

Implement using a classifier, scorer, or model-based evaluator. Run only after all deterministic checks pass or produce soft warnings only. Every heuristic check must return both a score and a reason. Never return a score alone.

Covered by: H001, H002, H003, H004, H005, H006, H007

### Scale note for heuristic scores

All heuristic rules score on a 0.0-1.0 probability scale. Do not mix percentage and probability-style scoring. See `execution.heuristic_decisioning.threshold_resolution`.

### Gradient contrast

D003 validates text and UI contrast. For gradients, validators must evaluate the lowest-contrast point within the gradient area covered by the text bounding box.

If text bounds are unavailable, evaluate the full gradient region behind the governed text or UI element. Do not use average contrast or endpoint-only contrast.

### CMYK materialization

D009 checks for CMYK values in print and signage contexts. If CMYK values are missing, validators should attempt to materialize them from approved Hex or RGB values using the `ISO Coated v2 (ECI)` colour profile.

If materialization succeeds, log the generated CMYK value and continue with a warning. If materialization fails, block the output.

### Colour token references

Validators should check that every colour token, gradient stop, colour pairing, deprecated token replacement, and exemplar key resolves to a declared entry. See `document_self_validation.validate_colour_token_references`.

### Exemplar retrieval

Exemplars required by H005 are fetched via the protocol declared in `exemplars.storage.retrieval`. If retrieval fails, H005 is skipped with a soft warning per `fallback_behaviour`.

### Retry behaviour

On deterministic failure: repair at visual component level, then re-evaluate before proceeding.
On heuristic failure: repair at asset or layout level, then re-evaluate before proceeding.
After two failed repairs: trigger full regeneration.
After three total attempts: escalate to human review. Do not publish.

---

## Change log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | Initial published version. |

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
- All colour token references resolve to declared colour tokens, tints, or gradients.
- All gradient stop references resolve to declared colour tokens.
- All approved and restricted colour pairings resolve to declared foreground and background tokens.
- All deprecated colour tokens have replacement references.
- All print and signage contexts have CMYK values or a valid CMYK materialization strategy.
- Text-over-gradient contrast is checked against the worst-case point within the text bounding box.
- All heuristic rules use a 0.0-1.0 score scale.
- Positive exemplars do not violate any deterministic rule.
- Anti-exemplars are explicitly excluded from validation.
- All channel and content-type values in rules and `decision_policy` match `scope.applies_to`.
- The telemetry schema is valid and the policy key and version are attached to every validation report.