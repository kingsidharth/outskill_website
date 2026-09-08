import type { Program } from './types';

export const bootcamp: Program = {
  slug: 'bootcamp',
  name: '2-Day Bootcamp',
  eyebrow: '2 days · 4 sessions · live',
  headline: 'Ship a coding agent that opens pull requests.',
  subhead: 'Two days, four live sessions. Your agent plans, edits a real repo, opens a PR.',
  ctaLabel: 'Enrol',
  ctaHref: '#register',
  stats: [{ label: 'Duration', value: '2 days' }, { label: 'Format', value: 'Live, 4 sessions' }, { label: 'Focus', value: 'Coding agents' }, { label: 'Output', value: 'A working agent' }],
  price: { current: '₹2,499', original: '₹19,999', note: 'Intro price for this cohort' },
  features: [
    { title: 'Agent loop', body: 'Context, model, tools, memory, review. On repeat.' },
    { title: 'Tool calling', body: 'Safe, typed access to files, shell, APIs and git.' },
    { title: 'Context management', body: 'Select, compress, refresh. Only what the next step needs.' },
    { title: 'Memory', body: 'Working state and durable project knowledge, kept apart.' },
    { title: 'Sandboxed execution', body: 'Generated code runs inside limits you set.' },
    { title: 'Evals', body: 'Task suites, not one impressive demo.' },
  ],
  /* Four live sessions across two days. Each one adds a layer and ends with
     something runnable; day two ends with an agent that opens a PR. */
  sprints: [
    { n: 1, title: 'The agent loop', days: 'Day 1 · morning', focus: 'Planning', learn: ['Model calls and state', 'Context and planning', 'Tool schemas'], ship: 'A coding-agent loop that plans a task and acts on it.', tools: ['TypeScript', 'LLM APIs', 'Git'] },
    { n: 2, title: 'Tools on a real repo', days: 'Day 1 · afternoon', focus: 'Useful actions', learn: ['Tool calling', 'File and shell tools', 'Permission boundaries'], ship: 'An agent that reads and changes a real repository.', tools: ['Node.js', 'Shell', 'MCP'] },
    { n: 3, title: 'Memory and review', days: 'Day 2 · morning', focus: 'Reliable state', learn: ['Working memory', 'Durable project memory', 'Review gates and sandboxing'], ship: 'An agent that resumes work, runs code in a sandbox, and asks for review.', tools: ['SQLite', 'Containers', 'Test runners'] },
    { n: 4, title: 'Ship it, then measure it', days: 'Day 2 · afternoon', focus: 'Ship', learn: ['Opening a pull request', 'Task suites and graders', 'Cost caps and logs'], ship: 'A coding agent that opens a PR, with an eval set that catches it regressing.', tools: ['Git', 'CI', 'Tracing'] },
  ],
  outcomes: ['Your own coding agent, from first principles', 'It reads and changes a real repo', 'It opens a PR you review'],
  audience: ['Software engineers ready to move beyond autocomplete', 'Technical leads building internal developer tools', 'Founders prototyping AI-native products', 'Developers who learn by shipping'],
  faq: [
    { q: 'What will I build?', a: 'A coding agent that reads a repo, uses tools, runs tests and opens a PR.' },
    { q: 'Do I need machine learning?', a: 'No. You need to read and change code comfortably.' },
    { q: 'Why four sessions?', a: 'One system layer each. Every session ends with something that runs.' },
    { q: 'How are agents kept safe?', a: 'Sandboxing, permissions, review gates, logs, evals.' },
    { q: 'Is this about using Cursor or Claude Code?', a: 'No. You build the patterns underneath them yourself.' },
    { q: 'What is included?', a: 'Four live sessions, build material, code review, recordings. Price is in the pricing section.' },
    { q: 'What do I need before day one?', a: 'A machine you can install on and an API key for a model provider.' },
  ],
  seo: { title: 'AI Engineering Bootcamp — two days, ship your own coding agent', description: 'Two days, four live sessions. You leave with a coding agent that plans, edits a real repo, runs tests, and opens a pull request.' },

  /* ---- V3: the only place an amount lives (BRIEF-V3 §2) ---- */
  pricing: {
    list: '₹19,999',
    current: '₹2,499',
    kind: 'buy',
    ctaLabel: 'Enrol',
    ctaHref: '#register',
    // TODO(founder): confirm "one payment, no subscription".
    note: 'Intro price for this cohort. One payment, no subscription.',
    includes: ['Four live sessions, two days', 'Four runnable builds', 'Code review on your repo', 'Recordings, material, starter repos', 'Python Basecamp, free', 'Your agent, yours to keep'],
  },
  whatYouGet: ['A coding agent that plans, edits, tests and opens a PR', 'Four builds you can run after', 'Typed file, shell and git tools', 'A sandbox that bounds generated code', 'An eval suite that catches regressions', 'Code review, recordings, material'],
  isThisForMe: ['I write code most weeks', 'I have a repo I care about', 'Autocomplete is not enough anymore', 'I can give two full days', 'I’d rather ship than take notes'],
};

/* ---- V3 extras. Kept as named exports so the shared `Program` type stays
   untouched while another builder edits it for the Accelerator. ---- */

/** Big-type community line. Descriptors come from `bootcamp.audience`. */
export const bootcampCommunity = [
  'Software engineers.',
  'Technical leads.',
  'Founders shipping their own product.',
  'You?',
];

/** Free pre-course session (BRIEF-V3 §5). */
export const bootcampBasecamp = {
  title: 'Free: Python Basecamp',
  body: 'A refresher session and resources, before day one.',
  helpsIf: [
    'not familiar with Python',
    'haven’t coded in a while',
    'vibe coder',
    'don’t write Python every day',
  ],
};

export const bootcampCover: string[] = [
  'The agent loop — context, model call, tools, memory, review.',
  'Tool calling against files, shells, APIs and source control.',
  'Working memory and durable project memory, kept apart.',
  'Sandboxed execution: isolation, limits, failure recovery.',
  'Evals, traces and regression checks for agent behaviour.',
  'Cost caps and logs for the agent you keep running afterwards.',
];

export const bootcampDontCover: { title: string; nuance?: string }[] = [
  { title: 'The traditional front-end / back-end stack', nuance: 'We cover how it changes when an agent writes the code.' },
  { title: 'Database modelling', nuance: 'We cover the data patterns agents need.' },
  { title: 'InfoSec and traditional security', nuance: 'We cover permissions, sandboxing and privacy under AI.' },
  { title: 'Multi-agent orchestration and production operations', nuance: 'That is the Accelerator.' },
  { title: 'ML maths and fine-tuning', nuance: 'That is the Fellowship.' },
];
