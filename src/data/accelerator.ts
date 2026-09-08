import type { Program, Feature, PricingBlock } from './types';

/**
 * V3 additions for the Accelerator page (BRIEF-V3 §4).
 *
 * These live here rather than in `types.ts` because that file is shared with
 * the other program pages and holds the V1 `Program` contract. The exported
 * object is `Program & AcceleratorExtras`, so every existing importer that
 * types against `Program` keeps working.
 */
export type SkillLine = { title: string; body: string };
export type CoverItem = { item: string; but?: string };
export type StillUnsurePrompt = { id: string; prompt: string };

export type AcceleratorExtras = {
  skills: SkillLine[];
  hackathon: Feature;
  network: Feature;
  stackBenefits: SkillLine[];
  community: { figures: { value: string; label: string }[]; roles: string[] };
  pythonBasecamp: { title: string; body: string; helpsIf: string[] };
  cover: string[];
  dontCover: CoverItem[];
  stillUnsure: { prompts: StillUnsurePrompt[]; roles: string[]; rolesLine: string };
  openSourceLine: string;
  tools: string[];
  solveFor: string[];
  pricing: PricingBlock;
  whatYouGet: string[];
  isThisForMe: string[];
};

export const accelerator: Program & AcceleratorExtras = {
  slug: 'accelerator',
  name: '14 days Accelerator',
  eyebrow: '14 days · daily · live',
  headline: 'Fourteen days. Seven apps. One in production.',
  subhead: 'Build seven AI apps end to end. Run one for real.',
  ctaLabel: 'Apply now',
  ctaHref: '#apply',
  stats: [{ label: 'Duration', value: '14 days' }, { label: 'Applications', value: '7+ built' }, { label: 'Training', value: '70+ hours' }, { label: 'Updates', value: '1 year live' }],
  price: { current: '₹1,25,000', note: 'Applications reviewed in 48 hours' },

  /* ---------------------------------------------------------------- skills */
  skills: [
    { title: 'Build ChatGPT / Perplexity-like apps.', body: 'Chat, search, multimodal. More than one provider.' },
    { title: 'Sophisticated apps & automations with AI.', body: 'Workflows that do real work, with an interface people use.' },
    { title: 'Customise AI with your data.', body: 'Your documents, media and records. The model answers from them.' },
    { title: 'Demo to production.', body: 'Scale it, monitor it, measure it, control it.' },
    { title: 'Build your own Cursor / Claude Code.', body: 'An agent that reads, writes and changes code for you.' },
    { title: 'Build an AI team.', body: 'Specialist agents that hand work to each other and report back.' },
  ],
  hackathon: {
    title: 'Hackathon',
    body: 'Steal the skills by using them. Build with the room.',
  },
  network: {
    title: 'Network',
    body: 'Fourteen days beside experienced engineers, founders and PMs.',
  },

  /* --------------------------------------------------- the stack, as benefits */
  stackBenefits: [
    { title: 'AI as part of software', body: 'Where the model sits in a system with users, data and rules.' },
    { title: 'Control & hallucination', body: 'Constrain output. Verify it. Make it useful, not plausible.' },
    { title: 'Deployment', body: 'Off your laptop. Staying up.' },
    { title: 'Customisation', body: 'Your data, your format, your guardrails.' },
    { title: 'Cost prediction & control', body: 'Know the bill before it arrives. Hold it there.' },
  ],

  /* ------------------------------------------------------------- community */
  community: {
    figures: [
      { value: '10–15+ yrs', label: 'Experience in the room' },
      { value: '~75%', label: 'Of the room, at that level' },
    ],
    roles: ['Founders', 'PMs', 'Vibe coders', 'Indie hackers', 'You?'],
  },

  /* -------------------------------------------------------- python basecamp */
  pythonBasecamp: {
    title: 'Python Basecamp',
    body: 'A refresher session and resources, so day one is not about syntax.',
    helpsIf: [
      "You're not familiar with Python",
      "You haven't coded in a while",
      "You're a vibe coder",
      "You don't write Python every day",
    ],
  },

  /* ------------------------------------------------------ cover / don't cover */
  cover: [
    'Gen AI application engineering, end to end',
    'Retrieval, memory and context over your own data',
    'Agents, tools and multi-agent workflows',
    'Evaluation, monitoring and cost control',
    'Open models, local inference and deployment',
    'Production considerations that change because of AI',
  ],
  dontCover: [
    { item: 'The full traditional SWE stack — front end and back end', but: 'We do cover how they change when you use AI.' },
    { item: 'Database modelling from first principles', but: 'We do cover data patterns specific to gen AI.' },
    { item: 'InfoSec and traditional application security', but: 'We do cover security, data and privacy questions AI creates.' },
  ],

  /* ------------------------------------------------------------ still unsure */
  stillUnsure: {
    prompts: [
      { id: 'q1', prompt: "Imagine you work at ChatGPT. You're the engineer. You don't prompt your AI — your user does. How does that change prompt engineering for you?" },
      { id: 'q2', prompt: 'AI is stateless — it has no memory. How do you give it memory?' },
      { id: 'q3', prompt: 'Your support bot needs to know the customer, their orders, status and options. How do you teach it that?' },
      { id: 'q4', prompt: 'How do you know which model is best for your task?' },
      { id: 'q5', prompt: 'How do you build something like Cursor — an agent that reads, writes and changes code for you?' },
      { id: 'q6', prompt: 'If you could build your own team with AI, who would you hire?' },
    ],
    roles: ['Product team roles', 'Marketing team roles', 'Media / YouTuber team roles'],
    rolesLine: 'Learn to build any of these.',
  },

  openSourceLine:
    'You run local models, compare them against hosted ones, and keep the choice open.',

  tools: [
    'Cursor', 'Claude Code', 'Codex', 'OpenAI SDK', 'Gemini SDK', 'Anthropic', 'OpenRouter',
    'HuggingFace', 'Google Colab', 'MCP', 'Skills', 'Render', 'Vercel', 'Qdrant', 'Pinecone',
    'LanceDB', 'CrewAI', 'LangGraph', 'Langfuse', 'Pydantic', 'Python', 'UV', 'FastAPI',
  ],

  solveFor: [
    'Hallucinations',
    'Customisation',
    'Data & maths',
    'Cost & estimation',
    'Handling a ton of data',
    'Standard or custom tools for agents',
    'Turning your code into tools for agents',
    'Taking advantage of the open-source community',
    'Comparing options and models',
    'Powering your API with AI, or AI with your API',
    'Memory, context windows, limits, verification',
    'Speed & latency',
  ],

  /* ------------------------------------------------------------ V3 pricing */
  pricing: {
    current: '₹1,25,000',
    includes: ['14 live days, back to back', '70+ hours of training', '7+ apps, capstone hackathon', 'Python Basecamp, free', 'Business and monetisation modules', 'Weekly AI updates for a year'],
    note: 'Reviewed in 48 hours. Nothing is charged here.',
    ctaLabel: 'Apply now',
    ctaHref: '#apply',
    kind: 'apply',
  },

  whatYouGet: ['7+ apps built and deployed', 'One system in production', 'Evals, cost limits, monitoring on live traffic', 'A retrieval system on your own data', 'A coding agent and a team of agents, built by you', 'A year of live AI updates'],

  isThisForMe: ['I write code, or read it comfortably', 'I can clear fourteen days', 'I have shipped something with an LLM', 'My prototypes stall before users', 'I want to build agents, not just call an API'],

  features: [
    { title: 'LLM applications', body: 'Build provider-aware chat and multimodal applications with production concerns in view.' },
    { title: 'Automation', body: 'Turn repetitive work into end-to-end workflows with useful interfaces.' },
    { title: 'RAG', body: 'Make applications answer from your documents, media, and other private data.' },
    { title: 'Open-source AI', body: 'Run and evaluate open models, then choose the right deployment trade-off.' },
    { title: 'Agents', body: 'Build tool-enabled systems that can plan, act, and report what they did.' },
    { title: 'Multi-agent systems', body: 'Coordinate specialist agents around complex engineering workflows.' },
    { title: 'Production', body: 'Deploy with monitoring, security, cost controls, and a path to maintenance.' },
  ],
  sprints: [
    { n: 0, title: 'Python Basecamp Foundation Setup', days: 'Foundation setup', focus: 'Engineering base', learn: ['Python environment', 'Data structures and algorithms', 'NumPy, Pandas, threading, multiprocessing'], ship: 'A Python foundation ready for advanced AI development.', tools: ['Python', 'NumPy', 'Pandas'] },
    { n: 1, title: 'Building ChatGPT-Level Applications', days: 'Days 1–3', focus: 'Advanced LLM integration', learn: ['Multi-provider chat', 'XML and JSON prompts', 'Gradio and local models'], ship: 'A production-ready chatbot.', tools: ['OpenAI', 'Gradio', 'Local models'] },
    { n: 2, title: 'AI-Powered Automation Systems', days: 'Days 4–5', focus: 'Workflow engineering', learn: ['Job-search automation', 'Resume and cover-letter pipeline', 'Full-stack interfaces'], ship: 'A complete job-application automation app.', tools: ['APIs', 'HeyGen', 'Web UI'] },
    { n: 3, title: 'Custom AI with Your Data (RAG Systems)', days: 'Days 6–7', focus: 'Advanced AI customization', learn: ['Document RAG', 'A personal AI second brain', 'Text, image, and voice inputs'], ship: 'A personal assistant grounded in your media.', tools: ['Embeddings', 'Vector search', 'Multimodal models'] },
    { n: 4, title: 'Open Source AI & Production Deployment', days: 'Days 8–9', focus: 'Enterprise-grade systems', learn: ['Vision, audio, and text systems', 'Cost optimization', 'Security and deployment'], ship: 'A monitored, secure production AI system.', tools: ['Open models', 'Docker', 'Monitoring'] },
    { n: 5, title: 'AI Agents & Autonomous Systems', days: 'Days 10–11', focus: 'Agentic architecture', learn: ['Code-generating agents', 'MCP tools', 'Sequential workflows'], ship: 'An AI coding assistant that writes and deploys code.', tools: ['MCP', 'Tool APIs', 'Workflow runtimes'] },
    { n: 6, title: 'Multi-Agent AI Systems', days: 'Days 12–13', focus: 'Advanced agentic architecture', learn: ['Engineering agents', 'Project bots', 'Memory-enabled teams'], ship: 'A team of agents for a development workflow.', tools: ['Discord', 'Queues', 'Agent memory'] },
    { n: 7, title: 'Capstone Hackathon', days: 'Days 13–14', focus: 'Portfolio project', learn: ['Original product scope', 'Production deployment', 'Technical presentation'], ship: 'A real AI product that demonstrates your engineering.', tools: ['Your stack', 'CI/CD', 'Cloud deployment'] },
  ],
  outcomes: ['7+ AI apps built and deployed', 'One system in production with evals and monitoring', 'Model choices you can defend'],
  audience: ['Engineers who want the full AI application stack', 'Developers moving from experiments to deployed systems', 'Technical founders building a portfolio of products', 'People who can clear fourteen days back-to-back for this'],
  faq: [
    { q: 'What is the Accelerator?', a: 'Fourteen days back to back: apps, automation, RAG, agents, multi-agent, production. Ends in a capstone you deploy.' },
    { q: 'Do I need to code?', a: 'Yes. Basic programming comfort. Python Basecamp covers rust.' },
    { q: 'How much time?', a: 'All fourteen days, full time. Plan it like leave.' },
    { q: 'Why apply instead of buying?', a: 'Fourteen days only works if the cohort is ready. Reviewed in 48 hours.' },
    { q: 'What if I am not a Python developer?', a: 'Python Basecamp is included, free, and gets you to day-one level.' },
    { q: 'Is there a certificate?', a: 'Completion details are shared once you are selected.' },
    { q: 'What is the format?', a: 'Live sessions daily, build work between them, one year of AI updates after.' },
    { q: 'What else is included?', a: 'Tool and workflow deep dives, business foundations, monetisation modules, weekly AI updates.' },
  ],
  seo: { title: '14 days back-to-back — take one AI system to production', description: 'Seven or more applications built in fourteen back-to-back days, and one of them deployed with evals, cost controls, and monitoring. Application only.' },
};
