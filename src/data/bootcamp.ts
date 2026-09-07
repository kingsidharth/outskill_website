import type { Program } from './types';

export const bootcamp: Program = {
  slug: 'bootcamp',
  name: '2-Day Bootcamp',
  eyebrow: '2 days · 4 sessions · live',
  headline: 'Ship a coding agent that opens pull requests.',
  subhead: 'Two days, four live sessions. You build one agent that plans, edits a real repo, and opens a PR.',
  ctaLabel: 'Enrol',
  ctaHref: '#register',
  stats: [{ label: 'Duration', value: '2 days' }, { label: 'Format', value: 'Live, 4 sessions' }, { label: 'Focus', value: 'Coding agents' }, { label: 'Output', value: 'A working agent' }],
  price: { current: '₹2,499', original: '₹19,999', note: 'Intro price for this cohort' },
  features: [
    { title: 'Agent loop', body: 'Turn a task into a repeatable cycle of context, model calls, tools, memory, and review.' },
    { title: 'Tool calling', body: 'Give coding agents safe, typed access to files, shells, APIs, and source control.' },
    { title: 'Context management', body: 'Select, compress, and refresh the context an agent needs at each step.' },
    { title: 'Memory', body: 'Separate short-term working state from durable project knowledge.' },
    { title: 'Sandboxed execution', body: 'Run generated code with boundaries, permissions, and failure handling.' },
    { title: 'Evals', body: 'Measure agent behavior with task suites instead of trusting one impressive demo.' },
  ],
  /* Four live sessions across two days. Each one adds a layer and ends with
     something runnable; day two ends with an agent that opens a PR. */
  sprints: [
    { n: 1, title: 'The agent loop', days: 'Day 1 · morning', focus: 'Planning', learn: ['Model calls and state', 'Context and planning', 'Tool schemas'], ship: 'A coding-agent loop that plans a task and acts on it.', tools: ['TypeScript', 'LLM APIs', 'Git'] },
    { n: 2, title: 'Tools on a real repo', days: 'Day 1 · afternoon', focus: 'Useful actions', learn: ['Tool calling', 'File and shell tools', 'Permission boundaries'], ship: 'An agent that reads and changes a real repository.', tools: ['Node.js', 'Shell', 'MCP'] },
    { n: 3, title: 'Memory and review', days: 'Day 2 · morning', focus: 'Reliable state', learn: ['Working memory', 'Durable project memory', 'Review gates and sandboxing'], ship: 'An agent that resumes work, runs code in a sandbox, and asks for review.', tools: ['SQLite', 'Containers', 'Test runners'] },
    { n: 4, title: 'Ship it, then measure it', days: 'Day 2 · afternoon', focus: 'Ship', learn: ['Opening a pull request', 'Task suites and graders', 'Cost caps and logs'], ship: 'A coding agent that opens a PR, with an eval set that catches it regressing.', tools: ['Git', 'CI', 'Tracing'] },
  ],
  outcomes: ['A coding agent of your own, running from first principles', 'An agent that reads and changes a real repository through typed tools', 'Work that survives a break — context and memory carried across tasks', 'Generated code that runs inside a sandbox you control', 'An eval suite that catches your agent regressing', 'A pull request opened by the agent you built'],
  audience: ['Software engineers ready to move beyond autocomplete', 'Technical leads building internal developer tools', 'Founders prototyping AI-native products', 'Developers who learn by shipping'],
  faq: [
    { q: 'What will I build?', a: 'You build a coding agent that can inspect a repository, use tools, run tests, and complete scoped work.' },
    { q: 'Do I need to know machine learning?', a: 'No. You need programming experience and comfort reading and changing code.' },
    { q: 'Why is the programme split into four sessions?', a: 'Each session adds one system layer and ends with something runnable, so the final agent has a clear history.' },
    { q: 'How are agents made safe?', a: 'The curriculum covers sandboxing, permissions, review gates, retries, logs, and evals.' },
    { q: 'Is this about using existing coding tools?', a: 'You may use them as references, but the core work is building the underlying agent patterns yourself.' },
    { q: 'What is included?', a: 'All four live sessions across the two days, the build material, code review, and the recordings. The amount is in the pricing section on this page.' },
    { q: 'What do I need before day one?', a: 'Working programming experience, a machine you can install things on, and an API key for a model provider. No machine learning background is assumed.' },
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
    includes: [
      'Four live sessions across two days',
      'Four builds, each one runnable',
      'Code review on your own repository',
      'Recordings of every session', // TODO(founder): confirm recordings
      'The full session material and starter repos',
      'Free Python Basecamp before day one',
      'A cohort channel for the two days', // TODO(founder): confirm a cohort channel exists
      'Your agent, your code, yours to keep',
    ],
  },
  whatYouGet: [
    'A coding agent that plans, edits, tests and opens a PR',
    'Four session builds you can run after the cohort',
    'The agent loop taken apart layer by layer',
    'Typed file, shell and source-control tools',
    'Working memory and durable memory, separated',
    'A sandbox that bounds what generated code can do',
    'An eval suite that catches your agent regressing',
    'Review on your code from someone who has shipped it', // TODO(founder): confirm reviewer
    'Recordings and material you keep', // TODO(founder): confirm recordings
  ],
  isThisForMe: [
    'I write code most weeks',
    'I have a repository I actually care about',
    'Autocomplete is no longer enough for me',
    'I can give two full days to this',
    'I want to build the tool, not wait for it',
    'I would rather ship than take notes',
    'I am fine reading someone else’s codebase',
  ],
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
  body: 'A fresher session plus resources, before day one.',
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
  { title: 'The traditional front-end / back-end stack', nuance: 'We do cover how it changes once an agent writes the code.' },
  { title: 'Database modelling', nuance: 'We do cover the data patterns agents need.' },
  { title: 'InfoSec and traditional security', nuance: 'We do cover permissions, sandboxing and privacy under AI.' },
  { title: 'Multi-agent orchestration and production operations', nuance: 'That is the Accelerator, not two days.' },
  { title: 'ML maths and fine-tuning', nuance: 'That is the Fellowship, not two days.' },
];
