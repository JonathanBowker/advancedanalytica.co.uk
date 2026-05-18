---
# =============================================================================
# BRANDO® MOTION STANDARD TEMPLATE
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
#
# Use block scalar style (| or >) for prose-heavy fields such as rationale,
# notes, long descriptions, remediation guidance, and classifier descriptions.
# =============================================================================

# -----------------------------------------------------------------------------
# DOCUMENT IDENTITY
# -----------------------------------------------------------------------------
# Required. Stable, globally unique identifier for this policy.
# Recommended pattern: {brand_id}.standards.motion-identity.motion
id: "{brand_id}.standards.motion-identity.motion"

# Required. Usually mirrors id. Use as the stable lookup key in policy
# repositories, MCP servers, APIs, and audit logs.
key: "{brand_id}.standards.motion-identity.motion"

# Required. Human-readable title.
title: "{Brand Name} Motion"

# Required. Short description used in repositories, UIs, search, and audit logs.
description: |
  Core motion standard governing animation, transitions, choreography, temporal
  colour behaviour, accessibility, performance, sonic alignment, and AI-generated
  motion fidelity across {Brand Name} communications and product experiences.

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
category: motion_identity

# Required. Subcategory within the category. Use snake_case for controlled terms.
subcategory: motion

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
  # Required once lifecycle_state is approved or published.
  - "{Approving Team or Role}"

# -----------------------------------------------------------------------------
# SCHEMA METADATA
# -----------------------------------------------------------------------------
schema:
  # Required. Schema class used by Brando.
  type: BrandMotionStandard

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
  client_term: Motion
  canonical_term: Motion Identity
  policy_label: Motion Standard
  rationale: |
    {Explain how the client names motion guidance and how Brando should map it
    into the canonical governance model. canonical_term maps to category;
    policy_label maps to subcategory. This field does not affect enforcement logic.}

# -----------------------------------------------------------------------------
# SCOPE
# -----------------------------------------------------------------------------
# Required. Defines when this policy applies.
scope:
  applies_to:
    # Required. Distribution or rendering environments.
    # Do not mix channels with content types in this list.
    channels:
      - website
      - product_ui
      - mobile_app
      - social_video
      - paid_social
      - newsletter
      - presentation
      - pitch_deck
      - event_screen
      - digital_ooh
      - broadcast
      - video_platform

    # Required. Types of motion assets, behaviours, or components governed by this policy.
    # Composite outputs such as social videos, product demos, and event films should
    # be decomposed into governed motion fields before rule execution.
    content_types:
      - logo_animation
      - ui_transition
      - micro_interaction
      - loading_animation
      - progress_animation
      - state_change_animation
      - hero_motion
      - ambient_background_motion
      - animated_icon
      - animated_illustration
      - kinetic_typography
      - social_video
      - explainer_motion
      - product_demo
      - title_card
      - lower_third
      - end_card
      - transition_system
      - motion_token
      - choreography_sequence

    # Recommended. Audience or persona types for motion adaptation.
    audiences:
      - marketing_manager
      - content_creator
      - social_media
      - executive_communications
      - product_designer
      - motion_designer
      - developer
      - accessibility_reviewer
      - new_hire
      - ai_agent

    # Recommended. Zones within motion assets.
    # Useful for checking foreground, background, audio, overlays, metadata, and legal content.
    content_zones:
      - rendered_motion
      - foreground_motion
      - background_motion
      - logo_area
      - text_overlay
      - cta_area
      - product_ui_area
      - safe_area
      - social_overlay_area
      - audio_sync
      - metadata
      - legal_disclaimer

  excludes:
    content_types:
      - legal_disclaimer
      - regulated_disclosure
      - procurement_template
      - static_image_without_motion

  notes:
    - Applies to generated, edited, rendered, exported, and tokenized motion assets.
    - Applies to motion prompts, motion tokens, animation source files, and rendered outputs.
    - Applies to brand motion in marketing, product UI, social content, presentation, event, and video contexts.
    - Does not apply to legally required motion unless downstream legal or accessibility policy explicitly says so.
    - User accessibility preferences such as reduced motion must override expressive motion defaults.

# -----------------------------------------------------------------------------
# POLICY PRECEDENCE
# -----------------------------------------------------------------------------
policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.accessibility
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - "{brand_id}.standards.motion-identity.motion"
    - "{brand_id}.standards.visual-identity.logo"
    - "{brand_id}.standards.visual-identity.layout"
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.audio-identity.sound"
    - "{brand_id}.applications.*"
    - "{brand_id}.campaigns.*"

  conflict_resolution:
    # Allowed values:
    # - higher_priority_wins | most_restrictive_wins | explicit_exception_required
    mode: most_restrictive_wins
    notes:
      - Safety and accessibility rules override brand expressiveness.
      - Motion must not compromise usability, comprehension, legibility, or user comfort.
      - Logo, colour, layout, and audio standards continue to govern their respective tokens inside motion assets.
      - In collisions between expressive motion and performance, accessibility, or comprehension, the more restrictive rule wins.
      - If motion creates cognitive load that prevents comprehension, the motion must be simplified, slowed, reduced, or removed.
      - Exceptions must be explicit, machine-readable, and logged.

# -----------------------------------------------------------------------------
# INHERITANCE
# -----------------------------------------------------------------------------
inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
    - "{brand_id}.standards.visual-identity.logo"
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.visual-identity.layout"
  may_be_overridden_by:
    - "{brand_id}.applications.product-ui"
    - "{brand_id}.applications.social-video"
    - "{brand_id}.applications.event-screen"
    - "{brand_id}.campaigns.*"
    - "{brand_id}.legal.*"
    - "{brand_id}.market.*"

# -----------------------------------------------------------------------------
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
    include_resolved_motion_tokens: true
    include_resolved_accessibility_rules: true
    include_resolved_performance_budget: true
    include_resolved_audio_standard_ref: true

# -----------------------------------------------------------------------------
# MOTION PRINCIPLES
# -----------------------------------------------------------------------------
# Required. Three to five principles is usually enough.
# Keep descriptions to one clear sentence each.
principles:
  required:
    - "{motion_principle_1}"
    - "{motion_principle_2}"
    - "{motion_principle_3}"
  definitions:
    "{motion_principle_1}":
      description: "{Describe motion principle 1 in one clear sentence.}"
    "{motion_principle_2}":
      description: "{Describe motion principle 2 in one clear sentence.}"
    "{motion_principle_3}":
      description: "{Describe motion principle 3 in one clear sentence.}"

# -----------------------------------------------------------------------------
# MOTION POLICY
# -----------------------------------------------------------------------------
# Required. Defines what brand motion must do.
motion_policy:
  objectives:
    required:
      - guide_attention
      - clarify_state_change
      - reinforce_brand_character
      - improve_comprehension
      - support_accessibility
      - preserve_performance

  motion_characteristics:
    required:
      - purposeful
      - restrained
      - responsive
      - legible
      - accessible
      - brand_consistent
    discouraged:
      - gratuitous_motion
      - excessive_bounce
      - excessive_overshoot
      - chaotic_timing
      - distracting_background_motion
      - unsafe_luminance_change
      - performance_heavy_animation

  attention_policy:
    default_required:
      - motion_supports_primary_task
      - motion_does_not_compete_with_cta
      - motion_has_clear_start_and_end_state
    default_forbidden:
      - task_blocking_loop
      - nonessential_autoplay_motion_without_controls
      - decorative_motion_that_reduces_readability
    notes:
      - Motion should explain, guide, or enrich. It should not compete for attention.
      - Background motion must never distract from required text, CTAs, forms, or primary product tasks.
      - Infinite looping is allowed only when the loop is subtle, nonessential, and pausable where required.

  temporal_behaviour:
    default_required:
      - ease_in_out_or_brand_approved_easing
      - stable_final_state
      - reduced_motion_variant
    default_forbidden:
      - abrupt_unexplained_state_change
      - rapid_luminance_flash
      - large_field_motion_without_reduced_variant
      - uncontrolled_parallax

# -----------------------------------------------------------------------------
# MOTION TOKENS
# -----------------------------------------------------------------------------
# Required. Defines the approved token system for timing, easing, choreography,
# temporal colour, reduced motion, and performance.
motion_tokens:
  duration:
    # Functional micro-interactions should usually sit between 150ms and 300ms.
    # 500ms is a hard ceiling, not a target.
    recommended_functional_micro_interaction_ms: 200
    recommended_component_transition_ms: 300
    maximum_ui_transition_ms: 500
    maximum_logo_animation_ms: 2000
    maximum_social_intro_ms: 3000
    maximum_loop_duration_ms: 8000

    token_values:
      instant: 0
      fast: 150
      standard: 250
      deliberate: 400
      expressive: 750
      hero: 1200

  easing:
    approved:
      - id: standard_ease
        cubic_bezier: [0.2, 0.0, 0.0, 1.0]
        use_for:
          - ui_transition
          - micro_interaction
          - state_change_animation
      - id: entrance_ease
        cubic_bezier: [0.0, 0.0, 0.2, 1.0]
        use_for:
          - hero_motion
          - kinetic_typography
          - title_card
      - id: exit_ease
        cubic_bezier: [0.4, 0.0, 1.0, 1.0]
        use_for:
          - transition_system
          - end_card

    forbidden:
      - extreme_elastic
      - uncontrolled_bounce
      - strobe_cut
      - chaotic_random_motion

  choreography:
    approved_sequence_logic:
      - top_down
      - left_to_right
      - inside_out
      - foreground_then_support
      - primary_to_secondary
      - parent_then_child
      - content_then_cta

    default_sequence_logic: primary_to_secondary

    stagger:
      preferred: true
      minimum_stagger_ms: 40
      maximum_stagger_ms: 160
      maximum_staggered_items_without_grouping: 7

    sequence_requirements:
      - Primary message must become legible before secondary decorative motion peaks.
      - CTA motion must not begin before the CTA is visible and readable.
      - Logo animation must resolve before partner, campaign, or secondary marks appear unless a lockup standard declares otherwise.

  temporal_colour:
    # Temporal colour governs luminance and colour changes over time.
    # This is distinct from static colour contrast.
    colour_standard_ref: "{brand_id}.standards.visual-identity.colour:^1.0.0"

    temporal_contrast_metric:
      luminance_window_ms: 100
      maximum_luminance_delta_ratio_per_window: 0.25
      check_mode: frame_to_frame_and_foreground_background
      notes:
        - Check both frame-to-frame luminance deltas and foreground/background deltas over time.
        - A luminance change greater than 25 percent within a 100ms window is treated as unsafe unless explicitly allowed by a higher-priority accessibility policy.
        - Worst-case contrast sampling must be used for text overlays, CTA labels, and logo marks over moving backgrounds.

    gradients_and_moving_backgrounds:
      contrast_resolution: worst_case_sample
      sample_scope: text_or_logo_bounding_box
      required_logic: >
        When checking moving gradients, video, or animated backgrounds, contrast
        must be validated against the lowest-contrast point of the area covered
        by the text, logo, or CTA bounding box. Do not use average contrast.

  reduced_motion:
    required: true
    respect_user_preference: true
    user_preference_sources:
      - prefers_reduced_motion
      - operating_system_accessibility_setting
      - application_accessibility_setting

    allowed_reduced_motion_substitutions:
      - opacity_fade
      - instant_state_change
      - shortened_translation
      - static_keyframe
      - non_motion_highlight

    forbidden_reduced_motion_substitutions:
      - parallax
      - zoom_burst
      - rotating_camera
      - large_field_slide
      - flashing_state_change

  performance_budget:
    default:
      maximum_lottie_kb: 500
      maximum_svg_path_count: 500
      maximum_webgl_draw_calls: 100
      maximum_video_bitrate_mbps: 8
      minimum_runtime_fps: 55
      maximum_main_thread_blocking_ms: 100
      maximum_dropped_frame_ratio: 0.05

    mobile:
      maximum_lottie_kb: 350
      maximum_svg_path_count: 350
      maximum_webgl_draw_calls: 60
      maximum_video_bitrate_mbps: 4
      minimum_runtime_fps: 55
      maximum_main_thread_blocking_ms: 75
      maximum_dropped_frame_ratio: 0.05

# -----------------------------------------------------------------------------
# MOTION ASSET REPOSITORY
# -----------------------------------------------------------------------------
# Recommended. Defines how approved motion tokens and source assets are retrieved.
motion_asset_repository:
  storage:
    mode: referenced
    source_key: "{brand_id}.standards.motion-identity.motion"
    section: motion_assets
    load_at_validation: true
    retrieval:
      protocol: brando_policy_repo
      base_path: /policies/motion/
      key_format: "<motion_asset_key>.json"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 300

  fallback_behaviour:
    if_repository_unavailable: cached_pass_with_warning
    cached_pass_max_age_seconds: 604800
    if_no_cache_available: hard_fail
    warning_code: motion_repository_unavailable_cached_policy_used
    notes:
      - Infrastructure outages must not paralyse the creative pipeline when a recent known-good cache exists.
      - Cached pass must always be logged as a warning.
      - Cached pass is not allowed if the cached policy is older than cached_pass_max_age_seconds.
      - Cached pass is not allowed for safety-critical rules D006, D007, D010, or D018.

  active_motion_asset_keys:
    - "{brand_id}.standards.motion-identity.motion.asset.{motion_asset_key_1}"
    - "{brand_id}.standards.motion-identity.motion.asset.{motion_asset_key_2}"

# -----------------------------------------------------------------------------
# GENERATION POLICY
# -----------------------------------------------------------------------------
# Recommended for AI-generated or AI-assisted motion.
generation_policy:
  prompt_requirements:
    approved_prompt_fields:
      - motion_type
      - semantic_role
      - content_type
      - audience
      - channel
      - duration_token
      - easing_token
      - choreography_logic
      - reduced_motion_variant
      - colour_token_refs
      - audio_ref
      - safety_constraints

    forbidden_prompt_patterns:
      - in_the_style_of_living_creator
      - imitate_named_motion_designer
      - copy_specific_ad_campaign
      - strobe_effect
      - aggressive_camera_shake
      - chaotic_flash
      - hyperactive_transition

  prompt_output_fidelity:
    required: true
    comparison_method: prompt_embedding_to_rendered_motion_description_embedding
    minimum_fidelity_score: 0.80
    notes:
      - A compliant prompt does not guarantee a compliant output.
      - Rendered motion must be checked against the declared prompt intent, motion type, semantic role, choreography, and safety constraints.
      - If prompt-output fidelity fails, the output must be repaired or regenerated.

# -----------------------------------------------------------------------------
# SONIC ALIGNMENT POLICY
# -----------------------------------------------------------------------------
# Optional but recommended when motion has synchronized audio.
sonic_alignment_policy:
  audio_standard_ref: "{brand_id}.standards.audio-identity.sound:^1.0.0"
  audio_required_to_resolve_when_present: true
  allow_silent_motion: true
  disallow_unapproved_audio: true
  sync_tolerance_ms: 40
  notes:
    - Motion with sound is a combined brand asset.
    - Audio must resolve through the declared Audio Standard when an audio track, sonic logo, whoosh, ping, voice cue, or sound effect is present.
    - If the Audio Standard is not available and audio is present, validation must warn or fail according to D018.

# -----------------------------------------------------------------------------
# SEMANTIC TYPE PAIRINGS
# -----------------------------------------------------------------------------
# Required. Prevents logically inconsistent motion type and role pairings.
semantic_type_pairings:
  allowed:
    logo_animation:
      - brand_reveal
      - brand_signature
      - transition_marker
    ui_transition:
      - state_change
      - orientation
      - continuity
      - feedback
    micro_interaction:
      - confirmation
      - affordance
      - feedback
      - progress
    loading_animation:
      - progress
      - waiting_state
      - system_feedback
    hero_motion:
      - storytelling
      - mood_setting
      - proposition_support
    ambient_background_motion:
      - atmosphere
      - depth
      - contextual_support
    animated_icon:
      - instruction
      - navigation
      - feedback
      - emphasis
    kinetic_typography:
      - message_emphasis
      - reveal
      - narrative_pacing
    product_demo:
      - explanation
      - feature_highlight
      - workflow_demonstration
    social_video:
      - campaign_story
      - announcement
      - educational_snippet

  forbidden_pairs:
    - content_type: logo_animation
      semantic_role: error
      reason: Logo animation must not be associated with failure states.
    - content_type: logo_animation
      semantic_role: warning
      reason: Logo animation must not be associated with warning states.
    - content_type: ambient_background_motion
      semantic_role: primary_cta
      reason: Background motion must not carry required action semantics.
    - content_type: loading_animation
      semantic_role: celebration
      reason: Waiting states must not imply completed success.
    - content_type: micro_interaction
      semantic_role: brand_campaign_story
      reason: Micro-interactions should clarify product behaviour, not carry full campaign narratives.

# -----------------------------------------------------------------------------
# REQUIRED ELEMENTS
# -----------------------------------------------------------------------------
required_elements:
  default:
    - approved_motion_token_reference
    - content_type
    - semantic_role
    - duration_token
    - easing_token
    - reduced_motion_variant
    - accessibility_check
    - performance_budget_check

  conditional:
    - id: sonic_alignment_for_audio_motion
      required_when:
        audio_track_present: true
    - id: temporal_colour_check_for_colour_transition
      required_when:
        colour_transition_present: true
    - id: logo_standard_check_for_logo_animation
      required_when:
        content_type: logo_animation
    - id: safe_area_check_for_social_motion
      required_when:
        channel:
          - social_video
          - paid_social
    - id: prompt_output_fidelity_for_ai_generated_motion
      required_when:
        generated_by_ai: true

# -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
field_applicability:
  logo_animation:
    duration:
      target_max_ms: 1500
      hard_max_ms: 2000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true

  ui_transition:
    duration:
      target_max_ms: 300
      hard_max_ms: 500
    reduced_motion_required: true
    performance_budget: mobile
    audio_allowed: false

  micro_interaction:
    duration:
      target_max_ms: 200
      hard_max_ms: 300
    reduced_motion_required: true
    performance_budget: mobile
    audio_allowed: false

  loading_animation:
    duration:
      target_max_ms: 1200
      hard_max_ms: 8000
    reduced_motion_required: true
    performance_budget: mobile
    audio_allowed: false
    loop_allowed: true

  progress_animation:
    duration:
      target_max_ms: 1200
      hard_max_ms: 8000
    reduced_motion_required: true
    performance_budget: mobile
    audio_allowed: false
    loop_allowed: true

  state_change_animation:
    duration:
      target_max_ms: 250
      hard_max_ms: 500
    reduced_motion_required: true
    performance_budget: mobile
    audio_allowed: false

  hero_motion:
    duration:
      target_max_ms: 2500
      hard_max_ms: 5000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true

  ambient_background_motion:
    duration:
      target_max_ms: 8000
      hard_max_ms: 15000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: false
    loop_allowed: true
    maximum_distraction_score: 0.35

  animated_icon:
    duration:
      target_max_ms: 600
      hard_max_ms: 1200
    reduced_motion_required: true
    performance_budget: mobile
    audio_allowed: false

  animated_illustration:
    duration:
      target_max_ms: 3000
      hard_max_ms: 6000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true

  kinetic_typography:
    duration:
      target_max_ms: 2000
      hard_max_ms: 4000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true
    legibility_required: true

  social_video:
    duration:
      target_max_ms: 15000
      hard_max_ms: 60000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true
    safe_area_required: true

  explainer_motion:
    duration:
      target_max_ms: 30000
      hard_max_ms: 180000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true

  product_demo:
    duration:
      target_max_ms: 30000
      hard_max_ms: 180000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true

  title_card:
    duration:
      target_max_ms: 3000
      hard_max_ms: 5000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true

  lower_third:
    duration:
      target_max_ms: 5000
      hard_max_ms: 8000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: false
    legibility_required: true

  end_card:
    duration:
      target_max_ms: 5000
      hard_max_ms: 10000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true
    cta_required: true

  transition_system:
    duration:
      target_max_ms: 600
      hard_max_ms: 1200
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true

  motion_token:
    duration:
      target_max_ms: 1200
      hard_max_ms: 2000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: false

  choreography_sequence:
    duration:
      target_max_ms: 3000
      hard_max_ms: 8000
    reduced_motion_required: true
    performance_budget: default
    audio_allowed: true

# -----------------------------------------------------------------------------
# PERSONA PROFILES
# -----------------------------------------------------------------------------
persona_profiles:
  marketing_manager:
    motion_adjustment: brand_expression_and_campaign_effectiveness
  content_creator:
    motion_adjustment: template_safe_and_channel_native
  social_media:
    motion_adjustment: short_form_safe_area_aware
  executive_communications:
    motion_adjustment: restrained_and_high_credibility
  product_designer:
    motion_adjustment: functional_responsive_and_accessible
  motion_designer:
    motion_adjustment: expressive_within_token_system
  developer:
    motion_adjustment: performance_and_token_implementation
  accessibility_reviewer:
    motion_adjustment: safety_first
  new_hire:
    motion_adjustment: explanatory
  ai_agent:
    motion_adjustment: strict_constraint_enforcement

# -----------------------------------------------------------------------------
# EXCEPTIONS
# -----------------------------------------------------------------------------
exceptions:
  undeclared_exception_behaviour: hard_fail
  validation:
    exception_must_be_declared_in_policy: true
    exception_must_match_content_context: true
    log_all_exception_activations: true

  declared:
    - id: reduced_motion_user_preference_exception
      description: |
        When a user has reduced motion enabled, expressive motion may be replaced
        by an approved reduced-motion variant even if the default brand animation
        would otherwise be preferred.
      when:
        user_preference:
          - prefers_reduced_motion
      override:
        enforcement_mode: reduced_motion_required
        requirements:
          - use_approved_reduced_motion_variant
          - skip_nonessential_large_field_motion
          - preserve_information_equivalence

    - id: legal_text_exception
      description: |
        Legal or regulated motion, disclaimers, or mandatory warnings may override
        expressive motion preferences where required by law or compliance.
      when:
        policy_context:
          higher_priority_policy_matches:
            - "{brand_id}.legal.*"
            - global.regulatory
      override:
        enforcement_mode: defer_to_higher_policy

    - id: emergency_alert_exception
      description: |
        Emergency or safety-critical system alerts may use stronger motion cues
        when required for user safety, provided seizure and vestibular safety
        thresholds are still respected.
      when:
        semantic_role:
          - emergency_alert
          - safety_critical_warning
      override:
        enforcement_mode: safety_alert_motion_allowed
        requirements:
          - accessibility_thresholds_must_still_pass
          - motion_must_be_pausable_where_required
          - telemetry_required

    - id: repository_cached_pass_exception
      description: |
        A recent cached motion policy may be used when the motion repository is
        temporarily unavailable, except for safety-critical rules.
      when:
        repository_status:
          - unavailable
        cache_status:
          - fresh_cache_available
      override:
        enforcement_mode: cached_pass_with_warning
        skip_rules: []
        requirements:
          - cache_age_must_be_within_limit
          - warning_must_be_logged
          - safety_rules_must_still_execute

# -----------------------------------------------------------------------------
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
    source_key: "{brand_id}.standards.motion-identity.motion"
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
      - H004

  active_exemplar_keys:
    - "{brand_id}.standards.motion-identity.motion.exemplar.{example_key_1}"
    - "{brand_id}.standards.motion-identity.motion.exemplar.{example_key_2}"

  source_contexts:
    channels:
      - website
      - product_ui
      - social_video
      - presentation
      - event_screen
    content_types:
      - logo_animation
      - ui_transition
      - micro_interaction
      - hero_motion
      - social_video
      - animated_icon
      - kinetic_typography

# -----------------------------------------------------------------------------
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

# -----------------------------------------------------------------------------
# DOCUMENT SELF-VALIDATION
# -----------------------------------------------------------------------------
document_self_validation:
  validate_yaml_structure: true
  validate_authoritative_positive_exemplars: true
  validate_motion_token_references: true
  validate_semantic_type_pairings: true
  validate_repository_cache_policy: true
  validate_audio_standard_reference_when_audio_present: true
  validate_choreography_sequence_references: true
  validate_performance_budget_mapping: true
  validate_no_circular_motion_token_references: true

  exclude_markdown_guidance: true
  exclude_change_log: true
  exclude_comments: true
  exclude_anti_exemplars: true
  exclude_markdown_exemplar_copies: true

  notes:
    - Validate all duration, easing, choreography, colour, audio, and reduced-motion token references.
    - Validate that all motion assets resolve to declared repository keys or approved inline tokens.
    - Validate that every content_type and semantic_role pairing is allowed or explicitly excepted.
    - Validate that all motion repository fallback behaviour is warning-logged.
    - Validate that all audio-bearing assets resolve through sonic_alignment_policy.audio_standard_ref.
    - YAML comments are excluded as they are stripped before rule execution.

# -----------------------------------------------------------------------------
# CLASSIFIERS
# -----------------------------------------------------------------------------
classifiers:
  motion_semantic_fit_classifier:
    description: |
      Scores whether the motion behaviour, rhythm, energy, duration, and visual
      sequencing fit the declared content type, semantic role, audience, channel,
      and brand principles. The classifier should return the top three nearest
      semantic neighbours from the approved motion asset set when fit is weak.
    output:
      type: object
      properties:
        semantic_fit_score:
          type: number
        nearest_semantic_neighbours:
          type: array
          items:
            type: object
            properties:
              asset_key:
                type: string
              semantic_role:
                type: string
              similarity_score:
                type: number
        reason:
          type: string
    used_by_rules:
      - H001

  motion_accessibility_risk_classifier:
    description: |
      Detects motion accessibility risk, including vestibular discomfort,
      large-field motion, unsafe parallax, rapid luminance changes, flash risk,
      spatial disorientation, and task-blocking motion. The classifier must return
      timecodes, risk regions, and suggested repairs rather than only a score.
    output:
      type: object
      properties:
        accessibility_risk_score:
          type: number
        risk_type:
          type: array
          items:
            type: string
        failing_timecodes:
          type: array
          items:
            type: object
            properties:
              start_ms:
                type: integer
              end_ms:
                type: integer
              reason:
                type: string
        risk_regions:
          type: array
          items:
            type: object
            properties:
              x:
                type: number
              y:
                type: number
              width:
                type: number
              height:
                type: number
              risk_type:
                type: string
        luminance_windows:
          type: array
          items:
            type: object
            properties:
              start_ms:
                type: integer
              end_ms:
                type: integer
              delta_ratio:
                type: number
              threshold:
                type: number
        motion_vectors:
          type: array
          items:
            type: object
            properties:
              start_ms:
                type: integer
              end_ms:
                type: integer
              direction:
                type: string
              magnitude:
                type: number
        heatmap_ref:
          type: string
        suggested_repairs:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H002

  generic_motion_risk_classifier:
    description: |
      Scores whether the motion feels generic, stock-like, derivative, template-led,
      overused, or insufficiently distinctive for the brand.
    output:
      type: object
      properties:
        generic_motion_risk_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H003

  motion_exemplar_alignment_classifier:
    description: |
      Scores whether the motion aligns with approved motion exemplars in timing,
      energy, transitions, hierarchy, restraint, and brand character. Uses a
      normalized 0.0 to 1.0 scale.
    output:
      type: object
      properties:
        exemplar_alignment_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H004

  motion_distraction_classifier:
    description: |
      Scores whether motion competes with required content, CTAs, form completion,
      comprehension, or task performance. This classifier should identify the
      specific zones and timecodes where distraction occurs.
    output:
      type: object
      properties:
        distraction_score:
          type: number
        affected_zones:
          type: array
          items:
            type: string
        failing_timecodes:
          type: array
          items:
            type: object
            properties:
              start_ms:
                type: integer
              end_ms:
                type: integer
              reason:
                type: string
        reason:
          type: string
    used_by_rules:
      - H005

  prompt_output_fidelity_classifier:
    description: |
      Scores whether a rendered or exported motion asset matches the declared
      generation prompt, motion token references, choreography, duration, easing,
      content type, semantic role, and safety constraints.
    output:
      type: object
      properties:
        prompt_output_fidelity_score:
          type: number
        mismatched_prompt_fields:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H006

  motion_recognition_classifier:
    description: |
      Scores whether required brand, product, logo, or interface meaning remains
      recognizable during and after animation, especially at small sizes, compressed
      video settings, and short viewing windows.
    output:
      type: object
      properties:
        recognition_score:
          type: number
        failing_timecodes:
          type: array
          items:
            type: object
            properties:
              start_ms:
                type: integer
              end_ms:
                type: integer
              reason:
                type: string
        suggested_variant:
          type: string
        reason:
          type: string
    used_by_rules:
      - H007

  motion_emotional_fit_classifier:
    description: |
      Scores whether the emotional tone of the motion fits the brand, context,
      message, and user state. For example, warning states should not use playful
      celebratory motion, and logo animations should not feel chaotic or aggressive.
    output:
      type: object
      properties:
        emotional_fit_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H008

# -----------------------------------------------------------------------------
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

    notes: |
      Run all deterministic rules first. Only proceed to heuristic rules if all
      deterministic rules pass or produce soft warnings only. Heuristic hard-fail
      rules follow the same retry and escalation behaviour as deterministic hard-fail
      rules. All heuristic scores use a normalized 0.0 to 1.0 scale.

  heuristic_decisioning:
    score_scale: normalized_float_0_to_1
    low_confidence_ignore_below: 0.60
    medium_confidence_warn_at_or_above: 0.60
    high_confidence_enforce_at_or_above: 0.85
    threshold_resolution:
      policy: per_rule_takes_precedence
      notes:
        - Where a rule declares its own threshold, that value governs for that rule.
        - Global heuristic_decisioning thresholds apply only where a rule does not declare its own threshold.
        - Do not use 0-100 percentage scores in this standard.
        - All classifier outputs must be normalized to 0.0-1.0 before aggregation or dashboard reporting.

  retry_strategy:
    mode: targeted_repair_then_regenerate
    repair_scope:
      deterministic_failures: token_keyframe_or_asset_level
      heuristic_failures: timecode_region_or_motion_asset_level
      breakpoint_failures: adjust_tokens_before_pattern_change
      pattern_change_required: regeneration_event
      after_two_failed_repairs: full_regeneration
    repair_instruction_format:
      include_violation_id: true
      include_failing_text: false
      include_failing_asset_ref: true
      include_failing_keyframes: true
      include_failing_timecodes: true
      include_failing_zones: true
      include_motion_token_refs: true
      include_performance_metrics: true
      include_accessibility_risk_regions: true
      include_remediation_action: true
      include_reduced_motion_variant: true
    sequence:
      - repair_deterministic_failures
      - re-evaluate
      - repair_heuristic_weaknesses
      - re-evaluate
      - regenerate_if_still_failing
    notes:
      - If D004 breakpoint failure occurs, first adjust spacing, scale, duration, or timing tokens.
      - Changing the entire motion pattern is a regeneration event, not a targeted repair.
      - For motion failures, telemetry must identify the relevant keyframes, timecodes, or token references.

  output_contract:
    must_pass:
      - no_hard_fail_rules
      - no_unresolved_safety_rules
      - no_unresolved_accessibility_rules
    may_pass_with_warnings:
      - soft_warn_only
      - cached_repository_pass_with_warning
      - cmyk_or_colour_materialization_warning
    must_block:
      - any_hard_fail_after_max_retries
      - seizure_flash_violation
      - vestibular_safety_violation
      - temporal_colour_safety_violation
      - missing_reduced_motion_variant
      - audio_present_without_required_audio_standard_resolution
      - performance_budget_exceeded_after_repair

# -----------------------------------------------------------------------------
# RULES
# -----------------------------------------------------------------------------
rules:
  deterministic:
    - id: D001
      name: approved_motion_token_reference_missing
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - loading_animation
        - progress_animation
        - state_change_animation
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - transition_system
        - motion_token
        - choreography_sequence
      detect:
        method: structural_reference
        required_reference_types:
          - duration_token
          - easing_token
          - choreography_logic
        allowed_reference_sources:
          - motion_tokens.duration.token_values
          - motion_tokens.easing.approved.id
          - motion_tokens.choreography.approved_sequence_logic
      remediation:
        action: attach_to_approved_motion_tokens_or_rewrite_motion_spec

    - id: D002
      name: duration_out_of_bounds
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - loading_animation
        - progress_animation
        - state_change_animation
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - title_card
        - lower_third
        - end_card
        - transition_system
      detect:
        method: duration_check
        threshold_from_field_applicability: duration.hard_max_ms
        tolerance_ms: 1
        log_pre_tolerance_value: true
      remediation:
        action: adjust_duration_to_approved_token_or_retime_keyframes

    - id: D003
      name: easing_token_invalid
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - state_change_animation
        - hero_motion
        - animated_icon
        - kinetic_typography
        - transition_system
      detect:
        method: easing_token_check
        allowed_tokens_from: motion_tokens.easing.approved.id
        forbidden_tokens_from: motion_tokens.easing.forbidden
      remediation:
        action: replace_with_approved_easing_token

    - id: D004
      name: breakpoint_motion_variant_missing
      severity: hard_fail
      applies_to:
        - hero_motion
        - social_video
        - product_demo
        - kinetic_typography
        - logo_animation
        - title_card
        - end_card
      detect:
        method: responsive_variant_check
        required_variants:
          - desktop
          - tablet
          - mobile
          - reduced_motion
        repair_priority:
          - adjust_scale
          - adjust_spacing
          - adjust_duration
          - simplify_choreography
          - switch_pattern_as_regeneration_event
      remediation:
        action: add_missing_variant_or_simplify_motion_for_breakpoint

    - id: D005
      name: semantic_type_pairing_invalid
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - loading_animation
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - kinetic_typography
        - product_demo
        - social_video
      detect:
        method: semantic_type_pairing_check
        allowed_pairs_from: semantic_type_pairings.allowed
        forbidden_pairs_from: semantic_type_pairings.forbidden_pairs
      remediation:
        action: select_allowed_semantic_role_or_change_motion_type

    - id: D006
      name: vestibular_safety_violation
      severity: hard_fail
      applies_to:
        - ui_transition
        - hero_motion
        - ambient_background_motion
        - social_video
        - explainer_motion
        - product_demo
        - animated_illustration
        - transition_system
      detect:
        method: vestibular_motion_check
        forbidden_motion:
          - uncontrolled_parallax
          - large_field_zoom
          - rapid_camera_rotation
          - aggressive_shake
          - continuous_full_screen_pan
        reduced_motion_variant_required: true
        risk_regions_required: true
      remediation:
        action: reduce_motion_intensity_or_use_reduced_motion_variant

    - id: D007
      name: seizure_flash_violation
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - hero_motion
        - social_video
        - explainer_motion
        - product_demo
        - kinetic_typography
        - transition_system
      detect:
        method: flash_frequency_and_luminance_check
        maximum_flashes_per_second: 3
        luminance_delta_window_from: motion_tokens.temporal_colour.temporal_contrast_metric
        risk_timecodes_required: true
        heatmap_required: true
      remediation:
        action: remove_flash_reduce_luminance_delta_or_extend_transition_duration

    - id: D008
      name: reduced_motion_variant_missing
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - loading_animation
        - progress_animation
        - state_change_animation
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - transition_system
      detect:
        method: reduced_motion_variant_check
        required_when_field_applicability: reduced_motion_required
        allowed_substitutions_from: motion_tokens.reduced_motion.allowed_reduced_motion_substitutions
      remediation:
        action: create_approved_reduced_motion_variant

    - id: D009
      name: keyframe_or_position_jitter_exceeds_tolerance
      severity: soft_warn
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - animated_icon
        - kinetic_typography
        - transition_system
      detect:
        method: keyframe_position_snap_check
        tolerance_px: 0.01
        log_pre_tolerance_value: true
        notes: |
          The pre-tolerance value must be logged. Repeated near-threshold offsets
          may indicate a design-tool export issue rather than a brand violation.
      remediation:
        action: snap_keyframes_to_pixel_or_token_grid

    - id: D010
      name: temporal_colour_transition_violation
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - title_card
        - lower_third
        - end_card
        - transition_system
      detect:
        method: temporal_luminance_contrast_check
        metric_from: motion_tokens.temporal_colour.temporal_contrast_metric
        worst_case_sampling_required: true
        sample_scope:
          - text_overlay
          - logo_area
          - cta_area
        remediation_warning_required_when_materialized: true
      remediation:
        action: reduce_luminance_delta_extend_duration_or_use_safer_colour_tokens

    - id: D011
      name: circular_reference_detected
      severity: hard_fail
      applies_to:
        - motion_token
        - choreography_sequence
        - transition_system
      detect:
        method: graph_cycle_check
        scope:
          - motion_tokens
          - motion_asset_repository
          - inheritance
          - resolution
      remediation:
        action: remove_cycle_or_replace_with_direct_token_reference

    - id: D012
      name: social_safe_area_overlay_collision
      severity: hard_fail
      applies_to:
        - social_video
        - paid_social
        - title_card
        - end_card
        - kinetic_typography
      detect:
        method: safe_area_collision_check
        channel_specific_safe_area_required: true
        dynamic_safe_area_sources:
          - platform_ui_overlay
          - caption_area
          - reaction_button_zone
          - profile_and_metadata_overlay
        required_zones:
          - text_overlay
          - cta_area
          - logo_area
      remediation:
        action: reposition_required_content_outside_dynamic_overlay_area

    - id: D013
      name: logo_motion_state_invalid
      severity: hard_fail
      applies_to:
        - logo_animation
      detect:
        method: semantic_pair_and_logo_standard_check
        logo_standard_ref: "{brand_id}.standards.visual-identity.logo:^1.0.0"
        forbidden_semantic_roles:
          - error
          - warning
          - failure
          - destructive_action
      remediation:
        action: replace_with_approved_logo_motion_role_or_static_logo_variant

    - id: D014
      name: orphaned_motion_token
      severity: soft_warn
      applies_to:
        - motion_token
      detect:
        method: orphaned_asset_check
        repository_source: motion_asset_repository.active_motion_asset_keys
        must_be_referenced_by:
          - motion_tokens
          - exemplars.active_exemplar_keys
          - field_applicability
          - semantic_type_pairings
      remediation:
        action: map_token_to_active_use_or_archive_motion_token

    - id: D016
      name: motion_repository_unavailable_without_valid_cache
      severity: hard_fail
      applies_to:
        - motion_token
        - choreography_sequence
        - transition_system
      detect:
        method: repository_availability_check
        repository: motion_asset_repository.storage.retrieval
        fallback_from: motion_asset_repository.fallback_behaviour
        safety_rules_excluded_from_cached_pass:
          - D006
          - D007
          - D010
          - D018
      remediation:
        action: restore_repository_or_use_valid_cached_policy_with_warning

    - id: D017
      name: performance_payload_budget_exceeded
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - loading_animation
        - progress_animation
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - transition_system
      detect:
        method: performance_budget_check
        budget_from: motion_tokens.performance_budget
        metrics:
          - lottie_kb
          - svg_path_count
          - webgl_draw_calls
          - video_bitrate_mbps
          - runtime_fps
          - main_thread_blocking_ms
          - dropped_frame_ratio
      remediation:
        action: reduce_payload_complexity_or_replace_with_lighter_motion_asset

    - id: D018
      name: sonic_alignment_missing
      severity: hard_fail
      applies_to:
        - logo_animation
        - hero_motion
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - title_card
        - end_card
        - transition_system
      detect:
        method: audio_standard_reference_check
        required_when:
          audio_track_present: true
        audio_standard_ref: sonic_alignment_policy.audio_standard_ref
        sync_tolerance_ms: sonic_alignment_policy.sync_tolerance_ms
      remediation:
        action: remove_audio_or_attach_approved_audio_standard_reference

    - id: D019
      name: choreography_sequence_invalid
      severity: hard_fail
      applies_to:
        - logo_animation
        - hero_motion
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - transition_system
        - choreography_sequence
      detect:
        method: choreography_sequence_check
        approved_sequence_logic_from: motion_tokens.choreography.approved_sequence_logic
        default_sequence_logic_from: motion_tokens.choreography.default_sequence_logic
        stagger_rules_from: motion_tokens.choreography.stagger
        sequence_requirements_from: motion_tokens.choreography.sequence_requirements
      remediation:
        action: reorder_keyframes_to_follow_approved_choreography_logic

    - id: D020
      name: living_creator_style_reference_used
      severity: hard_fail
      applies_to:
        - motion_token
        - logo_animation
        - hero_motion
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
      detect:
        method: prompt_pattern_match
        source: generation_policy.prompt_requirements.forbidden_prompt_patterns
        explicit_patterns:
          - in_the_style_of_living_creator
          - imitate_named_motion_designer
          - copy_specific_ad_campaign
      remediation:
        action: remove_living_creator_reference_and_rewrite_prompt_to_brand_tokens

  heuristic:
    - id: H001
      name: weak_motion_semantic_fit
      severity: soft_warn
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
      detect:
        method: motion_semantic_fit_classifier
        threshold: 0.75
      remediation:
        action: select_semantically_better_motion_asset_or_use_top_three_neighbours

    - id: H002
      name: motion_accessibility_risk
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - loading_animation
        - progress_animation
        - state_change_animation
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - transition_system
      detect:
        method: motion_accessibility_risk_classifier
        threshold: 0.85
        require_heatmap_or_risk_overlay: true
        require_failing_timecodes: true
        require_suggested_repairs: true
      remediation:
        action: repair_timecoded_accessibility_risks_or_use_reduced_motion_variant

    - id: H003
      name: generic_motion_risk
      severity: soft_warn
      applies_to:
        - hero_motion
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - title_card
      detect:
        method: generic_motion_risk_classifier
        threshold: 0.70
      remediation:
        action: strengthen_brand_specific_motion_character_and_reduce_stock_patterns

    - id: H004
      name: low_exemplar_alignment_score
      severity: soft_warn
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - hero_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
      detect:
        method: motion_exemplar_alignment_classifier
        exemplar_set: exemplars.active_exemplar_keys
        threshold: 0.70
      remediation:
        action: revise_toward_approved_motion_patterns

    - id: H005
      name: motion_distraction_risk
      severity: hard_fail
      applies_to:
        - hero_motion
        - ambient_background_motion
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - transition_system
      detect:
        method: motion_distraction_classifier
        threshold: 0.85
        affected_zones_required: true
        failing_timecodes_required: true
      remediation:
        action: reduce_background_motion_resequence_attention_or_pause_near_cta

    - id: H006
      name: prompt_output_fidelity_mismatch
      severity: hard_fail
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - hero_motion
        - ambient_background_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
        - transition_system
      detect:
        method: prompt_output_fidelity_classifier
        threshold: 0.80
        required_when:
          generated_by_ai: true
      remediation:
        action: regenerate_or_repair_motion_to_match_declared_prompt_and_tokens

    - id: H007
      name: weak_motion_recognition
      severity: soft_warn
      applies_to:
        - logo_animation
        - animated_icon
        - kinetic_typography
        - product_demo
        - social_video
        - title_card
        - end_card
      detect:
        method: motion_recognition_classifier
        threshold: 0.75
        require_variant_suggestion: true
      remediation:
        action: simplify_motion_or_use_more_recognizable_variant

    - id: H008
      name: emotional_motion_mismatch
      severity: soft_warn
      applies_to:
        - logo_animation
        - ui_transition
        - micro_interaction
        - hero_motion
        - animated_icon
        - animated_illustration
        - kinetic_typography
        - social_video
        - explainer_motion
        - product_demo
      detect:
        method: motion_emotional_fit_classifier
        threshold: 0.70
      remediation:
        action: adjust_energy_timing_easing_or_sequence_to_match_context

# -----------------------------------------------------------------------------
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
    - accessibility_hard_fail_count == 0
    - performance_hard_fail_count == 0

  warn_behaviour:
    auto_publish_allowed: true
    conflict_resolution:
      mode: most_restrictive_wins
      notes:
        - If any matched channel, content type, accessibility risk, or performance risk requires human sign-off, human sign-off is required.
        - Auto-publish is allowed only when no matched rule requires human sign-off.
    requires_human_sign_off_on_warn:
      channels:
        - website
        - product_ui
        - social_video
        - broadcast
        - digital_ooh
      content_types:
        - logo_animation
        - hero_motion
        - product_demo
        - social_video
        - ambient_background_motion
      warning_types:
        - cached_repository_pass_with_warning
        - low_exemplar_alignment_score
        - generic_motion_risk
        - weak_motion_recognition
    allows_auto_publish_on_warn:
      channels:
        - newsletter
        - presentation
      content_types:
        - animated_icon
        - micro_interaction
        - loading_animation

  human_review_conditions:
    - retry_count >= 3
    - unresolved_heuristic_conflict == true
    - cached_repository_pass_with_warning == true
    - audio_track_present == true
    - accessibility_risk_score >= 0.60
    - performance_budget_warning == true

# -----------------------------------------------------------------------------
# TELEMETRY
# -----------------------------------------------------------------------------
telemetry:
  log_policy_key: true
  log_policy_version: true
  log_rule_failures: true
  log_retry_history: true
  log_exception_usage: true
  log_motion_token_refs: true
  log_keyframes: true
  log_failing_timecodes: true
  log_accessibility_risk_regions: true
  log_heatmap_refs: true
  log_motion_vectors: true
  log_performance_metrics: true
  log_audio_refs: true
  log_prompt_output_fidelity: true
  log_repository_cache_usage: true
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
      motion_asset_ref:
        type: string
      motion_token_refs:
        type: array
        items:
          type: string
      duration_ms:
        type: integer
      easing_token:
        type: string
      choreography_logic:
        type: string
      keyframes:
        type: array
        items:
          type: object
      failing_timecodes:
        type: array
        items:
          type: object
          properties:
            start_ms:
              type: integer
            end_ms:
              type: integer
            reason:
              type: string
      accessibility_risk_regions:
        type: array
        items:
          type: object
      heatmap_refs:
        type: array
        items:
          type: string
      performance_metrics:
        type: object
      audio_refs:
        type: array
        items:
          type: string
      prompt_output_fidelity_score:
        type: number
      repository_cache_used:
        type: boolean
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
  - "{brand_id}.standards.visual-identity.colour"
  - "{brand_id}.standards.visual-identity.layout"
  - "{brand_id}.standards.visual-identity.iconography"
  - "{brand_id}.standards.visual-identity.illustration"
  - "{brand_id}.standards.visual-identity.imagery"
  - "{brand_id}.standards.audio-identity.sound"

related_applications:
  - "{brand_id}.applications.product-ui"
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.social-video"
  - "{brand_id}.applications.presentation"
  - "{brand_id}.applications.event-screen"
  - "{brand_id}.applications.newsletter"
---

# {Brand Name} motion

## How to complete this template

This is a Brando® Motion standard template. Complete the following steps in order before publishing.

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
| `{motion_principle_1}` | First core motion principle label | `purposeful` |
| `{motion_asset_key_1}` | Approved motion asset key | `logo-reveal-primary` |
| `{example_key_1}` | Exemplar short key | `product-ui-transition` |
| `<motion_asset_key>` | Runtime motion asset key. Do not replace in template | |
| `<exemplar_key>` | Runtime exemplar key. Do not replace in template | |

---

## Purpose

This standard governs how {Brand Name} moves.

It is designed for human creators, AI systems, validators, designers, developers, motion teams, accessibility reviewers, and publishing workflows.

Motion is treated as a governed brand token system. It controls:

- Timing
- Easing
- Choreography
- Transitions
- Logo animation
- UI animation
- Social and video motion
- Temporal colour
- Accessibility safety
- Reduced-motion behaviour
- Performance budget
- Sonic alignment
- Prompt-output fidelity for AI-generated motion

The motion standard exists to make movement purposeful, recognizable, safe, performant, and brand-consistent.

---

## How to interpret this policy

This policy has six layers:

1. Motion principles define the intended behaviour.
2. Motion tokens define the approved timing, easing, and choreography system.
3. Safety and accessibility rules define what motion must never do.
4. Performance rules define what motion must not break.
5. Exemplars show what good motion looks like.
6. Execution rules determine whether output passes, warns, or fails.

The YAML front matter is the machine-executable layer. This Markdown body is the human-readable guidance layer. Where they conflict, the YAML governs.

If a rule conflicts with a higher-priority safety, accessibility, legal, regulatory, logo, colour, layout, or audio policy, the higher-priority or more restrictive policy wins.

---

## Motion principles

### {Motion Principle 1}

{Explain motion principle 1 in plain language.}

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

### {Motion Principle 2}

{Explain motion principle 2 in plain language.}

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

### {Motion Principle 3}

{Explain motion principle 3 in plain language.}

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

## Motion tokens

Motion tokens are the source of truth for approved movement.

Use tokens for:

- Duration
- Easing
- Choreography
- Stagger
- Reduced-motion variants
- Temporal colour behaviour
- Performance budgets

Do not invent timing or easing values outside the token system unless an exception is declared.

Functional micro-interactions should feel responsive. The recommended value is around 200ms, with 300ms as a common upper target. The 500ms value is a hard ceiling, not the desired default.

---

## Accessibility and safety

Motion must be safe before it is expressive.

The validator must check for:

- Flash frequency risk
- Rapid luminance changes
- Large-field motion
- Uncontrolled parallax
- Aggressive zooming
- Camera shake
- Motion that blocks comprehension
- Missing reduced-motion alternatives

If H002 fails, the validator should return a diagnostic report with:

- Failing timecodes
- Risk regions
- Luminance windows
- Motion vectors
- Heatmap or risk overlay reference
- Suggested repairs

A useful failure report should tell the creator where the issue happened, when it happened, why it failed, and how to fix it.

---

## Temporal colour

Temporal colour is colour changing over time.

Static contrast is not enough. Motion can create contrast failures for only part of a transition.

When checking text, CTAs, or logos over moving backgrounds, gradients, or video, validators must use worst-case sampling. This means validating against the lowest-contrast point inside the text, logo, or CTA bounding box.

Do not average contrast across the whole area. Averages can hide local failures.

Luminance must not change more than the declared threshold in the declared time window. The default template metric is a maximum 25 percent luminance delta within 100ms.

---

## Performance

Motion that breaks the experience is not on brand.

The validator must check:

- Lottie payload size
- SVG path count
- WebGL draw calls
- Video bitrate
- Runtime frame rate
- Main-thread blocking
- Dropped-frame ratio

Performance failures should return concrete repair data. For example, reduce path count, simplify layers, compress video, replace WebGL with video, shorten loop duration, or use a static fallback.

---

## Sonic alignment

If motion includes sound, the sound is part of the brand asset.

Audio tracks, sonic logos, pings, whooshes, UI sounds, and voice cues must resolve through the declared Audio Standard when present.

Silent motion is allowed unless an application policy requires audio.

Unapproved audio must not ship.

---

## Prompt-output fidelity

AI-generated motion must be validated twice:

1. The prompt must comply with brand, legal, safety, and generation rules.
2. The rendered output must match the prompt, motion tokens, semantic role, timing, easing, choreography, and safety constraints.

A compliant prompt does not guarantee a compliant animation.

If the prompt asks for restrained easing but the output creates chaotic high-energy motion, the output fails.

---

## Default execution expectations

Unless an explicit exception is declared in the YAML:

- Use approved duration, easing, and choreography tokens.
- Include a reduced-motion variant.
- Avoid unsafe luminance changes.
- Avoid seizure-risk flashing.
- Avoid large-field motion without reduced-motion alternatives.
- Keep motion from competing with text, CTAs, or primary tasks.
- Respect safe areas and platform overlays.
- Keep motion within performance budgets.
- Resolve logo, colour, layout, and audio dependencies where relevant.
- Validate AI-generated output against the prompt and rendered result.
- Log failing timecodes, keyframes, zones, and performance metrics.

---

## Exception model

Exceptions are allowed only when declared in the YAML `exceptions.declared` block. Undeclared exceptions hard fail.

Four exceptions are pre-declared in this template:

Reduced motion user preference exception: allows expressive motion to be replaced by an approved reduced-motion variant when the user has reduced motion enabled.

Legal text exception: defers to higher-priority legal or regulatory policy where required by law or compliance.

Emergency alert exception: allows stronger motion cues for safety-critical alerts while still requiring seizure and vestibular safety thresholds to pass.

Repository cached pass exception: allows a recent cached policy to be used if the motion repository is temporarily unavailable. Safety-critical rules must still execute.

---

## Exemplars

Each exemplar below is referenced in the YAML by its `active_exemplar_key`.

Validators use authoritative repository exemplars retrieved via `exemplars.storage.retrieval`, not the Markdown copies shown here.

### {exemplar-name}

Key: `{brand_id}.standards.motion-identity.motion.exemplar.{example_key}`

"{Approved exemplar description or reference.}"

Why it works:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Anti-exemplars

Anti-exemplars are negative reference material for human review only. They are excluded from deterministic and heuristic validation unless a rule explicitly declares them as an input source.

### {anti-exemplar-name}

"{Anti-exemplar description or reference.}"

Why it fails:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Validator interpretation notes

### Deterministic checks

Implement with direct token checks, structural references, measurable thresholds, repository lookups, performance budgets, accessibility thresholds, and graph validation.

Covered by: D001, D002, D003, D004, D005, D006, D007, D008, D009, D010, D011, D012, D013, D014, D016, D017, D018, D019, D020

### Heuristic checks

Implement using classifiers, scorers, computer vision, motion analysis, or model-based evaluators.

Covered by: H001, H002, H003, H004, H005, H006, H007, H008

Every heuristic check must return both a score and a reason. Never return a score alone.

### Heuristic score scale

All heuristic scores use a normalized 0.0 to 1.0 scale.

Do not use 0-100 percentage scores in this standard. This prevents aggregation bugs in reporting dashboards and brand-health scoring.

### Accessibility diagnostics

H002 must return actionable diagnostics, not just a fail.

Expected diagnostic fields include:

- Failing timecodes
- Risk regions
- Luminance windows
- Motion vectors
- Heatmap reference
- Suggested repairs

### Targeted repair

For deterministic failures, repair the specific token, keyframe, asset, or exported metric where possible.

For heuristic failures, repair the affected timecode, region, sequence, or motion asset.

If D004 breakpoint failure occurs, adjust tokens first. This includes scale, spacing, duration, sequence, and reduced-motion alternatives.

Changing the entire motion pattern is a regeneration event, not a simple repair.

### Telemetry

Every validation run must produce a JSON telemetry record matching `telemetry.schema`.

Telemetry must include failing timecodes, keyframes, performance metrics, accessibility risk regions, prompt-output fidelity score, and repository cache use where applicable.

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
- All duration, easing, choreography, colour, reduced-motion, and performance tokens resolve.
- All motion repository keys resolve, or cached fallback behaviour is declared and warning-logged.
- Safety-critical rules are not skipped by cached repository fallback.
- Reduced-motion variants exist for all required motion types.
- Temporal colour checks use the declared luminance delta metric.
- Worst-case contrast sampling is used for moving backgrounds, gradients, text, logos, and CTAs.
- Audio-bearing motion resolves through the declared Audio Standard.
- All semantic type pairings are valid.
- All prompt-output fidelity checks pass for AI-generated motion.
- Performance budgets pass for the target channel and breakpoint.
- Positive exemplars do not violate deterministic rules.
- Anti-exemplars are explicitly excluded from validation.
- All channel and content-type values in rules and `decision_policy` match `scope.applies_to`.
- The telemetry schema is valid and the policy key and version are attached to every validation report.