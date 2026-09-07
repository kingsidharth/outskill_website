import type { Program } from './types';

export const fellowship: Program = {
  slug: 'fellowship',
  name: 'AI Engineering Fellowship (GEF)',
  eyebrow: '6 months · weekends only',
  headline: 'Six months of weekends. A capstone you defend.',
  subhead: 'Four months across six levels, then two months building one system under supervision. Weekends only.',
  ctaLabel: 'Apply now',
  ctaHref: '#apply',
  stats: [{ label: 'Duration', value: '6 months' }, { label: 'Levels', value: '6' }, { label: 'Format', value: 'Weekends only' }, { label: 'Capstone', value: '2 months' }],
  price: { current: '₹2,00,000', note: 'Applications reviewed in 48 hours' },
  features: [
    { title: 'ML fundamentals', body: 'Build the mathematical and conceptual base needed to reason about models.' },
    { title: 'LLM theory', body: 'Understand tokenization, transformers, attention, and scaling laws.' },
    { title: 'Forward-deployed skills', body: 'Scope useful work, design evaluations, and ship with customers.' },
    { title: 'Implementation', body: 'Build RAG systems, agents, and the infrastructure around them.' },
    { title: 'Fine-tuning', body: 'A later level covers when and how to adapt models with fine-tuning.' },
    { title: 'Architecture', body: 'A later level covers the systems design needed for dependable AI products.' },
  ],
  levels: [
    { n: 0, title: 'ML fundamentals & math', theory: ['Vectors, matrices, probability', 'Optimization and loss', 'Training and generalization'], skills: ['Read model behavior', 'Reason about data and errors', 'Use evaluation language precisely'], build: ['A small supervised learning system', 'A measurement notebook'] },
    { n: 1, title: 'LLM theory', theory: ['Tokenization', 'Transformers and attention', 'Scaling laws and inference'], skills: ['Trace an LLM request', 'Compare model capabilities', 'Connect theory to product limits'], build: ['A tokenizer and attention walkthrough', 'A measured LLM application'] },
    { n: 2, title: 'Forward-deployed skills', theory: ['Problem framing', 'Evaluation design', 'Customer feedback loops'], skills: ['Scope with customers', 'Define success metrics', 'Ship and iterate in the field'], build: ['A scoped customer brief', 'An eval plan and pilot'] },
    { n: 3, title: 'Implementation', theory: ['Retrieval patterns', 'Agent architectures', 'AI infrastructure'], skills: ['Build RAG', 'Build tool-using agents', 'Operate data and model pipelines'], build: ['A grounded assistant', 'A production-shaped agent system'] },
    { n: 4, title: 'Fine-tuning', later: true, theory: ['Adaptation objectives', 'Data quality and curation', 'Training and serving trade-offs'], skills: ['Choose fine-tuning vs prompting or RAG', 'Prepare a training set', 'Evaluate an adapted model'], build: ['A fine-tuned model experiment', 'A comparison against a baseline'] },
    { n: 5, title: 'Architecture & systems design', later: true, theory: ['Distributed system boundaries', 'Reliability and observability', 'Cost, latency, and scale'], skills: ['Design end-to-end AI systems', 'Make explicit trade-offs', 'Lead technical reviews'], build: ['An architecture proposal', 'A production readiness review'] },
  ],
  outcomes: ['A capstone system built over two supervised months, and defended in review', 'Grounded assistants and tool-using agents you designed and operated', 'Evaluations tied to what a real user needed, not to a benchmark', 'Work shipped with users through a forward-deployed workflow', 'Model, cost, latency, and architecture trade-offs you can argue for out loud'],
  audience: ['Engineers building a durable AI career without leaving their job', 'ML practitioners expanding into product delivery', 'Developers who want the theory as well as the implementation', 'Technical professionals ready for customer-facing work'],
  faq: [
    { q: 'What does GEF stand for?', a: 'GEF is the AI Engineering Fellowship: six months on weekends, six levels, ending in a two-month capstone.' },
    { q: 'Do I need an ML background?', a: 'No. Level 0 establishes the ML and math foundations, while programming experience is expected.' },
    { q: 'What does forward-deployed engineering mean here?', a: 'It means scoping problems with customers, designing useful evals, and shipping systems in their real environment.' },
    { q: 'When do fine-tuning and architecture appear?', a: 'They are later levels, after the fundamentals, theory, field skills, and implementation layers.' },
    { q: 'How are the six months split?', a: 'Four months of structured learning across the six levels, then two months building one capstone system with supervision and review.' },
    { q: 'Can I do this alongside a full-time job?', a: 'That is what the schedule is for. Sessions run on weekends across the six months, so weekdays stay yours.' },
    { q: 'How do I apply?', a: 'Leave your email in the application form. Applications are reviewed in 48 hours and the team comes back with fit, schedule, and the payment path. The fee is in the pricing section on this page.' },
  ],
  seo: { title: '6 months of weekends — build and defend a capstone AI system', description: 'Four months of learning across six levels, then two months building one system under supervision. Weekends only, application required.' },

  /* ---- V3: the only place an amount lives (BRIEF-V3 §2) ---- */
  pricing: {
    current: '₹2,00,000',
    kind: 'apply',
    ctaLabel: 'Apply now',
    ctaHref: '#apply',
    note: 'Application only. Nothing is charged until you are selected.',
    includes: [
      'Six months of live weekend sessions',
      'Six levels, foundations through architecture',
      'Two supervised months on one capstone',
      'A capstone review you defend in front of people',
      'Evaluation design worked against a real user',
      'Forward-deployed practice with customers',
      'Recordings and material for all six months', // TODO(founder): confirm recordings
      'A cohort of engineers playing the same long game',
      'Direct review from practitioners, not graders', // TODO(founder): confirm who reviews
    ],
  },
  whatYouGet: [
    'One capstone system, built and defended',
    'Six levels from ML maths to systems architecture',
    'Grounded assistants you designed and operated',
    'Tool-using agents built past the demo stage',
    'Evals tied to a real user, not a benchmark',
    'Fine-tuning judgement: when it beats prompting or RAG',
    'Cost, latency and architecture trade-offs you can argue',
    'Field practice shipping with a customer',
    'Two months of supervision on your own build',
    'Weekends only — your weekdays stay yours',
  ],
  isThisForMe: [
    'I have real programming experience',
    'I want the theory, not only the recipes',
    'I can give six months of weekends',
    'I would rather go deep than go fast',
    'I want to lead technical calls, not follow them',
    'I want work I can defend under questioning',
    'I am building a career, not chasing one cohort',
  ],
};

/* ---- V3 extras. Named exports so the shared `Program` type stays untouched
   while another builder edits it for the Accelerator. ---- */

/** Big-type community line. Descriptors come from `fellowship.audience`. */
export const fellowshipCommunity = [
  'Engineers with a job they are keeping.',
  'ML practitioners moving into product.',
  'People who want to lead the technical call.',
  'You?',
];

export const fellowshipCover: string[] = [
  'The maths and ML foundations under model behaviour.',
  'LLM theory: tokenisation, attention, scaling, inference.',
  'Retrieval, agents, and the infrastructure beneath them.',
  'Evaluation design that answers to a real user.',
  'Fine-tuning — when it beats prompting or retrieval.',
  'Architecture: reliability, observability, cost, latency, scale.',
];

export const fellowshipDontCover: { title: string; nuance?: string }[] = [
  { title: 'The traditional front-end / back-end stack', nuance: 'We do cover how it changes once AI is in the loop.' },
  { title: 'Database modelling', nuance: 'We do cover retrieval and data patterns for gen AI.' },
  { title: 'InfoSec and traditional security', nuance: 'We do cover privacy, data and production risk under AI.' },
  { title: 'Research — training a model from scratch', nuance: 'We cover adapting and shipping them instead.' },
];
