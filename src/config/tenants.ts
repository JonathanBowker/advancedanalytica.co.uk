export type PortalField = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url';
  placeholder: string;
  required?: boolean;
  rows?: number;
  help?: string;
};

export type PortalService = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  aiUse: string;
  fields: PortalField[];
};

export type TenantDefinition = {
  slug: string;
  name: string;
  theme: `./themes/${string}.css`;
  services: string[];
};

export const portalServices: Record<string, PortalService> = {
  'brand-readiness-assessment': {
    slug: 'brand-readiness-assessment',
    name: 'Brand readiness assessment',
    summary: 'Collect brand governance context before sending a scoped assessment request to an AI workflow.',
    description:
      'Capture the governance model, operating constraints, and success criteria that should shape a brand-readiness review.',
    aiUse: 'This payload is intended for an assessment prompt that evaluates where policy, tooling, and operating controls need strengthening.',
    fields: [
      {
        name: 'businessContext',
        label: 'Business context',
        type: 'textarea',
        placeholder: 'Describe the business unit, market context, and why this assessment is needed now.',
        required: true,
        rows: 4,
      },
      {
        name: 'brandControls',
        label: 'Existing brand controls',
        type: 'textarea',
        placeholder: 'List the key guidelines, approval rules, playbooks, or control layers already in place.',
        required: true,
        rows: 5,
      },
      {
        name: 'riskSignals',
        label: 'Risk signals to evaluate',
        type: 'textarea',
        placeholder: 'Describe the drift, compliance, or quality issues that need to be tested.',
        rows: 4,
      },
      {
        name: 'supportingLinks',
        label: 'Supporting links',
        type: 'url',
        placeholder: 'https://docs.example.com/brand-policy',
        help: 'Add the most relevant source document or workspace URL.',
      },
    ],
  },
  'policy-intake': {
    slug: 'policy-intake',
    name: 'Policy intake',
    summary: 'Prepare a structured policy packet for downstream AI policy extraction or validation services.',
    description:
      'Capture the policy source, owners, and implementation goals before routing the request into an AI policy-processing workflow.',
    aiUse: 'This payload is intended for an AI flow that extracts machine-readable controls and compares them against the tenant policy model.',
    fields: [
      {
        name: 'policyName',
        label: 'Policy name',
        type: 'text',
        placeholder: 'Global social publishing policy',
        required: true,
      },
      {
        name: 'policyOwner',
        label: 'Policy owner',
        type: 'text',
        placeholder: 'Name or team responsible for the policy',
        required: true,
      },
      {
        name: 'policySource',
        label: 'Policy source URL',
        type: 'url',
        placeholder: 'https://docs.example.com/policy-source',
      },
      {
        name: 'implementationGoal',
        label: 'Implementation goal',
        type: 'textarea',
        placeholder: 'Explain what this policy needs to enable, block, or monitor in the portal.',
        required: true,
        rows: 5,
      },
    ],
  },
};

export const tenants: Record<string, TenantDefinition> = {
  'advancedanalytica.co.uk': {
    slug: 'advanced-analytica',
    name: 'Advanced Analytica',
    theme: './themes/base.css',
    services: ['brand-readiness-assessment', 'policy-intake'],
  },
  'www.advancedanalytica.co.uk': {
    slug: 'advanced-analytica',
    name: 'Advanced Analytica',
    theme: './themes/base.css',
    services: ['brand-readiness-assessment', 'policy-intake'],
  },
  'ethicsinsight.co.uk': {
    slug: 'ethics-insight',
    name: 'Ethics Insight',
    theme: './themes/ethics-insight.css',
    services: ['policy-intake'],
  },
  'www.ethicsinsight.co.uk': {
    slug: 'ethics-insight',
    name: 'Ethics Insight',
    theme: './themes/ethics-insight.css',
    services: ['policy-intake'],
  },
  localhost: {
    slug: 'advanced-analytica',
    name: 'Advanced Analytica',
    theme: './themes/base.css',
    services: ['brand-readiness-assessment', 'policy-intake'],
  },
  '127.0.0.1': {
    slug: 'advanced-analytica',
    name: 'Advanced Analytica',
    theme: './themes/base.css',
    services: ['brand-readiness-assessment', 'policy-intake'],
  },
};

export const defaultTenantHost = 'advancedanalytica.co.uk';
