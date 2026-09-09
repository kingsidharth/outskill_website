import { ladderBySlug } from './ladder';
import type { FAQItem, LadderRung } from './types';
import { workshopBySlug } from './workshops';

/**
 * Page copy for /vibe-coders — people who build with AI tools and little or no
 * code. Every fact here comes from ladder.ts, workshops.ts or site.ts. Nothing
 * is invented: no seat counts, no testimonials, no guarantees.
 */

export const vibeHero = {
  eyebrow: 'For vibe coders',
  headline: 'Leave tonight with something people can click.',
  subhead: 'Free 90 minutes. One working thing, in ChatGPT, Lovable or whatever you already have open. No code, no setup.',
  cta: { label: 'Reserve a seat', href: workshopBySlug['chatgpt'].href },
  secondary: { label: 'See all five workshops', href: '/workshops' },
  /**
   * Static blocks beside the CTA. "Next session" is rendered by the island and
   * already carries the start time, so there is no separate Time block here.
   */
  info: [
    { label: 'Duration', value: '90 minutes' },
    { label: 'Format', value: 'Live online' },
  ],
  stats: [
    { label: 'To your first working thing', value: '90 min' },
    { label: 'Cost to start', value: 'Free' },
    { label: 'Code required', value: 'None' },
  ],
};

/**
 * The rungs a non-coder can start on. Rungs 0a and 0b are the two workshop
 * variants that assume no code; rung 1 is the Mastermind straight from
 * ladder.ts. The paid coder rungs are deliberately absent — /coders has them.
 */
export const vibeLadder: LadderRung[] = [
  {
    rung: 0,
    name: 'ChatGPT Workshop',
    slug: 'workshop-chatgpt',
    audience: ['vibe-coders', 'everyone'],
    time: '90 minutes',
    format: 'Live online, runs every other day',
    price: { current: 'Free' },
    outcome: workshopBySlug['chatgpt'].outcome,
    proof: workshopBySlug['chatgpt'].build.slice(0, 2).concat(['Recording included']),
    cta: { label: 'Reserve a seat', href: '/workshops', kind: 'free' },
    href: '/workshops',
  },
  {
    rung: 0,
    name: 'AI for PMs Workshop',
    slug: 'workshop-ai-for-pms',
    audience: ['vibe-coders', 'everyone'],
    time: '90 minutes',
    format: 'Live online, runs every other day',
    price: { current: 'Free' },
    outcome: workshopBySlug['ai-for-pms'].outcome,
    proof: workshopBySlug['ai-for-pms'].build.slice(0, 2).concat(['Recording included']),
    cta: { label: 'Reserve a seat', href: '/workshops', kind: 'free' },
    href: '/workshops',
  },
  ladderBySlug['mastermind'],
];

export const vibeOutcomes = [
  {
    title: 'A prototype people can click',
    body: 'One screen, real enough for someone to open and criticise. Beats a doc every time.',
  },
  {
    title: 'A workflow that runs',
    body: 'A weekly task, handed to a model. You check. It types.',
  },
  {
    title: 'A demo you can show your team',
    body: 'Something to put on a screen Monday, with the recording of how you built it.',
  },
];

export const vibeNeeds = [
  'A laptop with a browser. Phone works for watching, not for building.',
  'An account in the tool the session uses. Sign in before it starts.',
  'No install, no terminal, no card. Setup is not part of the 90 minutes.',
  'One real task of your own to point at. That is what you build with.',
];

export const vibeFaq: FAQItem[] = [
  {
    q: 'I genuinely cannot write code. Will I keep up?',
    a: 'Yes. The ChatGPT and AI for PMs workshops need no code. You describe, the model builds, you check.',
  },
  {
    q: 'What do I actually walk out with?',
    a: 'One working thing you built, plus the recording. If nothing runs by the end, the session failed.',
  },
  {
    q: 'Is the free workshop a sales pitch?',
    a: 'No. Ninety minutes of building. Paid programs exist above it; the free ones are complete on their own.',
  },
  {
    q: 'How is this different from the free weekend Mastermind?',
    a: 'Workshop: 90 minutes, one tool, one thing. Mastermind: a weekend, three agent demos. Do the workshop first.',
  },
  {
    q: 'When does it run, and what if I miss it?',
    a: 'Live, every other day, 7:00 PM IST. Miss one, take the next. Recordings follow.',
  },
  {
    q: 'When would I need to learn actual code?',
    a: 'When it needs to hold up: real data, payments, other people depending on it. Then move to the coder track.',
  },
];
