---
# =============================================================================
# BRANDO® CAMPAIGN POLICY TEMPLATE
# brando-schema-1.0 | document_type: campaign_policy
# =============================================================================
#
# PLACEHOLDER CONVENTION — READ BEFORE EDITING
# -----------------------------------------------------------------------------
# {curly_brace} placeholders must be replaced with campaign-specific content
# before this template is promoted to an active campaign policy and policy-validated.
#
# <angle_bracket> values are runtime variables resolved at validation time.
# Do NOT replace these. They are consumed by the validation engine.
#
# Quote every YAML value that contains a {curly_brace} placeholder.
# Unquoted curly braces are interpreted as flow mapping syntax and will
# cause a parse error. Quote all placeholder-containing values, including
# list items, map keys, and scalar string values.
# =============================================================================
#  -----------------------------------------------------------------------------
# DOCUMENT IDENTITY
# -----------------------------------------------------------------------------
id: "{brand_id}.campaigns.{campaign_id}"
key: "{brand_id}.campaigns.{campaign_id}"

title: "{Campaign Name} Campaign Policy"

description: |
  Time-bound campaign policy governing campaign message adaptation, visual
  treatment, temporary tokens, proof usage, channel execution, market adaptation,
  and campaign-specific overrides for {Brand Name}.

policy_kind: campaign

pillar: campaigns
category: campaign_governance
subcategory: integrated_campaign

document_type: campaign_policy
#  -----------------------------------------------------------------------------
# TEMPLATE METADATA
# -----------------------------------------------------------------------------
template:
  is_template: true
  placeholder_status: contains_placeholders
  instantiate_before_validation: true
#  -----------------------------------------------------------------------------
# VERSIONING AND LIFECYCLE
# -----------------------------------------------------------------------------
version: "1.0.0"

status: draft
lifecycle_state: proposed

effective_date: "YYYY-MM-DD"
created: "YYYY-MM-DD"
last_modified: "YYYY-MM-DD"
next_review: "YYYY-MM-DD"
#  -----------------------------------------------------------------------------
# OWNERSHIP AND APPROVAL
# -----------------------------------------------------------------------------
owner:
  team: "{Campaign Owner Team}"
  steward: "{Campaign Governance Steward}"

approved_by:
  - "{Approving Team or Role}"
#  -----------------------------------------------------------------------------
# SCHEMA METADATA
# -----------------------------------------------------------------------------
schema:
  type: BrandCampaignPolicy
  version: brando-schema-1.0
  validation_status: ready_for_validation
#  -----------------------------------------------------------------------------
# CLIENT NAMING MAP
# -----------------------------------------------------------------------------
naming:
  client_term: Campaign
  canonical_term: Campaign Policy
  policy_label: Campaign Governance
  rationale: |
    {Explain how the client names this campaign artefact and how Brando should
    map it into the canonical governance model. This field supports terminology
    mapping only. It does not affect enforcement logic.}
#  -----------------------------------------------------------------------------
# CAMPAIGN SUMMARY
# -----------------------------------------------------------------------------
campaign_summary:
  campaign_id: "{campaign_id}"
  campaign_name: "{Campaign Name}"
  parent_brand: "{Brand Name}"

  campaign_type:
    # Allowed values:
    # - brand_launch | product_launch | thought_leadership | event
    # - demand_generation | employer_brand | seasonal | partnership
    # - market_activation | retention | awareness | conversion
    value: "{campaign_type_value}"

  strategic_intent: |
    {Describe the campaign's strategic purpose, audience shift, commercial goal,
    and intended brand effect in clear language.}

  campaign_objective:
    # Allowed values:
    # - awareness | consideration | conversion | retention | advocacy
    # - registration | lead_generation | education | reputation
    primary: "{primary_campaign_objective}"
    secondary:
      - "{secondary_campaign_objective}"

  primary_kpi:
    # Allowed values:
    # - reach | impressions | engagement | click_through_rate | conversion_rate
    # - qualified_leads | registrations | pipeline_value | brand_lift
    # - sentiment | share_of_voice | retention_rate
    value: "{primary_kpi}"

  success_measures:
    - id: "{success_measure_1_id}"
      metric: "{metric_name}"
      target: "{target_value}"
      measurement_source: "{analytics_or_reporting_source}"
    - id: "{success_measure_2_id}"
      metric: "{metric_name}"
      target: "{target_value}"
      measurement_source: "{analytics_or_reporting_source}"

  flight_dates:
    start_date: "YYYY-MM-DD"
    end_date: "YYYY-MM-DD"
    timezone: "{timezone}"

  markets:
    - "{market_1_id}"
    - "{market_2_id}"

  channels:
    - website
    - linkedin
    - email
    - newsletter
    - paid_social
    - event_platform
    - sales_enablement
    - pitch_deck

  audience_segments:
    - "{audience_1_id}"
    - "{audience_2_id}"

  inherited_policy_refs:
    standards:
      brand_core: "{brand_id}.brand.core:^1.0.0"
      messaging_framework: "{brand_id}.standards.verbal-identity.messaging-framework:^1.0.0"
      tone_of_voice: "{brand_id}.standards.verbal-identity.tone-of-voice:^1.0.0"
      colour: "{brand_id}.standards.visual-identity.colour:^1.0.0"
      typography: "{brand_id}.standards.visual-identity.typography:^1.0.0"
      logo: "{brand_id}.standards.visual-identity.logo:^1.0.0"
      imagery: "{brand_id}.standards.visual-identity.imagery:^1.0.0"
      layout: "{brand_id}.standards.visual-identity.layout:^1.0.0"
      motion: "{brand_id}.standards.visual-identity.motion:^1.0.0"

    applications:
      - "{brand_id}.applications.linkedin:^1.0.0"
      - "{brand_id}.applications.website:^1.0.0"
      - "{brand_id}.applications.email:^1.0.0"
#  -----------------------------------------------------------------------------
# SCOPE
# -----------------------------------------------------------------------------
scope:
  applies_to:
    channels:
      - website
      - landing_page
      - linkedin
      - email
      - newsletter
      - paid_social
      - event_platform
      - sales_enablement
      - pitch_deck
      - proposal
      - video
      - display_ad

    content_types:
      - campaign_message
      - campaign_headline
      - campaign_subhead
      - campaign_body_copy
      - campaign_call_to_action
      - campaign_visual
      - campaign_layout
      - campaign_motion
      - paid_social_ad
      - organic_social_post
      - website_hero
      - landing_page
      - email_header
      - event_announcement
      - thought_leadership
      - economic_buyer_message
      - sales_deck
      - campaign_video
      - campaign_image
      - campaign_icon
      - campaign_illustration

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

    markets:
      - "{market_1_id}"
      - "{market_2_id}"

    content_zones:
      - rendered_copy
      - primary_message
      - secondary_message
      - call_to_action
      - logo_zone
      - visual_zone
      - legal_disclaimer
      - citation
      - quotation
      - metadata
      - platform_overlay_zone
      - safe_area

  excludes:
    content_types:
      - legal_disclaimer
      - regulated_disclosure
      - invoice
      - procurement_template

  notes:
    - Applies to generated, adapted, edited, and published campaign assets.
    - Applies to campaign-specific verbal and visual expression.
    - Does not weaken inherited legal, regulatory, accessibility, or safety policies.
    - Does not apply to quoted source material unless explicitly rewritten.
#  -----------------------------------------------------------------------------
# POLICY PRECEDENCE
# -----------------------------------------------------------------------------
policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.accessibility
    - global.regulatory
    - market.legal
    - "{brand_id}.brand.core"
    - "{brand_id}.standards.*"
    - "{brand_id}.applications.*"
    - "{brand_id}.campaigns.{campaign_id}"

  conflict_resolution:
    mode: most_restrictive_wins
    notes:
      - Campaign policies may adapt expression but must not weaken legal, regulatory, safety, accessibility, logo, or rights constraints.
      - Application policy governs channel physics and platform constraints.
      - Campaign policy governs strategic intent, temporary creative expression, campaign claims, and time-bound overrides.
      - If format constraints conflict with message length, format and comprehension win, but traceability to approved message meaning must be preserved.
      - If comprehension fails, the layout must be adapted or the message must use an approved compressed variant.
      - If legal or regulatory content conflicts with creative treatment, legal or regulatory policy wins.
#  -----------------------------------------------------------------------------
# INHERITANCE
# -----------------------------------------------------------------------------
inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
    - "{brand_id}.standards.verbal-identity.messaging-framework"
    - "{brand_id}.standards.verbal-identity.tone-of-voice"
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.visual-identity.typography"
    - "{brand_id}.standards.visual-identity.logo"
    - "{brand_id}.standards.visual-identity.imagery"
    - "{brand_id}.standards.visual-identity.layout"

  may_be_overridden_by:
    - "{brand_id}.market.*"
    - "{brand_id}.legal.*"

  campaign_may_override:
    - application_message_variant
    - campaign_headline
    - campaign_subhead
    - temporary_accent_colour
    - temporary_graphic_motif
    - temporary_motion_treatment
    - campaign_cta_variant
    - campaign_layout_variant

  campaign_may_not_override:
    - safety_policy
    - legal_policy
    - regulatory_policy
    - accessibility_minimums
    - logo_geometry
    - logo_clearspace
    - licence_terms
    - consent_requirements
    - forbidden_claim_types
    - minimum_contrast_ratios
#  -----------------------------------------------------------------------------
# RESOLUTION BEHAVIOUR
# -----------------------------------------------------------------------------
resolution:
  resolve_inheritance_before_validation: true
  resolve_application_policy_before_campaign_policy: true
  resolve_exceptions_before_rule_execution: true
  materialize_effective_policy: true

  effective_policy_output:
    include_resolved_rules: true
    include_applied_exceptions: true
    include_precedence_path: true
    include_campaign_overrides: true
    include_temporary_tokens: true
    include_market_adaptations: true
    include_channel_constraints: true
    include_claim_risk_profile: true
#  -----------------------------------------------------------------------------
# CAMPAIGN MESSAGE SYSTEM
# -----------------------------------------------------------------------------
campaign_message_system:
  campaign_positioning:
    id: campaign_positioning
    message: "{Approved campaign positioning statement.}"
    source_ref: "{brand_id}.standards.verbal-identity.messaging-framework"
    required: true

  campaign_core_message:
    id: campaign_core_message
    message: "{Approved campaign core message.}"
    source_ref: "{approved_message_source_ref}"
    proof_refs:
      - "{proof_point_1_id}"
    required: true

  campaign_message_variants:
    default:
      id: default_campaign_message
      message: "{Approved default campaign message.}"
      source_ref: "{approved_message_source_ref}"
      proof_refs:
        - "{proof_point_1_id}"

    compressed:
      id: compressed_campaign_message
      message: "{Approved compressed campaign message for constrained formats.}"
      source_ref: "{approved_message_source_ref}"
      preserves:
        - core_claim
        - audience_benefit
        - proof_requirement
        - call_to_action_intent

    short_social:
      id: short_social_campaign_message
      message: "{Approved short social campaign message.}"
      source_ref: "{approved_message_source_ref}"
      proof_refs:
        - "{proof_point_1_id}"

  campaign_claims:
    allowed:
      - id: "{claim_1_id}"
        claim_text: "{Approved campaign claim.}"
        claim_type: "{claim_type_value}"
        proof_refs:
          - "{proof_point_1_id}"
        legal_approval_ref: "{legal_approval_ref_if_required}"
        freshness_max_age_months: 24

    restricted:
      - id: "{restricted_claim_1_id}"
        claim_text: "{Restricted claim requiring approval.}"
        claim_type: "{restricted_claim_type_value}"
        proof_refs:
          - "{proof_point_2_id}"
        legal_approval_ref: "{legal_approval_ref}"

  proof_points:
    - id: "{proof_point_1_id}"
      statement: "{Approved proof point statement.}"
      source_ref: "{verified_source_ref}"
      verification_status: source_verified
      source_date: "YYYY-MM-DD"
      maximum_age_months: 24

    - id: "{proof_point_2_id}"
      statement: "{Approved proof point statement.}"
      source_ref: "{verified_source_ref}"
      verification_status: legally_approved
      source_date: "YYYY-MM-DD"
      maximum_age_months: 24

  calls_to_action:
    default:
      id: default_cta
      message: "{Approved default campaign CTA.}"
      primary_action: "{primary_action}"

    variants:
      - id: "{cta_1_id}"
        message: "{Approved CTA variant.}"
        primary_action: "{primary_action}"
        channels:
          - website
          - linkedin

      - id: "{cta_2_id}"
        message: "{Approved CTA variant.}"
        primary_action: "{primary_action}"
        channels:
          - email
          - landing_page
#  -----------------------------------------------------------------------------
# CAMPAIGN VISUAL SYSTEM
# -----------------------------------------------------------------------------
campaign_visual_system:
  creative_platform:
    concept: "{Campaign creative concept}"
    visual_metaphor: "{Campaign visual metaphor}"
    campaign_motif: "{Campaign motif or device}"
    strategic_rationale: |
      {Explain how the visual system supports the campaign's strategic intent
      without weakening the core brand system.}

  temporary_tokens:
    allowed: true
    expiry_required: true
    default_expiry: "YYYY-MM-DD"

    colours:
      - id: "{temporary_colour_token_1}"
        value_hex: "{#HEXVALUE}"
        role: accent
        source: campaign
        expires_on: "YYYY-MM-DD"
        fallback_token: "{brand_id}.standards.visual-identity.colour.primary"
        maximum_visual_area_ratio: 0.25

    graphic_motifs:
      - id: "{temporary_motif_1}"
        description: "{Approved temporary campaign motif.}"
        expires_on: "YYYY-MM-DD"
        fallback_motif: "{brand_id}.standards.visual-identity.imagery.default_motif"

  accent_to_core_ratio:
    maximum_temporary_token_area_ratio: 0.25
    minimum_core_brand_token_area_ratio: 0.50
    notes:
      - Temporary campaign tokens may add campaign flare but must not dominate the visual system.
      - Core brand recognition must remain clear in every campaign asset.

  logo_usage:
    require_core_logo_variant: true
    campaign_treatment_may_not_modify_logo_geometry: true
    logo_may_not_use_temporary_colour_unless_variant_declared: true

  imagery_direction:
    approved_subjects:
      - "{approved_subject_1}"
      - "{approved_subject_2}"
    forbidden_subjects:
      - "{forbidden_subject_1}"
      - "{forbidden_subject_2}"
    generic_stock_risk_maximum: 0.30
#  -----------------------------------------------------------------------------
# MARKET ADAPTATION POLICY
# -----------------------------------------------------------------------------
market_adaptation_policy:
  translation_mode:
    # Allowed values: direct_translation | transcreation | market_rewrite
    default: transcreation

  point_of_view_preservation_required: true
  approved_market_message_required: true

  local_legal_review_required_when:
    - regulated_claim_present
    - restricted_claim_type_present
    - market_specific_disclaimer_required

  market_variants:
    - market: "{market_1_id}"
      language: "{language_code}"
      adaptation_mode: transcreation
      approved_message_ref: "{market_message_ref_1}"
      local_reviewer: "{Market reviewer role}"
      legal_approval_ref: "{legal_approval_ref_if_required}"

    - market: "{market_2_id}"
      language: "{language_code}"
      adaptation_mode: transcreation
      approved_message_ref: "{market_message_ref_2}"
      local_reviewer: "{Market reviewer role}"
      legal_approval_ref: "{legal_approval_ref_if_required}"
#  -----------------------------------------------------------------------------
# CAMPAIGN FLIGHT POLICY
# -----------------------------------------------------------------------------
campaign_flight_policy:
  before_start_date:
    behaviour: warn_only
    allowed_use:
      - internal_preview
      - stakeholder_review
      - qa_validation

  during_flight:
    behaviour: active

  after_end_date:
    by_channel:
      paid_social: hard_fail
      display_ad: hard_fail
      paid_search: hard_fail
      website: warn_only
      landing_page: warn_only
      organic_social_post: warn_only
      newsletter: warn_only
      sales_enablement: warn_only

    default_behaviour: warn_only

  expired_campaign_assets:
    require_archive_status: true
    require_no_paid_media_spend: true
    require_redirect_or_replacement_for_landing_pages: true
#  -----------------------------------------------------------------------------
# FORMAT CONSTRAINTS
# -----------------------------------------------------------------------------
format_constraints:
  allow_external_specs: true

  external_specs:
    - id: linkedin_platform_spec
      source: "{brand_id}.specs.platforms.linkedin:^2.0.0"
      load_at_validation: true
    - id: paid_social_platform_spec
      source: "{brand_id}.specs.platforms.paid-social:^2.0.0"
      load_at_validation: true

  target_formats:
    - id: linkedin_square
      channel: linkedin
      aspect_ratio: "1:1"
      width_px: 1080
      height_px: 1080
      safe_area_ref: linkedin_platform_spec
      required_components:
        - campaign_headline
        - campaign_visual
        - logo
        - call_to_action

    - id: website_hero_desktop
      channel: website
      aspect_ratio: "16:9"
      safe_area_ref: "{brand_id}.applications.website"
      required_components:
        - campaign_headline
        - campaign_body_copy
        - campaign_visual
        - logo
        - call_to_action

    - id: mobile_story
      channel: paid_social
      aspect_ratio: "9:16"
      safe_area_ref: paid_social_platform_spec
      required_components:
        - campaign_headline
        - campaign_visual
        - logo
        - call_to_action

  multi_aspect_validation:
    required: true
    target_aspect_ratios:
      - "1:1"
      - "4:5"
      - "9:16"
      - "16:9"
#  -----------------------------------------------------------------------------
# CONSTRAINT COLLISION RESOLUTION
# -----------------------------------------------------------------------------
constraint_collision_resolution:
  default_policy: format_and_comprehension_win

  transformation_rules:
    approved_message_too_long_for_format:
      action: use_compressed_variant
      source_priority:
        - campaign_message_system.campaign_message_variants.compressed
        - campaign_message_system.campaign_message_variants.short_social
        - inherited_policy_refs.standards.messaging_framework
      preserve:
        - core_claim
        - audience_benefit
        - proof_requirement
        - legal_qualifier
        - source_ref
      require_traceability_to_original_message: true

    legal_qualifier_too_long_for_safe_area:
      action: adapt_layout_or_escalate
      may_not_remove_legal_qualifier: true

    cta_unavailable_in_format:
      action: select_channel_valid_cta_variant
      source: campaign_message_system.calls_to_action.variants

    visual_density_too_high_for_message:
      action: simplify_layout_before_changing_message
      fallback_action: use_compressed_message_variant
#  -----------------------------------------------------------------------------
# REQUIRED ELEMENTS
# -----------------------------------------------------------------------------
required_elements:
  default:
    - campaign_message_source
    - campaign_headline
    - audience_benefit
    - proof_reference
    - campaign_visual
    - logo
    - call_to_action
    - traceability_metadata

  conditional:
    - id: cta_for_conversion_kpi
      required_when:
        primary_kpi:
          - conversion_rate
          - qualified_leads
          - registrations
          - pipeline_value

    - id: proof_for_campaign_claim
      required_when:
        campaign_claim_present: true

    - id: legal_approval_for_restricted_claim
      required_when:
        restricted_claim_type_present: true

    - id: market_message_for_market_specific_output
      required_when:
        market_specific_output: true

    - id: visual_diff_for_repeated_failure
      required_when:
        retry_count_greater_than_or_equal_to: 3
#  -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
field_applicability:
  campaign_headline:
    max_words: 12
    max_characters: 80
    cta_required: false
    proof_required: false

  campaign_subhead:
    max_words: 20
    max_characters: 140
    cta_required: false
    proof_required: false

  campaign_body_copy:
    max_words: 80
    max_characters: 650
    cta_required: true
    proof_required: true

  campaign_call_to_action:
    max_words: 6
    max_characters: 40
    cta_required: false
    proof_required: false

  paid_social_ad:
    max_words: 45
    max_characters: 280
    cta_required: true
    proof_required: true

  organic_social_post:
    max_words: 80
    max_characters: 600
    cta_required: true
    proof_required: true

  website_hero:
    max_words: 60
    max_characters: 400
    cta_required: true
    proof_required: true

  landing_page:
    max_words: 600
    cta_required: true
    proof_required: true

  email_header:
    max_words: 18
    max_characters: 120
    cta_required: false
    proof_required: false

  campaign_visual:
    proof_required: false
    rights_required: true
    safe_area_required: true
    contrast_required: true

  campaign_layout:
    safe_area_required: true
    platform_overlay_validation_required: true
    reading_gravity_required: true
    maximum_visual_density_score: 0.72
#  -----------------------------------------------------------------------------
# GENERATION POLICY
# -----------------------------------------------------------------------------
generation_policy:
  ai_generation_allowed: true

  prompt_trace_required: true
  prompt_output_fidelity_required: true

  forbidden_prompt_patterns:
    - "in the style of {living_artist_or_creator}"
    - "copy {competitor_campaign_name}"
    - "make it look like {competitor_brand}"
    - "use unapproved neon accents"
    - "ignore brand guidelines"

  remediation_output_format:
    ai_agent: json
    human_reviewer: prose

  negative_prompt_generation:
    enabled: true
    source: validation_failure_reason
    include:
      - forbidden_visual_patterns
      - failed_token_usage
      - failed_claim_types
      - failed_prompt_terms
      - generic_stock_signals
    output_field: negative_prompt_suggestion
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
      description: Quoted material may retain source phrasing where required for accuracy.
      when:
        content_zone:
          - quotation
          - citation
      override:
        enforcement_mode: quoted_material_relaxed
        skip_rules:
          - D004
          - H008
          - H009
          - H010

    - id: legal_text_exception
      description: Legal or regulated text may override campaign expression where required by law or compliance.
      when:
        policy_context:
          higher_priority_policy_matches:
            - "{brand_id}.legal.*"
            - global.regulatory
      override:
        enforcement_mode: defer_to_higher_policy

    - id: temporary_campaign_token_exception
      description: Temporary campaign tokens may be used only within declared flight dates and approved channels.
      when:
        campaign_token_status:
          - approved
      override:
        enforcement_mode: temporary_token_allowed
        requirements:
          - expiry_date_required
          - fallback_token_required
          - token_usage_ratio_limit_required

    - id: legally_approved_claim_exception
      description: Restricted claims may be used when the claim, evidence, and wording have explicit legal approval.
      when:
        approval_status:
          - legally_approved
      override:
        enforcement_mode: restricted_claim_allowed
        requirements:
          - legal_approval_ref_required
          - proof_reference_required
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
    source_key: "{brand_id}.campaigns.{campaign_id}"
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
    if_exemplars_unavailable: cached_pass_with_warning
    cached_pass_max_age_seconds: 604800
    affected_rules:
      - H001
      - H004

  active_exemplar_keys:
    - "{brand_id}.campaigns.{campaign_id}.exemplar.{example_key_1}"
    - "{brand_id}.campaigns.{campaign_id}.exemplar.{example_key_2}"
#  -----------------------------------------------------------------------------
# DOCUMENT SELF-VALIDATION
# -----------------------------------------------------------------------------
document_self_validation:
  validate_yaml_structure: true
  validate_policy_references: true
  validate_campaign_dates: true
  validate_temporary_token_expiry: true
  validate_message_source_references: true
  validate_proof_source_references: true
  validate_cta_references: true
  validate_market_message_references: true
  validate_no_circular_references: true
  validate_authoritative_positive_exemplars: true

  exclude_markdown_guidance: true
  exclude_change_log: true
  exclude_comments: true
  exclude_anti_exemplars: true
  exclude_markdown_exemplar_copies: true

  notes:
    - Campaign policy validation must confirm all inherited policy references resolve.
    - Temporary tokens must have expiry dates and fallback tokens.
    - Proof references must resolve to verified proof points.
    - Market-specific outputs must resolve to approved market messages.
    - Markdown examples are excluded from rule execution.
#  -----------------------------------------------------------------------------
# CLASSIFIERS
# -----------------------------------------------------------------------------
classifiers:
  campaign_message_fit_classifier:
    description: |
      Scores whether campaign messaging preserves approved campaign intent,
      audience benefit, point of view, and source-message traceability.
    output:
      type: object
      properties:
        campaign_message_fit_score:
          type: number
        reason:
          type: string
        suggested_revision:
          type: string
    used_by_rules:
      - H001

  audience_relevance_classifier:
    description: |
      Scores whether campaign execution reflects the declared audience's needs,
      buying context, objections, and likely next step.
    output:
      type: object
      properties:
        audience_relevance_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H002

  generic_stock_risk_classifier:
    description: |
      Scores whether imagery, layout, or copy feels interchangeable, generic,
      stock-like, category-default, or weakly differentiated.
    output:
      type: object
      properties:
        generic_stock_risk_score:
          type: number
        detected_signals:
          type: array
          items:
            type: string
        reason:
          type: string
    used_by_rules:
      - H003
      - H007

  brand_recognition_classifier:
    description: |
      Scores whether the campaign asset remains recognisable as the parent brand
      after applying campaign-specific creative treatment.
    output:
      type: object
      properties:
        brand_recognition_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H004

  prompt_output_fidelity_classifier:
    description: |
      Compares the structured prompt intent against the generated output to
      determine whether the asset followed campaign, format, token, message,
      and channel instructions.
    output:
      type: object
      properties:
        prompt_output_fidelity_score:
          type: number
        failed_dimensions:
          type: array
          items:
            type: string
        negative_prompt_suggestion:
          type: string
        reason:
          type: string
    used_by_rules:
      - H005

  comprehension_risk_classifier:
    description: |
      Scores whether the asset is too visually dense, text-heavy, confusing,
      poorly sequenced, or difficult to understand in the declared format.
      Inputs include text-area ratio, graphic element count, whitespace ratio,
      focal hierarchy, CTA salience, and platform overlay interference.
    output:
      type: object
      properties:
        comprehension_risk_score:
          type: number
        visual_density_score:
          type: number
        crowded_regions:
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
              reason:
                type: string
        reason:
          type: string
    used_by_rules:
      - H006

  tone_image_alignment_classifier:
    description: |
      Scores whether imagery and visual treatment support the declared campaign
      tone, message, audience context, and strategic intent.
    output:
      type: object
      properties:
        tone_image_alignment_score:
          type: number
        generic_stock_risk_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H007

  claim_risk_classifier:
    description: |
      Classifies campaign claims by risk level, including comparative,
      market leadership, financial impact, risk reduction, compliance,
      performance, and guaranteed outcome claims.
    output:
      type: object
      properties:
        claim_type:
          type: string
        claim_risk_score:
          type: number
        legal_review_required:
          type: boolean
        reason:
          type: string
    used_by_rules:
      - H008
      - H009

  market_legal_risk_classifier:
    description: |
      Scores whether a market-specific campaign output creates local legal,
      regulatory, cultural, or claims risk.
    output:
      type: object
      properties:
        market_legal_risk_score:
          type: number
        market:
          type: string
        reason:
          type: string
    used_by_rules:
      - H009

  transcreation_fidelity_classifier:
    description: |
      Scores whether a translated or transcreated campaign output preserves the
      original campaign point of view, audience benefit, claim meaning, proof
      meaning, emotional intent, and call-to-action intent in the target market.
      This classifier evaluates meaning preservation, not literal word matching.
    output:
      type: object
      properties:
        transcreation_fidelity_score:
          type: number
        meaning_loss_detected:
          type: boolean
        affected_dimensions:
          type: array
          items:
            type: string
        reason:
          type: string
        suggested_market_revision:
          type: string
    used_by_rules:
      - H010
#  -----------------------------------------------------------------------------
# EXECUTION
# -----------------------------------------------------------------------------
execution:
  enforcement_mode: blocking

  max_retry_attempts: 3
  escalate_to_human_after: 3

  rule_id_policy:
    deterministic_pattern: "^D[0-9]{3}$"
    heuristic_pattern: "^H[0-9]{3}$"

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
      - H009
      - H010

    notes: Run deterministic rules first. Only proceed to heuristic rules if deterministic rules pass or produce soft warnings only.

  heuristic_decisioning:
    low_confidence_ignore_below: 0.60
    medium_confidence_warn_at_or_above: 0.60
    high_confidence_enforce_at_or_above: 0.85
    threshold_resolution:
      policy: per_rule_takes_precedence
      notes:
        - All heuristic scores use a 0.0 to 1.0 scale.
        - Do not use 0-100 percentage scoring in campaign heuristic rules.
        - Rule-level thresholds override global thresholds.

  retry_strategy:
    mode: targeted_repair_then_regenerate

    repair_scope:
      deterministic_failures: component_or_token_level
      heuristic_failures: asset_or_variant_level
      breakpoint_failures: adjust_spacing_tokens_before_layout_pattern_change
      layout_pattern_change: regeneration_event
      after_two_failed_repairs: full_regeneration

    repair_instruction_format:
      human_reviewer: prose
      ai_agent: json
      include_violation_id: true
      include_failing_text: true
      include_failing_component: true
      include_remediation_action: true
      include_message_source_reference: true
      include_proof_reference: true
      include_negative_prompt_suggestion: true
      include_visual_diff_when_retry_count_gte_3: true

    sequence:
      - repair_deterministic_failures
      - re-evaluate
      - repair_heuristic_weaknesses
      - re-evaluate
      - regenerate_if_still_failing
      - escalate_to_human_if_retry_limit_reached

  output_contract:
    must_pass:
      - no_hard_fail_rules
      - campaign_within_valid_flight_or_allowed_post_flight_context
      - no_unapproved_temporary_tokens
      - no_forbidden_claim_types
      - no_unresolved_proof_refs
      - no_market_message_source_missing
      - no_transcreation_fidelity_failure

    may_pass_with_warnings:
      - soft_warn_only
      - organic_post_flight_warn_only
      - cached_repository_pass_with_warning

    must_block:
      - any_hard_fail_after_max_retries
      - paid_media_after_campaign_end_date
      - forbidden_claim_type_present
      - proof_source_integrity_failed
      - legal_approval_missing
      - expired_temporary_token_used
      - market_message_source_missing
      - transcreation_fidelity_failure
#  -----------------------------------------------------------------------------
# RULES
# -----------------------------------------------------------------------------
rules:
  deterministic:
    - id: D001
      name: inherited_policy_reference_missing
      severity: hard_fail
      detect:
        method: policy_reference_check
        source: campaign_summary.inherited_policy_refs
        require_all_refs_resolvable: true
      remediation:
        action: attach_valid_inherited_policy_reference

    - id: D002
      name: required_campaign_component_missing
      severity: hard_fail
      detect:
        method: required_component_check
        source: required_elements.default
      remediation:
        action: add_missing_required_campaign_component

    - id: D003
      name: application_policy_mismatch
      severity: hard_fail
      detect:
        method: application_policy_resolution_check
        source: campaign_summary.inherited_policy_refs.applications
        require_channel_policy_match: true
      remediation:
        action: attach_correct_application_policy_or_change_channel

    - id: D004
      name: proof_reference_missing
      severity: hard_fail
      detect:
        method: proof_reference_presence_check
        required_when:
          campaign_claim_present: true
        reference_field: proof_refs
      unless_exception:
        - quote_preservation_exception
      remediation:
        action: add_proof_reference_or_remove_claim

    - id: D005
      name: call_to_action_missing_for_campaign_kpi
      severity: hard_fail
      detect:
        method: kpi_cta_presence_check
        source: campaign_summary.primary_kpi
        required_for_kpis:
          - conversion_rate
          - qualified_leads
          - registrations
          - pipeline_value
      remediation:
        action: add_campaign_cta_aligned_to_primary_kpi

    - id: D006
      name: campaign_flight_status_invalid
      severity: hard_fail
      detect:
        method: campaign_flight_date_check
        source: campaign_flight_policy
        current_date: "<current_date>"
      remediation:
        action: update_campaign_dates_archive_asset_or_remove_from_paid_distribution

    - id: D007
      name: platform_overlay_collision
      severity: hard_fail
      detect:
        method: platform_overlay_safe_area_check
        source: format_constraints
        protected_zones:
          - primary_message
          - call_to_action
          - logo_zone
          - legal_disclaimer
        dynamic_safe_area_by_channel: true
      remediation:
        action: reposition_component_outside_platform_overlay_zone

    - id: D008
      name: multi_aspect_safe_area_failed
      severity: hard_fail
      detect:
        method: multi_aspect_safe_area_check
        target_aspect_ratios_from: format_constraints.multi_aspect_validation.target_aspect_ratios
        require_all_aspects_pass: true
      remediation:
        action: adjust_crop_layout_or_component_position_for_all_target_aspects

    - id: D009
      name: traceability_metadata_missing
      severity: hard_fail
      detect:
        method: traceability_metadata_check
        required_fields:
          - policy_key
          - policy_version
          - campaign_id
          - message_source_ref
          - proof_refs
          - asset_id
          - channel
          - content_type
      remediation:
        action: attach_required_traceability_metadata

    - id: D010
      name: temporary_token_expired
      severity: hard_fail
      detect:
        method: temporary_token_expiry_check
        source: campaign_visual_system.temporary_tokens
        current_date: "<current_date>"
      remediation:
        action: replace_expired_token_with_declared_fallback_token

    - id: D011
      name: circular_reference_detected
      severity: hard_fail
      detect:
        method: graph_cycle_check
        scope:
          - campaign_message_system
          - campaign_visual_system
          - inherited_policy_refs
          - market_adaptation_policy
      remediation:
        action: remove_circular_reference_and_restore_direct_source_path

    - id: D012
      name: unauthorized_override_attempted
      severity: hard_fail
      detect:
        method: override_permission_check
        allowed_overrides_from: inheritance.campaign_may_override
        forbidden_overrides_from: inheritance.campaign_may_not_override
      remediation:
        action: remove_unauthorized_override_or_route_for_exception_approval

    - id: D013
      name: cta_inception_detected
      severity: hard_fail
      detect:
        method: recursive_cta_requirement_check
        field: campaign_call_to_action
        forbidden_condition:
          cta_required_inside_cta: true
      remediation:
        action: set_cta_required_false_for_cta_field

    - id: D014
      name: constraint_priority_unresolved
      severity: hard_fail
      detect:
        method: constraint_collision_check
        source: constraint_collision_resolution
        require_transformation_rule: true
      remediation:
        action: apply_declared_constraint_transformation_rule

    - id: D016
      name: reading_gravity_invalid
      severity: soft_warn
      detect:
        method: reading_gravity_check
        required_primary_message_zones:
          - top_left
          - focal_center
        by_format_from: format_constraints.target_formats
      remediation:
        action: reposition_primary_message_to_approved_reading_gravity_zone

    - id: D017
      name: kpi_alignment_check_failed
      severity: hard_fail
      detect:
        method: campaign_kpi_alignment_check
        source: campaign_summary.success_measures
        required_alignment_fields:
          - primary_action
          - call_to_action
          - audience_benefit
          - channel_format
        fail_when:
          conversion_kpi_without_cta: true
          awareness_kpi_without_brand_presence: true
          lead_generation_kpi_without_capture_path: true
          event_kpi_without_registration_cta: true
      remediation:
        action: align_creative_execution_to_campaign_kpi

    - id: D018
      name: proof_source_integrity_failed
      severity: hard_fail
      detect:
        method: proof_source_integrity_check
        proof_refs_from:
          - campaign_message_system.proof_points.id
          - campaign_message_system.campaign_claims.allowed.proof_refs
          - campaign_message_system.campaign_claims.restricted.proof_refs
          - campaign_summary.inherited_policy_refs.standards
        require_resolvable_source: true
        require_verification_status:
          - source_verified
          - legally_approved
        maximum_source_age_months: 24
        fail_on_hallucinated_or_unresolved_ref: true
      remediation:
        action: replace_with_verified_current_proof_or_remove_claim

    - id: D019
      name: temporary_token_usage_exceeds_campaign_limit
      severity: hard_fail
      applies_to:
        - campaign_visual
        - campaign_layout
        - paid_social_ad
        - organic_social_post
        - landing_page
        - campaign_video
      detect:
        method: visual_area_ratio_check
        token_source: campaign_visual_system.temporary_tokens
        maximum_temporary_token_area_ratio: 0.25
        minimum_core_brand_token_area_ratio: 0.50
      remediation:
        action: reduce_temporary_token_usage_and_restore_core_brand_balance

    - id: D020
      name: market_message_source_missing
      severity: hard_fail
      detect:
        method: market_message_reference_check
        required_when:
          market_specific_output: true
        source: market_adaptation_policy.market_variants
        require_approved_market_message_ref: true
      remediation:
        action: attach_approved_market_message_or_route_for_transcreation_review

  heuristic:
    - id: H001
      name: weak_campaign_message_fit
      severity: hard_fail
      detect:
        method: campaign_message_fit_classifier
        threshold: 0.85
      remediation:
        action: revise_campaign_message_to_preserve_approved_campaign_intent

    - id: H002
      name: weak_audience_relevance
      severity: soft_warn
      detect:
        method: audience_relevance_classifier
        threshold: 0.75
      remediation:
        action: align_campaign_asset_to_declared_audience_need

    - id: H003
      name: generic_campaign_execution_risk
      severity: soft_warn
      detect:
        method: generic_stock_risk_classifier
        threshold: 0.30
      remediation:
        action: replace_generic_execution_with_campaign_specific_distinctive_treatment

    - id: H004
      name: weak_brand_recognition_under_campaign_treatment
      severity: hard_fail
      detect:
        method: brand_recognition_classifier
        threshold: 0.80
      remediation:
        action: restore_core_brand_tokens_logo_presence_or_layout_structure

    - id: H005
      name: prompt_output_fidelity_failure
      severity: hard_fail
      detect:
        method: prompt_output_fidelity_classifier
        threshold: 0.85
      remediation:
        action: regenerate_with_structured_corrections_and_negative_prompt
        include_negative_prompt_suggestion: true

    - id: H006
      name: comprehension_or_visual_density_risk
      severity: soft_warn
      detect:
        method: comprehension_risk_classifier
        threshold: 0.72
        return_crowded_regions: true
      remediation:
        action: simplify_layout_reduce_density_or_use_compressed_message_variant

    - id: H007
      name: tone_image_alignment_failure
      severity: hard_fail
      detect:
        method: tone_image_alignment_classifier
        threshold: 0.80
        generic_stock_risk_must_be_below: 0.30
      remediation:
        action: replace_or_reframe_image_to_match_campaign_tone_and_message

    - id: H008
      name: restricted_claim_risk_detected
      severity: hard_fail
      detect:
        method: claim_risk_classifier
        threshold: 0.85
        fail_when:
          legal_review_required_without_approval: true
      unless_exception:
        - legally_approved_claim_exception
      remediation:
        action: add_legal_approval_or_rewrite_claim_to_lower_risk_form

    - id: H009
      name: market_legal_or_cultural_risk_detected
      severity: hard_fail
      detect:
        method: market_legal_risk_classifier
        threshold: 0.85
      remediation:
        action: route_for_market_review_or_adapt_campaign_expression

    - id: H010
      name: transcreation_fidelity_failure
      severity: hard_fail
      detect:
        method: transcreation_fidelity_classifier
        threshold: 0.85
        compare:
          - campaign_point_of_view
          - audience_benefit
          - emotional_intent
          - claim_meaning
          - proof_meaning
          - call_to_action_intent
        allow_literal_variation: true
        forbid_meaning_loss: true
      remediation:
        action: revise_market_copy_to_preserve_campaign_intent_not_literal_wording
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
    - campaign_flight_status_valid_or_warn_only
    - proof_sources_verified
    - campaign_kpi_alignment_passed

  warn_behaviour:
    auto_publish_allowed: true
    conflict_resolution:
      mode: most_restrictive_wins
      notes:
        - If any matched channel, format, claim type, market, or content type requires human sign-off, human sign-off is required.
        - Auto-publish is allowed only when no matched rule requires human sign-off.
        - Paid media may not auto-publish with unresolved warnings after campaign end date.

    requires_human_sign_off_on_warn:
      channels:
        - website
        - paid_social
        - landing_page
        - pitch_deck
        - sales_enablement
      content_types:
        - thought_leadership
        - economic_buyer_message
        - campaign_claim
        - landing_page
      claim_types:
        - restricted_claim_type
        - comparative_claim
        - market_leadership_claim
        - financial_impact_claim
      conditions:
        - retry_count >= 3
        - temporary_token_materialized
        - market_specific_output

    allows_auto_publish_on_warn:
      channels:
        - organic_social_post
        - newsletter
      content_types:
        - event_announcement
        - campaign_update

  human_review_conditions:
    - retry_count >= 3
    - unresolved_heuristic_conflict == true
    - restricted_claim_type_present == true
    - legal_review_required == true
    - transcreation_fidelity_score < 0.85
    - visual_diff_required == true
#  -----------------------------------------------------------------------------
# TELEMETRY
# -----------------------------------------------------------------------------
telemetry:
  log_policy_key: true
  log_policy_version: true
  log_campaign_id: true
  log_rule_failures: true
  log_retry_history: true
  log_exception_usage: true
  log_message_source_refs: true
  log_proof_refs: true
  log_claim_types: true
  log_temporary_token_usage: true
  log_campaign_flight_status: true
  log_market_adaptation_refs: true
  log_negative_prompt_suggestions: true
  log_pre_tolerance_values: true
  retain_validation_report: true
  output_format: json

  visual_diff:
    required_when:
      retry_count_greater_than_or_equal_to: 3
    include:
      - before_asset_ref
      - after_asset_ref
      - diff_overlay_ref
      - failed_regions
      - validator_notes

  schema:
    type: object
    properties:
      policy_key:
        type: string
      policy_version:
        type: string
      campaign_id:
        type: string
      content_id:
        type: string
      content_type:
        type: string
      channel:
        type: string
      market:
        type: string
      audience:
        type: string
      timestamp:
        type: string
        format: iso8601
      campaign_flight_status:
        type: string
      message_source_refs:
        type: array
        items:
          type: string
      proof_refs:
        type: array
        items:
          type: string
      claim_types:
        type: array
        items:
          type: string
      temporary_token_usage:
        type: array
        items:
          type: object
      negative_prompt_suggestions:
        type: array
        items:
          type: string
      visual_diff_refs:
        type: array
        items:
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
#  -----------------------------------------------------------------------------
# RELATED POLICY LINKS
# -----------------------------------------------------------------------------
related_standards:
  - "{brand_id}.brand.core"
  - "{brand_id}.standards.verbal-identity.messaging-framework"
  - "{brand_id}.standards.verbal-identity.tone-of-voice"
  - "{brand_id}.standards.visual-identity.colour"
  - "{brand_id}.standards.visual-identity.typography"
  - "{brand_id}.standards.visual-identity.logo"
  - "{brand_id}.standards.visual-identity.imagery"
  - "{brand_id}.standards.visual-identity.layout"
  - "{brand_id}.standards.visual-identity.motion"

related_applications:
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.email"
  - "{brand_id}.applications.newsletter"
  - "{brand_id}.applications.paid-social"
  - "{brand_id}.applications.sales-enablement"

---
# {Campaign Name} campaign policy

## How to complete this template

This is a Brando® Campaign Policy template. Complete the following steps before publishing.

1. Replace every `{placeholder}` value with campaign-specific content.
2. Do not replace `<runtime_variable>` values. These are resolved at validation time by the Brando engine.
3. Set `status: draft` and `lifecycle_state: proposed` on first authoring.
4. Set `schema.validation_status: ready_for_validation` on first authoring.
5. Remove optional sections that do not apply.
6. Remove the `template` metadata block before policy validation.
7. Run the publishing checklist before changing `status` to `active`.

---
## Purpose

This policy governs how the campaign adapts the core brand system across messages, visuals, formats, channels, markets, and time-bound creative expressions.

It allows campaign-specific creativity while protecting:

- brand recognition
- message integrity
- legal and regulatory safety
- accessibility
- proof and claim accuracy
- campaign flight governance
- market adaptation quality
- channel-specific execution

---
## How to interpret this policy

This policy has six layers:

1. Inherited standards define the core brand system.
2. Application policies define channel and format constraints.
3. Campaign strategy defines the temporary creative intent.
4. Campaign rules define what may be adapted.
5. Validation rules determine whether outputs pass, warn, or fail.
6. Telemetry records the evidence path for audit and improvement.

Where the YAML and this Markdown body conflict, the YAML governs.

---
## Campaign governance principle

A campaign may add flare, urgency, and contextual relevance.

It may not weaken the brand.

Temporary campaign expression must remain traceable to the parent brand system and must expire when the campaign expires.

---
## Campaign message system

Campaign messages must derive from approved sources.

Every generated or adapted campaign output should preserve:

- the approved campaign point of view
- the intended audience benefit
- the primary claim
- the required proof path
- the call-to-action intent
- the market-specific meaning, where applicable

If a format cannot support the full approved message, use the approved compressed variant. Do not invent a new message unless the policy allows it.

---
## Campaign visual system

Campaign visuals may introduce temporary campaign tokens such as accent colours, motifs, layout variants, or motion treatments.

Temporary tokens must:

- have an expiry date
- have a fallback core brand token
- remain within declared visual area limits
- not modify logo geometry
- not reduce accessibility
- not create generic stock-like execution
- not obscure the campaign message or CTA

---
## KPI alignment

Campaign creative must support the declared campaign objective.

For example:

- A conversion campaign needs a clear CTA and action path.
- An awareness campaign needs recognisable brand presence.
- A lead-generation campaign needs a capture path.
- An event campaign needs a registration or attendance action.

If the creative does not support the KPI, it fails even if it looks visually polished.

---
## Proof and claims

Campaign claims must be specific, proportionate, and supported.

Proof references must resolve to verified sources. Hallucinated proof IDs, stale evidence, unresolved references, and unsupported claims hard fail.

Restricted claims require legal approval where declared.

Forbidden claims must not be used.

---
## Translation and transcreation

Typography checks whether language renders correctly.

Campaign governance checks whether meaning survives.

Market-specific campaign outputs must preserve the campaign's point of view, audience benefit, emotional intent, claim meaning, proof meaning, and CTA intent.

Literal translation is not enough when it weakens campaign intent. Use transcreation where required.

---
## Flight dates and expiry

Campaign policy is time-bound.

Paid media after the campaign end date hard fails unless explicitly extended.

Organic and owned channels may pass with warning after the campaign end date, depending on the declared flight policy.

Temporary tokens must expire or be archived.

---
## Default execution expectations

Unless an explicit exception is declared in the YAML:

- Use approved campaign message sources.
- Use verified proof points.
- Preserve campaign intent across all formats.
- Keep CTAs aligned to the campaign KPI.
- Respect channel overlays and safe areas.
- Validate all required aspect ratios.
- Keep temporary tokens within the accent-to-core ratio.
- Preserve core brand recognition.
- Avoid generic stock-like execution.
- Preserve meaning in market adaptations.
- Attach traceability metadata to every asset.

---
## Exception model

Exceptions are allowed only when declared in the YAML `exceptions.declared` block.

Undeclared exceptions hard fail.

The standard exceptions are:

Quote preservation exception: quoted material may retain source phrasing where required for accuracy.

Legal text exception: legal or regulated text defers to higher-priority legal or regulatory policy.

Temporary campaign token exception: temporary tokens may be used only within declared scope, ratio limits, and expiry windows.

Legally approved claim exception: restricted claims may be used only when the claim, evidence, and wording have explicit legal approval.

---
## Validator interpretation notes
### Deterministic checks

Deterministic checks use direct references, structural checks, measurable thresholds, campaign dates, token expiry, proof source resolution, safe-area validation, and declared source paths.

Covered by: D001-D020.
### Heuristic checks

Heuristic checks use classifiers or model-based evaluators.

Covered by: H001-H010.

All heuristic rules use a 0.0 to 1.0 score scale.
### Prompt-output fidelity

If prompt-output fidelity fails, the validator should produce a structured failure reason and a negative prompt suggestion. This allows an AI generator to avoid repeating the same failure in the next attempt.
### Targeted repair

For breakpoint or layout failures, adjust spacing and placement tokens before changing the layout pattern.

Changing the layout pattern is a regeneration event, not a minor repair.
### Human review

If retry count reaches three, telemetry must include a visual diff where a visual output exists. The reviewer should be able to see what the system attempted and where it failed.

---
## Change log

| Version | Date       | Changes                    |
|---------|------------|----------------------------|
| 1.0.0   | YYYY-MM-DD | Initial published version. |

---
## Validation modes

This file can be validated in two modes.

Template validation: validates the structure of this reusable template. In this mode, the validator recognises `template.is_template: true` and does not require placeholder substitution.

Policy validation: validates an instantiated campaign policy. In this mode, all `{placeholder}` values and `YYYY-MM-DD` date placeholders must be replaced, and the `template` metadata block must be removed.

---
## Publishing checklist

Before publication, confirm:

- All `{placeholder}` values have been replaced.
- All `YYYY-MM-DD` date placeholders have been replaced.
- No `<runtime_variable>` values have been replaced.
- The `template` metadata block has been removed.
- The YAML parses successfully.
- The campaign flight dates are valid.
- Inherited standards resolve.
- Application policies resolve.
- Campaign message sources resolve.
- Proof references resolve and are current.
- Temporary tokens have expiry dates and fallback tokens.
- Restricted claims have required approvals.
- Market adaptations have approved market message references.
- CTAs align with declared KPIs.
- Platform overlays and safe areas have been checked.
- Multi-aspect validation has passed.
- Campaign visual treatment preserves core brand recognition.
- Negative prompt suggestions are generated for prompt-output fidelity failures.
- Visual diff telemetry is attached after three failed retries.
- The telemetry schema is valid and attached to every validation report.
