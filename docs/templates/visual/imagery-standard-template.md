---
# =============================================================================
# BRANDO® IMAGERY STANDARD TEMPLATE
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
# Long prose fields, including description and naming.rationale, should use
# folded or literal block scalar style. This reduces YAML parse risk where
# human-authored prose includes braces, colons, or punctuation.
# =============================================================================

# -----------------------------------------------------------------------------
# DOCUMENT IDENTITY
# -----------------------------------------------------------------------------
# Required. Stable, globally unique identifier for this policy.
# Recommended pattern: {brand_id}.standards.visual-identity.imagery
id: "{brand_id}.standards.visual-identity.imagery"

# Required. Usually mirrors id. Use as the stable lookup key in policy
# repositories, MCP servers, APIs, and audit logs.
key: "{brand_id}.standards.visual-identity.imagery"

# Required. Human-readable title.
title: "{Brand Name} Imagery"

# Required. Short description used in repositories, UIs, search, and audit logs.
# Use folded block scalar style for resilience against punctuation and braces.
description: >
  Core imagery standard governing photography, generated imagery, composites,
  crops, rights, consent, visual style, subject matter, accessibility, and
  publication readiness across {Brand Name} communications.

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
subcategory: imagery

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
  type: BrandImageryStandard

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
  # How the client refers to this document.
  client_term: Imagery

  # The Brando category this standard sits within.
  canonical_term: Visual Identity

  # The specific standard label within that category.
  policy_label: Imagery

  # Use literal block scalar style to avoid YAML parse errors when prose
  # includes punctuation, braces, examples, or client-specific terminology.
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
    # Do not mix channels with content types in this list.
    channels:
      - website
      - linkedin
      - email
      - newsletter
      - event_platform
      - sales_enablement
      - pitch_deck
      - proposal
      - cms
      - paid_social
      - display_ad
      - print
      - packaging
      - large_format

    # Required. Types of imagery assets or visual components governed by this policy.
    # Composite outputs such as web pages, pitch decks, proposals, and campaigns
    # should be decomposed into governed image fields before rule execution.
    content_types:
      - hero_image
      - editorial_image
      - people_image
      - product_image
      - environment_image
      - abstract_image
      - data_visual_image
      - background_image
      - thumbnail_image
      - social_image
      - campaign_image
      - case_study_image
      - article_image
      - email_image
      - presentation_image
      - print_image
      - composite_image
      - ai_generated_image
      - source_image
      - image_with_text_overlay

    # Recommended. Audience or persona types for image adaptation.
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

    # Recommended. Zones within imagery and metadata.
    # Useful for excluding captions, source notes, rights metadata, or legal text.
    content_zones:
      - rendered_image
      - focal_subject
      - background
      - foreground
      - crop_safe_area
      - text_overlay_area
      - metadata
      - rights_metadata
      - source_note
      - legal_disclaimer

  # Recommended. Explicitly excluded contexts.
  excludes:
    content_types:
      - legal_disclaimer
      - regulated_disclosure
      - invoice
      - procurement_template
      - raw_unreviewed_source_asset

  # Recommended. Human-readable scope clarifications.
  notes:
    - Applies to generated, edited, sourced, composited, cropped, and published imagery.
    - Applies to image metadata and rights metadata where those fields affect governance.
    - Does not apply to quoted source material unless explicitly rewritten or redesigned.
    - Does not apply to legal or compliance text unless downstream policy explicitly says so.
    - For composite assets, validate every governed image component separately before validating the composite.

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
    - "{brand_id}.standards.visual-identity.imagery"
    - "{brand_id}.standards.visual-identity.colour:^1.0.0"
    - "{brand_id}.standards.verbal-identity.messaging-framework"
    - "{brand_id}.standards.verbal-identity.tone-of-voice"
    - campaign.local

  conflict_resolution:
    # Allowed values:
    # - higher_priority_wins | most_restrictive_wins | explicit_exception_required
    mode: higher_priority_wins
    notes:
      - Application-specific policy may narrow this standard only within its declared scope.
      - Application-specific policy may not weaken higher-priority legal, regulatory, rights, consent, privacy, accessibility, or safety constraints.
      - Colour Standard governs approved colour tokens and contrast rules. Imagery governs image selection, generation, crops, subject matter, style, and rights.
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
    - "{brand_id}.applications.case-study"
    - "{brand_id}.applications.linkedin"
    - "{brand_id}.applications.thought-leadership"
    - "{brand_id}.applications.website"
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
    include_resolved_image_tokens: true
    include_resolved_colour_tokens: true
    include_resolved_rights_status: true
    include_resolved_crop_requirements: true

# -----------------------------------------------------------------------------
# IMAGERY PRINCIPLES
# -----------------------------------------------------------------------------
# Required. Three to five principles is usually enough.
# Keep descriptions to one clear sentence each.
principles:
  required:
    - "{imagery_principle_1}"
    - "{imagery_principle_2}"
    - "{imagery_principle_3}"
  definitions:
    # Map keys containing placeholders must be quoted to remain valid YAML.
    "{imagery_principle_1}":
      description: "{Describe imagery principle 1 in one clear sentence.}"
    "{imagery_principle_2}":
      description: "{Describe imagery principle 2 in one clear sentence.}"
    "{imagery_principle_3}":
      description: "{Describe imagery principle 3 in one clear sentence.}"

# -----------------------------------------------------------------------------
# IMAGERY POLICY
# -----------------------------------------------------------------------------
# Required. Defines what imagery must do.
imagery_policy:
  objectives:
    required:
      - support_brand_positioning
      - express_visual_identity
      - reinforce_message_intent
      - maintain_rights_and_consent_integrity
      - meet_accessibility_requirements
      - support_responsive_publication

  image_characteristics:
    required:
      - brand_relevant
      - purposeful
      - distinctive
      - credible
      - accessible
      - legally_cleared
      - inclusive
    discouraged:
      - generic_stock_aesthetic
      - misleading_context
      - excessive_visual_noise
      - overprocessed_colour
      - tokenistic_representation
      - accidental_likeness
      - prompt_compliant_but_output_off_brand

  subject_matter:
    allowed:
      - "{allowed_subject_1}"
      - "{allowed_subject_2}"
    restricted:
      - identifiable_real_people
      - ai_generated_photorealistic_faces
      - children_or_minors
      - medical_contexts
      - financial_outcome_contexts
      - legal_or_regulated_contexts
      - crisis_or_disaster_contexts
    forbidden:
      - unsafe_activity
      - discriminatory_stereotype
      - misleading_before_after
      - competitor_brand_asset
      - public_figure_likeness_without_approval
      - identifiable_private_person_without_consent
      - synthetic_face_without_disclosure

  composition:
    required:
      - clear_focal_subject
      - sufficient_negative_space_where_text_overlay_is_expected
      - responsive_crop_safe_area
      - non_misleading_crop
    discouraged:
      - cluttered_background
      - ambiguous_focal_point
      - decapitated_people_or_products
      - cropped_context_that_changes_meaning

  colour_treatment:
    approved_colour_standard_ref: "{brand_id}.standards.visual-identity.colour:^1.0.0"
    allowed_treatments:
      - natural_colour
      - approved_duotone
      - approved_overlay
      - approved_monochrome
    forbidden_treatments:
      - unapproved_filter
      - over_saturation
      - brand_palette_conflict
      - inaccessible_text_overlay

# -----------------------------------------------------------------------------
# IMAGE TOKEN POLICY
# -----------------------------------------------------------------------------
# Recommended. Defines reusable image tokens and approved asset references.
image_token_policy:
  approved_image_sets:
    - id: "{primary_image_set_id}"
      label: "{Primary image set label}"
      repository_ref: "{image_repository_key}"
      usage:
        - website
        - linkedin
        - newsletter
      status: active

  approved_styles:
    - id: "{style_1_id}"
      label: "{Approved image style label}"
      description: "{Describe the approved image style.}"
      allowed_content_types:
        - hero_image
        - editorial_image
        - campaign_image
      colour_treatment_refs:
        - natural_colour
        - approved_overlay

  deprecated_image_sets:
    - id: "{deprecated_image_set_id}"
      replacement_ref: "{primary_image_set_id}"
      reason: "{Why this image set is deprecated.}"

# -----------------------------------------------------------------------------
# IMAGE REPOSITORY
# -----------------------------------------------------------------------------
# Recommended. Declares where authoritative image assets and metadata are retrieved.
image_repository:
  storage:
    # Allowed values: referenced | external_repository | dam | mcp_resource | local_file
    mode: referenced
    source_key: "{brand_id}.standards.visual-identity.imagery"
    section: image_tokens
    load_at_validation: true
    retrieval:
      protocol: brando_policy_repo
      base_path: /policies/imagery/
      key_format: "<image_token_key>.json"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 300

  fallback_behaviour:
    # Avoid global hard-fail on short infrastructure outages.
    if_repository_unavailable: cached_pass_with_warning
    if_cache_unavailable: hard_fail
    cached_pass_max_age_seconds: 604800
    warning_code: image_repository_unavailable_using_cached_policy
    require_revalidation_when_repository_recovers: true
    notes:
      - Cached pass may be used only when a previously validated effective policy and image token manifest are available.
      - Cached pass must be logged as a warning and revalidated when the repository becomes available.
      - Rights, consent, and license expiry checks must not use stale cached data beyond cached_pass_max_age_seconds.

# -----------------------------------------------------------------------------
# GENERATION POLICY
# -----------------------------------------------------------------------------
# Required when AI-generated or AI-edited imagery is allowed.
generation_policy:
  ai_generation_allowed: true
  ai_editing_allowed: true
  human_review_required_for:
    - ai_generated_image
    - people_image
    - public_campaign
    - print
    - packaging
    - regulated_context

  prompt_requirements:
    must_include:
      - intended_channel
      - content_type
      - semantic_role
      - approved_style_ref
      - subject_description
      - usage_context
    must_not_include:
      - living_creator_style_reference
      - competitor_style_reference
      - public_figure_likeness_request
      - private_person_likeness_request_without_consent
      - deceptive_context
      - unapproved_brand_claim

  forbidden_creator_references:
    # These are pattern templates and entity categories, not literal brand-specific placeholders.
    - in_the_style_of_living_artist
    - in_the_style_of_living_photographer
    - in_the_style_of_living_designer
    - living_creator_name_reference
    - named_studio_without_license
    - competitor_campaign_reference

  disclosure:
    ai_generated_metadata_required: true
    ai_edited_metadata_required: true
    synthetic_person_disclosure_required: true
    generated_asset_id_required: true

# -----------------------------------------------------------------------------
# RIGHTS AND CONSENT POLICY
# -----------------------------------------------------------------------------
# Required for executable imagery governance.
rights_and_consent_policy:
  rights_metadata_required: true
  consent_metadata_required_for:
    - identifiable_real_people
    - ai_generated_photorealistic_faces
    - private_locations
    - third_party_products
    - customer_or_partner_assets

  accepted_license_status:
    - owned
    - licensed_active
    - rights_cleared
    - public_domain_verified
    - generated_with_approved_model_and_terms

  forbidden_license_status:
    - unknown
    - expired
    - revoked
    - editorial_only_for_commercial_use
    - unverified_web_source
    - generated_with_unapproved_model_or_terms

  privacy_requirements:
    # Do not log real names, email addresses, model names, legal IDs, or raw consent documents in policy or telemetry.
    creator_or_model_ref_must_be_anonymized: true
    model_release_ref_must_be_anonymized: true
    consent_subject_ref_must_be_anonymized: true
    pii_in_policy_or_telemetry_forbidden: true
    secure_lookup_required: true
    lookup_store: encrypted_legal_rights_database
    anonymized_ref_format: uuid

  expiry_handling:
    block_if_license_expired: true
    block_if_consent_expired: true
    warn_if_expiry_within_days: 30

# -----------------------------------------------------------------------------
# ACCESSIBILITY POLICY
# -----------------------------------------------------------------------------
# Required where imagery can carry text, overlays, controls, or meaning.
accessibility_policy:
  alt_text_required_for:
    - editorial_image
    - people_image
    - product_image
    - data_visual_image
    - campaign_image
    - social_image
    - image_with_text_overlay

  decorative_image_alt_text:
    allowed_empty_alt_when_decorative: true
    decorative_status_must_be_declared: true

  text_overlay_contrast:
    default_minimum_ratio: 4.5
    large_text_minimum_ratio: 3.0
    non_text_ui_minimum_ratio: 3.0
    resolve_gradient_before_check: true
    gradient_contrast_requirement: worst_case_over_text_bounding_box
    notes:
      - Contrast must be validated against the lowest-contrast point of the gradient area covered by the text bounding box.
      - Do not use average sampled contrast for pass or fail decisions.
      - If multiple responsive crops are generated, contrast must be checked in every required crop.

  motion_accessibility:
    applies_to:
      - animated_image
      - cinemagraph
      - gif
      - video_still_sequence
    rapid_motion_threshold:
      max_flashes_per_second: 3
      max_large_area_motion_frequency_hz: 3
      parallax_motion_requires_user_control: true
    vestibular_safety_required: true

# -----------------------------------------------------------------------------
# RESPONSIVE CROP POLICY
# -----------------------------------------------------------------------------
# Required for imagery that appears in responsive layouts.
responsive_crop_policy:
  multi_aspect_validation_required: true
  target_aspect_ratios:
    - "16:9"
    - "4:3"
    - "1:1"
    - "4:5"
    - "9:16"
  fail_on:
    - subject_decapitation
    - product_obscured
    - focal_point_outside_safe_area
    - text_overlay_area_lost
    - misleading_context_crop
  safe_area_defaults:
    focal_subject_minimum_visible_percentage: 90
    face_or_product_margin_minimum_percentage: 8
    text_overlay_safe_area_minimum_percentage: 20

# -----------------------------------------------------------------------------
# PRINT AND COLOUR MATERIALIZATION POLICY
# -----------------------------------------------------------------------------
# Required when imagery is used in print, packaging, or large-format contexts.
print_colour_policy:
  cmyk_required_for:
    - print
    - packaging
    - large_format

  cmyk_resolution_strategy:
    if_cmyk_missing_for_print_context: materialize_before_fail
    materialization_profile: ISO Coated v2 (ECI)
    materialization_result:
      if_materialized_successfully: pass_with_warning
      warning_code: cmyk_materialized_from_rgb
      require_human_review_for:
        - print
        - packaging
        - large_format
      log_materialized_values: true
      log_source_profile: true
      log_target_profile: true
    if_materialization_fails: hard_fail
    notes:
      - Materialized CMYK values may differ from designer intent and must never be silently passed.
      - Materialization is a resolution strategy, not a replacement for approved print colour review.

# -----------------------------------------------------------------------------
# IMAGE QUALITY METRICS
# -----------------------------------------------------------------------------
# Recommended. Defines objective quality measures used by validation rules.
image_quality_metrics:
  compression_artifact_score:
    scale: "0.0_to_1.0"
    higher_is_worse: true
    maximum_default: 0.25
    preferred_methods:
      - ssim_delta_against_source
      - psnr_against_source
      - block_artifact_detection
      - ringing_artifact_detection
    notes:
      - SSIM should be used when a source or master image is available.
      - PSNR may supplement SSIM for production derivatives.
      - No-reference artifact detection may be used for generated or third-party images.

  resolution_quality:
    minimum_long_edge_px:
      web: 1600
      social: 1200
      print: 3000
    print_minimum_dpi: 300

# -----------------------------------------------------------------------------
# LEXICAL POLICY
# -----------------------------------------------------------------------------
# Optional. Use when image prompts have forbidden, discouraged, or preferred vocabulary.
lexical_policy:
  forbidden_prompt_terms:
    exact:
      - "{forbidden_prompt_term_1}"
      - "{forbidden_prompt_term_2}"
  discouraged_prompt_terms:
    - "{discouraged_prompt_term_1}"
    - "{discouraged_prompt_term_2}"
  preferred_replacements:
    "{forbidden_prompt_term_1}": "{preferred_replacement_1}"
    "{forbidden_prompt_term_2}": "{preferred_replacement_2}"

# -----------------------------------------------------------------------------
# PATTERN POLICY
# -----------------------------------------------------------------------------
# Recommended. Defines reusable visual, prompt, and production constraints.
pattern_policy:
  forbidden_patterns:
    - id: generic_stock_aesthetic
      description: Avoid interchangeable, undifferentiated business imagery with no distinctive brand role.
      trigger_phrases:
        - generic stock photo
        - smiling business people
        - corporate stock
        - handshake stock image
      visual_signals:
        - interchangeable_business_scene
        - staged_unrealistic_diversity
        - overly_polished_conference_room
        - generic_laptop_closeup
      examples:
        fail:
          - "Generic business people smiling at a laptop."
        pass:
          - "A purposeful scene showing a specific decision moment with clear human context."

    - id: corporate_memphis_or_undifferentiated_flat_vector
      description: Avoid generic flat-vector minimalism, undifferentiated humanoid geometry, and low-specificity illustration-like imagery when photography or distinctive imagery is required.
      trigger_phrases:
        - corporate memphis
        - flat vector people
        - generic abstract people
        - undifferentiated humanoid geometry
        - flat-vector-minimalism
      examples:
        fail:
          - "Generic flat vector people around a dashboard."
        pass:
          - "A distinct image concept tied to the approved visual identity and message intent."

    - id: living_creator_style_reference
      description: Do not request imagery in the style of a living artist, photographer, designer, studio, or identifiable creator unless a license or approval explicitly exists.
      trigger_phrases:
        - in the style of
        - inspired by
        - like the work of
        - shot like
        - photographed by
      examples:
        fail:
          - "Generate this in the style of {living_creator_name}."
        pass:
          - "Use approved brand attributes: high contrast, natural light, precise composition."

    - id: misleading_context
      description: Do not use crops, composites, or generated scenes that alter the factual meaning of the image.
      examples:
        fail:
          - "Crop out the safety equipment so the scene feels more dramatic."
        pass:
          - "Preserve factual context while simplifying background clutter."

# -----------------------------------------------------------------------------
# REQUIRED ELEMENTS
# -----------------------------------------------------------------------------
# Recommended. Defines metadata and visual components governed imagery should include.
required_elements:
  default:
    - approved_image_source
    - content_type
    - channel
    - semantic_role
    - rights_status
    - consent_status
    - alt_text_or_decorative_status
    - crop_safe_area
    - approved_style_ref
  conditional:
    - id: cmyk_for_print_context
      required_when:
        channel:
          - print
          - packaging
          - large_format
      resolution_strategy:
        if_cmyk_values_missing: attempt_materialization_using_iso_coated_v2_eci_before_fail
        materialized_output_status: pass_with_warning
        human_review_required: true
    - id: text_overlay_contrast
      required_when:
        content_type:
          - image_with_text_overlay
    - id: model_release_for_identifiable_person
      required_when:
        identifiable_person_present: true
    - id: ai_disclosure_for_generated_or_composite_image
      required_when:
        ai_generated_or_edited: true
    - id: multi_aspect_safe_area
      required_when:
        responsive_publication: true

# -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
# Required if different image fields need different thresholds.
field_applicability:
  hero_image:
    contrast_required_if_text_overlay: true
    alt_text_required: true
    multi_aspect_validation_required: true
    rights_metadata_required: true
    maximum_compression_artifact_score: 0.20

  editorial_image:
    contrast_required_if_text_overlay: true
    alt_text_required: true
    multi_aspect_validation_required: true
    rights_metadata_required: true
    maximum_compression_artifact_score: 0.25

  people_image:
    alt_text_required: true
    consent_metadata_required: true
    likeness_collision_check_required: true
    inclusion_sensitivity_check_required: true
    maximum_compression_artifact_score: 0.25

  product_image:
    alt_text_required: true
    focal_subject_required: true
    multi_aspect_validation_required: true
    maximum_compression_artifact_score: 0.20

  background_image:
    alt_text_required: false
    decorative_status_must_be_declared: true
    contrast_required_if_text_overlay: true
    maximum_compression_artifact_score: 0.30

  social_image:
    alt_text_required: true
    multi_aspect_validation_required: true
    prompt_output_fidelity_required_if_generated: true
    maximum_compression_artifact_score: 0.25

  campaign_image:
    alt_text_required: true
    rights_metadata_required: true
    consent_metadata_required_if_people_present: true
    prompt_output_fidelity_required_if_generated: true
    multi_aspect_validation_required: true
    maximum_compression_artifact_score: 0.20

  print_image:
    cmyk_required: true
    dpi_minimum: 300
    human_review_required_if_cmyk_materialized: true
    maximum_compression_artifact_score: 0.15

  composite_image:
    component_validation_required: true
    rights_metadata_required_for_all_components: true
    prompt_output_fidelity_required_if_generated: true
    maximum_compression_artifact_score: 0.20

  ai_generated_image:
    ai_generated_metadata_required: true
    prompt_output_fidelity_required: true
    originality_check_required: true
    likeness_collision_check_required_if_people_present: true
    maximum_compression_artifact_score: 0.25

  image_with_text_overlay:
    contrast_required: true
    worst_case_gradient_contrast_required: true
    multi_aspect_contrast_validation_required: true
    maximum_compression_artifact_score: 0.25

# -----------------------------------------------------------------------------
# PERSONA PROFILES
# -----------------------------------------------------------------------------
# Optional. Use when the same standard needs slightly different behaviour.
persona_profiles:
  marketing_manager:
    imagery_adjustment: standard
  content_creator:
    imagery_adjustment: standard
  social_media:
    imagery_adjustment: crop_and_channel_native
  executive_communications:
    imagery_adjustment: trust_and_clarity_led
  sales:
    imagery_adjustment: audience_need_and_proof_led
  partner_marketing:
    imagery_adjustment: shared_value_and_co_branding_sensitive
  new_hire:
    imagery_adjustment: explanatory
  ai_agent:
    imagery_adjustment: strict_constraint_enforcement

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
    - id: legal_text_exception
      description: Legal or regulated text may override imagery preferences where required by law or compliance.
      when:
        policy_context:
          higher_priority_policy_matches:
            - "{brand_id}.legal.*"
            - global.regulatory
      override:
        enforcement_mode: defer_to_higher_policy

    - id: editorial_rights_exception
      description: Editorial-use imagery may be allowed in editorial contexts only when usage rights explicitly permit it.
      when:
        rights_status:
          - editorial_use_only
        channel:
          - website
          - newsletter
      override:
        enforcement_mode: editorial_context_limited
        requirements:
          - editorial_context_required
          - commercial_use_forbidden
          - rights_notice_required

    - id: legally_approved_likeness_exception
      description: Restricted likeness use may proceed only when legal approval, consent, and proof of rights are declared.
      when:
        approval_status:
          - legally_approved
      override:
        enforcement_mode: restricted_likeness_allowed
        requirements:
          - legal_approval_ref_required
          - consent_ref_required
          - rights_ref_required

    - id: cached_repository_exception
      description: Cached validation may be used during short repository outages only when a recent validated cache exists.
      when:
        repository_status:
          - unavailable
      override:
        enforcement_mode: cached_pass_with_warning
        requirements:
          - cache_age_within_limit
          - revalidation_required_when_repository_recovers
          - warning_logged

# -----------------------------------------------------------------------------
# EXEMPLARS
# -----------------------------------------------------------------------------
# Recommended. Positive examples for human guidance and semantic scoring.
exemplars:
  minimum_review_count: 2

  # Markdown exemplar copies in the document body are for humans only.
  # Authoritative exemplar metadata is retrieved from the policy repository.
  markdown_examples:
    role: human_readable_copy
    authoritative: false
    excluded_from_validation: true

  storage:
    # Allowed values: inline | referenced | external_repository
    mode: referenced
    source_key: "{brand_id}.standards.visual-identity.imagery"
    section: exemplars
    load_at_validation: true
    retrieval:
      protocol: brando_policy_repo
      base_path: /policies/exemplars/
      key_format: "<exemplar_key>.json"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 300

  fallback_behaviour:
    if_exemplars_unavailable: skip_rule_with_warning
    affected_rules:
      - H005

  active_exemplar_keys:
    - "{brand_id}.standards.visual-identity.imagery.exemplar.{example_key_1}"
    - "{brand_id}.standards.visual-identity.imagery.exemplar.{example_key_2}"

  source_contexts:
    channels:
      - website
      - linkedin
      - newsletter
      - pitch_deck
      - print
    content_types:
      - hero_image
      - editorial_image
      - people_image
      - product_image
      - campaign_image
      - social_image

# -----------------------------------------------------------------------------
# COMPETITIVE DIFFERENTIATION
# -----------------------------------------------------------------------------
# Optional. Helps human reviewers understand contrastive positioning.
competitive_differentiation:
  competitors:
    - "{competitor_1}"
    - "{competitor_2}"
  category_norms_to_avoid:
    - "{Generic image style or subject pattern to avoid}"
  differentiators:
    - "{Imagery differentiator 1}"
    - "{Imagery differentiator 2}"

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
  validate_image_token_references: true
  validate_colour_standard_reference: true
  validate_rights_and_consent_mapping: true
  validate_prompt_output_fidelity_configuration: true
  validate_quality_metric_definitions: true
  exclude_markdown_guidance: true
  exclude_change_log: true
  exclude_comments: true
  exclude_anti_exemplars: true
  exclude_markdown_exemplar_copies: true
  notes:
    - validate_authoritative_positive_exemplars applies only to repository exemplars retrieved via exemplars.storage.retrieval.
    - Image token references include approved_image_set ids, style ids, colour treatment refs, source refs, and exemplar keys.
    - Rights and consent references must use anonymized UUID values and resolve through the secure legal rights database.
    - Markdown exemplar copies are excluded per exemplars.markdown_examples.excluded_from_validation.
    - Anti-exemplars are excluded per anti_exemplars.excluded_from_deterministic_validation.

# -----------------------------------------------------------------------------
# CLASSIFIERS
# -----------------------------------------------------------------------------
# Optional. Declare any judgement-based classifiers required by heuristic rules.
classifiers:
  semantic_fit_classifier:
    description: >
      Scores whether the image subject, scene, and visual role match the declared
      content type, channel, audience, message intent, and semantic role.
    output:
      type: object
      properties:
        semantic_fit_score:
          type: number
          scale: "0.0_to_1.0"
        nearest_semantic_neighbors:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H001

  brand_style_alignment_classifier:
    description: >
      Scores whether the image matches the approved imagery style, colour
      treatment, composition, lighting, depth, subject framing, and visual tone.
    output:
      type: object
      properties:
        brand_style_alignment_score:
          type: number
          scale: "0.0_to_1.0"
        reason:
          type: string
    used_by_rules:
      - H002

  generic_stock_risk_classifier:
    description: >
      Scores whether imagery feels interchangeable, staged, undifferentiated,
      or category-generic rather than distinctive to the brand.
    output:
      type: object
      properties:
        generic_stock_risk_score:
          type: number
          scale: "0.0_to_1.0"
        reason:
          type: string
    used_by_rules:
      - H003

  composition_quality_classifier:
    description: >
      Scores focal clarity, visual hierarchy, negative space, safe area, and
      whether the composition supports the intended channel and message.
    output:
      type: object
      properties:
        composition_quality_score:
          type: number
          scale: "0.0_to_1.0"
        reason:
          type: string
    used_by_rules:
      - H004

  exemplar_alignment_classifier:
    description: >
      Scores semantic and visual similarity against approved image exemplars.
      The score uses a 0.0 to 1.0 scale for consistency with all other heuristics.
    output:
      type: object
      properties:
        exemplar_alignment_score:
          type: number
          scale: "0.0_to_1.0"
        reason:
          type: string
    used_by_rules:
      - H005

  originality_risk_classifier:
    description: >
      Scores risk that generated or edited imagery is too close to protected,
      proprietary, competitor, or living-creator visual work.
    output:
      type: object
      properties:
        originality_risk_score:
          type: number
          scale: "0.0_to_1.0"
        reason:
          type: string
    used_by_rules:
      - H006

  inclusion_sensitivity_classifier:
    description: >
      Scores representation, stereotyping, tokenism, dignity, and sensitivity
      risks in imagery involving people, communities, cultures, disability,
      age, or protected characteristics.
    output:
      type: object
      properties:
        inclusion_sensitivity_risk_score:
          type: number
          scale: "0.0_to_1.0"
        reason:
          type: string
    used_by_rules:
      - H007

  likeness_collision_classifier:
    description: >
      Scores whether generated or edited faces, bodies, or identity-signalling
      features are too close to known public figures, restricted likenesses, or
      unconsented private individuals.
    output:
      type: object
      properties:
        likeness_collision_risk_score:
          type: number
          scale: "0.0_to_1.0"
        possible_collision_type:
          type: string
        reason:
          type: string
    used_by_rules:
      - H008

  prompt_output_fidelity_classifier:
    description: >
      Compares structured prompt intent with a computer-vision interpretation
      of the generated or edited output. It checks subject, semantic role,
      approved style, composition, colour treatment, negative constraints,
      disclosure requirements, and forbidden-output risks.
    output:
      type: object
      properties:
        fidelity_score:
          type: number
          scale: "0.0_to_1.0"
        failed_alignment_fields:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - D016

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
    notes: Run all deterministic rules first. Only proceed to heuristic rules if all deterministic rules pass or produce soft warnings only.

  heuristic_decisioning:
    # All heuristic rules use a 0.0 to 1.0 scale.
    low_confidence_ignore_below: 0.60
    medium_confidence_warn_at_or_above: 0.60
    high_confidence_enforce_at_or_above: 0.85
    threshold_resolution:
      policy: per_rule_takes_precedence
      notes:
        - Where a rule declares its own threshold, that value governs for that rule.
        - Global heuristic_decisioning thresholds apply only where a rule does not declare its own threshold.
        - All heuristic image scores use a 0.0 to 1.0 scale. Do not mix percentage scores with classifier probabilities.

  retry_strategy:
    mode: targeted_repair_then_regenerate
    repair_scope:
      deterministic_failures: asset_or_metadata_level
      heuristic_failures: asset_or_prompt_level
      after_two_failed_repairs: full_regeneration_or_asset_reselection
    repair_instruction_format:
      include_violation_id: true
      include_failing_asset_ref: true
      include_failing_text_or_metadata: true
      include_remediation_action: true
      include_nearest_semantic_neighbors: true
      include_rights_or_consent_reference: true
      include_colour_or_crop_reference: true
    sequence:
      - repair_deterministic_failures
      - re-evaluate
      - repair_heuristic_weaknesses
      - re-evaluate
      - regenerate_or_reselect_if_still_failing

  output_contract:
    must_pass:
      - no_hard_fail_rules
      - rights_and_consent_valid
      - accessibility_requirements_met
      - prompt_output_fidelity_met_when_applicable
    may_pass_with_warnings:
      - soft_warn_only
      - cmyk_materialized_from_rgb
      - cached_repository_validation_used
    must_block:
      - any_hard_fail_after_max_retries
      - forbidden_subject_detected
      - rights_or_consent_invalid
      - living_creator_style_reference_detected
      - high_likeness_collision_risk
      - text_overlay_contrast_failure
      - prompt_output_fidelity_hard_fail

# -----------------------------------------------------------------------------
# RULES
# -----------------------------------------------------------------------------
# Required. Rules are executable validation checks.
rules:
  deterministic:
    - id: D001
      name: approved_image_source_missing
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - print_image
        - composite_image
        - ai_generated_image
      detect:
        method: structural_reference
        required_reference_types:
          - approved_image_set
          - approved_style
          - image_token
          - generated_asset_id
        allowed_reference_sources:
          - image_token_policy.approved_image_sets.id
          - image_token_policy.approved_styles.id
          - image_repository.storage.source_key
      remediation:
        action: attach_to_approved_image_source_or_reselect_asset

    - id: D002
      name: unapproved_colour_treatment
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - background_image
        - social_image
        - campaign_image
        - image_with_text_overlay
      detect:
        method: colour_treatment_reference_check
        approved_colour_standard_ref: imagery_policy.colour_treatment.approved_colour_standard_ref
        allowed_treatments_from: imagery_policy.colour_treatment.allowed_treatments
        forbidden_treatments_from: imagery_policy.colour_treatment.forbidden_treatments
      remediation:
        action: apply_approved_colour_treatment_or_reselect_asset

    - id: D003
      name: text_overlay_contrast_failure
      severity: hard_fail
      applies_to:
        - hero_image
        - background_image
        - campaign_image
        - social_image
        - image_with_text_overlay
      detect:
        method: contrast_check
        minimum_ratio_from: accessibility_policy.text_overlay_contrast
        resolve_gradient_before_check: true
        gradient_check:
          method: worst_case_sampling
          area: text_bounding_box
          requirement: lowest_contrast_point_must_pass
          notes:
            - When checking gradients, contrast must be validated against the lowest-contrast point of the gradient area covered by the text bounding box.
            - Average contrast, median contrast, or single-point sampling is not sufficient.
        multi_aspect_validation_required: true
      remediation:
        action: adjust_overlay_scrim_colour_crop_or_reselect_asset

    - id: D004
      name: required_metadata_missing
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - print_image
        - composite_image
        - ai_generated_image
      detect:
        method: structural_presence
        required_fields:
          - content_type
          - channel
          - semantic_role
          - rights_status
          - alt_text_or_decorative_status
          - approved_style_ref
      remediation:
        action: add_required_metadata_or_hold_for_review

    - id: D005
      name: forbidden_subject_or_context_detected
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - composite_image
        - ai_generated_image
      detect:
        method: subject_and_context_match
        source: imagery_policy.subject_matter.forbidden
        case_insensitive: true
      remediation:
        action: remove_forbidden_subject_or_reselect_asset

    - id: D006
      name: rights_consent_or_license_invalid
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - case_study_image
        - print_image
        - composite_image
        - ai_generated_image
      detect:
        method: rights_and_consent_check
        accepted_license_status_from: rights_and_consent_policy.accepted_license_status
        forbidden_license_status_from: rights_and_consent_policy.forbidden_license_status
        anonymized_refs_required: true
        pii_forbidden_in_policy_or_telemetry: true
        secure_lookup_required: true
      remediation:
        action: attach_valid_rights_and_consent_or_block_asset

    - id: D007
      name: image_quality_below_threshold
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - print_image
        - composite_image
        - ai_generated_image
      detect:
        method: image_quality_metric_check
        compression_artifact_score_from: image_quality_metrics.compression_artifact_score
        threshold_from_field_applicability: maximum_compression_artifact_score
        resolution_threshold_from: image_quality_metrics.resolution_quality
      remediation:
        action: replace_source_export_higher_quality_asset_or_reduce_compression

    - id: D008
      name: responsive_safe_area_failure
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - background_image
        - image_with_text_overlay
      detect:
        method: responsive_safe_area_check
        multi_aspect_validation:
          required: true
          target_aspect_ratios_from: responsive_crop_policy.target_aspect_ratios
          fail_on_from: responsive_crop_policy.fail_on
          safe_area_defaults_from: responsive_crop_policy.safe_area_defaults
      remediation:
        action: adjust_crop_define_focal_point_or_reselect_asset

    - id: D009
      name: ai_or_composite_disclosure_missing
      severity: hard_fail
      applies_to:
        - ai_generated_image
        - composite_image
        - campaign_image
        - social_image
      detect:
        method: disclosure_metadata_check
        required_from: generation_policy.disclosure
      remediation:
        action: add_required_disclosure_metadata_or_block_asset

    - id: D010
      name: cmyk_values_missing_for_print_context
      severity: soft_warn
      applies_to:
        - print_image
        - campaign_image
        - product_image
      detect:
        method: print_colour_readiness_check
        cmyk_required_for_from: print_colour_policy.cmyk_required_for
        resolution_strategy_from: print_colour_policy.cmyk_resolution_strategy
        if_materialized_successfully: pass_with_warning
        if_materialization_fails: hard_fail
      remediation:
        action: materialize_cmyk_using_iso_coated_v2_eci_or_escalate_to_human_review

    - id: D011
      name: repository_unavailable_without_valid_cache
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - print_image
        - composite_image
        - ai_generated_image
      detect:
        method: repository_availability_check
        fallback_behaviour_from: image_repository.fallback_behaviour
      remediation:
        action: use_valid_cache_with_warning_or_pause_validation_until_repository_recovers

    - id: D012
      name: restricted_subject_without_approval
      severity: hard_fail
      applies_to:
        - people_image
        - editorial_image
        - campaign_image
        - composite_image
        - ai_generated_image
      detect:
        method: restricted_subject_approval_check
        restricted_subjects_from: imagery_policy.subject_matter.restricted
        approval_field: approval_ref
      unless_exception:
        - legally_approved_likeness_exception
        - legal_text_exception
      remediation:
        action: add_approval_reference_or_reselect_subject

    - id: D013
      name: semantic_type_pairing_invalid
      severity: hard_fail
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - background_image
        - ai_generated_image
      detect:
        method: semantic_type_pairing_check
        required_fields:
          - content_type
          - semantic_role
        disallow_pairs:
          - content_type: hero_image
            semantic_role: decoration
          - content_type: people_image
            semantic_role: purely_abstract
          - content_type: product_image
            semantic_role: generic_mood
          - content_type: background_image
            semantic_role: primary_claim_evidence
      remediation:
        action: correct_semantic_role_or_reselect_asset_type

    - id: D014
      name: orphaned_image_token
      severity: soft_warn
      applies_to:
        - source_image
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
      detect:
        method: orphaned_token_check
        repository_scope: image_repository
        required_mappings:
          - approved_image_set
          - semantic_role
          - active_exemplar_key
      remediation:
        action: map_asset_to_active_role_archive_or_remove_from_repository

    - id: D015
      name: prompt_policy_violation
      severity: hard_fail
      applies_to:
        - ai_generated_image
        - composite_image
        - campaign_image
        - social_image
      detect:
        method: prompt_policy_check
        prompt_requirements_from: generation_policy.prompt_requirements
        forbidden_prompt_terms_from: lexical_policy.forbidden_prompt_terms.exact
        forbidden_patterns_from: pattern_policy.forbidden_patterns
      remediation:
        action: rewrite_prompt_to_approved_brand_attributes

    - id: D016
      name: prompt_output_fidelity_failure
      severity: hard_fail
      applies_to:
        - ai_generated_image
        - composite_image
        - campaign_image
        - social_image
        - hero_image
      detect:
        method: prompt_output_fidelity_check
        requires_classifier: prompt_output_fidelity_classifier
        threshold: 0.80
        structured_comparison:
          compare_prompt_intent_to_output_description: true
          compare_fields:
            - subject
            - semantic_role
            - approved_style_ref
            - composition_requirements
            - colour_treatment_ref
            - negative_constraints
            - disclosure_requirements
        hard_fail_if:
          - forbidden_subject_detected
          - rights_or_consent_missing
          - synthetic_person_without_disclosure
          - living_creator_style_reference_detected
          - high_likeness_collision_risk
      remediation:
        action: regenerate_or_reselect_asset_to_match_approved_prompt_intent

    - id: D020
      name: living_creator_style_reference_detected
      severity: hard_fail
      applies_to:
        - ai_generated_image
        - composite_image
        - campaign_image
        - hero_image
        - social_image
      detect:
        method: prompt_phrase_and_entity_check
        source: generation_policy.forbidden_creator_references
        case_insensitive: true
        entity_types:
          - living_artist
          - living_photographer
          - living_designer
          - named_studio_without_license
      remediation:
        action: remove_creator_reference_and_replace_with_brand_style_attributes

  heuristic:
    - id: H001
      name: weak_semantic_fit
      severity: soft_warn
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - ai_generated_image
      detect:
        method: semantic_fit_classifier
        threshold: 0.75
        remediation_context:
          suggest_nearest_semantic_neighbors: true
          neighbor_count: 3
          neighbor_source: image_token_policy.approved_image_sets
      remediation:
        action: select_more_semantically_appropriate_image_or_use_top_three_suggested_neighbors

    - id: H002
      name: weak_brand_style_alignment
      severity: soft_warn
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
        - ai_generated_image
      detect:
        method: brand_style_alignment_classifier
        threshold: 0.75
      remediation:
        action: adjust_style_colour_composition_or_reselect_asset

    - id: H003
      name: generic_stock_risk
      severity: soft_warn
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - social_image
        - campaign_image
      detect:
        method: generic_stock_risk_classifier
        threshold: 0.70
      remediation:
        action: replace_with_more_specific_distinctive_and_brand_relevant_image

    - id: H004
      name: weak_composition_quality
      severity: soft_warn
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
      detect:
        method: composition_quality_classifier
        threshold: 0.70
      remediation:
        action: improve_focal_subject_hierarchy_negative_space_or_crop

    - id: H005
      name: low_exemplar_alignment_score
      severity: soft_warn
      applies_to:
        - hero_image
        - editorial_image
        - people_image
        - product_image
        - social_image
        - campaign_image
      detect:
        method: exemplar_alignment_classifier
        exemplar_set: exemplars.active_exemplar_keys
        # Uses 0.0 to 1.0 scale. Do not use 0-100 percentage scores.
        threshold: 0.70
      remediation:
        action: revise_toward_approved_imagery_patterns

    - id: H006
      name: originality_risk
      severity: hard_fail
      applies_to:
        - ai_generated_image
        - composite_image
        - campaign_image
        - social_image
        - hero_image
      detect:
        method: originality_risk_classifier
        threshold: 0.85
      remediation:
        action: regenerate_without_protected_or_competitor_style_similarity

    - id: H007
      name: inclusion_sensitivity_risk
      severity: hard_fail
      applies_to:
        - people_image
        - campaign_image
        - social_image
        - editorial_image
        - ai_generated_image
      detect:
        method: inclusion_sensitivity_classifier
        threshold: 0.85
      remediation:
        action: revise_subject_context_representation_or_escalate_to_human_review

    - id: H008
      name: likeness_collision_risk
      severity: hard_fail
      applies_to:
        - ai_generated_image
        - composite_image
        - people_image
        - campaign_image
        - hero_image
        - social_image
      detect:
        method: likeness_collision_classifier
        threshold: 0.80
        compare_against:
          - public_figure_reference_index
          - restricted_likeness_index
          - consented_subject_index
        fail_on:
          - likely_public_figure_match
          - unconsented_private_likeness_match
          - synthetic_face_too_close_to_known_person
      remediation:
        action: regenerate_with_non_identifiable_face_or_use_approved_consent_asset

# -----------------------------------------------------------------------------
# DEPRECATED IMAGE TOKENS
# -----------------------------------------------------------------------------
# Optional. Use when older image styles or assets must be blocked or replaced.
deprecated_image_tokens:
  review_cycle: quarterly
  notes:
    - Deprecated image tokens are checked against all governed content types listed in D014.applies_to.
    - Review this list each quarter and remove entries older than 24 months unless retained for audit.
    - Each deprecated token must carry a replacement_ref pointing to a current approved image token or set.
  items:
    - id: "{deprecated_image_token_1_id}"
      replacement_ref: "{primary_image_set_id}"
      reason: "{Why this image token is no longer approved.}"

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
    - "status in [pass, warn]"
    - "hard_fail_count == 0"

  warn_behaviour:
    auto_publish_allowed: true
    conflict_resolution:
      mode: most_restrictive_wins
      notes:
        - If any matched channel, content type, rights status, consent status, or image risk requires human sign-off, human sign-off is required.
        - Auto-publish is allowed only when no matched rule requires human sign-off.
    requires_human_sign_off_on_warn:
      channels:
        - website
        - pitch_deck
        - sales_enablement
        - print
        - packaging
      content_types:
        - hero_image
        - people_image
        - campaign_image
        - print_image
        - ai_generated_image
      risk_types:
        - cmyk_materialized_from_rgb
        - cached_repository_validation_used
        - likeness_collision_review
        - inclusion_sensitivity_review
    allows_auto_publish_on_warn:
      channels:
        - linkedin
        - newsletter
      content_types:
        - social_image
        - editorial_image
        - thumbnail_image

  human_review_conditions:
    - "retry_count >= 3"
    - "unresolved_heuristic_conflict == true"
    - "restricted_subject_present == true"
    - "rights_or_consent_warning == true"
    - "cmyk_materialized_from_rgb == true"
    - "ai_generated_photorealistic_person_present == true"

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
  log_image_source_refs: true
  log_rights_refs: true
  log_consent_refs: true
  log_crop_results: true
  log_prompt_output_fidelity: true
  log_colour_materialization: true
  retain_validation_report: true
  output_format: json
  privacy:
    pii_in_telemetry_forbidden: true
    creator_or_model_ref_format: anonymized_uuid
    model_release_ref_format: anonymized_uuid
    consent_subject_ref_format: anonymized_uuid
    secure_lookup_store: encrypted_legal_rights_database
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
      image_source_refs:
        type: array
        items:
          type: string
      rights_refs:
        type: array
        items:
          type: string
          format: uuid
      consent_refs:
        type: array
        items:
          type: string
          format: uuid
      model_or_creator_refs:
        type: array
        items:
          type: string
          format: uuid
      crop_results:
        type: array
        items:
          type: object
      contrast_results:
        type: array
        items:
          type: object
      prompt_output_fidelity:
        type: object
      colour_materialization:
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
  - "{brand_id}.standards.visual-identity.colour:^1.0.0"
  - "{brand_id}.standards.visual-identity.iconography"
  - "{brand_id}.standards.visual-identity.illustration"
  - "{brand_id}.standards.verbal-identity.messaging-framework"
  - "{brand_id}.standards.verbal-identity.tone-of-voice"

related_applications:
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.thought-leadership"
  - "{brand_id}.applications.case-study"
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.newsletter"
  - "{brand_id}.applications.event-announcement"
  - "{brand_id}.applications.economic-buyer-message"
---

# {Brand Name} imagery

## How to complete this template

This is a Brando® Imagery standard template. Complete the following steps in order before publishing.

1. Replace every `{placeholder}` value with brand-specific content.
2. Do not replace `<runtime_variable>` values. These are resolved at validation time by the Brando engine.
3. Set `status: draft` and `lifecycle_state: proposed` on first authoring. Update only after governance sign-off.
4. Set `schema.validation_status: ready_for_validation` on first authoring. Update only after a formal parse or review cycle.
5. Remove optional sections that do not apply, or retain them with placeholder values for future use.
6. Remove the `template` metadata block before policy validation.
7. Run the publishing checklist before changing `status` to `active`.

Placeholder reference:

| Token | Meaning | Example |
|---|---|---|
| `{brand_id}` | Stable machine-readable brand identifier | `acme-corp` |
| `{Brand Name}` | Human-readable brand name | `Acme Corp` |
| `{imagery_principle_1}` | First imagery principle label | `purposeful` |
| `{primary_image_set_id}` | Approved image set identifier | `editorial_photography` |
| `{style_1_id}` | Approved image style identifier | `natural_light_editorial` |
| `{image_repository_key}` | Repository key for image tokens or metadata | `acme.imagery.tokens` |
| `{example_key_1}` | Exemplar short key | `website-hero` |
| `<image_token_key>` | Runtime variable. Do not replace | |
| `<exemplar_key>` | Runtime variable. Do not replace | |

---

## Purpose

This standard governs the approved imagery system for {Brand Name}. It is designed for human creators, AI systems, validators, editors, designers, campaign teams, and publishing workflows.

The imagery standard defines what visual subjects are appropriate, how images should feel, how rights and consent are handled, how crops and overlays are validated, and how generated imagery is checked against actual output.

It governs:

- Photography
- Generated imagery
- Composite imagery
- Crops and safe areas
- Text overlays and contrast
- Rights and consent
- Subject matter
- Image style
- Prompt-output fidelity
- Accessibility
- Print readiness

---

## How to interpret this policy

This policy has six layers:

1. Imagery policy defines the approved visual intent.
2. Image token policy defines approved image sets, styles, and repository references.
3. Rights and consent policy defines legal clearance requirements.
4. Accessibility and crop policy define publication readiness.
5. Generation policy governs AI prompts and output checks.
6. Execution rules determine whether output passes, warns, or fails.

The YAML front matter is the machine-executable layer. This Markdown body is the human-readable guidance layer. Where they conflict, the YAML governs.

If a rule conflicts with a higher-priority legal, regulatory, safety, rights, consent, or accessibility policy, the higher-priority policy wins.

If a rule conflicts with an application-specific exception declared in the YAML, the declared exception applies.

---

## Imagery principles

### {Imagery Principle 1}

{Explain imagery principle 1 in plain language.}

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

### {Imagery Principle 2}

{Explain imagery principle 2 in plain language.}

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

### {Imagery Principle 3}

{Explain imagery principle 3 in plain language.}

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

## Prompt-output fidelity

A compliant prompt does not guarantee a compliant image. The generated or edited output must be checked against the actual visual result.

The validator should compare:

1. The structured prompt intent.
2. The computer-vision description of the output.
3. The declared semantic role.
4. The approved style reference.
5. The approved colour treatment.
6. The composition and crop requirements.
7. Negative constraints and forbidden output risks.

Embeddings may be used as one signal, but they must not be the only signal. The engine should compare structured intent against structured visual observations.

---

## Responsive crop validation

Imagery must be validated across the required aspect ratios declared in `responsive_crop_policy.target_aspect_ratios`.

An asset should fail if a crop:

- Cuts off the focal subject.
- Obscures a product.
- Moves the focal point outside the safe area.
- Removes a required text overlay area.
- Changes the meaning or context of the image.

---

## Rights, consent, and privacy

Rights and consent failures are publishing blockers.

Telemetry must not contain plain-text personal names, model names, consent-subject names, emails, raw legal IDs, or release documents. Use anonymized UUIDs that resolve through a secure legal rights database.

AI-generated photorealistic faces should be treated as restricted people imagery. If the brand avoids uncanny-valley or synthetic-person risk, configure `imagery_policy.subject_matter.forbidden.synthetic_face_without_disclosure` as a hard fail.

---

## Accessibility

Images with text overlays must satisfy contrast rules at the lowest-contrast point within the text bounding box. This is especially important for gradients and high-detail photography.

Do not pass an overlay based on average contrast. The worst-case point must pass.

Animated imagery must also meet motion safety expectations, including flash and rapid-motion thresholds.

---

## Print readiness

For print, packaging, or large-format contexts, CMYK values are required.

If CMYK values are missing, the engine may attempt to materialize them using the ISO Coated v2 (ECI) profile. Successful materialization is a pass with warning, not a silent pass. Human review is required for print, packaging, and large-format output.

---

## Exception model

Exceptions are allowed only when declared in the YAML `exceptions.declared` block. Undeclared exceptions hard fail.

Declared exceptions include:

- Legal text exception
- Editorial rights exception
- Legally approved likeness exception
- Cached repository exception

---

## Exemplars

Each exemplar below is referenced in the YAML by its `active_exemplar_key`. Validators use authoritative repository exemplars retrieved via `exemplars.storage.retrieval`, not the Markdown copies shown here.

### {exemplar-name}

Key: `{brand_id}.standards.visual-identity.imagery.exemplar.{example_key}`

"{Approved exemplar description or image reference.}"

Why it works:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Anti-exemplars

Anti-exemplars are negative reference material for human review only. They are excluded from deterministic and heuristic validation. They must not be scored, repaired, or published.

### {anti-exemplar-name}

"{Anti-exemplar description or image reference.}"

Why it fails:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Validator interpretation notes

### Deterministic checks

Implement with direct pattern logic, structural checks, measurable thresholds, declared reference validation, rights lookups, metadata checks, crop checks, and image-processing metrics.

Covered by: D001, D002, D003, D004, D005, D006, D007, D008, D009, D010, D011, D012, D013, D014, D015, D016, D020

### Heuristic checks

Implement using classifiers, scorers, or model-based evaluators. Every heuristic check must return both a score and a reason. Never return a score alone.

Covered by: H001, H002, H003, H004, H005, H006, H007, H008

### Scale note for heuristic scores

All heuristic rules use a 0.0 to 1.0 scale. H005 uses `threshold: 0.70`, not a 0-100 `minimum_score`.

### Prompt-output fidelity

D016 compares structured prompt intent against structured visual output. The recommended implementation combines prompt parsing, computer-vision description, semantic-role comparison, style comparison, colour-treatment comparison, and negative-constraint checks.

Hard gates override the fidelity score.

### Likeness collision risk

H008 checks generated or edited people imagery against public figure, restricted likeness, and consented subject indexes. It is designed to reduce accidental likeness and deepfake-by-accident risk.

### Quality metrics

Compression artifact scoring should be based on SSIM, PSNR, block artifact detection, ringing artifact detection, or a declared no-reference image quality model.

### Repository fallback

Short repository outages should not paralyze the creative pipeline if a valid cache exists. Cached validation must be logged as a warning and revalidated when the repository recovers.

---

## Change log

| Version | Date | Changes |
|---|---|---|
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
- All image token references resolve to approved image sets, styles, or repository keys.
- All colour treatment references resolve to the pinned Colour Standard version.
- All rights, consent, creator, model, and release refs are anonymized UUIDs.
- No PII appears in policy metadata or telemetry.
- All responsive crop ratios pass focal subject and safe-area checks.
- Text overlays pass worst-case contrast, including gradient bounding-box checks.
- CMYK values are present or materialized with warning and human review.
- Living artist, photographer, designer, or studio style references are absent unless explicitly licensed.
- Prompt-output fidelity has been checked for generated and edited imagery.
- Likeness collision risk has been checked for generated or edited people imagery.
- Positive exemplars do not violate deterministic rules.
- Anti-exemplars are explicitly excluded from validation.
- All channel and content-type values in rules and `decision_policy` match `scope.applies_to`.
- The telemetry schema is valid and the policy key and version are attached to every validation report.