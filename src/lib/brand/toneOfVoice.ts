export type ToneField =
  | 'headline'
  | 'subhead'
  | 'body_copy'
  | 'intro_paragraph'
  | 'call_to_action'
  | 'social_post'
  | 'email_copy'
  | 'case_study';

export type ToneChannel =
  | 'webpage'
  | 'newsletter'
  | 'thought-leadership'
  | 'linkedin'
  | 'event-announcement'
  | 'case-study'
  | 'economic-buyer-message'
  | 'blog-post';

export type TonePersona =
  | 'marketing_manager'
  | 'content_creator'
  | 'social_media'
  | 'executive_communications'
  | 'new_hire'
  | 'ai_agent';

type FieldRule = {
  targetMaxWords: number;
  hardMaxWords: number;
  questionMinimum: number;
  ctaRequired: boolean;
};

export const toneOfVoicePolicy = {
  id: 'advanced-analytica.standards.tone-of-voice',
  key: 'advanced-analytica.standards.tone-of-voice',
  title: 'Advanced Analytica Tone of Voice',
  version: '2.2.0',
  status: 'active',
  effectiveDate: '2026-04-06',
  principles: ['collaborative', 'bold', 'optimistic'],
  allowedChannels: [
    'webpage',
    'newsletter',
    'thought-leadership',
    'linkedin',
    'event-announcement',
    'case-study',
    'economic-buyer-message',
    'blog-post'
  ] satisfies ToneChannel[],
  defaultPointOfView: ['we', 'our', 'you', 'your'],
  forbiddenWords: [
    'leverage',
    'leveraging',
    'innovative',
    'innovation',
    'synergy',
    'utilize',
    'utilise',
    'utilisation',
    'robust',
    'myriad',
    'optimal',
    'optimise',
    'solutions',
    'organisations',
    'no time like the present'
  ],
  discouragedWords: ['journey', 'best-in-class', 'transformative'],
  preferredReplacements: {
    utilize: 'use',
    utilise: 'use',
    utilisation: 'use',
    organisations: 'businesses',
    solutions: 'approach',
    robust: 'clear',
    innovative: 'new',
    leverage: 'use'
  },
  fieldRules: {
    headline: { targetMaxWords: 10, hardMaxWords: 14, questionMinimum: 0, ctaRequired: false },
    subhead: { targetMaxWords: 14, hardMaxWords: 20, questionMinimum: 0, ctaRequired: false },
    body_copy: { targetMaxWords: 16, hardMaxWords: 24, questionMinimum: 1, ctaRequired: true },
    intro_paragraph: { targetMaxWords: 16, hardMaxWords: 24, questionMinimum: 0, ctaRequired: false },
    call_to_action: { targetMaxWords: 10, hardMaxWords: 14, questionMinimum: 0, ctaRequired: true },
    social_post: { targetMaxWords: 16, hardMaxWords: 22, questionMinimum: 0, ctaRequired: true },
    email_copy: { targetMaxWords: 16, hardMaxWords: 24, questionMinimum: 1, ctaRequired: true },
    case_study: { targetMaxWords: 18, hardMaxWords: 26, questionMinimum: 0, ctaRequired: false }
  } satisfies Record<ToneField, FieldRule>
};

export type TonePromptOptions = {
  channel?: ToneChannel;
  field?: ToneField;
  persona?: TonePersona;
  includeValidationChecklist?: boolean;
};

export type DeterministicViolation = {
  ruleId: string;
  severity: 'hard_fail' | 'soft_warn';
  message: string;
};

const sentenceRegex = /[^.!?]+[.!?]?/g;

const splitSentences = (value: string) =>
  (value.match(sentenceRegex) ?? [])
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const countWords = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const hasQuestion = (value: string) => value.includes('?');

const containsCallToAction = (value: string) =>
  /\b(contact|book|start|explore|get in touch|read|see|learn|talk|schedule|request|discover)\b/i.test(value);

export const getToneFieldRule = (field: ToneField = 'body_copy') =>
  toneOfVoicePolicy.fieldRules[field];

export const buildToneOfVoicePrompt = ({
  channel = 'blog-post',
  field = 'body_copy',
  persona = 'ai_agent',
  includeValidationChecklist = true
}: TonePromptOptions = {}) => {
  const rules = getToneFieldRule(field);
  const lines = [
    `Use the ${toneOfVoicePolicy.title} policy (${toneOfVoicePolicy.key} v${toneOfVoicePolicy.version}).`,
    `Write for the ${channel} channel as ${field}.`,
    `Default persona context: ${persona}.`,
    'Voice: collaborative, bold, optimistic, direct, confident, audience-first.',
    'Point of view: use "we", "our", "you", and "your".',
    'Do not refer to us as "Advanced Analytica" unless a case-study exception explicitly applies.',
    'Prefer contractions where natural.',
    `Keep sentences tight. Target ${rules.targetMaxWords} words and never exceed ${rules.hardMaxWords} words per sentence.`,
    'Avoid exclamation points.',
    'Do not use spaced em dashes.',
    'Prefer active voice and concrete language.',
    'Support broad claims with data or attribution.',
    `Avoid these forbidden words: ${toneOfVoicePolicy.forbiddenWords.join(', ')}.`,
    `Avoid these discouraged words: ${toneOfVoicePolicy.discouragedWords.join(', ')}.`,
    'Always express a customer benefit and a clear point of view.'
  ];

  if (rules.questionMinimum > 0) {
    lines.push(`Include at least ${rules.questionMinimum} useful question mark in the copy if it fits naturally.`);
  }

  if (rules.ctaRequired) {
    lines.push('Include one clear, concise call to action.');
  }

  if (includeValidationChecklist) {
    lines.push('Self-check before returning: no forbidden words, no exclamation points, no third-person self-reference, no sentence over the hard maximum, and the CTA requirement is satisfied.');
  }

  return lines.join('\n');
};

export const validateToneOfVoiceDeterministic = (
  text: string,
  field: ToneField = 'body_copy'
): DeterministicViolation[] => {
  const violations: DeterministicViolation[] = [];
  const lowered = text.toLowerCase();
  const rules = getToneFieldRule(field);

  for (const word of toneOfVoicePolicy.forbiddenWords) {
    const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (pattern.test(text)) {
      violations.push({
        ruleId: 'D001',
        severity: 'hard_fail',
        message: `Forbidden word detected: "${word}".`
      });
    }
  }

  if (text.includes('!')) {
    violations.push({
      ruleId: 'D002',
      severity: 'hard_fail',
      message: 'Exclamation point detected.'
    });
  }

  if (/\bAdvanced Analytica(?:'s)?\b/.test(text) && field !== 'case_study') {
    violations.push({
      ruleId: 'D003',
      severity: 'hard_fail',
      message: 'Third-person self-reference detected.'
    });
  }

  if (text.includes(' — ')) {
    violations.push({
      ruleId: 'D010',
      severity: 'hard_fail',
      message: 'Spaced em dash detected.'
    });
  }

  for (const sentence of splitSentences(text)) {
    if (countWords(sentence) > rules.hardMaxWords) {
      violations.push({
        ruleId: 'D005',
        severity: 'hard_fail',
        message: `Sentence exceeds hard maximum of ${rules.hardMaxWords} words.`
      });
      break;
    }
  }

  if (rules.questionMinimum > 0 && !hasQuestion(text)) {
    violations.push({
      ruleId: 'D008',
      severity: 'soft_warn',
      message: 'Question is missing for a field that expects one.'
    });
  }

  if (rules.ctaRequired && !containsCallToAction(lowered)) {
    violations.push({
      ruleId: 'D004',
      severity: 'hard_fail',
      message: 'No clear call to action detected.'
    });
  }

  return violations;
};
