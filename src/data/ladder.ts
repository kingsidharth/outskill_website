import type { LadderRung, CtaKind } from './types';

/** Cards and menus never show rupee amounts (BRIEF-V3 §2). Amounts live only in each page's Pricing section. */
export function tierLabel(kind: CtaKind): string {
  return kind === 'free' ? 'Free' : kind === 'apply' ? 'By application' : 'Paid';
}

/**
 * The value ladder, exactly as the founder describes it in BRIEF-V2.md.
 *
 * Every card built from this data MUST lead with time -> cost -> outcome.
 * `name` is rendered small and secondary. Customers pick a commitment, not
 * a brand name.
 *
 * Prices here follow the brief's assumptions table. They intentionally differ
 * from some numbers still sitting in src/data/{bootcamp,accelerator,
 * fellowship}.ts (V1 copy). This file is the source of truth for the homepage
 * and any ladder surface; the founder can flip any value here.
 */
export const ladder: LadderRung[] = [
  {
    rung: 0,
    name: '90 min Workshop',
    slug: 'workshops',
    audience: ['everyone', 'coders', 'vibe-coders'],
    time: '90 minutes',
    format: 'Live, every other day',
    price: { current: 'Free' },
    outcome: 'One working thing, in the tool you already use.',
    proof: ['ChatGPT, Claude Code, Codex or Copilot', 'Nothing to install', 'Recording included'],
    cta: { label: 'Reserve a seat', href: '/workshops', kind: 'free' },
    href: '/workshops',
  },
  {
    rung: 1,
    name: 'Weekend Mastermind',
    slug: 'mastermind',
    audience: ['coders', 'vibe-coders'],
    time: '2 days, one weekend',
    format: '3 live sessions · 12 hrs',
    price: { list: '₹4,999', current: 'Free', note: 'Coupon from a two-minute quiz, valid until the weekend starts' },
    outcome: 'Three agent demos, running, by Sunday night.',
    proof: ['Coding agents, tool wiring (MCP), multi-agent', 'Limited seats', 'Recordings for 30 days'],
    cta: { label: 'Claim free seat', href: '/mastermind#register', kind: 'free' },
    href: '/mastermind',
  },
  {
    rung: 2,
    name: '2-Day Bootcamp',
    slug: 'bootcamp',
    audience: ['coders'],
    time: '2 days',
    format: '4 live sessions',
    price: { list: '₹19,999', current: '₹2,499', note: 'Intro price for this cohort' },
    outcome: 'Your own coding agent. It opens the PR.',
    proof: ['Every session ends with something running', 'Code review on your repo', 'Yours to keep'],
    cta: { label: 'Enrol', href: '/bootcamp#register', kind: 'buy' },
    href: '/bootcamp',
  },
  {
    rung: 3,
    name: '14 days Accelerator',
    slug: 'accelerator',
    audience: ['coders'],
    time: '14 days, back-to-back',
    format: 'Daily, full-time',
    price: { current: '₹1,25,000', note: 'Applications reviewed in 48 hours' },
    outcome: 'One AI system in production. Seven apps built.',
    proof: ['Evals, cost control, monitoring', 'Capstone hackathon', '1 year of live updates'],
    cta: { label: 'Apply now', href: '/accelerator#apply', kind: 'apply' },
    href: '/accelerator',
  },
  {
    rung: 4,
    name: '6M Fellowship',
    slug: 'fellowship',
    audience: ['coders'],
    time: '6 months, weekends only',
    format: '4 months learning · 2 months capstone',
    price: { current: '₹2,00,000', note: 'Applications reviewed in 48 hours' },
    outcome: 'A capstone you built, defended, and can lead with.',
    proof: ['Keep your job', '6 levels, maths to architecture', '2 months supervised build'],
    cta: { label: 'Apply now', href: '/fellowship#apply', kind: 'apply' },
    href: '/fellowship',
  },
];

export const ladderBySlug = Object.fromEntries(ladder.map((r) => [r.slug, r]));
