import type { Program } from './types';

export const mastermind: Program = {
  slug: 'mastermind',
  name: '2-Day AI Engineering Mastermind',
  eyebrow: '12 HOURS ◆ 3 LIVE EXPERT SESSIONS',
  headline: 'One weekend. A new way to ship.',
  subhead: 'See what agents actually do, then do it. Learn the loop from context and tools to review, and leave with working demos.',
  ctaLabel: 'Register free',
  ctaHref: '#register',
  stats: [
    { label: 'Start date', value: '11 Sept 2026' },
    { label: 'Start time', value: '7 PM IST' },
    { label: 'Live training', value: '12 hours' },
    { label: 'Sessions', value: '3' },
  ],
  price: { current: 'Free', original: '₹4,999', note: 'Live, limited-seat workshop' },
  features: [
    { title: 'Agentic coding', body: 'Hand Cursor or Claude Code a whole task, not one line of autocomplete.' },
    { title: 'MCP', body: 'Connect GitHub, your database, Slack, and your own APIs to an AI workflow.' },
    { title: 'Agent workflows', body: 'Give an agent a ticket; it plans, writes, tests, and opens the PR for review.' },
    { title: 'Multi-agent systems', body: 'Coordinate role-based agents that work in parallel while you are away.' },
    { title: 'The agent loop', body: 'Understand context, memory, tools, and review as engineering primitives.' },
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
    { q: 'Is the Mastermind really free?', a: 'Yes. The workshop is free; the original listed price was ₹4,999.' },
  ],
  seo: { title: '2-Day AI Engineering Mastermind', description: 'A free, live 12-hour AI Engineering Mastermind. Learn LLMs, tools, agent workflows, and multi-agent systems in three sessions.' },
};
