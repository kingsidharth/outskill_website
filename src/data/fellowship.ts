import type { Program } from './types';

export const fellowship: Program = {
  slug: 'fellowship',
  name: '6M Fellowship',
  eyebrow: '6 months · weekends only',
  headline: 'Six months of weekends. One capstone you defend.',
  subhead: 'Four months of learning. Two months building one system. Weekends only.',
  ctaLabel: 'Apply now',
  ctaHref: '#apply',
  stats: [{ label: 'Duration', value: '6 months' }, { label: 'Levels', value: '6' }, { label: 'Format', value: 'Weekends only' }, { label: 'Capstone', value: '2 months' }],
  price: { current: '₹2,00,000', note: 'Applications reviewed in 48 hours' },
  features: [
    { title: 'ML fundamentals', body: 'The maths and concepts to reason about models.' },
    { title: 'LLM theory', body: 'Tokenisation, transformers, attention, scaling laws.' },
    { title: 'Forward-deployed skills', body: 'Scope work, design evals, ship with customers.' },
    { title: 'Implementation', body: 'RAG, agents, and the infrastructure around them.' },
    { title: 'Fine-tuning', body: 'Later level. When and how to adapt models.' },
    { title: 'Architecture', body: 'Later level. Systems design for dependable AI products.' },
  ],
  levels: [
    { n: 0, title: 'ML fundamentals & math', theory: ['Vectors, matrices, probability', 'Optimization and loss', 'Training and generalization'], skills: ['Read model behavior', 'Reason about data and errors', 'Use evaluation language precisely'], build: ['A small supervised learning system', 'A measurement notebook'] },
    { n: 1, title: 'LLM theory', theory: ['Tokenization', 'Transformers and attention', 'Scaling laws and inference'], skills: ['Trace an LLM request', 'Compare model capabilities', 'Connect theory to product limits'], build: ['A tokenizer and attention walkthrough', 'A measured LLM application'] },
    { n: 2, title: 'Forward-deployed skills', theory: ['Problem framing', 'Evaluation design', 'Customer feedback loops'], skills: ['Scope with customers', 'Define success metrics', 'Ship and iterate in the field'], build: ['A scoped customer brief', 'An eval plan and pilot'] },
    { n: 3, title: 'Implementation', theory: ['Retrieval patterns', 'Agent architectures', 'AI infrastructure'], skills: ['Build RAG', 'Build tool-using agents', 'Operate data and model pipelines'], build: ['A grounded assistant', 'A production-shaped agent system'] },
    { n: 4, title: 'Fine-tuning', later: true, theory: ['Adaptation objectives', 'Data quality and curation', 'Training and serving trade-offs'], skills: ['Choose fine-tuning vs prompting or RAG', 'Prepare a training set', 'Evaluate an adapted model'], build: ['A fine-tuned model experiment', 'A comparison against a baseline'] },
    { n: 5, title: 'Architecture & systems design', later: true, theory: ['Distributed system boundaries', 'Reliability and observability', 'Cost, latency, and scale'], skills: ['Design end-to-end AI systems', 'Make explicit trade-offs', 'Lead technical reviews'], build: ['An architecture proposal', 'A production readiness review'] },
  ],
  outcomes: ['A capstone built over two supervised months', 'Agents and assistants you designed and ran', 'Trade-offs you can argue out loud'],
  audience: ['Engineers building a durable AI career without leaving their job', 'ML practitioners expanding into product delivery', 'Developers who want the theory as well as the implementation', 'Technical professionals ready for customer-facing work'],
  faq: [
    { q: 'What does GEF stand for?', a: 'The AI Engineering Fellowship. Six months of weekends, six levels, a two-month capstone.' },
    { q: 'Do I need an ML background?', a: 'No. Level 0 builds it. You do need to write code.' },
    { q: 'What does forward-deployed mean here?', a: 'Scoping with customers, designing evals, shipping in their environment.' },
    { q: 'When do fine-tuning and architecture come?', a: 'Last. After fundamentals, theory, field skills and implementation.' },
    { q: 'How are the six months split?', a: 'Four months across six levels. Two months on one supervised capstone.' },
    { q: 'Can I keep my job?', a: 'Yes. Everything runs on weekends.' },
    { q: 'How do I apply?', a: 'Leave your email below. Fit, schedule and payment path within 48 hours.' },
  ],
  seo: { title: '6 months of weekends — build and defend a capstone AI system', description: 'Four months of learning across six levels, then two months building one system under supervision. Weekends only, application required.' },

  /* ---- V3: the only place an amount lives (BRIEF-V3 §2) ---- */
  pricing: {
    current: '₹2,00,000',
    kind: 'apply',
    ctaLabel: 'Apply now',
    ctaHref: '#apply',
    note: 'By application. Nothing is charged until you are selected.',
    includes: ['Six months of live weekend sessions', 'Six levels, foundations to architecture', 'Two supervised months on one capstone', 'A capstone review you defend', 'Field practice with customers', 'Recordings and material, all six months'],
  },
  whatYouGet: ['One capstone, built and defended', 'Six levels, ML maths to architecture', 'Agents and grounded assistants past the demo stage', 'Evals tied to a real user', 'Two supervised months on your build', 'Weekends only'],
  isThisForMe: ['I have real programming experience', 'I want the theory, not just recipes', 'I can give six months of weekends', 'I’d rather go deep than fast', 'I want work I can defend under questioning'],
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
  { title: 'The traditional front-end / back-end stack', nuance: 'We cover how it changes with AI in the loop.' },
  { title: 'Database modelling', nuance: 'We cover retrieval and data patterns for gen AI.' },
  { title: 'InfoSec and traditional security', nuance: 'We cover privacy, data and production risk under AI.' },
  { title: 'Research — training a model from scratch', nuance: 'We adapt and ship models instead.' },
];
