import type { Program } from './types';

/**
 * The coupon that makes the listed ₹4,999 free. Not part of the V1 `Program`
 * type (types.ts is shared), so it lives here as its own export.
 */
export const couponCode = 'WEEKEND-FREE';

/**
 * The cohort runs "almost every weekend" — Friday 19:00 IST (session 1 Friday evening, sessions 2–3 Saturday). Computed in UTC
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
  // 5 = Friday. Advance to the coming Friday.
  const days = (5 - slot.getUTCDay() + 7) % 7;
  slot.setUTCDate(slot.getUTCDate() + days);
  if (slot.getTime() <= from.getTime()) slot.setUTCDate(slot.getUTCDate() + 7);
  return slot;
}

/**
 * "Sat, 12 Sep 2026" — the human label beside the countdown. Assembled from
 * parts rather than a format string because en-IN's short form comes back as
 * "Fri, 11 Sept, 2026", and that second comma reads badly mid-sentence.
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

/** Next Friday 19:00 IST from today (matches outskill.com: 11 Sept 2026, 7 PM IST). Stored so the founder can pin it. */
const COHORT_START = '2026-09-11T19:00:00+05:30';

export const mastermind: Program = {
  slug: 'mastermind',
  name: 'Weekend Mastermind',
  eyebrow: 'Weekend Mastermind · Free · Live',
  headline: "Behind the scenes. Common to uncommon.",
  subhead: 'We show you how it’s done, live. Two days, free. Three demos by Sunday night.',
  ctaLabel: 'Claim your free seat',
  ctaHref: '#register',
  nextCohortStart: COHORT_START,
  /** Simplest honest rule: the coupon dies the moment the cohort starts. */
  couponExpiresAt: COHORT_START,
  stats: [
    { label: 'Start date', value: '11 Sept 2026' },
    { label: 'Start time', value: '7 PM IST' },
    { label: 'Duration', value: '2 days · 12 hrs' },
    { label: 'Format', value: 'Live online' },
  ],
  price: { current: 'Free with coupon', original: '₹4,999', note: 'Coupon holds until the cohort starts' },
  features: [
    {
      title: 'Hand over a whole task',
      body: 'A real ticket from your repo. Claude Code or Cursor plans before it types.',
    },
    {
      title: 'Plug an agent into your systems',
      body: 'GitHub, a database, Slack and your API, wired in with MCP, the standard plug for agent tools.',
    },
    {
      title: 'Get a PR you can review',
      body: 'The agent codes, tests, opens the PR. You read the diff.',
    },
    {
      title: 'Put several agents on it',
      body: 'Role-based agents working in parallel. You reconcile the result.',
    },
    {
      title: 'Know why the loop breaks',
      body: 'Context, memory, tools, review. Debug an agent instead of guessing.',
    },
  ],
  sessions: [
    {
      n: 1,
      when: '7 PM–11 PM IST',
      title: 'Introduction to LLMs, OpenAI APIs & Prompt Engineering',
      summary: 'Build a clear foundation in LLMs and use the OpenAI API with prompts that produce consistent results.',
      bullets: ['How LLMs answer', 'OpenAI API, hands on', 'Prompts that hold up'],
    },
    {
      n: 2,
      when: '10 AM–2 PM IST',
      title: 'Advanced AI Applications & Automation',
      summary: 'Architect agentic systems and build multi-step applications that can be monitored and scaled.',
      bullets: ['Agent architecture', 'Multi-step workflows', 'Cost and scale'],
    },
    {
      n: 3,
      when: '3 PM–7 PM IST',
      title: 'Multi-Agent AI Systems',
      summary: 'Build collaborative AI teams with roles for ideation, coding, testing, and deployment.',
      bullets: ['Role-based agents', 'An MVP built by agents', 'How agents talk to each other'],
    },
  ],
  outcomes: ['Explain how an LLM answers', 'Connect a model to real tools', 'Run several agents on one build'],
  audience: ['Engineers curious about practical AI', 'Developers using autocomplete but not agents', 'Technical leads evaluating AI workflows', 'Builders who want a fast, hands-on start'],
  faq: [
    { q: 'Do I need AI experience?', a: 'No. We start at the model and build up through working examples.' },
    { q: 'How does the weekend run?', a: 'Three live sessions. Demo, then you build.' },
    { q: 'Are there recordings?', a: 'Yes, with the material, after each session.' },
    { q: 'How is this different from other AI workshops?', a: 'You build the whole loop: model, tools, agents, review. Not prompt tips.' },
    { q: 'Can I use this at work on Monday?', a: 'Yes. The patterns apply to coding, automation and internal tools.' },
    { q: 'Is it really free?', a: 'Yes. Take the quiz; the coupon on the result page takes ₹4,999 to zero until the weekend starts.' },
  ],
  seo: { title: '2-Day AI Engineering Mastermind', description: 'A free, live 12-hour AI Engineering Mastermind. Learn LLMs, tools, agent workflows, and multi-agent systems in three sessions.' },

  /* ---- V3 (BRIEF-V3 §3) ---- */
  whatYouGet: ['Three live sessions, twelve hours', 'A ticket handed to a coding agent, end to end', 'An agent wired to GitHub, a database and Slack', 'A pull request the agent opened', 'Agents working a build in parallel', 'Recordings and material, yours to keep'],
  isThisForMe: ['I can give one weekend', 'I write code, or read it comfortably', 'I use autocomplete but haven’t built an agent', 'I want the behind-the-scenes, not the pitch', 'I’d rather build than watch'],
};
