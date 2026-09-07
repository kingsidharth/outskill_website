import type { Program } from './types';

export const bootcamp: Program = {
  slug: 'bootcamp',
  name: 'AI Engineering Bootcamp',
  eyebrow: '14 days · evenings · live',
  headline: 'Ship a coding agent that opens pull requests.',
  subhead: 'Fourteen evenings. You build one agent that plans, edits a real repo, and opens a PR.',
  ctaLabel: 'Enrol',
  ctaHref: '#register',
  stats: [{ label: 'Duration', value: '14 days' }, { label: 'Format', value: 'Live sprints' }, { label: 'Focus', value: 'Coding agents' }, { label: 'Output', value: 'Working systems' }],
  price: { current: '₹2,499', original: '₹19,999', note: 'Intro price for this cohort' },
  features: [
    { title: 'Agent loop', body: 'Turn a task into a repeatable cycle of context, model calls, tools, memory, and review.' },
    { title: 'Tool calling', body: 'Give coding agents safe, typed access to files, shells, APIs, and source control.' },
    { title: 'Context management', body: 'Select, compress, and refresh the context an agent needs at each step.' },
    { title: 'Memory', body: 'Separate short-term working state from durable project knowledge.' },
    { title: 'Sandboxed execution', body: 'Run generated code with boundaries, permissions, and failure handling.' },
    { title: 'Evals', body: 'Measure agent behavior with task suites instead of trusting one impressive demo.' },
    { title: 'Multi-agent orchestration', body: 'Coordinate specialist agents without losing control of the workflow.' },
  ],
  sprints: [
    { n: 0, title: 'Agent foundations', days: 'Days 1–2', focus: 'The loop', learn: ['Model calls and state', 'Context and memory', 'Tool schemas'], ship: 'A coding-agent loop that plans and acts.', tools: ['TypeScript', 'LLM APIs', 'Git'] },
    { n: 1, title: 'Context and tools', days: 'Days 3–4', focus: 'Useful actions', learn: ['Tool calling', 'File and shell tools', 'Permission boundaries'], ship: 'An agent that reads and changes a real repository.', tools: ['Node.js', 'Shell', 'MCP'] },
    { n: 2, title: 'Memory and review', days: 'Days 5–6', focus: 'Reliable state', learn: ['Working memory', 'Durable memory', 'Human review gates'], ship: 'A coding agent that resumes work and asks for review.', tools: ['SQLite', 'Git', 'Test runners'] },
    { n: 3, title: 'Sandboxed execution', days: 'Days 7–8', focus: 'Safe execution', learn: ['Isolation', 'Resource limits', 'Failure recovery'], ship: 'A bounded runner for generated code.', tools: ['Containers', 'Queues', 'Observability'] },
    { n: 4, title: 'Agent evals', days: 'Days 9–10', focus: 'Measurement', learn: ['Task suites', 'Traces and graders', 'Regression checks'], ship: 'An eval set that catches agent regressions.', tools: ['JSONL', 'Test runners', 'Tracing'] },
    { n: 5, title: 'Orchestration', days: 'Days 11–12', focus: 'Multiple agents', learn: ['Roles', 'Handoffs', 'Parallel work'], ship: 'A small team of agents that completes a feature.', tools: ['Queues', 'Workers', 'Webhooks'] },
    { n: 6, title: 'Production loop', days: 'Day 13', focus: 'Operations', learn: ['Retries', 'Cost controls', 'Audit logs'], ship: 'A monitored agent service with explicit limits.', tools: ['Docker', 'Logs', 'Metrics'] },
    { n: 7, title: 'Capstone', days: 'Day 14', focus: 'Ship', learn: ['Scope a real workflow', 'Run evals', 'Demo the system'], ship: 'A portfolio-ready coding agent.', tools: ['Your stack', 'CI', 'Deployment'] },
  ],
  outcomes: ['A coding agent of your own, running from first principles', 'An agent that reads and changes a real repository through typed tools', 'Work that survives a break — context and memory carried across tasks', 'Generated code that runs inside a sandbox you control', 'An eval suite that catches your agent regressing', 'A small team of agents finishing one engineering workflow'],
  audience: ['Software engineers ready to move beyond autocomplete', 'Technical leads building internal developer tools', 'Founders prototyping AI-native products', 'Developers who learn by shipping'],
  faq: [
    { q: 'What will I build?', a: 'You build a coding agent that can inspect a repository, use tools, run tests, and complete scoped work.' },
    { q: 'Do I need to know machine learning?', a: 'No. You need programming experience and comfort reading and changing code.' },
    { q: 'Why is the program split into sprints?', a: 'Each sprint adds one system layer and ends with something runnable, so the final agent has a clear history.' },
    { q: 'How are agents made safe?', a: 'The curriculum covers sandboxing, permissions, review gates, retries, logs, and evals.' },
    { q: 'Is this about using existing coding tools?', a: 'You may use them as references, but the core work is building the underlying agent patterns yourself.' },
    { q: 'What is included?', a: 'The full 14-day sprint programme, the build material, code review, and the recordings. The amount is in the pricing section on this page.' },
    { q: 'What do I need before day one?', a: 'Working programming experience, a machine you can install things on, and an API key for a model provider. No machine learning background is assumed.' },
  ],
  seo: { title: '14 days — ship your own coding agent', description: 'Fourteen evenings of live sprints. You leave with a coding agent that plans, edits a real repo, runs tests, and opens a pull request.' },

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
      'Fourteen live evening sprints',
      'Eight builds, each one runnable',
      'Code review on your own repository',
      'Recordings of every session', // TODO(founder): confirm recordings
      'The full sprint material and starter repos',
      'Free Python Basecamp before day one',
      'Cohort channel for the fourteen days', // TODO(founder): confirm a cohort channel exists
      'Your agent, your code, yours to keep',
    ],
  },
  whatYouGet: [
    'A coding agent that plans, edits, tests and opens a PR',
    'Eight sprint builds you can run after the cohort',
    'The agent loop taken apart layer by layer',
    'Typed file, shell and source-control tools',
    'Working memory and durable memory, separated',
    'A sandbox that bounds what generated code can do',
    'An eval suite that catches your agent regressing',
    'A small team of agents finishing one workflow',
    'Review on your code from someone who has shipped it', // TODO(founder): confirm reviewer
    'Recordings and material you keep', // TODO(founder): confirm recordings
  ],
  isThisForMe: [
    'I write code most weeks',
    'I have a repository I actually care about',
    'Autocomplete is no longer enough for me',
    'I can give fourteen evenings to this',
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
  'Sandboxed execution: isolation, limits, failure recovery.',
  'Evals, traces and regression checks for agent behaviour.',
  'Orchestrating several agents without losing control.',
  'Running an agent in production: retries, cost caps, audit logs.',
];

export const bootcampDontCover: { title: string; nuance?: string }[] = [
  { title: 'The traditional front-end / back-end stack', nuance: 'We do cover how it changes once an agent writes the code.' },
  { title: 'Database modelling', nuance: 'We do cover the data patterns agents need.' },
  { title: 'InfoSec and traditional security', nuance: 'We do cover permissions, sandboxing and privacy under AI.' },
  { title: 'ML maths and fine-tuning', nuance: 'That is the Fellowship, not fourteen evenings.' },
];
