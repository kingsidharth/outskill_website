import type { Workshop, FAQItem } from './types';

// TODO(founder): supply the real per-workshop registration URLs. Until then all
// six point at the main site rather than at invented deep links.
const WORKSHOP_REGISTER_URL = 'https://outskill.com/';

/**
 * V2 addition, kept local to this file so `types.ts` stays untouched.
 * Purely additive: every field the homepage already reads still exists.
 *
 * `tag`      — the audience string shown beside the tool name on a card.
 * `build`    — the three things you actually leave the 90 minutes with.
 * `needs`    — one short line on what you need to bring.
 *
 * V3 adds the landing-page payload: every workshop gets `/workshops/<slug>`.
 */
export type LadderStep = {
  /** 1..5. Rendered as the big numeral. */
  n: number;
  /** <= 6 words. */
  title: string;
  /** <= 20 words. Empty for the hidden step. */
  blurb: string;
  /** Title + one line only — the rest happens in the room. */
  teaser?: boolean;
  /** Never described on the page. The card renders a fixed locked line. */
  hidden?: boolean;
};

export type WorkshopVariant = Workshop & {
  /** Short audience label, e.g. "For coders". Rendered small and muted. */
  tag: string;
  /** Exactly three concrete things you build in the session. */
  build: [string, string, string];
  /** One-line note on what you need to bring. */
  needs: string;

  /* ---- V3: landing page ---- */
  /** Full name, e.g. "Claude Code Workshop". */
  name: string;
  /** Who it is written for, one short phrase. */
  icp: string;
  /** Flip to false to hide the LP, the strips, and the index card. */
  enabled: boolean;
  /** Route for the landing page. */
  path: string;
  /** Hero headline. Outcome, not tool. */
  promise: string;
  /** One line under the headline. */
  subhead: string;
  /** The use-case ladder: 1-3 full, 4 teaser, 5 hidden. */
  steps: LadderStep[];
  /** Coder LPs only: the "vibe coders welcome" line. */
  vibeWelcome?: string;
  /** Hero art basename in /gen/v2/ (mobile crop is `<art>-m.webp`). */
  art: string;
  /**
   * V4: the tool mark, in `public/logos/`. Transparent background — the light
   * chip around it is drawn by `ToolLogos.astro`. Empty string means the tool
   * has no mark and is rendered as a text badge instead.
   */
  logo: string;
  faq: FAQItem[];
  /** Slugs of the two or three sibling LPs to cross-link. */
  related: string[];
};

/** The three coder LPs are ~90% the same session; only the tool changes. */
const coderSteps = (tool: string): LadderStep[] => [
  {
    n: 1,
    title: 'Write the ticket, get the plan',
    blurb: `One real task. ${tool} returns a plan you can argue with.`,
  },
  {
    n: 2,
    title: 'Change code in a real repo',
    blurb: 'Your repo, your branch. The agent changes it. You read every line.',
  },
  {
    n: 3,
    title: 'Tests and review, in the loop',
    blurb: 'It writes the test, runs it, fixes what fails. You decide what ships.',
  },
  {
    n: 4,
    title: 'Refactor across the repo',
    blurb: 'Twenty files, one pass. Live.',
    teaser: true,
  },
  { n: 5, title: 'Surprise', blurb: '', hidden: true },
];

const coderFaq = (tool: string): FAQItem[] => [
  {
    q: 'Do I need to prepare anything?',
    a: `A repo you can edit, a terminal, ${tool} signed in. Do the account bit before.`,
  },
  {
    q: 'Is my code safe to use in the session?',
    a: 'Use a repo you can share on screen, or a scratch branch. We upload nothing.',
  },
  {
    q: 'I use a different tool at work.',
    a: 'Same loop in all three. Take the one for the tool you already pay for.',
  },
  {
    q: 'Is there a recording?',
    a: 'Yes, sent afterwards. But you build during the session, so come live.',
  },
];

const sharedProofFaq: FAQItem[] = [
  {
    q: 'Is it really free?',
    a: 'Yes. Ninety minutes, live, nothing to pay.',
  },
];

/**
 * Rung 0. All free, all 90 minutes, ~90% the same content — the tool differs.
 * We list the tool, not the syllabus, because that is how people choose.
 */
const allWorkshops: WorkshopVariant[] = [
  {
    slug: 'chatgpt',
    tool: 'ChatGPT',
    name: 'ChatGPT Workshop',
    icp: 'Generalists and vibe coders',
    enabled: true,
    path: '/workshops/chatgpt',
    tag: 'No code needed',
    audience: ['vibe-coders', 'everyone'],
    outcome: 'Build a working assistant for one job you do weekly — no code.',
    promise: 'Leave with an assistant that does one job from your week.',
    subhead: 'Bring a task you repeat every week. It leaves working.',
    art: 'workshop',
    logo: '/logos/chatgpt.svg',
    steps: [
      {
        n: 1,
        title: 'Draft the doc you owe today',
        blurb: 'The thing you are avoiding. Out as a draft worth editing.',
      },
      {
        n: 2,
        title: 'Turn it into a running checklist',
        blurb: 'The same job as steps the model repeats next week without you.',
      },
      {
        n: 3,
        title: 'A custom GPT for one job',
        blurb: 'Wrap it so a colleague can run it. Test it before we end.',
      },
      {
        n: 4,
        title: 'Connect it to your data',
        blurb: 'Your files, your sheet, your notes. Answers from your work.',
        teaser: true,
      },
      { n: 5, title: 'Surprise', blurb: '', hidden: true },
    ],
    build: [
      'One assistant that does a real task from your week, end to end',
      'A prompt you can hand to someone else and have it still work',
      'A short checklist for spotting when the model is guessing',
    ],
    needs: 'A browser and a ChatGPT account. Nothing to install.',
    href: WORKSHOP_REGISTER_URL,
    related: ['claude-code', 'codex', 'copilot'],
    faq: [
      ...sharedProofFaq,
      {
        q: 'Do I need to write code?',
        a: 'No. Everything runs in a browser.',
      },
      {
        q: 'What should I bring?',
        a: 'One job you do every week and hate. Boring is good.',
      },
      {
        q: 'Is there a recording?',
        a: 'Yes, sent afterwards. But you build during the session, so come live.',
      },
    ],
  },
  {
    slug: 'claude-code',
    tool: 'Claude Code',
    name: 'Claude Code Workshop',
    icp: 'People who write code for a living',
    enabled: true,
    path: '/workshops/claude-code',
    tag: 'For coders',
    audience: ['coders'],
    outcome: 'Hand a real ticket from your repo to an agent and review the diff it opens.',
    promise: 'Ship one real ticket from your own repo tonight.',
    subhead: 'Your repo, your branch, your review. The agent types.',
    art: 'coders',
    logo: '/logos/claude-code.svg',
    steps: coderSteps('Claude Code'),
    vibeWelcome:
      'Vibe coders welcome. If you build with AI but do not write code every day, you will keep up — the agent handles the syntax and we spend the time on judgement.',
    build: [
      'One ticket from your own repo, handed to the agent and finished',
      'A project instructions file the agent actually follows',
      'A review pass on the diff, with the parts you would reject marked',
    ],
    needs: 'Your own repo, a terminal, and a Claude account.',
    href: WORKSHOP_REGISTER_URL,
    related: ['chatgpt', 'ai-for-pms', 'ai-for-founders'],
    faq: [...sharedProofFaq, ...coderFaq('Claude Code')],
  },
  {
    slug: 'codex',
    tool: 'Codex',
    name: 'Codex Workshop',
    icp: 'People who write code for a living',
    enabled: true,
    path: '/workshops/codex',
    tag: 'For coders',
    audience: ['coders'],
    outcome: 'Hand a real ticket from your repo to an agent and review the diff it opens.',
    promise: 'Ship one real ticket from your own repo tonight.',
    subhead: 'Your repo, your branch, your review. The agent types.',
    art: 'coders',
    logo: '/logos/codex.svg',
    steps: coderSteps('Codex'),
    vibeWelcome:
      'Vibe coders welcome. If you build with AI but do not write code every day, you will keep up — the agent handles the syntax and we spend the time on judgement.',
    build: [
      'One ticket from your own repo, handed to the agent and finished',
      'A task description tight enough that the agent stops guessing',
      'A review pass on the diff, with the parts you would reject marked',
    ],
    needs: 'Your own repo, a terminal, and an OpenAI account.',
    href: WORKSHOP_REGISTER_URL,
    related: ['chatgpt', 'ai-for-pms', 'ai-for-founders'],
    faq: [...sharedProofFaq, ...coderFaq('Codex')],
  },
  {
    slug: 'copilot',
    tool: 'GitHub Copilot',
    name: 'Copilot Workshop',
    icp: 'People who write code for a living',
    enabled: true,
    path: '/workshops/copilot',
    tag: 'For coders',
    audience: ['coders'],
    outcome: 'Move past autocomplete: give Copilot a whole task and check its work.',
    promise: 'Hand Copilot a whole task, not a line.',
    subhead: 'Your repo, your branch, your review. Copilot types.',
    art: 'coders',
    logo: '/logos/copilot.svg',
    steps: coderSteps('Copilot'),
    vibeWelcome:
      'Vibe coders welcome. If you build with AI but do not write code every day, you will keep up — the agent handles the syntax and we spend the time on judgement.',
    build: [
      'One whole task handed over in the editor, not line-by-line completion',
      'Instructions in the repo that change what Copilot suggests',
      'A review pass on the result, with the parts you would reject marked',
    ],
    needs: 'VS Code, a repo you can edit, and a Copilot seat.',
    href: WORKSHOP_REGISTER_URL,
    related: ['chatgpt', 'ai-for-pms', 'ai-for-founders'],
    faq: [...sharedProofFaq, ...coderFaq('Copilot')],
  },
  {
    slug: 'ai-for-pms',
    tool: 'AI for PMs',
    name: 'AI for Product Managers',
    icp: 'Product managers',
    enabled: true,
    path: '/workshops/ai-for-pms',
    tag: 'For PMs',
    audience: ['vibe-coders', 'everyone'],
    outcome: 'Turn a spec into a clickable prototype your engineers can react to.',
    promise: 'Turn one stuck spec into something your team can click.',
    subhead: 'PRD, technical questions, clickable prototype. One sitting.',
    art: 'workshop',
    logo: '',
    steps: [
      {
        n: 1,
        title: 'Write the PRD',
        blurb: 'The feature you keep re-explaining, as a doc engineering reads once.',
      },
      {
        n: 2,
        title: 'Technical considerations, in plain terms',
        blurb: 'The questions engineers will ask, surfaced before the meeting.',
      },
      {
        n: 3,
        title: 'UX and a clickable prototype',
        blurb: 'One screen, working. People argue better with a prototype than a doc.',
      },
      {
        n: 4,
        title: 'Market analysis and pricing',
        blurb: 'Who else does this, and what you can charge. Live, on your feature.',
        teaser: true,
      },
      { n: 5, title: 'Surprise', blurb: '', hidden: true },
    ],
    build: [
      'A clickable prototype of one screen your team is still arguing about',
      'The spec rewritten so the model and the team read it the same way',
      'A list of the questions the prototype answered faster than a doc',
    ],
    needs: 'A browser and a spec you are currently stuck on.',
    href: WORKSHOP_REGISTER_URL,
    related: ['claude-code', 'codex', 'copilot'],
    faq: [
      ...sharedProofFaq,
      {
        q: 'Do I need to write code?',
        a: 'No. Everything runs in a browser. The prototype is clickable, not production.',
      },
      {
        q: 'What should I bring?',
        a: 'One feature stuck in review, and your notes on it.',
      },
      {
        q: 'Will my engineers take this seriously?',
        a: 'A working screen gets taken more seriously than a doc. Bring it to refinement and see.',
      },
    ],
  },
  {
    slug: 'ai-for-founders',
    tool: 'AI for Founders',
    name: 'AI for Founders',
    icp: 'Founders and solo operators',
    // TODO(founder): flip to false to hide this landing page everywhere.
    enabled: true,
    path: '/workshops/ai-for-founders',
    tag: 'For founders',
    audience: ['vibe-coders', 'everyone'],
    outcome: 'Leave with a one-pager, a clickable prototype, and one job automated.',
    promise: 'A one-pager, a clickable prototype, and one job off your plate.',
    subhead: 'Ninety minutes on the three things nobody else will do for you.',
    art: 'workshop',
    logo: '',
    steps: [
      {
        n: 1,
        title: 'The one-pager investors read',
        blurb: 'What, for whom, why now. One page, your words.',
      },
      {
        n: 2,
        title: 'A prototype people can click',
        blurb: 'The core screen, working. Show someone this week.',
      },
      {
        n: 3,
        title: 'Your first automation',
        blurb: 'Follow-ups, updates or reports. Handed over, running.',
      },
      {
        n: 4,
        title: 'Pricing and positioning',
        blurb: 'What to charge. Who to say no to. Live.',
        teaser: true,
      },
      { n: 5, title: 'Surprise', blurb: '', hidden: true },
    ],
    build: [
      'A one-page description of the company that reads well cold',
      'A clickable prototype of the screen your product lives or dies on',
      'One recurring job automated and running before you close the laptop',
    ],
    needs: 'A browser, and the idea you keep explaining at dinner.',
    href: WORKSHOP_REGISTER_URL,
    related: ['claude-code', 'codex', 'copilot'],
    faq: [
      ...sharedProofFaq,
      {
        q: 'I am not technical. Is that a problem?',
        a: 'No. If you can write an email you can follow it.',
      },
      {
        q: 'Is this a pitch-deck session?',
        a: 'No. One-pager, prototype, one automation. Decks come after someone wants the thing.',
      },
      {
        q: 'What should I bring?',
        a: 'The idea, and one weekly job you resent.',
      },
    ],
  },
];

/** Everything the site renders. Flip `enabled` to hide a workshop everywhere. */
export const workshops: WorkshopVariant[] = allWorkshops.filter((w) => w.enabled);

export const workshopBySlug = Object.fromEntries(workshops.map((w) => [w.slug, w]));

/**
 * "Usually every other day" rendered honestly: the next evening slot at
 * 19:00 IST from a given instant. Built in UTC then shifted by +05:30 so the
 * build machine's timezone never matters.
 *
 * The server renders this at build time; NextSession.tsx (and the inline
 * script on each LP) recomputes it on the client so a stale build never shows
 * a date in the past.
 */
export function nextWorkshopSession(from: Date = new Date()): Date {
  const IST = 5.5 * 60 * 60 * 1000;
  const ist = new Date(from.getTime() + IST);
  const slot = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), 13, 30, 0));
  // 19:00 IST == 13:30 UTC on the same calendar day.
  if (slot.getTime() <= from.getTime()) slot.setUTCDate(slot.getUTCDate() + 1);
  return slot;
}

export function formatIST(d: Date): string {
  // Same hand-rolled parts as formatWhen, so server and island agree ("Sep", not "Sept").
  const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
  return `${DAYS[ist.getUTCDay()]}, ${ist.getUTCDate()} ${MONTHS[ist.getUTCMonth()]}`;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * The exact "When" string the landing pages require: "Sat, 12 Sep at 7:00 PM IST".
 * Hand-rolled rather than Intl because current ICU renders September as "Sept"
 * for en-IN, and the client-side refresh has to produce the identical string.
 */
export function formatWhen(d: Date): string {
  const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
  return `${DAYS[ist.getUTCDay()]}, ${ist.getUTCDate()} ${MONTHS[ist.getUTCMonth()]} at ${WORKSHOP_TIME}`;
}

export const WORKSHOP_TIME = '7:00 PM IST';
