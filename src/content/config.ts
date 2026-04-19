import { defineCollection, z } from 'astro:content';

const plainText = (fieldName: string) =>
  z.string().refine((value) => !/<[^>]+>/.test(value), {
    message: `${fieldName} must not contain HTML markup`
  });

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: plainText('title'),
    description: plainText('description'),
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
    title: plainText('title'),
    description: plainText('description'),
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
    title: plainText('title'),
    description: plainText('description'),
    coverImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: plainText('title'),
    description: plainText('description'),
    category: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false)
  })
});

const useCases = defineCollection({
  type: 'content',
  schema: z.object({
    title: plainText('title'),
    description: plainText('description'),
    industry: z.string().optional(),
    outcomes: z.array(z.string()).optional(),
    draft: z.boolean().default(false)
  })
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: plainText('title'),
    description: plainText('description'),
    draft: z.boolean().default(false)
  })
});

const brand = defineCollection({
  type: 'content',
  schema: z.object({
    title: plainText('title'),
    description: plainText('description').optional(),
    draft: z.boolean().default(false)
  })
});

const roles = defineCollection({
  type: 'content',
  schema: z.object({
    title: plainText('title'),
    functionSlug: z.string(),
    summary: plainText('summary'),
    detail: plainText('detail'),
    order: z.number().default(0),
    draft: z.boolean().default(false)
  })
});

const personas = defineCollection({
  type: 'content',
  schema: z.object({
    title: plainText('title'),
    personaName: plainText('personaName'),
    functionSlug: z.string(),
    roleSlug: z.string(),
    roleTitle: plainText('roleTitle'),
    seniority: z.string(),
    organisationContext: plainText('organisationContext'),
    summary: plainText('summary'),
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
