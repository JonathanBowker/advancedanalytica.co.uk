import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    publishedAt: z.date(),
    author: z.string().default('Advanced Analytica'),
    tags: z.array(z.string()),
    series: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    publishedAt: z.date(),
    author: z.string().default('Advanced Analytica'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false)
  })
});

const useCases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string().optional(),
    outcomes: z.array(z.string()).optional(),
    draft: z.boolean().default(false)
  })
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false)
  })
});

const brand = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const roles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    functionSlug: z.string(),
    summary: z.string(),
    detail: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false)
  })
});

const personas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    personaName: z.string(),
    functionSlug: z.string(),
    roleSlug: z.string(),
    roleTitle: z.string(),
    seniority: z.string(),
    organisationContext: z.string(),
    summary: z.string(),
    goals: z.array(z.string()).default([]),
    painPoints: z.array(z.string()).default([]),
    questions: z.array(z.string()).default([]),
    kpis: z.array(z.string()).default([]),
    objections: z.array(z.string()).default([]),
    aiMaturity: z.string(),
    stakeholders: z.array(z.string()).default([]),
    proofNeeds: z.array(z.string()).default([]),
    contentStages: z.array(z.string()).default([]),
    contentNeeds: z.array(z.string()).default([]),
    messagingNotes: z.array(z.string()).default([]),
    sourceFeeds: z.array(z.string()).default([]),
    referenceContent: z.array(z.string()).default([]),
    topPerformingTopics: z.array(z.string()).default([]),
    engagementSignals: z.array(z.string()).default([]),
    preferredFormats: z.array(z.string()).default([]),
    editorialVoice: z.array(z.string()).default([]),
    contentObjectives: z.array(z.string()).default([]),
    ctaPatterns: z.array(z.string()).default([]),
    avoidPatterns: z.array(z.string()).default([]),
    updateCadence: z.string(),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  blog,
  caseStudies,
  resources,
  products,
  useCases,
  docs,
  brand,
  roles,
  personas
};
