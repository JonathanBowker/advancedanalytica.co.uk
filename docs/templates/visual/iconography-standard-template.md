---
# =============================================================================
# BRANDO® ICONOGRAPHY STANDARD TEMPLATE
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
# Fields that commonly contain long prose and placeholders, such as description
# and naming.rationale, should use YAML block scalar style (|) or a fully quoted
# scalar. This template uses block scalar style for those fields to reduce
# accidental flow-mapping parse errors during editing.
# =============================================================================

# -----------------------------------------------------------------------------
# DOCUMENT IDENTITY
# -----------------------------------------------------------------------------
# Required. Stable, globally unique identifier for this policy.
# Recommended pattern: {brand_id}.standards.visual-identity.iconography
id: "{brand_id}.standards.visual-identity.iconography"

# Required. Usually mirrors id. Use as the stable lookup key in policy
# repositories, MCP servers, APIs, and audit logs.
key: "{brand_id}.standards.visual-identity.iconography"

# Required. Human-readable title.
title: "{Brand Name} Iconography"

# Required. Short description used in repositories, UIs, search, and audit logs.
description: |
  Core iconography standard governing icon style, icon tokens, semantic usage, accessibility, sizing, colour application, and repository governance across {Brand Name} communications and interfaces.

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
subcategory: iconography

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
  type: BrandIconographyStandard

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
  client_term: Iconography

  # The Brando category this standard sits within.
  canonical_term: Visual Identity

  # The specific standard label within that category.
  policy_label: Iconography

  # Use literal block scalar style so placeholder braces in prose cannot be
  # misread as YAML flow mappings during template editing.
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
    # Required. Distribution, publishing, product, or production environments.
    # Do not mix channels with asset or component types in this list.
    channels:
      - website
      - product_ui
      - mobile_app
      - email
      - newsletter
      - linkedin
      - social_media
      - pitch_deck
      - sales_enablement
      - document_template
      - event_platform
      - signage

    # Required. Icon asset types, icon components, or output formats governed by this policy.
    # Composite outputs such as websites, pitch decks, product screens, and campaigns
    # should be decomposed into governed icon components before rule execution.
    content_types:
      - icon
      - icon_set
      - functional_icon
      - navigation_icon
      - interactive_icon
      - decorative_icon
      - illustrative_icon
      - status_icon
      - product_icon
      - social_icon
      - partner_icon
      - logo_mark_adjacent_icon
      - favicon
      - app_icon
      - file_icon
      - diagram_icon
      - presentation_icon
      - ui_component_icon

    # Recommended. Audience or persona types for icon adaptation.
    audiences:
      - designer
      - developer
      - content_creator
      - product_manager
      - marketing_manager
      - sales
      - accessibility_reviewer
      - new_hire
      - ai_agent

    # Recommended. Zones within visual output.
    # Useful for excluding third-party marks, quoted screenshots, legal symbols, or metadata.
    content_zones:
      - rendered_asset
      - source_file
      - metadata
      - decorative_layer
      - interactive_control
      - navigational_ui
      - screenshot
      - third_party_brand_asset
      - legal_or_regulatory_symbol

  # Recommended. Explicitly excluded contexts.
  excludes:
    content_types:
      - third_party_logo
      - client_supplied_icon
      - legal_certification_mark
      - stock_illustration
      - map_marker_from_platform_sdk
    content_zones:
      - screenshot
      - third_party_brand_asset
      - legal_or_regulatory_symbol

  # Recommended. Human-readable scope clarifications.
  notes:
    - Applies to generated, selected, edited, exported, and implemented icon assets.
    - Applies to source icons, rendered icons, and icon metadata used by design systems or code components.
    - Does not apply to third-party brand marks unless those assets are modified or restyled.
    - Does not replace accessibility, legal, or platform policies where those policies impose stricter requirements.

# -----------------------------------------------------------------------------
# POLICY PRECEDENCE
# -----------------------------------------------------------------------------
# Recommended. Defines how this policy behaves when other policies also apply.
policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.accessibility
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - "{brand_id}.standards.visual-identity.colour:^1.0.0"
    - "{brand_id}.standards.visual-identity.logo"
    - "{brand_id}.standards.visual-identity.iconography"
    - "{brand_id}.applications.*"
    - campaign.local

  conflict_resolution:
    # Allowed values:
    # - higher_priority_wins | most_restrictive_wins | explicit_exception_required
    mode: higher_priority_wins
    notes:
      - Colour and accessibility requirements may override icon styling preferences where contrast, safety, or legibility is affected.
      - Logo and third-party brand mark rules override iconography rules for protected marks.
      - Application-specific policy may narrow this standard only within its declared scope.
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
    - "{brand_id}.applications.product-ui"
    - "{brand_id}.applications.mobile-app"
    - "{brand_id}.applications.pitch-deck"
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
    include_resolved_icon_tokens: true
    include_resolved_colour_refs: true
    include_accessibility_requirements: true

# -----------------------------------------------------------------------------
# ICONOGRAPHY PRINCIPLES
# -----------------------------------------------------------------------------
# Required. Three to five principles is usually enough.
# Keep descriptions to one clear sentence each.
principles:
  required:
    - "{iconography_principle_1}"
    - "{iconography_principle_2}"
    - "{iconography_principle_3}"
  definitions:
    # Map keys containing placeholders must be quoted to remain valid YAML.
    "{iconography_principle_1}":
      description: "{Describe iconography principle 1 in one clear sentence.}"
    "{iconography_principle_2}":
      description: "{Describe iconography principle 2 in one clear sentence.}"
    "{iconography_principle_3}":
      description: "{Describe iconography principle 3 in one clear sentence.}"

# -----------------------------------------------------------------------------
# ICONOGRAPHY POLICY
# -----------------------------------------------------------------------------
# Required. Defines what icons must do and how they must behave.
iconography_policy:
  objectives:
    required:
      - communicate_meaning_quickly
      - support_user_navigation_and_comprehension
      - maintain_visual_consistency
      - preserve_accessibility
      - integrate_with_colour_and_layout_systems

  style_characteristics:
    required:
      - simple
      - clear
      - consistent
      - purposeful
      - scalable
      - accessible
    discouraged:
      - decorative_complexity
      - mixed_visual_styles
      - ambiguous_metaphors
      - off_brand_stock_icon_style
      - unnecessary_3d_or_photoreal_detail
      - inconsistent_stroke_or_corner_radius

  construction:
    grid:
      default_required: true
      default_grid_size: "{default_icon_grid_size}"
      allowed_grid_sizes:
        - "{icon_grid_size_1}"
        - "{icon_grid_size_2}"
        - "{icon_grid_size_3}"
      pixel_snap_required: true
    stroke:
      default_required: true
      default_stroke_width: "{default_stroke_width}"
      allowed_stroke_widths:
        - "{stroke_width_1}"
        - "{stroke_width_2}"
      terminal_style: "{terminal_style_value}"
      join_style: "{join_style_value}"
    shape_language:
      corner_radius: "{corner_radius_value}"
      perspective: flat_front_on
      fill_style_default: outline
      allowed_fill_styles:
        - outline
        - filled
        - duotone
      forbidden_styles:
        - photorealistic
        - skeuomorphic
        - inconsistent_mixed_style
        - unapproved_emoji_style
    detail:
      maximum_detail_level: "{maximum_detail_level_value}"
      small_size_simplification_required: true

  colour_usage:
    # Colour values must resolve through the Colour Standard rather than being hard-coded.
    # The dependency may be pinned with a semver range so breaking Colour Standard
    # releases do not silently change icon validation behaviour.
    colour_standard_ref: "{brand_id}.standards.visual-identity.colour:^1.0.0"
    dependency_resolution:
      require_compatible_major_version: true
      breaking_change_behaviour: hard_fail_until_reviewed
    default_icon_colour_ref: "{default_icon_colour_token}"
    default_inverse_icon_colour_ref: "{default_inverse_icon_colour_token}"
    allowed_colour_roles:
      - icon_primary
      - icon_secondary
      - icon_inverse
      - icon_disabled
      - icon_success
      - icon_warning
      - icon_error
      - icon_info
    forbidden_colour_usage:
      - unapproved_hex_value
      - colour_used_without_token_ref
      - low_contrast_meaningful_icon
      - status_colour_without_semantic_reason

  accessibility:
    meaningful_icons_require_accessible_name: true
    decorative_icons_must_be_hidden_from_assistive_technology: true
    interactive_icons_require_visible_or_programmatic_label: true
    status_icons_require_text_or_label_redundancy: true
    minimum_contrast_ratio_for_meaningful_icons: 3.0
    contrast_source: "{brand_id}.standards.visual-identity.colour:^1.0.0"

# -----------------------------------------------------------------------------
# ICON TOKENS
# -----------------------------------------------------------------------------
# Required. Defines approved icon tokens, styles, sizes, and semantic roles.
# Replace all placeholder entries before policy validation.
icon_tokens:
  icon_sets:
    primary:
      id: primary_icon_set
      label: Primary Icon Set
      repository_ref: "{primary_icon_repository_ref}"
      required: true
      allowed_file_formats:
        - svg
        - png
      preferred_file_format: svg

    utility:
      id: utility_icon_set
      label: Utility Icon Set
      repository_ref: "{utility_icon_repository_ref}"
      required: false
      allowed_file_formats:
        - svg
        - png
      preferred_file_format: svg

    status:
      id: status_icon_set
      label: Status Icon Set
      repository_ref: "{status_icon_repository_ref}"
      required: false
      allowed_file_formats:
        - svg
        - png
      preferred_file_format: svg

  size_tokens:
    - id: icon_xs
      label: Extra Small
      size_px: 12
      allowed_usage:
        - dense_ui
        - metadata
    - id: icon_sm
      label: Small
      size_px: 16
      allowed_usage:
        - navigation_icon
        - inline_ui
        - status_icon
    - id: icon_md
      label: Medium
      size_px: 24
      allowed_usage:
        - functional_icon
        - interactive_icon
        - presentation_icon
    - id: icon_lg
      label: Large
      size_px: 32
      allowed_usage:
        - feature_icon
        - diagram_icon
    - id: icon_xl
      label: Extra Large
      size_px: 48
      allowed_usage:
        - illustrative_icon
        - hero_support_icon

  colour_tokens:
    - id: icon_primary
      colour_ref: "{brand_id}.standards.visual-identity.colour.tokens.icon_primary"
      usage: default_meaningful_icon
    - id: icon_secondary
      colour_ref: "{brand_id}.standards.visual-identity.colour.tokens.icon_secondary"
      usage: supporting_icon
    - id: icon_inverse
      colour_ref: "{brand_id}.standards.visual-identity.colour.tokens.icon_inverse"
      usage: icon_on_dark_or_brand_background
    - id: icon_disabled
      colour_ref: "{brand_id}.standards.visual-identity.colour.tokens.icon_disabled"
      usage: inactive_or_unavailable_ui
    - id: icon_success
      colour_ref: "{brand_id}.standards.visual-identity.colour.tokens.success"
      usage: success_status_only
    - id: icon_warning
      colour_ref: "{brand_id}.standards.visual-identity.colour.tokens.warning"
      usage: warning_status_only
    - id: icon_error
      colour_ref: "{brand_id}.standards.visual-identity.colour.tokens.error"
      usage: error_status_only
    - id: icon_info
      colour_ref: "{brand_id}.standards.visual-identity.colour.tokens.info"
      usage: informational_status_only

  semantic_roles:
    - id: navigation
      description: Icons that support wayfinding or movement through an interface.
      allowed_content_types:
        - navigation_icon
        - interactive_icon
    - id: action
      description: Icons that trigger or represent a user action.
      allowed_content_types:
        - functional_icon
        - interactive_icon
    - id: status
      description: Icons that communicate a state, warning, confirmation, or error.
      allowed_content_types:
        - status_icon
    - id: decoration
      description: Icons used only for visual texture or emphasis and not required for understanding.
      allowed_content_types:
        - decorative_icon
    - id: illustration_support
      description: Larger icons that support a message, feature, diagram, or presentation section.
      allowed_content_types:
        - illustrative_icon
        - diagram_icon
        - presentation_icon

# -----------------------------------------------------------------------------
# ICON REPOSITORY
# -----------------------------------------------------------------------------
# Recommended. Defines where authoritative icon assets are stored and retrieved.
icon_repository:
  storage:
    # Allowed values: inline | referenced | external_repository
    mode: referenced
    source_key: "{brand_id}.standards.visual-identity.iconography"
    section: icons
    load_at_validation: true
    retrieval:
      # Allowed protocol values:
      # - brando_policy_repo | local_file | http | mcp_resource | design_system_registry
      protocol: brando_policy_repo
      base_path: /policies/icons/
      # <icon_key> is a runtime variable resolved at validation time.
      # Do NOT replace this. It is not a template fill-in placeholder.
      key_format: "<icon_key>.svg"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 300

  fallback_behaviour:
    # Avoid global build failures caused by short repository outages.
    # Use a cached approved asset during the grace period, then hard fail if
    # the icon cannot be resolved or no trusted cache exists.
    if_icon_unavailable: cached_pass_with_warning
    cache_grace_period_seconds: 86400
    require_cache_integrity_check: true
    hard_fail_if_no_trusted_cache: true
    hard_fail_after_grace_period: true
    affected_rules:
      - D001
      - D002
      - D012
      - D014

  active_icon_keys:
    - "{brand_id}.standards.visual-identity.iconography.icon.{icon_key_1}"
    - "{brand_id}.standards.visual-identity.iconography.icon.{icon_key_2}"

# -----------------------------------------------------------------------------
# ICON NAMING POLICY
# -----------------------------------------------------------------------------
# Recommended. Keeps icon assets discoverable and machine-addressable.
icon_naming_policy:
  required_pattern: "^[a-z0-9]+(-[a-z0-9]+)*$"
  allowed_name_components:
    - semantic_action
    - object
    - state
    - size_token
    - variant
  forbidden_name_components:
    - designer_name
    - temporary_label
    - final_final
    - vague_descriptor
  examples:
    pass:
      - arrow-right
      - download-file
      - status-warning
    fail:
      - JonIcon01
      - final-final-icon
      - nice-shape

# -----------------------------------------------------------------------------
# PATTERN POLICY
# -----------------------------------------------------------------------------
# Recommended. Defines reusable icon and visual pattern constraints.
# Rules reference patterns by id, not by list index.
pattern_policy:
  forbidden_patterns:
    - id: mixed_stroke_weights
      description: Do not mix stroke weights within the same icon unless explicitly declared as an approved variant.
      examples:
        fail:
          - "An outline icon combines 1px and 3px strokes without an approved emphasis rule."
        pass:
          - "All strokes use the declared default stroke width."

    - id: unapproved_stock_style
      description: Do not use generic stock icon styles that conflict with the approved brand icon system.
      examples:
        fail:
          - "A glossy 3D stock cloud icon appears beside flat outline icons."
        pass:
          - "A flat cloud icon follows the approved grid, stroke, and corner radius."

    - id: ambiguous_metaphor
      description: Avoid icons whose metaphor can be misunderstood without supporting text.
      examples:
        fail:
          - "A lightning bolt is used to mean governance approval."
        pass:
          - "A checkmark in a shield is used to mean governed approval."

    - id: decorative_complexity
      description: Avoid unnecessary detail that collapses or becomes illegible at the smallest approved size.
      examples:
        fail:
          - "A 16px icon contains fine internal lines that disappear when rendered."
        pass:
          - "A simplified 16px variant preserves the recognisable silhouette."

# -----------------------------------------------------------------------------
# REQUIRED ELEMENTS
# -----------------------------------------------------------------------------
# Recommended. Defines metadata and visual properties every governed icon should include.
required_elements:
  default:
    - approved_icon_source
    - icon_key
    - semantic_role
    - size_token
    - colour_token
    - file_format
    - accessibility_role
  conditional:
    - id: accessible_name_for_meaningful_icon
      required_when:
        meaningful_icon: true
    - id: hidden_state_for_decorative_icon
      required_when:
        decorative_icon: true
    - id: programmatic_label_for_interactive_icon
      required_when:
        interactive_icon: true
    - id: status_text_for_status_icon
      required_when:
        semantic_role: status
    - id: contrast_check_for_meaningful_icon
      required_when:
        meaningful_icon: true
    - id: vector_source_for_scalable_context
      required_when:
        scalable_context: true

# -----------------------------------------------------------------------------
# FIELD APPLICABILITY
# -----------------------------------------------------------------------------
# Required if different icon types need different thresholds or checks.
# Every content_type in scope.applies_to.content_types that requires field-level
# threshold checking must have an entry here. Missing entries should produce a
# schema warning or validation error.
field_applicability:
  icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: contextual
    contrast_required: true
    minimum_contrast_ratio: 3.0

  functional_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: true
    contrast_required: true
    minimum_contrast_ratio: 3.0

  navigation_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: true
    contrast_required: true
    minimum_contrast_ratio: 3.0

  interactive_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: true
    visible_or_programmatic_label_required: true
    contrast_required: true
    minimum_contrast_ratio: 3.0

  decorative_icon:
    approved_source_required: true
    vector_required: false
    accessible_name_required: false
    assistive_technology_hidden_required: true
    contrast_required: false

  illustrative_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: contextual
    contrast_required: true
    minimum_contrast_ratio: 3.0

  status_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: true
    redundant_text_required: true
    contrast_required: true
    minimum_contrast_ratio: 3.0

  product_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: true
    contrast_required: true
    minimum_contrast_ratio: 3.0

  social_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: true
    contrast_required: true
    minimum_contrast_ratio: 3.0

  partner_icon:
    approved_source_required: false
    vector_required: contextual
    accessible_name_required: true
    contrast_required: contextual

  logo_mark_adjacent_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: contextual
    contrast_required: true
    minimum_clear_space_required: true

  favicon:
    approved_source_required: true
    vector_required: false
    accessible_name_required: false
    contrast_required: true
    small_size_simplification_required: true

  app_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: false
    platform_export_required: true
    small_size_simplification_required: true

  file_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: true
    contrast_required: true
    minimum_contrast_ratio: 3.0

  diagram_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: contextual
    contrast_required: true
    minimum_contrast_ratio: 3.0

  presentation_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: contextual
    contrast_required: true
    minimum_contrast_ratio: 3.0

  ui_component_icon:
    approved_source_required: true
    vector_required: true
    accessible_name_required: contextual
    contrast_required: true
    minimum_contrast_ratio: 3.0

# -----------------------------------------------------------------------------
# PERSONA PROFILES
# -----------------------------------------------------------------------------
# Optional. Use when the same standard needs slightly different behaviour
# for designers, developers, content creators, accessibility reviewers, or AI agents.
persona_profiles:
  designer:
    iconography_adjustment: design_system_authoring
  developer:
    iconography_adjustment: implementation_and_metadata_accuracy
  content_creator:
    iconography_adjustment: approved_asset_selection
  product_manager:
    iconography_adjustment: semantic_fit_and_user_task_clarity
  marketing_manager:
    iconography_adjustment: campaign_and_channel_consistency
  sales:
    iconography_adjustment: presentation_and_enablement_consistency
  accessibility_reviewer:
    iconography_adjustment: accessibility_first_review
  new_hire:
    iconography_adjustment: explanatory
  ai_agent:
    iconography_adjustment: strict_constraint_enforcement

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
    - id: decorative_icon_exception
      description: Decorative icons may be hidden from assistive technology and do not require an accessible name, provided they do not communicate meaning or trigger an action.
      when:
        content_type:
          - decorative_icon
        semantic_role:
          - decoration
      override:
        enforcement_mode: decorative_icon_relaxed
        skip_rules:
          - D008
          - H005
        requirements:
          - assistive_technology_hidden_required
          - no_unique_meaning_conveyed

    - id: third_party_platform_icon_exception
      description: Third-party platform icons may retain their required brand style where platform or partner guidelines require it.
      when:
        content_zone:
          - third_party_brand_asset
        content_type:
          - partner_icon
          - social_icon
      override:
        enforcement_mode: defer_to_third_party_brand_guidelines
        requirements:
          - source_guideline_ref_required
          - no_unapproved_restyling

    - id: legal_or_regulatory_symbol_exception
      description: Legal, regulatory, certification, or safety symbols may override icon style preferences where required by law, platform policy, or certification rules.
      when:
        content_zone:
          - legal_or_regulatory_symbol
      override:
        enforcement_mode: defer_to_higher_policy

    - id: legacy_icon_exception
      description: Legacy icons may remain temporarily in approved live assets when replacement would create implementation risk, provided a migration plan exists.
      when:
        lifecycle_state:
          - superseded
        approval_status:
          - migration_approved
      override:
        enforcement_mode: temporary_legacy_tolerance
        requirements:
          - migration_plan_ref_required
          - retirement_date_required
          - exception_expiry_required

# -----------------------------------------------------------------------------
# EXEMPLARS
# -----------------------------------------------------------------------------
# Recommended. Positive examples for human guidance and semantic scoring.
exemplars:
  minimum_review_count: 2

  # Markdown exemplar copies in the document body are for humans only.
  # Authoritative exemplar assets are retrieved from the policy repository.
  # Validators must use repository versions, not Markdown copies.
  markdown_examples:
    role: human_readable_copy
    authoritative: false
    excluded_from_validation: true

  storage:
    # Allowed values: inline | referenced | external_repository
    mode: referenced
    source_key: "{brand_id}.standards.visual-identity.iconography"
    section: exemplars
    load_at_validation: true
    retrieval:
      # Allowed protocol values:
      # - brando_policy_repo | local_file | http | mcp_resource | design_system_registry
      protocol: brando_policy_repo
      base_path: /policies/iconography/exemplars/
      # <exemplar_key> is a runtime variable resolved at validation time.
      # Do NOT replace this. It is not a template fill-in placeholder.
      key_format: "<exemplar_key>.md"
      auth: service_account
      timeout_seconds: 5
      cache_ttl_seconds: 300

  fallback_behaviour:
    if_exemplars_unavailable: skip_rule_with_warning
    affected_rules:
      - H004

  active_exemplar_keys:
    - "{brand_id}.standards.visual-identity.iconography.exemplar.{example_key_1}"
    - "{brand_id}.standards.visual-identity.iconography.exemplar.{example_key_2}"

  source_contexts:
    channels:
      - website
      - product_ui
      - mobile_app
      - pitch_deck
      - sales_enablement
    content_types:
      - functional_icon
      - navigation_icon
      - interactive_icon
      - status_icon
      - illustrative_icon
      - diagram_icon

# -----------------------------------------------------------------------------
# COMPETITIVE DIFFERENTIATION
# -----------------------------------------------------------------------------
# Optional. Helps human reviewers understand contrastive visual positioning.
competitive_differentiation:
  competitors:
    - "{competitor_1}"
    - "{competitor_2}"
  category_norms_to_avoid:
    - "{Generic icon style, metaphor, or visual pattern to avoid}"
  differentiators:
    - "{Differentiator 1}"
    - "{Differentiator 2}"

# -----------------------------------------------------------------------------
# ANTI-EXEMPLARS
# -----------------------------------------------------------------------------
# Optional. Negative examples for human review only.
# Anti-exemplars are excluded from all deterministic and heuristic validation.
# They must not be scored, repaired, or used as training signal unless a rule
# explicitly declares them as an input source.
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
  # Validate YAML structure, rule ID patterns, path references, declared values,
  # and key consistency. Does NOT mean: run icon rules over the YAML text itself.
  validate_yaml_structure: true

  # Validate authoritative positive exemplars retrieved from the policy repository.
  # Does NOT apply to Markdown exemplar copies in the document body.
  validate_authoritative_positive_exemplars: true

  # Validate that every icon key, icon set, size token, colour token, semantic role,
  # and repository reference resolves to a declared entry.
  validate_icon_token_references: true

  # Validate that colour refs point to declared colour tokens in the Colour Standard.
  validate_colour_token_references: true

  # Validate icon alias and token dependency graphs for cycles.
  validate_icon_reference_graph: true

  # Validate that declared semantic roles are allowed for each content type.
  validate_semantic_type_pairings: true

  # Validate that repository icons are mapped to active keys or semantic roles.
  validate_orphaned_icon_tokens: true

  # Exclude the Markdown body guidance text from rule execution.
  exclude_markdown_guidance: true

  # Exclude the change log table from rule execution.
  exclude_change_log: true

  # Exclude YAML comments from rule execution. Comments are stripped before parsing.
  exclude_comments: true

  # Exclude anti-exemplar copy from rule execution.
  # See anti_exemplars.excluded_from_deterministic_validation.
  exclude_anti_exemplars: true

  # Exclude the human-readable Markdown copies of exemplars from rule execution.
  # Authoritative exemplar assets live in the repository.
  exclude_markdown_exemplar_copies: true

  notes:
    - validate_authoritative_positive_exemplars applies only to repository exemplars retrieved via exemplars.storage.retrieval.
    - Icon token references include icon set ids, icon keys, size tokens, colour tokens, semantic roles, and repository refs.
    - Colour token references resolve through the related Colour Standard.
    - Icon reference graphs must be acyclic to prevent alias loops or recursive token resolution.
    - Semantic role and content type pairings must be consistent with icon_tokens.semantic_roles.allowed_content_types.
    - Orphaned icon tokens should be reviewed so unused or unmapped assets do not accumulate in the repository.
    - Markdown exemplar copies are excluded per exemplars.markdown_examples.excluded_from_validation.
    - Anti-exemplars are excluded per anti_exemplars.excluded_from_deterministic_validation.
    - YAML comments are excluded as they are stripped before rule execution.

# -----------------------------------------------------------------------------
# CLASSIFIERS
# -----------------------------------------------------------------------------
# Optional. Declare any judgement-based classifiers required by heuristic rules.
# Any classifier referenced in a rule's detect.requires_classifier field
# must have a full specification entry here.
classifiers:
  semantic_fit_classifier:
    description: >
      Scores whether an icon's metaphor, semantic role, label, and usage context
      align with the intended user meaning or communication goal.
    output:
      type: object
      properties:
        semantic_fit_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H001

  visual_consistency_classifier:
    description: >
      Scores whether an icon matches the approved brand icon style, including
      stroke, geometry, detail level, fill style, and relationship to surrounding icons.
    output:
      type: object
      properties:
        visual_consistency_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H002

  small_size_legibility_classifier:
    description: >
      Scores whether an icon remains legible and recognisable at the smallest
      declared size for its intended context.
    output:
      type: object
      properties:
        small_size_legibility_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H003

  accessibility_label_quality_classifier:
    description: >
      Scores whether the accessible name or hidden state correctly matches the
      icon's role, meaning, and interaction context.
    output:
      type: object
      properties:
        accessibility_label_quality_score:
          type: number
        reason:
          type: string
    used_by_rules:
      - H005

# -----------------------------------------------------------------------------
# EXECUTION
# -----------------------------------------------------------------------------
# Required for executable validation.
execution:
  # Allowed values: blocking | advisory | audit_only
  enforcement_mode: blocking

  max_retry_attempts: 3
  escalate_to_human_after: 3

  # Declares the valid ID pattern for each rule phase.
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
    phase_2_heuristic:
      - H001
      - H002
      - H003
      - H004
      - H005
    notes: Run all deterministic rules first. Only proceed to heuristic rules if all deterministic rules pass or produce soft warnings only.

  heuristic_decisioning:
    low_confidence_ignore_below: 0.60
    medium_confidence_warn_at_or_above: 0.60
    high_confidence_enforce_at_or_above: 0.85
    threshold_resolution:
      policy: per_rule_takes_precedence
      notes:
        - Where a rule declares its own threshold, that value governs for that rule.
        - All heuristic rules use a 0.0-1.0 probability or score scale. Do not introduce 0-100 rule scales.

  retry_strategy:
    mode: targeted_repair_then_regenerate
    repair_scope:
      deterministic_failures: icon_asset_or_metadata_level
      heuristic_failures: icon_asset_or_icon_set_level
      after_two_failed_repairs: full_regeneration_or_asset_reselection
    repair_instruction_format:
      include_violation_id: true
      include_failing_asset_ref: true
      include_failing_property: true
      include_remediation_action: true
      include_icon_token_reference: true
      include_colour_token_reference: true
    sequence:
      - repair_deterministic_failures
      - re-evaluate
      - repair_heuristic_weaknesses
      - re-evaluate
      - regenerate_or_reselect_if_still_failing

  output_contract:
    must_pass:
      - no_hard_fail_rules
    may_pass_with_warnings:
      - soft_warn_only
    must_block:
      - any_hard_fail_after_max_retries
      - unapproved_icon_source
      - required_accessible_name_missing
      - contrast_requirement_failed
      - circular_reference_detected

# -----------------------------------------------------------------------------
# RULES
# -----------------------------------------------------------------------------
# Required. Rules are executable validation checks.
# Rules reference token and pattern entries by id, not by list index.
rules:
  deterministic:
    - id: D001
      name: approved_icon_source_missing
      severity: hard_fail
      applies_to:
        - icon
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: structural_reference
        required_reference_field: icon_key
        allowed_reference_sources:
          - icon_repository.active_icon_keys
          - icon_tokens.icon_sets.primary.repository_ref
          - icon_tokens.icon_sets.utility.repository_ref
          - icon_tokens.icon_sets.status.repository_ref
      remediation:
        action: replace_with_approved_icon_or_create_exception

    - id: D002
      name: unsupported_file_format_used
      severity: hard_fail
      applies_to:
        - icon
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - partner_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: enum_check
        field: file_format
        allowed_values_from: icon_tokens.icon_sets.*.allowed_file_formats
      remediation:
        action: export_or_select_supported_file_format

    - id: D003
      name: size_token_invalid
      severity: hard_fail
      applies_to:
        - icon
        - functional_icon
        - navigation_icon
        - interactive_icon
        - decorative_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - favicon
        - app_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: token_reference_check
        field: size_token
        allowed_ids_from: icon_tokens.size_tokens.id
      remediation:
        action: replace_with_declared_size_token

    - id: D004
      name: colour_token_invalid
      severity: hard_fail
      applies_to:
        - icon
        - functional_icon
        - navigation_icon
        - interactive_icon
        - decorative_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: token_reference_check
        field: colour_token
        allowed_ids_from: icon_tokens.colour_tokens.id
        related_policy_ref: "{brand_id}.standards.visual-identity.colour:^1.0.0"
      remediation:
        action: replace_with_approved_colour_token

    - id: D005
      name: icon_contrast_requirement_failed
      severity: hard_fail
      applies_to:
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: contrast_check
        contrast_ratio_from_field_applicability: minimum_contrast_ratio
        foreground_from: colour_token
        background_from: resolved_background_colour
        resolve_colour_tokens_before_check: true
        resolve_gradient_before_check: true
        gradient_check_mode: worst_case_within_icon_bounding_box
        notes:
          - When checking gradients, contrast must be validated against the lowest-contrast point of the gradient area covered by the icon bounding box.
          - Meaningful icons must not rely on colour contrast assumptions from only one sampled background point.
      when:
        contrast_required: true
      unless_exception:
        - decorative_icon_exception
        - legal_or_regulatory_symbol_exception
      remediation:
        action: adjust_colour_token_background_or_icon_treatment

    - id: D006
      name: stroke_weight_invalid
      severity: hard_fail
      applies_to:
        - icon
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: numeric_or_token_value_check
        field: stroke_width
        allowed_values_from: iconography_policy.construction.stroke.allowed_stroke_widths
      remediation:
        action: adjust_to_approved_stroke_width

    - id: D007
      name: grid_alignment_invalid
      severity: hard_fail
      applies_to:
        - icon
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: grid_alignment_check
        required_grid_from: iconography_policy.construction.grid.allowed_grid_sizes
        pixel_snap_required_from: iconography_policy.construction.grid.pixel_snap_required
        # Tolerance avoids false failures from floating-point SVG exports
        # produced by tools such as Figma or Illustrator.
        pixel_snap_tolerance_px: 0.01
      remediation:
        action: align_to_approved_grid_and_pixel_snap

    - id: D008
      name: meaningful_icon_missing_accessible_name
      severity: hard_fail
      applies_to:
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - ui_component_icon
      detect:
        method: structural_presence
        target: accessible_name
      when:
        meaningful_icon: true
      unless_exception:
        - decorative_icon_exception
      remediation:
        action: add_concise_accessible_name

    - id: D009
      name: decorative_icon_not_hidden_from_assistive_technology
      severity: hard_fail
      applies_to:
        - decorative_icon
      detect:
        method: structural_value_check
        field: assistive_technology_hidden
        expected_value: true
      when:
        decorative_icon: true
      remediation:
        action: set_decorative_icon_hidden_state

    - id: D010
      name: status_icon_missing_text_redundancy
      severity: hard_fail
      applies_to:
        - status_icon
      detect:
        method: structural_presence
        target: redundant_text_or_programmatic_label
      when:
        semantic_role: status
      remediation:
        action: add_status_text_or_programmatic_label

    - id: D011
      name: circular_reference_detected
      severity: hard_fail
      applies_to:
        - icon_set
        - icon
      detect:
        method: graph_cycle_check
        scope:
          - icon_tokens
          - icon_repository
        reference_edges:
          - icon_alias_to_icon_key
          - icon_key_to_source_asset
          - icon_token_to_colour_token
          - icon_variant_to_base_icon
      remediation:
        action: remove_recursive_alias_or_token_dependency

    - id: D012
      name: raster_icon_used_where_vector_required
      severity: hard_fail
      applies_to:
        - icon
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: file_format_check
        vector_required_from_field_applicability: vector_required
        vector_formats:
          - svg
        raster_formats:
          - png
          - jpg
          - jpeg
          - webp
      when:
        vector_required: true
      remediation:
        action: replace_with_vector_source_or_approved_exception

    - id: D013
      name: semantic_type_pairing_invalid
      severity: hard_fail
      applies_to:
        - icon
        - functional_icon
        - navigation_icon
        - interactive_icon
        - decorative_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: semantic_type_pairing_check
        content_type_field: content_type
        semantic_role_field: semantic_role
        allowed_pairings_from: icon_tokens.semantic_roles.allowed_content_types
        fail_when:
          - semantic_role_not_declared
          - content_type_not_allowed_for_semantic_role
        examples:
          fail:
            - content_type: functional_icon
              semantic_role: decoration
          pass:
            - content_type: functional_icon
              semantic_role: action
      remediation:
        action: align_semantic_role_with_icon_type_or_select_correct_icon_type

    - id: D014
      name: orphaned_icon_token
      severity: soft_warn
      applies_to:
        - icon_set
        - icon
      detect:
        method: repository_usage_check
        repository_source: icon_repository.storage
        active_keys_from: icon_repository.active_icon_keys
        semantic_roles_from: icon_tokens.semantic_roles
        fail_when:
          - repository_icon_not_listed_in_active_icon_keys
          - active_icon_key_has_no_semantic_role_or_usage_mapping
        ignore_when:
          lifecycle_state:
            - proposed
            - in_review
      remediation:
        action: map_icon_to_semantic_role_deprecate_or_archive

  heuristic:
    - id: H001
      name: weak_semantic_fit
      severity: soft_warn
      applies_to:
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: semantic_fit_classifier
        threshold: 0.75
      remediation:
        action: select_more_semantically_appropriate_icon
        suggestion_strategy:
          method: vector_nearest_neighbors
          source: icon_repository.active_icon_keys
          preferred_icon_set: primary_icon_set
          return_count: 3
          include_similarity_score: true
          include_reason: true

    - id: H002
      name: weak_visual_style_consistency
      severity: soft_warn
      applies_to:
        - icon
        - icon_set
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: visual_consistency_classifier
        threshold: 0.80
      remediation:
        action: revise_to_match_approved_icon_style

    - id: H003
      name: weak_small_size_legibility
      severity: soft_warn
      applies_to:
        - favicon
        - app_icon
        - functional_icon
        - navigation_icon
        - status_icon
        - ui_component_icon
      detect:
        method: small_size_legibility_classifier
        threshold: 0.75
      remediation:
        action: simplify_icon_or_use_small_size_variant

    - id: H004
      name: low_exemplar_alignment_score
      severity: soft_warn
      applies_to:
        - icon
        - icon_set
        - functional_icon
        - navigation_icon
        - interactive_icon
        - illustrative_icon
        - status_icon
        - product_icon
        - social_icon
        - diagram_icon
        - presentation_icon
        - ui_component_icon
      detect:
        method: semantic_similarity
        exemplar_set: exemplars.active_exemplar_keys
        # Score is on a 0.0-1.0 scale. Do not use a 0-100 score scale.
        threshold: 0.70
      remediation:
        action: revise_toward_approved_iconography_patterns

    - id: H005
      name: weak_accessibility_label_quality
      severity: soft_warn
      applies_to:
        - functional_icon
        - navigation_icon
        - interactive_icon
        - status_icon
        - product_icon
        - social_icon
        - file_icon
        - ui_component_icon
      detect:
        method: accessibility_label_quality_classifier
        threshold: 0.75
      remediation:
        action: improve_accessible_name_or_hidden_state

# -----------------------------------------------------------------------------
# DEPRECATED ICONS
# -----------------------------------------------------------------------------
# Optional. Use when older icon assets must be blocked or replaced.
deprecated_icons:
  review_cycle: quarterly
  notes:
    - Deprecated icons are checked against all governed content types listed in D001.applies_to.
    - Review this list each quarter and remove entries older than 24 months after migration completes.
    - Each deprecated icon must carry a replacement_ref pointing to a current approved icon key.
  items:
    - id: "{deprecated_icon_1_id}"
      icon_key: "{deprecated_icon_key}"
      replacement_ref: "{replacement_icon_key}"
      reason: "{Why this icon is no longer approved.}"
      retirement_date: "YYYY-MM-DD"

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
    # most_restrictive_wins: if any matched channel, content_type, or accessibility
    # condition requires human sign-off, that requirement overrides all other matched rules.
    conflict_resolution:
      mode: most_restrictive_wins
      notes:
        - If any matched channel, content_type, or accessibility condition requires human sign-off, human sign-off is required.
        - Auto-publish is allowed only when no matched rule requires human sign-off.
    requires_human_sign_off_on_warn:
      channels:
        - product_ui
        - mobile_app
        - website
        - signage
      content_types:
        - interactive_icon
        - navigation_icon
        - status_icon
        - app_icon
        - logo_mark_adjacent_icon
      conditions:
        - accessibility_warning_present
        - contrast_warning_present
        - third_party_platform_icon_exception_used
    allows_auto_publish_on_warn:
      channels:
        - linkedin
        - newsletter
        - pitch_deck
      content_types:
        - decorative_icon
        - presentation_icon
        - illustrative_icon

  human_review_conditions:
    - retry_count >= 3
    - unresolved_heuristic_conflict == true
    - accessibility_warning_present == true
    - contrast_warning_present == true
    - exception_used == true

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
  log_icon_keys: true
  log_icon_token_refs: true
  log_colour_token_refs: true
  log_accessibility_results: true
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
      persona:
        type: string
      timestamp:
        type: string
        format: iso8601
      icon_keys:
        type: array
        items:
          type: string
      icon_token_refs:
        type: array
        items:
          type: string
      colour_token_refs:
        type: array
        items:
          type: string
      accessibility_results:
        type: array
        items:
          type: object
          properties:
            icon_key:
              type: string
            accessible_name_present:
              type: boolean
            assistive_technology_hidden:
              type: boolean
            contrast_ratio:
              type: number
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
  - "{brand_id}.standards.visual-identity.logo"
  - "{brand_id}.standards.visual-identity.typography"
  - "{brand_id}.standards.verbal-identity.messaging-framework"
  - "{brand_id}.standards.verbal-identity.tone-of-voice"

related_applications:
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.product-ui"
  - "{brand_id}.applications.mobile-app"
  - "{brand_id}.applications.pitch-deck"
  - "{brand_id}.applications.sales-enablement"
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.newsletter"
---

# {Brand Name} iconography

## How to complete this template

This is a Brando® Iconography standard template. Complete the following steps in order before publishing.

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
| `{iconography_principle_1}` | First core iconography principle label | `clear` |
| `{default_icon_grid_size}` | Default icon construction grid | `24` |
| `{default_stroke_width}` | Default icon stroke width | `1.5` |
| `{default_icon_colour_token}` | Default icon colour token | `icon_primary` |
| `{primary_icon_repository_ref}` | Repository reference for the primary icon set | `brand/icons/primary` |
| `{icon_key_1}` | Approved icon short key | `arrow-right` |
| `<icon_key>` | Runtime variable. Do not replace | |
| `<exemplar_key>` | Runtime variable. Do not replace | |

---

## Purpose

This standard governs how {Brand Name} uses icons across digital, product, marketing, sales, and presentation contexts.

The iconography system defines:

- which icons are approved
- how icons are drawn
- how icons are named and stored
- how icons use colour
- how icons communicate meaning
- how icons remain accessible
- how icons are validated before use

Icons are not decorative afterthoughts. They are visual tokens that carry meaning, support navigation, and help users understand what to do next.

---

## How to interpret this policy

This policy has five layers:

1. Icon principles define the intended visual behaviour.
2. Icon tokens define approved sizes, colour roles, semantic roles, and icon sets.
3. Repository rules define where approved assets live.
4. Accessibility and colour rules define whether icons can be safely used.
5. Execution rules determine whether output passes, warns, or fails.

The YAML front matter is the machine-executable layer. This Markdown body is the human-readable guidance layer. Where they conflict, the YAML governs.

If a rule conflicts with a higher-priority legal, regulatory, accessibility, or safety policy, the higher-priority policy wins.

If a rule conflicts with an application-specific exception declared in the YAML, the declared exception applies.

---

## Iconography principles

### {Iconography Principle 1}

{Explain iconography principle 1 in plain language.}

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

### {Iconography Principle 2}

{Explain iconography principle 2 in plain language.}

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

### {Iconography Principle 3}

{Explain iconography principle 3 in plain language.}

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

## Icon tokens

The icon token system is the source of truth for approved icon use.

Use it in this order:

1. Choose the icon's semantic role.
2. Select an approved icon key from the repository.
3. Apply an approved size token.
4. Apply an approved colour token.
5. Confirm contrast and accessibility requirements.
6. Export or implement the icon in an approved file format.

Do not hard-code icon colours when a colour token exists. Do not use unapproved stock icons unless an exception applies.

---

## Accessibility expectations

Meaningful icons must have an accessible name or equivalent programmatic label.

Decorative icons must be hidden from assistive technology and must not carry unique meaning.

Interactive icons must have a visible or programmatic label that explains the action.

Status icons must not rely on colour alone. They need text, a programmatic label, or another redundant cue.

---

## Colour and contrast

Icon colours must resolve through the Colour Standard.

Meaningful icons must pass the minimum contrast threshold declared in `field_applicability`. If an icon appears on a gradient or image background, validators must check the lowest-contrast point within the icon bounding box, not a single sampled background point.

Status colours should be used only for status meaning. Do not use success, warning, error, or information colours for decoration.

---

## Default execution expectations

Unless an explicit exception is declared in the YAML:

- Use an approved icon source.
- Use an approved file format.
- Use declared size and colour tokens.
- Preserve the approved grid, stroke, and style rules.
- Use vector assets where vector output is required.
- Provide accessible names for meaningful icons.
- Hide decorative icons from assistive technology.
- Provide text or label redundancy for status icons.
- Check contrast for meaningful icons.
- Avoid ambiguous metaphors and unapproved stock styles.

---

## Exception model

Exceptions are allowed only when declared in the YAML `exceptions.declared` block. Undeclared exceptions hard fail.

Four exceptions are pre-declared in this template:

Decorative icon exception: decorative icons may be hidden from assistive technology and do not need an accessible name, provided they do not communicate meaning.

Third-party platform icon exception: third-party icons may retain required platform or partner styling when a source guideline reference exists.

Legal or regulatory symbol exception: required symbols may override icon style preferences where legal, safety, regulatory, or certification rules require it.

Legacy icon exception: approved legacy icons may remain temporarily when replacement creates implementation risk, provided a migration plan and expiry date exist.

---

## Exemplars

Each exemplar below is referenced in the YAML by its `active_exemplar_key`. Validators use authoritative repository exemplars retrieved via `exemplars.storage.retrieval`, not the Markdown copies shown here.

### {exemplar-name}

Key: `{brand_id}.standards.visual-identity.iconography.exemplar.{example_key}`

"{Approved exemplar description or embedded reference.}"

Why it works:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Anti-exemplars

Anti-exemplars are negative reference material for human review only. They are excluded from all deterministic and heuristic validation. They must not be scored, repaired, or published.

### {anti-exemplar-name}

"{Anti-exemplar description or embedded reference.}"

Why it fails:

- {Reason 1}
- {Reason 2}
- {Reason 3}

---

## Validator interpretation notes

### Deterministic checks

Implement with direct reference checks, token checks, file-format checks, contrast checks, accessibility metadata checks, graph-cycle checks, and measurable asset properties. Run in the order declared in `execution.rule_execution_order.phase_1_deterministic`.

Covered by: D001, D002, D003, D004, D005, D006, D007, D008, D009, D010, D011, D012, D013, D014

### Heuristic checks

Implement using a classifier, scorer, or model-based evaluator. Run only after all deterministic checks pass or produce soft warnings only. Every heuristic check must return both a score and a reason. Never return a score alone.

Covered by: H001, H002, H003, H004, H005

### Scale note for heuristic scores

All heuristic rules use a 0.0-1.0 probability or score scale. Do not introduce 0-100 rule scales. See `execution.heuristic_decisioning.threshold_resolution`.

### Contrast note

D005 validates meaningful icon contrast. For gradients, image backgrounds, or variable surfaces, validators must check the lowest-contrast point inside the icon bounding box. Do not validate only against the average background colour.

### Pixel snapping note

D007 uses `pixel_snap_tolerance_px: 0.01` to avoid false failures caused by floating-point SVG export artefacts. Values outside that tolerance should still fail.

### Circular reference note

D011 checks icon token and repository references for cycles. This prevents recursive aliases, icon variants pointing back to themselves, and token dependency loops.

### Semantic pairing and orphan token notes

D013 validates that each icon's semantic role is compatible with its declared content type. D014 warns when a repository icon is not mapped to an active key, semantic role, or current usage pattern.

### Repository fallback note

Repository outages should not stop every build immediately. The icon repository fallback allows a cached approved asset to pass with warning during the declared grace period, but it hard fails when no trusted cache exists or the grace period expires.

### Exemplar retrieval

Exemplars required by H004 are fetched via the protocol declared in `exemplars.storage.retrieval`. If retrieval fails, H004 is skipped with a soft warning per `fallback_behaviour`.

### Retry behaviour

On deterministic failure: repair at icon asset or metadata level, then re-evaluate before proceeding.

On heuristic failure: repair at icon asset or icon set level, then re-evaluate before proceeding.

After two failed repairs: trigger full regeneration or asset reselection.

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
- All icon keys in `active_icon_keys` resolve, or `fallback_behaviour` is declared.
- All icon set repository references resolve.
- All size tokens referenced by icons resolve to declared entries in `icon_tokens.size_tokens`.
- All colour tokens referenced by icons resolve through the Colour Standard.
- All meaningful icons have accessible names or equivalent labels.
- All decorative icons are hidden from assistive technology.
- All status icons include text or label redundancy.
- All meaningful icons pass the required contrast check, including worst-case gradient checks.
- All vector-required contexts use vector assets.
- No circular icon token, alias, variant, or repository references exist.
- All semantic roles are valid for the declared icon content type.
- Orphaned icon tokens have been mapped, deprecated, or archived.
- Positive exemplars do not violate any deterministic rule.
- Anti-exemplars are explicitly excluded from validation.
- All channel and content-type values in rules and `decision_policy` match `scope.applies_to`.
- The telemetry schema is valid and the policy key and version are attached to every validation report.