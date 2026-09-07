import { accelerator } from './accelerator';
import { bootcamp } from './bootcamp';
import { fellowship } from './fellowship';
import { mastermind } from './mastermind';
import type { FAQItem, InfoBlock, Program, Site } from './types';

export const site: Site = {
  name: 'Outskill',
  tagline: 'Learn AI engineering by shipping it.',
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
    headline: 'Pick the program that matches where you are.',
    subhead: 'Answer three questions. Get a practical next step for your AI engineering work.',
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
  subhead: 'Two days, live, free. You leave with working demos — not notes.',
  cta: { label: 'Claim your free seat', href: '/mastermind#register' },
  secondary: { label: 'See every option', href: '/#ladder' },
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
  line: 'Backed by 80+ angel investors, including the founders behind some of India’s largest consumer companies.',
  logosNote: 'Tools you build with in the sessions',
};

export const paths = [
  {
    slug: 'coders',
    kicker: 'You already write code',
    title: 'For Coders',
    body: 'Move from autocomplete to handing an agent a whole ticket — and reviewing what it opens. Production practice: evals, cost, monitoring.',
    points: ['Agentic coding in your own repo', 'MCP, tools, and multi-agent workflows', 'Evals, cost controls, and on-call reality'],
    href: '/coders',
    cta: 'See the coder track',
  },
  {
    slug: 'vibe-coders',
    kicker: 'You build with AI, not syntax',
    title: 'For Vibe Coders',
    body: 'Turn an idea into something people can click, without learning a language first. Then learn just enough engineering to make it hold up.',
    points: ['Prototype to clickable in one session', 'Wire real data and payments in', 'Know when to hand it to an engineer'],
    href: '/vibe-coders',
    cta: 'See the vibe track',
  },
];

export const outcomes = [
  {
    metric: '3 demos',
    title: 'By Sunday night',
    body: 'Mastermind attendees leave the weekend with three running agent demos they built themselves, plus the recording to rebuild them.',
  },
  {
    metric: '1 agent',
    title: 'Deployed, not slide-ware',
    body: 'Bootcamp ends when your own coding agent plans a task, writes the code, runs the tests, and opens the pull request.',
  },
  {
    metric: '1 system',
    title: 'In production',
    body: 'Accelerator and Fellowship take one system past the demo line: evaluated, cost-bounded, monitored, and defended in review.',
  },
];

export const homeFaq: FAQItem[] = [
  {
    q: 'What does it cost to start?',
    a: 'Nothing. The 90-minute workshops are free and the Weekend Mastermind is free with the coupon that unlocks on its page. You only pay when you move up to the Bootcamp or beyond.',
  },
  {
    q: 'I cannot write code. Is this for me?',
    a: 'Yes — take the vibe coder path. The ChatGPT and AI for PMs workshops assume no code, and the Mastermind is built so both audiences can follow along.',
  },
  {
    q: 'I write code professionally. Will this be too basic?',
    a: 'Start at the Claude Code, Codex, or Copilot workshop, then the 2-Day Bootcamp. Those assume you already ship software and spend the time on agent architecture, evals, and review instead of syntax.',
  },
  {
    q: 'Is everything live, or can I watch recordings?',
    a: 'Sessions are live so you can ask questions while you build. Recordings follow, but the value is in doing the work during the session.',
  },
  {
    q: 'How much time do I actually need each week?',
    a: '90 minutes for a workshop. One weekend for the Mastermind. The 2-Day Bootcamp is two days, four live sessions. The Fellowship is weekends only for six months, so you can keep your job.',
  },
  {
    q: 'What is the difference between the Accelerator and the Fellowship?',
    a: 'The Accelerator is 14 back-to-back days at full-time intensity. The Fellowship spreads six months across weekends: four months of learning, then two months building a capstone. Both are application-only.',
  },
];
