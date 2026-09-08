import { accelerator } from './accelerator';
import { bootcamp } from './bootcamp';
import { fellowship } from './fellowship';
import { mastermind } from './mastermind';
import type { FAQItem, InfoBlock, Program, Site } from './types';

export const site: Site = {
  name: 'Outskill',
  tagline: 'AI engineering. Taught by shipping.',
  /**
   * Nav per BRIEF-V2: businesses, newsletter, and an "Explore Courses" menu
   * that lists programs by time x cost x outcome (built from ladder.ts in
   * Nav.astro), never by name alone. Logo left, one primary CTA right.
   */
  nav: [
    { label: 'For Businesses', href: 'https://outskill.com/business' },
    { label: 'Newsletter', href: 'https://outskill.com/#newsletter' },
    { label: 'Explore Courses', href: '/#ladder' },
  ],
  primaryCta: { label: 'Start free', href: '/mastermind#register' },
  footer: [
    {
      heading: 'Start here',
      links: [
        { label: '90 min Workshop — free', href: '/#workshops' },
        { label: 'Weekend Mastermind — free', href: '/mastermind' },
        { label: 'Compare by time and cost', href: '/#ladder' },
      ],
    },
    {
      heading: 'Go deeper',
      links: [
        { label: '2-Day Bootcamp', href: '/bootcamp' },
        { label: '14 days Accelerator', href: '/accelerator' },
        { label: '6M Fellowship', href: '/fellowship' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'For Businesses', href: 'https://outskill.com/business' },
        { label: 'Newsletter', href: 'https://outskill.com/#newsletter' },
        { label: 'Contact Us', href: 'https://outskill.com/contact-us' },
        { label: 'Creator Partnerships', href: 'https://outskill.com/creator-partnerships' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Terms & Conditions', href: 'https://outskill.com/terms-and-conditions' },
        { label: 'Privacy Policy', href: 'https://outskill.com/privacy-policy' },
        { label: 'Refund Policy', href: 'https://outskill.com/refund-policy' },
      ],
    },
  ],
  /** Retained for the V1 ProgramPicker island; the V2 homepage uses PathChooser. */
  hub: {
    headline: 'Which program fits you?',
    subhead: 'Three questions. One next step.',
    picker: [
      {
        question: 'How much coding experience do you have?',
        options: [
          { label: 'I am new to coding', weights: { mastermind: 2, accelerator: 1 } },
          { label: 'I build software professionally', weights: { bootcamp: 3, accelerator: 2, fellowship: 1 } },
          { label: 'I lead ML or AI systems', weights: { fellowship: 3, accelerator: 2 } },
        ],
      },
      {
        question: 'How many hours can you give each week?',
        options: [
          { label: 'A weekend', weights: { mastermind: 3 } },
          { label: '10–15 hours', weights: { bootcamp: 3, accelerator: 1 } },
          { label: 'A steady long-term block', weights: { fellowship: 3, accelerator: 2 } },
        ],
      },
      {
        question: 'What do you want to do next?',
        options: [
          { label: 'Understand agents', weights: { mastermind: 2, bootcamp: 2 } },
          { label: 'Build and ship AI apps', weights: { bootcamp: 2, accelerator: 3 } },
          { label: 'Develop deep systems expertise', weights: { fellowship: 3, accelerator: 1 } },
        ],
      },
    ],
  },
};

export const programs: Program[] = [mastermind, bootcamp, accelerator, fellowship];

/* ==========================================================================
   Homepage content
   ========================================================================== */

export const hero = {
  headline: 'Ship something with AI this weekend.',
  subhead: 'Two days. Live. Free. You leave with demos that run.',
  cta: { label: 'Claim your free seat', href: '/mastermind#register' },
  secondary: { label: 'Compare programs', href: '/#ladder' },
  /** The info blocks that sit next to the CTA. This pattern is load-bearing. */
  info: [
    { label: 'Start date', value: '11 Sept 2026' },
    { label: 'Start time', value: '7 PM IST' },
    { label: 'Duration', value: '2 days · 12 hrs' },
    { label: 'Format', value: 'Live online' },
  ] as InfoBlock[],
  stats: [
    { label: 'Active learners', value: '10M+' },
    { label: 'Countries', value: '160+' },
    { label: 'Rating', value: '4.9/5' },
  ],
};

export const trust = {
  line: 'Backed by 80+ angel investors, including founders of India’s largest consumer companies.',
  logosNote: 'Tools you build with',
};

export const paths = [
  {
    slug: 'coders',
    kicker: 'You already write code',
    title: 'For Coders',
    body: 'Hand an agent a whole ticket. Review the PR it opens.',
    points: ['Agents in your own repo', 'MCP, tools, multi-agent', 'Evals, cost, monitoring'],
    href: '/coders',
    cta: 'See the coder track',
  },
  {
    slug: 'vibe-coders',
    kicker: 'You build with AI, not syntax',
    title: 'For Vibe Coders',
    body: 'Turn an idea into something people can click. No language to learn first.',
    points: ['Clickable prototype in one session', 'Real data and payments', 'Know when to call an engineer'],
    href: '/vibe-coders',
    cta: 'See the vibe track',
  },
];

export const outcomes = [
  {
    metric: '3 demos',
    title: 'By Sunday night',
    body: 'You build all three over the weekend. Recording included.',
  },
  {
    metric: '1 agent',
    title: 'Opens its own PR',
    body: 'The Bootcamp ends when your agent plans, codes, tests, and opens the pull request.',
  },
  {
    metric: '1 system',
    title: 'In production',
    body: 'Accelerator and Fellowship: evaluated, cost-capped, monitored, defended in review.',
  },
];

export const homeFaq: FAQItem[] = [
  {
    q: 'What does it cost to start?',
    a: 'Nothing. Workshops are free. The Mastermind is free with the coupon from the quiz. You pay from the Bootcamp up.',
  },
  {
    q: 'I cannot write code. Is this for me?',
    a: 'Yes. Take the vibe coder path. The ChatGPT and AI for PMs workshops need no code.',
  },
  {
    q: 'I write code professionally. Will this be too basic?',
    a: 'No. Start with the Claude Code, Codex or Copilot workshop, then the Bootcamp. Both assume you ship software already.',
  },
  {
    q: 'Is everything live, or can I watch recordings?',
    a: 'Live, with recordings after. You build during the session, so come live.',
  },
  {
    q: 'How much time do I actually need each week?',
    a: 'Workshop: 90 minutes. Mastermind: one weekend. Bootcamp: two days. Accelerator: 14 full days. Fellowship: weekends for six months.',
  },
  {
    q: 'What is the difference between the Accelerator and the Fellowship?',
    a: 'Speed versus depth. Accelerator: 14 days back to back. Fellowship: six months of weekends, ending in a two-month capstone. Both by application.',
  },
];
