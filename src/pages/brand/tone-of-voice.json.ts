import type { APIRoute } from 'astro';
import {
  buildToneOfVoicePrompt,
  getToneFieldRule,
  toneOfVoicePolicy,
  type ToneChannel,
  type ToneField,
  type TonePersona
} from '../../lib/brand/toneOfVoice';

export const prerender = true;

const allowedChannels = new Set<ToneChannel>(toneOfVoicePolicy.allowedChannels);
const allowedFields = new Set<ToneField>(Object.keys(toneOfVoicePolicy.fieldRules) as ToneField[]);
const allowedPersonas = new Set<TonePersona>([
  'marketing_manager',
  'content_creator',
  'social_media',
  'executive_communications',
  'new_hire',
  'ai_agent'
]);

const parseEnum = <T extends string>(value: string | null, allowed: Set<T>, fallback: T): T =>
  value && allowed.has(value as T) ? (value as T) : fallback;

export const GET: APIRoute = ({ url }) => {
  const channel = parseEnum(url.searchParams.get('channel'), allowedChannels, 'blog-post');
  const field = parseEnum(url.searchParams.get('field'), allowedFields, 'body_copy');
  const persona = parseEnum(url.searchParams.get('persona'), allowedPersonas, 'ai_agent');
  const includeValidationChecklist = url.searchParams.get('checklist') !== 'false';

  const payload = {
    policy: toneOfVoicePolicy,
    request: {
      channel,
      field,
      persona,
      includeValidationChecklist
    },
    fieldRule: getToneFieldRule(field),
    prompt: buildToneOfVoicePrompt({
      channel,
      field,
      persona,
      includeValidationChecklist
    }),
    usage: {
      endpoint: '/brand/tone-of-voice.json',
      note: 'Optional query parameters: channel, field, persona, checklist=false',
      channels: [...allowedChannels],
      fields: [...allowedFields],
      personas: [...allowedPersonas]
    }
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
};
