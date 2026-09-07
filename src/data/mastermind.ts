import type { Program } from './types';

/**
 * The coupon that makes the listed ₹4,999 free. Not part of the V1 `Program`
 * type (types.ts is shared), so it lives here as its own export.
 */
export const couponCode = 'WEEKEND-FREE';

/**
 * The cohort runs "almost every weekend" — Saturday 19:00 IST. Computed in UTC
 * and shifted by +05:30 so the build machine's timezone never matters, exactly
 * like nextWorkshopSession() in workshops.ts.
 *
 * 19:00 IST == 13:30 UTC the same calendar day.
 *
 * Both the prerendered page and Countdown.tsx call this, so a stale build and
 * a live browser can never disagree about which weekend is next.
 */
export function nextCohortAfter(from: Date = new Date()): Date {
  const IST = 5.5 * 60 * 60 * 1000;
  const ist = new Date(from.getTime() + IST);
  const slot = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), 13, 30, 0));
  // 6 = Saturday. Advance to the coming Saturday.
  const days = (6 - slot.getUTCDay() + 7) % 7;
  slot.setUTCDate(slot.getUTCDate() + days);
  if (slot.getTime() <= from.getTime()) slot.setUTCDate(slot.getUTCDate() + 7);
  return slot;
}

/**
 * "Sat, 12 Sep 2026" — the human label beside the countdown. Assembled from
 * parts rather than a format string because en-IN's short form comes back as
 * "Sat, 12 Sept, 2026", and that second comma reads badly mid-sentence.
 */
export function formatCohortDate(d: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('weekday')}, ${get('day')} ${get('month')} ${get('year')}`;
}

/** Next Saturday 19:00 IST from today. Stored so the founder can pin it. */
const COHORT_START = '2026-09-12T19:00:00+05:30';

export const mastermind: Program = {
  slug: 'mastermind',
  name: '2-Day AI Engineering Mastermind',
  eyebrow: 'Free · Live · This weekend',
  headline: 'Ship three working agent demos by Sunday night.',
  subhead: 'Two days, twelve hours, live. You build the agent loop yourself — context, tools, review — and leave with demos that run on your own machine.',
  ctaLabel: 'Claim your free seat',
  ctaHref: '#register',
  nextCohortStart: COHORT_START,
  /** Simplest honest rule: the coupon dies the moment the cohort starts. */
  couponExpiresAt: COHORT_START,
  stats: [
    { label: 'Start date', value: '12 Sept 2026' },
    { label: 'Start time', value: '7 PM IST' },
    { label: 'Duration', value: '2 days · 12 hrs' },
    { label: 'Format', value: 'Live online' },
  ],
  price: { current: 'Free with coupon', original: '₹4,999', note: 'Coupon holds until the cohort starts' },
  features: [
    {
      title: 'Hand over a whole task, not one line',
      body: 'Give Claude Code or Cursor a real ticket from your repo and watch it plan before it types.',
    },
    {
      title: 'Plug an agent into your own systems',
      body: 'Wire GitHub, a database, Slack, and one of your APIs to a running workflow using MCP.',
    },
    {
      title: 'Get a pull request you can review',
      body: 'The agent writes the code, runs the tests, and opens the PR. You read the diff and decide.',
    },
    {
      title: 'Put several agents on it at once',
      body: 'Split a build across role-based agents that work in parallel, then reconcile what they produced.',
    },
    {
      title: 'Know why the loop breaks',
      body: 'Context, memory, tools, and review as engineering primitives — so you can debug an agent, not guess at it.',
    },
  ],
  sessions: [
    {
      n: 1,
      when: '7 PM–11 PM IST',
      title: 'Introduction to LLMs, OpenAI APIs & Prompt Engineering',
      summary: 'Build a clear foundation in LLMs and use the OpenAI API with prompts that produce consistent results.',
      bullets: ['LLM architecture and capabilities', 'Hands-on OpenAI API work', 'Advanced prompting', 'Conversational agents', 'Output optimization'],
    },
    {
      n: 2,
      when: '10 AM–2 PM IST',
      title: 'Advanced AI Applications & Automation',
      summary: 'Architect agentic systems and build multi-step applications that can be monitored and scaled.',
      bullets: ['Agentic AI architecture', 'Multi-step workflows', 'Self-improving applications', 'Cost and scale trade-offs', 'Connecting multiple agents'],
    },
    {
      n: 3,
      when: '3 PM–7 PM IST',
      title: 'Multi-Agent AI Systems',
      summary: 'Build collaborative AI teams with roles for ideation, coding, testing, and deployment.',
      bullets: ['Blueprint for AI teams', 'MVP built with agents', 'Role-based agent design', 'Agent communication', 'Productivity patterns'],
    },
  ],
  outcomes: ['Explain how an LLM produces an answer', 'Build a useful conversational agent', 'Connect models to real tools and APIs', 'Design a multi-step agent workflow', 'Know when to use one agent or several'],
  audience: ['Engineers curious about practical AI', 'Developers using autocomplete but not agents', 'Technical leads evaluating AI workflows', 'Builders who want a fast, hands-on start'],
  faq: [
    { q: 'Do I need prior AI experience to join this workshop?', a: 'No. Engineering experience helps, but we start with the model and build up through working examples.' },
    { q: 'How will the workshop sessions be conducted?', a: 'Three live expert sessions run across the weekend, with demonstrations, explanations, and hands-on implementation.' },
    { q: 'Will I receive recordings of the sessions?', a: 'Yes. Session recordings and supporting material are provided after the live sessions.' },
    { q: 'What makes this different from other AI workshops?', a: 'The focus is the complete engineering loop: models, tools, workflows, agents, and review—not prompt tips alone.' },
    { q: 'Will I be able to apply these skills immediately after the workshop?', a: 'Yes. You will leave with patterns you can apply to coding, automation, and internal tools.' },
    { q: 'Is the Mastermind really free?', a: `Yes. The listed price is ₹4,999 and the coupon ${couponCode} takes it to zero. The coupon is valid until the cohort starts; when a weekend passes, a fresh one opens for the next one.` },
  ],
  seo: { title: '2-Day AI Engineering Mastermind', description: 'A free, live 12-hour AI Engineering Mastermind. Learn LLMs, tools, agent workflows, and multi-agent systems in three sessions.' },
};
