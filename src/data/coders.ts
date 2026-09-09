import type { FAQItem } from './types';

/**
 * Copy for /coders — the engineering "homepage".
 *
 * Same tokens as the main site, denser grids and Fira Code numerals per
 * DESIGN.md §8. Every fact here (time, price, date) comes from ladder.ts,
 * workshops.ts or mastermind.ts — nothing numeric is typed twice.
 */

export const codersHero = {
  eyebrow: 'For coders',
  headline: 'Ship the PR, not the prompt.',
  subhead: 'You write software. Now hand an agent a real ticket from your repo and review the PR it opens.',
  cta: { label: 'Claim your free seat', href: '/mastermind#register' },
  secondary: { label: 'Compare steps', href: '#ladder' },
};

export const codersLadder = {
  eyebrow: 'Pick by commitment',
  title: 'Start with the time you have.',
  lead: 'Five steps. The first two are free.',
};

export const codersOutcomes = {
  eyebrow: "What you'll actually ship",
  title: 'Every step ends in something that runs.',
  lead: 'Not a certificate. Code you can run on Monday.',
  items: [
    {
      metric: '3 demos',
      title: 'A weekend of agent runs',
      body: 'Three agent demos you built. Context, tools, review, explained line by line.',
    },
    {
      metric: '1 PR',
      title: 'Opened by your agent',
      body: 'Your own coding agent plans, codes, runs the suite, opens the PR.',
    },
    {
      metric: '1 system',
      title: 'Past the demo line',
      body: 'One system in production: evals, a cost ceiling, monitoring, a review you defend.',
    },
  ],
};

export const codersWorkshops = {
  eyebrow: 'Step 0 · Free',
  title: '90 minutes. Your editor. One real ticket.',
  lead: 'Claude Code, Codex or Copilot. Same session.',
};

export const codersFaq: FAQItem[] = [
  {
    q: 'I write code professionally. Will this be too basic?',
    a: 'No. No syntax. The workshop opens with a real ticket. The Mastermind is twelve hours on agent architecture, tool wiring and review.',
  },
  {
    q: 'Do I have to use a particular editor or model?',
    a: 'No. Claude Code, Codex or Copilot. Same loop. Bring the one you pay for.',
  },
  {
    q: 'Can I run the sessions against my own repository?',
    a: 'Yes, please do. Bring a repo you know and a ticket you have been avoiding. Sample repos exist if you cannot share yours.',
  },
  {
    q: 'What does it cost to start?',
    a: 'Nothing. Workshops are free. The Mastermind is free with a coupon you get from a two-minute quiz. You pay from the Bootcamp up.',
  },
  {
    q: 'How much time does each step take?',
    a: 'Workshop: 90 minutes. Mastermind: one weekend. Bootcamp: two days. Accelerator: 14 days. Fellowship: six months of weekends.',
  },
  {
    q: 'Is any of this useful if my team bans AI agents?',
    a: 'The review half is. Reading an agent’s diff, bounding what it touches, testing what it made. Teams adopt those first.',
  },
];

export const codersCta = {
  eyebrow: 'Next weekend',
  title: 'Bring a ticket. Leave with the diff.',
  ctaLabel: 'Claim your free seat',
  ctaHref: '/mastermind#register',
};
