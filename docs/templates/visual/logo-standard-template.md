---
# =============================================================================
# BRANDO(R) LOGO STANDARD TEMPLATE
# brando-schema-1.0 | document_type: policy_standard
# =============================================================================

id: "{brand_id}.standards.visual-identity.logo"
key: "{brand_id}.standards.visual-identity.logo"
title: "{Brand Name} Logo"
description: >
  Core logo standard governing approved logo assets, variants, clearspace,
  minimum size, colour usage, responsive behaviour, lockups, recognition,
  geometric fidelity, trademark marking, and misuse prevention across
  {Brand Name} communications.

policy_kind: standard
pillar: standards
category: visual_identity
subcategory: logo
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
  type: BrandLogoStandard
  version: brando-schema-1.0
  validation_status: ready_for_validation

naming:
  client_term: Logo
  canonical_term: Visual Identity
  policy_label: Logo
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
      - print
      - packaging
      - signage
      - app_store
      - favicon
      - social_avatar
      - product_ui
    content_types:
      - primary_logo
      - secondary_logo
      - wordmark
      - symbol
      - monogram
      - favicon
      - app_icon
      - watermark
      - partner_lockup
      - co_brand_lockup
      - campaign_lockup
      - packaging_logo
    usage_contexts:
      - brand_owned
      - partner_owned
      - paid_media
      - product_interface
      - legal_required
      - small_format
      - large_format
      - light_background
      - dark_background
      - image_background
    content_zones:
      - logo_ink
      - clearspace_area
      - background_area
      - safe_area
      - metadata
      - legal_disclaimer
  excludes:
    content_types:
      - internal_draft_sketch
      - historical_archive_logo
      - competitor_logo_reference
      - legal_contract_scan
  notes:
    - Applies to generated, edited, placed, transformed, exported, and rendered logo assets.
    - Applies to both source assets and rendered outputs.

policy_precedence:
  priority_order_highest_first:
    - global.safety
    - global.regulatory
    - market.legal
    - enterprise.brand-core
    - "{brand_id}.standards.visual-identity.logo"
    - "{brand_id}.applications.*"
  conflict_resolution:
    mode: most_restrictive_wins

inheritance:
  inherits_from:
    - "{brand_id}.brand.core"
    - "{brand_id}.standards.visual-identity.colour"
    - "{brand_id}.standards.visual-identity.layout"
    - "{brand_id}.standards.verbal-identity.messaging-framework"
  may_be_overridden_by:
    - "{brand_id}.applications.*"
    - "{brand_id}.campaigns.*"

logo_policy:
  objectives:
    required:
      - recognition
      - clearspace_integrity
      - variant_control
      - trademark_compliance
  logo_characteristics:
    required:
      - geometrically_consistent
      - legible
      - approved_colour_usage
      - responsive
    forbidden:
      - stretched
      - skewed
      - outlined
      - textured
      - recoloured_without_approval

logo_assets:
  repository:
    mode: referenced
    source_key: "{brand_id}.standards.visual-identity.logo"
    protocol: brando_policy_repo
    base_path: /policies/assets/logo/
  primary_logo:
    id: primary_logo
    label: Primary Logo
    asset_ref: "{primary_logo_asset_ref}"
    required: true
    colour_variants:
      - full_colour
      - reversed
    clearspace:
      unit_basis: "{clearspace_unit_basis}"
      minimum_units: "{minimum_clearspace_units}"
    minimum_size:
      digital_px_width: "{minimum_digital_width_px}"
      print_mm_width: "{minimum_print_width_mm}"
  wordmark:
    id: wordmark
    label: Wordmark
    asset_ref: "{wordmark_asset_ref}"
    required: true
  symbol:
    id: symbol
    label: Symbol
    asset_ref: "{symbol_asset_ref}"
    required: false
  favicon:
    id: favicon
    label: Favicon
    asset_ref: "{favicon_asset_ref}"
    required: false

responsive_logo_policy:
  enabled: true
  evaluate_responsive_fallbacks_before_blocking: true
  default_fallback_order:
    - primary_logo
    - wordmark
    - symbol

lockup_policy:
  allow_programmatic_lockup_generation: true
  require_optical_balance_check: true
  lockup_types:
    - partner_lockup
    - co_brand_lockup
    - campaign_lockup

trademark_policy:
  market_legal_ref: "{brand_id}.legal.trademark"
  default_required: false
  marks:
    allowed:
      - TM
      - R
  placement:
    default: upper_right

field_applicability:
  primary_logo:
    minimum_contrast_ratio: 4.5
    recognition_threshold: 0.85
    clearspace_required: true
  wordmark:
    minimum_contrast_ratio: 4.5
    recognition_threshold: 0.85
    clearspace_required: true
  symbol:
    minimum_contrast_ratio: 4.5
    recognition_threshold: 0.80
    clearspace_required: true
  favicon:
    minimum_contrast_ratio: 3.0
    recognition_threshold: 0.75
    clearspace_required: false
  watermark:
    minimum_contrast_ratio: 1.5
    recognition_threshold: 0.50
    clearspace_required: false

exceptions:
  undeclared_exception_behaviour: hard_fail
  declared:
    - id: legal_override
      description: Legal or regulated uses may override logo preferences where required by law.
      when:
        policy_context:
          - market.legal

classifiers:
  logo_recognition_classifier:
    description: >
      Scores whether the selected logo variant remains recognisable in the rendered context.
  logo_legibility_classifier:
    description: >
      Scores contrast and placement legibility in final output.
  co_branding_balance_classifier:
    description: >
      Scores optical balance in partner and co-brand lockups.

execution:
  enforcement_mode: blocking
  max_retry_attempts: 3
  escalate_to_human_after: 3
  rule_id_policy:
    deterministic_pattern: "^D[0-9]{3}$"
    heuristic_pattern: "^H[0-9]{3}[A-Z]?$"

decision_policy:
  pass_conditions:
    - approved_logo_asset_used
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
  log_logo_asset_refs: true
  log_logo_variant: true
  log_colour_tokens: true
  log_responsive_fallback_path: true
  retain_validation_report: true
  output_format: json

related_standards:
  - "{brand_id}.brand.core"
  - "{brand_id}.standards.visual-identity.colour"
  - "{brand_id}.standards.visual-identity.layout"
  - "{brand_id}.standards.verbal-identity.messaging-framework"

related_applications:
  - "{brand_id}.applications.website"
  - "{brand_id}.applications.linkedin"
  - "{brand_id}.applications.packaging"

template_checklist:
  - All `{placeholder}` values have been replaced with brand-specific content.
  - All `YYYY-MM-DD` values have been replaced with real ISO dates.
  - The `template` block has been removed before final policy publication.
  - The YAML parses cleanly before validation.
---

# {Brand Name} Logo

This template is designed to produce a Markdown document with YAML frontmatter.
The YAML frontmatter defines the governed logo system. The Markdown body gives
human readers a clear summary of how the policy should be interpreted and applied.

## How To Use This Template

1. Replace all `{placeholder}` values with brand-specific content.
2. Replace all `YYYY-MM-DD` values with real ISO dates.
3. Keep logo assets, variants, lockups, exceptions, and validation settings in YAML.
4. Use the Markdown body for explanation, implementation notes, and reviewer guidance.
5. Remove the `template` block when publishing a final policy.

## Suggested Markdown Sections

- Logo summary
- Approved asset overview
- Responsive and lockup notes
- Trademark and legal notes
- Review and approval notes

## Authoring Notes

- Keep the YAML authoritative.
- Keep the Markdown explanatory.
- Do not shift executable logo constraints out of the frontmatter.

## Purpose

This logo standard governs how approved logo assets are selected, rendered,
adapted, and protected across channels and contexts. It defines the approved
asset system, responsive behaviour, lockup rules, trademark requirements, and
misuse controls that protect recognition and legal integrity.

## Policy Structure

The YAML frontmatter is expected to define:

- policy identity, ownership, lifecycle, and schema metadata
- scope, precedence, inheritance, and resolution
- logo principles, objectives, repositories, and approved assets
- responsive behaviour, lockup rules, trademark requirements, and field applicability
- exceptions, classifiers, execution, decision policy, and telemetry

## What The Final Markdown Should Explain

When this template becomes a real logo standard, the Markdown body should
explain:

- which logo assets and variants are approved
- how clearspace, minimum size, and contrast are controlled
- how responsive substitutions and co-brand lockups are handled
- how trademark rules interact with brand preference
- how reviewers should interpret misuse, failures, and repair decisions

## Reviewer Notes

Reviewers should be able to compare the Markdown explanation against the YAML
fields and confirm that:

- described asset behaviour matches `logo_assets`
- responsive guidance matches `responsive_logo_policy`
- co-branding guidance matches `lockup_policy`
- legal and trademark notes match `trademark_policy`
