---
# =============================================================================
# BRANDO® ILLUSTRATION STANDARD TEMPLATE
# brando-schema-1.0 | document_type: policy_standard
# =============================================================================
#
# PLACEHOLDER CONVENTION - READ BEFORE EDITING
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
#
# Prose fields such as description, rationale, notes, classifier guidance,
# and remediation guidance should use block scalar style (| or >) wherever
# practical. This prevents accidental YAML flow-mapping errors when prose
# contains braces, colons, or examples.
# =============================================================================

# -----------------------------------------------------------------------------
# DOCUMENT IDENTITY
# -----------------------------------------------------------------------------
# Required. Stable, globally unique identifier for this policy.
# Recommended pattern: {brand_id}.standards.visual-identity.illustration
id: "{brand_id}.standards.visual-identity.illustration"

# Required. Usually mirrors id. Use as the stable lookup key in policy
# repositories, MCP servers, APIs, and audit logs.
key: "{brand_id}.standards.visual-identity.illustration"

# Required. Human-readable title.
title: "{Brand Name} Illustration"

# Required. Short description used in repositories, UIs, search, and audit logs.
# Use block scalar style for resilience when edited by humans.
description: |
  Core illustration standard governing illustration style, subject matter,
  semantic fit, colour-token use, accessibility, motion safety, provenance,
  and prompt-to-output fidelity across {Brand Name} communications.

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
subcategory: illustration

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

# Required. ISO date. Quote to prevent YAML date parsing.
created: "YYYY-MM-DD"

# Required. ISO date. Quote to prevent YAML date parsing.
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
  type: BrandIllustrationStandard

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
  client_term: Illustration
  canonical_term: Visual Identity
  policy_label: Illustration
  rationale: |
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
    # Do not mix channels with asset types in this list.
    channels:
      - website
      - linkedin
      - email
      - newsletter
      - event_platform
      - sales_enablement
      - pitch_deck
      - proposal
      - product_ui
      - app_store
      - advertising
      - print
      - packaging

    # Required. Types of illustration assets or governed components.
    # Composite outputs such as pitch decks, reports, web pages, or campaign
    # pages should be decomposed into governed illustration assets before rule
    # execution. Passing a composite output as a single blob may cause field-level
    # rules to be skipped.
    content_types:
      - hero_illustration
      - spot_illustration
      - editorial_illustration
      - product_illustration
      - process_illustration
      - conceptual_illustration
      - data_illustration
      - character_illustration
      - scene_illustration
      - social_illustration
      - campaign_illustration
      - presentation_illustration
      - report_illustration
      - email_illustration
      - infographic_panel
      - animated_illustration
      - illustration_set
      - background_illustration
      - thumbnail_illustration

    # Recommended. Audience or persona types for illustration adaptation.
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

    # Recommended. Zones within assets.
    # Useful for excluding metadata, source notes, third-party marks, or legal text.
    content_zones:
      - rendered_visual
      - foreground_subject
      - background
      - text_overlay
      - caption
      - metadata
      - source_note
      - legal_disclaimer

  excludes:
    content_types:
      - legal_disclaimer
      - regulated_disclosure
      - invoice
      - procurement_template
      - third_party_logo_lockup

  notes:
    - Applies to generated, commissioned, edited, and reused illustration assets.
    - Applies to illustration prompts, source files, rendered outputs, and repository metadata.
    - Does not apply to photography unless an illustration style transform is applied.
    - Does not apply to legal or compliance marks unless downstream policy explicitly says so.

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
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.visual-identity.typography"
    - "{brand_id}.standards.visual-identity.iconography"
    - "{brand_id}.standards.visual-identity.illustration"
    - "{brand_id}.applications.*"
    - campaign.local

  conflict_resolution:
    # Allowed values:
    # - higher_priority_wins | most_restrictive_wins | explicit_exception_required
    mode: higher_priority_wins
    notes:
      - Colour and typography standards govern token use and text legibility where they overlap with illustration.
      - Illustration governs subject matter, style, semantic fit, composition, provenance, and prompt-output fidelity.
      - Application-specific policy may narrow this standard only within its declared scope.
      - Application-specific policy may not weaken higher-priority legal, regulatory, accessibility, or safety constraints.
      - Campaign policy may adapt illustration style only when traceable to approved visual tokens or an explicit exception.
      - Exceptions must be explicit and machine-readable to override defaults.

# -----------------------------------------------------------------------------
# INHERITANCE
# -----------------------------------------------------------------------------
# Optional but recommended for enterprise or multi-brand systems.
inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
    - "{brand_id}.standards.visual-identity.colour:^1.0.0"
  may_be_overridden_by:
    - "{brand_id}.applications.website"
    - "{brand_id}.applications.linkedin"
    - "{brand_id}.applications.presentation"
    - "{brand_id}.applications.report"
    - "{brand_id}.applications.product-ui"
    - "{brand_id}.campaigns.*"
    - "{brand_id}.legal.*"
    - "{brand_id}.market.*"

# -----------------------------------------------------------------------------
# DEPENDENCIES
# -----------------------------------------------------------------------------
# Recommended. Pinned references prevent breaking changes in upstream standards
# from silently changing this policy's behaviour.
dependencies:
  colour_standard_ref: "{brand_id}.standards.visual-identity.colour:^1.0.0"
  typography_standard_ref: "{brand_id}.standards.visual-identity.typography:^1.0.0"
  iconography_standard_ref: "{brand_id}.standards.visual-identity.iconography:^1.0.0"
  accessibility_standard_ref: "global.accessibility.visual-content:^1.0.0"
  dependency_resolution:
    on_major_version_mismatch: hard_fail
    on_minor_version_mismatch: warn
    on_patch_version_mismatch: allow

# -----------------------------------------------------------------------------
# RESOLUTION BEHAVIOUR
# -----------------------------------------------------------------------------
# Recommended for executable policy systems.
resolution:
  resolve_inheritance_before_validation: true
  resolve_exceptions_before_rule_execution: true
  resolve_colour_tokens_before_contrast_check: true
  resolve_gradient_before_contrast_check: true
  resolve_motion_preferences_before_animation_check: true
  materialize_effective_policy: true
  effective_policy_output:
    include_resolved_rules: true
    include_applied_exceptions: true
    include_precedence_path: true
    include_resolved_colour_tokens: true
    include_resolved_illustration_tokens: true
    include_resolved_repository_asset_refs: true

# -----------------------------------------------------------------------------
# ILLUSTRATION REPOSITORY
# -----------------------------------------------------------------------------
# Required for executable governance. Defines how illustration assets are resolved.
illustration_repository:
  mode: referenced
  source_key: "{brand_id}.standards.visual-identity.illustration"
  section: illustration_assets
  load_at_validation: true
  retrieval:
    protocol: brando_policy_repo
    base_path: /policies/visual/illustration/
    key_format: "<illustration_key>.svg"
    metadata_format: "<illustration_key>.json"
    auth: service_account
    timeout_seconds: 5
    cache_ttl_seconds: 604800

  # Infrastructure fallback. A short repository outage should not paralyse
  # the creative pipeline if a previously validated asset is available.
  fallback_behaviour:
    if_asset_unavailable: cached_pass_with_warning
    cached_pass_max_age_seconds: 604800
    if_cache_unavailable: hard_fail
    log_cache_usage: true
    require_revalidation_when_repository_recovers: true
    notes:
      - Cached pass is permitted only for assets previously validated against this policy version or a compatible patch version.
      - Cached pass must be logged in telemetry and surfaced as a warning.
      - Cached pass must not be used for new, modified, restricted, or legally sensitive illustration assets.

  active_illustration_keys:
    - "{brand_id}.standards.visual-identity.illustration.asset.{illustration_key_1}"
    - "{brand_id}.standards.visual-identity.illustration.asset.{illustration_key_2}"

# -----------------------------------------------------------------------------
# ILLUSTRATION PRINCIPLES
# -----------------------------------------------------------------------------
# Required. Three to five principles is usually enough.
# Keep descriptions to one clear sentence each.
principles:
  required:
    - "{illustration_principle_1}"
    - "{illustration_principle_2}"
    - "{illustration_principle_3}"
  definitions:
    "{illustration_principle_1}":
      description: "{Describe illustration principle 1 in one clear sentence.}"
    "{illustration_principle_2}":
      description: "{Describe illustration principle 2 in one clear sentence.}"
    "{illustration_principle_3}":
      description: "{Describe illustration principle 3 in one clear sentence.}"

# -----------------------------------------------------------------------------
# ILLUSTRATION SYSTEM
# -----------------------------------------------------------------------------
# Required. Defines the approved visual grammar for illustrations.
illustration_system:
  style_attributes:
    required:
      - "{style_attribute_1}"
      - "{style_attribute_2}"
      - "{style_attribute_3}"
    discouraged:
      - generic_stock_style
      - copied_competitor_style
      - overly_complex_scenes
      - unclear_subject_matter
      - inaccessible_text_overlay
      - culturally_insensitive_archetypes

  composition:
    default_required:
      - single_clear_focal_point
      - purposeful_negative_space
      - visible_message_connection
      - clear_subject_background_separation
    discouraged:
      - decorative_only_visual_noise
      - multiple_competing_focal_points
      - unbalanced_cropping
      - overcrowded_backgrounds

  geometry:
    grid_alignment_required: true
    pixel_snap_required: true
    pixel_snap_tolerance_px: 0.01
    preferred_grid_unit_px: 8
    allowed_corner_styles:
      - rounded
      - geometric
      - "{brand_specific_corner_style}"
    forbidden_geometry:
      - inconsistent_stroke_weights
      - accidental_asymmetry
      - unapproved_perspective_system

  line_and_shape:
    stroke_weight_tokens:
      - "{stroke_token_1}"
      - "{stroke_token_2}"
    fill_style:
      default: "{approved_fill_style}"
    outline_style:
      default: "{approved_outline_style}"
    shading:
      allowed:
        - flat_colour
        - subtle_gradient
        - "{approved_shading_style}"
      forbidden:
        - photorealistic_rendering_unless_approved
        - unapproved_3d_depth
        - excessive_shadowing

  colour_application:
    colour_token_source: "{brand_id}.standards.visual-identity.colour:^1.0.0"
    approved_token_refs:
      - "{colour_token_1}"
      - "{colour_token_2}"
      - "{colour_token_3}"
    neutral_token_refs:
      - "{neutral_colour_token_1}"
    semantic_colour_required: true
    unapproved_colour_forbidden: true
    gradient_allowed: true
    gradient_requirements:
      token_based_only: true
      contrast_checked_at_worst_case_point: true
      no_unapproved_interpolated_colours: true
    print_context:
      cmyk_required: true
      materialization_profile: ISO Coated v2 (ECI)
      materialize_missing_cmyk_before_fail: true

  text_overlay:
    allowed: true
    contrast_minimum_normal_text: 4.5
    contrast_minimum_large_text: 3.0
    gradient_contrast_rule: worst_case_under_text_bounding_box
    notes:
      - When text is placed over an illustration or gradient, contrast must be validated against the lowest-contrast point of the area covered by the text bounding box.
      - A single background sample is insufficient when the text crosses multiple colours, gradients, shadows, textures, or image regions.

  subject_matter:
    allowed_subjects:
      - abstract_concept
      - process
      - product_context
      - people_non_identifiable
      - data_story
      - environment
      - object
      - system_map
      - "{approved_subject_1}"
    restricted_subjects:
      - identifiable_real_people
      - customer_logos
      - regulated_professional_contexts
      - financial_results_visualisations
      - health_or_safety_scenarios
      - ai_generated_human_faces
    forbidden_subjects:
      - harmful_stereotypes
      - competitor_brand_assets
      - misleading_product_screens
      - copyrighted_character_imitation
      - culturally_insensitive_symbols
      - unsafe_or_illegal_activity
      - photorealistic_synthetic_people_unless_approved
    notes:
      - Identifiable real people includes real people, recognisable likenesses, and photorealistic AI-generated faces that could reasonably be mistaken for real people.
      - Photorealistic synthetic people require explicit approval unless the brand allows them in a separate application policy.

  motion:
    allowed_for:
      - animated_illustration
      - product_ui
      - social_illustration
      - presentation_illustration
    reduced_motion_variant_required: true
    autoplay_allowed: false
    loop_allowed: true
    maximum_loop_duration_seconds: 8
    motion_safety:
      rapid_movement_forbidden: true
      maximum_flashes_per_second: 3
      maximum_large_area_motion_frequency_hz: 3
      parallax_intensity_limit: low
      vestibular_trigger_review_required: true
      rapid_zoom_or_pan_forbidden: true
      loop_jump_discontinuity_forbidden: true

# -----------------------------------------------------------------------------
# SEMANTIC ROLES
# -----------------------------------------------------------------------------
# Required. Defines what an illustration is meant to do.
semantic_roles:
  approved:
    - action_prompt
    - concept_explanation
    - storytelling
    - data_support
    - product_context
    - process_guidance
    - onboarding
    - campaign_expression
    - emotional_reassurance
    - decorative_support
  discouraged:
    - decoration_only
    - vague_mood_setting
    - generic_filler
  forbidden:
    - misleading_evidence
    - unsupported_claim_visualisation
    - competitor_imitation
    - stereotype_reinforcement

semantic_type_pairing:
  allowed_pairs:
    hero_illustration:
      - storytelling
      - campaign_expression
      - concept_explanation
      - emotional_reassurance
    spot_illustration:
      - concept_explanation
      - emotional_reassurance
      - decorative_support
      - action_prompt
    editorial_illustration:
      - storytelling
      - concept_explanation
      - data_support
    product_illustration:
      - product_context
      - process_guidance
      - action_prompt
    process_illustration:
      - process_guidance
      - concept_explanation
    conceptual_illustration:
      - concept_explanation
      - storytelling
      - emotional_reassurance
    data_illustration:
      - data_support
      - concept_explanation
    character_illustration:
      - storytelling
      - onboarding
      - emotional_reassurance
    scene_illustration:
      - storytelling
      - campaign_expression
      - concept_explanation
    social_illustration:
      - campaign_expression
      - storytelling
      - action_prompt
    campaign_illustration:
      - campaign_expression
      - storytelling
      - emotional_reassurance
    presentation_illustration:
      - concept_explanation
      - data_support
      - storytelling
    report_illustration:
      - data_support
      - concept_explanation
    email_illustration:
      - action_prompt
      - emotional_reassurance
      - concept_explanation
    infographic_panel:
      - data_support
      - process_guidance
      - concept_explanation
    animated_illustration:
      - process_guidance
      - campaign_expression
      - onboarding
    illustration_set:
      - storytelling
      - process_guidance
      - concept_explanation
    background_illustration:
      - decorative_support
      - emotional_reassurance
    thumbnail_illustration:
      - action_prompt
      - concept_explanation
      - storytelling
  invalid_pair_behaviour: hard_fail

# -----------------------------------------------------------------------------
# GENERATION AND PROVENANCE POLICY
# -----------------------------------------------------------------------------
# Required if AI-generated, AI-edited, commissioned, or licensed assets are allowed.
generation_policy:
  allowed_generation_methods:
    - human_created
    - ai_generated
    - ai_assisted
    - commissioned
    - licensed_stock_modified
    - repository_reuse
  provenance_required: true
  prompt_required_for_ai_generated_assets: true
  prompt_output_fidelity_required: true
  prompt_output_minimum_fidelity_score: 0.80
  prompt_metadata_required_fields:
    - generation_prompt
    - negative_prompt
    - model_or_tool
    - generation_date
    - approved_style_ref
    - declared_subject
    - declared_purpose
    - semantic_role
    - colour_token_refs
  forbidden_prompt_terms:
    - in the style of living artist
    - like "{competitor_brand_name}"
    - copy "{third_party_asset_name}"
    - photorealistic real person
    - "{forbidden_prompt_term_1}"
  output_metadata_required_fields:
    - generation_method
    - source_file_ref
    - creator_or_model_ref
    - license_status
    - approval_status
    - semantic_role
    - content_type
    - colour_token_refs
    - alt_text

# -----------------------------------------------------------------------------
# LEXICAL POLICY
# -----------------------------------------------------------------------------
# Optional. Use when illustration prompts have forbidden, discouraged, or preferred vocabulary.
# This governs prompt input and asset metadata, not visual output alone.
lexical_policy:
  forbidden_words:
    exact:
      - "{forbidden_prompt_word_or_phrase_1}"
      - "{forbidden_prompt_word_or_phrase_2}"

  discouraged_words:
    - "{discouraged_prompt_word_or_phrase_1}"
    - "{discouraged_prompt_word_or_phrase_2}"

  preferred_replacements:
    "{forbidden_prompt_word_or_phrase_1}": "{preferred_replacement_1}"
    "{forbidden_prompt_word_or_phrase_2}": "{preferred_replacement_2}"

# -----------------------------------------------------------------------------
# PATTERN POLICY
# -----------------------------------------------------------------------------
# Recommended. Defines reusable illustration and prompt constraints.
# Rules reference patterns by id, not by list index.
pattern_policy:
  forbidden_patterns:
    - id: generic_stock_illustration_style
      description: |
        Avoid generic stock illustration styles that could belong to any brand.
      trigger_phrases:
        - generic vector illustration
        - stock illustration style
        - corporate memphis
        - undifferentiated humanoid geometry
        - generic flat-vector people
        - faceless corporate characters
        - oversized abstract limbs
        - decorative blob people
        - unbranded SaaS illustration style
      classifier_guidance: |
        Do not rely on trend labels alone. Detect generic stock illustration style
        through visual mechanics such as undifferentiated human figures, oversized
        abstract limbs, generic flat-vector shapes, low brand-specific detail, and
        absence of declared illustration-system attributes.
      examples:
        fail:
          - "Generic flat-vector people standing around a dashboard."
        pass:
          - "A brand-specific system map using approved geometry, colour tokens, and a clear decision-making metaphor."

    - id: competitor_style_imitation
      description: |
        Do not imitate competitor illustration systems, distinctive campaign assets,
        proprietary mascots, or recognisable third-party visual language.
      trigger_phrases:
        - in the style of "{competitor_1}"
        - similar to "{competitor_2}"
        - copy this illustration
        - make it look like "{third_party_brand}"
      examples:
        fail:
          - "Make this look like {competitor_1}'s product illustrations."
        pass:
          - "Use the approved {Brand Name} illustration attributes and colour tokens."

    - id: excessive_visual_complexity
      description: |
        Avoid illustrations with too many focal points, dense backgrounds, excessive
        path counts, or unclear visual hierarchy.
      examples:
        fail:
          - "A crowded room with many small figures, charts, devices, labels, and background textures."
        pass:
          - "A single focal scene with one clear subject, one supporting object, and purposeful negative space."

    - id: inaccessible_text_overlay
      description: |
        Do not place text over visual areas where contrast fails at any point under
        the text bounding box.
      examples:
        fail:
          - "White text crossing a light-to-dark gradient without checking the lightest region."
        pass:
          - "Text placed on a stable high-contrast background token."

    - id: stereotype_reinforcement
      description: |
        Avoid visual shorthand that reinforces stereotypes, tokenism, or culturally
        insensitive archetypes.
      examples:
        fail:
          - "A single stereotyped character used to represent an entire region, culture, role, or ability."
        pass:
          - "A context-specific scene reviewed against inclusion and representation guidance."

# -----------------------------------------------------------------------------
# REQUIRED ELEMENTS
# -----------------------------------------------------------------------------
# Recommended. Defines components every governed asset should carry.
required_elements:
  default:
    - approved_style_ref
    - semantic_role
    - declared_purpose
    - content_type
    - colour_token_refs
    - source_file_ref
    - approval_status
    - alt_text
    - generation_provenance
  conditional:
    - id: cmyk_values_for_print
      required_when:
        channel:
          - print
          - packaging
    - id: reduced_motion_variant
      required_when:
        content_type:
          - animated_illustration
    - id: legal_approval_for_restricted_subject
      required_when:
        restricted_subject_present: true
    - id: prompt_metadata_for_ai_generated_assets
      required_when:
        generation_method:
          - ai_generated
          - ai_assisted
    - id: contrast_check_for_text_overlay
      required_when:
        content_zone:
          - text_overlay
  resolution_strategy:
    cmyk_missing_for_print: |
      If CMYK values are missing for a print context, the engine shall attempt to
      materialize them from approved colour tokens using the ISO Coated v2 (ECI)
      colour profile before failing. If materialization fails or produces an
      out-of-gamut result, the asset must hard fail and be sent for review.

# -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
# Required if different illustration types need different thresholds.
# Missing entries should produce a schema warning or validation error.
field_applicability:
  hero_illustration:
    maximum_complexity_score: 0.70
    maximum_focal_points: 2
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: true
    alt_text_required: true

  spot_illustration:
    maximum_complexity_score: 0.55
    maximum_focal_points: 1
    semantic_role_required: true
    proof_required_for_claim_visualisation: false
    cmyk_required_for_print: true
    alt_text_required: true

  editorial_illustration:
    maximum_complexity_score: 0.75
    maximum_focal_points: 2
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: true
    alt_text_required: true

  product_illustration:
    maximum_complexity_score: 0.65
    maximum_focal_points: 2
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: true
    alt_text_required: true

  process_illustration:
    maximum_complexity_score: 0.70
    maximum_focal_points: 3
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: true
    alt_text_required: true

  conceptual_illustration:
    maximum_complexity_score: 0.65
    maximum_focal_points: 2
    semantic_role_required: true
    proof_required_for_claim_visualisation: false
    cmyk_required_for_print: true
    alt_text_required: true

  data_illustration:
    maximum_complexity_score: 0.70
    maximum_focal_points: 3
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: true
    alt_text_required: true

  character_illustration:
    maximum_complexity_score: 0.65
    maximum_focal_points: 2
    semantic_role_required: true
    proof_required_for_claim_visualisation: false
    cmyk_required_for_print: true
    alt_text_required: true
    restricted_subject_review_required: true

  scene_illustration:
    maximum_complexity_score: 0.75
    maximum_focal_points: 3
    semantic_role_required: true
    proof_required_for_claim_visualisation: false
    cmyk_required_for_print: true
    alt_text_required: true

  social_illustration:
    maximum_complexity_score: 0.60
    maximum_focal_points: 1
    semantic_role_required: true
    proof_required_for_claim_visualisation: false
    cmyk_required_for_print: false
    alt_text_required: true

  campaign_illustration:
    maximum_complexity_score: 0.70
    maximum_focal_points: 2
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: true
    alt_text_required: true

  presentation_illustration:
    maximum_complexity_score: 0.60
    maximum_focal_points: 1
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: false
    alt_text_required: true

  report_illustration:
    maximum_complexity_score: 0.70
    maximum_focal_points: 2
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: true
    alt_text_required: true

  email_illustration:
    maximum_complexity_score: 0.55
    maximum_focal_points: 1
    semantic_role_required: true
    proof_required_for_claim_visualisation: false
    cmyk_required_for_print: false
    alt_text_required: true

  infographic_panel:
    maximum_complexity_score: 0.75
    maximum_focal_points: 3
    semantic_role_required: true
    proof_required_for_claim_visualisation: true
    cmyk_required_for_print: true
    alt_text_required: true

  animated_illustration:
    maximum_complexity_score: 0.65
    maximum_focal_points: 2
    semantic_role_required: true
    reduced_motion_variant_required: true
    motion_safety_required: true
    cmyk_required_for_print: false
    alt_text_required: true

  illustration_set:
    maximum_complexity_score: 0.70
    maximum_focal_points: 3
    semantic_role_required: true
    system_coherence_required: true
    cmyk_required_for_print: true
    alt_text_required: true

  background_illustration:
    maximum_complexity_score: 0.45
    maximum_focal_points: 0
    semantic_role_required: true
    allowed_semantic_roles:
      - decorative_support
      - emotional_reassurance
    cmyk_required_for_print: true
    alt_text_required: false

  thumbnail_illustration:
    maximum_complexity_score: 0.50
    maximum_focal_points: 1
    semantic_role_required: true
    cmyk_required_for_print: false
    alt_text_required: true

# -----------------------------------------------------------------------------
# PERSONA PROFILES
# -----------------------------------------------------------------------------
# Optional. Use when the same standard needs slightly different behaviour.
persona_profiles:
  marketing_manager:
    visual_adjustment: standard
  content_creator:
    visual_adjustment: standard
  social_media:
    visual_adjustment: compressed_and_channel_native
  executive_communications:
    visual_adjustment: restrained_and_evidence_led
  sales:
    visual_adjustment: benefit_and_objection_led
  partner_marketing:
    visual_adjustment: shared_value_and_joint_proof_led
  new_hire:
    visual_adjustment: explanatory
  ai_agent:
    visual_adjustment: strict_constraint_enforcement

# -----------------------------------------------------------------------------
# EXCEPTIONS
# -----------------------------------------------------------------------------
# Required for executable governance. All exceptions must be declared here.
# Undeclared exceptions hard fail.
exceptions:
  undeclared_exception_behaviour: hard_fail
  validation:
    exception_must_be_declared_in_policy: true
    exception_must_match_asset_context: true
    log_all_exception_activations: true

  declared:
    - id: legacy_asset_exception
      description: |
        Legacy approved assets may remain in use until their declared retirement
        date if they have not been materially edited and do not fail legal,
        accessibility, inclusion, or safety checks.
      when:
        asset_status:
          - legacy_approved
      override:
        enforcement_mode: legacy_asset_limited_use
        requirements:
          - retirement_date_required
          - no_accessibility_hard_fail
          - no_legal_or_safety_hard_fail

    - id: campaign_adaptation_exception
      description: |
        Campaign policies may adapt illustration style for a declared campaign,
        provided the output remains traceable to approved visual principles,
        colour tokens, and campaign governance.
      when:
        application:
          - "{brand_id}.campaigns.*"
      override:
        enforcement_mode: campaign_adaptation_allowed
        requirements:
          - approved_style_ref_required
          - colour_token_refs_required
          - no_forbidden_subjects
          - no_competitor_style_imitation

    - id: legally_approved_restricted_subject_exception
      description: |
        Restricted subjects may be used only when the asset, context, and wording
        have explicit legal or governance approval.
      when:
        approval_status:
          - legally_approved
      override:
        enforcement_mode: restricted_subject_allowed
        requirements:
          - legal_approval_ref_required
          - restricted_subject_reason_required

    - id: decorative_background_exception
      description: |
        Background illustrations may omit alt text only when they are purely
        decorative, carry no meaning, and are marked as decorative in metadata.
      when:
        content_type:
          - background_illustration
        semantic_role:
          - decorative_support
      override:
        enforcement_mode: decorative_asset_relaxed
        requirements:
          - decorative_flag_required
          - no_text_or_claims_embedded

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
    mode: referenced
    source_key: "{brand_id}.standards.visual-identity.illustration"
    section: exemplars
    load_at_validation: true
    retrieval:
      protocol: brando_policy_repo
      base_path: /policies/exemplars/visual/illustration/
      key_format: "<exemplar_key>.md"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 604800

  fallback_behaviour:
    if_exemplars_unavailable: skip_rule_with_warning
    affected_rules:
      - H005

  active_exemplar_keys:
    - "{brand_id}.standards.visual-identity.illustration.exemplar.{example_key_1}"
    - "{brand_id}.standards.visual-identity.illustration.exemplar.{example_key_2}"

  source_contexts:
    channels:
      - website
      - linkedin
      - newsletter
      - sales_enablement
      - pitch_deck
      - product_ui
      - print
    content_types:
      - hero_illustration
      - spot_illustration
      - editorial_illustration
      - product_illustration
      - data_illustration
      - animated_illustration
      - illustration_set

# -----------------------------------------------------------------------------
# COMPETITIVE DIFFERENTIATION
# -----------------------------------------------------------------------------
# Optional. Helps human reviewers understand contrastive positioning.
competitive_differentiation:
  competitors:
    - "{competitor_1}"
    - "{competitor_2}"
  category_norms_to_avoid:
    - generic_stock_illustration_style
    - undifferentiated_humanoid_geometry
    - unbranded_saas_flat_vector_style
  differentiators:
    - "{Illustration differentiator 1}"
    - "{Illustration differentiator 2}"

# -----------------------------------------------------------------------------
# ANTI-EXEMPLARS
# -----------------------------------------------------------------------------
# Optional. Negative examples for human review only.
# Anti-exemplars are excluded from all deterministic and heuristic validation.
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
  validate_illustration_repository_refs: true
  validate_colour_token_refs: true
  validate_dependency_version_refs: true
  validate_semantic_type_pairing_map: true
  validate_no_graph_cycles: true
  validate_prompt_output_fidelity_fields: true
  validate_provenance_fields: true
  validate_cmyk_materialization_strategy: true
  validate_motion_safety_thresholds: true
  exclude_markdown_guidance: true
  exclude_change_log: true
  exclude_comments: true
  exclude_anti_exemplars: true
  exclude_markdown_exemplar_copies: true
  notes:
    - Template validation checks structure and references without requiring placeholder substitution.
    - Policy validation requires all placeholder values and date placeholders to be replaced.
    - Illustration repository references include active illustration keys, exemplar keys, source file refs, and metadata refs.
    - Colour token references must resolve through the pinned colour standard dependency.
    - Graph-cycle checks prevent recursive illustration set or dependency references.
    - YAML comments are excluded because they are stripped before rule execution.

# -----------------------------------------------------------------------------
# CLASSIFIERS
# -----------------------------------------------------------------------------
# Optional. Declare judgement-based classifiers required by heuristic rules.
classifiers:
  semantic_fit_classifier:
    description: |
      Scores whether the illustration's declared semantic role, content type,
      subject matter, and visual metaphor fit the message or interface context.
    output:
      type: object
      properties:
        semantic_fit_score:
          type: number
        nearest_semantic_neighbours:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H001

  brand_alignment_classifier:
    description: |
      Scores whether the illustration follows the approved illustration system,
      including style attributes, composition, geometry, line, shape, colour-token
      use, and subject-matter policy.
    output:
      type: object
      properties:
        brand_alignment_score:
          type: number
        failed_attributes:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H002

  visual_complexity_classifier:
    description: |
      Scores whether the illustration is too visually complex for the content
      type, channel, and audience context.
    scoring_method:
      scale: 0.0_to_1.0
      lower_is_simpler: true
      inputs:
        - visual_saliency_map
        - svg_path_count
        - layer_count
        - colour_count
        - focal_point_count
        - background_detail_density
        - text_overlay_interference
      diagnostic_outputs:
        - dominant_complexity_source
        - recommended_simplification_zone
        - estimated_path_count_reduction
        - background_density_warning
    output:
      type: object
      properties:
        complexity_score:
          type: number
        dominant_complexity_source:
          type: string
        recommended_simplification_zone:
          type: string
        reason:
          type: string
    used_by_rules:
      - H003

  originality_risk_classifier:
    description: |
      Scores whether an illustration risks imitating a competitor, living artist,
      copyrighted character, proprietary campaign asset, or recognisable third-party
      visual style.
    output:
      type: object
      properties:
        originality_risk_score:
          type: number
        suspected_source_similarity:
          type: string
        reason:
          type: string
    used_by_rules:
      - H004

  exemplar_alignment_classifier:
    description: |
      Scores whether the illustration aligns with approved exemplar assets.
      Uses a 0.0 to 1.0 scale. Do not use a 0-100 scale for this rule.
    output:
      type: object
      properties:
        exemplar_alignment_score:
          type: number
        closest_exemplar_key:
          type: string
        reason:
          type: string
    used_by_rules:
      - H005

  inclusion_sensitivity_classifier:
    description: |
      Scores whether people, roles, cultures, abilities, places, and scenarios
      are represented with care and without stereotyping, tokenism, or exclusion.
    output:
      type: object
      properties:
        inclusion_risk_score:
          type: number
        risk_type:
          type: string
        reason:
          type: string
    used_by_rules:
      - H006

  accessibility_visual_risk_classifier:
    description: |
      Scores whether the illustration may create accessibility issues beyond
      deterministic contrast and motion checks, including unclear meaning, low
      recognisability, inaccessible metaphor, or excessive visual ambiguity.
    output:
      type: object
      properties:
        accessibility_risk_score:
          type: number
        risk_type:
          type: string
        reason:
          type: string
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
      - D011
      - D012
      - D013
      - D014
      - D015
      - D016
      - D017
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
        - All heuristic rules use a 0.0-1.0 probability or similarity scale.
        - Where a rule declares its own threshold, that value governs for that rule.
        - Global heuristic_decisioning thresholds apply only where a rule does not declare its own threshold.

  retry_strategy:
    mode: targeted_repair_then_regenerate
    repair_scope:
      deterministic_failures: asset_or_metadata_level
      heuristic_failures: asset_or_prompt_level
      after_two_failed_repairs: full_regeneration
    repair_instruction_format:
      include_violation_id: true
      include_failing_asset_ref: true
      include_failing_metadata: true
      include_remediation_action: true
      include_style_reference: true
      include_colour_token_reference: true
      include_nearest_semantic_neighbours: true
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
      - any_hard_fail_after_max_retries
      - forbidden_subject_present
      - inaccessible_text_overlay
      - motion_safety_threshold_exceeded
      - provenance_missing
      - prompt_output_fidelity_mismatch

# -----------------------------------------------------------------------------
# RULES
# -----------------------------------------------------------------------------
# Required. Rules are executable validation checks.
rules:
  deterministic:
    - id: D001
      name: approved_illustration_source_missing
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
        - background_illustration
        - thumbnail_illustration
      detect:
        method: structural_reference
        required_reference_types:
          - illustration_repository.active_illustration_keys
          - approved_style_ref
          - source_file_ref
      remediation:
        action: attach_to_approved_illustration_source_or_submit_for_review

    - id: D002
      name: unsupported_asset_format
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
        - background_illustration
        - thumbnail_illustration
      detect:
        method: file_format_check
        allowed_formats:
          - svg
          - png
          - webp
          - json
          - lottie
          - pdf
          - ai
          - fig
      remediation:
        action: convert_to_supported_format_or_attach_source_file

    - id: D003
      name: text_overlay_contrast_insufficient
      severity: hard_fail
      applies_to:
        - hero_illustration
        - editorial_illustration
        - product_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
      detect:
        method: contrast_ratio_check
        source: illustration_system.text_overlay
        resolve_colour_tokens_before_check: true
        resolve_gradient_before_check: true
        gradient_check:
          method: worst_case_under_text_bounding_box
          requirement: lowest_contrast_point_must_pass
          notes:
            - When checking gradients, contrast must be validated against the lowest-contrast point of the gradient area covered by the text bounding box.
            - Do not validate only a single sampled background colour when text crosses gradients, textures, shadows, images, or multiple colour tokens.
      remediation:
        action: move_text_to_safe_area_or_adjust_background_token

    - id: D004
      name: forbidden_subject_matter_detected
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
      detect:
        method: subject_policy_match
        source: illustration_system.subject_matter.forbidden_subjects
      remediation:
        action: remove_forbidden_subject_or_replace_with_approved_subject

    - id: D005
      name: restricted_subject_without_approval
      severity: hard_fail
      applies_to:
        - hero_illustration
        - editorial_illustration
        - product_illustration
        - character_illustration
        - scene_illustration
        - campaign_illustration
        - report_illustration
        - animated_illustration
      detect:
        method: restricted_subject_approval_check
        restricted_subject_source: illustration_system.subject_matter.restricted_subjects
        approval_field: legal_approval_ref
      unless_exception:
        - legally_approved_restricted_subject_exception
      remediation:
        action: add_approval_reference_or_replace_restricted_subject

    - id: D006
      name: unapproved_colour_token_used
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
        - background_illustration
        - thumbnail_illustration
      detect:
        method: colour_token_reference_check
        approved_tokens_from: illustration_system.colour_application.approved_token_refs
        neutral_tokens_from: illustration_system.colour_application.neutral_token_refs
        unapproved_colour_forbidden: true
      remediation:
        action: replace_with_approved_colour_token

    - id: D007
      name: pixel_snap_or_grid_alignment_failure
      severity: soft_warn
      applies_to:
        - hero_illustration
        - spot_illustration
        - product_illustration
        - process_illustration
        - data_illustration
        - infographic_panel
        - illustration_set
        - thumbnail_illustration
      detect:
        method: pixel_grid_alignment_check
        pixel_snap_required_from: illustration_system.geometry.pixel_snap_required
        tolerance_px_from: illustration_system.geometry.pixel_snap_tolerance_px
        grid_unit_px_from: illustration_system.geometry.preferred_grid_unit_px
      remediation:
        action: snap_paths_to_grid_with_tolerance

    - id: D008
      name: alt_text_missing
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
        - thumbnail_illustration
      detect:
        method: structural_presence
        target: alt_text
      unless_exception:
        - decorative_background_exception
      remediation:
        action: add_context_appropriate_alt_text

    - id: D009
      name: deprecated_illustration_asset_used
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
        - background_illustration
        - thumbnail_illustration
      detect:
        method: deprecated_asset_match
        source: deprecated_illustrations.items
        case_insensitive: true
      unless_exception:
        - legacy_asset_exception
      remediation:
        action: replace_with_current_approved_illustration

    - id: D010
      name: print_colour_values_missing_or_unmaterializable
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - infographic_panel
        - illustration_set
        - background_illustration
      detect:
        method: cmyk_materialization_check
        when:
          channel:
            - print
            - packaging
        required_profile_from: illustration_system.colour_application.print_context.materialization_profile
        materialize_missing_cmyk_before_fail: true
        fail_if_out_of_gamut: true
      remediation:
        action: materialize_cmyk_using_iso_coated_v2_or_send_for_print_review

    - id: D011
      name: asset_reference_cycle_detected
      severity: hard_fail
      applies_to:
        - illustration_set
        - hero_illustration
        - campaign_illustration
        - product_illustration
        - animated_illustration
      detect:
        method: graph_cycle_check
        scope:
          - illustration_repository
          - illustration_system
          - dependencies
      remediation:
        action: remove_circular_reference_or_flatten_asset_dependency

    - id: D012
      name: competitor_or_third_party_style_reference_detected
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
      detect:
        method: phrase_match
        source:
          collection: pattern_policy.forbidden_patterns
          match:
            id: competitor_style_imitation
          field: trigger_phrases
      remediation:
        action: remove_style_imitation_reference_and_regenerate_with_brand_system

    - id: D013
      name: semantic_type_pairing_invalid
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
        - background_illustration
        - thumbnail_illustration
      detect:
        method: semantic_type_pairing_check
        pairing_map: semantic_type_pairing.allowed_pairs
        invalid_pair_behaviour: hard_fail
      remediation:
        action: change_semantic_role_or_select_appropriate_illustration_type

    - id: D014
      name: orphaned_illustration_token
      severity: soft_warn
      applies_to:
        - illustration_set
      detect:
        method: orphaned_asset_check
        repository_source: illustration_repository.active_illustration_keys
        required_mapping_sources:
          - semantic_roles.approved
          - semantic_type_pairing.allowed_pairs
          - exemplars.active_exemplar_keys
      remediation:
        action: map_asset_to_semantic_role_or_deprecate_from_repository

    - id: D015
      name: prompt_output_fidelity_mismatch
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
      detect:
        method: prompt_output_fidelity_check
        required_alignment_fields:
          - approved_style_ref
          - semantic_role
          - declared_subject
          - declared_purpose
          - colour_token_refs
          - composition_requirements
        minimum_fidelity_score: 0.80
        compare:
          source_prompt: generation_prompt
          generated_asset: rendered_visual
      remediation:
        action: revise_prompt_or_regenerate_asset_to_match_declared_constraints

    - id: D016
      name: motion_safety_threshold_exceeded
      severity: hard_fail
      applies_to:
        - animated_illustration
      detect:
        method: motion_safety_check
        source: illustration_system.motion.motion_safety
        checks:
          - flashes_per_second
          - large_area_motion_frequency_hz
          - parallax_intensity
          - rapid_zoom_or_pan
          - loop_jump_discontinuity
      remediation:
        action: reduce_motion_intensity_or_provide_safer_animation

    - id: D017
      name: generation_provenance_missing
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
      detect:
        method: structural_presence
        required_fields:
          - generation_method
          - source_file_ref
          - creator_or_model_ref
          - license_status
          - approval_status
      remediation:
        action: attach_generation_provenance_or_submit_for_review

  heuristic:
    - id: H001
      name: weak_semantic_fit
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - thumbnail_illustration
      detect:
        method: semantic_fit_classifier
        threshold: 0.80
      remediation:
        action: select_more_semantically_appropriate_illustration
        guidance: |
          Suggest the top three nearest semantic neighbours from the approved
          semantic_roles and illustration_repository.active_illustration_keys
          using vector similarity, then ask the generator or reviewer to choose
          the best fit for the declared purpose.

    - id: H002
      name: weak_brand_alignment
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
        - background_illustration
        - thumbnail_illustration
      detect:
        method: brand_alignment_classifier
        threshold: 0.85
      remediation:
        action: revise_against_approved_illustration_system

    - id: H003
      name: excessive_visual_complexity
      severity: soft_warn
      applies_to:
        - hero_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
      detect:
        method: visual_complexity_classifier
        maximum_complexity_score_from_field_applicability: maximum_complexity_score
      remediation:
        action: reduce_visual_complexity
        guidance: |
          Use classifier diagnostics to simplify the dominant complexity source.
          For example, reduce path count, simplify the background zone, remove
          competing focal points, or lower colour count.

    - id: H004
      name: originality_risk
      severity: hard_fail
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
      detect:
        method: originality_risk_classifier
        threshold: 0.80
      remediation:
        action: remove_imitation_risk_and_regenerate_from_brand_system

    - id: H005
      name: low_exemplar_alignment_score
      severity: soft_warn
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
      detect:
        method: exemplar_alignment_classifier
        exemplar_set: exemplars.active_exemplar_keys
        threshold: 0.70
      remediation:
        action: revise_toward_approved_illustration_exemplars

    - id: H006
      name: inclusion_sensitivity_risk
      severity: hard_fail
      applies_to:
        - hero_illustration
        - editorial_illustration
        - character_illustration
        - scene_illustration
        - campaign_illustration
        - social_illustration
        - presentation_illustration
        - report_illustration
        - animated_illustration
      detect:
        method: inclusion_sensitivity_classifier
        threshold: 0.75
      remediation:
        action: revise_subject_representation_or_escalate_to_human_review

    - id: H007
      name: weak_accessibility_visual_fit
      severity: soft_warn
      applies_to:
        - hero_illustration
        - spot_illustration
        - editorial_illustration
        - product_illustration
        - process_illustration
        - conceptual_illustration
        - data_illustration
        - character_illustration
        - scene_illustration
        - social_illustration
        - campaign_illustration
        - presentation_illustration
        - report_illustration
        - email_illustration
        - infographic_panel
        - animated_illustration
        - illustration_set
      detect:
        method: accessibility_visual_risk_classifier
        threshold: 0.70
      remediation:
        action: clarify_visual_meaning_or_add_accessibility_support

# -----------------------------------------------------------------------------
# DEPRECATED ILLUSTRATIONS
# -----------------------------------------------------------------------------
# Optional. Use when older assets must be blocked or replaced.
deprecated_illustrations:
  review_cycle: quarterly
  notes:
    - Deprecated illustrations are checked against all governed content types listed in D009.applies_to.
    - Review this list each quarter and remove entries older than 24 months unless retained for audit.
    - Each deprecated illustration must carry a replacement_ref pointing to a current approved asset or style source.
  items:
    - id: "{deprecated_illustration_1_id}"
      asset_ref: "{deprecated_asset_ref}"
      replacement_ref: "{replacement_illustration_ref}"
      reason: "{Why this asset is no longer approved.}"

# -----------------------------------------------------------------------------
# DECISION POLICY
# -----------------------------------------------------------------------------
# Required. Defines pass/warn/fail and publishing behaviour.
decision_policy:
  pass_conditions:
    - zero_hard_failures
  warn_conditions:
    - one_or_more_soft_warnings
    - cached_pass_with_warning
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
        - If any matched channel, content type, subject type, or accessibility condition requires human sign-off, human sign-off is required.
        - Auto-publish is allowed only when no matched rule requires human sign-off.
    requires_human_sign_off_on_warn:
      channels:
        - website
        - pitch_deck
        - sales_enablement
        - product_ui
        - print
        - packaging
      content_types:
        - hero_illustration
        - product_illustration
        - character_illustration
        - campaign_illustration
        - animated_illustration
      subject_types:
        - restricted_subject
        - ai_generated_human_faces
    allows_auto_publish_on_warn:
      channels:
        - linkedin
        - newsletter
      content_types:
        - spot_illustration
        - social_illustration
        - email_illustration
        - thumbnail_illustration

  human_review_conditions:
    - retry_count >= 3
    - unresolved_heuristic_conflict == true
    - restricted_subject_present == true
    - originality_risk_score >= 0.80
    - inclusion_risk_score >= 0.75
    - cached_pass_with_warning == true

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
  log_illustration_asset_refs: true
  log_colour_token_refs: true
  log_prompt_output_fidelity: true
  log_generation_provenance: true
  log_cache_usage: true
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
      illustration_asset_refs:
        type: array
        items:
          type: string
      colour_token_refs:
        type: array
        items:
          type: string
      semantic_role:
        type: string
      generation_method:
        type: string
      source_file_ref:
        type: string
      creator_or_model_ref:
        type: string
      license_status:
        type: string
      prompt_output_fidelity_score:
        type: number
      cache_usage:
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
  - "{brand_id}.standards.visual-identity.colour"
  - "{brand_id}.standards.visual-identity.typography"
  - "{brand_id}.standards.visual-identity.iconography"
  - "{brand_id}.standards.verbal-identity.messaging-framework"
  - "{brand_id}.standards.verbal-identity.tone-of-voice"

related_applications:
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.newsletter"
  - "{brand_id}.applications.presentation"
  - "{brand_id}.applications.report"
  - "{brand_id}.applications.product-ui"
  - "{brand_id}.applications.campaign"
---

# {Brand Name} illustration

## How to complete this template

This is a Brando® Illustration standard template. Complete the following steps in order before publishing.

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
| `{illustration_principle_1}` | First core illustration principle label | `purposeful` |
| `{style_attribute_1}` | Approved illustration style attribute | `clear_geometry` |
| `{colour_token_1}` | Approved colour token identifier | `brand.primary.blue` |
| `{stroke_token_1}` | Approved stroke token identifier | `stroke.medium` |
| `{illustration_key_1}` | Approved illustration asset key | `website-hero-platform` |
| `{example_key_1}` | Exemplar short key | `website-hero` |
| `<illustration_key>` | Runtime variable. Do not replace | |
| `<exemplar_key>` | Runtime variable. Do not replace | |

---

## Purpose

This standard governs how {Brand Name} uses illustration across communications, interfaces, presentations, campaigns, reports, and generated assets.

It defines:

- The approved illustration system
- Semantic roles and type pairings
- Subject-matter rules
- Colour-token use
- Accessibility and contrast requirements
- Motion safety
- Prompt and output governance
- Provenance requirements
- Repository and fallback behaviour

The goal is not simply to make illustrations look consistent. It is to ensure every illustration is purposeful, accessible, traceable, and recognisably part of the brand system.

---

## How to interpret this policy

This policy has six layers:

1. Illustration principles define the intended visual character.
2. Illustration system rules define the approved visual grammar.
3. Semantic roles define what each illustration is meant to do.
4. Repository and provenance rules define where assets come from and how they are audited.
5. Classifiers evaluate judgement-based risks such as semantic fit, brand alignment, complexity, originality, and inclusion.
6. Execution rules determine whether an asset passes, warns, or fails.

The YAML front matter is the machine-executable layer. This Markdown body is the human-readable guidance layer. Where they conflict, the YAML governs.

If this policy conflicts with a higher-priority legal, regulatory, safety, accessibility, colour, or typography policy, the higher-priority policy wins.

If this policy conflicts with an application-specific exception declared in the YAML, the declared exception applies.

---

## Illustration principles

### {Illustration Principle 1}

{Explain illustration principle 1 in plain language.}

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

### {Illustration Principle 2}

{Explain illustration principle 2 in plain language.}

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

### {Illustration Principle 3}

{Explain illustration principle 3 in plain language.}

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

## Illustration system

The illustration system is the source of truth for approved visual expression.

Use it to determine:

1. Which illustration type is appropriate.
2. Which semantic role the asset serves.
3. Which style attributes must be present.
4. Which colour tokens may be used.
5. Which subject matter is allowed, restricted, or forbidden.
6. Whether the asset is safe, accessible, and ready to publish.

Illustration should not be treated as decorative filler unless the asset is explicitly marked as decorative and approved for that role.

---

## Semantic roles

Every governed illustration needs a declared semantic role.

Examples include:

- Explaining a concept
- Supporting a data story
- Guiding a process
- Giving emotional reassurance
- Showing product context
- Expressing a campaign idea
- Prompting an action

The semantic role must match the illustration type. For example, a `background_illustration` can support mood or decorative context, but it should not carry a critical claim. A `data_illustration` may support evidence, but it must not invent or imply proof that is not declared elsewhere.

---

## Colour, contrast, and print

Illustrations must use approved colour tokens from the pinned Colour Standard.

If an illustration contains text overlay, contrast is checked against the lowest-contrast point under the text bounding box. This is especially important for gradients, shadows, textures, and image-like backgrounds. A single sampled colour is not enough.

For print and packaging contexts, CMYK values are required. If CMYK values are missing, the engine may attempt to materialize them from approved tokens using ISO Coated v2 (ECI). If materialization fails or produces out-of-gamut values, the asset fails and requires print review.

---

## Motion safety

Animated illustrations must respect motion safety requirements.

They must not include:

- Rapid flashes
- Rapid zooms or pans
- Strong parallax
- Large-area motion above the declared threshold
- Loop jumps that create sudden discontinuity

A reduced-motion variant is required for animated illustration assets.

---

## Prompt and output governance

AI-generated and AI-assisted illustrations must include generation provenance and prompt metadata.

The prompt must not imitate competitors, living artists, copyrighted characters, or third-party campaign styles.

The output must match the prompt and declared metadata. If the prompt asks for one style, subject, semantic role, or colour-token set but the generated asset produces another, the asset fails prompt-output fidelity.

---

## Exception model

Exceptions are allowed only when declared in the YAML `exceptions.declared` block. Undeclared exceptions hard fail.

Four exceptions are pre-declared in this template:

Legacy asset exception: allows limited use of previously approved assets until retirement, provided they do not fail legal, accessibility, inclusion, or safety checks.

Campaign adaptation exception: allows campaign-specific visual adaptation when traceable to approved visual principles and colour tokens.

Legally approved restricted subject exception: allows restricted subjects only when explicit approval is attached.

Decorative background exception: allows alt text to be omitted only when the asset is purely decorative and marked as such.

---

## Exemplars

Each exemplar below is referenced in the YAML by its `active_exemplar_key`. Validators use authoritative repository exemplars retrieved via `exemplars.storage.retrieval`, not the Markdown copies shown here.

### {exemplar-name}

Key: `{brand_id}.standards.visual-identity.illustration.exemplar.{example_key}`

"{Approved exemplar description or copy.}"

Why it works:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Anti-exemplars

Anti-exemplars are negative reference material for human review only. They are excluded from all deterministic and heuristic validation. They must not be scored, repaired, or published.

### {anti-exemplar-name}

"{Anti-exemplar description.}"

Why it fails:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Validator interpretation notes

### Deterministic checks

Implement with direct pattern logic, structural checks, measurable thresholds, reference resolution, colour-token validation, and declared metadata checks. Run in the order declared in `execution.rule_execution_order.phase_1_deterministic`.

Covered by: D001, D002, D003, D004, D005, D006, D007, D008, D009, D010, D011, D012, D013, D014, D015, D016, D017.

### Heuristic checks

Implement using classifiers, scorers, or model-based evaluators. Run only after deterministic checks pass or produce soft warnings only. Every heuristic check must return both a score and a reason. Never return a score alone.

Covered by: H001, H002, H003, H004, H005, H006, H007.

### Scale note for heuristic scores

All heuristic rules use a 0.0-1.0 scale. Do not mix 0-100 percentage scoring with 0.0-1.0 classifier scoring.

### Complexity scoring

Visual complexity must be diagnosed, not merely scored. The validator should return the dominant complexity source and a recommended simplification zone. Designers should know whether to reduce background density, path count, colour count, focal points, or text-overlay interference.

### Prompt-output fidelity

Prompt-output fidelity checks whether the generated visual matches the approved style reference, declared subject, declared purpose, semantic role, colour tokens, and composition requirements. A prompt can pass while the output fails. The output is what gets published, so the output must be checked.

### Repository fallback

If the illustration repository is temporarily unavailable, a cached pass may be used only for previously validated assets and only within the declared cache window. Cache usage must be logged and revalidated when the repository recovers.

### Pixel snapping

Pixel snapping should use the declared tolerance threshold. This avoids false failures from floating-point artefacts in SVG exports from tools such as Figma or Illustrator.

### Exemplar retrieval

Exemplars required by H005 are fetched via the protocol declared in `exemplars.storage.retrieval`. If retrieval fails, H005 is skipped with a soft warning per `fallback_behaviour`.

### Retry behaviour

On deterministic failure: repair at asset or metadata level, then re-evaluate before proceeding.

On heuristic failure: repair at asset or prompt level, then re-evaluate before proceeding.

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
- All dependency refs point to approved standard versions.
- All rule IDs referenced in `execution.rule_execution_order` exist in `rules`.
- All exception IDs referenced in `unless_exception` blocks exist in `exceptions.declared`.
- All illustration asset refs resolve or have permitted cached-pass status.
- All colour token refs resolve through the pinned Colour Standard.
- All CMYK values are present or materialized for print and packaging.
- All text-overlay contrast checks use the worst-case point under the text bounding box.
- All semantic roles match allowed type pairings.
- No circular asset or dependency references exist.
- No orphaned illustration tokens remain without mapping or deprecation.
- All AI-generated or AI-assisted assets include prompt metadata and provenance.
- Prompt-output fidelity has passed for generated assets.
- Motion safety thresholds pass for animated illustration.
- Restricted subjects have required approval.
- Positive exemplars do not violate deterministic rules.
- Anti-exemplars are explicitly excluded from validation.
- All channel and content-type values in rules and `decision_policy` match `scope.applies_to`.
- The telemetry schema is valid and the policy key and version are attached to every validation report.