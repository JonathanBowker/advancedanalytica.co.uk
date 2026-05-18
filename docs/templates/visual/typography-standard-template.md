---
# =============================================================================
# BRANDO® TYPOGRAPHY STANDARD TEMPLATE
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
# Quote every YAML value that contains a {curly_brace} placeholder unless the
# value is held inside a YAML block scalar using | or >.
#
# Prose-heavy fields such as description, rationale, notes, and long classifier
# descriptions should use quoted scalars or block scalar style to reduce YAML
# parsing risk.
# =============================================================================
#  -----------------------------------------------------------------------------
# DOCUMENT IDENTITY
# -----------------------------------------------------------------------------
# Required. Stable, globally unique identifier for this policy.
# Recommended pattern: {brand_id}.standards.visual-identity.typography
id: "{brand_id}.standards.visual-identity.typography"
#  Required. Usually mirrors id. Use as the stable lookup key in policy
# repositories, MCP servers, APIs, and audit logs.
key: "{brand_id}.standards.visual-identity.typography"
#  Required. Human-readable title.
title: "{Brand Name} Typography"
#  Required. Short description used in repositories, UIs, search, and audit logs.
description: |
  Core typography standard governing type families, type tokens, scale,
  hierarchy, accessibility, localization, rendering, font licensing, and
  AI-generated typography across {Brand Name} communications.
#  Required. Defines what kind of policy artefact this is.
# Allowed values:
# - standard | application | campaign | exception
# - exemplar_set | lexicon | telemetry_schema
policy_kind: standard
#  Required. Top-level governance pillar.
# Allowed values controlled by Brando schema:
# - standards | applications | campaigns | legal | market | safety
pillar: standards
#  Required. Category within the pillar. Use snake_case for controlled terms.
category: visual_identity
#  Required. Subcategory within the category. Use snake_case for controlled terms.
subcategory: typography
#  Required. Used by Brando to distinguish policy standards from related artefacts.
# Allowed values:
# - policy_standard | application_policy | campaign_policy | exemplar
# - exemplar_set | lexicon | classifier_spec | telemetry_schema | validation_report
document_type: policy_standard
#  -----------------------------------------------------------------------------
# TEMPLATE METADATA
# -----------------------------------------------------------------------------
# Identifies this file as a reusable template rather than an instantiated policy.
# Remove this block when promoting to a brand-specific policy.
template:
  is_template: true
  placeholder_status: contains_placeholders
  instantiate_before_validation: true
#  -----------------------------------------------------------------------------
# VERSIONING AND LIFECYCLE
# -----------------------------------------------------------------------------
# Required. Semantic version. Use MAJOR.MINOR.PATCH.
version: "1.0.0"
#  Required. Publication status.
# Allowed values: draft | active | deprecated | archived
status: draft
#  Required. Governance lifecycle state.
# Allowed values: proposed | in_review | approved | published | superseded | retired
lifecycle_state: proposed
#  Required once active/published. ISO date.
effective_date: "YYYY-MM-DD"
#  Required. ISO date.
created: "YYYY-MM-DD"
#  Required. ISO date.
last_modified: "YYYY-MM-DD"
#  Recommended. ISO date for next scheduled governance review.
next_review: "YYYY-MM-DD"
#  -----------------------------------------------------------------------------
# OWNERSHIP AND APPROVAL
# -----------------------------------------------------------------------------
owner:
  team: "{Brand Team Name}"
  steward: "{Steward Role or Name}"

approved_by:
  - "{Approving Team or Role}"
#  -----------------------------------------------------------------------------
# SCHEMA METADATA
# -----------------------------------------------------------------------------
schema:
  type: BrandTypographyStandard
  version: brando-schema-1.0
  validation_status: ready_for_validation
#  -----------------------------------------------------------------------------
# CLIENT NAMING MAP
# -----------------------------------------------------------------------------
naming:
  client_term: Typography
  canonical_term: Visual Identity
  policy_label: Typography
  rationale: |
    {Explain how the client names this artefact and how Brando should map it
    into the canonical governance model. canonical_term maps to category;
    policy_label maps to subcategory. This field does not affect enforcement logic.}
#  -----------------------------------------------------------------------------
# SCOPE
# -----------------------------------------------------------------------------
scope:
  applies_to:
    channels:
      - website
      - app
      - linkedin
      - email
      - newsletter
      - event_platform
      - sales_enablement
      - pitch_deck
      - proposal
      - print
      - signage
      - video
      - motion
      - generative_image

    content_types:
      - font_family
      - font_token
      - display_heading
      - heading
      - subheading
      - body_text
      - body_copy
      - caption
      - quote
      - pull_quote
      - footnote
      - label
      - data_label
      - table_text
      - technical_specification
      - code
      - system_output
      - ui_text
      - form_label
      - error_message
      - success_message
      - legal_disclaimer
      - call_to_action
      - social_post
      - email_copy
      - presentation_text
      - infographic_text
      - video_caption
      - kinetic_typography
      - generated_raster_text

    audiences:
      - marketing_manager
      - content_creator
      - designer
      - developer
      - accessibility_reviewer
      - localization_manager
      - legal_reviewer
      - new_hire
      - ai_agent

    content_zones:
      - rendered_text
      - editable_text_layer
      - rasterized_text
      - metadata
      - legal_text
      - source_note
      - quotation
      - caption_zone
      - overlay_text
      - safe_area

  excludes:
    content_types:
      - handwritten_signature
      - third_party_embedded_content
      - quoted_source_image
      - archived_legacy_asset

  notes:
    - Applies to generated, designed, rendered, and edited typography.
    - Applies to both editable text layers and AI-generated raster text where text appears visually.
    - Does not apply to quoted source imagery unless explicitly rewritten or recreated.
    - Does not override higher-priority legal, accessibility, localization, or market policy.
#  -----------------------------------------------------------------------------
# POLICY PRECEDENCE
# -----------------------------------------------------------------------------
policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.accessibility
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - "{brand_id}.applications.*"
    - "{brand_id}.standards.visual-identity.logo"
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.visual-identity.typography"
    - "{brand_id}.standards.verbal-identity.messaging-framework"
    - "{brand_id}.standards.verbal-identity.tone-of-voice"
    - campaign.local

  conflict_resolution:
    mode: most_restrictive_wins
    notes:
      - Accessibility and legal requirements override expressive typography preferences.
      - Logo typography rules override general typography rules where official logo artwork is involved.
      - Messaging may require text length, but typography and layout may require adaptation for legibility and comprehension.
      - If text length and typography constraints conflict, the layout or message must be adapted rather than reducing accessibility or legibility.
      - Exceptions must be explicit and machine-readable to override defaults.
#  -----------------------------------------------------------------------------
# INHERITANCE
# -----------------------------------------------------------------------------
inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
  may_be_overridden_by:
    - "{brand_id}.applications.website"
    - "{brand_id}.applications.linkedin"
    - "{brand_id}.applications.email"
    - "{brand_id}.applications.pitch-deck"
    - "{brand_id}.applications.print"
    - "{brand_id}.market.*"
    - "{brand_id}.legal.*"
#  -----------------------------------------------------------------------------
# RESOLUTION BEHAVIOUR
# -----------------------------------------------------------------------------
resolution:
  resolve_inheritance_before_validation: true
  resolve_exceptions_before_rule_execution: true
  materialize_effective_policy: true
  effective_policy_output:
    include_resolved_rules: true
    include_applied_exceptions: true
    include_precedence_path: true
    include_resolved_type_tokens: true
    include_resolved_font_sources: true
    include_resolved_accessibility_requirements: true
#  -----------------------------------------------------------------------------
# TYPOGRAPHY PRINCIPLES
# -----------------------------------------------------------------------------
principles:
  required:
    - "{typography_principle_1}"
    - "{typography_principle_2}"
    - "{typography_principle_3}"
  definitions:
    "{typography_principle_1}":
      description: "{Describe typography principle 1 in one clear sentence.}"
    "{typography_principle_2}":
      description: "{Describe typography principle 2 in one clear sentence.}"
    "{typography_principle_3}":
      description: "{Describe typography principle 3 in one clear sentence.}"
#  -----------------------------------------------------------------------------
# TYPOGRAPHY POLICY
# -----------------------------------------------------------------------------
typography_policy:
  objectives:
    required:
      - express_brand_personality
      - create_clear_hierarchy
      - preserve_readability
      - support_accessibility
      - support_localization
      - protect_font_licensing
      - maintain_rendering_quality
      - prevent_ai_text_errors

  characteristics:
    required:
      - legible
      - accessible
      - distinctive
      - consistent
      - responsive
      - performant
      - legally_licensed
    discouraged:
      - decorative_overuse
      - unclear_hierarchy
      - poor_line_length
      - low_contrast
      - excessive_font_weights
      - unlicensed_fonts
      - rasterized_required_text
      - inaccessible_ai_generated_text

  hierarchy:
    required_order:
      - display_heading
      - heading
      - subheading
      - body_text
      - caption
      - footnote
    notes:
      - Type hierarchy must be meaningful, not only visually large.
      - Heading levels must not be skipped where semantic structure is required.
      - Visual hierarchy and semantic HTML or document structure must remain aligned.
#  -----------------------------------------------------------------------------
# TYPOGRAPHY TOKENS
# -----------------------------------------------------------------------------
typography_tokens:
  font_families:
    primary:
      id: primary
      label: "{Primary brand font label}"
      family_name: "{Primary Font Family}"
      usage:
        - display_heading
        - heading
        - subheading
        - body_text
        - body_copy
      source_ref: "{brand_id}.legal.font-licenses.{primary_font_license_key}"
      fallback_stack:
        - "{Primary fallback font}"
        - system_ui
        - sans_serif

    secondary:
      id: secondary
      label: "{Secondary brand font label}"
      family_name: "{Secondary Font Family}"
      usage:
        - caption
        - quote
        - call_to_action
      source_ref: "{brand_id}.legal.font-licenses.{secondary_font_license_key}"
      fallback_stack:
        - "{Secondary fallback font}"
        - system_ui
        - sans_serif

    monospace:
      id: monospace
      label: "{Monospace brand font label}"
      family_name: "{Monospace Font Family}"
      usage:
        - code
        - data_label
        - technical_specification
        - system_output
        - tabular_data
      source_ref: "{brand_id}.legal.font-licenses.{monospace_font_license_key}"
      fallback_stack:
        - ui_monospace
        - sfmono_regular
        - consolas
        - monospace

  licensing:
    license_repository_ref: "{brand_id}.legal.font-licenses"
    require_license_ref: true
    forbid_personal_use_only_fonts: true
    forbid_unknown_font_sources: true
    forbid_unlicensed_webfont_embedding: true
    require_market_usage_clearance: true

  type_scale:
    unit: rem
    base_font_size_px: 16
    responsive_scaling: true

    responsive_ratios:
      mobile: 1.125
      tablet: 1.200
      desktop: 1.250

    notes:
      - Do not use one global modular scale ratio across all breakpoints.
      - Mobile typography must use a shallower ratio to prevent overflow and excessive vertical stacking.
      - Desktop typography may use a stronger ratio where viewport space supports larger hierarchy jumps.

  type_styles:
    display_heading:
      font_family_ref: primary
      weight: "{display_heading_weight}"
      size_token: "{display_heading_size_token}"
      line_height: "{display_heading_line_height}"
      tracking: "{display_heading_tracking}"
      case: sentence_case

    heading:
      font_family_ref: primary
      weight: "{heading_weight}"
      size_token: "{heading_size_token}"
      line_height: "{heading_line_height}"
      tracking: "{heading_tracking}"
      case: sentence_case

    subheading:
      font_family_ref: primary
      weight: "{subheading_weight}"
      size_token: "{subheading_size_token}"
      line_height: "{subheading_line_height}"
      tracking: "{subheading_tracking}"
      case: sentence_case

    body_text:
      font_family_ref: primary
      weight: "{body_text_weight}"
      size_token: "{body_text_size_token}"
      line_height: "{body_text_line_height}"
      tracking: "{body_text_tracking}"
      case: sentence_case

    caption:
      font_family_ref: secondary
      weight: "{caption_weight}"
      size_token: "{caption_size_token}"
      line_height: "{caption_line_height}"
      tracking: "{caption_tracking}"
      case: sentence_case

    data_label:
      font_family_ref: monospace
      weight: "{data_label_weight}"
      size_token: "{data_label_size_token}"
      line_height: "{data_label_line_height}"
      tracking: "{data_label_tracking}"
      case: preserve_source

    code:
      font_family_ref: monospace
      weight: "{code_weight}"
      size_token: "{code_size_token}"
      line_height: "{code_line_height}"
      tracking: "{code_tracking}"
      case: preserve_source

  variable_font_axes:
    enabled: true
    allowed_axes:
      wght:
        min: 300
        max: 700
        default: 400
      wdth:
        min: 90
        max: 110
        default: 100
      opsz:
        min: 8
        max: 72
        default: 16
      slnt:
        min: 0
        max: 0
        default: 0
    notes:
      - Variable font axes must stay within approved ranges.
      - Do not use variable axes to create unofficial condensed, extended, ultra-light, or black styles.
      - Optical sizing must support legibility and must not distort brand character.

  text_rendering:
    antialiasing_required: true
    approved_rendering_modes:
      web_css:
        - antialiased
        - subpixel-antialiased
        - auto
      native_app:
        - platform_default
        - grayscale_antialiasing
        - subpixel_antialiasing
      print:
        - vector_text
        - embedded_font
        - outlined_text_when_required
    disallowed_rendering_modes:
      - aliased_bitmap_text
      - rasterized_required_text_without_exception
      - forced_smoothing_disabled
    allow_text_as_image: false
    allow_outlined_text:
      print: true
      digital: false
    hyphenation_allowed: true
    widow_orphan_control_required: true

  performance_budget:
    max_font_requests: 4
    max_total_font_payload_kb: 250
    max_single_font_file_kb: 150
    require_subset_fonts: true
    require_preload_for_critical_fonts: true
    require_font_display_strategy: true
    approved_font_display_values:
      - swap
      - optional

  localization:
    required_script_support:
      - latin
      - latin_extended
      - "{additional_script_1}"
    minimum_glyph_coverage_ratio: 0.99
    forbid_tofu_glyphs: true
    allow_locale_specific_fallbacks: true
    require_locale_font_review: true
#  -----------------------------------------------------------------------------
# SEMANTIC TYPE PAIRINGS
# -----------------------------------------------------------------------------
semantic_type_pairings:
  allowed:
    primary:
      - display_heading
      - heading
      - subheading
      - body_text
      - body_copy
      - call_to_action

    secondary:
      - caption
      - quote
      - pull_quote
      - label
      - footnote
      - presentation_text

    monospace:
      - code
      - data_label
      - technical_specification
      - system_output
      - tabular_data

  forbidden_pairs:
    - content_type: body_text
      semantic_role: monospace_expression
      reason: Monospace must not be used for standard body copy unless a technical or data-specific exception applies.

    - content_type: hero_copy
      semantic_role: monospace_expression
      reason: Monospace must not be used as expressive hero typography unless explicitly declared in brand tokens.

    - content_type: legal_disclaimer
      semantic_role: decorative_expression
      reason: Legal text must prioritize readability and traceability over expressive styling.

    - content_type: video_caption
      semantic_role: decorative_expression
      reason: Captions must be legible, accessible, and readable at speed.
#  -----------------------------------------------------------------------------
# ACCESSIBILITY POLICY
# -----------------------------------------------------------------------------
accessibility_policy:
  contrast:
    minimum_body_text_ratio: 4.5
    minimum_large_text_ratio: 3.0
    minimum_ui_text_ratio: 4.5
    minimum_disabled_text_ratio: 3.0
    check_against_lowest_contrast_point: true
    gradient_text_or_background:
      resolve_gradient_before_check: true
      worst_case_required: true
      notes:
        - When checking text over gradients, contrast must be validated against the lowest-contrast point of the gradient area covered by the text bounding box.
        - Do not use average contrast across the text bounding box.

  font_size:
    minimum_body_text_px: 16
    minimum_caption_px: 12
    minimum_legal_text_px: 12
    minimum_video_caption_px: 18

  readability:
    minimum_body_line_height_ratio: 1.4
    maximum_body_line_height_ratio: 1.8
    maximum_all_caps_body_words: 3
    avoid_centered_long_body_copy: true

  motion_and_kinetic_type:
    respect_reduced_motion: true
    maximum_flashes_per_second: 3
    forbid_high_frequency_text_jitter: true
    require_pause_for_auto_animated_text: true
#  -----------------------------------------------------------------------------
# AI GENERATION POLICY
# -----------------------------------------------------------------------------
ai_generation_policy:
  prompt_controls:
    forbid_living_type_designer_style_reference: true
    forbid_foundry_style_mimicry_without_license: true
    forbidden_prompt_phrases:
      - in the style of {living_type_designer_name}
      - like {font_foundry_name}
      - inspired by {living_type_designer_name}
      - make it look like {commercial_font_name}
    required_prompt_elements:
      - font_token_reference
      - intended_copy
      - content_type
      - channel
      - accessibility_intent

  generated_text_controls:
    editable_text_layer_preferred: true
    raster_text_allowed_only_with_exception: true
    require_intended_copy_ref: true
    require_ocr_exact_match: true
    require_contrast_prediction: true
    require_post_render_contrast_check: true
#  -----------------------------------------------------------------------------
# REQUIRED ELEMENTS
# -----------------------------------------------------------------------------
required_elements:
  default:
    - approved_font_token
    - content_type
    - semantic_role
    - channel
    - rendered_text
    - font_source_ref
    - accessibility_context

  conditional:
    - id: locale_font_support
      required_when:
        localized_content: true

    - id: editable_text_layer
      required_when:
        digital_required_text: true

    - id: ocr_source_text
      required_when:
        generated_by_ai: true
        editable_text_layer_available: false

    - id: font_license_ref
      required_when:
        font_family_used: true
#  -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
field_applicability:
  display_heading:
    minimum_font_size_px: 32
    maximum_line_length_characters: 55
    minimum_contrast_ratio: 3.0
    editable_text_required: true

  heading:
    minimum_font_size_px: 24
    maximum_line_length_characters: 65
    minimum_contrast_ratio: 3.0
    editable_text_required: true

  subheading:
    minimum_font_size_px: 18
    maximum_line_length_characters: 75
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  body_text:
    minimum_font_size_px: 16
    maximum_line_length_characters: 90
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  body_copy:
    minimum_font_size_px: 16
    maximum_line_length_characters: 90
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  caption:
    minimum_font_size_px: 12
    maximum_line_length_characters: 75
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  legal_disclaimer:
    minimum_font_size_px: 12
    maximum_line_length_characters: 90
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  call_to_action:
    minimum_font_size_px: 14
    maximum_line_length_characters: 40
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  data_label:
    minimum_font_size_px: 12
    maximum_line_length_characters: 45
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  technical_specification:
    minimum_font_size_px: 12
    maximum_line_length_characters: 75
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  code:
    minimum_font_size_px: 13
    maximum_line_length_characters: 90
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  video_caption:
    minimum_font_size_px: 18
    maximum_line_length_characters: 42
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  kinetic_typography:
    minimum_font_size_px: 18
    maximum_line_length_characters: 55
    minimum_contrast_ratio: 4.5
    editable_text_required: true

  generated_raster_text:
    minimum_font_size_px: 18
    maximum_line_length_characters: 55
    minimum_contrast_ratio: 4.5
    editable_text_required: false
    ocr_exact_match_required: true
#  -----------------------------------------------------------------------------
# PERSONA PROFILES
# -----------------------------------------------------------------------------
persona_profiles:
  designer:
    typography_adjustment: visual_hierarchy_and_expression
  developer:
    typography_adjustment: implementation_and_performance
  content_creator:
    typography_adjustment: readability_and_structure
  accessibility_reviewer:
    typography_adjustment: contrast_legibility_and_motion_safety
  localization_manager:
    typography_adjustment: script_coverage_and_locale_fit
  legal_reviewer:
    typography_adjustment: licensing_and_required_disclaimers
  ai_agent:
    typography_adjustment: strict_constraint_enforcement
#  -----------------------------------------------------------------------------
# EXCEPTIONS
# -----------------------------------------------------------------------------
exceptions:
  undeclared_exception_behaviour: hard_fail
  validation:
    exception_must_be_declared_in_policy: true
    exception_must_match_content_context: true
    log_all_exception_activations: true

  declared:
    - id: quote_preservation_exception
      description: Quoted source typography may retain original typography when preserved as source material and not recreated as brand typography.
      when:
        content_zone:
          - quotation
          - source_note
      override:
        enforcement_mode: quoted_material_relaxed
        skip_rules:
          - D001
          - D002
          - D015
          - H005

    - id: legal_text_exception
      description: Legal or regulated text may override typography preferences where required by law or compliance, but must not override minimum accessibility requirements unless a higher-priority legal policy explicitly requires it.
      when:
        policy_context:
          higher_priority_policy_matches:
            - "{brand_id}.legal.*"
            - global.regulatory
      override:
        enforcement_mode: defer_to_higher_policy

    - id: ai_generated_raster_text_exception
      description: AI-generated raster typography may be allowed only when editable text layers are unavailable and OCR, contrast, source text traceability, and accessibility checks pass.
      when:
        generated_by_ai:
          - true
        editable_text_layer_available:
          - false
      override:
        enforcement_mode: raster_text_allowed_with_strict_validation
        requirements:
          - intended_copy_ref_required
          - ocr_exact_match_required
          - post_render_contrast_check_required
          - source_text_logged
          - not_legal_or_regulated_text

    - id: print_outline_exception
      description: Print production may outline text when required by the printer or production workflow, provided source text and font metadata are retained in the production record.
      when:
        channel:
          - print
          - signage
      override:
        enforcement_mode: outlined_text_allowed_for_print
        requirements:
          - source_text_retained
          - font_token_retained
          - production_record_required
#  -----------------------------------------------------------------------------
# EXEMPLARS
# -----------------------------------------------------------------------------
exemplars:
  minimum_review_count: 2

  markdown_examples:
    role: human_readable_copy
    authoritative: false
    excluded_from_validation: true

  storage:
    mode: referenced
    source_key: "{brand_id}.standards.visual-identity.typography"
    section: exemplars
    load_at_validation: true
    retrieval:
      protocol: brando_policy_repo
      base_path: /policies/exemplars/
      key_format: "<exemplar_key>.md"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 604800

  fallback_behaviour:
    if_exemplars_unavailable: cached_pass_with_warning
    cached_pass_max_age_seconds: 604800
    affected_rules:
      - H005

  active_exemplar_keys:
    - "{brand_id}.standards.visual-identity.typography.exemplar.{example_key_1}"
    - "{brand_id}.standards.visual-identity.typography.exemplar.{example_key_2}"

  source_contexts:
    channels:
      - website
      - app
      - linkedin
      - pitch_deck
      - print
    content_types:
      - display_heading
      - heading
      - body_text
      - call_to_action
      - data_label
      - video_caption
#  -----------------------------------------------------------------------------
# ANTI-EXEMPLARS
# -----------------------------------------------------------------------------
anti_exemplars:
  enforcement_role: negative_reference_only
  used_by_rules: []
  excluded_from_deterministic_validation: true
  excluded_from_heuristic_validation: true
  sources:
    - id: "{anti_exemplar_source_1}"
      label: "{Human-readable label}"
      for_human_review_only: true
#  -----------------------------------------------------------------------------
# DOCUMENT SELF-VALIDATION
# -----------------------------------------------------------------------------
document_self_validation:
  validate_yaml_structure: true
  validate_authoritative_positive_exemplars: true
  validate_font_token_references: true
  validate_font_license_references: true
  validate_semantic_type_pairings: true
  validate_field_applicability_coverage: true
  validate_accessibility_thresholds: true
  validate_heuristic_scale_consistency: true
  exclude_markdown_guidance: true
  exclude_change_log: true
  exclude_comments: true
  exclude_anti_exemplars: true
  exclude_markdown_exemplar_copies: true
  notes:
    - All heuristic rules use a 0.0 to 1.0 scale.
    - OCR fidelity requires an exact match threshold of 1.0.
    - Font references include family refs, type style refs, variable axis refs, and fallback stack refs.
    - Anti-exemplars are excluded per anti_exemplars.excluded_from_deterministic_validation.
#  -----------------------------------------------------------------------------
# CLASSIFIERS
# -----------------------------------------------------------------------------
classifiers:
  typographic_hierarchy_classifier:
    description: |
      Scores whether typographic size, weight, spacing, and structure create
      a clear and usable hierarchy for the declared content type and channel.
    output:
      type: object
      properties:
        hierarchy_score:
          type: number
        reason:
          type: string
        suggested_repairs:
          type: array
          items:
            type: string
    used_by_rules:
      - H001

  readability_classifier:
    description: |
      Scores whether typography is readable for the declared content type,
      audience, viewport, density, and viewing context.
    output:
      type: object
      properties:
        readability_score:
          type: number
        crowded_regions:
          type: array
          items:
            type: object
        reason:
          type: string
    used_by_rules:
      - H002

  semantic_type_fit_classifier:
    description: |
      Scores whether the selected type family, weight, scale, and style fit
      the declared semantic role and content type.
    output:
      type: object
      properties:
        semantic_fit_score:
          type: number
        nearest_semantic_neighbors:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H003

  localization_fit_classifier:
    description: |
      Scores whether typography remains appropriate, legible, and brand-aligned
      after localization, script substitution, fallback fonts, or locale-specific
      typographic conventions.
    output:
      type: object
      properties:
        localization_fit_score:
          type: number
        affected_glyphs:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H004

  exemplar_alignment_classifier:
    description: |
      Scores whether the rendered typography aligns with approved typography
      exemplars for rhythm, hierarchy, spacing, and brand expression.
      Uses a 0.0 to 1.0 scale.
    output:
      type: object
      properties:
        alignment_score:
          type: number
        closest_exemplar_refs:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H005

  prompt_output_fidelity_classifier:
    description: |
      Checks whether AI-generated typography follows the declared prompt,
      approved font tokens, semantic role, accessibility intent, contrast
      prediction, hierarchy, and intended copy.
    output:
      type: object
      properties:
        fidelity_score:
          type: number
        contrast_prediction:
          type: object
        mismatched_prompt_terms:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H006

  brand_type_expression_classifier:
    description: |
      Scores whether typography expresses the intended brand personality without
      drifting into generic, decorative, off-category, or competitor-like styles.
    output:
      type: object
      properties:
        brand_expression_score:
          type: number
        drift_signals:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H007

  metric_shift_classifier:
    description: |
      Scores whether fallback fonts, webfont loading, localization fallback,
      or unavailable font files create unacceptable layout shift, rhythm shift,
      line-break changes, or spacing instability.
    output:
      type: object
      properties:
        metric_shift_score:
          type: number
        affected_text_blocks:
          type: array
          items:
            type: object
        reason:
          type: string
    used_by_rules:
      - H008

  ocr_fidelity_classifier:
    description: |
      Checks whether AI-generated or rasterized typography can be read exactly
      by OCR and matched against the intended source copy. This classifier is
      required for generated imagery, social assets, motion frames, or any
      output where editable text layers are unavailable.
    output:
      type: object
      properties:
        ocr_match_score:
          type: number
        extracted_text:
          type: string
        expected_text:
          type: string
        mismatches:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H009
#  -----------------------------------------------------------------------------
# EXECUTION
# -----------------------------------------------------------------------------
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
      - D021
      - D004
      - D005
      - D006
      - D007
      - D008
      - D009
      - D010
      - D011
      - D012
      - D013
      - D014
      - D015
      - D016
      - D017
      - D018
      - D019
      - D020
    phase_2_heuristic:
      - H001
      - H002
      - H003
      - H004
      - H005
      - H006
      - H007
      - H008
      - H009
    notes:
      - Run all deterministic rules first.
      - Proceed to heuristic rules only if deterministic rules pass or produce soft warnings only.
      - H009 requires exact OCR match using threshold: 1.0 because generated text errors are not acceptable in governed typography.

  heuristic_decisioning:
    low_confidence_ignore_below: 0.60
    medium_confidence_warn_at_or_above: 0.60
    high_confidence_enforce_at_or_above: 0.85
    threshold_resolution:
      policy: per_rule_takes_precedence
      notes:
        - All heuristic rules use a 0.0 to 1.0 scale.
        - Where a rule declares its own threshold, that value governs for that rule.
        - H009 uses threshold: 1.0 for exact OCR fidelity.

  retry_strategy:
    mode: targeted_repair_then_regenerate
    repair_scope:
      deterministic_failures: text_style_or_token_level
      heuristic_failures: text_block_or_asset_level
      ai_raster_text_failures: regenerate_or_replace_with_editable_text_layer
      after_two_failed_repairs: full_regeneration
    repair_instruction_format:
      include_violation_id: true
      include_failing_text: true
      include_font_token: true
      include_rendered_bounds: true
      include_pre_tolerance_values: true
      include_remediation_action: true
      include_accessibility_context: true
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
      - cached_pass_with_warning
    must_block:
      - unlicensed_font_used
      - inaccessible_required_text
      - ocr_fidelity_failure
      - personal_use_only_font_used
      - text_as_image_without_exception
      - any_hard_fail_after_max_retries
#  -----------------------------------------------------------------------------
# RULES
# -----------------------------------------------------------------------------
rules:
  deterministic:
    - id: D001
      name: approved_font_token_missing
      severity: hard_fail
      applies_to:
        - display_heading
        - heading
        - subheading
        - body_text
        - body_copy
        - caption
        - call_to_action
        - data_label
        - technical_specification
        - code
        - video_caption
        - kinetic_typography
      detect:
        method: structural_reference
        required_reference_field: font_token
        allowed_reference_sources:
          - typography_tokens.type_styles
          - typography_tokens.font_families.primary.id
          - typography_tokens.font_families.secondary.id
          - typography_tokens.font_families.monospace.id
      remediation:
        action: attach_approved_font_token_or_rewrite_style_reference

    - id: D002
      name: unapproved_font_family_used
      severity: hard_fail
      applies_to:
        - font_family
        - font_token
        - display_heading
        - heading
        - body_text
        - body_copy
        - code
        - data_label
      detect:
        method: font_family_match
        allowed_sources:
          - typography_tokens.font_families.primary.family_name
          - typography_tokens.font_families.secondary.family_name
          - typography_tokens.font_families.monospace.family_name
          - typography_tokens.font_families.primary.fallback_stack
          - typography_tokens.font_families.secondary.fallback_stack
          - typography_tokens.font_families.monospace.fallback_stack
      remediation:
        action: replace_with_approved_font_family

    - id: D003
      name: font_license_missing_or_invalid
      severity: hard_fail
      applies_to:
        - font_family
        - font_token
      detect:
        method: license_reference_check
        required_reference_field: source_ref
        approved_license_repository: typography_tokens.licensing.license_repository_ref
        forbid_personal_use_only: true
        require_market_usage_clearance: true
      remediation:
        action: attach_valid_font_license_or_replace_font

    - id: D004
      name: font_size_below_minimum
      severity: hard_fail
      applies_to:
        - display_heading
        - heading
        - subheading
        - body_text
        - body_copy
        - caption
        - legal_disclaimer
        - call_to_action
        - data_label
        - code
        - video_caption
        - kinetic_typography
      detect:
        method: rendered_font_size_check
        threshold_from_field_applicability: minimum_font_size_px
        tolerance_px: 0.01
        log_pre_tolerance_value: true
      remediation:
        action: increase_font_size_to_approved_minimum

    - id: D005
      name: line_height_out_of_range
      severity: hard_fail
      applies_to:
        - body_text
        - body_copy
        - caption
        - legal_disclaimer
        - call_to_action
        - video_caption
      detect:
        method: line_height_ratio_check
        minimum_from: accessibility_policy.readability.minimum_body_line_height_ratio
        maximum_from: accessibility_policy.readability.maximum_body_line_height_ratio
        tolerance: 0.01
        log_pre_tolerance_value: true
      remediation:
        action: adjust_line_height_to_approved_range

    - id: D006
      name: tracking_out_of_range
      severity: hard_fail
      applies_to:
        - display_heading
        - heading
        - subheading
        - body_text
        - body_copy
        - caption
        - data_label
        - code
      detect:
        method: tracking_token_check
        threshold_from_type_style: tracking
        tolerance_px: 0.01
        log_pre_tolerance_value: true
      remediation:
        action: reset_tracking_to_approved_token

    - id: D007
      name: viewport_line_length_invalid
      severity: hard_fail
      applies_to:
        - body_text
        - body_copy
        - legal_disclaimer
        - email_copy
        - presentation_text
      detect:
        method: line_length_check
        threshold_from_field_applicability: maximum_line_length_characters
        viewport_aware: true
        responsive_thresholds:
          mobile:
            target_characters_per_line: 45
            hard_max_characters_per_line: 75
          tablet:
            target_characters_per_line: 60
            hard_max_characters_per_line: 85
          desktop:
            target_characters_per_line: 70
            hard_max_characters_per_line: 90
      remediation:
        action: adjust_measure_layout_or_text_block_width

    - id: D008
      name: text_contrast_failure
      severity: hard_fail
      applies_to:
        - display_heading
        - heading
        - subheading
        - body_text
        - body_copy
        - caption
        - legal_disclaimer
        - call_to_action
        - data_label
        - code
        - video_caption
        - kinetic_typography
        - generated_raster_text
      detect:
        method: contrast_check
        threshold_from_field_applicability: minimum_contrast_ratio
        sample_rendered_pixels: true
        check_against_lowest_contrast_point: true
        gradient_handling:
          resolve_gradient_before_check: true
          validate_lowest_contrast_point_within_text_bounding_box: true
          forbid_average_contrast_pass: true
      remediation:
        action: adjust_text_or_background_colour_to_meet_contrast

    - id: D009
      name: heading_hierarchy_invalid
      severity: hard_fail
      applies_to:
        - heading
        - subheading
        - body_text
        - presentation_text
        - webpage
      detect:
        method: semantic_hierarchy_check
        require_no_skipped_heading_levels: true
        require_visual_semantic_alignment: true
      remediation:
        action: repair_heading_order_and_visual_hierarchy

    - id: D010
      name: casing_rule_violation
      severity: soft_warn
      applies_to:
        - display_heading
        - heading
        - subheading
        - call_to_action
        - label
      detect:
        method: casing_check
        expected_case_from_type_style: case
        maximum_all_caps_body_words_from: accessibility_policy.readability.maximum_all_caps_body_words
      remediation:
        action: adjust_case_to_approved_style

    - id: D011
      name: fallback_stack_missing
      severity: hard_fail
      applies_to:
        - font_family
        - font_token
      detect:
        method: fallback_stack_check
        require_fallback_stack: true
        require_generic_family_last: true
      remediation:
        action: add_approved_fallback_stack

    - id: D012
      name: localized_script_missing
      severity: hard_fail
      applies_to:
        - font_family
        - font_token
        - localized_content
      detect:
        method: script_support_check
        required_scripts_from: typography_tokens.localization.required_script_support
        forbid_tofu_glyphs: true
      remediation:
        action: use_locale_approved_font_or_add_valid_fallback

    - id: D013
      name: glyph_coverage_insufficient
      severity: hard_fail
      applies_to:
        - localized_content
        - body_text
        - body_copy
        - legal_disclaimer
        - data_label
      detect:
        method: glyph_coverage_ratio_check
        minimum_ratio_from: typography_tokens.localization.minimum_glyph_coverage_ratio
        require_declared_script_coverage: true
      remediation:
        action: replace_with_font_meeting_required_glyph_coverage

    - id: D014
      name: variable_font_axis_out_of_range
      severity: hard_fail
      applies_to:
        - font_token
        - display_heading
        - heading
        - body_text
        - body_copy
      detect:
        method: variable_axis_check
        allowed_axes_from: typography_tokens.variable_font_axes.allowed_axes
        clamp_not_allowed: true
      remediation:
        action: reset_variable_axes_to_approved_range

    - id: D015
      name: semantic_type_pairing_invalid
      severity: hard_fail
      applies_to:
        - display_heading
        - heading
        - body_text
        - body_copy
        - legal_disclaimer
        - data_label
        - code
        - technical_specification
        - video_caption
      detect:
        method: semantic_type_pairing_check
        allowed_pairs_from: semantic_type_pairings.allowed
        forbidden_pairs_from: semantic_type_pairings.forbidden_pairs
      remediation:
        action: replace_with_semantically_appropriate_type_style

    - id: D016
      name: font_performance_budget_exceeded
      severity: hard_fail
      applies_to:
        - website
        - app
        - email
        - landing_page
      detect:
        method: font_performance_budget_check
        max_font_requests_from: typography_tokens.performance_budget.max_font_requests
        max_total_font_payload_kb_from: typography_tokens.performance_budget.max_total_font_payload_kb
        max_single_font_file_kb_from: typography_tokens.performance_budget.max_single_font_file_kb
        require_subset_fonts: true
        require_font_display_strategy: true
      remediation:
        action: subset_fonts_reduce_requests_or_use_approved_fallback

    - id: D017
      name: required_text_rendered_as_image
      severity: hard_fail
      applies_to:
        - display_heading
        - heading
        - body_text
        - body_copy
        - legal_disclaimer
        - call_to_action
        - video_caption
        - kinetic_typography
      detect:
        method: editable_text_layer_check
        editable_text_required_from_field_applicability: editable_text_required
        forbid_rasterized_required_text: true
      unless_exception:
        - ai_generated_raster_text_exception
        - print_outline_exception
      remediation:
        action: replace_with_editable_text_layer_or_invoke_raster_text_exception

    - id: D018
      name: required_legal_text_not_editable
      severity: hard_fail
      applies_to:
        - legal_disclaimer
        - regulated_disclosure
      detect:
        method: editable_text_layer_check
        editable_text_required: true
        forbid_exception_for_legal_text: true
      remediation:
        action: replace_legal_text_with_editable_accessible_text

    - id: D019
      name: text_rendering_mode_invalid
      severity: soft_warn
      applies_to:
        - website
        - app
        - presentation_text
        - video_caption
        - print
      detect:
        method: text_rendering_mode_check
        approved_modes_from: typography_tokens.text_rendering.approved_rendering_modes
        disallowed_modes_from: typography_tokens.text_rendering.disallowed_rendering_modes
      remediation:
        action: use_approved_text_rendering_mode

    - id: D020
      name: living_type_designer_or_foundry_style_reference
      severity: hard_fail
      applies_to:
        - ai_prompt
        - generated_raster_text
        - display_heading
        - heading
      detect:
        method: prompt_phrase_match
        source: ai_generation_policy.prompt_controls.forbidden_prompt_phrases
        case_insensitive: true
        living_creator_check_required: true
      remediation:
        action: remove_living_designer_or_foundry_style_reference_and_use_approved_font_token

    - id: D021
      name: font_source_provenance_invalid
      severity: hard_fail
      applies_to:
        - font_family
        - font_token
      detect:
        method: font_source_provenance_check
        approved_source_repository: typography_tokens.licensing.license_repository_ref
        require_file_or_asset_ref_match: true
        forbid_local_unverified_font_files: true
        forbid_unknown_cdn_font_sources: true
      remediation:
        action: replace_with_font_from_approved_repository_or_attach_valid_source_ref

  heuristic:
    - id: H001
      name: weak_typographic_hierarchy
      severity: soft_warn
      applies_to:
        - display_heading
        - heading
        - subheading
        - body_text
        - presentation_text
      detect:
        method: typographic_hierarchy_classifier
        threshold: 0.75
      remediation:
        action: strengthen_size_weight_spacing_or_structure

    - id: H002
      name: readability_risk
      severity: hard_fail
      applies_to:
        - body_text
        - body_copy
        - legal_disclaimer
        - caption
        - video_caption
        - generated_raster_text
      detect:
        method: readability_classifier
        threshold: 0.80
      remediation:
        action: improve_readability_using_returned_crowded_regions_and_suggested_repairs

    - id: H003
      name: weak_semantic_type_fit
      severity: soft_warn
      applies_to:
        - display_heading
        - heading
        - body_text
        - body_copy
        - data_label
        - code
        - call_to_action
      detect:
        method: semantic_type_fit_classifier
        threshold: 0.75
      remediation:
        action: select_more_semantically_appropriate_type_style_using_nearest_neighbors

    - id: H004
      name: localization_typography_drift
      severity: soft_warn
      applies_to:
        - localized_content
        - body_text
        - body_copy
        - legal_disclaimer
      detect:
        method: localization_fit_classifier
        threshold: 0.75
      remediation:
        action: adjust_locale_font_or_typographic_spacing

    - id: H005
      name: low_exemplar_alignment_score
      severity: soft_warn
      applies_to:
        - display_heading
        - heading
        - subheading
        - body_text
        - presentation_text
        - social_post
      detect:
        method: exemplar_alignment_classifier
        threshold: 0.70
      remediation:
        action: revise_toward_approved_typographic_rhythm_and_hierarchy

    - id: H006
      name: prompt_output_fidelity_mismatch
      severity: hard_fail
      applies_to:
        - display_heading
        - heading
        - body_text
        - presentation_text
        - social_post
        - kinetic_typography
        - generated_raster_text
      detect:
        method: prompt_output_fidelity_classifier
        threshold: 0.80
        contrast_prediction_required: true
        predicted_contrast_must_align_with_prompt: true
        required_when:
          generated_by_ai: true
      remediation:
        action: regenerate_or_repair_typography_to_match_declared_prompt_tokens_and_accessibility_intent

    - id: H007
      name: weak_brand_type_expression
      severity: soft_warn
      applies_to:
        - display_heading
        - heading
        - presentation_text
        - social_post
        - campaign_asset
      detect:
        method: brand_type_expression_classifier
        threshold: 0.75
      remediation:
        action: revise_typography_to_better_match_brand_expression

    - id: H008
      name: fallback_metric_shift_risk
      severity: soft_warn
      applies_to:
        - website
        - app
        - localized_content
        - body_text
        - body_copy
      detect:
        method: metric_shift_classifier
        threshold: 0.80
        check_font_loading_states: true
        check_fallback_stack_states: true
      remediation:
        action: adjust_fallback_stack_or_font_loading_strategy_to_reduce_metric_shift

    - id: H009
      name: ocr_fidelity_check
      severity: hard_fail
      applies_to:
        - display_heading
        - heading
        - body_text
        - body_copy
        - social_post
        - presentation_text
        - video_caption
        - kinetic_typography
        - generated_raster_text
      detect:
        method: ocr_fidelity_classifier
        threshold: 1.0
        required_when:
          generated_by_ai: true
          editable_text_layer_available: false
        expected_text_source: intended_copy
      remediation:
        action: regenerate_with_exact_text_or_replace_with_editable_text_layer
#  -----------------------------------------------------------------------------
# DECISION POLICY
# -----------------------------------------------------------------------------
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
        - If any matched channel, content type, accessibility context, or legal condition requires human sign-off, human sign-off is required.
        - Auto-publish is allowed only when no matched rule requires human sign-off.
    requires_human_sign_off_on_warn:
      channels:
        - website
        - app
        - print
        - signage
        - video
      content_types:
        - legal_disclaimer
        - generated_raster_text
        - kinetic_typography
      rule_ids:
        - H008
    allows_auto_publish_on_warn:
      channels:
        - linkedin
        - newsletter
      content_types:
        - social_post
        - email_copy

  human_review_conditions:
    - retry_count >= 3
    - unresolved_heuristic_conflict == true
    - ai_generated_raster_text_exception_used == true
    - font_license_warning_present == true
    - fallback_metric_shift_warning_present == true
#  -----------------------------------------------------------------------------
# TELEMETRY
# -----------------------------------------------------------------------------
telemetry:
  log_policy_key: true
  log_policy_version: true
  log_rule_failures: true
  log_retry_history: true
  log_exception_usage: true
  log_font_tokens: true
  log_font_source_refs: true
  log_accessibility_results: true
  log_ocr_results: true
  log_pre_tolerance_values: true
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
      locale:
        type: string
      persona:
        type: string
      timestamp:
        type: string
        format: iso8601
      font_tokens:
        type: array
        items:
          type: string
      font_source_refs:
        type: array
        items:
          type: string
      contrast_results:
        type: array
        items:
          type: object
      ocr_results:
        type: array
        items:
          type: object
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
            pre_tolerance_value:
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
#  -----------------------------------------------------------------------------
# RELATED POLICY LINKS
# -----------------------------------------------------------------------------
related_standards:
  - "{brand_id}.brand.core"
  - "{brand_id}.standards.visual-identity.logo"
  - "{brand_id}.standards.visual-identity.colour"
  - "{brand_id}.standards.visual-identity.layout"
  - "{brand_id}.standards.verbal-identity.messaging-framework"
  - "{brand_id}.standards.verbal-identity.tone-of-voice"

related_applications:
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.email"
  - "{brand_id}.applications.pitch-deck"
  - "{brand_id}.applications.print"
  - "{brand_id}.applications.video"
---
# {Brand Name} typography

## How to complete this template

This is a Brando® Typography standard template. Complete the following steps in order before publishing.

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
| `{Primary Font Family}` | Approved primary font family | `Inter` |
| `{Secondary Font Family}` | Approved secondary font family | `Source Serif` |
| `{Monospace Font Family}` | Approved monospace font family | `IBM Plex Mono` |
| `{display_heading_weight}` | Display heading font weight | `600` |
| `{body_text_size_token}` | Body text size token | `size-300` |
| `{example_key_1}` | Exemplar short key | `website-heading` |
| `<exemplar_key>` | Runtime variable. Do not replace | |

---
## Purpose

This standard governs how {Brand Name} uses typography across digital, print, motion, product, presentation, and AI-generated contexts.

Typography must support:

- Brand expression
- Readability
- Accessibility
- Localization
- Performance
- Legal font usage
- Prompt-to-output fidelity in AI-generated assets

Typography is not only a visual choice. It is a functional system that affects comprehension, trust, speed, and usability.

---
## How to interpret this policy

This policy has six layers:

1. Typography tokens define approved fonts, styles, scale, rendering, and performance limits.
2. Semantic pairings define which type styles are appropriate for each content role.
3. Accessibility policy defines minimum legibility, contrast, motion, and readability requirements.
4. AI generation policy governs generated typography and raster text.
5. Exemplars show approved typographic expression.
6. Execution rules determine whether output passes, warns, or fails.

The YAML front matter is the machine-executable layer. This Markdown body is the human-readable guidance layer. Where they conflict, the YAML governs.

---
## Typography principles
### {Typography Principle 1}

{Explain typography principle 1 in plain language.}

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
### {Typography Principle 2}

{Explain typography principle 2 in plain language.}

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
### {Typography Principle 3}

{Explain typography principle 3 in plain language.}

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
## Type system

The type system defines approved font families, fallback stacks, scale ratios, rendering behaviour, and variable font axis limits.

Use approved type tokens wherever possible. Do not invent new weights, unofficial tracking values, or unapproved optical styles.

For responsive typography, use the declared responsive ratios:

- Mobile ratio: `typography_tokens.type_scale.responsive_ratios.mobile`
- Tablet ratio: `typography_tokens.type_scale.responsive_ratios.tablet`
- Desktop ratio: `typography_tokens.type_scale.responsive_ratios.desktop`

Do not use a single modular scale across all viewport sizes.

---
## Monospace usage

Monospace is allowed only for technical or data-oriented content, such as:

- Code
- System output
- Technical specifications
- Data labels
- Tabular data

Do not use monospace for standard body text, hero copy, or expressive brand typography unless a brand-specific exception explicitly allows it.

---
## AI-generated typography

AI-generated typography must not be treated as a safe substitute for editable text.

If text is generated as part of an image, poster, video frame, social asset, or motion output, the system must validate:

- The intended source copy is attached.
- OCR can read the generated text exactly.
- The generated text matches the intended copy with a score of `1.0`.
- Contrast passes post-render accessibility checks.
- The generated output matches the prompt’s declared typography and accessibility intent.

If these checks fail, regenerate the asset or replace raster text with an editable text layer.

---
## Default execution expectations

Unless an explicit exception is declared in the YAML:

- Use approved font tokens.
- Use licensed font sources.
- Preserve editable text layers for required text.
- Keep variable font axes within approved ranges.
- Use responsive type ratios by breakpoint.
- Keep line length readable for the viewport.
- Meet contrast requirements using worst-case rendered sampling.
- Do not use text as an image.
- Do not mimic living type designers or foundries in AI prompts.
- Ensure localized typography has sufficient glyph coverage.
- Ensure fallback fonts do not create unacceptable metric shift.

---
## Exception model

Exceptions are allowed only when declared in the YAML `exceptions.declared` block. Undeclared exceptions hard fail.

Four exceptions are pre-declared in this template:

Quote preservation exception: source typography may be preserved when it is quoted or included as source material.

Legal text exception: higher-priority legal or regulatory policy may override typography preferences, but accessibility requirements should still be preserved unless explicitly overridden.

AI-generated raster text exception: allows generated raster text only when editable text layers are unavailable and OCR, contrast, source traceability, and accessibility checks pass.

Print outline exception: allows outlined text for print production when source text and font metadata are retained.

---
## Exemplars

Each exemplar below is referenced in the YAML by its `active_exemplar_key`. Validators use authoritative repository exemplars retrieved via `exemplars.storage.retrieval`, not the Markdown copies shown here.
### {exemplar-name}

Key: `{brand_id}.standards.visual-identity.typography.exemplar.{example_key}`

"{Approved exemplar copy.}"

Why it works:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---
## Anti-exemplars

Anti-exemplars are negative reference material for human review only. They are excluded from deterministic and heuristic validation. They must not be scored, repaired, or published.
### {anti-exemplar-name}

"{Anti-exemplar copy.}"

Why it fails:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---
## Validator interpretation notes
### Deterministic checks

Implement with token checks, font-source checks, licensing checks, contrast sampling, structural checks, rendered metrics, and measurable thresholds.

Covered by: D001, D002, D003, D004, D005, D006, D007, D008, D009, D010, D011, D012, D013, D014, D015, D016, D017, D018, D019, D020, D021
### Heuristic checks

Implement using classifiers, scorers, OCR, prompt-output comparison, fallback-risk scoring, and typographic interpretation.

Covered by: H001, H002, H003, H004, H005, H006, H007, H008, H009

Every heuristic check must return both a score and a reason. Never return a score alone.
### Scale note for heuristic scores

All heuristic rules use a `0.0` to `1.0` scale.

H009 is an exact-match OCR rule and requires `threshold: 1.0`.
### Contrast prediction and contrast validation

H006 may predict whether generated typography is likely to meet contrast and accessibility intent.

D008 remains the authoritative post-render contrast rule. It must sample the rendered output and validate against the lowest-contrast point within the text bounding box.
### Font provenance

Font license checks and font source provenance checks are separate.

D003 checks whether the font is licensed.

D021 checks whether the actual font source, path, repository reference, or CDN source is approved.

A licensed font from an unverified source may still fail D021.
### Fallback metric shift

H008 checks whether fallback fonts cause unacceptable layout, rhythm, or line-break shifts.

Telemetry should log affected text blocks so the repair process can adjust fallback stacks rather than guessing.

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
- All font family references resolve to declared font tokens.
- All font source references resolve to approved licensing records.
- All fallback stacks are declared and end with a generic family.
- All variable font axes stay within approved ranges.
- All semantic type pairings are valid.
- All localized scripts have sufficient glyph coverage.
- All required text is editable unless a declared exception applies.
- AI-generated raster text passes OCR exact match when allowed.
- Contrast checks use rendered output and worst-case text bounding-box sampling.
- Responsive type ratios are declared for mobile, tablet, and desktop.
- All rule IDs referenced in `execution.rule_execution_order` exist in `rules`.
- All exception IDs referenced in `unless_exception` blocks exist in `exceptions.declared`.
- Positive exemplars do not violate deterministic rules.
- Anti-exemplars are explicitly excluded from validation.
- All channel and content-type values in rules and decision policy match `scope.applies_to`.
- The telemetry schema is valid and the policy key and version are attached to every validation report.
